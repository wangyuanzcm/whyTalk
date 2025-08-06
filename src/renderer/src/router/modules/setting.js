export default {
  path: '/settings',
  name: 'settings',
  redirect: '/settings/detail',
  component: () => import('@/views/setting/layout.vue'),
  children: [
    {
      path: '/settings/detail',
      meta: { auth: false },
      component: () => import('@/views/setting/detail.vue')
    },
    // TODO: 安全设置页面已迁移到插件中
    // {
    //   path: '/settings/security',
    //   meta: { auth: false },
    //   component: () => import('@/views/setting/security.vue')
    // },
    {
      path: '/settings/binding',
      meta: { auth: false },
      component: () => import('@/views/setting/binding.vue')
    },
    {
      path: '/settings/personalize',
      meta: { auth: false },
      component: () => import('@/views/setting/personalize.vue')
    },
    {
      path: '/settings/notification',
      meta: { auth: false },
      component: () => import('@/views/setting/notification.vue')
    },
    {
      path: '/settings/plugin',
      meta: { auth: false },
      component: () => import('@/views/setting/plugin.vue')
    },
    {
      path: '/settings/menu',
      meta: { auth: false },
      component: () => import('@/views/setting/menu.vue')
    },
    {
      path: '/settings/update',
      meta: { auth: false },
      component: () => import('@/views/setting/update.vue')
    }
  ]
}
