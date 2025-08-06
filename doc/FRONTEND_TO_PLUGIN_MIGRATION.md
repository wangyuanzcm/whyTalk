# 前端功能迁移到插件指南

## 概述

根据错误分析，前端中存在大量直接调用后端 API 的代码，这些功能需要迁移到对应的插件中。本文档详细说明了迁移计划和具体步骤。

## 错误分析

当前主要错误：
```
ipc-request.ts:90 ipcApi: Business error: 未知的接口: /api/v1/talk/list
```

这个错误表明前端仍在尝试调用已经移除的后端 API 接口。

## 需要迁移的功能模块

### 1. 消息聊天功能 (message-plugin)

**涉及的 API 接口：**
- `/api/v1/talk/list` - 获取聊天列表
- `/api/v1/talk/create` - 创建聊天
- `/api/v1/talk/delete` - 删除聊天
- `/api/v1/talk/topping` - 置顶聊天
- `/api/v1/talk/clear-unread` - 清除未读
- `/api/v1/talk/records` - 获取聊天记录
- `/api/v1/talk/history-records` - 获取历史记录
- `/api/v1/talk/forward-records` - 转发记录
- `/api/v1/talk/disturb` - 免打扰设置
- `/api/v1/talk/message/send` - 发送消息
- `/api/v1/talk/message/revoke` - 撤回消息
- `/api/v1/talk/message/delete` - 删除消息

**需要删除的前端文件：**
- `src/renderer/src/api/chat.ts` - 聊天相关 API 定义
- `src/renderer/src/store/modules/talk.ts` - 聊天状态管理
- `src/renderer/src/event/talk.ts` - 聊天事件处理
- `src/renderer/src/views/message/` - 消息相关视图组件
- `src/renderer/src/hooks/useChatTalk.ts` - 聊天相关 hooks

**需要修改的前端文件：**
- `src/renderer/src/views/message/sider/useSessionMenu.ts` - 会话菜单逻辑
- `src/renderer/src/views/message/panel/useTalkRecord.ts` - 聊天记录逻辑

### 2. 联系人管理功能 (contact-plugin)

**涉及的 API 接口：**
- `/api/v1/contact/list` - 获取联系人列表
- `/api/v1/contact/delete` - 删除联系人
- `/api/v1/contact/edit-remark` - 编辑备注
- `/api/v1/contact/search` - 搜索联系人
- `/api/v1/contact/apply/create` - 创建好友申请
- `/api/v1/contact/apply/records` - 好友申请记录
- `/api/v1/contact/apply/accept` - 接受好友申请
- `/api/v1/contact/apply/decline` - 拒绝好友申请
- `/api/v1/contact/apply/unread-num` - 未读申请数量
- `/api/v1/contact/detail` - 联系人详情
- `/api/v1/contact/group/list` - 联系人分组列表
- `/api/v1/contact/move-group` - 移动联系人分组
- `/api/v1/contact/group/update` - 更新联系人分组
- `/api/v1/contact/online-status` - 在线状态

**需要删除的前端文件：**
- `src/renderer/src/api/contact.ts` - 联系人相关 API 定义
- `src/renderer/src/views/contact/` - 联系人相关视图组件
- `src/renderer/src/hooks/useContact.tsx` - 联系人相关 hooks

**需要修改的前端文件：**
- `src/renderer/src/components/user/ContactModal.vue` - 联系人选择模态框
- `src/renderer/src/components/user/UserCardModal.vue` - 用户卡片模态框
- `src/renderer/src/store/modules/user.ts` - 用户状态管理（移除联系人申请相关）

### 3. 群组管理功能 (contact-plugin)

**涉及的 API 接口：**
- `/api/v1/group/list` - 获取群组列表
- `/api/v1/group/overt-list` - 公开群组列表
- `/api/v1/group/detail` - 群组详情
- `/api/v1/group/create` - 创建群组
- `/api/v1/group/update` - 更新群组
- `/api/v1/group/invite` - 邀请加入群组
- `/api/v1/group/member/remove` - 移除群成员
- `/api/v1/group/dismiss` - 解散群组
- `/api/v1/group/mute` - 群组禁言
- `/api/v1/group/overt` - 设置公开群组
- `/api/v1/group/secede` - 退出群组
- 其他群组相关接口...

**需要删除的前端文件：**
- `src/renderer/src/api/group.ts` - 群组相关 API 定义
- `src/renderer/src/hooks/useGroup.ts` - 群组相关 hooks
- `src/renderer/src/hooks/useGroupListMenu.ts` - 群组列表菜单

### 4. 笔记管理功能 (note-plugin)

**涉及的 API 接口：**
- `/api/v1/article/list` - 获取文章列表
- `/api/v1/article/editor` - 编辑文章
- `/api/v1/article/delete` - 删除文章
- `/api/v1/article/forever-delete` - 永久删除
- `/api/v1/article/recycle-list` - 回收站列表
- `/api/v1/article/recover-delete` - 恢复删除
- `/api/v1/article/collect` - 收藏文章
- `/api/v1/article/detail` - 文章详情
- 其他文章相关接口...

**需要删除的前端文件：**
- `src/renderer/src/api/article.ts` - 文章相关 API 定义
- `src/renderer/src/store/modules/note.ts` - 笔记状态管理
- `src/renderer/src/views/note/` - 笔记相关视图组件

### 5. 其他功能

**表情包管理：**
- `/api/v1/emoticon/customize/list`
- `/api/v1/emoticon/customize/upload`
- `/api/v1/emoticon/customize/delete`
- `/api/v1/emoticon/customize/create`

**文件上传：**
- `/api/v1/upload/media-file`
- `/api/v1/upload/init-multipart`
- `/api/v1/upload/multipart`

**组织架构：**
- `/api/v1/organize/department/all`
- `/api/v1/organize/personnel/all`

## 迁移步骤

### 第一阶段：准备工作

1. **备份当前代码**
   ```bash
   git checkout -b frontend-migration-backup
   git add .
   git commit -m "备份迁移前的前端代码"
   ```

2. **完善插件 API 实现**
   - 在 `message-plugin` 中实现消息相关 API
   - 在 `contact-plugin` 中实现联系人和群组相关 API
   - 在 `note-plugin` 中实现笔记相关 API

### 第二阶段：逐步迁移

1. **迁移消息功能**
   ```bash
   # 删除消息相关 API 定义
   rm src/renderer/src/api/chat.ts
   
   # 删除消息相关状态管理
   rm src/renderer/src/store/modules/talk.ts
   
   # 删除消息相关事件处理
   rm src/renderer/src/event/talk.ts
   
   # 删除消息相关视图组件
   rm -rf src/renderer/src/views/message/
   ```

2. **迁移联系人功能**
   ```bash
   # 删除联系人相关 API 定义
   rm src/renderer/src/api/contact.ts
   rm src/renderer/src/api/group.ts
   
   # 删除联系人相关视图组件
   rm -rf src/renderer/src/views/contact/
   ```

3. **迁移笔记功能**
   ```bash
   # 删除笔记相关 API 定义
   rm src/renderer/src/api/article.ts
   
   # 删除笔记相关状态管理
   rm src/renderer/src/store/modules/note.ts
   
   # 删除笔记相关视图组件
   rm -rf src/renderer/src/views/note/
   ```

### 第三阶段：清理和优化

1. **清理无用的 API 文件**
   ```bash
   rm src/renderer/src/api/emoticon.ts
   rm src/renderer/src/api/upload.ts
   rm src/renderer/src/api/organize.ts
   ```

2. **更新路由配置**
   - 移除已迁移功能的路由
   - 更新主应用路由，只保留核心功能

3. **更新主布局**
   - 移除已迁移功能的菜单项
   - 更新导航逻辑

4. **清理无用的 hooks 和工具函数**
   ```bash
   rm src/renderer/src/hooks/useChatTalk.ts
   rm src/renderer/src/hooks/useContact.tsx
   rm src/renderer/src/hooks/useGroup.ts
   rm src/renderer/src/hooks/useGroupListMenu.ts
   ```

## 插件实现要求

### 1. 消息插件 (message-plugin)

**需要实现的功能：**
- 聊天列表管理
- 消息发送和接收
- 聊天记录查看
- 文件传输
- 消息撤回和删除
- 免打扰设置

**API 实现示例：**
```javascript
// 在 message-plugin/script.js 中
class MessagePlugin {
  async handleAPICall(url, data) {
    switch (url) {
      case '/api/v1/talk/list':
        return await this.getTalkList()
      case '/api/v1/talk/create':
        return await this.createTalk(data)
      case '/api/v1/talk/records':
        return await this.getTalkRecords(data)
      // ... 其他接口
    }
  }
}
```

### 2. 联系人插件 (contact-plugin)

**需要实现的功能：**
- 联系人列表管理
- 好友申请处理
- 联系人分组
- 群组管理
- 在线状态显示

### 3. 笔记插件 (note-plugin)

**需要实现的功能：**
- 笔记创建和编辑
- 笔记分类管理
- 笔记搜索
- 回收站功能
- 笔记导出

## 注意事项

1. **数据迁移**
   - 确保插件能够访问现有的数据库数据
   - 实现数据格式转换（如果需要）

2. **插件间通信**
   - 实现插件间的消息传递机制
   - 确保数据一致性

3. **用户体验**
   - 保持界面一致性
   - 确保功能完整性
   - 优化加载性能

4. **错误处理**
   - 实现完善的错误处理机制
   - 提供用户友好的错误提示

5. **测试验证**
   - 每个阶段完成后进行功能测试
   - 确保插件功能正常工作
   - 验证数据完整性

## 预期结果

迁移完成后：
- 前端主应用只保留核心功能（认证、用户管理、P2P、设置等）
- 所有业务功能都通过插件实现
- 消除所有 "未知的接口" 错误
- 实现真正的模块化架构
- 提高系统的可扩展性和维护性

## 时间计划

- **第一阶段（1-2天）**：完善插件 API 实现
- **第二阶段（2-3天）**：逐步迁移功能模块
- **第三阶段（1天）**：清理和优化
- **测试验证（1天）**：全面测试和修复问题

总计：5-7天完成整个迁移过程。