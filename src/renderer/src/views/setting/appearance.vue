<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { NButton, NSpace, NTag, NEmpty, NSpin, useMessage, NInput, NCard, NList, NListItem, NThing, NIcon, NModal, NForm, NFormItem, NColorPicker, NUpload, NUploadDragger, NText, NSlider, NSwitch, NSelect, NDivider, NRadioGroup, NRadio } from 'naive-ui'
import { Theme, Download, Delete, Edit, Add, Upload, PreviewOpen, Moon, Sun, Monitor, Tool, SettingTwo } from '@/components/icons'
import { useSettingsStore } from '@/store'

const message = useMessage()
const settingsStore = useSettingsStore()

// 主题相关状态
const themes = ref([
  {
    id: 'light',
    name: '浅色主题',
    type: 'builtin',
    preview: {
      primary: '#1890ff',
      background: '#ffffff',
      surface: '#f5f5f5',
      text: '#000000'
    },
    config: {
      mode: 'light',
      colors: {
        primary: '#1890ff',
        success: '#52c41a',
        warning: '#faad14',
        error: '#ff4d4f',
        info: '#1890ff'
      }
    }
  },
  {
    id: 'dark',
    name: '深色主题',
    type: 'builtin',
    preview: {
      primary: '#1890ff',
      background: '#141414',
      surface: '#1f1f1f',
      text: '#ffffff'
    },
    config: {
      mode: 'dark',
      colors: {
        primary: '#1890ff',
        success: '#52c41a',
        warning: '#faad14',
        error: '#ff4d4f',
        info: '#1890ff'
      }
    }
  },
  {
    id: 'auto',
    name: '跟随系统',
    type: 'builtin',
    preview: {
      primary: '#1890ff',
      background: 'linear-gradient(45deg, #ffffff 50%, #141414 50%)',
      surface: '#f5f5f5',
      text: '#666666'
    },
    config: {
      mode: 'auto',
      colors: {
        primary: '#1890ff',
        success: '#52c41a',
        warning: '#faad14',
        error: '#ff4d4f',
        info: '#1890ff'
      }
    }
  }
])

// 个性化设置状态
const personalizeSettings = ref({
  // 界面设置
  fontSize: 14,
  fontFamily: 'system',
  borderRadius: 6,
  compactMode: false,
  showAnimations: true,
  
  // 窗口设置
  windowOpacity: 100,
  alwaysOnTop: false,
  minimizeToTray: true,
  startMinimized: false,
  
  // 语言设置
  language: 'zh-CN',
  dateFormat: 'YYYY-MM-DD',
  timeFormat: '24h',
  
  // 快捷键设置
  shortcuts: {
    toggleWindow: 'Ctrl+Shift+W',
    quickSearch: 'Ctrl+K',
    newNote: 'Ctrl+N'
  }
})

const currentTheme = computed({
  get: () => settingsStore.themeMode,
  set: (value: string) => {
    settingsStore.setThemeMode(value)
    message.success(`已切换到${getThemeName(value)}主题`)
  }
})

// 主题编辑相关
const showThemeEditor = ref(false)
const editingTheme = ref(null)
const isCreatingTheme = ref(false)

const newTheme = ref({
  name: '',
  colors: {
    primary: '#1890ff',
    success: '#52c41a',
    warning: '#faad14',
    error: '#ff4d4f',
    info: '#1890ff'
  },
  background: '#ffffff',
  surface: '#f5f5f5',
  text: '#000000'
})

// 主题导入导出
const showImportModal = ref(false)
const importData = ref('')

// 字体选项
const fontOptions = [
  { label: '系统默认', value: 'system' },
  { label: '微软雅黑', value: 'Microsoft YaHei' },
  { label: '苹方', value: 'PingFang SC' },
  { label: 'Helvetica', value: 'Helvetica' },
  { label: 'Arial', value: 'Arial' }
]

// 语言选项
const languageOptions = [
  { label: '简体中文', value: 'zh-CN' },
  { label: '繁体中文', value: 'zh-TW' },
  { label: 'English', value: 'en-US' },
  { label: '日本語', value: 'ja-JP' }
]

/**
 * 获取主题名称
 */
const getThemeName = (themeId: string) => {
  const theme = themes.value.find(t => t.id === themeId)
  return theme?.name || themeId
}

/**
 * 应用主题
 */
const applyTheme = (themeId: string) => {
  currentTheme.value = themeId
}

/**
 * 创建新主题
 */
const createTheme = () => {
  isCreatingTheme.value = true
  editingTheme.value = null
  newTheme.value = {
    name: '',
    colors: {
      primary: '#1890ff',
      success: '#52c41a',
      warning: '#faad14',
      error: '#ff4d4f',
      info: '#1890ff'
    },
    background: '#ffffff',
    surface: '#f5f5f5',
    text: '#000000'
  }
  showThemeEditor.value = true
}

/**
 * 编辑主题
 */
const editTheme = (theme: any) => {
  if (theme.type === 'builtin') {
    message.warning('内置主题无法编辑，请复制后修改')
    return
  }
  
  isCreatingTheme.value = false
  editingTheme.value = theme
  newTheme.value = {
    name: theme.name,
    colors: { ...theme.config.colors },
    background: theme.preview.background,
    surface: theme.preview.surface,
    text: theme.preview.text
  }
  showThemeEditor.value = true
}

/**
 * 保存主题
 */
const saveTheme = () => {
  if (!newTheme.value.name.trim()) {
    message.error('请输入主题名称')
    return
  }
  
  const themeData = {
    id: isCreatingTheme.value ? `custom_${Date.now()}` : editingTheme.value.id,
    name: newTheme.value.name,
    type: 'custom',
    preview: {
      primary: newTheme.value.colors.primary,
      background: newTheme.value.background,
      surface: newTheme.value.surface,
      text: newTheme.value.text
    },
    config: {
      mode: newTheme.value.background === '#ffffff' ? 'light' : 'dark',
      colors: { ...newTheme.value.colors }
    }
  }
  
  if (isCreatingTheme.value) {
    themes.value.push(themeData)
    message.success('主题创建成功')
  } else {
    const index = themes.value.findIndex(t => t.id === editingTheme.value.id)
    if (index > -1) {
      themes.value[index] = themeData
      message.success('主题更新成功')
    }
  }
  
  showThemeEditor.value = false
}

/**
 * 删除主题
 */
const deleteTheme = (theme: any) => {
  if (theme.type === 'builtin') {
    message.warning('内置主题无法删除')
    return
  }
  
  const index = themes.value.findIndex(t => t.id === theme.id)
  if (index > -1) {
    themes.value.splice(index, 1)
    message.success('主题删除成功')
  }
}

/**
 * 导出主题
 */
const exportTheme = (theme: any) => {
  const exportData = {
    version: '1.0',
    theme: {
      name: theme.name,
      preview: theme.preview,
      config: theme.config
    }
  }
  
  const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${theme.name}.whytheme`
  a.click()
  URL.revokeObjectURL(url)
  
  message.success('主题导出成功')
}

/**
 * 导入主题
 */
const importTheme = () => {
  try {
    const data = JSON.parse(importData.value)
    
    if (!data.theme || !data.theme.name) {
      throw new Error('无效的主题文件格式')
    }
    
    const importedTheme = {
      id: `imported_${Date.now()}`,
      name: data.theme.name,
      type: 'custom',
      preview: data.theme.preview,
      config: data.theme.config
    }
    
    themes.value.push(importedTheme)
    message.success('主题导入成功')
    showImportModal.value = false
    importData.value = ''
  } catch (error: any) {
    message.error(`导入失败: ${error.message}`)
  }
}

/**
 * 保存个性化设置
 */
const savePersonalizeSettings = () => {
  // 保存到设置存储
  settingsStore.updateSettings('personalize', personalizeSettings.value)
  message.success('个性化设置已保存')
}

/**
 * 重置个性化设置
 */
const resetPersonalizeSettings = () => {
  personalizeSettings.value = {
    fontSize: 14,
    fontFamily: 'system',
    borderRadius: 6,
    compactMode: false,
    showAnimations: true,
    windowOpacity: 100,
    alwaysOnTop: false,
    minimizeToTray: true,
    startMinimized: false,
    language: 'zh-CN',
    dateFormat: 'YYYY-MM-DD',
    timeFormat: '24h',
    shortcuts: {
      toggleWindow: 'Ctrl+Shift+W',
      quickSearch: 'Ctrl+K',
      newNote: 'Ctrl+N'
    }
  }
  savePersonalizeSettings()
  message.success('已重置为默认设置')
}

/**
 * 应用字体大小
 */
const applyFontSize = () => {
  document.documentElement.style.fontSize = `${personalizeSettings.value.fontSize}px`
  savePersonalizeSettings()
}

/**
 * 应用窗口透明度
 */
const applyWindowOpacity = () => {
  // 这里应该调用 Electron API 设置窗口透明度
  savePersonalizeSettings()
}

onMounted(() => {
  // 组件挂载时的初始化
  // currentTheme计算属性已经自动同步settingsStore.themeMode
  // personalizeSettings已经包含了合理的默认值
  console.log('外观设置页面已加载，当前主题:', settingsStore.themeMode)
})
</script>

<template>
  <div class="appearance-settings">
    <NSpace vertical :size="24">
      <!-- 主题设置部分 -->
      <NCard title="主题设置" :bordered="false">
        <template #header-extra>
          <NIcon size="20" color="var(--primary-color)">
            <Theme />
          </NIcon>
        </template>
        
        <NSpace vertical :size="16">
          <!-- 主题选择 -->
          <div class="theme-grid">
            <div 
              v-for="theme in themes" 
              :key="theme.id"
              class="theme-card"
              :class="{ active: currentTheme === theme.id }"
              @click="applyTheme(theme.id)"
            >
              <div class="theme-preview" :style="{ background: theme.preview.background }">
                <div class="preview-header" :style="{ backgroundColor: theme.preview.primary }">
                  <div class="preview-buttons">
                    <span class="btn btn-close"></span>
                    <span class="btn btn-min"></span>
                    <span class="btn btn-max"></span>
                  </div>
                </div>
                <div class="preview-content" :style="{ backgroundColor: theme.preview.surface, color: theme.preview.text }">
                  <div class="preview-text">Aa</div>
                </div>
              </div>
              
              <div class="theme-info">
                <div class="theme-name">{{ theme.name }}</div>
                <div class="theme-actions" v-if="theme.type === 'custom'">
                  <NButton size="tiny" @click.stop="editTheme(theme)">
                    <template #icon><NIcon><Edit /></NIcon></template>
                  </NButton>
                  <NButton size="tiny" @click.stop="exportTheme(theme)">
                    <template #icon><NIcon><Download /></NIcon></template>
                  </NButton>
                  <NButton size="tiny" type="error" @click.stop="deleteTheme(theme)">
                    <template #icon><NIcon><Delete /></NIcon></template>
                  </NButton>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 主题操作 -->
          <NSpace>
            <NButton type="primary" @click="createTheme">
              <template #icon><NIcon><Add /></NIcon></template>
              创建主题
            </NButton>
            
            <NButton @click="showImportModal = true">
              <template #icon><NIcon><Upload /></NIcon></template>
              导入主题
            </NButton>
          </NSpace>
        </NSpace>
      </NCard>
      
      <NDivider />
      
      <!-- 个性化设置部分 -->
      <NCard title="个性化设置" :bordered="false">
        <template #header-extra>
          <NIcon size="20" color="var(--primary-color)">
            <Tool />
          </NIcon>
        </template>
        
        <NSpace vertical :size="20">
          <!-- 界面设置 -->
          <NCard size="small" title="界面设置">
            <NSpace vertical :size="16">
              <div class="setting-row">
                <div class="setting-item">
                  <div class="setting-label">
                    <span>字体大小</span>
                    <span class="setting-value">{{ personalizeSettings.fontSize }}px</span>
                  </div>
                  <NSlider 
                    v-model:value="personalizeSettings.fontSize" 
                    :min="12" 
                    :max="20" 
                    :step="1"
                    @update:value="applyFontSize"
                  />
                </div>
                
                <div class="setting-item">
                  <span class="setting-label">字体</span>
                  <NSelect 
                    v-model:value="personalizeSettings.fontFamily" 
                    :options="fontOptions"
                    style="width: 200px"
                    @update:value="savePersonalizeSettings"
                  />
                </div>
              </div>
              
              <div class="setting-row">
                <div class="setting-item">
                  <div class="setting-label">
                    <span>圆角大小</span>
                    <span class="setting-value">{{ personalizeSettings.borderRadius }}px</span>
                  </div>
                  <NSlider 
                    v-model:value="personalizeSettings.borderRadius" 
                    :min="0" 
                    :max="12" 
                    :step="1"
                    @update:value="savePersonalizeSettings"
                  />
                </div>
                
                <div class="setting-item">
                  <span class="setting-label">紧凑模式</span>
                  <NSwitch 
                    v-model:value="personalizeSettings.compactMode" 
                    @update:value="savePersonalizeSettings"
                />
              </div>
              
              <div class="setting-item">
                <span class="setting-label">显示动画</span>
                <NSwitch 
                  v-model:value="personalizeSettings.showAnimations" 
                  @update:value="savePersonalizeSettings"
                />
              </div>
            </NSpace>
          </NCard>
          
          <!-- 窗口设置 -->
          <NCard size="small" title="窗口设置">
            <NSpace vertical :size="16">
              <div class="setting-item">
                <div class="setting-label">
                  <span>窗口透明度</span>
                  <span class="setting-value">{{ personalizeSettings.windowOpacity }}%</span>
                </div>
                <NSlider 
                  v-model:value="personalizeSettings.windowOpacity" 
                  :min="60" 
                  :max="100" 
                  :step="5"
                  @update:value="applyWindowOpacity"
                />
              </div>
              
              <div class="setting-item">
                <span class="setting-label">总是置顶</span>
                <NSwitch 
                  v-model:value="personalizeSettings.alwaysOnTop" 
                  @update:value="savePersonalizeSettings"
                />
              </div>
              
              <div class="setting-item">
                <span class="setting-label">最小化到托盘</span>
                <NSwitch 
                  v-model:value="personalizeSettings.minimizeToTray" 
                  @update:value="savePersonalizeSettings"
                />
              </div>
              
              <div class="setting-item">
                <span class="setting-label">启动时最小化</span>
                <NSwitch 
                  v-model:value="personalizeSettings.startMinimized" 
                  @update:value="savePersonalizeSettings"
                />
              </div>
            </NSpace>
          </NCard>
          
          <!-- 语言和格式 -->
          <NCard size="small" title="语言和格式">
            <NSpace vertical :size="16">
              <div class="setting-item">
                <span class="setting-label">界面语言</span>
                <NSelect 
                  v-model:value="personalizeSettings.language" 
                  :options="languageOptions"
                  style="width: 200px"
                  @update:value="savePersonalizeSettings"
                />
              </div>
              
              <div class="setting-item">
                <span class="setting-label">日期格式</span>
                <NRadioGroup 
                  v-model:value="personalizeSettings.dateFormat" 
                  @update:value="savePersonalizeSettings"
                >
                  <NRadio value="YYYY-MM-DD">2024-01-15</NRadio>
                  <NRadio value="MM/DD/YYYY">01/15/2024</NRadio>
                  <NRadio value="DD/MM/YYYY">15/01/2024</NRadio>
                </NRadioGroup>
              </div>
              
              <div class="setting-item">
                <span class="setting-label">时间格式</span>
                <NRadioGroup 
                  v-model:value="personalizeSettings.timeFormat" 
                  @update:value="savePersonalizeSettings"
                >
                  <NRadio value="24h">24小时制</NRadio>
                  <NRadio value="12h">12小时制</NRadio>
                </NRadioGroup>
              </div>
            </NSpace>
          </NCard>
          
          <!-- 操作按钮 -->
          <NSpace>
            <NButton @click="savePersonalizeSettings">
              <template #icon><NIcon><SettingTwo /></NIcon></template>
              保存设置
            </NButton>
            
            <NButton @click="resetPersonalizeSettings">
              重置默认
            </NButton>
          </NSpace>
        </NSpace>
      </NCard>
    </NSpace>
    
    <!-- 主题编辑器模态框 -->
    <NModal v-model:show="showThemeEditor" preset="card" title="主题编辑器" style="width: 600px">
      <NForm>
        <NFormItem label="主题名称">
          <NInput v-model:value="newTheme.name" placeholder="请输入主题名称" />
        </NFormItem>
        
        <NFormItem label="主色调">
          <NColorPicker v-model:value="newTheme.colors.primary" />
        </NFormItem>
        
        <NFormItem label="成功色">
          <NColorPicker v-model:value="newTheme.colors.success" />
        </NFormItem>
        
        <NFormItem label="警告色">
          <NColorPicker v-model:value="newTheme.colors.warning" />
        </NFormItem>
        
        <NFormItem label="错误色">
          <NColorPicker v-model:value="newTheme.colors.error" />
        </NFormItem>
        
        <NFormItem label="背景色">
          <NColorPicker v-model:value="newTheme.background" />
        </NFormItem>
        
        <NFormItem label="表面色">
          <NColorPicker v-model:value="newTheme.surface" />
        </NFormItem>
        
        <NFormItem label="文字色">
          <NColorPicker v-model:value="newTheme.text" />
        </NFormItem>
      </NForm>
      
      <template #action>
        <NSpace>
          <NButton @click="showThemeEditor = false">取消</NButton>
          <NButton type="primary" @click="saveTheme">保存</NButton>
        </NSpace>
      </template>
    </NModal>
    
    <!-- 主题导入模态框 -->
    <NModal v-model:show="showImportModal" preset="card" title="导入主题" style="width: 500px">
      <NSpace vertical>
        <NText>请粘贴主题配置 JSON 数据：</NText>
        <NInput 
          v-model:value="importData" 
          type="textarea" 
          :rows="10" 
          placeholder="粘贴主题 JSON 数据..."
        />
      </NSpace>
      
      <template #action>
        <NSpace>
          <NButton @click="showImportModal = false">取消</NButton>
          <NButton type="primary" @click="importTheme">导入</NButton>
        </NSpace>
      </template>
    </NModal>
  </div>
</template>

<style lang="less" scoped>
.appearance-settings {
  padding: 24px;
  
  .theme-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
    
    .theme-card {
      border: 2px solid transparent;
      border-radius: 8px;
      overflow: hidden;
      cursor: pointer;
      transition: all 0.3s ease;
      
      &:hover {
        border-color: var(--primary-color-hover);
        transform: translateY(-2px);
      }
      
      &.active {
        border-color: var(--primary-color);
        box-shadow: 0 4px 12px rgba(24, 144, 255, 0.3);
      }
      
      .theme-preview {
        height: 120px;
        position: relative;
        
        .preview-header {
          height: 30px;
          display: flex;
          align-items: center;
          padding: 0 12px;
          
          .preview-buttons {
            display: flex;
            gap: 6px;
            
            .btn {
              width: 12px;
              height: 12px;
              border-radius: 50%;
              
              &.btn-close { background: #ff5f57; }
              &.btn-min { background: #ffbd2e; }
              &.btn-max { background: #28ca42; }
            }
          }
        }
        
        .preview-content {
          height: 90px;
          display: flex;
          align-items: center;
          justify-content: center;
          
          .preview-text {
            font-size: 24px;
            font-weight: bold;
          }
        }
      }
      
      .theme-info {
        padding: 12px;
        background: var(--card-color);
        
        .theme-name {
          font-weight: 500;
          margin-bottom: 8px;
        }
        
        .theme-actions {
          display: flex;
          gap: 4px;
        }
      }
    }
  }
  
  // 设置行布局 - 支持两列显示
  .setting-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-lg);
    
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: var(--spacing-md);
    }
  }
  
  .setting-item {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
    padding: var(--spacing-md);
    background: var(--color-bg-card);
    border-radius: var(--border-radius-md);
    border: 1px solid var(--color-border-light);
    transition: all var(--transition-base);
    
    &:hover {
      border-color: var(--color-primary-light);
      box-shadow: var(--shadow-sm);
    }
    
    .setting-label {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-weight: var(--font-weight-medium);
      color: var(--color-text-primary);
      margin-bottom: var(--spacing-xs);
    }
    
    .setting-value {
      font-size: var(--font-size-xs);
      color: var(--color-text-secondary);
      background: var(--color-bg-tag);
      padding: 2px 8px;
      border-radius: var(--border-radius-sm);
      font-weight: var(--font-weight-medium);
    }
  }
}
</style>