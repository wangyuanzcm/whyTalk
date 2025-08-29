import * as fs from 'fs'
import * as path from 'path'
import { app } from 'electron'

/**
 * 日志条目接口
 */
interface LogEntry {
  timestamp: string
  level: string
  message: string
  source: string
  url?: string
  userAgent?: string
  [key: string]: any
}

/**
 * 日志写入请求接口
 */
interface LogWriteRequest {
  logs: LogEntry[]
  enableFileLogging?: boolean
}

/**
 * 日志服务
 * 负责处理前端发送的日志数据，支持控制台输出和文件写入
 */
export class LoggerService {
  private logDir: string
  private maxFileSize: number = 10 * 1024 * 1024 // 10MB
  private maxFiles: number = 5
  private enableConsoleOutput: boolean = true
  private enableFileOutput: boolean = true

  constructor() {
    // 设置日志目录
    this.logDir = path.join(app.getPath('userData'), 'logs')
    this.ensureLogDirectory()
  }

  /**
   * 确保日志目录存在
   */
  private ensureLogDirectory(): void {
    try {
      if (!fs.existsSync(this.logDir)) {
        fs.mkdirSync(this.logDir, { recursive: true })
      }
    } catch (error) {
      console.error('创建日志目录失败:', error)
    }
  }

  /**
   * 写入日志
   * @param request 日志写入请求
   */
  async writeLog(request: LogWriteRequest): Promise<void> {
    const { logs, enableFileLogging = true } = request

    for (const log of logs) {
      // 输出到控制台
      if (this.enableConsoleOutput) {
        this.outputToConsole(log)
      }

      // 写入到文件
      if (this.enableFileOutput && enableFileLogging) {
        await this.writeToFile(log)
      }
    }
  }

  /**
   * 输出日志到控制台
   * @param log 日志条目
   */
  private outputToConsole(log: LogEntry): void {
    const timestamp = new Date(log.timestamp).toLocaleString('zh-CN')
    const prefix = `[${timestamp}] [${log.source}] [${log.level.toUpperCase()}]`

    switch (log.level.toLowerCase()) {
      case 'error':
        console.error(`${prefix} ${log.message}`)
        break
      case 'warn':
        console.warn(`${prefix} ${log.message}`)
        break
      case 'debug':
        console.debug(`${prefix} ${log.message}`)
        break
      case 'info':
      default:
        console.log(`${prefix} ${log.message}`)
        break
    }
  }

  /**
   * 写入日志到文件
   * @param log 日志条目
   */
  private async writeToFile(log: LogEntry): Promise<void> {
    try {
      const today = new Date().toISOString().split('T')[0]
      const logFileName = `${log.source}-${today}.log`
      const logFilePath = path.join(this.logDir, logFileName)

      // 检查文件大小，如果超过限制则轮转
      await this.rotateLogFileIfNeeded(logFilePath)

      // 格式化日志条目
      const logLine = this.formatLogEntry(log)

      // 追加到文件
      await fs.promises.appendFile(logFilePath, logLine + '\n', 'utf8')
    } catch (error) {
      console.error('写入日志文件失败:', error)
    }
  }

  /**
   * 格式化日志条目
   * @param log 日志条目
   * @returns 格式化后的日志字符串
   */
  private formatLogEntry(log: LogEntry): string {
    const timestamp = new Date(log.timestamp).toISOString()
    const baseInfo = {
      timestamp,
      level: log.level.toUpperCase(),
      source: log.source,
      message: log.message
    }

    // 添加额外信息
    const extraInfo: any = {}
    Object.keys(log).forEach((key) => {
      if (!['timestamp', 'level', 'source', 'message'].includes(key)) {
        extraInfo[key] = log[key]
      }
    })

    const logData = Object.keys(extraInfo).length > 0 ? { ...baseInfo, extra: extraInfo } : baseInfo

    return JSON.stringify(logData)
  }

  /**
   * 轮转日志文件（如果需要）
   * @param logFilePath 日志文件路径
   */
  private async rotateLogFileIfNeeded(logFilePath: string): Promise<void> {
    try {
      if (!fs.existsSync(logFilePath)) {
        return
      }

      const stats = await fs.promises.stat(logFilePath)
      if (stats.size < this.maxFileSize) {
        return
      }

      // 轮转文件
      const dir = path.dirname(logFilePath)
      const ext = path.extname(logFilePath)
      const baseName = path.basename(logFilePath, ext)

      // 移动现有文件
      for (let i = this.maxFiles - 1; i > 0; i--) {
        const oldFile = path.join(dir, `${baseName}.${i}${ext}`)
        const newFile = path.join(dir, `${baseName}.${i + 1}${ext}`)

        if (fs.existsSync(oldFile)) {
          if (i === this.maxFiles - 1) {
            // 删除最旧的文件
            await fs.promises.unlink(oldFile)
          } else {
            await fs.promises.rename(oldFile, newFile)
          }
        }
      }

      // 重命名当前文件
      const rotatedFile = path.join(dir, `${baseName}.1${ext}`)
      await fs.promises.rename(logFilePath, rotatedFile)
    } catch (error) {
      console.error('日志文件轮转失败:', error)
    }
  }

  /**
   * 获取日志文件列表
   * @returns 日志文件列表
   */
  async getLogFiles(): Promise<string[]> {
    try {
      const files = await fs.promises.readdir(this.logDir)
      return files.filter((file) => file.endsWith('.log'))
    } catch (error) {
      console.error('获取日志文件列表失败:', error)
      return []
    }
  }

  /**
   * 读取日志文件内容
   * @param fileName 文件名
   * @param lines 读取行数（从末尾开始）
   * @returns 日志内容
   */
  async readLogFile(fileName: string, lines: number = 100): Promise<string[]> {
    try {
      const filePath = path.join(this.logDir, fileName)
      if (!fs.existsSync(filePath)) {
        return []
      }

      const content = await fs.promises.readFile(filePath, 'utf8')
      const allLines = content.split('\n').filter((line) => line.trim())

      // 返回最后 N 行
      return allLines.slice(-lines)
    } catch (error) {
      console.error('读取日志文件失败:', error)
      return []
    }
  }

  /**
   * 清理旧日志文件
   * @param daysToKeep 保留天数
   */
  async cleanupOldLogs(daysToKeep: number = 30): Promise<void> {
    try {
      const files = await fs.promises.readdir(this.logDir)
      const cutoffTime = Date.now() - daysToKeep * 24 * 60 * 60 * 1000

      for (const file of files) {
        if (!file.endsWith('.log')) continue

        const filePath = path.join(this.logDir, file)
        const stats = await fs.promises.stat(filePath)

        if (stats.mtime.getTime() < cutoffTime) {
          await fs.promises.unlink(filePath)
          console.log(`已删除旧日志文件: ${file}`)
        }
      }
    } catch (error) {
      console.error('清理旧日志文件失败:', error)
    }
  }

  /**
   * 设置控制台输出开关
   * @param enable 是否启用
   */
  setConsoleOutput(enable: boolean): void {
    this.enableConsoleOutput = enable
  }

  /**
   * 设置文件输出开关
   * @param enable 是否启用
   */
  setFileOutput(enable: boolean): void {
    this.enableFileOutput = enable
  }

  /**
   * 获取日志目录路径
   * @returns 日志目录路径
   */
  getLogDirectory(): string {
    return this.logDir
  }

  /**
   * 记录信息日志
   * @param message 日志消息
   * @param extra 额外信息
   */
  info(message: string, extra?: any): void {
    this.log('info', message, extra)
  }

  /**
   * 记录错误日志
   * @param message 日志消息
   * @param extra 额外信息
   */
  error(message: string, extra?: any): void {
    this.log('error', message, extra)
  }

  /**
   * 记录警告日志
   * @param message 日志消息
   * @param extra 额外信息
   */
  warn(message: string, extra?: any): void {
    this.log('warn', message, extra)
  }

  /**
   * 记录调试日志
   * @param message 日志消息
   * @param extra 额外信息
   */
  debug(message: string, extra?: any): void {
    this.log('debug', message, extra)
  }

  /**
   * 通用日志记录方法
   * @param level 日志级别
   * @param message 日志消息
   * @param extra 额外信息
   */
  private log(level: string, message: string, extra?: any): void {
    const logEntry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      source: 'main',
      ...extra
    }

    // 输出到控制台
    if (this.enableConsoleOutput) {
      this.outputToConsole(logEntry)
    }

    // 写入到文件
    if (this.enableFileOutput) {
      this.writeToFile(logEntry).catch((error) => {
        console.error('写入日志文件失败:', error)
      })
    }
  }
}

// 导出单例
export const loggerService = new LoggerService()
