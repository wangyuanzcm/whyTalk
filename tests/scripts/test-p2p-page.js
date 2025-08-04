const { app, BrowserWindow } = require('electron')
const path = require('path')

// 测试 P2P 页面访问
async function testP2PPage() {
  console.log('=== P2P 页面访问测试 ===')
  
  // 等待应用准备就绪
  await app.whenReady()
  
  // 创建测试窗口
  const testWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    show: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'out/preload/index.js')
    }
  })
  
  console.log('1. 测试窗口已创建')
  
  // 加载应用
  const isDev = process.env.NODE_ENV === 'development'
  if (isDev) {
    testWindow.loadURL('http://localhost:5173')
  } else {
    testWindow.loadFile(path.join(__dirname, 'out/renderer/index.html'))
  }
  
  console.log('2. 应用已加载')
  
  // 等待页面加载完成
  await new Promise(resolve => {
    testWindow.webContents.once('did-finish-load', resolve)
  })
  
  console.log('3. 页面加载完成')
  
  // 等待一段时间让应用完全初始化
  await new Promise(resolve => setTimeout(resolve, 3000))
  
  try {
    // 尝试导航到 P2P 页面
    console.log('4. 尝试导航到 P2P 页面...')
    
    await testWindow.webContents.executeJavaScript(`
      // 检查路由是否存在
      if (window.location.hash.includes('#/') || window.location.pathname) {
        console.log('当前路径:', window.location.href)
        
        // 尝试导航到 P2P 页面
        if (window.$router) {
          window.$router.push('/p2p').then(() => {
            console.log('成功导航到 P2P 页面')
          }).catch(error => {
            console.error('导航失败:', error)
          })
        } else {
          // 直接修改 hash
          window.location.hash = '#/p2p'
          console.log('通过 hash 导航到 P2P 页面')
        }
        
        return '导航命令已发送'
      } else {
        return '路由系统未就绪'
      }
    `)
    
    console.log('5. 导航命令已执行')
    
    // 等待导航完成
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // 检查页面内容
    const pageInfo = await testWindow.webContents.executeJavaScript(`
      ({
        url: window.location.href,
        title: document.title,
        hasP2PContent: document.querySelector('.p2p-manager') !== null,
        hasP2PAlert: document.querySelector('.n-alert') !== null,
        bodyText: document.body.innerText.substring(0, 200)
      })
    `)
    
    console.log('6. 页面检查结果:')
    console.log('   URL:', pageInfo.url)
    console.log('   标题:', pageInfo.title)
    console.log('   包含P2P内容:', pageInfo.hasP2PContent)
    console.log('   包含状态提示:', pageInfo.hasP2PAlert)
    console.log('   页面内容预览:', pageInfo.bodyText)
    
    if (pageInfo.hasP2PContent) {
      console.log('✅ P2P 页面访问成功！')
      console.log('✅ P2P 管理界面已正常显示')
    } else {
      console.log('⚠️ P2P 页面可能未完全加载')
    }
    
  } catch (error) {
    console.log('❌ P2P 页面访问测试失败:', error.message)
  }
  
  console.log('\n=== 测试完成 ===')
  console.log('P2P 页面现在应该可以通过以下方式访问:')
  console.log('1. 在应用中导航到 /p2p 路径')
  console.log('2. 直接在地址栏输入 #/p2p (如果使用 hash 路由)')
  console.log('3. 通过程序化导航: router.push("/p2p")')
  
  // 保持窗口打开以便手动测试
  console.log('\n测试窗口将保持打开，你可以手动测试 P2P 页面功能')
}

// 如果直接运行此脚本
if (require.main === module) {
  testP2PPage().catch(console.error)
}

module.exports = { testP2PPage }