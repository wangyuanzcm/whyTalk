/**
 * 插件管理器相关类型定义
 */

/** 插件类型枚举 */
export enum PluginType {
  FRONTEND = 'frontend',
  SYSTEM = 'system'
}

/** 前端插件配置接口 */
export interface CubeModuleConfig {
  name: string
  version: string
  description?: string
  author?: string
  main: string // 入口HTML文件
  permissions?: string[]
  dependencies?: Record<string, string>
}

/** 系统插件配置接口 */
export interface SystemPluginConfig {
  name: string
  version: string
  description?: string
  author?: string
  main: string // WASM文件路径
  permissions?: string[]
  functions?: string[] // 导出的函数列表
  ui?: {
    components?: UIComponent[] // 前端组件配置
    settings?: SettingsConfig // 设置页面配置
  }
}

/** UI组件配置接口 */
export interface UIComponent {
  id: string
  type: 'button' | 'input' | 'select' | 'checkbox' | 'textarea' | 'slider' | 'color-picker'
  label: string
  description?: string
  defaultValue?: any
  options?: { label: string; value: any }[] // 用于select类型
  validation?: {
    required?: boolean
    min?: number
    max?: number
    pattern?: string
  }
  action?: string // 对应的WASM函数名
  position?: 'toolbar' | 'sidebar' | 'settings' | 'context-menu'
}

/** 设置页面配置接口 */
export interface SettingsConfig {
  title?: string
  description?: string
  sections?: SettingsSection[]
}

/** 设置页面分组接口 */
export interface SettingsSection {
  title: string
  description?: string
  components: string[] // 引用UIComponent的id
}

/** 插件实例接口 */
export interface PluginInstance {
  id: string
  type: PluginType
  config: CubeModuleConfig | SystemPluginConfig
  path: string
  enabled: boolean
  isBuiltin?: boolean // 标识是否为内置插件（开发目录中的插件）
  extismPlugin?: any // 仅系统插件使用
}
