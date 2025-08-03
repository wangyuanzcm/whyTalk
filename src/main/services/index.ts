import { BrowserWindow } from 'electron'
import { databaseManager } from './database/Database'
import { authService } from './auth/AuthService'
import { chatService } from './chat/ChatService'
import { userService } from './user/UserService'
import { contactService } from './contact/ContactService'
import { groupService } from './group/GroupService'
import { uploadService } from './upload/UploadService'
import { ipcHandler } from './ipc/IPCHandler'
import { P2PServiceClient } from './p2p/P2PServiceClient'
import { P2PIPCBridge } from './p2p/P2PIPCBridge'
import { ensureDirectories } from '../config'

export class ServiceManager {
  private static instance: ServiceManager
  private isInitialized = false
  private p2pServiceClient: P2PServiceClient | null = null
  private p2pIPCBridge: P2PIPCBridge | null = null

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
      
      // 初始化IPC处理器
      console.log('IPC handler initialized')
      
      // 初始化P2P服务客户端
    this.p2pServiceClient = new P2PServiceClient()
    
    // 初始化P2P IPC桥接器
    this.p2pIPCBridge = new P2PIPCBridge(this.p2pServiceClient)
      await this.p2pServiceClient.start()
      console.log('P2P service client initialized')
      
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
      
      // 停止P2P服务客户端
      if (this.p2pServiceClient) {
        await this.p2pServiceClient.stop()
        console.log('P2P service client stopped')
      }
      
      // 清理P2P IPC桥接器
      if (this.p2pIPCBridge) {
        await this.p2pIPCBridge.cleanup()
        console.log('P2P IPC bridge cleaned up')
      }
      
      // 关闭数据库连接
      await databaseManager.close()
      
      this.isInitialized = false
      console.log('All services shut down successfully')
    } catch (error) {
      console.error('Failed to shutdown services:', error)
      throw error
    }
  }

  private startScheduledTasks(): void {
    // 每5分钟清理离线用户状态
    setInterval(() => {
      userService.cleanupOfflineUsers().catch(error => {
        console.error('Failed to cleanup offline users:', error)
      })
    }, 5 * 60 * 1000)

    // 每小时优化数据库
    setInterval(() => {
      databaseManager.optimize().catch(error => {
        console.error('Failed to optimize database:', error)
      })
    }, 60 * 60 * 1000)
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

  public getChatService() {
    return chatService
  }

  public getUserService() {
    return userService
  }

  public getContactService() {
    return contactService
  }

  public getGroupService() {
    return groupService
  }

  public getUploadService() {
    return uploadService
  }

  public getIPCHandler() {
    return ipcHandler
  }

  public getP2PServiceClient(): P2PServiceClient | null {
    return this.p2pServiceClient
  }

  public setMainWindow(mainWindow: BrowserWindow): void {
    if (this.p2pIPCBridge) {
      this.p2pIPCBridge.setMainWindow(mainWindow)
    }
  }
}

export const serviceManager = ServiceManager.getInstance()

// 导出所有服务
export {
  databaseManager,
  authService,
  chatService,
  userService,
  contactService,
  groupService,
  uploadService,
  ipcHandler
}