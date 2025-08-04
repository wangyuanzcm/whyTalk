#!/usr/bin/env node

// 插件开发工具
// 提供插件创建、构建、测试、打包等功能

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class PluginDevTools {
    constructor() {
        this.pluginsDir = path.join(__dirname, 'plugins');
        this.templatesDir = path.join(__dirname, 'plugin-templates');
    }

    // 创建新的前端插件
    createFrontendPlugin(name, options = {}) {
        console.log(`🎨 Creating frontend plugin: ${name}`);
        
        const pluginDir = path.join(this.pluginsDir, name);
        
        if (fs.existsSync(pluginDir)) {
            throw new Error(`Plugin directory already exists: ${pluginDir}`);
        }
        
        fs.mkdirSync(pluginDir, { recursive: true });
        
        // 创建 cubeModule.json
        const config = {
            name,
            version: options.version || '1.0.0',
            description: options.description || `Frontend plugin: ${name}`,
            author: options.author || 'Why-Talk Developer',
            main: 'index.html',
            permissions: options.permissions || ['storage', 'notifications'],
            dependencies: options.dependencies || {}
        };
        
        fs.writeFileSync(
            path.join(pluginDir, 'cubeModule.json'),
            JSON.stringify(config, null, 2)
        );
        
        // 创建基础 HTML 文件
        const htmlContent = this.generateFrontendHTML(name, config.description);
        fs.writeFileSync(path.join(pluginDir, 'index.html'), htmlContent);
        
        // 创建基础 CSS 文件
        const cssContent = this.generateFrontendCSS();
        fs.writeFileSync(path.join(pluginDir, 'style.css'), cssContent);
        
        // 创建基础 JS 文件
        const jsContent = this.generateFrontendJS(name);
        fs.writeFileSync(path.join(pluginDir, 'script.js'), jsContent);
        
        console.log(`✅ Frontend plugin created: ${pluginDir}`);
        return pluginDir;
    }

    // 创建新的系统插件
    createSystemPlugin(name, options = {}) {
        console.log(`⚙️ Creating system plugin: ${name}`);
        
        const pluginDir = path.join(this.pluginsDir, name);
        
        if (fs.existsSync(pluginDir)) {
            throw new Error(`Plugin directory already exists: ${pluginDir}`);
        }
        
        fs.mkdirSync(pluginDir, { recursive: true });
        fs.mkdirSync(path.join(pluginDir, 'src'), { recursive: true });
        
        // 创建 cubeModule.json
        const config = {
            name,
            version: options.version || '1.0.0',
            description: options.description || `System plugin: ${name}`,
            author: options.author || 'Why-Talk Developer',
            type: 'system',
            main: 'plugin.wasm',
            permissions: options.permissions || ['filesystem.read', 'system'],
            exports: options.exports || ['main_function'],
            config: {
                memory_limit: '10MB',
                timeout: 30000,
                allowed_hosts: []
            }
        };
        
        fs.writeFileSync(
            path.join(pluginDir, 'cubeModule.json'),
            JSON.stringify(config, null, 2)
        );
        
        // 创建 Cargo.toml
        const cargoContent = this.generateCargoToml(name, config.description);
        fs.writeFileSync(path.join(pluginDir, 'Cargo.toml'), cargoContent);
        
        // 创建基础 Rust 文件
        const rustContent = this.generateRustCode(name);
        fs.writeFileSync(path.join(pluginDir, 'src', 'lib.rs'), rustContent);
        
        // 创建构建脚本
        const buildScript = this.generateBuildScript();
        fs.writeFileSync(path.join(pluginDir, 'build.sh'), buildScript);
        fs.writeFileSync(path.join(pluginDir, 'build.bat'), this.generateBuildScriptWindows());
        
        // 设置执行权限 (Unix系统)
        try {
            fs.chmodSync(path.join(pluginDir, 'build.sh'), '755');
        } catch (e) {
            // Windows 系统忽略权限设置错误
        }
        
        console.log(`✅ System plugin created: ${pluginDir}`);
        return pluginDir;
    }

    // 构建系统插件
    buildSystemPlugin(pluginName) {
        console.log(`🔨 Building system plugin: ${pluginName}`);
        
        const pluginDir = path.join(this.pluginsDir, pluginName);
        
        if (!fs.existsSync(pluginDir)) {
            throw new Error(`Plugin not found: ${pluginDir}`);
        }
        
        const configPath = path.join(pluginDir, 'cubeModule.json');
        if (!fs.existsSync(configPath)) {
            throw new Error(`Plugin config not found: ${configPath}`);
        }
        
        const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        if (config.type !== 'system') {
            throw new Error(`Not a system plugin: ${pluginName}`);
        }
        
        // 执行构建脚本
        const buildScript = process.platform === 'win32' ? 'build.bat' : 'build.sh';
        const buildPath = path.join(pluginDir, buildScript);
        
        if (!fs.existsSync(buildPath)) {
            throw new Error(`Build script not found: ${buildPath}`);
        }
        
        try {
            const command = process.platform === 'win32' ? buildPath : `bash ${buildPath}`;
            execSync(command, { cwd: pluginDir, stdio: 'inherit' });
            console.log(`✅ System plugin built successfully: ${pluginName}`);
        } catch (error) {
            throw new Error(`Build failed: ${error.message}`);
        }
    }

    // 验证插件
    validatePlugin(pluginName) {
        console.log(`🔍 Validating plugin: ${pluginName}`);
        
        const pluginDir = path.join(this.pluginsDir, pluginName);
        const configPath = path.join(pluginDir, 'cubeModule.json');
        
        if (!fs.existsSync(configPath)) {
            throw new Error(`Plugin config not found: ${configPath}`);
        }
        
        const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        const errors = [];
        
        // 验证必需字段
        const requiredFields = ['name', 'version', 'description', 'main'];
        requiredFields.forEach(field => {
            if (!config[field]) {
                errors.push(`Missing required field: ${field}`);
            }
        });
        
        // 验证主文件是否存在
        const mainFile = path.join(pluginDir, config.main);
        if (!fs.existsSync(mainFile)) {
            errors.push(`Main file not found: ${config.main}`);
        }
        
        // 验证系统插件特定要求
        if (config.type === 'system') {
            if (!config.exports || config.exports.length === 0) {
                errors.push('System plugin must define exports');
            }
            
            if (config.main.endsWith('.wasm') && !fs.existsSync(mainFile)) {
                errors.push('WASM file not found - run build script first');
            }
        }
        
        if (errors.length > 0) {
            console.log('❌ Validation failed:');
            errors.forEach(error => console.log(`  - ${error}`));
            return false;
        }
        
        console.log(`✅ Plugin validation passed: ${pluginName}`);
        return true;
    }

    // 列出所有插件
    listPlugins() {
        console.log('📋 Installed plugins:');
        
        if (!fs.existsSync(this.pluginsDir)) {
            console.log('  No plugins directory found');
            return [];
        }
        
        const plugins = [];
        const entries = fs.readdirSync(this.pluginsDir);
        
        entries.forEach(entry => {
            const pluginDir = path.join(this.pluginsDir, entry);
            const configPath = path.join(pluginDir, 'cubeModule.json');
            
            if (fs.statSync(pluginDir).isDirectory() && fs.existsSync(configPath)) {
                try {
                    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
                    plugins.push({
                        name: config.name,
                        version: config.version,
                        type: config.type || 'frontend',
                        description: config.description
                    });
                    
                    const typeIcon = config.type === 'system' ? '⚙️' : '🎨';
                    console.log(`  ${typeIcon} ${config.name} (${config.version}) - ${config.description}`);
                } catch (error) {
                    console.log(`  ❌ ${entry} - Invalid config`);
                }
            }
        });
        
        return plugins;
    }

    // 生成前端插件 HTML
    generateFrontendHTML(name, description) {
        return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${name}</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div id="app">
        <header class="plugin-header">
            <h1>🚀 ${name}</h1>
            <p class="plugin-description">${description}</p>
        </header>
        
        <main class="plugin-content">
            <section class="feature-section">
                <h2>📋 插件信息</h2>
                <div id="plugin-info" class="info-card">
                    <p>加载中...</p>
                </div>
            </section>
            
            <section class="feature-section">
                <h2>🔧 插件功能</h2>
                <div class="button-group">
                    <button id="test-btn" class="action-btn primary">测试功能</button>
                </div>
                <div id="result" class="result-display"></div>
            </section>
        </main>
        
        <footer class="plugin-footer">
            <p>© 2024 Why-Talk Plugin System</p>
        </footer>
    </div>
    
    <script src="script.js"></script>
</body>
</html>`;
    }

    // 生成前端插件 CSS
    generateFrontendCSS() {
        return `/* ${new Date().getFullYear()} Why-Talk Plugin Styles */

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: #333;
    line-height: 1.6;
    min-height: 100vh;
}

#app {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

.plugin-header {
    text-align: center;
    margin-bottom: 30px;
    padding: 30px;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 15px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.plugin-header h1 {
    font-size: 2.5em;
    margin-bottom: 10px;
    background: linear-gradient(45deg, #667eea, #764ba2);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.feature-section {
    background: rgba(255, 255, 255, 0.95);
    padding: 25px;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
}

.action-btn {
    padding: 10px 20px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.2s ease;
}

.action-btn.primary {
    background: linear-gradient(45deg, #667eea, #764ba2);
    color: white;
}

.result-display {
    margin-top: 15px;
    padding: 12px;
    background: #f8f9fa;
    border-radius: 6px;
    border-left: 4px solid #28a745;
    font-family: monospace;
    font-size: 13px;
}`;
    }

    // 生成前端插件 JavaScript
    generateFrontendJS(name) {
        return `// ${name} Plugin Script

if (typeof window.pluginAPI === 'undefined') {
    console.error('Plugin API not available');
    document.body.innerHTML = '<div style="padding: 20px; text-align: center; color: red;">插件API不可用</div>';
} else {
    console.log('Plugin API available');
    initializePlugin();
}

async function initializePlugin() {
    try {
        // 加载插件信息
        const info = await window.pluginAPI.getPluginInfo();
        const infoElement = document.getElementById('plugin-info');
        
        infoElement.innerHTML = \`
            <div><strong>名称:</strong> \${info.name}</div>
            <div><strong>版本:</strong> \${info.version}</div>
            <div><strong>描述:</strong> \${info.description}</div>
        \`;
        
        // 初始化事件监听器
        document.getElementById('test-btn').addEventListener('click', async () => {
            try {
                await window.pluginAPI.showNotification({
                    title: '${name}',
                    body: '插件功能测试成功！',
                    icon: 'info'
                });
                
                document.getElementById('result').textContent = '测试成功！';
            } catch (error) {
                document.getElementById('result').textContent = \`错误: \${error.message}\`;
            }
        });
        
        console.log('Plugin initialized successfully');
    } catch (error) {
        console.error('Failed to initialize plugin:', error);
    }
}

window.addEventListener('error', (event) => {
    console.error('Plugin error:', event.error);
});`;
    }

    // 生成 Cargo.toml
    generateCargoToml(name, description) {
        return `[package]
name = "${name.replace(/-/g, '_')}"
version = "1.0.0"
edition = "2021"
authors = ["Why-Talk Developer"]
description = "${description}"

[lib]
crate-type = ["cdylib"]

[dependencies]
extism-pdk = "1.0"
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"

[profile.release]
opt-level = "s"
lto = true
codegen-units = 1
panic = "abort"`;
    }

    // 生成 Rust 代码
    generateRustCode(name) {
        return `use extism_pdk::*;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
struct PluginInput {
    message: String,
}

#[derive(Serialize, Deserialize, Debug)]
struct PluginOutput {
    result: String,
    timestamp: u64,
}

#[plugin_fn]
pub fn main_function(input: String) -> FnResult<String> {
    let input_data: PluginInput = match serde_json::from_str(&input) {
        Ok(data) => data,
        Err(e) => {
            return Ok(format!("{{\"error\": \"Failed to parse input: {}\"}}", e));
        }
    };
    
    let output = PluginOutput {
        result: format!("Hello from ${name}! Received: {}", input_data.message),
        timestamp: std::time::SystemTime::now()
            .duration_since(std::time::UNIX_EPOCH)
            .unwrap()
            .as_secs(),
    };
    
    match serde_json::to_string(&output) {
        Ok(json) => Ok(json),
        Err(e) => Ok(format!("{{\"error\": \"Failed to serialize output: {}\"}}", e)),
    }
}`;
    }

    // 生成构建脚本
    generateBuildScript() {
        return `#!/bin/bash
set -e

echo "🔨 Building WASM plugin..."

if ! command -v rustc &> /dev/null; then
    echo "❌ Rust is not installed"
    exit 1
fi

if ! rustup target list --installed | grep -q "wasm32-unknown-unknown"; then
    echo "📦 Installing wasm32-unknown-unknown target..."
    rustup target add wasm32-unknown-unknown
fi

echo "🚀 Building..."
cargo build --target wasm32-unknown-unknown --release

WASM_FILE="target/wasm32-unknown-unknown/release/\$(basename \$(pwd) | tr '-' '_').wasm"
if [ -f "$WASM_FILE" ]; then
    cp "$WASM_FILE" "plugin.wasm"
    echo "✅ Build successful: plugin.wasm"
else
    echo "❌ Build failed"
    exit 1
fi`;
    }

    // 生成 Windows 构建脚本
    generateBuildScriptWindows() {
        return `@echo off
echo 🔨 Building WASM plugin...

rustc --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Rust is not installed
    exit /b 1
)

rustup target list --installed | findstr "wasm32-unknown-unknown" >nul
if errorlevel 1 (
    echo 📦 Installing wasm32-unknown-unknown target...
    rustup target add wasm32-unknown-unknown
)

echo 🚀 Building...
cargo build --target wasm32-unknown-unknown --release
if errorlevel 1 (
    echo ❌ Build failed
    exit /b 1
)

for %%f in (target\\wasm32-unknown-unknown\\release\\*.wasm) do (
    copy "%%f" "plugin.wasm" >nul
    echo ✅ Build successful: plugin.wasm
    goto :done
)

echo ❌ WASM file not found
exit /b 1

:done`;
    }
}

// 命令行接口
function main() {
    const args = process.argv.slice(2);
    const command = args[0];
    const tools = new PluginDevTools();
    
    try {
        switch (command) {
            case 'create-frontend':
                if (!args[1]) {
                    console.error('Usage: node plugin-dev-tools.js create-frontend <name>');
                    process.exit(1);
                }
                tools.createFrontendPlugin(args[1]);
                break;
                
            case 'create-system':
                if (!args[1]) {
                    console.error('Usage: node plugin-dev-tools.js create-system <name>');
                    process.exit(1);
                }
                tools.createSystemPlugin(args[1]);
                break;
                
            case 'build':
                if (!args[1]) {
                    console.error('Usage: node plugin-dev-tools.js build <plugin-name>');
                    process.exit(1);
                }
                tools.buildSystemPlugin(args[1]);
                break;
                
            case 'validate':
                if (!args[1]) {
                    console.error('Usage: node plugin-dev-tools.js validate <plugin-name>');
                    process.exit(1);
                }
                tools.validatePlugin(args[1]);
                break;
                
            case 'list':
                tools.listPlugins();
                break;
                
            default:
                console.log('Why-Talk Plugin Development Tools');
                console.log('');
                console.log('Usage:');
                console.log('  node plugin-dev-tools.js create-frontend <name>  - Create a new frontend plugin');
                console.log('  node plugin-dev-tools.js create-system <name>    - Create a new system plugin');
                console.log('  node plugin-dev-tools.js build <plugin-name>     - Build a system plugin');
                console.log('  node plugin-dev-tools.js validate <plugin-name> - Validate a plugin');
                console.log('  node plugin-dev-tools.js list                   - List all plugins');
                break;
        }
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

if (require.main === module) {
    main();
}

module.exports = { PluginDevTools };