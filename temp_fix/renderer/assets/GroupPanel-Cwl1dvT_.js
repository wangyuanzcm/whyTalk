import {
  t as defineComponent,
  u as h,
  P as withDirectives,
  cn as FocusTrap,
  br as Transition,
  v as mergeProps,
  aW as Scrollbar,
  Q as vShow,
  a1 as ref,
  z as computed,
  x as useConfig,
  c9 as useRtl,
  ba as inject,
  bt as watchEffect,
  ah as watch,
  bd as onBeforeUnmount,
  bJ as clickoutside,
  co as useLockHtmlScroll,
  cp as drawerInjectionKey,
  bk as provide,
  cq as drawerBodyInjectionKey,
  cr as popoverBodyInjectionKey,
  cs as modalBodyInjectionKey,
  r as c,
  ct as commonVariables,
  s as cB,
  b1 as cM,
  b2 as cE,
  bp as fadeInTransition,
  cu as LazyTeleport,
  cv as zindexable,
  bQ as isMounted,
  y as useTheme,
  b8 as useMergedState,
  b7 as toRef,
  b9 as formatLength,
  cw as useIsComposing,
  bb as useThemeClass,
  cx as drawerLight,
  cy as eventEffectNotPerformed,
  bf as call,
  cz as NBaseClose,
  bK as throwError,
  cA as createTheme,
  cB as buttonLight,
  cC as emptyLight,
  cD as inputLight,
  cE as scrollbarLight,
  cF as checkboxLight,
  q as derived,
  cG as commonVariables$1,
  cH as composite,
  b0 as createInjectionKey,
  bM as cNotM,
  b4 as NBaseIcon,
  aa as Button,
  cI as getTitleAttribute,
  bj as useMemo,
  bO as useFormItem,
  A as createKey,
  c8 as depx,
  I as IconWrapper,
  H as createVNode,
  a2 as onMounted,
  a5 as createBlock,
  a6 as __unplugin_components_3$1,
  O as unref,
  ad as isRef,
  T as withCtx,
  cJ as ServGroupInviteList,
  U as openBlock,
  M as createBaseVNode,
  aD as resolveDirective,
  V as createTextVNode,
  bU as __unplugin_components_0$1,
  cK as ServGroupCreate,
  cL as ServGroupInvite,
  W as _export_sfc,
  a4 as reactive,
  L as createElementBlock,
  F as Fragment,
  a8 as createCommentVNode,
  R as toDisplayString,
  aA as ServGroupDetail,
  cM as ServeGroupUpdate,
  aG as useUserStore,
  a7 as __unplugin_components_1$3,
  N as NIcon,
  a9 as renderList,
  aC as resolveComponent,
  aL as withModifiers,
  cN as ServGroupMemberList,
  cO as ServGroupMemberRemove,
  cP as ServGroupAssignAdmin,
  cQ as ServGroupTransfer,
  cR as ServGroupMemberMute,
  bC as nextTick,
  az as ServGroupNoticeUpdate,
  ae as uploadFile,
  cS as ServGroupApplyList,
  cT as ServGroupApplyDecline,
  cU as ServGroupApplyAgree,
  K as ServGroupDismiss,
  cV as ServGroupMute,
  cW as ServGroupOvert,
  $ as mergeModels,
  a0 as useModel,
  _ as __unplugin_components_3$5,
  aZ as withKeys,
  J as ServGroupSecede,
  cX as ServGroupMemberUpdateRemark
} from './index-CP-MMhae.js'
import { E as Editor, M as MdPreview } from './index-iKnyGKVZ.js'
import { u as useInject } from './useInject-KwKquBHc.js'
import { _ as __unplugin_components_1$1 } from './Input-9scKSWkl.js'
import { u as useLocale } from './use-locale-sP6dOhdq.js'
import { _ as __unplugin_components_1$2 } from './Checkbox-B683huVH.js'
import { N as NEmpty } from './Empty-DXO3k6Nm.js'
import { V as VVirtualList } from './VirtualList-B9WzfpoZ.js'
import { A as AvatarCropper } from './AvatarCropper-B00flI7D.js'
import {
  a as __unplugin_components_7,
  _ as __unplugin_components_3$2
} from './FormItem-BYV9eAmm.js'
import { S as Search } from './Search-ywW15yaZ.js'
import { P as Plus } from './Plus-DQPyk9lQ.js'
import { _ as __unplugin_components_2 } from './Dropdown-BaOl703U.js'
import { t as throttle } from './common-CbVb2jfY.js'
import { C as CheckSmall } from './CheckSmall-D9Jdj4Aw.js'
import { C as Close } from './Close-BsKkRN62.js'
import { _ as __unplugin_components_4 } from './Popconfirm-WQCbiWo_.js'
import { _ as __unplugin_components_3$3 } from './Switch-Bg2nTzU7.js'
import { _ as __unplugin_components_3$4, N as NTabPane } from './Tabs-Bo9TWhMD.js'
import { M as More } from './More-9eOq9UNW.js'
const SearchIcon = defineComponent({
  name: 'Search',
  render() {
    return h(
      'svg',
      {
        version: '1.1',
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: '0 0 512 512',
        style: 'enable-background: new 0 0 512 512'
      },
      h('path', {
        d: 'M443.5,420.2L336.7,312.4c20.9-26.2,33.5-59.4,33.5-95.5c0-84.5-68.5-153-153.1-153S64,132.5,64,217s68.5,153,153.1,153\n  c36.6,0,70.1-12.8,96.5-34.2l106.1,107.1c3.2,3.4,7.6,5.1,11.9,5.1c4.1,0,8.2-1.5,11.3-4.5C449.5,437.2,449.7,426.8,443.5,420.2z\n   M217.1,337.1c-32.1,0-62.3-12.5-85-35.2c-22.7-22.7-35.2-52.9-35.2-84.9c0-32.1,12.5-62.3,35.2-84.9c22.7-22.7,52.9-35.2,85-35.2\n  c32.1,0,62.3,12.5,85,35.2c22.7,22.7,35.2,52.9,35.2,84.9c0,32.1-12.5,62.3-35.2,84.9C279.4,324.6,249.2,337.1,217.1,337.1z'
      })
    )
  }
})
const NDrawerBodyWrapper = defineComponent({
  name: 'NDrawerContent',
  inheritAttrs: false,
  props: {
    blockScroll: Boolean,
    show: {
      type: Boolean,
      default: void 0
    },
    displayDirective: {
      type: String,
      required: true
    },
    placement: {
      type: String,
      required: true
    },
    contentClass: String,
    contentStyle: [Object, String],
    nativeScrollbar: {
      type: Boolean,
      required: true
    },
    scrollbarProps: Object,
    trapFocus: {
      type: Boolean,
      default: true
    },
    autoFocus: {
      type: Boolean,
      default: true
    },
    showMask: {
      type: [Boolean, String],
      required: true
    },
    maxWidth: Number,
    maxHeight: Number,
    minWidth: Number,
    minHeight: Number,
    resizable: Boolean,
    onClickoutside: Function,
    onAfterLeave: Function,
    onAfterEnter: Function,
    onEsc: Function
  },
  setup(props) {
    const displayedRef = ref(!!props.show)
    const bodyRef = ref(null)
    const NDrawer = inject(drawerInjectionKey)
    let startPosition = 0
    let memoizedBodyStyleCursor = ''
    let hoverTimerId = null
    const isHoverOnResizeTriggerRef = ref(false)
    const isDraggingRef = ref(false)
    const isVertical = computed(() => {
      return props.placement === 'top' || props.placement === 'bottom'
    })
    const { mergedClsPrefixRef, mergedRtlRef } = useConfig(props)
    const rtlEnabledRef = useRtl('Drawer', mergedRtlRef, mergedClsPrefixRef)
    const handleBodyMouseleave = handleBodyMouseup
    const handleMousedownResizeTrigger = (e) => {
      isDraggingRef.value = true
      startPosition = isVertical.value ? e.clientY : e.clientX
      memoizedBodyStyleCursor = document.body.style.cursor
      document.body.style.cursor = isVertical.value ? 'ns-resize' : 'ew-resize'
      document.body.addEventListener('mousemove', handleBodyMousemove)
      document.body.addEventListener('mouseleave', handleBodyMouseleave)
      document.body.addEventListener('mouseup', handleBodyMouseup)
    }
    const handleMouseenterResizeTrigger = () => {
      if (hoverTimerId !== null) {
        window.clearTimeout(hoverTimerId)
        hoverTimerId = null
      }
      if (isDraggingRef.value) {
        isHoverOnResizeTriggerRef.value = true
      } else {
        hoverTimerId = window.setTimeout(() => {
          isHoverOnResizeTriggerRef.value = true
        }, 300)
      }
    }
    const handleMouseleaveResizeTrigger = () => {
      if (hoverTimerId !== null) {
        window.clearTimeout(hoverTimerId)
        hoverTimerId = null
      }
      isHoverOnResizeTriggerRef.value = false
    }
    const { doUpdateHeight, doUpdateWidth } = NDrawer
    const regulateWidth = (size) => {
      const { maxWidth } = props
      if (maxWidth && size > maxWidth) return maxWidth
      const { minWidth } = props
      if (minWidth && size < minWidth) return minWidth
      return size
    }
    const regulateHeight = (size) => {
      const { maxHeight } = props
      if (maxHeight && size > maxHeight) return maxHeight
      const { minHeight } = props
      if (minHeight && size < minHeight) return minHeight
      return size
    }
    function handleBodyMousemove(e) {
      var _a, _b
      if (isDraggingRef.value) {
        if (isVertical.value) {
          let height =
            ((_a = bodyRef.value) === null || _a === void 0 ? void 0 : _a.offsetHeight) || 0
          const increment = startPosition - e.clientY
          height += props.placement === 'bottom' ? increment : -increment
          height = regulateHeight(height)
          doUpdateHeight(height)
          startPosition = e.clientY
        } else {
          let width =
            ((_b = bodyRef.value) === null || _b === void 0 ? void 0 : _b.offsetWidth) || 0
          const increment = startPosition - e.clientX
          width += props.placement === 'right' ? increment : -increment
          width = regulateWidth(width)
          doUpdateWidth(width)
          startPosition = e.clientX
        }
      }
    }
    function handleBodyMouseup() {
      if (isDraggingRef.value) {
        startPosition = 0
        isDraggingRef.value = false
        document.body.style.cursor = memoizedBodyStyleCursor
        document.body.removeEventListener('mousemove', handleBodyMousemove)
        document.body.removeEventListener('mouseup', handleBodyMouseup)
        document.body.removeEventListener('mouseleave', handleBodyMouseleave)
      }
    }
    watchEffect(() => {
      if (props.show) displayedRef.value = true
    })
    watch(
      () => props.show,
      (value) => {
        if (!value) {
          handleBodyMouseup()
        }
      }
    )
    onBeforeUnmount(() => {
      handleBodyMouseup()
    })
    const bodyDirectivesRef = computed(() => {
      const { show } = props
      const directives = [[vShow, show]]
      if (!props.showMask) {
        directives.push([
          clickoutside,
          props.onClickoutside,
          void 0,
          {
            capture: true
          }
        ])
      }
      return directives
    })
    function handleAfterLeave() {
      var _a
      displayedRef.value = false
      ;(_a = props.onAfterLeave) === null || _a === void 0 ? void 0 : _a.call(props)
    }
    useLockHtmlScroll(computed(() => props.blockScroll && displayedRef.value))
    provide(drawerBodyInjectionKey, bodyRef)
    provide(popoverBodyInjectionKey, null)
    provide(modalBodyInjectionKey, null)
    return {
      bodyRef,
      rtlEnabled: rtlEnabledRef,
      mergedClsPrefix: NDrawer.mergedClsPrefixRef,
      isMounted: NDrawer.isMountedRef,
      mergedTheme: NDrawer.mergedThemeRef,
      displayed: displayedRef,
      transitionName: computed(() => {
        return {
          right: 'slide-in-from-right-transition',
          left: 'slide-in-from-left-transition',
          top: 'slide-in-from-top-transition',
          bottom: 'slide-in-from-bottom-transition'
        }[props.placement]
      }),
      handleAfterLeave,
      bodyDirectives: bodyDirectivesRef,
      handleMousedownResizeTrigger,
      handleMouseenterResizeTrigger,
      handleMouseleaveResizeTrigger,
      isDragging: isDraggingRef,
      isHoverOnResizeTrigger: isHoverOnResizeTriggerRef
    }
  },
  render() {
    const { $slots, mergedClsPrefix } = this
    return this.displayDirective === 'show' || this.displayed || this.show
      ? withDirectives(
          /* Keep the wrapper dom. Make sure the drawer has a host.
      Nor the detached content will disappear without transition */
          h(
            'div',
            {
              role: 'none'
            },
            h(
              FocusTrap,
              {
                disabled: !this.showMask || !this.trapFocus,
                active: this.show,
                autoFocus: this.autoFocus,
                onEsc: this.onEsc
              },
              {
                default: () =>
                  h(
                    Transition,
                    {
                      name: this.transitionName,
                      appear: this.isMounted,
                      onAfterEnter: this.onAfterEnter,
                      onAfterLeave: this.handleAfterLeave
                    },
                    {
                      default: () =>
                        withDirectives(
                          h(
                            'div',
                            mergeProps(this.$attrs, {
                              role: 'dialog',
                              ref: 'bodyRef',
                              'aria-modal': 'true',
                              class: [
                                `${mergedClsPrefix}-drawer`,
                                this.rtlEnabled && `${mergedClsPrefix}-drawer--rtl`,
                                `${mergedClsPrefix}-drawer--${this.placement}-placement`,
                                /**
                                 * When the mouse is pressed to resize the drawer,
                                 * disable text selection
                                 */
                                this.isDragging && `${mergedClsPrefix}-drawer--unselectable`,
                                this.nativeScrollbar &&
                                  `${mergedClsPrefix}-drawer--native-scrollbar`
                              ]
                            }),
                            [
                              this.resizable
                                ? h('div', {
                                    class: [
                                      `${mergedClsPrefix}-drawer__resize-trigger`,
                                      (this.isDragging || this.isHoverOnResizeTrigger) &&
                                        `${mergedClsPrefix}-drawer__resize-trigger--hover`
                                    ],
                                    onMouseenter: this.handleMouseenterResizeTrigger,
                                    onMouseleave: this.handleMouseleaveResizeTrigger,
                                    onMousedown: this.handleMousedownResizeTrigger
                                  })
                                : null,
                              this.nativeScrollbar
                                ? h(
                                    'div',
                                    {
                                      class: [
                                        `${mergedClsPrefix}-drawer-content-wrapper`,
                                        this.contentClass
                                      ],
                                      style: this.contentStyle,
                                      role: 'none'
                                    },
                                    $slots
                                  )
                                : h(
                                    Scrollbar,
                                    Object.assign({}, this.scrollbarProps, {
                                      contentStyle: this.contentStyle,
                                      contentClass: [
                                        `${mergedClsPrefix}-drawer-content-wrapper`,
                                        this.contentClass
                                      ],
                                      theme: this.mergedTheme.peers.Scrollbar,
                                      themeOverrides: this.mergedTheme.peerOverrides.Scrollbar
                                    }),
                                    $slots
                                  )
                            ]
                          ),
                          this.bodyDirectives
                        )
                    }
                  )
              }
            )
          ),
          [[vShow, this.displayDirective === 'if' || this.displayed || this.show]]
        )
      : null
  }
})
const { cubicBezierEaseIn: cubicBezierEaseIn$3, cubicBezierEaseOut: cubicBezierEaseOut$3 } =
  commonVariables
function slideInFromBottomTransition({
  duration = '0.3s',
  leaveDuration = '0.2s',
  name = 'slide-in-from-bottom'
} = {}) {
  return [
    c(`&.${name}-transition-leave-active`, {
      transition: `transform ${leaveDuration} ${cubicBezierEaseIn$3}`
    }),
    c(`&.${name}-transition-enter-active`, {
      transition: `transform ${duration} ${cubicBezierEaseOut$3}`
    }),
    c(`&.${name}-transition-enter-to`, {
      transform: 'translateY(0)'
    }),
    c(`&.${name}-transition-enter-from`, {
      transform: 'translateY(100%)'
    }),
    c(`&.${name}-transition-leave-from`, {
      transform: 'translateY(0)'
    }),
    c(`&.${name}-transition-leave-to`, {
      transform: 'translateY(100%)'
    })
  ]
}
const { cubicBezierEaseIn: cubicBezierEaseIn$2, cubicBezierEaseOut: cubicBezierEaseOut$2 } =
  commonVariables
function slideInFromLeftTransition({
  duration = '0.3s',
  leaveDuration = '0.2s',
  name = 'slide-in-from-left'
} = {}) {
  return [
    c(`&.${name}-transition-leave-active`, {
      transition: `transform ${leaveDuration} ${cubicBezierEaseIn$2}`
    }),
    c(`&.${name}-transition-enter-active`, {
      transition: `transform ${duration} ${cubicBezierEaseOut$2}`
    }),
    c(`&.${name}-transition-enter-to`, {
      transform: 'translateX(0)'
    }),
    c(`&.${name}-transition-enter-from`, {
      transform: 'translateX(-100%)'
    }),
    c(`&.${name}-transition-leave-from`, {
      transform: 'translateX(0)'
    }),
    c(`&.${name}-transition-leave-to`, {
      transform: 'translateX(-100%)'
    })
  ]
}
const { cubicBezierEaseIn: cubicBezierEaseIn$1, cubicBezierEaseOut: cubicBezierEaseOut$1 } =
  commonVariables
function slideInFromRightTransition({
  duration = '0.3s',
  leaveDuration = '0.2s',
  name = 'slide-in-from-right'
} = {}) {
  return [
    c(`&.${name}-transition-leave-active`, {
      transition: `transform ${leaveDuration} ${cubicBezierEaseIn$1}`
    }),
    c(`&.${name}-transition-enter-active`, {
      transition: `transform ${duration} ${cubicBezierEaseOut$1}`
    }),
    c(`&.${name}-transition-enter-to`, {
      transform: 'translateX(0)'
    }),
    c(`&.${name}-transition-enter-from`, {
      transform: 'translateX(100%)'
    }),
    c(`&.${name}-transition-leave-from`, {
      transform: 'translateX(0)'
    }),
    c(`&.${name}-transition-leave-to`, {
      transform: 'translateX(100%)'
    })
  ]
}
const { cubicBezierEaseIn, cubicBezierEaseOut } = commonVariables
function slideInFromTopTransition({
  duration = '0.3s',
  leaveDuration = '0.2s',
  name = 'slide-in-from-top'
} = {}) {
  return [
    c(`&.${name}-transition-leave-active`, {
      transition: `transform ${leaveDuration} ${cubicBezierEaseIn}`
    }),
    c(`&.${name}-transition-enter-active`, {
      transition: `transform ${duration} ${cubicBezierEaseOut}`
    }),
    c(`&.${name}-transition-enter-to`, {
      transform: 'translateY(0)'
    }),
    c(`&.${name}-transition-enter-from`, {
      transform: 'translateY(-100%)'
    }),
    c(`&.${name}-transition-leave-from`, {
      transform: 'translateY(0)'
    }),
    c(`&.${name}-transition-leave-to`, {
      transform: 'translateY(-100%)'
    })
  ]
}
const style$1 = c([
  cB(
    'drawer',
    `
 word-break: break-word;
 line-height: var(--n-line-height);
 position: absolute;
 pointer-events: all;
 box-shadow: var(--n-box-shadow);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 background-color: var(--n-color);
 color: var(--n-text-color);
 box-sizing: border-box;
 `,
    [
      slideInFromRightTransition(),
      slideInFromLeftTransition(),
      slideInFromTopTransition(),
      slideInFromBottomTransition(),
      cM(
        'unselectable',
        `
 user-select: none; 
 -webkit-user-select: none;
 `
      ),
      cM('native-scrollbar', [
        cB(
          'drawer-content-wrapper',
          `
 overflow: auto;
 height: 100%;
 `
        )
      ]),
      cE(
        'resize-trigger',
        `
 position: absolute;
 background-color: #0000;
 transition: background-color .3s var(--n-bezier);
 `,
        [
          cM(
            'hover',
            `
 background-color: var(--n-resize-trigger-color-hover);
 `
          )
        ]
      ),
      cB(
        'drawer-content-wrapper',
        `
 box-sizing: border-box;
 `
      ),
      cB(
        'drawer-content',
        `
 height: 100%;
 display: flex;
 flex-direction: column;
 `,
        [
          cM('native-scrollbar', [
            cB(
              'drawer-body-content-wrapper',
              `
 height: 100%;
 overflow: auto;
 `
            )
          ]),
          cB(
            'drawer-body',
            `
 flex: 1 0 0;
 overflow: hidden;
 `
          ),
          cB(
            'drawer-body-content-wrapper',
            `
 box-sizing: border-box;
 padding: var(--n-body-padding);
 `
          ),
          cB(
            'drawer-header',
            `
 font-weight: var(--n-title-font-weight);
 line-height: 1;
 font-size: var(--n-title-font-size);
 color: var(--n-title-text-color);
 padding: var(--n-header-padding);
 transition: border .3s var(--n-bezier);
 border-bottom: 1px solid var(--n-divider-color);
 border-bottom: var(--n-header-border-bottom);
 display: flex;
 justify-content: space-between;
 align-items: center;
 `,
            [
              cE(
                'main',
                `
 flex: 1;
 `
              ),
              cE(
                'close',
                `
 margin-left: 6px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `
              )
            ]
          ),
          cB(
            'drawer-footer',
            `
 display: flex;
 justify-content: flex-end;
 border-top: var(--n-footer-border-top);
 transition: border .3s var(--n-bezier);
 padding: var(--n-footer-padding);
 `
          )
        ]
      ),
      cM(
        'right-placement',
        `
 top: 0;
 bottom: 0;
 right: 0;
 border-top-left-radius: var(--n-border-radius);
 border-bottom-left-radius: var(--n-border-radius);
 `,
        [
          cE(
            'resize-trigger',
            `
 width: 3px;
 height: 100%;
 top: 0;
 left: 0;
 transform: translateX(-1.5px);
 cursor: ew-resize;
 `
          )
        ]
      ),
      cM(
        'left-placement',
        `
 top: 0;
 bottom: 0;
 left: 0;
 border-top-right-radius: var(--n-border-radius);
 border-bottom-right-radius: var(--n-border-radius);
 `,
        [
          cE(
            'resize-trigger',
            `
 width: 3px;
 height: 100%;
 top: 0;
 right: 0;
 transform: translateX(1.5px);
 cursor: ew-resize;
 `
          )
        ]
      ),
      cM(
        'top-placement',
        `
 top: 0;
 left: 0;
 right: 0;
 border-bottom-left-radius: var(--n-border-radius);
 border-bottom-right-radius: var(--n-border-radius);
 `,
        [
          cE(
            'resize-trigger',
            `
 width: 100%;
 height: 3px;
 bottom: 0;
 left: 0;
 transform: translateY(1.5px);
 cursor: ns-resize;
 `
          )
        ]
      ),
      cM(
        'bottom-placement',
        `
 left: 0;
 bottom: 0;
 right: 0;
 border-top-left-radius: var(--n-border-radius);
 border-top-right-radius: var(--n-border-radius);
 `,
        [
          cE(
            'resize-trigger',
            `
 width: 100%;
 height: 3px;
 top: 0;
 left: 0;
 transform: translateY(-1.5px);
 cursor: ns-resize;
 `
          )
        ]
      )
    ]
  ),
  c('body', [
    c('>', [
      cB(
        'drawer-container',
        `
 position: fixed;
 `
      )
    ])
  ]),
  cB(
    'drawer-container',
    `
 position: relative;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 pointer-events: none;
 `,
    [
      c(
        '> *',
        `
 pointer-events: all;
 `
      )
    ]
  ),
  cB(
    'drawer-mask',
    `
 background-color: rgba(0, 0, 0, .3);
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `,
    [
      cM(
        'invisible',
        `
 background-color: rgba(0, 0, 0, 0)
 `
      ),
      fadeInTransition({
        enterDuration: '0.2s',
        leaveDuration: '0.2s',
        enterCubicBezier: 'var(--n-bezier-in)',
        leaveCubicBezier: 'var(--n-bezier-out)'
      })
    ]
  )
])
const drawerProps = Object.assign(Object.assign({}, useTheme.props), {
  show: Boolean,
  width: [Number, String],
  height: [Number, String],
  placement: {
    type: String,
    default: 'right'
  },
  maskClosable: {
    type: Boolean,
    default: true
  },
  showMask: {
    type: [Boolean, String],
    default: true
  },
  to: [String, Object],
  displayDirective: {
    type: String,
    default: 'if'
  },
  nativeScrollbar: {
    type: Boolean,
    default: true
  },
  zIndex: Number,
  onMaskClick: Function,
  scrollbarProps: Object,
  contentClass: String,
  contentStyle: [Object, String],
  trapFocus: {
    type: Boolean,
    default: true
  },
  onEsc: Function,
  autoFocus: {
    type: Boolean,
    default: true
  },
  closeOnEsc: {
    type: Boolean,
    default: true
  },
  blockScroll: {
    type: Boolean,
    default: true
  },
  maxWidth: Number,
  maxHeight: Number,
  minWidth: Number,
  minHeight: Number,
  resizable: Boolean,
  defaultWidth: {
    type: [Number, String],
    default: 251
  },
  defaultHeight: {
    type: [Number, String],
    default: 251
  },
  onUpdateWidth: [Function, Array],
  onUpdateHeight: [Function, Array],
  'onUpdate:width': [Function, Array],
  'onUpdate:height': [Function, Array],
  'onUpdate:show': [Function, Array],
  onUpdateShow: [Function, Array],
  onAfterEnter: Function,
  onAfterLeave: Function,
  /** @deprecated */
  drawerStyle: [String, Object],
  drawerClass: String,
  target: null,
  onShow: Function,
  onHide: Function
})
const __unplugin_components_0 = defineComponent({
  name: 'Drawer',
  inheritAttrs: false,
  props: drawerProps,
  setup(props) {
    const { mergedClsPrefixRef, namespaceRef, inlineThemeDisabled } = useConfig(props)
    const isMountedRef = isMounted()
    const themeRef = useTheme('Drawer', '-drawer', style$1, drawerLight, props, mergedClsPrefixRef)
    const uncontrolledWidthRef = ref(props.defaultWidth)
    const uncontrolledHeightRef = ref(props.defaultHeight)
    const mergedWidthRef = useMergedState(toRef(props, 'width'), uncontrolledWidthRef)
    const mergedHeightRef = useMergedState(toRef(props, 'height'), uncontrolledHeightRef)
    const styleWidthRef = computed(() => {
      const { placement } = props
      if (placement === 'top' || placement === 'bottom') return ''
      return formatLength(mergedWidthRef.value)
    })
    const styleHeightRef = computed(() => {
      const { placement } = props
      if (placement === 'left' || placement === 'right') return ''
      return formatLength(mergedHeightRef.value)
    })
    const doUpdateWidth = (value) => {
      const { onUpdateWidth, 'onUpdate:width': _onUpdateWidth } = props
      if (onUpdateWidth) call(onUpdateWidth, value)
      if (_onUpdateWidth) call(_onUpdateWidth, value)
      uncontrolledWidthRef.value = value
    }
    const doUpdateHeight = (value) => {
      const { onUpdateHeight, 'onUpdate:width': _onUpdateHeight } = props
      if (onUpdateHeight) call(onUpdateHeight, value)
      if (_onUpdateHeight) call(_onUpdateHeight, value)
      uncontrolledHeightRef.value = value
    }
    const mergedBodyStyleRef = computed(() => {
      return [
        {
          width: styleWidthRef.value,
          height: styleHeightRef.value
        },
        props.drawerStyle || ''
      ]
    })
    function handleMaskClick(e) {
      const { onMaskClick, maskClosable } = props
      if (maskClosable) {
        doUpdateShow(false)
      }
      if (onMaskClick) onMaskClick(e)
    }
    function handleOutsideClick(e) {
      handleMaskClick(e)
    }
    const isComposingRef = useIsComposing()
    function handleEsc(e) {
      var _a
      ;(_a = props.onEsc) === null || _a === void 0 ? void 0 : _a.call(props)
      if (props.show && props.closeOnEsc && eventEffectNotPerformed(e)) {
        if (!isComposingRef.value) {
          doUpdateShow(false)
        }
      }
    }
    function doUpdateShow(show) {
      const { onHide, onUpdateShow, 'onUpdate:show': _onUpdateShow } = props
      if (onUpdateShow) call(onUpdateShow, show)
      if (_onUpdateShow) call(_onUpdateShow, show)
      if (onHide && !show) call(onHide, show)
    }
    provide(drawerInjectionKey, {
      isMountedRef,
      mergedThemeRef: themeRef,
      mergedClsPrefixRef,
      doUpdateShow,
      doUpdateHeight,
      doUpdateWidth
    })
    const cssVarsRef = computed(() => {
      const {
        common: {
          cubicBezierEaseInOut,
          cubicBezierEaseIn: cubicBezierEaseIn2,
          cubicBezierEaseOut: cubicBezierEaseOut2
        },
        self: {
          color,
          textColor,
          boxShadow,
          lineHeight,
          headerPadding,
          footerPadding,
          borderRadius,
          bodyPadding,
          titleFontSize,
          titleTextColor,
          titleFontWeight,
          headerBorderBottom,
          footerBorderTop,
          closeIconColor,
          closeIconColorHover,
          closeIconColorPressed,
          closeColorHover,
          closeColorPressed,
          closeIconSize,
          closeSize,
          closeBorderRadius,
          resizableTriggerColorHover
        }
      } = themeRef.value
      return {
        '--n-line-height': lineHeight,
        '--n-color': color,
        '--n-border-radius': borderRadius,
        '--n-text-color': textColor,
        '--n-box-shadow': boxShadow,
        '--n-bezier': cubicBezierEaseInOut,
        '--n-bezier-out': cubicBezierEaseOut2,
        '--n-bezier-in': cubicBezierEaseIn2,
        '--n-header-padding': headerPadding,
        '--n-body-padding': bodyPadding,
        '--n-footer-padding': footerPadding,
        '--n-title-text-color': titleTextColor,
        '--n-title-font-size': titleFontSize,
        '--n-title-font-weight': titleFontWeight,
        '--n-header-border-bottom': headerBorderBottom,
        '--n-footer-border-top': footerBorderTop,
        '--n-close-icon-color': closeIconColor,
        '--n-close-icon-color-hover': closeIconColorHover,
        '--n-close-icon-color-pressed': closeIconColorPressed,
        '--n-close-size': closeSize,
        '--n-close-color-hover': closeColorHover,
        '--n-close-color-pressed': closeColorPressed,
        '--n-close-icon-size': closeIconSize,
        '--n-close-border-radius': closeBorderRadius,
        '--n-resize-trigger-color-hover': resizableTriggerColorHover
      }
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass('drawer', void 0, cssVarsRef, props)
      : void 0
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      namespace: namespaceRef,
      mergedBodyStyle: mergedBodyStyleRef,
      handleOutsideClick,
      handleMaskClick,
      handleEsc,
      mergedTheme: themeRef,
      cssVars: inlineThemeDisabled ? void 0 : cssVarsRef,
      themeClass:
        themeClassHandle === null || themeClassHandle === void 0
          ? void 0
          : themeClassHandle.themeClass,
      onRender:
        themeClassHandle === null || themeClassHandle === void 0
          ? void 0
          : themeClassHandle.onRender,
      isMounted: isMountedRef
    }
  },
  render() {
    const { mergedClsPrefix } = this
    return h(
      LazyTeleport,
      {
        to: this.to,
        show: this.show
      },
      {
        default: () => {
          var _a
          ;(_a = this.onRender) === null || _a === void 0 ? void 0 : _a.call(this)
          return withDirectives(
            h(
              'div',
              {
                class: [`${mergedClsPrefix}-drawer-container`, this.namespace, this.themeClass],
                style: this.cssVars,
                role: 'none'
              },
              this.showMask
                ? h(
                    Transition,
                    {
                      name: 'fade-in-transition',
                      appear: this.isMounted
                    },
                    {
                      default: () =>
                        this.show
                          ? h('div', {
                              'aria-hidden': true,
                              class: [
                                `${mergedClsPrefix}-drawer-mask`,
                                this.showMask === 'transparent' &&
                                  `${mergedClsPrefix}-drawer-mask--invisible`
                              ],
                              onClick: this.handleMaskClick
                            })
                          : null
                    }
                  )
                : null,
              h(
                NDrawerBodyWrapper,
                Object.assign({}, this.$attrs, {
                  class: [this.drawerClass, this.$attrs.class],
                  style: [this.mergedBodyStyle, this.$attrs.style],
                  blockScroll: this.blockScroll,
                  contentStyle: this.contentStyle,
                  contentClass: this.contentClass,
                  placement: this.placement,
                  scrollbarProps: this.scrollbarProps,
                  show: this.show,
                  displayDirective: this.displayDirective,
                  nativeScrollbar: this.nativeScrollbar,
                  onAfterEnter: this.onAfterEnter,
                  onAfterLeave: this.onAfterLeave,
                  trapFocus: this.trapFocus,
                  autoFocus: this.autoFocus,
                  resizable: this.resizable,
                  maxHeight: this.maxHeight,
                  minHeight: this.minHeight,
                  maxWidth: this.maxWidth,
                  minWidth: this.minWidth,
                  showMask: this.showMask,
                  onEsc: this.handleEsc,
                  onClickoutside: this.handleOutsideClick
                }),
                this.$slots
              )
            ),
            [
              [
                zindexable,
                {
                  zIndex: this.zIndex,
                  enabled: this.show
                }
              ]
            ]
          )
        }
      }
    )
  }
})
const drawerContentProps = {
  title: String,
  headerClass: String,
  headerStyle: [Object, String],
  footerClass: String,
  footerStyle: [Object, String],
  bodyClass: String,
  bodyStyle: [Object, String],
  bodyContentClass: String,
  bodyContentStyle: [Object, String],
  nativeScrollbar: {
    type: Boolean,
    default: true
  },
  scrollbarProps: Object,
  closable: Boolean
}
const __unplugin_components_3 = defineComponent({
  name: 'DrawerContent',
  props: drawerContentProps,
  slots: Object,
  setup() {
    const NDrawer = inject(drawerInjectionKey, null)
    if (!NDrawer) {
      throwError('drawer-content', '`n-drawer-content` must be placed inside `n-drawer`.')
    }
    const { doUpdateShow } = NDrawer
    function handleCloseClick() {
      doUpdateShow(false)
    }
    return {
      handleCloseClick,
      mergedTheme: NDrawer.mergedThemeRef,
      mergedClsPrefix: NDrawer.mergedClsPrefixRef
    }
  },
  render() {
    const {
      title,
      mergedClsPrefix,
      nativeScrollbar,
      mergedTheme,
      bodyClass,
      bodyStyle,
      bodyContentClass,
      bodyContentStyle,
      headerClass,
      headerStyle,
      footerClass,
      footerStyle,
      scrollbarProps,
      closable,
      $slots
    } = this
    return h(
      'div',
      {
        role: 'none',
        class: [
          `${mergedClsPrefix}-drawer-content`,
          nativeScrollbar && `${mergedClsPrefix}-drawer-content--native-scrollbar`
        ]
      },
      $slots.header || title || closable
        ? h(
            'div',
            {
              class: [`${mergedClsPrefix}-drawer-header`, headerClass],
              style: headerStyle,
              role: 'none'
            },
            h(
              'div',
              {
                class: `${mergedClsPrefix}-drawer-header__main`,
                role: 'heading',
                'aria-level': '1'
              },
              $slots.header !== void 0 ? $slots.header() : title
            ),
            closable &&
              h(NBaseClose, {
                onClick: this.handleCloseClick,
                clsPrefix: mergedClsPrefix,
                class: `${mergedClsPrefix}-drawer-header__close`,
                absolute: true
              })
          )
        : null,
      nativeScrollbar
        ? h(
            'div',
            {
              class: [`${mergedClsPrefix}-drawer-body`, bodyClass],
              style: bodyStyle,
              role: 'none'
            },
            h(
              'div',
              {
                class: [`${mergedClsPrefix}-drawer-body-content-wrapper`, bodyContentClass],
                style: bodyContentStyle,
                role: 'none'
              },
              $slots
            )
          )
        : h(
            Scrollbar,
            Object.assign(
              {
                themeOverrides: mergedTheme.peerOverrides.Scrollbar,
                theme: mergedTheme.peers.Scrollbar
              },
              scrollbarProps,
              {
                class: `${mergedClsPrefix}-drawer-body`,
                contentClass: [`${mergedClsPrefix}-drawer-body-content-wrapper`, bodyContentClass],
                contentStyle: bodyContentStyle
              }
            ),
            $slots
          ),
      $slots.footer
        ? h(
            'div',
            {
              class: [`${mergedClsPrefix}-drawer-footer`, footerClass],
              style: footerStyle,
              role: 'none'
            },
            $slots.footer()
          )
        : null
    )
  }
})
function self(vars) {
  const {
    fontWeight,
    fontSizeLarge,
    fontSizeMedium,
    fontSizeSmall,
    heightLarge,
    heightMedium,
    borderRadius,
    cardColor,
    tableHeaderColor,
    textColor1,
    textColorDisabled,
    textColor2,
    textColor3,
    borderColor,
    hoverColor,
    closeColorHover,
    closeColorPressed,
    closeIconColor,
    closeIconColorHover,
    closeIconColorPressed
  } = vars
  return Object.assign(Object.assign({}, commonVariables$1), {
    itemHeightSmall: heightMedium,
    itemHeightMedium: heightMedium,
    itemHeightLarge: heightLarge,
    fontSizeSmall,
    fontSizeMedium,
    fontSizeLarge,
    borderRadius,
    dividerColor: borderColor,
    borderColor,
    listColor: cardColor,
    headerColor: composite(cardColor, tableHeaderColor),
    titleTextColor: textColor1,
    titleTextColorDisabled: textColorDisabled,
    extraTextColor: textColor3,
    extraTextColorDisabled: textColorDisabled,
    itemTextColor: textColor2,
    itemTextColorDisabled: textColorDisabled,
    itemColorPending: hoverColor,
    titleFontWeight: fontWeight,
    closeColorHover,
    closeColorPressed,
    closeIconColor,
    closeIconColorHover,
    closeIconColorPressed
  })
}
const transferLight = createTheme({
  name: 'Transfer',
  common: derived,
  peers: {
    Checkbox: checkboxLight,
    Scrollbar: scrollbarLight,
    Input: inputLight,
    Empty: emptyLight,
    Button: buttonLight
  },
  self
})
const transferInjectionKey = createInjectionKey('n-transfer')
const style = cB(
  'transfer',
  `
 width: 100%;
 font-size: var(--n-font-size);
 height: 300px;
 display: flex;
 flex-wrap: nowrap;
 word-break: break-word;
`,
  [
    cM('disabled', [
      cB('transfer-list', [
        cB('transfer-list-header', [
          cE(
            'title',
            `
 color: var(--n-header-text-color-disabled);
 `
          ),
          cE(
            'extra',
            `
 color: var(--n-header-extra-text-color-disabled);
 `
          )
        ])
      ])
    ]),
    cB(
      'transfer-list',
      `
 flex: 1;
 min-width: 0;
 height: inherit;
 display: flex;
 flex-direction: column;
 background-clip: padding-box;
 position: relative;
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-list-color);
 `,
      [
        cM(
          'source',
          `
 border-top-left-radius: var(--n-border-radius);
 border-bottom-left-radius: var(--n-border-radius);
 `,
          [cE('border', 'border-right: 1px solid var(--n-divider-color);')]
        ),
        cM(
          'target',
          `
 border-top-right-radius: var(--n-border-radius);
 border-bottom-right-radius: var(--n-border-radius);
 `,
          [cE('border', 'border-left: none;')]
        ),
        cE(
          'border',
          `
 padding: 0 12px;
 border: 1px solid var(--n-border-color);
 transition: border-color .3s var(--n-bezier);
 pointer-events: none;
 border-radius: inherit;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `
        ),
        cB(
          'transfer-list-header',
          `
 min-height: var(--n-header-height);
 box-sizing: border-box;
 display: flex;
 padding: 12px 12px 10px 12px;
 align-items: center;
 background-clip: padding-box;
 border-radius: inherit;
 border-bottom-left-radius: 0;
 border-bottom-right-radius: 0;
 line-height: 1.5;
 transition:
 border-color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `,
          [
            c(
              '> *:not(:first-child)',
              `
 margin-left: 8px;
 `
            ),
            cE(
              'title',
              `
 flex: 1;
 min-width: 0;
 line-height: 1.5;
 font-size: var(--n-header-font-size);
 font-weight: var(--n-header-font-weight);
 transition: color .3s var(--n-bezier);
 color: var(--n-header-text-color);
 `
            ),
            cE(
              'button',
              `
 position: relative;
 `
            ),
            cE(
              'extra',
              `
 transition: color .3s var(--n-bezier);
 font-size: var(--n-extra-font-size);
 margin-right: 0;
 white-space: nowrap;
 color: var(--n-header-extra-text-color);
 `
            )
          ]
        ),
        cB(
          'transfer-list-body',
          `
 flex-basis: 0;
 flex-grow: 1;
 box-sizing: border-box;
 position: relative;
 display: flex;
 flex-direction: column;
 border-radius: inherit;
 border-top-left-radius: 0;
 border-top-right-radius: 0;
 `,
          [
            cB(
              'transfer-filter',
              `
 padding: 4px 12px 8px 12px;
 box-sizing: border-box;
 transition:
 border-color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `
            ),
            cB(
              'transfer-list-flex-container',
              `
 flex: 1;
 position: relative;
 `,
              [
                cB(
                  'scrollbar',
                  `
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 height: unset;
 `
                ),
                cB(
                  'empty',
                  `
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateY(-50%) translateX(-50%);
 `
                ),
                cB(
                  'transfer-list-content',
                  `
 padding: 0;
 margin: 0;
 position: relative;
 `,
                  [
                    cB(
                      'transfer-list-item',
                      `
 padding: 0 12px;
 min-height: var(--n-item-height);
 display: flex;
 align-items: center;
 color: var(--n-item-text-color);
 position: relative;
 transition: color .3s var(--n-bezier);
 `,
                      [
                        cE(
                          'background',
                          `
 position: absolute;
 left: 4px;
 right: 4px;
 top: 0;
 bottom: 0;
 border-radius: var(--n-border-radius);
 transition: background-color .3s var(--n-bezier);
 `
                        ),
                        cE(
                          'checkbox',
                          `
 position: relative;
 margin-right: 8px;
 `
                        ),
                        cE(
                          'close',
                          `
 opacity: 0;
 pointer-events: none;
 position: relative;
 transition:
 opacity .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `
                        ),
                        cE(
                          'label',
                          `
 position: relative;
 min-width: 0;
 flex-grow: 1;
 `
                        ),
                        cM('source', 'cursor: pointer;'),
                        cM(
                          'disabled',
                          `
 cursor: not-allowed;
 color: var(--n-item-text-color-disabled);
 `
                        ),
                        cNotM('disabled', [
                          c('&:hover', [
                            cE('background', 'background-color: var(--n-item-color-pending);'),
                            cE(
                              'close',
                              `
 opacity: 1;
 pointer-events: all;
 `
                            )
                          ])
                        ])
                      ]
                    )
                  ]
                )
              ]
            )
          ]
        )
      ]
    )
  ]
)
const NTransferFilter = defineComponent({
  name: 'TransferFilter',
  props: {
    value: String,
    placeholder: String,
    disabled: Boolean,
    onUpdateValue: {
      type: Function,
      required: true
    }
  },
  setup() {
    const { mergedThemeRef, mergedClsPrefixRef } = inject(transferInjectionKey)
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      mergedTheme: mergedThemeRef
    }
  },
  render() {
    const { mergedTheme, mergedClsPrefix } = this
    return h(
      'div',
      {
        class: `${mergedClsPrefix}-transfer-filter`
      },
      h(
        __unplugin_components_1$1,
        {
          value: this.value,
          onUpdateValue: this.onUpdateValue,
          disabled: this.disabled,
          placeholder: this.placeholder,
          theme: mergedTheme.peers.Input,
          themeOverrides: mergedTheme.peerOverrides.Input,
          clearable: true,
          size: 'small'
        },
        {
          'clear-icon-placeholder': () =>
            h(
              NBaseIcon,
              {
                clsPrefix: mergedClsPrefix
              },
              {
                default: () => h(SearchIcon, null)
              }
            )
        }
      )
    )
  }
})
const NTransferHeader = defineComponent({
  name: 'TransferHeader',
  props: {
    size: {
      type: String,
      required: true
    },
    selectAllText: String,
    clearText: String,
    source: Boolean,
    onCheckedAll: Function,
    onClearAll: Function,
    title: [String, Function]
  },
  setup(props) {
    const {
      targetOptionsRef,
      canNotSelectAnythingRef,
      canBeClearedRef,
      allCheckedRef,
      mergedThemeRef,
      disabledRef,
      mergedClsPrefixRef,
      srcOptionsLengthRef
    } = inject(transferInjectionKey)
    const { localeRef } = useLocale('Transfer')
    return () => {
      const { source, onClearAll, onCheckedAll, selectAllText, clearText } = props
      const { value: mergedTheme } = mergedThemeRef
      const { value: mergedClsPrefix } = mergedClsPrefixRef
      const { value: locale } = localeRef
      const buttonSize = props.size === 'large' ? 'small' : 'tiny'
      const { title } = props
      return h(
        'div',
        {
          class: `${mergedClsPrefix}-transfer-list-header`
        },
        title &&
          h(
            'div',
            {
              class: `${mergedClsPrefix}-transfer-list-header__title`
            },
            typeof title === 'function' ? title() : title
          ),
        source &&
          h(
            Button,
            {
              class: `${mergedClsPrefix}-transfer-list-header__button`,
              theme: mergedTheme.peers.Button,
              themeOverrides: mergedTheme.peerOverrides.Button,
              size: buttonSize,
              tertiary: true,
              onClick: allCheckedRef.value ? onClearAll : onCheckedAll,
              disabled: canNotSelectAnythingRef.value || disabledRef.value
            },
            {
              default: () =>
                allCheckedRef.value
                  ? clearText || locale.unselectAll
                  : selectAllText || locale.selectAll
            }
          ),
        !source &&
          canBeClearedRef.value &&
          h(
            Button,
            {
              class: `${mergedClsPrefix}-transfer-list-header__button`,
              theme: mergedTheme.peers.Button,
              themeOverrides: mergedTheme.peerOverrides.Button,
              size: buttonSize,
              tertiary: true,
              onClick: onClearAll,
              disabled: disabledRef.value
            },
            {
              default: () => locale.clearAll
            }
          ),
        h(
          'div',
          {
            class: `${mergedClsPrefix}-transfer-list-header__extra`
          },
          source
            ? locale.total(srcOptionsLengthRef.value)
            : locale.selected(targetOptionsRef.value.length)
        )
      )
    }
  }
})
const NTransferListItem = defineComponent({
  name: 'NTransferListItem',
  props: {
    source: Boolean,
    label: {
      type: String,
      required: true
    },
    value: {
      type: [String, Number],
      required: true
    },
    disabled: Boolean,
    option: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const {
      targetValueSetRef,
      mergedClsPrefixRef,
      mergedThemeRef,
      handleItemCheck,
      renderSourceLabelRef,
      renderTargetLabelRef,
      showSelectedRef
    } = inject(transferInjectionKey)
    const checkedRef = useMemo(() => targetValueSetRef.value.has(props.value))
    function handleClick() {
      if (!props.disabled) {
        handleItemCheck(!checkedRef.value, props.value)
      }
    }
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      mergedTheme: mergedThemeRef,
      checked: checkedRef,
      showSelected: showSelectedRef,
      renderSourceLabel: renderSourceLabelRef,
      renderTargetLabel: renderTargetLabelRef,
      handleClick
    }
  },
  render() {
    const {
      disabled,
      mergedTheme,
      mergedClsPrefix,
      label,
      checked,
      source,
      renderSourceLabel,
      renderTargetLabel
    } = this
    return h(
      'div',
      {
        class: [
          `${mergedClsPrefix}-transfer-list-item`,
          disabled && `${mergedClsPrefix}-transfer-list-item--disabled`,
          source
            ? `${mergedClsPrefix}-transfer-list-item--source`
            : `${mergedClsPrefix}-transfer-list-item--target`
        ],
        onClick: source ? this.handleClick : void 0
      },
      h('div', {
        class: `${mergedClsPrefix}-transfer-list-item__background`
      }),
      source &&
        this.showSelected &&
        h(
          'div',
          {
            class: `${mergedClsPrefix}-transfer-list-item__checkbox`
          },
          h(__unplugin_components_1$2, {
            theme: mergedTheme.peers.Checkbox,
            themeOverrides: mergedTheme.peerOverrides.Checkbox,
            disabled,
            checked
          })
        ),
      h(
        'div',
        {
          class: `${mergedClsPrefix}-transfer-list-item__label`,
          title: getTitleAttribute(label)
        },
        source
          ? renderSourceLabel
            ? renderSourceLabel({
                option: this.option
              })
            : label
          : renderTargetLabel
            ? renderTargetLabel({
                option: this.option
              })
            : label
      ),
      !source &&
        !disabled &&
        h(NBaseClose, {
          focusable: false,
          class: `${mergedClsPrefix}-transfer-list-item__close`,
          clsPrefix: mergedClsPrefix,
          onClick: this.handleClick
        })
    )
  }
})
const NTransferList = defineComponent({
  name: 'TransferList',
  props: {
    virtualScroll: {
      type: Boolean,
      required: true
    },
    itemSize: {
      type: Number,
      required: true
    },
    options: {
      type: Array,
      required: true
    },
    disabled: {
      type: Boolean,
      required: true
    },
    source: Boolean
  },
  setup() {
    const { mergedThemeRef, mergedClsPrefixRef } = inject(transferInjectionKey)
    const scrollerInstRef = ref(null)
    const vlInstRef = ref(null)
    function syncVLScroller() {
      var _a
      ;(_a = scrollerInstRef.value) === null || _a === void 0 ? void 0 : _a.sync()
    }
    function scrollContainer() {
      const { value } = vlInstRef
      if (!value) return null
      const { listElRef } = value
      return listElRef
    }
    function scrollContent() {
      const { value } = vlInstRef
      if (!value) return null
      const { itemsElRef } = value
      return itemsElRef
    }
    return {
      mergedTheme: mergedThemeRef,
      mergedClsPrefix: mergedClsPrefixRef,
      scrollerInstRef,
      vlInstRef,
      syncVLScroller,
      scrollContainer,
      scrollContent
    }
  },
  render() {
    const { mergedTheme, options } = this
    if (options.length === 0) {
      return h(NEmpty, {
        theme: mergedTheme.peers.Empty,
        themeOverrides: mergedTheme.peerOverrides.Empty
      })
    }
    const { mergedClsPrefix, virtualScroll, source, disabled, syncVLScroller } = this
    return h(
      Scrollbar,
      {
        ref: 'scrollerInstRef',
        theme: mergedTheme.peers.Scrollbar,
        themeOverrides: mergedTheme.peerOverrides.Scrollbar,
        container: virtualScroll ? this.scrollContainer : void 0,
        content: virtualScroll ? this.scrollContent : void 0
      },
      {
        default: () =>
          virtualScroll
            ? h(
                VVirtualList,
                {
                  ref: 'vlInstRef',
                  style: {
                    height: '100%'
                  },
                  class: `${mergedClsPrefix}-transfer-list-content`,
                  items: this.options,
                  itemSize: this.itemSize,
                  showScrollbar: false,
                  onResize: syncVLScroller,
                  onScroll: syncVLScroller,
                  keyField: 'value'
                },
                {
                  default: ({ item }) => {
                    const { source: source2, disabled: disabled2 } = this
                    return h(NTransferListItem, {
                      source: source2,
                      key: item.value,
                      value: item.value,
                      disabled: item.disabled || disabled2,
                      label: item.label,
                      option: item
                    })
                  }
                }
              )
            : h(
                'div',
                {
                  class: `${mergedClsPrefix}-transfer-list-content`
                },
                options.map((option) =>
                  h(NTransferListItem, {
                    source,
                    key: option.value,
                    value: option.value,
                    disabled: option.disabled || disabled,
                    label: option.label,
                    option
                  })
                )
              )
      }
    )
  }
})
function useTransferData(props) {
  const uncontrolledValueRef = ref(props.defaultValue)
  const mergedValueRef = useMergedState(toRef(props, 'value'), uncontrolledValueRef)
  const optionsMapRef = computed(() => {
    const map = /* @__PURE__ */ new Map()
    ;(props.options || []).forEach((opt) => map.set(opt.value, opt))
    return map
  })
  const targetValueSetRef = computed(() => new Set(mergedValueRef.value || []))
  const targetOptionsRef = computed(() => {
    const optionMap = optionsMapRef.value
    const targetOptions = []
    ;(mergedValueRef.value || []).forEach((v) => {
      const option = optionMap.get(v)
      if (option) {
        targetOptions.push(option)
      }
    })
    return targetOptions
  })
  const srcPatternRef = ref('')
  const tgtPatternRef = ref('')
  const mergedSrcFilterableRef = computed(() => {
    return props.sourceFilterable || !!props.filterable
  })
  const filteredSrcOptionsRef = computed(() => {
    const { showSelected, options, filter } = props
    if (!mergedSrcFilterableRef.value) {
      if (showSelected) {
        return options
      } else {
        return options.filter((option) => !targetValueSetRef.value.has(option.value))
      }
    }
    return options.filter((option) => {
      return (
        filter(srcPatternRef.value, option, 'source') &&
        (showSelected || !targetValueSetRef.value.has(option.value))
      )
    })
  })
  const filteredTgtOptionsRef = computed(() => {
    if (!props.targetFilterable) return targetOptionsRef.value
    const { filter } = props
    return targetOptionsRef.value.filter((opt) => filter(tgtPatternRef.value, opt, 'target'))
  })
  const mergedValueSetRef = computed(() => {
    const { value } = mergedValueRef
    if (value === null) return /* @__PURE__ */ new Set()
    return new Set(value)
  })
  const valueSetForCheckAllRef = computed(() => {
    const values = new Set(mergedValueSetRef.value)
    filteredSrcOptionsRef.value.forEach((option) => {
      if (!option.disabled && !values.has(option.value)) {
        values.add(option.value)
      }
    })
    return values
  })
  const valueSetForUncheckAllRef = computed(() => {
    const values = new Set(mergedValueSetRef.value)
    filteredSrcOptionsRef.value.forEach((option) => {
      if (!option.disabled && values.has(option.value)) {
        values.delete(option.value)
      }
    })
    return values
  })
  const valueSetForClearRef = computed(() => {
    const values = new Set(mergedValueSetRef.value)
    filteredTgtOptionsRef.value.forEach((option) => {
      if (!option.disabled) {
        values.delete(option.value)
      }
    })
    return values
  })
  const canNotSelectAnythingRef = computed(() => {
    return filteredSrcOptionsRef.value.every((option) => option.disabled)
  })
  const allCheckedRef = computed(() => {
    if (!filteredSrcOptionsRef.value.length) {
      return false
    }
    const mergedValueSet = mergedValueSetRef.value
    return filteredSrcOptionsRef.value.every(
      (option) => option.disabled || mergedValueSet.has(option.value)
    )
  })
  const canBeClearedRef = computed(() => {
    return filteredTgtOptionsRef.value.some((option) => !option.disabled)
  })
  function handleSrcFilterUpdateValue(value) {
    srcPatternRef.value = value !== null && value !== void 0 ? value : ''
  }
  function handleTgtFilterUpdateValue(value) {
    tgtPatternRef.value = value !== null && value !== void 0 ? value : ''
  }
  return {
    uncontrolledValueRef,
    mergedValueRef,
    targetValueSetRef,
    valueSetForCheckAllRef,
    valueSetForUncheckAllRef,
    valueSetForClearRef,
    filteredTgtOptionsRef,
    filteredSrcOptionsRef,
    targetOptionsRef,
    canNotSelectAnythingRef,
    canBeClearedRef,
    allCheckedRef,
    srcPatternRef,
    tgtPatternRef,
    mergedSrcFilterableRef,
    handleSrcFilterUpdateValue,
    handleTgtFilterUpdateValue
  }
}
const transferProps = Object.assign(Object.assign({}, useTheme.props), {
  value: Array,
  defaultValue: {
    type: Array,
    default: null
  },
  options: {
    type: Array,
    default: () => []
  },
  disabled: {
    type: Boolean,
    default: void 0
  },
  virtualScroll: Boolean,
  sourceTitle: [String, Function],
  selectAllText: String,
  clearText: String,
  targetTitle: [String, Function],
  filterable: {
    type: Boolean,
    default: void 0
  },
  sourceFilterable: Boolean,
  targetFilterable: Boolean,
  showSelected: {
    type: Boolean,
    default: true
  },
  sourceFilterPlaceholder: String,
  targetFilterPlaceholder: String,
  filter: {
    type: Function,
    default: (pattern, option) => {
      if (!pattern) return true
      return ~`${option.label}`.toLowerCase().indexOf(`${pattern}`.toLowerCase())
    }
  },
  size: String,
  renderSourceLabel: Function,
  renderTargetLabel: Function,
  renderSourceList: Function,
  renderTargetList: Function,
  'onUpdate:value': [Function, Array],
  onUpdateValue: [Function, Array],
  onChange: [Function, Array]
})
const __unplugin_components_1 = defineComponent({
  name: 'Transfer',
  props: transferProps,
  setup(props) {
    const { mergedClsPrefixRef } = useConfig(props)
    const themeRef = useTheme(
      'Transfer',
      '-transfer',
      style,
      transferLight,
      props,
      mergedClsPrefixRef
    )
    const formItem = useFormItem(props)
    const { mergedSizeRef, mergedDisabledRef } = formItem
    const itemSizeRef = computed(() => {
      const { value: size } = mergedSizeRef
      const {
        self: { [createKey('itemHeight', size)]: itemSize }
      } = themeRef.value
      return depx(itemSize)
    })
    const {
      uncontrolledValueRef,
      mergedValueRef,
      targetValueSetRef,
      valueSetForCheckAllRef,
      valueSetForUncheckAllRef,
      valueSetForClearRef,
      filteredTgtOptionsRef,
      filteredSrcOptionsRef,
      targetOptionsRef,
      canNotSelectAnythingRef,
      canBeClearedRef,
      allCheckedRef,
      srcPatternRef,
      tgtPatternRef,
      mergedSrcFilterableRef,
      handleSrcFilterUpdateValue,
      handleTgtFilterUpdateValue
    } = useTransferData(props)
    function doUpdateValue(value) {
      const { onUpdateValue, 'onUpdate:value': _onUpdateValue, onChange } = props
      const { nTriggerFormInput, nTriggerFormChange } = formItem
      if (onUpdateValue) call(onUpdateValue, value)
      if (_onUpdateValue) call(_onUpdateValue, value)
      if (onChange) call(onChange, value)
      uncontrolledValueRef.value = value
      nTriggerFormInput()
      nTriggerFormChange()
    }
    function handleSourceCheckAll() {
      doUpdateValue([...valueSetForCheckAllRef.value])
    }
    function handleSourceUncheckAll() {
      doUpdateValue([...valueSetForUncheckAllRef.value])
    }
    function handleTargetClearAll() {
      doUpdateValue([...valueSetForClearRef.value])
    }
    function handleItemCheck(checked, optionValue) {
      if (checked) {
        doUpdateValue((mergedValueRef.value || []).concat(optionValue))
      } else {
        doUpdateValue((mergedValueRef.value || []).filter((v) => v !== optionValue))
      }
    }
    function handleChecked(optionValueList) {
      doUpdateValue(optionValueList)
    }
    provide(transferInjectionKey, {
      targetValueSetRef,
      mergedClsPrefixRef,
      disabledRef: mergedDisabledRef,
      mergedThemeRef: themeRef,
      targetOptionsRef,
      canNotSelectAnythingRef,
      canBeClearedRef,
      allCheckedRef,
      srcOptionsLengthRef: computed(() => props.options.length),
      handleItemCheck,
      renderSourceLabelRef: toRef(props, 'renderSourceLabel'),
      renderTargetLabelRef: toRef(props, 'renderTargetLabel'),
      showSelectedRef: toRef(props, 'showSelected')
    })
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      mergedDisabled: mergedDisabledRef,
      itemSize: itemSizeRef,
      isMounted: isMounted(),
      mergedTheme: themeRef,
      filteredSrcOpts: filteredSrcOptionsRef,
      filteredTgtOpts: filteredTgtOptionsRef,
      srcPattern: srcPatternRef,
      tgtPattern: tgtPatternRef,
      mergedSize: mergedSizeRef,
      mergedSrcFilterable: mergedSrcFilterableRef,
      handleSrcFilterUpdateValue,
      handleTgtFilterUpdateValue,
      handleSourceCheckAll,
      handleSourceUncheckAll,
      handleTargetClearAll,
      handleItemCheck,
      handleChecked,
      cssVars: computed(() => {
        const { value: size } = mergedSizeRef
        const {
          common: { cubicBezierEaseInOut },
          self: {
            borderRadius,
            borderColor,
            listColor,
            titleTextColor,
            titleTextColorDisabled,
            extraTextColor,
            itemTextColor,
            itemColorPending,
            itemTextColorDisabled,
            titleFontWeight,
            closeColorHover,
            closeColorPressed,
            closeIconColor,
            closeIconColorHover,
            closeIconColorPressed,
            closeIconSize,
            closeSize,
            dividerColor,
            extraTextColorDisabled,
            [createKey('extraFontSize', size)]: extraFontSize,
            [createKey('fontSize', size)]: fontSize,
            [createKey('titleFontSize', size)]: titleFontSize,
            [createKey('itemHeight', size)]: itemHeight,
            [createKey('headerHeight', size)]: headerHeight
          }
        } = themeRef.value
        return {
          '--n-bezier': cubicBezierEaseInOut,
          '--n-border-color': borderColor,
          '--n-border-radius': borderRadius,
          '--n-extra-font-size': extraFontSize,
          '--n-font-size': fontSize,
          '--n-header-font-size': titleFontSize,
          '--n-header-extra-text-color': extraTextColor,
          '--n-header-extra-text-color-disabled': extraTextColorDisabled,
          '--n-header-font-weight': titleFontWeight,
          '--n-header-text-color': titleTextColor,
          '--n-header-text-color-disabled': titleTextColorDisabled,
          '--n-item-color-pending': itemColorPending,
          '--n-item-height': itemHeight,
          '--n-item-text-color': itemTextColor,
          '--n-item-text-color-disabled': itemTextColorDisabled,
          '--n-list-color': listColor,
          '--n-header-height': headerHeight,
          '--n-close-size': closeSize,
          '--n-close-icon-size': closeIconSize,
          '--n-close-color-hover': closeColorHover,
          '--n-close-color-pressed': closeColorPressed,
          '--n-close-icon-color': closeIconColor,
          '--n-close-icon-color-hover': closeIconColorHover,
          '--n-close-icon-color-pressed': closeIconColorPressed,
          '--n-divider-color': dividerColor
        }
      })
    }
  },
  render() {
    const {
      mergedClsPrefix,
      renderSourceList,
      renderTargetList,
      mergedTheme,
      mergedSrcFilterable,
      targetFilterable
    } = this
    return h(
      'div',
      {
        class: [
          `${mergedClsPrefix}-transfer`,
          this.mergedDisabled && `${mergedClsPrefix}-transfer--disabled`
        ],
        style: this.cssVars
      },
      h(
        'div',
        {
          class: `${mergedClsPrefix}-transfer-list ${mergedClsPrefix}-transfer-list--source`
        },
        h(NTransferHeader, {
          source: true,
          selectAllText: this.selectAllText,
          clearText: this.clearText,
          title: this.sourceTitle,
          onCheckedAll: this.handleSourceCheckAll,
          onClearAll: this.handleSourceUncheckAll,
          size: this.mergedSize
        }),
        h(
          'div',
          {
            class: `${mergedClsPrefix}-transfer-list-body`
          },
          mergedSrcFilterable
            ? h(NTransferFilter, {
                onUpdateValue: this.handleSrcFilterUpdateValue,
                value: this.srcPattern,
                disabled: this.mergedDisabled,
                placeholder: this.sourceFilterPlaceholder
              })
            : null,
          h(
            'div',
            {
              class: `${mergedClsPrefix}-transfer-list-flex-container`
            },
            renderSourceList
              ? h(
                  Scrollbar,
                  {
                    theme: mergedTheme.peers.Scrollbar,
                    themeOverrides: mergedTheme.peerOverrides.Scrollbar
                  },
                  {
                    default: () =>
                      renderSourceList({
                        onCheck: this.handleChecked,
                        checkedOptions: this.filteredTgtOpts,
                        pattern: this.srcPattern
                      })
                  }
                )
              : h(NTransferList, {
                  source: true,
                  options: this.filteredSrcOpts,
                  disabled: this.mergedDisabled,
                  virtualScroll: this.virtualScroll,
                  itemSize: this.itemSize
                })
          )
        ),
        h('div', {
          class: `${mergedClsPrefix}-transfer-list__border`
        })
      ),
      h(
        'div',
        {
          class: `${mergedClsPrefix}-transfer-list ${mergedClsPrefix}-transfer-list--target`
        },
        h(NTransferHeader, {
          onClearAll: this.handleTargetClearAll,
          size: this.mergedSize,
          title: this.targetTitle
        }),
        h(
          'div',
          {
            class: `${mergedClsPrefix}-transfer-list-body`
          },
          targetFilterable
            ? h(NTransferFilter, {
                onUpdateValue: this.handleTgtFilterUpdateValue,
                value: this.tgtPattern,
                disabled: this.mergedDisabled,
                placeholder: this.sourceFilterPlaceholder
              })
            : null,
          h(
            'div',
            {
              class: `${mergedClsPrefix}-transfer-list-flex-container`
            },
            renderTargetList
              ? h(
                  Scrollbar,
                  {
                    theme: mergedTheme.peers.Scrollbar,
                    themeOverrides: mergedTheme.peerOverrides.Scrollbar
                  },
                  {
                    default: () =>
                      renderTargetList({
                        onCheck: this.handleChecked,
                        checkedOptions: this.filteredTgtOpts,
                        pattern: this.tgtPattern
                      })
                  }
                )
              : h(NTransferList, {
                  options: this.filteredTgtOpts,
                  disabled: this.mergedDisabled,
                  virtualScroll: this.virtualScroll,
                  itemSize: this.itemSize
                })
          )
        ),
        h('div', {
          class: `${mergedClsPrefix}-transfer-list__border`
        })
      )
    )
  }
})
const Comment = IconWrapper('comment', true, function (props) {
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
          d: 'M44 6H4V36H13V41L23 36H44V6Z',
          fill: props.colors[1],
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
          d: 'M14 19.5V22.5',
          stroke: props.colors[2],
          'stroke-width': props.strokeWidth,
          'stroke-linecap': props.strokeLinecap,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      ),
      createVNode(
        'path',
        {
          d: 'M24 19.5V22.5',
          stroke: props.colors[2],
          'stroke-width': props.strokeWidth,
          'stroke-linecap': props.strokeLinecap,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      ),
      createVNode(
        'path',
        {
          d: 'M34 19.5V22.5',
          stroke: props.colors[2],
          'stroke-width': props.strokeWidth,
          'stroke-linecap': props.strokeLinecap,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      )
    ]
  )
})
const _hoisted_1$8 = {
  class: 'launch-box',
  style: { padding: '10px' }
}
const _hoisted_2$7 = { class: 'footer' }
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: 'GroupLaunch',
  props: {
    groupId: {}
  },
  emits: ['close', 'onInvite', 'onSubmit'],
  setup(__props, { emit: __emit }) {
    const { message } = useInject()
    const props = __props
    const emit = __emit
    const mapData = /* @__PURE__ */ new Map()
    const items = ref([])
    const values = ref([])
    const loading = ref(true)
    const isShowBox = ref(true)
    const modelGroupName = ref('')
    const isCanSubmit = computed(() => {
      return values.value.length === 0
    })
    const renderLabel = function ({ option }) {
      return h(
        'div',
        {
          style: {
            display: 'flex',
            margin: '6px 0'
          }
        },
        {
          default: () => [
            h(__unplugin_components_0$1, {
              round: true,
              src: mapData.get(option.value),
              size: 'small'
            }),
            h(
              'div',
              {
                style: {
                  display: 'flex',
                  marginLeft: '6px',
                  alignSelf: 'center'
                }
              },
              { default: () => option.label }
            )
          ]
        }
      )
    }
    const onLoad = async () => {
      const option = {
        group_id: props.groupId
      }
      const { code, data } = await ServGroupInviteList(option, { loading })
      if (code != 200) return
      const list = data?.items || []
      items.value = list.map((item) => {
        mapData.set(item.user_id, item.avatar)
        return {
          label: item.nickname + (item.remark ? ` (${item.remark})` : ''),
          value: item.user_id,
          avatar: item.avatar
        }
      })
    }
    const close = () => {
      emit('close')
    }
    const onCreateSubmit = async (user_ids) => {
      if (modelGroupName.value.trim() == '') {
        return message.error('请输入群名称')
      }
      const { code, data } = await ServGroupCreate({
        user_ids,
        name: modelGroupName.value.trim()
      })
      if (code != 200) return
      message.success('创建成功')
      emit('onSubmit', data.group_id, modelGroupName.value.trim())
      emit('close')
    }
    const onInviteSubmit = async (user_ids) => {
      const { code } = await ServGroupInvite({
        user_ids,
        group_id: props.groupId
      })
      if (code != 200) return
      message.success('邀请成功')
      emit('onInvite', props.groupId)
      emit('close')
    }
    const onSubmit = () => {
      const ids = values.value.map((value) => value)
      if (props.groupId == 0) {
        onCreateSubmit(ids)
      } else {
        onInviteSubmit(ids)
      }
    }
    onMounted(() => {
      onLoad()
    })
    return (_ctx, _cache) => {
      const _component_n_input = __unplugin_components_1$1
      const _component_n_transfer = __unplugin_components_1
      const _component_n_button = Button
      const _component_n_modal = __unplugin_components_3$1
      const _directive_loading = resolveDirective('loading')
      return (
        openBlock(),
        createBlock(
          _component_n_modal,
          {
            show: unref(isShowBox),
            'onUpdate:show':
              _cache[3] ||
              (_cache[3] = ($event) => (isRef(isShowBox) ? (isShowBox.value = $event) : null)),
            preset: 'card',
            title: _ctx.groupId === 0 ? '创建群聊' : '邀请好友',
            class: 'modal-radius',
            style: { 'max-width': '650px' },
            'on-after-leave': close,
            'transform-origin': 'mouse'
          },
          {
            footer: withCtx(() => [
              createBaseVNode('div', _hoisted_2$7, [
                createVNode(
                  _component_n_button,
                  {
                    type: 'tertiary',
                    onClick: _cache[2] || (_cache[2] = ($event) => (isShowBox.value = false))
                  },
                  {
                    default: withCtx(
                      () => _cache[4] || (_cache[4] = [createTextVNode(' 取消 ', -1)])
                    ),
                    _: 1,
                    __: [4]
                  }
                ),
                createVNode(
                  _component_n_button,
                  {
                    type: 'primary',
                    class: 'mt-l15',
                    style: { color: '#ffffff' },
                    onClick: onSubmit,
                    disabled: unref(isCanSubmit)
                  },
                  {
                    default: withCtx(
                      () => _cache[5] || (_cache[5] = [createTextVNode(' 提交 ', -1)])
                    ),
                    _: 1,
                    __: [5]
                  },
                  8,
                  ['disabled']
                )
              ])
            ]),
            default: withCtx(() => [
              createBaseVNode('section', _hoisted_1$8, [
                withDirectives(
                  createVNode(
                    _component_n_input,
                    {
                      class: 'group-name',
                      placeholder: '请填写群名称(必填)',
                      maxlength: '20',
                      'show-count': '',
                      value: unref(modelGroupName),
                      'onUpdate:value':
                        _cache[0] ||
                        (_cache[0] = ($event) =>
                          isRef(modelGroupName) ? (modelGroupName.value = $event) : null)
                    },
                    null,
                    8,
                    ['value']
                  ),
                  [[vShow, _ctx.groupId === 0]]
                ),
                withDirectives(
                  createVNode(
                    _component_n_transfer,
                    {
                      ref: 'transfer',
                      'virtual-scroll': '',
                      'source-filterable': '',
                      value: unref(values),
                      'onUpdate:value':
                        _cache[1] ||
                        (_cache[1] = ($event) => (isRef(values) ? (values.value = $event) : null)),
                      options: unref(items),
                      'render-target-label': renderLabel
                    },
                    null,
                    8,
                    ['value', 'options']
                  ),
                  [[_directive_loading, unref(loading)]]
                )
              ])
            ]),
            _: 1
          },
          8,
          ['show', 'title']
        )
      )
    }
  }
})
const GroupLaunch = /* @__PURE__ */ _export_sfc(_sfc_main$8, [['__scopeId', 'data-v-4bf693de']])
const _hoisted_1$7 = { class: 'section el-container is-vertical height100' }
const _hoisted_2$6 = { class: 'el-main main' }
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: 'DetailTab',
  props: {
    groupId: {
      type: Number,
      default: 0
    }
  },
  emits: ['close'],
  setup(__props, { emit: __emit }) {
    const props = __props
    const cropper = ref(false)
    const modelDetail = reactive({
      name: '',
      avatar: '',
      profile: ''
    })
    const onUploadAvatar = (avatar) => {
      cropper.value = false
      modelDetail.avatar = avatar
      onSubmitBaseInfo()
    }
    const onLoadData = async () => {
      const { code, data } = await ServGroupDetail({ group_id: props.groupId })
      if (code != 200) return
      modelDetail.name = data.group_name
      modelDetail.avatar = data.avatar
      modelDetail.profile = data.profile
    }
    async function onSubmitBaseInfo() {
      if (modelDetail.name.trim() == '') {
        return window['$message'].info('群名称不能为空')
      }
      await ServeGroupUpdate(
        {
          group_id: props.groupId,
          group_name: modelDetail.name,
          avatar: modelDetail.avatar,
          profile: modelDetail.profile
        },
        {
          successText: '群信息更新成功'
        }
      )
    }
    onMounted(() => {
      onLoadData()
    })
    return (_ctx, _cache) => {
      const _component_n_avatar = __unplugin_components_0$1
      const _component_n_button = Button
      const _component_n_form_item = __unplugin_components_3$2
      const _component_n_input = __unplugin_components_1$1
      const _component_n_form = __unplugin_components_7
      return (
        openBlock(),
        createElementBlock(
          Fragment,
          null,
          [
            createBaseVNode('section', _hoisted_1$7, [
              _cache[6] ||
                (_cache[6] = createBaseVNode(
                  'header',
                  { class: 'el-header header border-bottom' },
                  [createBaseVNode('p', null, '基础信息')],
                  -1
                )),
              createBaseVNode('main', _hoisted_2$6, [
                createVNode(
                  _component_n_form,
                  {
                    ref: 'formRef',
                    style: {
                      minWinth: '350px',
                      maxWidth: '350px'
                    }
                  },
                  {
                    default: withCtx(() => [
                      createVNode(
                        _component_n_form_item,
                        {
                          label: '群头像:',
                          path: 'name'
                        },
                        {
                          default: withCtx(() => [
                            unref(modelDetail).avatar
                              ? (openBlock(),
                                createBlock(
                                  _component_n_avatar,
                                  {
                                    key: 0,
                                    size: 60,
                                    src: unref(modelDetail).avatar
                                  },
                                  null,
                                  8,
                                  ['src']
                                ))
                              : (openBlock(),
                                createBlock(
                                  _component_n_avatar,
                                  {
                                    key: 1,
                                    size: 60,
                                    style: {
                                      color: 'white',
                                      backgroundColor: '#508afe',
                                      fontSize: '18px'
                                    }
                                  },
                                  {
                                    default: withCtx(() => [
                                      createTextVNode(
                                        toDisplayString(unref(modelDetail).name.substring(0, 1)),
                                        1
                                      )
                                    ]),
                                    _: 1
                                  }
                                )),
                            createVNode(
                              _component_n_button,
                              {
                                type: 'primary',
                                size: 'tiny',
                                style: { 'margin-left': '20px' },
                                dashed: '',
                                onClick:
                                  _cache[0] || (_cache[0] = ($event) => (cropper.value = true))
                              },
                              {
                                default: withCtx(
                                  () =>
                                    _cache[4] || (_cache[4] = [createTextVNode(' 上传头像 ', -1)])
                                ),
                                _: 1,
                                __: [4]
                              }
                            )
                          ]),
                          _: 1
                        }
                      ),
                      createVNode(
                        _component_n_form_item,
                        {
                          label: '群名称:',
                          required: '',
                          path: 'name'
                        },
                        {
                          default: withCtx(() => [
                            createVNode(
                              _component_n_input,
                              {
                                placeholder: '必填',
                                type: 'text',
                                value: unref(modelDetail).name,
                                'onUpdate:value':
                                  _cache[1] ||
                                  (_cache[1] = ($event) => (unref(modelDetail).name = $event))
                              },
                              null,
                              8,
                              ['value']
                            )
                          ]),
                          _: 1
                        }
                      ),
                      createVNode(
                        _component_n_form_item,
                        {
                          label: '群简介:',
                          path: 'profile'
                        },
                        {
                          default: withCtx(() => [
                            createVNode(
                              _component_n_input,
                              {
                                placeholder: '选填',
                                type: 'textarea',
                                value: unref(modelDetail).profile,
                                'onUpdate:value':
                                  _cache[2] ||
                                  (_cache[2] = ($event) => (unref(modelDetail).profile = $event))
                              },
                              null,
                              8,
                              ['value']
                            )
                          ]),
                          _: 1
                        }
                      ),
                      createVNode(
                        _component_n_form_item,
                        { label: '' },
                        {
                          default: withCtx(() => [
                            createVNode(
                              _component_n_button,
                              {
                                type: 'primary',
                                'text-color': '#ffffff',
                                onClick: onSubmitBaseInfo
                              },
                              {
                                default: withCtx(
                                  () =>
                                    _cache[5] || (_cache[5] = [createTextVNode(' 保存信息 ', -1)])
                                ),
                                _: 1,
                                __: [5]
                              }
                            )
                          ]),
                          _: 1
                        }
                      )
                    ]),
                    _: 1
                  },
                  512
                )
              ])
            ]),
            unref(cropper)
              ? (openBlock(),
                createBlock(AvatarCropper, {
                  key: 0,
                  onClose: _cache[3] || (_cache[3] = ($event) => (cropper.value = false)),
                  onSuccess: onUploadAvatar
                }))
              : createCommentVNode('', true)
          ],
          64
        )
      )
    }
  }
})
const DetailTab = /* @__PURE__ */ _export_sfc(_sfc_main$7, [['__scopeId', 'data-v-9c917517']])
const _hoisted_1$6 = { class: 'el-container is-vertical height100' }
const _hoisted_2$5 = { class: 'el-header header border-bottom' }
const _hoisted_3$3 = {
  key: 0,
  class: 'el-main main flex-center'
}
const _hoisted_4$3 = {
  key: 1,
  class: 'el-main main me-scrollbar me-scrollbar-thumb'
}
const _hoisted_5$3 = { class: 'tool flex-center' }
const _hoisted_6$3 = ['onClick']
const _hoisted_7$3 = ['onClick', 'onContextmenu']
const _hoisted_8$3 = { class: 'item-title' }
const _hoisted_9$3 = { class: 'nickname text-ellipsis' }
const _hoisted_10$2 = { class: 'badge master' }
const _hoisted_11$2 = { class: 'badge leader' }
const _hoisted_12$2 = { class: 'badge muted' }
const _hoisted_13$1 = { class: 'item-text text-ellipsis' }
const _hoisted_14$1 = { class: 'el-footer footer border-top' }
const _hoisted_15$1 = { class: 'tips' }
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: 'MemberTab',
  props: {
    groupId: {
      type: Number,
      default: 0
    }
  },
  emits: ['close'],
  setup(__props, { emit: __emit }) {
    const props = __props
    const { toShowUserInfo, dialog } = useInject()
    const userStore = useUserStore()
    const loading = ref(false)
    const isGroupLaunch = ref(false)
    const keywords = ref('')
    const batchDelete = ref(false)
    const items = ref([])
    const filterCheck = computed(() => {
      return items.value.filter((item) => item.is_delete)
    })
    const filterSearch = computed(() => {
      if (!keywords.value.length) {
        return items.value
      }
      return items.value.filter((item) => {
        return (
          item.nickname.match(keywords.value) != null || item.remark.match(keywords.value) != null
        )
      })
    })
    const isAdmin = computed(() => {
      return items.value.some((item) => {
        return item.user_id == userStore.uid && item.leader == 1
      })
    })
    const dropdown = reactive({
      options: [],
      show: false,
      dropdownX: 0,
      dropdownY: 0,
      item: {}
    })
    const onLoadData = async () => {
      const { code, data } = await ServGroupMemberList(
        {
          group_id: props.groupId
        },
        {
          loading
        }
      )
      if (code != 200) return
      let list = data.items || []
      list.forEach((item) => {
        item.is_delete = false
      })
      items.value = list
    }
    const onDelete = (item) => {
      dialog.create({
        title: '温馨提示',
        content: `删除 [${item.nickname}] 群成员？`,
        positiveText: '确定',
        negativeText: '取消',
        onPositiveClick: async () => {
          await ServGroupMemberRemove(
            {
              group_id: props.groupId,
              user_ids: [item.user_id]
            },
            {
              successText: '删除成功',
              onSuccess: onLoadData
            }
          )
        }
      })
    }
    const onBatchDelete = () => {
      if (!filterCheck.value.length) return
      dialog.create({
        title: '温馨提示',
        content: `批量删除群成员？`,
        positiveText: '确定',
        negativeText: '取消',
        onPositiveClick: async () => {
          await ServGroupMemberRemove(
            {
              group_id: props.groupId,
              user_ids: filterCheck.value.map((item) => item.user_id)
            },
            {
              successText: '删除成功',
              onSuccess: () => {
                batchDelete.value = false
                onLoadData()
              }
            }
          )
        }
      })
    }
    const onRowClick = (item) => {
      if (batchDelete.value == true) {
        if (item.leader > 1) {
          item.is_delete = !item.is_delete
        }
      } else {
        toShowUserInfo(item.user_id)
      }
    }
    const onCancelDelete = () => {
      items.value.forEach((item) => {
        item.is_delete = false
      })
      batchDelete.value = false
    }
    const onUserInfo = (item) => {
      toShowUserInfo(item.user_id)
    }
    const onAssignAdmin = (item) => {
      let title =
        item.leader == 3
          ? `确定要给 [${item.nickname}] 分配管理员权限吗？`
          : `确定解除 [${item.nickname}] 管理员权限吗？`
      dialog.create({
        title: '温馨提示',
        content: title,
        positiveText: '确定',
        negativeText: '取消',
        onPositiveClick: async () => {
          await ServGroupAssignAdmin(
            {
              action: item.leader === 3 ? 1 : 2,
              group_id: props.groupId,
              user_id: item.user_id
            },
            {
              successText: '操作成功',
              onSuccess: onLoadData
            }
          )
        }
      })
    }
    const onTransfer = (item) => {
      dialog.create({
        title: '温馨提示',
        content: `确定把群主权限转交给 [${item.nickname}] ？`,
        positiveText: '确定',
        negativeText: '取消',
        onPositiveClick: async () => {
          await ServGroupTransfer(
            {
              group_id: props.groupId,
              user_id: item.user_id
            },
            {
              successText: '操作成功',
              onSuccess: onLoadData
            }
          )
        }
      })
    }
    const onForbidden = (item) => {
      let content = `确定要禁言 [${item.nickname}] 此用户吗？`
      if (item.is_mute === 1) {
        content = `确定要解除 [${item.nickname}] 此用户的禁言吗？`
      }
      dialog.create({
        title: '温馨提示',
        content,
        positiveText: '确定',
        negativeText: '取消',
        onPositiveClick: async () => {
          await ServGroupMemberMute(
            {
              action: item.is_mute === 1 ? 2 : 1,
              group_id: props.groupId,
              user_id: item.user_id
            },
            {
              successText: '操作成功',
              onSuccess: onLoadData
            }
          )
        }
      })
    }
    const onContextMenu = (e, item) => {
      if (batchDelete.value == true || item.leader === 1) {
        return
      }
      dropdown.show = false
      dropdown.item = Object.assign({}, item)
      dropdown.options = [
        {
          label: '查看成员',
          key: 'info'
        },
        {
          label: item.is_mute === 1 ? '解除禁言' : '禁止发言',
          key: 'forbidden'
        },
        {
          label: '删除成员',
          key: 'delete'
        },
        {
          label: '批量删除',
          key: 'batch_delete'
        }
      ]
      if (isAdmin.value) {
        dropdown.options.push({ label: '转让群主', key: 'transfer' })
        if (item.leader == 2) {
          dropdown.options.push({ label: '管理权限(解除)', key: 'assignment' })
        } else if (item.leader == 3) {
          dropdown.options.push({ label: '管理权限(分配)', key: 'assignment' })
        }
      }
      nextTick(() => {
        dropdown.show = true
        dropdown.dropdownX = e.clientX
        dropdown.dropdownY = e.clientY
      })
      e.preventDefault()
    }
    const onContextMenuHandle = (key) => {
      const evnets = {
        info: onUserInfo,
        assignment: onAssignAdmin,
        transfer: onTransfer,
        forbidden: onForbidden,
        delete: onDelete,
        batch_delete: () => {
          batchDelete.value = true
        }
      }
      dropdown.show = false
      evnets[key] && evnets[key](dropdown.item)
    }
    onMounted(() => {
      onLoadData()
    })
    return (_ctx, _cache) => {
      const _component_n_icon = NIcon
      const _component_n_input = __unplugin_components_1$1
      const _component_n_button = Button
      const _component_n_space = __unplugin_components_1$3
      const _component_n_empty = NEmpty
      const _component_n_checkbox = __unplugin_components_1$2
      const _component_im_avatar = resolveComponent('im-avatar')
      const _component_n_dropdown = __unplugin_components_2
      return (
        openBlock(),
        createElementBlock(
          Fragment,
          null,
          [
            createBaseVNode('section', _hoisted_1$6, [
              createBaseVNode('header', _hoisted_2$5, [
                createBaseVNode(
                  'p',
                  null,
                  '成员管理(' + toDisplayString(unref(filterSearch).length) + ')',
                  1
                ),
                createBaseVNode('div', null, [
                  createVNode(_component_n_space, null, {
                    default: withCtx(() => [
                      createVNode(
                        _component_n_input,
                        {
                          placeholder: '搜索',
                          value: unref(keywords),
                          'onUpdate:value':
                            _cache[0] ||
                            (_cache[0] = ($event) =>
                              isRef(keywords) ? (keywords.value = $event) : null),
                          valueModifiers: { trim: true },
                          clearable: '',
                          style: { width: '200px' },
                          round: ''
                        },
                        {
                          prefix: withCtx(() => [
                            createVNode(_component_n_icon, { component: unref(Search) }, null, 8, [
                              'component'
                            ])
                          ]),
                          _: 1
                        },
                        8,
                        ['value']
                      ),
                      createVNode(
                        _component_n_button,
                        {
                          circle: '',
                          onClick:
                            _cache[1] || (_cache[1] = ($event) => (isGroupLaunch.value = true))
                        },
                        {
                          icon: withCtx(() => [
                            createVNode(_component_n_icon, { component: unref(Plus) }, null, 8, [
                              'component'
                            ])
                          ]),
                          _: 1
                        }
                      )
                    ]),
                    _: 1
                  })
                ])
              ]),
              unref(filterSearch).length === 0
                ? (openBlock(),
                  createElementBlock('main', _hoisted_3$3, [
                    createVNode(_component_n_empty, { description: '暂无相关数据' })
                  ]))
                : (openBlock(),
                  createElementBlock('main', _hoisted_4$3, [
                    (openBlock(true),
                    createElementBlock(
                      Fragment,
                      null,
                      renderList(unref(filterSearch), (item) => {
                        return (
                          openBlock(),
                          createElementBlock(
                            'div',
                            {
                              class: 'member-item',
                              key: item.user_id
                            },
                            [
                              withDirectives(
                                createBaseVNode(
                                  'div',
                                  _hoisted_5$3,
                                  [
                                    createVNode(
                                      _component_n_checkbox,
                                      {
                                        disabled: item.leader === 2,
                                        size: 'small',
                                        checked: item.is_delete
                                      },
                                      null,
                                      8,
                                      ['disabled', 'checked']
                                    )
                                  ],
                                  512
                                ),
                                [[vShow, unref(batchDelete)]]
                              ),
                              createBaseVNode(
                                'div',
                                {
                                  class: 'avatar pointer',
                                  onClick: ($event) => onUserInfo(item)
                                },
                                [
                                  createVNode(
                                    _component_im_avatar,
                                    {
                                      size: 40,
                                      src: item.avatar,
                                      username: item.nickname
                                    },
                                    null,
                                    8,
                                    ['src', 'username']
                                  )
                                ],
                                8,
                                _hoisted_6$3
                              ),
                              createBaseVNode(
                                'div',
                                {
                                  class: 'content pointer o-hidden',
                                  onClick: ($event) => onRowClick(item),
                                  onContextmenu: withModifiers(
                                    ($event) => onContextMenu($event, item),
                                    ['prevent']
                                  )
                                },
                                [
                                  createBaseVNode('div', _hoisted_8$3, [
                                    createBaseVNode('p', _hoisted_9$3, [
                                      createBaseVNode(
                                        'span',
                                        null,
                                        toDisplayString(item.nickname || '未设置昵称'),
                                        1
                                      ),
                                      withDirectives(
                                        createBaseVNode(
                                          'span',
                                          null,
                                          ' (' + toDisplayString(item.remark) + ')',
                                          513
                                        ),
                                        [[vShow, item.remark]]
                                      )
                                    ]),
                                    createBaseVNode('p', null, [
                                      withDirectives(
                                        createBaseVNode('span', _hoisted_10$2, '群主', 512),
                                        [[vShow, item.leader === 1]]
                                      ),
                                      withDirectives(
                                        createBaseVNode('span', _hoisted_11$2, '管理员', 512),
                                        [[vShow, item.leader === 2]]
                                      ),
                                      withDirectives(
                                        createBaseVNode('span', _hoisted_12$2, '已禁言', 512),
                                        [[vShow, item.is_mute === 1]]
                                      )
                                    ])
                                  ]),
                                  createBaseVNode(
                                    'div',
                                    _hoisted_13$1,
                                    toDisplayString(item.motto || '...'),
                                    1
                                  )
                                ],
                                40,
                                _hoisted_7$3
                              )
                            ]
                          )
                        )
                      }),
                      128
                    ))
                  ])),
              withDirectives(
                createBaseVNode(
                  'footer',
                  _hoisted_14$1,
                  [
                    createBaseVNode(
                      'div',
                      _hoisted_15$1,
                      '已选(' + toDisplayString(unref(filterCheck).length) + ')',
                      1
                    ),
                    createBaseVNode('div', null, [
                      createVNode(_component_n_space, null, {
                        default: withCtx(() => [
                          createVNode(
                            _component_n_button,
                            {
                              size: 'small',
                              onClick: onCancelDelete
                            },
                            {
                              default: withCtx(
                                () => _cache[5] || (_cache[5] = [createTextVNode(' 取消 ', -1)])
                              ),
                              _: 1,
                              __: [5]
                            }
                          ),
                          createVNode(
                            _component_n_button,
                            {
                              color: 'red',
                              'text-color': '#ffffff',
                              size: 'small',
                              onClick: onBatchDelete
                            },
                            {
                              default: withCtx(
                                () => _cache[6] || (_cache[6] = [createTextVNode(' 批量删除 ', -1)])
                              ),
                              _: 1,
                              __: [6]
                            }
                          )
                        ]),
                        _: 1
                      })
                    ])
                  ],
                  512
                ),
                [[vShow, unref(batchDelete)]]
              )
            ]),
            createVNode(
              _component_n_dropdown,
              {
                show: unref(dropdown).show,
                x: unref(dropdown).dropdownX,
                y: unref(dropdown).dropdownY,
                placement: 'right',
                options: unref(dropdown).options,
                onSelect: onContextMenuHandle,
                onClickoutside:
                  _cache[2] ||
                  (_cache[2] = () => {
                    unref(dropdown).show = false
                    unref(dropdown).item = {}
                  })
              },
              null,
              8,
              ['show', 'x', 'y', 'options']
            ),
            unref(isGroupLaunch)
              ? (openBlock(),
                createBlock(
                  GroupLaunch,
                  {
                    key: 0,
                    'group-id': __props.groupId,
                    onClose: _cache[3] || (_cache[3] = ($event) => (isGroupLaunch.value = false)),
                    onOnInvite:
                      _cache[4] ||
                      (_cache[4] = () => {
                        onLoadData()
                      })
                  },
                  null,
                  8,
                  ['group-id']
                ))
              : createCommentVNode('', true)
          ],
          64
        )
      )
    }
  }
})
const MemberTab = /* @__PURE__ */ _export_sfc(_sfc_main$6, [['__scopeId', 'data-v-bf944206']])
const _hoisted_1$5 = { class: 'section el-container is-vertical height100' }
const _hoisted_2$4 = { class: 'el-main' }
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: 'NoticeTab',
  props: {
    groupId: {
      type: Number,
      default: 0
    }
  },
  setup(__props) {
    const props = __props
    const editorContent = ref('')
    const onSave = async () => {
      await ServGroupNoticeUpdate(
        {
          group_id: props.groupId,
          content: editorContent.value
        },
        {
          successText: '已保存'
        }
      )
    }
    const onUploadImage = async (files, callback) => {
      if (!files.length) return
      const { code, data } = await uploadFile(files[0])
      if (code != 200) return
      callback([data.src])
    }
    const loadDetail = async () => {
      const { code, data } = await ServGroupDetail({ group_id: props.groupId })
      if (code != 200) return
      editorContent.value = data.notice?.content || ''
    }
    onMounted(() => {
      loadDetail()
    })
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock('section', _hoisted_1$5, [
          _cache[1] ||
            (_cache[1] = createBaseVNode(
              'header',
              { class: 'el-header header border-bottom' },
              [createBaseVNode('p', null, '群公告')],
              -1
            )),
          createBaseVNode('main', _hoisted_2$4, [
            createVNode(
              unref(Editor),
              {
                preview: false,
                modelValue: editorContent.value,
                'onUpdate:modelValue':
                  _cache[0] || (_cache[0] = ($event) => (editorContent.value = $event)),
                footers: [],
                toolbars: [
                  'revoke',
                  'bold',
                  'underline',
                  'italic',
                  'title',
                  'strikeThrough',
                  'sub',
                  'sup',
                  'quote',
                  'unorderedList',
                  'orderedList',
                  'code',
                  'link',
                  'image',
                  'table',
                  '=',
                  'previewOnly',
                  'save'
                ],
                onSave,
                onOnUploadImg: onUploadImage,
                style: { border: 'none', height: '100%' }
              },
              null,
              8,
              ['modelValue']
            )
          ])
        ])
      )
    }
  }
})
const NoticeTab = /* @__PURE__ */ _export_sfc(_sfc_main$5, [['__scopeId', 'data-v-4faf7d2a']])
const _hoisted_1$4 = { class: 'section el-container is-vertical height100' }
const _hoisted_2$3 = { class: 'el-header header border-bottom' }
const _hoisted_3$2 = {
  key: 0,
  class: 'el-main main flex-center'
}
const _hoisted_4$2 = {
  key: 1,
  class: 'el-main main me-scrollbar me-scrollbar-thumb'
}
const _hoisted_5$2 = ['onClick']
const _hoisted_6$2 = ['onClick']
const _hoisted_7$2 = { class: 'content pointer o-hidden' }
const _hoisted_8$2 = { class: 'item-title' }
const _hoisted_9$2 = { class: 'nickname text-ellipsis' }
const _hoisted_10$1 = { class: 'date mt-l15' }
const _hoisted_11$1 = { class: 'item-text text-ellipsis' }
const _hoisted_12$1 = { class: 'tool flex-center' }
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: 'ApplyTab',
  props: {
    groupId: {
      type: Number,
      default: 0
    }
  },
  emits: ['close'],
  setup(__props, { emit: __emit }) {
    const props = __props
    const keywords = ref('')
    const batchDelete = ref(false)
    const items = ref([])
    const { toShowUserInfo, dialog } = useInject()
    const filterSearch = computed(() => {
      if (!keywords.value.length) {
        return items.value
      }
      return items.value.filter((item) => {
        return item.nickname.match(keywords.value) != null
      })
    })
    const onLoadData = async () => {
      const { code, data } = await ServGroupApplyList({
        group_id: props.groupId
      })
      if (code == 200) {
        items.value = data.items || []
      }
    }
    const onUserInfo = (item) => {
      toShowUserInfo(item.user_id)
    }
    const onRowClick = (item) => {
      if (batchDelete.value == true) {
        console.log(item)
      }
    }
    const onAgree = throttle(async (item) => {
      await ServGroupApplyAgree(
        {
          apply_id: item.id
        },
        {
          successText: '已同意',
          onSuccess: onLoadData
        }
      )
    }, 1e3)
    const onDelete = (item) => {
      let remark = ''
      const modal = dialog.create({
        title: '拒绝入群申请',
        content: () => {
          return h(__unplugin_components_1$1, {
            defaultValue: '',
            placeholder: '请填写拒绝原因',
            style: { marginTop: '20px' },
            onInput: (value) => (remark = value),
            autofocus: true
          })
        },
        negativeText: '取消',
        positiveText: '提交',
        onPositiveClick: async () => {
          if (!remark.length) return false
          modal.loading = true
          await ServGroupApplyDecline(
            {
              apply_id: item.id,
              remark
            },
            {
              successText: '已拒绝',
              onSuccess: onLoadData
            }
          )
          modal.destroy()
          return false
        }
      })
    }
    onMounted(() => {
      onLoadData()
    })
    return (_ctx, _cache) => {
      const _component_n_icon = NIcon
      const _component_n_space = __unplugin_components_1$3
      const _component_n_empty = NEmpty
      const _component_im_avatar = resolveComponent('im-avatar')
      const _component_n_button = Button
      return (
        openBlock(),
        createElementBlock('section', _hoisted_1$4, [
          createBaseVNode('header', _hoisted_2$3, [
            createBaseVNode(
              'p',
              null,
              '申请管理(' + toDisplayString(unref(filterSearch).length) + ')',
              1
            ),
            createBaseVNode('div', null, [
              createVNode(_component_n_space, null, {
                default: withCtx(() => [
                  createVNode(
                    unref(__unplugin_components_1$1),
                    {
                      placeholder: '搜索',
                      value: unref(keywords),
                      'onUpdate:value':
                        _cache[0] ||
                        (_cache[0] = ($event) =>
                          isRef(keywords) ? (keywords.value = $event) : null),
                      valueModifiers: { trim: true },
                      clearable: '',
                      style: { width: '200px' },
                      round: ''
                    },
                    {
                      prefix: withCtx(() => [
                        createVNode(_component_n_icon, { component: unref(Search) }, null, 8, [
                          'component'
                        ])
                      ]),
                      _: 1
                    },
                    8,
                    ['value']
                  )
                ]),
                _: 1
              })
            ])
          ]),
          unref(filterSearch).length === 0
            ? (openBlock(),
              createElementBlock('main', _hoisted_3$2, [
                createVNode(_component_n_empty, { description: '暂无相关数据' })
              ]))
            : (openBlock(),
              createElementBlock('main', _hoisted_4$2, [
                (openBlock(true),
                createElementBlock(
                  Fragment,
                  null,
                  renderList(unref(filterSearch), (item) => {
                    return (
                      openBlock(),
                      createElementBlock(
                        'div',
                        {
                          class: 'member-item',
                          key: item.id,
                          onClick: ($event) => onRowClick(item)
                        },
                        [
                          createBaseVNode(
                            'div',
                            {
                              class: 'avatar pointer',
                              onClick: ($event) => onUserInfo(item)
                            },
                            [
                              createVNode(
                                _component_im_avatar,
                                {
                                  size: 40,
                                  src: item.avatar,
                                  username: item.nickname
                                },
                                null,
                                8,
                                ['src', 'username']
                              )
                            ],
                            8,
                            _hoisted_6$2
                          ),
                          createBaseVNode('div', _hoisted_7$2, [
                            createBaseVNode('div', _hoisted_8$2, [
                              createBaseVNode('p', _hoisted_9$2, [
                                createBaseVNode('span', null, toDisplayString(item.nickname), 1),
                                createBaseVNode(
                                  'span',
                                  _hoisted_10$1,
                                  toDisplayString(item.created_at),
                                  1
                                )
                              ])
                            ]),
                            createBaseVNode(
                              'div',
                              _hoisted_11$1,
                              '备注: ' + toDisplayString(item.remark),
                              1
                            )
                          ]),
                          createBaseVNode('div', _hoisted_12$1, [
                            createVNode(
                              _component_n_space,
                              null,
                              {
                                default: withCtx(() => [
                                  createVNode(
                                    _component_n_button,
                                    {
                                      onClick: ($event) => unref(onAgree)(item),
                                      strong: '',
                                      secondary: '',
                                      circle: '',
                                      type: 'primary',
                                      size: 'small'
                                    },
                                    {
                                      icon: withCtx(() => [
                                        createVNode(
                                          _component_n_icon,
                                          { component: unref(CheckSmall) },
                                          null,
                                          8,
                                          ['component']
                                        )
                                      ]),
                                      _: 2
                                    },
                                    1032,
                                    ['onClick']
                                  ),
                                  createVNode(
                                    _component_n_button,
                                    {
                                      onClick: ($event) => onDelete(item),
                                      strong: '',
                                      secondary: '',
                                      circle: '',
                                      type: 'tertiary',
                                      size: 'small'
                                    },
                                    {
                                      icon: withCtx(() => [
                                        createVNode(
                                          _component_n_icon,
                                          { component: unref(Close) },
                                          null,
                                          8,
                                          ['component']
                                        )
                                      ]),
                                      _: 2
                                    },
                                    1032,
                                    ['onClick']
                                  )
                                ]),
                                _: 2
                              },
                              1024
                            )
                          ])
                        ],
                        8,
                        _hoisted_5$2
                      )
                    )
                  }),
                  128
                ))
              ]))
        ])
      )
    }
  }
})
const ApplyTab = /* @__PURE__ */ _export_sfc(_sfc_main$4, [['__scopeId', 'data-v-ec8e8cac']])
const _hoisted_1$3 = { class: 'section el-container is-vertical height100' }
const _hoisted_2$2 = { class: 'el-main main' }
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: 'ConfigTab',
  props: {
    groupId: {
      type: Number,
      default: 0
    }
  },
  emits: ['close'],
  setup(__props, { emit: __emit }) {
    const emit = __emit
    const props = __props
    const detail = reactive({
      is_mute: false,
      mute_loading: false,
      is_overt: false,
      overt_loading: false
    })
    const onLoadData = async () => {
      const { data, code } = await ServGroupDetail({ group_id: props.groupId })
      if (code != 200) return
      detail.is_mute = data.is_mute === 1
      detail.is_overt = data.is_overt === 1
    }
    const onDismiss = async () => {
      const { code } = await ServGroupDismiss(
        { group_id: props.groupId },
        {
          successText: '群聊已解散'
        }
      )
      code == 200 && emit('close')
    }
    const onMute = async (value) => {
      detail.mute_loading = true
      const { code } = await ServGroupMute({
        group_id: props.groupId,
        action: value ? 1 : 2
      })
      detail.mute_loading = false
      if (code != 200) return
      detail.is_mute = value
    }
    const onOvert = async (value) => {
      detail.overt_loading = true
      const { code } = await ServGroupOvert({
        group_id: props.groupId,
        action: value ? 1 : 2
      })
      detail.overt_loading = false
      if (code != 200) return
      detail.is_overt = value
    }
    onMounted(() => {
      onLoadData()
    })
    return (_ctx, _cache) => {
      const _component_n_button = Button
      const _component_n_popconfirm = __unplugin_components_4
      const _component_n_form_item = __unplugin_components_3$2
      const _component_n_switch = __unplugin_components_3$3
      const _component_n_form = __unplugin_components_7
      return (
        openBlock(),
        createElementBlock('section', _hoisted_1$3, [
          _cache[2] ||
            (_cache[2] = createBaseVNode(
              'header',
              { class: 'el-header header border-bottom' },
              [createBaseVNode('p', null, '设置管理')],
              -1
            )),
          createBaseVNode('main', _hoisted_2$2, [
            createVNode(
              _component_n_form,
              {
                'label-placement': 'left',
                'label-width': 'auto',
                'require-mark-placement': 'right-hanging'
              },
              {
                default: withCtx(() => [
                  createVNode(
                    _component_n_form_item,
                    { label: '解散群聊:' },
                    {
                      default: withCtx(() => [
                        createVNode(
                          _component_n_popconfirm,
                          {
                            'negative-text': '取消',
                            'positive-text': '确定',
                            onPositiveClick: onDismiss
                          },
                          {
                            trigger: withCtx(() => [
                              createVNode(
                                _component_n_button,
                                {
                                  type: 'primary',
                                  size: 'small',
                                  text: ''
                                },
                                {
                                  default: withCtx(
                                    () =>
                                      _cache[0] || (_cache[0] = [createTextVNode(' 点击解散 ', -1)])
                                  ),
                                  _: 1,
                                  __: [0]
                                }
                              )
                            ]),
                            default: withCtx(() => [
                              _cache[1] ||
                                (_cache[1] = createTextVNode(
                                  ' 确定要解散群聊吗？ 此操作是不可逆的！ ',
                                  -1
                                ))
                            ]),
                            _: 1,
                            __: [1]
                          }
                        )
                      ]),
                      _: 1
                    }
                  ),
                  createVNode(
                    _component_n_form_item,
                    {
                      label: '公开可见:',
                      feedback: '开启后可在公开群聊列表展示。'
                    },
                    {
                      default: withCtx(() => [
                        createVNode(
                          _component_n_switch,
                          {
                            'rubber-band': false,
                            value: unref(detail).is_overt,
                            loading: unref(detail).overt_loading,
                            'onUpdate:value': onOvert
                          },
                          null,
                          8,
                          ['value', 'loading']
                        )
                      ]),
                      _: 1
                    }
                  ),
                  createVNode(
                    _component_n_form_item,
                    {
                      label: '全员禁言:',
                      feedback: '开启后除群主和管理员以外，其它成员禁止发言。'
                    },
                    {
                      default: withCtx(() => [
                        createVNode(
                          _component_n_switch,
                          {
                            'rubber-band': false,
                            value: unref(detail).is_mute,
                            loading: unref(detail).mute_loading,
                            'onUpdate:value': onMute
                          },
                          null,
                          8,
                          ['value', 'loading']
                        )
                      ]),
                      _: 1
                    }
                  )
                ]),
                _: 1
              }
            )
          ])
        ])
      )
    }
  }
})
const ConfigTab = /* @__PURE__ */ _export_sfc(_sfc_main$3, [['__scopeId', 'data-v-fd1005f3']])
const _hoisted_1$2 = {
  class: 'el-container container-box',
  style: { height: '550px' }
}
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: 'index',
  props: {
    groupId: {
      type: Number,
      default: 0
    }
  },
  emits: ['close'],
  setup(__props, { emit: __emit }) {
    const isShowBox = ref(true)
    return (_ctx, _cache) => {
      const _component_n_tab_pane = NTabPane
      const _component_n_tabs = __unplugin_components_3$4
      const _component_n_modal = __unplugin_components_3$1
      return (
        openBlock(),
        createBlock(
          _component_n_modal,
          {
            show: unref(isShowBox),
            'onUpdate:show':
              _cache[0] ||
              (_cache[0] = ($event) => (isRef(isShowBox) ? (isShowBox.value = $event) : null)),
            preset: 'card',
            title: '群管理',
            class: 'modal-radius',
            style: { width: '800px' },
            segmented: {
              content: true
            },
            'content-style': {
              padding: 0
            }
          },
          {
            default: withCtx(() => [
              createBaseVNode('section', _hoisted_1$2, [
                createVNode(
                  _component_n_tabs,
                  {
                    key: '群信息',
                    type: 'line',
                    animated: '',
                    placement: 'left',
                    style: { height: '100%' },
                    'pane-style': { padding: '0px', boxSizing: 'content-box', overflow: 'auto' }
                  },
                  {
                    default: withCtx(() => [
                      createVNode(
                        _component_n_tab_pane,
                        {
                          name: '群信息',
                          tab: '群信息'
                        },
                        {
                          default: withCtx(() => [
                            createVNode(DetailTab, { groupId: __props.groupId }, null, 8, [
                              'groupId'
                            ])
                          ]),
                          _: 1
                        }
                      ),
                      createVNode(
                        _component_n_tab_pane,
                        {
                          name: '群成员',
                          tab: '群成员'
                        },
                        {
                          default: withCtx(() => [
                            createVNode(MemberTab, { groupId: __props.groupId }, null, 8, [
                              'groupId'
                            ])
                          ]),
                          _: 1
                        }
                      ),
                      createVNode(
                        _component_n_tab_pane,
                        {
                          name: '群公告',
                          tab: '群公告'
                        },
                        {
                          default: withCtx(() => [
                            createVNode(NoticeTab, { groupId: __props.groupId }, null, 8, [
                              'groupId'
                            ])
                          ]),
                          _: 1
                        }
                      ),
                      createVNode(
                        _component_n_tab_pane,
                        {
                          name: '群申请',
                          tab: '群申请'
                        },
                        {
                          default: withCtx(() => [
                            createVNode(ApplyTab, { groupId: __props.groupId }, null, 8, [
                              'groupId'
                            ])
                          ]),
                          _: 1
                        }
                      ),
                      createVNode(
                        _component_n_tab_pane,
                        {
                          name: '群设置',
                          tab: '群设置'
                        },
                        {
                          default: withCtx(() => [
                            createVNode(ConfigTab, { groupId: __props.groupId }, null, 8, [
                              'groupId'
                            ])
                          ]),
                          _: 1
                        }
                      )
                    ]),
                    _: 1
                  }
                )
              ])
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
const _hoisted_1$1 = { class: 'member-box' }
const _hoisted_2$1 = { class: 'table' }
const _hoisted_3$1 = ['onClick']
const _hoisted_4$1 = { class: 'avatar' }
const _hoisted_5$1 = { class: 'nickname text-ellipsis' }
const _hoisted_6$1 = { class: 'badge master' }
const _hoisted_7$1 = { class: 'badge leader' }
const _hoisted_8$1 = { class: 'card text-ellipsis grey' }
const _hoisted_9$1 = {
  key: 0,
  class: 'mt-t20 pd-t20'
}
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: 'MemberDrawer',
  props: /* @__PURE__ */ mergeModels(
    {
      items: {
        default: () => []
      }
    },
    {
      modelValue: { default: false },
      modelModifiers: {}
    }
  ),
  emits: /* @__PURE__ */ mergeModels(['on-to-info'], ['update:modelValue']),
  setup(__props, { emit: __emit }) {
    const emit = __emit
    const isShow = useModel(__props, 'modelValue')
    const keyword = ref('')
    const onToInfo = (item) => {
      emit('on-to-info', item)
    }
    const filters = computed(() => {
      if (!keyword.value) return __props.items
      return __props.items.filter((item) => {
        return (
          item.nickname.match(keyword.value) != null || item.remark.match(keyword.value) != null
        )
      })
    })
    return (_ctx, _cache) => {
      const _component_n_icon = NIcon
      const _component_n_input = __unplugin_components_1$1
      const _component_im_avatar = resolveComponent('im-avatar')
      const _component_n_empty = NEmpty
      const _component_n_drawer_content = __unplugin_components_3
      const _component_n_drawer = __unplugin_components_0
      return (
        openBlock(),
        createBlock(
          _component_n_drawer,
          {
            show: isShow.value,
            'onUpdate:show': _cache[1] || (_cache[1] = ($event) => (isShow.value = $event)),
            width: 320,
            placement: 'right',
            to: '#group-panel'
          },
          {
            default: withCtx(() => [
              createVNode(
                _component_n_drawer_content,
                {
                  'body-content-style': { padding: 0 },
                  title: '群聊成员',
                  closable: ''
                },
                {
                  default: withCtx(() => [
                    createBaseVNode('div', _hoisted_1$1, [
                      createBaseVNode('div', null, [
                        createVNode(
                          _component_n_input,
                          {
                            size: 'small',
                            placeholder: '搜索',
                            value: unref(keyword),
                            'onUpdate:value':
                              _cache[0] ||
                              (_cache[0] = ($event) =>
                                isRef(keyword) ? (keyword.value = $event) : null),
                            clearable: true,
                            round: ''
                          },
                          {
                            prefix: withCtx(() => [
                              createVNode(
                                _component_n_icon,
                                { component: unref(Search) },
                                null,
                                8,
                                ['component']
                              )
                            ]),
                            _: 1
                          },
                          8,
                          ['value']
                        )
                      ]),
                      createBaseVNode('div', _hoisted_2$1, [
                        _cache[2] ||
                          (_cache[2] = createBaseVNode(
                            'div',
                            { class: 'theader' },
                            [
                              createBaseVNode('div', { class: 'avatar' }),
                              createBaseVNode('div', { class: 'nickname' }, '昵称'),
                              createBaseVNode('div', { class: 'card' }, '群名片')
                            ],
                            -1
                          )),
                        (openBlock(true),
                        createElementBlock(
                          Fragment,
                          null,
                          renderList(unref(filters), (item) => {
                            return (
                              openBlock(),
                              createElementBlock(
                                'div',
                                {
                                  class: 'row pointer',
                                  key: item.id,
                                  onClick: ($event) => onToInfo(item)
                                },
                                [
                                  createBaseVNode('div', _hoisted_4$1, [
                                    createVNode(
                                      _component_im_avatar,
                                      {
                                        size: 20,
                                        src: item.avatar,
                                        username: item.nickname
                                      },
                                      null,
                                      8,
                                      ['src', 'username']
                                    )
                                  ]),
                                  createBaseVNode('div', _hoisted_5$1, [
                                    createBaseVNode(
                                      'span',
                                      null,
                                      toDisplayString(item.nickname ? item.nickname : '-'),
                                      1
                                    ),
                                    withDirectives(
                                      createBaseVNode('span', _hoisted_6$1, '群主', 512),
                                      [[vShow, item.leader === 1]]
                                    ),
                                    withDirectives(
                                      createBaseVNode('span', _hoisted_7$1, '管理员', 512),
                                      [[vShow, item.leader === 2]]
                                    )
                                  ]),
                                  createBaseVNode(
                                    'div',
                                    _hoisted_8$1,
                                    toDisplayString(item.remark || '-'),
                                    1
                                  )
                                ],
                                8,
                                _hoisted_3$1
                              )
                            )
                          }),
                          128
                        )),
                        unref(filters).length == 0
                          ? (openBlock(),
                            createElementBlock('div', _hoisted_9$1, [
                              createVNode(_component_n_empty, { description: '暂无相关数据' })
                            ]))
                          : createCommentVNode('', true)
                      ])
                    ])
                  ]),
                  _: 1
                }
              )
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
const MemberDrawer = /* @__PURE__ */ _export_sfc(_sfc_main$1, [['__scopeId', 'data-v-6fb0ff8a']])
const _hoisted_1 = {
  id: 'group-panel',
  class: 'el-container is-vertical section'
}
const _hoisted_2 = { class: 'el-header header border-bottom flex-center' }
const _hoisted_3 = { class: 'right-icon flex-center' }
const _hoisted_4 = { class: 'el-main main me-scrollbar me-scrollbar-thumb' }
const _hoisted_5 = { class: 'info-box' }
const _hoisted_6 = { class: 'b-box' }
const _hoisted_7 = { class: 'describe' }
const _hoisted_8 = { class: 'b-box' }
const _hoisted_9 = { class: 'describe' }
const _hoisted_10 = { class: 'b-box' }
const _hoisted_11 = { class: 'block' }
const _hoisted_12 = { class: 'text' }
const _hoisted_13 = { style: { display: 'flex' } }
const _hoisted_14 = { class: 'describe' }
const _hoisted_15 = { class: 'b-box' }
const _hoisted_16 = { class: 'block' }
const _hoisted_17 = { class: 'text' }
const _hoisted_18 = { class: 'member-box2' }
const _hoisted_19 = ['onClick']
const _hoisted_20 = { class: 'avatar flex-center' }
const _hoisted_21 = { class: 'text-ellipsis' }
const _hoisted_22 = { class: 'avatar flex-center' }
const _hoisted_23 = { class: 'avatar flex-center' }
const _hoisted_24 = {
  class: 'info-box',
  style: { 'margin-top': '30px' }
}
const _hoisted_25 = { class: 'b-box' }
const _hoisted_26 = { key: 0 }
const _hoisted_27 = { class: 'el-footer footer border-top' }
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'GroupPanel',
  props: {
    groupId: {
      type: Number,
      default: 0
    }
  },
  emits: ['close', 'to-talk'],
  setup(__props, { emit: __emit }) {
    const userStore = useUserStore()
    const { toShowUserInfo } = useInject()
    const emit = __emit
    const props = __props
    watch(props, () => {
      loadDetail()
      loadMembers()
    })
    const editCardPopover = ref(false)
    const isShowGroup = ref(false)
    const isShowManage = ref(false)
    const isShowMemberList = ref(false)
    const remark = ref('')
    const loading = ref(false)
    const detail = reactive({
      avatar: '',
      name: '',
      profile: '',
      visit_card: '',
      notice: ''
    })
    const members = ref([])
    const isLeader = computed(() => {
      return members.value.some((item) => {
        return item.user_id == userStore.uid && item.leader == 2
      })
    })
    const isAdmin = computed(() => {
      return members.value.some((item) => {
        return item.user_id == userStore.uid && item.leader == 1
      })
    })
    const onShowManage = (vallue) => {
      isShowManage.value = vallue
    }
    const onGroupCallBack = () => {}
    const onToInfo = (item) => {
      toShowUserInfo(item.user_id)
    }
    async function loadDetail() {
      const { code, data } = await ServGroupDetail(
        { group_id: props.groupId },
        { error: false, loading }
      )
      if (code != 200) return
      remark.value = data.visit_card
      detail.avatar = data.avatar
      detail.name = data.group_name
      detail.profile = data.profile
      detail.visit_card = data.visit_card
      detail.notice = data.notice?.content || ''
    }
    async function loadMembers() {
      const { code, data } = await ServGroupMemberList(
        { group_id: props.groupId },
        { error: false }
      )
      if (code != 200) return
      members.value = data.items || []
    }
    const onClose = () => {
      emit('close')
    }
    const onSignOut = async () => {
      await ServGroupSecede(
        { group_id: props.groupId },
        {
          successText: '已退出群聊',
          onSuccess: onClose
        }
      )
    }
    const onChangeRemark = async () => {
      const { code } = await ServGroupMemberUpdateRemark(
        {
          group_id: props.groupId,
          remark: remark.value
        },
        {
          successText: '已更新群名片'
        }
      )
      if (code != 200) return
      editCardPopover.value.setShow(false)
      detail.visit_card = remark.value
      loadMembers()
    }
    onMounted(() => {
      loadDetail()
      loadMembers()
    })
    return (_ctx, _cache) => {
      const _component_n_icon = NIcon
      const _component_n_button = Button
      const _component_n_input = __unplugin_components_1$1
      const _component_n_popover = __unplugin_components_3$5
      const _component_im_avatar = resolveComponent('im-avatar')
      const _component_n_popconfirm = __unplugin_components_4
      return (
        openBlock(),
        createElementBlock(
          Fragment,
          null,
          [
            createBaseVNode('section', _hoisted_1, [
              createBaseVNode('header', _hoisted_2, [
                createBaseVNode(
                  'div',
                  {
                    class: 'left-icon flex-center',
                    onClick: _cache[0] || (_cache[0] = ($event) => emit('to-talk'))
                  },
                  [
                    createVNode(
                      _component_n_icon,
                      {
                        size: '20',
                        component: unref(Comment)
                      },
                      null,
                      8,
                      ['component']
                    )
                  ]
                ),
                _cache[10] ||
                  (_cache[10] = createBaseVNode(
                    'div',
                    { class: 'center-text flex-center' },
                    [createBaseVNode('span', null, '群信息')],
                    -1
                  )),
                createBaseVNode('div', _hoisted_3, [
                  createVNode(
                    _component_n_icon,
                    {
                      size: '20',
                      component: unref(Close),
                      onClick: onClose
                    },
                    null,
                    8,
                    ['component']
                  )
                ])
              ]),
              createBaseVNode('main', _hoisted_4, [
                createBaseVNode('div', _hoisted_5, [
                  createBaseVNode('div', _hoisted_6, [
                    _cache[11] ||
                      (_cache[11] = createBaseVNode(
                        'div',
                        { class: 'block' },
                        [createBaseVNode('div', { class: 'title' }, '群名称')],
                        -1
                      )),
                    createBaseVNode('div', _hoisted_7, toDisplayString(unref(detail).name), 1)
                  ]),
                  createBaseVNode('div', _hoisted_8, [
                    _cache[12] ||
                      (_cache[12] = createBaseVNode(
                        'div',
                        { class: 'block' },
                        [createBaseVNode('div', { class: 'title' }, '群简介')],
                        -1
                      )),
                    createBaseVNode(
                      'div',
                      _hoisted_9,
                      toDisplayString(unref(detail).profile ? unref(detail).profile : '暂无群简介'),
                      1
                    )
                  ]),
                  createBaseVNode('div', _hoisted_10, [
                    createBaseVNode('div', _hoisted_11, [
                      _cache[16] ||
                        (_cache[16] = createBaseVNode('div', { class: 'title' }, '群名片', -1)),
                      createBaseVNode('div', _hoisted_12, [
                        createVNode(
                          _component_n_popover,
                          {
                            trigger: 'click',
                            placement: 'left',
                            ref_key: 'editCardPopover',
                            ref: editCardPopover
                          },
                          {
                            trigger: withCtx(() => [
                              createVNode(
                                _component_n_button,
                                {
                                  type: 'primary',
                                  text: ''
                                },
                                {
                                  default: withCtx(
                                    () =>
                                      _cache[13] || (_cache[13] = [createTextVNode(' 设置 ', -1)])
                                  ),
                                  _: 1,
                                  __: [13]
                                }
                              )
                            ]),
                            header: withCtx(
                              () =>
                                _cache[14] ||
                                (_cache[14] = [createTextVNode(' 设置我的群名片 ', -1)])
                            ),
                            default: withCtx(() => [
                              createBaseVNode('div', _hoisted_13, [
                                createVNode(
                                  _component_n_input,
                                  {
                                    type: 'text',
                                    placeholder: '设置我的群名片',
                                    maxlength: '10',
                                    value: unref(remark),
                                    'onUpdate:value':
                                      _cache[1] ||
                                      (_cache[1] = ($event) =>
                                        isRef(remark) ? (remark.value = $event) : null),
                                    onKeydown: withKeys(onChangeRemark, ['enter'])
                                  },
                                  null,
                                  8,
                                  ['value']
                                ),
                                createVNode(
                                  _component_n_button,
                                  {
                                    type: 'primary',
                                    'text-color': '#ffffff',
                                    class: 'mt-l5',
                                    onClick: onChangeRemark
                                  },
                                  {
                                    default: withCtx(
                                      () =>
                                        _cache[15] || (_cache[15] = [createTextVNode(' 确定 ', -1)])
                                    ),
                                    _: 1,
                                    __: [15]
                                  }
                                )
                              ])
                            ]),
                            _: 1
                          },
                          512
                        )
                      ])
                    ]),
                    createBaseVNode(
                      'div',
                      _hoisted_14,
                      toDisplayString(unref(detail).visit_card || '未设置'),
                      1
                    )
                  ]),
                  createBaseVNode('div', _hoisted_15, [
                    createBaseVNode('div', _hoisted_16, [
                      _cache[17] ||
                        (_cache[17] = createBaseVNode('div', { class: 'title' }, '群成员', -1)),
                      createBaseVNode(
                        'div',
                        _hoisted_17,
                        toDisplayString(unref(members).length) + '人',
                        1
                      )
                    ]),
                    _cache[18] ||
                      (_cache[18] = createBaseVNode(
                        'div',
                        { class: 'describe' },
                        '群主已开启“新成员入群可查看所有聊天记录',
                        -1
                      ))
                  ])
                ]),
                createBaseVNode('div', _hoisted_18, [
                  (openBlock(true),
                  createElementBlock(
                    Fragment,
                    null,
                    renderList(unref(members).slice(0, 10), (item) => {
                      return (
                        openBlock(),
                        createElementBlock(
                          'div',
                          {
                            class: 'member-item',
                            key: item.id,
                            onClick: ($event) => onToInfo(item)
                          },
                          [
                            createBaseVNode('div', _hoisted_20, [
                              createVNode(
                                _component_im_avatar,
                                {
                                  size: 35,
                                  src: item.avatar,
                                  username: item.nickname
                                },
                                null,
                                8,
                                ['src', 'username']
                              )
                            ]),
                            createBaseVNode('p', _hoisted_21, toDisplayString(item.nickname), 1)
                          ],
                          8,
                          _hoisted_19
                        )
                      )
                    }),
                    128
                  )),
                  createBaseVNode(
                    'div',
                    {
                      class: 'member-item',
                      onClick: _cache[2] || (_cache[2] = ($event) => (isShowGroup.value = true))
                    },
                    [
                      createBaseVNode('div', _hoisted_22, [
                        createVNode(
                          _component_n_button,
                          { circle: '' },
                          {
                            icon: withCtx(() => [
                              createVNode(_component_n_icon, { component: unref(Plus) }, null, 8, [
                                'component'
                              ])
                            ]),
                            _: 1
                          }
                        )
                      ]),
                      _cache[19] ||
                        (_cache[19] = createBaseVNode(
                          'p',
                          { class: 'text-ellipsis' },
                          '添加成员',
                          -1
                        ))
                    ]
                  ),
                  createBaseVNode(
                    'div',
                    {
                      class: 'member-item',
                      onClick:
                        _cache[3] || (_cache[3] = ($event) => (isShowMemberList.value = true))
                    },
                    [
                      createBaseVNode('div', _hoisted_23, [
                        createVNode(
                          _component_n_button,
                          { circle: '' },
                          {
                            icon: withCtx(() => [
                              createVNode(_component_n_icon, { component: unref(More) }, null, 8, [
                                'component'
                              ])
                            ]),
                            _: 1
                          }
                        )
                      ]),
                      _cache[20] ||
                        (_cache[20] = createBaseVNode(
                          'p',
                          { class: 'text-ellipsis' },
                          '查看更多',
                          -1
                        ))
                    ]
                  )
                ]),
                createBaseVNode('div', _hoisted_24, [
                  createBaseVNode('div', _hoisted_25, [
                    _cache[21] ||
                      (_cache[21] = createBaseVNode(
                        'div',
                        { class: 'block' },
                        [
                          createBaseVNode('div', { class: 'title text-ellipsis' }, '群公告'),
                          createBaseVNode('div', { class: 'text' })
                        ],
                        -1
                      )),
                    createBaseVNode('div', null, [
                      !unref(detail).notice.length
                        ? (openBlock(), createElementBlock('p', _hoisted_26, '暂无公告'))
                        : (openBlock(),
                          createBlock(
                            unref(MdPreview),
                            {
                              key: 1,
                              style: {
                                padding: '2px',
                                'border-radius': '5px',
                                'margin-top': '10px'
                              },
                              'preview-theme': 'vuepress',
                              showCodeRowNumber: false,
                              modelValue: unref(detail).notice,
                              'onUpdate:modelValue':
                                _cache[4] ||
                                (_cache[4] = ($event) => (unref(detail).notice = $event))
                            },
                            null,
                            8,
                            ['modelValue']
                          ))
                    ])
                  ])
                ])
              ]),
              withDirectives(
                createBaseVNode(
                  'footer',
                  _hoisted_27,
                  [
                    unref(isAdmin)
                      ? (openBlock(),
                        createBlock(
                          _component_n_button,
                          {
                            key: 0,
                            block: '',
                            type: 'primary',
                            'text-color': '#ffffff',
                            onClick: _cache[5] || (_cache[5] = ($event) => onShowManage(true))
                          },
                          {
                            default: withCtx(
                              () => _cache[22] || (_cache[22] = [createTextVNode(' 群聊管理 ', -1)])
                            ),
                            _: 1,
                            __: [22]
                          }
                        ))
                      : createCommentVNode('', true),
                    !unref(isAdmin) && !unref(isLeader)
                      ? (openBlock(),
                        createBlock(
                          _component_n_popconfirm,
                          {
                            key: 1,
                            'negative-text': '取消',
                            'positive-text': '确定',
                            'positive-button-props': {
                              textColor: '#ffffff'
                            },
                            onPositiveClick: onSignOut
                          },
                          {
                            trigger: withCtx(() => [
                              createVNode(
                                _component_n_button,
                                {
                                  block: '',
                                  ghost: ''
                                },
                                {
                                  default: withCtx(
                                    () =>
                                      _cache[23] ||
                                      (_cache[23] = [createTextVNode(' 退出群聊 ', -1)])
                                  ),
                                  _: 1,
                                  __: [23]
                                }
                              )
                            ]),
                            default: withCtx(() => [
                              _cache[24] ||
                                (_cache[24] = createTextVNode(
                                  ' 确定要退出群吗？ 退出后不再接收此群消息！ ',
                                  -1
                                ))
                            ]),
                            _: 1,
                            __: [24]
                          }
                        ))
                      : createCommentVNode('', true),
                    unref(isLeader)
                      ? (openBlock(),
                        createElementBlock(
                          Fragment,
                          { key: 2 },
                          [
                            createVNode(
                              _component_n_button,
                              {
                                style: { width: '49%' },
                                type: 'primary',
                                'text-color': '#ffffff',
                                onClick: _cache[6] || (_cache[6] = ($event) => onShowManage(true))
                              },
                              {
                                default: withCtx(
                                  () =>
                                    _cache[25] || (_cache[25] = [createTextVNode(' 群聊管理 ', -1)])
                                ),
                                _: 1,
                                __: [25]
                              }
                            ),
                            createVNode(
                              _component_n_popconfirm,
                              {
                                'negative-text': '取消',
                                'positive-text': '确定',
                                'positive-button-props': {
                                  textColor: '#ffffff'
                                },
                                onPositiveClick: onSignOut
                              },
                              {
                                trigger: withCtx(() => [
                                  createVNode(
                                    _component_n_button,
                                    {
                                      style: { width: '49%' },
                                      type: 'error',
                                      ghost: ''
                                    },
                                    {
                                      default: withCtx(
                                        () =>
                                          _cache[26] ||
                                          (_cache[26] = [createTextVNode(' 退出群聊 ', -1)])
                                      ),
                                      _: 1,
                                      __: [26]
                                    }
                                  )
                                ]),
                                default: withCtx(() => [
                                  _cache[27] ||
                                    (_cache[27] = createTextVNode(
                                      ' 确定要退出群吗？ 退出后不再接收此群消息！ ',
                                      -1
                                    ))
                                ]),
                                _: 1,
                                __: [27]
                              }
                            )
                          ],
                          64
                        ))
                      : createCommentVNode('', true)
                  ],
                  512
                ),
                [[vShow, unref(loading) == false]]
              )
            ]),
            createVNode(
              MemberDrawer,
              {
                modelValue: unref(isShowMemberList),
                'onUpdate:modelValue':
                  _cache[7] ||
                  (_cache[7] = ($event) =>
                    isRef(isShowMemberList) ? (isShowMemberList.value = $event) : null),
                items: unref(members),
                onOnToInfo: onToInfo
              },
              null,
              8,
              ['modelValue', 'items']
            ),
            unref(isShowGroup)
              ? (openBlock(),
                createBlock(
                  GroupLaunch,
                  {
                    key: 0,
                    'group-id': __props.groupId,
                    onClose: _cache[8] || (_cache[8] = ($event) => (isShowGroup.value = false)),
                    onOnSubmit: onGroupCallBack
                  },
                  null,
                  8,
                  ['group-id']
                ))
              : createCommentVNode('', true),
            unref(isShowManage)
              ? (openBlock(),
                createBlock(
                  _sfc_main$2,
                  {
                    key: 1,
                    'group-id': __props.groupId,
                    onClose: _cache[9] || (_cache[9] = ($event) => onShowManage(false))
                  },
                  null,
                  8,
                  ['group-id']
                ))
              : createCommentVNode('', true)
          ],
          64
        )
      )
    }
  }
})
const GroupPanel = /* @__PURE__ */ _export_sfc(_sfc_main, [['__scopeId', 'data-v-c33710aa']])
export {
  GroupLaunch as G,
  __unplugin_components_0 as _,
  __unplugin_components_3 as a,
  GroupPanel as b
}
