<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { NButton, NSwitch, NSpace, NTag, NEmpty, NSpin, useMessage } from 'naive-ui'
import { SettingTwo, Application, Drag } from '@icon-park/vue-next'
import PluginAPI, { type PluginInfo } from '@/api/plugin'
import { useMenuStore } from '@/store'

const message = useMessage()
const menuStore = useMenuStore()

// 插件列表
const plugins = ref<PluginInfo[]>([])
const loading = ref(false)

// 核心菜单项（不可移除）
const coreMenuItems = [
  { id: 'login', name: '登录', icon: 'User', path: '/auth/login', core: true },
  { id: 'register', name: '注册', icon: 'UserAdd', path: '/auth/register', core: true },
  { id: 'workspace', name: '工作台', icon: 'Application', path: '/workspace', core: true },
  { id: 'settings', name: '设置', icon: 'SettingTwo', path: '/settings', core: true }
  // P2P网络菜单项已被移除
]

// 可插件化的功能（将被移除的核心功能）
const pluginizableFeatures = [
  { id: 'message', name: '消息', icon: 'Message', path: '/message', description: '即时通讯功能' },
  { id: 'contact', name: '通讯录', icon: 'People', path: '/contact', description: '联系人管理' },
  { id: 'note', name: '笔记', icon: 'BookmarkOne', path: '/note', description: '笔记管理' }
]

// 加载插件列表
const loadPlugins = async () => {
  loading.value = true
  try {
    const result = await PluginAPI.listPlugins()
    if (result.success && result.plugins) {
      plugins.value = result.plugins.filter((plugin) => plugin.enabled)
      // 同步所有前端插件到菜单系统
      menuStore.syncPluginsToMenuItems(plugins.value)
    } else {
      message.error(result.error || '加载插件列表失败')
    }
  } catch (error: any) {
    console.error('加载插件失败:', error)
    message.error(`加载插件列表失败: ${error.message}`)
  } finally {
    loading.value = false
  }
}

// 保存菜单配置
const saveMenuConfig = () => {
  menuStore.saveMenuConfig()
  message.success('菜单配置已保存')
}

// 切换插件在菜单中的显示状态
const togglePluginInMenu = (pluginId: string, enabled: boolean) => {
  if (enabled) {
    menuStore.enablePluginInMenu(pluginId)
  } else {
    menuStore.disablePluginInMenu(pluginId)
  }
}

// 检查插件是否在菜单中启用
const isPluginEnabledInMenu = (pluginId: string) => {
  return menuStore.isPluginEnabledInMenu(pluginId)
}

// 移动插件顺序
const movePlugin = (pluginId: string, direction: 'up' | 'down') => {
  menuStore.movePlugin(pluginId, direction)
}

// 移动核心菜单顺序
const moveCoreMenu = (menuId: string, direction: 'up' | 'down') => {
  menuStore.moveCoreMenu(menuId, direction)
}

// 重置为默认配置
const resetToDefault = () => {
  menuStore.resetMenuConfig()
  message.success('已重置为默认配置')
}

// 计算属性：按顺序排列的启用插件
const orderedEnabledPlugins = computed(() => {
  return menuStore.menuConfig.pluginOrder
    .map((id) => plugins.value.find((p) => p.id === id))
    .filter(Boolean) as PluginInfo[]
})

// 计算属性：按顺序排列的核心菜单项
const orderedCoreMenuItems = computed(() => {
  return menuStore.menuConfig.coreMenuOrder
    .map((id) => coreMenuItems.find((item) => item.id === id))
    .filter(Boolean) as typeof coreMenuItems
})

onMounted(() => {
  menuStore.loadMenuConfig()
  loadPlugins()
})
</script>

<template>
  <section>
    <!-- 插件菜单配置 -->
    <div class="plugin-menu-config">
      <h4>🔧 插件菜单配置</h4>

      <NSpin :show="loading">
        <div v-if="plugins.length === 0 && !loading" class="empty-state">
          <NEmpty description="暂无可用插件">
            <template #extra>
              <NButton type="primary" @click="loadPlugins">刷新</NButton>
            </template>
          </NEmpty>
        </div>

        <div v-else class="plugin-list">
          <div v-for="plugin in plugins" :key="plugin.id" class="plugin-item">
            <div class="plugin-info">
              <div class="plugin-header">
                <h5 class="plugin-name">{{ plugin.config?.name || plugin.id }}</h5>
                <NTag :type="plugin.type === 'frontend' ? 'info' : 'success'" size="small">
                  {{ plugin.type === 'frontend' ? '前端插件' : '系统插件' }}
                </NTag>
              </div>
              <p class="plugin-description">{{ plugin.config?.description || '无描述' }}</p>
              <p class="plugin-version">版本: {{ plugin.config?.version || '未知' }}</p>
              <p class="plugin-menu-name">
                菜单显示:
                {{
                  (plugin.config as any)?.shortName ||
                  (plugin.config as any)?.menuTitle ||
                  plugin.config?.name ||
                  plugin.id
                }}
              </p>
            </div>

            <div class="plugin-controls">
              <NSwitch
                :value="isPluginEnabledInMenu(plugin.id)"
                @update:value="(val) => togglePluginInMenu(plugin.id, val)"
              />
              <span class="control-label">显示在菜单</span>
            </div>
          </div>
        </div>
      </NSpin>
    </div>

    <!-- 插件菜单顺序配置 -->
    <div v-if="orderedEnabledPlugins.length > 0" class="menu-order-config">
      <h4>📋 插件菜单顺序</h4>
      <p class="order-description">拖拽或使用按钮调整插件在菜单中的显示顺序</p>

      <div class="order-list">
        <div v-for="(plugin, index) in orderedEnabledPlugins" :key="plugin.id" class="order-item">
          <div class="order-info">
            <Drag class="drag-handle" :size="16" />
            <span class="order-number">{{ index + 1 }}</span>
            <span class="order-name">{{ plugin.config?.name || plugin.id }}</span>
          </div>

          <div class="order-controls">
            <NButton size="small" :disabled="index === 0" @click="movePlugin(plugin.id, 'up')">
              ↑
            </NButton>
            <NButton
              size="small"
              :disabled="index === orderedEnabledPlugins.length - 1"
              @click="movePlugin(plugin.id, 'down')"
            >
              ↓
            </NButton>
          </div>
        </div>
      </div>
    </div>

    <!-- 操作按钮 -->
    <div class="action-buttons">
      <NSpace>
        <NButton type="primary" @click="saveMenuConfig"> 保存配置 </NButton>
        <NButton @click="resetToDefault"> 重置为默认 </NButton>
        <NButton @click="loadPlugins"> 刷新插件列表 </NButton>
      </NSpace>
    </div>

    <!-- 预览效果 -->
    <div class="menu-preview">
      <h4>📱 菜单预览</h4>
      <div class="preview-container">
        <div class="preview-menu">
          <!-- 核心菜单项（按配置顺序） -->
          <div v-for="item in orderedCoreMenuItems" :key="item.id" class="preview-item core">
            <SettingTwo :size="16" />
            <span>{{ item.name }}</span>
            <NTag type="success" size="tiny">核心</NTag>
          </div>

          <!-- 插件菜单项（按配置顺序） -->
          <div v-for="plugin in orderedEnabledPlugins" :key="plugin.id" class="preview-item plugin">
            <Application :size="16" />
            <span>{{ plugin.config?.name || plugin.id }}</span>
            <NTag type="info" size="tiny">插件</NTag>
          </div>
        </div>
      </div>
    </div>
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
  margin: 0 0 var(--spacing-sm) 0;
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  line-height: var(--line-height-tight);
}

.description {
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-xl);
  line-height: var(--line-height-relaxed);
  font-size: var(--font-size-sm);
}

.architecture-info {
  margin-bottom: var(--spacing-xxl);
  padding: var(--spacing-xl);
  background: var(--color-bg-secondary);
  border-radius: var(--border-radius-lg);
  border-left: 4px solid var(--color-primary);
  .card-shadow();

  h4 {
    margin: 0 0 var(--spacing-lg) 0;
    color: var(--color-primary);
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-semibold);
    line-height: var(--line-height-tight);
  }

  .architecture-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-xl);

    h5 {
      margin: 0 0 var(--spacing-md) 0;
      font-weight: var(--font-weight-semibold);
      color: var(--color-text-primary);
      font-size: var(--font-size-md);
      line-height: var(--line-height-tight);
    }

    .feature-list {
      .flex-column();
      gap: var(--spacing-sm);
    }

    .feature-item {
      .flex-row();
      align-items: center;
      gap: var(--spacing-sm);
      padding: var(--spacing-sm) var(--spacing-md);
      border-radius: var(--border-radius-md);
      background: var(--color-bg-content);
      transition: all var(--transition-base);
      border: 1px solid var(--color-border-light);

      &:hover {
        .card-shadow();
        transform: translateY(-1px);
      }

      &.core {
        border-left: 3px solid var(--color-success);
      }

      &.plugin {
        border-left: 3px solid var(--color-warning);
      }

      .feature-name {
        font-weight: var(--font-weight-medium);
        color: var(--color-text-primary);
        font-size: var(--font-size-sm);
      }

      .feature-desc {
        color: var(--color-text-tertiary);
        font-size: var(--font-size-xs);
        flex: 1;
        line-height: var(--line-height-normal);
      }

      :deep(.n-tag) {
        border-radius: var(--border-radius-md);
        font-size: var(--font-size-xs);
        font-weight: var(--font-weight-medium);
        padding: var(--spacing-xs) var(--spacing-sm);
        text-align: center;
      }
    }
  }
}

.plugin-menu-config {
  margin-bottom: var(--spacing-xxl);

  h4 {
    margin: 0 0 var(--spacing-lg) 0;
    color: var(--color-primary);
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-semibold);
    line-height: var(--line-height-tight);
  }

  .empty-state {
    text-align: center;
    padding: var(--spacing-xxl);
    background: var(--color-bg-secondary);
    border-radius: var(--border-radius-lg);
    border: 1px solid var(--color-border-light);

    :deep(.n-empty) {
      .n-empty__description {
        color: var(--color-text-secondary);
      }
    }

    :deep(.n-button) {
      border-radius: var(--border-radius-md);
      font-weight: var(--font-weight-medium);
    }
  }

  .plugin-list {
    .flex-column();
    gap: var(--spacing-md);
  }

  .plugin-item {
    .flex-row();
    align-items: center;
    justify-content: space-between;
    padding: var(--spacing-lg);
    border: 1px solid var(--color-border-light);
    border-radius: var(--border-radius-lg);
    background: var(--color-bg-content);
    transition: all var(--transition-base);
    .card-shadow();

    &:hover {
      border-color: var(--color-primary-light);
      .card-shadow-hover();
      transform: translateY(-2px);
    }

    .plugin-info {
      flex: 1;
      margin-right: var(--spacing-lg);

      .plugin-header {
        .flex-row();
        align-items: center;
        gap: var(--spacing-sm);
        margin-bottom: var(--spacing-xs);

        .plugin-name {
          margin: 0;
          font-weight: var(--font-weight-semibold);
          color: var(--color-text-primary);
          font-size: var(--font-size-md);
          line-height: var(--line-height-tight);
        }

        :deep(.n-tag) {
          border-radius: var(--border-radius-md);
          font-size: var(--font-size-xs);
          font-weight: var(--font-weight-medium);
          padding: var(--spacing-xs) var(--spacing-sm);
          text-align: center;
        }
      }

      .plugin-description {
        color: var(--color-text-secondary);
        margin: var(--spacing-xs) 0;
        font-size: var(--font-size-sm);
        line-height: var(--line-height-relaxed);
      }

      .plugin-version,
      .plugin-menu-name {
        color: var(--color-text-tertiary);
        margin: var(--spacing-xs) 0 0 0;
        font-size: var(--font-size-xs);
        line-height: var(--line-height-normal);
      }
    }

    .plugin-controls {
      .flex-row();
      align-items: center;
      gap: var(--spacing-sm);
      flex-shrink: 0;

      .control-label {
        font-size: var(--font-size-sm);
        color: var(--color-text-secondary);
        font-weight: var(--font-weight-medium);
      }

      :deep(.n-switch) {
        .n-switch__rail {
          transition: all var(--transition-base);
        }

        &.n-switch--active {
          .n-switch__rail {
            background: var(--color-primary);
          }
        }
      }
    }
  }
}

.core-menu-order-config,
.menu-order-config {
  margin-bottom: var(--spacing-xxl);
  margin-top: var(--spacing-sm);

  h4 {
    margin: 0 0 var(--spacing-sm) 0;
    color: var(--color-primary);
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-semibold);
    line-height: var(--line-height-tight);
  }

  .order-description {
    color: var(--color-text-secondary);
    margin-bottom: var(--spacing-lg);
    font-size: var(--font-size-sm);
    line-height: var(--line-height-relaxed);
  }

  .order-list {
    .flex-column();
    gap: var(--spacing-sm);
  }

  .order-item {
    .flex-row();
    align-items: center;
    justify-content: space-between;
    padding: var(--spacing-md) var(--spacing-lg);
    border: 1px solid var(--color-border-light);
    border-radius: var(--border-radius-md);
    background: var(--color-bg-content);
    transition: all var(--transition-base);
    .card-shadow();

    &:hover {
      border-color: var(--color-primary-light);
      .card-shadow-hover();
      transform: translateY(-1px);
    }

    .order-info {
      .flex-row();
      align-items: center;
      gap: var(--spacing-md);

      .drag-handle {
        color: var(--color-text-tertiary);
        cursor: grab;
        transition: color var(--transition-base);

        &:hover {
          color: var(--color-primary);
        }

        &:active {
          cursor: grabbing;
        }
      }

      .order-number {
        width: 28px;
        height: 28px;
        .flex-center();
        background: var(--color-primary);
        color: var(--color-white);
        border-radius: var(--border-radius-full);
        font-size: var(--font-size-xs);
        font-weight: var(--font-weight-semibold);
        .card-shadow();
      }

      .order-name {
        font-weight: var(--font-weight-medium);
        color: var(--color-text-primary);
        font-size: var(--font-size-sm);
      }

      :deep(.n-tag) {
        border-radius: var(--border-radius-md);
        font-size: var(--font-size-xs);
        font-weight: var(--font-weight-medium);
        padding: var(--spacing-xs) var(--spacing-sm);
        text-align: center;
      }
    }

    .order-controls {
      .flex-row();
      gap: var(--spacing-xs);

      :deep(.n-button) {
        min-width: 20px;
        border-radius: var(--border-radius-md);
        font-weight: var(--font-weight-medium);
        transition: all var(--transition-base);

        &:hover:not(:disabled) {
          transform: translateY(-1px);
          .card-shadow();
        }
      }
    }
  }
}

.action-buttons {
  margin-bottom: var(--spacing-xxl);
  padding: var(--spacing-lg) 0;
  border-top: 1px solid var(--color-border-light);

  :deep(.n-space) {
    gap: var(--spacing-md);

    .n-button {
      border-radius: var(--border-radius-md);
      font-weight: var(--font-weight-medium);
      transition: all var(--transition-base);
      padding: var(--spacing-sm) var(--spacing-lg);
      min-width: 80px;
      height: 36px;

      &.n-button--primary-type {
        background: var(--color-primary);

        &:hover {
          background: var(--color-primary-hover);
          transform: translateY(-1px);
          .card-shadow();
        }
      }

      &:not(.n-button--primary-type) {
        border: 1px solid var(--color-border-light);
        background: var(--color-bg-content);
        color: var(--color-text-primary);

        &:hover {
          border-color: var(--color-primary-light);
          background: var(--color-bg-hover);
          transform: translateY(-1px);
        }
      }
    }
  }
}

.menu-preview {
  h4 {
    margin: 0 0 var(--spacing-lg) 0;
    color: var(--color-primary);
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-semibold);
    line-height: var(--line-height-tight);
  }

  .preview-container {
    padding: var(--spacing-xl);
    background: var(--color-bg-secondary);
    border-radius: var(--border-radius-lg);
    border: 1px solid var(--color-border-light);
    .card-shadow();
  }

  .preview-menu {
    .flex-column();
    gap: var(--spacing-sm);
    max-width: 240px;
  }

  .preview-item {
    .flex-row();
    align-items: center;
    gap: var(--spacing-sm);
    padding: var(--spacing-sm) var(--spacing-md);
    border-radius: var(--border-radius-md);
    background: var(--color-bg-content);
    border: 1px solid var(--color-border-light);
    transition: all var(--transition-base);
    .card-shadow();

    &:hover {
      .card-shadow-hover();
      transform: translateY(-1px);
    }

    &.core {
      border-left: 3px solid var(--color-success);
    }

    &.plugin {
      border-left: 3px solid var(--color-primary);
    }

    span {
      flex: 1;
      font-size: var(--font-size-sm);
      color: var(--color-text-primary);
      font-weight: var(--font-weight-medium);
    }

    :deep(.n-tag) {
      border-radius: var(--border-radius-md);
      font-size: var(--font-size-xs);
      font-weight: var(--font-weight-medium);
      padding: var(--spacing-xs) var(--spacing-sm);
      text-align: center;
    }
  }
}

// 响应式设计
section {
  .container();
  .spacing-responsive(var(--spacing-lg), var(--spacing-xl));
}

// 大屏幕优化
.desktop-up(@breakpoint-xl) {
  section {
    padding: var(--spacing-xl);
  }

  .title {
    font-size: var(--font-size-2xl);
  }

  .architecture-info {
    padding: var(--spacing-xl);
    margin-bottom: var(--spacing-2xl);

    .architecture-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: var(--spacing-xl);
    }

    h4 {
      font-size: var(--font-size-xl);
    }
  }

  .plugin-item,
  .order-item {
    padding: var(--spacing-xl);
  }

  .preview-container {
    padding: var(--spacing-xl);
  }
}

// 桌面端优化
.desktop-only() {
  .architecture-info {
    .architecture-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: var(--spacing-lg);
    }
  }
}

// 平板端优化
.tablet-only() {
  section {
    padding: var(--spacing-md);
  }

  .title {
    font-size: var(--font-size-lg);
  }

  .architecture-info {
    padding: var(--spacing-lg);
    margin-bottom: var(--spacing-xl);

    .architecture-grid {
      grid-template-columns: 1fr;
      gap: var(--spacing-lg);
    }

    h4 {
      font-size: var(--font-size-md);
    }
  }

  .plugin-item {
    .flex-column();
    align-items: stretch;
    gap: var(--spacing-md);

    .plugin-info {
      margin-right: 0;
    }

    .plugin-controls {
      justify-content: flex-end;
    }
  }

  .order-item {
    .flex-column();
    align-items: stretch;
    gap: var(--spacing-sm);

    .order-info {
      justify-content: flex-start;
    }

    .order-controls {
      justify-content: flex-end;
    }
  }

  .action-buttons {
    :deep(.n-space) {
      .flex-row();
      flex-wrap: wrap;
      gap: var(--spacing-md);

      .n-button {
        flex: 1;
        padding: 0 var(--spacing-xl);
      }
    }
  }
}

// 移动端优化
.mobile-only() {
  section {
    padding: var(--spacing-sm);
  }

  .title {
    font-size: var(--font-size-md);
    text-align: center;
  }

  .architecture-info,
  .plugin-menu-config,
  .core-menu-order-config,
  .menu-order-config {
    margin-bottom: var(--spacing-xl);
    margin-top: var(--spacing-sm);

    h4 {
      font-size: var(--font-size-md);
      margin-bottom: var(--spacing-md);
      text-align: center;
    }
  }

  .architecture-info {
    padding: var(--spacing-md);

    .architecture-grid {
      grid-template-columns: 1fr;
      gap: var(--spacing-md);
    }

    .feature-item {
      .flex-column();
      align-items: flex-start;
      gap: var(--spacing-xs);
      padding: var(--spacing-sm);
      text-align: left;
    }
  }

  .plugin-item {
    .flex-column();
    align-items: stretch;
    gap: var(--spacing-sm);
    padding: var(--spacing-md);

    .plugin-info {
      margin-right: 0;
    }

    .plugin-controls {
      justify-content: center;
    }
  }

  .order-item {
    .flex-column();
    align-items: stretch;
    gap: var(--spacing-xs);
    padding: var(--spacing-sm) var(--spacing-md);

    .order-info {
      justify-content: flex-start;
      gap: var(--spacing-sm);

      .order-number {
        width: 24px;
        height: 24px;
      }
    }

    .order-controls {
      justify-content: center;
    }
  }

  .action-buttons {
    :deep(.n-space) {
      .flex-column();
      align-items: stretch;
      gap: var(--spacing-sm);

      .n-button {
        width: 100%;
        font-size: var(--font-size-xs);
      }
    }
  }

  .preview-container {
    padding: var(--spacing-md);
  }

  .preview-menu {
    max-width: 100%;
  }
}

// 超小屏幕优化
.desktop-down(@breakpoint-xs) {
  section {
    padding: var(--spacing-xs);
  }

  .title {
    font-size: var(--font-size-sm);
    text-align: center;
  }

  .architecture-info,
  .plugin-menu-config,
  .core-menu-order-config,
  .menu-order-config {
    margin-bottom: var(--spacing-lg);
    margin-top: var(--spacing-sm);

    h4 {
      font-size: var(--font-size-sm);
      margin-bottom: var(--spacing-sm);
      text-align: center;
    }
  }

  .architecture-info {
    padding: var(--spacing-sm);

    .feature-item {
      padding: var(--spacing-xs);
      gap: var(--spacing-2xs);
    }
  }

  .plugin-item {
    padding: var(--spacing-sm);
    gap: var(--spacing-xs);
  }

  .order-item {
    padding: var(--spacing-xs) var(--spacing-sm);
    gap: var(--spacing-2xs);

    .order-info {
      gap: var(--spacing-xs);

      .order-number {
        width: 20px;
        height: 20px;
        font-size: var(--font-size-2xs);
      }
    }
  }

  .action-buttons {
    :deep(.n-space) {
      gap: var(--spacing-xs);

      .n-button {
        font-size: var(--font-size-2xs);
        padding: var(--spacing-xs);
      }
    }
  }

  .preview-container {
    padding: var(--spacing-sm);
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

  .description {
    color: var(--color-text-secondary-dark);
  }

  .architecture-info {
    background: var(--color-bg-secondary-dark);
    border-left-color: var(--color-primary-dark);

    h4 {
      color: var(--color-primary-dark);
    }

    .feature-item {
      background: var(--color-bg-content-dark);
      border-color: var(--color-border-dark);

      &.core {
        border-left-color: var(--color-success-dark);
      }

      &.plugin {
        border-left-color: var(--color-warning-dark);
      }

      .feature-name {
        color: var(--color-text-primary-dark);
      }

      .feature-desc {
        color: var(--color-text-tertiary-dark);
      }
    }
  }

  .plugin-menu-config {
    margin-top: var(--spacing-sm);
    h4 {
      color: var(--color-primary-dark);
    }

    .empty-state {
      background: var(--color-bg-secondary-dark);
      border-color: var(--color-border-dark);
    }

    .plugin-item {
      background: var(--color-bg-content-dark);
      border-color: var(--color-border-dark);

      &:hover {
        border-color: var(--color-primary-dark-light);
      }

      .plugin-info {
        .plugin-header {
          .plugin-name {
            color: var(--color-text-primary-dark);
          }
        }

        .plugin-description {
          color: var(--color-text-secondary-dark);
        }

        .plugin-version,
        .plugin-menu-name {
          color: var(--color-text-tertiary-dark);
        }
      }

      .plugin-controls {
        .control-label {
          color: var(--color-text-secondary-dark);
        }
      }
    }
  }

  .core-menu-order-config,
  .menu-order-config {
    margin-top: var(--spacing-sm);

    h4 {
      color: var(--color-primary-dark);
    }

    .order-description {
      color: var(--color-text-secondary-dark);
    }

    .order-item {
      background: var(--color-bg-content-dark);
      border-color: var(--color-border-dark);

      &:hover {
        border-color: var(--color-primary-dark-light);
      }

      .order-info {
        .drag-handle {
          color: var(--color-text-tertiary-dark);

          &:hover {
            color: var(--color-primary-dark);
          }
        }

        .order-number {
          background: var(--color-primary-dark);
        }

        .order-name {
          color: var(--color-text-primary-dark);
        }
      }
    }
  }

  .action-buttons {
    border-top-color: var(--color-border-dark);
  }

  .menu-preview {
    h4 {
      color: var(--color-primary-dark);
    }

    .preview-container {
      background: var(--color-bg-secondary-dark);
      border-color: var(--color-border-dark);
    }

    .preview-item {
      background: var(--color-bg-content-dark);
      border-color: var(--color-border-dark);

      &.core {
        border-left-color: var(--color-success-dark);
      }

      &.plugin {
        border-left-color: var(--color-primary-dark);
      }

      span {
        color: var(--color-text-primary-dark);
      }
    }
  }
}
</style>
