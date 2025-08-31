import '@/styles/theme/index.less'
import '@/assets/css/define/global.less'
import '@/assets/css/dropsize.less'
import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import * as plugins from './plugins'
import { useThemeStore } from '@/store/modules/theme'
// P2P初始化器已被移除

async function bootstrap() {
  const app = createApp(App)

  app.use(router)

  plugins.setPinia(app)
  plugins.setHljsVuePlugin(app)
  plugins.setupNaive(app)
  plugins.setComponents(app)
  plugins.setupDirective(app)

  app.mount('#app')

  // 初始化主题系统
  const themeStore = useThemeStore()
  await themeStore.initTheme()

  // P2P服务初始化代码已被移除
}

bootstrap()
