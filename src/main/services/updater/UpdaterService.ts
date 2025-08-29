/**
 * 自动更新服务
 * 负责检查和下载应用程序更新
 */

import { app, BrowserWindow, dialog, ipcMain } from 'electron'
import { autoUpdater, UpdateInfo } from 'electron-updater'
import { loggerService } from '../logger/LoggerService'
import {
  getUpdateConfig,
  validateUpdateConfig,
  saveUpdateConfig,
  getSavedUpdateConfig
} from '../../config/update.config'

export interface UpdateStatus {
  checking: boolean
  available: boolean
  downloading: boolean
  downloaded: boolean
  error: string | null
  progress: {
    percent: number
    bytesPerSecond: number
    total: number
    transferred: number
  } | null
  updateInfo: UpdateInfo | null
}

/**
 * 自动更新服务类
 */
class UpdaterService {
  private mainWindow: BrowserWindow | null = null
  private updateStatus: UpdateStatus = {
    checking: false,
    available: false,
    downloading: false,
    downloaded: false,
    error: null,
    progress: null,
    updateInfo: null
  }

  /**
   * 初始化更新服务
   */
  async initialize(): Promise<void> {
    try {
      loggerService.info('Initializing updater service...')

      // 获取并验证配置
      const config = getUpdateConfig()
      if (!validateUpdateConfig(config)) {
        throw new Error('Invalid update configuration')
      }

      // 始终注册 IPC 处理器，即使更新功能被禁用
      this.registerIpcHandlers()

      if (!config.enabled) {
        loggerService.info('Auto-updater is disabled by configuration')
        this.updateStatus.error = 'Auto-updater is disabled'
        loggerService.info('UpdaterService initialized successfully (disabled mode)')
        return
      }

      // 配置自动更新器
      this.configureAutoUpdater()

      // 注册事件监听器
      this.registerEventListeners()

      // 设置定时检查更新
      if (config.checkInterval > 0) {
        setInterval(() => {
          this.checkForUpdates()
        }, config.checkInterval)
      }

      loggerService.info('UpdaterService initialized successfully')
    } catch (error) {
      loggerService.error('Failed to initialize updater service:', error)
      this.updateStatus.error = error instanceof Error ? error.message : 'Unknown error'
    }
  }

  /**
   * 配置自动更新器
   */
  private configureAutoUpdater(): void {
    // 获取配置
    const config = getUpdateConfig()

    // 设置更新服务器地址
    if (config.serverUrl !== 'http://175.178.158.23:19000//electron-updates') {
      autoUpdater.setFeedURL({
        provider: 'generic',
        url: config.serverUrl
      })
    }

    // 开发环境下禁用自动更新
    if (process.env.NODE_ENV === 'development') {
      autoUpdater.updateConfigPath = null
      autoUpdater.autoDownload = false
      autoUpdater.autoInstallOnAppQuit = false
    } else {
      // 生产环境配置
      autoUpdater.autoDownload = config.autoDownload
      autoUpdater.autoInstallOnAppQuit = config.autoInstallOnAppQuit
      autoUpdater.allowPrerelease = config.allowPrerelease
      autoUpdater.allowDowngrade = config.allowDowngrade
      autoUpdater.channel = config.channel
    }

    loggerService.info('AutoUpdater configured')
  }

  /**
   * 注册事件监听器
   */
  private registerEventListeners(): void {
    // 检查更新开始
    autoUpdater.on('checking-for-update', () => {
      this.updateStatus.checking = true
      this.updateStatus.error = null
      this.sendStatusToRenderer()
      loggerService.info('Checking for updates...')
    })

    // 发现可用更新
    autoUpdater.on('update-available', (info: UpdateInfo) => {
      this.updateStatus.checking = false
      this.updateStatus.available = true
      this.updateStatus.updateInfo = info
      this.sendStatusToRenderer()
      loggerService.info('Update available:', info.version)

      // 显示更新通知
      this.showUpdateNotification(info)
    })

    // 没有可用更新
    autoUpdater.on('update-not-available', (info: UpdateInfo) => {
      this.updateStatus.checking = false
      this.updateStatus.available = false
      this.updateStatus.updateInfo = info
      this.sendStatusToRenderer()
      loggerService.info('Update not available')
    })

    // 更新下载进度
    autoUpdater.on('download-progress', (progressObj) => {
      this.updateStatus.downloading = true
      this.updateStatus.progress = {
        percent: progressObj.percent,
        bytesPerSecond: progressObj.bytesPerSecond,
        total: progressObj.total,
        transferred: progressObj.transferred
      }
      this.sendStatusToRenderer()
      loggerService.info(`Download progress: ${progressObj.percent.toFixed(2)}%`)
    })

    // 更新下载完成
    autoUpdater.on('update-downloaded', (info: UpdateInfo) => {
      this.updateStatus.downloading = false
      this.updateStatus.downloaded = true
      this.updateStatus.updateInfo = info
      this.sendStatusToRenderer()
      loggerService.info('Update downloaded')

      // 显示安装确认对话框
      this.showInstallConfirmation(info)
    })

    // 更新错误
    autoUpdater.on('error', (error) => {
      this.updateStatus.checking = false
      this.updateStatus.downloading = false
      this.updateStatus.error = error.message
      this.sendStatusToRenderer()
      loggerService.error('Update error:', error)

      // 显示错误对话框
      this.showErrorDialog(error)
    })
  }

  /**
   * 注册 IPC 处理器
   */
  private registerIpcHandlers(): void {
    // 检查更新
    ipcMain.handle('updater:check-for-updates', async () => {
      const config = getUpdateConfig()
      if (!config.enabled) {
        return {
          success: false,
          error: 'Auto-updater is disabled'
        }
      }

      try {
        await this.checkForUpdates()
        return { success: true }
      } catch (error) {
        loggerService.error('Failed to check for updates:', error)
        return {
          success: false,
          error: error instanceof Error ? error.message : String(error)
        }
      }
    })

    // 下载更新
    ipcMain.handle('updater:download-update', async () => {
      const config = getUpdateConfig()
      if (!config.enabled) {
        return {
          success: false,
          error: 'Auto-updater is disabled'
        }
      }

      try {
        await this.downloadUpdate()
        return { success: true }
      } catch (error) {
        loggerService.error('Failed to download update:', error)
        return {
          success: false,
          error: error instanceof Error ? error.message : String(error)
        }
      }
    })

    // 安装更新
    ipcMain.handle('updater:install-update', async () => {
      const config = getUpdateConfig()
      if (!config.enabled) {
        return {
          success: false,
          error: 'Auto-updater is disabled'
        }
      }

      try {
        this.installUpdate()
        return { success: true }
      } catch (error) {
        loggerService.error('Failed to install update:', error)
        return {
          success: false,
          error: error instanceof Error ? error.message : String(error)
        }
      }
    })

    // 获取更新状态
    ipcMain.handle('updater:get-status', () => {
      return this.updateStatus
    })

    // 获取应用版本
    ipcMain.handle('updater:get-version', () => {
      return app.getVersion()
    })

    // 获取更新配置
    ipcMain.handle('updater:get-config', () => {
      return getSavedUpdateConfig()
    })

    // 更新配置
    ipcMain.handle('updater:update-config', async (_, config) => {
      try {
        // 验证并保存配置
        const saved = saveUpdateConfig(config)
        if (!saved) {
          return { success: false, error: 'Failed to save configuration' }
        }

        // 重新配置自动更新器以应用新配置
        this.configureAutoUpdater()

        loggerService.info('Update configuration saved successfully')
        return { success: true }
      } catch (error) {
        loggerService.error('Failed to update config:', error)
        return {
          success: false,
          error: error instanceof Error ? error.message : String(error)
        }
      }
    })
  }

  /**
   * 检查更新
   */
  async checkForUpdates(): Promise<void> {
    if (process.env.NODE_ENV === 'development') {
      loggerService.info('Skipping update check in development mode')
      return
    }

    try {
      await autoUpdater.checkForUpdates()
    } catch (error) {
      loggerService.error('Error checking for updates:', error)
      throw error
    }
  }

  /**
   * 下载更新
   */
  async downloadUpdate(): Promise<void> {
    if (!this.updateStatus.available) {
      throw new Error('No update available')
    }

    try {
      await autoUpdater.downloadUpdate()
    } catch (error) {
      loggerService.error('Error downloading update:', error)
      throw error
    }
  }

  /**
   * 安装更新
   */
  installUpdate(): void {
    if (!this.updateStatus.downloaded) {
      throw new Error('No update downloaded')
    }

    autoUpdater.quitAndInstall()
  }

  /**
   * 发送状态到渲染进程
   */
  private sendStatusToRenderer(): void {
    if (this.mainWindow && !this.mainWindow.isDestroyed()) {
      this.mainWindow.webContents.send('updater:status-changed', this.updateStatus)
    }
  }

  /**
   * 显示更新通知
   */
  private showUpdateNotification(info: UpdateInfo): void {
    if (!this.mainWindow || this.mainWindow.isDestroyed()) return

    const response = dialog.showMessageBoxSync(this.mainWindow, {
      type: 'info',
      title: '发现新版本',
      message: `发现新版本 ${info.version}`,
      detail: `当前版本: ${app.getVersion()}\n新版本: ${info.version}\n\n是否立即下载更新？`,
      buttons: ['立即下载', '稍后提醒', '跳过此版本'],
      defaultId: 0,
      cancelId: 1
    })

    switch (response) {
      case 0: // 立即下载
        this.downloadUpdate().catch((error) => {
          loggerService.error('Failed to download update:', error)
        })
        break
      case 1: // 稍后提醒
        // 不做任何操作，用户可以稍后手动检查
        break
      case 2: // 跳过此版本
        // 可以在这里记录跳过的版本，避免再次提醒
        loggerService.info(`User skipped version ${info.version}`)
        break
    }
  }

  /**
   * 显示安装确认对话框
   */
  private showInstallConfirmation(info: UpdateInfo): void {
    if (!this.mainWindow || this.mainWindow.isDestroyed()) return

    const response = dialog.showMessageBoxSync(this.mainWindow, {
      type: 'info',
      title: '更新已下载',
      message: `新版本 ${info.version} 已下载完成`,
      detail: '是否立即重启应用以安装更新？',
      buttons: ['立即重启', '稍后重启'],
      defaultId: 0,
      cancelId: 1
    })

    if (response === 0) {
      this.installUpdate()
    }
  }

  /**
   * 显示错误对话框
   */
  private showErrorDialog(error: Error): void {
    if (!this.mainWindow || this.mainWindow.isDestroyed()) return

    dialog.showMessageBoxSync(this.mainWindow, {
      type: 'error',
      title: '更新失败',
      message: '检查更新时发生错误',
      detail: error.message,
      buttons: ['确定']
    })
  }

  /**
   * 设置主窗口
   */
  setMainWindow(mainWindow: BrowserWindow): void {
    this.mainWindow = mainWindow
    loggerService.info('Main window set for updater service')
  }

  /**
   * 启动时自动检查更新
   */
  async autoCheckForUpdates(): Promise<void> {
    const config = getUpdateConfig()

    if (!config.enabled || !config.autoCheckOnStartup) {
      loggerService.info('Auto check for updates is disabled')
      return
    }

    // 延迟指定时间后自动检查更新，避免影响应用启动速度
    setTimeout(() => {
      this.checkForUpdates().catch((error) => {
        loggerService.error('Auto check for updates failed:', error)
      })
    }, config.startupDelay)
  }

  /**
   * 清理资源
   */
  async shutdown(): Promise<void> {
    // 移除所有事件监听器
    autoUpdater.removeAllListeners()

    // 移除 IPC 处理器
    ipcMain.removeHandler('updater:check-for-updates')
    ipcMain.removeHandler('updater:download-update')
    ipcMain.removeHandler('updater:install-update')
    ipcMain.removeHandler('updater:get-status')
    ipcMain.removeHandler('updater:get-version')
    ipcMain.removeHandler('updater:get-config')
    ipcMain.removeHandler('updater:update-config')

    loggerService.info('UpdaterService shutdown')
  }

  /**
   * 清理资源（cleanup 方法别名）
   */
  async cleanup(): Promise<void> {
    await this.shutdown()
  }
}

export const updaterService = new UpdaterService()
