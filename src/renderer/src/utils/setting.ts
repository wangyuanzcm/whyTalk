import { useSettingsStore } from '@/store'

/**
 * 加载用户设置
 */
export function loadSetting() {
  const settingsStore = useSettingsStore()
  
  // 这里可以添加一些设置初始化逻辑
  // 比如从本地存储加载设置、应用主题等
  
  console.log('Settings loaded:', {
    themeMode: settingsStore.themeMode,
    isPromptTone: settingsStore.isPromptTone,
    isKeyboard: settingsStore.isKeyboard,
    isNotify: settingsStore.isNotify
  })
}