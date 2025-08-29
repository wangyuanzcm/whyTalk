# Electron 构建产物自动上传功能使用指南

## 功能特性

- 🚀 **自动上传**: 构建完成后自动上传到指定服务器
- 🔄 **重试机制**: 支持上传失败时自动重试
- 📁 **智能过滤**: 自动过滤需要上传的文件类型
- ⚙️ **灵活配置**: 支持自定义上传行为和服务器设置
- 📊 **详细日志**: 提供详细的上传进度和结果统计
- 🗑️ **清理选项**: 可选择上传后删除本地文件
- 🪣 **MinIO 支持**: 支持 MinIO S3 兼容存储和传统 HTTP 上传

## 快速开始

### 1. 构建并上传

使用以下命令可以一键构建并上传：

```bash
# Windows 平台
pnpm run build:win:upload

# macOS 平台
pnpm run build:mac:upload

# Linux 平台
pnpm run build:linux:upload
```

### 2. 仅上传已有构建产物

如果已经有构建产物，只需要上传：

```bash
pnpm run upload
```

## 配置文件

### 默认配置

系统提供了合理的默认配置，位于 `upload.config.js` 文件中：

```javascript
module.exports = {
  // 服务器配置
  server: {
    // 服务器类型: 'minio' 或 'http'
    type: 'minio',

    // MinIO 配置 (当 type 为 'minio' 时使用)
    minio: {
      endPoint: '175.178.158.23',
      port: 19000,
      useSSL: false,
      accessKey: 'your-minio-username', // 替换为实际的 MinIO 用户名
      secretKey: 'your-minio-password', // 替换为实际的 MinIO 密码
      bucketName: 'electron-updates', // 存储桶名称
      pathPrefix: '', // 可选：文件路径前缀
      region: 'us-east-1' // 可选：区域
    },

    // HTTP 配置 (当 type 为 'http' 时使用)
    http: {
      url: 'http://175.178.158.23:19000/electron-updates',
      timeout: 300000, // 5分钟超时
      headers: {
        // 可以添加自定义请求头
        // 'Authorization': 'Bearer your-token'
      }
    }
  },

  // 文件过滤配置
  files: {
    extensions: ['.exe', '.dmg', '.AppImage', '.deb', '.snap', '.yml'],
    exclude: ['*.blockmap', 'builder-effective-config.yaml', 'builder-debug.yml'],
    includeUpdateFiles: true
  },

  // 上传行为配置
  behavior: {
    retry: true,
    retryCount: 3,
    retryDelay: 5000,
    confirmBeforeUpload: false,
    deleteAfterUpload: false
  },

  // 日志配置
  logging: {
    verbose: true,
    showProgress: true
  }
}
```

### 自定义配置

你可以根据需要修改 `upload.config.js` 文件：

1. **服务器配置**:
   - `type`: 服务器类型，支持 `'minio'` 或 `'http'`

   **MinIO 配置** (推荐):
   - `endPoint`: MinIO 服务器地址（不包含协议）
   - `port`: MinIO 服务器端口
   - `useSSL`: 是否使用 HTTPS
   - `accessKey`: MinIO 用户名
   - `secretKey`: MinIO 密码
   - `bucketName`: 存储桶名称
   - `pathPrefix`: 文件路径前缀（可选）
   - `region`: 区域设置（可选）

   **HTTP 配置** (备用):
   - `url`: 上传服务器的完整 URL
   - `timeout`: 请求超时时间（毫秒）
   - `headers`: 自定义 HTTP 请求头（如认证信息）

2. **文件过滤**:
   - `extensions`: 允许上传的文件扩展名
   - `exclude`: 排除的文件模式（支持通配符）
   - `includeUpdateFiles`: 是否包含更新相关文件

3. **上传行为**:
   - `retry`: 是否启用重试机制
   - `retryCount`: 最大重试次数
   - `retryDelay`: 重试间隔时间（毫秒）
   - `confirmBeforeUpload`: 是否在上传前需要用户确认
   - `deleteAfterUpload`: 是否在上传成功后删除本地文件

4. **日志设置**:
   - `verbose`: 是否显示详细日志
   - `showProgress`: 是否显示上传进度

### 配置示例

#### MinIO 服务器配置

```javascript
module.exports = {
  server: {
    type: 'minio',
    minio: {
      endPoint: '175.178.158.23',
      port: 19000,
      useSSL: false,
      accessKey: 'your-minio-username',
      secretKey: 'your-minio-password',
      bucketName: 'electron-updates',
      pathPrefix: 'releases/v1.0.0' // 可选：按版本分组
    }
  }
  // ... 其他配置
}
```

#### HTTP 服务器配置（带认证）

```javascript
module.exports = {
  server: {
    type: 'http',
    http: {
      url: 'https://your-server.com/upload',
      headers: {
        Authorization: 'Bearer your-access-token',
        'X-API-Key': 'your-api-key'
      }
    }
  }
  // ... 其他配置
}
```

#### 自定义文件过滤

```javascript
module.exports = {
  files: {
    // 只上传 Windows 和 macOS 安装包
    extensions: ['.exe', '.dmg'],
    // 排除调试文件
    exclude: ['*debug*', '*.map', '*.blockmap']
  }
  // ... 其他配置
}
```

#### 启用上传确认

```javascript
module.exports = {
  behavior: {
    confirmBeforeUpload: true, // 上传前需要用户确认
    deleteAfterUpload: true // 上传成功后删除本地文件
  }
  // ... 其他配置
}
```

## 脚本说明

### 可用的 npm 脚本

| 脚本命令             | 说明                    |
| -------------------- | ----------------------- |
| `build:win:upload`   | 构建 Windows 版本并上传 |
| `build:mac:upload`   | 构建 macOS 版本并上传   |
| `build:linux:upload` | 构建 Linux 版本并上传   |
| `upload`             | 仅上传已有的构建产物    |

### 上传脚本位置

上传脚本位于 `scripts/upload-release.js`，可以直接运行：

```bash
node scripts/upload-release.js
```

## 上传流程

1. **扫描构建目录** - 自动扫描 `dist` 目录中的文件
2. **文件过滤** - 根据配置过滤需要上传的文件
3. **显示文件列表** - 列出将要上传的文件和大小
4. **确认上传**（可选）- 如果启用了确认功能
5. **执行上传** - 逐个上传文件，支持重试
6. **结果统计** - 显示上传成功和失败的统计信息

## 错误处理

### 常见错误及解决方案

#### 1. 网络连接错误

```
❌ 上传文件时发生错误: why-talk-1.0.0-setup.exe
错误详情: fetch failed
```

**解决方案：**

- 检查网络连接
- 确认服务器地址是否正确
- 检查防火墙设置

#### 2. 服务器认证失败

```
❌ 上传失败: why-talk-1.0.0-setup.exe, 状态码: 401
```

**解决方案：**

- 检查配置文件中的认证信息
- 确认 API 密钥或令牌是否有效

#### 3. 文件过大

```
❌ 上传失败: why-talk-1.0.0-setup.exe, 状态码: 413
```

**解决方案：**

- 增加服务器的文件大小限制
- 调整上传超时时间

### 重试机制

脚本内置了重试机制：

- 默认重试 3 次
- 每次重试间隔 5 秒
- 可在配置文件中调整重试参数

## 日志和调试

### 启用详细日志

在配置文件中设置：

```javascript
module.exports = {
  logging: {
    verbose: true,
    showProgress: true
  }
}
```

### 日志输出示例

```
🚀 开始上传 Electron 构建产物...
服务器地址: http://175.178.158.23:19000/electron-updates
构建目录: D:\github_repo\why-talk\dist

📋 当前配置:
  - 重试机制: 启用
  - 重试次数: 3
  - 上传后删除: 否
  - 支持的扩展名: .exe, .dmg, .AppImage, .deb, .snap, .yml

📦 找到 2 个文件需要上传:
  - why-talk-1.0.0-setup.exe (45.23 MB)
  - latest.yml (0.00 MB)
📊 总大小: 45.23 MB

🔄 开始上传文件...

[1/2] 处理文件: why-talk-1.0.0-setup.exe
📤 开始上传: why-talk-1.0.0-setup.exe (45.23 MB)
✅ 上传成功: why-talk-1.0.0-setup.exe

[2/2] 处理文件: latest.yml
📤 开始上传: latest.yml (0.00 MB)
✅ 上传成功: latest.yml

==================================================
📊 上传结果统计:
✅ 成功: 2 个文件
❌ 失败: 0 个文件
⏱️  总耗时: 12.34 秒

🎉 所有文件上传完成！
🌐 文件已上传到: http://175.178.158.23:19000/electron-updates
```

## 安全注意事项

1. **敏感信息保护**:
   - **重要**: 不要将包含真实 MinIO 用户名/密码的配置文件提交到版本控制系统
   - 使用环境变量存储 MinIO 认证信息：
     ```bash
     # 设置环境变量
     set MINIO_ACCESS_KEY=your-username
     set MINIO_SECRET_KEY=your-password
     ```
   - 在生产环境中使用 HTTPS (设置 `useSSL: true`)
   - 考虑使用 `.gitignore` 排除包含敏感信息的配置文件

2. **MinIO 服务器安全**:
   - 为上传操作创建专用的 MinIO 用户，避免使用管理员账户
   - 设置适当的存储桶策略，限制访问权限
   - 定期轮换 MinIO 访问密钥
   - 启用 MinIO 的访问日志记录

3. **网络安全**:
   - 在生产环境中使用 SSL/TLS 加密传输
   - 考虑使用 VPN 或专用网络连接
   - 配置防火墙规则限制访问

4. **文件验证**:
   - 上传前验证文件完整性
   - 在服务器端进行文件类型和大小检查
   - 使用病毒扫描等安全措施

## 故障排除

如果遇到问题，请按以下步骤排查：

1. **检查构建产物** - 确认 `dist` 目录中有构建文件
2. **验证配置** - 检查 `upload.config.js` 中的服务器地址
3. **测试网络** - 使用浏览器或 curl 测试服务器连接
4. **查看日志** - 启用详细日志查看具体错误信息
5. **手动测试** - 尝试手动上传文件到服务器

## 更新历史

- **v1.1.0** (2024-01-XX)
  - ✨ 新增 MinIO S3 兼容存储支持
  - ✨ 支持 MinIO 和 HTTP 双模式上传
  - ✨ 添加配置验证功能
  - ✨ 改进错误处理和日志输出
  - ✨ 添加存储桶自动创建功能
  - 📚 完善文档和使用指南

- **v1.0.0** (2024-01-XX)
  - 🎉 初始版本发布
  - ✅ 支持基本的 HTTP 文件上传功能
  - ✅ 实现重试机制和错误处理
  - ✅ 添加详细的配置选项
  - ✅ 智能文件过滤和排除规则
