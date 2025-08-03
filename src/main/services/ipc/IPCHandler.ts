import { ipcMain, BrowserWindow } from 'electron'
import { authService } from '../auth/AuthService'
import { userService } from '../user/UserService'
import { contactService } from '../contact/ContactService'
import { groupService } from '../group/GroupService'
import { chatService } from '../chat/ChatService'
import { uploadService } from '../upload/UploadService'
import { articleService } from '../article/ArticleService'
import { serviceManager } from '../index'

export interface IPCRequest {
  id: string
  method: string
  url: string
  data?: any
  headers?: { [key: string]: string }
}

export interface IPCResponse {
  id: string
  status: number
  code: number
  message: string
  data?: any
}

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
      const result = await uploadService.uploadFile(fileBuffer, fileName, mimeType, user.id)
      
      return {
        file_id: result.file_id,
        file_name: result.file_name,
        file_size: result.file_size,
        file_type: result.file_type,
        file_url: result.file_url,
        upload_time: result.upload_time
      }
    } catch (error: any) {
      console.error('File upload error:', error)
      throw new Error(error.message || '文件上传失败')
    }
  }

  private setupRealtimeEvents(): void {
    // 监听新消息事件
    chatService.on('message:new', (message) => {
      this.broadcastToUsers('message:new', message)
    })

    // 监听消息撤回事件
    chatService.on('message:revoke', (data) => {
      this.broadcastToUsers('message:revoke', data)
    })

    // 监听用户在线状态变化
    userService.on('user:online', (data) => {
      this.broadcastToUsers('user:online', data)
    })

    userService.on('user:offline', (data) => {
      this.broadcastToUsers('user:offline', data)
    })
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

    // 联系人相关接口
    if (url === '/api/v1/contact/list') {
      return await contactService.getContactList(userId)
    }
    if (url === '/api/v1/contact/search') {
      return await userService.searchUsers(data.mobile)
    }
    if (url === '/api/v1/contact/detail') {
      return await contactService.getContactDetail(userId, data.user_id)
    }
    if (url === '/api/v1/contact/delete') {
      await contactService.deleteContact(userId, data.user_id)
      return null
    }
    if (url === '/api/v1/contact/edit-remark') {
      await contactService.updateContactRemark(userId, data.user_id, data.remark)
      return null
    }
    if (url === '/api/v1/contact/apply/create') {
      await contactService.createContactApply(userId, data.user_id, data.remark)
      return null
    }
    if (url === '/api/v1/contact/apply/records') {
      return await contactService.getContactApplyList(userId)
    }
    if (url === '/api/v1/contact/apply/accept') {
      await contactService.handleContactApply(userId, data.apply_id, 'accept', data.remark)
      return null
    }
    if (url === '/api/v1/contact/apply/decline') {
      await contactService.handleContactApply(userId, data.apply_id, 'reject', data.remark)
      return null
    }
    if (url === '/api/v1/contact/apply/unread-num') {
      const applyList = await contactService.getContactApplyList(userId)
      return { unread_num: applyList.filter(item => item.status === 'pending').length }
    }
    if (url === '/api/v1/contact/group/list') {
      return await contactService.getContactGroups(userId)
    }
    if (url === '/api/v1/contact/move-group') {
      await contactService.moveContactToGroup(userId, { friend_id: data.user_id, group_id: data.group_id })
      return null
    }
    if (url === '/api/v1/contact/group/update') {
      // 批量更新联系人分组
      for (const item of data.items) {
        if (item.id === 0) continue // 跳过默认分组
        if (item.name) {
          await contactService.updateContactGroup(userId, item.id, { name: item.name, sort: item.sort || 0 })
        }
      }
      return null
    }
    if (url === '/api/v1/contact/online-status') {
      return await userService.getOnlineStatus(data.user_id)
    }

    // 群组相关接口
    if (url === '/api/v1/group/list') {
      return await groupService.getGroupList(userId)
    }
    if (url === '/api/v1/group/detail') {
      return await groupService.getGroupDetail(userId, data.group_id)
    }
    if (url === '/api/v1/group/create') {
      return await groupService.createGroup(userId, data)
    }
    if (url === '/api/v1/group/update') {
      await groupService.updateGroup(userId, data.group_id, data)
      return null
    }
    if (url === '/api/v1/group/invite') {
      await groupService.inviteMembers(userId, data.group_id, { user_ids: data.user_ids })
      return null
    }
    if (url === '/api/v1/group/member/remove') {
      await groupService.removeMembers(userId, data.group_id, { user_ids: [data.user_id] })
      return null
    }
    if (url === '/api/v1/group/dismiss') {
      await groupService.dismissGroup(userId, data.group_id)
      return null
    }
    if (url === '/api/v1/group/secede') {
      await groupService.leaveGroup(userId, data.group_id)
      return null
    }
    if (url === '/api/v1/group/member/list') {
      const groupDetail = await groupService.getGroupDetail(userId, data.group_id)
      return groupDetail.members
    }
    if (url === '/api/v1/group/apply/unread') {
      // 获取未读的群组申请数量
      return { unread_num: 0 } // 暂时返回0，后续可以实现具体逻辑
    }
    if (url === '/api/v1/group/apply/all') {
      // 获取所有群组申请记录
      return [] // 暂时返回空数组，后续可以实现具体逻辑
    }
    if (url === '/api/v1/group/overt-list') {
      // 获取公开群组列表
      return await groupService.searchGroups(data.keyword || '', data.limit || 20)
    }

    // 聊天相关接口
    if (url === '/api/v1/talk/list') {
      const items = await chatService.getTalkList(userId)
      return { items }
    }
    if (url === '/api/v1/talk/create') {
      await chatService.createTalk(userId, data.talk_mode, data.to_from_id)
      return null
    }
    if (url === '/api/v1/talk/delete') {
      await chatService.deleteTalk(userId, data.talk_mode, data.to_from_id)
      return null
    }
    if (url === '/api/v1/talk/topping') {
      await chatService.toggleTalkTop(userId, data.talk_mode, data.to_from_id, data.action)
      return null
    }
    if (url === '/api/v1/talk/disturb') {
      await chatService.toggleTalkDisturb(userId, data.talk_mode, data.to_from_id, data.action)
      return null
    }
    if (url === '/api/v1/talk/clear-unread') {
      await chatService.clearUnread(userId, data.talk_mode, data.to_from_id)
      return null
    }
    if (url === '/api/v1/talk/records') {
      return await chatService.getTalkRecords(userId, data)
    }
    if (url === '/api/v1/talk/history-records') {
      return await chatService.searchHistoryRecords(userId, data.keyword, data.talk_mode, data.to_from_id)
    }
    if (url === '/api/v1/talk/forward-records') {
      return await chatService.getForwardRecords(data.msg_ids)
    }
    if (url === '/api/v1/talk/message/send') {
      return await chatService.sendMessage(userId, data)
    }
    if (url === '/api/v1/talk/message/revoke') {
      await chatService.revokeMessage(userId, data.talk_mode, data.to_from_id, data.msg_id)
      return null
    }
    if (url === '/api/v1/talk/message/delete') {
      await chatService.deleteMessage(userId, data.talk_mode, data.to_from_id, data.msg_ids)
      return null
    }

    // 文件上传相关接口
    if (url === '/api/v1/upload/file') {
      // 文件上传通过单独的处理方法
      throw new Error('文件上传请使用 upload-file 事件')
    }

    // 文章相关接口
    if (url === '/api/v1/article/list') {
      return await articleService.getArticleList(userId, data)
    }
    if (url === '/api/v1/article/detail') {
      return await articleService.getArticleDetail(userId, data.article_id)
    }
    if (url === '/api/v1/article/editor') {
      return await articleService.saveArticle(userId, data)
    }
    if (url === '/api/v1/article/delete') {
      await articleService.deleteArticle(userId, data.article_id)
      return null
    }
    if (url === '/api/v1/article/forever-delete') {
      await articleService.foreverDeleteArticle(userId, data.article_id)
      return null
    }
    if (url === '/api/v1/article/recycle-list') {
      return await articleService.getRecycleList(userId)
    }
    if (url === '/api/v1/article/recover-delete') {
      await articleService.recoverArticle(userId, data.article_id)
      return null
    }
    if (url === '/api/v1/article/collect') {
      return await articleService.toggleCollect(userId, data.article_id)
    }
    if (url === '/api/v1/article/move-classify') {
      await articleService.moveToClassify(userId, data.article_id, data.classify_id)
      return null
    }

    // 文章分类相关接口
    if (url === '/api/v1/article/classify/list') {
      return await articleService.getClassifyList(userId)
    }
    if (url === '/api/v1/article/classify/create') {
      return await articleService.createClassify(userId, data)
    }
    if (url === '/api/v1/article/classify/update') {
      await articleService.updateClassify(userId, data.classify_id, data)
      return null
    }
    if (url === '/api/v1/article/classify/delete') {
      await articleService.deleteClassify(userId, data.classify_id)
      return null
    }

    // 文章标签相关接口
    if (url === '/api/v1/article/tag/list') {
      return await articleService.getTagList(userId)
    }
    if (url === '/api/v1/article/tag/create') {
      return await articleService.createTag(userId, data)
    }
    if (url === '/api/v1/article/tag/update') {
      await articleService.updateTag(userId, data.tag_id, data)
      return null
    }
    if (url === '/api/v1/article/tag/delete') {
      await articleService.deleteTag(userId, data.tag_id)
      return null
    }

    // P2P 相关接口
    const p2pServiceClient = serviceManager.getP2PServiceClient()
    if (p2pServiceClient) {
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
        return connectedPeers.map(peerId => ({
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
        // 群组消息暂时不支持
        return null
      }

      // 其他P2P功能暂时返回空实现
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
        // 暂时返回成功，实际功能待实现
        return null
      }

      if (url === '/api/v1/p2p/contact/list') {
        // 暂时返回空列表
        return []
      }

      if (url === '/api/v1/p2p/message/history') {
        // 暂时返回空历史
        return []
      }

      if (url === '/api/v1/p2p/peer/connect') {
        // 暂时返回成功，实际连接功能待实现
        return null
      }

      if (url === '/api/v1/p2p/peer/disconnect') {
        // 暂时返回成功，实际断开功能待实现
        return null
      }
    }

    throw new Error(`未知的接口: ${url}`)
  }

  private isPublicEndpoint(url: string): boolean {
    const publicEndpoints = [
      '/api/v1/auth/login',
      '/api/v1/auth/register',
      '/api/v1/auth/forget'
    ]
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
    windows.forEach(window => {
      if (!window.isDestroyed()) {
        window.webContents.send('realtime-event', { event, data })
      }
    })
  }
}

export const ipcHandler = new IPCHandler()