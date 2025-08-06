<template>
  <div class="p2p-manager">
    <!-- P2P 服务状态提示 -->
    <n-alert v-if="!status.isRunning" type="warning" class="mb-4">
      <template #header>P2P 服务未启用</template>
      P2P 功能当前处于开发阶段，服务暂时未启用。这是一个演示界面，展示了 P2P 功能的完整设计。
      <br />要启用 P2P 功能，需要解决 libp2p 依赖问题并重新启动服务。
    </n-alert>

    <n-card title="P2P 网络管理" class="mb-4">
      <template #header-extra>
        <n-tag :type="status.isRunning ? 'success' : 'error'">
          {{ status.isRunning ? '运行中' : '已停止' }}
        </n-tag>
      </template>

      <n-space vertical>
        <n-descriptions :column="2" bordered>
          <n-descriptions-item label="节点ID">
            <n-text code>{{ status.peerId || '未知' }}</n-text>
          </n-descriptions-item>
          <n-descriptions-item label="状态">
            {{ status.isRunning ? '运行中' : '已停止' }}
          </n-descriptions-item>
        </n-descriptions>

        <n-space>
          <n-button :loading="loading" @click="refreshStatus"> 刷新状态 </n-button>
          <n-button :loading="peersLoading" @click="refreshPeers"> 刷新节点 </n-button>
        </n-space>
      </n-space>
    </n-card>

    <n-tabs default-value="peers" type="line">
      <n-tab-pane name="peers" tab="发现的节点">
        <n-card>
          <template #header>
            <n-space justify="space-between">
              <span>已发现的节点 ({{ peers.length }})</span>
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

      <n-tab-pane name="network" tab="网络信息">
        <n-card>
          <template #header>
            <span>网络连接信息</span>
          </template>

          <n-descriptions :column="1" bordered>
            <n-descriptions-item label="连接的节点数">
              {{ peers.filter((p) => p.status === 'connected').length }}
            </n-descriptions-item>
            <n-descriptions-item label="发现的节点数">
              {{ peers.length }}
            </n-descriptions-item>
            <n-descriptions-item label="网络协议"> libp2p (演示模式) </n-descriptions-item>
            <n-descriptions-item label="发现机制"> mDNS + DHT </n-descriptions-item>
          </n-descriptions>

          <n-divider />

          <n-alert type="info">
            <template #header>功能说明</template>
            P2P网络模块负责底层网络基础设施管理，包括节点发现、连接管理等。
            具体的联系人管理和消息功能请使用对应的插件。
          </n-alert>
        </n-card>
      </n-tab-pane>
    </n-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import {
  NCard,
  NTag,
  NSpace,
  NDescriptions,
  NDescriptionsItem,
  NText,
  NButton,
  NTabs,
  NTabPane,
  NDataTable,
  useMessage
} from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import { connectToP2PPeer, type P2PPeer } from '@/api/p2p'
import { useP2PStore } from '@/store/modules/p2p'

const message = useMessage()
const p2pStore = useP2PStore()

// 本地状态

// P2P状态对象
const status = computed(() => ({
  isRunning: p2pStore.isConnected,
  peerId: p2pStore.nodeId
}))

// 节点数据
const peers = computed(() => p2pStore.discoveredNodes)

// 加载状态
const loading = ref(false)
const peersLoading = ref(false)

// 节点表格列
const peerColumns: DataTableColumns<P2PPeer> = [
  {
    title: '节点ID',
    key: 'id',
    render: (row) => h('span', { style: 'font-family: monospace; font-size: 12px;' }, row.id)
  },
  {
    title: '状态',
    key: 'status',
    render: (row) =>
      h(
        NTag,
        {
          type: row.status === 'online' ? 'success' : 'default'
        },
        () => row.status
      )
  },
  {
    title: '地址数量',
    key: 'addresses',
    render: (row) => row.addresses?.length || 0
  },
  {
    title: '最后发现',
    key: 'lastSeen',
    render: (row) => new Date(row.lastSeen).toLocaleString()
  },
  {
    title: '操作',
    key: 'actions',
    render: (row) =>
      h(
        NButton,
        {
          size: 'small',
          onClick: () => connectToPeer(row.id)
        },
        () => '连接'
      )
  }
]

// 刷新状态
const refreshStatus = async () => {
  loading.value = true
  try {
    const result = await window.electron.p2p.getStatus()
    if (result.success) {
      // 状态已通过store管理，这里只需要触发更新
      p2pStore.setConnectionStatus(result.isRunning || false)
      if (result.nodeId) {
        p2pStore.setNodeId(result.nodeId)
      }
    }
  } catch (error) {
    console.warn('P2P服务未启用:', error instanceof Error ? error.message : String(error))
    p2pStore.setConnectionStatus(false)
    message.warning('P2P服务当前未启用，这是一个演示界面')
  } finally {
    loading.value = false
  }
}

// 刷新节点
const refreshPeers = async () => {
  peersLoading.value = true
  try {
    const result = await window.electron.p2p.getDiscoveredPeers()
    if (result.success) {
      p2pStore.setDiscoveredNodes(result.peers || [])
    }

    // 同时获取连接的节点
    const connectedResult = await window.electron.p2p.getConnectedPeers()
    if (connectedResult.success) {
      p2pStore.setConnectedPeers(connectedResult.peers || [])
    }
  } catch (error) {
    console.warn(
      'P2P服务未启用，无法获取节点列表:',
      error instanceof Error ? error.message : String(error)
    )
    p2pStore.setDiscoveredNodes([])
    // 不显示错误消息，因为这是预期的行为
  } finally {
    peersLoading.value = false
  }
}

// 连接到节点
const connectToPeer = async (peerId: string) => {
  try {
    await connectToP2PPeer({ peerId })
    message.success('连接成功')
    await refreshPeers()
  } catch (error) {
    message.error('连接失败: ' + (error instanceof Error ? error.message : String(error)))
  }
}

// 初始化
onMounted(async () => {
  await refreshStatus()
  await refreshPeers()
})
</script>

<style scoped>
.p2p-manager {
  padding: 16px;
  max-width: 1200px;
  margin: 0 auto;
}

.mb-4 {
  margin-bottom: 16px;
}
</style>
