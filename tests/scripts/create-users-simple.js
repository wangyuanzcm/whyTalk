/**
 * 简化的多用户账号创建脚本
 * 直接操作数据库创建用户，不依赖服务层
 */

const Database = require('better-sqlite3')
const bcrypt = require('bcryptjs')
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

// 数据库初始化SQL
const INIT_SQL = `
-- 用户表
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  mobile TEXT UNIQUE NOT NULL,
  nickname TEXT NOT NULL,
  password TEXT NOT NULL,
  avatar TEXT,
  email TEXT,
  status INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 会话表
CREATE TABLE IF NOT EXISTS sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  token TEXT UNIQUE NOT NULL,
  expires_at DATETIME NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users (id)
);

-- 联系人表
CREATE TABLE IF NOT EXISTS contacts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  contact_user_id INTEGER NOT NULL,
  nickname TEXT,
  remark TEXT,
  status INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users (id),
  FOREIGN KEY (contact_user_id) REFERENCES users (id),
  UNIQUE(user_id, contact_user_id)
);

-- 聊天记录表
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  from_user_id INTEGER NOT NULL,
  to_user_id INTEGER,
  group_id INTEGER,
  content TEXT NOT NULL,
  message_type INTEGER DEFAULT 1,
  status INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (from_user_id) REFERENCES users (id)
);

-- P2P节点表
CREATE TABLE IF NOT EXISTS p2p_nodes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  node_id TEXT UNIQUE NOT NULL,
  public_key TEXT,
  status INTEGER DEFAULT 1,
  last_seen DATETIME DEFAULT CURRENT_TIMESTAMP,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users (id)
);
`

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

    // 数据库文件路径
    const dbPath = path.join(userDataPath, 'app.db')

    // 连接数据库
    const db = new Database(dbPath)

    // 初始化数据库表
    db.exec(INIT_SQL)
    console.log('✓ 数据库初始化完成')

    // 检查用户是否已存在
    const existingUser = db.prepare('SELECT * FROM users WHERE mobile = ?').get(mobile)

    if (existingUser) {
      console.log(`✓ 用户 ${nickname} (${mobile}) 已存在`)
      console.log(`  用户ID: ${existingUser.id}`)
      console.log(`  昵称: ${existingUser.nickname}`)
      db.close()
      return existingUser
    }

    // 加密密码
    const hashedPassword = await bcrypt.hash(password, 10)

    // 创建新用户
    const insertUser = db.prepare(`
      INSERT INTO users (mobile, nickname, password, created_at, updated_at)
      VALUES (?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    `)

    const result = insertUser.run(mobile, nickname, hashedPassword)
    console.log('✓ 用户创建成功')

    // 验证用户创建
    const newUser = db.prepare('SELECT * FROM users WHERE id = ?').get(result.lastInsertRowid)
    console.log(`  用户ID: ${newUser.id}`)
    console.log(`  昵称: ${newUser.nickname}`)
    console.log(`  手机号: ${newUser.mobile}`)

    db.close()
    return newUser
  } catch (error) {
    console.error(`✗ 为客户端 ${clientId} 创建用户失败:`, error.message)
    throw error
  }
}

async function createAllUsers() {
  console.log('========================================')
  console.log('WhyTalk 多用户账号创建工具 (简化版)')
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

  console.log('\n下一步:')
  console.log('1. 运行: .\\Start-MultipleClients.ps1')
  console.log('2. 或手动启动客户端并使用上述登录信息')
}

// 运行脚本
createAllUsers().catch((error) => {
  console.error('创建用户过程中发生错误:', error)
  process.exit(1)
})
