import { ipcMain, dialog, shell, clipboard, nativeImage, Notification, BrowserWindow } from 'electron'
import { readFile, writeFile, existsSync } from 'fs'
import { promisify } from 'util'
import { SecurityManager, Permission } from './SecurityManager'
import { PluginManager } from './PluginManager'
// import fetch from 'node-fetch' // 注释掉静态导入
import os from 'os'

const readFileAsync = promisify(readFile)
const writeFileAsync = promisify(writeFile)

/**
 * 插件API处理器
 * 处理来自插件的各种API调用请求
 */
export class PluginAPIHandler {
  private securityManager: SecurityManager
  private pluginManager: PluginManager
  private pluginStorage: Map<string, Map<string, any>> = new Map()

  constructor(securityManager: SecurityManager, pluginManager: PluginManager) {
    this.securityManager = securityManager
    this.pluginManager = pluginManager
    this.setupHandlers()
  }

  /**
   * 设置所有IPC处理器
   */
  private setupHandlers() {
    // 清除现有的处理器以避免重复注册
    this.removeExistingHandlers()
    
    // 基础信息
    ipcMain.handle('plugin:info', this.handleGetPluginInfo.bind(this))
    
    // 权限管理
    ipcMain.handle('plugin:permission:request', this.handleRequestPermission.bind(this))
    ipcMain.handle('plugin:permission:check', this.handleCheckPermission.bind(this))
    
    // 消息通信
    ipcMain.handle('plugin:message:send', this.handleSendMessage.bind(this))
    
    // 存储API
    ipcMain.handle('plugin:storage:get', this.handleStorageGet.bind(this))
    ipcMain.handle('plugin:storage:set', this.handleStorageSet.bind(this))
    ipcMain.handle('plugin:storage:remove', this.handleStorageRemove.bind(this))
    ipcMain.handle('plugin:storage:clear', this.handleStorageClear.bind(this))
    
    // 通知API
    ipcMain.handle('plugin:notification:show', this.handleShowNotification.bind(this))
    
    // 系统API
    ipcMain.handle('plugin:system:info', this.handleGetSystemInfo.bind(this))
    ipcMain.handle('plugin:system:open-external', this.handleOpenExternal.bind(this))
    
    // UI配置API
    ipcMain.handle('plugin:ui:get-config', this.handleGetUIConfig.bind(this))
    ipcMain.handle('plugin:ui:execute-action', this.handleExecuteUIAction.bind(this))
    
    // 文件API
    ipcMain.handle('plugin:files:read-text', this.handleReadTextFile.bind(this))
    ipcMain.handle('plugin:files:write-text', this.handleWriteTextFile.bind(this))
    ipcMain.handle('plugin:files:exists', this.handleFileExists.bind(this))
    ipcMain.handle('plugin:files:select-file', this.handleSelectFile.bind(this))
    ipcMain.handle('plugin:files:select-directory', this.handleSelectDirectory.bind(this))
    
    // 网络API
    ipcMain.handle('plugin:network:fetch', this.handleNetworkFetch.bind(this))
    ipcMain.handle('plugin:network:is-online', this.handleIsOnline.bind(this))
    
    // 剪贴板API
    ipcMain.handle('plugin:clipboard:read-text', this.handleClipboardReadText.bind(this))
    ipcMain.handle('plugin:clipboard:write-text', this.handleClipboardWriteText.bind(this))
    ipcMain.handle('plugin:clipboard:read-image', this.handleClipboardReadImage.bind(this))
    ipcMain.handle('plugin:clipboard:write-image', this.handleClipboardWriteImage.bind(this))
    
    // 窗口控制
    ipcMain.on('plugin:window:close', this.handleWindowClose.bind(this))
    ipcMain.on('plugin:window:minimize', this.handleWindowMinimize.bind(this))
    
    // 插件管理API
    ipcMain.handle('plugin:manager:list', this.handleListPlugins.bind(this))
    ipcMain.handle('plugin:manager:install-local', this.handleInstallLocalPlugin.bind(this))
    ipcMain.handle('plugin:manager:install-remote', this.handleInstallRemotePlugin.bind(this))
    ipcMain.handle('plugin:manager:uninstall', this.handleUninstallPlugin.bind(this))
    ipcMain.handle('plugin:manager:enable', this.handleEnablePlugin.bind(this))
    ipcMain.handle('plugin:manager:disable', this.handleDisablePlugin.bind(this))
    ipcMain.handle('plugin:manager:get-config', this.handleGetPluginConfig.bind(this))
    ipcMain.handle('plugin:manager:set-config', this.handleSetPluginConfig.bind(this))
    ipcMain.on('plugin:window:maximize', this.handleWindowMaximize.bind(this))
    ipcMain.on('plugin:window:restore', this.handleWindowRestore.bind(this))
    ipcMain.on('plugin:window:set-title', this.handleWindowSetTitle.bind(this))
    ipcMain.on('plugin:window:set-size', this.handleWindowSetSize.bind(this))
  }

  /**
   * 移除现有的处理器
   */
  private removeExistingHandlers() {
    const handlersToRemove = [
      'plugin:info',
      'plugin:permission:request',
      'plugin:permission:check',
      'plugin:message:send',
      'plugin:storage:get',
      'plugin:storage:set',
      'plugin:storage:remove',
      'plugin:storage:clear',
      'plugin:notification:show',
      'plugin:system:info',
      'plugin:system:open-external',
      'plugin:ui:get-config',
      'plugin:ui:execute-action',
      'plugin:files:read-text',
      'plugin:files:write-text',
      'plugin:files:exists',
      'plugin:files:select-file',
      'plugin:files:select-directory',
      'plugin:network:fetch',
      'plugin:network:is-online',
      'plugin:clipboard:read-text',
      'plugin:clipboard:write-text',
      'plugin:clipboard:read-image',
      'plugin:clipboard:write-image',
      'plugin:window:close',
      'plugin:window:minimize',
      'plugin:window:maximize',
      'plugin:window:restore',
      'plugin:window:set-title',
      'plugin:window:set-size'
    ]
    
    handlersToRemove.forEach(channel => {
      try {
        ipcMain.removeAllListeners(channel)
      } catch (error) {
        // 忽略移除不存在处理器的错误
      }
    })
  }

  /**
   * 获取当前插件ID（从事件中提取）
   */
  private getPluginIdFromEvent(event: Electron.IpcMainInvokeEvent): string | null {
    const webContents = event.sender
    const session = webContents.session as any
    
    // 从session partition中提取插件ID
    if (session.partition && session.partition.startsWith('plugin-')) {
      const pluginId = session.partition.replace('plugin-', '')
      return pluginId
    }
    
    return null
  }

  /**
   * 获取插件信息
   */
  private async handleGetPluginInfo(event: Electron.IpcMainInvokeEvent) {
    const pluginId = this.getPluginIdFromEvent(event)
    if (!pluginId) {
      throw new Error('Plugin ID not found')
    }
    
    const plugin = this.pluginManager.getPlugin(pluginId)
    if (!plugin) {
      throw new Error('Plugin not found')
    }
    
    return {
      id: plugin.id,
      name: plugin.config.name,
      version: plugin.config.version,
      description: plugin.config.description,
      type: plugin.type
    }
  }

  /**
   * 请求权限
   */
  private async handleRequestPermission(event: Electron.IpcMainInvokeEvent, permission: string) {
    const pluginId = this.getPluginIdFromEvent(event)
    if (!pluginId) {
      return false
    }
    
    const plugin = this.pluginManager.getPlugin(pluginId)
    if (!plugin) {
      return false
    }
    
    const result = await this.securityManager.checkPermission(plugin, permission as Permission)
    return result.granted
  }

  /**
   * 检查权限
   */
  private async handleCheckPermission(event: Electron.IpcMainInvokeEvent, permission: string) {
    const pluginId = this.getPluginIdFromEvent(event)
    if (!pluginId) {
      return false
    }
    
    const grantedPermissions = this.securityManager.getGrantedPermissions(pluginId)
    return grantedPermissions.includes(permission as Permission)
  }

  /**
   * 发送消息
   */
  private async handleSendMessage(event: Electron.IpcMainInvokeEvent, message: any) {
    const pluginId = this.getPluginIdFromEvent(event)
    if (!pluginId) {
      throw new Error('Plugin ID not found')
    }
    
    // 这里可以实现插件间通信或与主应用通信
    console.log(`Message from plugin ${pluginId}:`, message)
    
    // 广播给主应用
    const mainWindow = BrowserWindow.getAllWindows().find(w => !(w.webContents.session as any).partition?.startsWith('plugin-'))
    if (mainWindow) {
      mainWindow.webContents.send('plugin:message:from-plugin', pluginId, message)
    }
    
    return { success: true }
  }

  /**
   * 存储API - 获取
   */
  private async handleStorageGet(event: Electron.IpcMainInvokeEvent, key: string) {
    const pluginId = this.getPluginIdFromEvent(event)
    if (!pluginId) {
      return null
    }
    
    const pluginStorage = this.pluginStorage.get(pluginId)
    return pluginStorage ? pluginStorage.get(key) : null
  }

  /**
   * 存储API - 设置
   */
  private async handleStorageSet(event: Electron.IpcMainInvokeEvent, key: string, value: any) {
    const pluginId = this.getPluginIdFromEvent(event)
    if (!pluginId) {
      throw new Error('Plugin ID not found')
    }
    
    if (!this.pluginStorage.has(pluginId)) {
      this.pluginStorage.set(pluginId, new Map())
    }
    
    this.pluginStorage.get(pluginId)!.set(key, value)
  }

  /**
   * 存储API - 删除
   */
  private async handleStorageRemove(event: Electron.IpcMainInvokeEvent, key: string) {
    const pluginId = this.getPluginIdFromEvent(event)
    if (!pluginId) {
      return
    }
    
    const pluginStorage = this.pluginStorage.get(pluginId)
    if (pluginStorage) {
      pluginStorage.delete(key)
    }
  }

  /**
   * 存储API - 清空
   */
  private async handleStorageClear(event: Electron.IpcMainInvokeEvent) {
    const pluginId = this.getPluginIdFromEvent(event)
    if (!pluginId) {
      return
    }
    
    this.pluginStorage.delete(pluginId)
  }

  /**
   * 显示通知
   */
  private async handleShowNotification(event: Electron.IpcMainInvokeEvent, title: string, options?: any) {
    const pluginId = this.getPluginIdFromEvent(event)
    if (!pluginId) {
      throw new Error('Plugin ID not found')
    }
    
    const plugin = this.pluginManager.getPlugin(pluginId)
    if (!plugin) {
      throw new Error('Plugin not found')
    }
    
    const hasPermission = await this.securityManager.checkPermission(plugin, Permission.NOTIFICATIONS)
    if (!hasPermission.granted) {
      throw new Error('Permission denied: notifications')
    }
    
    new Notification({
      title,
      body: options?.body || '',
      icon: options?.icon
    }).show()
  }

  /**
   * 获取系统信息
   */
  private async handleGetSystemInfo(_: Electron.IpcMainInvokeEvent) {
    return {
      platform: os.platform(),
      arch: os.arch(),
      version: os.version(),
      hostname: os.hostname(),
      cpus: os.cpus().length,
      memory: {
        total: os.totalmem(),
        free: os.freemem()
      }
    }
  }

  /**
   * 打开外部链接
   */
  private async handleOpenExternal(event: Electron.IpcMainInvokeEvent, url: string) {
    const pluginId = this.getPluginIdFromEvent(event)
    if (!pluginId) {
      throw new Error('Plugin ID not found')
    }
    
    const plugin = this.pluginManager.getPlugin(pluginId)
    if (!plugin) {
      throw new Error('Plugin not found')
    }
    
    // 检查URL是否被允许
    if (!this.securityManager.isUrlAllowed(plugin, url)) {
      throw new Error('URL not allowed')
    }
    
    await shell.openExternal(url)
  }

  /**
   * 读取文本文件
   */
  private async handleReadTextFile(_: Electron.IpcMainInvokeEvent, path: string) {
    const content = await readFileAsync(path, 'utf-8')
    return content
  }

  /**
   * 写入文本文件
   */
  private async handleWriteTextFile(_: Electron.IpcMainInvokeEvent, path: string, content: string) {
    await writeFileAsync(path, content, 'utf-8')
  }

  /**
   * 检查文件是否存在
   */
  private async handleFileExists(_: Electron.IpcMainInvokeEvent, path: string) {
    return existsSync(path)
  }

  /**
   * 选择文件
   */
  private async handleSelectFile(_: Electron.IpcMainInvokeEvent, options?: any) {
    const result = await dialog.showOpenDialog({
      properties: ['openFile'],
      filters: options?.filters || [{ name: 'All Files', extensions: ['*'] }]
    })
    
    return result.filePaths
  }

  /**
   * 选择目录
   */
  private async handleSelectDirectory(_: Electron.IpcMainInvokeEvent, _options?: any) {
    const result = await dialog.showOpenDialog({
      properties: ['openDirectory']
    })
    
    return result.filePaths[0] || ''
  }

  /**
   * 网络请求
   */
  private async handleNetworkFetch(_: Electron.IpcMainInvokeEvent, url: string, options?: any) {
    try {
      // 动态导入 node-fetch
      const { default: fetch } = await import('node-fetch')
      const response = await fetch(url, options)
      const data = await response.json()
      
      return {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        data
      }
    } catch (error) {
      throw new Error(`Network fetch failed: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  /**
   * 检查网络连接
   */
  private async handleIsOnline(_: Electron.IpcMainInvokeEvent) {
    // 简单的网络检查
    try {
      // 动态导入 node-fetch
      const { default: fetch } = await import('node-fetch')
      await fetch('https://www.google.com')
      return true
    } catch {
      return false
    }
  }

  /**
   * 读取剪贴板文本
   */
  private async handleClipboardReadText(_: Electron.IpcMainInvokeEvent) {
    return clipboard.readText()
  }

  /**
   * 写入剪贴板文本
   */
  private async handleClipboardWriteText(_: Electron.IpcMainInvokeEvent, text: string) {
    clipboard.writeText(text)
  }

  /**
   * 读取剪贴板图片
   */
  private async handleClipboardReadImage(_: Electron.IpcMainInvokeEvent) {
    const image = clipboard.readImage()
    return image.toDataURL()
  }

  /**
   * 写入剪贴板图片
   */
  private async handleClipboardWriteImage(_: Electron.IpcMainInvokeEvent, imageData: string) {
    const image = nativeImage.createFromDataURL(imageData)
    clipboard.writeImage(image)
  }

  /**
   * 窗口控制 - 关闭
   */
  private handleWindowClose(event: Electron.IpcMainEvent) {
    const window = BrowserWindow.fromWebContents(event.sender)
    if (window) {
      window.close()
    }
  }

  /**
   * 窗口控制 - 最小化
   */
  private handleWindowMinimize(event: Electron.IpcMainEvent) {
    const window = BrowserWindow.fromWebContents(event.sender)
    if (window) {
      window.minimize()
    }
  }

  /**
   * 窗口控制 - 最大化
   */
  private handleWindowMaximize(event: Electron.IpcMainEvent) {
    const window = BrowserWindow.fromWebContents(event.sender)
    if (window) {
      if (window.isMaximized()) {
        window.restore()
      } else {
        window.maximize()
      }
    }
  }

  /**
   * 窗口控制 - 恢复
   */
  private handleWindowRestore(event: Electron.IpcMainEvent) {
    const window = BrowserWindow.fromWebContents(event.sender)
    if (window) {
      window.restore()
    }
  }

  /**
   * 窗口控制 - 设置标题
   */
  private handleWindowSetTitle(event: Electron.IpcMainEvent, title: string) {
    const window = BrowserWindow.fromWebContents(event.sender)
    if (window) {
      window.setTitle(title)
    }
  }

  /**
   * 窗口控制 - 设置大小
   */
  private handleWindowSetSize(event: Electron.IpcMainEvent, width: number, height: number) {
    const window = BrowserWindow.fromWebContents(event.sender)
    if (window) {
      window.setSize(width, height)
    }
  }

  /**
   * 获取插件UI配置
   */
  private async handleGetUIConfig(_: Electron.IpcMainInvokeEvent, pluginId: string) {
    try {
      const plugin = this.pluginManager.getPlugin(pluginId)
      if (!plugin) {
        return { success: false, error: 'Plugin not found' }
      }

      if (plugin.type !== 'system') {
        return { success: false, error: 'Only system plugins support UI configuration' }
      }

      const config = plugin.config as any
      return {
        success: true,
        ui: config.ui || { components: [], settings: null }
      }
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : String(error) }
    }
  }

  /**
   * 执行UI组件关联的动作
   */
  private async handleExecuteUIAction(event: Electron.IpcMainInvokeEvent, pluginId: string, actionName: string, params?: any) {
    try {
      const pluginIdFromEvent = this.getPluginIdFromEvent(event)
      if (!pluginIdFromEvent) {
        return { success: false, error: 'Unable to determine plugin context' }
      }

      const plugin = this.pluginManager.getPlugin(pluginId)
      if (!plugin) {
        return { success: false, error: 'Plugin not found' }
      }

      // 检查权限
      const permissionResult = await this.securityManager.checkPermission(plugin, Permission.SYSTEM_INFO)
      if (!permissionResult.granted) {
        return { success: false, error: 'Permission denied' }
      }

      if (plugin.type !== 'system') {
        return { success: false, error: 'Only system plugins support UI actions' }
      }

      // 执行系统插件的函数
      const result = await this.pluginManager.executeSystemPlugin(pluginId, actionName, params)
      return { success: true, result }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error)
      return { success: false, error: errorMessage }
    }
  }

  // 插件管理相关方法
  private async handleListPlugins(_: Electron.IpcMainInvokeEvent) {
    try {
      return await this.pluginManager.listPlugins()
    } catch (error: any) {
      console.error('Failed to list plugins:', error)
      return { success: false, error: error.message || 'Failed to list plugins' }
    }
  }

  private async handleInstallLocalPlugin(_: Electron.IpcMainInvokeEvent, zipPath: string) {
    try {
      return await this.pluginManager.installLocalPlugin(zipPath)
    } catch (error: any) {
      console.error('Failed to install local plugin:', error)
      return { success: false, error: error.message || 'Failed to install plugin' }
    }
  }

  private async handleInstallRemotePlugin(_: Electron.IpcMainInvokeEvent, url: string) {
    try {
      return await this.pluginManager.installRemotePlugin(url)
    } catch (error: any) {
      console.error('Failed to install remote plugin:', error)
      return { success: false, error: error.message || 'Failed to install plugin' }
    }
  }

  private async handleUninstallPlugin(_: Electron.IpcMainInvokeEvent, pluginId: string) {
    try {
      return await this.pluginManager.uninstallPlugin(pluginId)
    } catch (error: any) {
      console.error('Failed to uninstall plugin:', error)
      return { success: false, error: error.message || 'Failed to uninstall plugin' }
    }
  }

  private async handleEnablePlugin(_: Electron.IpcMainInvokeEvent, pluginId: string) {
    try {
      return await this.pluginManager.enablePlugin(pluginId)
    } catch (error: any) {
      console.error('Failed to enable plugin:', error)
      return { success: false, error: error.message || 'Failed to enable plugin' }
    }
  }

  private async handleDisablePlugin(_: Electron.IpcMainInvokeEvent, pluginId: string) {
    try {
      return await this.pluginManager.disablePlugin(pluginId)
    } catch (error: any) {
      console.error('Failed to disable plugin:', error)
      return { success: false, error: error.message || 'Failed to disable plugin' }
    }
  }

  private async handleGetPluginConfig(_: Electron.IpcMainInvokeEvent, pluginId: string) {
    try {
      return await this.pluginManager.getPluginConfig(pluginId)
    } catch (error: any) {
      console.error('Failed to get plugin config:', error)
      return { success: false, error: error.message || 'Failed to get plugin config' }
    }
  }

  private async handleSetPluginConfig(_: Electron.IpcMainInvokeEvent, pluginId: string, config: any) {
    try {
      return await this.pluginManager.setPluginConfig(pluginId, config)
    } catch (error: any) {
      console.error('Failed to set plugin config:', error)
      return { success: false, error: error.message || 'Failed to set plugin config' }
    }
  }
}