import { ipcMain } from 'electron'
import { PluginDataService } from './PluginDataService'
import { PluginPermissionManager } from './PluginPermissionManager'
import { DataValidator } from './DataValidator'

export interface IPCRequest {
  pluginId: string
  action: string
  data?: any
  options?: any
  permission?: string
}

export interface IPCResponse {
  success: boolean
  data?: any
  error?: string
  warnings?: string[]
}

export interface PluginDataIPCChannels {
  // 私有数据操作
  'plugin-data:set': (request: IPCRequest) => Promise<IPCResponse>
  'plugin-data:get': (request: IPCRequest) => Promise<IPCResponse>
  'plugin-data:delete': (request: IPCRequest) => Promise<IPCResponse>
  'plugin-data:list': (request: IPCRequest) => Promise<IPCResponse>
  
  // 共享数据操作
  'plugin-shared-data:set': (request: IPCRequest) => Promise<IPCResponse>
  'plugin-shared-data:get': (request: IPCRequest) => Promise<IPCResponse>
  'plugin-shared-data:delete': (request: IPCRequest) => Promise<IPCResponse>
  'plugin-shared-data:list': (request: IPCRequest) => Promise<IPCResponse>
  
  // 联系人操作
  'plugin-contacts:get': (request: IPCRequest) => Promise<IPCResponse>
  'plugin-contacts:list': (request: IPCRequest) => Promise<IPCResponse>
  'plugin-contacts:add': (request: IPCRequest) => Promise<IPCResponse>
  'plugin-contacts:update': (request: IPCRequest) => Promise<IPCResponse>
  'plugin-contacts:delete': (request: IPCRequest) => Promise<IPCResponse>
  'plugin-contacts:pin': (request: IPCRequest) => Promise<IPCResponse>
  
  // 消息操作
  'plugin-messages:get': (request: IPCRequest) => Promise<IPCResponse>
  'plugin-messages:list': (request: IPCRequest) => Promise<IPCResponse>
  'plugin-messages:send': (request: IPCRequest) => Promise<IPCResponse>
  'plugin-messages:mark-read': (request: IPCRequest) => Promise<IPCResponse>
  'plugin-messages:delete': (request: IPCRequest) => Promise<IPCResponse>
  
  // 会话操作
  'plugin-conversations:get': (request: IPCRequest) => Promise<IPCResponse>
  'plugin-conversations:list': (request: IPCRequest) => Promise<IPCResponse>
  'plugin-conversations:create': (request: IPCRequest) => Promise<IPCResponse>
  'plugin-conversations:update': (request: IPCRequest) => Promise<IPCResponse>
  'plugin-conversations:delete': (request: IPCRequest) => Promise<IPCResponse>
  
  // 权限操作
  'plugin-permissions:check': (request: IPCRequest) => Promise<IPCResponse>
  'plugin-permissions:request': (request: IPCRequest) => Promise<IPCResponse>
  'plugin-permissions:list': (request: IPCRequest) => Promise<IPCResponse>
}

export class PluginDataIPC {
  private static instance: PluginDataIPC
  private dataService: PluginDataService
  private permissionManager: PluginPermissionManager
  private initialized = false

  private constructor() {
    this.dataService = PluginDataService.getInstance()
    this.permissionManager = PluginPermissionManager.getInstance()
  }

  static getInstance(): PluginDataIPC {
    if (!PluginDataIPC.instance) {
      PluginDataIPC.instance = new PluginDataIPC()
    }
    return PluginDataIPC.instance
  }

  /**
   * 初始化IPC通信
   */
  async initialize(): Promise<void> {
    if (this.initialized) {
      return
    }

    await this.dataService.initialize()
    await this.permissionManager.initialize()
    
    this.registerIPCHandlers()
    this.initialized = true
    
    console.log('Plugin Data IPC initialized')
  }

  /**
   * 注册IPC处理器
   */
  private registerIPCHandlers(): void {
    // 私有数据操作
    ipcMain.handle('plugin-data:set', (_event, request) => this.handleSetPluginData(request))
    ipcMain.handle('plugin-data:get', (_event, request) => this.handleGetPluginData(request))
    ipcMain.handle('plugin-data:delete', (_event, request) => this.handleDeletePluginData(request))
    ipcMain.handle('plugin-data:list', (_event, request) => this.handleListPluginData(request))

    // 共享数据操作
    ipcMain.handle('plugin-shared-data:set', (_event, request) => this.handleSetSharedData(request))
    ipcMain.handle('plugin-shared-data:get', (_event, request) => this.handleGetSharedData(request))
    ipcMain.handle('plugin-shared-data:delete', (_event, request) => this.handleDeleteSharedData(request))
    ipcMain.handle('plugin-shared-data:list', (_event, request) => this.handleListSharedData(request))

    // 联系人操作
    ipcMain.handle('plugin-contacts:get', (_event, request) => this.handleGetContact(request))
    ipcMain.handle('plugin-contacts:list', (_event, request) => this.handleListContacts(request))
    ipcMain.handle('plugin-contacts:add', (_event, request) => this.handleAddContact(request))
    ipcMain.handle('plugin-contacts:update', (_event, request) => this.handleUpdateContact(request))
    ipcMain.handle('plugin-contacts:delete', (_event, request) => this.handleDeleteContact(request))
    ipcMain.handle('plugin-contacts:pin', (_event, request) => this.handlePinContact(request))

    // 消息操作
    ipcMain.handle('plugin-messages:get', (_event, request) => this.handleGetMessage(request))
    ipcMain.handle('plugin-messages:list', (_event, request) => this.handleListMessages(request))
    ipcMain.handle('plugin-messages:send', (_event, request) => this.handleSendMessage(request))
    ipcMain.handle('plugin-messages:mark-read', (_event, request) => this.handleMarkMessageAsRead(request))
    ipcMain.handle('plugin-messages:delete', (_event, request) => this.handleDeleteMessage(request))

    // 会话操作
    ipcMain.handle('plugin-conversations:get', (_event, request) => this.handleGetConversation(request))
    ipcMain.handle('plugin-conversations:list', (_event, request) => this.handleListConversations(request))
    ipcMain.handle('plugin-conversations:create', (_event, request) => this.handleCreateConversation(request))
    ipcMain.handle('plugin-conversations:update', (_event, request) => this.handleUpdateConversation(request))
    ipcMain.handle('plugin-conversations:delete', (_event, request) => this.handleDeleteConversation(request))

    // 权限操作
    ipcMain.handle('plugin-permissions:check', (_event, request) => this.handleCheckPermission(request))
    ipcMain.handle('plugin-permissions:request', (_event, request) => this.handleRequestPermission(request))
    ipcMain.handle('plugin-permissions:list', (_event, request) => this.handleListPermissions(request))
  }

  /**
   * 通用错误处理
   */
  private handleError(error: any, action: string): IPCResponse {
    console.error(`Plugin Data IPC Error [${action}]:`, error)
    return {
      success: false,
      error: error.message || 'Unknown error occurred'
    }
  }

  /**
   * 验证请求格式
   */
  private validateRequest(request: IPCRequest, requiredFields: string[] = []): IPCResponse | null {
    if (!request || typeof request !== 'object') {
      return {
        success: false,
        error: 'Invalid request format'
      }
    }

    if (!request.pluginId || typeof request.pluginId !== 'string') {
      return {
        success: false,
        error: 'Plugin ID is required'
      }
    }

    const pluginIdValidation = DataValidator.validatePluginId(request.pluginId)
    if (!pluginIdValidation.valid) {
      return {
        success: false,
        error: `Invalid plugin ID: ${pluginIdValidation.errors.join(', ')}`
      }
    }

    for (const field of requiredFields) {
      if (request.data && request.data[field] === undefined) {
        return {
          success: false,
          error: `Required field missing: ${field}`
        }
      }
    }

    return null
  }

  // ==================== 私有数据操作 ====================

  private async handleSetPluginData(request: IPCRequest): Promise<IPCResponse> {
    try {
      const validation = this.validateRequest(request, ['key', 'value'])
      if (validation) return validation

      const keyValidation = DataValidator.validateDataKey(request.data.key)
      if (!keyValidation.valid) {
        return {
          success: false,
          error: `Invalid data key: ${keyValidation.errors.join(', ')}`
        }
      }

      await this.dataService.setPluginData(
        request.pluginId,
        request.data.key,
        request.data.value,
        request.data.ttl
      )

      return { success: true }
    } catch (error) {
      return this.handleError(error, 'setPluginData')
    }
  }

  private async handleGetPluginData(request: IPCRequest): Promise<IPCResponse> {
    try {
      const validation = this.validateRequest(request, ['key'])
      if (validation) return validation

      const data = await this.dataService.getPluginData(
        request.pluginId,
        request.data.key
      )

      return { success: true, data }
    } catch (error) {
      return this.handleError(error, 'getPluginData')
    }
  }

  private async handleDeletePluginData(request: IPCRequest): Promise<IPCResponse> {
    try {
      const validation = this.validateRequest(request, ['key'])
      if (validation) return validation

      const deleted = await this.dataService.deletePluginData(
        request.pluginId,
        request.data.key
      )

      return { success: true, data: { deleted } }
    } catch (error) {
      return this.handleError(error, 'deletePluginData')
    }
  }

  private async handleListPluginData(request: IPCRequest): Promise<IPCResponse> {
    try {
      const validation = this.validateRequest(request)
      if (validation) return validation

      const data = await this.dataService.listPluginData(
        request.pluginId
      )

      return { success: true, data }
    } catch (error) {
      return this.handleError(error, 'listPluginData')
    }
  }

  // ==================== 共享数据操作 ====================

  private async handleSetSharedData(request: IPCRequest): Promise<IPCResponse> {
    try {
      const validation = this.validateRequest(request, ['namespace', 'key', 'value'])
      if (validation) return validation

      // 检查权限
      const hasPermission = await this.permissionManager.checkPermission(
        request.pluginId,
        'write:shared_data'
      )
      if (!hasPermission) {
        return {
          success: false,
          error: 'Permission denied: shared data write access required'
        }
      }

      await this.dataService.setSharedData(
        request.data.namespace,
        request.data.key,
        request.data.value,
        request.pluginId,
        request.data.ttl
      )

      return { success: true }
    } catch (error) {
      return this.handleError(error, 'setSharedData')
    }
  }

  private async handleGetSharedData(request: IPCRequest): Promise<IPCResponse> {
    try {
      const validation = this.validateRequest(request, ['namespace', 'key'])
      if (validation) return validation

      // 检查权限
      const hasPermission = await this.permissionManager.checkPermission(
        request.pluginId,
        'read:shared_data'
      )
      if (!hasPermission) {
        return {
          success: false,
          error: 'Permission denied: shared data read access required'
        }
      }

      const data = await this.dataService.getSharedData(
        request.data.namespace,
        request.data.key,
        request.pluginId
      )

      return { success: true, data }
    } catch (error) {
      return this.handleError(error, 'getSharedData')
    }
  }

  private async handleDeleteSharedData(request: IPCRequest): Promise<IPCResponse> {
    try {
      const validation = this.validateRequest(request, ['namespace', 'key'])
      if (validation) return validation

      // 检查权限
      const hasPermission = await this.permissionManager.checkPermission(
        request.pluginId,
        'write:shared_data'
      )
      if (!hasPermission) {
        return {
          success: false,
          error: 'Permission denied: shared data write access required'
        }
      }

      const deleted = await this.dataService.deleteSharedData(
        request.data.namespace,
        request.data.key,
        request.pluginId
      )

      return { success: true, data: { deleted } }
    } catch (error) {
      return this.handleError(error, 'deleteSharedData')
    }
  }

  private async handleListSharedData(request: IPCRequest): Promise<IPCResponse> {
    try {
      const validation = this.validateRequest(request, ['namespace'])
      if (validation) return validation

      // 检查权限
      const hasPermission = await this.permissionManager.checkPermission(
        request.pluginId,
        'read:shared_data'
      )
      if (!hasPermission) {
        return {
          success: false,
          error: 'Permission denied: shared data read access required'
        }
      }

      const data = await this.dataService.listSharedData(
        request.data.namespace,
        request.pluginId
      )

      return { success: true, data }
    } catch (error) {
      return this.handleError(error, 'listSharedData')
    }
  }

  // ==================== 联系人操作 ====================

  private async handleGetContact(request: IPCRequest): Promise<IPCResponse> {
    try {
      const validation = this.validateRequest(request, ['contactId'])
      if (validation) return validation

      // 检查权限
      const hasPermission = this.permissionManager.validateDataAccess(
        request.pluginId,
        'read',
        'contacts'
      )
      if (!hasPermission) {
        return {
          success: false,
          error: 'Permission denied: contacts read access required'
        }
      }

      const contact = await this.dataService.getContact(request.data.contactId, request.pluginId)
      return { success: true, data: contact }
    } catch (error) {
      return this.handleError(error, 'getContact')
    }
  }

  private async handleListContacts(request: IPCRequest): Promise<IPCResponse> {
    try {
      const validation = this.validateRequest(request)
      if (validation) return validation

      // 检查权限
      const hasPermission = this.permissionManager.validateDataAccess(
        request.pluginId,
        'read',
        'contacts'
      )
      if (!hasPermission) {
        return {
          success: false,
          error: 'Permission denied: contacts read access required'
        }
      }

      const contacts = await this.dataService.getContacts(request.pluginId)
      return { success: true, data: contacts }
    } catch (error) {
      return this.handleError(error, 'listContacts')
    }
  }

  private async handleAddContact(request: IPCRequest): Promise<IPCResponse> {
    try {
      const validation = this.validateRequest(request, ['contactData'])
      if (validation) return validation

      // 检查权限
      const hasPermission = this.permissionManager.validateDataAccess(
        request.pluginId,
        'write',
        'contacts'
      )
      if (!hasPermission) {
        return {
          success: false,
          error: 'Permission denied: contacts write access required'
        }
      }

      // 验证联系人数据
      const dataValidation = DataValidator.validateContactData(request.data.contactData)
      if (!dataValidation.valid) {
        return {
          success: false,
          error: `Invalid contact data: ${dataValidation.errors.join(', ')}`,
          warnings: dataValidation.warnings
        }
      }

      const contactId = await this.dataService.addContact(
        request.data.contactData,
        request.pluginId
      )
      return { 
        success: true, 
        data: { contactId },
        warnings: dataValidation.warnings
      }
    } catch (error) {
      return this.handleError(error, 'addContact')
    }
  }

  private async handleUpdateContact(request: IPCRequest): Promise<IPCResponse> {
    try {
      const validation = this.validateRequest(request, ['contactId', 'updates'])
      if (validation) return validation

      // 检查权限
      const hasPermission = this.permissionManager.validateDataAccess(
        request.pluginId,
        'write',
        'contacts'
      )
      if (!hasPermission) {
        return {
          success: false,
          error: 'Permission denied: contacts write access required'
        }
      }

      // 验证更新数据
      const dataValidation = DataValidator.validateContactData(request.data.updates, true)
      if (!dataValidation.valid) {
        return {
          success: false,
          error: `Invalid contact update data: ${dataValidation.errors.join(', ')}`,
          warnings: dataValidation.warnings
        }
      }

      const updated = await this.dataService.updateContact(
        request.data.contactId,
        request.data.updates,
        request.pluginId
      )
      return { 
        success: true, 
        data: { updated },
        warnings: dataValidation.warnings
      }
    } catch (error) {
      return this.handleError(error, 'updateContact')
    }
  }

  private async handleDeleteContact(request: IPCRequest): Promise<IPCResponse> {
    try {
      const validation = this.validateRequest(request, ['contactId'])
      if (validation) return validation

      // 检查权限
      const hasPermission = this.permissionManager.validateDataAccess(
        request.pluginId,
        'write',
        'contacts'
      )
      if (!hasPermission) {
        return {
          success: false,
          error: 'Permission denied: contacts write access required'
        }
      }

      const deleted = await this.dataService.deleteContact(
        request.data.contactId,
        request.pluginId
      )
      return { success: true, data: { deleted } }
    } catch (error) {
      return this.handleError(error, 'deleteContact')
    }
  }

  private async handlePinContact(request: IPCRequest): Promise<IPCResponse> {
    try {
      const validation = this.validateRequest(request, ['contactId', 'pinned'])
      if (validation) return validation

      // 检查权限
      const hasPermission = this.permissionManager.validateDataAccess(
        request.pluginId,
        'write',
        'contacts'
      )
      if (!hasPermission) {
        return {
          success: false,
          error: 'Permission denied: contacts write access required'
        }
      }

      const updated = await this.dataService.pinContact(
        request.data.contactId,
        request.data.pinned,
        request.pluginId
      )
      return { success: true, data: { updated } }
    } catch (error) {
      return this.handleError(error, 'pinContact')
    }
  }

  // ==================== 消息操作 ====================

  private async handleGetMessage(request: IPCRequest): Promise<IPCResponse> {
    try {
      const validation = this.validateRequest(request, ['messageId'])
      if (validation) return validation

      // 检查权限
      const hasPermission = this.permissionManager.validateDataAccess(
        request.pluginId,
        'read',
        'messages'
      )
      if (!hasPermission) {
        return {
          success: false,
          error: 'Permission denied: messages read access required'
        }
      }

      const message = await this.dataService.getMessage(request.data.messageId, request.pluginId)
      return { success: true, data: message }
    } catch (error) {
      return this.handleError(error, 'getMessage')
    }
  }

  private async handleListMessages(request: IPCRequest): Promise<IPCResponse> {
    try {
      const validation = this.validateRequest(request)
      if (validation) return validation

      // 检查权限
      const hasPermission = this.permissionManager.validateDataAccess(
        request.pluginId,
        'read',
        'messages'
      )
      if (!hasPermission) {
        return {
          success: false,
          error: 'Permission denied: messages read access required'
        }
      }

      const messages = await this.dataService.getMessages(
        request.data?.conversationId,
        request.options?.page || 1,
        request.options?.limit || 20,
        request.pluginId
      )
      return { success: true, data: messages }
    } catch (error) {
      return this.handleError(error, 'listMessages')
    }
  }

  private async handleSendMessage(request: IPCRequest): Promise<IPCResponse> {
    try {
      const validation = this.validateRequest(request, ['messageData'])
      if (validation) return validation

      // 检查权限
      const hasPermission = this.permissionManager.validateDataAccess(
        request.pluginId,
        'write',
        'messages'
      )
      if (!hasPermission) {
        return {
          success: false,
          error: 'Permission denied: messages write access required'
        }
      }

      // 验证消息数据
      const dataValidation = DataValidator.validateMessageData(request.data.messageData)
      if (!dataValidation.valid) {
        return {
          success: false,
          error: `Invalid message data: ${dataValidation.errors.join(', ')}`,
          warnings: dataValidation.warnings
        }
      }

      const messageId = await this.dataService.sendMessage(
        request.data.messageData,
        request.pluginId
      )
      return { 
        success: true, 
        data: { messageId },
        warnings: dataValidation.warnings
      }
    } catch (error) {
      return this.handleError(error, 'sendMessage')
    }
  }

  private async handleMarkMessageAsRead(request: IPCRequest): Promise<IPCResponse> {
    try {
      const validation = this.validateRequest(request, ['messageId'])
      if (validation) return validation

      // 检查权限
      const hasPermission = this.permissionManager.validateDataAccess(
        request.pluginId,
        'write',
        'messages'
      )
      if (!hasPermission) {
        return {
          success: false,
          error: 'Permission denied: messages write access required'
        }
      }

      const updated = await this.dataService.markMessageAsRead(
        request.data.messageId,
        request.pluginId
      )
      return { success: true, data: { updated } }
    } catch (error) {
      return this.handleError(error, 'markMessageAsRead')
    }
  }

  private async handleDeleteMessage(request: IPCRequest): Promise<IPCResponse> {
    try {
      const validation = this.validateRequest(request, ['messageId'])
      if (validation) return validation

      // 检查权限
      const hasPermission = this.permissionManager.validateDataAccess(
        request.pluginId,
        'write',
        'messages'
      )
      if (!hasPermission) {
        return {
          success: false,
          error: 'Permission denied: messages write access required'
        }
      }

      const deleted = await this.dataService.deleteMessage(
        request.data.messageId,
        request.pluginId
      )
      return { success: true, data: { deleted } }
    } catch (error) {
      return this.handleError(error, 'deleteMessage')
    }
  }

  // ==================== 会话操作 ====================

  private async handleGetConversation(request: IPCRequest): Promise<IPCResponse> {
    try {
      const validation = this.validateRequest(request, ['conversationId'])
      if (validation) return validation

      // 检查权限
      const hasPermission = this.permissionManager.validateDataAccess(
        request.pluginId,
        'read',
        'conversations'
      )
      if (!hasPermission) {
        return {
          success: false,
          error: 'Permission denied: conversations read access required'
        }
      }

      const conversation = await this.dataService.getConversation(request.data.conversationId)
      return { success: true, data: conversation }
    } catch (error) {
      return this.handleError(error, 'getConversation')
    }
  }

  private async handleListConversations(request: IPCRequest): Promise<IPCResponse> {
    try {
      const validation = this.validateRequest(request)
      if (validation) return validation

      // 检查权限
      const hasPermission = this.permissionManager.validateDataAccess(
        request.pluginId,
        'read',
        'conversations'
      )
      if (!hasPermission) {
        return {
          success: false,
          error: 'Permission denied: conversations read access required'
        }
      }

      const conversations = await this.dataService.getConversations(
        request.data?.userId,
        request.options
      )
      return { success: true, data: conversations }
    } catch (error) {
      return this.handleError(error, 'listConversations')
    }
  }

  private async handleCreateConversation(request: IPCRequest): Promise<IPCResponse> {
    try {
      const validation = this.validateRequest(request, ['conversationData'])
      if (validation) return validation

      // 检查权限
      const hasPermission = this.permissionManager.validateDataAccess(
        request.pluginId,
        'write',
        'conversations'
      )
      if (!hasPermission) {
        return {
          success: false,
          error: 'Permission denied: conversations write access required'
        }
      }

      // 验证会话数据
      const dataValidation = DataValidator.validateConversationData(request.data.conversationData)
      if (!dataValidation.valid) {
        return {
          success: false,
          error: `Invalid conversation data: ${dataValidation.errors.join(', ')}`,
          warnings: dataValidation.warnings
        }
      }

      const conversationId = await this.dataService.createConversation(
        request.data.conversationData,
        request.pluginId
      )
      return { 
        success: true, 
        data: { conversationId },
        warnings: dataValidation.warnings
      }
    } catch (error) {
      return this.handleError(error, 'createConversation')
    }
  }

  private async handleUpdateConversation(request: IPCRequest): Promise<IPCResponse> {
    try {
      const validation = this.validateRequest(request, ['conversationId', 'updates'])
      if (validation) return validation

      // 检查权限
      const hasPermission = this.permissionManager.validateDataAccess(
        request.pluginId,
        'write',
        'conversations'
      )
      if (!hasPermission) {
        return {
          success: false,
          error: 'Permission denied: conversations write access required'
        }
      }

      // 验证更新数据
      const dataValidation = DataValidator.validateConversationData(request.data.updates, true)
      if (!dataValidation.valid) {
        return {
          success: false,
          error: `Invalid conversation update data: ${dataValidation.errors.join(', ')}`,
          warnings: dataValidation.warnings
        }
      }

      const updated = await this.dataService.updateConversation(
        request.data.conversationId,
        request.data.updates,
        request.pluginId
      )
      return { 
        success: true, 
        data: { updated },
        warnings: dataValidation.warnings
      }
    } catch (error) {
      return this.handleError(error, 'updateConversation')
    }
  }

  private async handleDeleteConversation(request: IPCRequest): Promise<IPCResponse> {
    try {
      const validation = this.validateRequest(request, ['conversationId'])
      if (validation) return validation

      // 检查权限
      const hasPermission = this.permissionManager.validateDataAccess(
        request.pluginId,
        'write',
        'conversations'
      )
      if (!hasPermission) {
        return {
          success: false,
          error: 'Permission denied: conversations write access required'
        }
      }

      const deleted = await this.dataService.deleteConversation(
        request.data.conversationId,
        request.pluginId
      )
      return { success: true, data: { deleted } }
    } catch (error) {
      return this.handleError(error, 'deleteConversation')
    }
  }

  // ==================== 权限操作 ====================

  private async handleCheckPermission(request: IPCRequest): Promise<IPCResponse> {
    try {
      const validation = this.validateRequest(request, ['resource', 'action'])
      if (validation) return validation

      const hasPermission = await this.permissionManager.requestPermission(
        request.pluginId,
        request.permission || request.data?.permission || ''
      )
      return { success: true, data: { hasPermission } }
    } catch (error) {
      return this.handleError(error, 'checkPermission')
    }
  }

  private async handleRequestPermission(request: IPCRequest): Promise<IPCResponse> {
    try {
      const validation = this.validateRequest(request, ['permission'])
      if (validation) return validation

      const granted = await this.permissionManager.requestPermission(
        request.pluginId,
        request.data.permission || request.permission || ''
      )
      return { success: true, data: { granted } }
    } catch (error) {
      return this.handleError(error, 'requestPermission')
    }
  }

  private async handleListPermissions(request: IPCRequest): Promise<IPCResponse> {
    try {
      const validation = this.validateRequest(request)
      if (validation) return validation

      const permissions = await this.permissionManager.getPluginPermissions(request.pluginId)
      return { success: true, data: permissions }
    } catch (error) {
      return this.handleError(error, 'listPermissions')
    }
  }

  /**
   * 清理资源
   */
  async cleanup(): Promise<void> {
    if (!this.initialized) {
      return
    }

    // 移除所有IPC处理器
    const channels = [
      'plugin-data:set', 'plugin-data:get', 'plugin-data:delete', 'plugin-data:list',
      'plugin-shared-data:set', 'plugin-shared-data:get', 'plugin-shared-data:delete', 'plugin-shared-data:list',
      'plugin-contacts:get', 'plugin-contacts:list', 'plugin-contacts:add', 'plugin-contacts:update', 'plugin-contacts:delete', 'plugin-contacts:pin',
      'plugin-messages:get', 'plugin-messages:list', 'plugin-messages:send', 'plugin-messages:mark-read', 'plugin-messages:delete',
      'plugin-conversations:get', 'plugin-conversations:list', 'plugin-conversations:create', 'plugin-conversations:update', 'plugin-conversations:delete',
      'plugin-permissions:check', 'plugin-permissions:request', 'plugin-permissions:list'
    ]

    channels.forEach(channel => {
      ipcMain.removeAllListeners(channel)
    })

    this.initialized = false
    console.log('Plugin Data IPC cleaned up')
  }
}