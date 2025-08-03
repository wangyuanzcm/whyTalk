import { t as defineComponent, aI as useRouter, at as useTalkStore, a1 as ref, a4 as reactive, z as computed, aC as resolveComponent, L as createElementBlock, U as openBlock, M as createBaseVNode, a8 as createCommentVNode, H as createVNode, P as withDirectives, O as unref, Q as vShow, a5 as createBlock, cb as Male, N as NIcon, cc as Female, eh as CloseOne, R as toDisplayString, V as createTextVNode, T as withCtx, aZ as withKeys, ad as isRef, aa as Button, _ as __unplugin_components_3, F as Fragment, ei as ServContactDetail, ce as ServContactGroupList, ej as ServContactApplyCreate, ch as ServContactEditRemark, aw as bus, ek as ServContactMoveGroup, W as _export_sfc, aG as useUserStore, u as h } from "./index-CP-MMhae.js";
import { a as formatPhone } from "./string-g9b8veVd.js";
import { _ as __unplugin_components_1 } from "./Input-9scKSWkl.js";
import { _ as __unplugin_components_2 } from "./Dropdown-BaOl703U.js";
import { S as SendOne } from "./SendOne-Ck-Fsq0E.js";
var ContactConst = /* @__PURE__ */ ((ContactConst2) => {
  ContactConst2["UpdateRemark"] = "contact:update-remark";
  return ContactConst2;
})(ContactConst || {});
var EditorConst = /* @__PURE__ */ ((EditorConst2) => {
  EditorConst2["Mention"] = "editor:mention";
  EditorConst2["Quote"] = "editor:quote";
  return EditorConst2;
})(EditorConst || {});
var SessionConst = /* @__PURE__ */ ((SessionConst2) => {
  SessionConst2["Switch"] = "session:switch";
  return SessionConst2;
})(SessionConst || {});
const _hoisted_1 = { class: "section" };
const _hoisted_2 = { class: "section el-container is-vertical height100" };
const _hoisted_3 = { class: "el-header header" };
const _hoisted_4 = { class: "gender" };
const _hoisted_5 = { class: "nickname text-ellipsis" };
const _hoisted_6 = { class: "el-main main me-scrollbar me-scrollbar-thumb" };
const _hoisted_7 = { class: "motto" };
const _hoisted_8 = { class: "infos" };
const _hoisted_9 = { class: "info-item" };
const _hoisted_10 = { class: "text" };
const _hoisted_11 = { class: "info-item" };
const _hoisted_12 = { class: "text text-ellipsis" };
const _hoisted_13 = { class: "info-item" };
const _hoisted_14 = { class: "text" };
const _hoisted_15 = {
  key: 0,
  class: "info-item"
};
const _hoisted_16 = { class: "text edit pointer text-ellipsis" };
const _hoisted_17 = { style: { "display": "flex" } };
const _hoisted_18 = { class: "info-item" };
const _hoisted_19 = { class: "text" };
const _hoisted_20 = {
  key: 1,
  class: "info-item"
};
const _hoisted_21 = { class: "text edit pointer" };
const _hoisted_22 = {
  key: 0,
  class: "el-footer footer border-top flex-center"
};
const _hoisted_23 = {
  key: 1,
  class: "el-footer footer border-top flex-center"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "UserCardModal",
  props: {
    userId: {
      type: Number,
      default: 0
    },
    loginUserId: {
      type: Number,
      default: 0
    }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const { message } = useInject();
    const router = useRouter();
    const talkStore = useTalkStore();
    const emit = __emit;
    const props = __props;
    const loading = ref(true);
    const isOpenFrom = ref(false);
    const applyRemark = ref("");
    const friendRemark = ref("");
    const userInfo = reactive({
      user_id: 0,
      avatar: "",
      gender: 0,
      mobile: "",
      motto: "",
      nickname: "",
      email: "",
      relation: 1,
      // 关系 1陌生人 2好友 3企业同事 4本人
      contact_group_id: 0,
      contact_remark: ""
    });
    const genders = {
      0: "-",
      1: "男",
      2: "女",
      3: "未知"
    };
    const editCardPopover = ref(false);
    const options = ref([]);
    const groupName = computed(() => {
      const item = options.value.find((item2) => {
        return item2.key == userInfo.contact_group_id;
      });
      return item?.label || "-";
    });
    const onLoadUser = async () => {
      const { code, data } = await ServContactDetail({ user_id: props.userId }, { loading });
      if (code != 200 || !data) return;
      Object.assign(userInfo, {
        user_id: data.user_id,
        avatar: data.avatar,
        gender: data.gender,
        mobile: data.mobile,
        motto: data.motto,
        nickname: data.nickname,
        email: data.email,
        relation: data.relation,
        contact_group_id: data.contact_group_id,
        contact_remark: data.contact_remark
      });
      friendRemark.value = data.contact_remark;
    };
    const onLoadUserGroup = async () => {
      const { code, data } = await ServContactGroupList();
      if (code != 200 || !data) return;
      let items = data.items || [];
      options.value = [];
      for (const iter of items) {
        options.value.push({ label: iter.name, key: iter.id });
      }
    };
    const onToTalk = () => {
      talkStore.toTalk(1, props.userId, router);
      emit("close");
    };
    const onJoinContact = async () => {
      if (!applyRemark.value.length) {
        return message.info("备注信息不能为空");
      }
      await ServContactApplyCreate(
        {
          user_id: props.userId,
          remark: applyRemark.value
        },
        {
          successText: "申请发送成功",
          onSuccess: () => {
            isOpenFrom.value = false;
          }
        }
      );
    };
    const onChangeRemark = async () => {
      const onSuccess = () => {
        editCardPopover.value.setShow(false);
        userInfo.contact_remark.remark = friendRemark.value;
        const params = {
          user_id: props.userId,
          remark: friendRemark.value
        };
        talkStore.setRemark(params);
        bus.emit(ContactConst.UpdateRemark, params);
      };
      await ServContactEditRemark(
        {
          user_id: props.userId,
          remark: friendRemark.value
        },
        {
          successText: "备注修改成功",
          onSuccess
        }
      );
    };
    const handleSelectGroup = async (value) => {
      await ServContactMoveGroup(
        {
          user_id: props.userId,
          group_id: value
        },
        {
          successText: "分组修改成功",
          onSuccess: () => {
            userInfo.contact_group_id = value;
          }
        }
      );
    };
    const onClose = () => {
      emit("close");
    };
    onLoadUser();
    onLoadUserGroup();
    return (_ctx, _cache) => {
      const _component_im_avatar = resolveComponent("im-avatar");
      const _component_n_icon = NIcon;
      const _component_n_input = __unplugin_components_1;
      const _component_n_button = Button;
      const _component_n_popover = __unplugin_components_3;
      const _component_n_dropdown = __unplugin_components_2;
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("section", _hoisted_2, [
          createBaseVNode("header", _hoisted_3, [
            createVNode(_component_im_avatar, {
              class: "avatar",
              size: 60,
              src: unref(userInfo).avatar,
              username: unref(userInfo).contact_remark || unref(userInfo).nickname,
              "font-size": 30
            }, null, 8, ["src", "username"]),
            withDirectives(createBaseVNode("div", _hoisted_4, [
              unref(userInfo).gender == 1 ? (openBlock(), createBlock(_component_n_icon, {
                key: 0,
                component: unref(Male),
                color: "#ffffff"
              }, null, 8, ["component"])) : createCommentVNode("", true),
              unref(userInfo).gender == 2 ? (openBlock(), createBlock(_component_n_icon, {
                key: 1,
                component: unref(Female),
                color: "#ffffff"
              }, null, 8, ["component"])) : createCommentVNode("", true)
            ], 512), [
              [vShow, unref(userInfo).gender > 0]
            ]),
            createBaseVNode("div", {
              class: "close",
              onClick: onClose
            }, [
              createVNode(unref(CloseOne), {
                theme: "outline",
                size: "22",
                fill: "#fff",
                strokeWidth: 2
              })
            ]),
            createBaseVNode("div", _hoisted_5, toDisplayString(unref(userInfo).contact_remark || unref(userInfo).nickname || "-"), 1)
          ]),
          createBaseVNode("main", _hoisted_6, [
            createBaseVNode("div", _hoisted_7, [
              _cache[3] || (_cache[3] = createBaseVNode("span", { style: { "font-weight": "600" } }, "个性签名：", -1)),
              createTextVNode(toDisplayString(unref(userInfo).motto || "编辑个签，展示我的独特态度。"), 1)
            ]),
            createBaseVNode("div", _hoisted_8, [
              createBaseVNode("div", _hoisted_9, [
                _cache[4] || (_cache[4] = createBaseVNode("span", { class: "name" }, "手机", -1)),
                createBaseVNode("span", _hoisted_10, toDisplayString(unref(formatPhone)(unref(userInfo).mobile) || "-"), 1)
              ]),
              createBaseVNode("div", _hoisted_11, [
                _cache[5] || (_cache[5] = createBaseVNode("span", { class: "name" }, "昵称", -1)),
                createBaseVNode("span", _hoisted_12, toDisplayString(unref(userInfo).nickname || "-"), 1)
              ]),
              createBaseVNode("div", _hoisted_13, [
                _cache[6] || (_cache[6] = createBaseVNode("span", { class: "name" }, "性别", -1)),
                createBaseVNode("span", _hoisted_14, toDisplayString(genders[unref(userInfo).gender]), 1)
              ]),
              unref(userInfo).relation === 2 ? (openBlock(), createElementBlock("div", _hoisted_15, [
                _cache[9] || (_cache[9] = createBaseVNode("span", { class: "name" }, "备注", -1)),
                createVNode(_component_n_popover, {
                  trigger: "click",
                  placement: "top-start",
                  ref_key: "editCardPopover",
                  ref: editCardPopover
                }, {
                  trigger: withCtx(() => [
                    createBaseVNode("span", _hoisted_16, toDisplayString(unref(userInfo).contact_remark || "-") + "   ", 1)
                  ]),
                  header: withCtx(() => _cache[7] || (_cache[7] = [
                    createTextVNode(" 设置备注 ", -1)
                  ])),
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_17, [
                      createVNode(_component_n_input, {
                        type: "text",
                        placeholder: "请填写备注",
                        autofocus: true,
                        maxlength: "10",
                        value: unref(friendRemark),
                        "onUpdate:value": _cache[0] || (_cache[0] = ($event) => isRef(friendRemark) ? friendRemark.value = $event : null),
                        onKeydown: withKeys(onChangeRemark, ["enter"])
                      }, null, 8, ["value"]),
                      createVNode(_component_n_button, {
                        type: "primary",
                        "text-color": "#ffffff",
                        class: "mt-l5",
                        onClick: onChangeRemark
                      }, {
                        default: withCtx(() => _cache[8] || (_cache[8] = [
                          createTextVNode(" 确定 ", -1)
                        ])),
                        _: 1,
                        __: [8]
                      })
                    ])
                  ]),
                  _: 1
                }, 512)
              ])) : createCommentVNode("", true),
              createBaseVNode("div", _hoisted_18, [
                _cache[10] || (_cache[10] = createBaseVNode("span", { class: "name" }, "邮箱", -1)),
                createBaseVNode("span", _hoisted_19, toDisplayString(unref(userInfo).email || "-"), 1)
              ]),
              unref(userInfo).relation === 2 ? (openBlock(), createElementBlock("div", _hoisted_20, [
                _cache[11] || (_cache[11] = createBaseVNode("span", { class: "name" }, "分组", -1)),
                createVNode(_component_n_dropdown, {
                  trigger: "click",
                  placement: "top-start",
                  "show-arrow": "",
                  options: unref(options),
                  onSelect: handleSelectGroup
                }, {
                  default: withCtx(() => [
                    createBaseVNode("span", _hoisted_21, toDisplayString(unref(groupName)), 1)
                  ]),
                  _: 1
                }, 8, ["options"])
              ])) : createCommentVNode("", true)
            ])
          ]),
          [2, 3].includes(unref(userInfo).relation) ? (openBlock(), createElementBlock("footer", _hoisted_22, [
            createVNode(_component_n_button, {
              round: "",
              block: "",
              type: "primary",
              "text-color": "#ffffff",
              onClick: onToTalk,
              style: { "width": "91%" }
            }, {
              icon: withCtx(() => [
                createVNode(_component_n_icon, { component: unref(SendOne) }, null, 8, ["component"])
              ]),
              default: withCtx(() => [
                _cache[12] || (_cache[12] = createTextVNode(" 发送消息 ", -1))
              ]),
              _: 1,
              __: [12]
            })
          ])) : unref(userInfo).relation === 1 ? (openBlock(), createElementBlock("footer", _hoisted_23, [
            unref(isOpenFrom) ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              createVNode(_component_n_input, {
                type: "text",
                placeholder: "请填写备注信息",
                value: unref(applyRemark),
                "onUpdate:value": _cache[1] || (_cache[1] = ($event) => isRef(applyRemark) ? applyRemark.value = $event : null),
                onKeydown: withKeys(onJoinContact, ["enter"])
              }, null, 8, ["value"]),
              createVNode(_component_n_button, {
                type: "primary",
                "text-color": "#ffffff",
                disabled: !unref(applyRemark).length,
                class: "mt-l5",
                onClick: onJoinContact
              }, {
                default: withCtx(() => _cache[13] || (_cache[13] = [
                  createTextVNode(" 确定 ", -1)
                ])),
                _: 1,
                __: [13]
              }, 8, ["disabled"])
            ], 64)) : (openBlock(), createBlock(_component_n_button, {
              key: 1,
              type: "primary",
              "text-color": "#ffffff",
              block: "",
              round: "",
              style: { "width": "91%" },
              onClick: _cache[2] || (_cache[2] = ($event) => isOpenFrom.value = true)
            }, {
              default: withCtx(() => _cache[14] || (_cache[14] = [
                createTextVNode(" 添加好友 ", -1)
              ])),
              _: 1,
              __: [14]
            }))
          ])) : createCommentVNode("", true)
        ])
      ]);
    };
  }
});
const UserCardModal = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-65f9b6d4"]]);
function useInject() {
  const dialog = window["$dialog"];
  const message = window["$message"];
  const notification = window["$notification"];
  const modal = window["$modal"];
  const toShowUserInfo = (userId) => {
    const { uid: loginUserId } = useUserStore();
    const instance = modal.create({
      content: () => h(UserCardModal, {
        userId,
        loginUserId,
        onClose: () => instance.destroy()
      }),
      preset: "card",
      closable: false,
      style: { width: "auto", background: "transparent" },
      contentStyle: { padding: "0px" }
    });
  };
  return { toShowUserInfo, dialog, message, notification, modal };
}
export {
  ContactConst as C,
  EditorConst as E,
  SessionConst as S,
  useInject as u
};
