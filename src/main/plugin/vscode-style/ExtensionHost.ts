import { EventEmitter } from 'events'
import { ipcMain } from 'electron'
import * as path from 'path'
import type {
  ExtensionInstance
} from './types'
import { ContributionPointManager } from './ContributionPointManager'
import { ActivationEventManager } from './ActivationEventManager'
import { APIProvider } from './APIProvider'
import { ExtensionLoader, ExtensionState } from './ExtensionLoader'

/**
 * 扩展主机
 * 负责管理所有扩展的生命周期，包括加载、激活、停用和卸载
 */
export class ExtensionHost extends EventEmitter {
  private static instance: ExtensionHost
  
  /** 已激活的扩展映射 */
  private activatedExtensions = new Map<string, any>()
  
  /** 扩展加载器 */
  private extensionLoader: ExtensionLoader
  
  /** 贡献点管理器 */
  private contributionPointManager: ContributionPointManager
  
  /** 激活事件管理器 */
  private activationEventManager: ActivationEventManager
  
  /** API提供者 */
  private apiProvider: APIProvider
  
  /** 是否已初始化 */
  private isInitialized = false

  private constructor() {
    super()
    this.extensionLoader = ExtensionLoader.getInstance()
    this.contributionPointManager = ContributionPointManager.getInstance()
    this.activationEventManager = ActivationEventManager.getInstance()
    this.apiProvider = APIProvider.getInstance()
  }

  /**
   * 获取单例实例
   */
  public static getInstance(): ExtensionHost {
    if (!ExtensionHost.instance) {
      ExtensionHost.instance = new ExtensionHost()
    }
    return ExtensionHost.instance
  }

  /**
   * 初始化扩展主机
   */
  public async initialize(): Promise<void> {
    if (this.isInitialized) {
      console.warn('[ExtensionHost] 扩展主机已经初始化')
      return
    }

    try {
      console.log('[ExtensionHost] 初始化扩展主机...')
      
      // 设置IPC处理器
      this.setupIpcHandlers()
      
      // 设置事件监听器
      this.setupEventListeners()
      
      // 加载所有扩展
      await this.loadAllExtensions()
      
      this.isInitialized = true
      console.log('[ExtensionHost] 扩展主机初始化完成')
      
      this.emit('initialized')
      
      // 标记启动完成，触发相关激活事件
      this.markStartupFinished()
    } catch (error) {
      console.error('[ExtensionHost] 扩展主机初始化失败:', error)
      throw error
    }
  }

  /**
   * 设置IPC处理器
   */
  private setupIpcHandlers(): void {
    // 获取所有扩展
    ipcMain.handle('extension-host:getAllExtensions', () => {
      return this.extensionLoader.getAllExtensions()
    })

    // 获取扩展信息
    ipcMain.handle('extension-host:getExtension', (_event, extensionId: string) => {
      return this.extensionLoader.getExtension(extensionId)
    })

    // 激活扩展
    ipcMain.handle('extension-host:activateExtension', async (_event, extensionId: string) => {
      return await this.activateExtension(extensionId)
    })

    // 停用扩展
    ipcMain.handle('extension-host:deactivateExtension', async (_event, extensionId: string) => {
      return await this.deactivateExtension(extensionId)
    })

    // 重新加载扩展
    ipcMain.handle('extension-host:reloadExtension', async (_event, extensionId: string) => {
      return await this.reloadExtension(extensionId)
    })

    // 获取扩展统计信息
    ipcMain.handle('extension-host:getStats', () => {
      return this.getStats()
    })

    // 安装扩展
    ipcMain.handle('extension-host:installExtension', async (_event, extensionPath: string) => {
      return await this.installExtension(extensionPath)
    })

    // 卸载扩展
    ipcMain.handle('extension-host:uninstallExtension', async (_event, extensionId: string) => {
      return await this.uninstallExtension(extensionId)
    })
  }

  /**
   * 设置事件监听器
   */
  private setupEventListeners(): void {
    // 监听扩展加载器事件
    this.extensionLoader.on('extensionLoaded', (extension: ExtensionInstance) => {
      this.onExtensionLoaded(extension)
    })

    this.extensionLoader.on('extensionUnloaded', (extension: ExtensionInstance) => {
      this.onExtensionUnloaded(extension)
    })

    this.extensionLoader.on('extensionLoadFailed', (extensionPath: string, error: any) => {
      console.error(`[ExtensionHost] 扩展加载失败: ${extensionPath}`, error)
      this.emit('extensionLoadFailed', extensionPath, error)
    })

    // 监听激活事件管理器的扩展激活事件
    this.activationEventManager.on('extensionActivated', (extensionId: string, eventPattern: string) => {
      console.log(`[ExtensionHost] 扩展 ${extensionId} 因事件 ${eventPattern} 被激活`)
    })

    // 监听激活事件管理器的扩展激活失败事件
    this.activationEventManager.on('extensionActivationFailed', (extensionId: string, eventPattern: string, error: any) => {
      console.error(`[ExtensionHost] 扩展 ${extensionId} 因事件 ${eventPattern} 激活失败:`, error)
    })
  }

  /**
   * 加载所有扩展
   */
  public async loadAllExtensions(): Promise<void> {
    await this.extensionLoader.loadAllExtensions()
  }

  /**
   * 扩展加载完成处理
   * @param extension 扩展实例
   */
  private onExtensionLoaded(extension: ExtensionInstance): void {
    try {
      // 注册激活事件
      if (extension.activationEvents.length > 0) {
        this.registerActivationEvents(extension.id, extension.activationEvents)
      }
      
      // 注册贡献点
      if (extension.manifest.contributes) {
        this.registerContributionPoints(extension.id, extension.manifest.contributes)
      }
      
      console.log(`[ExtensionHost] 扩展 ${extension.id} 处理完成`)
      this.emit('extensionLoaded', extension)
    } catch (error) {
      console.error(`[ExtensionHost] 处理扩展 ${extension.id} 失败:`, error)
    }
  }

  /**
   * 扩展卸载处理
   * @param extension 扩展实例
   */
  private onExtensionUnloaded(extension: ExtensionInstance): void {
    // 停用扩展
    if (this.activatedExtensions.has(extension.id)) {
      this.deactivateExtension(extension.id).catch(error => {
        console.error(`[ExtensionHost] 停用扩展 ${extension.id} 失败:`, error)
      })
    }
    
    // 取消注册激活事件
    this.activationEventManager.unregisterActivationEvents(extension.id)
    
    // 取消注册贡献点
    this.contributionPointManager.unregisterContributions(extension.id)
    
    this.emit('extensionUnloaded', extension)
  }

  /**
   * 安装扩展
   * @param extensionPath 扩展路径或npm包名
   */
  public async installExtension(extensionPath: string): Promise<ExtensionInstance | null> {
    // TODO: 实现从npm安装扩展的逻辑
    console.log(`[ExtensionHost] 安装扩展: ${extensionPath}`)
    
    // 如果是本地路径，直接加载
    if (path.isAbsolute(extensionPath)) {
      return await this.extensionLoader.loadExtension(extensionPath, false)
    }
    
    // TODO: 实现从npm下载和安装扩展
    throw new Error('从npm安装扩展功能尚未实现')
  }

  /**
   * 卸载扩展
   * @param extensionId 扩展ID
   */
  public async uninstallExtension(extensionId: string): Promise<void> {
    const extension = this.extensionLoader.getExtension(extensionId)
    if (!extension) {
      throw new Error(`扩展 ${extensionId} 未找到`)
    }

    // 内置扩展不能卸载
    if (extension.isBuiltin) {
      throw new Error(`内置扩展 ${extensionId} 不能卸载`)
    }

    // 停用并卸载扩展
    if (this.activatedExtensions.has(extensionId)) {
      await this.deactivateExtension(extensionId)
    }
    
    this.extensionLoader.unloadExtension(extensionId)
    
    // TODO: 删除扩展文件
    console.log(`[ExtensionHost] 扩展 ${extensionId} 卸载成功`)
    this.emit('extensionUninstalled', extension)
  }

  /**
   * 激活扩展
   * @param extensionId 扩展ID
   */
  public async activateExtension(extensionId: string): Promise<any> {
    const extension = this.extensionLoader.getExtension(extensionId)
    if (!extension) {
      throw new Error(`扩展 ${extensionId} 未找到`)
    }

    // 检查是否已激活
    if (this.activatedExtensions.has(extensionId)) {
      console.warn(`[ExtensionHost] 扩展 ${extensionId} 已经激活`)
      return this.activatedExtensions.get(extensionId)
    }

    try {
      console.log(`[ExtensionHost] 激活扩展: ${extensionId}`)
      
      // 创建扩展上下文
      const context = this.extensionLoader.createExtensionContext(extension)
      extension.context = context
      
      // 创建扩展API
      const api = this.apiProvider.createExtensionAPI(extensionId, context)
      
      let exports: any = undefined
      
      // 如果有主入口文件，加载并执行
      if (extension.mainPath) {
        const extensionModule = await this.loadExtensionModule(extension.mainPath)
        
        if (extensionModule && typeof extensionModule.activate === 'function') {
          exports = await extensionModule.activate(context, api)
        }
      }
      
      // 标记为已激活
      extension.isActive = true
      extension.activationTime = Date.now()
      this.activatedExtensions.set(extensionId, exports)
      this.extensionLoader.setExtensionState(extensionId, ExtensionState.Activated)
      
      console.log(`[ExtensionHost] 扩展 ${extensionId} 激活成功`)
      this.emit('extensionActivated', extension, exports)
      
      return exports
    } catch (error) {
      console.error(`[ExtensionHost] 激活扩展 ${extensionId} 失败:`, error)
      extension.error = error instanceof Error ? error.message : String(error)
      this.extensionLoader.setExtensionState(extensionId, ExtensionState.Failed)
      this.emit('extensionActivationFailed', extension, error)
      throw error
    }
  }

  /**
   * 停用扩展
   * @param extensionId 扩展ID
   */
  public async deactivateExtension(extensionId: string): Promise<void> {
    const extension = this.extensionLoader.getExtension(extensionId)
    if (!extension) {
      console.warn(`[ExtensionHost] 扩展 ${extensionId} 未找到`)
      return
    }

    if (!this.activatedExtensions.has(extensionId)) {
      console.warn(`[ExtensionHost] 扩展 ${extensionId} 未激活`)
      return
    }

    try {
      console.log(`[ExtensionHost] 停用扩展: ${extensionId}`)
      
      // 如果有主入口文件，调用deactivate函数
      if (extension.mainPath) {
        const extensionModule = await this.loadExtensionModule(extension.mainPath)
        
        if (extensionModule && typeof extensionModule.deactivate === 'function') {
          await extensionModule.deactivate()
        }
      }
      
      // 清理扩展上下文
      if (extension.context) {
        for (const subscription of extension.context.subscriptions) {
          try {
            subscription.dispose()
          } catch (error) {
            console.error(`[ExtensionHost] 清理扩展 ${extensionId} 订阅失败:`, error)
          }
        }
      }
      
      // 清理API
      this.apiProvider.cleanupExtensionAPI(extensionId)
      
      // 标记为未激活
      extension.isActive = false
      this.activatedExtensions.delete(extensionId)
      this.extensionLoader.setExtensionState(extensionId, ExtensionState.Deactivated)
      
      console.log(`[ExtensionHost] 扩展 ${extensionId} 停用成功`)
      this.emit('extensionDeactivated', extension)
    } catch (error) {
      console.error(`[ExtensionHost] 停用扩展 ${extensionId} 失败:`, error)
      throw error
    }
  }

  /**
   * 重新加载扩展
   * @param extensionId 扩展ID
   */
  public async reloadExtension(extensionId: string): Promise<ExtensionInstance | null> {
    const extension = this.extensionLoader.getExtension(extensionId)
    if (!extension) {
      throw new Error(`扩展 ${extensionId} 未找到`)
    }

    // 停用扩展
    if (this.activatedExtensions.has(extensionId)) {
      await this.deactivateExtension(extensionId)
    }
    
    // 重新加载扩展
    return await this.extensionLoader.reloadExtension(extensionId)
  }

  /**
   * 注册激活事件
   * @param extensionId 扩展ID
   * @param activationEvents 激活事件列表
   */
  private registerActivationEvents(extensionId: string, activationEvents: string[]): void {
    this.activationEventManager.registerActivationEvents(
      extensionId,
      activationEvents,
      () => this.activateExtension(extensionId)
    )
  }

  /**
   * 注册贡献点
   * @param extensionId 扩展ID
   * @param contributes 贡献点配置
   */
  private registerContributionPoints(extensionId: string, contributes: any): void {
    this.contributionPointManager.registerContributions(extensionId, contributes)
  }

  /**
   * 加载扩展模块
   * @param mainPath 主入口文件路径
   */
  private async loadExtensionModule(mainPath: string): Promise<any> {
    try {
      // 清除require缓存以支持热重载
      delete require.cache[require.resolve(mainPath)]
      
      // 加载模块
      return require(mainPath)
    } catch (error) {
      console.error(`[ExtensionHost] 加载扩展模块 ${mainPath} 失败:`, error)
      throw error
    }
  }

  /**
   * 获取扩展
   * @param extensionId 扩展ID
   */
  public getExtension(extensionId: string): ExtensionInstance | undefined {
    return this.extensionLoader.getExtension(extensionId)
  }

  /**
   * 获取所有扩展
   */
  public getAllExtensions(): ExtensionInstance[] {
    return this.extensionLoader.getAllExtensions()
  }

  /**
   * 获取已激活的扩展
   */
  public getActivatedExtensions(): string[] {
    return Array.from(this.activatedExtensions.keys())
  }

  /**
   * 检查扩展是否已激活
   * @param extensionId 扩展ID
   */
  public isExtensionActivated(extensionId: string): boolean {
    return this.activatedExtensions.has(extensionId)
  }

  /**
   * 启动完成，触发相关激活事件
   */
  public markStartupFinished(): void {
    this.activationEventManager.markStartupFinished()
  }

  /**
   * 清理所有扩展
   */
  public async clear(): Promise<void> {
    // 停用所有激活的扩展
    const activatedExtensionIds = Array.from(this.activatedExtensions.keys())
    for (const extensionId of activatedExtensionIds) {
      try {
        await this.deactivateExtension(extensionId)
      } catch (error) {
        console.error(`[ExtensionHost] 停用扩展 ${extensionId} 失败:`, error)
      }
    }

    // 清理所有数据
    this.activatedExtensions.clear()
    this.extensionLoader.clear()
    this.contributionPointManager.clear()
    this.activationEventManager.clear()
    
    this.emit('cleared')
    console.log('[ExtensionHost] 已清理所有扩展')
  }

  /**
   * 获取统计信息
   */
  public getStats(): {
    loader: any
    contributions: any
    activations: any
    api: any
    activated: number
  } {
    return {
      loader: this.extensionLoader.getStats(),
      contributions: this.contributionPointManager.getStats(),
      activations: this.activationEventManager.getStats(),
      api: this.apiProvider.getStats(),
      activated: this.activatedExtensions.size
    }
  }
}