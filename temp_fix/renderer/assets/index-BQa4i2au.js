import { t as defineComponent, u as h, aW as Scrollbar$1, a1 as ref, y as useTheme, C as createIpcApi, aX as getToken, D as defineStore, I as IconWrapper, H as createVNode, W as _export_sfc, L as createElementBlock, U as openBlock, aY as createStaticVNode, a4 as reactive, a2 as onMounted, a5 as createBlock, a6 as __unplugin_components_3, O as unref, ad as isRef, T as withCtx, M as createBaseVNode, ac as normalizeClass, N as NIcon, F as Fragment, a9 as renderList, R as toDisplayString, P as withDirectives, Q as vShow, a8 as createCommentVNode, V as createTextVNode, aa as Button, aZ as withKeys, aD as resolveDirective, aL as withModifiers, ah as watch, z as computed, a_ as vModelText, a7 as __unplugin_components_1, a$ as uploadAnnex, au as useSettingsStore, ae as uploadFile, _ as __unplugin_components_3$1, aV as resolveDynamicComponent } from "./index-CP-MMhae.js";
import { _ as __unplugin_components_0 } from "./Image-BdM5UzkZ.js";
import { N as NEmpty } from "./Empty-DXO3k6Nm.js";
import { U as Undo } from "./Undo-DAYaSkZ9.js";
import { I as IconDelete } from "./Delete-BuJN8hI8.js";
import { u as useCommonContextMenu, F as FolderUpload, _ as __unplugin_components_4, H as History, S as Share } from "./useCommonContextMenu-wWltracD.js";
import { P as Plus } from "./Plus-DQPyk9lQ.js";
import { _ as __unplugin_components_2 } from "./Dropdown-BaOl703U.js";
import { d as debounce } from "./common-CbVb2jfY.js";
import { u as useInject } from "./useInject-KwKquBHc.js";
import { S as Search } from "./Search-ywW15yaZ.js";
import { M as MdPreview, E as Editor } from "./index-iKnyGKVZ.js";
import { f as fileFormatSize } from "./string-g9b8veVd.js";
import { c as getFileNameSuffix, e as downloadBlobFile } from "./file-DJ5u2-kO.js";
import { U as UploadOne } from "./UploadOne-CHKc3agb.js";
import { N as NTooltip } from "./Tooltip-BadUcq2V.js";
import { _ as __unplugin_components_2$1 } from "./Popselect-t8R6dlXg.js";
import "./use-locale-sP6dOhdq.js";
import "./download-DwbQunhL.js";
import "./index-88uWzgFD.js";
import "./Input-9scKSWkl.js";
import "./SendOne-Ck-Fsq0E.js";
import "./FocusDetector-ChBbaXut.js";
import "./VirtualList-B9WzfpoZ.js";
const scrollbarProps = Object.assign(Object.assign({}, useTheme.props), {
  trigger: String,
  xScrollable: Boolean,
  onScroll: Function,
  contentClass: String,
  contentStyle: [Object, String],
  size: Number,
  yPlacement: {
    type: String,
    default: "right"
  },
  xPlacement: {
    type: String,
    default: "bottom"
  }
});
const Scrollbar = defineComponent({
  name: "Scrollbar",
  props: scrollbarProps,
  setup() {
    const scrollbarInstRef = ref(null);
    const exposedMethods = {
      scrollTo: (...args) => {
        var _a;
        (_a = scrollbarInstRef.value) === null || _a === void 0 ? void 0 : _a.scrollTo(args[0], args[1]);
      },
      scrollBy: (...args) => {
        var _a;
        (_a = scrollbarInstRef.value) === null || _a === void 0 ? void 0 : _a.scrollBy(args[0], args[1]);
      }
    };
    return Object.assign(Object.assign({}, exposedMethods), {
      scrollbarInstRef
    });
  },
  render() {
    return h(Scrollbar$1, Object.assign({
      ref: "scrollbarInstRef"
    }, this.$props), this.$slots);
  }
});
const ServArticleList = createIpcApi("/api/v1/article/list");
const ServArticleEdit = createIpcApi("/api/v1/article/editor");
const ServArticleDelete = createIpcApi("/api/v1/article/delete");
const ServArticleForeverDelete = createIpcApi("/api/v1/article/forever-delete");
const ServArticleRecycleList = createIpcApi("/api/v1/article/recycle-list");
const ServArticleRecoverDelete = createIpcApi("/api/v1/article/recover-delete");
const ServArticleCollect = createIpcApi("/api/v1/article/collect");
const ServArticleDetail = createIpcApi("/api/v1/article/detail");
const ServArticleMoveClassify = createIpcApi("/api/v1/article/move-classify");
const ServArticleClassifyList = createIpcApi("/api/v1/article/classify/list");
const ServArticleClassifyCreate = createIpcApi("/api/v1/article/classify/create");
const ServArticleClassifyUpdate = createIpcApi("/api/v1/article/classify/update");
const ServArticleClassifyDelete = createIpcApi("/api/v1/article/classify/delete");
const ServArticleAnnexDelete = createIpcApi("/api/v1/article/annex/delete");
const ServArticleAnnexForeverDelete = createIpcApi("/api/v1/article/annex/forever-delete");
const ServArticleAnnexRecover = createIpcApi("/api/v1/article/annex/recover");
const ServArticleAnnexRecycleList = createIpcApi("/api/v1/article/annex/recycle-list");
const ServeDownloadAnnex = (annex_id) => {
  const api = "http://175.178.158.23:9503";
  try {
    const link = document.createElement("a");
    link.href = `${api}/api/v1/article/annex/download?annex_id=${annex_id}&token=${getToken()}`;
    link.click();
  } catch (e) {
    console.error(e);
  }
};
const useNoteStore = defineStore("note", {
  state: () => {
    return {
      class: [],
      notes: {
        loadStatus: 0,
        params: { keyword: "", find_type: 1, classify_id: 0, tag_id: 0 },
        items: []
      },
      view: {
        editorMode: "preview",
        loadId: 0,
        loadStatus: 0
      },
      detail: {
        article_id: 0,
        classify_id: 0,
        title: "",
        is_asterisk: 0,
        status: 1,
        tag_ids: [],
        annex_list: [],
        md_content: "",
        created_at: "",
        class_name: "",
        updated_at: ""
      }
    };
  },
  actions: {
    close() {
      this.view.loadId = 0;
    },
    addNewNote(class_id = 0) {
      this.detail = {
        classify_id: class_id,
        class_name: "",
        created_at: "",
        annex_list: [],
        article_id: 0,
        is_asterisk: 2,
        md_content: "",
        status: 1,
        tag_ids: [],
        title: "",
        updated_at: ""
      };
      this.view.loadId = 1;
      this.view.loadStatus = 1;
      this.setEditorMode("edit");
      this.loadClass();
    },
    async loadClass() {
      const { code, data } = await ServArticleClassifyList();
      if (code != 200) return;
      this.class = data.items;
    },
    async loadNoteList(params = {}, isReset = true) {
      if (isReset) {
        Object.assign(this.notes.params, { keyword: "", find_type: 1, classify_id: 0 }, params);
      } else {
        Object.assign(this.notes.params, params);
      }
      this.notes.loadStatus = 0;
      this.notes.items = [];
      const { code, data } = await ServArticleList({ ...this.notes.params });
      if (code != 200) return;
      this.notes.items = data.items;
      this.notes.loadStatus = 1;
    },
    updateNoteItem(id, params = {}) {
      const item = this.notes.items.find((item2) => item2.article_id == id);
      item && Object.assign(item, params);
    },
    // 加载详情信息
    async loadDetail(articleId) {
      this.view.loadId = articleId;
      this.view.loadStatus = 0;
      this.setEditorMode("preview");
      const { code, data } = await ServArticleDetail({ article_id: articleId });
      if (code != 200 || data.article_id != this.view.loadId) return;
      this.view.loadStatus = 1;
      this.detail = data;
      const node = this.class.find((item) => item.id == data.classify_id);
      if (node) {
        this.detail.class_name = node.class_name || "默认分类";
      }
    },
    // 修改编辑模式
    setEditorMode(value) {
      this.view.editorMode = value;
    },
    // 修改收藏状态
    setCollectionStatus(isTrue) {
      this.detail.is_asterisk = isTrue ? 1 : 0;
    },
    // 编辑分类
    async editClass(classifyId, name) {
      if (classifyId === 0) {
        const { code: code2, data } = await ServArticleClassifyCreate({ name });
        if (code2 != 200) return;
        return this.class.unshift({
          id: data.classify_id,
          class_name: name,
          count: 0,
          is_default: 2
        });
      }
      const { code } = await ServArticleClassifyUpdate({ classify_id: classifyId, name });
      if (code != 200) return;
      const item = this.class.find((item2) => item2.id === classifyId);
      item && Object.assign(item, { class_name: name });
    },
    async deleteClass(classify_id) {
      const { code } = await ServArticleClassifyDelete({ classify_id });
      if (code != 200) return;
      const index = this.class.findIndex((item) => item.id === classify_id);
      index >= 0 && this.class.splice(index, 1);
    }
  }
});
const ApplicationTwo = IconWrapper("application-two", false, function(props) {
  return createVNode("svg", {
    "width": props.size,
    "height": props.size,
    "viewBox": "0 0 48 48",
    "fill": "none"
  }, [createVNode("circle", {
    "cx": "34.5",
    "cy": "13.5",
    "r": "6.5",
    "fill": props.colors[1],
    "stroke": props.colors[0],
    "stroke-width": props.strokeWidth
  }, null), createVNode("circle", {
    "cx": "34.5",
    "cy": "34.5",
    "r": "6.5",
    "fill": props.colors[1],
    "stroke": props.colors[0],
    "stroke-width": props.strokeWidth
  }, null), createVNode("circle", {
    "cx": "13.5",
    "cy": "13.5",
    "r": "6.5",
    "fill": props.colors[1],
    "stroke": props.colors[0],
    "stroke-width": props.strokeWidth
  }, null), createVNode("circle", {
    "cx": "13.5",
    "cy": "34.5",
    "r": "6.5",
    "fill": props.colors[1],
    "stroke": props.colors[0],
    "stroke-width": props.strokeWidth
  }, null)]);
});
const CalendarThirty = IconWrapper("calendar-thirty", true, function(props) {
  return createVNode("svg", {
    "width": props.size,
    "height": props.size,
    "viewBox": "0 0 48 48",
    "fill": "none"
  }, [createVNode("rect", {
    "x": "4",
    "y": "4",
    "width": "40",
    "height": "40",
    "rx": "2",
    "fill": props.colors[1],
    "stroke": props.colors[0],
    "stroke-width": props.strokeWidth,
    "stroke-linecap": props.strokeLinecap,
    "stroke-linejoin": props.strokeLinejoin
  }, null), createVNode("path", {
    "d": "M4 14H44",
    "stroke": props.colors[2],
    "stroke-width": props.strokeWidth,
    "stroke-linecap": props.strokeLinecap,
    "stroke-linejoin": props.strokeLinejoin
  }, null), createVNode("line", {
    "x1": "4",
    "y1": "11",
    "x2": "4",
    "y2": "23",
    "stroke": props.colors[0],
    "stroke-width": props.strokeWidth,
    "stroke-linecap": props.strokeLinecap,
    "stroke-linejoin": props.strokeLinejoin
  }, null), createVNode("line", {
    "x1": "44",
    "y1": "11",
    "x2": "44",
    "y2": "23",
    "stroke": props.colors[0],
    "stroke-width": props.strokeWidth,
    "stroke-linecap": props.strokeLinecap,
    "stroke-linejoin": props.strokeLinejoin
  }, null), createVNode("path", {
    "fill-rule": "evenodd",
    "clip-rule": "evenodd",
    "d": "M28 22V36H36V22H28Z",
    "stroke": props.colors[2],
    "stroke-width": props.strokeWidth,
    "stroke-linecap": props.strokeLinecap,
    "stroke-linejoin": props.strokeLinejoin
  }, null), createVNode("path", {
    "d": "M12 22H20V36H12",
    "stroke": props.colors[2],
    "stroke-width": props.strokeWidth,
    "stroke-linecap": props.strokeLinecap,
    "stroke-linejoin": props.strokeLinejoin
  }, null), createVNode("path", {
    "d": "M20 29H14",
    "stroke": props.colors[2],
    "stroke-width": props.strokeWidth,
    "stroke-linecap": props.strokeLinecap,
    "stroke-linejoin": props.strokeLinejoin
  }, null)]);
});
const CategoryManagement = IconWrapper("category-management", true, function(props) {
  return createVNode("svg", {
    "width": props.size,
    "height": props.size,
    "viewBox": "0 0 48 48",
    "fill": "none"
  }, [createVNode("rect", {
    "x": "6",
    "y": "28",
    "width": "36",
    "height": "14",
    "rx": "4",
    "stroke": props.colors[0],
    "stroke-width": props.strokeWidth
  }, null), createVNode("path", {
    "d": "M20 7H10C7.79086 7 6 8.79086 6 11V17C6 19.2091 7.79086 21 10 21H20",
    "stroke": props.colors[0],
    "stroke-width": props.strokeWidth,
    "stroke-linecap": props.strokeLinecap
  }, null), createVNode("circle", {
    "cx": "34",
    "cy": "14",
    "r": "8",
    "fill": props.colors[1],
    "stroke": props.colors[0],
    "stroke-width": props.strokeWidth
  }, null), createVNode("circle", {
    "cx": "34",
    "cy": "14",
    "r": "3",
    "fill": props.colors[2]
  }, null)]);
});
const Comments = IconWrapper("comments", true, function(props) {
  return createVNode("svg", {
    "width": props.size,
    "height": props.size,
    "viewBox": "0 0 48 48",
    "fill": "none"
  }, [createVNode("path", {
    "d": "M33 38H22V30H36V22H44V38H39L36 41L33 38Z",
    "stroke": props.colors[0],
    "stroke-width": props.strokeWidth,
    "stroke-linecap": props.strokeLinecap,
    "stroke-linejoin": props.strokeLinejoin
  }, null), createVNode("path", {
    "d": "M4 6H36V30H17L13 34L9 30H4V6Z",
    "fill": props.colors[1],
    "stroke": props.colors[0],
    "stroke-width": props.strokeWidth,
    "stroke-linecap": props.strokeLinecap,
    "stroke-linejoin": props.strokeLinejoin
  }, null), createVNode("path", {
    "d": "M12 22H18",
    "stroke": props.colors[2],
    "stroke-width": props.strokeWidth,
    "stroke-linecap": props.strokeLinecap
  }, null), createVNode("path", {
    "d": "M12 14H24",
    "stroke": props.colors[2],
    "stroke-width": props.strokeWidth,
    "stroke-linecap": props.strokeLinecap
  }, null)]);
});
const Down = IconWrapper("down", false, function(props) {
  return createVNode("svg", {
    "width": props.size,
    "height": props.size,
    "viewBox": "0 0 48 48",
    "fill": "none"
  }, [createVNode("path", {
    "d": "M36 18L24 30L12 18",
    "stroke": props.colors[0],
    "stroke-width": props.strokeWidth,
    "stroke-linecap": props.strokeLinecap,
    "stroke-linejoin": props.strokeLinejoin
  }, null)]);
});
const DownloadFour = IconWrapper("download-four", false, function(props) {
  return createVNode("svg", {
    "width": props.size,
    "height": props.size,
    "viewBox": "0 0 48 48",
    "fill": "none"
  }, [createVNode("path", {
    "fill-rule": "evenodd",
    "clip-rule": "evenodd",
    "d": "M23.9999 29.0001L12 17.0001L19.9999 17.0001L19.9999 6.00011L27.9999 6.00011L27.9999 17.0001L35.9999 17.0001L23.9999 29.0001Z",
    "fill": props.colors[1],
    "stroke": props.colors[0],
    "stroke-width": props.strokeWidth,
    "stroke-linecap": props.strokeLinecap,
    "stroke-linejoin": props.strokeLinejoin
  }, null), createVNode("path", {
    "d": "M42 37L6 37",
    "stroke": props.colors[0],
    "stroke-width": props.strokeWidth,
    "stroke-linecap": props.strokeLinecap
  }, null), createVNode("path", {
    "d": "M34 44H14",
    "stroke": props.colors[0],
    "stroke-width": props.strokeWidth,
    "stroke-linecap": props.strokeLinecap
  }, null)]);
});
const EditOne = IconWrapper("edit-one", true, function(props) {
  return createVNode("svg", {
    "width": props.size,
    "height": props.size,
    "viewBox": "0 0 48 48",
    "fill": "none"
  }, [createVNode("path", {
    "d": "M29 4H9C7.89543 4 7 4.89543 7 6V42C7 43.1046 7.89543 44 9 44H37C38.1046 44 39 43.1046 39 42V20.0046",
    "stroke": props.colors[0],
    "stroke-width": props.strokeWidth,
    "stroke-linecap": props.strokeLinecap,
    "stroke-linejoin": props.strokeLinejoin
  }, null), createVNode("path", {
    "d": "M13 18H21",
    "stroke": props.colors[0],
    "stroke-width": props.strokeWidth,
    "stroke-linecap": props.strokeLinecap
  }, null), createVNode("path", {
    "d": "M13 28H25",
    "stroke": props.colors[0],
    "stroke-width": props.strokeWidth,
    "stroke-linecap": props.strokeLinecap
  }, null), createVNode("path", {
    "d": "M40.9991 6.00098L29.0044 17.9958",
    "stroke": props.colors[0],
    "stroke-width": props.strokeWidth,
    "stroke-linecap": props.strokeLinecap,
    "stroke-linejoin": props.strokeLinejoin
  }, null)]);
});
const SortAmountDown = IconWrapper("sort-amount-down", true, function(props) {
  return createVNode("svg", {
    "width": props.size,
    "height": props.size,
    "viewBox": "0 0 48 48",
    "fill": "none"
  }, [createVNode("path", {
    "d": "M23 8H43",
    "stroke": props.colors[0],
    "stroke-width": props.strokeWidth,
    "stroke-linecap": props.strokeLinecap,
    "stroke-linejoin": props.strokeLinejoin
  }, null), createVNode("path", {
    "d": "M14 41L6 33",
    "stroke": props.colors[0],
    "stroke-width": props.strokeWidth,
    "stroke-linecap": props.strokeLinecap,
    "stroke-linejoin": props.strokeLinejoin
  }, null), createVNode("path", {
    "d": "M14 7V41",
    "stroke": props.colors[0],
    "stroke-width": props.strokeWidth,
    "stroke-linecap": props.strokeLinecap,
    "stroke-linejoin": props.strokeLinejoin
  }, null), createVNode("path", {
    "d": "M23 18H39",
    "stroke": props.colors[0],
    "stroke-width": props.strokeWidth,
    "stroke-linecap": props.strokeLinecap,
    "stroke-linejoin": props.strokeLinejoin
  }, null), createVNode("path", {
    "d": "M23 28H35",
    "stroke": props.colors[0],
    "stroke-width": props.strokeWidth,
    "stroke-linecap": props.strokeLinecap,
    "stroke-linejoin": props.strokeLinejoin
  }, null), createVNode("path", {
    "d": "M23 38H31",
    "stroke": props.colors[0],
    "stroke-width": props.strokeWidth,
    "stroke-linecap": props.strokeLinecap,
    "stroke-linejoin": props.strokeLinejoin
  }, null)]);
});
const IconStar = IconWrapper("star", false, function(props) {
  return createVNode("svg", {
    "width": props.size,
    "height": props.size,
    "viewBox": "0 0 48 48",
    "fill": "none"
  }, [createVNode("path", {
    "d": "M23.9986 5L17.8856 17.4776L4 19.4911L14.0589 29.3251L11.6544 43L23.9986 36.4192L36.3454 43L33.9586 29.3251L44 19.4911L30.1913 17.4776L23.9986 5Z",
    "fill": props.colors[1],
    "stroke": props.colors[0],
    "stroke-width": props.strokeWidth,
    "stroke-linejoin": props.strokeLinejoin
  }, null)]);
});
const TextMessage = IconWrapper("text-message", true, function(props) {
  return createVNode("svg", {
    "width": props.size,
    "height": props.size,
    "viewBox": "0 0 48 48",
    "fill": "none"
  }, [createVNode("path", {
    "d": "M44 7H4V37H19L24 42L29 37H44V7Z",
    "fill": props.colors[1],
    "stroke": props.colors[0],
    "stroke-width": props.strokeWidth,
    "stroke-linecap": props.strokeLinecap,
    "stroke-linejoin": props.strokeLinejoin
  }, null), createVNode("path", {
    "d": "M14 16H20",
    "stroke": props.colors[2],
    "stroke-width": props.strokeWidth,
    "stroke-linecap": props.strokeLinecap
  }, null), createVNode("path", {
    "d": "M14 24H16",
    "stroke": props.colors[2],
    "stroke-width": props.strokeWidth,
    "stroke-linecap": props.strokeLinecap
  }, null), createVNode("path", {
    "d": "M29 14L36 28",
    "stroke": props.colors[2],
    "stroke-width": props.strokeWidth,
    "stroke-linecap": props.strokeLinecap
  }, null), createVNode("path", {
    "d": "M28.9998 13.9998L21.9998 27.9998",
    "stroke": props.colors[2],
    "stroke-width": props.strokeWidth,
    "stroke-linecap": props.strokeLinecap
  }, null), createVNode("path", {
    "d": "M24 24H34",
    "stroke": props.colors[2],
    "stroke-width": props.strokeWidth,
    "stroke-linecap": props.strokeLinecap
  }, null)]);
});
const Time = IconWrapper("time", true, function(props) {
  return createVNode("svg", {
    "width": props.size,
    "height": props.size,
    "viewBox": "0 0 48 48",
    "fill": "none"
  }, [createVNode("path", {
    "d": "M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z",
    "fill": props.colors[1],
    "stroke": props.colors[0],
    "stroke-width": props.strokeWidth,
    "stroke-linejoin": props.strokeLinejoin
  }, null), createVNode("path", {
    "d": "M24.0084 12.0001L24.0072 24.0089L32.4866 32.4883",
    "stroke": props.colors[2],
    "stroke-width": props.strokeWidth,
    "stroke-linecap": props.strokeLinecap,
    "stroke-linejoin": props.strokeLinejoin
  }, null)]);
});
const ToBottom = IconWrapper("to-bottom", false, function(props) {
  return createVNode("svg", {
    "width": props.size,
    "height": props.size,
    "viewBox": "0 0 48 48",
    "fill": "none"
  }, [createVNode("path", {
    "d": "M24.0083 33.8995V6",
    "stroke": props.colors[0],
    "stroke-width": props.strokeWidth,
    "stroke-linecap": props.strokeLinecap,
    "stroke-linejoin": props.strokeLinejoin
  }, null), createVNode("path", {
    "d": "M36 22L24 34L12 22",
    "stroke": props.colors[0],
    "stroke-width": props.strokeWidth,
    "stroke-linecap": props.strokeLinecap,
    "stroke-linejoin": props.strokeLinejoin
  }, null), createVNode("path", {
    "d": "M36 42H12",
    "stroke": props.colors[0],
    "stroke-width": props.strokeWidth,
    "stroke-linecap": props.strokeLinecap,
    "stroke-linejoin": props.strokeLinejoin
  }, null)]);
});
const _sfc_main$7 = {};
const _hoisted_1$7 = { class: "loading-content" };
function _sfc_render$1(_ctx, _cache) {
  return openBlock(), createElementBlock("div", _hoisted_1$7, _cache[0] || (_cache[0] = [
    createStaticVNode('<div class="ant-spin ant-spin-lg ant-spin-spinning" data-v-e4a49ed6><span class="ant-spin-dot ant-spin-dot-spin" data-v-e4a49ed6><i class="ant-spin-dot-item" data-v-e4a49ed6></i><i class="ant-spin-dot-item" data-v-e4a49ed6></i><i class="ant-spin-dot-item" data-v-e4a49ed6></i><i class="ant-spin-dot-item" data-v-e4a49ed6></i></span></div><p data-v-e4a49ed6>数据加载中...</p>', 2)
  ]));
}
const Loading = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$1], ["__scopeId", "data-v-e4a49ed6"]]);
const _hoisted_1$6 = { class: "main-box el-container is-vertical o-hidden" };
const _hoisted_2$5 = {
  class: "el-header border-bottom header",
  style: { "height": "50px" }
};
const _hoisted_3$5 = { class: "type-items" };
const _hoisted_4$5 = { style: { "display": "flex", "align-items": "center" } };
const _hoisted_5$4 = { class: "at-header" };
const _hoisted_6$4 = { class: "at-name" };
const _hoisted_7$4 = { class: "text-ellipsis" };
const _hoisted_8$4 = { class: "at-tool" };
const _hoisted_9$3 = { class: "tip" };
const _hoisted_10$3 = { class: "icons" };
const _hoisted_11$2 = { class: "at-body pointer" };
const _hoisted_12$2 = { class: "content" };
const _hoisted_13$1 = { class: "datetime" };
const _hoisted_14 = { class: "abstract" };
const _hoisted_15 = { class: "image" };
const _hoisted_16 = { class: "at-header" };
const _hoisted_17 = { class: "at-name" };
const _hoisted_18 = { class: "text-ellipsis" };
const _hoisted_19 = { class: "at-tool" };
const _hoisted_20 = { class: "tip" };
const _hoisted_21 = { class: "icons" };
const _hoisted_22 = { class: "at-body pointer" };
const _hoisted_23 = { class: "content" };
const _hoisted_24 = { class: "abstract" };
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "RecycleModal",
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const isShow = ref(true);
    const state = reactive({
      note: {
        loading: false,
        items: []
      },
      annex: {
        loading: false,
        items: []
      }
    });
    const tabIndex = ref(1);
    const onMaskClick = () => {
      emit("close");
    };
    const triggerType = (index) => {
      tabIndex.value = index;
    };
    const loadNoteList = async () => {
      state.note.loading = true;
      const { code, data } = await ServArticleRecycleList();
      state.note.loading = false;
      if (code != 200) return;
      state.note.items = data.items;
    };
    const loadAnnexList = async () => {
      state.annex.loading = true;
      const { code, data } = await ServArticleAnnexRecycleList();
      state.annex.loading = false;
      if (code != 200) return;
      state.annex.items = data.items;
    };
    const onDeleteArticle = async (index, article_id) => {
      const { code } = await ServArticleForeverDelete({ article_id });
      if (code != 200) return;
      state.note.items.splice(index, 1);
    };
    const onRecoverArticle = async (index, article_id) => {
      const { code } = await ServArticleRecoverDelete({ article_id });
      if (code != 200) return;
      state.note.items.splice(index, 1);
    };
    const onRecoverAnnex = async (index, annex_id) => {
      const { code } = await ServArticleAnnexRecover({ annex_id });
      if (code != 200) return;
      state.annex.items.splice(index, 1);
    };
    const onDeleteAnnex = async (index, annex_id) => {
      const { code } = await ServArticleAnnexForeverDelete({ annex_id });
      if (code != 200) return;
      state.annex.items.splice(index, 1);
    };
    onMounted(() => {
      loadNoteList();
      loadAnnexList();
    });
    return (_ctx, _cache) => {
      const _component_n_icon = NIcon;
      const _component_n_empty = NEmpty;
      const _component_n_image = __unplugin_components_0;
      const _component_n_modal = __unplugin_components_3;
      return openBlock(), createBlock(_component_n_modal, {
        show: unref(isShow),
        "onUpdate:show": _cache[2] || (_cache[2] = ($event) => isRef(isShow) ? isShow.value = $event : null),
        preset: "card",
        title: "回收站管理",
        class: "modal-radius",
        style: { "max-width": "750px" },
        "on-after-leave": onMaskClick,
        segmented: {
          content: true
        },
        "header-style": {
          padding: "20px 15px"
        },
        "content-style": {
          padding: 0
        }
      }, {
        default: withCtx(() => [
          createBaseVNode("section", _hoisted_1$6, [
            createBaseVNode("header", _hoisted_2$5, [
              createBaseVNode("div", _hoisted_3$5, [
                createBaseVNode("span", {
                  class: normalizeClass({ active: unref(tabIndex) == 1 }),
                  onClick: _cache[0] || (_cache[0] = ($event) => triggerType(1))
                }, " 笔记列表 ", 2),
                createBaseVNode("span", {
                  class: normalizeClass({ active: unref(tabIndex) == 2 }),
                  onClick: _cache[1] || (_cache[1] = ($event) => triggerType(2))
                }, " 附件列表 ", 2)
              ]),
              createBaseVNode("div", _hoisted_4$5, [
                createVNode(_component_n_icon, {
                  size: 20,
                  class: "pointer",
                  component: unref(CalendarThirty)
                }, null, 8, ["component"])
              ])
            ]),
            unref(tabIndex) == 1 ? (openBlock(), createElementBlock("main", {
              key: 0,
              class: normalizeClass(["el-main me-scrollbar me-scrollbar-thumb", {
                "flex-center": unref(state).note.items.length == 0,
                "main-bag": unref(state).note.items.length > 0
              }])
            }, [
              unref(state).note.loading ? (openBlock(), createBlock(Loading, { key: 0 })) : unref(state).note.items.length === 0 ? (openBlock(), createBlock(_component_n_empty, {
                key: 1,
                description: "暂无相关数据"
              })) : (openBlock(true), createElementBlock(Fragment, { key: 2 }, renderList(unref(state).note.items, (note, index) => {
                return openBlock(), createElementBlock("div", {
                  class: "article",
                  key: note.article_id
                }, [
                  createBaseVNode("div", _hoisted_5$4, [
                    createBaseVNode("div", _hoisted_6$4, [
                      createBaseVNode("span", _hoisted_7$4, toDisplayString(note.title), 1)
                    ]),
                    createBaseVNode("div", _hoisted_8$4, [
                      createBaseVNode("div", _hoisted_9$3, "剩余" + toDisplayString(note.day) + "天", 1),
                      createBaseVNode("div", _hoisted_10$3, [
                        createVNode(_component_n_icon, {
                          size: 18,
                          color: "#03a9f4",
                          class: "pointer",
                          component: unref(Undo),
                          onClick: ($event) => onRecoverArticle(index, note.article_id)
                        }, null, 8, ["component", "onClick"]),
                        createVNode(_component_n_icon, {
                          size: 18,
                          color: "red",
                          class: "pointer",
                          component: unref(IconDelete),
                          onClick: ($event) => onDeleteArticle(index, note.article_id)
                        }, null, 8, ["component", "onClick"])
                      ])
                    ])
                  ]),
                  createBaseVNode("div", _hoisted_11$2, [
                    createBaseVNode("div", _hoisted_12$2, [
                      createBaseVNode("div", _hoisted_13$1, [
                        createBaseVNode("span", null, toDisplayString(note.created_at.substr(0, 10)), 1),
                        createBaseVNode("span", null, toDisplayString(note.classify_name), 1)
                      ]),
                      createBaseVNode("div", _hoisted_14, toDisplayString(note.abstract.replace(/[\r\n]/g, "").replace(/(<([^>]+)>)/gi, "")), 1)
                    ]),
                    withDirectives(createBaseVNode("div", _hoisted_15, [
                      createVNode(_component_n_image, {
                        width: "56",
                        height: "56",
                        "preview-disabled": "",
                        style: { "border-radius": "2px" },
                        src: note.image
                      }, null, 8, ["src"])
                    ], 512), [
                      [vShow, note.image]
                    ])
                  ])
                ]);
              }), 128))
            ], 2)) : (openBlock(), createElementBlock("main", {
              key: 1,
              class: normalizeClass(["el-main me-scrollbar", {
                "flex-center": unref(state).annex.items.length == 0,
                "main-bag": unref(state).annex.items.length > 0
              }])
            }, [
              unref(state).annex.loading ? (openBlock(), createBlock(Loading, { key: 0 })) : unref(state).annex.items.length == 0 ? (openBlock(), createBlock(_component_n_empty, {
                key: 1,
                description: "暂无相关数据"
              })) : (openBlock(true), createElementBlock(Fragment, { key: 2 }, renderList(unref(state).annex.items, (annex, index) => {
                return openBlock(), createElementBlock("div", {
                  class: "article",
                  key: annex.annex_id
                }, [
                  createBaseVNode("div", _hoisted_16, [
                    createBaseVNode("div", _hoisted_17, [
                      createBaseVNode("span", _hoisted_18, toDisplayString(annex.annex_name), 1)
                    ]),
                    createBaseVNode("div", _hoisted_19, [
                      createBaseVNode("div", _hoisted_20, "剩余" + toDisplayString(annex.day) + "天", 1),
                      createBaseVNode("div", _hoisted_21, [
                        createVNode(_component_n_icon, {
                          size: 18,
                          color: "#03a9f4",
                          class: "pointer",
                          component: unref(ToBottom),
                          onClick: ($event) => unref(ServeDownloadAnnex)(annex.annex_id)
                        }, null, 8, ["component", "onClick"]),
                        createVNode(_component_n_icon, {
                          size: 18,
                          color: "#03a9f4",
                          class: "pointer",
                          component: unref(Undo),
                          onClick: ($event) => onRecoverAnnex(index, annex.annex_id)
                        }, null, 8, ["component", "onClick"]),
                        createVNode(_component_n_icon, {
                          size: 18,
                          color: "red",
                          class: "pointer",
                          component: unref(IconDelete),
                          onClick: ($event) => onDeleteAnnex(index, annex.annex_id)
                        }, null, 8, ["component", "onClick"])
                      ])
                    ])
                  ]),
                  createBaseVNode("div", _hoisted_22, [
                    createBaseVNode("div", _hoisted_23, [
                      createBaseVNode("div", _hoisted_24, "所属笔记： " + toDisplayString(annex.article_title), 1)
                    ])
                  ])
                ]);
              }), 128))
            ], 2)),
            _cache[3] || (_cache[3] = createBaseVNode("footer", { class: "el-footer footer" }, "移动至回收站的笔记及附件，将在 30 天后自动清除。", -1))
          ])
        ]),
        _: 1
      }, 8, ["show"]);
    };
  }
});
const RecycleModal = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-2430a8e9"]]);
const _hoisted_1$5 = { class: "el-container is-vertical section" };
const _hoisted_2$4 = { class: "el-header menu-header" };
const _hoisted_3$4 = { class: "el-header menu-subheader" };
const _hoisted_4$4 = { class: "el-main height100" };
const _hoisted_5$3 = ["onClick"];
const _hoisted_6$3 = ["onClick"];
const _hoisted_7$3 = { key: 0 };
const _hoisted_8$3 = ["value", "onBlur"];
const _hoisted_9$2 = ["onContextmenu"];
const _hoisted_10$2 = { key: 0 };
const _sfc_main$5 = {
  __name: "NoteMenu",
  setup(__props) {
    const store = useNoteStore();
    const activedMenu = ref("0-0");
    const menus = reactive([
      {
        name: "近期编辑",
        indexName: "0-0",
        submenus: []
      },
      {
        name: "我的收藏",
        indexName: "1-0",
        submenus: []
      },
      {
        name: "分类管理",
        indexName: "2-1",
        isShowSub: true,
        isShowCount: true,
        isSubNode: true,
        submenus: []
      }
    ]);
    const isShowRecycleModal = ref(false);
    reactive({
      options: [],
      show: false,
      dropdownX: 0,
      dropdownY: 0,
      item: {}
    });
    const loadWatchClassMenu = () => {
      watch(
        () => store.class,
        () => {
          let items = [];
          for (const item of store.class) {
            items.push({
              id: item.id,
              name: item.class_name,
              count: item.count,
              isEdit: false,
              indexName: `2-${item.id}`
            });
          }
          menus[2].submenus = items;
        },
        {
          deep: true
        }
      );
    };
    const getCalssId = () => {
      let str = activedMenu.value;
      if (str.substring(0, 1) != "2") {
        return 0;
      }
      return parseInt(str.substring(2));
    };
    const onMenuLevel1Event = (menu2, index) => {
      if (menu2.isSubNode) {
        menu2.isShowSub = !menu2.isShowSub;
      } else {
        activedMenu.value = menu2.indexName;
        switch (index) {
          case 0:
            store.loadNoteList({ find_type: 1 });
            break;
          case 1:
            store.loadNoteList({ find_type: 2 });
            break;
        }
      }
    };
    const onMenuLevel2Event = (submenu, index) => {
      if (submenu.isEdit) {
        return;
      }
      if (index === 2) {
        store.loadNoteList({ find_type: 3, classify_id: submenu.id });
      }
      activedMenu.value = submenu.indexName;
    };
    const onToolsMenu = (value) => {
      if (value == "class") {
        menus[2].isShowSub = true;
        menus[2].submenus.unshift({
          id: -1,
          name: "",
          isEdit: true,
          indexName: "2--1"
        });
      }
    };
    const onEditNoteMenu = (e, i, i2, submenu) => {
      let name = e.target.value.trim();
      let id = submenu.id == -1 ? 0 : submenu.id;
      if (name == "" && submenu.id == -1) {
        return menus[i].submenus.splice(i2, 1);
      }
      if (name == "" && submenu.id > 0) {
        return submenu.isEdit = false;
      }
      if (i == 2) {
        store.editClass(id, name);
        submenu.isEdit = false;
      }
    };
    const { menu, ContextMenuElement } = useCommonContextMenu(onContextMenuHandle);
    function onContextMenuHandle(key) {
      const item = menu.getItem();
      let submenu = menus[item.index].submenus[item.index2];
      if (key == "rename") {
        submenu.isEdit = true;
      } else if (key == "delete") {
        if (item.index == 2) {
          store.deleteClass(submenu.id);
        }
      }
    }
    const onContextMenu = (e, item) => {
      menu.show(
        e,
        [
          {
            label: "重命名",
            key: "rename"
          },
          {
            label: "删除",
            key: "delete"
          }
        ],
        item
      );
    };
    const onInit = () => {
      store.loadClass();
      store.loadNoteList({}, true);
    };
    onInit();
    loadWatchClassMenu();
    return (_ctx, _cache) => {
      const _component_n_button = Button;
      const _component_n_icon = NIcon;
      const _component_n_dropdown = __unplugin_components_2;
      const _component_n_scrollbar = Scrollbar;
      const _directive_focus = resolveDirective("focus");
      return openBlock(), createElementBlock(Fragment, null, [
        createBaseVNode("section", _hoisted_1$5, [
          createBaseVNode("header", _hoisted_2$4, [
            createVNode(_component_n_button, {
              type: "primary",
              round: "",
              onClick: _cache[0] || (_cache[0] = () => {
                unref(store).addNewNote(getCalssId());
              }),
              class: "btn-add",
              "text-color": "#ffffff"
            }, {
              default: withCtx(() => _cache[4] || (_cache[4] = [
                createTextVNode(" + 新建笔记 ", -1)
              ])),
              _: 1,
              __: [4]
            }),
            createVNode(_component_n_dropdown, {
              class: "tools-menus",
              animated: true,
              trigger: "click",
              "show-arrow": false,
              onSelect: onToolsMenu,
              options: [
                {
                  label: "创建分类",
                  key: "class"
                }
              ]
            }, {
              default: withCtx(() => [
                createVNode(_component_n_button, {
                  circle: "",
                  type: "primary",
                  ghost: ""
                }, {
                  default: withCtx(() => [
                    createVNode(_component_n_icon, {
                      size: 22,
                      component: unref(Plus)
                    }, null, 8, ["component"])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })
          ]),
          createBaseVNode("header", _hoisted_3$4, [
            _cache[6] || (_cache[6] = createBaseVNode("span", null, "我的笔记", -1)),
            createBaseVNode("span", null, [
              createVNode(_component_n_button, {
                type: "primary",
                size: "tiny",
                ghost: "",
                round: "",
                color: "red",
                onClick: _cache[1] || (_cache[1] = ($event) => isShowRecycleModal.value = true)
              }, {
                default: withCtx(() => _cache[5] || (_cache[5] = [
                  createTextVNode(" 回收站 ", -1)
                ])),
                _: 1,
                __: [5]
              })
            ])
          ]),
          createBaseVNode("main", _hoisted_4$4, [
            createVNode(_component_n_scrollbar, null, {
              default: withCtx(() => [
                (openBlock(true), createElementBlock(Fragment, null, renderList(unref(menus), (menu2, i) => {
                  return openBlock(), createElementBlock("div", {
                    key: i,
                    class: "menu"
                  }, [
                    createBaseVNode("div", {
                      class: normalizeClass(["menu-level1 pointer", { actived: menu2.indexName == unref(activedMenu) }]),
                      onClick: ($event) => onMenuLevel1Event(menu2, i)
                    }, [
                      _cache[7] || (_cache[7] = createBaseVNode("span", { class: "dot" }, "●", -1)),
                      createBaseVNode("span", null, [
                        createTextVNode(toDisplayString(menu2.name) + " ", 1),
                        menu2.isShowCount ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                          createTextVNode(" (" + toDisplayString(menu2.submenus.length) + ") ", 1)
                        ], 64)) : createCommentVNode("", true)
                      ]),
                      withDirectives(createVNode(_component_n_icon, {
                        class: "nav-icon",
                        size: "18",
                        component: unref(Down)
                      }, null, 8, ["component"]), [
                        [vShow, menu2.submenus.length]
                      ])
                    ], 10, _hoisted_5$3),
                    (openBlock(true), createElementBlock(Fragment, null, renderList(menu2.submenus, (submenu, i2) => {
                      return withDirectives((openBlock(), createElementBlock("div", {
                        key: i2,
                        class: normalizeClass(["menu-level2 pointer", { actived: submenu.indexName == unref(activedMenu) }]),
                        onClick: ($event) => onMenuLevel2Event(submenu, i)
                      }, [
                        submenu.isEdit ? (openBlock(), createElementBlock("p", _hoisted_7$3, [
                          withDirectives(createBaseVNode("input", {
                            value: submenu.name,
                            onKeyup: _cache[2] || (_cache[2] = withKeys(($event) => $event.target.blur(), ["enter"])),
                            onBlur: ($event) => onEditNoteMenu($event, i, i2, submenu),
                            type: "text"
                          }, null, 40, _hoisted_8$3), [
                            [_directive_focus]
                          ])
                        ])) : (openBlock(), createElementBlock("p", {
                          key: 1,
                          onContextmenu: withModifiers(($event) => onContextMenu($event, { index: i, index2: i2, submenu }), ["prevent"])
                        }, [
                          createBaseVNode("span", null, "|- " + toDisplayString(submenu.name), 1),
                          submenu.count ? (openBlock(), createElementBlock("span", _hoisted_10$2, "(" + toDisplayString(submenu.count) + ")", 1)) : createCommentVNode("", true)
                        ], 40, _hoisted_9$2))
                      ], 10, _hoisted_6$3)), [
                        [vShow, menu2.isShowSub]
                      ]);
                    }), 128))
                  ]);
                }), 128))
              ]),
              _: 1
            })
          ])
        ]),
        createVNode(unref(ContextMenuElement)),
        unref(isShowRecycleModal) ? (openBlock(), createBlock(RecycleModal, {
          key: 0,
          onClose: _cache[3] || (_cache[3] = ($event) => isShowRecycleModal.value = false)
        })) : createCommentVNode("", true)
      ], 64);
    };
  }
};
const NoteMenu = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-3452fcc9"]]);
function useNoteListContextMenu() {
  const store = useNoteStore();
  const { dialog } = useInject();
  const { menu, ContextMenuElement } = useCommonContextMenu(handle);
  const onChangeClassify = (article_id, classify_id) => {
    ServArticleMoveClassify(
      { article_id, classify_id },
      {
        onSuccess: () => {
          store.loadNoteList({}, false);
          store.loadClass();
        }
      }
    );
  };
  const onDelete = (article_id) => {
    dialog.create({
      showIcon: false,
      title: `删除笔记？`,
      content: "笔记删除后30天之内，可在回收站中进行恢复。",
      positiveText: "确定",
      negativeText: "取消",
      positiveButtonProps: {
        textColor: "#ffffff"
      },
      onPositiveClick: async () => {
        await ServArticleDelete(
          {
            article_id
          },
          {
            onSuccess: () => {
              store.loadNoteList({}, false);
              store.loadClass();
            }
          }
        );
      }
    });
  };
  function handle(key, option) {
    const item = menu.getItem();
    switch (key) {
      case "delete":
        onDelete(item.article_id);
        break;
      default:
        if (option.extra === "classify") {
          onChangeClassify(item.article_id, parseInt(option.key));
        }
        break;
    }
  }
  const onContextMenu = (e, note) => {
    const options = [
      {
        label: "删除笔记",
        key: "delete"
      },
      {
        type: "divider",
        key: "divider"
      },
      {
        label: "修改分类",
        key: "classify",
        children: store.class?.map((item) => {
          return {
            label: item.count ? `${item.class_name} (${item.count})` : item.class_name,
            key: item.id,
            disabled: item.id === note?.classify_id,
            extra: "classify"
          };
        })
      }
    ];
    options && menu.show(e, options, note);
  };
  return {
    onContextMenu,
    ContextMenuElement
  };
}
const _hoisted_1$4 = { class: "el-container is-vertical note-list-view" };
const _hoisted_2$3 = { class: "el-header header-search" };
const _hoisted_3$3 = { class: "icon" };
const _hoisted_4$3 = { class: "el-header header-desc" };
const _hoisted_5$2 = { class: "menu-icon" };
const _hoisted_6$2 = {
  key: 0,
  class: "el-main height100 flex-center"
};
const _hoisted_7$2 = {
  key: 1,
  class: "el-main"
};
const _hoisted_8$2 = ["onClick", "onContextmenu"];
const _hoisted_9$1 = { class: "article-item-title text-ellipsis" };
const _hoisted_10$1 = { class: "article-item-body" };
const _hoisted_11$1 = { class: "content" };
const _hoisted_12$1 = { class: "datetime" };
const _hoisted_13 = { class: "abstract" };
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "NoteList",
  setup(__props) {
    const { onContextMenu, ContextMenuElement } = useNoteListContextMenu();
    const store = useNoteStore();
    const items = computed(() => store.notes.items);
    const loadId = computed(() => store.view.loadId);
    const loadStatus = computed(() => store.notes.loadStatus);
    const keyword = computed({
      get: () => store.notes.params.keyword,
      set: (val) => {
        store.notes.params.keyword = val;
      }
    });
    const onCatDetail = (item) => {
      store.loadDetail(item.article_id);
    };
    const onSearchInput = debounce(() => {
      store.loadNoteList({}, false);
    }, 300);
    return (_ctx, _cache) => {
      const _component_n_icon = NIcon;
      const _component_n_empty = NEmpty;
      const _component_n_scrollbar = Scrollbar;
      return openBlock(), createElementBlock(Fragment, null, [
        createBaseVNode("section", _hoisted_1$4, [
          createBaseVNode("header", _hoisted_2$3, [
            createBaseVNode("div", _hoisted_3$3, [
              createVNode(_component_n_icon, {
                size: "18",
                component: unref(Search)
              }, null, 8, ["component"])
            ]),
            withDirectives(createBaseVNode("input", {
              type: "text",
              class: "search",
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(keyword) ? keyword.value = $event : null),
              placeholder: "搜索我的笔记 ...",
              maxlength: "30",
              onInput: _cache[1] || (_cache[1] = //@ts-ignore
              (...args) => unref(onSearchInput) && unref(onSearchInput)(...args))
            }, null, 544), [
              [vModelText, unref(keyword)]
            ])
          ]),
          createBaseVNode("header", _hoisted_4$3, [
            createBaseVNode("span", null, toDisplayString(unref(items).length) + " 篇笔记", 1),
            createBaseVNode("div", _hoisted_5$2, [
              createVNode(_component_n_icon, {
                size: "18",
                component: unref(SortAmountDown)
              }, null, 8, ["component"])
            ])
          ]),
          unref(loadStatus) == 0 || !unref(items).length ? (openBlock(), createElementBlock("main", _hoisted_6$2, [
            unref(loadStatus) == 0 ? (openBlock(), createBlock(Loading, { key: 0 })) : (openBlock(), createBlock(_component_n_empty, {
              key: 1,
              description: "暂无相关数据"
            }))
          ])) : (openBlock(), createElementBlock("main", _hoisted_7$2, [
            createVNode(_component_n_scrollbar, null, {
              default: withCtx(() => [
                (openBlock(true), createElementBlock(Fragment, null, renderList(unref(items), (note) => {
                  return openBlock(), createElementBlock("div", {
                    class: normalizeClass(["article-item pointer", { active: unref(loadId) == note.article_id }]),
                    key: note.article_id,
                    onClick: ($event) => onCatDetail(note),
                    onContextmenu: withModifiers(($event) => unref(onContextMenu)($event, note), ["prevent"])
                  }, [
                    createBaseVNode("div", _hoisted_9$1, [
                      createBaseVNode("span", null, toDisplayString(note.title), 1)
                    ]),
                    createBaseVNode("div", _hoisted_10$1, [
                      createBaseVNode("div", _hoisted_11$1, [
                        createBaseVNode("div", _hoisted_12$1, [
                          createBaseVNode("span", null, toDisplayString(note.created_at.substring(0, 10)), 1),
                          createBaseVNode("span", null, toDisplayString(note.class_name), 1)
                        ]),
                        createBaseVNode("div", _hoisted_13, toDisplayString(note.abstract.replace(/[\r\n]/g, "").replace(/(<([^>]+)>)/gi, "")), 1)
                      ])
                    ])
                  ], 42, _hoisted_8$2);
                }), 128))
              ]),
              _: 1
            })
          ]))
        ]),
        createVNode(unref(ContextMenuElement))
      ], 64);
    };
  }
});
const NoteList = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-513e4a5b"]]);
const _imports_0 = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%3e%3cdefs%3e%3crect%20id='path_0'%20x='0'%20y='0'%20width='24'%20height='24'%20/%3e%3c/defs%3e%3cg%20opacity='1'%20transform='translate(0%200)%20rotate(0%2012%2012)'%3e%3cmask%20id='bg-mask-0'%20fill='white'%3e%3cuse%20xlink:href='%23path_0'%3e%3c/use%3e%3c/mask%3e%3cg%20mask='url(%23bg-mask-0)'%20%3e%3cpath%20id='路径%201'%20fill-rule='evenodd'%20style='fill:%23A6A6A6'%20transform='translate(7.5%207.500003730952395)%20rotate(0%204.5%204.500548134523802)'%20opacity='1'%20d='M1.8,8.1L1.8,4.27L3.67,7.65C3.82,7.95%204.15,8.12%204.5,8.1C4.85,8.12%205.18,7.95%205.33,7.65L7.2,4.27L7.2,8.1C7.2,8.6%207.6,9%208.1,9C8.6,9%209,8.6%209,8.1L9,0.9C9,0.41%208.6,0%208.1,0C8.1,0%208.09,0%208.09,0C7.75,-0.02%207.42,0.15%207.27,0.46L4.5,5.45L1.73,0.45C1.58,0.15%201.25,-0.02%200.91,0C0.91,0%200.9,0%200.9,0C0.43,0%200,0.4%200,0.9L0,8.1C0,8.6%200.4,9%200.9,9C1.4,9%201.8,8.6%201.8,8.1Z%20'%20/%3e%3cpath%20id='分组%201'%20fill-rule='evenodd'%20style='fill:%23A6A6A6'%20transform='translate(4%204)%20rotate(0%208%208)'%20opacity='1'%20d='M0%202L0%2014C0%2015.11%200.89%2016%202%2016L14%2016C15.11%2016%2016%2015.11%2016%2014L16%202C16%200.89%2015.11%200%2014%200L2%200C0.89%200%200%200.89%200%202Z%20M14.75%2013.79L14.75%202.31C14.75%201.78%2014.32%201.35%2013.79%201.35L2.31%201.35C1.78%201.35%201.35%201.78%201.35%202.31L1.35%2013.79C1.35%2014.32%201.78%2014.75%202.31%2014.75L13.79%2014.75C14.32%2014.75%2014.75%2014.32%2014.75%2013.79Z%20'%20/%3e%3c/g%3e%3c/g%3e%3c/svg%3e";
const _hoisted_1$3 = { class: "annex-modal" };
const _hoisted_2$2 = { class: "title" };
const _hoisted_3$2 = { class: "annex-box" };
const _hoisted_4$2 = { class: "annex-main me-scrollbar me-scrollbar-thumb" };
const _hoisted_5$1 = { class: "empty-text" };
const _hoisted_6$1 = { class: "suffix" };
const _hoisted_7$1 = { class: "content" };
const _hoisted_8$1 = { class: "filename text-ellipsis" };
const _hoisted_9 = { class: "filetool" };
const _hoisted_10 = { class: "size" };
const _hoisted_11 = { class: "tools" };
const _hoisted_12 = { class: "annex-footer" };
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "AnnexUploadModal",
  setup(__props) {
    const { message, dialog } = useInject();
    const store = useNoteStore();
    const loading = ref(false);
    const detail = computed(() => store.detail);
    const onTriggerUpload = () => {
      const el = document.getElementById("upload-annex");
      el && el.click();
    };
    const onUpload = async (e) => {
      if (e.target.files.length == 0) return;
      const file = e.target.files[0];
      if (file.size / (1024 * 1024) > 5) {
        return message.info("笔记附件不能大于5M!");
      }
      const { code, data } = await uploadAnnex(file, detail.value.article_id, { loading });
      if (code == 200) {
        store.detail.annex_list.push(data);
      }
    };
    const onDelete = (item) => {
      dialog.create({
        title: "删除确认？",
        content: `你确定要删除笔记附件【${item.annex_name}】吗？`,
        negativeText: "取消",
        positiveText: "删除",
        positiveButtonProps: {
          textColor: "#ffffff"
        },
        onPositiveClick: async () => {
          let { code } = await ServArticleAnnexDelete({ annex_id: item.annex_id });
          if (code != 200) return;
          store.detail.annex_list = store.detail.annex_list.filter((i) => i.annex_id != item.annex_id);
          return true;
        }
      });
    };
    return (_ctx, _cache) => {
      const _component_n_button = Button;
      const _component_n_space = __unplugin_components_1;
      const _component_n_icon = NIcon;
      return openBlock(), createElementBlock("section", _hoisted_1$3, [
        createBaseVNode("div", _hoisted_2$2, [
          createBaseVNode("span", null, "附件列表(" + toDisplayString(unref(detail).annex_list.length) + ")", 1)
        ]),
        createBaseVNode("div", _hoisted_3$2, [
          createBaseVNode("div", _hoisted_4$2, [
            withDirectives(createBaseVNode("p", _hoisted_5$1, "暂无附件", 512), [
              [vShow, unref(detail).annex_list.length == 0]
            ]),
            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(detail).annex_list, (file) => {
              return openBlock(), createElementBlock("div", {
                key: file.annex_id,
                class: "file-item pointer"
              }, [
                createBaseVNode("div", _hoisted_6$1, toDisplayString(unref(getFileNameSuffix)(file.annex_name)), 1),
                createBaseVNode("div", _hoisted_7$1, [
                  createBaseVNode("div", _hoisted_8$1, toDisplayString(file.annex_name), 1),
                  createBaseVNode("div", _hoisted_9, [
                    createBaseVNode("span", _hoisted_10, toDisplayString(unref(fileFormatSize)(file.annex_size)), 1),
                    createBaseVNode("span", null, toDisplayString(file.created_at), 1),
                    createBaseVNode("div", _hoisted_11, [
                      createVNode(_component_n_space, null, {
                        default: withCtx(() => [
                          createVNode(_component_n_button, {
                            type: "primary",
                            size: "tiny",
                            text: "",
                            onClick: ($event) => unref(ServeDownloadAnnex)(file.annex_id)
                          }, {
                            default: withCtx(() => _cache[0] || (_cache[0] = [
                              createTextVNode(" 下载 ", -1)
                            ])),
                            _: 2,
                            __: [0]
                          }, 1032, ["onClick"]),
                          createVNode(_component_n_button, {
                            type: "error",
                            size: "tiny",
                            text: "",
                            onClick: ($event) => onDelete(file)
                          }, {
                            default: withCtx(() => _cache[1] || (_cache[1] = [
                              createTextVNode(" 删除 ", -1)
                            ])),
                            _: 2,
                            __: [1]
                          }, 1032, ["onClick"])
                        ]),
                        _: 2
                      }, 1024)
                    ])
                  ])
                ])
              ]);
            }), 128))
          ]),
          createBaseVNode("div", _hoisted_12, [
            _cache[3] || (_cache[3] = createBaseVNode("p", { class: "notice-text" }, [
              createTextVNode("文件大小在100M以内"),
              createBaseVNode("br"),
              createTextVNode("最多可支持上传10个附件")
            ], -1)),
            createVNode(_component_n_button, {
              "text-color": "#fff",
              type: "primary",
              size: "medium",
              loading: unref(loading),
              onClick: onTriggerUpload
            }, {
              icon: withCtx(() => [
                createVNode(_component_n_icon, { component: unref(UploadOne) }, null, 8, ["component"])
              ]),
              default: withCtx(() => [
                _cache[2] || (_cache[2] = createTextVNode(" 上传附件 ", -1)),
                createBaseVNode("input", {
                  type: "file",
                  id: "upload-annex",
                  onChange: onUpload,
                  style: { "display": "none" }
                }, null, 32)
              ]),
              _: 1,
              __: [2]
            }, 8, ["loading"])
          ])
        ])
      ]);
    };
  }
});
const AnnexUploadModal = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-cea936f0"]]);
const toolbars = [
  "revoke",
  "next",
  "-",
  "bold",
  "underline",
  "italic",
  "title",
  "strikeThrough",
  "sub",
  "sup",
  "unorderedList",
  "orderedList",
  "task",
  "link",
  "image",
  "table",
  "mermaid",
  "=",
  "preview",
  "fullscreen"
];
function useNoteEditor() {
  const store = useNoteStore();
  const settingsStore = useSettingsStore();
  const { message, dialog } = useInject();
  const loadStatus = computed(() => store.view.loadStatus === 0);
  const saveLoading = ref(false);
  const editor = reactive({
    title: store.detail.title,
    markdown: store.detail.md_content
  });
  const isPreviewMode = computed(() => store.view.editorMode == "preview");
  const classOptions = computed(() => {
    return store.class?.map((item) => {
      return {
        label: item.count ? `${item.class_name} (${item.count})` : item.class_name,
        value: item.id
      };
    });
  });
  const onUploadImage = async (files, callback) => {
    if (!files.length) return;
    const { code, data } = await uploadFile(files[0]);
    if (code != 200) return;
    callback([data.src]);
  };
  const onCollection = async () => {
    const action = store.detail.is_asterisk == 1 ? 2 : 1;
    const { code } = await ServArticleCollect({
      article_id: store.detail.article_id,
      action
    });
    if (code != 200) return;
    store.setCollectionStatus(action == 1);
  };
  const onDownload = () => {
    downloadBlobFile(store.detail.title + ".md", store.detail.md_content);
  };
  const onDelete = () => {
    dialog.create({
      showIcon: false,
      title: `删除笔记？`,
      content: "笔记删除后30天之内，可在回收站中进行恢复。",
      positiveText: "确定",
      negativeText: "取消",
      positiveButtonProps: {
        textColor: "#ffffff"
      },
      onPositiveClick: async () => {
        await ServArticleDelete(
          {
            article_id: store.detail.article_id
          },
          {
            onSuccess: () => {
              store.loadNoteList({}, false);
              store.close();
            }
          }
        );
      }
    });
  };
  const onChangeClassify = (classify_id) => {
    const { article_id } = store.detail;
    ServArticleMoveClassify(
      { article_id, classify_id },
      {
        onSuccess: () => {
          const find = store.class.find((i) => i.id == classify_id);
          store.detail.classify_id = classify_id;
          store.detail.class_name = find?.class_name || "";
          store.loadNoteList({}, false);
          store.loadClass();
        }
      }
    );
  };
  const onSave = async (isCloseEditMode = false) => {
    if (editor.markdown == "" && store.detail.article_id == 0) {
      return store.close();
    }
    if (!editor.title.length) {
      return message.warning("请输入笔记标题");
    }
    let classify_id = store.detail.classify_id;
    if (classify_id == 0) {
      classify_id = store.class.find((i) => i.is_default == 1)?.id || 0;
    }
    const params = {
      article_id: store.detail.article_id,
      classify_id,
      title: editor.title,
      md_content: editor.markdown
    };
    const { code, data } = await ServArticleEdit(params, { loading: saveLoading });
    if (code != 200) return;
    if (store.detail.article_id == 0) {
      store.loadClass();
      store.loadNoteList({}, false);
      if (classify_id != 0) {
        const find = store.class.find((i) => i.id == classify_id);
        store.detail.classify_id = classify_id;
        store.detail.class_name = find?.class_name || "";
      }
    } else {
      store.updateNoteItem(data.article_id, {
        article_id: data.article_id,
        abstract: data.abstract,
        image: data.image,
        title: data.title
      });
    }
    store.detail.md_content = editor.markdown;
    store.detail.title = editor.title;
    store.detail.article_id = data.article_id;
    if (isCloseEditMode) {
      store.setEditorMode("preview");
    }
    message.success("已保存");
  };
  const onSaveDebounce = debounce(onSave, 500);
  const editorBtnText = computed(() => {
    if (isPreviewMode.value) return "编辑";
    if (editor.markdown.length == 0) return "取消编辑";
    return saveLoading.value ? "保存中.." : "保存";
  });
  const onTitle = (e) => {
    editor.title = e.target.innerText.replace(/\n/g, "");
  };
  const onClickEditorBtn = () => {
    if (isPreviewMode.value) {
      store.setEditorMode("edit");
    } else {
      onSave(true);
    }
  };
  const themeMode = computed(() => settingsStore.currentThemeMode);
  watch(
    () => store.detail.article_id,
    () => {
      editor.markdown = store.detail.md_content;
      editor.title = store.detail.title;
    }
  );
  return {
    editor,
    classOptions,
    toolbars,
    isPreviewMode,
    onUploadImage,
    onCollection,
    onDownload,
    onDelete,
    onChangeClassify,
    onSave,
    onSaveDebounce,
    editorBtnText,
    loadStatus,
    onTitle,
    onClickEditorBtn,
    themeMode,
    detail: computed(() => store.detail)
  };
}
const _hoisted_1$2 = { class: "el-container is-vertical note-view" };
const _hoisted_2$1 = { class: "el-header note-view-title app-drag border-bottom" };
const _hoisted_3$1 = {
  key: 0,
  src: _imports_0,
  class: "svg-icon"
};
const _hoisted_4$1 = ["data-aid", "contenteditable"];
const _hoisted_5 = {
  key: 0,
  class: "el-header note-view-desc text-ellipsis"
};
const _hoisted_6 = { class: "pointer" };
const _hoisted_7 = { class: "pointer" };
const _hoisted_8 = { class: "el-main" };
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "NoteView",
  setup(__props) {
    const {
      editor,
      classOptions,
      toolbars: toolbars2,
      isPreviewMode,
      editorBtnText,
      loadStatus,
      themeMode,
      detail,
      onUploadImage,
      onCollection,
      onDownload,
      onDelete,
      onChangeClassify,
      onSaveDebounce,
      onTitle,
      onClickEditorBtn
    } = useNoteEditor();
    return (_ctx, _cache) => {
      const _component_n_icon = NIcon;
      const _component_n_button = Button;
      const _component_n_popselect = __unplugin_components_2$1;
      const _component_n_popover = __unplugin_components_3$1;
      const _component_n_float_button = __unplugin_components_4;
      const _component_n_tooltip = NTooltip;
      const _directive_loading = resolveDirective("loading");
      return openBlock(), createElementBlock(Fragment, null, [
        withDirectives((openBlock(), createElementBlock("section", _hoisted_1$2, [
          createBaseVNode("header", _hoisted_2$1, [
            !unref(detail).article_id ? (openBlock(), createElementBlock("img", _hoisted_3$1)) : createCommentVNode("", true),
            unref(detail).article_id && unref(isPreviewMode) ? (openBlock(), createBlock(_component_n_icon, {
              key: 1,
              size: 22,
              component: unref(IconStar),
              color: unref(detail).is_asterisk == 1 ? "#ee3f4d" : "",
              class: "pointer",
              onClick: unref(onCollection)
            }, null, 8, ["component", "color", "onClick"])) : createCommentVNode("", true),
            createBaseVNode("h4", {
              "data-aid": unref(detail).article_id,
              contenteditable: unref(isPreviewMode) ? false : "plaintext-only",
              onInput: _cache[0] || (_cache[0] = //@ts-ignore
              (...args) => unref(onTitle) && unref(onTitle)(...args))
            }, toDisplayString(unref(detail).title), 41, _hoisted_4$1),
            createVNode(_component_n_button, {
              size: "small",
              strong: "",
              secondary: "",
              onClick: unref(onClickEditorBtn)
            }, {
              icon: withCtx(() => [
                createVNode(_component_n_icon, {
                  size: "16",
                  component: unref(EditOne)
                }, null, 8, ["component"])
              ]),
              default: withCtx(() => [
                createTextVNode(" " + toDisplayString(unref(editorBtnText)), 1)
              ]),
              _: 1
            }, 8, ["onClick"]),
            unref(detail).article_id ? (openBlock(), createBlock(_component_n_button, {
              key: 2,
              secondary: "",
              size: "small",
              strong: "",
              style: { "margin-left": "5px" }
            }, {
              icon: withCtx(() => [
                createVNode(_component_n_icon, {
                  size: "16",
                  component: unref(History)
                }, null, 8, ["component"])
              ]),
              _: 1
            })) : createCommentVNode("", true)
          ]),
          unref(isPreviewMode) ? (openBlock(), createElementBlock("header", _hoisted_5, [
            createBaseVNode("p", null, [
              createVNode(_component_n_icon, {
                class: "icon",
                size: "15",
                component: unref(Time)
              }, null, 8, ["component"]),
              createBaseVNode("span", null, "更新于 " + toDisplayString(unref(detail).updated_at.substring(0, 16)) + "分", 1)
            ]),
            createBaseVNode("p", _hoisted_6, [
              createVNode(_component_n_icon, {
                class: "icon",
                size: "15",
                component: unref(CategoryManagement)
              }, null, 8, ["component"]),
              createVNode(_component_n_popselect, {
                value: unref(detail).classify_id,
                "onUpdate:value": [
                  _cache[1] || (_cache[1] = ($event) => unref(detail).classify_id = $event),
                  unref(onChangeClassify)
                ],
                options: unref(classOptions),
                size: "medium",
                "show-arrow": true,
                trigger: "click",
                scrollable: ""
              }, {
                default: withCtx(() => [
                  createBaseVNode("span", null, "分类 (" + toDisplayString(unref(detail).class_name) + ")", 1)
                ]),
                _: 1
              }, 8, ["value", "options", "onUpdate:value"])
            ]),
            createBaseVNode("p", _hoisted_7, [
              createVNode(_component_n_icon, {
                class: "icon",
                size: "15",
                component: unref(FolderUpload)
              }, null, 8, ["component"]),
              createVNode(_component_n_popover, {
                trigger: "click",
                "show-arrow": true
              }, {
                trigger: withCtx(() => [
                  createBaseVNode("span", null, "附件 (" + toDisplayString(unref(detail).annex_list.length) + ")", 1)
                ]),
                default: withCtx(() => [
                  createVNode(AnnexUploadModal)
                ]),
                _: 1
              })
            ]),
            createBaseVNode("p", null, [
              createVNode(_component_n_icon, {
                class: "icon",
                size: "15",
                component: unref(TextMessage)
              }, null, 8, ["component"]),
              createBaseVNode("span", null, "字数 (" + toDisplayString(unref(editor).markdown.length) + ")", 1)
            ])
          ])) : createCommentVNode("", true),
          createBaseVNode("main", _hoisted_8, [
            unref(isPreviewMode) ? (openBlock(), createBlock(unref(MdPreview), {
              key: 0,
              "preview-theme": "vuepress",
              "show-code-row-number": false,
              style: { "height": "100%", "border": "none", "max-width": "1200px", "margin": "0 auto", "box-shadow": "0 0 10px rgba(0, 0, 0, 0.1)", "padding": "15px" },
              modelValue: unref(editor).markdown,
              "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => unref(editor).markdown = $event),
              theme: unref(themeMode),
              "code-theme": "github"
            }, null, 8, ["modelValue", "theme"])) : (openBlock(), createBlock(unref(Editor), {
              key: 1,
              modelValue: unref(editor).markdown,
              "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => unref(editor).markdown = $event),
              toolbars: unref(toolbars2),
              "show-code-row-number": false,
              theme: unref(themeMode),
              preview: false,
              style: { "height": "100%", "border": "none" },
              onOnSave: _cache[4] || (_cache[4] = ($event) => unref(onSaveDebounce)(false)),
              onOnUploadImg: unref(onUploadImage)
            }, null, 8, ["modelValue", "toolbars", "theme", "onOnUploadImg"]))
          ])
        ])), [
          [_directive_loading, unref(loadStatus)]
        ]),
        unref(isPreviewMode) ? (openBlock(), createBlock(_component_n_float_button, {
          key: 0,
          position: "fixed",
          bottom: 100,
          right: 30,
          "menu-trigger": "hover",
          style: { "z-index": "1" }
        }, {
          menu: withCtx(() => [
            createVNode(_component_n_tooltip, {
              trigger: "hover",
              placement: "right"
            }, {
              trigger: withCtx(() => [
                createVNode(_component_n_float_button, null, {
                  default: withCtx(() => [
                    createVNode(_component_n_icon, {
                      size: "18",
                      component: unref(Share)
                    }, null, 8, ["component"])
                  ]),
                  _: 1
                })
              ]),
              default: withCtx(() => [
                _cache[5] || (_cache[5] = createTextVNode(" 分享笔记 ", -1))
              ]),
              _: 1,
              __: [5]
            }),
            createVNode(_component_n_tooltip, {
              trigger: "hover",
              placement: "right"
            }, {
              trigger: withCtx(() => [
                createVNode(_component_n_float_button, { onClick: unref(onDownload) }, {
                  default: withCtx(() => [
                    createVNode(_component_n_icon, {
                      size: "18",
                      component: unref(DownloadFour)
                    }, null, 8, ["component"])
                  ]),
                  _: 1
                }, 8, ["onClick"])
              ]),
              default: withCtx(() => [
                _cache[6] || (_cache[6] = createTextVNode(" 下载笔记 ", -1))
              ]),
              _: 1,
              __: [6]
            }),
            createVNode(_component_n_tooltip, {
              trigger: "hover",
              placement: "right"
            }, {
              trigger: withCtx(() => [
                createVNode(_component_n_float_button, { onClick: unref(onDelete) }, {
                  default: withCtx(() => [
                    createVNode(_component_n_icon, {
                      size: "18",
                      component: unref(IconDelete)
                    }, null, 8, ["component"])
                  ]),
                  _: 1
                }, 8, ["onClick"])
              ]),
              default: withCtx(() => [
                _cache[7] || (_cache[7] = createTextVNode(" 删除笔记 ", -1))
              ]),
              _: 1,
              __: [7]
            }),
            createVNode(_component_n_tooltip, {
              trigger: "hover",
              placement: "right"
            }, {
              trigger: withCtx(() => [
                createVNode(_component_n_float_button, null, {
                  default: withCtx(() => [
                    createVNode(_component_n_icon, {
                      size: "18",
                      component: unref(Comments)
                    }, null, 8, ["component"])
                  ]),
                  _: 1
                })
              ]),
              default: withCtx(() => [
                _cache[8] || (_cache[8] = createTextVNode(" 评论 ", -1))
              ]),
              _: 1,
              __: [8]
            })
          ]),
          default: withCtx(() => [
            createVNode(_component_n_icon, {
              size: "18",
              component: unref(ApplicationTwo)
            }, null, 8, ["component"])
          ]),
          _: 1
        })) : createCommentVNode("", true)
      ], 64);
    };
  }
});
const NoteView = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-8db2a18c"]]);
const _sfc_main$1 = {};
const _hoisted_1$1 = { class: "section flex-center app-drag" };
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("section", _hoisted_1$1, _cache[0] || (_cache[0] = [
    createBaseVNode("svg", {
      focusable: "false",
      viewBox: "0 0 220 220",
      "aria-hidden": "true",
      role: "presentation",
      xmlns: "http://www.w3.org/2000/svg",
      fill: "currentColor",
      width: "220",
      height: "220"
    }, [
      createBaseVNode("g", null, [
        createBaseVNode("g", null, [
          createBaseVNode("path", {
            id: "fill1",
            "fill-rule": "evenodd",
            "clip-rule": "evenodd",
            fill: "#F9FAFA",
            d: "M187.508,86.089l-84.87-49c-4.783-2.761-10.899-1.123-13.66,3.66 c-2.761,4.783-1.123,10.899,3.66,13.66l84.87,49c4.783,2.761,10.899,1.123,13.66-3.66 C193.929,94.966,192.291,88.85,187.508,86.089z M176.56,149.05l-30.311-17.5c4.783,2.761,10.899,1.122,13.66-3.66 c2.761-4.783,1.123-10.899-3.66-13.66L116.06,91.026l38.457,22.203c4.783,2.761,10.899,1.123,13.66-3.66 c2.761-4.783,1.123-10.899-3.66-13.66l-100.459-58c-4.783-2.761-10.899-1.123-13.66,3.66c-2.761,4.783-1.123,10.899,3.66,13.66 l6.929,4c4.782,2.762,6.421,8.877,3.66,13.66c-2.761,4.783-8.877,6.422-13.66,3.66l38.971,22.5l-65.818-38 c-4.783-2.761-10.899-1.123-13.66,3.66c-2.761,4.783-1.123,10.899,3.66,13.66l25.115,14.5c4.783,2.761,6.421,8.877,3.66,13.66 c-2.761,4.783-8.877,6.422-13.66,3.66l25.548,14.75l-26.414-15.25c-4.783-2.761-10.899-1.123-13.66,3.66 c-2.761,4.783-1.123,10.899,3.66,13.66l105.655,61c4.783,2.761,10.899,1.123,13.66-3.66c2.761-4.783,1.123-10.899-3.66-13.66 l-2.598-1.5c-4.783-2.761-6.422-8.877-3.66-13.66c2.761-4.783,8.877-6.422,13.66-3.66l25.115,14.5 c4.783,2.761,10.899,1.123,13.66-3.66C182.982,157.927,181.343,151.811,176.56,149.05z"
          })
        ])
      ]),
      createBaseVNode("path", {
        id: "fill3",
        "fill-rule": "evenodd",
        "clip-rule": "evenodd",
        fill: "#FFFFFF",
        d: "M56.375,71h91v68h-91V71z"
      }),
      createBaseVNode("g", null, [
        createBaseVNode("g", null, [
          createBaseVNode("path", {
            "fill-rule": "evenodd",
            "clip-rule": "evenodd",
            fill: "#D1D1D1",
            d: "M201.75,85.25c-2.761,0-5,2.239-5,5s2.239,5,5,5s5-2.239,5-5 S204.511,85.25,201.75,85.25z M201.75,94.25c-2.209,0-4-1.791-4-4s1.791-4,4-4s4,1.791,4,4S203.959,94.25,201.75,94.25z M24.75,64.25c-1.657,0-3,1.343-3,3c0,1.657,1.343,3,3,3s3-1.343,3-3C27.75,65.593,26.407,64.25,24.75,64.25z M24.75,69.25 c-1.105,0-2-0.895-2-2s0.895-2,2-2s2,0.895,2,2S25.855,69.25,24.75,69.25z M196.75,144.25c-1.657,0-3,1.343-3,3 c0,1.657,1.343,3,3,3s3-1.343,3-3C199.75,145.593,198.407,144.25,196.75,144.25z M196.75,149.25c-1.105,0-2-0.895-2-2s0.895-2,2-2 s2,0.895,2,2S197.855,149.25,196.75,149.25z M186.75,173.25c-2.761,0-5,2.239-5,5s2.239,5,5,5s5-2.239,5-5 S189.511,173.25,186.75,173.25z M186.75,182.25c-2.209,0-4-1.791-4-4s1.791-4,4-4s4,1.791,4,4S188.959,182.25,186.75,182.25z"
          })
        ])
      ]),
      createBaseVNode("g", { opacity: "0.6" }, [
        createBaseVNode("g", null, [
          createBaseVNode("path", {
            "fill-rule": "evenodd",
            "clip-rule": "evenodd",
            fill: "#CBCBCB",
            d: "M207.85,164.1c-0.331,0-0.6,0.269-0.6,0.6v3.8 c0,0.331,0.269,0.6,0.6,0.6c0.331,0,0.6-0.269,0.6-0.6v-3.8C208.45,164.369,208.181,164.1,207.85,164.1z M83.85,29.1 c-0.331,0-0.6,0.269-0.6,0.6v3.8c0,0.331,0.269,0.6,0.6,0.6c0.331,0,0.6-0.269,0.6-0.6v-3.8C84.45,29.369,84.181,29.1,83.85,29.1z M158.85,169.1c-0.331,0-0.6,0.269-0.6,0.6v5.8c0,0.331,0.269,0.6,0.6,0.6c0.331,0,0.6-0.269,0.6-0.6v-5.8 C159.45,169.369,159.181,169.1,158.85,169.1z"
          })
        ])
      ]),
      createBaseVNode("g", { opacity: "0.8" }, [
        createBaseVNode("g", null, [
          createBaseVNode("path", {
            "fill-rule": "evenodd",
            "clip-rule": "evenodd",
            fill: "#CCCCCC",
            d: "M209.45,166.095h-3.2c-0.221,0-0.4,0.226-0.4,0.505 s0.179,0.505,0.4,0.505h3.2c0.221,0,0.4-0.226,0.4-0.505S209.671,166.095,209.45,166.095z M85.45,31.095h-3.2 c-0.221,0-0.4,0.226-0.4,0.505s0.179,0.505,0.4,0.505h3.2c0.221,0,0.4-0.226,0.4-0.505S85.671,31.095,85.45,31.095z M161.45,172.095h-5.2c-0.221,0-0.4,0.226-0.4,0.505s0.179,0.505,0.4,0.505h5.2c0.221,0,0.4-0.226,0.4-0.505 S161.671,172.095,161.45,172.095z"
          })
        ])
      ]),
      createBaseVNode("g", { opacity: "0.5" }, [
        createBaseVNode("g", null, [
          createBaseVNode("path", {
            "fill-rule": "evenodd",
            "clip-rule": "evenodd",
            fill: "#CBCBCB",
            d: "M51.583,50.917h-8c-0.552,0-1,0.448-1,1c0,0.552,0.448,1,1,1h8 c0.552,0,1-0.448,1-1C52.583,51.364,52.136,50.917,51.583,50.917z M192.583,102.917h-8c-0.552,0-1,0.448-1,1c0,0.552,0.448,1,1,1 h8c0.552,0,1-0.448,1-1C193.583,103.364,193.136,102.917,192.583,102.917z"
          })
        ])
      ]),
      createBaseVNode("g", { opacity: "0.5" }, [
        createBaseVNode("g", null, [
          createBaseVNode("path", {
            "fill-rule": "evenodd",
            "clip-rule": "evenodd",
            fill: "#CBCBCB",
            d: "M47.583,46.917c-0.552,0-1,0.448-1,1v8c0,0.552,0.448,1,1,1 s1-0.448,1-1v-8C48.583,47.364,48.136,46.917,47.583,46.917z M188.583,98.917c-0.552,0-1,0.448-1,1v8c0,0.552,0.448,1,1,1 s1-0.448,1-1v-8C189.583,99.364,189.136,98.917,188.583,98.917z"
          })
        ])
      ]),
      createBaseVNode("g", null, [
        createBaseVNode("g", null, [
          createBaseVNode("path", {
            id: "fill2",
            "fill-rule": "evenodd",
            "clip-rule": "evenodd",
            fill: "#CCCCCC",
            d: "M89.25,91h-25v3h25V91z M64.25,116h30v-3h-30V116z M86.25,102 h-22v3h22V102z M79.25,80h-15v3h15V80z M112.25,68c0,0-4.343,0-6,0h-1c-2.447,0-3.482,1.687-3.482,3c0-1.181-1.064-3-3.518-3h-2 c-1.657,0-6,0-6,0h-37v74h46c0.625,0,1,0.483,1,1h3c0-0.544,0.428-1,1-1h46V68H112.25z M100.25,75c0,1.105,0,64,0,64h-44V71h34 c0,0,4.895,0,6,0h2c1.105,0,2,0.895,2,2V75z M147.25,139h-44c0,0,0-62.895,0-64v-2c0-1.105,0.895-2,2-2h2c1.105,0,5,0,5,0h35V139z M111.25,127h25v-3h-25V127z M111.25,94h14V80h-14V94z M114.25,83h8v8h-8V83z M111.25,116h30v-3h-30V116z M111.25,105h20v-3h-20 V105z M64.25,127h15v-3h-15V127z"
          })
        ])
      ]),
      createBaseVNode("g", { opacity: "0.2" }, [
        createBaseVNode("g", null, [
          createBaseVNode("path", {
            "fill-rule": "evenodd",
            "clip-rule": "evenodd",
            fill: "#CCCCCC",
            d: "M41.333,29.083c-2.209,0-4,1.791-4,4s1.791,4,4,4s4-1.791,4-4 S43.542,29.083,41.333,29.083z M41.333,36.095c-1.663,0-3.012-1.348-3.012-3.012c0-1.663,1.349-3.012,3.012-3.012 c1.663,0,3.012,1.349,3.012,3.012C44.345,34.747,42.997,36.095,41.333,36.095z"
          })
        ])
      ])
    ], -1)
  ]));
}
const NoteEmpty = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__scopeId", "data-v-f2652b08"]]);
const _hoisted_1 = { class: "el-container height100" };
const _hoisted_2 = {
  class: "el-aside",
  style: { "width": "230px" }
};
const _hoisted_3 = {
  class: "el-aside",
  style: { "width": "280px" }
};
const _hoisted_4 = { class: "el-main" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  setup(__props) {
    const noteStore = useNoteStore();
    const currentLoadId = computed(() => noteStore.view.loadId);
    return (_ctx, _cache) => {
      const _directive_dropsize = resolveDirective("dropsize");
      return openBlock(), createElementBlock("section", _hoisted_1, [
        createBaseVNode("aside", _hoisted_2, [
          createVNode(NoteMenu)
        ]),
        withDirectives((openBlock(), createElementBlock("aside", _hoisted_3, [
          createVNode(NoteList)
        ])), [
          [_directive_dropsize, { min: 200, max: 500, direction: "right", key: "note-list" }]
        ]),
        createBaseVNode("main", _hoisted_4, [
          (openBlock(), createBlock(resolveDynamicComponent(unref(currentLoadId) > 0 ? NoteView : NoteEmpty)))
        ])
      ]);
    };
  }
});
export {
  _sfc_main as default
};
