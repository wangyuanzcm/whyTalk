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

<style lang="less" scoped>
@import '@/styles/theme/index.less';

.update-settings {
  max-width: 900px;
  margin: 0 auto;
  padding: var(--spacing-lg);

  :deep(.n-card) {
    background: var(--color-bg-content);
    border-radius: var(--border-radius-lg);
    .card-shadow();
    border: 1px solid var(--color-border-light);
    transition: all var(--transition-base);

    &:hover {
      .card-shadow-hover();
    }

    .n-card-header {
      padding: var(--spacing-xl) var(--spacing-xl) var(--spacing-lg) var(--spacing-xl);
      border-bottom: 1px solid var(--color-border-light);

      .n-card-header__main {
        font-size: var(--font-size-xl);
        font-weight: var(--font-weight-semibold);
        color: var(--color-text-primary);
        line-height: var(--line-height-tight);
      }
    }

    .n-card__content {
      padding: var(--spacing-xl);
    }
  }

  :deep(.n-space) {
    gap: var(--spacing-lg);

    &.n-space--vertical {
      gap: var(--spacing-xl);
    }
  }

  :deep(.n-form-item) {
    margin-bottom: 0;

    .n-form-item-label {
      font-size: var(--font-size-md);
      font-weight: var(--font-weight-medium);
      color: var(--color-text-primary);
      line-height: var(--line-height-normal);
      padding-bottom: var(--spacing-sm);
    }

    .n-form-item-blank {
      min-height: auto;
    }
  }

  :deep(.n-divider) {
    margin: var(--spacing-xl) 0;
    border-color: var(--color-border-light);

    .n-divider__title {
      font-size: var(--font-size-lg);
      font-weight: var(--font-weight-semibold);
      color: var(--color-primary);
      background: var(--color-bg-content);
      padding: 0 var(--spacing-lg);
    }
  }

  :deep(.n-input) {
    border-radius: var(--border-radius-md);
    border: 1px solid var(--color-border-light);
    background: var(--color-bg-secondary);
    transition: all var(--transition-base);

    &:hover {
      border-color: var(--color-primary-light);
    }

    &:focus-within {
      border-color: var(--color-primary);
      .card-shadow();
    }

    .n-input__input-el {
      color: var(--color-text-primary);
      font-size: var(--font-size-sm);

      &::placeholder {
        color: var(--color-text-tertiary);
      }
    }
  }

  :deep(.n-input-number) {
    border-radius: var(--border-radius-md);
    border: 1px solid var(--color-border-light);
    background: var(--color-bg-secondary);
    transition: all var(--transition-base);

    &:hover {
      border-color: var(--color-primary-light);
    }

    &:focus-within {
      border-color: var(--color-primary);
      .card-shadow();
    }

    .n-input-number-input {
      .n-input__input-el {
        color: var(--color-text-primary);
        font-size: var(--font-size-sm);
      }
    }
  }

  :deep(.n-select) {
    .n-base-selection {
      border-radius: var(--border-radius-md);
      border: 1px solid var(--color-border-light);
      background: var(--color-bg-secondary);
      transition: all var(--transition-base);

      &:hover {
        border-color: var(--color-primary-light);
      }

      &.n-base-selection--focus {
        border-color: var(--color-primary);
        .card-shadow();
      }

      .n-base-selection-label {
        color: var(--color-text-primary);
        font-size: var(--font-size-sm);
      }

      .n-base-selection-placeholder {
        color: var(--color-text-tertiary);
      }
    }
  }

  :deep(.n-switch) {
    .n-switch__rail {
      background: var(--color-border-light);
      transition: all var(--transition-base);
    }

    &.n-switch--active {
      .n-switch__rail {
        background: var(--color-primary);
      }
    }

    .n-switch__button {
      background: var(--color-white);
      .card-shadow();
      transition: all var(--transition-base);
    }
  }

  :deep(.n-descriptions) {
    border-radius: var(--border-radius-lg);
    overflow: hidden;
    .card-shadow();

    .n-descriptions-table {
      border-color: var(--color-border-light);

      .n-descriptions-table-wrapper {
        .n-descriptions-table-content {
          .n-descriptions-table-content__label {
            background: var(--color-bg-secondary);
            color: var(--color-text-secondary);
            font-weight: var(--font-weight-medium);
            font-size: var(--font-size-sm);
            border-color: var(--color-border-light);
          }

          .n-descriptions-table-content__content {
            background: var(--color-bg-content);
            color: var(--color-text-primary);
            font-size: var(--font-size-sm);
            border-color: var(--color-border-light);
          }
        }
      }
    }
  }

  :deep(.n-tag) {
    border-radius: var(--border-radius-full);
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-medium);
    padding: var(--spacing-xs) var(--spacing-sm);
    border: none;

    &.n-tag--default-type {
      background: var(--color-bg-secondary);
      color: var(--color-text-secondary);
    }

    &.n-tag--info-type {
      background: var(--color-info-light);
      color: var(--color-info);
    }

    &.n-tag--warning-type {
      background: var(--color-warning-light);
      color: var(--color-warning);
    }

    &.n-tag--success-type {
      background: var(--color-success-light);
      color: var(--color-success);
    }

    &.n-tag--error-type {
      background: var(--color-error-light);
      color: var(--color-error);
    }
  }

  :deep(.n-progress) {
    .n-progress-graph {
      .n-progress-graph-line {
        .n-progress-graph-line-rail {
          background: var(--color-bg-secondary);
          border-radius: var(--border-radius-full);
        }

        .n-progress-graph-line-fill {
          background: linear-gradient(90deg, var(--color-primary), var(--color-primary-light));
          border-radius: var(--border-radius-full);
          transition: all var(--transition-base);
        }
      }
    }

    .n-progress-text {
      color: var(--color-text-primary);
      font-size: var(--font-size-sm);
      font-weight: var(--font-weight-medium);
    }
  }

  :deep(.n-text) {
    color: var(--color-text-secondary);
    font-size: var(--font-size-sm);
    line-height: var(--line-height-relaxed);

    &.n-text--depth-3 {
      color: var(--color-text-tertiary);
    }
  }

  :deep(.n-alert) {
    border-radius: var(--border-radius-lg);
    border: none;
    .card-shadow();
    margin: var(--spacing-lg) 0;

    &.n-alert--error-type {
      background: var(--color-error-light);
      
      .n-alert__icon {
        color: var(--color-error);
      }
      
      .n-alert-body {
        .n-alert-body__title {
          color: var(--color-error);
          font-weight: var(--font-weight-semibold);
        }
        
        .n-alert-body__content {
          color: var(--color-error);
        }
      }
    }
  }

  :deep(.n-button) {
    border-radius: var(--border-radius-md);
    font-weight: var(--font-weight-medium);
    padding: var(--spacing-sm) var(--spacing-lg);
    transition: all var(--transition-base);
    border: 1px solid transparent;

    &.n-button--primary-type {
      background: var(--color-primary);
      color: var(--color-white);
      border-color: var(--color-primary);

      &:hover:not(:disabled) {
        background: var(--color-primary-hover);
        border-color: var(--color-primary-hover);
        transform: translateY(-1px);
        .card-shadow();
      }

      &:active {
        transform: translateY(0);
      }
    }

    &.n-button--success-type {
      background: var(--color-success);
      color: var(--color-white);
      border-color: var(--color-success);

      &:hover:not(:disabled) {
        background: var(--color-success-hover);
        border-color: var(--color-success-hover);
        transform: translateY(-1px);
        .card-shadow();
      }
    }

    &.n-button--warning-type {
      background: var(--color-warning);
      color: var(--color-white);
      border-color: var(--color-warning);

      &:hover:not(:disabled) {
        background: var(--color-warning-hover);
        border-color: var(--color-warning-hover);
        transform: translateY(-1px);
        .card-shadow();
      }
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none !important;
    }

    &.n-button--loading {
      cursor: wait;
    }
  }
}

// 响应式设计
.update-settings {
  .container();
  .spacing-responsive(var(--spacing-lg), var(--spacing-xl));
}

// 大屏幕优化
.desktop-up(@breakpoint-xl) {
  .update-settings {
    max-width: 1200px;
    padding: var(--spacing-xl);

    :deep(.n-card) {
      .n-card-header {
        padding: var(--spacing-xl);

        .n-card-header__main {
          font-size: var(--font-size-xl);
        }
      }

      .n-card__content {
        padding: var(--spacing-xl);
      }
    }
  }
}

// 桌面端优化
.desktop-only() {
  .update-settings {
    max-width: 100%;
    padding: var(--spacing-lg);

    :deep(.n-card) {
      .n-card-header {
        padding: var(--spacing-lg);

        .n-card-header__main {
          font-size: var(--font-size-lg);
        }
      }

      .n-card__content {
        padding: var(--spacing-lg);
      }
    }

    :deep(.n-descriptions) {
      .n-descriptions-table {
        .n-descriptions-table-wrapper {
          .n-descriptions-table-content {
            .n-descriptions-table-content__label,
            .n-descriptions-table-content__content {
              padding: var(--spacing-sm) var(--spacing-md);
            }
          }
        }
      }
    }
  }
}

// 平板端优化
.tablet-only() {
  .update-settings {
    padding: var(--spacing-md);

    :deep(.n-card) {
      .n-card-header {
        padding: var(--spacing-md);

        .n-card-header__main {
          font-size: var(--font-size-md);
        }
      }

      .n-card__content {
        padding: var(--spacing-md);
      }
    }

    :deep(.n-space) {
      gap: var(--spacing-md);

      &.n-space--vertical {
        gap: var(--spacing-lg);
      }

      &:last-child {
        .flex-row();
        flex-wrap: wrap;
        gap: var(--spacing-md);

        .n-button {
          flex: 1;
          min-width: 120px;
        }
      }
    }

    :deep(.n-descriptions) {
      .n-descriptions-table {
        .n-descriptions-table-wrapper {
          .n-descriptions-table-content {
            .n-descriptions-table-content__label {
              font-size: var(--font-size-xs);
            }

            .n-descriptions-table-content__content {
              font-size: var(--font-size-xs);
            }
          }
        }
      }
    }
  }
}

// 移动端优化
.mobile-only() {
  .update-settings {
    padding: var(--spacing-sm);

    :deep(.n-card) {
      .n-card-header {
        padding: var(--spacing-sm);

        .n-card-header__main {
          font-size: var(--font-size-sm);
          text-align: center;
        }
      }

      .n-card__content {
        padding: var(--spacing-sm);
      }
    }

    :deep(.n-space) {
      gap: var(--spacing-sm);

      &.n-space--vertical {
        gap: var(--spacing-md);
      }

      &:last-child {
        .flex-column();
        align-items: stretch;
        gap: var(--spacing-sm);

        .n-button {
          width: 100%;
          font-size: var(--font-size-xs);
          padding: var(--spacing-sm);
        }
      }
    }

    :deep(.n-divider) {
      margin: var(--spacing-md) 0;

      .n-divider__title {
        font-size: var(--font-size-sm);
        padding: 0 var(--spacing-sm);
      }
    }

    :deep(.n-form-item) {
      .n-form-item-label {
        font-size: var(--font-size-xs);
      }
    }

    :deep(.n-descriptions) {
      .n-descriptions-table {
        .n-descriptions-table-wrapper {
          .n-descriptions-table-content {
            .n-descriptions-table-content__label {
              font-size: var(--font-size-2xs);
              padding: var(--spacing-xs);
            }

            .n-descriptions-table-content__content {
              font-size: var(--font-size-2xs);
              padding: var(--spacing-xs);
            }
          }
        }
      }
    }
  }
}

// 超小屏幕优化
.desktop-down(@breakpoint-xs) {
  .update-settings {
    padding: var(--spacing-xs);

    :deep(.n-card) {
      .n-card-header {
        padding: var(--spacing-xs);

        .n-card-header__main {
          font-size: var(--font-size-xs);
        }
      }

      .n-card__content {
        padding: var(--spacing-xs);
      }
    }

    :deep(.n-divider) {
      margin: var(--spacing-sm) 0;

      .n-divider__title {
        font-size: var(--font-size-xs);
        padding: 0 var(--spacing-xs);
      }
    }

    :deep(.n-form-item) {
      .n-form-item-label {
        font-size: var(--font-size-2xs);
      }
    }

    :deep(.n-descriptions) {
      .n-descriptions-table {
        .n-descriptions-table-wrapper {
          .n-descriptions-table-content {
            .n-descriptions-table-content__label,
            .n-descriptions-table-content__content {
              font-size: var(--font-size-3xs);
              padding: var(--spacing-2xs);
            }
          }
        }
      }
    }

    :deep(.n-space) {
      &:last-child {
        .n-button {
          font-size: var(--font-size-2xs);
          padding: var(--spacing-xs);
        }
      }
    }
  }
}

// 暗色主题适配
:global([data-theme='dark']) {
  .update-settings {
    :deep(.n-card) {
      background: var(--color-bg-content-dark);
      border-color: var(--color-border-dark);

      .n-card-header {
        border-bottom-color: var(--color-border-dark);

        .n-card-header__main {
          color: var(--color-text-primary-dark);
        }
      }
    }

    :deep(.n-divider) {
      border-color: var(--color-border-dark);

      .n-divider__title {
        color: var(--color-primary-dark);
        background: var(--color-bg-content-dark);
      }
    }

    :deep(.n-form-item) {
      .n-form-item-label {
        color: var(--color-text-primary-dark);
      }
    }

    :deep(.n-input) {
      border-color: var(--color-border-dark);
      background: var(--color-bg-secondary-dark);

      &:hover {
        border-color: var(--color-primary-dark-light);
      }

      &:focus-within {
        border-color: var(--color-primary-dark);
      }

      .n-input__input-el {
        color: var(--color-text-primary-dark);

        &::placeholder {
          color: var(--color-text-tertiary-dark);
        }
      }
    }

    :deep(.n-input-number) {
      border-color: var(--color-border-dark);
      background: var(--color-bg-secondary-dark);

      &:hover {
        border-color: var(--color-primary-dark-light);
      }

      &:focus-within {
        border-color: var(--color-primary-dark);
      }

      .n-input-number-input {
        .n-input__input-el {
          color: var(--color-text-primary-dark);
        }
      }
    }

    :deep(.n-select) {
      .n-base-selection {
        border-color: var(--color-border-dark);
        background: var(--color-bg-secondary-dark);

        &:hover {
          border-color: var(--color-primary-dark-light);
        }

        &.n-base-selection--focus {
          border-color: var(--color-primary-dark);
        }

        .n-base-selection-label {
          color: var(--color-text-primary-dark);
        }

        .n-base-selection-placeholder {
          color: var(--color-text-tertiary-dark);
        }
      }
    }

    :deep(.n-descriptions) {
      .n-descriptions-table {
        border-color: var(--color-border-dark);

        .n-descriptions-table-wrapper {
          .n-descriptions-table-content {
            .n-descriptions-table-content__label {
              background: var(--color-bg-secondary-dark);
              color: var(--color-text-secondary-dark);
              border-color: var(--color-border-dark);
            }

            .n-descriptions-table-content__content {
              background: var(--color-bg-content-dark);
              color: var(--color-text-primary-dark);
              border-color: var(--color-border-dark);
            }
          }
        }
      }
    }

    :deep(.n-tag) {
      &.n-tag--default-type {
        background: var(--color-bg-secondary-dark);
        color: var(--color-text-secondary-dark);
      }

      &.n-tag--info-type {
        background: var(--color-info-dark-light);
        color: var(--color-info-dark);
      }

      &.n-tag--warning-type {
        background: var(--color-warning-dark-light);
        color: var(--color-warning-dark);
      }

      &.n-tag--success-type {
        background: var(--color-success-dark-light);
        color: var(--color-success-dark);
      }

      &.n-tag--error-type {
        background: var(--color-error-dark-light);
        color: var(--color-error-dark);
      }
    }

    :deep(.n-progress) {
      .n-progress-graph {
        .n-progress-graph-line {
          .n-progress-graph-line-rail {
            background: var(--color-bg-secondary-dark);
          }

          .n-progress-graph-line-fill {
            background: linear-gradient(90deg, var(--color-primary-dark), var(--color-primary-dark-light));
          }
        }
      }

      .n-progress-text {
        color: var(--color-text-primary-dark);
      }
    }

    :deep(.n-text) {
      color: var(--color-text-secondary-dark);

      &.n-text--depth-3 {
        color: var(--color-text-tertiary-dark);
      }
    }

    :deep(.n-alert) {
      &.n-alert--error-type {
        background: var(--color-error-dark-light);
        
        .n-alert__icon {
          color: var(--color-error-dark);
        }
        
        .n-alert-body {
          .n-alert-body__title {
            color: var(--color-error-dark);
          }
          
          .n-alert-body__content {
            color: var(--color-error-dark);
          }
        }
      }
    }
  }
}
</style>
