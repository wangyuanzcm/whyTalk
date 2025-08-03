import { Libp2p } from 'libp2p'
import { EventEmitter } from 'events'
import { Discovery } from './Discovery'
import { peerIdFromString } from '@libp2p/peer-id'

export class NetworkService extends EventEmitter {
  private node: Libp2p | null = null
  private discovery: Discovery | null = null

  public async initialize(node: Libp2p): Promise<void> {
    this.node = node
    this.discovery = new Discovery(node)

    // 启动UDP发现
    await this.discovery.startUDPDiscovery()

    // 转发发现事件
    this.discovery.on('peer:discovered', (peer) => {
      this.emit('peer:discovered', peer)
    })

    console.log('Network Service initialized')
  }

  // 停止网络服务
  public async stop(): Promise<void> {
    if (this.discovery) {
      this.discovery.stopUDPDiscovery()
    }
  }

  // 获取发现的节点
  public getDiscoveredPeers() {
    return this.discovery?.getDiscoveredPeers() || []
  }

  // 清理发现的节点
  public clearDiscoveredPeers(): void {
    this.discovery?.clearDiscoveredPeers()
  }

  // 连接到指定节点
  public async connectToPeer(peerId: string): Promise<void> {
    if (!this.node) {
      throw new Error('Network service not initialized')
    }

    try {
      const peerIdObj = peerIdFromString(peerId)
      await this.node.dial(peerIdObj)
      console.log('Connected to peer:', peerId)
    } catch (error) {
      console.error('Failed to connect to peer:', peerId, error)
      throw error
    }
  }

  // 断开与指定节点的连接
  public async disconnectFromPeer(peerId: string): Promise<void> {
    if (!this.node) {
      throw new Error('Network service not initialized')
    }

    try {
      const peerIdObj = peerIdFromString(peerId)
      await this.node.hangUp(peerIdObj)
      console.log('Disconnected from peer:', peerId)
    } catch (error) {
      console.error('Failed to disconnect from peer:', peerId, error)
      throw error
    }
  }

  // 获取节点的连接状态
  public getPeerConnectionStatus(peerId: string): 'connected' | 'disconnected' | 'unknown' {
    if (!this.node) return 'unknown'
    
    try {
      const peerIdObj = peerIdFromString(peerId)
      const connections = this.node.getConnections(peerIdObj)
      return connections.length > 0 ? 'connected' : 'disconnected'
    } catch (error) {
      console.error('Failed to get peer connection status:', peerId, error)
      return 'unknown'
    }
  }
}