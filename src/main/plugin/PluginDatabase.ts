import { app } from 'electron'
import { join } from 'path'
import Database from 'better-sqlite3'

export interface PluginConfigRecord {
  id: string
  pluginId: string
  config: string // JSON字符串
  enabled: boolean
  installedAt: string
  updatedAt: string
}

export class PluginDatabase {
  private db: Database.Database
  private dbPath: string

  constructor() {
    const userDataPath = app.getPath('userData')
    this.dbPath = join(userDataPath, 'plugins.db')
    this.db = new Database(this.dbPath)
    this.initializeDatabase()
  }

  private initializeDatabase() {
    // 创建插件配置表
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

    // 创建插件市场表
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

    // 创建用户插件安装记录表
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
  public savePluginConfig(pluginId: string, config: any, enabled: boolean = true): void {
    const stmt = this.db.prepare(`
      INSERT OR REPLACE INTO plugin_configs (id, plugin_id, config, enabled, updated_at)
      VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
    `)

    stmt.run(pluginId, pluginId, JSON.stringify(config), enabled ? 1 : 0)
  }

  /**
   * 获取插件配置
   */
  public getPluginConfig(pluginId: string): PluginConfigRecord | null {
    const stmt = this.db.prepare(`
      SELECT * FROM plugin_configs WHERE plugin_id = ?
    `)

    const row = stmt.get(pluginId) as any
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
  public getAllPluginConfigs(): PluginConfigRecord[] {
    const stmt = this.db.prepare(`
      SELECT * FROM plugin_configs ORDER BY updated_at DESC
    `)

    const rows = stmt.all() as any[]
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
  public deletePluginConfig(pluginId: string): void {
    const stmt = this.db.prepare(`
      DELETE FROM plugin_configs WHERE plugin_id = ?
    `)

    stmt.run(pluginId)
  }

  /**
   * 启用/禁用插件
   */
  public setPluginEnabled(pluginId: string, enabled: boolean): void {
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
  public recordPluginInstallation(
    pluginId: string,
    version: string,
    source: string,
    sourceUrl?: string
  ): void {
    const stmt = this.db.prepare(`
      INSERT OR REPLACE INTO user_plugins (id, plugin_id, version, source, source_url)
      VALUES (?, ?, ?, ?, ?)
    `)

    stmt.run(pluginId, pluginId, version, source, sourceUrl || null)
  }

  /**
   * 记录插件使用
   */
  public recordPluginUsage(pluginId: string): void {
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
  public getPluginStats(pluginId: string) {
    const stmt = this.db.prepare(`
      SELECT * FROM user_plugins WHERE plugin_id = ?
    `)

    return stmt.get(pluginId)
  }

  /**
   * 获取所有插件统计
   */
  public getAllPluginStats() {
    const stmt = this.db.prepare(`
      SELECT * FROM user_plugins ORDER BY usage_count DESC, last_used DESC
    `)

    return stmt.all()
  }

  /**
   * 关闭数据库连接
   */
  public close(): void {
    this.db.close()
  }

  /**
   * 获取数据库实例（用于高级操作）
   */
  public getDatabase(): Database.Database {
    return this.db
  }
}

// 单例模式
let pluginDatabase: PluginDatabase | null = null

export function getPluginDatabase(): PluginDatabase {
  if (!pluginDatabase) {
    // 检查是否强制使用模拟数据库
    const useMockDb = process.env.USE_MOCK_DB === 'true' || process.env.NODE_ENV === 'development'

    if (useMockDb) {
      console.log('Using mock database for plugin management (set USE_MOCK_DB=false to use SQLite)')
      pluginDatabase = new MockPluginDatabase() as any
    } else {
      try {
        console.log('Attempting to initialize SQLite database...')
        pluginDatabase = new PluginDatabase()
        console.log('SQLite database initialized successfully')
      } catch (error) {
        console.warn(
          'Failed to initialize SQLite database, falling back to mock database:',
          (error as Error).message
        )
        pluginDatabase = new MockPluginDatabase() as any
      }
    }
  }
  return pluginDatabase!
}

export function closePluginDatabase(): void {
  if (pluginDatabase) {
    pluginDatabase.close()
    pluginDatabase = null
  }
}

// 模拟数据库类，用于在SQLite不可用时提供基本功能
class MockPluginDatabase {
  private configs: Map<string, PluginConfigRecord> = new Map()
  private installations: Map<string, any> = new Map()
  private stats: Map<string, any> = new Map()

  public savePluginConfig(pluginId: string, config: any, enabled: boolean = true): void {
    const record: PluginConfigRecord = {
      id: pluginId,
      pluginId,
      config: JSON.stringify(config),
      enabled,
      installedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    this.configs.set(pluginId, record)
  }

  public getPluginConfig(pluginId: string): PluginConfigRecord | null {
    return this.configs.get(pluginId) || null
  }

  public getAllPluginConfigs(): PluginConfigRecord[] {
    return Array.from(this.configs.values())
  }

  public deletePluginConfig(pluginId: string): void {
    this.configs.delete(pluginId)
  }

  public setPluginEnabled(pluginId: string, enabled: boolean): void {
    const config = this.configs.get(pluginId)
    if (config) {
      config.enabled = enabled
      config.updatedAt = new Date().toISOString()
    }
  }

  public recordPluginInstallation(
    pluginId: string,
    version: string,
    source: string,
    sourceUrl?: string
  ): void {
    this.installations.set(pluginId, {
      pluginId,
      version,
      source,
      sourceUrl,
      installedAt: new Date().toISOString()
    })
  }

  public recordPluginUsage(pluginId: string): void {
    const stat = this.stats.get(pluginId) || { pluginId, usageCount: 0 }
    stat.usageCount++
    stat.lastUsed = new Date().toISOString()
    this.stats.set(pluginId, stat)
  }

  public getPluginStats(pluginId: string) {
    return this.stats.get(pluginId) || null
  }

  public getAllPluginStats() {
    return Array.from(this.stats.values())
  }

  public close(): void {
    // 模拟数据库不需要关闭操作
  }

  public getDatabase(): any {
    return null
  }
}
