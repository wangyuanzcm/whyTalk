/**
 * VSCode风格扩展信息页面模板工具函数
 */

/**
 * 创建扩展信息页面HTML
 * @param extensionData 扩展数据（包含manifest和config）
 * @returns 生成的HTML字符串
 */
export const createExtensionInfoPage = (extensionData: any): string => {
  const { manifest } = extensionData
  
  // 获取扩展基本信息
  const name = manifest?.displayName || manifest?.name || '未知扩展'
  const description = manifest?.description || '暂无描述'
  const version = manifest?.version || '1.0.0'
  const publisher = manifest?.publisher || '未知发布者'
  const author = manifest?.author || publisher
  const repository = manifest?.repository?.url || ''
  const homepage = manifest?.homepage || ''
  const license = manifest?.license || ''
  const keywords = manifest?.keywords || []
  const categories = manifest?.categories || []
  const activationEvents = manifest?.activationEvents || []
  const contributes = manifest?.contributes || {}
  
  // 生成HTML内容
  return `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${name} - 扩展信息</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
            line-height: 1.6;
            color: #333;
            background: #f5f5f5;
            padding: 20px;
        }
        
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }
        
        .header h1 {
            font-size: 2.5em;
            margin-bottom: 10px;
            font-weight: 300;
        }
        
        .header .version {
            background: rgba(255, 255, 255, 0.2);
            padding: 5px 15px;
            border-radius: 20px;
            display: inline-block;
            font-size: 0.9em;
            margin-top: 10px;
        }
        
        .content {
            padding: 30px;
        }
        
        .section {
            margin-bottom: 30px;
        }
        
        .section h2 {
            color: #667eea;
            border-bottom: 2px solid #667eea;
            padding-bottom: 10px;
            margin-bottom: 15px;
            font-size: 1.5em;
        }
        
        .info-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-bottom: 20px;
        }
        
        .info-item {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 6px;
            border-left: 4px solid #667eea;
        }
        
        .info-item .label {
            font-weight: 600;
            color: #555;
            margin-bottom: 5px;
        }
        
        .info-item .value {
            color: #333;
        }
        
        .description {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 6px;
            border-left: 4px solid #28a745;
            margin-bottom: 20px;
        }
        
        .tags {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-top: 10px;
        }
        
        .tag {
            background: #e9ecef;
            color: #495057;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.85em;
            border: 1px solid #dee2e6;
        }
        
        .tag.category {
            background: #d1ecf1;
            color: #0c5460;
            border-color: #bee5eb;
        }
        
        .links {
            display: flex;
            gap: 15px;
            flex-wrap: wrap;
            margin-top: 15px;
        }
        
        .link {
            color: #667eea;
            text-decoration: none;
            padding: 8px 16px;
            border: 2px solid #667eea;
            border-radius: 6px;
            transition: all 0.3s ease;
            font-weight: 500;
        }
        
        .link:hover {
            background: #667eea;
            color: white;
        }
        
        .contributes-section {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 6px;
            margin-top: 20px;
        }
        
        .contributes-item {
            margin-bottom: 15px;
            padding: 10px;
            background: white;
            border-radius: 4px;
            border-left: 3px solid #ffc107;
        }
        
        .contributes-item h4 {
            color: #495057;
            margin-bottom: 8px;
        }
        
        .contributes-list {
            list-style: none;
            padding-left: 0;
        }
        
        .contributes-list li {
            padding: 5px 0;
            border-bottom: 1px solid #e9ecef;
        }
        
        .contributes-list li:last-child {
            border-bottom: none;
        }
        
        .activation-events {
            background: #fff3cd;
            border: 1px solid #ffeaa7;
            border-radius: 6px;
            padding: 15px;
            margin-top: 15px;
        }
        
        .activation-events h4 {
            color: #856404;
            margin-bottom: 10px;
        }
        
        .activation-events ul {
            list-style-type: disc;
            padding-left: 20px;
        }
        
        .activation-events li {
            color: #856404;
            margin-bottom: 5px;
        }
        
        .no-data {
            color: #6c757d;
            font-style: italic;
            text-align: center;
            padding: 20px;
        }
        
        @media (max-width: 600px) {
            .container {
                margin: 10px;
            }
            
            .header {
                padding: 20px;
            }
            
            .header h1 {
                font-size: 2em;
            }
            
            .content {
                padding: 20px;
            }
            
            .info-grid {
                grid-template-columns: 1fr;
            }
            
            .links {
                flex-direction: column;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>${name}</h1>
            <p>${description}</p>
            <div class="version">版本 ${version}</div>
        </div>
        
        <div class="content">
            <div class="section">
                <h2>基本信息</h2>
                <div class="info-grid">
                    <div class="info-item">
                        <div class="label">发布者</div>
                        <div class="value">${publisher}</div>
                    </div>
                    <div class="info-item">
                        <div class="label">作者</div>
                        <div class="value">${author}</div>
                    </div>
                    <div class="info-item">
                        <div class="label">版本</div>
                        <div class="value">${version}</div>
                    </div>
                    ${license ? `
                    <div class="info-item">
                        <div class="label">许可证</div>
                        <div class="value">${license}</div>
                    </div>
                    ` : ''}
                </div>
                
                ${repository || homepage ? `
                <div class="links">
                    ${repository ? `<a href="${repository}" class="link" target="_blank">源代码仓库</a>` : ''}
                    ${homepage ? `<a href="${homepage}" class="link" target="_blank">主页</a>` : ''}
                </div>
                ` : ''}
            </div>
            
            ${description ? `
            <div class="section">
                <h2>描述</h2>
                <div class="description">
                    ${description}
                </div>
            </div>
            ` : ''}
            
            ${categories.length > 0 || keywords.length > 0 ? `
            <div class="section">
                <h2>分类和标签</h2>
                ${categories.length > 0 ? `
                <div>
                    <strong>分类：</strong>
                    <div class="tags">
                        ${categories.map((cat: string) => `<span class="tag category">${cat}</span>`).join('')}
                    </div>
                </div>
                ` : ''}
                ${keywords.length > 0 ? `
                <div style="margin-top: 15px;">
                    <strong>关键词：</strong>
                    <div class="tags">
                        ${keywords.map((keyword: string) => `<span class="tag">${keyword}</span>`).join('')}
                    </div>
                </div>
                ` : ''}
            </div>
            ` : ''}
            
            ${activationEvents.length > 0 ? `
            <div class="section">
                <h2>激活事件</h2>
                <div class="activation-events">
                    <h4>此扩展将在以下事件时激活：</h4>
                    <ul>
                        ${activationEvents.map((event: string) => `<li><code>${event}</code></li>`).join('')}
                    </ul>
                </div>
            </div>
            ` : ''}
            
            ${Object.keys(contributes).length > 0 ? `
            <div class="section">
                <h2>功能贡献</h2>
                <div class="contributes-section">
                    ${generateContributesHTML(contributes)}
                </div>
            </div>
            ` : ''}
            
            ${Object.keys(contributes).length === 0 && activationEvents.length === 0 ? `
            <div class="section">
                <div class="no-data">
                    此扩展暂未提供详细的功能说明
                </div>
            </div>
            ` : ''}
        </div>
    </div>
    
    <script>
        // 处理外部链接点击
        document.addEventListener('click', function(e) {
            const target = e.target;
            if (target.tagName === 'A' && target.hasAttribute('href')) {
                e.preventDefault();
                const url = target.getAttribute('href');
                if (url && (url.startsWith('http://') || url.startsWith('https://'))) {
                    // 通过插件API打开外部链接
                    if (window.pluginAPI && window.pluginAPI.shell) {
                        window.pluginAPI.shell.openExternal(url);
                    } else {
                        // 降级处理：在新窗口打开
                        window.open(url, '_blank');
                    }
                }
            }
        });
        
        // 通知父窗口插件已准备就绪
        window.addEventListener('load', function() {
            if (window.parent && window.parent !== window) {
                window.parent.postMessage({
                    type: 'PLUGIN_READY',
                    data: { extensionId: '${extensionData.id || 'unknown'}' }
                }, '*');
            }
        });
    </script>
</body>
</html>
`
    }

/**
 * 生成贡献功能的HTML
 * @param contributes 贡献配置对象
 * @returns HTML字符串
 */
function generateContributesHTML(contributes: any): string {
  const sections: string[] = []
  
  // 命令贡献
  if (contributes.commands && Array.isArray(contributes.commands)) {
    sections.push(`
      <div class="contributes-item">
        <h4>命令 (${contributes.commands.length})</h4>
        <ul class="contributes-list">
          ${contributes.commands.map((cmd: any) => `
            <li>
              <strong>${cmd.title || cmd.command}</strong>
              ${cmd.command ? `<br><code>${cmd.command}</code>` : ''}
              ${cmd.category ? `<br><small>分类: ${cmd.category}</small>` : ''}
            </li>
          `).join('')}
        </ul>
      </div>
    `)
  }
  
  // 菜单贡献
  if (contributes.menus && typeof contributes.menus === 'object') {
    const menuTypes = Object.keys(contributes.menus)
    sections.push(`
      <div class="contributes-item">
        <h4>菜单</h4>
        <ul class="contributes-list">
          ${menuTypes.map(menuType => `
            <li>
              <strong>${menuType}</strong> (${contributes.menus[menuType].length} 项)
            </li>
          `).join('')}
        </ul>
      </div>
    `)
  }
  
  // 键绑定贡献
  if (contributes.keybindings && Array.isArray(contributes.keybindings)) {
    sections.push(`
      <div class="contributes-item">
        <h4>键绑定 (${contributes.keybindings.length})</h4>
        <ul class="contributes-list">
          ${contributes.keybindings.map((kb: any) => `
            <li>
              <strong>${kb.key || kb.mac || kb.win || kb.linux}</strong>
              ${kb.command ? ` → ${kb.command}` : ''}
              ${kb.when ? `<br><small>条件: ${kb.when}</small>` : ''}
            </li>
          `).join('')}
        </ul>
      </div>
    `)
  }
  
  // 语言贡献
  if (contributes.languages && Array.isArray(contributes.languages)) {
    sections.push(`
      <div class="contributes-item">
        <h4>语言支持 (${contributes.languages.length})</h4>
        <ul class="contributes-list">
          ${contributes.languages.map((lang: any) => `
            <li>
              <strong>${lang.aliases ? lang.aliases[0] : lang.id}</strong>
              ${lang.extensions ? `<br><small>文件扩展名: ${lang.extensions.join(', ')}</small>` : ''}
            </li>
          `).join('')}
        </ul>
      </div>
    `)
  }
  
  // 配置贡献
  if (contributes.configuration && (contributes.configuration.properties || contributes.configuration.length)) {
    const properties = contributes.configuration.properties || 
                      (Array.isArray(contributes.configuration) ? contributes.configuration[0]?.properties : {})
    const propCount = properties ? Object.keys(properties).length : 0
    
    sections.push(`
      <div class="contributes-item">
        <h4>配置项 (${propCount})</h4>
        ${propCount > 0 ? `
          <ul class="contributes-list">
            ${Object.entries(properties).slice(0, 5).map(([key, prop]: [string, any]) => `
              <li>
                <strong>${key}</strong>
                ${prop.description ? `<br><small>${prop.description}</small>` : ''}
                ${prop.type ? `<br><small>类型: ${prop.type}</small>` : ''}
              </li>
            `).join('')}
            ${propCount > 5 ? `<li><small>... 还有 ${propCount - 5} 个配置项</small></li>` : ''}
          </ul>
        ` : '<p class="no-data">暂无配置项</p>'}
      </div>
    `)
  }
  
  // 其他贡献类型
  const otherContributes = Object.keys(contributes).filter(key => 
    !['commands', 'menus', 'keybindings', 'languages', 'configuration'].includes(key)
  )
  
  if (otherContributes.length > 0) {
    sections.push(`
      <div class="contributes-item">
        <h4>其他功能</h4>
        <ul class="contributes-list">
          ${otherContributes.map(key => `
            <li>
              <strong>${key}</strong>
              ${Array.isArray(contributes[key]) ? ` (${contributes[key].length} 项)` : ''}
            </li>
          `).join('')}
        </ul>
      </div>
    `)
  }
  
  return sections.length > 0 ? sections.join('') : '<p class="no-data">暂无功能贡献信息</p>'
}

/**
 * 检查扩展是否有自定义webview
 * @param extensionPath 扩展路径
 * @returns 是否存在webview目录
 */
export const hasCustomWebview = async (extensionPath: string): Promise<boolean> => {
  try {
    // 在渲染器进程中，需要通过 ipcRenderer 与主进程通信
    const { ipcRenderer } = await import('electron')
    const result = await ipcRenderer.invoke('check-file-exists', extensionPath + '/webview/index.html')
    return result
  } catch (error) {
    console.warn('检查webview目录时出错:', error)
    return false
  }
}

/**
 * 获取webview页面的URL
 * @param extensionPath 扩展路径
 * @returns webview页面的文件URL
 */
export const getWebviewUrl = (extensionPath: string): string => {
  const webviewPath = extensionPath + '/webview/index.html'
  return `file://${webviewPath.replace(/\\/g, '/')}`
}