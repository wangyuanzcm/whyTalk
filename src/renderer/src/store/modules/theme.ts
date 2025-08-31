/**
 * 主题状态管理 Store
 * 使用 Pinia 管理主题状态和切换逻辑
 */

import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import type { Theme, ThemeInfo, CreateThemeParams, ThemeApplyOptions } from '../../types/theme'
import {
  createDefaultThemes,
  DEFAULT_THEME_ID,
  DEFAULT_LIGHT_THEME_ID,
  DEFAULT_DARK_THEME_ID,
  getRecommendedThemeId
} from '../../utils/theme/defaultThemes'
import { presetThemes } from '../../data/presetThemes'
import {
  buildThemeColors,
  findTheme,
  createTheme,
  copyTheme,
  validateTheme,
  getThemePreviewColors
} from '../../utils/theme/themeUtils'

/**
 * 主题 Store
 */
export const useThemeStore = defineStore('theme', () => {
  // 状态
  const themes = ref<Theme[]>([])
  const userThemes = ref<Theme[]>([])
  const currentThemeId = ref<string>(DEFAULT_THEME_ID)
  const lightThemeId = ref<string>(DEFAULT_LIGHT_THEME_ID)
  const darkThemeId = ref<string>(DEFAULT_DARK_THEME_ID)
  const autoTheme = ref<boolean>(false)
  const dataPath = ref<string>('')
  const isLoading = ref<boolean>(false)
  const error = ref<string | null>(null)

  // 计算属性
  const allThemes = computed(() => [...themes.value, ...userThemes.value])

  const currentTheme = computed(() => {
    const themeId = autoTheme.value
      ? shouldUseDarkColors.value
        ? darkThemeId.value
        : lightThemeId.value
      : currentThemeId.value

    return (
      findTheme(
        { themes: themes.value, userThemes: userThemes.value, dataPath: dataPath.value },
        themeId
      ) || themes.value.find((t) => t.id === DEFAULT_THEME_ID)
    )
  })

  const shouldUseDarkColors = computed(() => {
    // 检测系统深色模式偏好
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    return false
  })

  const themeInfo = computed(
    (): ThemeInfo => ({
      themes: themes.value,
      userThemes: userThemes.value,
      dataPath: dataPath.value
    })
  )

  const lightThemes = computed(() => allThemes.value.filter((theme) => !theme.isDark))
  const darkThemes = computed(() => allThemes.value.filter((theme) => theme.isDark))

  const currentThemeColors = computed(() => {
    if (!currentTheme.value) return {}
    return buildThemeColors(currentTheme.value, dataPath.value)
  })

  // 方法
  /**
   * 初始化主题系统
   */
  async function initThemes() {
    try {
      isLoading.value = true
      error.value = null

      // 加载默认主题和预设主题
      const defaultThemes = createDefaultThemes()
      themes.value = [...defaultThemes, ...presetThemes]

      // 从本地存储加载用户主题
      await loadUserThemes()

      // 从本地存储加载主题设置
      await loadThemeSettings()

      // 应用当前主题
      await applyCurrentTheme()
    } catch (err) {
      error.value = err instanceof Error ? err.message : '初始化主题失败'
      console.error('Theme initialization failed:', err)
    } finally {
      isLoading.value = false
    }
  }

  /**
   * 加载用户自定义主题
   */
  async function loadUserThemes() {
    try {
      const stored = localStorage.getItem('user-themes')
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed)) {
          userThemes.value = parsed.filter(validateTheme)
        }
      }
    } catch (err) {
      console.error('Failed to load user themes:', err)
    }
  }

  /**
   * 保存用户自定义主题
   */
  async function saveUserThemes() {
    try {
      localStorage.setItem('user-themes', JSON.stringify(userThemes.value))
    } catch (err) {
      console.error('Failed to save user themes:', err)
    }
  }

  /**
   * 加载主题设置
   */
  async function loadThemeSettings() {
    try {
      const settings = localStorage.getItem('theme-settings')
      if (settings) {
        const parsed = JSON.parse(settings)
        currentThemeId.value = parsed.currentThemeId || DEFAULT_THEME_ID
        lightThemeId.value = parsed.lightThemeId || DEFAULT_LIGHT_THEME_ID
        darkThemeId.value = parsed.darkThemeId || DEFAULT_DARK_THEME_ID
        autoTheme.value = parsed.autoTheme || false
      } else {
        // 首次使用，设置推荐主题
        currentThemeId.value = getRecommendedThemeId()
      }
    } catch (err) {
      console.error('Failed to load theme settings:', err)
    }
  }

  /**
   * 保存主题设置
   */
  async function saveThemeSettings() {
    try {
      const settings = {
        currentThemeId: currentThemeId.value,
        lightThemeId: lightThemeId.value,
        darkThemeId: darkThemeId.value,
        autoTheme: autoTheme.value
      }
      localStorage.setItem('theme-settings', JSON.stringify(settings))
    } catch (err) {
      console.error('Failed to save theme settings:', err)
    }
  }

  /**
   * 应用主题
   */
  async function applyTheme(options: ThemeApplyOptions) {
    try {
      const { id, lightId, darkId, auto } = options

      if (auto !== undefined) {
        autoTheme.value = auto
      }

      if (lightId) {
        lightThemeId.value = lightId
      }

      if (darkId) {
        darkThemeId.value = darkId
      }

      if (id) {
        currentThemeId.value = id
      }

      await applyCurrentTheme()
      await saveThemeSettings()
    } catch (err) {
      error.value = err instanceof Error ? err.message : '应用主题失败'
      console.error('Failed to apply theme:', err)
    }
  }

  /**
   * 应用当前主题
   */
  async function applyCurrentTheme() {
    if (!currentTheme.value) return

    const colors = buildThemeColors(currentTheme.value, dataPath.value)
    setThemeColors(colors)
  }

  /**
   * 设置主题颜色到 CSS 变量
   */
  function setThemeColors(colors: Record<string, string>) {
    if (typeof document === 'undefined') return

    const root = document.documentElement

    // 清除之前的主题变量
    const existingVars = Array.from(root.style).filter((prop) => prop.startsWith('--color'))
    existingVars.forEach((prop) => root.style.removeProperty(prop))

    // 设置新的主题变量
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(key, value)
    })

    // 设置主题类名
    const themeClass = currentTheme.value?.isDark ? 'dark-theme' : 'light-theme'
    root.className = root.className.replace(/(?:^|\s)(?:dark|light)-theme(?!\S)/g, '')
    root.classList.add(themeClass)
  }

  /**
   * 创建新主题
   */
  async function addTheme(params: CreateThemeParams): Promise<Theme> {
    try {
      const newTheme = createTheme(params)

      // 检查主题 ID 是否已存在
      if (findTheme(themeInfo.value, newTheme.id)) {
        throw new Error(`主题 ID "${newTheme.id}" 已存在`)
      }

      userThemes.value.push(newTheme)
      await saveUserThemes()

      return newTheme
    } catch (err) {
      error.value = err instanceof Error ? err.message : '创建主题失败'
      throw err
    }
  }

  /**
   * 更新主题
   */
  async function updateTheme(updatedTheme: Theme) {
    try {
      if (!updatedTheme.isCustom) {
        throw new Error('无法修改系统预设主题')
      }

      const index = userThemes.value.findIndex((theme) => theme.id === updatedTheme.id)
      if (index === -1) {
        throw new Error('主题不存在')
      }

      userThemes.value[index] = updatedTheme
      await saveUserThemes()

      // 如果更新的是当前主题，重新应用
      if (currentTheme.value?.id === updatedTheme.id) {
        await applyCurrentTheme()
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : '更新主题失败'
      throw err
    }
  }

  /**
   * 删除主题
   */
  async function deleteTheme(themeId: string) {
    try {
      const theme = userThemes.value.find((t) => t.id === themeId)
      if (!theme) {
        throw new Error('主题不存在')
      }

      if (!theme.isCustom) {
        throw new Error('无法删除系统预设主题')
      }

      userThemes.value = userThemes.value.filter((t) => t.id !== themeId)
      await saveUserThemes()

      // 如果删除的是当前主题，切换到默认主题
      if (currentTheme.value?.id === themeId) {
        await applyTheme({ id: DEFAULT_THEME_ID })
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : '删除主题失败'
      throw err
    }
  }

  /**
   * 复制主题
   */
  async function duplicateTheme(themeId: string, newName?: string): Promise<Theme> {
    try {
      const originalTheme = findTheme(themeInfo.value, themeId)
      if (!originalTheme) {
        throw new Error('主题不存在')
      }

      const duplicatedTheme = copyTheme(originalTheme)
      duplicatedTheme.id = `${originalTheme.id}_copy_${Date.now()}`
      duplicatedTheme.name = newName || `${originalTheme.name} (副本)`
      duplicatedTheme.isCustom = true

      userThemes.value.push(duplicatedTheme)
      await saveUserThemes()

      return duplicatedTheme
    } catch (err) {
      error.value = err instanceof Error ? err.message : '复制主题失败'
      throw err
    }
  }

  /**
   * 获取主题预览颜色
   */
  function getPreviewColors(themeId: string) {
    const theme = findTheme(themeInfo.value, themeId)
    return theme ? getThemePreviewColors(theme) : null
  }

  /**
   * 重置主题设置
   */
  async function resetThemeSettings() {
    try {
      currentThemeId.value = DEFAULT_THEME_ID
      lightThemeId.value = DEFAULT_LIGHT_THEME_ID
      darkThemeId.value = DEFAULT_DARK_THEME_ID
      autoTheme.value = false

      await applyCurrentTheme()
      await saveThemeSettings()
    } catch (err) {
      error.value = err instanceof Error ? err.message : '重置主题设置失败'
      throw err
    }
  }

  /**
   * 清除错误状态
   */
  function clearError() {
    error.value = null
  }

  // 监听系统深色模式变化
  if (typeof window !== 'undefined' && window.matchMedia) {
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)')
    darkModeQuery.addEventListener('change', () => {
      if (autoTheme.value) {
        applyCurrentTheme()
      }
    })
  }

  // 监听主题变化，自动保存设置
  watch(
    [currentThemeId, lightThemeId, darkThemeId, autoTheme],
    () => {
      saveThemeSettings()
    },
    { deep: true }
  )

  return {
    // 状态
    themes,
    userThemes,
    currentThemeId,
    lightThemeId,
    darkThemeId,
    autoTheme,
    dataPath,
    isLoading,
    error,

    // 计算属性
    allThemes,
    currentTheme,
    shouldUseDarkColors,
    themeInfo,
    lightThemes,
    darkThemes,
    currentThemeColors,

    // 方法
    initTheme: initThemes,
    initThemes,
    applyTheme,
    addTheme,
    updateTheme,
    deleteTheme,
    duplicateTheme,
    getPreviewColors,
    resetThemeSettings,
    clearError
  }
})
