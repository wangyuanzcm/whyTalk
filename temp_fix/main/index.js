'use strict'
var __create = Object.create
var __defProp = Object.defineProperty
var __getOwnPropDesc = Object.getOwnPropertyDescriptor
var __getOwnPropNames = Object.getOwnPropertyNames
var __getProtoOf = Object.getPrototypeOf
var __hasOwnProp = Object.prototype.hasOwnProperty
var __copyProps = (to, from, except, desc) => {
  if ((from && typeof from === 'object') || typeof from === 'function') {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, {
          get: () => from[key],
          enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        })
  }
  return to
}
var __toESM = (mod, isNodeMode, target) => (
  (target = mod != null ? __create(__getProtoOf(mod)) : {}),
  __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule
      ? __defProp(target, 'default', { value: mod, enumerable: true })
      : target,
    mod
  )
)
const electron = require('electron')
const path = require('path')
const utils = require('@electron-toolkit/utils')
const fs = require('fs')
const https = require('https')
const http = require('http')
const yauzl = require('yauzl')
const Database = require('better-sqlite3')
const util = require('util')
const os = require('os')
const crypto = require('crypto')
const jsonwebtoken = require('jsonwebtoken')
const events = require('events')
const uuid = require('uuid')
const child_process = require('child_process')
function _interopNamespaceDefault(e) {
  const n = Object.create(null, { [Symbol.toStringTag]: { value: 'Module' } })
  if (e) {
    for (const k in e) {
      if (k !== 'default') {
        const d = Object.getOwnPropertyDescriptor(e, k)
        Object.defineProperty(
          n,
          k,
          d.get
            ? d
            : {
                enumerable: true,
                get: () => e[k]
              }
        )
      }
    }
  }
  n.default = e
  return Object.freeze(n)
}
const path__namespace = /* @__PURE__ */ _interopNamespaceDefault(path)
const https__namespace = /* @__PURE__ */ _interopNamespaceDefault(https)
const http__namespace = /* @__PURE__ */ _interopNamespaceDefault(http)
const yauzl__namespace = /* @__PURE__ */ _interopNamespaceDefault(yauzl)
const icon = path.join(__dirname, '../../resources/icon.png')
class WasmPluginRunner {
  loadedModules = /* @__PURE__ */ new Map()
  instances = /* @__PURE__ */ new Map()
  /**
   * 加载 WASM 模块
   */
  async loadModule(pluginId, wasmPath) {
    try {
      const wasmBytes = fs.readFileSync(wasmPath)
      const module2 = await WebAssembly.compile(wasmBytes)
      const imports = this.createImports()
      const instance = await WebAssembly.instantiate(module2, imports)
      this.loadedModules.set(pluginId, module2)
      this.instances.set(pluginId, instance)
      console.log(`WASM module loaded successfully: ${pluginId}`)
      return true
    } catch (error) {
      console.error(`Failed to load WASM module ${pluginId}:`, error)
      return false
    }
  }
  /**
   * 执行 WASM 函数
   */
  async executeFunction(pluginId, functionName, ...args) {
    const startTime = Date.now()
    try {
      const instance = this.instances.get(pluginId)
      if (!instance) {
        return {
          success: false,
          error: `Plugin ${pluginId} not loaded`
        }
      }
      const exports = instance.exports
      if (typeof exports[functionName] !== 'function') {
        return {
          success: false,
          error: `Function ${functionName} not found in plugin ${pluginId}`
        }
      }
      const result = exports[functionName](...args)
      const executionTime = Date.now() - startTime
      return {
        success: true,
        result,
        executionTime
      }
    } catch (error) {
      const executionTime = Date.now() - startTime
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
        executionTime
      }
    }
  }
  /**
   * 获取模块导出的函数列表
   */
  getExports(pluginId) {
    const instance = this.instances.get(pluginId)
    if (!instance) {
      return []
    }
    const exports = instance.exports
    return Object.keys(exports).filter((key) => typeof exports[key] === 'function')
  }
  /**
   * 卸载模块
   */
  unloadModule(pluginId) {
    const hasModule = this.loadedModules.has(pluginId)
    const hasInstance = this.instances.has(pluginId)
    this.loadedModules.delete(pluginId)
    this.instances.delete(pluginId)
    return hasModule || hasInstance
  }
  /**
   * 获取已加载的模块列表
   */
  getLoadedModules() {
    return Array.from(this.loadedModules.keys())
  }
  /**
   * 创建 WASM 导入对象
   * 提供插件可以使用的宿主函数
   */
  createImports() {
    return {
      env: {
        // 内存管理
        memory: new WebAssembly.Memory({ initial: 1 }),
        // 日志函数
        log: (ptr, len) => {
          console.log('WASM Plugin Log:', ptr, len)
        },
        // 错误处理
        abort: (msg, file, line, col) => {
          console.error('WASM Plugin Abort:', { msg, file, line, col })
        },
        // 数学函数
        Math_random: Math.random,
        Date_now: Date.now,
        // 字符串操作辅助函数
        strlen: (_ptr) => {
          return 0
        }
      },
      // WASI 基础支持（简化版）
      wasi_snapshot_preview1: {
        proc_exit: (code) => {
          console.log('WASM process exit with code:', code)
        },
        fd_write: (_fd, _iovs, _iovs_len, _nwritten) => {
          return 0
        },
        fd_read: (_fd, _iovs, _iovs_len, _nread) => {
          return 0
        },
        environ_sizes_get: (_environ_count, _environ_buf_size) => {
          return 0
        },
        environ_get: (_environ, _environ_buf) => {
          return 0
        }
      }
    }
  }
  /**
   * 验证 WASM 文件
   */
  async validateWasmFile(wasmPath) {
    try {
      const wasmBytes = fs.readFileSync(wasmPath)
      await WebAssembly.compile(wasmBytes)
      return true
    } catch (error) {
      console.error('Invalid WASM file:', error)
      return false
    }
  }
  /**
   * 获取 WASM 模块信息
   */
  async getModuleInfo(wasmPath) {
    try {
      const wasmBytes = fs.readFileSync(wasmPath)
      const module2 = await WebAssembly.compile(wasmBytes)
      const imports = WebAssembly.Module.imports(module2).map((imp) => `${imp.module}.${imp.name}`)
      const exports = WebAssembly.Module.exports(module2).map((exp) => exp.name)
      return {
        imports,
        exports,
        valid: true
      }
    } catch (error) {
      return {
        imports: [],
        exports: [],
        valid: false
      }
    }
  }
}
const wasmPluginRunner = new WasmPluginRunner()
class PluginDatabase {
  db
  dbPath
  constructor() {
    const userDataPath2 = electron.app.getPath('userData')
    this.dbPath = path.join(userDataPath2, 'plugins.db')
    this.db = new Database(this.dbPath)
    this.initializeDatabase()
  }
  initializeDatabase() {
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS plugin_configs (
        id TEXT PRIMARY KEY,
        plugin_id TEXT UNIQUE NOT NULL,
        config TEXT NOT NULL,
        enabled BOOLEAN DEFAULT 1,
        installed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS plugin_market (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        version TEXT NOT NULL,
        author TEXT,
        download_url TEXT NOT NULL,
        icon_url TEXT,
        category TEXT,
        tags TEXT, -- JSON数组字符串
        rating REAL DEFAULT 0,
        downloads INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS user_plugins (
        id TEXT PRIMARY KEY,
        plugin_id TEXT NOT NULL,
        version TEXT NOT NULL,
        source TEXT NOT NULL, -- 'local' | 'remote' | 'market'
        source_url TEXT,
        installed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        last_used DATETIME,
        usage_count INTEGER DEFAULT 0
      )
    `)
  }
  /**
   * 保存插件配置
   */
  savePluginConfig(pluginId, config2, enabled = true) {
    const stmt = this.db.prepare(`
      INSERT OR REPLACE INTO plugin_configs (id, plugin_id, config, enabled, updated_at)
      VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
    `)
    stmt.run(pluginId, pluginId, JSON.stringify(config2), enabled ? 1 : 0)
  }
  /**
   * 获取插件配置
   */
  getPluginConfig(pluginId) {
    const stmt = this.db.prepare(`
      SELECT * FROM plugin_configs WHERE plugin_id = ?
    `)
    const row = stmt.get(pluginId)
    if (!row) return null
    return {
      id: row.id,
      pluginId: row.plugin_id,
      config: row.config,
      enabled: Boolean(row.enabled),
      installedAt: row.installed_at,
      updatedAt: row.updated_at
    }
  }
  /**
   * 获取所有插件配置
   */
  getAllPluginConfigs() {
    const stmt = this.db.prepare(`
      SELECT * FROM plugin_configs ORDER BY updated_at DESC
    `)
    const rows = stmt.all()
    return rows.map((row) => ({
      id: row.id,
      pluginId: row.plugin_id,
      config: row.config,
      enabled: Boolean(row.enabled),
      installedAt: row.installed_at,
      updatedAt: row.updated_at
    }))
  }
  /**
   * 删除插件配置
   */
  deletePluginConfig(pluginId) {
    const stmt = this.db.prepare(`
      DELETE FROM plugin_configs WHERE plugin_id = ?
    `)
    stmt.run(pluginId)
  }
  /**
   * 启用/禁用插件
   */
  setPluginEnabled(pluginId, enabled) {
    const stmt = this.db.prepare(`
      UPDATE plugin_configs 
      SET enabled = ?, updated_at = CURRENT_TIMESTAMP 
      WHERE plugin_id = ?
    `)
    stmt.run(enabled ? 1 : 0, pluginId)
  }
  /**
   * 记录插件安装
   */
  recordPluginInstallation(pluginId, version, source, sourceUrl) {
    const stmt = this.db.prepare(`
      INSERT OR REPLACE INTO user_plugins (id, plugin_id, version, source, source_url)
      VALUES (?, ?, ?, ?, ?)
    `)
    stmt.run(pluginId, pluginId, version, source, sourceUrl || null)
  }
  /**
   * 记录插件使用
   */
  recordPluginUsage(pluginId) {
    const stmt = this.db.prepare(`
      UPDATE user_plugins 
      SET last_used = CURRENT_TIMESTAMP, usage_count = usage_count + 1
      WHERE plugin_id = ?
    `)
    stmt.run(pluginId)
  }
  /**
   * 获取插件使用统计
   */
  getPluginStats(pluginId) {
    const stmt = this.db.prepare(`
      SELECT * FROM user_plugins WHERE plugin_id = ?
    `)
    return stmt.get(pluginId)
  }
  /**
   * 获取所有插件统计
   */
  getAllPluginStats() {
    const stmt = this.db.prepare(`
      SELECT * FROM user_plugins ORDER BY usage_count DESC, last_used DESC
    `)
    return stmt.all()
  }
  /**
   * 关闭数据库连接
   */
  close() {
    this.db.close()
  }
  /**
   * 获取数据库实例（用于高级操作）
   */
  getDatabase() {
    return this.db
  }
}
let pluginDatabase = null
function getPluginDatabase() {
  if (!pluginDatabase) {
    const useMockDb = process.env.USE_MOCK_DB === 'true' || process.env.NODE_ENV === 'development'
    if (useMockDb) {
      console.log('Using mock database for plugin management (set USE_MOCK_DB=false to use SQLite)')
      pluginDatabase = new MockPluginDatabase()
    } else {
      try {
        console.log('Attempting to initialize SQLite database...')
        pluginDatabase = new PluginDatabase()
        console.log('SQLite database initialized successfully')
      } catch (error) {
        console.warn(
          'Failed to initialize SQLite database, falling back to mock database:',
          error.message
        )
        pluginDatabase = new MockPluginDatabase()
      }
    }
  }
  return pluginDatabase
}
class MockPluginDatabase {
  configs = /* @__PURE__ */ new Map()
  installations = /* @__PURE__ */ new Map()
  stats = /* @__PURE__ */ new Map()
  savePluginConfig(pluginId, config2, enabled = true) {
    const record = {
      id: pluginId,
      pluginId,
      config: JSON.stringify(config2),
      enabled,
      installedAt: /* @__PURE__ */ new Date().toISOString(),
      updatedAt: /* @__PURE__ */ new Date().toISOString()
    }
    this.configs.set(pluginId, record)
  }
  getPluginConfig(pluginId) {
    return this.configs.get(pluginId) || null
  }
  getAllPluginConfigs() {
    return Array.from(this.configs.values())
  }
  deletePluginConfig(pluginId) {
    this.configs.delete(pluginId)
  }
  setPluginEnabled(pluginId, enabled) {
    const config2 = this.configs.get(pluginId)
    if (config2) {
      config2.enabled = enabled
      config2.updatedAt = /* @__PURE__ */ new Date().toISOString()
    }
  }
  recordPluginInstallation(pluginId, version, source, sourceUrl) {
    this.installations.set(pluginId, {
      pluginId,
      version,
      source,
      sourceUrl,
      installedAt: /* @__PURE__ */ new Date().toISOString()
    })
  }
  recordPluginUsage(pluginId) {
    const stat = this.stats.get(pluginId) || { pluginId, usageCount: 0 }
    stat.usageCount++
    stat.lastUsed = /* @__PURE__ */ new Date().toISOString()
    this.stats.set(pluginId, stat)
  }
  getPluginStats(pluginId) {
    return this.stats.get(pluginId) || null
  }
  getAllPluginStats() {
    return Array.from(this.stats.values())
  }
  close() {}
  getDatabase() {
    return null
  }
}
var PluginType = /* @__PURE__ */ ((PluginType2) => {
  PluginType2['FRONTEND'] = 'frontend'
  PluginType2['SYSTEM'] = 'system'
  return PluginType2
})(PluginType || {})
class PluginManager {
  plugins = /* @__PURE__ */ new Map()
  pluginsDir
  builtinPluginsDir
  // 应用程序包内的插件目录
  database
  // private extism: any // 暂时未使用
  constructor() {
    if (process.env.NODE_ENV === 'development' || !electron.app.isPackaged) {
      this.pluginsDir = path.join(process.cwd(), 'plugins')
      this.builtinPluginsDir = this.pluginsDir
    } else {
      this.pluginsDir = path.join(electron.app.getPath('userData'), 'plugins')
      this.builtinPluginsDir = path.join(process.resourcesPath, 'app.asar.unpacked', 'plugins')
    }
    console.log(`Plugin directory: ${this.pluginsDir}`)
    console.log(`Builtin plugin directory: ${this.builtinPluginsDir}`)
    this.database = getPluginDatabase()
    this.initializeExtism()
    this.setupIpcHandlers()
  }
  /**
   * 初始化Extism运行时
   */
  async initializeExtism() {
    console.log('Initializing WASM plugin runner...')
    console.log('WASM plugin runner initialized successfully')
  }
  /**
   * 设置IPC处理器
   */
  setupIpcHandlers() {
    electron.ipcMain.handle('plugin:list', () => {
      return Array.from(this.plugins.values()).map((plugin) => ({
        id: plugin.id,
        type: plugin.type,
        config: plugin.config,
        enabled: plugin.enabled
      }))
    })
    electron.ipcMain.handle('plugin:toggle', (_, pluginId) => {
      const plugin = this.plugins.get(pluginId)
      if (plugin) {
        plugin.enabled = !plugin.enabled
        return { success: true, enabled: plugin.enabled }
      }
      return { success: false, error: 'Plugin not found' }
    })
    electron.ipcMain.handle('plugin:execute', async (_, pluginId, functionName, input) => {
      return await this.executeSystemPlugin(pluginId, functionName, input)
    })
    electron.ipcMain.handle('plugin:frontend:load', (_, pluginId) => {
      return this.loadFrontendPlugin(pluginId)
    })
    electron.ipcMain.handle('plugin:system:exports', (_, pluginId) => {
      const plugin = this.plugins.get(pluginId)
      if (!plugin || plugin.type !== 'system') {
        return { success: false, error: 'System plugin not found' }
      }
      const exports = wasmPluginRunner.getExports(pluginId)
      return { success: true, exports }
    })
    electron.ipcMain.handle('plugin:system:reload', async (_, pluginId) => {
      const plugin = this.plugins.get(pluginId)
      if (!plugin || plugin.type !== 'system') {
        return { success: false, error: 'System plugin not found' }
      }
      wasmPluginRunner.unloadModule(pluginId)
      const configPath = path.join(plugin.path, 'cubeModule.json')
      await this.loadSystemPluginFromPath(plugin.path, configPath)
      return { success: true }
    })
  }
  /**
   * 扫描并加载所有插件
   */
  async loadAllPlugins() {
    if (fs.existsSync(this.builtinPluginsDir)) {
      console.log('Loading builtin plugins...')
      const builtinPluginDirs = fs.readdirSync(this.builtinPluginsDir).filter((dir) => {
        const fullPath = path.join(this.builtinPluginsDir, dir)
        return fs.statSync(fullPath).isDirectory()
      })
      for (const dir of builtinPluginDirs) {
        await this.loadPlugin(path.join(this.builtinPluginsDir, dir))
      }
    }
    if (!fs.existsSync(this.pluginsDir)) {
      console.log('User plugins directory does not exist, creating...')
      require('fs').mkdirSync(this.pluginsDir, { recursive: true })
    } else {
      console.log('Loading user plugins...')
      const userPluginDirs = fs.readdirSync(this.pluginsDir).filter((dir) => {
        const fullPath = path.join(this.pluginsDir, dir)
        return fs.statSync(fullPath).isDirectory()
      })
      for (const dir of userPluginDirs) {
        await this.loadPlugin(path.join(this.pluginsDir, dir))
      }
    }
    console.log(`Loaded ${this.plugins.size} plugins`)
  }
  /**
   * 加载单个插件
   */
  async loadPlugin(pluginPath) {
    try {
      const cubeConfigPath = path.join(pluginPath, 'cubeModule.json')
      if (fs.existsSync(cubeConfigPath)) {
        const configContent = fs.readFileSync(cubeConfigPath, 'utf-8')
        const config2 = JSON.parse(configContent)
        if (config2.type === 'system') {
          await this.loadSystemPluginFromPath(pluginPath, cubeConfigPath)
        } else {
          await this.loadFrontendPluginFromPath(pluginPath, cubeConfigPath)
        }
        return
      }
      const systemConfigPath = path.join(pluginPath, 'plugin.json')
      if (fs.existsSync(systemConfigPath)) {
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
  async loadFrontendPluginFromPath(pluginPath, configPath) {
    const configContent = fs.readFileSync(configPath, 'utf-8')
    const config2 = JSON.parse(configContent)
    const mainPath = path.join(pluginPath, config2.main)
    if (!fs.existsSync(mainPath)) {
      throw new Error(`Main file ${config2.main} not found`)
    }
    const pluginId = `frontend_${config2.name}_${config2.version}`
    const plugin = {
      id: pluginId,
      type: 'frontend',
      config: config2,
      path: pluginPath,
      enabled: true
    }
    this.plugins.set(pluginId, plugin)
    console.log(`Loaded frontend plugin: ${config2.name} v${config2.version}`)
  }
  /**
   * 加载系统插件
   */
  async loadSystemPluginFromPath(pluginPath, configPath) {
    try {
      const configContent = fs.readFileSync(configPath, 'utf-8')
      const config2 = JSON.parse(configContent)
      if (!config2.name || !config2.main) {
        console.error(`Invalid system plugin config: ${configPath}`)
        return
      }
      const mainPath = path.join(pluginPath, config2.main)
      if (!fs.existsSync(mainPath)) {
        console.error(`Main file not found: ${mainPath}`)
        return
      }
      const isHtmlFile = config2.main.endsWith('.html')
      let hasWasmModule = false
      if (isHtmlFile) {
        const wasmPath = path.join(pluginPath, 'plugin.wasm')
        if (fs.existsSync(wasmPath)) {
          const isValid = await wasmPluginRunner.validateWasmFile(wasmPath)
          if (isValid) {
            const loaded = await wasmPluginRunner.loadModule(config2.name, wasmPath)
            if (loaded) {
              hasWasmModule = true
              console.log(`WASM module loaded for system plugin: ${config2.name}`)
            } else {
              console.warn(`Failed to load WASM module for: ${config2.name}`)
            }
          } else {
            console.warn(`Invalid WASM file for: ${config2.name}`)
          }
        } else {
          console.log(`No WASM file found for system plugin: ${config2.name}, UI-only mode`)
        }
      } else {
        const isValid = await wasmPluginRunner.validateWasmFile(mainPath)
        if (!isValid) {
          console.error(`Invalid WASM file: ${mainPath}`)
          return
        }
        const loaded = await wasmPluginRunner.loadModule(config2.name, mainPath)
        if (!loaded) {
          console.error(`Failed to load WASM module: ${config2.name}`)
          return
        }
        hasWasmModule = true
      }
      const plugin = {
        id: config2.name,
        type: 'system',
        config: config2,
        path: pluginPath,
        enabled: true
      }
      this.plugins.set(config2.name, plugin)
      if (isHtmlFile) {
        console.log(
          `System plugin with UI loaded: ${config2.name} (WASM: ${hasWasmModule ? 'Yes' : 'No'})`
        )
      } else {
        console.log(`System plugin loaded: ${config2.name}`)
      }
    } catch (error) {
      console.error(`Error loading system plugin from ${pluginPath}:`, error)
    }
  }
  /**
   * 执行系统插件函数
   */
  async executeSystemPlugin(pluginId, functionName, input) {
    const plugin = this.plugins.get(pluginId)
    if (!plugin || plugin.type !== 'system' || !plugin.enabled) {
      return { success: false, error: 'Plugin not found or not enabled' }
    }
    try {
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
  loadFrontendPlugin(pluginId) {
    const plugin = this.plugins.get(pluginId)
    if (!plugin || plugin.type !== 'frontend' || !plugin.enabled) {
      return { success: false, error: 'Plugin not found or not enabled' }
    }
    try {
      const config2 = plugin.config
      const mainPath = path.join(plugin.path, config2.main)
      const htmlContent = fs.readFileSync(mainPath, 'utf-8')
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
  async unloadPlugin(pluginId) {
    const plugin = this.plugins.get(pluginId)
    if (!plugin) {
      return false
    }
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
  getPlugin(pluginId) {
    return this.plugins.get(pluginId)
  }
  /**
   * 获取所有插件
   */
  getAllPlugins() {
    return Array.from(this.plugins.values())
  }
  /**
   * 列出所有插件
   */
  async listPlugins() {
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
    } catch (error) {
      console.error('Error in listPlugins:', error)
      return { success: false, error: error.message }
    }
  }
  /**
   * 安装本地插件
   */
  async installLocalPlugin(zipPath) {
    try {
      if (!fs.existsSync(zipPath)) {
        throw new Error('插件文件不存在')
      }
      const pluginId = await this.extractAndInstallPlugin(zipPath)
      const plugin = this.plugins.get(pluginId)
      if (plugin) {
        this.database.savePluginConfig(pluginId, plugin.config, plugin.enabled)
        this.database.recordPluginInstallation(pluginId, plugin.config.version, 'local', zipPath)
      }
      return { success: true, pluginId }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }
  /**
   * 安装远程插件
   */
  async installRemotePlugin(url) {
    try {
      const tempPath = path.join(electron.app.getPath('temp'), `plugin-${Date.now()}.zip`)
      await this.downloadFile(url, tempPath)
      const result = await this.installLocalPlugin(tempPath)
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
      if (fs.existsSync(tempPath)) {
        fs.rmSync(tempPath)
      }
      return result
    } catch (error) {
      return { success: false, error: error.message }
    }
  }
  /**
   * 卸载插件
   */
  async uninstallPlugin(pluginId) {
    try {
      const plugin = this.plugins.get(pluginId)
      if (!plugin) {
        throw new Error('插件不存在')
      }
      await this.unloadPlugin(pluginId)
      if (fs.existsSync(plugin.path)) {
        fs.rmSync(plugin.path, { recursive: true, force: true })
      }
      this.plugins.delete(pluginId)
      this.database.deletePluginConfig(pluginId)
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }
  /**
   * 启用插件
   */
  async enablePlugin(pluginId) {
    try {
      const plugin = this.plugins.get(pluginId)
      if (!plugin) {
        throw new Error('插件不存在')
      }
      plugin.enabled = true
      await this.savePluginConfig(plugin)
      this.database.setPluginEnabled(pluginId, true)
      await this.loadPlugin(plugin.path)
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }
  /**
   * 禁用插件
   */
  async disablePlugin(pluginId) {
    try {
      const plugin = this.plugins.get(pluginId)
      if (!plugin) {
        throw new Error('插件不存在')
      }
      plugin.enabled = false
      await this.savePluginConfig(plugin)
      this.database.setPluginEnabled(pluginId, false)
      if (plugin.extismPlugin) {
        plugin.extismPlugin = void 0
      }
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }
  /**
   * 获取插件配置
   */
  async getPluginConfig(pluginId) {
    try {
      const plugin = this.plugins.get(pluginId)
      if (!plugin) {
        throw new Error('插件不存在')
      }
      return { success: true, config: plugin.config }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }
  /**
   * 设置插件配置
   */
  async setPluginConfig(pluginId, config2) {
    try {
      const plugin = this.plugins.get(pluginId)
      if (!plugin) {
        throw new Error('插件不存在')
      }
      plugin.config = { ...plugin.config, ...config2 }
      await this.savePluginConfig(plugin)
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }
  /**
   * 下载文件
   */
  async downloadFile(url, outputPath) {
    return new Promise((resolve, reject) => {
      const client = url.startsWith('https:') ? https__namespace : http__namespace
      const file = fs.createWriteStream(outputPath)
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
            fs.rmSync(outputPath, { force: true })
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
  async extractAndInstallPlugin(zipPath) {
    return new Promise((resolve, reject) => {
      yauzl__namespace.open(zipPath, { lazyEntries: true }, (err, zipfile) => {
        if (err) {
          reject(err)
          return
        }
        let pluginId = ''
        let configFound = false
        const tempDir = path.join(electron.app.getPath('temp'), `plugin-extract-${Date.now()}`)
        fs.mkdirSync(tempDir, { recursive: true })
        zipfile.readEntry()
        zipfile.on('entry', (entry) => {
          if (/\/$/.test(entry.fileName)) {
            const dirPath = path.join(tempDir, entry.fileName)
            fs.mkdirSync(dirPath, { recursive: true })
            zipfile.readEntry()
          } else {
            const filePath = path.join(tempDir, entry.fileName)
            const dirPath = path.join(filePath, '..')
            fs.mkdirSync(dirPath, { recursive: true })
            zipfile.openReadStream(entry, (err2, readStream) => {
              if (err2) {
                reject(err2)
                return
              }
              const writeStream = fs.createWriteStream(filePath)
              readStream.pipe(writeStream)
              writeStream.on('close', () => {
                if (
                  entry.fileName.endsWith('cubeModule.json') ||
                  entry.fileName.endsWith('plugin.json')
                ) {
                  try {
                    const config2 = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
                    pluginId = config2.name || entry.fileName.split('/')[0]
                    configFound = true
                  } catch (e) {}
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
            const finalPluginPath = path.join(this.pluginsDir, pluginId)
            const isAlreadyInstalled = fs.existsSync(finalPluginPath)
            if (isAlreadyInstalled) {
              try {
                const existingConfigPath = path.join(finalPluginPath, 'cubeModule.json')
                const fallbackConfigPath = path.join(finalPluginPath, 'plugin.json')
                let existingConfig
                if (fs.existsSync(existingConfigPath)) {
                  existingConfig = JSON.parse(fs.readFileSync(existingConfigPath, 'utf-8'))
                } else if (fs.existsSync(fallbackConfigPath)) {
                  existingConfig = JSON.parse(fs.readFileSync(fallbackConfigPath, 'utf-8'))
                }
                if (existingConfig) {
                  const newConfigPath = path.join(tempDir, 'cubeModule.json')
                  const newFallbackConfigPath = path.join(tempDir, 'plugin.json')
                  let newConfig
                  if (fs.existsSync(newConfigPath)) {
                    newConfig = JSON.parse(fs.readFileSync(newConfigPath, 'utf-8'))
                  } else if (fs.existsSync(newFallbackConfigPath)) {
                    newConfig = JSON.parse(fs.readFileSync(newFallbackConfigPath, 'utf-8'))
                  }
                  if (newConfig && existingConfig.version === newConfig.version) {
                    fs.rmSync(tempDir, { recursive: true, force: true })
                    throw new Error(
                      `插件 "${pluginId}" (版本 ${existingConfig.version}) 已经安装，无需重复安装`
                    )
                  }
                } else {
                  console.warn(
                    `Plugin directory exists but config file not found, removing: ${finalPluginPath}`
                  )
                  fs.rmSync(finalPluginPath, { recursive: true, force: true })
                }
              } catch (configError) {
                console.warn(
                  'Failed to read existing plugin config, removing corrupted plugin directory:',
                  configError
                )
                if (fs.existsSync(finalPluginPath)) {
                  fs.rmSync(finalPluginPath, { recursive: true, force: true })
                }
              }
            }
            if (fs.existsSync(finalPluginPath)) {
              fs.rmSync(finalPluginPath, { recursive: true, force: true })
            }
            this.copyDirectory(tempDir, finalPluginPath)
            fs.rmSync(tempDir, { recursive: true, force: true })
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
  copyDirectory(src, dest) {
    fs.mkdirSync(dest, { recursive: true })
    const entries = fs.readdirSync(src)
    for (const entry of entries) {
      const srcPath = path.join(src, entry)
      const destPath = path.join(dest, entry)
      if (fs.statSync(srcPath).isDirectory()) {
        this.copyDirectory(srcPath, destPath)
      } else {
        const content = fs.readFileSync(srcPath)
        fs.writeFileSync(destPath, content)
      }
    }
  }
  /**
   * 保存插件配置
   */
  async savePluginConfig(plugin) {
    const configPath =
      plugin.type === 'frontend'
        ? path.join(plugin.path, 'cubeModule.json')
        : path.join(plugin.path, 'plugin.json')
    fs.writeFileSync(configPath, JSON.stringify(plugin.config, null, 2))
  }
}
var Permission = /* @__PURE__ */ ((Permission2) => {
  Permission2['FILE_SYSTEM_READ'] = 'filesystem:read'
  Permission2['FILE_SYSTEM_WRITE'] = 'filesystem:write'
  Permission2['NETWORK_ACCESS'] = 'network:access'
  Permission2['SYSTEM_INFO'] = 'system:info'
  Permission2['CLIPBOARD'] = 'clipboard'
  Permission2['NOTIFICATIONS'] = 'notifications'
  Permission2['CAMERA'] = 'camera'
  Permission2['MICROPHONE'] = 'microphone'
  Permission2['LOCATION'] = 'location'
  Permission2['STORAGE'] = 'storage'
  return Permission2
})(Permission || {})
class SecurityManager {
  pluginPolicies = /* @__PURE__ */ new Map()
  userPermissions = /* @__PURE__ */ new Map()
  constructor() {
    this.initializeDefaultPolicies()
  }
  /**
   * 初始化默认安全策略
   */
  initializeDefaultPolicies() {
    const frontendPolicy = {
      allowedPermissions: [
        'storage',
        'notifications'
        /* NOTIFICATIONS */
      ],
      sandboxed: false,
      // 禁用沙盒以允许preload脚本访问ipcRenderer
      maxMemoryUsage: 100,
      // 100MB
      maxExecutionTime: 5e3
      // 5秒
    }
    const systemPolicy = {
      allowedPermissions: [
        'filesystem:read',
        'network:access',
        'system:info',
        'storage',
        'notifications'
        /* NOTIFICATIONS */
      ],
      sandboxed: true,
      maxMemoryUsage: 500,
      // 500MB
      maxExecutionTime: 3e4
      // 30秒
    }
    this.pluginPolicies.set('frontend_default', frontendPolicy)
    this.pluginPolicies.set('system_default', systemPolicy)
  }
  /**
   * 为插件设置安全策略
   */
  setPluginPolicy(pluginId, policy) {
    this.pluginPolicies.set(pluginId, policy)
  }
  /**
   * 获取插件安全策略
   */
  getPluginPolicy(plugin) {
    let policy = this.pluginPolicies.get(plugin.id)
    if (policy) {
      return policy
    }
    const defaultKey = plugin.type === PluginType.FRONTEND ? 'frontend_default' : 'system_default'
    policy = this.pluginPolicies.get(defaultKey)
    if (policy) {
      return policy
    }
    return {
      allowedPermissions: [],
      sandboxed: true,
      maxMemoryUsage: 50,
      maxExecutionTime: 1e3
    }
  }
  /**
   * 检查插件是否有特定权限
   */
  async checkPermission(plugin, permission) {
    const policy = this.getPluginPolicy(plugin)
    if (!policy.allowedPermissions.includes(permission)) {
      return {
        granted: false,
        reason: `Permission ${permission} not allowed by plugin policy`
      }
    }
    const userPerms = this.userPermissions.get(plugin.id)
    if (userPerms && userPerms.has(permission)) {
      return { granted: true }
    }
    const userGranted = await this.requestUserPermission(plugin, permission)
    if (userGranted) {
      if (!this.userPermissions.has(plugin.id)) {
        this.userPermissions.set(plugin.id, /* @__PURE__ */ new Set())
      }
      this.userPermissions.get(plugin.id).add(permission)
      return { granted: true }
    }
    return {
      granted: false,
      reason: 'User denied permission'
    }
  }
  /**
   * 请求用户权限授权
   */
  async requestUserPermission(plugin, permission) {
    const permissionDescriptions = {
      ['filesystem:read']:
        /* FILE_SYSTEM_READ */
        '读取文件系统',
      ['filesystem:write']:
        /* FILE_SYSTEM_WRITE */
        '写入文件系统',
      ['network:access']:
        /* NETWORK_ACCESS */
        '访问网络',
      ['system:info']:
        /* SYSTEM_INFO */
        '获取系统信息',
      ['clipboard']:
        /* CLIPBOARD */
        '访问剪贴板',
      ['notifications']:
        /* NOTIFICATIONS */
        '发送通知',
      ['camera']:
        /* CAMERA */
        '访问摄像头',
      ['microphone']:
        /* MICROPHONE */
        '访问麦克风',
      ['location']:
        /* LOCATION */
        '获取位置信息',
      ['storage']:
        /* STORAGE */
        '访问本地存储'
    }
    const description = permissionDescriptions[permission] || permission
    const result = await electron.dialog.showMessageBox({
      type: 'question',
      buttons: ['允许', '拒绝'],
      defaultId: 1,
      title: '插件权限请求',
      message: `插件 "${plugin.config.name}" 请求权限`,
      detail: `该插件需要 "${description}" 权限才能正常工作。

是否允许？`
    })
    return result.response === 0
  }
  /**
   * 验证插件配置安全性
   */
  validatePluginSecurity(plugin) {
    const issues = []
    const config2 = plugin.config
    if (!config2.name || config2.name.length < 2) {
      issues.push('插件名称无效')
    }
    if (!config2.version || !/^\d+\.\d+\.\d+/.test(config2.version)) {
      issues.push('版本号格式无效')
    }
    if (config2.permissions) {
      const suspiciousPermissions = [
        'filesystem:write',
        'camera',
        'microphone',
        'location'
        /* LOCATION */
      ]
      const requestedSuspicious = config2.permissions.filter((p) =>
        suspiciousPermissions.includes(p)
      )
      if (requestedSuspicious.length > 0) {
        issues.push(`请求了敏感权限: ${requestedSuspicious.join(', ')}`)
      }
    }
    if (plugin.type === PluginType.FRONTEND);
    return {
      valid: issues.length === 0,
      issues
    }
  }
  /**
   * 创建沙箱环境配置
   */
  createSandboxConfig(plugin) {
    const policy = this.getPluginPolicy(plugin)
    return {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: policy.sandboxed,
      webSecurity: true,
      allowRunningInsecureContent: false,
      experimentalFeatures: false
    }
  }
  /**
   * 监控插件资源使用
   */
  monitorPluginResources(pluginId) {
    const policy = this.pluginPolicies.get(pluginId)
    if (!policy) return
    console.log(`Monitoring resources for plugin: ${pluginId}`)
  }
  /**
   * 撤销插件权限
   */
  revokePermission(pluginId, permission) {
    const userPerms = this.userPermissions.get(pluginId)
    if (userPerms) {
      userPerms.delete(permission)
      if (userPerms.size === 0) {
        this.userPermissions.delete(pluginId)
      }
    }
  }
  /**
   * 撤销插件所有权限
   */
  revokeAllPermissions(pluginId) {
    this.userPermissions.delete(pluginId)
  }
  /**
   * 获取插件已授权权限
   */
  getGrantedPermissions(pluginId) {
    const userPerms = this.userPermissions.get(pluginId)
    return userPerms ? Array.from(userPerms) : []
  }
  /**
   * 检查URL是否被允许访问
   */
  isUrlAllowed(plugin, url) {
    const policy = this.getPluginPolicy(plugin)
    if (policy.blockedDomains) {
      const hostname = new URL(url).hostname
      if (policy.blockedDomains.some((domain) => hostname.includes(domain))) {
        return false
      }
    }
    if (policy.allowedDomains) {
      const hostname = new URL(url).hostname
      return policy.allowedDomains.some((domain) => hostname.includes(domain))
    }
    return true
  }
}
class FrontendPluginRenderer {
  pluginWindows = /* @__PURE__ */ new Map()
  securityManager
  constructor(securityManager) {
    this.securityManager = securityManager
    this.setupIpcHandlers()
  }
  /**
   * 设置IPC处理器
   */
  setupIpcHandlers() {
    electron.ipcMain.handle('plugin:frontend:open', async (_event, pluginId) => {
      return await this.openPluginWindow(pluginId)
    })
    electron.ipcMain.handle('plugin:system:open-ui', async (_event, pluginId) => {
      return await this.openSystemPluginUIWindow(pluginId)
    })
    electron.ipcMain.handle('plugin:frontend:close', (_event, pluginId) => {
      return this.closePluginWindow(pluginId)
    })
    electron.ipcMain.handle('plugin:frontend:status', (_event, pluginId) => {
      const window = this.pluginWindows.get(pluginId)
      return {
        isOpen: !!window && !window.isDestroyed(),
        isVisible: window ? window.isVisible() : false,
        isFocused: window ? window.isFocused() : false
      }
    })
  }
  /**
   * 打开系统插件UI窗口
   */
  async openSystemPluginUIWindow(pluginId) {
    try {
      const existingWindow = this.pluginWindows.get(`${pluginId}-ui`)
      if (existingWindow && !existingWindow.isDestroyed()) {
        existingWindow.focus()
        return { success: true }
      }
      const plugin = await this.getPluginInfo(pluginId)
      if (!plugin || plugin.type !== PluginType.SYSTEM) {
        return { success: false, error: 'System plugin not found' }
      }
      const config2 = plugin.config
      if (!config2.ui || !config2.ui.components) {
        return { success: false, error: 'Plugin has no UI configuration' }
      }
      const window = await this.createSystemPluginUIWindow(plugin)
      this.pluginWindows.set(`${pluginId}-ui`, window)
      this.setupWindowEvents(`${pluginId}-ui`, window)
      return { success: true }
    } catch (error) {
      console.error(`Failed to open system plugin UI window for ${pluginId}:`, error)
      return { success: false, error: error instanceof Error ? error.message : String(error) }
    }
  }
  /**
   * 打开插件窗口
   */
  async openPluginWindow(pluginId) {
    try {
      console.log(`Opening frontend plugin window for: ${pluginId}`)
      const existingWindow = this.pluginWindows.get(pluginId)
      if (existingWindow && !existingWindow.isDestroyed()) {
        console.log(`Window already exists for ${pluginId}, focusing...`)
        existingWindow.focus()
        return { success: true }
      }
      console.log(`Getting plugin info for: ${pluginId}`)
      const plugin = await this.getPluginInfo(pluginId)
      console.log(
        `Plugin info retrieved:`,
        plugin ? { id: plugin.id, type: plugin.type, path: plugin.path } : 'null'
      )
      if (!plugin || plugin.type !== PluginType.FRONTEND) {
        console.error(`Frontend plugin not found or wrong type: ${pluginId}`)
        return { success: false, error: 'Frontend plugin not found' }
      }
      console.log(`Creating plugin window for: ${pluginId}`)
      const window = await this.createPluginWindow(plugin)
      this.pluginWindows.set(pluginId, window)
      this.setupWindowEvents(pluginId, window)
      console.log(`Plugin window created successfully for: ${pluginId}`)
      return { success: true }
    } catch (error) {
      console.error(`Failed to open plugin window for ${pluginId}:`, error)
      return { success: false, error: error instanceof Error ? error.message : String(error) }
    }
  }
  /**
   * 创建系统插件UI窗口
   */
  async createSystemPluginUIWindow(plugin) {
    const config2 = plugin.config
    const window = new electron.BrowserWindow({
      width: 1e3,
      height: 700,
      title: `${config2.name} v${config2.version} - UI`,
      show: false,
      autoHideMenuBar: true,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        sandbox: false,
        preload: path.join(__dirname, '../preload/index.js')
      }
    })
    window.webContents.on('did-fail-load', (_event, errorCode, errorDescription) => {
      console.error(`Failed to load plugin UI for ${plugin.id}:`, errorCode, errorDescription)
    })
    window.webContents.on('crashed', () => {
      console.error(`Plugin UI window crashed for ${plugin.id}`)
    })
    const isHtmlFile = config2.main && config2.main.endsWith('.html')
    try {
      if (isHtmlFile) {
        console.log(`Loading plugin HTML content for ${plugin.id}:`, config2.main)
        await this.loadPluginContent(window, plugin)
        console.log(`Content loaded successfully for ${plugin.id}, showing window`)
        window.show()
      } else {
        console.log(`Loading default UI config demo for ${plugin.id}`)
        const isDev = process.env.NODE_ENV === 'development'
        if (isDev && process.env['ELECTRON_RENDERER_URL']) {
          await window.loadURL(
            `${process.env['ELECTRON_RENDERER_URL']}/ui-config-demo.html?plugin=${plugin.id}`
          )
        } else {
          await window.loadFile(path.join(__dirname, '../renderer/ui-config-demo.html'), {
            query: { plugin: plugin.id }
          })
        }
        window.show()
      }
    } catch (error) {
      console.error(`Error loading content for plugin ${plugin.id}:`, error)
      window.show()
      return window
    }
    return window
  }
  /**
   * 创建插件窗口
   */
  async createPluginWindow(plugin) {
    const config2 = plugin.config
    const sandboxConfig = this.securityManager.createSandboxConfig(plugin)
    const partitionName = `plugin-${plugin.id}`
    const pluginSession = electron.session.fromPartition(partitionName, {
      cache: false
    })
    pluginSession.partition = partitionName
    await this.setupPluginSecurity(pluginSession, plugin)
    const window = new electron.BrowserWindow({
      width: 800,
      height: 600,
      title: `${config2.name} v${config2.version}`,
      show: false,
      autoHideMenuBar: true,
      webPreferences: {
        ...sandboxConfig,
        session: pluginSession,
        preload: path.join(__dirname, '../preload/plugin-preload.js')
      }
    })
    await this.loadPluginContent(window, plugin)
    console.log(`Showing plugin window for: ${plugin.id}`)
    window.show()
    return window
  }
  /**
   * 设置插件安全策略
   */
  async setupPluginSecurity(pluginSession, plugin) {
    pluginSession.webRequest.onHeadersReceived((details, callback) => {
      callback({
        responseHeaders: {
          ...details.responseHeaders,
          'Content-Security-Policy': [
            "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self';"
          ]
        }
      })
    })
    pluginSession.webRequest.onBeforeRequest((details, callback) => {
      const url = details.url
      if (!this.securityManager.isUrlAllowed(plugin, url)) {
        console.warn(`Blocked request to ${url} from plugin ${plugin.id}`)
        callback({ cancel: true })
        return
      }
      callback({ cancel: false })
    })
    pluginSession.setPermissionRequestHandler(async (_webContents, permission, callback) => {
      const permissionMap = {
        camera: 'camera',
        microphone: 'microphone',
        geolocation: 'location',
        notifications: 'notifications'
      }
      const mappedPermission = permissionMap[permission]
      if (mappedPermission) {
        const result = await this.securityManager.checkPermission(plugin, mappedPermission)
        callback(result.granted)
      } else {
        callback(false)
      }
    })
  }
  /**
   * 加载插件内容
   */
  async loadPluginContent(window, plugin) {
    const config2 = plugin.config
    const htmlPath = path.join(plugin.path, config2.main)
    return new Promise((resolve, reject) => {
      window.webContents.once('did-finish-load', async () => {
        try {
          console.log(`Page loaded for plugin ${plugin.id}, injecting API...`)
          await window.webContents.executeJavaScript(`
            new Promise((resolve) => {
              if (document.readyState === 'complete') {
                resolve()
              } else {
                window.addEventListener('load', resolve)
              }
            })
          `)
          const apiAvailable = await window.webContents.executeJavaScript(`
            typeof window.pluginAPI !== 'undefined'
          `)
          if (apiAvailable) {
            console.log(`Plugin API already available for ${plugin.id} via preload script`)
          } else {
            console.log(
              `Plugin API not found for ${plugin.id}, this should not happen with proper preload script`
            )
            await window.webContents.executeJavaScript(`
              try {
                window.pluginAPI = {
                  id: ${JSON.stringify(plugin.id)},
                  name: ${JSON.stringify(config2.name)},
                  version: ${JSON.stringify(config2.version)},
                  getPluginInfo: () => ({
                    id: ${JSON.stringify(plugin.id)},
                    name: ${JSON.stringify(config2.name)},
                    version: ${JSON.stringify(config2.version)},
                    description: ${JSON.stringify(config2.description || '')},
                    author: ${JSON.stringify(config2.author || '')},
                    path: ${JSON.stringify(plugin.path)}
                  }),
                  sendMessage: (message) => {
                    console.warn('Plugin API not properly loaded - sendMessage not available')
                    return Promise.reject(new Error('Plugin API not properly loaded'))
                  },
                  requestPermission: (permission) => {
                    console.warn('Plugin API not properly loaded - requestPermission not available')
                    return Promise.reject(new Error('Plugin API not properly loaded'))
                  }
                }
                console.log('Fallback Plugin API injected for:', ${JSON.stringify(plugin.id)})
              } catch (error) {
                console.error('Failed to inject fallback plugin API:', error)
                throw error
              }
            `)
          }
          await window.webContents.executeJavaScript(`
            try {
              // 确保 CustomEvent 可用
              if (typeof CustomEvent === 'undefined') {
                window.CustomEvent = function(event, params) {
                  params = params || { bubbles: false, cancelable: false, detail: undefined };
                  var evt = document.createEvent('CustomEvent');
                  evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
                  return evt;
                };
                CustomEvent.prototype = window.Event.prototype;
              }
              
              // 派发事件
              const readyEvent = new CustomEvent('pluginAPIReady');
              window.dispatchEvent(readyEvent);
            } catch (error) {
              console.error('Failed to dispatch pluginAPIReady event:', error)
            }
          `)
          console.log(`Plugin API injection completed for ${plugin.id}`)
          resolve()
        } catch (error) {
          console.error(`Failed to inject plugin API for ${plugin.id}:`, error)
          reject(error)
        }
      })
      window.webContents.once('did-fail-load', (_event, errorCode, errorDescription) => {
        console.error(
          `Failed to load plugin content for ${plugin.id}:`,
          errorCode,
          errorDescription
        )
        reject(new Error(`Failed to load plugin content: ${errorDescription}`))
      })
      console.log(`Loading HTML file for plugin ${plugin.id}:`, htmlPath)
      window.loadFile(htmlPath).catch(reject)
    })
  }
  /**
   * 设置窗口事件监听
   */
  setupWindowEvents(pluginId, window) {
    window.on('closed', () => {
      this.pluginWindows.delete(pluginId)
      console.log(`Plugin window closed: ${pluginId}`)
    })
    window.webContents.on('crashed', () => {
      console.error(`Plugin window crashed: ${pluginId}`)
      this.pluginWindows.delete(pluginId)
    })
    window.webContents.on('unresponsive', () => {
      console.warn(`Plugin window unresponsive: ${pluginId}`)
    })
    window.webContents.setWindowOpenHandler(() => {
      return { action: 'deny' }
    })
  }
  /**
   * 关闭插件窗口
   */
  closePluginWindow(pluginId) {
    const window = this.pluginWindows.get(pluginId)
    if (window && !window.isDestroyed()) {
      window.close()
      return true
    }
    return false
  }
  /**
   * 关闭所有插件窗口
   */
  closeAllPluginWindows() {
    for (const [_pluginId, window] of this.pluginWindows) {
      if (!window.isDestroyed()) {
        window.close()
      }
    }
    this.pluginWindows.clear()
  }
  /**
   * 获取插件信息（需要与PluginManager集成）
   */
  async getPluginInfo(pluginId) {
    console.log(`Requesting plugin info via IPC for: ${pluginId}`)
    return new Promise((resolve) => {
      electron.ipcMain.emit('plugin:get-info', null, pluginId, (plugin) => {
        console.log(
          `IPC response for plugin ${pluginId}:`,
          plugin ? { id: plugin.id, type: plugin.type } : 'null'
        )
        resolve(plugin)
      })
    })
  }
  /**
   * 向插件窗口发送消息
   */
  sendMessageToPlugin(pluginId, message) {
    const window = this.pluginWindows.get(pluginId)
    if (window && !window.isDestroyed()) {
      window.webContents.send('plugin:message', message)
    }
  }
  /**
   * 获取所有打开的插件窗口
   */
  getOpenPluginWindows() {
    const openWindows = []
    for (const [pluginId, window] of this.pluginWindows) {
      if (!window.isDestroyed()) {
        openWindows.push(pluginId)
      }
    }
    return openWindows
  }
  /**
   * 刷新插件窗口
   */
  refreshPluginWindow(pluginId) {
    const window = this.pluginWindows.get(pluginId)
    if (window && !window.isDestroyed()) {
      window.reload()
    }
  }
}
const readFileAsync = util.promisify(fs.readFile)
const writeFileAsync = util.promisify(fs.writeFile)
class PluginAPIHandler {
  securityManager
  pluginManager
  pluginStorage = /* @__PURE__ */ new Map()
  constructor(securityManager, pluginManager) {
    this.securityManager = securityManager
    this.pluginManager = pluginManager
    this.setupHandlers()
  }
  /**
   * 设置所有IPC处理器
   */
  setupHandlers() {
    this.removeExistingHandlers()
    electron.ipcMain.handle('plugin:info', this.handleGetPluginInfo.bind(this))
    electron.ipcMain.handle('plugin:permission:request', this.handleRequestPermission.bind(this))
    electron.ipcMain.handle('plugin:permission:check', this.handleCheckPermission.bind(this))
    electron.ipcMain.handle('plugin:message:send', this.handleSendMessage.bind(this))
    electron.ipcMain.handle('plugin:storage:get', this.handleStorageGet.bind(this))
    electron.ipcMain.handle('plugin:storage:set', this.handleStorageSet.bind(this))
    electron.ipcMain.handle('plugin:storage:remove', this.handleStorageRemove.bind(this))
    electron.ipcMain.handle('plugin:storage:clear', this.handleStorageClear.bind(this))
    electron.ipcMain.handle('plugin:notification:show', this.handleShowNotification.bind(this))
    electron.ipcMain.handle('plugin:system:info', this.handleGetSystemInfo.bind(this))
    electron.ipcMain.handle('plugin:system:open-external', this.handleOpenExternal.bind(this))
    electron.ipcMain.handle('plugin:ui:get-config', this.handleGetUIConfig.bind(this))
    electron.ipcMain.handle('plugin:ui:execute-action', this.handleExecuteUIAction.bind(this))
    electron.ipcMain.handle('plugin:files:read-text', this.handleReadTextFile.bind(this))
    electron.ipcMain.handle('plugin:files:write-text', this.handleWriteTextFile.bind(this))
    electron.ipcMain.handle('plugin:files:exists', this.handleFileExists.bind(this))
    electron.ipcMain.handle('plugin:files:select-file', this.handleSelectFile.bind(this))
    electron.ipcMain.handle('plugin:files:select-directory', this.handleSelectDirectory.bind(this))
    electron.ipcMain.handle('plugin:network:fetch', this.handleNetworkFetch.bind(this))
    electron.ipcMain.handle('plugin:network:is-online', this.handleIsOnline.bind(this))
    electron.ipcMain.handle('plugin:clipboard:read-text', this.handleClipboardReadText.bind(this))
    electron.ipcMain.handle('plugin:clipboard:write-text', this.handleClipboardWriteText.bind(this))
    electron.ipcMain.handle('plugin:clipboard:read-image', this.handleClipboardReadImage.bind(this))
    electron.ipcMain.handle(
      'plugin:clipboard:write-image',
      this.handleClipboardWriteImage.bind(this)
    )
    electron.ipcMain.on('plugin:window:close', this.handleWindowClose.bind(this))
    electron.ipcMain.on('plugin:window:minimize', this.handleWindowMinimize.bind(this))
    electron.ipcMain.handle('plugin:manager:list', this.handleListPlugins.bind(this))
    electron.ipcMain.handle(
      'plugin:manager:install-local',
      this.handleInstallLocalPlugin.bind(this)
    )
    electron.ipcMain.handle(
      'plugin:manager:install-remote',
      this.handleInstallRemotePlugin.bind(this)
    )
    electron.ipcMain.handle('plugin:manager:uninstall', this.handleUninstallPlugin.bind(this))
    electron.ipcMain.handle('plugin:manager:enable', this.handleEnablePlugin.bind(this))
    electron.ipcMain.handle('plugin:manager:disable', this.handleDisablePlugin.bind(this))
    electron.ipcMain.handle('plugin:manager:get-config', this.handleGetPluginConfig.bind(this))
    electron.ipcMain.handle('plugin:manager:set-config', this.handleSetPluginConfig.bind(this))
    electron.ipcMain.on('plugin:window:maximize', this.handleWindowMaximize.bind(this))
    electron.ipcMain.on('plugin:window:restore', this.handleWindowRestore.bind(this))
    electron.ipcMain.on('plugin:window:set-title', this.handleWindowSetTitle.bind(this))
    electron.ipcMain.on('plugin:window:set-size', this.handleWindowSetSize.bind(this))
  }
  /**
   * 移除现有的处理器
   */
  removeExistingHandlers() {
    const handlersToRemove = [
      'plugin:info',
      'plugin:permission:request',
      'plugin:permission:check',
      'plugin:message:send',
      'plugin:storage:get',
      'plugin:storage:set',
      'plugin:storage:remove',
      'plugin:storage:clear',
      'plugin:notification:show',
      'plugin:system:info',
      'plugin:system:open-external',
      'plugin:ui:get-config',
      'plugin:ui:execute-action',
      'plugin:files:read-text',
      'plugin:files:write-text',
      'plugin:files:exists',
      'plugin:files:select-file',
      'plugin:files:select-directory',
      'plugin:network:fetch',
      'plugin:network:is-online',
      'plugin:clipboard:read-text',
      'plugin:clipboard:write-text',
      'plugin:clipboard:read-image',
      'plugin:clipboard:write-image',
      'plugin:window:close',
      'plugin:window:minimize',
      'plugin:window:maximize',
      'plugin:window:restore',
      'plugin:window:set-title',
      'plugin:window:set-size'
    ]
    handlersToRemove.forEach((channel) => {
      try {
        electron.ipcMain.removeAllListeners(channel)
      } catch (error) {}
    })
  }
  /**
   * 获取当前插件ID（从事件中提取）
   */
  getPluginIdFromEvent(event) {
    const webContents = event.sender
    const session = webContents.session
    if (session.partition && session.partition.startsWith('plugin-')) {
      const pluginId = session.partition.replace('plugin-', '')
      return pluginId
    }
    return null
  }
  /**
   * 获取插件信息
   */
  async handleGetPluginInfo(event) {
    const pluginId = this.getPluginIdFromEvent(event)
    if (!pluginId) {
      throw new Error('Plugin ID not found')
    }
    const plugin = this.pluginManager.getPlugin(pluginId)
    if (!plugin) {
      throw new Error('Plugin not found')
    }
    return {
      id: plugin.id,
      name: plugin.config.name,
      version: plugin.config.version,
      description: plugin.config.description,
      type: plugin.type
    }
  }
  /**
   * 请求权限
   */
  async handleRequestPermission(event, permission) {
    const pluginId = this.getPluginIdFromEvent(event)
    if (!pluginId) {
      return false
    }
    const plugin = this.pluginManager.getPlugin(pluginId)
    if (!plugin) {
      return false
    }
    const result = await this.securityManager.checkPermission(plugin, permission)
    return result.granted
  }
  /**
   * 检查权限
   */
  async handleCheckPermission(event, permission) {
    const pluginId = this.getPluginIdFromEvent(event)
    if (!pluginId) {
      return false
    }
    const grantedPermissions = this.securityManager.getGrantedPermissions(pluginId)
    return grantedPermissions.includes(permission)
  }
  /**
   * 发送消息
   */
  async handleSendMessage(event, message) {
    const pluginId = this.getPluginIdFromEvent(event)
    if (!pluginId) {
      throw new Error('Plugin ID not found')
    }
    console.log(`Message from plugin ${pluginId}:`, message)
    const mainWindow = electron.BrowserWindow.getAllWindows().find(
      (w) => !w.webContents.session.partition?.startsWith('plugin-')
    )
    if (mainWindow) {
      mainWindow.webContents.send('plugin:message:from-plugin', pluginId, message)
    }
    return { success: true }
  }
  /**
   * 存储API - 获取
   */
  async handleStorageGet(event, key) {
    const pluginId = this.getPluginIdFromEvent(event)
    if (!pluginId) {
      return null
    }
    const pluginStorage = this.pluginStorage.get(pluginId)
    return pluginStorage ? pluginStorage.get(key) : null
  }
  /**
   * 存储API - 设置
   */
  async handleStorageSet(event, key, value) {
    const pluginId = this.getPluginIdFromEvent(event)
    if (!pluginId) {
      throw new Error('Plugin ID not found')
    }
    if (!this.pluginStorage.has(pluginId)) {
      this.pluginStorage.set(pluginId, /* @__PURE__ */ new Map())
    }
    this.pluginStorage.get(pluginId).set(key, value)
  }
  /**
   * 存储API - 删除
   */
  async handleStorageRemove(event, key) {
    const pluginId = this.getPluginIdFromEvent(event)
    if (!pluginId) {
      return
    }
    const pluginStorage = this.pluginStorage.get(pluginId)
    if (pluginStorage) {
      pluginStorage.delete(key)
    }
  }
  /**
   * 存储API - 清空
   */
  async handleStorageClear(event) {
    const pluginId = this.getPluginIdFromEvent(event)
    if (!pluginId) {
      return
    }
    this.pluginStorage.delete(pluginId)
  }
  /**
   * 显示通知
   */
  async handleShowNotification(event, title, options) {
    const pluginId = this.getPluginIdFromEvent(event)
    if (!pluginId) {
      throw new Error('Plugin ID not found')
    }
    const plugin = this.pluginManager.getPlugin(pluginId)
    if (!plugin) {
      throw new Error('Plugin not found')
    }
    const hasPermission = await this.securityManager.checkPermission(
      plugin,
      Permission.NOTIFICATIONS
    )
    if (!hasPermission.granted) {
      throw new Error('Permission denied: notifications')
    }
    new electron.Notification({
      title,
      body: options?.body || '',
      icon: options?.icon
    }).show()
  }
  /**
   * 获取系统信息
   */
  async handleGetSystemInfo(_) {
    return {
      platform: os.platform(),
      arch: os.arch(),
      version: os.version(),
      hostname: os.hostname(),
      cpus: os.cpus().length,
      memory: {
        total: os.totalmem(),
        free: os.freemem()
      }
    }
  }
  /**
   * 打开外部链接
   */
  async handleOpenExternal(event, url) {
    const pluginId = this.getPluginIdFromEvent(event)
    if (!pluginId) {
      throw new Error('Plugin ID not found')
    }
    const plugin = this.pluginManager.getPlugin(pluginId)
    if (!plugin) {
      throw new Error('Plugin not found')
    }
    if (!this.securityManager.isUrlAllowed(plugin, url)) {
      throw new Error('URL not allowed')
    }
    await electron.shell.openExternal(url)
  }
  /**
   * 读取文本文件
   */
  async handleReadTextFile(_, path2) {
    const content = await readFileAsync(path2, 'utf-8')
    return content
  }
  /**
   * 写入文本文件
   */
  async handleWriteTextFile(_, path2, content) {
    await writeFileAsync(path2, content, 'utf-8')
  }
  /**
   * 检查文件是否存在
   */
  async handleFileExists(_, path2) {
    return fs.existsSync(path2)
  }
  /**
   * 选择文件
   */
  async handleSelectFile(_, options) {
    const result = await electron.dialog.showOpenDialog({
      properties: ['openFile'],
      filters: options?.filters || [{ name: 'All Files', extensions: ['*'] }]
    })
    return result.filePaths
  }
  /**
   * 选择目录
   */
  async handleSelectDirectory(_, _options) {
    const result = await electron.dialog.showOpenDialog({
      properties: ['openDirectory']
    })
    return result.filePaths[0] || ''
  }
  /**
   * 网络请求
   */
  async handleNetworkFetch(_, url, options) {
    try {
      const { default: fetch } = await import('node-fetch')
      const response = await fetch(url, options)
      const data = await response.json()
      return {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        data
      }
    } catch (error) {
      throw new Error(
        `Network fetch failed: ${error instanceof Error ? error.message : String(error)}`
      )
    }
  }
  /**
   * 检查网络连接
   */
  async handleIsOnline(_) {
    try {
      const { default: fetch } = await import('node-fetch')
      await fetch('https://www.google.com')
      return true
    } catch {
      return false
    }
  }
  /**
   * 读取剪贴板文本
   */
  async handleClipboardReadText(_) {
    return electron.clipboard.readText()
  }
  /**
   * 写入剪贴板文本
   */
  async handleClipboardWriteText(_, text) {
    electron.clipboard.writeText(text)
  }
  /**
   * 读取剪贴板图片
   */
  async handleClipboardReadImage(_) {
    const image = electron.clipboard.readImage()
    return image.toDataURL()
  }
  /**
   * 写入剪贴板图片
   */
  async handleClipboardWriteImage(_, imageData) {
    const image = electron.nativeImage.createFromDataURL(imageData)
    electron.clipboard.writeImage(image)
  }
  /**
   * 窗口控制 - 关闭
   */
  handleWindowClose(event) {
    const window = electron.BrowserWindow.fromWebContents(event.sender)
    if (window) {
      window.close()
    }
  }
  /**
   * 窗口控制 - 最小化
   */
  handleWindowMinimize(event) {
    const window = electron.BrowserWindow.fromWebContents(event.sender)
    if (window) {
      window.minimize()
    }
  }
  /**
   * 窗口控制 - 最大化
   */
  handleWindowMaximize(event) {
    const window = electron.BrowserWindow.fromWebContents(event.sender)
    if (window) {
      if (window.isMaximized()) {
        window.restore()
      } else {
        window.maximize()
      }
    }
  }
  /**
   * 窗口控制 - 恢复
   */
  handleWindowRestore(event) {
    const window = electron.BrowserWindow.fromWebContents(event.sender)
    if (window) {
      window.restore()
    }
  }
  /**
   * 窗口控制 - 设置标题
   */
  handleWindowSetTitle(event, title) {
    const window = electron.BrowserWindow.fromWebContents(event.sender)
    if (window) {
      window.setTitle(title)
    }
  }
  /**
   * 窗口控制 - 设置大小
   */
  handleWindowSetSize(event, width, height) {
    const window = electron.BrowserWindow.fromWebContents(event.sender)
    if (window) {
      window.setSize(width, height)
    }
  }
  /**
   * 获取插件UI配置
   */
  async handleGetUIConfig(_, pluginId) {
    try {
      const plugin = this.pluginManager.getPlugin(pluginId)
      if (!plugin) {
        return { success: false, error: 'Plugin not found' }
      }
      if (plugin.type !== 'system') {
        return { success: false, error: 'Only system plugins support UI configuration' }
      }
      const config2 = plugin.config
      return {
        success: true,
        ui: config2.ui || { components: [], settings: null }
      }
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : String(error) }
    }
  }
  /**
   * 执行UI组件关联的动作
   */
  async handleExecuteUIAction(event, pluginId, actionName, params) {
    try {
      const pluginIdFromEvent = this.getPluginIdFromEvent(event)
      if (!pluginIdFromEvent) {
        return { success: false, error: 'Unable to determine plugin context' }
      }
      const plugin = this.pluginManager.getPlugin(pluginId)
      if (!plugin) {
        return { success: false, error: 'Plugin not found' }
      }
      const permissionResult = await this.securityManager.checkPermission(
        plugin,
        Permission.SYSTEM_INFO
      )
      if (!permissionResult.granted) {
        return { success: false, error: 'Permission denied' }
      }
      if (plugin.type !== 'system') {
        return { success: false, error: 'Only system plugins support UI actions' }
      }
      const result = await this.pluginManager.executeSystemPlugin(pluginId, actionName, params)
      return { success: true, result }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error)
      return { success: false, error: errorMessage }
    }
  }
  // 插件管理相关方法
  async handleListPlugins(_) {
    try {
      return await this.pluginManager.listPlugins()
    } catch (error) {
      console.error('Failed to list plugins:', error)
      return { success: false, error: error.message || 'Failed to list plugins' }
    }
  }
  async handleInstallLocalPlugin(_, zipPath) {
    try {
      return await this.pluginManager.installLocalPlugin(zipPath)
    } catch (error) {
      console.error('Failed to install local plugin:', error)
      return { success: false, error: error.message || 'Failed to install plugin' }
    }
  }
  async handleInstallRemotePlugin(_, url) {
    try {
      return await this.pluginManager.installRemotePlugin(url)
    } catch (error) {
      console.error('Failed to install remote plugin:', error)
      return { success: false, error: error.message || 'Failed to install plugin' }
    }
  }
  async handleUninstallPlugin(_, pluginId) {
    try {
      return await this.pluginManager.uninstallPlugin(pluginId)
    } catch (error) {
      console.error('Failed to uninstall plugin:', error)
      return { success: false, error: error.message || 'Failed to uninstall plugin' }
    }
  }
  async handleEnablePlugin(_, pluginId) {
    try {
      return await this.pluginManager.enablePlugin(pluginId)
    } catch (error) {
      console.error('Failed to enable plugin:', error)
      return { success: false, error: error.message || 'Failed to enable plugin' }
    }
  }
  async handleDisablePlugin(_, pluginId) {
    try {
      return await this.pluginManager.disablePlugin(pluginId)
    } catch (error) {
      console.error('Failed to disable plugin:', error)
      return { success: false, error: error.message || 'Failed to disable plugin' }
    }
  }
  async handleGetPluginConfig(_, pluginId) {
    try {
      return await this.pluginManager.getPluginConfig(pluginId)
    } catch (error) {
      console.error('Failed to get plugin config:', error)
      return { success: false, error: error.message || 'Failed to get plugin config' }
    }
  }
  async handleSetPluginConfig(_, pluginId, config2) {
    try {
      return await this.pluginManager.setPluginConfig(pluginId, config2)
    } catch (error) {
      console.error('Failed to set plugin config:', error)
      return { success: false, error: error.message || 'Failed to set plugin config' }
    }
  }
}
class PluginSystem {
  pluginManager
  securityManager
  frontendRenderer
  apiHandler
  initialized = false
  constructor() {
    this.securityManager = new SecurityManager()
    this.pluginManager = new PluginManager()
    this.frontendRenderer = new FrontendPluginRenderer(this.securityManager)
    this.apiHandler = new PluginAPIHandler(this.securityManager, this.pluginManager)
  }
  /**
   * 初始化插件系统
   */
  async initialize() {
    if (this.initialized) {
      console.warn('Plugin system already initialized')
      return
    }
    try {
      console.log('Initializing plugin system...')
      await electron.app.whenReady()
      await this.pluginManager.loadAllPlugins()
      this.setupPluginInfoHandler()
      this.initialized = true
      console.log('Plugin system initialized successfully')
    } catch (error) {
      console.error('Failed to initialize plugin system:', error)
      throw error
    }
  }
  /**
   * 设置插件信息获取处理器
   */
  setupPluginInfoHandler() {
    const { ipcMain } = require('electron')
    ipcMain.on('plugin:get-info', (_event, pluginId, callback) => {
      const plugin = this.pluginManager.getPlugin(pluginId)
      callback(plugin)
    })
  }
  /**
   * 获取插件管理器
   */
  getPluginManager() {
    return this.pluginManager
  }
  /**
   * 获取安全管理器
   */
  getSecurityManager() {
    return this.securityManager
  }
  /**
   * 获取前端渲染器
   */
  getFrontendRenderer() {
    return this.frontendRenderer
  }
  /**
   * 获取API处理器
   */
  getAPIHandler() {
    return this.apiHandler
  }
  /**
   * 安装插件
   */
  async installPlugin(pluginPath) {
    try {
      console.log(`Installing plugin from: ${pluginPath}`)
      await this.pluginManager.loadAllPlugins()
      return { success: true }
    } catch (error) {
      console.error('Failed to install plugin:', error)
      return { success: false, error: error instanceof Error ? error.message : String(error) }
    }
  }
  /**
   * 卸载插件
   */
  async uninstallPlugin(pluginId) {
    try {
      this.frontendRenderer.closePluginWindow(pluginId)
      const success = await this.pluginManager.unloadPlugin(pluginId)
      if (success) {
        this.securityManager.revokeAllPermissions(pluginId)
        return { success: true }
      } else {
        return { success: false, error: 'Plugin not found' }
      }
    } catch (error) {
      console.error('Failed to uninstall plugin:', error)
      return { success: false, error: error instanceof Error ? error.message : String(error) }
    }
  }
  /**
   * 重新加载插件
   */
  async reloadPlugin(pluginId) {
    try {
      await this.uninstallPlugin(pluginId)
      await this.pluginManager.loadAllPlugins()
      return { success: true }
    } catch (error) {
      console.error('Failed to reload plugin:', error)
      return { success: false, error: error instanceof Error ? error.message : String(error) }
    }
  }
  /**
   * 获取插件统计信息
   */
  getPluginStats() {
    const allPlugins = this.pluginManager.getAllPlugins()
    const frontendPlugins = allPlugins.filter((p) => p.type === 'frontend')
    const systemPlugins = allPlugins.filter((p) => p.type === 'system')
    const enabledPlugins = allPlugins.filter((p) => p.enabled)
    const openWindows = this.frontendRenderer.getOpenPluginWindows()
    return {
      total: allPlugins.length,
      frontend: frontendPlugins.length,
      system: systemPlugins.length,
      enabled: enabledPlugins.length,
      disabled: allPlugins.length - enabledPlugins.length,
      openWindows: openWindows.length
    }
  }
  /**
   * 清理插件系统
   */
  async cleanup() {
    if (!this.initialized) {
      return
    }
    try {
      console.log('Cleaning up plugin system...')
      this.frontendRenderer.closeAllPluginWindows()
      const allPlugins = this.pluginManager.getAllPlugins()
      for (const plugin of allPlugins) {
        await this.pluginManager.unloadPlugin(plugin.id)
      }
      this.initialized = false
      console.log('Plugin system cleaned up successfully')
    } catch (error) {
      console.error('Failed to cleanup plugin system:', error)
    }
  }
  /**
   * 检查插件系统是否已初始化
   */
  isInitialized() {
    return this.initialized
  }
}
const pluginSystem = new PluginSystem()
async function initPlugins() {
  await pluginSystem.initialize()
}
const userDataPath = electron.app.isReady()
  ? electron.app.getPath('userData')
  : path.join(process.cwd(), 'userData')
const config = {
  database: {
    path: path.join(userDataPath, 'whytalk.db'),
    backupPath: path.join(userDataPath, 'backups')
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET || 'whytalk-default-secret-change-in-production',
    jwtExpiresIn: '7d',
    refreshTokenExpiresIn: '30d'
  },
  upload: {
    maxFileSize: 100 * 1024 * 1024,
    // 100MB
    allowedTypes: [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'video/mp4',
      'video/webm',
      'audio/mp3',
      'audio/wav',
      'audio/ogg',
      'application/pdf',
      'text/plain',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ],
    uploadPath: path.join(userDataPath, 'uploads')
  },
  chat: {
    maxMessageLength: 5e3,
    maxHistoryDays: 365
  },
  user: {
    offlineTimeoutMinutes: 5
  }
}
function ensureDirectories() {
  const dirs = [config.upload.uploadPath, config.database.backupPath]
  for (const dir of dirs) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
  }
}
class DatabaseManager {
  db = null
  static instance
  constructor() {}
  static getInstance() {
    if (!DatabaseManager.instance) {
      DatabaseManager.instance = new DatabaseManager()
    }
    return DatabaseManager.instance
  }
  async initialize() {
    if (this.db) {
      return
    }
    try {
      this.db = new Database(config.database.path)
      this.db.pragma('journal_mode = WAL')
      this.db.pragma('foreign_keys = ON')
      await this.executeSchema()
      console.log('Database initialized successfully')
    } catch (error) {
      console.error('Failed to initialize database:', error)
      throw error
    }
  }
  async executeSchema() {
    try {
      let schemaPath
      if (process.env.NODE_ENV === 'development') {
        schemaPath = path.join(__dirname, '../../../src/main/services/database/schema.sql')
      } else {
        schemaPath = path.join(__dirname, 'schema.sql')
      }
      if (!fs.existsSync(schemaPath)) {
        const alternativePaths = [
          path.join(process.cwd(), 'src/main/services/database/schema.sql'),
          path.join(process.cwd(), 'out/main/schema.sql'),
          path.join(__dirname, '../../../src/main/services/database/schema.sql'),
          path.join(__dirname, 'schema.sql')
        ]
        for (const path2 of alternativePaths) {
          if (fs.existsSync(path2)) {
            schemaPath = path2
            break
          }
        }
      }
      if (!fs.existsSync(schemaPath)) {
        throw new Error(`Schema file not found. Tried paths: ${schemaPath}`)
      }
      const schema = fs.readFileSync(schemaPath, 'utf-8')
      this.db.exec(schema)
      console.log('Database schema executed successfully')
    } catch (error) {
      console.error('Failed to execute database schema:', error)
      throw error
    }
  }
  getDatabase() {
    if (!this.db) {
      throw new Error('Database not initialized')
    }
    return this.db
  }
  async close() {
    if (this.db) {
      this.db.close()
      this.db = null
      console.log('Database connection closed')
    }
  }
  // 事务支持
  transaction(fn) {
    if (!this.db) {
      throw new Error('Database not initialized')
    }
    const transaction = this.db.transaction(fn)
    return transaction(this.db)
  }
  // 准备语句缓存
  preparedStatements = /* @__PURE__ */ new Map()
  prepare(sql) {
    if (!this.db) {
      throw new Error('Database not initialized')
    }
    if (!this.preparedStatements.has(sql)) {
      this.preparedStatements.set(sql, this.db.prepare(sql))
    }
    return this.preparedStatements.get(sql)
  }
  // 清理准备语句
  clearPreparedStatements() {
    this.preparedStatements.clear()
  }
  // 数据库备份
  async backup(backupPath) {
    if (!this.db) {
      throw new Error('Database not initialized')
    }
    try {
      await this.db.backup(backupPath)
      console.log('Database backup completed:', backupPath)
    } catch (error) {
      console.error('Database backup failed:', error)
      throw error
    }
  }
  // 数据库优化
  async optimize() {
    if (!this.db) {
      throw new Error('Database not initialized')
    }
    try {
      this.db.pragma('optimize')
      console.log('Database optimized')
    } catch (error) {
      console.error('Database optimization failed:', error)
    }
  }
  // 获取数据库统计信息
  getStats() {
    if (!this.db) {
      throw new Error('Database not initialized')
    }
    try {
      const pageCount = this.db.pragma('page_count', { simple: true })
      const pageSize = this.db.pragma('page_size', { simple: true })
      const freePages = this.db.pragma('freelist_count', { simple: true })
      return {
        totalPages: pageCount,
        pageSize,
        freePages,
        usedPages: pageCount - freePages,
        totalSize: pageCount * pageSize,
        usedSize: (pageCount - freePages) * pageSize
      }
    } catch (error) {
      console.error('Failed to get database stats:', error)
      return null
    }
  }
}
const databaseManager = DatabaseManager.getInstance()
class AuthService {
  JWT_SECRET = config.auth.jwtSecret
  JWT_EXPIRES_IN = config.auth.jwtExpiresIn
  TOKEN_EXPIRES_IN = 7 * 24 * 60 * 60
  // 7天，以秒为单位
  // 生成密码哈希
  hashPassword(password, salt) {
    return crypto.pbkdf2Sync(password, salt, 1e4, 64, 'sha512').toString('hex')
  }
  // 生成盐值
  generateSalt() {
    return crypto.randomBytes(32).toString('hex')
  }
  // 生成 JWT Token
  generateToken(userId, mobile) {
    const payload = {
      userId,
      mobile,
      iat: Math.floor(Date.now() / 1e3)
    }
    const secret = this.JWT_SECRET || 'default-secret-key'
    const expiresIn = this.JWT_EXPIRES_IN || '7d'
    return jsonwebtoken.sign(payload, secret, { expiresIn })
  }
  // 验证 JWT Token
  verifyToken(token) {
    try {
      const secret = this.JWT_SECRET || 'default-secret-key'
      return jsonwebtoken.verify(token, secret)
    } catch (error) {
      throw new Error('Invalid token')
    }
  }
  // 用户登录
  async login(request) {
    const db = databaseManager.getDatabase()
    try {
      const stmt = db.prepare('SELECT * FROM users WHERE mobile = ? AND status = 1')
      const user = stmt.get(request.mobile)
      if (!user) {
        throw new Error('用户不存在或已被禁用')
      }
      const hashedPassword = this.hashPassword(request.password, user.salt)
      if (hashedPassword !== user.password_hash) {
        throw new Error('密码错误')
      }
      const accessToken = this.generateToken(user.id, user.mobile)
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1e3)
      const sessionStmt = db.prepare(`
        INSERT OR REPLACE INTO user_sessions 
        (user_id, access_token, expires_at, platform, is_active, created_at, updated_at)
        VALUES (?, ?, ?, ?, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      `)
      sessionStmt.run(user.id, accessToken, expiresAt.toISOString(), request.platform)
      const onlineStmt = db.prepare(`
        INSERT OR REPLACE INTO user_online_status 
        (user_id, status, last_seen, platform)
        VALUES (?, 'online', CURRENT_TIMESTAMP, ?)
      `)
      onlineStmt.run(user.id, request.platform)
      const userInfo = {
        id: user.id,
        mobile: user.mobile,
        nickname: user.nickname,
        avatar: user.avatar,
        motto: user.motto,
        email: user.email,
        gender: user.gender,
        birthday: user.birthday,
        status: user.status,
        created_at: user.created_at,
        updated_at: user.updated_at
      }
      return {
        access_token: accessToken,
        expires_in: 7 * 24 * 60 * 60,
        // 7天，以秒为单位
        type: 'Bearer',
        user: userInfo
      }
    } catch (error) {
      console.error('Login failed:', error)
      throw error instanceof Error ? error : new Error(String(error))
    }
  }
  // 用户注册
  async register(request) {
    const db = databaseManager.getDatabase()
    try {
      const existingUser = db.prepare('SELECT id FROM users WHERE mobile = ?').get(request.mobile)
      if (existingUser) {
        throw new Error('手机号已被注册')
      }
      const salt = this.generateSalt()
      const passwordHash = this.hashPassword(request.password, salt)
      const stmt = db.prepare(`
        INSERT INTO users (mobile, nickname, password_hash, salt, created_at, updated_at)
        VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      `)
      stmt.run(request.mobile, request.nickname, passwordHash, salt)
      console.log('User registered successfully:', request.mobile)
    } catch (error) {
      console.error('Registration failed:', error)
      throw error instanceof Error ? error : new Error(String(error))
    }
  }
  // 用户登出
  async logout(token) {
    const db = databaseManager.getDatabase()
    try {
      const payload = this.verifyToken(token)
      const sessionStmt = db.prepare('DELETE FROM user_sessions WHERE access_token = ?')
      sessionStmt.run(token)
      const onlineStmt = db.prepare(`
        UPDATE user_online_status 
        SET status = 'offline', last_seen = CURRENT_TIMESTAMP 
        WHERE user_id = ?
      `)
      onlineStmt.run(payload.userId)
      console.log('User logged out successfully:', payload.mobile)
    } catch (error) {
      console.error('Logout failed:', error)
      throw error instanceof Error ? error : new Error(String(error))
    }
  }
  // 忘记密码
  async forgetPassword(mobile, newPassword, _smsCode) {
    const db = databaseManager.getDatabase()
    try {
      const user = db.prepare('SELECT id FROM users WHERE mobile = ?').get(mobile)
      if (!user) {
        throw new Error('用户不存在')
      }
      const salt = this.generateSalt()
      const passwordHash = this.hashPassword(newPassword, salt)
      const stmt = db.prepare(`
        UPDATE users 
        SET password_hash = ?, salt = ?, updated_at = CURRENT_TIMESTAMP 
        WHERE id = ?
      `)
      stmt.run(passwordHash, salt, user.id)
      const sessionStmt = db.prepare('DELETE FROM user_sessions WHERE user_id = ?')
      sessionStmt.run(user.id)
      console.log('Password reset successfully:', mobile)
    } catch (error) {
      console.error('Password reset failed:', error)
      throw error instanceof Error ? error : new Error(String(error))
    }
  }
  // 验证会话是否有效
  async validateSession(token) {
    if (!token) {
      console.warn('validateSession: No token provided')
      return null
    }
    const db = databaseManager.getDatabase()
    try {
      const payload = this.verifyToken(token)
      console.log('Token payload verified:', { userId: payload.userId, mobile: payload.mobile })
      const sessionStmt = db.prepare(`
        SELECT s.*, u.* FROM user_sessions s
        JOIN users u ON s.user_id = u.id
        WHERE s.access_token = ? AND s.is_active = 1 AND s.expires_at > CURRENT_TIMESTAMP
      `)
      const session = sessionStmt.get(token)
      if (!session) {
        console.warn(
          'validateSession: Session not found or expired for token:',
          token.substring(0, 20) + '...'
        )
        const expiredSessionStmt = db.prepare(`
          SELECT expires_at FROM user_sessions 
          WHERE access_token = ?
        `)
        const expiredSession = expiredSessionStmt.get(token)
        if (expiredSession) {
          console.warn(
            'validateSession: Found expired session, expires_at:',
            expiredSession.expires_at
          )
        }
        return null
      }
      console.log('validateSession: Session found for user:', session.mobile)
      const updateStmt = db.prepare(`
        UPDATE user_sessions 
        SET updated_at = CURRENT_TIMESTAMP 
        WHERE access_token = ?
      `)
      updateStmt.run(token)
      return {
        id: session.user_id,
        mobile: session.mobile,
        nickname: session.nickname,
        avatar: session.avatar,
        motto: session.motto,
        email: session.email,
        gender: session.gender,
        birthday: session.birthday,
        status: session.status,
        created_at: session.created_at,
        updated_at: session.updated_at
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('jwt expired')) {
          console.warn('validateSession: JWT token expired')
        } else if (
          error.message.includes('invalid token') ||
          error.message.includes('Invalid token')
        ) {
          console.warn('validateSession: Invalid JWT token format')
        } else {
          console.error('validateSession: Unexpected error:', error.message)
        }
      } else {
        console.error('validateSession: Unknown error:', error)
      }
      return null
    }
  }
  // 刷新令牌
  async refreshToken(oldToken) {
    const db = databaseManager.getDatabase()
    try {
      const payload = this.verifyToken(oldToken)
      const newToken = this.generateToken(payload.userId, payload.mobile)
      const expiresAt = new Date(Date.now() + this.TOKEN_EXPIRES_IN * 1e3)
      const stmt = db.prepare(`
        UPDATE user_sessions 
        SET access_token = ?, expires_at = ?, updated_at = CURRENT_TIMESTAMP 
        WHERE access_token = ?
      `)
      stmt.run(newToken, expiresAt.toISOString(), oldToken)
      return newToken
    } catch (error) {
      console.error('Token refresh failed:', error)
      throw error instanceof Error ? error : new Error(String(error))
    }
  }
  // 清理过期会话
  async cleanupExpiredSessions() {
    const db = databaseManager.getDatabase()
    try {
      const stmt = db.prepare('DELETE FROM user_sessions WHERE expires_at < CURRENT_TIMESTAMP')
      const result = stmt.run()
      console.log(`Cleaned up ${result.changes} expired sessions`)
    } catch (error) {
      console.error('Session cleanup failed:', error)
    }
  }
}
const authService = new AuthService()
class ChatService extends events.EventEmitter {
  constructor() {
    super()
  }
  // 获取会话列表
  async getTalkList(userId) {
    const db = databaseManager.getDatabase()
    try {
      const stmt = db.prepare(`
        SELECT c.*, 
               CASE 
                 WHEN c.talk_mode = 1 THEN u.nickname
                 WHEN c.talk_mode = 2 THEN g.name
               END as target_name,
               CASE 
                 WHEN c.talk_mode = 1 THEN u.avatar
                 WHEN c.talk_mode = 2 THEN g.avatar
               END as target_avatar
        FROM conversations c
        LEFT JOIN users u ON c.talk_mode = 1 AND c.to_from_id = u.id
        LEFT JOIN groups g ON c.talk_mode = 2 AND c.to_from_id = g.id
        WHERE c.user_id = ?
        ORDER BY c.is_top DESC, c.updated_at DESC
      `)
      const conversations = stmt.all(userId)
      return conversations.map((conv) => ({
        id: conv.id,
        user_id: conv.user_id,
        talk_mode: conv.talk_mode,
        to_from_id: conv.to_from_id,
        is_top: conv.is_top,
        is_disturb: conv.is_disturb,
        unread_count: conv.unread_count,
        last_message_id: conv.last_message_id,
        updated_at: conv.updated_at,
        target_info: {
          id: conv.to_from_id,
          name: conv.target_name || '',
          avatar: conv.target_avatar || ''
        }
      }))
    } catch (error) {
      console.error('Failed to get talk list:', error)
      throw error
    }
  }
  // 创建会话
  async createTalk(userId, talkMode, toFromId) {
    const db = databaseManager.getDatabase()
    try {
      const stmt = db.prepare(`
        INSERT OR IGNORE INTO conversations 
        (user_id, talk_mode, to_from_id, updated_at)
        VALUES (?, ?, ?, CURRENT_TIMESTAMP)
      `)
      stmt.run(userId, talkMode, toFromId)
    } catch (error) {
      console.error('Failed to create talk:', error)
      throw error
    }
  }
  // 删除会话
  async deleteTalk(userId, talkMode, toFromId) {
    const db = databaseManager.getDatabase()
    try {
      const stmt = db.prepare(`
        DELETE FROM conversations 
        WHERE user_id = ? AND talk_mode = ? AND to_from_id = ?
      `)
      stmt.run(userId, talkMode, toFromId)
    } catch (error) {
      console.error('Failed to delete talk:', error)
      throw error
    }
  }
  // 置顶会话
  async toggleTalkTop(userId, talkMode, toFromId, action) {
    const db = databaseManager.getDatabase()
    try {
      const stmt = db.prepare(`
        UPDATE conversations 
        SET is_top = ?, updated_at = CURRENT_TIMESTAMP
        WHERE user_id = ? AND talk_mode = ? AND to_from_id = ?
      `)
      stmt.run(action, userId, talkMode, toFromId)
    } catch (error) {
      console.error('Failed to toggle talk top:', error)
      throw error
    }
  }
  // 设置免打扰
  async toggleTalkDisturb(userId, talkMode, toFromId, action) {
    const db = databaseManager.getDatabase()
    try {
      const stmt = db.prepare(`
        UPDATE conversations 
        SET is_disturb = ?, updated_at = CURRENT_TIMESTAMP
        WHERE user_id = ? AND talk_mode = ? AND to_from_id = ?
      `)
      stmt.run(action, userId, talkMode, toFromId)
    } catch (error) {
      console.error('Failed to toggle talk disturb:', error)
      throw error
    }
  }
  // 清除未读数
  async clearUnread(userId, talkMode, toFromId) {
    const db = databaseManager.getDatabase()
    try {
      const stmt = db.prepare(`
        UPDATE conversations 
        SET unread_count = 0, updated_at = CURRENT_TIMESTAMP
        WHERE user_id = ? AND talk_mode = ? AND to_from_id = ?
      `)
      stmt.run(userId, talkMode, toFromId)
    } catch (error) {
      console.error('Failed to clear unread:', error)
      throw error
    }
  }
  // 获取聊天记录
  async getTalkRecords(userId, request) {
    const db = databaseManager.getDatabase()
    try {
      let whereClause = `
        WHERE m.talk_mode = ? AND m.to_from_id = ? AND m.is_revoke = 0
        AND m.id NOT IN (
          SELECT message_id FROM message_deletions WHERE user_id = ?
        )
      `
      const params = [request.talk_mode, request.to_from_id, userId]
      if (request.cursor > 0) {
        whereClause += ' AND m.id < ?'
        params.push(request.cursor)
      }
      const stmt = db.prepare(`
        SELECT m.*, u.nickname as from_nickname, u.avatar as from_avatar
        FROM messages m
        LEFT JOIN users u ON m.from_user_id = u.id
        ${whereClause}
        ORDER BY m.id DESC
        LIMIT ?
      `)
      params.push(request.limit)
      const messages = stmt.all(...params)
      return messages.map((msg) => ({
        id: msg.id,
        msg_id: msg.msg_id,
        talk_mode: msg.talk_mode,
        from_user_id: msg.from_user_id,
        to_from_id: msg.to_from_id,
        message_type: msg.message_type,
        content: msg.content,
        quote_id: msg.quote_id,
        is_revoke: msg.is_revoke,
        created_at: msg.created_at,
        from_user: {
          id: msg.from_user_id,
          nickname: msg.from_nickname || '',
          avatar: msg.from_avatar || ''
        }
      }))
    } catch (error) {
      console.error('Failed to get talk records:', error)
      throw error
    }
  }
  // 发送消息
  async sendMessage(fromUserId, request) {
    try {
      return databaseManager.transaction((db) => {
        const msgId = request.msg_id || this.generateMessageId()
        const messageStmt = db.prepare(`
          INSERT INTO messages 
          (msg_id, talk_mode, from_user_id, to_from_id, message_type, content, quote_id, created_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
        `)
        const messageType = this.getMessageType(request.type)
        const content = JSON.stringify(request.body)
        const result = messageStmt.run(
          msgId,
          request.talk_mode,
          fromUserId,
          request.to_from_id,
          messageType,
          content,
          request.quote_id || ''
        )
        const messageId = result.lastInsertRowid
        const conversationStmt = db.prepare(`
          INSERT OR REPLACE INTO conversations 
          (user_id, talk_mode, to_from_id, last_message_id, updated_at)
          VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
        `)
        conversationStmt.run(fromUserId, request.talk_mode, request.to_from_id, messageId)
        if (request.talk_mode === 1) {
          const receiverConvStmt = db.prepare(`
            INSERT INTO conversations 
            (user_id, talk_mode, to_from_id, last_message_id, unread_count, updated_at)
            VALUES (?, ?, ?, ?, 1, CURRENT_TIMESTAMP)
            ON CONFLICT(user_id, talk_mode, to_from_id) DO UPDATE SET
            last_message_id = excluded.last_message_id,
            unread_count = unread_count + 1,
            updated_at = excluded.updated_at
          `)
          receiverConvStmt.run(request.to_from_id, request.talk_mode, fromUserId, messageId)
        } else if (request.talk_mode === 2) {
          const membersStmt = db.prepare(`
            SELECT user_id FROM group_members 
            WHERE group_id = ? AND user_id != ?
          `)
          const members = membersStmt.all(request.to_from_id, fromUserId)
          const memberConvStmt = db.prepare(`
            INSERT INTO conversations 
            (user_id, talk_mode, to_from_id, last_message_id, unread_count, updated_at)
            VALUES (?, ?, ?, ?, 1, CURRENT_TIMESTAMP)
            ON CONFLICT(user_id, talk_mode, to_from_id) DO UPDATE SET
            last_message_id = excluded.last_message_id,
            unread_count = unread_count + 1,
            updated_at = excluded.updated_at
          `)
          for (const member of members) {
            memberConvStmt.run(member.user_id, request.talk_mode, request.to_from_id, messageId)
          }
        }
        const fullMessageStmt = db.prepare(`
          SELECT m.*, u.nickname as from_nickname, u.avatar as from_avatar
          FROM messages m
          LEFT JOIN users u ON m.from_user_id = u.id
          WHERE m.id = ?
        `)
        const fullMessage = fullMessageStmt.get(messageId)
        const message = {
          id: fullMessage.id,
          msg_id: fullMessage.msg_id,
          talk_mode: fullMessage.talk_mode,
          from_user_id: fullMessage.from_user_id,
          to_from_id: fullMessage.to_from_id,
          message_type: fullMessage.message_type,
          content: fullMessage.content,
          quote_id: fullMessage.quote_id,
          is_revoke: fullMessage.is_revoke,
          created_at: fullMessage.created_at,
          from_user: {
            id: fullMessage.from_user_id,
            nickname: fullMessage.from_nickname || '',
            avatar: fullMessage.from_avatar || ''
          }
        }
        this.emit('message:new', message)
        return message
      })
    } catch (error) {
      console.error('Failed to send message:', error)
      throw error
    }
  }
  // 撤回消息
  async revokeMessage(userId, talkMode, toFromId, msgId) {
    const db = databaseManager.getDatabase()
    try {
      const checkStmt = db.prepare(`
        SELECT id, created_at FROM messages 
        WHERE msg_id = ? AND from_user_id = ? AND talk_mode = ? AND to_from_id = ?
      `)
      const message = checkStmt.get(msgId, userId, talkMode, toFromId)
      if (!message) {
        throw new Error('消息不存在或无权撤回')
      }
      const messageTime = new Date(message.created_at).getTime()
      const now = Date.now()
      if (now - messageTime > 2 * 60 * 1e3) {
        throw new Error('超过撤回时限')
      }
      const revokeStmt = db.prepare(`
        UPDATE messages 
        SET is_revoke = 1 
        WHERE msg_id = ?
      `)
      revokeStmt.run(msgId)
      this.emit('message:revoke', { msgId, talkMode, toFromId })
    } catch (error) {
      console.error('Failed to revoke message:', error)
      throw error
    }
  }
  // 删除消息
  async deleteMessage(userId, talkMode, toFromId, msgIds) {
    try {
      return databaseManager.transaction((db) => {
        const stmt = db.prepare(`
          INSERT OR IGNORE INTO message_deletions (user_id, message_id, deleted_at)
          SELECT ?, m.id, CURRENT_TIMESTAMP
          FROM messages m
          WHERE m.msg_id = ? AND m.talk_mode = ? AND m.to_from_id = ?
        `)
        for (const msgId of msgIds) {
          stmt.run(userId, msgId, talkMode, toFromId)
        }
      })
    } catch (error) {
      console.error('Failed to delete messages:', error)
      throw error
    }
  }
  // 获取转发记录
  async getForwardRecords(msgIds) {
    const db = databaseManager.getDatabase()
    try {
      const placeholders = msgIds.map(() => '?').join(',')
      const stmt = db.prepare(`
        SELECT m.*, u.nickname as from_nickname, u.avatar as from_avatar
        FROM messages m
        LEFT JOIN users u ON m.from_user_id = u.id
        WHERE m.msg_id IN (${placeholders}) AND m.is_revoke = 0
        ORDER BY m.created_at ASC
      `)
      const messages = stmt.all(...msgIds)
      return messages.map((msg) => ({
        id: msg.id,
        msg_id: msg.msg_id,
        talk_mode: msg.talk_mode,
        from_user_id: msg.from_user_id,
        to_from_id: msg.to_from_id,
        message_type: msg.message_type,
        content: msg.content,
        quote_id: msg.quote_id,
        is_revoke: msg.is_revoke,
        created_at: msg.created_at,
        from_user: {
          id: msg.from_user_id,
          nickname: msg.from_nickname || '',
          avatar: msg.from_avatar || ''
        }
      }))
    } catch (error) {
      console.error('Failed to get forward records:', error)
      throw error
    }
  }
  // 搜索历史记录
  async searchHistoryRecords(userId, keyword, talkMode, toFromId) {
    const db = databaseManager.getDatabase()
    try {
      let whereClause = `
        WHERE m.is_revoke = 0 
        AND m.content LIKE ?
        AND m.id NOT IN (
          SELECT message_id FROM message_deletions WHERE user_id = ?
        )
      `
      const params = [`%${keyword}%`, userId]
      if (talkMode !== void 0 && toFromId !== void 0) {
        whereClause += ' AND m.talk_mode = ? AND m.to_from_id = ?'
        params.push(talkMode, toFromId)
      } else {
        whereClause += `
          AND (
            (m.talk_mode = 1 AND (m.from_user_id = ? OR m.to_from_id = ?))
            OR (m.talk_mode = 2 AND m.to_from_id IN (
              SELECT group_id FROM group_members WHERE user_id = ?
            ))
          )
        `
        params.push(userId, userId, userId)
      }
      const stmt = db.prepare(`
        SELECT m.*, u.nickname as from_nickname, u.avatar as from_avatar
        FROM messages m
        LEFT JOIN users u ON m.from_user_id = u.id
        ${whereClause}
        ORDER BY m.created_at DESC
        LIMIT 100
      `)
      const messages = stmt.all(...params)
      return messages.map((msg) => ({
        id: msg.id,
        msg_id: msg.msg_id,
        talk_mode: msg.talk_mode,
        from_user_id: msg.from_user_id,
        to_from_id: msg.to_from_id,
        message_type: msg.message_type,
        content: msg.content,
        quote_id: msg.quote_id,
        is_revoke: msg.is_revoke,
        created_at: msg.created_at,
        from_user: {
          id: msg.from_user_id,
          nickname: msg.from_nickname || '',
          avatar: msg.from_avatar || ''
        }
      }))
    } catch (error) {
      console.error('Failed to search history records:', error)
      throw error
    }
  }
  // 生成消息ID
  generateMessageId() {
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }
  // 获取消息类型
  getMessageType(type) {
    const typeMap = {
      text: 1,
      image: 2,
      file: 3,
      voice: 4,
      video: 5,
      code: 6,
      vote: 7,
      forward: 8
    }
    return typeMap[type] || 1
  }
}
const chatService = new ChatService()
class UserService extends events.EventEmitter {
  constructor() {
    super()
  }
  // 获取用户详情
  async getUserDetail(userId) {
    const db = databaseManager.getDatabase()
    try {
      const stmt = db.prepare(`
        SELECT id, mobile, nickname, avatar, motto, email, gender, birthday, status, created_at, updated_at
        FROM users 
        WHERE id = ? AND status = 1
      `)
      const user = stmt.get(userId)
      if (!user) {
        throw new Error('用户不存在')
      }
      return {
        mobile: user.mobile,
        nickname: user.nickname,
        avatar: user.avatar,
        motto: user.motto,
        email: user.email,
        gender: user.gender,
        birthday: user.birthday
      }
    } catch (error) {
      console.error('Failed to get user detail:', error)
      throw error
    }
  }
  // 更新用户信息
  async updateUser(userId, data) {
    const db = databaseManager.getDatabase()
    try {
      const stmt = db.prepare(`
        UPDATE users 
        SET nickname = ?, avatar = ?, motto = ?, gender = ?, birthday = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `)
      stmt.run(data.nickname, data.avatar, data.motto, data.gender, data.birthday, userId)
      console.log('User updated successfully:', userId)
    } catch (error) {
      console.error('Failed to update user:', error)
      throw error
    }
  }
  // 更新密码
  async updatePassword(userId, oldPassword, newPassword) {
    const db = databaseManager.getDatabase()
    try {
      const userStmt = db.prepare('SELECT password_hash, salt FROM users WHERE id = ?')
      const user = userStmt.get(userId)
      if (!user) {
        throw new Error('用户不存在')
      }
      const oldPasswordHash = authService.hashPassword(oldPassword, user.salt)
      if (oldPasswordHash !== user.password_hash) {
        throw new Error('原密码错误')
      }
      const newSalt = authService.generateSalt()
      const newPasswordHash = authService.hashPassword(newPassword, newSalt)
      const updateStmt = db.prepare(`
        UPDATE users 
        SET password_hash = ?, salt = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `)
      updateStmt.run(newPasswordHash, newSalt, userId)
      const sessionStmt = db.prepare('DELETE FROM user_sessions WHERE user_id = ?')
      sessionStmt.run(userId)
      console.log('Password updated successfully:', userId)
    } catch (error) {
      console.error('Failed to update password:', error)
      throw error
    }
  }
  // 更新手机号
  async updateMobile(userId, mobile, password, _smsCode) {
    const db = databaseManager.getDatabase()
    try {
      const userStmt = db.prepare('SELECT password_hash, salt FROM users WHERE id = ?')
      const user = userStmt.get(userId)
      if (!user) {
        throw new Error('用户不存在')
      }
      const passwordHash = authService.hashPassword(password, user.salt)
      if (passwordHash !== user.password_hash) {
        throw new Error('密码错误')
      }
      const existingStmt = db.prepare('SELECT id FROM users WHERE mobile = ? AND id != ?')
      const existing = existingStmt.get(mobile, userId)
      if (existing) {
        throw new Error('手机号已被使用')
      }
      const updateStmt = db.prepare(`
        UPDATE users 
        SET mobile = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `)
      updateStmt.run(mobile, userId)
      console.log('Mobile updated successfully:', userId)
    } catch (error) {
      console.error('Failed to update mobile:', error)
      throw error
    }
  }
  // 更新邮箱
  async updateEmail(userId, email, password, _code) {
    const db = databaseManager.getDatabase()
    try {
      const userStmt = db.prepare('SELECT password_hash, salt FROM users WHERE id = ?')
      const user = userStmt.get(userId)
      if (!user) {
        throw new Error('用户不存在')
      }
      const passwordHash = authService.hashPassword(password, user.salt)
      if (passwordHash !== user.password_hash) {
        throw new Error('密码错误')
      }
      const updateStmt = db.prepare(`
        UPDATE users 
        SET email = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `)
      updateStmt.run(email, userId)
      console.log('Email updated successfully:', userId)
    } catch (error) {
      console.error('Failed to update email:', error)
      throw error
    }
  }
  // 获取用户设置
  async getUserSettings(userId) {
    const db = databaseManager.getDatabase()
    try {
      const stmt = db.prepare(`
        SELECT setting_key, setting_value 
        FROM user_settings 
        WHERE user_id = ?
      `)
      const settings = stmt.all(userId)
      const result = {}
      settings.forEach((setting) => {
        result[setting.setting_key] = setting.setting_value
      })
      return result
    } catch (error) {
      console.error('Failed to get user settings:', error)
      throw error
    }
  }
  // 更新用户设置
  async updateUserSetting(userId, key, value) {
    const db = databaseManager.getDatabase()
    try {
      const stmt = db.prepare(`
        INSERT OR REPLACE INTO user_settings 
        (user_id, setting_key, setting_value, updated_at)
        VALUES (?, ?, ?, CURRENT_TIMESTAMP)
      `)
      stmt.run(userId, key, value)
      console.log('User setting updated:', userId, key)
    } catch (error) {
      console.error('Failed to update user setting:', error)
      throw error
    }
  }
  // 批量更新用户设置
  async updateUserSettings(userId, settings) {
    try {
      return databaseManager.transaction((db) => {
        const stmt = db.prepare(`
          INSERT OR REPLACE INTO user_settings 
          (user_id, setting_key, setting_value, updated_at)
          VALUES (?, ?, ?, CURRENT_TIMESTAMP)
        `)
        for (const [key, value] of Object.entries(settings)) {
          stmt.run(userId, key, value)
        }
      })
    } catch (error) {
      console.error('Failed to update user settings:', error)
      throw error
    }
  }
  // 设置用户在线状态
  async setOnlineStatus(userId, status, platform = '') {
    const db = databaseManager.getDatabase()
    try {
      const stmt = db.prepare(`
        INSERT OR REPLACE INTO user_online_status 
        (user_id, status, last_seen, platform)
        VALUES (?, ?, CURRENT_TIMESTAMP, ?)
      `)
      stmt.run(userId, status, platform)
      this.emit(`user:${status}`, { userId, status, platform })
      console.log('User online status updated:', userId, status)
    } catch (error) {
      console.error('Failed to set online status:', error)
      throw error
    }
  }
  // 获取用户在线状态
  async getOnlineStatus(userId) {
    const db = databaseManager.getDatabase()
    try {
      const stmt = db.prepare(`
        SELECT status, last_seen 
        FROM user_online_status 
        WHERE user_id = ?
      `)
      const result = stmt.get(userId)
      if (!result) {
        return { online_status: 'offline' }
      }
      return {
        online_status: result.status,
        last_seen: result.last_seen
      }
    } catch (error) {
      console.error('Failed to get online status:', error)
      return { online_status: 'offline' }
    }
  }
  // 获取多个用户的在线状态
  async getBatchOnlineStatus(userIds) {
    const db = databaseManager.getDatabase()
    try {
      const placeholders = userIds.map(() => '?').join(',')
      const stmt = db.prepare(`
        SELECT user_id, status 
        FROM user_online_status 
        WHERE user_id IN (${placeholders})
      `)
      const results = stmt.all(...userIds)
      const statusMap = {}
      userIds.forEach((userId) => {
        statusMap[userId] = 'offline'
      })
      results.forEach((result) => {
        statusMap[result.user_id] = result.status
      })
      return statusMap
    } catch (error) {
      console.error('Failed to get batch online status:', error)
      return {}
    }
  }
  // 搜索用户
  async searchUsers(keyword, limit = 20) {
    const db = databaseManager.getDatabase()
    try {
      const stmt = db.prepare(`
        SELECT id, mobile, nickname, avatar, motto, gender
        FROM users 
        WHERE status = 1 
        AND (mobile LIKE ? OR nickname LIKE ?)
        LIMIT ?
      `)
      const searchPattern = `%${keyword}%`
      const users = stmt.all(searchPattern, searchPattern, limit)
      return users.map((user) => ({
        user_id: user.id,
        mobile: user.mobile,
        nickname: user.nickname,
        avatar: user.avatar,
        motto: user.motto,
        gender: user.gender
      }))
    } catch (error) {
      console.error('Failed to search users:', error)
      throw error
    }
  }
  // 获取用户基本信息
  async getUserBasicInfo(userId) {
    const db = databaseManager.getDatabase()
    try {
      const stmt = db.prepare(`
        SELECT id, mobile, nickname, avatar, motto, gender
        FROM users 
        WHERE id = ? AND status = 1
      `)
      const user = stmt.get(userId)
      if (!user) {
        throw new Error('用户不存在')
      }
      return {
        user_id: user.id,
        mobile: user.mobile,
        nickname: user.nickname,
        avatar: user.avatar,
        motto: user.motto,
        gender: user.gender
      }
    } catch (error) {
      console.error('Failed to get user basic info:', error)
      throw error
    }
  }
  // 批量获取用户基本信息
  async getBatchUserBasicInfo(userIds) {
    const db = databaseManager.getDatabase()
    try {
      if (userIds.length === 0) {
        return []
      }
      const placeholders = userIds.map(() => '?').join(',')
      const stmt = db.prepare(`
        SELECT id, mobile, nickname, avatar, motto, gender
        FROM users 
        WHERE id IN (${placeholders}) AND status = 1
      `)
      const users = stmt.all(...userIds)
      return users.map((user) => ({
        user_id: user.id,
        mobile: user.mobile,
        nickname: user.nickname,
        avatar: user.avatar,
        motto: user.motto,
        gender: user.gender
      }))
    } catch (error) {
      console.error('Failed to get batch user basic info:', error)
      throw error
    }
  }
  // 清理离线用户状态
  async cleanupOfflineUsers() {
    const db = databaseManager.getDatabase()
    try {
      const stmt = db.prepare(`
        UPDATE user_online_status 
        SET status = 'offline' 
        WHERE status != 'offline' 
        AND datetime(last_seen, '+5 minutes') < datetime('now')
      `)
      const result = stmt.run()
      if (result.changes > 0) {
        console.log(`Set ${result.changes} users to offline`)
      }
    } catch (error) {
      console.error('Failed to cleanup offline users:', error)
    }
  }
}
const userService = new UserService()
class ContactService extends events.EventEmitter {
  constructor() {
    super()
  }
  // 获取联系人列表
  async getContactList(userId) {
    const db = databaseManager.getDatabase()
    try {
      const groupStmt = db.prepare(`
        SELECT id, name, sort 
        FROM contact_groups 
        WHERE user_id = ? 
        ORDER BY sort ASC, id ASC
      `)
      const groups = groupStmt.all(userId)
      const contactStmt = db.prepare(`
        SELECT c.friend_id, c.remark, c.group_id, c.created_at,
               u.nickname, u.avatar, u.motto, u.gender
        FROM contacts c
        LEFT JOIN users u ON c.friend_id = u.id
        WHERE c.user_id = ? AND c.status = 1 AND u.status = 1
        ORDER BY c.group_id ASC, c.created_at ASC
      `)
      const contacts = contactStmt.all(userId)
      const friendIds = contacts.map((c) => c.friend_id)
      const onlineStatus = await userService.getBatchOnlineStatus(friendIds)
      const groupMap = /* @__PURE__ */ new Map()
      groups.forEach((group) => {
        groupMap.set(group.id, {
          id: group.id,
          name: group.name,
          sort: group.sort,
          list: []
        })
      })
      if (!groupMap.has(0)) {
        groupMap.set(0, {
          id: 0,
          name: '我的好友',
          sort: 0,
          list: []
        })
      }
      contacts.forEach((contact) => {
        const groupId = contact.group_id || 0
        if (!groupMap.has(groupId)) {
          groupMap.set(groupId, {
            id: groupId,
            name: '未分组',
            sort: 999,
            list: []
          })
        }
        groupMap.get(groupId).list.push({
          id: contact.friend_id,
          nickname: contact.remark || contact.nickname,
          avatar: contact.avatar,
          motto: contact.motto,
          gender: contact.gender,
          online_status: onlineStatus[contact.friend_id] || 'offline'
        })
      })
      return Array.from(groupMap.values()).sort((a, b) => a.sort - b.sort)
    } catch (error) {
      console.error('Failed to get contact list:', error)
      throw error
    }
  }
  // 添加联系人
  async addContact(data) {
    const db = databaseManager.getDatabase()
    try {
      const existingStmt = db.prepare(`
        SELECT id FROM contacts 
        WHERE user_id = ? AND friend_id = ? AND status = 1
      `)
      const existing = existingStmt.get(data.user_id, data.friend_id)
      if (existing) {
        throw new Error('已经是好友关系')
      }
      const userStmt = db.prepare('SELECT id FROM users WHERE id = ? AND status = 1')
      const targetUser = userStmt.get(data.friend_id)
      if (!targetUser) {
        throw new Error('用户不存在')
      }
      return databaseManager.transaction((db2) => {
        const addStmt = db2.prepare(`
          INSERT OR REPLACE INTO contacts 
          (user_id, friend_id, remark, status, created_at, updated_at)
          VALUES (?, ?, ?, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        `)
        addStmt.run(data.user_id, data.friend_id, data.remark)
        const userInfoStmt = db2.prepare('SELECT nickname FROM users WHERE id = ?')
        const userInfo = userInfoStmt.get(data.user_id)
        addStmt.run(data.friend_id, data.user_id, userInfo?.nickname || '')
        console.log('Contact added successfully:', data.user_id, data.friend_id)
      })
    } catch (error) {
      console.error('Failed to add contact:', error)
      throw error
    }
  }
  // 删除联系人
  async deleteContact(userId, friendId) {
    try {
      return databaseManager.transaction((db) => {
        const deleteStmt = db.prepare(`
          UPDATE contacts 
          SET status = 0, updated_at = CURRENT_TIMESTAMP
          WHERE (user_id = ? AND friend_id = ?) OR (user_id = ? AND friend_id = ?)
        `)
        deleteStmt.run(userId, friendId, friendId, userId)
        console.log('Contact deleted successfully:', userId, friendId)
      })
    } catch (error) {
      console.error('Failed to delete contact:', error)
      throw error
    }
  }
  // 修改联系人备注
  async updateContactRemark(userId, friendId, remark) {
    const db = databaseManager.getDatabase()
    try {
      const stmt = db.prepare(`
        UPDATE contacts 
        SET remark = ?, updated_at = CURRENT_TIMESTAMP
        WHERE user_id = ? AND friend_id = ? AND status = 1
      `)
      const result = stmt.run(remark, userId, friendId)
      if (result.changes === 0) {
        throw new Error('联系人不存在')
      }
      console.log('Contact remark updated successfully:', userId, friendId)
    } catch (error) {
      console.error('Failed to update contact remark:', error)
      throw error
    }
  }
  // 移动联系人到分组
  async moveContactToGroup(userId, data) {
    const db = databaseManager.getDatabase()
    try {
      if (data.group_id !== 0) {
        const groupStmt = db.prepare(`
          SELECT id FROM contact_groups 
          WHERE id = ? AND user_id = ?
        `)
        const group = groupStmt.get(data.group_id, userId)
        if (!group) {
          throw new Error('分组不存在')
        }
      }
      const stmt = db.prepare(`
        UPDATE contacts 
        SET group_id = ?, updated_at = CURRENT_TIMESTAMP
        WHERE user_id = ? AND friend_id = ? AND status = 1
      `)
      const result = stmt.run(data.group_id, userId, data.friend_id)
      if (result.changes === 0) {
        throw new Error('联系人不存在')
      }
      console.log('Contact moved to group successfully:', userId, data.friend_id, data.group_id)
    } catch (error) {
      console.error('Failed to move contact to group:', error)
      throw error
    }
  }
  // 获取联系人分组列表
  async getContactGroups(userId) {
    const db = databaseManager.getDatabase()
    try {
      const stmt = db.prepare(`
        SELECT id, name, sort 
        FROM contact_groups 
        WHERE user_id = ? 
        ORDER BY sort ASC, id ASC
      `)
      return stmt.all(userId)
    } catch (error) {
      console.error('Failed to get contact groups:', error)
      throw error
    }
  }
  // 创建联系人分组
  async createContactGroup(userId, data) {
    const db = databaseManager.getDatabase()
    try {
      const existingStmt = db.prepare(`
        SELECT id FROM contact_groups 
        WHERE user_id = ? AND name = ?
      `)
      const existing = existingStmt.get(userId, data.name)
      if (existing) {
        throw new Error('分组名已存在')
      }
      const stmt = db.prepare(`
        INSERT INTO contact_groups 
        (user_id, name, sort, created_at, updated_at)
        VALUES (?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      `)
      const result = stmt.run(userId, data.name, data.sort)
      console.log('Contact group created successfully:', result.lastInsertRowid)
      return { id: result.lastInsertRowid }
    } catch (error) {
      console.error('Failed to create contact group:', error)
      throw error
    }
  }
  // 修改联系人分组
  async updateContactGroup(userId, groupId, data) {
    const db = databaseManager.getDatabase()
    try {
      const existingStmt = db.prepare(`
        SELECT id FROM contact_groups 
        WHERE id = ? AND user_id = ?
      `)
      const existing = existingStmt.get(groupId, userId)
      if (!existing) {
        throw new Error('分组不存在')
      }
      const nameCheckStmt = db.prepare(`
        SELECT id FROM contact_groups 
        WHERE user_id = ? AND name = ? AND id != ?
      `)
      const nameExists = nameCheckStmt.get(userId, data.name, groupId)
      if (nameExists) {
        throw new Error('分组名已存在')
      }
      const stmt = db.prepare(`
        UPDATE contact_groups 
        SET name = ?, sort = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ? AND user_id = ?
      `)
      stmt.run(data.name, data.sort, groupId, userId)
      console.log('Contact group updated successfully:', groupId)
    } catch (error) {
      console.error('Failed to update contact group:', error)
      throw error
    }
  }
  // 删除联系人分组
  async deleteContactGroup(userId, groupId) {
    try {
      return databaseManager.transaction((db) => {
        const existingStmt = db.prepare(`
          SELECT id FROM contact_groups 
          WHERE id = ? AND user_id = ?
        `)
        const existing = existingStmt.get(groupId, userId)
        if (!existing) {
          throw new Error('分组不存在')
        }
        const moveStmt = db.prepare(`
          UPDATE contacts 
          SET group_id = 0, updated_at = CURRENT_TIMESTAMP
          WHERE user_id = ? AND group_id = ?
        `)
        moveStmt.run(userId, groupId)
        const deleteStmt = db.prepare(`
          DELETE FROM contact_groups 
          WHERE id = ? AND user_id = ?
        `)
        deleteStmt.run(groupId, userId)
        console.log('Contact group deleted successfully:', groupId)
      })
    } catch (error) {
      console.error('Failed to delete contact group:', error)
      throw error
    }
  }
  // 获取好友申请列表
  async getContactApplyList(userId) {
    const db = databaseManager.getDatabase()
    try {
      const stmt = db.prepare(`
        SELECT a.id, a.applicant_id, a.message, a.status, a.created_at,
               u.nickname, u.avatar, u.motto, u.gender
        FROM contact_applications a
        LEFT JOIN users u ON a.applicant_id = u.id
        WHERE a.user_id = ? AND u.status = 1
        ORDER BY a.created_at DESC
      `)
      const applications = stmt.all(userId)
      return applications.map((app) => ({
        id: app.id,
        user_id: app.applicant_id,
        nickname: app.nickname,
        avatar: app.avatar,
        motto: app.motto,
        gender: app.gender,
        friend_apply: {
          remark: app.message,
          created_at: app.created_at
        },
        status: app.status
      }))
    } catch (error) {
      console.error('Failed to get contact apply list:', error)
      throw error
    }
  }
  // 创建好友申请
  async createContactApply(applicantId, userId, message) {
    const db = databaseManager.getDatabase()
    try {
      const friendStmt = db.prepare(`
        SELECT id FROM contacts 
        WHERE user_id = ? AND friend_id = ? AND status = 1
      `)
      const isFriend = friendStmt.get(applicantId, userId)
      if (isFriend) {
        throw new Error('已经是好友关系')
      }
      const existingStmt = db.prepare(`
        SELECT id FROM contact_applications 
        WHERE applicant_id = ? AND user_id = ? AND status = 'pending'
      `)
      const existing = existingStmt.get(applicantId, userId)
      if (existing) {
        throw new Error('已有待处理的好友申请')
      }
      const stmt = db.prepare(`
        INSERT INTO contact_applications 
        (applicant_id, user_id, message, status, created_at, updated_at)
        VALUES (?, ?, ?, 'pending', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      `)
      stmt.run(applicantId, userId, message)
      console.log('Contact application created successfully:', applicantId, userId)
    } catch (error) {
      console.error('Failed to create contact apply:', error)
      throw error
    }
  }
  // 处理好友申请
  async handleContactApply(userId, applyId, action, remark) {
    try {
      return databaseManager.transaction((db) => {
        const applyStmt = db.prepare(`
          SELECT applicant_id, user_id, status 
          FROM contact_applications 
          WHERE id = ? AND user_id = ?
        `)
        const application = applyStmt.get(applyId, userId)
        if (!application) {
          throw new Error('申请不存在')
        }
        if (application.status !== 'pending') {
          throw new Error('申请已处理')
        }
        const updateStmt = db.prepare(`
          UPDATE contact_applications 
          SET status = ?, updated_at = CURRENT_TIMESTAMP
          WHERE id = ?
        `)
        updateStmt.run(action === 'accept' ? 'accepted' : 'rejected', applyId)
        if (action === 'accept') {
          const addStmt = db.prepare(`
            INSERT OR REPLACE INTO contacts 
            (user_id, friend_id, remark, status, created_at, updated_at)
            VALUES (?, ?, ?, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
          `)
          const userInfoStmt = db.prepare('SELECT nickname FROM users WHERE id = ?')
          const applicantInfo = userInfoStmt.get(application.applicant_id)
          const userInfo = userInfoStmt.get(application.user_id)
          addStmt.run(
            application.user_id,
            application.applicant_id,
            remark || applicantInfo?.nickname || ''
          )
          addStmt.run(application.applicant_id, application.user_id, userInfo?.nickname || '')
        }
        console.log('Contact application handled successfully:', applyId, action)
      })
    } catch (error) {
      console.error('Failed to handle contact apply:', error)
      throw error
    }
  }
  // 删除好友申请记录
  async deleteContactApply(userId, applyId) {
    const db = databaseManager.getDatabase()
    try {
      const stmt = db.prepare(`
        DELETE FROM contact_applications 
        WHERE id = ? AND user_id = ?
      `)
      const result = stmt.run(applyId, userId)
      if (result.changes === 0) {
        throw new Error('申请记录不存在')
      }
      console.log('Contact application deleted successfully:', applyId)
    } catch (error) {
      console.error('Failed to delete contact apply:', error)
      throw error
    }
  }
  // 搜索联系人
  async searchContacts(userId, keyword) {
    const db = databaseManager.getDatabase()
    try {
      const stmt = db.prepare(`
        SELECT c.friend_id, c.remark,
               u.nickname, u.avatar, u.motto, u.gender
        FROM contacts c
        LEFT JOIN users u ON c.friend_id = u.id
        WHERE c.user_id = ? AND c.status = 1 AND u.status = 1
        AND (c.remark LIKE ? OR u.nickname LIKE ? OR u.mobile LIKE ?)
        ORDER BY c.created_at ASC
      `)
      const searchPattern = `%${keyword}%`
      const contacts = stmt.all(userId, searchPattern, searchPattern, searchPattern)
      const friendIds = contacts.map((c) => c.friend_id)
      const onlineStatus = await userService.getBatchOnlineStatus(friendIds)
      return contacts.map((contact) => ({
        id: contact.friend_id,
        nickname: contact.remark || contact.nickname,
        avatar: contact.avatar,
        motto: contact.motto,
        gender: contact.gender,
        online_status: onlineStatus[contact.friend_id] || 'offline'
      }))
    } catch (error) {
      console.error('Failed to search contacts:', error)
      throw error
    }
  }
  // 检查是否为好友关系
  async isFriend(userId, friendId) {
    const db = databaseManager.getDatabase()
    try {
      const stmt = db.prepare(`
        SELECT id FROM contacts 
        WHERE user_id = ? AND friend_id = ? AND status = 1
      `)
      const result = stmt.get(userId, friendId)
      return !!result
    } catch (error) {
      console.error('Failed to check friend relationship:', error)
      return false
    }
  }
  // 获取联系人详情
  async getContactDetail(userId, friendId) {
    const db = databaseManager.getDatabase()
    try {
      const stmt = db.prepare(`
        SELECT c.remark, c.group_id,
               u.nickname, u.avatar, u.motto, u.gender, u.mobile
        FROM contacts c
        LEFT JOIN users u ON c.friend_id = u.id
        WHERE c.user_id = ? AND c.friend_id = ? AND c.status = 1 AND u.status = 1
      `)
      const contact = stmt.get(userId, friendId)
      if (!contact) {
        throw new Error('联系人不存在')
      }
      const onlineStatus = await userService.getOnlineStatus(friendId)
      return {
        user_id: friendId,
        nickname: contact.remark || contact.nickname,
        avatar: contact.avatar,
        motto: contact.motto,
        gender: contact.gender,
        mobile: contact.mobile,
        remark: contact.remark,
        group_id: contact.group_id,
        online_status: onlineStatus.online_status,
        last_seen: onlineStatus.last_seen
      }
    } catch (error) {
      console.error('Failed to get contact detail:', error)
      throw error
    }
  }
}
const contactService = new ContactService()
class GroupService extends events.EventEmitter {
  constructor() {
    super()
  }
  // 获取群组列表
  async getGroupList(userId) {
    const db = databaseManager.getDatabase()
    try {
      const stmt = db.prepare(`
        SELECT g.id, g.name, g.avatar, g.profile, g.max_num, g.is_dismiss, g.created_at,
               gm.role, gm.is_mute, gm.user_card, gm.joined_at
        FROM groups g
        INNER JOIN group_members gm ON g.id = gm.group_id
        WHERE gm.user_id = ? AND gm.status = 1 AND g.is_dismiss = 0
        ORDER BY gm.joined_at DESC
      `)
      const groups = stmt.all(userId)
      const result = []
      for (const group of groups) {
        const memberCountStmt = db.prepare(`
          SELECT COUNT(*) as count 
          FROM group_members 
          WHERE group_id = ? AND status = 1
        `)
        const memberCount = memberCountStmt.get(group.id)
        result.push({
          id: group.id,
          group_name: group.name,
          avatar: group.avatar,
          profile: group.profile,
          max_num: group.max_num,
          count: memberCount.count,
          role: group.role,
          is_mute: group.is_mute,
          user_card: group.user_card,
          created_at: group.created_at,
          joined_at: group.joined_at
        })
      }
      return result
    } catch (error) {
      console.error('Failed to get group list:', error)
      throw error
    }
  }
  // 创建群组
  async createGroup(creatorId, data) {
    try {
      return databaseManager.transaction((db) => {
        const groupStmt = db.prepare(`
          INSERT INTO groups 
          (name, avatar, profile, creator_id, max_num, is_dismiss, created_at, updated_at)
          VALUES (?, ?, ?, ?, 500, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        `)
        const groupResult = groupStmt.run(data.name, data.avatar, data.profile, creatorId)
        const groupId = groupResult.lastInsertRowid
        const memberStmt = db.prepare(`
          INSERT INTO group_members 
          (group_id, user_id, role, status, is_mute, joined_at, updated_at)
          VALUES (?, ?, 'owner', 1, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        `)
        memberStmt.run(groupId, creatorId)
        if (data.member_ids && data.member_ids.length > 0) {
          for (const memberId of data.member_ids) {
            if (memberId !== creatorId) {
              memberStmt.run(groupId, memberId)
            }
          }
        }
        console.log('Group created successfully:', groupId)
        return { group_id: groupId }
      })
    } catch (error) {
      console.error('Failed to create group:', error)
      throw error
    }
  }
  // 解散群组
  async dismissGroup(userId, groupId) {
    const db = databaseManager.getDatabase()
    try {
      const memberStmt = db.prepare(`
        SELECT role FROM group_members 
        WHERE group_id = ? AND user_id = ? AND status = 1
      `)
      const member = memberStmt.get(groupId, userId)
      if (!member || member.role !== 'owner') {
        throw new Error('只有群主可以解散群组')
      }
      return databaseManager.transaction((db2) => {
        const groupStmt = db2.prepare(`
          UPDATE groups 
          SET is_dismiss = 1, updated_at = CURRENT_TIMESTAMP
          WHERE id = ?
        `)
        groupStmt.run(groupId)
        const memberStmt2 = db2.prepare(`
          UPDATE group_members 
          SET status = 0, updated_at = CURRENT_TIMESTAMP
          WHERE group_id = ?
        `)
        memberStmt2.run(groupId)
        console.log('Group dismissed successfully:', groupId)
      })
    } catch (error) {
      console.error('Failed to dismiss group:', error)
      throw error
    }
  }
  // 邀请加入群组
  async inviteMembers(userId, groupId, data) {
    const db = databaseManager.getDatabase()
    try {
      const memberStmt = db.prepare(`
        SELECT role FROM group_members 
        WHERE group_id = ? AND user_id = ? AND status = 1
      `)
      const member = memberStmt.get(groupId, userId)
      if (!member || (member.role !== 'owner' && member.role !== 'admin')) {
        throw new Error('没有邀请权限')
      }
      const groupStmt = db.prepare(`
        SELECT id, max_num FROM groups 
        WHERE id = ? AND is_dismiss = 0
      `)
      const group = groupStmt.get(groupId)
      if (!group) {
        throw new Error('群组不存在或已解散')
      }
      const countStmt = db.prepare(`
        SELECT COUNT(*) as count 
        FROM group_members 
        WHERE group_id = ? AND status = 1
      `)
      const currentCount = countStmt.get(groupId)
      if (currentCount.count + data.user_ids.length > group.max_num) {
        throw new Error('群组人数已达上限')
      }
      return databaseManager.transaction((db2) => {
        const addMemberStmt = db2.prepare(`
          INSERT OR REPLACE INTO group_members 
          (group_id, user_id, role, status, is_mute, joined_at, updated_at)
          VALUES (?, ?, 'member', 1, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        `)
        for (const memberId of data.user_ids) {
          const existingStmt = db2.prepare(`
            SELECT id FROM group_members 
            WHERE group_id = ? AND user_id = ? AND status = 1
          `)
          const existing = existingStmt.get(groupId, memberId)
          if (!existing) {
            addMemberStmt.run(groupId, memberId)
          }
        }
        console.log('Members invited successfully:', groupId, data.user_ids)
      })
    } catch (error) {
      console.error('Failed to invite members:', error)
      throw error
    }
  }
  // 移除群成员
  async removeMembers(userId, groupId, data) {
    const db = databaseManager.getDatabase()
    try {
      const memberStmt = db.prepare(`
        SELECT role FROM group_members 
        WHERE group_id = ? AND user_id = ? AND status = 1
      `)
      const member = memberStmt.get(groupId, userId)
      if (!member || (member.role !== 'owner' && member.role !== 'admin')) {
        throw new Error('没有移除权限')
      }
      return databaseManager.transaction((db2) => {
        const removeStmt = db2.prepare(`
          UPDATE group_members 
          SET status = 0, updated_at = CURRENT_TIMESTAMP
          WHERE group_id = ? AND user_id = ? AND role != 'owner'
        `)
        for (const memberId of data.user_ids) {
          if (memberId !== userId) {
            removeStmt.run(groupId, memberId)
          }
        }
        console.log('Members removed successfully:', groupId, data.user_ids)
      })
    } catch (error) {
      console.error('Failed to remove members:', error)
      throw error
    }
  }
  // 退出群组
  async leaveGroup(userId, groupId) {
    const db = databaseManager.getDatabase()
    try {
      const memberStmt = db.prepare(`
        SELECT role FROM group_members 
        WHERE group_id = ? AND user_id = ? AND status = 1
      `)
      const member = memberStmt.get(groupId, userId)
      if (!member) {
        throw new Error('不在该群组中')
      }
      if (member.role === 'owner') {
        throw new Error('群主不能退出群组，请先转让群主或解散群组')
      }
      const stmt = db.prepare(`
        UPDATE group_members 
        SET status = 0, updated_at = CURRENT_TIMESTAMP
        WHERE group_id = ? AND user_id = ?
      `)
      stmt.run(groupId, userId)
      console.log('User left group successfully:', userId, groupId)
    } catch (error) {
      console.error('Failed to leave group:', error)
      throw error
    }
  }
  // 获取群组详情
  async getGroupDetail(userId, groupId) {
    const db = databaseManager.getDatabase()
    try {
      const memberCheckStmt = db.prepare(`
        SELECT role FROM group_members 
        WHERE group_id = ? AND user_id = ? AND status = 1
      `)
      const userMember = memberCheckStmt.get(groupId, userId)
      if (!userMember) {
        throw new Error('不在该群组中')
      }
      const groupStmt = db.prepare(`
        SELECT g.*, u.nickname as creator_name
        FROM groups g
        LEFT JOIN users u ON g.creator_id = u.id
        WHERE g.id = ? AND g.is_dismiss = 0
      `)
      const group = groupStmt.get(groupId)
      if (!group) {
        throw new Error('群组不存在或已解散')
      }
      const memberStmt = db.prepare(`
        SELECT gm.user_id, gm.role, gm.is_mute, gm.user_card, gm.joined_at,
               u.nickname, u.avatar, u.motto, u.gender
        FROM group_members gm
        LEFT JOIN users u ON gm.user_id = u.id
        WHERE gm.group_id = ? AND gm.status = 1 AND u.status = 1
        ORDER BY 
          CASE gm.role 
            WHEN 'owner' THEN 1 
            WHEN 'admin' THEN 2 
            ELSE 3 
          END,
          gm.joined_at ASC
      `)
      const members = memberStmt.all(groupId)
      const memberIds = members.map((m) => m.user_id)
      const onlineStatus = await userService.getBatchOnlineStatus(memberIds)
      return {
        group_id: group.id,
        group_name: group.name,
        avatar: group.avatar,
        profile: group.profile,
        max_num: group.max_num,
        is_dismiss: group.is_dismiss,
        creator_id: group.creator_id,
        creator_name: group.creator_name,
        created_at: group.created_at,
        user_role: userMember.role,
        members: members.map((member) => ({
          user_id: member.user_id,
          nickname: member.user_card || member.nickname,
          avatar: member.avatar,
          motto: member.motto,
          gender: member.gender,
          role: member.role,
          is_mute: member.is_mute,
          user_card: member.user_card,
          joined_at: member.joined_at,
          online_status: onlineStatus[member.user_id] || 'offline'
        }))
      }
    } catch (error) {
      console.error('Failed to get group detail:', error)
      throw error
    }
  }
  // 更新群组信息
  async updateGroup(userId, groupId, data) {
    const db = databaseManager.getDatabase()
    try {
      const memberStmt = db.prepare(`
        SELECT role FROM group_members 
        WHERE group_id = ? AND user_id = ? AND status = 1
      `)
      const member = memberStmt.get(groupId, userId)
      if (!member || (member.role !== 'owner' && member.role !== 'admin')) {
        throw new Error('没有修改权限')
      }
      const updates = []
      const values = []
      if (data.name !== void 0) {
        updates.push('name = ?')
        values.push(data.name)
      }
      if (data.avatar !== void 0) {
        updates.push('avatar = ?')
        values.push(data.avatar)
      }
      if (data.profile !== void 0) {
        updates.push('profile = ?')
        values.push(data.profile)
      }
      if (updates.length === 0) {
        return
      }
      updates.push('updated_at = CURRENT_TIMESTAMP')
      values.push(groupId)
      const stmt = db.prepare(`
        UPDATE groups 
        SET ${updates.join(', ')}
        WHERE id = ?
      `)
      stmt.run(...values)
      console.log('Group updated successfully:', groupId)
    } catch (error) {
      console.error('Failed to update group:', error)
      throw error
    }
  }
  // 设置群成员角色
  async setMemberRole(userId, groupId, memberId, role) {
    const db = databaseManager.getDatabase()
    try {
      const memberStmt = db.prepare(`
        SELECT role FROM group_members 
        WHERE group_id = ? AND user_id = ? AND status = 1
      `)
      const member = memberStmt.get(groupId, userId)
      if (!member || member.role !== 'owner') {
        throw new Error('只有群主可以设置管理员')
      }
      const targetMember = memberStmt.get(groupId, memberId)
      if (!targetMember) {
        throw new Error('目标成员不在群组中')
      }
      if (targetMember.role === 'owner') {
        throw new Error('不能修改群主角色')
      }
      const stmt = db.prepare(`
        UPDATE group_members 
        SET role = ?, updated_at = CURRENT_TIMESTAMP
        WHERE group_id = ? AND user_id = ?
      `)
      stmt.run(role, groupId, memberId)
      console.log('Member role updated successfully:', groupId, memberId, role)
    } catch (error) {
      console.error('Failed to set member role:', error)
      throw error
    }
  }
  // 设置群成员禁言
  async muteMember(userId, groupId, memberId, isMute) {
    const db = databaseManager.getDatabase()
    try {
      const memberStmt = db.prepare(`
        SELECT role FROM group_members 
        WHERE group_id = ? AND user_id = ? AND status = 1
      `)
      const member = memberStmt.get(groupId, userId)
      if (!member || (member.role !== 'owner' && member.role !== 'admin')) {
        throw new Error('没有禁言权限')
      }
      const targetMember = memberStmt.get(groupId, memberId)
      if (!targetMember) {
        throw new Error('目标成员不在群组中')
      }
      if (targetMember.role === 'owner') {
        throw new Error('不能禁言群主')
      }
      if (member.role === 'admin' && targetMember.role === 'admin') {
        throw new Error('管理员不能禁言其他管理员')
      }
      const stmt = db.prepare(`
        UPDATE group_members 
        SET is_mute = ?, updated_at = CURRENT_TIMESTAMP
        WHERE group_id = ? AND user_id = ?
      `)
      stmt.run(isMute ? 1 : 0, groupId, memberId)
      console.log('Member mute status updated:', groupId, memberId, isMute)
    } catch (error) {
      console.error('Failed to mute member:', error)
      throw error
    }
  }
  // 设置群名片
  async setMemberCard(userId, groupId, userCard) {
    const db = databaseManager.getDatabase()
    try {
      const memberStmt = db.prepare(`
        SELECT id FROM group_members 
        WHERE group_id = ? AND user_id = ? AND status = 1
      `)
      const member = memberStmt.get(groupId, userId)
      if (!member) {
        throw new Error('不在该群组中')
      }
      const stmt = db.prepare(`
        UPDATE group_members 
        SET user_card = ?, updated_at = CURRENT_TIMESTAMP
        WHERE group_id = ? AND user_id = ?
      `)
      stmt.run(userCard, groupId, userId)
      console.log('Member card updated successfully:', groupId, userId)
    } catch (error) {
      console.error('Failed to set member card:', error)
      throw error
    }
  }
  // 转让群主
  async transferOwnership(userId, groupId, newOwnerId) {
    const db = databaseManager.getDatabase()
    try {
      const memberStmt = db.prepare(`
        SELECT role FROM group_members 
        WHERE group_id = ? AND user_id = ? AND status = 1
      `)
      const member = memberStmt.get(groupId, userId)
      if (!member || member.role !== 'owner') {
        throw new Error('只有群主可以转让群主')
      }
      const newOwner = memberStmt.get(groupId, newOwnerId)
      if (!newOwner) {
        throw new Error('新群主不在群组中')
      }
      return databaseManager.transaction((db2) => {
        const demoteStmt = db2.prepare(`
          UPDATE group_members 
          SET role = 'member', updated_at = CURRENT_TIMESTAMP
          WHERE group_id = ? AND user_id = ?
        `)
        demoteStmt.run(groupId, userId)
        const promoteStmt = db2.prepare(`
          UPDATE group_members 
          SET role = 'owner', updated_at = CURRENT_TIMESTAMP
          WHERE group_id = ? AND user_id = ?
        `)
        promoteStmt.run(groupId, newOwnerId)
        const updateGroupStmt = db2.prepare(`
          UPDATE groups 
          SET creator_id = ?, updated_at = CURRENT_TIMESTAMP
          WHERE id = ?
        `)
        updateGroupStmt.run(newOwnerId, groupId)
        console.log('Group ownership transferred:', groupId, userId, newOwnerId)
      })
    } catch (error) {
      console.error('Failed to transfer ownership:', error)
      throw error
    }
  }
  // 获取群公告列表
  async getGroupNotices(userId, groupId) {
    const db = databaseManager.getDatabase()
    try {
      const memberStmt = db.prepare(`
        SELECT id FROM group_members 
        WHERE group_id = ? AND user_id = ? AND status = 1
      `)
      const member = memberStmt.get(groupId, userId)
      if (!member) {
        throw new Error('不在该群组中')
      }
      const stmt = db.prepare(`
        SELECT gn.*, u.nickname as creator_name
        FROM group_notices gn
        LEFT JOIN users u ON gn.creator_id = u.id
        WHERE gn.group_id = ?
        ORDER BY gn.is_top DESC, gn.created_at DESC
      `)
      return stmt.all(groupId)
    } catch (error) {
      console.error('Failed to get group notices:', error)
      throw error
    }
  }
  // 创建群公告
  async createGroupNotice(userId, groupId, data) {
    const db = databaseManager.getDatabase()
    try {
      const memberStmt = db.prepare(`
        SELECT role FROM group_members 
        WHERE group_id = ? AND user_id = ? AND status = 1
      `)
      const member = memberStmt.get(groupId, userId)
      if (!member || (member.role !== 'owner' && member.role !== 'admin')) {
        throw new Error('没有发布公告权限')
      }
      const stmt = db.prepare(`
        INSERT INTO group_notices 
        (group_id, creator_id, title, content, is_top, is_confirm, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      `)
      const result = stmt.run(
        groupId,
        userId,
        data.title,
        data.content,
        data.is_top,
        data.is_confirm
      )
      console.log('Group notice created successfully:', result.lastInsertRowid)
      return { id: result.lastInsertRowid }
    } catch (error) {
      console.error('Failed to create group notice:', error)
      throw error
    }
  }
  // 删除群公告
  async deleteGroupNotice(userId, groupId, noticeId) {
    const db = databaseManager.getDatabase()
    try {
      const memberStmt = db.prepare(`
        SELECT role FROM group_members 
        WHERE group_id = ? AND user_id = ? AND status = 1
      `)
      const member = memberStmt.get(groupId, userId)
      if (!member || (member.role !== 'owner' && member.role !== 'admin')) {
        throw new Error('没有删除公告权限')
      }
      const stmt = db.prepare(`
        DELETE FROM group_notices 
        WHERE id = ? AND group_id = ?
      `)
      const result = stmt.run(noticeId, groupId)
      if (result.changes === 0) {
        throw new Error('公告不存在')
      }
      console.log('Group notice deleted successfully:', noticeId)
    } catch (error) {
      console.error('Failed to delete group notice:', error)
      throw error
    }
  }
  // 检查用户是否在群组中
  async isGroupMember(userId, groupId) {
    const db = databaseManager.getDatabase()
    try {
      const stmt = db.prepare(`
        SELECT id FROM group_members 
        WHERE group_id = ? AND user_id = ? AND status = 1
      `)
      const result = stmt.get(groupId, userId)
      return !!result
    } catch (error) {
      console.error('Failed to check group membership:', error)
      return false
    }
  }
  // 获取群成员角色
  async getMemberRole(userId, groupId) {
    const db = databaseManager.getDatabase()
    try {
      const stmt = db.prepare(`
        SELECT role FROM group_members 
        WHERE group_id = ? AND user_id = ? AND status = 1
      `)
      const result = stmt.get(groupId, userId)
      return result ? result.role : null
    } catch (error) {
      console.error('Failed to get member role:', error)
      return null
    }
  }
  // 搜索群组
  async searchGroups(keyword, limit = 20) {
    const db = databaseManager.getDatabase()
    try {
      const stmt = db.prepare(`
        SELECT g.id, g.name, g.avatar, g.profile, 
               COUNT(gm.user_id) as member_count
        FROM groups g
        LEFT JOIN group_members gm ON g.id = gm.group_id AND gm.status = 1
        WHERE g.is_dismiss = 0 
        AND (g.name LIKE ? OR g.profile LIKE ?)
        GROUP BY g.id
        ORDER BY member_count DESC
        LIMIT ?
      `)
      const searchPattern = `%${keyword}%`
      return stmt.all(searchPattern, searchPattern, limit)
    } catch (error) {
      console.error('Failed to search groups:', error)
      throw error
    }
  }
}
const groupService = new GroupService()
class UploadService {
  // 上传文件
  async uploadFile(buffer, originalName, mimeType, _userId) {
    try {
      if (buffer.length > config.upload.maxFileSize) {
        throw new Error(`文件大小超过限制 ${config.upload.maxFileSize / 1024 / 1024}MB`)
      }
      if (!config.upload.allowedTypes.includes(mimeType)) {
        throw new Error('不支持的文件类型')
      }
      const fileId = uuid.v4()
      const fileExt = path.extname(originalName)
      const fileName = `${fileId}${fileExt}`
      const now = /* @__PURE__ */ new Date()
      const dateDir = `${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, '0')}/${String(now.getDate()).padStart(2, '0')}`
      const uploadDir = path.join(config.upload.uploadPath, dateDir)
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true })
      }
      const filePath = path.join(uploadDir, fileName)
      fs.writeFileSync(filePath, buffer)
      const fileUrl = `/uploads/${dateDir}/${fileName}`
      const result = {
        file_id: fileId,
        file_name: originalName,
        file_size: buffer.length,
        file_type: mimeType,
        file_url: fileUrl,
        upload_time: /* @__PURE__ */ new Date().toISOString()
      }
      console.log('File uploaded successfully:', result)
      return result
    } catch (error) {
      console.error('File upload failed:', error)
      throw error
    }
  }
  // 获取文件信息
  getFileInfo(_fileId) {
    try {
      return null
    } catch (error) {
      console.error('Failed to get file info:', error)
      return null
    }
  }
  // 删除文件
  async deleteFile(fileId, _userId) {
    try {
      console.log('File deleted:', fileId)
    } catch (error) {
      console.error('Failed to delete file:', error)
      throw error
    }
  }
  // 验证文件是否存在
  fileExists(filePath) {
    try {
      const fullPath = path.join(config.upload.uploadPath, filePath.replace('/uploads/', ''))
      return fs.existsSync(fullPath)
    } catch (error) {
      return false
    }
  }
  // 获取文件大小
  getFileSize(filePath) {
    try {
      const fullPath = path.join(config.upload.uploadPath, filePath.replace('/uploads/', ''))
      const stats = fs.statSync(fullPath)
      return stats.size
    } catch (error) {
      return 0
    }
  }
  // 清理过期文件（可以定期调用）
  async cleanupExpiredFiles() {
    try {
      console.log('Cleanup expired files completed')
    } catch (error) {
      console.error('Failed to cleanup expired files:', error)
    }
  }
}
const uploadService = new UploadService()
class ArticleService extends events.EventEmitter {
  constructor() {
    super()
  }
  get db() {
    return databaseManager.getDatabase()
  }
  /**
   * 获取文章列表
   */
  async getArticleList(userId, params = {}) {
    const { classify_id, keyword, page = 1, limit = 20 } = params
    const offset = (page - 1) * limit
    let sql = `
      SELECT a.*, ac.class_name 
      FROM articles a 
      LEFT JOIN article_classifies ac ON a.classify_id = ac.id 
      WHERE a.user_id = ? AND a.status = 1
    `
    const sqlParams = [userId]
    if (classify_id) {
      sql += ' AND a.classify_id = ?'
      sqlParams.push(classify_id)
    }
    if (keyword) {
      sql += ' AND (a.title LIKE ? OR a.content LIKE ?)'
      sqlParams.push(`%${keyword}%`, `%${keyword}%`)
    }
    sql += ' ORDER BY a.updated_at DESC LIMIT ? OFFSET ?'
    sqlParams.push(limit, offset)
    const articles = this.db.prepare(sql).all(...sqlParams)
    return {
      items: articles,
      total: this.getArticleCount(userId, params)
    }
  }
  /**
   * 获取文章数量
   */
  getArticleCount(userId, params = {}) {
    const { classify_id, keyword } = params
    let sql = 'SELECT COUNT(*) as count FROM articles WHERE user_id = ? AND status = 1'
    const sqlParams = [userId]
    if (classify_id) {
      sql += ' AND classify_id = ?'
      sqlParams.push(classify_id)
    }
    if (keyword) {
      sql += ' AND (title LIKE ? OR content LIKE ?)'
      sqlParams.push(`%${keyword}%`, `%${keyword}%`)
    }
    const result = this.db.prepare(sql).get(...sqlParams)
    return result.count
  }
  /**
   * 获取文章详情
   */
  async getArticleDetail(userId, articleId) {
    const sql = `
      SELECT a.*, ac.class_name 
      FROM articles a 
      LEFT JOIN article_classifies ac ON a.classify_id = ac.id 
      WHERE a.user_id = ? AND a.article_id = ? AND a.status = 1
    `
    const article = this.db.prepare(sql).get(userId, articleId)
    if (!article) {
      throw new Error('文章不存在')
    }
    return article
  }
  /**
   * 创建或编辑文章
   */
  async saveArticle(userId, data) {
    const now = /* @__PURE__ */ new Date().toISOString()
    if (data.article_id) {
      const sql = `
        UPDATE articles 
        SET classify_id = ?, title = ?, content = ?, md_content = ?, 
            is_asterisk = ?, updated_at = ?
        WHERE user_id = ? AND article_id = ?
      `
      this.db
        .prepare(sql)
        .run(
          data.classify_id,
          data.title,
          data.content,
          data.md_content,
          data.is_asterisk || 0,
          now,
          userId,
          data.article_id
        )
      return { article_id: data.article_id }
    } else {
      const articleId = Date.now()
      const sql = `
        INSERT INTO articles (article_id, user_id, classify_id, title, content, md_content, is_asterisk, status, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, 1, ?, ?)
      `
      this.db
        .prepare(sql)
        .run(
          articleId,
          userId,
          data.classify_id,
          data.title,
          data.content,
          data.md_content,
          data.is_asterisk || 0,
          now,
          now
        )
      return { article_id: articleId }
    }
  }
  /**
   * 删除文章（软删除）
   */
  async deleteArticle(userId, articleId) {
    const sql =
      'UPDATE articles SET status = 0, updated_at = ? WHERE user_id = ? AND article_id = ?'
    const now = /* @__PURE__ */ new Date().toISOString()
    this.db.prepare(sql).run(now, userId, articleId)
  }
  /**
   * 永久删除文章
   */
  async foreverDeleteArticle(userId, articleId) {
    const sql = 'DELETE FROM articles WHERE user_id = ? AND article_id = ?'
    this.db.prepare(sql).run(userId, articleId)
  }
  /**
   * 获取回收站文章列表
   */
  async getRecycleList(userId) {
    const sql = `
      SELECT a.*, ac.class_name 
      FROM articles a 
      LEFT JOIN article_classifies ac ON a.classify_id = ac.id 
      WHERE a.user_id = ? AND a.status = 0
      ORDER BY a.updated_at DESC
    `
    const articles = this.db.prepare(sql).all(userId)
    return { items: articles }
  }
  /**
   * 恢复文章
   */
  async recoverArticle(userId, articleId) {
    const sql =
      'UPDATE articles SET status = 1, updated_at = ? WHERE user_id = ? AND article_id = ?'
    const now = /* @__PURE__ */ new Date().toISOString()
    this.db.prepare(sql).run(now, userId, articleId)
  }
  /**
   * 收藏/取消收藏文章
   */
  async toggleCollect(userId, articleId) {
    const article = this.db
      .prepare('SELECT is_asterisk FROM articles WHERE user_id = ? AND article_id = ?')
      .get(userId, articleId)
    if (!article) {
      throw new Error('文章不存在')
    }
    const newStatus = article.is_asterisk ? 0 : 1
    const sql =
      'UPDATE articles SET is_asterisk = ?, updated_at = ? WHERE user_id = ? AND article_id = ?'
    const now = /* @__PURE__ */ new Date().toISOString()
    this.db.prepare(sql).run(newStatus, now, userId, articleId)
    return { is_asterisk: newStatus }
  }
  /**
   * 移动文章到分类
   */
  async moveToClassify(userId, articleId, classifyId) {
    const sql =
      'UPDATE articles SET classify_id = ?, updated_at = ? WHERE user_id = ? AND article_id = ?'
    const now = /* @__PURE__ */ new Date().toISOString()
    this.db.prepare(sql).run(classifyId, now, userId, articleId)
  }
  /**
   * 获取文章分类列表
   */
  async getClassifyList(userId) {
    const sql = `
      SELECT ac.*, 
             COALESCE(COUNT(a.id), 0) as count
      FROM article_classifies ac
      LEFT JOIN articles a ON ac.id = a.classify_id AND a.status = 1
      WHERE ac.user_id = ?
      GROUP BY ac.id
      ORDER BY ac.sort ASC, ac.created_at ASC
    `
    const classifies = this.db.prepare(sql).all(userId)
    return { items: classifies }
  }
  /**
   * 创建文章分类
   */
  async createClassify(userId, data) {
    const now = /* @__PURE__ */ new Date().toISOString()
    const sort = data.sort || 0
    const sql = `
      INSERT INTO article_classifies (user_id, class_name, sort, is_default, created_at, updated_at)
      VALUES (?, ?, ?, 0, ?, ?)
    `
    const result = this.db.prepare(sql).run(userId, data.name, sort, now, now)
    return { classify_id: result.lastInsertRowid }
  }
  /**
   * 更新文章分类
   */
  async updateClassify(userId, classifyId, data) {
    const updates = []
    const params = []
    if (data.name !== void 0) {
      updates.push('class_name = ?')
      params.push(data.name)
    }
    if (data.sort !== void 0) {
      updates.push('sort = ?')
      params.push(data.sort)
    }
    if (updates.length === 0) {
      return
    }
    updates.push('updated_at = ?')
    params.push(/* @__PURE__ */ new Date().toISOString())
    params.push(userId, classifyId)
    const sql = `UPDATE article_classifies SET ${updates.join(', ')} WHERE user_id = ? AND id = ?`
    this.db.prepare(sql).run(...params)
  }
  /**
   * 删除文章分类
   */
  async deleteClassify(userId, classifyId) {
    const classify = this.db
      .prepare('SELECT is_default FROM article_classifies WHERE user_id = ? AND id = ?')
      .get(userId, classifyId)
    if (!classify) {
      throw new Error('分类不存在')
    }
    if (classify.is_default) {
      throw new Error('默认分类不能删除')
    }
    const defaultClassify = this.db
      .prepare('SELECT id FROM article_classifies WHERE user_id = ? AND is_default = 1')
      .get(userId)
    if (defaultClassify) {
      this.db
        .prepare('UPDATE articles SET classify_id = ? WHERE user_id = ? AND classify_id = ?')
        .run(defaultClassify.id, userId, classifyId)
    }
    this.db
      .prepare('DELETE FROM article_classifies WHERE user_id = ? AND id = ?')
      .run(userId, classifyId)
  }
  /**
   * 获取标签列表
   */
  async getTagList(userId) {
    const sql = 'SELECT * FROM article_tags WHERE user_id = ? ORDER BY sort ASC, created_at ASC'
    const tags = this.db.prepare(sql).all(userId)
    return { items: tags }
  }
  /**
   * 创建标签
   */
  async createTag(userId, data) {
    const now = /* @__PURE__ */ new Date().toISOString()
    const sort = data.sort || 0
    const sql = `
      INSERT INTO article_tags (user_id, tag_name, sort, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?)
    `
    const result = this.db.prepare(sql).run(userId, data.tag_name, sort, now, now)
    return { tag_id: result.lastInsertRowid }
  }
  /**
   * 更新标签
   */
  async updateTag(userId, tagId, data) {
    const updates = []
    const params = []
    if (data.tag_name !== void 0) {
      updates.push('tag_name = ?')
      params.push(data.tag_name)
    }
    if (data.sort !== void 0) {
      updates.push('sort = ?')
      params.push(data.sort)
    }
    if (updates.length === 0) {
      return
    }
    updates.push('updated_at = ?')
    params.push(/* @__PURE__ */ new Date().toISOString())
    params.push(userId, tagId)
    const sql = `UPDATE article_tags SET ${updates.join(', ')} WHERE user_id = ? AND id = ?`
    this.db.prepare(sql).run(...params)
  }
  /**
   * 删除标签
   */
  async deleteTag(userId, tagId) {
    this.db.prepare('DELETE FROM article_tags WHERE user_id = ? AND id = ?').run(userId, tagId)
  }
}
const articleService = new ArticleService()
class IPCHandler {
  currentUser = null
  constructor() {
    this.setupIPCHandlers()
    this.setupRealtimeEvents()
  }
  setupIPCHandlers() {
    electron.ipcMain.handle('api-request', async (_event, request) => {
      return await this.handleRequest(request)
    })
    electron.ipcMain.handle('upload-file', async (_event, fileData) => {
      return await this.handleFileUpload(fileData)
    })
  }
  async handleRequest(request) {
    try {
      console.log('IPC API Request:', request.method, request.url)
      if (!this.isPublicEndpoint(request.url)) {
        const token = this.extractToken(request.headers)
        console.log('IPCHandler: Extracted token:', token ? 'present' : 'missing')
        if (!token) {
          console.warn('IPCHandler: No token provided for protected endpoint:', request.url)
          return this.createErrorResponse(request.id, 401, '未授权访问')
        }
        console.log('IPCHandler: Validating session for token:', token.substring(0, 20) + '...')
        this.currentUser = await authService.validateSession(token)
        if (!this.currentUser) {
          console.warn('IPCHandler: Session validation failed for endpoint:', request.url)
          return this.createErrorResponse(request.id, 401, '登录已过期')
        }
        console.log('IPCHandler: Session validated for user:', this.currentUser.mobile)
      }
      const result = await this.routeRequest(request)
      return {
        id: request.id,
        status: 200,
        code: 200,
        message: 'success',
        data: result
      }
    } catch (error) {
      console.error('IPC API Error:', error)
      return this.createErrorResponse(request.id, 500, error.message || '服务器内部错误')
    }
  }
  async handleFileUpload(fileData) {
    try {
      const { buffer, fileName, mimeType, token } = fileData
      if (!token) {
        throw new Error('未授权访问')
      }
      const user = await authService.validateSession(token)
      if (!user) {
        throw new Error('登录已过期')
      }
      const fileBuffer = Buffer.from(buffer)
      const result = await uploadService.uploadFile(fileBuffer, fileName, mimeType, user.id)
      return {
        file_id: result.file_id,
        file_name: result.file_name,
        file_size: result.file_size,
        file_type: result.file_type,
        file_url: result.file_url,
        upload_time: result.upload_time
      }
    } catch (error) {
      console.error('File upload error:', error)
      throw new Error(error.message || '文件上传失败')
    }
  }
  setupRealtimeEvents() {
    chatService.on('message:new', (message) => {
      this.broadcastToUsers('message:new', message)
    })
    chatService.on('message:revoke', (data) => {
      this.broadcastToUsers('message:revoke', data)
    })
    userService.on('user:online', (data) => {
      this.broadcastToUsers('user:online', data)
    })
    userService.on('user:offline', (data) => {
      this.broadcastToUsers('user:offline', data)
    })
  }
  async routeRequest(request) {
    const { url, data } = request
    const userId = this.currentUser?.id
    if (url === '/api/v1/auth/login') {
      return await authService.login(data)
    }
    if (url === '/api/v1/auth/register') {
      await authService.register(data)
      return null
    }
    if (url === '/api/v1/auth/logout') {
      const token = this.extractToken(request.headers)
      if (token) {
        await authService.logout(token)
      }
      return null
    }
    if (url === '/api/v1/auth/forget') {
      await authService.forgetPassword(data.mobile, data.password, data.sms_code)
      return null
    }
    if (url === '/api/v1/user/detail') {
      return await userService.getUserDetail(userId)
    }
    if (url === '/api/v1/user/update') {
      await userService.updateUser(userId, data)
      return null
    }
    if (url === '/api/v1/user/password/update') {
      await userService.updatePassword(userId, data.old_password, data.new_password)
      return null
    }
    if (url === '/api/v1/user/mobile/update') {
      await userService.updateMobile(userId, data.mobile, data.password, data.sms_code)
      return null
    }
    if (url === '/api/v1/user/email/update') {
      await userService.updateEmail(userId, data.email, data.password, data.code)
      return null
    }
    if (url === '/api/v1/user/setting') {
      const userSettings = await userService.getUserSettings(userId)
      const userDetail = await userService.getUserDetail(userId)
      return {
        user_info: {
          uid: userDetail.id,
          mobile: userDetail.mobile,
          nickname: userDetail.nickname,
          avatar: userDetail.avatar,
          motto: userDetail.motto,
          email: userDetail.email,
          gender: userDetail.gender,
          birthday: userDetail.birthday,
          is_qiye: false
          // 默认值，可以根据需要调整
        },
        settings: userSettings
      }
    }
    if (url === '/api/v1/contact/list') {
      return await contactService.getContactList(userId)
    }
    if (url === '/api/v1/contact/search') {
      return await userService.searchUsers(data.mobile)
    }
    if (url === '/api/v1/contact/detail') {
      return await contactService.getContactDetail(userId, data.user_id)
    }
    if (url === '/api/v1/contact/delete') {
      await contactService.deleteContact(userId, data.user_id)
      return null
    }
    if (url === '/api/v1/contact/edit-remark') {
      await contactService.updateContactRemark(userId, data.user_id, data.remark)
      return null
    }
    if (url === '/api/v1/contact/apply/create') {
      await contactService.createContactApply(userId, data.user_id, data.remark)
      return null
    }
    if (url === '/api/v1/contact/apply/records') {
      return await contactService.getContactApplyList(userId)
    }
    if (url === '/api/v1/contact/apply/accept') {
      await contactService.handleContactApply(userId, data.apply_id, 'accept', data.remark)
      return null
    }
    if (url === '/api/v1/contact/apply/decline') {
      await contactService.handleContactApply(userId, data.apply_id, 'reject', data.remark)
      return null
    }
    if (url === '/api/v1/contact/apply/unread-num') {
      const applyList = await contactService.getContactApplyList(userId)
      return { unread_num: applyList.filter((item) => item.status === 'pending').length }
    }
    if (url === '/api/v1/contact/group/list') {
      return await contactService.getContactGroups(userId)
    }
    if (url === '/api/v1/contact/move-group') {
      await contactService.moveContactToGroup(userId, {
        friend_id: data.user_id,
        group_id: data.group_id
      })
      return null
    }
    if (url === '/api/v1/contact/group/update') {
      for (const item of data.items) {
        if (item.id === 0) continue
        if (item.name) {
          await contactService.updateContactGroup(userId, item.id, {
            name: item.name,
            sort: item.sort || 0
          })
        }
      }
      return null
    }
    if (url === '/api/v1/contact/online-status') {
      return await userService.getOnlineStatus(data.user_id)
    }
    if (url === '/api/v1/group/list') {
      return await groupService.getGroupList(userId)
    }
    if (url === '/api/v1/group/detail') {
      return await groupService.getGroupDetail(userId, data.group_id)
    }
    if (url === '/api/v1/group/create') {
      return await groupService.createGroup(userId, data)
    }
    if (url === '/api/v1/group/update') {
      await groupService.updateGroup(userId, data.group_id, data)
      return null
    }
    if (url === '/api/v1/group/invite') {
      await groupService.inviteMembers(userId, data.group_id, { user_ids: data.user_ids })
      return null
    }
    if (url === '/api/v1/group/member/remove') {
      await groupService.removeMembers(userId, data.group_id, { user_ids: [data.user_id] })
      return null
    }
    if (url === '/api/v1/group/dismiss') {
      await groupService.dismissGroup(userId, data.group_id)
      return null
    }
    if (url === '/api/v1/group/secede') {
      await groupService.leaveGroup(userId, data.group_id)
      return null
    }
    if (url === '/api/v1/group/member/list') {
      const groupDetail = await groupService.getGroupDetail(userId, data.group_id)
      return groupDetail.members
    }
    if (url === '/api/v1/group/apply/unread') {
      return { unread_num: 0 }
    }
    if (url === '/api/v1/group/apply/all') {
      return []
    }
    if (url === '/api/v1/group/overt-list') {
      return await groupService.searchGroups(data.keyword || '', data.limit || 20)
    }
    if (url === '/api/v1/talk/list') {
      const items = await chatService.getTalkList(userId)
      return { items }
    }
    if (url === '/api/v1/talk/create') {
      await chatService.createTalk(userId, data.talk_mode, data.to_from_id)
      return null
    }
    if (url === '/api/v1/talk/delete') {
      await chatService.deleteTalk(userId, data.talk_mode, data.to_from_id)
      return null
    }
    if (url === '/api/v1/talk/topping') {
      await chatService.toggleTalkTop(userId, data.talk_mode, data.to_from_id, data.action)
      return null
    }
    if (url === '/api/v1/talk/disturb') {
      await chatService.toggleTalkDisturb(userId, data.talk_mode, data.to_from_id, data.action)
      return null
    }
    if (url === '/api/v1/talk/clear-unread') {
      await chatService.clearUnread(userId, data.talk_mode, data.to_from_id)
      return null
    }
    if (url === '/api/v1/talk/records') {
      return await chatService.getTalkRecords(userId, data)
    }
    if (url === '/api/v1/talk/history-records') {
      return await chatService.searchHistoryRecords(
        userId,
        data.keyword,
        data.talk_mode,
        data.to_from_id
      )
    }
    if (url === '/api/v1/talk/forward-records') {
      return await chatService.getForwardRecords(data.msg_ids)
    }
    if (url === '/api/v1/talk/message/send') {
      return await chatService.sendMessage(userId, data)
    }
    if (url === '/api/v1/talk/message/revoke') {
      await chatService.revokeMessage(userId, data.talk_mode, data.to_from_id, data.msg_id)
      return null
    }
    if (url === '/api/v1/talk/message/delete') {
      await chatService.deleteMessage(userId, data.talk_mode, data.to_from_id, data.msg_ids)
      return null
    }
    if (url === '/api/v1/upload/file') {
      throw new Error('文件上传请使用 upload-file 事件')
    }
    if (url === '/api/v1/article/list') {
      return await articleService.getArticleList(userId, data)
    }
    if (url === '/api/v1/article/detail') {
      return await articleService.getArticleDetail(userId, data.article_id)
    }
    if (url === '/api/v1/article/editor') {
      return await articleService.saveArticle(userId, data)
    }
    if (url === '/api/v1/article/delete') {
      await articleService.deleteArticle(userId, data.article_id)
      return null
    }
    if (url === '/api/v1/article/forever-delete') {
      await articleService.foreverDeleteArticle(userId, data.article_id)
      return null
    }
    if (url === '/api/v1/article/recycle-list') {
      return await articleService.getRecycleList(userId)
    }
    if (url === '/api/v1/article/recover-delete') {
      await articleService.recoverArticle(userId, data.article_id)
      return null
    }
    if (url === '/api/v1/article/collect') {
      return await articleService.toggleCollect(userId, data.article_id)
    }
    if (url === '/api/v1/article/move-classify') {
      await articleService.moveToClassify(userId, data.article_id, data.classify_id)
      return null
    }
    if (url === '/api/v1/article/classify/list') {
      return await articleService.getClassifyList(userId)
    }
    if (url === '/api/v1/article/classify/create') {
      return await articleService.createClassify(userId, data)
    }
    if (url === '/api/v1/article/classify/update') {
      await articleService.updateClassify(userId, data.classify_id, data)
      return null
    }
    if (url === '/api/v1/article/classify/delete') {
      await articleService.deleteClassify(userId, data.classify_id)
      return null
    }
    if (url === '/api/v1/article/tag/list') {
      return await articleService.getTagList(userId)
    }
    if (url === '/api/v1/article/tag/create') {
      return await articleService.createTag(userId, data)
    }
    if (url === '/api/v1/article/tag/update') {
      await articleService.updateTag(userId, data.tag_id, data)
      return null
    }
    if (url === '/api/v1/article/tag/delete') {
      await articleService.deleteTag(userId, data.tag_id)
      return null
    }
    const p2pServiceClient = serviceManager.getP2PServiceClient()
    if (p2pServiceClient) {
      if (url === '/api/v1/p2p/status') {
        const nodeInfo = await p2pServiceClient.getNodeInfo()
        return {
          isRunning: p2pServiceClient.isRunning(),
          peerId: nodeInfo?.peerId || null,
          identity: nodeInfo ? { peerId: nodeInfo.peerId } : null
        }
      }
      if (url === '/api/v1/p2p/peers') {
        const connectedPeers = await p2pServiceClient.getConnectedPeers()
        return connectedPeers.map((peerId) => ({
          peerId,
          status: 'connected',
          addedAt: /* @__PURE__ */ new Date().toISOString()
        }))
      }
      if (url === '/api/v1/p2p/message/send') {
        if (!data.groupId) {
          await p2pServiceClient.sendDirectMessage(data.to, data.content)
        }
        return null
      }
      if (url === '/api/v1/p2p/group/create') {
        throw new Error('P2P群组功能暂未实现')
      }
      if (url === '/api/v1/p2p/group/join') {
        throw new Error('P2P群组功能暂未实现')
      }
      if (url === '/api/v1/p2p/group/leave') {
        throw new Error('P2P群组功能暂未实现')
      }
      if (url === '/api/v1/p2p/contact/add') {
        return null
      }
      if (url === '/api/v1/p2p/contact/list') {
        return []
      }
      if (url === '/api/v1/p2p/message/history') {
        return []
      }
      if (url === '/api/v1/p2p/peer/connect') {
        return null
      }
      if (url === '/api/v1/p2p/peer/disconnect') {
        return null
      }
    }
    throw new Error(`未知的接口: ${url}`)
  }
  isPublicEndpoint(url) {
    const publicEndpoints = ['/api/v1/auth/login', '/api/v1/auth/register', '/api/v1/auth/forget']
    return publicEndpoints.includes(url)
  }
  extractToken(headers) {
    if (!headers || !headers.Authorization) {
      return null
    }
    const authHeader = headers.Authorization
    if (authHeader.startsWith('Bearer ')) {
      return authHeader.substring(7)
    }
    return null
  }
  createErrorResponse(id, status, message) {
    return {
      id,
      status,
      code: status,
      message,
      data: null
    }
  }
  broadcastToUsers(event, data) {
    const windows = electron.BrowserWindow.getAllWindows()
    windows.forEach((window) => {
      if (!window.isDestroyed()) {
        window.webContents.send('realtime-event', { event, data })
      }
    })
  }
}
const ipcHandler = new IPCHandler()
class P2PServiceClient extends events.EventEmitter {
  serviceProcess = null
  isStarted = false
  messageId = 0
  pendingMessages = /* @__PURE__ */ new Map()
  constructor() {
    super()
  }
  // 启动P2P服务
  async start() {
    if (this.isStarted) {
      return
    }
    try {
      const isDev = process.env.NODE_ENV === 'development'
      let servicePath
      let polyfillPath
      if (isDev) {
        const projectRoot = path__namespace.resolve(__dirname, '../..')
        servicePath = path__namespace.join(projectRoot, 'src/p2p-service/index.mjs')
        polyfillPath = path__namespace.join(projectRoot, 'src/p2p-service/polyfills.js')
      } else {
        const { app } = require('electron')
        const appPath = app.getAppPath()
        servicePath = path__namespace.join(appPath, 'src/p2p-service/index.mjs')
        polyfillPath = path__namespace.join(appPath, 'src/p2p-service/polyfills.js')
      }
      const nodeArgs = ['--require', polyfillPath, servicePath]
      this.serviceProcess = child_process.spawn('node', nodeArgs, {
        stdio: ['pipe', 'pipe', 'pipe', 'pipe'],
        env: {
          ...process.env,
          NODE_ENV: process.env.NODE_ENV || 'development',
          USER_DATA_PATH: require('electron').app.getPath('userData'),
          TS_NODE_COMPILER_OPTIONS: JSON.stringify({
            module: 'commonjs',
            target: 'es2020'
          })
        }
      })
      this.setupProcessEvents()
      await this.waitForReady()
      await this.sendMessage('start')
      this.isStarted = true
      this.emit('started')
      console.log('P2P Service Client started successfully')
    } catch (error) {
      console.error('Failed to start P2P service client:', error)
      await this.cleanup()
      throw error
    }
  }
  // 停止P2P服务
  async stop() {
    if (!this.isStarted) {
      return
    }
    try {
      if (this.serviceProcess) {
        await this.sendMessage('stop')
        await new Promise((resolve) => {
          if (this.serviceProcess) {
            this.serviceProcess.on('exit', () => resolve())
            this.serviceProcess.kill('SIGTERM')
            setTimeout(() => {
              if (this.serviceProcess && !this.serviceProcess.killed) {
                this.serviceProcess.kill('SIGKILL')
              }
              resolve()
            }, 5e3)
          } else {
            resolve()
          }
        })
      }
      await this.cleanup()
      this.isStarted = false
      this.emit('stopped')
      console.log('P2P Service Client stopped')
    } catch (error) {
      console.error('Failed to stop P2P service client:', error)
      await this.cleanup()
      throw error
    }
  }
  // 发送直接消息
  async sendDirectMessage(targetPeerId, message) {
    if (!this.isStarted) {
      throw new Error('P2P service not started')
    }
    await this.sendMessage('sendDirectMessage', {
      targetPeerId,
      message
    })
  }
  // 获取连接的节点
  async getConnectedPeers() {
    if (!this.isStarted) {
      return []
    }
    const result = await this.sendMessage('getConnectedPeers')
    return result || []
  }
  // 获取节点信息
  async getNodeInfo() {
    if (!this.isStarted) {
      return null
    }
    const result = await this.sendMessage('getNodeInfo')
    return result || null
  }
  // 检查服务是否运行
  isRunning() {
    return this.isStarted && this.serviceProcess !== null && !this.serviceProcess.killed
  }
  // 等待服务就绪
  async waitForReady() {
    return new Promise((resolve, reject) => {
      if (!this.serviceProcess) {
        reject(new Error('Service process not started'))
        return
      }
      const timeout = setTimeout(() => {
        reject(new Error('P2P service startup timeout'))
      }, 3e4)
      const originalHandler = this.handleServiceMessage.bind(this)
      this.handleServiceMessage = (message) => {
        if (message.type === 'ready') {
          clearTimeout(timeout)
          this.handleServiceMessage = originalHandler
          resolve()
        } else {
          originalHandler(message)
        }
      }
    })
  }
  // 设置进程事件监听
  setupProcessEvents() {
    if (!this.serviceProcess) return
    let buffer = ''
    this.serviceProcess.stdout?.on('data', (data) => {
      buffer += data.toString()
      const lines = buffer.split('\n')
      buffer = lines.pop() || ''
      for (const line of lines) {
        if (line.trim()) {
          try {
            const message = JSON.parse(line)
            this.handleServiceMessage(message)
          } catch (error) {
            console.log('P2P Service:', line.trim())
          }
        }
      }
    })
    this.serviceProcess.on('error', (error) => {
      console.error('P2P service process error:', error)
      this.emit('error', error)
    })
    this.serviceProcess.on('exit', (code, signal) => {
      console.log(`P2P service process exited with code ${code}, signal ${signal}`)
      this.cleanup()
      this.emit('stopped')
    })
    this.serviceProcess.stderr?.on('data', (data) => {
      console.error('P2P Service Error:', data.toString().trim())
    })
  }
  // 处理来自服务进程的消息
  handleServiceMessage(message) {
    if (this.pendingMessages.has(message.id)) {
      const pending = this.pendingMessages.get(message.id)
      this.pendingMessages.delete(message.id)
      clearTimeout(pending.timeout)
      if (message.type === 'error') {
        pending.reject(new Error(message.error || 'Unknown error'))
      } else {
        pending.resolve(message.data)
      }
      return
    }
    switch (message.type) {
      case 'started':
        this.emit('p2p:started', message.data)
        break
      case 'stopped':
        this.emit('p2p:stopped')
        break
      case 'peer:connect':
        this.emit('peer:connect', message.data)
        break
      case 'peer:disconnect':
        this.emit('peer:disconnect', message.data)
        break
      case 'peer:discovery':
        this.emit('peer:discovery', message.data)
        break
      case 'message:sent':
        this.emit('message:sent', message.data)
        break
      case 'message:received':
        this.emit('message:received', message.data)
        break
      default:
        console.log('Unknown P2P service message:', message)
    }
  }
  // 发送消息到服务进程
  async sendMessage(type, data) {
    return new Promise((resolve, reject) => {
      if (!this.serviceProcess || !this.serviceProcess.stdin) {
        reject(new Error('Service process not available'))
        return
      }
      const id = `msg_${++this.messageId}`
      const message = { id, type, data }
      const timeout = setTimeout(() => {
        this.pendingMessages.delete(id)
        reject(new Error(`Message timeout: ${type}`))
      }, 1e4)
      this.pendingMessages.set(id, { resolve, reject, timeout })
      const messageStr = JSON.stringify(message) + '\n'
      this.serviceProcess.stdin.write(messageStr)
    })
  }
  // 清理资源
  async cleanup() {
    for (const [_id, pending] of this.pendingMessages) {
      clearTimeout(pending.timeout)
      pending.reject(new Error('Service stopped'))
    }
    this.pendingMessages.clear()
    if (this.serviceProcess) {
      this.serviceProcess.removeAllListeners()
      this.serviceProcess = null
    }
    this.isStarted = false
  }
}
class P2PIPCBridge {
  p2pServiceClient
  mainWindow = null
  constructor(p2pServiceClient) {
    this.p2pServiceClient = p2pServiceClient
    this.setupIPCHandlers()
    this.setupEventForwarding()
  }
  setMainWindow(mainWindow) {
    this.mainWindow = mainWindow
  }
  setupIPCHandlers() {
    electron.ipcMain.handle('p2p:start', async () => {
      try {
        await this.p2pServiceClient.start()
        return { success: true }
      } catch (error) {
        console.error('Failed to start P2P service:', error)
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })
    electron.ipcMain.handle('p2p:stop', async () => {
      try {
        await this.p2pServiceClient.stop()
        return { success: true }
      } catch (error) {
        console.error('Failed to stop P2P service:', error)
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })
    electron.ipcMain.handle('p2p:getStatus', async () => {
      try {
        const nodeInfo = await this.p2pServiceClient.getNodeInfo()
        return {
          success: true,
          isRunning: this.p2pServiceClient.isRunning(),
          nodeId: nodeInfo?.peerId || null,
          connectedPeers: nodeInfo?.connectedPeers || [],
          addresses: nodeInfo?.addresses || []
        }
      } catch (error) {
        console.error('Failed to get P2P status:', error)
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })
    electron.ipcMain.handle('p2p:sendDirectMessage', async (_event, params) => {
      try {
        const { targetPeerId, message } = params
        await this.p2pServiceClient.sendDirectMessage(targetPeerId, message)
        return { success: true }
      } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })
    electron.ipcMain.handle('p2p:sendGroupMessage', async (_event, _params) => {
      try {
        throw new Error('Group messaging not implemented yet')
      } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })
    electron.ipcMain.handle('p2p:getChatHistory', async (_event, _params) => {
      try {
        return { success: true, data: [] }
      } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })
    electron.ipcMain.handle('p2p:getGroupChatHistory', async (_event, _params) => {
      try {
        return { success: true, data: [] }
      } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })
    electron.ipcMain.handle('p2p:markMessagesAsRead', async (_event, _params) => {
      try {
        return { success: true }
      } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })
    electron.ipcMain.handle('p2p:deleteMessage', async (_event, _params) => {
      try {
        return { success: true }
      } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })
    electron.ipcMain.handle('p2p:recallMessage', async (_event, _params) => {
      try {
        return { success: true }
      } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })
    electron.ipcMain.handle('p2p:addContact', async (_event, _params) => {
      try {
        return { success: true }
      } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })
    electron.ipcMain.handle('p2p:getContacts', async () => {
      try {
        return { success: true, data: [] }
      } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })
    electron.ipcMain.handle('p2p:deleteContact', async (_event, _params) => {
      try {
        return { success: true }
      } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })
    electron.ipcMain.handle('p2p:updateContact', async (_event, _params) => {
      try {
        return { success: true }
      } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })
    electron.ipcMain.handle('p2p:searchContacts', async (_event, _params) => {
      try {
        return { success: true, data: [] }
      } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })
    electron.ipcMain.handle('p2p:getContactRequests', async () => {
      try {
        return { success: true, data: [] }
      } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })
    electron.ipcMain.handle('p2p:handleContactRequest', async (_event, _params) => {
      try {
        return { success: true }
      } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })
    electron.ipcMain.handle('p2p:createGroup', async (_event, _params) => {
      try {
        return { success: true, data: null }
      } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })
    electron.ipcMain.handle('p2p:getGroups', async () => {
      try {
        return { success: true, data: [] }
      } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })
    electron.ipcMain.handle('p2p:joinGroup', async (_event, _params) => {
      try {
        return { success: true }
      } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })
    electron.ipcMain.handle('p2p:leaveGroup', async (_event, _params) => {
      try {
        return { success: true }
      } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })
    electron.ipcMain.handle('p2p:getGroupMembers', async (_event, _params) => {
      try {
        return { success: true, data: [] }
      } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })
    electron.ipcMain.handle('p2p:inviteToGroup', async (_event, _params) => {
      try {
        return { success: true }
      } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })
    electron.ipcMain.handle('p2p:getDiscoveredPeers', async () => {
      try {
        const connectedPeers = await this.p2pServiceClient.getConnectedPeers()
        return { success: true, data: connectedPeers }
      } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })
    electron.ipcMain.handle('p2p:getUnsyncedMessages', async () => {
      try {
        return { success: true, data: [] }
      } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })
    electron.ipcMain.handle('p2p:getContactChanges', async () => {
      try {
        return { success: true, data: [] }
      } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })
    electron.ipcMain.handle('p2p:broadcastContactChanges', async (_event, _changes) => {
      try {
        return { success: true }
      } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }
    })
  }
  setupEventForwarding() {
    this.p2pServiceClient.on('message:received', (message) => {
      if (this.mainWindow) {
        this.mainWindow.webContents.send('p2p:messageReceived', message)
      }
    })
    this.p2pServiceClient.on('peer:connect', (peerId) => {
      if (this.mainWindow) {
        this.mainWindow.webContents.send('p2p:peerConnected', peerId)
      }
    })
    this.p2pServiceClient.on('peer:disconnect', (peerId) => {
      if (this.mainWindow) {
        this.mainWindow.webContents.send('p2p:peerDisconnected', peerId)
      }
    })
    this.p2pServiceClient.on('peer:discovery', (peers) => {
      if (this.mainWindow) {
        this.mainWindow.webContents.send('p2p:peerDiscovered', peers)
      }
    })
    this.p2pServiceClient.on('p2p:started', (data) => {
      if (this.mainWindow) {
        this.mainWindow.webContents.send('p2p:networkStatusChanged', { status: 'connected', data })
      }
    })
    this.p2pServiceClient.on('p2p:stopped', () => {
      if (this.mainWindow) {
        this.mainWindow.webContents.send('p2p:networkStatusChanged', { status: 'disconnected' })
      }
    })
    this.p2pServiceClient.on('error', (error) => {
      if (this.mainWindow) {
        this.mainWindow.webContents.send('p2p:networkStatusChanged', {
          status: 'error',
          error: error instanceof Error ? error.message : String(error)
        })
      }
    })
  }
  async cleanup() {
    const handlers = [
      'p2p:start',
      'p2p:stop',
      'p2p:getStatus',
      'p2p:sendDirectMessage',
      'p2p:sendGroupMessage',
      'p2p:getChatHistory',
      'p2p:getGroupChatHistory',
      'p2p:markMessagesAsRead',
      'p2p:deleteMessage',
      'p2p:recallMessage',
      'p2p:addContact',
      'p2p:getContacts',
      'p2p:deleteContact',
      'p2p:updateContact',
      'p2p:searchContacts',
      'p2p:getContactRequests',
      'p2p:handleContactRequest',
      'p2p:createGroup',
      'p2p:getGroups',
      'p2p:joinGroup',
      'p2p:leaveGroup',
      'p2p:getGroupMembers',
      'p2p:inviteToGroup',
      'p2p:getDiscoveredPeers',
      'p2p:getUnsyncedMessages',
      'p2p:getContactChanges',
      'p2p:broadcastContactChanges'
    ]
    for (const handler of handlers) {
      electron.ipcMain.removeHandler(handler)
    }
  }
}
class ServiceManager {
  static instance
  isInitialized = false
  p2pServiceClient = null
  p2pIPCBridge = null
  static getInstance() {
    if (!ServiceManager.instance) {
      ServiceManager.instance = new ServiceManager()
    }
    return ServiceManager.instance
  }
  async initialize() {
    if (this.isInitialized) {
      return
    }
    try {
      console.log('Initializing services...')
      ensureDirectories()
      console.log('Directories ensured')
      await databaseManager.initialize()
      console.log('Database initialized')
      this.startScheduledTasks()
      console.log('Scheduled tasks started')
      console.log('IPC handler initialized')
      this.p2pServiceClient = new P2PServiceClient()
      this.p2pIPCBridge = new P2PIPCBridge(this.p2pServiceClient)
      await this.p2pServiceClient.start()
      console.log('P2P service client initialized')
      this.isInitialized = true
      console.log('All services initialized successfully')
    } catch (error) {
      console.error('Failed to initialize services:', error)
      throw error
    }
  }
  async shutdown() {
    if (!this.isInitialized) {
      return
    }
    try {
      console.log('Shutting down services...')
      this.stopScheduledTasks()
      if (this.p2pServiceClient) {
        await this.p2pServiceClient.stop()
        console.log('P2P service client stopped')
      }
      if (this.p2pIPCBridge) {
        await this.p2pIPCBridge.cleanup()
        console.log('P2P IPC bridge cleaned up')
      }
      await databaseManager.close()
      this.isInitialized = false
      console.log('All services shut down successfully')
    } catch (error) {
      console.error('Failed to shutdown services:', error)
      throw error
    }
  }
  startScheduledTasks() {
    setInterval(
      () => {
        userService.cleanupOfflineUsers().catch((error) => {
          console.error('Failed to cleanup offline users:', error)
        })
      },
      5 * 60 * 1e3
    )
    setInterval(
      () => {
        databaseManager.optimize().catch((error) => {
          console.error('Failed to optimize database:', error)
        })
      },
      60 * 60 * 1e3
    )
  }
  stopScheduledTasks() {}
  getDatabaseManager() {
    return databaseManager
  }
  getAuthService() {
    return authService
  }
  getChatService() {
    return chatService
  }
  getUserService() {
    return userService
  }
  getContactService() {
    return contactService
  }
  getGroupService() {
    return groupService
  }
  getUploadService() {
    return uploadService
  }
  getIPCHandler() {
    return ipcHandler
  }
  getP2PServiceClient() {
    return this.p2pServiceClient
  }
  setMainWindow(mainWindow) {
    if (this.p2pIPCBridge) {
      this.p2pIPCBridge.setMainWindow(mainWindow)
    }
  }
}
const serviceManager = ServiceManager.getInstance()
function createWindow() {
  const mainWindow = new electron.BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
      sandbox: false,
      contextIsolation: true,
      nodeIntegration: false
    }
  })
  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
    if (utils.is.dev) {
      mainWindow.webContents.openDevTools()
    }
  })
  mainWindow.webContents.setWindowOpenHandler((details) => {
    electron.shell.openExternal(details.url)
    return { action: 'deny' }
  })
  if (utils.is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'))
  }
}
electron.app.whenReady().then(async () => {
  utils.electronApp.setAppUserModelId('com.electron')
  electron.app.on('browser-window-created', (_, window) => {
    utils.optimizer.watchWindowShortcuts(window)
  })
  try {
    await serviceManager.initialize()
    console.log('Services initialized successfully')
    await createTestUserIfNotExists()
  } catch (error) {
    console.error(
      'Failed to initialize services:',
      error instanceof Error ? error.message : String(error)
    )
    electron.app.quit()
    return
  }
  electron.ipcMain.handle('ping', () => 'pong')
  createWindow()
  electron.app.on('activate', function () {
    if (electron.BrowserWindow.getAllWindows().length === 0) createWindow()
  })
  initPlugins()
})
electron.app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    electron.app.quit()
  }
})
electron.app.on('before-quit', async () => {
  console.log('App is about to quit')
  try {
    await serviceManager.shutdown()
    console.log('Services shut down successfully')
  } catch (error) {
    console.error(
      'Failed to shutdown services:',
      error instanceof Error ? error.message : String(error)
    )
  }
})
async function createTestUserIfNotExists() {
  try {
    const db = databaseManager.getDatabase()
    const testUsers = [
      { nickname: '测试用户', mobile: '13800138000', password: '123456' },
      { nickname: 'Alice', mobile: '13800138001', password: '123456' },
      { nickname: 'Bob', mobile: '13800138002', password: '123456' },
      { nickname: 'Charlie', mobile: '13800138003', password: '123456' },
      { nickname: 'Diana', mobile: '13800138004', password: '123456' }
    ]
    console.log('========================================')
    console.log('检查和创建测试用户')
    console.log('========================================')
    for (const userConfig of testUsers) {
      const { nickname, mobile, password } = userConfig
      const existingUser = db.prepare('SELECT * FROM users WHERE mobile = ?').get(mobile)
      if (!existingUser) {
        console.log(`创建用户: ${nickname} (${mobile})`)
        try {
          const registerRequest = {
            nickname,
            mobile,
            password,
            platform: 'desktop',
            sms_code: '123456'
            // 这个会被跳过验证
          }
          await authService.register(registerRequest)
          console.log(`✓ 用户 ${nickname} 创建成功`)
        } catch (error) {
          console.error(
            `✗ 创建用户 ${nickname} 失败:`,
            error instanceof Error ? error.message : String(error)
          )
        }
      } else {
        console.log(`✓ 用户 ${nickname} 已存在 (ID: ${existingUser.id})`)
      }
    }
    console.log('========================================')
    console.log('测试用户创建完成')
    console.log('========================================')
    console.log('Testing login with first test user...')
    try {
      const loginRequest = {
        mobile: '13800138000',
        password: '123456',
        platform: 'desktop'
      }
      const loginResult = await authService.login(loginRequest)
      console.log('Login test successful:', loginResult.user.nickname)
    } catch (loginError) {
      console.error(
        'Login test failed:',
        loginError instanceof Error ? loginError.message : String(loginError)
      )
    }
    console.log('\n可用的登录账号:')
    for (const userConfig of testUsers) {
      console.log(`  ${userConfig.nickname}: ${userConfig.mobile} / 密码: ${userConfig.password}`)
    }
    console.log('========================================')
  } catch (error) {
    console.error(
      'Failed to create test users:',
      error instanceof Error ? error.message : String(error)
    )
  }
}
