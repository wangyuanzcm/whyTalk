/**
 * 预设主题数据
 * 从 lx-music-desktop 项目导入的主题配置
 */

import type { Theme } from '../types/theme'

/**
 * 颜色工具函数 - 用于生成主题颜色变量
 */
const RGB_Linear_Shade = (p: number, c0: string): string => {
  const i = parseInt
  const r = Math.round
  const [a, b, c, d] = c0.split(',')
  const n = p < 0
  const t = n ? 0 : 255 * p
  const P = n ? 1 + p : 1 - p
  return 'rgb' + (d ? 'a(' : '(') + r(i(a[3] === 'a' ? a.slice(5) : a.slice(4)) * P + t) + ',' + r(i(b) * P + t) + ',' + r(i(c) * P + t) + (d ? ',' + d : '') + ')'
}

const RGB_Alpha_Shade = (p: number, color: string): string => {
  const i = parseInt
  const n = p < 0
  const [r, g, b, a] = color.split(',')
  const rValue = r[3] === 'a' ? r.slice(5) : r.slice(4)
  let aValue: number
  if (a) {
    aValue = parseFloat(a)
    aValue = aValue - (n ? (1 - aValue) * p : aValue * p)
    aValue = n ? Math.max(0, aValue) : Math.min(1, aValue)
  } else {
    aValue = 1 - p
    aValue = Math.min(1, aValue)
  }
  return `rgba(${i(rValue)}, ${i(g)}, ${i(b)}, ${aValue.toFixed(2)})`
}

/**
 * 创建主题颜色变量
 */
const createThemeColors = (rgbaColor: string, fontRgbaColor: string, isDark: boolean, isDarkFont: boolean) => {
  const colors: Record<string, string> = {
    '--color-primary': rgbaColor,
  }

  let preColor = rgbaColor
  for (let i = 1; i < 11; i += 1) {
    preColor = RGB_Linear_Shade(isDark ? 0.2 : -0.1, preColor)
    colors[`--color-primary-dark-${i * 100}`] = preColor
    for (let j = 1; j < 10; j += 1) {
      colors[`--color-primary-dark-${i * 100}-alpha-${j * 100}`] = RGB_Alpha_Shade(0.1 * j, preColor)
      colors[`--color-primary-alpha-${j * 100}`] = RGB_Alpha_Shade(0.1 * j, rgbaColor)
    }
  }
  preColor = rgbaColor
  for (let i = 1; i < 10; i += 1) {
    preColor = RGB_Linear_Shade(isDark ? -0.1 : 0.2, preColor)
    colors[`--color-primary-light-${i * 100}`] = preColor
    for (let j = 1; j < 10; j += 1) {
      colors[`--color-primary-light-${i * 100}-alpha-${j * 100}`] = RGB_Alpha_Shade(0.1 * j, preColor)
    }
  }
  preColor = RGB_Linear_Shade(isDark ? -0.35 : 1, preColor)
  colors[`--color-primary-light-${1000}`] = preColor
  for (let j = 1; j < 10; j += 1) {
    colors[`--color-primary-light-${1000}-alpha-${j * 100}`] = RGB_Alpha_Shade(0.1 * j, preColor)
  }

  colors['--color-theme'] = isDark ? colors['--color-primary-light-900'] : rgbaColor

  return { ...colors, ...createFontColors(fontRgbaColor, isDark, isDarkFont) }
}

/**
 * 创建字体颜色变量
 */
const createFontColors = (rgbaColor: string, isDark: boolean, isDarkFont: boolean) => {
  const fontColor = rgbaColor ?? (isDark ? 'rgb(229, 229, 229)' : 'rgb(33, 33, 33)')
  if (isDark) return createFontDarkColors(fontColor, isDarkFont)

  const colors: Record<string, string> = {
    '--color-1000': fontColor,
  }
  const step = (isDarkFont ? 0.02 : 0.05) * (isDark ? -1 : 1)
  for (let i = 1; i < 21; i += 1) {
    colors[`--color-${String(1000 - 50 * i).padStart(3, '0')}`] = RGB_Linear_Shade(step * i, fontColor)
  }
  return colors
}

const createFontDarkColors = (rgbaColor: string, isDarkFont: boolean) => {
  const colors: Record<string, string> = {
    '--color-1000': rgbaColor,
  }
  const step = isDarkFont ? -0.015 : -0.05
  let preColor = rgbaColor
  for (let i = 1; i < 21; i += 1) {
    preColor = RGB_Linear_Shade(step, preColor)
    colors[`--color-${String(1000 - 50 * i).padStart(3, '0')}`] = preColor
  }
  return colors
}

/**
 * 默认主题配置
 */
const defaultThemes = [
  {
    id: 'green',
    name: '绿意盎然',
    isDark: false,
    isDarkFont: false,
    config: {
      primary: 'rgb(77, 175, 124)',
      font: 'rgb(33, 33, 33)',
      '--color-app-background': 'var(--color-primary-light-600-alpha-700)',
      '--color-main-background': 'rgba(255, 255, 255, 1)',
      '--color-nav-font': 'var(--color-primary)',
      '--background-image': 'none',
      '--background-image-position': 'center',
      '--background-image-size': 'cover',
      '--color-btn-hide': '#3bc2b2',
      '--color-btn-min': '#85c43b',
      '--color-btn-close': '#fab4a0',
      '--color-badge-primary': 'var(--color-primary)',
      '--color-badge-secondary': '#4baed5',
      '--color-badge-tertiary': '#e7aa36',
    },
  },
  {
    id: 'blue',
    name: '蓝田生玉',
    isDark: false,
    isDarkFont: false,
    config: {
      primary: 'rgb(52, 152, 219)',
      font: 'rgb(33, 33, 33)',
      '--color-app-background': 'var(--color-primary-light-600-alpha-700)',
      '--color-main-background': 'rgba(255, 255, 255, 1)',
      '--color-nav-font': 'var(--color-primary)',
      '--background-image': 'none',
      '--background-image-position': 'center',
      '--background-image-size': 'cover',
      '--color-btn-hide': '#3bc2b2',
      '--color-btn-min': '#85c43b',
      '--color-btn-close': '#fab4a0',
      '--color-badge-primary': 'var(--color-primary)',
      '--color-badge-secondary': '#5cbf9b',
      '--color-badge-tertiary': '#5cbf9b',
    },
  },
  {
    id: 'orange',
    name: '橙黄橘绿',
    isDark: false,
    isDarkFont: false,
    config: {
      primary: 'rgb(245, 171, 53)',
      font: 'rgb(33, 33, 33)',
      '--color-app-background': 'var(--color-primary-light-600-alpha-700)',
      '--color-main-background': 'rgba(255, 255, 255, 1)',
      '--color-nav-font': 'var(--color-primary)',
      '--background-image': 'none',
      '--background-image-position': 'center',
      '--background-image-size': 'cover',
      '--color-btn-hide': '#3bc2b2',
      '--color-btn-min': '#85c43b',
      '--color-btn-close': '#fab4a0',
      '--color-badge-primary': 'var(--color-primary)',
      '--color-badge-secondary': '#9ed458',
      '--color-badge-tertiary': '#9ed458',
    },
  },
  {
    id: 'red',
    name: '热情似火',
    isDark: false,
    isDarkFont: false,
    config: {
      primary: 'rgb(214, 69, 65)',
      font: 'rgb(33, 33, 33)',
      '--color-app-background': 'var(--color-primary-light-600-alpha-700)',
      '--color-main-background': 'rgba(255, 255, 255, 1)',
      '--color-nav-font': 'var(--color-primary)',
      '--background-image': 'none',
      '--background-image-position': 'center',
      '--background-image-size': 'cover',
      '--color-btn-hide': '#3bc2b2',
      '--color-btn-min': '#85c43b',
      '--color-btn-close': '#fab4a0',
      '--color-badge-primary': 'var(--color-primary)',
      '--color-badge-secondary': '#dfbb6b',
      '--color-badge-tertiary': '#dfbb6b',
    },
  },
  {
    id: 'pink',
    name: '粉装玉琢',
    isDark: false,
    isDarkFont: false,
    config: {
      primary: 'rgb(241, 130, 141)',
      font: 'rgb(33, 33, 33)',
      '--color-app-background': 'var(--color-primary-light-600-alpha-700)',
      '--color-main-background': 'rgba(255, 255, 255, 1)',
      '--color-nav-font': 'var(--color-primary)',
      '--background-image': 'none',
      '--background-image-position': 'center',
      '--background-image-size': 'cover',
      '--color-btn-hide': '#3bc2b2',
      '--color-btn-min': '#85c43b',
      '--color-btn-close': '#fab4a0',
      '--color-badge-primary': 'var(--color-primary)',
      '--color-badge-secondary': '#f5b684',
      '--color-badge-tertiary': '#f5b684',
    },
  },
  {
    id: 'purple',
    name: '重斤球紫',
    isDark: false,
    isDarkFont: false,
    config: {
      primary: 'rgb(155, 89, 182)',
      font: 'rgb(33, 33, 33)',
      '--color-app-background': 'var(--color-primary-light-600-alpha-700)',
      '--color-main-background': 'rgba(255, 255, 255, 1)',
      '--color-nav-font': 'var(--color-primary)',
      '--background-image': 'none',
      '--background-image-position': 'center',
      '--background-image-size': 'cover',
      '--color-btn-hide': '#3bc2b2',
      '--color-btn-min': '#85c43b',
      '--color-btn-close': '#fab4a0',
      '--color-badge-primary': 'var(--color-primary)',
      '--color-badge-secondary': '#e5a39f',
      '--color-badge-tertiary': '#e5a39f',
    },
  },
  {
    id: 'grey',
    name: '灰常美丽',
    isDark: false,
    isDarkFont: false,
    config: {
      primary: 'rgb(108, 122, 137)',
      font: 'rgb(33, 33, 33)',
      '--color-app-background': 'var(--color-primary-light-600-alpha-700)',
      '--color-main-background': 'rgba(255, 255, 255, 1)',
      '--color-nav-font': 'var(--color-primary)',
      '--background-image': 'none',
      '--background-image-position': 'center',
      '--background-image-size': 'cover',
      '--color-btn-hide': '#3bc2b2',
      '--color-btn-min': '#85c43b',
      '--color-btn-close': '#fab4a0',
      '--color-badge-primary': 'var(--color-primary)',
      '--color-badge-secondary': '#b19b9f',
      '--color-badge-tertiary': '#b19b9f',
    },
  },
  {
    id: 'ming',
    name: '青出于黑',
    isDark: false,
    isDarkFont: false,
    config: {
      primary: 'rgb(51, 110, 123)',
      font: 'rgb(33, 33, 33)',
      '--color-app-background': 'var(--color-primary-light-600-alpha-700)',
      '--color-main-background': 'rgba(255, 255, 255, 1)',
      '--color-nav-font': 'var(--color-primary)',
      '--background-image': 'none',
      '--background-image-position': 'center',
      '--background-image-size': 'cover',
      '--color-btn-hide': '#3bc2b2',
      '--color-btn-min': '#85c43b',
      '--color-btn-close': '#fab4a0',
      '--color-badge-primary': 'var(--color-primary)',
      '--color-badge-secondary': '#6376a2',
      '--color-badge-tertiary': '#6376a2',
    },
  },
  {
    id: 'blue2',
    name: '清热板蓝',
    isDark: false,
    isDarkFont: false,
    config: {
      primary: 'rgb(79, 98, 208)',
      font: 'rgb(33, 33, 33)',
      '--color-app-background': 'var(--color-primary-light-600-alpha-700)',
      '--color-main-background': 'rgba(255, 255, 255, 1)',
      '--color-nav-font': 'var(--color-primary)',
      '--background-image': 'none',
      '--background-image-position': 'center',
      '--background-image-size': 'cover',
      '--color-btn-hide': '#3bc2b2',
      '--color-btn-min': '#85c43b',
      '--color-btn-close': '#fab4a0',
      '--color-badge-primary': 'var(--color-primary)',
      '--color-badge-secondary': '#b080db',
      '--color-badge-tertiary': '#b080db',
    },
  },
  {
    id: 'black',
    name: '黑灯瞎火',
    isDark: true,
    isDarkFont: false,
    config: {
      primary: 'rgb(150, 150, 150)',
      font: 'rgb(229, 229, 229)',
      '--color-app-background': 'rgba(0, 0, 0, 0)',
      '--color-main-background': 'rgba(19, 19, 19, 0.9)',
      '--color-nav-font': 'var(--color-primary)',
      '--background-image': 'none',
      '--background-image-position': 'center',
      '--background-image-size': 'cover',
      '--color-btn-hide': '#3bc2b2',
      '--color-btn-min': '#85c43b',
      '--color-btn-close': '#fab4a0',
      '--color-badge-primary': 'var(--color-primary-dark-200)',
      '--color-badge-secondary': 'var(--color-primary)',
      '--color-badge-tertiary': 'var(--color-primary-dark-300)',
    },
  },
]

/**
 * 生成预设主题列表
 */
export const presetThemes: Theme[] = defaultThemes.map(({ config: { primary, font, ...extInfo }, ...themeInfo }) => {
  const themeColors = createThemeColors(primary, font, themeInfo.isDark, themeInfo.isDarkFont)
  return {
    ...themeInfo,
    isCustom: false,
    themeColors,
    extInfo,
  }
})

/**
 * 根据主题ID获取预设主题
 */
export const getPresetTheme = (id: string): Theme | undefined => {
  return presetThemes.find(theme => theme.id === id)
}

/**
 * 获取所有预设主题ID列表
 */
export const getPresetThemeIds = (): string[] => {
  return presetThemes.map(theme => theme.id)
}