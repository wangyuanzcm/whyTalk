import { W as _export_sfc, L as createElementBlock, U as openBlock, M as createBaseVNode, aY as createStaticVNode, H as createVNode, T as withCtx, V as createTextVNode, aa as Button } from "./index-CP-MMhae.js";
const _imports_0 = "" + new URL("github-avatar-fYAw9QKh.jpg", import.meta.url).href;
const _imports_1 = "" + new URL("gitee-avatar-ZbVsxclt.jpg", import.meta.url).href;
const _sfc_main = {};
const _hoisted_1 = { class: "view-box" };
const _hoisted_2 = { class: "view-list" };
const _hoisted_3 = { class: "tools" };
const _hoisted_4 = { class: "view-list" };
const _hoisted_5 = { class: "tools" };
function _sfc_render(_ctx, _cache) {
  const _component_n_button = Button;
  return openBlock(), createElementBlock("section", null, [
    _cache[4] || (_cache[4] = createBaseVNode("h3", { class: "title" }, "绑定设置", -1)),
    createBaseVNode("div", _hoisted_1, [
      createBaseVNode("div", _hoisted_2, [
        _cache[1] || (_cache[1] = createStaticVNode('<div class="image" data-v-2de3795b><img src="' + _imports_0 + '" width="50" height="50" data-v-2de3795b></div><div class="content" data-v-2de3795b><div class="name" data-v-2de3795b>绑定 github</div><div class="desc" data-v-2de3795b>当前未绑定github账号</div></div>', 2)),
        createBaseVNode("div", _hoisted_3, [
          createVNode(_component_n_button, {
            type: "primary",
            text: ""
          }, {
            default: withCtx(() => _cache[0] || (_cache[0] = [
              createTextVNode(" 设置 ", -1)
            ])),
            _: 1,
            __: [0]
          })
        ])
      ]),
      createBaseVNode("div", _hoisted_4, [
        _cache[3] || (_cache[3] = createStaticVNode('<div class="image" data-v-2de3795b><img src="' + _imports_1 + '" width="50" height="50" data-v-2de3795b></div><div class="content" data-v-2de3795b><div class="name" data-v-2de3795b>绑定 gitee</div><div class="desc" data-v-2de3795b>当前未绑定gitee账号</div></div>', 2)),
        createBaseVNode("div", _hoisted_5, [
          createVNode(_component_n_button, {
            type: "primary",
            text: ""
          }, {
            default: withCtx(() => _cache[2] || (_cache[2] = [
              createTextVNode(" 设置 ", -1)
            ])),
            _: 1,
            __: [2]
          })
        ])
      ])
    ])
  ]);
}
const binding = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-2de3795b"]]);
export {
  binding as default
};
