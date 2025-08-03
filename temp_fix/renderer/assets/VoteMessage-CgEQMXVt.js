import { t as defineComponent, a1 as ref, z as computed, L as createElementBlock, U as openBlock, M as createBaseVNode, R as toDisplayString, O as unref, F as Fragment, a9 as renderList, H as createVNode, ac as normalizeClass, T as withCtx, V as createTextVNode, aa as Button, eA as ServGroupVoteDetail, eB as ServGroupVoteSubmit, W as _export_sfc } from "./index-CP-MMhae.js";
import { _ as __unplugin_components_0 } from "./Progress-CM-b0lRX.js";
import { _ as __unplugin_components_1 } from "./Checkbox-B683huVH.js";
const _hoisted_1 = { class: "im-message-vote" };
const _hoisted_2 = { class: "vote-from" };
const _hoisted_3 = { class: "vheader" };
const _hoisted_4 = { style: { "font-weight": "bold" } };
const _hoisted_5 = { class: "vbody" };
const _hoisted_6 = { class: "vote-option" };
const _hoisted_7 = { class: "vote-census" };
const _hoisted_8 = { class: "vote-progress" };
const _hoisted_9 = { class: "vfooter vote-view" };
const _hoisted_10 = { class: "vbody" };
const _hoisted_11 = { class: "checkbox" };
const _hoisted_12 = ["onClick"];
const _hoisted_13 = { class: "vfooter" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "VoteMessage",
  props: {
    vote_id: {}
  },
  setup(__props) {
    const props = __props;
    const detail = ref({
      answer_mode: 0,
      answer_num: 0,
      answer_options: [],
      answered_num: 0,
      answered_users: [],
      is_anonymous: 0,
      title: "",
      vote_id: 0,
      is_checked: false,
      is_submit: false
    });
    const isCanSubmit = computed(() => {
      return detail.value.answer_options.some((item) => item.is_checked);
    });
    const onCheckboxChange = (checked, option) => {
      if (detail.value.answer_mode == 1) {
        detail.value.answer_options.forEach((option2) => option2.is_checked = false);
      }
      option.is_checked = checked;
    };
    const onLoadDetail = () => {
      ServGroupVoteDetail({ vote_id: props.vote_id }).then(({ data }) => {
        detail.value = data;
        let items = [];
        for (const v of data.answered_users) {
          for (const option of v.options) {
            items.push(option);
          }
        }
        detail.value.answer_options.forEach((option) => {
          option.progress = items.filter((item) => item == option.key).length / items.length * 100;
        });
      });
    };
    const onSubmit = async () => {
      if (!isCanSubmit.value) return;
      let items = detail.value.answer_options.filter((option) => option.is_checked).map((option) => option.key);
      await ServGroupVoteSubmit({
        vote_id: props.vote_id,
        options: items
      });
      onLoadDetail();
    };
    onLoadDetail();
    return (_ctx, _cache) => {
      const _component_n_progress = __unplugin_components_0;
      const _component_n_checkbox = __unplugin_components_1;
      const _component_n_button = Button;
      return openBlock(), createElementBlock("section", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            createBaseVNode("p", _hoisted_4, toDisplayString(unref(detail).answer_mode == 2 ? "[多选投票]" : "[单选投票]"), 1),
            createBaseVNode("p", null, toDisplayString(unref(detail).title), 1)
          ]),
          unref(detail).is_submit ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
            createBaseVNode("div", _hoisted_5, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(unref(detail).answer_options, (option) => {
                return openBlock(), createElementBlock("div", {
                  class: "vote-view",
                  key: option.key
                }, [
                  createBaseVNode("p", _hoisted_6, toDisplayString(option.key) + "、 " + toDisplayString(option.value), 1),
                  createBaseVNode("p", _hoisted_7, toDisplayString(option.num) + " 票 " + toDisplayString(option.progress) + "%", 1),
                  createBaseVNode("p", _hoisted_8, [
                    createVNode(_component_n_progress, {
                      type: "line",
                      height: 5,
                      "show-indicator": false,
                      percentage: option.progress,
                      color: "#1890ff"
                    }, null, 8, ["percentage"])
                  ])
                ]);
              }), 128))
            ]),
            createBaseVNode("div", _hoisted_9, [
              createBaseVNode("p", null, "应参与人数：" + toDisplayString(unref(detail).answer_num) + " 人", 1),
              createBaseVNode("p", null, "实际参与人数：" + toDisplayString(unref(detail).answered_num) + " 人", 1)
            ])
          ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            createBaseVNode("div", _hoisted_10, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(unref(detail).answer_options, (option) => {
                return openBlock(), createElementBlock("div", {
                  class: normalizeClass(["option", { radio: unref(detail).answer_mode == 1 }]),
                  key: option.key
                }, [
                  createBaseVNode("p", _hoisted_11, [
                    createVNode(_component_n_checkbox, {
                      checked: option.is_checked,
                      "onUpdate:checked": [($event) => option.is_checked = $event, ($event) => onCheckboxChange(option.is_checked, option)]
                    }, null, 8, ["checked", "onUpdate:checked"])
                  ]),
                  createBaseVNode("p", {
                    class: "text",
                    onClick: ($event) => onCheckboxChange(!option.is_checked, option)
                  }, toDisplayString(option.key) + "、" + toDisplayString(option.value), 9, _hoisted_12)
                ], 2);
              }), 128))
            ]),
            createBaseVNode("div", _hoisted_13, [
              createVNode(_component_n_button, {
                plain: "",
                round: "",
                onClick: onSubmit
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(isCanSubmit) ? "立即投票" : "请选择进行投票"), 1)
                ]),
                _: 1
              })
            ])
          ], 64))
        ])
      ]);
    };
  }
});
const VoteMessage = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1a1c7272"]]);
export {
  VoteMessage as default
};
