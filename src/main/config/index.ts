import { app } from 'electron'
import { join } from 'path'

export interface AppConfig {
  database: {
    path: string
    backupPath: string
  }
  auth: {
    jwtSecret: string
    jwtExpiresIn: string
    refreshTokenExpiresIn: string
  }
  upload: {
    maxFileSize: number // bytes
    allowedTypes: string[]
    uploadPath: string
  }
  chat: {
    maxMessageLength: number
    maxHistoryDays: number
  }
  user: {
    offlineTimeoutMinutes: number
  }
}

const userDataPath = app.isReady() ? app.getPath('userData') : join(process.cwd(), 'userData')

export const config: AppConfig = {
  database: {
    path: join(userDataPath, 'whytalk.db'),
    backupPath: join(userDataPath, 'backups')
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET || 'whytalk-default-secret-change-in-production',
    jwtExpiresIn: '7d',
    refreshTokenExpiresIn: '30d'
  },
  upload: {
    maxFileSize: 100 * 1024 * 1024, // 100MB
    allowedTypes: [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'video/mp4',
      'video/webm',
      'audio/mp3',
      'audio/wav',
      'audio/ogg',
      'application/pdf',
      'text/plain',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ],
    uploadPath: join(userDataPath, 'uploads')
  },
  chat: {
    maxMessageLength: 5000,
    maxHistoryDays: 365
  },
  user: {
    offlineTimeoutMinutes: 5
  }
}

// 确保必要的目录存在
import { existsSync, mkdirSync } from 'fs'

export function ensureDirectories(): void {
  const dirs = [
    config.upload.uploadPath,
    config.database.backupPath
  ]

  for (const dir of dirs) {
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true })
    }
  }
}

export default config