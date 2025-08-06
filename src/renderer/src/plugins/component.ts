import { App } from 'vue'
import Avatar from '@/components/basic/Avatar.vue'

export { setupDirective } from '@/directive'

// 注册全局组件
export function setComponents(app: App) {
  // mechat 组件已迁移到插件中
  
  app.component('ImAvatar', Avatar)
}
