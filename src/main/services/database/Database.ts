import Database from 'better-sqlite3'
import { join } from 'path'
import { readFileSync, existsSync } from 'fs'
import { config } from '../../config'

export class DatabaseManager {
  private db: Database.Database | null = null
  private static instance: DatabaseManager

  private constructor() {}

  public static getInstance(): DatabaseManager {
    if (!DatabaseManager.instance) {
      DatabaseManager.instance = new DatabaseManager()
    }
    return DatabaseManager.instance
  }

  public async initialize(): Promise<void> {
    if (this.db) {
      return
    }

    try {
      // 创建数据库连接
      this.db = new Database(config.database.path)
      
      // 设置WAL模式以提高并发性能
      this.db.pragma('journal_mode = WAL')
      
      // 启用外键约束
      this.db.pragma('foreign_keys = ON')
      
      // 执行数据库架构
      await this.executeSchema()
      
      console.log('Database initialized successfully')
    } catch (error) {
      console.error('Failed to initialize database:', error)
      throw error
    }
  }

  private async executeSchema(): Promise<void> {
    try {
      // 在开发环境和生产环境中使用不同的路径
      let schemaPath: string
      if (process.env.NODE_ENV === 'development') {
        schemaPath = join(__dirname, '../../../src/main/services/database/schema.sql')
      } else {
        schemaPath = join(__dirname, 'schema.sql')
      }
      
      // 如果文件不存在，尝试其他路径
      if (!existsSync(schemaPath)) {
        const alternativePaths = [
          join(process.cwd(), 'src/main/services/database/schema.sql'),
          join(process.cwd(), 'out/main/schema.sql'),
          join(__dirname, '../../../src/main/services/database/schema.sql'),
          join(__dirname, 'schema.sql')
        ]
        
        for (const path of alternativePaths) {
          if (existsSync(path)) {
            schemaPath = path
            break
          }
        }
      }
      
      if (!existsSync(schemaPath)) {
        throw new Error(`Schema file not found. Tried paths: ${schemaPath}`)
      }
      
      const schema = readFileSync(schemaPath, 'utf-8')
      
      // 直接执行整个 schema，让 SQLite 处理语句分割
      this.db!.exec(schema)
      
      console.log('Database schema executed successfully')
    } catch (error) {
      console.error('Failed to execute database schema:', error)
      throw error
    }
  }

  public getDatabase(): Database.Database {
    if (!this.db) {
      throw new Error('Database not initialized')
    }
    return this.db
  }

  public async close(): Promise<void> {
    if (this.db) {
      this.db.close()
      this.db = null
      console.log('Database connection closed')
    }
  }

  // 事务支持
  public transaction<T>(fn: (db: Database.Database) => T): T {
    if (!this.db) {
      throw new Error('Database not initialized')
    }
    
    const transaction = this.db.transaction(fn)
    return transaction(this.db)
  }

  // 准备语句缓存
  private preparedStatements = new Map<string, Database.Statement>()

  public prepare(sql: string): Database.Statement {
    if (!this.db) {
      throw new Error('Database not initialized')
    }

    if (!this.preparedStatements.has(sql)) {
      this.preparedStatements.set(sql, this.db.prepare(sql))
    }

    return this.preparedStatements.get(sql)!
  }

  // 清理准备语句
  public clearPreparedStatements(): void {
    // better-sqlite3的Statement没有finalize方法，直接清理即可
    this.preparedStatements.clear()
  }

  // 数据库备份
  public async backup(backupPath: string): Promise<void> {
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
  public async optimize(): Promise<void> {
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
  public getStats(): any {
    if (!this.db) {
      throw new Error('Database not initialized')
    }

    try {
      const pageCount = this.db.pragma('page_count', { simple: true }) as number
      const pageSize = this.db.pragma('page_size', { simple: true }) as number
      const freePages = this.db.pragma('freelist_count', { simple: true }) as number
      
      return {
        totalPages: pageCount,
        pageSize: pageSize,
        freePages: freePages,
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

// 导出单例实例
export const databaseManager = DatabaseManager.getInstance()