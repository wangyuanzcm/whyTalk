import { t as defineComponent, L as createElementBlock, U as openBlock, R as toDisplayString, W as _export_sfc } from "./index-CP-MMhae.js";
const _hoisted_1 = { class: "immsg-unknown" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "UnknownMessage",
  props: {
    msgType: {}
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, "未知消息类型 [msg_type=" + toDisplayString(_ctx.msgType) + "]", 1);
    };
  }
});
const UnknownMessage = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-dceaa496"]]);
export {
  UnknownMessage as default
};
