import { get, post } from './request'

// P2P 状态接口
export interface P2PStatus {
  isRunning: boolean
  peerId: string | null
  identity: any
}

// P2P 节点接口
export interface P2PPeer {
  id: string
  addresses: string[]
  lastSeen: number
  status: 'online' | 'offline'
}

// P2P 消息接口
export interface P2PMessage {
  id: string
  from: string
  to?: string
  groupId?: string
  type: 'text' | 'image' | 'file' | 'audio' | 'video'
  content: string
  timestamp: number
  signature?: string
}

// P2P 群组接口
export interface P2PGroup {
  groupId: string
  name: string
  description?: string
  creatorPeer: string
  createdAt: number
}

// P2P 联系人接口
export interface P2PContact {
  id: string
  name: string
  avatar?: string
  status: 'online' | 'offline' | 'away'
  lastSeen?: number
  publicKey: string
  peerId?: string
  nickname?: string
  remark?: string
  addedAt?: number
}

// 获取P2P状态
export const getP2PStatus = (): Promise<any> => {
  return get('/api/v1/p2p/status')
}

// 获取已发现的节点
export const getDiscoveredPeers = (): Promise<any> => {
  return get('/api/v1/p2p/peers')
}

// 发送P2P消息
export const sendP2PMessage = (data: {
  targetPeerId?: string
  groupId?: string
  type: string
  content: string
}): Promise<any> => {
  return post('/api/v1/p2p/message/send', data)
}

// 创建P2P群组
export const createP2PGroup = (data: { name: string; description?: string }): Promise<any> => {
  return post('/api/v1/p2p/group/create', data)
}

// 加入P2P群组
export const joinP2PGroup = (data: { groupId: string }): Promise<any> => {
  return post('/api/v1/p2p/group/join', data)
}

// 离开P2P群组
export const leaveP2PGroup = (data: { groupId: string }): Promise<any> => {
  return post('/api/v1/p2p/group/leave', data)
}

// 添加P2P联系人
export const addP2PContact = (data: {
  peerId: string
  nickname?: string
  remark?: string
}): Promise<any> => {
  return post('/api/v1/p2p/contact/add', data)
}

// 获取P2P联系人列表
export const getP2PContacts = (): Promise<any> => {
  return get('/api/v1/p2p/contact/list')
}

// 获取P2P消息历史
export const getP2PMessageHistory = (params: {
  peerId?: string
  groupId?: string
  limit?: number
}): Promise<any> => {
  return get('/api/v1/p2p/message/history', params)
}

// 连接到P2P节点
export const connectToP2PPeer = (data: { peerId: string }): Promise<any> => {
  return post('/api/v1/p2p/peer/connect', data)
}

// 断开P2P节点连接
export const disconnectFromP2PPeer = (data: { peerId: string }): Promise<any> => {
  return post('/api/v1/p2p/peer/disconnect', data)
}
