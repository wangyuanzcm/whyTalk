import type { MessageApiInjection } from 'naive-ui/es/message/src/MessageProvider'
import type { DialogApiInjection } from 'naive-ui/es/dialog/src/DialogProvider'
import type { NotificationApiInjection } from 'naive-ui/es/notification/src/NotificationProvider'
import type { ModalApiInjection } from 'naive-ui/es/modal/src/ModalProvider'
// TODO: UserCardModal 已迁移到插件中
// import UserCardModal from '@/components/user/UserCardModal.vue'
// import { useUserStore } from '@/store'

export function useInject() {
  const dialog: DialogApiInjection = window['$dialog']
  const message: MessageApiInjection = window['$message']
  const notification: NotificationApiInjection = window['$notification']
  const modal: ModalApiInjection = window['$modal']

  // 显示用户信息
  const toShowUserInfo = (userId: number) => {
    // TODO: 通过插件间通信显示用户信息
    console.log('TODO: 显示用户信息', userId)
    /*
    const instance = modal.create({
      content: () =>
        h(UserCardModal, {
          userId,
          loginUserId,
          onClose: () => instance.destroy()
        }),
      preset: 'card',
      closable: false,
      style: { width: 'auto', background: 'transparent' },
      contentStyle: { padding: '0px' }
    })
    */
  }

  return { dialog, message, notification, modal, toShowUserInfo }
}
