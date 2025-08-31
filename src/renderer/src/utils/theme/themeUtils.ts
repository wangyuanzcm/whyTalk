/**
 * 主题工具函数
 * 基于 lx-music-desktop 的主题处理逻辑
 */

import type { Theme, ThemeColors, ThemeInfo, CreateThemeParams, ThemeExtInfo } from '../../types/theme'
import { rgbLinearShade, rgbAlphaShade, isValidRgbColor } from './colorUtils'

/**
 * 创建主题颜色配置
 * @param rgbaColor 主色调 RGB 值
 * @param fontRgbaColor 字体颜色 RGB 值
 * @param isDark 是否为深色主题
 * @param isDarkFont 是否为深色字体
 * @returns 完整的主题颜色配置
 */
export function createThemeColors(
  rgbaColor: string,
  fontRgbaColor?: string,
  isDark: boolean = false,
  isDarkFont: boolean = false
): ThemeColors {
  if (!isValidRgbColor(rgbaColor)) {
    throw new Error(`Invalid primary color format: ${rgbaColor}`)
  }

  const colors: Partial<ThemeColors> = {
    '--color-primary': rgbaColor,
  }

  // 生成主色调的深色变体
  let preColor = rgbaColor
  for (let i = 1; i < 11; i += 1) {
    preColor = rgbLinearShade(isDark ? 0.2 : -0.1, preColor)
    colors[`--color-primary-dark-${i * 100}` as keyof ThemeColors] = preColor
    
    // 生成透明度变体
    for (let j = 1; j < 10; j += 1) {
      colors[`--color-primary-dark-${i * 100}-alpha-${j * 100}` as keyof ThemeColors] = 
        rgbAlphaShade(0.1 * j, preColor)
      colors[`--color-primary-alpha-${j * 100}` as keyof ThemeColors] = 
        rgbAlphaShade(0.1 * j, rgbaColor)
    }
  }

  // 生成主色调的浅色变体
  preColor = rgbaColor
  for (let i = 1; i < 10; i += 1) {
    preColor = rgbLinearShade(isDark ? -0.1 : 0.2, preColor)
    colors[`--color-primary-light-${i * 100}` as keyof ThemeColors] = preColor
    
    // 生成透明度变体
    for (let j = 1; j < 10; j += 1) {
      colors[`--color-primary-light-${i * 100}-alpha-${j * 100}` as keyof ThemeColors] = 
        rgbAlphaShade(0.1 * j, preColor)
    }
  }

  // 生成最浅色变体
  preColor = rgbLinearShade(isDark ? -0.35 : 1, preColor)
  colors['--color-primary-light-1000'] = preColor
  for (let j = 1; j < 10; j += 1) {
    colors[`--color-primary-light-1000-alpha-${j * 100}` as keyof ThemeColors] = 
      rgbAlphaShade(0.1 * j, preColor)
  }

  // 设置主题色
  colors['--color-theme'] = isDark ? colors['--color-primary-light-900'] : rgbaColor

  // 合并字体颜色
  const fontColors = createFontColors(fontRgbaColor, isDark, isDarkFont)
  
  return { ...colors, ...fontColors } as ThemeColors
}

/**
 * 创建字体颜色配置
 * @param rgbaColor 字体颜色 RGB 值
 * @param isDark 是否为深色主题
 * @param isDarkFont 是否为深色字体
 * @returns 字体颜色配置
 */
function createFontColors(
  rgbaColor?: string,
  isDark: boolean = false,
  isDarkFont: boolean = false
): Partial<ThemeColors> {
  // 默认字体颜色
  const defaultColor = isDark ? 'rgb(229, 229, 229)' : 'rgb(33, 33, 33)'
  const fontColor = rgbaColor && isValidRgbColor(rgbaColor) ? rgbaColor : defaultColor

  if (isDark) {
    return createFontDarkColors(fontColor, isDarkFont)
  }

  const colors: Record<string, string> = {
    '--color-1000': fontColor,
  }

  const step = (isDarkFont ? 0.02 : 0.05) * (isDark ? -1 : 1)
  for (let i = 1; i < 21; i += 1) {
    colors[`--color-${String(1000 - 50 * i).padStart(3, '0')}`] = 
      rgbLinearShade(step * i, fontColor)
  }

  return colors
}

/**
 * 创建深色主题的字体颜色配置
 * @param rgbaColor 字体颜色 RGB 值
 * @param isDarkFont 是否为深色字体
 * @returns 深色主题字体颜色配置
 */
function createFontDarkColors(
  rgbaColor: string,
  isDarkFont: boolean = false
): Record<string, string> {
  const colors: Record<string, string> = {
    '--color-1000': rgbaColor,
  }

  const step = isDarkFont ? -0.015 : -0.05
  let preColor = rgbaColor
  
  for (let i = 1; i < 21; i += 1) {
    preColor = rgbLinearShade(step, preColor)
    colors[`--color-${String(1000 - 50 * i).padStart(3, '0')}`] = preColor
  }

  return colors
}

/**
 * 构建主题背景图片 URL
 * @param imagePath 图片路径
 * @param dataPath 数据路径
 * @returns 完整的背景图片 URL
 */
export function buildBgUrl(imagePath: string, dataPath: string): string {
  if (imagePath === 'none' || !imagePath) {
    return 'none'
  }
  
  if (imagePath.startsWith('url(')) {
    return imagePath
  }
  
  if (imagePath.startsWith('http')) {
    return `url(${imagePath})`
  }
  
  // 本地文件路径处理
  const fullPath = imagePath.startsWith('./') 
    ? imagePath 
    : `${dataPath}/${imagePath}`
    
  return `url(${fullPath})`
}

/**
 * 构建主题颜色配置
 * @param theme 主题对象
 * @param dataPath 数据路径
 * @returns 完整的颜色配置对象
 */
export function buildThemeColors(theme: Theme, dataPath: string = ''): Record<string, string> {
  // 安全检查，确保主题对象和配置存在
  if (!theme || !theme.config) {
    return {}
  }

  let processedTheme = theme
  
  // 处理自定义主题的背景图片
  if (theme.isCustom && theme.config.extInfo && theme.config.extInfo['--background-image'] !== 'none') {
    processedTheme = copyTheme(theme)
    if (processedTheme.config.extInfo) {
      processedTheme.config.extInfo['--background-image'] = 
        buildBgUrl(theme.config.extInfo['--background-image'], dataPath)
    }
  }
  
  return {
    ...(processedTheme.config.themeColors || {}),
    ...(processedTheme.config.extInfo || {}),
  }
}

/**
 * 复制主题对象
 * @param theme 要复制的主题
 * @returns 复制后的主题对象
 */
export function copyTheme(theme: Theme): Theme {
  return {
    ...theme,
    config: {
      ...theme.config,
      extInfo: { ...theme.config.extInfo },
      themeColors: { ...theme.config.themeColors },
    },
  }
}

/**
 * 在主题信息中查找指定主题
 * @param themeInfo 主题信息对象
 * @param id 主题 ID
 * @returns 找到的主题对象或 undefined
 */
export function findTheme(themeInfo: ThemeInfo, id: string): Theme | undefined {
  // 先在系统主题中查找
  let theme = themeInfo.themes.find(theme => theme.id === id)
  if (theme) return theme
  
  // 再在用户自定义主题中查找
  theme = themeInfo.userThemes.find(theme => theme.id === id)
  return theme
}

/**
 * 创建新主题
 * @param params 主题创建参数
 * @returns 新创建的主题对象
 */
export function createTheme(params: CreateThemeParams): Theme {
  const {
    id = generateThemeId(),
    name,
    primary,
    font,
    isDark = false,
    isDarkFont = false,
    extInfo = {}
  } = params

  if (!isValidRgbColor(primary)) {
    throw new Error(`Invalid primary color: ${primary}`)
  }

  if (font && !isValidRgbColor(font)) {
    throw new Error(`Invalid font color: ${font}`)
  }

  // 创建默认扩展信息
  const defaultExtInfo: ThemeExtInfo = {
    '--color-app-background': isDark 
      ? 'var(--color-primary-dark-600-alpha-700)' 
      : 'var(--color-primary-light-600-alpha-700)',
    '--color-main-background': isDark 
      ? 'rgba(30, 30, 30, 1)' 
      : 'rgba(255, 255, 255, 1)',
    '--color-nav-font': 'var(--color-primary)',
    '--background-image': 'none',
    '--background-image-position': 'center',
    '--background-image-size': 'cover',
    '--color-btn-hide': '#3bc2b2',
    '--color-btn-min': '#85c43b',
    '--color-btn-close': '#fab4a0',
    '--color-badge-primary': 'var(--color-primary)',
    '--color-badge-secondary': isDark ? '#4baed5' : '#5cbf9b',
    '--color-badge-tertiary': isDark ? '#e7aa36' : '#5cbf9b',
    ...extInfo
  }

  return {
    id,
    name,
    isDark,
    isDarkFont,
    isCustom: true,
    config: {
      themeColors: createThemeColors(primary, font, isDark, isDarkFont),
      extInfo: defaultExtInfo
    }
  }
}

/**
 * 生成唯一的主题 ID
 * @returns 主题 ID
 */
function generateThemeId(): string {
  return `custom_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

/**
 * 验证主题对象
 * @param theme 主题对象
 * @returns 是否为有效主题
 */
export function validateTheme(theme: any): theme is Theme {
  return (
    typeof theme === 'object' &&
    typeof theme.id === 'string' &&
    typeof theme.name === 'string' &&
    typeof theme.isDark === 'boolean' &&
    typeof theme.isDarkFont === 'boolean' &&
    typeof theme.isCustom === 'boolean' &&
    typeof theme.config === 'object' &&
    typeof theme.config.themeColors === 'object' &&
    typeof theme.config.extInfo === 'object'
  )
}

/**
 * 获取主题预览颜色
 * @param theme 主题对象
 * @returns 预览颜色配置
 */
export function getThemePreviewColors(theme: Theme): {
  primary: string
  background: string
  surface: string
  text: string
  border: string
} {
  // 安全检查，确保主题对象和配置存在
  if (!theme || !theme.config || !theme.config.themeColors) {
    return {
      primary: '#007bff',
      background: '#ffffff',
      surface: '#f8f9fa',
      text: '#333333',
      border: '#e0e0e0'
    }
  }

  const themeColors = theme.config.themeColors
  const extInfo = theme.config.extInfo || {}
  
  return {
    primary: themeColors['--color-primary'] || '#007bff',
    background: extInfo['--color-main-background'] || (theme.isDark ? '#1a1a1a' : '#ffffff'),
    surface: extInfo['--color-content-background'] || (theme.isDark ? '#2a2a2a' : '#f8f9fa'),
    text: themeColors['--color-1000'] || (theme.isDark ? '#ffffff' : '#333333'),
    border: themeColors['--color-primary-light-800'] || (theme.isDark ? '#404040' : '#e0e0e0')
  }
}