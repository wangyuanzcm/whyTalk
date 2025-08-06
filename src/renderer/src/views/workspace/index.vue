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

    const pluginList = await window.electron.ipcRenderer.invoke('plugin:list')
    // 显示所有类型的插件，包括前端插件和系统插件
    plugins.value = pluginList.filter(
      (plugin: Plugin) => plugin.type === 'system' || plugin.type === 'frontend'
    )
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

    // 根据插件类型调用不同的IPC处理器
    let result
    if (plugin.type === 'frontend') {
      // 前端插件直接打开，不需要检查UI配置
      console.log('Calling IPC: plugin:frontend:open for', plugin.id)
      result = await window.electron.ipcRenderer.invoke('plugin:frontend:open', plugin.id)
      console.log('IPC result:', result)
    } else if (plugin.type === 'system') {
      // 系统插件需要检查是否有UI配置
      if (!plugin.config.ui || !plugin.config.ui.components) {
        ;(window as any).$message?.warning('此系统插件暂无可用的UI界面')
        return
      }
      // 系统插件使用UI配置窗口
      console.log('Calling IPC: plugin:system:open-ui for', plugin.id)
      result = await window.electron.ipcRenderer.invoke('plugin:system:open-ui', plugin.id)
      console.log('IPC result:', result)
    } else {
      ;(window as any).$message?.error('不支持的插件类型')
      return
    }

    if (result && !result.success) {
      console.error('Plugin open failed:', result.error)
      ;(window as any).$message?.error(`打开插件失败: ${result.error}`)
    } else {
      console.log('Plugin opened successfully')
    }
  } catch (err: any) {
    ;(window as any).$message?.error(
      `打开插件失败: ${err instanceof Error ? err.message : String(err)}`
    )
  }
}

// 配置插件
const configurePlugin = (plugin: Plugin) => {
  console.log('配置插件:', plugin.id)
  ;(window as any).$message?.info(`配置 ${plugin.config.name} 功能开发中...`)
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

        <NGrid v-else :cols="3" :x-gap="16" :y-gap="16" class="plugin-grid">
          <NGridItem v-for="plugin in plugins" :key="plugin.id">
            <NCard class="plugin-card" hoverable :class="{ 'plugin-disabled': !plugin.enabled }">
              <template #header>
                <div class="plugin-header">
                  <div class="plugin-info">
                    <h3 class="plugin-name">{{ plugin.config.name }}</h3>
                    <p class="plugin-version">v{{ plugin.config.version }}</p>
                  </div>
                  <NTag :type="getStatusColor(plugin.enabled)" size="small">
                    {{ getStatusText(plugin.enabled) }}
                  </NTag>
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
                        type="primary"
                        size="small"
                        :disabled="
                          !plugin.enabled || (plugin.type === 'system' && !plugin.config.ui)
                        "
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

                  <NButton size="small" quaternary @click="configurePlugin(plugin)">
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
.workspace-container {
  padding: 24px;
  height: 100%;
  overflow-y: auto;
}

.workspace-header {
  margin-bottom: 24px;

  h2 {
    margin: 0 0 8px 0;
    font-size: 24px;
    font-weight: 600;
    color: var(--text-color-1);
    display: flex;
    align-items: center;
  }

  .workspace-description {
    margin: 0;
    color: var(--text-color-3);
    font-size: 14px;
  }
}

.workspace-content {
  min-height: 400px;
}

.error-container,
.empty-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
}

.plugin-grid {
  margin-top: 16px;
}

.plugin-card {
  height: 280px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }

  &.plugin-disabled {
    opacity: 0.6;

    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
}

.plugin-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  .plugin-info {
    flex: 1;

    .plugin-name {
      margin: 0 0 4px 0;
      font-size: 16px;
      font-weight: 600;
      color: var(--text-color-1);
      line-height: 1.2;
    }

    .plugin-version {
      margin: 0;
      font-size: 12px;
      color: var(--text-color-3);
    }
  }
}

.plugin-content {
  .plugin-description {
    margin: 0 0 12px 0;
    font-size: 14px;
    color: var(--text-color-2);
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .plugin-author {
    margin: 0 0 16px 0;
    font-size: 12px;
    color: var(--text-color-3);
  }

  .plugin-features {
    .feature-item {
      display: flex;
      justify-content: space-between;
      margin-bottom: 4px;
      font-size: 12px;

      .feature-label {
        color: var(--text-color-3);
      }

      .feature-value {
        color: var(--text-color-2);
        font-weight: 500;
      }
    }
  }
}

.plugin-actions {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .plugin-grid {
    :deep(.n-grid) {
      grid-template-columns: repeat(2, 1fr) !important;
    }
  }
}

@media (max-width: 768px) {
  .workspace-container {
    padding: 16px;
  }

  .plugin-grid {
    :deep(.n-grid) {
      grid-template-columns: 1fr !important;
    }
  }

  .plugin-card {
    height: auto;
    min-height: 240px;
  }
}
</style>
