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

    // 获取插件信息
    const result = await PluginAPI.getPluginInfo(pluginId.value)
    if (!result.success || !result.data) {
      throw new Error(result.error || '获取插件信息失败')
    }

    pluginData.value = result.data
    console.log('Plugin data loaded:', pluginData.value)

    // 构建插件URL
    // 检查是否为VSCode风格扩展（有manifest、packageJSON等字段）
    if (pluginData.value.manifest || pluginData.value.packageJSON || pluginData.value.extensionPath) {
      // VSCode风格扩展：生成扩展信息页面
      pluginUrl.value = await generateExtensionInfoPage(pluginData.value)
    } else if (pluginData.value.type === 'frontend') {
      // 前端插件：加载插件的HTML文件
      const baseUrl = await getPluginBaseUrl(pluginId.value)
      pluginUrl.value = `${baseUrl}/${pluginData.value.config.main || 'index.html'}`
    } else {
      // 默认作为VSCode风格扩展处理
      pluginUrl.value = await generateExtensionInfoPage(pluginData.value)
    }

    console.log('Plugin URL:', pluginUrl.value)
  } catch (err: any) {
    console.error('Failed to load plugin:', err)
    error.value = err.message || '加载插件失败'
  } finally {
    loading.value = false
  }
}

/**
 * 获取插件基础URL
 */
const getPluginBaseUrl = async (pluginId: string): Promise<string> => {
  try {
    const result = await (window as any).electron.ipcRenderer.invoke(
      'plugin:get-base-url',
      pluginId
    )
    if (result?.success && result?.url) {
      return result.url
    }
    throw new Error(result?.error || '获取插件URL失败')
  } catch (error) {
    console.error('Failed to get plugin base URL:', error)
    throw error
  }
}

/**
 * 为VSCode风格扩展生成信息页面
 */
const generateExtensionInfoPage = async (extensionData: any): Promise<string> => {
  try {
    const htmlContent = createExtensionInfoPage(extensionData)
    const blob = new Blob([htmlContent], { type: 'text/html' })
    return URL.createObjectURL(blob)
  } catch (error) {
    console.error('Failed to generate extension info page:', error)
    throw new Error('生成扩展信息页面失败')
  }
}

/**
 * 插件加载完成处理
 */
const onPluginLoad = async () => {
  console.log('Plugin iframe loaded')
  
  if (!pluginFrame.value || !pluginData.value) {
    return
  }

  // 如果是前端插件，注入插件API
  // VSCode风格扩展不需要注入API，只有传统前端插件需要
  if (pluginData.value.type === 'frontend' && !pluginData.value.manifest && !pluginData.value.packageJSON) {
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