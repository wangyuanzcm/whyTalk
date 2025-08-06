import {
  a2 as onMounted,
  aw as bus,
  a3 as onUnmounted,
  u as h,
  cg as ServContactDelete,
  H as createVNode,
  V as createTextVNode,
  F as Fragment,
  ch as ServContactEditRemark,
  t as defineComponent,
  a1 as ref,
  z as computed,
  a5 as createBlock,
  T as withCtx,
  ad as isRef,
  O as unref,
  a6 as __unplugin_components_3,
  U as openBlock,
  aZ as withKeys,
  M as createBaseVNode,
  aa as Button,
  ci as ServContactSearch,
  ay as p2pConnect
} from './index-CP-MMhae.js'
import { u as useInject } from './useInject-KwKquBHc.js'
import { _ as __unplugin_components_1 } from './Input-9scKSWkl.js'
import {
  _ as __unplugin_components_3$1,
  a as __unplugin_components_7
} from './FormItem-BYV9eAmm.js'
const useEventBus = (items) => {
  if (items.length) {
    onMounted(() => {
      for (const item of items) {
        bus.subscribe(item.name, item.event)
      }
    })
    onUnmounted(() => {
      for (const item of items) {
        bus.unsubscribe(item.name, item.event)
      }
    })
  }
  const emit = (channel, data) => {
    bus.emit(channel, data)
  }
  return { emit }
}
function useContact() {
  const { toShowUserInfo, dialog } = useInject()
  const onDeleteContact = (item, fn) => {
    dialog.create({
      showIcon: false,
      title: `删除好友`,
      content: () => {
        return createVNode(Fragment, null, [
          createTextVNode('你要删除与【'),
          createVNode(
            'span',
            {
              style: {
                color: 'red'
              }
            },
            [item.remark || item.nickname]
          ),
          createTextVNode(
            '】好友的关系？请注意，删除操作将永久切断与该联系人的消息往来，您将不再接收任何来自他(她)们的信息。'
          )
        ])
      },
      positiveText: '确定',
      negativeText: '取消',
      positiveButtonProps: {
        textColor: '#ffffff'
      },
      onPositiveClick: async () => {
        await ServContactDelete(
          {
            user_id: item.user_id
          },
          {
            successText: '删除联系人成功',
            onSuccess: () => {
              fn && fn()
            }
          }
        )
      }
    })
  }
  const onChangeContactRemark = (item, fn) => {
    let remark = ''
    const onPositiveClick = async () => {
      const { code } = await ServContactEditRemark(
        {
          user_id: item.user_id,
          remark
        },
        {
          successText: '备注修改成功',
          onSuccess: () => {
            if (fn) {
              fn({
                user_id: item.user_id,
                remark
              })
            }
          }
        }
      )
      return code == 200
    }
    dialog.create({
      showIcon: false,
      title: '修改备注',
      content: () => {
        return h(__unplugin_components_1, {
          defaultValue: item.remark,
          placeholder: '请输入备注信息',
          style: {
            marginTop: '20px'
          },
          onInput: (value) => (remark = value)
        })
      },
      negativeText: '取消',
      positiveText: '修改备注',
      positiveButtonProps: {
        textColor: '#ffffff'
      },
      onPositiveClick
    })
  }
  return {
    toShowUserInfo,
    onDeleteContact,
    onChangeContactRemark
  }
}
const _hoisted_1 = { style: { width: '100%', 'text-align': 'center' } }
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'UserSearchModal',
  emits: ['update:show'],
  setup(__props, { emit: __emit }) {
    const { toShowUserInfo } = useInject()
    const emit = __emit
    const isShow = ref(true)
    const keyword = ref('')
    const isShowError = ref(false)
    const onShowError = (value) => {
      isShowError.value = value
      {
        setTimeout(() => (isShowError.value = false), 3e3)
      }
    }
    const onSubmit = async () => {
      if (!keyword.value.length) return
      const { code, data } = await ServContactSearch(
        { mobile: keyword.value },
        {
          error: false
        }
      )
      if (code !== 200 || !data) {
        return onShowError(true)
      }
      toShowUserInfo(data.user_id)
      onClose()
    }
    const isCanSubmit = computed(() => {
      return keyword.value.trim().length == 0
    })
    const onClose = () => {
      keyword.value = ''
      emit('update:show', false)
    }
    return (_ctx, _cache) => {
      const _component_n_input = __unplugin_components_1
      const _component_n_form_item = __unplugin_components_3$1
      const _component_n_form = __unplugin_components_7
      const _component_n_button = Button
      const _component_n_modal = __unplugin_components_3
      return (
        openBlock(),
        createBlock(
          _component_n_modal,
          {
            show: unref(isShow),
            'onUpdate:show':
              _cache[1] ||
              (_cache[1] = ($event) => (isRef(isShow) ? (isShow.value = $event) : null)),
            preset: 'card',
            title: '联系人查询',
            class: 'modal-radius',
            style: { 'max-width': '450px' },
            'mask-closable': true,
            'on-update:show': onClose,
            'transform-origin': 'center'
          },
          {
            footer: withCtx(() => [
              createBaseVNode('div', _hoisted_1, [
                createVNode(
                  _component_n_button,
                  {
                    type: 'primary',
                    'text-color': '#ffffff',
                    onClick: onSubmit,
                    disabled: unref(isCanSubmit)
                  },
                  {
                    default: withCtx(
                      () => _cache[2] || (_cache[2] = [createTextVNode(' 查询手机号 ', -1)])
                    ),
                    _: 1,
                    __: [2]
                  },
                  8,
                  ['disabled']
                )
              ])
            ]),
            default: withCtx(() => [
              createVNode(_component_n_form, null, {
                default: withCtx(() => [
                  createVNode(
                    _component_n_form_item,
                    {
                      'validation-status': unref(isShowError) ? 'error' : void 0,
                      feedback: unref(isShowError) ? '无法找到该用户，请检查搜索内容并重试!' : ''
                    },
                    {
                      default: withCtx(() => [
                        createVNode(
                          _component_n_input,
                          {
                            placeholder: '请输入手机号',
                            maxlength: 30,
                            value: unref(keyword),
                            'onUpdate:value':
                              _cache[0] ||
                              (_cache[0] = ($event) =>
                                isRef(keyword) ? (keyword.value = $event) : null),
                            onKeydown: withKeys(onSubmit, ['enter'])
                          },
                          null,
                          8,
                          ['value']
                        )
                      ]),
                      _: 1
                    },
                    8,
                    ['validation-status', 'feedback']
                  )
                ]),
                _: 1
              })
            ]),
            _: 1
          },
          8,
          ['show']
        )
      )
    }
  }
})
class P2PMessageService {
  // 发送文本消息
  static async sendTextMessage(targetPeerId, content) {
    try {
      await p2pConnect.sendMessage(targetPeerId, content, 'text')
      return {
        success: true,
        data: {
          id: `msg_${Date.now()}`,
          from_uid: await this.getLocalPeerId(),
          to_uid: targetPeerId,
          content,
          type: 'text',
          created_at: /* @__PURE__ */ new Date().toISOString()
        }
      }
    } catch (error) {
      console.error('Failed to send P2P text message:', error)
      throw error
    }
  }
  // 发送图片消息
  static async sendImageMessage(targetPeerId, imageData) {
    try {
      await p2pConnect.sendMessage(targetPeerId, imageData, 'image')
      return {
        success: true,
        data: {
          id: `msg_${Date.now()}`,
          from_uid: await this.getLocalPeerId(),
          to_uid: targetPeerId,
          content: imageData,
          type: 'image',
          created_at: /* @__PURE__ */ new Date().toISOString()
        }
      }
    } catch (error) {
      console.error('Failed to send P2P image message:', error)
      throw error
    }
  }
  // 发送文件消息
  static async sendFileMessage(targetPeerId, fileData) {
    try {
      await p2pConnect.sendMessage(targetPeerId, fileData, 'file')
      return {
        success: true,
        data: {
          id: `msg_${Date.now()}`,
          from_uid: await this.getLocalPeerId(),
          to_uid: targetPeerId,
          content: fileData,
          type: 'file',
          created_at: /* @__PURE__ */ new Date().toISOString()
        }
      }
    } catch (error) {
      console.error('Failed to send P2P file message:', error)
      throw error
    }
  }
  // 发送群组消息
  static async sendGroupMessage(groupId, content, type = 'text') {
    try {
      await p2pConnect.sendGroupMessage(groupId, content, type)
      return {
        success: true,
        data: {
          id: `msg_${Date.now()}`,
          from_uid: await this.getLocalPeerId(),
          group_id: groupId,
          content,
          type,
          created_at: /* @__PURE__ */ new Date().toISOString()
        }
      }
    } catch (error) {
      console.error('Failed to send P2P group message:', error)
      throw error
    }
  }
  // 获取对话历史（从本地P2P存储）
  static async getChatHistory(targetPeerId, page = 1, limit = 20) {
    try {
      const result = await window.electron.ipcRenderer.invoke('p2p:getChatHistory', {
        targetPeerId,
        page,
        limit
      })
      return {
        success: true,
        data: {
          list: result.messages || [],
          total: result.total || 0,
          page,
          limit
        }
      }
    } catch (error) {
      console.error('Failed to get P2P chat history:', error)
      return {
        success: false,
        data: { list: [], total: 0, page, limit }
      }
    }
  }
  // 获取群组消息历史
  static async getGroupChatHistory(groupId, page = 1, limit = 20) {
    try {
      const result = await window.electron.ipcRenderer.invoke('p2p:getGroupChatHistory', {
        groupId,
        page,
        limit
      })
      return {
        success: true,
        data: {
          list: result.messages || [],
          total: result.total || 0,
          page,
          limit
        }
      }
    } catch (error) {
      console.error('Failed to get P2P group chat history:', error)
      return {
        success: false,
        data: { list: [], total: 0, page, limit }
      }
    }
  }
  // 标记消息为已读
  static async markMessageAsRead(messageIds) {
    try {
      await window.electron.ipcRenderer.invoke('p2p:markMessagesAsRead', { messageIds })
      return {
        success: true,
        data: { marked: messageIds.length }
      }
    } catch (error) {
      console.error('Failed to mark P2P messages as read:', error)
      return { success: false }
    }
  }
  // 删除消息
  static async deleteMessage(messageId) {
    try {
      await window.electron.ipcRenderer.invoke('p2p:deleteMessage', { messageId })
      return {
        success: true,
        data: { deleted: messageId }
      }
    } catch (error) {
      console.error('Failed to delete P2P message:', error)
      return { success: false }
    }
  }
  // 撤回消息
  static async recallMessage(messageId) {
    try {
      await window.electron.ipcRenderer.invoke('p2p:recallMessage', { messageId })
      return {
        success: true,
        data: { recalled: messageId }
      }
    } catch (error) {
      console.error('Failed to recall P2P message:', error)
      return { success: false }
    }
  }
  // 获取本地节点ID
  static async getLocalPeerId() {
    try {
      const result = await window.electron.ipcRenderer.invoke('p2p:getStatus')
      return result.peerId || ''
    } catch (error) {
      console.error('Failed to get local peer ID:', error)
      return ''
    }
  }
}
class P2PContactService {
  // 获取联系人列表
  static async getContactList() {
    try {
      const contacts = await p2pConnect.getContacts()
      return {
        success: true,
        data: {
          list: contacts.map((contact) => ({
            uid: contact.peerId,
            nickname: contact.nickname || contact.peerId,
            avatar: contact.avatar || '',
            remark: contact.remark || '',
            online: contact.online || false,
            last_seen: contact.lastSeen || /* @__PURE__ */ new Date().toISOString()
          }))
        }
      }
    } catch (error) {
      console.error('Failed to get P2P contacts:', error)
      return {
        success: false,
        data: { list: [] }
      }
    }
  }
  // 获取联系人（别名方法，兼容friend.vue）
  static async getContacts() {
    return this.getContactList()
  }
  // 添加联系人
  static async addContact(peerId, nickname, remark) {
    try {
      await p2pConnect.addContact(peerId, nickname, remark)
      return {
        success: true,
        data: {
          uid: peerId,
          nickname: nickname || peerId,
          remark: remark || '',
          added_at: /* @__PURE__ */ new Date().toISOString()
        }
      }
    } catch (error) {
      console.error('Failed to add P2P contact:', error)
      throw error
    }
  }
  // 删除联系人
  static async deleteContact(peerId) {
    try {
      await window.electron.ipcRenderer.invoke('p2p:deleteContact', { peerId })
      return {
        success: true,
        data: { deleted: peerId }
      }
    } catch (error) {
      console.error('Failed to delete P2P contact:', error)
      return { success: false }
    }
  }
  // 更新联系人信息
  static async updateContact(peerId, updates) {
    try {
      await window.electron.ipcRenderer.invoke('p2p:updateContact', { peerId, updates })
      return {
        success: true,
        data: { updated: peerId, ...updates }
      }
    } catch (error) {
      console.error('Failed to update P2P contact:', error)
      return { success: false }
    }
  }
  // 搜索联系人
  static async searchContacts(query) {
    try {
      const result = await window.electron.ipcRenderer.invoke('p2p:searchContacts', { query })
      return {
        success: true,
        data: {
          list: result.contacts || []
        }
      }
    } catch (error) {
      console.error('Failed to search P2P contacts:', error)
      return {
        success: false,
        data: { list: [] }
      }
    }
  }
  // 获取联系人申请列表
  static async getContactRequests() {
    try {
      const result = await window.electron.ipcRenderer.invoke('p2p:getContactRequests')
      return {
        success: true,
        data: {
          list: result.requests || []
        }
      }
    } catch (error) {
      console.error('Failed to get P2P contact requests:', error)
      return {
        success: false,
        data: { list: [] }
      }
    }
  }
  // 处理联系人申请
  static async handleContactRequest(requestId, action) {
    try {
      await window.electron.ipcRenderer.invoke('p2p:handleContactRequest', { requestId, action })
      return {
        success: true,
        data: { requestId, action }
      }
    } catch (error) {
      console.error('Failed to handle P2P contact request:', error)
      return { success: false }
    }
  }
}
export {
  P2PMessageService as P,
  _sfc_main as _,
  useContact as a,
  P2PContactService as b,
  useEventBus as u
}
