import { t as defineComponent, aG as useUserStore, a1 as ref, a2 as onMounted, P as withDirectives, aD as resolveDirective, O as unref, L as createElementBlock, ac as normalizeClass, H as createVNode, Q as vShow, F as Fragment, a9 as renderList, dc as ServGroupApplyAll, U as openBlock, M as createBaseVNode, aC as resolveComponent, V as createTextVNode, T as withCtx, R as toDisplayString, aM as NTag, ck as formatTime, N as NIcon, aa as Button, cU as ServGroupApplyAgree, u as h, cT as ServGroupApplyDecline, W as _export_sfc } from "./index-CP-MMhae.js";
import { t as throttle } from "./common-CbVb2jfY.js";
import { u as useInject } from "./useInject-KwKquBHc.js";
import { N as NEmpty } from "./Empty-DXO3k6Nm.js";
import { C as CheckSmall } from "./CheckSmall-D9Jdj4Aw.js";
import { C as Close } from "./Close-BsKkRN62.js";
import { _ as __unplugin_components_1 } from "./Input-9scKSWkl.js";
import "./index-88uWzgFD.js";
import "./string-g9b8veVd.js";
import "./Dropdown-BaOl703U.js";
import "./SendOne-Ck-Fsq0E.js";
import "./use-locale-sP6dOhdq.js";
const _hoisted_1$1 = ["onClick"];
const _hoisted_2$1 = ["onClick"];
const _hoisted_3 = { class: "username" };
const _hoisted_4 = { class: "time" };
const _hoisted_5 = { class: "remark text-ellipsis" };
const _hoisted_6 = { class: "tools" };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "GroupApply",
  setup(__props) {
    const { toShowUserInfo, message, dialog } = useInject();
    const userStore = useUserStore();
    const items = ref([]);
    const loading = ref(true);
    const onLoadData = async () => {
      const { code, data } = await ServGroupApplyAll({}, { loading });
      if (code != 200) return;
      items.value = data.items || [];
    };
    const onInfo = (item) => {
      toShowUserInfo(item.user_id);
    };
    const onAgree = throttle(async (item) => {
      let loading2 = message.loading("请稍等，正在处理");
      await ServGroupApplyAgree(
        {
          apply_id: item.id
        },
        {
          successText: "已同意",
          onSuccess: onLoadData
        }
      );
      loading2.destroy();
    }, 1e3);
    const onDelete = (item) => {
      let remark = "";
      const onPositiveClick = async () => {
        if (!remark.length) return false;
        await ServGroupApplyDecline(
          {
            apply_id: item.id,
            remark
          },
          {
            successText: "已拒绝",
            onSuccess: onLoadData
          }
        );
        return false;
      };
      dialog.create({
        title: "拒绝入群申请",
        content: () => {
          return h(__unplugin_components_1, {
            defaultValue: "",
            placeholder: "请填写拒绝原因",
            style: { marginTop: "20px" },
            onInput: (value) => remark = value,
            autofocus: true
          });
        },
        negativeText: "取消",
        positiveText: "提交",
        onPositiveClick
      });
    };
    onMounted(() => {
      onLoadData();
      userStore.isGroupApply = false;
    });
    return (_ctx, _cache) => {
      const _component_n_empty = NEmpty;
      const _component_im_avatar = resolveComponent("im-avatar");
      const _component_n_tag = NTag;
      const _component_n_icon = NIcon;
      const _component_n_button = Button;
      const _directive_loading = resolveDirective("loading");
      return withDirectives((openBlock(), createElementBlock("section", {
        style: { "min-height": "400px" },
        class: normalizeClass({
          "flex-center": unref(items).length == 0
        })
      }, [
        withDirectives(createVNode(_component_n_empty, { description: "暂无相关数据" }, null, 512), [
          [vShow, unref(items).length == 0]
        ]),
        (openBlock(true), createElementBlock(Fragment, null, renderList(unref(items), (item) => {
          return openBlock(), createElementBlock("div", {
            class: "item",
            key: item.id
          }, [
            createBaseVNode("div", {
              class: "avatar",
              onClick: ($event) => onInfo(item)
            }, [
              createVNode(_component_im_avatar, {
                size: 40,
                src: item.avatar,
                username: item.nickname
              }, null, 8, ["src", "username"])
            ], 8, _hoisted_1$1),
            createBaseVNode("div", {
              class: "content pointer o-hidden",
              onClick: ($event) => onInfo(item)
            }, [
              createBaseVNode("div", _hoisted_3, [
                createBaseVNode("span", null, [
                  createVNode(_component_n_tag, {
                    bordered: false,
                    size: "small",
                    type: "primary"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(item.group_name), 1)
                    ]),
                    _: 2
                  }, 1024),
                  createTextVNode(" " + toDisplayString(item.nickname), 1)
                ]),
                createBaseVNode("span", _hoisted_4, toDisplayString(unref(formatTime)(item.created_at, "MM/DD HH:mm")), 1)
              ]),
              createBaseVNode("div", _hoisted_5, "备注: " + toDisplayString(item.remark), 1)
            ], 8, _hoisted_2$1),
            createBaseVNode("div", _hoisted_6, [
              createVNode(_component_n_button, {
                onClick: ($event) => unref(onAgree)(item),
                strong: "",
                secondary: "",
                circle: "",
                size: "small",
                type: "primary"
              }, {
                icon: withCtx(() => [
                  createVNode(_component_n_icon, { component: unref(CheckSmall) }, null, 8, ["component"])
                ]),
                _: 2
              }, 1032, ["onClick"]),
              createVNode(_component_n_button, {
                onClick: ($event) => onDelete(item),
                strong: "",
                secondary: "",
                circle: "",
                type: "tertiary",
                size: "small"
              }, {
                icon: withCtx(() => [
                  createVNode(_component_n_icon, { component: unref(Close) }, null, 8, ["component"])
                ]),
                _: 2
              }, 1032, ["onClick"])
            ])
          ]);
        }), 128))
      ], 2)), [
        [_directive_loading, unref(loading)]
      ]);
    };
  }
});
const GroupApply = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-68fcac8c"]]);
const _hoisted_1 = { class: "el-container is-vertical height100" };
const _hoisted_2 = { class: "el-main me-scrollbar me-scrollbar-thumb" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "group-apply",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("section", _hoisted_1, [
        _cache[0] || (_cache[0] = createBaseVNode("header", { class: "el-header me-view-header border-bottom" }, "群聊通知", -1)),
        createBaseVNode("main", _hoisted_2, [
          createVNode(GroupApply)
        ])
      ]);
    };
  }
});
export {
  _sfc_main as default
};
