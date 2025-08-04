import { PluginDataAPI } from '../../../src/renderer/src/services/plugin/PluginDataAPI'
import { ContactWithGroup } from '../../contact-plugin/src/services/ContactDataService'

export interface SyncEvent {
  type: 'contact_added' | 'contact_updated' | 'contact_deleted' | 'contact_pinned' | 'data_sync'
  data: any
  timestamp: string
  source: string
}

export interface SyncSubscriber {
  pluginId: string
  callback: (event: SyncEvent) => void
}

/**
 * 数据同步服务
 * 负责在插件之间同步共享数据，特别是联系人数据
 */
export class DataSyncService {
  private static instance: DataSyncService
  private api: PluginDataAPI
  private subscribers: Map<string, SyncSubscriber[]> = new Map()
  private syncInterval: NodeJS.Timeout | null = null
  private lastSyncTime: string = ''
  
  private constructor(pluginId: string = 'data-sync-service') {
    this.api = PluginDataAPI.getInstance(pluginId)
    this.initializeSync()
  }

  /**
   * 获取单例实例
   */
  static getInstance(pluginId?: string): DataSyncService {
    if (!DataSyncService.instance) {
      DataSyncService.instance = new DataSyncService(pluginId)
    }
    return DataSyncService.instance
  }

  /**
   * 初始化同步服务
   */
  private async initializeSync(): Promise<void> {
    try {
      // 获取上次同步时间
      const lastSync = await this.api.getData<string>('last_sync_time')
      if (lastSync.success && lastSync.data) {
        this.lastSyncTime = lastSync.data
      }

      // 启动定期同步
      this.startPeriodicSync()
      
      console.log('数据同步服务初始化完成')
    } catch (error) {
      console.error('初始化数据同步服务失败:', error)
    }
  }

  /**
   * 启动定期同步
   */
  private startPeriodicSync(): void {
    // 每30秒检查一次数据变化
    this.syncInterval = setInterval(async () => {
      await this.checkAndSync()
    }, 30000)
  }

  /**
   * 停止定期同步
   */
  stopPeriodicSync(): void {
    if (this.syncInterval) {
      clearInterval(this.syncInterval)
      this.syncInterval = null
    }
  }

  /**
   * 订阅同步事件
   */
  subscribe(eventType: string, subscriber: SyncSubscriber): void {
    if (!this.subscribers.has(eventType)) {
      this.subscribers.set(eventType, [])
    }
    
    const subscribers = this.subscribers.get(eventType)!
    const existingIndex = subscribers.findIndex(s => s.pluginId === subscriber.pluginId)
    
    if (existingIndex >= 0) {
      subscribers[existingIndex] = subscriber
    } else {
      subscribers.push(subscriber)
    }
    
    console.log(`插件 ${subscriber.pluginId} 订阅了事件 ${eventType}`)
  }

  /**
   * 取消订阅同步事件
   */
  unsubscribe(eventType: string, pluginId: string): void {
    const subscribers = this.subscribers.get(eventType)
    if (subscribers) {
      const filteredSubscribers = subscribers.filter(s => s.pluginId !== pluginId)
      this.subscribers.set(eventType, filteredSubscribers)
      console.log(`插件 ${pluginId} 取消订阅事件 ${eventType}`)
    }
  }

  /**
   * 发布同步事件
   */
  async publishEvent(event: SyncEvent): Promise<void> {
    try {
      // 保存事件到共享数据
      await this.saveEventToHistory(event)
      
      // 通知订阅者
      const subscribers = this.subscribers.get(event.type) || []
      const allSubscribers = this.subscribers.get('*') || []
      
      const allNotifications = [...subscribers, ...allSubscribers]
      
      for (const subscriber of allNotifications) {
        try {
          // 不通知事件源插件
          if (subscriber.pluginId !== event.source) {
            subscriber.callback(event)
          }
        } catch (error) {
          console.error(`通知订阅者 ${subscriber.pluginId} 失败:`, error)
        }
      }
      
      console.log(`发布事件 ${event.type}，通知了 ${allNotifications.length} 个订阅者`)
    } catch (error) {
      console.error('发布同步事件失败:', error)
    }
  }

  /**
   * 同步联系人数据
   */
  async syncContacts(contacts: ContactWithGroup[], source: string): Promise<boolean> {
    try {
      // 获取当前共享的联系人数据
      const currentResult = await this.api.getSharedData<ContactWithGroup[]>('contacts', 'cache')
      const currentContacts = currentResult.success && currentResult.data ? currentResult.data : []
      
      // 比较数据变化
      const changes = this.compareContacts(currentContacts, contacts)
      
      if (changes.length === 0) {
        console.log('联系人数据无变化，跳过同步')
        return true
      }
      
      // 更新共享数据
      const updateResult = await this.api.setSharedData('contacts', 'cache', contacts)
      if (!updateResult.success) {
        console.error('更新共享联系人数据失败:', updateResult.error)
        return false
      }
      
      // 发布变化事件
      for (const change of changes) {
        await this.publishEvent({
          type: change.type as any,
          data: change.data,
          timestamp: new Date().toISOString(),
          source
        })
      }
      
      // 更新同步时间
      await this.updateSyncTime()
      
      console.log(`同步联系人数据完成，共 ${changes.length} 个变化`)
      return true
    } catch (error) {
      console.error('同步联系人数据失败:', error)
      return false
    }
  }

  /**
   * 获取共享联系人数据
   */
  async getSharedContacts(): Promise<ContactWithGroup[]> {
    try {
      const result = await this.api.getSharedData<ContactWithGroup[]>('contacts', 'cache')
      return result.success && result.data ? result.data : []
    } catch (error) {
      console.error('获取共享联系人数据失败:', error)
      return []
    }
  }

  /**
   * 强制同步所有数据
   */
  async forceSyncAll(): Promise<boolean> {
    try {
      console.log('开始强制同步所有数据...')
      
      // 发布强制同步事件
      await this.publishEvent({
        type: 'data_sync',
        data: { force: true },
        timestamp: new Date().toISOString(),
        source: 'data-sync-service'
      })
      
      // 更新同步时间
      await this.updateSyncTime()
      
      console.log('强制同步完成')
      return true
    } catch (error) {
      console.error('强制同步失败:', error)
      return false
    }
  }

  /**
   * 检查并同步数据
   */
  private async checkAndSync(): Promise<void> {
    try {
      // 检查是否有新的同步事件
      const events = await this.getRecentEvents()
      
      if (events.length > 0) {
        console.log(`检测到 ${events.length} 个新的同步事件`)
        
        // 处理每个事件
        for (const event of events) {
          await this.processEvent(event)
        }
      }
    } catch (error) {
      console.error('检查同步数据失败:', error)
    }
  }

  /**
   * 处理同步事件
   */
  private async processEvent(event: SyncEvent): Promise<void> {
    try {
      // 通知相关订阅者
      const subscribers = this.subscribers.get(event.type) || []
      const allSubscribers = this.subscribers.get('*') || []
      
      const allNotifications = [...subscribers, ...allSubscribers]
      
      for (const subscriber of allNotifications) {
        try {
          if (subscriber.pluginId !== event.source) {
            subscriber.callback(event)
          }
        } catch (error) {
          console.error(`处理事件通知失败:`, error)
        }
      }
    } catch (error) {
      console.error('处理同步事件失败:', error)
    }
  }

  /**
   * 比较联系人数据变化
   */
  private compareContacts(oldContacts: ContactWithGroup[], newContacts: ContactWithGroup[]): Array<{
    type: 'contact_added' | 'contact_updated' | 'contact_deleted'
    data: ContactWithGroup
  }> {
    const changes: Array<{
      type: 'contact_added' | 'contact_updated' | 'contact_deleted'
      data: ContactWithGroup
    }> = []
    
    const oldMap = new Map(oldContacts.map(c => [c.id, c]))
    const newMap = new Map(newContacts.map(c => [c.id, c]))
    
    // 检查新增和更新
    for (const newContact of newContacts) {
      const oldContact = oldMap.get(newContact.id)
      
      if (!oldContact) {
        // 新增联系人
        changes.push({
          type: 'contact_added',
          data: newContact
        })
      } else if (this.isContactChanged(oldContact, newContact)) {
        // 更新联系人
        changes.push({
          type: 'contact_updated',
          data: newContact
        })
      }
    }
    
    // 检查删除
    for (const oldContact of oldContacts) {
      if (!newMap.has(oldContact.id)) {
        changes.push({
          type: 'contact_deleted',
          data: oldContact
        })
      }
    }
    
    return changes
  }

  /**
   * 检查联系人是否有变化
   */
  private isContactChanged(oldContact: ContactWithGroup, newContact: ContactWithGroup): boolean {
    // 比较关键字段
    const fieldsToCompare = [
      'nickname', 'avatar', 'remark', 'status', 'is_pinned', 
      'group_id', 'tags', 'notes', 'updated_at'
    ]
    
    for (const field of fieldsToCompare) {
      const oldValue = (oldContact as any)[field]
      const newValue = (newContact as any)[field]
      
      if (JSON.stringify(oldValue) !== JSON.stringify(newValue)) {
        return true
      }
    }
    
    return false
  }

  /**
   * 保存事件到历史记录
   */
  private async saveEventToHistory(event: SyncEvent): Promise<void> {
    try {
      const historyResult = await this.api.getSharedData<SyncEvent[]>('sync', 'event_history')
      const history = historyResult.success && historyResult.data ? historyResult.data : []
      
      // 添加新事件
      history.push(event)
      
      // 保持最近100个事件
      if (history.length > 100) {
        history.splice(0, history.length - 100)
      }
      
      await this.api.setSharedData('sync', 'event_history', history)
    } catch (error) {
      console.error('保存事件历史失败:', error)
    }
  }

  /**
   * 获取最近的同步事件
   */
  private async getRecentEvents(): Promise<SyncEvent[]> {
    try {
      const historyResult = await this.api.getSharedData<SyncEvent[]>('sync', 'event_history')
      const history = historyResult.success && historyResult.data ? historyResult.data : []
      
      // 返回上次同步时间之后的事件
      return history.filter(event => event.timestamp > this.lastSyncTime)
    } catch (error) {
      console.error('获取最近事件失败:', error)
      return []
    }
  }

  /**
   * 更新同步时间
   */
  private async updateSyncTime(): Promise<void> {
    try {
      this.lastSyncTime = new Date().toISOString()
      await this.api.setData('last_sync_time', this.lastSyncTime)
    } catch (error) {
      console.error('更新同步时间失败:', error)
    }
  }

  /**
   * 获取同步统计信息
   */
  async getSyncStats(): Promise<{
    lastSyncTime: string
    totalEvents: number
    recentEvents: number
    subscriberCount: number
  }> {
    try {
      const historyResult = await this.api.getSharedData<SyncEvent[]>('sync', 'event_history')
      const history = historyResult.success && historyResult.data ? historyResult.data : []
      
      const recentEvents = history.filter(event => {
        const eventTime = new Date(event.timestamp)
        const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000)
        return eventTime > oneHourAgo
      })
      
      let subscriberCount = 0
      this.subscribers.forEach(subscribers => {
        subscriberCount += subscribers.length
      })
      
      return {
        lastSyncTime: this.lastSyncTime,
        totalEvents: history.length,
        recentEvents: recentEvents.length,
        subscriberCount
      }
    } catch (error) {
      console.error('获取同步统计失败:', error)
      return {
        lastSyncTime: '',
        totalEvents: 0,
        recentEvents: 0,
        subscriberCount: 0
      }
    }
  }

  /**
   * 清理历史事件
   */
  async cleanupHistory(daysToKeep: number = 7): Promise<boolean> {
    try {
      const historyResult = await this.api.getSharedData<SyncEvent[]>('sync', 'event_history')
      const history = historyResult.success && historyResult.data ? historyResult.data : []
      
      const cutoffTime = new Date(Date.now() - daysToKeep * 24 * 60 * 60 * 1000)
      const filteredHistory = history.filter(event => 
        new Date(event.timestamp) > cutoffTime
      )
      
      await this.api.setSharedData('sync', 'event_history', filteredHistory)
      
      console.log(`清理历史事件完成，保留 ${filteredHistory.length} 个事件`)
      return true
    } catch (error) {
      console.error('清理历史事件失败:', error)
      return false
    }
  }

  /**
   * 销毁同步服务
   */
  destroy(): void {
    this.stopPeriodicSync()
    this.subscribers.clear()
    console.log('数据同步服务已销毁')
  }
}

// 导出便捷函数
export const createDataSyncService = (pluginId?: string) => {
  return DataSyncService.getInstance(pluginId)
}

export const subscribeToContactChanges = (pluginId: string, callback: (event: SyncEvent) => void) => {
  const syncService = DataSyncService.getInstance()
  
  // 订阅所有联系人相关事件
  const eventTypes = ['contact_added', 'contact_updated', 'contact_deleted', 'contact_pinned']
  
  eventTypes.forEach(eventType => {
    syncService.subscribe(eventType, { pluginId, callback })
  })
  
  return () => {
    // 返回取消订阅函数
    eventTypes.forEach(eventType => {
      syncService.unsubscribe(eventType, pluginId)
    })
  }
}

export const publishContactChange = async (type: 'contact_added' | 'contact_updated' | 'contact_deleted' | 'contact_pinned', contact: ContactWithGroup, source: string) => {
  const syncService = DataSyncService.getInstance()
  
  await syncService.publishEvent({
    type,
    data: contact,
    timestamp: new Date().toISOString(),
    source
  })
}