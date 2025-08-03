import { useTalkStore, useUserStore } from '@/store'
import { notifyIcon } from '@/constant/default'
import { NAvatar } from 'naive-ui'
import { h } from 'vue'
import { isLogin } from '@/utils/auth'

// 简单的EventEmitter实现，用于浏览器环境
class SimpleEventEmitter {
  private events: { [key: string]: Function[] } = {}

  on(event: string, listener: Function): void {
    if (!this.events[event]) {
      this.events[event] = []
    }
    this.events[event].push(listener)
  }

  emit(event: string, ...args: any[]): void {
    if (this.events[event]) {
      this.events[event].forEach(listener => listener(...args))
    }
  }

  off(event: string, listener: Function): void {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter(l => l !== listener)
    }
  }

  removeAllListeners(event?: string): void {
    if (event) {
      delete this.events[event]
    } else {
      this.events = {}
    }
  }
}

// P2P消息类型定义
interface P2PMessage {
  id: string
  type: 'direct' | 'group'
  from: string
  to?: string
  groupId?: string
  content: any
  timestamp: number
  signature?: string
}



interface P2PNetworkStatus {
  isOnline: boolean
  connectedPeers: number
  networkHealth: 'good' | 'poor' | 'offline'
  lastSyncTime: number
}

class P2PConnect extends SimpleEventEmitter {
  private isConnected = false
  private networkStatus: P2PNetworkStatus = {
    isOnline: false,
    connectedPeers: 0,
    networkHealth: 'offline',
    lastSyncTime: 0
  }
  private heartbeatInterval: NodeJS.Timeout | null = null
  private syncInterval: NodeJS.Timeout | null = null

  constructor() {
    super()
    this.bindEvents()
  }

  // 连接到P2P网络
  async connect(): Promise<void> {
    try {
      console.log('Starting P2P connection...')
      
      // 通过IPC启动P2P服务
      const result = await window.electron.ipcRenderer.invoke('p2p:start')
      if (result.success) {
        this.isConnected = true
        this.networkStatus.isOnline = true
        this.networkStatus.networkHealth = 'good'
        this.networkStatus.lastSyncTime = Date.now()
        
        // 更新用户在线状态
        useUserStore().updateSocketStatus(true)
        
        // 只有在用户已登录时才加载对话列表
        if (isLogin()) {
          useTalkStore().loadTalkList()
        }
        
        // 启动心跳和同步
        this.startHeartbeat()
        this.startSync()
        
        console.log('P2P connection established')
        this.emit('network:status', this.networkStatus)
      } else {
        throw new Error(result.error || 'Failed to start P2P service')
      }
    } catch (error) {
      console.error('Failed to connect to P2P network:', error)
      this.handleConnectionError(error)
    }
  }

  // 断开P2P连接
  async disconnect(): Promise<void> {
    try {
      if (this.heartbeatInterval) {
        clearInterval(this.heartbeatInterval)
        this.heartbeatInterval = null
      }
      
      if (this.syncInterval) {
        clearInterval(this.syncInterval)
        this.syncInterval = null
      }
      
      await window.electron.ipcRenderer.invoke('p2p:stop')
      
      this.isConnected = false
      this.networkStatus.isOnline = false
      this.networkStatus.networkHealth = 'offline'
      this.networkStatus.connectedPeers = 0
      
      useUserStore().updateSocketStatus(false)
      
      console.log('P2P connection closed')
      this.emit('network:status', this.networkStatus)
    } catch (error) {
      console.error('Failed to disconnect from P2P network:', error)
    }
  }

  // 检查连接状态
  isConnect(): boolean {
    return this.isConnected && this.networkStatus.isOnline
  }

  // 获取网络状态
  getNetworkStatus(): P2PNetworkStatus {
    return { ...this.networkStatus }
  }

  // 发送P2P消息
  async sendMessage(targetPeerId: string, content: any, type: 'text' | 'image' | 'file' = 'text'): Promise<void> {
    if (!this.isConnected) {
      throw new Error('P2P network not connected')
    }

    try {
      const message: P2PMessage = {
        id: this.generateMessageId(),
        type: 'direct',
        from: await this.getLocalPeerId(),
        to: targetPeerId,
        content: {
          type,
          data: content
        },
        timestamp: Date.now()
      }

      await window.electron.ipcRenderer.invoke('p2p:sendDirectMessage', {
        targetPeerId,
        message
      })

      console.log('P2P message sent:', message.id)
    } catch (error) {
      console.error('Failed to send P2P message:', error)
      throw error
    }
  }

  // 发送群组消息
  async sendGroupMessage(groupId: string, content: any, type: 'text' | 'image' | 'file' = 'text'): Promise<void> {
    if (!this.isConnected) {
      throw new Error('P2P network not connected')
    }

    try {
      const message: P2PMessage = {
        id: this.generateMessageId(),
        type: 'group',
        from: await this.getLocalPeerId(),
        groupId,
        content: {
          type,
          data: content
        },
        timestamp: Date.now()
      }

      await window.electron.ipcRenderer.invoke('p2p:sendGroupMessage', {
        groupId,
        message
      })

      console.log('P2P group message sent:', message.id)
    } catch (error) {
      console.error('Failed to send P2P group message:', error)
      throw error
    }
  }

  // 发送输入状态
  async sendTypingStatus(params: { to_from_id: number; talk_mode: number }): Promise<void> {
    try {
      if (params.talk_mode === 2) {
        // 群组输入状态
        await this.sendGroupMessage(params.to_from_id.toString(), {
          typing: true
        }, 'text')
      } else {
        // 直接消息输入状态
        await this.sendMessage(params.to_from_id.toString(), {
          typing: true
        }, 'text')
      }
    } catch (error) {
      console.error('发送输入状态失败:', error)
    }
  }

  // 添加P2P联系人
  async addContact(peerId: string, nickname?: string, remark?: string): Promise<void> {
    try {
      await window.electron.ipcRenderer.invoke('p2p:addContact', {
        peerId,
        nickname,
        remark
      })
      console.log('P2P contact added:', peerId)
    } catch (error) {
      console.error('Failed to add P2P contact:', error)
      throw error
    }
  }

  // 获取P2P联系人列表
  async getContacts(): Promise<any[]> {
    try {
      const result = await window.electron.ipcRenderer.invoke('p2p:getContacts')
      return result.contacts || []
    } catch (error) {
      console.error('Failed to get P2P contacts:', error)
      return []
    }
  }

  // 获取已发现的节点
  async getDiscoveredPeers(): Promise<any[]> {
    try {
      const result = await window.electron.ipcRenderer.invoke('p2p:getDiscoveredPeers')
      return result.peers || []
    } catch (error) {
      console.error('Failed to get discovered peers:', error)
      return []
    }
  }

  // 获取本地节点ID
  private async getLocalPeerId(): Promise<string> {
    try {
      const result = await window.electron.ipcRenderer.invoke('p2p:getStatus')
      return result.peerId || ''
    } catch (error) {
      console.error('Failed to get local peer ID:', error)
      return ''
    }
  }

  // 生成消息ID
  private generateMessageId(): string {
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  // 启动心跳检测
  private startHeartbeat(): void {
    this.heartbeatInterval = setInterval(async () => {
      try {
        const status = await window.electron.ipcRenderer.invoke('p2p:getStatus')
        if (status.isRunning) {
          this.networkStatus.isOnline = true
          this.networkStatus.networkHealth = 'good'
          
          // 获取连接的节点数量
          const peers = await this.getDiscoveredPeers()
          this.networkStatus.connectedPeers = peers.length
        } else {
          this.networkStatus.isOnline = false
          this.networkStatus.networkHealth = 'offline'
          this.networkStatus.connectedPeers = 0
        }
        
        this.emit('network:status', this.networkStatus)
      } catch (error) {
        console.error('Heartbeat failed:', error)
        this.handleConnectionError(error)
      }
    }, 10000) // 每10秒检查一次
  }

  // 启动数据同步
  private startSync(): void {
    this.syncInterval = setInterval(async () => {
      try {
        // 同步联系人数据
        await this.syncContacts()
        
        // 同步消息数据
        await this.syncMessages()
        
        this.networkStatus.lastSyncTime = Date.now()
        this.emit('network:status', this.networkStatus)
      } catch (error) {
        console.error('Sync failed:', error)
      }
    }, 30000) // 每30秒同步一次
  }

  // 同步联系人
  private async syncContacts(): Promise<void> {
    try {
      // 获取本地联系人变更
      const localChanges = await window.electron.ipcRenderer.invoke('p2p:getContactChanges')
      
      // 广播联系人变更
      if (localChanges.length > 0) {
        await window.electron.ipcRenderer.invoke('p2p:broadcastContactChanges', localChanges)
      }
    } catch (error) {
      console.error('Failed to sync contacts:', error)
    }
  }

  // 同步消息
  private async syncMessages(): Promise<void> {
    try {
      // 获取未同步的消息
      const result = await window.electron.ipcRenderer.invoke('p2p:getUnsyncedMessages')
      const unsyncedMessages = Array.isArray(result) ? result : (result?.messages || [])
      
      // 重试发送失败的消息
      for (const message of unsyncedMessages) {
        try {
          if (message.type === 'direct') {
            await this.sendMessage(message.to, message.content.data, message.content.type)
          } else if (message.type === 'group') {
            await this.sendGroupMessage(message.groupId, message.content.data, message.content.type)
          }
        } catch (error) {
          console.error('Failed to resend message:', message.id, error)
        }
      }
    } catch (error) {
      console.error('Failed to sync messages:', error)
    }
  }

  // 绑定P2P事件
  private bindEvents(): void {
    // 检查electron API是否存在
    if (!window.electron || !window.electron.ipcRenderer) {
      console.warn('electron API not available, P2P events will not be bound')
      return
    }

    // 监听P2P消息
    window.electron.ipcRenderer.on('p2p:messageReceived', (_event: any, message: P2PMessage) => {
      this.handleReceivedMessage(message)
    })

    // 监听联系人请求
    window.electron.ipcRenderer.on('p2p:contactRequest', (_event: any, request: any) => {
      this.handleContactRequest(request)
    })

    // 监听群组邀请
    window.electron.ipcRenderer.on('p2p:groupInvite', (_event: any, invite: any) => {
      this.handleGroupInvite(invite)
    })

    // 监听节点连接/断开
    window.electron.ipcRenderer.on('p2p:peerConnected', (_event: any, peerId: string) => {
      console.log('Peer connected:', peerId)
      this.emit('peer:connected', peerId)
    })

    window.electron.ipcRenderer.on('p2p:peerDisconnected', (_event: any, peerId: string) => {
      console.log('Peer disconnected:', peerId)
      this.emit('peer:disconnected', peerId)
    })
  }

  // 处理接收到的消息
  private handleReceivedMessage(message: P2PMessage): void {
    console.log('P2P message received:', message)
    
    // 触发消息事件（类似原来的WebSocket消息）
    this.emit('message:received', message)
    
    // 只有在用户已登录时才更新对话列表
    if (isLogin()) {
      useTalkStore().loadTalkList()
    }
  }

  // 处理联系人请求
  private handleContactRequest(request: any): void {
    console.log('Contact request received:', request)
    
    window['$notification']?.create({
      title: '好友申请通知',
      content: request.message || '请求添加您为好友',
      description: `申请人: ${request.nickname || request.peerId}`,
      meta: new Date().toLocaleString(),
      avatar: () =>
        h(NAvatar, {
          size: 'small',
          round: true,
          src: notifyIcon,
          style: 'background-color:#fff;'
        }),
      duration: 10000
    })

    useUserStore().isContactApply = true
  }

  // 处理群组邀请
  private handleGroupInvite(invite: any): void {
    console.log('Group invite received:', invite)
    
    window['$notification']?.create({
      title: '群组邀请通知',
      content: `邀请您加入群组: ${invite.groupName}`,
      description: `邀请人: ${invite.inviterNickname || invite.inviterPeerId}`,
      meta: new Date().toLocaleString(),
      avatar: () =>
        h(NAvatar, {
          size: 'small',
          round: true,
          src: notifyIcon,
          style: 'background-color:#fff;'
        }),
      duration: 10000
    })

    useUserStore().isGroupApply = true
  }

  // 处理连接错误
  private handleConnectionError(error: any): void {
    console.error('P2P connection error:', error)
    
    this.networkStatus.isOnline = false
    this.networkStatus.networkHealth = 'poor'
    
    useUserStore().updateSocketStatus(false)
    
    // 尝试重连
    setTimeout(() => {
      if (!this.isConnected) {
        console.log('Attempting to reconnect to P2P network...')
        this.connect().catch(err => {
          console.error('Reconnection failed:', err)
        })
      }
    }, 5000)
  }
}

// 导出单例
export default new P2PConnect()