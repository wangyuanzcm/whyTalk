import { EventEmitter } from 'events'

export interface LocalSendPeer {
  ip: string
  port: number
  alias: string
  version: string
  deviceModel: string
  deviceType: string
  fingerprint: string
  protocol: 'http' | 'https'
  lastSeen: number
  download: boolean
  announce: boolean
}

export interface LocalSendMessage {
  id: string
  from: string
  to?: string
  type: 'text' | 'file' | 'image' | 'screenshot'
  content: string
  timestamp: number
  files?: LocalSendFile[]
  groupId?: string
}

export interface LocalSendFile {
  id: string
  fileName: string
  size: number
  fileType: string
  sha256?: string
  preview?: string
  legacy?: boolean
}

export interface TempGroup {
  id: string
  name: string
  members: LocalSendPeer[]
  createdAt: number
  createdBy: string
}

export interface SendFileRequest {
  targetFingerprint: string
  filePath: string
  fileName?: string
  groupId?: string
}

export interface SendMessageRequest {
  targetFingerprint: string
  content: string
  type?: 'text' | 'image' | 'screenshot'
  groupId?: string
}

/**
 * LocalSend服务类
 * 提供基于LocalSend协议的消息传输、文件传输、截屏等功能
 */
export class LocalSendService extends EventEmitter {
  private pluginId: string
  private isStarted = false
  private peers: Map<string, LocalSendPeer> = new Map()
  private tempGroups: Map<string, TempGroup> = new Map()
  private messageHistory: Map<string, LocalSendMessage[]> = new Map()

  constructor(pluginId: string) {
    super()
    this.pluginId = pluginId
    this.initializeEventListeners()
  }

  private initializeEventListeners() {
    // 监听LocalSend相关事件
    if (window.electronAPI && window.electronAPI.on) {
      // P2P服务状态事件
      window.electronAPI.on('p2p:status-changed', (status: any) => {
        this.isStarted = status.isStarted
        this.emit('service:status-changed', status)
      })

      // 设备发现事件
      window.electronAPI.on('p2p:peer-discovered', (peer: LocalSendPeer) => {
        this.peers.set(peer.fingerprint, peer)
        this.emit('peer:discovered', peer)
      })

      // 设备丢失事件
      window.electronAPI.on('p2p:peer-lost', (peer: LocalSendPeer) => {
        this.peers.delete(peer.fingerprint)
        this.emit('peer:lost', peer)
      })

      // 消息接收事件
      window.electronAPI.on('p2p:message-received', (message: LocalSendMessage) => {
        this.handleReceivedMessage(message)
      })

      // 文件接收事件
      window.electronAPI.on('p2p:file-received', (fileData: any) => {
        this.emit('file:received', fileData)
      })
    }
  }

  /**
   * 启动LocalSend服务
   */
  public async startService(): Promise<boolean> {
    try {
      const result = await window.electronAPI.invoke('p2p:start')
      if (result.success) {
        this.isStarted = true
        await this.refreshPeers()
        this.emit('service:started')
        return true
      } else {
        console.error('启动LocalSend服务失败:', result.error)
        return false
      }
    } catch (error) {
      console.error('启动LocalSend服务异常:', error)
      return false
    }
  }

  /**
   * 停止LocalSend服务
   */
  public async stopService(): Promise<boolean> {
    try {
      const result = await window.electronAPI.invoke('p2p:stop')
      if (result.success) {
        this.isStarted = false
        this.peers.clear()
        this.emit('service:stopped')
        return true
      } else {
        console.error('停止LocalSend服务失败:', result.error)
        return false
      }
    } catch (error) {
      console.error('停止LocalSend服务异常:', error)
      return false
    }
  }

  /**
   * 获取服务状态
   */
  public async getServiceStatus(): Promise<any> {
    try {
      const result = await window.electronAPI.invoke('p2p:status')
      if (result.success) {
        this.isStarted = result.data.isStarted
        return result.data
      }
      return null
    } catch (error) {
      console.error('获取服务状态失败:', error)
      return null
    }
  }

  /**
   * 刷新发现的设备列表
   */
  public async refreshPeers(): Promise<LocalSendPeer[]> {
    try {
      const result = await window.electronAPI.invoke('p2p:getDiscoveredPeers')
      if (result.success) {
        this.peers.clear()
        result.data.forEach((peer: LocalSendPeer) => {
          this.peers.set(peer.fingerprint, peer)
        })
        return result.data
      }
      return []
    } catch (error) {
      console.error('刷新设备列表失败:', error)
      return []
    }
  }

  /**
   * 获取已发现的设备列表
   */
  public getDiscoveredPeers(): LocalSendPeer[] {
    return Array.from(this.peers.values())
  }

  /**
   * 发送文本消息
   */
  public async sendMessage(request: SendMessageRequest): Promise<boolean> {
    try {
      if (request.groupId) {
        // 群组消息
        return await this.sendGroupMessage(request.groupId, request.content, request.type)
      } else {
        // 点对点消息
        const result = await window.electronAPI.invoke('p2p:sendMessage', {
          to: request.targetFingerprint,
          content: request.content,
          type: request.type || 'text'
        })
        
        if (result.success) {
          const message: LocalSendMessage = {
            id: result.data.id,
            from: 'self',
            to: request.targetFingerprint,
            type: request.type || 'text',
            content: request.content,
            timestamp: Date.now(),
            groupId: request.groupId
          }
          this.addToHistory(request.targetFingerprint, message)
          this.emit('message:sent', message)
          return true
        }
        return false
      }
    } catch (error) {
      console.error('发送消息失败:', error)
      return false
    }
  }

  /**
   * 发送文件
   */
  public async sendFile(request: SendFileRequest): Promise<boolean> {
    try {
      if (request.groupId) {
        // 群组文件发送
        return await this.sendGroupFile(request.groupId, request.filePath, request.fileName)
      } else {
        // 点对点文件发送
        const result = await window.electronAPI.invoke('p2p:sendFile', {
          to: request.targetFingerprint,
          filePath: request.filePath,
          fileName: request.fileName
        })
        
        if (result.success) {
          const message: LocalSendMessage = {
            id: result.data.id,
            from: 'self',
            to: request.targetFingerprint,
            type: 'file',
            content: `文件: ${request.fileName || request.filePath}`,
            timestamp: Date.now(),
            files: [{
              id: result.data.fileId,
              fileName: request.fileName || request.filePath,
              size: result.data.size || 0,
              fileType: request.filePath.split('.').pop() || 'unknown'
            }]
          }
          this.addToHistory(request.targetFingerprint, message)
          this.emit('file:sent', message)
          return true
        }
        return false
      }
    } catch (error) {
      console.error('发送文件失败:', error)
      return false
    }
  }

  /**
   * 截屏并发送
   */
  public async captureAndSendScreenshot(targetFingerprint: string, groupId?: string): Promise<boolean> {
    try {
      // 调用截屏功能
      const screenshotResult = await window.electronAPI.invoke('screen:capture')
      if (!screenshotResult.success) {
        console.error('截屏失败:', screenshotResult.error)
        return false
      }

      const screenshotPath = screenshotResult.data.filePath
      
      if (groupId) {
        // 群组截屏发送
        return await this.sendGroupFile(groupId, screenshotPath, '截屏.png')
      } else {
        // 点对点截屏发送
        const result = await window.electronAPI.invoke('p2p:sendFile', {
          to: targetFingerprint,
          filePath: screenshotPath,
          fileName: '截屏.png'
        })
        
        if (result.success) {
          const message: LocalSendMessage = {
            id: result.data.id,
            from: 'self',
            to: targetFingerprint,
            type: 'screenshot',
            content: '发送了一张截屏',
            timestamp: Date.now(),
            files: [{
              id: result.data.fileId,
              fileName: '截屏.png',
              size: result.data.size || 0,
              fileType: 'png'
            }]
          }
          this.addToHistory(targetFingerprint, message)
          this.emit('screenshot:sent', message)
          return true
        }
        return false
      }
    } catch (error) {
      console.error('截屏发送失败:', error)
      return false
    }
  }

  /**
   * 创建临时群组
   */
  public createTempGroup(name: string, memberFingerprints: string[]): string {
    const groupId = `temp_group_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const members = memberFingerprints
      .map(fp => this.peers.get(fp))
      .filter(peer => peer !== undefined) as LocalSendPeer[]
    
    const group: TempGroup = {
      id: groupId,
      name,
      members,
      createdAt: Date.now(),
      createdBy: 'self'
    }
    
    this.tempGroups.set(groupId, group)
    this.emit('group:created', group)
    return groupId
  }

  /**
   * 添加成员到临时群组
   */
  public addMemberToTempGroup(groupId: string, fingerprint: string): boolean {
    const group = this.tempGroups.get(groupId)
    const peer = this.peers.get(fingerprint)
    
    if (group && peer) {
      if (!group.members.find(m => m.fingerprint === fingerprint)) {
        group.members.push(peer)
        this.emit('group:member-added', { groupId, member: peer })
        return true
      }
    }
    return false
  }

  /**
   * 从临时群组移除成员
   */
  public removeMemberFromTempGroup(groupId: string, fingerprint: string): boolean {
    const group = this.tempGroups.get(groupId)
    
    if (group) {
      const index = group.members.findIndex(m => m.fingerprint === fingerprint)
      if (index !== -1) {
        const removedMember = group.members.splice(index, 1)[0]
        this.emit('group:member-removed', { groupId, member: removedMember })
        return true
      }
    }
    return false
  }

  /**
   * 删除临时群组
   */
  public deleteTempGroup(groupId: string): boolean {
    if (this.tempGroups.has(groupId)) {
      this.tempGroups.delete(groupId)
      this.messageHistory.delete(groupId)
      this.emit('group:deleted', groupId)
      return true
    }
    return false
  }

  /**
   * 获取临时群组列表
   */
  public getTempGroups(): TempGroup[] {
    return Array.from(this.tempGroups.values())
  }

  /**
   * 获取临时群组信息
   */
  public getTempGroup(groupId: string): TempGroup | undefined {
    return this.tempGroups.get(groupId)
  }

  /**
   * 发送群组消息
   */
  private async sendGroupMessage(groupId: string, content: string, type: string = 'text'): Promise<boolean> {
    const group = this.tempGroups.get(groupId)
    if (!group) {
      console.error('群组不存在:', groupId)
      return false
    }

    let successCount = 0
    const promises = group.members.map(async (member) => {
      try {
        const result = await window.electronAPI.invoke('p2p:sendMessage', {
          to: member.fingerprint,
          content: `[群组: ${group.name}] ${content}`,
          type
        })
        if (result.success) {
          successCount++
        }
        return result.success
      } catch (error) {
        console.error(`发送群组消息到 ${member.alias} 失败:`, error)
        return false
      }
    })

    await Promise.all(promises)
    
    if (successCount > 0) {
      const message: LocalSendMessage = {
        id: `group_msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        from: 'self',
        type: type as any,
        content,
        timestamp: Date.now(),
        groupId
      }
      this.addToHistory(groupId, message)
      this.emit('group:message-sent', message)
      return true
    }
    
    return false
  }

  /**
   * 发送群组文件
   */
  private async sendGroupFile(groupId: string, filePath: string, fileName?: string): Promise<boolean> {
    const group = this.tempGroups.get(groupId)
    if (!group) {
      console.error('群组不存在:', groupId)
      return false
    }

    let successCount = 0
    const promises = group.members.map(async (member) => {
      try {
        const result = await window.electronAPI.invoke('p2p:sendFile', {
          to: member.fingerprint,
          filePath,
          fileName: fileName || filePath
        })
        if (result.success) {
          successCount++
        }
        return result.success
      } catch (error) {
        console.error(`发送群组文件到 ${member.alias} 失败:`, error)
        return false
      }
    })

    await Promise.all(promises)
    
    if (successCount > 0) {
      const message: LocalSendMessage = {
        id: `group_file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        from: 'self',
        type: 'file',
        content: `文件: ${fileName || filePath}`,
        timestamp: Date.now(),
        groupId,
        files: [{
          id: `file_${Date.now()}`,
          fileName: fileName || filePath,
          size: 0,
          fileType: filePath.split('.').pop() || 'unknown'
        }]
      }
      this.addToHistory(groupId, message)
      this.emit('group:file-sent', message)
      return true
    }
    
    return false
  }

  /**
   * 处理接收到的消息
   */
  private handleReceivedMessage(message: LocalSendMessage): void {
    // 检查是否是群组消息
    if (message.content.startsWith('[群组:')) {
      const groupMatch = message.content.match(/\[群组: (.+?)\] (.+)/)
      if (groupMatch) {
        const groupName = groupMatch[1]
        const actualContent = groupMatch[2]
        
        // 查找对应的群组
        const group = Array.from(this.tempGroups.values()).find(g => g.name === groupName)
        if (group) {
          message.groupId = group.id
          message.content = actualContent
          this.addToHistory(group.id, message)
          this.emit('group:message-received', message)
        } else {
          // 如果找不到群组，作为普通消息处理
          this.addToHistory(message.from, message)
          this.emit('message:received', message)
        }
      }
    } else {
      // 普通点对点消息
      this.addToHistory(message.from, message)
      this.emit('message:received', message)
    }
  }

  /**
   * 添加消息到历史记录
   */
  private addToHistory(key: string, message: LocalSendMessage): void {
    if (!this.messageHistory.has(key)) {
      this.messageHistory.set(key, [])
    }
    const history = this.messageHistory.get(key)!
    history.push(message)
    
    // 限制历史记录数量
    if (history.length > 1000) {
      history.splice(0, history.length - 1000)
    }
  }

  /**
   * 获取消息历史记录
   */
  public getMessageHistory(key: string): LocalSendMessage[] {
    return this.messageHistory.get(key) || []
  }

  /**
   * 清空消息历史记录
   */
  public clearMessageHistory(key?: string): void {
    if (key) {
      this.messageHistory.delete(key)
    } else {
      this.messageHistory.clear()
    }
  }

  /**
   * 获取服务状态
   */
  public isServiceStarted(): boolean {
    return this.isStarted
  }

  /**
   * 添加联系人（设备）
   */
  public async addContact(fingerprint: string, alias?: string): Promise<boolean> {
    try {
      // 这里可以实现联系人管理逻辑
      const peer = this.peers.get(fingerprint)
      if (peer) {
        if (alias) {
          peer.alias = alias
        }
        this.emit('contact:added', peer)
        return true
      }
      return false
    } catch (error) {
      console.error('添加联系人失败:', error)
      return false
    }
  }

  /**
   * 移除联系人
   */
  public async removeContact(fingerprint: string): Promise<boolean> {
    try {
      const peer = this.peers.get(fingerprint)
      if (peer) {
        this.emit('contact:removed', peer)
        return true
      }
      return false
    } catch (error) {
      console.error('移除联系人失败:', error)
      return false
    }
  }
}

export const localSendService = new LocalSendService('message-plugin')