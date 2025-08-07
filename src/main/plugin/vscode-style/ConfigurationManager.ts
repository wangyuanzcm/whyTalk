import { EventEmitter } from 'events'
import * as fs from 'fs'
import * as path from 'path'
import { app } from 'electron'

/**
 * 配置项接口
 */
interface ConfigItem {
  key: string
  label: string
  type: 'string' | 'number' | 'boolean' | 'select' | 'textarea'
  description?: string
  default?: any
  placeholder?: string
  readonly?: boolean
  min?: number
  max?: number
  step?: number
  rows?: number
  options?: Array<{ label: string; value: any }>
  required?: boolean
}

/**
 * 插件配置架构接口
 */
interface PluginConfigSchema {
  [key: string]: ConfigItem
}

/**
 * 配置管理器
 * 负责管理插件的配置数据存储和检索
 */
export class ConfigurationManager extends EventEmitter {
  private static instance: ConfigurationManager
  private configDir: string
  private configurations = new Map<string, any>()
  private schemas = new Map<string, PluginConfigSchema>()

  private constructor() {
    super()
    // 配置文件存储目录
    this.configDir = path.join(app.getPath('userData'), 'plugin-configs')
    this.ensureConfigDir()
    this.loadAllConfigurations()
  }

  /**
   * 获取单例实例
   */
  public static getInstance(): ConfigurationManager {
    if (!ConfigurationManager.instance) {
      ConfigurationManager.instance = new ConfigurationManager()
    }
    return ConfigurationManager.instance
  }

  /**
   * 确保配置目录存在
   */
  private ensureConfigDir(): void {
    if (!fs.existsSync(this.configDir)) {
      fs.mkdirSync(this.configDir, { recursive: true })
    }
  }

  /**
   * 加载所有配置
   */
  private loadAllConfigurations(): void {
    try {
      if (!fs.existsSync(this.configDir)) {
        return
      }

      const files = fs.readdirSync(this.configDir)
      for (const file of files) {
        if (file.endsWith('.json')) {
          const extensionId = file.replace('.json', '')
          this.loadConfiguration(extensionId)
        }
      }
    } catch (error) {
      console.error('加载配置失败:', error)
    }
  }

  /**
   * 加载指定插件的配置
   */
  private loadConfiguration(extensionId: string): void {
    try {
      const configFile = path.join(this.configDir, `${extensionId}.json`)
      if (fs.existsSync(configFile)) {
        const configData = JSON.parse(fs.readFileSync(configFile, 'utf-8'))
        this.configurations.set(extensionId, configData)
      }
    } catch (error) {
      console.error(`加载插件 ${extensionId} 配置失败:`, error)
    }
  }

  /**
   * 保存指定插件的配置
   */
  private saveConfiguration(extensionId: string): void {
    try {
      const configFile = path.join(this.configDir, `${extensionId}.json`)
      const configData = this.configurations.get(extensionId) || {}
      fs.writeFileSync(configFile, JSON.stringify(configData, null, 2), 'utf-8')
    } catch (error) {
      console.error(`保存插件 ${extensionId} 配置失败:`, error)
    }
  }

  /**
   * 注册插件配置架构
   */
  public registerConfigSchema(extensionId: string, schema: PluginConfigSchema): void {
    this.schemas.set(extensionId, schema)
    
    // 如果插件还没有配置，使用默认值初始化
    if (!this.configurations.has(extensionId)) {
      const defaultConfig: any = {}
      for (const [key, item] of Object.entries(schema)) {
        if (item.default !== undefined) {
          defaultConfig[key] = item.default
        }
      }
      this.configurations.set(extensionId, defaultConfig)
      this.saveConfiguration(extensionId)
    }
  }

  /**
   * 获取插件配置架构
   */
  public getConfigSchema(extensionId: string): ConfigItem[] | null {
    const schema = this.schemas.get(extensionId)
    if (!schema) {
      return null
    }
    
    return Object.entries(schema).map(([key, item]) => ({
      ...item,
      key
    }))
  }

  /**
   * 获取配置值
   */
  public getConfiguration(extensionId: string, section?: string): any {
    const config = this.configurations.get(extensionId) || {}
    
    if (!section) {
      return config
    }
    
    // 支持点分隔的配置路径
    const keys = section.split('.')
    let value = config
    for (const key of keys) {
      if (value && typeof value === 'object' && key in value) {
        value = value[key]
      } else {
        return undefined
      }
    }
    
    return value
  }

  /**
   * 更新配置值
   */
  public updateConfiguration(extensionId: string, section: string, value: any): void {
    let config = this.configurations.get(extensionId) || {}
    
    // 支持点分隔的配置路径
    const keys = section.split('.')
    const lastKey = keys.pop()!
    
    let current = config
    for (const key of keys) {
      if (!current[key] || typeof current[key] !== 'object') {
        current[key] = {}
      }
      current = current[key]
    }
    
    current[lastKey] = value
    
    this.configurations.set(extensionId, config)
    this.saveConfiguration(extensionId)
    
    // 触发配置变化事件
    const event = {
      extensionId,
      section,
      value,
      affectsConfiguration: (configSection: string) => {
        // 检查配置变化是否影响指定的配置节
        return section.startsWith(configSection) || configSection.startsWith(section)
      }
    }
    this.emit('configurationChanged', event)
  }

  /**
   * 获取所有插件的配置
   */
  public getAllConfigurations(): Map<string, any> {
    return new Map(this.configurations)
  }

  /**
   * 删除插件配置
   */
  public deleteConfiguration(extensionId: string): void {
    this.configurations.delete(extensionId)
    this.schemas.delete(extensionId)
    
    const configFile = path.join(this.configDir, `${extensionId}.json`)
    if (fs.existsSync(configFile)) {
      fs.unlinkSync(configFile)
    }
  }

  /**
   * 重置插件配置为默认值
   */
  public resetConfiguration(extensionId: string): void {
    const schema = this.schemas.get(extensionId)
    if (schema) {
      const defaultConfig: any = {}
      for (const [key, item] of Object.entries(schema)) {
        if (item.default !== undefined) {
          defaultConfig[key] = item.default
        }
      }
      this.configurations.set(extensionId, defaultConfig)
      this.saveConfiguration(extensionId)
      
      this.emit('configurationChanged', {
        extensionId,
        section: null,
        value: defaultConfig
      })
    }
  }

  /**
   * 监听配置变化
   */
  public onDidChangeConfiguration(listener: (event: { extensionId: string; section: string | null; value: any }) => void): () => void {
    this.on('configurationChanged', listener)
    return () => this.off('configurationChanged', listener)
  }
}