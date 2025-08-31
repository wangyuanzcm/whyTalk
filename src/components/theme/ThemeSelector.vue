<template>
  <div v-if="props.show" class="theme-selector-modal" @click.self="emit('update:show', false)">
    <div class="theme-selector">
    <!-- 主题选择器头部 -->
    <div class="theme-selector-header">
      <h3 class="theme-selector-title">选择主题</h3>
      <div class="theme-selector-actions">
        <button 
          class="btn btn-secondary"
          @click="showEditModal = true"
        >
          <i class="icon-plus"></i>
          新建主题
        </button>
        <button 
          class="btn btn-close"
          @click="emit('update:show', false)"
          title="关闭"
        >
          ×
        </button>
      </div>
    </div>

    <!-- 自动主题切换 -->
    <div class="theme-auto-switch">
      <label class="switch-label">
        <input 
          type="checkbox" 
          v-model="autoTheme"
          @change="handleAutoThemeChange"
        >
        <span class="switch-text">跟随系统深色模式</span>
      </label>
    </div>

    <!-- 主题分类标签 -->
    <div class="theme-tabs" v-if="!autoTheme">
      <button 
        class="theme-tab"
        :class="{ active: activeTab === 'light' }"
        @click="activeTab = 'light'"
      >
        浅色主题
      </button>
      <button 
        class="theme-tab"
        :class="{ active: activeTab === 'dark' }"
        @click="activeTab = 'dark'"
      >
        深色主题
      </button>
    </div>

    <!-- 自动模式的主题选择 -->
    <div class="theme-auto-selection" v-if="autoTheme">
      <div class="theme-mode-group">
        <h4 class="theme-mode-title">浅色模式主题</h4>
        <div class="theme-grid">
          <div 
            v-for="theme in lightThemes" 
            :key="theme.id"
            class="theme-item"
            :class="{ 
              active: lightThemeId === theme.id,
              'is-custom': theme.isCustom 
            }"
            @click="handleLightThemeSelect(theme.id)"
          >
            <div class="theme-preview" :style="getThemePreviewStyle(theme)">
              <div class="theme-preview-content">
          <div class="theme-preview-header"></div>
          <div class="theme-preview-body">
            <div class="theme-preview-sidebar"></div>
          </div>
        </div>
            </div>
            <div class="theme-info">
              <span class="theme-name">{{ theme.name }}</span>
              <div class="theme-actions" v-if="theme.isCustom">
                <button 
                  class="btn-icon"
                  @click.stop="editTheme(theme)"
                  title="编辑主题"
                >
                  <i class="icon-edit"></i>
                </button>
                <button 
                  class="btn-icon"
                  @click.stop="duplicateTheme(theme.id)"
                  title="复制主题"
                >
                  <i class="icon-copy"></i>
                </button>
                <button 
                  class="btn-icon btn-danger"
                  @click.stop="deleteTheme(theme.id)"
                  title="删除主题"
                >
                  <i class="icon-delete"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="theme-mode-group">
        <h4 class="theme-mode-title">深色模式主题</h4>
        <div class="theme-grid">
          <div 
            v-for="theme in darkThemes" 
            :key="theme.id"
            class="theme-item"
            :class="{ 
              active: darkThemeId === theme.id,
              'is-custom': theme.isCustom 
            }"
            @click="handleDarkThemeSelect(theme.id)"
          >
            <div class="theme-preview" :style="getThemePreviewStyle(theme)">
              <div class="theme-preview-content">
                <div class="theme-preview-header"></div>
                <div class="theme-preview-body"></div>
              </div>
            </div>
            <div class="theme-info">
              <span class="theme-name">{{ theme.name }}</span>
              <div class="theme-actions" v-if="theme.isCustom">
                <button 
                  class="btn-icon"
                  @click.stop="editTheme(theme)"
                  title="编辑主题"
                >
                  <i class="icon-edit"></i>
                </button>
                <button 
                  class="btn-icon"
                  @click.stop="duplicateTheme(theme.id)"
                  title="复制主题"
                >
                  <i class="icon-copy"></i>
                </button>
                <button 
                  class="btn-icon btn-danger"
                  @click.stop="deleteTheme(theme.id)"
                  title="删除主题"
                >
                  <i class="icon-delete"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 手动模式的主题选择 -->
    <div class="theme-manual-selection" v-else>
      <div class="theme-grid">
        <!-- 主题加载状态 -->
        <div v-if="themeStore.loading" class="theme-loading">
          <div class="loading-spinner"></div>
          <p>正在加载主题...</p>
        </div>
        
        <!-- 主题列表 -->
        <template v-else>
          <div 
            v-for="theme in currentThemes" 
            :key="theme.id"
            class="theme-item"
            :class="{ 
              active: currentThemeId === theme.id,
              'is-custom': theme.isCustom 
            }"
            @click="handleThemeSelect(theme.id)"
          >
            <div class="theme-preview" :style="getThemePreviewStyle(theme)">
              <div class="theme-preview-content">
                <div class="theme-preview-header"></div>
                <div class="theme-preview-body"></div>
              </div>
            </div>
            <div class="theme-info">
              <span class="theme-name">{{ theme.name }}</span>
              <div class="theme-actions" v-if="theme.isCustom">
                <button 
                  class="btn-icon"
                  @click.stop="editTheme(theme)"
                  title="编辑主题"
                >
                  <i class="icon-edit"></i>
                </button>
                <button 
                  class="btn-icon"
                  @click.stop="duplicateTheme(theme.id)"
                  title="复制主题"
                >
                  <i class="icon-copy"></i>
                </button>
                <button 
                  class="btn-icon btn-danger"
                  @click.stop="deleteTheme(theme.id)"
                  title="删除主题"
                >
                  <i class="icon-delete"></i>
                </button>
              </div>
              <div class="theme-actions" v-else>
                <button 
                  class="btn-icon"
                  @click.stop="duplicateTheme(theme.id)"
                  title="复制主题"
                >
                  <i class="icon-copy"></i>
                </button>
              </div>
            </div>
          </div>

          <!-- 添加新主题按钮 -->
          <div class="theme-item theme-add" @click="createNewTheme">
            <div class="theme-preview theme-add-preview">
              <div class="theme-add-icon">
                <i class="icon-plus"></i>
              </div>
            </div>
            <div class="theme-info">
              <span class="theme-name">创建新主题</span>
            </div>
          </div>
          
          <!-- 空状态 -->
          <div v-if="currentThemes.length === 0" class="theme-empty">
            <div class="empty-icon">🎨</div>
            <p>暂无{{ activeTab === 'light' ? '浅色' : '深色' }}主题</p>
            <button class="btn-primary" @click="createNewTheme">创建第一个主题</button>
          </div>
        </template>
      </div>
    </div>

    <!-- 主题编辑模态框 -->
    <ThemeEditModal 
      v-if="showEditModal"
      v-model="showEditModal"
      :theme="editingTheme"
      @save="handleThemeSave"
    />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useThemeStore } from '../../renderer/src/store/modules/theme'
import type { Theme } from '../../renderer/src/types/theme'
import ThemeEditModal from './ThemeEditModal.vue'

/**
 * 主题选择器组件
 */

// 定义组件属性
interface Props {
  show: boolean
}

// 定义组件事件
interface Emits {
  (e: 'update:show', value: boolean): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const themeStore = useThemeStore()

// 响应式数据
const activeTab = ref<'light' | 'dark'>('light')
const showEditModal = ref(false)
const editingTheme = ref<Theme | null>(null)

// 计算属性
const autoTheme = computed({
  get: () => themeStore.autoTheme,
  set: (value: boolean) => {
    themeStore.applyTheme({ auto: value })
  }
})

const currentThemeId = computed({
  get: () => themeStore.currentThemeId,
  set: (value: string) => {
    themeStore.applyTheme({ id: value })
  }
})

const lightThemeId = computed({
  get: () => themeStore.lightThemeId,
  set: (value: string) => {
    themeStore.applyTheme({ lightId: value })
  }
})

const darkThemeId = computed({
  get: () => themeStore.darkThemeId,
  set: (value: string) => {
    themeStore.applyTheme({ darkId: value })
  }
})

const lightThemes = computed(() => themeStore.lightThemes)
const darkThemes = computed(() => themeStore.darkThemes)

const currentThemes = computed(() => {
  return activeTab.value === 'light' ? lightThemes.value : darkThemes.value
})

// 方法
/**
 * 处理自动主题切换
 */
function handleAutoThemeChange() {
  // 自动主题切换逻辑已在计算属性中处理
}

/**
 * 处理主题选择
 */
function handleThemeSelect(themeId: string) {
  currentThemeId.value = themeId
}

/**
 * 处理浅色主题选择
 */
function handleLightThemeSelect(themeId: string) {
  lightThemeId.value = themeId
}

/**
 * 处理深色主题选择
 */
function handleDarkThemeSelect(themeId: string) {
  darkThemeId.value = themeId
}

/**
 * 获取主题预览样式
 */
function getThemePreviewStyle(theme: Theme) {
  const previewColors = themeStore.getPreviewColors(theme.id)
  if (!previewColors) {
    // 如果无法获取预览颜色，返回默认样式
    return {
      '--preview-primary': '#007bff',
      '--preview-background': '#ffffff',
      '--preview-surface': '#f8f9fa',
      '--preview-text': '#333333',
      '--preview-accent': '#6c757d'
    }
  }
  
  return {
    '--preview-primary': previewColors.primary,
    '--preview-background': previewColors.background,
    '--preview-surface': previewColors.surface,
    '--preview-text': previewColors.text,
    '--preview-border': previewColors.border
  }
}

/**
 * 编辑主题
 */
function editTheme(theme: Theme) {
  editingTheme.value = theme
  showEditModal.value = true
}

/**
 * 复制主题
 */
async function duplicateTheme(themeId: string) {
  try {
    await themeStore.duplicateTheme(themeId)
  } catch (error) {
    console.error('复制主题失败:', error)
    // 这里可以添加错误提示
  }
}

/**
 * 删除主题
 */
async function deleteTheme(themeId: string) {
  if (!confirm('确定要删除这个主题吗？')) {
    return
  }
  
  try {
    await themeStore.deleteTheme(themeId)
  } catch (error) {
    console.error('删除主题失败:', error)
    // 这里可以添加错误提示
  }
}

/**
 * 处理主题保存
 */
function handleThemeSave(theme: Theme) {
  showEditModal.value = false
  editingTheme.value = null
}

/**
 * 创建新主题
 */
function createNewTheme() {
  editingTheme.value = null
  showEditModal.value = true
}

// 监听当前主题变化，自动切换标签
watch(
  () => themeStore.currentTheme,
  (newTheme) => {
    if (newTheme && !autoTheme.value) {
      activeTab.value = newTheme.isDark ? 'dark' : 'light'
    }
  },
  { immediate: true }
)
</script>

<style scoped>
.theme-selector-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(-20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.theme-selector {
  max-width: 900px;
  max-height: 85vh;
  overflow-y: auto;
  background: var(--color-background, #fff);
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  padding: 20px;
  animation: slideIn 0.3s ease;
  border: 1px solid var(--color-border-light, rgba(0, 0, 0, 0.1));
}

.theme-selector-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.theme-selector-title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text-primary, #333);
}

.theme-selector-actions {
  display: flex;
  gap: 10px;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 6px;
}

.btn-secondary {
  background: var(--color-primary, #007bff);
  color: white;
}

.btn-secondary:hover {
  background: var(--color-primary-hover, #0056b3);
}

.btn-close {
  padding: 8px 12px;
  border: none;
  background: transparent;
  color: var(--color-text-secondary, #666);
  border-radius: 6px;
  cursor: pointer;
  font-size: 18px;
  line-height: 1;
  transition: all 0.2s ease;
}

.btn-close:hover {
  background: var(--color-danger, #dc3545);
  color: white;
}

.theme-auto-switch {
  margin-bottom: 20px;
  padding: 16px;
  background: var(--color-surface, #f8f9fa);
  border-radius: 8px;
  border: 1px solid var(--color-border, #e9ecef);
}

.switch-label {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-size: 14px;
  color: var(--color-text-primary, #333);
}

.switch-label input[type="checkbox"] {
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.theme-tabs {
  display: flex;
  gap: 4px;
  margin-bottom: 24px;
  background: var(--color-surface, #f8f9fa);
  border-radius: 12px;
  padding: 6px;
  position: relative;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
}

.theme-tab {
  flex: 1;
  padding: 12px 20px;
  border: none;
  background: transparent;
  color: var(--color-text-secondary, #666);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 14px;
  font-weight: 600;
  position: relative;
  z-index: 1;
}

.theme-tab.active {
  background: var(--color-primary, #007bff);
  color: white;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3), 0 2px 4px rgba(0, 0, 0, 0.1);
}

.theme-tab:hover:not(.active) {
  background: var(--color-hover, #e9ecef);
  color: var(--color-text-primary, #333);
  transform: translateY(-1px);
}

.theme-tab:active {
  transform: translateY(0);
}

.theme-mode-group {
  margin-bottom: 30px;
}

.theme-mode-title {
  margin: 0 0 16px 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text-primary, #333);
}

.theme-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}

.theme-item {
  border: 2px solid var(--color-border, #e9ecef);
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: var(--color-background, #fff);
  position: relative;
}

.theme-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.1) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.theme-item:hover {
  border-color: var(--color-primary-light, #b3d9ff);
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 8px 25px rgba(0, 123, 255, 0.15), 0 4px 12px rgba(0, 0, 0, 0.1);
}

.theme-item:hover::before {
  opacity: 1;
}

.theme-item.active {
  border-color: var(--color-primary, #007bff);
  box-shadow: 0 0 0 2px var(--color-primary, #007bff), 0 8px 25px rgba(0, 123, 255, 0.2);
  transform: translateY(-2px);
}

.theme-item.active::after {
  content: '✓';
  position: absolute;
  top: 8px;
  left: 8px;
  width: 20px;
  height: 20px;
  background: var(--color-primary, #007bff);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  z-index: 2;
  animation: checkmark 0.3s ease;
}

@keyframes checkmark {
  from {
    opacity: 0;
    transform: scale(0.5);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.theme-item.is-custom {
  position: relative;
}

.theme-item.is-custom::before {
  content: '自定义';
  position: absolute;
  top: 8px;
  right: 8px;
  background: var(--color-primary, #007bff);
  color: white;
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 4px;
  z-index: 1;
}

.theme-preview {
  height: 140px;
  background: var(--preview-background, #fff);
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid var(--preview-border, #e9ecef);
}

.theme-preview-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease;
}

.theme-item:hover .theme-preview-content {
  transform: scale(1.05);
}

.theme-preview-header {
  height: 35px;
  background: linear-gradient(135deg, var(--preview-primary, #007bff), var(--preview-primary, #007bff));
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.theme-preview-header::before {
  content: '';
  width: 8px;
  height: 8px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  margin-right: 6px;
}

.theme-preview-header::after {
  content: '';
  width: 50px;
  height: 6px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 3px;
}

.theme-preview-body {
  flex: 1;
  background: var(--preview-surface, #f8f9fa);
  position: relative;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.theme-preview-body::before {
  content: '';
  width: 100%;
  height: 6px;
  background: var(--preview-text, #333);
  opacity: 0.7;
  border-radius: 3px;
}

.theme-preview-body::after {
  content: '';
  width: 70%;
  height: 4px;
  background: var(--preview-text, #333);
  opacity: 0.5;
  border-radius: 2px;
}

.theme-preview-sidebar {
  position: absolute;
  right: 12px;
  top: 12px;
  bottom: 12px;
  width: 30px;
  background: var(--preview-border, #e9ecef);
  border-radius: 4px;
  opacity: 0.6;
}

.theme-preview-sidebar::before {
  content: '';
  position: absolute;
  top: 6px;
  left: 6px;
  right: 6px;
  height: 3px;
  background: var(--preview-text, #333);
  opacity: 0.4;
  border-radius: 2px;
}

.theme-preview-sidebar::after {
  content: '';
  position: absolute;
  top: 14px;
  left: 6px;
  right: 6px;
  height: 3px;
  background: var(--preview-text, #333);
  opacity: 0.3;
  border-radius: 2px;
}

.theme-info {
  padding: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.theme-name {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-primary, #333);
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.theme-actions {
  display: flex;
  gap: 4px;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.theme-item:hover .theme-actions {
  opacity: 1;
}

.btn-icon {
  width: 28px;
  height: 28px;
  border: none;
  background: var(--color-surface, #f8f9fa);
  color: var(--color-text-secondary, #666);
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 12px;
  position: relative;
  overflow: hidden;
}

.btn-icon::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.3s ease;
}

.btn-icon:hover {
  background: var(--color-primary, #007bff);
  color: white;
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
}

.btn-icon:hover::before {
  width: 100%;
  height: 100%;
}

.btn-icon:active {
  transform: scale(0.95);
}

.btn-icon.btn-danger:hover {
  background: #dc3545;
  color: white;
  box-shadow: 0 4px 12px rgba(220, 53, 69, 0.3);
}

/* 图标样式 */
.icon-plus::before { content: '+'; }
.icon-edit::before { content: '✏️'; }
.icon-copy::before { content: '📋'; }
.icon-delete::before { content: '🗑️'; }

/* 加载状态样式 */
.theme-loading {
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  color: var(--color-text-secondary, #666);
}

.loading-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid var(--color-border, #e9ecef);
  border-top: 3px solid var(--color-primary, #007bff);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 12px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* 添加新主题按钮样式 */
.theme-add {
  border: 2px dashed var(--color-border, #e9ecef);
  background: var(--color-surface, #f8f9fa);
}

.theme-add:hover {
  border-color: var(--color-primary, #007bff);
  background: var(--color-primary-light, #e3f2fd);
}

.theme-add-preview {
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
}

.theme-add-icon {
  font-size: 24px;
  color: var(--color-text-secondary, #666);
}

.theme-add:hover .theme-add-icon {
  color: var(--color-primary, #007bff);
}

/* 空状态样式 */
.theme-empty {
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  text-align: center;
  color: var(--color-text-secondary, #666);
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
  opacity: 0.6;
}

.theme-empty p {
  margin: 0 0 16px 0;
  font-size: 16px;
}

.btn-primary {
  background: var(--color-primary, #007bff);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
}

.btn-primary:hover {
  background: var(--color-primary-hover, #0056b3);
  transform: translateY(-1px);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .theme-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 12px;
  }
  
  .theme-preview {
    height: 100px;
  }
  
  .theme-selector-header {
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
  }
}
</style>