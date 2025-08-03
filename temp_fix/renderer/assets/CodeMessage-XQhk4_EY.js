import { c as clipboard } from "./common-CbVb2jfY.js";
import { ba as inject, z as computed, dA as configProviderInjectionKey, q as derived, r as c, s as cB, b1 as cM, b2 as cE, t as defineComponent, u as h, x as useConfig, a1 as ref, a2 as onMounted, ah as watch, b7 as toRef, y as useTheme, bb as useThemeClass, I as IconWrapper, H as createVNode, L as createElementBlock, U as openBlock, M as createBaseVNode, R as toDisplayString, O as unref, N as NIcon, ac as normalizeClass, W as _export_sfc } from "./index-CP-MMhae.js";
import { u as useInject } from "./useInject-KwKquBHc.js";
import { C as Copy } from "./Copy-PmY75sEQ.js";
import "./index-88uWzgFD.js";
import "./string-g9b8veVd.js";
import "./Input-9scKSWkl.js";
import "./use-locale-sP6dOhdq.js";
import "./Dropdown-BaOl703U.js";
import "./SendOne-Ck-Fsq0E.js";
function useHljs(props, shouldHighlightRef) {
  const NConfigProvider = inject(configProviderInjectionKey, null);
  return computed(() => {
    return props.hljs || (NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.mergedHljsRef.value);
  });
}
function self(vars) {
  const {
    textColor2,
    fontSize,
    fontWeightStrong,
    textColor3
  } = vars;
  return {
    textColor: textColor2,
    fontSize,
    fontWeightStrong,
    // extracted from hljs atom-one-light.scss
    "mono-3": "#a0a1a7",
    "hue-1": "#0184bb",
    "hue-2": "#4078f2",
    "hue-3": "#a626a4",
    "hue-4": "#50a14f",
    "hue-5": "#e45649",
    "hue-5-2": "#c91243",
    "hue-6": "#986801",
    "hue-6-2": "#c18401",
    // line-number styles
    lineNumberTextColor: textColor3
  };
}
const codeLight = {
  common: derived,
  self
};
const style = c([cB("code", `
 font-size: var(--n-font-size);
 font-family: var(--n-font-family);
 `, [cM("show-line-numbers", `
 display: flex;
 `), cE("line-numbers", `
 user-select: none;
 padding-right: 12px;
 text-align: right;
 transition: color .3s var(--n-bezier);
 color: var(--n-line-number-text-color);
 `), cM("word-wrap", [c("pre", `
 white-space: pre-wrap;
 word-break: break-all;
 `)]), c("pre", `
 margin: 0;
 line-height: inherit;
 font-size: inherit;
 font-family: inherit;
 `), c("[class^=hljs]", `
 color: var(--n-text-color);
 transition: 
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `)]), ({
  props
}) => {
  const codeClass = `${props.bPrefix}code`;
  return [`${codeClass} .hljs-comment,
 ${codeClass} .hljs-quote {
 color: var(--n-mono-3);
 font-style: italic;
 }`, `${codeClass} .hljs-doctag,
 ${codeClass} .hljs-keyword,
 ${codeClass} .hljs-formula {
 color: var(--n-hue-3);
 }`, `${codeClass} .hljs-section,
 ${codeClass} .hljs-name,
 ${codeClass} .hljs-selector-tag,
 ${codeClass} .hljs-deletion,
 ${codeClass} .hljs-subst {
 color: var(--n-hue-5);
 }`, `${codeClass} .hljs-literal {
 color: var(--n-hue-1);
 }`, `${codeClass} .hljs-string,
 ${codeClass} .hljs-regexp,
 ${codeClass} .hljs-addition,
 ${codeClass} .hljs-attribute,
 ${codeClass} .hljs-meta-string {
 color: var(--n-hue-4);
 }`, `${codeClass} .hljs-built_in,
 ${codeClass} .hljs-class .hljs-title {
 color: var(--n-hue-6-2);
 }`, `${codeClass} .hljs-attr,
 ${codeClass} .hljs-variable,
 ${codeClass} .hljs-template-variable,
 ${codeClass} .hljs-type,
 ${codeClass} .hljs-selector-class,
 ${codeClass} .hljs-selector-attr,
 ${codeClass} .hljs-selector-pseudo,
 ${codeClass} .hljs-number {
 color: var(--n-hue-6);
 }`, `${codeClass} .hljs-symbol,
 ${codeClass} .hljs-bullet,
 ${codeClass} .hljs-link,
 ${codeClass} .hljs-meta,
 ${codeClass} .hljs-selector-id,
 ${codeClass} .hljs-title {
 color: var(--n-hue-2);
 }`, `${codeClass} .hljs-emphasis {
 font-style: italic;
 }`, `${codeClass} .hljs-strong {
 font-weight: var(--n-font-weight-strong);
 }`, `${codeClass} .hljs-link {
 text-decoration: underline;
 }`];
}]);
const codeProps = Object.assign(Object.assign({}, useTheme.props), {
  language: String,
  code: {
    type: String,
    default: ""
  },
  trim: {
    type: Boolean,
    default: true
  },
  hljs: Object,
  uri: Boolean,
  inline: Boolean,
  wordWrap: Boolean,
  showLineNumbers: Boolean,
  // In n-log, we only need to mount code's style for highlight
  internalFontSize: Number,
  internalNoHighlight: Boolean
});
const __unplugin_components_1 = defineComponent({
  name: "Code",
  props: codeProps,
  setup(props, {
    slots
  }) {
    const {
      internalNoHighlight
    } = props;
    const {
      mergedClsPrefixRef,
      inlineThemeDisabled
    } = useConfig();
    const codeRef = ref(null);
    const hljsRef = internalNoHighlight ? {
      value: void 0
    } : useHljs(props);
    const createCodeHtml = (language, code, trim) => {
      const {
        value: hljs
      } = hljsRef;
      if (!hljs) {
        return null;
      }
      if (!(language && hljs.getLanguage(language))) {
        return null;
      }
      return hljs.highlight(trim ? code.trim() : code, {
        language
      }).value;
    };
    const mergedShowLineNumbersRef = computed(() => {
      if (props.inline || props.wordWrap) return false;
      return props.showLineNumbers;
    });
    const setCode = () => {
      if (slots.default) return;
      const {
        value: codeEl
      } = codeRef;
      if (!codeEl) return;
      const {
        language
      } = props;
      const code = props.uri ? window.decodeURIComponent(props.code) : props.code;
      if (language) {
        const html = createCodeHtml(language, code, props.trim);
        if (html !== null) {
          if (props.inline) {
            codeEl.innerHTML = html;
          } else {
            const prevPreEl = codeEl.querySelector(".__code__");
            if (prevPreEl) codeEl.removeChild(prevPreEl);
            const preEl = document.createElement("pre");
            preEl.className = "__code__";
            preEl.innerHTML = html;
            codeEl.appendChild(preEl);
          }
          return;
        }
      }
      if (props.inline) {
        codeEl.textContent = code;
        return;
      }
      const maybePreEl = codeEl.querySelector(".__code__");
      if (maybePreEl) {
        maybePreEl.textContent = code;
      } else {
        const wrap = document.createElement("pre");
        wrap.className = "__code__";
        wrap.textContent = code;
        codeEl.innerHTML = "";
        codeEl.appendChild(wrap);
      }
    };
    onMounted(setCode);
    watch(toRef(props, "language"), setCode);
    watch(toRef(props, "code"), setCode);
    if (!internalNoHighlight) watch(hljsRef, setCode);
    const themeRef = useTheme("Code", "-code", style, codeLight, props, mergedClsPrefixRef);
    const cssVarsRef = computed(() => {
      const {
        common: {
          cubicBezierEaseInOut,
          fontFamilyMono
        },
        self: {
          textColor,
          fontSize,
          fontWeightStrong,
          lineNumberTextColor,
          // extracted from hljs atom-one-light.scss
          "mono-3": $1,
          "hue-1": $2,
          "hue-2": $3,
          "hue-3": $4,
          "hue-4": $5,
          "hue-5": $6,
          "hue-5-2": $7,
          "hue-6": $8,
          "hue-6-2": $9
        }
      } = themeRef.value;
      const {
        internalFontSize
      } = props;
      return {
        "--n-font-size": internalFontSize ? `${internalFontSize}px` : fontSize,
        "--n-font-family": fontFamilyMono,
        "--n-font-weight-strong": fontWeightStrong,
        "--n-bezier": cubicBezierEaseInOut,
        "--n-text-color": textColor,
        "--n-mono-3": $1,
        "--n-hue-1": $2,
        "--n-hue-2": $3,
        "--n-hue-3": $4,
        "--n-hue-4": $5,
        "--n-hue-5": $6,
        "--n-hue-5-2": $7,
        "--n-hue-6": $8,
        "--n-hue-6-2": $9,
        "--n-line-number-text-color": lineNumberTextColor
      };
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass("code", computed(() => {
      return `${props.internalFontSize || "a"}`;
    }), cssVarsRef, props) : void 0;
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      codeRef,
      mergedShowLineNumbers: mergedShowLineNumbersRef,
      lineNumbers: computed(() => {
        let number = 1;
        const numbers = [];
        let lastIsLineWrap = false;
        for (const char of props.code) {
          if (char === "\n") {
            lastIsLineWrap = true;
            numbers.push(number++);
          } else {
            lastIsLineWrap = false;
          }
        }
        if (!lastIsLineWrap) {
          numbers.push(number++);
        }
        return numbers.join("\n");
      }),
      cssVars: inlineThemeDisabled ? void 0 : cssVarsRef,
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
    };
  },
  render() {
    var _a, _b;
    const {
      mergedClsPrefix,
      wordWrap,
      mergedShowLineNumbers,
      onRender
    } = this;
    onRender === null || onRender === void 0 ? void 0 : onRender();
    return h("code", {
      class: [`${mergedClsPrefix}-code`, this.themeClass, wordWrap && `${mergedClsPrefix}-code--word-wrap`, mergedShowLineNumbers && `${mergedClsPrefix}-code--show-line-numbers`],
      style: this.cssVars,
      ref: "codeRef"
    }, mergedShowLineNumbers ? h("pre", {
      class: `${mergedClsPrefix}-code__line-numbers`
    }, this.lineNumbers) : null, (_b = (_a = this.$slots).default) === null || _b === void 0 ? void 0 : _b.call(_a));
  }
});
const Stretching = IconWrapper("stretching", true, function(props) {
  return createVNode("svg", {
    "width": props.size,
    "height": props.size,
    "viewBox": "0 0 48 48",
    "fill": "none"
  }, [createVNode("g", {
    "clip-path": "url(#" + props.id + "44a4c228)"
  }, [createVNode("path", {
    "d": "M23.0005 5.99951H8.00049C6.89592 5.99951 6.00049 6.89494 6.00049 7.99951V39.9999C6.00049 41.1044 6.89592 41.9998 8.00049 41.9998H40.0005C41.1051 41.9998 42.0005 41.1044 42.0005 39.9998V24.9998",
    "stroke": props.colors[0],
    "stroke-width": props.strokeWidth,
    "stroke-linecap": props.strokeLinecap,
    "stroke-linejoin": props.strokeLinejoin
  }, null), createVNode("path", {
    "d": "M24.001 15.9998V23.9998",
    "stroke": props.colors[0],
    "stroke-width": props.strokeWidth,
    "stroke-linecap": props.strokeLinecap
  }, null), createVNode("path", {
    "d": "M42 5.99951V13.9995",
    "stroke": props.colors[0],
    "stroke-width": props.strokeWidth,
    "stroke-linecap": props.strokeLinecap
  }, null), createVNode("path", {
    "d": "M32.001 23.9998H24.001",
    "stroke": props.colors[0],
    "stroke-width": props.strokeWidth,
    "stroke-linecap": props.strokeLinecap
  }, null), createVNode("path", {
    "d": "M42 5.99951L24 23.9995",
    "stroke": props.colors[0],
    "stroke-width": props.strokeWidth
  }, null), createVNode("path", {
    "d": "M42.0005 5.99951H34.0005",
    "stroke": props.colors[0],
    "stroke-width": props.strokeWidth,
    "stroke-linecap": props.strokeLinecap
  }, null)]), createVNode("defs", null, [createVNode("clipPath", {
    "id": props.id + "44a4c228"
  }, [createVNode("rect", {
    "width": "48",
    "height": "48",
    "fill": props.colors[2]
  }, null)])])]);
});
const _hoisted_1 = { class: "el-header header" };
const _hoisted_2 = { class: "el-main main me-scrollbar me-scrollbar-thumb" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CodeMessage",
  props: {
    code: {},
    lang: {}
  },
  setup(__props) {
    const props = __props;
    const { message } = useInject();
    const full = ref(false);
    const onClipboard = () => {
      clipboard(props.code, () => {
        message.success("复制成功");
      });
    };
    return (_ctx, _cache) => {
      const _component_n_icon = NIcon;
      const _component_n_code = __unplugin_components_1;
      return openBlock(), createElementBlock("section", {
        class: normalizeClass(["immsg-code el-container is-vertical", {
          full: unref(full)
        }])
      }, [
        createBaseVNode("header", _hoisted_1, [
          createBaseVNode("p", null, toDisplayString(_ctx.lang), 1),
          createBaseVNode("p", null, [
            createVNode(_component_n_icon, {
              class: "icon",
              size: 16,
              component: unref(Copy),
              onClick: onClipboard
            }, null, 8, ["component"]),
            createVNode(_component_n_icon, {
              class: "icon",
              size: 16,
              component: unref(Stretching),
              onClick: _cache[0] || (_cache[0] = ($event) => full.value = !unref(full))
            }, null, 8, ["component"])
          ])
        ]),
        createBaseVNode("main", _hoisted_2, [
          createVNode(_component_n_code, {
            language: _ctx.lang,
            code: _ctx.code,
            "show-line-numbers": ""
          }, null, 8, ["language", "code"])
        ])
      ], 2);
    };
  }
});
const CodeMessage = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-feadac86"]]);
export {
  CodeMessage as default
};
