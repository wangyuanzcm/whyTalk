/**
 * 浏览器模式下的模拟 Electron API
 * 用于在浏览器环境中提供基本的 API 支持，主要用于样式调试
 */

// 模拟用户数据
const mockUserData = {
  id: 1,
  mobile: '13800138000',
  nickname: '演示用户',
  avatar: '',
  status: 'online'
}

// 模拟插件数据（传统格式）
const mockPlugins = [
  {
    id: 'frontend_message-plugin_1.0.0',
    name: '消息插件',
    version: '1.0.0',
    enabled: true,
    type: 'frontend'
  },
  {
    id: 'frontend_contact-plugin_1.0.0', 
    name: '通讯录插件',
    version: '1.0.0',
    enabled: true,
    type: 'frontend'
  },
  {
    id: 'frontend_note-plugin_1.0.0',
    name: '笔记插件', 
    version: '1.0.0',
    enabled: true,
    type: 'frontend'
  }
]

// 模拟VSCode风格扩展数据
const mockExtensions = [
  {
    id: 'whytalk.message-extension',
    name: 'message-extension',
    displayName: '消息扩展',
    description: '提供消息处理和显示功能的扩展',
    version: '1.0.0',
    publisher: 'whytalk',
    isActive: true,
    isBuiltin: false,
    extensionPath: '/extensions/message-extension',
    packageJSON: {
      name: 'message-extension',
      displayName: '消息扩展',
      description: '提供消息处理和显示功能的扩展',
      version: '1.0.0',
      publisher: 'whytalk',
      engines: { vscode: '^1.74.0' },
      categories: ['Other'],
      activationEvents: ['onStartupFinished'],
      main: './out/extension.js',
      contributes: {
        commands: [
          {
            command: 'messageExtension.sendMessage',
            title: '发送消息'
          }
        ]
      }
    },
    activationEvents: ['onStartupFinished']
  },
  {
    id: 'whytalk.contact-extension',
    name: 'contact-extension',
    displayName: '联系人扩展',
    description: '管理和显示联系人信息的扩展',
    version: '1.2.0',
    publisher: 'whytalk',
    isActive: true,
    isBuiltin: false,
    extensionPath: '/extensions/contact-extension',
    packageJSON: {
      name: 'contact-extension',
      displayName: '联系人扩展',
      description: '管理和显示联系人信息的扩展',
      version: '1.2.0',
      publisher: 'whytalk',
      engines: { vscode: '^1.74.0' },
      categories: ['Other'],
      activationEvents: ['onStartupFinished'],
      main: './out/extension.js',
      contributes: {
        commands: [
          {
            command: 'contactExtension.addContact',
            title: '添加联系人'
          }
        ]
      }
    },
    activationEvents: ['onStartupFinished']
  },
  {
    id: 'whytalk.note-extension',
    name: 'note-extension',
    displayName: '笔记扩展',
    description: '创建和管理笔记的扩展',
    version: '0.9.0',
    publisher: 'whytalk',
    isActive: false,
    isBuiltin: false,
    extensionPath: '/extensions/note-extension',
    packageJSON: {
      name: 'note-extension',
      displayName: '笔记扩展',
      description: '创建和管理笔记的扩展',
      version: '0.9.0',
      publisher: 'whytalk',
      engines: { vscode: '^1.74.0' },
      categories: ['Other'],
      activationEvents: ['onCommand:noteExtension.createNote'],
      main: './out/extension.js',
      contributes: {
        commands: [
          {
            command: 'noteExtension.createNote',
            title: '创建笔记'
          }
        ]
      }
    },
    activationEvents: ['onCommand:noteExtension.createNote']
  },
  {
    id: 'whytalk.theme-extension',
    name: 'theme-extension',
    displayName: '主题扩展',
    description: '提供多种界面主题的扩展',
    version: '2.1.0',
    publisher: 'whytalk',
    isActive: true,
    isBuiltin: true,
    extensionPath: '/extensions/theme-extension',
    packageJSON: {
      name: 'theme-extension',
      displayName: '主题扩展',
      description: '提供多种界面主题的扩展',
      version: '2.1.0',
      publisher: 'whytalk',
      engines: { vscode: '^1.74.0' },
      categories: ['Themes'],
      activationEvents: ['*'],
      main: './out/extension.js',
      contributes: {
        themes: [
          {
            label: '深色主题',
            uiTheme: 'vs-dark',
            path: './themes/dark-theme.json'
          }
        ]
      }
    },
    activationEvents: ['*']
  }
]

/**
 * 处理模拟 API 请求
 */
function handleMockApiRequest(request: any) {
  const { url, method, data } = request
  console.log(`[Browser Mock] API Request: ${method} ${url}`, data)
  
  // 模拟登录接口
  if (url === '/api/v1/auth/login') {
    return {
      code: 200,
      message: '登录成功',
      data: {
        access_token: 'mock_access_token_123456',
        expires_in: 7200,
        user: mockUserData
      }
    }
  }
  
  if (url === '/api/v1/auth/register') {
    return {
      code: 200,
      message: '注册成功',
      data: null
    }
  }
  
  if (url === '/api/v1/auth/logout') {
    return {
      code: 200,
      message: '退出成功',
      data: null
    }
  }
  
  // 模拟用户相关接口
  if (url === '/api/v1/user/info') {
    return {
      code: 200,
      message: '获取用户信息成功',
      data: mockUserData
    }
  }
  
  if (url === '/api/v1/user/update') {
    return {
      code: 200,
      message: '更新用户信息成功',
      data: { ...mockUserData, ...data }
    }
  }
  
  // 模拟消息相关接口
  if (url.startsWith('/api/v1/message')) {
    return {
      code: 200,
      message: '操作成功',
      data: {
        list: [],
        total: 0
      }
    }
  }
  
  // 模拟联系人相关接口
  if (url.startsWith('/api/v1/contact')) {
    return {
      code: 200,
      message: '操作成功',
      data: {
        list: [],
        total: 0
      }
    }
  }
  
  // 模拟笔记相关接口
  if (url.startsWith('/api/v1/note')) {
    return {
      code: 200,
      message: '操作成功',
      data: {
        list: [],
        total: 0
      }
    }
  }
  
  // 默认成功响应
  return {
    code: 200,
    message: '操作成功',
    data: null
  }
}

/**
 * 创建模拟的 Electron API
 */
export function createMockElectronAPI() {
  return {
    // 模拟 IPC 通信
    ipcRenderer: {
      invoke: async (channel: string, ...args: any[]) => {
        console.log(`[Browser Mock] IPC invoke: ${channel}`, args)
        
        switch (channel) {
          case 'get-user-info':
            return { success: true, data: mockUserData }
          
          case 'plugin:list':
            return { success: true, data: mockPlugins }
          
          case 'plugin:get':
            const pluginId = args[0]
            const plugin = mockPlugins.find(p => p.id === pluginId)
            return { success: true, data: plugin }
          
          // VSCode风格插件系统API
          case 'plugin:getAllExtensions':
            return mockExtensions
          
          case 'plugin:getExtension':
            const extensionId = args[0]
            const extension = mockExtensions.find(ext => ext.id === extensionId)
            return extension || null
          
          case 'plugin:activateExtension':
            const activateId = args[0]
            const activateExt = mockExtensions.find(ext => ext.id === activateId)
            if (activateExt) {
              activateExt.isActive = true
              return true
            }
            return false
          
          case 'plugin:deactivateExtension':
            const deactivateId = args[0]
            const deactivateExt = mockExtensions.find(ext => ext.id === deactivateId)
            if (deactivateExt) {
              deactivateExt.isActive = false
              return true
            }
            return false
          
          case 'plugin:installExtension':
            const packageName = args[0]
            const version = args[1] || '1.0.0'
            // 模拟安装成功
            const newExtension = {
              id: `mock.${packageName}`,
              name: packageName,
              displayName: `模拟扩展 ${packageName}`,
              description: `这是一个模拟安装的扩展: ${packageName}`,
              version: version,
              publisher: 'mock',
              isActive: false,
              isBuiltin: false,
              extensionPath: `/extensions/${packageName}`,
              packageJSON: {
                name: packageName,
                displayName: `模拟扩展 ${packageName}`,
                version: version,
                publisher: 'mock'
              },
              activationEvents: ['onStartupFinished']
            }
            mockExtensions.push(newExtension)
            return true
          
          case 'plugin:uninstallExtension':
            const uninstallId = args[0]
            const uninstallIndex = mockExtensions.findIndex(ext => ext.id === uninstallId)
            if (uninstallIndex !== -1) {
              mockExtensions.splice(uninstallIndex, 1)
              return true
            }
            return false
          
          case 'plugin:searchExtensions':
            const query = args[0] || ''
            // 模拟搜索结果
            const searchResults = [
              {
                id: 'search.result1',
                name: 'search-result-1',
                displayName: `搜索结果: ${query}`,
                description: `与"${query}"相关的扩展`,
                version: '1.0.0',
                publisher: 'search',
                downloads: 1000,
                rating: 4.5,
                tags: ['utility', 'productivity'],
                repository: 'https://github.com/example/search-result-1',
                homepage: 'https://example.com/search-result-1'
              }
            ]
            return searchResults
          
          case 'plugin:getExtensionStats':
            const total = mockExtensions.length
            const active = mockExtensions.filter(ext => ext.isActive).length
            const inactive = total - active
            const builtin = mockExtensions.filter(ext => ext.isBuiltin).length
            const user = total - builtin
            return {
              total,
              active,
              inactive,
              builtin,
              user
            }
          
          case 'plugin:reloadExtension':
            const reloadId = args[0]
            const reloadExt = mockExtensions.find(ext => ext.id === reloadId)
            if (reloadExt) {
              // 模拟重新加载成功
              console.log(`[Browser Mock] Reloading extension: ${reloadId}`)
              return true
            }
            return false
          
          case 'storage:get':
            const key = args[0]
            const stored = localStorage.getItem(`mock_storage_${key}`)
            return { success: true, data: stored ? JSON.parse(stored) : null }
          
          case 'storage:set':
            const [setKey, value] = args
            localStorage.setItem(`mock_storage_${setKey}`, JSON.stringify(value))
            return { success: true }
          
          case 'auth:login':
            // 模拟登录成功
            localStorage.setItem('mock_auth_token', 'mock_token_123')
            localStorage.setItem('mock_user_data', JSON.stringify(mockUserData))
            return { success: true, data: { token: 'mock_token_123', user: mockUserData } }
          
          case 'auth:logout':
            localStorage.removeItem('mock_auth_token')
            localStorage.removeItem('mock_user_data')
            return { success: true }
          
          case 'auth:check':
            const token = localStorage.getItem('mock_auth_token')
            return { success: true, data: { isLoggedIn: !!token, user: token ? mockUserData : null } }
          
          case 'api-request':
            // 模拟 API 请求处理
            const request = args[0]
            return handleMockApiRequest(request)
          
          case 'upload-file':
            // 模拟文件上传
            return { code: 200, message: '文件上传成功', data: { url: '/mock/upload/file.jpg' } }
          
          case 'upload-annex':
            // 模拟附件上传
            return { code: 200, message: '附件上传成功', data: { id: 1, url: '/mock/upload/annex.pdf' } }
          
          case 'upload-multipart':
            // 模拟分片上传
            return { code: 200, message: '分片上传成功', data: { uploaded: true } }
          
          default:
            console.warn(`[Browser Mock] Unhandled IPC channel: ${channel}`)
            return { success: false, error: 'Channel not implemented in browser mode' }
        }
      },
      
      on: (channel: string, callback: Function) => {
        console.log(`[Browser Mock] IPC on: ${channel}`)
        // 在浏览器模式下不需要实际的事件监听
      },
      
      removeAllListeners: (channel: string) => {
        console.log(`[Browser Mock] IPC removeAllListeners: ${channel}`)
      }
    },
    
    // 模拟应用信息
    app: {
      getVersion: () => '1.0.0',
      getName: () => 'why-talk',
      getPath: (name: string) => `/mock/path/${name}`
    },
    
    // 模拟系统信息
    process: {
      platform: 'browser',
      versions: {
        electron: '22.3.27',
        chrome: '106.0.5249.199',
        node: '16.17.1'
      }
    }
  }
}

/**
 * 初始化浏览器模式的模拟环境
 */
export function initBrowserMode() {
  // 检查是否在浏览器环境中
  if (typeof window !== 'undefined' && !window.electron) {
    console.log('[Browser Mock] Initializing browser mode...')
    
    // 创建模拟的 electron API
    ;(window as any).electron = createMockElectronAPI()
    
    // 设置浏览器模式标识
    ;(window as any).__BROWSER_MODE__ = true
    
    console.log('[Browser Mock] Browser mode initialized successfully')
  }
}

/**
 * 检查是否在浏览器模式下运行
 */
export function isBrowserMode(): boolean {
  return typeof window !== 'undefined' && (window as any).__BROWSER_MODE__ === true
}