import { BrowserWindow } from 'electron'
import { databaseManager } from './database/Database'
import { authService } from './auth/AuthService'
import { userService } from './user/UserService'
import { uploadService } from './upload/UploadService'
import { loggerService } from './logger/LoggerService'
import { updaterService } from './updater/UpdaterService'
// settingsService removed - functionality moved to user preferences
// pluginManager removed - functionality integrated into plugin services
// import { p2pManager } from './p2p/P2PManager' // 替换为LocalSend实现
import { localSendP2PManager as p2pManager } from './p2p/LocalSendP2PManager'
import { localSendIPCHandler } from './p2p/LocalSendIPCHandler'
// 插件相关服务已移除，VSCode风格插件系统使用独立的管理器
import { ipcHandler } from './ipc/IPCHandler'
// P2PServiceClient and P2PIPCBridge removed - using LocalSend implementation
import { ensureDirectories } from '../config'

export class ServiceManager {
  private static instance: ServiceManager
  private isInitialized = false
  // P2P service client and bridge removed - using LocalSend implementation

  public static getInstance(): ServiceManager {
    if (!ServiceManager.instance) {
      ServiceManager.instance = new ServiceManager()
    }
    return ServiceManager.instance
  }

  public async initialize(): Promise<void> {
    if (this.isInitialized) {
      return
    }

    try {
      console.log('Initializing services...')

      // 确保必要的目录存在
      ensureDirectories()
      console.log('Directories ensured')

      // 初始化数据库
      await databaseManager.initialize()
      console.log('Database initialized')

      // 启动定时任务
      this.startScheduledTasks()
      console.log('Scheduled tasks started')

      // 初始化所有服务
      await authService.initialize()
      await userService.initialize()
      await uploadService.initialize()
      
      // 初始化更新服务
      await updaterService.initialize()
      console.log('Updater service initialized')

      // 插件服务初始化已移除，VSCode风格插件系统独立管理
      
      // 初始化 LocalSend IPC 处理器
      localSendIPCHandler.initialize()
      console.log('LocalSend IPC handler initialized')
      
      await p2pManager.start()
      console.log('LocalSend P2P Manager started')

      // 初始化IPC处理器 - ipcHandler在导入时就会自动初始化
      // 这里只需要确保模块被加载
      console.log('IPC handler initialized:', !!ipcHandler)

      // P2P服务现在使用LocalSend实现
      console.log('P2P Service using LocalSend implementation')

      // 启动定时任务
      this.startScheduledTasks()
      console.log('Scheduled tasks started')

      this.isInitialized = true
      console.log('All services initialized successfully')
    } catch (error) {
      console.error('Failed to initialize services:', error)
      throw error
    }
  }

  public async shutdown(): Promise<void> {
    if (!this.isInitialized) {
      return
    }

    try {
      console.log('Shutting down services...')

      // 停止定时任务
      this.stopScheduledTasks()

      // P2P服务清理现在由LocalSend管理器处理
      console.log('P2P Service cleanup handled by LocalSend manager')

      // 清理所有服务
      await p2pManager.cleanup()
      localSendIPCHandler.cleanup()
      // 插件服务清理已移除，VSCode风格插件系统独立管理
      await updaterService.cleanup()
      await uploadService.cleanup()
      await userService.cleanup()
      await authService.cleanup()

      // 关闭数据库连接
      await databaseManager.cleanup()

      this.isInitialized = false
      console.log('All services shut down successfully')
    } catch (error) {
      console.error('Failed to shutdown services:', error)
      throw error
    }
  }

  private startScheduledTasks(): void {
    // 每5分钟清理离线用户状态
    setInterval(
      () => {
        userService.cleanupOfflineUsers().catch((error) => {
          console.error('Failed to cleanup offline users:', error)
        })
      },
      5 * 60 * 1000
    )

    // 每小时优化数据库
    setInterval(
      () => {
        databaseManager.optimize().catch((error) => {
          console.error('Failed to optimize database:', error)
        })
      },
      60 * 60 * 1000
    )
  }

  private stopScheduledTasks(): void {
    // 清理所有定时器
    // 注意：在实际应用中，你可能需要保存定时器ID并在这里清理
  }

  public getDatabaseManager() {
    return databaseManager
  }

  public getAuthService() {
    return authService
  }

  public getUserService() {
    return userService
  }

  public getUploadService() {
    return uploadService
  }

  public getUpdaterService() {
    return updaterService
  }

  public getP2PManager() {
    return p2pManager
  }

  public getLocalSendIPCHandler() {
    return localSendIPCHandler
  }

  public setMainWindow(_mainWindow: BrowserWindow): void {
    // P2P IPC bridge removed - using LocalSend implementation
  }
}

export const serviceManager = ServiceManager.getInstance()

// 导出所有服务
export {
  databaseManager,
  authService,
  userService,
  uploadService,
  updaterService,
  loggerService,
  // settingsService removed
  // pluginManager removed
  p2pManager,
  // 插件服务导出已移除，VSCode风格插件系统独立管理
  ipcHandler
}
