import { databaseManager } from '../database/Database'
import { authService } from '../auth/AuthService'
import { EventEmitter } from 'events'

export interface UserUpdateRequest {
  nickname: string
  avatar: string
  motto: string
  gender: number
  birthday: string
}

export interface UserSetting {
  setting_key: string
  setting_value: string
}

export class UserService extends EventEmitter {
  constructor() {
    super()
  }

  // 获取用户详情
  public async getUserDetail(userId: number): Promise<any> {
    const db = databaseManager.getDatabase()
    
    try {
      const stmt = db.prepare(`
        SELECT id, mobile, nickname, avatar, motto, email, gender, birthday, status, created_at, updated_at
        FROM users 
        WHERE id = ? AND status = 1
      `)
      
      const user = stmt.get(userId) as any
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
  public async updateUser(userId: number, data: UserUpdateRequest): Promise<void> {
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
  public async updatePassword(userId: number, oldPassword: string, newPassword: string): Promise<void> {
    const db = databaseManager.getDatabase()
    
    try {
      // 获取用户当前密码信息
      const userStmt = db.prepare('SELECT password_hash, salt FROM users WHERE id = ?')
      const user = userStmt.get(userId) as any
      
      if (!user) {
        throw new Error('用户不存在')
      }
      
      // 验证旧密码
      const oldPasswordHash = authService.hashPassword(oldPassword, user.salt)
      if (oldPasswordHash !== user.password_hash) {
        throw new Error('原密码错误')
      }
      
      // 生成新密码哈希
      const newSalt = authService.generateSalt()
      const newPasswordHash = authService.hashPassword(newPassword, newSalt)
      
      // 更新密码
      const updateStmt = db.prepare(`
        UPDATE users 
        SET password_hash = ?, salt = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `)
      updateStmt.run(newPasswordHash, newSalt, userId)
      
      // 删除所有会话（强制重新登录）
      const sessionStmt = db.prepare('DELETE FROM user_sessions WHERE user_id = ?')
      sessionStmt.run(userId)
      
      console.log('Password updated successfully:', userId)
    } catch (error) {
      console.error('Failed to update password:', error)
      throw error
    }
  }

  // 更新手机号
  public async updateMobile(userId: number, mobile: string, password: string, _smsCode: string): Promise<void> {
    const db = databaseManager.getDatabase()
    
    try {
      // TODO: 验证短信验证码
      // 这里应该验证 _smsCode，暂时跳过
      
      // 验证密码
      const userStmt = db.prepare('SELECT password_hash, salt FROM users WHERE id = ?')
      const user = userStmt.get(userId) as any
      
      if (!user) {
        throw new Error('用户不存在')
      }
      
      const passwordHash = authService.hashPassword(password, user.salt)
      if (passwordHash !== user.password_hash) {
        throw new Error('密码错误')
      }
      
      // 检查新手机号是否已被使用
      const existingStmt = db.prepare('SELECT id FROM users WHERE mobile = ? AND id != ?')
      const existing = existingStmt.get(mobile, userId)
      if (existing) {
        throw new Error('手机号已被使用')
      }
      
      // 更新手机号
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
  public async updateEmail(userId: number, email: string, password: string, _code: string): Promise<void> {
    const db = databaseManager.getDatabase()
    
    try {
      // TODO: 验证邮箱验证码
      // 这里应该验证 _code，暂时跳过
      
      // 验证密码
      const userStmt = db.prepare('SELECT password_hash, salt FROM users WHERE id = ?')
      const user = userStmt.get(userId) as any
      
      if (!user) {
        throw new Error('用户不存在')
      }
      
      const passwordHash = authService.hashPassword(password, user.salt)
      if (passwordHash !== user.password_hash) {
        throw new Error('密码错误')
      }
      
      // 更新邮箱
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
  public async getUserSettings(userId: number): Promise<{ [key: string]: string }> {
    const db = databaseManager.getDatabase()
    
    try {
      const stmt = db.prepare(`
        SELECT setting_key, setting_value 
        FROM user_settings 
        WHERE user_id = ?
      `)
      
      const settings = stmt.all(userId) as UserSetting[]
      
      const result: { [key: string]: string } = {}
      settings.forEach(setting => {
        result[setting.setting_key] = setting.setting_value
      })
      
      return result
    } catch (error) {
      console.error('Failed to get user settings:', error)
      throw error
    }
  }

  // 更新用户设置
  public async updateUserSetting(userId: number, key: string, value: string): Promise<void> {
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
  public async updateUserSettings(userId: number, settings: { [key: string]: string }): Promise<void> {
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
  public async setOnlineStatus(userId: number, status: string, platform: string = ''): Promise<void> {
    const db = databaseManager.getDatabase()
    
    try {
      const stmt = db.prepare(`
        INSERT OR REPLACE INTO user_online_status 
        (user_id, status, last_seen, platform)
        VALUES (?, ?, CURRENT_TIMESTAMP, ?)
      `)
      
      stmt.run(userId, status, platform)
      
      // 发送在线状态变化事件
      this.emit(`user:${status}`, { userId, status, platform })
      
      console.log('User online status updated:', userId, status)
    } catch (error) {
      console.error('Failed to set online status:', error)
      throw error
    }
  }

  // 获取用户在线状态
  public async getOnlineStatus(userId: number): Promise<{ online_status: string; last_seen?: string }> {
    const db = databaseManager.getDatabase()
    
    try {
      const stmt = db.prepare(`
        SELECT status, last_seen 
        FROM user_online_status 
        WHERE user_id = ?
      `)
      
      const result = stmt.get(userId) as any
      
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
  public async getBatchOnlineStatus(userIds: number[]): Promise<{ [userId: number]: string }> {
    const db = databaseManager.getDatabase()
    
    try {
      const placeholders = userIds.map(() => '?').join(',')
      const stmt = db.prepare(`
        SELECT user_id, status 
        FROM user_online_status 
        WHERE user_id IN (${placeholders})
      `)
      
      const results = stmt.all(...userIds) as any[]
      
      const statusMap: { [userId: number]: string } = {}
      
      // 初始化所有用户为离线状态
      userIds.forEach(userId => {
        statusMap[userId] = 'offline'
      })
      
      // 更新实际状态
      results.forEach(result => {
        statusMap[result.user_id] = result.status
      })
      
      return statusMap
    } catch (error) {
      console.error('Failed to get batch online status:', error)
      return {}
    }
  }

  // 搜索用户
  public async searchUsers(keyword: string, limit: number = 20): Promise<any[]> {
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
      const users = stmt.all(searchPattern, searchPattern, limit) as any[]
      
      return users.map(user => ({
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
  public async getUserBasicInfo(userId: number): Promise<any> {
    const db = databaseManager.getDatabase()
    
    try {
      const stmt = db.prepare(`
        SELECT id, mobile, nickname, avatar, motto, gender
        FROM users 
        WHERE id = ? AND status = 1
      `)
      
      const user = stmt.get(userId) as any
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
  public async getBatchUserBasicInfo(userIds: number[]): Promise<any[]> {
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
      
      const users = stmt.all(...userIds) as any[]
      
      return users.map(user => ({
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
  public async cleanupOfflineUsers(): Promise<void> {
    const db = databaseManager.getDatabase()
    
    try {
      // 将超过5分钟未活跃的用户设为离线
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

export const userService = new UserService()