const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

// 创建测试窗口
function createTestWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'src/preload/index.js')
    }
  })

  // 加载应用
  if (process.env.NODE_ENV === 'development') {
    win.loadURL('http://localhost:5173')
    win.webContents.openDevTools()
  } else {
    win.loadFile(path.join(__dirname, 'dist/index.html'))
  }

  return win
}

// 测试P2P API
async function testP2PAPIs() {
  console.log('开始测试P2P功能...')
  
  try {
    // 模拟IPC请求
    const testRequests = [
      { url: '/api/v1/p2p/status', method: 'GET' },
      { url: '/api/v1/p2p/peers', method: 'GET' },
      { url: '/api/v1/p2p/contact/list', method: 'GET' }
    ]

    for (const request of testRequests) {
      console.log(`测试 ${request.method} ${request.url}`)
      // 这里可以添加实际的测试逻辑
    }

    console.log('P2P功能测试完成')
  } catch (error) {
    console.error('P2P功能测试失败:', error)
  }
}

// 应用准备就绪时
app.whenReady().then(() => {
  createTestWindow()
  
  // 延迟执行测试，等待服务初始化
  setTimeout(testP2PAPIs, 3000)
})

// 所有窗口关闭时退出应用
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createTestWindow()
  }
})

console.log('P2P测试应用启动中...')