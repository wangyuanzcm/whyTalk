/**
 * 更新配置文件
 * 用于配置应用程序的自动更新功能
 */

export interface UpdateConfig {
  // 是否启用自动更新
  enabled: boolean

  // 更新服务器URL
  serverUrl: string

  // 检查更新的间隔时间（毫秒）
  checkInterval: number

  // 是否自动下载更新
  autoDownload: boolean

  // 是否在下载完成后自动安装
  autoInstallOnAppQuit: boolean

  // 是否允许预发布版本
  allowPrerelease: boolean

  // 是否允许降级
  allowDowngrade: boolean

  // 更新通道
  channel: 'latest' | 'beta' | 'alpha'

  // 请求超时时间（毫秒）
  requestTimeout: number

  // 是否在启动时自动检查更新
  autoCheckOnStartup: boolean

  // 启动延迟时间（毫秒）
  startupDelay: number
}

/**
 * 默认更新配置
 */
export const defaultUpdateConfig: UpdateConfig = {
  enabled: true,
  serverUrl: 'http://175.178.158.23:19000//electron-updates',
  checkInterval: 60 * 60 * 1000, // 1小时检查一次
  autoDownload: true,
  autoInstallOnAppQuit: true,
  allowPrerelease: false,
  allowDowngrade: false,
  channel: 'latest',
  requestTimeout: 30000, // 30秒超时
  autoCheckOnStartup: true,
  startupDelay: 5000 // 启动后5秒检查更新
}

/**
 * 获取更新配置
 * 可以从环境变量或配置文件中读取配置
 */
export function getUpdateConfig(): UpdateConfig {
  const config = { ...defaultUpdateConfig }

  // 从环境变量读取配置
  if (process.env.UPDATE_SERVER_URL) {
    config.serverUrl = process.env.UPDATE_SERVER_URL
  }

  if (process.env.UPDATE_CHECK_INTERVAL) {
    config.checkInterval = parseInt(process.env.UPDATE_CHECK_INTERVAL, 10)
  }

  if (process.env.UPDATE_AUTO_DOWNLOAD) {
    config.autoDownload = process.env.UPDATE_AUTO_DOWNLOAD === 'true'
  }

  if (process.env.UPDATE_CHANNEL) {
    config.channel = process.env.UPDATE_CHANNEL as 'latest' | 'beta' | 'alpha'
  }

  if (process.env.UPDATE_ALLOW_PRERELEASE) {
    config.allowPrerelease = process.env.UPDATE_ALLOW_PRERELEASE === 'true'
  }

  // 在开发环境中禁用自动更新
  if (process.env.NODE_ENV === 'development') {
    config.enabled = false
  }

  return config
}

/**
 * 验证更新配置
 */
export function validateUpdateConfig(config: UpdateConfig): boolean {
  if (!config.serverUrl || !config.serverUrl.startsWith('http')) {
    console.error('Invalid update server URL:', config.serverUrl)
    return false
  }

  if (config.checkInterval < 60000) {
    // 最少1分钟
    console.error('Update check interval too short:', config.checkInterval)
    return false
  }

  if (config.requestTimeout < 5000) {
    // 最少5秒
    console.error('Request timeout too short:', config.requestTimeout)
    return false
  }

  return true
}

// 存储当前配置的变量
let currentConfig: UpdateConfig = { ...defaultUpdateConfig }

/**
 * 保存更新配置
 * 在实际应用中，这里应该将配置保存到文件或数据库
 */
export function saveUpdateConfig(config: UpdateConfig): boolean {
  try {
    // 验证配置
    if (!validateUpdateConfig(config)) {
      return false
    }

    // 更新当前配置
    currentConfig = { ...config }

    // TODO: 在实际应用中，这里应该将配置保存到持久化存储
    // 例如：保存到配置文件、数据库或 Electron 的 store
    console.log('Configuration saved:', currentConfig)

    return true
  } catch (error) {
    console.error('Failed to save update config:', error)
    return false
  }
}

/**
 * 获取当前保存的配置
 */
export function getSavedUpdateConfig(): UpdateConfig {
  return { ...currentConfig }
}
