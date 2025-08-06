const fs = require('fs');
const path = require('path');

/**
 * 测试配置验证功能
 */
function testConfigValidation() {
  console.log('🧪 测试 MinIO 配置验证功能...\n');
  
  // 备份原配置文件
  const configPath = path.join(__dirname, '../upload.config.js');
  const backupPath = configPath + '.backup';
  
  if (fs.existsSync(configPath)) {
    fs.copyFileSync(configPath, backupPath);
    console.log('✅ 已备份原配置文件');
  }
  
  try {
    // 创建测试配置（使用默认的无效凭据）
    const testConfig = `module.exports = {
  server: {
    type: 'minio',
    minio: {
      endPoint: '175.178.158.23',
      port: 19000,
      useSSL: false,
      accessKey: 'your-access-key',
      secretKey: 'your-secret-key',
      bucketName: 'electron-updates'
    }
  },
  files: {
    extensions: ['.txt'],
    exclude: []
  },
  behavior: {
    retry: false,
    confirmBeforeUpload: false,
    deleteAfterUpload: false
  },
  logging: {
    verbose: true
  }
};`;
    
    fs.writeFileSync(configPath, testConfig);
    console.log('✅ 已创建测试配置文件');
    
    // 创建测试文件
    const testDir = path.join(__dirname, '../dist');
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }
    
    const testFile = path.join(testDir, 'test-upload.txt');
    fs.writeFileSync(testFile, 'This is a test file for upload validation.');
    console.log('✅ 已创建测试文件');
    
    // 运行上传脚本
    console.log('\n🚀 运行上传脚本进行配置验证测试...\n');
    
    const { spawn } = require('child_process');
    const uploadScript = spawn('node', ['scripts/upload-release.js'], {
      cwd: path.join(__dirname, '..'),
      stdio: 'inherit'
    });
    
    uploadScript.on('close', (code) => {
      console.log(`\n📊 上传脚本退出，退出码: ${code}`);
      
      // 清理测试文件
      if (fs.existsSync(testFile)) {
        fs.unlinkSync(testFile);
        console.log('🗑️  已删除测试文件');
      }
      
      // 恢复原配置文件
      if (fs.existsSync(backupPath)) {
        fs.copyFileSync(backupPath, configPath);
        fs.unlinkSync(backupPath);
        console.log('✅ 已恢复原配置文件');
      }
      
      if (code === 1) {
        console.log('✅ 配置验证功能正常工作（预期的失败）');
      } else {
        console.log('⚠️  配置验证可能存在问题');
      }
    });
    
  } catch (error) {
    console.error('❌ 测试过程中发生错误:', error.message);
    
    // 恢复原配置文件
    if (fs.existsSync(backupPath)) {
      fs.copyFileSync(backupPath, configPath);
      fs.unlinkSync(backupPath);
      console.log('✅ 已恢复原配置文件');
    }
  }
}

// 运行测试
if (require.main === module) {
  testConfigValidation();
}

module.exports = { testConfigValidation };