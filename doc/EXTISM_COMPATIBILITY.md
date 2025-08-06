# Extism 兼容性问题及解决方案

## 问题描述

Extism 是一个用于运行 WebAssembly (WASM) 插件的运行时，但在 Electron 环境中存在兼容性问题：

1. **WASI 模块缺失**: Extism 依赖 WASI (WebAssembly System Interface)，但 Electron 的 Node.js 环境默认不包含 WASI 支持
2. **原生模块冲突**: `@extism/extism` 包含原生二进制文件，可能与 Electron 的打包机制冲突
3. **安全沙箱限制**: Electron 的安全模型可能阻止某些 WASM 操作

## 当前解决方案

### 1. 临时禁用系统插件

在 `src/main/plugin/PluginManager.ts` 中，我们采用了以下策略：

```typescript
// 注释掉 Extism 导入
// import { createExtism, Plugin } from '@extism/extism'
type Plugin = any

// 禁用 Extism 初始化
private async initializeExtism() {
  console.warn('Extism runtime not available in Electron environment')
  console.warn('System plugins are disabled')
  this.extism = null
}

// 禁用系统插件加载
private async loadSystemPluginFromPath(pluginPath: string, configPath: string) {
  console.warn(`System plugin loading disabled: ${pluginPath}`)
  console.warn('Extism runtime not available in Electron environment')
  return
}

// 系统插件执行返回错误
private async executeSystemPlugin(pluginId: string, functionName: string, input?: any) {
  return { success: false, error: 'System plugins are not available in Electron environment' }
}
```

### 2. 保持前端插件功能

前端插件（基于 HTML/CSS/JavaScript）不受影响，继续正常工作：

- 插件发现和加载
- 插件列表管理
- 前端插件内容读取
- 插件启用/禁用控制

## 可能的解决方案

### 方案 1: 使用 Electron 原生模块

```bash
# 安装 electron-rebuild
pnpm add -D electron-rebuild

# 重新构建原生模块
npx electron-rebuild
```

### 方案 2: 使用 WASI 兼容层

```bash
# 安装 WASI 支持
pnpm add @wasmer/wasi @wasmer/wasmfs
```

然后修改 PluginManager:

```typescript
import { WASI } from '@wasmer/wasi'
import { WasmFs } from '@wasmer/wasmfs'

private async initializeWASI() {
  const wasmFs = new WasmFs()
  const wasi = new WASI({
    args: [],
    env: {},
    bindings: {
      ...WASI.defaultBindings,
      fs: wasmFs.fs
    }
  })
  return wasi
}
```

### 方案 3: 使用 Web Workers

将 WASM 插件执行移到 Web Worker 中：

```typescript
// worker.ts
self.onmessage = async (event) => {
  const { wasmBytes, functionName, input } = event.data

  try {
    const module = await WebAssembly.instantiate(wasmBytes)
    const result = module.instance.exports[functionName](input)
    self.postMessage({ success: true, result })
  } catch (error) {
    self.postMessage({ success: false, error: error.message })
  }
}
```

### 方案 4: 外部进程执行

使用子进程运行独立的 WASM 运行时：

```typescript
import { spawn } from 'child_process'

private async executeWasmPlugin(wasmPath: string, functionName: string, input: any) {
  return new Promise((resolve, reject) => {
    const child = spawn('wasmtime', [wasmPath, functionName, JSON.stringify(input)])

    let output = ''
    child.stdout.on('data', (data) => {
      output += data.toString()
    })

    child.on('close', (code) => {
      if (code === 0) {
        resolve(JSON.parse(output))
      } else {
        reject(new Error(`Process exited with code ${code}`))
      }
    })
  })
}
```

## 推荐方案

### 短期方案 (当前实现)

- 保持系统插件禁用状态
- 专注于前端插件功能的完善
- 在文档中明确说明限制

### 长期方案

1. **方案 2 + 方案 3**: 结合 WASI 兼容层和 Web Workers
2. 提供插件开发者替代方案：
   - 将复杂逻辑移到前端插件
   - 使用 IPC 与主进程通信
   - 利用 Electron 的原生 API

## 配置建议

### electron.vite.config.ts

```typescript
export default defineConfig({
  main: {
    build: {
      rollupOptions: {
        external: [
          '@extism/extism', // 暂时排除
          'wasi' // 如果使用 WASI 方案
        ]
      }
    }
  }
})
```

### package.json

```json
{
  "build": {
    "files": [
      "dist/**/*",
      "!dist/**/extism*" // 排除 extism 相关文件
    ],
    "asarUnpack": [
      "dist/main/plugin/**/*" // 确保插件文件不被打包到 asar
    ]
  }
}
```

## 测试验证

```bash
# 测试插件系统
pnpm test:plugins

# 验证前端插件
node plugin-dev-tools.js list
node plugin-dev-tools.js validate frontend-example

# 创建测试插件
node plugin-dev-tools.js create-frontend test-compatibility
```

## 注意事项

1. **依赖管理**: `@extism/extism` 仍在 package.json 中，但被注释掉使用
2. **向后兼容**: 插件配置格式保持不变，便于未来启用系统插件
3. **错误处理**: 提供清晰的错误信息，说明系统插件不可用
4. **文档更新**: 在 README.md 中明确说明当前限制

## 相关文件

- `src/main/plugin/PluginManager.ts` - 插件管理器主文件
- `src/preload/plugin-preload.ts` - 插件预加载脚本
- `plugin-dev-tools.js` - 插件开发工具
- `plugins/` - 插件目录
- `README.md` - 项目文档
