<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { NCard, NGrid, NGridItem, NButton, NEmpty, NSpin, NTag, NTooltip } from 'naive-ui'
import { Application, Play, Setting } from '@icon-park/vue-next'

interface Plugin {
  id: string
  type: string
  config: {
    name: string
    version: string
    description: string
    author: string
    ui?: {
      components: any[]
      settings: any
    }
    // CubeModule插件配置
    backend?: {
      main: string
      functions?: Record<string, any>
    }
    frontend?: {
      main: string
      routes?: any[]
      components?: any[]
      settings?: any
    }
  }
  enabled: boolean
}

const plugins = ref<Plugin[]>([])
const loading = ref(true)
const error = ref('')

// 加载插件列表
const loadPlugins = async () => {
  try {
    loading.value = true
    error.value = ''

    // 检查是否在Electron环境中
    if (typeof window.electron === 'undefined') {
      throw new Error('此功能需要在Electron环境中运行')
    }

    // 使用新的VSCode风格插件系统API
    const extensionList = await window.electron.ipcRenderer.invoke('plugin:getAllExtensions')

    // 转换扩展信息为插件格式以保持兼容性
    plugins.value = extensionList.map((ext: any) => {
      // 确保manifest存在并提供默认值
      const manifest = ext.manifest || {}

      return {
        id: ext.id,
        type: 'frontend', // VSCode风格扩展主要是前端类型
        name: manifest.displayName || manifest.name || ext.id,
        version: manifest.version || '1.0.0',
        description: manifest.description || '暂无描述',
        author: manifest.publisher || manifest.author || '未知作者',
        enabled: ext.isActive || false,
        config: {
          name: manifest.displayName || manifest.name || ext.id,
          version: manifest.version || '1.0.0',
          description: manifest.description || '暂无描述',
          author: manifest.publisher || manifest.author || '未知作者'
        }
      }
    })
  } catch (err: any) {
    error.value = err.message || '加载插件失败'
    console.error('加载插件失败:', err)
  } finally {
    loading.value = false
  }
}

// 打开插件应用
const openPlugin = async (plugin: Plugin) => {
  try {
    console.log('打开插件:', plugin.id, 'type:', plugin.type)
    ;(window as any).$message?.success(`正在打开 ${plugin.config.name}`)

    // 获取插件显示配置
    const displayConfig = await (window as any).electron.ipcRenderer.invoke(
      'plugin:display-config:get',
      plugin.id
    )

    console.log('插件显示配置:', displayConfig)

    // 根据显示配置决定打开方式
    if (displayConfig?.openMode === 'newWindow') {
      // 在新窗口中打开插件
      const result = await (window as any).electron.ipcRenderer.invoke(
        'plugin:window:open-plugin',
        {
          pluginId: plugin.id,
          windowOptions: {
            width: displayConfig.windowWidth || 800,
            height: displayConfig.windowHeight || 600,
            resizable: displayConfig.resizable !== false,
            minimizable: displayConfig.minimizable !== false,
            maximizable: displayConfig.maximizable !== false,
            alwaysOnTop: displayConfig.alwaysOnTop === true
          }
        }
      )

      if (result?.success) {
        ;(window as any).$message?.success(`${plugin.config.name} 已在新窗口中打开`)
      } else {
        throw new Error(result?.error || '打开新窗口失败')
      }
    } else if (displayConfig?.openMode === 'sidebar') {
      // 在侧边栏中打开插件（暂时跳转到插件页面）
      ;(window as any).$message?.info('侧边栏模式暂未实现，将在当前窗口打开')
      window.location.hash = `/plugin/${plugin.id}`
    } else {
      // 默认在当前窗口中打开插件
      console.log('Opening plugin in current window:', plugin.id)
      window.location.hash = `/plugin/${plugin.id}`
    }
  } catch (err: any) {
    console.error('打开插件失败:', err)
    ;(window as any).$message?.error(
      `打开插件失败: ${err instanceof Error ? err.message : String(err)}`
    )
  }
}

/**
 * 配置插件 - 在主窗口跳转到配置页面
 * @param plugin 插件对象
 */
const configurePlugin = async (plugin: Plugin) => {
  try {
    console.log('配置插件:', plugin.id)
    ;(window as any).$message?.info(`正在打开 ${plugin.config.name} 配置页面...`)

    // 在主窗口跳转到插件配置页面
    window.location.hash = `/plugin-config/${plugin.id}`
    ;(window as any).$message?.success(`已跳转到 ${plugin.config.name} 配置页面`)
  } catch (error) {
    console.error('配置插件失败:', error)
    ;(window as any).$message?.error(
      `配置插件失败: ${error instanceof Error ? error.message : String(error)}`
    )
  }
}

// 获取插件状态颜色
const getStatusColor = (enabled: boolean) => {
  return enabled ? 'success' : 'default'
}

// 获取插件状态文本
const getStatusText = (enabled: boolean) => {
  return enabled ? '已启用' : '已禁用'
}

onMounted(() => {
  loadPlugins()
})
</script>

<template>
  <div class="workspace-container">
    <div class="workspace-header">
      <h2>
        <Application :size="24" style="margin-right: 8px; vertical-align: middle" />
        工作台
      </h2>
      <p class="workspace-description">管理和使用系统插件应用</p>
    </div>

    <div class="workspace-content">
      <NSpin :show="loading">
        <div v-if="error" class="error-container">
          <NEmpty description="加载失败">
            <template #extra>
              <p style="color: #e74c3c; margin-bottom: 16px">{{ error }}</p>
              <NButton type="primary" @click="loadPlugins">重新加载</NButton>
            </template>
          </NEmpty>
        </div>

        <div v-else-if="plugins.length === 0 && !loading" class="empty-container">
          <NEmpty description="暂无可用的插件应用">
            <template #extra>
              <NButton type="primary" @click="loadPlugins">刷新</NButton>
            </template>
          </NEmpty>
        </div>

        <NGrid v-else :cols="3" :x-gap="12" :y-gap="12" class="plugin-grid">
          <NGridItem v-for="plugin in plugins" :key="plugin.id">
            <NCard
              class="plugin-card"
              hoverable
              bordered
              :class="{ 'plugin-disabled': !plugin.enabled }"
            >
              <template #header>
                <div class="plugin-header">
                  <div class="plugin-info">
                    <h3 class="plugin-name">{{ plugin.config.name }}</h3>
                    <p class="plugin-version">
                      v{{ plugin.config.version }}
                      <NTag :type="getStatusColor(plugin.enabled)" size="small">
                        {{ getStatusText(plugin.enabled) }}
                      </NTag>
                    </p>
                  </div>
                </div>
              </template>

              <div class="plugin-content">
                <p class="plugin-description">{{ plugin.config.description }}</p>
                <p class="plugin-author">作者: {{ plugin.config.author }}</p>

                <div v-if="plugin.config.ui" class="plugin-features">
                  <div class="feature-item">
                    <span class="feature-label">UI组件:</span>
                    <span class="feature-value"
                      >{{ plugin.config.ui.components?.length || 0 }} 个</span
                    >
                  </div>
                  <div v-if="plugin.config.ui.settings" class="feature-item">
                    <span class="feature-label">设置页面:</span>
                    <span class="feature-value"
                      >{{ plugin.config.ui.settings.sections?.length || 0 }} 个分组</span
                    >
                  </div>
                </div>
              </div>

              <template #action>
                <div class="plugin-actions">
                  <NTooltip trigger="hover">
                    <template #trigger>
                      <NButton
                        :disabled="
                          !plugin.enabled || (plugin.type === 'system' && !plugin.config.ui)
                        "
                        :bordered="false"
                        @click="openPlugin(plugin)"
                      >
                        <Play :size="16" style="margin-right: 4px" />
                        打开
                      </NButton>
                    </template>
                    <span v-if="!plugin.enabled">插件已禁用</span>
                    <span v-else-if="plugin.type === 'system' && !plugin.config.ui"
                      >系统插件暂无UI界面</span
                    >
                    <span v-else>打开插件应用</span>
                  </NTooltip>

                  <NButton :bordered="false" @click="configurePlugin(plugin)">
                    <Setting :size="16" style="margin-right: 4px" />
                    配置
                  </NButton>
                </div>
              </template>
            </NCard>
          </NGridItem>
        </NGrid>
      </NSpin>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import '@/styles/theme/index.less';

.workspace-container {
  padding: var(--spacing-xl);
  height: 100%;
  overflow-y: auto;
  .custom-scrollbar();
  background: var(--color-bg-main);
}

.workspace-header {
  display: flex;
  flex-direction: row;
  margin-bottom: var(--spacing-xl);
  padding-bottom: var(--spacing-sm);
  border-bottom: 1px solid var(--color-border-light);

  h2 {
    margin: 0 0 var(--spacing-sm) 0;
    font-size: var(--font-size-2xl);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text-primary);
    .flex-center();
    justify-content: flex-start;
    margin-right: var(--spacing-sm);
    // 图标样式
    :deep(.icon-park-icon) {
      margin-right: var(--spacing-sm);
      color: var(--color-primary);
    }
  }

  .workspace-description {
    // margin: 0;
    .flex-center();
    color: var(--color-text-secondary);
    font-size: var(--font-size-sm);
    line-height: var(--line-height-relaxed);
  }
}

.workspace-content {
  min-height: 400px;
}

.error-container,
.empty-container {
  .flex-center();
  min-height: 300px;

  :deep(.n-empty) {
    .n-empty__description {
      color: var(--color-text-secondary);
    }
  }
}

.plugin-grid {
  margin-top: var(--spacing-lg);
}

.plugin-card {
  height: 280px;
  transition: all var(--transition-base);
  background: var(--color-bg-card);
  border: 1px solid var(--color-border-light);
  border-radius: var(--border-radius-lg);
  overflow: hidden;

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
    border-color: var(--color-primary-light);
  }

  &.plugin-disabled {
    opacity: 0.6;
    background: var(--color-bg-disabled);

    &:hover {
      transform: none;
      box-shadow: var(--shadow-sm);
      border-color: var(--color-border-light);
    }
  }

  // 卡片内容样式
  :deep(.n-card__content) {
    padding: 0 var(--spacing-lg);
  }

  :deep(.n-card__action) {
    padding: var(--spacing-md) var(--spacing-lg);
    background: var(--color-bg-card-footer);
    border-top: 1px solid var(--color-border-light);
  }
}

.plugin-header {
  .flex-between();
  align-items: flex-start;

  .plugin-info {
    flex: 1;

    .plugin-name {
      margin: 0 0 var(--spacing-xs) 0;
      font-size: var(--font-size-lg);
      font-weight: var(--font-weight-semibold);
      color: var(--color-text-primary);
      line-height: var(--line-height-tight);
      .text-ellipsis();
    }

    .plugin-version {
      margin: 0;
      font-size: var(--font-size-xs);
      color: var(--color-text-tertiary);
      font-family: var(--font-mono);
    }
  }
}

.plugin-content {
  .plugin-description {
    margin: 0 0 var(--spacing-sm) 0;
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
    line-height: var(--line-height-relaxed);
    .text-ellipsis-multiline(2);
  }

  .plugin-author {
    margin: 0 0 var(--spacing-lg) 0;
    font-size: var(--font-size-xs);
    color: var(--color-text-tertiary);
  }

  .plugin-features {
    .feature-item {
      .flex-between();
      margin-bottom: var(--spacing-xs);
      font-size: var(--font-size-xs);

      .feature-label {
        color: var(--color-text-tertiary);
      }

      .feature-value {
        color: var(--color-text-secondary);
        font-weight: var(--font-weight-medium);
      }
    }
  }
}

.plugin-actions {
  .flex-end();
  gap: var(--spacing-sm);

  :deep(.n-button) {
    border-radius: var(--border-radius-md);
    transition: all var(--transition-base);

    &:hover {
      transform: translateY(-1px);
    }
  }
}

// 响应式设计
.workspace-container {
  .container();
  .spacing-responsive(var(--spacing-md), var(--spacing-xl));
}

// 大屏幕 - 3列布局
.mobile-up(@breakpoint-2xl) {
  .plugin-grid {
    :deep(.n-grid) {
      grid-template-columns: repeat(5, 1fr) !important;
    }
  }
}

// 桌面端 - 2列布局
.desktop-only() {
  .plugin-grid {
    :deep(.n-grid) {
      grid-template-columns: repeat(3, 1fr) !important;
    }
  }
}

// 平板端 - 2列布局
.tablet-only() {
  .workspace-container {
    padding: var(--spacing-lg);
  }

  .plugin-grid {
    :deep(.n-grid) {
      grid-template-columns: repeat(2, 1fr) !important;
    }
  }

  .plugin-card {
    height: auto;
    min-height: 260px;
  }
}

// 移动端 - 单列布局
.mobile-only() {
  .workspace-container {
    padding: var(--spacing-sm);
  }

  .workspace-header {
    margin-bottom: var(--spacing-lg);
    padding-bottom: var(--spacing-md);

    h2 {
      .font-responsive(var(--font-size-lg), var(--font-size-2xl));

      :deep(.icon-park-icon) {
        margin-right: var(--spacing-xs);
      }
    }

    .workspace-description {
      font-size: var(--font-size-xs);
      line-height: var(--line-height-normal);
    }
  }

  .plugin-grid {
    :deep(.n-grid) {
      grid-template-columns: 1fr !important;
      gap: var(--spacing-md) !important;
    }
  }

  .plugin-card {
    height: auto;
    min-height: 220px;

    :deep(.n-card__content) {
      padding: 0 var(--spacing-md);
    }

    :deep(.n-card__action) {
      padding: var(--spacing-sm) var(--spacing-md);
    }
  }

  .plugin-header {
    .plugin-info {
      .plugin-name {
        font-size: var(--font-size-md);
      }
    }
  }

  .plugin-actions {
    .flex-column();
    gap: var(--spacing-xs);

    :deep(.n-button) {
      width: 100%;
      justify-content: center;
    }
  }
}

// 超小屏幕优化
.desktop-down(@breakpoint-xs) {
  .workspace-container {
    padding: var(--spacing-xs);
  }

  .workspace-header {
    h2 {
      font-size: var(--font-size-md);
    }
  }

  .plugin-card {
    min-height: 200px;

    :deep(.n-card__content) {
      padding: 0 var(--spacing-sm);
    }
  }

  .plugin-content {
    .plugin-description {
      .text-ellipsis-multiline(3);
    }
  }
}

// 暗色主题适配
:global([data-theme='dark']) {
  .workspace-container {
    background: var(--color-bg-main-dark);
  }

  .workspace-header {
    border-bottom-color: var(--color-border-dark);

    h2 {
      color: var(--color-text-primary-dark);
    }

    .workspace-description {
      color: var(--color-text-secondary-dark);
    }
  }

  .plugin-card {
    background: var(--color-bg-card-dark);
    border-color: var(--color-border-dark);

    &:hover {
      border-color: var(--color-primary-dark);
    }

    &.plugin-disabled {
      background: var(--color-bg-disabled-dark);
    }

    :deep(.n-card__action) {
      background: var(--color-bg-card-footer-dark);
      border-top-color: var(--color-border-dark);
    }
  }
}
</style>
