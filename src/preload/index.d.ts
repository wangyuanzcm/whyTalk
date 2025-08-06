import { ElectronAPI } from '@electron-toolkit/preload'

// P2P API 类型定义
interface P2PAPI {
  // 服务控制
  start: () => Promise<{ success: boolean; message?: string; nodeId?: string }>
  stop: () => Promise<{ success: boolean; message?: string }>
  getStatus: () => Promise<{
    success: boolean
    isRunning?: boolean
    nodeId?: string
    message?: string
  }>

  // 消息相关
  sendDirectMessage: (params: any) => Promise<any>
  sendGroupMessage: (params: any) => Promise<any>
  getChatHistory: (params: any) => Promise<any>
  getGroupChatHistory: (params: any) => Promise<any>
  markMessagesAsRead: (params: any) => Promise<any>
  deleteMessage: (params: any) => Promise<any>
  recallMessage: (params: any) => Promise<any>

  // 联系人相关
  addContact: (params: any) => Promise<any>
  getContacts: () => Promise<{ success: boolean; contacts?: any[]; message?: string }>
  deleteContact: (params: any) => Promise<any>
  updateContact: (params: any) => Promise<any>
  searchContacts: (params: any) => Promise<any>
  getContactRequests: () => Promise<any>
  handleContactRequest: (params: any) => Promise<any>

  // 群组相关
  createGroup: (params: any) => Promise<any>
  getGroups: () => Promise<{ success: boolean; groups?: any[]; message?: string }>
  joinGroup: (params: any) => Promise<any>
  leaveGroup: (params: any) => Promise<any>
  getGroupMembers: (params: any) => Promise<any>
  inviteToGroup: (params: any) => Promise<any>

  // 节点发现
  getDiscoveredPeers: () => Promise<{ success: boolean; peers?: any[]; message?: string }>
  getConnectedPeers: () => Promise<{ success: boolean; peers?: any[]; message?: string }>

  // 同步相关
  getUnsyncedMessages: () => Promise<any>
  getContactChanges: () => Promise<any>
  broadcastContactChanges: (changes: any) => Promise<any>
}

// 更新器 API 类型定义
interface UpdaterAPI {
  // 检查更新
  checkForUpdates: () => Promise<any>
  
  // 下载更新
  downloadUpdate: () => Promise<any>
  
  // 安装更新并重启
  quitAndInstall: () => Promise<any>
  
  // 获取当前版本
  getVersion: () => Promise<string>
  
  // 获取更新状态
  getStatus: () => Promise<any>
  
  // 获取更新配置
  getConfig: () => Promise<any>
  
  // 更新配置
  updateConfig: (config: any) => Promise<any>
  
  // 事件监听器
  onUpdateAvailable: (callback: (info: any) => void) => any
  onUpdateNotAvailable: (callback: (info: any) => void) => any
  onDownloadProgress: (callback: (progress: any) => void) => any
  onUpdateDownloaded: (callback: (info: any) => void) => any
  onError: (callback: (error: Error) => void) => any
  onCheckingForUpdate: (callback: () => void) => any
  
  // 移除事件监听器
  removeUpdateAvailableListener: (listener: any) => void
  removeUpdateNotAvailableListener: (listener: any) => void
  removeDownloadProgressListener: (listener: any) => void
  removeUpdateDownloadedListener: (listener: any) => void
  removeErrorListener: (listener: any) => void
  removeCheckingForUpdateListener: (listener: any) => void
}

// 扩展的 ElectronAPI
interface ExtendedElectronAPI extends ElectronAPI {
  p2p: P2PAPI
  updater: UpdaterAPI
}

// 兼容的 electronAPI 类型定义（旧版API格式）
interface LegacyElectronAPI {
  invoke: (channel: string, ...args: any[]) => Promise<any>
  send: (channel: string, ...args: any[]) => void
  on: (channel: string, listener: (...args: any[]) => void) => void
  removeAllListeners: (channel: string) => void
  p2p: P2PAPI
  updater: UpdaterAPI
}

declare global {
  interface Window {
    electron: ExtendedElectronAPI
    electronAPI: LegacyElectronAPI
    api: unknown
  }
}
