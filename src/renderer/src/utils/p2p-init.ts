/**
 * P2P初始化工具
 * 负责在应用启动时初始化P2P服务
 */

import p2pConnect from '@/p2p/P2PConnect'

import { useP2PStore } from '@/store/modules/p2p'

export class P2PInitializer {
  private static instance: P2PInitializer
  private isInitialized = false
  private initPromise: Promise<boolean> | null = null

  static getInstance(): P2PInitializer {
    if (!P2PInitializer.instance) {
      P2PInitializer.instance = new P2PInitializer()
    }
    return P2PInitializer.instance
  }

  /**
   * 初始化P2P服务
   */
  async initialize(): Promise<boolean> {
    if (this.isInitialized) {
      return true
    }

    if (this.initPromise) {
      return this.initPromise
    }

    this.initPromise = this.doInitialize()
    return this.initPromise
  }

  private async doInitialize(): Promise<boolean> {
    try {
      console.log('开始初始化P2P服务...')

      const p2pStore = useP2PStore()
      p2pStore.setNetworkStatus('connecting')

      // 检查是否在Electron环境中
      if (!window.electron || !window.electron.p2p) {
        console.warn('非Electron环境或electron API未就绪，跳过P2P初始化')
        p2pStore.setNetworkStatus('disconnected')
        return false
      }

      // 检查是否启用P2P模式
      const p2pMode = import.meta.env.VITE_P2P_MODE
      if (!p2pMode || p2pMode !== 'true') {
        console.warn('P2P模式未启用，跳过P2P初始化')
        p2pStore.setNetworkStatus('disconnected')
        return false
      }

      // 启动P2P服务
      const startResult = await window.electron.p2p.start()
      if (!startResult.success) {
        console.error('P2P服务启动失败:', startResult.message)
        p2pStore.setNetworkStatus('error')
        return false
      }

      // 连接P2P网络
      await p2pConnect.connect()

      // 检查连接状态
      if (!p2pConnect.isConnect()) {
        console.error('P2P网络连接失败')
        p2pStore.setNetworkStatus('error')
        return false
      }

      // 更新连接状态
      p2pStore.setConnectionStatus(true)
      p2pStore.setNetworkStatus('connected')

      // 获取节点ID
      const status = await window.electron.p2p.getStatus()
      if (status.success && status.nodeId) {
        p2pStore.setNodeId(status.nodeId)
      }

      // 设置事件监听器
      this.setupEventListeners()

      // 同步数据
      await this.syncInitialData()

      this.isInitialized = true
      p2pStore.setInitialized(true)
      console.log('P2P服务初始化成功')
      return true
    } catch (error) {
      console.error('P2P初始化失败:', error)
      const p2pStore = useP2PStore()
      p2pStore.setNetworkStatus('error')
      return false
    }
  }

  /**
   * 设置P2P事件监听器
   */
  private setupEventListeners(): void {
    if (!window.electron || !window.electron.ipcRenderer) {
      console.warn('electron API不可用，跳过事件监听器设置')
      return
    }

    const p2pStore = useP2PStore()

    // 监听消息接收
    window.electron.ipcRenderer.on('p2p-message-received', (data: any) => {
      console.log('收到P2P消息:', data)
      if (data.message) {
        p2pStore.addMessage(data.message)
      }
    })

    // 监听联系人请求
    window.electron.ipcRenderer.on('p2p-contact-request', (data: any) => {
      console.log('收到联系人请求:', data)
      if (data.request) {
        p2pStore.addContactRequest(data.request)
      }
    })

    // 监听节点连接状态
    window.electron.ipcRenderer.on('p2p-peer-connected', (data: any) => {
      console.log('节点已连接:', data)
      if (data.peer) {
        p2pStore.addDiscoveredNode({
          ...data.peer,
          status: 'connected',
          lastSeen: Date.now()
        })
      }
    })

    window.electron.ipcRenderer.on('p2p-peer-disconnected', (data: any) => {
      console.log('节点已断开:', data)
      if (data.peer) {
        p2pStore.addDiscoveredNode({
          ...data.peer,
          status: 'disconnected',
          lastSeen: Date.now()
        })
      }
    })

    // 监听网络状态变化
    window.electron.ipcRenderer.on('p2p-network-status', (data: any) => {
      console.log('P2P网络状态变化:', data)
      if (data.status) {
        p2pStore.setNetworkStatus(data.status)
        p2pStore.setConnectionStatus(data.status === 'connected')
      }
    })

    // 监听联系人状态变化
    window.electron.ipcRenderer.on('p2p-contact-status', (data: any) => {
      console.log('联系人状态变化:', data)
      if (data.contactId && data.status) {
        p2pStore.updateContactStatus(data.contactId, data.status)
      }
    })
  }

  /**
   * 同步初始数据
   */
  private async syncInitialData(): Promise<void> {
    try {
      // 同步联系人数据
      await this.syncContacts()

      // 同步未读消息
      await this.syncMessages()

      console.log('初始数据同步完成')
    } catch (error) {
      console.error('初始数据同步失败:', error)
    }
  }

  /**
   * 同步联系人数据
   */
  private async syncContacts(): Promise<void> {
    try {
      if (!window.electron || !window.electron.p2p) {
        console.warn('electron API不可用，跳过联系人同步')
        return
      }

      const p2pStore = useP2PStore()
      const result = await window.electron.p2p.getContacts()
      if (result.success && result.contacts) {
        p2pStore.setContacts(result.contacts)
        console.log('联系人数据同步成功，共', result.contacts.length, '个联系人')
      }
    } catch (error) {
      console.error('联系人数据同步失败:', error)
    }
  }

  /**
   * 同步消息数据
   */
  private async syncMessages(): Promise<void> {
    try {
      if (!window.electron || !window.electron.p2p) {
        console.warn('electron API不可用，跳过消息同步')
        return
      }

      const p2pStore = useP2PStore()
      const result = await window.electron.p2p.getUnsyncedMessages()
      if (result.success && result.messages) {
        p2pStore.setMessages(result.messages)
        console.log('消息数据同步成功，共', result.messages.length, '条未同步消息')
      }
    } catch (error) {
      console.error('消息数据同步失败:', error)
    }
  }

  /**
   * 检查P2P服务状态
   */
  async getStatus(): Promise<any> {
    try {
      if (!window.electron || !window.electron.p2p) {
        return { success: false, message: 'electron API不可用' }
      }

      return await window.electron.p2p.getStatus()
    } catch (error) {
      console.error('获取P2P状态失败:', error)
      return { success: false, message: error instanceof Error ? error.message : String(error) }
    }
  }

  /**
   * 停止P2P服务
   */
  async stop(): Promise<void> {
    try {
      if (!window.electron || !window.electron.p2p) {
        console.warn('electron API不可用，无法停止P2P服务')
        return
      }

      console.log('正在停止P2P服务...')
      const result = await window.electron.p2p.stop()
      if (result.success) {
        console.log('P2P服务已停止')
        const p2pStore = useP2PStore()
        p2pStore.setConnectionStatus(false)
        p2pStore.setNetworkStatus('disconnected')
      } else {
        console.error('停止P2P服务失败:', result.message)
      }
    } catch (error) {
      console.error('停止P2P服务时发生错误:', error)
    }
  }

  /**
   * 重启P2P服务
   */
  async restart(): Promise<boolean> {
    await this.stop()
    return this.initialize()
  }

  /**
   * 检查是否已初始化
   */
  isReady(): boolean {
    return this.isInitialized
  }
}

// 导出单例实例
export const p2pInitializer = P2PInitializer.getInstance()
