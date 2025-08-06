import { EventEmitter } from 'events'

export interface Message {
  id: string
  conversation_id: string
  sender_id: string
  receiver_id?: string
  group_id?: string
  message_type: 'text' | 'image' | 'file' | 'audio' | 'video' | 'system'
  content: string
  file_url?: string
  file_name?: string
  file_size?: number
  reply_to?: string
  is_read: boolean
  is_recalled: boolean
  created_at: string
  updated_at: string
  extra_data?: any
}

export interface SendMessageRequest {
  conversation_id: string
  receiver_id?: string
  group_id?: string
  message_type: 'text' | 'image' | 'file' | 'audio' | 'video'
  content: string
  file_url?: string
  file_name?: string
  file_size?: number
  reply_to?: string
  extra_data?: any
}

export interface MessageHistory {
  messages: Message[]
  total: number
  has_more: boolean
}

export interface SearchMessageRequest {
  keyword: string
  conversation_id?: string
  message_type?: string
  start_date?: string
  end_date?: string
  limit?: number
  offset?: number
}

export interface P2PMessage {
  id: string
  from: string
  to?: string
  group?: string
  type: 'direct' | 'group'
  content: any
  timestamp: number
  signature?: string
}

export class MessageService extends EventEmitter {
  private pluginId: string

  constructor(pluginId: string) {
    super()
    this.pluginId = pluginId
    this.initializeEventListeners()
  }

  private initializeEventListeners() {
    // 监听来自基座的消息事件
    if (window.electronAPI && window.electronAPI.on) {
      window.electronAPI.on('message:received', (message: Message) => {
        this.emit('message:received', message)
      })

      window.electronAPI.on('message:sent', (message: Message) => {
        this.emit('message:sent', message)
      })

      window.electronAPI.on('message:recalled', (messageId: string) => {
        this.emit('message:recalled', messageId)
      })

      window.electronAPI.on('message:read', (messageId: string) => {
        this.emit('message:read', messageId)
      })

      // P2P 消息事件
      window.electronAPI.on('p2p:message:received', (message: P2PMessage) => {
        this.emit('p2p:message:received', message)
      })
    }
  }

  // 发送消息
  public async sendMessage(userId: string, data: SendMessageRequest): Promise<Message> {
    try {
      const response = await window.electronAPI.invoke('plugin-api-call', {
        pluginId: this.pluginId,
        method: 'POST',
        url: '/api/v1/talk/message/send',
        data: {
          user_id: userId,
          ...data
        }
      })

      if (response.success) {
        const message = response.data
        this.emit('message:sent', message)
        return message
      } else {
        throw new Error(response.error || '发送消息失败')
      }
    } catch (error) {
      console.error('Failed to send message:', error)
      throw error
    }
  }

  // 撤回消息
  public async recallMessage(userId: string, messageId: string): Promise<void> {
    try {
      const response = await window.electronAPI.invoke('plugin-api-call', {
        pluginId: this.pluginId,
        method: 'PUT',
        url: '/api/v1/talk/message/revoke',
        data: {
          user_id: userId,
          message_id: messageId
        }
      })

      if (!response.success) {
        throw new Error(response.error || '撤回消息失败')
      }

      this.emit('message:recalled', messageId)
    } catch (error) {
      console.error('Failed to recall message:', error)
      throw error
    }
  }

  // 删除消息
  public async deleteMessage(userId: string, messageId: string): Promise<void> {
    try {
      const response = await window.electronAPI.invoke('plugin-api-call', {
        pluginId: this.pluginId,
        method: 'DELETE',
        url: '/api/v1/talk/message/delete',
        data: {
          user_id: userId,
          message_id: messageId
        }
      })

      if (!response.success) {
        throw new Error(response.error || '删除消息失败')
      }

      this.emit('message:deleted', messageId)
    } catch (error) {
      console.error('Failed to delete message:', error)
      throw error
    }
  }

  // 标记消息为已读
  public async markMessageAsRead(userId: string, messageId: string): Promise<void> {
    try {
      const response = await window.electronAPI.invoke('plugin-api-call', {
        pluginId: this.pluginId,
        method: 'PUT',
        url: '/api/v1/talk/message/read',
        data: {
          user_id: userId,
          message_id: messageId
        }
      })

      if (!response.success) {
        throw new Error(response.error || '标记已读失败')
      }

      this.emit('message:read', messageId)
    } catch (error) {
      console.error('Failed to mark message as read:', error)
      throw error
    }
  }

  // 获取消息历史
  public async getMessageHistory(
    userId: string,
    conversationId: string,
    limit: number = 20,
    offset: number = 0
  ): Promise<MessageHistory> {
    try {
      const response = await window.electronAPI.invoke('plugin-api-call', {
        pluginId: this.pluginId,
        method: 'GET',
        url: '/api/v1/talk/records',
        data: {
          user_id: userId,
          receiver_id: conversationId,
          limit,
          offset
        }
      })

      if (response.success) {
        return {
          messages: response.data.items || [],
          total: response.data.total || 0,
          has_more: response.data.has_more || false
        }
      } else {
        throw new Error(response.error || '获取消息历史失败')
      }
    } catch (error) {
      console.error('Failed to get message history:', error)
      throw error
    }
  }

  // 搜索消息
  public async searchMessages(
    userId: string,
    params: SearchMessageRequest
  ): Promise<MessageHistory> {
    try {
      const response = await window.electronAPI.invoke('plugin-api-call', {
        pluginId: this.pluginId,
        method: 'GET',
        url: '/api/v1/talk/search-chat-records',
        data: {
          user_id: userId,
          ...params
        }
      })

      if (response.success) {
        return {
          messages: response.data.items || [],
          total: response.data.total || 0,
          has_more: response.data.has_more || false
        }
      } else {
        throw new Error(response.error || '搜索消息失败')
      }
    } catch (error) {
      console.error('Failed to search messages:', error)
      throw error
    }
  }

  // 获取消息列表（用于插件数据访问）
  public async getMessages(
    conversationId: string,
    limit: number = 20,
    offset: number = 0
  ): Promise<Message[]> {
    try {
      const response = await window.electronAPI.invoke('plugin-api-call', {
        pluginId: this.pluginId,
        method: 'GET',
        url: '/plugin/data/messages',
        data: {
          conversation_id: conversationId,
          limit,
          offset
        }
      })

      if (response.success) {
        return response.data || []
      } else {
        throw new Error(response.error || '获取消息列表失败')
      }
    } catch (error) {
      console.error('Failed to get messages:', error)
      throw error
    }
  }

  // P2P 消息功能
  public async sendP2PMessage(to: string, content: any): Promise<P2PMessage> {
    try {
      const message = await window.electronAPI.p2p.sendMessage(to, content)
      this.emit('p2p:message:sent', message)
      return message
    } catch (error) {
      console.error('Failed to send P2P message:', error)
      throw error
    }
  }

  public async sendP2PGroupMessage(groupId: string, content: any): Promise<P2PMessage> {
    try {
      const message = await window.electronAPI.p2p.sendGroupMessage(groupId, content)
      this.emit('p2p:group-message:sent', message)
      return message
    } catch (error) {
      console.error('Failed to send P2P group message:', error)
      throw error
    }
  }

  public async getP2PMessageHistory(
    peerId: string,
    limit: number = 20,
    before?: number
  ): Promise<P2PMessage[]> {
    try {
      return await window.electronAPI.p2p.getMessageHistory(peerId, limit, before)
    } catch (error) {
      console.error('Failed to get P2P message history:', error)
      return []
    }
  }

  public async getP2PGroupMessageHistory(
    groupId: string,
    limit: number = 20,
    before?: number
  ): Promise<P2PMessage[]> {
    try {
      return await window.electronAPI.p2p.getGroupMessageHistory(groupId, limit, before)
    } catch (error) {
      console.error('Failed to get P2P group message history:', error)
      return []
    }
  }

  // 文件上传相关
  public async uploadFile(file: File): Promise<{ url: string; name: string; size: number }> {
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await window.electronAPI.invoke('plugin-api-call', {
        pluginId: this.pluginId,
        method: 'POST',
        url: '/api/v1/upload/file',
        data: formData
      })

      if (response.success) {
        return {
          url: response.data.url,
          name: file.name,
          size: file.size
        }
      } else {
        throw new Error(response.error || '文件上传失败')
      }
    } catch (error) {
      console.error('Failed to upload file:', error)
      throw error
    }
  }

  // 语音消息相关
  public async uploadAudio(audioBlob: Blob): Promise<{ url: string; duration: number }> {
    try {
      const formData = new FormData()
      formData.append('audio', audioBlob, 'audio.wav')

      const response = await window.electronAPI.invoke('plugin-api-call', {
        pluginId: this.pluginId,
        method: 'POST',
        url: '/api/v1/upload/audio',
        data: formData
      })

      if (response.success) {
        return {
          url: response.data.url,
          duration: response.data.duration || 0
        }
      } else {
        throw new Error(response.error || '语音上传失败')
      }
    } catch (error) {
      console.error('Failed to upload audio:', error)
      throw error
    }
  }

  // 图片上传相关
  public async uploadImage(
    imageFile: File
  ): Promise<{ url: string; width: number; height: number }> {
    try {
      const formData = new FormData()
      formData.append('image', imageFile)

      const response = await window.electronAPI.invoke('plugin-api-call', {
        pluginId: this.pluginId,
        method: 'POST',
        url: '/api/v1/upload/image',
        data: formData
      })

      if (response.success) {
        return {
          url: response.data.url,
          width: response.data.width || 0,
          height: response.data.height || 0
        }
      } else {
        throw new Error(response.error || '图片上传失败')
      }
    } catch (error) {
      console.error('Failed to upload image:', error)
      throw error
    }
  }

  // 消息加密/解密（如果需要）
  public async encryptMessage(content: string, recipientPublicKey: string): Promise<string> {
    try {
      const response = await window.electronAPI.invoke('plugin-api-call', {
        pluginId: this.pluginId,
        method: 'POST',
        url: '/api/v1/crypto/encrypt',
        data: {
          content,
          public_key: recipientPublicKey
        }
      })

      if (response.success) {
        return response.data.encrypted
      } else {
        throw new Error(response.error || '消息加密失败')
      }
    } catch (error) {
      console.error('Failed to encrypt message:', error)
      throw error
    }
  }

  public async decryptMessage(encryptedContent: string, senderPublicKey: string): Promise<string> {
    try {
      const response = await window.electronAPI.invoke('plugin-api-call', {
        pluginId: this.pluginId,
        method: 'POST',
        url: '/api/v1/crypto/decrypt',
        data: {
          encrypted_content: encryptedContent,
          public_key: senderPublicKey
        }
      })

      if (response.success) {
        return response.data.decrypted
      } else {
        throw new Error(response.error || '消息解密失败')
      }
    } catch (error) {
      console.error('Failed to decrypt message:', error)
      throw error
    }
  }

  // 消息状态同步
  public async syncMessageStatus(): Promise<void> {
    try {
      const response = await window.electronAPI.invoke('plugin-api-call', {
        pluginId: this.pluginId,
        method: 'POST',
        url: '/api/v1/message/sync',
        data: {}
      })

      if (!response.success) {
        throw new Error(response.error || '同步消息状态失败')
      }

      this.emit('message:synced')
    } catch (error) {
      console.error('Failed to sync message status:', error)
      throw error
    }
  }

  // 清理过期消息
  public async cleanupExpiredMessages(days: number = 30): Promise<void> {
    try {
      const response = await window.electronAPI.invoke('plugin-api-call', {
        pluginId: this.pluginId,
        method: 'DELETE',
        url: '/api/v1/message/cleanup',
        data: { days }
      })

      if (!response.success) {
        throw new Error(response.error || '清理过期消息失败')
      }

      this.emit('message:cleaned')
    } catch (error) {
      console.error('Failed to cleanup expired messages:', error)
      throw error
    }
  }
}

export const messageService = new MessageService('message-plugin')
