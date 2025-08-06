import * as http from 'http'
import * as https from 'https'
import * as fs from 'fs'
import * as path from 'path'
import * as crypto from 'crypto'
import { LocalSendPeer } from './LocalSendProtocol.d'
import { URL } from 'url'

/**
 * LocalSend HTTP客户端
 * 负责向其他设备发送消息和文件
 */
export class LocalSendHttpClient {
  private timeout = 10000 // 10秒超时
  private localFingerprint: string
  private deviceInfo: any

  constructor(fingerprint: string, deviceInfo: any) {
    this.localFingerprint = fingerprint
    this.deviceInfo = deviceInfo
  }

  /**
   * 获取设备信息
   */
  public async getDeviceInfo(peer: LocalSendPeer): Promise<any> {
    const url = `${peer.protocol}://${peer.ip}:${peer.port}/api/localsend/info`

    try {
      const response = await this.makeRequest('GET', url)
      return JSON.parse(response)
    } catch (error) {
      console.error(`Failed to get device info from ${peer.alias}:`, error)
      throw error
    }
  }

  /**
   * 发送文本消息
   */
  public async sendMessage(peer: LocalSendPeer, content: string): Promise<void> {
    const url = `${peer.protocol}://${peer.ip}:${peer.port}/api/localsend/message`

    const payload = {
      from: this.localFingerprint,
      to: peer.fingerprint,
      content,
      timestamp: Date.now(),
      info: {
        fingerprint: this.localFingerprint,
        alias: this.deviceInfo.alias,
        deviceType: this.deviceInfo.deviceType,
        deviceModel: this.deviceInfo.deviceModel
      }
    }

    try {
      await this.makeRequest('POST', url, JSON.stringify(payload), {
        'Content-Type': 'application/json'
      })
      console.log(`Message sent to ${peer.alias}`)
    } catch (error) {
      console.error(`Failed to send message to ${peer.alias}:`, error)
      throw error
    }
  }

  /**
   * 发送文件
   */
  public async sendFile(peer: LocalSendPeer, filePath: string): Promise<void> {
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`)
    }

    const fileName = path.basename(filePath)
    const fileSize = fs.statSync(filePath).size
    const fileId = crypto.randomUUID()

    // 第一步：发送文件传输请求
    const sendRequestUrl = `${peer.protocol}://${peer.ip}:${peer.port}/api/localsend/send-request`

    const sendRequestPayload = {
      info: {
        fingerprint: this.localFingerprint,
        alias: this.deviceInfo.alias,
        deviceType: this.deviceInfo.deviceType,
        deviceModel: this.deviceInfo.deviceModel
      },
      files: {
        [fileId]: {
          id: fileId,
          fileName,
          size: fileSize,
          fileType: this.getFileType(fileName),
          sha256: await this.calculateFileHash(filePath)
        }
      }
    }

    try {
      // 发送传输请求
      const requestResponse = await this.makeRequest(
        'POST',
        sendRequestUrl,
        JSON.stringify(sendRequestPayload),
        { 'Content-Type': 'application/json' }
      )

      const requestResult = JSON.parse(requestResponse)
      const sessionId = requestResult.sessionId
      const fileToken = requestResult.files?.[fileId]?.token

      if (!sessionId || !fileToken) {
        throw new Error('Invalid response from peer')
      }

      console.log(`File transfer approved by ${peer.alias}, sessionId: ${sessionId}`)

      // 第二步：上传文件
      await this.uploadFile(peer, sessionId, fileId, filePath, fileName, fileToken)

      console.log(`File sent successfully to ${peer.alias}: ${fileName}`)
    } catch (error) {
      console.error(`Failed to send file to ${peer.alias}:`, error)
      throw error
    }
  }

  /**
   * 上传文件数据
   */
  private async uploadFile(
    peer: LocalSendPeer,
    sessionId: string,
    fileId: string,
    filePath: string,
    fileName: string,
    token: string
  ): Promise<void> {
    const uploadUrl = `${peer.protocol}://${peer.ip}:${peer.port}/api/localsend/upload/${sessionId}/${fileId}?fileName=${encodeURIComponent(fileName)}&token=${token}`

    return new Promise((resolve, reject) => {
      const fileStream = fs.createReadStream(filePath)
      const fileSize = fs.statSync(filePath).size

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/octet-stream',
          'Content-Length': fileSize.toString()
        },
        timeout: this.timeout * 10 // 文件上传使用更长的超时时间
      }

      const url = new URL(uploadUrl)
      const client = url.protocol === 'https:' ? https : http

      const req = client.request(url, options, (res) => {
        let responseData = ''

        res.on('data', (chunk) => {
          responseData += chunk
        })

        res.on('end', () => {
          if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
            resolve()
          } else {
            reject(new Error(`Upload failed with status ${res.statusCode}: ${responseData}`))
          }
        })
      })

      req.on('error', (error) => {
        reject(error)
      })

      req.on('timeout', () => {
        req.destroy()
        reject(new Error('Upload timeout'))
      })

      // 管道文件流到请求
      fileStream.pipe(req)

      fileStream.on('error', (error) => {
        req.destroy()
        reject(error)
      })
    })
  }

  /**
   * 发送HTTP请求
   */
  private async makeRequest(
    method: string,
    url: string,
    data?: string,
    headers?: Record<string, string>
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const urlObj = new URL(url)
      const client = urlObj.protocol === 'https:' ? https : http

      const options = {
        method,
        headers: {
          'User-Agent': 'WhyTalk-LocalSend/2.1',
          ...headers
        },
        timeout: this.timeout
      }

      const req = client.request(urlObj, options, (res) => {
        let responseData = ''

        res.on('data', (chunk) => {
          responseData += chunk
        })

        res.on('end', () => {
          if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
            resolve(responseData)
          } else {
            reject(new Error(`HTTP ${res.statusCode}: ${responseData}`))
          }
        })
      })

      req.on('error', (error) => {
        reject(error)
      })

      req.on('timeout', () => {
        req.destroy()
        reject(new Error('Request timeout'))
      })

      if (data) {
        req.write(data)
      }

      req.end()
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

      stream.on('error', reject)
    })
  }

  /**
   * 获取文件类型
   */
  private getFileType(fileName: string): string {
    const ext = path.extname(fileName).toLowerCase()

    const mimeTypes: Record<string, string> = {
      '.txt': 'text/plain',
      '.pdf': 'application/pdf',
      '.doc': 'application/msword',
      '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      '.xls': 'application/vnd.ms-excel',
      '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      '.ppt': 'application/vnd.ms-powerpoint',
      '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.gif': 'image/gif',
      '.bmp': 'image/bmp',
      '.svg': 'image/svg+xml',
      '.mp3': 'audio/mpeg',
      '.wav': 'audio/wav',
      '.mp4': 'video/mp4',
      '.avi': 'video/x-msvideo',
      '.mov': 'video/quicktime',
      '.zip': 'application/zip',
      '.rar': 'application/x-rar-compressed',
      '.7z': 'application/x-7z-compressed',
      '.json': 'application/json',
      '.xml': 'application/xml',
      '.html': 'text/html',
      '.css': 'text/css',
      '.js': 'application/javascript',
      '.ts': 'application/typescript'
    }

    return mimeTypes[ext] || 'application/octet-stream'
  }

  /**
   * 测试与设备的连接
   */
  public async testConnection(peer: LocalSendPeer): Promise<boolean> {
    try {
      await this.getDeviceInfo(peer)
      return true
    } catch (error) {
      return false
    }
  }

  /**
   * 获取设备状态
   */
  public async getDeviceStatus(peer: LocalSendPeer): Promise<any> {
    try {
      const info = await this.getDeviceInfo(peer)
      return {
        online: true,
        info,
        lastChecked: Date.now()
      }
    } catch (error) {
      return {
        online: false,
        error: error instanceof Error ? error.message : String(error),
        lastChecked: Date.now()
      }
    }
  }

  /**
   * 批量发送消息
   */
  public async broadcastMessage(peers: LocalSendPeer[], content: string): Promise<void> {
    const promises = peers.map((peer) =>
      this.sendMessage(peer, content).catch((error) => {
        console.error(`Failed to send message to ${peer.alias}:`, error)
        return null
      })
    )

    await Promise.allSettled(promises)
  }

  /**
   * 批量发送文件
   */
  public async broadcastFile(peers: LocalSendPeer[], filePath: string): Promise<void> {
    const promises = peers.map((peer) =>
      this.sendFile(peer, filePath).catch((error) => {
        console.error(`Failed to send file to ${peer.alias}:`, error)
        return null
      })
    )

    await Promise.allSettled(promises)
  }

  /**
   * 设置超时时间
   */
  public setTimeout(timeout: number): void {
    this.timeout = timeout
  }

  /**
   * 获取超时时间
   */
  public getTimeout(): number {
    return this.timeout
  }
}
