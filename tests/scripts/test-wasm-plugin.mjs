import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 简化的WASM插件测试
async function testWasmPlugin() {
  console.log('🧪 Testing WASM Plugin...')

  const pluginPath = path.join(__dirname, 'plugins', 'wasm-example', 'plugin.wasm')

  try {
    // 检查WASM文件是否存在
    if (!fs.existsSync(pluginPath)) {
      throw new Error(`WASM file not found: ${pluginPath}`)
    }

    console.log('📦 Loading WASM file...')
    const wasmBuffer = fs.readFileSync(pluginPath)
    console.log(`📦 WASM file size: ${wasmBuffer.length} bytes`)

    // 编译WASM模块
    console.log('🔨 Compiling WASM module...')
    const wasmModule = await WebAssembly.compile(wasmBuffer)
    console.log('✅ WASM module compiled successfully!')

    // 实例化WASM模块
    console.log('🚀 Instantiating WASM module...')
    const wasmInstance = await WebAssembly.instantiate(wasmModule)
    console.log('✅ WASM module instantiated successfully!')

    // 获取导出的函数
    const exports = wasmInstance.exports
    console.log('\n📝 Exported functions:', Object.keys(exports))

    // 测试add函数
    if (exports.add) {
      console.log('\n🧮 Testing add function:')
      const result1 = exports.add(5, 3)
      console.log(`add(5, 3) = ${result1}`)

      const result2 = exports.add(10, 20)
      console.log(`add(10, 20) = ${result2}`)

      const result3 = exports.add(-5, 15)
      console.log(`add(-5, 15) = ${result3}`)
    } else {
      console.log('❌ add function not found in exports')
    }

    console.log('\n🎉 WASM plugin test completed successfully!')
  } catch (error) {
    console.error('❌ Test failed:', error.message)
    console.error(error.stack)
  }
}

// 运行测试
testWasmPlugin().catch(console.error)
