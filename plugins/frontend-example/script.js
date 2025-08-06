// 前端插件示例脚本

// 检查插件API是否可用
if (typeof window.pluginAPI === 'undefined') {
  console.error('Plugin API not available')
  document.body.innerHTML =
    '<div style="padding: 20px; text-align: center; color: red;">插件API不可用，请确保在Why-Talk插件环境中运行</div>'
} else {
  console.log('Plugin API available:', window.pluginAPI)
  initializePlugin()
}

// 插件初始化
async function initializePlugin() {
  try {
    // 加载插件信息
    await loadPluginInfo()

    // 初始化事件监听器
    initializeEventListeners()

    // 加载权限状态
    await loadPermissions()

    // 监听来自主应用的消息
    window.pluginAPI.onMessage((message) => {
      console.log('Received message from main app:', message)
      displayResult('message-result', `收到消息: ${JSON.stringify(message, null, 2)}`)
    })

    console.log('Plugin initialized successfully')
  } catch (error) {
    console.error('Failed to initialize plugin:', error)
    displayError('plugin-info', `初始化失败: ${error.message}`)
  }
}

// 加载插件信息
async function loadPluginInfo() {
  try {
    const info = await window.pluginAPI.getPluginInfo()
    const infoElement = document.getElementById('plugin-info')

    infoElement.innerHTML = `
            <div class="info-item"><strong>名称:</strong> ${info.name}</div>
            <div class="info-item"><strong>版本:</strong> ${info.version}</div>
            <div class="info-item"><strong>描述:</strong> ${info.description}</div>
            <div class="info-item"><strong>作者:</strong> ${info.author}</div>
            <div class="info-item"><strong>插件ID:</strong> ${info.id}</div>
            <div class="info-item"><strong>路径:</strong> ${info.path}</div>
        `
  } catch (error) {
    displayError('plugin-info', `加载插件信息失败: ${error.message}`)
  }
}

// 初始化事件监听器
function initializeEventListeners() {
  // 通知功能
  document.getElementById('notify-btn').addEventListener('click', async () => {
    try {
      await window.pluginAPI.showNotification({
        title: '插件通知',
        body: '这是来自前端插件的通知消息！',
        icon: 'info'
      })
      console.log('Notification sent successfully')
    } catch (error) {
      console.error('Failed to send notification:', error)
      alert(`发送通知失败: ${error.message}`)
    }
  })

  document.getElementById('request-notification-permission').addEventListener('click', async () => {
    try {
      const granted = await window.pluginAPI.requestPermission('notifications')
      alert(granted ? '通知权限已授予' : '通知权限被拒绝')
      await loadPermissions() // 重新加载权限状态
    } catch (error) {
      alert(`请求权限失败: ${error.message}`)
    }
  })

  // 存储功能
  document.getElementById('storage-set').addEventListener('click', async () => {
    const key = document.getElementById('storage-key').value
    const value = document.getElementById('storage-value').value

    if (!key) {
      alert('请输入存储键')
      return
    }

    try {
      await window.pluginAPI.storage.set(key, value)
      displayResult('storage-result', `已设置: ${key} = ${value}`)
    } catch (error) {
      displayError('storage-result', `设置失败: ${error.message}`)
    }
  })

  document.getElementById('storage-get').addEventListener('click', async () => {
    const key = document.getElementById('storage-key').value

    if (!key) {
      alert('请输入存储键')
      return
    }

    try {
      const value = await window.pluginAPI.storage.get(key)
      displayResult('storage-result', `${key} = ${value !== null ? value : '(不存在)'}`)
    } catch (error) {
      displayError('storage-result', `获取失败: ${error.message}`)
    }
  })

  document.getElementById('storage-remove').addEventListener('click', async () => {
    const key = document.getElementById('storage-key').value

    if (!key) {
      alert('请输入存储键')
      return
    }

    try {
      await window.pluginAPI.storage.remove(key)
      displayResult('storage-result', `已删除: ${key}`)
    } catch (error) {
      displayError('storage-result', `删除失败: ${error.message}`)
    }
  })

  document.getElementById('storage-clear').addEventListener('click', async () => {
    if (confirm('确定要清空所有存储数据吗？')) {
      try {
        await window.pluginAPI.storage.clear()
        displayResult('storage-result', '所有存储数据已清空')
      } catch (error) {
        displayError('storage-result', `清空失败: ${error.message}`)
      }
    }
  })

  // 消息通信
  document.getElementById('send-message').addEventListener('click', async () => {
    const messageText = document.getElementById('message-input').value

    if (!messageText.trim()) {
      alert('请输入消息内容')
      return
    }

    try {
      let message
      try {
        message = JSON.parse(messageText)
      } catch {
        message = { type: 'text', content: messageText }
      }

      const response = await window.pluginAPI.sendMessage(message)
      displayResult('message-result', `消息已发送\n响应: ${JSON.stringify(response, null, 2)}`)
    } catch (error) {
      displayError('message-result', `发送失败: ${error.message}`)
    }
  })

  // 窗口控制
  document.getElementById('window-minimize').addEventListener('click', async () => {
    try {
      await window.pluginAPI.window.minimize()
    } catch (error) {
      alert(`最小化失败: ${error.message}`)
    }
  })

  document.getElementById('window-maximize').addEventListener('click', async () => {
    try {
      await window.pluginAPI.window.toggleMaximize()
    } catch (error) {
      alert(`最大化/恢复失败: ${error.message}`)
    }
  })

  document.getElementById('window-set-title').addEventListener('click', async () => {
    const title = prompt('请输入新的窗口标题:', '插件窗口 - ' + new Date().toLocaleTimeString())
    if (title) {
      try {
        await window.pluginAPI.window.setTitle(title)
      } catch (error) {
        alert(`设置标题失败: ${error.message}`)
      }
    }
  })

  document.getElementById('window-close').addEventListener('click', async () => {
    if (confirm('确定要关闭插件窗口吗？')) {
      try {
        await window.pluginAPI.window.close()
      } catch (error) {
        alert(`关闭窗口失败: ${error.message}`)
      }
    }
  })
}

// 加载权限状态
async function loadPermissions() {
  const permissions = [
    'storage',
    'notifications',
    'filesystem.read',
    'filesystem.write',
    'network',
    'system',
    'clipboard'
  ]

  const permissionsContainer = document.getElementById('permissions-list')
  permissionsContainer.innerHTML = ''

  for (const permission of permissions) {
    try {
      const hasPermission = await window.pluginAPI.hasPermission(permission)
      const permissionElement = createPermissionElement(permission, hasPermission)
      permissionsContainer.appendChild(permissionElement)
    } catch (error) {
      console.error(`Failed to check permission ${permission}:`, error)
      const permissionElement = createPermissionElement(permission, null, error.message)
      permissionsContainer.appendChild(permissionElement)
    }
  }
}

// 创建权限显示元素
function createPermissionElement(permission, hasPermission, error = null) {
  const element = document.createElement('div')
  element.className = 'permission-item'

  const nameElement = document.createElement('span')
  nameElement.className = 'permission-name'
  nameElement.textContent = permission

  const statusElement = document.createElement('span')
  statusElement.className = 'permission-status'

  if (error) {
    statusElement.classList.add('unknown')
    statusElement.textContent = '错误'
    statusElement.title = error
  } else if (hasPermission === true) {
    statusElement.classList.add('granted')
    statusElement.textContent = '已授予'
  } else if (hasPermission === false) {
    statusElement.classList.add('denied')
    statusElement.textContent = '已拒绝'
  } else {
    statusElement.classList.add('unknown')
    statusElement.textContent = '未知'
  }

  element.appendChild(nameElement)
  element.appendChild(statusElement)

  // 添加点击事件来请求权限
  if (hasPermission === false || hasPermission === null) {
    element.style.cursor = 'pointer'
    element.addEventListener('click', async () => {
      try {
        const granted = await window.pluginAPI.requestPermission(permission)
        if (granted) {
          statusElement.className = 'permission-status granted'
          statusElement.textContent = '已授予'
          element.style.cursor = 'default'
        } else {
          statusElement.className = 'permission-status denied'
          statusElement.textContent = '已拒绝'
        }
      } catch (error) {
        alert(`请求权限失败: ${error.message}`)
      }
    })
  }

  return element
}

// 显示结果
function displayResult(elementId, message) {
  const element = document.getElementById(elementId)
  element.className = 'result-display'
  element.textContent = message
}

// 显示错误
function displayError(elementId, message) {
  const element = document.getElementById(elementId)
  element.className = 'result-display error'
  element.textContent = message
}

// 页面加载完成后的额外初始化
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded, plugin script ready')

  // 添加一些示例数据到消息输入框
  const messageInput = document.getElementById('message-input')
  if (messageInput) {
    messageInput.value = messageInput.value.replace(
      '${new Date().toISOString()}',
      new Date().toISOString()
    )
  }
})

// 错误处理
window.addEventListener('error', (event) => {
  console.error('Plugin error:', event.error)
})

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason)
})
