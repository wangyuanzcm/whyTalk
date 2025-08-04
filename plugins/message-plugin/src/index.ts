/**
 * 消息插件主入口文件
 */

// 导出服务类
export { MessageService } from './services/MessageService'
export { ConversationService } from './services/ConversationService'

// 导出SDK
export { MessageSDK, createMessageSDK } from './sdk/MessageSDK'

// 导出类型定义
export type {
  Message,
  Conversation,
  SendMessageRequest,
  MessageHistory,
  SearchMessageRequest
} from './sdk/MessageSDK'

// 导出服务接口类型
export type {
  Message as MessageInterface,
  SendMessageRequest as SendMessageRequestInterface,
  MessageHistory as MessageHistoryInterface,
  SearchMessageRequest as SearchMessageRequestInterface,
  P2PMessage,
  FileUploadRequest,
  VoiceUploadRequest,
  ImageUploadRequest,
  MessageEncryption,
  MessageStatus,
  MessageSyncRequest
} from './services/MessageService'

export type {
  Conversation as ConversationInterface,
  CreateConversationRequest,
  UpdateConversationRequest,
  ConversationList,
  ConversationStats,
  BatchConversationRequest,
  SearchConversationRequest,
  ConversationEvent
} from './services/ConversationService'

// 插件信息
export const PLUGIN_INFO = {
  id: 'message-plugin',
  name: '消息插件',
  version: '1.0.0',
  description: '提供消息发送、接收和会话管理功能',
  author: 'Why Talk Team',
  permissions: [
    'messages:read',
    'messages:write',
    'conversations:read',
    'conversations:write',
    'files:upload',
    'p2p:message'
  ]
}

// 默认导出插件信息
export default PLUGIN_INFO