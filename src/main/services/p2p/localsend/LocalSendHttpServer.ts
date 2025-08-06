import * as http from 'http'
import * as https from 'https'
import * as fs from 'fs'
import * as path from 'path'
import * as crypto from 'crypto'
import { EventEmitter } from 'events'
import { LocalSendMessage } from './LocalSendProtocol.d'
import { databaseManager } from '../../database/Database'
import * as os from 'os'

/**
 * LocalSend HTTP服务器
 * 处理文件传输和消息接收
 */
export class LocalSendHttpServer extends EventEmitter {
  private server: http.Server | https.Server | null = null
  private port: number = 53318
  private useHttps: boolean = false
  private certificate: { cert: string; key: string } | null = null
  private localFingerprint: string
  private deviceInfo: any

  constructor(port: number = 53318, useHttps: boolean = false) {
    super()
    this.port = port
    this.useHttps = useHttps
    this.localFingerprint = this.generateFingerprint()
    this.deviceInfo = this.generateDeviceInfo()

    if (useHttps) {
      this.generateSelfSignedCertificate()
    }
  }

  /**
   * 启动HTTP服务器
   */
  public async start(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        if (this.useHttps && this.certificate) {
          this.server = https.createServer(
            {
              cert: this.certificate.cert,
              key: this.certificate.key
            },
            this.handleRequest.bind(this)
          )
        } else {
          this.server = http.createServer(this.handleRequest.bind(this))
        }

        this.server.on('error', (error) => {
          console.error('HTTP server error:', error)
          reject(error)
        })

        this.server.listen(this.port, '0.0.0.0', () => {
          console.log(
            `LocalSend HTTP server started on port ${this.port} (${this.useHttps ? 'HTTPS' : 'HTTP'})`
          )
          resolve()
        })
      } catch (error) {
        reject(error)
      }
    })
  }

  /**
   * 停止HTTP服务器
   */
  public async stop(): Promise<void> {
    return new Promise((resolve) => {
      if (this.server) {
        this.server.close(() => {
          console.log('LocalSend HTTP server stopped')
          this.server = null
          resolve()
        })
      } else {
        resolve()
      }
    })
  }

  /**
   * 获取本地设备指纹
   */
  public getFingerprint(): string {
    return this.localFingerprint
  }

  /**
   * 获取设备信息
   */
  public getDeviceInfo(): any {
    return { ...this.deviceInfo }
  }

  /**
   * 处理HTTP请求
   */
  private async handleRequest(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
    try {
      // 设置CORS头
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

      if (req.method === 'OPTIONS') {
        res.writeHead(200)
        res.end()
        return
      }

      const url = new URL(req.url || '/', `http://${req.headers.host}`)
      const pathname = url.pathname

      console.log(`HTTP ${req.method} ${pathname} from ${req.socket.remoteAddress}`)

      // 路由处理
      if (req.method === 'GET' && pathname === '/api/localsend/info') {
        await this.handleInfoRequest(req, res)
      } else if (req.method === 'POST' && pathname === '/api/localsend/send-request') {
        await this.handleSendRequest(req, res)
      } else if (req.method === 'POST' && pathname.startsWith('/api/localsend/upload/')) {
        await this.handleFileUpload(req, res)
      } else if (req.method === 'POST' && pathname === '/api/localsend/message') {
        await this.handleMessageReceive(req, res)
      } else if (req.method === 'GET' && pathname === '/api/localsend/prepare-upload') {
        await this.handlePrepareUpload(req, res)
      } else {
        // 404
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ error: 'Not found' }))
      }
    } catch (error) {
      console.error('Error handling request:', error)
      res.writeHead(500, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ error: 'Internal server error' }))
    }
  }

  /**
   * 处理设备信息请求
   */
  private async handleInfoRequest(
    _req: http.IncomingMessage,
    res: http.ServerResponse
  ): Promise<void> {
    const response = {
      alias: this.deviceInfo.alias,
      version: '2.1',
      deviceModel: this.deviceInfo.deviceModel,
      deviceType: this.deviceInfo.deviceType,
      fingerprint: this.localFingerprint,
      port: this.port,
      protocol: this.useHttps ? 'https' : 'http',
      download: true,
      announce: true
    }

    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(response))
  }

  /**
   * 处理发送请求
   */
  private async handleSendRequest(
    req: http.IncomingMessage,
    res: http.ServerResponse
  ): Promise<void> {
    const body = await this.readRequestBody(req)
    const data = JSON.parse(body)

    console.log('Received send request:', data)

    // 创建会话ID
    const sessionId = crypto.randomUUID()

    // 发出文件准备事件
    const uploadInfo: LocalSendMessage = {
      id: sessionId,
      from: data.info?.fingerprint || 'unknown',
      to: this.localFingerprint,
      type: 'file',
      content: JSON.stringify({
        sessionId,
        files: data.files || {},
        info: data.info
      }),
      timestamp: Date.now()
    }

    this.emit('file:prepare', uploadInfo)

    // 响应接受请求
    const response = {
      sessionId,
      files: Object.keys(data.files || {}).reduce((acc: any, fileId: string) => {
        acc[fileId] = {
          token: crypto.randomBytes(16).toString('hex')
        }
        return acc
      }, {})
    }

    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(response))
  }

  /**
   * 处理文件上传
   */
  private async handleFileUpload(
    req: http.IncomingMessage,
    res: http.ServerResponse
  ): Promise<void> {
    const url = new URL(req.url || '/', `http://${req.headers.host}`)
    const pathParts = url.pathname.split('/')
    const sessionId = pathParts[4]
    const fileId = pathParts[5]

    if (!sessionId || !fileId) {
      res.writeHead(400, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ error: 'Invalid upload path' }))
      return
    }

    // 创建下载目录
    const downloadDir = path.join(os.homedir(), 'Downloads', 'WhyTalk')
    if (!fs.existsSync(downloadDir)) {
      fs.mkdirSync(downloadDir, { recursive: true })
    }

    // 从查询参数获取文件名
    const fileName = url.searchParams.get('fileName') || `file_${fileId}`
    const filePath = path.join(downloadDir, fileName)

    // 写入文件
    const writeStream = fs.createWriteStream(filePath)

    req.pipe(writeStream)

    writeStream.on('finish', () => {
      console.log(`File uploaded: ${filePath}`)

      // 发出文件接收事件
      this.emit('file:received', {
        sessionId,
        fileId,
        fileName,
        filePath,
        size: fs.statSync(filePath).size
      })

      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ success: true }))
    })

    writeStream.on('error', (error) => {
      console.error('File upload error:', error)
      res.writeHead(500, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ error: 'Upload failed' }))
    })
  }

  /**
   * 处理消息接收
   */
  private async handleMessageReceive(
    req: http.IncomingMessage,
    res: http.ServerResponse
  ): Promise<void> {
    const body = await this.readRequestBody(req)
    const data = JSON.parse(body)

    console.log('Received message:', data)

    const message: LocalSendMessage = {
      id: crypto.randomUUID(),
      from: data.from || 'unknown',
      to: this.localFingerprint,
      type: 'text',
      content: data.content || data.message || '',
      timestamp: Date.now()
    }

    // 保存消息到数据库
    try {
      const db = databaseManager.getDatabase()
      await db.exec(
        `INSERT INTO messages (id, from_fingerprint, to_fingerprint, type, content, timestamp, created_at) 
         VALUES ('${message.id}', '${message.from}', '${message.to}', '${message.type}', '${message.content}', ${message.timestamp}, datetime('now'))`
      )
    } catch (error) {
      console.error('Failed to save message:', error)
    }

    // 发出消息接收事件
    this.emit('message:received', message)

    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ success: true }))
  }

  /**
   * 处理上传准备请求
   */
  private async handlePrepareUpload(
    _req: http.IncomingMessage,
    res: http.ServerResponse
  ): Promise<void> {
    const response = {
      sessionId: crypto.randomUUID(),
      port: this.port
    }

    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(response))
  }

  /**
   * 读取请求体
   */
  private async readRequestBody(req: http.IncomingMessage): Promise<string> {
    return new Promise((resolve, reject) => {
      let body = ''
      req.on('data', (chunk) => {
        body += chunk.toString()
      })
      req.on('end', () => {
        resolve(body)
      })
      req.on('error', reject)
    })
  }

  /**
   * 生成设备指纹
   */
  private generateFingerprint(): string {
    const hostname = os.hostname()
    const platform = os.platform()
    const arch = os.arch()
    const networkInterfaces = os.networkInterfaces()

    // 获取第一个非回环网络接口的MAC地址
    let macAddress = ''
    for (const [_name, interfaces] of Object.entries(networkInterfaces)) {
      if (interfaces) {
        for (const iface of interfaces) {
          if (!iface.internal && iface.mac && iface.mac !== '00:00:00:00:00:00') {
            macAddress = iface.mac
            break
          }
        }
      }
      if (macAddress) break
    }

    const data = `${hostname}-${platform}-${arch}-${macAddress}`
    return crypto.createHash('sha256').update(data).digest('hex').substring(0, 16)
  }

  /**
   * 生成设备信息
   */
  private generateDeviceInfo(): any {
    const hostname = os.hostname()
    const platform = os.platform()

    let deviceType = 'desktop'
    if (platform === 'android') deviceType = 'mobile'
    else if (platform === 'darwin') deviceType = 'desktop'
    else if (platform === 'win32') deviceType = 'desktop'
    else if (platform === 'linux') deviceType = 'desktop'

    return {
      fingerprint: this.localFingerprint,
      alias: `WhyTalk-${hostname}`,
      deviceType,
      deviceModel: `${platform} ${os.arch()}`,
      port: this.port,
      protocol: this.useHttps ? 'https' : 'http',
      version: '2.1'
    }
  }

  /**
   * 生成自签名证书（用于HTTPS）
   */
  private generateSelfSignedCertificate(): void {
    try {
      // 这里应该使用更安全的证书生成方法
      // 为了简化，暂时使用基本的自签名证书
      const { generateKeyPairSync } = crypto
      const { privateKey, publicKey } = generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: {
          type: 'spki',
          format: 'pem'
        },
        privateKeyEncoding: {
          type: 'pkcs8',
          format: 'pem'
        }
      })

      // 简化的证书生成（实际应用中应使用专业的证书库）
      this.certificate = {
        key: privateKey,
        cert: publicKey // 这里应该是实际的证书，暂时用公钥代替
      }
    } catch (error) {
      console.error('Failed to generate certificate:', error)
      this.useHttps = false
    }
  }

  /**
   * 获取服务器状态
   */
  public getStatus(): any {
    return {
      isRunning: this.server !== null,
      port: this.port,
      protocol: this.useHttps ? 'https' : 'http',
      fingerprint: this.localFingerprint
    }
  }
}
