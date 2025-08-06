import Database from 'better-sqlite3'
import { DatabaseManager } from '../database/Database'
import type { PluginPermission } from './PluginPermissionManager.d'

export class PluginPermissionManager {
  private static instance: PluginPermissionManager
  private db: Database.Database | null = null
  private permissionCache: Map<string, Set<string>> = new Map()
  private cacheExpiry: Map<string, number> = new Map()
  private readonly CACHE_TTL = 300000 // 5分钟缓存
  private isInitialized = false

  private constructor() {
    // 延迟初始化数据库连接
  }

  static getInstance(): PluginPermissionManager {
    if (!PluginPermissionManager.instance) {
      PluginPermissionManager.instance = new PluginPermissionManager()
    }
    return PluginPermissionManager.instance
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) {
      return
    }

    try {
      this.db = DatabaseManager.getInstance().getDatabase()
      this.loadPermissions()
      this.initializeDefaultPermissions()
      this.isInitialized = true
    } catch (error) {
      console.error('Failed to initialize PluginPermissionManager:', error)
      throw error
    }
  }

  /**
   * 加载所有插件权限到缓存
   */
  private loadPermissions(): void {
    if (!this.db) {
      console.error('Database not initialized')
      return
    }

    try {
      const stmt = this.db.prepare(`
        SELECT plugin_id, permission FROM plugin_permissions WHERE granted = 1
      `)

      const permissions = stmt.all() as Array<{ plugin_id: string; permission: string }>

      for (const perm of permissions) {
        if (!this.permissionCache.has(perm.plugin_id)) {
          this.permissionCache.set(perm.plugin_id, new Set())
        }
        this.permissionCache.get(perm.plugin_id)!.add(perm.permission)
      }

      console.log('插件权限加载完成')
    } catch (error) {
      console.error('加载插件权限失败:', error)
    }
  }

  /**
   * 检查插件是否有指定权限
   */
  checkPermission(pluginId: string, permission: string): boolean {
    try {
      // 检查缓存是否过期
      const cacheKey = `${pluginId}:${permission}`
      const expiry = this.cacheExpiry.get(cacheKey)

      if (expiry && Date.now() > expiry) {
        this.refreshPluginPermissions(pluginId)
      }

      const pluginPermissions = this.permissionCache.get(pluginId)
      return pluginPermissions ? pluginPermissions.has(permission) : false
    } catch (error) {
      console.error('检查权限失败:', error)
      return false
    }
  }

  /**
   * 设置插件权限
   */
  setPermissions(pluginId: string, permissions: string[], grantedBy: string = 'system'): boolean {
    if (!this.db) {
      console.error('Database not initialized')
      return false
    }

    try {
      const transaction = this.db.transaction(() => {
        // 先删除现有权限
        const deleteStmt = this.db!.prepare(`
          DELETE FROM plugin_permissions WHERE plugin_id = ?
        `)
        deleteStmt.run(pluginId)

        // 插入新权限
        const insertStmt = this.db!.prepare(`
          INSERT INTO plugin_permissions (plugin_id, permission, granted, granted_by)
          VALUES (?, ?, 1, ?)
        `)

        for (const permission of permissions) {
          insertStmt.run(pluginId, permission, grantedBy)
        }
      })

      transaction()

      // 更新缓存
      this.permissionCache.set(pluginId, new Set(permissions))

      return true
    } catch (error) {
      console.error('设置插件权限失败:', error)
      return false
    }
  }

  /**
   * 添加单个权限
   */
  grantPermission(pluginId: string, permission: string, grantedBy: string = 'system'): boolean {
    if (!this.db) {
      console.error('Database not initialized')
      return false
    }

    try {
      const stmt = this.db.prepare(`
        INSERT OR REPLACE INTO plugin_permissions (plugin_id, permission, granted, granted_by)
        VALUES (?, ?, 1, ?)
      `)

      stmt.run(pluginId, permission, grantedBy)

      // 更新缓存
      if (!this.permissionCache.has(pluginId)) {
        this.permissionCache.set(pluginId, new Set())
      }
      this.permissionCache.get(pluginId)!.add(permission)

      return true
    } catch (error) {
      console.error('授予权限失败:', error)
      return false
    }
  }

  /**
   * 撤销单个权限
   */
  revokePermission(pluginId: string, permission: string): boolean {
    if (!this.db) {
      console.error('Database not initialized')
      return false
    }

    try {
      const stmt = this.db.prepare(`
        UPDATE plugin_permissions SET granted = 0 WHERE plugin_id = ? AND permission = ?
      `)

      const result = stmt.run(pluginId, permission)

      // 更新缓存
      const pluginPermissions = this.permissionCache.get(pluginId)
      if (pluginPermissions) {
        pluginPermissions.delete(permission)
      }

      return result.changes > 0
    } catch (error) {
      console.error('撤销权限失败:', error)
      return false
    }
  }

  /**
   * 请求权限
   */
  async requestPermission(
    pluginId: string,
    permission: string,
    grantedBy: string = 'user'
  ): Promise<boolean> {
    try {
      // 检查权限是否已存在
      if (this.permissionExists(pluginId, permission)) {
        // 如果已存在但未授权，则授权
        if (!this.checkPermission(pluginId, permission)) {
          return this.grantPermission(pluginId, permission, grantedBy)
        }
        return true
      }

      // 创建新权限并授权
      return this.grantPermission(pluginId, permission, grantedBy)
    } catch (error) {
      console.error('请求权限失败:', error)
      return false
    }
  }

  /**
   * 获取插件的所有权限
   */
  getPluginPermissions(pluginId: string): string[] {
    if (!this.db) {
      console.error('Database not initialized')
      return []
    }

    try {
      const stmt = this.db.prepare(`
        SELECT permission FROM plugin_permissions 
        WHERE plugin_id = ? AND granted = 1
      `)

      const results = stmt.all(pluginId) as Array<{ permission: string }>
      return results.map((r) => r.permission)
    } catch (error) {
      console.error('获取插件权限失败:', error)
      return []
    }
  }

  /**
   * 获取所有插件权限
   */
  getAllPermissions(): PluginPermission[] {
    if (!this.db) {
      console.error('Database not initialized')
      return []
    }

    try {
      const stmt = this.db.prepare(`
        SELECT id, plugin_id, permission, granted, granted_at, granted_by
        FROM plugin_permissions
        ORDER BY plugin_id, permission
      `)

      return stmt.all() as PluginPermission[]
    } catch (error) {
      console.error('获取所有权限失败:', error)
      return []
    }
  }

  /**
   * 验证数据访问权限
   */
  validateDataAccess(pluginId: string, operation: string, resourceType: string): boolean {
    const requiredPermission = `${operation}:${resourceType}`

    // 检查具体权限
    if (this.checkPermission(pluginId, requiredPermission)) {
      return true
    }

    // 检查通配符权限
    const wildcardPermission = `${operation}:*`
    if (this.checkPermission(pluginId, wildcardPermission)) {
      return true
    }

    // 检查管理员权限
    if (this.checkPermission(pluginId, 'admin:*')) {
      return true
    }

    return false
  }

  /**
   * 验证API调用权限
   */
  validateAPIAccess(pluginId: string, apiName: string): boolean {
    const requiredPermission = `api:${apiName}`

    // 检查具体API权限
    if (this.checkPermission(pluginId, requiredPermission)) {
      return true
    }

    // 检查API通配符权限
    if (this.checkPermission(pluginId, 'api:*')) {
      return true
    }

    // 检查管理员权限
    if (this.checkPermission(pluginId, 'admin:*')) {
      return true
    }

    return false
  }

  /**
   * 刷新指定插件的权限缓存
   */
  private refreshPluginPermissions(pluginId: string): void {
    if (!this.db) {
      console.error('Database not initialized')
      return
    }

    try {
      const stmt = this.db.prepare(`
        SELECT permission FROM plugin_permissions 
        WHERE plugin_id = ? AND granted = 1
      `)

      const permissions = stmt.all(pluginId) as Array<{ permission: string }>
      const permissionSet = new Set(permissions.map((p) => p.permission))

      this.permissionCache.set(pluginId, permissionSet)

      // 设置缓存过期时间
      const expiry = Date.now() + this.CACHE_TTL
      for (const permission of permissionSet) {
        this.cacheExpiry.set(`${pluginId}:${permission}`, expiry)
      }
    } catch (error) {
      console.error('刷新插件权限缓存失败:', error)
    }
  }

  /**
   * 清除权限缓存
   */
  clearCache(): void {
    this.permissionCache.clear()
    this.cacheExpiry.clear()
    this.loadPermissions()
  }

  /**
   * 初始化默认权限
   */
  initializeDefaultPermissions(): void {
    try {
      const defaultPermissions = [
        // 通讯录插件权限
        {
          pluginId: 'contact-plugin',
          permissions: [
            'read:contacts',
            'write:contacts',
            'read:contact_groups',
            'write:contact_groups'
          ]
        },
        // 消息插件权限
        {
          pluginId: 'message-plugin',
          permissions: [
            'read:messages',
            'write:messages',
            'read:conversations',
            'write:conversations',
            'read:contacts',
            'read:files',
            'write:files'
          ]
        }
      ]

      for (const { pluginId, permissions } of defaultPermissions) {
        this.setPermissions(pluginId, permissions, 'system')
      }

      console.log('默认权限初始化完成')
    } catch (error) {
      console.error('初始化默认权限失败:', error)
    }
  }

  /**
   * 检查权限是否存在
   */
  permissionExists(pluginId: string, permission: string): boolean {
    if (!this.db) {
      console.error('Database not initialized')
      return false
    }

    try {
      const stmt = this.db.prepare(`
        SELECT COUNT(*) as count FROM plugin_permissions 
        WHERE plugin_id = ? AND permission = ?
      `)

      const result = stmt.get(pluginId, permission) as { count: number }
      return result.count > 0
    } catch (error) {
      console.error('检查权限是否存在失败:', error)
      return false
    }
  }

  /**
   * 获取权限统计信息
   */
  getPermissionStats(): {
    totalPlugins: number
    totalPermissions: number
    grantedPermissions: number
  } {
    if (!this.db) {
      console.error('Database not initialized')
      return { totalPlugins: 0, totalPermissions: 0, grantedPermissions: 0 }
    }

    try {
      const pluginCountStmt = this.db.prepare(`
        SELECT COUNT(DISTINCT plugin_id) as count FROM plugin_permissions
      `)
      const totalPermissionsStmt = this.db.prepare(`
        SELECT COUNT(*) as count FROM plugin_permissions
      `)
      const grantedPermissionsStmt = this.db.prepare(`
        SELECT COUNT(*) as count FROM plugin_permissions WHERE granted = 1
      `)

      const totalPlugins = (pluginCountStmt.get() as { count: number }).count
      const totalPermissions = (totalPermissionsStmt.get() as { count: number }).count
      const grantedPermissions = (grantedPermissionsStmt.get() as { count: number }).count

      return { totalPlugins, totalPermissions, grantedPermissions }
    } catch (error) {
      console.error('获取权限统计失败:', error)
      return { totalPlugins: 0, totalPermissions: 0, grantedPermissions: 0 }
    }
  }

  /**
   * 清理资源
   */
  async cleanup(): Promise<void> {
    try {
      this.clearCache()
      this.db = null
      this.isInitialized = false
      console.log('PluginPermissionManager cleanup completed')
    } catch (error) {
      console.error('Error during PluginPermissionManager cleanup:', error)
      throw error
    }
  }
}
