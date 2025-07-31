#!/bin/bash

# 系统插件构建脚本
# 将 Rust 代码编译为 WASM 模块

set -e

echo "🔨 Building system plugin..."

# 检查 Rust 和 wasm32 target 是否安装
if ! command -v rustc &> /dev/null; then
    echo "❌ Rust is not installed. Please install Rust first."
    echo "   Visit: https://rustup.rs/"
    exit 1
fi

# 检查 wasm32-unknown-unknown target
if ! rustup target list --installed | grep -q "wasm32-unknown-unknown"; then
    echo "📦 Installing wasm32-unknown-unknown target..."
    rustup target add wasm32-unknown-unknown
fi

# 清理之前的构建
echo "🧹 Cleaning previous build..."
cargo clean

# 构建 WASM 模块
echo "🚀 Building WASM module..."
cargo build --target wasm32-unknown-unknown --release

# 检查构建结果
WASM_FILE="target/wasm32-unknown-unknown/release/system_example.wasm"
if [ -f "$WASM_FILE" ]; then
    # 复制到插件目录
    cp "$WASM_FILE" "plugin.wasm"
    
    # 显示文件信息
    echo "✅ Build successful!"
    echo "📁 WASM file: plugin.wasm"
    echo "📊 File size: $(du -h plugin.wasm | cut -f1)"
    
    # 可选：使用 wasm-opt 优化（如果安装了）
    if command -v wasm-opt &> /dev/null; then
        echo "⚡ Optimizing WASM with wasm-opt..."
        wasm-opt -Oz plugin.wasm -o plugin.wasm
        echo "📊 Optimized size: $(du -h plugin.wasm | cut -f1)"
    else
        echo "💡 Tip: Install wasm-opt for smaller WASM files"
        echo "   npm install -g wasm-opt"
    fi
    
    echo "🎉 Plugin ready for use!"
else
    echo "❌ Build failed - WASM file not found"
    exit 1
fi