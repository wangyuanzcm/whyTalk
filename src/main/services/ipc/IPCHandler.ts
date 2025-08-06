import { ipcMain, BrowserWindow } from 'electron'
import { authService } from '../auth/AuthService'
import { userService } from '../user/UserService'
import { uploadService } from '../upload/UploadService'
import { localSendP2PManager as p2pManager } from '../p2p/LocalSendP2PManager'
import { loggerService } from '../logger/LoggerService'
import type { IPCRequest, IPCResponse } from './IPCHandler.d'

export class IPCHandler {
  private currentUser: any = null

  constructor() {
    this.setupIPCHandlers()
    this.setupRealtimeEvents()
  }

  private setupIPCHandlers(): void {
    // 监听API请求
    ipcMain.handle('api-request', async (_event, request: IPCRequest) => {
      return await this.handleRequest(request)
    })

    // 监听文件上传
    ipcMain.handle('upload-file', async (_event, fileData) => {
      return await this.handleFileUpload(fileData)
    })

    // 监听日志写入请求
    ipcMain.handle('logger:write', async (_event, logData) => {
      return await this.handleLogWrite(logData)
    })

    // 监听日志文件查询请求
    ipcMain.handle('logger:getFiles', async (_event) => {
      return await this.handleGetLogFiles()
    })

    // 监听日志文件读取请求
    ipcMain.handle('logger:readFile', async (_event, { fileName, lines }) => {
      return await this.handleReadLogFile(fileName, lines)
    })
  }

  private async handleRequest(request: IPCRequest): Promise<IPCResponse> {
    try {
      console.log('IPC API Request:', request.method, request.url)

      // 验证用户身份（除了登录和注册接口）
      if (!this.isPublicEndpoint(request.url)) {
        const token = this.extractToken(request.headers)
        console.log('IPCHandler: Extracted token:', token ? 'present' : 'missing')

        if (!token) {
          console.warn('IPCHandler: No token provided for protected endpoint:', request.url)
          return this.createErrorResponse(request.id, 401, '未授权访问')
        }

        console.log('IPCHandler: Validating session for token:', token.substring(0, 20) + '...')
        this.currentUser = await authService.validateSession(token)

        if (!this.currentUser) {
          console.warn('IPCHandler: Session validation failed for endpoint:', request.url)
          return this.createErrorResponse(request.id, 401, '登录已过期')
        }

        console.log('IPCHandler: Session validated for user:', this.currentUser.mobile)
      }

      // 路由到对应的服务
      const result = await this.routeRequest(request)

      return {
        id: request.id,
        status: 200,
        code: 200,
        message: 'success',
        data: result
      }
    } catch (error: any) {
      console.error('IPC API Error:', error)
      return this.createErrorResponse(request.id, 500, error.message || '服务器内部错误')
    }
  }

  private async handleFileUpload(fileData: any): Promise<any> {
    try {
      const { buffer, fileName, mimeType, token } = fileData

      // 验证用户身份
      if (!token) {
        throw new Error('未授权访问')
      }

      const user = await authService.validateSession(token)
      if (!user) {
        throw new Error('登录已过期')
      }

      // 转换buffer
      const fileBuffer = Buffer.from(buffer)

      // 上传文件
      const result = await uploadService.uploadFile(fileBuffer, fileName)

      if (!result.success) {
        throw new Error(result.error || '文件上传失败')
      }

      return {
        file_id: fileName,
        file_name: result.fileName || fileName,
        file_size: fileBuffer.length,
        file_type: mimeType,
        file_url: result.filePath || '',
        upload_time: new Date().toISOString()
      }
    } catch (error: any) {
      console.error('File upload error:', error)
      throw new Error(error.message || '文件上传失败')
    }
  }

  private setupRealtimeEvents(): void {
    // 监听用户在线状态变化
    userService.on('user:online', (data) => {
      this.broadcastToUsers('user:online', data)
    })

    userService.on('user:offline', (data) => {
      this.broadcastToUsers('user:offline', data)
    })

    // TODO: 重新实现消息相关的实时事件监听
    // 当前消息服务已迁移到插件系统中
  }

  private async routeRequest(request: IPCRequest): Promise<any> {
    const { url, data } = request
    const userId = this.currentUser?.id

    // 认证相关接口
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

    // 用户相关接口
    if (url === '/api/v1/user/detail') {
      return await userService.getUserDetail(userId)
    }
    if (url === '/api/v1/user/update') {
      await userService.updateUser(userId, data)
      return null
    }
    if (url === '/api/v1/user/password/update') {
      await userService.updatePassword(userId, data.old_password, data.new_password)
      return null
    }
    if (url === '/api/v1/user/mobile/update') {
      await userService.updateMobile(userId, data.mobile, data.password, data.sms_code)
      return null
    }
    if (url === '/api/v1/user/email/update') {
      await userService.updateEmail(userId, data.email, data.password, data.code)
      return null
    }
    if (url === '/api/v1/user/setting') {
      const userSettings = await userService.getUserSettings(userId)
      const userDetail = await userService.getUserDetail(userId)
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
          is_qiye: false // 默认值，可以根据需要调整
        },
        settings: userSettings
      }
    }

    // P2P 相关接口 - 现在使用LocalSend实现
    // 直接使用导入的p2pManager，避免循环依赖
    
    // P2P 状态查询
    if (url === '/api/v1/p2p/status') {
      const nodeInfo = p2pManager.getNodeInfo()
      return {
        isRunning: p2pManager.isRunning(),
        peerId: nodeInfo?.peerId || null,
        identity: nodeInfo ? { peerId: nodeInfo.peerId } : null
      }
    }

    // 获取已发现的节点
    if (url === '/api/v1/p2p/peers') {
      const discoveredPeers = await p2pManager.getDiscoveredPeers()
      return discoveredPeers.map((peer: any) => ({
        peerId: peer.fingerprint,
        status: 'discovered',
        addedAt: new Date().toISOString(),
        nickname: peer.alias
      }))
    }

    // 发送P2P消息
    if (url === '/api/v1/p2p/message/send') {
      if (!data.groupId) {
        await p2pManager.sendDirectMessage(data.to, data.content)
      }
      // 群组消息暂时不支持
      return null
    }

    throw new Error(`未知的接口: ${url}`)
  }

  private isPublicEndpoint(url: string): boolean {
    const publicEndpoints = ['/api/v1/auth/login', '/api/v1/auth/register', '/api/v1/auth/forget']
    return publicEndpoints.includes(url)
  }

  private extractToken(headers?: { [key: string]: string }): string | null {
    if (!headers || !headers.Authorization) {
      return null
    }

    const authHeader = headers.Authorization
    if (authHeader.startsWith('Bearer ')) {
      return authHeader.substring(7)
    }

    return null
  }

  private createErrorResponse(id: string, status: number, message: string): IPCResponse {
    return {
      id,
      status,
      code: status,
      message,
      data: null
    }
  }

  private broadcastToUsers(event: string, data: any): void {
    const windows = BrowserWindow.getAllWindows()
    windows.forEach((window) => {
      if (!window.isDestroyed()) {
        window.webContents.send('realtime-event', { event, data })
      }
    })
  }

  /**
   * 处理日志写入请求
   * @param logData 日志数据
   */
  private async handleLogWrite(logData: any): Promise<any> {
    try {
      await loggerService.writeLog(logData)
      return { success: true }
    } catch (error: any) {
      console.error('日志写入失败:', error)
      return { success: false, error: error.message }
    }
  }

  /**
   * 处理获取日志文件列表请求
   */
  private async handleGetLogFiles(): Promise<any> {
    try {
      const files = await loggerService.getLogFiles()
      return { success: true, files }
    } catch (error: any) {
      console.error('获取日志文件列表失败:', error)
      return { success: false, error: error.message }
    }
  }

  /**
   * 处理读取日志文件请求
   * @param fileName 文件名
   * @param lines 读取行数
   */
  private async handleReadLogFile(fileName: string, lines: number = 100): Promise<any> {
    try {
      const content = await loggerService.readLogFile(fileName, lines)
      return { success: true, content }
    } catch (error: any) {
      console.error('读取日志文件失败:', error)
      return { success: false, error: error.message }
    }
  }
}

export const ipcHandler = new IPCHandler()
