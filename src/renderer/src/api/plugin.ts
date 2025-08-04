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
  static async listPlugins(): Promise<{ success: boolean; plugins?: PluginInfo[]; error?: string }> {
    try {
      console.log(window.electron,'window.electron')
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
      const result = await window.electron.ipcRenderer.invoke('plugin:manager:install-local', zipPath)
      return result
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  /**
   * 安装远程插件
   */
  static async installRemotePlugin(url: string): Promise<PluginInstallResult> {
    try {
      const result = await window.electron.ipcRenderer.invoke('plugin:manager:install-remote', url)
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
      const result = await window.electron.ipcRenderer.invoke('plugin:manager:setConfig', pluginId, config)
      return result
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  /**
   * 加载前端插件
   */
  static async loadFrontendPlugin(pluginId: string): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      const result = await window.electron.ipcRenderer.invoke('plugin:frontend:load', pluginId)
      return result
    } catch (error: any) {
      return { success: false, error: error.message }
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
          { name: 'ZIP文件', extensions: ['zip'] },
          { name: '所有文件', extensions: ['*'] }
        ]
      })
      
      if (result.canceled || !result.filePaths || result.filePaths.length === 0) {
        return { success: false, error: '用户取消选择' }
      }
      
      return { success: true, filePath: result.filePaths[0] }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }
}

export default PluginAPI