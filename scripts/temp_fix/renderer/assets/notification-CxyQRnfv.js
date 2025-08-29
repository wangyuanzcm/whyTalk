import {
  t as defineComponent,
  au as useSettingsStore,
  z as computed,
  a1 as ref,
  L as createElementBlock,
  M as createBaseVNode,
  R as toDisplayString,
  O as unref,
  H as createVNode,
  ad as isRef,
  V as createTextVNode,
  P as withDirectives,
  Q as vShow,
  T as withCtx,
  aa as Button,
  U as openBlock,
  W as _export_sfc
} from './index-CP-MMhae.js'
import { _ as __unplugin_components_3 } from './Switch-Bg2nTzU7.js'
const _hoisted_1 = { class: 'view-box' }
const _hoisted_2 = { class: 'view-list' }
const _hoisted_3 = { class: 'content' }
const _hoisted_4 = { class: 'desc' }
const _hoisted_5 = { class: 'tools' }
const _hoisted_6 = { class: 'view-list' }
const _hoisted_7 = { class: 'content' }
const _hoisted_8 = { class: 'desc' }
const _hoisted_9 = { class: 'tools' }
const _hoisted_10 = { class: 'view-list' }
const _hoisted_11 = { class: 'content' }
const _hoisted_12 = { class: 'desc' }
const _hoisted_13 = { class: 'tools' }
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'notification',
  setup(__props) {
    const settingsStore = useSettingsStore()
    const isPromptTone = computed({
      get: () => settingsStore.isPromptTone,
      set: (value) => {
        settingsStore.setPromptTone(value)
      }
    })
    const isKeyboard = computed({
      get: () => settingsStore.isKeyboard,
      set: (value) => {
        settingsStore.setKeyboard(value)
      }
    })
    const isNotify = computed({
      get: () => settingsStore.isNotify,
      set: (value) => {
        settingsStore.setNotify(value)
        value && toPermission()
      }
    })
    const hasPermission = ref(false)
    hasPermission.value = Notification.permission === 'granted'
    const toPermission = () => {
      Notification.requestPermission().then((permission) => {
        hasPermission.value = permission === 'granted'
      })
    }
    return (_ctx, _cache) => {
      const _component_n_switch = __unplugin_components_3
      const _component_n_button = Button
      return (
        openBlock(),
        createElementBlock('section', null, [
          _cache[9] || (_cache[9] = createBaseVNode('h3', { class: 'title' }, '通知设置', -1)),
          createBaseVNode('div', _hoisted_1, [
            createBaseVNode('div', _hoisted_2, [
              createBaseVNode('div', _hoisted_3, [
                _cache[3] ||
                  (_cache[3] = createBaseVNode('div', { class: 'name' }, '新消息提示音', -1)),
                createBaseVNode(
                  'div',
                  _hoisted_4,
                  '新消息提示音 ：' + toDisplayString(unref(isPromptTone) ? '已开启' : '已关闭'),
                  1
                )
              ]),
              createBaseVNode('div', _hoisted_5, [
                createVNode(
                  _component_n_switch,
                  {
                    size: 'medium',
                    value: unref(isPromptTone),
                    'onUpdate:value':
                      _cache[0] ||
                      (_cache[0] = ($event) =>
                        isRef(isPromptTone) ? (isPromptTone.value = $event) : null)
                  },
                  null,
                  8,
                  ['value']
                )
              ])
            ]),
            createBaseVNode('div', _hoisted_6, [
              createBaseVNode('div', _hoisted_7, [
                _cache[4] ||
                  (_cache[4] = createBaseVNode('div', { class: 'name' }, '推送键盘输入消息', -1)),
                createBaseVNode(
                  'div',
                  _hoisted_8,
                  '推送键盘输入消息：' + toDisplayString(unref(isKeyboard) ? '已开启' : '已关闭'),
                  1
                )
              ]),
              createBaseVNode('div', _hoisted_9, [
                createVNode(
                  _component_n_switch,
                  {
                    size: 'medium',
                    value: unref(isKeyboard),
                    'onUpdate:value':
                      _cache[1] ||
                      (_cache[1] = ($event) =>
                        isRef(isKeyboard) ? (isKeyboard.value = $event) : null)
                  },
                  null,
                  8,
                  ['value']
                )
              ])
            ]),
            createBaseVNode('div', _hoisted_10, [
              createBaseVNode('div', _hoisted_11, [
                _cache[8] ||
                  (_cache[8] = createBaseVNode('div', { class: 'name' }, '消息通知', -1)),
                createBaseVNode('div', _hoisted_12, [
                  createTextVNode(
                    ' 消息通知：' + toDisplayString(unref(isNotify) ? '已开启' : '已关闭') + ' ',
                    1
                  ),
                  withDirectives(
                    createBaseVNode(
                      'span',
                      null,
                      [
                        _cache[6] ||
                          (_cache[6] = createTextVNode(' (当前未获得浏览器通知权限， ', -1)),
                        createVNode(
                          _component_n_button,
                          {
                            type: 'primary',
                            text: '',
                            onClick: toPermission
                          },
                          {
                            default: withCtx(
                              () => _cache[5] || (_cache[5] = [createTextVNode('点击获取权限', -1)])
                            ),
                            _: 1,
                            __: [5]
                          }
                        ),
                        _cache[7] || (_cache[7] = createTextVNode(') ', -1))
                      ],
                      512
                    ),
                    [[vShow, unref(isNotify) && !unref(hasPermission)]]
                  )
                ])
              ]),
              createBaseVNode('div', _hoisted_13, [
                createVNode(
                  _component_n_switch,
                  {
                    size: 'medium',
                    value: unref(isNotify),
                    'onUpdate:value':
                      _cache[2] ||
                      (_cache[2] = ($event) => (isRef(isNotify) ? (isNotify.value = $event) : null))
                  },
                  null,
                  8,
                  ['value']
                )
              ])
            ])
          ])
        ])
      )
    }
  }
})
const notification = /* @__PURE__ */ _export_sfc(_sfc_main, [['__scopeId', 'data-v-90962fe3']])
export { notification as default }
