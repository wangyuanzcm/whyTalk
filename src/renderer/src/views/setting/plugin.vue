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
  useMessage
} from 'naive-ui'
import { Download, Delete, Setting } from '@icon-park/vue-next'
import PluginAPI, { type PluginInfo } from '@/api/plugin'

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

// 远程下载相关
const showRemoteModal = ref(false)
const remoteForm = reactive({
  url: '',
  name: '',
  description: ''
})

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
    if (result.success && result.filePath) {
      await installLocalPlugin(result.filePath)
    } else {
      message.error(result.error || '文件选择失败')
    }
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

// 远程安装插件
const installFromRemote = async () => {
  if (!remoteForm.url) {
    message.error('请输入下载地址')
    return
  }

  uploadLoading.value = true
  try {
    const result = await PluginAPI.installRemotePlugin(remoteForm.url)
    if (result.success) {
      message.success('插件安装成功')
      showRemoteModal.value = false
      Object.assign(remoteForm, { url: '', name: '', description: '' })
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
        <n-button type="info" @click="showRemoteModal = true">
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
            <p class="plugin-type">类型: {{ plugin.type }}</p>
          </div>

          <template #action>
            <n-space>
              <n-switch
                :value="plugin.enabled"
                size="small"
                @update:value="() => togglePlugin(plugin)"
              />
              <n-button
                v-if="plugin.config?.ui?.settings"
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
          <p>请选择插件zip文件进行安装：</p>
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
    <n-modal v-model:show="showRemoteModal" preset="dialog" title="远程安装插件">
      <n-form :model="remoteForm" label-placement="left" label-width="80px">
        <n-form-item label="下载地址" required>
          <n-input v-model:value="remoteForm.url" placeholder="请输入插件zip文件的下载地址" />
        </n-form-item>
        <n-form-item label="插件名称">
          <n-input v-model:value="remoteForm.name" placeholder="可选，插件显示名称" />
        </n-form-item>
        <n-form-item label="插件描述">
          <n-input
            v-model:value="remoteForm.description"
            placeholder="可选，插件描述信息"
            type="textarea"
            :rows="3"
          />
        </n-form-item>
      </n-form>
      <template #action>
        <n-space>
          <n-button @click="showRemoteModal = false">取消</n-button>
          <n-button type="primary" :loading="uploadLoading" @click="installFromRemote">
            安装
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
.title {
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: 600;
}

.action-buttons {
  margin-bottom: 20px;
}

.plugin-section {
  margin-bottom: 30px;

  h4 {
    margin-bottom: 16px;
    font-size: 16px;
    font-weight: 500;
  }
}

.plugin-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
}

.plugin-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border-color: #18a058;
  }

  .plugin-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .plugin-name {
      font-size: 16px;
      font-weight: 600;
      color: #333;
    }
  }

  .plugin-content {
    .plugin-description {
      color: #666;
      font-size: 14px;
      line-height: 1.5;
      margin-bottom: 12px;
    }

    .plugin-info {
      display: flex;
      gap: 16px;
      font-size: 12px;
      color: #999;
      margin-bottom: 8px;
    }

    .plugin-type {
      font-size: 12px;
      color: #666;
    }
  }
}

.empty-state {
  text-align: center;
  padding: 40px;
  color: #999;
}

.upload-content {
  padding: 20px;
  text-align: center;

  p {
    margin-bottom: 16px;
    color: #666;
  }
}

.install-progress {
  text-align: center;
  padding: 20px;

  .progress-info {
    margin-bottom: 16px;

    p {
      font-size: 14px;
      color: #666;
      margin: 0;
    }
  }
}

.install-result {
  text-align: center;
  padding: 20px;

  .result-message {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 16px;

    &.success {
      color: #18a058;
    }

    &.error {
      color: #d03050;
    }
  }

  .success-note {
    p {
      font-size: 14px;
      color: #666;
      margin: 0;
    }
  }

  .error-actions {
    margin-top: 20px;
    display: flex;
    gap: 12px;
    justify-content: center;
  }
}
</style>
