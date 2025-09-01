/**
 * 数据库迁移脚本
 * 用于将现有数据库从旧结构迁移到新结构
 * 主要变更：添加username字段，将mobile字段改为可选
 */

import * as Database from 'better-sqlite3'
import { join } from 'path'
import { existsSync, mkdirSync } from 'fs'
import { homedir } from 'os'

class DatabaseMigration {
  private db: Database.Database

  constructor() {
    // 连接到现有数据库
    const userDataPath = process.env.NODE_ENV === 'development' 
      ? join(process.cwd(), 'userData')
      : join(homedir(), 'AppData', 'Roaming', 'whytalk')
    const dbPath = join(userDataPath, 'whytalk.db')
    
    // 确保目录存在
    if (!existsSync(userDataPath)) {
      mkdirSync(userDataPath, { recursive: true })
      console.log(`Created directory: ${userDataPath}`)
    }
    
    console.log(`Connecting to database at: ${dbPath}`)
    this.db = new Database(dbPath)
    this.db.pragma('foreign_keys = OFF') // 临时关闭外键约束
  }

  /**
   * 检查是否需要迁移
   */
  private needsMigration(): boolean {
    try {
      // 检查users表是否存在username字段
      const tableInfo = this.db.prepare("PRAGMA table_info(users)").all() as any[]
      const hasUsername = tableInfo.some(column => column.name === 'username')
      const hasMobile = tableInfo.some(column => column.name === 'mobile')
      
      console.log('Current table structure:')
      tableInfo.forEach(column => {
        console.log(`  ${column.name}: ${column.type} (nullable: ${!column.notnull})`)
      })
      
      // 如果没有username字段或mobile字段仍然是NOT NULL，则需要迁移
      if (!hasUsername) {
        console.log('Migration needed: username field missing')
        return true
      }
      
      const mobileColumn = tableInfo.find(column => column.name === 'mobile')
      if (mobileColumn && mobileColumn.notnull === 1) {
        console.log('Migration needed: mobile field is still NOT NULL')
        return true
      }
      
      console.log('Database structure is up to date')
      return false
    } catch (error) {
      console.log('Users table does not exist, migration needed')
      return true
    }
  }

  /**
   * 执行数据库迁移
   */
  public async migrate(): Promise<void> {
    console.log('Starting database migration...')
    
    if (!this.needsMigration()) {
      console.log('No migration needed')
      return
    }

    try {
      // 开始事务
      const transaction = this.db.transaction(() => {
        // 1. 检查users表是否存在
        const tablesResult = this.db.prepare(
          "SELECT name FROM sqlite_master WHERE type='table' AND name='users'"
        ).get()

        if (!tablesResult) {
          console.log('Users table does not exist, creating new structure...')
          this.createNewStructure()
          return
        }

        console.log('Users table exists, migrating structure...')
        
        // 2. 备份现有数据
        console.log('Backing up existing users...')
        const existingUsers = this.db.prepare('SELECT * FROM users').all()
        console.log(`Found ${existingUsers.length} existing users`)

        // 3. 重命名现有表
        this.db.exec('ALTER TABLE users RENAME TO users_backup')
        console.log('Renamed users table to users_backup')

        // 4. 创建新的users表结构
        this.db.exec(`
          CREATE TABLE users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username VARCHAR(50) UNIQUE NOT NULL,
            mobile VARCHAR(20) DEFAULT '',
            nickname VARCHAR(50) NOT NULL,
            avatar TEXT DEFAULT '',
            motto TEXT DEFAULT '',
            email VARCHAR(100) DEFAULT '',
            gender INTEGER DEFAULT 0,
            birthday DATE,
            password_hash TEXT NOT NULL,
            salt TEXT NOT NULL,
            recovery_code TEXT NOT NULL,
            recovery_code_hash TEXT NOT NULL,
            recovery_salt TEXT NOT NULL,
            status INTEGER DEFAULT 1,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
          )
        `)
        console.log('Created new users table structure')

        // 5. 迁移数据
        console.log('Migrating user data...')
        const insertUser = this.db.prepare(`
          INSERT INTO users (
            id, username, mobile, nickname, avatar, motto, email, gender, birthday,
            password_hash, salt, recovery_code, recovery_code_hash, recovery_salt,
            status, created_at, updated_at
          ) VALUES (
            ?, ?, ?, ?, ?, ?, ?, ?, ?,
            ?, ?, ?, ?, ?,
            ?, ?, ?
          )
        `)

        for (const user of existingUsers as any[]) {
          // 生成默认的恢复码相关字段（如果不存在）
          const recoveryCode = user.recovery_code || this.generateRecoveryCode()
          const recoveryCodeHash = user.recovery_code_hash || this.hashRecoveryCode(recoveryCode)
          const recoverySalt = user.recovery_salt || this.generateSalt()
          
          // 使用mobile作为username（如果username不存在）
          const username = user.username || user.mobile || `user_${user.id}`
          
          insertUser.run(
            user.id,
            username,
            user.mobile || '',
            user.nickname,
            user.avatar || '',
            user.motto || '',
            user.email || '',
            user.gender || 0,
            user.birthday,
            user.password_hash,
            user.salt,
            recoveryCode,
            recoveryCodeHash,
            recoverySalt,
            user.status || 1,
            user.created_at,
            user.updated_at
          )
        }
        
        console.log(`Migrated ${existingUsers.length} users successfully`)

        // 6. 删除备份表
        this.db.exec('DROP TABLE users_backup')
        console.log('Removed backup table')
      })

      // 执行事务
      transaction()
      
      console.log('Database migration completed successfully')
    } catch (error) {
      console.error('Migration failed:', error)
      throw error
    } finally {
      this.db.pragma('foreign_keys = ON') // 重新启用外键约束
    }
  }

  /**
   * 创建全新的数据库结构
   */
  private createNewStructure(): void {
    console.log('Creating new database structure...')
    
    // 读取并执行schema.sql
    const schemaPath = join(__dirname, '../src/main/services/database/schema.sql')
    if (!existsSync(schemaPath)) {
      throw new Error(`Schema file not found at: ${schemaPath}`)
    }
    
    const fs = require('fs')
    const schema = fs.readFileSync(schemaPath, 'utf-8')
    this.db.exec(schema)
    
    console.log('New database structure created')
  }

  /**
   * 生成恢复码
   */
  private generateRecoveryCode(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let result = ''
    for (let i = 0; i < 12; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  }

  /**
   * 生成盐值
   */
  private generateSalt(): string {
    const crypto = require('crypto')
    return crypto.randomBytes(16).toString('hex')
  }

  /**
   * 哈希恢复码
   */
  private hashRecoveryCode(recoveryCode: string): string {
    const crypto = require('crypto')
    return crypto.createHash('sha256').update(recoveryCode).digest('hex')
  }

  /**
   * 关闭数据库连接
   */
  public close(): void {
    this.db.close()
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  const migration = new DatabaseMigration()
  
  migration.migrate()
    .then(() => {
      console.log('Migration completed successfully')
      migration.close()
      process.exit(0)
    })
    .catch((error) => {
      console.error('Migration failed:', error)
      migration.close()
      process.exit(1)
    })
}

export { DatabaseMigration }