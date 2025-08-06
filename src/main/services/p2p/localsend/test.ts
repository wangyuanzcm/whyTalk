import { LocalSendP2PManager } from '../LocalSendP2PManager'

/**
 * LocalSend集成测试
 */
async function testLocalSendIntegration() {
  console.log('开始测试LocalSend集成...')

  try {
    // 创建LocalSend P2P管理器
    const p2pManager = new LocalSendP2PManager()

    // 启动服务
    console.log('启动LocalSend服务...')
    await p2pManager.start()

    // 获取本地设备信息
    const deviceInfo = p2pManager.getLocalDeviceInfo()
    console.log('本地设备信息:', deviceInfo)

    // 获取服务状态
    const status = p2pManager.getStatus()
    console.log('服务状态:', status)

    // 监听设备发现事件
    p2pManager.on('peer:discovered', (peer) => {
      console.log('发现新设备:', peer)
    })

    // 监听消息接收事件
    p2pManager.on('message:received', (message) => {
      console.log('收到消息:', message)
    })

    console.log('LocalSend服务已启动，等待设备发现...')

    // 等待10秒后停止服务
    setTimeout(async () => {
      console.log('停止LocalSend服务...')
      await p2pManager.stop()
      console.log('测试完成')
    }, 10000)
  } catch (error) {
    console.error('测试失败:', error)
  }
}

// 如果直接运行此文件，则执行测试
if (require.main === module) {
  testLocalSendIntegration()
}

export { testLocalSendIntegration }
