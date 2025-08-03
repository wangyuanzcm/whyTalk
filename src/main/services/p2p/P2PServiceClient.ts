import { EventEmitter } from 'events'
import { ChildProcess, spawn } from 'child_process'
import * as path from 'path'

interface P2PServiceMessage {
  id: string
  type: string
  data?: any
  error?: string
}

interface P2PNodeInfo {
  peerId: string
  addresses: string[]
  connectedPeers: string[]
  isStarted: boolean
}

/**
 * P2P服务客户端
 * 通过IPC与独立的P2P服务进程通信
 */
export class P2PServiceClient extends EventEmitter {
  private serviceProcess: ChildProcess | null = null
  private isStarted = false
  private messageId = 0
  private pendingMessages = new Map<string, {
    resolve: (value: any) => void
    reject: (error: Error) => void
    timeout: NodeJS.Timeout
  }>()

  constructor() {
    super()
  }

  // 启动P2P服务
  public async start(): Promise<void> {
    if (this.isStarted) {
      return
    }

    try {
      // 启动独立的P2P服务进程
      // 使用ES模块版本的P2P服务
      const isDev = process.env.NODE_ENV === 'development'
      let servicePath: string
      let polyfillPath: string
      
      if (isDev) {
        // 开发环境：从源码目录运行
        const projectRoot = path.resolve(__dirname, '../..')
        servicePath = path.join(projectRoot, 'src/p2p-service/index.mjs')
        polyfillPath = path.join(projectRoot, 'src/p2p-service/polyfills.js')
      } else {
        // 生产环境：从应用资源目录运行
        const { app } = require('electron')
        const appPath = app.getAppPath()
        
        // 检查是否在asar包中运行
        if (appPath.endsWith('.asar')) {
          // 从app.asar.unpacked目录加载文件
          const unpackedPath = appPath + '.unpacked'
          servicePath = path.join(unpackedPath, 'src/p2p-service/index.mjs')
          polyfillPath = path.join(unpackedPath, 'src/p2p-service/polyfills.js')
        } else {
          // 普通目录结构
          servicePath = path.join(appPath, 'src/p2p-service/index.mjs')
          polyfillPath = path.join(appPath, 'src/p2p-service/polyfills.js')
        }
      }
      
      // 使用 --require 参数预加载 polyfill，然后运行 .mjs 文件
      const nodeArgs = ['--require', polyfillPath, servicePath]
      
      this.serviceProcess = spawn('node', nodeArgs, {
        stdio: ['pipe', 'pipe', 'pipe', 'pipe'],
        env: {
          ...process.env,
          NODE_ENV: process.env.NODE_ENV || 'development',
          USER_DATA_PATH: require('electron').app.getPath('userData'),
          TS_NODE_COMPILER_OPTIONS: JSON.stringify({
            module: 'commonjs',
            target: 'es2020'
          })
        }
      })

      // 设置进程事件监听
      this.setupProcessEvents()

      // 等待服务就绪
      await this.waitForReady()

      // 启动P2P服务
      await this.sendMessage('start')

      this.isStarted = true
      this.emit('started')
      console.log('P2P Service Client started successfully')

    } catch (error) {
      console.error('Failed to start P2P service client:', error)
      await this.cleanup()
      throw error
    }
  }

  // 停止P2P服务
  public async stop(): Promise<void> {
    if (!this.isStarted) {
      return
    }

    try {
      if (this.serviceProcess) {
        // 发送停止命令
        await this.sendMessage('stop')
        
        // 等待进程退出
        await new Promise<void>((resolve) => {
          if (this.serviceProcess) {
            this.serviceProcess.on('exit', () => resolve())
            this.serviceProcess.kill('SIGTERM')
            
            // 强制杀死进程的超时
            setTimeout(() => {
              if (this.serviceProcess && !this.serviceProcess.killed) {
                this.serviceProcess.kill('SIGKILL')
              }
              resolve()
            }, 5000)
          } else {
            resolve()
          }
        })
      }

      await this.cleanup()
      this.isStarted = false
      this.emit('stopped')
      console.log('P2P Service Client stopped')

    } catch (error) {
      console.error('Failed to stop P2P service client:', error)
      await this.cleanup()
      throw error
    }
  }

  // 发送直接消息
  public async sendDirectMessage(targetPeerId: string, message: string): Promise<void> {
    if (!this.isStarted) {
      throw new Error('P2P service not started')
    }

    await this.sendMessage('sendDirectMessage', {
      targetPeerId,
      message
    })
  }

  // 获取连接的节点
  public async getConnectedPeers(): Promise<string[]> {
    if (!this.isStarted) {
      return []
    }

    const result = await this.sendMessage('getConnectedPeers')
    return result || []
  }

  // 获取节点信息
  public async getNodeInfo(): Promise<P2PNodeInfo | null> {
    if (!this.isStarted) {
      return null
    }

    const result = await this.sendMessage('getNodeInfo')
    return result || null
  }

  // 检查服务是否运行
  public isRunning(): boolean {
    return this.isStarted && this.serviceProcess !== null && !this.serviceProcess.killed
  }

  // 等待服务就绪
  private async waitForReady(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.serviceProcess) {
        reject(new Error('Service process not started'))
        return
      }

      const timeout = setTimeout(() => {
        reject(new Error('P2P service startup timeout'))
      }, 30000) // 30秒超时

      const originalHandler = this.handleServiceMessage.bind(this)
      this.handleServiceMessage = (message: P2PServiceMessage) => {
        if (message.type === 'ready') {
          clearTimeout(timeout)
          this.handleServiceMessage = originalHandler
          resolve()
        } else {
          originalHandler(message)
        }
      }
    })
  }

  // 设置进程事件监听
  private setupProcessEvents(): void {
    if (!this.serviceProcess) return

    // 监听来自服务进程的消息（通过stdout）
    let buffer = ''
    this.serviceProcess.stdout?.on('data', (data) => {
      buffer += data.toString()
      const lines = buffer.split('\n')
      buffer = lines.pop() || '' // 保留最后一个不完整的行
      
      for (const line of lines) {
        if (line.trim()) {
          try {
            const message = JSON.parse(line) as P2PServiceMessage
            this.handleServiceMessage(message)
          } catch (error) {
            // 如果不是JSON消息，则作为普通日志输出
            console.log('P2P Service:', line.trim())
          }
        }
      }
    })

    // 监听进程错误
    this.serviceProcess.on('error', (error) => {
      console.error('P2P service process error:', error)
      this.emit('error', error)
    })

    // 监听进程退出
    this.serviceProcess.on('exit', (code, signal) => {
      console.log(`P2P service process exited with code ${code}, signal ${signal}`)
      this.cleanup()
      this.emit('stopped')
    })

    // 监听标准错误
    this.serviceProcess.stderr?.on('data', (data) => {
      console.error('P2P Service Error:', data.toString().trim())
    })
  }

  // 处理来自服务进程的消息
  private handleServiceMessage(message: P2PServiceMessage): void {
    // 处理响应消息
    if (this.pendingMessages.has(message.id)) {
      const pending = this.pendingMessages.get(message.id)!
      this.pendingMessages.delete(message.id)
      clearTimeout(pending.timeout)

      if (message.type === 'error') {
        pending.reject(new Error(message.error || 'Unknown error'))
      } else {
        pending.resolve(message.data)
      }
      return
    }

    // 处理事件消息
    switch (message.type) {
      case 'started':
        this.emit('p2p:started', message.data)
        break
      case 'stopped':
        this.emit('p2p:stopped')
        break
      case 'peer:connect':
        this.emit('peer:connect', message.data)
        break
      case 'peer:disconnect':
        this.emit('peer:disconnect', message.data)
        break
      case 'peer:discovery':
        this.emit('peer:discovery', message.data)
        break
      case 'message:sent':
        this.emit('message:sent', message.data)
        break
      case 'message:received':
        this.emit('message:received', message.data)
        break
      default:
        console.log('Unknown P2P service message:', message)
    }
  }

  // 发送消息到服务进程
  private async sendMessage(type: string, data?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!this.serviceProcess || !this.serviceProcess.stdin) {
        reject(new Error('Service process not available'))
        return
      }

      const id = `msg_${++this.messageId}`
      const message: P2PServiceMessage = { id, type, data }

      // 设置超时
      const timeout = setTimeout(() => {
        this.pendingMessages.delete(id)
        reject(new Error(`Message timeout: ${type}`))
      }, 10000) // 10秒超时

      // 保存待处理的消息
      this.pendingMessages.set(id, { resolve, reject, timeout })

      // 通过stdin发送消息
      const messageStr = JSON.stringify(message) + '\n'
      this.serviceProcess.stdin.write(messageStr)
    })
  }

  // 清理资源
  private async cleanup(): Promise<void> {
    // 清理待处理的消息
    for (const [_id, pending] of this.pendingMessages) {
      clearTimeout(pending.timeout)
      pending.reject(new Error('Service stopped'))
    }
    this.pendingMessages.clear()

    // 清理进程引用
    if (this.serviceProcess) {
      this.serviceProcess.removeAllListeners()
      this.serviceProcess = null
    }

    this.isStarted = false
  }
}