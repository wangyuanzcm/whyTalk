import { EventEmitter } from 'events'
import { ipcMain } from 'electron'
import {
  ExtensionContext,
  Disposable,
  Uri,
  Extension,
  CancellationToken,
  Progress,
  ProgressOptions,
  WebviewPanel,
  WebviewPanelOptions,
  WebviewView,
  WebviewViewProvider,
  ViewColumn,
  Thenable
} from './types'
// import { ContributionPointManager } from './ContributionPointManager'
import { ActivationEventManager } from './ActivationEventManager'
import { ConfigurationManager } from './ConfigurationManager'

/**
 * 命令注册信息
 */
interface CommandRegistration {
  command: string
  callback: (...args: any[]) => any
  thisArg?: any
  extensionId: string
}

/**
 * API提供者
 * 为扩展提供标准的API接口，类似VSCode的vscode模块
 */
export class APIProvider extends EventEmitter {
  private static instance: APIProvider
  
  /** 命令注册表 */
  private commands = new Map<string, CommandRegistration>()
  
  /** 扩展上下文映射 */
  private extensionContexts = new Map<string, ExtensionContext>()
  
  /** Webview面板映射 */
  private webviewPanels = new Map<string, WebviewPanel>()
  
  /** Webview视图映射 */
  private webviewViews = new Map<string, WebviewView>()
  
  /** 贡献点管理器 */
  // private contributionPointManager: ContributionPointManager
  
  /** 激活事件管理器 */
  private activationEventManager: ActivationEventManager
  
  /** 配置管理器 */
  private configurationManager: ConfigurationManager

  private constructor() {
    super()
    // this.contributionPointManager = ContributionPointManager.getInstance()
    this.activationEventManager = ActivationEventManager.getInstance()
    this.configurationManager = ConfigurationManager.getInstance()
    this.setupIpcHandlers()
  }

  /**
   * 获取单例实例
   */
  public static getInstance(): APIProvider {
    if (!APIProvider.instance) {
      APIProvider.instance = new APIProvider()
    }
    return APIProvider.instance
  }

  /**
   * 设置IPC处理器
   */
  private setupIpcHandlers(): void {
    // 命令执行
    ipcMain.handle('extension:executeCommand', async (_event, params: { extensionId: string, command: string, args: any[] }) => {
      return this.executeCommand(params.command, ...params.args)
    })

    // 获取配置
    ipcMain.handle('extension:getConfiguration', async (_event, params: { extensionId: string, section?: string }) => {
      return this.configurationManager.getConfiguration(params.extensionId, params.section)
    })

    // 更新配置
    ipcMain.handle('extension:updateConfiguration', async (_event, params: { extensionId: string, section: string, value: any, configurationTarget?: any }) => {
      this.configurationManager.updateConfiguration(params.extensionId, params.section, params.value)
      
      // 返回一个简单的成功状态，不包含函数
      return {
        success: true,
        section: params.section
      }
    })

    // 注册配置架构
    ipcMain.handle('extension:registerConfigSchema', async (_event, params: { extensionId: string, schema: any }) => {
      this.configurationManager.registerConfigSchema(params.extensionId, params.schema)
      return Promise.resolve()
    })

    // 获取配置架构
    ipcMain.handle('extension:getConfigSchema', async (_event, params: { extensionId: string }) => {
      return this.configurationManager.getConfigSchema(params.extensionId)
    })

    // 显示信息消息
    ipcMain.handle('extension:showInformationMessage', async (_event, message: string, ...items: string[]) => {
      return this.showInformationMessage(message, ...items)
    })

    // 显示警告消息
    ipcMain.handle('extension:showWarningMessage', async (_event, message: string, ...items: string[]) => {
      return this.showWarningMessage(message, ...items)
    })

    // 显示错误消息
    ipcMain.handle('extension:showErrorMessage', async (_event, message: string, ...items: string[]) => {
      return this.showErrorMessage(message, ...items)
    })
  }

  /**
   * 为扩展创建API对象
   * @param extensionId 扩展ID
   * @param context 扩展上下文
   */
  public createExtensionAPI(extensionId: string, context: ExtensionContext): any {
    // 存储扩展上下文
    this.extensionContexts.set(extensionId, context)

    // 创建API对象
    const api = {
      // 命令相关API
      commands: {
        /**
         * 注册命令
         */
        registerCommand: (command: string, callback: (...args: any[]) => any, thisArg?: any): Disposable => {
          return this.registerCommand(extensionId, command, callback, thisArg)
        },

        /**
         * 执行命令
         */
        executeCommand: (command: string, ...args: any[]): Thenable<any> => {
          return this.executeCommand(command, ...args)
        },

        /**
         * 获取所有命令
         */
        getCommands: (_filterInternal?: boolean): Thenable<string[]> => {
          return Promise.resolve(Array.from(this.commands.keys()))
        }
      },

      // 窗口相关API
      window: {
        /**
         * 显示信息消息
         */
        showInformationMessage: (message: string, ...items: string[]): Thenable<string | undefined> => {
          return this.showInformationMessage(message, ...items)
        },

        /**
         * 显示警告消息
         */
        showWarningMessage: (message: string, ...items: string[]): Thenable<string | undefined> => {
          return this.showWarningMessage(message, ...items)
        },

        /**
         * 显示错误消息
         */
        showErrorMessage: (message: string, ...items: string[]): Thenable<string | undefined> => {
          return this.showErrorMessage(message, ...items)
        },

        /**
         * 显示快速选择
         */
        showQuickPick: (items: string[] | Thenable<string[]>, options?: any): Thenable<string | undefined> => {
          return this.showQuickPick(items, options)
        },

        /**
         * 显示输入框
         */
        showInputBox: (options?: any): Thenable<string | undefined> => {
          return this.showInputBox(options)
        },

        /**
         * 创建Webview面板
         */
        createWebviewPanel: (
          viewType: string,
          title: string,
          _showOptions: ViewColumn | { viewColumn: ViewColumn; preserveFocus?: boolean },
          _options?: WebviewPanelOptions
        ): WebviewPanel => {
          return this.createWebviewPanel(extensionId, viewType, title, _showOptions, _options)
        },

        /**
         * 注册Webview视图提供者
         */
        registerWebviewViewProvider: (
          viewId: string,
          provider: WebviewViewProvider,
          options?: { webviewOptions?: { retainContextWhenHidden?: boolean } }
        ): Disposable => {
          return this.registerWebviewViewProvider(extensionId, viewId, provider, options)
        },

        /**
         * 显示进度
         */
        withProgress: <R>(
          _options: ProgressOptions,
          task: (progress: Progress<{ message?: string; increment?: number }>, token: CancellationToken) => Thenable<R>
        ): Thenable<R> => {
          return this.withProgress(_options, task)
        },

        /**
         * 创建状态栏项
         */
        createStatusBarItem: (alignment?: number, priority?: number): any => {
          return this.createStatusBarItem(extensionId, alignment, priority)
        }
      },

      // 工作区相关API
      workspace: {
        /**
         * 获取配置
         */
        getConfiguration: (section?: string, resource?: Uri): any => {
          return this.getConfiguration(section, resource)
        },

        /**
         * 监听配置变化
         */
        onDidChangeConfiguration: (listener: (e: any) => any): Disposable => {
          return this.onDidChangeConfiguration(listener)
        },

        /**
         * 获取工作区文件夹
         */
        workspaceFolders: undefined, // TODO: 实现工作区文件夹

        /**
         * 监听工作区文件夹变化
         */
        onDidChangeWorkspaceFolders: (listener: (e: any) => any): Disposable => {
          return this.onDidChangeWorkspaceFolders(listener)
        }
      },

      // URI相关API
      Uri: {
        /**
         * 从文件路径创建URI
         */
        file: (path: string): Uri => {
          return this.createFileUri(path)
        },

        /**
         * 解析URI
         */
        parse: (value: string): Uri => {
          return this.parseUri(value)
        }
      },

      // 扩展相关API
      extensions: {
        /**
         * 获取扩展
         */
        getExtension: (extensionId: string): Extension | undefined => {
          return this.getExtension(extensionId)
        },

        /**
         * 获取所有扩展
         */
        all: [] as Extension[], // TODO: 实现扩展列表

        /**
         * 监听扩展变化
         */
        onDidChange: (listener: (e: any) => any): Disposable => {
          return this.onDidChangeExtensions(listener)
        }
      },

      // 配置架构注册方法
      registerConfigSchema: (schema: any): void => {
        this.configurationManager.registerConfigSchema(extensionId, schema)
        console.log(`[APIProvider] 扩展 ${extensionId} 注册配置架构`)
      },

      // 环境相关API
      env: {
        /**
         * 应用名称
         */
        appName: 'WhyTalk',

        /**
         * 应用版本
         */
        appVersion: '1.0.0', // TODO: 从package.json读取

        /**
         * 语言
         */
        language: 'zh-cn',

        /**
         * 机器ID
         */
        machineId: 'unknown',

        /**
         * 会话ID
         */
        sessionId: 'unknown',

        /**
         * 打开外部链接
         */
        openExternal: (target: Uri): Thenable<boolean> => {
          return this.openExternal(target)
        }
      }
    }

    return api
  }

  /**
   * 注册命令
   */
  public registerCommand(
    extensionId: string,
    command: string,
    callback: (...args: any[]) => any,
    thisArg?: any
  ): Disposable {
    // 如果命令已存在，先清理旧的注册
    if (this.commands.has(command)) {
      const existingRegistration = this.commands.get(command)
      console.warn(`[APIProvider] 命令 '${command}' 已存在（来自扩展 ${existingRegistration?.extensionId}），将被扩展 ${extensionId} 覆盖`)
      this.commands.delete(command)
    }

    const registration: CommandRegistration = {
      command,
      callback,
      thisArg,
      extensionId
    }

    this.commands.set(command, registration)
    console.log(`[APIProvider] 扩展 ${extensionId} 注册命令: ${command}`)

    // 触发命令激活事件
    this.activationEventManager.fireCommandEvent(command)

    return {
      dispose: () => {
        this.commands.delete(command)
        console.log(`[APIProvider] 扩展 ${extensionId} 取消注册命令: ${command}`)
      }
    }
  }

  /**
   * 执行命令
   */
  public async executeCommand(command: string, ...args: any[]): Promise<any> {
    const registration = this.commands.get(command)
    if (!registration) {
      throw new Error(`命令 '${command}' 未找到`)
    }

    try {
      const result = registration.thisArg
        ? registration.callback.apply(registration.thisArg, args)
        : registration.callback(...args)

      return await Promise.resolve(result)
    } catch (error) {
      console.error(`[APIProvider] 执行命令 ${command} 失败:`, error)
      throw error
    }
  }

  /**
   * 显示信息消息
   */
  private async showInformationMessage(_message: string, ..._items: string[]): Promise<string | undefined> {
    // TODO: 实现消息显示
    console.log(`[INFO] ${_message}`)
    return undefined
  }

  /**
   * 显示警告消息
   */
  private async showWarningMessage(_message: string, ..._items: string[]): Promise<string | undefined> {
    // TODO: 实现消息显示
    console.warn(`[WARNING] ${_message}`)
    return undefined
  }

  /**
   * 显示错误消息
   */
  private async showErrorMessage(_message: string, ..._items: string[]): Promise<string | undefined> {
    // TODO: 实现消息显示
    console.error(`[ERROR] ${_message}`)
    return undefined
  }

  /**
   * 显示快速选择
   */
  private async showQuickPick(_items: string[] | Thenable<string[]>, _options?: any): Promise<string | undefined> {
    // TODO: 实现快速选择
    const resolvedItems = await Promise.resolve(_items)
    return resolvedItems[0]
  }

  /**
   * 显示输入框
   */
  private async showInputBox(_options?: any): Promise<string | undefined> {
    // TODO: 实现输入框
    return undefined
  }

  /**
   * 创建Webview面板
   */
  private createWebviewPanel(
    _extensionId: string,
    _viewType: string,
    _title: string,
    _showOptions: ViewColumn | { viewColumn: ViewColumn; preserveFocus?: boolean },
    _options?: WebviewPanelOptions
  ): WebviewPanel {
    // TODO: 实现Webview面板创建
    throw new Error('Webview面板功能尚未实现')
  }

  /**
   * 注册Webview视图提供者
   */
  private registerWebviewViewProvider(
    _extensionId: string,
    _viewId: string,
    _provider: WebviewViewProvider,
    _options?: { webviewOptions?: { retainContextWhenHidden?: boolean } }
  ): Disposable {
    // TODO: 实现Webview视图提供者注册
    return {
      dispose: () => {}
    }
  }

  /**
   * 显示进度
   */
  private async withProgress<R>(
    _options: ProgressOptions,
    task: (progress: Progress<{ message?: string; increment?: number }>, token: CancellationToken) => Thenable<R>
  ): Promise<R> {
    // TODO: 实现进度显示
    const progress: Progress<{ message?: string; increment?: number }> = {
      report: (value) => {
        console.log(`[Progress] ${value.message || ''} ${value.increment || 0}%`)
      }
    }

    const token: CancellationToken = {
      isCancellationRequested: false,
      onCancellationRequested: () => ({ dispose: () => {} })
    }

    return await task(progress, token)
  }

  /**
   * 创建状态栏项
   */
  private createStatusBarItem(extensionId: string, alignment?: number, priority?: number): any {
    console.log(`[APIProvider] 扩展 ${extensionId} 创建状态栏项，对齐方式: ${alignment}, 优先级: ${priority}`)
    
    // 创建一个简单的状态栏项对象
    const statusBarItem = {
      text: '',
      tooltip: '',
      command: '',
      alignment: alignment || 2, // 默认右对齐
      priority: priority || 100,
      
      show: () => {
        console.log(`[StatusBarItem] 显示状态栏项: ${statusBarItem.text}`)
        // TODO: 实现实际的状态栏显示逻辑
      },
      
      hide: () => {
        console.log(`[StatusBarItem] 隐藏状态栏项: ${statusBarItem.text}`)
        // TODO: 实现实际的状态栏隐藏逻辑
      },
      
      dispose: () => {
        console.log(`[StatusBarItem] 销毁状态栏项: ${statusBarItem.text}`)
        // TODO: 实现实际的状态栏项清理逻辑
      }
    }
    
    return statusBarItem
  }

  /**
   * 获取配置
   */
  private getConfiguration(section?: string, _resource?: Uri): any {
    // 为扩展API提供配置对象，包含get、has、update方法
    return {
      get: (key: string, defaultValue?: any) => {
        // 这里需要扩展ID，但在这个上下文中我们无法获取
        // 这个方法主要用于扩展内部调用，实际配置获取通过IPC处理
        return defaultValue
      },
      has: (key: string) => {
        return false
      },
      update: async (key: string, value: any, configurationTarget?: any) => {
        // 这里也需要扩展ID，实际更新通过IPC处理
        console.log(`配置更新请求: ${key} = ${JSON.stringify(value)}`)
      }
    }
  }

  /**
   * 更新配置
   * @param section 配置节
   * @param value 配置值
   * @param configurationTarget 配置目标
   */
  private async updateConfiguration(section: string, value: any, configurationTarget?: any): Promise<void> {
    console.log(`配置更新: ${section} = ${JSON.stringify(value)}`)
  }

  /**
   * 监听配置变化
   */
  private onDidChangeConfiguration(listener: (e: any) => any): Disposable {
    const unsubscribe = this.configurationManager.onDidChangeConfiguration(listener)
    return {
      dispose: unsubscribe
    }
  }

  /**
   * 监听工作区文件夹变化
   */
  private onDidChangeWorkspaceFolders(_listener: (e: any) => any): Disposable {
    // TODO: 实现工作区文件夹变化监听
    return {
      dispose: () => {}
    }
  }

  /**
   * 创建文件URI
   */
  private createFileUri(path: string): Uri {
    // TODO: 实现URI创建
    return {
      scheme: 'file',
      authority: '',
      path,
      query: '',
      fragment: '',
      fsPath: path,
      toString: () => `file://${path}`,
      toJSON: () => ({ scheme: 'file', path })
    }
  }

  /**
   * 解析URI
   */
  private parseUri(value: string): Uri {
    // TODO: 实现URI解析
    const url = new URL(value)
    return {
      scheme: url.protocol.slice(0, -1),
      authority: url.host,
      path: url.pathname,
      query: url.search.slice(1),
      fragment: url.hash.slice(1),
      fsPath: url.pathname,
      toString: () => value,
      toJSON: () => ({ scheme: url.protocol.slice(0, -1), path: url.pathname })
    }
  }

  /**
   * 获取扩展
   */
  private getExtension(_extensionId: string): Extension | undefined {
    // TODO: 实现扩展获取
    return undefined
  }

  /**
   * 监听扩展变化
   */
  private onDidChangeExtensions(_listener: (e: any) => any): Disposable {
    // TODO: 实现扩展变化监听
    return {
      dispose: () => {}
    }
  }

  /**
   * 打开外部链接
   */
  private async openExternal(target: Uri): Promise<boolean> {
    // TODO: 实现外部链接打开
    console.log(`[APIProvider] 打开外部链接: ${target.toString()}`)
    return true
  }

  /**
   * 清理扩展API
   * @param extensionId 扩展ID
   */
  public cleanupExtensionAPI(extensionId: string): void {
    // 清理命令
    for (const [command, registration] of this.commands.entries()) {
      if (registration.extensionId === extensionId) {
        this.commands.delete(command)
      }
    }

    // 清理扩展上下文
    this.extensionContexts.delete(extensionId)

    console.log(`[APIProvider] 已清理扩展 ${extensionId} 的API`)
  }

  /**
   * 获取统计信息
   */
  public getStats(): {
    commands: number
    extensions: number
    webviewPanels: number
    webviewViews: number
  } {
    return {
      commands: this.commands.size,
      extensions: this.extensionContexts.size,
      webviewPanels: this.webviewPanels.size,
      webviewViews: this.webviewViews.size
    }
  }
}