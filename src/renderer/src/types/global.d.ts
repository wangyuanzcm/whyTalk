import type { MessageApiInjection } from 'naive-ui/es/message/src/MessageProvider'
import type { DialogApiInjection } from 'naive-ui/es/dialog/src/DialogProvider'
import type { NotificationApiInjection } from 'naive-ui/es/notification/src/NotificationProvider'
import type { ModalApiInjection } from 'naive-ui/es/modal/src/ModalProvider'

declare global {
  interface Window {
    $message: MessageApiInjection
    $dialog: DialogApiInjection
    $notification: NotificationApiInjection
    $modal: ModalApiInjection
    
    // Electron API (新的统一API)
    electron: {
      ipcRenderer: {
        invoke: (channel: string, ...args: any[]) => Promise<any>
        send: (channel: string, ...args: any[]) => void
        on: (channel: string, listener: (...args: any[]) => void) => void
        removeAllListeners: (channel: string) => void
      }
      
      // P2P API
      p2p: {
        // 服务控制
        start: () => Promise<any>
        stop: () => Promise<any>
        getStatus: () => Promise<any>
        
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
        getContacts: () => Promise<any>
        deleteContact: (params: any) => Promise<any>
        updateContact: (params: any) => Promise<any>
        searchContacts: (params: any) => Promise<any>
        getContactRequests: () => Promise<any>
        handleContactRequest: (params: any) => Promise<any>
        
        // 群组相关
        createGroup: (params: any) => Promise<any>
        getGroups: () => Promise<any>
        joinGroup: (params: any) => Promise<any>
        leaveGroup: (params: any) => Promise<any>
        getGroupMembers: (params: any) => Promise<any>
        inviteToGroup: (params: any) => Promise<any>
        
        // 节点发现
        getDiscoveredPeers: () => Promise<any>
        getConnectedPeers: () => Promise<any>
        
        // 同步相关
        getUnsyncedMessages: () => Promise<any>
        getContactChanges: () => Promise<any>
        broadcastContactChanges: (changes: any) => Promise<any>
      }
    }
    
    // 旧版 Electron API (保持兼容性)
    electronAPI: {
      invoke: (channel: string, ...args: any[]) => Promise<any>
      send: (channel: string, ...args: any[]) => void
      on: (channel: string, listener: (...args: any[]) => void) => void
      removeAllListeners: (channel: string) => void
      
      // P2P API
      p2p: {
        // 服务控制
        start: () => Promise<any>
        stop: () => Promise<any>
        getStatus: () => Promise<any>
        
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
        getContacts: () => Promise<any>
        deleteContact: (params: any) => Promise<any>
        updateContact: (params: any) => Promise<any>
        searchContacts: (params: any) => Promise<any>
        getContactRequests: () => Promise<any>
        handleContactRequest: (params: any) => Promise<any>
        
        // 群组相关
        createGroup: (params: any) => Promise<any>
        getGroups: () => Promise<any>
        joinGroup: (params: any) => Promise<any>
        leaveGroup: (params: any) => Promise<any>
        getGroupMembers: (params: any) => Promise<any>
        inviteToGroup: (params: any) => Promise<any>
        
        // 节点发现
        getDiscoveredPeers: () => Promise<any>
        
        // 同步相关
        getUnsyncedMessages: () => Promise<any>
        getContactChanges: () => Promise<any>
        broadcastContactChanges: (changes: any) => Promise<any>
      }
    }
    
    // Legacy API
    $electron: {
      setBadge(value: number): void
    }
  }
}

export {}