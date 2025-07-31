// test-plugin Plugin Script

if (typeof window.pluginAPI === 'undefined') {
    console.error('Plugin API not available');
    document.body.innerHTML = '<div style="padding: 20px; text-align: center; color: red;">插件API不可用</div>';
} else {
    console.log('Plugin API available');
    initializePlugin();
}

async function initializePlugin() {
    try {
        // 加载插件信息
        const info = await window.pluginAPI.getPluginInfo();
        const infoElement = document.getElementById('plugin-info');
        
        infoElement.innerHTML = `
            <div><strong>名称:</strong> ${info.name}</div>
            <div><strong>版本:</strong> ${info.version}</div>
            <div><strong>描述:</strong> ${info.description}</div>
        `;
        
        // 初始化事件监听器
        document.getElementById('test-btn').addEventListener('click', async () => {
            try {
                await window.pluginAPI.showNotification({
                    title: 'test-plugin',
                    body: '插件功能测试成功！',
                    icon: 'info'
                });
                
                document.getElementById('result').textContent = '测试成功！';
            } catch (error) {
                document.getElementById('result').textContent = `错误: ${error.message}`;
            }
        });
        
        console.log('Plugin initialized successfully');
    } catch (error) {
        console.error('Failed to initialize plugin:', error);
    }
}

window.addEventListener('error', (event) => {
    console.error('Plugin error:', event.error);
});