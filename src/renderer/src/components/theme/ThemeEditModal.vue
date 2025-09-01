<template>
  <div class="theme-edit-modal-overlay" @click="handleOverlayClick">
    <div class="theme-edit-modal" @click.stop>
      <!-- 模态框头部 -->
      <div class="modal-header">
        <h3 class="modal-title">
          {{ isEditing ? '编辑主题' : '新建主题' }}
        </h3>
        <button class="btn-close" @click="handleClose">
          <i class="icon-close"></i>
        </button>
      </div>

      <!-- 模态框内容 -->
      <div class="modal-body">
        <!-- 基本信息 -->
        <div class="form-section">
          <h4 class="section-title">基本信息</h4>

          <div class="form-group">
            <label class="form-label">主题名称</label>
            <input
              v-model="formData.name"
              type="text"
              class="form-input"
              placeholder="请输入主题名称"
              maxlength="50"
            />
          </div>

          <div class="form-group">
            <label class="form-label">主题描述</label>
            <textarea
              v-model="formData.description"
              class="form-textarea"
              placeholder="请输入主题描述（可选）"
              rows="3"
              maxlength="200"
            ></textarea>
          </div>

          <div class="form-group">
            <label class="switch-label">
              <input v-model="formData.isDark" type="checkbox" @change="handleDarkModeChange" />
              <span class="switch-text">深色主题</span>
            </label>
          </div>
        </div>

        <!-- 颜色配置 -->
        <div class="form-section">
          <h4 class="section-title">颜色配置</h4>

          <div class="color-grid">
            <!-- 主色 -->
            <div class="color-group">
              <label class="color-label">主色</label>
              <div class="color-input-group">
                <input
                  v-model="formData.config.primary"
                  type="color"
                  class="color-picker"
                  @input="handleColorChange"
                />
                <input
                  v-model="formData.config.primary"
                  type="text"
                  class="color-text"
                  placeholder="#007bff"
                  @input="handleColorChange"
                />
              </div>
            </div>

            <!-- 字体颜色 -->
            <div class="color-group">
              <label class="color-label">字体颜色</label>
              <div class="color-input-group">
                <input
                  v-model="formData.config.font"
                  type="color"
                  class="color-picker"
                  @input="handleColorChange"
                />
                <input
                  v-model="formData.config.font"
                  type="text"
                  class="color-text"
                  placeholder="#333333"
                  @input="handleColorChange"
                />
              </div>
            </div>

            <!-- 背景颜色 -->
            <div class="color-group">
              <label class="color-label">背景颜色</label>
              <div class="color-input-group">
                <input
                  v-model="formData.config.background"
                  type="color"
                  class="color-picker"
                  @input="handleColorChange"
                />
                <input
                  v-model="formData.config.background"
                  type="text"
                  class="color-text"
                  placeholder="#ffffff"
                  @input="handleColorChange"
                />
              </div>
            </div>

            <!-- 表面颜色 -->
            <div class="color-group">
              <label class="color-label">表面颜色</label>
              <div class="color-input-group">
                <input
                  v-model="formData.config.surface"
                  type="color"
                  class="color-picker"
                  @input="handleColorChange"
                />
                <input
                  v-model="formData.config.surface"
                  type="text"
                  class="color-text"
                  placeholder="#f8f9fa"
                  @input="handleColorChange"
                />
              </div>
            </div>

            <!-- 边框颜色 -->
            <div class="color-group">
              <label class="color-label">边框颜色</label>
              <div class="color-input-group">
                <input
                  v-model="formData.config.border"
                  type="color"
                  class="color-picker"
                  @input="handleColorChange"
                />
                <input
                  v-model="formData.config.border"
                  type="text"
                  class="color-text"
                  placeholder="#e9ecef"
                  @input="handleColorChange"
                />
              </div>
            </div>

            <!-- 错误颜色 -->
            <div class="color-group">
              <label class="color-label">错误颜色</label>
              <div class="color-input-group">
                <input
                  v-model="formData.config.error"
                  type="color"
                  class="color-picker"
                  @input="handleColorChange"
                />
                <input
                  v-model="formData.config.error"
                  type="text"
                  class="color-text"
                  placeholder="#dc3545"
                  @input="handleColorChange"
                />
              </div>
            </div>

            <!-- 警告颜色 -->
            <div class="color-group">
              <label class="color-label">警告颜色</label>
              <div class="color-input-group">
                <input
                  v-model="formData.config.warning"
                  type="color"
                  class="color-picker"
                  @input="handleColorChange"
                />
                <input
                  v-model="formData.config.warning"
                  type="text"
                  class="color-text"
                  placeholder="#ffc107"
                  @input="handleColorChange"
                />
              </div>
            </div>

            <!-- 成功颜色 -->
            <div class="color-group">
              <label class="color-label">成功颜色</label>
              <div class="color-input-group">
                <input
                  v-model="formData.config.success"
                  type="color"
                  class="color-picker"
                  @input="handleColorChange"
                />
                <input
                  v-model="formData.config.success"
                  type="text"
                  class="color-text"
                  placeholder="#28a745"
                  @input="handleColorChange"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- 背景图片 -->
        <div class="form-section">
          <h4 class="section-title">背景图片</h4>

          <div class="background-config">
            <div class="form-group">
              <label class="form-label">背景图片 URL</label>
              <div class="background-input-group">
                <input
                  v-model="formData.config.backgroundImage"
                  type="text"
                  class="form-input"
                  placeholder="请输入图片 URL 或留空"
                  @input="handleBackgroundChange"
                />
                <button
                  v-if="formData.config.backgroundImage"
                  class="btn btn-secondary"
                  @click="clearBackground"
                >
                  清除
                </button>
              </div>
            </div>

            <div v-if="formData.config.backgroundImage" class="form-group">
              <label class="form-label">背景模式</label>
              <select v-model="formData.config.backgroundSize" class="form-select">
                <option value="cover">覆盖</option>
                <option value="contain">包含</option>
                <option value="auto">自动</option>
                <option value="100% 100%">拉伸</option>
              </select>
            </div>

            <div v-if="formData.config.backgroundImage" class="form-group">
              <label class="form-label">背景位置</label>
              <select v-model="formData.config.backgroundPosition" class="form-select">
                <option value="center">居中</option>
                <option value="top">顶部</option>
                <option value="bottom">底部</option>
                <option value="left">左侧</option>
                <option value="right">右侧</option>
              </select>
            </div>

            <div v-if="formData.config.backgroundImage" class="form-group">
              <label class="switch-label">
                <input v-model="formData.config.backgroundRepeat" type="checkbox" />
                <span class="switch-text">重复背景</span>
              </label>
            </div>
          </div>
        </div>

        <!-- 预览区域 -->
        <div class="form-section">
          <h4 class="section-title">主题预览</h4>

          <div class="theme-preview-container">
            <div class="theme-preview-demo" :style="previewStyle">
              <div class="preview-header">
                <div class="preview-title">{{ formData.name || '主题预览' }}</div>
                <div class="preview-actions">
                  <button class="preview-btn preview-btn-primary">主要按钮</button>
                  <button class="preview-btn preview-btn-secondary">次要按钮</button>
                </div>
              </div>
              <div class="preview-content">
                <div class="preview-card">
                  <h5 class="preview-card-title">卡片标题</h5>
                  <p class="preview-card-text">
                    这是一段示例文本，用于展示主题的文字颜色和背景效果。
                  </p>
                  <div class="preview-status">
                    <span class="status-success">成功</span>
                    <span class="status-warning">警告</span>
                    <span class="status-error">错误</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 模态框底部 -->
      <div class="modal-footer">
        <div class="footer-actions">
          <button class="btn btn-secondary" @click="handleClose">取消</button>
          <button v-if="isEditing && theme?.isCustom" class="btn btn-danger" @click="handleDelete">
            删除主题
          </button>
          <button class="btn btn-primary" @click="handleSave">
            {{ isEditing ? '保存更改' : '创建主题' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useThemeStore } from '@/store/modules/theme'
import type { Theme, ThemeConfig } from '@/types/theme'
import { buildThemeColors } from '@/utils/theme/themeUtils'
import { isValidRgbColor } from '@/utils/theme/colorUtils'

/**
 * 主题编辑模态框组件
 */

interface Props {
  modelValue: boolean
  theme?: Theme | null
}

interface Emits {
  (e: 'update:modelValue', value: boolean): void
  (e: 'save', theme: Theme): void
}

const props = withDefaults(defineProps<Props>(), {
  theme: null
})

const emit = defineEmits<Emits>()

const themeStore = useThemeStore()

// 响应式数据
const formData = ref<{
  name: string
  description: string
  isDark: boolean
  config: ThemeConfig
}>({
  name: '',
  description: '',
  isDark: false,
  config: {
    primary: '#007bff',
    font: '#333333',
    background: '#ffffff',
    surface: '#f8f9fa',
    border: '#e9ecef',
    error: '#dc3545',
    warning: '#ffc107',
    success: '#28a745',
    backgroundImage: '',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: false
  }
})

const isEditing = computed(() => !!props.theme)

// 预览样式
const previewStyle = computed(() => {
  const colors = buildThemeColors(
    {
      id: 'preview',
      name: formData.value.name,
      isDark: formData.value.isDark,
      isCustom: true,
      config: formData.value.config
    },
    ''
  )

  const style: Record<string, string> = {
    ...colors,
    backgroundColor: formData.value.config.background,
    color: formData.value.config.font
  }

  if (formData.value.config.backgroundImage) {
    style.backgroundImage = `url(${formData.value.config.backgroundImage})`
    style.backgroundSize = formData.value.config.backgroundSize || 'cover'
    style.backgroundPosition = formData.value.config.backgroundPosition || 'center'
    style.backgroundRepeat = formData.value.config.backgroundRepeat ? 'repeat' : 'no-repeat'
  }

  return style
})

// 方法
/**
 * 初始化表单数据
 */
function initFormData() {
  if (props.theme) {
    formData.value = {
      name: props.theme.name,
      description: props.theme.description || '',
      isDark: props.theme.isDark,
      config: { ...props.theme.config }
    }
  } else {
    // 新建主题时的默认值
    formData.value = {
      name: '',
      description: '',
      isDark: false,
      config: {
        primary: '#007bff',
        font: '#333333',
        background: '#ffffff',
        surface: '#f8f9fa',
        border: '#e9ecef',
        error: '#dc3545',
        warning: '#ffc107',
        success: '#28a745',
        backgroundImage: '',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: false
      }
    }
  }
}

/**
 * 处理深色模式切换
 */
function handleDarkModeChange() {
  if (formData.value.isDark) {
    // 切换到深色模式的默认颜色
    formData.value.config.font = '#ffffff'
    formData.value.config.background = '#1a1a1a'
    formData.value.config.surface = '#2d2d2d'
    formData.value.config.border = '#404040'
  } else {
    // 切换到浅色模式的默认颜色
    formData.value.config.font = '#333333'
    formData.value.config.background = '#ffffff'
    formData.value.config.surface = '#f8f9fa'
    formData.value.config.border = '#e9ecef'
  }
}

/**
 * 处理颜色变化
 */
function handleColorChange() {
  // 颜色变化时的处理逻辑
  // 可以在这里添加颜色验证或自动调整逻辑
}

/**
 * 处理背景图片变化
 */
function handleBackgroundChange() {
  // 背景图片变化时的处理逻辑
}

/**
 * 清除背景图片
 */
function clearBackground() {
  formData.value.config.backgroundImage = ''
}

/**
 * 验证表单数据
 */
function validateForm(): string | null {
  if (!formData.value.name.trim()) {
    return '请输入主题名称'
  }

  if (formData.value.name.length > 50) {
    return '主题名称不能超过50个字符'
  }

  if (formData.value.description.length > 200) {
    return '主题描述不能超过200个字符'
  }

  // 验证颜色格式
  const colorFields = [
    'primary',
    'font',
    'background',
    'surface',
    'border',
    'error',
    'warning',
    'success'
  ]
  for (const field of colorFields) {
    const color = formData.value.config[field as keyof ThemeConfig] as string
    if (color && !isValidRgbColor(color)) {
      return `${field} 颜色格式不正确`
    }
  }

  return null
}

/**
 * 处理保存
 */
async function handleSave() {
  const error = validateForm()
  if (error) {
    alert(error)
    return
  }

  try {
    if (isEditing.value && props.theme) {
      // 更新现有主题
      const updatedTheme: Theme = {
        ...props.theme,
        name: formData.value.name,
        description: formData.value.description,
        isDark: formData.value.isDark,
        config: formData.value.config
      }

      await themeStore.updateTheme(updatedTheme)
      emit('save', updatedTheme)
    } else {
      // 创建新主题
      const newTheme = await themeStore.addTheme({
        name: formData.value.name,
        description: formData.value.description,
        isDark: formData.value.isDark,
        config: formData.value.config
      })

      emit('save', newTheme)
    }

    handleClose()
  } catch (error) {
    console.error('保存主题失败:', error)
    alert('保存主题失败，请重试')
  }
}

/**
 * 处理删除
 */
async function handleDelete() {
  if (!props.theme || !props.theme.isCustom) {
    return
  }

  if (!confirm('确定要删除这个主题吗？此操作不可撤销。')) {
    return
  }

  try {
    await themeStore.deleteTheme(props.theme.id)
    handleClose()
  } catch (error) {
    console.error('删除主题失败:', error)
    alert('删除主题失败，请重试')
  }
}

/**
 * 处理关闭
 */
function handleClose() {
  emit('update:modelValue', false)
}

/**
 * 处理遮罩层点击
 */
function handleOverlayClick() {
  handleClose()
}

// 监听 props.theme 变化，重新初始化表单数据
watch(
  () => props.theme,
  () => {
    initFormData()
  },
  { immediate: true }
)

// 组件挂载时初始化
onMounted(() => {
  initFormData()
})
</script>

<style scoped>
.theme-edit-modal-overlay {
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
  padding: 20px;
}

.theme-edit-modal {
  background: var(--color-background, #fff);
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.modal-header {
  padding: 20px 24px;
  border-bottom: 1px solid var(--color-border, #e9ecef);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--color-surface, #f8f9fa);
}

.modal-title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text-primary, #333);
}

.btn-close {
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  color: var(--color-text-secondary, #666);
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.btn-close:hover {
  background: var(--color-hover, #e9ecef);
  color: var(--color-text-primary, #333);
}

.modal-body {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
}

.form-section {
  margin-bottom: 32px;
}

.form-section:last-child {
  margin-bottom: 0;
}

.section-title {
  margin: 0 0 16px 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text-primary, #333);
  border-bottom: 1px solid var(--color-border, #e9ecef);
  padding-bottom: 8px;
}

.form-group {
  margin-bottom: 16px;
}

.form-label {
  display: block;
  margin-bottom: 6px;
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-primary, #333);
}

.form-input,
.form-textarea,
.form-select {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid var(--color-border, #e9ecef);
  border-radius: 6px;
  font-size: 14px;
  color: var(--color-text-primary, #333);
  background: var(--color-background, #fff);
  transition: border-color 0.2s ease;
}

.form-input:focus,
.form-textarea:focus,
.form-select:focus {
  outline: none;
  border-color: var(--color-primary, #007bff);
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.1);
}

.form-textarea {
  resize: vertical;
  min-height: 80px;
}

.switch-label {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-size: 14px;
  color: var(--color-text-primary, #333);
}

.switch-label input[type='checkbox'] {
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.color-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.color-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.color-label {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-primary, #333);
}

.color-input-group {
  display: flex;
  gap: 8px;
  align-items: center;
}

.color-picker {
  width: 40px;
  height: 40px;
  border: 1px solid var(--color-border, #e9ecef);
  border-radius: 6px;
  cursor: pointer;
  background: none;
  padding: 0;
}

.color-text {
  flex: 1;
  padding: 10px 12px;
  border: 1px solid var(--color-border, #e9ecef);
  border-radius: 6px;
  font-size: 14px;
  font-family: monospace;
}

.background-input-group {
  display: flex;
  gap: 8px;
  align-items: center;
}

.background-input-group .form-input {
  flex: 1;
}

.theme-preview-container {
  border: 1px solid var(--color-border, #e9ecef);
  border-radius: 8px;
  overflow: hidden;
}

.theme-preview-demo {
  min-height: 200px;
  padding: 16px;
}

.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--color-border, #e9ecef);
}

.preview-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text-primary, #333);
}

.preview-actions {
  display: flex;
  gap: 8px;
}

.preview-btn {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.preview-btn-primary {
  background: var(--color-primary, #007bff);
  color: white;
}

.preview-btn-secondary {
  background: var(--color-surface, #f8f9fa);
  color: var(--color-text-primary, #333);
  border: 1px solid var(--color-border, #e9ecef);
}

.preview-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.preview-card {
  padding: 16px;
  background: var(--color-surface, #f8f9fa);
  border: 1px solid var(--color-border, #e9ecef);
  border-radius: 8px;
}

.preview-card-title {
  margin: 0 0 8px 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-primary, #333);
}

.preview-card-text {
  margin: 0 0 12px 0;
  font-size: 13px;
  color: var(--color-text-secondary, #666);
  line-height: 1.4;
}

.preview-status {
  display: flex;
  gap: 8px;
}

.preview-status span {
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
}

.status-success {
  background: var(--color-success, #28a745);
  color: white;
}

.status-warning {
  background: var(--color-warning, #ffc107);
  color: #333;
}

.status-error {
  background: var(--color-error, #dc3545);
  color: white;
}

.modal-footer {
  padding: 20px 24px;
  border-top: 1px solid var(--color-border, #e9ecef);
  background: var(--color-surface, #f8f9fa);
}

.footer-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 6px;
}

.btn-primary {
  background: var(--color-primary, #007bff);
  color: white;
}

.btn-primary:hover {
  background: var(--color-primary-hover, #0056b3);
}

.btn-secondary {
  background: var(--color-surface, #f8f9fa);
  color: var(--color-text-primary, #333);
  border: 1px solid var(--color-border, #e9ecef);
}

.btn-secondary:hover {
  background: var(--color-hover, #e9ecef);
}

.btn-danger {
  background: var(--color-error, #dc3545);
  color: white;
}

.btn-danger:hover {
  background: #c82333;
}

/* 图标样式 */
.icon-close::before {
  content: '✕';
}

/* 响应式设计 */
@media (max-width: 768px) {
  .theme-edit-modal {
    margin: 10px;
    max-width: none;
    width: calc(100% - 20px);
  }

  .color-grid {
    grid-template-columns: 1fr;
  }

  .modal-body {
    padding: 16px;
  }

  .footer-actions {
    flex-direction: column;
  }

  .preview-header {
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
  }
}
</style>
