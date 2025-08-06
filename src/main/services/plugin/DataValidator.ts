import type {
  ValidationResult,
  ContactValidationData,
  MessageValidationData,
  ConversationValidationData
} from './DataValidator.d'

export class DataValidator {
  /**
   * 验证联系人数据
   */
  static validateContactData(
    data: ContactValidationData,
    isUpdate: boolean = false
  ): ValidationResult {
    const errors: string[] = []
    const warnings: string[] = []

    // 必填字段验证（仅在创建时检查）
    if (!isUpdate) {
      if (!data.user_id || typeof data.user_id !== 'number' || data.user_id <= 0) {
        errors.push('user_id is required and must be a positive number')
      }

      if (!data.friend_id || typeof data.friend_id !== 'number' || data.friend_id <= 0) {
        errors.push('friend_id is required and must be a positive number')
      }

      // 检查用户不能添加自己为好友
      if (data.user_id && data.friend_id && data.user_id === data.friend_id) {
        errors.push('user cannot add themselves as a friend')
      }
    }

    // 可选字段验证
    if (data.remark !== undefined) {
      if (typeof data.remark !== 'string') {
        errors.push('remark must be a string')
      } else if (data.remark.length > 100) {
        errors.push('remark cannot exceed 100 characters')
      }
    }

    if (data.group_id !== undefined && data.group_id !== null) {
      if (typeof data.group_id !== 'number' || data.group_id <= 0) {
        errors.push('group_id must be a positive number')
      }
    }

    if (data.is_pinned !== undefined && typeof data.is_pinned !== 'boolean') {
      errors.push('is_pinned must be a boolean')
    }

    if (data.plugin_source !== undefined) {
      if (typeof data.plugin_source !== 'string') {
        errors.push('plugin_source must be a string')
      } else if (data.plugin_source.length > 100) {
        errors.push('plugin_source cannot exceed 100 characters')
      }
    }

    // 自定义数据验证
    if (data.custom_data !== undefined) {
      const customDataValidation = this.validateCustomData(data.custom_data)
      if (!customDataValidation.valid) {
        errors.push(...customDataValidation.errors.map((e) => `custom_data: ${e}`))
      }
      if (customDataValidation.warnings) {
        warnings.push(...customDataValidation.warnings.map((w) => `custom_data: ${w}`))
      }
    }

    return { valid: errors.length === 0, errors, warnings }
  }

  /**
   * 验证消息数据
   */
  static validateMessageData(
    data: MessageValidationData,
    isUpdate: boolean = false
  ): ValidationResult {
    const errors: string[] = []
    const warnings: string[] = []

    // 必填字段验证（仅在创建时检查）
    if (!isUpdate) {
      if (!data.user_id || typeof data.user_id !== 'number' || data.user_id <= 0) {
        errors.push('user_id is required and must be a positive number')
      }

      if (data.talk_mode === undefined || typeof data.talk_mode !== 'number') {
        errors.push('talk_mode is required and must be a number')
      } else if (![1, 2].includes(data.talk_mode)) {
        errors.push('talk_mode must be 1 (private) or 2 (group)')
      }

      if (!data.to_from_id || typeof data.to_from_id !== 'number' || data.to_from_id <= 0) {
        errors.push('to_from_id is required and must be a positive number')
      }

      if (data.message_type === undefined || typeof data.message_type !== 'number') {
        errors.push('message_type is required and must be a number')
      } else if (![1, 2, 3, 4, 5].includes(data.message_type)) {
        errors.push('message_type must be 1 (text), 2 (image), 3 (file), 4 (voice), or 5 (video)')
      }

      if (!data.content || typeof data.content !== 'string') {
        errors.push('content is required and must be a string')
      }
    }

    // 内容长度验证
    if (data.content !== undefined) {
      if (typeof data.content !== 'string') {
        errors.push('content must be a string')
      } else {
        if (data.content.length === 0) {
          errors.push('content cannot be empty')
        } else if (data.content.length > 10000) {
          errors.push('content cannot exceed 10000 characters')
        } else if (data.content.length > 5000) {
          warnings.push('content is quite long, consider splitting into multiple messages')
        }
      }
    }

    // 插件来源验证
    if (data.plugin_source !== undefined) {
      if (typeof data.plugin_source !== 'string') {
        errors.push('plugin_source must be a string')
      } else if (data.plugin_source.length > 100) {
        errors.push('plugin_source cannot exceed 100 characters')
      }
    }

    // 附件数据验证
    if (data.attachment_data !== undefined) {
      const attachmentValidation = this.validateAttachmentData(
        data.attachment_data,
        data.message_type
      )
      if (!attachmentValidation.valid) {
        errors.push(...attachmentValidation.errors.map((e) => `attachment_data: ${e}`))
      }
      if (attachmentValidation.warnings) {
        warnings.push(...attachmentValidation.warnings.map((w) => `attachment_data: ${w}`))
      }
    }

    // 自定义数据验证
    if (data.custom_data !== undefined) {
      const customDataValidation = this.validateCustomData(data.custom_data)
      if (!customDataValidation.valid) {
        errors.push(...customDataValidation.errors.map((e) => `custom_data: ${e}`))
      }
      if (customDataValidation.warnings) {
        warnings.push(...customDataValidation.warnings.map((w) => `custom_data: ${w}`))
      }
    }

    return { valid: errors.length === 0, errors, warnings }
  }

  /**
   * 验证会话数据
   */
  static validateConversationData(
    data: ConversationValidationData,
    isUpdate: boolean = false
  ): ValidationResult {
    const errors: string[] = []
    const warnings: string[] = []

    // 必填字段验证（仅在创建时检查）
    if (!isUpdate) {
      if (!data.user_id || typeof data.user_id !== 'number' || data.user_id <= 0) {
        errors.push('user_id is required and must be a positive number')
      }

      if (data.talk_mode === undefined || typeof data.talk_mode !== 'number') {
        errors.push('talk_mode is required and must be a number')
      } else if (![1, 2].includes(data.talk_mode)) {
        errors.push('talk_mode must be 1 (private) or 2 (group)')
      }

      if (!data.to_from_id || typeof data.to_from_id !== 'number' || data.to_from_id <= 0) {
        errors.push('to_from_id is required and must be a positive number')
      }
    }

    // 可选字段验证
    if (data.is_pinned !== undefined && typeof data.is_pinned !== 'boolean') {
      errors.push('is_pinned must be a boolean')
    }

    // 插件数据验证
    if (data.plugin_data !== undefined) {
      const pluginDataValidation = this.validateCustomData(data.plugin_data)
      if (!pluginDataValidation.valid) {
        errors.push(...pluginDataValidation.errors.map((e) => `plugin_data: ${e}`))
      }
      if (pluginDataValidation.warnings) {
        warnings.push(...pluginDataValidation.warnings.map((w) => `plugin_data: ${w}`))
      }
    }

    // 自定义设置验证
    if (data.custom_settings !== undefined) {
      const settingsValidation = this.validateCustomData(data.custom_settings)
      if (!settingsValidation.valid) {
        errors.push(...settingsValidation.errors.map((e) => `custom_settings: ${e}`))
      }
      if (settingsValidation.warnings) {
        warnings.push(...settingsValidation.warnings.map((w) => `custom_settings: ${w}`))
      }
    }

    return { valid: errors.length === 0, errors, warnings }
  }

  /**
   * 验证自定义数据
   */
  static validateCustomData(data: any): ValidationResult {
    const errors: string[] = []
    const warnings: string[] = []

    if (data === null || data === undefined) {
      return { valid: true, errors, warnings }
    }

    // 检查数据类型
    if (typeof data !== 'object') {
      errors.push('must be an object or null')
      return { valid: false, errors, warnings }
    }

    // 检查JSON序列化大小
    try {
      const jsonString = JSON.stringify(data)
      const sizeInBytes = new TextEncoder().encode(jsonString).length

      if (sizeInBytes > 1024 * 1024) {
        // 1MB
        errors.push('data size cannot exceed 1MB')
      } else if (sizeInBytes > 100 * 1024) {
        // 100KB
        warnings.push('data size is quite large, consider optimizing')
      }
    } catch (error) {
      errors.push('data must be JSON serializable')
    }

    // 检查嵌套深度
    const depth = this.getObjectDepth(data)
    if (depth > 10) {
      errors.push('object nesting depth cannot exceed 10 levels')
    } else if (depth > 5) {
      warnings.push('object has deep nesting, consider flattening')
    }

    // 检查属性数量
    const propertyCount = this.getPropertyCount(data)
    if (propertyCount > 1000) {
      errors.push('object cannot have more than 1000 properties')
    } else if (propertyCount > 100) {
      warnings.push('object has many properties, consider restructuring')
    }

    return { valid: errors.length === 0, errors, warnings }
  }

  /**
   * 验证附件数据
   */
  static validateAttachmentData(data: any, messageType?: number): ValidationResult {
    const errors: string[] = []
    const warnings: string[] = []

    if (data === null || data === undefined) {
      return { valid: true, errors, warnings }
    }

    if (typeof data !== 'object') {
      errors.push('attachment data must be an object')
      return { valid: false, errors, warnings }
    }

    // 根据消息类型验证附件数据
    switch (messageType) {
      case 2: // 图片
        this.validateImageAttachment(data, errors, warnings)
        break
      case 3: // 文件
        this.validateFileAttachment(data, errors, warnings)
        break
      case 4: // 语音
        this.validateVoiceAttachment(data, errors, warnings)
        break
      case 5: // 视频
        this.validateVideoAttachment(data, errors, warnings)
        break
      default:
        // 通用验证
        this.validateGenericAttachment(data, errors, warnings)
    }

    return { valid: errors.length === 0, errors, warnings }
  }

  /**
   * 验证图片附件
   */
  private static validateImageAttachment(data: any, errors: string[], warnings: string[]): void {
    if (!data.url && !data.path) {
      errors.push('image attachment must have url or path')
    }

    if (data.size && (typeof data.size !== 'number' || data.size <= 0)) {
      errors.push('image size must be a positive number')
    }

    if (data.width && (typeof data.width !== 'number' || data.width <= 0)) {
      errors.push('image width must be a positive number')
    }

    if (data.height && (typeof data.height !== 'number' || data.height <= 0)) {
      errors.push('image height must be a positive number')
    }

    if (data.format && typeof data.format !== 'string') {
      errors.push('image format must be a string')
    }

    // 大小警告
    if (data.size && data.size > 10 * 1024 * 1024) {
      // 10MB
      warnings.push('image size is quite large')
    }
  }

  /**
   * 验证文件附件
   */
  private static validateFileAttachment(data: any, errors: string[], warnings: string[]): void {
    if (!data.url && !data.path) {
      errors.push('file attachment must have url or path')
    }

    if (!data.name || typeof data.name !== 'string') {
      errors.push('file name is required and must be a string')
    }

    if (data.size && (typeof data.size !== 'number' || data.size <= 0)) {
      errors.push('file size must be a positive number')
    }

    if (data.type && typeof data.type !== 'string') {
      errors.push('file type must be a string')
    }

    // 大小警告
    if (data.size && data.size > 100 * 1024 * 1024) {
      // 100MB
      warnings.push('file size is quite large')
    }
  }

  /**
   * 验证语音附件
   */
  private static validateVoiceAttachment(data: any, errors: string[], warnings: string[]): void {
    if (!data.url && !data.path) {
      errors.push('voice attachment must have url or path')
    }

    if (data.duration && (typeof data.duration !== 'number' || data.duration <= 0)) {
      errors.push('voice duration must be a positive number')
    }

    if (data.size && (typeof data.size !== 'number' || data.size <= 0)) {
      errors.push('voice size must be a positive number')
    }

    // 时长警告
    if (data.duration && data.duration > 300) {
      // 5分钟
      warnings.push('voice message is quite long')
    }
  }

  /**
   * 验证视频附件
   */
  private static validateVideoAttachment(data: any, errors: string[], warnings: string[]): void {
    if (!data.url && !data.path) {
      errors.push('video attachment must have url or path')
    }

    if (data.duration && (typeof data.duration !== 'number' || data.duration <= 0)) {
      errors.push('video duration must be a positive number')
    }

    if (data.size && (typeof data.size !== 'number' || data.size <= 0)) {
      errors.push('video size must be a positive number')
    }

    if (data.width && (typeof data.width !== 'number' || data.width <= 0)) {
      errors.push('video width must be a positive number')
    }

    if (data.height && (typeof data.height !== 'number' || data.height <= 0)) {
      errors.push('video height must be a positive number')
    }

    // 大小和时长警告
    if (data.size && data.size > 500 * 1024 * 1024) {
      // 500MB
      warnings.push('video size is quite large')
    }

    if (data.duration && data.duration > 1800) {
      // 30分钟
      warnings.push('video is quite long')
    }
  }

  /**
   * 验证通用附件
   */
  private static validateGenericAttachment(data: any, _errors: string[], warnings: string[]): void {
    // 通用字段验证
    const allowedFields = ['url', 'path', 'name', 'size', 'type', 'metadata']
    const dataFields = Object.keys(data)

    for (const field of dataFields) {
      if (!allowedFields.includes(field)) {
        warnings.push(`unknown field: ${field}`)
      }
    }
  }

  /**
   * 获取对象嵌套深度
   */
  private static getObjectDepth(obj: any, depth: number = 0): number {
    if (obj === null || typeof obj !== 'object') {
      return depth
    }

    let maxDepth = depth
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const currentDepth = this.getObjectDepth(obj[key], depth + 1)
        maxDepth = Math.max(maxDepth, currentDepth)
      }
    }

    return maxDepth
  }

  /**
   * 获取对象属性总数
   */
  private static getPropertyCount(obj: any): number {
    if (obj === null || typeof obj !== 'object') {
      return 0
    }

    let count = 0
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        count++
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          count += this.getPropertyCount(obj[key])
        }
      }
    }

    return count
  }

  /**
   * 验证插件ID格式
   */
  static validatePluginId(pluginId: string): ValidationResult {
    const errors: string[] = []

    if (!pluginId || typeof pluginId !== 'string') {
      errors.push('plugin ID is required and must be a string')
      return { valid: false, errors }
    }

    if (pluginId.length < 3 || pluginId.length > 100) {
      errors.push('plugin ID must be between 3 and 100 characters')
    }

    if (!/^[a-z0-9-]+$/.test(pluginId)) {
      errors.push('plugin ID can only contain lowercase letters, numbers, and hyphens')
    }

    if (pluginId.startsWith('-') || pluginId.endsWith('-')) {
      errors.push('plugin ID cannot start or end with a hyphen')
    }

    if (pluginId.includes('--')) {
      errors.push('plugin ID cannot contain consecutive hyphens')
    }

    return { valid: errors.length === 0, errors }
  }

  /**
   * 验证数据键格式
   */
  static validateDataKey(key: string): ValidationResult {
    const errors: string[] = []

    if (!key || typeof key !== 'string') {
      errors.push('data key is required and must be a string')
      return { valid: false, errors }
    }

    if (key.length < 1 || key.length > 200) {
      errors.push('data key must be between 1 and 200 characters')
    }

    if (!/^[a-zA-Z0-9_.-]+$/.test(key)) {
      errors.push('data key can only contain letters, numbers, underscores, dots, and hyphens')
    }

    return { valid: errors.length === 0, errors }
  }
}
