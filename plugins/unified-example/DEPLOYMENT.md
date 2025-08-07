# 部署指南 (Deployment Guide)

本文档详细说明了如何部署统一插件示例到 Why Talk 系统中。

## 📋 前置要求

### 1. 安装 Extism JavaScript PDK

#### Windows 系统

**方法一：使用 PowerShell 安装**
```powershell
# 以管理员身份运行 PowerShell
Invoke-WebRequest -Uri "https://raw.githubusercontent.com/extism/js-pdk/main/install-windows.ps1" -OutFile "install-windows.ps1"
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process
.\install-windows.ps1
```

**方法二：手动下载安装**
1. 访问 [Extism JS PDK Releases](https://github.com/extism/js-pdk/releases)
2. 下载最新的 Windows 版本 (extism-js-windows-x64.zip)
3. 解压到 `C:\Program Files\Extism`
4. 将 `C:\Program Files\Extism` 添加到系统 PATH 环境变量

#### Linux/macOS 系统

```bash
# 下载并运行安装脚本
curl -O https://raw.githubusercontent.com/extism/js-pdk/main/install.sh
bash install.sh

# 添加到 PATH (如果需要)
echo 'export PATH="$HOME/.extism/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

### 2. 安装 Binaryen (可选，用于优化)

#### Windows
1. 访问 [Binaryen Releases](https://github.com/WebAssembly/binaryen/releases)
2. 下载 Windows 版本
3. 解压并添加到 PATH

#### macOS
```bash
brew install binaryen
```

#### Linux
```bash
# Ubuntu/Debian
sudo apt-get install binaryen

# 或从源码编译
git clone https://github.com/WebAssembly/binaryen.git
cd binaryen
cmake . && make
```

### 3. 验证安装

```bash
# 检查 Extism JS PDK
extism-js --version

# 检查 Binaryen (可选)
wasm-opt --version
```

## 🔨 构建插件

### 自动构建

#### Windows
```cmd
# 在插件目录中运行
.\build.bat
```

#### Linux/macOS
```bash
# 给脚本执行权限
chmod +x build.sh

# 运行构建脚本
./build.sh
```

### 手动构建

```bash
# 基本编译
extism-js plugin.js -i plugin.d.ts -o plugin.wasm

# 带优化的编译
extism-js plugin.js -i plugin.d.ts -o plugin.wasm
wasm-opt -Oz plugin.wasm -o plugin.wasm
```

### 构建选项说明

- `-i plugin.d.ts`: 指定 TypeScript 接口定义文件
- `-o plugin.wasm`: 指定输出的 WASM 文件名
- `--debug`: 启用调试模式
- `--optimize`: 启用基本优化

## 📦 部署到 Why Talk

### 1. 准备插件文件

确保以下文件存在且正确：
```
unified-example/
├── cubeModule.json     # 插件配置文件
├── index.html          # 前端界面
├── plugin.wasm         # 编译后的 WASM 文件
├── README.md           # 说明文档
└── DEPLOYMENT.md       # 本部署指南
```

### 2. 复制到插件目录

```bash
# 复制整个插件目录到 Why Talk 的 plugins 目录
cp -r unified-example /path/to/why-talk/plugins/

# Windows
xcopy unified-example "C:\Program Files\Why Talk\plugins\unified-example" /E /I
```

### 3. 重启 Why Talk

重启 Why Talk 应用以加载新插件。

### 4. 启用插件

1. 打开 Why Talk 应用
2. 进入插件管理界面
3. 找到 "统一插件示例"
4. 点击启用按钮

## 🧪 测试插件

### 1. 功能测试

在 Why Talk 中打开插件界面，测试以下功能：

- **数学计算**: 测试加减乘除运算
- **文本处理**: 测试大小写转换和文本反转
- **插件信息**: 获取插件详细信息

### 2. API 测试

如果有 Extism CLI，可以直接测试 WASM 文件：

```bash
# 测试数学计算
echo '{"operation":"add","a":10,"b":20}' | extism call plugin.wasm calculate --input-stdin --wasi

# 测试文本处理
echo '{"text":"Hello World","operation":"uppercase"}' | extism call plugin.wasm processText --input-stdin --wasi
```

## 🔧 故障排除

### 常见问题

#### 1. extism-js 命令未找到

**解决方案:**
- 确保 Extism JavaScript PDK 已正确安装
- 检查 PATH 环境变量是否包含 Extism 安装目录
- 重启终端或命令提示符

#### 2. 编译失败

**可能原因:**
- JavaScript 语法错误
- TypeScript 接口定义不匹配
- 使用了不支持的 Node.js API

**解决方案:**
- 检查 JavaScript 代码语法
- 确保所有导出函数都在 TypeScript 定义中声明
- 避免使用 Node.js 特定的 API

#### 3. WASM 文件过大

**解决方案:**
- 使用 `wasm-opt` 进行优化
- 减少不必要的依赖
- 简化代码逻辑

#### 4. 插件无法加载

**检查项:**
- `cubeModule.json` 配置文件格式是否正确
- WASM 文件是否存在且有效
- 插件目录结构是否正确
- Why Talk 是否有足够的权限访问插件文件

### 调试技巧

#### 1. 启用详细日志

```bash
# 编译时启用调试模式
extism-js plugin.js -i plugin.d.ts -o plugin.wasm --debug
```

#### 2. 检查 WASM 文件

```bash
# 查看 WASM 文件信息
wasm-objdump -h plugin.wasm

# 反汇编 WASM 文件
wasm2wat plugin.wasm
```

#### 3. 测试单个函数

```bash
# 测试特定函数
echo '{"test":"data"}' | extism call plugin.wasm functionName --input-stdin --wasi
```

## 📈 性能优化

### 1. WASM 优化

```bash
# 使用不同的优化级别
wasm-opt -O1 plugin.wasm -o plugin.wasm  # 基本优化
wasm-opt -O2 plugin.wasm -o plugin.wasm  # 标准优化
wasm-opt -O3 plugin.wasm -o plugin.wasm  # 激进优化
wasm-opt -Oz plugin.wasm -o plugin.wasm  # 大小优化
```

### 2. 代码优化建议

- 避免使用大型 JavaScript 库
- 最小化内存分配
- 使用高效的算法
- 减少字符串操作

### 3. 缓存策略

- 缓存计算结果
- 避免重复的 JSON 解析
- 使用适当的数据结构

## 🔄 更新插件

### 1. 更新代码

1. 修改 `plugin.js` 中的代码
2. 更新 `plugin.d.ts` 中的类型定义
3. 重新编译 WASM 文件

### 2. 更新配置

1. 修改 `cubeModule.json` 中的版本号
2. 更新功能描述和参数定义
3. 添加新的权限要求（如果需要）

### 3. 重新部署

1. 停止 Why Talk 应用
2. 替换插件文件
3. 重启应用
4. 验证更新是否成功

## 📚 参考资源

- [Extism 官方文档](https://extism.org/docs/)
- [JavaScript PDK 文档](https://github.com/extism/js-pdk)
- [WebAssembly 规范](https://webassembly.github.io/spec/)
- [Why Talk 插件开发指南](https://github.com/your-org/why-talk/docs/plugins)

## 🆘 获取帮助

如果遇到问题，可以通过以下方式获取帮助：

1. 查看 [Why Talk 文档](https://github.com/your-org/why-talk)
2. 提交 [Issue](https://github.com/your-org/why-talk/issues)
3. 加入 [Discord 社区](https://discord.gg/your-server)
4. 查看 [Extism 社区](https://discord.gg/cx3usBCWnc)

---

**注意**: 本指南假设您已经熟悉基本的命令行操作和 JavaScript 开发。如果您是初学者，建议先学习相关基础知识。