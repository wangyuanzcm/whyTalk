/**
 * Sample Extension WebView JavaScript
 * 提供与扩展后台的通信和UI交互功能
 */

class ExtensionWebView {
    constructor() {
        this.logElement = null;
        this.isReady = false;
        this.messageQueue = [];
        this.messageHandlers = new Map();
        this.pendingMessages = [];
        
        this.init();
    }

    /**
     * 初始化WebView
     */
    init() {
        this.logElement = document.getElementById('log');
        this.setupEventListeners();
        this.setupAPI();
        this.log('WebView 初始化完成', 'info');
    }

    /**
     * 设置事件监听器
     */
    setupEventListeners() {
        // 监听来自扩展后台的消息
        window.addEventListener('message', (event) => {
            this.handleMessage(event.data);
        });

        // 页面加载完成事件
        document.addEventListener('DOMContentLoaded', () => {
            this.onReady();
        });

        // 页面卸载事件
        window.addEventListener('beforeunload', () => {
            this.onUnload();
        });
    }

    /**
     * 设置extensionWebView API
     */
    setupAPI() {
        // 等待extensionWebView API注入
        if (window.extensionWebView) {
            this.initializeAPI();
        } else {
            // 监听API就绪事件
            window.addEventListener('extensionWebViewReady', () => {
                this.initializeAPI();
            });
        }
    }

    /**
     * 初始化extensionWebView API
     */
    initializeAPI() {
        // 设置消息监听
        if (window.extensionWebView && window.extensionWebView.onMessage) {
            window.extensionWebView.onMessage((message) => {
                this.handleMessage(message);
            });
        }
        
        // 处理待发送的消息
        this.pendingMessages.forEach(message => {
            this.sendMessage(message);
        });
        this.pendingMessages = [];
        
        this.log('Extension WebView API initialized', 'info');
    }

    /**
     * 页面准备就绪
     */
    onReady() {
        this.isReady = true;
        this.log('Sample Extension WebView 已准备就绪', 'info');
        
        // 通知扩展后台页面已准备就绪
        this.sendMessage({
            type: 'webviewReady',
            timestamp: Date.now()
        });

        // 处理消息队列
        this.processMessageQueue();
    }

    /**
     * 页面卸载
     */
    onUnload() {
        this.sendMessage({
            type: 'webviewUnload',
            timestamp: Date.now()
        });
    }

    /**
     * 处理来自扩展后台的消息
     * @param {Object} message - 消息对象
     */
    handleMessage(message) {
        const { type, data, error, command } = message;
        
        switch (type) {
            case 'commandResult':
                this.handleCommandResult(command, data, error);
                break;
            case 'configurationResult':
                this.handleConfigurationResult(data, error);
                break;
            case 'extensionMessage':
                this.log(`扩展消息: ${data}`, 'info');
                break;
            case 'extensionError':
                this.log(`扩展错误: ${error}`, 'error');
                break;
            case 'statusUpdate':
                this.handleStatusUpdate(data);
                break;
            default:
                this.log(`未知消息类型: ${type}`, 'warning');
        }
    }

    /**
     * 处理命令执行结果
     * @param {string} command - 命令名称
     * @param {any} data - 结果数据
     * @param {string} error - 错误信息
     */
    handleCommandResult(command, data, error) {
        if (error) {
            this.log(`命令 ${command} 执行失败: ${error}`, 'error');
        } else {
            this.log(`命令 ${command} 执行成功: ${JSON.stringify(data)}`, 'info');
        }
    }

    /**
     * 处理配置获取结果
     * @param {Object} data - 配置数据
     * @param {string} error - 错误信息
     */
    handleConfigurationResult(data, error) {
        if (error) {
            this.log(`获取配置失败: ${error}`, 'error');
        } else {
            this.log(`配置信息:\n${JSON.stringify(data, null, 2)}`, 'info');
        }
    }

    /**
     * 处理状态更新
     * @param {Object} status - 状态信息
     */
    handleStatusUpdate(status) {
        this.log(`状态更新: ${JSON.stringify(status)}`, 'info');
        
        // 更新UI状态
        const statusElement = document.querySelector('.status');
        if (statusElement && status.active !== undefined) {
            statusElement.textContent = status.active ? '已激活' : '未激活';
            statusElement.className = `status ${status.active ? 'active' : 'inactive'}`;
        }
    }

    /**
     * 发送消息到扩展后台
     * @param {Object} message - 消息对象
     */
    sendMessage(message) {
        if (!this.isReady) {
            this.messageQueue.push(message);
            return;
        }

        if (window.extensionWebView && window.extensionWebView.postMessage) {
            window.extensionWebView.postMessage(message);
        } else if (window.parent && window.parent !== window) {
            window.parent.postMessage(message, '*');
        } else {
            this.log('无法发送消息: 未找到父窗口', 'warning');
        }
    }

    /**
     * 处理消息队列
     */
    processMessageQueue() {
        while (this.messageQueue.length > 0) {
            const message = this.messageQueue.shift();
            this.sendMessage(message);
        }
    }

    /**
     * 执行扩展命令
     * @param {string} command - 命令名称
     * @param {Object} args - 命令参数
     */
    async executeCommand(command, args = {}) {
        this.log(`执行命令: ${command}`, 'info');
        
        if (window.extensionWebView && window.extensionWebView.executeCommand) {
            try {
                const result = await window.extensionWebView.executeCommand(command, ...Object.values(args));
                this.log(`命令 ${command} 执行成功: ${JSON.stringify(result)}`, 'info');
                return result;
            } catch (error) {
                this.log(`命令 ${command} 执行失败: ${error}`, 'error');
                throw error;
            }
        }
        
        // 降级到消息通信
        this.sendMessage({
            type: 'executeCommand',
            command: command,
            args: args,
            timestamp: Date.now()
        });
    }

    /**
     * 获取扩展配置
     * @param {string} section - 配置节名称
     */
    async getConfiguration(section = 'sample') {
        this.log(`获取配置: ${section}`, 'info');
        
        if (window.extensionWebView && window.extensionWebView.getConfiguration) {
            try {
                const result = await window.extensionWebView.getConfiguration(section);
                this.log(`配置信息:\n${JSON.stringify(result, null, 2)}`, 'info');
                return result;
            } catch (error) {
                this.log(`获取配置失败: ${error}`, 'error');
                throw error;
            }
        }
        
        // 降级到消息通信
        this.sendMessage({
            type: 'getConfiguration',
            section: section,
            timestamp: Date.now()
        });
    }

    /**
     * 更新扩展配置
     * @param {string} section - 配置节名称
     * @param {Object} config - 配置对象
     */
    async updateConfiguration(section, config) {
        this.log(`更新配置: ${section}`, 'info');
        
        if (window.extensionWebView && window.extensionWebView.updateConfiguration) {
            try {
                const result = await window.extensionWebView.updateConfiguration(section, config);
                this.log(`配置更新成功: ${section}`, 'info');
                return result;
            } catch (error) {
                this.log(`配置更新失败: ${error}`, 'error');
                throw error;
            }
        }
        
        // 降级到消息通信
        this.sendMessage({
            type: 'updateConfiguration',
            section: section,
            config: config,
            timestamp: Date.now()
        });
    }

    /**
     * 记录日志
     * @param {string} message - 日志消息
     * @param {string} level - 日志级别 (info, warning, error)
     */
    log(message, level = 'info') {
        if (!this.logElement) return;
        
        const timestamp = new Date().toLocaleTimeString();
        const logLine = `[${timestamp}] ${message}`;
        
        // 创建日志元素
        const logEntry = document.createElement('div');
        logEntry.className = `log-entry ${level}`;
        
        const timestampSpan = document.createElement('span');
        timestampSpan.className = 'timestamp';
        timestampSpan.textContent = `[${timestamp}] `;
        
        const messageSpan = document.createElement('span');
        messageSpan.className = level;
        messageSpan.textContent = message;
        
        logEntry.appendChild(timestampSpan);
        logEntry.appendChild(messageSpan);
        
        // 添加到日志容器
        this.logElement.appendChild(logEntry);
        this.logElement.scrollTop = this.logElement.scrollHeight;
        
        // 限制日志条数
        const maxLogEntries = 100;
        const logEntries = this.logElement.querySelectorAll('.log-entry');
        if (logEntries.length > maxLogEntries) {
            for (let i = 0; i < logEntries.length - maxLogEntries; i++) {
                logEntries[i].remove();
            }
        }
    }

    /**
     * 清空日志
     */
    clearLog() {
        if (this.logElement) {
            this.logElement.innerHTML = '';
            this.log('日志已清空', 'info');
        }
    }

    /**
     * 显示通知
     * @param {string} message - 通知消息
     * @param {string} type - 通知类型
     */
    showNotification(message, type = 'info') {
        // 创建通知元素
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // 添加样式
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '12px 20px',
            borderRadius: '6px',
            color: 'white',
            fontWeight: '500',
            zIndex: '1000',
            animation: 'slideIn 0.3s ease'
        });
        
        // 设置背景色
        const colors = {
            info: '#17a2b8',
            success: '#28a745',
            warning: '#ffc107',
            error: '#dc3545'
        };
        notification.style.background = colors[type] || colors.info;
        
        document.body.appendChild(notification);
        
        // 自动移除
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    /**
     * 获取扩展信息
     */
    async getExtensionInfo() {
        if (window.extensionWebView && window.extensionWebView.getExtensionInfo) {
            try {
                const result = await window.extensionWebView.getExtensionInfo();
                this.log(`扩展信息: ${JSON.stringify(result)}`, 'info');
                return result;
            } catch (error) {
                this.log(`获取扩展信息失败: ${error}`, 'error');
                throw error;
            }
        }
        
        // 降级到消息通信
        this.sendMessage({
            type: 'getExtensionInfo',
            timestamp: Date.now()
        });
    }

    /**
     * 显示信息消息
     * @param {string} message - 消息内容
     * @param {...string} items - 可选项
     */
    async showInformationMessage(message, ...items) {
        if (window.extensionWebView && window.extensionWebView.showInformationMessage) {
            return await window.extensionWebView.showInformationMessage(message, ...items);
        }
        
        // 降级到本地通知
        this.showNotification(message, 'info');
        return null;
    }

    /**
     * 显示警告消息
     * @param {string} message - 消息内容
     * @param {...string} items - 可选项
     */
    async showWarningMessage(message, ...items) {
        if (window.extensionWebView && window.extensionWebView.showWarningMessage) {
            return await window.extensionWebView.showWarningMessage(message, ...items);
        }
        
        // 降级到本地通知
        this.showNotification(message, 'warning');
        return null;
    }

    /**
     * 显示错误消息
     * @param {string} message - 消息内容
     * @param {...string} items - 可选项
     */
    async showErrorMessage(message, ...items) {
        if (window.extensionWebView && window.extensionWebView.showErrorMessage) {
            return await window.extensionWebView.showErrorMessage(message, ...items);
        }
        
        // 降级到本地通知
        this.showNotification(message, 'error');
        return null;
    }
}

// 全局实例
let extensionWebView;

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    extensionWebView = new ExtensionWebView();
    
    // 创建webView全局对象，用于HTML中的onclick调用
    window.webView = {
        executeCommand: (command, args) => extensionWebView.executeCommand(command, args),
        getConfiguration: (section) => extensionWebView.getConfiguration(section),
        updateConfiguration: (section, config) => extensionWebView.updateConfiguration(section, config),
        getExtensionInfo: () => extensionWebView.getExtensionInfo(),
        showInformationMessage: (message, ...items) => extensionWebView.showInformationMessage(message, ...items),
        showWarningMessage: (message, ...items) => extensionWebView.showWarningMessage(message, ...items),
        showErrorMessage: (message, ...items) => extensionWebView.showErrorMessage(message, ...items),
        showNotification: (message, type) => extensionWebView.showNotification(message, type),
        clearLog: () => extensionWebView.clearLog()
    };
    
    // 绑定全局函数（保持向后兼容）
    window.executeCommand = (command, args) => extensionWebView.executeCommand(command, args);
    window.getConfiguration = (section) => extensionWebView.getConfiguration(section);
    window.clearLog = () => extensionWebView.clearLog();
    window.getExtensionInfo = () => extensionWebView.getExtensionInfo();
});

// 添加CSS动画
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .log-entry {
        margin-bottom: 2px;
        padding: 2px 0;
        border-left: 3px solid transparent;
        padding-left: 8px;
    }
    
    .log-entry.info {
        border-left-color: #17a2b8;
    }
    
    .log-entry.warning {
        border-left-color: #ffc107;
    }
    
    .log-entry.error {
        border-left-color: #dc3545;
    }
`;
document.head.appendChild(style);