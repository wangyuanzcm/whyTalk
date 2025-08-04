# WhyTalk 项目 pnpm 工作空间迁移指南

## 迁移概述

本项目已成功迁移到 pnpm 工作空间管理模式，实现了主项目和插件的统一依赖管理。

## 项目结构变化

### 迁移前
- 使用 npm 管理依赖
- 插件没有独立的 package.json
- 依赖管理分散

### 迁移后
- 使用 pnpm 工作空间管理
- 每个插件都是独立的 npm 项目
- 统一的依赖管理和构建流程

## 新增文件

### 1. 工作空间配置
- `pnpm-workspace.yaml` - pnpm 工作空间配置
- `plugins/package.json` - 插件工作空间根配置

### 2. 插件 package.json 文件
- `plugins/note-plugin/package.json`
- `plugins/contact-plugin/package.json`
- `plugins/message-plugin/package.json`
- `plugins/frontend-example/package.json`
- `plugins/wasm-example/package.json`

### 3. 文档
- `plugins/PLUGIN_DEVELOPMENT.md` - 插件开发指南
- `PNPM_WORKSPACE_MIGRATION.md` - 本迁移指南

## 配置详情

### pnpm-workspace.yaml
```yaml
packages:
  - '.'
  - 'plugins'
  - 'plugins/*'
  - '!**/node_modules/**'
  - '!**/dist/**'
  - '!**/out/**'
  - '!**/temp_*/**'
  - '!**/userData/**'
  - '!**/tests/**'
```

### 主项目 package.json 变化
1. **脚本更新**：所有 `npm run` 改为 `pnpm run`
2. **新增插件管理脚本**：
   - `plugins:dev` - 启动所有插件开发模式
   - `plugins:build` - 构建所有插件
   - `plugins:install` - 安装所有插件依赖
   - `plugins:clean` - 清理所有插件 node_modules
3. **工作空间配置**：添加 `workspaces: ["plugins/*"]`

### 插件 package.json 结构
每个插件都有标准的 npm 项目结构：
```json
{
  "name": "@whytalk/plugin-name",
  "version": "1.0.0",
  "description": "插件描述",
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
  "peerDependencies": {
    "electron": ">=22.0.0"
  }
}
```

## 使用方法

### 基本命令
```bash
# 安装所有依赖
pnpm install

# 启动主应用
pnpm run dev

# 构建主应用
pnpm run build

# 插件相关命令
pnpm run plugins:install  # 安装所有插件依赖
pnpm run plugins:dev      # 启动所有插件开发模式
pnpm run plugins:build    # 构建所有插件
pnpm run plugins:clean    # 清理所有插件依赖
```

### 插件开发
```bash
# 为特定插件添加依赖
pnpm --filter=@whytalk/note-plugin add lodash

# 运行特定插件的脚本
pnpm --filter=@whytalk/note-plugin run build

# 在所有插件中运行相同命令
pnpm -r run test
```

### 工作空间信息
```bash
# 查看所有工作空间项目
pnpm list -r

# 查看工作空间依赖关系
pnpm list -r --depth=0
```

## 优势

### 1. 统一依赖管理
- 所有项目使用相同的包管理器
- 共享依赖，减少磁盘占用
- 版本一致性保证

### 2. 开发效率提升
- 一键安装所有依赖
- 统一的构建和测试流程
- 插件间依赖关系清晰

### 3. 项目结构清晰
- 每个插件都是独立的 npm 项目
- 标准化的项目结构
- 便于版本管理和发布

### 4. 性能优化
- pnpm 的符号链接机制
- 更快的安装速度
- 更少的磁盘空间占用

## 注意事项

### 1. 命令变更
- 所有 `npm` 命令改为 `pnpm`
- 使用 `--filter` 参数操作特定插件
- 使用 `-r` 参数操作所有工作空间

### 2. 依赖管理
- 优先使用 `peerDependencies` 避免重复依赖
- 插件间共享的依赖在主项目中声明
- 插件特有的依赖在各自的 package.json 中声明

### 3. 构建流程
- 插件构建产物应放在各自的 `dist/` 目录
- 主项目构建时会自动处理插件依赖
- 确保插件的 `main` 字段指向正确的入口文件

## 故障排除

### 依赖安装问题
```bash
# 清理所有依赖重新安装
pnpm run plugins:clean
rm -rf node_modules pnpm-lock.yaml
pnpm install
pnpm run plugins:install
```

### 工作空间识别问题
```bash
# 检查工作空间配置
pnpm list -r

# 验证 pnpm-workspace.yaml 配置
cat pnpm-workspace.yaml
```

### 插件依赖问题
```bash
# 检查特定插件的依赖
pnpm --filter=@whytalk/note-plugin list

# 重新安装特定插件的依赖
pnpm --filter=@whytalk/note-plugin install
```

## 后续开发

1. **新插件开发**：参考 `plugins/PLUGIN_DEVELOPMENT.md`
2. **依赖更新**：使用 `pnpm update -r` 更新所有依赖
3. **版本发布**：每个插件可以独立发布版本
4. **CI/CD 集成**：更新构建脚本使用 pnpm 命令

## 迁移验证

✅ pnpm 工作空间配置正确  
✅ 所有插件识别为独立项目  
✅ 依赖安装成功  
✅ 主项目脚本更新完成  
✅ 插件管理脚本可用  
✅ 文档和指南完整  

迁移已成功完成，项目现在使用 pnpm 工作空间进行统一管理。