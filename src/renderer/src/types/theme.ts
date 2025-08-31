/**
 * 主题系统类型定义
 * 基于 lx-music-desktop 的主题架构
 */

/**
 * 主题颜色配置接口
 * 包含完整的颜色变量定义
 */
export interface ThemeColors {
  // 基础颜色系列 (000-1000)
  '--color-000': string
  '--color-050': string
  '--color-100': string
  '--color-150': string
  '--color-200': string
  '--color-250': string
  '--color-300': string
  '--color-350': string
  '--color-400': string
  '--color-450': string
  '--color-500': string
  '--color-550': string
  '--color-600': string
  '--color-650': string
  '--color-700': string
  '--color-750': string
  '--color-800': string
  '--color-850': string
  '--color-900': string
  '--color-950': string
  '--color-1000': string

  // 主题色
  '--color-theme': string
  '--color-primary': string

  // 主色调透明度变体
  '--color-primary-alpha-100': string
  '--color-primary-alpha-200': string
  '--color-primary-alpha-300': string
  '--color-primary-alpha-400': string
  '--color-primary-alpha-500': string
  '--color-primary-alpha-600': string
  '--color-primary-alpha-700': string
  '--color-primary-alpha-800': string
  '--color-primary-alpha-900': string

  // 主色调深色变体及其透明度
  '--color-primary-dark-100': string
  '--color-primary-dark-100-alpha-100': string
  '--color-primary-dark-100-alpha-200': string
  '--color-primary-dark-100-alpha-300': string
  '--color-primary-dark-100-alpha-400': string
  '--color-primary-dark-100-alpha-500': string
  '--color-primary-dark-100-alpha-600': string
  '--color-primary-dark-100-alpha-700': string
  '--color-primary-dark-100-alpha-800': string
  '--color-primary-dark-100-alpha-900': string

  // 更多深色变体 (200-1000)
  '--color-primary-dark-200': string
  '--color-primary-dark-300': string
  '--color-primary-dark-400': string
  '--color-primary-dark-500': string
  '--color-primary-dark-600': string
  '--color-primary-dark-700': string
  '--color-primary-dark-800': string
  '--color-primary-dark-900': string
  '--color-primary-dark-1000': string

  // 主色调浅色变体及其透明度
  '--color-primary-light-100': string
  '--color-primary-light-100-alpha-100': string
  '--color-primary-light-100-alpha-200': string
  '--color-primary-light-100-alpha-300': string
  '--color-primary-light-100-alpha-400': string
  '--color-primary-light-100-alpha-500': string
  '--color-primary-light-100-alpha-600': string
  '--color-primary-light-100-alpha-700': string
  '--color-primary-light-100-alpha-800': string
  '--color-primary-light-100-alpha-900': string

  // 更多浅色变体 (200-1000)
  '--color-primary-light-200': string
  '--color-primary-light-300': string
  '--color-primary-light-400': string
  '--color-primary-light-500': string
  '--color-primary-light-600': string
  '--color-primary-light-700': string
  '--color-primary-light-800': string
  '--color-primary-light-900': string
  '--color-primary-light-1000': string

  // 其他浅色变体的透明度 (简化表示)
  [key: string]: string // 允许其他动态生成的颜色变体
}

/**
 * 主题扩展信息接口
 * 包含背景、按钮、徽章等特殊颜色配置
 */
export interface ThemeExtInfo {
  // 背景相关
  '--color-app-background': string
  '--color-main-background': string
  '--color-nav-font': string
  '--background-image': string
  '--background-image-position': string
  '--background-image-size': string

  // 窗口控制按钮颜色
  '--color-btn-hide': string
  '--color-btn-min': string
  '--color-btn-close': string

  // 徽章颜色
  '--color-badge-primary': string
  '--color-badge-secondary': string
  '--color-badge-tertiary': string
}

/**
 * 主题配置接口
 */
export interface ThemeConfig {
  themeColors: ThemeColors
  extInfo: ThemeExtInfo
}

/**
 * 主题接口
 */
export interface Theme {
  id: string
  name: string
  isDark: boolean
  isDarkFont: boolean
  isCustom: boolean
  config: ThemeConfig
}

/**
 * 主题信息接口
 * 包含系统主题和用户自定义主题
 */
export interface ThemeInfo {
  themes: Theme[] // 系统预设主题
  userThemes: Theme[] // 用户自定义主题
  dataPath: string // 主题数据路径
}

/**
 * 主题设置接口
 */
export interface ThemeSetting {
  shouldUseDarkColors: boolean
  theme: {
    id: string
    name: string
    isDark: boolean
    colors: Record<string, string>
  }
}

/**
 * 主题创建参数接口
 */
export interface CreateThemeParams {
  id?: string
  name: string
  primary: string // 主色调 RGB 值
  font?: string // 字体颜色 RGB 值
  isDark?: boolean
  isDarkFont?: boolean
  extInfo?: Partial<ThemeExtInfo>
}

/**
 * 主题应用选项接口
 */
export interface ThemeApplyOptions {
  id: string
  lightId?: string
  darkId?: string
  auto?: boolean
}

/**
 * 颜色工具函数类型
 */
export type ColorShadeFunction = (percentage: number, color: string) => string
export type ColorBlendFunction = (percentage: number, color1: string, color2: string) => string
export type ColorAlphaFunction = (alpha: number, color: string) => string

/**
 * 主题事件类型
 */
export interface ThemeEvents {
  'theme-changed': (theme: Theme) => void
  'theme-created': (theme: Theme) => void
  'theme-deleted': (themeId: string) => void
  'theme-updated': (theme: Theme) => void
}

/**
 * 主题管理器接口
 */
export interface ThemeManager {
  // 主题获取
  getThemes(): Promise<ThemeInfo>
  getTheme(id: string): Theme | undefined
  getCurrentTheme(): Theme | undefined

  // 主题应用
  applyTheme(options: ThemeApplyOptions): void
  setTheme(colors: Record<string, string>): void

  // 主题管理
  createTheme(params: CreateThemeParams): Theme
  updateTheme(theme: Theme): void
  deleteTheme(id: string): void
  copyTheme(theme: Theme): Theme

  // 工具方法
  buildThemeColors(theme: Theme, dataPath?: string): Record<string, string>
  findTheme(id: string): Theme | undefined
}
