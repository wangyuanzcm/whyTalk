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

    // 首先尝试作为前端插件加载
    let result = await PluginAPI.loadFrontendPlugin(pluginId.value)
    
    // 如果前端插件加载失败，尝试作为系统插件加载
    if (!result.success) {
      // 检查是否为系统插件（不带frontend_前缀的ID）
      if (!pluginId.value.startsWith('frontend_')) {
        // 尝试获取系统插件信息
        const pluginInfo = await PluginAPI.getPluginInfo(pluginId.value)
        if (pluginInfo.success && pluginInfo.data) {
          const plugin = pluginInfo.data
          // 检查系统插件是否有HTML界面
          if (plugin.config && plugin.config.main && plugin.config.main.endsWith('.html')) {
            // 读取系统插件的HTML文件
            const htmlResult = await PluginAPI.loadSystemPluginHTML(pluginId.value)
            if (htmlResult.success) {
              result = {
                success: true,
                data: {
                  html: htmlResult.data.html,
                  config: plugin.config
                }
              }
            }
          }
        }
      }
    }
    
    if (result.success) {
      pluginData.value = result.data
      // 创建插件的blob URL
      const blob = new Blob([result.data.html], { type: 'text/html' })
      pluginUrl.value = URL.createObjectURL(blob)
    } else {
      error.value = result.error || '插件加载失败'
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
      config: pluginData.value?.config ? JSON.parse(JSON.stringify(pluginData.value.config)) : null
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
    onMessage(_callback: any) {
      // 这里可以实现消息监听
      console.log('Message listener registered')
    },
    
    sendMessage(message) {
      // 向主应用发送消息
      window.parent.postMessage({
        type: 'PLUGIN_MESSAGE',
        pluginId: pluginId.value,
        data: message
      }, '*')
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
      (iframeWindow as any).pluginAPI = pluginAPI
      
      // 触发pluginAPIReady事件
      const readyEvent = new (iframeWindow as any).CustomEvent('pluginAPIReady')
      iframeWindow.dispatchEvent(readyEvent)
    }
    
    console.log(`Plugin API injected for ${pluginId.value}`)
  } catch (error) {
    console.error('Failed to inject plugin API:', error)
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
    default:
      console.log('Unknown plugin message:', type, data)
  }
}

// 监听pluginId变化，重新加载插件
watch(pluginId, (newPluginId, oldPluginId) => {
  if (newPluginId && newPluginId !== oldPluginId) {
    // 清理旧的blob URL
    if (pluginUrl.value) {
      URL.revokeObjectURL(pluginUrl.value)
      pluginUrl.value = ''
    }
    // 重新加载新插件
    loadPlugin()
  }
}, { immediate: false })

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
