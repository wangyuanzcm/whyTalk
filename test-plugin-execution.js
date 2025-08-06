// 测试插件执行
const fs = require('fs');
const path = require('path');

// 模拟浏览器环境
global.window = {
  addEventListener: () => {},
  removeEventListener: () => {},
  postMessage: () => {},
  parent: { postMessage: () => {} },
  electronAPI: null,
  pluginAPI: null
};

global.document = {
  readyState: 'complete',
  addEventListener: () => {},
  removeEventListener: () => {},
  getElementById: () => null,
  querySelectorAll: () => [],
  createElement: () => ({
    className: '',
    innerHTML: '',
    appendChild: () => {},
    addEventListener: () => {}
  }),
  createEvent: () => ({
    initCustomEvent: () => {}
  })
};

const originalConsole = console;
global.console = {
  log: (...args) => originalConsole.log('[PLUGIN]', ...args),
  error: (...args) => originalConsole.error('[PLUGIN ERROR]', ...args),
  warn: (...args) => originalConsole.warn('[PLUGIN WARN]', ...args)
};

global.alert = (msg) => console.log('[ALERT]', msg);
global.CustomEvent = function(type, options) {
  this.type = type;
  this.detail = options?.detail;
};

console.log('开始测试插件执行...');

try {
  // 读取并执行插件脚本
  const scriptPath = 'd:/github_repo/why-talk/plugins/message-plugin/script.js';
  const scriptContent = fs.readFileSync(scriptPath, 'utf-8');
  
  console.log('脚本文件大小:', scriptContent.length, '字符');
  
  // 检查关键代码是否存在
  const hasMessagePluginClass = scriptContent.includes('class MessagePlugin');
  const hasInstantiation = scriptContent.includes('new MessagePlugin()');
  const hasInitCall = scriptContent.includes('messagePlugin.init()');
  const hasConsoleLog = scriptContent.includes('console.log(\'消息插件已加载\')');
  
  console.log('代码检查结果:');
  console.log('- MessagePlugin类定义:', hasMessagePluginClass);
  console.log('- 插件实例化:', hasInstantiation);
  console.log('- init()调用:', hasInitCall);
  console.log('- 加载日志:', hasConsoleLog);
  
  // 执行脚本
  console.log('\n开始执行插件脚本...');
  eval(scriptContent);
  
  console.log('\n插件脚本执行完成');
  
  // 检查全局对象
  if (global.window.messagePlugin) {
    console.log('✅ messagePlugin实例已创建');
    console.log('- 当前聊天ID:', global.window.messagePlugin.currentChatId);
    console.log('- 聊天数量:', global.window.messagePlugin.chats?.length || 0);
  } else {
    console.log('❌ messagePlugin实例未找到');
  }
  
} catch (error) {
  console.error('执行插件脚本时出错:', error);
  console.error('错误堆栈:', error.stack);
}