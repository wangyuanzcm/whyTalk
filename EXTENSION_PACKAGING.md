# 扩展打包指南

本文档介绍如何为 WhyTalk 应用打包扩展。

## 快速开始

### 从主项目根目录打包扩展

```bash
# 打包示例扩展
npm run ext:package

# 构建示例扩展（不打包）
npm run ext:build

# 清理示例扩展输出目录
npm run ext:clean
```

### 从扩展目录打包

```bash
# 进入扩展目录
cd extensions/sample-extension

# 安装依赖（首次运行）
pnpm install

# 打包扩展
npm run package
```

## 打包流程

扩展打包过程包含以下步骤：

1. **构建扩展**：编译 TypeScript 代码到 `out/` 目录
2. **复制资源**：将必要的文件复制到输出目录
3. **创建 ZIP 包**：将所有文件打包为 `.zip` 文件
4. **输出到 dist 目录**：最终的 ZIP 文件保存在 `dist/` 目录

## 打包内容

打包的 ZIP 文件包含以下内容：

- **编译后的代码**：`out/` 目录中的所有 JavaScript 文件和 package.json
- **WebView 文件**：`webview/` 目录中的 HTML、CSS、JavaScript 文件
- **资源文件**：`assets/` 目录中的图片、图标等资源（如果存在）
- **文档文件**：README.md、CHANGELOG.md 等文档（如果存在）

## 文件命名规则

打包后的文件命名格式：`{扩展名}-{版本号}.zip`

例如：`sample-extension-1.0.0.zip`

## 安装打包后的扩展

1. 运行打包命令生成 ZIP 文件
2. 在 WhyTalk 应用中打开扩展管理界面
3. 选择"本地安装"功能
4. 选择生成的 ZIP 文件进行安装

## 扩展开发工作流

### 开发阶段

```bash
# 监听模式，自动编译
npm run watch
```

### 测试阶段

```bash
# 构建扩展
npm run build

# 在 WhyTalk 中测试扩展功能
```

### 发布阶段

```bash
# 打包扩展
npm run package

# 检查 dist/ 目录中的 ZIP 文件
# 测试安装和功能
```

## 扩展结构要求

扩展必须包含以下文件：

- `package.json`：扩展配置文件
- `src/extension.ts`：扩展主入口文件
- `tsconfig.json`：TypeScript 配置
- `build.js`：构建脚本

可选文件：

- `webview/`：WebView 相关文件
- `assets/`：资源文件
- `README.md`：扩展说明文档
- `CHANGELOG.md`：版本更新日志

## 故障排除

### 打包失败

1. 检查是否安装了所有依赖：`pnpm install`
2. 检查 TypeScript 编译是否成功：`npm run build`
3. 检查 `archiver` 依赖是否正确安装

### ZIP 文件为空或过小

1. 确认 `out/` 目录存在且包含编译后的文件
2. 检查 `webview/` 目录是否存在（如果扩展使用 WebView）
3. 查看打包过程中的控制台输出，确认文件是否正确添加

### 安装失败

1. 确认 ZIP 文件结构正确
2. 检查 `package.json` 配置是否符合 WhyTalk 扩展规范
3. 确认扩展版本号格式正确

## 高级配置

### 自定义打包内容

修改 `build.js` 中的 `packageExtension` 函数，可以自定义打包的文件和目录：

```javascript
// 添加自定义目录
const customDir = path.join(__dirname, 'custom')
if (fs.existsSync(customDir)) {
  archive.directory(customDir, 'custom')
}

// 添加自定义文件
const customFile = path.join(__dirname, 'custom.json')
if (fs.existsSync(customFile)) {
  archive.file(customFile, { name: 'custom.json' })
}
```

### 修改压缩级别

在 `build.js` 中修改 archiver 配置：

```javascript
const archive = archiver('zip', {
  zlib: { level: 9 } // 0-9，9为最高压缩级别
})
```