# 测试文件目录

本目录包含 WhyTalk 项目的所有测试代码、脚本和相关资源。

## 目录结构

### 📁 scripts/

包含各种测试和开发脚本：

#### 用户管理脚本

- `create-main-user.js` - 创建主用户
- `create-multiple-users.js` - 批量创建用户
- `create-test-user.js` - 创建测试用户
- `create-users-console.js` - 控制台创建用户
- `create-users-simple.js` - 简单用户创建
- `add-test-users.js` - 添加测试用户
- `check-users.js` - 检查用户状态

#### 客户端启动脚本

- `start-client.bat` - Windows 批处理启动客户端
- `start-client.ps1` - PowerShell 启动客户端
- `Start-MultipleClients.ps1` - PowerShell 启动多客户端
- `start-multiple-clients.bat` - 批处理启动多客户端

#### 功能测试脚本

- `test-login.js` - 登录功能测试
- `test-multiple-clients.js` - 多客户端测试
- `test-p2p.js` - P2P 功能测试
- `test-p2p-page.js` - P2P 页面测试
- `test-plugin-api.js` - 插件 API 测试
- `test-plugins.js` - 插件系统测试
- `test-wasm-plugin.js` - WASM 插件测试
- `test-wasm-plugin.mjs` - WASM 插件测试（ES模块）

#### 开发工具脚本

- `plugin-dev-tools.js` - 插件开发工具

### 📁 测试用户数据目录

- `userData-client-1/` - 客户端1的用户数据
- `userData-client-2/` - 客户端2的用户数据
- `userData-client-3/` - 客户端3的用户数据
- `userData-client-4/` - 客户端4的用户数据

### 📁 测试插件

- `test-duplicate-plugin/` - 重复插件测试

### 📄 测试页面和配置

- `plugin-api-test.html` - 插件 API 测试页面
- `plugin-demo.html` - 插件演示页面
- `test-electron-api.html` - Electron API 测试页面
- `ui-config-demo.html` - UI 配置演示页面
- `multi-user-config.json` - 多用户配置文件

## 使用说明

### 多客户端测试

1. 使用 `Start-MultipleClients.ps1` 或 `start-multiple-clients.bat` 启动多个客户端实例
2. 运行 `test-multiple-clients.js` 进行多客户端功能测试

### P2P 功能测试

1. 确保多个客户端正在运行
2. 执行 `test-p2p.js` 测试 P2P 通信功能
3. 使用 `test-p2p-page.js` 测试 P2P 管理界面

### 插件系统测试

1. 运行 `test-plugins.js` 测试插件加载和管理
2. 使用 `test-plugin-api.js` 测试插件 API
3. 执行 `test-wasm-plugin.js` 测试 WASM 插件功能

### 用户管理测试

1. 使用 `create-test-user.js` 创建测试用户
2. 运行 `test-login.js` 测试登录功能
3. 使用 `check-users.js` 验证用户状态

## 注意事项

- 运行测试前请确保应用已正确构建
- 多客户端测试需要足够的系统资源
- 某些测试可能需要网络连接
- P2P 测试需要多个客户端实例同时运行

## 开发建议

- 新增测试脚本请放在 `scripts/` 目录下
- 测试数据和配置文件请放在对应的子目录中
- 保持测试脚本的命名规范：`test-功能名.js`
- 为新的测试脚本添加相应的文档说明
