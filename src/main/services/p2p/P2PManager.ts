import { EventEmitter } from 'events'
import { IdentityService } from './identity/IdentityService'
import { NetworkService } from './network/NetworkService'
import { P2PMessageService } from './messaging/P2PMessageService'
import { databaseManager } from '../database/Database'

// 类型定义
type Libp2p = any

// P2PManager 现在作为一个代理，不直接使用 libp2p 模块
// 而是通过 IdentityService 来管理 P2P 身份

export class P2PManager extends EventEmitter {
  private node: Libp2p | null = null
  private identityService: IdentityService
  private networkService: NetworkService
  private messageService: P2PMessageService
  private isStarted = false

  constructor() {
    super()
    this.identityService = new IdentityService()
    this.networkService = new NetworkService()
    this.messageService = new P2PMessageService()
  }

  // 启动P2P网络（现在只初始化身份服务）
  public async start(): Promise<void> {
    if (this.isStarted) return

    try {
      // 只初始化身份服务，不直接使用 libp2p
      const identity = await this.identityService.initialize()
      console.log('P2P Identity initialized:', identity.peerId)

      this.isStarted = true
      this.emit('started')
    } catch (error) {
      console.error('Failed to start P2P manager:', error)
      console.warn('P2P functionality disabled, running in offline mode')
      // 设置为已启动状态，但不抛出错误，允许应用继续运行
      this.isStarted = true
      this.emit('started', { offline: true })
    }
  }

  // 停止P2P网络
  public async stop(): Promise<void> {
    if (!this.isStarted) return

    try {
      await this.cleanup()
      this.isStarted = false
      this.emit('stopped')
      console.log('P2P manager stopped')
    } catch (error) {
      console.error('Failed to stop P2P manager:', error)
      throw error
    }
  }

  // 清理资源
  public async cleanup(): Promise<void> {
    try {
      // 停止网络服务
      if (this.networkService) {
        await this.networkService.cleanup?.()
      }

      // 停止消息服务
      if (this.messageService) {
        await this.messageService.cleanup?.()
      }

      // 停止身份服务
      if (this.identityService) {
        await this.identityService.cleanup?.()
      }

      // 停止libp2p节点
      if (this.node) {
        await this.node.stop()
        this.node = null
      }

      console.log('P2P manager cleanup completed')
    } catch (error) {
      console.error('Error during P2P manager cleanup:', error)
      throw error
    }

    try {
      await this.node.stop()
      this.isStarted = false
      this.emit('stopped')
      console.log('P2P node stopped')
    } catch (error) {
      console.error('Failed to stop P2P manager:', error)
      throw error
    }
  }

  // 获取节点ID
  public getPeerId(): string | null {
    return this.identityService?.getIdentity()?.peerId || null
  }

  // 获取身份信息
  public getIdentity(): any {
    return this.identityService?.getIdentity() || null
  }

  // 获取已发现的节点
  public async getDiscoveredPeers(): Promise<any[]> {
    if (!this.networkService) return []
    return this.networkService.getDiscoveredPeers()
  }

  // 发送直接消息
  public async sendDirectMessage(targetPeerId: string, message: any): Promise<void> {
    if (!this.messageService) {
      throw new Error('Message service not initialized')
    }
    await this.messageService.sendDirectMessage(targetPeerId, message)
  }

  // 发送群组消息
  public async sendGroupMessage(groupId: string, message: any): Promise<void> {
    if (!this.messageService) {
      throw new Error('Message service not initialized')
    }
    await this.messageService.sendGroupMessage(groupId, message)
  }

  // 加入群组
  public async joinGroup(groupId: string): Promise<void> {
    if (!this.messageService) {
      throw new Error('Message service not initialized')
    }
    await this.messageService.joinGroup(groupId)
  }

  // 离开群组
  public async leaveGroup(groupId: string): Promise<void> {
    if (!this.messageService) {
      throw new Error('Message service not initialized')
    }
    await this.messageService.leaveGroup(groupId)
  }

  // 获取消息历史
  public async getMessageHistory(peerId?: string, groupId?: string, limit: number = 50): Promise<any[]> {
    if (!this.messageService) {
      throw new Error('Message service not initialized')
    }
    try {
      if (peerId) {
        return await this.messageService.getChatHistory(peerId, limit)
      } else if (groupId) {
        return await this.messageService.getGroupChatHistory(groupId, limit)
      }
      return []
    } catch (error) {
      console.error('Failed to get message history:', error)
      return []
    }
  }

  // 连接到指定节点
  public async connectToPeer(peerId: string): Promise<void> {
    if (!this.networkService) {
      throw new Error('Network service not initialized')
    }
    await this.networkService.connectToPeer(peerId)
  }

  // 断开与指定节点的连接
  public async disconnectFromPeer(peerId: string): Promise<void> {
    if (!this.networkService) {
      throw new Error('Network service not initialized')
    }
    await this.networkService.disconnectFromPeer(peerId)
  }



  // 获取连接的节点列表
  public getConnectedPeers(): string[] {
    if (!this.node) return []
    return this.node.getPeers().map(peer => peer.toString())
  }

  // 获取节点信息
  public getNodeInfo() {
    if (!this.node) return null
    
    return {
      peerId: this.node.peerId.toString(),
      addresses: this.node.getMultiaddrs().map(addr => addr.toString()),
      connections: this.getConnectedPeers().length
    }
  }

  // 获取服务实例
  public getIdentityService(): IdentityService {
    return this.identityService
  }

  public getNetworkService(): NetworkService {
    return this.networkService
  }

  public getMessageService(): P2PMessageService {
    return this.messageService
  }

  public getNode(): any | null {
    return this.node
  }

  // 检查是否已启动
  public isRunning(): boolean {
    return this.isStarted
  }

  // 获取P2P状态
  public async getStatus(): Promise<any> {
    const identity = this.identityService?.getIdentity()
    const connectedPeers = this.getConnectedPeers()
    
    return {
      isRunning: this.isStarted,
      peerId: identity?.peerId || null,
      identity: identity,
      connectedPeers: connectedPeers.length,
      nodeInfo: this.getNodeInfo()
    }
  }

  // 创建群组
  public async createGroup(name: string, description?: string): Promise<string> {
    const groupId = `group_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    // 保存群组信息到数据库
    const db = databaseManager.getDatabase()!
    const identity = this.identityService?.getIdentity()
    
    if (!identity) {
      throw new Error('No identity available')
    }

    const stmt = db.prepare(`
      INSERT INTO p2p_groups (group_id, name, description, creator_peer)
      VALUES (?, ?, ?, ?)
    `)
    stmt.run(groupId, name, description || '', identity.peerId)

    // 将自己添加为群组成员
    const memberStmt = db.prepare(`
      INSERT INTO p2p_group_members (group_id, peer_id, role)
      VALUES (?, ?, ?)
    `)
    memberStmt.run(groupId, identity.peerId, 'owner')

    // 加入群组
    await this.joinGroup(groupId)

    return groupId
  }

  // 添加联系人
  public async addContact(peerId: string, nickname?: string, remark?: string): Promise<void> {
    const db = databaseManager.getDatabase()!
    
    // 检查联系人是否已存在
    const existingContact = db.prepare('SELECT * FROM p2p_contacts WHERE peer_id = ?').get(peerId)
    if (existingContact) {
      throw new Error('Contact already exists')
    }

    // 添加到联系人表
    const stmt = db.prepare(`
      INSERT INTO p2p_contacts (peer_id, nickname, remark)
      VALUES (?, ?, ?)
    `)
    stmt.run(peerId, nickname || '', remark || '')

    // 同时添加到节点表（如果不存在）
    const peerExists = db.prepare('SELECT * FROM p2p_peers WHERE peer_id = ?').get(peerId)
    if (!peerExists) {
      const peerStmt = db.prepare(`
        INSERT INTO p2p_peers (peer_id, nickname, status)
        VALUES (?, ?, ?)
      `)
      peerStmt.run(peerId, nickname || '', 'offline')
    }
  }

  // 获取联系人列表
  public async getContacts(): Promise<any[]> {
    const db = databaseManager.getDatabase()!
    const stmt = db.prepare(`
      SELECT c.*, p.status, p.last_seen
      FROM p2p_contacts c
      LEFT JOIN p2p_peers p ON c.peer_id = p.peer_id
      WHERE c.is_blocked = 0
      ORDER BY c.added_at DESC
    `)
    return stmt.all()
  }

  // 广播联系人变更
  public async broadcastContactChanges(changes: any): Promise<void> {
    // TODO: 实现联系人变更广播逻辑
    console.log('Broadcasting contact changes:', changes)
  }

  // 获取未同步的消息
  public async getUnsyncedMessages(): Promise<any[]> {
    // TODO: 实现获取未同步消息的逻辑
    return []
  }

  // 获取联系人变更
  public async getContactChanges(): Promise<any[]> {
    // TODO: 实现获取联系人变更的逻辑
    return []
  }

  // 获取群组列表
  public async getGroups(): Promise<any[]> {
    const db = databaseManager.getDatabase()!
    const stmt = db.prepare(`
      SELECT * FROM p2p_groups
      ORDER BY created_at DESC
    `)
    return stmt.all()
  }

  // 获取群组成员
  public async getGroupMembers(groupId: string): Promise<any[]> {
    const db = databaseManager.getDatabase()!
    const stmt = db.prepare(`
      SELECT * FROM p2p_group_members
      WHERE group_id = ?
      ORDER BY joined_at DESC
    `)
    return stmt.all(groupId)
  }

  // 邀请用户加入群组
  public async inviteToGroup(groupId: string, peerIds: string[]): Promise<void> {
    // TODO: 实现邀请用户加入群组的逻辑
    console.log('Inviting peers to group:', groupId, peerIds)
  }

  // 搜索联系人
  public async searchContacts(query: string): Promise<any[]> {
    const db = databaseManager.getDatabase()!
    const stmt = db.prepare(`
      SELECT c.*, p.status, p.last_seen
      FROM p2p_contacts c
      LEFT JOIN p2p_peers p ON c.peer_id = p.peer_id
      WHERE (c.nickname LIKE ? OR c.peer_id LIKE ?) AND c.is_blocked = 0
      ORDER BY c.added_at DESC
    `)
    const searchTerm = `%${query}%`
    return stmt.all(searchTerm, searchTerm)
  }

  // 获取联系人请求
  public async getContactRequests(): Promise<any[]> {
    // TODO: 实现获取联系人请求的逻辑
    return []
  }

  // 处理联系人请求
  public async handleContactRequest(requestId: string, action: string): Promise<void> {
    // TODO: 实现处理联系人请求的逻辑
    console.log('Handling contact request:', requestId, action)
  }

  // 删除联系人
  public async deleteContact(peerId: string): Promise<void> {
    const db = databaseManager.getDatabase()!
    const stmt = db.prepare('DELETE FROM p2p_contacts WHERE peer_id = ?')
    stmt.run(peerId)
  }

  // 更新联系人
  public async updateContact(peerId: string, updates: any): Promise<void> {
    const db = databaseManager.getDatabase()!
    const fields = Object.keys(updates).map(key => `${key} = ?`).join(', ')
    const values = Object.values(updates)
    values.push(peerId)
    
    const stmt = db.prepare(`UPDATE p2p_contacts SET ${fields} WHERE peer_id = ?`)
    stmt.run(...values)
  }

  // 标记消息为已读
  public async markMessagesAsRead(messageIds: string[]): Promise<void> {
    const db = databaseManager.getDatabase()!
    const placeholders = messageIds.map(() => '?').join(',')
    const stmt = db.prepare(`UPDATE p2p_messages SET is_read = 1 WHERE id IN (${placeholders})`)
    stmt.run(...messageIds)
  }

  // 删除消息
  public async deleteMessage(messageId: string): Promise<void> {
    const db = databaseManager.getDatabase()!
    const stmt = db.prepare('DELETE FROM p2p_messages WHERE id = ?')
    stmt.run(messageId)
  }

  // 撤回消息
  public async recallMessage(messageId: string): Promise<void> {
    const db = databaseManager.getDatabase()!
    const stmt = db.prepare('UPDATE p2p_messages SET is_recalled = 1 WHERE id = ?')
    stmt.run(messageId)
  }

  // 获取聊天历史
  public async getChatHistory(targetPeerId: string, _page: number = 1, limit: number = 20): Promise<any[]> {
    return this.messageService.getChatHistory(targetPeerId, limit)
  }

  // 获取群组聊天历史
  public async getGroupChatHistory(groupId: string, _page: number = 1, limit: number = 20): Promise<any[]> {
    return await this.messageService.getGroupChatHistory(groupId, limit)
  }
}

export const p2pManager = new P2PManager()