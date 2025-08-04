import { writeFileSync, existsSync, mkdirSync, statSync } from 'fs'
import { join, extname } from 'path'
import { v4 as uuidv4 } from 'uuid'
import { config } from '../../config'

export interface UploadResult {
  file_id: string
  file_name: string
  file_size: number
  file_type: string
  file_url: string
  upload_time: string
}

export class UploadService {
  private isInitialized = false

  // 初始化上传服务
  public async initialize(): Promise<void> {
    if (this.isInitialized) {
      return
    }
    
    try {
      // 确保上传目录存在
      if (!existsSync(config.upload.uploadPath)) {
        mkdirSync(config.upload.uploadPath, { recursive: true })
      }
      
      // 清理过期文件
      await this.cleanupExpiredFiles()
      this.isInitialized = true
      console.log('UploadService initialized')
    } catch (error) {
      console.error('Failed to initialize UploadService:', error)
      throw error
    }
  }
  
  // 上传文件
  public async uploadFile(
    buffer: Buffer, 
    originalName: string, 
    mimeType: string,
    _userId: number
  ): Promise<UploadResult> {
    try {
      // 验证文件大小
      if (buffer.length > config.upload.maxFileSize) {
        throw new Error(`文件大小超过限制 ${config.upload.maxFileSize / 1024 / 1024}MB`)
      }

      // 验证文件类型
      if (!config.upload.allowedTypes.includes(mimeType)) {
        throw new Error('不支持的文件类型')
      }

      // 生成文件ID和路径
      const fileId = uuidv4()
      const fileExt = extname(originalName)
      const fileName = `${fileId}${fileExt}`
      
      // 按日期创建目录结构
      const now = new Date()
      const dateDir = `${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, '0')}/${String(now.getDate()).padStart(2, '0')}`
      const uploadDir = join(config.upload.uploadPath, dateDir)
      
      // 确保目录存在
      if (!existsSync(uploadDir)) {
        mkdirSync(uploadDir, { recursive: true })
      }

      // 保存文件
      const filePath = join(uploadDir, fileName)
      writeFileSync(filePath, buffer)

      // 生成文件URL（相对路径）
      const fileUrl = `/uploads/${dateDir}/${fileName}`

      const result: UploadResult = {
        file_id: fileId,
        file_name: originalName,
        file_size: buffer.length,
        file_type: mimeType,
        file_url: fileUrl,
        upload_time: new Date().toISOString()
      }

      console.log('File uploaded successfully:', result)
      return result

    } catch (error) {
      console.error('File upload failed:', error)
      throw error
    }
  }

  // 获取文件信息
  public getFileInfo(_fileId: string): UploadResult | null {
    try {
      // 这里可以从数据库或文件系统中获取文件信息
      // 暂时返回null，实际应用中需要实现文件信息的存储和检索
      return null
    } catch (error) {
      console.error('Failed to get file info:', error)
      return null
    }
  }

  // 删除文件
  public async deleteFile(fileId: string, _userId: number): Promise<void> {
    try {
      // 这里应该实现文件删除逻辑
      // 包括从文件系统删除文件和从数据库删除记录
      console.log('File deleted:', fileId)
    } catch (error) {
      console.error('Failed to delete file:', error)
      throw error
    }
  }

  // 验证文件是否存在
  public fileExists(filePath: string): boolean {
    try {
      const fullPath = join(config.upload.uploadPath, filePath.replace('/uploads/', ''))
      return existsSync(fullPath)
    } catch (error) {
      return false
    }
  }

  // 获取文件大小
  public getFileSize(filePath: string): number {
    try {
      const fullPath = join(config.upload.uploadPath, filePath.replace('/uploads/', ''))
      const stats = statSync(fullPath)
      return stats.size
    } catch (error) {
      return 0
    }
  }

  // 清理过期文件（可以定期调用）
// 清理过期文件
  public async cleanupExpiredFiles(): Promise<void> {
    try {
      // 这里可以实现清理过期文件的逻辑
      console.log('Cleanup expired files')
    } catch (error) {
      console.error('Failed to cleanup expired files:', error)
    }
  }

  // 清理资源
  public async cleanup(): Promise<void> {
    try {
      this.isInitialized = false
      console.log('UploadService cleanup completed')
    } catch (error) {
      console.error('Error during UploadService cleanup:', error)
      throw error
    }
  }
}

export const uploadService = new UploadService()