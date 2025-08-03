import { databaseManager } from '../database/Database'
import { userService } from '../user/UserService'
import { EventEmitter } from 'events'

export interface ContactRequest {
  user_id: number
  friend_id: number
  remark: string
}

export interface ContactGroupRequest {
  name: string
  sort: number
}

export interface ContactMoveRequest {
  friend_id: number
  group_id: number
}

export class ContactService extends EventEmitter {
  constructor() {
    super()
  }

  // 获取联系人列表
  public async getContactList(userId: number): Promise<any> {
    const db = databaseManager.getDatabase()
    
    try {
      // 获取联系人分组
      const groupStmt = db.prepare(`
        SELECT id, name, sort 
        FROM contact_groups 
        WHERE user_id = ? 
        ORDER BY sort ASC, id ASC
      `)
      const groups = groupStmt.all(userId) as any[]
      
      // 获取联系人列表
      const contactStmt = db.prepare(`
        SELECT c.friend_id, c.remark, c.group_id, c.created_at,
               u.nickname, u.avatar, u.motto, u.gender
        FROM contacts c
        LEFT JOIN users u ON c.friend_id = u.id
        WHERE c.user_id = ? AND c.status = 1 AND u.status = 1
        ORDER BY c.group_id ASC, c.created_at ASC
      `)
      const contacts = contactStmt.all(userId) as any[]
      
      // 获取在线状态
      const friendIds = contacts.map(c => c.friend_id)
      const onlineStatus = await userService.getBatchOnlineStatus(friendIds)
      
      // 组织数据结构
      const groupMap = new Map()
      groups.forEach(group => {
        groupMap.set(group.id, {
          id: group.id,
          name: group.name,
          sort: group.sort,
          list: []
        })
      })
      
      // 添加默认分组
      if (!groupMap.has(0)) {
        groupMap.set(0, {
          id: 0,
          name: '我的好友',
          sort: 0,
          list: []
        })
      }
      
      // 将联系人分配到对应分组
      contacts.forEach(contact => {
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
  public async addContact(data: ContactRequest): Promise<void> {
    const db = databaseManager.getDatabase()
    
    try {
      // 检查是否已经是好友
      const existingStmt = db.prepare(`
        SELECT id FROM contacts 
        WHERE user_id = ? AND friend_id = ? AND status = 1
      `)
      const existing = existingStmt.get(data.user_id, data.friend_id)
      if (existing) {
        throw new Error('已经是好友关系')
      }
      
      // 检查目标用户是否存在
      const userStmt = db.prepare('SELECT id FROM users WHERE id = ? AND status = 1')
      const targetUser = userStmt.get(data.friend_id)
      if (!targetUser) {
        throw new Error('用户不存在')
      }
      
      return databaseManager.transaction((db) => {
        // 添加联系人关系（双向）
        const addStmt = db.prepare(`
          INSERT OR REPLACE INTO contacts 
          (user_id, friend_id, remark, status, created_at, updated_at)
          VALUES (?, ?, ?, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        `)
        
        // 用户添加好友
        addStmt.run(data.user_id, data.friend_id, data.remark)
        
        // 好友添加用户（获取用户昵称作为备注）
        const userInfoStmt = db.prepare('SELECT nickname FROM users WHERE id = ?')
        const userInfo = userInfoStmt.get(data.user_id) as any
        addStmt.run(data.friend_id, data.user_id, userInfo?.nickname || '')
        
        console.log('Contact added successfully:', data.user_id, data.friend_id)
      })
    } catch (error) {
      console.error('Failed to add contact:', error)
      throw error
    }
  }

  // 删除联系人
  public async deleteContact(userId: number, friendId: number): Promise<void> {
    try {
      return databaseManager.transaction((db) => {
        // 删除双向联系人关系
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
  public async updateContactRemark(userId: number, friendId: number, remark: string): Promise<void> {
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
  public async moveContactToGroup(userId: number, data: ContactMoveRequest): Promise<void> {
    const db = databaseManager.getDatabase()
    
    try {
      // 检查分组是否存在（0表示默认分组）
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
  public async getContactGroups(userId: number): Promise<any[]> {
    const db = databaseManager.getDatabase()
    
    try {
      const stmt = db.prepare(`
        SELECT id, name, sort 
        FROM contact_groups 
        WHERE user_id = ? 
        ORDER BY sort ASC, id ASC
      `)
      
      return stmt.all(userId) as any[]
    } catch (error) {
      console.error('Failed to get contact groups:', error)
      throw error
    }
  }

  // 创建联系人分组
  public async createContactGroup(userId: number, data: ContactGroupRequest): Promise<{ id: number }> {
    const db = databaseManager.getDatabase()
    
    try {
      // 检查分组名是否已存在
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
      return { id: result.lastInsertRowid as number }
    } catch (error) {
      console.error('Failed to create contact group:', error)
      throw error
    }
  }

  // 修改联系人分组
  public async updateContactGroup(userId: number, groupId: number, data: ContactGroupRequest): Promise<void> {
    const db = databaseManager.getDatabase()
    
    try {
      // 检查分组是否存在
      const existingStmt = db.prepare(`
        SELECT id FROM contact_groups 
        WHERE id = ? AND user_id = ?
      `)
      const existing = existingStmt.get(groupId, userId)
      if (!existing) {
        throw new Error('分组不存在')
      }
      
      // 检查分组名是否已被其他分组使用
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
  public async deleteContactGroup(userId: number, groupId: number): Promise<void> {
    try {
      return databaseManager.transaction((db) => {
        // 检查分组是否存在
        const existingStmt = db.prepare(`
          SELECT id FROM contact_groups 
          WHERE id = ? AND user_id = ?
        `)
        const existing = existingStmt.get(groupId, userId)
        if (!existing) {
          throw new Error('分组不存在')
        }
        
        // 将该分组下的联系人移动到默认分组
        const moveStmt = db.prepare(`
          UPDATE contacts 
          SET group_id = 0, updated_at = CURRENT_TIMESTAMP
          WHERE user_id = ? AND group_id = ?
        `)
        moveStmt.run(userId, groupId)
        
        // 删除分组
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
  public async getContactApplyList(userId: number): Promise<any[]> {
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
      
      const applications = stmt.all(userId) as any[]
      
      return applications.map(app => ({
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
  public async createContactApply(applicantId: number, userId: number, message: string): Promise<void> {
    const db = databaseManager.getDatabase()
    
    try {
      // 检查是否已经是好友
      const friendStmt = db.prepare(`
        SELECT id FROM contacts 
        WHERE user_id = ? AND friend_id = ? AND status = 1
      `)
      const isFriend = friendStmt.get(applicantId, userId)
      if (isFriend) {
        throw new Error('已经是好友关系')
      }
      
      // 检查是否已有待处理的申请
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
  public async handleContactApply(userId: number, applyId: number, action: 'accept' | 'reject', remark?: string): Promise<void> {
    try {
      return databaseManager.transaction((db) => {
        // 获取申请信息
        const applyStmt = db.prepare(`
          SELECT applicant_id, user_id, status 
          FROM contact_applications 
          WHERE id = ? AND user_id = ?
        `)
        const application = applyStmt.get(applyId, userId) as any
        
        if (!application) {
          throw new Error('申请不存在')
        }
        
        if (application.status !== 'pending') {
          throw new Error('申请已处理')
        }
        
        // 更新申请状态
        const updateStmt = db.prepare(`
          UPDATE contact_applications 
          SET status = ?, updated_at = CURRENT_TIMESTAMP
          WHERE id = ?
        `)
        updateStmt.run(action === 'accept' ? 'accepted' : 'rejected', applyId)
        
        // 如果接受申请，添加好友关系
        if (action === 'accept') {
          const addStmt = db.prepare(`
            INSERT OR REPLACE INTO contacts 
            (user_id, friend_id, remark, status, created_at, updated_at)
            VALUES (?, ?, ?, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
          `)
          
          // 获取用户昵称
          const userInfoStmt = db.prepare('SELECT nickname FROM users WHERE id = ?')
          const applicantInfo = userInfoStmt.get(application.applicant_id) as any
          const userInfo = userInfoStmt.get(application.user_id) as any
          
          // 双向添加好友
          addStmt.run(application.user_id, application.applicant_id, remark || applicantInfo?.nickname || '')
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
  public async deleteContactApply(userId: number, applyId: number): Promise<void> {
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
  public async searchContacts(userId: number, keyword: string): Promise<any[]> {
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
      const contacts = stmt.all(userId, searchPattern, searchPattern, searchPattern) as any[]
      
      // 获取在线状态
      const friendIds = contacts.map(c => c.friend_id)
      const onlineStatus = await userService.getBatchOnlineStatus(friendIds)
      
      return contacts.map(contact => ({
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
  public async isFriend(userId: number, friendId: number): Promise<boolean> {
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
  public async getContactDetail(userId: number, friendId: number): Promise<any> {
    const db = databaseManager.getDatabase()
    
    try {
      const stmt = db.prepare(`
        SELECT c.remark, c.group_id,
               u.nickname, u.avatar, u.motto, u.gender, u.mobile
        FROM contacts c
        LEFT JOIN users u ON c.friend_id = u.id
        WHERE c.user_id = ? AND c.friend_id = ? AND c.status = 1 AND u.status = 1
      `)
      
      const contact = stmt.get(userId, friendId) as any
      if (!contact) {
        throw new Error('联系人不存在')
      }
      
      // 获取在线状态
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

export const contactService = new ContactService()