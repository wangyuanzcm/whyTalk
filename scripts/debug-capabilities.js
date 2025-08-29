/**
 * 调试脚本：检查全局能力注册表中的能力
 */
const { app, ipcMain } = require('electron')
const path = require('path')

// 等待应用准备就绪
app.whenReady().then(async () => {
  try {
    // 动态导入GlobalCapabilityRegistry
    const { globalCapabilityRegistry } = await import(
      './src/main/services/plugin/GlobalCapabilityRegistry.js'
    )

    console.log('\n========== 全局能力注册表调试信息 ==========')

    // 获取所有已注册的能力
    const capabilities = globalCapabilityRegistry.listCapabilities()
    console.log(`\n总共注册了 ${capabilities.length} 个能力:`)

    if (capabilities.length === 0) {
      console.log('❌ 没有找到任何已注册的能力')
    } else {
      capabilities.forEach((cap, index) => {
        console.log(`\n${index + 1}. 能力ID: ${cap.id}`)
        console.log(`   插件ID: ${cap.pluginId}`)
        console.log(`   函数名: ${cap.name}`)
        console.log(`   描述: ${cap.description || '无描述'}`)
        console.log(`   分类: ${cap.category || '未分类'}`)
        console.log(`   注册时间: ${new Date(cap.registeredAt).toLocaleString()}`)
        console.log(`   调用次数: ${cap.invocationCount}`)
      })
    }

    // 特别检查unified-example.calculate
    const targetCapability = 'unified-example.calculate'
    const hasTarget = globalCapabilityRegistry.hasCapability(targetCapability)
    console.log(`\n========== 目标能力检查 ==========`)
    console.log(`能力 '${targetCapability}' 是否存在: ${hasTarget ? '✅ 是' : '❌ 否'}`)

    if (hasTarget) {
      const capInfo = globalCapabilityRegistry.getCapabilityInfo(targetCapability)
      console.log('能力详细信息:', JSON.stringify(capInfo, null, 2))
    }

    // 检查unified-example插件的所有能力
    const unifiedCapabilities = globalCapabilityRegistry.getPluginCapabilities('unified-example')
    console.log(`\nunified-example插件的所有能力 (${unifiedCapabilities.length}个):`)
    unifiedCapabilities.forEach((cap) => {
      console.log(`  - ${cap.id} (${cap.name})`)
    })

    console.log('\n========== 调试完成 ==========\n')

    // 退出应用
    process.exit(0)
  } catch (error) {
    console.error('调试过程中出现错误:', error)
    process.exit(1)
  }
})

// 处理应用退出
app.on('window-all-closed', () => {
  app.quit()
})
