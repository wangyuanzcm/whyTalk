import {
  t as defineComponent,
  L as createElementBlock,
  a8 as createCommentVNode,
  M as createBaseVNode,
  aY as createStaticVNode,
  O as unref,
  df as isElectronMode,
  H as createVNode,
  aC as resolveComponent,
  F as Fragment,
  U as openBlock,
  W as _export_sfc
} from './index-CP-MMhae.js'
const _hoisted_1 = {
  key: 0,
  id: 'logo-name'
}
const _hoisted_2 = { class: 'section' }
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'layout',
  setup(__props) {
    return (_ctx, _cache) => {
      const _component_router_view = resolveComponent('router-view')
      return (
        openBlock(),
        createElementBlock(
          Fragment,
          null,
          [
            !unref(isElectronMode)()
              ? (openBlock(), createElementBlock('div', _hoisted_1, 'Lumen IM'))
              : createCommentVNode('', true),
            createBaseVNode('section', _hoisted_2, [createVNode(_component_router_view)]),
            _cache[0] ||
              (_cache[0] = createStaticVNode(
                '<div class="copyright" data-v-dff988b4><span data-v-dff988b4>©2020 - 2025 Lumen IM 在线聊天</span><span data-v-dff988b4><a href="http://beian.miit.gov.cn" target="_blank" data-v-dff988b4>黔ICP备20006767号-2</a></span><span data-v-dff988b4>Github源码</span></div><div class="fly-box" data-v-dff988b4><div class="fly bg-fly-circle1" data-v-dff988b4></div><div class="fly bg-fly-circle2" data-v-dff988b4></div><div class="fly bg-fly-circle3" data-v-dff988b4></div><div class="fly bg-fly-circle4" data-v-dff988b4></div></div>',
                2
              ))
          ],
          64
        )
      )
    }
  }
})
const layout = /* @__PURE__ */ _export_sfc(_sfc_main, [['__scopeId', 'data-v-dff988b4']])
export { layout as default }
