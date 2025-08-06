<template>
  <div class="update-manager">
    <!-- 更新通知弹窗 -->
    <div v-if="showUpdateDialog" class="update-dialog-overlay">
      <div class="update-dialog">
        <div class="update-header">
          <h3>{{ $t('update.available') }}</h3>
          <button @click="closeDialog" class="close-btn">&times;</button>
        </div>
        
        <div class="update-content">
          <div class="update-info">
            <p><strong>{{ $t('update.currentVersion') }}:</strong> {{ currentVersion }}</p>
            <p><strong>{{ $t('update.newVersion') }}:</strong> {{ availableVersion }}</p>
            <div v-if="updateInfo?.releaseNotes" class="release-notes">
              <h4>{{ $t('update.releaseNotes') }}:</h4>
              <div class="notes-content" v-html="updateInfo.releaseNotes"></div>
            </div>
          </div>
          
          <!-- 下载进度 -->
          <div v-if="status === 'downloading'" class="download-progress">
            <div class="progress-bar">
              <div 
                class="progress-fill" 
                :style="{ width: downloadProgress?.percent + '%' }"
              ></div>
            </div>
            <div class="progress-info">
              <span>{{ Math.round(downloadProgress?.percent || 0) }}%</span>
              <span>{{ formatBytes(downloadProgress?.transferred || 0) }} / {{ formatBytes(downloadProgress?.total || 0) }}</span>
              <span>{{ formatBytes(downloadProgress?.bytesPerSecond || 0) }}/s</span>
            </div>
          </div>
          
          <!-- 错误信息 -->
          <div v-if="error" class="error-message">
            <p>{{ $t('update.error') }}: {{ error }}</p>
          </div>
        </div>
        
        <div class="update-actions">
          <button 
            v-if="status === 'available'" 
            @click="downloadUpdate" 
            class="btn btn-primary"
            :disabled="isLoading"
          >
            {{ $t('update.download') }}
          </button>
          
          <button 
            v-if="status === 'downloaded'" 
            @click="installUpdate" 
            class="btn btn-primary"
          >
            {{ $t('update.installAndRestart') }}
          </button>
          
          <button 
            v-if="status !== 'downloading'" 
            @click="closeDialog" 
            class="btn btn-secondary"
          >
            {{ $t('update.later') }}
          </button>
        </div>
      </div>
    </div>
    
    <!-- 更新状态指示器 -->
    <div v-if="showStatusIndicator" class="update-indicator" @click="showUpdateDialog = true">
      <div class="indicator-icon" :class="status">
        <span v-if="status === 'checking'">⟳</span>
        <span v-else-if="status === 'available'">↓</span>
        <span v-else-if="status === 'downloading'">{{ Math.round(downloadProgress?.percent || 0) }}%</span>
        <span v-else-if="status === 'downloaded'">✓</span>
        <span v-else-if="status === 'error'">!</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// 检测是否在 Electron 环境中
const isElectron = ref(typeof window !== 'undefined' && window.electronAPI !== undefined)

// 响应式数据
const showUpdateDialog = ref(false)
const showStatusIndicator = ref(false)
const status = ref<string>('idle')
const currentVersion = ref('')
const availableVersion = ref('')
const updateInfo = ref<any>(null)
const downloadProgress = ref<any>(null)
const error = ref('')
const isLoading = ref(false)

/**
 * 格式化字节数为可读格式
 */
const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

/**
 * 检查更新
 */
const checkForUpdates = async () => {
  if (!isElectron.value) {
    console.warn('更新功能仅在 Electron 环境中可用')
    return
  }
  
  try {
    isLoading.value = true
    await window.electronAPI.updater.checkForUpdates()
  } catch (err) {
    console.error('检查更新失败:', err)
    error.value = err instanceof Error ? err.message : String(err)
  } finally {
    isLoading.value = false
  }
}

/**
 * 下载更新
 */
const downloadUpdate = async () => {
  if (!isElectron.value) {
    console.warn('更新功能仅在 Electron 环境中可用')
    return
  }
  
  try {
    isLoading.value = true
    await window.electronAPI.updater.downloadUpdate()
  } catch (err) {
    console.error('下载更新失败:', err)
    error.value = err instanceof Error ? err.message : String(err)
  } finally {
    isLoading.value = false
  }
}

/**
 * 安装更新并重启
 */
const installUpdate = async () => {
  if (!isElectron.value) {
    console.warn('更新功能仅在 Electron 环境中可用')
    return
  }
  
  try {
    await window.electronAPI.updater.quitAndInstall()
  } catch (err) {
    console.error('安装更新失败:', err)
    error.value = err instanceof Error ? err.message : String(err)
  }
}

/**
 * 获取更新状态
 */
const getUpdateStatus = async () => {
  if (!isElectron.value) {
    console.warn('更新功能仅在 Electron 环境中可用')
    return
  }
  
  try {
    const statusInfo = await window.electronAPI.updater.getStatus()
    status.value = statusInfo.status
    currentVersion.value = statusInfo.currentVersion
    availableVersion.value = statusInfo.availableVersion || ''
    downloadProgress.value = statusInfo.downloadProgress
    error.value = statusInfo.error || ''
    
    // 显示状态指示器
    if (['checking', 'available', 'downloading', 'downloaded', 'error'].includes(status.value)) {
      showStatusIndicator.value = true
    }
    
    // 自动显示更新对话框
    if (status.value === 'available' && !showUpdateDialog.value) {
      showUpdateDialog.value = true
    }
  } catch (err) {
    console.error('获取更新状态失败:', err)
  }
}

/**
 * 关闭对话框
 */
const closeDialog = () => {
  showUpdateDialog.value = false
  if (status.value === 'idle' || status.value === 'not-available') {
    showStatusIndicator.value = false
  }
}

// 事件监听器
let removeListeners: (() => void)[] = []

onMounted(async () => {
  // 检查是否在 Electron 环境中
  if (!isElectron.value) {
    console.warn('更新功能仅在 Electron 环境中可用')
    currentVersion.value = 'Web 版本'
    return
  }
  
  // 获取当前版本
  try {
    const version = await window.electronAPI.updater.getVersion()
    currentVersion.value = version
  } catch (err) {
    console.error('获取版本失败:', err)
  }
  
  // 监听更新事件
  if (window.electronAPI?.updater) {
    const updateAvailableListener = (info: any) => {
      updateInfo.value = info
      availableVersion.value = info.version
      status.value = 'available'
      showStatusIndicator.value = true
      showUpdateDialog.value = true
    }
    
    const updateNotAvailableListener = () => {
      status.value = 'not-available'
      showStatusIndicator.value = false
    }
    
    const downloadProgressListener = (progress: any) => {
      downloadProgress.value = progress
      status.value = 'downloading'
      showStatusIndicator.value = true
    }
    
    const updateDownloadedListener = () => {
      status.value = 'downloaded'
      showStatusIndicator.value = true
    }
    
    const updateErrorListener = (err: Error) => {
      error.value = err.message
      status.value = 'error'
      showStatusIndicator.value = true
    }
    
    const checkingForUpdateListener = () => {
      status.value = 'checking'
      showStatusIndicator.value = true
      error.value = ''
    }
    
    // 注册事件监听器
    window.electronAPI.updater.onUpdateAvailable(updateAvailableListener)
    window.electronAPI.updater.onUpdateNotAvailable(updateNotAvailableListener)
    window.electronAPI.updater.onDownloadProgress(downloadProgressListener)
    window.electronAPI.updater.onUpdateDownloaded(updateDownloadedListener)
    window.electronAPI.updater.onError(updateErrorListener)
    window.electronAPI.updater.onCheckingForUpdate(checkingForUpdateListener)
    
    // 保存移除监听器的函数
    removeListeners = [
      () => window.electronAPI.updater.removeUpdateAvailableListener(updateAvailableListener),
      () => window.electronAPI.updater.removeUpdateNotAvailableListener(updateNotAvailableListener),
      () => window.electronAPI.updater.removeDownloadProgressListener(downloadProgressListener),
      () => window.electronAPI.updater.removeUpdateDownloadedListener(updateDownloadedListener),
      () => window.electronAPI.updater.removeErrorListener(updateErrorListener),
      () => window.electronAPI.updater.removeCheckingForUpdateListener(checkingForUpdateListener)
    ]
  }
  
  // 获取初始状态
  await getUpdateStatus()
  
  // 自动检查更新（可选）
  // await checkForUpdates()
})

onUnmounted(() => {
  // 移除所有事件监听器
  removeListeners.forEach(remove => remove())
})

// 暴露方法给父组件
defineExpose({
  checkForUpdates,
  getUpdateStatus
})
</script>

<style scoped>
.update-manager {
  position: relative;
}

/* 更新对话框样式 */
.update-dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.update-dialog {
  background: white;
  border-radius: 8px;
  padding: 0;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.update-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #eee;
  background: #f8f9fa;
}

.update-header h3 {
  margin: 0;
  color: #333;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  color: #333;
}

.update-content {
  padding: 20px;
  max-height: 400px;
  overflow-y: auto;
}

.update-info p {
  margin: 8px 0;
  color: #555;
}

.release-notes {
  margin-top: 16px;
}

.release-notes h4 {
  margin: 0 0 8px 0;
  color: #333;
}

.notes-content {
  background: #f8f9fa;
  padding: 12px;
  border-radius: 4px;
  border-left: 4px solid #007bff;
  max-height: 200px;
  overflow-y: auto;
}

/* 下载进度样式 */
.download-progress {
  margin: 16px 0;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: #e9ecef;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 8px;
}

.progress-fill {
  height: 100%;
  background: #007bff;
  transition: width 0.3s ease;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #666;
}

/* 错误信息样式 */
.error-message {
  background: #f8d7da;
  color: #721c24;
  padding: 12px;
  border-radius: 4px;
  border-left: 4px solid #dc3545;
  margin: 16px 0;
}

/* 按钮样式 */
.update-actions {
  padding: 20px;
  border-top: 1px solid #eee;
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-primary {
  background: #007bff;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #0056b3;
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background: #545b62;
}

/* 状态指示器样式 */
.update-indicator {
  position: fixed;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #007bff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 999;
  transition: all 0.3s ease;
}

.update-indicator:hover {
  transform: scale(1.1);
}

.indicator-icon {
  color: white;
  font-size: 14px;
  font-weight: bold;
}

.indicator-icon.checking {
  animation: spin 1s linear infinite;
}

.indicator-icon.available {
  animation: bounce 1s ease-in-out infinite;
}

.indicator-icon.error {
  background: #dc3545;
}

.indicator-icon.downloaded {
  background: #28a745;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-3px);
  }
  60% {
    transform: translateY(-2px);
  }
}

/* 深色主题支持 */
@media (prefers-color-scheme: dark) {
  .update-dialog {
    background: #2d3748;
    color: #e2e8f0;
  }
  
  .update-header {
    background: #4a5568;
    border-bottom-color: #4a5568;
  }
  
  .update-header h3 {
    color: #e2e8f0;
  }
  
  .close-btn {
    color: #a0aec0;
  }
  
  .close-btn:hover {
    color: #e2e8f0;
  }
  
  .update-info p {
    color: #cbd5e0;
  }
  
  .notes-content {
    background: #4a5568;
    border-left-color: #3182ce;
  }
  
  .progress-bar {
    background: #4a5568;
  }
  
  .update-actions {
    border-top-color: #4a5568;
  }
}
</style>