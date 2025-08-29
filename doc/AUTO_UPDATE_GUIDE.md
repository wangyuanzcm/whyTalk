# WhyTalk 自动更新功能指南

## 功能概述

WhyTalk 应用集成了完整的自动更新功能，支持：

- 自动检查更新
- 手动检查更新
- 下载进度显示
- 自动安装更新
- 更新配置管理
- 多更新通道支持

## 功能特性

### 1. 自动更新检查

- 应用启动后自动检查更新（可配置延迟时间）
- 定时检查更新（可配置检查间隔）
- 支持禁用自动检查

### 2. 更新通道

- **稳定版 (latest)**: 正式发布版本
- **测试版 (beta)**: 测试版本，包含新功能
- **开发版 (alpha)**: 开发版本，最新功能但可能不稳定

### 3. 下载控制

- 支持自动下载或手动下载
- 实时显示下载进度
- 支持断点续传

### 4. 安装选项

- 退出时自动安装
- 立即安装并重启
- 延迟安装

## 使用方法

### 1. 访问更新设置

1. 打开应用主界面
2. 点击左侧菜单的"设置"
3. 在设置页面中选择"应用更新"

### 2. 配置更新选项

#### 基本设置

- **启用自动更新**: 开启/关闭自动更新功能
- **更新服务器地址**: 配置更新服务器URL
- **更新通道**: 选择接收更新的通道

#### 下载设置

- **自动下载更新**: 发现更新时是否自动下载
- **退出时自动安装**: 应用退出时是否自动安装已下载的更新

#### 高级设置

- **允许预发布版本**: 是否接收预发布版本
- **启动时检查更新**: 应用启动时是否自动检查更新
- **检查间隔**: 自动检查更新的时间间隔（小时）

### 3. 手动操作

#### 检查更新

点击"检查更新"按钮手动检查是否有可用更新

#### 下载更新

当有可用更新时，点击"下载更新"按钮开始下载

#### 安装更新

下载完成后，点击"安装并重启"按钮安装更新

## 配置文件

### 环境变量配置

可以通过环境变量配置更新服务：

```bash
# 更新服务器URL
UPDATE_SERVER_URL=https://your-update-server.com/auto-updates

# 检查间隔（毫秒）
UPDATE_CHECK_INTERVAL=3600000

# 是否自动下载
UPDATE_AUTO_DOWNLOAD=true

# 更新通道
UPDATE_CHANNEL=latest

# 是否允许预发布版本
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

## 更新服务器配置

### 服务器要求

更新服务器需要支持 `electron-updater` 的 generic provider 格式：

```
https://your-server.com/auto-updates/
├── latest.yml          # Windows 更新信息
├── latest-mac.yml      # macOS 更新信息
├── latest-linux.yml    # Linux 更新信息
├── app-1.0.0.exe       # Windows 安装包
├── app-1.0.0.dmg       # macOS 安装包
└── app-1.0.0.AppImage  # Linux 安装包
```

### 更新信息文件格式

`latest.yml` 示例：

```yaml
version: 1.0.0
files:
  - url: app-1.0.0.exe
    sha512: [文件SHA512哈希]
    size: 52428800
path: app-1.0.0.exe
sha512: [文件SHA512哈希]
releaseDate: '2024-01-01T00:00:00.000Z'
```

## 开发环境

在开发环境中，自动更新功能会被自动禁用，以避免干扰开发过程。

## 安全考虑

1. **HTTPS**: 更新服务器必须使用HTTPS协议
2. **签名验证**: 更新包会进行数字签名验证
3. **哈希校验**: 下载的文件会进行SHA512哈希校验
4. **权限控制**: 安装过程需要适当的系统权限

## 故障排除

### 常见问题

1. **检查更新失败**
   - 检查网络连接
   - 验证更新服务器URL
   - 查看错误日志

2. **下载失败**
   - 检查磁盘空间
   - 验证网络稳定性
   - 重试下载

3. **安装失败**
   - 检查系统权限
   - 关闭杀毒软件
   - 手动安装

### 日志查看

更新相关的日志会记录在应用日志中，可以通过以下方式查看：

- Windows: `%APPDATA%/WhyTalk/logs/`
- macOS: `~/Library/Logs/WhyTalk/`
- Linux: `~/.config/WhyTalk/logs/`

## API 接口

### 主进程 API

```typescript
// 检查更新
await updaterService.checkForUpdates()

// 下载更新
await updaterService.downloadUpdate()

// 安装更新
updaterService.installUpdate()

// 获取状态
const status = updaterService.getStatus()
```

### 渲染进程 API

```typescript
// 检查更新
await window.electronAPI.updater.checkForUpdates()

// 下载更新
await window.electronAPI.updater.downloadUpdate()

// 安装更新
await window.electronAPI.updater.quitAndInstall()

// 获取状态
const status = await window.electronAPI.updater.getStatus()

// 监听事件
window.electronAPI.updater.onUpdateAvailable((info) => {
  console.log('Update available:', info.version)
})
```

## 最佳实践

1. **定期检查**: 建议设置合理的检查间隔，避免过于频繁
2. **用户体验**: 在合适的时机提醒用户更新，避免打断工作流程
3. **网络优化**: 在网络条件良好时进行下载
4. **备份数据**: 更新前建议用户备份重要数据
5. **测试验证**: 发布更新前充分测试各个平台

## 版本发布流程

1. **构建应用**: 使用 `electron-builder` 构建各平台安装包
2. **生成更新信息**: 自动生成 `latest.yml` 等文件
3. **上传文件**: 将安装包和更新信息上传到服务器
4. **验证更新**: 测试更新流程是否正常
5. **发布通知**: 通知用户有新版本可用

## 相关文件

- `src/main/services/updater/UpdaterService.ts` - 更新服务主类
- `src/main/services/updater/types.ts` - 类型定义
- `src/main/config/update.config.ts` - 配置文件
- `src/renderer/src/components/UpdateManager.vue` - 更新管理组件
- `src/renderer/src/views/setting/update.vue` - 更新设置页面
- `electron-builder.yml` - 构建配置
