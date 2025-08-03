#!/usr/bin/env node

/**
 * 独立的P2P服务进程 (ES Module版本)
 * 通过IPC与主进程通信
 */

// 首先加载完整的 DOM Events polyfill
import './polyfills.js'

// Event polyfill for Node.js environment (备用)
if (typeof globalThis.Event === 'undefined') {
  globalThis.Event = class Event {
    constructor(type, options = {}) {
      this.type = type
      this.bubbles = options.bubbles || false
      this.cancelable = options.cancelable || false
      this.defaultPrevented = false
      this.target = null
      this.currentTarget = null
      this.timeStamp = Date.now()
    }
    
    preventDefault() {
      this.defaultPrevented = true
    }
    
    stopPropagation() {
      // No-op in Node.js
    }
    
    stopImmediatePropagation() {
      // No-op in Node.js
    }
  }
}

// CustomEvent polyfill for Node.js environment
if (typeof globalThis.CustomEvent === 'undefined') {
  globalThis.CustomEvent = class CustomEvent extends globalThis.Event {
    constructor(type, options = {}) {
      super(type, options)
      this.detail = options.detail || null
    }
  }
}

// 确保在global和window对象上也有这些polyfill
if (typeof global !== 'undefined') {
  if (typeof global.Event === 'undefined') {
    global.Event = globalThis.Event
  }
  if (typeof global.CustomEvent === 'undefined') {
    global.CustomEvent = globalThis.CustomEvent
  }
}

// 为了兼容性，也在process.env中设置
process.env.NODE_OPTIONS = (process.env.NODE_OPTIONS || '') + ' --experimental-global-webcrypto'

import fs from 'fs'
import path from 'path'
import { createLibp2p } from 'libp2p'
import { tcp } from '@libp2p/tcp'
import { webSockets } from '@libp2p/websockets'
import { noise } from '@chainsafe/libp2p-noise'
import { mplex } from '@libp2p/mplex'
import { mdns } from '@libp2p/mdns'
import { gossipsub } from '@chainsafe/libp2p-gossipsub'
import { kadDHT } from '@libp2p/kad-dht'
import { ping } from '@libp2p/ping'
import { identify } from '@libp2p/identify'
import { createEd25519PeerId } from '@libp2p/peer-id-factory'
import { peerIdFromString } from '@libp2p/peer-id'

class P2PService {
  constructor() {
    this.node = null
    this.identity = null
    this.isStarted = false
    // 获取用户数据目录
    const userDataPath = process.env.USER_DATA_PATH || './userData'
    this.identityPath = path.join(userDataPath, 'p2p-identity.json')
  }

  // 初始化身份
  async initializeIdentity() {
    try {
      // 尝试加载现有身份
      if (fs.existsSync(this.identityPath)) {
        const identityData = fs.readFileSync(this.identityPath, 'utf8')
        this.identity = JSON.parse(identityData)
        console.log('P2P Identity loaded:', this.identity.peerId)
        return this.identity
      }
    } catch (error) {
      console.warn('Failed to load existing identity:', error)
    }

    // 生成新身份
    console.log('Generating new P2P identity...')
    const peerId = await createEd25519PeerId()
    
    this.identity = {
      peerId: peerId.toString(),
      publicKey: peerId.publicKey ? Buffer.from(peerId.publicKey).toString('base64') : '',
      privateKey: peerId.privateKey ? Buffer.from(peerId.privateKey).toString('base64') : '',
      nickname: `用户_${peerId.toString().slice(-8)}`,
      created_at: new Date().toISOString()
    }

    // 保存身份
    try {
      fs.writeFileSync(this.identityPath, JSON.stringify(this.identity, null, 2))
      console.log('P2P Identity saved:', this.identity.peerId)
    } catch (error) {
      console.error('Failed to save identity:', error)
    }

    return this.identity
  }

  // 启动P2P服务
  async start() {
    if (this.isStarted) {
      throw new Error('P2P service is already started')
    }

    try {
      // 初始化身份
      const identity = await this.initializeIdentity()
      const peerId = peerIdFromString(identity.peerId)

      // 创建libp2p节点
      this.node = await createLibp2p({
        addresses: {
          listen: [
            '/ip4/0.0.0.0/tcp/0',
            '/ip4/0.0.0.0/tcp/0/ws'
          ]
        },
        transports: [
          tcp(),
          webSockets()
        ],
        streamMuxers: [mplex()],
        connectionEncrypters: [noise()],
        peerDiscovery: [
          mdns({
            interval: 1000,
            serviceTag: 'whytalk-p2p'
          })
        ],
        services: {
          identify: identify(),
          pubsub: gossipsub({
            allowPublishToZeroTopicPeers: true,
            msgIdFn: (msg) => {
              return new TextEncoder().encode(msg.topic + msg.data.toString())
            }
          }),
          dht: kadDHT({
            clientMode: false
          }),
          ping: ping()
        }
      })

      // 启动节点
      await this.node.start()
      console.log('P2P node started with PeerID:', this.node.peerId.toString())

      // 绑定事件
      this.bindEvents()

      this.isStarted = true
      this.sendMessage('started', {
        peerId: this.node.peerId.toString(),
        addresses: this.node.getMultiaddrs().map((addr) => addr.toString())
      }, 'startup')

    } catch (error) {
      console.error('Failed to start P2P service:', error)
      this.sendMessage('error', null, 'startup', error instanceof Error ? error.message : String(error))
      throw error
    }
  }

  // 停止P2P服务
  async stop() {
    if (!this.isStarted || !this.node) {
      return
    }

    try {
      await this.node.stop()
      console.log('P2P node stopped')
      this.isStarted = false
      this.node = null

      this.sendMessage('stopped', null, 'shutdown')
    } catch (error) {
      console.error('Failed to stop P2P service:', error)
      this.sendMessage('error', null, 'shutdown', error instanceof Error ? error.message : String(error))
    }
  }

  // 绑定事件
  bindEvents() {
    if (!this.node) return

    // 节点连接事件
    this.node.addEventListener('peer:connect', (event) => {
      console.log('Peer connected:', event.detail.toString())
      this.sendMessage('peer:connect', {
        peerId: event.detail.toString()
      }, 'peer-connect')
    })

    // 节点断开事件
    this.node.addEventListener('peer:disconnect', (event) => {
      console.log('Peer disconnected:', event.detail.toString())
      this.sendMessage('peer:disconnect', {
        peerId: event.detail.toString()
      }, 'peer-disconnect')
    })

    // 节点发现事件
    this.node.addEventListener('peer:discovery', (event) => {
      console.log('Peer discovered:', event.detail.id.toString())
      this.sendMessage('peer:discovery', {
        peerId: event.detail.id.toString(),
        multiaddrs: event.detail.multiaddrs.map((addr) => addr.toString())
      }, 'peer-discovery')
    })
  }

  // 发送直接消息
  async sendDirectMessage(targetPeerId, message) {
    if (!this.node || !this.isStarted) {
      throw new Error('P2P service not started')
    }

    try {
      // 这里需要实现具体的消息发送逻辑
      // 可以使用 libp2p 的 stream 或 pubsub
      console.log(`Sending direct message to ${targetPeerId}:`, message)
      
      this.sendMessage('message:sent', {
        targetPeerId,
        message,
        timestamp: new Date().toISOString()
      }, 'send-message')
    } catch (error) {
      console.error('Failed to send direct message:', error)
      this.sendMessage('error', null, 'send-message', error instanceof Error ? error.message : String(error))
    }
  }

  // 获取连接的节点
  getConnectedPeers() {
    if (!this.node || !this.isStarted) {
      return []
    }

    return this.node.getPeers().map((peerId) => peerId.toString())
  }

  // 获取节点信息
  getNodeInfo() {
    if (!this.node || !this.isStarted) {
      return null
    }

    return {
      peerId: this.node.peerId.toString(),
      addresses: this.node.getMultiaddrs().map((addr) => addr.toString()),
      connectedPeers: this.getConnectedPeers(),
      isStarted: this.isStarted
    }
  }

  // 发送消息到主进程
  sendMessage(type, data, id, error) {
    const message = {
      id: id || Date.now().toString(),
      type,
      data
    }
    
    // 如果是错误消息，添加错误字段
    if (type === 'error' && error) {
      message.error = error
    }
    
    // 通过stdout发送JSON消息
    console.log(JSON.stringify(message))
  }
}

// 主函数
async function main() {
  const service = new P2PService()
  
  // 监听来自主进程的消息（通过stdin）
  let buffer = ''
  process.stdin.on('data', async (data) => {
    buffer += data.toString()
    const lines = buffer.split('\n')
    buffer = lines.pop() || '' // 保留最后一个不完整的行
    
    for (const line of lines) {
      if (line.trim()) {
        let message = null
        try {
          message = JSON.parse(line)
          
          let result = null
          
          switch (message.type) {
            case 'start':
              await service.start()
              break
            case 'stop':
              await service.stop()
              break
            case 'sendDirectMessage':
              if (message.data && message.data.targetPeerId && message.data.message) {
                await service.sendDirectMessage(message.data.targetPeerId, message.data.message)
              } else {
                throw new Error('Invalid sendDirectMessage data')
              }
              break
            case 'getConnectedPeers':
              result = service.getConnectedPeers()
              break
            case 'getNodeInfo':
              result = service.getNodeInfo()
              break
            default:
              throw new Error(`Unknown message type: ${message.type}`)
          }
          
          // 发送响应
          service.sendMessage('response', result, message.id)
          
        } catch (error) {
          // 发送错误响应
          service.sendMessage('error', null, message?.id, error instanceof Error ? error.message : String(error))
        }
      }
    }
  })
  
  // 发送就绪信号
  service.sendMessage('ready')
  
  // 优雅关闭
  process.on('SIGTERM', async () => {
    await service.stop()
    process.exit(0)
  })
  
  process.on('SIGINT', async () => {
    await service.stop()
    process.exit(0)
  })
}

// 如果作为独立进程运行
main().catch(console.error)