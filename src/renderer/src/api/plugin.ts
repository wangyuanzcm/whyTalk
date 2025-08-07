// 使用预加载脚本暴露的 API，而不是直接导入 electron

// 传统插件接口
export interface PluginInfo {
  id: string
  type: 'frontend' | 'system' | 'cubeModule' | 'unified'
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
    frontend?: {
      settings?: any
    }
    backend?: {
      functions?: any
    }
  }
}

// VSCode风格扩展接口
export interface ExtensionInfo {
  id: string
  name: string
  displayName: string
  description: string
  version: string
  publisher: string
  isActive: boolean
  isBuiltin: boolean
  extensionPath: string
  packageJSON: any
  activationEvents: string[]
  contributes?: any
}

// 扩展搜索结果接口
export interface ExtensionSearchResult {
  id: string
  name: string
  displayName: string
  description: string
  version: string
  publisher: string
  downloads?: number
  rating?: number
  tags?: string[]
  repository?: string
  homepage?: string
}

// 扩展统计信息接口
export interface ExtensionStats {
  total: number
  active: number
  inactive: number
  builtin: number
  user: number
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
  // ========== VSCode风格扩展API ==========
  
  /**
   * 获取所有扩展
   */
  static async getAllExtensions(): Promise<ExtensionInfo[]> {
    try {
      return await window.electron.ipcRenderer.invoke('plugin:getAllExtensions')
    } catch (error: any) {
      console.error('Failed to get all extensions:', error)
      return []
    }
  }

  /**
   * 获取指定扩展
   */
  static async getExtension(extensionId: string): Promise<ExtensionInfo | null> {
    try {
      return await window.electron.ipcRenderer.invoke('plugin:getExtension', extensionId)
    } catch (error: any) {
      console.error('Failed to get extension:', error)
      return null
    }
  }

  /**
   * 激活扩展
   */
  static async activateExtension(extensionId: string): Promise<boolean> {
    try {
      return await window.electron.ipcRenderer.invoke('plugin:activateExtension', extensionId)
    } catch (error: any) {
      console.error('Failed to activate extension:', error)
      return false
    }
  }

  /**
   * 停用扩展
   */
  static async deactivateExtension(extensionId: string): Promise<boolean> {
    try {
      return await window.electron.ipcRenderer.invoke('plugin:deactivateExtension', extensionId)
    } catch (error: any) {
      console.error('Failed to deactivate extension:', error)
      return false
    }
  }

  /**
   * 安装扩展（通过npm包名）
   */
  static async installExtension(packageName: string, version?: string): Promise<boolean> {
    try {
      return await window.electron.ipcRenderer.invoke('plugin:installExtension', packageName, version)
    } catch (error: any) {
      console.error('Failed to install extension:', error)
      return false
    }
  }

  /**
   * 卸载扩展
   */
  static async uninstallExtension(extensionId: string): Promise<boolean> {
    try {
      return await window.electron.ipcRenderer.invoke('plugin:uninstallExtension', extensionId)
    } catch (error: any) {
      console.error('Failed to uninstall extension:', error)
      return false
    }
  }

  /**
   * 搜索扩展
   */
  static async searchExtensions(query: string): Promise<ExtensionSearchResult[]> {
    try {
      return await window.electron.ipcRenderer.invoke('plugin:searchExtensions', query)
    } catch (error: any) {
      console.error('Failed to search extensions:', error)
      return []
    }
  }

  /**
   * 获取扩展统计信息
   */
  static async getExtensionStats(): Promise<ExtensionStats> {
    try {
      return await window.electron.ipcRenderer.invoke('plugin:getExtensionStats')
    } catch (error: any) {
      console.error('Failed to get extension stats:', error)
      return { total: 0, active: 0, inactive: 0, builtin: 0, user: 0 }
    }
  }

  /**
   * 重新加载扩展
   */
  static async reloadExtension(extensionId: string): Promise<boolean> {
    try {
      return await window.electron.ipcRenderer.invoke('plugin:reloadExtension', extensionId)
    } catch (error: any) {
      console.error('Failed to reload extension:', error)
      return false
    }
  }

  /**
   * 获取扩展贡献点
   */
  static async getContributions(type?: string): Promise<any> {
    try {
      return await window.electron.ipcRenderer.invoke('plugin:getContributions', type)
    } catch (error: any) {
      console.error('Failed to get contributions:', error)
      return {}
    }
  }

  /**
   * 执行命令
   */
  static async executeCommand(command: string, ...args: any[]): Promise<any> {
    try {
      return await window.electron.ipcRenderer.invoke('plugin:executeCommand', command, ...args)
    } catch (error: any) {
      console.error('Failed to execute command:', error)
      throw error
    }
  }

  /**
   * 获取所有命令
   */
  static async getAllCommands(): Promise<string[]> {
    try {
      return await window.electron.ipcRenderer.invoke('plugin:getAllCommands')
    } catch (error: any) {
      console.error('Failed to get all commands:', error)
      return []
    }
  }

  /**
   * 触发激活事件
   */
  static async triggerActivationEvent(event: string, data?: any): Promise<void> {
    try {
      await window.electron.ipcRenderer.invoke('plugin:triggerActivationEvent', event, data)
    } catch (error: any) {
      console.error('Failed to trigger activation event:', error)
    }
  }

  // ========== 事件监听器 ==========
  
  /**
   * 监听扩展状态变化
   */
  static onExtensionStateChanged(callback: (extensionId: string, state: string) => void): () => void {
    const handler = (_: any, extensionId: string, state: string) => {
      callback(extensionId, state)
    }
    
    window.electron.ipcRenderer.on('plugin:extensionStateChanged', handler)
    
    return () => {
      window.electron.ipcRenderer.removeListener('plugin:extensionStateChanged', handler)
    }
  }

  /**
   * 监听命令执行
   */
  static onCommandExecuted(callback: (command: string, args: any[]) => void): () => void {
    const handler = (_: any, command: string, args: any[]) => {
      callback(command, args)
    }
    
    window.electron.ipcRenderer.on('plugin:commandExecuted', handler)
    
    return () => {
      window.electron.ipcRenderer.removeListener('plugin:commandExecuted', handler)
    }
  }

  /**
   * 监听扩展安装
   */
  static onExtensionInstalled(callback: (extensionId: string) => void): () => void {
    const handler = (_: any, extensionId: string) => {
      callback(extensionId)
    }
    
    window.electron.ipcRenderer.on('plugin:extensionInstalled', handler)
    
    return () => {
      window.electron.ipcRenderer.removeListener('plugin:extensionInstalled', handler)
    }
  }

  /**
   * 监听扩展卸载
   */
  static onExtensionUninstalled(callback: (extensionId: string) => void): () => void {
    const handler = (_: any, extensionId: string) => {
      callback(extensionId)
    }
    
    window.electron.ipcRenderer.on('plugin:extensionUninstalled', handler)
    
    return () => {
      window.electron.ipcRenderer.removeListener('plugin:extensionUninstalled', handler)
    }
  }

  // ========== 传统插件API（保持兼容性） ==========
  /**
   * 获取所有插件列表
   * 注意：此方法已更新为使用VSCode风格插件系统
   */
  static async listPlugins(): Promise<{
    success: boolean
    plugins?: PluginInfo[]
    error?: string
  }> {
    try {
      console.log(window.electron, 'window.electron')
      // 使用新的VSCode风格插件系统API
      const extensions = await window.electron.ipcRenderer.invoke('plugin:getAllExtensions')
      
      // 转换扩展信息为传统插件格式以保持兼容性
      const plugins: PluginInfo[] = extensions.map((ext: ExtensionInfo) => ({
        id: ext.id,
        type: 'frontend' as const, // VSCode风格扩展主要是前端类型
        name: ext.displayName || ext.name,
        version: ext.version,
        description: ext.description,
        author: ext.publisher,
        enabled: ext.isActive,
        permissions: [], // VSCode风格扩展的权限管理不同
        config: {
          name: ext.displayName || ext.name,
          version: ext.version,
          description: ext.description,
          author: ext.publisher
        }
      }))
      
      return { success: true, plugins }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  /**
   * 安装本地插件
   * 注意：此方法已更新为使用VSCode风格插件系统
   */
  static async installLocalPlugin(zipPath: string): Promise<PluginInstallResult> {
    try {
      // 使用新的VSCode风格插件系统API
      const result = await window.electron.ipcRenderer.invoke(
        'plugin:installExtension',
        zipPath
      )
      return { success: true, pluginId: result?.id }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  /**
   * 安装远程插件
   */
  static async installRemotePlugin(
    url: string,
    _npmRegistry?: string
  ): Promise<PluginInstallResult> {
    try {
      const result = await window.electron.ipcRenderer.invoke('plugin:manager:install-remote', {
        url,
        npmRegistry: _npmRegistry
      })
      return result
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  /**
   * 通过npm包名安装插件
   * 注意：此方法已更新为使用VSCode风格插件系统
   */
  static async installNpmPlugin(
    packageName: string,
    _npmRegistry?: string
  ): Promise<PluginInstallResult> {
    try {
      // 使用新的VSCode风格插件系统API
      const result = await window.electron.ipcRenderer.invoke('plugin:installExtension', packageName)
      return { success: true, pluginId: result?.id }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  /**
   * 卸载插件
   * 注意：此方法已更新为使用VSCode风格插件系统
   */
  static async uninstallPlugin(pluginId: string): Promise<PluginOperationResult> {
    try {
      // 使用新的VSCode风格插件系统API
      await window.electron.ipcRenderer.invoke('plugin:uninstallExtension', pluginId)
      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  /**
   * 启用插件
   * 注意：此方法已更新为使用VSCode风格插件系统
   */
  static async enablePlugin(pluginId: string): Promise<PluginOperationResult> {
    try {
      // 使用新的VSCode风格插件系统API
      await window.electron.ipcRenderer.invoke('plugin:activateExtension', pluginId)
      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  /**
   * 禁用插件
   * 注意：此方法已更新为使用VSCode风格插件系统
   */
  static async disablePlugin(pluginId: string): Promise<PluginOperationResult> {
    try {
      // 使用新的VSCode风格插件系统API
      await window.electron.ipcRenderer.invoke('plugin:deactivateExtension', pluginId)
      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  /**
   * 获取插件配置
   * 注意：此方法已更新为使用VSCode风格插件系统
   */
  static async getPluginConfig(pluginId: string): Promise<PluginConfigResult> {
    try {
      // 使用新的VSCode风格插件系统API
      const extension = await window.electron.ipcRenderer.invoke('plugin:getExtension', pluginId)
      if (extension) {
        return { success: true, config: extension.packageJSON }
      } else {
        return { success: false, error: 'Extension not found' }
      }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  /**
   * 设置插件配置
   * 注意：VSCode风格插件系统不支持动态配置修改
   */
  static async setPluginConfig(_pluginId: string, _config: any): Promise<PluginOperationResult> {
    try {
      // VSCode风格扩展的配置通常在package.json中定义，不支持运行时修改
      console.warn('VSCode风格插件系统不支持动态配置修改')
      return { success: false, error: 'VSCode风格插件系统不支持动态配置修改' }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  /**
   * 获取插件信息
   * 注意：此方法已更新为使用VSCode风格插件系统
   */
  static async getPluginInfo(
    pluginId: string
  ): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      // 使用新的VSCode风格插件系统API
      const extension = await window.electron.ipcRenderer.invoke('plugin:getExtension', pluginId)
      if (extension) {
        return { success: true, data: extension }
      } else {
        return { success: false, error: 'Extension not found' }
      }
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
   * 注意：VSCode风格插件系统自动管理插件加载
   */
  static async loadFrontendPlugin(
    pluginId: string
  ): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      // VSCode风格扩展通过激活事件自动加载，这里尝试激活扩展
      await window.electron.ipcRenderer.invoke('plugin:activateExtension', pluginId)
      const extension = await window.electron.ipcRenderer.invoke('plugin:getExtension', pluginId)
      return { success: true, data: extension }
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
   * 注意：VSCode风格插件系统不支持此功能
   */
  static async loadSystemPluginHTML(
    _pluginId: string
  ): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      console.warn('VSCode风格插件系统不支持加载系统插件HTML')
      return {
        success: false,
        error: 'VSCode风格插件系统不支持加载系统插件HTML'
      }
    } catch (error) {
      console.error('Failed to load system plugin HTML:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }

  /**
   * 加载CubeModule插件的HTML文件
   * 注意：VSCode风格插件系统不支持CubeModule格式
   */
  static async loadCubeModuleHTML(
    _pluginId: string
  ): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      console.warn('VSCode风格插件系统不支持CubeModule格式')
      return {
        success: false,
        error: 'VSCode风格插件系统不支持CubeModule格式'
      }
    } catch (error) {
      console.error('Failed to load CubeModule HTML:', error)
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
