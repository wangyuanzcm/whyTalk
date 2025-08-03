import { y as useTheme, b0 as createInjectionKey, q as derived, s as cB, b1 as cM, b2 as cE, r as c, t as defineComponent, u as h, b3 as resolveSlot, b4 as NBaseIcon, b5 as ErrorIcon, b6 as resolveWrappedSlot, x as useConfig, a1 as ref, b7 as toRef, b8 as useMergedState, z as computed, b9 as formatLength, ba as inject, bb as useThemeClass, a2 as onMounted, bc as on, bd as onBeforeUnmount, be as off, bf as call, I as IconWrapper, H as createVNode, a4 as reactive } from "./index-CP-MMhae.js";
import { _ as __unplugin_components_2 } from "./Dropdown-BaOl703U.js";
Object.assign(Object.assign({}, useTheme.props), {
  left: [Number, String],
  right: [Number, String],
  top: [Number, String],
  bottom: [Number, String],
  shape: {
    type: String,
    default: "circle"
  },
  position: {
    type: String,
    default: "fixed"
  }
});
const floatButtonGroupInjectionKey = createInjectionKey("n-float-button-group");
function self(vars) {
  const {
    popoverColor,
    textColor2,
    buttonColor2Hover,
    buttonColor2Pressed,
    primaryColor,
    primaryColorHover,
    primaryColorPressed,
    borderRadius
  } = vars;
  return {
    color: popoverColor,
    colorHover: buttonColor2Hover,
    colorPressed: buttonColor2Pressed,
    colorPrimary: primaryColor,
    colorPrimaryHover: primaryColorHover,
    colorPrimaryPressed: primaryColorPressed,
    textColor: textColor2,
    boxShadow: "0 2px 8px 0px rgba(0, 0, 0, .16)",
    boxShadowHover: "0 2px 12px 0px rgba(0, 0, 0, .24)",
    boxShadowPressed: "0 2px 12px 0px rgba(0, 0, 0, .24)",
    textColorPrimary: "#fff",
    borderRadiusSquare: borderRadius
  };
}
const themeLight = {
  common: derived,
  self
};
const style = cB("float-button", `
 user-select: none;
 cursor: pointer;
 color: var(--n-text-color);
 background-color: var(--n-color);
 font-size: 18px;
 transition:
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 box-shadow: var(--n-box-shadow);
 display: flex;
 align-items: stretch;
 box-sizing: border-box;
`, [cM("circle-shape", `
 border-radius: 4096px;
 `), cM("square-shape", `
 border-radius: var(--n-border-radius-square);
 `), cE("fill", `
 position: absolute;
 top: 0;
 right: 0;
 bottom: 0
 left: 0;
 transition: background-color .3s var(--n-bezier);
 border-radius: inherit;
 `), cE("body", `
 position: relative;
 flex-grow: 1;
 display: flex;
 align-items: center;
 justify-content: center;
 transition: transform .3s var(--n-bezier), opacity .3s var(--n-bezier);
 border-radius: inherit;
 flex-direction: column;
 box-sizing: border-box;
 padding: 2px 4px;
 gap: 2px;
 transform: scale(1);
 `, [cE("description", `
 font-size: 12px;
 text-align: center;
 line-height: 14px;
 `)]), c("&:hover", "box-shadow: var(--n-box-shadow-hover);", [c(">", [cE("fill", `
 background-color: var(--n-color-hover);
 `)])]), c("&:active", "box-shadow: var(--n-box-shadow-pressed);", [c(">", [cE("fill", `
 background-color: var(--n-color-pressed);
 `)])]), cM("show-menu", [c(">", [cE("menu", `
 pointer-events: all;
 bottom: 100%;
 opacity: 1;
 `), cE("close", `
 transform: scale(1);
 opacity: 1;
 `), cE("body", `
 transform: scale(0.75);
 opacity: 0;
 `)])]), cE("close", `
 opacity: 0;
 transform: scale(0.75);
 position: absolute;
 top: 0;
 right: 0;
 bottom: 0;
 left: 0;
 display: flex;
 align-items: center;
 justify-content: center;
 transition: transform .3s var(--n-bezier), opacity .3s var(--n-bezier);
 `), cE("menu", `
 position: absolute;
 bottom: calc(100% - 8px);
 display: flex;
 flex-direction: column;
 opacity: 0;
 pointer-events: none;
 transition:
 opacity .3s var(--n-bezier),
 bottom .3s var(--n-bezier); 
 `, [c("> *", `
 margin-bottom: 16px;
 `), cB("float-button", `
 position: relative !important;
 `)])]);
const floatButtonProps = Object.assign(Object.assign({}, useTheme.props), {
  width: {
    type: [Number, String],
    default: 40
  },
  height: {
    type: [Number, String],
    default: 40
  },
  left: [Number, String],
  right: [Number, String],
  top: [Number, String],
  bottom: [Number, String],
  shape: {
    type: String,
    default: "circle"
  },
  position: {
    type: String,
    default: "fixed"
  },
  type: {
    type: String,
    default: "default"
  },
  menuTrigger: String,
  showMenu: {
    type: Boolean,
    default: void 0
  },
  onUpdateShowMenu: {
    type: [Function, Array],
    default: void 0
  },
  "onUpdate:showMenu": {
    type: [Function, Array],
    default: void 0
  }
});
const __unplugin_components_4 = defineComponent({
  name: "FloatButton",
  props: floatButtonProps,
  slots: Object,
  setup(props) {
    const {
      mergedClsPrefixRef,
      inlineThemeDisabled
    } = useConfig(props);
    const selfElRef = ref(null);
    const themeRef = useTheme("FloatButton", "-float-button", style, themeLight, props, mergedClsPrefixRef);
    const floatButtonGroupInjection = inject(floatButtonGroupInjectionKey, null);
    const uncontrolledShowMenuRef = ref(false);
    const controlledShoeMenuRef = toRef(props, "showMenu");
    const mergedShowMenuRef = useMergedState(controlledShoeMenuRef, uncontrolledShowMenuRef);
    function doUpdateShowMenu(value) {
      const {
        onUpdateShowMenu,
        "onUpdate:showMenu": _onUpdateShowMenu
      } = props;
      uncontrolledShowMenuRef.value = value;
      if (onUpdateShowMenu) {
        call(onUpdateShowMenu, value);
      }
      if (_onUpdateShowMenu) {
        call(_onUpdateShowMenu, value);
      }
    }
    const cssVarsRef = computed(() => {
      const {
        self: {
          color,
          textColor,
          boxShadow,
          boxShadowHover,
          boxShadowPressed,
          colorHover,
          colorPrimary,
          colorPrimaryHover,
          textColorPrimary,
          borderRadiusSquare,
          colorPressed,
          colorPrimaryPressed
        },
        common: {
          cubicBezierEaseInOut
        }
      } = themeRef.value;
      const {
        type
      } = props;
      return {
        "--n-bezier": cubicBezierEaseInOut,
        "--n-box-shadow": boxShadow,
        "--n-box-shadow-hover": boxShadowHover,
        "--n-box-shadow-pressed": boxShadowPressed,
        "--n-color": type === "primary" ? colorPrimary : color,
        "--n-text-color": type === "primary" ? textColorPrimary : textColor,
        "--n-color-hover": type === "primary" ? colorPrimaryHover : colorHover,
        "--n-color-pressed": type === "primary" ? colorPrimaryPressed : colorPressed,
        "--n-border-radius-square": borderRadiusSquare
      };
    });
    const inlineStyle = computed(() => {
      const {
        width,
        height
      } = props;
      return Object.assign({
        position: floatButtonGroupInjection ? void 0 : props.position,
        width: formatLength(width),
        minHeight: formatLength(height)
      }, floatButtonGroupInjection ? null : {
        left: formatLength(props.left),
        right: formatLength(props.right),
        top: formatLength(props.top),
        bottom: formatLength(props.bottom)
      });
    });
    const mergedShapeRef = computed(() => {
      return floatButtonGroupInjection ? floatButtonGroupInjection.shapeRef.value : props.shape;
    });
    const Mouseenter = () => {
      if (props.menuTrigger === "hover") {
        doUpdateShowMenu(true);
      }
    };
    const handleMouseleave = () => {
      if (props.menuTrigger === "hover" && mergedShowMenuRef.value) {
        doUpdateShowMenu(false);
      }
    };
    const handleClick = () => {
      if (props.menuTrigger === "click") {
        doUpdateShowMenu(!mergedShowMenuRef.value);
      }
    };
    const themeClassHandle = inlineThemeDisabled ? useThemeClass("float-button", computed(() => props.type[0]), cssVarsRef, props) : void 0;
    onMounted(() => {
      const selfEl = selfElRef.value;
      if (selfEl) {
        on("mousemoveoutside", selfEl, handleMouseleave);
      }
    });
    onBeforeUnmount(() => {
      const selfEl = selfElRef.value;
      if (selfEl) {
        off("mousemoveoutside", selfEl, handleMouseleave);
      }
    });
    return {
      inlineStyle,
      selfElRef,
      cssVars: inlineThemeDisabled ? void 0 : cssVarsRef,
      mergedClsPrefix: mergedClsPrefixRef,
      mergedShape: mergedShapeRef,
      mergedShowMenu: mergedShowMenuRef,
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender,
      Mouseenter,
      handleMouseleave,
      handleClick
    };
  },
  render() {
    var _a;
    const {
      mergedClsPrefix,
      cssVars,
      mergedShape,
      type,
      menuTrigger,
      mergedShowMenu,
      themeClass,
      $slots,
      inlineStyle,
      onRender
    } = this;
    onRender === null || onRender === void 0 ? void 0 : onRender();
    return h("div", {
      ref: "selfElRef",
      class: [`${mergedClsPrefix}-float-button`, `${mergedClsPrefix}-float-button--${mergedShape}-shape`, `${mergedClsPrefix}-float-button--${type}-type`, mergedShowMenu && `${mergedClsPrefix}-float-button--show-menu`, themeClass],
      style: [cssVars, inlineStyle],
      onMouseenter: this.Mouseenter,
      onMouseleave: this.handleMouseleave,
      onClick: this.handleClick,
      role: "button"
    }, h("div", {
      class: `${mergedClsPrefix}-float-button__fill`,
      "aria-hidden": true
    }), h("div", {
      class: `${mergedClsPrefix}-float-button__body`
    }, (_a = $slots.default) === null || _a === void 0 ? void 0 : _a.call($slots), resolveWrappedSlot($slots.description, (children) => {
      if (children) {
        return h("div", {
          class: `${mergedClsPrefix}-float-button__description`
        }, children);
      }
      return null;
    })), menuTrigger ? h("div", {
      class: `${mergedClsPrefix}-float-button__close`
    }, h(NBaseIcon, {
      clsPrefix: mergedClsPrefix
    }, {
      default: () => h(ErrorIcon, null)
    })) : null, menuTrigger ? h("div", {
      onClick: (e) => {
        e.stopPropagation();
      },
      "data-float-button-menu": true,
      class: `${mergedClsPrefix}-float-button__menu`
    }, resolveSlot($slots.menu, () => [])) : null);
  }
});
const FolderUpload = IconWrapper("folder-upload", true, function(props) {
  return createVNode("svg", {
    "width": props.size,
    "height": props.size,
    "viewBox": "0 0 48 48",
    "fill": "none"
  }, [createVNode("path", {
    "d": "M5 8C5 6.89543 5.89543 6 7 6H19L24 12H41C42.1046 12 43 12.8954 43 14V40C43 41.1046 42.1046 42 41 42H7C5.89543 42 5 41.1046 5 40V8Z",
    "fill": props.colors[1],
    "stroke": props.colors[0],
    "stroke-width": props.strokeWidth,
    "stroke-linejoin": props.strokeLinejoin
  }, null), createVNode("path", {
    "d": "M30 25.9867L24 20L18 26",
    "stroke": props.colors[2],
    "stroke-width": props.strokeWidth,
    "stroke-linecap": props.strokeLinecap,
    "stroke-linejoin": props.strokeLinejoin
  }, null), createVNode("path", {
    "d": "M24 20V34",
    "stroke": props.colors[2],
    "stroke-width": props.strokeWidth,
    "stroke-linecap": props.strokeLinecap,
    "stroke-linejoin": props.strokeLinejoin
  }, null)]);
});
const History = IconWrapper("history", true, function(props) {
  return createVNode("svg", {
    "width": props.size,
    "height": props.size,
    "viewBox": "0 0 48 48",
    "fill": "none"
  }, [createVNode("path", {
    "d": "M5.81836 6.72729V14H13.0911",
    "stroke": props.colors[0],
    "stroke-width": props.strokeWidth,
    "stroke-linecap": props.strokeLinecap,
    "stroke-linejoin": props.strokeLinejoin
  }, null), createVNode("path", {
    "d": "M4 24C4 35.0457 12.9543 44 24 44V44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C16.598 4 10.1351 8.02111 6.67677 13.9981",
    "stroke": props.colors[0],
    "stroke-width": props.strokeWidth,
    "stroke-linecap": props.strokeLinecap,
    "stroke-linejoin": props.strokeLinejoin
  }, null), createVNode("path", {
    "d": "M24.005 12L24.0038 24.0088L32.4832 32.4882",
    "stroke": props.colors[0],
    "stroke-width": props.strokeWidth,
    "stroke-linecap": props.strokeLinecap,
    "stroke-linejoin": props.strokeLinejoin
  }, null)]);
});
const Share = IconWrapper("share", true, function(props) {
  return createVNode("svg", {
    "width": props.size,
    "height": props.size,
    "viewBox": "0 0 48 48",
    "fill": "none"
  }, [createVNode("path", {
    "d": "M28 6H42V20",
    "stroke": props.colors[0],
    "stroke-width": props.strokeWidth,
    "stroke-linecap": props.strokeLinecap,
    "stroke-linejoin": props.strokeLinejoin
  }, null), createVNode("path", {
    "d": "M42 29.4737V39C42 40.6569 40.6569 42 39 42H9C7.34315 42 6 40.6569 6 39V9C6 7.34315 7.34315 6 9 6L18 6",
    "stroke": props.colors[0],
    "stroke-width": props.strokeWidth,
    "stroke-linecap": props.strokeLinecap,
    "stroke-linejoin": props.strokeLinejoin
  }, null), createVNode("path", {
    "d": "M25.7998 22.1999L41.0998 6.8999",
    "stroke": props.colors[0],
    "stroke-width": props.strokeWidth,
    "stroke-linecap": props.strokeLinecap,
    "stroke-linejoin": props.strokeLinejoin
  }, null)]);
});
function useCommonContextMenu(handle) {
  const dropdown = reactive({
    options: [],
    show: false,
    x: 0,
    y: 0,
    item: {}
  });
  const close = () => {
    dropdown.show = false;
    dropdown.item = {};
  };
  const show = (e, options, item) => {
    dropdown.item = item;
    dropdown.options = [...options];
    dropdown.x = e.clientX;
    dropdown.y = e.clientY;
    dropdown.show = true;
    e.preventDefault();
  };
  const getItem = () => dropdown.item;
  const handleSelect = (key, option) => {
    handle(key, option);
    close();
  };
  const handleClickOutside = () => {
    close();
  };
  const ContextMenuElement = defineComponent({
    name: "ContextMenuElement",
    render() {
      return h(__unplugin_components_2, {
        options: dropdown.options,
        x: dropdown.x,
        y: dropdown.y,
        show: dropdown.show,
        onSelect: handleSelect,
        onClickoutside: handleClickOutside,
        animated: true,
        placement: "right",
        showArrow: true
      });
    }
  });
  return { menu: { close, show, getItem }, ContextMenuElement };
}
export {
  FolderUpload as F,
  History as H,
  Share as S,
  __unplugin_components_4 as _,
  useCommonContextMenu as u
};
