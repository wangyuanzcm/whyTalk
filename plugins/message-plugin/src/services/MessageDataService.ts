import {
  PluginDataAPI,
  MessageData,
  ConversationData,
  PluginDataOptions
} from '../../../../src/renderer/src/services/plugin/PluginDataAPI'
import { ContactWithGroup } from '../../../contact-plugin/src/services/ContactDataService'

export interface MessageWithDetails extends MessageData {
  id: number
  sender?: ContactWithDetails
  receiver?: ContactWithDetails
  conversation?: ConversationWithDetails
  attachments?: MessageAttachment[]
  reactions?: MessageReaction[]
  reply_to_message?: MessageWithDetails
  forward_from?: MessageWithDetails
  edit_history?: MessageEdit[]
  delivery_status?: 'sending' | 'sent' | 'delivered' | 'read' | 'failed'
  local_path?: string
  thumbnail_path?: string
  created_at?: string
  updated_at?: string
}

export interface ConversationWithDetails extends ConversationData {
  id: number
  participants?: ContactWithDetails[]
  last_message?: MessageWithDetails
  unread_count?: number
  draft_message?: string
  settings?: ConversationSettings
  created_at?: string
  updated_at?: string
}

export interface ContactWithDetails {
  id: number
  user_id: string
  nickname?: string
  avatar?: string
  status?: 'online' | 'offline' | 'away' | 'busy'
  last_seen?: string
}

export interface MessageAttachment {
  id: number
  message_id: number
  type: 'image' | 'file' | 'audio' | 'video'
  name: string
  size: number
  url?: string
  local_path?: string
  thumbnail_path?: string
  mime_type?: string
  duration?: number // for audio/video
  width?: number // for images/videos
  height?: number // for images/videos
  upload_progress?: number
  download_progress?: number
  created_at?: string
}

export interface MessageReaction {
  id: number
  message_id: number
  user_id: string
  emoji: string
  created_at?: string
}

export interface MessageEdit {
  id: number
  message_id: number
  old_content: string
  new_content: string
  edited_at: string
}

export interface ConversationSettings {
  muted?: boolean
  mute_until?: string
  notification_enabled?: boolean
  auto_download_media?: boolean
  message_retention_days?: number
  encryption_enabled?: boolean
}

export interface MessageSearchOptions extends PluginDataOptions {
  keyword?: string
  conversationId?: number
  senderId?: string
  messageType?: string
  dateFrom?: string
  dateTo?: string
  hasAttachments?: boolean
  isUnread?: boolean
}

export interface ConversationSearchOptions extends PluginDataOptions {
  keyword?: string
  type?: 'private' | 'group'
  hasUnread?: boolean
  isPinned?: boolean
  participantId?: string
}

/**
 * 消息插件数据服务
 * 负责消息和会话数据的管理和缓存
 */
export class MessageDataService {
  private api: PluginDataAPI
  private messagesCacheKey = 'messages_cache'
  private conversationsCacheKey = 'conversations_cache'
  private cacheExpiry = 15 * 60 * 1000 // 15分钟缓存

  constructor(pluginId: string = 'message-plugin') {
    this.api = PluginDataAPI.getInstance(pluginId)
  }

  // ==================== 会话管理 ====================

  /**
   * 获取会话列表
   */
  async getConversations(options?: ConversationSearchOptions): Promise<ConversationWithDetails[]> {
    try {
      // 检查权限
      const permission = await this.api.checkPermission('conversations', 'read')
      if (!permission.success || !permission.data?.hasPermission) {
        console.error('没有会话读取权限')
        return []
      }

      // 先尝试从缓存获取
      const cached = await this.api.getData<ConversationWithDetails[]>(this.conversationsCacheKey)
      let conversations: ConversationWithDetails[] = []

      if (cached.success && cached.data) {
        conversations = cached.data
      } else {
        // 从数据库获取
        const dbResult = await this.api.getConversations({
          limit: options?.limit,
          offset: options?.offset,
          sortBy: options?.sortBy,
          sortOrder: options?.sortOrder
        })

        if (dbResult.success && dbResult.data) {
          conversations = await this.enrichConversationsWithDetails(dbResult.data)
          // 更新缓存
          await this.api.setData(this.conversationsCacheKey, conversations, this.cacheExpiry)
        }
      }

      // 应用搜索过滤
      return this.filterConversations(conversations, options)
    } catch (error) {
      console.error('获取会话列表失败:', error)
      return []
    }
  }

  /**
   * 获取单个会话
   */
  async getConversation(conversationId: number): Promise<ConversationWithDetails | null> {
    try {
      const permission = await this.api.checkPermission('conversations', 'read')
      if (!permission.success || !permission.data?.hasPermission) {
        console.error('没有会话读取权限')
        return null
      }

      const result = await this.api.getConversation(conversationId)
      if (!result.success || !result.data) {
        return null
      }

      const conversations = await this.enrichConversationsWithDetails([result.data])
      return conversations[0] || null
    } catch (error) {
      console.error('获取会话失败:', error)
      return null
    }
  }

  /**
   * 创建会话
   */
  async createConversation(
    conversationData: ConversationData & { settings?: ConversationSettings }
  ): Promise<ConversationWithDetails | null> {
    try {
      const permission = await this.api.checkPermission('conversations', 'write')
      if (!permission.success || !permission.data?.hasPermission) {
        console.error('没有会话写入权限')
        return null
      }

      // 准备会话数据
      const newConversationData: ConversationData = {
        ...conversationData,
        plugin_source: 'message-plugin',
        custom_data: {
          settings: conversationData.settings || {},
          unread_count: 0,
          draft_message: '',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      }

      const result = await this.api.createConversation(newConversationData)
      if (!result.success || !result.data) {
        console.error('创建会话失败:', result.error)
        return null
      }

      // 清除缓存以强制刷新
      await this.clearConversationsCache()

      // 获取完整的会话信息
      return await this.getConversation(result.data.conversationId)
    } catch (error) {
      console.error('创建会话失败:', error)
      return null
    }
  }

  /**
   * 更新会话
   */
  async updateConversation(
    conversationId: number,
    updates: Partial<ConversationWithDetails>
  ): Promise<boolean> {
    try {
      const permission = await this.api.checkPermission('conversations', 'write')
      if (!permission.success || !permission.data?.hasPermission) {
        console.error('没有会话写入权限')
        return false
      }

      // 分离数据库字段和自定义字段
      const { settings, unread_count, draft_message, ...dbUpdates } = updates

      // 准备自定义数据更新
      const customDataUpdates: any = {}
      if (settings !== undefined) customDataUpdates.settings = settings
      if (unread_count !== undefined) customDataUpdates.unread_count = unread_count
      if (draft_message !== undefined) customDataUpdates.draft_message = draft_message

      if (Object.keys(customDataUpdates).length > 0) {
        customDataUpdates.updated_at = new Date().toISOString()
        dbUpdates.custom_data = customDataUpdates
      }

      const result = await this.api.updateConversation(conversationId, dbUpdates)
      if (!result.success) {
        console.error('更新会话失败:', result.error)
        return false
      }

      // 更新缓存
      await this.updateConversationInCache(conversationId, updates)

      return true
    } catch (error) {
      console.error('更新会话失败:', error)
      return false
    }
  }

  /**
   * 删除会话
   */
  async deleteConversation(conversationId: number): Promise<boolean> {
    try {
      const permission = await this.api.checkPermission('conversations', 'write')
      if (!permission.success || !permission.data?.hasPermission) {
        console.error('没有会话写入权限')
        return false
      }

      const result = await this.api.deleteConversation(conversationId)
      if (!result.success) {
        console.error('删除会话失败:', result.error)
        return false
      }

      // 从缓存中移除
      await this.removeConversationFromCache(conversationId)

      return true
    } catch (error) {
      console.error('删除会话失败:', error)
      return false
    }
  }

  /**
   * 置顶/取消置顶会话
   */
  async pinConversation(conversationId: number, pinned: boolean): Promise<boolean> {
    try {
      return await this.updateConversation(conversationId, { is_pinned: pinned })
    } catch (error) {
      console.error('置顶会话失败:', error)
      return false
    }
  }

  /**
   * 标记会话为已读
   */
  async markConversationAsRead(conversationId: number): Promise<boolean> {
    try {
      return await this.updateConversation(conversationId, { unread_count: 0 })
    } catch (error) {
      console.error('标记会话已读失败:', error)
      return false
    }
  }

  /**
   * 设置会话草稿
   */
  async setConversationDraft(conversationId: number, draft: string): Promise<boolean> {
    try {
      return await this.updateConversation(conversationId, { draft_message: draft })
    } catch (error) {
      console.error('设置会话草稿失败:', error)
      return false
    }
  }

  // ==================== 消息管理 ====================

  /**
   * 获取消息列表
   */
  async getMessages(
    conversationId?: number,
    options?: MessageSearchOptions
  ): Promise<MessageWithDetails[]> {
    try {
      // 检查权限
      const permission = await this.api.checkPermission('messages', 'read')
      if (!permission.success || !permission.data?.hasPermission) {
        console.error('没有消息读取权限')
        return []
      }

      // 构建缓存键
      const cacheKey = conversationId
        ? `${this.messagesCacheKey}_${conversationId}`
        : this.messagesCacheKey

      // 先尝试从缓存获取
      const cached = await this.api.getCachedMessages(conversationId)
      let messages: MessageWithDetails[] = []

      if (cached.success && cached.data) {
        messages = cached.data
      } else {
        // 从数据库获取
        const dbResult = await this.api.getMessages(conversationId, {
          limit: options?.limit || 50,
          offset: options?.offset,
          sortBy: options?.sortBy || 'created_at',
          sortOrder: options?.sortOrder || 'desc'
        })

        if (dbResult.success && dbResult.data) {
          messages = await this.enrichMessagesWithDetails(dbResult.data)
          // 更新缓存
          await this.api.cacheMessages(messages, conversationId)
        }
      }

      // 应用搜索过滤
      return this.filterMessages(messages, options)
    } catch (error) {
      console.error('获取消息列表失败:', error)
      return []
    }
  }

  /**
   * 获取单个消息
   */
  async getMessage(messageId: number): Promise<MessageWithDetails | null> {
    try {
      const permission = await this.api.checkPermission('messages', 'read')
      if (!permission.success || !permission.data?.hasPermission) {
        console.error('没有消息读取权限')
        return null
      }

      const result = await this.api.getMessage(messageId)
      if (!result.success || !result.data) {
        return null
      }

      const messages = await this.enrichMessagesWithDetails([result.data])
      return messages[0] || null
    } catch (error) {
      console.error('获取消息失败:', error)
      return null
    }
  }

  /**
   * 发送消息
   */
  async sendMessage(
    messageData: MessageData & {
      attachments?: Omit<MessageAttachment, 'id' | 'message_id'>[]
      reply_to_message_id?: number
      forward_from_message_id?: number
    }
  ): Promise<MessageWithDetails | null> {
    try {
      const permission = await this.api.checkPermission('messages', 'write')
      if (!permission.success || !permission.data?.hasPermission) {
        console.error('没有消息写入权限')
        return null
      }

      // 准备消息数据
      const newMessageData: MessageData = {
        ...messageData,
        plugin_source: 'message-plugin',
        custom_data: {
          attachments: messageData.attachments || [],
          reactions: [],
          edit_history: [],
          delivery_status: 'sending',
          reply_to_message_id: messageData.reply_to_message_id,
          forward_from_message_id: messageData.forward_from_message_id,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      }

      const result = await this.api.sendMessage(newMessageData)
      if (!result.success || !result.data) {
        console.error('发送消息失败:', result.error)
        return null
      }

      // 更新会话的最后消息时间和未读计数
      if (messageData.conversation_id) {
        await this.updateConversationLastMessage(messageData.conversation_id, result.data.messageId)
      }

      // 清除相关缓存
      await this.clearMessagesCache(messageData.conversation_id)

      // 获取完整的消息信息
      return await this.getMessage(result.data.messageId)
    } catch (error) {
      console.error('发送消息失败:', error)
      return null
    }
  }

  /**
   * 更新消息
   */
  async updateMessage(messageId: number, updates: Partial<MessageWithDetails>): Promise<boolean> {
    try {
      const permission = await this.api.checkPermission('messages', 'write')
      if (!permission.success || !permission.data?.hasPermission) {
        console.error('没有消息写入权限')
        return false
      }

      // 如果是编辑消息内容，记录编辑历史
      if (updates.content) {
        const originalMessage = await this.getMessage(messageId)
        if (originalMessage && originalMessage.content !== updates.content) {
          const editHistory = originalMessage.edit_history || []
          editHistory.push({
            id: editHistory.length + 1,
            message_id: messageId,
            old_content: originalMessage.content,
            new_content: updates.content,
            edited_at: new Date().toISOString()
          })
          updates.edit_history = editHistory
        }
      }

      // 分离数据库字段和自定义字段
      const {
        attachments,
        reactions,
        edit_history,
        delivery_status,
        reply_to_message,
        forward_from,
        local_path,
        thumbnail_path,
        ...dbUpdates
      } = updates

      // 准备自定义数据更新
      const customDataUpdates: any = {}
      if (attachments !== undefined) customDataUpdates.attachments = attachments
      if (reactions !== undefined) customDataUpdates.reactions = reactions
      if (edit_history !== undefined) customDataUpdates.edit_history = edit_history
      if (delivery_status !== undefined) customDataUpdates.delivery_status = delivery_status
      if (local_path !== undefined) customDataUpdates.local_path = local_path
      if (thumbnail_path !== undefined) customDataUpdates.thumbnail_path = thumbnail_path

      if (Object.keys(customDataUpdates).length > 0) {
        customDataUpdates.updated_at = new Date().toISOString()
        dbUpdates.custom_data = customDataUpdates
      }

      const result = await this.api.updateMessage(messageId, dbUpdates)
      if (!result.success) {
        console.error('更新消息失败:', result.error)
        return false
      }

      // 更新缓存
      await this.updateMessageInCache(messageId, updates)

      return true
    } catch (error) {
      console.error('更新消息失败:', error)
      return false
    }
  }

  /**
   * 删除消息
   */
  async deleteMessage(messageId: number): Promise<boolean> {
    try {
      const permission = await this.api.checkPermission('messages', 'write')
      if (!permission.success || !permission.data?.hasPermission) {
        console.error('没有消息写入权限')
        return false
      }

      const result = await this.api.deleteMessage(messageId)
      if (!result.success) {
        console.error('删除消息失败:', result.error)
        return false
      }

      // 从缓存中移除
      await this.removeMessageFromCache(messageId)

      return true
    } catch (error) {
      console.error('删除消息失败:', error)
      return false
    }
  }

  /**
   * 撤回消息
   */
  async recallMessage(messageId: number): Promise<boolean> {
    try {
      return await this.updateMessage(messageId, {
        content: '[消息已撤回]',
        message_type: 'system',
        delivery_status: 'recalled'
      })
    } catch (error) {
      console.error('撤回消息失败:', error)
      return false
    }
  }

  /**
   * 标记消息为已读
   */
  async markMessageAsRead(messageId: number): Promise<boolean> {
    try {
      const permission = await this.api.checkPermission('messages', 'write')
      if (!permission.success || !permission.data?.hasPermission) {
        console.error('没有消息写入权限')
        return false
      }

      const result = await this.api.markMessageAsRead(messageId)
      if (!result.success) {
        console.error('标记消息已读失败:', result.error)
        return false
      }

      return true
    } catch (error) {
      console.error('标记消息已读失败:', error)
      return false
    }
  }

  /**
   * 添加消息反应
   */
  async addMessageReaction(messageId: number, emoji: string, userId: string): Promise<boolean> {
    try {
      const message = await this.getMessage(messageId)
      if (!message) return false

      const reactions = message.reactions || []
      const existingReaction = reactions.find((r) => r.user_id === userId && r.emoji === emoji)

      if (existingReaction) {
        // 已存在相同反应，移除它
        const updatedReactions = reactions.filter(
          (r) => !(r.user_id === userId && r.emoji === emoji)
        )
        return await this.updateMessage(messageId, { reactions: updatedReactions })
      } else {
        // 添加新反应
        reactions.push({
          id: reactions.length + 1,
          message_id: messageId,
          user_id: userId,
          emoji,
          created_at: new Date().toISOString()
        })
        return await this.updateMessage(messageId, { reactions })
      }
    } catch (error) {
      console.error('添加消息反应失败:', error)
      return false
    }
  }

  /**
   * 更新消息传输状态
   */
  async updateMessageDeliveryStatus(
    messageId: number,
    status: 'sending' | 'sent' | 'delivered' | 'read' | 'failed'
  ): Promise<boolean> {
    try {
      return await this.updateMessage(messageId, { delivery_status: status })
    } catch (error) {
      console.error('更新消息传输状态失败:', error)
      return false
    }
  }

  // ==================== 文件传输管理 ====================

  /**
   * 添加文件附件
   */
  async addMessageAttachment(
    messageId: number,
    attachment: Omit<MessageAttachment, 'id' | 'message_id'>
  ): Promise<MessageAttachment | null> {
    try {
      const message = await this.getMessage(messageId)
      if (!message) return null

      const attachments = message.attachments || []
      const newAttachment: MessageAttachment = {
        ...attachment,
        id: attachments.length + 1,
        message_id: messageId,
        created_at: new Date().toISOString()
      }

      attachments.push(newAttachment)
      const success = await this.updateMessage(messageId, { attachments })

      return success ? newAttachment : null
    } catch (error) {
      console.error('添加消息附件失败:', error)
      return null
    }
  }

  /**
   * 更新文件传输进度
   */
  async updateAttachmentProgress(
    messageId: number,
    attachmentId: number,
    progress: { upload_progress?: number; download_progress?: number }
  ): Promise<boolean> {
    try {
      const message = await this.getMessage(messageId)
      if (!message || !message.attachments) return false

      const attachments = message.attachments.map((att) =>
        att.id === attachmentId ? { ...att, ...progress } : att
      )

      return await this.updateMessage(messageId, { attachments })
    } catch (error) {
      console.error('更新文件传输进度失败:', error)
      return false
    }
  }

  /**
   * 获取文件传输列表
   */
  async getFileTransfers(conversationId?: number): Promise<MessageAttachment[]> {
    try {
      const messages = await this.getMessages(conversationId, { hasAttachments: true })
      const attachments: MessageAttachment[] = []

      messages.forEach((message) => {
        if (message.attachments) {
          attachments.push(...message.attachments)
        }
      })

      return attachments.sort(
        (a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime()
      )
    } catch (error) {
      console.error('获取文件传输列表失败:', error)
      return []
    }
  }

  // ==================== 搜索功能 ====================

  /**
   * 搜索消息
   */
  async searchMessages(
    keyword: string,
    options?: MessageSearchOptions
  ): Promise<MessageWithDetails[]> {
    const searchOptions: MessageSearchOptions = {
      ...options,
      keyword: keyword.toLowerCase()
    }

    return await this.getMessages(options?.conversationId, searchOptions)
  }

  /**
   * 搜索会话
   */
  async searchConversations(
    keyword: string,
    options?: ConversationSearchOptions
  ): Promise<ConversationWithDetails[]> {
    const searchOptions: ConversationSearchOptions = {
      ...options,
      keyword: keyword.toLowerCase()
    }

    return await this.getConversations(searchOptions)
  }

  /**
   * 获取未读消息
   */
  async getUnreadMessages(conversationId?: number): Promise<MessageWithDetails[]> {
    return await this.getMessages(conversationId, { isUnread: true })
  }

  /**
   * 获取置顶会话
   */
  async getPinnedConversations(): Promise<ConversationWithDetails[]> {
    return await this.getConversations({ isPinned: true })
  }

  /**
   * 获取媒体消息
   */
  async getMediaMessages(
    conversationId?: number,
    mediaType?: 'image' | 'video' | 'audio' | 'file'
  ): Promise<MessageWithDetails[]> {
    const messages = await this.getMessages(conversationId, { hasAttachments: true })

    if (!mediaType) return messages

    return messages.filter((message) => message.attachments?.some((att) => att.type === mediaType))
  }

  // ==================== 辅助方法 ====================

  /**
   * 为会话添加详细信息
   */
  private async enrichConversationsWithDetails(
    conversations: any[]
  ): Promise<ConversationWithDetails[]> {
    // 获取联系人信息（通过共享数据）
    const contactsResult = await this.api.getSharedData<ContactWithGroup[]>('contacts', 'cache')
    const contacts = contactsResult.success && contactsResult.data ? contactsResult.data : []
    const contactMap = new Map(contacts.map((c) => [c.user_id, c]))

    return conversations.map((conversation) => {
      const customData = conversation.custom_data || {}

      // 获取参与者信息
      const participants: ContactWithDetails[] = []
      if (conversation.participant_ids) {
        conversation.participant_ids.forEach((userId: string) => {
          const contact = contactMap.get(userId)
          if (contact) {
            participants.push({
              id: contact.id,
              user_id: userId,
              nickname: contact.nickname,
              avatar: contact.avatar,
              status: contact.status,
              last_seen: contact.last_seen
            })
          }
        })
      }

      return {
        ...conversation,
        participants,
        unread_count: customData.unread_count || 0,
        draft_message: customData.draft_message || '',
        settings: customData.settings || {},
        created_at: customData.created_at,
        updated_at: customData.updated_at
      }
    })
  }

  /**
   * 为消息添加详细信息
   */
  private async enrichMessagesWithDetails(messages: any[]): Promise<MessageWithDetails[]> {
    // 获取联系人信息（通过共享数据）
    const contactsResult = await this.api.getSharedData<ContactWithGroup[]>('contacts', 'cache')
    const contacts = contactsResult.success && contactsResult.data ? contactsResult.data : []
    const contactMap = new Map(contacts.map((c) => [c.user_id, c]))

    return messages.map((message) => {
      const customData = message.custom_data || {}

      // 获取发送者和接收者信息
      const sender = contactMap.get(message.sender_id)
      const receiver = contactMap.get(message.receiver_id)

      return {
        ...message,
        sender: sender
          ? {
              id: sender.id,
              user_id: message.sender_id,
              nickname: sender.nickname,
              avatar: sender.avatar,
              status: sender.status,
              last_seen: sender.last_seen
            }
          : undefined,
        receiver: receiver
          ? {
              id: receiver.id,
              user_id: message.receiver_id,
              nickname: receiver.nickname,
              avatar: receiver.avatar,
              status: receiver.status,
              last_seen: receiver.last_seen
            }
          : undefined,
        attachments: customData.attachments || [],
        reactions: customData.reactions || [],
        edit_history: customData.edit_history || [],
        delivery_status: customData.delivery_status || 'sent',
        local_path: customData.local_path,
        thumbnail_path: customData.thumbnail_path,
        created_at: customData.created_at,
        updated_at: customData.updated_at
      }
    })
  }

  /**
   * 过滤消息
   */
  private filterMessages(
    messages: MessageWithDetails[],
    options?: MessageSearchOptions
  ): MessageWithDetails[] {
    if (!options) return messages

    let filtered = messages

    // 关键词搜索
    if (options.keyword) {
      const keyword = options.keyword.toLowerCase()
      filtered = filtered.filter(
        (message) =>
          message.content.toLowerCase().includes(keyword) ||
          message.sender?.nickname?.toLowerCase().includes(keyword)
      )
    }

    // 会话过滤
    if (options.conversationId !== undefined) {
      filtered = filtered.filter((message) => message.conversation_id === options.conversationId)
    }

    // 发送者过滤
    if (options.senderId) {
      filtered = filtered.filter((message) => message.sender_id === options.senderId)
    }

    // 消息类型过滤
    if (options.messageType) {
      filtered = filtered.filter((message) => message.message_type === options.messageType)
    }

    // 日期范围过滤
    if (options.dateFrom) {
      const fromDate = new Date(options.dateFrom)
      filtered = filtered.filter((message) => new Date(message.created_at || 0) >= fromDate)
    }

    if (options.dateTo) {
      const toDate = new Date(options.dateTo)
      filtered = filtered.filter((message) => new Date(message.created_at || 0) <= toDate)
    }

    // 附件过滤
    if (options.hasAttachments !== undefined) {
      filtered = filtered.filter((message) =>
        options.hasAttachments
          ? message.attachments && message.attachments.length > 0
          : !message.attachments || message.attachments.length === 0
      )
    }

    // 未读过滤
    if (options.isUnread !== undefined) {
      filtered = filtered.filter((message) =>
        options.isUnread ? !message.is_read : message.is_read
      )
    }

    return filtered
  }

  /**
   * 过滤会话
   */
  private filterConversations(
    conversations: ConversationWithDetails[],
    options?: ConversationSearchOptions
  ): ConversationWithDetails[] {
    if (!options) return conversations

    let filtered = conversations

    // 关键词搜索
    if (options.keyword) {
      const keyword = options.keyword.toLowerCase()
      filtered = filtered.filter(
        (conversation) =>
          conversation.title?.toLowerCase().includes(keyword) ||
          conversation.participants?.some((p) => p.nickname?.toLowerCase().includes(keyword))
      )
    }

    // 类型过滤
    if (options.type) {
      filtered = filtered.filter((conversation) => conversation.conversation_type === options.type)
    }

    // 未读过滤
    if (options.hasUnread !== undefined) {
      filtered = filtered.filter((conversation) =>
        options.hasUnread
          ? conversation.unread_count && conversation.unread_count > 0
          : !conversation.unread_count || conversation.unread_count === 0
      )
    }

    // 置顶过滤
    if (options.isPinned !== undefined) {
      filtered = filtered.filter((conversation) => conversation.is_pinned === options.isPinned)
    }

    // 参与者过滤
    if (options.participantId) {
      filtered = filtered.filter((conversation) =>
        conversation.participants?.some((p) => p.user_id === options.participantId)
      )
    }

    // 默认排序：置顶在前，然后按最后消息时间倒序
    filtered.sort((a, b) => {
      if (a.is_pinned && !b.is_pinned) return -1
      if (!a.is_pinned && b.is_pinned) return 1

      const aTime = new Date(a.last_message_at || a.updated_at || 0).getTime()
      const bTime = new Date(b.last_message_at || b.updated_at || 0).getTime()
      return bTime - aTime
    })

    return filtered
  }

  /**
   * 更新会话的最后消息
   */
  private async updateConversationLastMessage(
    conversationId: number,
    messageId: number
  ): Promise<void> {
    try {
      await this.updateConversation(conversationId, {
        last_message_id: messageId,
        last_message_at: new Date().toISOString()
      })
    } catch (error) {
      console.error('更新会话最后消息失败:', error)
    }
  }

  /**
   * 更新缓存中的会话
   */
  private async updateConversationInCache(
    conversationId: number,
    updates: Partial<ConversationWithDetails>
  ): Promise<void> {
    try {
      const cached = await this.api.getData<ConversationWithDetails[]>(this.conversationsCacheKey)
      if (!cached.success || !cached.data) return

      const conversations = cached.data
      const index = conversations.findIndex((c) => c.id === conversationId)

      if (index >= 0) {
        conversations[index] = { ...conversations[index], ...updates }
        await this.api.setData(this.conversationsCacheKey, conversations, this.cacheExpiry)
      }
    } catch (error) {
      console.error('更新会话缓存失败:', error)
    }
  }

  /**
   * 更新缓存中的消息
   */
  private async updateMessageInCache(
    messageId: number,
    updates: Partial<MessageWithDetails>
  ): Promise<void> {
    try {
      // 更新所有相关的消息缓存
      const message = await this.getMessage(messageId)
      if (message && message.conversation_id) {
        const cached = await this.api.getCachedMessages(message.conversation_id)
        if (cached.success && cached.data) {
          const messages = cached.data
          const index = messages.findIndex((m: any) => m.id === messageId)

          if (index >= 0) {
            messages[index] = { ...messages[index], ...updates }
            await this.api.cacheMessages(messages, message.conversation_id)
          }
        }
      }
    } catch (error) {
      console.error('更新消息缓存失败:', error)
    }
  }

  /**
   * 从缓存中移除会话
   */
  private async removeConversationFromCache(conversationId: number): Promise<void> {
    try {
      const cached = await this.api.getData<ConversationWithDetails[]>(this.conversationsCacheKey)
      if (!cached.success || !cached.data) return

      const conversations = cached.data.filter((c) => c.id !== conversationId)
      await this.api.setData(this.conversationsCacheKey, conversations, this.cacheExpiry)
    } catch (error) {
      console.error('从缓存移除会话失败:', error)
    }
  }

  /**
   * 从缓存中移除消息
   */
  private async removeMessageFromCache(messageId: number): Promise<void> {
    try {
      // 需要找到消息所属的会话，然后从对应的缓存中移除
      const message = await this.getMessage(messageId)
      if (message && message.conversation_id) {
        const cached = await this.api.getCachedMessages(message.conversation_id)
        if (cached.success && cached.data) {
          const messages = cached.data.filter((m: any) => m.id !== messageId)
          await this.api.cacheMessages(messages, message.conversation_id)
        }
      }
    } catch (error) {
      console.error('从缓存移除消息失败:', error)
    }
  }

  /**
   * 清除消息缓存
   */
  async clearMessagesCache(conversationId?: number): Promise<void> {
    try {
      if (conversationId) {
        await this.api.deleteData(`${this.messagesCacheKey}_${conversationId}`)
      } else {
        await this.api.deleteData(this.messagesCacheKey)
      }
    } catch (error) {
      console.error('清除消息缓存失败:', error)
    }
  }

  /**
   * 清除会话缓存
   */
  async clearConversationsCache(): Promise<void> {
    try {
      await this.api.deleteData(this.conversationsCacheKey)
    } catch (error) {
      console.error('清除会话缓存失败:', error)
    }
  }

  /**
   * 同步数据
   */
  async syncData(): Promise<boolean> {
    try {
      // 清除所有缓存
      await this.clearMessagesCache()
      await this.clearConversationsCache()

      // 重新获取数据
      const conversations = await this.getConversations()

      console.log(`同步完成，共 ${conversations.length} 个会话`)
      return true
    } catch (error) {
      console.error('同步数据失败:', error)
      return false
    }
  }

  /**
   * 获取统计信息
   */
  async getStatistics(): Promise<{
    totalConversations: number
    totalMessages: number
    unreadMessages: number
    totalAttachments: number
  }> {
    try {
      const conversations = await this.getConversations()
      const allMessages = await this.getMessages()
      const unreadMessages = await this.getUnreadMessages()
      const attachments = await this.getFileTransfers()

      return {
        totalConversations: conversations.length,
        totalMessages: allMessages.length,
        unreadMessages: unreadMessages.length,
        totalAttachments: attachments.length
      }
    } catch (error) {
      console.error('获取统计信息失败:', error)
      return {
        totalConversations: 0,
        totalMessages: 0,
        unreadMessages: 0,
        totalAttachments: 0
      }
    }
  }
}
