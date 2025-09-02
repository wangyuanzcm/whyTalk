# Sample Extension

这是一个 WhyTalk 示例扩展，展示了如何创建和打包扩展。

## 功能特性

- 示例命令：Hello World
- 信息显示：Show Info
- WebView 界面：Open WebView
- 快捷键支持：Ctrl+Shift+H

## 开发命令

### 构建扩展
```bash
npm run build
# 或者
node build.js build
```

### 监听模式（开发时使用）
```bash
npm run watch
# 或者
node build.js watch
```

### 清理输出目录
```bash
npm run clean
# 或者
node build.js clean
```

### 打包扩展为 ZIP 文件
```bash
npm run package
# 或者
node build.js package
```

打包后的文件将保存在 `dist/` 目录下，文件名格式为：`{扩展名}-{版本号}.zip`

## 安装打包后的扩展

1. 运行 `npm run package` 命令打包扩展
2. 在 `dist/` 目录下找到生成的 zip 文件
3. 在 WhyTalk 应用中通过本地安装功能导入该 zip 文件

## 文件结构

```
sample-extension/
├── src/                    # TypeScript 源代码
│   ├── extension.ts       # 扩展主文件
│   └── whytalk.d.ts      # 类型定义
├── webview/               # WebView 相关文件
│   ├── index.html        # WebView HTML
│   ├── script.js         # WebView JavaScript
│   └── style.css         # WebView 样式
├── out/                   # 编译输出目录
├── dist/                  # 打包输出目录
├── build.js              # 构建脚本
├── package.json          # 扩展配置
├── tsconfig.json         # TypeScript 配置
└── README.md             # 说明文档
```

## 扩展配置

扩展的配置信息在 `package.json` 中定义，包括：

- 扩展名称和描述
- 版本号
- 激活事件
- 贡献的命令、菜单、配置项等

## 开发说明

1. 修改 `src/extension.ts` 来添加新的功能
2. 在 `package.json` 中注册新的命令和配置
3. 使用 `npm run watch` 进行开发时的自动编译
4. 使用 `npm run package` 打包发布