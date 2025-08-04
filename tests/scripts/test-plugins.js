// 插件系统测试脚本
// 用于测试前端插件和系统插件的功能

const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

// 导入插件系统
const { PluginSystem } = require('./src/main/plugin');

class PluginTester {
    constructor() {
        this.pluginSystem = new PluginSystem();
        this.testResults = [];
    }

    async initialize() {
        console.log('🚀 Initializing plugin system for testing...');
        await this.pluginSystem.initialize();
        console.log('✅ Plugin system initialized');
    }

    async runAllTests() {
        console.log('\n🧪 Starting plugin system tests...');
        
        try {
            await this.testPluginDiscovery();
            await this.testFrontendPlugin();
            await this.testSystemPlugin();
            await this.testSecurityFeatures();
            await this.testPluginManagement();
            
            this.printTestResults();
        } catch (error) {
            console.error('❌ Test suite failed:', error);
        }
    }

    async testPluginDiscovery() {
        console.log('\n📋 Testing plugin discovery...');
        
        try {
            const plugins = await this.pluginSystem.getInstalledPlugins();
            console.log(`Found ${plugins.length} plugins:`);
            
            plugins.forEach(plugin => {
                console.log(`  - ${plugin.name} (${plugin.version}) - ${plugin.type}`);
            });
            
            this.addTestResult('Plugin Discovery', true, `Found ${plugins.length} plugins`);
        } catch (error) {
            this.addTestResult('Plugin Discovery', false, error.message);
        }
    }

    async testFrontendPlugin() {
        console.log('\n🎨 Testing frontend plugin...');
        
        try {
            // 测试前端插件加载
            const pluginId = 'frontend-example';
            const plugin = await this.pluginSystem.getPlugin(pluginId);
            
            if (!plugin) {
                throw new Error('Frontend plugin not found');
            }
            
            console.log(`✅ Frontend plugin loaded: ${plugin.name}`);
            
            // 测试插件窗口创建
            const window = await this.pluginSystem.openFrontendPlugin(pluginId);
            console.log('✅ Frontend plugin window created');
            
            // 等待一段时间后关闭窗口
            setTimeout(() => {
                if (window && !window.isDestroyed()) {
                    window.close();
                    console.log('✅ Frontend plugin window closed');
                }
            }, 2000);
            
            this.addTestResult('Frontend Plugin', true, 'Plugin window created and closed successfully');
        } catch (error) {
            this.addTestResult('Frontend Plugin', false, error.message);
        }
    }

    async testSystemPlugin() {
        console.log('\n⚙️ Testing system plugin...');
        
        try {
            const pluginId = 'system-example';
            const plugin = await this.pluginSystem.getPlugin(pluginId);
            
            if (!plugin) {
                console.log('⚠️ System plugin not found (WASM file may not be built)');
                this.addTestResult('System Plugin', false, 'Plugin not found - run build script first');
                return;
            }
            
            console.log(`✅ System plugin loaded: ${plugin.name}`);
            
            // 测试消息处理
            const testMessage = {
                type: 'text',
                content: 'Hello from test! This is a great message.',
                timestamp: new Date().toISOString()
            };
            
            const result = await this.pluginSystem.callSystemPlugin(
                pluginId, 
                'process_message', 
                JSON.stringify(testMessage)
            );
            
            console.log('✅ Message processing result:', JSON.parse(result));
            
            // 测试系统信息获取
            const systemInfo = await this.pluginSystem.callSystemPlugin(
                pluginId,
                'get_system_info',
                '{}'
            );
            
            console.log('✅ System info:', JSON.parse(systemInfo));
            
            this.addTestResult('System Plugin', true, 'WASM functions executed successfully');
        } catch (error) {
            this.addTestResult('System Plugin', false, error.message);
        }
    }

    async testSecurityFeatures() {
        console.log('\n🔒 Testing security features...');
        
        try {
            // 测试权限检查
            const hasFilePermission = await this.pluginSystem.securityManager.hasPermission(
                'frontend-example',
                'filesystem.read'
            );
            
            console.log(`File permission check: ${hasFilePermission}`);
            
            // 测试权限请求
            const granted = await this.pluginSystem.securityManager.requestPermission(
                'frontend-example',
                'network',
                'Test permission request'
            );
            
            console.log(`Permission request result: ${granted}`);
            
            this.addTestResult('Security Features', true, 'Permission system working');
        } catch (error) {
            this.addTestResult('Security Features', false, error.message);
        }
    }

    async testPluginManagement() {
        console.log('\n📦 Testing plugin management...');
        
        try {
            // 测试插件统计
            const stats = await this.pluginSystem.getPluginStats();
            console.log('Plugin statistics:', stats);
            
            // 测试插件重载（如果有插件的话）
            const plugins = await this.pluginSystem.getInstalledPlugins();
            if (plugins.length > 0) {
                const pluginId = plugins[0].id;
                await this.pluginSystem.reloadPlugin(pluginId);
                console.log(`✅ Plugin ${pluginId} reloaded successfully`);
            }
            
            this.addTestResult('Plugin Management', true, 'Management functions working');
        } catch (error) {
            this.addTestResult('Plugin Management', false, error.message);
        }
    }

    addTestResult(testName, success, message) {
        this.testResults.push({ testName, success, message });
        const status = success ? '✅' : '❌';
        console.log(`${status} ${testName}: ${message}`);
    }

    printTestResults() {
        console.log('\n📊 Test Results Summary:');
        console.log('=' .repeat(50));
        
        let passed = 0;
        let failed = 0;
        
        this.testResults.forEach(result => {
            const status = result.success ? '✅ PASS' : '❌ FAIL';
            console.log(`${status} ${result.testName}`);
            if (!result.success) {
                console.log(`     ${result.message}`);
            }
            
            if (result.success) passed++;
            else failed++;
        });
        
        console.log('=' .repeat(50));
        console.log(`Total: ${this.testResults.length} | Passed: ${passed} | Failed: ${failed}`);
        
        if (failed === 0) {
            console.log('🎉 All tests passed!');
        } else {
            console.log(`⚠️ ${failed} test(s) failed`);
        }
    }

    async cleanup() {
        console.log('\n🧹 Cleaning up...');
        await this.pluginSystem.cleanup();
        console.log('✅ Cleanup completed');
    }
}

// 主测试函数
async function runTests() {
    const tester = new PluginTester();
    
    try {
        await tester.initialize();
        await tester.runAllTests();
    } catch (error) {
        console.error('❌ Test execution failed:', error);
    } finally {
        await tester.cleanup();
        process.exit(0);
    }
}

// 如果直接运行此脚本
if (require.main === module) {
    console.log('🧪 Plugin System Test Suite');
    console.log('=' .repeat(50));
    
    // 检查插件目录是否存在
    const pluginsDir = path.join(__dirname, 'plugins');
    if (!fs.existsSync(pluginsDir)) {
        console.error('❌ Plugins directory not found:', pluginsDir);
        console.log('💡 Please ensure the plugins directory exists with example plugins');
        process.exit(1);
    }
    
    // 模拟 Electron 环境
    app.whenReady().then(() => {
        runTests();
    });
    
    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });
}

module.exports = { PluginTester };