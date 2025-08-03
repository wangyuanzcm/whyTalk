import { t as defineComponent, a0 as useModel, a1 as ref, a4 as reactive, a5 as createBlock, T as withCtx, a6 as __unplugin_components_3, U as openBlock, H as createVNode, O as unref, M as createBaseVNode, V as createTextVNode, aa as Button, bX as ServUserPasswordUpdate, $ as mergeModels, bY as ServUserMobileUpdate, bZ as ServUserEmailUpdate, aG as useUserStore, L as createElementBlock, R as toDisplayString, ad as isRef, F as Fragment, W as _export_sfc } from "./index-CP-MMhae.js";
import { r as rsaEncrypt, u as useSmsLock, i as isMobile, S as ServCommonSendSmsCode, a as ServCommonSendEmailCode } from "./common-DD25a79p.js";
import { _ as __unplugin_components_3$1, a as __unplugin_components_7 } from "./FormItem-BYV9eAmm.js";
import { _ as __unplugin_components_1 } from "./Input-9scKSWkl.js";
import { u as useInject } from "./useInject-KwKquBHc.js";
import { h as hidePhone } from "./string-g9b8veVd.js";
import "./use-locale-sP6dOhdq.js";
import "./Dropdown-BaOl703U.js";
import "./SendOne-Ck-Fsq0E.js";
const _hoisted_1$3 = { style: { "width": "100%", "text-align": "right" } };
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "EditorPassword",
  props: {
    "modelValue": { default: false },
    "modelModifiers": {}
  },
  emits: ["update:modelValue"],
  setup(__props) {
    const model = useModel(__props, "modelValue");
    const formRef = ref();
    const state = reactive({
      old_password: "",
      new_password: "",
      new_password2: ""
    });
    const rules = {
      old_password: {
        required: true,
        trigger: ["blur", "input"],
        message: "登录密码不能为空！"
      },
      new_password: {
        required: true,
        trigger: ["blur", "input"],
        message: "新密码不能为空！"
      },
      new_password2: {
        required: true,
        trigger: ["blur", "change"],
        // @ts-ignore
        validator(rule, value) {
          if (!value) {
            return new Error("确认密码不能为空！");
          } else if (state.new_password != state.new_password2) {
            return new Error("两次密码填写不一致！");
          }
          return true;
        }
      }
    };
    const loading = ref(false);
    const onSubmit = async () => {
      await ServUserPasswordUpdate(
        {
          old_password: rsaEncrypt(state.old_password),
          new_password: rsaEncrypt(state.new_password)
        },
        {
          loading,
          successText: "密码修改成功",
          onSuccess: () => {
            model.value = false;
          }
        }
      );
    };
    const onValidate = (e) => {
      e.preventDefault();
      formRef.value.validate((errors) => {
        !errors && onSubmit();
      });
    };
    return (_ctx, _cache) => {
      const _component_n_input = __unplugin_components_1;
      const _component_n_form_item = __unplugin_components_3$1;
      const _component_n_form = __unplugin_components_7;
      const _component_n_button = Button;
      const _component_n_modal = __unplugin_components_3;
      return openBlock(), createBlock(_component_n_modal, {
        show: model.value,
        preset: "card",
        title: "修改密码？",
        class: "modal-radius",
        style: { "max-width": "400px" },
        "on-update:show": (value) => model.value = value
      }, {
        footer: withCtx(() => [
          createBaseVNode("div", _hoisted_1$3, [
            createVNode(_component_n_button, {
              type: "tertiary",
              onClick: _cache[3] || (_cache[3] = ($event) => model.value = false)
            }, {
              default: withCtx(() => _cache[4] || (_cache[4] = [
                createTextVNode(" 取消 ", -1)
              ])),
              _: 1,
              __: [4]
            }),
            createVNode(_component_n_button, {
              type: "primary",
              "text-color": "#ffffff",
              class: "mt-l15",
              loading: unref(loading),
              onClick: onValidate
            }, {
              default: withCtx(() => _cache[5] || (_cache[5] = [
                createTextVNode(" 保存修改 ", -1)
              ])),
              _: 1,
              __: [5]
            }, 8, ["loading"])
          ])
        ]),
        default: withCtx(() => [
          createVNode(_component_n_form, {
            ref_key: "formRef",
            ref: formRef,
            model: unref(state),
            rules
          }, {
            default: withCtx(() => [
              createVNode(_component_n_form_item, {
                label: "登录密码",
                path: "old_password"
              }, {
                default: withCtx(() => [
                  createVNode(_component_n_input, {
                    placeholder: "请填写登录密码",
                    type: "password",
                    value: unref(state).old_password,
                    "onUpdate:value": _cache[0] || (_cache[0] = ($event) => unref(state).old_password = $event)
                  }, null, 8, ["value"])
                ]),
                _: 1
              }),
              createVNode(_component_n_form_item, {
                label: "设置新密码",
                path: "new_password"
              }, {
                default: withCtx(() => [
                  createVNode(_component_n_input, {
                    placeholder: "请填写新密码",
                    type: "password",
                    value: unref(state).new_password,
                    "onUpdate:value": _cache[1] || (_cache[1] = ($event) => unref(state).new_password = $event)
                  }, null, 8, ["value"])
                ]),
                _: 1
              }),
              createVNode(_component_n_form_item, {
                label: "确认新密码",
                path: "new_password2"
              }, {
                default: withCtx(() => [
                  createVNode(_component_n_input, {
                    placeholder: "请再次填写新密码",
                    type: "password",
                    value: unref(state).new_password2,
                    "onUpdate:value": _cache[2] || (_cache[2] = ($event) => unref(state).new_password2 = $event)
                  }, null, 8, ["value"])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["model"])
        ]),
        _: 1
      }, 8, ["show", "on-update:show"]);
    };
  }
});
const _hoisted_1$2 = { style: { "width": "100%", "text-align": "right" } };
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "EditorMobile",
  props: {
    "modelValue": { default: false },
    "modelModifiers": {}
  },
  emits: /* @__PURE__ */ mergeModels(["success"], ["update:modelValue"]),
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const { message } = useInject();
    const model = useModel(__props, "modelValue");
    const formRef = ref();
    const state = reactive({
      password: "",
      mobile: "",
      sms_code: ""
    });
    const rules = {
      password: {
        required: true,
        trigger: ["input"],
        message: "账号密码不能为空！"
      },
      mobile: {
        required: true,
        trigger: ["input"],
        message: "手机号不能为空！"
      },
      sms_code: {
        required: true,
        trigger: ["change"],
        message: "验证码不能为空！"
      }
    };
    const loading = ref(false);
    const { startCountdown, Countdown } = useSmsLock("CHANGE_MOBILE_SMS", 120);
    const onSendSms = async () => {
      if (!isMobile(state.mobile)) {
        return message.warning("请正确填写手机号");
      }
      const params = {
        mobile: state.mobile,
        channel: "change_account"
      };
      const { code, data } = await ServCommonSendSmsCode(params);
      if (code != 200) return;
      startCountdown();
      if (data.is_debug) {
        state.sms_code = data.sms_code;
        message.success("已开启验证码自动填充");
      } else {
        message.success("短信发送成功");
      }
    };
    const onSubmit = async () => {
      const params = {
        mobile: state.mobile,
        sms_code: state.sms_code,
        password: rsaEncrypt(state.password)
      };
      await ServUserMobileUpdate(params, {
        loading,
        successText: "手机号修改成功",
        onSuccess: () => {
          emit("success", state.mobile);
        }
      });
    };
    const onValidate = (e) => {
      e.preventDefault();
      formRef.value.validate((errors) => {
        !errors && onSubmit();
      });
    };
    return (_ctx, _cache) => {
      const _component_n_input = __unplugin_components_1;
      const _component_n_form_item = __unplugin_components_3$1;
      const _component_n_form = __unplugin_components_7;
      const _component_n_button = Button;
      const _component_n_modal = __unplugin_components_3;
      return openBlock(), createBlock(_component_n_modal, {
        show: model.value,
        preset: "card",
        title: "换绑手机？",
        class: "modal-radius",
        style: { "max-width": "400px" },
        "on-update:show": (value) => model.value = value
      }, {
        footer: withCtx(() => [
          createBaseVNode("div", _hoisted_1$2, [
            createVNode(_component_n_button, {
              type: "tertiary",
              onClick: _cache[3] || (_cache[3] = ($event) => model.value = false)
            }, {
              default: withCtx(() => _cache[4] || (_cache[4] = [
                createTextVNode(" 取消 ", -1)
              ])),
              _: 1,
              __: [4]
            }),
            createVNode(_component_n_button, {
              type: "primary",
              "text-color": "#ffffff",
              class: "mt-l15",
              loading: unref(loading),
              onClick: onValidate
            }, {
              default: withCtx(() => _cache[5] || (_cache[5] = [
                createTextVNode(" 保存修改 ", -1)
              ])),
              _: 1,
              __: [5]
            }, 8, ["loading"])
          ])
        ]),
        default: withCtx(() => [
          createVNode(_component_n_form, {
            ref_key: "formRef",
            ref: formRef,
            model: unref(state),
            rules
          }, {
            default: withCtx(() => [
              createVNode(_component_n_form_item, {
                label: "登录密码",
                path: "password"
              }, {
                default: withCtx(() => [
                  createVNode(_component_n_input, {
                    placeholder: "请填写登录密码",
                    type: "password",
                    value: unref(state).password,
                    "onUpdate:value": _cache[0] || (_cache[0] = ($event) => unref(state).password = $event)
                  }, null, 8, ["value"])
                ]),
                _: 1
              }),
              createVNode(_component_n_form_item, {
                label: "新手机号码",
                path: "mobile"
              }, {
                default: withCtx(() => [
                  createVNode(_component_n_input, {
                    placeholder: "请填写新手机号码",
                    type: "text",
                    value: unref(state).mobile,
                    "onUpdate:value": _cache[1] || (_cache[1] = ($event) => unref(state).mobile = $event)
                  }, null, 8, ["value"])
                ]),
                _: 1
              }),
              createVNode(_component_n_form_item, {
                label: "短信验证码",
                path: "sms_code"
              }, {
                default: withCtx(() => [
                  createVNode(_component_n_input, {
                    placeholder: "请填写验证码",
                    type: "text",
                    value: unref(state).sms_code,
                    "onUpdate:value": _cache[2] || (_cache[2] = ($event) => unref(state).sms_code = $event)
                  }, null, 8, ["value"]),
                  createVNode(unref(Countdown), {
                    class: "mt-l5",
                    onClick: onSendSms
                  })
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["model"])
        ]),
        _: 1
      }, 8, ["show", "on-update:show"]);
    };
  }
});
const _hoisted_1$1 = { style: { "width": "100%", "text-align": "right" } };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "EditorEmail",
  props: {
    "modelValue": { default: false },
    "modelModifiers": {}
  },
  emits: /* @__PURE__ */ mergeModels(["success"], ["update:modelValue"]),
  setup(__props, { emit: __emit }) {
    const model = useModel(__props, "modelValue");
    const emit = __emit;
    const { message } = useInject();
    const { startCountdown, Countdown } = useSmsLock("CHANGE_EMAIL_SMS", 60);
    const formRef = ref();
    const state = reactive({
      password: "",
      email: "",
      code: ""
    });
    const rules = {
      password: {
        required: true,
        trigger: ["input"],
        message: "账号密码不能为空！"
      },
      email: {
        required: true,
        trigger: ["input"],
        message: "邮箱不能为空！"
      },
      code: {
        required: true,
        trigger: ["change"],
        message: "验证码不能为空！"
      }
    };
    const loading = ref(false);
    const onSendEmail = async () => {
      if (!state.email) {
        return message.warning("请填写新邮箱");
      }
      await ServCommonSendEmailCode(
        {
          email: state.email
        },
        {
          successText: "邮件发送成功",
          onSuccess: startCountdown
        }
      );
    };
    const onSubmit = async () => {
      if (!state.email || !state.code || !state.password) {
        return message.warning("请填写完整信息");
      }
      const params = {
        email: state.email,
        email_code: state.code,
        password: rsaEncrypt(state.password)
      };
      await ServUserEmailUpdate(params, {
        loading,
        successText: "邮箱修改成功",
        onSuccess: () => {
          emit("success", state.email);
        }
      });
    };
    const onValidate = (e) => {
      e.preventDefault();
      formRef.value.validate((errors) => {
        !errors && onSubmit();
      });
    };
    return (_ctx, _cache) => {
      const _component_n_input = __unplugin_components_1;
      const _component_n_form_item = __unplugin_components_3$1;
      const _component_n_form = __unplugin_components_7;
      const _component_n_button = Button;
      const _component_n_modal = __unplugin_components_3;
      return openBlock(), createBlock(_component_n_modal, {
        show: model.value,
        preset: "card",
        title: "修改邮箱？",
        class: "modal-radius",
        style: { "max-width": "400px" },
        "on-update:show": (value) => model.value = value
      }, {
        footer: withCtx(() => [
          createBaseVNode("div", _hoisted_1$1, [
            createVNode(_component_n_button, {
              type: "tertiary",
              onClick: _cache[3] || (_cache[3] = ($event) => model.value = false)
            }, {
              default: withCtx(() => _cache[4] || (_cache[4] = [
                createTextVNode(" 取消 ", -1)
              ])),
              _: 1,
              __: [4]
            }),
            createVNode(_component_n_button, {
              type: "primary",
              "text-color": "#ffffff",
              class: "mt-l15",
              loading: unref(loading),
              onClick: onValidate
            }, {
              default: withCtx(() => _cache[5] || (_cache[5] = [
                createTextVNode(" 保存修改 ", -1)
              ])),
              _: 1,
              __: [5]
            }, 8, ["loading"])
          ])
        ]),
        default: withCtx(() => [
          createVNode(_component_n_form, {
            ref_key: "formRef",
            ref: formRef,
            model: unref(state),
            rules
          }, {
            default: withCtx(() => [
              createVNode(_component_n_form_item, {
                label: "登录密码",
                path: "password"
              }, {
                default: withCtx(() => [
                  createVNode(_component_n_input, {
                    placeholder: "请填写登录密码",
                    type: "password",
                    value: unref(state).password,
                    "onUpdate:value": _cache[0] || (_cache[0] = ($event) => unref(state).password = $event)
                  }, null, 8, ["value"])
                ]),
                _: 1
              }),
              createVNode(_component_n_form_item, {
                label: "新邮箱",
                path: "email"
              }, {
                default: withCtx(() => [
                  createVNode(_component_n_input, {
                    placeholder: "请填写新邮箱",
                    type: "text",
                    value: unref(state).email,
                    "onUpdate:value": _cache[1] || (_cache[1] = ($event) => unref(state).email = $event)
                  }, null, 8, ["value"])
                ]),
                _: 1
              }),
              createVNode(_component_n_form_item, {
                label: "邮箱验证码",
                path: "code"
              }, {
                default: withCtx(() => [
                  createVNode(_component_n_input, {
                    placeholder: "请填写验证码",
                    type: "text",
                    value: unref(state).code,
                    "onUpdate:value": _cache[2] || (_cache[2] = ($event) => unref(state).code = $event)
                  }, null, 8, ["value"]),
                  createVNode(unref(Countdown), {
                    class: "mt-l5",
                    onClick: onSendEmail
                  })
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["model"])
        ]),
        _: 1
      }, 8, ["show", "on-update:show"]);
    };
  }
});
const _hoisted_1 = { class: "view-box" };
const _hoisted_2 = { class: "view-list" };
const _hoisted_3 = { class: "tools" };
const _hoisted_4 = { class: "view-list" };
const _hoisted_5 = { class: "content" };
const _hoisted_6 = { class: "desc" };
const _hoisted_7 = { class: "tools" };
const _hoisted_8 = { class: "view-list" };
const _hoisted_9 = { class: "content" };
const _hoisted_10 = { class: "desc" };
const _hoisted_11 = { class: "tools" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "security",
  setup(__props) {
    const userStore = useUserStore();
    const isShowChangePassword = ref(false);
    const isShowChangeMobile = ref(false);
    const isShowChangeEmail = ref(false);
    const onChangeMobileSuccess = (value) => {
      isShowChangeMobile.value = false;
      userStore.mobile = value;
    };
    const onChangeEmailSuccess = (value) => {
      isShowChangeEmail.value = false;
      userStore.email = value;
    };
    return (_ctx, _cache) => {
      const _component_n_button = Button;
      return openBlock(), createElementBlock(Fragment, null, [
        createBaseVNode("section", null, [
          _cache[12] || (_cache[12] = createBaseVNode("h3", { class: "title" }, "安全设置", -1)),
          createBaseVNode("div", _hoisted_1, [
            createBaseVNode("div", _hoisted_2, [
              _cache[7] || (_cache[7] = createBaseVNode("div", { class: "content" }, [
                createBaseVNode("div", { class: "name" }, "账户密码"),
                createBaseVNode("div", { class: "desc" }, "当前密码强度 ：中")
              ], -1)),
              createBaseVNode("div", _hoisted_3, [
                createVNode(_component_n_button, {
                  type: "primary",
                  text: "",
                  onClick: _cache[0] || (_cache[0] = ($event) => isShowChangePassword.value = true)
                }, {
                  default: withCtx(() => _cache[6] || (_cache[6] = [
                    createTextVNode(" 修改 ", -1)
                  ])),
                  _: 1,
                  __: [6]
                })
              ])
            ]),
            createBaseVNode("div", _hoisted_4, [
              createBaseVNode("div", _hoisted_5, [
                _cache[8] || (_cache[8] = createBaseVNode("div", { class: "name" }, "绑定手机", -1)),
                createBaseVNode("div", _hoisted_6, "已绑定手机 ：" + toDisplayString(unref(hidePhone)(unref(userStore).mobile)), 1)
              ]),
              createBaseVNode("div", _hoisted_7, [
                createVNode(_component_n_button, {
                  type: "primary",
                  text: "",
                  onClick: _cache[1] || (_cache[1] = ($event) => isShowChangeMobile.value = true)
                }, {
                  default: withCtx(() => _cache[9] || (_cache[9] = [
                    createTextVNode(" 修改 ", -1)
                  ])),
                  _: 1,
                  __: [9]
                })
              ])
            ]),
            createBaseVNode("div", _hoisted_8, [
              createBaseVNode("div", _hoisted_9, [
                _cache[10] || (_cache[10] = createBaseVNode("div", { class: "name" }, "绑定邮箱", -1)),
                createBaseVNode("div", _hoisted_10, "已绑定邮箱 ：" + toDisplayString(unref(userStore).email || "未设置"), 1)
              ]),
              createBaseVNode("div", _hoisted_11, [
                createVNode(_component_n_button, {
                  type: "primary",
                  text: "",
                  onClick: _cache[2] || (_cache[2] = ($event) => isShowChangeEmail.value = true)
                }, {
                  default: withCtx(() => _cache[11] || (_cache[11] = [
                    createTextVNode(" 修改 ", -1)
                  ])),
                  _: 1,
                  __: [11]
                })
              ])
            ])
          ])
        ]),
        createVNode(_sfc_main$3, {
          modelValue: unref(isShowChangePassword),
          "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => isRef(isShowChangePassword) ? isShowChangePassword.value = $event : null)
        }, null, 8, ["modelValue"]),
        createVNode(_sfc_main$2, {
          modelValue: unref(isShowChangeMobile),
          "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => isRef(isShowChangeMobile) ? isShowChangeMobile.value = $event : null),
          onSuccess: onChangeMobileSuccess
        }, null, 8, ["modelValue"]),
        createVNode(_sfc_main$1, {
          modelValue: unref(isShowChangeEmail),
          "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => isRef(isShowChangeEmail) ? isShowChangeEmail.value = $event : null),
          onSuccess: onChangeEmailSuccess
        }, null, 8, ["modelValue"])
      ], 64);
    };
  }
});
const security = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-39e7533d"]]);
export {
  security as default
};
