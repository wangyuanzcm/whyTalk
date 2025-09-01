import { randomBytes, pbkdf2Sync } from 'crypto'
import { databaseManager } from '../database/Database'

/**
 * 恢复码服务类
 * 负责生成、验证和管理用户的恢复码
 */
export class RecoveryCodeService {
  private readonly RECOVERY_CODE_LENGTH = 24 // 恢复码长度
  private readonly HASH_ITERATIONS = 10000 // 哈希迭代次数

  /**
   * 生成恢复码
   * @returns 生成的恢复码字符串
   */
  public generateRecoveryCode(): string {
    // 生成随机字节并转换为可读的恢复码
    const bytes = randomBytes(this.RECOVERY_CODE_LENGTH)
    const code = bytes.toString('hex').toUpperCase()
    
    // 格式化为更易读的格式：XXXX-XXXX-XXXX-XXXX-XXXX-XXXX
    return code.match(/.{1,4}/g)?.join('-') || code
  }

  /**
   * 生成恢复码的哈希值
   * @param recoveryCode 原始恢复码
   * @param salt 盐值
   * @returns 恢复码的哈希值
   */
  public hashRecoveryCode(recoveryCode: string, salt: string): string {
    // 移除恢复码中的连字符，统一格式
    const cleanCode = recoveryCode.replace(/-/g, '').toUpperCase()
    return pbkdf2Sync(cleanCode, salt, this.HASH_ITERATIONS, 64, 'sha512').toString('hex')
  }

  /**
   * 生成盐值
   * @returns 随机生成的盐值
   */
  public generateSalt(): string {
    return randomBytes(32).toString('hex')
  }

  /**
   * 验证恢复码
   * @param inputCode 用户输入的恢复码
   * @param storedHash 存储的恢复码哈希值
   * @param salt 盐值
   * @returns 验证是否成功
   */
  public verifyRecoveryCode(inputCode: string, storedHash: string, salt: string): boolean {
    try {
      const inputHash = this.hashRecoveryCode(inputCode, salt)
      return inputHash === storedHash
    } catch (error) {
      console.error('Error verifying recovery code:', error)
      return false
    }
  }

  /**
   * 为用户生成新的恢复码
   * @param userId 用户ID
   * @returns 生成的恢复码（明文，仅此一次返回）
   */
  public async generateUserRecoveryCode(userId: number): Promise<string> {
    const db = databaseManager.getDatabase()
    
    try {
      // 生成新的恢复码和盐值
      const recoveryCode = this.generateRecoveryCode()
      const salt = this.generateSalt()
      const hash = this.hashRecoveryCode(recoveryCode, salt)

      // 更新用户的恢复码信息
      const stmt = db.prepare(`
        UPDATE users 
        SET recovery_code = ?, recovery_code_hash = ?, recovery_salt = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `)
      stmt.run(recoveryCode, hash, salt, userId)

      console.log('Recovery code generated for user:', userId)
      return recoveryCode
    } catch (error) {
      console.error('Failed to generate recovery code:', error)
      throw error instanceof Error ? error : new Error(String(error))
    }
  }

  /**
   * 验证用户的恢复码
   * @param username 用户名
   * @param inputCode 用户输入的恢复码
   * @returns 用户信息（如果验证成功）
   */
  public async verifyUserRecoveryCode(username: string, inputCode: string): Promise<any> {
    const db = databaseManager.getDatabase()
    
    try {
      // 查找用户
      const stmt = db.prepare(`
        SELECT id, username, nickname, recovery_code_hash, recovery_salt 
        FROM users 
        WHERE username = ? AND status = 1
      `)
      const user = stmt.get(username) as any

      if (!user) {
        throw new Error('用户不存在或已被禁用')
      }

      // 验证恢复码
      const isValid = this.verifyRecoveryCode(inputCode, user.recovery_code_hash, user.recovery_salt)
      if (!isValid) {
        throw new Error('恢复码错误')
      }

      return user
    } catch (error) {
      console.error('Failed to verify recovery code:', error)
      throw error instanceof Error ? error : new Error(String(error))
    }
  }

  /**
   * 重置用户密码（使用恢复码）
   * @param username 用户名
   * @param recoveryCode 恢复码
   * @param newPassword 新密码
   * @param authService 认证服务实例（用于密码哈希）
   */
  public async resetPasswordWithRecoveryCode(
    username: string, 
    recoveryCode: string, 
    newPassword: string,
    authService: any
  ): Promise<void> {
    const db = databaseManager.getDatabase()
    
    try {
      // 验证恢复码
      const user = await this.verifyUserRecoveryCode(username, recoveryCode)
      
      // 生成新的密码哈希
      const salt = authService.generateSalt()
      const passwordHash = authService.hashPassword(newPassword, salt)

      // 更新密码
      const stmt = db.prepare(`
        UPDATE users 
        SET password_hash = ?, salt = ?, updated_at = CURRENT_TIMESTAMP 
        WHERE id = ?
      `)
      stmt.run(passwordHash, salt, user.id)

      // 删除所有会话（强制重新登录）
      const sessionStmt = db.prepare('DELETE FROM user_sessions WHERE user_id = ?')
      sessionStmt.run(user.id)

      console.log('Password reset successfully with recovery code:', username)
    } catch (error) {
      console.error('Failed to reset password with recovery code:', error)
      throw error instanceof Error ? error : new Error(String(error))
    }
  }
}

export const recoveryCodeService = new RecoveryCodeService()