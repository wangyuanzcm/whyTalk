import { ElectronAPI } from '@electron-toolkit/preload'

// P2P功能已被移除

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
  // P2P功能已被移除
  updater: UpdaterAPI
}

// 兼容的 electronAPI 类型定义（旧版API格式）
interface LegacyElectronAPI {
  invoke: (channel: string, ...args: any[]) => Promise<any>
  send: (channel: string, ...args: any[]) => void
  on: (channel: string, listener: (...args: any[]) => void) => void
  removeAllListeners: (channel: string) => void
  // P2P功能已被移除
  updater: UpdaterAPI
}

declare global {
  interface Window {
    electron: ExtendedElectronAPI
    electronAPI: LegacyElectronAPI
    api: unknown
  }
}
