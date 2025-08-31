<script lang="ts" setup>
import SubViewLayout from '@/layout/SubViewLayout.vue'
import { Tool, Remind, LinkThree, User, Plug, SettingTwo, Download } from '@icon-park/vue-next'

const menus = [
  {
    name: '个人中心',
    path: '/settings/detail',
    icon: User
  },
  {
    name: '个性设置',
    path: '/settings/personalize',
    icon: Tool
  },
  {
    name: '绑定设置',
    path: '/settings/binding',
    icon: LinkThree
  },
  {
    name: '通知设置',
    path: '/settings/notification',
    icon: Remind
  },
  {
    name: '插件管理',
    path: '/settings/plugin',
    icon: Plug
  },
  {
    name: '菜单配置',
    path: '/settings/menu',
    icon: SettingTwo
  },
  {
    name: '应用更新',
    path: '/settings/update',
    icon: Download
  }
]
</script>

<template>
  <SubViewLayout title="我的设置" :menus="menus" />
</template>

<style lang="less" scoped>
@import '@/styles/theme/index.less';

.setting-layout {
  height: 100%;
  width: 100%;
  background: var(--color-bg-main);
  .flex-row();
  overflow: hidden;
  
  // 响应式设计
  .mobile-only() {
    .flex-column();
    
    :deep(.sub-view-layout) {
      .flex-column();
      
      .sub-view-sidebar {
        width: 100%;
        height: auto;
        max-height: 120px;
        border-right: none;
        border-bottom: 1px solid var(--color-border-light);
        overflow-x: auto;
        overflow-y: hidden;
        
        .sub-view-menu {
          .flex-start();
          flex-direction: row;
          padding: var(--spacing-sm);
          gap: var(--spacing-sm);
          
          .menu-item {
            flex-shrink: 0;
            min-width: 80px;
            text-align: center;
            white-space: nowrap;
          }
        }
      }
      
      .sub-view-content {
        flex: 1;
        min-height: 0;
        padding: var(--spacing-md);
      }
    }
  }
  
  .tablet-only() {
    :deep(.sub-view-layout) {
      .sub-view-sidebar {
        width: 200px;
      }
    }
  }
  
  // 超小屏幕优化
  .desktop-down(@breakpoint-xs) {
    :deep(.sub-view-layout) {
      .sub-view-content {
        padding: var(--spacing-sm);
      }
    }
  }
}
</style>
