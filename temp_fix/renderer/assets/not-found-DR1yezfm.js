import {
  t as defineComponent,
  a1 as ref,
  a2 as onMounted,
  L as createElementBlock,
  M as createBaseVNode,
  H as createVNode,
  T as withCtx,
  aa as Button,
  aI as useRouter,
  U as openBlock,
  V as createTextVNode,
  R as toDisplayString,
  O as unref,
  W as _export_sfc
} from './index-CP-MMhae.js'
const _imports_0 = '' + new URL('not-found-CzKA2gZ9.svg', import.meta.url).href
const _hoisted_1 = { class: 'not-found' }
const _hoisted_2 = { class: 'not-found-right' }
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'not-found',
  setup(__props) {
    const router = useRouter()
    let second = ref(6)
    let timer = null
    function toJump() {
      timer && clearInterval(timer)
      router.push('/')
    }
    onMounted(() => {
      timer = setInterval(() => {
        second.value--
        if (second.value <= 0) {
          toJump()
        }
      }, 1e3)
    })
    return (_ctx, _cache) => {
      const _component_n_button = Button
      return (
        openBlock(),
        createElementBlock('section', _hoisted_1, [
          _cache[2] ||
            (_cache[2] = createBaseVNode(
              'div',
              { class: 'not-found-left' },
              [createBaseVNode('img', { src: _imports_0 })],
              -1
            )),
          createBaseVNode('div', _hoisted_2, [
            _cache[0] || (_cache[0] = createBaseVNode('h1', null, '404', -1)),
            _cache[1] ||
              (_cache[1] = createBaseVNode('p', null, '抱歉，你访问的页面不存在...', -1)),
            createBaseVNode('div', null, [
              createVNode(
                _component_n_button,
                {
                  type: 'primary',
                  size: 'medium',
                  onClick: toJump
                },
                {
                  default: withCtx(() => [
                    createTextVNode(' 返回首页 (' + toDisplayString(unref(second)) + 'S) ', 1)
                  ]),
                  _: 1
                }
              )
            ])
          ])
        ])
      )
    }
  }
})
const notFound = /* @__PURE__ */ _export_sfc(_sfc_main, [['__scopeId', 'data-v-5b3b45d0']])
export { notFound as default }
