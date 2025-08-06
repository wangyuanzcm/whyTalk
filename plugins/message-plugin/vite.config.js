import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html'),
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      },
      // 确保外部依赖不被打包（插件环境中可能已提供）
      external: ['electron']
    },
    // 生成 source map 用于调试
    sourcemap: true,
    // 压缩代码
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: false, // 保留 console 用于调试
        drop_debugger: true
      }
    }
  },
  server: {
    port: 3000,
    open: true,
    host: true // 允许外部访问
  },
  // 开发时的别名配置
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'components')
    }
  }
})