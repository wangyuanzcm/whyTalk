/**
 * 自动上传配置文件
 * 用于配置构建产物上传到服务器的相关设置
 */
module.exports = {
  // 服务器配置
  server: {
    // 服务器类型: 'minio' 或 'http'
    type: 'minio',

    // MinIO 配置 (当 type 为 'minio' 时使用)
    minio: {
      endPoint: '175.178.158.23',
      port: 19000,
      useSSL: false,
      accessKey: 'huizi', // 替换为实际的 MinIO 用户名
      secretKey: 'zcm@5210', // 替换为实际的 MinIO 密码
      bucketName: 'electron-updates', // 存储桶名称
      pathPrefix: '', // 可选：文件路径前缀，如 'releases/v1.0.0'
      region: 'us-east-1' // 可选：区域
    },

    // HTTP 配置 (当 type 为 'http' 时使用)
    http: {
      url: 'http://175.178.158.23:19000/electron-updates',
      timeout: 300000, // 5分钟超时
      headers: {
        // 可以添加自定义请求头
        // 'Authorization': 'Bearer your-token'
      }
    }
  },

  // 文件过滤配置
  files: {
    // 需要上传的文件扩展名
    extensions: ['.exe', '.dmg', '.AppImage', '.deb', '.snap', '.yml'],

    // 排除的文件名模式（支持通配符）
    exclude: ['*.blockmap', 'builder-effective-config.yaml', 'builder-debug.yml'],

    // 是否上传更新配置文件（latest.yml, latest-mac.yml 等）
    includeUpdateFiles: true
  },

  // 上传行为配置
  behavior: {
    // 上传失败时是否重试
    retry: true,

    // 重试次数
    retryCount: 3,

    // 重试间隔（毫秒）
    retryDelay: 5000,

    // 是否在上传前显示文件列表确认
    confirmBeforeUpload: false,

    // 上传完成后是否删除本地文件
    deleteAfterUpload: false
  },

  // 日志配置
  logging: {
    // 是否显示详细日志
    verbose: true,

    // 是否显示上传进度
    showProgress: true

    // 日志文件路径（可选）
    // logFile: './upload.log'
  }
}
