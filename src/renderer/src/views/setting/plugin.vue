<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { NButton, NCard, NInput, NTag, NModal, NForm, NFormItem, NSwitch, NSpace, NPopconfirm, useMessage } from 'naive-ui'
import { Download, Delete, Setting } from '@icon-park/vue-next'
import PluginAPI, { type PluginInfo } from '@/api/plugin'
const message = useMessage()

// 插件列表
const plugins = ref<PluginInfo[]>([])
const loading = ref(false)


// 上传相关
const showUploadModal = ref(false)
const uploadLoading = ref(false)
// const installing = ref(false) // 暂时注释掉未使用的变量

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

// 插件市场
const marketPlugins = ref([
  {
    id: 'weather-plugin',
    name: '天气插件',
    description: '获取实时天气信息',
    author: 'WeatherTeam',
    version: '1.0.0',
    downloadUrl: 'https://example.com/plugins/weather.zip',
    category: '工具',
    rating: 4.5,
    downloads: 1250
  },
  {
    id: 'translator-plugin',
    name: '翻译插件',
    description: '多语言翻译工具',
    author: 'TranslateTeam',
    version: '2.1.0',
    downloadUrl: 'https://example.com/plugins/translator.zip',
    category: '工具',
    rating: 4.8,
    downloads: 2100
  },
  {
    id: 'note-plugin',
    name: '笔记插件',
    description: '快速记录和管理笔记',
    author: 'NoteTeam',
    version: '1.5.0',
    downloadUrl: 'https://example.com/plugins/note.zip',
    category: '效率',
    rating: 4.3,
    downloads: 890
  }
])

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

// 处理本地文件上传
const handleFileUpload = async () => {
  uploadLoading.value = true
  try {
    // 选择本地文件
    const fileResult = await PluginAPI.selectLocalFile()
    if (!fileResult.success || !fileResult.filePath) {
      if (fileResult.error !== '用户取消选择') {
        message.error(fileResult.error || '选择文件失败')
      }
      return
    }

    const result = await PluginAPI.installLocalPlugin(fileResult.filePath)

    if (result.success) {
      message.success('插件安装成功')
      showUploadModal.value = false
      await loadInstalledPlugins()
    } else {
      message.error(result.error || '插件安装失败')
    }
  } catch (error: any) {
    console.error('安装插件失败:', error)
    message.error('安装插件失败')
  } finally {
    uploadLoading.value = false
  }
}

// 从远程URL安装插件
const installFromRemote = async () => {
  if (!remoteForm.url.trim()) {
    message.error('请输入插件下载地址')
    return
  }

  uploadLoading.value = true
  try {
    const result = await PluginAPI.installRemotePlugin(remoteForm.url.trim())

    if (result.success) {
      message.success('插件安装成功')
      showRemoteModal.value = false
      remoteForm.url = ''
      remoteForm.name = ''
      remoteForm.description = ''
      await loadInstalledPlugins()
    } else {
      message.error(result.error || '插件安装失败')
    }
  } catch (error: any) {
    console.error('安装插件失败:', error)
    message.error('安装插件失败')
  } finally {
    uploadLoading.value = false
  }
}

// 从市场安装插件
const installFromMarket = async (plugin: any) => {
  uploadLoading.value = true
  try {
    const result = await PluginAPI.installRemotePlugin(plugin.downloadUrl)

    if (result.success) {
      message.success(`插件 "${plugin.name}" 安装成功`)
      await loadInstalledPlugins()
    } else {
      message.error(result.error || '插件安装失败')
    }
  } catch (error: any) {
    console.error('安装插件失败:', error)
    message.error('安装插件失败')
  } finally {
    uploadLoading.value = false
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
      message.error(result.error || '插件卸载失败')
    }
  } catch (error: any) {
    console.error('卸载插件失败:', error)
    message.error('卸载插件失败')
  }
}

// 切换插件启用状态
const togglePlugin = async (plugin: PluginInfo) => {
  const newEnabled = !plugin.enabled
  try {
    const result = newEnabled
      ? await PluginAPI.enablePlugin(plugin.id)
      : await PluginAPI.disablePlugin(plugin.id)

    if (result.success) {
      plugin.enabled = newEnabled
      message.success(`插件已${newEnabled ? '启用' : '禁用'}`)
    } else {
      message.error(result.error || `${newEnabled ? '启用' : '禁用'}插件失败`)
    }
  } catch (error: any) {
    console.error('切换插件状态失败:', error)
    message.error('操作失败')
  }
}

// 配置插件
const configurePlugin = async (plugin: PluginInfo) => {
  try {
    currentPlugin.value = plugin

    // 获取插件配置
    const result = await PluginAPI.getPluginConfig(plugin.id)
    if (result.success && result.config) {
      Object.assign(pluginConfig, result.config)
    } else {
      Object.assign(pluginConfig, {})
    }

    showConfigModal.value = true
  } catch (error: any) {
    console.error('获取插件配置失败:', error)
    message.error('获取插件配置失败')
  }
}

// 保存插件配置
const savePluginConfig = async () => {
  try {
    if (!currentPlugin.value) return

    const result = await PluginAPI.setPluginConfig(currentPlugin.value.id, pluginConfig)

    if (result.success) {
      message.success('配置保存成功')
      showConfigModal.value = false
    } else {
      message.error(result.error || '保存配置失败')
    }
  } catch (error: any) {
    console.error('保存配置失败:', error)
    message.error('保存配置失败')
  }
}

// 获取插件状态颜色
const getStatusColor = (enabled) => {
  return enabled ? 'success' : 'default'
}

// 获取插件状态文本
const getStatusText = (enabled) => {
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
        <n-button @click="loadInstalledPlugins" :loading="loading">
          刷新列表
        </n-button>
      </n-space>
    </div>

    <!-- 已安装插件列表 -->
    <div class="plugin-section">
      <h4>已安装插件</h4>
      <div class="plugin-grid" v-if="plugins.length > 0">
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
              <n-switch :value="plugin.enabled" @update:value="() => togglePlugin(plugin)" size="small" />
              <n-button size="small" @click="configurePlugin(plugin)" v-if="plugin.config?.ui?.settings">
                <template #icon>
                  <Setting />
                </template>
                配置
              </n-button>
              <n-popconfirm @positive-click="uninstallPlugin(plugin)" positive-text="确认" negative-text="取消">
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

    <!-- 插件市场 -->
    <div class="plugin-section">
      <h4>插件市场</h4>
      <div class="plugin-grid">
        <n-card v-for="plugin in marketPlugins" :key="plugin.id" class="plugin-card market-card" hoverable>
          <template #header>
            <div class="plugin-header">
              <span class="plugin-name">{{ plugin.name }}</span>
              <n-tag type="info" size="small">{{ plugin.category }}</n-tag>
            </div>
          </template>

          <div class="plugin-content">
            <p class="plugin-description">{{ plugin.description }}</p>
            <p class="plugin-info">
              <span>版本: {{ plugin.version }}</span>
              <span>作者: {{ plugin.author }}</span>
            </p>
            <p class="plugin-stats">
              <span>评分: {{ plugin.rating }}/5</span>
              <span>下载: {{ plugin.downloads }}</span>
            </p>
          </div>

          <template #action>
            <n-button type="primary" size="small" @click="installFromMarket(plugin)" :loading="uploadLoading">
              <template #icon>
                <Download />
              </template>
              安装
            </n-button>
          </template>
        </n-card>
      </div>
    </div>

    <!-- 本地上传模态框 -->
    <n-modal v-model:show="showUploadModal" preset="dialog" title="本地安装插件">
      <div class="upload-content">
        <p>请选择插件zip文件进行安装：</p>
        <n-button :loading="uploadLoading" @click="handleFileUpload">
          选择插件文件
        </n-button>
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
          <n-input v-model:value="remoteForm.description" placeholder="可选，插件描述信息" type="textarea" :rows="3" />
        </n-form-item>
      </n-form>
      <template #action>
        <n-space>
          <n-button @click="showRemoteModal = false">取消</n-button>
          <n-button type="primary" @click="installFromRemote" :loading="uploadLoading">
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
          <n-button type="primary" @click="savePluginConfig">
            保存配置
          </n-button>
        </n-space>
      </template>
    </n-modal>
  </section>
</template>
<style lang="less" scoped>
.plugin-container {
  padding: 20px;
}
</style>