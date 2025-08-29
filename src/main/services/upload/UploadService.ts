import { app } from 'electron'
import * as path from 'path'
import * as fs from 'fs/promises'
import { createWriteStream } from 'fs'
import { pipeline } from 'stream/promises'
import { Readable } from 'stream'

export interface UploadResult {
  success: boolean
  filePath?: string
  fileName?: string
  error?: string
}

export class UploadService {
  private uploadDir: string
  private isInitialized = false

  constructor() {
    this.uploadDir = path.join(app.getPath('userData'), 'uploads')
  }

  /**
   * 初始化上传服务
   */
  async initialize(): Promise<void> {
    if (this.isInitialized) {
      return
    }

    await this.ensureUploadDir()
    this.isInitialized = true
    console.log('UploadService initialized')
  }

  private async ensureUploadDir(): Promise<void> {
    try {
      await fs.access(this.uploadDir)
    } catch {
      await fs.mkdir(this.uploadDir, { recursive: true })
    }
  }

  /**
   * 上传文件到本地存储
   * @param fileBuffer 文件缓冲区
   * @param fileName 文件名
   * @returns 上传结果
   */
  async uploadFile(fileBuffer: Buffer, fileName: string): Promise<UploadResult> {
    try {
      await this.ensureUploadDir()

      // 生成唯一文件名
      const timestamp = Date.now()
      const ext = path.extname(fileName)
      const baseName = path.basename(fileName, ext)
      const uniqueFileName = `${baseName}_${timestamp}${ext}`

      const filePath = path.join(this.uploadDir, uniqueFileName)

      // 写入文件
      await fs.writeFile(filePath, fileBuffer)

      return {
        success: true,
        filePath,
        fileName: uniqueFileName
      }
    } catch (error) {
      console.error('Upload file error:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }

  /**
   * 从流上传文件
   * @param stream 可读流
   * @param fileName 文件名
   * @returns 上传结果
   */
  async uploadFromStream(stream: Readable, fileName: string): Promise<UploadResult> {
    try {
      await this.ensureUploadDir()

      // 生成唯一文件名
      const timestamp = Date.now()
      const ext = path.extname(fileName)
      const baseName = path.basename(fileName, ext)
      const uniqueFileName = `${baseName}_${timestamp}${ext}`

      const filePath = path.join(this.uploadDir, uniqueFileName)
      const writeStream = createWriteStream(filePath)

      // 使用 pipeline 处理流
      await pipeline(stream, writeStream)

      return {
        success: true,
        filePath,
        fileName: uniqueFileName
      }
    } catch (error) {
      console.error('Upload from stream error:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }

  /**
   * 删除上传的文件
   * @param fileName 文件名
   * @returns 是否删除成功
   */
  async deleteFile(fileName: string): Promise<boolean> {
    try {
      const filePath = path.join(this.uploadDir, fileName)
      await fs.unlink(filePath)
      return true
    } catch (error) {
      console.error('Delete file error:', error)
      return false
    }
  }

  /**
   * 获取文件信息
   * @param fileName 文件名
   * @returns 文件信息
   */
  async getFileInfo(fileName: string): Promise<{ exists: boolean; size?: number; path?: string }> {
    try {
      const filePath = path.join(this.uploadDir, fileName)
      const stats = await fs.stat(filePath)
      return {
        exists: true,
        size: stats.size,
        path: filePath
      }
    } catch {
      return { exists: false }
    }
  }

  /**
   * 列出所有上传的文件
   * @returns 文件列表
   */
  async listFiles(): Promise<string[]> {
    try {
      await this.ensureUploadDir()
      const files = await fs.readdir(this.uploadDir)
      return files.filter((file) => {
        // 过滤掉隐藏文件和目录
        return !file.startsWith('.')
      })
    } catch (error) {
      console.error('List files error:', error)
      return []
    }
  }

  /**
   * 获取上传目录路径
   * @returns 上传目录路径
   */
  getUploadDir(): string {
    return this.uploadDir
  }

  /**
   * 清理过期文件（超过指定天数的文件）
   * @param days 保留天数
   * @returns 清理的文件数量
   */
  async cleanupOldFiles(days: number = 30): Promise<number> {
    try {
      await this.ensureUploadDir()
      const files = await fs.readdir(this.uploadDir)
      const cutoffTime = Date.now() - days * 24 * 60 * 60 * 1000
      let cleanedCount = 0

      for (const file of files) {
        const filePath = path.join(this.uploadDir, file)
        const stats = await fs.stat(filePath)

        if (stats.mtime.getTime() < cutoffTime) {
          await fs.unlink(filePath)
          cleanedCount++
        }
      }

      return cleanedCount
    } catch (error) {
      console.error('Cleanup old files error:', error)
      return 0
    }
  }

  /**
   * 清理服务资源
   */
  async cleanup(): Promise<void> {
    // 上传服务没有需要特别清理的资源
    console.log('UploadService cleanup completed')
  }
}

// 导出单例实例
export const uploadService = new UploadService()
