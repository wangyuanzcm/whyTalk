import { t as defineComponent, a1 as ref, a4 as reactive, L as createElementBlock, M as createBaseVNode, H as createVNode, T as withCtx, aZ as withKeys, O as unref, aa as Button, V as createTextVNode, aI as useRouter, U as openBlock, W as _export_sfc } from "./index-CP-MMhae.js";
import { b as ServAuthForget } from "./auth-45N4j_di.js";
import { u as useSmsLock, i as isMobile, S as ServCommonSendSmsCode, r as rsaEncrypt } from "./common-DD25a79p.js";
import { _ as __unplugin_components_3, a as __unplugin_components_7 } from "./FormItem-BYV9eAmm.js";
import { _ as __unplugin_components_1 } from "./Input-9scKSWkl.js";
import "./use-locale-sP6dOhdq.js";
const _hoisted_1 = { class: "el-container is-vertical login-box forget" };
const _hoisted_2 = {
  class: "el-main",
  style: { "padding": "3px" }
};
const _hoisted_3 = { class: "helper" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "forget",
  setup(__props) {
    const { startCountdown, Countdown } = useSmsLock("FORGET_PSW_SMS", 120);
    const router = useRouter();
    const formRef = ref();
    const rules = {
      sms_code: {
        required: true,
        trigger: ["blur", "input"],
        message: "验证码不能为空！"
      },
      username: {
        required: true,
        trigger: ["blur", "input"],
        // @ts-ignore
        validator(rule, value) {
          if (!value) {
            return new Error("手机号不能为空！");
          } else if (!isMobile(value)) {
            return new Error("请正确填写手机号！");
          }
          return true;
        }
      },
      password: {
        required: true,
        trigger: ["blur", "input"],
        message: "密码不能为空！"
      }
    };
    const loading = ref(false);
    const model = reactive({
      username: "",
      password: "",
      sms_code: ""
    });
    const onForget = async () => {
      const { code } = await ServAuthForget(
        {
          mobile: model.username,
          password: rsaEncrypt(model.password),
          sms_code: model.sms_code
        },
        { loading, successText: "密码修改成功" }
      );
      if (code != 200) return;
      setTimeout(() => {
        router.push("/auth/login");
      }, 500);
    };
    const onValidate = (e) => {
      e.preventDefault();
      formRef.value.validate((errors) => {
        !errors && onForget();
      });
    };
    const onSendSms = async () => {
      if (!isMobile(model.username)) {
        return window["$message"].warning("请正确填写手机号");
      }
      await ServCommonSendSmsCode(
        {
          mobile: model.username,
          channel: "forget_account"
        },
        { loading, successText: "短信发送成功", onSuccess: startCountdown }
      );
    };
    return (_ctx, _cache) => {
      const _component_n_input = __unplugin_components_1;
      const _component_n_form_item = __unplugin_components_3;
      const _component_n_button = Button;
      const _component_n_form = __unplugin_components_7;
      return openBlock(), createElementBlock("section", _hoisted_1, [
        _cache[8] || (_cache[8] = createBaseVNode("header", { class: "el-header box-header" }, "找回密码", -1)),
        createBaseVNode("main", _hoisted_2, [
          createVNode(_component_n_form, {
            ref_key: "formRef",
            ref: formRef,
            size: "large",
            model: unref(model),
            rules
          }, {
            default: withCtx(() => [
              createVNode(_component_n_form_item, {
                path: "username",
                "show-label": false
              }, {
                default: withCtx(() => [
                  createVNode(_component_n_input, {
                    placeholder: "手机号",
                    value: unref(model).username,
                    "onUpdate:value": _cache[0] || (_cache[0] = ($event) => unref(model).username = $event),
                    maxlength: 11,
                    onKeydown: withKeys(onValidate, ["enter"])
                  }, null, 8, ["value"])
                ]),
                _: 1
              }),
              createVNode(_component_n_form_item, {
                path: "sms_code",
                "show-label": false
              }, {
                default: withCtx(() => [
                  createVNode(_component_n_input, {
                    placeholder: "验证码",
                    maxlength: 6,
                    value: unref(model).sms_code,
                    "onUpdate:value": _cache[1] || (_cache[1] = ($event) => unref(model).sms_code = $event),
                    onKeydown: withKeys(onValidate, ["enter"])
                  }, null, 8, ["value"]),
                  createVNode(unref(Countdown), {
                    onClick: onSendSms,
                    class: "mt-l5"
                  })
                ]),
                _: 1
              }),
              createVNode(_component_n_form_item, {
                path: "password",
                "show-label": false
              }, {
                default: withCtx(() => [
                  createVNode(_component_n_input, {
                    placeholder: "设置密码",
                    type: "password",
                    "show-password-on": "click",
                    value: unref(model).password,
                    "onUpdate:value": _cache[2] || (_cache[2] = ($event) => unref(model).password = $event),
                    onKeydown: withKeys(onValidate, ["enter"])
                  }, null, 8, ["value"])
                ]),
                _: 1
              }),
              createVNode(_component_n_button, {
                type: "primary",
                size: "large",
                block: "",
                "text-color": "#ffffff",
                class: "mt-t20",
                onClick: onValidate,
                loading: unref(loading)
              }, {
                default: withCtx(() => _cache[5] || (_cache[5] = [
                  createTextVNode(" 立即找回 ", -1)
                ])),
                _: 1,
                __: [5]
              }, 8, ["loading"])
            ]),
            _: 1
          }, 8, ["model"]),
          createBaseVNode("div", _hoisted_3, [
            createVNode(_component_n_button, {
              text: "",
              color: "#409eff",
              onClick: _cache[3] || (_cache[3] = ($event) => unref(router).push("/auth/register"))
            }, {
              default: withCtx(() => _cache[6] || (_cache[6] = [
                createTextVNode(" 注册账号 ", -1)
              ])),
              _: 1,
              __: [6]
            }),
            createVNode(_component_n_button, {
              text: "",
              color: "#409eff",
              onClick: _cache[4] || (_cache[4] = ($event) => unref(router).push("/auth/login"))
            }, {
              default: withCtx(() => _cache[7] || (_cache[7] = [
                createTextVNode(" 已有账号，立即登录? ", -1)
              ])),
              _: 1,
              __: [7]
            })
          ])
        ])
      ]);
    };
  }
});
const forget = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-71fb473f"]]);
export {
  forget as default
};
