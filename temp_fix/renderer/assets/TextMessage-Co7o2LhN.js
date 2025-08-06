import { t as textReplaceEmoji } from './emojis-BkYjNAGY.js'
import { t as textReplaceLink, b as textReplaceMention } from './string-g9b8veVd.js'
import {
  t as defineComponent,
  L as createElementBlock,
  U as openBlock,
  M as createBaseVNode,
  O as unref,
  ac as normalizeClass,
  W as _export_sfc
} from './index-CP-MMhae.js'
const _hoisted_1 = ['innerHTML']
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'TextMessage',
  props: {
    content: {},
    role: {}
  },
  setup(__props) {
    const props = __props
    let textContent = props.content || ''
    textContent = textReplaceLink(textContent)
    textContent = textReplaceEmoji(textContent)
    textContent = textReplaceMention(textContent)
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'div',
          {
            class: normalizeClass([
              'immsg-text',
              {
                user: _ctx.role === 'user'
              }
            ])
          },
          [createBaseVNode('pre', { innerHTML: unref(textContent) }, null, 8, _hoisted_1)],
          2
        )
      )
    }
  }
})
const TextMessage = /* @__PURE__ */ _export_sfc(_sfc_main, [['__scopeId', 'data-v-16442278']])
export { TextMessage as default }
