/**
 * 消息插件客户端SDK
 * 提供给其他插件调用消息服务的接口
 */

export interface Message {
  id: number
  talk_type: number
  msg_type: number
  user_id: number
  receiver_id: number
  content?: string
  file?: {
    name: string
    size: number
    suffix: string
    url: string
  }
  mention?: {
    all: boolean
    uids: number[]
  }
  reply?: {
    msg_id: number
    content: string
  }
  forward?: {
    msg_id: number
    user_id: number
    receiver_id: number
  }
  is_revoke: boolean
  is_mark: boolean
  is_read: boolean
  created_at: string
  updated_at: string
}

export interface Conversation {
  id: number
  type: number
  receiver_id: number
  is_top: boolean
  is_disturb: boolean
  is_robot: boolean
  unread_num: number
  msg_text?: string
  updated_at: string
}

export interface SendMessageRequest {
  talk_type: number
  receiver_id: number
  msg_type: number
  content?: string
  file?: {
    name: string
    size: number
    suffix: string
    url: string
  }
  mention?: {
    all: boolean
    uids: number[]
  }
  reply?: {
    msg_id: number
  }
  forward?: {
    msg_id: number
  }
}

export interface MessageHistory {
  messages: Message[]
  total: number
  hasMore: boolean
}

export interface SearchMessageRequest {
  keyword: string
  talk_type?: number
  receiver_id?: number
  msg_type?: number
  date_range?: {
    start: string
    end: string
  }
  page?: number
  limit?: number
}

export class MessageSDK {
  private pluginId: string

  constructor(pluginId: string) {
    this.pluginId = pluginId
  }

  // ==================== 消息相关 ====================

  /**
   * 发送消息
   */
  async sendMessage(request: SendMessageRequest): Promise<Message | null> {
    const response = await this.sendPluginMessage('message.send', request)
    return response.message || null
  }

  /**
   * 获取消息列表
   */
  async getMessages(data: {
    talk_type: number
    receiver_id: number
    page?: number
    limit?: number
    msg_id?: number
  }): Promise<MessageHistory> {
    const response = await this.sendPluginMessage('message.list', data)
    return {
      messages: response.messages || [],
      total: response.total || 0,
      hasMore: response.hasMore || false
    }
  }

  /**
   * 获取消息详情
   */
  async getMessage(messageId: number): Promise<Message | null> {
    const response = await this.sendPluginMessage('message.get', { messageId })
    return response.message || null
  }

  /**
   * 撤回消息
   */
  async recallMessage(messageId: number): Promise<boolean> {
    const response = await this.sendPluginMessage('message.recall', { messageId })
    return response.success || false
  }

  /**
   * 删除消息
   */
  async deleteMessage(messageId: number): Promise<boolean> {
    const response = await this.sendPluginMessage('message.delete', { messageId })
    return response.success || false
  }

  /**
   * 标记消息已读
   */
  async markMessageRead(data: {
    talk_type: number
    receiver_id: number
    msg_id?: number
  }): Promise<boolean> {
    const response = await this.sendPluginMessage('message.read', data)
    return response.success || false
  }

  /**
   * 收藏消息
   */
  async markMessage(messageId: number): Promise<boolean> {
    const response = await this.sendPluginMessage('message.mark', { messageId })
    return response.success || false
  }

  /**
   * 取消收藏消息
   */
  async unmarkMessage(messageId: number): Promise<boolean> {
    const response = await this.sendPluginMessage('message.unmark', { messageId })
    return response.success || false
  }

  /**
   * 搜索消息
   */
  async searchMessages(request: SearchMessageRequest): Promise<MessageHistory> {
    const response = await this.sendPluginMessage('message.search', request)
    return {
      messages: response.messages || [],
      total: response.total || 0,
      hasMore: response.hasMore || false
    }
  }

  /**
   * 获取收藏的消息
   */
  async getMarkedMessages(data: {
    page?: number
    limit?: number
  }): Promise<MessageHistory> {
    const response = await this.sendPluginMessage('message.marked', data)
    return {
      messages: response.messages || [],
      total: response.total || 0,
      hasMore: response.hasMore || false
    }
  }

  // ==================== 会话相关 ====================

  /**
   * 获取会话列表
   */
  async getConversations(): Promise<Conversation[]> {
    const response = await this.sendPluginMessage('conversation.list', {})
    return response.conversations || []
  }

  /**
   * 获取会话详情
   */
  async getConversation(conversationId: number): Promise<Conversation | null> {
    const response = await this.sendPluginMessage('conversation.get', { conversationId })
    return response.conversation || null
  }

  /**
   * 创建会话
   */
  async createConversation(data: {
    type: number
    receiver_id: number
  }): Promise<Conversation | null> {
    const response = await this.sendPluginMessage('conversation.create', data)
    return response.conversation || null
  }

  /**
   * 更新会话信息
   */
  async updateConversation(conversationId: number, data: {
    is_top?: boolean
    is_disturb?: boolean
    is_robot?: boolean
  }): Promise<boolean> {
    const response = await this.sendPluginMessage('conversation.update', {
      conversationId,
      ...data
    })
    return response.success || false
  }

  /**
   * 删除会话
   */
  async deleteConversation(conversationId: number): Promise<boolean> {
    const response = await this.sendPluginMessage('conversation.delete', { conversationId })
    return response.success || false
  }

  /**
   * 置顶会话
   */
  async pinConversation(conversationId: number, isTop: boolean): Promise<boolean> {
    const response = await this.sendPluginMessage('conversation.pin', {
      conversationId,
      is_top: isTop
    })
    return response.success || false
  }

  /**
   * 设置会话免打扰
   */
  async muteConversation(conversationId: number, isDisturb: boolean): Promise<boolean> {
    const response = await this.sendPluginMessage('conversation.mute', {
      conversationId,
      is_disturb: isDisturb
    })
    return response.success || false
  }

  /**
   * 清除会话未读数
   */
  async clearConversationUnread(conversationId: number): Promise<boolean> {
    const response = await this.sendPluginMessage('conversation.clear-unread', { conversationId })
    return response.success || false
  }

  /**
   * 归档会话
   */
  async archiveConversation(conversationId: number): Promise<boolean> {
    const response = await this.sendPluginMessage('conversation.archive', { conversationId })
    return response.success || false
  }

  /**
   * 取消归档会话
   */
  async unarchiveConversation(conversationId: number): Promise<boolean> {
    const response = await this.sendPluginMessage('conversation.unarchive', { conversationId })
    return response.success || false
  }

  /**
   * 搜索会话
   */
  async searchConversations(keyword: string): Promise<Conversation[]> {
    const response = await this.sendPluginMessage('conversation.search', { keyword })
    return response.conversations || []
  }

  /**
   * 获取会话统计信息
   */
  async getConversationStats(): Promise<{
    total: number
    unread: number
    pinned: number
    archived: number
  }> {
    const response = await this.sendPluginMessage('conversation.stats', {})
    return {
      total: response.total || 0,
      unread: response.unread || 0,
      pinned: response.pinned || 0,
      archived: response.archived || 0
    }
  }

  /**
   * 批量操作会话
   */
  async batchUpdateConversations(data: {
    conversation_ids: number[]
    action: 'pin' | 'unpin' | 'mute' | 'unmute' | 'archive' | 'unarchive' | 'delete'
  }): Promise<boolean> {
    const response = await this.sendPluginMessage('conversation.batch', data)
    return response.success || false
  }

  // ==================== 文件相关 ====================

  /**
   * 上传文件
   */
  async uploadFile(file: File, type: 'image' | 'file' | 'voice'): Promise<{
    name: string
    size: number
    suffix: string
    url: string
  } | null> {
    // 这里需要调用基座的文件上传服务
    if (!window.electronAPI?.invoke) {
      throw new Error('Electron API not available')
    }

    const response = await window.electronAPI.invoke('upload-file', {
      file,
      type
    })

    if (!response.success) {
      throw new Error(response.message || '文件上传失败')
    }

    return response.data || null
  }

  // ==================== P2P 消息相关 ====================

  /**
   * 发送P2P消息
   */
  async sendP2PMessage(data: {
    to: string
    content: string
    type?: string
  }): Promise<boolean> {
    const response = await this.sendPluginMessage('p2p.message.send', data)
    return response.success || false
  }

  /**
   * 获取P2P消息历史
   */
  async getP2PMessageHistory(data: {
    peer_id: string
    page?: number
    limit?: number
  }): Promise<any[]> {
    const response = await this.sendPluginMessage('p2p.message.history', data)
    return response.messages || []
  }

  /**
   * 监听P2P消息
   */
  onP2PMessage(callback: (message: any) => void): void {
    if (!window.electronAPI?.p2p?.onMessage) {
      console.warn('P2P message listener not available')
      return
    }

    window.electronAPI.p2p.onMessage(callback)
  }

  /**
   * 移除P2P消息监听
   */
  offP2PMessage(callback: (message: any) => void): void {
    if (!window.electronAPI?.p2p?.offMessage) {
      console.warn('P2P message listener not available')
      return
    }

    window.electronAPI.p2p.offMessage(callback)
  }

  // ==================== 事件监听 ====================

  /**
   * 监听新消息
   */
  onNewMessage(callback: (message: Message) => void): void {
    // 这里需要实现事件监听机制
    // 可以通过基座的事件系统或者插件间通信来实现
    console.log('Message event listener registered')
  }

  /**
   * 监听消息状态变化
   */
  onMessageStatusChange(callback: (data: {
    messageId: number
    status: 'read' | 'recalled' | 'deleted'
  }) => void): void {
    console.log('Message status change listener registered')
  }

  /**
   * 监听会话变化
   */
  onConversationChange(callback: (conversation: Conversation) => void): void {
    console.log('Conversation change listener registered')
  }

  // ==================== 私有方法 ====================

  private async sendPluginMessage(action: string, data: any): Promise<any> {
    if (!window.electronAPI?.invoke) {
      throw new Error('Electron API not available')
    }

    const message = {
      fromPluginId: this.pluginId,
      toPluginId: 'message-plugin',
      action,
      data,
      requestId: this.generateRequestId()
    }

    const response = await window.electronAPI.invoke('plugin-send-message', message)
    
    if (!response.success) {
      throw new Error(response.error || '消息服务调用失败')
    }

    return response.data || {}
  }

  private generateRequestId(): string {
    return `${this.pluginId}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }
}

// 导出工厂函数
export function createMessageSDK(pluginId: string): MessageSDK {
  return new MessageSDK(pluginId)
}

// 默认导出
export default MessageSDK