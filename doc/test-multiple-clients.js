#!/usr/bin/env node

/**
 * 多客户端P2P测试脚本
 * 用于在同一台电脑上启动多个WhyTalk客户端实例来测试P2P功能
 */

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// 配置
const CLIENT_COUNT = 2; // 要启动的客户端数量
const BASE_PORT = 5173; // 基础端口号
const BASE_P2P_PORT = 4001; // P2P服务基础端口

// 颜色输出
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// 创建用户数据目录
function createUserDataDir(clientId) {
  const userDataDir = path.join(__dirname, `userData-client-${clientId}`);
  if (!fs.existsSync(userDataDir)) {
    fs.mkdirSync(userDataDir, { recursive: true });
    log(`创建用户数据目录: ${userDataDir}`, 'green');
  }
  return userDataDir;
}

// 创建环境配置文件
function createEnvFile(clientId, port, p2pPort) {
  const envContent = `ENV = 'development'

# 插件数据库配置
USE_MOCK_DB=false

VITE_BASE=/
VITE_ROUTER_MODE=hash

# P2P模式配置 - 客户端 ${clientId}
VITE_P2P_MODE=true
VITE_P2P_PORT=${p2pPort}
VITE_P2P_BOOTSTRAP_NODES=/ip4/127.0.0.1/tcp/4001/p2p/QmBootstrapNode

# 开发服务器端口
VITE_DEV_PORT=${port}

# RSA 公钥 (P2P身份验证使用)
VITE_RSA_PUBLIC_KEY="-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1JqqxPLNWEy371X+kOXq
wE8fMebohqHI9txXRoUIh28dYsrv85JTrknLlPcYWT5Q27nHGcywu8hpsjMwe1U2
akHikIzLYEu/8GaGqI7qHa+73F54lVKHBcwdK8PjH8+o76kN9MsouJ8QA7Nk0g4u
6equEzyrchwjr/bOjP4MhPt4hU90jpQbp3tqDu6PQgPQZzxDtIX9TeqzplCAYNy2
M4i1HtbZk2a9vimFqTsM8i+ALPH47c+Bt4b4mLoKqSyF6K1muhV/kqfecV8fvyfN
bkJdUkWQnNvgTX0f1nhAshArLMw4VyROrYBAamFgtzwRpC4qCYhBzWqyhb10bEEf
XwIDAQAB
-----END PUBLIC KEY-----"`;

  const envPath = path.join(__dirname, `.env.client-${clientId}`);
  fs.writeFileSync(envPath, envContent);
  log(`创建环境配置文件: ${envPath}`, 'green');
  return envPath;
}

// 启动客户端
function startClient(clientId) {
  const port = BASE_PORT + clientId - 1;
  const p2pPort = BASE_P2P_PORT + clientId - 1;
  const userDataDir = createUserDataDir(clientId);
  const envPath = createEnvFile(clientId, port, p2pPort);
  
  log(`\n启动客户端 ${clientId}:`, 'cyan');
  log(`  - 端口: ${port}`, 'yellow');
  log(`  - P2P端口: ${p2pPort}`, 'yellow');
  log(`  - 用户数据目录: ${userDataDir}`, 'yellow');
  log(`  - 环境配置: ${envPath}`, 'yellow');

  const env = {
    ...process.env,
    ELECTRON_USER_DATA_DIR: userDataDir,
    NODE_ENV: 'development'
  };

  // 复制环境变量文件内容到进程环境
  const envContent = fs.readFileSync(envPath, 'utf8');
  const envLines = envContent.split('\n');
  envLines.forEach(line => {
    const match = line.match(/^([^#][^=]+)=(.*)$/);
    if (match) {
      const [, key, value] = match;
      env[key.trim()] = value.trim().replace(/^["']|["']$/g, '');
    }
  });

  const child = spawn('npm', ['run', 'dev'], {
    env,
    stdio: 'pipe',
    shell: true,
    cwd: __dirname
  });

  // 输出日志
  child.stdout.on('data', (data) => {
    const message = data.toString().trim();
    if (message) {
      log(`[客户端${clientId}] ${message}`, 'blue');
    }
  });

  child.stderr.on('data', (data) => {
    const message = data.toString().trim();
    if (message) {
      log(`[客户端${clientId}] ${message}`, 'red');
    }
  });

  child.on('close', (code) => {
    log(`客户端 ${clientId} 退出，代码: ${code}`, code === 0 ? 'green' : 'red');
  });

  child.on('error', (err) => {
    log(`客户端 ${clientId} 启动失败: ${err.message}`, 'red');
  });

  return child;
}

// 主函数
async function main() {
  log('='.repeat(60), 'cyan');
  log('WhyTalk P2P 多客户端测试工具', 'cyan');
  log('='.repeat(60), 'cyan');
  
  log(`\n准备启动 ${CLIENT_COUNT} 个客户端实例...`, 'green');
  
  const clients = [];
  
  // 启动所有客户端
  for (let i = 1; i <= CLIENT_COUNT; i++) {
    const client = startClient(i);
    clients.push(client);
    
    // 等待一段时间再启动下一个客户端
    if (i < CLIENT_COUNT) {
      log(`等待 3 秒后启动下一个客户端...`, 'yellow');
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }

  log('\n所有客户端已启动！', 'green');
  log('\n访问地址:', 'cyan');
  for (let i = 1; i <= CLIENT_COUNT; i++) {
    const port = BASE_PORT + i - 1;
    log(`  客户端 ${i}: http://localhost:${port}`, 'yellow');
  }

  log('\nP2P测试说明:', 'cyan');
  log('1. 等待所有客户端完全启动', 'yellow');
  log('2. 在每个客户端中导航到 P2P 管理页面', 'yellow');
  log('3. 检查 P2P 服务状态', 'yellow');
  log('4. 查看是否能发现其他节点', 'yellow');
  log('5. 尝试添加联系人和发送消息', 'yellow');

  log('\n按 Ctrl+C 停止所有客户端', 'red');

  // 处理退出信号
  process.on('SIGINT', () => {
    log('\n正在停止所有客户端...', 'yellow');
    clients.forEach((client, index) => {
      if (client && !client.killed) {
        log(`停止客户端 ${index + 1}`, 'yellow');
        client.kill('SIGTERM');
      }
    });
    
    setTimeout(() => {
      log('所有客户端已停止', 'green');
      process.exit(0);
    }, 2000);
  });
}

// 运行
main().catch(err => {
  log(`启动失败: ${err.message}`, 'red');
  process.exit(1);
});