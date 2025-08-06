import { BrowserWindow, ipcMain, session } from 'electron'
import { join } from 'path'
import { PluginInstance, PluginType, CubeModuleConfig } from './PluginManager'
import { SecurityManager } from './SecurityManager'

/**
 * 前端插件渲染器
 * 负责在独立的BrowserWindow中安全地渲染前端插件
 */
export class FrontendPluginRenderer {
  private pluginWindows: Map<string, BrowserWindow> = new Map()
  private securityManager: SecurityManager

  constructor(securityManager: SecurityManager) {
    this.securityManager = securityManager
    this.setupIpcHandlers()
  }

  /**
   * 设置IPC处理器
   */
  private setupIpcHandlers() {
    // 打开前端插件窗口
    ipcMain.handle('plugin:frontend:open', async (_event, pluginId: string) => {
      return await this.openPluginWindow(pluginId)
    })

    // 打开系统插件UI窗口
    ipcMain.handle('plugin:system:open-ui', async (_event, pluginId: string) => {
      return await this.openSystemPluginUIWindow(pluginId)
    })

    // 关闭前端插件窗口
    ipcMain.handle('plugin:frontend:close', (_event, pluginId: string) => {
      return this.closePluginWindow(pluginId)
    })

    // 获取插件窗口状态
    ipcMain.handle('plugin:frontend:status', (_event, pluginId: string) => {
      const window = this.pluginWindows.get(pluginId)
      return {
        isOpen: !!window && !window.isDestroyed(),
        isVisible: window ? window.isVisible() : false,
        isFocused: window ? window.isFocused() : false
      }
    })
  }

  /**
   * 打开系统插件UI窗口
   */
  public async openSystemPluginUIWindow(
    pluginId: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      // 检查窗口是否已存在
      const existingWindow = this.pluginWindows.get(`${pluginId}-ui`)
      if (existingWindow && !existingWindow.isDestroyed()) {
        existingWindow.focus()
        return { success: true }
      }

      const plugin = await this.getPluginInfo(pluginId)
      if (!plugin || plugin.type !== PluginType.SYSTEM) {
        return { success: false, error: 'System plugin not found' }
      }

      // 检查插件是否有UI配置
      const config = plugin.config as any
      if (!config.ui || !config.ui.components) {
        return { success: false, error: 'Plugin has no UI configuration' }
      }

      const window = await this.createSystemPluginUIWindow(plugin)
      this.pluginWindows.set(`${pluginId}-ui`, window)
      this.setupWindowEvents(`${pluginId}-ui`, window)

      return { success: true }
    } catch (error) {
      console.error(`Failed to open system plugin UI window for ${pluginId}:`, error)
      return { success: false, error: error instanceof Error ? error.message : String(error) }
    }
  }

  /**
   * 打开插件窗口
   */
  public async openPluginWindow(pluginId: string): Promise<{ success: boolean; error?: string }> {
    try {
      console.log(`Opening frontend plugin window for: ${pluginId}`)

      // 检查窗口是否已存在
      const existingWindow = this.pluginWindows.get(pluginId)
      if (existingWindow && !existingWindow.isDestroyed()) {
        console.log(`Window already exists for ${pluginId}, focusing...`)
        existingWindow.focus()
        return { success: true }
      }

      // 获取插件信息（这里需要从PluginManager获取）
      console.log(`Getting plugin info for: ${pluginId}`)
      const plugin = await this.getPluginInfo(pluginId)
      console.log(
        `Plugin info retrieved:`,
        plugin ? { id: plugin.id, type: plugin.type, path: plugin.path } : 'null'
      )

      if (!plugin || plugin.type !== PluginType.FRONTEND) {
        console.error(`Frontend plugin not found or wrong type: ${pluginId}`)
        return { success: false, error: 'Frontend plugin not found' }
      }

      // 创建插件窗口
      console.log(`Creating plugin window for: ${pluginId}`)
      const window = await this.createPluginWindow(plugin)
      this.pluginWindows.set(pluginId, window)

      // 设置窗口事件监听
      this.setupWindowEvents(pluginId, window)

      console.log(`Plugin window created successfully for: ${pluginId}`)
      return { success: true }
    } catch (error) {
      console.error(`Failed to open plugin window for ${pluginId}:`, error)
      return { success: false, error: error instanceof Error ? error.message : String(error) }
    }
  }

  /**
   * 创建系统插件UI窗口
   */
  private async createSystemPluginUIWindow(plugin: PluginInstance): Promise<BrowserWindow> {
    const config = plugin.config as any

    const window = new BrowserWindow({
      width: 1000,
      height: 700,
      title: `${config.name} v${config.version} - UI`,
      show: false,
      autoHideMenuBar: true,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        sandbox: false,
        preload: join(__dirname, '../preload/index.js')
      }
    })

    // 添加错误处理
    window.webContents.on('did-fail-load', (_event, errorCode, errorDescription) => {
      console.error(`Failed to load plugin UI for ${plugin.id}:`, errorCode, errorDescription)
    })

    window.webContents.on('crashed', () => {
      console.error(`Plugin UI window crashed for ${plugin.id}`)
    })

    // 检查插件是否有HTML文件
    const isHtmlFile = config.main && config.main.endsWith('.html')

    try {
      if (isHtmlFile) {
        console.log(`Loading plugin HTML content for ${plugin.id}:`, config.main)
        // 如果插件有HTML文件，加载插件自己的内容
        await this.loadPluginContent(window, plugin)
        // 内容加载完成后立即显示窗口
        console.log(`Content loaded successfully for ${plugin.id}, showing window`)
        window.show()
      } else {
        console.log(`Loading default UI config demo for ${plugin.id}`)
        // 如果没有HTML文件，加载默认的UI配置演示页面
        const isDev = process.env.NODE_ENV === 'development'
        if (isDev && process.env['ELECTRON_RENDERER_URL']) {
          await window.loadURL(
            `${process.env['ELECTRON_RENDERER_URL']}/ui-config-demo.html?plugin=${plugin.id}`
          )
        } else {
          await window.loadFile(join(__dirname, '../renderer/ui-config-demo.html'), {
            query: { plugin: plugin.id }
          })
        }
        // 默认页面加载完成后显示窗口
        window.show()
      }
    } catch (error) {
      console.error(`Error loading content for plugin ${plugin.id}:`, error)
      // 即使加载失败也显示窗口，这样用户可以看到错误
      window.show()
      return window
    }

    // 注意：窗口显示现在由内容加载完成后手动控制
    // ready-to-show事件和超时机制已移除，改为在内容加载完成后立即显示

    return window
  }

  /**
   * 创建插件窗口
   */
  private async createPluginWindow(plugin: PluginInstance): Promise<BrowserWindow> {
    const config = plugin.config as CubeModuleConfig
    const sandboxConfig = this.securityManager.createSandboxConfig(plugin)

    // 创建独立的session用于插件隔离
    const partitionName = `plugin-${plugin.id}`
    const pluginSession = session.fromPartition(partitionName, {
      cache: false
    })

    // 确保partition属性被正确设置
    ;(pluginSession as any).partition = partitionName

    // 设置安全策略
    await this.setupPluginSecurity(pluginSession, plugin)

    const window = new BrowserWindow({
      width: 800,
      height: 600,
      title: `${config.name} v${config.version}`,
      show: false,
      autoHideMenuBar: true,
      webPreferences: {
        ...sandboxConfig,
        session: pluginSession,
        preload: join(__dirname, '../preload/plugin-preload.js')
      }
    })

    // 加载插件内容
    await this.loadPluginContent(window, plugin)

    // 内容加载完成后直接显示窗口
    console.log(`Showing plugin window for: ${plugin.id}`)
    window.show()

    return window
  }

  /**
   * 设置插件安全策略
   */
  private async setupPluginSecurity(pluginSession: Electron.Session, plugin: PluginInstance) {
    // 设置CSP (Content Security Policy)
    pluginSession.webRequest.onHeadersReceived((details, callback) => {
      callback({
        responseHeaders: {
          ...details.responseHeaders,
          'Content-Security-Policy': [
            "default-src 'self'; " +
              "script-src 'self' 'unsafe-inline'; " +
              "style-src 'self' 'unsafe-inline'; " +
              "img-src 'self' data: https:; " +
              "connect-src 'self';"
          ]
        }
      })
    })

    // 拦截网络请求
    pluginSession.webRequest.onBeforeRequest((details, callback) => {
      const url = details.url

      // 检查URL是否被允许
      if (!this.securityManager.isUrlAllowed(plugin, url)) {
        console.warn(`Blocked request to ${url} from plugin ${plugin.id}`)
        callback({ cancel: true })
        return
      }

      callback({ cancel: false })
    })

    // 设置权限策略
    pluginSession.setPermissionRequestHandler(async (_webContents, permission, callback) => {
      // 将Electron权限映射到我们的权限系统
      const permissionMap = {
        camera: 'camera',
        microphone: 'microphone',
        geolocation: 'location',
        notifications: 'notifications'
      }

      const mappedPermission = permissionMap[permission]
      if (mappedPermission) {
        const result = await this.securityManager.checkPermission(plugin, mappedPermission as any)
        callback(result.granted)
      } else {
        callback(false)
      }
    })
  }

  /**
   * 加载插件内容
   */
  private async loadPluginContent(window: BrowserWindow, plugin: PluginInstance) {
    const config = plugin.config as CubeModuleConfig
    const htmlPath = join(plugin.path, config.main)

    return new Promise<void>((resolve, reject) => {
      // 监听页面加载完成事件
      window.webContents.once('did-finish-load', async () => {
        try {
          console.log(`Page loaded for plugin ${plugin.id}, injecting API...`)

          // 等待DOM完全准备好
          await window.webContents.executeJavaScript(`
            new Promise((resolve) => {
              if (document.readyState === 'complete') {
                resolve()
              } else {
                window.addEventListener('load', resolve)
              }
            })
          `)

          // 检查插件API是否已经通过preload脚本注入
          const apiAvailable = await window.webContents.executeJavaScript(`
            typeof window.pluginAPI !== 'undefined'
          `)

          if (apiAvailable) {
            console.log(`Plugin API already available for ${plugin.id} via preload script`)
          } else {
            console.log(
              `Plugin API not found for ${plugin.id}, this should not happen with proper preload script`
            )
            // 作为后备方案，手动注入基础API
            await window.webContents.executeJavaScript(`
              try {
                window.pluginAPI = {
                  id: ${JSON.stringify(plugin.id)},
                  name: ${JSON.stringify(config.name)},
                  version: ${JSON.stringify(config.version)},
                  getPluginInfo: () => ({
                    id: ${JSON.stringify(plugin.id)},
                    name: ${JSON.stringify(config.name)},
                    version: ${JSON.stringify(config.version)},
                    description: ${JSON.stringify(config.description || '')},
                    author: ${JSON.stringify(config.author || '')},
                    path: ${JSON.stringify(plugin.path)}
                  }),
                  sendMessage: (message) => {
                    console.warn('Plugin API not properly loaded - sendMessage not available')
                    return Promise.reject(new Error('Plugin API not properly loaded'))
                  },
                  requestPermission: (permission) => {
                    console.warn('Plugin API not properly loaded - requestPermission not available')
                    return Promise.reject(new Error('Plugin API not properly loaded'))
                  }
                }
                console.log('Fallback Plugin API injected for:', ${JSON.stringify(plugin.id)})
              } catch (error) {
                console.error('Failed to inject fallback plugin API:', error)
                throw error
              }
            `)
          }

          // 触发自定义事件，通知插件API已准备好
          await window.webContents.executeJavaScript(`
            try {
              // 确保 CustomEvent 可用
              if (typeof CustomEvent === 'undefined') {
                window.CustomEvent = function(event, params) {
                  params = params || { bubbles: false, cancelable: false, detail: undefined };
                  var evt = document.createEvent('CustomEvent');
                  evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
                  return evt;
                };
                CustomEvent.prototype = window.Event.prototype;
              }
              
              // 派发事件
              const readyEvent = new CustomEvent('pluginAPIReady');
              window.dispatchEvent(readyEvent);
            } catch (error) {
              console.error('Failed to dispatch pluginAPIReady event:', error)
            }
          `)

          console.log(`Plugin API injection completed for ${plugin.id}`)
          resolve()
        } catch (error) {
          console.error(`Failed to inject plugin API for ${plugin.id}:`, error)
          reject(error)
        }
      })

      // 监听加载失败事件
      window.webContents.once('did-fail-load', (_event, errorCode, errorDescription) => {
        console.error(
          `Failed to load plugin content for ${plugin.id}:`,
          errorCode,
          errorDescription
        )
        reject(new Error(`Failed to load plugin content: ${errorDescription}`))
      })

      // 开始加载HTML文件
      console.log(`Loading HTML file for plugin ${plugin.id}:`, htmlPath)
      window.loadFile(htmlPath).catch(reject)
    })
  }

  /**
   * 设置窗口事件监听
   */
  private setupWindowEvents(pluginId: string, window: BrowserWindow) {
    // 窗口关闭时清理
    window.on('closed', () => {
      this.pluginWindows.delete(pluginId)
      console.log(`Plugin window closed: ${pluginId}`)
    })

    // 监听窗口错误
    window.webContents.on('crashed', () => {
      console.error(`Plugin window crashed: ${pluginId}`)
      this.pluginWindows.delete(pluginId)
    })

    // 监听未处理的异常
    window.webContents.on('unresponsive', () => {
      console.warn(`Plugin window unresponsive: ${pluginId}`)
    })

    // 阻止新窗口打开
    window.webContents.setWindowOpenHandler(() => {
      return { action: 'deny' }
    })
  }

  /**
   * 关闭插件窗口
   */
  public closePluginWindow(pluginId: string): boolean {
    const window = this.pluginWindows.get(pluginId)
    if (window && !window.isDestroyed()) {
      window.close()
      return true
    }
    return false
  }

  /**
   * 关闭所有插件窗口
   */
  public closeAllPluginWindows() {
    for (const [_pluginId, window] of this.pluginWindows) {
      if (!window.isDestroyed()) {
        window.close()
      }
    }
    this.pluginWindows.clear()
  }

  /**
   * 获取插件信息（需要与PluginManager集成）
   */
  private async getPluginInfo(pluginId: string): Promise<PluginInstance | null> {
    // 这里应该调用PluginManager的方法获取插件信息
    // 为了避免循环依赖，可以通过事件或依赖注入的方式实现
    console.log(`Requesting plugin info via IPC for: ${pluginId}`)
    return new Promise((resolve) => {
      ipcMain.emit('plugin:get-info', null, pluginId, (plugin: PluginInstance | null) => {
        console.log(
          `IPC response for plugin ${pluginId}:`,
          plugin ? { id: plugin.id, type: plugin.type } : 'null'
        )
        resolve(plugin)
      })
    })
  }

  /**
   * 向插件窗口发送消息
   */
  public sendMessageToPlugin(pluginId: string, message: any) {
    const window = this.pluginWindows.get(pluginId)
    if (window && !window.isDestroyed()) {
      window.webContents.send('plugin:message', message)
    }
  }

  /**
   * 获取所有打开的插件窗口
   */
  public getOpenPluginWindows(): string[] {
    const openWindows: string[] = []
    for (const [pluginId, window] of this.pluginWindows) {
      if (!window.isDestroyed()) {
        openWindows.push(pluginId)
      }
    }
    return openWindows
  }

  /**
   * 刷新插件窗口
   */
  public refreshPluginWindow(pluginId: string) {
    const window = this.pluginWindows.get(pluginId)
    if (window && !window.isDestroyed()) {
      window.reload()
    }
  }
}
