import { databaseManager } from '../database/Database'
import { EventEmitter } from 'events'

export interface Message {
  id: number
  msg_id: string
  talk_mode: number
  from_user_id: number
  to_from_id: number
  message_type: number
  content: string
  quote_id: string
  is_revoke: number
  created_at: string
  from_user?: {
    id: number
    nickname: string
    avatar: string
  }
}

export interface Conversation {
  id: number
  user_id: number
  talk_mode: number
  to_from_id: number
  is_top: number
  is_disturb: number
  unread_count: number
  last_message_id: number
  updated_at: string
  target_info?: {
    id: number
    name: string
    avatar: string
  }
}

export interface SendMessageRequest {
  type: string
  quote_id?: string
  body: any
  talk_mode: number
  to_from_id: number
  msg_id?: string
}

export interface TalkRecordsRequest {
  cursor: number
  limit: number
  talk_mode: number
  to_from_id: number
}

export class ChatService extends EventEmitter {
  constructor() {
    super()
  }

  // 获取会话列表
  public async getTalkList(userId: number): Promise<Conversation[]> {
    const db = databaseManager.getDatabase()
    
    try {
      const stmt = db.prepare(`
        SELECT c.*, 
               CASE 
                 WHEN c.talk_mode = 1 THEN u.nickname
                 WHEN c.talk_mode = 2 THEN g.name
               END as target_name,
               CASE 
                 WHEN c.talk_mode = 1 THEN u.avatar
                 WHEN c.talk_mode = 2 THEN g.avatar
               END as target_avatar
        FROM conversations c
        LEFT JOIN users u ON c.talk_mode = 1 AND c.to_from_id = u.id
        LEFT JOIN groups g ON c.talk_mode = 2 AND c.to_from_id = g.id
        WHERE c.user_id = ?
        ORDER BY c.is_top DESC, c.updated_at DESC
      `)
      
      const conversations = stmt.all(userId) as any[]
      
      return conversations.map(conv => ({
        id: conv.id,
        user_id: conv.user_id,
        talk_mode: conv.talk_mode,
        to_from_id: conv.to_from_id,
        is_top: conv.is_top,
        is_disturb: conv.is_disturb,
        unread_count: conv.unread_count,
        last_message_id: conv.last_message_id,
        updated_at: conv.updated_at,
        target_info: {
          id: conv.to_from_id,
          name: conv.target_name || '',
          avatar: conv.target_avatar || ''
        }
      }))
    } catch (error) {
      console.error('Failed to get talk list:', error)
      throw error
    }
  }

  // 创建会话
  public async createTalk(userId: number, talkMode: number, toFromId: number): Promise<void> {
    const db = databaseManager.getDatabase()
    
    try {
      const stmt = db.prepare(`
        INSERT OR IGNORE INTO conversations 
        (user_id, talk_mode, to_from_id, updated_at)
        VALUES (?, ?, ?, CURRENT_TIMESTAMP)
      `)
      
      stmt.run(userId, talkMode, toFromId)
    } catch (error) {
      console.error('Failed to create talk:', error)
      throw error
    }
  }

  // 删除会话
  public async deleteTalk(userId: number, talkMode: number, toFromId: number): Promise<void> {
    const db = databaseManager.getDatabase()
    
    try {
      const stmt = db.prepare(`
        DELETE FROM conversations 
        WHERE user_id = ? AND talk_mode = ? AND to_from_id = ?
      `)
      
      stmt.run(userId, talkMode, toFromId)
    } catch (error) {
      console.error('Failed to delete talk:', error)
      throw error
    }
  }

  // 置顶会话
  public async toggleTalkTop(userId: number, talkMode: number, toFromId: number, action: number): Promise<void> {
    const db = databaseManager.getDatabase()
    
    try {
      const stmt = db.prepare(`
        UPDATE conversations 
        SET is_top = ?, updated_at = CURRENT_TIMESTAMP
        WHERE user_id = ? AND talk_mode = ? AND to_from_id = ?
      `)
      
      stmt.run(action, userId, talkMode, toFromId)
    } catch (error) {
      console.error('Failed to toggle talk top:', error)
      throw error
    }
  }

  // 设置免打扰
  public async toggleTalkDisturb(userId: number, talkMode: number, toFromId: number, action: number): Promise<void> {
    const db = databaseManager.getDatabase()
    
    try {
      const stmt = db.prepare(`
        UPDATE conversations 
        SET is_disturb = ?, updated_at = CURRENT_TIMESTAMP
        WHERE user_id = ? AND talk_mode = ? AND to_from_id = ?
      `)
      
      stmt.run(action, userId, talkMode, toFromId)
    } catch (error) {
      console.error('Failed to toggle talk disturb:', error)
      throw error
    }
  }

  // 清除未读数
  public async clearUnread(userId: number, talkMode: number, toFromId: number): Promise<void> {
    const db = databaseManager.getDatabase()
    
    try {
      const stmt = db.prepare(`
        UPDATE conversations 
        SET unread_count = 0, updated_at = CURRENT_TIMESTAMP
        WHERE user_id = ? AND talk_mode = ? AND to_from_id = ?
      `)
      
      stmt.run(userId, talkMode, toFromId)
    } catch (error) {
      console.error('Failed to clear unread:', error)
      throw error
    }
  }

  // 获取聊天记录
  public async getTalkRecords(userId: number, request: TalkRecordsRequest): Promise<Message[]> {
    const db = databaseManager.getDatabase()
    
    try {
      let whereClause = `
        WHERE m.talk_mode = ? AND m.to_from_id = ? AND m.is_revoke = 0
        AND m.id NOT IN (
          SELECT message_id FROM message_deletions WHERE user_id = ?
        )
      `
      const params: any[] = [request.talk_mode, request.to_from_id, userId]
      
      if (request.cursor > 0) {
        whereClause += ' AND m.id < ?'
        params.push(request.cursor)
      }
      
      const stmt = db.prepare(`
        SELECT m.*, u.nickname as from_nickname, u.avatar as from_avatar
        FROM messages m
        LEFT JOIN users u ON m.from_user_id = u.id
        ${whereClause}
        ORDER BY m.id DESC
        LIMIT ?
      `)
      
      params.push(request.limit)
      const messages = stmt.all(...params) as any[]
      
      return messages.map(msg => ({
        id: msg.id,
        msg_id: msg.msg_id,
        talk_mode: msg.talk_mode,
        from_user_id: msg.from_user_id,
        to_from_id: msg.to_from_id,
        message_type: msg.message_type,
        content: msg.content,
        quote_id: msg.quote_id,
        is_revoke: msg.is_revoke,
        created_at: msg.created_at,
        from_user: {
          id: msg.from_user_id,
          nickname: msg.from_nickname || '',
          avatar: msg.from_avatar || ''
        }
      }))
    } catch (error) {
      console.error('Failed to get talk records:', error)
      throw error
    }
  }

  // 发送消息
  public async sendMessage(fromUserId: number, request: SendMessageRequest): Promise<Message> {
    try {
      return databaseManager.transaction((db) => {
        // 生成消息ID
        const msgId = request.msg_id || this.generateMessageId()
        
        // 插入消息
        const messageStmt = db.prepare(`
          INSERT INTO messages 
          (msg_id, talk_mode, from_user_id, to_from_id, message_type, content, quote_id, created_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
        `)
        
        const messageType = this.getMessageType(request.type)
        const content = JSON.stringify(request.body)
        
        const result = messageStmt.run(
          msgId,
          request.talk_mode,
          fromUserId,
          request.to_from_id,
          messageType,
          content,
          request.quote_id || ''
        )
        
        const messageId = result.lastInsertRowid as number
        
        // 更新或创建会话
        const conversationStmt = db.prepare(`
          INSERT OR REPLACE INTO conversations 
          (user_id, talk_mode, to_from_id, last_message_id, updated_at)
          VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
        `)
        
        // 为发送者创建/更新会话
        conversationStmt.run(fromUserId, request.talk_mode, request.to_from_id, messageId)
        
        // 为接收者创建/更新会话并增加未读数
        if (request.talk_mode === 1) {
          // 私聊：为对方创建会话
          const receiverConvStmt = db.prepare(`
            INSERT INTO conversations 
            (user_id, talk_mode, to_from_id, last_message_id, unread_count, updated_at)
            VALUES (?, ?, ?, ?, 1, CURRENT_TIMESTAMP)
            ON CONFLICT(user_id, talk_mode, to_from_id) DO UPDATE SET
            last_message_id = excluded.last_message_id,
            unread_count = unread_count + 1,
            updated_at = excluded.updated_at
          `)
          receiverConvStmt.run(request.to_from_id, request.talk_mode, fromUserId, messageId)
        } else if (request.talk_mode === 2) {
          // 群聊：为所有群成员创建/更新会话
          const membersStmt = db.prepare(`
            SELECT user_id FROM group_members 
            WHERE group_id = ? AND user_id != ?
          `)
          const members = membersStmt.all(request.to_from_id, fromUserId) as any[]
          
          const memberConvStmt = db.prepare(`
            INSERT INTO conversations 
            (user_id, talk_mode, to_from_id, last_message_id, unread_count, updated_at)
            VALUES (?, ?, ?, ?, 1, CURRENT_TIMESTAMP)
            ON CONFLICT(user_id, talk_mode, to_from_id) DO UPDATE SET
            last_message_id = excluded.last_message_id,
            unread_count = unread_count + 1,
            updated_at = excluded.updated_at
          `)
          
          for (const member of members) {
            memberConvStmt.run(member.user_id, request.talk_mode, request.to_from_id, messageId)
          }
        }
        
        // 获取完整的消息信息
        const fullMessageStmt = db.prepare(`
          SELECT m.*, u.nickname as from_nickname, u.avatar as from_avatar
          FROM messages m
          LEFT JOIN users u ON m.from_user_id = u.id
          WHERE m.id = ?
        `)
        
        const fullMessage = fullMessageStmt.get(messageId) as any
        
        const message: Message = {
          id: fullMessage.id,
          msg_id: fullMessage.msg_id,
          talk_mode: fullMessage.talk_mode,
          from_user_id: fullMessage.from_user_id,
          to_from_id: fullMessage.to_from_id,
          message_type: fullMessage.message_type,
          content: fullMessage.content,
          quote_id: fullMessage.quote_id,
          is_revoke: fullMessage.is_revoke,
          created_at: fullMessage.created_at,
          from_user: {
            id: fullMessage.from_user_id,
            nickname: fullMessage.from_nickname || '',
            avatar: fullMessage.from_avatar || ''
          }
        }
        
        // 发送实时消息事件
        this.emit('message:new', message)
        
        return message
      })
    } catch (error) {
      console.error('Failed to send message:', error)
      throw error
    }
  }

  // 撤回消息
  public async revokeMessage(userId: number, talkMode: number, toFromId: number, msgId: string): Promise<void> {
    const db = databaseManager.getDatabase()
    
    try {
      // 检查消息是否存在且是用户发送的
      const checkStmt = db.prepare(`
        SELECT id, created_at FROM messages 
        WHERE msg_id = ? AND from_user_id = ? AND talk_mode = ? AND to_from_id = ?
      `)
      const message = checkStmt.get(msgId, userId, talkMode, toFromId) as any
      
      if (!message) {
        throw new Error('消息不存在或无权撤回')
      }
      
      // 检查是否超过撤回时限（2分钟）
      const messageTime = new Date(message.created_at).getTime()
      const now = Date.now()
      if (now - messageTime > 2 * 60 * 1000) {
        throw new Error('超过撤回时限')
      }
      
      // 撤回消息
      const revokeStmt = db.prepare(`
        UPDATE messages 
        SET is_revoke = 1 
        WHERE msg_id = ?
      `)
      revokeStmt.run(msgId)
      
      // 发送撤回事件
      this.emit('message:revoke', { msgId, talkMode, toFromId })
    } catch (error) {
      console.error('Failed to revoke message:', error)
      throw error
    }
  }

  // 删除消息
  public async deleteMessage(userId: number, talkMode: number, toFromId: number, msgIds: string[]): Promise<void> {
    try {
      return databaseManager.transaction((db) => {
        const stmt = db.prepare(`
          INSERT OR IGNORE INTO message_deletions (user_id, message_id, deleted_at)
          SELECT ?, m.id, CURRENT_TIMESTAMP
          FROM messages m
          WHERE m.msg_id = ? AND m.talk_mode = ? AND m.to_from_id = ?
        `)
        
        for (const msgId of msgIds) {
          stmt.run(userId, msgId, talkMode, toFromId)
        }
      })
    } catch (error) {
      console.error('Failed to delete messages:', error)
      throw error
    }
  }

  // 获取转发记录
  public async getForwardRecords(msgIds: string[]): Promise<Message[]> {
    const db = databaseManager.getDatabase()
    
    try {
      const placeholders = msgIds.map(() => '?').join(',')
      const stmt = db.prepare(`
        SELECT m.*, u.nickname as from_nickname, u.avatar as from_avatar
        FROM messages m
        LEFT JOIN users u ON m.from_user_id = u.id
        WHERE m.msg_id IN (${placeholders}) AND m.is_revoke = 0
        ORDER BY m.created_at ASC
      `)
      
      const messages = stmt.all(...msgIds) as any[]
      
      return messages.map(msg => ({
        id: msg.id,
        msg_id: msg.msg_id,
        talk_mode: msg.talk_mode,
        from_user_id: msg.from_user_id,
        to_from_id: msg.to_from_id,
        message_type: msg.message_type,
        content: msg.content,
        quote_id: msg.quote_id,
        is_revoke: msg.is_revoke,
        created_at: msg.created_at,
        from_user: {
          id: msg.from_user_id,
          nickname: msg.from_nickname || '',
          avatar: msg.from_avatar || ''
        }
      }))
    } catch (error) {
      console.error('Failed to get forward records:', error)
      throw error
    }
  }

  // 搜索历史记录
  public async searchHistoryRecords(userId: number, keyword: string, talkMode?: number, toFromId?: number): Promise<Message[]> {
    const db = databaseManager.getDatabase()
    
    try {
      let whereClause = `
        WHERE m.is_revoke = 0 
        AND m.content LIKE ?
        AND m.id NOT IN (
          SELECT message_id FROM message_deletions WHERE user_id = ?
        )
      `
      const params: any[] = [`%${keyword}%`, userId]
      
      if (talkMode !== undefined && toFromId !== undefined) {
        whereClause += ' AND m.talk_mode = ? AND m.to_from_id = ?'
        params.push(talkMode, toFromId)
      } else {
        // 只搜索用户参与的会话
        whereClause += `
          AND (
            (m.talk_mode = 1 AND (m.from_user_id = ? OR m.to_from_id = ?))
            OR (m.talk_mode = 2 AND m.to_from_id IN (
              SELECT group_id FROM group_members WHERE user_id = ?
            ))
          )
        `
        params.push(userId, userId, userId)
      }
      
      const stmt = db.prepare(`
        SELECT m.*, u.nickname as from_nickname, u.avatar as from_avatar
        FROM messages m
        LEFT JOIN users u ON m.from_user_id = u.id
        ${whereClause}
        ORDER BY m.created_at DESC
        LIMIT 100
      `)
      
      const messages = stmt.all(...params) as any[]
      
      return messages.map(msg => ({
        id: msg.id,
        msg_id: msg.msg_id,
        talk_mode: msg.talk_mode,
        from_user_id: msg.from_user_id,
        to_from_id: msg.to_from_id,
        message_type: msg.message_type,
        content: msg.content,
        quote_id: msg.quote_id,
        is_revoke: msg.is_revoke,
        created_at: msg.created_at,
        from_user: {
          id: msg.from_user_id,
          nickname: msg.from_nickname || '',
          avatar: msg.from_avatar || ''
        }
      }))
    } catch (error) {
      console.error('Failed to search history records:', error)
      throw error
    }
  }

  // 生成消息ID
  private generateMessageId(): string {
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  // 获取消息类型
  private getMessageType(type: string): number {
    const typeMap: { [key: string]: number } = {
      'text': 1,
      'image': 2,
      'file': 3,
      'voice': 4,
      'video': 5,
      'code': 6,
      'vote': 7,
      'forward': 8
    }
    return typeMap[type] || 1
  }
}

export const chatService = new ChatService()