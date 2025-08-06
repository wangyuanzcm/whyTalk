import { EventEmitter } from 'events'

export interface Conversation {
  id: string
  type: 'private' | 'group'
  name: string
  avatar: string
  last_message?: {
    id: string
    content: string
    sender_id: string
    sender_name: string
    message_type: string
    created_at: string
  }
  unread_count: number
  is_pinned: boolean
  is_muted: boolean
  is_archived: boolean
  created_at: string
  updated_at: string
  // 私聊相关
  friend_id?: string
  friend_remark?: string
  // 群聊相关
  group_id?: string
  member_count?: number
  my_role?: string
}

export interface CreateConversationRequest {
  type: 'private' | 'group'
  friend_id?: string
  group_id?: string
  name?: string
}

export interface UpdateConversationRequest {
  name?: string
  is_pinned?: boolean
  is_muted?: boolean
  is_archived?: boolean
}

export interface ConversationList {
  conversations: Conversation[]
  total: number
  unread_total: number
}

export class ConversationService extends EventEmitter {
  private pluginId: string

  constructor(pluginId: string) {
    super()
    this.pluginId = pluginId
    this.initializeEventListeners()
  }

  private initializeEventListeners() {
    // 监听来自基座的会话事件
    if (window.electronAPI && window.electronAPI.on) {
      window.electronAPI.on('conversation:created', (conversation: Conversation) => {
        this.emit('conversation:created', conversation)
      })

      window.electronAPI.on('conversation:updated', (conversation: Conversation) => {
        this.emit('conversation:updated', conversation)
      })

      window.electronAPI.on('conversation:deleted', (conversationId: string) => {
        this.emit('conversation:deleted', conversationId)
      })

      window.electronAPI.on(
        'conversation:unread-changed',
        (data: { id: string; count: number }) => {
          this.emit('conversation:unread-changed', data)
        }
      )

      window.electronAPI.on(
        'conversation:message-received',
        (data: { conversationId: string; message: any }) => {
          this.emit('conversation:message-received', data)
        }
      )
    }
  }

  // 获取会话列表
  public async getConversationList(
    userId: string,
    limit: number = 50,
    offset: number = 0
  ): Promise<ConversationList> {
    try {
      const response = await window.electronAPI.invoke('plugin-api-call', {
        pluginId: this.pluginId,
        method: 'GET',
        url: '/api/v1/talk/list',
        data: {
          user_id: userId,
          limit,
          offset
        }
      })

      if (response.success) {
        return {
          conversations: response.data.items || [],
          total: response.data.total || 0,
          unread_total: response.data.unread_total || 0
        }
      } else {
        throw new Error(response.error || '获取会话列表失败')
      }
    } catch (error) {
      console.error('Failed to get conversation list:', error)
      throw error
    }
  }

  // 获取单个会话
  public async getConversation(userId: string, conversationId: string): Promise<Conversation> {
    try {
      const response = await window.electronAPI.invoke('plugin-api-call', {
        pluginId: this.pluginId,
        method: 'GET',
        url: '/api/v1/talk/detail',
        data: {
          user_id: userId,
          conversation_id: conversationId
        }
      })

      if (response.success) {
        return response.data
      } else {
        throw new Error(response.error || '获取会话详情失败')
      }
    } catch (error) {
      console.error('Failed to get conversation:', error)
      throw error
    }
  }

  // 创建会话
  public async createConversation(
    userId: string,
    data: CreateConversationRequest
  ): Promise<Conversation> {
    try {
      const response = await window.electronAPI.invoke('plugin-api-call', {
        pluginId: this.pluginId,
        method: 'POST',
        url: '/api/v1/talk/create',
        data: {
          user_id: userId,
          ...data
        }
      })

      if (response.success) {
        const conversation = response.data
        this.emit('conversation:created', conversation)
        return conversation
      } else {
        throw new Error(response.error || '创建会话失败')
      }
    } catch (error) {
      console.error('Failed to create conversation:', error)
      throw error
    }
  }

  // 更新会话
  public async updateConversation(
    userId: string,
    conversationId: string,
    data: UpdateConversationRequest
  ): Promise<void> {
    try {
      const response = await window.electronAPI.invoke('plugin-api-call', {
        pluginId: this.pluginId,
        method: 'PUT',
        url: '/api/v1/talk/update',
        data: {
          user_id: userId,
          conversation_id: conversationId,
          ...data
        }
      })

      if (!response.success) {
        throw new Error(response.error || '更新会话失败')
      }

      this.emit('conversation:updated', { id: conversationId, ...data })
    } catch (error) {
      console.error('Failed to update conversation:', error)
      throw error
    }
  }

  // 删除会话
  public async deleteConversation(userId: string, conversationId: string): Promise<void> {
    try {
      const response = await window.electronAPI.invoke('plugin-api-call', {
        pluginId: this.pluginId,
        method: 'DELETE',
        url: '/api/v1/talk/delete',
        data: {
          user_id: userId,
          conversation_id: conversationId
        }
      })

      if (!response.success) {
        throw new Error(response.error || '删除会话失败')
      }

      this.emit('conversation:deleted', conversationId)
    } catch (error) {
      console.error('Failed to delete conversation:', error)
      throw error
    }
  }

  // 置顶会话
  public async pinConversation(
    userId: string,
    conversationId: string,
    isPinned: boolean = true
  ): Promise<void> {
    try {
      const response = await window.electronAPI.invoke('plugin-api-call', {
        pluginId: this.pluginId,
        method: 'PUT',
        url: '/api/v1/talk/top',
        data: {
          user_id: userId,
          conversation_id: conversationId,
          is_top: isPinned ? 1 : 0
        }
      })

      if (!response.success) {
        throw new Error(response.error || '置顶会话失败')
      }

      this.emit('conversation:pinned', { conversationId, isPinned })
    } catch (error) {
      console.error('Failed to pin conversation:', error)
      throw error
    }
  }

  // 设置免打扰
  public async muteConversation(
    userId: string,
    conversationId: string,
    isMuted: boolean = true
  ): Promise<void> {
    try {
      const response = await window.electronAPI.invoke('plugin-api-call', {
        pluginId: this.pluginId,
        method: 'PUT',
        url: '/api/v1/talk/disturb',
        data: {
          user_id: userId,
          conversation_id: conversationId,
          is_disturb: isMuted ? 0 : 1 // 注意：0表示免打扰，1表示不免打扰
        }
      })

      if (!response.success) {
        throw new Error(response.error || '设置免打扰失败')
      }

      this.emit('conversation:muted', { conversationId, isMuted })
    } catch (error) {
      console.error('Failed to mute conversation:', error)
      throw error
    }
  }

  // 清除未读消息
  public async clearUnreadCount(userId: string, conversationId: string): Promise<void> {
    try {
      const response = await window.electronAPI.invoke('plugin-api-call', {
        pluginId: this.pluginId,
        method: 'PUT',
        url: '/api/v1/talk/unread/clear',
        data: {
          user_id: userId,
          conversation_id: conversationId
        }
      })

      if (!response.success) {
        throw new Error(response.error || '清除未读失败')
      }

      this.emit('conversation:unread-cleared', conversationId)
    } catch (error) {
      console.error('Failed to clear unread count:', error)
      throw error
    }
  }

  // 归档会话
  public async archiveConversation(
    userId: string,
    conversationId: string,
    isArchived: boolean = true
  ): Promise<void> {
    try {
      const response = await window.electronAPI.invoke('plugin-api-call', {
        pluginId: this.pluginId,
        method: 'PUT',
        url: '/api/v1/talk/archive',
        data: {
          user_id: userId,
          conversation_id: conversationId,
          is_archived: isArchived ? 1 : 0
        }
      })

      if (!response.success) {
        throw new Error(response.error || '归档会话失败')
      }

      this.emit('conversation:archived', { conversationId, isArchived })
    } catch (error) {
      console.error('Failed to archive conversation:', error)
      throw error
    }
  }

  // 搜索会话
  public async searchConversations(
    userId: string,
    keyword: string,
    limit: number = 20
  ): Promise<Conversation[]> {
    try {
      const response = await window.electronAPI.invoke('plugin-api-call', {
        pluginId: this.pluginId,
        method: 'GET',
        url: '/api/v1/talk/search',
        data: {
          user_id: userId,
          keyword,
          limit
        }
      })

      if (response.success) {
        return response.data.items || []
      } else {
        throw new Error(response.error || '搜索会话失败')
      }
    } catch (error) {
      console.error('Failed to search conversations:', error)
      throw error
    }
  }

  // 获取会话统计信息
  public async getConversationStats(userId: string): Promise<{
    total: number
    unread_total: number
    pinned_count: number
    muted_count: number
    archived_count: number
  }> {
    try {
      const response = await window.electronAPI.invoke('plugin-api-call', {
        pluginId: this.pluginId,
        method: 'GET',
        url: '/api/v1/talk/stats',
        data: {
          user_id: userId
        }
      })

      if (response.success) {
        return response.data
      } else {
        throw new Error(response.error || '获取会话统计失败')
      }
    } catch (error) {
      console.error('Failed to get conversation stats:', error)
      throw error
    }
  }

  // 批量操作会话
  public async batchUpdateConversations(
    userId: string,
    conversationIds: string[],
    action: 'pin' | 'unpin' | 'mute' | 'unmute' | 'archive' | 'unarchive' | 'delete'
  ): Promise<void> {
    try {
      const response = await window.electronAPI.invoke('plugin-api-call', {
        pluginId: this.pluginId,
        method: 'PUT',
        url: '/api/v1/talk/batch',
        data: {
          user_id: userId,
          conversation_ids: conversationIds,
          action
        }
      })

      if (!response.success) {
        throw new Error(response.error || '批量操作失败')
      }

      this.emit('conversation:batch-updated', { conversationIds, action })
    } catch (error) {
      console.error('Failed to batch update conversations:', error)
      throw error
    }
  }

  // 插件数据访问接口
  public async getConversationsForPlugin(
    limit: number = 50,
    offset: number = 0
  ): Promise<Conversation[]> {
    try {
      const response = await window.electronAPI.invoke('plugin-api-call', {
        pluginId: this.pluginId,
        method: 'GET',
        url: '/plugin/data/conversations',
        data: {
          limit,
          offset
        }
      })

      if (response.success) {
        return response.data || []
      } else {
        throw new Error(response.error || '获取插件会话数据失败')
      }
    } catch (error) {
      console.error('Failed to get conversations for plugin:', error)
      throw error
    }
  }

  public async getConversationForPlugin(conversationId: string): Promise<Conversation | null> {
    try {
      const response = await window.electronAPI.invoke('plugin-api-call', {
        pluginId: this.pluginId,
        method: 'GET',
        url: '/plugin/data/conversation',
        data: {
          conversation_id: conversationId
        }
      })

      if (response.success) {
        return response.data
      } else {
        return null
      }
    } catch (error) {
      console.error('Failed to get conversation for plugin:', error)
      return null
    }
  }

  public async createConversationForPlugin(data: CreateConversationRequest): Promise<Conversation> {
    try {
      const response = await window.electronAPI.invoke('plugin-api-call', {
        pluginId: this.pluginId,
        method: 'POST',
        url: '/plugin/data/conversation/create',
        data
      })

      if (response.success) {
        const conversation = response.data
        this.emit('conversation:created', conversation)
        return conversation
      } else {
        throw new Error(response.error || '创建插件会话失败')
      }
    } catch (error) {
      console.error('Failed to create conversation for plugin:', error)
      throw error
    }
  }

  public async deleteConversationForPlugin(conversationId: string): Promise<void> {
    try {
      const response = await window.electronAPI.invoke('plugin-api-call', {
        pluginId: this.pluginId,
        method: 'DELETE',
        url: '/plugin/data/conversation/delete',
        data: {
          conversation_id: conversationId
        }
      })

      if (!response.success) {
        throw new Error(response.error || '删除插件会话失败')
      }

      this.emit('conversation:deleted', conversationId)
    } catch (error) {
      console.error('Failed to delete conversation for plugin:', error)
      throw error
    }
  }

  // 实时同步
  public async syncConversations(): Promise<void> {
    try {
      const response = await window.electronAPI.invoke('plugin-api-call', {
        pluginId: this.pluginId,
        method: 'POST',
        url: '/api/v1/talk/sync',
        data: {}
      })

      if (!response.success) {
        throw new Error(response.error || '同步会话失败')
      }

      this.emit('conversation:synced')
    } catch (error) {
      console.error('Failed to sync conversations:', error)
      throw error
    }
  }

  // 导出会话数据
  public async exportConversationData(
    conversationId: string,
    format: 'json' | 'txt' | 'html' = 'json'
  ): Promise<string> {
    try {
      const response = await window.electronAPI.invoke('plugin-api-call', {
        pluginId: this.pluginId,
        method: 'GET',
        url: '/api/v1/talk/export',
        data: {
          conversation_id: conversationId,
          format
        }
      })

      if (response.success) {
        return response.data.content
      } else {
        throw new Error(response.error || '导出会话数据失败')
      }
    } catch (error) {
      console.error('Failed to export conversation data:', error)
      throw error
    }
  }
}

export const conversationService = new ConversationService('message-plugin')
