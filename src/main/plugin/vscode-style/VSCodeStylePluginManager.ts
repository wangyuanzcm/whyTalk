import { EventEmitter } from 'events'
import { app } from 'electron'
import * as path from 'path'
import { ExtensionHost } from './ExtensionHost'
import { ExtensionLoader } from './ExtensionLoader'
import { ContributionPointManager } from './ContributionPointManager'
import { ActivationEventManager } from './ActivationEventManager'
import { APIProvider } from './APIProvider'
import type { ExtensionInstance } from './types'

/**
 * VSCode风格插件管理器
 * 负责整合所有VSCode风格插件系统组件，提供统一的插件管理接口
 */
export class VSCodeStylePluginManager extends EventEmitter {
  private static instance: VSCodeStylePluginManager

  /** 扩展主机 */
  private extensionHost: ExtensionHost

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

  /** 插件目录路径 */
  private builtinExtensionsPath: string
  private userExtensionsPath: string

  private constructor() {
    super()

    // 获取单例实例
    this.extensionHost = ExtensionHost.getInstance()
    this.extensionLoader = ExtensionLoader.getInstance()
    this.contributionPointManager = ContributionPointManager.getInstance()
    this.activationEventManager = ActivationEventManager.getInstance()
    this.apiProvider = APIProvider.getInstance()

    // 设置插件目录路径
    const isDev = !app.isPackaged
    if (isDev) {
      this.builtinExtensionsPath = path.join(process.cwd(), 'extensions')
      this.userExtensionsPath = path.join(process.cwd(), 'user-extensions')
    } else {
      this.builtinExtensionsPath = path.join(process.resourcesPath, 'extensions')
      // 修改：将用户插件安装到软件安装目录而不是用户数据目录
      this.userExtensionsPath = path.join(process.resourcesPath, 'user-extensions')
    }
  }

  /**
   * 获取单例实例
   */
  public static getInstance(): VSCodeStylePluginManager {
    if (!VSCodeStylePluginManager.instance) {
      VSCodeStylePluginManager.instance = new VSCodeStylePluginManager()
    }
    return VSCodeStylePluginManager.instance
  }

  /**
   * 初始化插件管理器
   */
  public async initialize(): Promise<void> {
    if (this.isInitialized) {
      console.warn('[VSCodeStylePluginManager] 插件管理器已经初始化')
      return
    }

    try {
      console.log('[VSCodeStylePluginManager] 初始化插件管理器...')

      // ExtensionLoader在构造函数中已经设置了扩展目录路径
      // 无需手动设置

      // 设置事件监听器
      this.setupEventListeners()

      // 初始化扩展主机
      await this.extensionHost.initialize()

      this.isInitialized = true
      console.log('[VSCodeStylePluginManager] 插件管理器初始化完成')

      this.emit('initialized')
    } catch (error) {
      console.error('[VSCodeStylePluginManager] 插件管理器初始化失败:', error)
      throw error
    }
  }

  /**
   * 设置事件监听器
   */
  private setupEventListeners(): void {
    // 监听扩展主机事件
    this.extensionHost.on('initialized', () => {
      console.log('[VSCodeStylePluginManager] 扩展主机初始化完成')
      this.emit('extensionHostInitialized')
    })

    this.extensionHost.on('extensionLoaded', (extension: ExtensionInstance) => {
      console.log(`[VSCodeStylePluginManager] 扩展已加载: ${extension.id}`)
      this.emit('extensionLoaded', extension)
    })

    this.extensionHost.on('extensionActivated', (extension: ExtensionInstance, exports: any) => {
      console.log(`[VSCodeStylePluginManager] 扩展已激活: ${extension.id}`)
      this.emit('extensionActivated', extension, exports)
    })

    this.extensionHost.on('extensionDeactivated', (extension: ExtensionInstance) => {
      console.log(`[VSCodeStylePluginManager] 扩展已停用: ${extension.id}`)
      this.emit('extensionDeactivated', extension)
    })

    this.extensionHost.on('extensionUnloaded', (extension: ExtensionInstance) => {
      console.log(`[VSCodeStylePluginManager] 扩展已卸载: ${extension.id}`)
      this.emit('extensionUnloaded', extension)
    })

    this.extensionHost.on(
      'extensionActivationFailed',
      (extension: ExtensionInstance, error: any) => {
        console.error(`[VSCodeStylePluginManager] 扩展激活失败: ${extension.id}`, error)
        this.emit('extensionActivationFailed', extension, error)
      }
    )

    this.extensionHost.on('extensionLoadFailed', (extensionPath: string, error: any) => {
      console.error(`[VSCodeStylePluginManager] 扩展加载失败: ${extensionPath}`, error)
      this.emit('extensionLoadFailed', extensionPath, error)
    })

    // 监听扩展加载器事件
    this.extensionLoader.on('extensionLoaded', (extension: ExtensionInstance) => {
      this.emit('extensionDiscovered', extension)
    })

    this.extensionLoader.on('extensionUnloaded', (extension: ExtensionInstance) => {
      this.emit('extensionRemoved', extension)
    })

    this.extensionLoader.on('extensionLoadFailed', (extensionPath: string, error: any) => {
      this.emit('extensionDiscoveryFailed', extensionPath, error)
    })
  }

  /**
   * 加载所有扩展
   */
  public async loadAllExtensions(): Promise<void> {
    await this.extensionLoader.loadAllExtensions()
  }

  /**
   * 启动时激活扩展
   */
  public async activateExtensionsOnStartup(): Promise<void> {
    // 激活所有设置为启动时激活的扩展
    const extensions = this.getAllExtensions()
    const activationPromises: Promise<void>[] = []

    for (const extension of extensions) {
      // 检查是否有启动激活事件
      if (
        extension.activationEvents.includes('*') ||
        extension.activationEvents.includes('onStartupFinished')
      ) {
        activationPromises.push(
          this.activateExtension(extension.id).catch((error) => {
            console.error(`[VSCodeStylePluginManager] 启动时激活扩展 ${extension.id} 失败:`, error)
          })
        )
      }
    }

    await Promise.allSettled(activationPromises)
    console.log(
      `[VSCodeStylePluginManager] 启动时激活完成，共处理 ${activationPromises.length} 个扩展`
    )
  }

  /**
   * 获取所有扩展
   */
  public getAllExtensions(): ExtensionInstance[] {
    return this.extensionHost.getAllExtensions()
  }

  /**
   * 获取扩展
   * @param extensionId 扩展ID
   */
  public getExtension(extensionId: string): ExtensionInstance | undefined {
    return this.extensionHost.getExtension(extensionId)
  }

  /**
   * 激活扩展
   * @param extensionId 扩展ID
   */
  public async activateExtension(extensionId: string): Promise<any> {
    return await this.extensionHost.activateExtension(extensionId)
  }

  /**
   * 停用扩展
   * @param extensionId 扩展ID
   */
  public async deactivateExtension(extensionId: string): Promise<void> {
    return await this.extensionHost.deactivateExtension(extensionId)
  }

  /**
   * 重新加载扩展
   * @param extensionId 扩展ID
   */
  public async reloadExtension(extensionId: string): Promise<ExtensionInstance | null> {
    return await this.extensionHost.reloadExtension(extensionId)
  }

  /**
   * 安装扩展
   * @param extensionPath 扩展路径或npm包名
   */
  public async installExtension(extensionPath: string): Promise<ExtensionInstance | null> {
    return await this.extensionHost.installExtension(extensionPath)
  }

  /**
   * 卸载扩展
   * @param extensionId 扩展ID
   */
  public async uninstallExtension(extensionId: string): Promise<void> {
    return await this.extensionHost.uninstallExtension(extensionId)
  }

  /**
   * 获取已激活的扩展
   */
  public getActivatedExtensions(): string[] {
    return this.extensionHost.getActivatedExtensions()
  }

  /**
   * 检查扩展是否已激活
   * @param extensionId 扩展ID
   */
  public isExtensionActivated(extensionId: string): boolean {
    return this.extensionHost.isExtensionActivated(extensionId)
  }

  /**
   * 触发激活事件
   * @param eventType 事件类型
   * @param data 事件数据
   */
  public async fireActivationEvent(eventType: string, data?: any): Promise<void> {
    await this.activationEventManager.fireEvent(eventType, data)
  }

  /**
   * 执行命令
   * @param commandId 命令ID
   * @param args 命令参数
   */
  public async executeCommand(commandId: string, ...args: any[]): Promise<any> {
    return await this.apiProvider.executeCommand(commandId, ...args)
  }

  /**
   * 注册命令
   * @param commandId 命令ID
   * @param handler 命令处理器
   */
  public registerCommand(commandId: string, handler: (...args: any[]) => any): void {
    this.apiProvider.registerCommand('system', commandId, handler)
  }

  /**
   * 获取贡献点
   * @param contributionType 贡献点类型
   */
  public getContributions(contributionType: string): any[] {
    return this.contributionPointManager.getContributions(contributionType)
  }

  /**
   * 获取所有命令
   */
  public getAllCommands(): any[] {
    return this.contributionPointManager.getContributions('commands')
  }

  /**
   * 获取所有视图
   */
  public getAllViews(): any[] {
    return this.contributionPointManager.getContributions('views')
  }

  /**
   * 获取所有配置
   */
  public getAllConfigurations(): any[] {
    return this.contributionPointManager.getContributions('configuration')
  }

  /**
   * 获取所有菜单
   */
  public getAllMenus(): any[] {
    return this.contributionPointManager.getContributions('menus')
  }

  /**
   * 获取所有键绑定
   */
  public getAllKeybindings(): any[] {
    return this.contributionPointManager.getContributions('keybindings')
  }

  /**
   * 重新加载所有扩展
   */
  public async reloadAllExtensions(): Promise<void> {
    console.log('[VSCodeStylePluginManager] 重新加载所有扩展...')

    // 清理当前状态
    await this.extensionHost.clear()

    // 重新加载所有扩展
    await this.extensionHost.loadAllExtensions()

    console.log('[VSCodeStylePluginManager] 所有扩展重新加载完成')
    this.emit('allExtensionsReloaded')
  }

  /**
   * 获取统计信息
   */
  public getStats(): {
    total: number
    activated: number
    builtin: number
    user: number
    failed: number
    host: any
  } {
    const extensions = this.getAllExtensions()
    const hostStats = this.extensionHost.getStats()

    return {
      total: extensions.length,
      activated: this.getActivatedExtensions().length,
      builtin: extensions.filter((e) => e.isBuiltin).length,
      user: extensions.filter((e) => !e.isBuiltin).length,
      failed: extensions.filter((e) => e.error).length,
      host: hostStats
    }
  }

  /**
   * 获取扩展目录路径
   */
  public getExtensionPaths(): {
    builtin: string
    user: string
  } {
    return {
      builtin: this.builtinExtensionsPath,
      user: this.userExtensionsPath
    }
  }

  /**
   * 清理所有扩展
   */
  public async clear(): Promise<void> {
    console.log('[VSCodeStylePluginManager] 清理所有扩展...')

    await this.extensionHost.clear()

    this.emit('cleared')
    console.log('[VSCodeStylePluginManager] 所有扩展已清理')
  }

  /**
   * 销毁插件管理器
   */
  public async dispose(): Promise<void> {
    console.log('[VSCodeStylePluginManager] 销毁插件管理器...')

    // 清理所有扩展
    await this.clear()

    // 移除所有事件监听器
    this.removeAllListeners()

    this.isInitialized = false
    console.log('[VSCodeStylePluginManager] 插件管理器已销毁')
  }

  /**
   * 创建示例扩展
   * @param extensionName 扩展名称
   * @param extensionPath 扩展路径
   */
  public async createSampleExtension(extensionName: string, extensionPath: string): Promise<void> {
    // TODO: 实现创建示例扩展的逻辑
    console.log(`[VSCodeStylePluginManager] 创建示例扩展: ${extensionName} at ${extensionPath}`)
    throw new Error('创建示例扩展功能尚未实现')
  }

  /**
   * 从npm安装扩展
   * @param packageName npm包名
   * @param version 版本号（可选）
   */
  public async installFromNpm(
    packageName: string,
    version?: string
  ): Promise<ExtensionInstance | null> {
    // TODO: 实现从npm安装扩展的逻辑
    console.log(
      `[VSCodeStylePluginManager] 从npm安装扩展: ${packageName}${version ? `@${version}` : ''}`
    )
    throw new Error('从npm安装扩展功能尚未实现')
  }

  /**
   * 搜索扩展
   * @param query 搜索关键词
   */
  public searchExtensions(query: string): ExtensionInstance[] {
    const extensions = this.getAllExtensions()
    const lowerQuery = query.toLowerCase()

    return extensions.filter((extension) => {
      const manifest = extension.manifest
      return (
        manifest.name.toLowerCase().includes(lowerQuery) ||
        (manifest.displayName && manifest.displayName.toLowerCase().includes(lowerQuery)) ||
        (manifest.description && manifest.description.toLowerCase().includes(lowerQuery)) ||
        (manifest.keywords &&
          manifest.keywords.some((keyword) => keyword.toLowerCase().includes(lowerQuery)))
      )
    })
  }

  /**
   * 按类别获取扩展
   * @param category 类别
   */
  public getExtensionsByCategory(category: string): ExtensionInstance[] {
    const extensions = this.getAllExtensions()

    return extensions.filter((extension) => {
      const categories = extension.manifest.categories
      return categories && categories.includes(category)
    })
  }

  /**
   * 获取扩展依赖关系
   * @param extensionId 扩展ID
   */
  public getExtensionDependencies(extensionId: string): string[] {
    const extension = this.getExtension(extensionId)
    if (!extension) {
      return []
    }

    return extension.manifest.extensionDependencies || []
  }

  /**
   * 检查扩展依赖是否满足
   * @param extensionId 扩展ID
   */
  public checkExtensionDependencies(extensionId: string): {
    satisfied: boolean
    missing: string[]
  } {
    const dependencies = this.getExtensionDependencies(extensionId)
    const missing: string[] = []

    for (const dep of dependencies) {
      if (!this.getExtension(dep)) {
        missing.push(dep)
      }
    }

    return {
      satisfied: missing.length === 0,
      missing
    }
  }
}

// 导出单例实例
export const vscodeStylePluginManager = VSCodeStylePluginManager.getInstance()
