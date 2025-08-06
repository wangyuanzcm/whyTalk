# WhyTalk 插件格式规范文档

## 概述

WhyTalk 支持两种类型的插件：前端插件（Frontend Plugin）和系统插件（System Plugin）。本文档详细说明了插件的配置格式、目录结构、开发规范和最佳实践。

## 目录

- [插件类型](#插件类型)
- [目录结构](#目录结构)
- [配置文件格式](#配置文件格式)
- [前端插件开发](#前端插件开发)
- [系统插件开发](#系统插件开发)
- [权限系统](#权限系统)
- [数据存储](#数据存储)
- [API 调用](#api-调用)
- [最佳实践](#最佳实践)
- [示例插件](#示例插件)

## 插件类型

### 前端插件 (Frontend Plugin)

- **运行环境**：独立的渲染进程
- **技术栈**：HTML/CSS/JavaScript
- **用途**：提供用户界面和交互功能
- **特点**：可以使用现代前端框架（Vue、React 等）

### 系统插件 (System Plugin)

- **运行环境**：主进程中的 WebAssembly 运行时
- **技术栈**：WebAssembly (WASM)
- **用途**：提供后台服务和数据处理功能
- **特点**：高性能、安全隔离

### 混合插件 (Hybrid Plugin)

- **组合模式**：同时包含前端界面和系统服务
- **配置**：`main` 指向 HTML 文件，同时包含 `plugin.wasm`
- **用途**：复杂功能的完整解决方案

## 目录结构

### 前端插件目录结构

```
my-frontend-plugin/
├── cubeModule.json          # 插件配置文件
├── index.html              # 主入口文件
├── script.js               # 主逻辑文件
├── style.css               # 样式文件
├── assets/                 # 静态资源目录
│   ├── icons/
│   │   └── icon.png        # 插件图标
│   └── images/
├── components/             # 组件目录（可选）
├── utils/                  # 工具函数目录（可选）
└── README.md              # 插件说明文档
```

### 系统插件目录结构

```
my-system-plugin/
├── cubeModule.json          # 插件配置文件
├── plugin.wasm             # WASM 主文件
├── src/                    # 源代码目录（开发时）
│   ├── lib.rs              # Rust 源码示例
│   └── Cargo.toml          # Rust 项目配置
├── assets/                 # 静态资源目录
│   └── icons/
│       └── icon.png        # 插件图标
└── README.md              # 插件说明文档
```

### 混合插件目录结构

```
my-hybrid-plugin/
├── cubeModule.json          # 插件配置文件
├── index.html              # 前端入口文件
├── script.js               # 前端逻辑文件
├── style.css               # 前端样式文件
├── plugin.wasm             # 系统服务文件
├── assets/                 # 静态资源目录
│   └── icons/
│       └── icon.png        # 插件图标
├── src/                    # 源代码目录
│   ├── frontend/           # 前端源码
│   └── backend/            # 后端源码
└── README.md              # 插件说明文档
```

## 配置文件格式

### cubeModule.json 完整配置

```json
{
  "name": "插件名称",
  "version": "1.0.0",
  "description": "插件描述",
  "author": "作者信息",
  "license": "MIT",
  "homepage": "https://example.com",
  "repository": {
    "type": "git",
    "url": "https://github.com/user/plugin.git"
  },
  "keywords": ["chat", "utility", "productivity"],

  "type": "frontend",
  "main": "index.html",
  "icon": "assets/icons/icon.png",
  "menuTitle": "插件菜单标题",

  "permissions": [
    "storage",
    "notifications",
    "ipc",
    "database",
    "p2p",
    "network",
    "file_system",
    "clipboard",
    "window_control",
    "contacts",
    "messages",
    "conversations"
  ],

  "dependencies": {
    "vue": "^3.0.0",
    "naive-ui": "^2.0.0"
  },

  "routes": [
    {
      "path": "/",
      "component": "MainView"
    },
    {
      "path": "/settings",
      "component": "SettingsView"
    }
  ],

  "ui": {
    "width": 800,
    "height": 600,
    "resizable": true,
    "minimizable": true,
    "maximizable": true,
    "alwaysOnTop": false,
    "frame": true,
    "transparent": false,
    "webSecurity": true
  },

  "settings": {
    "page": "settings.html",
    "title": "插件设置",
    "icon": "assets/icons/settings.png"
  },

  "systemPlugin": {
    "wasmFile": "plugin.wasm",
    "exports": ["init", "process_data", "cleanup"]
  },

  "lifecycle": {
    "onInstall": "handleInstall",
    "onUninstall": "handleUninstall",
    "onEnable": "handleEnable",
    "onDisable": "handleDisable",
    "onUpdate": "handleUpdate"
  },

  "metadata": {
    "category": "productivity",
    "tags": ["note", "collaboration"],
    "minAppVersion": "1.0.0",
    "maxAppVersion": "2.0.0",
    "supportedPlatforms": ["win32", "darwin", "linux"]
  }
}
```

### 配置字段说明

#### 基础信息

| 字段          | 类型     | 必需 | 说明                   |
| ------------- | -------- | ---- | ---------------------- |
| `name`        | string   | ✓    | 插件名称，必须唯一     |
| `version`     | string   | ✓    | 版本号，遵循语义化版本 |
| `description` | string   | ✓    | 插件描述               |
| `author`      | string   | ✓    | 作者信息               |
| `license`     | string   | -    | 许可证类型             |
| `homepage`    | string   | -    | 主页地址               |
| `repository`  | object   | -    | 代码仓库信息           |
| `keywords`    | string[] | -    | 关键词标签             |

#### 插件配置

| 字段        | 类型   | 必需 | 说明                                     |
| ----------- | ------ | ---- | ---------------------------------------- |
| `type`      | string | ✓    | 插件类型：`frontend`、`system`、`hybrid` |
| `main`      | string | ✓    | 主入口文件路径                           |
| `icon`      | string | -    | 插件图标路径                             |
| `menuTitle` | string | -    | 菜单显示标题                             |

#### 权限配置

| 权限             | 说明             |
| ---------------- | ---------------- |
| `storage`        | 数据存储权限     |
| `database`       | 数据库访问权限   |
| `shared_data`    | 共享数据访问权限 |
| `ipc`            | IPC 通信权限     |
| `p2p`            | P2P 通信权限     |
| `network`        | 网络访问权限     |
| `file_system`    | 文件系统访问权限 |
| `notifications`  | 通知权限         |
| `clipboard`      | 剪贴板权限       |
| `window_control` | 窗口控制权限     |
| `system_info`    | 系统信息权限     |
| `contacts`       | 联系人访问权限   |
| `messages`       | 消息访问权限     |
| `conversations`  | 会话访问权限     |

#### UI 配置

| 字段          | 类型    | 默认值 | 说明              |
| ------------- | ------- | ------ | ----------------- |
| `width`       | number  | 800    | 窗口宽度          |
| `height`      | number  | 600    | 窗口高度          |
| `resizable`   | boolean | true   | 是否可调整大小    |
| `minimizable` | boolean | true   | 是否可最小化      |
| `maximizable` | boolean | true   | 是否可最大化      |
| `alwaysOnTop` | boolean | false  | 是否置顶显示      |
| `frame`       | boolean | true   | 是否显示窗口边框  |
| `transparent` | boolean | false  | 是否透明背景      |
| `webSecurity` | boolean | true   | 是否启用 Web 安全 |

## 前端插件开发

### 基础模板

#### index.html

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>我的插件</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <div id="app">
      <header class="plugin-header">
        <h1>我的插件</h1>
        <div class="plugin-actions">
          <button id="settingsBtn">设置</button>
        </div>
      </header>

      <main class="plugin-content">
        <!-- 插件主要内容 -->
      </main>

      <footer class="plugin-footer">
        <div class="status-bar">
          <span id="statusText">就绪</span>
        </div>
      </footer>
    </div>

    <script src="script.js"></script>
  </body>
</html>
```

#### script.js

```javascript
class MyPlugin {
  constructor() {
    this.pluginId = 'my-plugin'
    this.api = window.electronAPI
    this.pluginAPI = window.PluginAPI
    this.initialized = false
  }

  async init() {
    try {
      // 检查权限
      await this.checkPermissions()

      // 初始化 UI
      this.initUI()

      // 加载数据
      await this.loadData()

      // 设置事件监听
      this.setupEventListeners()

      this.initialized = true
      this.updateStatus('插件已就绪')
    } catch (error) {
      console.error('插件初始化失败:', error)
      this.updateStatus('初始化失败')
    }
  }

  async checkPermissions() {
    const requiredPermissions = ['storage', 'notifications']

    for (const permission of requiredPermissions) {
      const hasPermission = await this.pluginAPI.permissions.check(permission)
      if (!hasPermission) {
        const granted = await this.pluginAPI.permissions.request(permission)
        if (!granted) {
          throw new Error(`缺少必要权限: ${permission}`)
        }
      }
    }
  }

  initUI() {
    // 初始化用户界面
    const settingsBtn = document.getElementById('settingsBtn')
    settingsBtn.addEventListener('click', () => this.openSettings())
  }

  async loadData() {
    try {
      // 加载插件数据
      const config = await this.pluginAPI.storage.getData('config')
      if (config.success && config.data) {
        this.applyConfig(config.data)
      }
    } catch (error) {
      console.error('加载数据失败:', error)
    }
  }

  setupEventListeners() {
    // 监听 P2P 消息
    this.api.p2p.onMessage((message) => {
      this.handleP2PMessage(message)
    })

    // 监听联系人变化
    this.api.p2p.onContactUpdate((contact) => {
      this.handleContactUpdate(contact)
    })
  }

  async handleP2PMessage(message) {
    // 处理 P2P 消息
    console.log('收到 P2P 消息:', message)

    // 显示通知
    await this.pluginAPI.notifications.show('新消息', {
      body: message.content,
      icon: 'assets/icons/message.png'
    })
  }

  handleContactUpdate(contact) {
    // 处理联系人更新
    console.log('联系人更新:', contact)
  }

  async saveData(key, value) {
    try {
      const result = await this.pluginAPI.storage.setData(key, value)
      if (!result.success) {
        throw new Error(result.error)
      }
    } catch (error) {
      console.error('保存数据失败:', error)
    }
  }

  async openSettings() {
    // 打开设置页面
    // 可以通过路由或新窗口实现
  }

  updateStatus(text) {
    const statusElement = document.getElementById('statusText')
    if (statusElement) {
      statusElement.textContent = text
    }
  }

  // 插件生命周期方法
  async onEnable() {
    console.log('插件已启用')
  }

  async onDisable() {
    console.log('插件已禁用')
  }

  async onUninstall() {
    // 清理数据
    await this.pluginAPI.storage.deleteData('config')
    console.log('插件已卸载')
  }
}

// 插件实例
const myPlugin = new MyPlugin()

// 页面加载完成后初始化插件
document.addEventListener('DOMContentLoaded', () => {
  myPlugin.init()
})

// 暴露插件实例供基座调用
window.pluginInstance = myPlugin
```

#### style.css

```css
/* 插件基础样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #f5f5f5;
  color: #333;
}

#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.plugin-header {
  background-color: #fff;
  border-bottom: 1px solid #e0e0e0;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.plugin-header h1 {
  font-size: 18px;
  font-weight: 600;
}

.plugin-actions button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.plugin-actions button:hover {
  background-color: #0056b3;
}

.plugin-content {
  flex: 1;
  padding: 16px;
  overflow-y: auto;
}

.plugin-footer {
  background-color: #fff;
  border-top: 1px solid #e0e0e0;
  padding: 8px 16px;
}

.status-bar {
  font-size: 12px;
  color: #666;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .plugin-header {
    padding: 12px;
  }

  .plugin-header h1 {
    font-size: 16px;
  }

  .plugin-content {
    padding: 12px;
  }
}
```

## 系统插件开发

### Rust 示例

#### Cargo.toml

```toml
[package]
name = "my-system-plugin"
version = "1.0.0"
edition = "2021"

[lib]
crate-type = ["cdylib"]

[dependencies]
wasm-bindgen = "0.2"
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"
web-sys = "0.3"

[dependencies.wasm-bindgen]
version = "0.2"
features = [
  "serde-serialize",
]
```

#### src/lib.rs

```rust
use wasm_bindgen::prelude::*;
use serde::{Deserialize, Serialize};

// 插件配置结构
#[derive(Serialize, Deserialize)]
struct PluginConfig {
    enabled: bool,
    settings: serde_json::Value,
}

// 插件状态
static mut PLUGIN_STATE: Option<PluginConfig> = None;

// 初始化函数
#[wasm_bindgen]
pub fn init(config_json: &str) -> String {
    let config: PluginConfig = match serde_json::from_str(config_json) {
        Ok(c) => c,
        Err(e) => return format!("{{\"success\": false, \"error\": \"{}\"}}", e),
    };

    unsafe {
        PLUGIN_STATE = Some(config);
    }

    "{\"success\": true}".to_string()
}

// 数据处理函数
#[wasm_bindgen]
pub fn process_data(input_json: &str) -> String {
    let input: serde_json::Value = match serde_json::from_str(input_json) {
        Ok(v) => v,
        Err(e) => return format!("{{\"success\": false, \"error\": \"{}\"}}", e),
    };

    // 处理数据逻辑
    let result = match input["operation"].as_str() {
        Some("transform") => transform_data(&input["data"]),
        Some("validate") => validate_data(&input["data"]),
        Some("analyze") => analyze_data(&input["data"]),
        _ => return "{\"success\": false, \"error\": \"Unknown operation\"}".to_string(),
    };

    format!("{{\"success\": true, \"data\": {}}}", result)
}

// 数据转换
fn transform_data(data: &serde_json::Value) -> String {
    // 实现数据转换逻辑
    serde_json::to_string(data).unwrap_or_default()
}

// 数据验证
fn validate_data(data: &serde_json::Value) -> String {
    // 实现数据验证逻辑
    let is_valid = data.is_object() && !data.as_object().unwrap().is_empty();
    format!("{{\"valid\": {}}}", is_valid)
}

// 数据分析
fn analyze_data(data: &serde_json::Value) -> String {
    // 实现数据分析逻辑
    let analysis = serde_json::json!({
        "type": data.get("type").unwrap_or(&serde_json::Value::Null),
        "size": data.to_string().len(),
        "timestamp": js_sys::Date::now()
    });

    serde_json::to_string(&analysis).unwrap_or_default()
}

// 清理函数
#[wasm_bindgen]
pub fn cleanup() -> String {
    unsafe {
        PLUGIN_STATE = None;
    }

    "{\"success\": true}".to_string()
}

// 获取插件状态
#[wasm_bindgen]
pub fn get_status() -> String {
    unsafe {
        match &PLUGIN_STATE {
            Some(state) => serde_json::to_string(state).unwrap_or_default(),
            None => "{\"enabled\": false}".to_string(),
        }
    }
}

// 日志函数（由基座提供）
#[wasm_bindgen]
extern "C" {
    fn log(message: &str);
}

// 辅助宏
macro_rules! plugin_log {
    ($($arg:tt)*) => {
        log(&format!($($arg)*));
    };
}
```

### 构建脚本

#### build.sh (Linux/macOS)

```bash
#!/bin/bash

# 构建 WASM 文件
wasm-pack build --target web --out-dir pkg

# 复制 WASM 文件到插件目录
cp pkg/my_system_plugin.wasm ./plugin.wasm

# 清理临时文件
rm -rf pkg

echo "构建完成: plugin.wasm"
```

#### build.bat (Windows)

```batch
@echo off

REM 构建 WASM 文件
wasm-pack build --target web --out-dir pkg

REM 复制 WASM 文件到插件目录
copy pkg\my_system_plugin.wasm .\plugin.wasm

REM 清理临时文件
rmdir /s /q pkg

echo 构建完成: plugin.wasm
```

## 权限系统

### 权限声明

在 `cubeModule.json` 中声明所需权限：

```json
{
  "permissions": [
    "storage", // 数据存储
    "database", // 数据库访问
    "ipc", // IPC 通信
    "p2p", // P2P 通信
    "network", // 网络访问
    "file_system", // 文件系统
    "notifications", // 通知
    "clipboard", // 剪贴板
    "contacts", // 联系人
    "messages" // 消息
  ]
}
```

### 权限检查

```javascript
// 检查权限
const hasPermission = await window.PluginAPI.permissions.check('storage')

if (!hasPermission) {
  // 请求权限
  const granted = await window.PluginAPI.permissions.request('storage')
  if (!granted) {
    throw new Error('用户拒绝了存储权限')
  }
}
```

### 权限最佳实践

1. **最小权限原则**：只申请必要的权限
2. **动态权限请求**：在需要时才请求权限
3. **权限说明**：向用户解释为什么需要某个权限
4. **优雅降级**：在权限被拒绝时提供替代方案

## 数据存储

### 私有数据存储

```javascript
// 保存数据
const result = await window.PluginAPI.storage.setData('user_preferences', {
  theme: 'dark',
  language: 'zh-CN',
  notifications: true
})

// 读取数据
const data = await window.PluginAPI.storage.getData('user_preferences')
if (data.success) {
  console.log('用户偏好:', data.data)
}

// 删除数据
await window.PluginAPI.storage.deleteData('user_preferences')

// 列出所有数据
const allData = await window.PluginAPI.storage.listData()
```

### 共享数据存储

```javascript
// 设置共享数据
await window.PluginAPI.storage.setSharedData('global', 'app_theme', 'dark')

// 读取共享数据
const theme = await window.PluginAPI.storage.getSharedData('global', 'app_theme')

// 缓存联系人数据
await window.PluginAPI.storage.cacheContacts(contactList)

// 获取缓存的联系人
const contacts = await window.PluginAPI.storage.getCachedContacts()
```

## API 调用

### P2P 通信

```javascript
// 发送直接消息
const result = await window.electronAPI.p2p.sendDirectMessage({
  to: 'peer-id-123',
  content: 'Hello, World!',
  messageType: 1
})

// 发送群组消息
await window.electronAPI.p2p.sendGroupMessage({
  groupId: 'group-456',
  content: 'Group message',
  messageType: 1
})

// 获取联系人列表
const contacts = await window.electronAPI.p2p.getContacts()
```

### 文件操作

```javascript
// 选择文件
const files = await window.PluginAPI.file.selectFile({
  title: '选择图片',
  filters: [{ name: '图片', extensions: ['jpg', 'png', 'gif'] }],
  multiSelections: true
})

// 读取文件内容
const content = await window.PluginAPI.file.readText(files[0])

// 写入文件
await window.PluginAPI.file.writeText('/path/to/file.txt', 'Hello, World!')
```

### 通知

```javascript
// 显示通知
await window.PluginAPI.notifications.show('新消息', {
  body: '您有一条新消息',
  icon: 'assets/icons/message.png',
  tag: 'message-notification',
  requireInteraction: true
})
```

## 最佳实践

### 1. 错误处理

```javascript
class PluginErrorHandler {
  static async safeCall(fn, fallback = null) {
    try {
      return await fn()
    } catch (error) {
      console.error('插件操作失败:', error)
      return fallback
    }
  }

  static handleAPIError(response) {
    if (!response.success) {
      throw new Error(response.error || '未知错误')
    }
    return response.data
  }
}

// 使用示例
const data = await PluginErrorHandler.safeCall(async () => {
  const response = await window.PluginAPI.storage.getData('config')
  return PluginErrorHandler.handleAPIError(response)
}, {})
```

### 2. 性能优化

```javascript
class PluginPerformance {
  constructor() {
    this.cache = new Map()
    this.debounceTimers = new Map()
  }

  // 缓存机制
  async getCachedData(key, fetcher, ttl = 60000) {
    const cached = this.cache.get(key)
    if (cached && Date.now() - cached.timestamp < ttl) {
      return cached.data
    }

    const data = await fetcher()
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    })

    return data
  }

  // 防抖处理
  debounce(key, fn, delay = 300) {
    const timer = this.debounceTimers.get(key)
    if (timer) {
      clearTimeout(timer)
    }

    this.debounceTimers.set(
      key,
      setTimeout(() => {
        fn()
        this.debounceTimers.delete(key)
      }, delay)
    )
  }
}
```

### 3. 国际化支持

```javascript
class PluginI18n {
  constructor() {
    this.locale = 'zh-CN'
    this.messages = {}
  }

  async loadMessages(locale) {
    try {
      const response = await fetch(`./locales/${locale}.json`)
      this.messages[locale] = await response.json()
      this.locale = locale
    } catch (error) {
      console.warn(`无法加载语言包: ${locale}`)
    }
  }

  t(key, params = {}) {
    const message = this.messages[this.locale]?.[key] || key
    return message.replace(/\{(\w+)\}/g, (match, param) => {
      return params[param] || match
    })
  }
}
```

### 4. 主题支持

```css
/* CSS 变量定义 */
:root {
  --primary-color: #007bff;
  --secondary-color: #6c757d;
  --background-color: #ffffff;
  --text-color: #333333;
  --border-color: #e0e0e0;
}

[data-theme='dark'] {
  --primary-color: #0d6efd;
  --secondary-color: #6c757d;
  --background-color: #1a1a1a;
  --text-color: #ffffff;
  --border-color: #333333;
}

/* 使用 CSS 变量 */
.plugin-header {
  background-color: var(--background-color);
  color: var(--text-color);
  border-bottom: 1px solid var(--border-color);
}
```

## 示例插件

### 笔记插件 (note-plugin)

这是一个完整的笔记插件示例，展示了前端插件的最佳实践：

**功能特性：**

- 笔记创建、编辑、删除
- P2P 协作功能
- 数据持久化存储
- 搜索和过滤
- 实时同步

**技术栈：**

- 原生 JavaScript
- CSS3 动画
- IndexedDB 本地存储
- WebSocket 实时通信

**文件结构：**

```
note-plugin/
├── cubeModule.json
├── index.html
├── script.js
├── style.css
└── assets/
    └── icons/
        └── icon.png
```

### 系统监控插件 (system-monitor)

这是一个系统插件示例，展示了 WASM 插件的开发模式：

**功能特性：**

- 系统资源监控
- 性能数据收集
- 后台数据处理
- 定时任务执行

**技术栈：**

- Rust + WebAssembly
- 系统 API 调用
- 数据分析算法

## 调试和测试

### 开发者工具

```javascript
// 启用调试模式
if (process.env.NODE_ENV === 'development') {
  window.PluginAPI.debug.enable()

  // 添加调试信息
  window.PluginAPI.debug.log('插件初始化开始')

  // 性能监控
  window.PluginAPI.debug.startTimer('init')
  // ... 初始化代码
  window.PluginAPI.debug.endTimer('init')
}
```

### 单元测试

```javascript
// 插件测试框架
class PluginTester {
  static async testAPI(apiName, params, expected) {
    try {
      const result = await window.PluginAPI[apiName](...params)
      console.assert(JSON.stringify(result) === JSON.stringify(expected), `API ${apiName} 测试失败`)
      return true
    } catch (error) {
      console.error(`API ${apiName} 测试异常:`, error)
      return false
    }
  }
}

// 测试用例
PluginTester.testAPI('storage.setData', ['test', 'value'], { success: true })
```

## 发布和分发

### 插件打包

```bash
# 创建插件包
zip -r my-plugin.zip my-plugin/

# 或使用 tar
tar -czf my-plugin.tar.gz my-plugin/
```

### 版本管理

遵循语义化版本控制：

- **主版本号**：不兼容的 API 更改
- **次版本号**：向后兼容的功能性新增
- **修订号**：向后兼容的问题修正

### 发布清单

- [ ] 更新版本号
- [ ] 更新 CHANGELOG.md
- [ ] 运行测试套件
- [ ] 构建生产版本
- [ ] 创建发布包
- [ ] 更新文档
- [ ] 发布到插件市场

---

本规范文档将持续更新，请关注最新版本。如有疑问或建议，请联系开发团队。
