import { Libp2p } from 'libp2p'
import { EventEmitter } from 'events'
import { IdentityService } from '../identity/IdentityService'
import { databaseManager } from '../../database/Database'

export interface P2PMessage {
  id: string
  from: string
  to: string
  type: 'text' | 'image' | 'file' | 'audio' | 'video'
  content: string
  timestamp: number
  signature?: string
  groupId?: string
}

export class P2PMessageService extends EventEmitter {
  private node: Libp2p | null = null
  private identityService: IdentityService | null = null
  private readonly PROTOCOL = '/whytalk/message/1.0.0'
  private readonly GROUP_TOPIC_PREFIX = 'whytalk-group-'

  public async initialize(node: Libp2p, identityService: IdentityService): Promise<void> {
    this.node = node
    this.identityService = identityService

    // 注册消息处理协议
    await this.node.handle(this.PROTOCOL, this.handleIncomingMessage.bind(this))

    // 订阅群组消息
    this.subscribeToGroupMessages()

    console.log('P2P Message Service initialized')
  }

  // 发送点对点消息
  public async sendDirectMessage(targetPeerId: string, message: Omit<P2PMessage, 'from' | 'timestamp' | 'signature'>): Promise<void> {
    if (!this.node || !this.identityService) {
      throw new Error('P2P Message Service not initialized')
    }

    const identity = this.identityService.getIdentity()
    if (!identity) {
      throw new Error('No identity available')
    }

    const fullMessage: P2PMessage = {
      ...message,
      from: identity.peerId,
      timestamp: Date.now(),
      signature: await this.signMessage(message)
    }

    try {
      // 动态导入peerIdFromString
      const { peerIdFromString } = await import('@libp2p/peer-id').catch(() => ({
        peerIdFromString: (id: string) => ({ toString: () => id })
      })) as any
      
      // 获取目标节点的连接
      const peerIdObj = peerIdFromString(targetPeerId)
      const stream = await this.node.dialProtocol(peerIdObj, this.PROTOCOL)
      
      // 发送消息
      const messageData = new TextEncoder().encode(JSON.stringify(fullMessage))
      await stream.sink([messageData])
      await stream.close()

      // 保存到本地数据库
      await this.saveMessage(fullMessage)

      this.emit('message:sent', fullMessage)
      console.log('Direct message sent to:', targetPeerId)
    } catch (error) {
      console.error('Failed to send direct message:', error)
      throw error
    }
  }

  // 发送群组消息
  public async sendGroupMessage(groupId: string, message: Omit<P2PMessage, 'from' | 'timestamp' | 'signature' | 'groupId'>): Promise<void> {
    if (!this.node || !this.identityService) {
      throw new Error('P2P Message Service not initialized')
    }

    const identity = this.identityService.getIdentity()
    if (!identity) {
      throw new Error('No identity available')
    }

    const fullMessage: P2PMessage = {
      ...message,
      from: identity.peerId,
      timestamp: Date.now(),
      groupId,
      signature: await this.signMessage(message)
    }

    try {
      const topic = this.GROUP_TOPIC_PREFIX + groupId
      const messageData = new TextEncoder().encode(JSON.stringify(fullMessage))
      
      // 通过pubsub发送群组消息
      const pubsub = this.node.services.pubsub as any
      await pubsub.publish(topic, messageData)

      // 保存到本地数据库
      await this.saveMessage(fullMessage)

      this.emit('message:sent', fullMessage)
      console.log('Group message sent to:', groupId)
    } catch (error) {
      console.error('Failed to send group message:', error)
      throw error
    }
  }

  // 处理接收到的消息
  private async handleIncomingMessage({ stream }: any): Promise<void> {
    try {
      const chunks: Uint8Array[] = []
      
      for await (const chunk of stream.source) {
        chunks.push(chunk.subarray())
      }
      
      const messageData = new Uint8Array(chunks.reduce((acc, chunk) => acc + chunk.length, 0))
      let offset = 0
      for (const chunk of chunks) {
        messageData.set(chunk, offset)
        offset += chunk.length
      }
      
      const messageStr = new TextDecoder().decode(messageData)
      const message: P2PMessage = JSON.parse(messageStr)

      // 验证消息签名
      if (await this.verifyMessage(message)) {
        // 保存到本地数据库
        await this.saveMessage(message)
        
        this.emit('message:received', message)
        console.log('Direct message received from:', message.from)
      } else {
        console.warn('Invalid message signature from:', message.from)
      }
    } catch (error) {
      console.error('Failed to handle incoming message:', error)
    }
  }

  // 订阅群组消息
  private subscribeToGroupMessages(): void {
    if (!this.node) return

    // 监听pubsub消息
    const pubsub = this.node.services.pubsub as any
    pubsub.addEventListener('message', (evt: any) => {
      this.handleGroupMessage(evt.detail)
    })
  }

  // 处理群组消息
  private async handleGroupMessage(evt: any): Promise<void> {
    try {
      if (!evt.topic.startsWith(this.GROUP_TOPIC_PREFIX)) return

      const messageStr = new TextDecoder().decode(evt.data)
      const message: P2PMessage = JSON.parse(messageStr)

      // 不处理自己发送的消息
      const identity = this.identityService?.getIdentity()
      if (message.from === identity?.peerId) return

      // 验证消息签名
      if (await this.verifyMessage(message)) {
        // 保存到本地数据库
        await this.saveMessage(message)
        
        this.emit('message:received', message)
        console.log('Group message received from:', message.from, 'in group:', message.groupId)
      } else {
        console.warn('Invalid group message signature from:', message.from)
      }
    } catch (error) {
      console.error('Failed to handle group message:', error)
    }
  }

  // 加入群组
  public async joinGroup(groupId: string): Promise<void> {
    if (!this.node) {
      throw new Error('P2P Message Service not initialized')
    }

    const topic = this.GROUP_TOPIC_PREFIX + groupId
    const pubsub = this.node.services.pubsub as any
    pubsub.subscribe(topic)
    console.log('Joined group:', groupId)
  }

  // 离开群组
  public async leaveGroup(groupId: string): Promise<void> {
    if (!this.node) {
      throw new Error('P2P Message Service not initialized')
    }

    const topic = this.GROUP_TOPIC_PREFIX + groupId
    const pubsub = this.node.services.pubsub as any
    pubsub.unsubscribe(topic)
    console.log('Left group:', groupId)
  }

  // 签名消息（占位符实现）
  private async signMessage(_message: any): Promise<string> {
    // TODO: 实现真正的消息签名
    return 'signature_placeholder'
  }

  // 验证消息签名（占位符实现）
  private async verifyMessage(_message: P2PMessage): Promise<boolean> {
    // TODO: 实现真正的消息验证
    return true
  }

  // 保存消息到本地数据库
  private async saveMessage(message: P2PMessage): Promise<void> {
    try {
      const db = databaseManager.getDatabase()!
      
      // 检查表是否存在，如果不存在则创建
      const tableExists = db.prepare(`
        SELECT name FROM sqlite_master 
        WHERE type='table' AND name='p2p_messages'
      `).get()

      if (!tableExists) {
        db.exec(`
          CREATE TABLE p2p_messages (
            id TEXT PRIMARY KEY,
            from_peer TEXT NOT NULL,
            to_peer TEXT,
            group_id TEXT,
            type TEXT NOT NULL,
            content TEXT NOT NULL,
            timestamp INTEGER NOT NULL,
            signature TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
          )
        `)
      }

      const stmt = db.prepare(`
        INSERT OR REPLACE INTO p2p_messages 
        (id, from_peer, to_peer, group_id, type, content, timestamp, signature)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `)

      stmt.run(
        message.id,
        message.from,
        message.to,
        message.groupId || null,
        message.type,
        message.content,
        message.timestamp,
        message.signature || null
      )

      console.log('Message saved to database:', message.id)
    } catch (error) {
      console.error('Failed to save message to database:', error)
    }
  }

  // 获取消息历史
  public async getMessageHistory(peerId?: string, groupId?: string, limit: number = 50): Promise<P2PMessage[]> {
    try {
      const db = databaseManager.getDatabase()!
      
      let query = 'SELECT * FROM p2p_messages WHERE 1=1'
      const params: any[] = []

      if (peerId) {
        query += ' AND (from_peer = ? OR to_peer = ?)'
        params.push(peerId, peerId)
      }

      if (groupId) {
        query += ' AND group_id = ?'
        params.push(groupId)
      }

      query += ' ORDER BY timestamp DESC LIMIT ?'
      params.push(limit)

      const stmt = db.prepare(query)
      const rows = stmt.all(...params)

      return rows.map((row: any) => ({
        id: row.id,
        from: row.from_peer,
        to: row.to_peer,
        groupId: row.group_id,
        type: row.type,
        content: row.content,
        timestamp: row.timestamp,
        signature: row.signature
      }))
    } catch (error) {
      console.error('Failed to get message history:', error)
      return []
    }
  }

  // 获取聊天历史（点对点）
  public async getChatHistory(peerId: string, limit: number = 50): Promise<P2PMessage[]> {
    return this.getMessageHistory(peerId, undefined, limit)
  }

  // 获取群组聊天历史
  public async getGroupChatHistory(groupId: string, limit: number = 50): Promise<P2PMessage[]> {
    return this.getMessageHistory(undefined, groupId, limit)
  }

  public async cleanup(): Promise<void> {
    try {
      this.node = null
      this.identityService = null
      this.removeAllListeners()
      console.log('P2PMessageService cleanup completed')
    } catch (error) {
      console.error('Error during P2PMessageService cleanup:', error)
      throw error
    }
  }
}