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
import { ref, onMounted, onUnmounted, computed } from 'vue'
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

    const result = await PluginAPI.loadFrontendPlugin(pluginId.value)
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
const onPluginLoad = () => {
  if (pluginFrame.value && pluginFrame.value.contentWindow) {
    // 向插件发送初始化消息，确保数据可序列化
    const initData = {
      type: 'PLUGIN_INIT',
      pluginId: pluginId.value,
      config: pluginData.value?.config ? JSON.parse(JSON.stringify(pluginData.value.config)) : null
    }
    pluginFrame.value.contentWindow.postMessage(initData, '*')
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
