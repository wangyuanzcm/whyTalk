<template>
  <div class="update-settings">
    <n-card title="应用更新设置" :bordered="false">
      <n-space vertical :size="24">
        <!-- 基本设置 -->
        <n-form-item label="启用自动更新">
          <n-switch v-model:value="config.enabled" @update:value="handleConfigChange" />
        </n-form-item>

        <n-form-item label="更新服务器地址">
          <n-input
            v-model:value="config.serverUrl"
            placeholder="http://175.178.158.23:19000//electron-updates"
            :disabled="!config.enabled"
            @blur="handleConfigChange"
          />
        </n-form-item>

        <n-form-item label="更新通道">
          <n-select
            v-model:value="config.channel"
            :options="channelOptions"
            :disabled="!config.enabled"
            @update:value="handleConfigChange"
          />
        </n-form-item>

        <!-- 下载设置 -->
        <n-divider title-placement="left">下载设置</n-divider>

        <n-form-item label="自动下载更新">
          <n-switch
            v-model:value="config.autoDownload"
            :disabled="!config.enabled"
            @update:value="handleConfigChange"
          />
        </n-form-item>

        <n-form-item label="退出时自动安装">
          <n-switch
            v-model:value="config.autoInstallOnAppQuit"
            :disabled="!config.enabled"
            @update:value="handleConfigChange"
          />
        </n-form-item>

        <!-- 高级设置 -->
        <n-divider title-placement="left">高级设置</n-divider>

        <n-form-item label="允许预发布版本">
          <n-switch
            v-model:value="config.allowPrerelease"
            :disabled="!config.enabled"
            @update:value="handleConfigChange"
          />
        </n-form-item>

        <n-form-item label="启动时检查更新">
          <n-switch
            v-model:value="config.autoCheckOnStartup"
            :disabled="!config.enabled"
            @update:value="handleConfigChange"
          />
        </n-form-item>

        <n-form-item label="检查间隔（小时）">
          <n-input-number
            v-model:value="checkIntervalHours"
            :min="1"
            :max="24"
            :disabled="!config.enabled"
            @update:value="handleIntervalChange"
          />
        </n-form-item>

        <!-- 当前状态 -->
        <n-divider title-placement="left">当前状态</n-divider>

        <n-descriptions :column="2" bordered>
          <n-descriptions-item label="当前版本">
            {{ currentVersion }}
          </n-descriptions-item>
          <n-descriptions-item label="更新状态">
            <n-tag :type="getStatusType(status.status)">
              {{ getStatusText(status.status) }}
            </n-tag>
          </n-descriptions-item>
          <n-descriptions-item v-if="status.availableVersion" label="可用版本">
            {{ status.availableVersion }}
          </n-descriptions-item>
          <n-descriptions-item v-if="status.lastChecked" label="最后检查">
            {{ formatDate(status.lastChecked) }}
          </n-descriptions-item>
        </n-descriptions>

        <!-- 下载进度 -->
        <div v-if="status.downloadProgress && status.status === 'downloading'">
          <n-progress
            type="line"
            :percentage="Math.round(status.downloadProgress.percent)"
            :show-indicator="true"
          />
          <n-text depth="3" style="margin-top: 8px; display: block">
            下载速度: {{ formatBytes(status.downloadProgress.bytesPerSecond) }}/s
          </n-text>
        </div>

        <!-- 错误信息 -->
        <n-alert v-if="status.error" type="error" title="更新错误">
          {{ status.error }}
        </n-alert>

        <!-- 操作按钮 -->
        <n-space>
          <n-button
            type="primary"
            :loading="status.status === 'checking'"
            :disabled="!config.enabled"
            @click="checkForUpdates"
          >
            检查更新
          </n-button>

          <n-button
            v-if="status.status === 'update-available' || status.status === 'downloading'"
            type="success"
            :loading="status.status === 'downloading'"
            @click="downloadUpdate"
          >
            下载更新
          </n-button>

          <n-button
            v-if="status.status === 'update-downloaded'"
            type="warning"
            @click="installUpdate"
          >
            安装并重启
          </n-button>
        </n-space>
      </n-space>
    </n-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import { useMessage } from 'naive-ui'

const message = useMessage()

// 响应式数据
const config = ref({
  enabled: true,
  serverUrl: 'http://175.178.158.23:19000//electron-updates',
  channel: 'latest' as 'latest' | 'beta' | 'alpha',
  autoDownload: true,
  autoInstallOnAppQuit: true,
  allowPrerelease: false,
  autoCheckOnStartup: true,
  checkInterval: 3600000 // 1小时
})

interface UpdateStatus {
  status: string
  currentVersion: string
  availableVersion: string
  downloadProgress: { percent: number; bytesPerSecond: number; total: number; transferred: number } | null
  error: string
  lastChecked: Date | null
}

const status = ref<UpdateStatus>({
  status: 'idle',
  currentVersion: '',
  availableVersion: '',
  downloadProgress: null,
  error: '',
  lastChecked: null
})

const currentVersion = ref('')

// 计算属性
const checkIntervalHours = computed({
  get: () => Math.round(config.value.checkInterval / (60 * 60 * 1000)),
  set: (value: number) => {
    config.value.checkInterval = value * 60 * 60 * 1000
  }
})

// 选项数据
const channelOptions = [
  { label: '稳定版', value: 'latest' },
  { label: '测试版', value: 'beta' },
  { label: '开发版', value: 'alpha' }
]

/**
 * 获取状态类型
 */
function getStatusType(status: string) {
  switch (status) {
    case 'checking':
      return 'info'
    case 'update-available':
      return 'warning'
    case 'downloading':
      return 'info'
    case 'update-downloaded':
      return 'success'
    case 'error':
      return 'error'
    default:
      return 'default'
  }
}

/**
 * 获取状态文本
 */
function getStatusText(status: string) {
  switch (status) {
    case 'checking':
      return '检查中...'
    case 'update-available':
      return '有可用更新'
    case 'downloading':
      return '下载中...'
    case 'update-downloaded':
      return '更新已下载'
    case 'update-not-available':
      return '已是最新版本'
    case 'error':
      return '检查失败'
    default:
      return '就绪'
  }
}

/**
 * 格式化日期
 */
function formatDate(date: Date) {
  return new Date(date).toLocaleString('zh-CN')
}

/**
 * 格式化字节数
 */
function formatBytes(bytes: number) {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

/**
 * 处理配置变更
 */
async function handleConfigChange() {
  try {
    // 将响应式对象转换为普通对象，避免序列化问题
    const plainConfig = JSON.parse(JSON.stringify(config.value))
    const result = await window.electronAPI.updater.updateConfig(plainConfig)
    if (!result.success) {
      message.error('保存配置失败: ' + result.error)
    } else {
      message.success('配置已保存')
    }
  } catch (error) {
    console.error('Failed to update config:', error)
    message.error('保存配置失败')
  }
}

/**
 * 处理检查间隔变更
 */
function handleIntervalChange() {
  handleConfigChange()
}

/**
 * 检查更新
 */
async function checkForUpdates() {
  try {
    const result = await window.electronAPI.updater.checkForUpdates() as any
    if (!result?.success) {
      message.error('检查更新失败: ' + (result?.error || ''))
    }
  } catch (error) {
    console.error('Failed to check for updates:', error)
    message.error('检查更新失败')
  }
}

/**
 * 下载更新
 */
async function downloadUpdate() {
  try {
    const result = await window.electronAPI.updater.downloadUpdate() as any
    if (!result?.success) {
      message.error('下载更新失败: ' + (result?.error || ''))
    }
  } catch (error) {
    console.error('Failed to download update:', error)
    message.error('下载更新失败')
  }
}

/**
 * 安装更新
 */
async function installUpdate() {
  try {
    const result = await window.electronAPI.updater.quitAndInstall() as any
    if (!result?.success) {
      message.error('安装更新失败: ' + (result?.error || ''))
    }
  } catch (error) {
    console.error('Failed to install update:', error)
    message.error('安装更新失败')
  }
}

/**
 * 加载配置和状态
 */
async function loadData() {
  try {
    // 加载配置
    const configData = await window.electronAPI.updater.getConfig()
    if (configData) {
      config.value = {
        ...config.value,
        ...configData
      }
    }

    // 加载状态
    const statusData = await window.electronAPI.updater.getStatus()
    if (statusData) {
      status.value = {
        ...status.value,
        ...statusData
      }
    }

    // 加载版本
    currentVersion.value = await window.electronAPI.updater.getVersion()
  } catch (error) {
    console.error('Failed to load data:', error)
    message.error('加载数据失败')
  }
}

/**
 * 监听更新状态变化
 */
function setupEventListeners() {
  // 监听状态变化
  window.electronAPI.updater.onUpdateAvailable((info: any) => {
    status.value.status = 'update-available'
    status.value.availableVersion = info.version || ''
    message.info(`发现新版本 ${info.version}`)
  })

  window.electronAPI.updater.onUpdateNotAvailable(() => {
    status.value.status = 'update-not-available'
    message.success('已是最新版本')
  })

  window.electronAPI.updater.onDownloadProgress((progress: any) => {
    status.value.status = 'downloading'
    status.value.downloadProgress = progress
  })

  window.electronAPI.updater.onUpdateDownloaded((info: any) => {
    status.value.status = 'update-downloaded'
    status.value.availableVersion = info.version || ''
    message.success(`新版本 ${info.version} 下载完成`)
  })

  window.electronAPI.updater.onError((error: any) => {
    status.value.status = 'error'
    status.value.error = error.message || ''
    message.error('更新失败: ' + error.message)
  })

  window.electronAPI.updater.onCheckingForUpdate(() => {
    status.value.status = 'checking'
    status.value.error = ''
    status.value.lastChecked = new Date()
  })
}

// 组件挂载时初始化
onMounted(() => {
  loadData()
  setupEventListeners()
})
</script>

<style scoped>
.update-settings {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
</style>
