import * as vscode from 'whytalk'
import * as path from 'path'
import * as fs from 'fs'
import { RequirementManager } from './requirementManager'
import { TestScenarioGenerator } from './testScenarioGenerator'
import { AutomationScriptGenerator } from './automationScriptGenerator'
import { DataExporter } from './dataExporter'

/**
 * 需求管理扩展主类
 */
class RequirementManagementExtension {
  private panel: any = null
  private requirementManager: RequirementManager
  private testGenerator: TestScenarioGenerator
  private scriptGenerator: AutomationScriptGenerator
  private dataExporter: DataExporter

  constructor(
    private context: vscode.ExtensionContext,
    private api: any
  ) {
    this.requirementManager = new RequirementManager(context, api)
    this.testGenerator = new TestScenarioGenerator(api)
    this.scriptGenerator = new AutomationScriptGenerator(api)
    this.dataExporter = new DataExporter()
  }

  /**
   * 创建或显示需求管理面板
   */
  public createOrShowDashboard() {
    if (this.panel) {
      this.panel.reveal()
      return
    }

    this.panel = this.api.window.createWebviewPanel(
      'requirement.dashboard',
      '需求管理面板',
      this.api.ViewColumn.One,
      {
        enableScripts: true,
        retainContextWhenHidden: true,
        localResourceRoots: [this.api.Uri.file(path.join(this.context.extensionPath, 'webview'))]
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
      const cssUri = this.panel!.webview.asWebviewUri(
        this.api.Uri.file(path.join(webviewPath, 'style.css'))
      )
      const jsUri = this.panel!.webview.asWebviewUri(
        this.api.Uri.file(path.join(webviewPath, 'script.js'))
      )

      html = html.replace('<head>', `<head>\n    <link rel="stylesheet" href="${cssUri}">`)
      html = html.replace('</body>', `    <script src="${jsUri}"></script>\n</body>`)

      return html
    } catch (error) {
      console.error('Failed to load webview content:', error)
      return this.getDefaultWebviewContent()
    }
  }

  /**
   * 获取默认WebView内容
   */
  private getDefaultWebviewContent(): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>需求管理面板</title>
          <style>
              body {
                  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                  margin: 0;
                  padding: 20px;
                  background-color: var(--vscode-editor-background);
                  color: var(--vscode-editor-foreground);
              }
              .container {
                  max-width: 1200px;
                  margin: 0 auto;
              }
              .header {
                  text-align: center;
                  margin-bottom: 30px;
              }
              .btn {
                  background-color: var(--vscode-button-background);
                  color: var(--vscode-button-foreground);
                  border: none;
                  padding: 10px 20px;
                  margin: 5px;
                  border-radius: 4px;
                  cursor: pointer;
                  font-size: 14px;
              }
              .btn:hover {
                  background-color: var(--vscode-button-hoverBackground);
              }
              .loading {
                  text-align: center;
                  color: var(--vscode-descriptionForeground);
              }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  <h1>需求管理辅助工具</h1>
                  <p>功能强大的需求管理、工时估算和测试场景生成工具</p>
              </div>
              <div class="loading">
                  <p>正在加载需求管理面板...</p>
                  <button class="btn" onclick="location.reload()">重新加载</button>
              </div>
          </div>
      </body>
      </html>
    `
  }

  /**
   * 设置WebView消息处理
   */
  private setupWebviewMessageHandling() {
    this.panel!.webview.onDidReceiveMessage(
      async (message: any) => {
        await this.handleWebviewMessage(message)
      },
      undefined,
      this.context.subscriptions
    )
  }

  /**
   * 处理来自WebView的消息
   */
  private async handleWebviewMessage(message: any) {
    const { type, command, data } = message

    try {
      switch (type) {
        case 'webviewReady':
          // WebView准备就绪，发送初始数据
          await this.sendInitialData()
          break

        case 'requirement':
          await this.handleRequirementMessage(command, data)
          break

        case 'test':
          await this.handleTestMessage(command, data)
          break

        case 'export':
          await this.handleExportMessage(command, data)
          break

        default:
          console.warn('Unknown message type:', type)
      }
    } catch (error) {
      console.error('Error handling webview message:', error)
      this.sendMessage({
        type: 'error',
        message: '处理请求时发生错误: ' + (error as Error).message
      })
    }
  }

  /**
   * 发送初始数据到WebView
   */
  private async sendInitialData() {
    const requirements = await this.requirementManager.getAllRequirements()
    const config = this.api.workspace.getConfiguration('requirement')

    this.sendMessage({
      type: 'initialData',
      data: {
        requirements,
        config: {
          defaultEstimateUnit: config.get('defaultEstimateUnit', '小时'),
          testFramework: config.get('testFramework', 'Jest'),
          autoSave: config.get('autoSave', true),
          exportFormat: config.get('exportFormat', 'Excel')
        }
      }
    })
  }

  /**
   * 处理需求相关消息
   */
  private async handleRequirementMessage(command: string, data: any) {
    switch (command) {
      case 'create':
        const newRequirement = await this.requirementManager.createRequirement(data)
        this.sendMessage({ type: 'requirementCreated', data: newRequirement })
        break

      case 'update':
        const updatedRequirement = await this.requirementManager.updateRequirement(data.id, data)
        this.sendMessage({ type: 'requirementUpdated', data: updatedRequirement })
        break

      case 'delete':
        await this.requirementManager.deleteRequirement(data.id)
        this.sendMessage({ type: 'requirementDeleted', data: { id: data.id } })
        break

      case 'getAll':
        const requirements = await this.requirementManager.getAllRequirements()
        this.sendMessage({ type: 'requirementsLoaded', data: requirements })
        break
    }
  }

  /**
   * 处理测试相关消息
   */
  private async handleTestMessage(command: string, data: any) {
    switch (command) {
      case 'generateScenarios':
        const scenarios = await this.testGenerator.generateTestScenarios(data.requirement)
        this.sendMessage({ type: 'testScenariosGenerated', data: scenarios })
        break

      case 'generateScripts':
        const scripts = await this.scriptGenerator.generateAutomationScripts(
          data.scenarios,
          data.framework
        )
        this.sendMessage({ type: 'automationScriptsGenerated', data: scripts })
        break
    }
  }

  /**
   * 处理导出相关消息
   */
  private async handleExportMessage(command: string, data: any) {
    switch (command) {
      case 'exportRequirements':
        const filePath = await this.dataExporter.exportRequirements(data.requirements, data.format)
        this.sendMessage({ type: 'exportCompleted', data: { filePath } })
        break

      case 'importRequirements':
        const importedRequirements = await this.dataExporter.importRequirements(data.filePath)
        this.sendMessage({ type: 'importCompleted', data: importedRequirements })
        break
    }
  }

  /**
   * 向WebView发送消息
   */
  private sendMessage(message: any) {
    if (this.panel) {
      this.panel.webview.postMessage(message)
    }
  }
}

/**
 * 插件激活函数
 * @param context 扩展上下文
 * @param api WhyTalk API
 */
export async function activate(context: vscode.ExtensionContext, api: any) {
    console.log('需求管理插件正在激活...');
    
    if (!api) {
        throw new Error('WhyTalk API not available');
    }

  // 创建扩展实例
  const extension = new RequirementManagementExtension(context, api)

  // 注册命令
  const openDashboardCommand = api.commands.registerCommand('requirement.openDashboard', () => {
    extension.createOrShowDashboard()
  })

  const createNewCommand = api.commands.registerCommand('requirement.createNew', async () => {
    extension.createOrShowDashboard()
    // 发送创建新需求的消息
    setTimeout(() => {
      extension['sendMessage']({ type: 'command', command: 'createNew' })
    }, 1000)
  })

  const exportDataCommand = api.commands.registerCommand('requirement.exportData', async () => {
    const config = api.workspace.getConfiguration('requirement')
    const format = config.get('exportFormat', 'Excel')
    
    try {
      const requirementManager = new RequirementManager(context, api)
      const dataExporter = new DataExporter()
      const requirements = await requirementManager.getAllRequirements()
      
      if (requirements.length === 0) {
        api.window.showWarningMessage('没有需求数据可以导出')
        return
      }
      
      const filePath = await dataExporter.exportRequirements(requirements, format)
      api.window.showInformationMessage(`需求数据已导出到: ${filePath}`)
    } catch (error) {
      api.window.showErrorMessage('导出失败: ' + (error as Error).message)
    }
  })

  const generateTestsCommand = api.commands.registerCommand('requirement.generateTests', async () => {
    extension.createOrShowDashboard()
    // 发送生成测试的消息
    setTimeout(() => {
      extension['sendMessage']({ type: 'command', command: 'generateTests' })
    }, 1000)
  })

  const generateScriptsCommand = api.commands.registerCommand('requirement.generateScripts', async () => {
    extension.createOrShowDashboard()
    // 发送生成脚本的消息
    setTimeout(() => {
      extension['sendMessage']({ type: 'command', command: 'generateScripts' })
    }, 1000)
  })

  // 创建状态栏项
  const statusBarItem = api.window.createStatusBarItem(2, 100)
  statusBarItem.text = '$(list-unordered) 需求管理'
  statusBarItem.tooltip = '打开需求管理面板'
  statusBarItem.command = 'requirement.openDashboard'
  statusBarItem.show()

  // 添加到订阅列表
  context.subscriptions.push(
    openDashboardCommand,
    createNewCommand,
    exportDataCommand,
    generateTestsCommand,
    generateScriptsCommand,
    statusBarItem
  )

  // 显示激活消息
  api.window.showInformationMessage('需求管理插件已成功激活！')

  console.log('需求管理插件激活完成')

  // 返回扩展API
  return {
    getExtensionInfo() {
      return {
        name: '需求管理辅助工具',
        version: '1.0.0',
        isActive: true
      }
    },

    openDashboard() {
      extension.createOrShowDashboard()
    }
  }
}

/**
 * 插件停用函数
 */
export function deactivate() {
  console.log('需求管理插件已停用')
}