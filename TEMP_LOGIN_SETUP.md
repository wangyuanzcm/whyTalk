# 临时登录状态设置指南

## 问题分析
设置菜单点击无反应的主要原因是用户未登录，路由守卫阻止了访问。

## 快速解决方案

### 方案1: 临时移除认证要求

1. **修改设置路由配置**
   编辑文件: `src/renderer/src/router/modules/setting.js`
   
   将所有路由的 `meta: { auth: true }` 改为 `meta: { auth: false }`
   
   ```javascript
   // 修改前
   {
     path: '/settings/detail',
     meta: { auth: true },
     component: () => import('@/views/setting/detail.vue')
   }
   
   // 修改后
   {
     path: '/settings/detail',
     meta: { auth: false },
     component: () => import('@/views/setting/detail.vue')
   }
   ```

### 方案2: 设置临时登录状态

1. **在浏览器控制台中执行以下代码**:
   ```javascript
   // 设置临时token
   localStorage.setItem('AUTH_TOKEN', 'temp-token-for-testing')
   
   // 刷新页面
   location.reload()
   ```

2. **或者修改认证检查逻辑**
   编辑文件: `src/renderer/src/utils/auth.ts`
   
   临时修改 `isLogin` 函数:
   ```typescript
   export function isLogin(): boolean {
     // 临时返回true用于测试
     return true
     // return getToken() != ''
   }
   ```

### 方案3: 使用快捷登录

根据代码分析，应用提供了快捷登录功能:

1. 访问登录页面: `http://localhost:5173/#/auth/login`
2. 使用预设账号:
   - 账号1: `13800000001` / `admin123`
   - 账号2: `13800000002` / `admin123`

## 推荐步骤

1. **首先尝试方案2** - 在控制台设置临时token
2. **如果不行，使用方案1** - 临时移除认证要求
3. **最后考虑方案3** - 实际登录（需要后端服务支持）

## 测试步骤

1. 应用上述任一方案
2. 刷新页面
3. 点击设置菜单
4. 查看控制台输出，应该看到:
   ```
   Menu clicked: {link: '/settings', ...}
   Is logged in: true
   Navigating to: /settings
   Navigation successful to: /settings
   ```

## 恢复正常状态

测试完成后，记得恢复原始配置:
- 如果修改了路由配置，将 `auth: false` 改回 `auth: true`
- 如果修改了认证逻辑，恢复原始的 `isLogin` 函数
- 清除临时token: `localStorage.removeItem('AUTH_TOKEN')`