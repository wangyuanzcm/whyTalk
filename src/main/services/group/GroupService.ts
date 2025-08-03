import { databaseManager } from '../database/Database'
import { userService } from '../user/UserService'
import { EventEmitter } from 'events'

export interface GroupCreateRequest {
  name: string
  avatar: string
  profile: string
  member_ids: number[]
}

export interface GroupUpdateRequest {
  name?: string
  avatar?: string
  profile?: string
}

export interface GroupMemberRequest {
  user_ids: number[]
}

export interface GroupNoticeRequest {
  title: string
  content: string
  is_top: number
  is_confirm: number
}

export interface GroupVoteRequest {
  title: string
  answer_mode: number
  answer_option: string[]
  answer_num: number
  is_anonymous: number
}

export class GroupService extends EventEmitter {
  constructor() {
    super()
  }

  // 获取群组列表
  public async getGroupList(userId: number): Promise<any[]> {
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
      
      const groups = stmt.all(userId) as any[]
      
      // 获取每个群组的成员数量和最后一条消息
      const result: any[] = []
      for (const group of groups) {
        // 获取成员数量
        const memberCountStmt = db.prepare(`
          SELECT COUNT(*) as count 
          FROM group_members 
          WHERE group_id = ? AND status = 1
        `)
        const memberCount = memberCountStmt.get(group.id) as any
        
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
  public async createGroup(creatorId: number, data: GroupCreateRequest): Promise<{ group_id: number }> {
    try {
      return databaseManager.transaction((db) => {
        // 创建群组
        const groupStmt = db.prepare(`
          INSERT INTO groups 
          (name, avatar, profile, creator_id, max_num, is_dismiss, created_at, updated_at)
          VALUES (?, ?, ?, ?, 500, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        `)
        
        const groupResult = groupStmt.run(data.name, data.avatar, data.profile, creatorId)
        const groupId = groupResult.lastInsertRowid as number
        
        // 添加创建者为群主
        const memberStmt = db.prepare(`
          INSERT INTO group_members 
          (group_id, user_id, role, status, is_mute, joined_at, updated_at)
          VALUES (?, ?, 'owner', 1, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        `)
        memberStmt.run(groupId, creatorId)
        
        // 添加其他成员
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
  public async dismissGroup(userId: number, groupId: number): Promise<void> {
    const db = databaseManager.getDatabase()
    
    try {
      // 检查权限（只有群主可以解散群组）
      const memberStmt = db.prepare(`
        SELECT role FROM group_members 
        WHERE group_id = ? AND user_id = ? AND status = 1
      `)
      const member = memberStmt.get(groupId, userId) as any
      
      if (!member || member.role !== 'owner') {
        throw new Error('只有群主可以解散群组')
      }
      
      return databaseManager.transaction((db) => {
        // 标记群组为已解散
        const groupStmt = db.prepare(`
          UPDATE groups 
          SET is_dismiss = 1, updated_at = CURRENT_TIMESTAMP
          WHERE id = ?
        `)
        groupStmt.run(groupId)
        
        // 移除所有成员
        const memberStmt = db.prepare(`
          UPDATE group_members 
          SET status = 0, updated_at = CURRENT_TIMESTAMP
          WHERE group_id = ?
        `)
        memberStmt.run(groupId)
        
        console.log('Group dismissed successfully:', groupId)
      })
    } catch (error) {
      console.error('Failed to dismiss group:', error)
      throw error
    }
  }

  // 邀请加入群组
  public async inviteMembers(userId: number, groupId: number, data: GroupMemberRequest): Promise<void> {
    const db = databaseManager.getDatabase()
    
    try {
      // 检查权限（群主和管理员可以邀请）
      const memberStmt = db.prepare(`
        SELECT role FROM group_members 
        WHERE group_id = ? AND user_id = ? AND status = 1
      `)
      const member = memberStmt.get(groupId, userId) as any
      
      if (!member || (member.role !== 'owner' && member.role !== 'admin')) {
        throw new Error('没有邀请权限')
      }
      
      // 检查群组是否存在且未解散
      const groupStmt = db.prepare(`
        SELECT id, max_num FROM groups 
        WHERE id = ? AND is_dismiss = 0
      `)
      const group = groupStmt.get(groupId) as any
      if (!group) {
        throw new Error('群组不存在或已解散')
      }
      
      // 检查当前成员数量
      const countStmt = db.prepare(`
        SELECT COUNT(*) as count 
        FROM group_members 
        WHERE group_id = ? AND status = 1
      `)
      const currentCount = countStmt.get(groupId) as any
      
      if (currentCount.count + data.user_ids.length > group.max_num) {
        throw new Error('群组人数已达上限')
      }
      
      return databaseManager.transaction((db) => {
        const addMemberStmt = db.prepare(`
          INSERT OR REPLACE INTO group_members 
          (group_id, user_id, role, status, is_mute, joined_at, updated_at)
          VALUES (?, ?, 'member', 1, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        `)
        
        for (const memberId of data.user_ids) {
          // 检查用户是否已在群组中
          const existingStmt = db.prepare(`
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
  public async removeMembers(userId: number, groupId: number, data: GroupMemberRequest): Promise<void> {
    const db = databaseManager.getDatabase()
    
    try {
      // 检查权限（群主和管理员可以移除成员）
      const memberStmt = db.prepare(`
        SELECT role FROM group_members 
        WHERE group_id = ? AND user_id = ? AND status = 1
      `)
      const member = memberStmt.get(groupId, userId) as any
      
      if (!member || (member.role !== 'owner' && member.role !== 'admin')) {
        throw new Error('没有移除权限')
      }
      
      return databaseManager.transaction((db) => {
        const removeStmt = db.prepare(`
          UPDATE group_members 
          SET status = 0, updated_at = CURRENT_TIMESTAMP
          WHERE group_id = ? AND user_id = ? AND role != 'owner'
        `)
        
        for (const memberId of data.user_ids) {
          // 不能移除群主
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
  public async leaveGroup(userId: number, groupId: number): Promise<void> {
    const db = databaseManager.getDatabase()
    
    try {
      // 检查用户是否在群组中
      const memberStmt = db.prepare(`
        SELECT role FROM group_members 
        WHERE group_id = ? AND user_id = ? AND status = 1
      `)
      const member = memberStmt.get(groupId, userId) as any
      
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
  public async getGroupDetail(userId: number, groupId: number): Promise<any> {
    const db = databaseManager.getDatabase()
    
    try {
      // 检查用户是否在群组中
      const memberCheckStmt = db.prepare(`
        SELECT role FROM group_members 
        WHERE group_id = ? AND user_id = ? AND status = 1
      `)
      const userMember = memberCheckStmt.get(groupId, userId) as any
      
      if (!userMember) {
        throw new Error('不在该群组中')
      }
      
      // 获取群组信息
      const groupStmt = db.prepare(`
        SELECT g.*, u.nickname as creator_name
        FROM groups g
        LEFT JOIN users u ON g.creator_id = u.id
        WHERE g.id = ? AND g.is_dismiss = 0
      `)
      const group = groupStmt.get(groupId) as any
      
      if (!group) {
        throw new Error('群组不存在或已解散')
      }
      
      // 获取成员列表
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
      const members = memberStmt.all(groupId) as any[]
      
      // 获取在线状态
      const memberIds = members.map(m => m.user_id)
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
        members: members.map(member => ({
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
  public async updateGroup(userId: number, groupId: number, data: GroupUpdateRequest): Promise<void> {
    const db = databaseManager.getDatabase()
    
    try {
      // 检查权限（群主和管理员可以修改）
      const memberStmt = db.prepare(`
        SELECT role FROM group_members 
        WHERE group_id = ? AND user_id = ? AND status = 1
      `)
      const member = memberStmt.get(groupId, userId) as any
      
      if (!member || (member.role !== 'owner' && member.role !== 'admin')) {
        throw new Error('没有修改权限')
      }
      
      const updates: string[] = []
      const values: any[] = []
      
      if (data.name !== undefined) {
        updates.push('name = ?')
        values.push(data.name)
      }
      
      if (data.avatar !== undefined) {
        updates.push('avatar = ?')
        values.push(data.avatar)
      }
      
      if (data.profile !== undefined) {
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
  public async setMemberRole(userId: number, groupId: number, memberId: number, role: 'admin' | 'member'): Promise<void> {
    const db = databaseManager.getDatabase()
    
    try {
      // 检查权限（只有群主可以设置管理员）
      const memberStmt = db.prepare(`
        SELECT role FROM group_members 
        WHERE group_id = ? AND user_id = ? AND status = 1
      `)
      const member = memberStmt.get(groupId, userId) as any
      
      if (!member || member.role !== 'owner') {
        throw new Error('只有群主可以设置管理员')
      }
      
      // 检查目标成员是否存在
      const targetMember = memberStmt.get(groupId, memberId) as any
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
  public async muteMember(userId: number, groupId: number, memberId: number, isMute: boolean): Promise<void> {
    const db = databaseManager.getDatabase()
    
    try {
      // 检查权限（群主和管理员可以禁言）
      const memberStmt = db.prepare(`
        SELECT role FROM group_members 
        WHERE group_id = ? AND user_id = ? AND status = 1
      `)
      const member = memberStmt.get(groupId, userId) as any
      
      if (!member || (member.role !== 'owner' && member.role !== 'admin')) {
        throw new Error('没有禁言权限')
      }
      
      // 检查目标成员
      const targetMember = memberStmt.get(groupId, memberId) as any
      if (!targetMember) {
        throw new Error('目标成员不在群组中')
      }
      
      if (targetMember.role === 'owner') {
        throw new Error('不能禁言群主')
      }
      
      // 管理员不能禁言其他管理员
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
  public async setMemberCard(userId: number, groupId: number, userCard: string): Promise<void> {
    const db = databaseManager.getDatabase()
    
    try {
      // 检查用户是否在群组中
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
  public async transferOwnership(userId: number, groupId: number, newOwnerId: number): Promise<void> {
    const db = databaseManager.getDatabase()
    
    try {
      // 检查权限（只有群主可以转让）
      const memberStmt = db.prepare(`
        SELECT role FROM group_members 
        WHERE group_id = ? AND user_id = ? AND status = 1
      `)
      const member = memberStmt.get(groupId, userId) as any
      
      if (!member || member.role !== 'owner') {
        throw new Error('只有群主可以转让群主')
      }
      
      // 检查新群主是否在群组中
      const newOwner = memberStmt.get(groupId, newOwnerId) as any
      if (!newOwner) {
        throw new Error('新群主不在群组中')
      }
      
      return databaseManager.transaction((db) => {
        // 将当前群主设为普通成员
        const demoteStmt = db.prepare(`
          UPDATE group_members 
          SET role = 'member', updated_at = CURRENT_TIMESTAMP
          WHERE group_id = ? AND user_id = ?
        `)
        demoteStmt.run(groupId, userId)
        
        // 将新成员设为群主
        const promoteStmt = db.prepare(`
          UPDATE group_members 
          SET role = 'owner', updated_at = CURRENT_TIMESTAMP
          WHERE group_id = ? AND user_id = ?
        `)
        promoteStmt.run(groupId, newOwnerId)
        
        // 更新群组创建者
        const updateGroupStmt = db.prepare(`
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
  public async getGroupNotices(userId: number, groupId: number): Promise<any[]> {
    const db = databaseManager.getDatabase()
    
    try {
      // 检查用户是否在群组中
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
      
      return stmt.all(groupId) as any[]
    } catch (error) {
      console.error('Failed to get group notices:', error)
      throw error
    }
  }

  // 创建群公告
  public async createGroupNotice(userId: number, groupId: number, data: GroupNoticeRequest): Promise<{ id: number }> {
    const db = databaseManager.getDatabase()
    
    try {
      // 检查权限（群主和管理员可以发布公告）
      const memberStmt = db.prepare(`
        SELECT role FROM group_members 
        WHERE group_id = ? AND user_id = ? AND status = 1
      `)
      const member = memberStmt.get(groupId, userId) as any
      
      if (!member || (member.role !== 'owner' && member.role !== 'admin')) {
        throw new Error('没有发布公告权限')
      }
      
      const stmt = db.prepare(`
        INSERT INTO group_notices 
        (group_id, creator_id, title, content, is_top, is_confirm, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      `)
      
      const result = stmt.run(groupId, userId, data.title, data.content, data.is_top, data.is_confirm)
      
      console.log('Group notice created successfully:', result.lastInsertRowid)
      return { id: result.lastInsertRowid as number }
    } catch (error) {
      console.error('Failed to create group notice:', error)
      throw error
    }
  }

  // 删除群公告
  public async deleteGroupNotice(userId: number, groupId: number, noticeId: number): Promise<void> {
    const db = databaseManager.getDatabase()
    
    try {
      // 检查权限（群主和管理员可以删除公告）
      const memberStmt = db.prepare(`
        SELECT role FROM group_members 
        WHERE group_id = ? AND user_id = ? AND status = 1
      `)
      const member = memberStmt.get(groupId, userId) as any
      
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
  public async isGroupMember(userId: number, groupId: number): Promise<boolean> {
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
  public async getMemberRole(userId: number, groupId: number): Promise<string | null> {
    const db = databaseManager.getDatabase()
    
    try {
      const stmt = db.prepare(`
        SELECT role FROM group_members 
        WHERE group_id = ? AND user_id = ? AND status = 1
      `)
      
      const result = stmt.get(groupId, userId) as any
      return result ? result.role : null
    } catch (error) {
      console.error('Failed to get member role:', error)
      return null
    }
  }

  // 搜索群组
  public async searchGroups(keyword: string, limit: number = 20): Promise<any[]> {
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
      return stmt.all(searchPattern, searchPattern, limit) as any[]
    } catch (error) {
      console.error('Failed to search groups:', error)
      throw error
    }
  }
}

export const groupService = new GroupService()