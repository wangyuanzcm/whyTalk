import { ElectronAPI } from '@electron-toolkit/preload'

// P2P API 类型定义
interface P2PAPI {
  // 服务控制
  start: () => Promise<{ success: boolean; message?: string; nodeId?: string }>
  stop: () => Promise<{ success: boolean; message?: string }>
  getStatus: () => Promise<{ success: boolean; isRunning?: boolean; nodeId?: string; message?: string }>
  
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

// 扩展的 ElectronAPI
interface ExtendedElectronAPI extends ElectronAPI {
  p2p: P2PAPI
}

declare global {
  interface Window {
    electron: ExtendedElectronAPI
    api: unknown
  }
}
