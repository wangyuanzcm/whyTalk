# 自动上传功能设置指南

## 快速设置

### 1. 配置 MinIO 认证信息

编辑 `upload.config.js` 文件，替换以下配置：

```javascript
module.exports = {
  server: {
    type: 'minio',
    minio: {
      endPoint: '175.178.158.23',
      port: 19000,
      useSSL: false,
      accessKey: 'your-minio-username',    // 👈 替换为实际的用户名
      secretKey: 'your-minio-password',    // 👈 替换为实际的密码
      bucketName: 'electron-updates',
      pathPrefix: '',                      // 可选：如 'releases/v1.0.0'
      region: 'us-east-1'
    }
  }
  // ... 其他配置保持不变
};
```

### 2. 测试配置

运行以下命令测试配置是否正确：

```bash
# 仅上传（不构建）
pnpm run upload

# 构建并上传 Windows 版本
pnpm run build:win:upload
```

### 3. 安全提醒

⚠️ **重要**: 不要将包含真实认证信息的配置文件提交到 Git 仓库！

建议的安全做法：
1. 将 `upload.config.js` 添加到 `.gitignore`
2. 创建 `upload.config.example.js` 作为模板
3. 在部署环境中单独配置认证信息

## 故障排除

### 常见错误

1. **"Valid and authorized credentials required"**
   - 检查 `accessKey` 和 `secretKey` 是否正确
   - 确认 MinIO 用户有存储桶访问权限

2. **"Bucket does not exist"**
   - 脚本会自动创建存储桶，如果失败请检查权限
   - 手动在 MinIO 控制台创建 `electron-updates` 存储桶

3. **网络连接错误**
   - 检查服务器地址和端口是否正确
   - 确认网络连接正常

### 获取帮助

详细文档请参考：[AUTO_UPLOAD_GUIDE.md](./doc/AUTO_UPLOAD_GUIDE.md)

---

💡 **提示**: 首次使用建议先运行 `pnpm run test:upload-config` 来验证配置。