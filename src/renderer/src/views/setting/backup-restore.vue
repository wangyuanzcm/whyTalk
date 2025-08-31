<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { NButton, NSpace, NCard, NAlert, NProgress, NList, NListItem, NThing, NIcon, NTag, NModal, NForm, NFormItem, NInput, NCheckbox, NCheckboxGroup, NUpload, NUploadDragger, NText, useMessage, NSpin, NEmpty, NPopconfirm } from 'naive-ui'
import { Download, Upload, Refresh, Delete, Save, FolderOpen, Warning, CheckOne, Time, DatabaseSetting } from '@/components/icons'
import { useSettingsStore } from '@/store'

const message = useMessage()
const settingsStore = useSettingsStore()

// 备份相关状态
const backupState = ref({
  creating: false,
  progress: 0,
  currentStep: '',
  autoBackup: true,
  backupInterval: 7, // 天
  maxBackups: 10,
  backupLocation: ''
})

// 恢复相关状态
const restoreState = ref({
  restoring: false,
  progress: 0,
  currentStep: '',
  selectedFile: null,
  backupInfo: null
})

// 备份历史
const backupHistory = ref([
  {
    id: '1',
    name: '自动备份_2024-01-15',
    date: '2024-01-15 10:30:00',
    size: '2.5 MB',
    type: 'auto',
    items: ['设置', '插件', '主题', '用户数据'],
    status: 'completed'
  },
  {
    id: '2',
    name: '手动备份_2024-01-10',
    date: '2024-01-10 15:45:00',
    size: '2.1 MB',
    type: 'manual',
    items: ['设置', '插件', '主题'],
    status: 'completed'
  }
])

// 备份选项
const backupOptions = ref({
  settings: true,
  plugins: true,
  themes: true,
  userData: true,
  cache: false
})

// 模态框状态
const showBackupModal = ref(false)
const showRestoreModal = ref(false)
const showScheduleModal = ref(false)

// 备份项目选项
const backupItemOptions = [
  { label: '应用设置', value: 'settings', description: '包括所有应用配置和偏好设置' },
  { label: '已安装插件', value: 'plugins', description: '插件文件和配置信息' },
  { label: '自定义主题', value: 'themes', description: '用户创建的主题文件' },
  { label: '用户数据', value: 'userData', description: '聊天记录、收藏等个人数据' },
  { label: '缓存文件', value: 'cache', description: '临时文件和缓存数据（不推荐）' }
]

/**
 * 创建备份
 */
const createBackup = async () => {
  if (!Object.values(backupOptions.value).some(v => v)) {
    message.warning('请至少选择一个备份项目')
    return
  }
  
  backupState.value.creating = true
  backupState.value.progress = 0
  
  try {
    const steps = [
      { name: '准备备份环境', duration: 500 },
      { name: '收集设置数据', duration: 1000 },
      { name: '打包插件文件', duration: 2000 },
      { name: '导出主题配置', duration: 800 },
      { name: '备份用户数据', duration: 1500 },
      { name: '生成备份文件', duration: 1000 }
    ]
    
    for (let i = 0; i < steps.length; i++) {
      const step = steps[i]
      backupState.value.currentStep = step.name
      
      // 模拟备份过程
      await new Promise(resolve => setTimeout(resolve, step.duration))
      
      backupState.value.progress = Math.round(((i + 1) / steps.length) * 100)
    }
    
    // 添加到备份历史
    const newBackup = {
      id: Date.now().toString(),
      name: `手动备份_${new Date().toISOString().split('T')[0]}`,
      date: new Date().toLocaleString('zh-CN'),
      size: '2.8 MB',
      type: 'manual',
      items: Object.entries(backupOptions.value)
        .filter(([_, enabled]) => enabled)
        .map(([key, _]) => backupItemOptions.find(opt => opt.value === key)?.label || key),
      status: 'completed'
    }
    
    backupHistory.value.unshift(newBackup)
    
    message.success('备份创建成功')
    showBackupModal.value = false
  } catch (error) {
    message.error('备份创建失败：' + error.message)
  } finally {
    backupState.value.creating = false
    backupState.value.progress = 0
    backupState.value.currentStep = ''
  }
}

/**
 * 下载备份文件
 */
const downloadBackup = (backup: any) => {
  // 创建模拟的备份文件
  const backupData = {
    version: '1.0.0',
    timestamp: backup.date,
    items: backup.items,
    data: {
      settings: backupOptions.value.settings ? settingsStore.$state : null,
      plugins: backupOptions.value.plugins ? [] : null,
      themes: backupOptions.value.themes ? [] : null,
      userData: backupOptions.value.userData ? {} : null
    }
  }
  
  const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${backup.name}.whybackup`
  a.click()
  URL.revokeObjectURL(url)
  
  message.success('备份文件下载成功')
}

/**
 * 删除备份
 */
const deleteBackup = (backupId: string) => {
  const index = backupHistory.value.findIndex(b => b.id === backupId)
  if (index > -1) {
    backupHistory.value.splice(index, 1)
    message.success('备份删除成功')
  }
}

/**
 * 处理文件上传
 */
const handleFileUpload = ({ file }: any) => {
  restoreState.value.selectedFile = file.file
  
  // 读取备份文件信息
  const reader = new FileReader()
  reader.onload = (e) => {
    try {
      const backupData = JSON.parse(e.target?.result as string)
      restoreState.value.backupInfo = {
        version: backupData.version,
        timestamp: backupData.timestamp,
        items: backupData.items || [],
        size: (file.file.size / 1024 / 1024).toFixed(2) + ' MB'
      }
    } catch (error) {
      message.error('无效的备份文件格式')
      restoreState.value.selectedFile = null
      restoreState.value.backupInfo = null
    }
  }
  reader.readAsText(file.file)
  
  return false // 阻止自动上传
}

/**
 * 执行恢复
 */
const executeRestore = async () => {
  if (!restoreState.value.selectedFile) {
    message.warning('请先选择备份文件')
    return
  }
  
  restoreState.value.restoring = true
  restoreState.value.progress = 0
  
  try {
    const steps = [
      { name: '验证备份文件', duration: 500 },
      { name: '解析备份数据', duration: 800 },
      { name: '恢复应用设置', duration: 1000 },
      { name: '恢复插件配置', duration: 1500 },
      { name: '恢复主题文件', duration: 800 },
      { name: '恢复用户数据', duration: 1200 },
      { name: '重新加载应用', duration: 1000 }
    ]
    
    for (let i = 0; i < steps.length; i++) {
      const step = steps[i]
      restoreState.value.currentStep = step.name
      
      // 模拟恢复过程
      await new Promise(resolve => setTimeout(resolve, step.duration))
      
      restoreState.value.progress = Math.round(((i + 1) / steps.length) * 100)
    }
    
    message.success('数据恢复成功，应用将重新启动')
    showRestoreModal.value = false
    
    // 模拟重启应用
    setTimeout(() => {
      window.location.reload()
    }, 2000)
  } catch (error) {
    message.error('数据恢复失败：' + error.message)
  } finally {
    restoreState.value.restoring = false
    restoreState.value.progress = 0
    restoreState.value.currentStep = ''
  }
}

/**
 * 保存自动备份设置
 */
const saveAutoBackupSettings = () => {
  settingsStore.setAutoBackupSettings({
    enabled: backupState.value.autoBackup,
    interval: backupState.value.backupInterval,
    maxBackups: backupState.value.maxBackups,
    location: backupState.value.backupLocation
  })
  
  message.success('自动备份设置已保存')
  showScheduleModal.value = false
}

/**
 * 选择备份位置
 */
const selectBackupLocation = async () => {
  try {
    // 这里应该调用主进程的文件夹选择API
    // const result = await window.electronAPI.selectFolder()
    // if (result) {
    //   backupState.value.backupLocation = result
    // }
    
    // 模拟选择
    backupState.value.backupLocation = 'C:\\Users\\Username\\Documents\\WhyTalk\\Backups'
    message.success('备份位置已设置')
  } catch (error) {
    message.error('选择备份位置失败')
  }
}

/**
 * 清理旧备份
 */
const cleanOldBackups = () => {
  const autoBackups = backupHistory.value.filter(b => b.type === 'auto')
  if (autoBackups.length > backupState.value.maxBackups) {
    const toDelete = autoBackups.slice(backupState.value.maxBackups)
    toDelete.forEach(backup => {
      const index = backupHistory.value.findIndex(b => b.id === backup.id)
      if (index > -1) {
        backupHistory.value.splice(index, 1)
      }
    })
    message.success(`已清理 ${toDelete.length} 个旧备份`)
  } else {
    message.info('没有需要清理的旧备份')
  }
}

// 计算属性
const totalBackupSize = computed(() => {
  const totalBytes = backupHistory.value.reduce((sum, backup) => {
    const size = parseFloat(backup.size.replace(' MB', ''))
    return sum + size
  }, 0)
  return totalBytes.toFixed(2) + ' MB'
})

const autoBackups = computed(() => backupHistory.value.filter(b => b.type === 'auto'))
const manualBackups = computed(() => backupHistory.value.filter(b => b.type === 'manual'))

onMounted(() => {
  // 加载自动备份设置
  const autoBackupSettings = settingsStore.autoBackupSettings
  if (autoBackupSettings) {
    backupState.value.autoBackup = autoBackupSettings.enabled
    backupState.value.backupInterval = autoBackupSettings.interval
    backupState.value.maxBackups = autoBackupSettings.maxBackups
    backupState.value.backupLocation = autoBackupSettings.location
  }
})
</script>

<template>
  <section>
    <h3 class="title">备份与恢复</h3>
    
    <!-- 备份概览 -->
    <NCard title="备份概览" class="section-card">
      <div class="backup-overview">
        <div class="overview-stats">
          <div class="stat-item">
            <div class="stat-value">{{ backupHistory.length }}</div>
            <div class="stat-label">总备份数</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">{{ autoBackups.length }}</div>
            <div class="stat-label">自动备份</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">{{ manualBackups.length }}</div>
            <div class="stat-label">手动备份</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">{{ totalBackupSize }}</div>
            <div class="stat-label">总大小</div>
          </div>
        </div>
        
        <div class="overview-actions">
          <NSpace>
            <NButton type="primary" @click="showBackupModal = true">
              <template #icon>
                <NIcon><Save /></NIcon>
              </template>
              创建备份
            </NButton>
            <NButton @click="showRestoreModal = true">
              <template #icon>
                <NIcon><Upload /></NIcon>
              </template>
              恢复数据
            </NButton>
            <NButton @click="showScheduleModal = true">
              <template #icon>
                <NIcon><Time /></NIcon>
              </template>
              自动备份设置
            </NButton>
            <NButton @click="cleanOldBackups">
              <template #icon>
                <NIcon><Delete /></NIcon>
              </template>
              清理旧备份
            </NButton>
          </NSpace>
        </div>
      </div>
    </NCard>

    <!-- 备份历史 -->
    <NCard title="备份历史" class="section-card">
      <div v-if="backupHistory.length === 0" class="empty-state">
        <NEmpty description="暂无备份记录">
          <template #extra>
            <NButton type="primary" @click="showBackupModal = true">
              创建第一个备份
            </NButton>
          </template>
        </NEmpty>
      </div>
      
      <NList v-else>
        <NListItem v-for="backup in backupHistory" :key="backup.id">
          <NThing>
            <template #header>
              <div class="backup-header">
                <span class="backup-name">{{ backup.name }}</span>
                <div class="backup-tags">
                  <NTag 
                    :type="backup.type === 'auto' ? 'info' : 'primary'" 
                    size="small"
                  >
                    {{ backup.type === 'auto' ? '自动' : '手动' }}
                  </NTag>
                  <NTag 
                    :type="backup.status === 'completed' ? 'success' : 'warning'" 
                    size="small"
                  >
                    {{ backup.status === 'completed' ? '完成' : '进行中' }}
                  </NTag>
                </div>
              </div>
            </template>
            
            <template #description>
              <div class="backup-info">
                <div class="backup-meta">
                  <span><NIcon><Time /></NIcon> {{ backup.date }}</span>
                  <span><NIcon><DatabaseSetting /></NIcon> {{ backup.size }}</span>
                </div>
                <div class="backup-items">
                  <span>包含：</span>
                  <NTag 
                    v-for="item in backup.items" 
                    :key="item"
                    size="small"
                    style="margin-right: 4px"
                  >
                    {{ item }}
                  </NTag>
                </div>
              </div>
            </template>
            
            <template #action>
              <NSpace>
                <NButton size="small" @click="downloadBackup(backup)">
                  <template #icon>
                    <NIcon><Download /></NIcon>
                  </template>
                  下载
                </NButton>
                <NPopconfirm 
                  @positive-click="deleteBackup(backup.id)"
                  negative-text="取消"
                  positive-text="删除"
                >
                  <template #trigger>
                    <NButton size="small" type="error">
                      <template #icon>
                        <NIcon><Delete /></NIcon>
                      </template>
                      删除
                    </NButton>
                  </template>
                  确定要删除这个备份吗？此操作不可撤销。
                </NPopconfirm>
              </NSpace>
            </template>
          </NThing>
        </NListItem>
      </NList>
    </NCard>

    <!-- 创建备份模态框 -->
    <NModal v-model:show="showBackupModal" preset="card" title="创建备份" style="width: 600px">
      <div v-if="!backupState.creating">
        <NAlert type="info" style="margin-bottom: 16px">
          选择要备份的数据类型。建议定期备份以防数据丢失。
        </NAlert>
        
        <NForm>
          <NFormItem label="备份内容">
            <div class="backup-options">
              <div 
                v-for="option in backupItemOptions" 
                :key="option.value"
                class="backup-option"
              >
                <NCheckbox 
                  v-model:checked="backupOptions[option.value]"
                  :label="option.label"
                />
                <div class="option-description">{{ option.description }}</div>
              </div>
            </div>
          </NFormItem>
          
          <NFormItem>
            <NSpace>
              <NButton 
                type="primary" 
                @click="createBackup"
                :disabled="!Object.values(backupOptions).some(v => v)"
              >
                开始备份
              </NButton>
              <NButton @click="showBackupModal = false">取消</NButton>
            </NSpace>
          </NFormItem>
        </NForm>
      </div>
      
      <div v-else class="backup-progress">
        <div class="progress-info">
          <h4>正在创建备份...</h4>
          <p>{{ backupState.currentStep }}</p>
        </div>
        <NProgress 
          type="line" 
          :percentage="backupState.progress"
          :show-indicator="true"
          processing
        />
      </div>
    </NModal>

    <!-- 恢复数据模态框 -->
    <NModal v-model:show="showRestoreModal" preset="card" title="恢复数据" style="width: 600px">
      <div v-if="!restoreState.restoring">
        <NAlert type="warning" style="margin-bottom: 16px">
          <template #icon>
            <NIcon><Warning /></NIcon>
          </template>
          恢复数据将覆盖当前设置，请确保已备份当前数据。
        </NAlert>
        
        <div class="restore-upload">
          <NUpload 
            :custom-request="handleFileUpload"
            accept=".whybackup,.json"
            :show-file-list="false"
          >
            <NUploadDragger>
              <div class="upload-content">
                <NIcon size="48" :depth="3">
                  <Upload />
                </NIcon>
                <NText>点击或拖拽备份文件到此区域</NText>
                <NText depth="3">支持 .whybackup 和 .json 格式</NText>
              </div>
            </NUploadDragger>
          </NUpload>
        </div>
        
        <div v-if="restoreState.backupInfo" class="backup-info-card">
          <h4>备份文件信息</h4>
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">版本：</span>
              <span class="info-value">{{ restoreState.backupInfo.version }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">创建时间：</span>
              <span class="info-value">{{ restoreState.backupInfo.timestamp }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">文件大小：</span>
              <span class="info-value">{{ restoreState.backupInfo.size }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">包含内容：</span>
              <div class="info-tags">
                <NTag 
                  v-for="item in restoreState.backupInfo.items" 
                  :key="item"
                  size="small"
                >
                  {{ item }}
                </NTag>
              </div>
            </div>
          </div>
        </div>
        
        <div class="restore-actions">
          <NSpace>
            <NButton 
              type="primary" 
              @click="executeRestore"
              :disabled="!restoreState.selectedFile"
            >
              开始恢复
            </NButton>
            <NButton @click="showRestoreModal = false">取消</NButton>
          </NSpace>
        </div>
      </div>
      
      <div v-else class="restore-progress">
        <div class="progress-info">
          <h4>正在恢复数据...</h4>
          <p>{{ restoreState.currentStep }}</p>
        </div>
        <NProgress 
          type="line" 
          :percentage="restoreState.progress"
          :show-indicator="true"
          processing
        />
      </div>
    </NModal>

    <!-- 自动备份设置模态框 -->
    <NModal v-model:show="showScheduleModal" preset="card" title="自动备份设置" style="width: 500px">
      <NForm>
        <NFormItem>
          <div class="auto-backup-enable">
            <NSwitch v-model:value="backupState.autoBackup" />
            <span>启用自动备份</span>
          </div>
        </NFormItem>
        
        <template v-if="backupState.autoBackup">
          <NFormItem label="备份间隔">
            <div class="interval-input">
              <NInputNumber 
                v-model:value="backupState.backupInterval" 
                :min="1" 
                :max="30"
                style="width: 120px"
              />
              <span>天</span>
            </div>
          </NFormItem>
          
          <NFormItem label="最大备份数">
            <NInputNumber 
              v-model:value="backupState.maxBackups" 
              :min="1" 
              :max="50"
              style="width: 120px"
            />
          </NFormItem>
          
          <NFormItem label="备份位置">
            <div class="location-input">
              <NInput 
                v-model:value="backupState.backupLocation" 
                placeholder="选择备份保存位置"
                readonly
                style="flex: 1"
              />
              <NButton @click="selectBackupLocation">
                <template #icon>
                  <NIcon><FolderOpen /></NIcon>
                </template>
                浏览
              </NButton>
            </div>
          </NFormItem>
        </template>
        
        <NFormItem>
          <NSpace>
            <NButton type="primary" @click="saveAutoBackupSettings">
              保存设置
            </NButton>
            <NButton @click="showScheduleModal = false">取消</NButton>
          </NSpace>
        </NFormItem>
      </NForm>
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

// 备份概览样式
.backup-overview {
  .overview-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: var(--spacing-lg);
    margin-bottom: var(--spacing-xl);
    
    .stat-item {
      text-align: center;
      padding: var(--spacing-md);
      border: 1px solid var(--color-border-light);
      border-radius: var(--border-radius-md);
      
      .stat-value {
        font-size: var(--font-size-xxl);
        font-weight: var(--font-weight-bold);
        color: var(--color-primary);
        line-height: 1;
      }
      
      .stat-label {
        font-size: var(--font-size-sm);
        color: var(--color-text-secondary);
        margin-top: var(--spacing-xs);
      }
    }
  }
  
  .overview-actions {
    .flex-row();
    justify-content: center;
  }
}

// 备份历史样式
.backup-header {
  .flex-row();
  justify-content: space-between;
  align-items: center;
  width: 100%;
  
  .backup-name {
    font-weight: var(--font-weight-semibold);
    font-size: var(--font-size-md);
  }
  
  .backup-tags {
    .flex-row();
    gap: var(--spacing-xs);
  }
}

.backup-info {
  .flex-column();
  gap: var(--spacing-sm);
  
  .backup-meta {
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
  
  .backup-items {
    .flex-row();
    align-items: center;
    gap: var(--spacing-xs);
    font-size: var(--font-size-sm);
    
    span {
      color: var(--color-text-secondary);
    }
  }
}

// 备份选项样式
.backup-options {
  .flex-column();
  gap: var(--spacing-md);
  
  .backup-option {
    .flex-column();
    gap: var(--spacing-xs);
    
    .option-description {
      font-size: var(--font-size-sm);
      color: var(--color-text-secondary);
      margin-left: var(--spacing-lg);
    }
  }
}

// 进度样式
.backup-progress,
.restore-progress {
  text-align: center;
  
  .progress-info {
    margin-bottom: var(--spacing-lg);
    
    h4 {
      margin: 0 0 var(--spacing-sm) 0;
      font-size: var(--font-size-lg);
      color: var(--color-text-primary);
    }
    
    p {
      margin: 0;
      color: var(--color-text-secondary);
      font-size: var(--font-size-sm);
    }
  }
}

// 恢复相关样式
.restore-upload {
  margin-bottom: var(--spacing-lg);
  
  .upload-content {
    .flex-column();
    align-items: center;
    gap: var(--spacing-sm);
    padding: var(--spacing-xl);
  }
}

.backup-info-card {
  margin-bottom: var(--spacing-lg);
  padding: var(--spacing-md);
  border: 1px solid var(--color-border-light);
  border-radius: var(--border-radius-md);
  background: var(--color-bg-secondary);
  
  h4 {
    margin: 0 0 var(--spacing-md) 0;
    font-size: var(--font-size-md);
    color: var(--color-text-primary);
  }
  
  .info-grid {
    .flex-column();
    gap: var(--spacing-sm);
    
    .info-item {
      .flex-row();
      align-items: center;
      gap: var(--spacing-sm);
      
      .info-label {
        font-weight: var(--font-weight-medium);
        color: var(--color-text-secondary);
        min-width: 80px;
      }
      
      .info-value {
        color: var(--color-text-primary);
      }
      
      .info-tags {
        .flex-row();
        gap: var(--spacing-xs);
        flex-wrap: wrap;
      }
    }
  }
}

.restore-actions {
  .flex-row();
  justify-content: center;
}

// 自动备份设置样式
.auto-backup-enable {
  .flex-row();
  align-items: center;
  gap: var(--spacing-sm);
}

.interval-input {
  .flex-row();
  align-items: center;
  gap: var(--spacing-sm);
}

.location-input {
  .flex-row();
  gap: var(--spacing-sm);
}

.empty-state {
  text-align: center;
  padding: var(--spacing-xl);
}

// 响应式设计
.mobile-only() {
  .overview-stats {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .backup-header {
    .flex-column();
    align-items: flex-start !important;
    gap: var(--spacing-xs);
  }
  
  .backup-meta {
    .flex-column();
    align-items: flex-start !important;
  }
  
  .location-input {
    .flex-column();
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
  
  .stat-item {
    border-color: var(--color-border-dark) !important;
    
    .stat-value {
      color: var(--color-primary-dark) !important;
    }
    
    .stat-label {
      color: var(--color-text-secondary-dark) !important;
    }
  }
  
  .backup-name {
    color: var(--color-text-primary-dark) !important;
  }
  
  .backup-meta {
    color: var(--color-text-secondary-dark) !important;
  }
  
  .backup-info-card {
    border-color: var(--color-border-dark) !important;
    background: var(--color-bg-secondary-dark) !important;
    
    h4 {
      color: var(--color-text-primary-dark) !important;
    }
    
    .info-label {
      color: var(--color-text-secondary-dark) !important;
    }
    
    .info-value {
      color: var(--color-text-primary-dark) !important;
    }
  }
}
</style>