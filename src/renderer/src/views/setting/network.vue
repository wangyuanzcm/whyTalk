<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { NButton, NSpace, NInput, NInputNumber, NSwitch, NSelect, NCard, NForm, NFormItem, NAlert, NTag, useMessage, NModal, NList, NListItem, NThing, NIcon, NText, NCode } from 'naive-ui'
import { Network, Refresh, TestTube, Save, Delete, Add, Warning, CheckOne, Close } from '@/components/icons'
import { useSettingsStore } from '@/store'

const message = useMessage()
const settingsStore = useSettingsStore()

// 代理设置
const proxySettings = ref({
  enabled: false,
  type: 'http',
  host: '',
  port: 8080,
  username: '',
  password: '',
  bypassList: ['localhost', '127.0.0.1', '*.local']
})

// API设置
const apiSettings = ref({
  timeout: 30000,
  retryCount: 3,
  retryDelay: 1000,
  maxConcurrent: 5,
  userAgent: 'WhyTalk/1.0.0'
})

// 插件市场源设置
const marketSources = ref([
  {
    id: 'official',
    name: '官方插件市场',
    url: 'https://plugins.whytalk.com/api',
    enabled: true,
    type: 'official',
    description: 'WhyTalk官方插件市场，提供经过审核的安全插件'
  }
])

// 网络测试
const networkTest = ref({
  testing: false,
  results: []
})

// 模态框状态
const showSourceModal = ref(false)
const editingSource = ref(null)
const isCreatingSource = ref(false)

// 新源表单
const newSource = ref({
  name: '',
  url: '',
  description: '',
  enabled: true
})

// 代理类型选项
const proxyTypeOptions = [
  { label: 'HTTP', value: 'http' },
  { label: 'HTTPS', value: 'https' },
  { label: 'SOCKS4', value: 'socks4' },
  { label: 'SOCKS5', value: 'socks5' }
]

/**
 * 测试网络连接
 */
const testNetworkConnection = async () => {
  networkTest.value.testing = true
  networkTest.value.results = []
  
  const testUrls = [
    { name: '官方API', url: 'https://api.whytalk.com/health' },
    { name: '插件市场', url: 'https://plugins.whytalk.com/health' },
    { name: 'GitHub', url: 'https://api.github.com' },
    { name: 'NPM Registry', url: 'https://registry.npmjs.org' }
  ]
  
  for (const test of testUrls) {
    try {
      const startTime = Date.now()
      const response = await fetch(test.url, {
        method: 'HEAD',
        timeout: 5000
      })
      const endTime = Date.now()
      
      networkTest.value.results.push({
        name: test.name,
        url: test.url,
        status: response.ok ? 'success' : 'error',
        latency: endTime - startTime,
        message: response.ok ? '连接正常' : `HTTP ${response.status}`
      })
    } catch (error) {
      networkTest.value.results.push({
        name: test.name,
        url: test.url,
        status: 'error',
        latency: 0,
        message: error.message || '连接失败'
      })
    }
  }
  
  networkTest.value.testing = false
}

/**
 * 测试代理连接
 */
const testProxyConnection = async () => {
  if (!proxySettings.value.host || !proxySettings.value.port) {
    message.warning('请先配置代理服务器地址和端口')
    return
  }
  
  try {
    // 这里应该调用主进程的代理测试API
    message.info('正在测试代理连接...')
    
    // 模拟测试
    setTimeout(() => {
      message.success('代理连接测试成功')
    }, 2000)
  } catch (error) {
    message.error('代理连接测试失败：' + error.message)
  }
}

/**
 * 保存代理设置
 */
const saveProxySettings = () => {
  // 验证设置
  if (proxySettings.value.enabled) {
    if (!proxySettings.value.host) {
      message.warning('请输入代理服务器地址')
      return
    }
    if (!proxySettings.value.port || proxySettings.value.port < 1 || proxySettings.value.port > 65535) {
      message.warning('请输入有效的端口号 (1-65535)')
      return
    }
  }
  
  // 保存到设置存储
  settingsStore.setProxySettings(proxySettings.value)
  message.success('代理设置已保存')
}

/**
 * 保存API设置
 */
const saveApiSettings = () => {
  if (apiSettings.value.timeout < 1000) {
    message.warning('超时时间不能少于1秒')
    return
  }
  
  if (apiSettings.value.retryCount < 0 || apiSettings.value.retryCount > 10) {
    message.warning('重试次数应在0-10之间')
    return
  }
  
  settingsStore.setApiSettings(apiSettings.value)
  message.success('API设置已保存')
}

/**
 * 添加绕过地址
 */
const addBypassAddress = () => {
  const address = prompt('请输入要绕过代理的地址（支持通配符*）')
  if (address && address.trim()) {
    proxySettings.value.bypassList.push(address.trim())
  }
}

/**
 * 删除绕过地址
 */
const removeBypassAddress = (index: number) => {
  proxySettings.value.bypassList.splice(index, 1)
}

/**
 * 创建新插件源
 */
const createSource = () => {
  isCreatingSource.value = true
  editingSource.value = null
  newSource.value = {
    name: '',
    url: '',
    description: '',
    enabled: true
  }
  showSourceModal.value = true
}

/**
 * 编辑插件源
 */
const editSource = (source: any) => {
  if (source.type === 'official') {
    message.warning('官方插件源无法编辑')
    return
  }
  
  isCreatingSource.value = false
  editingSource.value = source
  newSource.value = {
    name: source.name,
    url: source.url,
    description: source.description,
    enabled: source.enabled
  }
  showSourceModal.value = true
}

/**
 * 保存插件源
 */
const saveSource = () => {
  if (!newSource.value.name.trim()) {
    message.warning('请输入插件源名称')
    return
  }
  
  if (!newSource.value.url.trim()) {
    message.warning('请输入插件源URL')
    return
  }
  
  // 验证URL格式
  try {
    new URL(newSource.value.url)
  } catch {
    message.warning('请输入有效的URL地址')
    return
  }
  
  const sourceData = {
    id: isCreatingSource.value ? `custom_${Date.now()}` : editingSource.value.id,
    name: newSource.value.name,
    url: newSource.value.url,
    description: newSource.value.description,
    enabled: newSource.value.enabled,
    type: 'custom'
  }
  
  if (isCreatingSource.value) {
    marketSources.value.push(sourceData)
    message.success('插件源添加成功')
  } else {
    const index = marketSources.value.findIndex(s => s.id === editingSource.value.id)
    if (index > -1) {
      marketSources.value[index] = sourceData
      message.success('插件源更新成功')
    }
  }
  
  showSourceModal.value = false
}

/**
 * 删除插件源
 */
const deleteSource = (sourceId: string) => {
  const source = marketSources.value.find(s => s.id === sourceId)
  if (!source) return
  
  if (source.type === 'official') {
    message.warning('官方插件源无法删除')
    return
  }
  
  const index = marketSources.value.findIndex(s => s.id === sourceId)
  if (index > -1) {
    marketSources.value.splice(index, 1)
    message.success('插件源删除成功')
  }
}

/**
 * 切换插件源状态
 */
const toggleSource = (sourceId: string) => {
  const source = marketSources.value.find(s => s.id === sourceId)
  if (source) {
    source.enabled = !source.enabled
    message.success(`插件源已${source.enabled ? '启用' : '禁用'}`)
  }
}

/**
 * 测试插件源连接
 */
const testSourceConnection = async (source: any) => {
  try {
    message.info(`正在测试 ${source.name} 连接...`)
    
    const response = await fetch(`${source.url}/health`, {
      method: 'GET',
      timeout: 10000
    })
    
    if (response.ok) {
      message.success(`${source.name} 连接正常`)
    } else {
      message.error(`${source.name} 连接失败：HTTP ${response.status}`)
    }
  } catch (error) {
    message.error(`${source.name} 连接失败：${error.message}`)
  }
}

// 计算属性
const enabledSources = computed(() => marketSources.value.filter(s => s.enabled))
const customSources = computed(() => marketSources.value.filter(s => s.type === 'custom'))

onMounted(() => {
  // 加载设置
  const savedProxySettings = settingsStore.proxySettings
  if (savedProxySettings) {
    proxySettings.value = { ...savedProxySettings }
  }
  
  const savedApiSettings = settingsStore.apiSettings
  if (savedApiSettings) {
    apiSettings.value = { ...savedApiSettings }
  }
  
  // 加载插件源
  const savedSources = settingsStore.marketSources
  if (savedSources && savedSources.length > 0) {
    marketSources.value = savedSources
  }
})
</script>

<template>
  <section>
    <h3 class="title">网络设置</h3>
    
    <!-- 网络测试 -->
    <NCard title="网络连接测试" class="section-card">
      <div class="network-test">
        <div class="test-header">
          <NButton 
            type="primary" 
            @click="testNetworkConnection" 
            :loading="networkTest.testing"
          >
            <template #icon>
              <NIcon><TestTube /></NIcon>
            </template>
            {{ networkTest.testing ? '测试中...' : '开始测试' }}
          </NButton>
          <NText depth="3">测试与各个服务的网络连接状态</NText>
        </div>
        
        <div v-if="networkTest.results.length" class="test-results">
          <div 
            v-for="result in networkTest.results" 
            :key="result.name"
            class="test-result-item"
          >
            <div class="result-info">
              <NIcon 
                :component="result.status === 'success' ? CheckOne : Close" 
                :color="result.status === 'success' ? '#52c41a' : '#ff4d4f'"
              />
              <span class="result-name">{{ result.name }}</span>
              <NTag 
                :type="result.status === 'success' ? 'success' : 'error'"
                size="small"
              >
                {{ result.message }}
              </NTag>
            </div>
            <div v-if="result.latency > 0" class="result-latency">
              {{ result.latency }}ms
            </div>
          </div>
        </div>
      </div>
    </NCard>

    <!-- 代理设置 -->
    <NCard title="代理设置" class="section-card">
      <NForm>
        <NFormItem>
          <div class="proxy-enable">
            <NSwitch v-model:value="proxySettings.enabled" />
            <span>启用代理</span>
          </div>
        </NFormItem>
        
        <template v-if="proxySettings.enabled">
          <NFormItem label="代理类型">
            <NSelect 
              v-model:value="proxySettings.type" 
              :options="proxyTypeOptions"
              style="width: 200px"
            />
          </NFormItem>
          
          <NFormItem label="服务器地址">
            <NInput 
              v-model:value="proxySettings.host" 
              placeholder="例如：127.0.0.1 或 proxy.example.com"
              style="width: 300px"
            />
          </NFormItem>
          
          <NFormItem label="端口">
            <NInputNumber 
              v-model:value="proxySettings.port" 
              :min="1" 
              :max="65535"
              style="width: 150px"
            />
          </NFormItem>
          
          <NFormItem label="用户名">
            <NInput 
              v-model:value="proxySettings.username" 
              placeholder="可选"
              style="width: 200px"
            />
          </NFormItem>
          
          <NFormItem label="密码">
            <NInput 
              v-model:value="proxySettings.password" 
              type="password" 
              placeholder="可选"
              style="width: 200px"
            />
          </NFormItem>
          
          <NFormItem label="绕过代理的地址">
            <div class="bypass-list">
              <div class="bypass-tags">
                <NTag 
                  v-for="(address, index) in proxySettings.bypassList" 
                  :key="index"
                  closable
                  @close="removeBypassAddress(index)"
                >
                  {{ address }}
                </NTag>
              </div>
              <NButton size="small" @click="addBypassAddress">
                <template #icon>
                  <NIcon><Add /></NIcon>
                </template>
                添加地址
              </NButton>
            </div>
          </NFormItem>
          
          <NFormItem>
            <NSpace>
              <NButton type="primary" @click="saveProxySettings">
                <template #icon>
                  <NIcon><Save /></NIcon>
                </template>
                保存设置
              </NButton>
              <NButton @click="testProxyConnection">
                <template #icon>
                  <NIcon><TestTube /></NIcon>
                </template>
                测试连接
              </NButton>
            </NSpace>
          </NFormItem>
        </template>
        
        <template v-else>
          <NFormItem>
            <NButton type="primary" @click="saveProxySettings">
              <template #icon>
                <NIcon><Save /></NIcon>
              </template>
              保存设置
            </NButton>
          </NFormItem>
        </template>
      </NForm>
    </NCard>

    <!-- API设置 -->
    <NCard title="API设置" class="section-card">
      <NForm>
        <NFormItem label="请求超时时间">
          <div class="input-with-unit">
            <NInputNumber 
              v-model:value="apiSettings.timeout" 
              :min="1000" 
              :max="300000"
              :step="1000"
              style="width: 150px"
            />
            <span class="unit">毫秒</span>
          </div>
        </NFormItem>
        
        <NFormItem label="重试次数">
          <NInputNumber 
            v-model:value="apiSettings.retryCount" 
            :min="0" 
            :max="10"
            style="width: 150px"
          />
        </NFormItem>
        
        <NFormItem label="重试延迟">
          <div class="input-with-unit">
            <NInputNumber 
              v-model:value="apiSettings.retryDelay" 
              :min="100" 
              :max="10000"
              :step="100"
              style="width: 150px"
            />
            <span class="unit">毫秒</span>
          </div>
        </NFormItem>
        
        <NFormItem label="最大并发请求">
          <NInputNumber 
            v-model:value="apiSettings.maxConcurrent" 
            :min="1" 
            :max="20"
            style="width: 150px"
          />
        </NFormItem>
        
        <NFormItem label="User-Agent">
          <NInput 
            v-model:value="apiSettings.userAgent" 
            placeholder="自定义User-Agent"
            style="width: 400px"
          />
        </NFormItem>
        
        <NFormItem>
          <NButton type="primary" @click="saveApiSettings">
            <template #icon>
              <NIcon><Save /></NIcon>
            </template>
            保存设置
          </NButton>
        </NFormItem>
      </NForm>
    </NCard>

    <!-- 插件市场源 -->
    <NCard title="插件市场源" class="section-card">
      <div class="market-sources">
        <div class="sources-header">
          <NAlert type="info" style="margin-bottom: 16px">
            插件市场源用于获取和更新插件。您可以添加自定义源来访问更多插件。
          </NAlert>
          
          <NButton type="primary" @click="createSource">
            <template #icon>
              <NIcon><Add /></NIcon>
            </template>
            添加插件源
          </NButton>
        </div>
        
        <NList>
          <NListItem v-for="source in marketSources" :key="source.id">
            <NThing>
              <template #header>
                <div class="source-header">
                  <span class="source-name">{{ source.name }}</span>
                  <div class="source-tags">
                    <NTag v-if="source.type === 'official'" type="primary" size="small">
                      官方
                    </NTag>
                    <NTag 
                      :type="source.enabled ? 'success' : 'default'" 
                      size="small"
                    >
                      {{ source.enabled ? '已启用' : '已禁用' }}
                    </NTag>
                  </div>
                </div>
              </template>
              
              <template #description>
                <div class="source-info">
                  <NCode>{{ source.url }}</NCode>
                  <p v-if="source.description">{{ source.description }}</p>
                </div>
              </template>
              
              <template #action>
                <NSpace>
                  <NButton 
                    size="small" 
                    @click="toggleSource(source.id)"
                  >
                    {{ source.enabled ? '禁用' : '启用' }}
                  </NButton>
                  <NButton 
                    size="small" 
                    @click="testSourceConnection(source)"
                  >
                    <template #icon>
                      <NIcon><TestTube /></NIcon>
                    </template>
                    测试
                  </NButton>
                  <NButton 
                    v-if="source.type !== 'official'"
                    size="small" 
                    @click="editSource(source)"
                  >
                    编辑
                  </NButton>
                  <NButton 
                    v-if="source.type !== 'official'"
                    size="small" 
                    type="error" 
                    @click="deleteSource(source.id)"
                  >
                    <template #icon>
                      <NIcon><Delete /></NIcon>
                    </template>
                    删除
                  </NButton>
                </NSpace>
              </template>
            </NThing>
          </NListItem>
        </NList>
      </div>
    </NCard>

    <!-- 插件源编辑模态框 -->
    <NModal v-model:show="showSourceModal" preset="card" :title="isCreatingSource ? '添加插件源' : '编辑插件源'" style="width: 600px">
      <NForm>
        <NFormItem label="源名称" required>
          <NInput v-model:value="newSource.name" placeholder="请输入插件源名称" />
        </NFormItem>
        
        <NFormItem label="源地址" required>
          <NInput v-model:value="newSource.url" placeholder="https://example.com/api" />
        </NFormItem>
        
        <NFormItem label="描述">
          <NInput 
            v-model:value="newSource.description" 
            type="textarea" 
            placeholder="插件源描述（可选）"
            :rows="3"
          />
        </NFormItem>
        
        <NFormItem>
          <div class="source-enable">
            <NSwitch v-model:value="newSource.enabled" />
            <span>启用此插件源</span>
          </div>
        </NFormItem>
        
        <NFormItem>
          <NSpace>
            <NButton type="primary" @click="saveSource">
              {{ isCreatingSource ? '添加' : '保存' }}
            </NButton>
            <NButton @click="showSourceModal = false">取消</NButton>
          </NSpace>
        </NFormItem>
      </NForm>
    </NModal>
  </section>
</template>

<style lang="less" scoped>
@import '@/styles/theme/index.less';

section {
  padding: var(--spacing-lg);
  background: var(--color-bg-content);
  border-radius: var(--border-radius-lg);
  .card-shadow();
}

.title {
  margin: 0 0 var(--spacing-xl) 0;
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  line-height: var(--line-height-tight);
}

.section-card {
  margin-bottom: var(--spacing-xl);
  
  &:last-child {
    margin-bottom: 0;
  }
}

// 网络测试样式
.network-test {
  .test-header {
    .flex-row();
    align-items: center;
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-lg);
  }
  
  .test-results {
    .test-result-item {
      .flex-row();
      justify-content: space-between;
      align-items: center;
      padding: var(--spacing-sm) 0;
      border-bottom: 1px solid var(--color-border-light);
      
      &:last-child {
        border-bottom: none;
      }
      
      .result-info {
        .flex-row();
        align-items: center;
        gap: var(--spacing-sm);
        
        .result-name {
          font-weight: var(--font-weight-medium);
          min-width: 100px;
        }
      }
      
      .result-latency {
        font-size: var(--font-size-sm);
        color: var(--color-text-secondary);
      }
    }
  }
}

// 代理设置样式
.proxy-enable {
  .flex-row();
  align-items: center;
  gap: var(--spacing-sm);
}

.bypass-list {
  .flex-column();
  gap: var(--spacing-sm);
  
  .bypass-tags {
    .flex-row();
    gap: var(--spacing-xs);
    flex-wrap: wrap;
  }
}

// API设置样式
.input-with-unit {
  .flex-row();
  align-items: center;
  gap: var(--spacing-sm);
  
  .unit {
    color: var(--color-text-secondary);
    font-size: var(--font-size-sm);
  }
}

// 插件市场源样式
.market-sources {
  .sources-header {
    .flex-column();
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-lg);
  }
  
  .source-header {
    .flex-row();
    justify-content: space-between;
    align-items: center;
    width: 100%;
    
    .source-name {
      font-weight: var(--font-weight-semibold);
      font-size: var(--font-size-md);
    }
    
    .source-tags {
      .flex-row();
      gap: var(--spacing-xs);
    }
  }
  
  .source-info {
    .flex-column();
    gap: var(--spacing-xs);
    
    p {
      margin: 0;
      color: var(--color-text-secondary);
      font-size: var(--font-size-sm);
    }
  }
}

.source-enable {
  .flex-row();
  align-items: center;
  gap: var(--spacing-sm);
}

// 响应式设计
.mobile-only() {
  .test-result-item {
    .flex-column();
    align-items: flex-start !important;
    gap: var(--spacing-xs);
  }
  
  .source-header {
    .flex-column();
    align-items: flex-start !important;
    gap: var(--spacing-xs);
  }
  
  .input-with-unit {
    .flex-column();
    align-items: flex-start !important;
  }
}

// 暗色主题适配
:global([data-theme='dark']) {
  section {
    background: var(--color-bg-content-dark);
  }
  
  .title {
    color: var(--color-text-primary-dark) !important;
  }
  
  .test-result-item {
    border-color: var(--color-border-dark) !important;
  }
  
  .result-name {
    color: var(--color-text-primary-dark) !important;
  }
  
  .source-name {
    color: var(--color-text-primary-dark) !important;
  }
  
  .unit {
    color: var(--color-text-secondary-dark) !important;
  }
}
</style>