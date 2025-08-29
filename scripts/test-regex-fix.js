// 测试插件加载过程
const fs = require('fs')
const path = require('path')

// 模拟插件管理器的inlinePluginResources方法
function inlinePluginResources(htmlContent, pluginPath) {
  try {
    console.log('开始处理插件资源...')
    console.log('插件路径:', pluginPath)

    // 处理CSS文件
    htmlContent = htmlContent.replace(
      /<link[^>]+rel=["']stylesheet["'][^>]*href=["']([^"']+)["'][^>]*>/gi,
      (match, href) => {
        console.log('发现CSS文件:', href)
        try {
          const cssPath = path.join(pluginPath, href)
          if (fs.existsSync(cssPath)) {
            const cssContent = fs.readFileSync(cssPath, 'utf-8')
            console.log('成功内联CSS文件:', href)
            return `<style>\n${cssContent}\n</style>`
          } else {
            console.log('CSS文件不存在:', cssPath)
          }
        } catch (error) {
          console.warn(`Failed to inline CSS file ${href}:`, error)
        }
        return match
      }
    )

    // 处理JS文件
    htmlContent = htmlContent.replace(
      /<script[^>]*src=["']?([^"'\s>]+)["']?[^>]*><\/script>/gi,
      (match, src) => {
        console.log('发现JS文件:', src)
        console.log('匹配的完整标签:', match)
        try {
          const jsPath = path.join(pluginPath, src)
          console.log('JS文件完整路径:', jsPath)
          if (fs.existsSync(jsPath)) {
            const jsContent = fs.readFileSync(jsPath, 'utf-8')
            console.log('成功内联JS文件:', src, '文件大小:', jsContent.length, '字符')
            return `<script>\n${jsContent}\n</script>`
          } else {
            console.log('JS文件不存在:', jsPath)
          }
        } catch (error) {
          console.warn(`Failed to inline JS file ${src}:`, error)
        }
        return match
      }
    )

    return htmlContent
  } catch (error) {
    console.error('Error inlining plugin resources:', error)
    return htmlContent
  }
}

// 测试消息插件
const pluginPath = 'd:/github_repo/why-talk/plugins/message-plugin'
const htmlPath = path.join(pluginPath, 'index.html')

console.log('测试消息插件加载...')
console.log('HTML文件路径:', htmlPath)

if (fs.existsSync(htmlPath)) {
  const htmlContent = fs.readFileSync(htmlPath, 'utf-8')
  console.log('HTML文件大小:', htmlContent.length, '字符')

  // 查找script标签
  const scriptMatches = htmlContent.match(/<script[^>]*src[^>]*><\/script>/gi)
  console.log('找到的script标签:', scriptMatches)

  // 处理资源内联
  const processedHTML = inlinePluginResources(htmlContent, pluginPath)

  // 检查是否成功内联
  const hasExternalScript = /<script[^>]*src[^>]*><\/script>/gi.test(processedHTML)
  console.log('处理后是否还有外部script标签:', hasExternalScript)

  if (!hasExternalScript) {
    console.log('✅ JavaScript文件成功内联!')
  } else {
    console.log('❌ JavaScript文件内联失败!')
  }
} else {
  console.log('HTML文件不存在:', htmlPath)
}
