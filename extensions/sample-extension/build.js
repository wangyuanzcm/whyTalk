/**
 * 示例扩展构建脚本
 * 将TypeScript编译为JavaScript
 */

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

/**
 * 构建扩展
 */
function buildExtension() {
  console.log('开始构建示例扩展...')
  
  try {
    // 确保输出目录存在
    const outDir = path.join(__dirname, 'out')
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true })
    }
    
    // 编译TypeScript
    console.log('编译TypeScript...')
    execSync('npx tsc', { 
      cwd: __dirname, 
      stdio: 'inherit' 
    })
    
    // 复制package.json到输出目录
    const packageJsonPath = path.join(__dirname, 'package.json')
    const outPackageJsonPath = path.join(outDir, 'package.json')
    
    if (fs.existsSync(packageJsonPath)) {
      fs.copyFileSync(packageJsonPath, outPackageJsonPath)
      console.log('已复制package.json到输出目录')
    }
    
    // 复制其他资源文件（如果有的话）
    const resourceDirs = ['assets', 'resources', 'static']
    for (const dir of resourceDirs) {
      const srcDir = path.join(__dirname, dir)
      const destDir = path.join(outDir, dir)
      
      if (fs.existsSync(srcDir)) {
        copyDirectory(srcDir, destDir)
        console.log(`已复制${dir}目录到输出目录`)
      }
    }
    
    console.log('✅ 扩展构建完成！')
    console.log(`输出目录: ${outDir}`)
    
  } catch (error) {
    console.error('❌ 构建失败:', error.message)
    process.exit(1)
  }
}

/**
 * 递归复制目录
 */
function copyDirectory(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true })
  }
  
  const entries = fs.readdirSync(src, { withFileTypes: true })
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)
    
    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath)
    } else {
      fs.copyFileSync(srcPath, destPath)
    }
  }
}

/**
 * 监听模式
 */
function watchExtension() {
  console.log('开始监听模式...')
  
  try {
    execSync('npx tsc --watch', { 
      cwd: __dirname, 
      stdio: 'inherit' 
    })
  } catch (error) {
    console.error('监听模式失败:', error.message)
    process.exit(1)
  }
}

/**
 * 清理输出目录
 */
function cleanExtension() {
  console.log('清理输出目录...')
  
  const outDir = path.join(__dirname, 'out')
  
  if (fs.existsSync(outDir)) {
    fs.rmSync(outDir, { recursive: true, force: true })
    console.log('✅ 输出目录已清理')
  } else {
    console.log('输出目录不存在，无需清理')
  }
}

// 命令行参数处理
const command = process.argv[2]

switch (command) {
  case 'build':
    buildExtension()
    break
  case 'watch':
    watchExtension()
    break
  case 'clean':
    cleanExtension()
    break
  default:
    console.log('用法:')
    console.log('  node build.js build   - 构建扩展')
    console.log('  node build.js watch   - 监听模式')
    console.log('  node build.js clean   - 清理输出目录')
    process.exit(1)
}