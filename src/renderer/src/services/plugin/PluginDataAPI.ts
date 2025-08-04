import { ipcRenderer } from 'electron'

export interface PluginDataOptions {
  limit?: number
  offset?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  filters?: Record<string, any>
}

export interface ContactData {
  user_id?: number
  friend_id?: number
  remark?: string
  group_id?: number
  is_pinned?: boolean
  plugin_source?: string
  custom_data?: any
}

export interface MessageData {
  user_id?: number
  talk_mode?: number
  to_from_id?: number
  message_type?: number
  content?: string
  plugin_source?: string
  attachment_data?: any
  custom_data?: any
}

export interface ConversationData {
  user_id?: number
  talk_mode?: number
  to_from_id?: number
  is_pinned?: boolean
  plugin_data?: any
  custom_settings?: any
}

export interface APIResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  warnings?: string[]
}

/**
 * 插件数据API客户端
 * 为插件提供统一的数据访问接口
 */
export class PluginDataAPI {
  private pluginId: string
  private static instances: Map<string, PluginDataAPI> = new Map()

  private constructor(pluginId: string) {
    this.pluginId = pluginId
  }

  /**
   * 获取插件数据API实例
   */
  static getInstance(pluginId: string): PluginDataAPI {
    if (!PluginDataAPI.instances.has(pluginId)) {
      PluginDataAPI.instances.set(pluginId, new PluginDataAPI(pluginId))
    }
    return PluginDataAPI.instances.get(pluginId)!
  }

  /**
   * 发送IPC请求
   */
  private async sendRequest<T = any>(
    channel: string,
    data?: any,
    options?: any
  ): Promise<APIResponse<T>> {
    try {
      const request = {
        pluginId: this.pluginId,
        action: channel,
        data,
        options
      }
      
      const response = await ipcRenderer.invoke(channel, request)
      return response as APIResponse<T>
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      }
    }
  }

  // ==================== 私有数据操作 ====================

  /**
   * 设置插件私有数据
   */
  async setData(key: string, value: any, ttl?: number): Promise<APIResponse> {
    return this.sendRequest('plugin-data:set', { key, value, ttl })
  }

  /**
   * 获取插件私有数据
   */
  async getData<T = any>(key: string): Promise<APIResponse<T>> {
    return this.sendRequest<T>('plugin-data:get', { key })
  }

  /**
   * 删除插件私有数据
   */
  async deleteData(key: string): Promise<APIResponse<{ deleted: boolean }>> {
    return this.sendRequest('plugin-data:delete', { key })
  }

  /**
   * 列出插件私有数据
   */
  async listData(
    prefix?: string,
    options?: PluginDataOptions
  ): Promise<APIResponse<Array<{ key: string; value: any; created_at: string; updated_at: string }>>> {
    return this.sendRequest('plugin-data:list', { prefix }, options)
  }

  // ==================== 共享数据操作 ====================

  /**
   * 设置共享数据
   */
  async setSharedData(
    namespace: string,
    key: string,
    value: any,
    ttl?: number
  ): Promise<APIResponse> {
    return this.sendRequest('plugin-shared-data:set', { namespace, key, value, ttl })
  }

  /**
   * 获取共享数据
   */
  async getSharedData<T = any>(
    namespace: string,
    key: string
  ): Promise<APIResponse<T>> {
    return this.sendRequest<T>('plugin-shared-data:get', { namespace, key })
  }

  /**
   * 删除共享数据
   */
  async deleteSharedData(
    namespace: string,
    key: string
  ): Promise<APIResponse<{ deleted: boolean }>> {
    return this.sendRequest('plugin-shared-data:delete', { namespace, key })
  }

  /**
   * 列出共享数据
   */
  async listSharedData(
    namespace: string,
    prefix?: string,
    options?: PluginDataOptions
  ): Promise<APIResponse<Array<{ key: string; value: any; created_by: string; created_at: string; updated_at: string }>>> {
    return this.sendRequest('plugin-shared-data:list', { namespace, prefix }, options)
  }

  // ==================== 联系人操作 ====================

  /**
   * 获取联系人信息
   */
  async getContact(contactId: number): Promise<APIResponse<any>> {
    return this.sendRequest('plugin-contacts:get', { contactId })
  }

  /**
   * 获取联系人列表
   */
  async getContacts(
    userId?: number,
    options?: PluginDataOptions
  ): Promise<APIResponse<any[]>> {
    return this.sendRequest('plugin-contacts:list', { userId }, options)
  }

  /**
   * 添加联系人
   */
  async addContact(contactData: ContactData): Promise<APIResponse<{ contactId: number }>> {
    return this.sendRequest('plugin-contacts:add', { contactData })
  }

  /**
   * 更新联系人信息
   */
  async updateContact(
    contactId: number,
    updates: Partial<ContactData>
  ): Promise<APIResponse<{ updated: boolean }>> {
    return this.sendRequest('plugin-contacts:update', { contactId, updates })
  }

  /**
   * 删除联系人
   */
  async deleteContact(contactId: number): Promise<APIResponse<{ deleted: boolean }>> {
    return this.sendRequest('plugin-contacts:delete', { contactId })
  }

  /**
   * 置顶/取消置顶联系人
   */
  async pinContact(
    contactId: number,
    pinned: boolean
  ): Promise<APIResponse<{ updated: boolean }>> {
    return this.sendRequest('plugin-contacts:pin', { contactId, pinned })
  }

  // ==================== 消息操作 ====================

  /**
   * 获取消息信息
   */
  async getMessage(messageId: number): Promise<APIResponse<any>> {
    return this.sendRequest('plugin-messages:get', { messageId })
  }

  /**
   * 获取消息列表
   */
  async getMessages(
    conversationId?: number,
    options?: PluginDataOptions
  ): Promise<APIResponse<any[]>> {
    return this.sendRequest('plugin-messages:list', { conversationId }, options)
  }

  /**
   * 发送消息
   */
  async sendMessage(messageData: MessageData): Promise<APIResponse<{ messageId: number }>> {
    return this.sendRequest('plugin-messages:send', { messageData })
  }

  /**
   * 标记消息为已读
   */
  async markMessageAsRead(
    messageId: number,
    userId?: number
  ): Promise<APIResponse<{ updated: boolean }>> {
    return this.sendRequest('plugin-messages:mark-read', { messageId, userId })
  }

  /**
   * 删除消息
   */
  async deleteMessage(
    messageId: number,
    userId?: number
  ): Promise<APIResponse<{ deleted: boolean }>> {
    return this.sendRequest('plugin-messages:delete', { messageId, userId })
  }

  // ==================== 会话操作 ====================

  /**
   * 获取会话信息
   */
  async getConversation(conversationId: number): Promise<APIResponse<any>> {
    return this.sendRequest('plugin-conversations:get', { conversationId })
  }

  /**
   * 获取会话列表
   */
  async getConversations(
    userId?: number,
    options?: PluginDataOptions
  ): Promise<APIResponse<any[]>> {
    return this.sendRequest('plugin-conversations:list', { userId }, options)
  }

  /**
   * 创建会话
   */
  async createConversation(
    conversationData: ConversationData
  ): Promise<APIResponse<{ conversationId: number }>> {
    return this.sendRequest('plugin-conversations:create', { conversationData })
  }

  /**
   * 更新会话信息
   */
  async updateConversation(
    conversationId: number,
    updates: Partial<ConversationData>
  ): Promise<APIResponse<{ updated: boolean }>> {
    return this.sendRequest('plugin-conversations:update', { conversationId, updates })
  }

  /**
   * 删除会话
   */
  async deleteConversation(conversationId: number): Promise<APIResponse<{ deleted: boolean }>> {
    return this.sendRequest('plugin-conversations:delete', { conversationId })
  }

  // ==================== 权限操作 ====================

  /**
   * 检查权限
   */
  async checkPermission(
    resource: string,
    action: string
  ): Promise<APIResponse<{ hasPermission: boolean }>> {
    return this.sendRequest('plugin-permissions:check', { resource, action })
  }

  /**
   * 请求权限
   */
  async requestPermission(
    resource: string,
    action: string,
    reason?: string
  ): Promise<APIResponse<{ granted: boolean }>> {
    return this.sendRequest('plugin-permissions:request', { resource, action, reason })
  }

  /**
   * 获取插件权限列表
   */
  async getPermissions(): Promise<APIResponse<any[]>> {
    return this.sendRequest('plugin-permissions:list')
  }

  // ==================== 便捷方法 ====================

  /**
   * 缓存联系人数据到共享空间
   */
  async cacheContacts(contacts: any[]): Promise<APIResponse> {
    return this.setSharedData('contacts', 'cache', contacts, 3600) // 1小时TTL
  }

  /**
   * 获取缓存的联系人数据
   */
  async getCachedContacts(): Promise<APIResponse<any[]>> {
    return this.getSharedData<any[]>('contacts', 'cache')
  }

  /**
   * 更新联系人缓存中的单个联系人
   */
  async updateCachedContact(contactId: number, contactData: any): Promise<APIResponse> {
    const cachedResponse = await this.getCachedContacts()
    if (!cachedResponse.success || !cachedResponse.data) {
      return { success: false, error: 'No cached contacts found' }
    }

    const contacts = cachedResponse.data
    const index = contacts.findIndex(c => c.id === contactId)
    if (index >= 0) {
      contacts[index] = { ...contacts[index], ...contactData }
      return this.cacheContacts(contacts)
    }

    return { success: false, error: 'Contact not found in cache' }
  }

  /**
   * 从缓存中移除联系人
   */
  async removeCachedContact(contactId: number): Promise<APIResponse> {
    const cachedResponse = await this.getCachedContacts()
    if (!cachedResponse.success || !cachedResponse.data) {
      return { success: false, error: 'No cached contacts found' }
    }

    const contacts = cachedResponse.data.filter(c => c.id !== contactId)
    return this.cacheContacts(contacts)
  }

  /**
   * 缓存消息历史
   */
  async cacheMessageHistory(
    conversationId: number,
    messages: any[],
    ttl: number = 1800 // 30分钟TTL
  ): Promise<APIResponse> {
    return this.setSharedData('messages', `history_${conversationId}`, messages, ttl)
  }

  /**
   * 获取缓存的消息历史
   */
  async getCachedMessageHistory(conversationId: number): Promise<APIResponse<any[]>> {
    return this.getSharedData<any[]>('messages', `history_${conversationId}`)
  }

  /**
   * 添加消息到缓存历史
   */
  async addMessageToCache(conversationId: number, message: any): Promise<APIResponse> {
    const cachedResponse = await this.getCachedMessageHistory(conversationId)
    let messages: any[] = []
    
    if (cachedResponse.success && cachedResponse.data) {
      messages = cachedResponse.data
    }

    messages.push(message)
    
    // 保持最近1000条消息
    if (messages.length > 1000) {
      messages = messages.slice(-1000)
    }

    return this.cacheMessageHistory(conversationId, messages)
  }

  /**
   * 保存插件配置
   */
  async saveConfig(config: any): Promise<APIResponse> {
    return this.setData('config', config)
  }

  /**
   * 获取插件配置
   */
  async getConfig<T = any>(): Promise<APIResponse<T>> {
    return this.getData<T>('config')
  }

  /**
   * 保存用户偏好设置
   */
  async saveUserPreferences(userId: number, preferences: any): Promise<APIResponse> {
    return this.setData(`user_preferences_${userId}`, preferences)
  }

  /**
   * 获取用户偏好设置
   */
  async getUserPreferences<T = any>(userId: number): Promise<APIResponse<T>> {
    return this.getData<T>(`user_preferences_${userId}`)
  }

  /**
   * 记录插件使用统计
   */
  async recordUsageStats(action: string, metadata?: any): Promise<APIResponse> {
    const timestamp = new Date().toISOString()
    const statsKey = `usage_stats_${new Date().toISOString().split('T')[0]}` // 按日期分组
    
    const existingStats = await this.getData(statsKey)
    let stats: any[] = []
    
    if (existingStats.success && existingStats.data) {
      stats = existingStats.data
    }

    stats.push({
      action,
      timestamp,
      metadata
    })

    return this.setData(statsKey, stats, 86400 * 30) // 30天TTL
  }

  /**
   * 获取插件使用统计
   */
  async getUsageStats(date?: string): Promise<APIResponse<any[]>> {
    const targetDate = date || new Date().toISOString().split('T')[0]
    const statsKey = `usage_stats_${targetDate}`
    return this.getData<any[]>(statsKey)
  }

  /**
   * 批量操作辅助方法
   */
  async batchOperation<T>(
    operations: Array<() => Promise<APIResponse<T>>>,
    concurrency: number = 5
  ): Promise<APIResponse<T[]>> {
    try {
      const results: T[] = []
      const errors: string[] = []
      const warnings: string[] = []

      // 分批执行操作
      for (let i = 0; i < operations.length; i += concurrency) {
        const batch = operations.slice(i, i + concurrency)
        const batchResults = await Promise.all(batch.map(op => op()))
        
        for (const result of batchResults) {
          if (result.success && result.data !== undefined) {
            results.push(result.data)
          } else if (result.error) {
            errors.push(result.error)
          }
          
          if (result.warnings) {
            warnings.push(...result.warnings)
          }
        }
      }

      return {
        success: errors.length === 0,
        data: results,
        error: errors.length > 0 ? errors.join('; ') : undefined,
        warnings: warnings.length > 0 ? warnings : undefined
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Batch operation failed'
      }
    }
  }

  /**
   * 清理过期数据
   */
  async cleanupExpiredData(): Promise<APIResponse<{ cleaned: number }>> {
    try {
      const dataList = await this.listData()
      if (!dataList.success || !dataList.data) {
        return { success: true, data: { cleaned: 0 } }
      }

      let cleaned = 0
      const now = new Date()
      
      for (const item of dataList.data) {
        // 检查是否有TTL且已过期
        if (item.key.includes('_ttl_')) {
          const ttlMatch = item.key.match(/_ttl_(\d+)$/)
          if (ttlMatch) {
            const expiryTime = new Date(parseInt(ttlMatch[1]))
            if (now > expiryTime) {
              const deleteResult = await this.deleteData(item.key)
              if (deleteResult.success) {
                cleaned++
              }
            }
          }
        }
      }

      return { success: true, data: { cleaned } }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Cleanup failed'
      }
    }
  }
}

/**
 * 全局插件数据API实例管理器
 */
export class PluginDataManager {
  private static globalInstance: PluginDataAPI | null = null

  /**
   * 设置全局插件实例
   */
  static setGlobalInstance(pluginId: string): void {
    PluginDataManager.globalInstance = PluginDataAPI.getInstance(pluginId)
  }

  /**
   * 获取全局插件实例
   */
  static getGlobalInstance(): PluginDataAPI {
    if (!PluginDataManager.globalInstance) {
      throw new Error('Global plugin instance not set. Call setGlobalInstance first.')
    }
    return PluginDataManager.globalInstance
  }

  /**
   * 清理所有实例
   */
  static cleanup(): void {
    // PluginDataAPI.instances.clear()
    PluginDataManager.globalInstance = null
  }
}

// 导出便捷函数
export const getPluginDataAPI = (pluginId: string) => PluginDataAPI.getInstance(pluginId)
export const getGlobalPluginDataAPI = () => PluginDataManager.getGlobalInstance()