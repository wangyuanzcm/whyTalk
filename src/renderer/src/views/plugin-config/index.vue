<template>
  <div class="plugin-config-container">
    <!-- 头部标题栏 -->
    <div class="config-header">
      <div class="header-left">
        <h2 class="config-title">
          <n-icon class="title-icon">
            <SettingsOutline />
          </n-icon>
          插件配置
        </h2>
        <n-tag v-if="pluginInfo" type="info" size="small">
          {{ pluginInfo.config?.name || pluginId }}
        </n-tag>
      </div>
      <div class="header-right">
        <n-button @click="returnToWorkspace" quaternary>
          返回工作台
        </n-button>
      </div>
    </div>

    <!-- 配置内容区域 -->
    <div class="config-content">
      <n-spin :show="loading">
        <div v-if="pluginInfo" class="config-sections">
          <!-- 基本信息 -->
          <n-card title="基本信息" class="config-section">
            <n-descriptions :column="2" label-placement="left">
              <n-descriptions-item label="插件ID">
                {{ pluginInfo.id }}
              </n-descriptions-item>
              <n-descriptions-item label="插件名称">
                {{ pluginInfo.config?.name || '未知' }}
              </n-descriptions-item>
              <n-descriptions-item label="版本">
                {{ pluginInfo.config?.version || '1.0.0' }}
              </n-descriptions-item>
              <n-descriptions-item label="作者">
                {{ pluginInfo.config?.author || '未知' }}
              </n-descriptions-item>
              <n-descriptions-item label="描述" :span="2">
                {{ pluginInfo.config?.description || '暂无描述' }}
              </n-descriptions-item>
              <n-descriptions-item label="状态">
                <n-tag :type="pluginInfo.isActive ? 'success' : 'default'">
                  {{ pluginInfo.isActive ? '已激活' : '未激活' }}
                </n-tag>
              </n-descriptions-item>
            </n-descriptions>
          </n-card>

          <!-- 显示设置 -->
          <n-card title="显示设置" class="config-section">
            <n-form
              :model="displayConfig"
              label-placement="left"
              label-width="120px"
            >
              <n-form-item label="打开方式">
                <n-select
                  v-model:value="displayConfig.openMode"
                  :options="openModeOptions"
                  placeholder="请选择插件页面打开方式"
                />
              </n-form-item>
              
              <div v-if="displayConfig.openMode === 'newWindow'">
                <n-form-item label="窗口宽度">
                  <n-input-number
                    v-model:value="displayConfig.windowWidth"
                    :min="400"
                    :max="2000"
                    :step="50"
                    placeholder="窗口宽度（像素）"
                  >
                    <template #suffix>px</template>
                  </n-input-number>
                </n-form-item>
                
                <n-form-item label="窗口高度">
                  <n-input-number
                    v-model:value="displayConfig.windowHeight"
                    :min="300"
                    :max="1500"
                    :step="50"
                    placeholder="窗口高度（像素）"
                  >
                    <template #suffix>px</template>
                  </n-input-number>
                </n-form-item>
                
                <n-form-item label="窗口选项">
                  <n-space vertical>
                    <n-checkbox v-model:checked="displayConfig.resizable">
                      允许调整窗口大小
                    </n-checkbox>
                    <n-checkbox v-model:checked="displayConfig.minimizable">
                      允许最小化窗口
                    </n-checkbox>
                    <n-checkbox v-model:checked="displayConfig.maximizable">
                      允许最大化窗口
                    </n-checkbox>
                    <n-checkbox v-model:checked="displayConfig.alwaysOnTop">
                      窗口置顶显示
                    </n-checkbox>
                  </n-space>
                </n-form-item>
              </div>
            </n-form>
          </n-card>

          <!-- 插件配置 -->
          <n-card title="插件配置" class="config-section">
            <div v-if="configSchema && configSchema.length > 0">
              <n-form
                ref="configFormRef"
                :model="configValues"
                :rules="configRules"
                label-placement="left"
                label-width="120px"
              >
                <div v-for="item in configSchema" :key="item.key" class="config-item">
                  <!-- 字符串类型 -->
                  <n-form-item v-if="item.type === 'string'" :label="item.label" :path="item.key">
                    <n-input
                      v-model:value="configValues[item.key]"
                      :placeholder="item.placeholder || `请输入${item.label}`"
                      :disabled="item.readonly"
                    />
                  </n-form-item>

                  <!-- 数字类型 -->
                  <n-form-item v-else-if="item.type === 'number'" :label="item.label" :path="item.key">
                    <n-input-number
                      v-model:value="configValues[item.key]"
                      :placeholder="item.placeholder || `请输入${item.label}`"
                      :disabled="item.readonly"
                      :min="item.min"
                      :max="item.max"
                      :step="item.step || 1"
                    />
                  </n-form-item>

                  <!-- 布尔类型 -->
                  <n-form-item v-else-if="item.type === 'boolean'" :label="item.label" :path="item.key">
                    <n-switch
                      v-model:value="configValues[item.key]"
                      :disabled="item.readonly"
                    >
                      <template #checked>启用</template>
                      <template #unchecked>禁用</template>
                    </n-switch>
                  </n-form-item>

                  <!-- 选择类型 -->
                  <n-form-item v-else-if="item.type === 'select'" :label="item.label" :path="item.key">
                    <n-select
                      v-model:value="configValues[item.key]"
                      :options="item.options || []"
                      :placeholder="item.placeholder || `请选择${item.label}`"
                      :disabled="item.readonly"
                    />
                  </n-form-item>

                  <!-- 文本域类型 -->
                  <n-form-item v-else-if="item.type === 'textarea'" :label="item.label" :path="item.key">
                    <n-input
                      v-model:value="configValues[item.key]"
                      type="textarea"
                      :placeholder="item.placeholder || `请输入${item.label}`"
                      :disabled="item.readonly"
                      :rows="item.rows || 3"
                    />
                  </n-form-item>
                </div>
              </n-form>
            </div>
            <n-empty v-else description="该插件暂无可配置项" />
          </n-card>

          <!-- 操作按钮 -->
          <div class="config-actions">
            <n-space>
              <n-button type="primary" @click="saveConfigAndReturn" :loading="saving">
                确定
              </n-button>
              <n-button @click="resetConfig">
                重置配置
              </n-button>
              <n-button @click="reloadPlugin" :loading="reloading">
                重新加载插件
              </n-button>
              <n-button @click="returnToWorkspace">
                取消
              </n-button>
            </n-space>
          </div>
        </div>

        <!-- 加载状态 -->
        <div v-else-if="!loading" class="error-state">
          <n-result status="404" title="插件未找到" description="指定的插件不存在或已被卸载">
            <template #footer>
              <n-button @click="returnToWorkspace">返回工作台</n-button>
            </template>
          </n-result>
        </div>
      </n-spin>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  NCard,
  NDescriptions,
  NDescriptionsItem,
  NTag,
  NForm,
  NFormItem,
  NInput,
  NInputNumber,
  NSwitch,
  NSelect,
  NButton,
  NSpace,
  NSpin,
  NEmpty,
  NResult,
  NIcon,
  NCheckbox,
  useMessage
} from 'naive-ui'
import {
  SettingsOutline
} from '@vicons/ionicons5'

// 类型定义
interface Plugin {
  id: string
  config: {
    name: string
    version: string
    author: string
    description: string
  }
  isActive: boolean
  manifest: any
}

interface ConfigItem {
  key: string
  label: string
  type: 'string' | 'number' | 'boolean' | 'select' | 'textarea'
  placeholder?: string
  readonly?: boolean
  min?: number
  max?: number
  step?: number
  rows?: number
  options?: Array<{ label: string; value: any }>
}

// 响应式数据
const route = useRoute()
const router = useRouter()
const message = useMessage()
const pluginId = ref<string>(route.params.pluginId as string)
const pluginInfo = ref<Plugin | null>(null)
const loading = ref(true)
const saving = ref(false)
const reloading = ref(false)
const configFormRef = ref()

// 配置相关
const configSchema = ref<ConfigItem[]>([])
const configValues = reactive<Record<string, any>>({})
const configRules = reactive<Record<string, any>>({})

// 显示配置
const displayConfig = reactive({
  openMode: 'newWindow',
  windowWidth: 800,
  windowHeight: 600,
  resizable: true,
  minimizable: true,
  maximizable: true,
  alwaysOnTop: false
})

// 打开方式选项
const openModeOptions = [
  { label: '新窗口', value: 'newWindow' },
  { label: '当前窗口', value: 'currentWindow' },
  { label: '侧边栏', value: 'sidebar' }
]



/**
 * 加载插件信息
 */
const loadPluginInfo = async () => {
  try {
    loading.value = true
    
    // 获取插件信息
    const plugin = await (window as any).electron.ipcRenderer.invoke('plugin:getExtension', pluginId.value)
    
    if (plugin) {
      pluginInfo.value = plugin
      await loadPluginConfig()
    } else {
      message.error('插件不存在')
    }
  } catch (error) {
    console.error('加载插件信息失败:', error)
    message.error('加载插件信息失败')
  } finally {
    loading.value = false
  }
}

/**
 * 加载插件配置
 */
const loadPluginConfig = async () => {
  try {
    // 获取插件配置架构（如果插件提供的话）
    const configSchemaData = await getPluginConfigSchema()
    if (configSchemaData) {
      configSchema.value = configSchemaData
      
      // 初始化配置值
      for (const item of configSchemaData) {
        const currentValue = await getPluginConfigValue(item.key)
        configValues[item.key] = currentValue !== undefined ? currentValue : item.default
        
        // 设置验证规则
        if (item.required) {
          configRules[item.key] = {
            required: true,
            message: `${item.label}不能为空`,
            trigger: ['blur', 'input']
          }
        }
      }
    } else {
      // 如果没有配置架构，提供一些默认的配置项
      configSchema.value = [
        {
          key: 'enabled',
          label: '启用插件',
          type: 'boolean'
        },
        {
          key: 'autoStart',
          label: '自动启动',
          type: 'boolean'
        }
      ]
      
      // 加载默认配置值
      configValues.enabled = pluginInfo.value?.isActive || false
      configValues.autoStart = false
    }
    
    // 加载显示配置
    const displayConfigData = await (window as any).electron.ipcRenderer.invoke('plugin:display-config:get', pluginId.value)
    if (displayConfigData) {
      Object.assign(displayConfig, displayConfigData)
    }
  } catch (error) {
    console.error('加载插件配置失败:', error)
  }
}

/**
 * 获取插件配置架构
 */
const getPluginConfigSchema = async (): Promise<ConfigItem[] | null> => {
  try {
    // 从插件获取配置架构
    const schema = await (window as any).electron.ipcRenderer.invoke(
      'extension:getConfigSchema',
      { extensionId: pluginId.value }
    )
    return schema || null
  } catch (error) {
    console.error('获取配置架构失败:', error)
    return null
  }
}

/**
 * 获取插件配置值
 */
const getPluginConfigValue = async (key: string): Promise<any> => {
  try {
    const config = await (window as any).electron.ipcRenderer.invoke(
      'extension:getConfiguration',
      { extensionId: pluginId.value, section: key }
    )
    return config
  } catch (error) {
    console.error(`获取配置值失败: ${key}`, error)
    return undefined
  }
}

/**
 * 保存配置
 */
const saveConfig = async () => {
  try {
    // 验证表单
    if (configFormRef.value) {
      await configFormRef.value.validate()
    }
    
    saving.value = true
    
    // 保存每个配置项
    for (const [key, value] of Object.entries(configValues)) {
      await (window as any).electron.ipcRenderer.invoke(
        'extension:updateConfiguration',
        {
          extensionId: pluginId.value,
          section: key,
          value: value
        }
      )
    }
    
    // 保存显示配置 - 将reactive对象转换为普通对象
    const plainDisplayConfig = JSON.parse(JSON.stringify(displayConfig))
    await (window as any).electron.ipcRenderer.invoke(
      'plugin:display-config:save',
      {
        pluginId: pluginId.value,
        displayConfig: plainDisplayConfig
      }
    )
    
    message.success('配置保存成功')
  } catch (error) {
    console.error('保存配置失败:', error)
    message.error('保存配置失败')
  } finally {
    saving.value = false
  }
}

/**
 * 重置配置
 */
const resetConfig = () => {
  // 重新加载配置
  loadPluginConfig()
  
  // 重置显示配置为默认值
  Object.assign(displayConfig, {
    openMode: 'newWindow',
    windowWidth: 800,
    windowHeight: 600,
    resizable: true,
    minimizable: true,
    maximizable: true,
    alwaysOnTop: false
  })
  
  message.info('配置已重置')
}

/**
 * 重新加载插件
 */
const reloadPlugin = async () => {
  try {
    reloading.value = true
    
    await (window as any).electron.ipcRenderer.invoke('plugin:reloadExtension', pluginId.value)
    
    // 重新加载插件信息
    await loadPluginInfo()
    
    message.success('插件重新加载成功')
  } catch (error) {
    console.error('重新加载插件失败:', error)
    message.error('重新加载插件失败')
  } finally {
    reloading.value = false
  }
}

/**
 * 保存配置并返回工作台
 */
const saveConfigAndReturn = async () => {
  await saveConfig()
  if (!saving.value) {
    // 只有在保存成功时才返回
    returnToWorkspace()
  }
}

/**
 * 返回到工作台页面
 */
const returnToWorkspace = () => {
  router.push('/workspace')
}

// 组件挂载时加载数据
onMounted(() => {
  loadPluginInfo()
})
</script>

<style scoped>
.plugin-config-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f5f5f5;
}

.config-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: white;
  border-bottom: 1px solid #e0e0e0;
  -webkit-app-region: drag;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.config-title {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
}

.title-icon {
  color: #2080f0;
}

.header-right {
  -webkit-app-region: no-drag;
}

.config-content {
  flex: 1;
  padding: 16px;
  overflow-y: auto;
}

.config-sections {
  max-width: 800px;
  margin: 0 auto;
}

.config-section {
  margin-bottom: 16px;
}

.config-item {
  margin-bottom: 16px;
}

.config-actions {
  margin-top: 24px;
  padding: 16px;
  background: white;
  border-radius: 6px;
  text-align: center;
}

.error-state {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>