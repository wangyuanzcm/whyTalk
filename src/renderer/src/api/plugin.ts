// 使用预加载脚本暴露的 API，而不是直接导入 electron

export interface PluginInfo {
  id: string
  type: 'frontend' | 'system'
  name: string
  version: string
  description?: string
  author?: string
  enabled: boolean
  permissions: string[]
  config?: {
    name?: string
    version?: string
    description?: string
    author?: string
    ui?: {
      settings?: any
    }
  }
}

export interface PluginInstallResult {
  success: boolean
  pluginId?: string
  error?: string
}

export interface PluginOperationResult {
  success: boolean
  error?: string
}

export interface PluginConfigResult {
  success: boolean
  config?: any
  error?: string
}

export class PluginAPI {
  /**
   * 获取所有插件列表
   */
  static async listPlugins(): Promise<{
    success: boolean
    plugins?: PluginInfo[]
    error?: string
  }> {
    try {
      console.log(window.electron, 'window.electron')
      const result = await window.electron.ipcRenderer.invoke('plugin:manager:list')
      return result
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  /**
   * 安装本地插件
   */
  static async installLocalPlugin(zipPath: string): Promise<PluginInstallResult> {
    try {
      const result = await window.electron.ipcRenderer.invoke(
        'plugin:manager:install-local',
        zipPath
      )
      return result
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  /**
   * 安装远程插件
   */
  static async installRemotePlugin(
    url: string,
    npmRegistry?: string
  ): Promise<PluginInstallResult> {
    try {
      const result = await window.electron.ipcRenderer.invoke('plugin:manager:install-remote', {
        url,
        npmRegistry
      })
      return result
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  /**
   * 通过npm包名安装插件
   */
  static async installNpmPlugin(
    packageName: string,
    npmRegistry?: string
  ): Promise<PluginInstallResult> {
    try {
      const result = await window.electron.ipcRenderer.invoke('plugin:manager:install-npm', {
        packageName,
        npmRegistry
      })
      return result
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  /**
   * 卸载插件
   */
  static async uninstallPlugin(pluginId: string): Promise<PluginOperationResult> {
    try {
      const result = await window.electron.ipcRenderer.invoke('plugin:manager:uninstall', pluginId)
      return result
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  /**
   * 启用插件
   */
  static async enablePlugin(pluginId: string): Promise<PluginOperationResult> {
    try {
      const result = await window.electron.ipcRenderer.invoke('plugin:manager:enable', pluginId)
      return result
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  /**
   * 禁用插件
   */
  static async disablePlugin(pluginId: string): Promise<PluginOperationResult> {
    try {
      const result = await window.electron.ipcRenderer.invoke('plugin:manager:disable', pluginId)
      return result
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  /**
   * 获取插件配置
   */
  static async getPluginConfig(pluginId: string): Promise<PluginConfigResult> {
    try {
      const result = await window.electron.ipcRenderer.invoke('plugin:manager:get-config', pluginId)
      return result
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  /**
   * 设置插件配置
   */
  static async setPluginConfig(pluginId: string, config: any): Promise<PluginOperationResult> {
    try {
      const result = await window.electron.ipcRenderer.invoke(
        'plugin:manager:setConfig',
        pluginId,
        config
      )
      return result
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  /**
   * 获取插件信息
   */
  static async getPluginInfo(
    pluginId: string
  ): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      const result = await window.electron.ipcRenderer.invoke('plugin:getPluginInfo', pluginId)
      return result
    } catch (error) {
      console.error('Failed to get plugin info:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }

  /**
   * 加载前端插件
   */
  static async loadFrontendPlugin(
    pluginId: string
  ): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      const result = await window.electron.ipcRenderer.invoke('plugin:loadFrontendPlugin', pluginId)
      return result
    } catch (error) {
      console.error('Failed to load frontend plugin:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }

  /**
   * 加载系统插件HTML
   */
  static async loadSystemPluginHTML(
    pluginId: string
  ): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      const result = await window.electron.ipcRenderer.invoke('plugin:loadSystemPluginHTML', pluginId)
      return result
    } catch (error) {
      console.error('Failed to load system plugin HTML:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }

  /**
   * 选择本地文件
   */
  static async selectLocalFile(): Promise<{ success: boolean; filePath?: string; error?: string }> {
    try {
      const result = await window.electron.ipcRenderer.invoke('plugin:files:select-file', {
        title: '选择插件文件',
        filters: [
          { name: 'TGZ文件', extensions: ['tgz', 'tar.gz'] },
          { name: 'ZIP文件', extensions: ['zip'] },
          { name: '所有文件', extensions: ['*'] }
        ]
      })
      console.log(result, 'result==')
      if (result.canceled || !result.filePath) {
        return { success: false, error: '用户取消选择' }
      }

      return { success: true, filePath: result.filePath }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }
}

export default PluginAPI
