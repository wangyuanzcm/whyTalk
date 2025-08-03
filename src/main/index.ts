import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { initPlugins } from './plugin'
import { serviceManager } from './services'
import { authService } from './services/auth/AuthService'
import { databaseManager } from './services/database/Database'

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      contextIsolation: true,
      nodeIntegration: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
    
    // 在开发模式下打开开发者工具
    if (is.dev) {
      mainWindow.webContents.openDevTools()
    }
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async () => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  try {
    // 初始化服务
    await serviceManager.initialize()
    console.log('Services initialized successfully')
    
    // 创建测试用户（如果不存在）
    await createTestUserIfNotExists()
  } catch (error) {
    console.error('Failed to initialize services:', error instanceof Error ? error.message : String(error))
    app.quit()
    return
  }

  // IPC test
  ipcMain.handle('ping', () => 'pong')

  createWindow()
  
  // 注意：createWindow 不返回窗口实例，所以我们需要在创建后获取
  // 设置主窗口到服务管理器（用于P2P事件转发）
  // serviceManager.setMainWindow(mainWindow)

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  // 初始化插件系统
  initPlugins()
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// 应用退出时清理插件系统
app.on('before-quit', async () => {
  console.log('App is about to quit')
  try {
    await serviceManager.shutdown()
    console.log('Services shut down successfully')
  } catch (error) {
    console.error('Failed to shutdown services:', error instanceof Error ? error.message : String(error))
  }
})

// 创建测试用户（如果不存在）
async function createTestUserIfNotExists(): Promise<void> {
  try {
    const db = databaseManager.getDatabase()
    
    // 定义所有测试用户
    const testUsers = [
      { nickname: '测试用户', mobile: '13800138000', password: '123456' },
      { nickname: 'Alice', mobile: '13800138001', password: '123456' },
      { nickname: 'Bob', mobile: '13800138002', password: '123456' },
      { nickname: 'Charlie', mobile: '13800138003', password: '123456' },
      { nickname: 'Diana', mobile: '13800138004', password: '123456' }
    ]
    
    console.log('========================================')
    console.log('检查和创建测试用户')
    console.log('========================================')
    
    for (const userConfig of testUsers) {
      const { nickname, mobile, password } = userConfig
      
      // 检查用户是否已存在
      const existingUser = db.prepare('SELECT * FROM users WHERE mobile = ?').get(mobile) as any
      
      if (!existingUser) {
        console.log(`创建用户: ${nickname} (${mobile})`)
        
        try {
          const registerRequest = {
            nickname: nickname,
            mobile: mobile,
            password: password,
            platform: 'desktop',
            sms_code: '123456' // 这个会被跳过验证
          }
          
          await authService.register(registerRequest)
          console.log(`✓ 用户 ${nickname} 创建成功`)
        } catch (error) {
          console.error(`✗ 创建用户 ${nickname} 失败:`, error instanceof Error ? error.message : String(error))
        }
      } else {
        console.log(`✓ 用户 ${nickname} 已存在 (ID: ${existingUser.id})`)
      }
    }
    
    console.log('========================================')
    console.log('测试用户创建完成')
    console.log('========================================')
    
    // 测试第一个用户的登录
    console.log('Testing login with first test user...')
    try {
      const loginRequest = {
        mobile: '13800138000',
        password: '123456',
        platform: 'desktop'
      }
      const loginResult = await authService.login(loginRequest)
      console.log('Login test successful:', loginResult.user.nickname)
    } catch (loginError) {
      console.error('Login test failed:', loginError instanceof Error ? loginError.message : String(loginError))
    }
    
    // 输出所有可用的登录账号
    console.log('\n可用的登录账号:')
    for (const userConfig of testUsers) {
      console.log(`  ${userConfig.nickname}: ${userConfig.mobile} / 密码: ${userConfig.password}`)
    }
    console.log('========================================')
    
  } catch (error) {
    console.error('Failed to create test users:', error instanceof Error ? error.message : String(error))
  }
}

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
