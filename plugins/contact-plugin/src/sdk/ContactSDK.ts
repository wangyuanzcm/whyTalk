/**
 * 通讯录插件客户端SDK
 * 提供给其他插件调用通讯录服务的接口
 */

export interface Contact {
  id: number
  user_id: number
  friend_id: number
  nickname?: string
  remark?: string
  avatar?: string
  group_id?: number
  status: number
  created_at: string
  updated_at: string
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
  remark?: string
  status: number
  created_at: string
  updated_at: string
}

export interface Group {
  id: number
  name: string
  avatar?: string
  profile?: string
  owner_id: number
  is_dismiss: boolean
  created_at: string
  updated_at: string
}

export interface GroupMember {
  id: number
  group_id: number
  user_id: number
  leader: number
  user_card?: string
  is_mute: boolean
  joined_at: string
}

export class ContactSDK {
  private pluginId: string

  constructor(pluginId: string) {
    this.pluginId = pluginId
  }

  // ==================== 联系人相关 ====================

  /**
   * 获取联系人列表
   */
  async getContacts(): Promise<Contact[]> {
    const response = await this.sendMessage('contact.list', {})
    return response.contacts || []
  }

  /**
   * 获取联系人详情
   */
  async getContact(contactId: number): Promise<Contact | null> {
    const response = await this.sendMessage('contact.get', { contactId })
    return response.contact || null
  }

  /**
   * 添加联系人
   */
  async addContact(friendId: number, remark?: string, groupId?: number): Promise<boolean> {
    const response = await this.sendMessage('contact.add', {
      friend_id: friendId,
      remark,
      group_id: groupId
    })
    return response.success || false
  }

  /**
   * 更新联系人信息
   */
  async updateContact(
    contactId: number,
    data: {
      remark?: string
      group_id?: number
    }
  ): Promise<boolean> {
    const response = await this.sendMessage('contact.update', {
      contactId,
      ...data
    })
    return response.success || false
  }

  /**
   * 删除联系人
   */
  async deleteContact(contactId: number): Promise<boolean> {
    const response = await this.sendMessage('contact.delete', { contactId })
    return response.success || false
  }

  /**
   * 搜索联系人
   */
  async searchContacts(keyword: string): Promise<Contact[]> {
    const response = await this.sendMessage('contact.search', { keyword })
    return response.contacts || []
  }

  /**
   * 获取联系人分组列表
   */
  async getContactGroups(): Promise<ContactGroup[]> {
    const response = await this.sendMessage('contact.groups', {})
    return response.groups || []
  }

  /**
   * 创建联系人分组
   */
  async createContactGroup(name: string, sort?: number): Promise<ContactGroup | null> {
    const response = await this.sendMessage('contact.group.create', {
      name,
      sort: sort || 0
    })
    return response.group || null
  }

  /**
   * 更新联系人分组
   */
  async updateContactGroup(
    groupId: number,
    data: {
      name?: string
      sort?: number
    }
  ): Promise<boolean> {
    const response = await this.sendMessage('contact.group.update', {
      groupId,
      ...data
    })
    return response.success || false
  }

  /**
   * 删除联系人分组
   */
  async deleteContactGroup(groupId: number): Promise<boolean> {
    const response = await this.sendMessage('contact.group.delete', { groupId })
    return response.success || false
  }

  // ==================== 好友申请相关 ====================

  /**
   * 获取好友申请列表
   */
  async getFriendApplies(): Promise<FriendApply[]> {
    const response = await this.sendMessage('friend.apply.list', {})
    return response.applies || []
  }

  /**
   * 发送好友申请
   */
  async sendFriendApply(friendId: number, remark?: string): Promise<boolean> {
    const response = await this.sendMessage('friend.apply.send', {
      friend_id: friendId,
      remark
    })
    return response.success || false
  }

  /**
   * 处理好友申请
   */
  async handleFriendApply(
    applyId: number,
    action: 'accept' | 'reject',
    remark?: string
  ): Promise<boolean> {
    const response = await this.sendMessage('friend.apply.handle', {
      applyId,
      action,
      remark
    })
    return response.success || false
  }

  /**
   * 删除好友申请记录
   */
  async deleteFriendApply(applyId: number): Promise<boolean> {
    const response = await this.sendMessage('friend.apply.delete', { applyId })
    return response.success || false
  }

  // ==================== 群组相关 ====================

  /**
   * 获取群组列表
   */
  async getGroups(): Promise<Group[]> {
    const response = await this.sendMessage('group.list', {})
    return response.groups || []
  }

  /**
   * 获取群组详情
   */
  async getGroup(groupId: number): Promise<Group | null> {
    const response = await this.sendMessage('group.get', { groupId })
    return response.group || null
  }

  /**
   * 创建群组
   */
  async createGroup(data: {
    name: string
    avatar?: string
    profile?: string
    member_ids?: number[]
  }): Promise<Group | null> {
    const response = await this.sendMessage('group.create', data)
    return response.group || null
  }

  /**
   * 更新群组信息
   */
  async updateGroup(
    groupId: number,
    data: {
      name?: string
      avatar?: string
      profile?: string
    }
  ): Promise<boolean> {
    const response = await this.sendMessage('group.update', {
      groupId,
      ...data
    })
    return response.success || false
  }

  /**
   * 解散群组
   */
  async deleteGroup(groupId: number): Promise<boolean> {
    const response = await this.sendMessage('group.delete', { groupId })
    return response.success || false
  }

  /**
   * 获取群组成员列表
   */
  async getGroupMembers(groupId: number): Promise<GroupMember[]> {
    const response = await this.sendMessage('group.members', { groupId })
    return response.members || []
  }

  /**
   * 邀请用户加入群组
   */
  async inviteToGroup(groupId: number, userIds: number[]): Promise<boolean> {
    const response = await this.sendMessage('group.invite', {
      groupId,
      user_ids: userIds
    })
    return response.success || false
  }

  /**
   * 移除群组成员
   */
  async removeFromGroup(groupId: number, userIds: number[]): Promise<boolean> {
    const response = await this.sendMessage('group.remove', {
      groupId,
      user_ids: userIds
    })
    return response.success || false
  }

  /**
   * 设置群组成员角色
   */
  async setGroupMemberRole(groupId: number, userId: number, leader: number): Promise<boolean> {
    const response = await this.sendMessage('group.member.role', {
      groupId,
      userId,
      leader
    })
    return response.success || false
  }

  /**
   * 设置群组成员禁言
   */
  async setGroupMemberMute(groupId: number, userId: number, isMute: boolean): Promise<boolean> {
    const response = await this.sendMessage('group.member.mute', {
      groupId,
      userId,
      is_mute: isMute
    })
    return response.success || false
  }

  /**
   * 设置群组成员名片
   */
  async setGroupMemberCard(groupId: number, userId: number, userCard: string): Promise<boolean> {
    const response = await this.sendMessage('group.member.card', {
      groupId,
      userId,
      user_card: userCard
    })
    return response.success || false
  }

  /**
   * 转让群主
   */
  async transferGroupOwner(groupId: number, newOwnerId: number): Promise<boolean> {
    const response = await this.sendMessage('group.transfer', {
      groupId,
      new_owner_id: newOwnerId
    })
    return response.success || false
  }

  /**
   * 退出群组
   */
  async leaveGroup(groupId: number): Promise<boolean> {
    const response = await this.sendMessage('group.leave', { groupId })
    return response.success || false
  }

  /**
   * 搜索群组
   */
  async searchGroups(keyword: string): Promise<Group[]> {
    const response = await this.sendMessage('group.search', { keyword })
    return response.groups || []
  }

  // ==================== 私有方法 ====================

  private async sendMessage(action: string, data: any): Promise<any> {
    if (!window.electronAPI?.invoke) {
      throw new Error('Electron API not available')
    }

    const message = {
      fromPluginId: this.pluginId,
      toPluginId: 'contact-plugin',
      action,
      data,
      requestId: this.generateRequestId()
    }

    const response = await window.electronAPI.invoke('plugin-send-message', message)

    if (!response.success) {
      throw new Error(response.error || '通讯录服务调用失败')
    }

    return response.data || {}
  }

  private generateRequestId(): string {
    return `${this.pluginId}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }
}

// 导出工厂函数
export function createContactSDK(pluginId: string): ContactSDK {
  return new ContactSDK(pluginId)
}

// 默认导出
export default ContactSDK
