import { I as IconWrapper, H as createVNode } from "./index-CP-MMhae.js";
const SendOne = IconWrapper("send-one", true, function(props) {
  return createVNode("svg", {
    "width": props.size,
    "height": props.size,
    "viewBox": "0 0 48 48",
    "fill": "none"
  }, [createVNode("path", {
    "d": "M42 6L4 20.1383L24 24.0083L29.0052 44L42 6Z",
    "stroke": props.colors[0],
    "stroke-width": props.strokeWidth,
    "stroke-linejoin": props.strokeLinejoin
  }, null), createVNode("path", {
    "d": "M24.0083 24.0084L29.6651 18.3516",
    "stroke": props.colors[0],
    "stroke-width": props.strokeWidth,
    "stroke-linecap": props.strokeLinecap,
    "stroke-linejoin": props.strokeLinejoin
  }, null)]);
});
export {
  SendOne as S
};
