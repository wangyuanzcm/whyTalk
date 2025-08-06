'use strict'
const electron = require('electron')
const pluginAPI = {
  // 基础信息
  async getPluginInfo() {
    return await electron.ipcRenderer.invoke('plugin:info')
  },
  // 权限管理
  async requestPermission(permission) {
    return await electron.ipcRenderer.invoke('plugin:permission:request', permission)
  },
  async checkPermission(permission) {
    return await electron.ipcRenderer.invoke('plugin:permission:check', permission)
  },
  // 消息通信
  async sendMessage(message) {
    return await electron.ipcRenderer.invoke('plugin:message:send', message)
  },
  onMessage(callback) {
    electron.ipcRenderer.on('plugin:message:receive', (_, message) => {
      callback(message)
    })
  },
  // 存储API
  storage: {
    async get(key) {
      return await electron.ipcRenderer.invoke('plugin:storage:get', key)
    },
    async set(key, value) {
      await electron.ipcRenderer.invoke('plugin:storage:set', key, value)
    },
    async remove(key) {
      await electron.ipcRenderer.invoke('plugin:storage:remove', key)
    },
    async clear() {
      await electron.ipcRenderer.invoke('plugin:storage:clear')
    }
  },
  // 通知API
  notifications: {
    async show(title, options) {
      await electron.ipcRenderer.invoke('plugin:notification:show', title, options)
    },
    async requestPermission() {
      return await electron.ipcRenderer.invoke('plugin:permission:request', 'notifications')
    }
  },
  // 系统API
  system: {
    async getInfo() {
      const hasPermission = await electron.ipcRenderer.invoke(
        'plugin:permission:check',
        'system:info'
      )
      if (!hasPermission) {
        throw new Error('Permission denied: system:info')
      }
      return await electron.ipcRenderer.invoke('plugin:system:info')
    },
    async openExternal(url) {
      await electron.ipcRenderer.invoke('plugin:system:open-external', url)
    }
  },
  // 文件API
  files: {
    async readText(path) {
      const hasPermission = await electron.ipcRenderer.invoke(
        'plugin:permission:check',
        'filesystem:read'
      )
      if (!hasPermission) {
        throw new Error('Permission denied: filesystem:read')
      }
      return await electron.ipcRenderer.invoke('plugin:files:read-text', path)
    },
    async writeText(path, content) {
      const hasPermission = await electron.ipcRenderer.invoke(
        'plugin:permission:check',
        'filesystem:write'
      )
      if (!hasPermission) {
        throw new Error('Permission denied: filesystem:write')
      }
      await electron.ipcRenderer.invoke('plugin:files:write-text', path, content)
    },
    async exists(path) {
      return await electron.ipcRenderer.invoke('plugin:files:exists', path)
    },
    async selectFile(options) {
      return await electron.ipcRenderer.invoke('plugin:files:select-file', options)
    },
    async selectDirectory(options) {
      return await electron.ipcRenderer.invoke('plugin:files:select-directory', options)
    }
  },
  // 网络API
  network: {
    async fetch(url, options) {
      const hasPermission = await electron.ipcRenderer.invoke(
        'plugin:permission:check',
        'network:access'
      )
      if (!hasPermission) {
        throw new Error('Permission denied: network:access')
      }
      return await electron.ipcRenderer.invoke('plugin:network:fetch', url, options)
    },
    async isOnline() {
      return await electron.ipcRenderer.invoke('plugin:network:is-online')
    }
  },
  // 剪贴板API
  clipboard: {
    async readText() {
      const hasPermission = await electron.ipcRenderer.invoke(
        'plugin:permission:check',
        'clipboard'
      )
      if (!hasPermission) {
        throw new Error('Permission denied: clipboard')
      }
      return await electron.ipcRenderer.invoke('plugin:clipboard:read-text')
    },
    async writeText(text) {
      const hasPermission = await electron.ipcRenderer.invoke(
        'plugin:permission:check',
        'clipboard'
      )
      if (!hasPermission) {
        throw new Error('Permission denied: clipboard')
      }
      await electron.ipcRenderer.invoke('plugin:clipboard:write-text', text)
    },
    async readImage() {
      const hasPermission = await electron.ipcRenderer.invoke(
        'plugin:permission:check',
        'clipboard'
      )
      if (!hasPermission) {
        throw new Error('Permission denied: clipboard')
      }
      return await electron.ipcRenderer.invoke('plugin:clipboard:read-image')
    },
    async writeImage(image) {
      const hasPermission = await electron.ipcRenderer.invoke(
        'plugin:permission:check',
        'clipboard'
      )
      if (!hasPermission) {
        throw new Error('Permission denied: clipboard')
      }
      await electron.ipcRenderer.invoke('plugin:clipboard:write-image', image)
    }
  },
  // 窗口控制
  window: {
    close() {
      electron.ipcRenderer.send('plugin:window:close')
    },
    minimize() {
      electron.ipcRenderer.send('plugin:window:minimize')
    },
    maximize() {
      electron.ipcRenderer.send('plugin:window:maximize')
    },
    restore() {
      electron.ipcRenderer.send('plugin:window:restore')
    },
    setTitle(title) {
      electron.ipcRenderer.send('plugin:window:set-title', title)
    },
    setSize(width, height) {
      electron.ipcRenderer.send('plugin:window:set-size', width, height)
    }
  },
  // 系统插件API
  systemPlugins: {
    async execute(pluginId, functionName, input) {
      try {
        const result = await electron.ipcRenderer.invoke(
          'plugin:execute',
          pluginId,
          functionName,
          input
        )
        return result
      } catch (error) {
        throw new Error(
          `Failed to execute system plugin: ${error instanceof Error ? error.message : String(error)}`
        )
      }
    },
    async getExports(pluginId) {
      try {
        const result = await electron.ipcRenderer.invoke('plugin:system:exports', pluginId)
        if (result.success) {
          return result.exports
        } else {
          throw new Error(result.error)
        }
      } catch (error) {
        throw new Error(
          `Failed to get plugin exports: ${error instanceof Error ? error.message : String(error)}`
        )
      }
    },
    async getInfo(pluginId) {
      try {
        const result = await electron.ipcRenderer.invoke('plugin:system:info', pluginId)
        if (result.success) {
          return result.info
        } else {
          throw new Error(result.error)
        }
      } catch (error) {
        throw new Error(
          `Failed to get plugin info: ${error instanceof Error ? error.message : String(error)}`
        )
      }
    },
    async reload(pluginId) {
      try {
        const result = await electron.ipcRenderer.invoke('plugin:system:reload', pluginId)
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
    async getConfig(pluginId) {
      try {
        const result = await electron.ipcRenderer.invoke('plugin:ui:get-config', pluginId)
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
    async executeAction(pluginId, actionName, params) {
      try {
        const result = await electron.ipcRenderer.invoke(
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
function wrapWithErrorHandling(fn) {
  return (...args) => {
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
  }
}
function wrapAPIWithErrorHandling(api) {
  const wrapped = {}
  for (const [key, value] of Object.entries(api)) {
    if (typeof value === 'function') {
      wrapped[key] = wrapWithErrorHandling(value)
    } else if (typeof value === 'object' && value !== null) {
      wrapped[key] = wrapAPIWithErrorHandling(value)
    } else {
      wrapped[key] = value
    }
  }
  return wrapped
}
if (process.contextIsolated) {
  try {
    electron.contextBridge.exposeInMainWorld('pluginAPI', wrapAPIWithErrorHandling(pluginAPI))
    electron.contextBridge.exposeInMainWorld('electron', {
      ipcRenderer: {
        invoke: electron.ipcRenderer.invoke.bind(electron.ipcRenderer),
        send: electron.ipcRenderer.send.bind(electron.ipcRenderer),
        on: electron.ipcRenderer.on.bind(electron.ipcRenderer),
        removeAllListeners: electron.ipcRenderer.removeAllListeners.bind(electron.ipcRenderer)
      }
    })
    console.log('Plugin API exposed successfully')
  } catch (error) {
    console.error('Failed to expose plugin API:', error)
  }
} else {
  window.pluginAPI = wrapAPIWithErrorHandling(pluginAPI)
  window.electron = {
    ipcRenderer: {
      invoke: electron.ipcRenderer.invoke.bind(electron.ipcRenderer),
      send: electron.ipcRenderer.send.bind(electron.ipcRenderer),
      on: electron.ipcRenderer.on.bind(electron.ipcRenderer),
      removeAllListeners: electron.ipcRenderer.removeAllListeners.bind(electron.ipcRenderer)
    }
  }
}
window.addEventListener('DOMContentLoaded', () => {
  console.log('Plugin preload script loaded')
  electron.ipcRenderer.send('plugin:ready')
})
window.addEventListener('beforeunload', () => {
  console.log('Plugin window unloading')
  electron.ipcRenderer.removeAllListeners('plugin:message:receive')
})
