import { g as getImageInfo } from "./file-DJ5u2-kO.js";
import { t as defineComponent, L as createElementBlock, U as openBlock, H as createVNode, d2 as normalizeStyle, W as _export_sfc } from "./index-CP-MMhae.js";
import { _ as __unplugin_components_0 } from "./Image-BdM5UzkZ.js";
import "./use-locale-sP6dOhdq.js";
import "./Tooltip-BadUcq2V.js";
import "./download-DwbQunhL.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ImageMessage",
  props: {
    url: {}
  },
  setup(__props) {
    const img = (src, width = 200) => {
      const info = getImageInfo(src);
      if (info.width == 0 || info.height == 0) {
        return {};
      }
      if (info.width < width) {
        return {
          width: `${info.width}px`,
          height: `${info.height}px`
        };
      }
      return {
        width: width + "px",
        height: `${info.height / (info.width / width)}px`
      };
    };
    return (_ctx, _cache) => {
      const _component_n_image = __unplugin_components_0;
      return openBlock(), createElementBlock("section", {
        class: "immsg-image",
        style: normalizeStyle(img(_ctx.url, 250))
      }, [
        createVNode(_component_n_image, {
          src: _ctx.url,
          "object-fit": "cover"
        }, null, 8, ["src"])
      ], 4);
    };
  }
});
const ImageMessage = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ec5c8e4d"]]);
export {
  ImageMessage as default
};
