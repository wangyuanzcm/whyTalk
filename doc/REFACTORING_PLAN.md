# WhyTalk 基座重构计划

## 概述

本文档详细说明了将联系人、消息、对话相关服务从基座迁移到对应插件中的重构计划，使基座只保留认证服务、网络管理、插件管理和设置等基础功能。

## 重构目标

### 基座保留功能

- 认证服务 (AuthService)
- 用户服务 (UserService) - 基础用户信息管理
- 网络管理 (P2P相关服务)
- 插件管理 (PluginManager)
- 数据库管理 (DatabaseManager)
- 文件上传服务 (UploadService)
- 系统设置服务
- IPC 基础框架

### 迁移到插件的功能

- 联系人管理 → `contact-plugin`
- 群组管理 → `contact-plugin`
- 消息发送/接收 → `message-plugin`
- 会话管理 → `message-plugin`
- 聊天记录 → `message-plugin`

## 详细重构步骤

### 第一阶段：服务迁移

#### 1. 联系人服务迁移

**源文件：** `src/main/services/contact/ContactService.ts`
**目标：** `plugins/contact-plugin/src/services/ContactService.ts` ✅ 已完成

**迁移内容：**

- 联系人列表获取
- 联系人添加/删除/修改
- 联系人分组管理
- 好友申请处理
- 联系人搜索

#### 2. 群组服务迁移

**源文件：** `src/main/services/group/GroupService.ts`
**目标：** `plugins/contact-plugin/src/services/GroupService.ts` ✅ 已完成

**迁移内容：**

- 群组创建/解散
- 群组成员管理
- 群组信息更新
- 群组公告/投票
- 群组搜索

#### 3. 消息服务迁移

**源文件：** `src/main/services/chat/ChatService.ts` (消息相关部分)
**目标：** `plugins/message-plugin/src/services/MessageService.ts` ✅ 已完成

**迁移内容：**

- 消息发送/接收
- 消息撤回/删除
- 消息历史记录
- 文件上传处理
- P2P 消息处理

#### 4. 会话服务迁移

**源文件：** `src/main/services/chat/ChatService.ts` (会话相关部分)
**目标：** `plugins/message-plugin/src/services/ConversationService.ts` ✅ 已完成

**迁移内容：**

- 会话列表管理
- 会话创建/删除
- 会话置顶/免打扰
- 未读消息管理
- 会话搜索

### 第二阶段：基座服务重构

#### 1. 移除已迁移的服务文件

**需要删除的文件：**

- `src/main/services/contact/ContactService.ts`
- `src/main/services/group/GroupService.ts`
- `src/main/services/chat/ChatService.ts`

#### 2. 更新服务管理器

**文件：** `src/main/services/index.ts`

**修改内容：**

```typescript
// 移除导入
// import { contactService } from './contact/ContactService'
// import { groupService } from './group/GroupService'
// import { chatService } from './chat/ChatService'

// 移除对应的 getter 方法
// public getContactService() { return contactService }
// public getGroupService() { return groupService }
// public getChatService() { return chatService }
```

#### 3. 更新 IPC 处理器

**文件：** `src/main/services/ipc/IPCHandler.ts`

**修改内容：**

- 移除联系人相关的 IPC 处理逻辑
- 移除群组相关的 IPC 处理逻辑
- 移除聊天相关的 IPC 处理逻辑
- 保留基础的 P2P、认证、用户、上传等服务的 IPC 处理

#### 4. 更新插件数据 IPC

**文件：** `src/main/services/plugin/PluginDataIPC.ts`

**修改内容：**

- 移除直接的联系人、消息、会话操作
- 改为通过插件间通信或事件机制处理
- 保留权限验证和数据访问控制

### 第三阶段：插件间通信机制

#### 1. 建立插件间通信协议

**通信方式：**

- 事件总线 (EventBus)
- 插件 API 调用
- 共享数据存储

#### 2. 数据同步机制

**同步内容：**

- 联系人状态变更
- 消息接收通知
- 会话更新事件
- 群组成员变更

#### 3. 权限控制

**权限验证：**

- 插件访问数据的权限检查
- 跨插件数据访问控制
- 敏感操作的权限验证

### 第四阶段：数据库结构调整

#### 1. 数据库访问权限

**调整内容：**

- 插件通过 API 访问数据库
- 基座提供数据访问接口
- 数据隔离和权限控制

#### 2. 数据迁移脚本

**迁移内容：**

- 现有数据的兼容性处理
- 数据结构的平滑升级
- 插件数据的初始化

### 第五阶段：前端界面调整

#### 1. 路由重构

**调整内容：**

- 联系人页面路由到 `contact-plugin`
- 消息页面路由到 `message-plugin`
- 基座只保留设置、认证等基础页面

#### 2. 组件迁移

**迁移内容：**

- 联系人相关组件 → `contact-plugin`
- 消息相关组件 → `message-plugin`
- 会话相关组件 → `message-plugin`

### 第六阶段：测试和验证

#### 1. 功能测试

**测试内容：**

- 插件功能完整性测试
- 插件间通信测试
- 数据一致性测试
- 权限控制测试

#### 2. 性能测试

**测试内容：**

- 插件加载性能
- 数据访问性能
- 内存使用情况
- 网络通信性能

#### 3. 兼容性测试

**测试内容：**

- 现有数据的兼容性
- 插件版本兼容性
- 系统平台兼容性

## 实施状态

- [x] 阶段一：服务迁移（已完成）
  - [x] 创建通讯录插件服务（ContactService, GroupService）
  - [x] 创建消息插件服务（MessageService, ConversationService）
  - [x] 删除基座中的旧服务文件
- [x] 阶段二：基座服务重构（已完成）
  - [x] 更新 IPCHandler，移除已迁移服务的路由
  - [x] 更新服务索引文件，移除已删除服务的引用
  - [x] 创建 PluginAPIHandler 处理插件API调用
- [x] 阶段三：插件间通信机制（已完成）
  - [x] 创建 PluginCommunicationService 处理插件间消息
  - [x] 创建通讯录插件 SDK（ContactSDK）
  - [x] 创建消息插件 SDK（MessageSDK）
  - [x] 创建插件主入口文件
- [ ] 阶段四：数据库结构调整（进行中）
- [ ] 阶段五：前端界面调整（待开始）
- [ ] 阶段六：测试验证（待开始）

## 实施时间表

### 第一周：服务迁移

- ✅ 创建插件服务文件
- ✅ 实现基础功能接口
- ✅ 测试插件服务功能

### 第二周：基座重构

- ✅ 移除已迁移的服务
- ✅ 更新服务管理器
- ✅ 重构 IPC 处理器

### 第三周：通信机制

- ✅ 实现插件间通信
- ✅ 建立数据同步机制
- ✅ 完善权限控制

### 第四周：测试和优化

- 🔄 功能测试
- 🔄 性能优化
- 🔄 文档更新

## 风险评估

### 高风险项

1. **数据一致性**：插件间数据同步可能出现不一致
2. **性能影响**：插件通信可能影响系统性能
3. **兼容性问题**：现有功能可能受到影响

### 风险缓解措施

1. **渐进式迁移**：分阶段进行，确保每个阶段稳定
2. **充分测试**：每个阶段都进行全面测试
3. **回滚机制**：保留原有代码，支持快速回滚
4. **监控机制**：实时监控系统状态和性能

## 成功标准

### 功能标准

- ✅ 所有联系人功能正常工作
- ✅ 所有消息功能正常工作
- ✅ 所有会话功能正常工作
- 🔄 插件间通信稳定可靠

### 性能标准

- 🔄 系统启动时间不超过原来的 120%
- 🔄 消息发送延迟不超过原来的 110%
- 🔄 内存使用不超过原来的 130%

### 质量标准

- 🔄 代码覆盖率达到 80% 以上
- 🔄 无严重 Bug
- 🔄 用户体验无明显下降

## 后续优化

### 短期优化

1. **性能调优**：优化插件通信性能
2. **用户体验**：改善插件加载体验
3. **错误处理**：完善错误处理机制

### 长期规划

1. **插件生态**：建立完整的插件开发生态
2. **扩展性**：支持更多类型的插件
3. **云同步**：支持插件数据的云端同步

## 总结

通过本次重构，WhyTalk 将实现：

1. **架构清晰**：基座专注于基础功能，业务功能由插件承担
2. **扩展性强**：新功能可以通过插件形式快速添加
3. **维护性好**：各模块职责明确，便于维护和升级
4. **用户体验**：用户可以根据需要选择和配置插件

这种架构设计将为 WhyTalk 的长期发展奠定坚实的基础。
