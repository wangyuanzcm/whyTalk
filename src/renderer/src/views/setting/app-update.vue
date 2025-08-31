<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { NButton, NSpace, NCard, NAlert, NProgress, NList, NListItem, NThing, NIcon, NTag, NModal, NForm, NFormItem, NInput, NCheckbox, NSwitch, NInputNumber, NSelect, NText, useMessage, NSpin, NEmpty, NPopconfirm, NDescriptions, NDescriptionsItem } from 'naive-ui'
import { Download, Refresh, CheckOne, Time, Warning, Info, Update, CloudDownload, History, Settings } from '@/components/icons'
import { useSettingsStore } from '@/store'

const message = useMessage()
const settingsStore = useSettingsStore()

// 更新相关状态
const updateState = ref({
  checking: false,
  downloading: false,
  progress: 0,
  currentStep: '',
  autoCheck: true,
  checkInterval: 24, // 小时
  autoDownload: false,
  autoInstall: false,
  includePrerelease: false,
  updateChannel: 'stable', // stable, beta, alpha
  downloadMirror: 'github', // github, gitee, custom
  customMirrorUrl: '',
  lastCheckTime: null,
  updateAvailable: false
})

// 当前版本信息
const currentVersion = ref({
  version: '1.0.0',
  buildNumber: '20240115001',
  buildDate: '2024-01-15',
  channel: 'stable',
  platform: 'win32',
  arch: 'x64'
})

// 最新版本信息
const latestVersion = ref({
  version: '1.0.1',
  buildNumber: '20240120001',
  buildDate: '2024-01-20',
  channel: 'stable',
  size: '85.6 MB',
  releaseNotes: [
    '修复了插件加载时的内存泄漏问题',
    '优化了主题切换的性能',
    '新增了备份与恢复功能',
    '改进了网络连接的稳定性',
    '修复了若干已知问题'
  ],
  downloadUrl: 'https://github.com/user/why-talk/releases/download/v1.0.1/why-talk-1.0.1-win.exe',
  checksumSha256: 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6'
})

// 更新历史
const updateHistory = ref([
  {
    id: '1',
    version: '1.0.0',
    date: '2024-01-15',
    type: 'major',
    status: 'installed',
    notes: '首个正式版本发布'
  },
  {
    id: '2',
    version: '0.9.5',
    date: '2024-01-10',
    type: 'minor',
    status: 'installed',
    notes: 'Beta版本，包含插件系统重构'
  },
  {
    id: '3',
    version: '0.9.0',
    date: '2024-01-05',
    type: 'minor',
    status: 'installed',
    notes: '新增P2P通信功能'
  }
])

// 模态框状态
const showUpdateModal = ref(false)
const showHistoryModal = ref(false)
const showSettingsModal = ref(false)
const showReleaseNotesModal = ref(false)

// 更新渠道选项
const updateChannelOptions = [
  { label: '稳定版 (Stable)', value: 'stable', description: '经过充分测试的稳定版本' },
  { label: '测试版 (Beta)', value: 'beta', description: '包含新功能的测试版本' },
  { label: '开发版 (Alpha)', value: 'alpha', description: '最新的开发版本，可能不稳定' }
]

// 下载镜像选项
const downloadMirrorOptions = [
  { label: 'GitHub (官方)', value: 'github' },
  { label: 'Gitee (国内镜像)', value: 'gitee' },
  { label: '自定义镜像', value: 'custom' }
]

// 检查间隔选项
const checkIntervalOptions = [
  { label: '每小时', value: 1 },
  { label: '每6小时', value: 6 },
  { label: '每12小时', value: 12 },
  { label: '每天', value: 24 },
  { label: '每周', value: 168 },
  { label: '手动检查', value: 0 }
]

/**
 * 检查更新
 */
const checkForUpdates = async (manual = false) => {
  updateState.value.checking = true
  
  try {
    const steps = [
      { name: '连接更新服务器', duration: 800 },
      { name: '获取版本信息', duration: 1000 },
      { name: '比较版本差异', duration: 500 },
      { name: '验证更新包', duration: 700 }
    ]
    
    for (let i = 0; i < steps.length; i++) {
      const step = steps[i]
      updateState.value.currentStep = step.name
      
      // 模拟检查过程
      await new Promise(resolve => setTimeout(resolve, step.duration))
      
      updateState.value.progress = Math.round(((i + 1) / steps.length) * 100)
    }
    
    // 模拟检查结果
    const hasUpdate = Math.random() > 0.5 // 50% 概率有更新
    updateState.value.updateAvailable = hasUpdate
    updateState.value.lastCheckTime = new Date().toLocaleString('zh-CN')
    
    if (hasUpdate) {
      message.success('发现新版本！')
      if (manual) {
        showUpdateModal.value = true
      }
    } else {
      message.info(manual ? '当前已是最新版本' : '已是最新版本')
    }
  } catch (error) {
    message.error('检查更新失败：' + error.message)
  } finally {
    updateState.value.checking = false
    updateState.value.progress = 0
    updateState.value.currentStep = ''
  }
}

/**
 * 下载更新
 */
const downloadUpdate = async () => {
  updateState.value.downloading = true
  updateState.value.progress = 0
  
  try {
    const steps = [
      { name: '准备下载环境', duration: 500 },
      { name: '开始下载更新包', duration: 3000 },
      { name: '验证文件完整性', duration: 1000 },
      { name: '准备安装程序', duration: 800 }
    ]
    
    for (let i = 0; i < steps.length; i++) {
      const step = steps[i]
      updateState.value.currentStep = step.name
      
      if (step.name === '开始下载更新包') {
        // 模拟下载进度
        for (let progress = 0; progress <= 100; progress += 5) {
          updateState.value.progress = Math.round(((i) / steps.length) * 100 + progress / steps.length)
          await new Promise(resolve => setTimeout(resolve, 150))
        }
      } else {
        await new Promise(resolve => setTimeout(resolve, step.duration))
        updateState.value.progress = Math.round(((i + 1) / steps.length) * 100)
      }
    }
    
    message.success('更新下载完成！')
    
    // 如果启用了自动安装
    if (updateState.value.autoInstall) {
      await installUpdate()
    } else {
      message.info('更新已下载，请手动安装')
    }
  } catch (error) {
    message.error('下载更新失败：' + error.message)
  } finally {
    updateState.value.downloading = false
    updateState.value.progress = 0
    updateState.value.currentStep = ''
  }
}

/**
 * 安装更新
 */
const installUpdate = async () => {
  try {
    message.info('正在安装更新，应用将重新启动...')
    
    // 模拟安装过程
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // 这里应该调用主进程的安装API
    // await window.electronAPI.installUpdate()
    
    // 模拟重启
    setTimeout(() => {
      window.location.reload()
    }, 1000)
  } catch (error) {
    message.error('安装更新失败：' + error.message)
  }
}

/**
 * 跳过当前版本
 */
const skipVersion = () => {
  settingsStore.setSkippedVersion(latestVersion.value.version)
  updateState.value.updateAvailable = false
  message.info(`已跳过版本 ${latestVersion.value.version}`)
  showUpdateModal.value = false
}

/**
 * 保存更新设置
 */
const saveUpdateSettings = () => {
  settingsStore.setUpdateSettings({
    autoCheck: updateState.value.autoCheck,
    checkInterval: updateState.value.checkInterval,
    autoDownload: updateState.value.autoDownload,
    autoInstall: updateState.value.autoInstall,
    includePrerelease: updateState.value.includePrerelease,
    updateChannel: updateState.value.updateChannel,
    downloadMirror: updateState.value.downloadMirror,
    customMirrorUrl: updateState.value.customMirrorUrl
  })
  
  message.success('更新设置已保存')
  showSettingsModal.value = false
}

/**
 * 重置更新设置
 */
const resetUpdateSettings = () => {
  updateState.value.autoCheck = true
  updateState.value.checkInterval = 24
  updateState.value.autoDownload = false
  updateState.value.autoInstall = false
  updateState.value.includePrerelease = false
  updateState.value.updateChannel = 'stable'
  updateState.value.downloadMirror = 'github'
  updateState.value.customMirrorUrl = ''
  
  message.success('更新设置已重置')
}

/**
 * 打开发布页面
 */
const openReleasePage = () => {
  // 这里应该调用主进程的打开URL API
  // window.electronAPI.openExternal('https://github.com/user/why-talk/releases')
  message.info('正在打开发布页面...')
}

/**
 * 复制下载链接
 */
const copyDownloadLink = () => {
  navigator.clipboard.writeText(latestVersion.value.downloadUrl)
  message.success('下载链接已复制到剪贴板')
}

// 计算属性
const isUpdateAvailable = computed(() => {
  return updateState.value.updateAvailable && 
         latestVersion.value.version !== currentVersion.value.version
})

const updateTypeText = computed(() => {
  const current = currentVersion.value.version.split('.')
  const latest = latestVersion.value.version.split('.')
  
  if (latest[0] > current[0]) return '主要更新'
  if (latest[1] > current[1]) return '功能更新'
  if (latest[2] > current[2]) return '修复更新'
  return '未知更新'
})

const nextCheckTime = computed(() => {
  if (!updateState.value.autoCheck || updateState.value.checkInterval === 0) {
    return '手动检查'
  }
  
  const lastCheck = updateState.value.lastCheckTime
  if (!lastCheck) return '未知'
  
  const lastCheckDate = new Date(lastCheck)
  const nextCheck = new Date(lastCheckDate.getTime() + updateState.value.checkInterval * 60 * 60 * 1000)
  return nextCheck.toLocaleString('zh-CN')
})

onMounted(() => {
  // 加载更新设置
  const updateSettings = settingsStore.updateSettings
  if (updateSettings) {
    updateState.value.autoCheck = updateSettings.autoCheck
    updateState.value.checkInterval = updateSettings.checkInterval
    updateState.value.autoDownload = updateSettings.autoDownload
    updateState.value.autoInstall = updateSettings.autoInstall
    updateState.value.includePrerelease = updateSettings.includePrerelease
    updateState.value.updateChannel = updateSettings.updateChannel
    updateState.value.downloadMirror = updateSettings.downloadMirror
    updateState.value.customMirrorUrl = updateSettings.customMirrorUrl
  }
  
  // 获取当前版本信息
  // currentVersion.value = await window.electronAPI.getAppVersion()
  
  // 如果启用了自动检查，执行检查
  if (updateState.value.autoCheck) {
    checkForUpdates(false)
  }
})
</script>

<template>
  <section>
    <h3 class="title">应用更新</h3>
    
    <!-- 当前版本信息 -->
    <NCard title="当前版本" class="section-card">
      <div class="version-info">
        <div class="version-main">
          <div class="version-number">
            <span class="version-text">{{ currentVersion.version }}</span>
            <NTag :type="currentVersion.channel === 'stable' ? 'success' : 'warning'" size="small">
              {{ currentVersion.channel === 'stable' ? '稳定版' : currentVersion.channel === 'beta' ? '测试版' : '开发版' }}
            </NTag>
          </div>
          <div class="version-meta">
            <span>构建号：{{ currentVersion.buildNumber }}</span>
            <span>构建日期：{{ currentVersion.buildDate }}</span>
            <span>平台：{{ currentVersion.platform }}-{{ currentVersion.arch }}</span>
          </div>
        </div>
        
        <div class="version-actions">
          <NSpace>
            <NButton 
              type="primary" 
              @click="checkForUpdates(true)"
              :loading="updateState.checking"
            >
              <template #icon>
                <NIcon><Refresh /></NIcon>
              </template>
              {{ updateState.checking ? '检查中...' : '检查更新' }}
            </NButton>
            <NButton @click="showSettingsModal = true">
              <template #icon>
                <NIcon><Settings /></NIcon>
              </template>
              更新设置
            </NButton>
            <NButton @click="showHistoryModal = true">
              <template #icon>
                <NIcon><History /></NIcon>
              </template>
              更新历史
            </NButton>
          </NSpace>
        </div>
      </div>
      
      <!-- 检查进度 -->
      <div v-if="updateState.checking" class="check-progress">
        <div class="progress-info">
          <span>{{ updateState.currentStep }}</span>
        </div>
        <NProgress 
          type="line" 
          :percentage="updateState.progress"
          :show-indicator="true"
          processing
        />
      </div>
    </NCard>

    <!-- 更新状态 -->
    <NCard title="更新状态" class="section-card">
      <div v-if="isUpdateAvailable" class="update-available">
        <NAlert type="info" style="margin-bottom: 16px">
          <template #icon>
            <NIcon><Update /></NIcon>
          </template>
          发现新版本 {{ latestVersion.version }}，建议及时更新以获得最新功能和修复。
        </NAlert>
        
        <div class="update-details">
          <div class="update-header">
            <div class="update-version">
              <span class="version-number">{{ latestVersion.version }}</span>
              <NTag type="info" size="small">{{ updateTypeText }}</NTag>
            </div>
            <div class="update-meta">
              <span>发布日期：{{ latestVersion.buildDate }}</span>
              <span>文件大小：{{ latestVersion.size }}</span>
            </div>
          </div>
          
          <div class="update-actions">
            <NSpace>
              <NButton 
                type="primary" 
                @click="downloadUpdate"
                :loading="updateState.downloading"
              >
                <template #icon>
                  <NIcon><CloudDownload /></NIcon>
                </template>
                {{ updateState.downloading ? '下载中...' : '立即更新' }}
              </NButton>
              <NButton @click="showReleaseNotesModal = true">
                <template #icon>
                  <NIcon><Info /></NIcon>
                </template>
                查看更新日志
              </NButton>
              <NButton @click="skipVersion">
                跳过此版本
              </NButton>
            </NSpace>
          </div>
        </div>
        
        <!-- 下载进度 -->
        <div v-if="updateState.downloading" class="download-progress">
          <div class="progress-info">
            <span>{{ updateState.currentStep }}</span>
            <span>{{ updateState.progress }}%</span>
          </div>
          <NProgress 
            type="line" 
            :percentage="updateState.progress"
            :show-indicator="false"
            processing
          />
        </div>
      </div>
      
      <div v-else class="update-current">
        <div class="current-status">
          <NIcon size="48" color="#18a058">
            <CheckOne />
          </NIcon>
          <div class="status-text">
            <h4>当前已是最新版本</h4>
            <p v-if="updateState.lastCheckTime">
              上次检查：{{ updateState.lastCheckTime }}
            </p>
            <p v-if="updateState.autoCheck">
              下次检查：{{ nextCheckTime }}
            </p>
          </div>
        </div>
      </div>
    </NCard>

    <!-- 自动更新设置 -->
    <NCard title="自动更新设置" class="section-card">
      <div class="auto-update-settings">
        <div class="setting-item">
          <div class="setting-label">
            <span>自动检查更新</span>
            <span class="setting-description">定期检查是否有新版本可用</span>
          </div>
          <NSwitch v-model:value="updateState.autoCheck" @update:value="saveUpdateSettings" />
        </div>
        
        <div v-if="updateState.autoCheck" class="setting-item">
          <div class="setting-label">
            <span>检查间隔</span>
            <span class="setting-description">设置自动检查更新的频率</span>
          </div>
          <NSelect 
            v-model:value="updateState.checkInterval" 
            :options="checkIntervalOptions"
            style="width: 150px"
            @update:value="saveUpdateSettings"
          />
        </div>
        
        <div class="setting-item">
          <div class="setting-label">
            <span>自动下载更新</span>
            <span class="setting-description">发现更新时自动下载（不会自动安装）</span>
          </div>
          <NSwitch v-model:value="updateState.autoDownload" @update:value="saveUpdateSettings" />
        </div>
        
        <div class="setting-item">
          <div class="setting-label">
            <span>自动安装更新</span>
            <span class="setting-description">下载完成后自动安装并重启应用</span>
          </div>
          <NSwitch v-model:value="updateState.autoInstall" @update:value="saveUpdateSettings" />
        </div>
        
        <div class="setting-item">
          <div class="setting-label">
            <span>包含预发布版本</span>
            <span class="setting-description">检查更新时包含测试版和开发版</span>
          </div>
          <NSwitch v-model:value="updateState.includePrerelease" @update:value="saveUpdateSettings" />
        </div>
      </div>
    </NCard>

    <!-- 更新设置模态框 -->
    <NModal v-model:show="showSettingsModal" preset="card" title="更新设置" style="width: 600px">
      <NForm>
        <NFormItem label="更新渠道">
          <div class="channel-options">
            <div 
              v-for="option in updateChannelOptions" 
              :key="option.value"
              class="channel-option"
              :class="{ active: updateState.updateChannel === option.value }"
              @click="updateState.updateChannel = option.value"
            >
              <div class="option-header">
                <span class="option-label">{{ option.label }}</span>
                <NIcon v-if="updateState.updateChannel === option.value" color="#18a058">
                  <CheckOne />
                </NIcon>
              </div>
              <div class="option-description">{{ option.description }}</div>
            </div>
          </div>
        </NFormItem>
        
        <NFormItem label="下载镜像">
          <NSelect 
            v-model:value="updateState.downloadMirror" 
            :options="downloadMirrorOptions"
          />
        </NFormItem>
        
        <NFormItem v-if="updateState.downloadMirror === 'custom'" label="自定义镜像地址">
          <NInput 
            v-model:value="updateState.customMirrorUrl" 
            placeholder="https://example.com/releases/"
          />
        </NFormItem>
        
        <NFormItem>
          <NSpace>
            <NButton type="primary" @click="saveUpdateSettings">
              保存设置
            </NButton>
            <NButton @click="resetUpdateSettings">
              重置设置
            </NButton>
            <NButton @click="showSettingsModal = false">
              取消
            </NButton>
          </NSpace>
        </NFormItem>
      </NForm>
    </NModal>

    <!-- 更新历史模态框 -->
    <NModal v-model:show="showHistoryModal" preset="card" title="更新历史" style="width: 700px">
      <div v-if="updateHistory.length === 0" class="empty-state">
        <NEmpty description="暂无更新历史" />
      </div>
      
      <NList v-else>
        <NListItem v-for="update in updateHistory" :key="update.id">
          <NThing>
            <template #header>
              <div class="history-header">
                <span class="history-version">{{ update.version }}</span>
                <div class="history-tags">
                  <NTag 
                    :type="update.type === 'major' ? 'error' : update.type === 'minor' ? 'warning' : 'info'" 
                    size="small"
                  >
                    {{ update.type === 'major' ? '主要' : update.type === 'minor' ? '次要' : '修复' }}
                  </NTag>
                  <NTag type="success" size="small">
                    {{ update.status === 'installed' ? '已安装' : '未安装' }}
                  </NTag>
                </div>
              </div>
            </template>
            
            <template #description>
              <div class="history-info">
                <div class="history-meta">
                  <span><NIcon><Time /></NIcon> {{ update.date }}</span>
                </div>
                <div class="history-notes">
                  {{ update.notes }}
                </div>
              </div>
            </template>
          </NThing>
        </NListItem>
      </NList>
    </NModal>

    <!-- 发布说明模态框 -->
    <NModal v-model:show="showReleaseNotesModal" preset="card" title="更新日志" style="width: 600px">
      <div class="release-notes">
        <div class="notes-header">
          <h4>版本 {{ latestVersion.version }}</h4>
          <p>发布日期：{{ latestVersion.buildDate }}</p>
        </div>
        
        <div class="notes-content">
          <h5>更新内容：</h5>
          <ul>
            <li v-for="note in latestVersion.releaseNotes" :key="note">
              {{ note }}
            </li>
          </ul>
        </div>
        
        <div class="notes-actions">
          <NSpace>
            <NButton type="primary" @click="downloadUpdate">
              立即更新
            </NButton>
            <NButton @click="openReleasePage">
              查看完整发布页面
            </NButton>
            <NButton @click="copyDownloadLink">
              复制下载链接
            </NButton>
          </NSpace>
        </div>
      </div>
    </NModal>
  </section>
</template>

<style lang="less" scoped>
@import '@/styles/theme/index.less';

section {
  padding: var(--spacing-lg);
  background: var(--color-bg-content);
  border-radius: var(--border-radius-lg);
  .card-shadow();
}

.title {
  margin: 0 0 var(--spacing-xl) 0;
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  line-height: var(--line-height-tight);
}

.section-card {
  margin-bottom: var(--spacing-xl);
  
  &:last-child {
    margin-bottom: 0;
  }
}

// 版本信息样式
.version-info {
  .flex-row();
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--spacing-lg);
  
  .version-main {
    .flex-column();
    gap: var(--spacing-sm);
    
    .version-number {
      .flex-row();
      align-items: center;
      gap: var(--spacing-sm);
      
      .version-text {
        font-size: var(--font-size-xxl);
        font-weight: var(--font-weight-bold);
        color: var(--color-primary);
      }
    }
    
    .version-meta {
      .flex-column();
      gap: var(--spacing-xs);
      font-size: var(--font-size-sm);
      color: var(--color-text-secondary);
    }
  }
  
  .version-actions {
    flex-shrink: 0;
  }
}

.check-progress {
  margin-top: var(--spacing-lg);
  
  .progress-info {
    .flex-row();
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-sm);
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
  }
}

// 更新可用样式
.update-available {
  .update-details {
    .update-header {
      .flex-column();
      gap: var(--spacing-sm);
      margin-bottom: var(--spacing-lg);
      
      .update-version {
        .flex-row();
        align-items: center;
        gap: var(--spacing-sm);
        
        .version-number {
          font-size: var(--font-size-xl);
          font-weight: var(--font-weight-bold);
          color: var(--color-primary);
        }
      }
      
      .update-meta {
        .flex-row();
        gap: var(--spacing-md);
        font-size: var(--font-size-sm);
        color: var(--color-text-secondary);
      }
    }
    
    .update-actions {
      margin-bottom: var(--spacing-lg);
    }
  }
}

.download-progress {
  margin-top: var(--spacing-lg);
  
  .progress-info {
    .flex-row();
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-sm);
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
  }
}

// 当前最新样式
.update-current {
  .current-status {
    .flex-row();
    align-items: center;
    gap: var(--spacing-lg);
    text-align: left;
    
    .status-text {
      h4 {
        margin: 0 0 var(--spacing-xs) 0;
        font-size: var(--font-size-lg);
        color: var(--color-text-primary);
      }
      
      p {
        margin: 0;
        font-size: var(--font-size-sm);
        color: var(--color-text-secondary);
        line-height: var(--line-height-relaxed);
      }
    }
  }
}

// 自动更新设置样式
.auto-update-settings {
  .flex-column();
  gap: var(--spacing-lg);
  
  .setting-item {
    .flex-row();
    justify-content: space-between;
    align-items: center;
    padding: var(--spacing-md);
    border: 1px solid var(--color-border-light);
    border-radius: var(--border-radius-md);
    
    .setting-label {
      .flex-column();
      gap: var(--spacing-xs);
      
      span:first-child {
        font-weight: var(--font-weight-medium);
        color: var(--color-text-primary);
      }
      
      .setting-description {
        font-size: var(--font-size-sm);
        color: var(--color-text-secondary);
      }
    }
  }
}

// 渠道选项样式
.channel-options {
  .flex-column();
  gap: var(--spacing-sm);
  
  .channel-option {
    padding: var(--spacing-md);
    border: 1px solid var(--color-border-light);
    border-radius: var(--border-radius-md);
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
      border-color: var(--color-primary);
    }
    
    &.active {
      border-color: var(--color-primary);
      background: var(--color-primary-light);
    }
    
    .option-header {
      .flex-row();
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--spacing-xs);
      
      .option-label {
        font-weight: var(--font-weight-medium);
        color: var(--color-text-primary);
      }
    }
    
    .option-description {
      font-size: var(--font-size-sm);
      color: var(--color-text-secondary);
    }
  }
}

// 历史记录样式
.history-header {
  .flex-row();
  justify-content: space-between;
  align-items: center;
  width: 100%;
  
  .history-version {
    font-weight: var(--font-weight-semibold);
    font-size: var(--font-size-md);
  }
  
  .history-tags {
    .flex-row();
    gap: var(--spacing-xs);
  }
}

.history-info {
  .flex-column();
  gap: var(--spacing-sm);
  
  .history-meta {
    .flex-row();
    gap: var(--spacing-md);
    color: var(--color-text-secondary);
    font-size: var(--font-size-sm);
    
    span {
      .flex-row();
      align-items: center;
      gap: var(--spacing-xs);
    }
  }
  
  .history-notes {
    font-size: var(--font-size-sm);
    color: var(--color-text-primary);
  }
}

// 发布说明样式
.release-notes {
  .notes-header {
    margin-bottom: var(--spacing-lg);
    
    h4 {
      margin: 0 0 var(--spacing-xs) 0;
      font-size: var(--font-size-lg);
      color: var(--color-text-primary);
    }
    
    p {
      margin: 0;
      font-size: var(--font-size-sm);
      color: var(--color-text-secondary);
    }
  }
  
  .notes-content {
    margin-bottom: var(--spacing-lg);
    
    h5 {
      margin: 0 0 var(--spacing-sm) 0;
      font-size: var(--font-size-md);
      color: var(--color-text-primary);
    }
    
    ul {
      margin: 0;
      padding-left: var(--spacing-lg);
      
      li {
        margin-bottom: var(--spacing-xs);
        color: var(--color-text-primary);
        line-height: var(--line-height-relaxed);
      }
    }
  }
  
  .notes-actions {
    .flex-row();
    justify-content: center;
  }
}

.empty-state {
  text-align: center;
  padding: var(--spacing-xl);
}

// 响应式设计
.mobile-only() {
  .version-info {
    .flex-column();
    align-items: stretch !important;
  }
  
  .update-header {
    .update-meta {
      .flex-column();
      align-items: flex-start !important;
    }
  }
  
  .current-status {
    .flex-column();
    text-align: center !important;
  }
  
  .setting-item {
    .flex-column();
    align-items: stretch !important;
    gap: var(--spacing-sm);
  }
}

// 暗色主题适配
:global([data-theme='dark']) {
  section {
    background: var(--color-bg-content-dark);
  }
  
  .title {
    color: var(--color-text-primary-dark) !important;
  }
  
  .version-text {
    color: var(--color-primary-dark) !important;
  }
  
  .version-meta {
    color: var(--color-text-secondary-dark) !important;
  }
  
  .update-version .version-number {
    color: var(--color-primary-dark) !important;
  }
  
  .update-meta {
    color: var(--color-text-secondary-dark) !important;
  }
  
  .status-text {
    h4 {
      color: var(--color-text-primary-dark) !important;
    }
    
    p {
      color: var(--color-text-secondary-dark) !important;
    }
  }
  
  .setting-item {
    border-color: var(--color-border-dark) !important;
    
    .setting-label {
      span:first-child {
        color: var(--color-text-primary-dark) !important;
      }
      
      .setting-description {
        color: var(--color-text-secondary-dark) !important;
      }
    }
  }
  
  .channel-option {
    border-color: var(--color-border-dark) !important;
    
    &:hover {
      border-color: var(--color-primary-dark) !important;
    }
    
    &.active {
      border-color: var(--color-primary-dark) !important;
      background: var(--color-primary-light-dark) !important;
    }
    
    .option-label {
      color: var(--color-text-primary-dark) !important;
    }
    
    .option-description {
      color: var(--color-text-secondary-dark) !important;
    }
  }
  
  .history-version {
    color: var(--color-text-primary-dark) !important;
  }
  
  .history-meta {
    color: var(--color-text-secondary-dark) !important;
  }
  
  .history-notes {
    color: var(--color-text-primary-dark) !important;
  }
  
  .notes-header {
    h4 {
      color: var(--color-text-primary-dark) !important;
    }
    
    p {
      color: var(--color-text-secondary-dark) !important;
    }
  }
  
  .notes-content {
    h5 {
      color: var(--color-text-primary-dark) !important;
    }
    
    li {
      color: var(--color-text-primary-dark) !important;
    }
  }
}
</style>