const fs = require('fs')
const path = require('path')
const Minio = require('minio')
const FormData = require('form-data')
const fetch = require('node-fetch')

/**
 * 加载配置文件
 * @returns {Object} 配置对象
 */
function loadConfig() {
  const configPath = path.join(__dirname, '../upload.config.js')
  let config = {}

  try {
    if (fs.existsSync(configPath)) {
      config = require(configPath)
      console.log('✅ 已加载配置文件:', configPath)
    } else {
      console.log('⚠️  配置文件不存在，使用默认配置')
    }
  } catch (error) {
    console.warn('⚠️  加载配置文件失败，使用默认配置:', error.message)
  }

  // 合并默认配置
  return {
    server: {
      type: 'minio',
      minio: {
        endPoint: '175.178.158.23',
        port: 19000,
        useSSL: false,
        accessKey: 'your-access-key',
        secretKey: 'your-secret-key',
        bucketName: 'electron-updates',
        pathPrefix: '',
        region: 'us-east-1',
        ...config.server?.minio
      },
      http: {
        url: 'http://175.178.158.23:19000/electron-updates',
        timeout: 300000,
        headers: {},
        ...config.server?.http
      },
      ...config.server
    },
    files: {
      extensions: ['.exe', '.dmg', '.AppImage', '.deb', '.snap', '.yml'],
      exclude: ['*.blockmap', 'builder-effective-config.yaml', 'builder-debug.yml'],
      includeUpdateFiles: true,
      ...config.files
    },
    behavior: {
      retry: true,
      retryCount: 3,
      retryDelay: 5000,
      confirmBeforeUpload: false,
      deleteAfterUpload: false,
      ...config.behavior
    },
    logging: {
      verbose: true,
      showProgress: true,
      ...config.logging
    }
  }
}

/**
 * 检查文件是否匹配排除模式
 * @param {string} fileName 文件名
 * @param {Array} excludePatterns 排除模式数组
 * @returns {boolean} 是否应该排除
 */
function shouldExcludeFile(fileName, excludePatterns) {
  return excludePatterns.some((pattern) => {
    // 简单的通配符匹配
    const regex = new RegExp(pattern.replace(/\*/g, '.*'))
    return regex.test(fileName)
  })
}

/**
 * 创建 MinIO 客户端
 * @param {Object} minioConfig MinIO 配置
 * @returns {Minio.Client} MinIO 客户端实例
 */
function createMinioClient(minioConfig) {
  return new Minio.Client({
    endPoint: minioConfig.endPoint,
    port: minioConfig.port,
    useSSL: minioConfig.useSSL,
    accessKey: minioConfig.accessKey,
    secretKey: minioConfig.secretKey,
    region: minioConfig.region
  })
}

/**
 * 检查并创建存储桶
 * @param {Minio.Client} minioClient MinIO 客户端
 * @param {string} bucketName 存储桶名称
 * @returns {Promise<boolean>} 是否成功
 */
async function ensureBucketExists(minioClient, bucketName) {
  try {
    const exists = await minioClient.bucketExists(bucketName)
    if (!exists) {
      console.log(`📦 创建存储桶: ${bucketName}`)
      await minioClient.makeBucket(bucketName)
      console.log(`✅ 存储桶创建成功: ${bucketName}`)
    } else if (CONFIG.logging.verbose) {
      console.log(`✅ 存储桶已存在: ${bucketName}`)
    }
    return true
  } catch (error) {
    console.error(`❌ 存储桶操作失败: ${bucketName}`, error.message)
    return false
  }
}

// 全局配置
const CONFIG = loadConfig()
const DIST_DIR = path.join(__dirname, '../dist')

/**
 * 获取构建产物文件列表
 * @returns {Array} 文件路径数组
 */
function getBuildArtifacts() {
  if (!fs.existsSync(DIST_DIR)) {
    console.error('❌ 构建目录不存在:', DIST_DIR)
    return []
  }

  const files = []
  const items = fs.readdirSync(DIST_DIR)

  for (const item of items) {
    const itemPath = path.join(DIST_DIR, item)
    const stat = fs.statSync(itemPath)

    if (stat.isFile()) {
      // 检查是否应该排除此文件
      if (shouldExcludeFile(item, CONFIG.files.exclude)) {
        if (CONFIG.logging.verbose) {
          console.log(`⏭️  跳过文件: ${item} (匹配排除规则)`)
        }
        continue
      }

      // 检查文件扩展名
      const hasValidExtension = CONFIG.files.extensions.some((ext) => item.endsWith(ext))

      if (hasValidExtension) {
        files.push(itemPath)
        if (CONFIG.logging.verbose) {
          console.log(`📄 找到文件: ${item}`)
        }
      } else if (CONFIG.logging.verbose) {
        console.log(`⏭️  跳过文件: ${item} (扩展名不匹配)`)
      }
    }
  }

  return files
}

/**
 * 延迟函数
 * @param {number} ms 延迟毫秒数
 * @returns {Promise} Promise对象
 */
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * 使用 MinIO 上传文件
 * @param {string} filePath 文件路径
 * @param {number} retryCount 当前重试次数
 * @returns {Promise<boolean>} 上传是否成功
 */
async function uploadFileToMinio(filePath, retryCount = 0) {
  try {
    const fileName = path.basename(filePath)
    const fileSize = fs.statSync(filePath).size
    const minioConfig = CONFIG.server.minio

    const retryText = retryCount > 0 ? ` (重试 ${retryCount}/${CONFIG.behavior.retryCount})` : ''
    console.log(
      `📤 开始上传到 MinIO: ${fileName} (${(fileSize / 1024 / 1024).toFixed(2)} MB)${retryText}`
    )

    // 创建 MinIO 客户端
    const minioClient = createMinioClient(minioConfig)

    // 确保存储桶存在
    const bucketReady = await ensureBucketExists(minioClient, minioConfig.bucketName)
    if (!bucketReady) {
      throw new Error('存储桶准备失败')
    }

    // 构建对象名称
    const objectName = minioConfig.pathPrefix
      ? path.posix.join(minioConfig.pathPrefix, fileName)
      : fileName

    // 上传文件
    const uploadResult = await minioClient.fPutObject(
      minioConfig.bucketName,
      objectName,
      filePath,
      {
        'Content-Type': 'application/octet-stream',
        'X-Uploaded-By': 'why-talk-auto-upload',
        'X-Upload-Time': new Date().toISOString()
      }
    )

    console.log(`✅ 上传成功: ${fileName}`)
    if (CONFIG.logging.verbose) {
      console.log(`   对象名称: ${objectName}`)
      console.log(`   ETag: ${uploadResult.etag}`)
    }

    // 如果配置了上传后删除本地文件
    if (CONFIG.behavior.deleteAfterUpload) {
      try {
        fs.unlinkSync(filePath)
        console.log(`🗑️  已删除本地文件: ${fileName}`)
      } catch (deleteError) {
        console.warn(`⚠️  删除本地文件失败: ${fileName}`, deleteError.message)
      }
    }

    return true
  } catch (error) {
    console.error(`❌ 上传文件到 MinIO 时发生错误: ${path.basename(filePath)}`)
    if (CONFIG.logging.verbose) {
      console.error('错误详情:', error.message)
    }

    // 如果启用重试且还有重试次数
    if (CONFIG.behavior.retry && retryCount < CONFIG.behavior.retryCount) {
      console.log(`⏳ ${CONFIG.behavior.retryDelay / 1000} 秒后重试...`)
      await delay(CONFIG.behavior.retryDelay)
      return uploadFileToMinio(filePath, retryCount + 1)
    }

    return false
  }
}

/**
 * 使用 HTTP 上传文件（备用方案）
 * @param {string} filePath 文件路径
 * @param {number} retryCount 当前重试次数
 * @returns {Promise<boolean>} 上传是否成功
 */
async function uploadFileToHttp(filePath, retryCount = 0) {
  try {
    const fileName = path.basename(filePath)
    const fileSize = fs.statSync(filePath).size
    const httpConfig = CONFIG.server.http

    const retryText = retryCount > 0 ? ` (重试 ${retryCount}/${CONFIG.behavior.retryCount})` : ''
    console.log(
      `📤 开始上传到 HTTP: ${fileName} (${(fileSize / 1024 / 1024).toFixed(2)} MB)${retryText}`
    )

    const form = new FormData()
    form.append('file', fs.createReadStream(filePath), {
      filename: fileName,
      contentType: 'application/octet-stream'
    })

    const headers = {
      ...form.getHeaders(),
      ...httpConfig.headers
    }

    const response = await fetch(httpConfig.url, {
      method: 'POST',
      body: form,
      timeout: httpConfig.timeout,
      headers: headers
    })

    if (response.ok) {
      console.log(`✅ 上传成功: ${fileName}`)

      // 如果配置了上传后删除本地文件
      if (CONFIG.behavior.deleteAfterUpload) {
        try {
          fs.unlinkSync(filePath)
          console.log(`🗑️  已删除本地文件: ${fileName}`)
        } catch (deleteError) {
          console.warn(`⚠️  删除本地文件失败: ${fileName}`, deleteError.message)
        }
      }

      return true
    } else {
      const errorText = await response.text()
      console.error(`❌ 上传失败: ${fileName}, 状态码: ${response.status}`)
      if (CONFIG.logging.verbose) {
        console.error('错误详情:', errorText)
      }

      // 如果启用重试且还有重试次数
      if (CONFIG.behavior.retry && retryCount < CONFIG.behavior.retryCount) {
        console.log(`⏳ ${CONFIG.behavior.retryDelay / 1000} 秒后重试...`)
        await delay(CONFIG.behavior.retryDelay)
        return uploadFileToHttp(filePath, retryCount + 1)
      }

      return false
    }
  } catch (error) {
    console.error(`❌ 上传文件到 HTTP 时发生错误: ${path.basename(filePath)}`)
    if (CONFIG.logging.verbose) {
      console.error('错误详情:', error.message)
    }

    // 如果启用重试且还有重试次数
    if (CONFIG.behavior.retry && retryCount < CONFIG.behavior.retryCount) {
      console.log(`⏳ ${CONFIG.behavior.retryDelay / 1000} 秒后重试...`)
      await delay(CONFIG.behavior.retryDelay)
      return uploadFileToHttp(filePath, retryCount + 1)
    }

    return false
  }
}

/**
 * 上传文件（根据配置选择上传方式）
 * @param {string} filePath 文件路径
 * @returns {Promise<boolean>} 上传是否成功
 */
async function uploadFile(filePath) {
  if (CONFIG.server.type === 'minio') {
    return uploadFileToMinio(filePath)
  } else {
    return uploadFileToHttp(filePath)
  }
}

/**
 * 获取用户确认
 * @param {string} message 确认消息
 * @returns {Promise<boolean>} 用户是否确认
 */
async function getUserConfirmation(message) {
  const readline = require('readline')
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  return new Promise((resolve) => {
    rl.question(`${message} (y/N): `, (answer) => {
      rl.close()
      resolve(answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes')
    })
  })
}

/**
 * 验证 MinIO 配置
 * @returns {boolean} 配置是否有效
 */
function validateMinioConfig() {
  const minioConfig = CONFIG.server.minio

  if (!minioConfig.accessKey || minioConfig.accessKey === 'your-access-key') {
    console.error('❌ MinIO 访问密钥未配置，请在 upload.config.js 中设置 accessKey')
    return false
  }

  if (!minioConfig.secretKey || minioConfig.secretKey === 'your-secret-key') {
    console.error('❌ MinIO 密钥未配置，请在 upload.config.js 中设置 secretKey')
    return false
  }

  if (!minioConfig.bucketName) {
    console.error('❌ MinIO 存储桶名称未配置，请在 upload.config.js 中设置 bucketName')
    return false
  }

  return true
}

/**
 * 主函数：上传所有构建产物
 */
async function main() {
  console.log('🚀 开始上传 Electron 构建产物...')

  const serverType = CONFIG.server.type
  console.log('上传方式:', serverType === 'minio' ? 'MinIO S3 兼容存储' : 'HTTP 服务器')

  if (serverType === 'minio') {
    const minioConfig = CONFIG.server.minio
    console.log(
      'MinIO 服务器:',
      `${minioConfig.useSSL ? 'https' : 'http'}://${minioConfig.endPoint}:${minioConfig.port}`
    )
    console.log('存储桶:', minioConfig.bucketName)

    // 验证 MinIO 配置
    if (!validateMinioConfig()) {
      console.log('\n💡 配置示例:')
      console.log('在 upload.config.js 中设置:')
      console.log('  minio: {')
      console.log('    accessKey: "your-minio-username",')
      console.log('    secretKey: "your-minio-password",')
      console.log('    bucketName: "electron-updates"')
      console.log('  }')
      process.exit(1)
    }
  } else {
    console.log('HTTP 服务器:', CONFIG.server.http.url)
  }

  console.log('构建目录:', DIST_DIR)

  if (CONFIG.logging.verbose) {
    console.log('\n📋 当前配置:')
    console.log(`  - 重试机制: ${CONFIG.behavior.retry ? '启用' : '禁用'}`)
    console.log(`  - 重试次数: ${CONFIG.behavior.retryCount}`)
    console.log(`  - 上传后删除: ${CONFIG.behavior.deleteAfterUpload ? '是' : '否'}`)
    console.log(`  - 支持的扩展名: ${CONFIG.files.extensions.join(', ')}`)
  }

  const files = getBuildArtifacts()

  if (files.length === 0) {
    console.log('⚠️  没有找到需要上传的文件')
    console.log('请确保已经执行了构建命令，并且构建产物存在于 dist 目录中')
    return
  }

  console.log(`\n📦 找到 ${files.length} 个文件需要上传:`)
  let totalSize = 0
  files.forEach((file) => {
    const fileName = path.basename(file)
    const fileSize = fs.statSync(file).size
    totalSize += fileSize
    console.log(`  - ${fileName} (${(fileSize / 1024 / 1024).toFixed(2)} MB)`)
  })

  console.log(`📊 总大小: ${(totalSize / 1024 / 1024).toFixed(2)} MB`)

  // 如果配置了需要确认
  if (CONFIG.behavior.confirmBeforeUpload) {
    const confirmed = await getUserConfirmation('\n是否继续上传这些文件？')
    if (!confirmed) {
      console.log('❌ 用户取消了上传操作')
      return
    }
  }

  console.log('\n🔄 开始上传文件...')
  const startTime = Date.now()
  let successCount = 0
  let failCount = 0

  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    console.log(`\n[${i + 1}/${files.length}] 处理文件: ${path.basename(file)}`)

    const success = await uploadFile(file)
    if (success) {
      successCount++
    } else {
      failCount++
    }
  }

  const endTime = Date.now()
  const duration = ((endTime - startTime) / 1000).toFixed(2)

  console.log('\n' + '='.repeat(50))
  console.log('📊 上传结果统计:')
  console.log(`✅ 成功: ${successCount} 个文件`)
  console.log(`❌ 失败: ${failCount} 个文件`)
  console.log(`⏱️  总耗时: ${duration} 秒`)

  if (failCount > 0) {
    console.log('\n⚠️  部分文件上传失败，请检查网络连接和服务器状态')
    console.log('💡 提示: 可以重新运行此脚本来重试失败的上传')
    process.exit(1)
  } else {
    console.log('\n🎉 所有文件上传完成！')
    if (serverType === 'minio') {
      const minioConfig = CONFIG.server.minio
      console.log(`🌐 文件已上传到 MinIO 存储桶: ${minioConfig.bucketName}`)
    } else {
      console.log(`🌐 文件已上传到: ${CONFIG.server.http.url}`)
    }
  }
}

// 执行主函数
if (require.main === module) {
  main().catch((error) => {
    console.error('❌ 上传过程中发生未处理的错误:', error)
    process.exit(1)
  })
}

module.exports = { uploadFile, getBuildArtifacts, main }
