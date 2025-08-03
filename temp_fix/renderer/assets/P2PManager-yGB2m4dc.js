import { t as defineComponent, bC as nextTick, u as h, dl as renderSlot, a1 as ref, dm as c, dn as useSsrAdapter, dp as cssrAnchorMetaName, a2 as onMounted, r as c$1, s as cB, b2 as cE, bM as cNotM, b1 as cM, dq as Wrapper, aM as NTag, F as Fragment, _ as __unplugin_components_3, cI as getTitleAttribute, c1 as render, x as useConfig, c9 as useRtl, y as useTheme, b7 as toRef, dr as internalSelectionLight, z as computed, ah as watch, bt as watchEffect, A as createKey, c6 as getMargin, bb as useThemeClass, bL as fadeInScaleUpTransition, bF as Binder, bG as VTarget, bH as VFollower, bN as useAdjustedTo, br as Transition, P as withDirectives, Q as vShow, bJ as clickoutside, ds as selectLight, b8 as useMergedState, bs as useCompitable, bO as useFormItem, bQ as isMounted, bI as getPreciseEventTarget, bR as markEventEffectPerformed, bf as call, b3 as resolveSlot, b4 as NBaseIcon, dt as paginationLight, b0 as createInjectionKey, c8 as depx, b9 as formatLength, ba as inject, du as useMergedClsPrefix, dv as ellipsisLight, dw as onDeactivated, v as mergeProps, dx as useStyle, dy as get$1, c2 as NIconSwitchTransition, bq as NBaseLoading, aW as Scrollbar, aa as Button, bd as onBeforeUnmount, be as off, bc as on, B as pxfy, bi as VResizeObserver, bj as useMemo, dz as cssrAnchorMetaName$1, a3 as onUnmounted, w as repeat, bT as warn, dA as configProviderInjectionKey, dB as insideModal, dC as insidePopover, c5 as iconSwitchTransition, bo as beforeNextFrameOnce, dD as dataTableLight, bk as provide, dE as createId, bl as flatten$1, bm as getSlot, dF as descriptionsLight, aX as getToken, dj as setToken, dG as deleteToken, b_ as useMessage, dH as useP2PStore, L as createElementBlock, a5 as createBlock, a8 as createCommentVNode, H as createVNode, T as withCtx, O as unref, bw as __unplugin_components_2$3, a6 as __unplugin_components_3$2, U as openBlock, V as createTextVNode, M as createBaseVNode, a7 as __unplugin_components_1$2, dI as NText, R as toDisplayString, W as _export_sfc } from "./index-CP-MMhae.js";
import { _ as __unplugin_components_1$1, N as NCheckboxGroup } from "./Checkbox-B683huVH.js";
import { a as __unplugin_components_0, _ as __unplugin_components_2$1 } from "./RadioGroup-SjOLBydD.js";
import { N as NTooltip } from "./Tooltip-BadUcq2V.js";
import { c as createTreeMate, h as happensIn, C as ChevronRightIcon, _ as __unplugin_components_2$2 } from "./Dropdown-BaOl703U.js";
import { N as NBaseSuffix, _ as __unplugin_components_1, C as ChevronDownIcon } from "./Input-9scKSWkl.js";
import { V as VVirtualList } from "./VirtualList-B9WzfpoZ.js";
import { N as NEmpty } from "./Empty-DXO3k6Nm.js";
import { u as useOnResize, N as NInternalSelectMenu, p as patternMatched, f as filterOptions, c as createTmOptions, a as createValOptMap, _ as __unplugin_components_2 } from "./Popselect-t8R6dlXg.js";
import { u as useLocale } from "./use-locale-sP6dOhdq.js";
import { a as ForwardIcon, B as BackwardIcon, b as FastForwardIcon, F as FastBackwardIcon } from "./Forward-4PkzUOWo.js";
import { d as download } from "./download-DwbQunhL.js";
import { N as NAlert } from "./Alert-DLBfJ5gj.js";
import { _ as __unplugin_components_3$1, N as NTabPane } from "./Tabs-Bo9TWhMD.js";
import { a as __unplugin_components_7, _ as __unplugin_components_3$3 } from "./FormItem-BYV9eAmm.js";
import "./FocusDetector-ChBbaXut.js";
const hiddenAttr = "v-hidden";
const style$6 = c("[v-hidden]", {
  display: "none!important"
});
const VOverflow = defineComponent({
  name: "Overflow",
  props: {
    getCounter: Function,
    getTail: Function,
    updateCounter: Function,
    onUpdateCount: Function,
    onUpdateOverflow: Function
  },
  setup(props, { slots }) {
    const selfRef = ref(null);
    const counterRef = ref(null);
    function deriveCounter(options) {
      const { value: self2 } = selfRef;
      const { getCounter, getTail } = props;
      let counter;
      if (getCounter !== void 0)
        counter = getCounter();
      else {
        counter = counterRef.value;
      }
      if (!self2 || !counter)
        return;
      if (counter.hasAttribute(hiddenAttr)) {
        counter.removeAttribute(hiddenAttr);
      }
      const { children } = self2;
      if (options.showAllItemsBeforeCalculate) {
        for (const child of children) {
          if (child.hasAttribute(hiddenAttr)) {
            child.removeAttribute(hiddenAttr);
          }
        }
      }
      const containerWidth = self2.offsetWidth;
      const childWidths = [];
      const tail = slots.tail ? getTail === null || getTail === void 0 ? void 0 : getTail() : null;
      let childWidthSum = tail ? tail.offsetWidth : 0;
      let overflow = false;
      const len = self2.children.length - (slots.tail ? 1 : 0);
      for (let i = 0; i < len - 1; ++i) {
        if (i < 0)
          continue;
        const child = children[i];
        if (overflow) {
          if (!child.hasAttribute(hiddenAttr)) {
            child.setAttribute(hiddenAttr, "");
          }
          continue;
        } else if (child.hasAttribute(hiddenAttr)) {
          child.removeAttribute(hiddenAttr);
        }
        const childWidth = child.offsetWidth;
        childWidthSum += childWidth;
        childWidths[i] = childWidth;
        if (childWidthSum > containerWidth) {
          const { updateCounter } = props;
          for (let j = i; j >= 0; --j) {
            const restCount = len - 1 - j;
            if (updateCounter !== void 0) {
              updateCounter(restCount);
            } else {
              counter.textContent = `${restCount}`;
            }
            const counterWidth = counter.offsetWidth;
            childWidthSum -= childWidths[j];
            if (childWidthSum + counterWidth <= containerWidth || j === 0) {
              overflow = true;
              i = j - 1;
              if (tail) {
                if (i === -1) {
                  tail.style.maxWidth = `${containerWidth - counterWidth}px`;
                  tail.style.boxSizing = "border-box";
                } else {
                  tail.style.maxWidth = "";
                }
              }
              const { onUpdateCount } = props;
              if (onUpdateCount)
                onUpdateCount(restCount);
              break;
            }
          }
        }
      }
      const { onUpdateOverflow } = props;
      if (!overflow) {
        if (onUpdateOverflow !== void 0) {
          onUpdateOverflow(false);
        }
        counter.setAttribute(hiddenAttr, "");
      } else {
        if (onUpdateOverflow !== void 0) {
          onUpdateOverflow(true);
        }
      }
    }
    const ssrAdapter = useSsrAdapter();
    style$6.mount({
      id: "vueuc/overflow",
      head: true,
      anchorMetaName: cssrAnchorMetaName,
      ssr: ssrAdapter
    });
    onMounted(() => deriveCounter({
      showAllItemsBeforeCalculate: false
    }));
    return {
      selfRef,
      counterRef,
      sync: deriveCounter
    };
  },
  render() {
    const { $slots } = this;
    nextTick(() => this.sync({
      showAllItemsBeforeCalculate: false
    }));
    return h("div", {
      class: "v-overflow",
      ref: "selfRef"
    }, [
      renderSlot($slots, "default"),
      // $slots.counter should only has 1 element
      $slots.counter ? $slots.counter() : h("span", {
        style: {
          display: "inline-block"
        },
        ref: "counterRef"
      }),
      // $slots.tail should only has 1 element
      $slots.tail ? $slots.tail() : null
    ]);
  }
});
function smallerSize(size) {
  switch (size) {
    case "tiny":
      return "mini";
    case "small":
      return "tiny";
    case "medium":
      return "small";
    case "large":
      return "medium";
    case "huge":
      return "large";
  }
  throw new Error(`${size} has no smaller size.`);
}
function getVNodeChildren(vNode, slotName = "default", fallback = []) {
  const {
    children
  } = vNode;
  if (children !== null && typeof children === "object" && !Array.isArray(children)) {
    const slot = children[slotName];
    if (typeof slot === "function") {
      return slot();
    }
  }
  return fallback;
}
const ArrowDownIcon = defineComponent({
  name: "ArrowDown",
  render() {
    return h("svg", {
      viewBox: "0 0 28 28",
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg"
    }, h("g", {
      stroke: "none",
      "stroke-width": "1",
      "fill-rule": "evenodd"
    }, h("g", {
      "fill-rule": "nonzero"
    }, h("path", {
      d: "M23.7916,15.2664 C24.0788,14.9679 24.0696,14.4931 23.7711,14.206 C23.4726,13.9188 22.9978,13.928 22.7106,14.2265 L14.7511,22.5007 L14.7511,3.74792 C14.7511,3.33371 14.4153,2.99792 14.0011,2.99792 C13.5869,2.99792 13.2511,3.33371 13.2511,3.74793 L13.2511,22.4998 L5.29259,14.2265 C5.00543,13.928 4.53064,13.9188 4.23213,14.206 C3.93361,14.4931 3.9244,14.9679 4.21157,15.2664 L13.2809,24.6944 C13.6743,25.1034 14.3289,25.1034 14.7223,24.6944 L23.7916,15.2664 Z"
    }))));
  }
});
const FilterIcon = defineComponent({
  name: "Filter",
  render() {
    return h("svg", {
      viewBox: "0 0 28 28",
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg"
    }, h("g", {
      stroke: "none",
      "stroke-width": "1",
      "fill-rule": "evenodd"
    }, h("g", {
      "fill-rule": "nonzero"
    }, h("path", {
      d: "M17,19 C17.5522847,19 18,19.4477153 18,20 C18,20.5522847 17.5522847,21 17,21 L11,21 C10.4477153,21 10,20.5522847 10,20 C10,19.4477153 10.4477153,19 11,19 L17,19 Z M21,13 C21.5522847,13 22,13.4477153 22,14 C22,14.5522847 21.5522847,15 21,15 L7,15 C6.44771525,15 6,14.5522847 6,14 C6,13.4477153 6.44771525,13 7,13 L21,13 Z M24,7 C24.5522847,7 25,7.44771525 25,8 C25,8.55228475 24.5522847,9 24,9 L4,9 C3.44771525,9 3,8.55228475 3,8 C3,7.44771525 3.44771525,7 4,7 L24,7 Z"
    }))));
  }
});
const MoreIcon = defineComponent({
  name: "More",
  render() {
    return h("svg", {
      viewBox: "0 0 16 16",
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg"
    }, h("g", {
      stroke: "none",
      "stroke-width": "1",
      fill: "none",
      "fill-rule": "evenodd"
    }, h("g", {
      fill: "currentColor",
      "fill-rule": "nonzero"
    }, h("path", {
      d: "M4,7 C4.55228,7 5,7.44772 5,8 C5,8.55229 4.55228,9 4,9 C3.44772,9 3,8.55229 3,8 C3,7.44772 3.44772,7 4,7 Z M8,7 C8.55229,7 9,7.44772 9,8 C9,8.55229 8.55229,9 8,9 C7.44772,9 7,8.55229 7,8 C7,7.44772 7.44772,7 8,7 Z M12,7 C12.5523,7 13,7.44772 13,8 C13,8.55229 12.5523,9 12,9 C11.4477,9 11,8.55229 11,8 C11,7.44772 11.4477,7 12,7 Z"
    }))));
  }
});
const style$5 = c$1([cB("base-selection", `
 --n-padding-single: var(--n-padding-single-top) var(--n-padding-single-right) var(--n-padding-single-bottom) var(--n-padding-single-left);
 --n-padding-multiple: var(--n-padding-multiple-top) var(--n-padding-multiple-right) var(--n-padding-multiple-bottom) var(--n-padding-multiple-left);
 position: relative;
 z-index: auto;
 box-shadow: none;
 width: 100%;
 max-width: 100%;
 display: inline-block;
 vertical-align: bottom;
 border-radius: var(--n-border-radius);
 min-height: var(--n-height);
 line-height: 1.5;
 font-size: var(--n-font-size);
 `, [cB("base-loading", `
 color: var(--n-loading-color);
 `), cB("base-selection-tags", "min-height: var(--n-height);"), cE("border, state-border", `
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 pointer-events: none;
 border: var(--n-border);
 border-radius: inherit;
 transition:
 box-shadow .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `), cE("state-border", `
 z-index: 1;
 border-color: #0000;
 `), cB("base-suffix", `
 cursor: pointer;
 position: absolute;
 top: 50%;
 transform: translateY(-50%);
 right: 10px;
 `, [cE("arrow", `
 font-size: var(--n-arrow-size);
 color: var(--n-arrow-color);
 transition: color .3s var(--n-bezier);
 `)]), cB("base-selection-overlay", `
 display: flex;
 align-items: center;
 white-space: nowrap;
 pointer-events: none;
 position: absolute;
 top: 0;
 right: 0;
 bottom: 0;
 left: 0;
 padding: var(--n-padding-single);
 transition: color .3s var(--n-bezier);
 `, [cE("wrapper", `
 flex-basis: 0;
 flex-grow: 1;
 overflow: hidden;
 text-overflow: ellipsis;
 `)]), cB("base-selection-placeholder", `
 color: var(--n-placeholder-color);
 `, [cE("inner", `
 max-width: 100%;
 overflow: hidden;
 `)]), cB("base-selection-tags", `
 cursor: pointer;
 outline: none;
 box-sizing: border-box;
 position: relative;
 z-index: auto;
 display: flex;
 padding: var(--n-padding-multiple);
 flex-wrap: wrap;
 align-items: center;
 width: 100%;
 vertical-align: bottom;
 background-color: var(--n-color);
 border-radius: inherit;
 transition:
 color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `), cB("base-selection-label", `
 height: var(--n-height);
 display: inline-flex;
 width: 100%;
 vertical-align: bottom;
 cursor: pointer;
 outline: none;
 z-index: auto;
 box-sizing: border-box;
 position: relative;
 transition:
 color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 border-radius: inherit;
 background-color: var(--n-color);
 align-items: center;
 `, [cB("base-selection-input", `
 font-size: inherit;
 line-height: inherit;
 outline: none;
 cursor: pointer;
 box-sizing: border-box;
 border:none;
 width: 100%;
 padding: var(--n-padding-single);
 background-color: #0000;
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 caret-color: var(--n-caret-color);
 `, [cE("content", `
 text-overflow: ellipsis;
 overflow: hidden;
 white-space: nowrap; 
 `)]), cE("render-label", `
 color: var(--n-text-color);
 `)]), cNotM("disabled", [c$1("&:hover", [cE("state-border", `
 box-shadow: var(--n-box-shadow-hover);
 border: var(--n-border-hover);
 `)]), cM("focus", [cE("state-border", `
 box-shadow: var(--n-box-shadow-focus);
 border: var(--n-border-focus);
 `)]), cM("active", [cE("state-border", `
 box-shadow: var(--n-box-shadow-active);
 border: var(--n-border-active);
 `), cB("base-selection-label", "background-color: var(--n-color-active);"), cB("base-selection-tags", "background-color: var(--n-color-active);")])]), cM("disabled", "cursor: not-allowed;", [cE("arrow", `
 color: var(--n-arrow-color-disabled);
 `), cB("base-selection-label", `
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `, [cB("base-selection-input", `
 cursor: not-allowed;
 color: var(--n-text-color-disabled);
 `), cE("render-label", `
 color: var(--n-text-color-disabled);
 `)]), cB("base-selection-tags", `
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `), cB("base-selection-placeholder", `
 cursor: not-allowed;
 color: var(--n-placeholder-color-disabled);
 `)]), cB("base-selection-input-tag", `
 height: calc(var(--n-height) - 6px);
 line-height: calc(var(--n-height) - 6px);
 outline: none;
 display: none;
 position: relative;
 margin-bottom: 3px;
 max-width: 100%;
 vertical-align: bottom;
 `, [cE("input", `
 font-size: inherit;
 font-family: inherit;
 min-width: 1px;
 padding: 0;
 background-color: #0000;
 outline: none;
 border: none;
 max-width: 100%;
 overflow: hidden;
 width: 1em;
 line-height: inherit;
 cursor: pointer;
 color: var(--n-text-color);
 caret-color: var(--n-caret-color);
 `), cE("mirror", `
 position: absolute;
 left: 0;
 top: 0;
 white-space: pre;
 visibility: hidden;
 user-select: none;
 -webkit-user-select: none;
 opacity: 0;
 `)]), ["warning", "error"].map((status) => cM(`${status}-status`, [cE("state-border", `border: var(--n-border-${status});`), cNotM("disabled", [c$1("&:hover", [cE("state-border", `
 box-shadow: var(--n-box-shadow-hover-${status});
 border: var(--n-border-hover-${status});
 `)]), cM("active", [cE("state-border", `
 box-shadow: var(--n-box-shadow-active-${status});
 border: var(--n-border-active-${status});
 `), cB("base-selection-label", `background-color: var(--n-color-active-${status});`), cB("base-selection-tags", `background-color: var(--n-color-active-${status});`)]), cM("focus", [cE("state-border", `
 box-shadow: var(--n-box-shadow-focus-${status});
 border: var(--n-border-focus-${status});
 `)])])]))]), cB("base-selection-popover", `
 margin-bottom: -3px;
 display: flex;
 flex-wrap: wrap;
 margin-right: -8px;
 `), cB("base-selection-tag-wrapper", `
 max-width: 100%;
 display: inline-flex;
 padding: 0 7px 3px 0;
 `, [c$1("&:last-child", "padding-right: 0;"), cB("tag", `
 font-size: 14px;
 max-width: 100%;
 `, [cE("content", `
 line-height: 1.25;
 text-overflow: ellipsis;
 overflow: hidden;
 `)])])]);
const NInternalSelection = defineComponent({
  name: "InternalSelection",
  props: Object.assign(Object.assign({}, useTheme.props), {
    clsPrefix: {
      type: String,
      required: true
    },
    bordered: {
      type: Boolean,
      default: void 0
    },
    active: Boolean,
    pattern: {
      type: String,
      default: ""
    },
    placeholder: String,
    selectedOption: {
      type: Object,
      default: null
    },
    selectedOptions: {
      type: Array,
      default: null
    },
    labelField: {
      type: String,
      default: "label"
    },
    valueField: {
      type: String,
      default: "value"
    },
    multiple: Boolean,
    filterable: Boolean,
    clearable: Boolean,
    disabled: Boolean,
    size: {
      type: String,
      default: "medium"
    },
    loading: Boolean,
    autofocus: Boolean,
    showArrow: {
      type: Boolean,
      default: true
    },
    inputProps: Object,
    focused: Boolean,
    renderTag: Function,
    onKeydown: Function,
    onClick: Function,
    onBlur: Function,
    onFocus: Function,
    onDeleteOption: Function,
    maxTagCount: [String, Number],
    ellipsisTagPopoverProps: Object,
    onClear: Function,
    onPatternInput: Function,
    onPatternFocus: Function,
    onPatternBlur: Function,
    renderLabel: Function,
    status: String,
    inlineThemeDisabled: Boolean,
    ignoreComposition: {
      type: Boolean,
      default: true
    },
    onResize: Function
  }),
  setup(props) {
    const {
      mergedClsPrefixRef,
      mergedRtlRef
    } = useConfig(props);
    const rtlEnabledRef = useRtl("InternalSelection", mergedRtlRef, mergedClsPrefixRef);
    const patternInputMirrorRef = ref(null);
    const patternInputRef = ref(null);
    const selfRef = ref(null);
    const multipleElRef = ref(null);
    const singleElRef = ref(null);
    const patternInputWrapperRef = ref(null);
    const counterRef = ref(null);
    const counterWrapperRef = ref(null);
    const overflowRef = ref(null);
    const inputTagElRef = ref(null);
    const showTagsPopoverRef = ref(false);
    const patternInputFocusedRef = ref(false);
    const hoverRef = ref(false);
    const themeRef = useTheme("InternalSelection", "-internal-selection", style$5, internalSelectionLight, props, toRef(props, "clsPrefix"));
    const mergedClearableRef = computed(() => {
      return props.clearable && !props.disabled && (hoverRef.value || props.active);
    });
    const filterablePlaceholderRef = computed(() => {
      return props.selectedOption ? props.renderTag ? props.renderTag({
        option: props.selectedOption,
        handleClose: () => {
        }
      }) : props.renderLabel ? props.renderLabel(props.selectedOption, true) : render(props.selectedOption[props.labelField], props.selectedOption, true) : props.placeholder;
    });
    const labelRef = computed(() => {
      const option = props.selectedOption;
      if (!option) return void 0;
      return option[props.labelField];
    });
    const selectedRef = computed(() => {
      if (props.multiple) {
        return !!(Array.isArray(props.selectedOptions) && props.selectedOptions.length);
      } else {
        return props.selectedOption !== null;
      }
    });
    function syncMirrorWidth() {
      var _a;
      const {
        value: patternInputMirrorEl
      } = patternInputMirrorRef;
      if (patternInputMirrorEl) {
        const {
          value: patternInputEl
        } = patternInputRef;
        if (patternInputEl) {
          patternInputEl.style.width = `${patternInputMirrorEl.offsetWidth}px`;
          if (props.maxTagCount !== "responsive") {
            (_a = overflowRef.value) === null || _a === void 0 ? void 0 : _a.sync({
              showAllItemsBeforeCalculate: false
            });
          }
        }
      }
    }
    function hideInputTag() {
      const {
        value: inputTagEl
      } = inputTagElRef;
      if (inputTagEl) inputTagEl.style.display = "none";
    }
    function showInputTag() {
      const {
        value: inputTagEl
      } = inputTagElRef;
      if (inputTagEl) inputTagEl.style.display = "inline-block";
    }
    watch(toRef(props, "active"), (value) => {
      if (!value) hideInputTag();
    });
    watch(toRef(props, "pattern"), () => {
      if (props.multiple) {
        void nextTick(syncMirrorWidth);
      }
    });
    function doFocus(e) {
      const {
        onFocus
      } = props;
      if (onFocus) onFocus(e);
    }
    function doBlur(e) {
      const {
        onBlur
      } = props;
      if (onBlur) onBlur(e);
    }
    function doDeleteOption(value) {
      const {
        onDeleteOption
      } = props;
      if (onDeleteOption) onDeleteOption(value);
    }
    function doClear(e) {
      const {
        onClear
      } = props;
      if (onClear) onClear(e);
    }
    function doPatternInput(value) {
      const {
        onPatternInput
      } = props;
      if (onPatternInput) onPatternInput(value);
    }
    function handleFocusin(e) {
      var _a;
      if (!e.relatedTarget || !((_a = selfRef.value) === null || _a === void 0 ? void 0 : _a.contains(e.relatedTarget))) {
        doFocus(e);
      }
    }
    function handleFocusout(e) {
      var _a;
      if ((_a = selfRef.value) === null || _a === void 0 ? void 0 : _a.contains(e.relatedTarget)) return;
      doBlur(e);
    }
    function handleClear(e) {
      doClear(e);
    }
    function handleMouseEnter() {
      hoverRef.value = true;
    }
    function handleMouseLeave() {
      hoverRef.value = false;
    }
    function handleMouseDown(e) {
      if (!props.active || !props.filterable) return;
      if (e.target === patternInputRef.value) return;
      e.preventDefault();
    }
    function handleDeleteOption(option) {
      doDeleteOption(option);
    }
    const isComposingRef = ref(false);
    function handlePatternKeyDown(e) {
      if (e.key === "Backspace" && !isComposingRef.value) {
        if (!props.pattern.length) {
          const {
            selectedOptions
          } = props;
          if (selectedOptions === null || selectedOptions === void 0 ? void 0 : selectedOptions.length) {
            handleDeleteOption(selectedOptions[selectedOptions.length - 1]);
          }
        }
      }
    }
    let cachedInputEvent = null;
    function handlePatternInputInput(e) {
      const {
        value: patternInputMirrorEl
      } = patternInputMirrorRef;
      if (patternInputMirrorEl) {
        const inputText = e.target.value;
        patternInputMirrorEl.textContent = inputText;
        syncMirrorWidth();
      }
      if (props.ignoreComposition) {
        if (!isComposingRef.value) {
          doPatternInput(e);
        } else {
          cachedInputEvent = e;
        }
      } else {
        doPatternInput(e);
      }
    }
    function handleCompositionStart() {
      isComposingRef.value = true;
    }
    function handleCompositionEnd() {
      isComposingRef.value = false;
      if (props.ignoreComposition) {
        doPatternInput(cachedInputEvent);
      }
      cachedInputEvent = null;
    }
    function handlePatternInputFocus(e) {
      var _a;
      patternInputFocusedRef.value = true;
      (_a = props.onPatternFocus) === null || _a === void 0 ? void 0 : _a.call(props, e);
    }
    function handlePatternInputBlur(e) {
      var _a;
      patternInputFocusedRef.value = false;
      (_a = props.onPatternBlur) === null || _a === void 0 ? void 0 : _a.call(props, e);
    }
    function blur() {
      var _a, _b;
      if (props.filterable) {
        patternInputFocusedRef.value = false;
        (_a = patternInputWrapperRef.value) === null || _a === void 0 ? void 0 : _a.blur();
        (_b = patternInputRef.value) === null || _b === void 0 ? void 0 : _b.blur();
      } else if (props.multiple) {
        const {
          value: multipleEl
        } = multipleElRef;
        multipleEl === null || multipleEl === void 0 ? void 0 : multipleEl.blur();
      } else {
        const {
          value: singleEl
        } = singleElRef;
        singleEl === null || singleEl === void 0 ? void 0 : singleEl.blur();
      }
    }
    function focus() {
      var _a, _b, _c;
      if (props.filterable) {
        patternInputFocusedRef.value = false;
        (_a = patternInputWrapperRef.value) === null || _a === void 0 ? void 0 : _a.focus();
      } else if (props.multiple) {
        (_b = multipleElRef.value) === null || _b === void 0 ? void 0 : _b.focus();
      } else {
        (_c = singleElRef.value) === null || _c === void 0 ? void 0 : _c.focus();
      }
    }
    function focusInput() {
      const {
        value: patternInputEl
      } = patternInputRef;
      if (patternInputEl) {
        showInputTag();
        patternInputEl.focus();
      }
    }
    function blurInput() {
      const {
        value: patternInputEl
      } = patternInputRef;
      if (patternInputEl) {
        patternInputEl.blur();
      }
    }
    function updateCounter(count) {
      const {
        value
      } = counterRef;
      if (value) {
        value.setTextContent(`+${count}`);
      }
    }
    function getCounter() {
      const {
        value
      } = counterWrapperRef;
      return value;
    }
    function getTail() {
      return patternInputRef.value;
    }
    let enterTimerId = null;
    function clearEnterTimer() {
      if (enterTimerId !== null) window.clearTimeout(enterTimerId);
    }
    function handleMouseEnterCounter() {
      if (props.active) return;
      clearEnterTimer();
      enterTimerId = window.setTimeout(() => {
        if (selectedRef.value) {
          showTagsPopoverRef.value = true;
        }
      }, 100);
    }
    function handleMouseLeaveCounter() {
      clearEnterTimer();
    }
    function onPopoverUpdateShow(show) {
      if (!show) {
        clearEnterTimer();
        showTagsPopoverRef.value = false;
      }
    }
    watch(selectedRef, (value) => {
      if (!value) {
        showTagsPopoverRef.value = false;
      }
    });
    onMounted(() => {
      watchEffect(() => {
        const patternInputWrapperEl = patternInputWrapperRef.value;
        if (!patternInputWrapperEl) return;
        if (props.disabled) {
          patternInputWrapperEl.removeAttribute("tabindex");
        } else {
          patternInputWrapperEl.tabIndex = patternInputFocusedRef.value ? -1 : 0;
        }
      });
    });
    useOnResize(selfRef, props.onResize);
    const {
      inlineThemeDisabled
    } = props;
    const cssVarsRef = computed(() => {
      const {
        size
      } = props;
      const {
        common: {
          cubicBezierEaseInOut
        },
        self: {
          fontWeight,
          borderRadius,
          color,
          placeholderColor,
          textColor,
          paddingSingle,
          paddingMultiple,
          caretColor,
          colorDisabled,
          textColorDisabled,
          placeholderColorDisabled,
          colorActive,
          boxShadowFocus,
          boxShadowActive,
          boxShadowHover,
          border,
          borderFocus,
          borderHover,
          borderActive,
          arrowColor,
          arrowColorDisabled,
          loadingColor,
          // form warning
          colorActiveWarning,
          boxShadowFocusWarning,
          boxShadowActiveWarning,
          boxShadowHoverWarning,
          borderWarning,
          borderFocusWarning,
          borderHoverWarning,
          borderActiveWarning,
          // form error
          colorActiveError,
          boxShadowFocusError,
          boxShadowActiveError,
          boxShadowHoverError,
          borderError,
          borderFocusError,
          borderHoverError,
          borderActiveError,
          // clear
          clearColor,
          clearColorHover,
          clearColorPressed,
          clearSize,
          // arrow
          arrowSize,
          [createKey("height", size)]: height,
          [createKey("fontSize", size)]: fontSize
        }
      } = themeRef.value;
      const paddingSingleDiscrete = getMargin(paddingSingle);
      const paddingMultipleDiscrete = getMargin(paddingMultiple);
      return {
        "--n-bezier": cubicBezierEaseInOut,
        "--n-border": border,
        "--n-border-active": borderActive,
        "--n-border-focus": borderFocus,
        "--n-border-hover": borderHover,
        "--n-border-radius": borderRadius,
        "--n-box-shadow-active": boxShadowActive,
        "--n-box-shadow-focus": boxShadowFocus,
        "--n-box-shadow-hover": boxShadowHover,
        "--n-caret-color": caretColor,
        "--n-color": color,
        "--n-color-active": colorActive,
        "--n-color-disabled": colorDisabled,
        "--n-font-size": fontSize,
        "--n-height": height,
        "--n-padding-single-top": paddingSingleDiscrete.top,
        "--n-padding-multiple-top": paddingMultipleDiscrete.top,
        "--n-padding-single-right": paddingSingleDiscrete.right,
        "--n-padding-multiple-right": paddingMultipleDiscrete.right,
        "--n-padding-single-left": paddingSingleDiscrete.left,
        "--n-padding-multiple-left": paddingMultipleDiscrete.left,
        "--n-padding-single-bottom": paddingSingleDiscrete.bottom,
        "--n-padding-multiple-bottom": paddingMultipleDiscrete.bottom,
        "--n-placeholder-color": placeholderColor,
        "--n-placeholder-color-disabled": placeholderColorDisabled,
        "--n-text-color": textColor,
        "--n-text-color-disabled": textColorDisabled,
        "--n-arrow-color": arrowColor,
        "--n-arrow-color-disabled": arrowColorDisabled,
        "--n-loading-color": loadingColor,
        // form warning
        "--n-color-active-warning": colorActiveWarning,
        "--n-box-shadow-focus-warning": boxShadowFocusWarning,
        "--n-box-shadow-active-warning": boxShadowActiveWarning,
        "--n-box-shadow-hover-warning": boxShadowHoverWarning,
        "--n-border-warning": borderWarning,
        "--n-border-focus-warning": borderFocusWarning,
        "--n-border-hover-warning": borderHoverWarning,
        "--n-border-active-warning": borderActiveWarning,
        // form error
        "--n-color-active-error": colorActiveError,
        "--n-box-shadow-focus-error": boxShadowFocusError,
        "--n-box-shadow-active-error": boxShadowActiveError,
        "--n-box-shadow-hover-error": boxShadowHoverError,
        "--n-border-error": borderError,
        "--n-border-focus-error": borderFocusError,
        "--n-border-hover-error": borderHoverError,
        "--n-border-active-error": borderActiveError,
        // clear
        "--n-clear-size": clearSize,
        "--n-clear-color": clearColor,
        "--n-clear-color-hover": clearColorHover,
        "--n-clear-color-pressed": clearColorPressed,
        // arrow-size
        "--n-arrow-size": arrowSize,
        // font-weight
        "--n-font-weight": fontWeight
      };
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass("internal-selection", computed(() => {
      return props.size[0];
    }), cssVarsRef, props) : void 0;
    return {
      mergedTheme: themeRef,
      mergedClearable: mergedClearableRef,
      mergedClsPrefix: mergedClsPrefixRef,
      rtlEnabled: rtlEnabledRef,
      patternInputFocused: patternInputFocusedRef,
      filterablePlaceholder: filterablePlaceholderRef,
      label: labelRef,
      selected: selectedRef,
      showTagsPanel: showTagsPopoverRef,
      isComposing: isComposingRef,
      // dom ref
      counterRef,
      counterWrapperRef,
      patternInputMirrorRef,
      patternInputRef,
      selfRef,
      multipleElRef,
      singleElRef,
      patternInputWrapperRef,
      overflowRef,
      inputTagElRef,
      handleMouseDown,
      handleFocusin,
      handleClear,
      handleMouseEnter,
      handleMouseLeave,
      handleDeleteOption,
      handlePatternKeyDown,
      handlePatternInputInput,
      handlePatternInputBlur,
      handlePatternInputFocus,
      handleMouseEnterCounter,
      handleMouseLeaveCounter,
      handleFocusout,
      handleCompositionEnd,
      handleCompositionStart,
      onPopoverUpdateShow,
      focus,
      focusInput,
      blur,
      blurInput,
      updateCounter,
      getCounter,
      getTail,
      renderLabel: props.renderLabel,
      cssVars: inlineThemeDisabled ? void 0 : cssVarsRef,
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
    };
  },
  render() {
    const {
      status,
      multiple,
      size,
      disabled,
      filterable,
      maxTagCount,
      bordered,
      clsPrefix,
      ellipsisTagPopoverProps,
      onRender,
      renderTag,
      renderLabel
    } = this;
    onRender === null || onRender === void 0 ? void 0 : onRender();
    const maxTagCountResponsive = maxTagCount === "responsive";
    const maxTagCountNumeric = typeof maxTagCount === "number";
    const useMaxTagCount = maxTagCountResponsive || maxTagCountNumeric;
    const suffix = h(Wrapper, null, {
      default: () => h(NBaseSuffix, {
        clsPrefix,
        loading: this.loading,
        showArrow: this.showArrow,
        showClear: this.mergedClearable && this.selected,
        onClear: this.handleClear
      }, {
        default: () => {
          var _a, _b;
          return (_b = (_a = this.$slots).arrow) === null || _b === void 0 ? void 0 : _b.call(_a);
        }
      })
    });
    let body;
    if (multiple) {
      const {
        labelField
      } = this;
      const createTag = (option) => h("div", {
        class: `${clsPrefix}-base-selection-tag-wrapper`,
        key: option.value
      }, renderTag ? renderTag({
        option,
        handleClose: () => {
          this.handleDeleteOption(option);
        }
      }) : h(NTag, {
        size,
        closable: !option.disabled,
        disabled,
        onClose: () => {
          this.handleDeleteOption(option);
        },
        internalCloseIsButtonTag: false,
        internalCloseFocusable: false
      }, {
        default: () => renderLabel ? renderLabel(option, true) : render(option[labelField], option, true)
      }));
      const createOriginalTagNodes = () => (maxTagCountNumeric ? this.selectedOptions.slice(0, maxTagCount) : this.selectedOptions).map(createTag);
      const input = filterable ? h("div", {
        class: `${clsPrefix}-base-selection-input-tag`,
        ref: "inputTagElRef",
        key: "__input-tag__"
      }, h("input", Object.assign({}, this.inputProps, {
        ref: "patternInputRef",
        tabindex: -1,
        disabled,
        value: this.pattern,
        autofocus: this.autofocus,
        class: `${clsPrefix}-base-selection-input-tag__input`,
        onBlur: this.handlePatternInputBlur,
        onFocus: this.handlePatternInputFocus,
        onKeydown: this.handlePatternKeyDown,
        onInput: this.handlePatternInputInput,
        onCompositionstart: this.handleCompositionStart,
        onCompositionend: this.handleCompositionEnd
      })), h("span", {
        ref: "patternInputMirrorRef",
        class: `${clsPrefix}-base-selection-input-tag__mirror`
      }, this.pattern)) : null;
      const renderCounter = maxTagCountResponsive ? () => h("div", {
        class: `${clsPrefix}-base-selection-tag-wrapper`,
        ref: "counterWrapperRef"
      }, h(NTag, {
        size,
        ref: "counterRef",
        onMouseenter: this.handleMouseEnterCounter,
        onMouseleave: this.handleMouseLeaveCounter,
        disabled
      })) : void 0;
      let counter;
      if (maxTagCountNumeric) {
        const rest = this.selectedOptions.length - maxTagCount;
        if (rest > 0) {
          counter = h("div", {
            class: `${clsPrefix}-base-selection-tag-wrapper`,
            key: "__counter__"
          }, h(NTag, {
            size,
            ref: "counterRef",
            onMouseenter: this.handleMouseEnterCounter,
            disabled
          }, {
            default: () => `+${rest}`
          }));
        }
      }
      const tags = maxTagCountResponsive ? filterable ? h(VOverflow, {
        ref: "overflowRef",
        updateCounter: this.updateCounter,
        getCounter: this.getCounter,
        getTail: this.getTail,
        style: {
          width: "100%",
          display: "flex",
          overflow: "hidden"
        }
      }, {
        default: createOriginalTagNodes,
        counter: renderCounter,
        tail: () => input
      }) : h(VOverflow, {
        ref: "overflowRef",
        updateCounter: this.updateCounter,
        getCounter: this.getCounter,
        style: {
          width: "100%",
          display: "flex",
          overflow: "hidden"
        }
      }, {
        default: createOriginalTagNodes,
        counter: renderCounter
      }) : maxTagCountNumeric && counter ? createOriginalTagNodes().concat(counter) : createOriginalTagNodes();
      const renderPopover = useMaxTagCount ? () => h("div", {
        class: `${clsPrefix}-base-selection-popover`
      }, maxTagCountResponsive ? createOriginalTagNodes() : this.selectedOptions.map(createTag)) : void 0;
      const popoverProps = useMaxTagCount ? Object.assign({
        show: this.showTagsPanel,
        trigger: "hover",
        overlap: true,
        placement: "top",
        width: "trigger",
        onUpdateShow: this.onPopoverUpdateShow,
        theme: this.mergedTheme.peers.Popover,
        themeOverrides: this.mergedTheme.peerOverrides.Popover
      }, ellipsisTagPopoverProps) : null;
      const showPlaceholder = this.selected ? false : this.active ? !this.pattern && !this.isComposing : true;
      const placeholder = showPlaceholder ? h("div", {
        class: `${clsPrefix}-base-selection-placeholder ${clsPrefix}-base-selection-overlay`
      }, h("div", {
        class: `${clsPrefix}-base-selection-placeholder__inner`
      }, this.placeholder)) : null;
      const popoverTrigger = filterable ? h("div", {
        ref: "patternInputWrapperRef",
        class: `${clsPrefix}-base-selection-tags`
      }, tags, maxTagCountResponsive ? null : input, suffix) : h("div", {
        ref: "multipleElRef",
        class: `${clsPrefix}-base-selection-tags`,
        tabindex: disabled ? void 0 : 0
      }, tags, suffix);
      body = h(Fragment, null, useMaxTagCount ? h(__unplugin_components_3, Object.assign({}, popoverProps, {
        scrollable: true,
        style: "max-height: calc(var(--v-target-height) * 6.6);"
      }), {
        trigger: () => popoverTrigger,
        default: renderPopover
      }) : popoverTrigger, placeholder);
    } else {
      if (filterable) {
        const hasInput = this.pattern || this.isComposing;
        const showPlaceholder = this.active ? !hasInput : !this.selected;
        const showSelectedLabel = this.active ? false : this.selected;
        body = h("div", {
          ref: "patternInputWrapperRef",
          class: `${clsPrefix}-base-selection-label`,
          title: this.patternInputFocused ? void 0 : getTitleAttribute(this.label)
        }, h("input", Object.assign({}, this.inputProps, {
          ref: "patternInputRef",
          class: `${clsPrefix}-base-selection-input`,
          value: this.active ? this.pattern : "",
          placeholder: "",
          readonly: disabled,
          disabled,
          tabindex: -1,
          autofocus: this.autofocus,
          onFocus: this.handlePatternInputFocus,
          onBlur: this.handlePatternInputBlur,
          onInput: this.handlePatternInputInput,
          onCompositionstart: this.handleCompositionStart,
          onCompositionend: this.handleCompositionEnd
        })), showSelectedLabel ? h("div", {
          class: `${clsPrefix}-base-selection-label__render-label ${clsPrefix}-base-selection-overlay`,
          key: "input"
        }, h("div", {
          class: `${clsPrefix}-base-selection-overlay__wrapper`
        }, renderTag ? renderTag({
          option: this.selectedOption,
          handleClose: () => {
          }
        }) : renderLabel ? renderLabel(this.selectedOption, true) : render(this.label, this.selectedOption, true))) : null, showPlaceholder ? h("div", {
          class: `${clsPrefix}-base-selection-placeholder ${clsPrefix}-base-selection-overlay`,
          key: "placeholder"
        }, h("div", {
          class: `${clsPrefix}-base-selection-overlay__wrapper`
        }, this.filterablePlaceholder)) : null, suffix);
      } else {
        body = h("div", {
          ref: "singleElRef",
          class: `${clsPrefix}-base-selection-label`,
          tabindex: this.disabled ? void 0 : 0
        }, this.label !== void 0 ? h("div", {
          class: `${clsPrefix}-base-selection-input`,
          title: getTitleAttribute(this.label),
          key: "input"
        }, h("div", {
          class: `${clsPrefix}-base-selection-input__content`
        }, renderTag ? renderTag({
          option: this.selectedOption,
          handleClose: () => {
          }
        }) : renderLabel ? renderLabel(this.selectedOption, true) : render(this.label, this.selectedOption, true))) : h("div", {
          class: `${clsPrefix}-base-selection-placeholder ${clsPrefix}-base-selection-overlay`,
          key: "placeholder"
        }, h("div", {
          class: `${clsPrefix}-base-selection-placeholder__inner`
        }, this.placeholder)), suffix);
      }
    }
    return h("div", {
      ref: "selfRef",
      class: [`${clsPrefix}-base-selection`, this.rtlEnabled && `${clsPrefix}-base-selection--rtl`, this.themeClass, status && `${clsPrefix}-base-selection--${status}-status`, {
        [`${clsPrefix}-base-selection--active`]: this.active,
        [`${clsPrefix}-base-selection--selected`]: this.selected || this.active && this.pattern,
        [`${clsPrefix}-base-selection--disabled`]: this.disabled,
        [`${clsPrefix}-base-selection--multiple`]: this.multiple,
        // focus is not controlled by selection itself since it always need
        // to be managed together with menu. provide :focus style will cause
        // many redundant codes.
        [`${clsPrefix}-base-selection--focus`]: this.focused
      }],
      style: this.cssVars,
      onClick: this.onClick,
      onMouseenter: this.handleMouseEnter,
      onMouseleave: this.handleMouseLeave,
      onKeydown: this.onKeydown,
      onFocusin: this.handleFocusin,
      onFocusout: this.handleFocusout,
      onMousedown: this.handleMouseDown
    }, body, bordered ? h("div", {
      class: `${clsPrefix}-base-selection__border`
    }) : null, bordered ? h("div", {
      class: `${clsPrefix}-base-selection__state-border`
    }) : null);
  }
});
const style$4 = c$1([cB("select", `
 z-index: auto;
 outline: none;
 width: 100%;
 position: relative;
 font-weight: var(--n-font-weight);
 `), cB("select-menu", `
 margin: 4px 0;
 box-shadow: var(--n-menu-box-shadow);
 `, [fadeInScaleUpTransition({
  originalTransition: "background-color .3s var(--n-bezier), box-shadow .3s var(--n-bezier)"
})])]);
const selectProps = Object.assign(Object.assign({}, useTheme.props), {
  to: useAdjustedTo.propTo,
  bordered: {
    type: Boolean,
    default: void 0
  },
  clearable: Boolean,
  clearFilterAfterSelect: {
    type: Boolean,
    default: true
  },
  options: {
    type: Array,
    default: () => []
  },
  defaultValue: {
    type: [String, Number, Array],
    default: null
  },
  keyboard: {
    type: Boolean,
    default: true
  },
  value: [String, Number, Array],
  placeholder: String,
  menuProps: Object,
  multiple: Boolean,
  size: String,
  menuSize: {
    type: String
  },
  filterable: Boolean,
  disabled: {
    type: Boolean,
    default: void 0
  },
  remote: Boolean,
  loading: Boolean,
  filter: Function,
  placement: {
    type: String,
    default: "bottom-start"
  },
  widthMode: {
    type: String,
    default: "trigger"
  },
  tag: Boolean,
  onCreate: Function,
  fallbackOption: {
    type: [Function, Boolean],
    default: void 0
  },
  show: {
    type: Boolean,
    default: void 0
  },
  showArrow: {
    type: Boolean,
    default: true
  },
  maxTagCount: [Number, String],
  ellipsisTagPopoverProps: Object,
  consistentMenuWidth: {
    type: Boolean,
    default: true
  },
  virtualScroll: {
    type: Boolean,
    default: true
  },
  labelField: {
    type: String,
    default: "label"
  },
  valueField: {
    type: String,
    default: "value"
  },
  childrenField: {
    type: String,
    default: "children"
  },
  renderLabel: Function,
  renderOption: Function,
  renderTag: Function,
  "onUpdate:value": [Function, Array],
  inputProps: Object,
  nodeProps: Function,
  ignoreComposition: {
    type: Boolean,
    default: true
  },
  showOnFocus: Boolean,
  // for jsx
  onUpdateValue: [Function, Array],
  onBlur: [Function, Array],
  onClear: [Function, Array],
  onFocus: [Function, Array],
  onScroll: [Function, Array],
  onSearch: [Function, Array],
  onUpdateShow: [Function, Array],
  "onUpdate:show": [Function, Array],
  displayDirective: {
    type: String,
    default: "show"
  },
  resetMenuOnOptionsChange: {
    type: Boolean,
    default: true
  },
  status: String,
  showCheckmark: {
    type: Boolean,
    default: true
  },
  /** deprecated */
  onChange: [Function, Array],
  items: Array
});
const NSelect = defineComponent({
  name: "Select",
  props: selectProps,
  slots: Object,
  setup(props) {
    const {
      mergedClsPrefixRef,
      mergedBorderedRef,
      namespaceRef,
      inlineThemeDisabled
    } = useConfig(props);
    const themeRef = useTheme("Select", "-select", style$4, selectLight, props, mergedClsPrefixRef);
    const uncontrolledValueRef = ref(props.defaultValue);
    const controlledValueRef = toRef(props, "value");
    const mergedValueRef = useMergedState(controlledValueRef, uncontrolledValueRef);
    const focusedRef = ref(false);
    const patternRef = ref("");
    const compitableOptionsRef = useCompitable(props, ["items", "options"]);
    const createdOptionsRef = ref([]);
    const beingCreatedOptionsRef = ref([]);
    const localOptionsRef = computed(() => {
      return beingCreatedOptionsRef.value.concat(createdOptionsRef.value).concat(compitableOptionsRef.value);
    });
    const resolvedFilterRef = computed(() => {
      const {
        filter: filter2
      } = props;
      if (filter2) return filter2;
      const {
        labelField,
        valueField
      } = props;
      return (pattern, option) => {
        if (!option) return false;
        const label = option[labelField];
        if (typeof label === "string") {
          return patternMatched(pattern, label);
        }
        const value = option[valueField];
        if (typeof value === "string") {
          return patternMatched(pattern, value);
        }
        if (typeof value === "number") {
          return patternMatched(pattern, String(value));
        }
        return false;
      };
    });
    const filteredOptionsRef = computed(() => {
      if (props.remote) {
        return compitableOptionsRef.value;
      } else {
        const {
          value: localOptions
        } = localOptionsRef;
        const {
          value: pattern
        } = patternRef;
        if (!pattern.length || !props.filterable) {
          return localOptions;
        } else {
          return filterOptions(localOptions, resolvedFilterRef.value, pattern, props.childrenField);
        }
      }
    });
    const treeMateRef = computed(() => {
      const {
        valueField,
        childrenField
      } = props;
      const options = createTmOptions(valueField, childrenField);
      return createTreeMate(filteredOptionsRef.value, options);
    });
    const valOptMapRef = computed(() => createValOptMap(localOptionsRef.value, props.valueField, props.childrenField));
    const uncontrolledShowRef = ref(false);
    const mergedShowRef = useMergedState(toRef(props, "show"), uncontrolledShowRef);
    const triggerRef = ref(null);
    const followerRef = ref(null);
    const menuRef = ref(null);
    const {
      localeRef
    } = useLocale("Select");
    const localizedPlaceholderRef = computed(() => {
      var _a;
      return (_a = props.placeholder) !== null && _a !== void 0 ? _a : localeRef.value.placeholder;
    });
    const emptyArray = [];
    const memoValOptMapRef = ref(/* @__PURE__ */ new Map());
    const wrappedFallbackOptionRef = computed(() => {
      const {
        fallbackOption
      } = props;
      if (fallbackOption === void 0) {
        const {
          labelField,
          valueField
        } = props;
        return (value) => ({
          [labelField]: String(value),
          [valueField]: value
        });
      }
      if (fallbackOption === false) return false;
      return (value) => {
        return Object.assign(fallbackOption(value), {
          value
        });
      };
    });
    function getMergedOptions(values) {
      const remote = props.remote;
      const {
        value: memoValOptMap
      } = memoValOptMapRef;
      const {
        value: valOptMap
      } = valOptMapRef;
      const {
        value: wrappedFallbackOption
      } = wrappedFallbackOptionRef;
      const options = [];
      values.forEach((value) => {
        if (valOptMap.has(value)) {
          options.push(valOptMap.get(value));
        } else if (remote && memoValOptMap.has(value)) {
          options.push(memoValOptMap.get(value));
        } else if (wrappedFallbackOption) {
          const option = wrappedFallbackOption(value);
          if (option) {
            options.push(option);
          }
        }
      });
      return options;
    }
    const selectedOptionsRef = computed(() => {
      if (props.multiple) {
        const {
          value: values
        } = mergedValueRef;
        if (!Array.isArray(values)) return [];
        return getMergedOptions(values);
      }
      return null;
    });
    const selectedOptionRef = computed(() => {
      const {
        value: mergedValue
      } = mergedValueRef;
      if (!props.multiple && !Array.isArray(mergedValue)) {
        if (mergedValue === null) return null;
        return getMergedOptions([mergedValue])[0] || null;
      }
      return null;
    });
    const formItem = useFormItem(props);
    const {
      mergedSizeRef,
      mergedDisabledRef,
      mergedStatusRef
    } = formItem;
    function doUpdateValue(value, option) {
      const {
        onChange,
        "onUpdate:value": _onUpdateValue,
        onUpdateValue
      } = props;
      const {
        nTriggerFormChange,
        nTriggerFormInput
      } = formItem;
      if (onChange) call(onChange, value, option);
      if (onUpdateValue) call(onUpdateValue, value, option);
      if (_onUpdateValue) {
        call(_onUpdateValue, value, option);
      }
      uncontrolledValueRef.value = value;
      nTriggerFormChange();
      nTriggerFormInput();
    }
    function doBlur(e) {
      const {
        onBlur
      } = props;
      const {
        nTriggerFormBlur
      } = formItem;
      if (onBlur) call(onBlur, e);
      nTriggerFormBlur();
    }
    function doClear() {
      const {
        onClear
      } = props;
      if (onClear) call(onClear);
    }
    function doFocus(e) {
      const {
        onFocus,
        showOnFocus
      } = props;
      const {
        nTriggerFormFocus
      } = formItem;
      if (onFocus) call(onFocus, e);
      nTriggerFormFocus();
      if (showOnFocus) {
        openMenu();
      }
    }
    function doSearch(value) {
      const {
        onSearch
      } = props;
      if (onSearch) call(onSearch, value);
    }
    function doScroll(e) {
      const {
        onScroll
      } = props;
      if (onScroll) call(onScroll, e);
    }
    function updateMemorizedOptions() {
      var _a;
      const {
        remote,
        multiple
      } = props;
      if (remote) {
        const {
          value: memoValOptMap
        } = memoValOptMapRef;
        if (multiple) {
          const {
            valueField
          } = props;
          (_a = selectedOptionsRef.value) === null || _a === void 0 ? void 0 : _a.forEach((option) => {
            memoValOptMap.set(option[valueField], option);
          });
        } else {
          const option = selectedOptionRef.value;
          if (option) {
            memoValOptMap.set(option[props.valueField], option);
          }
        }
      }
    }
    function doUpdateShow(value) {
      const {
        onUpdateShow,
        "onUpdate:show": _onUpdateShow
      } = props;
      if (onUpdateShow) call(onUpdateShow, value);
      if (_onUpdateShow) call(_onUpdateShow, value);
      uncontrolledShowRef.value = value;
    }
    function openMenu() {
      if (!mergedDisabledRef.value) {
        doUpdateShow(true);
        uncontrolledShowRef.value = true;
        if (props.filterable) {
          focusSelectionInput();
        }
      }
    }
    function closeMenu() {
      doUpdateShow(false);
    }
    function handleMenuAfterLeave() {
      patternRef.value = "";
      beingCreatedOptionsRef.value = emptyArray;
    }
    const activeWithoutMenuOpenRef = ref(false);
    function onTriggerInputFocus() {
      if (props.filterable) {
        activeWithoutMenuOpenRef.value = true;
      }
    }
    function onTriggerInputBlur() {
      if (props.filterable) {
        activeWithoutMenuOpenRef.value = false;
        if (!mergedShowRef.value) {
          handleMenuAfterLeave();
        }
      }
    }
    function handleTriggerClick() {
      if (mergedDisabledRef.value) return;
      if (!mergedShowRef.value) {
        openMenu();
      } else {
        if (!props.filterable) {
          closeMenu();
        } else {
          focusSelectionInput();
        }
      }
    }
    function handleTriggerBlur(e) {
      var _a, _b;
      if ((_b = (_a = menuRef.value) === null || _a === void 0 ? void 0 : _a.selfRef) === null || _b === void 0 ? void 0 : _b.contains(e.relatedTarget)) {
        return;
      }
      focusedRef.value = false;
      doBlur(e);
      closeMenu();
    }
    function handleTriggerFocus(e) {
      doFocus(e);
      focusedRef.value = true;
    }
    function handleMenuFocus() {
      focusedRef.value = true;
    }
    function handleMenuBlur(e) {
      var _a;
      if ((_a = triggerRef.value) === null || _a === void 0 ? void 0 : _a.$el.contains(e.relatedTarget)) return;
      focusedRef.value = false;
      doBlur(e);
      closeMenu();
    }
    function handleMenuTabOut() {
      var _a;
      (_a = triggerRef.value) === null || _a === void 0 ? void 0 : _a.focus();
      closeMenu();
    }
    function handleMenuClickOutside(e) {
      var _a;
      if (mergedShowRef.value) {
        if (!((_a = triggerRef.value) === null || _a === void 0 ? void 0 : _a.$el.contains(getPreciseEventTarget(e)))) {
          closeMenu();
        }
      }
    }
    function createClearedMultipleSelectValue(value) {
      if (!Array.isArray(value)) return [];
      if (wrappedFallbackOptionRef.value) {
        return Array.from(value);
      } else {
        const {
          remote
        } = props;
        const {
          value: valOptMap
        } = valOptMapRef;
        if (remote) {
          const {
            value: memoValOptMap
          } = memoValOptMapRef;
          return value.filter((v) => valOptMap.has(v) || memoValOptMap.has(v));
        } else {
          return value.filter((v) => valOptMap.has(v));
        }
      }
    }
    function handleToggleByTmNode(tmNode) {
      handleToggleByOption(tmNode.rawNode);
    }
    function handleToggleByOption(option) {
      if (mergedDisabledRef.value) return;
      const {
        tag,
        remote,
        clearFilterAfterSelect,
        valueField
      } = props;
      if (tag && !remote) {
        const {
          value: beingCreatedOptions
        } = beingCreatedOptionsRef;
        const beingCreatedOption = beingCreatedOptions[0] || null;
        if (beingCreatedOption) {
          const createdOptions = createdOptionsRef.value;
          if (!createdOptions.length) {
            createdOptionsRef.value = [beingCreatedOption];
          } else {
            createdOptions.push(beingCreatedOption);
          }
          beingCreatedOptionsRef.value = emptyArray;
        }
      }
      if (remote) {
        memoValOptMapRef.value.set(option[valueField], option);
      }
      if (props.multiple) {
        const changedValue = createClearedMultipleSelectValue(mergedValueRef.value);
        const index = changedValue.findIndex((value) => value === option[valueField]);
        if (~index) {
          changedValue.splice(index, 1);
          if (tag && !remote) {
            const createdOptionIndex = getCreatedOptionIndex(option[valueField]);
            if (~createdOptionIndex) {
              createdOptionsRef.value.splice(createdOptionIndex, 1);
              if (clearFilterAfterSelect) patternRef.value = "";
            }
          }
        } else {
          changedValue.push(option[valueField]);
          if (clearFilterAfterSelect) patternRef.value = "";
        }
        doUpdateValue(changedValue, getMergedOptions(changedValue));
      } else {
        if (tag && !remote) {
          const createdOptionIndex = getCreatedOptionIndex(option[valueField]);
          if (~createdOptionIndex) {
            createdOptionsRef.value = [createdOptionsRef.value[createdOptionIndex]];
          } else {
            createdOptionsRef.value = emptyArray;
          }
        }
        focusSelection();
        closeMenu();
        doUpdateValue(option[valueField], option);
      }
    }
    function getCreatedOptionIndex(optionValue) {
      const createdOptions = createdOptionsRef.value;
      return createdOptions.findIndex((createdOption) => createdOption[props.valueField] === optionValue);
    }
    function handlePatternInput(e) {
      if (!mergedShowRef.value) {
        openMenu();
      }
      const {
        value
      } = e.target;
      patternRef.value = value;
      const {
        tag,
        remote
      } = props;
      doSearch(value);
      if (tag && !remote) {
        if (!value) {
          beingCreatedOptionsRef.value = emptyArray;
          return;
        }
        const {
          onCreate
        } = props;
        const optionBeingCreated = onCreate ? onCreate(value) : {
          [props.labelField]: value,
          [props.valueField]: value
        };
        const {
          valueField,
          labelField
        } = props;
        if (compitableOptionsRef.value.some((option) => {
          return option[valueField] === optionBeingCreated[valueField] || option[labelField] === optionBeingCreated[labelField];
        }) || createdOptionsRef.value.some((option) => {
          return option[valueField] === optionBeingCreated[valueField] || option[labelField] === optionBeingCreated[labelField];
        })) {
          beingCreatedOptionsRef.value = emptyArray;
        } else {
          beingCreatedOptionsRef.value = [optionBeingCreated];
        }
      }
    }
    function handleClear(e) {
      e.stopPropagation();
      const {
        multiple
      } = props;
      if (!multiple && props.filterable) {
        closeMenu();
      }
      doClear();
      if (multiple) {
        doUpdateValue([], []);
      } else {
        doUpdateValue(null, null);
      }
    }
    function handleMenuMousedown(e) {
      if (!happensIn(e, "action") && !happensIn(e, "empty") && !happensIn(e, "header")) {
        e.preventDefault();
      }
    }
    function handleMenuScroll(e) {
      doScroll(e);
    }
    function handleKeydown(e) {
      var _a, _b, _c, _d, _e;
      if (!props.keyboard) {
        e.preventDefault();
        return;
      }
      switch (e.key) {
        case " ":
          if (props.filterable) {
            break;
          } else {
            e.preventDefault();
          }
        // eslint-disable-next-line no-fallthrough
        case "Enter":
          if (!((_a = triggerRef.value) === null || _a === void 0 ? void 0 : _a.isComposing)) {
            if (mergedShowRef.value) {
              const pendingTmNode = (_b = menuRef.value) === null || _b === void 0 ? void 0 : _b.getPendingTmNode();
              if (pendingTmNode) {
                handleToggleByTmNode(pendingTmNode);
              } else if (!props.filterable) {
                closeMenu();
                focusSelection();
              }
            } else {
              openMenu();
              if (props.tag && activeWithoutMenuOpenRef.value) {
                const beingCreatedOption = beingCreatedOptionsRef.value[0];
                if (beingCreatedOption) {
                  const optionValue = beingCreatedOption[props.valueField];
                  const {
                    value: mergedValue
                  } = mergedValueRef;
                  if (props.multiple) {
                    if (Array.isArray(mergedValue) && mergedValue.includes(optionValue)) ;
                    else {
                      handleToggleByOption(beingCreatedOption);
                    }
                  } else {
                    handleToggleByOption(beingCreatedOption);
                  }
                }
              }
            }
          }
          e.preventDefault();
          break;
        case "ArrowUp":
          e.preventDefault();
          if (props.loading) return;
          if (mergedShowRef.value) {
            (_c = menuRef.value) === null || _c === void 0 ? void 0 : _c.prev();
          }
          break;
        case "ArrowDown":
          e.preventDefault();
          if (props.loading) return;
          if (mergedShowRef.value) {
            (_d = menuRef.value) === null || _d === void 0 ? void 0 : _d.next();
          } else {
            openMenu();
          }
          break;
        case "Escape":
          if (mergedShowRef.value) {
            markEventEffectPerformed(e);
            closeMenu();
          }
          (_e = triggerRef.value) === null || _e === void 0 ? void 0 : _e.focus();
          break;
      }
    }
    function focusSelection() {
      var _a;
      (_a = triggerRef.value) === null || _a === void 0 ? void 0 : _a.focus();
    }
    function focusSelectionInput() {
      var _a;
      (_a = triggerRef.value) === null || _a === void 0 ? void 0 : _a.focusInput();
    }
    function handleTriggerOrMenuResize() {
      var _a;
      if (!mergedShowRef.value) return;
      (_a = followerRef.value) === null || _a === void 0 ? void 0 : _a.syncPosition();
    }
    updateMemorizedOptions();
    watch(toRef(props, "options"), updateMemorizedOptions);
    const exposedMethods = {
      focus: () => {
        var _a;
        (_a = triggerRef.value) === null || _a === void 0 ? void 0 : _a.focus();
      },
      focusInput: () => {
        var _a;
        (_a = triggerRef.value) === null || _a === void 0 ? void 0 : _a.focusInput();
      },
      blur: () => {
        var _a;
        (_a = triggerRef.value) === null || _a === void 0 ? void 0 : _a.blur();
      },
      blurInput: () => {
        var _a;
        (_a = triggerRef.value) === null || _a === void 0 ? void 0 : _a.blurInput();
      }
    };
    const cssVarsRef = computed(() => {
      const {
        self: {
          menuBoxShadow
        }
      } = themeRef.value;
      return {
        "--n-menu-box-shadow": menuBoxShadow
      };
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass("select", void 0, cssVarsRef, props) : void 0;
    return Object.assign(Object.assign({}, exposedMethods), {
      mergedStatus: mergedStatusRef,
      mergedClsPrefix: mergedClsPrefixRef,
      mergedBordered: mergedBorderedRef,
      namespace: namespaceRef,
      treeMate: treeMateRef,
      isMounted: isMounted(),
      triggerRef,
      menuRef,
      pattern: patternRef,
      uncontrolledShow: uncontrolledShowRef,
      mergedShow: mergedShowRef,
      adjustedTo: useAdjustedTo(props),
      uncontrolledValue: uncontrolledValueRef,
      mergedValue: mergedValueRef,
      followerRef,
      localizedPlaceholder: localizedPlaceholderRef,
      selectedOption: selectedOptionRef,
      selectedOptions: selectedOptionsRef,
      mergedSize: mergedSizeRef,
      mergedDisabled: mergedDisabledRef,
      focused: focusedRef,
      activeWithoutMenuOpen: activeWithoutMenuOpenRef,
      inlineThemeDisabled,
      onTriggerInputFocus,
      onTriggerInputBlur,
      handleTriggerOrMenuResize,
      handleMenuFocus,
      handleMenuBlur,
      handleMenuTabOut,
      handleTriggerClick,
      handleToggle: handleToggleByTmNode,
      handleDeleteOption: handleToggleByOption,
      handlePatternInput,
      handleClear,
      handleTriggerBlur,
      handleTriggerFocus,
      handleKeydown,
      handleMenuAfterLeave,
      handleMenuClickOutside,
      handleMenuScroll,
      handleMenuKeydown: handleKeydown,
      handleMenuMousedown,
      mergedTheme: themeRef,
      cssVars: inlineThemeDisabled ? void 0 : cssVarsRef,
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
    });
  },
  render() {
    return h("div", {
      class: `${this.mergedClsPrefix}-select`
    }, h(Binder, null, {
      default: () => [h(VTarget, null, {
        default: () => h(NInternalSelection, {
          ref: "triggerRef",
          inlineThemeDisabled: this.inlineThemeDisabled,
          status: this.mergedStatus,
          inputProps: this.inputProps,
          clsPrefix: this.mergedClsPrefix,
          showArrow: this.showArrow,
          maxTagCount: this.maxTagCount,
          ellipsisTagPopoverProps: this.ellipsisTagPopoverProps,
          bordered: this.mergedBordered,
          active: this.activeWithoutMenuOpen || this.mergedShow,
          pattern: this.pattern,
          placeholder: this.localizedPlaceholder,
          selectedOption: this.selectedOption,
          selectedOptions: this.selectedOptions,
          multiple: this.multiple,
          renderTag: this.renderTag,
          renderLabel: this.renderLabel,
          filterable: this.filterable,
          clearable: this.clearable,
          disabled: this.mergedDisabled,
          size: this.mergedSize,
          theme: this.mergedTheme.peers.InternalSelection,
          labelField: this.labelField,
          valueField: this.valueField,
          themeOverrides: this.mergedTheme.peerOverrides.InternalSelection,
          loading: this.loading,
          focused: this.focused,
          onClick: this.handleTriggerClick,
          onDeleteOption: this.handleDeleteOption,
          onPatternInput: this.handlePatternInput,
          onClear: this.handleClear,
          onBlur: this.handleTriggerBlur,
          onFocus: this.handleTriggerFocus,
          onKeydown: this.handleKeydown,
          onPatternBlur: this.onTriggerInputBlur,
          onPatternFocus: this.onTriggerInputFocus,
          onResize: this.handleTriggerOrMenuResize,
          ignoreComposition: this.ignoreComposition
        }, {
          arrow: () => {
            var _a, _b;
            return [(_b = (_a = this.$slots).arrow) === null || _b === void 0 ? void 0 : _b.call(_a)];
          }
        })
      }), h(VFollower, {
        ref: "followerRef",
        show: this.mergedShow,
        to: this.adjustedTo,
        teleportDisabled: this.adjustedTo === useAdjustedTo.tdkey,
        containerClass: this.namespace,
        width: this.consistentMenuWidth ? "target" : void 0,
        minWidth: "target",
        placement: this.placement
      }, {
        default: () => h(Transition, {
          name: "fade-in-scale-up-transition",
          appear: this.isMounted,
          onAfterLeave: this.handleMenuAfterLeave
        }, {
          default: () => {
            var _a, _b, _c;
            if (!(this.mergedShow || this.displayDirective === "show")) {
              return null;
            }
            (_a = this.onRender) === null || _a === void 0 ? void 0 : _a.call(this);
            return withDirectives(h(NInternalSelectMenu, Object.assign({}, this.menuProps, {
              ref: "menuRef",
              onResize: this.handleTriggerOrMenuResize,
              inlineThemeDisabled: this.inlineThemeDisabled,
              virtualScroll: this.consistentMenuWidth && this.virtualScroll,
              class: [`${this.mergedClsPrefix}-select-menu`, this.themeClass, (_b = this.menuProps) === null || _b === void 0 ? void 0 : _b.class],
              clsPrefix: this.mergedClsPrefix,
              focusable: true,
              labelField: this.labelField,
              valueField: this.valueField,
              autoPending: true,
              nodeProps: this.nodeProps,
              theme: this.mergedTheme.peers.InternalSelectMenu,
              themeOverrides: this.mergedTheme.peerOverrides.InternalSelectMenu,
              treeMate: this.treeMate,
              multiple: this.multiple,
              size: this.menuSize,
              renderOption: this.renderOption,
              renderLabel: this.renderLabel,
              value: this.mergedValue,
              style: [(_c = this.menuProps) === null || _c === void 0 ? void 0 : _c.style, this.cssVars],
              onToggle: this.handleToggle,
              onScroll: this.handleMenuScroll,
              onFocus: this.handleMenuFocus,
              onBlur: this.handleMenuBlur,
              onKeydown: this.handleMenuKeydown,
              onTabOut: this.handleMenuTabOut,
              onMousedown: this.handleMenuMousedown,
              show: this.mergedShow,
              showCheckmark: this.showCheckmark,
              resetMenuOnOptionsChange: this.resetMenuOnOptionsChange
            }), {
              empty: () => {
                var _a2, _b2;
                return [(_b2 = (_a2 = this.$slots).empty) === null || _b2 === void 0 ? void 0 : _b2.call(_a2)];
              },
              header: () => {
                var _a2, _b2;
                return [(_b2 = (_a2 = this.$slots).header) === null || _b2 === void 0 ? void 0 : _b2.call(_a2)];
              },
              action: () => {
                var _a2, _b2;
                return [(_b2 = (_a2 = this.$slots).action) === null || _b2 === void 0 ? void 0 : _b2.call(_a2)];
              }
            }), this.displayDirective === "show" ? [[vShow, this.mergedShow], [clickoutside, this.handleMenuClickOutside, void 0, {
              capture: true
            }]] : [[clickoutside, this.handleMenuClickOutside, void 0, {
              capture: true
            }]]);
          }
        })
      })]
    }));
  }
});
const hoverStyleProps = `
 background: var(--n-item-color-hover);
 color: var(--n-item-text-color-hover);
 border: var(--n-item-border-hover);
`;
const hoverStyleChildren = [cM("button", `
 background: var(--n-button-color-hover);
 border: var(--n-button-border-hover);
 color: var(--n-button-icon-color-hover);
 `)];
const style$3 = cB("pagination", `
 display: flex;
 vertical-align: middle;
 font-size: var(--n-item-font-size);
 flex-wrap: nowrap;
`, [cB("pagination-prefix", `
 display: flex;
 align-items: center;
 margin: var(--n-prefix-margin);
 `), cB("pagination-suffix", `
 display: flex;
 align-items: center;
 margin: var(--n-suffix-margin);
 `), c$1("> *:not(:first-child)", `
 margin: var(--n-item-margin);
 `), cB("select", `
 width: var(--n-select-width);
 `), c$1("&.transition-disabled", [cB("pagination-item", "transition: none!important;")]), cB("pagination-quick-jumper", `
 white-space: nowrap;
 display: flex;
 color: var(--n-jumper-text-color);
 transition: color .3s var(--n-bezier);
 align-items: center;
 font-size: var(--n-jumper-font-size);
 `, [cB("input", `
 margin: var(--n-input-margin);
 width: var(--n-input-width);
 `)]), cB("pagination-item", `
 position: relative;
 cursor: pointer;
 user-select: none;
 -webkit-user-select: none;
 display: flex;
 align-items: center;
 justify-content: center;
 box-sizing: border-box;
 min-width: var(--n-item-size);
 height: var(--n-item-size);
 padding: var(--n-item-padding);
 background-color: var(--n-item-color);
 color: var(--n-item-text-color);
 border-radius: var(--n-item-border-radius);
 border: var(--n-item-border);
 fill: var(--n-button-icon-color);
 transition:
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 fill .3s var(--n-bezier);
 `, [cM("button", `
 background: var(--n-button-color);
 color: var(--n-button-icon-color);
 border: var(--n-button-border);
 padding: 0;
 `, [cB("base-icon", `
 font-size: var(--n-button-icon-size);
 `)]), cNotM("disabled", [cM("hover", hoverStyleProps, hoverStyleChildren), c$1("&:hover", hoverStyleProps, hoverStyleChildren), c$1("&:active", `
 background: var(--n-item-color-pressed);
 color: var(--n-item-text-color-pressed);
 border: var(--n-item-border-pressed);
 `, [cM("button", `
 background: var(--n-button-color-pressed);
 border: var(--n-button-border-pressed);
 color: var(--n-button-icon-color-pressed);
 `)]), cM("active", `
 background: var(--n-item-color-active);
 color: var(--n-item-text-color-active);
 border: var(--n-item-border-active);
 `, [c$1("&:hover", `
 background: var(--n-item-color-active-hover);
 `)])]), cM("disabled", `
 cursor: not-allowed;
 color: var(--n-item-text-color-disabled);
 `, [cM("active, button", `
 background-color: var(--n-item-color-disabled);
 border: var(--n-item-border-disabled);
 `)])]), cM("disabled", `
 cursor: not-allowed;
 `, [cB("pagination-quick-jumper", `
 color: var(--n-jumper-text-color-disabled);
 `)]), cM("simple", `
 display: flex;
 align-items: center;
 flex-wrap: nowrap;
 `, [cB("pagination-quick-jumper", [cB("input", `
 margin: 0;
 `)])])]);
function getDefaultPageSize(paginationProps2) {
  var _a;
  if (!paginationProps2) return 10;
  const {
    defaultPageSize
  } = paginationProps2;
  if (defaultPageSize !== void 0) return defaultPageSize;
  const pageSizeOption = (_a = paginationProps2.pageSizes) === null || _a === void 0 ? void 0 : _a[0];
  if (typeof pageSizeOption === "number") return pageSizeOption;
  return (pageSizeOption === null || pageSizeOption === void 0 ? void 0 : pageSizeOption.value) || 10;
}
function createPageItemsInfo(currentPage, pageCount, pageSlot, showQuickJumpDropdown) {
  let hasFastBackward = false;
  let hasFastForward = false;
  let fastBackwardTo = 1;
  let fastForwardTo = pageCount;
  if (pageCount === 1) {
    return {
      hasFastBackward: false,
      hasFastForward: false,
      fastForwardTo,
      fastBackwardTo,
      items: [{
        type: "page",
        label: 1,
        active: currentPage === 1,
        mayBeFastBackward: false,
        mayBeFastForward: false
      }]
    };
  }
  if (pageCount === 2) {
    return {
      hasFastBackward: false,
      hasFastForward: false,
      fastForwardTo,
      fastBackwardTo,
      items: [{
        type: "page",
        label: 1,
        active: currentPage === 1,
        mayBeFastBackward: false,
        mayBeFastForward: false
      }, {
        type: "page",
        label: 2,
        active: currentPage === 2,
        mayBeFastBackward: true,
        mayBeFastForward: false
      }]
    };
  }
  const firstPage = 1;
  const lastPage = pageCount;
  let middleStart = currentPage;
  let middleEnd = currentPage;
  const middleDelta = (pageSlot - 5) / 2;
  middleEnd += Math.ceil(middleDelta);
  middleEnd = Math.min(Math.max(middleEnd, firstPage + pageSlot - 3), lastPage - 2);
  middleStart -= Math.floor(middleDelta);
  middleStart = Math.max(Math.min(middleStart, lastPage - pageSlot + 3), firstPage + 2);
  let leftSplit = false;
  let rightSplit = false;
  if (middleStart > firstPage + 2) leftSplit = true;
  if (middleEnd < lastPage - 2) rightSplit = true;
  const items = [];
  items.push({
    type: "page",
    label: 1,
    active: currentPage === 1,
    mayBeFastBackward: false,
    mayBeFastForward: false
  });
  if (leftSplit) {
    hasFastBackward = true;
    fastBackwardTo = middleStart - 1;
    items.push({
      type: "fast-backward",
      active: false,
      label: void 0,
      options: showQuickJumpDropdown ? createRange(firstPage + 1, middleStart - 1) : null
    });
  } else if (lastPage >= firstPage + 1) {
    items.push({
      type: "page",
      label: firstPage + 1,
      mayBeFastBackward: true,
      mayBeFastForward: false,
      active: currentPage === firstPage + 1
    });
  }
  for (let i = middleStart; i <= middleEnd; ++i) {
    items.push({
      type: "page",
      label: i,
      mayBeFastBackward: false,
      mayBeFastForward: false,
      active: currentPage === i
    });
  }
  if (rightSplit) {
    hasFastForward = true;
    fastForwardTo = middleEnd + 1;
    items.push({
      type: "fast-forward",
      active: false,
      label: void 0,
      options: showQuickJumpDropdown ? createRange(middleEnd + 1, lastPage - 1) : null
    });
  } else if (middleEnd === lastPage - 2 && items[items.length - 1].label !== lastPage - 1) {
    items.push({
      type: "page",
      mayBeFastForward: true,
      mayBeFastBackward: false,
      label: lastPage - 1,
      active: currentPage === lastPage - 1
    });
  }
  if (items[items.length - 1].label !== lastPage) {
    items.push({
      type: "page",
      mayBeFastForward: false,
      mayBeFastBackward: false,
      label: lastPage,
      active: currentPage === lastPage
    });
  }
  return {
    hasFastBackward,
    hasFastForward,
    fastBackwardTo,
    fastForwardTo,
    items
  };
}
function createRange(from, to) {
  const range = [];
  for (let i = from; i <= to; ++i) {
    range.push({
      label: `${i}`,
      value: i
    });
  }
  return range;
}
const paginationProps = Object.assign(Object.assign({}, useTheme.props), {
  simple: Boolean,
  page: Number,
  defaultPage: {
    type: Number,
    default: 1
  },
  itemCount: Number,
  pageCount: Number,
  defaultPageCount: {
    type: Number,
    default: 1
  },
  showSizePicker: Boolean,
  pageSize: Number,
  defaultPageSize: Number,
  pageSizes: {
    type: Array,
    default() {
      return [10];
    }
  },
  showQuickJumper: Boolean,
  size: {
    type: String,
    default: "medium"
  },
  disabled: Boolean,
  pageSlot: {
    type: Number,
    default: 9
  },
  selectProps: Object,
  prev: Function,
  next: Function,
  goto: Function,
  prefix: Function,
  suffix: Function,
  label: Function,
  displayOrder: {
    type: Array,
    default: ["pages", "size-picker", "quick-jumper"]
  },
  to: useAdjustedTo.propTo,
  showQuickJumpDropdown: {
    type: Boolean,
    default: true
  },
  "onUpdate:page": [Function, Array],
  onUpdatePage: [Function, Array],
  "onUpdate:pageSize": [Function, Array],
  onUpdatePageSize: [Function, Array],
  /** @deprecated */
  onPageSizeChange: [Function, Array],
  /** @deprecated */
  onChange: [Function, Array]
});
const NPagination = defineComponent({
  name: "Pagination",
  props: paginationProps,
  slots: Object,
  setup(props) {
    const {
      mergedComponentPropsRef,
      mergedClsPrefixRef,
      inlineThemeDisabled,
      mergedRtlRef
    } = useConfig(props);
    const themeRef = useTheme("Pagination", "-pagination", style$3, paginationLight, props, mergedClsPrefixRef);
    const {
      localeRef
    } = useLocale("Pagination");
    const selfRef = ref(null);
    const uncontrolledPageRef = ref(props.defaultPage);
    const uncontrolledPageSizeRef = ref(getDefaultPageSize(props));
    const mergedPageRef = useMergedState(toRef(props, "page"), uncontrolledPageRef);
    const mergedPageSizeRef = useMergedState(toRef(props, "pageSize"), uncontrolledPageSizeRef);
    const mergedPageCountRef = computed(() => {
      const {
        itemCount
      } = props;
      if (itemCount !== void 0) {
        return Math.max(1, Math.ceil(itemCount / mergedPageSizeRef.value));
      }
      const {
        pageCount
      } = props;
      if (pageCount !== void 0) return Math.max(pageCount, 1);
      return 1;
    });
    const jumperValueRef = ref("");
    watchEffect(() => {
      void props.simple;
      jumperValueRef.value = String(mergedPageRef.value);
    });
    const fastForwardActiveRef = ref(false);
    const fastBackwardActiveRef = ref(false);
    const showFastForwardMenuRef = ref(false);
    const showFastBackwardMenuRef = ref(false);
    const handleFastForwardMouseenter = () => {
      if (props.disabled) return;
      fastForwardActiveRef.value = true;
      disableTransitionOneTick();
    };
    const handleFastForwardMouseleave = () => {
      if (props.disabled) return;
      fastForwardActiveRef.value = false;
      disableTransitionOneTick();
    };
    const handleFastBackwardMouseenter = () => {
      fastBackwardActiveRef.value = true;
      disableTransitionOneTick();
    };
    const handleFastBackwardMouseleave = () => {
      fastBackwardActiveRef.value = false;
      disableTransitionOneTick();
    };
    const handleMenuSelect = (value) => {
      doUpdatePage(value);
    };
    const pageItemsInfo = computed(() => createPageItemsInfo(mergedPageRef.value, mergedPageCountRef.value, props.pageSlot, props.showQuickJumpDropdown));
    watchEffect(() => {
      if (!pageItemsInfo.value.hasFastBackward) {
        fastBackwardActiveRef.value = false;
        showFastBackwardMenuRef.value = false;
      } else if (!pageItemsInfo.value.hasFastForward) {
        fastForwardActiveRef.value = false;
        showFastForwardMenuRef.value = false;
      }
    });
    const pageSizeOptionsRef = computed(() => {
      const suffix = localeRef.value.selectionSuffix;
      return props.pageSizes.map((size) => {
        if (typeof size === "number") {
          return {
            label: `${size} / ${suffix}`,
            value: size
          };
        } else {
          return size;
        }
      });
    });
    const inputSizeRef = computed(() => {
      var _a, _b;
      return ((_b = (_a = mergedComponentPropsRef === null || mergedComponentPropsRef === void 0 ? void 0 : mergedComponentPropsRef.value) === null || _a === void 0 ? void 0 : _a.Pagination) === null || _b === void 0 ? void 0 : _b.inputSize) || smallerSize(props.size);
    });
    const selectSizeRef = computed(() => {
      var _a, _b;
      return ((_b = (_a = mergedComponentPropsRef === null || mergedComponentPropsRef === void 0 ? void 0 : mergedComponentPropsRef.value) === null || _a === void 0 ? void 0 : _a.Pagination) === null || _b === void 0 ? void 0 : _b.selectSize) || smallerSize(props.size);
    });
    const startIndexRef = computed(() => {
      return (mergedPageRef.value - 1) * mergedPageSizeRef.value;
    });
    const endIndexRef = computed(() => {
      const endIndex = mergedPageRef.value * mergedPageSizeRef.value - 1;
      const {
        itemCount
      } = props;
      if (itemCount !== void 0) {
        return endIndex > itemCount - 1 ? itemCount - 1 : endIndex;
      }
      return endIndex;
    });
    const mergedItemCountRef = computed(() => {
      const {
        itemCount
      } = props;
      if (itemCount !== void 0) return itemCount;
      return (props.pageCount || 1) * mergedPageSizeRef.value;
    });
    const rtlEnabledRef = useRtl("Pagination", mergedRtlRef, mergedClsPrefixRef);
    function disableTransitionOneTick() {
      void nextTick(() => {
        var _a;
        const {
          value: selfEl
        } = selfRef;
        if (!selfEl) return;
        selfEl.classList.add("transition-disabled");
        void ((_a = selfRef.value) === null || _a === void 0 ? void 0 : _a.offsetWidth);
        selfEl.classList.remove("transition-disabled");
      });
    }
    function doUpdatePage(page) {
      if (page === mergedPageRef.value) return;
      const {
        "onUpdate:page": _onUpdatePage,
        onUpdatePage,
        onChange,
        simple
      } = props;
      if (_onUpdatePage) call(_onUpdatePage, page);
      if (onUpdatePage) call(onUpdatePage, page);
      if (onChange) call(onChange, page);
      uncontrolledPageRef.value = page;
      if (simple) {
        jumperValueRef.value = String(page);
      }
    }
    function doUpdatePageSize(pageSize) {
      if (pageSize === mergedPageSizeRef.value) return;
      const {
        "onUpdate:pageSize": _onUpdatePageSize,
        onUpdatePageSize,
        onPageSizeChange
      } = props;
      if (_onUpdatePageSize) call(_onUpdatePageSize, pageSize);
      if (onUpdatePageSize) call(onUpdatePageSize, pageSize);
      if (onPageSizeChange) call(onPageSizeChange, pageSize);
      uncontrolledPageSizeRef.value = pageSize;
      if (mergedPageCountRef.value < mergedPageRef.value) {
        doUpdatePage(mergedPageCountRef.value);
      }
    }
    function forward() {
      if (props.disabled) return;
      const page = Math.min(mergedPageRef.value + 1, mergedPageCountRef.value);
      doUpdatePage(page);
    }
    function backward() {
      if (props.disabled) return;
      const page = Math.max(mergedPageRef.value - 1, 1);
      doUpdatePage(page);
    }
    function fastForward() {
      if (props.disabled) return;
      const page = Math.min(pageItemsInfo.value.fastForwardTo, mergedPageCountRef.value);
      doUpdatePage(page);
    }
    function fastBackward() {
      if (props.disabled) return;
      const page = Math.max(pageItemsInfo.value.fastBackwardTo, 1);
      doUpdatePage(page);
    }
    function handleSizePickerChange(value) {
      doUpdatePageSize(value);
    }
    function doQuickJump() {
      const page = Number.parseInt(jumperValueRef.value);
      if (Number.isNaN(page)) return;
      doUpdatePage(Math.max(1, Math.min(page, mergedPageCountRef.value)));
      if (!props.simple) {
        jumperValueRef.value = "";
      }
    }
    function handleQuickJumperChange() {
      doQuickJump();
    }
    function handlePageItemClick(pageItem) {
      if (props.disabled) return;
      switch (pageItem.type) {
        case "page":
          doUpdatePage(pageItem.label);
          break;
        case "fast-backward":
          fastBackward();
          break;
        case "fast-forward":
          fastForward();
          break;
      }
    }
    function handleJumperInput(value) {
      jumperValueRef.value = value.replace(/\D+/g, "");
    }
    watchEffect(() => {
      void mergedPageRef.value;
      void mergedPageSizeRef.value;
      disableTransitionOneTick();
    });
    const cssVarsRef = computed(() => {
      const {
        size
      } = props;
      const {
        self: {
          buttonBorder,
          buttonBorderHover,
          buttonBorderPressed,
          buttonIconColor,
          buttonIconColorHover,
          buttonIconColorPressed,
          itemTextColor,
          itemTextColorHover,
          itemTextColorPressed,
          itemTextColorActive,
          itemTextColorDisabled,
          itemColor,
          itemColorHover,
          itemColorPressed,
          itemColorActive,
          itemColorActiveHover,
          itemColorDisabled,
          itemBorder,
          itemBorderHover,
          itemBorderPressed,
          itemBorderActive,
          itemBorderDisabled,
          itemBorderRadius,
          jumperTextColor,
          jumperTextColorDisabled,
          buttonColor,
          buttonColorHover,
          buttonColorPressed,
          [createKey("itemPadding", size)]: itemPadding,
          [createKey("itemMargin", size)]: itemMargin,
          [createKey("inputWidth", size)]: inputWidth,
          [createKey("selectWidth", size)]: selectWidth,
          [createKey("inputMargin", size)]: inputMargin,
          [createKey("selectMargin", size)]: selectMargin,
          [createKey("jumperFontSize", size)]: jumperFontSize,
          [createKey("prefixMargin", size)]: prefixMargin,
          [createKey("suffixMargin", size)]: suffixMargin,
          [createKey("itemSize", size)]: itemSize,
          [createKey("buttonIconSize", size)]: buttonIconSize,
          [createKey("itemFontSize", size)]: itemFontSize,
          [`${createKey("itemMargin", size)}Rtl`]: itemMarginRtl,
          [`${createKey("inputMargin", size)}Rtl`]: inputMarginRtl
        },
        common: {
          cubicBezierEaseInOut
        }
      } = themeRef.value;
      return {
        "--n-prefix-margin": prefixMargin,
        "--n-suffix-margin": suffixMargin,
        "--n-item-font-size": itemFontSize,
        "--n-select-width": selectWidth,
        "--n-select-margin": selectMargin,
        "--n-input-width": inputWidth,
        "--n-input-margin": inputMargin,
        "--n-input-margin-rtl": inputMarginRtl,
        "--n-item-size": itemSize,
        "--n-item-text-color": itemTextColor,
        "--n-item-text-color-disabled": itemTextColorDisabled,
        "--n-item-text-color-hover": itemTextColorHover,
        "--n-item-text-color-active": itemTextColorActive,
        "--n-item-text-color-pressed": itemTextColorPressed,
        "--n-item-color": itemColor,
        "--n-item-color-hover": itemColorHover,
        "--n-item-color-disabled": itemColorDisabled,
        "--n-item-color-active": itemColorActive,
        "--n-item-color-active-hover": itemColorActiveHover,
        "--n-item-color-pressed": itemColorPressed,
        "--n-item-border": itemBorder,
        "--n-item-border-hover": itemBorderHover,
        "--n-item-border-disabled": itemBorderDisabled,
        "--n-item-border-active": itemBorderActive,
        "--n-item-border-pressed": itemBorderPressed,
        "--n-item-padding": itemPadding,
        "--n-item-border-radius": itemBorderRadius,
        "--n-bezier": cubicBezierEaseInOut,
        "--n-jumper-font-size": jumperFontSize,
        "--n-jumper-text-color": jumperTextColor,
        "--n-jumper-text-color-disabled": jumperTextColorDisabled,
        "--n-item-margin": itemMargin,
        "--n-item-margin-rtl": itemMarginRtl,
        "--n-button-icon-size": buttonIconSize,
        "--n-button-icon-color": buttonIconColor,
        "--n-button-icon-color-hover": buttonIconColorHover,
        "--n-button-icon-color-pressed": buttonIconColorPressed,
        "--n-button-color-hover": buttonColorHover,
        "--n-button-color": buttonColor,
        "--n-button-color-pressed": buttonColorPressed,
        "--n-button-border": buttonBorder,
        "--n-button-border-hover": buttonBorderHover,
        "--n-button-border-pressed": buttonBorderPressed
      };
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass("pagination", computed(() => {
      let hash = "";
      const {
        size
      } = props;
      hash += size[0];
      return hash;
    }), cssVarsRef, props) : void 0;
    return {
      rtlEnabled: rtlEnabledRef,
      mergedClsPrefix: mergedClsPrefixRef,
      locale: localeRef,
      selfRef,
      mergedPage: mergedPageRef,
      pageItems: computed(() => {
        return pageItemsInfo.value.items;
      }),
      mergedItemCount: mergedItemCountRef,
      jumperValue: jumperValueRef,
      pageSizeOptions: pageSizeOptionsRef,
      mergedPageSize: mergedPageSizeRef,
      inputSize: inputSizeRef,
      selectSize: selectSizeRef,
      mergedTheme: themeRef,
      mergedPageCount: mergedPageCountRef,
      startIndex: startIndexRef,
      endIndex: endIndexRef,
      showFastForwardMenu: showFastForwardMenuRef,
      showFastBackwardMenu: showFastBackwardMenuRef,
      fastForwardActive: fastForwardActiveRef,
      fastBackwardActive: fastBackwardActiveRef,
      handleMenuSelect,
      handleFastForwardMouseenter,
      handleFastForwardMouseleave,
      handleFastBackwardMouseenter,
      handleFastBackwardMouseleave,
      handleJumperInput,
      handleBackwardClick: backward,
      handleForwardClick: forward,
      handlePageItemClick,
      handleSizePickerChange,
      handleQuickJumperChange,
      cssVars: inlineThemeDisabled ? void 0 : cssVarsRef,
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
    };
  },
  render() {
    const {
      $slots,
      mergedClsPrefix,
      disabled,
      cssVars,
      mergedPage,
      mergedPageCount,
      pageItems,
      showSizePicker,
      showQuickJumper,
      mergedTheme,
      locale,
      inputSize,
      selectSize,
      mergedPageSize,
      pageSizeOptions,
      jumperValue,
      simple,
      prev,
      next,
      prefix,
      suffix,
      label,
      goto,
      handleJumperInput,
      handleSizePickerChange,
      handleBackwardClick,
      handlePageItemClick,
      handleForwardClick,
      handleQuickJumperChange,
      onRender
    } = this;
    onRender === null || onRender === void 0 ? void 0 : onRender();
    const renderPrefix = prefix || $slots.prefix;
    const renderSuffix = suffix || $slots.suffix;
    const renderPrev = prev || $slots.prev;
    const renderNext = next || $slots.next;
    const renderLabel = label || $slots.label;
    return h("div", {
      ref: "selfRef",
      class: [`${mergedClsPrefix}-pagination`, this.themeClass, this.rtlEnabled && `${mergedClsPrefix}-pagination--rtl`, disabled && `${mergedClsPrefix}-pagination--disabled`, simple && `${mergedClsPrefix}-pagination--simple`],
      style: cssVars
    }, renderPrefix ? h("div", {
      class: `${mergedClsPrefix}-pagination-prefix`
    }, renderPrefix({
      page: mergedPage,
      pageSize: mergedPageSize,
      pageCount: mergedPageCount,
      startIndex: this.startIndex,
      endIndex: this.endIndex,
      itemCount: this.mergedItemCount
    })) : null, this.displayOrder.map((part) => {
      switch (part) {
        case "pages":
          return h(Fragment, null, h("div", {
            class: [`${mergedClsPrefix}-pagination-item`, !renderPrev && `${mergedClsPrefix}-pagination-item--button`, (mergedPage <= 1 || mergedPage > mergedPageCount || disabled) && `${mergedClsPrefix}-pagination-item--disabled`],
            onClick: handleBackwardClick
          }, renderPrev ? renderPrev({
            page: mergedPage,
            pageSize: mergedPageSize,
            pageCount: mergedPageCount,
            startIndex: this.startIndex,
            endIndex: this.endIndex,
            itemCount: this.mergedItemCount
          }) : h(NBaseIcon, {
            clsPrefix: mergedClsPrefix
          }, {
            default: () => this.rtlEnabled ? h(ForwardIcon, null) : h(BackwardIcon, null)
          })), simple ? h(Fragment, null, h("div", {
            class: `${mergedClsPrefix}-pagination-quick-jumper`
          }, h(__unplugin_components_1, {
            value: jumperValue,
            onUpdateValue: handleJumperInput,
            size: inputSize,
            placeholder: "",
            disabled,
            theme: mergedTheme.peers.Input,
            themeOverrides: mergedTheme.peerOverrides.Input,
            onChange: handleQuickJumperChange
          })), " /", " ", mergedPageCount) : pageItems.map((pageItem, index) => {
            let contentNode;
            let onMouseenter;
            let onMouseleave;
            const {
              type
            } = pageItem;
            switch (type) {
              case "page":
                const pageNode = pageItem.label;
                if (renderLabel) {
                  contentNode = renderLabel({
                    type: "page",
                    node: pageNode,
                    active: pageItem.active
                  });
                } else {
                  contentNode = pageNode;
                }
                break;
              case "fast-forward":
                const fastForwardNode = this.fastForwardActive ? h(NBaseIcon, {
                  clsPrefix: mergedClsPrefix
                }, {
                  default: () => this.rtlEnabled ? h(FastBackwardIcon, null) : h(FastForwardIcon, null)
                }) : h(NBaseIcon, {
                  clsPrefix: mergedClsPrefix
                }, {
                  default: () => h(MoreIcon, null)
                });
                if (renderLabel) {
                  contentNode = renderLabel({
                    type: "fast-forward",
                    node: fastForwardNode,
                    active: this.fastForwardActive || this.showFastForwardMenu
                  });
                } else {
                  contentNode = fastForwardNode;
                }
                onMouseenter = this.handleFastForwardMouseenter;
                onMouseleave = this.handleFastForwardMouseleave;
                break;
              case "fast-backward":
                const fastBackwardNode = this.fastBackwardActive ? h(NBaseIcon, {
                  clsPrefix: mergedClsPrefix
                }, {
                  default: () => this.rtlEnabled ? h(FastForwardIcon, null) : h(FastBackwardIcon, null)
                }) : h(NBaseIcon, {
                  clsPrefix: mergedClsPrefix
                }, {
                  default: () => h(MoreIcon, null)
                });
                if (renderLabel) {
                  contentNode = renderLabel({
                    type: "fast-backward",
                    node: fastBackwardNode,
                    active: this.fastBackwardActive || this.showFastBackwardMenu
                  });
                } else {
                  contentNode = fastBackwardNode;
                }
                onMouseenter = this.handleFastBackwardMouseenter;
                onMouseleave = this.handleFastBackwardMouseleave;
                break;
            }
            const itemNode = h("div", {
              key: index,
              class: [`${mergedClsPrefix}-pagination-item`, pageItem.active && `${mergedClsPrefix}-pagination-item--active`, type !== "page" && (type === "fast-backward" && this.showFastBackwardMenu || type === "fast-forward" && this.showFastForwardMenu) && `${mergedClsPrefix}-pagination-item--hover`, disabled && `${mergedClsPrefix}-pagination-item--disabled`, type === "page" && `${mergedClsPrefix}-pagination-item--clickable`],
              onClick: () => {
                handlePageItemClick(pageItem);
              },
              onMouseenter,
              onMouseleave
            }, contentNode);
            if (type === "page" && !pageItem.mayBeFastBackward && !pageItem.mayBeFastForward) {
              return itemNode;
            } else {
              const key = pageItem.type === "page" ? pageItem.mayBeFastBackward ? "fast-backward" : "fast-forward" : pageItem.type;
              if (pageItem.type !== "page" && !pageItem.options) {
                return itemNode;
              }
              return h(__unplugin_components_2, {
                to: this.to,
                key,
                disabled,
                trigger: "hover",
                virtualScroll: true,
                style: {
                  width: "60px"
                },
                theme: mergedTheme.peers.Popselect,
                themeOverrides: mergedTheme.peerOverrides.Popselect,
                builtinThemeOverrides: {
                  peers: {
                    InternalSelectMenu: {
                      height: "calc(var(--n-option-height) * 4.6)"
                    }
                  }
                },
                nodeProps: () => ({
                  style: {
                    justifyContent: "center"
                  }
                }),
                show: type === "page" ? false : type === "fast-backward" ? this.showFastBackwardMenu : this.showFastForwardMenu,
                onUpdateShow: (value) => {
                  if (type === "page") return;
                  if (value) {
                    if (type === "fast-backward") {
                      this.showFastBackwardMenu = value;
                    } else {
                      this.showFastForwardMenu = value;
                    }
                  } else {
                    this.showFastBackwardMenu = false;
                    this.showFastForwardMenu = false;
                  }
                },
                options: pageItem.type !== "page" && pageItem.options ? pageItem.options : [],
                onUpdateValue: this.handleMenuSelect,
                scrollable: true,
                showCheckmark: false
              }, {
                default: () => itemNode
              });
            }
          }), h("div", {
            class: [`${mergedClsPrefix}-pagination-item`, !renderNext && `${mergedClsPrefix}-pagination-item--button`, {
              [`${mergedClsPrefix}-pagination-item--disabled`]: mergedPage < 1 || mergedPage >= mergedPageCount || disabled
            }],
            onClick: handleForwardClick
          }, renderNext ? renderNext({
            page: mergedPage,
            pageSize: mergedPageSize,
            pageCount: mergedPageCount,
            itemCount: this.mergedItemCount,
            startIndex: this.startIndex,
            endIndex: this.endIndex
          }) : h(NBaseIcon, {
            clsPrefix: mergedClsPrefix
          }, {
            default: () => this.rtlEnabled ? h(BackwardIcon, null) : h(ForwardIcon, null)
          })));
        case "size-picker": {
          return !simple && showSizePicker ? h(NSelect, Object.assign({
            consistentMenuWidth: false,
            placeholder: "",
            showCheckmark: false,
            to: this.to
          }, this.selectProps, {
            size: selectSize,
            options: pageSizeOptions,
            value: mergedPageSize,
            disabled,
            theme: mergedTheme.peers.Select,
            themeOverrides: mergedTheme.peerOverrides.Select,
            onUpdateValue: handleSizePickerChange
          })) : null;
        }
        case "quick-jumper":
          return !simple && showQuickJumper ? h("div", {
            class: `${mergedClsPrefix}-pagination-quick-jumper`
          }, goto ? goto() : resolveSlot(this.$slots.goto, () => [locale.goto]), h(__unplugin_components_1, {
            value: jumperValue,
            onUpdateValue: handleJumperInput,
            size: inputSize,
            placeholder: "",
            disabled,
            theme: mergedTheme.peers.Input,
            themeOverrides: mergedTheme.peerOverrides.Input,
            onChange: handleQuickJumperChange
          })) : null;
        default:
          return null;
      }
    }), renderSuffix ? h("div", {
      class: `${mergedClsPrefix}-pagination-suffix`
    }, renderSuffix({
      page: mergedPage,
      pageSize: mergedPageSize,
      pageCount: mergedPageCount,
      startIndex: this.startIndex,
      endIndex: this.endIndex,
      itemCount: this.mergedItemCount
    })) : null);
  }
});
const dataTableProps = Object.assign(Object.assign({}, useTheme.props), {
  onUnstableColumnResize: Function,
  pagination: {
    type: [Object, Boolean],
    default: false
  },
  paginateSinglePage: {
    type: Boolean,
    default: true
  },
  minHeight: [Number, String],
  maxHeight: [Number, String],
  // Use any type as row data to make prop data acceptable
  columns: {
    type: Array,
    default: () => []
  },
  rowClassName: [String, Function],
  rowProps: Function,
  rowKey: Function,
  summary: [Function],
  data: {
    type: Array,
    default: () => []
  },
  loading: Boolean,
  bordered: {
    type: Boolean,
    default: void 0
  },
  bottomBordered: {
    type: Boolean,
    default: void 0
  },
  striped: Boolean,
  scrollX: [Number, String],
  defaultCheckedRowKeys: {
    type: Array,
    default: () => []
  },
  checkedRowKeys: Array,
  singleLine: {
    type: Boolean,
    default: true
  },
  singleColumn: Boolean,
  size: {
    type: String,
    default: "medium"
  },
  remote: Boolean,
  defaultExpandedRowKeys: {
    type: Array,
    default: []
  },
  defaultExpandAll: Boolean,
  expandedRowKeys: Array,
  stickyExpandedRows: Boolean,
  virtualScroll: Boolean,
  virtualScrollX: Boolean,
  virtualScrollHeader: Boolean,
  headerHeight: {
    type: Number,
    default: 28
  },
  heightForRow: Function,
  minRowHeight: {
    type: Number,
    default: 28
  },
  tableLayout: {
    type: String,
    default: "auto"
  },
  allowCheckingNotLoaded: Boolean,
  cascade: {
    type: Boolean,
    default: true
  },
  childrenKey: {
    type: String,
    default: "children"
  },
  indent: {
    type: Number,
    default: 16
  },
  flexHeight: Boolean,
  summaryPlacement: {
    type: String,
    default: "bottom"
  },
  paginationBehaviorOnFilter: {
    type: String,
    default: "current"
  },
  filterIconPopoverProps: Object,
  scrollbarProps: Object,
  renderCell: Function,
  renderExpandIcon: Function,
  spinProps: {
    type: Object,
    default: {}
  },
  getCsvCell: Function,
  getCsvHeader: Function,
  onLoad: Function,
  "onUpdate:page": [Function, Array],
  onUpdatePage: [Function, Array],
  "onUpdate:pageSize": [Function, Array],
  onUpdatePageSize: [Function, Array],
  "onUpdate:sorter": [Function, Array],
  onUpdateSorter: [Function, Array],
  "onUpdate:filters": [Function, Array],
  onUpdateFilters: [Function, Array],
  "onUpdate:checkedRowKeys": [Function, Array],
  onUpdateCheckedRowKeys: [Function, Array],
  "onUpdate:expandedRowKeys": [Function, Array],
  onUpdateExpandedRowKeys: [Function, Array],
  onScroll: Function,
  // deprecated
  onPageChange: [Function, Array],
  onPageSizeChange: [Function, Array],
  onSorterChange: [Function, Array],
  onFiltersChange: [Function, Array],
  onCheckedRowKeysChange: [Function, Array]
});
const dataTableInjectionKey = createInjectionKey("n-data-table");
const SELECTION_COL_WIDTH = 40;
const EXPAND_COL_WIDTH = 40;
function getNumberColWidth(col) {
  if (col.type === "selection") {
    return col.width === void 0 ? SELECTION_COL_WIDTH : depx(col.width);
  }
  if (col.type === "expand") {
    return col.width === void 0 ? EXPAND_COL_WIDTH : depx(col.width);
  }
  if ("children" in col) return void 0;
  if (typeof col.width === "string") {
    return depx(col.width);
  }
  return col.width;
}
function getStringColWidth(col) {
  var _a, _b;
  if (col.type === "selection") {
    return formatLength((_a = col.width) !== null && _a !== void 0 ? _a : SELECTION_COL_WIDTH);
  }
  if (col.type === "expand") {
    return formatLength((_b = col.width) !== null && _b !== void 0 ? _b : EXPAND_COL_WIDTH);
  }
  if ("children" in col) {
    return void 0;
  }
  return formatLength(col.width);
}
function getColKey(col) {
  if (col.type === "selection") return "__n_selection__";
  if (col.type === "expand") return "__n_expand__";
  return col.key;
}
function createShallowClonedObject(object) {
  if (!object) return object;
  if (typeof object === "object") {
    return Object.assign({}, object);
  }
  return object;
}
function getFlagOfOrder(order) {
  if (order === "ascend") return 1;
  else if (order === "descend") return -1;
  return 0;
}
function clampValueFollowCSSRules(value, min, max) {
  if (max !== void 0) {
    value = Math.min(value, typeof max === "number" ? max : Number.parseFloat(max));
  }
  if (min !== void 0) {
    value = Math.max(value, typeof min === "number" ? min : Number.parseFloat(min));
  }
  return value;
}
function createCustomWidthStyle(column, resizedWidth) {
  if (resizedWidth !== void 0) {
    return {
      width: resizedWidth,
      minWidth: resizedWidth,
      maxWidth: resizedWidth
    };
  }
  const width = getStringColWidth(column);
  const {
    minWidth,
    maxWidth
  } = column;
  return {
    width,
    minWidth: formatLength(minWidth) || width,
    maxWidth: formatLength(maxWidth)
  };
}
function createRowClassName(row, index, rowClassName) {
  if (typeof rowClassName === "function") return rowClassName(row, index);
  return rowClassName || "";
}
function shouldUseArrayInSingleMode(column) {
  return column.filterOptionValues !== void 0 || column.filterOptionValue === void 0 && column.defaultFilterOptionValues !== void 0;
}
function isColumnSortable(column) {
  if ("children" in column) return false;
  return !!column.sorter;
}
function isColumnResizable(column) {
  if ("children" in column && !!column.children.length) return false;
  return !!column.resizable;
}
function isColumnFilterable(column) {
  if ("children" in column) return false;
  return !!column.filter && (!!column.filterOptions || !!column.renderFilterMenu);
}
function getNextOrderOf(order) {
  if (!order) return "descend";
  else if (order === "descend") return "ascend";
  return false;
}
function createNextSorter(column, currentSortState) {
  if (column.sorter === void 0) return null;
  if (currentSortState === null || currentSortState.columnKey !== column.key) {
    return {
      columnKey: column.key,
      sorter: column.sorter,
      order: getNextOrderOf(false)
    };
  } else {
    return Object.assign(Object.assign({}, currentSortState), {
      order: getNextOrderOf(currentSortState.order)
    });
  }
}
function isColumnSorting(column, mergedSortState) {
  return mergedSortState.find((state) => state.columnKey === column.key && state.order) !== void 0;
}
function formatCsvCell(value) {
  if (typeof value === "string") {
    return value.replace(/,/g, "\\,");
  } else if (value === null || value === void 0) {
    return "";
  } else {
    return `${value}`.replace(/,/g, "\\,");
  }
}
function generateCsv(columns, data, getCsvCell, getCsvHeader) {
  const exportableColumns = columns.filter((column) => column.type !== "expand" && column.type !== "selection" && column.allowExport !== false);
  const header = exportableColumns.map((col) => {
    return getCsvHeader ? getCsvHeader(col) : col.title;
  }).join(",");
  const rows = data.map((row) => {
    return exportableColumns.map((col) => {
      return getCsvCell ? getCsvCell(row[col.key], row, col) : formatCsvCell(row[col.key]);
    }).join(",");
  });
  return [header, ...rows].join("\n");
}
const RenderSafeCheckbox = defineComponent({
  name: "DataTableBodyCheckbox",
  props: {
    rowKey: {
      type: [String, Number],
      required: true
    },
    disabled: {
      type: Boolean,
      required: true
    },
    onUpdateChecked: {
      type: Function,
      required: true
    }
  },
  setup(props) {
    const {
      mergedCheckedRowKeySetRef,
      mergedInderminateRowKeySetRef
    } = inject(dataTableInjectionKey);
    return () => {
      const {
        rowKey
      } = props;
      return h(__unplugin_components_1$1, {
        privateInsideTable: true,
        disabled: props.disabled,
        indeterminate: mergedInderminateRowKeySetRef.value.has(rowKey),
        checked: mergedCheckedRowKeySetRef.value.has(rowKey),
        onUpdateChecked: props.onUpdateChecked
      });
    };
  }
});
const RenderSafeRadio = defineComponent({
  name: "DataTableBodyRadio",
  props: {
    rowKey: {
      type: [String, Number],
      required: true
    },
    disabled: {
      type: Boolean,
      required: true
    },
    onUpdateChecked: {
      type: Function,
      required: true
    }
  },
  setup(props) {
    const {
      mergedCheckedRowKeySetRef,
      componentId
    } = inject(dataTableInjectionKey);
    return () => {
      const {
        rowKey
      } = props;
      return h(__unplugin_components_0, {
        name: componentId,
        disabled: props.disabled,
        checked: mergedCheckedRowKeySetRef.value.has(rowKey),
        onUpdateChecked: props.onUpdateChecked
      });
    };
  }
});
const style$2 = cB("ellipsis", {
  overflow: "hidden"
}, [cNotM("line-clamp", `
 white-space: nowrap;
 display: inline-block;
 vertical-align: bottom;
 max-width: 100%;
 `), cM("line-clamp", `
 display: -webkit-inline-box;
 -webkit-box-orient: vertical;
 `), cM("cursor-pointer", `
 cursor: pointer;
 `)]);
function createLineClampClass(clsPrefix) {
  return `${clsPrefix}-ellipsis--line-clamp`;
}
function createCursorClass(clsPrefix, cursor) {
  return `${clsPrefix}-ellipsis--cursor-${cursor}`;
}
const ellipsisProps = Object.assign(Object.assign({}, useTheme.props), {
  expandTrigger: String,
  lineClamp: [Number, String],
  tooltip: {
    type: [Boolean, Object],
    default: true
  }
});
const NEllipsis = defineComponent({
  name: "Ellipsis",
  inheritAttrs: false,
  props: ellipsisProps,
  slots: Object,
  setup(props, {
    slots,
    attrs
  }) {
    const mergedClsPrefixRef = useMergedClsPrefix();
    const mergedTheme = useTheme("Ellipsis", "-ellipsis", style$2, ellipsisLight, props, mergedClsPrefixRef);
    const triggerRef = ref(null);
    const triggerInnerRef = ref(null);
    const tooltipRef = ref(null);
    const expandedRef = ref(false);
    const ellipsisStyleRef = computed(() => {
      const {
        lineClamp
      } = props;
      const {
        value: expanded
      } = expandedRef;
      if (lineClamp !== void 0) {
        return {
          textOverflow: "",
          "-webkit-line-clamp": expanded ? "" : lineClamp
        };
      } else {
        return {
          textOverflow: expanded ? "" : "ellipsis",
          "-webkit-line-clamp": ""
        };
      }
    });
    function getTooltipDisabled() {
      let tooltipDisabled = false;
      const {
        value: expanded
      } = expandedRef;
      if (expanded) return true;
      const {
        value: trigger
      } = triggerRef;
      if (trigger) {
        const {
          lineClamp
        } = props;
        syncEllipsisStyle(trigger);
        if (lineClamp !== void 0) {
          tooltipDisabled = trigger.scrollHeight <= trigger.offsetHeight;
        } else {
          const {
            value: triggerInner
          } = triggerInnerRef;
          if (triggerInner) {
            tooltipDisabled = triggerInner.getBoundingClientRect().width <= trigger.getBoundingClientRect().width;
          }
        }
        syncCursorStyle(trigger, tooltipDisabled);
      }
      return tooltipDisabled;
    }
    const handleClickRef = computed(() => {
      return props.expandTrigger === "click" ? () => {
        var _a;
        const {
          value: expanded
        } = expandedRef;
        if (expanded) {
          (_a = tooltipRef.value) === null || _a === void 0 ? void 0 : _a.setShow(false);
        }
        expandedRef.value = !expanded;
      } : void 0;
    });
    onDeactivated(() => {
      var _a;
      if (props.tooltip) {
        (_a = tooltipRef.value) === null || _a === void 0 ? void 0 : _a.setShow(false);
      }
    });
    const renderTrigger = () => h("span", Object.assign({}, mergeProps(attrs, {
      class: [`${mergedClsPrefixRef.value}-ellipsis`, props.lineClamp !== void 0 ? createLineClampClass(mergedClsPrefixRef.value) : void 0, props.expandTrigger === "click" ? createCursorClass(mergedClsPrefixRef.value, "pointer") : void 0],
      style: ellipsisStyleRef.value
    }), {
      ref: "triggerRef",
      onClick: handleClickRef.value,
      onMouseenter: (
        // get tooltip disabled will derive cursor style
        props.expandTrigger === "click" ? getTooltipDisabled : void 0
      )
    }), props.lineClamp ? slots : h("span", {
      ref: "triggerInnerRef"
    }, slots));
    function syncEllipsisStyle(trigger) {
      if (!trigger) return;
      const latestStyle = ellipsisStyleRef.value;
      const lineClampClass = createLineClampClass(mergedClsPrefixRef.value);
      if (props.lineClamp !== void 0) {
        syncTriggerClass(trigger, lineClampClass, "add");
      } else {
        syncTriggerClass(trigger, lineClampClass, "remove");
      }
      for (const key in latestStyle) {
        if (trigger.style[key] !== latestStyle[key]) {
          trigger.style[key] = latestStyle[key];
        }
      }
    }
    function syncCursorStyle(trigger, tooltipDisabled) {
      const cursorClass = createCursorClass(mergedClsPrefixRef.value, "pointer");
      if (props.expandTrigger === "click" && !tooltipDisabled) {
        syncTriggerClass(trigger, cursorClass, "add");
      } else {
        syncTriggerClass(trigger, cursorClass, "remove");
      }
    }
    function syncTriggerClass(trigger, styleClass, action) {
      if (action === "add") {
        if (!trigger.classList.contains(styleClass)) {
          trigger.classList.add(styleClass);
        }
      } else {
        if (trigger.classList.contains(styleClass)) {
          trigger.classList.remove(styleClass);
        }
      }
    }
    return {
      mergedTheme,
      triggerRef,
      triggerInnerRef,
      tooltipRef,
      handleClick: handleClickRef,
      renderTrigger,
      getTooltipDisabled
    };
  },
  render() {
    var _a;
    const {
      tooltip,
      renderTrigger,
      $slots
    } = this;
    if (tooltip) {
      const {
        mergedTheme
      } = this;
      return h(NTooltip, Object.assign({
        ref: "tooltipRef",
        placement: "top"
      }, tooltip, {
        getDisabled: this.getTooltipDisabled,
        theme: mergedTheme.peers.Tooltip,
        themeOverrides: mergedTheme.peerOverrides.Tooltip
      }), {
        trigger: renderTrigger,
        default: (_a = $slots.tooltip) !== null && _a !== void 0 ? _a : $slots.default
      });
    } else {
      return renderTrigger();
    }
  }
});
const NPerformantEllipsis = defineComponent({
  name: "PerformantEllipsis",
  props: ellipsisProps,
  inheritAttrs: false,
  setup(props, {
    attrs,
    slots
  }) {
    const mouseEnteredRef = ref(false);
    const mergedClsPrefixRef = useMergedClsPrefix();
    useStyle("-ellipsis", style$2, mergedClsPrefixRef);
    const renderTrigger = () => {
      const {
        lineClamp
      } = props;
      const mergedClsPrefix = mergedClsPrefixRef.value;
      return h("span", Object.assign({}, mergeProps(attrs, {
        class: [`${mergedClsPrefix}-ellipsis`, lineClamp !== void 0 ? createLineClampClass(mergedClsPrefix) : void 0, props.expandTrigger === "click" ? createCursorClass(mergedClsPrefix, "pointer") : void 0],
        style: lineClamp === void 0 ? {
          textOverflow: "ellipsis"
        } : {
          "-webkit-line-clamp": lineClamp
        }
      }), {
        onMouseenter: () => {
          mouseEnteredRef.value = true;
        }
      }), lineClamp ? slots : h("span", null, slots));
    };
    return {
      mouseEntered: mouseEnteredRef,
      renderTrigger
    };
  },
  render() {
    if (this.mouseEntered) {
      return h(NEllipsis, mergeProps({}, this.$attrs, this.$props), this.$slots);
    } else {
      return this.renderTrigger();
    }
  }
});
const Cell = defineComponent({
  name: "DataTableCell",
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    row: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    column: {
      type: Object,
      required: true
    },
    isSummary: Boolean,
    mergedTheme: {
      type: Object,
      required: true
    },
    renderCell: Function
  },
  render() {
    var _a;
    const {
      isSummary,
      column,
      row,
      renderCell
    } = this;
    let cell;
    const {
      render: render2,
      key,
      ellipsis
    } = column;
    if (render2 && !isSummary) {
      cell = render2(row, this.index);
    } else {
      if (isSummary) {
        cell = (_a = row[key]) === null || _a === void 0 ? void 0 : _a.value;
      } else {
        cell = renderCell ? renderCell(get$1(row, key), row, column) : get$1(row, key);
      }
    }
    if (ellipsis) {
      if (typeof ellipsis === "object") {
        const {
          mergedTheme
        } = this;
        if (column.ellipsisComponent === "performant-ellipsis") {
          return h(NPerformantEllipsis, Object.assign({}, ellipsis, {
            theme: mergedTheme.peers.Ellipsis,
            themeOverrides: mergedTheme.peerOverrides.Ellipsis
          }), {
            default: () => cell
          });
        }
        return h(NEllipsis, Object.assign({}, ellipsis, {
          theme: mergedTheme.peers.Ellipsis,
          themeOverrides: mergedTheme.peerOverrides.Ellipsis
        }), {
          default: () => cell
        });
      } else {
        return h("span", {
          class: `${this.clsPrefix}-data-table-td__ellipsis`
        }, cell);
      }
    }
    return cell;
  }
});
const ExpandTrigger = defineComponent({
  name: "DataTableExpandTrigger",
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    expanded: Boolean,
    loading: Boolean,
    onClick: {
      type: Function,
      required: true
    },
    renderExpandIcon: {
      type: Function
    },
    rowData: {
      type: Object,
      required: true
    }
  },
  render() {
    const {
      clsPrefix
    } = this;
    return h("div", {
      class: [`${clsPrefix}-data-table-expand-trigger`, this.expanded && `${clsPrefix}-data-table-expand-trigger--expanded`],
      onClick: this.onClick,
      onMousedown: (e) => {
        e.preventDefault();
      }
    }, h(NIconSwitchTransition, null, {
      default: () => {
        return this.loading ? h(NBaseLoading, {
          key: "loading",
          clsPrefix: this.clsPrefix,
          radius: 85,
          strokeWidth: 15,
          scale: 0.88
        }) : this.renderExpandIcon ? this.renderExpandIcon({
          expanded: this.expanded,
          rowData: this.rowData
        }) : h(NBaseIcon, {
          clsPrefix,
          key: "base-icon"
        }, {
          default: () => h(ChevronRightIcon, null)
        });
      }
    }));
  }
});
const NDataTableFilterMenu = defineComponent({
  name: "DataTableFilterMenu",
  props: {
    column: {
      type: Object,
      required: true
    },
    radioGroupName: {
      type: String,
      required: true
    },
    multiple: {
      type: Boolean,
      required: true
    },
    value: {
      type: [Array, String, Number],
      default: null
    },
    options: {
      type: Array,
      required: true
    },
    onConfirm: {
      type: Function,
      required: true
    },
    onClear: {
      type: Function,
      required: true
    },
    onChange: {
      type: Function,
      required: true
    }
  },
  setup(props) {
    const {
      mergedClsPrefixRef: mergedClsPrefixRefRtl,
      mergedRtlRef
    } = useConfig(props);
    const rtlEnabledRef = useRtl("DataTable", mergedRtlRef, mergedClsPrefixRefRtl);
    const {
      mergedClsPrefixRef,
      mergedThemeRef,
      localeRef
    } = inject(dataTableInjectionKey);
    const temporalValueRef = ref(props.value);
    const checkboxGroupValueRef = computed(() => {
      const {
        value: temporalValue
      } = temporalValueRef;
      if (!Array.isArray(temporalValue)) return null;
      return temporalValue;
    });
    const radioGroupValueRef = computed(() => {
      const {
        value: temporalValue
      } = temporalValueRef;
      if (shouldUseArrayInSingleMode(props.column)) {
        return Array.isArray(temporalValue) && temporalValue.length && temporalValue[0] || null;
      }
      if (!Array.isArray(temporalValue)) return temporalValue;
      return null;
    });
    function doChange(value) {
      props.onChange(value);
    }
    function handleChange(value) {
      if (props.multiple && Array.isArray(value)) {
        temporalValueRef.value = value;
      } else if (shouldUseArrayInSingleMode(props.column) && !Array.isArray(value)) {
        temporalValueRef.value = [value];
      } else {
        temporalValueRef.value = value;
      }
    }
    function handleConfirmClick() {
      doChange(temporalValueRef.value);
      props.onConfirm();
    }
    function handleClearClick() {
      if (props.multiple || shouldUseArrayInSingleMode(props.column)) {
        doChange([]);
      } else {
        doChange(null);
      }
      props.onClear();
    }
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      rtlEnabled: rtlEnabledRef,
      mergedTheme: mergedThemeRef,
      locale: localeRef,
      checkboxGroupValue: checkboxGroupValueRef,
      radioGroupValue: radioGroupValueRef,
      handleChange,
      handleConfirmClick,
      handleClearClick
    };
  },
  render() {
    const {
      mergedTheme,
      locale,
      mergedClsPrefix
    } = this;
    return h("div", {
      class: [`${mergedClsPrefix}-data-table-filter-menu`, this.rtlEnabled && `${mergedClsPrefix}-data-table-filter-menu--rtl`]
    }, h(Scrollbar, null, {
      default: () => {
        const {
          checkboxGroupValue,
          handleChange
        } = this;
        return this.multiple ? h(NCheckboxGroup, {
          value: checkboxGroupValue,
          class: `${mergedClsPrefix}-data-table-filter-menu__group`,
          onUpdateValue: handleChange
        }, {
          default: () => this.options.map((option) => {
            return h(__unplugin_components_1$1, {
              key: option.value,
              theme: mergedTheme.peers.Checkbox,
              themeOverrides: mergedTheme.peerOverrides.Checkbox,
              value: option.value
            }, {
              default: () => option.label
            });
          })
        }) : h(__unplugin_components_2$1, {
          name: this.radioGroupName,
          class: `${mergedClsPrefix}-data-table-filter-menu__group`,
          value: this.radioGroupValue,
          onUpdateValue: this.handleChange
        }, {
          default: () => this.options.map((option) => h(__unplugin_components_0, {
            key: option.value,
            value: option.value,
            theme: mergedTheme.peers.Radio,
            themeOverrides: mergedTheme.peerOverrides.Radio
          }, {
            default: () => option.label
          }))
        });
      }
    }), h("div", {
      class: `${mergedClsPrefix}-data-table-filter-menu__action`
    }, h(Button, {
      size: "tiny",
      theme: mergedTheme.peers.Button,
      themeOverrides: mergedTheme.peerOverrides.Button,
      onClick: this.handleClearClick
    }, {
      default: () => locale.clear
    }), h(Button, {
      theme: mergedTheme.peers.Button,
      themeOverrides: mergedTheme.peerOverrides.Button,
      type: "primary",
      size: "tiny",
      onClick: this.handleConfirmClick
    }, {
      default: () => locale.confirm
    })));
  }
});
const RenderFilter = defineComponent({
  name: "DataTableRenderFilter",
  props: {
    render: {
      type: Function,
      required: true
    },
    active: {
      type: Boolean,
      default: false
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  render() {
    const {
      render: render2,
      active,
      show
    } = this;
    return render2({
      active,
      show
    });
  }
});
function createFilterState(currentFilterState, columnKey, mergedFilterValue) {
  const nextFilterState = Object.assign({}, currentFilterState);
  nextFilterState[columnKey] = mergedFilterValue;
  return nextFilterState;
}
const FilterButton = defineComponent({
  name: "DataTableFilterButton",
  props: {
    column: {
      type: Object,
      required: true
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    const {
      mergedComponentPropsRef
    } = useConfig();
    const {
      mergedThemeRef,
      mergedClsPrefixRef,
      mergedFilterStateRef,
      filterMenuCssVarsRef,
      paginationBehaviorOnFilterRef,
      doUpdatePage,
      doUpdateFilters,
      filterIconPopoverPropsRef
    } = inject(dataTableInjectionKey);
    const showPopoverRef = ref(false);
    const filterStateRef = mergedFilterStateRef;
    const filterMultipleRef = computed(() => {
      return props.column.filterMultiple !== false;
    });
    const mergedFilterValueRef = computed(() => {
      const filterValue = filterStateRef.value[props.column.key];
      if (filterValue === void 0) {
        const {
          value: multiple
        } = filterMultipleRef;
        if (multiple) return [];
        else return null;
      }
      return filterValue;
    });
    const activeRef = computed(() => {
      const {
        value: filterValue
      } = mergedFilterValueRef;
      if (Array.isArray(filterValue)) {
        return filterValue.length > 0;
      }
      return filterValue !== null;
    });
    const mergedRenderFilterRef = computed(() => {
      var _a, _b;
      return ((_b = (_a = mergedComponentPropsRef === null || mergedComponentPropsRef === void 0 ? void 0 : mergedComponentPropsRef.value) === null || _a === void 0 ? void 0 : _a.DataTable) === null || _b === void 0 ? void 0 : _b.renderFilter) || props.column.renderFilter;
    });
    function handleFilterChange(mergedFilterValue) {
      const nextFilterState = createFilterState(filterStateRef.value, props.column.key, mergedFilterValue);
      doUpdateFilters(nextFilterState, props.column);
      if (paginationBehaviorOnFilterRef.value === "first") {
        doUpdatePage(1);
      }
    }
    function handleFilterMenuCancel() {
      showPopoverRef.value = false;
    }
    function handleFilterMenuConfirm() {
      showPopoverRef.value = false;
    }
    return {
      mergedTheme: mergedThemeRef,
      mergedClsPrefix: mergedClsPrefixRef,
      active: activeRef,
      showPopover: showPopoverRef,
      mergedRenderFilter: mergedRenderFilterRef,
      filterIconPopoverProps: filterIconPopoverPropsRef,
      filterMultiple: filterMultipleRef,
      mergedFilterValue: mergedFilterValueRef,
      filterMenuCssVars: filterMenuCssVarsRef,
      handleFilterChange,
      handleFilterMenuConfirm,
      handleFilterMenuCancel
    };
  },
  render() {
    const {
      mergedTheme,
      mergedClsPrefix,
      handleFilterMenuCancel,
      filterIconPopoverProps
    } = this;
    return h(__unplugin_components_3, Object.assign({
      show: this.showPopover,
      onUpdateShow: (v) => this.showPopover = v,
      trigger: "click",
      theme: mergedTheme.peers.Popover,
      themeOverrides: mergedTheme.peerOverrides.Popover,
      placement: "bottom"
    }, filterIconPopoverProps, {
      style: {
        padding: 0
      }
    }), {
      trigger: () => {
        const {
          mergedRenderFilter
        } = this;
        if (mergedRenderFilter) {
          return h(RenderFilter, {
            "data-data-table-filter": true,
            render: mergedRenderFilter,
            active: this.active,
            show: this.showPopover
          });
        }
        const {
          renderFilterIcon
        } = this.column;
        return h("div", {
          "data-data-table-filter": true,
          class: [`${mergedClsPrefix}-data-table-filter`, {
            [`${mergedClsPrefix}-data-table-filter--active`]: this.active,
            [`${mergedClsPrefix}-data-table-filter--show`]: this.showPopover
          }]
        }, renderFilterIcon ? renderFilterIcon({
          active: this.active,
          show: this.showPopover
        }) : h(NBaseIcon, {
          clsPrefix: mergedClsPrefix
        }, {
          default: () => h(FilterIcon, null)
        }));
      },
      default: () => {
        const {
          renderFilterMenu
        } = this.column;
        return renderFilterMenu ? renderFilterMenu({
          hide: handleFilterMenuCancel
        }) : h(NDataTableFilterMenu, {
          style: this.filterMenuCssVars,
          radioGroupName: String(this.column.key),
          multiple: this.filterMultiple,
          value: this.mergedFilterValue,
          options: this.options,
          column: this.column,
          onChange: this.handleFilterChange,
          onClear: this.handleFilterMenuCancel,
          onConfirm: this.handleFilterMenuConfirm
        });
      }
    });
  }
});
const ResizeButton = defineComponent({
  name: "ColumnResizeButton",
  props: {
    onResizeStart: Function,
    onResize: Function,
    onResizeEnd: Function
  },
  setup(props) {
    const {
      mergedClsPrefixRef
    } = inject(dataTableInjectionKey);
    const activeRef = ref(false);
    let startX = 0;
    function getMouseX(e) {
      return e.clientX;
    }
    function handleMousedown(e) {
      var _a;
      e.preventDefault();
      const alreadyStarted = activeRef.value;
      startX = getMouseX(e);
      activeRef.value = true;
      if (!alreadyStarted) {
        on("mousemove", window, handleMousemove);
        on("mouseup", window, handleMouseup);
        (_a = props.onResizeStart) === null || _a === void 0 ? void 0 : _a.call(props);
      }
    }
    function handleMousemove(e) {
      var _a;
      (_a = props.onResize) === null || _a === void 0 ? void 0 : _a.call(props, getMouseX(e) - startX);
    }
    function handleMouseup() {
      var _a;
      activeRef.value = false;
      (_a = props.onResizeEnd) === null || _a === void 0 ? void 0 : _a.call(props);
      off("mousemove", window, handleMousemove);
      off("mouseup", window, handleMouseup);
    }
    onBeforeUnmount(() => {
      off("mousemove", window, handleMousemove);
      off("mouseup", window, handleMouseup);
    });
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      active: activeRef,
      handleMousedown
    };
  },
  render() {
    const {
      mergedClsPrefix
    } = this;
    return h("span", {
      "data-data-table-resizable": true,
      class: [`${mergedClsPrefix}-data-table-resize-button`, this.active && `${mergedClsPrefix}-data-table-resize-button--active`],
      onMousedown: this.handleMousedown
    });
  }
});
const RenderSorter = defineComponent({
  name: "DataTableRenderSorter",
  props: {
    render: {
      type: Function,
      required: true
    },
    order: {
      // asc, desc
      type: [String, Boolean],
      default: false
    }
  },
  render() {
    const {
      render: render2,
      order
    } = this;
    return render2({
      order
    });
  }
});
const SortButton = defineComponent({
  name: "SortIcon",
  props: {
    column: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const {
      mergedComponentPropsRef
    } = useConfig();
    const {
      mergedSortStateRef,
      mergedClsPrefixRef
    } = inject(dataTableInjectionKey);
    const sortStateRef = computed(() => mergedSortStateRef.value.find((state) => state.columnKey === props.column.key));
    const activeRef = computed(() => {
      return sortStateRef.value !== void 0;
    });
    const mergedSortOrderRef = computed(() => {
      const {
        value: sortState
      } = sortStateRef;
      if (sortState && activeRef.value) {
        return sortState.order;
      }
      return false;
    });
    const mergedRenderSorterRef = computed(() => {
      var _a, _b;
      return ((_b = (_a = mergedComponentPropsRef === null || mergedComponentPropsRef === void 0 ? void 0 : mergedComponentPropsRef.value) === null || _a === void 0 ? void 0 : _a.DataTable) === null || _b === void 0 ? void 0 : _b.renderSorter) || props.column.renderSorter;
    });
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      active: activeRef,
      mergedSortOrder: mergedSortOrderRef,
      mergedRenderSorter: mergedRenderSorterRef
    };
  },
  render() {
    const {
      mergedRenderSorter,
      mergedSortOrder,
      mergedClsPrefix
    } = this;
    const {
      renderSorterIcon
    } = this.column;
    return mergedRenderSorter ? h(RenderSorter, {
      render: mergedRenderSorter,
      order: mergedSortOrder
    }) : h("span", {
      class: [`${mergedClsPrefix}-data-table-sorter`, mergedSortOrder === "ascend" && `${mergedClsPrefix}-data-table-sorter--asc`, mergedSortOrder === "descend" && `${mergedClsPrefix}-data-table-sorter--desc`]
    }, renderSorterIcon ? renderSorterIcon({
      order: mergedSortOrder
    }) : h(NBaseIcon, {
      clsPrefix: mergedClsPrefix
    }, {
      default: () => h(ArrowDownIcon, null)
    }));
  }
});
const allKey = "_n_all__";
const noneKey = "_n_none__";
function createSelectHandler(options, rawPaginatedDataRef, doCheckAll, doUncheckAll) {
  if (!options) return () => {
  };
  return (key) => {
    for (const option of options) {
      switch (key) {
        case allKey:
          doCheckAll(true);
          return;
        case noneKey:
          doUncheckAll(true);
          return;
        default:
          if (typeof option === "object" && option.key === key) {
            option.onSelect(rawPaginatedDataRef.value);
            return;
          }
      }
    }
  };
}
function createDropdownOptions(options, localeRef) {
  if (!options) return [];
  return options.map((option) => {
    switch (option) {
      case "all":
        return {
          label: localeRef.checkTableAll,
          key: allKey
        };
      case "none":
        return {
          label: localeRef.uncheckTableAll,
          key: noneKey
        };
      default:
        return option;
    }
  });
}
const SelectionMenu = defineComponent({
  name: "DataTableSelectionMenu",
  props: {
    clsPrefix: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const {
      props: dataTableProps2,
      localeRef,
      checkOptionsRef,
      rawPaginatedDataRef,
      doCheckAll,
      doUncheckAll
    } = inject(dataTableInjectionKey);
    const handleSelectRef = computed(() => createSelectHandler(checkOptionsRef.value, rawPaginatedDataRef, doCheckAll, doUncheckAll));
    const optionsRef = computed(() => createDropdownOptions(checkOptionsRef.value, localeRef.value));
    return () => {
      var _a, _b, _c, _d;
      const {
        clsPrefix
      } = props;
      return h(__unplugin_components_2$2, {
        theme: (_b = (_a = dataTableProps2.theme) === null || _a === void 0 ? void 0 : _a.peers) === null || _b === void 0 ? void 0 : _b.Dropdown,
        themeOverrides: (_d = (_c = dataTableProps2.themeOverrides) === null || _c === void 0 ? void 0 : _c.peers) === null || _d === void 0 ? void 0 : _d.Dropdown,
        options: optionsRef.value,
        onSelect: handleSelectRef.value
      }, {
        default: () => h(NBaseIcon, {
          clsPrefix,
          class: `${clsPrefix}-data-table-check-extra`
        }, {
          default: () => h(ChevronDownIcon, null)
        })
      });
    };
  }
});
function renderTitle(column) {
  return typeof column.title === "function" ? column.title(column) : column.title;
}
const VirtualListItemWrapper$1 = defineComponent({
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    cols: {
      type: Array,
      required: true
    },
    width: String
  },
  render() {
    const {
      clsPrefix,
      id,
      cols,
      width
    } = this;
    return h("table", {
      style: {
        tableLayout: "fixed",
        width
      },
      class: `${clsPrefix}-data-table-table`
    }, h("colgroup", null, cols.map((col) => h("col", {
      key: col.key,
      style: col.style
    }))), h("thead", {
      "data-n-id": id,
      class: `${clsPrefix}-data-table-thead`
    }, this.$slots));
  }
});
const TableHeader = defineComponent({
  name: "DataTableHeader",
  props: {
    discrete: {
      type: Boolean,
      default: true
    }
  },
  setup() {
    const {
      mergedClsPrefixRef,
      scrollXRef,
      fixedColumnLeftMapRef,
      fixedColumnRightMapRef,
      mergedCurrentPageRef,
      allRowsCheckedRef,
      someRowsCheckedRef,
      rowsRef,
      colsRef,
      mergedThemeRef,
      checkOptionsRef,
      mergedSortStateRef,
      componentId,
      mergedTableLayoutRef,
      headerCheckboxDisabledRef,
      virtualScrollHeaderRef,
      headerHeightRef,
      onUnstableColumnResize,
      doUpdateResizableWidth,
      handleTableHeaderScroll,
      deriveNextSorter,
      doUncheckAll,
      doCheckAll
    } = inject(dataTableInjectionKey);
    const virtualListRef = ref();
    const cellElsRef = ref({});
    function getCellActualWidth(key) {
      const element = cellElsRef.value[key];
      return element === null || element === void 0 ? void 0 : element.getBoundingClientRect().width;
    }
    function handleCheckboxUpdateChecked() {
      if (allRowsCheckedRef.value) {
        doUncheckAll();
      } else {
        doCheckAll();
      }
    }
    function handleColHeaderClick(e, column) {
      if (happensIn(e, "dataTableFilter") || happensIn(e, "dataTableResizable")) {
        return;
      }
      if (!isColumnSortable(column)) return;
      const activeSorter = mergedSortStateRef.value.find((state) => state.columnKey === column.key) || null;
      const nextSorter = createNextSorter(column, activeSorter);
      deriveNextSorter(nextSorter);
    }
    const resizeStartWidthMap = /* @__PURE__ */ new Map();
    function handleColumnResizeStart(column) {
      resizeStartWidthMap.set(column.key, getCellActualWidth(column.key));
    }
    function handleColumnResize(column, displacementX) {
      const startWidth = resizeStartWidthMap.get(column.key);
      if (startWidth === void 0) {
        return;
      }
      const widthAfterResize = startWidth + displacementX;
      const limitWidth = clampValueFollowCSSRules(widthAfterResize, column.minWidth, column.maxWidth);
      onUnstableColumnResize(widthAfterResize, limitWidth, column, getCellActualWidth);
      doUpdateResizableWidth(column, limitWidth);
    }
    return {
      cellElsRef,
      componentId,
      mergedSortState: mergedSortStateRef,
      mergedClsPrefix: mergedClsPrefixRef,
      scrollX: scrollXRef,
      fixedColumnLeftMap: fixedColumnLeftMapRef,
      fixedColumnRightMap: fixedColumnRightMapRef,
      currentPage: mergedCurrentPageRef,
      allRowsChecked: allRowsCheckedRef,
      someRowsChecked: someRowsCheckedRef,
      rows: rowsRef,
      cols: colsRef,
      mergedTheme: mergedThemeRef,
      checkOptions: checkOptionsRef,
      mergedTableLayout: mergedTableLayoutRef,
      headerCheckboxDisabled: headerCheckboxDisabledRef,
      headerHeight: headerHeightRef,
      virtualScrollHeader: virtualScrollHeaderRef,
      virtualListRef,
      handleCheckboxUpdateChecked,
      handleColHeaderClick,
      handleTableHeaderScroll,
      handleColumnResizeStart,
      handleColumnResize
    };
  },
  render() {
    const {
      cellElsRef,
      mergedClsPrefix,
      fixedColumnLeftMap,
      fixedColumnRightMap,
      currentPage,
      allRowsChecked,
      someRowsChecked,
      rows,
      cols,
      mergedTheme,
      checkOptions,
      componentId,
      discrete,
      mergedTableLayout,
      headerCheckboxDisabled,
      mergedSortState,
      virtualScrollHeader,
      handleColHeaderClick,
      handleCheckboxUpdateChecked,
      handleColumnResizeStart,
      handleColumnResize
    } = this;
    const renderRow = (row, getLeft, headerHeightPx) => row.map(({
      column,
      colIndex,
      colSpan,
      rowSpan,
      isLast
    }) => {
      var _a, _b;
      const key = getColKey(column);
      const {
        ellipsis
      } = column;
      const createColumnVNode = () => {
        if (column.type === "selection") {
          return column.multiple !== false ? h(Fragment, null, h(__unplugin_components_1$1, {
            key: currentPage,
            privateInsideTable: true,
            checked: allRowsChecked,
            indeterminate: someRowsChecked,
            disabled: headerCheckboxDisabled,
            onUpdateChecked: handleCheckboxUpdateChecked
          }), checkOptions ? h(SelectionMenu, {
            clsPrefix: mergedClsPrefix
          }) : null) : null;
        }
        return h(Fragment, null, h("div", {
          class: `${mergedClsPrefix}-data-table-th__title-wrapper`
        }, h("div", {
          class: `${mergedClsPrefix}-data-table-th__title`
        }, ellipsis === true || ellipsis && !ellipsis.tooltip ? h("div", {
          class: `${mergedClsPrefix}-data-table-th__ellipsis`
        }, renderTitle(column)) : ellipsis && typeof ellipsis === "object" ? h(NEllipsis, Object.assign({}, ellipsis, {
          theme: mergedTheme.peers.Ellipsis,
          themeOverrides: mergedTheme.peerOverrides.Ellipsis
        }), {
          default: () => renderTitle(column)
        }) : renderTitle(column)), isColumnSortable(column) ? h(SortButton, {
          column
        }) : null), isColumnFilterable(column) ? h(FilterButton, {
          column,
          options: column.filterOptions
        }) : null, isColumnResizable(column) ? h(ResizeButton, {
          onResizeStart: () => {
            handleColumnResizeStart(column);
          },
          onResize: (displacementX) => {
            handleColumnResize(column, displacementX);
          }
        }) : null);
      };
      const leftFixed = key in fixedColumnLeftMap;
      const rightFixed = key in fixedColumnRightMap;
      const CellComponent = getLeft && !column.fixed ? "div" : "th";
      return h(CellComponent, {
        ref: (el) => cellElsRef[key] = el,
        key,
        style: [getLeft && !column.fixed ? {
          position: "absolute",
          left: pxfy(getLeft(colIndex)),
          top: 0,
          bottom: 0
        } : {
          left: pxfy((_a = fixedColumnLeftMap[key]) === null || _a === void 0 ? void 0 : _a.start),
          right: pxfy((_b = fixedColumnRightMap[key]) === null || _b === void 0 ? void 0 : _b.start)
        }, {
          width: pxfy(column.width),
          textAlign: column.titleAlign || column.align,
          height: headerHeightPx
        }],
        colspan: colSpan,
        rowspan: rowSpan,
        "data-col-key": key,
        class: [`${mergedClsPrefix}-data-table-th`, (leftFixed || rightFixed) && `${mergedClsPrefix}-data-table-th--fixed-${leftFixed ? "left" : "right"}`, {
          [`${mergedClsPrefix}-data-table-th--sorting`]: isColumnSorting(column, mergedSortState),
          [`${mergedClsPrefix}-data-table-th--filterable`]: isColumnFilterable(column),
          [`${mergedClsPrefix}-data-table-th--sortable`]: isColumnSortable(column),
          [`${mergedClsPrefix}-data-table-th--selection`]: column.type === "selection",
          [`${mergedClsPrefix}-data-table-th--last`]: isLast
        }, column.className],
        onClick: column.type !== "selection" && column.type !== "expand" && !("children" in column) ? (e) => {
          handleColHeaderClick(e, column);
        } : void 0
      }, createColumnVNode());
    });
    if (virtualScrollHeader) {
      const {
        headerHeight
      } = this;
      let leftFixedColsCount = 0;
      let rightFixedColsCount = 0;
      cols.forEach((col) => {
        if (col.column.fixed === "left") {
          leftFixedColsCount++;
        } else if (col.column.fixed === "right") {
          rightFixedColsCount++;
        }
      });
      return h(VVirtualList, {
        ref: "virtualListRef",
        class: `${mergedClsPrefix}-data-table-base-table-header`,
        style: {
          height: pxfy(headerHeight)
        },
        onScroll: this.handleTableHeaderScroll,
        columns: cols,
        itemSize: headerHeight,
        showScrollbar: false,
        items: [{}],
        itemResizable: false,
        visibleItemsTag: VirtualListItemWrapper$1,
        visibleItemsProps: {
          clsPrefix: mergedClsPrefix,
          id: componentId,
          cols,
          width: formatLength(this.scrollX)
        },
        renderItemWithCols: ({
          startColIndex,
          endColIndex,
          getLeft
        }) => {
          const row = cols.map((col, index) => {
            return {
              column: col.column,
              isLast: index === cols.length - 1,
              colIndex: col.index,
              colSpan: 1,
              rowSpan: 1
            };
          }).filter(({
            column
          }, index) => {
            if (startColIndex <= index && index <= endColIndex) {
              return true;
            }
            if (column.fixed) {
              return true;
            }
            return false;
          });
          const cells = renderRow(row, getLeft, pxfy(headerHeight));
          cells.splice(leftFixedColsCount, 0, h("th", {
            colspan: cols.length - leftFixedColsCount - rightFixedColsCount,
            style: {
              pointerEvents: "none",
              visibility: "hidden",
              height: 0
            }
          }));
          return h("tr", {
            style: {
              position: "relative"
            }
          }, cells);
        }
      }, {
        default: ({
          renderedItemWithCols
        }) => renderedItemWithCols
      });
    }
    const theadVNode = h("thead", {
      class: `${mergedClsPrefix}-data-table-thead`,
      "data-n-id": componentId
    }, rows.map((row) => {
      return h("tr", {
        class: `${mergedClsPrefix}-data-table-tr`
      }, renderRow(row, null, void 0));
    }));
    if (!discrete) {
      return theadVNode;
    }
    const {
      handleTableHeaderScroll,
      scrollX
    } = this;
    return h("div", {
      class: `${mergedClsPrefix}-data-table-base-table-header`,
      onScroll: handleTableHeaderScroll
    }, h("table", {
      class: `${mergedClsPrefix}-data-table-table`,
      style: {
        minWidth: formatLength(scrollX),
        tableLayout: mergedTableLayout
      }
    }, h("colgroup", null, cols.map((col) => h("col", {
      key: col.key,
      style: col.style
    }))), theadVNode));
  }
});
function flatten(rowInfos, expandedRowKeys) {
  const fRows = [];
  function traverse(rs, rootIndex) {
    rs.forEach((r) => {
      if (r.children && expandedRowKeys.has(r.key)) {
        fRows.push({
          tmNode: r,
          striped: false,
          key: r.key,
          index: rootIndex
        });
        traverse(r.children, rootIndex);
      } else {
        fRows.push({
          key: r.key,
          tmNode: r,
          striped: false,
          index: rootIndex
        });
      }
    });
  }
  rowInfos.forEach((rowInfo) => {
    fRows.push(rowInfo);
    const {
      children
    } = rowInfo.tmNode;
    if (children && expandedRowKeys.has(rowInfo.key)) {
      traverse(children, rowInfo.index);
    }
  });
  return fRows;
}
const VirtualListItemWrapper = defineComponent({
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    cols: {
      type: Array,
      required: true
    },
    onMouseenter: Function,
    onMouseleave: Function
  },
  render() {
    const {
      clsPrefix,
      id,
      cols,
      onMouseenter,
      onMouseleave
    } = this;
    return h("table", {
      style: {
        tableLayout: "fixed"
      },
      class: `${clsPrefix}-data-table-table`,
      onMouseenter,
      onMouseleave
    }, h("colgroup", null, cols.map((col) => h("col", {
      key: col.key,
      style: col.style
    }))), h("tbody", {
      "data-n-id": id,
      class: `${clsPrefix}-data-table-tbody`
    }, this.$slots));
  }
});
const TableBody = defineComponent({
  name: "DataTableBody",
  props: {
    onResize: Function,
    showHeader: Boolean,
    flexHeight: Boolean,
    bodyStyle: Object
  },
  setup(props) {
    const {
      slots: dataTableSlots,
      bodyWidthRef,
      mergedExpandedRowKeysRef,
      mergedClsPrefixRef,
      mergedThemeRef,
      scrollXRef,
      colsRef,
      paginatedDataRef,
      rawPaginatedDataRef,
      fixedColumnLeftMapRef,
      fixedColumnRightMapRef,
      mergedCurrentPageRef,
      rowClassNameRef,
      leftActiveFixedColKeyRef,
      leftActiveFixedChildrenColKeysRef,
      rightActiveFixedColKeyRef,
      rightActiveFixedChildrenColKeysRef,
      renderExpandRef,
      hoverKeyRef,
      summaryRef,
      mergedSortStateRef,
      virtualScrollRef,
      virtualScrollXRef,
      heightForRowRef,
      minRowHeightRef,
      componentId,
      mergedTableLayoutRef,
      childTriggerColIndexRef,
      indentRef,
      rowPropsRef,
      maxHeightRef,
      stripedRef,
      loadingRef,
      onLoadRef,
      loadingKeySetRef,
      expandableRef,
      stickyExpandedRowsRef,
      renderExpandIconRef,
      summaryPlacementRef,
      treeMateRef,
      scrollbarPropsRef,
      setHeaderScrollLeft,
      doUpdateExpandedRowKeys,
      handleTableBodyScroll,
      doCheck,
      doUncheck,
      renderCell
    } = inject(dataTableInjectionKey);
    const NConfigProvider = inject(configProviderInjectionKey);
    const scrollbarInstRef = ref(null);
    const virtualListRef = ref(null);
    const emptyElRef = ref(null);
    const emptyRef = useMemo(() => paginatedDataRef.value.length === 0);
    const shouldDisplaySomeTablePartRef = useMemo(() => props.showHeader || !emptyRef.value);
    const bodyShowHeaderOnlyRef = useMemo(() => {
      return props.showHeader || emptyRef.value;
    });
    let lastSelectedKey = "";
    const mergedExpandedRowKeySetRef = computed(() => {
      return new Set(mergedExpandedRowKeysRef.value);
    });
    function getRowInfo(key) {
      var _a;
      return (_a = treeMateRef.value.getNode(key)) === null || _a === void 0 ? void 0 : _a.rawNode;
    }
    function handleCheckboxUpdateChecked(tmNode, checked, shiftKey) {
      const rowInfo = getRowInfo(tmNode.key);
      if (!rowInfo) {
        warn("data-table", `fail to get row data with key ${tmNode.key}`);
        return;
      }
      if (shiftKey) {
        const lastIndex = paginatedDataRef.value.findIndex((item) => item.key === lastSelectedKey);
        if (lastIndex !== -1) {
          const currentIndex = paginatedDataRef.value.findIndex((item) => item.key === tmNode.key);
          const start = Math.min(lastIndex, currentIndex);
          const end = Math.max(lastIndex, currentIndex);
          const rowKeysToCheck = [];
          paginatedDataRef.value.slice(start, end + 1).forEach((r) => {
            if (!r.disabled) {
              rowKeysToCheck.push(r.key);
            }
          });
          if (checked) {
            doCheck(rowKeysToCheck, false, rowInfo);
          } else {
            doUncheck(rowKeysToCheck, rowInfo);
          }
          lastSelectedKey = tmNode.key;
          return;
        }
      }
      if (checked) {
        doCheck(tmNode.key, false, rowInfo);
      } else {
        doUncheck(tmNode.key, rowInfo);
      }
      lastSelectedKey = tmNode.key;
    }
    function handleRadioUpdateChecked(tmNode) {
      const rowInfo = getRowInfo(tmNode.key);
      if (!rowInfo) {
        warn("data-table", `fail to get row data with key ${tmNode.key}`);
        return;
      }
      doCheck(tmNode.key, true, rowInfo);
    }
    function getScrollContainer() {
      if (!shouldDisplaySomeTablePartRef.value) {
        const {
          value: emptyEl
        } = emptyElRef;
        if (emptyEl) {
          return emptyEl;
        } else {
          return null;
        }
      }
      if (virtualScrollRef.value) {
        return virtualListContainer();
      }
      const {
        value
      } = scrollbarInstRef;
      if (value) return value.containerRef;
      return null;
    }
    function handleUpdateExpanded(key, tmNode) {
      var _a;
      if (loadingKeySetRef.value.has(key)) return;
      const {
        value: mergedExpandedRowKeys
      } = mergedExpandedRowKeysRef;
      const index = mergedExpandedRowKeys.indexOf(key);
      const nextExpandedKeys = Array.from(mergedExpandedRowKeys);
      if (~index) {
        nextExpandedKeys.splice(index, 1);
        doUpdateExpandedRowKeys(nextExpandedKeys);
      } else {
        if (tmNode && !tmNode.isLeaf && !tmNode.shallowLoaded) {
          loadingKeySetRef.value.add(key);
          void ((_a = onLoadRef.value) === null || _a === void 0 ? void 0 : _a.call(onLoadRef, tmNode.rawNode).then(() => {
            const {
              value: futureMergedExpandedRowKeys
            } = mergedExpandedRowKeysRef;
            const futureNextExpandedKeys = Array.from(futureMergedExpandedRowKeys);
            const index2 = futureNextExpandedKeys.indexOf(key);
            if (!~index2) {
              futureNextExpandedKeys.push(key);
            }
            doUpdateExpandedRowKeys(futureNextExpandedKeys);
          }).finally(() => {
            loadingKeySetRef.value.delete(key);
          }));
        } else {
          nextExpandedKeys.push(key);
          doUpdateExpandedRowKeys(nextExpandedKeys);
        }
      }
    }
    function handleMouseleaveTable() {
      hoverKeyRef.value = null;
    }
    function virtualListContainer() {
      const {
        value
      } = virtualListRef;
      return (value === null || value === void 0 ? void 0 : value.listElRef) || null;
    }
    function virtualListContent() {
      const {
        value
      } = virtualListRef;
      return (value === null || value === void 0 ? void 0 : value.itemsElRef) || null;
    }
    function handleVirtualListScroll(e) {
      var _a;
      handleTableBodyScroll(e);
      (_a = scrollbarInstRef.value) === null || _a === void 0 ? void 0 : _a.sync();
    }
    function handleVirtualListResize(e) {
      var _a;
      const {
        onResize
      } = props;
      if (onResize) onResize(e);
      (_a = scrollbarInstRef.value) === null || _a === void 0 ? void 0 : _a.sync();
    }
    const exposedMethods = {
      getScrollContainer,
      scrollTo(arg0, arg1) {
        var _a, _b;
        if (virtualScrollRef.value) {
          (_a = virtualListRef.value) === null || _a === void 0 ? void 0 : _a.scrollTo(arg0, arg1);
        } else {
          (_b = scrollbarInstRef.value) === null || _b === void 0 ? void 0 : _b.scrollTo(arg0, arg1);
        }
      }
    };
    const style2 = c$1([({
      props: cProps
    }) => {
      const createActiveLeftFixedStyle = (leftActiveFixedColKey) => {
        if (leftActiveFixedColKey === null) return null;
        return c$1(`[data-n-id="${cProps.componentId}"] [data-col-key="${leftActiveFixedColKey}"]::after`, {
          boxShadow: "var(--n-box-shadow-after)"
        });
      };
      const createActiveRightFixedStyle = (rightActiveFixedColKey) => {
        if (rightActiveFixedColKey === null) return null;
        return c$1(`[data-n-id="${cProps.componentId}"] [data-col-key="${rightActiveFixedColKey}"]::before`, {
          boxShadow: "var(--n-box-shadow-before)"
        });
      };
      return c$1([createActiveLeftFixedStyle(cProps.leftActiveFixedColKey), createActiveRightFixedStyle(cProps.rightActiveFixedColKey), cProps.leftActiveFixedChildrenColKeys.map((leftActiveFixedColKey) => createActiveLeftFixedStyle(leftActiveFixedColKey)), cProps.rightActiveFixedChildrenColKeys.map((rightActiveFixedColKey) => createActiveRightFixedStyle(rightActiveFixedColKey))]);
    }]);
    let fixedStyleMounted = false;
    watchEffect(() => {
      const {
        value: leftActiveFixedColKey
      } = leftActiveFixedColKeyRef;
      const {
        value: leftActiveFixedChildrenColKeys
      } = leftActiveFixedChildrenColKeysRef;
      const {
        value: rightActiveFixedColKey
      } = rightActiveFixedColKeyRef;
      const {
        value: rightActiveFixedChildrenColKeys
      } = rightActiveFixedChildrenColKeysRef;
      if (!fixedStyleMounted && leftActiveFixedColKey === null && rightActiveFixedColKey === null) {
        return;
      }
      const cProps = {
        leftActiveFixedColKey,
        leftActiveFixedChildrenColKeys,
        rightActiveFixedColKey,
        rightActiveFixedChildrenColKeys,
        componentId
      };
      style2.mount({
        id: `n-${componentId}`,
        force: true,
        props: cProps,
        anchorMetaName: cssrAnchorMetaName$1,
        parent: NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.styleMountTarget
      });
      fixedStyleMounted = true;
    });
    onUnmounted(() => {
      style2.unmount({
        id: `n-${componentId}`,
        parent: NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.styleMountTarget
      });
    });
    return Object.assign({
      bodyWidth: bodyWidthRef,
      summaryPlacement: summaryPlacementRef,
      dataTableSlots,
      componentId,
      scrollbarInstRef,
      virtualListRef,
      emptyElRef,
      summary: summaryRef,
      mergedClsPrefix: mergedClsPrefixRef,
      mergedTheme: mergedThemeRef,
      scrollX: scrollXRef,
      cols: colsRef,
      loading: loadingRef,
      bodyShowHeaderOnly: bodyShowHeaderOnlyRef,
      shouldDisplaySomeTablePart: shouldDisplaySomeTablePartRef,
      empty: emptyRef,
      paginatedDataAndInfo: computed(() => {
        const {
          value: striped
        } = stripedRef;
        let hasChildren = false;
        const data = paginatedDataRef.value.map(striped ? (tmNode, index) => {
          if (!tmNode.isLeaf) hasChildren = true;
          return {
            tmNode,
            key: tmNode.key,
            striped: index % 2 === 1,
            index
          };
        } : (tmNode, index) => {
          if (!tmNode.isLeaf) hasChildren = true;
          return {
            tmNode,
            key: tmNode.key,
            striped: false,
            index
          };
        });
        return {
          data,
          hasChildren
        };
      }),
      rawPaginatedData: rawPaginatedDataRef,
      fixedColumnLeftMap: fixedColumnLeftMapRef,
      fixedColumnRightMap: fixedColumnRightMapRef,
      currentPage: mergedCurrentPageRef,
      rowClassName: rowClassNameRef,
      renderExpand: renderExpandRef,
      mergedExpandedRowKeySet: mergedExpandedRowKeySetRef,
      hoverKey: hoverKeyRef,
      mergedSortState: mergedSortStateRef,
      virtualScroll: virtualScrollRef,
      virtualScrollX: virtualScrollXRef,
      heightForRow: heightForRowRef,
      minRowHeight: minRowHeightRef,
      mergedTableLayout: mergedTableLayoutRef,
      childTriggerColIndex: childTriggerColIndexRef,
      indent: indentRef,
      rowProps: rowPropsRef,
      maxHeight: maxHeightRef,
      loadingKeySet: loadingKeySetRef,
      expandable: expandableRef,
      stickyExpandedRows: stickyExpandedRowsRef,
      renderExpandIcon: renderExpandIconRef,
      scrollbarProps: scrollbarPropsRef,
      setHeaderScrollLeft,
      handleVirtualListScroll,
      handleVirtualListResize,
      handleMouseleaveTable,
      virtualListContainer,
      virtualListContent,
      handleTableBodyScroll,
      handleCheckboxUpdateChecked,
      handleRadioUpdateChecked,
      handleUpdateExpanded,
      renderCell
    }, exposedMethods);
  },
  render() {
    const {
      mergedTheme,
      scrollX,
      mergedClsPrefix,
      virtualScroll,
      maxHeight,
      mergedTableLayout,
      flexHeight,
      loadingKeySet,
      onResize,
      setHeaderScrollLeft
    } = this;
    const scrollable = scrollX !== void 0 || maxHeight !== void 0 || flexHeight;
    const isBasicAutoLayout = !scrollable && mergedTableLayout === "auto";
    const xScrollable = scrollX !== void 0 || isBasicAutoLayout;
    const contentStyle = {
      minWidth: formatLength(scrollX) || "100%"
    };
    if (scrollX) contentStyle.width = "100%";
    const tableNode = h(Scrollbar, Object.assign({}, this.scrollbarProps, {
      ref: "scrollbarInstRef",
      scrollable: scrollable || isBasicAutoLayout,
      class: `${mergedClsPrefix}-data-table-base-table-body`,
      style: !this.empty ? this.bodyStyle : void 0,
      theme: mergedTheme.peers.Scrollbar,
      themeOverrides: mergedTheme.peerOverrides.Scrollbar,
      contentStyle,
      container: virtualScroll ? this.virtualListContainer : void 0,
      content: virtualScroll ? this.virtualListContent : void 0,
      horizontalRailStyle: {
        zIndex: 3
      },
      verticalRailStyle: {
        zIndex: 3
      },
      xScrollable,
      onScroll: virtualScroll ? void 0 : this.handleTableBodyScroll,
      internalOnUpdateScrollLeft: setHeaderScrollLeft,
      onResize
    }), {
      default: () => {
        const cordToPass = {};
        const cordKey = {};
        const {
          cols,
          paginatedDataAndInfo,
          mergedTheme: mergedTheme2,
          fixedColumnLeftMap,
          fixedColumnRightMap,
          currentPage,
          rowClassName,
          mergedSortState,
          mergedExpandedRowKeySet,
          stickyExpandedRows,
          componentId,
          childTriggerColIndex,
          expandable,
          rowProps,
          handleMouseleaveTable,
          renderExpand,
          summary,
          handleCheckboxUpdateChecked,
          handleRadioUpdateChecked,
          handleUpdateExpanded,
          heightForRow,
          minRowHeight,
          virtualScrollX
        } = this;
        const {
          length: colCount
        } = cols;
        let mergedData;
        const {
          data: paginatedData,
          hasChildren
        } = paginatedDataAndInfo;
        const mergedPaginationData = hasChildren ? flatten(paginatedData, mergedExpandedRowKeySet) : paginatedData;
        if (summary) {
          const summaryRows = summary(this.rawPaginatedData);
          if (Array.isArray(summaryRows)) {
            const summaryRowData = summaryRows.map((row, i) => ({
              isSummaryRow: true,
              key: `__n_summary__${i}`,
              tmNode: {
                rawNode: row,
                disabled: true
              },
              index: -1
            }));
            mergedData = this.summaryPlacement === "top" ? [...summaryRowData, ...mergedPaginationData] : [...mergedPaginationData, ...summaryRowData];
          } else {
            const summaryRowData = {
              isSummaryRow: true,
              key: "__n_summary__",
              tmNode: {
                rawNode: summaryRows,
                disabled: true
              },
              index: -1
            };
            mergedData = this.summaryPlacement === "top" ? [summaryRowData, ...mergedPaginationData] : [...mergedPaginationData, summaryRowData];
          }
        } else {
          mergedData = mergedPaginationData;
        }
        const indentStyle = hasChildren ? {
          width: pxfy(this.indent)
        } : void 0;
        const displayedData = [];
        mergedData.forEach((rowInfo) => {
          if (renderExpand && mergedExpandedRowKeySet.has(rowInfo.key) && (!expandable || expandable(rowInfo.tmNode.rawNode))) {
            displayedData.push(rowInfo, {
              isExpandedRow: true,
              key: `${rowInfo.key}-expand`,
              // solve key repeat of the expanded row
              tmNode: rowInfo.tmNode,
              index: rowInfo.index
            });
          } else {
            displayedData.push(rowInfo);
          }
        });
        const {
          length: rowCount
        } = displayedData;
        const rowIndexToKey = {};
        paginatedData.forEach(({
          tmNode
        }, rowIndex) => {
          rowIndexToKey[rowIndex] = tmNode.key;
        });
        const bodyWidth = stickyExpandedRows ? this.bodyWidth : null;
        const bodyWidthPx = bodyWidth === null ? void 0 : `${bodyWidth}px`;
        const CellComponent = this.virtualScrollX ? "div" : "td";
        let leftFixedColsCount = 0;
        let rightFixedColsCount = 0;
        if (virtualScrollX) {
          cols.forEach((col) => {
            if (col.column.fixed === "left") {
              leftFixedColsCount++;
            } else if (col.column.fixed === "right") {
              rightFixedColsCount++;
            }
          });
        }
        const renderRow = ({
          // Normal
          rowInfo,
          displayedRowIndex,
          isVirtual,
          // Virtual X
          isVirtualX,
          startColIndex,
          endColIndex,
          getLeft
        }) => {
          const {
            index: actualRowIndex
          } = rowInfo;
          if ("isExpandedRow" in rowInfo) {
            const {
              tmNode: {
                key,
                rawNode
              }
            } = rowInfo;
            return h("tr", {
              class: `${mergedClsPrefix}-data-table-tr ${mergedClsPrefix}-data-table-tr--expanded`,
              key: `${key}__expand`
            }, h("td", {
              class: [`${mergedClsPrefix}-data-table-td`, `${mergedClsPrefix}-data-table-td--last-col`, displayedRowIndex + 1 === rowCount && `${mergedClsPrefix}-data-table-td--last-row`],
              colspan: colCount
            }, stickyExpandedRows ? h("div", {
              class: `${mergedClsPrefix}-data-table-expand`,
              style: {
                width: bodyWidthPx
              }
            }, renderExpand(rawNode, actualRowIndex)) : renderExpand(rawNode, actualRowIndex)));
          }
          const isSummary = "isSummaryRow" in rowInfo;
          const striped = !isSummary && rowInfo.striped;
          const {
            tmNode,
            key: rowKey
          } = rowInfo;
          const {
            rawNode: rowData
          } = tmNode;
          const expanded = mergedExpandedRowKeySet.has(rowKey);
          const props = rowProps ? rowProps(rowData, actualRowIndex) : void 0;
          const mergedRowClassName = typeof rowClassName === "string" ? rowClassName : createRowClassName(rowData, actualRowIndex, rowClassName);
          const iteratedCols = isVirtualX ? cols.filter((col, index) => {
            if (startColIndex <= index && index <= endColIndex) return true;
            if (col.column.fixed) {
              return true;
            }
            return false;
          }) : cols;
          const virtualXRowHeight = isVirtualX ? pxfy((heightForRow === null || heightForRow === void 0 ? void 0 : heightForRow(rowData, actualRowIndex)) || minRowHeight) : void 0;
          const cells = iteratedCols.map((col) => {
            var _a, _b, _c, _d, _e;
            const colIndex = col.index;
            if (displayedRowIndex in cordToPass) {
              const cordOfRowToPass = cordToPass[displayedRowIndex];
              const indexInCordOfRowToPass = cordOfRowToPass.indexOf(colIndex);
              if (~indexInCordOfRowToPass) {
                cordOfRowToPass.splice(indexInCordOfRowToPass, 1);
                return null;
              }
            }
            const {
              column
            } = col;
            const colKey = getColKey(col);
            const {
              rowSpan,
              colSpan
            } = column;
            const mergedColSpan = isSummary ? ((_a = rowInfo.tmNode.rawNode[colKey]) === null || _a === void 0 ? void 0 : _a.colSpan) || 1 : colSpan ? colSpan(rowData, actualRowIndex) : 1;
            const mergedRowSpan = isSummary ? ((_b = rowInfo.tmNode.rawNode[colKey]) === null || _b === void 0 ? void 0 : _b.rowSpan) || 1 : rowSpan ? rowSpan(rowData, actualRowIndex) : 1;
            const isLastCol = colIndex + mergedColSpan === colCount;
            const isLastRow = displayedRowIndex + mergedRowSpan === rowCount;
            const isCrossRowTd = mergedRowSpan > 1;
            if (isCrossRowTd) {
              cordKey[displayedRowIndex] = {
                [colIndex]: []
              };
            }
            if (mergedColSpan > 1 || isCrossRowTd) {
              for (let i = displayedRowIndex; i < displayedRowIndex + mergedRowSpan; ++i) {
                if (isCrossRowTd) {
                  cordKey[displayedRowIndex][colIndex].push(rowIndexToKey[i]);
                }
                for (let j = colIndex; j < colIndex + mergedColSpan; ++j) {
                  if (i === displayedRowIndex && j === colIndex) {
                    continue;
                  }
                  if (!(i in cordToPass)) {
                    cordToPass[i] = [j];
                  } else {
                    cordToPass[i].push(j);
                  }
                }
              }
            }
            const hoverKey = isCrossRowTd ? this.hoverKey : null;
            const {
              cellProps
            } = column;
            const resolvedCellProps = cellProps === null || cellProps === void 0 ? void 0 : cellProps(rowData, actualRowIndex);
            const indentOffsetStyle = {
              "--indent-offset": ""
            };
            const FinalCellComponent = column.fixed ? "td" : CellComponent;
            return h(FinalCellComponent, Object.assign({}, resolvedCellProps, {
              key: colKey,
              style: [{
                textAlign: column.align || void 0,
                width: pxfy(column.width)
              }, isVirtualX && {
                height: virtualXRowHeight
              }, isVirtualX && !column.fixed ? {
                position: "absolute",
                left: pxfy(getLeft(colIndex)),
                top: 0,
                bottom: 0
              } : {
                left: pxfy((_c = fixedColumnLeftMap[colKey]) === null || _c === void 0 ? void 0 : _c.start),
                right: pxfy((_d = fixedColumnRightMap[colKey]) === null || _d === void 0 ? void 0 : _d.start)
              }, indentOffsetStyle, (resolvedCellProps === null || resolvedCellProps === void 0 ? void 0 : resolvedCellProps.style) || ""],
              colspan: mergedColSpan,
              rowspan: isVirtual ? void 0 : mergedRowSpan,
              "data-col-key": colKey,
              class: [`${mergedClsPrefix}-data-table-td`, column.className, resolvedCellProps === null || resolvedCellProps === void 0 ? void 0 : resolvedCellProps.class, isSummary && `${mergedClsPrefix}-data-table-td--summary`, hoverKey !== null && cordKey[displayedRowIndex][colIndex].includes(hoverKey) && `${mergedClsPrefix}-data-table-td--hover`, isColumnSorting(column, mergedSortState) && `${mergedClsPrefix}-data-table-td--sorting`, column.fixed && `${mergedClsPrefix}-data-table-td--fixed-${column.fixed}`, column.align && `${mergedClsPrefix}-data-table-td--${column.align}-align`, column.type === "selection" && `${mergedClsPrefix}-data-table-td--selection`, column.type === "expand" && `${mergedClsPrefix}-data-table-td--expand`, isLastCol && `${mergedClsPrefix}-data-table-td--last-col`, isLastRow && `${mergedClsPrefix}-data-table-td--last-row`]
            }), hasChildren && colIndex === childTriggerColIndex ? [repeat(indentOffsetStyle["--indent-offset"] = isSummary ? 0 : rowInfo.tmNode.level, h("div", {
              class: `${mergedClsPrefix}-data-table-indent`,
              style: indentStyle
            })), isSummary || rowInfo.tmNode.isLeaf ? h("div", {
              class: `${mergedClsPrefix}-data-table-expand-placeholder`
            }) : h(ExpandTrigger, {
              class: `${mergedClsPrefix}-data-table-expand-trigger`,
              clsPrefix: mergedClsPrefix,
              expanded,
              rowData,
              renderExpandIcon: this.renderExpandIcon,
              loading: loadingKeySet.has(rowInfo.key),
              onClick: () => {
                handleUpdateExpanded(rowKey, rowInfo.tmNode);
              }
            })] : null, column.type === "selection" ? !isSummary ? column.multiple === false ? h(RenderSafeRadio, {
              key: currentPage,
              rowKey,
              disabled: rowInfo.tmNode.disabled,
              onUpdateChecked: () => {
                handleRadioUpdateChecked(rowInfo.tmNode);
              }
            }) : h(RenderSafeCheckbox, {
              key: currentPage,
              rowKey,
              disabled: rowInfo.tmNode.disabled,
              onUpdateChecked: (checked, e) => {
                handleCheckboxUpdateChecked(rowInfo.tmNode, checked, e.shiftKey);
              }
            }) : null : column.type === "expand" ? !isSummary ? !column.expandable || ((_e = column.expandable) === null || _e === void 0 ? void 0 : _e.call(column, rowData)) ? h(ExpandTrigger, {
              clsPrefix: mergedClsPrefix,
              rowData,
              expanded,
              renderExpandIcon: this.renderExpandIcon,
              onClick: () => {
                handleUpdateExpanded(rowKey, null);
              }
            }) : null : null : h(Cell, {
              clsPrefix: mergedClsPrefix,
              index: actualRowIndex,
              row: rowData,
              column,
              isSummary,
              mergedTheme: mergedTheme2,
              renderCell: this.renderCell
            }));
          });
          if (isVirtualX) {
            if (leftFixedColsCount && rightFixedColsCount) {
              cells.splice(leftFixedColsCount, 0, h("td", {
                colspan: cols.length - leftFixedColsCount - rightFixedColsCount,
                style: {
                  pointerEvents: "none",
                  visibility: "hidden",
                  height: 0
                }
              }));
            }
          }
          const row = h("tr", Object.assign({}, props, {
            onMouseenter: (e) => {
              var _a;
              this.hoverKey = rowKey;
              (_a = props === null || props === void 0 ? void 0 : props.onMouseenter) === null || _a === void 0 ? void 0 : _a.call(props, e);
            },
            key: rowKey,
            class: [`${mergedClsPrefix}-data-table-tr`, isSummary && `${mergedClsPrefix}-data-table-tr--summary`, striped && `${mergedClsPrefix}-data-table-tr--striped`, expanded && `${mergedClsPrefix}-data-table-tr--expanded`, mergedRowClassName, props === null || props === void 0 ? void 0 : props.class],
            style: [props === null || props === void 0 ? void 0 : props.style, isVirtualX && {
              height: virtualXRowHeight
            }]
          }), cells);
          return row;
        };
        if (!virtualScroll) {
          return h("table", {
            class: `${mergedClsPrefix}-data-table-table`,
            onMouseleave: handleMouseleaveTable,
            style: {
              tableLayout: this.mergedTableLayout
            }
          }, h("colgroup", null, cols.map((col) => h("col", {
            key: col.key,
            style: col.style
          }))), this.showHeader ? h(TableHeader, {
            discrete: false
          }) : null, !this.empty ? h("tbody", {
            "data-n-id": componentId,
            class: `${mergedClsPrefix}-data-table-tbody`
          }, displayedData.map((rowInfo, displayedRowIndex) => {
            return renderRow({
              rowInfo,
              displayedRowIndex,
              isVirtual: false,
              isVirtualX: false,
              startColIndex: -1,
              endColIndex: -1,
              getLeft(_index) {
                return -1;
              }
            });
          })) : null);
        } else {
          return h(VVirtualList, {
            ref: "virtualListRef",
            items: displayedData,
            itemSize: this.minRowHeight,
            visibleItemsTag: VirtualListItemWrapper,
            visibleItemsProps: {
              clsPrefix: mergedClsPrefix,
              id: componentId,
              cols,
              onMouseleave: handleMouseleaveTable
            },
            showScrollbar: false,
            onResize: this.handleVirtualListResize,
            onScroll: this.handleVirtualListScroll,
            itemsStyle: contentStyle,
            itemResizable: !virtualScrollX,
            columns: cols,
            renderItemWithCols: virtualScrollX ? ({
              itemIndex,
              item,
              startColIndex,
              endColIndex,
              getLeft
            }) => {
              return renderRow({
                displayedRowIndex: itemIndex,
                isVirtual: true,
                isVirtualX: true,
                rowInfo: item,
                startColIndex,
                endColIndex,
                getLeft
              });
            } : void 0
          }, {
            default: ({
              item,
              index,
              renderedItemWithCols
            }) => {
              if (renderedItemWithCols) return renderedItemWithCols;
              return renderRow({
                rowInfo: item,
                displayedRowIndex: index,
                isVirtual: true,
                isVirtualX: false,
                startColIndex: 0,
                endColIndex: 0,
                getLeft(_index) {
                  return 0;
                }
              });
            }
          });
        }
      }
    });
    if (this.empty) {
      const createEmptyNode = () => h("div", {
        class: [`${mergedClsPrefix}-data-table-empty`, this.loading && `${mergedClsPrefix}-data-table-empty--hide`],
        style: this.bodyStyle,
        ref: "emptyElRef"
      }, resolveSlot(this.dataTableSlots.empty, () => [h(NEmpty, {
        theme: this.mergedTheme.peers.Empty,
        themeOverrides: this.mergedTheme.peerOverrides.Empty
      })]));
      if (this.shouldDisplaySomeTablePart) {
        return h(Fragment, null, tableNode, createEmptyNode());
      } else {
        return h(VResizeObserver, {
          onResize: this.onResize
        }, {
          default: createEmptyNode
        });
      }
    }
    return tableNode;
  }
});
const MainTable = defineComponent({
  name: "MainTable",
  setup() {
    const {
      mergedClsPrefixRef,
      rightFixedColumnsRef,
      leftFixedColumnsRef,
      bodyWidthRef,
      maxHeightRef,
      minHeightRef,
      flexHeightRef,
      virtualScrollHeaderRef,
      syncScrollState
    } = inject(dataTableInjectionKey);
    const headerInstRef = ref(null);
    const bodyInstRef = ref(null);
    const selfElRef = ref(null);
    const fixedStateInitializedRef = ref(!(leftFixedColumnsRef.value.length || rightFixedColumnsRef.value.length));
    const bodyStyleRef = computed(() => {
      return {
        maxHeight: formatLength(maxHeightRef.value),
        minHeight: formatLength(minHeightRef.value)
      };
    });
    function handleBodyResize(entry) {
      bodyWidthRef.value = entry.contentRect.width;
      syncScrollState();
      if (!fixedStateInitializedRef.value) {
        fixedStateInitializedRef.value = true;
      }
    }
    function getHeaderElement() {
      var _a;
      const {
        value
      } = headerInstRef;
      if (value) {
        if (virtualScrollHeaderRef.value) {
          return ((_a = value.virtualListRef) === null || _a === void 0 ? void 0 : _a.listElRef) || null;
        } else {
          return value.$el;
        }
      }
      return null;
    }
    function getBodyElement() {
      const {
        value
      } = bodyInstRef;
      if (value) {
        return value.getScrollContainer();
      }
      return null;
    }
    const exposedMethods = {
      getBodyElement,
      getHeaderElement,
      scrollTo(arg0, arg1) {
        var _a;
        (_a = bodyInstRef.value) === null || _a === void 0 ? void 0 : _a.scrollTo(arg0, arg1);
      }
    };
    watchEffect(() => {
      const {
        value: selfEl
      } = selfElRef;
      if (!selfEl) return;
      const transitionDisabledClass = `${mergedClsPrefixRef.value}-data-table-base-table--transition-disabled`;
      if (fixedStateInitializedRef.value) {
        setTimeout(() => {
          selfEl.classList.remove(transitionDisabledClass);
        }, 0);
      } else {
        selfEl.classList.add(transitionDisabledClass);
      }
    });
    return Object.assign({
      maxHeight: maxHeightRef,
      mergedClsPrefix: mergedClsPrefixRef,
      selfElRef,
      headerInstRef,
      bodyInstRef,
      bodyStyle: bodyStyleRef,
      flexHeight: flexHeightRef,
      handleBodyResize
    }, exposedMethods);
  },
  render() {
    const {
      mergedClsPrefix,
      maxHeight,
      flexHeight
    } = this;
    const headerInBody = maxHeight === void 0 && !flexHeight;
    return h("div", {
      class: `${mergedClsPrefix}-data-table-base-table`,
      ref: "selfElRef"
    }, headerInBody ? null : h(TableHeader, {
      ref: "headerInstRef"
    }), h(TableBody, {
      ref: "bodyInstRef",
      bodyStyle: this.bodyStyle,
      showHeader: headerInBody,
      flexHeight,
      onResize: this.handleBodyResize
    }));
  }
});
const fixedColumnStyle = createFixedColumnStyle();
const style$1 = c$1([cB("data-table", `
 width: 100%;
 font-size: var(--n-font-size);
 display: flex;
 flex-direction: column;
 position: relative;
 --n-merged-th-color: var(--n-th-color);
 --n-merged-td-color: var(--n-td-color);
 --n-merged-border-color: var(--n-border-color);
 --n-merged-th-color-hover: var(--n-th-color-hover);
 --n-merged-th-color-sorting: var(--n-th-color-sorting);
 --n-merged-td-color-hover: var(--n-td-color-hover);
 --n-merged-td-color-sorting: var(--n-td-color-sorting);
 --n-merged-td-color-striped: var(--n-td-color-striped);
 `, [cB("data-table-wrapper", `
 flex-grow: 1;
 display: flex;
 flex-direction: column;
 `), cM("flex-height", [c$1(">", [cB("data-table-wrapper", [c$1(">", [cB("data-table-base-table", `
 display: flex;
 flex-direction: column;
 flex-grow: 1;
 `, [c$1(">", [cB("data-table-base-table-body", "flex-basis: 0;", [
  // last-child means there is no empty icon
  // body is a scrollbar, we need to override height 100%
  c$1("&:last-child", "flex-grow: 1;")
])])])])])])]), c$1(">", [cB("data-table-loading-wrapper", `
 color: var(--n-loading-color);
 font-size: var(--n-loading-size);
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 transition: color .3s var(--n-bezier);
 display: flex;
 align-items: center;
 justify-content: center;
 `, [fadeInScaleUpTransition({
  originalTransform: "translateX(-50%) translateY(-50%)"
})])]), cB("data-table-expand-placeholder", `
 margin-right: 8px;
 display: inline-block;
 width: 16px;
 height: 1px;
 `), cB("data-table-indent", `
 display: inline-block;
 height: 1px;
 `), cB("data-table-expand-trigger", `
 display: inline-flex;
 margin-right: 8px;
 cursor: pointer;
 font-size: 16px;
 vertical-align: -0.2em;
 position: relative;
 width: 16px;
 height: 16px;
 color: var(--n-td-text-color);
 transition: color .3s var(--n-bezier);
 `, [cM("expanded", [cB("icon", "transform: rotate(90deg);", [iconSwitchTransition({
  originalTransform: "rotate(90deg)"
})]), cB("base-icon", "transform: rotate(90deg);", [iconSwitchTransition({
  originalTransform: "rotate(90deg)"
})])]), cB("base-loading", `
 color: var(--n-loading-color);
 transition: color .3s var(--n-bezier);
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `, [iconSwitchTransition()]), cB("icon", `
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `, [iconSwitchTransition()]), cB("base-icon", `
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `, [iconSwitchTransition()])]), cB("data-table-thead", `
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-merged-th-color);
 `), cB("data-table-tr", `
 position: relative;
 box-sizing: border-box;
 background-clip: padding-box;
 transition: background-color .3s var(--n-bezier);
 `, [cB("data-table-expand", `
 position: sticky;
 left: 0;
 overflow: hidden;
 margin: calc(var(--n-th-padding) * -1);
 padding: var(--n-th-padding);
 box-sizing: border-box;
 `), cM("striped", "background-color: var(--n-merged-td-color-striped);", [cB("data-table-td", "background-color: var(--n-merged-td-color-striped);")]), cNotM("summary", [c$1("&:hover", "background-color: var(--n-merged-td-color-hover);", [c$1(">", [cB("data-table-td", "background-color: var(--n-merged-td-color-hover);")])])])]), cB("data-table-th", `
 padding: var(--n-th-padding);
 position: relative;
 text-align: start;
 box-sizing: border-box;
 background-color: var(--n-merged-th-color);
 border-color: var(--n-merged-border-color);
 border-bottom: 1px solid var(--n-merged-border-color);
 color: var(--n-th-text-color);
 transition:
 border-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 font-weight: var(--n-th-font-weight);
 `, [cM("filterable", `
 padding-right: 36px;
 `, [cM("sortable", `
 padding-right: calc(var(--n-th-padding) + 36px);
 `)]), fixedColumnStyle, cM("selection", `
 padding: 0;
 text-align: center;
 line-height: 0;
 z-index: 3;
 `), cE("title-wrapper", `
 display: flex;
 align-items: center;
 flex-wrap: nowrap;
 max-width: 100%;
 `, [cE("title", `
 flex: 1;
 min-width: 0;
 `)]), cE("ellipsis", `
 display: inline-block;
 vertical-align: bottom;
 text-overflow: ellipsis;
 overflow: hidden;
 white-space: nowrap;
 max-width: 100%;
 `), cM("hover", `
 background-color: var(--n-merged-th-color-hover);
 `), cM("sorting", `
 background-color: var(--n-merged-th-color-sorting);
 `), cM("sortable", `
 cursor: pointer;
 `, [cE("ellipsis", `
 max-width: calc(100% - 18px);
 `), c$1("&:hover", `
 background-color: var(--n-merged-th-color-hover);
 `)]), cB("data-table-sorter", `
 height: var(--n-sorter-size);
 width: var(--n-sorter-size);
 margin-left: 4px;
 position: relative;
 display: inline-flex;
 align-items: center;
 justify-content: center;
 vertical-align: -0.2em;
 color: var(--n-th-icon-color);
 transition: color .3s var(--n-bezier);
 `, [cB("base-icon", "transition: transform .3s var(--n-bezier)"), cM("desc", [cB("base-icon", `
 transform: rotate(0deg);
 `)]), cM("asc", [cB("base-icon", `
 transform: rotate(-180deg);
 `)]), cM("asc, desc", `
 color: var(--n-th-icon-color-active);
 `)]), cB("data-table-resize-button", `
 width: var(--n-resizable-container-size);
 position: absolute;
 top: 0;
 right: calc(var(--n-resizable-container-size) / 2);
 bottom: 0;
 cursor: col-resize;
 user-select: none;
 `, [c$1("&::after", `
 width: var(--n-resizable-size);
 height: 50%;
 position: absolute;
 top: 50%;
 left: calc(var(--n-resizable-container-size) / 2);
 bottom: 0;
 background-color: var(--n-merged-border-color);
 transform: translateY(-50%);
 transition: background-color .3s var(--n-bezier);
 z-index: 1;
 content: '';
 `), cM("active", [c$1("&::after", ` 
 background-color: var(--n-th-icon-color-active);
 `)]), c$1("&:hover::after", `
 background-color: var(--n-th-icon-color-active);
 `)]), cB("data-table-filter", `
 position: absolute;
 z-index: auto;
 right: 0;
 width: 36px;
 top: 0;
 bottom: 0;
 cursor: pointer;
 display: flex;
 justify-content: center;
 align-items: center;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 font-size: var(--n-filter-size);
 color: var(--n-th-icon-color);
 `, [c$1("&:hover", `
 background-color: var(--n-th-button-color-hover);
 `), cM("show", `
 background-color: var(--n-th-button-color-hover);
 `), cM("active", `
 background-color: var(--n-th-button-color-hover);
 color: var(--n-th-icon-color-active);
 `)])]), cB("data-table-td", `
 padding: var(--n-td-padding);
 text-align: start;
 box-sizing: border-box;
 border: none;
 background-color: var(--n-merged-td-color);
 color: var(--n-td-text-color);
 border-bottom: 1px solid var(--n-merged-border-color);
 transition:
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `, [cM("expand", [cB("data-table-expand-trigger", `
 margin-right: 0;
 `)]), cM("last-row", `
 border-bottom: 0 solid var(--n-merged-border-color);
 `, [
  // make sure there is no overlap between bottom border and
  // fixed column box shadow
  c$1("&::after", `
 bottom: 0 !important;
 `),
  c$1("&::before", `
 bottom: 0 !important;
 `)
]), cM("summary", `
 background-color: var(--n-merged-th-color);
 `), cM("hover", `
 background-color: var(--n-merged-td-color-hover);
 `), cM("sorting", `
 background-color: var(--n-merged-td-color-sorting);
 `), cE("ellipsis", `
 display: inline-block;
 text-overflow: ellipsis;
 overflow: hidden;
 white-space: nowrap;
 max-width: 100%;
 vertical-align: bottom;
 max-width: calc(100% - var(--indent-offset, -1.5) * 16px - 24px);
 `), cM("selection, expand", `
 text-align: center;
 padding: 0;
 line-height: 0;
 `), fixedColumnStyle]), cB("data-table-empty", `
 box-sizing: border-box;
 padding: var(--n-empty-padding);
 flex-grow: 1;
 flex-shrink: 0;
 opacity: 1;
 display: flex;
 align-items: center;
 justify-content: center;
 transition: opacity .3s var(--n-bezier);
 `, [cM("hide", `
 opacity: 0;
 `)]), cE("pagination", `
 margin: var(--n-pagination-margin);
 display: flex;
 justify-content: flex-end;
 `), cB("data-table-wrapper", `
 position: relative;
 opacity: 1;
 transition: opacity .3s var(--n-bezier), border-color .3s var(--n-bezier);
 border-top-left-radius: var(--n-border-radius);
 border-top-right-radius: var(--n-border-radius);
 line-height: var(--n-line-height);
 `), cM("loading", [cB("data-table-wrapper", `
 opacity: var(--n-opacity-loading);
 pointer-events: none;
 `)]), cM("single-column", [cB("data-table-td", `
 border-bottom: 0 solid var(--n-merged-border-color);
 `, [c$1("&::after, &::before", `
 bottom: 0 !important;
 `)])]), cNotM("single-line", [cB("data-table-th", `
 border-right: 1px solid var(--n-merged-border-color);
 `, [cM("last", `
 border-right: 0 solid var(--n-merged-border-color);
 `)]), cB("data-table-td", `
 border-right: 1px solid var(--n-merged-border-color);
 `, [cM("last-col", `
 border-right: 0 solid var(--n-merged-border-color);
 `)])]), cM("bordered", [cB("data-table-wrapper", `
 border: 1px solid var(--n-merged-border-color);
 border-bottom-left-radius: var(--n-border-radius);
 border-bottom-right-radius: var(--n-border-radius);
 overflow: hidden;
 `)]), cB("data-table-base-table", [cM("transition-disabled", [cB("data-table-th", [c$1("&::after, &::before", "transition: none;")]), cB("data-table-td", [c$1("&::after, &::before", "transition: none;")])])]), cM("bottom-bordered", [cB("data-table-td", [cM("last-row", `
 border-bottom: 1px solid var(--n-merged-border-color);
 `)])]), cB("data-table-table", `
 font-variant-numeric: tabular-nums;
 width: 100%;
 word-break: break-word;
 transition: background-color .3s var(--n-bezier);
 border-collapse: separate;
 border-spacing: 0;
 background-color: var(--n-merged-td-color);
 `), cB("data-table-base-table-header", `
 border-top-left-radius: calc(var(--n-border-radius) - 1px);
 border-top-right-radius: calc(var(--n-border-radius) - 1px);
 z-index: 3;
 overflow: scroll;
 flex-shrink: 0;
 transition: border-color .3s var(--n-bezier);
 scrollbar-width: none;
 `, [c$1("&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb", `
 display: none;
 width: 0;
 height: 0;
 `)]), cB("data-table-check-extra", `
 transition: color .3s var(--n-bezier);
 color: var(--n-th-icon-color);
 position: absolute;
 font-size: 14px;
 right: -4px;
 top: 50%;
 transform: translateY(-50%);
 z-index: 1;
 `)]), cB("data-table-filter-menu", [cB("scrollbar", `
 max-height: 240px;
 `), cE("group", `
 display: flex;
 flex-direction: column;
 padding: 12px 12px 0 12px;
 `, [cB("checkbox", `
 margin-bottom: 12px;
 margin-right: 0;
 `), cB("radio", `
 margin-bottom: 12px;
 margin-right: 0;
 `)]), cE("action", `
 padding: var(--n-action-padding);
 display: flex;
 flex-wrap: nowrap;
 justify-content: space-evenly;
 border-top: 1px solid var(--n-action-divider-color);
 `, [cB("button", [c$1("&:not(:last-child)", `
 margin: var(--n-action-button-margin);
 `), c$1("&:last-child", `
 margin-right: 0;
 `)])]), cB("divider", `
 margin: 0 !important;
 `)]), insideModal(cB("data-table", `
 --n-merged-th-color: var(--n-th-color-modal);
 --n-merged-td-color: var(--n-td-color-modal);
 --n-merged-border-color: var(--n-border-color-modal);
 --n-merged-th-color-hover: var(--n-th-color-hover-modal);
 --n-merged-td-color-hover: var(--n-td-color-hover-modal);
 --n-merged-th-color-sorting: var(--n-th-color-hover-modal);
 --n-merged-td-color-sorting: var(--n-td-color-hover-modal);
 --n-merged-td-color-striped: var(--n-td-color-striped-modal);
 `)), insidePopover(cB("data-table", `
 --n-merged-th-color: var(--n-th-color-popover);
 --n-merged-td-color: var(--n-td-color-popover);
 --n-merged-border-color: var(--n-border-color-popover);
 --n-merged-th-color-hover: var(--n-th-color-hover-popover);
 --n-merged-td-color-hover: var(--n-td-color-hover-popover);
 --n-merged-th-color-sorting: var(--n-th-color-hover-popover);
 --n-merged-td-color-sorting: var(--n-td-color-hover-popover);
 --n-merged-td-color-striped: var(--n-td-color-striped-popover);
 `))]);
function createFixedColumnStyle() {
  return [cM("fixed-left", `
 left: 0;
 position: sticky;
 z-index: 2;
 `, [c$1("&::after", `
 pointer-events: none;
 content: "";
 width: 36px;
 display: inline-block;
 position: absolute;
 top: 0;
 bottom: -1px;
 transition: box-shadow .2s var(--n-bezier);
 right: -36px;
 `)]), cM("fixed-right", `
 right: 0;
 position: sticky;
 z-index: 1;
 `, [c$1("&::before", `
 pointer-events: none;
 content: "";
 width: 36px;
 display: inline-block;
 position: absolute;
 top: 0;
 bottom: -1px;
 transition: box-shadow .2s var(--n-bezier);
 left: -36px;
 `)])];
}
function useCheck(props, data) {
  const {
    paginatedDataRef,
    treeMateRef,
    selectionColumnRef
  } = data;
  const uncontrolledCheckedRowKeysRef = ref(props.defaultCheckedRowKeys);
  const mergedCheckState = computed(() => {
    var _a;
    const {
      checkedRowKeys
    } = props;
    const sourceKeys = checkedRowKeys === void 0 ? uncontrolledCheckedRowKeysRef.value : checkedRowKeys;
    if (((_a = selectionColumnRef.value) === null || _a === void 0 ? void 0 : _a.multiple) === false) {
      return {
        checkedKeys: sourceKeys.slice(0, 1),
        indeterminateKeys: []
      };
    }
    return treeMateRef.value.getCheckedKeys(sourceKeys, {
      cascade: props.cascade,
      allowNotLoaded: props.allowCheckingNotLoaded
    });
  });
  const mergedCheckedRowKeysRef = computed(() => mergedCheckState.value.checkedKeys);
  const mergedInderminateRowKeysRef = computed(() => mergedCheckState.value.indeterminateKeys);
  const mergedCheckedRowKeySetRef = computed(() => {
    return new Set(mergedCheckedRowKeysRef.value);
  });
  const mergedInderminateRowKeySetRef = computed(() => {
    return new Set(mergedInderminateRowKeysRef.value);
  });
  const countOfCurrentPageCheckedRowsRef = computed(() => {
    const {
      value: mergedCheckedRowKeySet
    } = mergedCheckedRowKeySetRef;
    return paginatedDataRef.value.reduce((total, tmNode) => {
      const {
        key,
        disabled
      } = tmNode;
      return total + (!disabled && mergedCheckedRowKeySet.has(key) ? 1 : 0);
    }, 0);
  });
  const countOfCurrentPageDisabledRowsRef = computed(() => {
    return paginatedDataRef.value.filter((item) => item.disabled).length;
  });
  const someRowsCheckedRef = computed(() => {
    const {
      length
    } = paginatedDataRef.value;
    const {
      value: mergedInderminateRowKeySet
    } = mergedInderminateRowKeySetRef;
    return countOfCurrentPageCheckedRowsRef.value > 0 && countOfCurrentPageCheckedRowsRef.value < length - countOfCurrentPageDisabledRowsRef.value || paginatedDataRef.value.some((rowData) => mergedInderminateRowKeySet.has(rowData.key));
  });
  const allRowsCheckedRef = computed(() => {
    const {
      length
    } = paginatedDataRef.value;
    return countOfCurrentPageCheckedRowsRef.value !== 0 && countOfCurrentPageCheckedRowsRef.value === length - countOfCurrentPageDisabledRowsRef.value;
  });
  const headerCheckboxDisabledRef = computed(() => {
    return paginatedDataRef.value.length === 0;
  });
  function doUpdateCheckedRowKeys(keys, row, action) {
    const {
      "onUpdate:checkedRowKeys": _onUpdateCheckedRowKeys,
      onUpdateCheckedRowKeys,
      onCheckedRowKeysChange
    } = props;
    const rows = [];
    const {
      value: {
        getNode
      }
    } = treeMateRef;
    keys.forEach((key) => {
      var _a;
      const row2 = (_a = getNode(key)) === null || _a === void 0 ? void 0 : _a.rawNode;
      rows.push(row2);
    });
    if (_onUpdateCheckedRowKeys) {
      call(_onUpdateCheckedRowKeys, keys, rows, {
        row,
        action
      });
    }
    if (onUpdateCheckedRowKeys) {
      call(onUpdateCheckedRowKeys, keys, rows, {
        row,
        action
      });
    }
    if (onCheckedRowKeysChange) {
      call(onCheckedRowKeysChange, keys, rows, {
        row,
        action
      });
    }
    uncontrolledCheckedRowKeysRef.value = keys;
  }
  function doCheck(rowKey, single = false, rowInfo) {
    if (props.loading) return;
    if (single) {
      doUpdateCheckedRowKeys(Array.isArray(rowKey) ? rowKey.slice(0, 1) : [rowKey], rowInfo, "check");
      return;
    }
    doUpdateCheckedRowKeys(treeMateRef.value.check(rowKey, mergedCheckedRowKeysRef.value, {
      cascade: props.cascade,
      allowNotLoaded: props.allowCheckingNotLoaded
    }).checkedKeys, rowInfo, "check");
  }
  function doUncheck(rowKey, rowInfo) {
    if (props.loading) return;
    doUpdateCheckedRowKeys(treeMateRef.value.uncheck(rowKey, mergedCheckedRowKeysRef.value, {
      cascade: props.cascade,
      allowNotLoaded: props.allowCheckingNotLoaded
    }).checkedKeys, rowInfo, "uncheck");
  }
  function doCheckAll(checkWholeTable = false) {
    const {
      value: column
    } = selectionColumnRef;
    if (!column || props.loading) return;
    const rowKeysToCheck = [];
    (checkWholeTable ? treeMateRef.value.treeNodes : paginatedDataRef.value).forEach((tmNode) => {
      if (!tmNode.disabled) {
        rowKeysToCheck.push(tmNode.key);
      }
    });
    doUpdateCheckedRowKeys(treeMateRef.value.check(rowKeysToCheck, mergedCheckedRowKeysRef.value, {
      cascade: true,
      allowNotLoaded: props.allowCheckingNotLoaded
    }).checkedKeys, void 0, "checkAll");
  }
  function doUncheckAll(checkWholeTable = false) {
    const {
      value: column
    } = selectionColumnRef;
    if (!column || props.loading) return;
    const rowKeysToUncheck = [];
    (checkWholeTable ? treeMateRef.value.treeNodes : paginatedDataRef.value).forEach((tmNode) => {
      if (!tmNode.disabled) {
        rowKeysToUncheck.push(tmNode.key);
      }
    });
    doUpdateCheckedRowKeys(treeMateRef.value.uncheck(rowKeysToUncheck, mergedCheckedRowKeysRef.value, {
      cascade: true,
      allowNotLoaded: props.allowCheckingNotLoaded
    }).checkedKeys, void 0, "uncheckAll");
  }
  return {
    mergedCheckedRowKeySetRef,
    mergedCheckedRowKeysRef,
    mergedInderminateRowKeySetRef,
    someRowsCheckedRef,
    allRowsCheckedRef,
    headerCheckboxDisabledRef,
    doUpdateCheckedRowKeys,
    doCheckAll,
    doUncheckAll,
    doCheck,
    doUncheck
  };
}
function useExpand(props, treeMateRef) {
  const renderExpandRef = useMemo(() => {
    for (const col of props.columns) {
      if (col.type === "expand") {
        return col.renderExpand;
      }
    }
  });
  const expandableRef = useMemo(() => {
    let expandable;
    for (const col of props.columns) {
      if (col.type === "expand") {
        expandable = col.expandable;
        break;
      }
    }
    return expandable;
  });
  const uncontrolledExpandedRowKeysRef = ref(props.defaultExpandAll ? (renderExpandRef === null || renderExpandRef === void 0 ? void 0 : renderExpandRef.value) ? (() => {
    const expandedKeys = [];
    treeMateRef.value.treeNodes.forEach((tmNode) => {
      var _a;
      if ((_a = expandableRef.value) === null || _a === void 0 ? void 0 : _a.call(expandableRef, tmNode.rawNode)) {
        expandedKeys.push(tmNode.key);
      }
    });
    return expandedKeys;
  })() : treeMateRef.value.getNonLeafKeys() : props.defaultExpandedRowKeys);
  const controlledExpandedRowKeysRef = toRef(props, "expandedRowKeys");
  const stickyExpandedRowsRef = toRef(props, "stickyExpandedRows");
  const mergedExpandedRowKeysRef = useMergedState(controlledExpandedRowKeysRef, uncontrolledExpandedRowKeysRef);
  function doUpdateExpandedRowKeys(expandedKeys) {
    const {
      onUpdateExpandedRowKeys,
      "onUpdate:expandedRowKeys": _onUpdateExpandedRowKeys
    } = props;
    if (onUpdateExpandedRowKeys) {
      call(onUpdateExpandedRowKeys, expandedKeys);
    }
    if (_onUpdateExpandedRowKeys) {
      call(_onUpdateExpandedRowKeys, expandedKeys);
    }
    uncontrolledExpandedRowKeysRef.value = expandedKeys;
  }
  return {
    stickyExpandedRowsRef,
    mergedExpandedRowKeysRef,
    renderExpandRef,
    expandableRef,
    doUpdateExpandedRowKeys
  };
}
function getRowsAndCols(columns, getResizableWidth) {
  const rows = [];
  const cols = [];
  const dataRelatedCols = [];
  const rowItemMap = /* @__PURE__ */ new WeakMap();
  let maxDepth = -1;
  let totalRowSpan = 0;
  let hasEllipsis = false;
  let currentLeafIndex = 0;
  function ensureMaxDepth(columns2, currentDepth) {
    if (currentDepth > maxDepth) {
      rows[currentDepth] = [];
      maxDepth = currentDepth;
    }
    columns2.forEach((column) => {
      if ("children" in column) {
        ensureMaxDepth(column.children, currentDepth + 1);
      } else {
        const key = "key" in column ? column.key : void 0;
        cols.push({
          key: getColKey(column),
          style: createCustomWidthStyle(column, key !== void 0 ? formatLength(getResizableWidth(key)) : void 0),
          column,
          index: currentLeafIndex++,
          // The width property is only applied to horizontally virtual scroll table
          width: column.width === void 0 ? 128 : Number(column.width)
        });
        totalRowSpan += 1;
        if (!hasEllipsis) {
          hasEllipsis = !!column.ellipsis;
        }
        dataRelatedCols.push(column);
      }
    });
  }
  ensureMaxDepth(columns, 0);
  currentLeafIndex = 0;
  function ensureColLayout(columns2, currentDepth) {
    let hideUntilIndex = 0;
    columns2.forEach((column) => {
      var _a;
      if ("children" in column) {
        const cachedCurrentLeafIndex = currentLeafIndex;
        const rowItem = {
          column,
          colIndex: currentLeafIndex,
          colSpan: 0,
          rowSpan: 1,
          isLast: false
        };
        ensureColLayout(column.children, currentDepth + 1);
        column.children.forEach((childColumn) => {
          var _a2, _b;
          rowItem.colSpan += (_b = (_a2 = rowItemMap.get(childColumn)) === null || _a2 === void 0 ? void 0 : _a2.colSpan) !== null && _b !== void 0 ? _b : 0;
        });
        if (cachedCurrentLeafIndex + rowItem.colSpan === totalRowSpan) {
          rowItem.isLast = true;
        }
        rowItemMap.set(column, rowItem);
        rows[currentDepth].push(rowItem);
      } else {
        if (currentLeafIndex < hideUntilIndex) {
          currentLeafIndex += 1;
          return;
        }
        let colSpan = 1;
        if ("titleColSpan" in column) {
          colSpan = (_a = column.titleColSpan) !== null && _a !== void 0 ? _a : 1;
        }
        if (colSpan > 1) {
          hideUntilIndex = currentLeafIndex + colSpan;
        }
        const isLast = currentLeafIndex + colSpan === totalRowSpan;
        const rowItem = {
          column,
          colSpan,
          colIndex: currentLeafIndex,
          rowSpan: maxDepth - currentDepth + 1,
          isLast
        };
        rowItemMap.set(column, rowItem);
        rows[currentDepth].push(rowItem);
        currentLeafIndex += 1;
      }
    });
  }
  ensureColLayout(columns, 0);
  return {
    hasEllipsis,
    rows,
    cols,
    dataRelatedCols
  };
}
function useGroupHeader(props, getResizableWidth) {
  const rowsAndCols = computed(() => getRowsAndCols(props.columns, getResizableWidth));
  return {
    rowsRef: computed(() => rowsAndCols.value.rows),
    colsRef: computed(() => rowsAndCols.value.cols),
    hasEllipsisRef: computed(() => rowsAndCols.value.hasEllipsis),
    dataRelatedColsRef: computed(() => rowsAndCols.value.dataRelatedCols)
  };
}
function useResizable() {
  const resizableWidthsRef = ref({});
  function getResizableWidth(key) {
    return resizableWidthsRef.value[key];
  }
  function doUpdateResizableWidth(column, width) {
    if (isColumnResizable(column) && "key" in column) {
      resizableWidthsRef.value[column.key] = width;
    }
  }
  function clearResizableWidth() {
    resizableWidthsRef.value = {};
  }
  return {
    getResizableWidth,
    doUpdateResizableWidth,
    clearResizableWidth
  };
}
function useScroll(props, {
  mainTableInstRef,
  mergedCurrentPageRef,
  bodyWidthRef
}) {
  let lastScrollLeft = 0;
  const scrollPartRef = ref();
  const leftActiveFixedColKeyRef = ref(null);
  const leftActiveFixedChildrenColKeysRef = ref([]);
  const rightActiveFixedColKeyRef = ref(null);
  const rightActiveFixedChildrenColKeysRef = ref([]);
  const styleScrollXRef = computed(() => {
    return formatLength(props.scrollX);
  });
  const leftFixedColumnsRef = computed(() => {
    return props.columns.filter((column) => column.fixed === "left");
  });
  const rightFixedColumnsRef = computed(() => {
    return props.columns.filter((column) => column.fixed === "right");
  });
  const fixedColumnLeftMapRef = computed(() => {
    const columns = {};
    let left = 0;
    function traverse(cols) {
      cols.forEach((col) => {
        const positionInfo = {
          start: left,
          end: 0
        };
        columns[getColKey(col)] = positionInfo;
        if ("children" in col) {
          traverse(col.children);
          positionInfo.end = left;
        } else {
          left += getNumberColWidth(col) || 0;
          positionInfo.end = left;
        }
      });
    }
    traverse(leftFixedColumnsRef.value);
    return columns;
  });
  const fixedColumnRightMapRef = computed(() => {
    const columns = {};
    let right = 0;
    function traverse(cols) {
      for (let i = cols.length - 1; i >= 0; --i) {
        const col = cols[i];
        const positionInfo = {
          start: right,
          end: 0
        };
        columns[getColKey(col)] = positionInfo;
        if ("children" in col) {
          traverse(col.children);
          positionInfo.end = right;
        } else {
          right += getNumberColWidth(col) || 0;
          positionInfo.end = right;
        }
      }
    }
    traverse(rightFixedColumnsRef.value);
    return columns;
  });
  function deriveActiveLeftFixedColumn() {
    var _a, _b;
    const {
      value: leftFixedColumns
    } = leftFixedColumnsRef;
    let leftWidth = 0;
    const {
      value: fixedColumnLeftMap
    } = fixedColumnLeftMapRef;
    let leftActiveFixedColKey = null;
    for (let i = 0; i < leftFixedColumns.length; ++i) {
      const key = getColKey(leftFixedColumns[i]);
      if (lastScrollLeft > (((_a = fixedColumnLeftMap[key]) === null || _a === void 0 ? void 0 : _a.start) || 0) - leftWidth) {
        leftActiveFixedColKey = key;
        leftWidth = ((_b = fixedColumnLeftMap[key]) === null || _b === void 0 ? void 0 : _b.end) || 0;
      } else {
        break;
      }
    }
    leftActiveFixedColKeyRef.value = leftActiveFixedColKey;
  }
  function deriveActiveLeftFixedChildrenColumns() {
    leftActiveFixedChildrenColKeysRef.value = [];
    let activeLeftFixedColumn = props.columns.find((col) => getColKey(col) === leftActiveFixedColKeyRef.value);
    while (activeLeftFixedColumn && "children" in activeLeftFixedColumn) {
      const length = activeLeftFixedColumn.children.length;
      if (length === 0) break;
      const nextActiveLeftFixedColumn = activeLeftFixedColumn.children[length - 1];
      leftActiveFixedChildrenColKeysRef.value.push(getColKey(nextActiveLeftFixedColumn));
      activeLeftFixedColumn = nextActiveLeftFixedColumn;
    }
  }
  function deriveActiveRightFixedColumn() {
    var _a, _b;
    const {
      value: rightFixedColumns
    } = rightFixedColumnsRef;
    const scrollWidth = Number(props.scrollX);
    const {
      value: tableWidth
    } = bodyWidthRef;
    if (tableWidth === null) return;
    let rightWidth = 0;
    let rightActiveFixedColKey = null;
    const {
      value: fixedColumnRightMap
    } = fixedColumnRightMapRef;
    for (let i = rightFixedColumns.length - 1; i >= 0; --i) {
      const key = getColKey(rightFixedColumns[i]);
      if (Math.round(lastScrollLeft + (((_a = fixedColumnRightMap[key]) === null || _a === void 0 ? void 0 : _a.start) || 0) + tableWidth - rightWidth) < scrollWidth) {
        rightActiveFixedColKey = key;
        rightWidth = ((_b = fixedColumnRightMap[key]) === null || _b === void 0 ? void 0 : _b.end) || 0;
      } else {
        break;
      }
    }
    rightActiveFixedColKeyRef.value = rightActiveFixedColKey;
  }
  function deriveActiveRightFixedChildrenColumns() {
    rightActiveFixedChildrenColKeysRef.value = [];
    let activeRightFixedColumn = props.columns.find((col) => getColKey(col) === rightActiveFixedColKeyRef.value);
    while (activeRightFixedColumn && "children" in activeRightFixedColumn && activeRightFixedColumn.children.length) {
      const nextActiveRightFixedColumn = activeRightFixedColumn.children[0];
      rightActiveFixedChildrenColKeysRef.value.push(getColKey(nextActiveRightFixedColumn));
      activeRightFixedColumn = nextActiveRightFixedColumn;
    }
  }
  function getScrollElements() {
    const header = mainTableInstRef.value ? mainTableInstRef.value.getHeaderElement() : null;
    const body = mainTableInstRef.value ? mainTableInstRef.value.getBodyElement() : null;
    return {
      header,
      body
    };
  }
  function scrollMainTableBodyToTop() {
    const {
      body
    } = getScrollElements();
    if (body) {
      body.scrollTop = 0;
    }
  }
  function handleTableHeaderScroll() {
    if (scrollPartRef.value !== "body") {
      beforeNextFrameOnce(syncScrollState);
    } else {
      scrollPartRef.value = void 0;
    }
  }
  function handleTableBodyScroll(e) {
    var _a;
    (_a = props.onScroll) === null || _a === void 0 ? void 0 : _a.call(props, e);
    if (scrollPartRef.value !== "head") {
      beforeNextFrameOnce(syncScrollState);
    } else {
      scrollPartRef.value = void 0;
    }
  }
  function syncScrollState() {
    const {
      header,
      body
    } = getScrollElements();
    if (!body) return;
    const {
      value: tableWidth
    } = bodyWidthRef;
    if (tableWidth === null) return;
    if (props.maxHeight || props.flexHeight) {
      if (!header) return;
      const directionHead = lastScrollLeft - header.scrollLeft;
      scrollPartRef.value = directionHead !== 0 ? "head" : "body";
      if (scrollPartRef.value === "head") {
        lastScrollLeft = header.scrollLeft;
        body.scrollLeft = lastScrollLeft;
      } else {
        lastScrollLeft = body.scrollLeft;
        header.scrollLeft = lastScrollLeft;
      }
    } else {
      lastScrollLeft = body.scrollLeft;
    }
    deriveActiveLeftFixedColumn();
    deriveActiveLeftFixedChildrenColumns();
    deriveActiveRightFixedColumn();
    deriveActiveRightFixedChildrenColumns();
  }
  function setHeaderScrollLeft(left) {
    const {
      header
    } = getScrollElements();
    if (!header) return;
    header.scrollLeft = left;
    syncScrollState();
  }
  watch(mergedCurrentPageRef, () => {
    scrollMainTableBodyToTop();
  });
  return {
    styleScrollXRef,
    fixedColumnLeftMapRef,
    fixedColumnRightMapRef,
    leftFixedColumnsRef,
    rightFixedColumnsRef,
    leftActiveFixedColKeyRef,
    leftActiveFixedChildrenColKeysRef,
    rightActiveFixedColKeyRef,
    rightActiveFixedChildrenColKeysRef,
    syncScrollState,
    handleTableBodyScroll,
    handleTableHeaderScroll,
    setHeaderScrollLeft
  };
}
function getMultiplePriority(sorter) {
  if (typeof sorter === "object" && typeof sorter.multiple === "number") {
    return sorter.multiple;
  }
  return false;
}
function getSortFunction(sorter, columnKey) {
  if (columnKey && (sorter === void 0 || sorter === "default" || typeof sorter === "object" && sorter.compare === "default")) {
    return getDefaultSorterFn(columnKey);
  }
  if (typeof sorter === "function") {
    return sorter;
  }
  if (sorter && typeof sorter === "object" && sorter.compare && sorter.compare !== "default") {
    return sorter.compare;
  }
  return false;
}
function getDefaultSorterFn(columnKey) {
  return (row1, row2) => {
    const value1 = row1[columnKey];
    const value2 = row2[columnKey];
    if (value1 === null || value1 === void 0) {
      if (value2 === null || value2 === void 0) return 0;
      return -1;
    } else if (value2 === null || value2 === void 0) {
      return 1;
    } else if (typeof value1 === "number" && typeof value2 === "number") {
      return value1 - value2;
    } else if (typeof value1 === "string" && typeof value2 === "string") {
      return value1.localeCompare(value2);
    }
    return 0;
  };
}
function useSorter(props, {
  dataRelatedColsRef,
  filteredDataRef
}) {
  const defaultSortState = [];
  dataRelatedColsRef.value.forEach((column) => {
    var _a;
    if (column.sorter !== void 0) {
      updateSortStatesByNewSortState(defaultSortState, {
        columnKey: column.key,
        sorter: column.sorter,
        order: (_a = column.defaultSortOrder) !== null && _a !== void 0 ? _a : false
      });
    }
  });
  const uncontrolledSortStateRef = ref(defaultSortState);
  const mergedSortStateRef = computed(() => {
    const columnsWithControlledSortOrder = dataRelatedColsRef.value.filter((column) => column.type !== "selection" && column.sorter !== void 0 && (column.sortOrder === "ascend" || column.sortOrder === "descend" || column.sortOrder === false));
    const columnToSort = columnsWithControlledSortOrder.filter((col) => col.sortOrder !== false);
    if (columnToSort.length) {
      return columnToSort.map((column) => {
        return {
          columnKey: column.key,
          // column to sort has controlled sorter
          // sorter && sort order won't be undefined
          order: column.sortOrder,
          sorter: column.sorter
        };
      });
    }
    if (columnsWithControlledSortOrder.length) return [];
    const {
      value: uncontrolledSortState
    } = uncontrolledSortStateRef;
    if (Array.isArray(uncontrolledSortState)) {
      return uncontrolledSortState;
    } else if (uncontrolledSortState) {
      return [uncontrolledSortState];
    } else {
      return [];
    }
  });
  const sortedDataRef = computed(() => {
    const activeSorters = mergedSortStateRef.value.slice().sort((a, b) => {
      const item1Priority = getMultiplePriority(a.sorter) || 0;
      const item2Priority = getMultiplePriority(b.sorter) || 0;
      return item2Priority - item1Priority;
    });
    if (activeSorters.length) {
      const filteredData = filteredDataRef.value.slice();
      return filteredData.sort((tmNode1, tmNode2) => {
        let compareResult = 0;
        activeSorters.some((sorterState) => {
          const {
            columnKey,
            sorter,
            order
          } = sorterState;
          const compareFn = getSortFunction(sorter, columnKey);
          if (compareFn && order) {
            compareResult = compareFn(tmNode1.rawNode, tmNode2.rawNode);
            if (compareResult !== 0) {
              compareResult = compareResult * getFlagOfOrder(order);
              return true;
            }
          }
          return false;
        });
        return compareResult;
      });
    }
    return filteredDataRef.value;
  });
  function getUpdatedSorterState(sortState) {
    let currentSortState = mergedSortStateRef.value.slice();
    if (sortState && getMultiplePriority(sortState.sorter) !== false) {
      currentSortState = currentSortState.filter((sortState2) => getMultiplePriority(sortState2.sorter) !== false);
      updateSortStatesByNewSortState(currentSortState, sortState);
      return currentSortState;
    } else if (sortState) {
      return sortState;
    }
    return null;
  }
  function deriveNextSorter(sortState) {
    const nextSorterState = getUpdatedSorterState(sortState);
    doUpdateSorter(nextSorterState);
  }
  function doUpdateSorter(sortState) {
    const {
      "onUpdate:sorter": _onUpdateSorter,
      onUpdateSorter,
      onSorterChange
    } = props;
    if (_onUpdateSorter) {
      call(_onUpdateSorter, sortState);
    }
    if (onUpdateSorter) {
      call(onUpdateSorter, sortState);
    }
    if (onSorterChange) {
      call(onSorterChange, sortState);
    }
    uncontrolledSortStateRef.value = sortState;
  }
  function sort(columnKey, order = "ascend") {
    if (!columnKey) {
      clearSorter();
    } else {
      const columnToSort = dataRelatedColsRef.value.find((column) => column.type !== "selection" && column.type !== "expand" && column.key === columnKey);
      if (!(columnToSort === null || columnToSort === void 0 ? void 0 : columnToSort.sorter)) return;
      const sorter = columnToSort.sorter;
      deriveNextSorter({
        columnKey,
        sorter,
        order
      });
    }
  }
  function clearSorter() {
    doUpdateSorter(null);
  }
  function updateSortStatesByNewSortState(sortStates, sortState) {
    const index = sortStates.findIndex((state) => (sortState === null || sortState === void 0 ? void 0 : sortState.columnKey) && state.columnKey === sortState.columnKey);
    if (index !== void 0 && index >= 0) {
      sortStates[index] = sortState;
    } else {
      sortStates.push(sortState);
    }
  }
  return {
    clearSorter,
    sort,
    sortedDataRef,
    mergedSortStateRef,
    deriveNextSorter
  };
}
function useTableData(props, {
  dataRelatedColsRef
}) {
  const selectionColumnRef = computed(() => {
    const getSelectionColumn = (cols) => {
      for (let i = 0; i < cols.length; ++i) {
        const col = cols[i];
        if ("children" in col) {
          return getSelectionColumn(col.children);
        } else if (col.type === "selection") {
          return col;
        }
      }
      return null;
    };
    return getSelectionColumn(props.columns);
  });
  const treeMateRef = computed(() => {
    const {
      childrenKey
    } = props;
    return createTreeMate(props.data, {
      ignoreEmptyChildren: true,
      getKey: props.rowKey,
      getChildren: (rowData) => rowData[childrenKey],
      getDisabled: (rowData) => {
        var _a, _b;
        if ((_b = (_a = selectionColumnRef.value) === null || _a === void 0 ? void 0 : _a.disabled) === null || _b === void 0 ? void 0 : _b.call(_a, rowData)) {
          return true;
        }
        return false;
      }
    });
  });
  const childTriggerColIndexRef = useMemo(() => {
    const {
      columns
    } = props;
    const {
      length
    } = columns;
    let firstContentfulColIndex = null;
    for (let i = 0; i < length; ++i) {
      const col = columns[i];
      if (!col.type && firstContentfulColIndex === null) {
        firstContentfulColIndex = i;
      }
      if ("tree" in col && col.tree) {
        return i;
      }
    }
    return firstContentfulColIndex || 0;
  });
  const uncontrolledFilterStateRef = ref({});
  const {
    pagination
  } = props;
  const uncontrolledCurrentPageRef = ref(pagination ? pagination.defaultPage || 1 : 1);
  const uncontrolledPageSizeRef = ref(getDefaultPageSize(pagination));
  const mergedFilterStateRef = computed(() => {
    const columnsWithControlledFilter = dataRelatedColsRef.value.filter((column) => {
      return column.filterOptionValues !== void 0 || column.filterOptionValue !== void 0;
    });
    const controlledFilterState = {};
    columnsWithControlledFilter.forEach((column) => {
      var _a;
      if (column.type === "selection" || column.type === "expand") return;
      if (column.filterOptionValues === void 0) {
        controlledFilterState[column.key] = (_a = column.filterOptionValue) !== null && _a !== void 0 ? _a : null;
      } else {
        controlledFilterState[column.key] = column.filterOptionValues;
      }
    });
    const activeFilters = Object.assign(createShallowClonedObject(uncontrolledFilterStateRef.value), controlledFilterState);
    return activeFilters;
  });
  const filteredDataRef = computed(() => {
    const mergedFilterState = mergedFilterStateRef.value;
    const {
      columns
    } = props;
    function createDefaultFilter(columnKey) {
      return (filterOptionValue, row) => !!~String(row[columnKey]).indexOf(String(filterOptionValue));
    }
    const {
      value: {
        treeNodes: data
      }
    } = treeMateRef;
    const columnEntries = [];
    columns.forEach((column) => {
      if (column.type === "selection" || column.type === "expand" || "children" in column) {
        return;
      }
      columnEntries.push([column.key, column]);
    });
    return data ? data.filter((tmNode) => {
      const {
        rawNode: row
      } = tmNode;
      for (const [columnKey, column] of columnEntries) {
        let activeFilterOptionValues = mergedFilterState[columnKey];
        if (activeFilterOptionValues == null) continue;
        if (!Array.isArray(activeFilterOptionValues)) {
          activeFilterOptionValues = [activeFilterOptionValues];
        }
        if (!activeFilterOptionValues.length) continue;
        const filter22 = column.filter === "default" ? createDefaultFilter(columnKey) : column.filter;
        if (column && typeof filter22 === "function") {
          if (column.filterMode === "and") {
            if (activeFilterOptionValues.some((filterOptionValue) => !filter22(filterOptionValue, row))) {
              return false;
            }
          } else {
            if (activeFilterOptionValues.some((filterOptionValue) => filter22(filterOptionValue, row))) {
              continue;
            } else {
              return false;
            }
          }
        }
      }
      return true;
    }) : [];
  });
  const {
    sortedDataRef,
    deriveNextSorter,
    mergedSortStateRef,
    sort,
    clearSorter
  } = useSorter(props, {
    dataRelatedColsRef,
    filteredDataRef
  });
  dataRelatedColsRef.value.forEach((column) => {
    var _a;
    if (column.filter) {
      const defaultFilterOptionValues = column.defaultFilterOptionValues;
      if (column.filterMultiple) {
        uncontrolledFilterStateRef.value[column.key] = defaultFilterOptionValues || [];
      } else if (defaultFilterOptionValues !== void 0) {
        uncontrolledFilterStateRef.value[column.key] = defaultFilterOptionValues === null ? [] : defaultFilterOptionValues;
      } else {
        uncontrolledFilterStateRef.value[column.key] = (_a = column.defaultFilterOptionValue) !== null && _a !== void 0 ? _a : null;
      }
    }
  });
  const controlledCurrentPageRef = computed(() => {
    const {
      pagination: pagination2
    } = props;
    if (pagination2 === false) return void 0;
    return pagination2.page;
  });
  const controlledPageSizeRef = computed(() => {
    const {
      pagination: pagination2
    } = props;
    if (pagination2 === false) return void 0;
    return pagination2.pageSize;
  });
  const _mergedCurrentPageRef = useMergedState(controlledCurrentPageRef, uncontrolledCurrentPageRef);
  const mergedPageSizeRef = useMergedState(controlledPageSizeRef, uncontrolledPageSizeRef);
  const boundedMergedCurrentPageRef = useMemo(() => {
    const page2 = _mergedCurrentPageRef.value;
    return props.remote ? page2 : Math.max(1, Math.min(Math.ceil(filteredDataRef.value.length / mergedPageSizeRef.value), page2));
  });
  const mergedPageCountRef = computed(() => {
    const {
      pagination: pagination2
    } = props;
    if (pagination2) {
      const {
        pageCount
      } = pagination2;
      if (pageCount !== void 0) return pageCount;
    }
    return void 0;
  });
  const paginatedDataRef = computed(() => {
    if (props.remote) return treeMateRef.value.treeNodes;
    if (!props.pagination) return sortedDataRef.value;
    const pageSize = mergedPageSizeRef.value;
    const startIndex = (boundedMergedCurrentPageRef.value - 1) * pageSize;
    return sortedDataRef.value.slice(startIndex, startIndex + pageSize);
  });
  const rawPaginatedDataRef = computed(() => {
    return paginatedDataRef.value.map((tmNode) => tmNode.rawNode);
  });
  function mergedOnUpdatePage(page2) {
    const {
      pagination: pagination2
    } = props;
    if (pagination2) {
      const {
        onChange,
        "onUpdate:page": _onUpdatePage,
        onUpdatePage
      } = pagination2;
      if (onChange) call(onChange, page2);
      if (onUpdatePage) call(onUpdatePage, page2);
      if (_onUpdatePage) call(_onUpdatePage, page2);
      doUpdatePage(page2);
    }
  }
  function mergedOnUpdatePageSize(pageSize) {
    const {
      pagination: pagination2
    } = props;
    if (pagination2) {
      const {
        onPageSizeChange,
        "onUpdate:pageSize": _onUpdatePageSize,
        onUpdatePageSize
      } = pagination2;
      if (onPageSizeChange) call(onPageSizeChange, pageSize);
      if (onUpdatePageSize) call(onUpdatePageSize, pageSize);
      if (_onUpdatePageSize) call(_onUpdatePageSize, pageSize);
      doUpdatePageSize(pageSize);
    }
  }
  const mergedItemCountRef = computed(() => {
    if (props.remote) {
      const {
        pagination: pagination2
      } = props;
      if (pagination2) {
        const {
          itemCount
        } = pagination2;
        if (itemCount !== void 0) return itemCount;
      }
      return void 0;
    }
    return filteredDataRef.value.length;
  });
  const mergedPaginationRef = computed(() => {
    return Object.assign(Object.assign({}, props.pagination), {
      // reset deprecated methods
      onChange: void 0,
      onUpdatePage: void 0,
      onUpdatePageSize: void 0,
      onPageSizeChange: void 0,
      "onUpdate:page": mergedOnUpdatePage,
      "onUpdate:pageSize": mergedOnUpdatePageSize,
      // writing merged props after pagination to avoid
      // pagination[key] === undefined
      // key still exists but value is undefined
      page: boundedMergedCurrentPageRef.value,
      pageSize: mergedPageSizeRef.value,
      pageCount: mergedItemCountRef.value === void 0 ? mergedPageCountRef.value : void 0,
      itemCount: mergedItemCountRef.value
    });
  });
  function doUpdatePage(page2) {
    const {
      "onUpdate:page": _onUpdatePage,
      onPageChange,
      onUpdatePage
    } = props;
    if (onUpdatePage) call(onUpdatePage, page2);
    if (_onUpdatePage) call(_onUpdatePage, page2);
    if (onPageChange) call(onPageChange, page2);
    uncontrolledCurrentPageRef.value = page2;
  }
  function doUpdatePageSize(pageSize) {
    const {
      "onUpdate:pageSize": _onUpdatePageSize,
      onPageSizeChange,
      onUpdatePageSize
    } = props;
    if (onPageSizeChange) call(onPageSizeChange, pageSize);
    if (onUpdatePageSize) call(onUpdatePageSize, pageSize);
    if (_onUpdatePageSize) call(_onUpdatePageSize, pageSize);
    uncontrolledPageSizeRef.value = pageSize;
  }
  function doUpdateFilters(filters2, sourceColumn) {
    const {
      onUpdateFilters,
      "onUpdate:filters": _onUpdateFilters,
      onFiltersChange
    } = props;
    if (onUpdateFilters) call(onUpdateFilters, filters2, sourceColumn);
    if (_onUpdateFilters) call(_onUpdateFilters, filters2, sourceColumn);
    if (onFiltersChange) call(onFiltersChange, filters2, sourceColumn);
    uncontrolledFilterStateRef.value = filters2;
  }
  function onUnstableColumnResize(resizedWidth, limitedWidth, column, getColumnWidth) {
    var _a;
    (_a = props.onUnstableColumnResize) === null || _a === void 0 ? void 0 : _a.call(props, resizedWidth, limitedWidth, column, getColumnWidth);
  }
  function page(page2) {
    doUpdatePage(page2);
  }
  function clearFilter() {
    clearFilters();
  }
  function clearFilters() {
    filters({});
  }
  function filters(filters2) {
    filter2(filters2);
  }
  function filter2(filters2) {
    if (!filters2) {
      uncontrolledFilterStateRef.value = {};
    } else if (filters2) {
      uncontrolledFilterStateRef.value = createShallowClonedObject(filters2);
    } else ;
  }
  return {
    treeMateRef,
    mergedCurrentPageRef: boundedMergedCurrentPageRef,
    mergedPaginationRef,
    paginatedDataRef,
    rawPaginatedDataRef,
    mergedFilterStateRef,
    mergedSortStateRef,
    hoverKeyRef: ref(null),
    selectionColumnRef,
    childTriggerColIndexRef,
    doUpdateFilters,
    deriveNextSorter,
    doUpdatePageSize,
    doUpdatePage,
    onUnstableColumnResize,
    // exported methods
    filter: filter2,
    filters,
    clearFilter,
    clearFilters,
    clearSorter,
    page,
    sort
  };
}
const NDataTable = defineComponent({
  name: "DataTable",
  alias: ["AdvancedTable"],
  props: dataTableProps,
  slots: Object,
  setup(props, {
    slots
  }) {
    const {
      mergedBorderedRef,
      mergedClsPrefixRef,
      inlineThemeDisabled,
      mergedRtlRef
    } = useConfig(props);
    const rtlEnabledRef = useRtl("DataTable", mergedRtlRef, mergedClsPrefixRef);
    const mergedBottomBorderedRef = computed(() => {
      const {
        bottomBordered
      } = props;
      if (mergedBorderedRef.value) return false;
      if (bottomBordered !== void 0) return bottomBordered;
      return true;
    });
    const themeRef = useTheme("DataTable", "-data-table", style$1, dataTableLight, props, mergedClsPrefixRef);
    const bodyWidthRef = ref(null);
    const mainTableInstRef = ref(null);
    const {
      getResizableWidth,
      clearResizableWidth,
      doUpdateResizableWidth
    } = useResizable();
    const {
      rowsRef,
      colsRef,
      dataRelatedColsRef,
      hasEllipsisRef
    } = useGroupHeader(props, getResizableWidth);
    const {
      treeMateRef,
      mergedCurrentPageRef,
      paginatedDataRef,
      rawPaginatedDataRef,
      selectionColumnRef,
      hoverKeyRef,
      mergedPaginationRef,
      mergedFilterStateRef,
      mergedSortStateRef,
      childTriggerColIndexRef,
      doUpdatePage,
      doUpdateFilters,
      onUnstableColumnResize,
      deriveNextSorter,
      filter: filter2,
      filters,
      clearFilter,
      clearFilters,
      clearSorter,
      page,
      sort
    } = useTableData(props, {
      dataRelatedColsRef
    });
    const downloadCsv = (options) => {
      const {
        fileName = "data.csv",
        keepOriginalData = false
      } = options || {};
      const data = keepOriginalData ? props.data : rawPaginatedDataRef.value;
      const csvData = generateCsv(props.columns, data, props.getCsvCell, props.getCsvHeader);
      const blob = new Blob([csvData], {
        type: "text/csv;charset=utf-8"
      });
      const downloadUrl = URL.createObjectURL(blob);
      download(downloadUrl, fileName.endsWith(".csv") ? fileName : `${fileName}.csv`);
      URL.revokeObjectURL(downloadUrl);
    };
    const {
      doCheckAll,
      doUncheckAll,
      doCheck,
      doUncheck,
      headerCheckboxDisabledRef,
      someRowsCheckedRef,
      allRowsCheckedRef,
      mergedCheckedRowKeySetRef,
      mergedInderminateRowKeySetRef
    } = useCheck(props, {
      selectionColumnRef,
      treeMateRef,
      paginatedDataRef
    });
    const {
      stickyExpandedRowsRef,
      mergedExpandedRowKeysRef,
      renderExpandRef,
      expandableRef,
      doUpdateExpandedRowKeys
    } = useExpand(props, treeMateRef);
    const {
      handleTableBodyScroll,
      handleTableHeaderScroll,
      syncScrollState,
      setHeaderScrollLeft,
      leftActiveFixedColKeyRef,
      leftActiveFixedChildrenColKeysRef,
      rightActiveFixedColKeyRef,
      rightActiveFixedChildrenColKeysRef,
      leftFixedColumnsRef,
      rightFixedColumnsRef,
      fixedColumnLeftMapRef,
      fixedColumnRightMapRef
    } = useScroll(props, {
      bodyWidthRef,
      mainTableInstRef,
      mergedCurrentPageRef
    });
    const {
      localeRef
    } = useLocale("DataTable");
    const mergedTableLayoutRef = computed(() => {
      if (props.virtualScroll || props.flexHeight || props.maxHeight !== void 0 || hasEllipsisRef.value) {
        return "fixed";
      }
      return props.tableLayout;
    });
    provide(dataTableInjectionKey, {
      props,
      treeMateRef,
      renderExpandIconRef: toRef(props, "renderExpandIcon"),
      loadingKeySetRef: ref(/* @__PURE__ */ new Set()),
      slots,
      indentRef: toRef(props, "indent"),
      childTriggerColIndexRef,
      bodyWidthRef,
      componentId: createId(),
      hoverKeyRef,
      mergedClsPrefixRef,
      mergedThemeRef: themeRef,
      scrollXRef: computed(() => props.scrollX),
      rowsRef,
      colsRef,
      paginatedDataRef,
      leftActiveFixedColKeyRef,
      leftActiveFixedChildrenColKeysRef,
      rightActiveFixedColKeyRef,
      rightActiveFixedChildrenColKeysRef,
      leftFixedColumnsRef,
      rightFixedColumnsRef,
      fixedColumnLeftMapRef,
      fixedColumnRightMapRef,
      mergedCurrentPageRef,
      someRowsCheckedRef,
      allRowsCheckedRef,
      mergedSortStateRef,
      mergedFilterStateRef,
      loadingRef: toRef(props, "loading"),
      rowClassNameRef: toRef(props, "rowClassName"),
      mergedCheckedRowKeySetRef,
      mergedExpandedRowKeysRef,
      mergedInderminateRowKeySetRef,
      localeRef,
      expandableRef,
      stickyExpandedRowsRef,
      rowKeyRef: toRef(props, "rowKey"),
      renderExpandRef,
      summaryRef: toRef(props, "summary"),
      virtualScrollRef: toRef(props, "virtualScroll"),
      virtualScrollXRef: toRef(props, "virtualScrollX"),
      heightForRowRef: toRef(props, "heightForRow"),
      minRowHeightRef: toRef(props, "minRowHeight"),
      virtualScrollHeaderRef: toRef(props, "virtualScrollHeader"),
      headerHeightRef: toRef(props, "headerHeight"),
      rowPropsRef: toRef(props, "rowProps"),
      stripedRef: toRef(props, "striped"),
      checkOptionsRef: computed(() => {
        const {
          value: selectionColumn
        } = selectionColumnRef;
        return selectionColumn === null || selectionColumn === void 0 ? void 0 : selectionColumn.options;
      }),
      rawPaginatedDataRef,
      filterMenuCssVarsRef: computed(() => {
        const {
          self: {
            actionDividerColor,
            actionPadding,
            actionButtonMargin
          }
        } = themeRef.value;
        return {
          "--n-action-padding": actionPadding,
          "--n-action-button-margin": actionButtonMargin,
          "--n-action-divider-color": actionDividerColor
        };
      }),
      onLoadRef: toRef(props, "onLoad"),
      mergedTableLayoutRef,
      maxHeightRef: toRef(props, "maxHeight"),
      minHeightRef: toRef(props, "minHeight"),
      flexHeightRef: toRef(props, "flexHeight"),
      headerCheckboxDisabledRef,
      paginationBehaviorOnFilterRef: toRef(props, "paginationBehaviorOnFilter"),
      summaryPlacementRef: toRef(props, "summaryPlacement"),
      filterIconPopoverPropsRef: toRef(props, "filterIconPopoverProps"),
      scrollbarPropsRef: toRef(props, "scrollbarProps"),
      syncScrollState,
      doUpdatePage,
      doUpdateFilters,
      getResizableWidth,
      onUnstableColumnResize,
      clearResizableWidth,
      doUpdateResizableWidth,
      deriveNextSorter,
      doCheck,
      doUncheck,
      doCheckAll,
      doUncheckAll,
      doUpdateExpandedRowKeys,
      handleTableHeaderScroll,
      handleTableBodyScroll,
      setHeaderScrollLeft,
      renderCell: toRef(props, "renderCell")
    });
    const exposedMethods = {
      filter: filter2,
      filters,
      clearFilters,
      clearSorter,
      page,
      sort,
      clearFilter,
      downloadCsv,
      scrollTo: (arg0, arg1) => {
        var _a;
        (_a = mainTableInstRef.value) === null || _a === void 0 ? void 0 : _a.scrollTo(arg0, arg1);
      }
    };
    const cssVarsRef = computed(() => {
      const {
        size
      } = props;
      const {
        common: {
          cubicBezierEaseInOut
        },
        self: {
          borderColor,
          tdColorHover,
          tdColorSorting,
          tdColorSortingModal,
          tdColorSortingPopover,
          thColorSorting,
          thColorSortingModal,
          thColorSortingPopover,
          thColor,
          thColorHover,
          tdColor,
          tdTextColor,
          thTextColor,
          thFontWeight,
          thButtonColorHover,
          thIconColor,
          thIconColorActive,
          filterSize,
          borderRadius,
          lineHeight,
          tdColorModal,
          thColorModal,
          borderColorModal,
          thColorHoverModal,
          tdColorHoverModal,
          borderColorPopover,
          thColorPopover,
          tdColorPopover,
          tdColorHoverPopover,
          thColorHoverPopover,
          paginationMargin,
          emptyPadding,
          boxShadowAfter,
          boxShadowBefore,
          sorterSize,
          resizableContainerSize,
          resizableSize,
          loadingColor,
          loadingSize,
          opacityLoading,
          tdColorStriped,
          tdColorStripedModal,
          tdColorStripedPopover,
          [createKey("fontSize", size)]: fontSize,
          [createKey("thPadding", size)]: thPadding,
          [createKey("tdPadding", size)]: tdPadding
        }
      } = themeRef.value;
      return {
        "--n-font-size": fontSize,
        "--n-th-padding": thPadding,
        "--n-td-padding": tdPadding,
        "--n-bezier": cubicBezierEaseInOut,
        "--n-border-radius": borderRadius,
        "--n-line-height": lineHeight,
        "--n-border-color": borderColor,
        "--n-border-color-modal": borderColorModal,
        "--n-border-color-popover": borderColorPopover,
        "--n-th-color": thColor,
        "--n-th-color-hover": thColorHover,
        "--n-th-color-modal": thColorModal,
        "--n-th-color-hover-modal": thColorHoverModal,
        "--n-th-color-popover": thColorPopover,
        "--n-th-color-hover-popover": thColorHoverPopover,
        "--n-td-color": tdColor,
        "--n-td-color-hover": tdColorHover,
        "--n-td-color-modal": tdColorModal,
        "--n-td-color-hover-modal": tdColorHoverModal,
        "--n-td-color-popover": tdColorPopover,
        "--n-td-color-hover-popover": tdColorHoverPopover,
        "--n-th-text-color": thTextColor,
        "--n-td-text-color": tdTextColor,
        "--n-th-font-weight": thFontWeight,
        "--n-th-button-color-hover": thButtonColorHover,
        "--n-th-icon-color": thIconColor,
        "--n-th-icon-color-active": thIconColorActive,
        "--n-filter-size": filterSize,
        "--n-pagination-margin": paginationMargin,
        "--n-empty-padding": emptyPadding,
        "--n-box-shadow-before": boxShadowBefore,
        "--n-box-shadow-after": boxShadowAfter,
        "--n-sorter-size": sorterSize,
        "--n-resizable-container-size": resizableContainerSize,
        "--n-resizable-size": resizableSize,
        "--n-loading-size": loadingSize,
        "--n-loading-color": loadingColor,
        "--n-opacity-loading": opacityLoading,
        "--n-td-color-striped": tdColorStriped,
        "--n-td-color-striped-modal": tdColorStripedModal,
        "--n-td-color-striped-popover": tdColorStripedPopover,
        "--n-td-color-sorting": tdColorSorting,
        "--n-td-color-sorting-modal": tdColorSortingModal,
        "--n-td-color-sorting-popover": tdColorSortingPopover,
        "--n-th-color-sorting": thColorSorting,
        "--n-th-color-sorting-modal": thColorSortingModal,
        "--n-th-color-sorting-popover": thColorSortingPopover
      };
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass("data-table", computed(() => props.size[0]), cssVarsRef, props) : void 0;
    const mergedShowPaginationRef = computed(() => {
      if (!props.pagination) return false;
      if (props.paginateSinglePage) return true;
      const mergedPagination = mergedPaginationRef.value;
      const {
        pageCount
      } = mergedPagination;
      if (pageCount !== void 0) return pageCount > 1;
      return mergedPagination.itemCount && mergedPagination.pageSize && mergedPagination.itemCount > mergedPagination.pageSize;
    });
    return Object.assign({
      mainTableInstRef,
      mergedClsPrefix: mergedClsPrefixRef,
      rtlEnabled: rtlEnabledRef,
      mergedTheme: themeRef,
      paginatedData: paginatedDataRef,
      mergedBordered: mergedBorderedRef,
      mergedBottomBordered: mergedBottomBorderedRef,
      mergedPagination: mergedPaginationRef,
      mergedShowPagination: mergedShowPaginationRef,
      cssVars: inlineThemeDisabled ? void 0 : cssVarsRef,
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
    }, exposedMethods);
  },
  render() {
    const {
      mergedClsPrefix,
      themeClass,
      onRender,
      $slots,
      spinProps
    } = this;
    onRender === null || onRender === void 0 ? void 0 : onRender();
    return h("div", {
      class: [`${mergedClsPrefix}-data-table`, this.rtlEnabled && `${mergedClsPrefix}-data-table--rtl`, themeClass, {
        [`${mergedClsPrefix}-data-table--bordered`]: this.mergedBordered,
        [`${mergedClsPrefix}-data-table--bottom-bordered`]: this.mergedBottomBordered,
        [`${mergedClsPrefix}-data-table--single-line`]: this.singleLine,
        [`${mergedClsPrefix}-data-table--single-column`]: this.singleColumn,
        [`${mergedClsPrefix}-data-table--loading`]: this.loading,
        [`${mergedClsPrefix}-data-table--flex-height`]: this.flexHeight
      }],
      style: this.cssVars
    }, h("div", {
      class: `${mergedClsPrefix}-data-table-wrapper`
    }, h(MainTable, {
      ref: "mainTableInstRef"
    })), this.mergedShowPagination ? h("div", {
      class: `${mergedClsPrefix}-data-table__pagination`
    }, h(NPagination, Object.assign({
      theme: this.mergedTheme.peers.Pagination,
      themeOverrides: this.mergedTheme.peerOverrides.Pagination,
      disabled: this.loading
    }, this.mergedPagination))) : null, h(Transition, {
      name: "fade-in-scale-up-transition"
    }, {
      default: () => {
        return this.loading ? h("div", {
          class: `${mergedClsPrefix}-data-table-loading-wrapper`
        }, resolveSlot($slots.loading, () => [h(NBaseLoading, Object.assign({
          clsPrefix: mergedClsPrefix,
          strokeWidth: 20
        }, spinProps))])) : null;
      }
    }));
  }
});
const style = c$1([cB("descriptions", {
  fontSize: "var(--n-font-size)"
}, [cB("descriptions-separator", `
 display: inline-block;
 margin: 0 8px 0 2px;
 `), cB("descriptions-table-wrapper", [cB("descriptions-table", [cB("descriptions-table-row", [cB("descriptions-table-header", {
  padding: "var(--n-th-padding)"
}), cB("descriptions-table-content", {
  padding: "var(--n-td-padding)"
})])])]), cNotM("bordered", [cB("descriptions-table-wrapper", [cB("descriptions-table", [cB("descriptions-table-row", [c$1("&:last-child", [cB("descriptions-table-content", {
  paddingBottom: 0
})])])])])]), cM("left-label-placement", [cB("descriptions-table-content", [c$1("> *", {
  verticalAlign: "top"
})])]), cM("left-label-align", [c$1("th", {
  textAlign: "left"
})]), cM("center-label-align", [c$1("th", {
  textAlign: "center"
})]), cM("right-label-align", [c$1("th", {
  textAlign: "right"
})]), cM("bordered", [cB("descriptions-table-wrapper", `
 border-radius: var(--n-border-radius);
 overflow: hidden;
 background: var(--n-merged-td-color);
 border: 1px solid var(--n-merged-border-color);
 `, [cB("descriptions-table", [cB("descriptions-table-row", [c$1("&:not(:last-child)", [cB("descriptions-table-content", {
  borderBottom: "1px solid var(--n-merged-border-color)"
}), cB("descriptions-table-header", {
  borderBottom: "1px solid var(--n-merged-border-color)"
})]), cB("descriptions-table-header", `
 font-weight: 400;
 background-clip: padding-box;
 background-color: var(--n-merged-th-color);
 `, [c$1("&:not(:last-child)", {
  borderRight: "1px solid var(--n-merged-border-color)"
})]), cB("descriptions-table-content", [c$1("&:not(:last-child)", {
  borderRight: "1px solid var(--n-merged-border-color)"
})])])])])]), cB("descriptions-header", `
 font-weight: var(--n-th-font-weight);
 font-size: 18px;
 transition: color .3s var(--n-bezier);
 line-height: var(--n-line-height);
 margin-bottom: 16px;
 color: var(--n-title-text-color);
 `), cB("descriptions-table-wrapper", `
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `, [cB("descriptions-table", `
 width: 100%;
 border-collapse: separate;
 border-spacing: 0;
 box-sizing: border-box;
 `, [cB("descriptions-table-row", `
 box-sizing: border-box;
 transition: border-color .3s var(--n-bezier);
 `, [cB("descriptions-table-header", `
 font-weight: var(--n-th-font-weight);
 line-height: var(--n-line-height);
 display: table-cell;
 box-sizing: border-box;
 color: var(--n-th-text-color);
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `), cB("descriptions-table-content", `
 vertical-align: top;
 line-height: var(--n-line-height);
 display: table-cell;
 box-sizing: border-box;
 color: var(--n-td-text-color);
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `, [cE("content", `
 transition: color .3s var(--n-bezier);
 display: inline-block;
 color: var(--n-td-text-color);
 `)]), cE("label", `
 font-weight: var(--n-th-font-weight);
 transition: color .3s var(--n-bezier);
 display: inline-block;
 margin-right: 14px;
 color: var(--n-th-text-color);
 `)])])])]), cB("descriptions-table-wrapper", `
 --n-merged-th-color: var(--n-th-color);
 --n-merged-td-color: var(--n-td-color);
 --n-merged-border-color: var(--n-border-color);
 `), insideModal(cB("descriptions-table-wrapper", `
 --n-merged-th-color: var(--n-th-color-modal);
 --n-merged-td-color: var(--n-td-color-modal);
 --n-merged-border-color: var(--n-border-color-modal);
 `)), insidePopover(cB("descriptions-table-wrapper", `
 --n-merged-th-color: var(--n-th-color-popover);
 --n-merged-td-color: var(--n-td-color-popover);
 --n-merged-border-color: var(--n-border-color-popover);
 `))]);
const DESCRIPTION_ITEM_FLAG = "DESCRIPTION_ITEM_FLAG";
function isDescriptionsItem(vNode) {
  if (typeof vNode === "object" && vNode && !Array.isArray(vNode)) {
    return vNode.type && vNode.type[DESCRIPTION_ITEM_FLAG];
  }
  return false;
}
const descriptionsProps = Object.assign(Object.assign({}, useTheme.props), {
  title: String,
  column: {
    type: Number,
    default: 3
  },
  columns: Number,
  labelPlacement: {
    type: String,
    default: "top"
  },
  labelAlign: {
    type: String,
    default: "left"
  },
  separator: {
    type: String,
    default: ":"
  },
  size: {
    type: String,
    default: "medium"
  },
  bordered: Boolean,
  labelClass: String,
  labelStyle: [Object, String],
  contentClass: String,
  contentStyle: [Object, String]
});
const NDescriptions = defineComponent({
  name: "Descriptions",
  props: descriptionsProps,
  slots: Object,
  setup(props) {
    const {
      mergedClsPrefixRef,
      inlineThemeDisabled
    } = useConfig(props);
    const themeRef = useTheme("Descriptions", "-descriptions", style, descriptionsLight, props, mergedClsPrefixRef);
    const cssVarsRef = computed(() => {
      const {
        size,
        bordered
      } = props;
      const {
        common: {
          cubicBezierEaseInOut
        },
        self: {
          titleTextColor,
          thColor,
          thColorModal,
          thColorPopover,
          thTextColor,
          thFontWeight,
          tdTextColor,
          tdColor,
          tdColorModal,
          tdColorPopover,
          borderColor,
          borderColorModal,
          borderColorPopover,
          borderRadius,
          lineHeight,
          [createKey("fontSize", size)]: fontSize,
          [createKey(bordered ? "thPaddingBordered" : "thPadding", size)]: thPadding,
          [createKey(bordered ? "tdPaddingBordered" : "tdPadding", size)]: tdPadding
        }
      } = themeRef.value;
      return {
        "--n-title-text-color": titleTextColor,
        "--n-th-padding": thPadding,
        "--n-td-padding": tdPadding,
        "--n-font-size": fontSize,
        "--n-bezier": cubicBezierEaseInOut,
        "--n-th-font-weight": thFontWeight,
        "--n-line-height": lineHeight,
        "--n-th-text-color": thTextColor,
        "--n-td-text-color": tdTextColor,
        "--n-th-color": thColor,
        "--n-th-color-modal": thColorModal,
        "--n-th-color-popover": thColorPopover,
        "--n-td-color": tdColor,
        "--n-td-color-modal": tdColorModal,
        "--n-td-color-popover": tdColorPopover,
        "--n-border-radius": borderRadius,
        "--n-border-color": borderColor,
        "--n-border-color-modal": borderColorModal,
        "--n-border-color-popover": borderColorPopover
      };
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass("descriptions", computed(() => {
      let hash = "";
      const {
        size,
        bordered
      } = props;
      if (bordered) hash += "a";
      hash += size[0];
      return hash;
    }), cssVarsRef, props) : void 0;
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      cssVars: inlineThemeDisabled ? void 0 : cssVarsRef,
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender,
      compitableColumn: useCompitable(props, ["columns", "column"]),
      inlineThemeDisabled
    };
  },
  render() {
    const defaultSlots = this.$slots.default;
    const children = defaultSlots ? flatten$1(defaultSlots()) : [];
    children.length;
    const {
      contentClass,
      labelClass,
      compitableColumn,
      labelPlacement,
      labelAlign,
      size,
      bordered,
      title,
      cssVars,
      mergedClsPrefix,
      separator,
      onRender
    } = this;
    onRender === null || onRender === void 0 ? void 0 : onRender();
    const filteredChildren = children.filter((child) => isDescriptionsItem(child));
    const defaultState = {
      span: 0,
      row: [],
      secondRow: [],
      rows: []
    };
    const itemState = filteredChildren.reduce((state, vNode, index) => {
      const props = vNode.props || {};
      const isLastIteration = filteredChildren.length - 1 === index;
      const itemLabel = ["label" in props ? props.label : getVNodeChildren(vNode, "label")];
      const itemChildren = [getVNodeChildren(vNode)];
      const itemSpan = props.span || 1;
      const memorizedSpan = state.span;
      state.span += itemSpan;
      const labelStyle = props.labelStyle || props["label-style"] || this.labelStyle;
      const contentStyle = props.contentStyle || props["content-style"] || this.contentStyle;
      if (labelPlacement === "left") {
        if (bordered) {
          state.row.push(h("th", {
            class: [`${mergedClsPrefix}-descriptions-table-header`, labelClass],
            colspan: 1,
            style: labelStyle
          }, itemLabel), h("td", {
            class: [`${mergedClsPrefix}-descriptions-table-content`, contentClass],
            colspan: isLastIteration ? (compitableColumn - memorizedSpan) * 2 + 1 : itemSpan * 2 - 1,
            style: contentStyle
          }, itemChildren));
        } else {
          state.row.push(h("td", {
            class: `${mergedClsPrefix}-descriptions-table-content`,
            colspan: isLastIteration ? (compitableColumn - memorizedSpan) * 2 : itemSpan * 2
          }, h("span", {
            class: [`${mergedClsPrefix}-descriptions-table-content__label`, labelClass],
            style: labelStyle
          }, [...itemLabel, separator && h("span", {
            class: `${mergedClsPrefix}-descriptions-separator`
          }, separator)]), h("span", {
            class: [`${mergedClsPrefix}-descriptions-table-content__content`, contentClass],
            style: contentStyle
          }, itemChildren)));
        }
      } else {
        const colspan = isLastIteration ? (compitableColumn - memorizedSpan) * 2 : itemSpan * 2;
        state.row.push(h("th", {
          class: [`${mergedClsPrefix}-descriptions-table-header`, labelClass],
          colspan,
          style: labelStyle
        }, itemLabel));
        state.secondRow.push(h("td", {
          class: [`${mergedClsPrefix}-descriptions-table-content`, contentClass],
          colspan,
          style: contentStyle
        }, itemChildren));
      }
      if (state.span >= compitableColumn || isLastIteration) {
        state.span = 0;
        if (state.row.length) {
          state.rows.push(state.row);
          state.row = [];
        }
        if (labelPlacement !== "left") {
          if (state.secondRow.length) {
            state.rows.push(state.secondRow);
            state.secondRow = [];
          }
        }
      }
      return state;
    }, defaultState);
    const rows = itemState.rows.map((row) => h("tr", {
      class: `${mergedClsPrefix}-descriptions-table-row`
    }, row));
    return h("div", {
      style: cssVars,
      class: [`${mergedClsPrefix}-descriptions`, this.themeClass, `${mergedClsPrefix}-descriptions--${labelPlacement}-label-placement`, `${mergedClsPrefix}-descriptions--${labelAlign}-label-align`, `${mergedClsPrefix}-descriptions--${size}-size`, bordered && `${mergedClsPrefix}-descriptions--bordered`]
    }, title || this.$slots.header ? h("div", {
      class: `${mergedClsPrefix}-descriptions-header`
    }, title || getSlot(this, "header")) : null, h("div", {
      class: `${mergedClsPrefix}-descriptions-table-wrapper`
    }, h("table", {
      class: `${mergedClsPrefix}-descriptions-table`
    }, h("tbody", null, labelPlacement === "top" && h("tr", {
      class: `${mergedClsPrefix}-descriptions-table-row`,
      style: {
        visibility: "collapse"
      }
    }, repeat(compitableColumn * 2, h("td", null))), rows))));
  }
});
const descriptionsItemProps = {
  label: String,
  span: {
    type: Number,
    default: 1
  },
  labelClass: String,
  labelStyle: [Object, String],
  contentClass: String,
  contentStyle: [Object, String]
};
const NDescriptionsItem = defineComponent({
  name: "DescriptionsItem",
  [DESCRIPTION_ITEM_FLAG]: true,
  props: descriptionsItemProps,
  slots: Object,
  render() {
    return null;
  }
});
function bind(fn, thisArg) {
  return function wrap() {
    return fn.apply(thisArg, arguments);
  };
}
const { toString } = Object.prototype;
const { getPrototypeOf } = Object;
const { iterator, toStringTag } = Symbol;
const kindOf = /* @__PURE__ */ ((cache) => (thing) => {
  const str = toString.call(thing);
  return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null));
const kindOfTest = (type) => {
  type = type.toLowerCase();
  return (thing) => kindOf(thing) === type;
};
const typeOfTest = (type) => (thing) => typeof thing === type;
const { isArray } = Array;
const isUndefined = typeOfTest("undefined");
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && isFunction(val.constructor.isBuffer) && val.constructor.isBuffer(val);
}
const isArrayBuffer = kindOfTest("ArrayBuffer");
function isArrayBufferView(val) {
  let result;
  if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
    result = ArrayBuffer.isView(val);
  } else {
    result = val && val.buffer && isArrayBuffer(val.buffer);
  }
  return result;
}
const isString = typeOfTest("string");
const isFunction = typeOfTest("function");
const isNumber = typeOfTest("number");
const isObject = (thing) => thing !== null && typeof thing === "object";
const isBoolean = (thing) => thing === true || thing === false;
const isPlainObject = (val) => {
  if (kindOf(val) !== "object") {
    return false;
  }
  const prototype2 = getPrototypeOf(val);
  return (prototype2 === null || prototype2 === Object.prototype || Object.getPrototypeOf(prototype2) === null) && !(toStringTag in val) && !(iterator in val);
};
const isEmptyObject = (val) => {
  if (!isObject(val) || isBuffer(val)) {
    return false;
  }
  try {
    return Object.keys(val).length === 0 && Object.getPrototypeOf(val) === Object.prototype;
  } catch (e) {
    return false;
  }
};
const isDate = kindOfTest("Date");
const isFile = kindOfTest("File");
const isBlob = kindOfTest("Blob");
const isFileList = kindOfTest("FileList");
const isStream = (val) => isObject(val) && isFunction(val.pipe);
const isFormData = (thing) => {
  let kind;
  return thing && (typeof FormData === "function" && thing instanceof FormData || isFunction(thing.append) && ((kind = kindOf(thing)) === "formdata" || // detect form-data instance
  kind === "object" && isFunction(thing.toString) && thing.toString() === "[object FormData]"));
};
const isURLSearchParams = kindOfTest("URLSearchParams");
const [isReadableStream, isRequest, isResponse, isHeaders] = ["ReadableStream", "Request", "Response", "Headers"].map(kindOfTest);
const trim = (str) => str.trim ? str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function forEach(obj, fn, { allOwnKeys = false } = {}) {
  if (obj === null || typeof obj === "undefined") {
    return;
  }
  let i;
  let l;
  if (typeof obj !== "object") {
    obj = [obj];
  }
  if (isArray(obj)) {
    for (i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    if (isBuffer(obj)) {
      return;
    }
    const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
    const len = keys.length;
    let key;
    for (i = 0; i < len; i++) {
      key = keys[i];
      fn.call(null, obj[key], key, obj);
    }
  }
}
function findKey(obj, key) {
  if (isBuffer(obj)) {
    return null;
  }
  key = key.toLowerCase();
  const keys = Object.keys(obj);
  let i = keys.length;
  let _key;
  while (i-- > 0) {
    _key = keys[i];
    if (key === _key.toLowerCase()) {
      return _key;
    }
  }
  return null;
}
const _global = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  return typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : global;
})();
const isContextDefined = (context) => !isUndefined(context) && context !== _global;
function merge() {
  const { caseless } = isContextDefined(this) && this || {};
  const result = {};
  const assignValue = (val, key) => {
    const targetKey = caseless && findKey(result, key) || key;
    if (isPlainObject(result[targetKey]) && isPlainObject(val)) {
      result[targetKey] = merge(result[targetKey], val);
    } else if (isPlainObject(val)) {
      result[targetKey] = merge({}, val);
    } else if (isArray(val)) {
      result[targetKey] = val.slice();
    } else {
      result[targetKey] = val;
    }
  };
  for (let i = 0, l = arguments.length; i < l; i++) {
    arguments[i] && forEach(arguments[i], assignValue);
  }
  return result;
}
const extend = (a, b, thisArg, { allOwnKeys } = {}) => {
  forEach(b, (val, key) => {
    if (thisArg && isFunction(val)) {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  }, { allOwnKeys });
  return a;
};
const stripBOM = (content) => {
  if (content.charCodeAt(0) === 65279) {
    content = content.slice(1);
  }
  return content;
};
const inherits = (constructor, superConstructor, props, descriptors2) => {
  constructor.prototype = Object.create(superConstructor.prototype, descriptors2);
  constructor.prototype.constructor = constructor;
  Object.defineProperty(constructor, "super", {
    value: superConstructor.prototype
  });
  props && Object.assign(constructor.prototype, props);
};
const toFlatObject = (sourceObj, destObj, filter2, propFilter) => {
  let props;
  let i;
  let prop;
  const merged = {};
  destObj = destObj || {};
  if (sourceObj == null) return destObj;
  do {
    props = Object.getOwnPropertyNames(sourceObj);
    i = props.length;
    while (i-- > 0) {
      prop = props[i];
      if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
        destObj[prop] = sourceObj[prop];
        merged[prop] = true;
      }
    }
    sourceObj = filter2 !== false && getPrototypeOf(sourceObj);
  } while (sourceObj && (!filter2 || filter2(sourceObj, destObj)) && sourceObj !== Object.prototype);
  return destObj;
};
const endsWith = (str, searchString, position) => {
  str = String(str);
  if (position === void 0 || position > str.length) {
    position = str.length;
  }
  position -= searchString.length;
  const lastIndex = str.indexOf(searchString, position);
  return lastIndex !== -1 && lastIndex === position;
};
const toArray = (thing) => {
  if (!thing) return null;
  if (isArray(thing)) return thing;
  let i = thing.length;
  if (!isNumber(i)) return null;
  const arr = new Array(i);
  while (i-- > 0) {
    arr[i] = thing[i];
  }
  return arr;
};
const isTypedArray = /* @__PURE__ */ ((TypedArray) => {
  return (thing) => {
    return TypedArray && thing instanceof TypedArray;
  };
})(typeof Uint8Array !== "undefined" && getPrototypeOf(Uint8Array));
const forEachEntry = (obj, fn) => {
  const generator = obj && obj[iterator];
  const _iterator = generator.call(obj);
  let result;
  while ((result = _iterator.next()) && !result.done) {
    const pair = result.value;
    fn.call(obj, pair[0], pair[1]);
  }
};
const matchAll = (regExp, str) => {
  let matches;
  const arr = [];
  while ((matches = regExp.exec(str)) !== null) {
    arr.push(matches);
  }
  return arr;
};
const isHTMLForm = kindOfTest("HTMLFormElement");
const toCamelCase = (str) => {
  return str.toLowerCase().replace(
    /[-_\s]([a-z\d])(\w*)/g,
    function replacer(m, p1, p2) {
      return p1.toUpperCase() + p2;
    }
  );
};
const hasOwnProperty = (({ hasOwnProperty: hasOwnProperty2 }) => (obj, prop) => hasOwnProperty2.call(obj, prop))(Object.prototype);
const isRegExp = kindOfTest("RegExp");
const reduceDescriptors = (obj, reducer) => {
  const descriptors2 = Object.getOwnPropertyDescriptors(obj);
  const reducedDescriptors = {};
  forEach(descriptors2, (descriptor, name) => {
    let ret;
    if ((ret = reducer(descriptor, name, obj)) !== false) {
      reducedDescriptors[name] = ret || descriptor;
    }
  });
  Object.defineProperties(obj, reducedDescriptors);
};
const freezeMethods = (obj) => {
  reduceDescriptors(obj, (descriptor, name) => {
    if (isFunction(obj) && ["arguments", "caller", "callee"].indexOf(name) !== -1) {
      return false;
    }
    const value = obj[name];
    if (!isFunction(value)) return;
    descriptor.enumerable = false;
    if ("writable" in descriptor) {
      descriptor.writable = false;
      return;
    }
    if (!descriptor.set) {
      descriptor.set = () => {
        throw Error("Can not rewrite read-only method '" + name + "'");
      };
    }
  });
};
const toObjectSet = (arrayOrString, delimiter) => {
  const obj = {};
  const define = (arr) => {
    arr.forEach((value) => {
      obj[value] = true;
    });
  };
  isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));
  return obj;
};
const noop = () => {
};
const toFiniteNumber = (value, defaultValue) => {
  return value != null && Number.isFinite(value = +value) ? value : defaultValue;
};
function isSpecCompliantForm(thing) {
  return !!(thing && isFunction(thing.append) && thing[toStringTag] === "FormData" && thing[iterator]);
}
const toJSONObject = (obj) => {
  const stack = new Array(10);
  const visit = (source, i) => {
    if (isObject(source)) {
      if (stack.indexOf(source) >= 0) {
        return;
      }
      if (isBuffer(source)) {
        return source;
      }
      if (!("toJSON" in source)) {
        stack[i] = source;
        const target = isArray(source) ? [] : {};
        forEach(source, (value, key) => {
          const reducedValue = visit(value, i + 1);
          !isUndefined(reducedValue) && (target[key] = reducedValue);
        });
        stack[i] = void 0;
        return target;
      }
    }
    return source;
  };
  return visit(obj, 0);
};
const isAsyncFn = kindOfTest("AsyncFunction");
const isThenable = (thing) => thing && (isObject(thing) || isFunction(thing)) && isFunction(thing.then) && isFunction(thing.catch);
const _setImmediate = ((setImmediateSupported, postMessageSupported) => {
  if (setImmediateSupported) {
    return setImmediate;
  }
  return postMessageSupported ? ((token, callbacks) => {
    _global.addEventListener("message", ({ source, data }) => {
      if (source === _global && data === token) {
        callbacks.length && callbacks.shift()();
      }
    }, false);
    return (cb) => {
      callbacks.push(cb);
      _global.postMessage(token, "*");
    };
  })(`axios@${Math.random()}`, []) : (cb) => setTimeout(cb);
})(
  typeof setImmediate === "function",
  isFunction(_global.postMessage)
);
const asap = typeof queueMicrotask !== "undefined" ? queueMicrotask.bind(_global) : typeof process !== "undefined" && process.nextTick || _setImmediate;
const isIterable = (thing) => thing != null && isFunction(thing[iterator]);
const utils$1 = {
  isArray,
  isArrayBuffer,
  isBuffer,
  isFormData,
  isArrayBufferView,
  isString,
  isNumber,
  isBoolean,
  isObject,
  isPlainObject,
  isEmptyObject,
  isReadableStream,
  isRequest,
  isResponse,
  isHeaders,
  isUndefined,
  isDate,
  isFile,
  isBlob,
  isRegExp,
  isFunction,
  isStream,
  isURLSearchParams,
  isTypedArray,
  isFileList,
  forEach,
  merge,
  extend,
  trim,
  stripBOM,
  inherits,
  toFlatObject,
  kindOf,
  kindOfTest,
  endsWith,
  toArray,
  forEachEntry,
  matchAll,
  isHTMLForm,
  hasOwnProperty,
  hasOwnProp: hasOwnProperty,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors,
  freezeMethods,
  toObjectSet,
  toCamelCase,
  noop,
  toFiniteNumber,
  findKey,
  global: _global,
  isContextDefined,
  isSpecCompliantForm,
  toJSONObject,
  isAsyncFn,
  isThenable,
  setImmediate: _setImmediate,
  asap,
  isIterable
};
function AxiosError$1(message, code, config, request2, response) {
  Error.call(this);
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor);
  } else {
    this.stack = new Error().stack;
  }
  this.message = message;
  this.name = "AxiosError";
  code && (this.code = code);
  config && (this.config = config);
  request2 && (this.request = request2);
  if (response) {
    this.response = response;
    this.status = response.status ? response.status : null;
  }
}
utils$1.inherits(AxiosError$1, Error, {
  toJSON: function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: utils$1.toJSONObject(this.config),
      code: this.code,
      status: this.status
    };
  }
});
const prototype$1 = AxiosError$1.prototype;
const descriptors = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL"
  // eslint-disable-next-line func-names
].forEach((code) => {
  descriptors[code] = { value: code };
});
Object.defineProperties(AxiosError$1, descriptors);
Object.defineProperty(prototype$1, "isAxiosError", { value: true });
AxiosError$1.from = (error, code, config, request2, response, customProps) => {
  const axiosError = Object.create(prototype$1);
  utils$1.toFlatObject(error, axiosError, function filter2(obj) {
    return obj !== Error.prototype;
  }, (prop) => {
    return prop !== "isAxiosError";
  });
  AxiosError$1.call(axiosError, error.message, code, config, request2, response);
  axiosError.cause = error;
  axiosError.name = error.name;
  customProps && Object.assign(axiosError, customProps);
  return axiosError;
};
const httpAdapter = null;
function isVisitable(thing) {
  return utils$1.isPlainObject(thing) || utils$1.isArray(thing);
}
function removeBrackets(key) {
  return utils$1.endsWith(key, "[]") ? key.slice(0, -2) : key;
}
function renderKey(path, key, dots) {
  if (!path) return key;
  return path.concat(key).map(function each(token, i) {
    token = removeBrackets(token);
    return !dots && i ? "[" + token + "]" : token;
  }).join(dots ? "." : "");
}
function isFlatArray(arr) {
  return utils$1.isArray(arr) && !arr.some(isVisitable);
}
const predicates = utils$1.toFlatObject(utils$1, {}, null, function filter(prop) {
  return /^is[A-Z]/.test(prop);
});
function toFormData$1(obj, formData, options) {
  if (!utils$1.isObject(obj)) {
    throw new TypeError("target must be an object");
  }
  formData = formData || new FormData();
  options = utils$1.toFlatObject(options, {
    metaTokens: true,
    dots: false,
    indexes: false
  }, false, function defined(option, source) {
    return !utils$1.isUndefined(source[option]);
  });
  const metaTokens = options.metaTokens;
  const visitor = options.visitor || defaultVisitor;
  const dots = options.dots;
  const indexes = options.indexes;
  const _Blob = options.Blob || typeof Blob !== "undefined" && Blob;
  const useBlob = _Blob && utils$1.isSpecCompliantForm(formData);
  if (!utils$1.isFunction(visitor)) {
    throw new TypeError("visitor must be a function");
  }
  function convertValue(value) {
    if (value === null) return "";
    if (utils$1.isDate(value)) {
      return value.toISOString();
    }
    if (utils$1.isBoolean(value)) {
      return value.toString();
    }
    if (!useBlob && utils$1.isBlob(value)) {
      throw new AxiosError$1("Blob is not supported. Use a Buffer instead.");
    }
    if (utils$1.isArrayBuffer(value) || utils$1.isTypedArray(value)) {
      return useBlob && typeof Blob === "function" ? new Blob([value]) : Buffer.from(value);
    }
    return value;
  }
  function defaultVisitor(value, key, path) {
    let arr = value;
    if (value && !path && typeof value === "object") {
      if (utils$1.endsWith(key, "{}")) {
        key = metaTokens ? key : key.slice(0, -2);
        value = JSON.stringify(value);
      } else if (utils$1.isArray(value) && isFlatArray(value) || (utils$1.isFileList(value) || utils$1.endsWith(key, "[]")) && (arr = utils$1.toArray(value))) {
        key = removeBrackets(key);
        arr.forEach(function each(el, index) {
          !(utils$1.isUndefined(el) || el === null) && formData.append(
            // eslint-disable-next-line no-nested-ternary
            indexes === true ? renderKey([key], index, dots) : indexes === null ? key : key + "[]",
            convertValue(el)
          );
        });
        return false;
      }
    }
    if (isVisitable(value)) {
      return true;
    }
    formData.append(renderKey(path, key, dots), convertValue(value));
    return false;
  }
  const stack = [];
  const exposedHelpers = Object.assign(predicates, {
    defaultVisitor,
    convertValue,
    isVisitable
  });
  function build(value, path) {
    if (utils$1.isUndefined(value)) return;
    if (stack.indexOf(value) !== -1) {
      throw Error("Circular reference detected in " + path.join("."));
    }
    stack.push(value);
    utils$1.forEach(value, function each(el, key) {
      const result = !(utils$1.isUndefined(el) || el === null) && visitor.call(
        formData,
        el,
        utils$1.isString(key) ? key.trim() : key,
        path,
        exposedHelpers
      );
      if (result === true) {
        build(el, path ? path.concat(key) : [key]);
      }
    });
    stack.pop();
  }
  if (!utils$1.isObject(obj)) {
    throw new TypeError("data must be an object");
  }
  build(obj);
  return formData;
}
function encode$1(str) {
  const charMap = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(str).replace(/[!'()~]|%20|%00/g, function replacer(match) {
    return charMap[match];
  });
}
function AxiosURLSearchParams(params, options) {
  this._pairs = [];
  params && toFormData$1(params, this, options);
}
const prototype = AxiosURLSearchParams.prototype;
prototype.append = function append(name, value) {
  this._pairs.push([name, value]);
};
prototype.toString = function toString2(encoder) {
  const _encode = encoder ? function(value) {
    return encoder.call(this, value, encode$1);
  } : encode$1;
  return this._pairs.map(function each(pair) {
    return _encode(pair[0]) + "=" + _encode(pair[1]);
  }, "").join("&");
};
function encode(val) {
  return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function buildURL(url, params, options) {
  if (!params) {
    return url;
  }
  const _encode = options && options.encode || encode;
  if (utils$1.isFunction(options)) {
    options = {
      serialize: options
    };
  }
  const serializeFn = options && options.serialize;
  let serializedParams;
  if (serializeFn) {
    serializedParams = serializeFn(params, options);
  } else {
    serializedParams = utils$1.isURLSearchParams(params) ? params.toString() : new AxiosURLSearchParams(params, options).toString(_encode);
  }
  if (serializedParams) {
    const hashmarkIndex = url.indexOf("#");
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }
    url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
  }
  return url;
}
class InterceptorManager {
  constructor() {
    this.handlers = [];
  }
  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(fulfilled, rejected, options) {
    this.handlers.push({
      fulfilled,
      rejected,
      synchronous: options ? options.synchronous : false,
      runWhen: options ? options.runWhen : null
    });
    return this.handlers.length - 1;
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
   */
  eject(id) {
    if (this.handlers[id]) {
      this.handlers[id] = null;
    }
  }
  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    if (this.handlers) {
      this.handlers = [];
    }
  }
  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(fn) {
    utils$1.forEach(this.handlers, function forEachHandler(h2) {
      if (h2 !== null) {
        fn(h2);
      }
    });
  }
}
const transitionalDefaults = {
  silentJSONParsing: true,
  forcedJSONParsing: true,
  clarifyTimeoutError: false
};
const URLSearchParams$1 = typeof URLSearchParams !== "undefined" ? URLSearchParams : AxiosURLSearchParams;
const FormData$1 = typeof FormData !== "undefined" ? FormData : null;
const Blob$1 = typeof Blob !== "undefined" ? Blob : null;
const platform$1 = {
  isBrowser: true,
  classes: {
    URLSearchParams: URLSearchParams$1,
    FormData: FormData$1,
    Blob: Blob$1
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
};
const hasBrowserEnv = typeof window !== "undefined" && typeof document !== "undefined";
const _navigator = typeof navigator === "object" && navigator || void 0;
const hasStandardBrowserEnv = hasBrowserEnv && (!_navigator || ["ReactNative", "NativeScript", "NS"].indexOf(_navigator.product) < 0);
const hasStandardBrowserWebWorkerEnv = (() => {
  return typeof WorkerGlobalScope !== "undefined" && // eslint-disable-next-line no-undef
  self instanceof WorkerGlobalScope && typeof self.importScripts === "function";
})();
const origin = hasBrowserEnv && window.location.href || "http://localhost";
const utils = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv,
  hasStandardBrowserEnv,
  hasStandardBrowserWebWorkerEnv,
  navigator: _navigator,
  origin
}, Symbol.toStringTag, { value: "Module" }));
const platform = {
  ...utils,
  ...platform$1
};
function toURLEncodedForm(data, options) {
  return toFormData$1(data, new platform.classes.URLSearchParams(), {
    visitor: function(value, key, path, helpers) {
      if (platform.isNode && utils$1.isBuffer(value)) {
        this.append(key, value.toString("base64"));
        return false;
      }
      return helpers.defaultVisitor.apply(this, arguments);
    },
    ...options
  });
}
function parsePropPath(name) {
  return utils$1.matchAll(/\w+|\[(\w*)]/g, name).map((match) => {
    return match[0] === "[]" ? "" : match[1] || match[0];
  });
}
function arrayToObject(arr) {
  const obj = {};
  const keys = Object.keys(arr);
  let i;
  const len = keys.length;
  let key;
  for (i = 0; i < len; i++) {
    key = keys[i];
    obj[key] = arr[key];
  }
  return obj;
}
function formDataToJSON(formData) {
  function buildPath(path, value, target, index) {
    let name = path[index++];
    if (name === "__proto__") return true;
    const isNumericKey = Number.isFinite(+name);
    const isLast = index >= path.length;
    name = !name && utils$1.isArray(target) ? target.length : name;
    if (isLast) {
      if (utils$1.hasOwnProp(target, name)) {
        target[name] = [target[name], value];
      } else {
        target[name] = value;
      }
      return !isNumericKey;
    }
    if (!target[name] || !utils$1.isObject(target[name])) {
      target[name] = [];
    }
    const result = buildPath(path, value, target[name], index);
    if (result && utils$1.isArray(target[name])) {
      target[name] = arrayToObject(target[name]);
    }
    return !isNumericKey;
  }
  if (utils$1.isFormData(formData) && utils$1.isFunction(formData.entries)) {
    const obj = {};
    utils$1.forEachEntry(formData, (name, value) => {
      buildPath(parsePropPath(name), value, obj, 0);
    });
    return obj;
  }
  return null;
}
function stringifySafely(rawValue, parser, encoder) {
  if (utils$1.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils$1.trim(rawValue);
    } catch (e) {
      if (e.name !== "SyntaxError") {
        throw e;
      }
    }
  }
  return (encoder || JSON.stringify)(rawValue);
}
const defaults = {
  transitional: transitionalDefaults,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [function transformRequest(data, headers) {
    const contentType = headers.getContentType() || "";
    const hasJSONContentType = contentType.indexOf("application/json") > -1;
    const isObjectPayload = utils$1.isObject(data);
    if (isObjectPayload && utils$1.isHTMLForm(data)) {
      data = new FormData(data);
    }
    const isFormData2 = utils$1.isFormData(data);
    if (isFormData2) {
      return hasJSONContentType ? JSON.stringify(formDataToJSON(data)) : data;
    }
    if (utils$1.isArrayBuffer(data) || utils$1.isBuffer(data) || utils$1.isStream(data) || utils$1.isFile(data) || utils$1.isBlob(data) || utils$1.isReadableStream(data)) {
      return data;
    }
    if (utils$1.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils$1.isURLSearchParams(data)) {
      headers.setContentType("application/x-www-form-urlencoded;charset=utf-8", false);
      return data.toString();
    }
    let isFileList2;
    if (isObjectPayload) {
      if (contentType.indexOf("application/x-www-form-urlencoded") > -1) {
        return toURLEncodedForm(data, this.formSerializer).toString();
      }
      if ((isFileList2 = utils$1.isFileList(data)) || contentType.indexOf("multipart/form-data") > -1) {
        const _FormData = this.env && this.env.FormData;
        return toFormData$1(
          isFileList2 ? { "files[]": data } : data,
          _FormData && new _FormData(),
          this.formSerializer
        );
      }
    }
    if (isObjectPayload || hasJSONContentType) {
      headers.setContentType("application/json", false);
      return stringifySafely(data);
    }
    return data;
  }],
  transformResponse: [function transformResponse(data) {
    const transitional2 = this.transitional || defaults.transitional;
    const forcedJSONParsing = transitional2 && transitional2.forcedJSONParsing;
    const JSONRequested = this.responseType === "json";
    if (utils$1.isResponse(data) || utils$1.isReadableStream(data)) {
      return data;
    }
    if (data && utils$1.isString(data) && (forcedJSONParsing && !this.responseType || JSONRequested)) {
      const silentJSONParsing = transitional2 && transitional2.silentJSONParsing;
      const strictJSONParsing = !silentJSONParsing && JSONRequested;
      try {
        return JSON.parse(data);
      } catch (e) {
        if (strictJSONParsing) {
          if (e.name === "SyntaxError") {
            throw AxiosError$1.from(e, AxiosError$1.ERR_BAD_RESPONSE, this, null, this.response);
          }
          throw e;
        }
      }
    }
    return data;
  }],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: platform.classes.FormData,
    Blob: platform.classes.Blob
  },
  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },
  headers: {
    common: {
      "Accept": "application/json, text/plain, */*",
      "Content-Type": void 0
    }
  }
};
utils$1.forEach(["delete", "get", "head", "post", "put", "patch"], (method) => {
  defaults.headers[method] = {};
});
const ignoreDuplicateOf = utils$1.toObjectSet([
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
]);
const parseHeaders = (rawHeaders) => {
  const parsed = {};
  let key;
  let val;
  let i;
  rawHeaders && rawHeaders.split("\n").forEach(function parser(line) {
    i = line.indexOf(":");
    key = line.substring(0, i).trim().toLowerCase();
    val = line.substring(i + 1).trim();
    if (!key || parsed[key] && ignoreDuplicateOf[key]) {
      return;
    }
    if (key === "set-cookie") {
      if (parsed[key]) {
        parsed[key].push(val);
      } else {
        parsed[key] = [val];
      }
    } else {
      parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
    }
  });
  return parsed;
};
const $internals = Symbol("internals");
function normalizeHeader(header) {
  return header && String(header).trim().toLowerCase();
}
function normalizeValue(value) {
  if (value === false || value == null) {
    return value;
  }
  return utils$1.isArray(value) ? value.map(normalizeValue) : String(value);
}
function parseTokens(str) {
  const tokens = /* @__PURE__ */ Object.create(null);
  const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let match;
  while (match = tokensRE.exec(str)) {
    tokens[match[1]] = match[2];
  }
  return tokens;
}
const isValidHeaderName = (str) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());
function matchHeaderValue(context, value, header, filter2, isHeaderNameFilter) {
  if (utils$1.isFunction(filter2)) {
    return filter2.call(this, value, header);
  }
  if (isHeaderNameFilter) {
    value = header;
  }
  if (!utils$1.isString(value)) return;
  if (utils$1.isString(filter2)) {
    return value.indexOf(filter2) !== -1;
  }
  if (utils$1.isRegExp(filter2)) {
    return filter2.test(value);
  }
}
function formatHeader(header) {
  return header.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (w, char, str) => {
    return char.toUpperCase() + str;
  });
}
function buildAccessors(obj, header) {
  const accessorName = utils$1.toCamelCase(" " + header);
  ["get", "set", "has"].forEach((methodName) => {
    Object.defineProperty(obj, methodName + accessorName, {
      value: function(arg1, arg2, arg3) {
        return this[methodName].call(this, header, arg1, arg2, arg3);
      },
      configurable: true
    });
  });
}
let AxiosHeaders$1 = class AxiosHeaders {
  constructor(headers) {
    headers && this.set(headers);
  }
  set(header, valueOrRewrite, rewrite) {
    const self2 = this;
    function setHeader(_value, _header, _rewrite) {
      const lHeader = normalizeHeader(_header);
      if (!lHeader) {
        throw new Error("header name must be a non-empty string");
      }
      const key = utils$1.findKey(self2, lHeader);
      if (!key || self2[key] === void 0 || _rewrite === true || _rewrite === void 0 && self2[key] !== false) {
        self2[key || _header] = normalizeValue(_value);
      }
    }
    const setHeaders = (headers, _rewrite) => utils$1.forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite));
    if (utils$1.isPlainObject(header) || header instanceof this.constructor) {
      setHeaders(header, valueOrRewrite);
    } else if (utils$1.isString(header) && (header = header.trim()) && !isValidHeaderName(header)) {
      setHeaders(parseHeaders(header), valueOrRewrite);
    } else if (utils$1.isObject(header) && utils$1.isIterable(header)) {
      let obj = {}, dest, key;
      for (const entry of header) {
        if (!utils$1.isArray(entry)) {
          throw TypeError("Object iterator must return a key-value pair");
        }
        obj[key = entry[0]] = (dest = obj[key]) ? utils$1.isArray(dest) ? [...dest, entry[1]] : [dest, entry[1]] : entry[1];
      }
      setHeaders(obj, valueOrRewrite);
    } else {
      header != null && setHeader(valueOrRewrite, header, rewrite);
    }
    return this;
  }
  get(header, parser) {
    header = normalizeHeader(header);
    if (header) {
      const key = utils$1.findKey(this, header);
      if (key) {
        const value = this[key];
        if (!parser) {
          return value;
        }
        if (parser === true) {
          return parseTokens(value);
        }
        if (utils$1.isFunction(parser)) {
          return parser.call(this, value, key);
        }
        if (utils$1.isRegExp(parser)) {
          return parser.exec(value);
        }
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(header, matcher) {
    header = normalizeHeader(header);
    if (header) {
      const key = utils$1.findKey(this, header);
      return !!(key && this[key] !== void 0 && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
    }
    return false;
  }
  delete(header, matcher) {
    const self2 = this;
    let deleted = false;
    function deleteHeader(_header) {
      _header = normalizeHeader(_header);
      if (_header) {
        const key = utils$1.findKey(self2, _header);
        if (key && (!matcher || matchHeaderValue(self2, self2[key], key, matcher))) {
          delete self2[key];
          deleted = true;
        }
      }
    }
    if (utils$1.isArray(header)) {
      header.forEach(deleteHeader);
    } else {
      deleteHeader(header);
    }
    return deleted;
  }
  clear(matcher) {
    const keys = Object.keys(this);
    let i = keys.length;
    let deleted = false;
    while (i--) {
      const key = keys[i];
      if (!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
        delete this[key];
        deleted = true;
      }
    }
    return deleted;
  }
  normalize(format) {
    const self2 = this;
    const headers = {};
    utils$1.forEach(this, (value, header) => {
      const key = utils$1.findKey(headers, header);
      if (key) {
        self2[key] = normalizeValue(value);
        delete self2[header];
        return;
      }
      const normalized = format ? formatHeader(header) : String(header).trim();
      if (normalized !== header) {
        delete self2[header];
      }
      self2[normalized] = normalizeValue(value);
      headers[normalized] = true;
    });
    return this;
  }
  concat(...targets) {
    return this.constructor.concat(this, ...targets);
  }
  toJSON(asStrings) {
    const obj = /* @__PURE__ */ Object.create(null);
    utils$1.forEach(this, (value, header) => {
      value != null && value !== false && (obj[header] = asStrings && utils$1.isArray(value) ? value.join(", ") : value);
    });
    return obj;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([header, value]) => header + ": " + value).join("\n");
  }
  getSetCookie() {
    return this.get("set-cookie") || [];
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(thing) {
    return thing instanceof this ? thing : new this(thing);
  }
  static concat(first, ...targets) {
    const computed2 = new this(first);
    targets.forEach((target) => computed2.set(target));
    return computed2;
  }
  static accessor(header) {
    const internals = this[$internals] = this[$internals] = {
      accessors: {}
    };
    const accessors = internals.accessors;
    const prototype2 = this.prototype;
    function defineAccessor(_header) {
      const lHeader = normalizeHeader(_header);
      if (!accessors[lHeader]) {
        buildAccessors(prototype2, _header);
        accessors[lHeader] = true;
      }
    }
    utils$1.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);
    return this;
  }
};
AxiosHeaders$1.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
utils$1.reduceDescriptors(AxiosHeaders$1.prototype, ({ value }, key) => {
  let mapped = key[0].toUpperCase() + key.slice(1);
  return {
    get: () => value,
    set(headerValue) {
      this[mapped] = headerValue;
    }
  };
});
utils$1.freezeMethods(AxiosHeaders$1);
function transformData(fns, response) {
  const config = this || defaults;
  const context = response || config;
  const headers = AxiosHeaders$1.from(context.headers);
  let data = context.data;
  utils$1.forEach(fns, function transform(fn) {
    data = fn.call(config, data, headers.normalize(), response ? response.status : void 0);
  });
  headers.normalize();
  return data;
}
function isCancel$1(value) {
  return !!(value && value.__CANCEL__);
}
function CanceledError$1(message, config, request2) {
  AxiosError$1.call(this, message == null ? "canceled" : message, AxiosError$1.ERR_CANCELED, config, request2);
  this.name = "CanceledError";
}
utils$1.inherits(CanceledError$1, AxiosError$1, {
  __CANCEL__: true
});
function settle(resolve, reject, response) {
  const validateStatus2 = response.config.validateStatus;
  if (!response.status || !validateStatus2 || validateStatus2(response.status)) {
    resolve(response);
  } else {
    reject(new AxiosError$1(
      "Request failed with status code " + response.status,
      [AxiosError$1.ERR_BAD_REQUEST, AxiosError$1.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
      response.config,
      response.request,
      response
    ));
  }
}
function parseProtocol(url) {
  const match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
  return match && match[1] || "";
}
function speedometer(samplesCount, min) {
  samplesCount = samplesCount || 10;
  const bytes = new Array(samplesCount);
  const timestamps = new Array(samplesCount);
  let head = 0;
  let tail = 0;
  let firstSampleTS;
  min = min !== void 0 ? min : 1e3;
  return function push(chunkLength) {
    const now = Date.now();
    const startedAt = timestamps[tail];
    if (!firstSampleTS) {
      firstSampleTS = now;
    }
    bytes[head] = chunkLength;
    timestamps[head] = now;
    let i = tail;
    let bytesCount = 0;
    while (i !== head) {
      bytesCount += bytes[i++];
      i = i % samplesCount;
    }
    head = (head + 1) % samplesCount;
    if (head === tail) {
      tail = (tail + 1) % samplesCount;
    }
    if (now - firstSampleTS < min) {
      return;
    }
    const passed = startedAt && now - startedAt;
    return passed ? Math.round(bytesCount * 1e3 / passed) : void 0;
  };
}
function throttle(fn, freq) {
  let timestamp = 0;
  let threshold = 1e3 / freq;
  let lastArgs;
  let timer;
  const invoke = (args, now = Date.now()) => {
    timestamp = now;
    lastArgs = null;
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    fn(...args);
  };
  const throttled = (...args) => {
    const now = Date.now();
    const passed = now - timestamp;
    if (passed >= threshold) {
      invoke(args, now);
    } else {
      lastArgs = args;
      if (!timer) {
        timer = setTimeout(() => {
          timer = null;
          invoke(lastArgs);
        }, threshold - passed);
      }
    }
  };
  const flush = () => lastArgs && invoke(lastArgs);
  return [throttled, flush];
}
const progressEventReducer = (listener, isDownloadStream, freq = 3) => {
  let bytesNotified = 0;
  const _speedometer = speedometer(50, 250);
  return throttle((e) => {
    const loaded = e.loaded;
    const total = e.lengthComputable ? e.total : void 0;
    const progressBytes = loaded - bytesNotified;
    const rate = _speedometer(progressBytes);
    const inRange = loaded <= total;
    bytesNotified = loaded;
    const data = {
      loaded,
      total,
      progress: total ? loaded / total : void 0,
      bytes: progressBytes,
      rate: rate ? rate : void 0,
      estimated: rate && total && inRange ? (total - loaded) / rate : void 0,
      event: e,
      lengthComputable: total != null,
      [isDownloadStream ? "download" : "upload"]: true
    };
    listener(data);
  }, freq);
};
const progressEventDecorator = (total, throttled) => {
  const lengthComputable = total != null;
  return [(loaded) => throttled[0]({
    lengthComputable,
    total,
    loaded
  }), throttled[1]];
};
const asyncDecorator = (fn) => (...args) => utils$1.asap(() => fn(...args));
const isURLSameOrigin = platform.hasStandardBrowserEnv ? /* @__PURE__ */ ((origin2, isMSIE) => (url) => {
  url = new URL(url, platform.origin);
  return origin2.protocol === url.protocol && origin2.host === url.host && (isMSIE || origin2.port === url.port);
})(
  new URL(platform.origin),
  platform.navigator && /(msie|trident)/i.test(platform.navigator.userAgent)
) : () => true;
const cookies = platform.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(name, value, expires, path, domain, secure) {
      const cookie = [name + "=" + encodeURIComponent(value)];
      utils$1.isNumber(expires) && cookie.push("expires=" + new Date(expires).toGMTString());
      utils$1.isString(path) && cookie.push("path=" + path);
      utils$1.isString(domain) && cookie.push("domain=" + domain);
      secure === true && cookie.push("secure");
      document.cookie = cookie.join("; ");
    },
    read(name) {
      const match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
      return match ? decodeURIComponent(match[3]) : null;
    },
    remove(name) {
      this.write(name, "", Date.now() - 864e5);
    }
  }
) : (
  // Non-standard browser env (web workers, react-native) lack needed support.
  {
    write() {
    },
    read() {
      return null;
    },
    remove() {
    }
  }
);
function isAbsoluteURL(url) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
}
function combineURLs(baseURL, relativeURL) {
  return relativeURL ? baseURL.replace(/\/?\/$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
}
function buildFullPath(baseURL, requestedURL, allowAbsoluteUrls) {
  let isRelativeUrl = !isAbsoluteURL(requestedURL);
  if (baseURL && (isRelativeUrl || allowAbsoluteUrls == false)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
}
const headersToObject = (thing) => thing instanceof AxiosHeaders$1 ? { ...thing } : thing;
function mergeConfig$1(config1, config2) {
  config2 = config2 || {};
  const config = {};
  function getMergedValue(target, source, prop, caseless) {
    if (utils$1.isPlainObject(target) && utils$1.isPlainObject(source)) {
      return utils$1.merge.call({ caseless }, target, source);
    } else if (utils$1.isPlainObject(source)) {
      return utils$1.merge({}, source);
    } else if (utils$1.isArray(source)) {
      return source.slice();
    }
    return source;
  }
  function mergeDeepProperties(a, b, prop, caseless) {
    if (!utils$1.isUndefined(b)) {
      return getMergedValue(a, b, prop, caseless);
    } else if (!utils$1.isUndefined(a)) {
      return getMergedValue(void 0, a, prop, caseless);
    }
  }
  function valueFromConfig2(a, b) {
    if (!utils$1.isUndefined(b)) {
      return getMergedValue(void 0, b);
    }
  }
  function defaultToConfig2(a, b) {
    if (!utils$1.isUndefined(b)) {
      return getMergedValue(void 0, b);
    } else if (!utils$1.isUndefined(a)) {
      return getMergedValue(void 0, a);
    }
  }
  function mergeDirectKeys(a, b, prop) {
    if (prop in config2) {
      return getMergedValue(a, b);
    } else if (prop in config1) {
      return getMergedValue(void 0, a);
    }
  }
  const mergeMap = {
    url: valueFromConfig2,
    method: valueFromConfig2,
    data: valueFromConfig2,
    baseURL: defaultToConfig2,
    transformRequest: defaultToConfig2,
    transformResponse: defaultToConfig2,
    paramsSerializer: defaultToConfig2,
    timeout: defaultToConfig2,
    timeoutMessage: defaultToConfig2,
    withCredentials: defaultToConfig2,
    withXSRFToken: defaultToConfig2,
    adapter: defaultToConfig2,
    responseType: defaultToConfig2,
    xsrfCookieName: defaultToConfig2,
    xsrfHeaderName: defaultToConfig2,
    onUploadProgress: defaultToConfig2,
    onDownloadProgress: defaultToConfig2,
    decompress: defaultToConfig2,
    maxContentLength: defaultToConfig2,
    maxBodyLength: defaultToConfig2,
    beforeRedirect: defaultToConfig2,
    transport: defaultToConfig2,
    httpAgent: defaultToConfig2,
    httpsAgent: defaultToConfig2,
    cancelToken: defaultToConfig2,
    socketPath: defaultToConfig2,
    responseEncoding: defaultToConfig2,
    validateStatus: mergeDirectKeys,
    headers: (a, b, prop) => mergeDeepProperties(headersToObject(a), headersToObject(b), prop, true)
  };
  utils$1.forEach(Object.keys({ ...config1, ...config2 }), function computeConfigValue(prop) {
    const merge2 = mergeMap[prop] || mergeDeepProperties;
    const configValue = merge2(config1[prop], config2[prop], prop);
    utils$1.isUndefined(configValue) && merge2 !== mergeDirectKeys || (config[prop] = configValue);
  });
  return config;
}
const resolveConfig = (config) => {
  const newConfig = mergeConfig$1({}, config);
  let { data, withXSRFToken, xsrfHeaderName, xsrfCookieName, headers, auth } = newConfig;
  newConfig.headers = headers = AxiosHeaders$1.from(headers);
  newConfig.url = buildURL(buildFullPath(newConfig.baseURL, newConfig.url, newConfig.allowAbsoluteUrls), config.params, config.paramsSerializer);
  if (auth) {
    headers.set(
      "Authorization",
      "Basic " + btoa((auth.username || "") + ":" + (auth.password ? unescape(encodeURIComponent(auth.password)) : ""))
    );
  }
  let contentType;
  if (utils$1.isFormData(data)) {
    if (platform.hasStandardBrowserEnv || platform.hasStandardBrowserWebWorkerEnv) {
      headers.setContentType(void 0);
    } else if ((contentType = headers.getContentType()) !== false) {
      const [type, ...tokens] = contentType ? contentType.split(";").map((token) => token.trim()).filter(Boolean) : [];
      headers.setContentType([type || "multipart/form-data", ...tokens].join("; "));
    }
  }
  if (platform.hasStandardBrowserEnv) {
    withXSRFToken && utils$1.isFunction(withXSRFToken) && (withXSRFToken = withXSRFToken(newConfig));
    if (withXSRFToken || withXSRFToken !== false && isURLSameOrigin(newConfig.url)) {
      const xsrfValue = xsrfHeaderName && xsrfCookieName && cookies.read(xsrfCookieName);
      if (xsrfValue) {
        headers.set(xsrfHeaderName, xsrfValue);
      }
    }
  }
  return newConfig;
};
const isXHRAdapterSupported = typeof XMLHttpRequest !== "undefined";
const xhrAdapter = isXHRAdapterSupported && function(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    const _config = resolveConfig(config);
    let requestData = _config.data;
    const requestHeaders = AxiosHeaders$1.from(_config.headers).normalize();
    let { responseType, onUploadProgress, onDownloadProgress } = _config;
    let onCanceled;
    let uploadThrottled, downloadThrottled;
    let flushUpload, flushDownload;
    function done() {
      flushUpload && flushUpload();
      flushDownload && flushDownload();
      _config.cancelToken && _config.cancelToken.unsubscribe(onCanceled);
      _config.signal && _config.signal.removeEventListener("abort", onCanceled);
    }
    let request2 = new XMLHttpRequest();
    request2.open(_config.method.toUpperCase(), _config.url, true);
    request2.timeout = _config.timeout;
    function onloadend() {
      if (!request2) {
        return;
      }
      const responseHeaders = AxiosHeaders$1.from(
        "getAllResponseHeaders" in request2 && request2.getAllResponseHeaders()
      );
      const responseData = !responseType || responseType === "text" || responseType === "json" ? request2.responseText : request2.response;
      const response = {
        data: responseData,
        status: request2.status,
        statusText: request2.statusText,
        headers: responseHeaders,
        config,
        request: request2
      };
      settle(function _resolve(value) {
        resolve(value);
        done();
      }, function _reject(err) {
        reject(err);
        done();
      }, response);
      request2 = null;
    }
    if ("onloadend" in request2) {
      request2.onloadend = onloadend;
    } else {
      request2.onreadystatechange = function handleLoad() {
        if (!request2 || request2.readyState !== 4) {
          return;
        }
        if (request2.status === 0 && !(request2.responseURL && request2.responseURL.indexOf("file:") === 0)) {
          return;
        }
        setTimeout(onloadend);
      };
    }
    request2.onabort = function handleAbort() {
      if (!request2) {
        return;
      }
      reject(new AxiosError$1("Request aborted", AxiosError$1.ECONNABORTED, config, request2));
      request2 = null;
    };
    request2.onerror = function handleError() {
      reject(new AxiosError$1("Network Error", AxiosError$1.ERR_NETWORK, config, request2));
      request2 = null;
    };
    request2.ontimeout = function handleTimeout() {
      let timeoutErrorMessage = _config.timeout ? "timeout of " + _config.timeout + "ms exceeded" : "timeout exceeded";
      const transitional2 = _config.transitional || transitionalDefaults;
      if (_config.timeoutErrorMessage) {
        timeoutErrorMessage = _config.timeoutErrorMessage;
      }
      reject(new AxiosError$1(
        timeoutErrorMessage,
        transitional2.clarifyTimeoutError ? AxiosError$1.ETIMEDOUT : AxiosError$1.ECONNABORTED,
        config,
        request2
      ));
      request2 = null;
    };
    requestData === void 0 && requestHeaders.setContentType(null);
    if ("setRequestHeader" in request2) {
      utils$1.forEach(requestHeaders.toJSON(), function setRequestHeader(val, key) {
        request2.setRequestHeader(key, val);
      });
    }
    if (!utils$1.isUndefined(_config.withCredentials)) {
      request2.withCredentials = !!_config.withCredentials;
    }
    if (responseType && responseType !== "json") {
      request2.responseType = _config.responseType;
    }
    if (onDownloadProgress) {
      [downloadThrottled, flushDownload] = progressEventReducer(onDownloadProgress, true);
      request2.addEventListener("progress", downloadThrottled);
    }
    if (onUploadProgress && request2.upload) {
      [uploadThrottled, flushUpload] = progressEventReducer(onUploadProgress);
      request2.upload.addEventListener("progress", uploadThrottled);
      request2.upload.addEventListener("loadend", flushUpload);
    }
    if (_config.cancelToken || _config.signal) {
      onCanceled = (cancel) => {
        if (!request2) {
          return;
        }
        reject(!cancel || cancel.type ? new CanceledError$1(null, config, request2) : cancel);
        request2.abort();
        request2 = null;
      };
      _config.cancelToken && _config.cancelToken.subscribe(onCanceled);
      if (_config.signal) {
        _config.signal.aborted ? onCanceled() : _config.signal.addEventListener("abort", onCanceled);
      }
    }
    const protocol = parseProtocol(_config.url);
    if (protocol && platform.protocols.indexOf(protocol) === -1) {
      reject(new AxiosError$1("Unsupported protocol " + protocol + ":", AxiosError$1.ERR_BAD_REQUEST, config));
      return;
    }
    request2.send(requestData || null);
  });
};
const composeSignals = (signals, timeout) => {
  const { length } = signals = signals ? signals.filter(Boolean) : [];
  if (timeout || length) {
    let controller = new AbortController();
    let aborted;
    const onabort = function(reason) {
      if (!aborted) {
        aborted = true;
        unsubscribe();
        const err = reason instanceof Error ? reason : this.reason;
        controller.abort(err instanceof AxiosError$1 ? err : new CanceledError$1(err instanceof Error ? err.message : err));
      }
    };
    let timer = timeout && setTimeout(() => {
      timer = null;
      onabort(new AxiosError$1(`timeout ${timeout} of ms exceeded`, AxiosError$1.ETIMEDOUT));
    }, timeout);
    const unsubscribe = () => {
      if (signals) {
        timer && clearTimeout(timer);
        timer = null;
        signals.forEach((signal2) => {
          signal2.unsubscribe ? signal2.unsubscribe(onabort) : signal2.removeEventListener("abort", onabort);
        });
        signals = null;
      }
    };
    signals.forEach((signal2) => signal2.addEventListener("abort", onabort));
    const { signal } = controller;
    signal.unsubscribe = () => utils$1.asap(unsubscribe);
    return signal;
  }
};
const streamChunk = function* (chunk, chunkSize) {
  let len = chunk.byteLength;
  if (len < chunkSize) {
    yield chunk;
    return;
  }
  let pos = 0;
  let end;
  while (pos < len) {
    end = pos + chunkSize;
    yield chunk.slice(pos, end);
    pos = end;
  }
};
const readBytes = async function* (iterable, chunkSize) {
  for await (const chunk of readStream(iterable)) {
    yield* streamChunk(chunk, chunkSize);
  }
};
const readStream = async function* (stream) {
  if (stream[Symbol.asyncIterator]) {
    yield* stream;
    return;
  }
  const reader = stream.getReader();
  try {
    for (; ; ) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      yield value;
    }
  } finally {
    await reader.cancel();
  }
};
const trackStream = (stream, chunkSize, onProgress, onFinish) => {
  const iterator2 = readBytes(stream, chunkSize);
  let bytes = 0;
  let done;
  let _onFinish = (e) => {
    if (!done) {
      done = true;
      onFinish && onFinish(e);
    }
  };
  return new ReadableStream({
    async pull(controller) {
      try {
        const { done: done2, value } = await iterator2.next();
        if (done2) {
          _onFinish();
          controller.close();
          return;
        }
        let len = value.byteLength;
        if (onProgress) {
          let loadedBytes = bytes += len;
          onProgress(loadedBytes);
        }
        controller.enqueue(new Uint8Array(value));
      } catch (err) {
        _onFinish(err);
        throw err;
      }
    },
    cancel(reason) {
      _onFinish(reason);
      return iterator2.return();
    }
  }, {
    highWaterMark: 2
  });
};
const isFetchSupported = typeof fetch === "function" && typeof Request === "function" && typeof Response === "function";
const isReadableStreamSupported = isFetchSupported && typeof ReadableStream === "function";
const encodeText = isFetchSupported && (typeof TextEncoder === "function" ? /* @__PURE__ */ ((encoder) => (str) => encoder.encode(str))(new TextEncoder()) : async (str) => new Uint8Array(await new Response(str).arrayBuffer()));
const test = (fn, ...args) => {
  try {
    return !!fn(...args);
  } catch (e) {
    return false;
  }
};
const supportsRequestStream = isReadableStreamSupported && test(() => {
  let duplexAccessed = false;
  const hasContentType = new Request(platform.origin, {
    body: new ReadableStream(),
    method: "POST",
    get duplex() {
      duplexAccessed = true;
      return "half";
    }
  }).headers.has("Content-Type");
  return duplexAccessed && !hasContentType;
});
const DEFAULT_CHUNK_SIZE = 64 * 1024;
const supportsResponseStream = isReadableStreamSupported && test(() => utils$1.isReadableStream(new Response("").body));
const resolvers = {
  stream: supportsResponseStream && ((res) => res.body)
};
isFetchSupported && ((res) => {
  ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((type) => {
    !resolvers[type] && (resolvers[type] = utils$1.isFunction(res[type]) ? (res2) => res2[type]() : (_, config) => {
      throw new AxiosError$1(`Response type '${type}' is not supported`, AxiosError$1.ERR_NOT_SUPPORT, config);
    });
  });
})(new Response());
const getBodyLength = async (body) => {
  if (body == null) {
    return 0;
  }
  if (utils$1.isBlob(body)) {
    return body.size;
  }
  if (utils$1.isSpecCompliantForm(body)) {
    const _request = new Request(platform.origin, {
      method: "POST",
      body
    });
    return (await _request.arrayBuffer()).byteLength;
  }
  if (utils$1.isArrayBufferView(body) || utils$1.isArrayBuffer(body)) {
    return body.byteLength;
  }
  if (utils$1.isURLSearchParams(body)) {
    body = body + "";
  }
  if (utils$1.isString(body)) {
    return (await encodeText(body)).byteLength;
  }
};
const resolveBodyLength = async (headers, body) => {
  const length = utils$1.toFiniteNumber(headers.getContentLength());
  return length == null ? getBodyLength(body) : length;
};
const fetchAdapter = isFetchSupported && (async (config) => {
  let {
    url,
    method,
    data,
    signal,
    cancelToken,
    timeout,
    onDownloadProgress,
    onUploadProgress,
    responseType,
    headers,
    withCredentials = "same-origin",
    fetchOptions
  } = resolveConfig(config);
  responseType = responseType ? (responseType + "").toLowerCase() : "text";
  let composedSignal = composeSignals([signal, cancelToken && cancelToken.toAbortSignal()], timeout);
  let request2;
  const unsubscribe = composedSignal && composedSignal.unsubscribe && (() => {
    composedSignal.unsubscribe();
  });
  let requestContentLength;
  try {
    if (onUploadProgress && supportsRequestStream && method !== "get" && method !== "head" && (requestContentLength = await resolveBodyLength(headers, data)) !== 0) {
      let _request = new Request(url, {
        method: "POST",
        body: data,
        duplex: "half"
      });
      let contentTypeHeader;
      if (utils$1.isFormData(data) && (contentTypeHeader = _request.headers.get("content-type"))) {
        headers.setContentType(contentTypeHeader);
      }
      if (_request.body) {
        const [onProgress, flush] = progressEventDecorator(
          requestContentLength,
          progressEventReducer(asyncDecorator(onUploadProgress))
        );
        data = trackStream(_request.body, DEFAULT_CHUNK_SIZE, onProgress, flush);
      }
    }
    if (!utils$1.isString(withCredentials)) {
      withCredentials = withCredentials ? "include" : "omit";
    }
    const isCredentialsSupported = "credentials" in Request.prototype;
    request2 = new Request(url, {
      ...fetchOptions,
      signal: composedSignal,
      method: method.toUpperCase(),
      headers: headers.normalize().toJSON(),
      body: data,
      duplex: "half",
      credentials: isCredentialsSupported ? withCredentials : void 0
    });
    let response = await fetch(request2, fetchOptions);
    const isStreamResponse = supportsResponseStream && (responseType === "stream" || responseType === "response");
    if (supportsResponseStream && (onDownloadProgress || isStreamResponse && unsubscribe)) {
      const options = {};
      ["status", "statusText", "headers"].forEach((prop) => {
        options[prop] = response[prop];
      });
      const responseContentLength = utils$1.toFiniteNumber(response.headers.get("content-length"));
      const [onProgress, flush] = onDownloadProgress && progressEventDecorator(
        responseContentLength,
        progressEventReducer(asyncDecorator(onDownloadProgress), true)
      ) || [];
      response = new Response(
        trackStream(response.body, DEFAULT_CHUNK_SIZE, onProgress, () => {
          flush && flush();
          unsubscribe && unsubscribe();
        }),
        options
      );
    }
    responseType = responseType || "text";
    let responseData = await resolvers[utils$1.findKey(resolvers, responseType) || "text"](response, config);
    !isStreamResponse && unsubscribe && unsubscribe();
    return await new Promise((resolve, reject) => {
      settle(resolve, reject, {
        data: responseData,
        headers: AxiosHeaders$1.from(response.headers),
        status: response.status,
        statusText: response.statusText,
        config,
        request: request2
      });
    });
  } catch (err) {
    unsubscribe && unsubscribe();
    if (err && err.name === "TypeError" && /Load failed|fetch/i.test(err.message)) {
      throw Object.assign(
        new AxiosError$1("Network Error", AxiosError$1.ERR_NETWORK, config, request2),
        {
          cause: err.cause || err
        }
      );
    }
    throw AxiosError$1.from(err, err && err.code, config, request2);
  }
});
const knownAdapters = {
  http: httpAdapter,
  xhr: xhrAdapter,
  fetch: fetchAdapter
};
utils$1.forEach(knownAdapters, (fn, value) => {
  if (fn) {
    try {
      Object.defineProperty(fn, "name", { value });
    } catch (e) {
    }
    Object.defineProperty(fn, "adapterName", { value });
  }
});
const renderReason = (reason) => `- ${reason}`;
const isResolvedHandle = (adapter) => utils$1.isFunction(adapter) || adapter === null || adapter === false;
const adapters = {
  getAdapter: (adapters2) => {
    adapters2 = utils$1.isArray(adapters2) ? adapters2 : [adapters2];
    const { length } = adapters2;
    let nameOrAdapter;
    let adapter;
    const rejectedReasons = {};
    for (let i = 0; i < length; i++) {
      nameOrAdapter = adapters2[i];
      let id;
      adapter = nameOrAdapter;
      if (!isResolvedHandle(nameOrAdapter)) {
        adapter = knownAdapters[(id = String(nameOrAdapter)).toLowerCase()];
        if (adapter === void 0) {
          throw new AxiosError$1(`Unknown adapter '${id}'`);
        }
      }
      if (adapter) {
        break;
      }
      rejectedReasons[id || "#" + i] = adapter;
    }
    if (!adapter) {
      const reasons = Object.entries(rejectedReasons).map(
        ([id, state]) => `adapter ${id} ` + (state === false ? "is not supported by the environment" : "is not available in the build")
      );
      let s = length ? reasons.length > 1 ? "since :\n" + reasons.map(renderReason).join("\n") : " " + renderReason(reasons[0]) : "as no adapter specified";
      throw new AxiosError$1(
        `There is no suitable adapter to dispatch the request ` + s,
        "ERR_NOT_SUPPORT"
      );
    }
    return adapter;
  },
  adapters: knownAdapters
};
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
  if (config.signal && config.signal.aborted) {
    throw new CanceledError$1(null, config);
  }
}
function dispatchRequest(config) {
  throwIfCancellationRequested(config);
  config.headers = AxiosHeaders$1.from(config.headers);
  config.data = transformData.call(
    config,
    config.transformRequest
  );
  if (["post", "put", "patch"].indexOf(config.method) !== -1) {
    config.headers.setContentType("application/x-www-form-urlencoded", false);
  }
  const adapter = adapters.getAdapter(config.adapter || defaults.adapter);
  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);
    response.data = transformData.call(
      config,
      config.transformResponse,
      response
    );
    response.headers = AxiosHeaders$1.from(response.headers);
    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel$1(reason)) {
      throwIfCancellationRequested(config);
      if (reason && reason.response) {
        reason.response.data = transformData.call(
          config,
          config.transformResponse,
          reason.response
        );
        reason.response.headers = AxiosHeaders$1.from(reason.response.headers);
      }
    }
    return Promise.reject(reason);
  });
}
const VERSION$1 = "1.11.0";
const validators$1 = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((type, i) => {
  validators$1[type] = function validator2(thing) {
    return typeof thing === type || "a" + (i < 1 ? "n " : " ") + type;
  };
});
const deprecatedWarnings = {};
validators$1.transitional = function transitional(validator2, version, message) {
  function formatMessage(opt, desc) {
    return "[Axios v" + VERSION$1 + "] Transitional option '" + opt + "'" + desc + (message ? ". " + message : "");
  }
  return (value, opt, opts) => {
    if (validator2 === false) {
      throw new AxiosError$1(
        formatMessage(opt, " has been removed" + (version ? " in " + version : "")),
        AxiosError$1.ERR_DEPRECATED
      );
    }
    if (version && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      console.warn(
        formatMessage(
          opt,
          " has been deprecated since v" + version + " and will be removed in the near future"
        )
      );
    }
    return validator2 ? validator2(value, opt, opts) : true;
  };
};
validators$1.spelling = function spelling(correctSpelling) {
  return (value, opt) => {
    console.warn(`${opt} is likely a misspelling of ${correctSpelling}`);
    return true;
  };
};
function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== "object") {
    throw new AxiosError$1("options must be an object", AxiosError$1.ERR_BAD_OPTION_VALUE);
  }
  const keys = Object.keys(options);
  let i = keys.length;
  while (i-- > 0) {
    const opt = keys[i];
    const validator2 = schema[opt];
    if (validator2) {
      const value = options[opt];
      const result = value === void 0 || validator2(value, opt, options);
      if (result !== true) {
        throw new AxiosError$1("option " + opt + " must be " + result, AxiosError$1.ERR_BAD_OPTION_VALUE);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw new AxiosError$1("Unknown option " + opt, AxiosError$1.ERR_BAD_OPTION);
    }
  }
}
const validator = {
  assertOptions,
  validators: validators$1
};
const validators = validator.validators;
let Axios$1 = class Axios {
  constructor(instanceConfig) {
    this.defaults = instanceConfig || {};
    this.interceptors = {
      request: new InterceptorManager(),
      response: new InterceptorManager()
    };
  }
  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  async request(configOrUrl, config) {
    try {
      return await this._request(configOrUrl, config);
    } catch (err) {
      if (err instanceof Error) {
        let dummy = {};
        Error.captureStackTrace ? Error.captureStackTrace(dummy) : dummy = new Error();
        const stack = dummy.stack ? dummy.stack.replace(/^.+\n/, "") : "";
        try {
          if (!err.stack) {
            err.stack = stack;
          } else if (stack && !String(err.stack).endsWith(stack.replace(/^.+\n.+\n/, ""))) {
            err.stack += "\n" + stack;
          }
        } catch (e) {
        }
      }
      throw err;
    }
  }
  _request(configOrUrl, config) {
    if (typeof configOrUrl === "string") {
      config = config || {};
      config.url = configOrUrl;
    } else {
      config = configOrUrl || {};
    }
    config = mergeConfig$1(this.defaults, config);
    const { transitional: transitional2, paramsSerializer, headers } = config;
    if (transitional2 !== void 0) {
      validator.assertOptions(transitional2, {
        silentJSONParsing: validators.transitional(validators.boolean),
        forcedJSONParsing: validators.transitional(validators.boolean),
        clarifyTimeoutError: validators.transitional(validators.boolean)
      }, false);
    }
    if (paramsSerializer != null) {
      if (utils$1.isFunction(paramsSerializer)) {
        config.paramsSerializer = {
          serialize: paramsSerializer
        };
      } else {
        validator.assertOptions(paramsSerializer, {
          encode: validators.function,
          serialize: validators.function
        }, true);
      }
    }
    if (config.allowAbsoluteUrls !== void 0) ;
    else if (this.defaults.allowAbsoluteUrls !== void 0) {
      config.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls;
    } else {
      config.allowAbsoluteUrls = true;
    }
    validator.assertOptions(config, {
      baseUrl: validators.spelling("baseURL"),
      withXsrfToken: validators.spelling("withXSRFToken")
    }, true);
    config.method = (config.method || this.defaults.method || "get").toLowerCase();
    let contextHeaders = headers && utils$1.merge(
      headers.common,
      headers[config.method]
    );
    headers && utils$1.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (method) => {
        delete headers[method];
      }
    );
    config.headers = AxiosHeaders$1.concat(contextHeaders, headers);
    const requestInterceptorChain = [];
    let synchronousRequestInterceptors = true;
    this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
      if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config) === false) {
        return;
      }
      synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
      requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
    });
    const responseInterceptorChain = [];
    this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
      responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
    });
    let promise;
    let i = 0;
    let len;
    if (!synchronousRequestInterceptors) {
      const chain = [dispatchRequest.bind(this), void 0];
      chain.unshift(...requestInterceptorChain);
      chain.push(...responseInterceptorChain);
      len = chain.length;
      promise = Promise.resolve(config);
      while (i < len) {
        promise = promise.then(chain[i++], chain[i++]);
      }
      return promise;
    }
    len = requestInterceptorChain.length;
    let newConfig = config;
    i = 0;
    while (i < len) {
      const onFulfilled = requestInterceptorChain[i++];
      const onRejected = requestInterceptorChain[i++];
      try {
        newConfig = onFulfilled(newConfig);
      } catch (error) {
        onRejected.call(this, error);
        break;
      }
    }
    try {
      promise = dispatchRequest.call(this, newConfig);
    } catch (error) {
      return Promise.reject(error);
    }
    i = 0;
    len = responseInterceptorChain.length;
    while (i < len) {
      promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
    }
    return promise;
  }
  getUri(config) {
    config = mergeConfig$1(this.defaults, config);
    const fullPath = buildFullPath(config.baseURL, config.url, config.allowAbsoluteUrls);
    return buildURL(fullPath, config.params, config.paramsSerializer);
  }
};
utils$1.forEach(["delete", "get", "head", "options"], function forEachMethodNoData(method) {
  Axios$1.prototype[method] = function(url, config) {
    return this.request(mergeConfig$1(config || {}, {
      method,
      url,
      data: (config || {}).data
    }));
  };
});
utils$1.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
  function generateHTTPMethod(isForm) {
    return function httpMethod(url, data, config) {
      return this.request(mergeConfig$1(config || {}, {
        method,
        headers: isForm ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url,
        data
      }));
    };
  }
  Axios$1.prototype[method] = generateHTTPMethod();
  Axios$1.prototype[method + "Form"] = generateHTTPMethod(true);
});
let CancelToken$1 = class CancelToken {
  constructor(executor) {
    if (typeof executor !== "function") {
      throw new TypeError("executor must be a function.");
    }
    let resolvePromise;
    this.promise = new Promise(function promiseExecutor(resolve) {
      resolvePromise = resolve;
    });
    const token = this;
    this.promise.then((cancel) => {
      if (!token._listeners) return;
      let i = token._listeners.length;
      while (i-- > 0) {
        token._listeners[i](cancel);
      }
      token._listeners = null;
    });
    this.promise.then = (onfulfilled) => {
      let _resolve;
      const promise = new Promise((resolve) => {
        token.subscribe(resolve);
        _resolve = resolve;
      }).then(onfulfilled);
      promise.cancel = function reject() {
        token.unsubscribe(_resolve);
      };
      return promise;
    };
    executor(function cancel(message, config, request2) {
      if (token.reason) {
        return;
      }
      token.reason = new CanceledError$1(message, config, request2);
      resolvePromise(token.reason);
    });
  }
  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason) {
      throw this.reason;
    }
  }
  /**
   * Subscribe to the cancel signal
   */
  subscribe(listener) {
    if (this.reason) {
      listener(this.reason);
      return;
    }
    if (this._listeners) {
      this._listeners.push(listener);
    } else {
      this._listeners = [listener];
    }
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(listener) {
    if (!this._listeners) {
      return;
    }
    const index = this._listeners.indexOf(listener);
    if (index !== -1) {
      this._listeners.splice(index, 1);
    }
  }
  toAbortSignal() {
    const controller = new AbortController();
    const abort = (err) => {
      controller.abort(err);
    };
    this.subscribe(abort);
    controller.signal.unsubscribe = () => this.unsubscribe(abort);
    return controller.signal;
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let cancel;
    const token = new CancelToken(function executor(c2) {
      cancel = c2;
    });
    return {
      token,
      cancel
    };
  }
};
function spread$1(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
}
function isAxiosError$1(payload) {
  return utils$1.isObject(payload) && payload.isAxiosError === true;
}
const HttpStatusCode$1 = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511
};
Object.entries(HttpStatusCode$1).forEach(([key, value]) => {
  HttpStatusCode$1[value] = key;
});
function createInstance(defaultConfig) {
  const context = new Axios$1(defaultConfig);
  const instance = bind(Axios$1.prototype.request, context);
  utils$1.extend(instance, Axios$1.prototype, context, { allOwnKeys: true });
  utils$1.extend(instance, context, null, { allOwnKeys: true });
  instance.create = function create(instanceConfig) {
    return createInstance(mergeConfig$1(defaultConfig, instanceConfig));
  };
  return instance;
}
const axios = createInstance(defaults);
axios.Axios = Axios$1;
axios.CanceledError = CanceledError$1;
axios.CancelToken = CancelToken$1;
axios.isCancel = isCancel$1;
axios.VERSION = VERSION$1;
axios.toFormData = toFormData$1;
axios.AxiosError = AxiosError$1;
axios.Cancel = axios.CanceledError;
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = spread$1;
axios.isAxiosError = isAxiosError$1;
axios.mergeConfig = mergeConfig$1;
axios.AxiosHeaders = AxiosHeaders$1;
axios.formToJSON = (thing) => formDataToJSON(utils$1.isHTMLForm(thing) ? new FormData(thing) : thing);
axios.getAdapter = adapters.getAdapter;
axios.HttpStatusCode = HttpStatusCode$1;
axios.default = axios;
const {
  Axios: Axios2,
  AxiosError,
  CanceledError,
  isCancel,
  CancelToken: CancelToken2,
  VERSION,
  all: all2,
  Cancel,
  isAxiosError,
  spread,
  toFormData,
  AxiosHeaders: AxiosHeaders2,
  HttpStatusCode,
  formToJSON,
  getAdapter,
  mergeConfig
} = axios;
const request = axios.create({
  // API 请求的默认前缀
  baseURL: "http://175.178.158.23:9503",
  // 请求超时时间
  timeout: 1e4
});
let once = false;
const errorHandler = (error2) => {
  if (error2.response) {
    if (error2.response.status == 401) {
      deleteToken();
      if (!once) {
        once = true;
        window["$dialog"]?.info({
          title: "友情提示",
          content: "当前登录已失效，请重新登录？",
          positiveText: "立即登录?",
          maskClosable: false,
          onPositiveClick: () => {
            location.reload();
          }
        });
      }
    }
  }
  return Promise.reject(error2);
};
request.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
}, errorHandler);
request.interceptors.response.use((response) => {
  const refreshAccessToken = response.headers.get("refresh-access-token");
  const refreshTokenExpire = response.headers.get("refresh-access-expires-at");
  if (refreshAccessToken && refreshTokenExpire) {
    setToken(refreshAccessToken, parseInt(refreshTokenExpire));
  }
  return response.data;
}, errorHandler);
const get = (url, data = {}) => {
  return request({
    url,
    params: data,
    method: "get"
  });
};
const post = (url, data = {}) => {
  return request({
    url,
    method: "post",
    data
  });
};
const sendP2PMessage = (data) => {
  return post("/api/v1/p2p/message/send", data);
};
const getP2PContacts = () => {
  return get("/api/v1/p2p/contact/list");
};
const connectToP2PPeer = (data) => {
  return post("/api/v1/p2p/peer/connect", data);
};
const _hoisted_1 = { class: "p2p-manager" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "P2PManager",
  setup(__props) {
    const message = useMessage();
    const p2pStore = useP2PStore();
    const status = computed(() => ({
      isRunning: p2pStore.isConnected,
      peerId: p2pStore.nodeId
    }));
    const contacts = computed(() => p2pStore.contacts);
    const peers = computed(() => p2pStore.discoveredNodes);
    const loading = ref(false);
    const peersLoading = ref(false);
    const contactsLoading = ref(false);
    const sendingMessage = ref(false);
    const addingContact = ref(false);
    const creatingGroup = ref(false);
    const showAddContactModal = ref(false);
    const showCreateGroupModal = ref(false);
    const messageForm = ref({
      targetPeerId: "",
      content: ""
    });
    const contactForm = ref({
      peerId: "",
      nickname: "",
      remark: ""
    });
    const groupForm = ref({
      name: "",
      description: ""
    });
    const peerOptions = computed(() => {
      return peers.value.map((peer) => ({
        label: `${peer.id} (${peer.status})`,
        value: peer.id
      }));
    });
    const peerColumns = [
      {
        title: "节点ID",
        key: "id",
        render: (row) => h("span", { style: "font-family: monospace; font-size: 12px;" }, row.id)
      },
      {
        title: "状态",
        key: "status",
        render: (row) => h(NTag, {
          type: row.status === "online" ? "success" : "default"
        }, () => row.status)
      },
      {
        title: "地址数量",
        key: "addresses",
        render: (row) => row.addresses?.length || 0
      },
      {
        title: "最后发现",
        key: "lastSeen",
        render: (row) => new Date(row.lastSeen).toLocaleString()
      },
      {
        title: "操作",
        key: "actions",
        render: (row) => h(__unplugin_components_1$2, {}, () => [
          h(Button, {
            size: "small",
            onClick: () => connectToPeer(row.id)
          }, () => "连接"),
          h(Button, {
            size: "small",
            onClick: () => addContactFromPeer(row.id)
          }, () => "添加联系人")
        ])
      }
    ];
    const contactColumns = [
      {
        title: "节点ID",
        key: "peerId",
        render: (row) => h("span", { style: "font-family: monospace; font-size: 12px;" }, row.peerId)
      },
      {
        title: "昵称",
        key: "nickname"
      },
      {
        title: "备注",
        key: "remark"
      },
      {
        title: "状态",
        key: "status",
        render: (row) => h(NTag, {
          type: row.status === "online" ? "success" : "default"
        }, () => row.status || "unknown")
      },
      {
        title: "添加时间",
        key: "addedAt",
        render: (row) => row.addedAt ? new Date(row.addedAt).toLocaleString() : "-"
      }
    ];
    const refreshStatus = async () => {
      loading.value = true;
      try {
        const result = await window.electron.p2p.getStatus();
        if (result.success) {
          p2pStore.setConnectionStatus(result.isRunning || false);
          if (result.nodeId) {
            p2pStore.setNodeId(result.nodeId);
          }
        }
      } catch (error) {
        console.warn("P2P服务未启用:", error instanceof Error ? error.message : String(error));
        p2pStore.setConnectionStatus(false);
        message.warning("P2P服务当前未启用，这是一个演示界面");
      } finally {
        loading.value = false;
      }
    };
    const refreshPeers = async () => {
      peersLoading.value = true;
      try {
        const result = await window.electron.p2p.getDiscoveredPeers();
        if (result.success) {
          p2pStore.setDiscoveredNodes(result.peers || []);
        }
        const connectedResult = await window.electron.p2p.getConnectedPeers();
        if (connectedResult.success) {
          p2pStore.setConnectedPeers(connectedResult.peers || []);
        }
      } catch (error) {
        console.warn("P2P服务未启用，无法获取节点列表:", error instanceof Error ? error.message : String(error));
        p2pStore.setDiscoveredNodes([]);
      } finally {
        peersLoading.value = false;
      }
    };
    const refreshContacts = async () => {
      contactsLoading.value = true;
      try {
        const contactsData = await getP2PContacts();
        p2pStore.setContacts(contactsData);
      } catch (error) {
        console.warn("P2P服务未启用，无法获取联系人列表:", error instanceof Error ? error.message : String(error));
        p2pStore.setContacts([]);
      } finally {
        contactsLoading.value = false;
      }
    };
    const connectToPeer = async (peerId) => {
      try {
        await connectToP2PPeer({ peerId });
        message.success("连接成功");
        await refreshPeers();
      } catch (error) {
        message.error("连接失败: " + (error instanceof Error ? error.message : String(error)));
      }
    };
    const addContactFromPeer = (peerId) => {
      contactForm.value.peerId = peerId;
      showAddContactModal.value = true;
    };
    const addContact = async () => {
      if (!contactForm.value.peerId) {
        message.error("请输入节点ID");
        return;
      }
      addingContact.value = true;
      try {
        const result = await window.electron.p2p.addContact({
          peerId: contactForm.value.peerId,
          nickname: contactForm.value.nickname,
          remark: contactForm.value.remark
        });
        if (result.success) {
          message.success("联系人添加成功");
          showAddContactModal.value = false;
          contactForm.value = { peerId: "", nickname: "", remark: "" };
          await refreshContacts();
        } else {
          message.error(result.message || "联系人添加失败");
        }
      } catch (error) {
        message.error("添加联系人失败: " + (error instanceof Error ? error.message : String(error)));
      } finally {
        addingContact.value = false;
      }
    };
    const createGroup = async () => {
      if (!groupForm.value.name) {
        message.error("请输入群组名称");
        return;
      }
      creatingGroup.value = true;
      try {
        const result = await window.electron.p2p.createGroup({
          name: groupForm.value.name,
          description: groupForm.value.description
        });
        if (result.success) {
          message.success(`创建群组成功，群组ID: ${result.groupId}`);
          showCreateGroupModal.value = false;
          groupForm.value = { name: "", description: "" };
        } else {
          message.error(result.message || "群组创建失败");
        }
      } catch (error) {
        message.error("创建群组失败: " + (error instanceof Error ? error.message : String(error)));
      } finally {
        creatingGroup.value = false;
      }
    };
    const sendTestMessage = async () => {
      if (!messageForm.value.targetPeerId || !messageForm.value.content) {
        message.error("请选择接收方并输入消息内容");
        return;
      }
      sendingMessage.value = true;
      try {
        await sendP2PMessage({
          targetPeerId: messageForm.value.targetPeerId,
          type: "text",
          content: messageForm.value.content
        });
        message.success("消息发送成功");
        messageForm.value.content = "";
      } catch (error) {
        message.error("消息发送失败: " + (error instanceof Error ? error.message : String(error)));
      } finally {
        sendingMessage.value = false;
      }
    };
    onMounted(async () => {
      await refreshStatus();
      await refreshPeers();
      await refreshContacts();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        !status.value.isRunning ? (openBlock(), createBlock(unref(NAlert), {
          key: 0,
          type: "warning",
          class: "mb-4"
        }, {
          header: withCtx(() => _cache[13] || (_cache[13] = [
            createTextVNode("P2P 服务未启用", -1)
          ])),
          default: withCtx(() => [
            _cache[14] || (_cache[14] = createTextVNode(" P2P 功能当前处于开发阶段，服务暂时未启用。这是一个演示界面，展示了 P2P 功能的完整设计。 ", -1)),
            _cache[15] || (_cache[15] = createBaseVNode("br", null, null, -1)),
            _cache[16] || (_cache[16] = createTextVNode("要启用 P2P 功能，需要解决 libp2p 依赖问题并重新启动服务。 ", -1))
          ]),
          _: 1,
          __: [14, 15, 16]
        })) : createCommentVNode("", true),
        createVNode(unref(__unplugin_components_2$3), {
          title: "P2P 网络管理",
          class: "mb-4"
        }, {
          "header-extra": withCtx(() => [
            createVNode(unref(NTag), {
              type: status.value.isRunning ? "success" : "error"
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(status.value.isRunning ? "运行中" : "已停止"), 1)
              ]),
              _: 1
            }, 8, ["type"])
          ]),
          default: withCtx(() => [
            createVNode(unref(__unplugin_components_1$2), { vertical: "" }, {
              default: withCtx(() => [
                createVNode(unref(NDescriptions), {
                  column: 2,
                  bordered: ""
                }, {
                  default: withCtx(() => [
                    createVNode(unref(NDescriptionsItem), { label: "节点ID" }, {
                      default: withCtx(() => [
                        createVNode(unref(NText), { code: "" }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(status.value.peerId || "未知"), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(NDescriptionsItem), { label: "状态" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(status.value.isRunning ? "运行中" : "已停止"), 1)
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(unref(__unplugin_components_1$2), null, {
                  default: withCtx(() => [
                    createVNode(unref(Button), {
                      onClick: refreshStatus,
                      loading: loading.value
                    }, {
                      default: withCtx(() => _cache[17] || (_cache[17] = [
                        createTextVNode(" 刷新状态 ", -1)
                      ])),
                      _: 1,
                      __: [17]
                    }, 8, ["loading"]),
                    createVNode(unref(Button), {
                      onClick: refreshPeers,
                      loading: peersLoading.value
                    }, {
                      default: withCtx(() => _cache[18] || (_cache[18] = [
                        createTextVNode(" 刷新节点 ", -1)
                      ])),
                      _: 1,
                      __: [18]
                    }, 8, ["loading"])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })
          ]),
          _: 1
        }),
        createVNode(unref(__unplugin_components_3$1), {
          "default-value": "peers",
          type: "line"
        }, {
          default: withCtx(() => [
            createVNode(unref(NTabPane), {
              name: "peers",
              tab: "发现的节点"
            }, {
              default: withCtx(() => [
                createVNode(unref(__unplugin_components_2$3), null, {
                  header: withCtx(() => [
                    createVNode(unref(__unplugin_components_1$2), { justify: "space-between" }, {
                      default: withCtx(() => [
                        createBaseVNode("span", null, "已发现的节点 (" + toDisplayString(peers.value.length) + ")", 1),
                        createVNode(unref(Button), {
                          size: "small",
                          onClick: refreshPeers,
                          loading: peersLoading.value
                        }, {
                          default: withCtx(() => _cache[19] || (_cache[19] = [
                            createTextVNode(" 刷新 ", -1)
                          ])),
                          _: 1,
                          __: [19]
                        }, 8, ["loading"])
                      ]),
                      _: 1
                    })
                  ]),
                  default: withCtx(() => [
                    createVNode(unref(NDataTable), {
                      columns: peerColumns,
                      data: peers.value,
                      loading: peersLoading.value,
                      pagination: false,
                      size: "small"
                    }, null, 8, ["data", "loading"])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }),
            createVNode(unref(NTabPane), {
              name: "contacts",
              tab: "P2P联系人"
            }, {
              default: withCtx(() => [
                createVNode(unref(__unplugin_components_2$3), null, {
                  header: withCtx(() => [
                    createVNode(unref(__unplugin_components_1$2), { justify: "space-between" }, {
                      default: withCtx(() => [
                        createBaseVNode("span", null, "P2P联系人 (" + toDisplayString(contacts.value.length) + ")", 1),
                        createVNode(unref(__unplugin_components_1$2), null, {
                          default: withCtx(() => [
                            createVNode(unref(Button), {
                              size: "small",
                              onClick: _cache[0] || (_cache[0] = ($event) => showAddContactModal.value = true)
                            }, {
                              default: withCtx(() => _cache[20] || (_cache[20] = [
                                createTextVNode(" 添加联系人 ", -1)
                              ])),
                              _: 1,
                              __: [20]
                            }),
                            createVNode(unref(Button), {
                              size: "small",
                              onClick: refreshContacts,
                              loading: contactsLoading.value
                            }, {
                              default: withCtx(() => _cache[21] || (_cache[21] = [
                                createTextVNode(" 刷新 ", -1)
                              ])),
                              _: 1,
                              __: [21]
                            }, 8, ["loading"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  default: withCtx(() => [
                    createVNode(unref(NDataTable), {
                      columns: contactColumns,
                      data: contacts.value,
                      loading: contactsLoading.value,
                      pagination: false,
                      size: "small"
                    }, null, 8, ["data", "loading"])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }),
            createVNode(unref(NTabPane), {
              name: "groups",
              tab: "P2P群组"
            }, {
              default: withCtx(() => [
                createVNode(unref(__unplugin_components_2$3), null, {
                  header: withCtx(() => [
                    createVNode(unref(__unplugin_components_1$2), { justify: "space-between" }, {
                      default: withCtx(() => [
                        _cache[23] || (_cache[23] = createBaseVNode("span", null, "P2P群组", -1)),
                        createVNode(unref(Button), {
                          size: "small",
                          onClick: _cache[1] || (_cache[1] = ($event) => showCreateGroupModal.value = true)
                        }, {
                          default: withCtx(() => _cache[22] || (_cache[22] = [
                            createTextVNode(" 创建群组 ", -1)
                          ])),
                          _: 1,
                          __: [22]
                        })
                      ]),
                      _: 1,
                      __: [23]
                    })
                  ]),
                  default: withCtx(() => [
                    createVNode(unref(NEmpty), { description: "暂无群组数据" })
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }),
            createVNode(unref(NTabPane), {
              name: "messages",
              tab: "消息测试"
            }, {
              default: withCtx(() => [
                createVNode(unref(__unplugin_components_2$3), null, {
                  default: withCtx(() => [
                    createVNode(unref(__unplugin_components_1$2), { vertical: "" }, {
                      default: withCtx(() => [
                        createVNode(unref(__unplugin_components_7), {
                          ref: "messageFormRef",
                          model: messageForm.value,
                          "label-placement": "left",
                          "label-width": "80"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(__unplugin_components_3$3), { label: "接收方" }, {
                              default: withCtx(() => [
                                createVNode(unref(NSelect), {
                                  value: messageForm.value.targetPeerId,
                                  "onUpdate:value": _cache[2] || (_cache[2] = ($event) => messageForm.value.targetPeerId = $event),
                                  options: peerOptions.value,
                                  placeholder: "选择接收方节点",
                                  clearable: ""
                                }, null, 8, ["value", "options"])
                              ]),
                              _: 1
                            }),
                            createVNode(unref(__unplugin_components_3$3), { label: "消息内容" }, {
                              default: withCtx(() => [
                                createVNode(unref(__unplugin_components_1), {
                                  value: messageForm.value.content,
                                  "onUpdate:value": _cache[3] || (_cache[3] = ($event) => messageForm.value.content = $event),
                                  type: "textarea",
                                  placeholder: "输入消息内容",
                                  rows: 3
                                }, null, 8, ["value"])
                              ]),
                              _: 1
                            }),
                            createVNode(unref(__unplugin_components_3$3), null, {
                              default: withCtx(() => [
                                createVNode(unref(Button), {
                                  onClick: sendTestMessage,
                                  loading: sendingMessage.value,
                                  type: "primary"
                                }, {
                                  default: withCtx(() => _cache[24] || (_cache[24] = [
                                    createTextVNode(" 发送消息 ", -1)
                                  ])),
                                  _: 1,
                                  __: [24]
                                }, 8, ["loading"])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["model"])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })
          ]),
          _: 1
        }),
        createVNode(unref(__unplugin_components_3$2), {
          show: showAddContactModal.value,
          "onUpdate:show": _cache[8] || (_cache[8] = ($event) => showAddContactModal.value = $event),
          preset: "dialog",
          title: "添加P2P联系人"
        }, {
          action: withCtx(() => [
            createVNode(unref(__unplugin_components_1$2), null, {
              default: withCtx(() => [
                createVNode(unref(Button), {
                  onClick: _cache[7] || (_cache[7] = ($event) => showAddContactModal.value = false)
                }, {
                  default: withCtx(() => _cache[25] || (_cache[25] = [
                    createTextVNode("取消", -1)
                  ])),
                  _: 1,
                  __: [25]
                }),
                createVNode(unref(Button), {
                  onClick: addContact,
                  loading: addingContact.value,
                  type: "primary"
                }, {
                  default: withCtx(() => _cache[26] || (_cache[26] = [
                    createTextVNode("添加", -1)
                  ])),
                  _: 1,
                  __: [26]
                }, 8, ["loading"])
              ]),
              _: 1
            })
          ]),
          default: withCtx(() => [
            createVNode(unref(__unplugin_components_7), {
              ref: "contactFormRef",
              model: contactForm.value,
              "label-placement": "left",
              "label-width": "80"
            }, {
              default: withCtx(() => [
                createVNode(unref(__unplugin_components_3$3), {
                  label: "节点ID",
                  required: ""
                }, {
                  default: withCtx(() => [
                    createVNode(unref(__unplugin_components_1), {
                      value: contactForm.value.peerId,
                      "onUpdate:value": _cache[4] || (_cache[4] = ($event) => contactForm.value.peerId = $event),
                      placeholder: "输入节点ID"
                    }, null, 8, ["value"])
                  ]),
                  _: 1
                }),
                createVNode(unref(__unplugin_components_3$3), { label: "昵称" }, {
                  default: withCtx(() => [
                    createVNode(unref(__unplugin_components_1), {
                      value: contactForm.value.nickname,
                      "onUpdate:value": _cache[5] || (_cache[5] = ($event) => contactForm.value.nickname = $event),
                      placeholder: "输入昵称"
                    }, null, 8, ["value"])
                  ]),
                  _: 1
                }),
                createVNode(unref(__unplugin_components_3$3), { label: "备注" }, {
                  default: withCtx(() => [
                    createVNode(unref(__unplugin_components_1), {
                      value: contactForm.value.remark,
                      "onUpdate:value": _cache[6] || (_cache[6] = ($event) => contactForm.value.remark = $event),
                      placeholder: "输入备注"
                    }, null, 8, ["value"])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["model"])
          ]),
          _: 1
        }, 8, ["show"]),
        createVNode(unref(__unplugin_components_3$2), {
          show: showCreateGroupModal.value,
          "onUpdate:show": _cache[12] || (_cache[12] = ($event) => showCreateGroupModal.value = $event),
          preset: "dialog",
          title: "创建P2P群组"
        }, {
          action: withCtx(() => [
            createVNode(unref(__unplugin_components_1$2), null, {
              default: withCtx(() => [
                createVNode(unref(Button), {
                  onClick: _cache[11] || (_cache[11] = ($event) => showCreateGroupModal.value = false)
                }, {
                  default: withCtx(() => _cache[27] || (_cache[27] = [
                    createTextVNode("取消", -1)
                  ])),
                  _: 1,
                  __: [27]
                }),
                createVNode(unref(Button), {
                  onClick: createGroup,
                  loading: creatingGroup.value,
                  type: "primary"
                }, {
                  default: withCtx(() => _cache[28] || (_cache[28] = [
                    createTextVNode("创建", -1)
                  ])),
                  _: 1,
                  __: [28]
                }, 8, ["loading"])
              ]),
              _: 1
            })
          ]),
          default: withCtx(() => [
            createVNode(unref(__unplugin_components_7), {
              ref: "groupFormRef",
              model: groupForm.value,
              "label-placement": "left",
              "label-width": "80"
            }, {
              default: withCtx(() => [
                createVNode(unref(__unplugin_components_3$3), {
                  label: "群组名称",
                  required: ""
                }, {
                  default: withCtx(() => [
                    createVNode(unref(__unplugin_components_1), {
                      value: groupForm.value.name,
                      "onUpdate:value": _cache[9] || (_cache[9] = ($event) => groupForm.value.name = $event),
                      placeholder: "输入群组名称"
                    }, null, 8, ["value"])
                  ]),
                  _: 1
                }),
                createVNode(unref(__unplugin_components_3$3), { label: "群组描述" }, {
                  default: withCtx(() => [
                    createVNode(unref(__unplugin_components_1), {
                      value: groupForm.value.description,
                      "onUpdate:value": _cache[10] || (_cache[10] = ($event) => groupForm.value.description = $event),
                      type: "textarea",
                      placeholder: "输入群组描述",
                      rows: 3
                    }, null, 8, ["value"])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["model"])
          ]),
          _: 1
        }, 8, ["show"])
      ]);
    };
  }
});
const P2PManager = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8a402a7c"]]);
export {
  P2PManager as default
};
