<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { NCard, NSpace, NButton, NTag, NProgress, NAlert, NModal, NForm, NFormItem, NInput, NSwitch, useMessage, NUpload, NUploadDragger, NText, NIcon, NDivider, NList, NListItem, NThing } from 'naive-ui'
import { Download, Upload, FolderDownload, Refresh, CheckOne, CloseOne, DatabaseSetting, CloudSync, SettingTwo } from '@/components/icons'
import { useSettingsStore } from '@/store'

const message = useMessage()
const settingsStore = useSettingsStore()

// 备份恢复相关状态
const backupLoading = ref(false)
const restoreLoading = ref(false)
const showRestoreModal = ref(false)
const backupHistory = ref([
  {
    id: '1',
    name: '自动备份_2024-01-15',
    size: '2.3MB',
    date: '2024-01-15 10:30:00',
    type: 'auto'
  },
  {
    id: '2', 
    name: '手动备份_2024-01-10',
    size: '2.1MB',
    date: '2024-01-10 15:45:00',
    type: 'manual'
  }
])

// 应用更新相关状态
const updateLoading = ref(false)
const updateAvailable = ref(false)
const currentVersion = ref('1.0.0')
const latestVersion = ref('1.0.1')
const updateProgress = ref(0)
const isUpdating = ref(false)
const autoUpdate = ref(true)
const updateChannel = ref('stable')

// 备份配置
const backupConfig = ref({
  autoBackup: true,
  backupInterval: 7, // 天
  maxBackups: 10,
  includePlugins: true,
  includeThemes: true,
  includeSettings: true
})

/**
 * 创建备份
 */
const createBackup = async () => {
  backupLoading.value = true
  try {
    // 模拟备份过程
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const newBackup = {
      id: Date.now().toString(),
      name: `手动备份_${new Date().toISOString().split('T')[0]}`,
      size: '2.5MB',
      date: new Date().toLocaleString(),
      type: 'manual'
    }
    
    backupHistory.value.unshift(newBackup)
    message.success('备份创建成功')
  } catch (error: any) {
    message.error(`备份失败: ${error.message}`)
  } finally {
    backupLoading.value = false
  }
}

/**
 * 恢复备份
 */
const restoreBackup = async (backupId: string) => {
  restoreLoading.value = true
  try {
    // 模拟恢复过程
    await new Promise(resolve => setTimeout(resolve, 3000))
    message.success('配置恢复成功，请重启应用')
    showRestoreModal.value = false
  } catch (error: any) {
    message.error(`恢复失败: ${error.message}`)
  } finally {
    restoreLoading.value = false
  }
}

/**
 * 删除备份
 */
const deleteBackup = (backupId: string) => {
  const index = backupHistory.value.findIndex(b => b.id === backupId)
  if (index > -1) {
    backupHistory.value.splice(index, 1)
    message.success('备份已删除')
  }
}

/**
 * 检查更新
 */
const checkUpdate = async () => {
  updateLoading.value = true
  try {
    // 模拟检查更新
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // 模拟有更新可用
    updateAvailable.value = true
    latestVersion.value = '1.0.1'
    message.success('发现新版本可用')
  } catch (error: any) {
    message.error(`检查更新失败: ${error.message}`)
  } finally {
    updateLoading.value = false
  }
}

/**
 * 开始更新
 */
const startUpdate = async () => {
  isUpdating.value = true
  updateProgress.value = 0
  
  try {
    // 模拟下载进度
    for (let i = 0; i <= 100; i += 10) {
      updateProgress.value = i
      await new Promise(resolve => setTimeout(resolve, 200))
    }
    
    message.success('更新下载完成，应用将重启')
    // 这里应该触发应用重启
  } catch (error: any) {
    message.error(`更新失败: ${error.message}`)
  } finally {
    isUpdating.value = false
    updateProgress.value = 0
  }
}

/**
 * 保存备份配置
 */
const saveBackupConfig = () => {
  // 保存到设置存储
  message.success('备份配置已保存')
}

/**
 * 保存更新配置
 */
const saveUpdateConfig = () => {
  // 保存到设置存储
  message.success('更新配置已保存')
}

/**
 * 导出配置
 */
const exportConfig = () => {
  const config = {
    version: currentVersion.value,
    settings: settingsStore.getAllSettings(),
    timestamp: new Date().toISOString()
  }
  
  const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `why-talk-config-${new Date().toISOString().split('T')[0]}.json`
  a.click()
  URL.revokeObjectURL(url)
  
  message.success('配置导出成功')
}

/**
 * 导入配置文件处理
 */
const handleConfigImport = ({ file }: { file: File }) => {
  const reader = new FileReader()
  reader.onload = (e) => {
    try {
      const config = JSON.parse(e.target?.result as string)
      // 这里应该验证配置格式并应用
      message.success('配置导入成功')
    } catch (error) {
      message.error('配置文件格式错误')
    }
  }
  reader.readAsText(file)
  return false // 阻止默认上传行为
}

onMounted(() => {
  // 初始化时检查更新
  if (autoUpdate.value) {
    checkUpdate()
  }
})
</script>

<template>
  <div class="system-maintenance">
    <NSpace vertical :size="24">
      <!-- 备份恢复部分 -->
      <NCard title="备份与恢复" :bordered="false">
        <template #header-extra>
          <NIcon size="20" color="var(--primary-color)">
            <DatabaseSetting />
          </NIcon>
        </template>
        
        <NSpace vertical :size="16">
          <!-- 快速操作 -->
          <NSpace>
            <NButton 
              type="primary" 
              :loading="backupLoading"
              @click="createBackup"
            >
              <template #icon>
                <NIcon><FolderDownload /></NIcon>
              </template>
              创建备份
            </NButton>
            
            <NButton @click="exportConfig">
              <template #icon>
                <NIcon><Download /></NIcon>
              </template>
              导出配置
            </NButton>
            
            <NUpload
              :show-file-list="false"
              accept=".json"
              :custom-request="handleConfigImport"
            >
              <NButton>
                <template #icon>
                  <NIcon><Upload /></NIcon>
                </template>
                导入配置
              </NButton>
            </NUpload>
          </NSpace>
          
          <!-- 备份配置 -->
          <NCard size="small" title="备份配置">
            <NSpace vertical :size="12">
              <div class="config-item">
                <span>自动备份</span>
                <NSwitch v-model:value="backupConfig.autoBackup" @update:value="saveBackupConfig" />
              </div>
              
              <div class="config-item" v-if="backupConfig.autoBackup">
                <span>备份间隔（天）</span>
                <NInput 
                  v-model:value="backupConfig.backupInterval" 
                  type="number" 
                  style="width: 80px"
                  @blur="saveBackupConfig"
                />
              </div>
              
              <div class="config-item">
                <span>最大备份数</span>
                <NInput 
                  v-model:value="backupConfig.maxBackups" 
                  type="number" 
                  style="width: 80px"
                  @blur="saveBackupConfig"
                />
              </div>
              
              <div class="config-item">
                <span>包含插件数据</span>
                <NSwitch v-model:value="backupConfig.includePlugins" @update:value="saveBackupConfig" />
              </div>
              
              <div class="config-item">
                <span>包含主题数据</span>
                <NSwitch v-model:value="backupConfig.includeThemes" @update:value="saveBackupConfig" />
              </div>
            </NSpace>
          </NCard>
          
          <!-- 备份历史 -->
          <NCard size="small" title="备份历史">
            <NList>
              <NListItem v-for="backup in backupHistory" :key="backup.id">
                <NThing>
                  <template #header>
                    <NSpace align="center">
                      <span>{{ backup.name }}</span>
                      <NTag :type="backup.type === 'auto' ? 'info' : 'success'" size="small">
                        {{ backup.type === 'auto' ? '自动' : '手动' }}
                      </NTag>
                    </NSpace>
                  </template>
                  
                  <template #description>
                    <NSpace>
                      <span>大小: {{ backup.size }}</span>
                      <span>时间: {{ backup.date }}</span>
                    </NSpace>
                  </template>
                  
                  <template #action>
                    <NSpace>
                      <NButton 
                        size="small" 
                        type="primary"
                        :loading="restoreLoading"
                        @click="restoreBackup(backup.id)"
                      >
                        恢复
                      </NButton>
                      <NButton 
                        size="small" 
                        type="error"
                        @click="deleteBackup(backup.id)"
                      >
                        删除
                      </NButton>
                    </NSpace>
                  </template>
                </NThing>
              </NListItem>
            </NList>
          </NCard>
        </NSpace>
      </NCard>
      
      <NDivider />
      
      <!-- 应用更新部分 -->
      <NCard title="应用更新" :bordered="false">
        <template #header-extra>
          <NIcon size="20" color="var(--primary-color)">
            <Download />
          </NIcon>
        </template>
        
        <NSpace vertical :size="16">
          <!-- 版本信息 -->
          <NCard size="small" title="版本信息">
            <NSpace vertical :size="12">
              <div class="version-info">
                <span>当前版本：</span>
                <NTag type="info">v{{ currentVersion }}</NTag>
              </div>
              
              <div class="version-info" v-if="updateAvailable">
                <span>最新版本：</span>
                <NTag type="success">v{{ latestVersion }}</NTag>
              </div>
              
              <NAlert v-if="updateAvailable" type="info" title="发现新版本">
                新版本 v{{ latestVersion }} 已发布，建议及时更新以获得最新功能和安全修复。
              </NAlert>
              
              <NAlert v-else type="success" title="已是最新版本">
                您当前使用的是最新版本。
              </NAlert>
            </NSpace>
          </NCard>
          
          <!-- 更新操作 -->
          <NSpace>
            <NButton 
              type="primary" 
              :loading="updateLoading"
              @click="checkUpdate"
            >
              <template #icon>
                <NIcon><Refresh /></NIcon>
              </template>
              检查更新
            </NButton>
            
            <NButton 
              v-if="updateAvailable"
              type="success"
              :loading="isUpdating"
              :disabled="isUpdating"
              @click="startUpdate"
            >
              <template #icon>
                <NIcon><Download /></NIcon>
              </template>
              立即更新
            </NButton>
          </NSpace>
          
          <!-- 更新进度 -->
          <div v-if="isUpdating">
            <NText>正在下载更新...</NText>
            <NProgress 
              type="line" 
              :percentage="updateProgress" 
              :show-indicator="true"
              status="success"
            />
          </div>
          
          <!-- 更新配置 -->
          <NCard size="small" title="更新配置">
            <NSpace vertical :size="12">
              <div class="config-item">
                <span>自动检查更新</span>
                <NSwitch v-model:value="autoUpdate" @update:value="saveUpdateConfig" />
              </div>
              
              <div class="config-item">
                <span>更新通道</span>
                <NSpace>
                  <NButton 
                    :type="updateChannel === 'stable' ? 'primary' : 'default'"
                    size="small"
                    @click="updateChannel = 'stable'; saveUpdateConfig()"
                  >
                    稳定版
                  </NButton>
                  <NButton 
                    :type="updateChannel === 'beta' ? 'primary' : 'default'"
                    size="small"
                    @click="updateChannel = 'beta'; saveUpdateConfig()"
                  >
                    测试版
                  </NButton>
                </NSpace>
              </div>
            </NSpace>
          </NCard>
        </NSpace>
      </NCard>
    </NSpace>
  </div>
</template>

<style lang="less" scoped>
.system-maintenance {
  padding: 24px;
  
  .config-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;
  }
  
  .version-info {
    display: flex;
    align-items: center;
    gap: 8px;
  }
}
</style>