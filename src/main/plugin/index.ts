import { app } from 'electron'
import { pluginSystemManager } from './integration'

/**
 * VSCode风格插件系统主类
 * 提供统一的插件管理接口，只支持VSCode风格的插件结构
 */
export class PluginSystem {
  private initialized: boolean = false

  constructor() {
    // 构造函数保持简洁
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
      console.log('Initializing VSCode-style plugin system...')

      // 等待应用准备就绪
      await app.whenReady()

      // 初始化VSCode风格插件系统
      await pluginSystemManager.initialize()
      console.log('VSCode-style plugin system initialized successfully')

      this.initialized = true
    } catch (error) {
      console.error('Failed to initialize plugin system:', error)
      throw error
    }
  }

  /**
   * 获取VSCode风格插件管理器
   */
  public getVSCodeStyleManager() {
    return pluginSystemManager.getVSCodeStyleManager()
  }

  /**
   * 安装扩展
   */
  public async installExtension(
    packageName: string,
    _version?: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      await pluginSystemManager.getVSCodeStyleManager().installExtension(packageName)
      return { success: true }
    } catch (error) {
      console.error('Failed to install extension:', error)
      return { success: false, error: error instanceof Error ? error.message : String(error) }
    }
  }

  /**
   * 卸载扩展
   */
  public async uninstallExtension(
    extensionId: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      await pluginSystemManager.getVSCodeStyleManager().uninstallExtension(extensionId)
      return { success: true }
    } catch (error) {
      console.error('Failed to uninstall extension:', error)
      return { success: false, error: error instanceof Error ? error.message : String(error) }
    }
  }

  /**
   * 重新加载扩展
   */
  public async reloadExtension(extensionId: string): Promise<{ success: boolean; error?: string }> {
    try {
      await pluginSystemManager.getVSCodeStyleManager().reloadExtension(extensionId)
      return { success: true }
    } catch (error) {
      console.error('Failed to reload extension:', error)
      return { success: false, error: error instanceof Error ? error.message : String(error) }
    }
  }

  /**
   * 获取扩展统计信息
   */
  public getExtensionStats() {
    // TODO: 实现获取扩展统计信息的逻辑
    return { totalExtensions: 0, activeExtensions: 0 }
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
      await pluginSystemManager.shutdown()
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

// 导出插件系统管理器
export { pluginSystemManager }

// 导出VSCode风格插件系统相关类型
export * from './vscode-style/types'
export * from './vscode-style/VSCodeStylePluginManager'
