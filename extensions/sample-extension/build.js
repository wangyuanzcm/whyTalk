/**
 * 示例扩展构建脚本
 * 将TypeScript编译为JavaScript
 */

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')
const archiver = require('archiver')

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

/**
 * 打包扩展为zip文件
 */
async function packageExtension() {
  console.log('开始打包扩展...')

  try {
    // 先构建扩展
    buildExtension()

    const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8'))
    const extensionName = packageJson.name
    const version = packageJson.version
    const zipFileName = `${extensionName}-${version}.zip`
    const zipFilePath = path.join(__dirname, 'dist', zipFileName)

    // 确保dist目录存在
    const distDir = path.join(__dirname, 'dist')
    if (!fs.existsSync(distDir)) {
      fs.mkdirSync(distDir, { recursive: true })
      console.log('已创建dist目录')
    }

    // 删除已存在的zip文件
    if (fs.existsSync(zipFilePath)) {
      fs.unlinkSync(zipFilePath)
      console.log('已删除旧的zip文件')
    }

    // 创建zip文件
    const output = fs.createWriteStream(zipFilePath)
    const archive = archiver('zip', {
      zlib: { level: 9 } // 最高压缩级别
    })

    return new Promise((resolve, reject) => {
      output.on('close', () => {
        const fileSizeMB = (archive.pointer() / 1024 / 1024).toFixed(2)
        console.log(`✅ 扩展已打包: ${zipFilePath}`)
        console.log(`📦 文件大小: ${fileSizeMB} MB`)
        console.log(`📁 包含文件数: ${archive.pointer() > 0 ? '多个' : '0'}`)
        resolve(zipFilePath)
      })

      output.on('error', (err) => {
        console.error('❌ 输出流错误:', err)
        reject(err)
      })

      archive.on('error', (err) => {
        console.error('❌ 打包失败:', err)
        reject(err)
      })

      archive.on('warning', (err) => {
        if (err.code === 'ENOENT') {
          console.warn('⚠️ 警告:', err)
        } else {
          reject(err)
        }
      })

      archive.pipe(output)

      // 添加必要的文件到zip包
      const outDir = path.join(__dirname, 'out')
      
      // 添加编译后的文件
      if (fs.existsSync(outDir)) {
        console.log('添加编译后的文件...')
        archive.directory(outDir, false)
      } else {
        console.warn('⚠️ out目录不存在')
      }

      // 添加webview目录（如果存在）
      const webviewDir = path.join(__dirname, 'webview')
      if (fs.existsSync(webviewDir)) {
        console.log('添加webview目录...')
        archive.directory(webviewDir, 'webview')
      }

      // 添加assets目录（如果存在）
      const assetsDir = path.join(__dirname, 'assets')
      if (fs.existsSync(assetsDir)) {
        console.log('添加assets目录...')
        archive.directory(assetsDir, 'assets')
      }

      // 添加README.md（如果存在）
      const readmePath = path.join(__dirname, 'README.md')
      if (fs.existsSync(readmePath)) {
        console.log('添加README.md...')
        archive.file(readmePath, { name: 'README.md' })
      }

      // 添加CHANGELOG.md（如果存在）
      const changelogPath = path.join(__dirname, 'CHANGELOG.md')
      if (fs.existsSync(changelogPath)) {
        console.log('添加CHANGELOG.md...')
        archive.file(changelogPath, { name: 'CHANGELOG.md' })
      }

      console.log('正在完成打包...')
      // 完成打包
      archive.finalize()
    })
  } catch (error) {
    console.error('❌ 打包过程中发生错误:', error)
    throw error
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
  case 'package':
    packageExtension().catch(err => {
      console.error('打包失败:', err)
      process.exit(1)
    })
    break
  default:
    console.log('用法:')
    console.log('  node build.js build   - 构建扩展')
    console.log('  node build.js watch   - 监听模式')
    console.log('  node build.js clean   - 清理输出目录')
    console.log('  node build.js package - 打包扩展为zip文件')
    process.exit(1)
}
