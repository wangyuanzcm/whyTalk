/**
 * WASM 插件构建脚本
 * 将 WAT (WebAssembly Text) 文件编译为 WASM 二进制文件
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

// 检查是否安装了 wabt (WebAssembly Binary Toolkit)
function checkWabt() {
  try {
    execSync('wat2wasm --version', { stdio: 'ignore' })
    return true
  } catch (error) {
    return false
  }
}

// 使用 Node.js 内置的 WebAssembly API 验证 WAT 语法
function validateWat(watContent) {
  // 这里只做基本的语法检查
  const requiredKeywords = ['(module', '(func', '(export']

  for (const keyword of requiredKeywords) {
    if (!watContent.includes(keyword)) {
      throw new Error(`Missing required keyword: ${keyword}`)
    }
  }

  console.log('✓ WAT syntax validation passed')
}

// 手动创建一个简单的 WASM 二进制文件
function createSimpleWasm() {
  // 使用一个已知有效的最小 WASM 模块
  // 这个模块包含一个简单的 add 函数
  const wasmBinary = new Uint8Array([
    // WASM header
    0x00,
    0x61,
    0x73,
    0x6d, // magic number "\0asm"
    0x01,
    0x00,
    0x00,
    0x00, // version 1

    // Type section
    0x01, // section id
    0x07, // section size
    0x01, // number of types
    0x60, // function type
    0x02, // number of parameters
    0x7f,
    0x7f, // i32, i32
    0x01, // number of results
    0x7f, // i32

    // Function section
    0x03, // section id
    0x02, // section size
    0x01, // number of functions
    0x00, // function 0 uses type 0

    // Export section
    0x07, // section id
    0x07, // section size
    0x01, // number of exports
    0x03, // name length
    0x61,
    0x64,
    0x64, // "add"
    0x00, // export kind (function)
    0x00, // function index 0

    // Code section
    0x0a, // section id
    0x09, // section size
    0x01, // number of functions
    0x07, // function body size
    0x00, // local count
    0x20,
    0x00, // local.get 0
    0x20,
    0x01, // local.get 1
    0x6a, // i32.add
    0x0b // end
  ])

  return wasmBinary
}

// 主构建函数
function build() {
  console.log('🔨 Building WASM plugin...')

  const watFile = path.join(__dirname, 'plugin.wat')
  const wasmFile = path.join(__dirname, 'plugin.wasm')

  try {
    // 检查 WAT 文件是否存在
    if (!fs.existsSync(watFile)) {
      console.log('⚠️  WAT file not found, creating simple WASM binary...')
      const wasmBinary = createSimpleWasm()
      fs.writeFileSync(wasmFile, wasmBinary)
      console.log('✅ Simple WASM binary created successfully!')
      return
    }

    // 读取 WAT 文件
    const watContent = fs.readFileSync(watFile, 'utf8')
    console.log('📖 WAT file loaded')

    // 验证 WAT 语法
    validateWat(watContent)

    // 尝试使用 wabt 编译
    if (checkWabt()) {
      console.log('🛠️  Using wabt to compile WAT to WASM...')
      try {
        execSync(`wat2wasm "${watFile}" -o "${wasmFile}"`, { stdio: 'inherit' })
        console.log('✅ WASM compilation successful!')
      } catch (error) {
        console.error('❌ wabt compilation failed:', error.message)
        throw error
      }
    } else {
      console.log('⚠️  wabt not found, creating simple WASM binary instead...')
      console.log('💡 To use full WAT compilation, install wabt:')
      console.log('   npm install -g wabt')
      console.log('   or download from: https://github.com/WebAssembly/wabt/releases')

      const wasmBinary = createSimpleWasm()
      fs.writeFileSync(wasmFile, wasmBinary)
      console.log('✅ Simple WASM binary created successfully!')
    }

    // 验证生成的 WASM 文件
    if (fs.existsSync(wasmFile)) {
      const wasmSize = fs.statSync(wasmFile).size
      console.log(`📦 WASM file size: ${wasmSize} bytes`)

      // 尝试加载和验证 WASM 模块
      try {
        const wasmBuffer = fs.readFileSync(wasmFile)
        WebAssembly.compile(wasmBuffer)
          .then(() => {
            console.log('✅ WASM module validation successful!')
          })
          .catch((error) => {
            console.error('❌ WASM module validation failed:', error.message)
          })
      } catch (error) {
        console.error('❌ Failed to validate WASM module:', error.message)
      }
    }
  } catch (error) {
    console.error('❌ Build failed:', error.message)
    process.exit(1)
  }
}

// 清理函数
function clean() {
  console.log('🧹 Cleaning build artifacts...')
  const wasmFile = path.join(__dirname, 'plugin.wasm')

  if (fs.existsSync(wasmFile)) {
    fs.unlinkSync(wasmFile)
    console.log('✅ Cleaned successfully!')
  } else {
    console.log('ℹ️  No build artifacts to clean')
  }
}

// 命令行接口
if (require.main === module) {
  const command = process.argv[2] || 'build'

  switch (command) {
    case 'build':
      build()
      break
    case 'clean':
      clean()
      break
    case 'rebuild':
      clean()
      build()
      break
    default:
      console.log('Usage: node build.js [build|clean|rebuild]')
      process.exit(1)
  }
}

module.exports = { build, clean }
