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
        <div class="header-decoration"></div>
        <h1 class="sidebar-title">{{ title }}</h1>
      </div>
      
      <nav class="sidebar-nav" role="toolbar">
        <router-link 
          v-for="(menu, key) in menus" 
          :key="key" 
          :to="menu.path"
          class="nav-link"
          :class="{ 'nav-link--active': $route.path === menu.path }"
          v-show="menu.show !== false"
          role="tab"
          :aria-selected="$route.path === menu.path"
          :aria-label="menu.name"
        >
          <div class="nav-item">
            <transition name="nav-active">
              <i v-if="$route.path === menu.path" class="pi pi-angle-right active-indicator"></i>
            </transition>
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
  background: linear-gradient(180deg, var(--color-bg-sidebar-secondary) 0%, var(--color-bg-sidebar-secondary-dark) 100%);
  border-right: 1px solid var(--color-border-light);
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
  box-shadow: 2px 0 12px rgba(0, 0, 0, 0.08);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 1px;
    height: 100%;
    background: linear-gradient(180deg, var(--color-primary-alpha-100), transparent, var(--color-primary-alpha-100));
  }
}

.sidebar-header {
  padding: var(--spacing-xl) var(--spacing-lg);
  border-bottom: 1px solid var(--color-border-light);
  background: linear-gradient(135deg, var(--color-bg-header), var(--color-bg-header-secondary));
  flex-shrink: 0;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--color-primary-alpha-300), transparent);
  }
  
  .sidebar-title {
    margin: 0;
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-bold);
    color: var(--color-text-primary);
    line-height: 1.3;
    text-align: center;
    letter-spacing: 0.5px;
    background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
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
    margin-bottom: var(--spacing-sm);
    border-radius: var(--border-radius-lg);
    transition: all var(--transition-base);
    position: relative;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
      transition: left var(--transition-base);
    }
    
    &:hover {
      background: var(--color-bg-hover);
      transform: translateX(4px);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      
      &::before {
        left: 100%;
      }
    }
    
    &.nav-link--active {
      background: linear-gradient(135deg, var(--color-primary-light), var(--color-primary-alpha-200));
      color: var(--color-primary);
      transform: translateX(2px);
      box-shadow: 0 4px 12px rgba(24, 144, 255, 0.2);
      border: 1px solid var(--color-primary-alpha-300);
      
      .nav-icon {
        color: var(--color-primary);
        transform: scale(1.1);
      }
      
      .nav-text {
        font-weight: var(--font-weight-semibold);
      }
      
      &::after {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 4px;
        height: 70%;
        background: linear-gradient(180deg, var(--color-primary), var(--color-primary-dark));
        border-radius: 0 var(--border-radius-md) var(--border-radius-md) 0;
        box-shadow: 2px 0 4px rgba(24, 144, 255, 0.3);
      }
      
      &:hover {
        transform: translateX(6px);
        box-shadow: 0 6px 16px rgba(24, 144, 255, 0.3);
      }
    }
  }
}

.nav-item {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: var(--spacing-lg) var(--spacing-xl);
  position: relative;
  min-height: 56px;
  
  .nav-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    margin-right: var(--spacing-lg);
    color: var(--color-text-secondary);
    transition: all var(--transition-base);
    flex-shrink: 0;
    border-radius: var(--border-radius-sm);
    background: var(--color-bg-icon);
    padding: 4px;
  }
  
  .nav-text {
    flex: 1;
    font-size: var(--font-size-md);
    font-weight: var(--font-weight-medium);
    line-height: var(--line-height-normal);
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    letter-spacing: 0.2px;
  }
  
  .nav-badge {
    margin-left: var(--spacing-md);
    
    .badge-text {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 4px var(--spacing-sm);
      background: linear-gradient(135deg, var(--color-error), var(--color-error-dark));
      color: var(--color-white);
      font-size: var(--font-size-xs);
      font-weight: var(--font-weight-semibold);
      border-radius: var(--border-radius-full);
      min-width: 20px;
      height: 20px;
      text-align: center;
      line-height: 1;
      box-shadow: 0 2px 4px rgba(245, 34, 45, 0.3);
    }
  }
}

.active-indicator {
  height: 0.9em;
  width: 0.9em;
  margin-left: -0.45em;
  margin-right: 8px;
  color: var(--color-primary);
  font-size: 14px;
  opacity: 0.8;
}

/* 激活指示器过渡动画 */
.nav-active-enter-active,
.nav-active-leave-active {
  transition: all 0.2s ease;
}

.nav-active-enter-from {
  opacity: 0;
  transform: translateX(-10px) scale(0.8);
}

.nav-active-leave-to {
  opacity: 0;
  transform: translateX(-10px) scale(0.8);
}

.layout-content {
  flex: 1;
  overflow: hidden;
  background: var(--color-bg-content);
  border-radius: var(--border-radius-lg) 0 0 0;
  
  .content-wrapper {
    height: 100%;
    overflow-y: auto;
    padding: 0 var(--spacing-xxl) var(--spacing-xxl);
    font-size: 14px;
    
    /* 设置页面内容样式 */
    :deep(dt) {
      border-left: 5px solid var(--color-primary);
      padding: 8px 12px;
      margin: 20px 0 15px;
      font-size: 16px;
      font-weight: 600;
      color: var(--color-text-primary);
      background: linear-gradient(90deg, 
        var(--color-primary-alpha-100) 0%, 
        transparent 100%);
      border-radius: 0 8px 8px 0;
      
      + dd h3 {
        margin-top: 0;
      }
    }
    
    :deep(dd) {
      margin-left: 0;
      
      > div {
        padding: 0 20px;
      }
    }
    
    :deep(h3) {
      font-size: 14px;
      margin: 20px 0 12px;
      color: var(--color-text-secondary);
      font-weight: 500;
    }
    
    :deep(.p) {
      padding: 6px 0;
      line-height: 1.4;
      
      .btn + .btn {
        margin-left: 10px;
      }
    }
    
    &::-webkit-scrollbar {
      width: 8px;
    }
    
    &::-webkit-scrollbar-track {
      background: transparent;
      border-radius: var(--border-radius-full);
    }
    
    &::-webkit-scrollbar-thumb {
      background: linear-gradient(180deg, var(--color-primary-alpha-300), var(--color-primary-alpha-400));
      border-radius: var(--border-radius-full);
      border: 2px solid transparent;
      background-clip: content-box;
      
      &:hover {
        background: linear-gradient(180deg, var(--color-primary-alpha-400), var(--color-primary-alpha-500));
        background-clip: content-box;
      }
    }
    
    &::-webkit-scrollbar-corner {
      background: transparent;
    }
  }
}

// 响应式设计
.sub-view-layout {
  .container();
}

// 大屏幕适配 (1200px+)
@media (min-width: 1200px) {
  .sub-view-layout {
    .layout-sidebar {
      width: 280px;
      
      .sidebar-header {
        padding: var(--spacing-xl) var(--spacing-xxl);
        
        .sidebar-title {
          font-size: var(--font-size-xl);
        }
      }
      
      .nav-item {
        padding: var(--spacing-xl) var(--spacing-xxl);
        min-height: 64px;
        
        .nav-icon {
          width: 28px;
          height: 28px;
          margin-right: var(--spacing-xl);
        }
        
        .nav-text {
          font-size: var(--font-size-lg);
        }
      }
    }
  }
}

// 平板适配 (769px - 1199px)
@media (max-width: 1199px) and (min-width: 769px) {
  .sub-view-layout {
    .layout-sidebar {
      width: 220px;
      
      .sidebar-header {
        padding: var(--spacing-lg) var(--spacing-xl);
        
        .sidebar-title {
          font-size: var(--font-size-lg);
        }
      }
      
      .nav-item {
        padding: var(--spacing-lg) var(--spacing-xl);
        min-height: 52px;
        
        .nav-icon {
          width: 22px;
          height: 22px;
          margin-right: var(--spacing-lg);
        }
        
        .nav-text {
          font-size: var(--font-size-md);
        }
      }
      
      .active-indicator {
        height: 0.8em;
        width: 0.8em;
        margin-right: 6px;
        font-size: 12px;
      }
    }
  }
}

// 平板适配 (481px - 768px)
@media (max-width: 768px) and (min-width: 481px) {
  .sub-view-layout {
    flex-direction: column;
    
    .layout-sidebar {
      width: 100%;
      height: auto;
      border-right: none;
      border-bottom: 2px solid var(--color-border-light);
      
      .sidebar-header {
        padding: var(--spacing-md) var(--spacing-lg);
        text-align: center;
        background: linear-gradient(135deg, var(--color-primary-light), var(--color-primary-alpha-200));
        
        .sidebar-title {
          font-size: var(--font-size-lg);
        }
      }
      
      .sidebar-nav {
        display: flex;
        overflow-x: auto;
        padding: var(--spacing-sm) var(--spacing-md);
        gap: var(--spacing-sm);
        
        &::-webkit-scrollbar {
          height: 4px;
        }
        
        &::-webkit-scrollbar-thumb {
          background: var(--color-primary-alpha-300);
          border-radius: var(--border-radius-full);
        }
        
        .nav-link {
          flex-shrink: 0;
          white-space: nowrap;
          margin-bottom: 0;
          margin-right: var(--spacing-sm);
          min-width: 120px;
          
          .nav-item {
            padding: var(--spacing-md) var(--spacing-lg);
            min-height: 48px;
            
            .nav-icon {
              width: 20px;
              height: 20px;
              margin-right: var(--spacing-md);
            }
            
            .nav-text {
              font-size: var(--font-size-sm);
            }
          }
        }
      }
    }
    
    .layout-content {
      .content-wrapper {
        padding: var(--spacing-lg) var(--spacing-xl);
      }
    }
    
    .active-indicator {
      height: 0.7em;
      width: 0.7em;
      margin-right: 5px;
      font-size: 11px;
    }
  }
}

// 移动端适配 (361px - 480px)
@media (max-width: 480px) and (min-width: 361px) {
  .sub-view-layout {
    flex-direction: column;
    
    .layout-sidebar {
      width: 100%;
      height: auto;
      border-right: none;
      border-bottom: 1px solid var(--color-border-light);
      
      .sidebar-header {
        padding: var(--spacing-sm) var(--spacing-md);
        text-align: center;
        
        .sidebar-title {
          font-size: var(--font-size-md);
        }
      }
      
      .sidebar-nav {
        display: flex;
        overflow-x: auto;
        padding: var(--spacing-xs) var(--spacing-sm);
        gap: var(--spacing-xs);
        
        .nav-link {
          flex-shrink: 0;
          white-space: nowrap;
          margin-bottom: 0;
          margin-right: var(--spacing-xs);
          min-width: 100px;
          
          .nav-item {
            padding: var(--spacing-sm) var(--spacing-md);
            min-height: 40px;
            
            .nav-icon {
              width: 18px;
              height: 18px;
              margin-right: var(--spacing-sm);
            }
            
            .nav-text {
              font-size: var(--font-size-xs);
            }
          }
        }
      }
    }
    
    .layout-content {
      .content-wrapper {
        padding: var(--spacing-md) var(--spacing-lg);
      }
    }
    
    .active-indicator {
      height: 0.6em;
      width: 0.6em;
      margin-right: 4px;
      font-size: 10px;
    }
  }
}

// 超小屏幕适配 (≤360px)
@media (max-width: 360px) {
  .sub-view-layout {
    flex-direction: column;
    
    .layout-sidebar {
      width: 100%;
      height: auto;
      border-right: none;
      border-bottom: 1px solid var(--color-border-light);
      
      .sidebar-header {
        padding: var(--spacing-xs) var(--spacing-sm);
        text-align: center;
        
        .sidebar-title {
          font-size: var(--font-size-sm);
        }
      }
      
      .sidebar-nav {
        display: flex;
        overflow-x: auto;
        padding: var(--spacing-xs);
        gap: var(--spacing-xs);
        
        .nav-link {
          flex-shrink: 0;
          white-space: nowrap;
          margin-bottom: 0;
          margin-right: var(--spacing-xs);
          min-width: 80px;
          
          .nav-item {
            padding: var(--spacing-xs) var(--spacing-sm);
            min-height: 36px;
            
            .nav-icon {
              width: 16px;
              height: 16px;
              margin-right: var(--spacing-xs);
            }
            
            .nav-text {
              font-size: var(--font-size-xs);
            }
          }
        }
      }
    }
    
    .layout-content {
      .content-wrapper {
        padding: var(--spacing-sm) var(--spacing-md);
      }
    }
    
    .active-indicator {
      height: 0.5em;
      width: 0.5em;
      margin-right: 3px;
      font-size: 9px;
    }
  }
}

// 暗色主题适配
:global([data-theme='dark']) {
  .sub-view-layout {
    background: linear-gradient(135deg, #0a0a0a, #141414);
    color: rgba(255, 255, 255, 0.9);
  }
  
  .layout-sidebar {
    background: linear-gradient(180deg, #1f1f1f, #141414);
    border-right-color: rgba(255, 255, 255, 0.1);
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.4);
    
    &::before {
      background: linear-gradient(180deg, rgba(24, 144, 255, 0.3), transparent, rgba(24, 144, 255, 0.3));
    }
  }
  
  .sidebar-header {
    background: linear-gradient(135deg, #2a2a2a, #1a1a1a);
    border-bottom-color: rgba(255, 255, 255, 0.1);
    
    &::after {
      background: linear-gradient(90deg, transparent, rgba(24, 144, 255, 0.4), transparent);
    }
    
    .sidebar-title {
      color: rgba(255, 255, 255, 0.95);
      background: linear-gradient(135deg, #69c0ff, #40a9ff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    }
  }
  
  .nav-link {
    color: rgba(255, 255, 255, 0.7);
    
    &::before {
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.05), transparent);
    }
    
    &:hover {
      background: rgba(255, 255, 255, 0.08);
      color: rgba(255, 255, 255, 0.9);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    }
    
    &.nav-link--active {
      background: linear-gradient(135deg, rgba(24, 144, 255, 0.25), rgba(24, 144, 255, 0.15));
      color: #69c0ff;
      border-color: rgba(24, 144, 255, 0.4);
      box-shadow: 0 4px 12px rgba(24, 144, 255, 0.3);
      
      .nav-icon {
        color: #69c0ff;
        background: rgba(24, 144, 255, 0.1);
      }
      
      .nav-text {
        color: #69c0ff;
        font-weight: var(--font-weight-semibold);
      }
      
      &::after {
        background: linear-gradient(180deg, #69c0ff, #1890ff);
        box-shadow: 2px 0 6px rgba(24, 144, 255, 0.4);
      }
      
      &:hover {
        background: linear-gradient(135deg, rgba(24, 144, 255, 0.35), rgba(24, 144, 255, 0.25));
        box-shadow: 0 6px 16px rgba(24, 144, 255, 0.4);
      }
    }
  }
  
  .active-indicator {
    color: #69c0ff;
  }
  
  .nav-item {
    .nav-icon {
      background: rgba(255, 255, 255, 0.05);
      color: rgba(255, 255, 255, 0.6);
    }
    
    .nav-text {
      color: rgba(255, 255, 255, 0.8);
    }
    
    .nav-badge .badge-text {
      background: linear-gradient(135deg, #ff4d4f, #cf1322);
      box-shadow: 0 2px 6px rgba(255, 77, 79, 0.4);
    }
  }
  
  .layout-content {
    background: linear-gradient(135deg, #0a0a0a, #141414);
    
    .content-wrapper {
      :deep(dt) {
        border-left-color: #69c0ff;
        color: rgba(255, 255, 255, 0.95);
        background: linear-gradient(90deg, 
          rgba(24, 144, 255, 0.15) 0%, 
          transparent 100%);
      }
      
      :deep(h3) {
        color: rgba(255, 255, 255, 0.7);
      }
      
      &::-webkit-scrollbar-thumb {
        background: linear-gradient(180deg, rgba(24, 144, 255, 0.4), rgba(24, 144, 255, 0.3));
        
        &:hover {
          background: linear-gradient(180deg, rgba(24, 144, 255, 0.5), rgba(24, 144, 255, 0.4));
        }
      }
    }
  }
}
</style>
