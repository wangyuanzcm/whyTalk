<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { loadSetting } from '@/utils/setting'
import { isLogin } from '@/utils/auth'
import p2pConnect from '@/p2p/P2PConnect'
import AppProvider from '@/layout/AppProvider.vue'

const isInitialized = ref(false)

const init = async () => {
  try {
    console.log('Starting app initialization...')

    // 先加载设置
    loadSetting()
    console.log('Settings loaded successfully')

    // 检查是否在Electron环境中
    if (window.electron) {
      console.log('Electron environment detected')

      // 检查是否已有有效的登录状态
      try {
        // 如果用户已登录，初始化P2P连接
        if (isLogin()) {
          console.log('User already logged in, initializing P2P...')
          await p2pConnect.connect()
          console.log('P2P connection initialized successfully')
        } else {
          console.log('User not logged in, will redirect to login page')
        }
      } catch (error) {
        console.error('Failed to initialize P2P:', error)
      }
    } else {
      console.log('Browser environment detected, skipping P2P initialization')
    }

    isInitialized.value = true
    console.log('App initialization completed')
  } catch (error) {
    console.error('Failed to initialize app:', error)
    // 即使初始化失败，也要标记为已初始化，避免页面空白
    isInitialized.value = true
  }
}

onMounted(() => {
  console.log('App mounted')

  // 初始化应用
  init()
})
</script>

<template>
  <AppProvider>
    <router-view />
  </AppProvider>
</template>
