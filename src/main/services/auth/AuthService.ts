import { databaseManager } from '../database/Database'
import { randomBytes, pbkdf2Sync } from 'crypto'
import { sign, verify } from 'jsonwebtoken'
import { config } from '../../config'

export interface User {
  id: number
  mobile: string
  nickname: string
  avatar: string
  motto: string
  email: string
  gender: number
  birthday: string
  status: number
  created_at: string
  updated_at: string
}

export interface LoginRequest {
  mobile: string
  password: string
  platform: string
}

export interface LoginResponse {
  access_token: string
  expires_in: number
  type: string
  user: User
}

export interface RegisterRequest {
  nickname: string
  mobile: string
  password: string
  platform: string
  sms_code: string
}

export class AuthService {
  private readonly JWT_SECRET = config.auth.jwtSecret
  private readonly JWT_EXPIRES_IN = config.auth.jwtExpiresIn
  private readonly TOKEN_EXPIRES_IN = 7 * 24 * 60 * 60 // 7天，以秒为单位


  // 生成密码哈希
  public hashPassword(password: string, salt: string): string {
    return pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
  }

  // 生成盐值
  public generateSalt(): string {
    return randomBytes(32).toString('hex')
  }

  // 生成 JWT Token
  private generateToken(userId: number, mobile: string): string {
    const payload = {
      userId,
      mobile,
      iat: Math.floor(Date.now() / 1000)
    }
    const secret = this.JWT_SECRET || 'default-secret-key'
    const expiresIn = this.JWT_EXPIRES_IN || '7d'
    return sign(payload, secret, { expiresIn } as any)
  }

  // 验证 JWT Token
  public verifyToken(token: string): any {
    try {
      const secret = this.JWT_SECRET || 'default-secret-key'
      return verify(token, secret)
    } catch (error) {
      throw new Error('Invalid token')
    }
  }

  // 用户登录
  public async login(request: LoginRequest): Promise<LoginResponse> {
    const db = databaseManager.getDatabase()
    
    try {
      // 查找用户
      const stmt = db.prepare('SELECT * FROM users WHERE mobile = ? AND status = 1')
      const user = stmt.get(request.mobile) as any
      
      if (!user) {
        throw new Error('用户不存在或已被禁用')
      }

      // 验证密码
      const hashedPassword = this.hashPassword(request.password, user.salt)
      if (hashedPassword !== user.password_hash) {
        throw new Error('密码错误')
      }

      // 生成访问令牌
      const accessToken = this.generateToken(user.id, user.mobile)
      // JWT_EXPIRES_IN 是 '7d'，转换为毫秒数（7天 = 7 * 24 * 60 * 60 * 1000）
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

      // 保存会话信息
      const sessionStmt = db.prepare(`
        INSERT OR REPLACE INTO user_sessions 
        (user_id, access_token, expires_at, platform, is_active, created_at, updated_at)
        VALUES (?, ?, ?, ?, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      `)
      sessionStmt.run(user.id, accessToken, expiresAt.toISOString(), request.platform)

      // 更新在线状态
      const onlineStmt = db.prepare(`
        INSERT OR REPLACE INTO user_online_status 
        (user_id, status, last_seen, platform)
        VALUES (?, 'online', CURRENT_TIMESTAMP, ?)
      `)
      onlineStmt.run(user.id, request.platform)

      // 返回用户信息（不包含敏感信息）
      const userInfo: User = {
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
        expires_in: 7 * 24 * 60 * 60, // 7天，以秒为单位
        type: 'Bearer',
        user: userInfo
      }
    } catch (error) {
      console.error('Login failed:', error)
      throw error instanceof Error ? error : new Error(String(error))
    }
  }

  // 用户注册
  public async register(request: RegisterRequest): Promise<void> {
    const db = databaseManager.getDatabase()
    
    try {
      // 检查手机号是否已存在
      const existingUser = db.prepare('SELECT id FROM users WHERE mobile = ?').get(request.mobile)
      if (existingUser) {
        throw new Error('手机号已被注册')
      }

      // TODO: 验证短信验证码
      // 这里应该验证 request.sms_code，暂时跳过

      // 生成密码哈希
      const salt = this.generateSalt()
      const passwordHash = this.hashPassword(request.password, salt)

      // 插入新用户
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
  public async logout(token: string): Promise<void> {
    const db = databaseManager.getDatabase()
    
    try {
      // 验证令牌并获取用户信息
      const payload = this.verifyToken(token)
      
      // 删除会话
      const sessionStmt = db.prepare('DELETE FROM user_sessions WHERE access_token = ?')
      sessionStmt.run(token)

      // 更新在线状态
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
  public async forgetPassword(mobile: string, newPassword: string, _smsCode: string): Promise<void> {
    const db = databaseManager.getDatabase()
    
    try {
      // TODO: 验证短信验证码
      // 这里应该验证 _smsCode，暂时跳过

      // 查找用户
      const user = db.prepare('SELECT id FROM users WHERE mobile = ?').get(mobile) as any
      if (!user) {
        throw new Error('用户不存在')
      }

      // 生成新的密码哈希
      const salt = this.generateSalt()
      const passwordHash = this.hashPassword(newPassword, salt)

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
      
      console.log('Password reset successfully:', mobile)
    } catch (error) {
      console.error('Password reset failed:', error)
      throw error instanceof Error ? error : new Error(String(error))
    }
  }

  // 验证会话是否有效
  public async validateSession(token: string): Promise<User | null> {
    if (!token) {
      console.warn('validateSession: No token provided')
      return null
    }

    const db = databaseManager.getDatabase()
    
    try {
      // 验证 JWT
      const payload = this.verifyToken(token)
      console.log('Token payload verified:', { userId: payload.userId, mobile: payload.mobile })
      
      // 检查会话是否存在且有效
      const sessionStmt = db.prepare(`
        SELECT s.*, u.* FROM user_sessions s
        JOIN users u ON s.user_id = u.id
        WHERE s.access_token = ? AND s.is_active = 1 AND s.expires_at > CURRENT_TIMESTAMP
      `)
      const session = sessionStmt.get(token) as any
      
      if (!session) {
        console.warn('validateSession: Session not found or expired for token:', token.substring(0, 20) + '...')
        
        // 检查是否存在过期的会话
        const expiredSessionStmt = db.prepare(`
          SELECT expires_at FROM user_sessions 
          WHERE access_token = ?
        `)
        const expiredSession = expiredSessionStmt.get(token) as any
        if (expiredSession) {
          console.warn('validateSession: Found expired session, expires_at:', expiredSession.expires_at)
        }
        
        return null
      }

      console.log('validateSession: Session found for user:', session.mobile)

      // 更新最后活跃时间
      const updateStmt = db.prepare(`
        UPDATE user_sessions 
        SET updated_at = CURRENT_TIMESTAMP 
        WHERE access_token = ?
      `)
      updateStmt.run(token)

      // 返回用户信息
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
        } else if (error.message.includes('invalid token') || error.message.includes('Invalid token')) {
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
  public async refreshToken(oldToken: string): Promise<string> {
    const db = databaseManager.getDatabase()
    
    try {
      const payload = this.verifyToken(oldToken)
      
      // 生成新令牌
      const newToken = this.generateToken(payload.userId, payload.mobile)
      const expiresAt = new Date(Date.now() + this.TOKEN_EXPIRES_IN * 1000)

      // 更新会话
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
  public async cleanupExpiredSessions(): Promise<void> {
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

export const authService = new AuthService()