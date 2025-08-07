# VSCode风格插件系统

## 概述

本项目现在只支持VSCode风格的插件架构，传统的插件系统已被完全移除。

## 架构组件

### 核心文件

- `index.ts` - 插件系统主入口，提供统一的插件管理接口
- `integration.ts` - 插件系统集成管理器，负责IPC通信和系统协调

### VSCode风格插件系统 (`vscode-style/`)

- `VSCodeStylePluginManager.ts` - VSCode风格插件管理器核心
- `ExtensionHost.ts` - 扩展主机，管理插件运行环境
- `ExtensionLoader.ts` - 扩展加载器，负责插件的加载和卸载
- `ContributionPointManager.ts` - 贡献点管理器，处理插件的功能贡献
- `ActivationEventManager.ts` - 激活事件管理器，控制插件的激活时机
- `APIProvider.ts` - API提供者，为插件提供系统API
- `types.ts` - 类型定义文件

## 插件开发

插件需要遵循VSCode扩展的标准格式：

1. **package.json** - 插件清单文件，定义插件元数据和贡献点
2. **主入口文件** - 插件的主要逻辑代码
3. **资源文件** - 图标、样式、模板等静态资源

## 插件目录结构

```
plugins/
├── builtin/          # 内置插件
│   └── example-plugin/
│       ├── package.json
│       └── extension.js
└── user/             # 用户安装的插件
    └── user-plugin/
        ├── package.json
        └── extension.js
```

## API使用

```typescript
import { pluginSystem } from './plugin'

// 初始化插件系统
await pluginSystem.initialize()

// 安装插件
await pluginSystem.installPlugin(pluginPath)

// 卸载插件
await pluginSystem.uninstallPlugin(pluginId)

// 重载插件
await pluginSystem.reloadPlugin(pluginId)

// 获取插件统计信息
const stats = await pluginSystem.getExtensionStats()
```

## 变更说明

### 已移除的组件

- 传统插件管理器 (`PluginManager.ts`)
- 统一插件加载器 (`UnifiedPluginLoader.ts`)
- 安全管理器 (`SecurityManager.ts`)
- 前端插件渲染器 (`FrontendPluginRenderer.ts`)
- WASM插件运行器 (`WasmPluginRunner.ts`)
- 插件数据库 (`PluginDatabase.ts`)
- 所有传统插件服务 (`services/plugin/`)

### 保留的组件

- VSCode风格插件系统的所有组件
- 插件系统主入口和集成管理器

这种架构简化了插件系统的复杂性，提供了更标准化和可维护的插件开发体验。