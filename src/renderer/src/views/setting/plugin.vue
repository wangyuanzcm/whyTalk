<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import {
  NButton,
  NCard,
  NInput,
  NTag,
  NModal,
  NForm,
  NFormItem,
  NSwitch,
  NSpace,
  NPopconfirm,
  NSelect,
  NList,
  NListItem,
  NThing,
  useMessage
} from 'naive-ui'
import { Download, Delete, Setting } from '@icon-park/vue-next'
import PluginAPI, { type PluginInfo } from '@/api/plugin'
import npmPluginsConfig from '@/config/npm-plugins.json'

const message = useMessage()

// 插件列表
const plugins = ref<PluginInfo[]>([])
const loading = ref(false)

// 上传相关
const showUploadModal = ref(false)
const uploadLoading = ref(false)
const installProgress = ref(0)
const installStep = ref('')
const installResult = ref<{ success: boolean; message: string } | null>(null)

// 远程安装相关
const showRemoteModal = ref(false)
const remoteForm = reactive({
  url: '',
  name: '',
  description: ''
})

// NPM插件列表相关
interface NpmPluginConfig {
  id: string
  name: string
  description: string
  packageName: string
  version: string
  author: string
  category: string
  tags: string[]
}

const npmPluginsList = ref<NpmPluginConfig[]>(npmPluginsConfig.npmPlugins)
const selectedNpmRegistry = ref('https://registry.npmjs.org/')
const installingPluginId = ref<string | null>(null)

// 远程插件配置相关
const remoteConfigUrl = ref('')
const loadingRemoteConfig = ref(false)
const showConfigUrlModal = ref(false)

// npm源预设
const npmRegistries = [
  { label: 'npm官方源', value: 'https://registry.npmjs.org/' },
  { label: '淘宝源', value: 'https://registry.npmmirror.com/' },
  { label: 'cnpm源', value: 'https://r.cnpmjs.org/' },
  { label: '华为云源', value: 'https://mirrors.huaweicloud.com/repository/npm/' }
]

// 插件配置相关
const showConfigModal = ref(false)
const currentPlugin = ref<PluginInfo | null>(null)
const pluginConfig = reactive({})

// 加载已安装的插件
const loadInstalledPlugins = async () => {
  loading.value = true
  try {
    console.log('开始调用 PluginAPI.listPlugins()')
    const result = await PluginAPI.listPlugins()
    console.log('PluginAPI.listPlugins() 返回结果:', result)

    if (result.success && result.plugins) {
      plugins.value = result.plugins
      console.log('插件列表加载成功，插件数量:', result.plugins.length)
    } else {
      console.error('插件列表加载失败:', result.error)
      message.error(result.error || '加载插件列表失败')
    }
  } catch (error: any) {
    console.error('加载插件失败:', error)
    console.error('错误堆栈:', error.stack)
    message.error(`加载插件列表失败: ${error.message}`)
  } finally {
    loading.value = false
  }
}

// 切换插件状态
const togglePlugin = async (plugin: PluginInfo) => {
  try {
    const result = plugin.enabled
      ? await PluginAPI.disablePlugin(plugin.id)
      : await PluginAPI.enablePlugin(plugin.id)

    if (result.success) {
      plugin.enabled = !plugin.enabled
      message.success(`插件已${plugin.enabled ? '启用' : '禁用'}`)
    } else {
      message.error(result.error || '操作失败')
    }
  } catch (error: any) {
    message.error(`操作失败: ${error.message}`)
  }
}

// 卸载插件
const uninstallPlugin = async (plugin: PluginInfo) => {
  try {
    const result = await PluginAPI.uninstallPlugin(plugin.id)
    if (result.success) {
      message.success('插件卸载成功')
      await loadInstalledPlugins()
    } else {
      message.error(result.error || '卸载失败')
    }
  } catch (error: any) {
    message.error(`卸载失败: ${error.message}`)
  }
}

// 配置插件
const configurePlugin = async (plugin: PluginInfo) => {
  try {
    const result = await PluginAPI.getPluginConfig(plugin.id)
    if (result.success) {
      currentPlugin.value = plugin
      Object.assign(pluginConfig, result.config || {})
      showConfigModal.value = true
    } else {
      message.error(result.error || '获取配置失败')
    }
  } catch (error: any) {
    message.error(`获取配置失败: ${error.message}`)
  }
}

// 保存插件配置
const savePluginConfig = async () => {
  if (!currentPlugin.value) return

  try {
    const result = await PluginAPI.setPluginConfig(currentPlugin.value.id, pluginConfig)
    if (result.success) {
      message.success('配置保存成功')
      showConfigModal.value = false
    } else {
      message.error(result.error || '保存失败')
    }
  } catch (error: any) {
    message.error(`保存失败: ${error.message}`)
  }
}

// 处理文件上传
const handleFileUpload = async () => {
  try {
    const result = await PluginAPI.selectLocalFile()
    console.log(result, 'result===')
    if (result.success && result.filePath) {
      await installLocalPlugin(result.filePath)
    } else if (result.error && result.error !== '用户取消选择') {
      // 只有在非用户取消的情况下才显示错误信息
      message.error(result.error || '文件选择失败')
    }
    // 用户取消选择时不显示任何信息
  } catch (error: any) {
    message.error(`文件选择失败: ${error.message}`)
  }
}

// 安装本地插件
const installLocalPlugin = async (filePath: string) => {
  uploadLoading.value = true
  installStep.value = '正在安装插件...'
  installProgress.value = 0

  try {
    const result = await PluginAPI.installLocalPlugin(filePath)
    if (result.success) {
      installResult.value = {
        success: true,
        message: '插件安装成功！'
      }
      setTimeout(() => {
        showUploadModal.value = false
        resetInstallState()
        loadInstalledPlugins()
      }, 2000)
    } else {
      installResult.value = {
        success: false,
        message: result.error || '安装失败'
      }
    }
  } catch (error: any) {
    installResult.value = {
      success: false,
      message: `安装失败: ${error.message}`
    }
  } finally {
    uploadLoading.value = false
  }
}

/**
 * 从远程URL加载插件配置
 */
const loadRemotePluginConfig = async () => {
  if (!remoteConfigUrl.value) {
    message.error('请输入远程配置URL')
    return
  }

  loadingRemoteConfig.value = true
  try {
    const response = await fetch(remoteConfigUrl.value)
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const configData = await response.json()
    if (configData.npmPlugins && Array.isArray(configData.npmPlugins)) {
      npmPluginsList.value = configData.npmPlugins
      message.success(`成功加载 ${configData.npmPlugins.length} 个插件配置`)
      showConfigUrlModal.value = false
    } else {
      message.error('远程配置格式不正确，缺少 npmPlugins 数组')
    }
  } catch (error: any) {
    message.error(`加载远程配置失败: ${error.message}`)
  } finally {
    loadingRemoteConfig.value = false
  }
}

/**
 * 重置为本地配置
 */
const resetToLocalConfig = () => {
  npmPluginsList.value = npmPluginsConfig.npmPlugins
  message.success('已重置为本地配置')
}

// 从NPM插件列表安装插件
const installNpmPlugin = async (plugin: NpmPluginConfig) => {
  installingPluginId.value = plugin.id
  try {
    const result = await PluginAPI.installNpmPlugin(plugin.packageName, selectedNpmRegistry.value)
    if (result.success) {
      message.success(`插件 ${plugin.name} 安装成功`)
      showRemoteModal.value = false
      await loadInstalledPlugins()
    } else {
      message.error(result.error || '安装失败')
    }
  } catch (error: any) {
    message.error(`安装失败: ${error.message}`)
  } finally {
    installingPluginId.value = null
  }
}

// 从URL安装插件
const installFromUrl = async () => {
  if (!remoteForm.url) {
    message.error('请输入下载地址')
    return
  }

  uploadLoading.value = true
  try {
    const result = await PluginAPI.installRemotePlugin(remoteForm.url, selectedNpmRegistry.value)
    if (result.success) {
      message.success('插件安装成功')
      showRemoteModal.value = false
      Object.assign(remoteForm, {
        url: '',
        name: '',
        description: ''
      })
      await loadInstalledPlugins()
    } else {
      message.error(result.error || '安装失败')
    }
  } catch (error: any) {
    message.error(`安装失败: ${error.message}`)
  } finally {
    uploadLoading.value = false
  }
}

// 重置安装状态
const resetInstallState = () => {
  uploadLoading.value = false
  installProgress.value = 0
  installStep.value = ''
  installResult.value = null
}

// 获取插件状态颜色
const getStatusColor = (enabled: boolean) => {
  return enabled ? 'success' : 'default'
}

// 获取插件状态文本
const getStatusText = (enabled: boolean) => {
  return enabled ? '已启用' : '已禁用'
}

// 获取插件类型显示文本
const getPluginTypeText = (type: string) => {
  switch (type) {
    case 'system':
      return '系统插件'
    case 'frontend':
      return '前端插件'
    case 'cubeModule':
      return 'CubeModule插件'
    case 'unified':
      return '统一插件'
    default:
      return type
  }
}

// 检查插件是否有设置配置
const hasPluginSettings = (plugin: PluginInfo) => {
  // 系统插件的设置
  if (plugin.config?.ui?.settings) {
    return true
  }
  // CubeModule插件的设置
  if (plugin.type === 'cubeModule' || plugin.type === 'unified') {
    return plugin.config?.frontend?.settings || plugin.config?.backend?.functions
  }
  return false
}

onMounted(() => {
  loadInstalledPlugins()
})
</script>

<template>
  <section>
    <h3 class="title">插件管理</h3>

    <!-- 操作按钮 -->
    <div class="action-buttons">
      <n-space>
        <n-button type="primary" @click="showUploadModal = true">
          <template #icon>
            <Download />
          </template>
          本地安装
        </n-button>
        <n-button type="primary" @click="showRemoteModal = true">
          <template #icon>
            <Download />
          </template>
          远程安装
        </n-button>
        <n-button :loading="loading" @click="loadInstalledPlugins"> 刷新列表 </n-button>
      </n-space>
    </div>

    <!-- 已安装插件列表 -->
    <div class="plugin-section">
      <h4>已安装插件</h4>
      <div v-if="plugins.length > 0" class="plugin-grid">
        <n-card v-for="plugin in plugins" :key="plugin.id" class="plugin-card" hoverable>
          <template #header>
            <div class="plugin-header">
              <span class="plugin-name">{{ plugin.config?.name || plugin.id }}</span>
              <n-tag :type="getStatusColor(plugin.enabled)" size="small">
                {{ getStatusText(plugin.enabled) }}
              </n-tag>
            </div>
          </template>

          <div class="plugin-content">
            <p class="plugin-description">{{ plugin.config?.description || '无描述' }}</p>
            <p class="plugin-info">
              <span>版本: {{ plugin.config?.version || '未知' }}</span>
              <span>作者: {{ plugin.config?.author || '未知' }}</span>
            </p>
            <p class="plugin-type">类型: {{ getPluginTypeText(plugin.type) }}</p>
          </div>

          <template #action>
            <n-space>
              <n-switch
                :value="plugin.enabled"
                size="small"
                @update:value="() => togglePlugin(plugin)"
              />
              <n-button
                v-if="hasPluginSettings(plugin)"
                size="small"
                @click="configurePlugin(plugin)"
              >
                <template #icon>
                  <Setting />
                </template>
                配置
              </n-button>
              <n-popconfirm
                positive-text="确认"
                negative-text="取消"
                @positive-click="uninstallPlugin(plugin)"
              >
                <template #trigger>
                  <n-button size="small" type="error">
                    <template #icon>
                      <Delete />
                    </template>
                    卸载
                  </n-button>
                </template>
                确定要卸载插件 "{{ plugin.config?.name || plugin.id }}" 吗？
              </n-popconfirm>
            </n-space>
          </template>
        </n-card>
      </div>
      <div v-else class="empty-state">
        <p>暂无已安装的插件</p>
      </div>
    </div>

    <!-- 本地上传模态框 -->
    <n-modal
      v-model:show="showUploadModal"
      preset="dialog"
      title="本地安装插件"
      :mask-closable="!uploadLoading"
    >
      <div class="upload-content">
        <div v-if="!uploadLoading && !installResult">
          <p>请选择插件文件进行安装（支持 .tgz、.tar.gz、.zip 格式）：</p>
          <n-button type="primary" @click="handleFileUpload"> 选择插件文件 </n-button>
        </div>

        <!-- 安装进度 -->
        <div v-if="uploadLoading" class="install-progress">
          <div class="progress-info">
            <p>{{ installStep }}</p>
          </div>
        </div>

        <!-- 安装结果 -->
        <div v-if="installResult" class="install-result">
          <p
            class="result-message"
            :class="{ success: installResult.success, error: !installResult.success }"
          >
            {{ installResult.message }}
          </p>
          <div v-if="installResult.success" class="success-note">
            <p>插件已成功安装到系统中，窗口将在几秒后自动关闭</p>
          </div>
          <div v-else class="error-actions">
            <n-button type="primary" @click="resetInstallState"> 重新安装 </n-button>
            <n-button
              quaternary
              @click="
                () => {
                  showUploadModal = false
                  resetInstallState()
                }
              "
            >
              关闭
            </n-button>
          </div>
        </div>
      </div>
    </n-modal>

    <!-- 远程安装模态框 -->
    <n-modal v-model:show="showRemoteModal" preset="card" title="远程安装插件" style="width: 800px">
      <n-space vertical size="large">
        <!-- 配置管理 -->
        <div>
          <h4 style="margin-bottom: 16px">配置管理</h4>
          <n-space>
            <n-button type="info" @click="showConfigUrlModal = true"> 配置远程URL </n-button>
            <n-button @click="resetToLocalConfig"> 重置为本地配置 </n-button>
            <span style="color: #666; font-size: 12px">
              当前插件数量: {{ npmPluginsList.length }}
            </span>
          </n-space>
        </div>

        <!-- NPM源选择 -->
        <n-form-item label="NPM下载源">
          <n-select
            v-model:value="selectedNpmRegistry"
            :options="npmRegistries"
            placeholder="选择NPM源"
          />
        </n-form-item>

        <!-- 可用NPM插件列表 -->
        <div>
          <h4 style="margin-bottom: 16px">可用NPM插件</h4>
          <n-list bordered>
            <n-list-item v-for="plugin in npmPluginsList" :key="plugin.id">
              <n-thing>
                <template #header>
                  <n-space align="center">
                    <span style="font-weight: 600">{{ plugin.name }}</span>
                    <n-tag size="small" type="info">{{ plugin.category }}</n-tag>
                    <n-tag v-for="tag in plugin.tags" :key="tag" size="small">{{ tag }}</n-tag>
                  </n-space>
                </template>
                <template #description>
                  <div style="margin-bottom: 8px">{{ plugin.description }}</div>
                  <n-space size="small">
                    <span style="color: #666">包名: {{ plugin.packageName }}</span>
                    <span style="color: #666">版本: {{ plugin.version }}</span>
                    <span style="color: #666">作者: {{ plugin.author }}</span>
                  </n-space>
                </template>
                <template #action>
                  <n-button
                    type="primary"
                    size="small"
                    :loading="installingPluginId === plugin.id"
                    @click="installNpmPlugin(plugin)"
                  >
                    安装
                  </n-button>
                </template>
              </n-thing>
            </n-list-item>
          </n-list>
        </div>

        <!-- 自定义URL安装 -->
        <div>
          <h4 style="margin-bottom: 16px">自定义URL安装</h4>
          <n-form :model="remoteForm" label-placement="left" label-width="auto">
            <n-form-item label="下载地址" path="url">
              <n-input v-model:value="remoteForm.url" placeholder="请输入插件下载地址" />
            </n-form-item>
            <n-form-item>
              <n-button type="primary" :loading="uploadLoading" @click="installFromUrl">
                从URL安装
              </n-button>
            </n-form-item>
          </n-form>
        </div>
      </n-space>

      <template #action>
        <n-button @click="showRemoteModal = false">关闭</n-button>
      </template>
    </n-modal>

    <!-- 远程配置URL模态框 -->
    <n-modal v-model:show="showConfigUrlModal" preset="dialog" title="配置远程插件列表">
      <n-space vertical size="medium">
        <div>
          <p style="margin-bottom: 12px; color: #666">
            输入远程JSON配置文件的URL地址，格式应包含 npmPlugins 数组。
          </p>
          <n-input
            v-model:value="remoteConfigUrl"
            placeholder="https://example.com/plugins-config.json"
            type="textarea"
            :rows="3"
          />
        </div>

        <div style="background: #f5f5f5; padding: 12px; border-radius: 6px; font-size: 12px">
          <strong>配置文件格式示例：</strong>
          <pre style="margin: 8px 0; white-space: pre-wrap">
{
  "npmPlugins": [
    {
      "id": "plugin-1",
      "name": "插件名称",
      "description": "插件描述",
      "packageName": "@scope/package-name",
      "version": "latest",
      "author": "作者",
      "category": "分类",
      "tags": ["标签1", "标签2"]
    }
  ]
}</pre
          >
        </div>
      </n-space>

      <template #action>
        <n-space>
          <n-button @click="showConfigUrlModal = false">取消</n-button>
          <n-button type="primary" :loading="loadingRemoteConfig" @click="loadRemotePluginConfig">
            加载配置
          </n-button>
        </n-space>
      </template>
    </n-modal>

    <!-- 插件配置模态框 -->
    <n-modal v-model:show="showConfigModal" preset="dialog" title="插件配置">
      <div v-if="currentPlugin">
        <h4>{{ currentPlugin.config?.name || currentPlugin.id }} 配置</h4>
        <n-form :model="pluginConfig" label-placement="left" label-width="120px">
          <n-form-item v-for="(_, key) in pluginConfig" :key="key" :label="key">
            <n-input v-model:value="pluginConfig[key]" />
          </n-form-item>
        </n-form>
      </div>
      <template #action>
        <n-space>
          <n-button @click="showConfigModal = false">取消</n-button>
          <n-button type="primary" @click="savePluginConfig"> 保存配置 </n-button>
        </n-space>
      </template>
    </n-modal>
  </section>
</template>

<style lang="less" scoped>
@import '@/styles/theme/index.less';

.title {
  margin: 0 0 var(--spacing-xl) 0;
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  line-height: var(--line-height-tight);
}

.action-buttons {
  margin-bottom: var(--spacing-xl);

  :deep(.n-space) {
    gap: var(--spacing-md);

    .n-button {
      border-radius: var(--border-radius-md);
      font-weight: var(--font-weight-medium);
      transition: all var(--transition-base);
      padding: var(--spacing-sm);

      &.n-button--primary-type {
        background: var(--color-primary);
        border: none;

        &:hover {
          background: var(--color-primary-hover);
          transform: translateY(-1px);
          .card-shadow();
        }
      }

      &:not(.n-button--primary-type) {
        border: 1px solid var(--color-border-light);
        background: var(--color-bg-content);
        color: var(--color-text-primary);

        &:hover {
          border-color: var(--color-primary-light);
          background: var(--color-bg-hover);
        }
      }
    }
  }
}

.plugin-section {
  margin-bottom: var(--spacing-xxl);

  h4 {
    margin: 0 0 var(--spacing-lg) 0;
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text-primary);
    line-height: var(--line-height-tight);
  }
}

.plugin-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: var(--spacing-lg);
  width: 100%;
}

.plugin-card {
  min-width: 350px; /* 设置卡片最小宽度，确保内容显示完整 */

  border: 1px solid var(--color-border-light);
  border-radius: var(--border-radius-lg);
  transition: all var(--transition-base);
  background: var(--color-bg-content);
  overflow: hidden;
  .card-shadow();

  &:hover {
    .card-shadow-hover();
    border-color: var(--color-primary-light);
    transform: translateY(-2px);
  }

  :deep(.n-card-header) {
    padding: var(--spacing-lg);
    border-bottom: 1px solid var(--color-border-light);
    background: var(--color-bg-secondary);
  }

  :deep(.n-card__content) {
    padding: var(--spacing-lg);
  }

  :deep(.n-card__action) {
    padding: var(--spacing-md) var(--spacing-lg);
    background: var(--color-bg-secondary);
    border-top: 1px solid var(--color-border-light);
  }

  .plugin-header {
    .flex-center();
    justify-content: space-between;

    .plugin-name {
      font-size: var(--font-size-md);
      font-weight: var(--font-weight-semibold);
      color: var(--color-text-primary);
      .text-ellipsis();
      flex: 1;
      margin-right: var(--spacing-md);
    }

    :deep(.n-tag) {
      border-radius: var(--border-radius-full);
      font-size: var(--font-size-xs);
      font-weight: var(--font-weight-medium);
      padding: var(--spacing-sm) var(--spacing-md);
    }
  }

  .plugin-content {
    .plugin-description {
      color: var(--color-text-secondary);
      font-size: var(--font-size-sm);
      line-height: var(--line-height-relaxed);
      margin-bottom: var(--spacing-md);
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .plugin-info {
      .flex-row();
      flex-wrap: wrap;
      gap: var(--spacing-lg);
      font-size: var(--font-size-xs);
      color: var(--color-text-tertiary);
      margin-bottom: var(--spacing-sm);

      span {
        .text-ellipsis();
        flex: 1;
        min-width: 0; /* 确保flex项目能够收缩 */
      }
    }

    .plugin-type {
      font-size: var(--font-size-xs);
      color: var(--color-text-tertiary);
      background: var(--color-bg-tag);
      padding: var(--spacing-xs) var(--spacing-sm);
      border-radius: var(--border-radius-sm);
      display: inline-block;
    }
  }

  :deep(.n-space) {
    gap: var(--spacing-sm);

    .n-button {
      border-radius: var(--border-radius-md);
      font-size: var(--font-size-xs);
      padding: var(--spacing-xs) var(--spacing-sm);
      transition: all var(--transition-base);
      border: 1px solid transparent;

      &.n-button--error-type {
        background: var(--color-error);
        color: var(--color-white);
        border-color: var(--color-error);

        &:hover:not(:disabled) {
          background: var(--color-accent-hover);
          border-color: var(--color-accent-hover);
          transform: translateY(-1px);
          .card-shadow();
        }
      }

      &:hover {
        transform: translateY(-1px);
      }
    }
  }
}

.empty-state {
  text-align: center;
  padding: var(--spacing-xxl);
  color: var(--color-text-secondary);
  background: var(--color-bg-secondary);
  border-radius: var(--border-radius-lg);
  border: 1px solid var(--color-border-light);

  .empty-icon {
    font-size: var(--icon-size-xl);
    color: var(--color-text-tertiary);
    margin-bottom: var(--spacing-md);
  }

  .empty-text {
    font-size: var(--font-size-md);
    margin-bottom: var(--spacing-sm);
  }

  .empty-desc {
    font-size: var(--font-size-sm);
    color: var(--color-text-tertiary);
  }
}

.upload-content {
  padding: var(--spacing-xl);
  text-align: center;

  p {
    margin-bottom: var(--spacing-lg);
    color: var(--color-text-secondary);
    font-size: var(--font-size-sm);
    line-height: var(--line-height-relaxed);
  }

  :deep(.n-upload) {
    .n-upload-trigger {
      border: 2px dashed var(--color-border-light);
      border-radius: var(--border-radius-lg);
      padding: var(--spacing-xl);
      transition: all var(--transition-base);

      &:hover {
        border-color: var(--color-primary);
        background: var(--color-primary-light);
      }
    }
  }
}

.install-progress {
  text-align: center;
  padding: var(--spacing-xl);

  .progress-info {
    margin-bottom: var(--spacing-lg);

    p {
      font-size: var(--font-size-sm);
      color: var(--color-text-secondary);
      margin: 0 0 var(--spacing-xs) 0;
      line-height: var(--line-height-normal);
    }
  }

  :deep(.n-progress) {
    margin-bottom: var(--spacing-md);
  }
}

.install-result {
  text-align: center;
  padding: var(--spacing-xl);

  .result-message {
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-semibold);
    margin-bottom: var(--spacing-lg);
    line-height: var(--line-height-tight);

    &.success {
      color: var(--color-success);
    }

    &.error {
      color: var(--color-error);
    }
  }

  .success-note {
    p {
      font-size: var(--font-size-sm);
      color: var(--color-text-secondary);
      margin: 0;
      line-height: var(--line-height-relaxed);
    }
  }

  .error-actions {
    margin-top: var(--spacing-xl);
    .flex-center();
    gap: var(--spacing-md);
  }
}

// 模态框样式优化
:deep(.n-modal) {
  .n-card {
    border-radius: var(--border-radius-lg);
    .card-shadow-modal();
  }

  .n-card-header {
    background: var(--color-bg-header);
    border-bottom: 1px solid var(--color-border-light);

    .n-card-header__main {
      font-weight: var(--font-weight-semibold);
      color: var(--color-text-primary);
    }
  }

  .n-form {
    .n-form-item {
      margin-bottom: var(--spacing-lg);

      .n-form-item-label {
        font-weight: var(--font-weight-medium);
        color: var(--color-text-primary);
      }

      .n-input {
        border-radius: var(--border-radius-md);
        transition: all var(--transition-base);

        &:hover {
          border-color: var(--color-primary-light);
        }

        &:focus-within {
          border-color: var(--color-primary);
          .card-shadow();
        }
      }

      .n-select {
        .n-base-selection {
          border-radius: var(--border-radius-md);
          transition: all var(--transition-base);

          &:hover {
            border-color: var(--color-primary-light);
          }

          &.n-base-selection--focus {
            border-color: var(--color-primary);
            .card-shadow();
          }
        }
      }
    }
  }
}

// 响应式设计
.title {
  .font-responsive(var(--font-size-lg), var(--font-size-xl));
}

.plugin-grid {
  .grid-responsive();
}

// 大屏幕优化
.desktop-up(@breakpoint-xl) {
  .plugin-grid {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: var(--spacing-xl);
    width: 100%;
  }
}

// 桌面端优化
.desktop-only() {
  .plugin-grid {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: var(--spacing-lg);
    width: 100%;
  }
}

// 平板端优化
.tablet-only() {
  .title {
    font-size: var(--font-size-lg);
    margin-bottom: var(--spacing-lg);
  }

  .action-buttons {
    margin-bottom: var(--spacing-sm);

    :deep(.n-space) {
      .flex-row();
      flex-wrap: wrap;
      gap: var(--spacing-md);

      .n-button {
        flex: 1;
        min-width: 120px;
        padding: var(--spacing-sm);
      }
    }
  }

  .plugin-grid {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: var(--spacing-md);
    width: 100%;
  }

  .plugin-card {
    min-width: 300px; /* 平板端设置卡片最小宽度 */
    .plugin-header {
      .flex-column();
      align-items: flex-start;
      gap: var(--spacing-sm);

      .plugin-name {
        margin-right: 0;
        font-size: var(--font-size-sm);
      }
    }

    .plugin-content {
      .plugin-description {
        font-size: var(--font-size-xs);
      }

      .plugin-info {
        font-size: var(--font-size-xs);
      }
    }
  }
}

// 暗色主题适配
:global([data-theme='dark']) {
  .title {
    color: var(--color-text-primary-dark);
  }

  .action-buttons {
    :deep(.n-space) {
      .n-button {
        &.n-button--primary-type {
          background: var(--color-primary-dark);

          &:hover {
            background: var(--color-primary-dark-hover);
          }
        }

        &:not(.n-button--primary-type) {
          border-color: var(--color-border-dark);
          background: var(--color-bg-content-dark);
          color: var(--color-text-primary-dark);

          &:hover {
            border-color: var(--color-primary-dark-light);
            background: var(--color-bg-hover-dark);
          }
        }
      }
    }
  }

  .plugin-section {
    h4 {
      color: var(--color-text-primary-dark);
    }
  }

  .plugin-card {
    border-color: var(--color-border-dark);
    background: var(--color-bg-content-dark);

    &:hover {
      border-color: var(--color-primary-dark-light);
    }

    :deep(.n-card-header) {
      border-bottom-color: var(--color-border-dark);
      background: var(--color-bg-secondary-dark);
    }

    :deep(.n-card__action) {
      background: var(--color-bg-secondary-dark);
      border-top-color: var(--color-border-dark);
    }

    .plugin-header {
      .plugin-name {
        color: var(--color-text-primary-dark);
      }
    }

    .plugin-content {
      .plugin-description {
        color: var(--color-text-secondary-dark);
      }

      .plugin-info {
        color: var(--color-text-tertiary-dark);
      }

      .plugin-type {
        color: var(--color-text-tertiary-dark);
        background: var(--color-bg-tag-dark);
      }
    }
  }

  .empty-state {
    color: var(--color-text-secondary-dark);
    background: var(--color-bg-secondary-dark);
    border-color: var(--color-border-dark);

    .empty-icon {
      color: var(--color-text-tertiary-dark);
    }

    .empty-desc {
      color: var(--color-text-tertiary-dark);
    }
  }

  .upload-content,
  .install-progress,
  .install-result {
    p {
      color: var(--color-text-secondary-dark);
    }

    .success-note p {
      color: var(--color-text-secondary-dark);
    }
  }

  .install-result {
    .result-message {
      &.success {
        color: var(--color-success-dark);
      }

      &.error {
        color: var(--color-error-dark);
      }
    }
  }
}
</style>
