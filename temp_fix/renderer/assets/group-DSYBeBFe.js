import { t as defineComponent, aG as useUserStore, at as useTalkStore, a1 as ref, a4 as reactive, z as computed, a2 as onMounted, L as createElementBlock, M as createBaseVNode, a5 as createBlock, a8 as createCommentVNode, H as createVNode, T as withCtx, ad as isRef, O as unref, a7 as __unplugin_components_1, F as Fragment, a9 as renderList, aF as ServGroupList, U as openBlock, V as createTextVNode, R as toDisplayString, N as NIcon, aa as Button, aI as useRouter, W as _export_sfc } from "./index-CP-MMhae.js";
import { G as GroupLaunch, _ as __unplugin_components_0, b as GroupPanel } from "./GroupPanel-Cwl1dvT_.js";
import { G as GroupCard } from "./GroupCard-FPsO6-fF.js";
import { _ as __unplugin_components_3, a as __unplugin_components_2 } from "./Tabs-Bo9TWhMD.js";
import { N as NEmpty } from "./Empty-DXO3k6Nm.js";
import { _ as __unplugin_components_1$1 } from "./Input-9scKSWkl.js";
import { S as Search } from "./Search-ywW15yaZ.js";
import { P as Plus } from "./Plus-DQPyk9lQ.js";
import "./index-iKnyGKVZ.js";
import "./useInject-KwKquBHc.js";
import "./string-g9b8veVd.js";
import "./Dropdown-BaOl703U.js";
import "./SendOne-Ck-Fsq0E.js";
import "./use-locale-sP6dOhdq.js";
import "./Checkbox-B683huVH.js";
import "./VirtualList-B9WzfpoZ.js";
import "./AvatarCropper-B00flI7D.js";
import "./UploadOne-CHKc3agb.js";
import "./Undo-DAYaSkZ9.js";
import "./Close-BsKkRN62.js";
import "./FormItem-BYV9eAmm.js";
import "./common-CbVb2jfY.js";
import "./index-88uWzgFD.js";
import "./CheckSmall-D9Jdj4Aw.js";
import "./Popconfirm-WQCbiWo_.js";
import "./Switch-Bg2nTzU7.js";
import "./More-9eOq9UNW.js";
import "./PeoplePlusOne-BIXCI58o.js";
const _hoisted_1 = {
  id: "drawer-target",
  class: "el-container is-vertical height100"
};
const _hoisted_2 = { class: "el-header me-view-header border-bottom" };
const _hoisted_3 = {
  key: 0,
  class: "el-main flex-center"
};
const _hoisted_4 = {
  key: 1,
  class: "el-main me-scrollbar me-scrollbar-thumb pd-10"
};
const _hoisted_5 = { class: "cards" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "group",
  setup(__props) {
    const router = useRouter();
    const userStore = useUserStore();
    const talkStore = useTalkStore();
    const isShowCreateGroupBox = ref(false);
    const keywords = ref("");
    const items = ref([]);
    const params = reactive({
      isShow: false,
      group_id: 0
    });
    const tabIndex = ref("all");
    const uid = userStore.uid;
    const filterCreator = computed(() => {
      return items.value.filter((item) => item.creator_id == uid);
    });
    const filter = computed(() => {
      return items.value.filter((item) => {
        if (tabIndex.value == "create" && item.creator_id != uid) {
          return false;
        }
        if (tabIndex.value == "join" && item.creator_id == uid) {
          return false;
        }
        return item.group_name.toLowerCase().indexOf(keywords.value.toLowerCase()) != -1;
      });
    });
    const onLoadData = async () => {
      const { code, data } = await ServGroupList();
      if (code == 200) {
        items.value = data.items || [];
      }
    };
    const onShowGroup = (item) => {
      params.isShow = true;
      params.group_id = item.group_id;
    };
    const onToTalk = (item) => {
      talkStore.toTalk(2, item.group_id, router);
    };
    const onGroupCallBack = () => {
      isShowCreateGroupBox.value = false;
      onLoadData();
      talkStore.loadTalkList();
    };
    onMounted(() => {
      onLoadData();
    });
    return (_ctx, _cache) => {
      const _component_n_tab = __unplugin_components_2;
      const _component_n_tabs = __unplugin_components_3;
      const _component_n_icon = NIcon;
      const _component_n_input = __unplugin_components_1$1;
      const _component_n_button = Button;
      const _component_n_space = __unplugin_components_1;
      const _component_n_empty = NEmpty;
      const _component_n_drawer = __unplugin_components_0;
      return openBlock(), createElementBlock(Fragment, null, [
        createBaseVNode("section", _hoisted_1, [
          createBaseVNode("header", _hoisted_2, [
            createBaseVNode("div", null, [
              createVNode(_component_n_tabs, {
                value: unref(tabIndex),
                "onUpdate:value": _cache[0] || (_cache[0] = ($event) => isRef(tabIndex) ? tabIndex.value = $event : null)
              }, {
                default: withCtx(() => [
                  createVNode(_component_n_tab, { name: "all" }, {
                    default: withCtx(() => [
                      createTextVNode(" 全部群聊(" + toDisplayString(unref(items).length) + ") ", 1)
                    ]),
                    _: 1
                  }),
                  createVNode(_component_n_tab, { name: "create" }, {
                    default: withCtx(() => [
                      createTextVNode(" 我创建的(" + toDisplayString(unref(filterCreator).length) + ") ", 1)
                    ]),
                    _: 1
                  }),
                  createVNode(_component_n_tab, { name: "join" }, {
                    default: withCtx(() => [
                      createTextVNode(" 我加入的(" + toDisplayString(unref(items).length - unref(filterCreator).length) + ") ", 1)
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["value"])
            ]),
            createVNode(_component_n_space, null, {
              default: withCtx(() => [
                createVNode(_component_n_input, {
                  value: unref(keywords),
                  "onUpdate:value": _cache[1] || (_cache[1] = ($event) => isRef(keywords) ? keywords.value = $event : null),
                  valueModifiers: { trim: true },
                  placeholder: "搜索",
                  clearable: "",
                  style: { "max-width": "200px" },
                  round: ""
                }, {
                  prefix: withCtx(() => [
                    createVNode(_component_n_icon, { component: unref(Search) }, null, 8, ["component"])
                  ]),
                  _: 1
                }, 8, ["value"]),
                createVNode(_component_n_button, {
                  circle: "",
                  onClick: _cache[2] || (_cache[2] = ($event) => isShowCreateGroupBox.value = true)
                }, {
                  icon: withCtx(() => [
                    createVNode(_component_n_icon, { component: unref(Plus) }, null, 8, ["component"])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })
          ]),
          unref(filter).length == 0 ? (openBlock(), createElementBlock("main", _hoisted_3, [
            createVNode(_component_n_empty, { description: "暂无相关数据" })
          ])) : (openBlock(), createElementBlock("main", _hoisted_4, [
            createBaseVNode("div", _hoisted_5, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(unref(filter), (item) => {
                return openBlock(), createBlock(GroupCard, {
                  key: item.group_id,
                  avatar: item.avatar,
                  username: item.group_name,
                  gender: item.gender,
                  motto: item.profile,
                  flag: "查看",
                  "is-member": true,
                  onClick: ($event) => onShowGroup(item),
                  onTalk: ($event) => onToTalk(item)
                }, null, 8, ["avatar", "username", "gender", "motto", "onClick", "onTalk"]);
              }), 128))
            ])
          ]))
        ]),
        unref(isShowCreateGroupBox) ? (openBlock(), createBlock(GroupLaunch, {
          key: 0,
          "group-id": 0,
          onClose: _cache[3] || (_cache[3] = ($event) => isShowCreateGroupBox.value = false),
          onOnSubmit: onGroupCallBack
        })) : createCommentVNode("", true),
        createVNode(_component_n_drawer, {
          show: unref(params).isShow,
          "onUpdate:show": _cache[6] || (_cache[6] = ($event) => unref(params).isShow = $event),
          width: 400,
          placement: "right",
          "trap-focus": false,
          "block-scroll": false,
          to: "#drawer-target",
          "show-mask": "transparent"
        }, {
          default: withCtx(() => [
            createVNode(GroupPanel, {
              "group-id": unref(params).group_id,
              onClose: _cache[4] || (_cache[4] = ($event) => unref(params).isShow = false),
              onToTalk: _cache[5] || (_cache[5] = ($event) => unref(talkStore).toTalk(2, unref(params).group_id, unref(router)))
            }, null, 8, ["group-id"])
          ]),
          _: 1
        }, 8, ["show"])
      ], 64);
    };
  }
});
const group = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-bf68dbcf"]]);
export {
  group as default
};
