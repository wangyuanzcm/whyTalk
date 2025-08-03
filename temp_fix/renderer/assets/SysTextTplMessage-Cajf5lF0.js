/* empty css                     */
import { t as defineComponent, cY as useId, a2 as onMounted, L as createElementBlock, U as openBlock, M as createBaseVNode, O as unref } from "./index-CP-MMhae.js";
import { u as useInject } from "./useInject-KwKquBHc.js";
import "./string-g9b8veVd.js";
import "./Input-9scKSWkl.js";
import "./use-locale-sP6dOhdq.js";
import "./Dropdown-BaOl703U.js";
import "./SendOne-Ck-Fsq0E.js";
const _hoisted_1 = {
  class: "immsg-systext",
  ref: "content"
};
const _hoisted_2 = ["id", "innerHTML"];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SysTextTplMessage",
  props: {
    content: {}
  },
  setup(__props) {
    const { toShowUserInfo } = useInject();
    const id = useId() ?? "";
    onMounted(() => {
      const nodes = document.getElementById(id)?.querySelectorAll("a") || [];
      for (let i = 0; i < nodes.length; i++) {
        nodes[i].addEventListener("click", (event) => {
          const el = event.target;
          toShowUserInfo(parseInt(el.dataset.uid));
        });
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", {
          class: "sys-text",
          id: unref(id),
          innerHTML: _ctx.content
        }, null, 8, _hoisted_2)
      ], 512);
    };
  }
});
export {
  _sfc_main as default
};
