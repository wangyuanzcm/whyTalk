# 统一插件示例 (Unified Plugin Example)

这是一个展示 Why Talk 统一插件架构的完整示例，演示了如何使用 **Extism JavaScript PDK** 创建一个同时支持 WASM 后台能力和前端 UI 的插件。

## 🌟 功能特性

### 后台能力 (WASM)
- **数学计算**: 支持基本四则运算 (加减乘除)
- **文本处理**: 大小写转换、文本反转
- **高级功能**: 阶乘计算、斐波那契数列生成
- **文本统计**: 字符、单词、行数统计
- **插件信息**: 获取插件详细信息和健康状态

### 前端界面
- **现代化 UI**: 响应式设计，支持多种屏幕尺寸
- **实时交互**: 即时调用后台能力并显示结果
- **错误处理**: 完善的错误提示和状态反馈
- **功能演示**: 直观展示各种插件能力

## 📁 文件结构

```
unified-example/
├── cubeModule.json     # 插件配置文件
├── index.html          # 前端界面
├── plugin.js           # JavaScript 插件源代码
├── plugin.d.ts         # TypeScript 类型定义
├── build.bat           # Windows 构建脚本
├── build.sh            # Linux/macOS 构建脚本
├── README.md           # 说明文档
└── plugin.wasm         # 编译后的 WASM 文件 (构建后生成)
```

## 🚀 快速开始

### 前置要求

**安装 Extism JavaScript PDK:**
```bash
# Linux/macOS
curl -O https://raw.githubusercontent.com/extism/js-pdk/main/install.sh
bash install.sh

# Windows (使用 Git Bash 或 WSL)
curl -O https://raw.githubusercontent.com/extism/js-pdk/main/install.sh
bash install.sh

# 或者从 GitHub Releases 下载预编译版本
# https://github.com/extism/js-pdk/releases
```

**可选：安装 Binaryen 用于优化**
```bash
# macOS
brew install binaryen

# Linux
# 从 https://github.com/WebAssembly/binaryen/releases 下载

# Windows
# 从 https://github.com/WebAssembly/binaryen/releases 下载
```

### 构建插件

#### Windows
```cmd
# 运行构建脚本
build.bat
```

#### Linux/macOS
```bash
# 给脚本执行权限
chmod +x build.sh

# 运行构建脚本
./build.sh
```

#### 手动构建
```bash
# 编译 JavaScript 为 WASM
extism-js plugin.js -i plugin.d.ts -o plugin.wasm

# 可选：优化 WASM 文件
wasm-opt -Oz plugin.wasm -o plugin.wasm
```

### 安装插件

1. 确保构建成功，生成了 `plugin.wasm` 文件
2. 将整个 `unified-example` 文件夹复制到 Why Talk 的 `plugins` 目录
3. 重启 Why Talk 应用
4. 在插件管理界面中启用 "统一插件示例"

## 🔧 开发指南

### 插件配置 (cubeModule.json)

```json
{
  "name": "unified-example",
  "version": "1.0.0",
  "type": "unified",
  "main": "plugin.wasm",
  "frontend": {
    "entry": "index.html",
    "title": "统一插件示例"
  },
  "capabilities": [
    {
      "id": "calculate",
      "name": "数学计算",
      "function": "calculate"
    }
  ]
}
```

### 后台能力开发 (plugin.js)

使用 Extism JavaScript PDK 开发 WASM 插件:

```javascript
/**
 * 数学计算函数
 * @param {Object} req - 请求参数 {operation: string, a: number, b: number}
 * @returns {Object} 计算结果
 */
function calculate() {
    const input = Host.inputString();
    const req = JSON.parse(input);
    
    let result;
    switch (req.operation) {
        case 'add':
            result = req.a + req.b;
            break;
        case 'subtract':
            result = req.a - req.b;
            break;
        case 'multiply':
            result = req.a * req.b;
            break;
        case 'divide':
            result = req.b !== 0 ? req.a / req.b : null;
            break;
        default:
            throw new Error('不支持的运算类型');
    }
    
    const response = {
        success: true,
        result: result,
        error: null
    };
    
    Host.outputString(JSON.stringify(response));
}

module.exports = { calculate };
```

### 前端界面开发 (index.html)

通过 `window.electronAPI` 调用插件能力:

```javascript
/**
 * 调用插件计算能力
 * @param {string} operation - 运算类型
 * @param {number} a - 第一个操作数
 * @param {number} b - 第二个操作数
 */
async function callCalculate(operation, a, b) {
    try {
        const result = await window.electronAPI.invokeCapability('unified-example.calculate', {
            operation: operation,
            a: a,
            b: b
        });
        
        if (result.success) {
            console.log('计算结果:', result.result);
            return result.result;
        } else {
            console.error('计算失败:', result.error);
            throw new Error(result.error);
        }
    } catch (error) {
        console.error('调用插件失败:', error);
        throw error;
    }
}
```

## 📚 API 参考

### 数学计算 (calculate)

**参数:**
- `operation`: 运算类型 (`"add"`, `"subtract"`, `"multiply"`, `"divide"`)
- `a`: 第一个操作数 (number)
- `b`: 第二个操作数 (number)

**返回:**
```json
{
  "success": true,
  "result": 15,
  "error": null
}
```

### 文本处理 (processText)

**参数:**
- `text`: 要处理的文本 (string)
- `operation`: 处理类型 (`"uppercase"`, `"lowercase"`, `"reverse"`)

**返回:**
```json
{
  "success": true,
  "result": "HELLO WORLD",
  "error": null
}
```

### 其他函数

- `getPluginInfo()`: 获取插件信息
- `healthCheck()`: 健康检查
- `getVersion()`: 获取版本号
- `greet(name)`: 问候函数
- `factorial(n)`: 计算阶乘
- `fibonacci(n)`: 生成斐波那契数列
- `textStats(text)`: 文本统计

## 🎨 自定义样式

插件前端使用现代 CSS 设计，支持:
- 响应式布局
- 渐变背景
- 动画效果
- 深色/浅色主题适配

可以通过修改 `index.html` 中的 CSS 来自定义界面样式。

## 🔍 调试技巧

### 构建问题
1. 确保 Extism JavaScript PDK 正确安装
2. 检查 `extism-js` 命令是否在 PATH 中
3. 查看构建日志中的错误信息

### 运行时问题
1. 打开浏览器开发者工具查看控制台
2. 检查插件配置文件格式
3. 验证 WASM 文件是否正确生成

### 性能优化
1. 使用 `wasm-opt` 优化 WASM 文件大小
2. 减少不必要的 JavaScript 依赖
3. 优化前端界面的渲染性能

## 🚀 部署

1. 构建插件: `./build.sh` 或 `build.bat`
2. 确认生成 `plugin.wasm` 文件
3. 将整个插件目录复制到 Why Talk 的 `plugins` 目录
4. 重启应用并启用插件

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 发起 Pull Request

## 📄 许可证

MIT License - 详见 LICENSE 文件

## 🆘 支持

如果遇到问题或有建议，请:
1. 查看 [Why Talk 文档](https://github.com/your-org/why-talk)
2. 查看 [Extism 文档](https://extism.org/docs/)
3. 提交 [Issue](https://github.com/your-org/why-talk/issues)
4. 加入社区讨论

---

**注意**: 这是一个使用 Extism JavaScript PDK 的示例插件，专门用于演示统一插件架构的使用方法。Extism 提供了优秀的 JavaScript 到 WASM 编译能力，是开发 Why Talk 插件的推荐方案。