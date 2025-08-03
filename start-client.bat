@echo off
if "%1"=="" (
    echo Error: Please specify client ID (1-4)
    echo Usage: start-client.bat 1
    pause
    exit /b 1
)

set CLIENT_ID=%1

if "%CLIENT_ID%"=="1" (
    set USER_NAME=Alice
    set USER_MOBILE=13800138001
    set USER_PORT=5173
    set USER_DATA=userData-client-1
) else if "%CLIENT_ID%"=="2" (
    set USER_NAME=Bob
    set USER_MOBILE=13800138002
    set USER_PORT=5174
    set USER_DATA=userData-client-2
) else if "%CLIENT_ID%"=="3" (
    set USER_NAME=Charlie
    set USER_MOBILE=13800138003
    set USER_PORT=5175
    set USER_DATA=userData-client-3
) else if "%CLIENT_ID%"=="4" (
    set USER_NAME=Diana
    set USER_MOBILE=13800138004
    set USER_PORT=5176
    set USER_DATA=userData-client-4
) else (
    echo Error: Client ID must be 1-4
    pause
    exit /b 1
)

echo === Starting Client %CLIENT_ID% (%USER_NAME%) ===
echo Mobile: %USER_MOBILE%
echo Password: 123456
echo URL: http://localhost:%USER_PORT%
echo Data Dir: %USER_DATA%
echo.

set ELECTRON_USER_DATA=%USER_DATA%
if not "%CLIENT_ID%"=="1" (
    set VITE_DEV_PORT=%USER_PORT%
)

echo Starting client...
npm run dev