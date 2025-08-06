<template>
  <div class="localsend-manager">
    <!-- LocalSend 服务状态提示 -->
    <n-alert v-if="!status.isStarted" type="info" class="mb-4">
      <template #header>LocalSend 网络服务</template>
      LocalSend 是一个开源的跨平台文件传输工具，支持在局域网内快速发现设备并传输文件。
      <br />点击"启动服务"按钮开始使用 LocalSend 功能。
    </n-alert>

    <n-card title="网络管理" class="mb-4">
      <template #header-extra>
        <n-tag :type="status.isStarted ? 'success' : 'error'">
          {{ status.isStarted ? '运行中' : '已停止' }}
        </n-tag>
      </template>

      <n-space vertical>
        <n-descriptions :column="2" bordered>
          <n-descriptions-item label="设备别名">
            <n-text>{{ status.device?.alias || '未知' }}</n-text>
          </n-descriptions-item>
          <n-descriptions-item label="设备指纹">
            <n-text code>{{ status.device?.fingerprint || '未知' }}</n-text>
          </n-descriptions-item>
          <n-descriptions-item label="协议版本">
            {{ status.protocol || 'LocalSend v2.1' }}
          </n-descriptions-item>
          <n-descriptions-item label="服务端口">
            {{ status.device?.port || '53317' }}
          </n-descriptions-item>
          <n-descriptions-item label="设备类型">
            {{ status.device?.deviceType || 'desktop' }}
          </n-descriptions-item>
          <n-descriptions-item label="传输协议">
            {{ status.device?.protocol || 'http' }}
          </n-descriptions-item>
        </n-descriptions>

        <n-space>
          <n-button
            v-if="!status.isStarted"
            type="primary"
            :loading="loading"
            @click="startService"
          >
            启动服务
          </n-button>
          <n-button v-else type="error" :loading="loading" @click="stopService">
            停止服务
          </n-button>
          <n-button :loading="loading" @click="refreshStatus"> 刷新状态 </n-button>
          <n-button :loading="peersLoading" @click="refreshPeers"> 刷新设备 </n-button>
        </n-space>
      </n-space>
    </n-card>

    <n-tabs default-value="peers" type="line">
      <n-tab-pane name="peers" tab="发现的设备">
        <n-card>
          <template #header>
            <n-space justify="space-between">
              <span>已发现的设备 ({{ peers.length }})</span>
              <n-button size="small" :loading="peersLoading" @click="refreshPeers"> 刷新 </n-button>
            </n-space>
          </template>

          <n-data-table
            :columns="peerColumns"
            :data="peers"
            :loading="peersLoading"
            :pagination="false"
            size="small"
          />
        </n-card>
      </n-tab-pane>

      <n-tab-pane name="messages" tab="消息记录">
        <n-card>
          <template #header>
            <n-space justify="space-between">
              <span>LocalSend 消息记录</span>
              <n-button size="small" @click="clearMessages"> 清空记录 </n-button>
            </n-space>
          </template>

          <n-list v-if="messages.length > 0">
            <n-list-item v-for="message in messages" :key="message.id">
              <n-thing>
                <template #header>
                  {{ message.type === 'text' ? '文本消息' : '文件传输' }}
                </template>
                <template #description>
                  来自: {{ message.from }} | 时间: {{ formatTime(message.timestamp) }}
                </template>
                {{ message.content }}
              </n-thing>
            </n-list-item>
          </n-list>
          <n-empty v-else description="暂无消息记录" />
        </n-card>
      </n-tab-pane>

      <n-tab-pane name="settings" tab="设置">
        <n-card title="网络配置">
          <n-form :model="settings" label-placement="left" label-width="120px">
            <n-form-item label="设备别名">
              <n-input v-model:value="settings.alias" placeholder="输入设备别名" />
            </n-form-item>
            <n-form-item label="服务端口">
              <n-input-number v-model:value="settings.port" :min="1024" :max="65535" />
            </n-form-item>
            <n-form-item label="使用HTTPS">
              <n-switch v-model:value="settings.useHttps" />
            </n-form-item>
            <n-form-item label="自动发现">
              <n-switch v-model:value="settings.autoDiscovery" />
            </n-form-item>
            <n-form-item>
              <n-button type="primary" @click="saveSettings">保存设置</n-button>
            </n-form-item>
          </n-form>
        </n-card>
      </n-tab-pane>
    </n-tabs>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { useMessage } from 'naive-ui'

const message = useMessage()

// 响应式数据
const status = ref({
  isStarted: false,
  device: null,
  protocol: 'LocalSend v2.1',
  peersCount: 0
})

const peers = ref([])
const messages = ref([])
const loading = ref(false)
const peersLoading = ref(false)

// 设置
const settings = reactive({
  alias: 'WhyTalk Desktop',
  port: 53317,
  useHttps: false,
  autoDiscovery: true
})

// 表格列定义
const peerColumns = [
  {
    title: '设备别名',
    key: 'alias',
    width: 150
  },
  {
    title: 'IP地址',
    key: 'ip',
    width: 120
  },
  {
    title: '端口',
    key: 'port',
    width: 80
  },
  {
    title: '设备类型',
    key: 'deviceType',
    width: 100
  },
  {
    title: '协议',
    key: 'protocol',
    width: 80
  },
  {
    title: '最后发现',
    key: 'lastSeen',
    width: 150,
    render: (row) => formatTime(row.lastSeen)
  },
  {
    title: '操作',
    key: 'actions',
    width: 120,
    render: (row) => {
      return h('div', [
        h(
          'n-button',
          {
            size: 'small',
            type: 'primary',
            onClick: () => sendTestMessage(row)
          },
          '发送消息'
        )
      ])
    }
  }
]

// 方法
const startService = async () => {
  loading.value = true
  try {
    const result = await window.electron.ipcRenderer.invoke('p2p:start')
    if (result.success) {
      message.success('LocalSend 服务启动成功')
      await refreshStatus()
    } else {
      message.error(`启动失败: ${result.error}`)
    }
  } catch (error) {
    console.error('启动 LocalSend 服务失败:', error)
    message.error('启动服务失败')
  } finally {
    loading.value = false
  }
}

const stopService = async () => {
  loading.value = true
  try {
    const result = await window.electron.ipcRenderer.invoke('p2p:stop')
    if (result.success) {
      message.success('LocalSend 服务已停止')
      await refreshStatus()
      peers.value = []
    } else {
      message.error(`停止失败: ${result.error}`)
    }
  } catch (error) {
    console.error('停止 LocalSend 服务失败:', error)
    message.error('停止服务失败')
  } finally {
    loading.value = false
  }
}

const refreshStatus = async () => {
  loading.value = true
  try {
    const result = await window.electron.ipcRenderer.invoke('p2p:status')
    if (result.success) {
      status.value = result.data
    }
  } catch (error) {
    console.error('获取状态失败:', error)
  } finally {
    loading.value = false
  }
}

const refreshPeers = async () => {
  peersLoading.value = true
  try {
    const result = await window.electron.ipcRenderer.invoke('p2p:peers')
    if (result.success) {
      peers.value = result.data || []
    }
  } catch (error) {
    console.error('获取设备列表失败:', error)
  } finally {
    peersLoading.value = false
  }
}

const sendTestMessage = async (peer) => {
  try {
    const result = await window.electron.ipcRenderer.invoke('p2p:send-message', peer.fingerprint, 'Hello from WhyTalk!')
    if (result.success) {
      message.success(`消息已发送到 ${peer.alias}`)
    } else {
      message.error(`发送失败: ${result.error}`)
    }
  } catch (error) {
    console.error('发送消息失败:', error)
    message.error('发送消息失败')
  }
}

const clearMessages = () => {
  messages.value = []
  message.success('消息记录已清空')
}

const saveSettings = async () => {
  try {
    const result = await window.electron.ipcRenderer.invoke('p2p:save-settings', settings)
    if (result.success) {
      message.success('设置已保存')
    } else {
      message.error(`保存失败: ${result.error}`)
    }
  } catch (error) {
    console.error('保存设置失败:', error)
    message.error('保存设置失败')
  }
}

const formatTime = (timestamp) => {
  if (!timestamp) return '未知'
  return new Date(timestamp).toLocaleString()
}

// 生命周期
onMounted(async () => {
  await refreshStatus()
  if (status.value.isStarted) {
    await refreshPeers()
  }

  // 监听 LocalSend 事件
  window.electron.ipcRenderer.on('p2p:peer-discovered', (peer) => {
    const existingIndex = peers.value.findIndex((p) => p.fingerprint === peer.fingerprint)
    if (existingIndex >= 0) {
      peers.value[existingIndex] = peer
    } else {
      peers.value.push(peer)
    }
  })

  window.electron.ipcRenderer.on('p2p:peer-lost', (peer) => {
    const index = peers.value.findIndex((p) => p.fingerprint === peer.fingerprint)
    if (index >= 0) {
      peers.value.splice(index, 1)
    }
  })

  window.electron.ipcRenderer.on('p2p:message-received', (msg) => {
    messages.value.unshift(msg)
    message.info(`收到来自 ${msg.from} 的消息`)
  })
})

onUnmounted(() => {
  // 清理事件监听器
  window.electron.ipcRenderer.removeAllListeners('p2p:peer-discovered')
     window.electron.ipcRenderer.removeAllListeners('p2p:peer-lost')
     window.electron.ipcRenderer.removeAllListeners('p2p:message-received')
})
</script>

<style lang="less" scoped>
.localsend-manager {
  padding: 20px;
  height: 100%;
  overflow-y: auto;
}

.mb-4 {
  margin-bottom: 16px;
}

:deep(.n-card) {
  margin-bottom: 16px;
}

:deep(.n-descriptions-item-label) {
  font-weight: 500;
}

:deep(.n-data-table) {
  .n-data-table-td {
    padding: 8px 12px;
  }
}

:deep(.n-list-item) {
  padding: 12px 0;
  border-bottom: 1px solid var(--n-border-color);

  &:last-child {
    border-bottom: none;
  }
}
</style>
