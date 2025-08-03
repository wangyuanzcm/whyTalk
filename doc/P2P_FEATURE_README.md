# WhyTalk P2P 功能说明

## 概述

WhyTalk 现已集成了完整的 P2P (点对点) 网络功能，基于 libp2p 技术栈实现，支持局域网内的去中心化通信。

## 功能特性

### 🌐 网络发现
- **UDP 广播发现**: 自动发现局域网内的其他 P2P 节点
- **节点管理**: 实时显示已发现节点的状态和连接信息
- **自动连接**: 支持手动连接到指定节点

### 💬 消息通信
- **点对点消息**: 直接向其他节点发送消息
- **群组消息**: 创建和管理 P2P 群组，支持群组聊天
- **消息持久化**: 所有消息保存到本地 SQLite 数据库

### 👥 联系人管理
- **添加联系人**: 将发现的节点添加为联系人
- **联系人状态**: 实时显示联系人在线状态
- **备注管理**: 为联系人设置昵称和备注

### 🔐 安全特性
- **身份验证**: 每个节点拥有唯一的 Peer ID
- **消息签名**: 支持消息数字签名验证（待完善）
- **本地存储**: 敏感数据仅存储在本地

## 技术架构

### 核心组件

1. **P2PManager** (`src/main/services/p2p/P2PManager.ts`)
   - P2P 服务的主要管理器
   - 负责初始化和协调各个子服务

2. **IdentityService** (`src/main/services/p2p/identity/IdentityService.ts`)
   - 管理节点身份和密钥对
   - 生成和存储 Peer ID

3. **NetworkService** (`src/main/services/p2p/network/NetworkService.ts`)
   - 网络连接和节点发现
   - UDP 广播和节点管理

4. **P2PMessageService** (`src/main/services/p2p/messaging/P2PMessageService.ts`)
   - 消息发送、接收和存储
   - 支持点对点和群组消息

5. **Discovery** (`src/main/services/p2p/network/Discovery.ts`)
   - UDP 广播实现
   - 节点发现和状态管理

### 数据库架构

P2P 功能使用以下数据库表：

- `p2p_identity`: 存储节点身份信息
- `p2p_peers`: 存储发现的节点信息
- `p2p_contacts`: 存储联系人信息
- `p2p_messages`: 存储 P2P 消息
- `p2p_groups`: 存储群组信息
- `p2p_group_members`: 存储群组成员关系

## 使用指南

### 1. 启动 P2P 服务

P2P 服务会在应用启动时自动初始化。你可以在主界面左侧菜单中看到 "P2P网络" 选项。

### 2. 查看网络状态

点击 "P2P网络" 进入 P2P 管理界面，可以查看：
- 当前节点的运行状态
- 节点 ID (Peer ID)
- 已发现的其他节点

### 3. 发现和连接节点

- 应用会自动通过 UDP 广播发现局域网内的其他节点
- 在 "发现的节点" 标签页中查看所有发现的节点
- 点击 "连接" 按钮连接到指定节点
- 点击 "添加联系人" 将节点添加到联系人列表

### 4. 发送消息

在 "消息测试" 标签页中：
1. 选择接收方节点
2. 输入消息内容
3. 点击 "发送消息"

### 5. 管理联系人

在 "P2P联系人" 标签页中：
- 查看所有已添加的联系人
- 查看联系人在线状态
- 添加新的联系人

### 6. 创建群组

在 "P2P群组" 标签页中：
- 点击 "创建群组" 创建新的 P2P 群组
- 输入群组名称和描述
- 邀请其他节点加入群组

## API 接口

### 前端 API

P2P 功能提供了完整的前端 API (`src/renderer/src/api/p2p.ts`)：

```typescript
// 获取 P2P 状态
getP2PStatus(): Promise<P2PStatus>

// 获取已发现的节点
getDiscoveredPeers(): Promise<P2PPeer[]>

// 发送消息
sendP2PMessage(data: MessageData): Promise<void>

// 联系人管理
addP2PContact(data: ContactData): Promise<void>
getP2PContacts(): Promise<P2PContact[]>

// 群组管理
createP2PGroup(data: GroupData): Promise<{groupId: string}>
joinP2PGroup(data: {groupId: string}): Promise<void>
leaveP2PGroup(data: {groupId: string}): Promise<void>
```

### IPC 接口

后端提供了以下 IPC 接口：

- `GET /api/v1/p2p/status` - 获取 P2P 状态
- `GET /api/v1/p2p/peers` - 获取已发现节点
- `POST /api/v1/p2p/message/send` - 发送消息
- `POST /api/v1/p2p/contact/add` - 添加联系人
- `GET /api/v1/p2p/contact/list` - 获取联系人列表
- `POST /api/v1/p2p/group/create` - 创建群组
- `POST /api/v1/p2p/peer/connect` - 连接节点

## 开发和调试

### 启动开发环境

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev
```

### 测试 P2P 功能

1. 启动多个应用实例
2. 在不同实例中查看节点发现情况
3. 测试消息发送和接收
4. 验证联系人和群组功能

### 调试技巧

- 查看控制台日志了解 P2P 服务状态
- 使用开发者工具检查网络请求
- 检查 SQLite 数据库中的数据存储

## 注意事项

1. **网络环境**: P2P 功能需要在同一局域网内使用
2. **防火墙**: 确保防火墙允许 UDP 广播和 TCP 连接
3. **端口占用**: 默认使用随机端口，避免端口冲突
4. **数据安全**: 消息传输目前为明文，后续会加入加密功能

## 未来规划

- [ ] 消息加密和数字签名
- [ ] 文件传输支持
- [ ] 语音和视频通话
- [ ] 跨网络的节点发现（DHT）
- [ ] 更完善的群组管理功能
- [ ] 消息同步和离线消息

## 技术依赖

- **libp2p**: 核心 P2P 网络库
- **@libp2p/tcp**: TCP 传输协议
- **@libp2p/websockets**: WebSocket 传输协议
- **@libp2p/noise**: 噪声协议加密
- **@libp2p/yamux**: 多路复用
- **@libp2p/gossipsub**: 发布订阅消息传递
- **SQLite**: 本地数据存储

## 贡献

欢迎提交 Issue 和 Pull Request 来改进 P2P 功能！