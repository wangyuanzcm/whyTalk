import { randomBytes } from 'crypto'
import { databaseManager } from '../database/Database'

/**
 * 邮箱验证码服务
 * 负责发送和验证邮箱验证码
 */
export class EmailService {
  private readonly CODE_EXPIRES_IN = 10 * 60 * 1000 // 10分钟，以毫秒为单位
  private isInitialized = false

  /**
   * 初始化邮箱服务
   */
  public async initialize(): Promise<void> {
    if (this.isInitialized) {
      return
    }

    try {
      // 创建邮箱验证码表
      await this.createEmailCodeTable()
      // 清理过期的验证码
      await this.cleanupExpiredCodes()
      this.isInitialized = true
      console.log('EmailService initialized')
    } catch (error) {
      console.error('Failed to initialize EmailService:', error)
      throw error
    }
  }

  /**
   * 创建邮箱验证码表
   */
  private async createEmailCodeTable(): Promise<void> {
    const db = databaseManager.getDatabase()
    
    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS email_verification_codes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email VARCHAR(100) NOT NULL,
        code VARCHAR(10) NOT NULL,
        purpose VARCHAR(50) NOT NULL, -- 'register', 'forget', 'update'
        expires_at DATETIME NOT NULL,
        used INTEGER DEFAULT 0, -- 0: 未使用, 1: 已使用
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `
    
    db.exec(createTableSQL)
    
    // 创建索引
    const createIndexSQL = `
      CREATE INDEX IF NOT EXISTS idx_email_verification_codes_email ON email_verification_codes(email);
      CREATE INDEX IF NOT EXISTS idx_email_verification_codes_expires_at ON email_verification_codes(expires_at);
    `
    
    db.exec(createIndexSQL)
  }

  /**
   * 生成6位数字验证码
   */
  private generateCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString()
  }

  /**
   * 发送邮箱验证码
   * @param email 邮箱地址
   * @param purpose 用途：'register' | 'forget' | 'update'
   */
  public async sendEmailCode(email: string, purpose: string): Promise<void> {
    const db = databaseManager.getDatabase()
    
    try {
      // 检查邮箱格式
      if (!this.isValidEmail(email)) {
        throw new Error('邮箱格式不正确')
      }

      // 检查发送频率限制（1分钟内只能发送一次）
      const recentCode = db.prepare(`
        SELECT id FROM email_verification_codes 
        WHERE email = ? AND created_at > datetime('now', '-1 minute')
        ORDER BY created_at DESC LIMIT 1
      `).get(email)
      
      if (recentCode) {
        throw new Error('发送过于频繁，请稍后再试')
      }

      // 生成验证码
      const code = this.generateCode()
      const expiresAt = new Date(Date.now() + this.CODE_EXPIRES_IN).toISOString()

      // 保存验证码到数据库
      const stmt = db.prepare(`
        INSERT INTO email_verification_codes (email, code, purpose, expires_at)
        VALUES (?, ?, ?, ?)
      `)
      stmt.run(email, code, purpose, expiresAt)

      // 模拟发送邮件（在实际项目中，这里应该调用真实的邮件发送服务）
      console.log(`[模拟邮件发送] 发送验证码到 ${email}: ${code} (用途: ${purpose})`)
      
      // 在开发环境下，将验证码输出到控制台方便测试
      if (process.env.NODE_ENV === 'development') {
        console.log(`\n=== 邮箱验证码 ===`)
        console.log(`邮箱: ${email}`)
        console.log(`验证码: ${code}`)
        console.log(`用途: ${purpose}`)
        console.log(`有效期: 10分钟`)
        console.log(`==================\n`)
      }
      
    } catch (error) {
      console.error('发送邮箱验证码失败:', error)
      throw error instanceof Error ? error : new Error(String(error))
    }
  }

  /**
   * 验证邮箱验证码
   * @param email 邮箱地址
   * @param code 验证码
   * @param purpose 用途
   */
  public async verifyEmailCode(email: string, code: string, purpose: string): Promise<boolean> {
    const db = databaseManager.getDatabase()
    
    try {
      // 查找有效的验证码
      const verificationCode = db.prepare(`
        SELECT id FROM email_verification_codes 
        WHERE email = ? AND code = ? AND purpose = ? 
        AND expires_at > datetime('now') AND used = 0
        ORDER BY created_at DESC LIMIT 1
      `).get(email, code, purpose)
      
      if (!verificationCode) {
        return false
      }

      // 标记验证码为已使用
      const updateStmt = db.prepare(`
        UPDATE email_verification_codes 
        SET used = 1 
        WHERE id = ?
      `)
      updateStmt.run(verificationCode.id)

      return true
    } catch (error) {
      console.error('验证邮箱验证码失败:', error)
      return false
    }
  }

  /**
   * 清理过期的验证码
   */
  public async cleanupExpiredCodes(): Promise<void> {
    const db = databaseManager.getDatabase()
    
    try {
      const stmt = db.prepare(`
        DELETE FROM email_verification_codes 
        WHERE expires_at < datetime('now') OR used = 1
      `)
      const result = stmt.run()
      
      if (result.changes > 0) {
        console.log(`清理了 ${result.changes} 条过期的邮箱验证码记录`)
      }
    } catch (error) {
      console.error('清理过期验证码失败:', error)
    }
  }

  /**
   * 验证邮箱格式
   * @param email 邮箱地址
   */
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  /**
   * 清理服务
   */
  public async cleanup(): Promise<void> {
    await this.cleanupExpiredCodes()
    console.log('EmailService cleanup completed')
  }
}

export const emailService = new EmailService()