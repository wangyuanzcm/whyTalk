import { b0 as createInjectionKey, d6 as keysOf, t as defineComponent, b3 as resolveSlot, u as h, aa as Button, b6 as resolveWrappedSlot, b4 as NBaseIcon, d7 as WarningIcon, x as useConfig, ba as inject, z as computed, bb as useThemeClass, b7 as toRef, s as cB, b2 as cE, r as c, d8 as omit, _ as __unplugin_components_3, d9 as keep, y as useTheme, da as popconfirmLight, a1 as ref, bf as call, db as popoverBaseProps, bk as provide } from "./index-CP-MMhae.js";
import { u as useLocale } from "./use-locale-sP6dOhdq.js";
const popconfirmInjectionKey = createInjectionKey("n-popconfirm");
const panelProps = {
  positiveText: String,
  negativeText: String,
  showIcon: {
    type: Boolean,
    default: true
  },
  onPositiveClick: {
    type: Function,
    required: true
  },
  onNegativeClick: {
    type: Function,
    required: true
  }
};
const panelPropKeys = keysOf(panelProps);
const PopconfirmPanel = defineComponent({
  name: "NPopconfirmPanel",
  props: panelProps,
  setup(props) {
    const {
      localeRef
    } = useLocale("Popconfirm");
    const {
      inlineThemeDisabled
    } = useConfig();
    const {
      mergedClsPrefixRef,
      mergedThemeRef,
      props: popconfirmProps2
    } = inject(popconfirmInjectionKey);
    const cssVarsRef = computed(() => {
      const {
        common: {
          cubicBezierEaseInOut
        },
        self: {
          fontSize,
          iconSize,
          iconColor
        }
      } = mergedThemeRef.value;
      return {
        "--n-bezier": cubicBezierEaseInOut,
        "--n-font-size": fontSize,
        "--n-icon-size": iconSize,
        "--n-icon-color": iconColor
      };
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass("popconfirm-panel", void 0, cssVarsRef, popconfirmProps2) : void 0;
    return Object.assign(Object.assign({}, useLocale("Popconfirm")), {
      mergedClsPrefix: mergedClsPrefixRef,
      cssVars: inlineThemeDisabled ? void 0 : cssVarsRef,
      localizedPositiveText: computed(() => {
        return props.positiveText || localeRef.value.positiveText;
      }),
      localizedNegativeText: computed(() => {
        return props.negativeText || localeRef.value.negativeText;
      }),
      positiveButtonProps: toRef(popconfirmProps2, "positiveButtonProps"),
      negativeButtonProps: toRef(popconfirmProps2, "negativeButtonProps"),
      handlePositiveClick(e) {
        props.onPositiveClick(e);
      },
      handleNegativeClick(e) {
        props.onNegativeClick(e);
      },
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
    });
  },
  render() {
    var _a;
    const {
      mergedClsPrefix,
      showIcon,
      $slots
    } = this;
    const actionContentNode = resolveSlot($slots.action, () => this.negativeText === null && this.positiveText === null ? [] : [this.negativeText !== null && h(Button, Object.assign({
      size: "small",
      onClick: this.handleNegativeClick
    }, this.negativeButtonProps), {
      default: () => this.localizedNegativeText
    }), this.positiveText !== null && h(Button, Object.assign({
      size: "small",
      type: "primary",
      onClick: this.handlePositiveClick
    }, this.positiveButtonProps), {
      default: () => this.localizedPositiveText
    })]);
    (_a = this.onRender) === null || _a === void 0 ? void 0 : _a.call(this);
    return h("div", {
      class: [`${mergedClsPrefix}-popconfirm__panel`, this.themeClass],
      style: this.cssVars
    }, resolveWrappedSlot($slots.default, (children) => showIcon || children ? h("div", {
      class: `${mergedClsPrefix}-popconfirm__body`
    }, showIcon ? h("div", {
      class: `${mergedClsPrefix}-popconfirm__icon`
    }, resolveSlot($slots.icon, () => [h(NBaseIcon, {
      clsPrefix: mergedClsPrefix
    }, {
      default: () => h(WarningIcon, null)
    })])) : null, children) : null), actionContentNode ? h("div", {
      class: [`${mergedClsPrefix}-popconfirm__action`]
    }, actionContentNode) : null);
  }
});
const style = cB("popconfirm", [cE("body", `
 font-size: var(--n-font-size);
 display: flex;
 align-items: center;
 flex-wrap: nowrap;
 position: relative;
 `, [cE("icon", `
 display: flex;
 font-size: var(--n-icon-size);
 color: var(--n-icon-color);
 transition: color .3s var(--n-bezier);
 margin: 0 8px 0 0;
 `)]), cE("action", `
 display: flex;
 justify-content: flex-end;
 `, [c("&:not(:first-child)", "margin-top: 8px"), cB("button", [c("&:not(:last-child)", "margin-right: 8px;")])])]);
const popconfirmProps = Object.assign(Object.assign(Object.assign({}, useTheme.props), popoverBaseProps), {
  positiveText: String,
  negativeText: String,
  showIcon: {
    type: Boolean,
    default: true
  },
  trigger: {
    type: String,
    default: "click"
  },
  positiveButtonProps: Object,
  negativeButtonProps: Object,
  onPositiveClick: Function,
  onNegativeClick: Function
});
const __unplugin_components_4 = defineComponent({
  name: "Popconfirm",
  props: popconfirmProps,
  slots: Object,
  __popover__: true,
  setup(props) {
    const {
      mergedClsPrefixRef
    } = useConfig();
    const themeRef = useTheme("Popconfirm", "-popconfirm", style, popconfirmLight, props, mergedClsPrefixRef);
    const popoverInstRef = ref(null);
    function handlePositiveClick(e) {
      var _a;
      if (!((_a = popoverInstRef.value) === null || _a === void 0 ? void 0 : _a.getMergedShow())) return;
      const {
        onPositiveClick,
        "onUpdate:show": onUpdateShow
      } = props;
      void Promise.resolve(onPositiveClick ? onPositiveClick(e) : true).then((value) => {
        var _a2;
        if (value === false) return;
        (_a2 = popoverInstRef.value) === null || _a2 === void 0 ? void 0 : _a2.setShow(false);
        if (onUpdateShow) call(onUpdateShow, false);
      });
    }
    function handleNegativeClick(e) {
      var _a;
      if (!((_a = popoverInstRef.value) === null || _a === void 0 ? void 0 : _a.getMergedShow())) return;
      const {
        onNegativeClick,
        "onUpdate:show": onUpdateShow
      } = props;
      void Promise.resolve(onNegativeClick ? onNegativeClick(e) : true).then((value) => {
        var _a2;
        if (value === false) return;
        (_a2 = popoverInstRef.value) === null || _a2 === void 0 ? void 0 : _a2.setShow(false);
        if (onUpdateShow) call(onUpdateShow, false);
      });
    }
    provide(popconfirmInjectionKey, {
      mergedThemeRef: themeRef,
      mergedClsPrefixRef,
      props
    });
    const returned = {
      setShow(value) {
        var _a;
        (_a = popoverInstRef.value) === null || _a === void 0 ? void 0 : _a.setShow(value);
      },
      syncPosition() {
        var _a;
        (_a = popoverInstRef.value) === null || _a === void 0 ? void 0 : _a.syncPosition();
      },
      mergedTheme: themeRef,
      popoverInstRef,
      handlePositiveClick,
      handleNegativeClick
    };
    return returned;
  },
  render() {
    const {
      $slots: slots,
      $props: props,
      mergedTheme
    } = this;
    return h(__unplugin_components_3, omit(props, panelPropKeys, {
      theme: mergedTheme.peers.Popover,
      themeOverrides: mergedTheme.peerOverrides.Popover,
      internalExtraClass: ["popconfirm"],
      ref: "popoverInstRef"
    }), {
      trigger: slots.trigger,
      default: () => {
        const panelProps2 = keep(props, panelPropKeys);
        return h(PopconfirmPanel, Object.assign(Object.assign({}, panelProps2), {
          onPositiveClick: this.handlePositiveClick,
          onNegativeClick: this.handleNegativeClick
        }), slots);
      }
    });
  }
});
export {
  __unplugin_components_4 as _
};
