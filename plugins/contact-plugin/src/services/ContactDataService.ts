import {
  PluginDataAPI,
  ContactData,
  PluginDataOptions
} from '../../../../src/renderer/src/services/plugin/PluginDataAPI'

export interface ContactGroup {
  id: number
  name: string
  description?: string
  color?: string
  icon?: string
  sort_order?: number
  created_at?: string
  updated_at?: string
}

export interface ContactWithGroup extends ContactData {
  id: number
  nickname?: string
  avatar?: string
  status?: 'online' | 'offline' | 'away' | 'busy'
  last_seen?: string
  group?: ContactGroup
  tags?: string[]
  notes?: string
  created_at?: string
  updated_at?: string
}

export interface ContactSearchOptions extends PluginDataOptions {
  keyword?: string
  groupId?: number
  status?: string
  tags?: string[]
  pinned?: boolean
}

/**
 * 联系人插件数据服务
 * 负责联系人数据的管理和缓存
 */
export class ContactDataService {
  private api: PluginDataAPI
  private cacheKey = 'contacts_cache'
  private groupsCacheKey = 'contact_groups_cache'
  private cacheExpiry = 30 * 60 * 1000 // 30分钟缓存

  constructor(pluginId: string = 'contact-plugin') {
    this.api = PluginDataAPI.getInstance(pluginId)
  }

  // ==================== 联系人分组管理 ====================

  /**
   * 获取联系人分组列表
   */
  async getContactGroups(): Promise<ContactGroup[]> {
    try {
      // 先尝试从缓存获取
      const cached = await this.api.getData<ContactGroup[]>(this.groupsCacheKey)
      if (cached.success && cached.data) {
        return cached.data
      }

      // 从共享数据获取
      const shared = await this.api.getSharedData<ContactGroup[]>('contacts', 'groups')
      if (shared.success && shared.data) {
        // 更新本地缓存
        await this.api.setData(this.groupsCacheKey, shared.data, this.cacheExpiry)
        return shared.data
      }

      // 返回默认分组
      const defaultGroups: ContactGroup[] = [
        { id: 1, name: '我的好友', description: '默认好友分组', color: '#1890ff', icon: 'user' },
        {
          id: 2,
          name: '工作联系人',
          description: '工作相关联系人',
          color: '#52c41a',
          icon: 'briefcase'
        },
        { id: 3, name: '家人', description: '家庭成员', color: '#f5222d', icon: 'heart' },
        { id: 4, name: '同学朋友', description: '同学和朋友', color: '#722ed1', icon: 'team' }
      ]

      await this.saveContactGroups(defaultGroups)
      return defaultGroups
    } catch (error) {
      console.error('获取联系人分组失败:', error)
      return []
    }
  }

  /**
   * 保存联系人分组
   */
  async saveContactGroups(groups: ContactGroup[]): Promise<boolean> {
    try {
      // 保存到共享数据
      const sharedResult = await this.api.setSharedData('contacts', 'groups', groups)
      if (!sharedResult.success) {
        console.error('保存分组到共享数据失败:', sharedResult.error)
        return false
      }

      // 更新本地缓存
      const cacheResult = await this.api.setData(this.groupsCacheKey, groups, this.cacheExpiry)
      if (!cacheResult.success) {
        console.warn('更新分组缓存失败:', cacheResult.error)
      }

      return true
    } catch (error) {
      console.error('保存联系人分组失败:', error)
      return false
    }
  }

  /**
   * 创建联系人分组
   */
  async createContactGroup(
    group: Omit<ContactGroup, 'id' | 'created_at' | 'updated_at'>
  ): Promise<ContactGroup | null> {
    try {
      const groups = await this.getContactGroups()
      const maxId = Math.max(...groups.map((g) => g.id), 0)

      const newGroup: ContactGroup = {
        ...group,
        id: maxId + 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }

      groups.push(newGroup)
      const success = await this.saveContactGroups(groups)

      return success ? newGroup : null
    } catch (error) {
      console.error('创建联系人分组失败:', error)
      return null
    }
  }

  /**
   * 更新联系人分组
   */
  async updateContactGroup(groupId: number, updates: Partial<ContactGroup>): Promise<boolean> {
    try {
      const groups = await this.getContactGroups()
      const index = groups.findIndex((g) => g.id === groupId)

      if (index === -1) {
        console.error('联系人分组不存在:', groupId)
        return false
      }

      groups[index] = {
        ...groups[index],
        ...updates,
        updated_at: new Date().toISOString()
      }

      return await this.saveContactGroups(groups)
    } catch (error) {
      console.error('更新联系人分组失败:', error)
      return false
    }
  }

  /**
   * 删除联系人分组
   */
  async deleteContactGroup(groupId: number): Promise<boolean> {
    try {
      const groups = await this.getContactGroups()
      const filteredGroups = groups.filter((g) => g.id !== groupId)

      if (filteredGroups.length === groups.length) {
        console.error('联系人分组不存在:', groupId)
        return false
      }

      // 将该分组下的联系人移动到默认分组
      await this.moveContactsToGroup(groupId, 1)

      return await this.saveContactGroups(filteredGroups)
    } catch (error) {
      console.error('删除联系人分组失败:', error)
      return false
    }
  }

  // ==================== 联系人管理 ====================

  /**
   * 获取联系人列表
   */
  async getContacts(options?: ContactSearchOptions): Promise<ContactWithGroup[]> {
    try {
      // 检查权限
      const permission = await this.api.checkPermission('contacts', 'read')
      if (!permission.success || !permission.data?.hasPermission) {
        console.error('没有联系人读取权限')
        return []
      }

      // 先尝试从缓存获取
      const cached = await this.api.getCachedContacts()
      let contacts: ContactWithGroup[] = []

      if (cached.success && cached.data) {
        contacts = cached.data
      } else {
        // 从数据库获取
        const dbResult = await this.api.getContacts(options?.filters?.userId, {
          limit: options?.limit,
          offset: options?.offset,
          sortBy: options?.sortBy,
          sortOrder: options?.sortOrder
        })

        if (dbResult.success && dbResult.data) {
          contacts = await this.enrichContactsWithGroups(dbResult.data)
          // 更新缓存
          await this.api.cacheContacts(contacts)
        }
      }

      // 应用搜索过滤
      return this.filterContacts(contacts, options)
    } catch (error) {
      console.error('获取联系人列表失败:', error)
      return []
    }
  }

  /**
   * 获取单个联系人
   */
  async getContact(contactId: number): Promise<ContactWithGroup | null> {
    try {
      const permission = await this.api.checkPermission('contacts', 'read')
      if (!permission.success || !permission.data?.hasPermission) {
        console.error('没有联系人读取权限')
        return null
      }

      const result = await this.api.getContact(contactId)
      if (!result.success || !result.data) {
        return null
      }

      const contacts = await this.enrichContactsWithGroups([result.data])
      return contacts[0] || null
    } catch (error) {
      console.error('获取联系人失败:', error)
      return null
    }
  }

  /**
   * 添加联系人
   */
  async addContact(
    contactData: ContactData & {
      nickname?: string
      avatar?: string
      tags?: string[]
      notes?: string
    }
  ): Promise<ContactWithGroup | null> {
    try {
      const permission = await this.api.checkPermission('contacts', 'write')
      if (!permission.success || !permission.data?.hasPermission) {
        console.error('没有联系人写入权限')
        return null
      }

      // 准备联系人数据
      const newContactData: ContactData = {
        ...contactData,
        plugin_source: 'contact-plugin',
        custom_data: {
          nickname: contactData.nickname,
          avatar: contactData.avatar,
          tags: contactData.tags || [],
          notes: contactData.notes || '',
          status: 'offline',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      }

      const result = await this.api.addContact(newContactData)
      if (!result.success || !result.data) {
        console.error('添加联系人失败:', result.error)
        return null
      }

      // 清除缓存以强制刷新
      await this.clearContactsCache()

      // 获取完整的联系人信息
      return await this.getContact(result.data.contactId)
    } catch (error) {
      console.error('添加联系人失败:', error)
      return null
    }
  }

  /**
   * 更新联系人
   */
  async updateContact(contactId: number, updates: Partial<ContactWithGroup>): Promise<boolean> {
    try {
      const permission = await this.api.checkPermission('contacts', 'write')
      if (!permission.success || !permission.data?.hasPermission) {
        console.error('没有联系人写入权限')
        return false
      }

      // 分离数据库字段和自定义字段
      const { nickname, avatar, tags, notes, status, ...dbUpdates } = updates

      // 准备自定义数据更新
      const customDataUpdates: any = {}
      if (nickname !== undefined) customDataUpdates.nickname = nickname
      if (avatar !== undefined) customDataUpdates.avatar = avatar
      if (tags !== undefined) customDataUpdates.tags = tags
      if (notes !== undefined) customDataUpdates.notes = notes
      if (status !== undefined) customDataUpdates.status = status

      if (Object.keys(customDataUpdates).length > 0) {
        customDataUpdates.updated_at = new Date().toISOString()
        dbUpdates.custom_data = customDataUpdates
      }

      const result = await this.api.updateContact(contactId, dbUpdates)
      if (!result.success) {
        console.error('更新联系人失败:', result.error)
        return false
      }

      // 更新缓存
      await this.updateContactInCache(contactId, updates)

      return true
    } catch (error) {
      console.error('更新联系人失败:', error)
      return false
    }
  }

  /**
   * 删除联系人
   */
  async deleteContact(contactId: number): Promise<boolean> {
    try {
      const permission = await this.api.checkPermission('contacts', 'write')
      if (!permission.success || !permission.data?.hasPermission) {
        console.error('没有联系人写入权限')
        return false
      }

      const result = await this.api.deleteContact(contactId)
      if (!result.success) {
        console.error('删除联系人失败:', result.error)
        return false
      }

      // 从缓存中移除
      await this.api.removeCachedContact(contactId)

      return true
    } catch (error) {
      console.error('删除联系人失败:', error)
      return false
    }
  }

  /**
   * 置顶/取消置顶联系人
   */
  async pinContact(contactId: number, pinned: boolean): Promise<boolean> {
    try {
      const permission = await this.api.checkPermission('contacts', 'write')
      if (!permission.success || !permission.data?.hasPermission) {
        console.error('没有联系人写入权限')
        return false
      }

      const result = await this.api.pinContact(contactId, pinned)
      if (!result.success) {
        console.error('置顶联系人失败:', result.error)
        return false
      }

      // 更新缓存
      await this.updateContactInCache(contactId, { is_pinned: pinned })

      return true
    } catch (error) {
      console.error('置顶联系人失败:', error)
      return false
    }
  }

  /**
   * 移动联系人到指定分组
   */
  async moveContactsToGroup(fromGroupId: number, toGroupId: number): Promise<boolean> {
    try {
      const contacts = await this.getContacts({ groupId: fromGroupId })

      for (const contact of contacts) {
        await this.updateContact(contact.id, { group_id: toGroupId })
      }

      return true
    } catch (error) {
      console.error('移动联系人分组失败:', error)
      return false
    }
  }

  /**
   * 搜索联系人
   */
  async searchContacts(
    keyword: string,
    options?: ContactSearchOptions
  ): Promise<ContactWithGroup[]> {
    const searchOptions: ContactSearchOptions = {
      ...options,
      keyword: keyword.toLowerCase()
    }

    return await this.getContacts(searchOptions)
  }

  /**
   * 获取置顶联系人
   */
  async getPinnedContacts(): Promise<ContactWithGroup[]> {
    return await this.getContacts({ pinned: true })
  }

  /**
   * 按分组获取联系人
   */
  async getContactsByGroup(groupId: number): Promise<ContactWithGroup[]> {
    return await this.getContacts({ groupId })
  }

  /**
   * 获取在线联系人
   */
  async getOnlineContacts(): Promise<ContactWithGroup[]> {
    return await this.getContacts({ status: 'online' })
  }

  // ==================== 辅助方法 ====================

  /**
   * 为联系人添加分组信息
   */
  private async enrichContactsWithGroups(contacts: any[]): Promise<ContactWithGroup[]> {
    const groups = await this.getContactGroups()
    const groupMap = new Map(groups.map((g) => [g.id, g]))

    return contacts.map((contact) => {
      const customData = contact.custom_data || {}
      return {
        ...contact,
        nickname: customData.nickname,
        avatar: customData.avatar,
        status: customData.status || 'offline',
        last_seen: customData.last_seen,
        tags: customData.tags || [],
        notes: customData.notes || '',
        group: contact.group_id ? groupMap.get(contact.group_id) : undefined,
        created_at: customData.created_at,
        updated_at: customData.updated_at
      }
    })
  }

  /**
   * 过滤联系人
   */
  private filterContacts(
    contacts: ContactWithGroup[],
    options?: ContactSearchOptions
  ): ContactWithGroup[] {
    if (!options) return contacts

    let filtered = contacts

    // 关键词搜索
    if (options.keyword) {
      const keyword = options.keyword.toLowerCase()
      filtered = filtered.filter(
        (contact) =>
          contact.nickname?.toLowerCase().includes(keyword) ||
          contact.remark?.toLowerCase().includes(keyword) ||
          contact.notes?.toLowerCase().includes(keyword) ||
          contact.tags?.some((tag) => tag.toLowerCase().includes(keyword))
      )
    }

    // 分组过滤
    if (options.groupId !== undefined) {
      filtered = filtered.filter((contact) => contact.group_id === options.groupId)
    }

    // 状态过滤
    if (options.status) {
      filtered = filtered.filter((contact) => contact.status === options.status)
    }

    // 标签过滤
    if (options.tags && options.tags.length > 0) {
      filtered = filtered.filter((contact) =>
        contact.tags?.some((tag) => options.tags!.includes(tag))
      )
    }

    // 置顶过滤
    if (options.pinned !== undefined) {
      filtered = filtered.filter((contact) => contact.is_pinned === options.pinned)
    }

    // 排序
    if (options.sortBy) {
      const order = options.sortOrder === 'desc' ? -1 : 1
      filtered.sort((a, b) => {
        const aVal = (a as any)[options.sortBy!]
        const bVal = (b as any)[options.sortBy!]

        if (aVal < bVal) return -1 * order
        if (aVal > bVal) return 1 * order
        return 0
      })
    } else {
      // 默认排序：置顶在前，然后按更新时间倒序
      filtered.sort((a, b) => {
        if (a.is_pinned && !b.is_pinned) return -1
        if (!a.is_pinned && b.is_pinned) return 1

        const aTime = new Date(a.updated_at || 0).getTime()
        const bTime = new Date(b.updated_at || 0).getTime()
        return bTime - aTime
      })
    }

    return filtered
  }

  /**
   * 更新缓存中的联系人
   */
  private async updateContactInCache(
    contactId: number,
    updates: Partial<ContactWithGroup>
  ): Promise<void> {
    try {
      const cached = await this.api.getCachedContacts()
      if (!cached.success || !cached.data) return

      const contacts = cached.data
      const index = contacts.findIndex((c: any) => c.id === contactId)

      if (index >= 0) {
        contacts[index] = { ...contacts[index], ...updates }
        await this.api.cacheContacts(contacts)
      }
    } catch (error) {
      console.error('更新联系人缓存失败:', error)
    }
  }

  /**
   * 清除联系人缓存
   */
  async clearContactsCache(): Promise<void> {
    try {
      await this.api.deleteData(this.cacheKey)
      await this.api.deleteSharedData('contacts', 'cache')
    } catch (error) {
      console.error('清除联系人缓存失败:', error)
    }
  }

  /**
   * 清除分组缓存
   */
  async clearGroupsCache(): Promise<void> {
    try {
      await this.api.deleteData(this.groupsCacheKey)
    } catch (error) {
      console.error('清除分组缓存失败:', error)
    }
  }

  /**
   * 同步联系人数据
   */
  async syncContacts(): Promise<boolean> {
    try {
      // 清除缓存
      await this.clearContactsCache()

      // 重新获取数据
      const contacts = await this.getContacts()

      console.log(`同步完成，共 ${contacts.length} 个联系人`)
      return true
    } catch (error) {
      console.error('同步联系人数据失败:', error)
      return false
    }
  }

  /**
   * 导出联系人数据
   */
  async exportContacts(): Promise<ContactWithGroup[]> {
    return await this.getContacts()
  }

  /**
   * 导入联系人数据
   */
  async importContacts(contacts: ContactWithGroup[]): Promise<{ success: number; failed: number }> {
    let success = 0
    let failed = 0

    for (const contact of contacts) {
      try {
        const { id, group, created_at, updated_at, ...contactData } = contact
        const result = await this.addContact(contactData)

        if (result) {
          success++
        } else {
          failed++
        }
      } catch (error) {
        console.error('导入联系人失败:', contact, error)
        failed++
      }
    }

    // 清除缓存以刷新数据
    await this.clearContactsCache()

    return { success, failed }
  }
}
