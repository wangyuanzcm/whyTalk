import { ipcMain, BrowserWindow } from 'electron'
import { P2PServiceClient } from './P2PServiceClient'

/**
 * P2P IPC Bridge
 * Bridges frontend P2P IPC calls to the new P2PServiceClient
 */
export class P2PIPCBridge {
  private p2pServiceClient: P2PServiceClient
  private mainWindow: BrowserWindow | null = null

  constructor(p2pServiceClient: P2PServiceClient) {
    this.p2pServiceClient = p2pServiceClient
    this.setupIPCHandlers()
    this.setupEventForwarding()
  }

  public setMainWindow(mainWindow: BrowserWindow): void {
    this.mainWindow = mainWindow
  }

  private setupIPCHandlers(): void {
    // P2P service control
    ipcMain.handle('p2p:start', async () => {
      try {
        await this.p2pServiceClient.start()
        return { success: true }
      } catch (error) {
        console.error('Failed to start P2P service:', error)
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })

    ipcMain.handle('p2p:stop', async () => {
      try {
        await this.p2pServiceClient.stop()
        return { success: true }
      } catch (error) {
        console.error('Failed to stop P2P service:', error)
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })

    ipcMain.handle('p2p:getStatus', async () => {
      try {
        const nodeInfo = await this.p2pServiceClient.getNodeInfo()
        return {
          success: true,
          isRunning: this.p2pServiceClient.isRunning(),
          nodeId: nodeInfo?.peerId || null,
          connectedPeers: nodeInfo?.connectedPeers || [],
          addresses: nodeInfo?.addresses || []
        }
      } catch (error) {
        console.error('Failed to get P2P status:', error)
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })

    // P2P messaging
    ipcMain.handle('p2p:sendDirectMessage', async (_event, params) => {
      try {
        const { targetPeerId, message } = params
        await this.p2pServiceClient.sendDirectMessage(targetPeerId, message)
        return { success: true }
      } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })

    ipcMain.handle('p2p:sendGroupMessage', async (_event, _params) => {
      try {
        // TODO: Implement group messaging
        throw new Error('Group messaging not implemented yet')
      } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })

    ipcMain.handle('p2p:getChatHistory', async (_event, _params) => {
      try {
        // TODO: Implement chat history retrieval
        return { success: true, data: [] }
      } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })

    ipcMain.handle('p2p:getGroupChatHistory', async (_event, _params) => {
      try {
        // TODO: Implement group chat history retrieval
        return { success: true, data: [] }
      } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })

    ipcMain.handle('p2p:markMessagesAsRead', async (_event, _params) => {
      try {
        // TODO: Implement message read marking
        return { success: true }
      } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })

    ipcMain.handle('p2p:deleteMessage', async (_event, _params) => {
      try {
        // TODO: Implement message deletion
        return { success: true }
      } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })

    ipcMain.handle('p2p:recallMessage', async (_event, _params) => {
      try {
        // TODO: Implement message recall
        return { success: true }
      } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })

    // P2P contacts
    ipcMain.handle('p2p:addContact', async (_event, _params) => {
      try {
        // TODO: Implement add contact
        return { success: true }
      } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })

    ipcMain.handle('p2p:getContacts', async () => {
      try {
        // TODO: Implement get contacts list
        return { success: true, data: [] }
      } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })

    ipcMain.handle('p2p:deleteContact', async (_event, _params) => {
      try {
        // TODO: Implement delete contact
        return { success: true }
      } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })

    ipcMain.handle('p2p:updateContact', async (_event, _params) => {
      try {
        // TODO: Implement update contact
        return { success: true }
      } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })

    ipcMain.handle('p2p:searchContacts', async (_event, _params) => {
      try {
        // TODO: Implement search contacts
        return { success: true, data: [] }
      } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })

    ipcMain.handle('p2p:getContactRequests', async () => {
      try {
        // TODO: Implement get contact requests
        return { success: true, data: [] }
      } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })

    ipcMain.handle('p2p:handleContactRequest', async (_event, _params) => {
      try {
        // TODO: Implement handle contact request
        return { success: true }
      } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })

    // P2P groups
    ipcMain.handle('p2p:createGroup', async (_event, _params) => {
      try {
        // TODO: Implement create group
        return { success: true, data: null }
      } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })

    ipcMain.handle('p2p:getGroups', async () => {
      try {
        // TODO: Implement get groups list
        return { success: true, data: [] }
      } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })

    ipcMain.handle('p2p:joinGroup', async (_event, _params) => {
      try {
        // TODO: Implement join group
        return { success: true }
      } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })

    ipcMain.handle('p2p:leaveGroup', async (_event, _params) => {
      try {
        // TODO: Implement leave group
        return { success: true }
      } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })

    ipcMain.handle('p2p:getGroupMembers', async (_event, _params) => {
      try {
        // TODO: Implement get group members
        return { success: true, data: [] }
      } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })

    ipcMain.handle('p2p:inviteToGroup', async (_event, _params) => {
      try {
        // TODO: Implement invite to group
        return { success: true }
      } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })

    // P2P network
    ipcMain.handle('p2p:getDiscoveredPeers', async () => {
      try {
        const connectedPeers = await this.p2pServiceClient.getConnectedPeers()
        return { success: true, data: connectedPeers }
      } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })

    // P2P sync
    ipcMain.handle('p2p:getUnsyncedMessages', async () => {
      try {
        // TODO: Implement get unsynced messages
        return { success: true, data: [] }
      } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })

    ipcMain.handle('p2p:getContactChanges', async () => {
      try {
        // TODO: Implement get contact changes
        return { success: true, data: [] }
      } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })

    ipcMain.handle('p2p:broadcastContactChanges', async (_event, _changes) => {
      try {
        // TODO: Implement broadcast contact changes
        return { success: true }
      } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })
  }

  private setupEventForwarding(): void {
    // Forward P2P service events to frontend
    this.p2pServiceClient.on('message:received', (message) => {
      if (this.mainWindow) {
        this.mainWindow.webContents.send('p2p:messageReceived', message)
      }
    })

    this.p2pServiceClient.on('peer:connect', (peerId) => {
      if (this.mainWindow) {
        this.mainWindow.webContents.send('p2p:peerConnected', peerId)
      }
    })

    this.p2pServiceClient.on('peer:disconnect', (peerId) => {
      if (this.mainWindow) {
        this.mainWindow.webContents.send('p2p:peerDisconnected', peerId)
      }
    })

    this.p2pServiceClient.on('peer:discovery', (peers) => {
      if (this.mainWindow) {
        this.mainWindow.webContents.send('p2p:peerDiscovered', peers)
      }
    })

    this.p2pServiceClient.on('p2p:started', (data) => {
      if (this.mainWindow) {
        this.mainWindow.webContents.send('p2p:networkStatusChanged', { status: 'connected', data })
      }
    })

    this.p2pServiceClient.on('p2p:stopped', () => {
      if (this.mainWindow) {
        this.mainWindow.webContents.send('p2p:networkStatusChanged', { status: 'disconnected' })
      }
    })

    this.p2pServiceClient.on('error', (error) => {
      if (this.mainWindow) {
        this.mainWindow.webContents.send('p2p:networkStatusChanged', { status: 'error', error: error instanceof Error ? error.message : String(error) })
      }
    })
  }

  public async cleanup(): Promise<void> {
    // Remove all IPC handlers
    const handlers = [
      'p2p:start', 'p2p:stop', 'p2p:getStatus',
      'p2p:sendDirectMessage', 'p2p:sendGroupMessage',
      'p2p:getChatHistory', 'p2p:getGroupChatHistory',
      'p2p:markMessagesAsRead', 'p2p:deleteMessage', 'p2p:recallMessage',
      'p2p:addContact', 'p2p:getContacts', 'p2p:deleteContact', 'p2p:updateContact',
      'p2p:searchContacts', 'p2p:getContactRequests', 'p2p:handleContactRequest',
      'p2p:createGroup', 'p2p:getGroups', 'p2p:joinGroup', 'p2p:leaveGroup',
      'p2p:getGroupMembers', 'p2p:inviteToGroup',
      'p2p:getDiscoveredPeers', 'p2p:getUnsyncedMessages',
      'p2p:getContactChanges', 'p2p:broadcastContactChanges'
    ]

    for (const handler of handlers) {
      ipcMain.removeHandler(handler)
    }
  }
}