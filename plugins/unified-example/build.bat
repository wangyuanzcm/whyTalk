@echo off
chcp 65001 >nul
REM Extism JavaScript PDK Build Script (Windows)
REM Compile JavaScript to WASM using Extism CLI

setlocal enabledelayedexpansion

echo ========================================
echo Extism JavaScript PDK Build Script
echo ========================================

REM Check if extism-js is installed
echo Checking extism-js tool...
where extism-js >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: extism-js tool not found!
    echo Please install Extism JavaScript PDK first:
    echo curl -O https://raw.githubusercontent.com/extism/js-pdk/main/install.sh
    echo bash install.sh
    echo.
    echo Or download precompiled version from GitHub Releases:
    echo https://github.com/extism/js-pdk/releases
    pause
    exit /b 1
)

REM Get extism-js version
for /f "tokens=*" %%i in ('extism-js --version 2^>nul') do set EXTISM_VERSION=%%i
echo extism-js version: %EXTISM_VERSION%

REM Check if wasm-opt is installed (Binaryen tool)
echo Checking wasm-opt tool...
set SKIP_OPT=
where wasm-opt >nul 2>&1
if %errorlevel% neq 0 (
    echo Warning: wasm-opt tool not found!
    echo Binaryen tools may not be installed, will skip WASM optimization
    echo Download from: https://github.com/WebAssembly/binaryen/releases
    set SKIP_OPT=--skip-opt
) else (
    for /f "tokens=*" %%i in ('wasm-opt --version 2^>nul ^| findstr /r "^version"') do set WASM_OPT_VERSION=%%i
    echo wasm-opt tool found: !WASM_OPT_VERSION!
)

REM Clean previous build files
echo Cleaning previous build files...
if exist plugin.wasm del plugin.wasm
if exist plugin.wasm.map del plugin.wasm.map

REM Compile JavaScript to WASM
echo Compiling JavaScript to WASM...
extism-js plugin.js -i plugin.d.ts -o plugin.wasm %SKIP_OPT%

if %errorlevel% neq 0 (
    echo Error: Compilation failed!
    pause
    exit /b 1
)

REM Check generated WASM file
if not exist plugin.wasm (
    echo Error: WASM file not generated!
    pause
    exit /b 1
)

REM Display file information
echo ========================================
echo Build successful!
echo ========================================
for %%i in (plugin.wasm) do echo WASM file size: %%~zi bytes
echo WASM file path: %CD%\plugin.wasm

REM Test plugin (if Extism CLI is installed)
echo.
echo Testing plugin functions...
where extism >nul 2>&1
if %errorlevel% equ 0 (
    echo Testing greet function:
    echo {"name":"Extism"} | extism call plugin.wasm greet --input-stdin --wasi
    echo.
    echo Testing add function:
    echo {"a":10,"b":20} | extism call plugin.wasm add --input-stdin --wasi
    echo.
    echo Testing getPluginInfo function:
    echo {} | extism call plugin.wasm getPluginInfo --input-stdin --wasi
) else (
    echo Note: Extism CLI not installed, cannot test plugin
    echo Download from: https://get.extism.org/cli
)

echo.
echo Build complete! Plugin is ready.
echo You can copy plugin.wasm to the plugin directory for use.

REM Optional: auto copy to parent directory
set /p COPY_CHOICE=Copy plugin.wasm to parent directory? (y/N): 
if /i "%COPY_CHOICE%"=="y" (
    copy plugin.wasm ..\plugin.wasm
    echo Copied plugin.wasm to parent directory
)

echo Done!
pause