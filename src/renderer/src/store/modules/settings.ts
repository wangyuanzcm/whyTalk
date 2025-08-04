import { defineStore } from 'pinia'
import { storage } from '@/utils'

export const useSettingsStore = defineStore('settings', {
  state: () => {
    return {
      isPromptTone: storage.get('isPromptTone', false), // 新消息提示音
      isKeyboard: storage.get('isKeyboard', false), // 是否推送键盘输入事件
      isLeaveWeb: false, // 是否离开网页
      isNotify: storage.get('isNotify', true), // 是否同意浏览器通知
      isFullScreen: storage.get('isFullScreen', true), // 是否客户端全屏
      themeMode: storage.get('themeMode', 'light') as string,
      currentThemeMode: storage.get('themeMode', 'light') as string,
      defaultPage: storage.get('defaultPage', '/workspace') as string // 默认进入页面
    }
  },
  actions: {
    setPromptTone(value: boolean) {
      this.isPromptTone = value
      storage.set('isPromptTone', value, null)
    },
    setKeyboard(value: boolean) {
      this.isKeyboard = value
      storage.set('isKeyboard', value, null)
    },
    setFullScreen(value: boolean) {
      this.isFullScreen = value
      storage.set('isFullScreen', value, null)
    },
    setThemeMode(value: string) {
      this.themeMode = value
      storage.set('themeMode', value, null)
    },
    setNotify(value: boolean) {
      this.isNotify = value
      storage.set('isNotify', value, null)
    },
    setDefaultPage(value: string) {
      this.defaultPage = value
      storage.set('defaultPage', value, null)
    }
  }
})
