import { ipcMain } from 'electron'
import { authService } from '../auth/AuthService'
import { userService } from '../user/UserService'
import { serviceManager } from '../index'
import { PluginPermissionManager } from './PluginPermissionManager'

export interface PluginAPIRequest {
  pluginId: string
  method: string
  url: string
  data?: any
  headers?: { [key: string]: string }
  userId?: number
}

export interface PluginAPIResponse {
  success: boolean
  status: number
  code: number
  message: string
  data?: any
}

/**
 * 插件 API 处理器
 * 负责处理插件对基座服务的 API 调用
 * 提供权限验证和数据访问控制
 */
export class PluginAPIHandler {
  private static instance: PluginAPIHandler
  private permissionManager: PluginPermissionManager
  private initialized = false

  private constructor() {
    this.permissionManager = PluginPermissionManager.getInstance()
  }

  static getInstance(): PluginAPIHandler {
    if (!PluginAPIHandler.instance) {
      PluginAPIHandler.instance = new PluginAPIHandler()
    }
    return PluginAPIHandler.instance
  }

  async initialize(): Promise<void> {
    if (this.initialized) {
      return
    }

    await this.permissionManager.initialize()
    this.setupIPCHandlers()
    this.initialized = true
    
    console.log('Plugin API Handler initialized')
  }

  private setupIPCHandlers(): void {
    // 监听插件 API 请求
    ipcMain.handle('plugin-api-call', async (_event, request: PluginAPIRequest) => {
      return await this.handlePluginAPICall(request)
    })
  }

  private async handlePluginAPICall(request: PluginAPIRequest): Promise<PluginAPIResponse> {
    try {
      console.log('Plugin API Call:', request.pluginId, request.method, request.url)
      
      // 验证插件权限
      if (!this.validatePluginPermission(request)) {
        return this.createErrorResponse(403, '插件权限不足')
      }

      // 验证用户身份（如果需要）
      if (this.requiresAuthentication(request.url)) {
        const token = this.extractToken(request.headers)
        if (!token) {
          return this.createErrorResponse(401, '未授权访问')
        }
        
        const user = await authService.validateSession(token)
        if (!user) {
          return this.createErrorResponse(401, '登录已过期')
        }
        
        request.userId = user.id
      }

      // 路由到对应的处理方法
      const result = await this.routePluginRequest(request)
      
      return {
        success: true,
        status: 200,
        code: 200,
        message: 'success',
        data: result
      }
    } catch (error: any) {
      console.error('Plugin API Error:', error)
      return this.createErrorResponse(500, error.message || '服务器内部错误')
    }
  }

  private async routePluginRequest(request: PluginAPIRequest): Promise<any> {
    const { url, data, userId } = request

    // 认证相关接口（基座保留）
    if (url === '/api/v1/auth/login') {
      return await authService.login(data)
    }
    if (url === '/api/v1/auth/register') {
      await authService.register(data)
      return null
    }
    if (url === '/api/v1/auth/logout') {
      const token = this.extractToken(request.headers)
      if (token) {
        await authService.logout(token)
      }
      return null
    }
    if (url === '/api/v1/auth/forget') {
      await authService.forgetPassword(data.mobile, data.password, data.sms_code)
      return null
    }

    // 用户相关接口（基座保留）
    if (url === '/api/v1/user/detail') {
      return await userService.getUserDetail(userId!)
    }
    if (url === '/api/v1/user/update') {
      await userService.updateUser(userId!, data)
      return null
    }
    if (url === '/api/v1/user/password/update') {
      await userService.updatePassword(userId!, data.old_password, data.new_password)
      return null
    }
    if (url === '/api/v1/user/mobile/update') {
      await userService.updateMobile(userId!, data.mobile, data.password, data.sms_code)
      return null
    }
    if (url === '/api/v1/user/email/update') {
      await userService.updateEmail(userId!, data.email, data.password, data.code)
      return null
    }
    if (url === '/api/v1/user/setting') {
      const userSettings = await userService.getUserSettings(userId!)
      const userDetail = await userService.getUserDetail(userId!)
      return {
        user_info: {
          uid: userDetail.id,
          mobile: userDetail.mobile,
          nickname: userDetail.nickname,
          avatar: userDetail.avatar,
          motto: userDetail.motto,
          email: userDetail.email,
          gender: userDetail.gender,
          birthday: userDetail.birthday,
          is_qiye: false
        },
        settings: userSettings
      }
    }
    if (url === '/api/v1/user/search') {
      return await userService.searchUsers(data.mobile)
    }
    if (url === '/api/v1/user/online-status') {
      return await userService.getOnlineStatus(data.user_id)
    }

    // 文件上传相关接口（基座保留）
    if (url === '/api/v1/upload/file') {
      throw new Error('文件上传请使用 upload-file 事件')
    }

    // P2P 相关接口（基座保留）
    const p2pServiceClient = serviceManager.getP2PServiceClient()
    if (p2pServiceClient && url.startsWith('/api/v1/p2p/')) {
      return await this.handleP2PRequest(request, p2pServiceClient)
    }

    // 联系人相关接口（已迁移到插件）
    if (url.startsWith('/api/v1/contact/')) {
      return await this.handleContactRequest(request)
    }

    // 群组相关接口（已迁移到插件）
    if (url.startsWith('/api/v1/group/')) {
      return await this.handleGroupRequest(request)
    }

    // 聊天和消息相关接口（已迁移到插件）
    if (url.startsWith('/api/v1/talk/')) {
      return await this.handleMessageRequest(request)
    }

    throw new Error(`未知的接口: ${url}`)
  }

  private async handleP2PRequest(request: PluginAPIRequest, p2pServiceClient: any): Promise<any> {
    const { url, data } = request

    // P2P 状态查询
    if (url === '/api/v1/p2p/status') {
      const nodeInfo = await p2pServiceClient.getNodeInfo()
      return {
        isRunning: p2pServiceClient.isRunning(),
        peerId: nodeInfo?.peerId || null,
        identity: nodeInfo ? { peerId: nodeInfo.peerId } : null
      }
    }

    // 获取已发现的节点
    if (url === '/api/v1/p2p/peers') {
      const connectedPeers = await p2pServiceClient.getConnectedPeers()
      return connectedPeers.map((peerId: string) => ({
        peerId,
        status: 'connected',
        addedAt: new Date().toISOString()
      }))
    }

    // 发送P2P消息
    if (url === '/api/v1/p2p/message/send') {
      if (!data.groupId) {
        await p2pServiceClient.sendDirectMessage(data.to, data.content)
      }
      return null
    }

    // 其他P2P功能
    if (url === '/api/v1/p2p/group/create') {
      throw new Error('P2P群组功能暂未实现')
    }

    if (url === '/api/v1/p2p/group/join') {
      throw new Error('P2P群组功能暂未实现')
    }

    if (url === '/api/v1/p2p/group/leave') {
      throw new Error('P2P群组功能暂未实现')
    }

    if (url === '/api/v1/p2p/contact/add') {
      return null
    }

    if (url === '/api/v1/p2p/contact/list') {
      return []
    }

    if (url === '/api/v1/p2p/message/history') {
      return []
    }

    if (url === '/api/v1/p2p/peer/connect') {
      return null
    }

    if (url === '/api/v1/p2p/peer/disconnect') {
      return null
    }

    throw new Error(`未知的P2P接口: ${url}`)
  }

  private async handleContactRequest(request: PluginAPIRequest): Promise<any> {
    // 检查是否为通讯录插件
    if (request.pluginId !== 'contact-plugin') {
      throw new Error('联系人功能只能由通讯录插件访问')
    }

    // 这里可以实现插件间的数据访问代理
    // 或者直接抛出错误，要求插件使用插件间通信机制
    throw new Error('联系人功能已迁移到通讯录插件，请使用插件间通信机制')
  }

  private async handleGroupRequest(request: PluginAPIRequest): Promise<any> {
    // 检查是否为通讯录插件
    if (request.pluginId !== 'contact-plugin') {
      throw new Error('群组功能只能由通讯录插件访问')
    }

    // 这里可以实现插件间的数据访问代理
    throw new Error('群组功能已迁移到通讯录插件，请使用插件间通信机制')
  }

  private async handleMessageRequest(request: PluginAPIRequest): Promise<any> {
    // 检查是否为消息插件
    if (request.pluginId !== 'message-plugin') {
      throw new Error('消息功能只能由消息插件访问')
    }

    // 这里可以实现插件间的数据访问代理
    throw new Error('消息功能已迁移到消息插件，请使用插件间通信机制')
  }

  private validatePluginPermission(request: PluginAPIRequest): boolean {
    // 检查插件是否有权限访问该 API
    const { pluginId, url } = request

    // 基础权限检查
    if (!pluginId) {
      return false
    }

    // 检查插件是否已注册
    // TODO: 实现插件注册检查逻辑

    // 检查 API 访问权限
    if (url.startsWith('/api/v1/auth/') || url.startsWith('/api/v1/user/')) {
      // 认证和用户接口，所有插件都可以访问
      return true
    }

    if (url.startsWith('/api/v1/upload/')) {
      // 文件上传接口，需要 upload 权限
      return this.permissionManager!.validateDataAccess(pluginId, 'write', 'files')
    }

    if (url.startsWith('/api/v1/p2p/')) {
      // P2P 接口，需要 network 权限
      return this.permissionManager!.validateDataAccess(pluginId, 'read', 'network')
    }

    if (url.startsWith('/api/v1/contact/') || url.startsWith('/api/v1/group/')) {
      // 联系人和群组接口，只有通讯录插件可以访问
      return pluginId === 'contact-plugin'
    }

    if (url.startsWith('/api/v1/talk/')) {
      // 消息接口，只有消息插件可以访问
      return pluginId === 'message-plugin'
    }

    return false
  }

  private requiresAuthentication(url: string): boolean {
    // 不需要认证的接口
    const publicEndpoints = [
      '/api/v1/auth/login',
      '/api/v1/auth/register',
      '/api/v1/auth/forget'
    ]

    return !publicEndpoints.includes(url)
  }

  private extractToken(headers?: { [key: string]: string }): string | null {
    if (!headers) {
      return null
    }

    const authHeader = headers['Authorization'] || headers['authorization']
    if (!authHeader) {
      return null
    }

    // 支持 Bearer token 格式
    if (authHeader.startsWith('Bearer ')) {
      return authHeader.substring(7)
    }

    return authHeader
  }

  private createErrorResponse(status: number, message: string): PluginAPIResponse {
    return {
      success: false,
      status,
      code: status,
      message,
      data: null
    }
  }

  async cleanup(): Promise<void> {
    if (this.initialized) {
      // 清理 IPC 处理器
      ipcMain.removeAllListeners('plugin-api-call')
      this.initialized = false
      console.log('Plugin API Handler cleaned up')
    }
  }
}

export const pluginAPIHandler = PluginAPIHandler.getInstance()