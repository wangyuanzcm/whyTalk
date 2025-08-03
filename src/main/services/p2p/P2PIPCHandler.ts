import { ipcMain, BrowserWindow } from 'electron'
import { P2PManager } from './P2PManager'

export class P2PIPCHandler {
  private p2pManager: P2PManager
  private mainWindow: BrowserWindow | null = null

  constructor() {
    this.p2pManager = new P2PManager()
    this.registerHandlers()
  }

  setMainWindow(window: BrowserWindow): void {
    this.mainWindow = window
  }

  private registerHandlers(): void {
    // P2P服务控制
    ipcMain.handle('p2p:start', async () => {
      try {
        await this.p2pManager.start()
        return { success: true }
      } catch (error) {
        console.error('Failed to start P2P service:', error)
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })

    ipcMain.handle('p2p:stop', async () => {
      try {
        await this.p2pManager.stop()
        return { success: true }
      } catch (error) {
        console.error('Failed to stop P2P service:', error)
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })

    ipcMain.handle('p2p:getStatus', async () => {
      try {
        const status = await this.p2pManager.getStatus()
        return {
          success: true,
          isRunning: status.isRunning,
          peerId: status.peerId,
          connectedPeers: status.connectedPeers
        }
      } catch (error) {
        console.error('Failed to get P2P status:', error)
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })

    // 消息相关
    ipcMain.handle('p2p:sendDirectMessage', async (_event, { targetPeerId, message }) => {
      try {
        await this.p2pManager.sendDirectMessage(targetPeerId, message)
        return { success: true }
      } catch (error) {
        console.error('Failed to send direct message:', error)
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })

    ipcMain.handle('p2p:sendGroupMessage', async (_event, { groupId, message }) => {
      try {
        await this.p2pManager.sendGroupMessage(groupId, message)
        return { success: true }
      } catch (error) {
        console.error('Failed to send group message:', error)
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })

    ipcMain.handle('p2p:getChatHistory', async (_event, { targetPeerId, page, limit }) => {
      try {
        const result = await this.p2pManager.getChatHistory(targetPeerId, page, limit)
        return { success: true, ...result }
      } catch (error) {
        console.error('Failed to get chat history:', error)
        return { success: false, messages: [], total: 0 }
      }
    })

    ipcMain.handle('p2p:getGroupChatHistory', async (_event, { groupId, page, limit }) => {
      try {
        const result = await this.p2pManager.getGroupChatHistory(groupId, page, limit)
        return { success: true, ...result }
      } catch (error) {
        console.error('Failed to get group chat history:', error)
        return { success: false, messages: [], total: 0 }
      }
    })

    ipcMain.handle('p2p:markMessagesAsRead', async (_event, { messageIds }) => {
      try {
        await this.p2pManager.markMessagesAsRead(messageIds)
        return { success: true }
      } catch (error) {
        console.error('Failed to mark messages as read:', error)
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })

    ipcMain.handle('p2p:deleteMessage', async (_event, { messageId }) => {
      try {
        await this.p2pManager.deleteMessage(messageId)
        return { success: true }
      } catch (error) {
        console.error('Failed to delete message:', error)
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })

    ipcMain.handle('p2p:recallMessage', async (_event, { messageId }) => {
      try {
        await this.p2pManager.recallMessage(messageId)
        return { success: true }
      } catch (error) {
        console.error('Failed to recall message:', error)
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })

    // 联系人相关
    ipcMain.handle('p2p:addContact', async (_event, { peerId, nickname, remark }) => {
      try {
        await this.p2pManager.addContact(peerId, nickname, remark)
        return { success: true }
      } catch (error) {
        console.error('Failed to add contact:', error)
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })

    ipcMain.handle('p2p:getContacts', async () => {
      try {
        const contacts = await this.p2pManager.getContacts()
        return { success: true, contacts }
      } catch (error) {
        console.error('Failed to get contacts:', error)
        return { success: false, contacts: [] }
      }
    })

    ipcMain.handle('p2p:deleteContact', async (_event, { peerId }) => {
      try {
        await this.p2pManager.deleteContact(peerId)
        return { success: true }
      } catch (error) {
        console.error('Failed to delete contact:', error)
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })

    ipcMain.handle('p2p:updateContact', async (_event, { peerId, updates }) => {
      try {
        await this.p2pManager.updateContact(peerId, updates)
        return { success: true }
      } catch (error) {
        console.error('Failed to update contact:', error)
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })

    ipcMain.handle('p2p:searchContacts', async (_event, { query }) => {
      try {
        const contacts = await this.p2pManager.searchContacts(query)
        return { success: true, contacts }
      } catch (error) {
        console.error('Failed to search contacts:', error)
        return { success: false, contacts: [] }
      }
    })

    ipcMain.handle('p2p:getContactRequests', async () => {
      try {
        const requests = await this.p2pManager.getContactRequests()
        return { success: true, requests }
      } catch (error) {
        console.error('Failed to get contact requests:', error)
        return { success: false, requests: [] }
      }
    })

    ipcMain.handle('p2p:handleContactRequest', async (_event, { requestId, action }) => {
      try {
        await this.p2pManager.handleContactRequest(requestId, action)
        return { success: true }
      } catch (error) {
        console.error('Failed to handle contact request:', error)
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })

    // 群组相关
    ipcMain.handle('p2p:createGroup', async (_event, { name, description, members }) => {
      try {
        const groupId = await this.p2pManager.createGroup(name, description)
        // TODO: 如果有members参数，可以在创建群组后邀请成员
        if (members && members.length > 0) {
          await this.p2pManager.inviteToGroup(groupId, members)
        }
        return { success: true, group: { id: groupId, name, description } }
      } catch (error) {
        console.error('Failed to create group:', error)
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })

    ipcMain.handle('p2p:getGroups', async () => {
      try {
        const groups = await this.p2pManager.getGroups()
        return { success: true, groups }
      } catch (error) {
        console.error('Failed to get groups:', error)
        return { success: false, groups: [] }
      }
    })

    ipcMain.handle('p2p:joinGroup', async (_event, { groupId }) => {
      try {
        await this.p2pManager.joinGroup(groupId)
        return { success: true }
      } catch (error) {
        console.error('Failed to join group:', error)
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })

    ipcMain.handle('p2p:leaveGroup', async (_event, { groupId }) => {
      try {
        await this.p2pManager.leaveGroup(groupId)
        return { success: true }
      } catch (error) {
        console.error('Failed to leave group:', error)
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })

    ipcMain.handle('p2p:getGroupMembers', async (_event, { groupId }) => {
      try {
        const members = await this.p2pManager.getGroupMembers(groupId)
        return { success: true, members }
      } catch (error) {
        console.error('Failed to get group members:', error)
        return { success: false, members: [] }
      }
    })

    ipcMain.handle('p2p:inviteToGroup', async (_, { groupId, peerIds }) => {
      try {
        await this.p2pManager.inviteToGroup(groupId, peerIds)
        return { success: true }
      } catch (error) {
        console.error('Failed to invite to group:', error)
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })

    // 节点发现相关
    ipcMain.handle('p2p:getDiscoveredPeers', async () => {
      try {
        const peers = await this.p2pManager.getDiscoveredPeers()
        return { success: true, peers }
      } catch (error) {
        console.error('Failed to get discovered peers:', error)
        return { success: false, peers: [] }
      }
    })

    // 同步相关
    ipcMain.handle('p2p:getUnsyncedMessages', async () => {
      try {
        const messages = await this.p2pManager.getUnsyncedMessages()
        return { success: true, messages }
      } catch (error) {
        console.error('Failed to get unsynced messages:', error)
        return { success: false, messages: [] }
      }
    })

    ipcMain.handle('p2p:getContactChanges', async () => {
      try {
        const changes = await this.p2pManager.getContactChanges()
        return { success: true, changes }
      } catch (error) {
        console.error('Failed to get contact changes:', error)
        return { success: false, changes: [] }
      }
    })

    ipcMain.handle('p2p:broadcastContactChanges', async (_event, changes) => {
      try {
        await this.p2pManager.broadcastContactChanges(changes)
        return { success: true }
      } catch (error) {
        console.error('Failed to broadcast contact changes:', error)
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })

    // 设置P2P事件监听
    this.setupP2PEventListeners()
  }

  private setupP2PEventListeners(): void {
    // 监听P2P消息接收事件
    this.p2pManager.on('messageReceived', (message) => {
      if (this.mainWindow) {
        this.mainWindow.webContents.send('p2p:messageReceived', message)
      }
    })

    // 监听联系人请求事件
    this.p2pManager.on('contactRequest', (request) => {
      if (this.mainWindow) {
        this.mainWindow.webContents.send('p2p:contactRequest', request)
      }
    })

    // 监听群组邀请事件
    this.p2pManager.on('groupInvite', (invite) => {
      if (this.mainWindow) {
        this.mainWindow.webContents.send('p2p:groupInvite', invite)
      }
    })

    // 监听节点连接事件
    this.p2pManager.on('peerConnected', (peerId) => {
      if (this.mainWindow) {
        this.mainWindow.webContents.send('p2p:peerConnected', peerId)
      }
    })

    // 监听节点断开事件
    this.p2pManager.on('peerDisconnected', (peerId) => {
      if (this.mainWindow) {
        this.mainWindow.webContents.send('p2p:peerDisconnected', peerId)
      }
    })

    // 监听网络状态变化
    this.p2pManager.on('networkStatusChanged', (status) => {
      if (this.mainWindow) {
        this.mainWindow.webContents.send('p2p:networkStatusChanged', status)
      }
    })
  }

  // 清理资源
  async cleanup(): Promise<void> {
    try {
      await this.p2pManager.stop()
    } catch (error) {
      console.error('Failed to cleanup P2P service:', error)
    }
  }
}

// 导出单例
export const p2pIPCHandler = new P2PIPCHandler()
