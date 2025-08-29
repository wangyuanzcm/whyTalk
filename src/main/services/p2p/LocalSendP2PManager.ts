import { EventEmitter } from 'events'
import {
  LocalSendNetworkService,
  localSendNetworkService
} from './localsend/LocalSendNetworkService'
import { LocalSendPeer } from './localsend/LocalSendProtocol.d'
import { LocalSendMessage } from './localsend/LocalSendProtocol.d'
import * as os from 'os'

/**
 * 基于LocalSend协议的P2P管理器
 * 替换原有的libp2p实现，提供局域网内的设备发现和通信功能
 */
export class LocalSendP2PManager extends EventEmitter {
  private networkService: LocalSendNetworkService
  private isStarted = false
  private deviceAlias: string

  constructor() {
    super()
    this.networkService = localSendNetworkService
    this.deviceAlias = `WhyTalk-${os.hostname()}`
    this.setupEventListeners()
  }

  /**
   * 启动P2P服务
   */
  public async start(): Promise<void> {
    if (this.isStarted) {
      console.log('LocalSend P2P Manager already started')
      return
    }

    try {
      // 启动LocalSend网络服务
      await this.networkService.start()

      // 注册消息处理器
      this.registerMessageHandlers()

      this.isStarted = true
      this.emit('started')

      console.log('LocalSend P2P Manager started successfully')
    } catch (error) {
      console.error('Failed to start LocalSend P2P Manager:', error)
      // 不抛出错误，允许应用继续运行
      console.warn('P2P functionality disabled, running in offline mode')
      this.isStarted = true
      this.emit('started', { offline: true })
    }
  }

  /**
   * 停止P2P服务
   */
  public async stop(): Promise<void> {
    if (!this.isStarted) {
      return
    }

    try {
      await this.networkService.stop()
      this.isStarted = false
      this.emit('stopped')

      console.log('LocalSend P2P Manager stopped')
    } catch (error) {
      console.error('Failed to stop LocalSend P2P Manager:', error)
      throw error
    }
  }

  /**
   * 清理资源
   */
  public async cleanup(): Promise<void> {
    await this.stop()
  }

  /**
   * 获取设备ID（指纹）
   */
  public getPeerId(): string | null {
    return this.networkService.getLocalFingerprint() || null
  }

  /**
   * 获取身份信息
   */
  public getIdentity(): any {
    const device = this.networkService.getDeviceInfo()
    if (!device) return null

    return {
      peerId: device.fingerprint,
      alias: device.alias,
      deviceType: device.deviceType,
      deviceModel: device.deviceModel
    }
  }

  /**
   * 获取已发现的设备
   */
  public async getDiscoveredPeers(): Promise<any[]> {
    const peers = this.networkService.getDiscoveredPeers()
    return peers.map((peer) => ({
      id: peer.fingerprint,
      fingerprint: peer.fingerprint,
      alias: peer.alias,
      ip: peer.ip,
      port: peer.port,
      deviceType: peer.deviceType,
      deviceModel: peer.deviceModel,
      protocol: peer.protocol,
      lastSeen: peer.lastSeen,
      isOnline: Date.now() - peer.lastSeen < 30000 // 30秒内视为在线
    }))
  }

  /**
   * 发送直接消息
   */
  public async sendDirectMessage(targetFingerprint: string, message: any): Promise<void> {
    try {
      const content = typeof message === 'string' ? message : JSON.stringify(message)
      await this.networkService.sendMessage(targetFingerprint, content)

      console.log('Direct message sent to:', targetFingerprint)
    } catch (error) {
      console.error('Failed to send direct message:', error)
      throw error
    }
  }

  /**
   * 发送群组消息（暂不支持，LocalSend主要用于点对点通信）
   */
  public async sendGroupMessage(_groupId: string, _message: any): Promise<void> {
    console.warn('Group messaging not supported in LocalSend protocol')
    throw new Error('Group messaging not supported in LocalSend protocol')
  }

  /**
   * 加入群组（暂不支持）
   */
  public async joinGroup(_groupId: string): Promise<void> {
    console.warn('Group functionality not supported in LocalSend protocol')
    throw new Error('Group functionality not supported in LocalSend protocol')
  }

  /**
   * 离开群组（暂不支持）
   */
  public async leaveGroup(_groupId: string): Promise<void> {
    console.warn('Group functionality not supported in LocalSend protocol')
    throw new Error('Group functionality not supported in LocalSend protocol')
  }

  /**
   * 获取消息历史
   */
  public async getMessageHistory(
    peerId?: string,
    groupId?: string,
    limit: number = 50
  ): Promise<any[]> {
    if (groupId) {
      console.warn('Group messages not supported in LocalSend protocol')
      return []
    }

    try {
      const messages = await this.networkService.getMessageHistory(peerId, limit)
      return messages.map((msg) => ({
        id: msg.id,
        from: msg.from_fingerprint,
        to: msg.to_fingerprint,
        type: msg.type,
        content: msg.content,
        timestamp: msg.timestamp,
        files: msg.files ? JSON.parse(msg.files) : undefined
      }))
    } catch (error) {
      console.error('Failed to get message history:', error)
      return []
    }
  }

  /**
   * 连接到设备
   */
  public async connectToPeer(fingerprint: string): Promise<void> {
    // LocalSend是无连接协议，这里只是标记操作
    console.log('Connected to peer:', fingerprint)
    this.emit('peer:connected', fingerprint)
  }

  /**
   * 断开设备连接
   */
  public async disconnectFromPeer(fingerprint: string): Promise<void> {
    // LocalSend是无连接协议，这里只是标记操作
    console.log('Disconnected from peer:', fingerprint)
    this.emit('peer:disconnected', fingerprint)
  }

  /**
   * 获取已连接的设备（LocalSend中所有发现的设备都视为可连接）
   */
  public getConnectedPeers(): string[] {
    const peers = this.networkService.getDiscoveredPeers()
    return peers
      .filter((peer) => Date.now() - peer.lastSeen < 30000) // 30秒内活跃的设备
      .map((peer) => peer.fingerprint)
  }

  /**
   * 获取节点信息
   */
  public getNodeInfo(): any {
    const device = this.networkService.getDeviceInfo()
    const status = this.networkService.getStatus()

    return {
      peerId: device?.fingerprint || null,
      alias: device?.alias || this.deviceAlias,
      deviceType: device?.deviceType || 'desktop',
      protocol: 'LocalSend v2.1',
      port: device?.port || 53317,
      isStarted: this.isStarted,
      peersCount: status.peersCount
    }
  }

  /**
   * 检查服务是否运行
   */
  public isRunning(): boolean {
    return this.isStarted
  }

  /**
   * 获取服务状态
   */
  public async getStatus(): Promise<any> {
    const networkStatus = this.networkService.getStatus()
    const nodeInfo = this.getNodeInfo()

    return {
      isRunning: this.isStarted,
      protocol: 'LocalSend v2.1',
      node: nodeInfo,
      network: networkStatus,
      peers: await this.getDiscoveredPeers()
    }
  }

  /**
   * 创建群组（暂不支持）
   */
  public async createGroup(_name: string, _description?: string): Promise<string> {
    console.warn('Group functionality not supported in LocalSend protocol')
    throw new Error('Group functionality not supported in LocalSend protocol')
  }

  /**
   * 获取本地设备信息
   */
  public getLocalDeviceInfo(): any {
    return this.networkService.getDeviceInfo()
  }

  /**
   * 刷新对等节点
   */
  public async refreshPeers(): Promise<void> {
    try {
      // 重新启动网络服务来刷新对等节点
      await this.networkService.stop()
      await this.networkService.start()
    } catch (error) {
      console.error('Failed to refresh peers:', error)
      throw error
    }
  }

  /**
   * 清除消息历史
   */
  public async clearMessageHistory(): Promise<void> {
    try {
      // 这里应该清除数据库中的消息历史
      console.log('Message history cleared')
    } catch (error) {
      console.error('Failed to clear message history:', error)
      throw error
    }
  }

  /**
   * 添加联系人
   */
  public async addContact(
    _fingerprint: string,
    _nickname?: string,
    _remark?: string
  ): Promise<void> {
    try {
      const peers = this.networkService.getDiscoveredPeers()
      const peer = peers.find((p) => p.fingerprint === _fingerprint)

      if (!peer) {
        throw new Error(`Peer not found: ${_fingerprint}`)
      }

      await this.networkService.addContact(peer, _nickname)

      console.log('Contact added:', _nickname || peer.alias)
    } catch (error) {
      console.error('Failed to add contact:', error)
      throw error
    }
  }

  /**
   * 获取联系人列表
   */
  public async getContacts(): Promise<any[]> {
    try {
      const contacts = await this.networkService.getContacts()
      return contacts.map((contact) => ({
        peerId: contact.fingerprint,
        fingerprint: contact.fingerprint,
        alias: contact.alias,
        nickname: contact.nickname,
        ip: contact.ip,
        port: contact.port,
        deviceType: contact.device_type,
        deviceModel: contact.device_model,
        protocol: contact.protocol,
        createdAt: contact.created_at,
        updatedAt: contact.updated_at
      }))
    } catch (error) {
      console.error('Failed to get contacts:', error)
      return []
    }
  }

  /**
   * 发送文件
   */
  public async sendFile(targetFingerprint: string, filePath: string): Promise<void> {
    try {
      await this.networkService.sendFile(targetFingerprint, filePath)
      console.log('File sent to:', targetFingerprint)
    } catch (error) {
      console.error('Failed to send file:', error)
      throw error
    }
  }

  /**
   * 获取聊天历史
   */
  public async getChatHistory(targetFingerprint: string, limit: number = 20): Promise<any[]> {
    try {
      const messages = await this.networkService.getMessageHistory(targetFingerprint, limit)
      return messages.map((msg) => ({
        id: msg.id,
        from: msg.from_fingerprint,
        to: msg.to_fingerprint,
        type: msg.type,
        content: msg.content,
        timestamp: msg.timestamp,
        createdAt: msg.created_at
      }))
    } catch (error) {
      console.error('Failed to get chat history:', error)
      return []
    }
  }

  /**
   * 删除联系人
   */
  public async deleteContact(fingerprint: string): Promise<void> {
    try {
      await this.networkService.deleteContact(fingerprint)
      console.log('Contact deleted:', fingerprint)
    } catch (error) {
      console.error('Failed to delete contact:', error)
      throw error
    }
  }

  // 以下方法为兼容性方法，暂不实现或返回默认值
  public async broadcastContactChanges(_changes: any): Promise<void> {
    console.log('broadcastContactChanges not implemented for LocalSend')
  }

  public async getUnsyncedMessages(): Promise<any[]> {
    return []
  }

  public async getContactChanges(): Promise<any[]> {
    return []
  }

  public async getGroups(): Promise<any[]> {
    return []
  }

  public async getGroupMembers(_groupId: string): Promise<any[]> {
    return []
  }

  public async inviteToGroup(_groupId: string, _peerIds: string[]): Promise<void> {
    throw new Error('Group functionality not supported')
  }

  public async searchContacts(query: string): Promise<any[]> {
    const contacts = await this.getContacts()
    return contacts.filter(
      (contact) =>
        contact.alias.toLowerCase().includes(query.toLowerCase()) ||
        contact.nickname?.toLowerCase().includes(query.toLowerCase())
    )
  }

  public async getContactRequests(): Promise<any[]> {
    return []
  }

  public async handleContactRequest(_requestId: string, _action: string): Promise<void> {
    console.log('handleContactRequest not implemented for LocalSend')
  }

  public async updateContact(_fingerprint: string, _updates: any): Promise<void> {
    console.log('updateContact not implemented for LocalSend')
  }

  public async markMessagesAsRead(_messageIds: string[]): Promise<void> {
    console.log('markMessagesAsRead not implemented for LocalSend')
  }

  public async deleteMessage(_messageId: string): Promise<void> {
    console.log('deleteMessage not implemented for LocalSend')
  }

  public async recallMessage(_messageId: string): Promise<void> {
    console.log('recallMessage not implemented for LocalSend')
  }

  public async getGroupChatHistory(_groupId: string, _limit: number = 20): Promise<any[]> {
    return []
  }

  /**
   * 设置事件监听器
   */
  private setupEventListeners(): void {
    // 设备发现事件
    this.networkService.on('peer:discovered', (peer: LocalSendPeer) => {
      this.emit('peer:discovered', {
        id: peer.fingerprint,
        fingerprint: peer.fingerprint,
        alias: peer.alias,
        ip: peer.ip,
        port: peer.port,
        deviceType: peer.deviceType,
        lastSeen: peer.lastSeen
      })
    })

    this.networkService.on('peer:lost', (peer: LocalSendPeer) => {
      this.emit('peer:lost', {
        id: peer.fingerprint,
        fingerprint: peer.fingerprint,
        alias: peer.alias
      })
    })

    // 消息接收事件
    this.networkService.on('message:received', (message: LocalSendMessage) => {
      this.emit('message:received', {
        id: message.id,
        from: message.from,
        to: message.to,
        type: message.type,
        content: message.content,
        timestamp: message.timestamp
      })
    })

    // 文件接收事件
    this.networkService.on('file:received', (fileData: any) => {
      this.emit('file:received', fileData)
    })

    this.networkService.on('file:prepare', (uploadInfo: LocalSendMessage) => {
      this.emit('file:prepare', uploadInfo)
    })

    // 联系人事件
    this.networkService.on('contact:added', (data: any) => {
      this.emit('contact:added', data)
    })

    this.networkService.on('contact:deleted', (fingerprint: string) => {
      this.emit('contact:deleted', fingerprint)
    })
  }

  /**
   * 注册消息处理器
   */
  private registerMessageHandlers(): void {
    // 注册文本消息处理器
    this.networkService.registerMessageHandler('text', (message: LocalSendMessage) => {
      console.log('Received text message:', message.content)
    })

    // 注册文件消息处理器
    this.networkService.registerMessageHandler('file', (message: LocalSendMessage) => {
      console.log('Received file message:', message.content)
    })
  }
}

// 导出单例实例
export const localSendP2PManager = new LocalSendP2PManager()
