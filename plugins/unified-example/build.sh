#!/bin/bash
# Extism JavaScript PDK 构建脚本 (Linux/macOS)
# 使用 Extism CLI 将 JavaScript 编译为 WASM

set -e  # 遇到错误时退出

echo "========================================"
echo "Extism JavaScript PDK 构建脚本"
echo "========================================"

# 检查 extism-js 是否已安装
echo "检查 extism-js 工具..."
if ! command -v extism-js &> /dev/null; then
    echo "错误: extism-js 工具未找到！"
    echo "请先安装 Extism JavaScript PDK:"
    echo "curl -O https://raw.githubusercontent.com/extism/js-pdk/main/install.sh"
    echo "bash install.sh"
    exit 1
fi

echo "extism-js 版本: $(extism-js --version)"

# 检查 wasm-opt 是否已安装 (Binaryen 工具)
echo "检查 wasm-opt 工具..."
SKIP_OPT=""
if ! command -v wasm-opt &> /dev/null; then
    echo "警告: wasm-opt 工具未找到！"
    echo "Binaryen 工具可能未安装，将跳过 WASM 优化步骤"
    echo "可以通过以下方式安装:"
    echo "  macOS: brew install binaryen"
    echo "  Linux: 从 https://github.com/WebAssembly/binaryen/releases 下载"
    SKIP_OPT="--skip-opt"
else
    echo "wasm-opt 工具已找到: $(wasm-opt --version | head -n1)"
fi

# 清理之前的构建文件
echo "清理之前的构建文件..."
rm -f plugin.wasm plugin.wasm.map

# 编译 JavaScript 为 WASM
echo "编译 JavaScript 为 WASM..."
extism-js plugin.js -i plugin.d.ts -o plugin.wasm $SKIP_OPT

if [ $? -ne 0 ]; then
    echo "错误: 编译失败！"
    exit 1
fi

# 检查生成的 WASM 文件
if [ ! -f plugin.wasm ]; then
    echo "错误: WASM 文件未生成！"
    exit 1
fi

# 显示文件信息
echo "========================================"
echo "构建成功！"
echo "========================================"
echo "WASM 文件大小: $(du -h plugin.wasm | cut -f1)"
echo "WASM 文件路径: $(pwd)/plugin.wasm"

# 测试插件（如果安装了 Extism CLI）
echo ""
echo "测试插件功能..."
if command -v extism &> /dev/null; then
    echo "测试 greet 函数:"
    echo '{"name":"Extism"}' | extism call plugin.wasm greet --input-stdin --wasi
    echo ""
    echo "测试 add 函数:"
    echo '{"a":10,"b":20}' | extism call plugin.wasm add --input-stdin --wasi
    echo ""
    echo "测试 getPluginInfo 函数:"
    echo '{}' | extism call plugin.wasm getPluginInfo --input-stdin --wasi
else
    echo "注意: Extism CLI 未安装，无法测试插件"
    echo "可以通过以下方式安装 Extism CLI:"
    echo "curl -O https://get.extism.org/cli | sh"
fi

echo ""
echo "构建完成！插件已准备就绪。"
echo "可以将 plugin.wasm 文件复制到插件目录中使用。"

# 可选：自动复制到上级目录
read -p "是否将 plugin.wasm 复制到上级目录？(y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    cp plugin.wasm ../plugin.wasm
    echo "已复制 plugin.wasm 到上级目录"
fi

echo "完成！"