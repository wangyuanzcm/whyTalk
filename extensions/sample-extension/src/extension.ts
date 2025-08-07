import * as vscode from 'whytalk'
import * as path from 'path'

/**
 * 注册插件配置架构
 */
async function registerConfigurationSchema(api: any) {
  console.log('开始注册配置架构...')
  
  try {
    const schema = {
      message: {
        key: 'message',
        label: '问候消息',
        type: 'string',
        description: '插件显示的问候消息内容',
        default: 'Hello from Sample Extension!',
        placeholder: '请输入问候消息'
      },
      enabled: {
        key: 'enabled',
        label: '启用插件',
        type: 'boolean',
        description: '是否启用此插件',
        default: true
      },
      autoStart: {
        key: 'autoStart',
        label: '自动启动',
        type: 'boolean',
        description: '应用启动时自动激活插件',
        default: false
      },
      logLevel: {
        key: 'logLevel',
        label: '日志级别',
        type: 'select',
        description: '设置插件的日志输出级别',
        default: 'info',
        options: [
          { label: '调试', value: 'debug' },
          { label: '信息', value: 'info' },
          { label: '警告', value: 'warn' },
          { label: '错误', value: 'error' }
        ]
      },
      maxRetries: {
        key: 'maxRetries',
        label: '最大重试次数',
        type: 'number',
        description: '操作失败时的最大重试次数',
        default: 3,
        min: 0,
        max: 10,
        step: 1
      },
      description: {
        key: 'description',
        label: '插件描述',
        type: 'textarea',
        description: '插件的详细描述信息',
        default: '这是一个示例插件，用于演示 WhyTalk 插件系统的功能。',
        placeholder: '请输入插件描述',
        rows: 3
      }
    }

    console.log('配置架构定义:', schema)

    // 通过 API 注册配置架构
    if (api.registerConfigSchema) {
      console.log('调用 api.registerConfigSchema...')
      const result = api.registerConfigSchema(schema)
      console.log('配置架构注册结果:', result)
    } else {
      console.warn('registerConfigSchema API 不可用，可用的 API:', Object.keys(api))
    }

    console.log('配置架构注册成功')
  } catch (error) {
    console.error('注册配置架构失败:', error)
  }
}

/**
 * WebView面板管理器
 */
class WebViewManager {
  private panel: any = null
  private context: vscode.ExtensionContext
  private api: any

  constructor(context: vscode.ExtensionContext, api: any) {
    this.context = context
    this.api = api
  }

  /**
   * 创建或显示WebView面板
   */
  public createOrShow() {
    if (this.panel) {
      this.panel.reveal()
      return
    }

    this.panel = this.api.window.createWebviewPanel(
      'sample.webview',
      'Sample Extension',
      this.api.ViewColumn.One,
      {
        enableScripts: true,
        retainContextWhenHidden: true,
        localResourceRoots: [
          this.api.Uri.file(path.join(this.context.extensionPath, 'webview'))
        ]
      }
    )

    this.panel.webview.html = this.getWebviewContent()
    this.setupWebviewMessageHandling()

    this.panel.onDidDispose(() => {
      this.panel = null
    })
  }

  /**
   * 获取WebView HTML内容
   */
  private getWebviewContent(): string {
    const webviewPath = path.join(this.context.extensionPath, 'webview')
    const htmlPath = path.join(webviewPath, 'index.html')
    
    try {
      const fs = require('fs')
      let html = fs.readFileSync(htmlPath, 'utf8')
      
      // 替换资源路径为webview URI
      const cssUri = this.panel.webview.asWebviewUri(
        this.api.Uri.file(path.join(webviewPath, 'style.css'))
      )
      const jsUri = this.panel.webview.asWebviewUri(
        this.api.Uri.file(path.join(webviewPath, 'script.js'))
      )
      
      html = html.replace(
        '<head>',
        `<head>\n    <link rel="stylesheet" href="${cssUri}">`
      )
      html = html.replace(
        '</body>',
        `    <script src="${jsUri}"></script>\n</body>`
      )
      
      return html
    } catch (error) {
      console.error('Failed to load webview content:', error)
      return this.getDefaultWebviewContent()
    }
  }

  /**
   * 获取默认WebView内容（当文件加载失败时使用）
   */
  private getDefaultWebviewContent(): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="UTF-8">
          <title>Sample Extension</title>
          <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              .error { color: red; }
          </style>
      </head>
      <body>
          <h1>Sample Extension</h1>
          <p class="error">WebView content failed to load. Please check the webview directory.</p>
      </body>
      </html>
    `
  }

  /**
   * 设置WebView消息处理
   */
  private setupWebviewMessageHandling() {
    this.panel.webview.onDidReceiveMessage(
      (message: any) => {
        this.handleWebviewMessage(message)
      },
      undefined,
      this.context.subscriptions
    )
  }

  /**
   * 处理来自WebView的消息
   */
  private handleWebviewMessage(message: any) {
    const { type, command, section, config, args } = message

    switch (type) {
      case 'webviewReady':
        this.sendMessage({
          type: 'extensionMessage',
          data: 'WebView已连接到扩展后台'
        })
        break

      case 'executeCommand':
        this.executeCommand(command, args)
        break

      case 'getConfiguration':
        this.getConfiguration(section)
        break

      case 'updateConfiguration':
        this.updateConfiguration(section, config)
        break

      case 'getExtensionInfo':
        this.sendExtensionInfo()
        break

      default:
        console.log('Unknown webview message type:', type)
    }
  }

  /**
   * 发送消息到WebView
   */
  private sendMessage(message: any) {
    if (this.panel) {
      this.panel.webview.postMessage(message)
    }
  }

  /**
   * 执行命令
   */
  private async executeCommand(command: string, args: any = {}) {
    try {
      const result = await this.api.commands.executeCommand(command, args)
      this.sendMessage({
        type: 'commandResult',
        command: command,
        data: result || 'Command executed successfully'
      })
    } catch (error) {
      this.sendMessage({
        type: 'commandResult',
        command: command,
        error: error instanceof Error ? error.message : 'Command execution failed'
      })
    }
  }

  /**
   * 获取配置
   */
  private getConfiguration(section: string) {
    try {
      const config = this.api.workspace.getConfiguration(section)
      const configData: any = {}
      
      // 获取一些默认配置项
      const defaultKeys = ['message', 'enabled']
      for (const key of defaultKeys) {
        try {
          configData[key] = config.get(key)
        } catch {
          // 忽略获取失败的配置项
        }
      }
      
      this.sendMessage({
        type: 'configurationResult',
        data: configData
      })
    } catch (error) {
      this.sendMessage({
        type: 'configurationResult',
        error: error instanceof Error ? error.message : 'Failed to get configuration'
      })
    }
  }

  /**
   * 更新配置
   */
  private async updateConfiguration(section: string, config: any) {
    try {
      const configuration = this.api.workspace.getConfiguration(section)
      
      for (const [key, value] of Object.entries(config)) {
        await configuration.update(key, value)
      }
      
      this.sendMessage({
        type: 'extensionMessage',
        data: `Configuration updated for section: ${section}`
      })
    } catch (error) {
      this.sendMessage({
        type: 'extensionError',
        error: error instanceof Error ? error.message : 'Failed to update configuration'
      })
    }
  }

  /**
   * 发送扩展信息
   */
  private sendExtensionInfo() {
    const extensionInfo = {
      name: 'Sample Extension',
      version: '1.0.0',
      publisher: 'whytalk',
      description: 'A sample extension for WhyTalk',
      activationTime: new Date().toISOString(),
      extensionPath: this.context.extensionPath
    }
    
    this.sendMessage({
      type: 'extensionMessage',
      data: `Extension Info: ${JSON.stringify(extensionInfo, null, 2)}`
    })
  }
}

/**
 * 扩展激活函数
 * 当扩展被激活时调用
 * @param context 扩展上下文
 * @param api WhyTalk API
 */
export function activate(context: vscode.ExtensionContext, api: any) {
  console.log('Sample Extension is now active!')
  console.log('API object:', Object.keys(api))

  // 注册配置架构
  registerConfigurationSchema(api)

  // 创建WebView管理器
  const webViewManager = new WebViewManager(context, api)

  // 注册Hello World命令
  const helloWorldCommand = api.commands.registerCommand('sample.helloWorld', () => {
    const config = api.workspace.getConfiguration('sample')
    const message = config.get('message', 'Hello from Sample Extension!')
    
    api.window.showInformationMessage(message)
  })

  // 注册Show Info命令
  const showInfoCommand = api.commands.registerCommand('sample.showInfo', async () => {
    const extensionInfo = {
      name: 'Sample Extension',
      version: '1.0.0',
      description: 'A sample extension for WhyTalk',
      activationTime: new Date().toISOString()
    }

    const infoMessage = `Extension Info:\n${JSON.stringify(extensionInfo, null, 2)}`
    
    // 显示信息对话框
    const result = await api.window.showInformationMessage(
      'Extension Information',
      { modal: true },
      'Copy to Clipboard',
      'Close'
    )

    if (result === 'Copy to Clipboard') {
      // TODO: 实现复制到剪贴板功能
      api.window.showInformationMessage('Info copied to clipboard!')
    }
  })

  // 注册打开WebView命令
  const openWebviewCommand = api.commands.registerCommand('sample.openWebview', () => {
    webViewManager.createOrShow()
  })

  // 注册配置变化监听器
  const configChangeListener = api.workspace.onDidChangeConfiguration((event: any) => {
    // 检查是否是当前扩展的配置变化
    if (event.extensionId === 'whytalk.sample-extension' || event.section?.startsWith('sample')) {
      console.log('Sample extension configuration changed')
      
      const config = api.workspace.getConfiguration('sample')
      const enabled = config.get('enable', true)
      
      if (!enabled) {
        api.window.showWarningMessage('Sample extension has been disabled')
      } else {
        api.window.showInformationMessage('Sample extension has been enabled')
      }
    }
  })

  // 创建状态栏项
  // 使用数字常量代替可能未定义的枚举
  const statusBarItem = api.window.createStatusBarItem(2, 100) // 2 = Right alignment
  statusBarItem.text = '$(heart) Sample'
  statusBarItem.tooltip = 'Sample Extension is active'
  statusBarItem.command = 'sample.helloWorld'
  statusBarItem.show()

  // 添加到订阅列表，确保在扩展停用时清理
  context.subscriptions.push(
    helloWorldCommand,
    showInfoCommand,
    openWebviewCommand,
    configChangeListener,
    statusBarItem
  )

  // 显示激活消息
  api.window.showInformationMessage('Sample Extension activated successfully!')

  // 返回扩展API（可选）
  return {
    // 提供给其他扩展使用的API
    getExtensionInfo() {
      return {
        name: 'Sample Extension',
        version: '1.0.0',
        isActive: true
      }
    },
    
    // 示例方法
    sayHello(name?: string) {
      const greeting = name ? `Hello, ${name}!` : 'Hello, World!'
      api.window.showInformationMessage(greeting)
      return greeting
    }
  }
}

/**
 * 扩展停用函数
 * 当扩展被停用时调用
 */
export function deactivate() {
  console.log('Sample Extension is now deactivated!')
  
  // 这里可以进行清理工作
  // 注意：context.subscriptions中的项目会自动清理
}