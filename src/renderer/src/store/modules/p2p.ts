/**
 * P2P状态管理
 */

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface P2PContact {
  id: string
  name: string
  avatar?: string
  status: 'online' | 'offline' | 'away'
  lastSeen?: number
  publicKey: string
}

export interface P2PMessage {
  id: string
  from: string
  to: string
  content: string
  type: 'text' | 'image' | 'file' | 'video' | 'audio'
  timestamp: number
  status: 'sending' | 'sent' | 'delivered' | 'read' | 'failed'
  groupId?: string
}

export interface P2PGroup {
  id: string
  name: string
  description?: string
  avatar?: string
  members: string[]
  admins: string[]
  owner: string
  createdAt: number
}

export interface P2PNode {
  id: string
  address: string
  status: 'connected' | 'disconnected'
  lastSeen: number
  protocols: string[]
}

export const useP2PStore = defineStore('p2p', () => {
  // 连接状态
  const isConnected = ref(false)
  const isInitialized = ref(false)
  const nodeId = ref<string>('')
  const networkStatus = ref<'connecting' | 'connected' | 'disconnected' | 'error'>('disconnected')

  // 联系人数据
  const contacts = ref<P2PContact[]>([])
  const contactRequests = ref<any[]>([])

  // 消息数据
  const messages = ref<P2PMessage[]>([])
  const unreadCount = ref(0)

  // 群组数据
  const groups = ref<P2PGroup[]>([])

  // 节点数据
  const discoveredNodes = ref<P2PNode[]>([])
  const connectedPeers = ref<P2PNode[]>([])

  // 计算属性
  const onlineContacts = computed(() =>
    contacts.value.filter((contact) => contact.status === 'online')
  )

  const totalUnreadMessages = computed(
    () => messages.value.filter((msg) => msg.status !== 'read').length
  )

  // Actions
  const setConnectionStatus = (status: boolean) => {
    isConnected.value = status
    if (!status) {
      networkStatus.value = 'disconnected'
    }
  }

  const setNetworkStatus = (status: typeof networkStatus.value) => {
    networkStatus.value = status
  }

  const setNodeId = (id: string) => {
    nodeId.value = id
  }

  const setInitialized = (status: boolean) => {
    isInitialized.value = status
  }

  // 联系人管理
  const addContact = (contact: P2PContact) => {
    const existingIndex = contacts.value.findIndex((c) => c.id === contact.id)
    if (existingIndex >= 0) {
      contacts.value[existingIndex] = contact
    } else {
      contacts.value.push(contact)
    }
  }

  const removeContact = (contactId: string) => {
    const index = contacts.value.findIndex((c) => c.id === contactId)
    if (index >= 0) {
      contacts.value.splice(index, 1)
    }
  }

  const updateContactStatus = (contactId: string, status: P2PContact['status']) => {
    const contact = contacts.value.find((c) => c.id === contactId)
    if (contact) {
      contact.status = status
      contact.lastSeen = Date.now()
    }
  }

  const setContacts = (newContacts: P2PContact[]) => {
    contacts.value = newContacts
  }

  // 消息管理
  const addMessage = (message: P2PMessage) => {
    const existingIndex = messages.value.findIndex((m) => m.id === message.id)
    if (existingIndex >= 0) {
      messages.value[existingIndex] = message
    } else {
      messages.value.push(message)
      // 按时间排序
      messages.value.sort((a, b) => a.timestamp - b.timestamp)
    }
  }

  const updateMessageStatus = (messageId: string, status: P2PMessage['status']) => {
    const message = messages.value.find((m) => m.id === messageId)
    if (message) {
      message.status = status
    }
  }

  const markMessagesAsRead = (contactId: string) => {
    messages.value
      .filter((m) => m.from === contactId && m.status !== 'read')
      .forEach((m) => (m.status = 'read'))
  }

  const setMessages = (newMessages: P2PMessage[]) => {
    messages.value = newMessages.sort((a, b) => a.timestamp - b.timestamp)
  }

  // 群组管理
  const addGroup = (group: P2PGroup) => {
    const existingIndex = groups.value.findIndex((g) => g.id === group.id)
    if (existingIndex >= 0) {
      groups.value[existingIndex] = group
    } else {
      groups.value.push(group)
    }
  }

  const removeGroup = (groupId: string) => {
    const index = groups.value.findIndex((g) => g.id === groupId)
    if (index >= 0) {
      groups.value.splice(index, 1)
    }
  }

  const setGroups = (newGroups: P2PGroup[]) => {
    groups.value = newGroups
  }

  // 节点管理
  const setDiscoveredNodes = (nodes: P2PNode[]) => {
    discoveredNodes.value = nodes
  }

  const setConnectedPeers = (peers: P2PNode[]) => {
    connectedPeers.value = peers
  }

  const addDiscoveredNode = (node: P2PNode) => {
    const existingIndex = discoveredNodes.value.findIndex((n) => n.id === node.id)
    if (existingIndex >= 0) {
      discoveredNodes.value[existingIndex] = node
    } else {
      discoveredNodes.value.push(node)
    }
  }

  // 联系人请求管理
  const addContactRequest = (request: any) => {
    contactRequests.value.push(request)
  }

  const removeContactRequest = (requestId: string) => {
    const index = contactRequests.value.findIndex((r) => r.id === requestId)
    if (index >= 0) {
      contactRequests.value.splice(index, 1)
    }
  }

  const setContactRequests = (requests: any[]) => {
    contactRequests.value = requests
  }

  // 清理所有数据
  const clearAll = () => {
    isConnected.value = false
    isInitialized.value = false
    nodeId.value = ''
    networkStatus.value = 'disconnected'
    contacts.value = []
    messages.value = []
    groups.value = []
    discoveredNodes.value = []
    connectedPeers.value = []
    contactRequests.value = []
    unreadCount.value = 0
  }

  return {
    // 状态
    isConnected,
    isInitialized,
    nodeId,
    networkStatus,
    contacts,
    contactRequests,
    messages,
    unreadCount,
    groups,
    discoveredNodes,
    connectedPeers,

    // 计算属性
    onlineContacts,
    totalUnreadMessages,

    // Actions
    setConnectionStatus,
    setNetworkStatus,
    setNodeId,
    setInitialized,
    addContact,
    removeContact,
    updateContactStatus,
    setContacts,
    addMessage,
    updateMessageStatus,
    markMessagesAsRead,
    setMessages,
    addGroup,
    removeGroup,
    setGroups,
    setDiscoveredNodes,
    setConnectedPeers,
    addDiscoveredNode,
    addContactRequest,
    removeContactRequest,
    setContactRequests,
    clearAll
  }
})
