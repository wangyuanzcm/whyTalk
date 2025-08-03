import { app } from 'electron'
import { PluginManager } from './PluginManager'
import { SecurityManager } from './SecurityManager'
import { FrontendPluginRenderer } from './FrontendPluginRenderer'
import { PluginAPIHandler } from './PluginAPIHandler'

/**
 * 插件系统主类
 * 整合所有插件相关组件，提供统一的插件管理接口
 */
export class PluginSystem {
  private pluginManager: PluginManager
  private securityManager: SecurityManager
  private frontendRenderer: FrontendPluginRenderer
  private apiHandler: PluginAPIHandler
  private initialized: boolean = false

  constructor() {
    this.securityManager = new SecurityManager()
    this.pluginManager = new PluginManager()
    this.frontendRenderer = new FrontendPluginRenderer(this.securityManager)
    this.apiHandler = new PluginAPIHandler(this.securityManager, this.pluginManager)
  }

  /**
   * 初始化插件系统
   */
  public async initialize(): Promise<void> {
    if (this.initialized) {
      console.warn('Plugin system already initialized')
      return
    }

    try {
      console.log('Initializing plugin system...')

      // 等待应用准备就绪
      await app.whenReady()

      // 加载所有插件
      await this.pluginManager.loadAllPlugins()

      // 设置插件信息获取处理器（用于FrontendPluginRenderer）
      this.setupPluginInfoHandler()

      this.initialized = true
      console.log('Plugin system initialized successfully')
    } catch (error) {
      console.error('Failed to initialize plugin system:', error)
      throw error
    }
  }

  /**
   * 设置插件信息获取处理器
   */
  private setupPluginInfoHandler() {
    const { ipcMain } = require('electron')

    // 处理插件信息获取请求
    ipcMain.on('plugin:get-info', (_event, pluginId: string, callback: Function) => {
      const plugin = this.pluginManager.getPlugin(pluginId)
      callback(plugin)
    })
  }

  /**
   * 获取插件管理器
   */
  public getPluginManager(): PluginManager {
    return this.pluginManager
  }

  /**
   * 获取安全管理器
   */
  public getSecurityManager(): SecurityManager {
    return this.securityManager
  }

  /**
   * 获取前端渲染器
   */
  public getFrontendRenderer(): FrontendPluginRenderer {
    return this.frontendRenderer
  }

  /**
   * 获取API处理器
   */
  public getAPIHandler(): PluginAPIHandler {
    return this.apiHandler
  }

  /**
   * 安装插件
   */
  public async installPlugin(pluginPath: string): Promise<{ success: boolean; error?: string }> {
    try {
      // 这里可以实现插件安装逻辑
      // 例如：解压插件包、验证签名、复制文件等
      console.log(`Installing plugin from: ${pluginPath}`)

      // 重新加载插件
      await this.pluginManager.loadAllPlugins()

      return { success: true }
    } catch (error) {
      console.error('Failed to install plugin:', error)
      return { success: false, error: error instanceof Error ? error.message : String(error) }
    }
  }

  /**
   * 卸载插件
   */
  public async uninstallPlugin(pluginId: string): Promise<{ success: boolean; error?: string }> {
    try {
      // 关闭插件窗口
      this.frontendRenderer.closePluginWindow(pluginId)

      // 卸载插件
      const success = await this.pluginManager.unloadPlugin(pluginId)

      if (success) {
        // 清理权限
        this.securityManager.revokeAllPermissions(pluginId)
        return { success: true }
      } else {
        return { success: false, error: 'Plugin not found' }
      }
    } catch (error) {
      console.error('Failed to uninstall plugin:', error)
      return { success: false, error: error instanceof Error ? error.message : String(error) }
    }
  }

  /**
   * 重新加载插件
   */
  public async reloadPlugin(pluginId: string): Promise<{ success: boolean; error?: string }> {
    try {
      // 先卸载
      await this.uninstallPlugin(pluginId)

      // 重新加载所有插件
      await this.pluginManager.loadAllPlugins()

      return { success: true }
    } catch (error) {
      console.error('Failed to reload plugin:', error)
      return { success: false, error: error instanceof Error ? error.message : String(error) }
    }
  }

  /**
   * 获取插件统计信息
   */
  public getPluginStats() {
    const allPlugins = this.pluginManager.getAllPlugins()
    const frontendPlugins = allPlugins.filter((p) => p.type === 'frontend')
    const systemPlugins = allPlugins.filter((p) => p.type === 'system')
    const enabledPlugins = allPlugins.filter((p) => p.enabled)
    const openWindows = this.frontendRenderer.getOpenPluginWindows()

    return {
      total: allPlugins.length,
      frontend: frontendPlugins.length,
      system: systemPlugins.length,
      enabled: enabledPlugins.length,
      disabled: allPlugins.length - enabledPlugins.length,
      openWindows: openWindows.length
    }
  }

  /**
   * 清理插件系统
   */
  public async cleanup(): Promise<void> {
    if (!this.initialized) {
      return
    }

    try {
      console.log('Cleaning up plugin system...')

      // 关闭所有插件窗口
      this.frontendRenderer.closeAllPluginWindows()

      // 卸载所有插件
      const allPlugins = this.pluginManager.getAllPlugins()
      for (const plugin of allPlugins) {
        await this.pluginManager.unloadPlugin(plugin.id)
      }

      this.initialized = false
      console.log('Plugin system cleaned up successfully')
    } catch (error) {
      console.error('Failed to cleanup plugin system:', error)
    }
  }

  /**
   * 检查插件系统是否已初始化
   */
  public isInitialized(): boolean {
    return this.initialized
  }
}

// 导出单例实例
export const pluginSystem = new PluginSystem()

// 导出初始化函数
export async function initPlugins(): Promise<void> {
  await pluginSystem.initialize()
}

// 导出所有组件类型
export * from './PluginManager'
export * from './SecurityManager'
export * from './FrontendPluginRenderer'
export * from './PluginAPIHandler'
