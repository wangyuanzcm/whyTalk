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
        invoke: (channel: string, ...args: unknown[]) => Promise<unknown>
        send: (channel: string, ...args: unknown[]) => void
        on: (channel: string, listener: (...args: unknown[]) => void) => void
        removeAllListeners: (channel: string) => void
      }

      // P2P API已被移除
      /*
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
      }
      */

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
      */

      // 更新API
      updater: {
        // 检查更新
        checkForUpdates: () => Promise<void>
        
        // 下载更新
        downloadUpdate: () => Promise<void>
        
        // 安装更新并重启
        quitAndInstall: () => Promise<void>
        
        // 获取当前版本
        getVersion: () => Promise<string>
        
        // 获取更新状态
        getStatus: () => Promise<{
          status: string
          currentVersion: string
          availableVersion?: string
          downloadProgress?: {
            percent: number
            bytesPerSecond: number
            total: number
            transferred: number
          }
          error?: string
          lastChecked?: Date
        }>
        
        // 获取更新配置
        getConfig: () => Promise<Record<string, unknown>>
        
        // 更新配置
        updateConfig: (config: Record<string, unknown>) => Promise<{ success: boolean; error?: string }>
        
        // 事件监听器
        onUpdateAvailable: (callback: (info: Record<string, unknown>) => void) => () => void
        onUpdateNotAvailable: (callback: (info: Record<string, unknown>) => void) => () => void
        onDownloadProgress: (callback: (progress: Record<string, unknown>) => void) => () => void
        onUpdateDownloaded: (callback: (info: Record<string, unknown>) => void) => () => void
        onError: (callback: (error: Error) => void) => () => void
        onCheckingForUpdate: (callback: () => void) => () => void
        
        // 移除事件监听器
        removeUpdateAvailableListener: (listener: () => void) => void
        removeUpdateNotAvailableListener: (listener: () => void) => void
        removeDownloadProgressListener: (listener: () => void) => void
        removeUpdateDownloadedListener: (listener: () => void) => void
        removeErrorListener: (listener: () => void) => void
        removeCheckingForUpdateListener: (listener: () => void) => void
      }
    }

    // 旧版 Electron API (保持兼容性)
    electronAPI: {
      invoke: (channel: string, ...args: unknown[]) => Promise<unknown>
      send: (channel: string, ...args: unknown[]) => void
      on: (channel: string, listener: (...args: unknown[]) => void) => void
      removeAllListeners: (channel: string) => void

      // P2P API已被移除
      /*
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

      // 更新API
      updater: {
        // 检查更新
        checkForUpdates: () => Promise<void>
        
        // 下载更新
        downloadUpdate: () => Promise<void>
        
        // 安装更新并重启
        quitAndInstall: () => Promise<void>
        
        // 获取当前版本
        getVersion: () => Promise<string>
        
        // 获取更新状态
        getStatus: () => Promise<{
          status: string
          currentVersion: string
          availableVersion?: string
          downloadProgress?: any
          error?: string
          lastChecked?: Date
        }>
        
        // 获取更新配置
        getConfig: () => Promise<any>
        
        // 更新配置
        updateConfig: (config: any) => Promise<{ success: boolean; error?: string }>
        
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
    }

    // Legacy API
    $electron: {
      setBadge(value: number): void
    }
  }
}

export {}
