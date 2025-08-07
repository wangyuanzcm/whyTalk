<template>
  <div class="plugin-window-container">
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

/**
 * 加载插件数据和配置
 */
const loadPlugin = async () => {
  if (!pluginId.value) {
    error.value = '插件ID不能为空'
    loading.value = false
    return
  }

  try {
    loading.value = true
    error.value = ''

    console.log('Loading plugin:', pluginId.value)

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
              const webviewExists = await window.electron.ipcRenderer.invoke('fs:exists', webviewPath)
              
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
                   const httpUrl = await window.electron.ipcRenderer.invoke('plugin:get-extension-file-url', extension.extensionPath, 'webview/index.html')
                   pluginUrl.value = httpUrl
                 } catch (error) {
                   console.error('Failed to get extension file URL:', error)
                   // 降级到默认页面
                   const extensionInfoHTML = createExtensionInfoPage({
                     manifest: extension.packageJSON,
                     config: {
                       name: extension.displayName || extension.name,
                       version: extension.version,
                       description: extension.description,
                       author: extension.publisher
                     }
                   })
                   const blob = new Blob([extensionInfoHTML], { type: 'text/html' })
                   pluginUrl.value = URL.createObjectURL(blob)
                 }
              } else {
                // 如果没有webview目录，创建默认的扩展信息页面
                const extensionInfoHTML = createExtensionInfoPage({
                  manifest: extension.packageJSON,
                  config: {
                    name: extension.displayName || extension.name,
                    version: extension.version,
                    description: extension.description,
                    author: extension.publisher
                  }
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
              const extensionInfoHTML = createExtensionInfoPage({
                manifest: extension.packageJSON,
                config: {
                  name: extension.displayName || extension.name,
                  version: extension.version,
                  description: extension.description,
                  author: extension.publisher
                }
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

// 删除了未使用的函数 getPluginBaseUrl 和 generateExtensionInfoPage

/**
 * 插件加载完成处理
 */
const onPluginLoad = async () => {
  console.log('Plugin iframe loaded')
  
  if (!pluginFrame.value || !pluginData.value) {
    return
  }

  // 根据插件类型注入相应的API
  if (pluginData.value.type === 'vscode-extension-webview') {
    // VSCode风格扩展的webview页面，注入扩展WebView API
    await injectExtensionWebViewAPI()
  } else if (pluginData.value.type === 'frontend' && !pluginData.value.manifest && !pluginData.value.packageJSON) {
    // 传统前端插件，注入插件API
    await injectPluginAPI()
  }
}

/**
 * 注入插件API到iframe
 */
const injectPluginAPI = async () => {
  if (!pluginFrame.value) {
    return
  }

  const iframeWindow = pluginFrame.value.contentWindow
  if (!iframeWindow) {
    console.error('Cannot access iframe window')
    return
  }

  // 创建插件API对象
  const pluginAPI = {
    // 存储API
    storage: {
      get: async (key: string) => {
        return await (window as any).electron.ipcRenderer.invoke(
          'plugin:storage:get',
          pluginId.value,
          key
        )
      },
      set: async (key: string, value: any) => {
        return await (window as any).electron.ipcRenderer.invoke(
          'plugin:storage:set',
          pluginId.value,
          key,
          value
        )
      },
      remove: async (key: string) => {
        return await (window as any).electron.ipcRenderer.invoke(
          'plugin:storage:remove',
          pluginId.value,
          key
        )
      }
    },
    // 通知API
    notification: {
      show: async (title: string, body: string, options?: any) => {
        return await (window as any).electron.ipcRenderer.invoke(
          'plugin:notification:show',
          { title, body, ...options }
        )
      }
    },
    // 窗口API
    window: {
      close: async () => {
        return await (window as any).electron.ipcRenderer.invoke(
          'plugin:window:close'
        )
      },
      minimize: async () => {
        return await (window as any).electron.ipcRenderer.invoke(
          'plugin:window:minimize'
        )
      },
      maximize: async () => {
        return await (window as any).electron.ipcRenderer.invoke(
          'plugin:window:maximize'
        )
      }
    }
  }

  // 等待iframe完全加载
  try {
    if (pluginFrame.value.contentDocument?.readyState !== 'complete') {
      await new Promise((resolve) => {
        pluginFrame.value!.addEventListener('load', resolve, { once: true })
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

/**
 * 为扩展WebView注入专门的通信API
 */
const injectExtensionWebViewAPI = async () => {
  if (!pluginFrame.value?.contentWindow) return
  
  const iframe = pluginFrame.value
  const iframeWindow = iframe.contentWindow
  
  // 创建扩展WebView专用API
  const extensionWebViewAPI = {
    // 向扩展后台发送消息
    postMessage(message: any) {
      window.parent.postMessage({
        type: 'EXTENSION_WEBVIEW_MESSAGE',
        pluginId: pluginId.value,
        data: message
      }, '*')
    },
    
    // 监听来自扩展后台的消息
    onMessage(callback: (message: any) => void) {
      const messageHandler = (event: MessageEvent) => {
        if (event.data.type === 'EXTENSION_BACKEND_MESSAGE' && 
            event.data.pluginId === pluginId.value) {
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
      (iframeWindow as any).extensionWebView = extensionWebViewAPI
      
      // 触发extensionWebViewReady事件
      const readyEvent = new (iframeWindow as any).CustomEvent('extensionWebViewReady')
      iframeWindow.dispatchEvent(readyEvent)
    }
    
    console.log(`Extension WebView API injected for ${pluginId.value}`)
  } catch (error) {
    console.error('Failed to inject extension WebView API:', error)
  }
}

/**
 * 监听来自插件的消息
 */
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
        console.log('Plugin navigation:', data.path)
      }
      break
    default:
      console.log('Unknown plugin message:', type, data)
  }
}

// 监听插件ID变化
watch(pluginId, () => {
  if (pluginId.value) {
    loadPlugin()
  }
}, { immediate: true })

// 组件挂载时设置消息监听
onMounted(() => {
  window.addEventListener('message', handlePluginMessage)
})

// 组件卸载时清理
onUnmounted(() => {
  window.removeEventListener('message', handlePluginMessage)
  
  // 清理blob URL
  if (pluginUrl.value && pluginUrl.value.startsWith('blob:')) {
    URL.revokeObjectURL(pluginUrl.value)
  }
})
</script>

<style lang="less" scoped>
.plugin-window-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  overflow: hidden;
}

.loading,
.error {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
}

.plugin-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.plugin-iframe {
  flex: 1;
  width: 100%;
  border: none;
  background: #ffffff;
}

/* 暗色主题支持 */
html[theme-mode='dark'] {
  .plugin-window-container {
    background: #1a1a1a;
  }
  
  .plugin-iframe {
    background: #1a1a1a;
  }
}
</style>