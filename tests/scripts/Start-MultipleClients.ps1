# WhyTalk 多客户端启动脚本 (带用户账号)
# 启动多个客户端实例进行P2P测试

param(
    [int]$ClientCount = 2
)

Write-Host "========================================" -ForegroundColor Green
Write-Host "WhyTalk 多客户端P2P测试启动器" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green

# 用户配置
$Users = @(
    @{ ClientId = 1; Nickname = "Alice"; Mobile = "13800138001"; Password = "123456"; Port = 5173 },
    @{ ClientId = 2; Nickname = "Bob"; Mobile = "13800138002"; Password = "123456"; Port = 5174 },
    @{ ClientId = 3; Nickname = "Charlie"; Mobile = "13800138003"; Password = "123456"; Port = 5175 },
    @{ ClientId = 4; Nickname = "Diana"; Mobile = "13800138004"; Password = "123456"; Port = 5176 }
)

Write-Host "准备启动 $ClientCount 个客户端..." -ForegroundColor Yellow

for ($i = 0; $i -lt $ClientCount; $i++) {
    $user = $Users[$i]
    $userDataDir = "userData-client-$($user.ClientId)"
    
    Write-Host "`n--- 准备客户端 $($user.ClientId) ---" -ForegroundColor Cyan
    Write-Host "用户: $($user.Nickname) ($($user.Mobile))" -ForegroundColor White
    Write-Host "端口: $($user.Port)" -ForegroundColor White
    Write-Host "数据目录: $userDataDir" -ForegroundColor White
    
    # 创建用户数据目录
    if (!(Test-Path $userDataDir)) {
        New-Item -ItemType Directory -Path $userDataDir -Force | Out-Null
        Write-Host "✓ 创建用户数据目录" -ForegroundColor Green
    }
    
    # 设置环境变量并启动客户端
    $env:ELECTRON_USER_DATA = $userDataDir
    $env:VITE_DEV_PORT = $user.Port
    
    Write-Host "✓ 启动客户端..." -ForegroundColor Green
    
    # 在新的命令行窗口中启动
    $title = "WhyTalk-Client-$($user.ClientId)-$($user.Nickname)"
    $batchCommand = "title $title `& set ELECTRON_USER_DATA=$userDataDir `& set VITE_DEV_PORT=$($user.Port) `& cd /d D:\github_workspace\why-talk `& npm run dev"
    Start-Process cmd -ArgumentList "/k", $batchCommand
    
    Start-Sleep -Seconds 2
}

Write-Host "`n========================================" -ForegroundColor Green
Write-Host "客户端启动完成！" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green

Write-Host "`n访问地址:" -ForegroundColor Yellow
for ($i = 0; $i -lt $ClientCount; $i++) {
    $user = $Users[$i]
    Write-Host "  客户端 $($user.ClientId) ($($user.Nickname)): http://localhost:$($user.Port)" -ForegroundColor White
}

Write-Host "`n登录信息:" -ForegroundColor Yellow
for ($i = 0; $i -lt $ClientCount; $i++) {
    $user = $Users[$i]
    Write-Host "  $($user.Nickname): 手机号 $($user.Mobile), 密码 $($user.Password)" -ForegroundColor White
}

Write-Host "`nP2P测试步骤:" -ForegroundColor Yellow
Write-Host "1. 首先运行用户创建脚本: node create-multiple-users.js" -ForegroundColor White
Write-Host "2. 在浏览器中打开各个客户端地址" -ForegroundColor White
Write-Host "3. 使用对应的手机号和密码登录每个客户端" -ForegroundColor White
Write-Host "4. 检查P2P连接状态 (应该显示已连接)" -ForegroundColor White
Write-Host "5. 在一个客户端中添加另一个客户端为联系人" -ForegroundColor White
Write-Host "6. 尝试发送P2P消息进行测试" -ForegroundColor White

Write-Host "`n注意事项:" -ForegroundColor Red
Write-Host "- 每个客户端使用独立的用户账号和数据目录" -ForegroundColor White
Write-Host "- 确保所有端口都可用 (5173-5176)" -ForegroundColor White
Write-Host "- P2P网络需要时间建立连接，请耐心等待" -ForegroundColor White
Write-Host "- 如需停止，请关闭对应的命令行窗口" -ForegroundColor White

Write-Host "`n按任意键退出..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")