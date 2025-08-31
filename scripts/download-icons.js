const fs = require('fs')
const path = require('path')
const https = require('https')

/**
 * 下载IconPark图标的SVG文件
 * @param {string} iconName - 图标名称
 * @param {string} outputDir - 输出目录
 */
function downloadIcon(iconName, outputDir) {
  // IconPark的SVG下载URL模式
  const url = `https://lf1-cdn2-tos.bytegoofy.com/bydesign/iconparkTwoTone/svg/${iconName.toLowerCase().replace(/([A-Z])/g, '-$1').replace(/^-/, '')}.svg`
  
  const outputPath = path.join(outputDir, `${iconName}.svg`)
  
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        const file = fs.createWriteStream(outputPath)
        response.pipe(file)
        file.on('finish', () => {
          file.close()
          console.log(`Downloaded: ${iconName}.svg`)
          resolve()
        })
      } else {
        console.log(`Failed to download ${iconName}: ${response.statusCode}`)
        reject(new Error(`HTTP ${response.statusCode}`))
      }
    }).on('error', (err) => {
      console.error(`Error downloading ${iconName}:`, err.message)
      reject(err)
    })
  })
}

/**
 * 创建Vue图标组件
 * @param {string} iconName - 图标名称
 * @param {string} svgContent - SVG内容
 * @param {string} outputDir - 输出目录
 */
function createVueComponent(iconName, svgContent, outputDir) {
  const componentContent = `<template>
  ${svgContent}
</template>

<script setup lang="ts">
// ${iconName} 图标组件
</script>
`
  
  const componentPath = path.join(outputDir, `${iconName}.vue`)
  fs.writeFileSync(componentPath, componentContent)
  console.log(`Created component: ${iconName}.vue`)
}

// 所有使用的图标列表
const icons = [
  'Theme', 'Download', 'Delete', 'Edit', 'Add', 'Upload', 'PreviewOpen', 'Moon', 'Sun', 'Monitor', 'Tool', 'SettingTwo',
  'Application', 'Play', 'Setting', 'FolderDownload', 'Refresh', 'CheckOne', 'CloseOne', 'DatabaseSetting', 'CloudSync',
  'Network', 'TestTube', 'Save', 'Warning', 'Close', 'Male', 'Female', 'UploadOne', 'RefreshOne', 'Redo', 'Undo',
  'Drag', 'Message', 'People', 'BookmarkOne', 'ToTop', 'Copy', 'LoadingTwo', 'DoubleDown', 'More', 'Plug', 'Link',
  'Time', 'FolderOpen', 'Remind', 'LinkThree', 'User', 'NetworkDrive', 'Info', 'Update', 'CloudDownload', 'History',
  'Settings', 'Heart', 'Star', 'Code', 'LicenseOne', 'Team'
]

const iconsDir = path.join(__dirname, '..', 'src', 'renderer', 'src', 'components', 'icons')

/**
 * 主函数：下载所有图标并创建Vue组件
 */
async function main() {
  console.log('开始下载图标...')
  
  for (const iconName of icons) {
    try {
      await downloadIcon(iconName, iconsDir)
      
      // 读取下载的SVG文件并创建Vue组件
      const svgPath = path.join(iconsDir, `${iconName}.svg`)
      if (fs.existsSync(svgPath)) {
        const svgContent = fs.readFileSync(svgPath, 'utf8')
        createVueComponent(iconName, svgContent, iconsDir)
        
        // 删除原始SVG文件，只保留Vue组件
        fs.unlinkSync(svgPath)
      }
    } catch (error) {
      console.error(`处理图标 ${iconName} 时出错:`, error.message)
    }
  }
  
  console.log('图标下载完成！')
}

main().catch(console.error)