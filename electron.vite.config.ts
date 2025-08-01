import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import compressPlugin from 'vite-plugin-compression'
import AutoImport from 'unplugin-auto-import/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
    build: {
      rollupOptions: {
        input: {
          index: resolve(__dirname, 'src/preload/index.ts'),
          'plugin-preload': resolve(__dirname, 'src/preload/plugin-preload.ts')
        }
      }
    }
  },
  renderer: {
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
      emptyOutDir: true,
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        external: ['path', 'fs', 'os', 'crypto', 'util', 'stream', 'buffer']
      }
    },
    define: {
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false'
    },
    optimizeDeps: {
      exclude: ['path', 'fs', 'os', 'crypto', 'util', 'stream', 'buffer']
    }
  }
})
