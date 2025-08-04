import { ipcMain } from 'electron'
import { PluginPermissionManager } from './PluginPermissionManager'

export interface PluginMessage {
  fromPluginId: string
  toPluginId: string
  action: string
  data?: any
  requestId?: string
}

export interface PluginResponse {
  success: boolean
  data?: any
  error?: string
  requestId?: string
}

/**
 * 插件间通信服务
 * 负责处理插件之间的消息传递和服务调用
 */
export class PluginCommunicationService {
  private static instance: PluginCommunicationService
  private permissionManager: PluginPermissionManager
  private initialized = false
  private messageHandlers = new Map<string, Map<string, Function>>()

  private constructor() {
    this.permissionManager = PluginPermissionManager.getInstance()
  }

  static getInstance(): PluginCommunicationService {
    if (!PluginCommunicationService.instance) {
      PluginCommunicationService.instance = new PluginCommunicationService()
    }
    return PluginCommunicationService.instance
  }

  async initialize(): Promise<void> {
    if (this.initialized) {
      return
    }

    await this.permissionManager.initialize()
    this.setupIPCHandlers()
    this.setupBuiltinHandlers()
    this.initialized = true
    
    console.log('Plugin Communication Service initialized')
  }

  private setupIPCHandlers(): void {
    // 监听插件间消息发送
    ipcMain.handle('plugin-send-message', async (_event, message: PluginMessage) => {
      return await this.handlePluginMessage(message)
    })

    // 监听插件注册消息处理器
    ipcMain.handle('plugin-register-handler', async (_event, pluginId: string, action: string, handler: Function) => {
      this.registerMessageHandler(pluginId, action, handler)
    })

    // 监听插件注销消息处理器
    ipcMain.handle('plugin-unregister-handler', async (_event, pluginId: string, action?: string) => {
      this.unregisterMessageHandler(pluginId, action)
    })
  }

  private setupBuiltinHandlers(): void {
    // 注册通讯录插件的内置处理器
    this.registerContactPluginHandlers()
    
    // 注册消息插件的内置处理器
    this.registerMessagePluginHandlers()
  }

  private registerContactPluginHandlers(): void {
    const contactHandlers = new Map<string, Function>()
    
    // 联系人相关处理器
    contactHandlers.set('contact.list', async (_data: any) => {
      return { contacts: [] }
    })

    contactHandlers.set('contact.get', async (_data: { contactId: number }) => {
      return { contact: null }
    })

    contactHandlers.set('contact.add', async (_data: any) => {
      return { contact: null }
    })

    contactHandlers.set('contact.update', async (_data: any) => {
      return { success: true }
    })

    contactHandlers.set('contact.delete', async (_data: { contactId: number }) => {
      return { success: true }
    })

    contactHandlers.set('contact.search', async (_data: { keyword: string }) => {
      return { contacts: [] }
    })
    
    // 群组相关处理器
    contactHandlers.set('group.list', async (_data: any) => {
      return { groups: [] }
    })

    contactHandlers.set('group.get', async (_data: { groupId: number }) => {
      return { group: null }
    })

    contactHandlers.set('group.create', async (_data: any) => {
      return { group: null }
    })

    contactHandlers.set('group.update', async (_data: any) => {
      return { success: true }
    })

    contactHandlers.set('group.delete', async (_data: { groupId: number }) => {
      return { success: true }
    })

    contactHandlers.set('group.members', async (_data: { groupId: number }) => {
      return { members: [] }
    })

    contactHandlers.set('group.invite', async (_data: any) => {
      return { success: true }
    })

    contactHandlers.set('group.remove', async (_data: any) => {
      return { success: true }
    })
    
    this.messageHandlers.set('contact-plugin', contactHandlers)
  }

  private registerMessagePluginHandlers(): void {
    const messageHandlers = new Map<string, Function>()
    
    // 消息相关处理器
    messageHandlers.set('message.send', async (_data: any) => {
      return { message: null }
    })

    messageHandlers.set('message.list', async (_data: any) => {
      return { messages: [] }
    })

    messageHandlers.set('message.get', async (_data: { messageId: number }) => {
      return { message: null }
    })

    messageHandlers.set('message.delete', async (_data: { messageId: number }) => {
      return { success: true }
    })

    messageHandlers.set('message.recall', async (_data: { messageId: number }) => {
      return { success: true }
    })

    messageHandlers.set('message.search', async (_data: any) => {
      return { messages: [] }
    })
    
    // 会话相关处理器
    messageHandlers.set('conversation.list', async (_data: any) => {
      return { conversations: [] }
    })
    
    messageHandlers.set('conversation.get', async (_data: { conversationId: number }) => {
      return { conversation: null }
    })
    
    messageHandlers.set('conversation.create', async (_data: any) => {
      return { conversation: null }
    })
    
    messageHandlers.set('conversation.update', async (_data: any) => {
      return { success: true }
    })
    
    messageHandlers.set('conversation.delete', async (_data: { conversationId: number }) => {
      return { success: true }
    })
    
    messageHandlers.set('conversation.pin', async (_data: any) => {
      return { success: true }
    })
    
    messageHandlers.set('conversation.mute', async (_data: any) => {
      return { success: true }
    })
    
    this.messageHandlers.set('message-plugin', messageHandlers)
  }

  private async handlePluginMessage(message: PluginMessage): Promise<PluginResponse> {
    try {
      console.log('Plugin Message:', message.fromPluginId, '->', message.toPluginId, message.action)
      
      // 验证插件权限
      if (!this.validatePluginCommunication(message)) {
        return {
          success: false,
          error: '插件通信权限不足',
          requestId: message.requestId
        }
      }

      // 检查目标插件是否存在和启用（简化处理）
      // TODO: 实现真正的插件状态检查
      // const targetPlugin = await pluginManager.getPlugin(message.toPluginId)
      // if (!targetPlugin || !targetPlugin.enabled) {
      //   return {
      //     success: false,
      //     error: `目标插件 ${message.toPluginId} 不存在或未启用`,
      //     requestId: message.requestId
      //   }
      // }

      // 查找消息处理器
      const pluginHandlers = this.messageHandlers.get(message.toPluginId)
      if (!pluginHandlers) {
        return {
          success: false,
          error: `插件 ${message.toPluginId} 没有注册任何消息处理器`,
          requestId: message.requestId
        }
      }

      const handler = pluginHandlers.get(message.action)
      if (!handler) {
        return {
          success: false,
          error: `插件 ${message.toPluginId} 没有注册 ${message.action} 处理器`,
          requestId: message.requestId
        }
      }

      // 执行处理器
      const result = await handler(message.data)
      
      return {
        success: true,
        data: result,
        requestId: message.requestId
      }
    } catch (error: any) {
      console.error('Plugin Message Error:', error)
      return {
        success: false,
        error: error.message || '插件消息处理失败',
        requestId: message.requestId
      }
    }
  }

  private validatePluginCommunication(message: PluginMessage): boolean {
    const { fromPluginId, toPluginId, action } = message

    // 基础验证
    if (!fromPluginId || !toPluginId || !action) {
      return false
    }

    // 不能给自己发消息
    if (fromPluginId === toPluginId) {
      return false
    }

    // 检查发送方插件权限
    // TODO: 实现更细粒度的权限控制
    
    // 检查特定的跨插件访问权限
    if (toPluginId === 'contact-plugin' && action.startsWith('contact.')) {
      // 访问联系人数据需要联系人权限
      return this.permissionManager!.validateDataAccess(fromPluginId, 'read', 'contacts')
    }
    
    if (toPluginId === 'contact-plugin' && action.startsWith('group.')) {
      // 访问群组数据需要群组权限
      return this.permissionManager!.validateDataAccess(fromPluginId, 'read', 'groups')
    }
    
    if (toPluginId === 'message-plugin' && action.startsWith('message.')) {
      // 访问消息数据需要消息权限
      return this.permissionManager!.validateDataAccess(fromPluginId, 'read', 'messages')
    }
    
    if (toPluginId === 'message-plugin' && action.startsWith('conversation.')) {
      // 访问会话数据需要会话权限
      return this.permissionManager!.validateDataAccess(fromPluginId, 'read', 'conversations')
    }

    return true
  }

  registerMessageHandler(pluginId: string, action: string, handler: Function): void {
    if (!this.messageHandlers.has(pluginId)) {
      this.messageHandlers.set(pluginId, new Map())
    }
    
    const pluginHandlers = this.messageHandlers.get(pluginId)!
    pluginHandlers.set(action, handler)
    
    console.log(`Registered message handler: ${pluginId}.${action}`)
  }

  unregisterMessageHandler(pluginId: string, action?: string): void {
    const pluginHandlers = this.messageHandlers.get(pluginId)
    if (!pluginHandlers) {
      return
    }
    
    if (action) {
      pluginHandlers.delete(action)
      console.log(`Unregistered message handler: ${pluginId}.${action}`)
    } else {
      this.messageHandlers.delete(pluginId)
      console.log(`Unregistered all message handlers for plugin: ${pluginId}`)
    }
  }

  async sendMessage(message: PluginMessage): Promise<PluginResponse> {
    return await this.handlePluginMessage(message)
  }

  getRegisteredHandlers(pluginId: string): string[] {
    const pluginHandlers = this.messageHandlers.get(pluginId)
    if (!pluginHandlers) {
      return []
    }
    
    return Array.from(pluginHandlers.keys())
  }

  getAllRegisteredHandlers(): { [pluginId: string]: string[] } {
    const result: { [pluginId: string]: string[] } = {}
    
    for (const [pluginId, handlers] of this.messageHandlers) {
      result[pluginId] = Array.from(handlers.keys())
    }
    
    return result
  }

  async cleanup(): Promise<void> {
    if (this.initialized) {
      // 清理 IPC 处理器
      ipcMain.removeAllListeners('plugin-send-message')
      ipcMain.removeAllListeners('plugin-register-handler')
      ipcMain.removeAllListeners('plugin-unregister-handler')
      
      // 清理消息处理器
      this.messageHandlers.clear()
      
      this.initialized = false
      console.log('Plugin Communication Service cleaned up')
    }
  }
}

export const pluginCommunicationService = PluginCommunicationService.getInstance()