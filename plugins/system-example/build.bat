@echo off
REM 系统插件构建脚本 (Windows)
REM 将 Rust 代码编译为 WASM 模块

setlocal enabledelayedexpansion

echo 🔨 Building system plugin...

REM 检查 Rust 是否安装
rustc --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Rust is not installed. Please install Rust first.
    echo    Visit: https://rustup.rs/
    exit /b 1
)

REM 检查 wasm32-unknown-unknown target
rustup target list --installed | findstr "wasm32-unknown-unknown" >nul
if errorlevel 1 (
    echo 📦 Installing wasm32-unknown-unknown target...
    rustup target add wasm32-unknown-unknown
    if errorlevel 1 (
        echo ❌ Failed to install wasm32-unknown-unknown target
        exit /b 1
    )
)

REM 清理之前的构建
echo 🧹 Cleaning previous build...
cargo clean

REM 构建 WASM 模块
echo 🚀 Building WASM module...
cargo build --target wasm32-unknown-unknown --release
if errorlevel 1 (
    echo ❌ Build failed
    exit /b 1
)

REM 检查构建结果
set "WASM_FILE=target\wasm32-unknown-unknown\release\system_example.wasm"
if exist "%WASM_FILE%" (
    REM 复制到插件目录
    copy "%WASM_FILE%" "plugin.wasm" >nul
    
    REM 显示文件信息
    echo ✅ Build successful!
    echo 📁 WASM file: plugin.wasm
    
    REM 显示文件大小
    for %%A in (plugin.wasm) do (
        set "size=%%~zA"
        set /a "sizeKB=!size!/1024"
        echo 📊 File size: !sizeKB! KB
    )
    
    REM 可选：使用 wasm-opt 优化（如果安装了）
    wasm-opt --version >nul 2>&1
    if not errorlevel 1 (
        echo ⚡ Optimizing WASM with wasm-opt...
        wasm-opt -Oz plugin.wasm -o plugin.wasm
        for %%A in (plugin.wasm) do (
            set "size=%%~zA"
            set /a "sizeKB=!size!/1024"
            echo 📊 Optimized size: !sizeKB! KB
        )
    ) else (
        echo 💡 Tip: Install wasm-opt for smaller WASM files
        echo    npm install -g wasm-opt
    )
    
    echo 🎉 Plugin ready for use!
) else (
    echo ❌ Build failed - WASM file not found
    exit /b 1
)

endlocal