# WhyTalk 插件开发指南

## 项目结构

本项目使用 pnpm 工作空间管理，每个插件都是一个独立的 npm 项目。

```
why-talk/
├── src/                    # Electron 主项目源码
├── plugins/                # 插件工作空间
│   ├── package.json        # 插件工作空间配置
│   ├── note-plugin/        # 笔记插件
│   │   ├── package.json
│   │   ├── index.html
│   │   ├── script.js
│   │   └── style.css
│   ├── contact-plugin/     # 联系人插件
│   ├── message-plugin/     # 消息插件
│   ├── frontend-example/   # 前端示例插件
│   └── wasm-example/       # WASM 示例插件
├── package.json            # 主项目配置
└── pnpm-workspace.yaml     # pnpm 工作空间配置
```

## 开发环境设置

### 1. 安装依赖

```bash
# 安装主项目依赖
pnpm install

# 安装所有插件依赖
pnpm run plugins:install
```

### 2. 开发模式

```bash
# 启动主应用开发模式
pnpm run dev

# 启动所有插件开发模式
pnpm run plugins:dev

# 启动特定插件开发模式
pnpm --filter=@whytalk/note-plugin run dev
```

### 3. 构建

```bash
# 构建主应用
pnpm run build

# 构建所有插件
pnpm run plugins:build

# 构建特定插件
pnpm --filter=@whytalk/note-plugin run build
```

## 插件开发

### 创建新插件

1. 在 `plugins/` 目录下创建新的插件目录
2. 创建 `package.json` 文件：

```json
{
  "name": "@whytalk/your-plugin-name",
  "version": "1.0.0",
  "description": "你的插件描述",
  "author": "WhyTalk Team",
  "main": "index.html",
  "type": "module",
  "scripts": {
    "dev": "echo \"Plugin development mode\"",
    "build": "echo \"Building plugin\"",
    "test": "echo \"Testing plugin\""
  },
  "dependencies": {
    "vue": "^3.5.17",
    "naive-ui": "^2.41.0"
  },
  "devDependencies": {
    "@types/node": "^22.16.5",
    "typescript": "^5.8.3"
  },
  "peerDependencies": {
    "electron": ">=22.0.0"
  },
  "keywords": ["whytalk", "plugin", "electron"],
  "license": "MIT"
}
```

3. 创建 `cubeModule.json` 配置文件
4. 创建插件的 HTML、JS、CSS 文件
5. 更新 `plugins/package.json` 的 workspaces 配置

### 插件依赖管理

```bash
# 为特定插件添加依赖
pnpm --filter=@whytalk/note-plugin add lodash

# 为特定插件添加开发依赖
pnpm --filter=@whytalk/note-plugin add -D @types/lodash

# 为所有插件添加相同依赖
pnpm -r add vue@^3.5.17
```

### 插件间共享依赖

对于所有插件都需要的依赖（如 Vue、Naive UI），建议：

1. 在主项目的 `package.json` 中声明为 `peerDependencies`
2. 在插件的 `package.json` 中声明为 `peerDependencies`
3. 这样可以避免重复安装，减少包体积

## 常用命令

```bash
# 查看工作空间信息
pnpm list -r

# 清理所有 node_modules
pnpm run plugins:clean

# 重新安装所有依赖
pnpm run plugins:clean && pnpm install && pnpm run plugins:install

# 运行特定插件的脚本
pnpm --filter=@whytalk/note-plugin run build

# 在所有插件中运行相同命令
pnpm -r run test

# 更新所有依赖
pnpm update -r
```

## 注意事项

1. **命名规范**：所有插件包名使用 `@whytalk/` 前缀
2. **版本管理**：插件版本独立管理，遵循语义化版本
3. **依赖管理**：优先使用 peerDependencies 避免重复依赖
4. **构建输出**：插件构建产物应放在各自的 `dist/` 目录
5. **类型支持**：建议为 TypeScript 插件添加类型定义

## 发布流程

1. 更新插件版本号
2. 运行测试和构建
3. 提交代码变更
4. 创建发布标签
5. 发布到 npm（如果需要）

```bash
# 发布特定插件
pnpm --filter=@whytalk/note-plugin publish

# 发布所有插件
pnpm -r publish
```