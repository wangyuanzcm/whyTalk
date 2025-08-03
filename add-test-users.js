/**
 * 添加四个测试用户到主数据库
 * 使用应用程序的 IPC API 来创建用户
 */

const { app } = require('electron')
const path = require('path')

// 四个测试用户配置
const TEST_USERS = [
  {
    nickname: 'Alice',
    mobile: '13800138001',
    password: '123456'
  },
  {
    nickname: 'Bob',
    mobile: '13800138002', 
    password: '123456'
  },
  {
    nickname: 'Charlie',
    mobile: '13800138003',
    password: '123456'
  },
  {
    nickname: 'Diana',
    mobile: '13800138004',
    password: '123456'
  }
]

async function addTestUsers() {
  console.log('========================================')
  console.log('WhyTalk 测试用户添加工具')
  console.log('========================================')
  
  try {
    // 设置应用路径
    app.setPath('userData', path.join(__dirname, 'userData'))
    
    // 等待应用准备就绪
    await app.whenReady()
    
    console.log('正在初始化服务...')
    
    // 导入服务 - 使用源文件
    const { authService } = require('./src/main/services/auth/AuthService')
    const { databaseManager } = require('./src/main/services/database/Database')
    
    // 初始化数据库
    await databaseManager.initialize()
    console.log('✓ 数据库初始化完成')
    
    const createdUsers = []
    
    for (const userConfig of TEST_USERS) {
      const { nickname, mobile, password } = userConfig
      
      console.log(`\n创建用户: ${nickname} (${mobile})`)
      
      try {
        // 检查用户是否已存在
        const db = databaseManager.getDatabase()
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
        
        // 创建注册请求
        const registerRequest = {
          nickname: nickname,
          mobile: mobile,
          password: password,
          platform: 'desktop',
          sms_code: '123456' // 这个会被跳过验证
        }
        
        // 使用认证服务创建用户
        const result = await authService.register(registerRequest)
        console.log(`  ✓ 用户创建成功 (ID: ${result.user.id})`)
        
        createdUsers.push({
          ...userConfig,
          userId: result.user.id,
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
    
    // 输出总结
    console.log('\n========================================')
    console.log('用户创建总结')
    console.log('========================================')
    
    createdUsers.forEach(user => {
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
    const availableUsers = createdUsers.filter(u => u.created || u.existed)
    availableUsers.forEach(user => {
      console.log(`  ${user.nickname}: ${user.mobile} / 密码: ${user.password}`)
    })
    
    if (availableUsers.length > 0) {
      console.log('\n✓ 用户创建完成！现在可以在登录页面使用这些账号')
    } else {
      console.log('\n✗ 没有可用的用户账号')
    }
    
    app.quit()
    
  } catch (error) {
    console.error('创建用户过程中发生错误:', error)
    app.quit()
  }
}

// 运行脚本
addTestUsers()