import { g as getExploreName, b as getExploreOs } from './common-CbVb2jfY.js'
import {
  t as defineComponent,
  L as createElementBlock,
  U as openBlock,
  M as createBaseVNode,
  V as createTextVNode,
  R as toDisplayString,
  O as unref,
  W as _export_sfc
} from './index-CP-MMhae.js'
import './index-88uWzgFD.js'
const _hoisted_1 = { class: 'immsg-login' }
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'LoginMessage',
  props: {
    datetime: {},
    ip: {},
    address: {},
    agent: {},
    reason: {}
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock('section', _hoisted_1, [
          _cache[5] || (_cache[5] = createBaseVNode('h4', null, '登录操作通知', -1)),
          createBaseVNode('p', null, [
            _cache[0] || (_cache[0] = createBaseVNode('span', null, '登录时间：', -1)),
            createTextVNode(toDisplayString(_ctx.datetime) + ' (CST)', 1)
          ]),
          createBaseVNode('p', null, [
            _cache[1] || (_cache[1] = createBaseVNode('span', null, 'IP    地址：', -1)),
            createTextVNode(toDisplayString(_ctx.ip), 1)
          ]),
          createBaseVNode('p', null, [
            _cache[2] || (_cache[2] = createBaseVNode('span', null, '登录地点：', -1)),
            createTextVNode(toDisplayString(_ctx.address), 1)
          ]),
          createBaseVNode('p', null, [
            _cache[3] || (_cache[3] = createBaseVNode('span', null, '登录设备：', -1)),
            createTextVNode(
              toDisplayString(unref(getExploreName)(_ctx.agent)) +
                ' / ' +
                toDisplayString(unref(getExploreOs)(_ctx.agent)),
              1
            )
          ]),
          createBaseVNode('p', null, [
            _cache[4] || (_cache[4] = createBaseVNode('span', null, '异常原因：', -1)),
            createTextVNode(toDisplayString(_ctx.reason), 1)
          ])
        ])
      )
    }
  }
})
const LoginMessage = /* @__PURE__ */ _export_sfc(_sfc_main, [['__scopeId', 'data-v-610b1f0e']])
export { LoginMessage as default }
