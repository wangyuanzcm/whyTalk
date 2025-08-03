import { t as defineComponent, L as createElementBlock, M as createBaseVNode, R as toDisplayString, F as Fragment, a9 as renderList, H as createVNode, aC as resolveComponent, U as openBlock, a5 as createBlock, T as withCtx, a8 as createCommentVNode, ac as normalizeClass, ag as markRaw, N as NIcon, W as _export_sfc } from "./index-CP-MMhae.js";
const _hoisted_1 = { class: "el-container is-vertical section" };
const _hoisted_2 = { class: "el-header border-bottom" };
const _hoisted_3 = { class: "el-container o-hidden" };
const _hoisted_4 = { class: "el-aside border-right" };
const _hoisted_5 = { class: "icon" };
const _hoisted_6 = { class: "name" };
const _hoisted_7 = {
  key: 0,
  class: "tips"
};
const _hoisted_8 = { class: "badge" };
const _hoisted_9 = { class: "el-main router-view" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SubViewLayout",
  props: {
    title: {},
    menus: {}
  },
  setup(__props) {
    return (_ctx, _cache) => {
      const _component_n_icon = NIcon;
      const _component_router_link = resolveComponent("router-link");
      const _component_router_view = resolveComponent("router-view");
      return openBlock(), createElementBlock("section", _hoisted_1, [
        createBaseVNode("header", _hoisted_2, toDisplayString(_ctx.title), 1),
        createBaseVNode("section", _hoisted_3, [
          createBaseVNode("aside", _hoisted_4, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.menus, (menu, key) => {
              return openBlock(), createBlock(_component_router_link, {
                to: menu.path,
                key
              }, {
                default: withCtx(() => [
                  menu.show !== false ? (openBlock(), createElementBlock("div", {
                    key: 0,
                    class: normalizeClass(["menu pointer", {
                      selectd: _ctx.$route.path == menu.path
                    }])
                  }, [
                    createBaseVNode("div", _hoisted_5, [
                      createVNode(_component_n_icon, {
                        size: menu.size || 16,
                        component: markRaw(menu.icon)
                      }, null, 8, ["size", "component"])
                    ]),
                    createBaseVNode("div", _hoisted_6, toDisplayString(menu.name || ""), 1),
                    menu.tips ? (openBlock(), createElementBlock("div", _hoisted_7, [
                      createBaseVNode("span", _hoisted_8, toDisplayString(menu.tips), 1)
                    ])) : createCommentVNode("", true)
                  ], 2)) : createCommentVNode("", true)
                ]),
                _: 2
              }, 1032, ["to"]);
            }), 128))
          ]),
          createBaseVNode("main", _hoisted_9, [
            createVNode(_component_router_view)
          ])
        ])
      ]);
    };
  }
});
const SubViewLayout = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c763af6e"]]);
export {
  SubViewLayout as S
};
