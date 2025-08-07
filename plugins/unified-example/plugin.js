// Extism JavaScript PDK 插件示例
// 使用 Extism CLI 编译为 WASM

/**
 * 数学计算函数
 * @param {Object} req - 请求参数 {operation: string, a: number, b: number}
 * @returns {Object} 计算结果
 */
function calculate() {
    try {
        const input = Host.inputString();
        const req = JSON.parse(input);
        
        // 验证输入参数
        if (!req.operation || typeof req.a !== 'number' || typeof req.b !== 'number') {
            throw new Error('无效的输入参数');
        }
        
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
                if (req.b === 0) {
                    throw new Error('除数不能为零');
                }
                result = req.a / req.b;
                break;
            default:
                throw new Error(`不支持的运算类型: ${req.operation}`);
        }
        
        const response = {
            success: true,
            result: result,
            error: null
        };
        
        Host.outputString(JSON.stringify(response));
    } catch (error) {
        const errorResponse = {
            success: false,
            result: null,
            error: error.message
        };
        Host.outputString(JSON.stringify(errorResponse));
    }
}

/**
 * 数学计算：加法
 */
function add() {
  const input = JSON.parse(Host.inputString());
  const result = input.a + input.b;
  Host.outputString(JSON.stringify({ result }));
}

/**
 * 数学计算：减法
 */
function subtract() {
  const input = JSON.parse(Host.inputString());
  const result = input.a - input.b;
  Host.outputString(JSON.stringify({ result }));
}

/**
 * 数学计算：乘法
 */
function multiply() {
  const input = JSON.parse(Host.inputString());
  const result = input.a * input.b;
  Host.outputString(JSON.stringify({ result }));
}

/**
 * 数学计算：除法
 */
function divide() {
  const input = JSON.parse(Host.inputString());
  if (input.b === 0) {
    throw new Error("Division by zero is not allowed");
  }
  const result = input.a / input.b;
  Host.outputString(JSON.stringify({ result }));
}

/**
 * 文本处理函数
 * @param {Object} req - 请求参数 {text: string, operation: string}
 * @returns {Object} 处理结果
 */
function processText() {
    try {
        const input = Host.inputString();
        const req = JSON.parse(input);
        
        // 验证输入参数
        if (!req.text || typeof req.text !== 'string' || !req.operation) {
            throw new Error('无效的输入参数');
        }
        
        let result;
        switch (req.operation) {
            case 'uppercase':
                result = req.text.toUpperCase();
                break;
            case 'lowercase':
                result = req.text.toLowerCase();
                break;
            case 'reverse':
                result = req.text.split('').reverse().join('');
                break;
            default:
                throw new Error(`不支持的文本操作: ${req.operation}`);
        }
        
        const response = {
            success: true,
            result: result,
            error: null
        };
        
        Host.outputString(JSON.stringify(response));
    } catch (error) {
        const errorResponse = {
            success: false,
            result: null,
            error: error.message
        };
        Host.outputString(JSON.stringify(errorResponse));
    }
}

/**
 * 文本处理：转换为大写
 */
function toUpperCase() {
  const input = JSON.parse(Host.inputString());
  const result = input.text.toUpperCase();
  Host.outputString(JSON.stringify({ result }));
}

/**
 * 文本处理：转换为小写
 */
function toLowerCase() {
  const input = JSON.parse(Host.inputString());
  const result = input.text.toLowerCase();
  Host.outputString(JSON.stringify({ result }));
}

/**
 * 文本处理：反转字符串
 */
function reverseText() {
  const input = JSON.parse(Host.inputString());
  const result = input.text.split('').reverse().join('');
  Host.outputString(JSON.stringify({ result }));
}

/**
 * 获取插件信息
 */
function getPluginInfo() {
  const info = {
    name: "统一插件示例",
    version: "1.0.0",
    description: "使用 Extism JavaScript PDK 开发的示例插件",
    author: "开发者",
    capabilities: [
      "数学计算",
      "文本处理",
      "插件信息获取"
    ]
  };
  Host.outputString(JSON.stringify(info));
}

/**
 * 健康检查
 */
function healthCheck() {
  const status = {
    status: "healthy",
    timestamp: Date.now(),
    message: "插件运行正常"
  };
  Host.outputString(JSON.stringify(status));
}

/**
 * 获取版本信息
 */
function getVersion() {
  const version = {
    version: "1.0.0",
    buildTime: "2024-01-01T00:00:00Z",
    runtime: "Extism JavaScript PDK"
  };
  Host.outputString(JSON.stringify(version));
}

/**
 * 问候语功能
 */
function greet() {
  const input = JSON.parse(Host.inputString());
  const name = input.name || "World";
  const greeting = `Hello, ${name}! Welcome to Extism Plugin.`;
  Host.outputString(JSON.stringify({ greeting }));
}

/**
 * 计算阶乘
 */
function factorial() {
  const input = JSON.parse(Host.inputString());
  const n = input.number;
  
  if (n < 0) {
    throw new Error("Factorial is not defined for negative numbers");
  }
  
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  
  Host.outputString(JSON.stringify({ result }));
}

/**
 * 计算斐波那契数列
 */
function fibonacci() {
  const input = JSON.parse(Host.inputString());
  const n = input.number;
  
  if (n < 0) {
    throw new Error("Fibonacci is not defined for negative numbers");
  }
  
  if (n <= 1) {
    Host.outputString(JSON.stringify({ result: n }));
    return;
  }
  
  let a = 0, b = 1;
  for (let i = 2; i <= n; i++) {
    const temp = a + b;
    a = b;
    b = temp;
  }
  
  Host.outputString(JSON.stringify({ result: b }));
}

/**
 * 文本统计
 */
function textStats() {
  const input = JSON.parse(Host.inputString());
  const text = input.text;
  
  const stats = {
    length: text.length,
    words: text.trim() ? text.trim().split(/\s+/).length : 0,
    lines: text.split('\n').length,
    characters: text.length,
    charactersNoSpaces: text.replace(/\s/g, '').length,
    vowels: (text.match(/[aeiouAEIOU]/g) || []).length,
    consonants: (text.match(/[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]/g) || []).length
  };
  
  Host.outputString(JSON.stringify(stats));
}

// 导出所有函数
module.exports = {
  calculate,
  processText,
  add,
  subtract,
  multiply,
  divide,
  toUpperCase,
  toLowerCase,
  reverseText,
  getPluginInfo,
  healthCheck,
  getVersion,
  greet,
  factorial,
  fibonacci,
  textStats
};