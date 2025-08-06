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
  },

  // 更新相关API
  updater: {
    // 检查更新
    checkForUpdates: () => ipcRenderer.invoke('updater:check-for-updates'),
    
    // 下载更新
    downloadUpdate: () => ipcRenderer.invoke('updater:download-update'),
    
    // 安装更新并重启
    quitAndInstall: () => ipcRenderer.invoke('updater:quit-and-install'),
    
    // 获取当前版本
    getVersion: () => ipcRenderer.invoke('updater:get-version'),
    
    // 获取更新状态
    getStatus: () => ipcRenderer.invoke('updater:get-status'),
    
    // 获取更新配置
    getConfig: () => ipcRenderer.invoke('updater:get-config'),
    
    // 更新配置
    updateConfig: (config: any) => ipcRenderer.invoke('updater:update-config', config),
    
    // 事件监听器
    onUpdateAvailable: (callback: (info: any) => void) => {
      const listener = (_event: any, info: any) => callback(info)
      ipcRenderer.on('updater:update-available', listener)
      return listener
    },
    
    onUpdateNotAvailable: (callback: (info: any) => void) => {
      const listener = (_event: any, info: any) => callback(info)
      ipcRenderer.on('updater:update-not-available', listener)
      return listener
    },
    
    onDownloadProgress: (callback: (progress: any) => void) => {
      const listener = (_event: any, progress: any) => callback(progress)
      ipcRenderer.on('updater:download-progress', listener)
      return listener
    },
    
    onUpdateDownloaded: (callback: (info: any) => void) => {
      const listener = (_event: any, info: any) => callback(info)
      ipcRenderer.on('updater:update-downloaded', listener)
      return listener
    },
    
    onError: (callback: (error: Error) => void) => {
      const listener = (_event: any, error: Error) => callback(error)
      ipcRenderer.on('updater:error', listener)
      return listener
    },
    
    onCheckingForUpdate: (callback: () => void) => {
      const listener = () => callback()
      ipcRenderer.on('updater:checking-for-update', listener)
      return listener
    },
    
    // 移除事件监听器
    removeUpdateAvailableListener: (listener: any) => {
      ipcRenderer.removeListener('updater:update-available', listener)
    },
    
    removeUpdateNotAvailableListener: (listener: any) => {
      ipcRenderer.removeListener('updater:update-not-available', listener)
    },
    
    removeDownloadProgressListener: (listener: any) => {
      ipcRenderer.removeListener('updater:download-progress', listener)
    },
    
    removeUpdateDownloadedListener: (listener: any) => {
      ipcRenderer.removeListener('updater:update-downloaded', listener)
    },
    
    removeErrorListener: (listener: any) => {
      ipcRenderer.removeListener('updater:error', listener)
    },
    
    removeCheckingForUpdateListener: (listener: any) => {
      ipcRenderer.removeListener('updater:checking-for-update', listener)
    }
  }
}

// 创建兼容的 electronAPI（旧版API格式）
const legacyElectronAPI = {
  invoke: ipcRenderer.invoke.bind(ipcRenderer),
  send: ipcRenderer.send.bind(ipcRenderer),
  on: ipcRenderer.on.bind(ipcRenderer),
  removeAllListeners: ipcRenderer.removeAllListeners.bind(ipcRenderer),
  p2p: electronAPI.p2p,
  updater: electronAPI.updater
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('electronAPI', legacyElectronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.electronAPI = legacyElectronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
