<script lang="ts" setup>
import Menu from './component/Menu.vue'
import { isElectronMode } from '@/utils/electron.ts'
</script>

<template>
  <div class="app-layout">
    <!-- 侧边栏 -->
    <aside class="layout-aside" :class="{ 'electron-mode': isElectronMode() }">
      <Menu />
    </aside>
    
    <!-- 主内容区域 -->
    <main class="layout-main">
      <div class="layout-content">
        <router-view />
      </div>
    </main>
  </div>
</template>

<style lang="less" scoped>
@import '@/styles/theme/index.less';

.app-layout {
  display: flex;
  flex-direction: row;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background: var(--color-bg-app);
  color: var(--color-text-primary);
  font-family: var(--font-family-primary);
}

.layout-aside {
  width: 80px; // 固定侧边栏宽度，参考lx-music
  height: 100%;
  background: var(--color-bg-sidebar);
  border-right: 1px solid var(--color-border-light);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  position: relative;
  z-index: var(--z-sidebar);
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
  
  // Electron模式下的拖拽区域
  &.electron-mode {
    -webkit-app-region: drag;
    
    // 确保菜单区域可以交互
    :deep(.menu-main) {
      -webkit-app-region: no-drag;
    }
  }
  
  // 过渡动画
  transition: background-color var(--transition-base);
}

.layout-main {
  flex: 1;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: var(--color-bg-main);
  position: relative;
  min-width: 0; // 防止flex子项溢出
}

.layout-content {
  flex: 1;
  height: 100%;
  overflow: auto;
  position: relative;
  
  // 内容区域的滚动样式
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: var(--color-gray-100);
  }
  
  &::-webkit-scrollbar-thumb {
    background: var(--color-gray-400);
    border-radius: 4px;
    
    &:hover {
      background: var(--color-gray-500);
    }
  }
}

// 响应式设计
.mobile-only() {
  .app-layout {
    .flex-column();
  }
  
  .layout-aside {
    width: 100%;
    height: auto;
    max-height: 120px;
    border-right: none;
    border-bottom: 1px solid var(--color-border-light);
    overflow-x: auto;
    overflow-y: hidden;
    
    // 移动端菜单水平滚动
    :deep(.menu-main) {
      .flex-start();
      flex-direction: row;
      padding: var(--spacing-sm) var(--spacing-md);
      gap: var(--spacing-sm);
    }
  }
  
  .layout-main {
    flex: 1;
    min-height: 0;
  }
}

.tablet-only() {
  .layout-aside {
    width: var(--sidebar-width-tablet);
  }
}

// 超小屏幕优化
.desktop-down(@breakpoint-xs) {
  .layout-aside {
    width: var(--sidebar-width-mobile);
    
    &.electron-mode {
      padding-top: var(--spacing-md);
      
      &::before {
        height: var(--spacing-md);
      }
    }
  }
}

// 暗色主题适配
:global([data-theme='dark']) {
  .app-layout {
    background: var(--color-bg-app-dark);
    color: var(--color-text-primary-dark);
  }
  
  .layout-aside {
    background: var(--color-bg-sidebar-dark);
    border-right-color: var(--color-border-dark);
    
    &:hover {
      background: var(--color-bg-sidebar-hover-dark);
    }
  }
  
  .layout-main {
    background: var(--color-bg-main-dark);
  }
}
</style>
