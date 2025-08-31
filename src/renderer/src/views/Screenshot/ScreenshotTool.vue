<template>
  <div class="screenshot-tool-page">
    <div class="page-header">
      <div class="header-content">
        <div class="title-section">
          <h1 class="page-title">
            <n-icon class="title-icon"><ScreenshotIcon /></n-icon>
            截图工具
          </h1>
          <p class="page-description">
            强大的截图工具，支持全屏、窗口和区域截图，集成AI分析功能
          </p>
        </div>
        
        <div class="quick-actions">
          <n-button-group>
            <n-button type="primary" @click="quickFullscreen" :loading="isQuickCapturing">
              <template #icon>
                <n-icon><ScreenshotIcon /></n-icon>
              </template>
              快速截图
            </n-button>
            <n-button @click="openSettings">
              <template #icon>
                <n-icon><SettingsIcon /></n-icon>
              </template>
              设置
            </n-button>
          </n-button-group>
        </div>
      </div>
    </div>

    <div class="page-content">
      <div class="content-grid">
        <!-- 截图功能区域 -->
        <div class="capture-section">
          <n-card title="截图功能" class="section-card">
            <ScreenshotCapture />
          </n-card>
        </div>

        <!-- 统计信息区域 -->
        <div class="stats-section">
          <n-card title="统计信息" class="section-card">
            <div class="stats-content">
              <div class="stat-item">
                <div class="stat-label">总截图数</div>
                <div class="stat-value">{{ stats.totalScreenshots }}</div>
              </div>
              <div class="stat-item">
                <div class="stat-label">保存路径</div>
                <div class="stat-value stat-path" :title="stats.defaultSavePath">
                  {{ stats.defaultSavePath || '未设置' }}
                </div>
              </div>
              <div class="stat-item">
                <div class="stat-label">服务状态</div>
                <div class="stat-value">
                  <n-tag :type="stats.isInitialized ? 'success' : 'error'">
                    {{ stats.isInitialized ? '已初始化' : '未初始化' }}
                  </n-tag>
                </div>
              </div>
            </div>
            
            <div class="stats-actions">
              <n-button @click="refreshStats" size="small">
                <template #icon>
                  <n-icon><RefreshIcon /></n-icon>
                </template>
                刷新
              </n-button>
              <n-button @click="openSaveDirectory" size="small">
                <template #icon>
                  <n-icon><FolderIcon /></n-icon>
                </template>
                打开目录
              </n-button>
            </div>
          </n-card>
        </div>

        <!-- 快捷键说明 -->
        <div class="shortcuts-section">
          <n-card title="快捷键" class="section-card">
            <div class="shortcuts-list">
              <div class="shortcut-item">
                <div class="shortcut-keys">
                  <n-tag size="small">Ctrl</n-tag>
                  <span>+</span>
                  <n-tag size="small">Shift</n-tag>
                  <span>+</span>
                  <n-tag size="small">A</n-tag>
                </div>
                <div class="shortcut-desc">全屏截图</div>
              </div>
              <div class="shortcut-item">
                <div class="shortcut-keys">
                  <n-tag size="small">Ctrl</n-tag>
                  <span>+</span>
                  <n-tag size="small">Shift</n-tag>
                  <span>+</span>
                  <n-tag size="small">W</n-tag>
                </div>
                <div class="shortcut-desc">窗口截图</div>
              </div>
              <div class="shortcut-item">
                <div class="shortcut-keys">
                  <n-tag size="small">Ctrl</n-tag>
                  <span>+</span>
                  <n-tag size="small">Shift</n-tag>
                  <span>+</span>
                  <n-tag size="small">S</n-tag>
                </div>
                <div class="shortcut-desc">区域截图</div>
              </div>
            </div>
          </n-card>
        </div>

        <!-- 最近截图 -->
        <div class="recent-section">
          <n-card title="最近截图" class="section-card">
            <div class="recent-content">
              <div v-if="recentScreenshots.length === 0" class="empty-state">
                <n-icon size="48"><ImageIcon /></n-icon>
                <p>暂无最近截图</p>
              </div>
              <div v-else class="recent-grid">
                <div 
                  v-for="(screenshot, index) in recentScreenshots" 
                  :key="index"
                  class="recent-item"
                  @click="previewScreenshot(screenshot)"
                >
                  <img 
                    v-if="screenshot.thumbnail" 
                    :src="screenshot.thumbnail" 
                    :alt="screenshot.name"
                    class="recent-thumbnail"
                  />
                  <div class="recent-info">
                    <div class="recent-name">{{ screenshot.name }}</div>
                    <div class="recent-time">{{ formatTime(screenshot.time) }}</div>
                  </div>
                </div>
              </div>
            </div>
          </n-card>
        </div>
      </div>
    </div>

    <!-- 设置模态框 -->
    <n-modal v-model:show="showSettings" class="settings-modal">
      <n-card
        style="width: 500px"
        title="截图设置"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
      >
        <div class="settings-content">
          <n-form :model="settingsForm" label-placement="left" label-width="120px">
            <n-form-item label="默认格式">
              <n-select 
                v-model:value="settingsForm.format" 
                :options="formatOptions"
                placeholder="选择图片格式"
              />
            </n-form-item>
            
            <n-form-item label="图片质量">
              <n-slider 
                v-model:value="settingsForm.quality" 
                :min="1" 
                :max="100" 
                :step="1"
                :tooltip="false"
              />
              <span class="quality-label">{{ settingsForm.quality }}%</span>
            </n-form-item>
            
            <n-form-item label="保存路径">
              <div class="path-input">
                <n-input 
                  v-model:value="settingsForm.savePath" 
                  placeholder="选择保存路径"
                  readonly
                />
                <n-button @click="selectSavePath">
                  <template #icon>
                    <n-icon><FolderIcon /></n-icon>
                  </template>
                  浏览
                </n-button>
              </div>
            </n-form-item>
            
            <n-form-item label="自动保存">
              <n-switch v-model:value="settingsForm.autoSave" />
            </n-form-item>
            
            <n-form-item label="显示通知">
              <n-switch v-model:value="settingsForm.showNotification" />
            </n-form-item>
          </n-form>
        </div>
        
        <template #footer>
          <div class="modal-actions">
            <n-button @click="showSettings = false">取消</n-button>
            <n-button type="primary" @click="saveSettings">
              保存设置
            </n-button>
          </div>
        </template>
      </n-card>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { 
  NCard, 
  NButton, 
  NButtonGroup, 
  NIcon, 
  NTag,
  NModal,
  NForm,
  NFormItem,
  NSelect,
  NSlider,
  NInput,
  NSwitch,
  useMessage
} from 'naive-ui'
import {
  Camera as ScreenshotIcon,
  Settings as SettingsIcon,
  Refresh as RefreshIcon,
  Folder as FolderIcon,
  Image as ImageIcon
} from '@vicons/ionicons5'
import { ScreenshotCapture } from '@/components/Screenshot'

// 响应式数据
const message = useMessage()
const isQuickCapturing = ref(false)
const showSettings = ref(false)
const stats = ref<Window['electron']['screenshot']['ScreenshotStats']>({
  totalScreenshots: 0,
  defaultSavePath: '',
  isInitialized: false
})

// 最近截图数据（模拟数据）
const recentScreenshots = ref<Array<{
  name: string
  time: Date
  thumbnail?: string
  path: string
}>>([])

// 设置表单
const settingsForm = reactive({
  format: 'png',
  quality: 100,
  savePath: '',
  autoSave: true,
  showNotification: true
})

// 格式选项
const formatOptions = [
  { label: 'PNG', value: 'png' },
  { label: 'JPEG', value: 'jpeg' }
]

/**
 * 组件挂载时初始化
 */
onMounted(async () => {
  await refreshStats()
  await loadSettings()
})

/**
 * 快速全屏截图
 */
const quickFullscreen = async () => {
  try {
    isQuickCapturing.value = true
    const result = await window.electron.screenshot.captureFullscreen({
      format: settingsForm.format as 'png' | 'jpeg',
      quality: settingsForm.quality
    })
    
    if (result.success) {
      message.success('快速截图成功')
      await refreshStats()
    } else {
      message.error(`截图失败: ${result.error}`)
    }
  } catch (error) {
    message.error(`截图失败: ${error}`)
  } finally {
    isQuickCapturing.value = false
  }
}

/**
 * 刷新统计信息
 */
const refreshStats = async () => {
  try {
    const result = await window.electron.screenshot.getStats()
    stats.value = result
  } catch (error) {
    console.error('获取统计信息失败:', error)
  }
}

/**
 * 打开保存目录
 */
const openSaveDirectory = async () => {
  try {
    const result = await window.electron.screenshot.openDirectory()
    if (result.success) {
      message.success('目录已打开')
    } else {
      message.error(`打开目录失败: ${result.error}`)
    }
  } catch (error) {
    message.error(`打开目录失败: ${error}`)
  }
}

/**
 * 打开设置
 */
const openSettings = () => {
  showSettings.value = true
}

/**
 * 选择保存路径
 */
const selectSavePath = async () => {
  try {
    const path = await window.electron.screenshot.selectSaveDirectory()
    if (path) {
      settingsForm.savePath = path
    }
  } catch (error) {
    message.error(`选择路径失败: ${error}`)
  }
}

/**
 * 保存设置
 */
const saveSettings = async () => {
  try {
    if (settingsForm.savePath) {
      const result = await window.electron.screenshot.setSavePath(settingsForm.savePath)
      if (!result.success) {
        message.error(`设置保存路径失败: ${result.error}`)
        return
      }
    }
    
    // 保存其他设置到本地存储
    localStorage.setItem('screenshot-settings', JSON.stringify(settingsForm))
    
    showSettings.value = false
    message.success('设置已保存')
    await refreshStats()
  } catch (error) {
    message.error(`保存设置失败: ${error}`)
  }
}

/**
 * 加载设置
 */
const loadSettings = async () => {
  try {
    // 从本地存储加载设置
    const saved = localStorage.getItem('screenshot-settings')
    if (saved) {
      const settings = JSON.parse(saved)
      Object.assign(settingsForm, settings)
    }
    
    // 获取当前保存路径
    const currentPath = await window.electron.screenshot.getSavePath()
    if (currentPath) {
      settingsForm.savePath = currentPath
    }
  } catch (error) {
    console.error('加载设置失败:', error)
  }
}

/**
 * 预览截图
 */
const previewScreenshot = (screenshot: any) => {
  message.info(`预览截图: ${screenshot.name}`)
  // 这里可以实现截图预览功能
}

/**
 * 格式化时间
 */
const formatTime = (time: Date) => {
  return time.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<style scoped>
.screenshot-tool-page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--body-color);
}

.page-header {
  padding: 24px;
  background-color: var(--card-color);
  border-bottom: 1px solid var(--border-color);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.title-section {
  flex: 1;
}

.page-title {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0 0 8px 0;
  font-size: 28px;
  font-weight: 600;
  color: var(--text-color-1);
}

.title-icon {
  color: var(--primary-color);
}

.page-description {
  margin: 0;
  color: var(--text-color-2);
  font-size: 14px;
}

.quick-actions {
  flex-shrink: 0;
}

.page-content {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
}

.content-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: auto auto;
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
}

.capture-section {
  grid-column: 1;
  grid-row: 1 / 3;
}

.stats-section {
  grid-column: 2;
  grid-row: 1;
}

.shortcuts-section {
  grid-column: 2;
  grid-row: 2;
}

.recent-section {
  grid-column: 1 / 3;
  grid-row: 3;
}

.section-card {
  height: 100%;
}

.stats-content {
  margin-bottom: 16px;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid var(--border-color);
}

.stat-item:last-child {
  border-bottom: none;
}

.stat-label {
  font-size: 14px;
  color: var(--text-color-2);
}

.stat-value {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-color-1);
}

.stat-path {
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.stats-actions {
  display: flex;
  gap: 8px;
}

.shortcuts-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.shortcut-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.shortcut-keys {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
}

.shortcut-desc {
  font-size: 14px;
  color: var(--text-color-2);
}

.recent-content {
  min-height: 200px;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: var(--text-color-3);
  gap: 12px;
}

.recent-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}

.recent-item {
  display: flex;
  flex-direction: column;
  padding: 12px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.recent-item:hover {
  border-color: var(--primary-color);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.recent-thumbnail {
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 8px;
}

.recent-info {
  text-align: center;
}

.recent-name {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-color-1);
  margin-bottom: 4px;
}

.recent-time {
  font-size: 12px;
  color: var(--text-color-3);
}

.settings-content {
  margin-bottom: 16px;
}

.path-input {
  display: flex;
  gap: 8px;
}

.path-input .n-input {
  flex: 1;
}

.quality-label {
  margin-left: 12px;
  font-size: 14px;
  color: var(--text-color-2);
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

@media (max-width: 768px) {
  .content-grid {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }
  
  .capture-section,
  .stats-section,
  .shortcuts-section,
  .recent-section {
    grid-column: 1;
    grid-row: auto;
  }
  
  .header-content {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }
  
  .quick-actions {
    align-self: stretch;
  }
}
</style>