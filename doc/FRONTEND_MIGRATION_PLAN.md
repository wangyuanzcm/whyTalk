# 前端功能模块迁移到插件方案

## 项目现状分析

### 当前前端目录结构

```
src/renderer/src/
├── views/
│   ├── auth/           # 登录认证模块 (保留)
│   ├── workspace/      # 工作台 (保留)
│   ├── setting/        # 设置模块 (保留)
│   ├── p2p/           # P2P网络管理 (保留，已切换为localsend)
│   ├── message/        # 消息模块 (迁移到插件)
│   ├── contact/        # 通讯录模块 (迁移到插件)
│   ├── note/          # 笔记模块 (迁移到插件)
│   ├── plugin/        # 插件视图 (保留)
│   └── other/         # 其他页面 (保留)
├── components/        # 组件库
├── store/            # 状态管理
├── router/           # 路由配置
└── api/              # API接口
```

### 核心保留功能

1. **工作台 (workspace)** - 插件管理和启动中心
2. **设置 (settings)** - 系统配置和插件管理
3. **登录认证 (auth)** - 用户登录、注册、忘记密码
4. **P2P网络 (p2p)** - 已切换为localsend的网络管理

### 需要迁移到插件的功能

1. **消息模块 (message)** - 聊天、对话管理
2. **通讯录模块 (contact)** - 好友、群组管理
3. **笔记模块 (note)** - 笔记编辑和管理

## 迁移策略

### 阶段一：准备工作

1. 备份当前代码
2. 创建插件模板结构
3. 设计插件间通信机制
4. 更新菜单系统配置

### 阶段二：消息模块迁移

1. 创建 `message-plugin` 插件
2. 迁移消息相关组件和逻辑
3. 更新路由配置
4. 测试插件功能

### 阶段三：通讯录模块迁移

1. 创建 `contact-plugin` 插件
2. 迁移通讯录相关组件和逻辑
3. 处理与消息模块的依赖关系
4. 测试插件功能

### 阶段四：笔记模块迁移

1. 创建 `note-plugin` 插件
2. 迁移笔记相关组件和逻辑
3. 独立化笔记功能
4. 测试插件功能

### 阶段五：清理和优化

1. 移除原有模块代码
2. 清理无用的路由和组件
3. 优化插件加载机制
4. 完善文档

## 技术实现方案

### 1. 插件结构设计

```
plugins/
├── message-plugin/
│   ├── cubeModule.json     # 插件配置
│   ├── index.html         # 插件入口
│   ├── src/
│   │   ├── components/    # 消息组件
│   │   ├── views/        # 消息视图
│   │   ├── store/        # 消息状态
│   │   └── api/          # 消息API
│   └── package.json
├── contact-plugin/
│   ├── cubeModule.json
│   ├── index.html
│   ├── src/
│   │   ├── components/    # 通讯录组件
│   │   ├── views/        # 通讯录视图
│   │   ├── store/        # 通讯录状态
│   │   └── api/          # 通讯录API
│   └── package.json
└── note-plugin/
    ├── cubeModule.json
    ├── index.html
    ├── src/
    │   ├── components/    # 笔记组件
    │   ├── views/        # 笔记视图
    │   ├── store/        # 笔记状态
    │   └── api/          # 笔记API
    └── package.json
```

### 2. 菜单系统更新

当前菜单store已经支持插件菜单项，需要更新配置：

```typescript
// 更新后的菜单配置
coreMenuItems: [
  { id: 'workspace', link: '/workspace', title: '工作台' },
  { id: 'p2p', link: '/p2p', title: 'P2P网络' },
  { id: 'settings', link: '/settings', title: '设置' }
]

pluginMenuItems: [
  { id: 'message', pluginId: 'message-plugin', title: '消息' },
  { id: 'contact', pluginId: 'contact-plugin', title: '通讯录' },
  { id: 'note', pluginId: 'note-plugin', title: '笔记' }
]
```

### 3. 路由系统简化

移除插件相关的路由，保留核心路由：

```javascript
const routes = [
  {
    path: '/',
    component: MainLayout,
    redirect: '/workspace',
    children: [
      { path: '/workspace', component: () => import('@/views/workspace/index.vue') },
      { path: '/plugin/:pluginId', component: () => import('@/views/plugin/PluginView.vue') },
      SettingRouter,
      AuthRouter,
      P2PRouter
    ]
  }
]
```

### 4. 插件通信机制

设计插件间的事件通信系统：

```typescript
// 插件事件总线
interface PluginEventBus {
  emit(event: string, data: any): void
  on(event: string, handler: Function): void
  off(event: string, handler: Function): void
}

// 常用事件
const PLUGIN_EVENTS = {
  MESSAGE_RECEIVED: 'message:received',
  CONTACT_UPDATED: 'contact:updated',
  NOTE_CREATED: 'note:created'
}
```

## 迁移步骤详细说明

### 步骤1：创建消息插件

1. 在 `plugins/` 目录下创建 `message-plugin` 文件夹
2. 复制 `views/message/` 下的所有组件到插件中
3. 复制相关的store、API、组件到插件中
4. 创建插件配置文件 `cubeModule.json`
5. 更新插件的路由和依赖

### 步骤2：创建通讯录插件

1. 在 `plugins/` 目录下创建 `contact-plugin` 文件夹
2. 复制 `views/contact/` 下的所有组件到插件中
3. 处理与消息模块的依赖关系
4. 创建插件配置文件
5. 测试插件独立性

### 步骤3：创建笔记插件

1. 在 `plugins/` 目录下创建 `note-plugin` 文件夹
2. 复制 `views/note/` 下的所有组件到插件中
3. 独立化笔记功能，移除对其他模块的依赖
4. 创建插件配置文件
5. 测试插件功能完整性

### 步骤4：清理主应用

1. 删除 `views/message/`、`views/contact/`、`views/note/` 目录
2. 清理相关的路由配置
3. 移除无用的组件和store
4. 更新导入路径和依赖

## 预期效果

### 迁移前

- 主应用包含所有功能模块
- 代码耦合度高
- 功能无法独立开关
- 维护成本高

### 迁移后

- 主应用只保留核心功能（工作台、设置、登录、P2P）
- 业务功能模块化为插件
- 插件可独立开发、测试、部署
- 用户可按需启用功能
- 代码结构更清晰，维护成本降低

## 风险评估

### 技术风险

1. **插件间依赖** - 需要设计好插件间的通信机制
2. **状态管理** - 插件状态与主应用状态的同步
3. **性能影响** - 插件加载可能影响启动速度

### 解决方案

1. 使用事件总线进行插件间通信
2. 设计统一的状态管理接口
3. 实现插件懒加载机制

## 时间规划

- **阶段一（准备工作）**: 1-2天
- **阶段二（消息模块迁移）**: 3-4天
- **阶段三（通讯录模块迁移）**: 2-3天
- **阶段四（笔记模块迁移）**: 2-3天
- **阶段五（清理和优化）**: 1-2天

**总计**: 9-14天

## 验收标准

1. ✅ 主应用只保留核心功能（工作台、设置、登录、P2P）
2. ✅ 消息、通讯录、笔记功能完全迁移到插件
3. ✅ 插件可以独立启用/禁用
4. ✅ 插件功能完整，无功能缺失
5. ✅ 插件间通信正常
6. ✅ 性能无明显下降
7. ✅ 代码结构清晰，易于维护

## 后续优化

1. **插件市场** - 支持第三方插件安装
2. **插件热更新** - 支持插件在线更新
3. **插件权限管理** - 细粒度的插件权限控制
4. **插件开发工具** - 提供插件开发脚手架和调试工具
