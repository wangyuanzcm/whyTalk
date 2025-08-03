# WhyTalk 单客户端启动脚本
# 用法: .\start-client.ps1 -ClientId 1

param(
    [Parameter(Mandatory=$true)]
    [int]$ClientId
)

# 用户配置
$users = @{
    1 = @{ Name = "Alice"; Mobile = "13800138001"; Port = 5173; UserData = "userData-client-1" }
    2 = @{ Name = "Bob"; Mobile = "13800138002"; Port = 5174; UserData = "userData-client-2" }
    3 = @{ Name = "Charlie"; Mobile = "13800138003"; Port = 5175; UserData = "userData-client-3" }
    4 = @{ Name = "Diana"; Mobile = "13800138004"; Port = 5176; UserData = "userData-client-4" }
}

if (-not $users.ContainsKey($ClientId)) {
    Write-Host "错误: 客户端ID必须是1-4之间的数字" -ForegroundColor Red
    exit 1
}

$user = $users[$ClientId]

Write-Host "=== 启动客户端 $ClientId ($($user.Name)) ===" -ForegroundColor Green
Write-Host "手机号: $($user.Mobile)" -ForegroundColor Yellow
Write-Host "密码: 123456" -ForegroundColor Yellow
Write-Host "访问地址: http://localhost:$($user.Port)" -ForegroundColor Yellow
Write-Host "用户数据目录: $($user.UserData)" -ForegroundColor Yellow
Write-Host ""

# 设置环境变量
$env:ELECTRON_USER_DATA = $user.UserData
if ($ClientId -ne 1) {
    $env:VITE_DEV_PORT = $user.Port.ToString()
}

Write-Host "正在启动客户端..." -ForegroundColor Cyan

# 启动应用
try {
    npm run dev
} catch {
    Write-Host "启动失败: $_" -ForegroundColor Red
    exit 1
}