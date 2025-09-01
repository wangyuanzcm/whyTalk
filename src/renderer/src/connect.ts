import { NAvatar } from 'naive-ui'
import { h } from 'vue'
import { useUserStore } from '@/store'
import { notifyIcon } from '@/constant/default'
import WsSocket from '@/plugins/websocket.ts'
// 以下事件处理器已迁移到插件中:
// import EventTalk from '@/event/talk.ts'
// import EventKeyboard from '@/event/keyboard.ts'
// import EventRevoke from '@/event/revoke.ts'
import { getToken, isLogin } from '@/utils/auth.ts'

const urlCallback = () => {
  if (!isLogin()) {
    window.location.reload()
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
  private initialized: boolean = false

  constructor() {
  }

  private initialize() {
    if (this.initialized) return
    this.initialized = true

    if (import.meta.env.VITE_SOCKET_API) {
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
          // TODO: 通过插件间通信加载对话列表
          // if (isLogin()) {
          //   useTalkStore().loadTalkList()
          // }
        },
        onClose: () => {
          useUserStore().updateSocketStatus(false)
        }
      })

      this.bindEvents()
    } else {
      useUserStore().updateSocketStatus(true)
      // TODO: 通过插件间通信加载对话列表
      // if (isLogin()) {
      //   useTalkStore().loadTalkList()
      // }
    }
  }

  connect() {
    this.initialize()
    this.conn?.connection()
  }

  disconnect() {
    this.initialize()
    this.conn?.close()
  }

  isConnect() {
    this.initialize()
    return this.conn?.connect?.readyState === WebSocket.OPEN
  }

  emit(event: string, data: any) {
    this.initialize()
    this.conn?.emit(event, data)
  }

  bindEvents() {
    if (!this.conn) {
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
    // TODO: 通过插件间通信处理消息事件
    this.conn?.on('im.message', (data: any) => {
      console.log('收到消息事件，需要转发到插件:', data)
    })
  }

  onImMessageKeyboard() {
    // TODO: 通过插件间通信处理键盘事件
    this.conn?.on('im.message.keyboard', (data: any) => {
      console.log('收到键盘事件，需要转发到插件:', data)
    })
  }

  onImMessageRevoke() {
    // TODO: 通过插件间通信处理撤回事件
    this.conn?.on('im.message.revoke', (data: any) => {
      console.log('收到撤回事件，需要转发到插件:', data)
    })
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

      // TODO: 通过插件间通信更新群组申请状态
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
