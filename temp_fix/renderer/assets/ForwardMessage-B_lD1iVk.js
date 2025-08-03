import { t as defineComponent, a1 as ref, a2 as onMounted, aD as resolveDirective, a5 as createBlock, U as openBlock, a6 as __unplugin_components_3, T as withCtx, P as withDirectives, L as createElementBlock, H as createVNode, O as unref, d$ as ServTalkForwardRecords, W as _export_sfc, M as createBaseVNode, a8 as createCommentVNode, R as toDisplayString, F as Fragment, a9 as renderList } from "./index-CP-MMhae.js";
import { C as ChatPlus, f as formatChatMessage } from "./render-C5dC9sUK.js";
import "./Copy-PmY75sEQ.js";
import "./Checkbox-B683huVH.js";
import "./Delete-BuJN8hI8.js";
import "./Undo-DAYaSkZ9.js";
import "./index-88uWzgFD.js";
import "./Dropdown-BaOl703U.js";
const _hoisted_1$1 = { class: "section me-scrollbar" };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ChatForwardRecord",
  props: {
    msgIds: {
      required: true
    },
    talkMode: {
      type: Number,
      required: true
    }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const props = __props;
    const loading = ref(true);
    const isShow = ref(true);
    const items = ref([]);
    const title = ref("会话记录");
    const onMaskClick = () => {
      emit("close");
    };
    const customMessageRender = (item) => formatChatMessage(0, item);
    const loadChatRecord = async () => {
      const { code, data } = await ServTalkForwardRecords(
        {
          msg_ids: props.msgIds,
          talk_mode: props.talkMode
        },
        { loading }
      );
      if (code != 200) return;
      items.value = data.items || [];
      items.value.map((item) => {
        item.extra = JSON.parse(item.extra);
        item.quote = JSON.parse(item.quote);
      });
      title.value = `会话记录(${items.value.length})`;
    };
    onMounted(() => {
      loadChatRecord();
    });
    return (_ctx, _cache) => {
      const _component_n_modal = __unplugin_components_3;
      const _directive_loading = resolveDirective("loading");
      return openBlock(), createBlock(_component_n_modal, {
        show: isShow.value,
        "onUpdate:show": _cache[0] || (_cache[0] = ($event) => isShow.value = $event),
        preset: "card",
        title: title.value,
        style: { "max-width": "500px" },
        class: "modal-radius o-hidden",
        "on-after-leave": onMaskClick,
        segmented: {
          content: true
        },
        "header-style": {
          padding: "15px 15px"
        },
        "content-style": {
          padding: 0
        }
      }, {
        default: withCtx(() => [
          withDirectives((openBlock(), createElementBlock("section", _hoisted_1$1, [
            createVNode(unref(ChatPlus), {
              dataSourceMode: "custom",
              items: items.value,
              "custom-render": customMessageRender
            }, null, 8, ["items"])
          ])), [
            [_directive_loading, loading.value]
          ])
        ]),
        _: 1
      }, 8, ["show", "title"]);
    };
  }
});
const ForwardRecord = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-3401a9f1"]]);
const _hoisted_1 = { class: "title" };
const _hoisted_2 = { class: "describe" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ForwardMessage",
  props: {
    count: {},
    items: {},
    msgIds: {},
    talkMode: {}
  },
  setup(__props) {
    const props = __props;
    const isShowRecord = ref(false);
    const title = [...new Set(props.items.map((v) => v.nickname))].join("、");
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("section", {
        class: "immsg-forward pointer",
        onClick: _cache[1] || (_cache[1] = ($event) => isShowRecord.value = true)
      }, [
        createBaseVNode("div", _hoisted_1, toDisplayString(unref(title)) + " 的会话记录", 1),
        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.items, (record, index) => {
          return openBlock(), createElementBlock("div", {
            class: "item",
            key: index
          }, [
            createBaseVNode("p", null, [
              createBaseVNode("span", null, toDisplayString(record.nickname) + ": ", 1),
              createBaseVNode("span", null, toDisplayString(record.content), 1)
            ])
          ]);
        }), 128)),
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("span", null, "转发：聊天会话记录 (" + toDisplayString(_ctx.count) + "条)", 1)
        ]),
        isShowRecord.value ? (openBlock(), createBlock(ForwardRecord, {
          key: 0,
          "msg-ids": _ctx.msgIds,
          "talk-mode": _ctx.talkMode,
          onClose: _cache[0] || (_cache[0] = ($event) => isShowRecord.value = false)
        }, null, 8, ["msg-ids", "talk-mode"])) : createCommentVNode("", true)
      ]);
    };
  }
});
const ForwardMessage = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d1e41d7b"]]);
export {
  ForwardMessage as default
};
