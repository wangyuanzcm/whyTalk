/**
 * 截图工具路由配置
 * 提供截图相关功能的路由定义
 */

export default {
  path: '/screenshot',
  name: 'screenshot',
  meta: { 
    auth: false,
    title: '截图工具'
  },
  component: () => import('@/views/Screenshot/ScreenshotTool.vue')
}