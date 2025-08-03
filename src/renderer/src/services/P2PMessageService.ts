import p2pConnect from '@/p2p/P2PConnect'

// P2P消息服务类
export class P2PMessageService {
  
  // 发送文本消息
  static async sendTextMessage(targetPeerId: string, content: string): Promise<any> {
    try {
      await p2pConnect.sendMessage(targetPeerId, content, 'text')
      
      // 返回模拟的消息对象（兼容现有代码）
      return {
        success: true,
        data: {
          id: `msg_${Date.now()}`,
          from_uid: await this.getLocalPeerId(),
          to_uid: targetPeerId,
          content,
          type: 'text',
          created_at: new Date().toISOString()
        }
      }
    } catch (error) {
      console.error('Failed to send P2P text message:', error)
      throw error
    }
  }

  // 发送图片消息
  static async sendImageMessage(targetPeerId: string, imageData: any): Promise<any> {
    try {
      await p2pConnect.sendMessage(targetPeerId, imageData, 'image')
      
      return {
        success: true,
        data: {
          id: `msg_${Date.now()}`,
          from_uid: await this.getLocalPeerId(),
          to_uid: targetPeerId,
          content: imageData,
          type: 'image',
          created_at: new Date().toISOString()
        }
      }
    } catch (error) {
      console.error('Failed to send P2P image message:', error)
      throw error
    }
  }

  // 发送文件消息
  static async sendFileMessage(targetPeerId: string, fileData: any): Promise<any> {
    try {
      await p2pConnect.sendMessage(targetPeerId, fileData, 'file')
      
      return {
        success: true,
        data: {
          id: `msg_${Date.now()}`,
          from_uid: await this.getLocalPeerId(),
          to_uid: targetPeerId,
          content: fileData,
          type: 'file',
          created_at: new Date().toISOString()
        }
      }
    } catch (error) {
      console.error('Failed to send P2P file message:', error)
      throw error
    }
  }

  // 发送群组消息
  static async sendGroupMessage(groupId: string, content: string, type: 'text' | 'image' | 'file' = 'text'): Promise<any> {
    try {
      await p2pConnect.sendGroupMessage(groupId, content, type)
      
      return {
        success: true,
        data: {
          id: `msg_${Date.now()}`,
          from_uid: await this.getLocalPeerId(),
          group_id: groupId,
          content,
          type,
          created_at: new Date().toISOString()
        }
      }
    } catch (error) {
      console.error('Failed to send P2P group message:', error)
      throw error
    }
  }

  // 获取对话历史（从本地P2P存储）
  static async getChatHistory(targetPeerId: string, page: number = 1, limit: number = 20): Promise<any> {
    try {
      const result = await window.electron.ipcRenderer.invoke('p2p:getChatHistory', {
        targetPeerId,
        page,
        limit
      })
      
      return {
        success: true,
        data: {
          list: result.messages || [],
          total: result.total || 0,
          page,
          limit
        }
      }
    } catch (error) {
      console.error('Failed to get P2P chat history:', error)
      return {
        success: false,
        data: { list: [], total: 0, page, limit }
      }
    }
  }

  // 获取群组消息历史
  static async getGroupChatHistory(groupId: string, page: number = 1, limit: number = 20): Promise<any> {
    try {
      const result = await window.electron.ipcRenderer.invoke('p2p:getGroupChatHistory', {
        groupId,
        page,
        limit
      })
      
      return {
        success: true,
        data: {
          list: result.messages || [],
          total: result.total || 0,
          page,
          limit
        }
      }
    } catch (error) {
      console.error('Failed to get P2P group chat history:', error)
      return {
        success: false,
        data: { list: [], total: 0, page, limit }
      }
    }
  }

  // 标记消息为已读
  static async markMessageAsRead(messageIds: string[]): Promise<any> {
    try {
      await window.electron.ipcRenderer.invoke('p2p:markMessagesAsRead', { messageIds })
      
      return {
        success: true,
        data: { marked: messageIds.length }
      }
    } catch (error) {
      console.error('Failed to mark P2P messages as read:', error)
      return { success: false }
    }
  }

  // 删除消息
  static async deleteMessage(messageId: string): Promise<any> {
    try {
      await window.electron.ipcRenderer.invoke('p2p:deleteMessage', { messageId })
      
      return {
        success: true,
        data: { deleted: messageId }
      }
    } catch (error) {
      console.error('Failed to delete P2P message:', error)
      return { success: false }
    }
  }

  // 撤回消息
  static async recallMessage(messageId: string): Promise<any> {
    try {
      await window.electron.ipcRenderer.invoke('p2p:recallMessage', { messageId })
      
      return {
        success: true,
        data: { recalled: messageId }
      }
    } catch (error) {
      console.error('Failed to recall P2P message:', error)
      return { success: false }
    }
  }

  // 获取本地节点ID
  private static async getLocalPeerId(): Promise<string> {
    try {
      const result = await window.electron.ipcRenderer.invoke('p2p:getStatus')
      return result.peerId || ''
    } catch (error) {
      console.error('Failed to get local peer ID:', error)
      return ''
    }
  }
}

// P2P联系人服务类
export class P2PContactService {
  
  // 获取联系人列表
  static async getContactList(): Promise<any> {
    try {
      const contacts = await p2pConnect.getContacts()
      
      return {
        success: true,
        data: {
          list: contacts.map(contact => ({
            uid: contact.peerId,
            nickname: contact.nickname || contact.peerId,
            avatar: contact.avatar || '',
            remark: contact.remark || '',
            online: contact.online || false,
            last_seen: contact.lastSeen || new Date().toISOString()
          }))
        }
      }
    } catch (error) {
      console.error('Failed to get P2P contacts:', error)
      return {
        success: false,
        data: { list: [] }
      }
    }
  }

  // 获取联系人（别名方法，兼容friend.vue）
  static async getContacts(): Promise<any> {
    return this.getContactList()
  }

  // 添加联系人
  static async addContact(peerId: string, nickname?: string, remark?: string): Promise<any> {
    try {
      await p2pConnect.addContact(peerId, nickname, remark)
      
      return {
        success: true,
        data: {
          uid: peerId,
          nickname: nickname || peerId,
          remark: remark || '',
          added_at: new Date().toISOString()
        }
      }
    } catch (error) {
      console.error('Failed to add P2P contact:', error)
      throw error
    }
  }

  // 删除联系人
  static async deleteContact(peerId: string): Promise<any> {
    try {
      await window.electron.ipcRenderer.invoke('p2p:deleteContact', { peerId })
      
      return {
        success: true,
        data: { deleted: peerId }
      }
    } catch (error) {
      console.error('Failed to delete P2P contact:', error)
      return { success: false }
    }
  }

  // 更新联系人信息
  static async updateContact(peerId: string, updates: any): Promise<any> {
    try {
      await window.electron.ipcRenderer.invoke('p2p:updateContact', { peerId, updates })
      
      return {
        success: true,
        data: { updated: peerId, ...updates }
      }
    } catch (error) {
      console.error('Failed to update P2P contact:', error)
      return { success: false }
    }
  }

  // 搜索联系人
  static async searchContacts(query: string): Promise<any> {
    try {
      const result = await window.electron.ipcRenderer.invoke('p2p:searchContacts', { query })
      
      return {
        success: true,
        data: {
          list: result.contacts || []
        }
      }
    } catch (error) {
      console.error('Failed to search P2P contacts:', error)
      return {
        success: false,
        data: { list: [] }
      }
    }
  }

  // 获取联系人申请列表
  static async getContactRequests(): Promise<any> {
    try {
      const result = await window.electron.ipcRenderer.invoke('p2p:getContactRequests')
      
      return {
        success: true,
        data: {
          list: result.requests || []
        }
      }
    } catch (error) {
      console.error('Failed to get P2P contact requests:', error)
      return {
        success: false,
        data: { list: [] }
      }
    }
  }

  // 处理联系人申请
  static async handleContactRequest(requestId: string, action: 'accept' | 'reject'): Promise<any> {
    try {
      await window.electron.ipcRenderer.invoke('p2p:handleContactRequest', { requestId, action })
      
      return {
        success: true,
        data: { requestId, action }
      }
    } catch (error) {
      console.error('Failed to handle P2P contact request:', error)
      return { success: false }
    }
  }
}

// P2P群组服务类
export class P2PGroupService {
  
  // 获取群组列表
  static async getGroupList(): Promise<any> {
    try {
      const result = await window.electron.ipcRenderer.invoke('p2p:getGroups')
      
      return {
        success: true,
        data: {
          list: result.groups || []
        }
      }
    } catch (error) {
      console.error('Failed to get P2P groups:', error)
      return {
        success: false,
        data: { list: [] }
      }
    }
  }

  // 创建群组
  static async createGroup(name: string, description?: string, members?: string[]): Promise<any> {
    try {
      const result = await window.electron.ipcRenderer.invoke('p2p:createGroup', {
        name,
        description,
        members
      })
      
      return {
        success: true,
        data: result.group
      }
    } catch (error) {
      console.error('Failed to create P2P group:', error)
      throw error
    }
  }

  // 加入群组
  static async joinGroup(groupId: string): Promise<any> {
    try {
      await window.electron.ipcRenderer.invoke('p2p:joinGroup', { groupId })
      
      return {
        success: true,
        data: { joined: groupId }
      }
    } catch (error) {
      console.error('Failed to join P2P group:', error)
      return { success: false }
    }
  }

  // 离开群组
  static async leaveGroup(groupId: string): Promise<any> {
    try {
      await window.electron.ipcRenderer.invoke('p2p:leaveGroup', { groupId })
      
      return {
        success: true,
        data: { left: groupId }
      }
    } catch (error) {
      console.error('Failed to leave P2P group:', error)
      return { success: false }
    }
  }

  // 获取群组成员
  static async getGroupMembers(groupId: string): Promise<any> {
    try {
      const result = await window.electron.ipcRenderer.invoke('p2p:getGroupMembers', { groupId })
      
      return {
        success: true,
        data: {
          list: result.members || []
        }
      }
    } catch (error) {
      console.error('Failed to get P2P group members:', error)
      return {
        success: false,
        data: { list: [] }
      }
    }
  }

  // 邀请成员加入群组
  static async inviteToGroup(groupId: string, peerIds: string[]): Promise<any> {
    try {
      await window.electron.ipcRenderer.invoke('p2p:inviteToGroup', { groupId, peerIds })
      
      return {
        success: true,
        data: { invited: peerIds }
      }
    } catch (error) {
      console.error('Failed to invite to P2P group:', error)
      return { success: false }
    }
  }
}