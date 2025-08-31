<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { NButton, NSpace, NTag, NEmpty, NSpin, useMessage, NInput, NCard, NList, NListItem, NThing, NIcon, NModal, NForm, NFormItem, NColorPicker, NUpload, NUploadDragger, NText } from 'naive-ui'
import { Theme, Download, Delete, Edit, Add, Upload, PreviewOpen, Moon, Sun, Monitor } from '@/components/icons'
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
  }
])

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
 * 复制主题
 */
const duplicateTheme = (theme: any) => {
  const duplicated = {
    id: `${theme.id}_copy_${Date.now()}`,
    name: `${theme.name} 副本`,
    type: 'custom',
    preview: { ...theme.preview },
    config: {
      mode: theme.config.mode,
      colors: { ...theme.config.colors }
    }
  }
  
  themes.value.push(duplicated)
  message.success('主题复制成功')
}

/**
 * 删除主题
 */
const deleteTheme = (themeId: string) => {
  const theme = themes.value.find(t => t.id === themeId)
  if (!theme) return
  
  if (theme.type === 'builtin') {
    message.warning('内置主题无法删除')
    return
  }
  
  if (currentTheme.value === themeId) {
    message.warning('无法删除当前使用的主题')
    return
  }
  
  const index = themes.value.findIndex(t => t.id === themeId)
  if (index > -1) {
    themes.value.splice(index, 1)
    message.success('主题删除成功')
  }
}

/**
 * 保存主题
 */
const saveTheme = () => {
  if (!newTheme.value.name.trim()) {
    message.warning('请输入主题名称')
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
  } catch (error) {
    message.error('主题导入失败：' + error.message)
  }
}

/**
 * 处理文件上传
 */
const handleFileUpload = ({ file }: any) => {
  const reader = new FileReader()
  reader.onload = (e) => {
    importData.value = e.target?.result as string
  }
  reader.readAsText(file.file)
  return false // 阻止自动上传
}

// 计算属性
const builtinThemes = computed(() => themes.value.filter(t => t.type === 'builtin'))
const customThemes = computed(() => themes.value.filter(t => t.type === 'custom'))

// 主题模式选项
const themeModeOptions = [
  { label: '浅色', value: 'light', icon: Sun },
  { label: '深色', value: 'dark', icon: Moon },
  { label: '跟随系统', value: 'auto', icon: Monitor }
]

onMounted(() => {
  // 加载用户自定义主题
  // TODO: 从本地存储或服务器加载
})
</script>

<template>
  <section>
    <h3 class="title">主题设置</h3>
    
    <!-- 主题模式选择 -->
    <div class="theme-mode-section">
      <h4>主题模式</h4>
      <div class="theme-mode-options">
        <div 
          v-for="option in themeModeOptions" 
          :key="option.value"
          class="mode-option"
          :class="{ active: currentTheme === option.value }"
          @click="applyTheme(option.value)"
        >
          <NIcon size="24" :component="option.icon" />
          <span>{{ option.label }}</span>
        </div>
      </div>
    </div>

    <!-- 操作按钮 -->
    <div class="action-buttons">
      <NSpace>
        <NButton type="primary" @click="createTheme">
          <template #icon>
            <NIcon><Add /></NIcon>
          </template>
          创建主题
        </NButton>
        <NButton @click="showImportModal = true">
          <template #icon>
            <NIcon><Upload /></NIcon>
          </template>
          导入主题
        </NButton>
      </NSpace>
    </div>

    <!-- 内置主题 -->
    <div class="theme-section">
      <h4>内置主题</h4>
      <div class="theme-grid">
        <div 
          v-for="theme in builtinThemes" 
          :key="theme.id"
          class="theme-card"
          :class="{ active: currentTheme === theme.id }"
        >
          <div class="theme-preview" :style="{
            background: `linear-gradient(135deg, ${theme.preview.background} 0%, ${theme.preview.surface} 100%)`,
            color: theme.preview.text
          }">
            <div class="preview-header" :style="{ backgroundColor: theme.preview.primary }">
              <div class="preview-dot"></div>
              <div class="preview-dot"></div>
              <div class="preview-dot"></div>
            </div>
            <div class="preview-content">
              <div class="preview-text" :style="{ color: theme.preview.text }">Aa</div>
              <div class="preview-accent" :style="{ backgroundColor: theme.preview.primary }"></div>
            </div>
          </div>
          
          <div class="theme-info">
            <h5 class="theme-name">{{ theme.name }}</h5>
            <div class="theme-actions">
              <NButton size="small" @click="applyTheme(theme.id)">
                <template #icon>
                  <NIcon><PreviewOpen /></NIcon>
                </template>
                应用
              </NButton>
              <NButton size="small" @click="duplicateTheme(theme)">
                <template #icon>
                  <NIcon><Download /></NIcon>
                </template>
                复制
              </NButton>
              <NButton size="small" @click="exportTheme(theme)">
                <template #icon>
                  <NIcon><Download /></NIcon>
                </template>
                导出
              </NButton>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 自定义主题 -->
    <div class="theme-section" v-if="customThemes.length">
      <h4>自定义主题</h4>
      <div class="theme-grid">
        <div 
          v-for="theme in customThemes" 
          :key="theme.id"
          class="theme-card"
          :class="{ active: currentTheme === theme.id }"
        >
          <div class="theme-preview" :style="{
            background: `linear-gradient(135deg, ${theme.preview.background} 0%, ${theme.preview.surface} 100%)`,
            color: theme.preview.text
          }">
            <div class="preview-header" :style="{ backgroundColor: theme.preview.primary }">
              <div class="preview-dot"></div>
              <div class="preview-dot"></div>
              <div class="preview-dot"></div>
            </div>
            <div class="preview-content">
              <div class="preview-text" :style="{ color: theme.preview.text }">Aa</div>
              <div class="preview-accent" :style="{ backgroundColor: theme.preview.primary }"></div>
            </div>
          </div>
          
          <div class="theme-info">
            <h5 class="theme-name">{{ theme.name }}</h5>
            <div class="theme-actions">
              <NButton size="small" @click="applyTheme(theme.id)">
                <template #icon>
                  <NIcon><PreviewOpen /></NIcon>
                </template>
                应用
              </NButton>
              <NButton size="small" @click="editTheme(theme)">
                <template #icon>
                  <NIcon><Edit /></NIcon>
                </template>
                编辑
              </NButton>
              <NButton size="small" @click="exportTheme(theme)">
                <template #icon>
                  <NIcon><Download /></NIcon>
                </template>
                导出
              </NButton>
              <NButton size="small" type="error" @click="deleteTheme(theme.id)">
                <template #icon>
                  <NIcon><Delete /></NIcon>
                </template>
                删除
              </NButton>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 主题编辑器模态框 -->
    <NModal v-model:show="showThemeEditor" preset="card" :title="isCreatingTheme ? '创建主题' : '编辑主题'" style="width: 600px">
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
        
        <NFormItem>
          <NSpace>
            <NButton type="primary" @click="saveTheme">
              {{ isCreatingTheme ? '创建' : '保存' }}
            </NButton>
            <NButton @click="showThemeEditor = false">取消</NButton>
          </NSpace>
        </NFormItem>
      </NForm>
    </NModal>

    <!-- 主题导入模态框 -->
    <NModal v-model:show="showImportModal" preset="card" title="导入主题" style="width: 500px">
      <div class="import-section">
        <NUpload 
          :custom-request="handleFileUpload"
          accept=".whytheme,.json"
          :show-file-list="false"
        >
          <NUploadDragger>
            <div class="upload-content">
              <NIcon size="48" :depth="3">
                <Upload />
              </NIcon>
              <NText>点击或拖拽主题文件到此区域</NText>
              <NText depth="3">支持 .whytheme 和 .json 格式</NText>
            </div>
          </NUploadDragger>
        </NUpload>
        
        <div class="import-text">
          <h4>或粘贴主题数据</h4>
          <NInput 
            v-model:value="importData" 
            type="textarea" 
            placeholder="粘贴主题JSON数据..." 
            :rows="6"
          />
        </div>
        
        <div class="import-actions">
          <NSpace>
            <NButton type="primary" @click="importTheme" :disabled="!importData">
              导入主题
            </NButton>
            <NButton @click="showImportModal = false">取消</NButton>
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

.theme-mode-section {
  margin-bottom: var(--spacing-xl);
  
  h4 {
    margin: 0 0 var(--spacing-md) 0;
    font-size: var(--font-size-lg);
    color: var(--color-text-primary);
  }
  
  .theme-mode-options {
    .flex-row();
    gap: var(--spacing-md);
    
    .mode-option {
      .flex-column();
      align-items: center;
      gap: var(--spacing-xs);
      padding: var(--spacing-md);
      border: 2px solid var(--color-border-light);
      border-radius: var(--border-radius-md);
      cursor: pointer;
      transition: all 0.2s ease;
      
      &:hover {
        border-color: var(--color-primary);
        background: var(--color-bg-secondary);
      }
      
      &.active {
        border-color: var(--color-primary);
        background: var(--color-primary-light);
        color: var(--color-primary);
      }
      
      span {
        font-size: var(--font-size-sm);
        font-weight: var(--font-weight-medium);
      }
    }
  }
}

.action-buttons {
  margin-bottom: var(--spacing-xl);
}

.theme-section {
  margin-bottom: var(--spacing-xl);
  
  h4 {
    margin: 0 0 var(--spacing-lg) 0;
    font-size: var(--font-size-lg);
    color: var(--color-text-primary);
  }
  
  .theme-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: var(--spacing-lg);
    
    .theme-card {
      border: 2px solid var(--color-border-light);
      border-radius: var(--border-radius-lg);
      overflow: hidden;
      transition: all 0.2s ease;
      cursor: pointer;
      
      &:hover {
        border-color: var(--color-primary);
        transform: translateY(-2px);
        .card-shadow();
      }
      
      &.active {
        border-color: var(--color-primary);
        .card-shadow();
      }
      
      .theme-preview {
        height: 120px;
        position: relative;
        
        .preview-header {
          height: 24px;
          .flex-row();
          align-items: center;
          gap: var(--spacing-xs);
          padding: 0 var(--spacing-sm);
          
          .preview-dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.8);
          }
        }
        
        .preview-content {
          .flex-column();
          align-items: center;
          justify-content: center;
          height: calc(100% - 24px);
          gap: var(--spacing-sm);
          
          .preview-text {
            font-size: var(--font-size-xl);
            font-weight: var(--font-weight-bold);
          }
          
          .preview-accent {
            width: 40px;
            height: 4px;
            border-radius: 2px;
          }
        }
      }
      
      .theme-info {
        padding: var(--spacing-md);
        background: var(--color-bg-content);
        
        .theme-name {
          margin: 0 0 var(--spacing-sm) 0;
          font-size: var(--font-size-md);
          font-weight: var(--font-weight-semibold);
          color: var(--color-text-primary);
        }
        
        .theme-actions {
          .flex-row();
          gap: var(--spacing-xs);
          flex-wrap: wrap;
        }
      }
    }
  }
}

.import-section {
  .upload-content {
    .flex-column();
    align-items: center;
    gap: var(--spacing-sm);
    padding: var(--spacing-xl);
  }
  
  .import-text {
    margin: var(--spacing-lg) 0;
    
    h4 {
      margin: 0 0 var(--spacing-md) 0;
      font-size: var(--font-size-md);
      color: var(--color-text-primary);
    }
  }
  
  .import-actions {
    margin-top: var(--spacing-lg);
  }
}

// 响应式设计
.mobile-only() {
  .theme-mode-options {
    .flex-column();
    
    .mode-option {
      .flex-row();
      justify-content: center;
      width: 100%;
    }
  }
  
  .theme-grid {
    grid-template-columns: 1fr;
  }
  
  .theme-actions {
    justify-content: center;
  }
}

// 暗色主题适配
:global([data-theme='dark']) {
  section {
    background: var(--color-bg-content-dark);
  }
  
  .title, h4 {
    color: var(--color-text-primary-dark) !important;
  }
  
  .mode-option {
    border-color: var(--color-border-dark) !important;
    
    &:hover {
      background: var(--color-bg-secondary-dark) !important;
    }
    
    &.active {
      background: var(--color-primary-dark) !important;
      color: var(--color-primary-dark) !important;
    }
  }
  
  .theme-card {
    border-color: var(--color-border-dark) !important;
    
    .theme-info {
      background: var(--color-bg-content-dark) !important;
      
      .theme-name {
        color: var(--color-text-primary-dark) !important;
      }
    }
  }
}
</style>