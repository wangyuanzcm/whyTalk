/**
 * 默认主题配置
 * 基于 lx-music-desktop 的预设主题
 */

import type { Theme } from '@/types/theme'
import { createThemeColors } from './themeUtils'

/**
 * 默认主题配置数据
 */
const defaultThemeConfigs = [
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
    id: 'blue_plus',
    name: '蛋雅深蓝',
    isDark: false,
    isDarkFont: false,
    config: {
      primary: 'rgb(77, 131, 175)',
      font: 'rgb(33, 33, 33)',
      '--color-app-background': 'var(--color-primary-light-600-alpha-600)',
      '--color-main-background': 'rgba(255, 255, 255, 1)',
      '--color-nav-font': 'var(--color-primary)',
      '--background-image': 'none',
      '--background-image-position': 'center',
      '--background-image-size': 'cover',
      '--color-btn-hide': '#3bc2b2',
      '--color-btn-min': '#85c43b',
      '--color-btn-close': '#fab4a0',
      '--color-badge-primary': 'var(--color-primary)',
      '--color-badge-secondary': 'rgba(66.6, 150.7, 171, 1)',
      '--color-badge-tertiary': 'rgba(54, 196, 231, 1)',
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
      '--color-badge-secondary': '#95a5a6',
      '--color-badge-tertiary': '#95a5a6',
    },
  },
  {
    id: 'red',
    name: '中国红',
    isDark: false,
    isDarkFont: false,
    config: {
      primary: 'rgb(231, 76, 60)',
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
      '--color-badge-secondary': '#e74c3c',
      '--color-badge-tertiary': '#c0392b',
    },
  },
  {
    id: 'black',
    name: '暗夜模式',
    isDark: true,
    isDarkFont: false,
    config: {
      primary: 'rgb(77, 175, 124)',
      font: 'rgb(229, 229, 229)',
      '--color-app-background': 'var(--color-primary-dark-600-alpha-700)',
      '--color-main-background': 'rgba(30, 30, 30, 1)',
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
    id: 'dark_blue',
    name: '深蓝夜空',
    isDark: true,
    isDarkFont: false,
    config: {
      primary: 'rgb(52, 152, 219)',
      font: 'rgb(229, 229, 229)',
      '--color-app-background': 'var(--color-primary-dark-600-alpha-700)',
      '--color-main-background': 'rgba(25, 35, 45, 1)',
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
]

/**
 * 生成默认主题列表
 * @returns 默认主题数组
 */
export function createDefaultThemes(): Theme[] {
  return defaultThemeConfigs.map(({ config: { primary, font, ...extInfo }, ...themeInfo }) => {
    return {
      ...themeInfo,
      isCustom: false,
      config: {
        themeColors: createThemeColors(primary, font, themeInfo.isDark, themeInfo.isDarkFont),
        extInfo,
      },
    }
  })
}

/**
 * 获取默认主题 ID
 */
export const DEFAULT_THEME_ID = 'green'
export const DEFAULT_LIGHT_THEME_ID = 'green'
export const DEFAULT_DARK_THEME_ID = 'black'

/**
 * 根据当前时间获取推荐主题
 * @returns 推荐的主题 ID
 */
export function getRecommendedThemeId(): string {
  const now = new Date()
  const month = now.getMonth() // 0-11
  const hour = now.getHours() // 0-23
  
  // 新年期间推荐红色主题
  if (month < 2) {
    return 'red'
  }
  
  // 夜间推荐深色主题
  if (hour >= 22 || hour < 6) {
    return DEFAULT_DARK_THEME_ID
  }
  
  // 其他时间使用默认主题
  return DEFAULT_THEME_ID
}

/**
 * 获取主题分类
 * @returns 主题分类对象
 */
export function getThemeCategories() {
  return {
    light: {
      name: '浅色主题',
      themes: ['green', 'blue', 'blue_plus', 'orange', 'purple', 'grey', 'red']
    },
    dark: {
      name: '深色主题', 
      themes: ['black', 'dark_blue']
    }
  }
}