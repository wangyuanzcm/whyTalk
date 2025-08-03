import { createIpcApi } from './ipc-request.ts'

// 获取聊天列表服务接口
export const ServTalkList = createIpcApi('/api/v1/talk/list')

// 聊天列表创建服务接口
export const ServTalkCreate = createIpcApi<any, null>('/api/v1/talk/create')

// 删除聊天列表服务接口
export const ServTalkDelete = createIpcApi<ServTalkDeleteRequest, null>('/api/v1/talk/delete')

// 对话列表置顶服务接口
export const ServTalkTopping = createIpcApi<ServTalkToppingRequest, null>('/api/v1/talk/topping')

// 清除聊天消息未读数服务接口
export const ServTalkClearUnread = createIpcApi('/api/v1/talk/clear-unread')

// 获取聊天记录服务接口
export const ServTalkRecords = createIpcApi<ServTalkRecordsRequest, any>('/api/v1/talk/records')

// 查找用户聊天记录服务接口
export const ServTalkHistoryRecords = createIpcApi('/api/v1/talk/history-records')

// 获取转发会话记录详情列表服务接口
export const ServTalkForwardRecords = createIpcApi('/api/v1/talk/forward-records')

// 对话列表置顶服务接口
export const ServTalkDisturb = createIpcApi('/api/v1/talk/disturb')

// 发送代码块消息服务接口
export const ServTalkMessageSend = createIpcApi<ServTalkMessageSendRequest, null>(
  '/api/v1/talk/message/send'
)

// 撤回消息服务接口
export const ServTalkMessageRevoke = createIpcApi<ServTalkMessageRevokeRequest, null>(
  '/api/v1/talk/message/revoke'
)

// 删除消息服务接口
export const ServTalkMessageDelete = createIpcApi<ServTalkMessageDeleteRequest, any>(
  '/api/v1/talk/message/delete'
)

interface ServTalkRecordsRequest {
  cursor: number
  limit: number
  talk_mode: number
  to_from_id: number
}

interface ServTalkMessageDeleteRequest {
  msg_ids: string[]
  talk_mode: number
  to_from_id: number
}

interface ServTalkMessageSendRequest {
  type: string
  quote_id?: string
  body: any
  talk_mode: number
  to_from_id: number
  msg_id?: string
}

interface ServTalkMessageRevokeRequest {
  talk_mode: number
  to_from_id: number
  msg_id: string
}

interface ServTalkToppingRequest {
  talk_mode: number
  to_from_id: number
  action: number
}

interface ServTalkDeleteRequest {
  talk_mode: number
  to_from_id: number
}
