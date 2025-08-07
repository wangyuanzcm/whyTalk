/**
 * VSCode风格插件系统集成模块
 * 负责将VSCode风格插件系统集成到主进程中
 */

import { VSCodeStylePluginManager } from './vscode-style/VSCodeStylePluginManager'
import { ipcMain, BrowserWindow, app } from 'electron'
import path from 'path'
import { createServer } from 'http'
import { readFile, stat, writeFile, mkdir } from 'fs/promises'
import { loggerService as logger } from '../services/logger/LoggerService'
import { join } from 'path'
import { is } from '@electron-toolkit/utils'

/**
 * VSCode风格插件系统管理器
 * 专门管理VSCode风格的插件系统
 */
export class PluginSystemManager {
  private static instance: PluginSystemManager
  private vscodeStyleManager: VSCodeStylePluginManager
  private isInitialized = false
  private extensionServer: any = null
  private extensionServerPort = 0
  private configWindows: Map<string, BrowserWindow> = new Map()

  private constructor() {
    this.vscodeStyleManager = VSCodeStylePluginManager.getInstance()
  }

  /**
   * 获取单例实例
   */
  public static getInstance(): PluginSystemManager {
    if (!PluginSystemManager.instance) {
      PluginSystemManager.instance = new PluginSystemManager()
    }
    return PluginSystemManager.instance
  }

  /**
   * 初始化VSCode风格插件系统
   */
  public async initialize(): Promise<void> {
    if (this.isInitialized) {
      return
    }

    try {
      logger.info('开始初始化VSCode风格插件系统...')

      // 设置插件路径
      // const userDataPath = app.getPath('userData')
      // const builtinExtensionsPath = path.join(__dirname, '../../../extensions')
      // const userExtensionsPath = path.join(userDataPath, 'extensions')

      // 初始化VSCode风格插件系统
      await this.vscodeStyleManager.initialize()

      // 启动扩展文件服务器
      await this.startExtensionServer()

      // 设置IPC处理器
      this.setupIpcHandlers()

      // 加载所有扩展
      await this.vscodeStyleManager.loadAllExtensions()

      // 激活启动时需要激活的扩展
      await this.vscodeStyleManager.activateExtensionsOnStartup()

      this.isInitialized = true
      logger.info('VSCode风格插件系统初始化完成')
    } catch (error) {
      logger.error('VSCode风格插件系统初始化失败:', error)
      throw error
    }
  }

  /**
   * 设置IPC处理器
   */
  private setupIpcHandlers(): void {
    // 获取所有扩展
    ipcMain.handle('plugin:getAllExtensions', async () => {
      const extensions = this.vscodeStyleManager.getAllExtensions()
      // 序列化扩展数据，只返回可序列化的字段
      return extensions.map(ext => ({
        id: ext.id,
        manifest: ext.manifest,
        extensionPath: ext.extensionPath,
        mainPath: ext.mainPath,
        isActive: ext.isActive,
        isBuiltin: ext.isBuiltin,
        activationEvents: ext.activationEvents,
        loadTime: ext.loadTime,
        activationTime: ext.activationTime,
        error: ext.error
      }))
    })

    // 获取扩展详情
    ipcMain.handle('plugin:getExtension', async (_, extensionId: string) => {
      const extension = this.vscodeStyleManager.getExtension(extensionId)
      if (!extension) {
        return null
      }
      // 序列化扩展数据，只返回可序列化的字段
      return {
        id: extension.id,
        manifest: extension.manifest,
        packageJSON: extension.manifest, // 为了兼容前端代码，同时提供packageJSON字段
        extensionPath: extension.extensionPath,
        mainPath: extension.mainPath,
        isActive: extension.isActive,
        isBuiltin: extension.isBuiltin,
        activationEvents: extension.activationEvents,
        loadTime: extension.loadTime,
        activationTime: extension.activationTime,
        error: extension.error
      }
    })

    // 激活扩展
    ipcMain.handle('plugin:activateExtension', async (_, extensionId: string) => {
      try {
        await this.vscodeStyleManager.activateExtension(extensionId)
        return true
      } catch (error) {
        console.error(`Failed to activate extension ${extensionId}:`, error)
        return false
      }
    })

    // 停用扩展
    ipcMain.handle('plugin:deactivateExtension', async (_, extensionId: string) => {
      return this.vscodeStyleManager.deactivateExtension(extensionId)
    })

    // 安装扩展
    ipcMain.handle('plugin:installExtension', async (_, packageName: string, _version?: string) => {
      return this.vscodeStyleManager.installExtension(packageName)
    })

    // 卸载扩展
    ipcMain.handle('plugin:uninstallExtension', async (_, extensionId: string) => {
      return this.vscodeStyleManager.uninstallExtension(extensionId)
    })

    // 搜索扩展
    ipcMain.handle('plugin:searchExtensions', async (_, query: string) => {
      return this.vscodeStyleManager.searchExtensions(query)
    })

    // 获取扩展统计信息
    ipcMain.handle('plugin:getExtensionStats', async () => {
      // TODO: 实现获取扩展统计信息的逻辑
      return { totalExtensions: 0, activeExtensions: 0 }
    })

    // 重新加载扩展
    ipcMain.handle('plugin:reloadExtension', async (_, extensionId: string) => {
      return this.vscodeStyleManager.reloadExtension(extensionId)
    })

    // 获取扩展贡献点
    ipcMain.handle('plugin:getContributions', async (_, type?: string) => {
      return this.vscodeStyleManager.getContributions(type || '')
    })

    // 执行命令
    ipcMain.handle('plugin:executeCommand', async (_, command: string, ...args: any[]) => {
      return this.vscodeStyleManager.executeCommand(command, ...args)
    })

    // 获取所有命令
    ipcMain.handle('plugin:getAllCommands', async () => {
      return this.vscodeStyleManager.getAllCommands()
    })

    // 触发激活事件
    ipcMain.handle('plugin:triggerActivationEvent', async (_, event: string, data?: any) => {
      return this.vscodeStyleManager.fireActivationEvent(event, data)
    })

    // 文件系统相关处理器
    ipcMain.handle('fs:exists', async (_, filePath: string) => {
      try {
        const fs = await import('fs')
        return fs.existsSync(filePath)
      } catch (error) {
        logger.error('检查文件存在失败:', error)
        return false
      }
    })

    // 注册获取扩展文件URL处理器
    ipcMain.handle('plugin:get-extension-file-url', async (_event, extensionPath: string, relativePath: string) => {
      try {
        return this.getExtensionFileUrl(extensionPath, relativePath)
      } catch (error) {
        logger.error('Failed to get extension file URL:', error)
        throw error
      }
    })

    // 注册插件配置窗口相关的IPC处理器
    ipcMain.handle('plugin:window:open-config', async (_event, pluginId: string) => {
      return this.openConfigWindow(pluginId)
    })

    // 测试用的IPC处理器
    ipcMain.handle('plugin:window:open-test-config', async (_event) => {
      try {
        const window = this.openTestConfigWindow()
        return { success: true, windowId: window.id }
      } catch (error) {
        logger.error('打开测试配置窗口失败:', error)
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })

    // 窗口控制处理器
    ipcMain.on('plugin:window:close', (event) => {
      const window = BrowserWindow.fromWebContents(event.sender)
      if (window) {
        // 从配置窗口映射中移除
        for (const [pluginId, configWindow] of this.configWindows.entries()) {
          if (configWindow === window) {
            this.configWindows.delete(pluginId)
            break
          }
        }
        window.close()
      }
    })

    ipcMain.on('plugin:window:minimize', (event) => {
      const window = BrowserWindow.fromWebContents(event.sender)
      window?.minimize()
    })

    ipcMain.on('plugin:window:maximize', (event) => {
      const window = BrowserWindow.fromWebContents(event.sender)
      if (window?.isMaximized()) {
        window.restore()
      } else {
        window?.maximize()
      }
    })

    ipcMain.on('plugin:window:restore', (event) => {
      const window = BrowserWindow.fromWebContents(event.sender)
      window?.restore()
    })

    ipcMain.handle('plugin:window:set-size', async (event, width: number, height: number) => {
      const window = BrowserWindow.fromWebContents(event.sender)
      if (window) {
        window.setSize(width, height)
        return { success: true }
      }
      return { success: false, error: 'Window not found' }
    })

    ipcMain.handle('plugin:window:set-title', async (event, title: string) => {
      const window = BrowserWindow.fromWebContents(event.sender)
      if (window) {
        window.setTitle(title)
        return { success: true }
      }
      return { success: false, error: 'Window not found' }
    })

    // 插件显示配置处理器
    ipcMain.handle('plugin:display-config:save', async (_event, { pluginId, displayConfig }) => {
      try {
        await this.saveDisplayConfig(pluginId, displayConfig)
        return { success: true }
      } catch (error) {
        logger.error('保存显示配置失败:', error)
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })

    ipcMain.handle('plugin:display-config:get', async (_event, pluginId: string) => {
      try {
        return await this.getDisplayConfig(pluginId)
      } catch (error) {
        logger.error('获取显示配置失败:', error)
        return null
      }
    })

    // 在新窗口中打开插件
    ipcMain.handle('plugin:window:open-plugin', async (_event, { pluginId, windowOptions }) => {
      try {
        return await this.openPluginWindow(pluginId, windowOptions)
      } catch (error) {
        logger.error('在新窗口中打开插件失败:', error)
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })

    logger.info('插件系统IPC处理器设置完成')
  }

  /**
   * 获取VSCode风格插件管理器
   */
  public getVSCodeStyleManager(): VSCodeStylePluginManager {
    return this.vscodeStyleManager
  }

  /**
   * 打开插件配置窗口
   * @param pluginId 插件ID
   * @returns 窗口创建结果
   */
  private async openConfigWindow(pluginId: string): Promise<{ success: boolean; windowId?: number; error?: string }> {
    try {
      // 检查是否已经有该插件的配置窗口
      if (this.configWindows.has(pluginId)) {
        const existingWindow = this.configWindows.get(pluginId)
        if (existingWindow && !existingWindow.isDestroyed()) {
          existingWindow.focus()
          return { success: true, windowId: existingWindow.id }
        } else {
          // 清理已销毁的窗口引用
          this.configWindows.delete(pluginId)
        }
      }

      // 获取主窗口作为父窗口
      const mainWindow = BrowserWindow.getAllWindows().find(win => !win.isDestroyed())
      
      // 创建配置窗口
      const configWindow = new BrowserWindow({
        width: 800,
        height: 600,
        parent: mainWindow, // 设置父窗口
        modal: false, // 非模态窗口，允许与主窗口并行操作
        show: false,
        autoHideMenuBar: true,
        title: `插件配置 - ${pluginId}`,
        webPreferences: {
          preload: join(__dirname, '../preload/plugin-preload.js'),
          sandbox: false,
          contextIsolation: true,
          nodeIntegration: false,
          webSecurity: false // 允许加载本地HTTP资源
        }
      })

      // 窗口准备显示时的处理
      configWindow.on('ready-to-show', () => {
        configWindow.show()
        // 在开发模式下打开开发者工具
        if (is.dev) {
          configWindow.webContents.openDevTools()
        }
      })

      // 窗口关闭时清理引用
      configWindow.on('closed', () => {
        this.configWindows.delete(pluginId)
      })

      // 加载配置页面
      if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
        // 开发环境：加载开发服务器的配置页面
        await configWindow.loadURL(`${process.env['ELECTRON_RENDERER_URL']}/#/plugin-config/${pluginId}`)
      } else {
        // 生产环境：加载打包后的配置页面
        await configWindow.loadFile(join(__dirname, '../renderer/index.html'), {
          hash: `/plugin-config/${pluginId}`
        })
      }

      // 开发模式下打开开发者工具
      if (is.dev) {
        configWindow.webContents.openDevTools()
      }

      // 保存窗口引用
      this.configWindows.set(pluginId, configWindow)

      logger.info(`插件配置窗口已创建: ${pluginId}, windowId: ${configWindow.id}`)
      return { success: true, windowId: configWindow.id }
    } catch (error) {
      logger.error(`创建插件配置窗口失败: ${pluginId}`, error)
      return { 
        success: false, 
        error: error instanceof Error ? error.message : String(error) 
      }
    }
  }

  /**
   * 启动扩展文件服务器
   * 提供扩展webview文件的HTTP访问
   */
  private async startExtensionServer(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.extensionServer = createServer(async (req, res) => {
          try {
            // 解析请求URL
            const url = new URL(req.url || '/', 'http://localhost')
            const pathname = url.pathname
            
            // 安全检查：只允许访问extensions目录下的文件
            if (!pathname.startsWith('/extensions/')) {
              res.writeHead(404, { 'Content-Type': 'text/plain' })
              res.end('Not Found')
              return
            }
            
            // 构建文件路径
            const relativePath = pathname.substring(1) // 移除开头的 '/'
            
            // 在开发环境中使用process.cwd()，在生产环境中使用process.resourcesPath
            const isDev = process.env.NODE_ENV === 'development'
            const appPath = isDev ? process.cwd() : process.resourcesPath
            const filePath = path.join(appPath, relativePath)
            
            // 安全检查：确保文件路径在extensions目录内
            const extensionsDir = path.join(appPath, 'extensions')
            const resolvedPath = path.resolve(filePath)
            const resolvedExtensionsDir = path.resolve(extensionsDir)
            
            if (!resolvedPath.startsWith(resolvedExtensionsDir)) {
              res.writeHead(403, { 'Content-Type': 'text/plain' })
              res.end('Forbidden')
              return
            }
            
            // 检查文件是否存在
            const stats = await stat(resolvedPath)
            if (!stats.isFile()) {
              res.writeHead(404, { 'Content-Type': 'text/plain' })
              res.end('Not Found')
              return
            }
            
            // 读取文件内容
            const content = await readFile(resolvedPath)
            
            // 设置正确的Content-Type
            const ext = path.extname(resolvedPath).toLowerCase()
            let contentType = 'text/plain'
            switch (ext) {
              case '.html':
                contentType = 'text/html; charset=utf-8'
                break
              case '.css':
                contentType = 'text/css; charset=utf-8'
                break
              case '.js':
                contentType = 'application/javascript; charset=utf-8'
                break
              case '.json':
                contentType = 'application/json; charset=utf-8'
                break
              case '.png':
                contentType = 'image/png'
                break
              case '.jpg':
              case '.jpeg':
                contentType = 'image/jpeg'
                break
              case '.svg':
                contentType = 'image/svg+xml; charset=utf-8'
                break
            }
            
            // 设置CORS头部以允许跨域访问
            res.writeHead(200, {
              'Content-Type': contentType,
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'GET',
              'Access-Control-Allow-Headers': 'Content-Type'
            })
            res.end(content)
            
          } catch (error) {
            logger.error('Extension server request error:', error)
            res.writeHead(500, { 'Content-Type': 'text/plain' })
            res.end('Internal Server Error')
          }
        })
        
        // 监听随机端口
        this.extensionServer.listen(0, 'localhost', () => {
          const address = this.extensionServer.address()
          this.extensionServerPort = address?.port || 0
          logger.info(`扩展文件服务器已启动，端口: ${this.extensionServerPort}`)
          resolve()
        })
        
        this.extensionServer.on('error', (error: Error) => {
          logger.error('Extension server error:', error)
          reject(error)
        })
        
      } catch (error) {
        logger.error('Failed to start extension server:', error)
        reject(error)
      }
    })
  }

  /**
   * 获取扩展文件的HTTP URL
   */
  public getExtensionFileUrl(extensionPath: string, relativePath: string): string {
    if (this.extensionServerPort === 0) {
      throw new Error('Extension server not started')
    }
    
    // 从扩展路径中提取扩展ID
    const extensionId = path.basename(extensionPath)
    const url = `http://localhost:${this.extensionServerPort}/extensions/${extensionId}/${relativePath}`
    return url
  }

  /**
   * 关闭插件系统
   */
  public async shutdown(): Promise<void> {
    try {
      logger.info('开始关闭插件系统...')
      
      // 关闭扩展文件服务器
      if (this.extensionServer) {
        this.extensionServer.close()
        this.extensionServer = null
        this.extensionServerPort = 0
        logger.info('扩展文件服务器已关闭')
      }
      
      // TODO: 实现停用所有扩展的逻辑
      // 目前只有单个扩展停用方法 deactivateExtension(extensionId)
      
      // TODO: 实现清理资源的逻辑
      
      this.isInitialized = false
      logger.info('插件系统关闭完成')
    } catch (error) {
      logger.error('插件系统关闭失败:', error)
      throw error
    }
  }

  /**
   * 检查是否已初始化
   */
  public isReady(): boolean {
    return this.isInitialized
  }

  /**
   * 打开测试配置窗口
   */
  private openTestConfigWindow(): BrowserWindow {
    // 检查是否已经存在测试配置窗口
    const existingWindow = this.configWindows.get('test')
    if (existingWindow && !existingWindow.isDestroyed()) {
      existingWindow.focus()
      return existingWindow
    }

    // 获取主窗口作为父窗口
    const mainWindow = BrowserWindow.getAllWindows().find(win => !win.isDestroyed())

    // 创建配置窗口
    const configWindow = new BrowserWindow({
      width: 700,
      height: 600,
      minWidth: 500,
      minHeight: 400,
      parent: mainWindow,
      modal: false,
      show: false,
      autoHideMenuBar: true,
      title: '插件配置测试',
      webPreferences: {
        preload: join(__dirname, '../preload/plugin-preload.js'),
        sandbox: false,
        contextIsolation: true,
        nodeIntegration: false,
        webSecurity: false
      }
    })

    // 窗口准备好后显示
    configWindow.once('ready-to-show', () => {
      configWindow.show()
    })

    // 窗口关闭时清理引用
    configWindow.on('closed', () => {
      this.configWindows.delete('test')
    })

    // 加载测试页面
    const testFilePath = join(__dirname, '../../../../test-plugin-config.html')
    configWindow.loadFile(testFilePath)

    // 开发模式下打开开发者工具
    if (is.dev) {
      configWindow.webContents.openDevTools()
    }

    // 保存窗口引用
    this.configWindows.set('test', configWindow)

    return configWindow
  }

  /**
   * 保存插件显示配置
   */
  private async saveDisplayConfig(pluginId: string, displayConfig: any): Promise<void> {
    try {
      const configDir = path.join(app.getPath('userData'), 'plugin-configs')
      await mkdir(configDir, { recursive: true })
      
      const configFile = path.join(configDir, `${pluginId}-display.json`)
      await writeFile(configFile, JSON.stringify(displayConfig, null, 2), 'utf-8')
      
      logger.info(`插件 ${pluginId} 显示配置已保存`)
    } catch (error) {
      logger.error(`保存插件 ${pluginId} 显示配置失败:`, error)
      throw error
    }
  }

  /**
   * 获取插件显示配置
   */
  private async getDisplayConfig(pluginId: string): Promise<any> {
    try {
      const configDir = path.join(app.getPath('userData'), 'plugin-configs')
      const configFile = path.join(configDir, `${pluginId}-display.json`)
      
      const configData = await readFile(configFile, 'utf-8')
      return JSON.parse(configData)
    } catch (error: any) {
      // 如果文件不存在，返回默认配置
      if (error.code === 'ENOENT') {
        logger.info(`插件 ${pluginId} 显示配置文件不存在，返回默认配置`)
        return {
          openMode: 'newWindow',
          windowWidth: 800,
          windowHeight: 600,
          resizable: true,
          minimizable: true,
          maximizable: true,
          alwaysOnTop: false
        }
      }
      
      logger.error(`获取插件 ${pluginId} 显示配置失败:`, error)
      throw error
    }
  }

  /**
   * 在新窗口中打开插件
   */
  private async openPluginWindow(pluginId: string, windowOptions: any): Promise<{ success: boolean; windowId?: number; error?: string }> {
    try {
      // 获取插件信息
      const extension = this.vscodeStyleManager.getExtension(pluginId)
      if (!extension) {
        return { success: false, error: `插件 ${pluginId} 不存在` }
      }

      // 获取显示配置
      const displayConfig = await this.getDisplayConfig(pluginId)
      const config = { ...displayConfig, ...windowOptions }

      // 获取主窗口作为父窗口
      const mainWindow = BrowserWindow.getAllWindows().find(win => !win.isDestroyed())
      
      // 创建插件窗口
      const pluginWindow = new BrowserWindow({
        width: config.windowWidth || 800,
        height: config.windowHeight || 600,
        parent: mainWindow,
        modal: false,
        show: false,
        autoHideMenuBar: true,
        title: extension.manifest.displayName || extension.manifest.name || pluginId,
        resizable: config.resizable !== false,
        minimizable: config.minimizable !== false,
        maximizable: config.maximizable !== false,
        alwaysOnTop: config.alwaysOnTop === true,
        webPreferences: {
          preload: join(__dirname, '../preload/plugin-preload.js'),
          sandbox: false,
          contextIsolation: true,
          nodeIntegration: false,
          webSecurity: false
        }
      })

      // 窗口准备显示时的处理
      pluginWindow.on('ready-to-show', () => {
        pluginWindow.show()
        if (is.dev) {
          pluginWindow.webContents.openDevTools()
        }
      })

      // 加载插件页面（使用独立的插件窗口路由，不包含主布局）
      if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
        await pluginWindow.loadURL(`${process.env['ELECTRON_RENDERER_URL']}/#/plugin-window/${pluginId}`)
      } else {
        await pluginWindow.loadFile(join(__dirname, '../renderer/index.html'), {
          hash: `/plugin-window/${pluginId}`
        })
      }

      logger.info(`插件窗口已创建: ${pluginId}, windowId: ${pluginWindow.id}`)
      return { success: true, windowId: pluginWindow.id }
    } catch (error) {
      logger.error(`创建插件窗口失败: ${pluginId}`, error)
      return { 
        success: false, 
        error: error instanceof Error ? error.message : String(error) 
      }
    }
  }
}

/**
 * 导出单例实例
 */
export const pluginSystemManager = PluginSystemManager.getInstance()