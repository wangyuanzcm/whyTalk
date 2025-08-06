import Database from 'better-sqlite3'
import { DatabaseManager } from '../database/Database'
import { PluginPermissionManager } from './PluginPermissionManager'
import { DataValidator } from './DataValidator'
import type {
  PluginDataItem,
  SharedDataItem,
  ContactData,
  MessageData,
  ConversationData
} from './PluginDataService.d'

export class PluginDataService {
  private static instance: PluginDataService
  private db: Database.Database | null = null
  private permissionManager: PluginPermissionManager | null = null
  private isInitialized = false

  private constructor() {
    // 延迟初始化，等待数据库准备就绪
  }

  static getInstance(): PluginDataService {
    if (!PluginDataService.instance) {
      PluginDataService.instance = new PluginDataService()
    }
    return PluginDataService.instance
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) {
      return
    }

    try {
      this.db = DatabaseManager.getInstance().getDatabase()
      this.permissionManager = PluginPermissionManager.getInstance()
      this.initializeService()
      this.isInitialized = true
      console.log('PluginDataService initialized')
    } catch (error) {
      console.error('Failed to initialize PluginDataService:', error)
      throw error
    }
  }

  private initializeService(): void {
    if (!this.db) {
      throw new Error('Database not initialized')
    }

    try {
      // 执行插件schema扩展
      const fs = require('fs')
      const path = require('path')
      const schemaPath = path.join(__dirname, '../database/plugin-schema.sql')

      if (fs.existsSync(schemaPath)) {
        const schema = fs.readFileSync(schemaPath, 'utf8')
        this.db.exec(schema)
        console.log('插件数据库schema初始化完成')
      }
    } catch (error) {
      console.error('插件数据服务初始化失败:', error)
    }
  }

  // ==================== 插件私有数据操作 ====================

  async setPluginData(
    pluginId: string,
    key: string,
    value: any,
    type: string = 'string'
  ): Promise<boolean> {
    if (!this.db) {
      console.error('Database not initialized')
      return false
    }

    try {
      const stmt = this.db!.prepare(`
        INSERT OR REPLACE INTO plugin_data (plugin_id, data_key, data_value, data_type, updated_at)
        VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
      `)

      const serializedValue = this.serializeValue(value, type)
      stmt.run(pluginId, key, serializedValue, type)
      return true
    } catch (error) {
      console.error('设置插件数据失败:', error)
      return false
    }
  }

  async getPluginData(pluginId: string, key: string): Promise<any> {
    if (!this.db) {
      console.error('Database not initialized')
      return null
    }

    try {
      const stmt = this.db!.prepare(`
        SELECT data_value, data_type FROM plugin_data 
        WHERE plugin_id = ? AND data_key = ?
      `)

      const result = stmt.get(pluginId, key) as any
      if (!result) return null

      return this.deserializeValue(result.data_value, result.data_type)
    } catch (error) {
      console.error('获取插件数据失败:', error)
      return null
    }
  }

  async deletePluginData(pluginId: string, key: string): Promise<boolean> {
    if (!this.db) {
      console.error('Database not initialized')
      return false
    }

    try {
      const stmt = this.db!.prepare(`
        DELETE FROM plugin_data WHERE plugin_id = ? AND data_key = ?
      `)

      const result = stmt.run(pluginId, key)
      return result.changes > 0
    } catch (error) {
      console.error('删除插件数据失败:', error)
      return false
    }
  }

  async listPluginData(pluginId: string): Promise<PluginDataItem[]> {
    if (!this.db) {
      console.error('Database not initialized')
      return []
    }

    try {
      const stmt = this.db!.prepare(`
        SELECT data_key as key, data_value, data_type as type, created_at, updated_at
        FROM plugin_data WHERE plugin_id = ?
        ORDER BY updated_at DESC
      `)

      const results = stmt.all(pluginId) as any[]
      return results.map((item) => ({
        key: item.key,
        value: this.deserializeValue(item.data_value, item.type),
        type: item.type,
        created_at: item.created_at,
        updated_at: item.updated_at
      }))
    } catch (error) {
      console.error('获取插件数据列表失败:', error)
      return []
    }
  }

  // ==================== 插件共享数据操作 ====================

  async setSharedData(
    namespace: string,
    key: string,
    value: any,
    ownerPlugin: string,
    permissions?: any
  ): Promise<boolean> {
    if (!this.db) {
      console.error('Database not initialized')
      return false
    }

    try {
      const stmt = this.db!.prepare(`
        INSERT OR REPLACE INTO plugin_shared_data 
        (namespace, data_key, data_value, data_type, owner_plugin, permissions, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
      `)

      const type = this.getValueType(value)
      const serializedValue = this.serializeValue(value, type)
      const serializedPermissions = permissions ? JSON.stringify(permissions) : null

      stmt.run(namespace, key, serializedValue, type, ownerPlugin, serializedPermissions)
      return true
    } catch (error) {
      console.error('设置共享数据失败:', error)
      return false
    }
  }

  async getSharedData(namespace: string, key: string, requestPlugin: string): Promise<any> {
    if (!this.db) {
      console.error('Database not initialized')
      return null
    }

    try {
      // 检查权限
      if (!this.checkSharedDataPermission(namespace, key, requestPlugin, 'read')) {
        console.warn(`插件 ${requestPlugin} 没有读取共享数据 ${namespace}:${key} 的权限`)
        return null
      }

      const stmt = this.db!.prepare(`
        SELECT data_value, data_type FROM plugin_shared_data 
        WHERE namespace = ? AND data_key = ?
      `)

      const result = stmt.get(namespace, key) as any
      if (!result) return null

      return this.deserializeValue(result.data_value, result.data_type)
    } catch (error) {
      console.error('获取共享数据失败:', error)
      return null
    }
  }

  async deleteSharedData(namespace: string, key: string, requestPlugin: string): Promise<boolean> {
    if (!this.db) {
      console.error('Database not initialized')
      return false
    }

    try {
      // 检查权限
      if (!this.checkSharedDataPermission(namespace, key, requestPlugin, 'write')) {
        console.warn(`插件 ${requestPlugin} 没有删除共享数据 ${namespace}:${key} 的权限`)
        return false
      }

      const stmt = this.db!.prepare(`
        DELETE FROM plugin_shared_data WHERE namespace = ? AND data_key = ?
      `)

      const result = stmt.run(namespace, key)
      return result.changes > 0
    } catch (error) {
      console.error('删除共享数据失败:', error)
      return false
    }
  }

  async listSharedData(namespace: string, requestPlugin: string): Promise<SharedDataItem[]> {
    if (!this.db) {
      console.error('Database not initialized')
      return []
    }

    try {
      const stmt = this.db!.prepare(`
        SELECT namespace, data_key as key, data_value, data_type as type, 
               owner_plugin, permissions, created_at, updated_at
        FROM plugin_shared_data WHERE namespace = ?
        ORDER BY updated_at DESC
      `)

      const results = stmt.all(namespace) as any[]
      return results
        .filter((item) =>
          this.checkSharedDataPermission(namespace, item.key, requestPlugin, 'read')
        )
        .map((item) => ({
          namespace: item.namespace,
          key: item.key,
          value: this.deserializeValue(item.data_value, item.type),
          type: item.type,
          owner_plugin: item.owner_plugin,
          permissions: item.permissions ? JSON.parse(item.permissions) : null,
          created_at: item.created_at,
          updated_at: item.updated_at
        }))
    } catch (error) {
      console.error('获取共享数据列表失败:', error)
      return []
    }
  }

  // ==================== 联系人数据操作 ====================

  async getContacts(pluginId: string): Promise<ContactData[]> {
    if (!this.db || !this.permissionManager) {
      console.error('Database or permission manager not initialized')
      return []
    }

    try {
      if (!this.permissionManager.validateDataAccess(pluginId, 'read', 'contacts')) {
        throw new Error('没有读取联系人的权限')
      }

      const stmt = this.db!.prepare(`
        SELECT id, user_id, friend_id, remark, group_id, is_pinned, 
               plugin_source, last_interaction, custom_data, created_at, updated_at
        FROM contacts 
        ORDER BY is_pinned DESC, last_interaction DESC, updated_at DESC
      `)

      const results = stmt.all() as any[]
      return results.map((item) => ({
        ...item,
        is_pinned: Boolean(item.is_pinned),
        custom_data: item.custom_data ? JSON.parse(item.custom_data) : null
      }))
    } catch (error) {
      console.error('获取联系人列表失败:', error)
      return []
    }
  }

  async getContact(contactId: number, pluginId: string): Promise<ContactData | null> {
    if (!this.db || !this.permissionManager) {
      console.error('Database or permission manager not initialized')
      return null
    }

    try {
      if (!this.permissionManager.validateDataAccess(pluginId, 'read', 'contacts')) {
        throw new Error('没有读取联系人的权限')
      }

      const stmt = this.db!.prepare(`
        SELECT id, user_id, friend_id, remark, group_id, is_pinned, 
               plugin_source, last_interaction, custom_data, created_at, updated_at
        FROM contacts WHERE id = ?
      `)

      const result = stmt.get(contactId) as any
      if (!result) return null

      return {
        ...result,
        is_pinned: Boolean(result.is_pinned),
        custom_data: result.custom_data ? JSON.parse(result.custom_data) : null
      }
    } catch (error) {
      console.error('获取联系人失败:', error)
      return null
    }
  }

  async updateContact(
    contactId: number,
    updates: Partial<ContactData>,
    pluginId: string
  ): Promise<boolean> {
    try {
      if (!this.permissionManager!.validateDataAccess(pluginId, 'write', 'contacts')) {
        throw new Error('没有更新联系人的权限')
      }

      const validation = DataValidator.validateContactData(updates)
      if (!validation.valid) {
        throw new Error(`数据验证失败: ${validation.errors.join(', ')}`)
      }

      const fields: string[] = []
      const values: any[] = []

      for (const [key, value] of Object.entries(updates)) {
        if (key !== 'id') {
          fields.push(`${key} = ?`)
          if (key === 'custom_data' && value) {
            values.push(JSON.stringify(value))
          } else {
            values.push(value)
          }
        }
      }

      if (fields.length === 0) return false

      fields.push('updated_at = CURRENT_TIMESTAMP')
      values.push(contactId)

      const stmt = this.db!.prepare(`
        UPDATE contacts SET ${fields.join(', ')} WHERE id = ?
      `)

      const result = stmt.run(...values)

      if (result.changes > 0) {
        // 触发数据更新通知
        await this.setSharedData('contacts', 'last_update', Date.now(), pluginId)
      }

      return result.changes > 0
    } catch (error) {
      console.error('更新联系人失败:', error)
      return false
    }
  }

  async addContact(contactData: ContactData, pluginId: string): Promise<number> {
    try {
      if (!this.permissionManager!.validateDataAccess(pluginId, 'write', 'contacts')) {
        throw new Error('没有添加联系人的权限')
      }

      const validation = DataValidator.validateContactData(contactData)
      if (!validation.valid) {
        throw new Error(`数据验证失败: ${validation.errors.join(', ')}`)
      }

      const stmt = this.db!.prepare(`
        INSERT INTO contacts (user_id, friend_id, remark, group_id, is_pinned, plugin_source, custom_data)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `)

      const customData = contactData.custom_data ? JSON.stringify(contactData.custom_data) : null

      const result = stmt.run(
        contactData.user_id,
        contactData.friend_id,
        contactData.remark || '',
        contactData.group_id || null,
        contactData.is_pinned ? 1 : 0,
        pluginId,
        customData
      )

      if (result.lastInsertRowid) {
        // 触发数据更新通知
        await this.setSharedData('contacts', 'last_update', Date.now(), pluginId)
      }

      return Number(result.lastInsertRowid)
    } catch (error) {
      console.error('添加联系人失败:', error)
      return 0
    }
  }

  async deleteContact(contactId: number, pluginId: string): Promise<boolean> {
    try {
      if (!this.permissionManager!.validateDataAccess(pluginId, 'write', 'contacts')) {
        throw new Error('没有删除联系人的权限')
      }

      const stmt = this.db!.prepare('DELETE FROM contacts WHERE id = ?')
      const result = stmt.run(contactId)

      if (result.changes > 0) {
        // 触发数据更新通知
        await this.setSharedData('contacts', 'last_update', Date.now(), pluginId)
      }

      return result.changes > 0
    } catch (error) {
      console.error('删除联系人失败:', error)
      return false
    }
  }

  async pinContact(contactId: number, isPinned: boolean, pluginId: string): Promise<boolean> {
    try {
      if (!this.permissionManager!.validateDataAccess(pluginId, 'write', 'contacts')) {
        throw new Error('没有置顶联系人的权限')
      }

      const stmt = this.db!.prepare(`
        UPDATE contacts SET is_pinned = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?
      `)

      const result = stmt.run(isPinned ? 1 : 0, contactId)

      if (result.changes > 0) {
        // 触发数据更新通知
        await this.setSharedData('contacts', 'last_update', Date.now(), pluginId)
      }

      return result.changes > 0
    } catch (error) {
      console.error('置顶联系人失败:', error)
      return false
    }
  }

  // ==================== 消息数据操作 ====================

  async getMessage(messageId: number, pluginId: string): Promise<MessageData | null> {
    try {
      if (!this.permissionManager!.validateDataAccess(pluginId, 'read', 'messages')) {
        throw new Error('没有读取消息的权限')
      }

      const stmt = this.db!.prepare(`
        SELECT id, user_id, talk_mode, to_from_id, message_type, content, 
               plugin_source, read_status, attachment_data, custom_data, created_at, updated_at
        FROM messages WHERE id = ?
      `)

      const result = stmt.get(messageId) as any
      if (!result) return null

      return {
        ...result,
        read_status: Boolean(result.read_status),
        attachment_data: result.attachment_data ? JSON.parse(result.attachment_data) : null,
        custom_data: result.custom_data ? JSON.parse(result.custom_data) : null
      }
    } catch (error) {
      console.error('获取消息失败:', error)
      return null
    }
  }

  async getMessages(
    conversationId: number,
    page: number = 1,
    limit: number = 20,
    pluginId: string
  ): Promise<{ messages: MessageData[]; total: number }> {
    try {
      if (!this.permissionManager!.validateDataAccess(pluginId, 'read', 'messages')) {
        throw new Error('没有读取消息的权限')
      }

      const offset = (page - 1) * limit

      // 获取总数
      const countStmt = this.db!.prepare(`
        SELECT COUNT(*) as total FROM messages WHERE to_from_id = ?
      `)
      const countResult = countStmt.get(conversationId) as any

      // 获取消息列表
      const stmt = this.db!.prepare(`
        SELECT id, user_id, talk_mode, to_from_id, message_type, content, 
               plugin_source, read_status, attachment_data, custom_data, created_at, updated_at
        FROM messages 
        WHERE to_from_id = ?
        ORDER BY created_at DESC
        LIMIT ? OFFSET ?
      `)

      const results = stmt.all(conversationId, limit, offset) as any[]
      const messages = results.map((item) => ({
        ...item,
        read_status: Boolean(item.read_status),
        attachment_data: item.attachment_data ? JSON.parse(item.attachment_data) : null,
        custom_data: item.custom_data ? JSON.parse(item.custom_data) : null
      }))

      return {
        messages,
        total: countResult.total
      }
    } catch (error) {
      console.error('获取消息列表失败:', error)
      return { messages: [], total: 0 }
    }
  }

  async sendMessage(messageData: MessageData, pluginId: string): Promise<number> {
    try {
      if (!this.permissionManager!.validateDataAccess(pluginId, 'write', 'messages')) {
        throw new Error('没有发送消息的权限')
      }

      const validation = DataValidator.validateMessageData(messageData)
      if (!validation.valid) {
        throw new Error(`数据验证失败: ${validation.errors.join(', ')}`)
      }

      const stmt = this.db!.prepare(`
        INSERT INTO messages (user_id, talk_mode, to_from_id, message_type, content, 
                             plugin_source, attachment_data, custom_data)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `)

      const attachmentData = messageData.attachment_data
        ? JSON.stringify(messageData.attachment_data)
        : null
      const customData = messageData.custom_data ? JSON.stringify(messageData.custom_data) : null

      const result = stmt.run(
        messageData.user_id,
        messageData.talk_mode,
        messageData.to_from_id,
        messageData.message_type,
        messageData.content,
        pluginId,
        attachmentData,
        customData
      )

      if (result.lastInsertRowid) {
        // 触发数据更新通知
        await this.setSharedData('messages', 'last_update', Date.now(), pluginId)
      }

      return Number(result.lastInsertRowid)
    } catch (error) {
      console.error('发送消息失败:', error)
      return 0
    }
  }

  async markMessageAsRead(messageId: number, pluginId: string): Promise<boolean> {
    try {
      if (!this.permissionManager!.validateDataAccess(pluginId, 'write', 'messages')) {
        throw new Error('没有标记消息的权限')
      }

      const stmt = this.db!.prepare(`
        UPDATE messages SET read_status = 1, updated_at = CURRENT_TIMESTAMP WHERE id = ?
      `)

      const result = stmt.run(messageId)
      return result.changes > 0
    } catch (error) {
      console.error('标记消息已读失败:', error)
      return false
    }
  }

  async deleteMessage(messageId: number, pluginId: string): Promise<boolean> {
    try {
      if (!this.permissionManager!.validateDataAccess(pluginId, 'write', 'messages')) {
        throw new Error('没有删除消息的权限')
      }

      const stmt = this.db!.prepare(`
        DELETE FROM messages WHERE id = ?
      `)

      const result = stmt.run(messageId)

      if (result.changes > 0) {
        // 触发数据更新通知
        await this.setSharedData('messages', 'last_update', Date.now(), pluginId)
      }

      return result.changes > 0
    } catch (error) {
      console.error('删除消息失败:', error)
      return false
    }
  }

  // ==================== 会话数据操作 ====================

  async getConversation(conversationId: number): Promise<ConversationData | null> {
    try {
      const stmt = this.db!.prepare(`
        SELECT id, user_id, talk_mode, to_from_id, is_pinned, plugin_data, custom_settings, created_at, updated_at
        FROM conversations WHERE id = ?
      `)

      const result = stmt.get(conversationId) as any
      if (!result) return null

      return {
        ...result,
        is_pinned: Boolean(result.is_pinned),
        plugin_data: result.plugin_data ? JSON.parse(result.plugin_data) : null,
        custom_settings: result.custom_settings ? JSON.parse(result.custom_settings) : null
      }
    } catch (error) {
      console.error('获取会话失败:', error)
      return null
    }
  }

  async getConversations(userId?: number, options?: any): Promise<ConversationData[]> {
    try {
      let query = `
        SELECT id, user_id, talk_mode, to_from_id, is_pinned, plugin_data, custom_settings, created_at, updated_at
        FROM conversations
      `
      const params: any[] = []

      if (userId) {
        query += ' WHERE user_id = ?'
        params.push(userId)
      }

      query += ' ORDER BY updated_at DESC'

      if (options?.limit) {
        query += ' LIMIT ?'
        params.push(options.limit)
      }

      const stmt = this.db!.prepare(query)
      const results = stmt.all(...params) as any[]

      return results.map((item) => ({
        ...item,
        is_pinned: Boolean(item.is_pinned),
        plugin_data: item.plugin_data ? JSON.parse(item.plugin_data) : null,
        custom_settings: item.custom_settings ? JSON.parse(item.custom_settings) : null
      }))
    } catch (error) {
      console.error('获取会话列表失败:', error)
      return []
    }
  }

  async createConversation(conversationData: ConversationData, pluginId: string): Promise<number> {
    try {
      if (!this.permissionManager!.validateDataAccess(pluginId, 'write', 'conversations')) {
        throw new Error('没有创建会话的权限')
      }

      const validation = DataValidator.validateConversationData(conversationData)
      if (!validation.valid) {
        throw new Error(`数据验证失败: ${validation.errors.join(', ')}`)
      }

      const stmt = this.db!.prepare(`
        INSERT INTO conversations (user_id, talk_mode, to_from_id, is_pinned, plugin_data, custom_settings)
        VALUES (?, ?, ?, ?, ?, ?)
      `)

      const pluginData = conversationData.plugin_data
        ? JSON.stringify(conversationData.plugin_data)
        : null
      const customSettings = conversationData.custom_settings
        ? JSON.stringify(conversationData.custom_settings)
        : null

      const result = stmt.run(
        conversationData.user_id,
        conversationData.talk_mode,
        conversationData.to_from_id,
        conversationData.is_pinned ? 1 : 0,
        pluginData,
        customSettings
      )

      if (result.lastInsertRowid) {
        // 触发数据更新通知
        await this.setSharedData('conversations', 'last_update', Date.now(), pluginId)
      }

      return Number(result.lastInsertRowid)
    } catch (error) {
      console.error('创建会话失败:', error)
      return 0
    }
  }

  async updateConversation(
    conversationId: number,
    updates: Partial<ConversationData>,
    pluginId: string
  ): Promise<boolean> {
    try {
      if (!this.permissionManager!.validateDataAccess(pluginId, 'write', 'conversations')) {
        throw new Error('没有更新会话的权限')
      }

      const validation = DataValidator.validateConversationData(updates, true)
      if (!validation.valid) {
        throw new Error(`数据验证失败: ${validation.errors.join(', ')}`)
      }

      const fields: string[] = []
      const values: any[] = []

      for (const [key, value] of Object.entries(updates)) {
        if (key !== 'id') {
          fields.push(`${key} = ?`)
          if (key === 'plugin_data' && value) {
            values.push(JSON.stringify(value))
          } else if (key === 'custom_settings' && value) {
            values.push(JSON.stringify(value))
          } else if (key === 'is_pinned') {
            values.push(value ? 1 : 0)
          } else {
            values.push(value)
          }
        }
      }

      if (fields.length === 0) return false

      fields.push('updated_at = CURRENT_TIMESTAMP')
      values.push(conversationId)

      const stmt = this.db!.prepare(`
        UPDATE conversations SET ${fields.join(', ')} WHERE id = ?
      `)

      const result = stmt.run(...values)

      if (result.changes > 0) {
        // 触发数据更新通知
        await this.setSharedData('conversations', 'last_update', Date.now(), pluginId)
      }

      return result.changes > 0
    } catch (error) {
      console.error('更新会话失败:', error)
      return false
    }
  }

  async deleteConversation(conversationId: number, pluginId: string): Promise<boolean> {
    try {
      if (!this.permissionManager!.validateDataAccess(pluginId, 'write', 'conversations')) {
        throw new Error('没有删除会话的权限')
      }

      const stmt = this.db!.prepare('DELETE FROM conversations WHERE id = ?')
      const result = stmt.run(conversationId)

      if (result.changes > 0) {
        // 触发数据更新通知
        await this.setSharedData('conversations', 'last_update', Date.now(), pluginId)
      }

      return result.changes > 0
    } catch (error) {
      console.error('删除会话失败:', error)
      return false
    }
  }

  // ==================== 工具方法 ====================

  private serializeValue(value: any, type: string): string {
    switch (type) {
      case 'json':
        return JSON.stringify(value)
      case 'number':
        return String(value)
      case 'boolean':
        return String(value)
      default:
        return String(value)
    }
  }

  private deserializeValue(value: string, type: string): any {
    switch (type) {
      case 'json':
        try {
          return JSON.parse(value)
        } catch {
          return null
        }
      case 'number':
        return Number(value)
      case 'boolean':
        return value === 'true'
      default:
        return value
    }
  }

  private getValueType(value: any): string {
    if (typeof value === 'object' && value !== null) {
      return 'json'
    }
    return typeof value
  }

  private checkSharedDataPermission(
    namespace: string,
    _key: string,
    requestPlugin: string,
    operation: string
  ): boolean {
    // 系统数据允许所有插件读取
    if (operation === 'read' && ['contacts', 'messages', 'conversations'].includes(namespace)) {
      return true
    }

    // 检查插件权限
    if (!this.permissionManager) {
      console.error('Permission manager not initialized')
      return false
    }

    return this.permissionManager.validateDataAccess(requestPlugin, operation, namespace)
  }

  async cleanup(): Promise<void> {
    try {
      // 清理权限管理器
      if (this.permissionManager) {
        await this.permissionManager.cleanup?.()
        this.permissionManager = null
      }

      // 数据库连接由DatabaseManager管理，这里不需要关闭
      this.db = null
      this.isInitialized = false

      console.log('PluginDataService cleanup completed')
    } catch (error) {
      console.error('Error during PluginDataService cleanup:', error)
      throw error
    }
  }
}

export const pluginDataService = PluginDataService.getInstance()
