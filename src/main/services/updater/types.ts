/**
 * 更新状态枚举
 */
export enum UpdateStatus {
  IDLE = 'idle',
  CHECKING = 'checking',
  AVAILABLE = 'available',
  NOT_AVAILABLE = 'not-available',
  DOWNLOADING = 'downloading',
  DOWNLOADED = 'downloaded',
  ERROR = 'error'
}

/**
 * 更新信息接口
 */
export interface UpdateInfo {
  version: string
  releaseDate?: string
  releaseNotes?: string
  releaseName?: string
  releaseNotesFile?: string
  stagingPercentage?: number
  files: Array<{
    url: string
    sha512: string
    size: number
    blockMapSize?: number
  }>
  path: string
  sha512: string
  downloadedFile?: string
}

/**
 * 下载进度信息接口
 */
export interface ProgressInfo {
  total: number
  delta: number
  transferred: number
  percent: number
  bytesPerSecond: number
}

/**
 * 更新事件类型
 */
export interface UpdateEvents {
  'update-available': UpdateInfo
  'update-not-available': UpdateInfo
  'update-downloaded': UpdateInfo
  'download-progress': ProgressInfo
  error: Error
  'checking-for-update': void
  'update-cancelled': void
}

/**
 * 更新配置接口
 */
export interface UpdaterConfig {
  autoDownload?: boolean
  autoInstallOnAppQuit?: boolean
  allowPrerelease?: boolean
  allowDowngrade?: boolean
  requestHeaders?: Record<string, string>
  timeout?: number
}

/**
 * 更新状态信息接口
 */
export interface UpdateStatusInfo {
  status: UpdateStatus
  currentVersion: string
  availableVersion?: string
  downloadProgress?: ProgressInfo
  error?: string
  lastChecked?: Date
}
