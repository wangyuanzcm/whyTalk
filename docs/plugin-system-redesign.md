# 插件系统重构设计文档

## 概述

本文档描述了将现有插件系统重构为类似VSCode扩展系统架构的设计方案。新系统将保留renderer页面，但main程序逻辑将参考VSCode插件系统架构进行重新设计。

## 当前系统问题分析

1. **WASM编译困难**：当前系统依赖WASM，增加了插件开发的复杂性
2. **插件格式不统一**：存在多种插件格式（CubeModule、Unified等）
3. **缺乏标准化**：没有遵循成熟的插件系统标准
4. **开发体验差**：插件开发和调试流程复杂

## 新架构设计

### 1. 插件标准格式

参考VSCode扩展系统，使用`package.json`作为插件清单文件：

```json
{
  "name": "my-plugin",
  "displayName": "My Plugin",
  "description": "A sample plugin",
  "version": "1.0.0",
  "publisher": "my-publisher",
  "engines": {
    "whytalk": "^1.0.0"
  },
  "categories": ["Other"],
  "activationEvents": [
    "onCommand:myPlugin.helloWorld",
    "onLanguage:javascript"
  ],
  "main": "./out/extension.js",
  "contributes": {
    "commands": [
      {
        "command": "myPlugin.helloWorld",
        "title": "Hello World",
        "category": "My Plugin"
      }
    ],
    "views": {
      "explorer": [
        {
          "id": "myPluginView",
          "name": "My Plugin View",
          "when": "true"
        }
      ]
    },
    "configuration": {
      "title": "My Plugin",
      "properties": {
        "myPlugin.enable": {
          "type": "boolean",
          "default": true,
          "description": "Enable My Plugin"
        }
      }
    }
  },
  "scripts": {
    "compile": "tsc -p ./",
    "watch": "tsc -watch -p ./"
  },
  "devDependencies": {
    "@types/whytalk": "^1.0.0",
    "typescript": "^4.0.0"
  }
}
```

### 2. 插件入口文件

插件主入口文件（TypeScript/JavaScript）：

```typescript
import * as whytalk from 'whytalk';

// 插件激活时调用
export function activate(context: whytalk.ExtensionContext) {
    console.log('Plugin activated');
    
    // 注册命令
    const disposable = whytalk.commands.registerCommand('myPlugin.helloWorld', () => {
        whytalk.window.showInformationMessage('Hello World from My Plugin!');
    });
    
    context.subscriptions.push(disposable);
    
    // 注册视图提供者
    const provider = new MyViewProvider(context.extensionUri);
    context.subscriptions.push(
        whytalk.window.registerWebviewViewProvider('myPluginView', provider)
    );
}

// 插件停用时调用
export function deactivate() {
    console.log('Plugin deactivated');
}

class MyViewProvider implements whytalk.WebviewViewProvider {
    constructor(private readonly _extensionUri: whytalk.Uri) {}
    
    public resolveWebviewView(
        webviewView: whytalk.WebviewView,
        context: whytalk.WebviewViewResolveContext,
        _token: whytalk.CancellationToken,
    ) {
        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [this._extensionUri]
        };
        
        webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);
    }
    
    private _getHtmlForWebview(webview: whytalk.Webview) {
        return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>My Plugin View</title>
        </head>
        <body>
            <h1>Hello from My Plugin!</h1>
            <button onclick="sendMessage()">Click me</button>
            <script>
                const vscode = acquireVsCodeApi();
                function sendMessage() {
                    vscode.postMessage({ command: 'hello' });
                }
            </script>
        </body>
        </html>`;
    }
}
```

### 3. 核心架构组件

#### 3.1 扩展主机 (Extension Host)

```typescript
// src/main/plugin/ExtensionHost.ts
export class ExtensionHost {
    private extensions = new Map<string, ExtensionInstance>();
    private activationEvents = new Map<string, Set<string>>();
    
    async loadExtension(extensionPath: string): Promise<void> {
        const manifest = await this.loadManifest(extensionPath);
        const extension = new ExtensionInstance(manifest, extensionPath);
        
        this.extensions.set(manifest.name, extension);
        this.registerActivationEvents(manifest);
    }
    
    async activateExtension(extensionId: string): Promise<void> {
        const extension = this.extensions.get(extensionId);
        if (!extension || extension.isActive) return;
        
        try {
            const extensionModule = require(extension.mainPath);
            const context = new ExtensionContext(extension);
            
            await extensionModule.activate(context);
            extension.isActive = true;
            extension.context = context;
        } catch (error) {
            console.error(`Failed to activate extension ${extensionId}:`, error);
        }
    }
    
    async deactivateExtension(extensionId: string): Promise<void> {
        const extension = this.extensions.get(extensionId);
        if (!extension || !extension.isActive) return;
        
        try {
            const extensionModule = require(extension.mainPath);
            if (extensionModule.deactivate) {
                await extensionModule.deactivate();
            }
            
            extension.context?.dispose();
            extension.isActive = false;
        } catch (error) {
            console.error(`Failed to deactivate extension ${extensionId}:`, error);
        }
    }
}
```

#### 3.2 贡献点系统 (Contribution Points)

```typescript
// src/main/plugin/ContributionPoints.ts
export class ContributionPointManager {
    private commands = new Map<string, CommandContribution>();
    private views = new Map<string, ViewContribution>();
    private configurations = new Map<string, ConfigurationContribution>();
    
    registerCommands(extensionId: string, commands: CommandContribution[]): void {
        for (const command of commands) {
            this.commands.set(command.command, {
                ...command,
                extensionId
            });
        }
    }
    
    registerViews(extensionId: string, views: ViewContribution[]): void {
        for (const view of views) {
            this.views.set(view.id, {
                ...view,
                extensionId
            });
        }
    }
    
    registerConfigurations(extensionId: string, config: ConfigurationContribution): void {
        this.configurations.set(extensionId, config);
    }
}
```

#### 3.3 激活事件系统 (Activation Events)

```typescript
// src/main/plugin/ActivationEventManager.ts
export class ActivationEventManager {
    private eventListeners = new Map<string, Set<string>>();
    private extensionHost: ExtensionHost;
    
    constructor(extensionHost: ExtensionHost) {
        this.extensionHost = extensionHost;
    }
    
    registerActivationEvent(event: string, extensionId: string): void {
        if (!this.eventListeners.has(event)) {
            this.eventListeners.set(event, new Set());
        }
        this.eventListeners.get(event)!.add(extensionId);
    }
    
    async fireActivationEvent(event: string, ...args: any[]): Promise<void> {
        const extensions = this.eventListeners.get(event);
        if (!extensions) return;
        
        const activationPromises = Array.from(extensions).map(extensionId => 
            this.extensionHost.activateExtension(extensionId)
        );
        
        await Promise.all(activationPromises);
    }
    
    // 内置激活事件
    onCommand(command: string): void {
        this.fireActivationEvent(`onCommand:${command}`);
    }
    
    onLanguage(languageId: string): void {
        this.fireActivationEvent(`onLanguage:${languageId}`);
    }
    
    onStartupFinished(): void {
        this.fireActivationEvent('onStartupFinished');
    }
}
```

### 4. API 设计

#### 4.1 核心 API

```typescript
// src/main/plugin/api/index.ts
export namespace whytalk {
    export interface ExtensionContext {
        subscriptions: Disposable[];
        extensionPath: string;
        extensionUri: Uri;
        globalState: Memento;
        workspaceState: Memento;
    }
    
    export namespace commands {
        export function registerCommand(
            command: string, 
            callback: (...args: any[]) => any
        ): Disposable;
        
        export function executeCommand(
            command: string, 
            ...rest: any[]
        ): Thenable<any>;
    }
    
    export namespace window {
        export function showInformationMessage(
            message: string, 
            ...items: string[]
        ): Thenable<string | undefined>;
        
        export function showWarningMessage(
            message: string, 
            ...items: string[]
        ): Thenable<string | undefined>;
        
        export function showErrorMessage(
            message: string, 
            ...items: string[]
        ): Thenable<string | undefined>;
        
        export function registerWebviewViewProvider(
            viewId: string, 
            provider: WebviewViewProvider
        ): Disposable;
    }
    
    export namespace workspace {
        export function getConfiguration(
            section?: string
        ): WorkspaceConfiguration;
    }
}
```

### 5. 包管理集成

#### 5.1 NPM 包结构

```
my-whytalk-plugin/
├── package.json          # NPM包清单 + 插件清单
├── src/
│   ├── extension.ts      # 插件入口
│   └── views/
│       └── main.html     # 视图HTML
├── out/                  # 编译输出
│   └── extension.js
├── README.md
└── CHANGELOG.md
```

#### 5.2 发布到NPM

```bash
# 开发插件
npm init whytalk-plugin my-plugin
cd my-plugin
npm install
npm run compile

# 测试插件
npm run test

# 发布插件
npm publish
```

#### 5.3 插件安装

```bash
# 在应用中安装插件
npm install my-whytalk-plugin

# 或通过应用内插件市场安装
```

### 6. 迁移计划

#### 阶段1：核心架构实现
1. 实现ExtensionHost
2. 实现ContributionPointManager
3. 实现ActivationEventManager
4. 实现基础API

#### 阶段2：插件加载器重构
1. 重构PluginManager以支持新格式
2. 实现package.json解析
3. 实现插件生命周期管理

#### 阶段3：API完善
1. 实现commands API
2. 实现window API
3. 实现workspace API
4. 实现webview API

#### 阶段4：工具链
1. 创建插件脚手架工具
2. 实现插件打包工具
3. 集成NPM包管理

#### 阶段5：迁移现有插件
1. 提供迁移工具
2. 更新现有插件
3. 向后兼容支持

### 7. 优势

1. **标准化**：遵循VSCode成熟的插件系统标准
2. **易开发**：使用TypeScript/JavaScript，无需WASM
3. **生态丰富**：利用NPM生态系统
4. **向后兼容**：保留renderer页面，渐进式迁移
5. **可扩展**：支持丰富的贡献点和激活事件
6. **易调试**：标准的Node.js调试流程

### 8. 实现时间线

- **第1周**：核心架构实现
- **第2周**：插件加载器重构
- **第3周**：API实现
- **第4周**：工具链开发
- **第5-6周**：测试和优化
- **第7-8周**：现有插件迁移

这个设计将显著改善插件开发体验，同时保持系统的灵活性和可扩展性。