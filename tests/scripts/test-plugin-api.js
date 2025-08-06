// 测试插件API的脚本
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

// 导入插件管理器
const { PluginManager } = require('./out/main/plugin/PluginManager.js')
const { PluginAPIHandler } = require('./out/main/plugin/PluginAPIHandler.js')

async function testPluginAPI() {
  try {
    console.log('初始化插件管理器...')
    const pluginManager = new PluginManager()
    await pluginManager.loadAllPlugins()

    console.log('测试 listPlugins 方法...')
    const result = await pluginManager.listPlugins()
    console.log('listPlugins 结果:', JSON.stringify(result, null, 2))

    if (result.success) {
      console.log(`成功获取 ${result.plugins.length} 个插件`)
      result.plugins.forEach((plugin) => {
        console.log(`- ${plugin.name} (${plugin.id}) - ${plugin.enabled ? '启用' : '禁用'}`)
      })
    } else {
      console.error('获取插件列表失败:', result.error)
    }
  } catch (error) {
    console.error('测试失败:', error)
    console.error('错误堆栈:', error.stack)
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  testPluginAPI()
}

module.exports = { testPluginAPI }
