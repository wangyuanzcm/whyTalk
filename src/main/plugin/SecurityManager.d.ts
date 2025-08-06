/**
 * 安全管理器相关类型定义
 */

/** 权限类型枚举 */
export enum Permission {
  FILE_SYSTEM_READ = 'filesystem:read',
  FILE_SYSTEM_WRITE = 'filesystem:write',
  NETWORK_ACCESS = 'network:access',
  SYSTEM_INFO = 'system:info',
  CLIPBOARD = 'clipboard',
  NOTIFICATIONS = 'notifications',
  CAMERA = 'camera',
  MICROPHONE = 'microphone',
  LOCATION = 'location',
  STORAGE = 'storage'
}

/** 安全策略配置接口 */
export interface SecurityPolicy {
  allowedPermissions: Permission[]
  blockedDomains?: string[]
  allowedDomains?: string[]
  maxMemoryUsage?: number // MB
  maxExecutionTime?: number // 毫秒
  sandboxed: boolean
}

/** 权限请求结果接口 */
export interface PermissionResult {
  granted: boolean
  reason?: string
}
