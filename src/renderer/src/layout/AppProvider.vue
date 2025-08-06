<script lang="ts" setup>
import '@icon-park/vue-next/styles/index.css'
import { onMounted } from 'vue'
import { IconProvider, DEFAULT_ICON_CONFIGS } from '@icon-park/vue-next'
import { zhCN, dateZhCN } from 'naive-ui'
import hljs from 'highlight.js/lib/core'
import { NotificationApi, MessageApi, DialogApi, ModalApi } from '@/layout/common'
import {
  useThemeMode,
  useVisibilityChange,
  // useUnreadMessage, // TODO: 已迁移到插件中
  useConnectStatus,
  useClickEvent,
  useAccessPrompt
} from '@/hooks'

IconProvider({
  ...DEFAULT_ICON_CONFIGS,
  theme: 'outline',
  size: 24,
  strokeWidth: 3,
  strokeLinejoin: 'bevel'
})

const { getDarkTheme, getThemeOverride } = useThemeMode()

onMounted(() => {
  useVisibilityChange()

  if (import.meta.env.ENV == 'production') {
    useAccessPrompt()
  }

  // useUnreadMessage() // TODO: 通过插件间通信处理未读消息
  useConnectStatus()
  useClickEvent()
})
</script>

<template>
  <n-config-provider
    :theme="getDarkTheme"
    :theme-overrides="getThemeOverride"
    :locale="zhCN"
    :date-locale="dateZhCN"
    :hljs="hljs"
  >
    <n-message-provider :max="3">
      <n-notification-provider :max="3">
        <n-dialog-provider>
          <n-modal-provider>
            <message-api />
            <notification-api />
            <dialog-api />
            <modal-api />

            <n-layout-content>
              <slot></slot>
            </n-layout-content>
          </n-modal-provider>
        </n-dialog-provider>
      </n-notification-provider>
    </n-message-provider>
  </n-config-provider>
</template>
