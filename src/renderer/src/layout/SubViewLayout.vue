<script lang="ts" setup>
import { markRaw } from 'vue'

interface Menu {
  name: string
  path: string
  icon: any
  iconBgColor?: string
  show?: boolean
  size?: string
  tips?: string
}

defineProps<{
  title: string
  menus: Menu[]
}>()
</script>

<template>
  <div class="sub-view-layout">
    <!-- 侧边导航 -->
    <aside class="layout-sidebar">
      <!-- 页面标题 -->
      <div class="sidebar-header">
        <h1 class="sidebar-title">{{ title }}</h1>
      </div>
      
      <nav class="sidebar-nav">
        <router-link 
          v-for="(menu, key) in menus" 
          :key="key" 
          :to="menu.path"
          class="nav-link"
          :class="{ 'nav-link--active': $route.path === menu.path }"
          v-show="menu.show !== false"
        >
          <div class="nav-item">
            <div class="nav-icon">
              <n-icon 
                :size="menu.size || 18" 
                :component="markRaw(menu.icon)" 
              />
            </div>
            
            <span class="nav-text">{{ menu.name }}</span>
            
            <div v-if="menu.tips" class="nav-badge">
              <span class="badge-text">{{ menu.tips }}</span>
            </div>
          </div>
        </router-link>
      </nav>
    </aside>
    
    <!-- 主内容区域 -->
    <main class="layout-content">
      <div class="content-wrapper">
        <router-view />
      </div>
    </main>
  </div>
</template>

<style lang="less" scoped>
@import '@/styles/theme/index.less';

.sub-view-layout {
  height: 100%;
  display: flex;
  flex-direction: row;
  background: var(--color-bg-main);
  color: var(--color-text-primary);
  overflow: hidden;
}

.layout-sidebar {
  width: var(--sidebar-secondary-width);
  background: var(--color-bg-sidebar-secondary);
  border-right: 1px solid var(--color-border-light);
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.sidebar-header {
  padding: var(--spacing-lg) var(--spacing-md);
  border-bottom: 1px solid var(--color-border-light);
  background: var(--color-bg-header);
  flex-shrink: 0;
  
  .sidebar-title {
    margin: 0;
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text-primary);
    line-height: 1.2;
    text-align: center;
  }
}

.sidebar-nav {
  flex: 1;
  padding: var(--spacing-md);
  overflow-y: auto;
  .custom-scrollbar();
  
  .nav-link {
    display: block;
    text-decoration: none;
    color: inherit;
    margin-bottom: var(--spacing-xs);
    border-radius: var(--border-radius-md);
    transition: all var(--transition-base);
    
    &:hover {
      background: var(--color-bg-hover);
      transform: translateX(2px);
    }
    
    &.nav-link--active {
      background: var(--color-primary-light);
      color: var(--color-primary);
      
      .nav-icon {
        color: var(--color-primary);
      }
      
      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 3px;
        height: 60%;
        background: var(--color-primary);
        border-radius: 0 var(--border-radius-sm) var(--border-radius-sm) 0;
      }
    }
  }
}

.nav-item {
  .flex-center();
  justify-content: flex-start;
  padding: var(--spacing-md) var(--spacing-lg);
  position: relative;
  min-height: var(--nav-item-height);
  
  .nav-icon {
    .flex-center();
    width: var(--icon-size-md);
    height: var(--icon-size-md);
    margin-right: var(--spacing-md);
    color: var(--color-text-secondary);
    transition: color var(--transition-base);
    flex-shrink: 0;
  }
  
  .nav-text {
    flex: 1;
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    line-height: var(--line-height-normal);
    .text-ellipsis();
  }
  
  .nav-badge {
    margin-left: var(--spacing-sm);
    
    .badge-text {
      display: inline-block;
      padding: 2px var(--spacing-xs);
      background: var(--color-error);
      color: var(--color-white);
      font-size: var(--font-size-xs);
      font-weight: var(--font-weight-medium);
      border-radius: var(--border-radius-full);
      min-width: 16px;
      text-align: center;
      line-height: 1.2;
    }
  }
}

.layout-content {
  flex: 1;
  overflow: hidden;
  background: var(--color-bg-content);
  
  .content-wrapper {
    height: 100%;
    overflow-y: auto;
    .custom-scrollbar();
    padding: var(--spacing-xl);
  }
}

// 响应式设计
.sub-view-layout {
  .container();
}

// 平板端优化
.tablet-only() {
  .sidebar-header {
    padding: var(--spacing-md) var(--spacing-sm);
    
    .sidebar-title {
      .font-responsive(var(--font-size-md), var(--font-size-lg));
    }
  }
  
  .layout-sidebar {
    width: var(--sidebar-secondary-width-mobile);
  }
  
  .content-wrapper {
    .spacing-responsive(var(--spacing-md), var(--spacing-lg));
  }
}

// 移动端优化
.mobile-only() {
  .layout-sidebar {
    width: var(--sidebar-secondary-width-mobile);
  }
  
  .sidebar-header {
    padding: var(--spacing-md) var(--spacing-sm);
    
    .sidebar-title {
      font-size: var(--font-size-md);
      line-height: var(--line-height-tight);
    }
  }
  
  .sidebar-nav {
    padding: var(--spacing-sm);
    
    .nav-link {
      margin-bottom: var(--spacing-2xs);
    }
  }
  
  .nav-item {
    padding: var(--spacing-sm);
    
    .nav-icon {
      width: var(--icon-size-sm);
      height: var(--icon-size-sm);
      margin-right: var(--spacing-sm);
    }
    
    .nav-text {
      font-size: var(--font-size-xs);
      line-height: var(--line-height-tight);
    }
  }
  
  .layout-content {
    .content-wrapper {
      padding: var(--spacing-md);
    }
  }
}

// 超小屏幕优化
.desktop-down(@breakpoint-xs) {
  .sidebar-header {
    padding: var(--spacing-sm);
    
    .sidebar-title {
      font-size: var(--font-size-sm);
    }
  }
  
  .layout-sidebar {
    width: calc(var(--sidebar-secondary-width-mobile) - 20px);
  }
  
  .content-wrapper {
    padding: var(--spacing-sm);
  }
  
  .nav-item {
    padding: var(--spacing-xs) var(--spacing-sm);
    
    .nav-icon {
      width: var(--icon-size-xs);
      height: var(--icon-size-xs);
    }
    
    .nav-text {
      font-size: var(--font-size-2xs);
    }
  }
}

// 暗色主题适配
:global([data-theme='dark']) {
  .sub-view-layout {
    background: var(--color-bg-main-dark);
    color: var(--color-text-primary-dark);
  }
  
  .sidebar-header {
    background: var(--color-bg-header-dark);
    border-bottom-color: var(--color-border-dark);
    
    .sidebar-title {
      color: var(--color-text-primary-dark);
    }
  }
  
  .layout-sidebar {
    background: var(--color-bg-sidebar-secondary-dark);
    border-right-color: var(--color-border-dark);
  }
  
  .nav-link {
    &:hover {
      background: var(--color-bg-hover-dark);
    }
    
    &.nav-link--active {
      background: var(--color-primary-dark-light);
      color: var(--color-primary-dark);
      
      .nav-icon {
        color: var(--color-primary-dark);
      }
      
      &::before {
        background: var(--color-primary-dark);
      }
    }
  }
  
  .nav-icon {
    color: var(--color-text-secondary-dark);
  }
  
  .layout-content {
    background: var(--color-bg-content-dark);
  }
}
</style>
