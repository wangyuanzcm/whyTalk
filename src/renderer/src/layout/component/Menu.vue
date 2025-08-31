<script lang="ts" setup>
import { useUserStore, useMenuStore, useSettingsStore } from '@/store'
import AccountCard from './AccountCard.vue'
// P2P状态组件已被移除

const userStore = useUserStore()
const router = useRouter()
const menuStore = useMenuStore()
const settingsStore = useSettingsStore()
// talkStore 已迁移到插件中

const color = computed(() => {
  return settingsStore.currentThemeMode == 'dark' ? '#ffffff' : '#333'
})

// 动态菜单项，从菜单store获取
const menus = computed(() => {
  // 为核心菜单项添加hotspot逻辑
  return menuStore.allMenuItems.map((item) => {
    const menuItem = { ...item }

    // 为特定菜单项添加hotspot逻辑
    if (item.id === 'message') {
      // TODO: 通过插件间通信获取未读消息数量
      menuItem.hotspot = computed(() => false)
    } else if (item.id === 'contact') {
      menuItem.hotspot = computed(() => userStore.isContactApply || userStore.isGroupApply)
    }

    return menuItem
  })
})

const onClickMenu = (menu) => {
  if (menu.external) {
    window.open(menu.link)
  } else {
    router.push(menu.link)
  }
}

const isActive = (menu) => {
  return router.currentRoute.value.path.indexOf(menu.link) >= 0
}

// 初始化菜单配置和插件同步
onMounted(async () => {
  menuStore.loadMenuConfig()

  // 同步插件到菜单系统
  try {
    const PluginAPI = (await import('@/api/plugin')).default
    const result = await PluginAPI.listPlugins() as { success: boolean; plugins?: Array<{ enabled: boolean; [key: string]: unknown }> }
    if (result.success && result.plugins) {
      const enabledPlugins = result.plugins.filter((plugin) => plugin.enabled)
      menuStore.syncPluginsToMenuItems(enabledPlugins)
    }
  } catch (error) {
    console.error('同步插件到菜单失败:', error)
  }
})
</script>

<template>
  <section class="menu">
    <header class="menu-header" :url="router.currentRoute.value.path">
      <!-- 头像和P2P状态组合 -->
      <div class="avatar-container">
        <n-popover
          placement="right"
          trigger="click"
          :raw="true"
          style="border-radius: 8px; overflow: hidden"
        >
          <template #trigger>
            <im-avatar
              class="logo"
              :size="35"
              :src="userStore.avatar"
              :username="userStore.nickname"
            />
          </template>
          <AccountCard />
        </n-popover>

        <!-- P2P状态圆点已被移除 -->
      </div>
      <!-- 
      <span class="online-status" :class="{ online: userStore.online }">
        {{ userStore.online ? '在线' : '连接中...' }}
      </span> -->
    </header>

    <main class="menu-main">
      <div
        v-for="nav in menus"
        :key="nav.link"
        :class="{
          'menu-items': true,
          active: isActive(nav)
        }"
        @click="onClickMenu(nav)"
      >
        <!-- 消息提示 -->
        <div v-if="nav.hotspot" class="hotspot" />

        <p>
          <component
            :is="nav.icon"
            :theme="isActive(nav) ? 'filled' : 'outline'"
            :fill="isActive(nav) ? '#1890ff' : color"
            :stroke-width="2"
            :size="22"
          />
        </p>

        <span>{{ nav.title }}</span>
      </div>
    </main>
  </section>
</template>

<style lang="less" scoped>
@import '@/styles/theme/index.less';

.menu {
  height: 100%;
  width: 100%;
  background-color: var(--color-nav-bg);
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  transition: background-color var(--transition-base);

  .menu-header {
    height: 80px;
    width: 100%;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 12px 8px;
    box-sizing: border-box;
    cursor: pointer;
    border-bottom: 1px solid var(--color-border-light);

    .avatar-container {
      position: relative;
      transition: var(--transition-transform);

      .logo {
        cursor: pointer;
        border: 2px solid transparent;
        transition: all var(--transition-base);
        
        &:hover {
          border-color: var(--color-primary);
          transform: scale(1.05);
        }
      }

      .p2p-status-dot {
        position: absolute;
        top: 2px;
        right: 2px;
        z-index: var(--z-index-tooltip);
      }
    }

    .online-status {
      margin-top: var(--spacing-xs);
      font-size: var(--font-size-xs);
      font-weight: var(--font-weight-light);
      color: var(--color-text-secondary);
      opacity: var(--opacity-hover);

      &.online {
        color: var(--color-success);
        opacity: 1;
      }
    }
  }

  .menu-main {
    flex: 1;
    width: 100%;
    overflow-y: auto;
    padding: 8px 0;
    
    // 自定义滚动条
    &::-webkit-scrollbar {
      width: 4px;
    }
    
    &::-webkit-scrollbar-track {
      background: transparent;
    }
    
    &::-webkit-scrollbar-thumb {
      background: var(--color-gray-300);
      border-radius: 2px;
      
      &:hover {
        background: var(--color-gray-400);
      }
    }
  }
}

.menu-items {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  user-select: none;
  cursor: pointer;
  border-radius: 8px;
  font-size: 11px;
  width: 64px;
  height: 64px;
  margin: 4px auto;
  transition: all var(--transition-base);
  color: var(--color-text-secondary);

  &:hover {
    background-color: var(--color-bg-hover);
    color: var(--color-text-primary);
    transform: scale(1.02);
  }

  &.active {
    background-color: var(--color-primary);
    color: white;
    font-weight: 500;
    
    &::before {
      content: '';
      position: absolute;
      left: -8px;
      top: 50%;
      transform: translateY(-50%);
      width: 3px;
      height: 32px;
      background-color: var(--color-primary);
      border-radius: 0 2px 2px 0;
    }
  }

  .hotspot {
    width: 8px;
    height: 8px;
    background: var(--color-error);
    display: inline-block;
    border-radius: 50%;
    position: absolute;
    right: 12px;
    top: 12px;
    animation: notifymove 3s infinite;
    animation-direction: alternate;
    box-shadow: 0 0 0 2px var(--color-bg-sidebar);
  }
}

@keyframes notifymove {
  0% {
    background: var(--color-accent);
    opacity: 1;
  }

  25% {
    background: transparent;
    opacity: 0.5;
  }

  50% {
    background: var(--color-accent);
    opacity: 1;
  }

  75% {
    background: transparent;
    opacity: 0.5;
  }

  100% {
    background: var(--color-accent);
    opacity: 1;
  }
}

// 暗色主题适配
[data-theme="dark"] {
  .menu {
    background-color: var(--color-nav-bg);
    border-right-color: var(--color-nav-border);
  }
  
  .menu-header {
    border-bottom-color: var(--color-nav-border);
  }
  
  .menu-items {
    color: var(--color-nav-item);
    
    &:hover {
      background-color: var(--color-primary-alpha-200);
    }
    
    &.active {
      background-color: var(--color-primary-alpha-300);
      color: var(--color-primary);
    }
  }
}

// 响应式设计
.mobile-only() {
  .menu {
    width: 100%;
    height: auto;
    border-right: none;
    border-bottom: var(--border-width-thin) solid var(--color-nav-border);
  }
  
  .menu-header {
    height: 80px;
    padding: var(--spacing-sm) var(--spacing-md);
    flex-direction: row;
    justify-content: flex-start;
    background: var(--gradient-primary);
    
    .avatar-container {
      margin-left: 0;
      margin-right: var(--spacing-md);
      
      .logo {
        width: var(--avatar-size-sm);
        height: var(--avatar-size-sm);
      }
    }
    
    .online-status {
      margin-top: 0;
      margin-left: var(--spacing-xs);
    }
  }
  
  .menu-main {
    flex-direction: row;
    overflow-x: auto;
    overflow-y: hidden;
    padding: var(--spacing-sm) var(--spacing-md);
    gap: var(--spacing-sm);
    .custom-scrollbar();
  }
  
  .menu-items {
    width: 60px;
    height: 60px;
    margin: 0;
    flex-shrink: 0;
    font-size: var(--font-size-xs);
    
    span {
      font-size: var(--font-size-xs);
      margin-top: var(--spacing-xs);
      .text-ellipsis();
      max-width: 50px;
    }
  }
}

.tablet-only() {
  .menu {
    width: var(--sidebar-width-tablet);
  }
  
  .menu-header {
    height: 100px;
    padding-top: var(--spacing-md);
    
    .avatar-container .logo {
      width: var(--avatar-size-md);
      height: var(--avatar-size-md);
    }
  }
  
  .menu-items {
    width: 50px;
    height: 50px;
    font-size: var(--font-size-xs);
  }
}

// 超小屏幕优化
.desktop-down(@breakpoint-xs) {
  .menu-header {
    height: 60px;
    padding: var(--spacing-xs) var(--spacing-sm);
    
    .avatar-container .logo {
      width: var(--avatar-size-xs);
      height: var(--avatar-size-xs);
    }
  }
  
  .menu-items {
    width: 50px;
    height: 50px;
    
    span {
      font-size: 10px;
    }
  }
}

// 动画增强
.menu-items {
  .slide-in-from-left(10px, var(--transition-duration-fast));
  
  &:nth-child(1) { animation-delay: 0ms; }
  &:nth-child(2) { animation-delay: 50ms; }
  &:nth-child(3) { animation-delay: 100ms; }
  &:nth-child(4) { animation-delay: 150ms; }
  &:nth-child(5) { animation-delay: 200ms; }
  &:nth-child(6) { animation-delay: 250ms; }
}

.menu-header {
  .fade-in(var(--transition-duration-slow));
}
</style>
