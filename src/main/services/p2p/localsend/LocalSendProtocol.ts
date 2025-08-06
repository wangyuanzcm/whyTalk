import { EventEmitter } from 'events'
import * as dgram from 'dgram'
import * as http from 'http'
import * as https from 'https'
import * as crypto from 'crypto'
import * as fs from 'fs'
import * as path from 'path'
import { AddressInfo } from 'net'
import type {
  LocalSendDevice,
  LocalSendMessage,
  LocalSendFile,
  LocalSendPeer
} from './LocalSendProtocol.d'

/**
 * LocalSend协议实现
 * 基于LocalSend v2.1协议规范
 * 支持设备发现、消息传输和文件传输
 */
export class LocalSendProtocol extends EventEmitter {
  private readonly DEFAULT_PORT = 53317
  private readonly MULTICAST_GROUP = '224.0.0.167'
  private readonly MULTICAST_PORT = 53317
  private readonly DISCOVERY_INTERVAL = 5000 // 5秒
  private readonly PEER_TIMEOUT = 30000 // 30秒

  private udpSocket: dgram.Socket | null = null
  private httpServer: http.Server | null = null
  private httpsServer: https.Server | null = null
  private discoveryInterval: NodeJS.Timeout | null = null
  private peers: Map<string, LocalSendPeer> = new Map()
  private device: LocalSendDevice
  private port: number
  // private _useHttps: boolean = false
  // private _tlsKey: string = ''
  // private _tlsCert: string = ''

  constructor(alias: string = 'WhyTalk', port: number = 0) {
    super()
    this.port = port || this.DEFAULT_PORT
    this.device = {
      alias,
      version: '2.1',
      deviceModel: 'WhyTalk',
      deviceType: 'desktop',
      fingerprint: this.generateFingerprint(),
      port: this.port,
      protocol: 'http',
      download: true,
      announce: true
    }
  }

  /**
   * 启动LocalSend服务
   */
  public async start(): Promise<void> {
    try {
      // 生成TLS证书（用于HTTPS）
      await this.generateTLSCertificate()

      // 启动HTTP/HTTPS服务器
      await this.startHttpServer()

      // 启动UDP多播发现
      await this.startDiscovery()

      console.log(`LocalSend protocol started on port ${this.port}`)
      this.emit('started')
    } catch (error) {
      console.error('Failed to start LocalSend protocol:', error)
      throw error
    }
  }

  /**
   * 停止LocalSend服务
   */
  public async stop(): Promise<void> {
    try {
      // 停止发现
      this.stopDiscovery()

      // 停止HTTP服务器
      if (this.httpServer) {
        this.httpServer.close()
        this.httpServer = null
      }

      if (this.httpsServer) {
        this.httpsServer.close()
        this.httpsServer = null
      }

      console.log('LocalSend protocol stopped')
      this.emit('stopped')
    } catch (error) {
      console.error('Failed to stop LocalSend protocol:', error)
      throw error
    }
  }

  /**
   * 发送消息到指定设备
   */
  public async sendMessage(targetFingerprint: string, message: string): Promise<void> {
    const peer = this.peers.get(targetFingerprint)
    if (!peer) {
      throw new Error(`Peer not found: ${targetFingerprint}`)
    }

    const messageData: LocalSendMessage = {
      id: crypto.randomUUID(),
      from: this.device.fingerprint,
      to: targetFingerprint,
      type: 'text',
      content: message,
      timestamp: Date.now()
    }

    try {
      const url = `${peer.protocol}://${peer.ip}:${peer.port}/api/localsend/v2/receive`
      const response = await this.makeHttpRequest(
        url,
        'POST',
        {
          'Content-Type': 'application/json'
        },
        JSON.stringify(messageData)
      )

      if (response.statusCode === 200) {
        this.emit('message:sent', messageData)
        console.log('Message sent successfully to:', peer.alias)
      } else {
        throw new Error(`Failed to send message: ${response.statusCode}`)
      }
    } catch (error) {
      console.error('Failed to send message:', error)
      throw error
    }
  }

  /**
   * 发送文件到指定设备
   */
  public async sendFile(targetFingerprint: string, filePath: string): Promise<void> {
    const peer = this.peers.get(targetFingerprint)
    if (!peer) {
      throw new Error(`Peer not found: ${targetFingerprint}`)
    }

    const fileStats = fs.statSync(filePath)
    const fileName = path.basename(filePath)
    const fileId = crypto.randomUUID()

    const fileInfo: LocalSendFile = {
      id: fileId,
      fileName,
      size: fileStats.size,
      fileType: path.extname(fileName).slice(1) || 'unknown',
      sha256: await this.calculateFileHash(filePath)
    }

    const messageData: LocalSendMessage = {
      id: crypto.randomUUID(),
      from: this.device.fingerprint,
      to: targetFingerprint,
      type: 'file',
      content: `File: ${fileName}`,
      timestamp: Date.now(),
      files: [fileInfo]
    }

    try {
      // 首先发送文件元数据
      const prepareUrl = `${peer.protocol}://${peer.ip}:${peer.port}/api/localsend/v2/prepare-upload`
      const prepareResponse = await this.makeHttpRequest(
        prepareUrl,
        'POST',
        {
          'Content-Type': 'application/json'
        },
        JSON.stringify(messageData)
      )

      if (prepareResponse.statusCode !== 200) {
        throw new Error(`Failed to prepare upload: ${prepareResponse.statusCode}`)
      }

      // 上传文件
      const uploadUrl = `${peer.protocol}://${peer.ip}:${peer.port}/api/localsend/v2/upload`
      await this.uploadFile(uploadUrl, filePath, fileInfo)

      this.emit('file:sent', messageData)
      console.log('File sent successfully to:', peer.alias)
    } catch (error) {
      console.error('Failed to send file:', error)
      throw error
    }
  }

  /**
   * 获取已发现的设备列表
   */
  public getDiscoveredPeers(): LocalSendPeer[] {
    const now = Date.now()
    // 清理过期的设备
    for (const [fingerprint, peer] of this.peers) {
      if (now - peer.lastSeen > this.PEER_TIMEOUT) {
        this.peers.delete(fingerprint)
        this.emit('peer:lost', peer)
      }
    }
    return Array.from(this.peers.values())
  }

  /**
   * 获取本地设备信息
   */
  public getDeviceInfo(): LocalSendDevice {
    return { ...this.device }
  }

  /**
   * 生成设备指纹
   */
  private generateFingerprint(): string {
    const data = `${process.platform}-${require('os').hostname()}-${Date.now()}`
    return crypto.createHash('sha256').update(data).digest('hex').substring(0, 16)
  }

  /**
   * 生成TLS证书
   */
  private async generateTLSCertificate(): Promise<void> {
    // 生成自签名证书用于HTTPS
    // const { generateKeyPairSync } = crypto
    // const { privateKey, publicKey } = generateKeyPairSync('rsa', {
    //   modulusLength: 2048,
    //   publicKeyEncoding: {
    //     type: 'spki',
    //     format: 'pem'
    //   },
    //   privateKeyEncoding: {
    //     type: 'pkcs8',
    //     format: 'pem'
    //   }
    // })

    // this._tlsKey = privateKey
    // 简化的证书生成，实际应用中应该使用更完整的证书生成逻辑
    // this._tlsCert = publicKey
  }

  /**
   * 启动HTTP服务器
   */
  private async startHttpServer(): Promise<void> {
    return new Promise((resolve, reject) => {
      // 创建HTTP服务器
      this.httpServer = http.createServer((req, res) => {
        this.handleHttpRequest(req, res)
      })

      this.httpServer.listen(this.port, () => {
        const address = this.httpServer?.address() as AddressInfo
        this.device.port = address.port
        console.log(`LocalSend HTTP server listening on port ${address.port}`)
        resolve()
      })

      this.httpServer.on('error', (error) => {
        console.error('HTTP server error:', error)
        reject(error)
      })
    })
  }

  /**
   * 启动UDP多播发现
   */
  private async startDiscovery(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.udpSocket = dgram.createSocket({ type: 'udp4', reuseAddr: true })

      this.udpSocket.on('message', (msg, rinfo) => {
        this.handleDiscoveryMessage(msg, rinfo)
      })

      this.udpSocket.on('error', (error) => {
        console.error('UDP discovery error:', error)
        reject(error)
      })

      this.udpSocket.bind(this.MULTICAST_PORT, () => {
        try {
          this.udpSocket?.addMembership(this.MULTICAST_GROUP)
          this.udpSocket?.setMulticastTTL(1)
          this.udpSocket?.setMulticastLoopback(false)

          // 开始定期广播
          this.startAnnouncement()

          console.log(
            `LocalSend discovery listening on ${this.MULTICAST_GROUP}:${this.MULTICAST_PORT}`
          )
          resolve()
        } catch (error) {
          reject(error)
        }
      })
    })
  }

  /**
   * 停止发现服务
   */
  private stopDiscovery(): void {
    if (this.discoveryInterval) {
      clearInterval(this.discoveryInterval)
      this.discoveryInterval = null
    }

    if (this.udpSocket) {
      try {
        this.udpSocket.dropMembership(this.MULTICAST_GROUP)
      } catch (error) {
        // 忽略错误
      }
      this.udpSocket.close()
      this.udpSocket = null
    }
  }

  /**
   * 开始定期广播设备信息
   */
  private startAnnouncement(): void {
    this.discoveryInterval = setInterval(() => {
      this.announceDevice()
    }, this.DISCOVERY_INTERVAL)

    // 立即广播一次
    this.announceDevice()
  }

  /**
   * 广播设备信息
   */
  private announceDevice(): void {
    if (!this.udpSocket) return

    const announcement = {
      alias: this.device.alias,
      version: this.device.version,
      deviceModel: this.device.deviceModel,
      deviceType: this.device.deviceType,
      fingerprint: this.device.fingerprint,
      port: this.device.port,
      protocol: this.device.protocol,
      download: this.device.download,
      announce: this.device.announce
    }

    const message = Buffer.from(JSON.stringify(announcement))
    this.udpSocket.send(message, this.MULTICAST_PORT, this.MULTICAST_GROUP, (error) => {
      if (error) {
        console.error('Failed to announce device:', error)
      }
    })
  }

  /**
   * 处理发现消息
   */
  private handleDiscoveryMessage(msg: Buffer, rinfo: dgram.RemoteInfo): void {
    try {
      const announcement = JSON.parse(msg.toString())

      // 忽略自己的广播
      if (announcement.fingerprint === this.device.fingerprint) {
        return
      }

      const peer: LocalSendPeer = {
        ip: rinfo.address,
        port: announcement.port || rinfo.port,
        alias: announcement.alias,
        version: announcement.version,
        deviceModel: announcement.deviceModel,
        deviceType: announcement.deviceType,
        fingerprint: announcement.fingerprint,
        protocol: announcement.protocol || 'http',
        lastSeen: Date.now(),
        download: announcement.download !== false,
        announce: announcement.announce !== false
      }

      const isNewPeer = !this.peers.has(peer.fingerprint)
      this.peers.set(peer.fingerprint, peer)

      if (isNewPeer) {
        this.emit('peer:discovered', peer)
        console.log('Discovered LocalSend device:', peer.alias, peer.ip)
      } else {
        this.emit('peer:updated', peer)
      }
    } catch (error) {
      console.error('Failed to parse discovery message:', error)
    }
  }

  /**
   * 处理HTTP请求
   */
  private handleHttpRequest(req: http.IncomingMessage, res: http.ServerResponse): void {
    const url = req.url || ''
    const method = req.method || 'GET'

    // 设置CORS头
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

    if (method === 'OPTIONS') {
      res.writeHead(200)
      res.end()
      return
    }

    try {
      if (url === '/api/localsend/v2/info' && method === 'GET') {
        // 返回设备信息
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(this.device))
      } else if (url === '/api/localsend/v2/receive' && method === 'POST') {
        // 接收消息
        this.handleReceiveMessage(req, res)
      } else if (url === '/api/localsend/v2/prepare-upload' && method === 'POST') {
        // 准备文件上传
        this.handlePrepareUpload(req, res)
      } else if (url === '/api/localsend/v2/upload' && method === 'POST') {
        // 处理文件上传
        this.handleFileUpload(req, res)
      } else {
        res.writeHead(404)
        res.end('Not Found')
      }
    } catch (error) {
      console.error('HTTP request error:', error)
      res.writeHead(500)
      res.end('Internal Server Error')
    }
  }

  /**
   * 处理接收消息
   */
  private handleReceiveMessage(req: http.IncomingMessage, res: http.ServerResponse): void {
    let body = ''
    req.on('data', (chunk) => {
      body += chunk.toString()
    })

    req.on('end', () => {
      try {
        const message: LocalSendMessage = JSON.parse(body)
        this.emit('message:received', message)

        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ success: true }))

        console.log('Message received from:', message.from)
      } catch (error) {
        console.error('Failed to parse received message:', error)
        res.writeHead(400)
        res.end('Bad Request')
      }
    })
  }

  /**
   * 处理准备文件上传
   */
  private handlePrepareUpload(req: http.IncomingMessage, res: http.ServerResponse): void {
    let body = ''
    req.on('data', (chunk) => {
      body += chunk.toString()
    })

    req.on('end', () => {
      try {
        const uploadInfo: LocalSendMessage = JSON.parse(body)
        this.emit('file:prepare', uploadInfo)

        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ success: true }))

        console.log('File upload prepared from:', uploadInfo.from)
      } catch (error) {
        console.error('Failed to parse upload preparation:', error)
        res.writeHead(400)
        res.end('Bad Request')
      }
    })
  }

  /**
   * 处理文件上传
   */
  private handleFileUpload(req: http.IncomingMessage, res: http.ServerResponse): void {
    // 简化的文件上传处理
    // 实际实现中应该处理multipart/form-data
    const chunks: Buffer[] = []

    req.on('data', (chunk) => {
      chunks.push(chunk)
    })

    req.on('end', () => {
      try {
        const fileData = Buffer.concat(chunks)
        this.emit('file:received', {
          data: fileData,
          size: fileData.length,
          from: req.headers['x-sender'] || 'unknown'
        })

        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ success: true }))

        console.log('File received, size:', fileData.length)
      } catch (error) {
        console.error('Failed to handle file upload:', error)
        res.writeHead(500)
        res.end('Internal Server Error')
      }
    })
  }

  /**
   * 发送HTTP请求
   */
  private makeHttpRequest(url: string, method: string, headers: any, body?: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const urlObj = new URL(url)
      const options = {
        hostname: urlObj.hostname,
        port: urlObj.port,
        path: urlObj.pathname + urlObj.search,
        method,
        headers
      }

      const req = http.request(options, (res) => {
        let responseBody = ''
        res.on('data', (chunk) => {
          responseBody += chunk
        })
        res.on('end', () => {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body: responseBody
          })
        })
      })

      req.on('error', (error) => {
        reject(error)
      })

      if (body) {
        req.write(body)
      }
      req.end()
    })
  }

  /**
   * 上传文件
   */
  private async uploadFile(url: string, filePath: string, fileInfo: LocalSendFile): Promise<void> {
    return new Promise((resolve, reject) => {
      const fileStream = fs.createReadStream(filePath)
      const urlObj = new URL(url)

      const options = {
        hostname: urlObj.hostname,
        port: urlObj.port,
        path: urlObj.pathname,
        method: 'POST',
        headers: {
          'Content-Type': 'application/octet-stream',
          'Content-Length': fileInfo.size,
          'X-File-Name': fileInfo.fileName,
          'X-File-Id': fileInfo.id
        }
      }

      const req = http.request(options, (res) => {
        if (res.statusCode === 200) {
          resolve()
        } else {
          reject(new Error(`Upload failed: ${res.statusCode}`))
        }
      })

      req.on('error', (error) => {
        reject(error)
      })

      fileStream.pipe(req)
    })
  }

  /**
   * 计算文件哈希
   */
  private async calculateFileHash(filePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const hash = crypto.createHash('sha256')
      const stream = fs.createReadStream(filePath)

      stream.on('data', (data) => {
        hash.update(data)
      })

      stream.on('end', () => {
        resolve(hash.digest('hex'))
      })

      stream.on('error', (error) => {
        reject(error)
      })
    })
  }
}
