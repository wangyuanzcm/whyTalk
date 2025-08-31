<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { NButton, NSwitch, NSpace, NTag, NEmpty, NSpin, useMessage, NInput, NCard, NList, NListItem, NThing, NIcon, NModal, NForm, NFormItem, NSelect } from 'naive-ui'
import { Plug, Download, Delete, Setting, Refresh, Add, Link } from '@/components/icons'
import PluginAPI, { type PluginInfo } from '@/api/plugin'
import { useSettingsStore } from '@/store'

const message = useMessage()
const settingsStore = useSettingsStore()

// 插件列表
const plugins = ref<PluginInfo[]>([])
const loading = ref(false)

// 插件市场源配置
const showSourceModal = ref(false)
const pluginSources = ref([
  {
    id: 'official',
    name: '官方插件市场',
    url: 'https://plugins.whytalk.com/api',
    enabled: true,
    builtin: true
  }
])

const newSource = ref({
  name: '',
  url: ''
})

// 插件安装状态
const installingPlugins = ref(new Set<string>())
const uninstallingPlugins = ref(new Set<string>())

/**
 * 加载插件列表
 */
const loadPlugins = async () => {
  loading.value = true
  try {
    const result = await PluginAPI.listPlugins()
    plugins.value = result.data || []
  } catch (error) {
    message.error('加载插件列表失败')
    console.error('Failed to load plugins:', error)
  } finally {
    loading.value = false
  }
}

/**
 * 启用/禁用插件
 */
const togglePlugin = async (plugin: PluginInfo) => {
  try {
    if (plugin.enabled) {
      await PluginAPI.disablePlugin(plugin.id)
      message.success(`已禁用插件: ${plugin.config?.name || plugin.id}`)
    } else {
      await PluginAPI.enablePlugin(plugin.id)
      message.success(`已启用插件: ${plugin.config?.name || plugin.id}`)
    }
    await loadPlugins()
  } catch (error) {
    message.error('操作失败')
    console.error('Failed to toggle plugin:', error)
  }
}

/**
 * 卸载插件
 */
const uninstallPlugin = async (plugin: PluginInfo) => {
  if (plugin.type === 'system') {
    message.warning('系统插件无法卸载')
    return
  }
  
  uninstallingPlugins.value.add(plugin.id)
  try {
    await PluginAPI.uninstallPlugin(plugin.id)
    message.success(`已卸载插件: ${plugin.config?.name || plugin.id}`)
    await loadPlugins()
  } catch (error) {
    message.error('卸载失败')
    console.error('Failed to uninstall plugin:', error)
  } finally {
    uninstallingPlugins.value.delete(plugin.id)
  }
}

/**
 * 添加插件源
 */
const addPluginSource = () => {
  if (!newSource.value.name || !newSource.value.url) {
    message.warning('请填写完整的插件源信息')
    return
  }
  
  const source = {
    id: Date.now().toString(),
    name: newSource.value.name,
    url: newSource.value.url,
    enabled: true,
    builtin: false
  }
  
  pluginSources.value.push(source)
  newSource.value = { name: '', url: '' }
  message.success('插件源添加成功')
  showSourceModal.value = false
}

/**
 * 删除插件源
 */
const removePluginSource = (sourceId: string) => {
  const index = pluginSources.value.findIndex(s => s.id === sourceId)
  if (index > -1) {
    pluginSources.value.splice(index, 1)
    message.success('插件源删除成功')
  }
}

/**
 * 切换插件源状态
 */
const togglePluginSource = (source: any) => {
  source.enabled = !source.enabled
  message.success(`插件源 ${source.name} 已${source.enabled ? '启用' : '禁用'}`)
}

// 计算属性
const enabledPlugins = computed(() => plugins.value.filter(p => p.enabled))
const disabledPlugins = computed(() => plugins.value.filter(p => !p.enabled))
const systemPlugins = computed(() => plugins.value.filter(p => p.type === 'system'))
const userPlugins = computed(() => plugins.value.filter(p => p.type === 'user'))

// 组件挂载时加载数据
onMounted(() => {
  loadPlugins()
})
</script>

<template>
  <section>
    <h3 class="title">插件管理</h3>
    
    <!-- 插件统计信息 -->
    <div class="plugin-stats">
      <div class="stat-item">
        <span class="stat-label">总插件数:</span>
        <span class="stat-value">{{ plugins.length }}</span>
      </div>
      <div class="stat-item">
        <span class="stat-label">已启用:</span>
        <span class="stat-value enabled">{{ enabledPlugins.length }}</span>
      </div>
      <div class="stat-item">
        <span class="stat-label">已禁用:</span>
        <span class="stat-value disabled">{{ disabledPlugins.length }}</span>
      </div>
      <div class="stat-item">
        <span class="stat-label">系统插件:</span>
        <span class="stat-value system">{{ systemPlugins.length }}</span>
      </div>
    </div>

    <!-- 操作按钮 -->
    <div class="action-buttons">
      <NSpace>
        <NButton type="primary" @click="loadPlugins" :loading="loading">
          <template #icon>
            <NIcon><Refresh /></NIcon>
          </template>
          刷新列表
        </NButton>
        <NButton @click="showSourceModal = true">
          <template #icon>
            <NIcon><Link /></NIcon>
          </template>
          管理插件源
        </NButton>
      </NSpace>
    </div>

    <!-- 插件列表 -->
    <div class="plugin-list">
      <NSpin :show="loading">
        <NEmpty v-if="!plugins.length && !loading" description="暂无插件" />
        
        <NList v-else>
          <NListItem v-for="plugin in plugins" :key="plugin.id">
            <NThing>
              <template #avatar>
                <NIcon size="24" color="var(--color-primary)">
                  <Plug />
                </NIcon>
              </template>
              
              <template #header>
                <div class="plugin-header">
                  <span class="plugin-name">{{ plugin.config?.name || plugin.id }}</span>
                  <div class="plugin-tags">
                    <NTag v-if="plugin.type === 'system'" type="success" size="small">系统</NTag>
                    <NTag v-else type="info" size="small">用户</NTag>
                    <NTag v-if="plugin.enabled" type="success" size="small">已启用</NTag>
                    <NTag v-else type="warning" size="small">已禁用</NTag>
                  </div>
                </div>
              </template>
              
              <template #description>
                <div class="plugin-info">
                  <p class="plugin-description">{{ plugin.config?.description || '暂无描述' }}</p>
                  <div class="plugin-meta">
                    <span>版本: {{ plugin.config?.version || '未知' }}</span>
                    <span>作者: {{ plugin.config?.author || '未知' }}</span>
                    <span v-if="plugin.config?.ui">UI组件: {{ plugin.config.ui.components?.length || 0 }} 个</span>
                  </div>
                </div>
              </template>
              
              <template #action>
                <NSpace>
                  <NSwitch 
                    :value="plugin.enabled" 
                    @update:value="() => togglePlugin(plugin)"
                    :disabled="plugin.type === 'system'"
                  />
                  
                  <NButton 
                    v-if="plugin.type !== 'system'"
                    type="error" 
                    size="small"
                    :loading="uninstallingPlugins.has(plugin.id)"
                    @click="uninstallPlugin(plugin)"
                  >
                    <template #icon>
                      <NIcon><Delete /></NIcon>
                    </template>
                    卸载
                  </NButton>
                  
                  <NButton 
                    v-if="plugin.config?.ui?.settings"
                    size="small"
                    @click="() => {}"
                  >
                    <template #icon>
                      <NIcon><Setting /></NIcon>
                    </template>
                    设置
                  </NButton>
                </NSpace>
              </template>
            </NThing>
          </NListItem>
        </NList>
      </NSpin>
    </div>

    <!-- 插件源管理模态框 -->
    <NModal v-model:show="showSourceModal" preset="card" title="插件源管理" style="width: 600px">
      <div class="source-management">
        <!-- 现有插件源列表 -->
        <div class="source-list">
          <h4>插件源列表</h4>
          <NList>
            <NListItem v-for="source in pluginSources" :key="source.id">
              <NThing>
                <template #header>
                  <div class="source-header">
                    <span class="source-name">{{ source.name }}</span>
                    <NTag v-if="source.builtin" type="success" size="small">内置</NTag>
                  </div>
                </template>
                
                <template #description>
                  <span class="source-url">{{ source.url }}</span>
                </template>
                
                <template #action>
                  <NSpace>
                    <NSwitch 
                      :value="source.enabled" 
                      @update:value="() => togglePluginSource(source)"
                    />
                    
                    <NButton 
                      v-if="!source.builtin"
                      type="error" 
                      size="small"
                      @click="removePluginSource(source.id)"
                    >
                      删除
                    </NButton>
                  </NSpace>
                </template>
              </NThing>
            </NListItem>
          </NList>
        </div>

        <!-- 添加新插件源 -->
        <div class="add-source">
          <h4>添加插件源</h4>
          <NForm>
            <NFormItem label="名称">
              <NInput v-model:value="newSource.name" placeholder="请输入插件源名称" />
            </NFormItem>
            <NFormItem label="URL">
              <NInput v-model:value="newSource.url" placeholder="请输入插件源URL" />
            </NFormItem>
            <NFormItem>
              <NButton type="primary" @click="addPluginSource">
                <template #icon>
                  <NIcon><Add /></NIcon>
                </template>
                添加插件源
              </NButton>
            </NFormItem>
          </NForm>
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

.plugin-stats {
  .flex-row();
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
  padding: var(--spacing-md);
  background: var(--color-bg-secondary);
  border-radius: var(--border-radius-md);
  
  .stat-item {
    .flex-column();
    align-items: center;
    gap: var(--spacing-xs);
    
    .stat-label {
      font-size: var(--font-size-sm);
      color: var(--color-text-secondary);
    }
    
    .stat-value {
      font-size: var(--font-size-lg);
      font-weight: var(--font-weight-semibold);
      
      &.enabled {
        color: var(--color-success);
      }
      
      &.disabled {
        color: var(--color-warning);
      }
      
      &.system {
        color: var(--color-info);
      }
    }
  }
}

.action-buttons {
  margin-bottom: var(--spacing-lg);
}

.plugin-list {
  .plugin-header {
    .flex-row();
    justify-content: space-between;
    align-items: center;
    
    .plugin-name {
      font-weight: var(--font-weight-semibold);
      color: var(--color-text-primary);
    }
    
    .plugin-tags {
      .flex-row();
      gap: var(--spacing-xs);
    }
  }
  
  .plugin-info {
    .plugin-description {
      margin: 0 0 var(--spacing-xs) 0;
      color: var(--color-text-secondary);
      line-height: var(--line-height-normal);
    }
    
    .plugin-meta {
      .flex-row();
      gap: var(--spacing-md);
      font-size: var(--font-size-sm);
      color: var(--color-text-tertiary);
    }
  }
}

.source-management {
  .source-list {
    margin-bottom: var(--spacing-lg);
    
    h4 {
      margin: 0 0 var(--spacing-md) 0;
      font-size: var(--font-size-lg);
      color: var(--color-text-primary);
    }
    
    .source-header {
      .flex-row();
      justify-content: space-between;
      align-items: center;
      
      .source-name {
        font-weight: var(--font-weight-semibold);
      }
    }
    
    .source-url {
      font-size: var(--font-size-sm);
      color: var(--color-text-secondary);
      font-family: var(--font-family-mono);
    }
  }
  
  .add-source {
    padding-top: var(--spacing-lg);
    border-top: 1px solid var(--color-border-light);
    
    h4 {
      margin: 0 0 var(--spacing-md) 0;
      font-size: var(--font-size-lg);
      color: var(--color-text-primary);
    }
  }
}

// 响应式设计
.mobile-only() {
  .plugin-stats {
    .flex-column();
    gap: var(--spacing-md);
    
    .stat-item {
      .flex-row();
      justify-content: space-between;
      width: 100%;
    }
  }
  
  .plugin-header {
    .flex-column();
    align-items: flex-start !important;
    gap: var(--spacing-xs);
  }
  
  .plugin-meta {
    .flex-column() !important;
    gap: var(--spacing-xs) !important;
  }
}

// 暗色主题适配
:global([data-theme='dark']) {
  section {
    background: var(--color-bg-content-dark);
  }
  
  .title {
    color: var(--color-text-primary-dark);
  }
  
  .plugin-stats {
    background: var(--color-bg-secondary-dark);
    
    .stat-label {
      color: var(--color-text-secondary-dark);
    }
  }
  
  .plugin-name {
    color: var(--color-text-primary-dark) !important;
  }
  
  .plugin-description {
    color: var(--color-text-secondary-dark) !important;
  }
  
  .plugin-meta {
    color: var(--color-text-tertiary-dark) !important;
  }
  
  .source-name {
    color: var(--color-text-primary-dark) !important;
  }
  
  .source-url {
    color: var(--color-text-secondary-dark) !important;
  }
  
  .add-source {
    border-top-color: var(--color-border-dark);
  }
  
  h4 {
    color: var(--color-text-primary-dark) !important;
  }
}
</style>