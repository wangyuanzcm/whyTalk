import * as fs from 'fs'
import * as path from 'path'
import { EventEmitter } from 'events'
import {
  ExtensionManifest,
  ExtensionInstance,
  ExtensionContext,
  ExtensionMode,
  // Disposable,
  Uri
} from './types'

/**
 * 扩展状态
 */
export enum ExtensionState {
  /** 未加载 */
  Unloaded = 'unloaded',
  /** 已加载 */
  Loaded = 'loaded',
  /** 已激活 */
  Activated = 'activated',
  /** 已停用 */
  Deactivated = 'deactivated',
  /** 加载失败 */
  Failed = 'failed'
}

/**
 * 扩展加载器
 * 负责加载、验证和管理VSCode风格的扩展
 */
export class ExtensionLoader extends EventEmitter {
  private static instance: ExtensionLoader

  /** 已加载的扩展映射 */
  private loadedExtensions = new Map<string, ExtensionInstance>()

  /** 扩展状态映射 */
  private extensionStates = new Map<string, ExtensionState>()

  /** 扩展搜索路径 */
  // private extensionPaths: string[] = []

  /** 内置扩展路径 */
  private builtinExtensionPath: string

  /** 用户扩展路径 */
  private userExtensionPath: string

  private constructor() {
    super()

    // 设置扩展路径
    const isDev = process.env.NODE_ENV === 'development'
    const appPath = isDev ? process.cwd() : process.resourcesPath

    this.builtinExtensionPath = path.join(appPath, 'extensions')
    this.userExtensionPath = path.join(
      process.env.APPDATA || process.env.HOME || '',
      '.whytalk',
      'extensions'
    )

    // this.extensionPaths = [this.builtinExtensionPath, this.userExtensionPath]

    // 确保用户扩展目录存在
    this.ensureDirectoryExists(this.userExtensionPath)
  }

  /**
   * 获取单例实例
   */
  public static getInstance(): ExtensionLoader {
    if (!ExtensionLoader.instance) {
      ExtensionLoader.instance = new ExtensionLoader()
    }
    return ExtensionLoader.instance
  }

  /**
   * 加载所有扩展
   */
  public async loadAllExtensions(): Promise<void> {
    console.log('[ExtensionLoader] 开始加载所有扩展...')

    const loadPromises: Promise<void>[] = []

    // 加载内置扩展
    if (fs.existsSync(this.builtinExtensionPath)) {
      loadPromises.push(this.loadExtensionsFromDirectory(this.builtinExtensionPath, true))
    }

    // 加载用户扩展
    if (fs.existsSync(this.userExtensionPath)) {
      loadPromises.push(this.loadExtensionsFromDirectory(this.userExtensionPath, false))
    }

    await Promise.allSettled(loadPromises)

    console.log(`[ExtensionLoader] 扩展加载完成，共加载 ${this.loadedExtensions.size} 个扩展`)
    this.emit('allExtensionsLoaded', this.loadedExtensions.size)
  }

  /**
   * 从目录加载扩展
   * @param directory 扩展目录
   * @param isBuiltin 是否为内置扩展
   */
  private async loadExtensionsFromDirectory(directory: string, isBuiltin: boolean): Promise<void> {
    try {
      const entries = fs.readdirSync(directory, { withFileTypes: true })

      const loadPromises = entries
        .filter((entry) => entry.isDirectory())
        .map((entry) => {
          const extensionPath = path.join(directory, entry.name)
          return this.loadExtension(extensionPath, isBuiltin)
        })

      await Promise.allSettled(loadPromises)
    } catch (error) {
      console.error(`[ExtensionLoader] 加载目录 ${directory} 中的扩展失败:`, error)
    }
  }

  /**
   * 加载单个扩展
   * @param extensionPath 扩展路径
   * @param isBuiltin 是否为内置扩展
   */
  public async loadExtension(
    extensionPath: string,
    isBuiltin: boolean = false
  ): Promise<ExtensionInstance | null> {
    try {
      console.log(`[ExtensionLoader] 加载扩展: ${extensionPath}`)

      // 读取package.json
      const manifest = await this.loadManifest(extensionPath)
      if (!manifest) {
        return null
      }

      // 验证清单
      const validationResult = this.validateManifest(manifest)
      if (!validationResult.isValid) {
        console.error(`[ExtensionLoader] 扩展清单验证失败: ${validationResult.errors.join(', ')}`)
        return null
      }

      // 生成扩展ID
      const extensionId = this.generateExtensionId(manifest)

      // 检查是否已加载
      if (this.loadedExtensions.has(extensionId)) {
        console.warn(`[ExtensionLoader] 扩展 ${extensionId} 已经加载`)
        return this.loadedExtensions.get(extensionId)!
      }

      // 创建扩展实例
      const extension = await this.createExtensionInstance(
        extensionId,
        manifest,
        extensionPath,
        isBuiltin
      )

      // 存储扩展
      this.loadedExtensions.set(extensionId, extension)
      this.extensionStates.set(extensionId, ExtensionState.Loaded)

      console.log(`[ExtensionLoader] 扩展 ${extensionId} 加载成功`)
      this.emit('extensionLoaded', extension)

      return extension
    } catch (error) {
      console.error(`[ExtensionLoader] 加载扩展 ${extensionPath} 失败:`, error)

      // 尝试从路径提取扩展名作为ID
      const extensionName = path.basename(extensionPath)
      this.extensionStates.set(extensionName, ExtensionState.Failed)

      this.emit('extensionLoadFailed', extensionPath, error)
      return null
    }
  }

  /**
   * 加载扩展清单
   * @param extensionPath 扩展路径
   */
  private async loadManifest(extensionPath: string): Promise<ExtensionManifest | null> {
    const manifestPath = path.join(extensionPath, 'package.json')

    if (!fs.existsSync(manifestPath)) {
      console.error(`[ExtensionLoader] 扩展清单文件不存在: ${manifestPath}`)
      return null
    }

    try {
      const manifestContent = fs.readFileSync(manifestPath, 'utf-8')
      const manifest = JSON.parse(manifestContent) as ExtensionManifest
      return manifest
    } catch (error) {
      console.error(`[ExtensionLoader] 解析扩展清单失败: ${manifestPath}`, error)
      return null
    }
  }

  /**
   * 验证扩展清单
   * @param manifest 扩展清单
   */
  private validateManifest(manifest: ExtensionManifest): { isValid: boolean; errors: string[] } {
    const errors: string[] = []

    // 必需字段验证
    if (!manifest.name) {
      errors.push('缺少name字段')
    }

    if (!manifest.version) {
      errors.push('缺少version字段')
    }

    // 名称格式验证
    if (manifest.name && !/^[a-z0-9][a-z0-9\-]*$/.test(manifest.name)) {
      errors.push('name字段格式无效，只能包含小写字母、数字和连字符，且不能以连字符开头')
    }

    // 版本格式验证
    if (manifest.version && !/^\d+\.\d+\.\d+/.test(manifest.version)) {
      errors.push('version字段格式无效，应为语义化版本格式')
    }

    // 引擎版本验证
    if (manifest.engines && manifest.engines.whytalk) {
      // TODO: 验证引擎版本兼容性
    }

    // 主入口文件验证
    if (manifest.main && !manifest.main.endsWith('.js')) {
      errors.push('main字段必须指向.js文件')
    }

    // 激活事件验证
    if (manifest.activationEvents) {
      for (const event of manifest.activationEvents) {
        if (!this.isValidActivationEvent(event)) {
          errors.push(`无效的激活事件: ${event}`)
        }
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    }
  }

  /**
   * 验证激活事件格式
   * @param event 激活事件
   */
  private isValidActivationEvent(event: string): boolean {
    const validPatterns = [
      /^\*$/,
      /^onStartupFinished$/,
      /^onCommand:.+$/,
      /^onLanguage:.+$/,
      /^onFileSystem:.+$/,
      /^onDebug:.+$/,
      /^onTaskType:.+$/,
      /^onView:.+$/,
      /^onUri:.+$/,
      /^onWebviewPanel:.+$/,
      /^onCustomEditor:.+$/,
      /^workspaceContains:.+$/
    ]

    return validPatterns.some((pattern) => pattern.test(event))
  }

  /**
   * 生成扩展ID
   * @param manifest 扩展清单
   */
  private generateExtensionId(manifest: ExtensionManifest): string {
    if (manifest.publisher) {
      return `${manifest.publisher}.${manifest.name}`
    }
    return manifest.name
  }

  /**
   * 创建扩展实例
   * @param extensionId 扩展ID
   * @param manifest 扩展清单
   * @param extensionPath 扩展路径
   * @param isBuiltin 是否为内置扩展
   */
  private async createExtensionInstance(
    extensionId: string,
    manifest: ExtensionManifest,
    extensionPath: string,
    isBuiltin: boolean
  ): Promise<ExtensionInstance> {
    // 确定主入口文件路径
    let mainPath: string | undefined
    if (manifest.main) {
      mainPath = path.resolve(extensionPath, manifest.main)
      if (!fs.existsSync(mainPath)) {
        console.warn(`[ExtensionLoader] 主入口文件不存在: ${mainPath}`)
        mainPath = undefined
      }
    }

    // 创建扩展实例
    const extension: ExtensionInstance = {
      id: extensionId,
      manifest,
      extensionPath,
      mainPath,
      isActive: false,
      isBuiltin,
      activationEvents: manifest.activationEvents || [],
      loadTime: Date.now()
    }

    return extension
  }

  /**
   * 创建扩展上下文
   * @param extension 扩展实例
   */
  public createExtensionContext(extension: ExtensionInstance): ExtensionContext {
    const context: ExtensionContext = {
      subscriptions: [],
      extensionPath: extension.extensionPath,
      extensionUri: this.createUri(extension.extensionPath),
      globalState: this.createMemento(`global:${extension.id}`),
      workspaceState: this.createMemento(`workspace:${extension.id}`),
      storagePath: path.join(this.userExtensionPath, '.storage', extension.id),
      globalStoragePath: path.join(this.userExtensionPath, '.storage', 'global'),
      logPath: path.join(this.userExtensionPath, '.logs', extension.id),
      extensionMode:
        process.env.NODE_ENV === 'development'
          ? ExtensionMode.Development
          : ExtensionMode.Production,
      environmentVariableCollection: this.createEnvironmentVariableCollection(),
      secrets: this.createSecretStorage(extension.id),
      extension: this.createExtensionInfo(extension)
    }

    // 确保存储目录存在
    if (context.storagePath) {
      this.ensureDirectoryExists(path.dirname(context.storagePath))
    }
    this.ensureDirectoryExists(context.globalStoragePath)
    this.ensureDirectoryExists(path.dirname(context.logPath))

    return context
  }

  /**
   * 创建URI
   * @param fsPath 文件系统路径
   */
  private createUri(fsPath: string): Uri {
    return {
      scheme: 'file',
      authority: '',
      path: fsPath.replace(/\\/g, '/'),
      query: '',
      fragment: '',
      fsPath,
      toString: () => `file://${fsPath.replace(/\\/g, '/')}`,
      toJSON: () => ({ scheme: 'file', path: fsPath.replace(/\\/g, '/') })
    }
  }

  /**
   * 创建内存存储
   * @param namespace 命名空间
   */
  private createMemento(_namespace: string): any {
    // TODO: 实现持久化存储
    const storage = new Map<string, any>()

    return {
      get: <T>(key: string, defaultValue?: T): T | undefined => {
        return storage.get(key) ?? defaultValue
      },
      update: async (key: string, value: any): Promise<void> => {
        storage.set(key, value)
      },
      keys: (): readonly string[] => {
        return Array.from(storage.keys())
      }
    }
  }

  /**
   * 创建环境变量集合
   */
  private createEnvironmentVariableCollection(): any {
    // TODO: 实现环境变量集合
    return {
      persistent: false,
      replace: () => {},
      append: () => {},
      prepend: () => {},
      get: () => undefined,
      forEach: () => {},
      delete: () => {},
      clear: () => {}
    }
  }

  /**
   * 创建秘密存储
   * @param extensionId 扩展ID
   */
  private createSecretStorage(_extensionId: string): any {
    // TODO: 实现秘密存储
    return {
      get: async (_key: string) => undefined,
      store: async (_key: string, _value: string) => {},
      delete: async (_key: string) => {},
      onDidChange: () => ({ dispose: () => {} })
    }
  }

  /**
   * 创建扩展信息
   * @param extension 扩展实例
   */
  private createExtensionInfo(extension: ExtensionInstance): any {
    return {
      id: extension.id,
      extensionUri: this.createUri(extension.extensionPath),
      extensionPath: extension.extensionPath,
      isActive: extension.isActive,
      packageJSON: extension.manifest,
      extensionKind: 1, // UI扩展
      activate: async () => {},
      exports: undefined
    }
  }

  /**
   * 确保目录存在
   * @param dirPath 目录路径
   */
  private ensureDirectoryExists(dirPath: string): void {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true })
    }
  }

  /**
   * 卸载扩展
   * @param extensionId 扩展ID
   */
  public unloadExtension(extensionId: string): void {
    const extension = this.loadedExtensions.get(extensionId)
    if (!extension) {
      console.warn(`[ExtensionLoader] 扩展 ${extensionId} 未找到`)
      return
    }

    // 清理扩展上下文
    if (extension.context) {
      for (const subscription of extension.context.subscriptions) {
        try {
          subscription.dispose()
        } catch (error) {
          console.error(`[ExtensionLoader] 清理扩展 ${extensionId} 订阅失败:`, error)
        }
      }
    }

    // 移除扩展
    this.loadedExtensions.delete(extensionId)
    this.extensionStates.set(extensionId, ExtensionState.Unloaded)

    console.log(`[ExtensionLoader] 扩展 ${extensionId} 已卸载`)
    this.emit('extensionUnloaded', extension)
  }

  /**
   * 获取扩展
   * @param extensionId 扩展ID
   */
  public getExtension(extensionId: string): ExtensionInstance | undefined {
    return this.loadedExtensions.get(extensionId)
  }

  /**
   * 获取所有扩展
   */
  public getAllExtensions(): ExtensionInstance[] {
    return Array.from(this.loadedExtensions.values())
  }

  /**
   * 获取扩展状态
   * @param extensionId 扩展ID
   */
  public getExtensionState(extensionId: string): ExtensionState {
    return this.extensionStates.get(extensionId) || ExtensionState.Unloaded
  }

  /**
   * 设置扩展状态
   * @param extensionId 扩展ID
   * @param state 状态
   */
  public setExtensionState(extensionId: string, state: ExtensionState): void {
    this.extensionStates.set(extensionId, state)
    this.emit('extensionStateChanged', extensionId, state)
  }

  /**
   * 重新加载扩展
   * @param extensionId 扩展ID
   */
  public async reloadExtension(extensionId: string): Promise<ExtensionInstance | null> {
    const extension = this.loadedExtensions.get(extensionId)
    if (!extension) {
      console.warn(`[ExtensionLoader] 扩展 ${extensionId} 未找到`)
      return null
    }

    // 卸载扩展
    this.unloadExtension(extensionId)

    // 重新加载扩展
    return await this.loadExtension(extension.extensionPath, extension.isBuiltin)
  }

  /**
   * 清理所有扩展
   */
  public clear(): void {
    for (const extensionId of this.loadedExtensions.keys()) {
      this.unloadExtension(extensionId)
    }

    this.loadedExtensions.clear()
    this.extensionStates.clear()

    this.emit('cleared')
    console.log('[ExtensionLoader] 已清理所有扩展')
  }

  /**
   * 获取统计信息
   */
  public getStats(): {
    total: number
    loaded: number
    activated: number
    failed: number
    builtin: number
    user: number
  } {
    const extensions = Array.from(this.loadedExtensions.values())
    const states = Array.from(this.extensionStates.values())

    return {
      total: this.loadedExtensions.size,
      loaded: states.filter((s) => s === ExtensionState.Loaded).length,
      activated: states.filter((s) => s === ExtensionState.Activated).length,
      failed: states.filter((s) => s === ExtensionState.Failed).length,
      builtin: extensions.filter((e) => e.isBuiltin).length,
      user: extensions.filter((e) => !e.isBuiltin).length
    }
  }
}
