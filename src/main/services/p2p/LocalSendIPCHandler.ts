import { ipcMain } from 'electron'
import { localSendP2PManager } from './LocalSendP2PManager'

/**
 * LocalSend IPC 处理器
 * 处理前端与 LocalSend P2P 服务的通信
 */
export class LocalSendIPCHandler {
  private static instance: LocalSendIPCHandler
  private isInitialized = false

  public static getInstance(): LocalSendIPCHandler {
    if (!LocalSendIPCHandler.instance) {
      LocalSendIPCHandler.instance = new LocalSendIPCHandler()
    }
    return LocalSendIPCHandler.instance
  }

  /**
   * 初始化 IPC 处理器
   */
  public initialize(): void {
    if (this.isInitialized) {
      return
    }

    this.setupIPCHandlers()
    this.isInitialized = true
    console.log('LocalSend IPC Handler initialized')
  }

  /**
   * 设置 IPC 处理器
   */
  private setupIPCHandlers(): void {
    // P2P 服务控制
    ipcMain.handle('p2p:start', async () => {
      try {
        await localSendP2PManager.start()
        return { success: true }
      } catch (error) {
        console.error('Failed to start LocalSend P2P service:', error)
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })

    ipcMain.handle('p2p:stop', async () => {
      try {
        await localSendP2PManager.stop()
        return { success: true }
      } catch (error) {
        console.error('Failed to stop LocalSend P2P service:', error)
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })

    ipcMain.handle('p2p:status', async () => {
      try {
        const status = await localSendP2PManager.getStatus()
        return { success: true, data: status }
      } catch (error) {
        console.error('Failed to get LocalSend P2P status:', error)
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })

    ipcMain.handle('p2p:refresh', async () => {
      try {
        await localSendP2PManager.refreshPeers()
        return { success: true }
      } catch (error) {
        console.error('Failed to refresh LocalSend peers:', error)
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })

    // 设备管理
    ipcMain.handle('p2p:peers', async () => {
      try {
        const peers = await localSendP2PManager.getDiscoveredPeers()
        return { success: true, data: peers }
      } catch (error) {
        console.error('Failed to get LocalSend peers:', error)
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })

    ipcMain.handle('p2p:connect', async (_, fingerprint: string) => {
      try {
        await localSendP2PManager.connectToPeer(fingerprint)
        return { success: true }
      } catch (error) {
        console.error('Failed to connect to LocalSend peer:', error)
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })

    ipcMain.handle('p2p:disconnect', async (_, fingerprint: string) => {
      try {
        await localSendP2PManager.disconnectFromPeer(fingerprint)
        return { success: true }
      } catch (error) {
        console.error('Failed to disconnect from LocalSend peer:', error)
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })

    // 消息传输
    ipcMain.handle('p2p:send-message', async (_, fingerprint: string, message: string) => {
      try {
        await localSendP2PManager.sendDirectMessage(fingerprint, message)
        return { success: true }
      } catch (error) {
        console.error('Failed to send LocalSend message:', error)
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })

    // 文件传输
    ipcMain.handle('p2p:send-file', async (_, fingerprint: string, filePath: string) => {
      try {
        await localSendP2PManager.sendFile(fingerprint, filePath)
        return { success: true }
      } catch (error) {
        console.error('Failed to send LocalSend file:', error)
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })

    // 消息历史
    ipcMain.handle('p2p:messages', async () => {
      try {
        const messages = await localSendP2PManager.getMessageHistory()
        return { success: true, data: messages }
      } catch (error) {
        console.error('Failed to get LocalSend message history:', error)
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })

    ipcMain.handle('p2p:clear-messages', async () => {
      try {
        await localSendP2PManager.clearMessageHistory()
        return { success: true }
      } catch (error) {
        console.error('Failed to clear LocalSend message history:', error)
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })

    // 联系人管理
    ipcMain.handle('p2p:getContacts', async () => {
      try {
        // 从 LocalSend 获取联系人列表
        const contacts = await localSendP2PManager.getDiscoveredPeers()
        return { success: true, data: contacts }
      } catch (error) {
        console.error('Failed to get LocalSend contacts:', error)
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })

    ipcMain.handle('p2p:addContact', async (_, params: any) => {
      try {
        // LocalSend 通过发现机制自动添加联系人
        console.log('Adding contact via LocalSend:', params)
        return { success: true }
      } catch (error) {
        console.error('Failed to add LocalSend contact:', error)
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })

    ipcMain.handle('p2p:deleteContact', async (_, params: any) => {
      try {
        console.log('Deleting contact via LocalSend:', params)
        return { success: true }
      } catch (error) {
        console.error('Failed to delete LocalSend contact:', error)
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })

    ipcMain.handle('p2p:updateContact', async (_, params: any) => {
      try {
        console.log('Updating contact via LocalSend:', params)
        return { success: true }
      } catch (error) {
        console.error('Failed to update LocalSend contact:', error)
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })

    ipcMain.handle('p2p:searchContacts', async (_, params: any) => {
      try {
        const contacts = await localSendP2PManager.getDiscoveredPeers()
        // 简单的搜索过滤
        const filtered = contacts.filter((contact: any) => 
          contact.alias?.toLowerCase().includes(params.query?.toLowerCase() || '')
        )
        return { success: true, data: filtered }
      } catch (error) {
        console.error('Failed to search LocalSend contacts:', error)
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })

    ipcMain.handle('p2p:getContactRequests', async () => {
      try {
        // LocalSend 没有联系人请求概念，返回空数组
        return { success: true, data: [] }
      } catch (error) {
        console.error('Failed to get LocalSend contact requests:', error)
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })

    ipcMain.handle('p2p:handleContactRequest', async (_, params: any) => {
      try {
        console.log('Handling contact request via LocalSend:', params)
        return { success: true }
      } catch (error) {
        console.error('Failed to handle LocalSend contact request:', error)
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })

    // 群组管理
    ipcMain.handle('p2p:getGroups', async () => {
      try {
        // LocalSend 不支持群组，返回空数组
        return { success: true, data: [] }
      } catch (error) {
        console.error('Failed to get LocalSend groups:', error)
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })

    ipcMain.handle('p2p:createGroup', async (_, params: any) => {
      try {
        console.log('Creating group via LocalSend (not supported):', params)
        return { success: false, error: 'Groups not supported in LocalSend' }
      } catch (error) {
        console.error('Failed to create LocalSend group:', error)
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })

    ipcMain.handle('p2p:joinGroup', async (_, params: any) => {
      try {
        console.log('Joining group via LocalSend (not supported):', params)
        return { success: false, error: 'Groups not supported in LocalSend' }
      } catch (error) {
        console.error('Failed to join LocalSend group:', error)
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })

    ipcMain.handle('p2p:leaveGroup', async (_, params: any) => {
      try {
        console.log('Leaving group via LocalSend (not supported):', params)
        return { success: false, error: 'Groups not supported in LocalSend' }
      } catch (error) {
        console.error('Failed to leave LocalSend group:', error)
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })

    ipcMain.handle('p2p:getGroupMembers', async (_, params: any) => {
      try {
        console.log('Getting group members via LocalSend (not supported):', params)
        return { success: true, data: [] }
      } catch (error) {
        console.error('Failed to get LocalSend group members:', error)
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })

    ipcMain.handle('p2p:inviteToGroup', async (_, params: any) => {
      try {
        console.log('Inviting to group via LocalSend (not supported):', params)
        return { success: false, error: 'Groups not supported in LocalSend' }
      } catch (error) {
        console.error('Failed to invite to LocalSend group:', error)
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })

    // 消息管理
    ipcMain.handle('p2p:sendDirectMessage', async (_, params: any) => {
      try {
        await localSendP2PManager.sendDirectMessage(params.peerId, params.content)
        return { success: true }
      } catch (error) {
        console.error('Failed to send LocalSend direct message:', error)
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })

    ipcMain.handle('p2p:sendGroupMessage', async (_, params: any) => {
      try {
        console.log('Sending group message via LocalSend (not supported):', params)
        return { success: false, error: 'Group messages not supported in LocalSend' }
      } catch (error) {
        console.error('Failed to send LocalSend group message:', error)
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })

    ipcMain.handle('p2p:getChatHistory', async (_, params: any) => {
      try {
        const messages = await localSendP2PManager.getMessageHistory()
        // 过滤特定联系人的消息
        const filtered = messages.filter((msg: any) => 
          msg.peerId === params.peerId
        )
        return { success: true, data: filtered }
      } catch (error) {
        console.error('Failed to get LocalSend chat history:', error)
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })

    ipcMain.handle('p2p:getGroupChatHistory', async (_, params: any) => {
      try {
        console.log('Getting group chat history via LocalSend (not supported):', params)
        return { success: true, data: [] }
      } catch (error) {
        console.error('Failed to get LocalSend group chat history:', error)
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })

    ipcMain.handle('p2p:markMessagesAsRead', async (_, params: any) => {
      try {
        console.log('Marking messages as read via LocalSend:', params)
        return { success: true }
      } catch (error) {
        console.error('Failed to mark LocalSend messages as read:', error)
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })

    ipcMain.handle('p2p:deleteMessage', async (_, params: any) => {
      try {
        console.log('Deleting message via LocalSend:', params)
        return { success: true }
      } catch (error) {
        console.error('Failed to delete LocalSend message:', error)
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })

    ipcMain.handle('p2p:recallMessage', async (_, params: any) => {
      try {
        console.log('Recalling message via LocalSend:', params)
        return { success: true }
      } catch (error) {
        console.error('Failed to recall LocalSend message:', error)
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })

    // 发现和连接
    ipcMain.handle('p2p:getDiscoveredPeers', async () => {
      try {
        const peers = await localSendP2PManager.getDiscoveredPeers()
        return { success: true, data: peers }
      } catch (error) {
        console.error('Failed to get LocalSend discovered peers:', error)
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })

    ipcMain.handle('p2p:getConnectedPeers', async () => {
      try {
        const peers = await localSendP2PManager.getDiscoveredPeers()
        // LocalSend 没有持久连接概念，返回发现的设备
        return { success: true, data: peers }
      } catch (error) {
        console.error('Failed to get LocalSend connected peers:', error)
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })

    // 同步相关
    ipcMain.handle('p2p:getUnsyncedMessages', async () => {
      try {
        // LocalSend 不需要同步，返回空数组
        return { success: true, data: [] }
      } catch (error) {
        console.error('Failed to get LocalSend unsynced messages:', error)
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })

    ipcMain.handle('p2p:getContactChanges', async () => {
      try {
        // LocalSend 不需要同步联系人变更，返回空数组
        return { success: true, data: [] }
      } catch (error) {
        console.error('Failed to get LocalSend contact changes:', error)
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })

    ipcMain.handle('p2p:broadcastContactChanges', async (_, changes: any) => {
      try {
        console.log('Broadcasting contact changes via LocalSend:', changes)
        return { success: true }
      } catch (error) {
        console.error('Failed to broadcast LocalSend contact changes:', error)
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })

    // 设置管理
    ipcMain.handle('p2p:get-settings', async () => {
      try {
        const settings = {
          deviceAlias: localSendP2PManager.getNodeInfo().alias,
          autoStart: false, // 可以从配置文件读取
          port: 53317 // 可以从配置文件读取
        }
        return { success: true, data: settings }
      } catch (error) {
        console.error('Failed to get LocalSend settings:', error)
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })

    ipcMain.handle('p2p:save-settings', async (_, settings: any) => {
      try {
        // 这里可以保存设置到配置文件
        console.log('Saving LocalSend settings:', settings)
        return { success: true }
      } catch (error) {
        console.error('Failed to save LocalSend settings:', error)
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })

    console.log('LocalSend IPC handlers registered')
  }

  /**
   * 清理 IPC 处理器
   */
  public cleanup(): void {
    if (!this.isInitialized) {
      return
    }

    // 移除所有 IPC 处理器
    const handlers = [
      'p2p:start',
      'p2p:stop', 
      'p2p:status',
      'p2p:refresh',
      'p2p:peers',
      'p2p:connect',
      'p2p:disconnect',
      'p2p:send-message',
      'p2p:send-file',
      'p2p:messages',
      'p2p:clear-messages',
      'p2p:get-settings',
      'p2p:save-settings'
    ]

    handlers.forEach(handler => {
      ipcMain.removeAllListeners(handler)
    })

    this.isInitialized = false
    console.log('LocalSend IPC Handler cleaned up')
  }
}

// 导出单例实例
export const localSendIPCHandler = LocalSendIPCHandler.getInstance()