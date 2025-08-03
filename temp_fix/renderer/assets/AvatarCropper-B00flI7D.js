import { I as IconWrapper, H as createVNode, t as defineComponent, L as createElementBlock, U as openBlock, a8 as createCommentVNode, M as createBaseVNode, P as withDirectives, Q as vShow, d2 as normalizeStyle, ac as normalizeClass, R as toDisplayString, W as _export_sfc, a4 as reactive, a1 as ref, T as withCtx, bw as __unplugin_components_2, O as unref, aa as Button, V as createTextVNode, N as NIcon, a6 as __unplugin_components_3, F as Fragment, ae as uploadFile } from "./index-CP-MMhae.js";
import { U as UploadOne } from "./UploadOne-CHKc3agb.js";
import { U as Undo } from "./Undo-DAYaSkZ9.js";
import { C as Close } from "./Close-BsKkRN62.js";
const Redo = IconWrapper("redo", true, function(props) {
  return createVNode("svg", {
    "width": props.size,
    "height": props.size,
    "viewBox": "0 0 48 48",
    "fill": "none"
  }, [createVNode("path", {
    "d": "M36.7279 36.7279C33.4706 39.9853 28.9706 42 24 42C14.0589 42 6 33.9411 6 24C6 14.0589 14.0589 6 24 6C28.9706 6 33.4706 8.01472 36.7279 11.2721C38.3859 12.9301 42 17 42 17",
    "stroke": props.colors[0],
    "stroke-width": props.strokeWidth,
    "stroke-linecap": props.strokeLinecap,
    "stroke-linejoin": props.strokeLinejoin
  }, null), createVNode("path", {
    "d": "M42 8V17H33",
    "stroke": props.colors[0],
    "stroke-width": props.strokeWidth,
    "stroke-linecap": props.strokeLinecap,
    "stroke-linejoin": props.strokeLinejoin
  }, null)]);
});
const RefreshOne = IconWrapper("refresh-one", true, function(props) {
  return createVNode("svg", {
    "width": props.size,
    "height": props.size,
    "viewBox": "0 0 48 48",
    "fill": "none"
  }, [createVNode("rect", {
    "x": "17",
    "y": "24.071",
    "width": "10",
    "height": "10",
    "rx": "2",
    "transform": "rotate(-45 17 24.071)",
    "fill": props.colors[1],
    "stroke": props.colors[0],
    "stroke-width": props.strokeWidth,
    "stroke-linecap": props.strokeLinecap,
    "stroke-linejoin": props.strokeLinejoin
  }, null), createVNode("path", {
    "d": "M40.1201 16C37.1747 10.0731 31.0586 6 23.9912 6C16.9237 6 10.9454 10.0731 8 16",
    "stroke": props.colors[0],
    "stroke-width": props.strokeWidth,
    "stroke-linecap": props.strokeLinecap
  }, null), createVNode("path", {
    "d": "M8 8V16",
    "stroke": props.colors[0],
    "stroke-width": props.strokeWidth,
    "stroke-linecap": props.strokeLinecap
  }, null), createVNode("path", {
    "d": "M14.7803 16L8.00013 16",
    "stroke": props.colors[0],
    "stroke-width": props.strokeWidth,
    "stroke-linecap": props.strokeLinecap
  }, null), createVNode("path", {
    "d": "M8 32C10.9454 37.9269 17.0615 42 24.129 42C31.1964 42 37.1747 37.9269 40.1201 32",
    "stroke": props.colors[0],
    "stroke-width": props.strokeWidth,
    "stroke-linecap": props.strokeLinecap
  }, null), createVNode("path", {
    "d": "M40.1201 40V32",
    "stroke": props.colors[0],
    "stroke-width": props.strokeWidth,
    "stroke-linecap": props.strokeLinecap
  }, null), createVNode("path", {
    "d": "M33.3398 32L40.12 32",
    "stroke": props.colors[0],
    "stroke-width": props.strokeWidth,
    "stroke-linecap": props.strokeLinecap
  }, null)]);
});
const Y = {};
Y.getData = (t) => new Promise((e, i) => {
  let s = {};
  L(t).then((r) => {
    s.arrayBuffer = r;
    try {
      s.orientation = N(r);
    } catch {
      s.orientation = -1;
    }
    e(s);
  }).catch((r) => {
    i(r);
  });
});
function L(t) {
  let e = null;
  return new Promise((i, s) => {
    if (t.src)
      if (/^data\:/i.test(t.src))
        e = k(t.src), i(e);
      else if (/^blob\:/i.test(t.src)) {
        var r = new FileReader();
        r.onload = function(h) {
          e = h.target.result, i(e);
        }, E(t.src, function(h) {
          r.readAsArrayBuffer(h);
        });
      } else {
        var o = new XMLHttpRequest();
        o.onload = function() {
          if (this.status == 200 || this.status === 0)
            e = o.response, i(e);
          else
            throw "Could not load image";
          o = null;
        }, o.open("GET", t.src, true), o.responseType = "arraybuffer", o.send(null);
      }
    else
      s("img error");
  });
}
function E(t, e) {
  var i = new XMLHttpRequest();
  i.open("GET", t, true), i.responseType = "blob", i.onload = function(s) {
    (this.status == 200 || this.status === 0) && e(this.response);
  }, i.send();
}
function k(t, e) {
  e = e || t.match(/^data\:([^\;]+)\;base64,/mi)[1] || "", t = t.replace(/^data\:([^\;]+)\;base64,/gmi, "");
  for (var i = atob(t), s = i.length % 2 == 0 ? i.length : i.length + 1, r = new ArrayBuffer(s), o = new Uint16Array(r), h = 0; h < s; h++)
    o[h] = i.charCodeAt(h);
  return r;
}
function T(t, e, i) {
  var s = "", r;
  for (r = e, i += e; r < i; r++)
    s += String.fromCharCode(t.getUint8(r));
  return s;
}
function N(t) {
  var e = new DataView(t), i = e.byteLength, s, r, o, h, a, n, c, l, f, p;
  if (e.getUint8(0) === 255 && e.getUint8(1) === 216)
    for (f = 2; f < i; ) {
      if (e.getUint8(f) === 255 && e.getUint8(f + 1) === 225) {
        c = f;
        break;
      }
      f++;
    }
  if (c && (r = c + 4, o = c + 10, T(e, r, 4) === "Exif" && (n = e.getUint16(o), a = n === 18761, (a || n === 19789) && e.getUint16(o + 2, a) === 42 && (h = e.getUint32(o + 4, a), h >= 8 && (l = o + h)))), l) {
    for (i = e.getUint16(l, a), p = 0; p < i; p++)
      if (f = l + p * 12 + 2, e.getUint16(f, a) === 274) {
        f += 8, s = e.getUint16(f, a);
        break;
      }
  }
  return s;
}
const $ = (t, e) => {
  const i = t.__vccOpts || t;
  for (const [s, r] of e)
    i[s] = r;
  return i;
}, z = defineComponent({
  data: function() {
    return {
      // 容器高宽
      w: 0,
      h: 0,
      // 图片缩放比例
      scale: 1,
      // 图片偏移x轴
      x: 0,
      // 图片偏移y轴
      y: 0,
      // 图片加载
      loading: true,
      // 图片真实宽度
      trueWidth: 0,
      // 图片真实高度
      trueHeight: 0,
      move: true,
      // 移动的x
      moveX: 0,
      // 移动的y
      moveY: 0,
      // 开启截图
      crop: false,
      // 正在截图
      cropping: false,
      // 裁剪框大小
      cropW: 0,
      cropH: 0,
      cropOldW: 0,
      cropOldH: 0,
      // 判断是否能够改变
      canChangeX: false,
      canChangeY: false,
      // 改变的基准点
      changeCropTypeX: 1,
      changeCropTypeY: 1,
      // 裁剪框的坐标轴
      cropX: 0,
      cropY: 0,
      cropChangeX: 0,
      cropChangeY: 0,
      cropOffsertX: 0,
      cropOffsertY: 0,
      // 支持的滚动事件
      support: "",
      // 移动端手指缩放
      touches: [],
      touchNow: false,
      // 图片旋转
      rotate: 0,
      isIos: false,
      orientation: 0,
      imgs: "",
      // 图片缩放系数
      coe: 0.2,
      // 是否正在多次缩放
      scaling: false,
      scalingSet: "",
      coeStatus: "",
      // 控制emit触发频率
      isCanShow: true,
      // 图片是否等于截图大小
      imgIsQqualCrop: false
    };
  },
  props: {
    img: {
      type: [String, Blob, null, File],
      default: ""
    },
    // 输出图片压缩比
    outputSize: {
      type: Number,
      default: 1
    },
    outputType: {
      type: String,
      default: "jpeg"
    },
    info: {
      type: Boolean,
      default: true
    },
    // 是否开启滚轮放大缩小
    canScale: {
      type: Boolean,
      default: true
    },
    // 是否自成截图框
    autoCrop: {
      type: Boolean,
      default: false
    },
    autoCropWidth: {
      type: [Number, String],
      default: 0
    },
    autoCropHeight: {
      type: [Number, String],
      default: 0
    },
    // 是否开启固定宽高比
    fixed: {
      type: Boolean,
      default: false
    },
    // 宽高比 w/h
    fixedNumber: {
      type: Array,
      default: () => [1, 1]
    },
    // 固定大小 禁止改变截图框大小
    fixedBox: {
      type: Boolean,
      default: false
    },
    // 输出截图是否缩放
    full: {
      type: Boolean,
      default: false
    },
    // 是否可以拖动图片
    canMove: {
      type: Boolean,
      default: true
    },
    // 是否可以拖动截图框
    canMoveBox: {
      type: Boolean,
      default: true
    },
    // 上传图片按照原始比例显示
    original: {
      type: Boolean,
      default: false
    },
    // 截图框能否超过图片
    centerBox: {
      type: Boolean,
      default: false
    },
    // 是否根据dpr输出高清图片
    high: {
      type: Boolean,
      default: true
    },
    // 截图框展示宽高类型
    infoTrue: {
      type: Boolean,
      default: false
    },
    // 可以压缩图片宽高  默认不超过200
    maxImgSize: {
      type: [Number, String],
      default: 2e3
    },
    // 倍数  可渲染当前截图框的n倍 0 - 1000;
    enlarge: {
      type: [Number, String],
      default: 1
    },
    // 自动预览的固定宽度
    preW: {
      type: [Number, String],
      default: 0
    },
    /*
      图片布局方式 mode 实现和css背景一样的效果
      contain  居中布局 默认不会缩放 保证图片在容器里面 mode: 'contain'
      cover    拉伸布局 填充整个容器  mode: 'cover'
      如果仅有一个数值被给定，这个数值将作为宽度值大小，高度值将被设定为auto。 mode: '50px'
      如果有两个数值被给定，第一个将作为宽度值大小，第二个作为高度值大小。 mode: '50px 60px'
    */
    mode: {
      type: String,
      default: "contain"
    },
    //限制最小区域,可传1以上的数字和字符串，限制长宽都是这么大
    // 也可以传数组[90,90] 
    limitMinSize: {
      type: [Number, Array, String],
      default: () => 10,
      validator: function(t) {
        return Array.isArray(t) ? Number(t[0]) >= 0 && Number(t[1]) >= 0 : Number(t) >= 0;
      }
    },
    // 导出时,填充背景颜色
    fillColor: {
      type: String,
      default: ""
    }
  },
  computed: {
    cropInfo() {
      let t = {};
      if (t.top = this.cropOffsertY > 21 ? "-21px" : "0px", t.width = this.cropW > 0 ? this.cropW : 0, t.height = this.cropH > 0 ? this.cropH : 0, this.infoTrue) {
        let e = 1;
        this.high && !this.full && (e = window.devicePixelRatio), this.enlarge !== 1 & !this.full && (e = Math.abs(Number(this.enlarge))), t.width = t.width * e, t.height = t.height * e, this.full && (t.width = t.width / this.scale, t.height = t.height / this.scale);
      }
      return t.width = t.width.toFixed(0), t.height = t.height.toFixed(0), t;
    },
    isIE() {
      return !!window.ActiveXObject || "ActiveXObject" in window;
    },
    passive() {
      return this.isIE ? null : {
        passive: false
      };
    },
    // 是否处于左右旋转
    isRotateRightOrLeft() {
      return [1, -1, 3, -3].includes(this.rotate);
    }
  },
  watch: {
    // 如果图片改变， 重新布局
    img() {
      this.checkedImg();
    },
    imgs(t) {
      t !== "" && this.reload();
    },
    cropW() {
      this.showPreview();
    },
    cropH() {
      this.showPreview();
    },
    cropOffsertX() {
      this.showPreview();
    },
    cropOffsertY() {
      this.showPreview();
    },
    scale(t, e) {
      this.showPreview();
    },
    x() {
      this.showPreview();
    },
    y() {
      this.showPreview();
    },
    autoCrop(t) {
      t && this.goAutoCrop();
    },
    // 修改了自动截图框
    autoCropWidth() {
      this.autoCrop && this.goAutoCrop();
    },
    autoCropHeight() {
      this.autoCrop && this.goAutoCrop();
    },
    mode() {
      this.checkedImg();
    },
    rotate() {
      this.showPreview(), this.autoCrop ? this.goAutoCrop(this.cropW, this.cropH) : (this.cropW > 0 || this.cropH > 0) && this.goAutoCrop(this.cropW, this.cropH);
    }
  },
  methods: {
    getVersion(t) {
      var e = navigator.userAgent.split(" "), i = "";
      let s = 0;
      const r = new RegExp(t, "i");
      for (var o = 0; o < e.length; o++)
        r.test(e[o]) && (i = e[o]);
      return i ? s = i.split("/")[1].split(".") : s = ["0", "0", "0"], s;
    },
    checkOrientationImage(t, e, i, s) {
      if (this.getVersion("chrome")[0] >= 81)
        e = -1;
      else if (this.getVersion("safari")[0] >= 605) {
        const h = this.getVersion("version");
        h[0] > 13 && h[1] > 1 && (e = -1);
      } else {
        const h = navigator.userAgent.toLowerCase().match(/cpu iphone os (.*?) like mac os/);
        if (h) {
          let a = h[1];
          a = a.split("_"), (a[0] > 13 || a[0] >= 13 && a[1] >= 4) && (e = -1);
        }
      }
      let r = document.createElement("canvas"), o = r.getContext("2d");
      switch (o.save(), e) {
        case 2:
          r.width = i, r.height = s, o.translate(i, 0), o.scale(-1, 1);
          break;
        case 3:
          r.width = i, r.height = s, o.translate(i / 2, s / 2), o.rotate(180 * Math.PI / 180), o.translate(-i / 2, -s / 2);
          break;
        case 4:
          r.width = i, r.height = s, o.translate(0, s), o.scale(1, -1);
          break;
        case 5:
          r.height = i, r.width = s, o.rotate(0.5 * Math.PI), o.scale(1, -1);
          break;
        case 6:
          r.width = s, r.height = i, o.translate(s / 2, i / 2), o.rotate(90 * Math.PI / 180), o.translate(-i / 2, -s / 2);
          break;
        case 7:
          r.height = i, r.width = s, o.rotate(0.5 * Math.PI), o.translate(i, -s), o.scale(-1, 1);
          break;
        case 8:
          r.height = i, r.width = s, o.translate(s / 2, i / 2), o.rotate(-90 * Math.PI / 180), o.translate(-i / 2, -s / 2);
          break;
        default:
          r.width = i, r.height = s;
      }
      o.drawImage(t, 0, 0, i, s), o.restore(), r.toBlob(
        (h) => {
          let a = URL.createObjectURL(h);
          URL.revokeObjectURL(this.imgs), this.imgs = a;
        },
        "image/" + this.outputType,
        1
      );
    },
    // checkout img
    checkedImg() {
      if (this.img === null || this.img === "") {
        this.imgs = "", this.clearCrop();
        return;
      }
      this.loading = true, this.scale = 1, this.rotate = 0, this.imgIsQqualCrop = false, this.clearCrop();
      let t = new Image();
      if (t.onload = () => {
        if (this.img === "")
          return this.$emit("img-load", new Error("图片不能为空")), false;
        let i = t.width, s = t.height;
        Y.getData(t).then((r) => {
          this.orientation = r.orientation || 1;
          let o = Number(this.maxImgSize);
          if (!this.orientation && i < o & s < o) {
            this.imgs = this.img;
            return;
          }
          i > o && (s = s / i * o, i = o), s > o && (i = i / s * o, s = o), this.checkOrientationImage(t, this.orientation, i, s);
        }).catch((r) => {
          this.$emit("img-load", "error"), this.$emit("img-load-error", r);
        });
      }, t.onerror = (i) => {
        this.$emit("img-load", "error"), this.$emit("img-load-error", i);
      }, this.img.substr(0, 4) !== "data" && (t.crossOrigin = ""), this.isIE) {
        var e = new XMLHttpRequest();
        e.onload = function() {
          var i = URL.createObjectURL(this.response);
          t.src = i;
        }, e.open("GET", this.img, true), e.responseType = "blob", e.send();
      } else
        t.src = this.img;
    },
    // 当按下鼠标键
    startMove(t) {
      if (t.preventDefault(), this.move && !this.crop) {
        if (!this.canMove)
          return false;
        this.moveX = ("clientX" in t ? t.clientX : t.touches[0].clientX) - this.x, this.moveY = ("clientY" in t ? t.clientY : t.touches[0].clientY) - this.y, t.touches ? (window.addEventListener("touchmove", this.moveImg), window.addEventListener("touchend", this.leaveImg), t.touches.length == 2 && (this.touches = t.touches, window.addEventListener("touchmove", this.touchScale), window.addEventListener("touchend", this.cancelTouchScale))) : (window.addEventListener("mousemove", this.moveImg), window.addEventListener("mouseup", this.leaveImg)), this.$emit("img-moving", {
          moving: true,
          axis: this.getImgAxis()
        });
      } else
        this.cropping = true, window.addEventListener("mousemove", this.createCrop), window.addEventListener("mouseup", this.endCrop), window.addEventListener("touchmove", this.createCrop), window.addEventListener("touchend", this.endCrop), this.cropOffsertX = t.offsetX ? t.offsetX : t.touches[0].pageX - this.$refs.cropper.offsetLeft, this.cropOffsertY = t.offsetY ? t.offsetY : t.touches[0].pageY - this.$refs.cropper.offsetTop, this.cropX = "clientX" in t ? t.clientX : t.touches[0].clientX, this.cropY = "clientY" in t ? t.clientY : t.touches[0].clientY, this.cropChangeX = this.cropOffsertX, this.cropChangeY = this.cropOffsertY, this.cropW = 0, this.cropH = 0;
    },
    // 移动端缩放
    touchScale(t) {
      t.preventDefault();
      let e = this.scale;
      var i = {
        x: this.touches[0].clientX,
        y: this.touches[0].clientY
      }, s = {
        x: t.touches[0].clientX,
        y: t.touches[0].clientY
      }, r = {
        x: this.touches[1].clientX,
        y: this.touches[1].clientY
      }, o = {
        x: t.touches[1].clientX,
        y: t.touches[1].clientY
      }, h = Math.sqrt(
        Math.pow(i.x - r.x, 2) + Math.pow(i.y - r.y, 2)
      ), a = Math.sqrt(
        Math.pow(s.x - o.x, 2) + Math.pow(s.y - o.y, 2)
      ), n = a - h, c = 1;
      c = c / this.trueWidth > c / this.trueHeight ? c / this.trueHeight : c / this.trueWidth, c = c > 0.1 ? 0.1 : c;
      var l = c * n;
      if (!this.touchNow) {
        if (this.touchNow = true, n > 0 ? e += Math.abs(l) : n < 0 && e > Math.abs(l) && (e -= Math.abs(l)), this.touches = t.touches, setTimeout(() => {
          this.touchNow = false;
        }, 8), !this.checkoutImgAxis(this.x, this.y, e))
          return false;
        this.scale = e;
      }
    },
    cancelTouchScale(t) {
      window.removeEventListener("touchmove", this.touchScale);
    },
    // 移动图片
    moveImg(t) {
      if (t.preventDefault(), t.touches && t.touches.length === 2)
        return this.touches = t.touches, window.addEventListener("touchmove", this.touchScale), window.addEventListener("touchend", this.cancelTouchScale), window.removeEventListener("touchmove", this.moveImg), false;
      let e = "clientX" in t ? t.clientX : t.touches[0].clientX, i = "clientY" in t ? t.clientY : t.touches[0].clientY, s, r;
      s = e - this.moveX, r = i - this.moveY, this.$nextTick(() => {
        if (this.centerBox) {
          let o = this.getImgAxis(s, r, this.scale), h = this.getCropAxis(), a = this.trueHeight * this.scale, n = this.trueWidth * this.scale, c, l, f, p;
          switch (this.rotate) {
            case 1:
            case -1:
            case 3:
            case -3:
              c = this.cropOffsertX - this.trueWidth * (1 - this.scale) / 2 + (a - n) / 2, l = this.cropOffsertY - this.trueHeight * (1 - this.scale) / 2 + (n - a) / 2, f = c - a + this.cropW, p = l - n + this.cropH;
              break;
            default:
              c = this.cropOffsertX - this.trueWidth * (1 - this.scale) / 2, l = this.cropOffsertY - this.trueHeight * (1 - this.scale) / 2, f = c - n + this.cropW, p = l - a + this.cropH;
              break;
          }
          o.x1 >= h.x1 && (s = c), o.y1 >= h.y1 && (r = l), o.x2 <= h.x2 && (s = f), o.y2 <= h.y2 && (r = p);
        }
        this.x = s, this.y = r, this.$emit("img-moving", {
          moving: true,
          axis: this.getImgAxis()
        });
      });
    },
    // 移动图片结束
    leaveImg(t) {
      window.removeEventListener("mousemove", this.moveImg), window.removeEventListener("touchmove", this.moveImg), window.removeEventListener("mouseup", this.leaveImg), window.removeEventListener("touchend", this.leaveImg), this.$emit("img-moving", {
        moving: false,
        axis: this.getImgAxis()
      });
    },
    // 缩放图片
    scaleImg() {
      this.canScale && window.addEventListener(this.support, this.changeSize, this.passive);
    },
    // 移出框
    cancelScale() {
      this.canScale && window.removeEventListener(this.support, this.changeSize);
    },
    // 改变大小函数
    changeSize(t) {
      t.preventDefault();
      let e = this.scale;
      var i = t.deltaY || t.wheelDelta, s = navigator.userAgent.indexOf("Firefox");
      i = s > 0 ? i * 30 : i, this.isIE && (i = -i);
      var r = this.coe;
      r = r / this.trueWidth > r / this.trueHeight ? r / this.trueHeight : r / this.trueWidth;
      var o = r * i;
      o < 0 ? e += Math.abs(o) : e > Math.abs(o) && (e -= Math.abs(o));
      let h = o < 0 ? "add" : "reduce";
      if (h !== this.coeStatus && (this.coeStatus = h, this.coe = 0.2), this.scaling || (this.scalingSet = setTimeout(() => {
        this.scaling = false, this.coe = this.coe += 0.01;
      }, 50)), this.scaling = true, !this.checkoutImgAxis(this.x, this.y, e))
        return false;
      this.scale = e;
    },
    // 修改图片大小函数
    changeScale(t) {
      let e = this.scale;
      t = t || 1;
      var i = 20;
      if (i = i / this.trueWidth > i / this.trueHeight ? i / this.trueHeight : i / this.trueWidth, t = t * i, t > 0 ? e += Math.abs(t) : e > Math.abs(t) && (e -= Math.abs(t)), !this.checkoutImgAxis(this.x, this.y, e))
        return false;
      this.scale = e;
    },
    // 创建截图框
    createCrop(t) {
      t.preventDefault();
      var e = "clientX" in t ? t.clientX : t.touches ? t.touches[0].clientX : 0, i = "clientY" in t ? t.clientY : t.touches ? t.touches[0].clientY : 0;
      this.$nextTick(() => {
        var s = e - this.cropX, r = i - this.cropY;
        if (s > 0 ? (this.cropW = s + this.cropChangeX > this.w ? this.w - this.cropChangeX : s, this.cropOffsertX = this.cropChangeX) : (this.cropW = this.w - this.cropChangeX + Math.abs(s) > this.w ? this.cropChangeX : Math.abs(s), this.cropOffsertX = this.cropChangeX + s > 0 ? this.cropChangeX + s : 0), !this.fixed)
          r > 0 ? (this.cropH = r + this.cropChangeY > this.h ? this.h - this.cropChangeY : r, this.cropOffsertY = this.cropChangeY) : (this.cropH = this.h - this.cropChangeY + Math.abs(r) > this.h ? this.cropChangeY : Math.abs(r), this.cropOffsertY = this.cropChangeY + r > 0 ? this.cropChangeY + r : 0);
        else {
          var o = this.cropW / this.fixedNumber[0] * this.fixedNumber[1];
          o + this.cropOffsertY > this.h ? (this.cropH = this.h - this.cropOffsertY, this.cropW = this.cropH / this.fixedNumber[1] * this.fixedNumber[0], s > 0 ? this.cropOffsertX = this.cropChangeX : this.cropOffsertX = this.cropChangeX - this.cropW) : this.cropH = o, this.cropOffsertY = this.cropOffsertY;
        }
      });
    },
    // 改变截图框大小
    changeCropSize(t, e, i, s, r) {
      t.preventDefault(), window.addEventListener("mousemove", this.changeCropNow), window.addEventListener("mouseup", this.changeCropEnd), window.addEventListener("touchmove", this.changeCropNow), window.addEventListener("touchend", this.changeCropEnd), this.canChangeX = e, this.canChangeY = i, this.changeCropTypeX = s, this.changeCropTypeY = r, this.cropX = "clientX" in t ? t.clientX : t.touches[0].clientX, this.cropY = "clientY" in t ? t.clientY : t.touches[0].clientY, this.cropOldW = this.cropW, this.cropOldH = this.cropH, this.cropChangeX = this.cropOffsertX, this.cropChangeY = this.cropOffsertY, this.fixed && this.canChangeX && this.canChangeY && (this.canChangeY = 0), this.$emit("change-crop-size", {
        width: this.cropW,
        height: this.cropH
      });
    },
    // 正在改变
    changeCropNow(t) {
      t.preventDefault();
      var e = "clientX" in t ? t.clientX : t.touches ? t.touches[0].clientX : 0, i = "clientY" in t ? t.clientY : t.touches ? t.touches[0].clientY : 0;
      let s = this.w, r = this.h, o = 0, h = 0;
      if (this.centerBox) {
        let c = this.getImgAxis(), l = c.x2, f = c.y2;
        o = c.x1 > 0 ? c.x1 : 0, h = c.y1 > 0 ? c.y1 : 0, s > l && (s = l), r > f && (r = f);
      }
      const [a, n] = this.checkCropLimitSize();
      this.$nextTick(() => {
        var c = e - this.cropX, l = i - this.cropY;
        if (this.canChangeX && (this.changeCropTypeX === 1 ? this.cropOldW - c < a ? (this.cropW = a, this.cropOffsertX = this.cropOldW + this.cropChangeX - o - a) : this.cropOldW - c > 0 ? (this.cropW = s - this.cropChangeX - c <= s - o ? this.cropOldW - c : this.cropOldW + this.cropChangeX - o, this.cropOffsertX = s - this.cropChangeX - c <= s - o ? this.cropChangeX + c : o) : (this.cropW = Math.abs(c) + this.cropChangeX <= s ? Math.abs(c) - this.cropOldW : s - this.cropOldW - this.cropChangeX, this.cropOffsertX = this.cropChangeX + this.cropOldW) : this.changeCropTypeX === 2 && (this.cropOldW + c < a ? this.cropW = a : this.cropOldW + c > 0 ? (this.cropW = this.cropOldW + c + this.cropOffsertX <= s ? this.cropOldW + c : s - this.cropOffsertX, this.cropOffsertX = this.cropChangeX) : (this.cropW = s - this.cropChangeX + Math.abs(c + this.cropOldW) <= s - o ? Math.abs(c + this.cropOldW) : this.cropChangeX - o, this.cropOffsertX = s - this.cropChangeX + Math.abs(c + this.cropOldW) <= s - o ? this.cropChangeX - Math.abs(c + this.cropOldW) : o))), this.canChangeY && (this.changeCropTypeY === 1 ? this.cropOldH - l < n ? (this.cropH = n, this.cropOffsertY = this.cropOldH + this.cropChangeY - h - n) : this.cropOldH - l > 0 ? (this.cropH = r - this.cropChangeY - l <= r - h ? this.cropOldH - l : this.cropOldH + this.cropChangeY - h, this.cropOffsertY = r - this.cropChangeY - l <= r - h ? this.cropChangeY + l : h) : (this.cropH = Math.abs(l) + this.cropChangeY <= r ? Math.abs(l) - this.cropOldH : r - this.cropOldH - this.cropChangeY, this.cropOffsertY = this.cropChangeY + this.cropOldH) : this.changeCropTypeY === 2 && (this.cropOldH + l < n ? this.cropH = n : this.cropOldH + l > 0 ? (this.cropH = this.cropOldH + l + this.cropOffsertY <= r ? this.cropOldH + l : r - this.cropOffsertY, this.cropOffsertY = this.cropChangeY) : (this.cropH = r - this.cropChangeY + Math.abs(l + this.cropOldH) <= r - h ? Math.abs(l + this.cropOldH) : this.cropChangeY - h, this.cropOffsertY = r - this.cropChangeY + Math.abs(l + this.cropOldH) <= r - h ? this.cropChangeY - Math.abs(l + this.cropOldH) : h))), this.canChangeX && this.fixed) {
          var f = this.cropW / this.fixedNumber[0] * this.fixedNumber[1];
          f < n ? (this.cropH = n, this.cropW = this.fixedNumber[0] * n / this.fixedNumber[1], this.changeCropTypeX === 1 && (this.cropOffsertX = this.cropChangeX + (this.cropOldW - this.cropW))) : f + this.cropOffsertY > r ? (this.cropH = r - this.cropOffsertY, this.cropW = this.cropH / this.fixedNumber[1] * this.fixedNumber[0], this.changeCropTypeX === 1 && (this.cropOffsertX = this.cropChangeX + (this.cropOldW - this.cropW))) : this.cropH = f;
        }
        if (this.canChangeY && this.fixed) {
          var p = this.cropH / this.fixedNumber[1] * this.fixedNumber[0];
          p < a ? (this.cropW = a, this.cropH = this.fixedNumber[1] * a / this.fixedNumber[0], this.cropOffsertY = this.cropOldH + this.cropChangeY - this.cropH) : p + this.cropOffsertX > s ? (this.cropW = s - this.cropOffsertX, this.cropH = this.cropW / this.fixedNumber[0] * this.fixedNumber[1]) : this.cropW = p;
        }
      });
    },
    checkCropLimitSize() {
      let { cropW: t, cropH: e, limitMinSize: i } = this, s = new Array();
      return Array.isArray(i) ? s = i : s = [i, i], t = parseFloat(s[0]), e = parseFloat(s[1]), [t, e];
    },
    // 结束改变
    changeCropEnd(t) {
      window.removeEventListener("mousemove", this.changeCropNow), window.removeEventListener("mouseup", this.changeCropEnd), window.removeEventListener("touchmove", this.changeCropNow), window.removeEventListener("touchend", this.changeCropEnd);
    },
    // 根据比例x/y，最小宽度，最小高度，现有宽度，现有高度，得到应该有的宽度和高度
    calculateSize(t, e, i, s, r, o) {
      const h = t / e;
      let a = r, n = o;
      return a < i && (a = i, n = Math.ceil(a / h)), n < s && (n = s, a = Math.ceil(n * h), a < i && (a = i, n = Math.ceil(a / h))), a < r && (a = r, n = Math.ceil(a / h)), n < o && (n = o, a = Math.ceil(n * h)), { width: a, height: n };
    },
    // 创建完成
    endCrop() {
      this.cropW === 0 && this.cropH === 0 && (this.cropping = false);
      let [t, e] = this.checkCropLimitSize();
      const { width: i, height: s } = this.fixed ? this.calculateSize(
        this.fixedNumber[0],
        this.fixedNumber[1],
        t,
        e,
        this.cropW,
        this.cropH
      ) : { width: t, height: e };
      i > this.cropW && (this.cropW = i, this.cropOffsertX + i > this.w && (this.cropOffsertX = this.w - i)), s > this.cropH && (this.cropH = s, this.cropOffsertY + s > this.h && (this.cropOffsertY = this.h - s)), window.removeEventListener("mousemove", this.createCrop), window.removeEventListener("mouseup", this.endCrop), window.removeEventListener("touchmove", this.createCrop), window.removeEventListener("touchend", this.endCrop);
    },
    // 开始截图
    startCrop() {
      this.crop = true;
    },
    // 停止截图
    stopCrop() {
      this.crop = false;
    },
    // 清除截图
    clearCrop() {
      this.cropping = false, this.cropW = 0, this.cropH = 0;
    },
    // 截图移动
    cropMove(t) {
      if (t.preventDefault(), !this.canMoveBox)
        return this.crop = false, this.startMove(t), false;
      if (t.touches && t.touches.length === 2)
        return this.crop = false, this.startMove(t), this.leaveCrop(), false;
      window.addEventListener("mousemove", this.moveCrop), window.addEventListener("mouseup", this.leaveCrop), window.addEventListener("touchmove", this.moveCrop), window.addEventListener("touchend", this.leaveCrop);
      let e = "clientX" in t ? t.clientX : t.touches[0].clientX, i = "clientY" in t ? t.clientY : t.touches[0].clientY, s, r;
      s = e - this.cropOffsertX, r = i - this.cropOffsertY, this.cropX = s, this.cropY = r, this.$emit("crop-moving", {
        moving: true,
        axis: this.getCropAxis()
      });
    },
    moveCrop(t, e) {
      let i = 0, s = 0;
      t && (t.preventDefault(), i = "clientX" in t ? t.clientX : t.touches[0].clientX, s = "clientY" in t ? t.clientY : t.touches[0].clientY), this.$nextTick(() => {
        let r, o, h = i - this.cropX, a = s - this.cropY;
        if (e && (h = this.cropOffsertX, a = this.cropOffsertY), h <= 0 ? r = 0 : h + this.cropW > this.w ? r = this.w - this.cropW : r = h, a <= 0 ? o = 0 : a + this.cropH > this.h ? o = this.h - this.cropH : o = a, this.centerBox) {
          let n = this.getImgAxis();
          r <= n.x1 && (r = n.x1), r + this.cropW > n.x2 && (r = n.x2 - this.cropW), o <= n.y1 && (o = n.y1), o + this.cropH > n.y2 && (o = n.y2 - this.cropH);
        }
        this.cropOffsertX = r, this.cropOffsertY = o, this.$emit("crop-moving", {
          moving: true,
          axis: this.getCropAxis()
        });
      });
    },
    // 算出不同场景下面 图片相对于外层容器的坐标轴
    getImgAxis(t, e, i) {
      t = t || this.x, e = e || this.y, i = i || this.scale;
      let s = {
        x1: 0,
        x2: 0,
        y1: 0,
        y2: 0
      }, r = this.trueWidth * i, o = this.trueHeight * i;
      switch (this.rotate) {
        case 0:
          s.x1 = t + this.trueWidth * (1 - i) / 2, s.x2 = s.x1 + this.trueWidth * i, s.y1 = e + this.trueHeight * (1 - i) / 2, s.y2 = s.y1 + this.trueHeight * i;
          break;
        case 1:
        case -1:
        case 3:
        case -3:
          s.x1 = t + this.trueWidth * (1 - i) / 2 + (r - o) / 2, s.x2 = s.x1 + this.trueHeight * i, s.y1 = e + this.trueHeight * (1 - i) / 2 + (o - r) / 2, s.y2 = s.y1 + this.trueWidth * i;
          break;
        default:
          s.x1 = t + this.trueWidth * (1 - i) / 2, s.x2 = s.x1 + this.trueWidth * i, s.y1 = e + this.trueHeight * (1 - i) / 2, s.y2 = s.y1 + this.trueHeight * i;
          break;
      }
      return s;
    },
    // 获取截图框的坐标轴
    getCropAxis() {
      let t = {
        x1: 0,
        x2: 0,
        y1: 0,
        y2: 0
      };
      return t.x1 = this.cropOffsertX, t.x2 = t.x1 + this.cropW, t.y1 = this.cropOffsertY, t.y2 = t.y1 + this.cropH, t;
    },
    leaveCrop(t) {
      window.removeEventListener("mousemove", this.moveCrop), window.removeEventListener("mouseup", this.leaveCrop), window.removeEventListener("touchmove", this.moveCrop), window.removeEventListener("touchend", this.leaveCrop), this.$emit("crop-moving", {
        moving: false,
        axis: this.getCropAxis()
      });
    },
    getCropChecked(t) {
      let e = document.createElement("canvas"), i = e.getContext("2d"), s = new Image(), r = this.rotate, o = this.trueWidth, h = this.trueHeight, a = this.cropOffsertX, n = this.cropOffsertY;
      s.onload = () => {
        if (this.cropW !== 0) {
          let p = 1;
          this.high & !this.full && (p = window.devicePixelRatio), this.enlarge !== 1 & !this.full && (p = Math.abs(Number(this.enlarge)));
          let d = this.cropW * p, C = this.cropH * p, u = o * this.scale * p, g = h * this.scale * p, m = (this.x - a + this.trueWidth * (1 - this.scale) / 2) * p, v = (this.y - n + this.trueHeight * (1 - this.scale) / 2) * p;
          switch (f(d, C), i.save(), r) {
            case 0:
              this.full ? (f(d / this.scale, C / this.scale), i.drawImage(
                s,
                m / this.scale,
                v / this.scale,
                u / this.scale,
                g / this.scale
              )) : i.drawImage(s, m, v, u, g);
              break;
            case 1:
            case -3:
              this.full ? (f(d / this.scale, C / this.scale), m = m / this.scale + (u / this.scale - g / this.scale) / 2, v = v / this.scale + (g / this.scale - u / this.scale) / 2, i.rotate(r * 90 * Math.PI / 180), i.drawImage(
                s,
                v,
                -m - g / this.scale,
                u / this.scale,
                g / this.scale
              )) : (m = m + (u - g) / 2, v = v + (g - u) / 2, i.rotate(r * 90 * Math.PI / 180), i.drawImage(s, v, -m - g, u, g));
              break;
            case 2:
            case -2:
              this.full ? (f(d / this.scale, C / this.scale), i.rotate(r * 90 * Math.PI / 180), m = m / this.scale, v = v / this.scale, i.drawImage(
                s,
                -m - u / this.scale,
                -v - g / this.scale,
                u / this.scale,
                g / this.scale
              )) : (i.rotate(r * 90 * Math.PI / 180), i.drawImage(s, -m - u, -v - g, u, g));
              break;
            case 3:
            case -1:
              this.full ? (f(d / this.scale, C / this.scale), m = m / this.scale + (u / this.scale - g / this.scale) / 2, v = v / this.scale + (g / this.scale - u / this.scale) / 2, i.rotate(r * 90 * Math.PI / 180), i.drawImage(
                s,
                -v - u / this.scale,
                m,
                u / this.scale,
                g / this.scale
              )) : (m = m + (u - g) / 2, v = v + (g - u) / 2, i.rotate(r * 90 * Math.PI / 180), i.drawImage(s, -v - u, m, u, g));
              break;
            default:
              this.full ? (f(d / this.scale, C / this.scale), i.drawImage(
                s,
                m / this.scale,
                v / this.scale,
                u / this.scale,
                g / this.scale
              )) : i.drawImage(s, m, v, u, g);
          }
          i.restore();
        } else {
          let p = o * this.scale, d = h * this.scale;
          switch (i.save(), r) {
            case 0:
              f(p, d), i.drawImage(s, 0, 0, p, d);
              break;
            case 1:
            case -3:
              f(d, p), i.rotate(r * 90 * Math.PI / 180), i.drawImage(s, 0, -d, p, d);
              break;
            case 2:
            case -2:
              f(p, d), i.rotate(r * 90 * Math.PI / 180), i.drawImage(s, -p, -d, p, d);
              break;
            case 3:
            case -1:
              f(d, p), i.rotate(r * 90 * Math.PI / 180), i.drawImage(s, -p, 0, p, d);
              break;
            default:
              f(p, d), i.drawImage(s, 0, 0, p, d);
          }
          i.restore();
        }
        t(e);
      };
      var c = this.img.substr(0, 4);
      c !== "data" && (s.crossOrigin = "Anonymous"), s.src = this.imgs;
      const l = this.fillColor;
      function f(p, d) {
        e.width = Math.round(p), e.height = Math.round(d), l && (i.fillStyle = l, i.fillRect(0, 0, e.width, e.height));
      }
    },
    // 获取转换成base64 的图片信息
    getCropData(t) {
      this.getCropChecked((e) => {
        t(e.toDataURL("image/" + this.outputType, this.outputSize));
      });
    },
    //canvas获取为blob对象
    getCropBlob(t) {
      this.getCropChecked((e) => {
        e.toBlob(
          (i) => t(i),
          "image/" + this.outputType,
          this.outputSize
        );
      });
    },
    // 自动预览函数
    showPreview() {
      if (this.isCanShow)
        this.isCanShow = false, setTimeout(() => {
          this.isCanShow = true;
        }, 16);
      else
        return false;
      let t = this.cropW, e = this.cropH, i = this.scale;
      var s = {};
      s.div = {
        width: `${t}px`,
        height: `${e}px`
      };
      let r = (this.x - this.cropOffsertX) / i, o = (this.y - this.cropOffsertY) / i, h = 0;
      s.w = t, s.h = e, s.url = this.imgs, s.img = {
        width: `${this.trueWidth}px`,
        height: `${this.trueHeight}px`,
        transform: `scale(${i})translate3d(${r}px, ${o}px, ${h}px)rotateZ(${this.rotate * 90}deg)`
      }, s.html = `
      <div class="show-preview" style="width: ${s.w}px; height: ${s.h}px,; overflow: hidden">
        <div style="width: ${t}px; height: ${e}px">
          <img src=${s.url} style="width: ${this.trueWidth}px; height: ${this.trueHeight}px; transform:
          scale(${i})translate3d(${r}px, ${o}px, ${h}px)rotateZ(${this.rotate * 90}deg)">
        </div>
      </div>`, this.$emit("real-time", s);
    },
    // reload 图片布局函数
    reload() {
      let t = new Image();
      t.onload = () => {
        this.w = parseFloat(window.getComputedStyle(this.$refs.cropper).width), this.h = parseFloat(window.getComputedStyle(this.$refs.cropper).height), this.trueWidth = t.width, this.trueHeight = t.height, this.original ? this.scale = 1 : this.scale = this.checkedMode(), this.$nextTick(() => {
          this.x = -(this.trueWidth - this.trueWidth * this.scale) / 2 + (this.w - this.trueWidth * this.scale) / 2, this.y = -(this.trueHeight - this.trueHeight * this.scale) / 2 + (this.h - this.trueHeight * this.scale) / 2, this.loading = false, this.autoCrop && this.goAutoCrop(), this.$emit("img-load", "success"), setTimeout(() => {
            this.showPreview();
          }, 20);
        });
      }, t.onerror = () => {
        this.$emit("img-load", "error");
      }, t.src = this.imgs;
    },
    // 背景布局的函数
    checkedMode() {
      let t = 1, e = this.trueWidth, i = this.trueHeight;
      const s = this.mode.split(" ");
      switch (s[0]) {
        case "contain":
          this.trueWidth > this.w && (t = this.w / this.trueWidth), this.trueHeight * t > this.h && (t = this.h / this.trueHeight);
          break;
        case "cover":
          e = this.w, t = e / this.trueWidth, i = i * t, i < this.h && (i = this.h, t = i / this.trueHeight);
          break;
        default:
          try {
            let r = s[0];
            if (r.search("px") !== -1) {
              r = r.replace("px", ""), e = parseFloat(r);
              const o = e / this.trueWidth;
              let h = 1, a = s[1];
              a.search("px") !== -1 && (a = a.replace("px", ""), i = parseFloat(a), h = i / this.trueHeight), t = Math.min(o, h);
            }
            if (r.search("%") !== -1 && (r = r.replace("%", ""), e = parseFloat(r) / 100 * this.w, t = e / this.trueWidth), s.length === 2 && r === "auto") {
              let o = s[1];
              o.search("px") !== -1 && (o = o.replace("px", ""), i = parseFloat(o), t = i / this.trueHeight), o.search("%") !== -1 && (o = o.replace("%", ""), i = parseFloat(o) / 100 * this.h, t = i / this.trueHeight);
            }
          } catch {
            t = 1;
          }
      }
      return t;
    },
    // 自动截图函数
    goAutoCrop(t, e) {
      if (this.imgs === "" || this.imgs === null)
        return;
      this.clearCrop(), this.cropping = true;
      let i = this.w, s = this.h;
      if (this.centerBox) {
        const h = Math.abs(this.rotate) % 2 > 0;
        let a = (h ? this.trueHeight : this.trueWidth) * this.scale, n = (h ? this.trueWidth : this.trueHeight) * this.scale;
        i = a < i ? a : i, s = n < s ? n : s;
      }
      var r = t || parseFloat(this.autoCropWidth), o = e || parseFloat(this.autoCropHeight);
      (r === 0 || o === 0) && (r = i * 0.8, o = s * 0.8), r = r > i ? i : r, o = o > s ? s : o, this.fixed && (o = r / this.fixedNumber[0] * this.fixedNumber[1]), o > this.h && (o = this.h, r = o / this.fixedNumber[1] * this.fixedNumber[0]), this.changeCrop(r, o);
    },
    // 手动改变截图框大小函数
    changeCrop(t, e) {
      if (this.centerBox) {
        let i = this.getImgAxis();
        t > i.x2 - i.x1 && (t = i.x2 - i.x1, e = t / this.fixedNumber[0] * this.fixedNumber[1]), e > i.y2 - i.y1 && (e = i.y2 - i.y1, t = e / this.fixedNumber[1] * this.fixedNumber[0]);
      }
      this.cropW = t, this.cropH = e, this.checkCropLimitSize(), this.$nextTick(() => {
        this.cropOffsertX = (this.w - this.cropW) / 2, this.cropOffsertY = (this.h - this.cropH) / 2, this.centerBox && this.moveCrop(null, true);
      });
    },
    // 重置函数， 恢复组件置初始状态
    refresh() {
      this.img, this.imgs = "", this.scale = 1, this.crop = false, this.rotate = 0, this.w = 0, this.h = 0, this.trueWidth = 0, this.trueHeight = 0, this.imgIsQqualCrop = false, this.clearCrop(), this.$nextTick(() => {
        this.checkedImg();
      });
    },
    // 向左边旋转
    rotateLeft() {
      this.rotate = this.rotate <= -3 ? 0 : this.rotate - 1;
    },
    // 向右边旋转
    rotateRight() {
      this.rotate = this.rotate >= 3 ? 0 : this.rotate + 1;
    },
    // 清除旋转
    rotateClear() {
      this.rotate = 0;
    },
    // 图片坐标点校验
    checkoutImgAxis(t, e, i) {
      t = t || this.x, e = e || this.y, i = i || this.scale;
      let s = true;
      if (this.centerBox) {
        let r = this.getImgAxis(t, e, i), o = this.getCropAxis();
        r.x1 >= o.x1 && (s = false), r.x2 <= o.x2 && (s = false), r.y1 >= o.y1 && (s = false), r.y2 <= o.y2 && (s = false), s || this.changeImgScale(r, o, i);
      }
      return s;
    },
    // 缩放图片，将图片坐标适配截图框坐标
    changeImgScale(t, e, i) {
      let s = this.trueWidth, r = this.trueHeight, o = s * i, h = r * i;
      if (o >= this.cropW && h >= this.cropH)
        this.scale = i;
      else {
        const a = this.cropW / s, n = this.cropH / r, c = this.cropH <= r * a ? a : n;
        this.scale = c, o = s * c, h = r * c;
      }
      this.imgIsQqualCrop || (t.x1 >= e.x1 && (this.isRotateRightOrLeft ? this.x = e.x1 - (s - o) / 2 - (o - h) / 2 : this.x = e.x1 - (s - o) / 2), t.x2 <= e.x2 && (this.isRotateRightOrLeft ? this.x = e.x1 - (s - o) / 2 - (o - h) / 2 - h + this.cropW : this.x = e.x2 - (s - o) / 2 - o), t.y1 >= e.y1 && (this.isRotateRightOrLeft ? this.y = e.y1 - (r - h) / 2 - (h - o) / 2 : this.y = e.y1 - (r - h) / 2), t.y2 <= e.y2 && (this.isRotateRightOrLeft ? this.y = e.y2 - (r - h) / 2 - (h - o) / 2 - o : this.y = e.y2 - (r - h) / 2 - h)), (o < this.cropW || h < this.cropH) && (this.imgIsQqualCrop = true);
    }
  },
  mounted() {
    this.support = "onwheel" in document.createElement("div") ? "wheel" : document.onmousewheel !== void 0 ? "mousewheel" : "DOMMouseScroll";
    let t = this;
    var e = navigator.userAgent;
    this.isIOS = !!e.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), HTMLCanvasElement.prototype.toBlob || Object.defineProperty(HTMLCanvasElement.prototype, "toBlob", {
      value: function(i, s, r) {
        for (var o = atob(this.toDataURL(s, r).split(",")[1]), h = o.length, a = new Uint8Array(h), n = 0; n < h; n++)
          a[n] = o.charCodeAt(n);
        i(new Blob([a], { type: t.type || "image/png" }));
      }
    }), this.showPreview(), this.checkedImg();
  },
  unmounted() {
    window.removeEventListener("mousemove", this.moveCrop), window.removeEventListener("mouseup", this.leaveCrop), window.removeEventListener("touchmove", this.moveCrop), window.removeEventListener("touchend", this.leaveCrop), this.cancelScale();
  }
}), A = {
  key: 0,
  class: "cropper-box"
}, B = ["src"], P = { class: "cropper-view-box" }, R = ["src"], D = { key: 1 };
function U(t, e, i, s, r, o) {
  return openBlock(), createElementBlock("div", {
    class: "vue-cropper",
    ref: "cropper",
    onMouseover: e[28] || (e[28] = (...h) => t.scaleImg && t.scaleImg(...h)),
    onMouseout: e[29] || (e[29] = (...h) => t.cancelScale && t.cancelScale(...h))
  }, [
    t.imgs ? (openBlock(), createElementBlock("div", A, [
      withDirectives(createBaseVNode("div", {
        class: "cropper-box-canvas",
        style: normalizeStyle({
          width: t.trueWidth + "px",
          height: t.trueHeight + "px",
          transform: "scale(" + t.scale + "," + t.scale + ") translate3d(" + t.x / t.scale + "px," + t.y / t.scale + "px,0)rotateZ(" + t.rotate * 90 + "deg)"
        })
      }, [
        createBaseVNode("img", {
          src: t.imgs,
          alt: "cropper-img",
          ref: "cropperImg"
        }, null, 8, B)
      ], 4), [
        [vShow, !t.loading]
      ])
    ])) : createCommentVNode("", true),
    createBaseVNode("div", {
      class: normalizeClass(["cropper-drag-box", { "cropper-move": t.move && !t.crop, "cropper-crop": t.crop, "cropper-modal": t.cropping }]),
      onMousedown: e[0] || (e[0] = (...h) => t.startMove && t.startMove(...h)),
      onTouchstart: e[1] || (e[1] = (...h) => t.startMove && t.startMove(...h))
    }, null, 34),
    withDirectives(createBaseVNode("div", {
      class: "cropper-crop-box",
      style: normalizeStyle({
        width: t.cropW + "px",
        height: t.cropH + "px",
        transform: "translate3d(" + t.cropOffsertX + "px," + t.cropOffsertY + "px,0)"
      })
    }, [
      createBaseVNode("span", P, [
        createBaseVNode("img", {
          style: normalizeStyle({
            width: t.trueWidth + "px",
            height: t.trueHeight + "px",
            transform: "scale(" + t.scale + "," + t.scale + ") translate3d(" + (t.x - t.cropOffsertX) / t.scale + "px," + (t.y - t.cropOffsertY) / t.scale + "px,0)rotateZ(" + t.rotate * 90 + "deg)"
          }),
          src: t.imgs,
          alt: "cropper-img"
        }, null, 12, R)
      ]),
      createBaseVNode("span", {
        class: "cropper-face cropper-move",
        onMousedown: e[2] || (e[2] = (...h) => t.cropMove && t.cropMove(...h)),
        onTouchstart: e[3] || (e[3] = (...h) => t.cropMove && t.cropMove(...h))
      }, null, 32),
      t.info ? (openBlock(), createElementBlock("span", {
        key: 0,
        class: "crop-info",
        style: normalizeStyle({ top: t.cropInfo.top })
      }, toDisplayString(t.cropInfo.width) + " × " + toDisplayString(t.cropInfo.height), 5)) : createCommentVNode("", true),
      t.fixedBox ? createCommentVNode("", true) : (openBlock(), createElementBlock("span", D, [
        createBaseVNode("span", {
          class: "crop-line line-w",
          onMousedown: e[4] || (e[4] = (h) => t.changeCropSize(h, false, true, 0, 1)),
          onTouchstart: e[5] || (e[5] = (h) => t.changeCropSize(h, false, true, 0, 1))
        }, null, 32),
        createBaseVNode("span", {
          class: "crop-line line-a",
          onMousedown: e[6] || (e[6] = (h) => t.changeCropSize(h, true, false, 1, 0)),
          onTouchstart: e[7] || (e[7] = (h) => t.changeCropSize(h, true, false, 1, 0))
        }, null, 32),
        createBaseVNode("span", {
          class: "crop-line line-s",
          onMousedown: e[8] || (e[8] = (h) => t.changeCropSize(h, false, true, 0, 2)),
          onTouchstart: e[9] || (e[9] = (h) => t.changeCropSize(h, false, true, 0, 2))
        }, null, 32),
        createBaseVNode("span", {
          class: "crop-line line-d",
          onMousedown: e[10] || (e[10] = (h) => t.changeCropSize(h, true, false, 2, 0)),
          onTouchstart: e[11] || (e[11] = (h) => t.changeCropSize(h, true, false, 2, 0))
        }, null, 32),
        createBaseVNode("span", {
          class: "crop-point point1",
          onMousedown: e[12] || (e[12] = (h) => t.changeCropSize(h, true, true, 1, 1)),
          onTouchstart: e[13] || (e[13] = (h) => t.changeCropSize(h, true, true, 1, 1))
        }, null, 32),
        createBaseVNode("span", {
          class: "crop-point point2",
          onMousedown: e[14] || (e[14] = (h) => t.changeCropSize(h, false, true, 0, 1)),
          onTouchstart: e[15] || (e[15] = (h) => t.changeCropSize(h, false, true, 0, 1))
        }, null, 32),
        createBaseVNode("span", {
          class: "crop-point point3",
          onMousedown: e[16] || (e[16] = (h) => t.changeCropSize(h, true, true, 2, 1)),
          onTouchstart: e[17] || (e[17] = (h) => t.changeCropSize(h, true, true, 2, 1))
        }, null, 32),
        createBaseVNode("span", {
          class: "crop-point point4",
          onMousedown: e[18] || (e[18] = (h) => t.changeCropSize(h, true, false, 1, 0)),
          onTouchstart: e[19] || (e[19] = (h) => t.changeCropSize(h, true, false, 1, 0))
        }, null, 32),
        createBaseVNode("span", {
          class: "crop-point point5",
          onMousedown: e[20] || (e[20] = (h) => t.changeCropSize(h, true, false, 2, 0)),
          onTouchstart: e[21] || (e[21] = (h) => t.changeCropSize(h, true, false, 2, 0))
        }, null, 32),
        createBaseVNode("span", {
          class: "crop-point point6",
          onMousedown: e[22] || (e[22] = (h) => t.changeCropSize(h, true, true, 1, 2)),
          onTouchstart: e[23] || (e[23] = (h) => t.changeCropSize(h, true, true, 1, 2))
        }, null, 32),
        createBaseVNode("span", {
          class: "crop-point point7",
          onMousedown: e[24] || (e[24] = (h) => t.changeCropSize(h, false, true, 0, 2)),
          onTouchstart: e[25] || (e[25] = (h) => t.changeCropSize(h, false, true, 0, 2))
        }, null, 32),
        createBaseVNode("span", {
          class: "crop-point point8",
          onMousedown: e[26] || (e[26] = (h) => t.changeCropSize(h, true, true, 2, 2)),
          onTouchstart: e[27] || (e[27] = (h) => t.changeCropSize(h, true, true, 2, 2))
        }, null, 32)
      ]))
    ], 4), [
      [vShow, t.cropping]
    ])
  ], 544);
}
const M = /* @__PURE__ */ $(z, [["render", U], ["__scopeId", "data-v-a742df44"]]);
const _hoisted_1 = { class: "content" };
const _hoisted_2 = { class: "canvas" };
const _hoisted_3 = { class: "view" };
const _hoisted_4 = { class: "preview" };
const _hoisted_5 = ["src"];
const _hoisted_6 = {
  class: "el-container",
  style: { "height": "38px" }
};
const _hoisted_7 = {
  class: "el-aside",
  style: { "width": "400px", "justify-content": "space-between", "align-items": "center", "display": "flex", "padding": "0 5px" }
};
const _hoisted_8 = {
  class: "el-main",
  style: { "text-align": "center" }
};
const _sfc_main = {
  __name: "AvatarCropper",
  emits: ["close", "success"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const state = reactive({
      show: true,
      src: ""
    });
    const cropper = ref("cropper");
    const option = reactive({
      img: "",
      size: 1,
      full: false,
      outputType: "png",
      canMove: true,
      fixedBox: true,
      original: false,
      canMoveBox: true,
      autoCrop: true,
      autoCropWidth: 250,
      autoCropHeight: 250,
      centerBox: false,
      high: true,
      preview: ""
    });
    const onMaskClick = () => {
      emit("close");
    };
    function onTriggerUpload() {
      document.getElementById("upload-avatar").click();
    }
    const onUpload = (e) => {
      let file = e.target.files[0];
      let reader = new FileReader();
      reader.onload = (e2) => {
        let data;
        if (typeof e2.target.result === "object") {
          data = window.URL.createObjectURL(new Blob([e2.target.result]));
        } else {
          data = e2.target.result;
        }
        option.img = data;
      };
      reader.readAsArrayBuffer(file);
    };
    const realTime = (data) => {
      cropper.value.getCropData((img) => {
        option.preview = img;
      });
    };
    const rotateLeft = () => {
      cropper.value.rotateLeft();
    };
    const rotateRight = () => {
      cropper.value.rotateRight();
    };
    const refreshCrop = () => {
      cropper.value.refresh();
    };
    const onSubmit = () => {
      cropper.value.getCropBlob(async (blob) => {
        const file = new File([blob], "avatar.png", {
          type: blob.type,
          lastModified: Date.now()
        });
        const { code, data } = await uploadFile(file);
        code == 200 && emit("success", data.src);
      });
    };
    return (_ctx, _cache) => {
      const _component_n_icon = NIcon;
      const _component_n_button = Button;
      const _component_n_card = __unplugin_components_2;
      const _component_n_modal = __unplugin_components_3;
      return openBlock(), createElementBlock(Fragment, null, [
        createBaseVNode("input", {
          id: "upload-avatar",
          type: "file",
          accept: "image/png, image/jpeg, image/jpg, image/webp",
          onChange: onUpload
        }, null, 32),
        createVNode(_component_n_modal, {
          show: state.show,
          "onUpdate:show": _cache[1] || (_cache[1] = ($event) => state.show = $event),
          "on-after-leave": onMaskClick
        }, {
          default: withCtx(() => [
            createVNode(_component_n_card, {
              style: { "width": "800px" },
              title: "选择头像",
              bordered: false,
              class: "modal-radius"
            }, {
              "header-extra": withCtx(() => [
                createVNode(_component_n_icon, {
                  size: "22",
                  component: unref(Close),
                  onClick: _cache[0] || (_cache[0] = ($event) => state.show = false),
                  class: "pointer"
                }, null, 8, ["component"])
              ]),
              footer: withCtx(() => [
                createBaseVNode("section", _hoisted_6, [
                  createBaseVNode("aside", _hoisted_7, [
                    createVNode(_component_n_button, {
                      onClick: onTriggerUpload,
                      type: "primary",
                      ghost: ""
                    }, {
                      icon: withCtx(() => [
                        createVNode(_component_n_icon, { component: unref(UploadOne) }, null, 8, ["component"])
                      ]),
                      default: withCtx(() => [
                        _cache[2] || (_cache[2] = createTextVNode(" 上传图片 ", -1))
                      ]),
                      _: 1,
                      __: [2]
                    }),
                    createVNode(_component_n_button, { onClick: refreshCrop }, {
                      icon: withCtx(() => [
                        createVNode(_component_n_icon, { component: unref(RefreshOne) }, null, 8, ["component"])
                      ]),
                      default: withCtx(() => [
                        _cache[3] || (_cache[3] = createTextVNode(" 重置 ", -1))
                      ]),
                      _: 1,
                      __: [3]
                    }),
                    createVNode(_component_n_button, { onClick: rotateLeft }, {
                      icon: withCtx(() => [
                        createVNode(_component_n_icon, { component: unref(Undo) }, null, 8, ["component"])
                      ]),
                      default: withCtx(() => [
                        _cache[4] || (_cache[4] = createTextVNode(" 左转 ", -1))
                      ]),
                      _: 1,
                      __: [4]
                    }),
                    createVNode(_component_n_button, { onClick: rotateRight }, {
                      icon: withCtx(() => [
                        createVNode(_component_n_icon, { component: unref(Redo) }, null, 8, ["component"])
                      ]),
                      default: withCtx(() => [
                        _cache[5] || (_cache[5] = createTextVNode(" 右转 ", -1))
                      ]),
                      _: 1,
                      __: [5]
                    })
                  ]),
                  createBaseVNode("main", _hoisted_8, [
                    createVNode(_component_n_button, {
                      type: "primary",
                      onClick: onSubmit
                    }, {
                      default: withCtx(() => _cache[6] || (_cache[6] = [
                        createTextVNode("保存头像", -1)
                      ])),
                      _: 1,
                      __: [6]
                    })
                  ])
                ])
              ]),
              default: withCtx(() => [
                createBaseVNode("div", _hoisted_1, [
                  createBaseVNode("div", _hoisted_2, [
                    createVNode(unref(M), {
                      ref_key: "cropper",
                      ref: cropper,
                      img: option.img,
                      "output-size": option.size,
                      "output-type": option.outputType,
                      info: true,
                      full: option.full,
                      "can-move": option.canMove,
                      "can-move-box": option.canMoveBox,
                      "fixed-box": option.fixedBox,
                      original: option.original,
                      "auto-crop": option.autoCrop,
                      "auto-crop-width": option.autoCropWidth,
                      "auto-crop-height": option.autoCropHeight,
                      "center-box": option.centerBox,
                      onRealTime: realTime
                    }, null, 8, ["img", "output-size", "output-type", "full", "can-move", "can-move-box", "fixed-box", "original", "auto-crop", "auto-crop-width", "auto-crop-height", "center-box"])
                  ]),
                  createBaseVNode("div", _hoisted_3, [
                    createBaseVNode("div", _hoisted_4, [
                      withDirectives(createBaseVNode("img", {
                        src: option.preview
                      }, null, 8, _hoisted_5), [
                        [vShow, option.preview]
                      ])
                    ])
                  ])
                ])
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 8, ["show"])
      ], 64);
    };
  }
};
const AvatarCropper = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4e37eda6"]]);
export {
  AvatarCropper as A
};
