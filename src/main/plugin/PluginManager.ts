import { app, ipcMain } from 'electron'
import { join } from 'path'
import {
  readFileSync,
  existsSync,
  readdirSync,
  statSync,
  writeFileSync,
  mkdirSync,
  rmSync
} from 'fs'
import { createWriteStream } from 'fs'
import * as https from 'https'
import * as http from 'http'
import * as yauzl from 'yauzl'
import * as tar from 'tar'
// import { SecurityManager } from './SecurityManager'
// import { PluginAPIHandler } from './PluginAPIHandler'
import { wasmPluginRunner, WasmExecutionResult } from './WasmPluginRunner'
import { getPluginDatabase, PluginDatabase } from './PluginDatabase'
// import { PluginPermissionManager } from '../services/plugin/PluginPermissionManager' // 暂时未使用
import { PluginType } from './PluginManager.d'
import type {
  CubeModuleConfig,
  SystemPluginConfig,
  PluginInstance
} from './PluginManager.d'

/**
 * 插件管理器
 * 负责插件的加载、管理和执行
 */
export class PluginManager {
  private plugins: Map<string, PluginInstance> = new Map()
  private pluginsDir: string
  private builtinPluginsDir: string // 应用程序包内的插件目录
  private database: PluginDatabase
  // private permissionManager: PluginPermissionManager // 暂时未使用
  // private extism: any // 暂时未使用

  constructor() {
    // 在开发环境中使用项目根目录的 plugins 文件夹
    // 在生产环境中使用用户数据目录的 plugins 文件夹
    if (process.env.NODE_ENV === 'development' || !app.isPackaged) {
      // 开发环境：使用项目根目录的 plugins 文件夹
      this.pluginsDir = join(process.cwd(), 'plugins')
      this.builtinPluginsDir = this.pluginsDir
    } else {
      // 生产环境：使用用户数据目录的 plugins 文件夹
      this.pluginsDir = join(app.getPath('userData'), 'plugins')
      // 应用程序包内的插件目录
      this.builtinPluginsDir = join(process.resourcesPath, 'app.asar.unpacked', 'plugins')
    }

    console.log(`Plugin directory: ${this.pluginsDir}`)
    console.log(`Builtin plugin directory: ${this.builtinPluginsDir}`)
    this.database = getPluginDatabase()
    // this.permissionManager = PluginPermissionManager.getInstance() // 暂时未使用
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
      return Array.from(this.plugins.values()).map((plugin) => ({
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
    ipcMain.handle(
      'plugin:execute',
      async (_, pluginId: string, functionName: string, input?: any) => {
        return await this.executeSystemPlugin(pluginId, functionName, input)
      }
    )

    // 获取插件信息
    ipcMain.handle('plugin:getPluginInfo', (_, pluginId: string) => {
      const plugin = this.plugins.get(pluginId)
      if (!plugin) {
        return { success: false, error: 'Plugin not found' }
      }
      return {
        success: true,
        data: {
          id: plugin.id,
          type: plugin.type,
          config: plugin.config,
          enabled: plugin.enabled,
          path: plugin.path
        }
      }
    })

    // 获取前端插件内容
    ipcMain.handle('plugin:loadFrontendPlugin', (_, pluginId: string) => {
      return this.loadFrontendPlugin(pluginId)
    })

    // 加载系统插件HTML
    ipcMain.handle('plugin:loadSystemPluginHTML', (_, pluginId: string) => {
      return this.loadSystemPluginHTML(pluginId)
    })

    // 兼容旧的API
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
    // 首先加载内置插件
    if (existsSync(this.builtinPluginsDir)) {
      console.log('Loading builtin plugins...')
      const builtinPluginDirs = readdirSync(this.builtinPluginsDir).filter((dir) => {
        const fullPath = join(this.builtinPluginsDir, dir)
        return statSync(fullPath).isDirectory()
      })

      for (const dir of builtinPluginDirs) {
        await this.loadPlugin(join(this.builtinPluginsDir, dir))
      }
    }

    // 然后加载用户插件目录的插件
    if (!existsSync(this.pluginsDir)) {
      console.log('User plugins directory does not exist, creating...')
      require('fs').mkdirSync(this.pluginsDir, { recursive: true })
    } else {
      console.log('Loading user plugins...')
      const userPluginDirs = readdirSync(this.pluginsDir).filter((dir) => {
        const fullPath = join(this.pluginsDir, dir)
        return statSync(fullPath).isDirectory()
      })

      for (const dir of userPluginDirs) {
        await this.loadPlugin(join(this.pluginsDir, dir))
      }
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
        console.log(
          `System plugin with UI loaded: ${config.name} (WASM: ${hasWasmModule ? 'Yes' : 'No'})`
        )
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
  public async executeSystemPlugin(
    pluginId: string,
    functionName: string,
    input?: any
  ): Promise<WasmExecutionResult> {
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
      let htmlContent = readFileSync(mainPath, 'utf-8')

      // 处理CSS文件内联
      htmlContent = this.inlinePluginResources(htmlContent, plugin.path)

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
   * 加载系统插件HTML内容
   */
  private loadSystemPluginHTML(pluginId: string) {
    const plugin = this.plugins.get(pluginId)
    if (!plugin || plugin.type !== PluginType.SYSTEM) {
      return { success: false, error: 'System plugin not found' }
    }

    try {
      // 检查系统插件是否有HTML界面
      if (!plugin.config.main || !plugin.config.main.endsWith('.html')) {
        return { success: false, error: 'System plugin does not have HTML interface' }
      }

      const mainPath = join(plugin.path, plugin.config.main)
      if (!existsSync(mainPath)) {
        return { success: false, error: 'Main HTML file not found' }
      }

      let htmlContent = readFileSync(mainPath, 'utf-8')
      
      // 内联CSS和JS资源
      htmlContent = this.inlinePluginResources(htmlContent, plugin.path)

      return {
        success: true,
        data: {
          html: htmlContent,
          config: plugin.config
        }
      }
    } catch (error) {
      console.error(`Error loading system plugin HTML ${pluginId}:`, error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }

  /**
   * 内联插件资源文件（CSS和JS）
   */
  private inlinePluginResources(htmlContent: string, pluginPath: string): string {
    try {
      // 处理CSS文件
      htmlContent = htmlContent.replace(
        /<link[^>]+rel=["']stylesheet["'][^>]*href=["']([^"']+)["'][^>]*>/gi,
        (match, href) => {
          try {
            const cssPath = join(pluginPath, href)
            if (existsSync(cssPath)) {
              const cssContent = readFileSync(cssPath, 'utf-8')
              return `<style>\n${cssContent}\n</style>`
            }
          } catch (error) {
            console.warn(`Failed to inline CSS file ${href}:`, error)
          }
          return match
        }
      )

      // 处理JS文件
      htmlContent = htmlContent.replace(
        /<script[^>]+src=["']([^"']+)["'][^>]*><\/script>/gi,
        (match, src) => {
          try {
            const jsPath = join(pluginPath, src)
            if (existsSync(jsPath)) {
              const jsContent = readFileSync(jsPath, 'utf-8')
              return `<script>\n${jsContent}\n</script>`
            }
          } catch (error) {
            console.warn(`Failed to inline JS file ${src}:`, error)
          }
          return match
        }
      )

      return htmlContent
    } catch (error) {
      console.error('Error inlining plugin resources:', error)
      return htmlContent
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
      console.log('Listing plugins, total count:', this.plugins.size)
      const plugins = Array.from(this.plugins.values()).map((plugin) => ({
        id: plugin.id,
        type: plugin.type,
        name: plugin.config.name,
        version: plugin.config.version,
        description: plugin.config.description,
        author: plugin.config.author,
        enabled: plugin.enabled,
        permissions: plugin.config.permissions || []
      }))
      console.log('Plugins mapped successfully, count:', plugins.length)
      return { success: true, plugins }
    } catch (error: any) {
      console.error('Error in listPlugins:', error)
      return { success: false, error: error.message }
    }
  }

  /**
   * 安装本地插件
   */
  public async installLocalPlugin(filePath: string) {
    try {
      if (!existsSync(filePath)) {
        return { success: false, error: '文件不存在' }
      }

      const pluginId = await this.extractAndInstallPlugin(filePath)
      const plugin = this.plugins.get(pluginId)

      if (plugin) {
        // 保存到数据库
        this.database.savePluginConfig(pluginId, plugin.config, plugin.enabled)
        this.database.recordPluginInstallation(pluginId, plugin.config.version, 'local', filePath)
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
          this.database.recordPluginInstallation(
            result.pluginId,
            plugin.config.version,
            'remote',
            url
          )
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

      client
        .get(url, (response) => {
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
        })
        .on('error', (err) => {
          reject(err)
        })
    })
  }

  /**
   * 解压并安装插件
   */
  private async extractAndInstallPlugin(filePath: string): Promise<string> {
    const fileExtension = filePath.toLowerCase()
    
    if (fileExtension.endsWith('.tgz') || fileExtension.endsWith('.tar.gz')) {
      return this.extractTgzAndInstallPlugin(filePath)
    } else {
      return this.extractZipAndInstallPlugin(filePath)
    }
  }

  /**
   * 解压ZIP文件并安装插件
   */
  private async extractZipAndInstallPlugin(zipPath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      yauzl.open(zipPath, { lazyEntries: true }, (err, zipfile) => {
        if (err) {
          reject(err)
          return
        }

        let pluginId = ''
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
                if (
                  entry.fileName.endsWith('cubeModule.json') ||
                  entry.fileName.endsWith('plugin.json')
                ) {
                  try {
                    const config = JSON.parse(readFileSync(filePath, 'utf-8'))
                    pluginId = config.name || entry.fileName.split('/')[0]
                    // configFound = true // 已移除configFound变量
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
            // 检查插件ID是否有效
            if (!pluginId) {
              throw new Error('插件配置文件不存在或无效')
            }

            // 检查插件是否已存在
            const finalPluginPath = join(this.pluginsDir, pluginId)
            const isAlreadyInstalled = existsSync(finalPluginPath)

            if (isAlreadyInstalled) {
              // 检查是否为相同版本
              try {
                const existingConfigPath = join(finalPluginPath, 'cubeModule.json')
                const fallbackConfigPath = join(finalPluginPath, 'plugin.json')
                let existingConfig

                if (existsSync(existingConfigPath)) {
                  existingConfig = JSON.parse(readFileSync(existingConfigPath, 'utf-8'))
                } else if (existsSync(fallbackConfigPath)) {
                  existingConfig = JSON.parse(readFileSync(fallbackConfigPath, 'utf-8'))
                }

                if (existingConfig) {
                  // 读取新插件的配置
                  const newConfigPath = join(tempDir, 'cubeModule.json')
                  const newFallbackConfigPath = join(tempDir, 'plugin.json')
                  let newConfig

                  if (existsSync(newConfigPath)) {
                    newConfig = JSON.parse(readFileSync(newConfigPath, 'utf-8'))
                  } else if (existsSync(newFallbackConfigPath)) {
                    newConfig = JSON.parse(readFileSync(newFallbackConfigPath, 'utf-8'))
                  }

                  if (newConfig && existingConfig.version === newConfig.version) {
                    // 清理临时目录
                    rmSync(tempDir, { recursive: true, force: true })
                    throw new Error(
                      `插件 "${pluginId}" (版本 ${existingConfig.version}) 已经安装，无需重复安装`
                    )
                  }
                } else {
                  // 如果无法读取现有配置文件，说明插件目录可能损坏，直接删除重新安装
                  console.warn(
                    `Plugin directory exists but config file not found, removing: ${finalPluginPath}`
                  )
                  rmSync(finalPluginPath, { recursive: true, force: true })
                }
              } catch (configError) {
                // 如果读取配置失败，说明插件目录可能损坏，删除重新安装
                console.warn(
                  'Failed to read existing plugin config, removing corrupted plugin directory:',
                  configError
                )
                if (existsSync(finalPluginPath)) {
                  rmSync(finalPluginPath, { recursive: true, force: true })
                }
              }
            }

            // 删除旧版本（如果仍然存在）
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
   * 解压TGZ文件并安装插件
   */
  private async extractTgzAndInstallPlugin(tgzPath: string): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try {
        let pluginId = ''
        const tempDir = join(app.getPath('temp'), `plugin-extract-${Date.now()}`)
        mkdirSync(tempDir, { recursive: true })

        // 解压tgz文件
        await tar.extract({
          file: tgzPath,
          cwd: tempDir,
          strip: 0 // 保持原始目录结构
        })

        // 查找配置文件
        const findConfigFile = (dir: string): string | null => {
          const entries = readdirSync(dir)
          for (const entry of entries) {
            const fullPath = join(dir, entry)
            if (statSync(fullPath).isDirectory()) {
              const result = findConfigFile(fullPath)
              if (result) return result
            } else if (entry === 'cubeModule.json' || entry === 'plugin.json') {
              return fullPath
            }
          }
          return null
        }

        const configPath = findConfigFile(tempDir)
        if (!configPath) {
          rmSync(tempDir, { recursive: true, force: true })
          reject(new Error('插件配置文件未找到'))
          return
        }

        const configContent = readFileSync(configPath, 'utf-8')
        const config = JSON.parse(configContent)
        pluginId = config.id || config.name

        if (!pluginId) {
          rmSync(tempDir, { recursive: true, force: true })
          reject(new Error('插件ID未找到'))
          return
        }

        // 确定插件根目录（配置文件所在目录）
        const pluginRootDir = join(configPath, '..')
        const finalPluginPath = join(this.pluginsDir, pluginId)

        // 检查插件是否已存在
        if (existsSync(finalPluginPath)) {
          const existingConfigPath = existsSync(join(finalPluginPath, 'cubeModule.json'))
            ? join(finalPluginPath, 'cubeModule.json')
            : join(finalPluginPath, 'plugin.json')

          if (existsSync(existingConfigPath)) {
            const existingConfig = JSON.parse(readFileSync(existingConfigPath, 'utf-8'))
            const existingVersion = existingConfig.version || '1.0.0'
            const newVersion = config.version || '1.0.0'

            console.log(
              `插件 ${pluginId} 已存在，版本: ${existingVersion}，新版本: ${newVersion}`
            )

            // 删除旧版本（如果仍然存在）
            if (existsSync(finalPluginPath)) {
              rmSync(finalPluginPath, { recursive: true, force: true })
            }
          }
        }

        // 删除旧版本（如果仍然存在）
        if (existsSync(finalPluginPath)) {
          rmSync(finalPluginPath, { recursive: true, force: true })
        }

        // 复制文件
        this.copyDirectory(pluginRootDir, finalPluginPath)

        // 清理临时目录
        rmSync(tempDir, { recursive: true, force: true })

        // 加载插件
        await this.loadPlugin(finalPluginPath)

        resolve(pluginId)
      } catch (error) {
        reject(error)
      }
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
    const configPath =
      plugin.type === PluginType.FRONTEND
        ? join(plugin.path, 'cubeModule.json')
        : join(plugin.path, 'plugin.json')

    writeFileSync(configPath, JSON.stringify(plugin.config, null, 2))
  }
}

// 重新导出类型定义和枚举
export { PluginType } from './PluginManager.d'

export type {
  CubeModuleConfig,
  SystemPluginConfig,
  UIComponent,
  SettingsConfig,
  SettingsSection,
  PluginInstance
} from './PluginManager.d'
