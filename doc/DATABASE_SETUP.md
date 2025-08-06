# 插件数据库配置说明

## 概述

插件系统支持两种数据库模式：

1. **SQLite 数据库** - 真实的持久化数据库，用于生产环境
2. **模拟数据库** - 内存中的临时数据库，用于开发和测试

## 配置方法

### 方法一：通过环境变量

在 `.env` 文件中设置：

```bash
# 使用模拟数据库（默认开发模式）
USE_MOCK_DB=true

# 使用真实 SQLite 数据库
USE_MOCK_DB=false
```

### 方法二：通过 NODE_ENV

- `NODE_ENV=development` - 默认使用模拟数据库
- `NODE_ENV=production` - 默认使用 SQLite 数据库

## Better-SQLite3 编译问题解决

如果遇到 `better-sqlite3` 模块版本不兼容的问题：

### Windows 系统

```bash
# 重新编译 better-sqlite3
pnpm rebuild better-sqlite3

# 或者重新安装
pnpm remove better-sqlite3
pnpm add better-sqlite3

# 如果仍有问题，手动编译
npm install --build-from-source better-sqlite3
```

### 手动编译步骤

1. 确保安装了 Visual Studio Build Tools 或 Visual Studio
2. 安装 Python 3.x
3. 运行编译命令：

```bash
npm config set msvs_version 2022
npm install --build-from-source better-sqlite3
```

## 数据库文件位置

SQLite 数据库文件默认保存在：

- Windows: `%APPDATA%/why-talk/plugins.db`
- macOS: `~/Library/Application Support/why-talk/plugins.db`
- Linux: `~/.config/why-talk/plugins.db`

## 功能对比

| 功能         | SQLite 数据库 | 模拟数据库 |
| ------------ | ------------- | ---------- |
| 数据持久化   | ✅            | ❌         |
| 插件配置保存 | ✅            | ✅ (临时)  |
| 安装记录     | ✅            | ✅ (临时)  |
| 使用统计     | ✅            | ✅ (临时)  |
| 性能         | 高            | 极高       |
| 适用场景     | 生产环境      | 开发测试   |

## 切换数据库模式

1. 修改 `.env` 文件中的 `USE_MOCK_DB` 值
2. 重启应用
3. 检查控制台日志确认数据库模式

## 故障排除

### 问题：better-sqlite3 加载失败

**解决方案：**

1. 设置 `USE_MOCK_DB=true` 使用模拟数据库
2. 重新编译 better-sqlite3 模块
3. 检查 Node.js 版本兼容性

### 问题：数据丢失

**解决方案：**

1. 确认使用的是 SQLite 模式 (`USE_MOCK_DB=false`)
2. 检查数据库文件是否存在
3. 备份重要的插件配置

### 问题：性能问题

**解决方案：**

1. 生产环境使用 SQLite 数据库
2. 定期清理过期的使用记录
3. 优化插件配置

## 开发建议

- **开发阶段**：使用模拟数据库 (`USE_MOCK_DB=true`)
- **测试阶段**：使用 SQLite 数据库测试持久化功能
- **生产环境**：必须使用 SQLite 数据库 (`USE_MOCK_DB=false`)
