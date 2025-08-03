import { I as IconWrapper, H as createVNode, t as defineComponent, b_ as useMessage, a1 as ref, a4 as reactive, a2 as onMounted, L as createElementBlock, M as createBaseVNode, T as withCtx, O as unref, a7 as __unplugin_components_1, F as Fragment, a9 as renderList, a6 as __unplugin_components_3, U as openBlock, aa as Button, V as createTextVNode, a5 as createBlock, R as toDisplayString, a8 as createCommentVNode, aM as NTag, bw as __unplugin_components_2, N as NIcon, ac as normalizeClass, W as _export_sfc } from "./index-CP-MMhae.js";
import { S as Setting } from "./Setting-BAUrJFN2.js";
import { _ as __unplugin_components_4 } from "./Popconfirm-WQCbiWo_.js";
import { I as IconDelete } from "./Delete-BuJN8hI8.js";
import { _ as __unplugin_components_0 } from "./Progress-CM-b0lRX.js";
import { _ as __unplugin_components_3$1 } from "./Switch-Bg2nTzU7.js";
import { a as __unplugin_components_7, _ as __unplugin_components_3$2 } from "./FormItem-BYV9eAmm.js";
import { _ as __unplugin_components_1$1 } from "./Input-9scKSWkl.js";
import "./use-locale-sP6dOhdq.js";
const Download = IconWrapper("download", false, function(props) {
  return createVNode("svg", {
    "width": props.size,
    "height": props.size,
    "viewBox": "0 0 48 48",
    "fill": "none"
  }, [createVNode("path", {
    "d": "M6 24.0083V42H42V24",
    "stroke": props.colors[0],
    "stroke-width": props.strokeWidth,
    "stroke-linecap": props.strokeLinecap,
    "stroke-linejoin": props.strokeLinejoin
  }, null), createVNode("path", {
    "d": "M33 23L24 32L15 23",
    "stroke": props.colors[0],
    "stroke-width": props.strokeWidth,
    "stroke-linecap": props.strokeLinecap,
    "stroke-linejoin": props.strokeLinejoin
  }, null), createVNode("path", {
    "d": "M23.9917 6V32",
    "stroke": props.colors[0],
    "stroke-width": props.strokeWidth,
    "stroke-linecap": props.strokeLinecap,
    "stroke-linejoin": props.strokeLinejoin
  }, null)]);
});
class PluginAPI {
  /**
   * 获取所有插件列表
   */
  static async listPlugins() {
    try {
      console.log(window.electron, "window.electron");
      const result = await window.electron.ipcRenderer.invoke("plugin:manager:list");
      return result;
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  /**
   * 安装本地插件
   */
  static async installLocalPlugin(zipPath) {
    try {
      const result = await window.electron.ipcRenderer.invoke("plugin:manager:install-local", zipPath);
      return result;
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  /**
   * 安装远程插件
   */
  static async installRemotePlugin(url) {
    try {
      const result = await window.electron.ipcRenderer.invoke("plugin:manager:install-remote", url);
      return result;
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  /**
   * 卸载插件
   */
  static async uninstallPlugin(pluginId) {
    try {
      const result = await window.electron.ipcRenderer.invoke("plugin:manager:uninstall", pluginId);
      return result;
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  /**
   * 启用插件
   */
  static async enablePlugin(pluginId) {
    try {
      const result = await window.electron.ipcRenderer.invoke("plugin:manager:enable", pluginId);
      return result;
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  /**
   * 禁用插件
   */
  static async disablePlugin(pluginId) {
    try {
      const result = await window.electron.ipcRenderer.invoke("plugin:manager:disable", pluginId);
      return result;
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  /**
   * 获取插件配置
   */
  static async getPluginConfig(pluginId) {
    try {
      const result = await window.electron.ipcRenderer.invoke("plugin:manager:get-config", pluginId);
      return result;
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  /**
   * 设置插件配置
   */
  static async setPluginConfig(pluginId, config) {
    try {
      const result = await window.electron.ipcRenderer.invoke("plugin:manager:set-config", pluginId, config);
      return result;
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  /**
   * 选择本地文件
   */
  static async selectLocalFile() {
    try {
      const result = await window.electron.ipcRenderer.invoke("plugin:files:select-file", {
        title: "选择插件文件",
        filters: [
          { name: "ZIP文件", extensions: ["zip"] },
          { name: "所有文件", extensions: ["*"] }
        ]
      });
      if (result.canceled || !result.filePaths || result.filePaths.length === 0) {
        return { success: false, error: "用户取消选择" };
      }
      return { success: true, filePath: result.filePaths[0] };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
const _hoisted_1 = { class: "action-buttons" };
const _hoisted_2 = { class: "plugin-section" };
const _hoisted_3 = {
  key: 0,
  class: "plugin-grid"
};
const _hoisted_4 = { class: "plugin-header" };
const _hoisted_5 = { class: "plugin-name" };
const _hoisted_6 = { class: "plugin-content" };
const _hoisted_7 = { class: "plugin-description" };
const _hoisted_8 = { class: "plugin-info" };
const _hoisted_9 = { class: "plugin-type" };
const _hoisted_10 = {
  key: 1,
  class: "empty-state"
};
const _hoisted_11 = { class: "plugin-section" };
const _hoisted_12 = { class: "plugin-grid" };
const _hoisted_13 = { class: "plugin-header" };
const _hoisted_14 = { class: "plugin-name" };
const _hoisted_15 = { class: "plugin-content" };
const _hoisted_16 = { class: "plugin-description" };
const _hoisted_17 = { class: "plugin-info" };
const _hoisted_18 = { class: "plugin-stats" };
const _hoisted_19 = { class: "upload-content" };
const _hoisted_20 = { key: 0 };
const _hoisted_21 = {
  key: 1,
  class: "install-progress"
};
const _hoisted_22 = { class: "progress-info" };
const _hoisted_23 = { class: "step-text" };
const _hoisted_24 = {
  key: 2,
  class: "install-result"
};
const _hoisted_25 = { class: "result-icon" };
const _hoisted_26 = {
  key: 0,
  viewBox: "0 0 24 24"
};
const _hoisted_27 = {
  key: 1,
  viewBox: "0 0 24 24"
};
const _hoisted_28 = {
  key: 0,
  class: "success-note"
};
const _hoisted_29 = {
  key: 1,
  class: "error-actions"
};
const _hoisted_30 = { key: 0 };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "plugin",
  setup(__props) {
    const message = useMessage();
    const plugins = ref([]);
    const loading = ref(false);
    const showUploadModal = ref(false);
    const uploadLoading = ref(false);
    const installProgress = ref(0);
    const installStep = ref("");
    const installResult = ref(null);
    const showRemoteModal = ref(false);
    const remoteForm = reactive({
      url: "",
      name: "",
      description: ""
    });
    const showConfigModal = ref(false);
    const currentPlugin = ref(null);
    const pluginConfig = reactive({});
    const marketPlugins = ref([
      {
        id: "weather-plugin",
        name: "天气插件",
        description: "获取实时天气信息",
        author: "WeatherTeam",
        version: "1.0.0",
        downloadUrl: "https://example.com/plugins/weather.zip",
        category: "工具",
        rating: 4.5,
        downloads: 1250
      },
      {
        id: "translator-plugin",
        name: "翻译插件",
        description: "多语言翻译工具",
        author: "TranslateTeam",
        version: "2.1.0",
        downloadUrl: "https://example.com/plugins/translator.zip",
        category: "工具",
        rating: 4.8,
        downloads: 2100
      },
      {
        id: "note-plugin",
        name: "笔记插件",
        description: "快速记录和管理笔记",
        author: "NoteTeam",
        version: "1.5.0",
        downloadUrl: "https://example.com/plugins/note.zip",
        category: "效率",
        rating: 4.3,
        downloads: 890
      }
    ]);
    const loadInstalledPlugins = async () => {
      loading.value = true;
      try {
        console.log("开始调用 PluginAPI.listPlugins()");
        const result = await PluginAPI.listPlugins();
        console.log("PluginAPI.listPlugins() 返回结果:", result);
        if (result.success && result.plugins) {
          plugins.value = result.plugins;
          console.log("插件列表加载成功，插件数量:", result.plugins.length);
        } else {
          console.error("插件列表加载失败:", result.error);
          message.error(result.error || "加载插件列表失败");
        }
      } catch (error) {
        console.error("加载插件失败:", error);
        console.error("错误堆栈:", error.stack);
        message.error(`加载插件列表失败: ${error.message}`);
      } finally {
        loading.value = false;
      }
    };
    const handleFileUpload = async () => {
      uploadLoading.value = true;
      installProgress.value = 0;
      installStep.value = "";
      installResult.value = null;
      try {
        installStep.value = "选择插件文件...";
        installProgress.value = 20;
        const fileResult = await PluginAPI.selectLocalFile();
        if (!fileResult.success || !fileResult.filePath) {
          if (fileResult.error !== "用户取消选择") {
            installResult.value = { success: false, message: fileResult.error || "选择文件失败" };
          } else {
            installStep.value = "";
            installProgress.value = 0;
          }
          return;
        }
        installStep.value = "验证插件文件...";
        installProgress.value = 40;
        await new Promise((resolve) => setTimeout(resolve, 500));
        installStep.value = "正在安装插件...";
        installProgress.value = 70;
        const result = await PluginAPI.installLocalPlugin(fileResult.filePath);
        installProgress.value = 100;
        if (result.success) {
          installStep.value = "安装完成";
          installResult.value = { success: true, message: "插件安装成功！" };
          await loadInstalledPlugins();
          setTimeout(() => {
            showUploadModal.value = false;
            resetInstallState();
          }, 3e3);
        } else {
          installStep.value = "安装失败";
          installResult.value = { success: false, message: result.error || "插件安装失败" };
        }
      } catch (error) {
        console.error("安装插件失败:", error);
        installStep.value = "安装失败";
        const errorMessage = error?.message || error?.toString() || "安装插件时发生错误";
        installResult.value = { success: false, message: errorMessage };
      } finally {
        uploadLoading.value = false;
      }
    };
    const resetInstallState = () => {
      installProgress.value = 0;
      installStep.value = "";
      installResult.value = null;
    };
    const installFromRemote = async () => {
      if (!remoteForm.url.trim()) {
        message.error("请输入插件下载地址");
        return;
      }
      uploadLoading.value = true;
      try {
        const result = await PluginAPI.installRemotePlugin(remoteForm.url.trim());
        if (result.success) {
          message.success("插件安装成功");
          showRemoteModal.value = false;
          remoteForm.url = "";
          remoteForm.name = "";
          remoteForm.description = "";
          await loadInstalledPlugins();
        } else {
          message.error(result.error || "插件安装失败");
        }
      } catch (error) {
        console.error("安装插件失败:", error);
        message.error("安装插件失败");
      } finally {
        uploadLoading.value = false;
      }
    };
    const installFromMarket = async (plugin2) => {
      uploadLoading.value = true;
      try {
        const result = await PluginAPI.installRemotePlugin(plugin2.downloadUrl);
        if (result.success) {
          message.success(`插件 "${plugin2.name}" 安装成功`);
          await loadInstalledPlugins();
        } else {
          message.error(result.error || "插件安装失败");
        }
      } catch (error) {
        console.error("安装插件失败:", error);
        message.error("安装插件失败");
      } finally {
        uploadLoading.value = false;
      }
    };
    const uninstallPlugin = async (plugin2) => {
      try {
        const result = await PluginAPI.uninstallPlugin(plugin2.id);
        if (result.success) {
          message.success("插件卸载成功");
          await loadInstalledPlugins();
        } else {
          message.error(result.error || "插件卸载失败");
        }
      } catch (error) {
        console.error("卸载插件失败:", error);
        message.error("卸载插件失败");
      }
    };
    const togglePlugin = async (plugin2) => {
      const newEnabled = !plugin2.enabled;
      try {
        const result = newEnabled ? await PluginAPI.enablePlugin(plugin2.id) : await PluginAPI.disablePlugin(plugin2.id);
        if (result.success) {
          plugin2.enabled = newEnabled;
          message.success(`插件已${newEnabled ? "启用" : "禁用"}`);
        } else {
          message.error(result.error || `${newEnabled ? "启用" : "禁用"}插件失败`);
        }
      } catch (error) {
        console.error("切换插件状态失败:", error);
        message.error("操作失败");
      }
    };
    const configurePlugin = async (plugin2) => {
      try {
        currentPlugin.value = plugin2;
        const result = await PluginAPI.getPluginConfig(plugin2.id);
        if (result.success && result.config) {
          Object.assign(pluginConfig, result.config);
        } else {
          Object.assign(pluginConfig, {});
        }
        showConfigModal.value = true;
      } catch (error) {
        console.error("获取插件配置失败:", error);
        message.error("获取插件配置失败");
      }
    };
    const savePluginConfig = async () => {
      try {
        if (!currentPlugin.value) return;
        const result = await PluginAPI.setPluginConfig(currentPlugin.value.id, pluginConfig);
        if (result.success) {
          message.success("配置保存成功");
          showConfigModal.value = false;
        } else {
          message.error(result.error || "保存配置失败");
        }
      } catch (error) {
        console.error("保存配置失败:", error);
        message.error("保存配置失败");
      }
    };
    const getStatusColor = (enabled) => {
      return enabled ? "success" : "default";
    };
    const getStatusText = (enabled) => {
      return enabled ? "已启用" : "已禁用";
    };
    onMounted(() => {
      loadInstalledPlugins();
    });
    return (_ctx, _cache) => {
      const _component_n_icon = NIcon;
      const _component_n_progress = __unplugin_components_0;
      return openBlock(), createElementBlock("section", null, [
        _cache[32] || (_cache[32] = createBaseVNode("h3", { class: "title" }, "插件管理", -1)),
        createBaseVNode("div", _hoisted_1, [
          createVNode(unref(__unplugin_components_1), null, {
            default: withCtx(() => [
              createVNode(unref(Button), {
                type: "primary",
                onClick: _cache[0] || (_cache[0] = ($event) => showUploadModal.value = true)
              }, {
                icon: withCtx(() => [
                  createVNode(unref(Download))
                ]),
                default: withCtx(() => [
                  _cache[11] || (_cache[11] = createTextVNode(" 本地安装 ", -1))
                ]),
                _: 1,
                __: [11]
              }),
              createVNode(unref(Button), {
                type: "info",
                onClick: _cache[1] || (_cache[1] = ($event) => showRemoteModal.value = true)
              }, {
                icon: withCtx(() => [
                  createVNode(unref(Download))
                ]),
                default: withCtx(() => [
                  _cache[12] || (_cache[12] = createTextVNode(" 远程安装 ", -1))
                ]),
                _: 1,
                __: [12]
              }),
              createVNode(unref(Button), {
                onClick: loadInstalledPlugins,
                loading: loading.value
              }, {
                default: withCtx(() => _cache[13] || (_cache[13] = [
                  createTextVNode(" 刷新列表 ", -1)
                ])),
                _: 1,
                __: [13]
              }, 8, ["loading"])
            ]),
            _: 1
          })
        ]),
        createBaseVNode("div", _hoisted_2, [
          _cache[17] || (_cache[17] = createBaseVNode("h4", null, "已安装插件", -1)),
          plugins.value.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_3, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(plugins.value, (plugin2) => {
              return openBlock(), createBlock(unref(__unplugin_components_2), {
                key: plugin2.id,
                class: "plugin-card",
                hoverable: ""
              }, {
                header: withCtx(() => [
                  createBaseVNode("div", _hoisted_4, [
                    createBaseVNode("span", _hoisted_5, toDisplayString(plugin2.config?.name || plugin2.id), 1),
                    createVNode(unref(NTag), {
                      type: getStatusColor(plugin2.enabled),
                      size: "small"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(getStatusText(plugin2.enabled)), 1)
                      ]),
                      _: 2
                    }, 1032, ["type"])
                  ])
                ]),
                action: withCtx(() => [
                  createVNode(unref(__unplugin_components_1), null, {
                    default: withCtx(() => [
                      createVNode(unref(__unplugin_components_3$1), {
                        value: plugin2.enabled,
                        "onUpdate:value": () => togglePlugin(plugin2),
                        size: "small"
                      }, null, 8, ["value", "onUpdate:value"]),
                      plugin2.config?.ui?.settings ? (openBlock(), createBlock(unref(Button), {
                        key: 0,
                        size: "small",
                        onClick: ($event) => configurePlugin(plugin2)
                      }, {
                        icon: withCtx(() => [
                          createVNode(unref(Setting))
                        ]),
                        default: withCtx(() => [
                          _cache[14] || (_cache[14] = createTextVNode(" 配置 ", -1))
                        ]),
                        _: 2,
                        __: [14]
                      }, 1032, ["onClick"])) : createCommentVNode("", true),
                      createVNode(unref(__unplugin_components_4), {
                        onPositiveClick: ($event) => uninstallPlugin(plugin2),
                        "positive-text": "确认",
                        "negative-text": "取消"
                      }, {
                        trigger: withCtx(() => [
                          createVNode(unref(Button), {
                            size: "small",
                            type: "error"
                          }, {
                            icon: withCtx(() => [
                              createVNode(unref(IconDelete))
                            ]),
                            default: withCtx(() => [
                              _cache[15] || (_cache[15] = createTextVNode(" 卸载 ", -1))
                            ]),
                            _: 1,
                            __: [15]
                          })
                        ]),
                        default: withCtx(() => [
                          createTextVNode(' 确定要卸载插件 "' + toDisplayString(plugin2.config?.name || plugin2.id) + '" 吗？ ', 1)
                        ]),
                        _: 2
                      }, 1032, ["onPositiveClick"])
                    ]),
                    _: 2
                  }, 1024)
                ]),
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_6, [
                    createBaseVNode("p", _hoisted_7, toDisplayString(plugin2.config?.description || "无描述"), 1),
                    createBaseVNode("p", _hoisted_8, [
                      createBaseVNode("span", null, "版本: " + toDisplayString(plugin2.config?.version || "未知"), 1),
                      createBaseVNode("span", null, "作者: " + toDisplayString(plugin2.config?.author || "未知"), 1)
                    ]),
                    createBaseVNode("p", _hoisted_9, "类型: " + toDisplayString(plugin2.type), 1)
                  ])
                ]),
                _: 2
              }, 1024);
            }), 128))
          ])) : (openBlock(), createElementBlock("div", _hoisted_10, _cache[16] || (_cache[16] = [
            createBaseVNode("p", null, "暂无已安装的插件", -1)
          ])))
        ]),
        createBaseVNode("div", _hoisted_11, [
          _cache[19] || (_cache[19] = createBaseVNode("h4", null, "插件市场", -1)),
          createBaseVNode("div", _hoisted_12, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(marketPlugins.value, (plugin2) => {
              return openBlock(), createBlock(unref(__unplugin_components_2), {
                key: plugin2.id,
                class: "plugin-card market-card",
                hoverable: ""
              }, {
                header: withCtx(() => [
                  createBaseVNode("div", _hoisted_13, [
                    createBaseVNode("span", _hoisted_14, toDisplayString(plugin2.name), 1),
                    createVNode(unref(NTag), {
                      type: "info",
                      size: "small"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(plugin2.category), 1)
                      ]),
                      _: 2
                    }, 1024)
                  ])
                ]),
                action: withCtx(() => [
                  createVNode(unref(Button), {
                    type: "primary",
                    size: "small",
                    onClick: ($event) => installFromMarket(plugin2),
                    loading: uploadLoading.value
                  }, {
                    icon: withCtx(() => [
                      createVNode(unref(Download))
                    ]),
                    default: withCtx(() => [
                      _cache[18] || (_cache[18] = createTextVNode(" 安装 ", -1))
                    ]),
                    _: 2,
                    __: [18]
                  }, 1032, ["onClick", "loading"])
                ]),
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_15, [
                    createBaseVNode("p", _hoisted_16, toDisplayString(plugin2.description), 1),
                    createBaseVNode("p", _hoisted_17, [
                      createBaseVNode("span", null, "版本: " + toDisplayString(plugin2.version), 1),
                      createBaseVNode("span", null, "作者: " + toDisplayString(plugin2.author), 1)
                    ]),
                    createBaseVNode("p", _hoisted_18, [
                      createBaseVNode("span", null, "评分: " + toDisplayString(plugin2.rating) + "/5", 1),
                      createBaseVNode("span", null, "下载: " + toDisplayString(plugin2.downloads), 1)
                    ])
                  ])
                ]),
                _: 2
              }, 1024);
            }), 128))
          ])
        ]),
        createVNode(unref(__unplugin_components_3), {
          show: showUploadModal.value,
          "onUpdate:show": _cache[3] || (_cache[3] = ($event) => showUploadModal.value = $event),
          preset: "dialog",
          title: "本地安装插件",
          "mask-closable": !uploadLoading.value
        }, {
          default: withCtx(() => [
            createBaseVNode("div", _hoisted_19, [
              !uploadLoading.value && !installResult.value ? (openBlock(), createElementBlock("div", _hoisted_20, [
                _cache[21] || (_cache[21] = createBaseVNode("p", null, "请选择插件zip文件进行安装：", -1)),
                createVNode(unref(Button), {
                  onClick: handleFileUpload,
                  type: "primary"
                }, {
                  default: withCtx(() => _cache[20] || (_cache[20] = [
                    createTextVNode(" 选择插件文件 ", -1)
                  ])),
                  _: 1,
                  __: [20]
                })
              ])) : createCommentVNode("", true),
              uploadLoading.value ? (openBlock(), createElementBlock("div", _hoisted_21, [
                createBaseVNode("div", _hoisted_22, [
                  createVNode(_component_n_icon, {
                    size: "20",
                    class: "progress-icon"
                  }, {
                    default: withCtx(() => _cache[22] || (_cache[22] = [
                      createBaseVNode("svg", { viewBox: "0 0 24 24" }, [
                        createBaseVNode("circle", {
                          cx: "12",
                          cy: "12",
                          r: "10",
                          stroke: "currentColor",
                          "stroke-width": "2",
                          fill: "none",
                          "stroke-dasharray": "62.83",
                          "stroke-dashoffset": "62.83",
                          "stroke-linecap": "round"
                        }, [
                          createBaseVNode("animate", {
                            attributeName: "stroke-dashoffset",
                            values: "62.83;0;62.83",
                            dur: "2s",
                            repeatCount: "indefinite"
                          })
                        ])
                      ], -1)
                    ])),
                    _: 1,
                    __: [22]
                  }),
                  createBaseVNode("span", _hoisted_23, toDisplayString(installStep.value), 1)
                ]),
                createVNode(_component_n_progress, {
                  type: "line",
                  percentage: installProgress.value,
                  "show-indicator": true,
                  processing: "",
                  class: "progress-bar"
                }, null, 8, ["percentage"])
              ])) : createCommentVNode("", true),
              installResult.value ? (openBlock(), createElementBlock("div", _hoisted_24, [
                createBaseVNode("div", _hoisted_25, [
                  createVNode(_component_n_icon, {
                    size: "48",
                    color: installResult.value.success ? "#18a058" : "#d03050"
                  }, {
                    default: withCtx(() => [
                      installResult.value.success ? (openBlock(), createElementBlock("svg", _hoisted_26, _cache[23] || (_cache[23] = [
                        createBaseVNode("path", {
                          fill: "currentColor",
                          d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                        }, null, -1)
                      ]))) : (openBlock(), createElementBlock("svg", _hoisted_27, _cache[24] || (_cache[24] = [
                        createBaseVNode("path", {
                          fill: "currentColor",
                          d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
                        }, null, -1)
                      ])))
                    ]),
                    _: 1
                  }, 8, ["color"])
                ]),
                createBaseVNode("p", {
                  class: normalizeClass(["result-message", { "success": installResult.value.success, "error": !installResult.value.success }])
                }, toDisplayString(installResult.value.message), 3),
                installResult.value.success ? (openBlock(), createElementBlock("div", _hoisted_28, _cache[25] || (_cache[25] = [
                  createBaseVNode("p", null, "插件已成功安装到系统中，窗口将在几秒后自动关闭", -1)
                ]))) : (openBlock(), createElementBlock("div", _hoisted_29, [
                  createVNode(unref(Button), {
                    onClick: resetInstallState,
                    type: "primary"
                  }, {
                    default: withCtx(() => _cache[26] || (_cache[26] = [
                      createTextVNode(" 重新安装 ", -1)
                    ])),
                    _: 1,
                    __: [26]
                  }),
                  createVNode(unref(Button), {
                    onClick: _cache[2] || (_cache[2] = ($event) => {
                      showUploadModal.value = false;
                      resetInstallState();
                    }),
                    quaternary: ""
                  }, {
                    default: withCtx(() => _cache[27] || (_cache[27] = [
                      createTextVNode(" 关闭 ", -1)
                    ])),
                    _: 1,
                    __: [27]
                  })
                ]))
              ])) : createCommentVNode("", true)
            ])
          ]),
          _: 1
        }, 8, ["show", "mask-closable"]),
        createVNode(unref(__unplugin_components_3), {
          show: showRemoteModal.value,
          "onUpdate:show": _cache[8] || (_cache[8] = ($event) => showRemoteModal.value = $event),
          preset: "dialog",
          title: "远程安装插件"
        }, {
          action: withCtx(() => [
            createVNode(unref(__unplugin_components_1), null, {
              default: withCtx(() => [
                createVNode(unref(Button), {
                  onClick: _cache[7] || (_cache[7] = ($event) => showRemoteModal.value = false)
                }, {
                  default: withCtx(() => _cache[28] || (_cache[28] = [
                    createTextVNode("取消", -1)
                  ])),
                  _: 1,
                  __: [28]
                }),
                createVNode(unref(Button), {
                  type: "primary",
                  onClick: installFromRemote,
                  loading: uploadLoading.value
                }, {
                  default: withCtx(() => _cache[29] || (_cache[29] = [
                    createTextVNode(" 安装 ", -1)
                  ])),
                  _: 1,
                  __: [29]
                }, 8, ["loading"])
              ]),
              _: 1
            })
          ]),
          default: withCtx(() => [
            createVNode(unref(__unplugin_components_7), {
              model: remoteForm,
              "label-placement": "left",
              "label-width": "80px"
            }, {
              default: withCtx(() => [
                createVNode(unref(__unplugin_components_3$2), {
                  label: "下载地址",
                  required: ""
                }, {
                  default: withCtx(() => [
                    createVNode(unref(__unplugin_components_1$1), {
                      value: remoteForm.url,
                      "onUpdate:value": _cache[4] || (_cache[4] = ($event) => remoteForm.url = $event),
                      placeholder: "请输入插件zip文件的下载地址"
                    }, null, 8, ["value"])
                  ]),
                  _: 1
                }),
                createVNode(unref(__unplugin_components_3$2), { label: "插件名称" }, {
                  default: withCtx(() => [
                    createVNode(unref(__unplugin_components_1$1), {
                      value: remoteForm.name,
                      "onUpdate:value": _cache[5] || (_cache[5] = ($event) => remoteForm.name = $event),
                      placeholder: "可选，插件显示名称"
                    }, null, 8, ["value"])
                  ]),
                  _: 1
                }),
                createVNode(unref(__unplugin_components_3$2), { label: "插件描述" }, {
                  default: withCtx(() => [
                    createVNode(unref(__unplugin_components_1$1), {
                      value: remoteForm.description,
                      "onUpdate:value": _cache[6] || (_cache[6] = ($event) => remoteForm.description = $event),
                      placeholder: "可选，插件描述信息",
                      type: "textarea",
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
        }, 8, ["show"]),
        createVNode(unref(__unplugin_components_3), {
          show: showConfigModal.value,
          "onUpdate:show": _cache[10] || (_cache[10] = ($event) => showConfigModal.value = $event),
          preset: "dialog",
          title: "插件配置"
        }, {
          action: withCtx(() => [
            createVNode(unref(__unplugin_components_1), null, {
              default: withCtx(() => [
                createVNode(unref(Button), {
                  onClick: _cache[9] || (_cache[9] = ($event) => showConfigModal.value = false)
                }, {
                  default: withCtx(() => _cache[30] || (_cache[30] = [
                    createTextVNode("取消", -1)
                  ])),
                  _: 1,
                  __: [30]
                }),
                createVNode(unref(Button), {
                  type: "primary",
                  onClick: savePluginConfig
                }, {
                  default: withCtx(() => _cache[31] || (_cache[31] = [
                    createTextVNode(" 保存配置 ", -1)
                  ])),
                  _: 1,
                  __: [31]
                })
              ]),
              _: 1
            })
          ]),
          default: withCtx(() => [
            currentPlugin.value ? (openBlock(), createElementBlock("div", _hoisted_30, [
              createBaseVNode("h4", null, toDisplayString(currentPlugin.value.config?.name || currentPlugin.value.id) + " 配置", 1),
              createVNode(unref(__unplugin_components_7), {
                model: pluginConfig,
                "label-placement": "left",
                "label-width": "120px"
              }, {
                default: withCtx(() => [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(pluginConfig, (_, key) => {
                    return openBlock(), createBlock(unref(__unplugin_components_3$2), {
                      key,
                      label: key
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(__unplugin_components_1$1), {
                          value: pluginConfig[key],
                          "onUpdate:value": ($event) => pluginConfig[key] = $event
                        }, null, 8, ["value", "onUpdate:value"])
                      ]),
                      _: 2
                    }, 1032, ["label"]);
                  }), 128))
                ]),
                _: 1
              }, 8, ["model"])
            ])) : createCommentVNode("", true)
          ]),
          _: 1
        }, 8, ["show"])
      ]);
    };
  }
});
const plugin = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1e5a044d"]]);
export {
  plugin as default
};
