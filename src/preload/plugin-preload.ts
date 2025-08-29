import { contextBridge, ipcRenderer } from 'electron'

// 类型定义
interface PluginInfo {
  id: string
  name: string
  version: string
  description?: string
  author?: string
  permissions?: string[]
}

interface SystemInfo {
  platform: string
  arch: string
  version: string
  memory: {
    total: number
    free: number
  }
  cpu: {
    model: string
    cores: number
  }
}

interface FileSelectOptions {
  title?: string
  defaultPath?: string
  filters?: Array<{
    name: string
    extensions: string[]
  }>
  properties?: string[]
}

interface DirectorySelectOptions {
  title?: string
  defaultPath?: string
  properties?: string[]
}

interface NetworkRequestOptions {
  method?: string
  headers?: Record<string, string>
  body?: string | FormData | URLSearchParams
  timeout?: number
}

interface NetworkResponse {
  status: number
  statusText: string
  headers: Record<string, string>
  data: unknown
}

interface ImageData {
  width: number
  height: number
  data: Buffer | Uint8Array
  format?: string
}

interface PluginMessage {
  type: string
  data: unknown
  timestamp?: number
  source?: string
}

interface PluginExecuteResult {
  success: boolean
  result?: unknown
  error?: string
}

interface PluginExportsResult {
  success: boolean
  exports?: string[]
  error?: string
}

interface PluginInfoResult {
  success: boolean
  info?: PluginInfo
  error?: string
}

interface UIConfig {
  components?: unknown[]
  layout?: unknown
  theme?: Record<string, unknown>
}

interface UIConfigResult {
  success: boolean
  ui?: UIConfig
  error?: string
}

interface ActionResult {
  success: boolean
  result?: unknown
  error?: string
}

// 插件API接口定义
interface PluginAPI {
  // 基础信息
  getPluginInfo(): Promise<PluginInfo>

  // 权限管理
  requestPermission(permission: string): Promise<boolean>
  checkPermission(permission: string): Promise<boolean>

  // 消息通信
  sendMessage(message: PluginMessage): Promise<PluginMessage>
  onMessage(callback: (message: PluginMessage) => void): void

  // 存储API
  storage: {
    get(key: string): Promise<unknown>
    set(key: string, value: unknown): Promise<void>
    remove(key: string): Promise<void>
    clear(): Promise<void>
  }

  // 通知API
  notifications: {
    show(title: string, options?: NotificationOptions): Promise<void>
    requestPermission(): Promise<boolean>
  }

  // 系统API（需要权限）
  system: {
    getInfo(): Promise<SystemInfo>
    openExternal(url: string): Promise<void>
  }

  // 文件API（需要权限）
  files: {
    readText(path: string): Promise<string>
    writeText(path: string, content: string): Promise<void>
    exists(path: string): Promise<boolean>
    selectFile(options?: FileSelectOptions): Promise<string[]>
    selectDirectory(options?: DirectorySelectOptions): Promise<string>
  }

  // 网络API（需要权限）
  network: {
    fetch(url: string, options?: NetworkRequestOptions): Promise<NetworkResponse>
    isOnline(): Promise<boolean>
  }

  // 剪贴板API（需要权限）
  clipboard: {
    readText(): Promise<string>
    writeText(text: string): Promise<void>
    readImage(): Promise<ImageData>
    writeImage(image: ImageData): Promise<void>
  }

  // 窗口控制
  window: {
    close(): void
    minimize(): void
    maximize(): void
    restore(): void
    setTitle(title: string): void
    setSize(width: number, height: number): void
  }

  // 系统插件API
  systemPlugins: {
    execute(pluginId: string, functionName: string, input?: unknown): Promise<unknown>
    getExports(pluginId: string): Promise<string[]>
    getInfo(pluginId: string): Promise<PluginInfo>
    reload(pluginId: string): Promise<boolean>
  }

  // UI配置API
  ui: {
    getConfig(pluginId: string): Promise<UIConfig>
    executeAction(pluginId: string, actionName: string, params?: unknown): Promise<unknown>
  }
}

// 实现插件API
const pluginAPI: PluginAPI = {
  // 基础信息
  async getPluginInfo() {
    return await ipcRenderer.invoke('plugin:info')
  },

  // 权限管理
  async requestPermission(permission: string) {
    return await ipcRenderer.invoke('plugin:permission:request', permission)
  },

  async checkPermission(permission: string) {
    return await ipcRenderer.invoke('plugin:permission:check', permission)
  },

  // 消息通信
  async sendMessage(message: PluginMessage) {
    return await ipcRenderer.invoke('plugin:message:send', message)
  },

  onMessage(callback: (message: PluginMessage) => void) {
    ipcRenderer.on('plugin:message:receive', (_, message) => {
      callback(message)
    })
  },

  // 存储API
  storage: {
    async get(key: string) {
      return await ipcRenderer.invoke('plugin:storage:get', key)
    },

    async set(key: string, value: unknown) {
      await ipcRenderer.invoke('plugin:storage:set', key, value)
    },

    async remove(key: string) {
      await ipcRenderer.invoke('plugin:storage:remove', key)
    },

    async clear() {
      await ipcRenderer.invoke('plugin:storage:clear')
    }
  },

  // 通知API
  notifications: {
    async show(title: string, options?: NotificationOptions) {
      await ipcRenderer.invoke('plugin:notification:show', title, options)
    },

    async requestPermission() {
      return await ipcRenderer.invoke('plugin:permission:request', 'notifications')
    }
  },

  // 系统API
  system: {
    async getInfo() {
      const hasPermission = await ipcRenderer.invoke('plugin:permission:check', 'system:info')
      if (!hasPermission) {
        throw new Error('Permission denied: system:info')
      }
      return await ipcRenderer.invoke('plugin:system:info')
    },

    async openExternal(url: string) {
      await ipcRenderer.invoke('plugin:system:open-external', url)
    }
  },

  // 文件API
  files: {
    async readText(path: string) {
      const hasPermission = await ipcRenderer.invoke('plugin:permission:check', 'filesystem:read')
      if (!hasPermission) {
        throw new Error('Permission denied: filesystem:read')
      }
      return await ipcRenderer.invoke('plugin:files:read-text', path)
    },

    async writeText(path: string, content: string) {
      const hasPermission = await ipcRenderer.invoke('plugin:permission:check', 'filesystem:write')
      if (!hasPermission) {
        throw new Error('Permission denied: filesystem:write')
      }
      await ipcRenderer.invoke('plugin:files:write-text', path, content)
    },

    async exists(path: string) {
      return await ipcRenderer.invoke('plugin:files:exists', path)
    },

    async selectFile(options?: FileSelectOptions) {
      return await ipcRenderer.invoke('plugin:files:select-file', options)
    },

    async selectDirectory(options?: DirectorySelectOptions) {
      return await ipcRenderer.invoke('plugin:files:select-directory', options)
    }
  },

  // 网络API
  network: {
    async fetch(url: string, options?: NetworkRequestOptions) {
      const hasPermission = await ipcRenderer.invoke('plugin:permission:check', 'network:access')
      if (!hasPermission) {
        throw new Error('Permission denied: network:access')
      }
      return await ipcRenderer.invoke('plugin:network:fetch', url, options)
    },

    async isOnline() {
      return await ipcRenderer.invoke('plugin:network:is-online')
    }
  },

  // 剪贴板API
  clipboard: {
    async readText() {
      const hasPermission = await ipcRenderer.invoke('plugin:permission:check', 'clipboard')
      if (!hasPermission) {
        throw new Error('Permission denied: clipboard')
      }
      return await ipcRenderer.invoke('plugin:clipboard:read-text')
    },

    async writeText(text: string) {
      const hasPermission = await ipcRenderer.invoke('plugin:permission:check', 'clipboard')
      if (!hasPermission) {
        throw new Error('Permission denied: clipboard')
      }
      await ipcRenderer.invoke('plugin:clipboard:write-text', text)
    },

    async readImage() {
      const hasPermission = await ipcRenderer.invoke('plugin:permission:check', 'clipboard')
      if (!hasPermission) {
        throw new Error('Permission denied: clipboard')
      }
      return await ipcRenderer.invoke('plugin:clipboard:read-image')
    },

    async writeImage(image: ImageData) {
      const hasPermission = await ipcRenderer.invoke('plugin:permission:check', 'clipboard')
      if (!hasPermission) {
        throw new Error('Permission denied: clipboard')
      }
      await ipcRenderer.invoke('plugin:clipboard:write-image', image)
    }
  },

  // 窗口控制
  window: {
    close() {
      ipcRenderer.send('plugin:window:close')
    },

    minimize() {
      ipcRenderer.send('plugin:window:minimize')
    },

    maximize() {
      ipcRenderer.send('plugin:window:maximize')
    },

    restore() {
      ipcRenderer.send('plugin:window:restore')
    },

    setTitle(title: string) {
      ipcRenderer.send('plugin:window:set-title', title)
    },

    setSize(width: number, height: number) {
      ipcRenderer.send('plugin:window:set-size', width, height)
    }
  },

  // 系统插件API
  systemPlugins: {
    async execute(pluginId: string, functionName: string, input?: unknown) {
      try {
        const result = await ipcRenderer.invoke('plugin:execute', pluginId, functionName, input)
        return result
      } catch (error) {
        throw new Error(
          `Failed to execute system plugin: ${error instanceof Error ? error.message : String(error)}`
        )
      }
    },

    async getExports(pluginId: string) {
      try {
        const result: PluginExportsResult = await ipcRenderer.invoke(
          'plugin:system:exports',
          pluginId
        )
        if (result.success) {
          return result.exports || []
        } else {
          throw new Error(result.error)
        }
      } catch (error) {
        throw new Error(
          `Failed to get plugin exports: ${error instanceof Error ? error.message : String(error)}`
        )
      }
    },

    async getInfo(pluginId: string) {
      try {
        const result: PluginInfoResult = await ipcRenderer.invoke('plugin:system:info', pluginId)
        if (result.success && result.info) {
          return result.info
        } else {
          throw new Error(result.error || 'Failed to get plugin info')
        }
      } catch (error) {
        throw new Error(
          `Failed to get plugin info: ${error instanceof Error ? error.message : String(error)}`
        )
      }
    },

    async reload(pluginId: string) {
      try {
        const result = await ipcRenderer.invoke('plugin:system:reload', pluginId)
        return result.success
      } catch (error) {
        throw new Error(
          `Failed to reload plugin: ${error instanceof Error ? error.message : String(error)}`
        )
      }
    }
  },

  // UI配置API
  ui: {
    async getConfig(pluginId: string) {
      try {
        const result = await ipcRenderer.invoke('plugin:ui:get-config', pluginId)
        if (result.success) {
          return result.ui
        } else {
          throw new Error(result.error)
        }
      } catch (error) {
        throw new Error(
          `Failed to get UI config: ${error instanceof Error ? error.message : String(error)}`
        )
      }
    },

    async executeAction(pluginId: string, actionName: string, params?: unknown) {
      try {
        const result = await ipcRenderer.invoke(
          'plugin:ui:execute-action',
          pluginId,
          actionName,
          params
        )
        if (result.success) {
          return result.result
        } else {
          throw new Error(result.error)
        }
      } catch (error) {
        throw new Error(
          `Failed to execute action: ${error instanceof Error ? error.message : String(error)}`
        )
      }
    }
  }
}

// 错误处理包装器
function wrapWithErrorHandling<T extends (...args: unknown[]) => unknown>(fn: T): T {
  return ((...args: unknown[]) => {
    try {
      const result = fn(...args)
      if (result instanceof Promise) {
        return result.catch((error) => {
          console.error('Plugin API error:', error)
          throw error
        })
      }
      return result
    } catch (error) {
      console.error('Plugin API error:', error)
      throw error
    }
  }) as T
}

// 包装所有API方法以添加错误处理
function wrapAPIWithErrorHandling(api: Record<string, unknown>): Record<string, unknown> {
  const wrapped: Record<string, unknown> = {}

  for (const [key, value] of Object.entries(api)) {
    if (typeof value === 'function') {
      wrapped[key] = wrapWithErrorHandling(value as (...args: unknown[]) => unknown)
    } else if (typeof value === 'object' && value !== null) {
      wrapped[key] = wrapAPIWithErrorHandling(value)
    } else {
      wrapped[key] = value
    }
  }

  return wrapped
}

// 暴露API到渲染进程
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('pluginAPI', wrapAPIWithErrorHandling(pluginAPI))

    // 暴露一些基础的Electron API（受限版本）
    contextBridge.exposeInMainWorld('electron', {
      ipcRenderer: {
        invoke: ipcRenderer.invoke.bind(ipcRenderer),
        send: ipcRenderer.send.bind(ipcRenderer),
        on: ipcRenderer.on.bind(ipcRenderer),
        removeAllListeners: ipcRenderer.removeAllListeners.bind(ipcRenderer)
      }
    })

    console.log('Plugin API exposed successfully')
  } catch (error) {
    console.error('Failed to expose plugin API:', error)
  }
} else {
  // 非隔离上下文（不推荐，但作为后备）
  ;(window as Record<string, unknown>).pluginAPI = wrapAPIWithErrorHandling(pluginAPI)
  ;(window as Record<string, unknown>).electron = {
    ipcRenderer: {
      invoke: ipcRenderer.invoke.bind(ipcRenderer),
      send: ipcRenderer.send.bind(ipcRenderer),
      on: ipcRenderer.on.bind(ipcRenderer),
      removeAllListeners: ipcRenderer.removeAllListeners.bind(ipcRenderer)
    }
  }
}

// 插件生命周期事件
window.addEventListener('DOMContentLoaded', () => {
  console.log('Plugin preload script loaded')

  // 通知主进程插件已准备就绪
  ipcRenderer.send('plugin:ready')
})

window.addEventListener('beforeunload', () => {
  console.log('Plugin window unloading')

  // 清理资源
  ipcRenderer.removeAllListeners('plugin:message:receive')
})
