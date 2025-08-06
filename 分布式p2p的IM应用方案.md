非常好，这意味着你希望将 `whyTalk` 升级为一个**纯粹的去中心化 P2P IM 应用**，运行时架构如下：

> ⚙️ 单个 Electron 应用 = 前端 UI + 后端服务（Node.js 内嵌） + P2P 网络节点

---

## ✅ 改造目标简述

| 模块       | 当前                  | 改造后                             |
| ---------- | --------------------- | ---------------------------------- |
| 服务端语言 | Go 服务               | Node.js 嵌入 Electron 中           |
| 服务部署   | 集中式后端            | 本地 Node 服务（每个客户端即服务） |
| 用户认证   | 登录系统              | 公私钥身份，自认证                 |
| 消息传输   | 中心转发              | P2P 分发（如 libp2p）              |
| 用户发现   | 注册登录 + 服务器分发 | 局域网自动发现（UDP、mDNS）        |
| 数据存储   | 数据库后端            | SQLite 或 JSON 本地存储            |

---

## ✅ 分布式结构设计（全由 Electron 提供）

```
+---------------------+
|     Electron App    |  ← UI
|  ┌────────────────┐ |
|  |  Node.js 后端   |  ← P2P 节点服务
|  |  - 身份认证     |
|  |  - 消息传输     |
|  |  - 网络发现     |
|  └────────────────┘ |
+---------------------+
        ↑
        ↓
每个客户端同时是：
- 用户界面
- 网络服务节点（发送、接收、转发）
```

---

## ✅ 技术选型建议（Electron + Node）

| 功能             | 方案                                               |
| ---------------- | -------------------------------------------------- |
| **P2P 网络协议** | [libp2p (js)](https://github.com/libp2p/js-libp2p) |
| **身份认证**     | `ed25519` 公私钥生成 + 签名                        |
| **节点发现**     | mDNS（局域网）+ WebRTC + Gossip                    |
| **消息加密**     | Libp2p 的 Noise/AES 协议（端对端）                 |
| **本地数据存储** | SQLite（如 `better-sqlite3`）或 `lowdb`            |

---

## ✅ 核心模块改造路径

### 1. ✅ 用户身份系统

- 安装应用时，自动生成公私钥对
- 保存到本地（加密存储）
- 用 base58(公钥) 作为唯一 ID
- UI 展示为昵称 + ID（支持扫码添加好友）

---

### 2. ✅ 网络发现模块（内嵌 nodejs 实现）

- 使用 `libp2p` 的 `mDNS` 模块发现本地节点
- 或用 `dgram` 模块定期 UDP 广播身份

```js
// 例子：广播自己的身份信息
const dgram = require('dgram')
const socket = dgram.createSocket('udp4')
socket.bind(12345, () => {
  setInterval(() => {
    socket.send(Buffer.from(JSON.stringify({ id, nickname })), 0, 512, 12345, '255.255.255.255')
  }, 2000)
})
```

---

### 3. ✅ 消息通信模块（P2P）

使用 [js-libp2p](https://libp2p.io/)：

```ts
import { createLibp2p } from 'libp2p'
import { webSockets } from '@libp2p/websockets'
import { noise } from '@chainsafe/libp2p-noise'
import { mplex } from '@libp2p/mplex'
import { mdns } from '@libp2p/mdns'

const node = await createLibp2p({
  transports: [webSockets()],
  streamMuxers: [mplex()],
  connectionEncryption: [noise()],
  peerDiscovery: [mdns()]
})
```

- 每个用户启动时成为一个节点
- 自动发现邻居
- 可通过 `libp2p pubsub` 实现群聊

---

### 4. ✅ 本地存储与状态管理

推荐：

- 聊天记录存 SQLite
- 好友列表存 JSON 或数据库
- 每条消息结构如下：

```json
{
  "from": "peer_id",
  "to": "peer_id",
  "timestamp": 1725346,
  "content": "hello",
  "signature": "..."
}
```

---

### 5. ✅ Electron 集成方式

你的主进程中挂载 libp2p 节点，使用 `ipcMain` 和渲染进程通信：

```ts
// 主进程中监听消息
ipcMain.handle('send-message', async (event, data) => {
  // 通过 libp2p 发送
})
```

渲染进程通过：

```ts
await window.electron.ipcRenderer.invoke('send-message', { to, msg })
```

---

## ✅ 安全建议

- 使用 libp2p 内建加密层（Noise）
- 每条消息签名防伪
- 每次通信需附带 nonce 防重放攻击
- 私钥加密存储（可用 keytar 或加密文件）

---

## ✅ 下一步推荐流程

1. 替换掉原有 Go 服务（账号登录、用户信息由本地生成）
2. 引入 libp2p，构建节点间通信
3. 使用 UDP 或 mDNS 实现发现
4. 完成好友添加 → 身份验证 → 消息互发的最小流程
5. 本地数据库同步聊天记录和好友列表

---

## ✅ 示例参考项目

- [`js-libp2p-webrtc-pubsub-chat`](https://github.com/libp2p/js-libp2p-examples/tree/master/webrtc-in-browser)
- [`simple-p2p-chat-electron`](https://github.com/tavendo/simple-p2p-chat-electron)（早期 demo）

---

---

## 🚀 详细实施步骤

### 阶段一：依赖安装与基础架构搭建

#### 1.1 安装P2P相关依赖

```bash
# P2P网络核心库
npm install libp2p @libp2p/tcp @libp2p/websockets @libp2p/webrtc
npm install @libp2p/mplex @libp2p/yamux @libp2p/noise
npm install @libp2p/mdns @libp2p/bootstrap @libp2p/kad-dht
npm install @libp2p/pubsub-peer-discovery @libp2p/gossipsub

# 加密和身份认证
npm install @libp2p/peer-id-factory @libp2p/crypto
npm install ed25519-hd-key tweetnacl tweetnacl-util

# 网络发现
npm install @libp2p/mdns bonjour-service
npm install dgram

# 类型定义
npm install --save-dev @types/dgram
```

#### 1.2 创建P2P服务目录结构

```
src/main/services/p2p/
├── P2PManager.ts          # P2P网络管理器
├── identity/
│   ├── IdentityService.ts # 身份管理服务
│   └── KeyManager.ts      # 密钥管理
├── network/
│   ├── NetworkService.ts  # 网络服务
│   ├── Discovery.ts       # 节点发现
│   └── MessageRouter.ts   # 消息路由
├── messaging/
│   ├── P2PMessageService.ts # P2P消息服务
│   └── MessageHandler.ts    # 消息处理器
└── storage/
    ├── P2PStorage.ts      # P2P数据存储
    └── PeerStore.ts       # 节点信息存储
```

---

### 阶段二：身份系统改造

#### 2.1 创建身份管理服务

**文件：`src/main/services/p2p/identity/IdentityService.ts`**

```typescript
import { generateKeyPair } from '@libp2p/crypto/keys'
import { peerIdFromKeys } from '@libp2p/peer-id'
import { createEd25519PeerId } from '@libp2p/peer-id-factory'
import { config } from '../../../config'
import * as fs from 'fs'
import * as path from 'path'

export interface P2PIdentity {
  peerId: string
  publicKey: string
  privateKey: string
  nickname: string
  avatar?: string
  created_at: string
}

export class IdentityService {
  private identity: P2PIdentity | null = null
  private readonly identityPath: string

  constructor() {
    this.identityPath = path.join(config.userDataPath, 'p2p-identity.json')
  }

  // 初始化身份（首次启动时生成，后续加载）
  public async initialize(): Promise<P2PIdentity> {
    if (await this.identityExists()) {
      this.identity = await this.loadIdentity()
    } else {
      this.identity = await this.generateNewIdentity()
      await this.saveIdentity(this.identity)
    }
    return this.identity
  }

  // 生成新身份
  private async generateNewIdentity(): Promise<P2PIdentity> {
    const peerId = await createEd25519PeerId()

    return {
      peerId: peerId.toString(),
      publicKey: peerId.publicKey ? Buffer.from(peerId.publicKey).toString('base64') : '',
      privateKey: peerId.privateKey ? Buffer.from(peerId.privateKey).toString('base64') : '',
      nickname: `用户_${peerId.toString().slice(-8)}`,
      created_at: new Date().toISOString()
    }
  }

  // 保存身份到本地
  private async saveIdentity(identity: P2PIdentity): Promise<void> {
    const encryptedData = this.encryptIdentity(identity)
    fs.writeFileSync(this.identityPath, JSON.stringify(encryptedData, null, 2))
  }

  // 从本地加载身份
  private async loadIdentity(): Promise<P2PIdentity> {
    const data = JSON.parse(fs.readFileSync(this.identityPath, 'utf8'))
    return this.decryptIdentity(data)
  }

  // 检查身份文件是否存在
  private async identityExists(): Promise<boolean> {
    return fs.existsSync(this.identityPath)
  }

  // 加密身份信息（简单实现，生产环境需要更强的加密）
  private encryptIdentity(identity: P2PIdentity): any {
    // TODO: 实现真正的加密
    return identity
  }

  // 解密身份信息
  private decryptIdentity(data: any): P2PIdentity {
    // TODO: 实现真正的解密
    return data
  }

  // 获取当前身份
  public getIdentity(): P2PIdentity | null {
    return this.identity
  }

  // 更新昵称
  public async updateNickname(nickname: string): Promise<void> {
    if (this.identity) {
      this.identity.nickname = nickname
      await this.saveIdentity(this.identity)
    }
  }
}
```

#### 2.2 修改现有认证服务

**修改：`src/main/services/auth/AuthService.ts`**

```typescript
// 在现有AuthService中添加P2P身份支持
import { IdentityService } from '../p2p/identity/IdentityService'

export class AuthService {
  private identityService: IdentityService

  constructor() {
    this.identityService = new IdentityService()
  }

  // 初始化P2P身份
  public async initializeP2PIdentity(): Promise<void> {
    await this.identityService.initialize()
  }

  // 获取P2P身份信息
  public getP2PIdentity() {
    return this.identityService.getIdentity()
  }

  // P2P模式下的"登录"（实际是激活本地身份）
  public async p2pLogin(): Promise<LoginResponse> {
    const identity = this.identityService.getIdentity()
    if (!identity) {
      throw new Error('P2P身份未初始化')
    }

    // 生成本地会话令牌
    const accessToken = this.generateP2PToken(identity.peerId)

    const userInfo: User = {
      id: 1, // P2P模式下使用固定ID
      mobile: identity.peerId,
      nickname: identity.nickname,
      avatar: identity.avatar || '',
      motto: '',
      email: '',
      gender: 0,
      birthday: '',
      status: 1,
      created_at: identity.created_at,
      updated_at: new Date().toISOString()
    }

    return {
      access_token: accessToken,
      expires_in: 365 * 24 * 60 * 60, // 1年
      type: 'P2P',
      user: userInfo
    }
  }

  private generateP2PToken(peerId: string): string {
    const payload = {
      peerId,
      mode: 'p2p',
      iat: Math.floor(Date.now() / 1000)
    }
    return sign(payload, this.JWT_SECRET, { expiresIn: '365d' })
  }
}
```

---

### 阶段三：P2P网络服务搭建

#### 3.1 创建P2P网络管理器

**文件：`src/main/services/p2p/P2PManager.ts`**

```typescript
import { createLibp2p, Libp2p } from 'libp2p'
import { tcp } from '@libp2p/tcp'
import { webSockets } from '@libp2p/websockets'
import { noise } from '@chainsafe/libp2p-noise'
import { mplex } from '@libp2p/mplex'
import { mdns } from '@libp2p/mdns'
import { gossipsub } from '@libp2p/gossipsub'
import { kadDHT } from '@libp2p/kad-dht'
import { EventEmitter } from 'events'
import { IdentityService } from './identity/IdentityService'
import { NetworkService } from './network/NetworkService'
import { P2PMessageService } from './messaging/P2PMessageService'

export class P2PManager extends EventEmitter {
  private node: Libp2p | null = null
  private identityService: IdentityService
  private networkService: NetworkService
  private messageService: P2PMessageService
  private isStarted = false

  constructor() {
    super()
    this.identityService = new IdentityService()
    this.networkService = new NetworkService()
    this.messageService = new P2PMessageService()
  }

  // 启动P2P网络
  public async start(): Promise<void> {
    if (this.isStarted) return

    try {
      // 初始化身份
      const identity = await this.identityService.initialize()
      console.log('P2P Identity initialized:', identity.peerId)

      // 创建libp2p节点
      this.node = await createLibp2p({
        addresses: {
          listen: ['/ip4/0.0.0.0/tcp/0', '/ip4/0.0.0.0/tcp/0/ws']
        },
        transports: [tcp(), webSockets()],
        streamMuxers: [mplex()],
        connectionEncryption: [noise()],
        peerDiscovery: [
          mdns({
            interval: 1000,
            serviceTag: 'whytalk-p2p'
          })
        ],
        pubsub: gossipsub({
          allowPublishToZeroPeers: true,
          msgIdFn: (msg) => {
            return new TextEncoder().encode(msg.topic + msg.data.toString())
          }
        }),
        dht: kadDHT({
          clientMode: false
        })
      })

      // 启动节点
      await this.node.start()
      console.log('P2P node started with PeerID:', this.node.peerId.toString())

      // 初始化服务
      await this.networkService.initialize(this.node)
      await this.messageService.initialize(this.node, this.identityService)

      // 绑定事件
      this.bindEvents()

      this.isStarted = true
      this.emit('started')
    } catch (error) {
      console.error('Failed to start P2P manager:', error)
      throw error
    }
  }

  // 停止P2P网络
  public async stop(): Promise<void> {
    if (!this.isStarted || !this.node) return

    try {
      await this.node.stop()
      this.isStarted = false
      this.emit('stopped')
      console.log('P2P node stopped')
    } catch (error) {
      console.error('Failed to stop P2P manager:', error)
      throw error
    }
  }

  // 绑定事件
  private bindEvents(): void {
    if (!this.node) return

    // 节点连接事件
    this.node.addEventListener('peer:connect', (evt) => {
      console.log('Peer connected:', evt.detail.toString())
      this.emit('peer:connect', evt.detail)
    })

    // 节点断开事件
    this.node.addEventListener('peer:disconnect', (evt) => {
      console.log('Peer disconnected:', evt.detail.toString())
      this.emit('peer:disconnect', evt.detail)
    })

    // 发现新节点
    this.node.addEventListener('peer:discovery', (evt) => {
      console.log('Peer discovered:', evt.detail.id.toString())
      this.emit('peer:discovery', evt.detail)
    })
  }

  // 获取连接的节点列表
  public getConnectedPeers(): string[] {
    if (!this.node) return []
    return this.node.getPeers().map((peer) => peer.toString())
  }

  // 获取节点信息
  public getNodeInfo() {
    if (!this.node) return null

    return {
      peerId: this.node.peerId.toString(),
      addresses: this.node.getMultiaddrs().map((addr) => addr.toString()),
      connections: this.getConnectedPeers().length
    }
  }

  // 获取服务实例
  public getIdentityService(): IdentityService {
    return this.identityService
  }

  public getNetworkService(): NetworkService {
    return this.networkService
  }

  public getMessageService(): P2PMessageService {
    return this.messageService
  }

  public getNode(): Libp2p | null {
    return this.node
  }
}
```

#### 3.2 创建网络发现服务

**文件：`src/main/services/p2p/network/Discovery.ts`**

```typescript
import { EventEmitter } from 'events'
import * as dgram from 'dgram'
import { Libp2p } from 'libp2p'

export interface DiscoveredPeer {
  peerId: string
  nickname: string
  address: string
  port: number
  lastSeen: number
}

export class Discovery extends EventEmitter {
  private udpSocket: dgram.Socket | null = null
  private broadcastInterval: NodeJS.Timeout | null = null
  private discoveredPeers: Map<string, DiscoveredPeer> = new Map()
  private readonly BROADCAST_PORT = 41234
  private readonly BROADCAST_INTERVAL = 5000 // 5秒

  constructor(private node: Libp2p) {
    super()
  }

  // 启动UDP广播发现
  public async startUDPDiscovery(): Promise<void> {
    this.udpSocket = dgram.createSocket('udp4')

    // 监听广播消息
    this.udpSocket.on('message', (msg, rinfo) => {
      this.handleBroadcastMessage(msg, rinfo)
    })

    // 绑定端口
    this.udpSocket.bind(this.BROADCAST_PORT, () => {
      this.udpSocket?.setBroadcast(true)
      console.log(`UDP discovery listening on port ${this.BROADCAST_PORT}`)
    })

    // 开始定期广播
    this.startBroadcasting()
  }

  // 停止UDP发现
  public stopUDPDiscovery(): void {
    if (this.broadcastInterval) {
      clearInterval(this.broadcastInterval)
      this.broadcastInterval = null
    }

    if (this.udpSocket) {
      this.udpSocket.close()
      this.udpSocket = null
    }
  }

  // 开始广播
  private startBroadcasting(): void {
    this.broadcastInterval = setInterval(() => {
      this.broadcastPresence()
    }, this.BROADCAST_INTERVAL)

    // 立即广播一次
    this.broadcastPresence()
  }

  // 广播自己的存在
  private broadcastPresence(): void {
    if (!this.udpSocket || !this.node) return

    const message = {
      type: 'presence',
      peerId: this.node.peerId.toString(),
      nickname: 'WhyTalk用户', // 从身份服务获取
      timestamp: Date.now(),
      addresses: this.node.getMultiaddrs().map((addr) => addr.toString())
    }

    const buffer = Buffer.from(JSON.stringify(message))

    this.udpSocket.send(buffer, 0, buffer.length, this.BROADCAST_PORT, '255.255.255.255', (err) => {
      if (err) {
        console.error('Failed to broadcast presence:', err)
      }
    })
  }

  // 处理接收到的广播消息
  private handleBroadcastMessage(msg: Buffer, rinfo: dgram.RemoteInfo): void {
    try {
      const message = JSON.parse(msg.toString())

      if (message.type === 'presence' && message.peerId !== this.node?.peerId.toString()) {
        const peer: DiscoveredPeer = {
          peerId: message.peerId,
          nickname: message.nickname,
          address: rinfo.address,
          port: rinfo.port,
          lastSeen: Date.now()
        }

        this.discoveredPeers.set(message.peerId, peer)
        this.emit('peer:discovered', peer)

        console.log('Discovered peer via UDP:', peer)
      }
    } catch (error) {
      console.error('Failed to parse broadcast message:', error)
    }
  }

  // 获取发现的节点列表
  public getDiscoveredPeers(): DiscoveredPeer[] {
    const now = Date.now()
    const timeout = 30000 // 30秒超时

    // 清理过期的节点
    for (const [peerId, peer] of this.discoveredPeers) {
      if (now - peer.lastSeen > timeout) {
        this.discoveredPeers.delete(peerId)
      }
    }

    return Array.from(this.discoveredPeers.values())
  }

  // 清理发现的节点
  public clearDiscoveredPeers(): void {
    this.discoveredPeers.clear()
  }
}
```

---

### 阶段四：消息系统改造

#### 4.1 创建P2P消息服务

**文件：`src/main/services/p2p/messaging/P2PMessageService.ts`**

```typescript
import { Libp2p } from 'libp2p'
import { EventEmitter } from 'events'
import { IdentityService } from '../identity/IdentityService'
import { databaseManager } from '../../database/Database'

export interface P2PMessage {
  id: string
  from: string
  to: string
  type: 'text' | 'image' | 'file' | 'audio' | 'video'
  content: string
  timestamp: number
  signature?: string
  groupId?: string
}

export class P2PMessageService extends EventEmitter {
  private node: Libp2p | null = null
  private identityService: IdentityService | null = null
  private readonly PROTOCOL = '/whytalk/message/1.0.0'
  private readonly GROUP_TOPIC_PREFIX = 'whytalk-group-'

  public async initialize(node: Libp2p, identityService: IdentityService): Promise<void> {
    this.node = node
    this.identityService = identityService

    // 注册消息处理协议
    await this.node.handle(this.PROTOCOL, this.handleIncomingMessage.bind(this))

    // 订阅群组消息
    this.subscribeToGroupMessages()

    console.log('P2P Message Service initialized')
  }

  // 发送点对点消息
  public async sendDirectMessage(
    targetPeerId: string,
    message: Omit<P2PMessage, 'from' | 'timestamp' | 'signature'>
  ): Promise<void> {
    if (!this.node || !this.identityService) {
      throw new Error('P2P Message Service not initialized')
    }

    const identity = this.identityService.getIdentity()
    if (!identity) {
      throw new Error('No identity available')
    }

    const fullMessage: P2PMessage = {
      ...message,
      from: identity.peerId,
      timestamp: Date.now(),
      signature: await this.signMessage(message)
    }

    try {
      // 获取目标节点的连接
      const stream = await this.node.dialProtocol(targetPeerId, this.PROTOCOL)

      // 发送消息
      const messageData = new TextEncoder().encode(JSON.stringify(fullMessage))
      await stream.sink([messageData])
      await stream.close()

      // 保存到本地数据库
      await this.saveMessage(fullMessage)

      this.emit('message:sent', fullMessage)
      console.log('Direct message sent to:', targetPeerId)
    } catch (error) {
      console.error('Failed to send direct message:', error)
      throw error
    }
  }

  // 发送群组消息
  public async sendGroupMessage(
    groupId: string,
    message: Omit<P2PMessage, 'from' | 'timestamp' | 'signature' | 'groupId'>
  ): Promise<void> {
    if (!this.node || !this.identityService) {
      throw new Error('P2P Message Service not initialized')
    }

    const identity = this.identityService.getIdentity()
    if (!identity) {
      throw new Error('No identity available')
    }

    const fullMessage: P2PMessage = {
      ...message,
      from: identity.peerId,
      timestamp: Date.now(),
      groupId,
      signature: await this.signMessage(message)
    }

    try {
      const topic = this.GROUP_TOPIC_PREFIX + groupId
      const messageData = new TextEncoder().encode(JSON.stringify(fullMessage))

      // 通过pubsub发布群组消息
      await this.node.services.pubsub.publish(topic, messageData)

      // 保存到本地数据库
      await this.saveMessage(fullMessage)

      this.emit('message:sent', fullMessage)
      console.log('Group message sent to:', groupId)
    } catch (error) {
      console.error('Failed to send group message:', error)
      throw error
    }
  }

  // 处理接收到的消息
  private async handleIncomingMessage({ stream }): Promise<void> {
    try {
      const chunks: Uint8Array[] = []

      for await (const chunk of stream.source) {
        chunks.push(chunk.subarray())
      }

      const messageData = new Uint8Array(chunks.reduce((acc, chunk) => acc + chunk.length, 0))
      let offset = 0
      for (const chunk of chunks) {
        messageData.set(chunk, offset)
        offset += chunk.length
      }

      const messageStr = new TextDecoder().decode(messageData)
      const message: P2PMessage = JSON.parse(messageStr)

      // 验证消息签名
      if (await this.verifyMessage(message)) {
        // 保存到本地数据库
        await this.saveMessage(message)

        this.emit('message:received', message)
        console.log('Direct message received from:', message.from)
      } else {
        console.warn('Invalid message signature from:', message.from)
      }
    } catch (error) {
      console.error('Failed to handle incoming message:', error)
    }
  }

  // 订阅群组消息
  private subscribeToGroupMessages(): void {
    if (!this.node) return

    this.node.services.pubsub.addEventListener('message', (evt) => {
      const topic = evt.detail.topic
      if (topic.startsWith(this.GROUP_TOPIC_PREFIX)) {
        this.handleGroupMessage(evt.detail.data)
      }
    })
  }

  // 处理群组消息
  private async handleGroupMessage(data: Uint8Array): Promise<void> {
    try {
      const messageStr = new TextDecoder().decode(data)
      const message: P2PMessage = JSON.parse(messageStr)

      // 验证消息签名
      if (await this.verifyMessage(message)) {
        // 保存到本地数据库
        await this.saveMessage(message)

        this.emit('message:received', message)
        console.log('Group message received from:', message.from)
      } else {
        console.warn('Invalid group message signature from:', message.from)
      }
    } catch (error) {
      console.error('Failed to handle group message:', error)
    }
  }

  // 加入群组
  public async joinGroup(groupId: string): Promise<void> {
    if (!this.node) return

    const topic = this.GROUP_TOPIC_PREFIX + groupId
    this.node.services.pubsub.subscribe(topic)
    console.log('Joined group:', groupId)
  }

  // 离开群组
  public async leaveGroup(groupId: string): Promise<void> {
    if (!this.node) return

    const topic = this.GROUP_TOPIC_PREFIX + groupId
    this.node.services.pubsub.unsubscribe(topic)
    console.log('Left group:', groupId)
  }

  // 签名消息
  private async signMessage(message: any): Promise<string> {
    // TODO: 实现消息签名
    return 'signature_placeholder'
  }

  // 验证消息签名
  private async verifyMessage(message: P2PMessage): Promise<boolean> {
    // TODO: 实现签名验证
    return true
  }

  // 保存消息到数据库
  private async saveMessage(message: P2PMessage): Promise<void> {
    const db = databaseManager.getDatabase()

    try {
      const stmt = db.prepare(`
        INSERT OR REPLACE INTO p2p_messages 
        (id, from_peer, to_peer, type, content, timestamp, signature, group_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `)

      stmt.run(
        message.id,
        message.from,
        message.to,
        message.type,
        message.content,
        message.timestamp,
        message.signature,
        message.groupId
      )
    } catch (error) {
      console.error('Failed to save message:', error)
    }
  }
}
```

---

### 阶段五：数据库架构扩展

#### 5.1 扩展数据库架构

**修改：`src/main/database/schema.sql`**

```sql
-- 添加P2P相关表

-- P2P消息表
CREATE TABLE IF NOT EXISTS p2p_messages (
    id TEXT PRIMARY KEY,
    from_peer TEXT NOT NULL,
    to_peer TEXT,
    type TEXT NOT NULL DEFAULT 'text',
    content TEXT NOT NULL,
    timestamp INTEGER NOT NULL,
    signature TEXT,
    group_id TEXT,
    is_read INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- P2P节点信息表
CREATE TABLE IF NOT EXISTS p2p_peers (
    peer_id TEXT PRIMARY KEY,
    nickname TEXT NOT NULL,
    avatar TEXT,
    public_key TEXT,
    last_seen INTEGER,
    status TEXT DEFAULT 'offline',
    addresses TEXT, -- JSON格式存储地址列表
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- P2P群组表
CREATE TABLE IF NOT EXISTS p2p_groups (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    avatar TEXT,
    creator_peer_id TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- P2P群组成员表
CREATE TABLE IF NOT EXISTS p2p_group_members (
    group_id TEXT NOT NULL,
    peer_id TEXT NOT NULL,
    role TEXT DEFAULT 'member', -- admin, member
    joined_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (group_id, peer_id)
);

-- P2P好友关系表
CREATE TABLE IF NOT EXISTS p2p_contacts (
    peer_id TEXT NOT NULL,
    friend_peer_id TEXT NOT NULL,
    nickname TEXT,
    status TEXT DEFAULT 'active', -- active, blocked
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (peer_id, friend_peer_id)
);

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_p2p_messages_from_peer ON p2p_messages(from_peer);
CREATE INDEX IF NOT EXISTS idx_p2p_messages_to_peer ON p2p_messages(to_peer);
CREATE INDEX IF NOT EXISTS idx_p2p_messages_group_id ON p2p_messages(group_id);
CREATE INDEX IF NOT EXISTS idx_p2p_messages_timestamp ON p2p_messages(timestamp);
CREATE INDEX IF NOT EXISTS idx_p2p_peers_last_seen ON p2p_peers(last_seen);
```

---

### 阶段六：服务集成与IPC接口

#### 6.1 集成P2P服务到主服务管理器

**修改：`src/main/services/index.ts`**

```typescript
import { P2PManager } from './p2p/P2PManager'

export class ServiceManager {
  private p2pManager: P2PManager

  constructor() {
    this.p2pManager = new P2PManager()
  }

  public async initialize(): Promise<void> {
    if (this.isInitialized) {
      return
    }

    try {
      console.log('Initializing services...')

      // 确保必要的目录存在
      ensureDirectories()
      console.log('Directories ensured')

      // 初始化数据库
      await databaseManager.initialize()
      console.log('Database initialized')

      // 初始化P2P网络
      await this.p2pManager.start()
      console.log('P2P network started')

      // 启动定时任务
      this.startScheduledTasks()
      console.log('Scheduled tasks started')

      this.isInitialized = true
      console.log('All services initialized successfully')
    } catch (error) {
      console.error('Failed to initialize services:', error)
      throw error
    }
  }

  public async shutdown(): Promise<void> {
    if (!this.isInitialized) {
      return
    }

    try {
      console.log('Shutting down services...')

      // 停止P2P网络
      await this.p2pManager.stop()

      // 停止定时任务
      this.stopScheduledTasks()

      // 关闭数据库连接
      await databaseManager.close()

      this.isInitialized = false
      console.log('All services shut down successfully')
    } catch (error) {
      console.error('Failed to shutdown services:', error)
      throw error
    }
  }

  public getP2PManager(): P2PManager {
    return this.p2pManager
  }
}
```

#### 6.2 添加P2P相关的IPC接口

**修改：`src/main/services/ipc/IPCHandler.ts`**

```typescript
// 添加P2P相关的API路由
export class IPCHandler {
  private setupRoutes(): void {
    // ... 现有路由 ...

    // P2P网络状态
    this.addRoute('GET', '/api/v1/p2p/status', async () => {
      const p2pManager = serviceManager.getP2PManager()
      return {
        code: 200,
        message: 'success',
        data: p2pManager.getNodeInfo()
      }
    })

    // 获取发现的节点
    this.addRoute('GET', '/api/v1/p2p/peers', async () => {
      const p2pManager = serviceManager.getP2PManager()
      const networkService = p2pManager.getNetworkService()
      return {
        code: 200,
        message: 'success',
        data: networkService.getDiscoveredPeers()
      }
    })

    // 发送P2P消息
    this.addRoute('POST', '/api/v1/p2p/message/send', async (data) => {
      const { targetPeerId, type, content } = data
      const p2pManager = serviceManager.getP2PManager()
      const messageService = p2pManager.getMessageService()

      await messageService.sendDirectMessage(targetPeerId, {
        id: generateMessageId(),
        to: targetPeerId,
        type,
        content
      })

      return {
        code: 200,
        message: '消息发送成功'
      }
    })

    // 创建P2P群组
    this.addRoute('POST', '/api/v1/p2p/group/create', async (data) => {
      const { name, description } = data
      // TODO: 实现群组创建逻辑
      return {
        code: 200,
        message: '群组创建成功'
      }
    })

    // 加入P2P群组
    this.addRoute('POST', '/api/v1/p2p/group/join', async (data) => {
      const { groupId } = data
      const p2pManager = serviceManager.getP2PManager()
      const messageService = p2pManager.getMessageService()

      await messageService.joinGroup(groupId)

      return {
        code: 200,
        message: '加入群组成功'
      }
    })

    // 添加P2P好友
    this.addRoute('POST', '/api/v1/p2p/contact/add', async (data) => {
      const { peerId, nickname } = data
      // TODO: 实现好友添加逻辑
      return {
        code: 200,
        message: '好友添加成功'
      }
    })
  }
}

function generateMessageId(): string {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9)
}
```

---

### 阶段七：前端界面适配

#### 7.1 添加P2P模式切换

**修改前端登录逻辑，添加P2P模式选项**

```typescript
// 在登录组件中添加模式选择
const loginModes = [
  { value: 'traditional', label: '传统模式' },
  { value: 'p2p', label: 'P2P模式' }
]

// P2P模式登录
const p2pLogin = async () => {
  try {
    const response = await ipcApi('/api/v1/auth/p2p-login')
    if (response.code === 200) {
      // 保存P2P身份信息
      auth.setToken(response.data.access_token)
      // 跳转到主界面
      router.push('/chat')
    }
  } catch (error) {
    console.error('P2P登录失败:', error)
  }
}
```

#### 7.2 添加节点发现界面

**创建节点发现组件**

```vue
<template>
  <div class="p2p-discovery">
    <h3>发现的节点</h3>
    <div class="peer-list">
      <div v-for="peer in discoveredPeers" :key="peer.peerId" class="peer-item">
        <div class="peer-info">
          <div class="peer-name">{{ peer.nickname }}</div>
          <div class="peer-id">{{ peer.peerId.slice(-8) }}</div>
        </div>
        <button @click="addFriend(peer)">添加好友</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ipcApi } from '@/api/ipc-request'

const discoveredPeers = ref([])

const loadDiscoveredPeers = async () => {
  try {
    const response = await ipcApi('/api/v1/p2p/peers')
    if (response.code === 200) {
      discoveredPeers.value = response.data
    }
  } catch (error) {
    console.error('获取节点列表失败:', error)
  }
}

const addFriend = async (peer) => {
  try {
    await ipcApi('/api/v1/p2p/contact/add', {
      peerId: peer.peerId,
      nickname: peer.nickname
    })
    window['$message']?.success('好友添加成功')
  } catch (error) {
    console.error('添加好友失败:', error)
  }
}

onMounted(() => {
  loadDiscoveredPeers()
  // 定期刷新节点列表
  setInterval(loadDiscoveredPeers, 5000)
})
</script>
```

---

### 阶段八：测试与优化

#### 8.1 创建测试脚本

**文件：`test-p2p.js`**

```javascript
const { app, BrowserWindow } = require('electron')
const { serviceManager } = require('./out/main/services')

async function testP2P() {
  await app.whenReady()

  try {
    // 初始化服务
    await serviceManager.initialize()
    console.log('Services initialized')

    // 获取P2P管理器
    const p2pManager = serviceManager.getP2PManager()

    // 监听节点连接事件
    p2pManager.on('peer:connect', (peerId) => {
      console.log('New peer connected:', peerId.toString())
    })

    // 监听消息接收事件
    const messageService = p2pManager.getMessageService()
    messageService.on('message:received', (message) => {
      console.log('Message received:', message)
    })

    console.log('P2P test setup complete')
    console.log('Node info:', p2pManager.getNodeInfo())
  } catch (error) {
    console.error('P2P test failed:', error)
  }
}

testP2P()
```

#### 8.2 性能优化建议

1. **消息缓存**: 实现消息本地缓存机制
2. **连接池管理**: 优化P2P连接的建立和维护
3. **数据同步**: 实现离线消息同步机制
4. **安全加固**: 加强消息加密和身份验证

---

## 🎯 实施时间线

| 阶段   | 预计时间 | 主要任务               |
| ------ | -------- | ---------------------- |
| 阶段一 | 1-2天    | 依赖安装、目录结构搭建 |
| 阶段二 | 2-3天    | 身份系统改造           |
| 阶段三 | 3-4天    | P2P网络服务搭建        |
| 阶段四 | 4-5天    | 消息系统改造           |
| 阶段五 | 1-2天    | 数据库架构扩展         |
| 阶段六 | 2-3天    | 服务集成与IPC接口      |
| 阶段七 | 3-4天    | 前端界面适配           |
| 阶段八 | 2-3天    | 测试与优化             |

**总计**: 约 18-26 天

---

## 🔧 关键技术难点

1. **NAT穿透**: 需要实现STUN/TURN服务器支持
2. **消息可靠性**: 确保P2P消息的可靠传输
3. **群组同步**: 实现分布式群组状态同步
4. **离线处理**: 处理节点离线时的消息存储和转发
5. **安全性**: 实现端到端加密和身份验证

---

如你希望，我可以：

- 帮你生成一个 `Electron + libp2p` 的 P2P 通信 Demo 项目
- 或输出第一步的代码模板（身份模块 + 网络发现）

是否要我先帮你出一个 PoC 模板项目？你希望使用 TypeScript 还是纯 JS？
