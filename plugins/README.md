# Why-Talk 插件开发指南

## 概述

Why-Talk 支持两种类型的插件：

1. **前端插件** - 基于 HTML/CSS/JavaScript 的 UI 插件
2. **系统插件** - 基于 WebAssembly (WASM) 的系统级插件

## 插件目录结构

```
plugins/
├── frontend-example/          # 前端插件示例
│   ├── cubeModule.json       # 插件配置文件
│   ├── index.html           # 入口HTML文件
│   ├── style.css            # 样式文件
│   └── script.js            # JavaScript文件
└── system-example/           # 系统插件示例
    ├── plugin.json          # 插件配置文件
    └── plugin.wasm          # WASM文件
```

## 前端插件开发

### 1. 配置文件 (cubeModule.json)

```json
{
  "name": "example-frontend-plugin",
  "version": "1.0.0",
  "description": "一个示例前端插件",
  "author": "Your Name",
  "main": "index.html",
  "permissions": [
    "storage",
    "notifications"
  ],
  "dependencies": {
    "vue": "^3.0.0"
  }
}
```

### 2. HTML 入口文件 (index.html)

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>示例插件</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div id="app">
        <h1>Hello, Plugin!</h1>
        <button id="notify-btn">发送通知</button>
        <button id="storage-btn">测试存储</button>
    </div>
    <script src="script.js"></script>
</body>
</html>
```

### 3. JavaScript 文件 (script.js)

```javascript
// 等待插件API准备就绪
window.addEventListener('DOMContentLoaded', async () => {
    console.log('Plugin loaded:', await window.pluginAPI.getPluginInfo())
    
    // 发送通知按钮
    document.getElementById('notify-btn').addEventListener('click', async () => {
        try {
            await window.pluginAPI.notifications.show('Hello', {
                body: '这是来自插件的通知！'
            })
        } catch (error) {
            console.error('Failed to show notification:', error)
        }
    })
    
    // 测试存储按钮
    document.getElementById('storage-btn').addEventListener('click', async () => {
        try {
            await window.pluginAPI.storage.set('test-key', 'Hello World!')
            const value = await window.pluginAPI.storage.get('test-key')
            alert(`存储的值: ${value}`)
        } catch (error) {
            console.error('Failed to test storage:', error)
        }
    })
})
```

## 系统插件开发

### 1. 配置文件 (plugin.json)

```json
{
  "name": "example-system-plugin",
  "version": "1.0.0",
  "description": "一个示例系统插件",
  "author": "Your Name",
  "main": "plugin.wasm",
  "permissions": [
    "filesystem:read",
    "network:access"
  ],
  "functions": [
    "process_text",
    "get_file_info"
  ]
}
```

### 2. Rust 源码示例

```rust
use extism_pdk::*;
use serde::{Deserialize, Serialize};

#[derive(Deserialize)]
struct Input {
    text: String,
}

#[derive(Serialize)]
struct Output {
    result: String,
    length: usize,
}

#[plugin_fn]
pub fn process_text(input: String) -> FnResult<String> {
    let data: Input = serde_json::from_str(&input)?;
    
    let result = Output {
        result: data.text.to_uppercase(),
        length: data.text.len(),
    };
    
    Ok(serde_json::to_string(&result)?)
}

#[plugin_fn]
pub fn get_file_info(input: String) -> FnResult<String> {
    // 实现文件信息获取逻辑
    let info = serde_json::json!({
        "name": "example.txt",
        "size": 1024,
        "modified": "2024-01-01T00:00:00Z"
    });
    
    Ok(info.to_string())
}
```

### 3. 编译 WASM

```bash
# 安装 Rust 和 wasm32 target
rustup target add wasm32-unknown-unknown

# 编译为 WASM
cargo build --target wasm32-unknown-unknown --release

# 复制生成的 WASM 文件
cp target/wasm32-unknown-unknown/release/plugin.wasm ./plugin.wasm
```

## 插件 API 参考

### 前端插件 API

#### 基础信息
- `pluginAPI.getPluginInfo()` - 获取插件信息

#### 权限管理
- `pluginAPI.requestPermission(permission)` - 请求权限
- `pluginAPI.checkPermission(permission)` - 检查权限

#### 存储 API
- `pluginAPI.storage.get(key)` - 获取存储值
- `pluginAPI.storage.set(key, value)` - 设置存储值
- `pluginAPI.storage.remove(key)` - 删除存储值
- `pluginAPI.storage.clear()` - 清空存储

#### 通知 API
- `pluginAPI.notifications.show(title, options)` - 显示通知
- `pluginAPI.notifications.requestPermission()` - 请求通知权限

#### 系统 API（需要权限）
- `pluginAPI.system.getInfo()` - 获取系统信息
- `pluginAPI.system.openExternal(url)` - 打开外部链接

#### 文件 API（需要权限）
- `pluginAPI.files.readText(path)` - 读取文本文件
- `pluginAPI.files.writeText(path, content)` - 写入文本文件
- `pluginAPI.files.exists(path)` - 检查文件是否存在
- `pluginAPI.files.selectFile(options)` - 选择文件
- `pluginAPI.files.selectDirectory(options)` - 选择目录

#### 网络 API（需要权限）
- `pluginAPI.network.fetch(url, options)` - 发起网络请求
- `pluginAPI.network.isOnline()` - 检查网络连接

#### 剪贴板 API（需要权限）
- `pluginAPI.clipboard.readText()` - 读取剪贴板文本
- `pluginAPI.clipboard.writeText(text)` - 写入剪贴板文本
- `pluginAPI.clipboard.readImage()` - 读取剪贴板图片
- `pluginAPI.clipboard.writeImage(image)` - 写入剪贴板图片

#### 窗口控制
- `pluginAPI.window.close()` - 关闭窗口
- `pluginAPI.window.minimize()` - 最小化窗口
- `pluginAPI.window.maximize()` - 最大化窗口
- `pluginAPI.window.setTitle(title)` - 设置窗口标题
- `pluginAPI.window.setSize(width, height)` - 设置窗口大小

### 系统插件 API

系统插件通过 Extism 框架运行，可以使用以下语言开发：
- Rust
- Go
- JavaScript
- Python
- C/C++
- AssemblyScript

## 权限系统

### 可用权限

- `filesystem:read` - 读取文件系统
- `filesystem:write` - 写入文件系统
- `network:access` - 访问网络
- `system:info` - 获取系统信息
- `clipboard` - 访问剪贴板
- `notifications` - 发送通知
- `camera` - 访问摄像头
- `microphone` - 访问麦克风
- `location` - 获取位置信息
- `storage` - 访问本地存储

### 权限请求流程

1. 插件在配置文件中声明需要的权限
2. 插件运行时请求权限
3. 系统弹出权限确认对话框
4. 用户确认后权限生效

## 安全注意事项

1. **沙箱隔离** - 所有插件都在沙箱环境中运行
2. **权限控制** - 严格的权限系统控制插件能力
3. **代码审查** - 建议对第三方插件进行代码审查
4. **数字签名** - 生产环境建议使用数字签名验证插件
5. **资源限制** - 插件有内存和执行时间限制

## 调试和测试

### 前端插件调试

1. 在插件窗口中按 F12 打开开发者工具
2. 使用 `console.log` 输出调试信息
3. 检查网络请求和权限错误

### 系统插件调试

1. 查看主进程控制台输出
2. 使用 Extism CLI 工具测试 WASM 文件
3. 检查插件配置和权限设置

## 插件分发

### 打包插件

```bash
# 创建插件压缩包
tar -czf my-plugin.tar.gz plugin-directory/
```

### 安装插件

1. 将插件目录复制到 `plugins/` 文件夹
2. 重启应用或使用插件管理器重新加载
3. 在插件列表中启用插件

## 示例插件

本目录包含以下示例插件：

- `frontend-example/` - 基础前端插件示例
- `system-example/` - 基础系统插件示例
- `chat-enhancer/` - 聊天增强插件
- `file-manager/` - 文件管理插件

## 常见问题

### Q: 插件无法加载？
A: 检查配置文件格式、文件路径和权限设置。

### Q: 权限被拒绝？
A: 确保在配置文件中声明了所需权限，并且用户已授权。

### Q: 系统插件无法执行？
A: 检查 WASM 文件是否正确编译，函数名是否匹配。

### Q: 如何与主应用通信？
A: 使用 `pluginAPI.sendMessage()` 发送消息到主应用。

## 更多资源

- [Extism 官方文档](https://extism.org/docs/)
- [WebAssembly 开发指南](https://webassembly.org/)
- [Electron 安全最佳实践](https://www.electronjs.org/docs/tutorial/security)