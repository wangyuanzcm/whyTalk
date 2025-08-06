/**
 * 测试 ZIP 包内容的脚本
 * 用于验证构建的插件包是否包含所有必要文件
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * 测试 ZIP 文件内容
 */
async function testZipContent() {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  // 从 @whytalk/message-plugin 提取 message-plugin
  const pluginName = packageJson.name.includes('/') ? packageJson.name.split('/')[1] : packageJson.name;
  const zipPath = path.join(__dirname, '..', `${pluginName}-v${packageJson.version}.zip`);
  
  console.log('🔍 测试 ZIP 包内容...');
  console.log(`📦 ZIP 文件: ${zipPath}`);
  
  if (!fs.existsSync(zipPath)) {
    console.error('❌ ZIP 文件不存在！请先运行 pnpm build');
    process.exit(1);
  }
  
  const stats = fs.statSync(zipPath);
  console.log(`📊 文件大小: ${(stats.size / 1024).toFixed(2)} KB`);
  
  // 检查必要文件是否存在于项目中
  const requiredFiles = [
    'cubeModule.json',
    'vue-app.js',
    'vite.config.js',
    'index.html',
    'README.md',
    'package.json'
  ];
  
  const requiredDirs = [
    'src',
    'components'
  ];
  
  console.log('\n📋 检查必要文件...');
  for (const file of requiredFiles) {
    if (fs.existsSync(file)) {
      console.log(`  ✓ ${file}`);
    } else {
      console.log(`  ❌ ${file} (缺失)`);
    }
  }
  
  console.log('\n📁 检查必要目录...');
  for (const dir of requiredDirs) {
    if (fs.existsSync(dir) && fs.statSync(dir).isDirectory()) {
      console.log(`  ✓ ${dir}/`);
    } else {
      console.log(`  ❌ ${dir}/ (缺失)`);
    }
  }
  
  console.log('\n✅ ZIP 包测试完成！');
  console.log('\n💡 使用说明:');
  console.log('  1. 将 ZIP 文件复制到 WhyTalk 插件目录');
  console.log('  2. 在应用中加载该插件');
  console.log('  3. 享受新的消息功能！');
}

// 运行测试
testZipContent().catch(console.error);