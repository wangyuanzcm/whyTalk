/**
 * 更新功能测试脚本
 * 用于测试自动更新功能是否正常工作
 */

const { app, BrowserWindow } = require('electron')
const path = require('path')

// 测试更新服务
async function testUpdateService() {
  console.log('开始测试更新服务...')
  
  try {
    // 动态导入更新服务
    const { updaterService } = await import('../out/main/services/updater/UpdaterService.js')
    
    console.log('✓ 更新服务导入成功')
    
    // 初始化更新服务
    await updaterService.initialize()
    console.log('✓ 更新服务初始化成功')
    
    // 获取当前版本
    const version = updaterService.getVersion()
    console.log(`✓ 当前版本: ${version}`)
    
    // 获取更新状态
    const status = updaterService.getStatus()
    console.log(`✓ 更新状态: ${JSON.stringify(status, null, 2)}`)
    
    // 测试配置获取
    const config = updaterService.getConfig()
    console.log(`✓ 更新配置: ${JSON.stringify(config, null, 2)}`)
    
    console.log('✅ 更新服务测试完成')
    
  } catch (error) {
    console.error('❌ 更新服务测试失败:', error)
  }
}

// 测试更新配置
function testUpdateConfig() {
  console.log('开始测试更新配置...')
  
  try {
    // 测试环境变量
    const envVars = [
      'UPDATE_SERVER_URL',
      'UPDATE_CHECK_INTERVAL',
      'UPDATE_AUTO_DOWNLOAD',
      'UPDATE_CHANNEL',
      'UPDATE_ALLOW_PRERELEASE'
    ]
    
    envVars.forEach(envVar => {
      const value = process.env[envVar]
      console.log(`${envVar}: ${value || '未设置'}`)
    })
    
    console.log('✅ 更新配置测试完成')
    
  } catch (error) {
    console.error('❌ 更新配置测试失败:', error)
  }
}

// 测试electron-updater依赖
function testElectronUpdater() {
  console.log('开始测试electron-updater依赖...')
  
  try {
    const { autoUpdater } = require('electron-updater')
    console.log('✓ electron-updater导入成功')
    
    // 检查autoUpdater对象
    console.log(`✓ autoUpdater版本: ${autoUpdater.constructor.name}`)
    console.log(`✓ 当前应用版本: ${app.getVersion()}`)
    
    console.log('✅ electron-updater依赖测试完成')
    
  } catch (error) {
    console.error('❌ electron-updater依赖测试失败:', error)
  }
}

// 主测试函数
async function runTests() {
  console.log('='.repeat(50))
  console.log('WhyTalk 自动更新功能测试')
  console.log('='.repeat(50))
  
  // 测试基本依赖
  testElectronUpdater()
  console.log()
  
  // 测试配置
  testUpdateConfig()
  console.log()
  
  // 等待应用准备就绪
  await app.whenReady()
  
  // 测试更新服务
  await testUpdateService()
  
  console.log('='.repeat(50))
  console.log('测试完成')
  console.log('='.repeat(50))
  
  // 退出应用
  setTimeout(() => {
    app.quit()
  }, 1000)
}

// 应用事件处理
app.whenReady().then(() => {
  runTests().catch(console.error)
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    // 测试模式下不创建窗口
  }
})