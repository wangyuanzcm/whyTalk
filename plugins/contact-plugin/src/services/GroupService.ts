import { EventEmitter } from 'events'

export interface Group {
  id: number
  group_name: string
  avatar: string
  profile: string
  max_num: number
  count: number
  role: string
  is_mute: number
  user_card: string
  created_at: string
  joined_at: string
}

export interface GroupDetail {
  group_id: number
  group_name: string
  avatar: string
  profile: string
  max_num: number
  is_dismiss: number
  creator_id: number
  creator_name: string
  created_at: string
  user_role: string
  members: GroupMember[]
}

export interface GroupMember {
  user_id: number
  nickname: string
  avatar: string
  motto: string
  gender: number
  role: string
  is_mute: number
  user_card: string
  joined_at: string
  online_status: string
}

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

export interface GroupNotice {
  id: number
  group_id: number
  title: string
  content: string
  is_top: number
  is_confirm: number
  creator_id: number
  creator_name: string
  created_at: string
}

export interface GroupNoticeRequest {
  title: string
  content: string
  is_top: number
  is_confirm: number
}

export interface GroupVote {
  id: number
  group_id: number
  title: string
  answer_mode: number
  answer_option: string[]
  answer_num: number
  is_anonymous: number
  creator_id: number
  creator_name: string
  created_at: string
}

export interface GroupVoteRequest {
  title: string
  answer_mode: number
  answer_option: string[]
  answer_num: number
  is_anonymous: number
}

export class GroupService extends EventEmitter {
  private pluginId: string

  constructor(pluginId: string) {
    super()
    this.pluginId = pluginId
  }

  // 获取群组列表
  public async getGroupList(userId: number): Promise<Group[]> {
    try {
      const response = await window.electronAPI.invoke('plugin-api-call', {
        pluginId: this.pluginId,
        method: 'GET',
        url: '/api/v1/group/list',
        data: { user_id: userId }
      })
      
      if (response.success) {
        return response.data.items || []
      } else {
        throw new Error(response.error || '获取群组列表失败')
      }
    } catch (error) {
      console.error('Failed to get group list:', error)
      throw error
    }
  }

  // 创建群组
  public async createGroup(userId: number, data: GroupCreateRequest): Promise<{ group_id: number }> {
    try {
      const response = await window.electronAPI.invoke('plugin-api-call', {
        pluginId: this.pluginId,
        method: 'POST',
        url: '/api/v1/group/create',
        data: { user_id: userId, ...data }
      })
      
      if (response.success) {
        this.emit('group:created', data)
        return response.data
      } else {
        throw new Error(response.error || '创建群组失败')
      }
    } catch (error) {
      console.error('Failed to create group:', error)
      throw error
    }
  }

  // 获取群组详情
  public async getGroupDetail(userId: number, groupId: number): Promise<GroupDetail> {
    try {
      const response = await window.electronAPI.invoke('plugin-api-call', {
        pluginId: this.pluginId,
        method: 'GET',
        url: '/api/v1/group/detail',
        data: { user_id: userId, group_id: groupId }
      })
      
      if (response.success) {
        return response.data
      } else {
        throw new Error(response.error || '获取群组详情失败')
      }
    } catch (error) {
      console.error('Failed to get group detail:', error)
      throw error
    }
  }

  // 更新群组信息
  public async updateGroup(userId: number, groupId: number, data: GroupUpdateRequest): Promise<void> {
    try {
      const response = await window.electronAPI.invoke('plugin-api-call', {
        pluginId: this.pluginId,
        method: 'PUT',
        url: '/api/v1/group/update',
        data: { user_id: userId, group_id: groupId, ...data }
      })
      
      if (!response.success) {
        throw new Error(response.error || '更新群组信息失败')
      }
      
      this.emit('group:updated', { groupId, ...data })
    } catch (error) {
      console.error('Failed to update group:', error)
      throw error
    }
  }

  // 邀请成员加入群组
  public async inviteMembers(userId: number, groupId: number, data: GroupMemberRequest): Promise<void> {
    try {
      const response = await window.electronAPI.invoke('plugin-api-call', {
        pluginId: this.pluginId,
        method: 'POST',
        url: '/api/v1/group/invite',
        data: { user_id: userId, group_id: groupId, user_ids: data.user_ids }
      })
      
      if (!response.success) {
        throw new Error(response.error || '邀请成员失败')
      }
      
      this.emit('group:members-invited', { groupId, userIds: data.user_ids })
    } catch (error) {
      console.error('Failed to invite members:', error)
      throw error
    }
  }

  // 移除群组成员
  public async removeMembers(userId: number, groupId: number, data: GroupMemberRequest): Promise<void> {
    try {
      const response = await window.electronAPI.invoke('plugin-api-call', {
        pluginId: this.pluginId,
        method: 'DELETE',
        url: '/api/v1/group/member/remove',
        data: { user_id: userId, group_id: groupId, user_ids: data.user_ids }
      })
      
      if (!response.success) {
        throw new Error(response.error || '移除成员失败')
      }
      
      this.emit('group:members-removed', { groupId, userIds: data.user_ids })
    } catch (error) {
      console.error('Failed to remove members:', error)
      throw error
    }
  }

  // 退出群组
  public async leaveGroup(userId: number, groupId: number): Promise<void> {
    try {
      const response = await window.electronAPI.invoke('plugin-api-call', {
        pluginId: this.pluginId,
        method: 'POST',
        url: '/api/v1/group/secede',
        data: { user_id: userId, group_id: groupId }
      })
      
      if (!response.success) {
        throw new Error(response.error || '退出群组失败')
      }
      
      this.emit('group:left', { groupId })
    } catch (error) {
      console.error('Failed to leave group:', error)
      throw error
    }
  }

  // 解散群组
  public async dismissGroup(userId: number, groupId: number): Promise<void> {
    try {
      const response = await window.electronAPI.invoke('plugin-api-call', {
        pluginId: this.pluginId,
        method: 'POST',
        url: '/api/v1/group/dismiss',
        data: { user_id: userId, group_id: groupId }
      })
      
      if (!response.success) {
        throw new Error(response.error || '解散群组失败')
      }
      
      this.emit('group:dismissed', { groupId })
    } catch (error) {
      console.error('Failed to dismiss group:', error)
      throw error
    }
  }

  // 获取群组成员列表
  public async getGroupMembers(userId: number, groupId: number): Promise<GroupMember[]> {
    try {
      const response = await window.electronAPI.invoke('plugin-api-call', {
        pluginId: this.pluginId,
        method: 'GET',
        url: '/api/v1/group/member/list',
        data: { user_id: userId, group_id: groupId }
      })
      
      if (response.success) {
        return response.data || []
      } else {
        throw new Error(response.error || '获取群组成员失败')
      }
    } catch (error) {
      console.error('Failed to get group members:', error)
      throw error
    }
  }

  // 设置群组成员禁言
  public async muteGroupMember(userId: number, groupId: number, memberId: number, duration: number): Promise<void> {
    try {
      const response = await window.electronAPI.invoke('plugin-api-call', {
        pluginId: this.pluginId,
        method: 'PUT',
        url: '/api/v1/group/member/mute',
        data: { user_id: userId, group_id: groupId, member_id: memberId, duration }
      })
      
      if (!response.success) {
        throw new Error(response.error || '设置禁言失败')
      }
      
      this.emit('group:member-muted', { groupId, memberId, duration })
    } catch (error) {
      console.error('Failed to mute group member:', error)
      throw error
    }
  }

  // 设置群组成员角色
  public async setMemberRole(userId: number, groupId: number, memberId: number, role: string): Promise<void> {
    try {
      const response = await window.electronAPI.invoke('plugin-api-call', {
        pluginId: this.pluginId,
        method: 'PUT',
        url: '/api/v1/group/member/role',
        data: { user_id: userId, group_id: groupId, member_id: memberId, role }
      })
      
      if (!response.success) {
        throw new Error(response.error || '设置角色失败')
      }
      
      this.emit('group:member-role-changed', { groupId, memberId, role })
    } catch (error) {
      console.error('Failed to set member role:', error)
      throw error
    }
  }

  // 获取群公告列表
  public async getGroupNotices(userId: number, groupId: number): Promise<GroupNotice[]> {
    try {
      const response = await window.electronAPI.invoke('plugin-api-call', {
        pluginId: this.pluginId,
        method: 'GET',
        url: '/api/v1/group/notice/list',
        data: { user_id: userId, group_id: groupId }
      })
      
      if (response.success) {
        return response.data.items || []
      } else {
        throw new Error(response.error || '获取群公告失败')
      }
    } catch (error) {
      console.error('Failed to get group notices:', error)
      throw error
    }
  }

  // 创建群公告
  public async createGroupNotice(userId: number, groupId: number, data: GroupNoticeRequest): Promise<void> {
    try {
      const response = await window.electronAPI.invoke('plugin-api-call', {
        pluginId: this.pluginId,
        method: 'POST',
        url: '/api/v1/group/notice/create',
        data: { user_id: userId, group_id: groupId, ...data }
      })
      
      if (!response.success) {
        throw new Error(response.error || '创建群公告失败')
      }
      
      this.emit('group:notice-created', { groupId, ...data })
    } catch (error) {
      console.error('Failed to create group notice:', error)
      throw error
    }
  }

  // 删除群公告
  public async deleteGroupNotice(userId: number, groupId: number, noticeId: number): Promise<void> {
    try {
      const response = await window.electronAPI.invoke('plugin-api-call', {
        pluginId: this.pluginId,
        method: 'DELETE',
        url: '/api/v1/group/notice/delete',
        data: { user_id: userId, group_id: groupId, notice_id: noticeId }
      })
      
      if (!response.success) {
        throw new Error(response.error || '删除群公告失败')
      }
      
      this.emit('group:notice-deleted', { groupId, noticeId })
    } catch (error) {
      console.error('Failed to delete group notice:', error)
      throw error
    }
  }

  // 获取群投票列表
  public async getGroupVotes(userId: number, groupId: number): Promise<GroupVote[]> {
    try {
      const response = await window.electronAPI.invoke('plugin-api-call', {
        pluginId: this.pluginId,
        method: 'GET',
        url: '/api/v1/group/vote/list',
        data: { user_id: userId, group_id: groupId }
      })
      
      if (response.success) {
        return response.data.items || []
      } else {
        throw new Error(response.error || '获取群投票失败')
      }
    } catch (error) {
      console.error('Failed to get group votes:', error)
      throw error
    }
  }

  // 创建群投票
  public async createGroupVote(userId: number, groupId: number, data: GroupVoteRequest): Promise<void> {
    try {
      const response = await window.electronAPI.invoke('plugin-api-call', {
        pluginId: this.pluginId,
        method: 'POST',
        url: '/api/v1/group/vote/create',
        data: { user_id: userId, group_id: groupId, ...data }
      })
      
      if (!response.success) {
        throw new Error(response.error || '创建群投票失败')
      }
      
      this.emit('group:vote-created', { groupId, ...data })
    } catch (error) {
      console.error('Failed to create group vote:', error)
      throw error
    }
  }

  // 搜索群组
  public async searchGroups(keyword: string, limit: number = 20): Promise<Group[]> {
    try {
      const response = await window.electronAPI.invoke('plugin-api-call', {
        pluginId: this.pluginId,
        method: 'GET',
        url: '/api/v1/group/overt-list',
        data: { keyword, limit }
      })
      
      if (response.success) {
        return response.data.items || []
      } else {
        throw new Error(response.error || '搜索群组失败')
      }
    } catch (error) {
      console.error('Failed to search groups:', error)
      throw error
    }
  }

  // P2P 群组相关功能
  public async getP2PGroups(): Promise<any[]> {
    try {
      return await window.electronAPI.p2p.getGroups()
    } catch (error) {
      console.error('Failed to get P2P groups:', error)
      return []
    }
  }

  public async createP2PGroup(name: string, members: string[]): Promise<any> {
    try {
      const response = await window.electronAPI.p2p.createGroup(name, members)
      this.emit('p2p-group:created', { name, members })
      return response
    } catch (error) {
      console.error('Failed to create P2P group:', error)
      throw error
    }
  }

  public async joinP2PGroup(groupId: string): Promise<void> {
    try {
      const response = await window.electronAPI.p2p.joinGroup(groupId)
      this.emit('p2p-group:joined', { groupId })
      return response
    } catch (error) {
      console.error('Failed to join P2P group:', error)
      throw error
    }
  }

  public async leaveP2PGroup(groupId: string): Promise<void> {
    try {
      const response = await window.electronAPI.p2p.leaveGroup(groupId)
      this.emit('p2p-group:left', { groupId })
      return response
    } catch (error) {
      console.error('Failed to leave P2P group:', error)
      throw error
    }
  }

  public async getP2PGroupMembers(groupId: string): Promise<any[]> {
    try {
      return await window.electronAPI.p2p.getGroupMembers(groupId)
    } catch (error) {
      console.error('Failed to get P2P group members:', error)
      return []
    }
  }

  public async inviteToP2PGroup(groupId: string, peerIds: string[]): Promise<void> {
    try {
      const response = await window.electronAPI.p2p.inviteToGroup(groupId, peerIds)
      this.emit('p2p-group:members-invited', { groupId, peerIds })
      return response
    } catch (error) {
      console.error('Failed to invite to P2P group:', error)
      throw error
    }
  }
}

export const groupService = new GroupService('contact-plugin')