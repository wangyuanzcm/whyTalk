# WhyTalk 自动更新功能

## 功能概述

WhyTalk 应用已集成完整的自动更新功能，支持跨平台的应用程序自动更新。

## 已实现的功能

### 1. 核心更新服务
- ✅ **UpdaterService**: 主要的更新服务类
- ✅ **配置管理**: 支持环境变量和默认配置
- ✅ **事件系统**: 完整的更新事件监听和处理
- ✅ **IPC通信**: 主进程与渲染进程的通信接口

### 2. 前端组件
- ✅ **UpdateManager**: 更新管理器组件，处理更新通知和进度显示
- ✅ **更新设置页面**: 完整的更新配置界面
- ✅ **设置菜单集成**: 在应用设置中添加更新选项

### 3. 类型定义
- ✅ **TypeScript支持**: 完整的类型定义
- ✅ **API接口**: 渲染进程API类型定义
- ✅ **配置类型**: 更新配置的类型定义

### 4. 配置系统
- ✅ **环境变量支持**: 通过环境变量配置更新服务
- ✅ **默认配置**: 合理的默认配置值
- ✅ **配置验证**: 配置有效性验证

## 文件结构

```
src/
├── main/
│   ├── services/updater/
│   │   ├── UpdaterService.ts      # 主要更新服务
│   │   └── types.ts               # 类型定义
│   ├── config/
│   │   └── update.config.ts       # 更新配置
│   └── index.ts                   # 主进程入口（已集成）
├── preload/
│   └── index.ts                   # 预加载脚本（已添加API）
└── renderer/src/
    ├── components/
    │   └── UpdateManager.vue      # 更新管理器组件
    ├── views/setting/
    │   ├── update.vue             # 更新设置页面
    │   └── layout.vue             # 设置布局（已添加菜单）
    ├── types/
    │   └── global.d.ts            # 全局类型定义
    └── layout/
        └── AppProvider.vue        # 应用提供者（已集成组件）
```

## 配置选项

### 环境变量
```bash
UPDATE_SERVER_URL=https://your-server.com/auto-updates
UPDATE_CHECK_INTERVAL=3600000
UPDATE_AUTO_DOWNLOAD=true
UPDATE_CHANNEL=latest
UPDATE_ALLOW_PRERELEASE=false
```

### 默认配置
```typescript
{
  enabled: true,
  serverUrl: 'https://example.com/auto-updates',
  checkInterval: 3600000, // 1小时
  autoDownload: true,
  autoInstallOnAppQuit: true,
  allowPrerelease: false,
  allowDowngrade: false,
  channel: 'latest',
  requestTimeout: 30000,
  autoCheckOnStartup: true,
  startupDelay: 5000
}
```

## 使用方法

### 1. 开发环境测试
```bash
# 构建应用
pnpm run build

# 测试更新功能
pnpm run test:update
```

### 2. 用户界面
1. 打开应用设置
2. 选择"应用更新"
3. 配置更新选项
4. 手动检查或等待自动更新

### 3. API调用
```typescript
// 检查更新
await window.electronAPI.updater.checkForUpdates()

// 下载更新
await window.electronAPI.updater.downloadUpdate()

// 安装更新
await window.electronAPI.updater.quitAndInstall()
```

## 构建和发布

### 1. 构建应用
```bash
# Windows
pnpm run build:win

# macOS
pnpm run build:mac

# Linux
pnpm run build:linux
```

### 2. 发布配置
更新 `electron-builder.yml` 中的发布配置：
```yaml
publish:
  provider: generic
  url: https://your-update-server.com/auto-updates
```

### 3. 服务器部署
将构建产物部署到更新服务器：
- `latest.yml` - Windows更新信息
- `latest-mac.yml` - macOS更新信息
- `latest-linux.yml` - Linux更新信息
- 对应的安装包文件

## 安全考虑

1. **HTTPS**: 更新服务器必须使用HTTPS
2. **代码签名**: 应用程序需要进行代码签名
3. **哈希验证**: 自动验证下载文件的完整性
4. **权限控制**: 安装过程需要适当权限

## 故障排除

### 常见问题
1. **更新检查失败**: 检查网络连接和服务器URL
2. **下载失败**: 验证磁盘空间和网络稳定性
3. **安装失败**: 检查系统权限和杀毒软件

### 调试方法
1. 查看控制台日志
2. 使用测试脚本验证功能
3. 检查更新服务器响应

## 下一步计划

- [ ] 添加更新日志显示
- [ ] 支持增量更新
- [ ] 添加更新回滚功能
- [ ] 优化下载性能
- [ ] 添加更多测试用例

## 相关文档

- [详细使用指南](./doc/AUTO_UPDATE_GUIDE.md)
- [Electron Builder文档](https://www.electron.build/)
- [Electron Updater文档](https://www.electron.build/auto-update)

## 技术栈

- **Electron**: 跨平台桌面应用框架
- **electron-updater**: 自动更新库
- **Vue 3**: 前端框架
- **TypeScript**: 类型安全
- **Naive UI**: UI组件库
- **Pinia**: 状态管理