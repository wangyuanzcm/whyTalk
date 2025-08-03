/* empty css                     */
import { t as defineComponent, L as createElementBlock, U as openBlock, M as createBaseVNode, R as toDisplayString } from "./index-CP-MMhae.js";
const _hoisted_1 = { class: "immsg-systext" };
const _hoisted_2 = { class: "sys-text" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SysTextMessage",
  props: {
    content: {}
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, toDisplayString(_ctx.content), 1)
      ]);
    };
  }
});
export {
  _sfc_main as default
};
