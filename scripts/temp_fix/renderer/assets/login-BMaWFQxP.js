import {
  s as cB,
  bM as cNotM,
  b2 as cE,
  b1 as cM,
  t as defineComponent,
  u as h,
  F as Fragment,
  x as useConfig,
  y as useTheme,
  dg as dividerLight,
  z as computed,
  bb as useThemeClass,
  aG as useUserStore,
  a1 as ref,
  a4 as reactive,
  L as createElementBlock,
  M as createBaseVNode,
  H as createVNode,
  T as withCtx,
  aZ as withKeys,
  O as unref,
  aa as Button,
  V as createTextVNode,
  aI as useRouter,
  dh as playMusic,
  di as useRoute,
  dj as setToken,
  dk as ws,
  U as openBlock,
  W as _export_sfc
} from './index-CP-MMhae.js'
import { S as ServAuthLogin } from './auth-45N4j_di.js'
import { u as useInject } from './useInject-KwKquBHc.js'
import { _ as __unplugin_components_3, a as __unplugin_components_7 } from './FormItem-BYV9eAmm.js'
import { _ as __unplugin_components_1 } from './Input-9scKSWkl.js'
import './string-g9b8veVd.js'
import './Dropdown-BaOl703U.js'
import './SendOne-Ck-Fsq0E.js'
import './use-locale-sP6dOhdq.js'
const style = cB(
  'divider',
  `
 position: relative;
 display: flex;
 width: 100%;
 box-sizing: border-box;
 font-size: 16px;
 color: var(--n-text-color);
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
`,
  [
    cNotM(
      'vertical',
      `
 margin-top: 24px;
 margin-bottom: 24px;
 `,
      [
        cNotM(
          'no-title',
          `
 display: flex;
 align-items: center;
 `
        )
      ]
    ),
    cE(
      'title',
      `
 display: flex;
 align-items: center;
 margin-left: 12px;
 margin-right: 12px;
 white-space: nowrap;
 font-weight: var(--n-font-weight);
 `
    ),
    cM('title-position-left', [
      cE('line', [
        cM('left', {
          width: '28px'
        })
      ])
    ]),
    cM('title-position-right', [
      cE('line', [
        cM('right', {
          width: '28px'
        })
      ])
    ]),
    cM('dashed', [
      cE(
        'line',
        `
 background-color: #0000;
 height: 0px;
 width: 100%;
 border-style: dashed;
 border-width: 1px 0 0;
 `
      )
    ]),
    cM(
      'vertical',
      `
 display: inline-block;
 height: 1em;
 margin: 0 8px;
 vertical-align: middle;
 width: 1px;
 `
    ),
    cE(
      'line',
      `
 border: none;
 transition: background-color .3s var(--n-bezier), border-color .3s var(--n-bezier);
 height: 1px;
 width: 100%;
 margin: 0;
 `
    ),
    cNotM('dashed', [
      cE('line', {
        backgroundColor: 'var(--n-color)'
      })
    ]),
    cM('dashed', [
      cE('line', {
        borderColor: 'var(--n-color)'
      })
    ]),
    cM('vertical', {
      backgroundColor: 'var(--n-color)'
    })
  ]
)
const dividerProps = Object.assign(Object.assign({}, useTheme.props), {
  titlePlacement: {
    type: String,
    default: 'center'
  },
  dashed: Boolean,
  vertical: Boolean
})
const __unplugin_components_4 = defineComponent({
  name: 'Divider',
  props: dividerProps,
  setup(props) {
    const { mergedClsPrefixRef, inlineThemeDisabled } = useConfig(props)
    const themeRef = useTheme('Divider', '-divider', style, dividerLight, props, mergedClsPrefixRef)
    const cssVarsRef = computed(() => {
      const {
        common: { cubicBezierEaseInOut },
        self: { color, textColor, fontWeight }
      } = themeRef.value
      return {
        '--n-bezier': cubicBezierEaseInOut,
        '--n-color': color,
        '--n-text-color': textColor,
        '--n-font-weight': fontWeight
      }
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass('divider', void 0, cssVarsRef, props)
      : void 0
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      cssVars: inlineThemeDisabled ? void 0 : cssVarsRef,
      themeClass:
        themeClassHandle === null || themeClassHandle === void 0
          ? void 0
          : themeClassHandle.themeClass,
      onRender:
        themeClassHandle === null || themeClassHandle === void 0
          ? void 0
          : themeClassHandle.onRender
    }
  },
  render() {
    var _a
    const { $slots, titlePlacement, vertical, dashed, cssVars, mergedClsPrefix } = this
    ;(_a = this.onRender) === null || _a === void 0 ? void 0 : _a.call(this)
    return h(
      'div',
      {
        role: 'separator',
        class: [
          `${mergedClsPrefix}-divider`,
          this.themeClass,
          {
            [`${mergedClsPrefix}-divider--vertical`]: vertical,
            [`${mergedClsPrefix}-divider--no-title`]: !$slots.default,
            [`${mergedClsPrefix}-divider--dashed`]: dashed,
            [`${mergedClsPrefix}-divider--title-position-${titlePlacement}`]:
              $slots.default && titlePlacement
          }
        ],
        style: cssVars
      },
      !vertical
        ? h('div', {
            class: `${mergedClsPrefix}-divider__line ${mergedClsPrefix}-divider__line--left`
          })
        : null,
      !vertical && $slots.default
        ? h(
            Fragment,
            null,
            h(
              'div',
              {
                class: `${mergedClsPrefix}-divider__title`
              },
              this.$slots
            ),
            h('div', {
              class: `${mergedClsPrefix}-divider__line ${mergedClsPrefix}-divider__line--right`
            })
          )
        : null
    )
  }
})
const _hoisted_1 = { class: 'el-container is-vertical login-box login' }
const _hoisted_2 = {
  class: 'el-main',
  style: { padding: '3px' }
}
const _hoisted_3 = { class: 'helper' }
const _hoisted_4 = {
  class: 'el-footer',
  style: { height: '140px' }
}
const _hoisted_5 = { class: 'preview-account' }
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'login',
  setup(__props) {
    const { message } = useInject()
    const userStore = useUserStore()
    const route = useRoute()
    const router = useRouter()
    const formRef = ref()
    const rules = {
      username: {
        required: true,
        trigger: ['blur', 'input'],
        message: '账号不能为空'
      },
      password: {
        required: true,
        trigger: ['blur', 'input'],
        message: '密码不能为空'
      }
    }
    const loading = ref(false)
    const model = reactive({
      username: '',
      password: ''
    })
    const onLogin = async () => {
      const { code, data } = await ServAuthLogin(
        {
          mobile: model.username,
          password: model.password,
          // 暂时禁用 RSA 加密
          platform: 'web'
        },
        {
          loading
        }
      )
      if (code !== 200 || !data) return
      setToken(data.access_token, data.expires_in)
      ws.connect()
      message.success('登录成功，即将进入系统')
      userStore.loadSetting()
      const redirect = route.params?.redirect || '/'
      router.push(redirect)
    }
    const onValidate = (e) => {
      e.preventDefault()
      playMusic(true)
      formRef.value.validate((errors) => {
        !errors && onLogin()
      })
    }
    const onClickAccount = (type) => {
      console.log('onClickAccount called, type:', type)
      console.log('window.electron:', window.electron)
      console.log('window.electron?.ipcRenderer:', window.electron?.ipcRenderer)
      if (!window.electron || !window.electron.ipcRenderer) {
        message.error('IPC API 不可用，请检查 Electron 预加载脚本')
        return
      }
      switch (type) {
        case 0:
          model.username = '13800138000'
          model.password = '123456'
          break
        case 1:
          model.username = '13800138001'
          model.password = '123456'
          break
        case 2:
          model.username = '13800138002'
          model.password = '123456'
          break
        case 3:
          model.username = '13800138003'
          model.password = '123456'
          break
        case 4:
          model.username = '13800138004'
          model.password = '123456'
          break
        default:
          model.username = '13800138000'
          model.password = '123456'
      }
      onLogin()
    }
    return (_ctx, _cache) => {
      const _component_n_input = __unplugin_components_1
      const _component_n_form_item = __unplugin_components_3
      const _component_n_button = Button
      const _component_n_form = __unplugin_components_7
      const _component_n_divider = __unplugin_components_4
      return (
        openBlock(),
        createElementBlock('section', _hoisted_1, [
          _cache[13] ||
            (_cache[13] = createBaseVNode(
              'header',
              { class: 'el-header box-header' },
              '快捷登录',
              -1
            )),
          createBaseVNode('main', _hoisted_2, [
            createVNode(
              _component_n_form,
              {
                ref_key: 'formRef',
                ref: formRef,
                size: 'large',
                model: unref(model),
                rules
              },
              {
                default: withCtx(() => [
                  createVNode(
                    _component_n_form_item,
                    {
                      path: 'username',
                      'show-label': false
                    },
                    {
                      default: withCtx(() => [
                        createVNode(
                          _component_n_input,
                          {
                            placeholder: '请输入手机号',
                            value: unref(model).username,
                            'onUpdate:value':
                              _cache[0] ||
                              (_cache[0] = ($event) => (unref(model).username = $event)),
                            maxlength: 11,
                            onKeydown: withKeys(onValidate, ['enter'])
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
                      path: 'password',
                      'show-label': false
                    },
                    {
                      default: withCtx(() => [
                        createVNode(
                          _component_n_input,
                          {
                            placeholder: '请输入密码',
                            type: 'password',
                            'show-password-on': 'click',
                            value: unref(model).password,
                            'onUpdate:value':
                              _cache[1] ||
                              (_cache[1] = ($event) => (unref(model).password = $event)),
                            onKeydown: withKeys(onValidate, ['enter'])
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
                    _component_n_button,
                    {
                      type: 'primary',
                      size: 'large',
                      block: '',
                      'text-color': '#ffffff',
                      class: 'mt-t20',
                      onClick: onValidate,
                      loading: unref(loading)
                    },
                    {
                      default: withCtx(
                        () => _cache[9] || (_cache[9] = [createTextVNode(' 立即登录 ', -1)])
                      ),
                      _: 1,
                      __: [9]
                    },
                    8,
                    ['loading']
                  )
                ]),
                _: 1
              },
              8,
              ['model']
            ),
            createBaseVNode('div', _hoisted_3, [
              createVNode(
                _component_n_button,
                {
                  text: '',
                  color: '#409eff',
                  onClick: _cache[2] || (_cache[2] = ($event) => unref(router).push('/auth/forget'))
                },
                {
                  default: withCtx(
                    () => _cache[10] || (_cache[10] = [createTextVNode(' 找回密码 ', -1)])
                  ),
                  _: 1,
                  __: [10]
                }
              ),
              createVNode(
                _component_n_button,
                {
                  text: '',
                  color: '#409eff',
                  onClick:
                    _cache[3] || (_cache[3] = ($event) => unref(router).push('/auth/register'))
                },
                {
                  default: withCtx(
                    () =>
                      _cache[11] || (_cache[11] = [createTextVNode(' 还没有账号？立即注册 ', -1)])
                  ),
                  _: 1,
                  __: [11]
                }
              )
            ])
          ]),
          createBaseVNode('footer', _hoisted_4, [
            createVNode(
              _component_n_divider,
              { style: { height: '30px', margin: '0' } },
              {
                default: withCtx(
                  () =>
                    _cache[12] ||
                    (_cache[12] = [
                      createBaseVNode(
                        'span',
                        { style: { color: '#ccc', 'font-weight': '300' } },
                        ' 测试账号',
                        -1
                      )
                    ])
                ),
                _: 1,
                __: [12]
              }
            ),
            createBaseVNode('div', _hoisted_5, [
              createBaseVNode(
                'p',
                {
                  onClick: _cache[4] || (_cache[4] = ($event) => onClickAccount(0)),
                  style: { color: '#67C23A', 'font-weight': 'bold' }
                },
                '✓ 测试用户: 138****8000 / 密码: 123456 (可用)'
              ),
              createBaseVNode(
                'p',
                {
                  onClick: _cache[5] || (_cache[5] = ($event) => onClickAccount(1)),
                  style: { color: '#67C23A', 'font-weight': 'bold' }
                },
                '✓ Alice: 138****8001 / 密码: 123456 (可用)'
              ),
              createBaseVNode(
                'p',
                {
                  onClick: _cache[6] || (_cache[6] = ($event) => onClickAccount(2)),
                  style: { color: '#67C23A', 'font-weight': 'bold' }
                },
                '✓ Bob: 138****8002 / 密码: 123456 (可用)'
              ),
              createBaseVNode(
                'p',
                {
                  onClick: _cache[7] || (_cache[7] = ($event) => onClickAccount(3)),
                  style: { color: '#67C23A', 'font-weight': 'bold' }
                },
                '✓ Charlie: 138****8003 / 密码: 123456 (可用)'
              ),
              createBaseVNode(
                'p',
                {
                  onClick: _cache[8] || (_cache[8] = ($event) => onClickAccount(4)),
                  style: { color: '#67C23A', 'font-weight': 'bold' }
                },
                '✓ Diana: 138****8004 / 密码: 123456 (可用)'
              )
            ])
          ])
        ])
      )
    }
  }
})
const login = /* @__PURE__ */ _export_sfc(_sfc_main, [['__scopeId', 'data-v-8ca699c8']])
export { login as default }
