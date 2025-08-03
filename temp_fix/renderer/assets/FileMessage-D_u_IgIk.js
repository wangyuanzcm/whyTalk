import { f as fileFormatSize } from "./string-g9b8veVd.js";
import { c as getFileNameSuffix, f as download } from "./file-DJ5u2-kO.js";
import { t as defineComponent, L as createElementBlock, U as openBlock, M as createBaseVNode, R as toDisplayString, O as unref, W as _export_sfc } from "./index-CP-MMhae.js";
const _hoisted_1 = { class: "immsg-file" };
const _hoisted_2 = { class: "main" };
const _hoisted_3 = { class: "ext" };
const _hoisted_4 = { class: "file-box" };
const _hoisted_5 = { class: "info" };
const _hoisted_6 = { class: "name" };
const _hoisted_7 = { class: "size" };
const _hoisted_8 = { class: "footer" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "FileMessage",
  props: {
    filename: {},
    filesize: {},
    msgId: {}
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("section", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, toDisplayString(unref(getFileNameSuffix)(_ctx.filename)), 1),
          createBaseVNode("div", _hoisted_4, [
            createBaseVNode("p", _hoisted_5, [
              createBaseVNode("span", _hoisted_6, toDisplayString(_ctx.filename), 1),
              createBaseVNode("span", _hoisted_7, "(" + toDisplayString(unref(fileFormatSize)(_ctx.filesize)) + ")", 1)
            ]),
            _cache[1] || (_cache[1] = createBaseVNode("p", { class: "notice" }, "文件已成功发送, 文件助手永久保存", -1))
          ])
        ]),
        createBaseVNode("div", _hoisted_8, [
          createBaseVNode("a", {
            onClick: _cache[0] || (_cache[0] = ($event) => unref(download)(_ctx.msgId, 1))
          }, "下载"),
          _cache[2] || (_cache[2] = createBaseVNode("a", null, "在线预览", -1))
        ])
      ]);
    };
  }
});
const FileMessage = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-06c43637"]]);
export {
  FileMessage as default
};
