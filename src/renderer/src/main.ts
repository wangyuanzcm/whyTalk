import '@/assets/css/define/theme.less'
import '@/assets/css/define/global.less'
import '@/assets/css/dropsize.less'
import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import * as plugins from './plugins'
import { p2pInitializer } from '@/utils/p2p-init'

async function bootstrap() {
  const app = createApp(App)

  app.use(router)

  plugins.setPinia(app)
  plugins.setHljsVuePlugin(app)
  plugins.setupNaive(app)
  plugins.setComponents(app)
  plugins.setupDirective(app)

  app.mount('#app')

  // 在应用挂载后初始化P2P服务
  try {
    console.log('开始初始化P2P服务...')
    const initialized = await p2pInitializer.initialize()
    if (initialized) {
      console.log('P2P服务初始化成功')
    } else {
      console.warn('P2P服务初始化失败，将使用传统模式')
    }
  } catch (error) {
    console.error('P2P服务初始化异常:', error)
  }
}

bootstrap()
