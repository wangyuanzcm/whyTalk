import * as dgram from 'dgram'
import { EventEmitter } from 'events'
import { LocalSendPeer } from './LocalSendProtocol.d'
import * as os from 'os'

/**
 * LocalSend UDP发现服务
 * 负责在局域网内发现其他LocalSend设备
 */
export class LocalSendDiscovery extends EventEmitter {
  private socket: dgram.Socket | null = null
  private multicastAddress = '224.0.0.167' // LocalSend默认多播地址
  private port = 53317
  private isRunning = false
  private discoveredPeers = new Map<string, LocalSendPeer>()
  private announceInterval: NodeJS.Timeout | null = null
  private cleanupInterval: NodeJS.Timeout | null = null
  private localFingerprint: string
  private deviceInfo: any

  constructor(fingerprint: string, deviceInfo: any) {
    super()
    this.localFingerprint = fingerprint
    this.deviceInfo = deviceInfo
  }

  /**
   * 启动发现服务
   */
  public async start(): Promise<void> {
    if (this.isRunning) {
      return
    }

    return new Promise((resolve, reject) => {
      try {
        this.socket = dgram.createSocket({ type: 'udp4', reuseAddr: true })

        this.socket.on('error', (error) => {
          console.error('UDP discovery socket error:', error)
          this.emit('error', error)
        })

        this.socket.on('message', (message, rinfo) => {
          this.handleDiscoveryMessage(message, rinfo)
        })

        this.socket.on('listening', () => {
          try {
            if (this.socket) {
              // 加入多播组
              this.socket.addMembership(this.multicastAddress)
              this.socket.setMulticastTTL(1)
              this.socket.setMulticastLoopback(false)

              console.log(`LocalSend discovery listening on ${this.multicastAddress}:${this.port}`)

              // 开始定期广播
              this.startAnnouncing()

              // 开始清理过期设备
              this.startCleanup()

              this.isRunning = true
              resolve()
            }
          } catch (error) {
            console.error('Failed to setup multicast:', error)
            reject(error)
          }
        })

        // 绑定到多播端口
        this.socket.bind(this.port)
      } catch (error) {
        reject(error)
      }
    })
  }

  /**
   * 停止发现服务
   */
  public async stop(): Promise<void> {
    if (!this.isRunning) {
      return
    }

    return new Promise((resolve) => {
      // 停止定时器
      if (this.announceInterval) {
        clearInterval(this.announceInterval)
        this.announceInterval = null
      }

      if (this.cleanupInterval) {
        clearInterval(this.cleanupInterval)
        this.cleanupInterval = null
      }

      if (this.socket) {
        try {
          this.socket.dropMembership(this.multicastAddress)
        } catch (error) {
          console.warn('Failed to drop multicast membership:', error)
        }

        this.socket.close(() => {
          console.log('LocalSend discovery stopped')
          this.socket = null
          this.isRunning = false
          resolve()
        })
      } else {
        this.isRunning = false
        resolve()
      }
    })
  }

  /**
   * 获取已发现的设备
   */
  public getDiscoveredPeers(): LocalSendPeer[] {
    return Array.from(this.discoveredPeers.values())
  }

  /**
   * 手动发送广播
   */
  public announce(): void {
    if (!this.socket || !this.isRunning) {
      return
    }

    const announcement = this.createAnnouncement()
    const message = Buffer.from(JSON.stringify(announcement))

    this.socket.send(message, this.port, this.multicastAddress, (error) => {
      if (error) {
        console.error('Failed to send announcement:', error)
      } else {
        console.log('Announcement sent')
      }
    })
  }

  /**
   * 处理接收到的发现消息
   */
  private handleDiscoveryMessage(message: Buffer, rinfo: dgram.RemoteInfo): void {
    try {
      const data = JSON.parse(message.toString())

      // 验证消息格式
      if (!this.isValidAnnouncement(data)) {
        return
      }

      // 忽略自己的广播
      if (data.fingerprint === this.localFingerprint) {
        return
      }

      const peer: LocalSendPeer = {
        fingerprint: data.fingerprint,
        alias: data.alias,
        ip: rinfo.address,
        port: data.port || this.port,
        deviceType: data.deviceType || 'unknown',
        deviceModel: data.deviceModel || 'unknown',
        protocol: data.protocol || 'http',
        version: data.version || '2.1',
        lastSeen: Date.now(),
        download: data.download !== false,
        announce: data.announce !== false
      }

      const existingPeer = this.discoveredPeers.get(peer.fingerprint)
      const isNewPeer = !existingPeer

      // 更新或添加设备
      this.discoveredPeers.set(peer.fingerprint, peer)

      if (isNewPeer) {
        console.log(`Discovered new peer: ${peer.alias} (${peer.fingerprint})`)
        this.emit('peer:discovered', peer)
      } else {
        // 更新现有设备的最后见到时间
        console.log(`Updated peer: ${peer.alias} (${peer.fingerprint})`)
        this.emit('peer:updated', peer)
      }
    } catch (error) {
      console.error('Failed to parse discovery message:', error)
    }
  }

  /**
   * 验证广播消息格式
   */
  private isValidAnnouncement(data: any): boolean {
    return (
      typeof data === 'object' &&
      typeof data.fingerprint === 'string' &&
      typeof data.alias === 'string' &&
      data.fingerprint.length > 0 &&
      data.alias.length > 0
    )
  }

  /**
   * 创建广播消息
   */
  private createAnnouncement(): any {
    return {
      fingerprint: this.localFingerprint,
      alias: this.deviceInfo.alias,
      port: this.deviceInfo.port,
      deviceType: this.deviceInfo.deviceType,
      deviceModel: this.deviceInfo.deviceModel,
      protocol: this.deviceInfo.protocol,
      version: this.deviceInfo.version,
      announce: true,
      timestamp: Date.now()
    }
  }

  /**
   * 开始定期广播
   */
  private startAnnouncing(): void {
    // 立即发送一次广播
    this.announce()

    // 每5秒广播一次
    this.announceInterval = setInterval(() => {
      this.announce()
    }, 5000)
  }

  /**
   * 开始清理过期设备
   */
  private startCleanup(): void {
    this.cleanupInterval = setInterval(() => {
      this.cleanupExpiredPeers()
    }, 10000) // 每10秒清理一次
  }

  /**
   * 清理过期设备
   */
  private cleanupExpiredPeers(): void {
    const now = Date.now()
    const expireTime = 30000 // 30秒过期

    for (const [fingerprint, peer] of this.discoveredPeers.entries()) {
      if (now - peer.lastSeen > expireTime) {
        console.log(`Peer expired: ${peer.alias} (${peer.fingerprint})`)
        this.discoveredPeers.delete(fingerprint)
        this.emit('peer:lost', peer)
      }
    }
  }

  /**
   * 获取本地网络接口
   */
  private getLocalNetworkInterfaces(): string[] {
    const interfaces = os.networkInterfaces()
    const addresses: string[] = []

    for (const [_name, ifaces] of Object.entries(interfaces)) {
      if (ifaces) {
        for (const iface of ifaces) {
          // 只获取IPv4地址，排除回环地址
          if (iface.family === 'IPv4' && !iface.internal) {
            addresses.push(iface.address)
          }
        }
      }
    }

    return addresses
  }

  /**
   * 获取发现服务状态
   */
  public getStatus(): any {
    return {
      isRunning: this.isRunning,
      multicastAddress: this.multicastAddress,
      port: this.port,
      peersCount: this.discoveredPeers.size,
      localInterfaces: this.getLocalNetworkInterfaces()
    }
  }

  /**
   * 查找特定设备
   */
  public findPeer(fingerprint: string): LocalSendPeer | undefined {
    return this.discoveredPeers.get(fingerprint)
  }

  /**
   * 移除设备
   */
  public removePeer(fingerprint: string): boolean {
    const peer = this.discoveredPeers.get(fingerprint)
    if (peer) {
      this.discoveredPeers.delete(fingerprint)
      this.emit('peer:removed', peer)
      return true
    }
    return false
  }

  /**
   * 清除所有已发现的设备
   */
  public clearPeers(): void {
    this.discoveredPeers.clear()
    this.emit('peers:cleared')
  }

  /**
   * 获取设备数量
   */
  public getPeerCount(): number {
    return this.discoveredPeers.size
  }

  /**
   * 检查设备是否在线
   */
  public isPeerOnline(fingerprint: string): boolean {
    const peer = this.discoveredPeers.get(fingerprint)
    if (!peer) {
      return false
    }

    const now = Date.now()
    return now - peer.lastSeen < 30000 // 30秒内视为在线
  }
}
