# WhyTalk 扩展系统架构说明

## 概述

本文档说明了 WhyTalk 扩展系统的新架构设计，将前端页面集成到扩展目录中，实现统一的插件开发体验。

## 架构设计

### 目录结构

```
extensions/
├── sample-extension/                 # 示例扩展
│   ├── package.json                 # 扩展配置文件
│   ├── src/                         # 后台逻辑源码
│   │   ├── extension.ts             # 扩展主入口文件
│   │   └── whytalk.d.ts            # 类型定义文件
│   ├── webview/                     # 前端页面目录
│   │   ├── index.html              # 主页面
│   │   ├── style.css               # 样式文件
│   │   └── script.js               # 脚本文件
│   ├── out/                        # 编译输出目录
│   │   └── extension.js            # 编译后的扩展文件
│   ├── build.js                    # 构建脚本
│   └── tsconfig.json               # TypeScript 配置
└── README.md                        # 本文档
```

### 核心组件

#### 1. 扩展后台 (Extension Backend)

**文件位置**: `src/extension.ts`

**主要功能**:
- 扩展生命周期管理（激活/停用）
- 命令注册和处理
- WebView 面板管理
- 与主应用的 API 交互
- 配置管理

**核心类**:
- `WebViewManager`: 管理 WebView 面板的创建、显示和消息通信

#### 2. 扩展前端 (Extension Frontend)

**文件位置**: `webview/` 目录

**主要功能**:
- 提供用户界面
- 与扩展后台通信
- 处理用户交互
- 显示扩展状态和数据

**核心文件**:
- `index.html`: 主页面结构
- `style.css`: 样式定义
- `script.js`: 交互逻辑和通信处理

#### 3. 配置文件 (package.json)

**主要配置项**:
```json
{
  "contributes": {
    "commands": [                    // 命令定义
      {
        "command": "sample.openWebview",
        "title": "Open WebView",
        "category": "Sample"
      }
    ],
    "webviews": {                   // WebView 配置
      "sample.webview": {
        "title": "Sample Extension",
        "enableScripts": true,
        "localResourceRoots": ["./webview"]
      }
    }
  }
}
```

## 通信机制

### 前端到后台通信

前端通过 `postMessage` 向后台发送消息：

```javascript
// 执行命令
window.parent.postMessage({
  type: 'executeCommand',
  command: 'sample.helloWorld',
  args: {}
}, '*');

// 获取配置
window.parent.postMessage({
  type: 'getConfiguration',
  section: 'sample'
}, '*');
```

### 后台到前端通信

后台通过 WebView API 向前端发送消息：

```typescript
// 发送命令执行结果
this.panel.webview.postMessage({
  type: 'commandResult',
  command: command,
  data: result
});

// 发送配置信息
this.panel.webview.postMessage({
  type: 'configurationResult',
  data: configData
});
```

## 消息类型定义

### 前端到后台消息

| 类型 | 描述 | 参数 |
|------|------|------|
| `webviewReady` | WebView 准备就绪 | - |
| `executeCommand` | 执行命令 | `command`, `args` |
| `getConfiguration` | 获取配置 | `section` |
| `updateConfiguration` | 更新配置 | `section`, `config` |
| `getExtensionInfo` | 获取扩展信息 | - |

### 后台到前端消息

| 类型 | 描述 | 参数 |
|------|------|------|
| `commandResult` | 命令执行结果 | `command`, `data`, `error` |
| `configurationResult` | 配置获取结果 | `data`, `error` |
| `extensionMessage` | 扩展消息 | `data` |
| `extensionError` | 扩展错误 | `error` |
| `statusUpdate` | 状态更新 | `data` |

## 开发指南

### 1. 创建新扩展

1. 在 `extensions/` 目录下创建新的扩展目录
2. 复制 `sample-extension` 作为模板
3. 修改 `package.json` 中的扩展信息
4. 实现扩展逻辑和前端界面

### 2. 扩展后台开发

```typescript
// 注册命令
const command = api.commands.registerCommand('extension.command', () => {
  // 命令逻辑
});

// 创建 WebView
const webViewManager = new WebViewManager(context, api);
webViewManager.createOrShow();
```

### 3. 扩展前端开发

```javascript
// 发送消息到后台
extensionWebView.sendMessage({
  type: 'executeCommand',
  command: 'extension.command'
});

// 处理后台消息
extensionWebView.handleMessage = (message) => {
  // 处理逻辑
};
```

### 4. 构建和部署

```bash
# 编译 TypeScript
npm run build

# 或使用构建脚本
node build.js
```

## 优势

### 1. 统一的开发体验
- 前端和后台代码在同一个扩展目录中
- 统一的配置文件管理
- 一致的开发工具链

### 2. 更好的代码组织
- 清晰的目录结构
- 分离的关注点（后台逻辑 vs 前端界面）
- 模块化的代码组织

### 3. 增强的功能
- 双向通信机制
- 丰富的 WebView 功能
- 灵活的配置选项

### 4. 易于维护
- 独立的扩展包
- 版本化管理
- 热重载支持

## 迁移指南

### 从旧的插件系统迁移

1. **移动前端文件**:
   - 将 `plugins/plugin-name/` 中的前端文件移动到 `extensions/plugin-name/webview/`

2. **创建扩展后台**:
   - 创建 `src/extension.ts` 文件
   - 实现扩展激活函数和命令处理

3. **更新配置**:
   - 创建 `package.json` 配置文件
   - 定义命令和 WebView 配置

4. **适配通信机制**:
   - 更新前端代码使用新的消息格式
   - 实现后台消息处理逻辑

## 最佳实践

### 1. 错误处理
- 在后台和前端都实现完善的错误处理
- 提供用户友好的错误信息
- 记录详细的调试日志

### 2. 性能优化
- 使用消息队列处理大量通信
- 实现 WebView 的懒加载
- 优化前端资源加载

### 3. 安全考虑
- 验证来自前端的消息
- 限制 WebView 的权限
- 避免执行不安全的代码

### 4. 用户体验
- 提供加载状态指示
- 实现优雅的错误恢复
- 保持界面响应性

## 示例扩展

`sample-extension` 提供了一个完整的示例，展示了：
- 基本的扩展结构
- 命令注册和处理
- WebView 创建和管理
- 前后端通信
- 配置管理
- 用户界面设计

开发者可以基于此示例快速开始新扩展的开发。