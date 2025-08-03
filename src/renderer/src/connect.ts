import { NAvatar } from 'naive-ui'
import { h } from 'vue'
import { useTalkStore, useUserStore } from '@/store'
import { notifyIcon } from '@/constant/default'
import WsSocket from '@/plugins/websocket.ts'
import EventTalk from '@/event/talk.ts'
import EventKeyboard from '@/event/keyboard.ts'
import EventRevoke from '@/event/revoke.ts'
import { getToken, isLogin } from '@/utils/auth.ts'

const urlCallback = () => {
  if (!isLogin()) {
    window.location.reload()
  }

  // 检查是否为 P2P 模式
  if (import.meta.env.VITE_P2P_MODE === 'true') {
    // P2P 模式下不使用 WebSocket
    return null
  }

  // 检查 SOCKET_API 是否配置
  if (!import.meta.env.VITE_SOCKET_API) {
    console.warn('VITE_SOCKET_API not configured, skipping WebSocket connection')
    return null
  }

  return `${import.meta.env.VITE_SOCKET_API}/wss/default.io?token=${getToken()}`
}

class Connect {
  private conn: WsSocket | null = null
  private isP2PMode: boolean
  private initialized: boolean = false

  constructor() {
    this.isP2PMode = import.meta.env.VITE_P2P_MODE === 'true'
  }

  private initialize() {
    if (this.initialized) return
    this.initialized = true
    
    if (!this.isP2PMode && import.meta.env.VITE_SOCKET_API) {
      const url = urlCallback()
      if (!url) {
        console.warn('WebSocket URL is null, skipping connection')
        return
      }
      this.conn = new WsSocket(() => url, {
        onError: () => {
          // console.error('WebSocket 连接失败:', evt)
        },
        onOpen: () => {
          useUserStore().updateSocketStatus(true)
          // 只有在用户已登录时才加载对话列表
          if (isLogin()) {
            useTalkStore().loadTalkList()
          }
        },
        onClose: () => {
          useUserStore().updateSocketStatus(false)
        }
      })

      this.bindEvents()
    } else {
      console.log('P2P mode enabled, skipping WebSocket connection')
      // 在 P2P 模式下，直接设置为已连接状态
      useUserStore().updateSocketStatus(true)
      // 只有在用户已登录时才加载对话列表
      if (isLogin()) {
        useTalkStore().loadTalkList()
      }
    }
  }

  connect() {
    this.initialize()
    if (this.isP2PMode) {
      console.log('P2P mode: connect() called but using P2P instead of WebSocket')
      return
    }
    this.conn?.connection()
  }

  disconnect() {
    this.initialize()
    if (this.isP2PMode) {
      console.log('P2P mode: disconnect() called but using P2P instead of WebSocket')
      return
    }
    this.conn?.close()
  }

  isConnect() {
    this.initialize()
    if (this.isP2PMode) {
      // 在 P2P 模式下，假设总是连接的
      return true
    }
    return this.conn?.connect?.readyState === WebSocket.OPEN
  }

  emit(event: string, data: any) {
    this.initialize()
    if (this.isP2PMode) {
      console.log('P2P mode: emit() called but using P2P instead of WebSocket', event, data)
      return
    }
    this.conn?.emit(event, data)
  }

  bindEvents() {
    if (this.isP2PMode || !this.conn) {
      console.log('P2P mode: skipping WebSocket event binding')
      return
    }
    
    this.onPing()
    this.onPong()
    this.onImMessage()
    this.onImMessageKeyboard()
    this.onImMessageRevoke()
    this.onImContactApply()
    this.onImGroupApply()
    this.onEventError()
  }

  onPing() {
    this.conn?.on('ping', () => this.emit('pong', ''))
  }

  onPong() {
    this.conn?.on('pong', () => {})
    this.conn?.on('connect', () => {})
  }

  onImMessage() {
    this.conn?.on('im.message', (data: any) => new EventTalk(data))
  }

  onImMessageKeyboard() {
    this.conn?.on('im.message.keyboard', (data: any) => new EventKeyboard(data))
  }

  onImMessageRevoke() {
    this.conn?.on('im.message.revoke', (data: any) => new EventRevoke(data))
  }

  onImContactApply() {
    this.conn?.on('im.contact.apply', (data: any) => {
      window['$notification']?.create({
        title: '好友申请通知',
        content: data.remark,
        description: `申请人: ${data.nickname}`,
        meta: data.apply_time,
        avatar: () =>
          h(NAvatar, {
            size: 'small',
            round: true,
            src: notifyIcon,
            style: 'background-color:#fff;'
          }),
        duration: 10000
      })

      useUserStore().isContactApply = true
    })
  }

  onImGroupApply() {
    this.conn?.on('im.group.apply', () => {
      window['$notification']?.create({
        title: '入群申请通知',
        content: '有新的入群申请，请注意查收',
        avatar: () =>
          h(NAvatar, {
            size: 'small',
            round: true,
            src: notifyIcon,
            style: 'background-color:#fff;'
          }),
        duration: 10000
      })

      useUserStore().isGroupApply = true
    })
  }

  onEventError() {
    this.conn?.on('event_error', (data: any) => {
      console.error('WebSocket事件错误:', data)
      window['$message']?.error(`错误代码: ${data.error_code} - ${data.error_message}`)
    })
  }
}

// 导出单例
export default new Connect()
