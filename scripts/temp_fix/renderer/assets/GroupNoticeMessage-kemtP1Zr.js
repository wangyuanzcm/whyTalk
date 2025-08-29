import {
  t as defineComponent,
  L as createElementBlock,
  U as openBlock,
  M as createBaseVNode,
  R as toDisplayString,
  W as _export_sfc
} from './index-CP-MMhae.js'
const _hoisted_1 = { class: 'immsg-group-notice' }
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'GroupNoticeMessage',
  props: {
    title: {},
    content: {}
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock('section', _hoisted_1, [
          createBaseVNode('h4', null, toDisplayString(_ctx.title), 1),
          createBaseVNode('p', null, toDisplayString(_ctx.content), 1)
        ])
      )
    }
  }
})
const GroupNoticeMessage = /* @__PURE__ */ _export_sfc(_sfc_main, [
  ['__scopeId', 'data-v-6db4f0d0']
])
export { GroupNoticeMessage as default }
