# 修复打包后应用程序中缺失的 p2p-service 文件

Write-Host "正在修复 p2p-service 文件..."

# 检查 dist 目录是否存在
if (-not (Test-Path "dist\win-unpacked")) {
    Write-Host "错误: dist\win-unpacked 目录不存在，请先运行构建命令"
    exit 1
}

# 创建临时目录
$tempDir = "temp_fix"
if (Test-Path $tempDir) {
    Remove-Item -Recurse -Force $tempDir
}
New-Item -ItemType Directory -Path $tempDir | Out-Null

# 提取现有的 app.asar
Write-Host "提取现有的 app.asar..."
try {
    npx asar extract "dist\win-unpacked\resources\app.asar" $tempDir
} catch {
    Write-Host "错误: 无法提取 app.asar 文件"
    exit 1
}

# 复制 p2p-service 文件
Write-Host "复制 p2p-service 文件..."
$p2pSourceDir = "src\p2p-service"
$p2pDestDir = "$tempDir\src\p2p-service"

if (Test-Path $p2pSourceDir) {
    New-Item -ItemType Directory -Path $p2pDestDir -Force | Out-Null
    Copy-Item -Path "$p2pSourceDir\*" -Destination $p2pDestDir -Force
    Write-Host "已复制 p2p-service 文件到临时目录"
} else {
    Write-Host "错误: 源 p2p-service 目录不存在"
    exit 1
}

# 重新打包 app.asar
Write-Host "重新打包 app.asar..."
try {
    Remove-Item "dist\win-unpacked\resources\app.asar" -Force
    npx asar pack $tempDir "dist\win-unpacked\resources\app.asar"
    Write-Host "app.asar 重新打包完成"
} catch {
    Write-Host "错误: 无法重新打包 app.asar"
    exit 1
}

# 清理临时目录
Remove-Item -Recurse -Force $tempDir

Write-Host "修复完成！现在可以运行 dist\win-unpacked\why-talk.exe"