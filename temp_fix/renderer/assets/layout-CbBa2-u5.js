import { S as SubViewLayout } from "./SubViewLayout-Be1_XKlj.js";
import { I as IconWrapper, H as createVNode, t as defineComponent, a5 as createBlock, U as openBlock, aO as Remind } from "./index-CP-MMhae.js";
const LinkThree = IconWrapper("link-three", true, function(props) {
  return createVNode("svg", {
    "width": props.size,
    "height": props.size,
    "viewBox": "0 0 48 48",
    "fill": "none"
  }, [createVNode("rect", {
    "x": "34.6074",
    "y": "3.4939",
    "width": "14",
    "height": "18",
    "rx": "2",
    "transform": "rotate(45 34.6074 3.4939)",
    "stroke": props.colors[0],
    "stroke-width": props.strokeWidth,
    "stroke-linejoin": props.strokeLinejoin
  }, null), createVNode("rect", {
    "x": "16.2227",
    "y": "21.8787",
    "width": "14",
    "height": "18",
    "rx": "2",
    "transform": "rotate(45 16.2227 21.8787)",
    "stroke": props.colors[0],
    "stroke-width": props.strokeWidth,
    "stroke-linejoin": props.strokeLinejoin
  }, null), createVNode("path", {
    "d": "M31.0723 16.929L16.9301 31.0711",
    "stroke": props.colors[0],
    "stroke-width": props.strokeWidth,
    "stroke-linecap": props.strokeLinecap,
    "stroke-linejoin": props.strokeLinejoin
  }, null)]);
});
const Plug = IconWrapper("plug", false, function(props) {
  return createVNode("svg", {
    "width": props.size,
    "height": props.size,
    "viewBox": "0 0 48 48",
    "fill": "none"
  }, [createVNode("path", {
    "d": "M6 14H42V24C38 32 32 36 24 36C16 36 10 32 6 24V14Z",
    "fill": props.colors[1],
    "stroke": props.colors[0],
    "stroke-width": props.strokeWidth,
    "stroke-linejoin": props.strokeLinejoin
  }, null), createVNode("path", {
    "d": "M33 34L32 44H16L15 34",
    "stroke": props.colors[0],
    "stroke-width": props.strokeWidth,
    "stroke-linecap": props.strokeLinecap,
    "stroke-linejoin": props.strokeLinejoin
  }, null), createVNode("path", {
    "d": "M22 24H26",
    "stroke": props.colors[2],
    "stroke-width": props.strokeWidth,
    "stroke-linecap": props.strokeLinecap,
    "stroke-linejoin": props.strokeLinejoin
  }, null), createVNode("path", {
    "d": "M16 4L16 12",
    "stroke": props.colors[0],
    "stroke-width": props.strokeWidth,
    "stroke-linecap": props.strokeLinecap,
    "stroke-linejoin": props.strokeLinejoin
  }, null), createVNode("path", {
    "d": "M32 4V12",
    "stroke": props.colors[0],
    "stroke-width": props.strokeWidth,
    "stroke-linecap": props.strokeLinecap,
    "stroke-linejoin": props.strokeLinejoin
  }, null)]);
});
const Protect = IconWrapper("protect", true, function(props) {
  return createVNode("svg", {
    "width": props.size,
    "height": props.size,
    "viewBox": "0 0 48 48",
    "fill": "none"
  }, [createVNode("path", {
    "d": "M6 9.25564L24.0086 4L42 9.25564V20.0337C42 31.3622 34.7502 41.4194 24.0026 45.0005C13.2521 41.4195 6 31.36 6 20.0287V9.25564Z",
    "fill": props.colors[1],
    "stroke": props.colors[0],
    "stroke-width": props.strokeWidth,
    "stroke-linejoin": props.strokeLinejoin
  }, null), createVNode("path", {
    "d": "M15 23L22 30L34 18",
    "stroke": props.colors[2],
    "stroke-width": props.strokeWidth,
    "stroke-linecap": props.strokeLinecap,
    "stroke-linejoin": props.strokeLinejoin
  }, null)]);
});
const Tool = IconWrapper("tool", true, function(props) {
  return createVNode("svg", {
    "width": props.size,
    "height": props.size,
    "viewBox": "0 0 48 48",
    "fill": "none"
  }, [createVNode("path", {
    "d": "M44 16C44 22.6274 38.6274 28 32 28C29.9733 28 28.0639 27.4975 26.3896 26.6104L9 44L4 39L21.3896 21.6104C20.5025 19.9361 20 18.0267 20 16C20 9.37258 25.3726 4 32 4C34.0267 4 35.9361 4.50245 37.6104 5.38959L30 13L35 18L42.6104 10.3896C43.4975 12.0639 44 13.9733 44 16Z",
    "fill": props.colors[1],
    "stroke": props.colors[0],
    "stroke-width": props.strokeWidth,
    "stroke-linecap": props.strokeLinecap,
    "stroke-linejoin": props.strokeLinejoin
  }, null)]);
});
const User = IconWrapper("user", false, function(props) {
  return createVNode("svg", {
    "width": props.size,
    "height": props.size,
    "viewBox": "0 0 48 48",
    "fill": "none"
  }, [createVNode("circle", {
    "cx": "24",
    "cy": "12",
    "r": "8",
    "fill": props.colors[1],
    "stroke": props.colors[0],
    "stroke-width": props.strokeWidth,
    "stroke-linecap": props.strokeLinecap,
    "stroke-linejoin": props.strokeLinejoin
  }, null), createVNode("path", {
    "d": "M42 44C42 34.0589 33.9411 26 24 26C14.0589 26 6 34.0589 6 44",
    "stroke": props.colors[0],
    "stroke-width": props.strokeWidth,
    "stroke-linecap": props.strokeLinecap,
    "stroke-linejoin": props.strokeLinejoin
  }, null)]);
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "layout",
  setup(__props) {
    const menus = [
      {
        name: "个人中心",
        path: "/settings/detail",
        icon: User
      },
      {
        name: "安全设置",
        path: "/settings/security",
        icon: Protect
      },
      {
        name: "个性设置",
        path: "/settings/personalize",
        icon: Tool
      },
      {
        name: "绑定设置",
        path: "/settings/binding",
        icon: LinkThree
      },
      {
        name: "通知设置",
        path: "/settings/notification",
        icon: Remind
      },
      {
        name: "插件管理",
        path: "/settings/plugin",
        icon: Plug
      }
    ];
    return (_ctx, _cache) => {
      return openBlock(), createBlock(SubViewLayout, {
        title: "我的设置",
        menus
      });
    };
  }
});
export {
  _sfc_main as default
};
