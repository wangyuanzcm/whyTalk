# WhyTalk 多用户P2P测试完整指南

## 概述

本指南详细说明如何在同一台电脑上使用不同的用户账号进行P2P功能测试。我们已经为您创建了4个独立的用户账号，每个账号都有自己的数据目录和身份。

## 已创建的用户账号

| 客户端  | 用户名  | 手机号      | 密码   | 数据目录          | 端口 |
| ------- | ------- | ----------- | ------ | ----------------- | ---- |
| 客户端1 | Alice   | 13800138001 | 123456 | userData-client-1 | 5173 |
| 客户端2 | Bob     | 13800138002 | 123456 | userData-client-2 | 5174 |
| 客户端3 | Charlie | 13800138003 | 123456 | userData-client-3 | 5175 |
| 客户端4 | Diana   | 13800138004 | 123456 | userData-client-4 | 5176 |

## 快速启动方法

### 方法1: 使用PowerShell脚本（推荐）

```powershell
# 启动2个客户端
.\Start-MultipleClients.ps1 -ClientCount 2

# 启动4个客户端
.\Start-MultipleClients.ps1 -ClientCount 4
```

### 方法2: 手动启动（逐步控制）

#### 启动客户端1 (Alice)

```powershell
# 新开一个PowerShell窗口
$env:ELECTRON_USER_DATA='userData-client-1'
npm run dev
```

#### 启动客户端2 (Bob)

```powershell
# 新开另一个PowerShell窗口
$env:ELECTRON_USER_DATA='userData-client-2'
$env:VITE_DEV_PORT='5174'
npm run dev
```

#### 启动客户端3 (Charlie)

```powershell
# 新开第三个PowerShell窗口
$env:ELECTRON_USER_DATA='userData-client-3'
$env:VITE_DEV_PORT='5175'
npm run dev
```

#### 启动客户端4 (Diana)

```powershell
# 新开第四个PowerShell窗口
$env:ELECTRON_USER_DATA='userData-client-4'
$env:VITE_DEV_PORT='5176'
npm run dev
```

## 访问地址

启动后，在浏览器中访问以下地址：

- **客户端1 (Alice)**: http://localhost:5173
- **客户端2 (Bob)**: http://localhost:5174
- **客户端3 (Charlie)**: http://localhost:5175
- **客户端4 (Diana)**: http://localhost:5176

## P2P测试步骤

### 第1步: 登录各个客户端

1. 在浏览器中打开各个客户端地址
2. 使用对应的登录信息：
   - **Alice**: 手机号 `13800138001`, 密码 `123456`
   - **Bob**: 手机号 `13800138002`, 密码 `123456`
   - **Charlie**: 手机号 `13800138003`, 密码 `123456`
   - **Diana**: 手机号 `13800138004`, 密码 `123456`

### 第2步: 检查P2P连接状态

1. 登录后，导航到P2P管理页面
2. 检查P2P服务状态（应该显示"已连接"）
3. 查看发现的节点列表（应该能看到其他客户端的节点ID）

### 第3步: 添加联系人

1. 在Alice的客户端中，尝试添加Bob为联系人
2. 可以通过以下方式添加：
   - 使用Bob的手机号：`13800138002`
   - 或使用Bob的P2P节点ID（在节点列表中查看）

### 第4步: 发送P2P消息

1. 在Alice的客户端中，选择Bob作为聊天对象
2. 发送一条测试消息
3. 在Bob的客户端中检查是否收到消息
4. Bob回复消息，在Alice的客户端中验证是否收到

### 第5步: 多人群聊测试

1. 创建一个包含Alice、Bob、Charlie的群聊
2. 在群聊中发送消息
3. 验证所有成员都能收到消息

## 技术原理

### 数据隔离

每个客户端使用独立的：

- **用户数据目录**: `userData-client-X`
- **数据库文件**: `userData-client-X/app.db`
- **用户身份**: 独立的用户ID和登录状态
- **P2P节点ID**: 每个客户端有唯一的P2P节点标识

### P2P网络发现

- **mDNS发现**: 客户端通过mDNS协议自动发现同一网络中的其他节点
- **节点通信**: 节点间通过libp2p协议进行直接通信
- **消息路由**: P2P消息不经过服务器，直接在节点间传输

### 端口分配

- **Web界面端口**: 5173, 5174, 5175, 5176
- **P2P通信端口**: 自动分配（通常从9000开始）
- **Electron主进程**: 每个客户端独立运行

## 故障排除

### 问题1: P2P服务未启动

**症状**: P2P状态显示"未连接"或"服务已停止"

**解决方案**:

1. 检查终端日志，查看P2P服务启动情况
2. 重启客户端
3. 检查防火墙设置，确保P2P端口未被阻止

### 问题2: 无法发现其他节点

**症状**: 节点列表为空或只显示自己

**解决方案**:

1. 确保所有客户端都在同一网络中
2. 等待30-60秒，mDNS发现需要时间
3. 检查网络防火墙设置
4. 重启所有客户端

### 问题3: 消息发送失败

**症状**: 消息发送后对方收不到

**解决方案**:

1. 确认双方都已建立P2P连接
2. 检查联系人关系是否正确建立
3. 查看终端日志中的错误信息
4. 尝试重新添加联系人

### 问题4: 数据库错误

**症状**: 启动时出现数据库相关错误

**解决方案**:

1. 删除对应的用户数据目录
2. 重新运行用户创建脚本：`node create-users-simple.js`
3. 重新启动客户端

## 高级配置

### 自定义端口

如果默认端口被占用，可以修改启动脚本中的端口配置：

```powershell
$env:VITE_DEV_PORT='8080'  # 自定义Web端口
$env:P2P_PORT='9001'       # 自定义P2P端口
```

### 添加更多用户

编辑 `create-users-simple.js` 文件，在 `USERS` 数组中添加更多用户配置：

```javascript
{
  clientId: 5,
  nickname: 'Eve',
  mobile: '13800138005',
  password: '123456',
  userDataDir: 'userData-client-5'
}
```

### 网络配置

如果需要跨网络测试，可以修改 `.env` 文件中的P2P配置：

```env
VITE_P2P_BOOTSTRAP_NODES=/ip4/192.168.1.100/tcp/9000/p2p/...
```

## 清理测试数据

测试完成后，可以清理生成的测试数据：

```powershell
# 删除所有用户数据目录
Remove-Item -Recurse -Force userData-client-*

# 删除配置文件
Remove-Item multi-user-config.json
```

## 注意事项

1. **资源消耗**: 多个客户端会消耗较多系统资源
2. **端口冲突**: 确保所有端口都可用
3. **网络环境**: 某些企业网络可能阻止P2P通信
4. **防火墙**: Windows防火墙可能需要允许应用通信
5. **性能**: 建议最多同时运行4个客户端进行测试

## 总结

通过这个多用户P2P测试环境，您可以：

- ✅ 验证P2P节点发现功能
- ✅ 测试点对点消息传输
- ✅ 验证多用户场景下的数据隔离
- ✅ 测试群聊和联系人管理
- ✅ 模拟真实的多用户使用场景

这为WhyTalk的P2P功能提供了完整的测试环境，确保在实际部署前功能的稳定性和可靠性。
