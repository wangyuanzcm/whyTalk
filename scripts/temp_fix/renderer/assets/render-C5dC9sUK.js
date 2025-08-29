import {
  I as IconWrapper,
  H as createVNode,
  z as computed,
  e0 as toValue,
  cZ as shallowRef,
  ah as watch,
  a2 as onMounted,
  bh as getCurrentInstance,
  t as defineComponent,
  L as createElementBlock,
  U as openBlock,
  O as unref,
  F as Fragment,
  a5 as createBlock,
  a8 as createCommentVNode,
  aV as resolveDynamicComponent,
  R as toDisplayString,
  e1 as humanizeTime,
  ac as normalizeClass,
  P as withDirectives,
  M as createBaseVNode,
  Q as vShow,
  aC as resolveComponent,
  aL as withModifiers,
  N as NIcon,
  W as _export_sfc,
  $ as mergeModels,
  a0 as useModel,
  aj as useTemplateRef,
  a3 as onUnmounted,
  a1 as ref,
  a4 as reactive,
  dl as renderSlot,
  d2 as normalizeStyle,
  u as h,
  bC as nextTick,
  cY as useId,
  T as withCtx,
  a9 as renderList,
  e2 as ChatMsgSysGroupMemberCancelMuted,
  e3 as ChatMsgSysGroupMemberMuted,
  e4 as ChatMsgSysGroupCancelMuted,
  e5 as ChatMsgSysGroupMuted,
  e6 as ChatMsgSysGroupMemberKicked,
  e7 as ChatMsgSysGroupMemberQuit,
  e8 as ChatMsgSysGroupMemberJoin,
  e9 as ChatMsgSysGroupCreate,
  ea as ChatMsgSysText,
  eb as ChatMsgTypeGroupNotice,
  ec as ChatMsgTypeMixed,
  ar as ChatMsgTypeVote,
  ed as ChatMsgTypeLogin,
  ao as ChatMsgTypeForward,
  an as ChatMsgTypeFile,
  am as ChatMsgTypeVideo,
  al as ChatMsgTypeAudio,
  ak as ChatMsgTypeImage,
  ap as ChatMsgTypeCode,
  ee as ChatMsgTypeText
} from './index-CP-MMhae.js'
import { C as Copy } from './Copy-PmY75sEQ.js'
import { _ as __unplugin_components_1 } from './Checkbox-B683huVH.js'
import { I as IconDelete } from './Delete-BuJN8hI8.js'
import { U as Undo } from './Undo-DAYaSkZ9.js'
import {
  t as toArray,
  n as notNullish,
  a as noop,
  b as tryOnScopeDispose,
  i as isClient
} from './index-88uWzgFD.js'
import { _ as __unplugin_components_2 } from './Dropdown-BaOl703U.js'
const DoubleDown = IconWrapper('double-down', false, function (props) {
  return createVNode(
    'svg',
    {
      width: props.size,
      height: props.size,
      viewBox: '0 0 48 48',
      fill: 'none'
    },
    [
      createVNode(
        'path',
        {
          d: 'M36 12L24 24L12 12',
          stroke: props.colors[0],
          'stroke-width': props.strokeWidth,
          'stroke-linecap': props.strokeLinecap,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      ),
      createVNode(
        'path',
        {
          d: 'M36 24L24 36L12 24',
          stroke: props.colors[0],
          'stroke-width': props.strokeWidth,
          'stroke-linecap': props.strokeLinecap,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      )
    ]
  )
})
const LoadingTwo = IconWrapper('loading-two', false, function (props) {
  return createVNode(
    'svg',
    {
      width: props.size,
      height: props.size,
      viewBox: '0 0 48 48',
      fill: 'none'
    },
    [
      createVNode(
        'path',
        {
          d: 'M24 3.99994V11.9999',
          stroke: props.colors[0],
          'stroke-width': props.strokeWidth,
          'stroke-linecap': props.strokeLinecap,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      ),
      createVNode(
        'path',
        {
          d: 'M38.1421 9.85779L32.4852 15.5146',
          stroke: props.colors[0],
          'stroke-width': props.strokeWidth,
          'stroke-linecap': props.strokeLinecap,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      ),
      createVNode(
        'path',
        {
          d: 'M44 23.9999H36',
          stroke: props.colors[0],
          'stroke-width': props.strokeWidth,
          'stroke-linecap': props.strokeLinecap,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      ),
      createVNode(
        'path',
        {
          d: 'M38.1421 38.1421L32.4852 32.4852',
          stroke: props.colors[0],
          'stroke-width': props.strokeWidth,
          'stroke-linecap': props.strokeLinecap,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      ),
      createVNode(
        'path',
        {
          d: 'M24 43.9999V35.9999',
          stroke: props.colors[0],
          'stroke-width': props.strokeWidth,
          'stroke-linecap': props.strokeLinecap,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      ),
      createVNode(
        'path',
        {
          d: 'M9.85791 38.1421L15.5148 32.4852',
          stroke: props.colors[0],
          'stroke-width': props.strokeWidth,
          'stroke-linecap': props.strokeLinecap,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      ),
      createVNode(
        'path',
        {
          d: 'M4 23.9999H12',
          stroke: props.colors[0],
          'stroke-width': props.strokeWidth,
          'stroke-linecap': props.strokeLinecap,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      ),
      createVNode(
        'path',
        {
          d: 'M9.85791 9.85779L15.5148 15.5146',
          stroke: props.colors[0],
          'stroke-width': props.strokeWidth,
          'stroke-linecap': props.strokeLinecap,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      ),
      createVNode(
        'path',
        {
          d: 'M16.3467 5.5224L17.8774 9.21792',
          stroke: props.colors[0],
          'stroke-width': props.strokeWidth,
          'stroke-linecap': props.strokeLinecap,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      ),
      createVNode(
        'path',
        {
          d: 'M5.52246 16.3461L9.21798 17.8769',
          stroke: props.colors[0],
          'stroke-width': props.strokeWidth,
          'stroke-linecap': props.strokeLinecap,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      ),
      createVNode(
        'path',
        {
          d: 'M5.52246 31.6537L9.21798 30.123',
          stroke: props.colors[0],
          'stroke-width': props.strokeWidth,
          'stroke-linecap': props.strokeLinecap,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      ),
      createVNode(
        'path',
        {
          d: 'M16.3467 42.4777L17.8774 38.7822',
          stroke: props.colors[0],
          'stroke-width': props.strokeWidth,
          'stroke-linecap': props.strokeLinecap,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      ),
      createVNode(
        'path',
        {
          d: 'M31.6538 42.4777L30.123 38.7822',
          stroke: props.colors[0],
          'stroke-width': props.strokeWidth,
          'stroke-linecap': props.strokeLinecap,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      ),
      createVNode(
        'path',
        {
          d: 'M42.4777 31.6537L38.7822 30.123',
          stroke: props.colors[0],
          'stroke-width': props.strokeWidth,
          'stroke-linecap': props.strokeLinecap,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      ),
      createVNode(
        'path',
        {
          d: 'M42.4777 16.3461L38.7822 17.8769',
          stroke: props.colors[0],
          'stroke-width': props.strokeWidth,
          'stroke-linecap': props.strokeLinecap,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      ),
      createVNode(
        'path',
        {
          d: 'M31.6538 5.5224L30.123 9.21792',
          stroke: props.colors[0],
          'stroke-width': props.strokeWidth,
          'stroke-linecap': props.strokeLinecap,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      )
    ]
  )
})
const ToTop = IconWrapper('to-top', false, function (props) {
  return createVNode(
    'svg',
    {
      width: props.size,
      height: props.size,
      viewBox: '0 0 48 48',
      fill: 'none'
    },
    [
      createVNode(
        'path',
        {
          d: 'M24.0083 14.1006V42.0001',
          stroke: props.colors[0],
          'stroke-width': props.strokeWidth,
          'stroke-linecap': props.strokeLinecap,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      ),
      createVNode(
        'path',
        {
          d: 'M12 26L24 14L36 26',
          stroke: props.colors[0],
          'stroke-width': props.strokeWidth,
          'stroke-linecap': props.strokeLinecap,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      ),
      createVNode(
        'path',
        {
          d: 'M12 6H36',
          stroke: props.colors[0],
          'stroke-width': props.strokeWidth,
          'stroke-linecap': props.strokeLinecap,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      )
    ]
  )
})
const defaultWindow = isClient ? window : void 0
function unrefElement(elRef) {
  var _a
  const plain = toValue(elRef)
  return (_a = plain == null ? void 0 : plain.$el) != null ? _a : plain
}
// @__NO_SIDE_EFFECTS__
function useMounted() {
  const isMounted = shallowRef(false)
  const instance = getCurrentInstance()
  if (instance) {
    onMounted(() => {
      isMounted.value = true
    }, instance)
  }
  return isMounted
}
// @__NO_SIDE_EFFECTS__
function useSupported(callback) {
  const isMounted = /* @__PURE__ */ useMounted()
  return computed(() => {
    isMounted.value
    return Boolean(callback())
  })
}
function useIntersectionObserver(target, callback, options = {}) {
  const {
    root,
    rootMargin = '0px',
    threshold = 0,
    window: window2 = defaultWindow,
    immediate = true
  } = options
  const isSupported = /* @__PURE__ */ useSupported(
    () => window2 && 'IntersectionObserver' in window2
  )
  const targets = computed(() => {
    const _target = toValue(target)
    return toArray(_target).map(unrefElement).filter(notNullish)
  })
  let cleanup = noop
  const isActive = shallowRef(immediate)
  const stopWatch = isSupported.value
    ? watch(
        () => [targets.value, unrefElement(root), isActive.value],
        ([targets2, root2]) => {
          cleanup()
          if (!isActive.value) return
          if (!targets2.length) return
          const observer = new IntersectionObserver(callback, {
            root: unrefElement(root2),
            rootMargin,
            threshold
          })
          targets2.forEach((el) => el && observer.observe(el))
          cleanup = () => {
            observer.disconnect()
            cleanup = noop
          }
        },
        { immediate, flush: 'post' }
      )
    : noop
  const stop = () => {
    cleanup()
    stopWatch()
    isActive.value = false
  }
  tryOnScopeDispose(stop)
  return {
    isSupported,
    isActive,
    pause() {
      cleanup()
      isActive.value = false
    },
    resume() {
      isActive.value = true
    },
    stop
  }
}
var RoleEnum = /* @__PURE__ */ ((RoleEnum2) => {
  RoleEnum2['USER'] = 'user'
  RoleEnum2['ASSISTANT'] = 'assistant'
  RoleEnum2['SYSTEM'] = 'system'
  return RoleEnum2
})(RoleEnum || {})
var MessageTypeEnum = /* @__PURE__ */ ((MessageTypeEnum2) => {
  MessageTypeEnum2['TEXT'] = 'text'
  MessageTypeEnum2['TIME'] = 'time'
  MessageTypeEnum2['CUSTOM'] = 'custom'
  return MessageTypeEnum2
})(MessageTypeEnum || {})
var StatusEnum = /* @__PURE__ */ ((StatusEnum2) => {
  StatusEnum2['SENDING'] = 'sending'
  StatusEnum2['SENT'] = 'sent'
  StatusEnum2['ERROR'] = 'error'
  return StatusEnum2
})(StatusEnum || {})
var AlignEnum = /* @__PURE__ */ ((AlignEnum2) => {
  AlignEnum2['LEFT_RIGHT'] = 'leftRight'
  AlignEnum2['LEFT_ALIGN'] = 'left'
  return AlignEnum2
})(AlignEnum || {})
const _hoisted_1$4 = {
  key: 0,
  class: 'chat-container-item system'
}
const _hoisted_2$3 = {
  key: 1,
  class: 'system-content'
}
const _hoisted_3$2 = {
  key: 2,
  class: 'time-content'
}
const _hoisted_4$2 = {
  key: 3,
  class: 'system-content'
}
const _hoisted_5 = { class: 'chat-checkbox' }
const _hoisted_6 = { class: 'chat-avatar' }
const _hoisted_7 = { class: 'chat-content-title' }
const _hoisted_8 = ['datetime']
const _hoisted_9 = { class: 'chat-content-main' }
const _hoisted_10 = { class: 'chat-content-message' }
const _hoisted_11 = {
  key: 1,
  class: 'text-content'
}
const _hoisted_12 = { key: 2 }
const _hoisted_13 = {
  key: 3,
  class: 'sent-status sending'
}
const _hoisted_14 = {
  key: 4,
  class: 'sent-status fail'
}
const _hoisted_15 = {
  key: 0,
  class: 'chat-content-quote'
}
const _hoisted_16 = {
  key: 1,
  class: 'chat-tools-menus'
}
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: 'ChatItem',
  props: {
    align: {},
    showCheckbox: { type: Boolean },
    showAvatar: { type: Boolean },
    item: {},
    raw: {},
    isSelected: { type: Boolean },
    onContextMenu: { type: Function },
    showToolsMenus: { type: Boolean }
  },
  emits: ['selected-element', 'element-event', 'click-avatar', 'click-name'],
  setup(__props, { emit: __emit }) {
    const emits = __emit
    const onClieckSelect = (e, item) => {
      if (!__props.showCheckbox) return
      e.stopPropagation()
      emits('selected-element', item.msg_id)
    }
    return (_ctx, _cache) => {
      const _component_n_checkbox = __unplugin_components_1
      const _component_im_avatar = resolveComponent('im-avatar')
      const _component_n_icon = NIcon
      return _ctx.item.role == 'system'
        ? (openBlock(),
          createElementBlock('div', _hoisted_1$4, [
            _ctx.item.type === unref(MessageTypeEnum).CUSTOM
              ? (openBlock(),
                createElementBlock(
                  Fragment,
                  { key: 0 },
                  [
                    _ctx.item.render
                      ? (openBlock(),
                        createBlock(resolveDynamicComponent(_ctx.item.render()), { key: 0 }))
                      : createCommentVNode('', true)
                  ],
                  64
                ))
              : _ctx.item.type === unref(MessageTypeEnum).TEXT
                ? (openBlock(),
                  createElementBlock('span', _hoisted_2$3, toDisplayString(_ctx.item.content), 1))
                : _ctx.item.type === unref(MessageTypeEnum).TIME
                  ? (openBlock(),
                    createElementBlock(
                      'span',
                      _hoisted_3$2,
                      '― ' +
                        toDisplayString(unref(humanizeTime)(new Date(_ctx.item.time).getTime())) +
                        ' ―',
                      1
                    ))
                  : (openBlock(), createElementBlock('span', _hoisted_4$2, '未知类型'))
          ]))
        : (openBlock(),
          createElementBlock(
            'div',
            {
              key: 1,
              class: normalizeClass([
                'chat-container-item',
                {
                  'align-right':
                    _ctx.align === unref(AlignEnum).LEFT_RIGHT &&
                    _ctx.item.role === unref(RoleEnum).USER,
                  border: _ctx.showCheckbox,
                  active: _ctx.isSelected
                }
              ])
            },
            [
              withDirectives(
                createBaseVNode(
                  'div',
                  _hoisted_5,
                  [
                    createVNode(
                      _component_n_checkbox,
                      {
                        size: 'medium',
                        checked: _ctx.isSelected,
                        'onUpdate:checked':
                          _cache[0] ||
                          (_cache[0] = () => {
                            emits('selected-element', _ctx.item.msg_id)
                          })
                      },
                      null,
                      8,
                      ['checked']
                    )
                  ],
                  512
                ),
                [[vShow, _ctx.showCheckbox]]
              ),
              withDirectives(
                createBaseVNode(
                  'div',
                  _hoisted_6,
                  [
                    createVNode(
                      _component_im_avatar,
                      {
                        class: 'pointer',
                        size: 30,
                        src: _ctx.item.avatar,
                        username: _ctx.item.name,
                        'font-size': 14,
                        onClick:
                          _cache[1] || (_cache[1] = ($event) => emits('click-avatar', _ctx.raw))
                      },
                      null,
                      8,
                      ['src', 'username']
                    )
                  ],
                  512
                ),
                [[vShow, _ctx.showAvatar]]
              ),
              createBaseVNode(
                'div',
                {
                  class: 'chat-content',
                  onClick: _cache[7] || (_cache[7] = ($event) => onClieckSelect($event, _ctx.item))
                },
                [
                  createBaseVNode('div', _hoisted_7, [
                    createBaseVNode(
                      'span',
                      {
                        class: 'name',
                        onClick:
                          _cache[2] || (_cache[2] = ($event) => emits('click-name', _ctx.raw))
                      },
                      toDisplayString(_ctx.item.name),
                      1
                    ),
                    createBaseVNode(
                      'span',
                      {
                        class: 'time',
                        datetime: _ctx.item.time
                      },
                      toDisplayString(unref(humanizeTime)(new Date(_ctx.item.time).getTime())),
                      9,
                      _hoisted_8
                    )
                  ]),
                  createBaseVNode('div', _hoisted_9, [
                    createBaseVNode('div', _hoisted_10, [
                      _ctx.item.type === unref(MessageTypeEnum).CUSTOM
                        ? (openBlock(),
                          createElementBlock(
                            Fragment,
                            { key: 0 },
                            [
                              _ctx.item.render
                                ? (openBlock(),
                                  createBlock(
                                    resolveDynamicComponent(_ctx.item.render()),
                                    {
                                      key: 0,
                                      class: 'immsg',
                                      onContextmenu:
                                        _cache[3] ||
                                        (_cache[3] = withModifiers(
                                          ($event) => _ctx.onContextMenu($event, _ctx.raw),
                                          ['prevent']
                                        ))
                                    },
                                    null,
                                    32
                                  ))
                                : createCommentVNode('', true)
                            ],
                            64
                          ))
                        : _ctx.item.type === unref(MessageTypeEnum).TEXT
                          ? (openBlock(),
                            createElementBlock(
                              'div',
                              _hoisted_11,
                              toDisplayString(_ctx.item.content || ''),
                              1
                            ))
                          : (openBlock(), createElementBlock('div', _hoisted_12, '未知类型')),
                      _ctx.item?.status === unref(StatusEnum).SENDING
                        ? (openBlock(),
                          createElementBlock('span', _hoisted_13, [
                            createVNode(
                              _component_n_icon,
                              { component: unref(LoadingTwo) },
                              null,
                              8,
                              ['component']
                            )
                          ]))
                        : createCommentVNode('', true),
                      _ctx.item?.status === unref(StatusEnum).ERROR
                        ? (openBlock(), createElementBlock('span', _hoisted_14, '发送失败'))
                        : createCommentVNode('', true)
                    ]),
                    _ctx.item.quote?.quote_id
                      ? (openBlock(),
                        createElementBlock('div', _hoisted_15, [
                          createVNode(
                            _component_n_icon,
                            {
                              component: unref(ToTop),
                              size: '22'
                            },
                            null,
                            8,
                            ['component']
                          ),
                          createBaseVNode(
                            'span',
                            null,
                            '回复：' + toDisplayString(_ctx.item?.quote?.content),
                            1
                          )
                        ]))
                      : createCommentVNode('', true),
                    _ctx.showToolsMenus
                      ? (openBlock(),
                        createElementBlock('div', _hoisted_16, [
                          createVNode(
                            _component_n_icon,
                            {
                              class: 'pointer',
                              component: unref(Copy),
                              onClick:
                                _cache[4] ||
                                (_cache[4] = ($event) => emits('element-event', 'copy', _ctx.raw)),
                              size: '16'
                            },
                            null,
                            8,
                            ['component']
                          ),
                          createVNode(
                            _component_n_icon,
                            {
                              class: 'pointer',
                              component: unref(IconDelete),
                              onClick:
                                _cache[5] ||
                                (_cache[5] = ($event) =>
                                  emits('element-event', 'delete', _ctx.raw)),
                              size: '16'
                            },
                            null,
                            8,
                            ['component']
                          ),
                          createVNode(
                            _component_n_icon,
                            {
                              class: 'pointer',
                              component: unref(Undo),
                              onClick:
                                _cache[6] ||
                                (_cache[6] = ($event) =>
                                  emits('element-event', 'revoke', _ctx.raw)),
                              size: '16'
                            },
                            null,
                            8,
                            ['component']
                          )
                        ]))
                      : createCommentVNode('', true)
                  ])
                ]
              )
            ],
            2
          ))
    }
  }
})
const ChatItem = /* @__PURE__ */ _export_sfc(_sfc_main$5, [['__scopeId', 'data-v-3ca9ed00']])
const _hoisted_1$3 = {
  class: 'load-toolbar-footer flex-center',
  ref: 'load-toolbar-footer'
}
const _hoisted_2$2 = {
  key: 0,
  class: 'no-more'
}
const _hoisted_3$1 = {
  key: 1,
  class: 'loading'
}
const _hoisted_4$1 = {
  key: 2,
  class: 'loading'
}
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: 'FooterToolbar',
  props: /* @__PURE__ */ mergeModels(
    {
      loadStatus: {},
      loadMode: {},
      fn: { type: Function }
    },
    {
      modelValue: { type: Boolean },
      modelModifiers: {}
    }
  ),
  emits: ['update:modelValue'],
  setup(__props) {
    const model = useModel(__props, 'modelValue')
    const loadToolbarFooterTarget = useTemplateRef('load-toolbar-footer')
    const { stop } = useIntersectionObserver(loadToolbarFooterTarget, ([{ isIntersecting }]) => {
      model.value = isIntersecting
      if (__props.loadMode === 'pullup' && isIntersecting) {
        __props.fn(false)
      }
    })
    onUnmounted(() => {
      stop()
    })
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'div',
          _hoisted_1$3,
          [
            _ctx.loadMode === 'pullup'
              ? (openBlock(),
                createElementBlock(
                  Fragment,
                  { key: 0 },
                  [
                    _ctx.loadStatus === 3
                      ? (openBlock(), createElementBlock('span', _hoisted_2$2, '― 没有更多消息 ―'))
                      : _ctx.loadStatus === 2
                        ? (openBlock(), createElementBlock('span', _hoisted_3$1, '加载数据中...'))
                        : (openBlock(), createElementBlock('span', _hoisted_4$1, '加载更多消息'))
                  ],
                  64
                ))
              : createCommentVNode('', true)
          ],
          512
        )
      )
    }
  }
})
const FooterLoadToolbar = /* @__PURE__ */ _export_sfc(_sfc_main$4, [
  ['__scopeId', 'data-v-2d048bf4']
])
const _hoisted_1$2 = {
  class: 'load-toolbar-header flex-center',
  ref: 'load-toolbar-header'
}
const _hoisted_2$1 = {
  key: 0,
  class: 'no-more'
}
const _hoisted_3 = {
  key: 1,
  class: 'loading'
}
const _hoisted_4 = {
  key: 2,
  class: 'loading'
}
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: 'HeaderToolbar',
  props: {
    loadStatus: {},
    fn: { type: Function }
  },
  setup(__props) {
    const loadToolbarFotterTarget = useTemplateRef('load-toolbar-header')
    const { stop } = useIntersectionObserver(loadToolbarFotterTarget, ([{ isIntersecting }]) => {
      isIntersecting && __props.fn(false)
    })
    onUnmounted(() => {
      stop()
    })
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'div',
          _hoisted_1$2,
          [
            _ctx.loadStatus === 3
              ? (openBlock(), createElementBlock('span', _hoisted_2$1, '― 没有更多消息 ―'))
              : _ctx.loadStatus === 2
                ? (openBlock(), createElementBlock('span', _hoisted_3, '加载数据中...'))
                : (openBlock(), createElementBlock('span', _hoisted_4, '加载更多消息'))
          ],
          512
        )
      )
    }
  }
})
const HeaderToolbar = /* @__PURE__ */ _export_sfc(_sfc_main$3, [['__scopeId', 'data-v-0eb42155']])
const _hoisted_1$1 = { key: 0 }
const _hoisted_2 = { key: 1 }
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: 'SkipBottomButton',
  props: {
    show: { type: Boolean },
    unread: {},
    scrollToBottom: { type: Function }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      const _component_n_icon = NIcon
      return (
        openBlock(),
        createElementBlock(
          'div',
          {
            class: normalizeClass(['skip-bottom pointer', { show: _ctx.show }]),
            onClick: _cache[0] || (_cache[0] = ($event) => _ctx.scrollToBottom(true))
          },
          [
            _ctx.unread
              ? (openBlock(),
                createElementBlock(
                  'span',
                  _hoisted_1$1,
                  toDisplayString(_ctx.unread) + ' 条未读消息',
                  1
                ))
              : (openBlock(), createElementBlock('span', _hoisted_2, '回到底部')),
            createVNode(
              _component_n_icon,
              {
                size: '14',
                color: '#fff',
                component: unref(DoubleDown)
              },
              null,
              8,
              ['component']
            )
          ],
          2
        )
      )
    }
  }
})
const SkipBottomButton = /* @__PURE__ */ _export_sfc(_sfc_main$2, [
  ['__scopeId', 'data-v-a2fa1a60']
])
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: 'DraggableArea',
  props: {
    closest: {
      type: String,
      required: true
    },
    element: {
      type: String,
      required: true
    },
    elementKey: {
      type: String,
      required: true
    },
    strategy: {
      type: String,
      default: 'contain'
    },
    enable: {
      type: Boolean,
      default: false
    }
  },
  emits: ['selected-elements'],
  setup(__props, { emit: __emit }) {
    const emit = __emit
    const props = __props
    const containerRef = ref(null)
    const isDragging = ref(false)
    const initPosition = reactive({
      x: 0,
      y: 0
    })
    const selectionBox = reactive({
      startX: 0,
      startY: 0,
      endX: 0,
      endY: 0,
      width: 0,
      height: 0
    })
    const selectedElements = ref([])
    let mouseMoveHandler = null
    let mouseUpHandler = null
    const handleMouseDown = (event) => {
      const target = event.target
      if (!props.enable) return
      if (event.button === 2) return
      if (props.closest && target.closest(props.closest)) return
      event.preventDefault()
      isDragging.value = true
      initPosition.x = event.pageX
      initPosition.y = event.pageY
      updateSelectionBox(event.pageX, event.pageY)
      mouseMoveHandler = handleMouseMove
      mouseUpHandler = handleMouseUp
      document.addEventListener('mousemove', mouseMoveHandler)
      document.addEventListener('mouseup', mouseUpHandler)
    }
    const handleMouseMove = (event) => {
      if (!isDragging.value) return
      updateSelectionBox(event.pageX, event.pageY)
    }
    const handleMouseUp = () => {
      isDragging.value = false
      if (selectionBox.width <= 10 && selectionBox.height <= 10) return
      document.removeEventListener('mousemove', mouseMoveHandler)
      document.removeEventListener('mouseup', mouseUpHandler)
      selectedElements.value = getSelectedElements()
      emitSelectedElements()
    }
    const updateSelectionBox = (x, y) => {
      selectionBox.endX = x
      selectionBox.endY = y
      selectionBox.startX = Math.min(initPosition.x, x)
      selectionBox.startY = Math.min(initPosition.y, y)
      selectionBox.endX = Math.max(initPosition.x, x)
      selectionBox.endY = Math.max(initPosition.y, y)
      const containerRect = containerRef.value?.getBoundingClientRect()
      selectionBox.startX = Math.max(selectionBox.startX, containerRect.left)
      selectionBox.startY = Math.max(selectionBox.startY, containerRect.top)
      selectionBox.endX = Math.min(selectionBox.endX, containerRect.right)
      selectionBox.endY = Math.min(selectionBox.endY, containerRect.bottom)
      selectionBox.width = selectionBox.endX - selectionBox.startX
      selectionBox.height = selectionBox.endY - selectionBox.startY
    }
    const getSelectedElements = () => {
      const elements = containerRef.value.querySelectorAll(props.element)
      const selected = []
      for (const element of elements) {
        const elementRect = element.getBoundingClientRect()
        const selectBoxRect = {
          left: selectionBox.startX,
          top: selectionBox.startY,
          right: selectionBox.endX,
          bottom: selectionBox.endY
        }
        if (isElementSelected(elementRect, selectBoxRect)) {
          const value = element.getAttribute(`data-${props.elementKey}`)
          if (value) {
            selected.push(value)
          }
        }
      }
      return selected
    }
    const isElementSelected = (elementRect, selectBoxRect) => {
      switch (props.strategy) {
        case 'intersect':
          return (
            elementRect.left < selectBoxRect.right &&
            elementRect.right > selectBoxRect.left &&
            elementRect.top < selectBoxRect.bottom &&
            elementRect.bottom > selectBoxRect.top
          )
        case 'contain':
          return (
            elementRect.left >= selectBoxRect.left &&
            elementRect.right <= selectBoxRect.right &&
            elementRect.top >= selectBoxRect.top &&
            elementRect.bottom <= selectBoxRect.bottom
          )
        default:
          return false
      }
    }
    const emitSelectedElements = () => {
      emit('selected-elements', selectedElements.value)
    }
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'div',
          {
            ref_key: 'containerRef',
            ref: containerRef,
            class: 'draggable-area',
            onMousedown: handleMouseDown
          },
          [
            isDragging.value
              ? (openBlock(),
                createElementBlock(
                  'div',
                  {
                    key: 0,
                    class: 'draggable-area-box',
                    style: normalizeStyle({
                      left: selectionBox.startX + 'px',
                      top: selectionBox.startY + 'px',
                      width: selectionBox.width + 'px',
                      height: selectionBox.height + 'px'
                    })
                  },
                  null,
                  4
                ))
              : createCommentVNode('', true),
            renderSlot(_ctx.$slots, 'default', {}, void 0, true)
          ],
          544
        )
      )
    }
  }
})
const DraggableArea = /* @__PURE__ */ _export_sfc(_sfc_main$1, [['__scopeId', 'data-v-e1b6e8aa']])
function useContextMenu(contextMenuHandle) {
  const dropdown = reactive({
    options: [],
    show: false,
    x: 0,
    y: 0,
    item: {}
  })
  const close = () => {
    dropdown.show = false
    dropdown.item = {}
  }
  const show = (e, options, item) => {
    dropdown.item = item
    dropdown.options = [...options]
    dropdown.x = e.clientX
    dropdown.y = e.clientY
    dropdown.show = true
  }
  const getItem = () => dropdown.item
  const handleSelect = (key) => {
    contextMenuHandle(key)
    close()
  }
  const handleClickOutside = () => {
    close()
  }
  const ContextMenuElement = defineComponent({
    name: 'ContextMenuElement',
    render() {
      return h(__unplugin_components_2, {
        options: dropdown.options,
        x: dropdown.x,
        y: dropdown.y,
        show: dropdown.show,
        onSelect: handleSelect,
        onClickoutside: handleClickOutside
      })
    }
  })
  return { menu: { close, show, getItem }, ContextMenuElement }
}
function useMultiSelect() {
  const isShow = ref(false)
  const selectedItems = ref([])
  function setMultiSelect(elements) {
    if (elements.length === 0) return
    const set = new Set(selectedItems.value)
    for (const element of elements) {
      if (set.has(element)) {
        set.delete(element)
      } else {
        set.add(element)
      }
    }
    const newSelectedItems = Array.from(set)
    const length = selectedItems.value.length
    selectedItems.value.splice(0, length, ...newSelectedItems)
  }
  function isSelected(item) {
    return selectedItems.value.some((value) => value === item.msg_id)
  }
  function enable(value) {
    isShow.value = value
    if (!value) clearMultiSelect()
  }
  function clearMultiSelect() {
    selectedItems.value = []
  }
  function getMultiSelect() {
    return [...Array.from(selectedItems.value)]
  }
  return {
    isEnable: () => isShow.value,
    enable,
    clearMultiSelect,
    setMultiSelect,
    isSelected,
    getMultiSelect
  }
}
function useLoadMore(dataSourceMode, container, fn) {
  const loadStatus = ref(1)
  async function toLoadMore(reload = false) {
    if (!fn) return
    if (!reload && loadStatus.value != 1) return
    const scrollHeight = container()?.scrollHeight || 0
    loadStatus.value = 2
    try {
      const isMore = await fn()
      loadStatus.value = isMore ? 1 : 3
      if (dataSourceMode == 'pulldown') {
        nextTick(() => {
          const el = container()
          if (el) {
            el.scrollTop = el.scrollHeight - (reload ? 0 : scrollHeight)
          }
        })
      }
    } catch (e) {
      loadStatus.value = 1
    }
  }
  return {
    loadStatus,
    toLoadMore
  }
}
const _hoisted_1 = { class: 'section' }
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'ChatPlus',
  props: {
    alignMode: { default: () => AlignEnum.LEFT_RIGHT },
    showAvatar: { type: Boolean, default: true },
    items: {},
    customRender: { type: Function },
    dataSourceMode: { default: 'custom' },
    onScrollLoadMore: { type: Function },
    contextMenu: { type: Boolean },
    contextMenuOption: { type: Function },
    contextMenuEvent: { type: Function },
    unread: {},
    showToolsMenus: { type: Boolean },
    multiSelectMode: { type: Boolean, default: false }
  },
  emits: [
    'user-click-event',
    'context-menu-event',
    'element-event',
    'element-select',
    'on-scroll-to-bottom'
  ],
  setup(__props, { expose: __expose, emit: __emit }) {
    const emit = __emit
    const containerId = `chat-container-${useId()}`
    const isScrollBottom = ref(false)
    const container = () => {
      return document.getElementById(containerId)
    }
    const multiSelect = useMultiSelect()
    const { loadStatus, toLoadMore } = useLoadMore(
      __props.dataSourceMode,
      container,
      __props.onScrollLoadMore
    )
    const { menu, ContextMenuElement } = useContextMenu(contextMenuHandle)
    function enableMultiSelect(value) {
      multiSelect.enable(value)
    }
    function clearMultiSelect() {
      multiSelect.clearMultiSelect()
    }
    function setMultiSelect(elements) {
      if (elements.length === 0 || !__props.multiSelectMode) return
      multiSelect.enable(true)
      multiSelect.setMultiSelect(elements)
      emit('element-select', getMultiSelect())
    }
    function getMultiSelect() {
      return multiSelect.getMultiSelect()
    }
    function scrollToBottom(animation = false) {
      const el = container()
      el?.scrollTo({
        top: el?.scrollHeight + 1e3,
        behavior: animation ? 'smooth' : 'auto'
      })
    }
    function onContextMenu(e, item) {
      if (!__props.contextMenu || !__props.contextMenuOption || multiSelect.isEnable()) return
      menu.show(e, __props.contextMenuOption(item), item)
    }
    function contextMenuHandle(key) {
      const raw = menu.getItem()
      menu.close()
      emit('context-menu-event', key, raw)
    }
    function onElementEvent(key, item) {
      emit('element-event', key, item)
    }
    function onClickAvatar(item) {
      emit('user-click-event', 'avatar', item)
    }
    function onClickName(item) {
      emit('user-click-event', 'nickname', item)
    }
    function scrollToBottomWithDelay() {
      scrollToBottom()
      for (let i = 0; i < 5; i++) {
        setTimeout(scrollToBottom, i * 100)
      }
    }
    function reload() {
      multiSelect.enable(false)
      toLoadMore(true)
      if (__props.dataSourceMode === 'pulldown') {
        nextTick(() => {
          scrollToBottomWithDelay()
        })
      }
    }
    watch(isScrollBottom, (value) => {
      value && emit('on-scroll-to-bottom')
    })
    onMounted(() => {
      if (__props.dataSourceMode === 'pulldown') {
        scrollToBottomWithDelay()
      }
    })
    __expose({
      enableMultiSelect,
      clearMultiSelect,
      setMultiSelect,
      getMultiSelect,
      scrollToBottom,
      reload,
      getContainerId: () => containerId
    })
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock('section', _hoisted_1, [
          createVNode(
            DraggableArea,
            {
              id: containerId,
              class: 'chat-container me-scrollbar',
              closest: '.immsg',
              'element-key': 'index',
              element: '.chat-container-item',
              strategy: 'intersect',
              enable: _ctx.multiSelectMode,
              onSelectedElements: setMultiSelect
            },
            {
              default: withCtx(() => [
                _ctx.dataSourceMode === 'pulldown'
                  ? (openBlock(),
                    createBlock(
                      HeaderToolbar,
                      {
                        key: 0,
                        'load-status': unref(loadStatus),
                        fn: unref(toLoadMore)
                      },
                      null,
                      8,
                      ['load-status', 'fn']
                    ))
                  : createCommentVNode('', true),
                (openBlock(true),
                createElementBlock(
                  Fragment,
                  null,
                  renderList(_ctx.items, (item) => {
                    return (
                      openBlock(),
                      createBlock(
                        ChatItem,
                        {
                          key: item.msg_id,
                          'data-index': item.msg_id,
                          align: _ctx.alignMode,
                          'show-checkbox': unref(multiSelect).isEnable(),
                          'show-avatar': _ctx.showAvatar,
                          item: _ctx.customRender(item),
                          raw: item,
                          'is-selected': unref(multiSelect).isSelected(item),
                          onElementEvent,
                          onSelectedElement: ($event) => setMultiSelect([item.msg_id]),
                          onClickAvatar,
                          onClickName,
                          'on-context-menu': onContextMenu,
                          showToolsMenus: _ctx.showToolsMenus
                        },
                        null,
                        8,
                        [
                          'data-index',
                          'align',
                          'show-checkbox',
                          'show-avatar',
                          'item',
                          'raw',
                          'is-selected',
                          'onSelectedElement',
                          'showToolsMenus'
                        ]
                      )
                    )
                  }),
                  128
                )),
                createVNode(
                  FooterLoadToolbar,
                  {
                    modelValue: isScrollBottom.value,
                    'onUpdate:modelValue':
                      _cache[0] || (_cache[0] = ($event) => (isScrollBottom.value = $event)),
                    'load-mode': _ctx.dataSourceMode,
                    'load-status': unref(loadStatus),
                    fn: unref(toLoadMore)
                  },
                  null,
                  8,
                  ['modelValue', 'load-mode', 'load-status', 'fn']
                )
              ]),
              _: 1
            },
            8,
            ['enable']
          ),
          createVNode(unref(ContextMenuElement)),
          _ctx.dataSourceMode === 'pulldown'
            ? (openBlock(),
              createBlock(
                SkipBottomButton,
                {
                  key: 0,
                  show: !isScrollBottom.value,
                  unread: _ctx.unread,
                  scrollToBottom
                },
                null,
                8,
                ['show', 'unread']
              ))
            : createCommentVNode('', true)
        ])
      )
    }
  }
})
const ChatPlus = /* @__PURE__ */ _export_sfc(_sfc_main, [['__scopeId', 'data-v-7bd0b642']])
class Member {
  name
  // 成员的名字
  uid
  // 成员的唯一标识符
  constructor(name, uid) {
    this.name = name
    this.uid = uid
  }
  toHTML() {
    return `<a data-uid="${this.uid}">${this.name}</a>`
  }
}
function replacePlaceholders(template, data) {
  let result = template
  for (const [key, value] of Object.entries(data)) {
    if (value instanceof Member) {
      const member = value
      result = result.split(key).join(member.toHTML())
    } else if (Array.isArray(value) && value.every((item) => item instanceof Member)) {
      const parts = value.map((member) => member.toHTML()).join('、')
      result = result.split(key).join(parts)
    } else {
      result = result.split(key).join(`${value}`)
    }
  }
  return result
}
const components = {
  [ChatMsgTypeText]: (extra, _, role) => {
    return createVNode(
      resolveComponent('text-message'),
      {
        content: extra?.content,
        role: role
      },
      null
    )
  },
  [ChatMsgTypeCode]: (extra) => {
    return createVNode(
      resolveComponent('code-message'),
      {
        lang: extra?.lang,
        code: extra?.code
      },
      null
    )
  },
  [ChatMsgTypeImage]: (extra) => {
    return createVNode(
      resolveComponent('image-message'),
      {
        url: extra?.url
      },
      null
    )
  },
  [ChatMsgTypeAudio]: (extra) => {
    return createVNode(
      resolveComponent('audio-message'),
      {
        src: extra?.url
      },
      null
    )
  },
  [ChatMsgTypeVideo]: (extra) => {
    return createVNode(
      resolveComponent('video-message'),
      {
        url: extra?.url,
        cover: extra?.cover,
        duration: extra?.duration,
        size: extra?.size
      },
      null
    )
  },
  [ChatMsgTypeFile]: (extra, message) => {
    return createVNode(
      resolveComponent('file-message'),
      {
        filename: extra?.name,
        filesize: extra?.size,
        'msg-id': message.msg_id
      },
      null
    )
  },
  [ChatMsgTypeForward]: (extra) => {
    return createVNode(
      resolveComponent('forward-message'),
      {
        count: extra?.msg_ids.length,
        'msg-ids': extra?.msg_ids,
        'talk-mode': extra?.talk_type,
        items:
          extra.records.map((item) => {
            return {
              content: item.content,
              nickname: item.nickname
            }
          }) || []
      },
      null
    )
  },
  [ChatMsgTypeLogin]: (extra) => {
    return createVNode(
      resolveComponent('login-message'),
      {
        datetime: extra.datetime,
        ip: extra.ip,
        address: extra.address,
        agent: extra.agent,
        reason: extra.reason
      },
      null
    )
  },
  [ChatMsgTypeVote]: (extra) => {
    return createVNode(
      resolveComponent('vote-message'),
      {
        vote_id: extra.vote_id
      },
      null
    )
  },
  [ChatMsgTypeMixed]: (extra) => {
    const items = extra?.items?.map((item) => {
      return {
        type: item.type == 1 ? 'text' : 'image',
        content: item.content
      }
    })
    return createVNode(
      resolveComponent('mixed-message'),
      {
        items: items || []
      },
      null
    )
  },
  [ChatMsgTypeGroupNotice]: (extra) => {
    return createVNode(
      resolveComponent('group-notice-message'),
      {
        title: extra?.title,
        content: extra?.content
      },
      null
    )
  },
  [ChatMsgSysText]: (extra) => {
    return createVNode(
      resolveComponent('sys-text-message'),
      {
        content: extra?.content
      },
      null
    )
  },
  [ChatMsgSysGroupCreate]: (extra) => {
    const tpl = '{0} 创建了群聊，并邀请了 {1} 加入'
    return createVNode(
      resolveComponent('sys-text-tpl-message'),
      {
        content: replacePlaceholders(tpl, {
          '{0}': new Member(extra?.owner_name, extra?.owner_id),
          '{1}': extra?.members?.map((item) => {
            return new Member(item.nickname, item.user_id)
          })
        })
      },
      null
    )
  },
  [ChatMsgSysGroupMemberJoin]: (extra) => {
    const tpl = '{0} 邀请了 {1} 加入群聊'
    return createVNode(
      resolveComponent('sys-text-tpl-message'),
      {
        content: replacePlaceholders(tpl, {
          '{0}': new Member(extra?.owner_name, extra?.owner_id),
          '{1}': extra?.members?.map((item) => {
            return new Member(item.nickname, item.user_id)
          })
        })
      },
      null
    )
  },
  [ChatMsgSysGroupMemberQuit]: (extra) => {
    const tpl = '{0} 退出了群聊'
    return createVNode(
      resolveComponent('sys-text-tpl-message'),
      {
        content: replacePlaceholders(tpl, {
          '{0}': new Member(extra?.owner_name, extra?.owner_id)
        })
      },
      null
    )
  },
  [ChatMsgSysGroupMemberKicked]: (extra) => {
    const tpl = '{0} 将 {1} 踢出群聊'
    return createVNode(
      resolveComponent('sys-text-tpl-message'),
      {
        content: replacePlaceholders(tpl, {
          '{0}': new Member(extra?.owner_name, extra?.owner_id),
          '{1}': extra?.members?.map((item) => {
            return new Member(item.nickname, item.user_id)
          })
        })
      },
      null
    )
  },
  [ChatMsgSysGroupMuted]: (extra) => {
    const tpl = '{0} 已开启全员禁言'
    return createVNode(
      resolveComponent('sys-text-tpl-message'),
      {
        content: replacePlaceholders(tpl, {
          '{0}': new Member(extra?.owner_name, extra?.owner_id)
        })
      },
      null
    )
  },
  [ChatMsgSysGroupCancelMuted]: (extra) => {
    const tpl = '{0} 已关闭全员禁言'
    return createVNode(
      resolveComponent('sys-text-tpl-message'),
      {
        content: replacePlaceholders(tpl, {
          '{0}': new Member(extra?.owner_name, extra?.owner_id)
        })
      },
      null
    )
  },
  [ChatMsgSysGroupMemberMuted]: (extra) => {
    const tpl = '{0} 将 {1} 禁言'
    return createVNode(
      resolveComponent('sys-text-tpl-message'),
      {
        content: replacePlaceholders(tpl, {
          '{0}': new Member(extra?.owner_name, extra?.owner_id),
          '{1}': extra?.members?.map((item) => {
            return new Member(item.nickname, item.user_id)
          })
        })
      },
      null
    )
  },
  [ChatMsgSysGroupMemberCancelMuted]: (extra) => {
    const tpl = '{0} 将 {1} 解除禁言'
    return createVNode(
      resolveComponent('sys-text-tpl-message'),
      {
        content: replacePlaceholders(tpl, {
          '{0}': new Member(extra?.owner_name, extra?.owner_id),
          '{1}': extra?.members?.map((item) => {
            return new Member(item.nickname, item.user_id)
          })
        })
      },
      null
    )
  }
}
function render(extra, message, role) {
  const msgType = message.msg_type
  return (
    components[msgType]?.(extra, message, role) ||
    createVNode(
      resolveComponent('unknown-message'),
      {
        msgType: msgType
      },
      null
    )
  )
}
const formatChatMessage = (loginUserId, chat) => {
  const { msg_id, from_id, send_time, nickname, avatar, extra } = chat
  if (from_id == 0 || chat.msg_type >= 1e3) {
    return {
      msg_id,
      role: RoleEnum.SYSTEM,
      type: MessageTypeEnum.CUSTOM,
      time: send_time,
      render: () => render(extra, chat, RoleEnum.SYSTEM),
      status: StatusEnum.SENT
    }
  }
  if (chat.is_revoked == 1) {
    return {
      msg_id,
      role: RoleEnum.SYSTEM,
      type: MessageTypeEnum.TEXT,
      time: send_time,
      content: '此消息已被撤回',
      status: StatusEnum.SENT
    }
  }
  const role = from_id != loginUserId ? RoleEnum.ASSISTANT : RoleEnum.USER
  const quote = chat?.quote
    ? {
        quote_id: chat.quote?.quote_id || '',
        content: chat.quote?.content || ''
      }
    : void 0
  let status = StatusEnum.SENT
  if ([2, 3].includes(chat.status)) {
    status = chat.status == 2 ? StatusEnum.SENDING : StatusEnum.ERROR
  }
  return {
    role,
    msg_id,
    type: MessageTypeEnum.CUSTOM,
    time: send_time,
    name: nickname,
    avatar,
    quote,
    render: () => render(extra, chat, role),
    status
  }
}
export { ChatPlus as C, formatChatMessage as f }
