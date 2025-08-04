# WhyTalk 基座平台 API 文档

## 概述

WhyTalk 是一个基于 Electron 的分布式 P2P 即时通讯应用，提供了强大的插件系统。本文档详细介绍了基座平台为插件提供的所有功能和 API 接口。

## 目录

- [核心架构](#核心架构)
- [插件系统](#插件系统)
- [数据存储 API](#数据存储-api)
- [P2P 通信 API](#p2p-通信-api)
- [IPC 通信 API](#ipc-通信-api)
- [权限管理](#权限管理)
- [文件系统 API](#文件系统-api)
- [网络 API](#网络-api)
- [系统 API](#系统-api)
- [通知 API](#通知-api)
- [剪贴板 API](#剪贴板-api)
- [窗口管理 API](#窗口管理-api)

## 核心架构

### 服务管理器 (ServiceManager)

基座提供统一的服务管理器，管理所有核心服务：

```typescript
interface ServiceManager {
  // 核心服务
  getDatabaseManager(): DatabaseManager
  getAuthService(): AuthService
  getChatService(): ChatService
  getUserService(): UserService
  getContactService(): ContactService
  getGroupService(): GroupService
  getUploadService(): UploadService
  getIPCHandler(): IPCHandler
  getP2PServiceClient(): P2PServiceClient | null
}
```

### 数据库管理

基座使用 SQLite 数据库，为插件提供数据存储能力：

- **主数据库**：存储用户、联系人、消息、群组等核心数据
- **插件数据库**：专门为插件提供的数据存储空间
- **共享数据**：插件间可共享的数据存储

## 插件系统

### 插件类型

基座支持两种类型的插件：

1. **前端插件 (Frontend Plugin)**
   - 基于 HTML/CSS/JavaScript
   - 运行在独立的渲染进程中
   - 提供用户界面和交互功能

2. **系统插件 (System Plugin)**
   - 基于 WebAssembly (WASM)
   - 运行在主进程中
   - 提供后台服务和数据处理功能

### 插件管理器 (PluginManager)

```typescript
interface PluginManager {
  // 插件生命周期管理
  loadAllPlugins(): Promise<void>
  loadPlugin(pluginPath: string): Promise<void>
  unloadPlugin(pluginId: string): Promise<void>
  
  // 插件控制
  enablePlugin(pluginId: string): Promise<boolean>
  disablePlugin(pluginId: string): Promise<boolean>
  
  // 插件查询
  getPlugin(pluginId: string): PluginInstance | undefined
  getAllPlugins(): PluginInstance[]
  listPlugins(): Promise<PluginInfo[]>
  
  // 系统插件执行
  executeSystemPlugin(pluginId: string, functionName: string, input?: any): Promise<WasmExecutionResult>
  
  // 插件安装管理
  installLocalPlugin(zipPath: string): Promise<InstallResult>
  installRemotePlugin(url: string): Promise<InstallResult>
  uninstallPlugin(pluginId: string): Promise<boolean>
}
```

## 数据存储 API

### 插件私有数据

每个插件都有独立的数据存储空间：

```typescript
interface PluginDataAPI {
  // 基础数据操作
  setData(key: string, value: any): Promise<APIResponse>
  getData<T>(key: string): Promise<APIResponse<T>>
  deleteData(key: string): Promise<APIResponse>
  listData(): Promise<APIResponse<PluginDataItem[]>>
  
  // 配置管理
  saveConfig(config: any): Promise<APIResponse>
  getConfig<T>(): Promise<APIResponse<T>>
  
  // 用户偏好设置
  saveUserPreferences(userId: number, preferences: any): Promise<APIResponse>
  getUserPreferences<T>(userId: number): Promise<APIResponse<T>>
}
```

### 共享数据

插件间可以通过共享数据空间进行数据交换：

```typescript
interface SharedDataAPI {
  // 共享数据操作
  setSharedData(namespace: string, key: string, value: any, ttl?: number): Promise<APIResponse>
  getSharedData<T>(namespace: string, key: string): Promise<APIResponse<T>>
  deleteSharedData(namespace: string, key: string): Promise<APIResponse>
  listSharedData(namespace: string): Promise<APIResponse<SharedDataItem[]>>
  
  // 便捷方法
  cacheContacts(contacts: any[]): Promise<APIResponse>
  getCachedContacts<T>(): Promise<APIResponse<T[]>>
  cacheMessages(messages: any[]): Promise<APIResponse>
  getCachedMessages<T>(): Promise<APIResponse<T[]>>
}
```

### 联系人数据 API

```typescript
interface ContactAPI {
  // 联系人管理
  getContacts(): Promise<APIResponse<ContactData[]>>
  getContact(contactId: number): Promise<APIResponse<ContactData>>
  addContact(contactData: ContactData): Promise<APIResponse<number>>
  updateContact(contactId: number, updates: Partial<ContactData>): Promise<APIResponse>
  deleteContact(contactId: number): Promise<APIResponse>
  
  // 联系人操作
  pinContact(contactId: number, isPinned: boolean): Promise<APIResponse>
  searchContacts(keyword: string): Promise<APIResponse<ContactData[]>>
}
```

### 消息数据 API

```typescript
interface MessageAPI {
  // 消息管理
  getMessage(messageId: number): Promise<APIResponse<MessageData>>
  getMessages(conversationId: number, page?: number, limit?: number): Promise<APIResponse<{messages: MessageData[], total: number}>>
  sendMessage(messageData: MessageData): Promise<APIResponse<number>>
  markMessageAsRead(messageId: number): Promise<APIResponse>
  deleteMessage(messageId: number): Promise<APIResponse>
}
```

### 会话数据 API

```typescript
interface ConversationAPI {
  // 会话管理
  getConversation(conversationId: number): Promise<APIResponse<ConversationData>>
  getConversations(userId?: number, options?: any): Promise<APIResponse<ConversationData[]>>
  createConversation(conversationData: ConversationData): Promise<APIResponse<number>>
  updateConversation(conversationId: number, updates: Partial<ConversationData>): Promise<APIResponse>
  deleteConversation(conversationId: number): Promise<APIResponse>
}
```

## P2P 通信 API

基座提供完整的 P2P 通信能力：

### 服务控制

```typescript
interface P2PServiceAPI {
  // 服务生命周期
  start(): Promise<{success: boolean, message?: string, nodeId?: string}>
  stop(): Promise<{success: boolean, message?: string}>
  getStatus(): Promise<{success: boolean, isRunning?: boolean, nodeId?: string, message?: string}>
  
  // 节点信息
  getPeerId(): string | null
  getIdentity(): any
  getDiscoveredPeers(): Promise<any[]>
  getConnectedPeers(): Promise<string[]>
}
```

### 消息通信

```typescript
interface P2PMessageAPI {
  // 直接消息
  sendDirectMessage(params: {
    to: string,
    content: string,
    messageType?: number
  }): Promise<any>
  
  // 群组消息
  sendGroupMessage(params: {
    groupId: string,
    content: string,
    messageType?: number
  }): Promise<any>
  
  // 消息历史
  getChatHistory(params: {
    peerId: string,
    limit?: number,
    offset?: number
  }): Promise<any>
  
  getGroupChatHistory(params: {
    groupId: string,
    limit?: number,
    offset?: number
  }): Promise<any>
  
  // 消息状态
  markMessagesAsRead(params: {messageIds: number[]}): Promise<any>
  deleteMessage(params: {messageId: number}): Promise<any>
  recallMessage(params: {messageId: number}): Promise<any>
}
```

### 联系人管理

```typescript
interface P2PContactAPI {
  // 联系人操作
  addContact(params: {peerId: string, remark?: string}): Promise<any>
  getContacts(): Promise<{success: boolean, contacts?: any[], message?: string}>
  deleteContact(params: {contactId: number}): Promise<any>
  updateContact(params: {contactId: number, updates: any}): Promise<any>
  searchContacts(params: {keyword: string}): Promise<any>
  
  // 联系人请求
  getContactRequests(): Promise<any>
  handleContactRequest(params: {requestId: number, action: 'accept' | 'reject'}): Promise<any>
}
```

### 群组管理

```typescript
interface P2PGroupAPI {
  // 群组操作
  createGroup(params: {name: string, description?: string}): Promise<any>
  getGroups(): Promise<{success: boolean, groups?: any[], message?: string}>
  joinGroup(params: {groupId: string}): Promise<any>
  leaveGroup(params: {groupId: string}): Promise<any>
  
  // 群组成员
  getGroupMembers(params: {groupId: string}): Promise<any>
  inviteToGroup(params: {groupId: string, peerIds: string[]}): Promise<any>
}
```

## IPC 通信 API

基座提供统一的 IPC 通信接口：

```typescript
interface IPCHandler {
  // 基础 IPC
  invoke(channel: string, ...args: any[]): Promise<any>
  send(channel: string, ...args: any[]): void
  on(channel: string, listener: (...args: any[]) => void): void
  removeAllListeners(channel: string): void
  
  // RESTful API 风格
  request(request: IPCRequest): Promise<IPCResponse>
}

interface IPCRequest {
  id: string
  method: string
  url: string
  data?: any
  headers?: {[key: string]: string}
}

interface IPCResponse {
  id: string
  status: number
  code: number
  message: string
  data?: any
}
```

## 权限管理

### 权限类型

基座定义了以下权限类型：

```typescript
enum Permission {
  // 数据访问权限
  STORAGE = 'storage',
  DATABASE = 'database',
  SHARED_DATA = 'shared_data',
  
  // 通信权限
  IPC = 'ipc',
  P2P = 'p2p',
  NETWORK = 'network',
  
  // 系统权限
  SYSTEM_INFO = 'system_info',
  FILE_SYSTEM = 'file_system',
  NOTIFICATIONS = 'notifications',
  CLIPBOARD = 'clipboard',
  
  // 窗口权限
  WINDOW_CONTROL = 'window_control',
  
  // 联系人和消息权限
  CONTACTS = 'contacts',
  MESSAGES = 'messages',
  CONVERSATIONS = 'conversations'
}
```

### 权限管理 API

```typescript
interface PermissionAPI {
  // 权限检查
  checkPermission(permission: string): Promise<APIResponse<boolean>>
  requestPermission(permission: string): Promise<APIResponse<boolean>>
  
  // 权限管理
  getPermissions(): Promise<APIResponse<string[]>>
  grantPermission(pluginId: string, permission: string): boolean
  revokePermission(pluginId: string, permission: string): boolean
  
  // 数据访问验证
  validateDataAccess(operation: string, resourceType: string): boolean
  validateAPIAccess(apiName: string): boolean
}
```

## 文件系统 API

```typescript
interface FileSystemAPI {
  // 文件操作
  readText(path: string): Promise<string>
  writeText(path: string, content: string): Promise<void>
  exists(path: string): Promise<boolean>
  
  // 文件选择
  selectFile(options?: {
    title?: string,
    filters?: {name: string, extensions: string[]}[],
    multiSelections?: boolean
  }): Promise<string[]>
  
  selectDirectory(options?: {
    title?: string
  }): Promise<string>
}
```

## 网络 API

```typescript
interface NetworkAPI {
  // HTTP 请求
  fetch(url: string, options?: {
    method?: string,
    headers?: {[key: string]: string},
    body?: any,
    timeout?: number
  }): Promise<{
    status: number,
    headers: {[key: string]: string},
    data: any
  }>
  
  // 网络状态
  isOnline(): Promise<boolean>
}
```

## 系统 API

```typescript
interface SystemAPI {
  // 系统信息
  getInfo(): Promise<{
    platform: string,
    arch: string,
    version: string,
    appVersion: string
  }>
  
  // 外部链接
  openExternal(url: string): Promise<void>
}
```

## 通知 API

```typescript
interface NotificationAPI {
  // 通知显示
  show(title: string, options?: {
    body?: string,
    icon?: string,
    tag?: string,
    silent?: boolean,
    requireInteraction?: boolean
  }): Promise<void>
  
  // 权限请求
  requestPermission(): Promise<boolean>
}
```

## 剪贴板 API

```typescript
interface ClipboardAPI {
  // 文本操作
  readText(): Promise<string>
  writeText(text: string): Promise<void>
  
  // 图片操作
  readImage(): Promise<{
    data: Buffer,
    format: string,
    width: number,
    height: number
  }>
  
  writeImage(imageData: {
    data: Buffer,
    format: string
  }): Promise<void>
}
```

## 窗口管理 API

```typescript
interface WindowAPI {
  // 窗口控制
  close(): void
  minimize(): void
  maximize(): void
  restore(): void
  
  // 窗口状态
  isMaximized(): boolean
  isMinimized(): boolean
  isFocused(): boolean
}
```

## 数据验证

基座提供数据验证服务，确保插件数据的完整性和安全性：

```typescript
interface DataValidator {
  // 联系人数据验证
  validateContactData(data: ContactValidationData, isUpdate?: boolean): ValidationResult
  
  // 消息数据验证
  validateMessageData(data: MessageValidationData, isUpdate?: boolean): ValidationResult
  
  // 会话数据验证
  validateConversationData(data: ConversationValidationData, isUpdate?: boolean): ValidationResult
  
  // 自定义数据验证
  validateCustomData(data: any): ValidationResult
  
  // 附件数据验证
  validateAttachmentData(data: any, messageType?: number): ValidationResult
  
  // 插件标识验证
  validatePluginId(pluginId: string): ValidationResult
  validateDataKey(key: string): ValidationResult
}

interface ValidationResult {
  valid: boolean
  errors: string[]
  warnings?: string[]
}
```

## 错误处理

所有 API 调用都遵循统一的错误处理模式：

```typescript
interface APIResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  warnings?: string[]
  code?: number
}
```

## 安全机制

1. **权限控制**：所有 API 调用都需要相应权限
2. **数据隔离**：插件数据相互隔离，防止数据泄露
3. **输入验证**：所有输入数据都经过严格验证
4. **沙箱环境**：插件运行在受限的沙箱环境中
5. **审计日志**：记录所有敏感操作的审计日志

## 性能优化

1. **缓存机制**：频繁访问的数据自动缓存
2. **批量操作**：支持批量数据操作以提高性能
3. **异步处理**：所有 I/O 操作都是异步的
4. **资源管理**：自动管理插件资源，防止内存泄露

## 版本兼容性

基座 API 遵循语义化版本控制，确保向后兼容性：

- **主版本号**：不兼容的 API 更改
- **次版本号**：向后兼容的功能性新增
- **修订号**：向后兼容的问题修正

## 开发工具

基座提供了丰富的开发工具：

1. **插件调试器**：实时调试插件代码
2. **API 测试工具**：测试 API 调用
3. **性能分析器**：分析插件性能
4. **日志查看器**：查看插件运行日志
5. **权限管理器**：管理插件权限

---

本文档持续更新，请关注最新版本。如有疑问，请参考示例插件或联系开发团队。