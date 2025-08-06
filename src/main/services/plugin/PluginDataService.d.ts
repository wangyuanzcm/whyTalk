/**
 * 插件数据服务相关类型定义
 */

/** 插件数据项接口 */
export interface PluginDataItem {
  key: string
  value: any
  type: string
  created_at: string
  updated_at: string
}

/** 共享数据项接口 */
export interface SharedDataItem {
  namespace: string
  key: string
  value: any
  type: string
  owner_plugin: string
  permissions: any
  created_at: string
  updated_at: string
}

/** 联系人数据接口 */
export interface ContactData {
  id?: number
  user_id: number
  friend_id: number
  remark?: string
  group_id?: number
  is_pinned?: boolean
  plugin_source?: string
  last_interaction?: string
  custom_data?: any
}

/** 消息数据接口 */
export interface MessageData {
  id?: number
  user_id: number
  talk_mode: number
  to_from_id: number
  message_type: number
  content: string
  plugin_source?: string
  read_status?: number
  attachment_data?: any
  custom_data?: any
}

/** 会话数据接口 */
export interface ConversationData {
  id?: number
  user_id: number
  talk_mode: number
  to_from_id: number
  is_pinned?: boolean
  plugin_data?: any
  custom_settings?: any
}
