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
  background: linear-gradient(180deg, var(--color-nav-bg) 0%, var(--color-nav-bg-secondary) 100%);
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  transition: all var(--transition-base);
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);

  .menu-header {
    height: 88px;
    width: 100%;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 16px 12px;
    box-sizing: border-box;
    cursor: pointer;
    border-bottom: 1px solid var(--color-border-light);
    background: var(--color-nav-header-bg);
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 60%;
      height: 1px;
      background: linear-gradient(90deg, transparent, var(--color-primary-alpha-300), transparent);
    }

    .avatar-container {
      position: relative;
      transition: all var(--transition-base);
      padding: 4px;

      .logo {
        cursor: pointer;
        border: 3px solid transparent;
        transition: all var(--transition-base);
        border-radius: 50%;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        
        &:hover {
          border-color: var(--color-primary);
          transform: scale(1.08);
          box-shadow: 0 4px 16px rgba(24, 144, 255, 0.3);
        }
        
        &:active {
          transform: scale(1.02);
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
  border-radius: 12px;
  font-size: 11px;
  width: 68px;
  height: 68px;
  margin: 6px auto;
  transition: all var(--transition-base);
  color: var(--color-text-secondary);
  background: transparent;
  
  // 添加微妙的边框
  border: 1px solid transparent;

  &:hover {
    background: var(--color-bg-hover);
    color: var(--color-text-primary);
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    border-color: var(--color-primary-alpha-200);
  }

  &.active {
    background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
    color: white;
    font-weight: 600;
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(24, 144, 255, 0.4);
    
    &::before {
      content: '';
      position: absolute;
      left: -12px;
      top: 50%;
      transform: translateY(-50%);
      width: 4px;
      height: 40px;
      background: linear-gradient(180deg, var(--color-primary), var(--color-primary-dark));
      border-radius: 0 4px 4px 0;
      box-shadow: 2px 0 4px rgba(24, 144, 255, 0.3);
    }
    
    &:hover {
      transform: translateY(-2px) scale(1.02);
    }
  }
  
  // 图标容器优化
  p {
    margin: 0;
    margin-bottom: 4px;
    transition: all var(--transition-base);
  }
  
  // 文字标签优化
  span {
    font-weight: 500;
    letter-spacing: 0.3px;
    transition: all var(--transition-base);
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
    background: linear-gradient(180deg, #1a1a1a, #0f0f0f);
    border-color: rgba(255, 255, 255, 0.1);
    box-shadow: 2px 0 12px rgba(0, 0, 0, 0.5);
  }
  
  .menu-header {
    background: linear-gradient(135deg, #2a2a2a, #1a1a1a);
    border-bottom-color: rgba(255, 255, 255, 0.1);
    
    &::after {
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    }
    
    .avatar-container .logo {
      border-color: rgba(255, 255, 255, 0.2);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
      
      &:hover {
        border-color: rgba(255, 255, 255, 0.4);
        box-shadow: 0 4px 16px rgba(255, 255, 255, 0.1), 0 0 0 2px rgba(255, 255, 255, 0.1);
      }
    }
  }
  
  .menu-items {
    color: rgba(255, 255, 255, 0.7);
    
    &:hover {
      background: rgba(255, 255, 255, 0.08);
      color: rgba(255, 255, 255, 0.9);
      border-color: rgba(255, 255, 255, 0.2);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    }
    
    &.active {
      background: linear-gradient(135deg, rgba(24, 144, 255, 0.2), rgba(24, 144, 255, 0.1));
      color: #69c0ff;
      border-color: rgba(24, 144, 255, 0.4);
      box-shadow: 0 4px 12px rgba(24, 144, 255, 0.3);
      
      &::before {
        background: linear-gradient(180deg, #69c0ff, #1890ff);
        box-shadow: 2px 0 8px rgba(24, 144, 255, 0.4);
      }
      
      &:hover {
        background: linear-gradient(135deg, rgba(24, 144, 255, 0.3), rgba(24, 144, 255, 0.2));
        box-shadow: 0 6px 16px rgba(24, 144, 255, 0.4);
      }
    }
  }
}

// 响应式设计
// 平板适配 (768px - 1024px)
@media (max-width: 1024px) and (min-width: 769px) {
  .menu {
    width: 70px;
    
    .menu-header {
      padding: var(--spacing-lg) var(--spacing-md);
      
      .avatar-container .logo {
        width: 36px;
        height: 36px;
      }
    }
    
    .menu-items {
      width: 50px;
      height: 50px;
      margin: var(--spacing-sm) var(--spacing-md);
      
      p {
        font-size: 20px;
      }
      
      span {
        display: none;
      }
    }
  }
}

// 平板适配 (481px - 768px)
@media (max-width: 768px) and (min-width: 481px) {
  .menu {
    width: 60px;
    
    .menu-header {
      padding: var(--spacing-md) var(--spacing-sm);
      
      .avatar-container .logo {
        width: 32px;
        height: 32px;
        border-width: 2px;
      }
    }
    
    .menu-items {
      width: 44px;
      height: 44px;
      margin: var(--spacing-sm) var(--spacing-sm);
      
      p {
        font-size: 18px;
      }
      
      span {
        display: none;
      }
      
      &.active::before {
        width: 3px;
        height: 60%;
      }
    }
  }
}

// 移动端适配 (361px - 480px)
@media (max-width: 480px) and (min-width: 361px) {
  .menu {
    width: 50px;
    
    .menu-header {
      padding: var(--spacing-sm);
      
      .avatar-container .logo {
        width: 28px;
        height: 28px;
        border-width: 1px;
      }
    }
    
    .menu-items {
      width: 38px;
      height: 38px;
      margin: var(--spacing-sm) var(--spacing-xs);
      
      p {
        font-size: 16px;
      }
      
      span {
        display: none;
      }
      
      &.active::before {
        width: 2px;
        height: 50%;
      }
    }
  }
}

// 超小屏幕适配 (≤360px)
@media (max-width: 360px) {
  .menu {
    width: 45px;
    
    .menu-header {
      padding: var(--spacing-xs);
      
      .avatar-container .logo {
        width: 24px;
        height: 24px;
        border-width: 1px;
      }
    }
    
    .menu-items {
      width: 34px;
      height: 34px;
      margin: var(--spacing-xs) var(--spacing-xs);
      
      p {
        font-size: 14px;
      }
      
      span {
        display: none;
      }
      
      &.active::before {
        width: 2px;
        height: 40%;
      }
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
