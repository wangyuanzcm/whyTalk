import { bg as isBrowser, z as computed, a1 as ref, bd as onBeforeUnmount, Q as vShow, b0 as createInjectionKey, t as defineComponent, u as h, ba as inject, bh as getCurrentInstance, B as pxfy, v as mergeProps, bi as VResizeObserver, x as useConfig, bj as useMemo, a2 as onMounted, bk as provide, b7 as toRef, i as isBrowser$1, bl as flatten, bm as getSlot, bn as cloneVNode, bo as beforeNextFrameOnce, r as c, s as cB, bp as fadeInTransition, b1 as cM, bq as NBaseLoading, br as Transition, y as useTheme, A as createKey, bb as useThemeClass, bs as useCompitable, bt as watchEffect, bu as spinLight, L as createElementBlock, M as createBaseVNode, H as createVNode, V as createTextVNode, O as unref, bv as Application, T as withCtx, U as openBlock, a5 as createBlock, R as toDisplayString, aa as Button, F as Fragment, a9 as renderList, bw as __unplugin_components_2, ac as normalizeClass, a8 as createCommentVNode, aM as NTag, W as _export_sfc } from "./index-CP-MMhae.js";
import { P as Play } from "./Play-DfGHqBI4.js";
import { N as NEmpty } from "./Empty-DXO3k6Nm.js";
import { N as NTooltip } from "./Tooltip-BadUcq2V.js";
import { S as Setting } from "./Setting-BAUrJFN2.js";
import "./use-locale-sP6dOhdq.js";
function parseResponsiveProp(reponsiveProp) {
  if (typeof reponsiveProp === "number") {
    return {
      "": reponsiveProp.toString()
    };
  }
  const params = {};
  reponsiveProp.split(/ +/).forEach((pairLiteral) => {
    if (pairLiteral === "")
      return;
    const [prefix, value] = pairLiteral.split(":");
    if (value === void 0) {
      params[""] = prefix;
    } else {
      params[prefix] = value;
    }
  });
  return params;
}
function parseResponsivePropValue(reponsiveProp, activeKeyOrSize) {
  var _a;
  if (reponsiveProp === void 0 || reponsiveProp === null)
    return void 0;
  const classObj = parseResponsiveProp(reponsiveProp);
  if (activeKeyOrSize === void 0)
    return classObj[""];
  if (typeof activeKeyOrSize === "string") {
    return (_a = classObj[activeKeyOrSize]) !== null && _a !== void 0 ? _a : classObj[""];
  } else if (Array.isArray(activeKeyOrSize)) {
    for (let i = activeKeyOrSize.length - 1; i >= 0; --i) {
      const key = activeKeyOrSize[i];
      if (key in classObj)
        return classObj[key];
    }
    return classObj[""];
  } else {
    let activeValue = void 0;
    let activeKey = -1;
    Object.keys(classObj).forEach((key) => {
      const keyAsNum = Number(key);
      if (!Number.isNaN(keyAsNum) && activeKeyOrSize >= keyAsNum && keyAsNum >= activeKey) {
        activeKey = keyAsNum;
        activeValue = classObj[key];
      }
    });
    return activeValue;
  }
}
const defaultBreakpointOptions = {
  // mobile
  // 0 ~ 640 doesn't mean it should display well in all the range,
  // but means you should treat it like a mobile phone.)
  xs: 0,
  s: 640,
  m: 1024,
  l: 1280,
  xl: 1536,
  "2xl": 1920
  // normal desktop display
};
function createMediaQuery(screenWidth) {
  return `(min-width: ${screenWidth}px)`;
}
const mqlMap = {};
function useBreakpoints(screens = defaultBreakpointOptions) {
  if (!isBrowser)
    return computed(() => []);
  if (typeof window.matchMedia !== "function")
    return computed(() => []);
  const breakpointStatusRef = ref({});
  const breakpoints = Object.keys(screens);
  const updateBreakpoints = (e, breakpointName) => {
    if (e.matches)
      breakpointStatusRef.value[breakpointName] = true;
    else
      breakpointStatusRef.value[breakpointName] = false;
  };
  breakpoints.forEach((key) => {
    const breakpointValue = screens[key];
    let mql;
    let cbs;
    if (mqlMap[breakpointValue] === void 0) {
      mql = window.matchMedia(createMediaQuery(breakpointValue));
      if (mql.addEventListener) {
        mql.addEventListener("change", (e) => {
          cbs.forEach((cb) => {
            cb(e, key);
          });
        });
      } else if (mql.addListener) {
        mql.addListener((e) => {
          cbs.forEach((cb) => {
            cb(e, key);
          });
        });
      }
      cbs = /* @__PURE__ */ new Set();
      mqlMap[breakpointValue] = {
        mql,
        cbs
      };
    } else {
      mql = mqlMap[breakpointValue].mql;
      cbs = mqlMap[breakpointValue].cbs;
    }
    cbs.add(updateBreakpoints);
    if (mql.matches) {
      cbs.forEach((cb) => {
        cb(mql, key);
      });
    }
  });
  onBeforeUnmount(() => {
    breakpoints.forEach((breakpoint) => {
      const { cbs } = mqlMap[screens[breakpoint]];
      if (cbs.has(updateBreakpoints)) {
        cbs.delete(updateBreakpoints);
      }
    });
  });
  return computed(() => {
    const { value } = breakpointStatusRef;
    return breakpoints.filter((key) => value[key]);
  });
}
function isNodeVShowFalse(vNode) {
  var _a;
  const showDir = (_a = vNode.dirs) === null || _a === void 0 ? void 0 : _a.find(({
    dir
  }) => dir === vShow);
  return !!(showDir && showDir.value === false);
}
const defaultSpan$1 = 1;
const gridInjectionKey = createInjectionKey("n-grid");
const defaultSpan = 1;
const gridItemProps = {
  span: {
    type: [Number, String],
    default: defaultSpan
  },
  offset: {
    type: [Number, String],
    default: 0
  },
  suffix: Boolean,
  // private props
  privateOffset: Number,
  privateSpan: Number,
  privateColStart: Number,
  privateShow: {
    type: Boolean,
    default: true
  }
};
const NGridItem = defineComponent({
  __GRID_ITEM__: true,
  name: "GridItem",
  alias: ["Gi"],
  props: gridItemProps,
  setup() {
    const {
      isSsrRef,
      xGapRef,
      itemStyleRef,
      overflowRef,
      layoutShiftDisabledRef
    } = inject(gridInjectionKey);
    const self = getCurrentInstance();
    return {
      overflow: overflowRef,
      itemStyle: itemStyleRef,
      layoutShiftDisabled: layoutShiftDisabledRef,
      mergedXGap: computed(() => {
        return pxfy(xGapRef.value || 0);
      }),
      deriveStyle: () => {
        void isSsrRef.value;
        const {
          privateSpan = defaultSpan,
          privateShow = true,
          privateColStart = void 0,
          privateOffset = 0
        } = self.vnode.props;
        const {
          value: xGap
        } = xGapRef;
        const mergedXGap = pxfy(xGap || 0);
        return {
          display: !privateShow ? "none" : "",
          gridColumn: `${privateColStart !== null && privateColStart !== void 0 ? privateColStart : `span ${privateSpan}`} / span ${privateSpan}`,
          marginLeft: privateOffset ? `calc((100% - (${privateSpan} - 1) * ${mergedXGap}) / ${privateSpan} * ${privateOffset} + ${mergedXGap} * ${privateOffset})` : ""
        };
      }
    };
  },
  render() {
    var _a, _b;
    if (this.layoutShiftDisabled) {
      const {
        span,
        offset,
        mergedXGap
      } = this;
      return h("div", {
        style: {
          gridColumn: `span ${span} / span ${span}`,
          marginLeft: offset ? `calc((100% - (${span} - 1) * ${mergedXGap}) / ${span} * ${offset} + ${mergedXGap} * ${offset})` : ""
        }
      }, this.$slots);
    }
    return h("div", {
      style: [this.itemStyle, this.deriveStyle()]
    }, (_b = (_a = this.$slots).default) === null || _b === void 0 ? void 0 : _b.call(_a, {
      overflow: this.overflow
    }));
  }
});
const defaultBreakpoints = {
  xs: 0,
  // mobile
  s: 640,
  // tablet
  m: 1024,
  // laptop s
  l: 1280,
  // laptop
  xl: 1536,
  // laptop l
  xxl: 1920
  // normal desktop display
};
const defaultCols = 24;
const SSR_ATTR_NAME = "__ssr__";
const gridProps = {
  layoutShiftDisabled: Boolean,
  responsive: {
    type: [String, Boolean],
    default: "self"
  },
  cols: {
    type: [Number, String],
    default: defaultCols
  },
  itemResponsive: Boolean,
  collapsed: Boolean,
  // may create grid rows < collapsedRows since a item may take all the row
  collapsedRows: {
    type: Number,
    default: 1
  },
  itemStyle: [Object, String],
  xGap: {
    type: [Number, String],
    default: 0
  },
  yGap: {
    type: [Number, String],
    default: 0
  }
};
const NGrid = defineComponent({
  name: "Grid",
  inheritAttrs: false,
  props: gridProps,
  setup(props) {
    const {
      mergedClsPrefixRef,
      mergedBreakpointsRef
    } = useConfig(props);
    const numRegex = /^\d+$/;
    const widthRef = ref(void 0);
    const breakpointsRef = useBreakpoints((mergedBreakpointsRef === null || mergedBreakpointsRef === void 0 ? void 0 : mergedBreakpointsRef.value) || defaultBreakpoints);
    const isResponsiveRef = useMemo(() => {
      if (props.itemResponsive) return true;
      if (!numRegex.test(props.cols.toString())) return true;
      if (!numRegex.test(props.xGap.toString())) return true;
      if (!numRegex.test(props.yGap.toString())) return true;
      return false;
    });
    const responsiveQueryRef = computed(() => {
      if (!isResponsiveRef.value) return void 0;
      return props.responsive === "self" ? widthRef.value : breakpointsRef.value;
    });
    const responsiveColsRef = useMemo(() => {
      var _a;
      return (_a = Number(parseResponsivePropValue(props.cols.toString(), responsiveQueryRef.value))) !== null && _a !== void 0 ? _a : defaultCols;
    });
    const responsiveXGapRef = useMemo(() => parseResponsivePropValue(props.xGap.toString(), responsiveQueryRef.value));
    const responsiveYGapRef = useMemo(() => parseResponsivePropValue(props.yGap.toString(), responsiveQueryRef.value));
    const handleResize = (entry) => {
      widthRef.value = entry.contentRect.width;
    };
    const handleResizeRaf = (entry) => {
      beforeNextFrameOnce(handleResize, entry);
    };
    const overflowRef = ref(false);
    const handleResizeRef = computed(() => {
      if (props.responsive === "self") {
        return handleResizeRaf;
      }
      return void 0;
    });
    const isSsrRef = ref(false);
    const contentElRef = ref();
    onMounted(() => {
      const {
        value: contentEl
      } = contentElRef;
      if (contentEl) {
        if (contentEl.hasAttribute(SSR_ATTR_NAME)) {
          contentEl.removeAttribute(SSR_ATTR_NAME);
          isSsrRef.value = true;
        }
      }
    });
    provide(gridInjectionKey, {
      layoutShiftDisabledRef: toRef(props, "layoutShiftDisabled"),
      isSsrRef,
      itemStyleRef: toRef(props, "itemStyle"),
      xGapRef: responsiveXGapRef,
      overflowRef
    });
    return {
      isSsr: !isBrowser$1,
      contentEl: contentElRef,
      mergedClsPrefix: mergedClsPrefixRef,
      style: computed(() => {
        if (props.layoutShiftDisabled) {
          return {
            width: "100%",
            display: "grid",
            gridTemplateColumns: `repeat(${props.cols}, minmax(0, 1fr))`,
            columnGap: pxfy(props.xGap),
            rowGap: pxfy(props.yGap)
          };
        }
        return {
          width: "100%",
          display: "grid",
          gridTemplateColumns: `repeat(${responsiveColsRef.value}, minmax(0, 1fr))`,
          columnGap: pxfy(responsiveXGapRef.value),
          rowGap: pxfy(responsiveYGapRef.value)
        };
      }),
      isResponsive: isResponsiveRef,
      responsiveQuery: responsiveQueryRef,
      responsiveCols: responsiveColsRef,
      handleResize: handleResizeRef,
      overflow: overflowRef
    };
  },
  render() {
    if (this.layoutShiftDisabled) {
      return h("div", mergeProps({
        ref: "contentEl",
        class: `${this.mergedClsPrefix}-grid`,
        style: this.style
      }, this.$attrs), this.$slots);
    }
    const renderContent = () => {
      var _a, _b, _c, _d, _e, _f, _g;
      this.overflow = false;
      const rawChildren = flatten(getSlot(this));
      const childrenAndRawSpan = [];
      const {
        collapsed,
        collapsedRows,
        responsiveCols,
        responsiveQuery
      } = this;
      rawChildren.forEach((child) => {
        var _a2, _b2, _c2, _d2, _e2;
        if (((_a2 = child === null || child === void 0 ? void 0 : child.type) === null || _a2 === void 0 ? void 0 : _a2.__GRID_ITEM__) !== true) return;
        if (isNodeVShowFalse(child)) {
          const clonedNode = cloneVNode(child);
          if (clonedNode.props) {
            clonedNode.props.privateShow = false;
          } else {
            clonedNode.props = {
              privateShow: false
            };
          }
          childrenAndRawSpan.push({
            child: clonedNode,
            rawChildSpan: 0
          });
          return;
        }
        child.dirs = ((_b2 = child.dirs) === null || _b2 === void 0 ? void 0 : _b2.filter(({
          dir
        }) => dir !== vShow)) || null;
        if (((_c2 = child.dirs) === null || _c2 === void 0 ? void 0 : _c2.length) === 0) {
          child.dirs = null;
        }
        const clonedChild = cloneVNode(child);
        const rawChildSpan = Number((_e2 = parseResponsivePropValue((_d2 = clonedChild.props) === null || _d2 === void 0 ? void 0 : _d2.span, responsiveQuery)) !== null && _e2 !== void 0 ? _e2 : defaultSpan$1);
        if (rawChildSpan === 0) return;
        childrenAndRawSpan.push({
          child: clonedChild,
          rawChildSpan
        });
      });
      let suffixSpan = 0;
      const maybeSuffixNode = (_a = childrenAndRawSpan[childrenAndRawSpan.length - 1]) === null || _a === void 0 ? void 0 : _a.child;
      if (maybeSuffixNode === null || maybeSuffixNode === void 0 ? void 0 : maybeSuffixNode.props) {
        const suffixPropValue = (_b = maybeSuffixNode.props) === null || _b === void 0 ? void 0 : _b.suffix;
        if (suffixPropValue !== void 0 && suffixPropValue !== false) {
          suffixSpan = Number((_d = parseResponsivePropValue((_c = maybeSuffixNode.props) === null || _c === void 0 ? void 0 : _c.span, responsiveQuery)) !== null && _d !== void 0 ? _d : defaultSpan$1);
          maybeSuffixNode.props.privateSpan = suffixSpan;
          maybeSuffixNode.props.privateColStart = responsiveCols + 1 - suffixSpan;
          maybeSuffixNode.props.privateShow = (_e = maybeSuffixNode.props.privateShow) !== null && _e !== void 0 ? _e : true;
        }
      }
      let spanCounter = 0;
      let done = false;
      for (const {
        child,
        rawChildSpan
      } of childrenAndRawSpan) {
        if (done) {
          this.overflow = true;
        }
        if (!done) {
          const childOffset = Number((_g = parseResponsivePropValue((_f = child.props) === null || _f === void 0 ? void 0 : _f.offset, responsiveQuery)) !== null && _g !== void 0 ? _g : 0);
          const childSpan = Math.min(rawChildSpan + childOffset, responsiveCols);
          if (!child.props) {
            child.props = {
              privateSpan: childSpan,
              privateOffset: childOffset
            };
          } else {
            child.props.privateSpan = childSpan;
            child.props.privateOffset = childOffset;
          }
          if (collapsed) {
            const remainder = spanCounter % responsiveCols;
            if (childSpan + remainder > responsiveCols) {
              spanCounter += responsiveCols - remainder;
            }
            if (childSpan + spanCounter + suffixSpan > collapsedRows * responsiveCols) {
              done = true;
            } else {
              spanCounter += childSpan;
            }
          }
        }
        if (done) {
          if (child.props) {
            if (child.props.privateShow !== true) {
              child.props.privateShow = false;
            }
          } else {
            child.props = {
              privateShow: false
            };
          }
        }
      }
      return h("div", mergeProps({
        ref: "contentEl",
        class: `${this.mergedClsPrefix}-grid`,
        style: this.style,
        [SSR_ATTR_NAME]: this.isSsr || void 0
      }, this.$attrs), childrenAndRawSpan.map(({
        child
      }) => child));
    };
    return this.isResponsive && this.responsive === "self" ? h(VResizeObserver, {
      onResize: this.handleResize
    }, {
      default: renderContent
    }) : renderContent();
  }
});
const style = c([c("@keyframes spin-rotate", `
 from {
 transform: rotate(0);
 }
 to {
 transform: rotate(360deg);
 }
 `), cB("spin-container", `
 position: relative;
 `, [cB("spin-body", `
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translateX(-50%) translateY(-50%);
 `, [fadeInTransition()])]), cB("spin-body", `
 display: inline-flex;
 align-items: center;
 justify-content: center;
 flex-direction: column;
 `), cB("spin", `
 display: inline-flex;
 height: var(--n-size);
 width: var(--n-size);
 font-size: var(--n-size);
 color: var(--n-color);
 `, [cM("rotate", `
 animation: spin-rotate 2s linear infinite;
 `)]), cB("spin-description", `
 display: inline-block;
 font-size: var(--n-font-size);
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 margin-top: 8px;
 `), cB("spin-content", `
 opacity: 1;
 transition: opacity .3s var(--n-bezier);
 pointer-events: all;
 `, [cM("spinning", `
 user-select: none;
 -webkit-user-select: none;
 pointer-events: none;
 opacity: var(--n-opacity-spinning);
 `)])]);
const STROKE_WIDTH = {
  small: 20,
  medium: 18,
  large: 16
};
const spinProps = Object.assign(Object.assign({}, useTheme.props), {
  contentClass: String,
  contentStyle: [Object, String],
  description: String,
  stroke: String,
  size: {
    type: [String, Number],
    default: "medium"
  },
  show: {
    type: Boolean,
    default: true
  },
  strokeWidth: Number,
  rotate: {
    type: Boolean,
    default: true
  },
  spinning: {
    type: Boolean,
    validator: () => {
      return true;
    },
    default: void 0
  },
  delay: Number
});
const NSpin = defineComponent({
  name: "Spin",
  props: spinProps,
  slots: Object,
  setup(props) {
    const {
      mergedClsPrefixRef,
      inlineThemeDisabled
    } = useConfig(props);
    const themeRef = useTheme("Spin", "-spin", style, spinLight, props, mergedClsPrefixRef);
    const cssVarsRef = computed(() => {
      const {
        size: spinSize
      } = props;
      const {
        common: {
          cubicBezierEaseInOut
        },
        self
      } = themeRef.value;
      const {
        opacitySpinning,
        color,
        textColor
      } = self;
      const size = typeof spinSize === "number" ? pxfy(spinSize) : self[createKey("size", spinSize)];
      return {
        "--n-bezier": cubicBezierEaseInOut,
        "--n-opacity-spinning": opacitySpinning,
        "--n-size": size,
        "--n-color": color,
        "--n-text-color": textColor
      };
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass("spin", computed(() => {
      const {
        size
      } = props;
      return typeof size === "number" ? String(size) : size[0];
    }), cssVarsRef, props) : void 0;
    const compitableShow = useCompitable(props, ["spinning", "show"]);
    const activeRef = ref(false);
    watchEffect((onCleanup) => {
      let timerId;
      if (compitableShow.value) {
        const {
          delay
        } = props;
        if (delay) {
          timerId = window.setTimeout(() => {
            activeRef.value = true;
          }, delay);
          onCleanup(() => {
            clearTimeout(timerId);
          });
          return;
        }
      }
      activeRef.value = compitableShow.value;
    });
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      active: activeRef,
      mergedStrokeWidth: computed(() => {
        const {
          strokeWidth
        } = props;
        if (strokeWidth !== void 0) return strokeWidth;
        const {
          size
        } = props;
        return STROKE_WIDTH[typeof size === "number" ? "medium" : size];
      }),
      cssVars: inlineThemeDisabled ? void 0 : cssVarsRef,
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
    };
  },
  render() {
    var _a, _b;
    const {
      $slots,
      mergedClsPrefix,
      description
    } = this;
    const rotate = $slots.icon && this.rotate;
    const descriptionNode = (description || $slots.description) && h("div", {
      class: `${mergedClsPrefix}-spin-description`
    }, description || ((_a = $slots.description) === null || _a === void 0 ? void 0 : _a.call($slots)));
    const icon = $slots.icon ? h("div", {
      class: [`${mergedClsPrefix}-spin-body`, this.themeClass]
    }, h("div", {
      class: [`${mergedClsPrefix}-spin`, rotate && `${mergedClsPrefix}-spin--rotate`],
      style: $slots.default ? "" : this.cssVars
    }, $slots.icon()), descriptionNode) : h("div", {
      class: [`${mergedClsPrefix}-spin-body`, this.themeClass]
    }, h(NBaseLoading, {
      clsPrefix: mergedClsPrefix,
      style: $slots.default ? "" : this.cssVars,
      stroke: this.stroke,
      "stroke-width": this.mergedStrokeWidth,
      class: `${mergedClsPrefix}-spin`
    }), descriptionNode);
    (_b = this.onRender) === null || _b === void 0 ? void 0 : _b.call(this);
    return $slots.default ? h("div", {
      class: [`${mergedClsPrefix}-spin-container`, this.themeClass],
      style: this.cssVars
    }, h("div", {
      class: [`${mergedClsPrefix}-spin-content`, this.active && `${mergedClsPrefix}-spin-content--spinning`, this.contentClass],
      style: this.contentStyle
    }, $slots), h(Transition, {
      name: "fade-in-transition"
    }, {
      default: () => this.active ? icon : null
    })) : icon;
  }
});
const _hoisted_1 = { class: "workspace-container" };
const _hoisted_2 = { class: "workspace-header" };
const _hoisted_3 = { class: "workspace-content" };
const _hoisted_4 = {
  key: 0,
  class: "error-container"
};
const _hoisted_5 = { style: { "color": "#e74c3c", "margin-bottom": "16px" } };
const _hoisted_6 = {
  key: 1,
  class: "empty-container"
};
const _hoisted_7 = { class: "plugin-header" };
const _hoisted_8 = { class: "plugin-info" };
const _hoisted_9 = { class: "plugin-name" };
const _hoisted_10 = { class: "plugin-version" };
const _hoisted_11 = { class: "plugin-content" };
const _hoisted_12 = { class: "plugin-description" };
const _hoisted_13 = { class: "plugin-author" };
const _hoisted_14 = {
  key: 0,
  class: "plugin-features"
};
const _hoisted_15 = { class: "feature-item" };
const _hoisted_16 = { class: "feature-value" };
const _hoisted_17 = {
  key: 0,
  class: "feature-item"
};
const _hoisted_18 = { class: "feature-value" };
const _hoisted_19 = { class: "plugin-actions" };
const _hoisted_20 = { key: 0 };
const _hoisted_21 = { key: 1 };
const _hoisted_22 = { key: 2 };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  setup(__props) {
    const plugins = ref([]);
    const loading = ref(true);
    const error = ref("");
    const loadPlugins = async () => {
      try {
        loading.value = true;
        error.value = "";
        if (typeof window.electron === "undefined") {
          throw new Error("此功能需要在Electron环境中运行");
        }
        const pluginList = await window.electron.ipcRenderer.invoke("plugin:list");
        plugins.value = pluginList.filter((plugin) => plugin.type === "system" || plugin.type === "frontend");
      } catch (err) {
        error.value = err.message || "加载插件失败";
        console.error("加载插件失败:", err);
      } finally {
        loading.value = false;
      }
    };
    const openPlugin = async (plugin) => {
      try {
        console.log("打开插件:", plugin.id, "type:", plugin.type);
        window.$message?.success(`正在打开 ${plugin.config.name}`);
        let result;
        if (plugin.type === "frontend") {
          console.log("Calling IPC: plugin:frontend:open for", plugin.id);
          result = await window.electron.ipcRenderer.invoke("plugin:frontend:open", plugin.id);
          console.log("IPC result:", result);
        } else if (plugin.type === "system") {
          if (!plugin.config.ui || !plugin.config.ui.components) {
            ;
            window.$message?.warning("此系统插件暂无可用的UI界面");
            return;
          }
          console.log("Calling IPC: plugin:system:open-ui for", plugin.id);
          result = await window.electron.ipcRenderer.invoke("plugin:system:open-ui", plugin.id);
          console.log("IPC result:", result);
        } else {
          ;
          window.$message?.error("不支持的插件类型");
          return;
        }
        if (result && !result.success) {
          console.error("Plugin open failed:", result.error);
          window.$message?.error(`打开插件失败: ${result.error}`);
        } else {
          console.log("Plugin opened successfully");
        }
      } catch (err) {
        window.$message?.error(
          `打开插件失败: ${err instanceof Error ? err.message : String(err)}`
        );
      }
    };
    const configurePlugin = (plugin) => {
      console.log("配置插件:", plugin.id);
      window.$message?.info(`配置 ${plugin.config.name} 功能开发中...`);
    };
    const getStatusColor = (enabled) => {
      return enabled ? "success" : "default";
    };
    const getStatusText = (enabled) => {
      return enabled ? "已启用" : "已禁用";
    };
    onMounted(() => {
      loadPlugins();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("h2", null, [
            createVNode(unref(Application), {
              size: 24,
              style: { "margin-right": "8px", "vertical-align": "middle" }
            }),
            _cache[0] || (_cache[0] = createTextVNode(" 工作台 ", -1))
          ]),
          _cache[1] || (_cache[1] = createBaseVNode("p", { class: "workspace-description" }, "管理和使用系统插件应用", -1))
        ]),
        createBaseVNode("div", _hoisted_3, [
          createVNode(unref(NSpin), { show: loading.value }, {
            default: withCtx(() => [
              error.value ? (openBlock(), createElementBlock("div", _hoisted_4, [
                createVNode(unref(NEmpty), { description: "加载失败" }, {
                  extra: withCtx(() => [
                    createBaseVNode("p", _hoisted_5, toDisplayString(error.value), 1),
                    createVNode(unref(Button), {
                      onClick: loadPlugins,
                      type: "primary"
                    }, {
                      default: withCtx(() => _cache[2] || (_cache[2] = [
                        createTextVNode("重新加载", -1)
                      ])),
                      _: 1,
                      __: [2]
                    })
                  ]),
                  _: 1
                })
              ])) : plugins.value.length === 0 && !loading.value ? (openBlock(), createElementBlock("div", _hoisted_6, [
                createVNode(unref(NEmpty), { description: "暂无可用的插件应用" }, {
                  extra: withCtx(() => [
                    createVNode(unref(Button), {
                      onClick: loadPlugins,
                      type: "primary"
                    }, {
                      default: withCtx(() => _cache[3] || (_cache[3] = [
                        createTextVNode("刷新", -1)
                      ])),
                      _: 1,
                      __: [3]
                    })
                  ]),
                  _: 1
                })
              ])) : (openBlock(), createBlock(unref(NGrid), {
                key: 2,
                cols: 3,
                "x-gap": 16,
                "y-gap": 16,
                class: "plugin-grid"
              }, {
                default: withCtx(() => [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(plugins.value, (plugin) => {
                    return openBlock(), createBlock(unref(NGridItem), {
                      key: plugin.id
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(__unplugin_components_2), {
                          class: normalizeClass(["plugin-card", { "plugin-disabled": !plugin.enabled }]),
                          hoverable: ""
                        }, {
                          header: withCtx(() => [
                            createBaseVNode("div", _hoisted_7, [
                              createBaseVNode("div", _hoisted_8, [
                                createBaseVNode("h3", _hoisted_9, toDisplayString(plugin.config.name), 1),
                                createBaseVNode("p", _hoisted_10, "v" + toDisplayString(plugin.config.version), 1)
                              ]),
                              createVNode(unref(NTag), {
                                type: getStatusColor(plugin.enabled),
                                size: "small"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(getStatusText(plugin.enabled)), 1)
                                ]),
                                _: 2
                              }, 1032, ["type"])
                            ])
                          ]),
                          action: withCtx(() => [
                            createBaseVNode("div", _hoisted_19, [
                              createVNode(unref(NTooltip), { trigger: "hover" }, {
                                trigger: withCtx(() => [
                                  createVNode(unref(Button), {
                                    onClick: ($event) => openPlugin(plugin),
                                    type: "primary",
                                    size: "small",
                                    disabled: !plugin.enabled || plugin.type === "system" && !plugin.config.ui
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(Play), {
                                        size: 16,
                                        style: { "margin-right": "4px" }
                                      }),
                                      _cache[6] || (_cache[6] = createTextVNode(" 打开 ", -1))
                                    ]),
                                    _: 2,
                                    __: [6]
                                  }, 1032, ["onClick", "disabled"])
                                ]),
                                default: withCtx(() => [
                                  !plugin.enabled ? (openBlock(), createElementBlock("span", _hoisted_20, "插件已禁用")) : plugin.type === "system" && !plugin.config.ui ? (openBlock(), createElementBlock("span", _hoisted_21, "系统插件暂无UI界面")) : (openBlock(), createElementBlock("span", _hoisted_22, "打开插件应用"))
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(unref(Button), {
                                onClick: ($event) => configurePlugin(plugin),
                                size: "small",
                                quaternary: ""
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Setting), {
                                    size: 16,
                                    style: { "margin-right": "4px" }
                                  }),
                                  _cache[7] || (_cache[7] = createTextVNode(" 配置 ", -1))
                                ]),
                                _: 2,
                                __: [7]
                              }, 1032, ["onClick"])
                            ])
                          ]),
                          default: withCtx(() => [
                            createBaseVNode("div", _hoisted_11, [
                              createBaseVNode("p", _hoisted_12, toDisplayString(plugin.config.description), 1),
                              createBaseVNode("p", _hoisted_13, "作者: " + toDisplayString(plugin.config.author), 1),
                              plugin.config.ui ? (openBlock(), createElementBlock("div", _hoisted_14, [
                                createBaseVNode("div", _hoisted_15, [
                                  _cache[4] || (_cache[4] = createBaseVNode("span", { class: "feature-label" }, "UI组件:", -1)),
                                  createBaseVNode("span", _hoisted_16, toDisplayString(plugin.config.ui.components?.length || 0) + " 个", 1)
                                ]),
                                plugin.config.ui.settings ? (openBlock(), createElementBlock("div", _hoisted_17, [
                                  _cache[5] || (_cache[5] = createBaseVNode("span", { class: "feature-label" }, "设置页面:", -1)),
                                  createBaseVNode("span", _hoisted_18, toDisplayString(plugin.config.ui.settings.sections?.length || 0) + " 个分组", 1)
                                ])) : createCommentVNode("", true)
                              ])) : createCommentVNode("", true)
                            ])
                          ]),
                          _: 2
                        }, 1032, ["class"])
                      ]),
                      _: 2
                    }, 1024);
                  }), 128))
                ]),
                _: 1
              }))
            ]),
            _: 1
          }, 8, ["show"])
        ])
      ]);
    };
  }
});
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d029d215"]]);
export {
  index as default
};
