/**
 * LocalSend协议相关类型定义
 */

/** LocalSend设备接口 */
export interface LocalSendDevice {
  alias: string
  version: string
  deviceModel: string
  deviceType: 'mobile' | 'desktop' | 'web' | 'headless' | 'server'
  fingerprint: string
  port: number
  protocol: 'http' | 'https'
  download?: boolean
  announce?: boolean
}

/** LocalSend消息接口 */
export interface LocalSendMessage {
  id: string
  from: string
  to?: string
  type: 'text' | 'file'
  content: string
  timestamp: number
  files?: LocalSendFile[]
}

/** LocalSend文件接口 */
export interface LocalSendFile {
  id: string
  fileName: string
  size: number
  fileType: string
  sha256?: string
  preview?: string
  legacy?: boolean
}

/** LocalSend对等节点接口 */
export interface LocalSendPeer {
  ip: string
  port: number
  alias: string
  version: string
  deviceModel: string
  deviceType: string
  fingerprint: string
  protocol: 'http' | 'https'
  lastSeen: number
  download: boolean
  announce: boolean
}
