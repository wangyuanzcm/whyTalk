<template>
  <div class="plugin-container">
    <div v-if="loading" class="loading">
      <n-spin size="large">
        <template #description>正在加载插件...</template>
      </n-spin>
    </div>
    <div v-else-if="error" class="error">
      <n-result status="error" :title="error" description="插件加载失败">
        <template #footer>
          <n-button @click="loadPlugin">重试</n-button>
        </template>
      </n-result>
    </div>
    <div v-else-if="pluginData" class="plugin-content">
      <iframe
        ref="pluginFrame"
        :src="pluginUrl"
        class="plugin-iframe"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        @load="onPluginLoad"
      ></iframe>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { NResult, NButton, NSpin } from 'naive-ui'
import { PluginAPI } from '@/api/plugin'
// 导入模板工具函数
import { createExtensionInfoPage } from './extension-template-utils'

const route = useRoute()
const pluginId = computed(() => route.params.pluginId as string)

const loading = ref(true)
const error = ref('')
const pluginData = ref<any>(null)
const pluginFrame = ref<HTMLIFrameElement>()
const pluginUrl = ref('')

// 加载插件
const loadPlugin = async () => {
  if (!pluginId.value) {
    error.value = '插件ID不能为空'
    loading.value = false
    return
  }

  try {
    loading.value = true
    error.value = ''

    // 获取VSCode风格扩展信息
    const pluginInfo = await PluginAPI.getPluginInfo(pluginId.value)

    if (pluginInfo.success && pluginInfo.data) {
      const extension = pluginInfo.data

      // VSCode风格扩展处理
      if (extension.packageJSON) {
        // 检查扩展是否有webview或UI贡献点
        const contributes = extension.packageJSON.contributes || {}

        // 如果扩展有webview或自定义UI，尝试激活并获取内容
        if (contributes.views || contributes.webviews || contributes.commands) {
          try {
            // 激活扩展
            await window.electron.ipcRenderer.invoke('plugin:activateExtension', pluginId.value)

            // 检查扩展是否有webview目录
            const webviewPath = `${extension.extensionPath}/webview/index.html`

            try {
              // 尝试检查webview文件是否存在
              const webviewExists = await window.electron.ipcRenderer.invoke(
                'fs:exists',
                webviewPath
              )

              if (webviewExists) {
                // 如果存在webview目录，直接使用webview页面
                pluginData.value = {
                  config: {
                    name: extension.displayName || extension.name,
                    version: extension.version,
                    description: extension.description,
                    author: extension.publisher
                  },
                  type: 'vscode-extension-webview',
                  webviewPath: webviewPath
                }

                try {
                  // 使用HTTP URL而不是file://协议
                  const httpUrl = await window.electron.ipcRenderer.invoke(
                    'plugin:get-extension-file-url',
                    extension.extensionPath,
                    'webview/index.html'
                  )
                  pluginUrl.value = httpUrl
                } catch (error) {
                  console.error('Failed to get extension file URL:', error)
                  // 降级到默认页面
                  const extensionInfoHTML = await createExtensionInfoPage({
                    manifest: extension,
                    config: contributes
                  })
                  const blob = new Blob([extensionInfoHTML], { type: 'text/html' })
                  pluginUrl.value = URL.createObjectURL(blob)
                }
              } else {
                // 如果没有webview目录，创建默认的扩展信息页面
                const extensionInfoHTML = await createExtensionInfoPage({
                  manifest: extension,
                  config: contributes
                })

                pluginData.value = {
                  html: extensionInfoHTML,
                  config: {
                    name: extension.displayName || extension.name,
                    version: extension.version,
                    description: extension.description,
                    author: extension.publisher
                  },
                  type: 'vscode-extension'
                }

                // 创建插件的blob URL
                const blob = new Blob([extensionInfoHTML], { type: 'text/html' })
                pluginUrl.value = URL.createObjectURL(blob)
              }
            } catch (fsError) {
              console.warn('Failed to check webview directory, falling back to info page:', fsError)
              // 如果文件系统检查失败，创建默认信息页面
              const extensionInfoHTML = await createExtensionInfoPage({
                manifest: extension,
                config: contributes
              })

              pluginData.value = {
                html: extensionInfoHTML,
                config: {
                  name: extension.displayName || extension.name,
                  version: extension.version,
                  description: extension.description,
                  author: extension.publisher
                },
                type: 'vscode-extension'
              }

              const blob = new Blob([extensionInfoHTML], { type: 'text/html' })
              pluginUrl.value = URL.createObjectURL(blob)
            }
          } catch (activationError) {
            console.error('Extension activation failed:', activationError)
            error.value = `扩展激活失败: ${activationError instanceof Error ? activationError.message : String(activationError)}`
          }
        } else {
          error.value = '此扩展没有可用的用户界面'
        }
      } else {
        error.value = '无效的扩展格式'
      }
    } else {
      error.value = pluginInfo.error || '扩展不存在或加载失败'
    }
  } catch (err) {
    console.error('Plugin load error:', err)
    error.value = err instanceof Error ? err.message : '未知错误'
  } finally {
    loading.value = false
  }
}

// 插件加载完成
const onPluginLoad = async () => {
  if (pluginFrame.value && pluginFrame.value.contentWindow) {
    // 注入插件API
    await injectPluginAPI()

    // 向插件发送初始化消息，确保数据可序列化
    const initData = {
      type: 'PLUGIN_INIT',
      pluginId: pluginId.value,
      config: pluginData.value?.config ? JSON.parse(JSON.stringify(pluginData.value.config)) : null,
      extensionType: pluginData.value?.type || 'unknown'
    }

    // 对于webview类型的扩展，还需要注入扩展通信API
    if (pluginData.value?.type === 'vscode-extension-webview') {
      await injectExtensionWebViewAPI()
    }

    pluginFrame.value.contentWindow.postMessage(initData, '*')
  }
}

// 注入插件API到iframe
const injectPluginAPI = async () => {
  if (!pluginFrame.value?.contentWindow) return

  const iframe = pluginFrame.value
  const iframeWindow = iframe.contentWindow

  // 创建插件API对象
  const pluginAPI = {
    // 基础信息
    async getPluginInfo() {
      return {
        id: pluginId.value,
        name: pluginData.value?.config?.name || 'Unknown',
        version: pluginData.value?.config?.version || '1.0.0',
        description: pluginData.value?.config?.description || '',
        author: pluginData.value?.config?.author || 'Unknown',
        path: pluginData.value?.basePath || ''
      }
    },

    // 权限管理
    async requestPermission(permission) {
      try {
        return await window.electron.ipcRenderer.invoke('plugin:permission:request', {
          pluginId: pluginId.value,
          permission
        })
      } catch (error) {
        console.error('Permission request failed:', error)
        return { granted: false, error: error instanceof Error ? error.message : String(error) }
      }
    },

    async hasPermission(permission) {
      try {
        return await window.electron.ipcRenderer.invoke('plugin:permission:check', {
          pluginId: pluginId.value,
          permission
        })
      } catch (error) {
        console.error('Permission check failed:', error)
        return false
      }
    },

    // 数据存储
    async setData(key, value) {
      try {
        return await window.electron.ipcRenderer.invoke('plugin:data:set', {
          pluginId: pluginId.value,
          key,
          value
        })
      } catch (error) {
        console.error('Set data failed:', error)
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    },

    async getData(key) {
      try {
        return await window.electron.ipcRenderer.invoke('plugin:data:get', {
          pluginId: pluginId.value,
          key
        })
      } catch (error) {
        console.error('Get data failed:', error)
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    },

    async removeData(key) {
      try {
        return await window.electron.ipcRenderer.invoke('plugin:data:remove', {
          pluginId: pluginId.value,
          key
        })
      } catch (error) {
        console.error('Remove data failed:', error)
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    },

    // 通知功能
    async showNotification(title, options = {}) {
      try {
        return await window.electron.ipcRenderer.invoke('plugin:notification:show', {
          pluginId: pluginId.value,
          title,
          options
        })
      } catch (error) {
        console.error('Show notification failed:', error)
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    },

    // 消息通信
    onMessage() {
      // 这里可以实现消息监听
      console.log('Message listener registered')
    },

    sendMessage(message) {
      // 向主应用发送消息
      window.parent.postMessage(
        {
          type: 'PLUGIN_MESSAGE',
          pluginId: pluginId.value,
          data: message
        },
        '*'
      )
    },

    // 插件能力调用
    async invokeCapability(capabilityId, ...args) {
      try {
        return await window.electron.ipcRenderer.invoke('plugin:capability:invoke', {
          capabilityId,
          args
        })
      } catch (error) {
        console.error('Invoke capability failed:', error)
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    },

    // 获取能力列表
    async listCapabilities() {
      try {
        return await window.electron.ipcRenderer.invoke('plugin:capability:list')
      } catch (error) {
        console.error('List capabilities failed:', error)
        return []
      }
    }
  }

  // 将API注入到iframe的window对象中
  try {
    // 等待iframe的document完全加载
    if (iframe.contentDocument?.readyState !== 'complete') {
      await new Promise((resolve) => {
        iframe.addEventListener('load', resolve, { once: true })
      })
    }

    // 注入API
    if (iframeWindow) {
      ;(iframeWindow as any).pluginAPI = pluginAPI

      // 触发pluginAPIReady事件
      const readyEvent = new (iframeWindow as any).CustomEvent('pluginAPIReady')
      iframeWindow.dispatchEvent(readyEvent)
    }

    console.log(`Plugin API injected for ${pluginId.value}`)
  } catch (error) {
    console.error('Failed to inject plugin API:', error)
  }
}

// 为扩展WebView注入专门的通信API
const injectExtensionWebViewAPI = async () => {
  if (!pluginFrame.value?.contentWindow) return

  const iframe = pluginFrame.value
  const iframeWindow = iframe.contentWindow

  // 创建扩展WebView专用API
  const extensionWebViewAPI = {
    // 向扩展后台发送消息
    postMessage(message: any) {
      window.parent.postMessage(
        {
          type: 'EXTENSION_WEBVIEW_MESSAGE',
          pluginId: pluginId.value,
          data: message
        },
        '*'
      )
    },

    // 监听来自扩展后台的消息
    onMessage(callback: (message: any) => void) {
      const messageHandler = (event: MessageEvent) => {
        if (
          event.data.type === 'EXTENSION_BACKEND_MESSAGE' &&
          event.data.pluginId === pluginId.value
        ) {
          callback(event.data.data)
        }
      }
      window.addEventListener('message', messageHandler)
      return () => window.removeEventListener('message', messageHandler)
    },

    // 获取扩展信息
    async getExtensionInfo() {
      return {
        id: pluginId.value,
        name: pluginData.value?.config?.name || 'Unknown',
        version: pluginData.value?.config?.version || '1.0.0',
        description: pluginData.value?.config?.description || '',
        author: pluginData.value?.config?.author || 'Unknown'
      }
    },

    // 执行扩展命令
    async executeCommand(command: string, ...args: any[]) {
      try {
        return await window.electron.ipcRenderer.invoke('extension:executeCommand', {
          extensionId: pluginId.value,
          command,
          args
        })
      } catch (error) {
        console.error('Execute command failed:', error)
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    },

    // 获取扩展配置
    async getConfiguration(section?: string) {
      try {
        return await window.electron.ipcRenderer.invoke('extension:getConfiguration', {
          extensionId: pluginId.value,
          section
        })
      } catch (error) {
        console.error('Get configuration failed:', error)
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    },

    // 更新扩展配置
    async updateConfiguration(section: string, value: any) {
      try {
        return await window.electron.ipcRenderer.invoke('extension:updateConfiguration', {
          extensionId: pluginId.value,
          section,
          value
        })
      } catch (error) {
        console.error('Update configuration failed:', error)
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    },

    // 显示信息消息
    async showInformationMessage(message: string, ...items: string[]) {
      try {
        return await window.electron.ipcRenderer.invoke('extension:showInformationMessage', {
          extensionId: pluginId.value,
          message,
          items
        })
      } catch (error) {
        console.error('Show information message failed:', error)
        return null
      }
    },

    // 显示警告消息
    async showWarningMessage(message: string, ...items: string[]) {
      try {
        return await window.electron.ipcRenderer.invoke('extension:showWarningMessage', {
          extensionId: pluginId.value,
          message,
          items
        })
      } catch (error) {
        console.error('Show warning message failed:', error)
        return null
      }
    },

    // 显示错误消息
    async showErrorMessage(message: string, ...items: string[]) {
      try {
        return await window.electron.ipcRenderer.invoke('extension:showErrorMessage', {
          extensionId: pluginId.value,
          message,
          items
        })
      } catch (error) {
        console.error('Show error message failed:', error)
        return null
      }
    }
  }

  // 将扩展WebView API注入到iframe的window对象中
  try {
    // 等待iframe的document完全加载
    if (iframe.contentDocument?.readyState !== 'complete') {
      await new Promise((resolve) => {
        iframe.addEventListener('load', resolve, { once: true })
      })
    }

    // 注入API
    if (iframeWindow) {
      ;(iframeWindow as any).extensionWebView = extensionWebViewAPI

      // 触发extensionWebViewReady事件
      const readyEvent = new (iframeWindow as any).CustomEvent('extensionWebViewReady')
      iframeWindow.dispatchEvent(readyEvent)
    }

    console.log(`Extension WebView API injected for ${pluginId.value}`)
  } catch (error) {
    console.error('Failed to inject extension WebView API:', error)
  }
}

// 监听来自插件的消息
const handlePluginMessage = (event: MessageEvent) => {
  if (event.source !== pluginFrame.value?.contentWindow) {
    return
  }

  const { type, data } = event.data

  switch (type) {
    case 'PLUGIN_READY':
      console.log(`Plugin ${pluginId.value} is ready`)
      break
    case 'PLUGIN_ERROR':
      console.error(`Plugin ${pluginId.value} error:`, data)
      error.value = data.message || '插件运行错误'
      break
    case 'PLUGIN_NAVIGATE':
      // 处理插件内部导航
      if (data.path) {
        // 可以在这里处理路由跳转
        console.log('Plugin navigation:', data.path)
      }
      break
    case 'EXTENSION_WEBVIEW_MESSAGE':
      // 处理来自扩展WebView的消息，转发给扩展后台
      console.log(`Extension WebView message from ${pluginId.value}:`, data)
      // 这里可以通过IPC转发给扩展后台
      window.electron.ipcRenderer
        .invoke('extension:webviewMessage', {
          extensionId: pluginId.value,
          message: data
        })
        .catch((err) => {
          console.error('Failed to forward webview message:', err)
        })
      break
    default:
      console.log('Unknown plugin message:', type, data)
  }
}

// 监听pluginId变化，重新加载插件
watch(
  pluginId,
  (newPluginId, oldPluginId) => {
    if (newPluginId && newPluginId !== oldPluginId) {
      // 清理旧的blob URL
      if (pluginUrl.value) {
        URL.revokeObjectURL(pluginUrl.value)
        pluginUrl.value = ''
      }
      // 重新加载新插件
      loadPlugin()
    }
  },
  { immediate: false }
)

onMounted(() => {
  loadPlugin()
  window.addEventListener('message', handlePluginMessage)
})

onUnmounted(() => {
  window.removeEventListener('message', handlePluginMessage)
  // 清理blob URL
  if (pluginUrl.value) {
    URL.revokeObjectURL(pluginUrl.value)
  }
})
</script>

<style scoped>
.plugin-container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.error {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.plugin-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.plugin-iframe {
  width: 100%;
  height: 100%;
  border: none;
  flex: 1;
}
</style>
