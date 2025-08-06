# LocalSend 协议集成

本模块实现了 LocalSend 协议的原生集成，用于替换 why-talk 项目中原有的 libp2p 广域网通信方案，实现局域网内的设备发现和文件传输。

## 架构概述

### 核心组件

1. **LocalSendProtocol.ts** - 定义 LocalSend 协议的核心接口和数据结构
2. **LocalSendNetworkService.ts** - 主要的网络服务管理器
3. **LocalSendHttpServer.ts** - HTTP 服务器，处理文件传输和消息接收
4. **LocalSendDiscovery.ts** - UDP 设备发现服务
5. **LocalSendHttpClient.ts** - HTTP 客户端，用于发送消息和文件
6. **LocalSendP2PManager.ts** - P2P 管理器，兼容原有的 P2PManager 接口

### 协议特性

- **设备发现**: 使用 UDP 多播在局域网内发现其他设备
- **消息传输**: 通过 HTTP/HTTPS 发送文本消息
- **文件传输**: 支持大文件的分块传输
- **安全性**: 支持 HTTPS 和自签名证书
- **兼容性**: 与 LocalSend 官方协议 v2.1 兼容

## 使用方法

### 基本使用

```typescript
import { LocalSendP2PManager } from './LocalSendP2PManager'

// 创建 P2P 管理器
const p2pManager = new LocalSendP2PManager()

// 启动服务
await p2pManager.start()

// 监听事件
p2pManager.on('peer:discovered', (peer) => {
  console.log('发现新设备:', peer)
})

p2pManager.on('message:received', (message) => {
  console.log('收到消息:', message)
})

// 发送消息
await p2pManager.sendDirectMessage('target-fingerprint', 'Hello!')

// 发送文件
await p2pManager.sendFile('target-fingerprint', '/path/to/file.txt')

// 停止服务
await p2pManager.stop()
```

### 配置选项

```typescript
// 自定义端口和设备别名
const service = new LocalSendNetworkService('MyDevice')
await service.start(53318) // 使用自定义端口
```

## 协议实现细节

### 设备发现

- 使用 UDP 多播地址 `224.0.0.167:53317`
- 每 5 秒广播一次设备信息
- 自动清理 30 秒内未响应的设备

### 消息格式

```json
{
  "alias": "设备名称",
  "version": "2.1",
  "deviceModel": "设备型号",
  "deviceType": "desktop",
  "fingerprint": "设备指纹",
  "port": 53317,
  "protocol": "http",
  "download": false,
  "announce": true
}
```

### HTTP API 端点

- `GET /api/localsend/v2/info` - 获取设备信息
- `POST /api/localsend/v2/send-request` - 发送传输请求
- `POST /api/localsend/v2/upload` - 上传文件
- `POST /api/localsend/v2/message` - 发送消息

## 数据库集成

### 表结构

```sql
-- 设备表
CREATE TABLE localsend_peers (
  fingerprint TEXT PRIMARY KEY,
  alias TEXT NOT NULL,
  ip TEXT NOT NULL,
  port INTEGER NOT NULL,
  device_type TEXT,
  device_model TEXT,
  protocol TEXT,
  last_seen DATETIME,
  created_at DATETIME,
  updated_at DATETIME
);

-- 联系人表
CREATE TABLE localsend_contacts (
  fingerprint TEXT PRIMARY KEY,
  alias TEXT NOT NULL,
  nickname TEXT,
  ip TEXT NOT NULL,
  port INTEGER NOT NULL,
  device_type TEXT,
  device_model TEXT,
  protocol TEXT,
  created_at DATETIME,
  updated_at DATETIME
);

-- 消息表
CREATE TABLE localsend_messages (
  id TEXT PRIMARY KEY,
  from_fingerprint TEXT NOT NULL,
  to_fingerprint TEXT NOT NULL,
  content TEXT NOT NULL,
  message_type TEXT DEFAULT 'text',
  file_path TEXT,
  file_size INTEGER,
  file_type TEXT,
  status TEXT DEFAULT 'sent',
  created_at DATETIME,
  updated_at DATETIME
);
```

## 事件系统

### 可监听事件

- `peer:discovered` - 发现新设备
- `peer:lost` - 设备离线
- `message:received` - 收到消息
- `file:received` - 收到文件
- `file:prepare` - 文件传输准备
- `contact:added` - 添加联系人
- `contact:removed` - 删除联系人

## 测试

运行测试文件：

```bash
ts-node src/main/services/p2p/localsend/test.ts
```

## 注意事项

1. **防火墙配置**: 确保端口 53317 (TCP/UDP) 在防火墙中开放
2. **路由器设置**: 禁用 AP 隔离以允许设备间通信
3. **网络环境**: 仅支持局域网内的设备发现和通信
4. **兼容性**: 与 LocalSend 官方应用完全兼容

## 故障排除

### 常见问题

1. **设备发现失败**
   - 检查防火墙设置
   - 确认设备在同一网段
   - 检查路由器 AP 隔离设置

2. **文件传输失败**
   - 检查磁盘空间
   - 确认文件权限
   - 检查网络连接稳定性

3. **消息发送失败**
   - 确认目标设备在线
   - 检查网络连接
   - 查看错误日志

### 调试模式

启用详细日志输出：

```typescript
// 在环境变量中设置
process.env.DEBUG = 'localsend:*'
```

## 性能优化

- 使用连接池管理 HTTP 连接
- 实现文件分块传输
- 缓存设备发现结果
- 优化数据库查询

## 未来改进

- [ ] 支持 IPv6
- [ ] 实现端到端加密
- [ ] 添加传输进度回调
- [ ] 支持断点续传
- [ ] 实现设备认证机制
