<script lang="ts" setup>
import { onMounted } from 'vue'
import { useSettingsStore } from '@/store/modules/settings'
import { useUserStore } from '@/store/modules/user'
import { useThemeStore } from '@/store/modules/theme'
import { useMenuStore } from '@/store/modules/menu'
import { useRouter } from 'vue-router'
import { isBrowserMode } from '@/utils/browser-mock'
import AppProvider from '@/layout/AppProvider.vue'

const settingsStore = useSettingsStore()
const userStore = useUserStore()
const themeStore = useThemeStore()
const menuStore = useMenuStore()
const router = useRouter()

// 应用初始化
onMounted(async () => {
  try {
    // 检查是否在浏览器模式中
    if (isBrowserMode()) {
      console.log('Running in browser mode for style debugging')
      // 在浏览器模式下，直接导航到工作台页面进行样式调试
      router.push('/workspace')
      return
    }
    
    // 检查是否在 Electron 环境中
    if (window.electron) {
      // 在 Electron 环境中的正常逻辑
      router.push('/login')
    } else {
      // 在浏览器环境中，跳过 P2P 初始化
      console.log('Running in browser environment, skipping P2P initialization')
      router.push('/login')
    }
  } catch (error) {
    console.error('App initialization failed:', error)
    // 即使出错也导航到登录页面
    router.push('/login')
  }
})
</script>

<template>
  <AppProvider>
    <router-view />
  </AppProvider>
</template>
