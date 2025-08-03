import { EventEmitter } from 'events'
import * as dgram from 'dgram'
import { Libp2p } from 'libp2p'

export interface DiscoveredPeer {
  peerId: string
  nickname: string
  address: string
  port: number
  lastSeen: number
}

export class Discovery extends EventEmitter {
  private udpSocket: dgram.Socket | null = null
  private broadcastInterval: NodeJS.Timeout | null = null
  private discoveredPeers: Map<string, DiscoveredPeer> = new Map()
  private readonly BROADCAST_PORT = 41234
  private readonly BROADCAST_INTERVAL = 5000 // 5秒

  constructor(private node: Libp2p) {
    super()
  }

  // 启动UDP广播发现
  public async startUDPDiscovery(): Promise<void> {
    this.udpSocket = dgram.createSocket('udp4')
    
    // 监听广播消息
    this.udpSocket.on('message', (msg, rinfo) => {
      this.handleBroadcastMessage(msg, rinfo)
    })

    this.udpSocket.on('error', (err) => {
      console.error('UDP discovery error:', err)
    })

    // 绑定端口
    this.udpSocket.bind(this.BROADCAST_PORT, () => {
      this.udpSocket?.setBroadcast(true)
      console.log(`UDP discovery listening on port ${this.BROADCAST_PORT}`)
    })

    // 开始定期广播
    this.startBroadcasting()
  }

  // 停止UDP发现
  public stopUDPDiscovery(): void {
    if (this.broadcastInterval) {
      clearInterval(this.broadcastInterval)
      this.broadcastInterval = null
    }

    if (this.udpSocket) {
      this.udpSocket.close()
      this.udpSocket = null
    }
  }

  // 开始广播
  private startBroadcasting(): void {
    this.broadcastInterval = setInterval(() => {
      this.broadcastPresence()
    }, this.BROADCAST_INTERVAL)

    // 立即广播一次
    this.broadcastPresence()
  }

  // 广播自己的存在
  private broadcastPresence(): void {
    if (!this.udpSocket || !this.node) return

    const message = {
      type: 'presence',
      peerId: this.node.peerId.toString(),
      nickname: 'WhyTalk用户', // 从身份服务获取
      timestamp: Date.now(),
      addresses: this.node.getMultiaddrs().map(addr => addr.toString())
    }

    const buffer = Buffer.from(JSON.stringify(message))
    
    this.udpSocket.send(buffer, 0, buffer.length, this.BROADCAST_PORT, '255.255.255.255', (err) => {
      if (err) {
        console.error('Failed to broadcast presence:', err)
      }
    })
  }

  // 处理接收到的广播消息
  private handleBroadcastMessage(msg: Buffer, rinfo: dgram.RemoteInfo): void {
    try {
      const message = JSON.parse(msg.toString())
      
      if (message.type === 'presence' && message.peerId !== this.node?.peerId.toString()) {
        const peer: DiscoveredPeer = {
          peerId: message.peerId,
          nickname: message.nickname,
          address: rinfo.address,
          port: rinfo.port,
          lastSeen: Date.now()
        }

        this.discoveredPeers.set(message.peerId, peer)
        this.emit('peer:discovered', peer)
        
        console.log('Discovered peer via UDP:', peer)
      }
    } catch (error) {
      console.error('Failed to parse broadcast message:', error)
    }
  }

  // 获取发现的节点列表
  public getDiscoveredPeers(): DiscoveredPeer[] {
    const now = Date.now()
    const timeout = 30000 // 30秒超时

    // 清理过期的节点
    for (const [peerId, peer] of this.discoveredPeers) {
      if (now - peer.lastSeen > timeout) {
        this.discoveredPeers.delete(peerId)
      }
    }

    return Array.from(this.discoveredPeers.values())
  }

  // 清理发现的节点
  public clearDiscoveredPeers(): void {
    this.discoveredPeers.clear()
  }
}