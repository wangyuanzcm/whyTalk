// 在 Electron 应用的开发者工具控制台中运行此脚本
// 用于创建四个测试用户

const TEST_USERS = [
  { nickname: 'Alice', mobile: '13800138001', password: '123456' },
  { nickname: 'Bob', mobile: '13800138002', password: '123456' },
  { nickname: 'Charlie', mobile: '13800138003', password: '123456' },
  { nickname: 'Diana', mobile: '13800138004', password: '123456' }
]

async function createUser(userConfig) {
  const { nickname, mobile, password } = userConfig

  console.log(`开始创建用户: ${nickname} (${mobile})`)

  try {
    // 检查 window.electron 是否可用
    if (!window.electron || !window.electron.ipcRenderer) {
      throw new Error('Electron IPC API 不可用')
    }

    // 创建注册请求
    const registerRequest = {
      nickname: nickname,
      mobile: mobile,
      password: password,
      platform: 'desktop',
      sms_code: '123456' // 这个会被跳过验证
    }

    // 调用注册 API
    const result = await window.electron.ipcRenderer.invoke('auth:register', registerRequest)

    if (result.success) {
      console.log(`✓ 用户 ${nickname} 创建成功 (ID: ${result.user.id})`)
      return { success: true, user: result.user }
    } else {
      throw new Error(result.error || '注册失败')
    }
  } catch (error) {
    // 检查是否是用户已存在的错误
    if (error.message && error.message.includes('已存在')) {
      console.log(`ℹ 用户 ${nickname} 已存在`)
      return { success: true, existed: true }
    } else {
      console.log(`✗ 创建用户 ${nickname} 失败: ${error.message}`)
      return { success: false, error: error.message }
    }
  }
}

async function createAllUsers() {
  console.log('========================================')
  console.log('开始创建所有测试用户')
  console.log('========================================')

  const results = []

  for (let i = 0; i < TEST_USERS.length; i++) {
    const result = await createUser(TEST_USERS[i])
    results.push(result)

    // 添加延迟避免过快的请求
    if (i < TEST_USERS.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, 500))
    }
  }

  // 输出总结
  console.log('========================================')
  console.log('用户创建总结')
  console.log('========================================')

  const successCount = results.filter((r) => r.success).length
  const newCount = results.filter((r) => r.success && !r.existed).length
  const existedCount = results.filter((r) => r.existed).length
  const failedCount = results.filter((r) => !r.success).length

  console.log(`总计: ${TEST_USERS.length} 个用户`)
  console.log(`成功: ${successCount} 个 (新创建: ${newCount}, 已存在: ${existedCount})`)
  console.log(`失败: ${failedCount} 个`)

  if (successCount > 0) {
    console.log('')
    console.log('可用的登录账号:')
    TEST_USERS.forEach((user, index) => {
      if (results[index].success) {
        console.log(`  ${user.nickname}: ${user.mobile} / 密码: ${user.password}`)
      }
    })
  }

  console.log('========================================')
  console.log('用户创建完成！')

  return results
}

// 检查 Electron API 可用性
if (window.electron && window.electron.ipcRenderer) {
  console.log('✓ Electron IPC API 可用')
  console.log('运行 createAllUsers() 来创建所有测试用户')
} else {
  console.log('✗ Electron IPC API 不可用，请在 Electron 环境中运行此脚本')
}

// 导出函数供手动调用
window.createAllUsers = createAllUsers
window.createUser = createUser
