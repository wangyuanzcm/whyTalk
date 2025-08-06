#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import archiver from 'archiver';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * 创建插件 ZIP 压缩包
 */
async function createPluginZip() {
  const projectRoot = path.resolve(__dirname, '..');
  const distPath = path.join(projectRoot, 'dist');
  const packageJsonPath = path.join(projectRoot, 'package.json');
  
  // 读取 package.json 获取版本信息
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const pluginName = packageJson.name.replace('@whytalk/', '');
  const version = packageJson.version;
  
  const outputPath = path.join(projectRoot, `${pluginName}-v${version}.zip`);
  
  console.log('🚀 开始创建插件压缩包...');
  console.log(`📦 插件名称: ${pluginName}`);
  console.log(`🏷️  版本: ${version}`);
  console.log(`📁 输出路径: ${outputPath}`);
  
  // 检查 dist 目录是否存在
  if (!fs.existsSync(distPath)) {
    console.error('❌ dist 目录不存在，请先运行构建命令');
    process.exit(1);
  }
  
  // 创建输出流
  const output = fs.createWriteStream(outputPath);
  const archive = archiver('zip', {
    zlib: { level: 9 } // 最高压缩级别
  });
  
  // 监听事件
  output.on('close', () => {
    const sizeInMB = (archive.pointer() / 1024 / 1024).toFixed(2);
    console.log(`✅ 压缩包创建完成！`);
    console.log(`📊 压缩包大小: ${sizeInMB} MB`);
    console.log(`📄 总文件数: ${archive.pointer()} bytes`);
  });
  
  archive.on('warning', (err) => {
    if (err.code === 'ENOENT') {
      console.warn('⚠️ 警告:', err.message);
    } else {
      throw err;
    }
  });
  
  archive.on('error', (err) => {
    console.error('❌ 压缩过程中出错:', err);
    throw err;
  });
  
  // 连接输出流
  archive.pipe(output);
  
  // 添加构建后的文件
  console.log('📁 添加构建文件...');
  const assetsPath = path.join(distPath, 'assets');
  if (fs.existsSync(assetsPath)) {
    archive.directory(assetsPath, 'assets');
    console.log('  ✓ assets/');
  }
  
  const distIndexPath = path.join(distPath, 'index.html');
  const rootIndexPath = path.join(projectRoot, 'index.html');
  
  if (fs.existsSync(distIndexPath)) {
    archive.file(distIndexPath, { name: 'index.html' });
    console.log('  ✓ index.html (构建版本)');
  } else if (fs.existsSync(rootIndexPath)) {
    archive.file(rootIndexPath, { name: 'index.html' });
    console.log('  ✓ index.html (源文件)');
  }
  
  // 添加核心文件
  console.log('📄 添加核心文件...');
  const coreFiles = [
    'cubeModule.json',
    'vue-app.js',
    'vite.config.js'
  ];
  
  for (const file of coreFiles) {
    const filePath = path.join(projectRoot, file);
    if (fs.existsSync(filePath)) {
      archive.file(filePath, { name: file });
      console.log(`  ✓ ${file}`);
    }
  }
  
  // 添加源代码目录
  console.log('📂 添加源代码目录...');
  const srcPath = path.join(projectRoot, 'src');
  if (fs.existsSync(srcPath)) {
    archive.directory(srcPath, 'src');
    console.log('  ✓ src/');
  }
  
  // 添加组件目录
  const componentsPath = path.join(projectRoot, 'components');
  if (fs.existsSync(componentsPath)) {
    archive.directory(componentsPath, 'components');
    console.log('  ✓ components/');
  }
  
  // 添加 README 文件（如果存在）
  const readmePath = path.join(projectRoot, 'README.md');
  if (fs.existsSync(readmePath)) {
    archive.file(readmePath, { name: 'README.md' });
    console.log('  ✓ README.md');
  }
  
  // 创建简化的 package.json（只包含必要信息）
  const pluginPackageJson = {
    name: packageJson.name,
    version: packageJson.version,
    description: packageJson.description,
    author: packageJson.author,
    main: packageJson.main,
    type: packageJson.type,
    keywords: packageJson.keywords,
    license: packageJson.license
  };
  
  archive.append(JSON.stringify(pluginPackageJson, null, 2), { name: 'package.json' });
  console.log('  ✓ package.json (简化版)');
  
  // 完成压缩
  await archive.finalize();
  
  return outputPath;
}

/**
 * 主函数
 */
async function main() {
  try {
    const zipPath = await createPluginZip();
    console.log(`\n🎉 插件打包完成！`);
    console.log(`📦 压缩包位置: ${zipPath}`);
    console.log(`\n💡 使用方法:`);
    console.log(`   1. 将 ${path.basename(zipPath)} 文件复制到插件目录`);
    console.log(`   2. 在应用中加载该插件`);
  } catch (error) {
    console.error('❌ 打包失败:', error.message);
    process.exit(1);
  }
}

// 运行主函数
main();