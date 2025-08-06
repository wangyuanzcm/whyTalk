/**
 * 多用户账号创建脚本
 * 为每个P2P客户端创建独立的用户账号
 *
 * 使用方法: npm run create-users
 */

const { app, BrowserWindow } = require('electron')
const path = require('path')
const fs = require('fs')

// 用户配置
const USERS = [
  {
    clientId: 1,
    nickname: 'Alice',
    mobile: '13800138001',
    password: '123456',
    userDataDir: 'userData-client-1'
  },
  {
    clientId: 2,
    nickname: 'Bob',
    mobile: '13800138002',
    password: '123456',
    userDataDir: 'userData-client-2'
  },
  {
    clientId: 3,
    nickname: 'Charlie',
    mobile: '13800138003',
    password: '123456',
    userDataDir: 'userData-client-3'
  },
  {
    clientId: 4,
    nickname: 'Diana',
    mobile: '13800138004',
    password: '123456',
    userDataDir: 'userData-client-4'
  }
]

async function createUserForClient(userConfig) {
  const { clientId, nickname, mobile, password, userDataDir } = userConfig

  console.log(`\n=== 为客户端 ${clientId} 创建用户 ===`)
  console.log(`用户名: ${nickname}`)
  console.log(`手机号: ${mobile}`)
  console.log(`数据目录: ${userDataDir}`)

  try {
    // 确保用户数据目录存在
    const userDataPath = path.join(__dirname, userDataDir)
    if (!fs.existsSync(userDataPath)) {
      fs.mkdirSync(userDataPath, { recursive: true })
      console.log(`✓ 创建用户数据目录: ${userDataPath}`)
    }

    // 设置应用数据路径到对应的客户端目录
    app.setPath('userData', userDataPath)

    // 动态导入服务（每次都重新导入以使用新的数据路径）
    delete require.cache[require.resolve('./out/main/services/auth/AuthService')]
    delete require.cache[require.resolve('./out/main/services/database/Database')]

    const { authService } = require('./out/main/services/auth/AuthService')
    const { databaseManager } = require('./out/main/services/database/Database')

    // 初始化数据库
    await databaseManager.initialize()
    console.log('✓ 数据库初始化完成')

    // 检查用户是否已存在
    const db = databaseManager.getDatabase()
    const existingUser = db.prepare('SELECT * FROM users WHERE mobile = ?').get(mobile)

    if (existingUser) {
      console.log(`✓ 用户 ${nickname} (${mobile}) 已存在`)
      console.log(`  用户ID: ${existingUser.id}`)
      console.log(`  昵称: ${existingUser.nickname}`)
      return existingUser
    }

    // 创建新用户
    const registerRequest = {
      nickname: nickname,
      mobile: mobile,
      password: password,
      platform: 'desktop',
      sms_code: '123456' // 跳过短信验证
    }

    const result = await authService.register(registerRequest)
    console.log('✓ 用户创建成功')

    // 验证用户创建
    const newUser = db.prepare('SELECT * FROM users WHERE mobile = ?').get(mobile)
    console.log(`  用户ID: ${newUser.id}`)
    console.log(`  昵称: ${newUser.nickname}`)
    console.log(`  手机号: ${newUser.mobile}`)

    return newUser
  } catch (error) {
    console.error(`✗ 为客户端 ${clientId} 创建用户失败:`, error.message)
    throw error
  }
}

async function createAllUsers() {
  console.log('========================================')
  console.log('WhyTalk 多用户账号创建工具')
  console.log('========================================')

  const createdUsers = []

  for (const userConfig of USERS) {
    try {
      const user = await createUserForClient(userConfig)
      createdUsers.push({
        ...userConfig,
        userId: user.id,
        created: true
      })
    } catch (error) {
      createdUsers.push({
        ...userConfig,
        created: false,
        error: error.message
      })
    }
  }

  // 输出总结
  console.log('\n========================================')
  console.log('用户创建总结')
  console.log('========================================')

  createdUsers.forEach((user) => {
    const status = user.created ? '✓' : '✗'
    console.log(`${status} 客户端 ${user.clientId}: ${user.nickname} (${user.mobile})`)
    if (!user.created) {
      console.log(`    错误: ${user.error}`)
    }
  })

  console.log('\n登录信息:')
  createdUsers
    .filter((u) => u.created)
    .forEach((user) => {
      console.log(`  客户端 ${user.clientId} - 手机号: ${user.mobile}, 密码: ${user.password}`)
    })

  // 生成登录配置文件
  const loginConfig = {
    users: createdUsers
      .filter((u) => u.created)
      .map((user) => ({
        clientId: user.clientId,
        nickname: user.nickname,
        mobile: user.mobile,
        password: user.password,
        userDataDir: user.userDataDir
      })),
    instructions: [
      '1. 启动对应的客户端',
      '2. 使用对应的手机号和密码登录',
      '3. 每个客户端将有独立的用户身份和P2P节点ID'
    ]
  }

  fs.writeFileSync(
    path.join(__dirname, 'multi-user-config.json'),
    JSON.stringify(loginConfig, null, 2)
  )

  console.log('\n✓ 登录配置已保存到: multi-user-config.json')

  app.quit()
}

// 等待应用准备就绪
app.whenReady().then(() => {
  // 创建隐藏窗口
  const win = new BrowserWindow({
    show: false,
    webPreferences: {
      nodeIntegration: true
    }
  })

  createAllUsers().catch((error) => {
    console.error('创建用户过程中发生错误:', error)
    app.quit()
  })
})
