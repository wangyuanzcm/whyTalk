import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import compressPlugin from 'vite-plugin-compression'
import AutoImport from 'unplugin-auto-import/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'

/**
 * 浏览器模式的 Vite 配置
 * 用于在浏览器中独立运行应用进行样式调试
 */
export default defineConfig({
  root: 'src/renderer',
  base: './',
  resolve: {
    alias: {
      '@renderer': resolve('src/renderer/src'),
      '@': resolve('src/renderer/src')
    },
    extensions: ['.js', '.json', 'jsx', '.vue', '.ts']
  },
  plugins: [
    vue(),
    vueJsx({}),
    compressPlugin({
      threshold: 1024 * 1024 * 1
    }),
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia'],
      dts: './auto-imports.d.ts'
    }),
    Components({
      resolvers: [NaiveUiResolver()]
    })
  ],
  build: {
    outDir: '../../dist-web',
    emptyOutDir: true,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      // 在浏览器模式下不需要排除这些模块
      // external: ['path', 'fs', 'os', 'crypto', 'util', 'stream', 'buffer']
    }
  },
  define: {
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false',
    // 定义浏览器模式标识
    __BROWSER_MODE__: 'true'
  },
  server: {
    port: 5174,
    host: true,
    open: true
  },
  optimizeDeps: {
    // 在浏览器模式下不需要排除这些依赖
    // exclude: ['path', 'fs', 'os', 'crypto', 'util', 'stream', 'buffer']
  }
})