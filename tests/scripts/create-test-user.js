const { app, BrowserWindow } = require('electron')
const path = require('path')

// 设置应用路径
app.setPath('userData', path.join(__dirname, 'userData'))

async function createTestUser() {
  try {
    console.log('正在初始化数据库...')
    
    // 导入服务
    const { authService } = require('./out/main/services/auth/AuthService')
    const { databaseManager } = require('./out/main/services/database/Database')
    
    await databaseManager.initialize()
    
    console.log('正在创建测试用户...')
    
    const registerRequest = {
      nickname: '测试用户',
      mobile: '13800138000',
      password: '123456',
      platform: 'desktop',
      sms_code: '123456' // 这个会被跳过验证
    }
    
    await authService.register(registerRequest)
    console.log('测试用户创建成功！')
    console.log('手机号: 13800138000')
    console.log('密码: 123456')
    
    // 验证用户是否创建成功
    const db = databaseManager.getDatabase()
    const user = db.prepare('SELECT * FROM users WHERE mobile = ?').get('13800138000')
    console.log('用户信息:', user)
    
    app.quit()
  } catch (error) {
    console.error('创建测试用户失败:', error)
    app.quit()
  }
}

// 等待应用准备就绪
app.whenReady().then(() => {
  // 创建一个隐藏的窗口（Electron 需要至少一个窗口）
  const win = new BrowserWindow({
    show: false,
    webPreferences: {
      nodeIntegration: true
    }
  })
  
  createTestUser()
})