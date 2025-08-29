import { t as textReplaceEmoji } from './emojis-BkYjNAGY.js'
import { t as textReplaceLink } from './string-g9b8veVd.js'
import { g as getImageInfo } from './file-DJ5u2-kO.js'
import {
  t as defineComponent,
  L as createElementBlock,
  U as openBlock,
  M as createBaseVNode,
  V as createTextVNode,
  F as Fragment,
  a9 as renderList,
  a8 as createCommentVNode,
  O as unref,
  d2 as normalizeStyle,
  H as createVNode,
  W as _export_sfc
} from './index-CP-MMhae.js'
import { _ as __unplugin_components_0 } from './Image-BdM5UzkZ.js'
import './use-locale-sP6dOhdq.js'
import './Tooltip-BadUcq2V.js'
import './download-DwbQunhL.js'
const _hoisted_1 = { class: 'im-message-mixed' }
const _hoisted_2 = ['innerHTML']
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'MixedMessage',
  props: {
    items: {}
  },
  setup(__props) {
    const img = (src, width = 200) => {
      const info = getImageInfo(src)
      if (info.width == 0 || info.height == 0) {
        return {}
      }
      if (info.width < width) {
        return {
          width: `${info.width}px`,
          height: `${info.height}px`
        }
      }
      let h = info.height / (info.width / width)
      return {
        width: width + 'px',
        height: h + 'px'
      }
    }
    return (_ctx, _cache) => {
      const _component_n_image = __unplugin_components_0
      return (
        openBlock(),
        createElementBlock('div', _hoisted_1, [
          createBaseVNode('pre', null, [
            _cache[8] || (_cache[8] = createTextVNode('      ', -1)),
            (openBlock(true),
            createElementBlock(
              Fragment,
              null,
              renderList(_ctx.items, (item, index) => {
                return (
                  openBlock(),
                  createElementBlock(
                    'span',
                    {
                      class: 'line',
                      key: index
                    },
                    [
                      _cache[6] || (_cache[6] = createTextVNode('\n   \n        ', -1)),
                      item.type === 'text'
                        ? (openBlock(),
                          createElementBlock(
                            Fragment,
                            { key: 0 },
                            [
                              _cache[0] || (_cache[0] = createTextVNode('\n               ', -1)),
                              createBaseVNode(
                                'span',
                                {
                                  innerHTML: unref(textReplaceEmoji)(
                                    unref(textReplaceLink)(item.content)
                                  )
                                },
                                null,
                                8,
                                _hoisted_2
                              ),
                              _cache[1] || (_cache[1] = createTextVNode('\n        ', -1))
                            ],
                            64
                          ))
                        : item.type === 'image'
                          ? (openBlock(),
                            createElementBlock(
                              Fragment,
                              { key: 1 },
                              [
                                _cache[4] || (_cache[4] = createTextVNode('\n          ', -1)),
                                createBaseVNode(
                                  'div',
                                  {
                                    style: normalizeStyle([
                                      img(item.content, 300),
                                      {
                                        display: 'flex',
                                        margin: '3px 0',
                                        'border-radius': '3px',
                                        overflow: 'hidden'
                                      }
                                    ])
                                  },
                                  [
                                    _cache[2] ||
                                      (_cache[2] = createTextVNode('\n            ', -1)),
                                    createVNode(
                                      _component_n_image,
                                      {
                                        src: item.content
                                      },
                                      null,
                                      8,
                                      ['src']
                                    ),
                                    _cache[3] || (_cache[3] = createTextVNode('\n          ', -1))
                                  ],
                                  4
                                ),
                                _cache[5] || (_cache[5] = createTextVNode('\n        ', -1))
                              ],
                              64
                            ))
                          : createCommentVNode('', true),
                      _cache[7] || (_cache[7] = createTextVNode('\n      ', -1))
                    ]
                  )
                )
              }),
              128
            )),
            _cache[9] || (_cache[9] = createTextVNode('\n    ', -1))
          ])
        ])
      )
    }
  }
})
const MixedMessage = /* @__PURE__ */ _export_sfc(_sfc_main, [['__scopeId', 'data-v-ca616ae7']])
export { MixedMessage as default }
