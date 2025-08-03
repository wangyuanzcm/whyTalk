import { I as IconWrapper, H as createVNode } from "./index-CP-MMhae.js";
const More = IconWrapper("more", false, function(props) {
  return createVNode("svg", {
    "width": props.size,
    "height": props.size,
    "viewBox": "0 0 48 48",
    "fill": "none"
  }, [createVNode("circle", {
    "cx": "12",
    "cy": "24",
    "r": "3",
    "fill": props.colors[0]
  }, null), createVNode("circle", {
    "cx": "24",
    "cy": "24",
    "r": "3",
    "fill": props.colors[0]
  }, null), createVNode("circle", {
    "cx": "36",
    "cy": "24",
    "r": "3",
    "fill": props.colors[0]
  }, null)]);
});
export {
  More as M
};
