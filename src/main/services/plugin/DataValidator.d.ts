export interface ValidationResult {
  valid: boolean
  errors: string[]
  warnings?: string[]
}

export interface ContactValidationData {
  user_id?: number
  friend_id?: number
  remark?: string
  group_id?: number
  is_pinned?: boolean
  plugin_source?: string
  custom_data?: any
}

export interface MessageValidationData {
  user_id?: number
  talk_mode?: number
  to_from_id?: number
  message_type?: number
  content?: string
  plugin_source?: string
  attachment_data?: any
  custom_data?: any
}

export interface ConversationValidationData {
  user_id?: number
  talk_mode?: number
  to_from_id?: number
  is_pinned?: boolean
  plugin_data?: any
  custom_settings?: any
}
