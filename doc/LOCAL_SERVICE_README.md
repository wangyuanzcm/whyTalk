# WhyTalk 本地服务集成

本项目已成功集成了本地Node.js服务，替代了原有的远程API依赖。所有数据现在都存储在本地SQLite数据库中，提供了完整的离线聊天体验。

## 架构概述

### 服务层结构
```
src/main/services/
├── auth/           # 用户认证服务
├── chat/           # 聊天消息服务  
├── contact/        # 联系人管理服务
├── database/       # 数据库管理
├── group/          # 群组管理服务
├── ipc/            # IPC通信处理
├── upload/         # 文件上传服务
├── user/           # 用户信息服务
└── index.ts        # 服务管理器
```

### 核心组件

#### 1. 数据库管理 (DatabaseManager)
- **位置**: `src/main/services/database/Database.ts`
- **功能**: 
  - SQLite数据库连接管理
  - 数据库架构初始化
  - 事务支持
  - 预处理语句缓存
  - 数据库备份和优化

#### 2. 认证服务 (AuthService)
- **位置**: `src/main/services/auth/AuthService.ts`
- **功能**:
  - 用户注册、登录、登出
  - JWT令牌生成和验证
  - 密码加密和验证
  - 会话管理
  - 忘记密码处理

#### 3. 聊天服务 (ChatService)
- **位置**: `src/main/services/chat/ChatService.ts`
- **功能**:
  - 会话列表管理
  - 消息发送、撤回、删除
  - 聊天记录查询
  - 消息转发
  - 历史记录搜索

#### 4. 用户服务 (UserService)
- **位置**: `src/main/services/user/UserService.ts`
- **功能**:
  - 用户信息管理
  - 在线状态管理
  - 用户设置
  - 用户搜索
  - 密码和联系方式更新

#### 5. 联系人服务 (ContactService)
- **位置**: `src/main/services/contact/ContactService.ts`
- **功能**:
  - 联系人增删改查
  - 好友申请处理
  - 联系人分组管理
  - 联系人搜索

#### 6. 群组服务 (GroupService)
- **位置**: `src/main/services/group/GroupService.ts`
- **功能**:
  - 群组创建和管理
  - 群成员管理
  - 群组权限控制
  - 群公告管理
  - 群组搜索

#### 7. 文件上传服务 (UploadService)
- **位置**: `src/main/services/upload/UploadService.ts`
- **功能**:
  - 文件上传处理
  - 文件类型和大小验证
  - 文件存储管理
  - 文件清理

#### 8. IPC处理器 (IPCHandler)
- **位置**: `src/main/services/ipc/IPCHandler.ts`
- **功能**:
  - 渲染进程API请求路由
  - 用户身份验证
  - 实时事件广播
  - 错误处理

## 数据库架构

数据库使用SQLite，架构定义在 `src/main/services/database/schema.sql`：

### 主要表结构
- **users**: 用户基本信息
- **user_sessions**: 用户会话管理
- **user_online_status**: 用户在线状态
- **contacts**: 联系人关系
- **contact_groups**: 联系人分组
- **contact_applies**: 好友申请
- **groups**: 群组信息
- **group_members**: 群组成员
- **group_notices**: 群组公告
- **conversations**: 会话信息
- **messages**: 消息记录
- **user_settings**: 用户设置

## 配置管理

配置文件位于 `src/main/config/index.ts`，包含：

- **数据库配置**: 数据库路径、备份路径
- **认证配置**: JWT密钥、过期时间
- **上传配置**: 文件大小限制、允许类型、存储路径
- **聊天配置**: 消息长度限制、历史记录保留天数
- **用户配置**: 离线超时时间

## 服务初始化

服务管理器 (`src/main/services/index.ts`) 负责：

1. **初始化流程**:
   - 确保必要目录存在
   - 初始化数据库连接
   - 启动定时任务
   - 设置IPC处理器

2. **定时任务**:
   - 每5分钟清理离线用户状态
   - 每小时优化数据库

3. **关闭流程**:
   - 停止定时任务
   - 关闭数据库连接

## API接口

所有API接口通过IPC通信处理，支持的接口包括：

### 认证相关
- `POST /api/v1/auth/login` - 用户登录
- `POST /api/v1/auth/register` - 用户注册
- `POST /api/v1/auth/logout` - 用户登出
- `POST /api/v1/auth/forget` - 忘记密码

### 用户相关
- `GET /api/v1/user/detail` - 获取用户详情
- `PUT /api/v1/user/update` - 更新用户信息
- `PUT /api/v1/user/password/update` - 更新密码
- `PUT /api/v1/user/mobile/update` - 更新手机号
- `PUT /api/v1/user/email/update` - 更新邮箱
- `GET /api/v1/user/setting` - 获取用户设置

### 联系人相关
- `GET /api/v1/contact/list` - 获取联系人列表
- `POST /api/v1/contact/search` - 搜索用户
- `GET /api/v1/contact/detail` - 获取联系人详情
- `DELETE /api/v1/contact/delete` - 删除联系人
- `PUT /api/v1/contact/edit-remark` - 修改备注
- `POST /api/v1/contact/apply/create` - 创建好友申请
- `GET /api/v1/contact/apply/records` - 获取申请记录
- `POST /api/v1/contact/apply/accept` - 接受申请
- `POST /api/v1/contact/apply/decline` - 拒绝申请

### 群组相关
- `GET /api/v1/group/list` - 获取群组列表
- `GET /api/v1/group/detail` - 获取群组详情
- `POST /api/v1/group/create` - 创建群组
- `PUT /api/v1/group/update` - 更新群组信息
- `POST /api/v1/group/invite` - 邀请成员
- `DELETE /api/v1/group/member/remove` - 移除成员
- `DELETE /api/v1/group/dismiss` - 解散群组
- `POST /api/v1/group/secede` - 退出群组

### 聊天相关
- `GET /api/v1/talk/list` - 获取会话列表
- `POST /api/v1/talk/create` - 创建会话
- `DELETE /api/v1/talk/delete` - 删除会话
- `PUT /api/v1/talk/topping` - 置顶会话
- `PUT /api/v1/talk/clear-unread` - 清除未读
- `GET /api/v1/talk/records` - 获取聊天记录
- `POST /api/v1/talk/message/send` - 发送消息
- `PUT /api/v1/talk/message/revoke` - 撤回消息
- `DELETE /api/v1/talk/message/delete` - 删除消息

### 文件上传
- 通过 `upload-file` IPC事件处理文件上传

## 实时事件

支持的实时事件：
- `message:new` - 新消息
- `message:revoke` - 消息撤回
- `user:online` - 用户上线
- `user:offline` - 用户下线

## 安全特性

1. **密码安全**: 使用bcrypt进行密码哈希
2. **JWT认证**: 使用JSON Web Token进行身份验证
3. **会话管理**: 支持多设备登录和会话过期
4. **文件验证**: 严格的文件类型和大小验证
5. **SQL注入防护**: 使用预处理语句

## 性能优化

1. **数据库优化**:
   - WAL模式提高并发性能
   - 索引优化查询速度
   - 定期数据库优化

2. **内存管理**:
   - 预处理语句缓存
   - 连接池管理

3. **文件管理**:
   - 按日期分目录存储
   - 定期清理过期文件

## 开发和调试

1. **日志**: 所有服务都有详细的控制台日志输出
2. **错误处理**: 完善的错误捕获和处理机制
3. **类型安全**: 完整的TypeScript类型定义

## 部署说明

1. **依赖安装**: 
   ```bash
   npm install
   # 或
   pnpm install
   ```

2. **构建应用**:
   ```bash
   npm run build
   ```

3. **运行应用**:
   ```bash
   npm run dev  # 开发模式
   npm start    # 生产模式
   ```

## 数据存储位置

- **数据库**: `{userData}/whytalk.db`
- **上传文件**: `{userData}/uploads/`
- **备份文件**: `{userData}/backups/`

其中 `{userData}` 是Electron应用的用户数据目录。

## 注意事项

1. **首次运行**: 应用首次运行时会自动创建数据库和必要的目录
2. **数据迁移**: 如需从远程服务迁移数据，需要实现相应的数据导入功能
3. **备份**: 建议定期备份数据库文件
4. **更新**: 更新应用时注意数据库架构的兼容性

这个本地服务架构提供了完整的聊天应用功能，支持离线使用，数据安全可控，性能优异。