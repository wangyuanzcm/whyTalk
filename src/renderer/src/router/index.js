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
    redirect: '/workspace',
    children: [
      // 消息和笔记功能已迁移到插件中
      {
        path: '/example',
        name: 'example',
        component: () => import('@/views/example/index.vue')
      },
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
      // P2P路由已被移除
      // ContactRouter 已迁移到插件中
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

// 设置中间件，权限验证
router.beforeEach((to) => {
  if (to.meta?.auth && !isLogin()) {
    return {
      path: '/auth/login',
      query: { redirect: to.fullPath }
    }
  }

  // 处理根路径重定向到用户设置的默认页面
  if (to.path === '/') {
    // 延迟导入store以避免初始化顺序问题
    import('@/store').then(({ useSettingsStore }) => {
      const settingsStore = useSettingsStore()
      const defaultPage = settingsStore.defaultPage || '/workspace'
      if (defaultPage !== '/workspace') {
        router.replace(defaultPage)
      }
    })
  }
})

export default router
