/**
 * 插件功能测试脚本
 * 用于验证插件的各项功能是否正常工作
 */

// 模拟 Extism Host 环境
class MockHost {
    constructor() {
        this.inputData = '';
        this.outputData = '';
    }
    
    /**
     * 设置输入数据
     * @param {string} data - 输入数据
     */
    setInput(data) {
        this.inputData = data;
    }
    
    /**
     * 获取输入字符串
     * @returns {string} 输入数据
     */
    inputString() {
        return this.inputData;
    }
    
    /**
     * 设置输出字符串
     * @param {string} data - 输出数据
     */
    outputString(data) {
        this.outputData = data;
    }
    
    /**
     * 获取输出数据
     * @returns {string} 输出数据
     */
    getOutput() {
        return this.outputData;
    }
}

// 全局 Host 对象
const Host = new MockHost();

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
 * 测试函数
 * @param {string} functionName - 要测试的函数名
 * @param {Object} input - 输入参数
 * @returns {Object} 测试结果
 */
function testFunction(functionName, input) {
    console.log(`\n🧪 测试函数: ${functionName}`);
    console.log(`📥 输入: ${JSON.stringify(input)}`);
    
    try {
        // 设置输入
        Host.setInput(JSON.stringify(input));
        
        // 调用函数
        if (functionName === 'calculate') {
            calculate();
        } else if (functionName === 'processText') {
            processText();
        } else {
            throw new Error(`未知的函数: ${functionName}`);
        }
        
        // 获取输出
        const output = Host.getOutput();
        const result = JSON.parse(output);
        
        console.log(`📤 输出: ${JSON.stringify(result)}`);
        
        if (result.success) {
            console.log(`✅ 测试通过: ${result.result}`);
        } else {
            console.log(`❌ 测试失败: ${result.error}`);
        }
        
        return result;
    } catch (error) {
        console.log(`💥 测试异常: ${error.message}`);
        return { success: false, error: error.message };
    }
}

/**
 * 运行所有测试
 */
function runAllTests() {
    console.log('🚀 开始运行插件功能测试\n');
    console.log('=' .repeat(50));
    
    // 测试数学计算功能
    console.log('\n📊 数学计算功能测试');
    console.log('-'.repeat(30));
    
    testFunction('calculate', { operation: 'add', a: 10, b: 5 });
    testFunction('calculate', { operation: 'subtract', a: 10, b: 3 });
    testFunction('calculate', { operation: 'multiply', a: 4, b: 7 });
    testFunction('calculate', { operation: 'divide', a: 20, b: 4 });
    testFunction('calculate', { operation: 'divide', a: 10, b: 0 }); // 测试除零错误
    testFunction('calculate', { operation: 'invalid', a: 1, b: 2 }); // 测试无效操作
    
    // 测试文本处理功能
    console.log('\n📝 文本处理功能测试');
    console.log('-'.repeat(30));
    
    testFunction('processText', { text: 'Hello World', operation: 'uppercase' });
    testFunction('processText', { text: 'HELLO WORLD', operation: 'lowercase' });
    testFunction('processText', { text: 'Hello', operation: 'reverse' });
    testFunction('processText', { text: '', operation: 'uppercase' }); // 测试空字符串
    testFunction('processText', { text: 'test', operation: 'invalid' }); // 测试无效操作
    
    console.log('\n' + '='.repeat(50));
    console.log('🎉 测试完成！');
    console.log('\n💡 提示: 如果所有测试都通过，说明插件逻辑正确。');
    console.log('📋 下一步: 使用 Extism CLI 编译为 WASM 并部署到 Why Talk。');
}

// 如果直接运行此脚本，执行所有测试
if (typeof require !== 'undefined' && require.main === module) {
    runAllTests();
}

// 导出测试函数供其他模块使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        testFunction,
        runAllTests,
        calculate,
        processText
    };
}