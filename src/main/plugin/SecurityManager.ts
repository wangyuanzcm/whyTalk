import { dialog } from 'electron'
import { PluginInstance, PluginType } from './PluginManager'

// 权限类型枚举
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

// 安全策略配置
export interface SecurityPolicy {
  allowedPermissions: Permission[]
  blockedDomains?: string[]
  allowedDomains?: string[]
  maxMemoryUsage?: number // MB
  maxExecutionTime?: number // 毫秒
  sandboxed: boolean
}

// 权限请求结果
export interface PermissionResult {
  granted: boolean
  reason?: string
}

/**
 * 插件安全管理器
 * 负责插件权限控制、安全策略执行和风险评估
 */
export class SecurityManager {
  private pluginPolicies: Map<string, SecurityPolicy> = new Map()
  private userPermissions: Map<string, Set<Permission>> = new Map()

  constructor() {
    this.initializeDefaultPolicies()
  }

  /**
   * 初始化默认安全策略
   */
  private initializeDefaultPolicies() {
    // 前端插件默认策略（更严格）
    const frontendPolicy: SecurityPolicy = {
      allowedPermissions: [
        Permission.STORAGE,
        Permission.NOTIFICATIONS
      ],
      sandboxed: true,
      maxMemoryUsage: 100, // 100MB
      maxExecutionTime: 5000 // 5秒
    }

    // 系统插件默认策略（相对宽松但仍有限制）
    const systemPolicy: SecurityPolicy = {
      allowedPermissions: [
        Permission.FILE_SYSTEM_READ,
        Permission.NETWORK_ACCESS,
        Permission.SYSTEM_INFO,
        Permission.STORAGE,
        Permission.NOTIFICATIONS
      ],
      sandboxed: true,
      maxMemoryUsage: 500, // 500MB
      maxExecutionTime: 30000 // 30秒
    }

    this.pluginPolicies.set('frontend_default', frontendPolicy)
    this.pluginPolicies.set('system_default', systemPolicy)
  }

  /**
   * 为插件设置安全策略
   */
  public setPluginPolicy(pluginId: string, policy: SecurityPolicy) {
    this.pluginPolicies.set(pluginId, policy)
  }

  /**
   * 获取插件安全策略
   */
  public getPluginPolicy(plugin: PluginInstance): SecurityPolicy {
    // 优先使用插件特定策略
    let policy = this.pluginPolicies.get(plugin.id)
    if (policy) {
      return policy
    }

    // 使用类型默认策略
    const defaultKey = plugin.type === PluginType.FRONTEND ? 'frontend_default' : 'system_default'
    policy = this.pluginPolicies.get(defaultKey)
    if (policy) {
      return policy
    }

    // 最严格的默认策略
    return {
      allowedPermissions: [],
      sandboxed: true,
      maxMemoryUsage: 50,
      maxExecutionTime: 1000
    }
  }

  /**
   * 检查插件是否有特定权限
   */
  public async checkPermission(plugin: PluginInstance, permission: Permission): Promise<PermissionResult> {
    const policy = this.getPluginPolicy(plugin)
    
    // 检查策略是否允许该权限
    if (!policy.allowedPermissions.includes(permission)) {
      return {
        granted: false,
        reason: `Permission ${permission} not allowed by plugin policy`
      }
    }

    // 检查用户是否已授权
    const userPerms = this.userPermissions.get(plugin.id)
    if (userPerms && userPerms.has(permission)) {
      return { granted: true }
    }

    // 请求用户授权
    const userGranted = await this.requestUserPermission(plugin, permission)
    if (userGranted) {
      // 保存用户授权
      if (!this.userPermissions.has(plugin.id)) {
        this.userPermissions.set(plugin.id, new Set())
      }
      this.userPermissions.get(plugin.id)!.add(permission)
      return { granted: true }
    }

    return {
      granted: false,
      reason: 'User denied permission'
    }
  }

  /**
   * 请求用户权限授权
   */
  private async requestUserPermission(plugin: PluginInstance, permission: Permission): Promise<boolean> {
    const permissionDescriptions = {
      [Permission.FILE_SYSTEM_READ]: '读取文件系统',
      [Permission.FILE_SYSTEM_WRITE]: '写入文件系统',
      [Permission.NETWORK_ACCESS]: '访问网络',
      [Permission.SYSTEM_INFO]: '获取系统信息',
      [Permission.CLIPBOARD]: '访问剪贴板',
      [Permission.NOTIFICATIONS]: '发送通知',
      [Permission.CAMERA]: '访问摄像头',
      [Permission.MICROPHONE]: '访问麦克风',
      [Permission.LOCATION]: '获取位置信息',
      [Permission.STORAGE]: '访问本地存储'
    }

    const description = permissionDescriptions[permission] || permission
    
    const result = await dialog.showMessageBox({
      type: 'question',
      buttons: ['允许', '拒绝'],
      defaultId: 1,
      title: '插件权限请求',
      message: `插件 "${plugin.config.name}" 请求权限`,
      detail: `该插件需要 "${description}" 权限才能正常工作。\n\n是否允许？`
    })

    return result.response === 0
  }

  /**
   * 验证插件配置安全性
   */
  public validatePluginSecurity(plugin: PluginInstance): { valid: boolean; issues: string[] } {
    const issues: string[] = []
    const config = plugin.config

    // 检查插件名称
    if (!config.name || config.name.length < 2) {
      issues.push('插件名称无效')
    }

    // 检查版本号
    if (!config.version || !/^\d+\.\d+\.\d+/.test(config.version)) {
      issues.push('版本号格式无效')
    }

    // 检查权限请求是否合理
    if (config.permissions) {
      const suspiciousPermissions = [
        Permission.FILE_SYSTEM_WRITE,
        Permission.CAMERA,
        Permission.MICROPHONE,
        Permission.LOCATION
      ]
      
      const requestedSuspicious = config.permissions.filter(p => 
        suspiciousPermissions.includes(p as Permission)
      )
      
      if (requestedSuspicious.length > 0) {
        issues.push(`请求了敏感权限: ${requestedSuspicious.join(', ')}`)
      }
    }

    // 对于前端插件，检查HTML内容
    if (plugin.type === PluginType.FRONTEND) {
      // 这里可以添加HTML内容安全检查
      // 例如检查是否包含可疑的脚本或外部资源引用
    }

    return {
      valid: issues.length === 0,
      issues
    }
  }

  /**
   * 创建沙箱环境配置
   */
  public createSandboxConfig(plugin: PluginInstance) {
    const policy = this.getPluginPolicy(plugin)
    
    return {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: policy.sandboxed,
      webSecurity: true,
      allowRunningInsecureContent: false,
      experimentalFeatures: false
    }
  }

  /**
   * 监控插件资源使用
   */
  public monitorPluginResources(pluginId: string) {
    const policy = this.pluginPolicies.get(pluginId)
    if (!policy) return

    // 这里可以实现资源监控逻辑
    // 例如内存使用、CPU使用、网络请求等
    console.log(`Monitoring resources for plugin: ${pluginId}`)
  }

  /**
   * 撤销插件权限
   */
  public revokePermission(pluginId: string, permission: Permission) {
    const userPerms = this.userPermissions.get(pluginId)
    if (userPerms) {
      userPerms.delete(permission)
      if (userPerms.size === 0) {
        this.userPermissions.delete(pluginId)
      }
    }
  }

  /**
   * 撤销插件所有权限
   */
  public revokeAllPermissions(pluginId: string) {
    this.userPermissions.delete(pluginId)
  }

  /**
   * 获取插件已授权权限
   */
  public getGrantedPermissions(pluginId: string): Permission[] {
    const userPerms = this.userPermissions.get(pluginId)
    return userPerms ? Array.from(userPerms) : []
  }

  /**
   * 检查URL是否被允许访问
   */
  public isUrlAllowed(plugin: PluginInstance, url: string): boolean {
    const policy = this.getPluginPolicy(plugin)
    
    // 如果有黑名单，检查是否在黑名单中
    if (policy.blockedDomains) {
      const hostname = new URL(url).hostname
      if (policy.blockedDomains.some(domain => hostname.includes(domain))) {
        return false
      }
    }

    // 如果有白名单，检查是否在白名单中
    if (policy.allowedDomains) {
      const hostname = new URL(url).hostname
      return policy.allowedDomains.some(domain => hostname.includes(domain))
    }

    // 默认允许（如果没有特殊限制）
    return true
  }
}