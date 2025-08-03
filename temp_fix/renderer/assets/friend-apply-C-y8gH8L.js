import { t as defineComponent, aG as useUserStore, a1 as ref, z as computed, ah as watch, a2 as onMounted, P as withDirectives, aD as resolveDirective, O as unref, L as createElementBlock, ac as normalizeClass, H as createVNode, Q as vShow, F as Fragment, a9 as renderList, cj as ServContactApplyRecords, U as openBlock, M as createBaseVNode, aC as resolveComponent, R as toDisplayString, ck as formatTime, T as withCtx, N as NIcon, aa as Button, V as createTextVNode, cl as ServContactApplyAccept, cm as ServContactApplyDecline, W as _export_sfc } from "./index-CP-MMhae.js";
import { t as throttle } from "./common-CbVb2jfY.js";
import { u as useInject } from "./useInject-KwKquBHc.js";
import { C as CheckSmall } from "./CheckSmall-D9Jdj4Aw.js";
import { N as NEmpty } from "./Empty-DXO3k6Nm.js";
import { C as Close } from "./Close-BsKkRN62.js";
import { _ as __unplugin_components_4 } from "./Popconfirm-WQCbiWo_.js";
import "./index-88uWzgFD.js";
import "./string-g9b8veVd.js";
import "./Input-9scKSWkl.js";
import "./use-locale-sP6dOhdq.js";
import "./Dropdown-BaOl703U.js";
import "./SendOne-Ck-Fsq0E.js";
const _hoisted_1$1 = ["onClick"];
const _hoisted_2$1 = ["onClick"];
const _hoisted_3 = { class: "username" };
const _hoisted_4 = { class: "time" };
const _hoisted_5 = { class: "remark text-ellipsis" };
const _hoisted_6 = { class: "tools" };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "FriendApply",
  setup(__props) {
    const userStore = useUserStore();
    const { toShowUserInfo, message } = useInject();
    const items = ref([]);
    const loading = ref(true);
    const isContactApply = computed(() => userStore.isContactApply);
    const onLoadData = async (isClearTip = false) => {
      const { code, data } = await ServContactApplyRecords({}, { loading });
      if (code != 200) return;
      items.value = data?.items || [];
      if (isClearTip) {
        userStore.isContactApply = false;
      }
    };
    const onInfo = (item) => {
      toShowUserInfo(item.user_id);
    };
    const onAccept = throttle(async (item) => {
      let loading2 = message.loading("请稍等，正在处理");
      await ServContactApplyAccept(
        {
          apply_id: item.id,
          remark: item.nickname
        },
        {
          successText: "已同意",
          onSuccess: onLoadData
        }
      );
      loading2.destroy();
    }, 1e3);
    const onDecline = throttle(async (item) => {
      let loading2 = message.loading("请稍等，正在处理");
      await ServContactApplyDecline(
        {
          apply_id: item.id,
          remark: item.nickname
        },
        {
          successText: "已拒绝",
          onSuccess: onLoadData
        }
      );
      loading2.destroy();
    }, 1e3);
    watch(isContactApply, () => {
      onLoadData(false);
    });
    onMounted(() => {
      onLoadData(true);
    });
    return (_ctx, _cache) => {
      const _component_n_empty = NEmpty;
      const _component_im_avatar = resolveComponent("im-avatar");
      const _component_n_icon = NIcon;
      const _component_n_button = Button;
      const _component_n_popconfirm = __unplugin_components_4;
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
                createBaseVNode("span", null, toDisplayString(item.nickname), 1),
                createBaseVNode("span", _hoisted_4, toDisplayString(unref(formatTime)(item.created_at, "MM/DD HH:mm")), 1)
              ]),
              createBaseVNode("div", _hoisted_5, "备注: " + toDisplayString(item.remark), 1)
            ], 8, _hoisted_2$1),
            createBaseVNode("div", _hoisted_6, [
              createVNode(_component_n_button, {
                onClick: ($event) => unref(onAccept)(item),
                strong: "",
                secondary: "",
                circle: "",
                type: "primary",
                size: "small"
              }, {
                icon: withCtx(() => [
                  createVNode(_component_n_icon, { component: unref(CheckSmall) }, null, 8, ["component"])
                ]),
                _: 2
              }, 1032, ["onClick"]),
              createVNode(_component_n_popconfirm, {
                onPositiveClick: ($event) => unref(onDecline)(item)
              }, {
                trigger: withCtx(() => [
                  createVNode(_component_n_button, {
                    strong: "",
                    secondary: "",
                    circle: "",
                    type: "tertiary",
                    size: "small"
                  }, {
                    icon: withCtx(() => [
                      createVNode(_component_n_icon, { component: unref(Close) }, null, 8, ["component"])
                    ]),
                    _: 1
                  })
                ]),
                default: withCtx(() => [
                  _cache[0] || (_cache[0] = createTextVNode(" 确认要拒绝申请吗？ ", -1))
                ]),
                _: 2,
                __: [0]
              }, 1032, ["onPositiveClick"])
            ])
          ]);
        }), 128))
      ], 2)), [
        [_directive_loading, unref(loading)]
      ]);
    };
  }
});
const FriendApply = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-8da7ed45"]]);
const _hoisted_1 = { class: "el-container is-vertical height100" };
const _hoisted_2 = { class: "el-main me-scrollbar me-scrollbar-thumb" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "friend-apply",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("section", _hoisted_1, [
        _cache[0] || (_cache[0] = createBaseVNode("header", { class: "el-header me-view-header border-bottom" }, "好友通知", -1)),
        createBaseVNode("main", _hoisted_2, [
          createVNode(FriendApply)
        ])
      ]);
    };
  }
});
export {
  _sfc_main as default
};
