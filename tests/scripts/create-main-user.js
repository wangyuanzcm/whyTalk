/**
 * 简单的用户创建脚本 - 直接操作主数据库
 */

const Database = require('better-sqlite3')
const bcrypt = require('bcryptjs')
const path = require('path')
const fs = require('fs')

// 测试用户配置
const TEST_USERS = [
  {
    nickname: '测试用户1',
    mobile: '13800138001',
    password: '123456'
  },
  {
    nickname: '测试用户2',
    mobile: '13800138002',
    password: '123456'
  },
  {
    nickname: '测试用户3',
    mobile: '13800138003',
    password: '123456'
  },
  {
    nickname: '测试用户4',
    mobile: '13800138004',
    password: '123456'
  }
]

async function createUsersInMainDB() {
  console.log('========================================')
  console.log('WhyTalk 主数据库用户创建工具')
  console.log('========================================')

  try {
    // 主数据库路径
    const dbPath = path.join(__dirname, 'userData', 'whytalk.db')

    if (!fs.existsSync(dbPath)) {
      console.log('✗ 主数据库不存在:', dbPath)
      console.log('请先启动应用程序以初始化数据库')
      return
    }

    console.log('✓ 连接到主数据库:', dbPath)
    const db = new Database(dbPath)

    // 检查用户表是否存在
    const tableExists = db
      .prepare(
        `
      SELECT name FROM sqlite_master 
      WHERE type='table' AND name='users'
    `
      )
      .get()

    if (!tableExists) {
      console.log('✗ 用户表不存在，请先启动应用程序以初始化数据库')
      db.close()
      return
    }

    console.log('✓ 用户表存在，开始创建用户...\n')

    const createdUsers = []

    for (const userConfig of TEST_USERS) {
      const { nickname, mobile, password } = userConfig

      console.log(`创建用户: ${nickname} (${mobile})`)

      try {
        // 检查用户是否已存在
        const existingUser = db.prepare('SELECT * FROM users WHERE mobile = ?').get(mobile)

        if (existingUser) {
          console.log(`  ✓ 用户已存在 (ID: ${existingUser.id})`)
          createdUsers.push({
            ...userConfig,
            userId: existingUser.id,
            created: false,
            existed: true
          })
          continue
        }

        // 加密密码
        const hashedPassword = await bcrypt.hash(password, 10)

        // 创建新用户
        const insertUser = db.prepare(`
          INSERT INTO users (mobile, nickname, password, status, created_at, updated_at)
          VALUES (?, ?, ?, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        `)

        const result = insertUser.run(mobile, nickname, hashedPassword)
        console.log(`  ✓ 用户创建成功 (ID: ${result.lastInsertRowid})`)

        createdUsers.push({
          ...userConfig,
          userId: result.lastInsertRowid,
          created: true,
          existed: false
        })
      } catch (error) {
        console.log(`  ✗ 创建失败: ${error.message}`)
        createdUsers.push({
          ...userConfig,
          created: false,
          existed: false,
          error: error.message
        })
      }
    }

    db.close()

    // 输出总结
    console.log('\n========================================')
    console.log('用户创建总结')
    console.log('========================================')

    createdUsers.forEach((user) => {
      let status = '✗'
      let statusText = '失败'

      if (user.existed) {
        status = '✓'
        statusText = '已存在'
      } else if (user.created) {
        status = '✓'
        statusText = '新创建'
      }

      console.log(`${status} ${user.nickname} (${user.mobile}) - ${statusText}`)
      if (user.error) {
        console.log(`    错误: ${user.error}`)
      }
    })

    console.log('\n登录信息:')
    const availableUsers = createdUsers.filter((u) => u.created || u.existed)
    availableUsers.forEach((user) => {
      console.log(`  手机号: ${user.mobile}, 密码: ${user.password}`)
    })

    if (availableUsers.length > 0) {
      console.log('\n✓ 用户创建完成！现在可以启动应用程序并使用上述账号登录')
    } else {
      console.log('\n✗ 没有可用的用户账号')
    }
  } catch (error) {
    console.error('创建用户过程中发生错误:', error)
    process.exit(1)
  }
}

// 运行脚本
createUsersInMainDB()
