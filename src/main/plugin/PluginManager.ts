import { app, ipcMain } from 'electron'
import { join } from 'path'
import { readFileSync, existsSync, readdirSync, statSync, writeFileSync, mkdirSync, rmSync, createReadStream } from 'fs'
import { createWriteStream } from 'fs'
import { pipeline } from 'stream'
import { promisify } from 'util'
import * as https from 'https'
import * as http from 'http'
import * as yauzl from 'yauzl'
// import { createExtism, Plugin } from '@extism/extism'
// 使用自定义的 WASM 插件运行器替代 Extism
import { wasmPluginRunner, WasmExecutionResult } from './WasmPluginRunner'
import { getPluginDatabase, PluginDatabase } from './PluginDatabase'
type Plugin = any

// 插件类型枚举
export enum PluginType {
  FRONTEND = 'frontend',
  SYSTEM = 'system'
}

// 前端插件配置接口
export interface CubeModuleConfig {
  name: string
  version: string
  description?: string
  author?: string
  main: string // 入口HTML文件
  permissions?: string[]
  dependencies?: Record<string, string>
}

// 系统插件配置接口
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

// UI组件配置接口
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

// 设置页面配置接口
export interface SettingsConfig {
  title?: string
  description?: string
  sections?: SettingsSection[]
}

export interface SettingsSection {
  title: string
  description?: string
  components: string[] // 引用UIComponent的id
}

// 插件实例接口
export interface PluginInstance {
  id: string
  type: PluginType
  config: CubeModuleConfig | SystemPluginConfig
  path: string
  enabled: boolean
  extismPlugin?: Plugin // 仅系统插件使用
}

/**
 * 插件管理器
 * 负责插件的加载、管理和执行
 */
export class PluginManager {
  private plugins: Map<string, PluginInstance> = new Map()
  private pluginsDir: string
  private database: PluginDatabase
  // private extism: any // 暂时未使用

  constructor() {
    // 在开发环境中使用项目根目录的 plugins 文件夹
    // 在生产环境中使用用户数据目录的 plugins 文件夹
    if (process.env.NODE_ENV === 'development' || !app.isPackaged) {
      // 开发环境：使用项目根目录的 plugins 文件夹
      this.pluginsDir = join(process.cwd(), 'plugins')
    } else {
      // 生产环境：使用用户数据目录的 plugins 文件夹
      this.pluginsDir = join(app.getPath('userData'), 'plugins')
    }
    
    console.log(`Plugin directory: ${this.pluginsDir}`)
    this.database = getPluginDatabase()
    this.initializeExtism()
    this.setupIpcHandlers()
  }

  /**
   * 初始化Extism运行时
   */
  private async initializeExtism() {
    // 使用自定义的 WASM 运行器替代 Extism
    console.log('Initializing WASM plugin runner...')
    // this.extism = wasmPluginRunner // 暂时未使用
    console.log('WASM plugin runner initialized successfully')
  }

  /**
   * 设置IPC处理器
   */
  private setupIpcHandlers() {
    // 获取所有插件列表
    ipcMain.handle('plugin:list', () => {
      return Array.from(this.plugins.values()).map(plugin => ({
        id: plugin.id,
        type: plugin.type,
        config: plugin.config,
        enabled: plugin.enabled
      }))
    })

    // 启用/禁用插件
    ipcMain.handle('plugin:toggle', (_, pluginId: string) => {
      const plugin = this.plugins.get(pluginId)
      if (plugin) {
        plugin.enabled = !plugin.enabled
        return { success: true, enabled: plugin.enabled }
      }
      return { success: false, error: 'Plugin not found' }
    })

    // 执行系统插件函数
    ipcMain.handle('plugin:execute', async (_, pluginId: string, functionName: string, input?: any) => {
      return await this.executeSystemPlugin(pluginId, functionName, input)
    })

    // 获取前端插件内容
    ipcMain.handle('plugin:frontend:load', (_, pluginId: string) => {
      return this.loadFrontendPlugin(pluginId)
    })

    // 获取系统插件的导出函数列表
    ipcMain.handle('plugin:system:exports', (_, pluginId: string) => {
      const plugin = this.plugins.get(pluginId)
      if (!plugin || plugin.type !== PluginType.SYSTEM) {
        return { success: false, error: 'System plugin not found' }
      }
      
      const exports = wasmPluginRunner.getExports(pluginId)
      return { success: true, exports }
    })

    // 注意：plugin:system:info 处理器已在 PluginAPIHandler 中注册，避免重复注册

    // 重新加载系统插件
    ipcMain.handle('plugin:system:reload', async (_, pluginId: string) => {
      const plugin = this.plugins.get(pluginId)
      if (!plugin || plugin.type !== PluginType.SYSTEM) {
        return { success: false, error: 'System plugin not found' }
      }
      
      // 卸载现有模块
      wasmPluginRunner.unloadModule(pluginId)
      
      // 重新加载
      const configPath = join(plugin.path, 'cubeModule.json')
      await this.loadSystemPluginFromPath(plugin.path, configPath)
      
      return { success: true }
    })
  }

  /**
   * 扫描并加载所有插件
   */
  public async loadAllPlugins() {
    if (!existsSync(this.pluginsDir)) {
      console.log('Plugins directory does not exist, creating...')
      require('fs').mkdirSync(this.pluginsDir, { recursive: true })
      return
    }

    const pluginDirs = readdirSync(this.pluginsDir).filter(dir => {
      const fullPath = join(this.pluginsDir, dir)
      return statSync(fullPath).isDirectory()
    })

    for (const dir of pluginDirs) {
      await this.loadPlugin(join(this.pluginsDir, dir))
    }

    console.log(`Loaded ${this.plugins.size} plugins`)
  }

  /**
   * 加载单个插件
   */
  private async loadPlugin(pluginPath: string) {
    try {
      // 检查 cubeModule.json 配置文件
      const cubeConfigPath = join(pluginPath, 'cubeModule.json')
      if (existsSync(cubeConfigPath)) {
        // 读取配置文件确定插件类型
        const configContent = readFileSync(cubeConfigPath, 'utf-8')
        const config = JSON.parse(configContent)
        
        if (config.type === 'system') {
          await this.loadSystemPluginFromPath(pluginPath, cubeConfigPath)
        } else {
          // 默认为前端插件
          await this.loadFrontendPluginFromPath(pluginPath, cubeConfigPath)
        }
        return
      }

      // 检查是否为旧格式的系统插件
      const systemConfigPath = join(pluginPath, 'plugin.json')
      if (existsSync(systemConfigPath)) {
        await this.loadSystemPluginFromPath(pluginPath, systemConfigPath)
        return
      }

      console.warn(`No valid plugin configuration found in ${pluginPath}`)
    } catch (error) {
      console.error(`Failed to load plugin from ${pluginPath}:`, error)
    }
  }

  /**
   * 加载前端插件
   */
  private async loadFrontendPluginFromPath(pluginPath: string, configPath: string) {
    const configContent = readFileSync(configPath, 'utf-8')
    const config: CubeModuleConfig = JSON.parse(configContent)

    // 验证入口文件是否存在
    const mainPath = join(pluginPath, config.main)
    if (!existsSync(mainPath)) {
      throw new Error(`Main file ${config.main} not found`)
    }

    const pluginId = `frontend_${config.name}_${config.version}`
    const plugin: PluginInstance = {
      id: pluginId,
      type: PluginType.FRONTEND,
      config,
      path: pluginPath,
      enabled: true
    }

    this.plugins.set(pluginId, plugin)
    console.log(`Loaded frontend plugin: ${config.name} v${config.version}`)
  }

  /**
   * 加载系统插件
   */
  private async loadSystemPluginFromPath(pluginPath: string, configPath: string) {
    try {
      const configContent = readFileSync(configPath, 'utf-8')
      const config: SystemPluginConfig = JSON.parse(configContent)
      
      // 验证必要字段
      if (!config.name || !config.main) {
        console.error(`Invalid system plugin config: ${configPath}`)
        return
      }

      const mainPath = join(pluginPath, config.main)
      if (!existsSync(mainPath)) {
        console.error(`Main file not found: ${mainPath}`)
        return
      }

      // 检查main文件类型
      const isHtmlFile = config.main.endsWith('.html')
      let hasWasmModule = false

      if (isHtmlFile) {
        // 如果main是HTML文件，检查是否有对应的WASM文件
        const wasmPath = join(pluginPath, 'plugin.wasm')
        if (existsSync(wasmPath)) {
          // 验证 WASM 文件
          const isValid = await wasmPluginRunner.validateWasmFile(wasmPath)
          if (isValid) {
            // 加载 WASM 模块
            const loaded = await wasmPluginRunner.loadModule(config.name, wasmPath)
            if (loaded) {
              hasWasmModule = true
              console.log(`WASM module loaded for system plugin: ${config.name}`)
            } else {
              console.warn(`Failed to load WASM module for: ${config.name}`)
            }
          } else {
            console.warn(`Invalid WASM file for: ${config.name}`)
          }
        } else {
          console.log(`No WASM file found for system plugin: ${config.name}, UI-only mode`)
        }
      } else {
        // 如果main是WASM文件，按原来的逻辑处理
        const isValid = await wasmPluginRunner.validateWasmFile(mainPath)
        if (!isValid) {
          console.error(`Invalid WASM file: ${mainPath}`)
          return
        }

        // 加载 WASM 模块
        const loaded = await wasmPluginRunner.loadModule(config.name, mainPath)
        if (!loaded) {
          console.error(`Failed to load WASM module: ${config.name}`)
          return
        }
        hasWasmModule = true
      }

      // 创建插件实例
      const plugin: PluginInstance = {
        id: config.name,
        type: PluginType.SYSTEM,
        config,
        path: pluginPath,
        enabled: true
      }

      this.plugins.set(config.name, plugin)
      
      if (isHtmlFile) {
        console.log(`System plugin with UI loaded: ${config.name} (WASM: ${hasWasmModule ? 'Yes' : 'No'})`)
      } else {
        console.log(`System plugin loaded: ${config.name}`)
      }
    } catch (error) {
      console.error(`Error loading system plugin from ${pluginPath}:`, error)
    }
  }

  /**
   * 执行系统插件函数
   */
  public async executeSystemPlugin(pluginId: string, functionName: string, input?: any): Promise<WasmExecutionResult> {
    const plugin = this.plugins.get(pluginId)
    if (!plugin || plugin.type !== PluginType.SYSTEM || !plugin.enabled) {
      return { success: false, error: 'Plugin not found or not enabled' }
    }

    try {
      // 执行 WASM 函数
      const result = await wasmPluginRunner.executeFunction(pluginId, functionName, input)
      return result
    } catch (error) {
      console.error(`Error executing system plugin ${pluginId}.${functionName}:`, error)
      return { success: false, error: error instanceof Error ? error.message : String(error) }
    }
  }

  /**
   * 加载前端插件内容
   */
  private loadFrontendPlugin(pluginId: string) {
    const plugin = this.plugins.get(pluginId)
    if (!plugin || plugin.type !== PluginType.FRONTEND || !plugin.enabled) {
      return { success: false, error: 'Plugin not found or not enabled' }
    }

    try {
      const config = plugin.config as CubeModuleConfig
      const mainPath = join(plugin.path, config.main)
      const htmlContent = readFileSync(mainPath, 'utf-8')
      
      return {
        success: true,
        data: {
          html: htmlContent,
          config: plugin.config,
          basePath: plugin.path
        }
      }
    } catch (error) {
      console.error(`Error loading frontend plugin ${pluginId}:`, error)
      return { success: false, error: error instanceof Error ? error.message : String(error) }
    }
  }

  /**
   * 卸载插件
   */
  public async unloadPlugin(pluginId: string) {
    const plugin = this.plugins.get(pluginId)
    if (!plugin) {
      return false
    }

    // 如果是系统插件，清理Extism实例
    if (plugin.extismPlugin) {
      try {
        await plugin.extismPlugin.close()
      } catch (error) {
        console.error('Error closing Extism plugin:', error)
      }
    }

    this.plugins.delete(pluginId)
    console.log(`Unloaded plugin: ${pluginId}`)
    return true
  }

  /**
   * 获取插件信息
   */
  public getPlugin(pluginId: string): PluginInstance | undefined {
    return this.plugins.get(pluginId)
  }

  /**
   * 获取所有插件
   */
  public getAllPlugins(): PluginInstance[] {
    return Array.from(this.plugins.values())
  }

  /**
   * 列出所有插件
   */
  public async listPlugins() {
    try {
      const plugins = Array.from(this.plugins.values()).map(plugin => ({
        id: plugin.id,
        type: plugin.type,
        name: plugin.config.name,
        version: plugin.config.version,
        description: plugin.config.description,
        author: plugin.config.author,
        enabled: plugin.enabled,
        permissions: plugin.config.permissions || []
      }))
      return { success: true, plugins }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  /**
   * 安装本地插件
   */
  public async installLocalPlugin(zipPath: string) {
    try {
      if (!existsSync(zipPath)) {
        throw new Error('插件文件不存在')
      }

      const pluginId = await this.extractAndInstallPlugin(zipPath)
      const plugin = this.plugins.get(pluginId)
      
      if (plugin) {
        // 保存到数据库
        this.database.savePluginConfig(pluginId, plugin.config, plugin.enabled)
        this.database.recordPluginInstallation(pluginId, plugin.config.version, 'local', zipPath)
      }
      
      return { success: true, pluginId }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  /**
   * 安装远程插件
   */
  public async installRemotePlugin(url: string) {
    try {
      const tempPath = join(app.getPath('temp'), `plugin-${Date.now()}.zip`)
      await this.downloadFile(url, tempPath)
      
      const result = await this.installLocalPlugin(tempPath)
      
      // 如果安装成功，更新数据库记录为远程安装
      if (result.success && result.pluginId) {
        const plugin = this.plugins.get(result.pluginId)
        if (plugin) {
          this.database.recordPluginInstallation(result.pluginId, plugin.config.version, 'remote', url)
        }
      }
      
      // 清理临时文件
      if (existsSync(tempPath)) {
        rmSync(tempPath)
      }
      
      return result
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  /**
   * 卸载插件
   */
  public async uninstallPlugin(pluginId: string) {
    try {
      const plugin = this.plugins.get(pluginId)
      if (!plugin) {
        throw new Error('插件不存在')
      }

      // 先卸载插件
      await this.unloadPlugin(pluginId)
      
      // 删除插件文件
      if (existsSync(plugin.path)) {
        rmSync(plugin.path, { recursive: true, force: true })
      }
      
      // 从插件列表中移除
      this.plugins.delete(pluginId)
      
      // 从数据库中删除
      this.database.deletePluginConfig(pluginId)
      
      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  /**
   * 启用插件
   */
  public async enablePlugin(pluginId: string) {
    try {
      const plugin = this.plugins.get(pluginId)
      if (!plugin) {
        throw new Error('插件不存在')
      }

      plugin.enabled = true
      await this.savePluginConfig(plugin)
      
      // 更新数据库
      this.database.setPluginEnabled(pluginId, true)
      
      // 重新加载插件
      await this.loadPlugin(plugin.path)
      
      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  /**
   * 禁用插件
   */
  public async disablePlugin(pluginId: string) {
    try {
      const plugin = this.plugins.get(pluginId)
      if (!plugin) {
        throw new Error('插件不存在')
      }

      plugin.enabled = false
      await this.savePluginConfig(plugin)
      
      // 更新数据库
      this.database.setPluginEnabled(pluginId, false)
      
      // 卸载插件但不删除文件
      if (plugin.extismPlugin) {
        plugin.extismPlugin = undefined
      }
      
      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  /**
   * 获取插件配置
   */
  public async getPluginConfig(pluginId: string) {
    try {
      const plugin = this.plugins.get(pluginId)
      if (!plugin) {
        throw new Error('插件不存在')
      }

      return { success: true, config: plugin.config }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  /**
   * 设置插件配置
   */
  public async setPluginConfig(pluginId: string, config: any) {
    try {
      const plugin = this.plugins.get(pluginId)
      if (!plugin) {
        throw new Error('插件不存在')
      }

      // 更新配置
      plugin.config = { ...plugin.config, ...config }
      await this.savePluginConfig(plugin)
      
      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  /**
   * 下载文件
   */
  private async downloadFile(url: string, outputPath: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const client = url.startsWith('https:') ? https : http
      const file = createWriteStream(outputPath)
      
      client.get(url, (response) => {
        if (response.statusCode !== 200) {
          reject(new Error(`下载失败: ${response.statusCode}`))
          return
        }
        
        response.pipe(file)
        
        file.on('finish', () => {
          file.close()
          resolve()
        })
        
        file.on('error', (err) => {
          rmSync(outputPath, { force: true })
          reject(err)
        })
      }).on('error', (err) => {
        reject(err)
      })
    })
  }

  /**
   * 解压并安装插件
   */
  private async extractAndInstallPlugin(zipPath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      yauzl.open(zipPath, { lazyEntries: true }, (err, zipfile) => {
        if (err) {
          reject(err)
          return
        }

        let pluginId = ''
        let configFound = false
        const tempDir = join(app.getPath('temp'), `plugin-extract-${Date.now()}`)
        mkdirSync(tempDir, { recursive: true })

        zipfile.readEntry()
        
        zipfile.on('entry', (entry) => {
          if (/\/$/.test(entry.fileName)) {
            // 目录
            const dirPath = join(tempDir, entry.fileName)
            mkdirSync(dirPath, { recursive: true })
            zipfile.readEntry()
          } else {
            // 文件
            const filePath = join(tempDir, entry.fileName)
            const dirPath = join(filePath, '..')
            mkdirSync(dirPath, { recursive: true })
            
            zipfile.openReadStream(entry, (err, readStream) => {
              if (err) {
                reject(err)
                return
              }
              
              const writeStream = createWriteStream(filePath)
              readStream.pipe(writeStream)
              
              writeStream.on('close', () => {
                // 检查是否是配置文件
                if (entry.fileName.endsWith('cubeModule.json') || entry.fileName.endsWith('plugin.json')) {
                  try {
                    const config = JSON.parse(readFileSync(filePath, 'utf-8'))
                    pluginId = config.name || entry.fileName.split('/')[0]
                    configFound = true
                  } catch (e) {
                    // 忽略配置文件解析错误
                  }
                }
                zipfile.readEntry()
              })
            })
          }
        })
        
        zipfile.on('end', async () => {
          try {
            if (!configFound) {
              throw new Error('插件配置文件不存在')
            }
            
            // 移动到插件目录
            const finalPluginPath = join(this.pluginsDir, pluginId)
            if (existsSync(finalPluginPath)) {
              rmSync(finalPluginPath, { recursive: true, force: true })
            }
            
            // 复制文件
            this.copyDirectory(tempDir, finalPluginPath)
            
            // 清理临时目录
            rmSync(tempDir, { recursive: true, force: true })
            
            // 加载插件
            await this.loadPlugin(finalPluginPath)
            
            resolve(pluginId)
          } catch (error) {
            reject(error)
          }
        })
      })
    })
  }

  /**
   * 复制目录
   */
  private copyDirectory(src: string, dest: string) {
    mkdirSync(dest, { recursive: true })
    const entries = readdirSync(src)
    
    for (const entry of entries) {
      const srcPath = join(src, entry)
      const destPath = join(dest, entry)
      
      if (statSync(srcPath).isDirectory()) {
        this.copyDirectory(srcPath, destPath)
      } else {
        const content = readFileSync(srcPath)
        writeFileSync(destPath, content)
      }
    }
  }

  /**
   * 保存插件配置
   */
  private async savePluginConfig(plugin: PluginInstance) {
    const configPath = plugin.type === PluginType.FRONTEND 
      ? join(plugin.path, 'cubeModule.json')
      : join(plugin.path, 'plugin.json')
    
    writeFileSync(configPath, JSON.stringify(plugin.config, null, 2))
  }
}