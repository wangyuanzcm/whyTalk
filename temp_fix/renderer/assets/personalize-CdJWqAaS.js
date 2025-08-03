import { t as defineComponent, au as useSettingsStore, z as computed, L as createElementBlock, M as createBaseVNode, R as toDisplayString, O as unref, H as createVNode, T as withCtx, ad as isRef, aa as Button, U as openBlock, a7 as __unplugin_components_1, F as Fragment, a9 as renderList, V as createTextVNode, W as _export_sfc } from "./index-CP-MMhae.js";
import { _ as __unplugin_components_2, a as __unplugin_components_0 } from "./RadioGroup-SjOLBydD.js";
const _hoisted_1 = { class: "view-box" };
const _hoisted_2 = { class: "view-list" };
const _hoisted_3 = { class: "content" };
const _hoisted_4 = { class: "desc" };
const _hoisted_5 = { class: "tools" };
const _hoisted_6 = { class: "view-list" };
const _hoisted_7 = { class: "tools" };
const _hoisted_8 = { class: "view-list" };
const _hoisted_9 = { class: "tools" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "personalize",
  setup(__props) {
    const settingsStore = useSettingsStore();
    const themeMode = computed({
      get: () => settingsStore.themeMode,
      set: (value) => {
        settingsStore.setThemeMode(value);
      }
    });
    const themes = [
      {
        label: "浅色",
        value: "light"
      },
      {
        label: "深色",
        value: "dark"
      },
      {
        label: "跟随系统",
        value: "auto"
      }
    ];
    return (_ctx, _cache) => {
      const _component_n_radio = __unplugin_components_0;
      const _component_n_space = __unplugin_components_1;
      const _component_n_radio_group = __unplugin_components_2;
      const _component_n_button = Button;
      return openBlock(), createElementBlock("section", null, [
        _cache[6] || (_cache[6] = createBaseVNode("h3", { class: "title" }, "个性设置", -1)),
        createBaseVNode("div", _hoisted_1, [
          createBaseVNode("div", _hoisted_2, [
            createBaseVNode("div", _hoisted_3, [
              _cache[1] || (_cache[1] = createBaseVNode("div", { class: "name" }, "主题颜色", -1)),
              createBaseVNode("div", _hoisted_4, "当前主题颜色 ：" + toDisplayString(unref(themeMode)), 1)
            ]),
            createBaseVNode("div", _hoisted_5, [
              createVNode(_component_n_radio_group, {
                value: unref(themeMode),
                "onUpdate:value": _cache[0] || (_cache[0] = ($event) => isRef(themeMode) ? themeMode.value = $event : null),
                name: "theme-group"
              }, {
                default: withCtx(() => [
                  createVNode(_component_n_space, null, {
                    default: withCtx(() => [
                      (openBlock(), createElementBlock(Fragment, null, renderList(themes, (item) => {
                        return createVNode(_component_n_radio, {
                          key: item.value,
                          value: item.value
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(item.label), 1)
                          ]),
                          _: 2
                        }, 1032, ["value"]);
                      }), 64))
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["value"])
            ])
          ]),
          createBaseVNode("div", _hoisted_6, [
            _cache[3] || (_cache[3] = createBaseVNode("div", { class: "content" }, [
              createBaseVNode("div", { class: "name" }, "我的名片"),
              createBaseVNode("div", { class: "desc" }, "当前未设置名片背景")
            ], -1)),
            createBaseVNode("div", _hoisted_7, [
              createVNode(_component_n_button, {
                type: "primary",
                text: ""
              }, {
                default: withCtx(() => _cache[2] || (_cache[2] = [
                  createTextVNode(" 修改 ", -1)
                ])),
                _: 1,
                __: [2]
              })
            ])
          ]),
          createBaseVNode("div", _hoisted_8, [
            _cache[5] || (_cache[5] = createBaseVNode("div", { class: "content" }, [
              createBaseVNode("div", { class: "name" }, "聊天背景"),
              createBaseVNode("div", { class: "desc" }, "当前未设置聊天背景图")
            ], -1)),
            createBaseVNode("div", _hoisted_9, [
              createVNode(_component_n_button, {
                type: "primary",
                text: ""
              }, {
                default: withCtx(() => _cache[4] || (_cache[4] = [
                  createTextVNode(" 修改 ", -1)
                ])),
                _: 1,
                __: [4]
              })
            ])
          ])
        ])
      ]);
    };
  }
});
const personalize = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c09c0ea1"]]);
export {
  personalize as default
};
