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
  { id: 'settings', name: '设置', icon: 'SettingTwo', path: '/settings', core: true },
  { id: 'p2p', name: '网络', icon: 'Connection', path: '/p2p', core: true }
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
    <h3 class="title">菜单配置</h3>
    <p class="description">
      配置左侧菜单显示的插件。核心功能（登录、工作台、设置、P2P网络）将始终显示，
      而消息、通讯录等功能将通过插件实现。
    </p>

    <!-- 架构说明 -->
    <div class="architecture-info">
      <h4>🏗️ 新架构说明</h4>
      <div class="architecture-grid">
        <div class="core-features">
          <h5>核心功能（保留）</h5>
          <div class="feature-list">
            <div v-for="item in coreMenuItems" :key="item.id" class="feature-item core">
              <span class="feature-name">{{ item.name }}</span>
              <NTag type="success" size="small">核心</NTag>
            </div>
          </div>
        </div>

        <div class="plugin-features">
          <h5>插件化功能（将移除）</h5>
          <div class="feature-list">
            <div v-for="item in pluginizableFeatures" :key="item.id" class="feature-item plugin">
              <span class="feature-name">{{ item.name }}</span>
              <span class="feature-desc">{{ item.description }}</span>
              <NTag type="warning" size="small">插件化</NTag>
            </div>
          </div>
        </div>
      </div>
    </div>

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
              <p class="plugin-menu-name">菜单显示: {{ (plugin.config as any)?.shortName || (plugin.config as any)?.menuTitle || plugin.config?.name || plugin.id }}</p>
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

    <!-- 核心菜单顺序配置 -->
    <div class="core-menu-order-config">
      <h4>🎯 核心菜单顺序</h4>
      <p class="order-description">调整核心菜单项在菜单中的显示顺序</p>

      <div class="order-list">
        <div v-for="(item, index) in orderedCoreMenuItems" :key="item.id" class="order-item">
          <div class="order-info">
            <Drag class="drag-handle" :size="16" />
            <span class="order-number">{{ index + 1 }}</span>
            <span class="order-name">{{ item.name }}</span>
            <NTag type="success" size="tiny">核心</NTag>
          </div>

          <div class="order-controls">
            <NButton size="small" :disabled="index === 0" @click="moveCoreMenu(item.id, 'up')">
              ↑
            </NButton>
            <NButton
              size="small"
              :disabled="index === orderedCoreMenuItems.length - 1"
              @click="moveCoreMenu(item.id, 'down')"
            >
              ↓
            </NButton>
          </div>
        </div>
      </div>
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
.title {
  margin-bottom: 8px;
  font-size: 18px;
  font-weight: 600;
}

.description {
  color: #666;
  margin-bottom: 24px;
  line-height: 1.6;
}

.architecture-info {
  margin-bottom: 32px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #1890ff;

  h4 {
    margin-bottom: 16px;
    color: #1890ff;
  }

  .architecture-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;

    h5 {
      margin-bottom: 12px;
      font-weight: 600;
    }

    .feature-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .feature-item {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      border-radius: 6px;
      background: white;

      &.core {
        border-left: 3px solid #52c41a;
      }

      &.plugin {
        border-left: 3px solid #faad14;
      }

      .feature-name {
        font-weight: 500;
      }

      .feature-desc {
        color: #666;
        font-size: 12px;
        flex: 1;
      }
    }
  }
}

.plugin-menu-config {
  margin-bottom: 32px;

  h4 {
    margin-bottom: 16px;
    color: #1890ff;
  }

  .empty-state {
    text-align: center;
    padding: 40px;
  }

  .plugin-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .plugin-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    border: 1px solid #e8e8e8;
    border-radius: 8px;
    background: white;

    .plugin-info {
      flex: 1;

      .plugin-header {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 4px;

        .plugin-name {
          margin: 0;
          font-weight: 600;
        }
      }

      .plugin-description {
        color: #666;
        margin: 4px 0;
        font-size: 14px;
      }

      .plugin-version {
        color: #999;
        margin: 0;
        font-size: 12px;
      }
    }

    .plugin-controls {
      display: flex;
      align-items: center;
      gap: 8px;

      .control-label {
        font-size: 14px;
        color: #666;
      }
    }
  }
}

.core-menu-order-config,
.menu-order-config {
  margin-bottom: 32px;

  h4 {
    margin-bottom: 8px;
    color: #1890ff;
  }

  .order-description {
    color: #666;
    margin-bottom: 16px;
    font-size: 14px;
  }

  .order-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .order-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    border: 1px solid #e8e8e8;
    border-radius: 6px;
    background: white;

    .order-info {
      display: flex;
      align-items: center;
      gap: 12px;

      .drag-handle {
        color: #999;
        cursor: grab;

        &:active {
          cursor: grabbing;
        }
      }

      .order-number {
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #1890ff;
        color: white;
        border-radius: 50%;
        font-size: 12px;
        font-weight: 600;
      }

      .order-name {
        font-weight: 500;
      }
    }

    .order-controls {
      display: flex;
      gap: 4px;
    }
  }
}

.action-buttons {
  margin-bottom: 32px;
  padding: 16px 0;
  border-top: 1px solid #e8e8e8;
}

.menu-preview {
  h4 {
    margin-bottom: 16px;
    color: #1890ff;
  }

  .preview-container {
    padding: 20px;
    background: #f8f9fa;
    border-radius: 8px;
    border: 1px solid #e8e8e8;
  }

  .preview-menu {
    display: flex;
    flex-direction: column;
    gap: 8px;
    max-width: 200px;
  }

  .preview-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    border-radius: 6px;
    background: white;
    border: 1px solid #e8e8e8;

    &.core {
      border-left: 3px solid #52c41a;
    }

    &.plugin {
      border-left: 3px solid #1890ff;
    }

    span {
      flex: 1;
      font-size: 14px;
    }
  }
}
</style>
