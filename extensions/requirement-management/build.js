/**
 * 需求管理插件构建脚本
 * 用于编译TypeScript代码到JavaScript
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * 构建插件
 */
function build() {
    console.log('开始构建需求管理插件...');
    
    try {
        // 检查TypeScript编译器
        try {
            execSync('tsc --version', { stdio: 'ignore' });
        } catch (error) {
            console.log('安装TypeScript编译器...');
            execSync('npm install -g typescript', { stdio: 'inherit' });
        }
        
        // 编译TypeScript
        console.log('编译TypeScript代码...');
        execSync('tsc', { 
            cwd: __dirname,
            stdio: 'inherit'
        });
        
        // 检查输出目录
        const outDir = path.join(__dirname, 'out');
        if (!fs.existsSync(outDir)) {
            console.error('构建失败：输出目录不存在');
            process.exit(1);
        }
        
        // 检查主文件
        const mainFile = path.join(outDir, 'extension.js');
        if (!fs.existsSync(mainFile)) {
            console.error('构建失败：主文件不存在');
            process.exit(1);
        }
        
        console.log('✅ 构建成功！');
        console.log(`输出目录: ${outDir}`);
        
    } catch (error) {
        console.error('❌ 构建失败:', error.message);
        process.exit(1);
    }
}

/**
 * 清理构建输出
 */
function clean() {
    console.log('清理构建输出...');
    
    const outDir = path.join(__dirname, 'out');
    if (fs.existsSync(outDir)) {
        fs.rmSync(outDir, { recursive: true, force: true });
        console.log('✅ 清理完成');
    } else {
        console.log('输出目录不存在，无需清理');
    }
}

/**
 * 监听模式
 */
function watch() {
    console.log('启动监听模式...');
    
    try {
        execSync('tsc --watch', {
            cwd: __dirname,
            stdio: 'inherit'
        });
    } catch (error) {
        console.error('监听模式启动失败:', error.message);
        process.exit(1);
    }
}

/**
 * 显示帮助信息
 */
function showHelp() {
    console.log(`
需求管理插件构建工具

用法:
  node build.js [命令]

命令:
  build    构建插件 (默认)
  clean    清理构建输出
  watch    监听模式构建
  help     显示帮助信息
`);
}

// 主程序
if (require.main === module) {
    const command = process.argv[2] || 'build';
    
    switch (command) {
        case 'build':
            build();
            break;
        case 'clean':
            clean();
            break;
        case 'watch':
            watch();
            break;
        case 'help':
        case '--help':
        case '-h':
            showHelp();
            break;
        default:
            console.error(`未知命令: ${command}`);
            showHelp();
            process.exit(1);
    }
}

module.exports = {
    build,
    clean,
    watch
};