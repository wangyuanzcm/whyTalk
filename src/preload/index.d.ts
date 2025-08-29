import { ElectronAPI } from '@electron-toolkit/preload'

// P2P功能已被移除

// 更新器 API 类型定义
interface UpdaterAPI {
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

// 扩展的 ElectronAPI
interface ExtendedElectronAPI extends ElectronAPI {
  // P2P功能已被移除
  updater: UpdaterAPI
}

// 兼容的 electronAPI 类型定义（旧版API格式）
interface LegacyElectronAPI {
  invoke: (channel: string, ...args: unknown[]) => Promise<unknown>
  send: (channel: string, ...args: unknown[]) => void
  on: (channel: string, listener: (...args: unknown[]) => void) => void
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
