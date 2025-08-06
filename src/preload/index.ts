import { contextBridge, ipcRenderer } from 'electron'

// Custom APIs for renderer
const api = {}

// 自定义的 electronAPI，包含我们需要的 ipcRenderer 方法
const electronAPI = {
  ipcRenderer: {
    invoke: ipcRenderer.invoke.bind(ipcRenderer),
    send: ipcRenderer.send.bind(ipcRenderer),
    on: ipcRenderer.on.bind(ipcRenderer),
    removeAllListeners: ipcRenderer.removeAllListeners.bind(ipcRenderer)
  },

  // P2P相关API
  p2p: {
    // 服务控制
    start: () => ipcRenderer.invoke('p2p:start'),
    stop: () => ipcRenderer.invoke('p2p:stop'),
    getStatus: () => ipcRenderer.invoke('p2p:status'),

    // 消息相关
    sendDirectMessage: (params: any) => ipcRenderer.invoke('p2p:sendDirectMessage', params),
    sendGroupMessage: (params: any) => ipcRenderer.invoke('p2p:sendGroupMessage', params),
    getChatHistory: (params: any) => ipcRenderer.invoke('p2p:getChatHistory', params),
    getGroupChatHistory: (params: any) => ipcRenderer.invoke('p2p:getGroupChatHistory', params),
    markMessagesAsRead: (params: any) => ipcRenderer.invoke('p2p:markMessagesAsRead', params),
    deleteMessage: (params: any) => ipcRenderer.invoke('p2p:deleteMessage', params),
    recallMessage: (params: any) => ipcRenderer.invoke('p2p:recallMessage', params),

    // 联系人相关
    addContact: (params: any) => ipcRenderer.invoke('p2p:addContact', params),
    getContacts: () => ipcRenderer.invoke('p2p:getContacts'),
    deleteContact: (params: any) => ipcRenderer.invoke('p2p:deleteContact', params),
    updateContact: (params: any) => ipcRenderer.invoke('p2p:updateContact', params),
    searchContacts: (params: any) => ipcRenderer.invoke('p2p:searchContacts', params),
    getContactRequests: () => ipcRenderer.invoke('p2p:getContactRequests'),
    handleContactRequest: (params: any) => ipcRenderer.invoke('p2p:handleContactRequest', params),

    // 群组相关
    createGroup: (params: any) => ipcRenderer.invoke('p2p:createGroup', params),
    getGroups: () => ipcRenderer.invoke('p2p:getGroups'),
    joinGroup: (params: any) => ipcRenderer.invoke('p2p:joinGroup', params),
    leaveGroup: (params: any) => ipcRenderer.invoke('p2p:leaveGroup', params),
    getGroupMembers: (params: any) => ipcRenderer.invoke('p2p:getGroupMembers', params),
    inviteToGroup: (params: any) => ipcRenderer.invoke('p2p:inviteToGroup', params),

    // 节点发现
    getDiscoveredPeers: () => ipcRenderer.invoke('p2p:getDiscoveredPeers'),
    getConnectedPeers: () => ipcRenderer.invoke('p2p:getConnectedPeers'),

    // 同步相关
    getUnsyncedMessages: () => ipcRenderer.invoke('p2p:getUnsyncedMessages'),
    getContactChanges: () => ipcRenderer.invoke('p2p:getContactChanges'),
    broadcastContactChanges: (changes: any) =>
      ipcRenderer.invoke('p2p:broadcastContactChanges', changes)
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
