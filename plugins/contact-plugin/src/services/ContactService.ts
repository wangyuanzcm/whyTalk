import { EventEmitter } from 'events'

export interface Contact {
  id: number
  user_id: number
  friend_id: number
  remark: string
  group_id: number
  status: number
  created_at: string
  updated_at: string
  friend_info?: {
    id: number
    nickname: string
    avatar: string
    motto: string
    gender: number
    email: string
    mobile: string
    is_online: boolean
  }
}

export interface ContactGroup {
  id: number
  user_id: number
  name: string
  sort: number
  created_at: string
  updated_at: string
}

export interface FriendApply {
  id: number
  user_id: number
  friend_id: number
  remark: string
  status: number
  created_at: string
  updated_at: string
  applicant_info?: {
    id: number
    nickname: string
    avatar: string
    motto: string
  }
}

export interface ContactCreateRequest {
  friend_id: number
  remark?: string
  group_id?: number
}

export interface ContactUpdateRequest {
  remark?: string
  group_id?: number
}

export interface ContactGroupRequest {
  name: string
  sort?: number
}

export interface FriendApplyRequest {
  friend_id: number
  remark?: string
}

export class ContactService extends EventEmitter {
  private pluginId: string

  constructor(pluginId: string) {
    super()
    this.pluginId = pluginId
  }

  // 获取联系人列表
  public async getContactList(userId: number): Promise<Contact[]> {
    try {
      const response = await window.electronAPI.invoke('plugin-api-call', {
        pluginId: this.pluginId,
        method: 'GET',
        url: '/api/v1/contact/list',
        data: { user_id: userId }
      })

      if (response.success) {
        return response.data.items || []
      } else {
        throw new Error(response.error || '获取联系人列表失败')
      }
    } catch (error) {
      console.error('Failed to get contact list:', error)
      throw error
    }
  }

  // 添加联系人
  public async addContact(userId: number, data: ContactCreateRequest): Promise<void> {
    try {
      const response = await window.electronAPI.invoke('plugin-api-call', {
        pluginId: this.pluginId,
        method: 'POST',
        url: '/api/v1/contact/add',
        data: { user_id: userId, ...data }
      })

      if (!response.success) {
        throw new Error(response.error || '添加联系人失败')
      }

      this.emit('contact:added', data)
    } catch (error) {
      console.error('Failed to add contact:', error)
      throw error
    }
  }

  // 修改联系人备注
  public async updateContactRemark(
    userId: number,
    friendId: number,
    remark: string
  ): Promise<void> {
    try {
      const response = await window.electronAPI.invoke('plugin-api-call', {
        pluginId: this.pluginId,
        method: 'PUT',
        url: '/api/v1/contact/edit-remark',
        data: { user_id: userId, friend_id: friendId, remark }
      })

      if (!response.success) {
        throw new Error(response.error || '修改备注失败')
      }

      this.emit('contact:remark-updated', { friendId, remark })
    } catch (error) {
      console.error('Failed to update contact remark:', error)
      throw error
    }
  }

  // 移动联系人分组
  public async moveContactGroup(userId: number, friendId: number, groupId: number): Promise<void> {
    try {
      const response = await window.electronAPI.invoke('plugin-api-call', {
        pluginId: this.pluginId,
        method: 'PUT',
        url: '/api/v1/contact/move-group',
        data: { user_id: userId, friend_id: friendId, group_id: groupId }
      })

      if (!response.success) {
        throw new Error(response.error || '移动分组失败')
      }

      this.emit('contact:group-moved', { friendId, groupId })
    } catch (error) {
      console.error('Failed to move contact group:', error)
      throw error
    }
  }

  // 删除联系人
  public async deleteContact(userId: number, friendId: number): Promise<void> {
    try {
      const response = await window.electronAPI.invoke('plugin-api-call', {
        pluginId: this.pluginId,
        method: 'DELETE',
        url: '/api/v1/contact/delete',
        data: { user_id: userId, friend_id: friendId }
      })

      if (!response.success) {
        throw new Error(response.error || '删除联系人失败')
      }

      this.emit('contact:deleted', { friendId })
    } catch (error) {
      console.error('Failed to delete contact:', error)
      throw error
    }
  }

  // 获取联系人分组列表
  public async getContactGroups(userId: number): Promise<ContactGroup[]> {
    try {
      const response = await window.electronAPI.invoke('plugin-api-call', {
        pluginId: this.pluginId,
        method: 'GET',
        url: '/api/v1/contact/group/list',
        data: { user_id: userId }
      })

      if (response.success) {
        return response.data.items || []
      } else {
        throw new Error(response.error || '获取分组列表失败')
      }
    } catch (error) {
      console.error('Failed to get contact groups:', error)
      throw error
    }
  }

  // 创建联系人分组
  public async createContactGroup(
    userId: number,
    data: ContactGroupRequest
  ): Promise<{ group_id: number }> {
    try {
      const response = await window.electronAPI.invoke('plugin-api-call', {
        pluginId: this.pluginId,
        method: 'POST',
        url: '/api/v1/contact/group/create',
        data: { user_id: userId, ...data }
      })

      if (response.success) {
        this.emit('contact-group:created', data)
        return response.data
      } else {
        throw new Error(response.error || '创建分组失败')
      }
    } catch (error) {
      console.error('Failed to create contact group:', error)
      throw error
    }
  }

  // 修改联系人分组
  public async updateContactGroup(
    userId: number,
    groupId: number,
    data: ContactGroupRequest
  ): Promise<void> {
    try {
      const response = await window.electronAPI.invoke('plugin-api-call', {
        pluginId: this.pluginId,
        method: 'PUT',
        url: '/api/v1/contact/group/update',
        data: { user_id: userId, group_id: groupId, ...data }
      })

      if (!response.success) {
        throw new Error(response.error || '修改分组失败')
      }

      this.emit('contact-group:updated', { groupId, ...data })
    } catch (error) {
      console.error('Failed to update contact group:', error)
      throw error
    }
  }

  // 删除联系人分组
  public async deleteContactGroup(userId: number, groupId: number): Promise<void> {
    try {
      const response = await window.electronAPI.invoke('plugin-api-call', {
        pluginId: this.pluginId,
        method: 'DELETE',
        url: '/api/v1/contact/group/delete',
        data: { user_id: userId, group_id: groupId }
      })

      if (!response.success) {
        throw new Error(response.error || '删除分组失败')
      }

      this.emit('contact-group:deleted', { groupId })
    } catch (error) {
      console.error('Failed to delete contact group:', error)
      throw error
    }
  }

  // 获取好友申请列表
  public async getFriendApplies(userId: number): Promise<FriendApply[]> {
    try {
      const response = await window.electronAPI.invoke('plugin-api-call', {
        pluginId: this.pluginId,
        method: 'GET',
        url: '/api/v1/contact/apply/records',
        data: { user_id: userId }
      })

      if (response.success) {
        return response.data.items || []
      } else {
        throw new Error(response.error || '获取好友申请失败')
      }
    } catch (error) {
      console.error('Failed to get friend applies:', error)
      throw error
    }
  }

  // 创建好友申请
  public async createFriendApply(userId: number, data: FriendApplyRequest): Promise<void> {
    try {
      const response = await window.electronAPI.invoke('plugin-api-call', {
        pluginId: this.pluginId,
        method: 'POST',
        url: '/api/v1/contact/apply/create',
        data: { user_id: userId, ...data }
      })

      if (!response.success) {
        throw new Error(response.error || '发送好友申请失败')
      }

      this.emit('friend-apply:created', data)
    } catch (error) {
      console.error('Failed to create friend apply:', error)
      throw error
    }
  }

  // 处理好友申请
  public async handleFriendApply(
    userId: number,
    applyId: number,
    action: 'accept' | 'reject',
    remark?: string
  ): Promise<void> {
    try {
      const response = await window.electronAPI.invoke('plugin-api-call', {
        pluginId: this.pluginId,
        method: 'PUT',
        url: '/api/v1/contact/apply/handle',
        data: { user_id: userId, apply_id: applyId, action, remark }
      })

      if (!response.success) {
        throw new Error(response.error || '处理好友申请失败')
      }

      this.emit('friend-apply:handled', { applyId, action, remark })
    } catch (error) {
      console.error('Failed to handle friend apply:', error)
      throw error
    }
  }

  // 搜索联系人
  public async searchContacts(userId: number, keyword: string): Promise<Contact[]> {
    try {
      const response = await window.electronAPI.invoke('plugin-api-call', {
        pluginId: this.pluginId,
        method: 'GET',
        url: '/api/v1/contact/search',
        data: { user_id: userId, keyword }
      })

      if (response.success) {
        return response.data.items || []
      } else {
        throw new Error(response.error || '搜索联系人失败')
      }
    } catch (error) {
      console.error('Failed to search contacts:', error)
      throw error
    }
  }

  // 获取联系人详情
  public async getContactDetail(userId: number, friendId: number): Promise<Contact | null> {
    try {
      const response = await window.electronAPI.invoke('plugin-api-call', {
        pluginId: this.pluginId,
        method: 'GET',
        url: '/api/v1/contact/detail',
        data: { user_id: userId, friend_id: friendId }
      })

      if (response.success) {
        return response.data
      } else {
        throw new Error(response.error || '获取联系人详情失败')
      }
    } catch (error) {
      console.error('Failed to get contact detail:', error)
      return null
    }
  }

  // P2P 联系人相关功能
  public async addP2PContact(peerId: string, nickname?: string): Promise<void> {
    try {
      const response = await window.electronAPI.p2p.addContact(peerId, nickname)
      this.emit('p2p-contact:added', { peerId, nickname })
      return response
    } catch (error) {
      console.error('Failed to add P2P contact:', error)
      throw error
    }
  }

  public async getP2PContacts(): Promise<any[]> {
    try {
      return await window.electronAPI.p2p.getContacts()
    } catch (error) {
      console.error('Failed to get P2P contacts:', error)
      return []
    }
  }

  public async removeP2PContact(peerId: string): Promise<void> {
    try {
      const response = await window.electronAPI.p2p.removeContact(peerId)
      this.emit('p2p-contact:removed', { peerId })
      return response
    } catch (error) {
      console.error('Failed to remove P2P contact:', error)
      throw error
    }
  }

  public async updateP2PContact(peerId: string, data: any): Promise<void> {
    try {
      const response = await window.electronAPI.p2p.updateContact(peerId, data)
      this.emit('p2p-contact:updated', { peerId, data })
      return response
    } catch (error) {
      console.error('Failed to update P2P contact:', error)
      throw error
    }
  }

  public async searchP2PContacts(query: string): Promise<any[]> {
    try {
      return await window.electronAPI.p2p.searchContacts(query)
    } catch (error) {
      console.error('Failed to search P2P contacts:', error)
      return []
    }
  }

  public async handleP2PContactRequest(peerId: string, action: 'accept' | 'reject'): Promise<void> {
    try {
      const response = await window.electronAPI.p2p.handleContactRequest(peerId, action)
      this.emit('p2p-contact-request:handled', { peerId, action })
      return response
    } catch (error) {
      console.error('Failed to handle P2P contact request:', error)
      throw error
    }
  }
}

export const contactService = new ContactService('contact-plugin')
