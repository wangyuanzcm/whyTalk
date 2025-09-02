import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import { isLogin } from '@/utils/auth.ts'
import MainLayout from '@/layout/MainLayout.vue'

import SettingRouter from './modules/setting.js'
import AuthRouter from './modules/auth.js'
// P2P路由模块已被移除
// ContactRouter 已迁移到插件中

const routes = [
  {
    path: '/',
    name: 'home',
    meta: { auth: true },
    component: MainLayout,
    children: [
      {
        path: '/workspace',
        name: 'workspace',
        meta: { auth: true },
        component: () => import('@/views/workspace/index.vue')
      },
      {
        path: '/plugin/:pluginId',
        name: 'plugin',
        meta: { auth: true },
        component: () => import('@/views/plugin/PluginView.vue')
      },
      {
        path: '/plugin-config/:pluginId',
        name: 'plugin-config',
        meta: { auth: false },
        component: () => import('@/views/plugin-config/index.vue')
      },
      SettingRouter
    ]
  },
  // 独立的插件窗口路由（不包含主布局）
  {
    path: '/plugin-window/:pluginId',
    name: 'plugin-window',
    meta: { auth: true },
    component: () => import('@/views/plugin/PluginWindow.vue')
  },
  AuthRouter,
  {
    path: '/:pathMatch(.*)*',
    name: '404 NotFound',
    component: () => import('@/views/other/not-found.vue')
  }
]

const getHistoryMode = () => {
  return import.meta.env.VITE_ROUTER_MODE == 'hash' ? createWebHashHistory() : createWebHistory()
}

const router = createRouter({
  history: getHistoryMode(),
  routes,
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 })
})

router.beforeEach(async (to, from, next) => {
  // 权限验证
  if (to.meta?.auth !== false && !isLogin()) {
    return next('/auth/login')
  }

  // 根路径重定向
  if (to.path === '/') {
    return next('/workspace')
  }

  next()
})

export default router
