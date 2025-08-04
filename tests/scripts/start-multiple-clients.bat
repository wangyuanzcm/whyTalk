@echo off
echo ========================================
echo WhyTalk P2P 多客户端测试工具
echo ========================================
echo.

echo 正在准备启动多个客户端实例...
echo.

REM 创建用户数据目录
if not exist "userData-client-1" mkdir "userData-client-1"
if not exist "userData-client-2" mkdir "userData-client-2"

echo 客户端目录已创建
echo.

echo 启动客户端 1 (端口 5173)...
start "WhyTalk Client 1" cmd /k "set ELECTRON_USER_DATA_DIR=%cd%\userData-client-1 && npm run dev"

echo 等待 5 秒...
timeout /t 5 /nobreak > nul

echo 启动客户端 2 (端口 5174)...
start "WhyTalk Client 2" cmd /k "set ELECTRON_USER_DATA_DIR=%cd%\userData-client-2 && set VITE_DEV_PORT=5174 && npm run dev"

echo.
echo ========================================
echo 所有客户端已启动！
echo ========================================
echo.
echo 访问地址:
echo   客户端 1: http://localhost:5173
echo   客户端 2: http://localhost:5174
echo.
echo P2P测试步骤:
echo 1. 等待两个客户端完全启动
echo 2. 在浏览器中分别打开两个地址
echo 3. 登录到应用（可以使用相同或不同的账号）
echo 4. 导航到 P2P 管理页面
echo 5. 检查 P2P 服务状态
echo 6. 查看是否能发现其他节点
echo 7. 尝试添加联系人和发送消息
echo.
echo 按任意键关闭此窗口...
pause > nul