<template>
  <div class="p2p-status-indicator">
    <n-badge 
      :value="badgeValue" 
      :color="badgeColor"
      :show="showBadge"
      dot
    >
      <n-button 
        :type="buttonType"
        size="small"
        @click="showDetails = true"
        :loading="isConnecting"
      >
        <template #icon>
          <n-icon>
            <component :is="statusIcon" />
          </n-icon>
        </template>
        {{ statusText }}
      </n-button>
    </n-badge>

    <!-- 详情模态框 -->
    <n-modal v-model:show="showDetails" preset="card" title="P2P网络状态" style="width: 500px;">
      <div class="p2p-status-details">
        <n-space vertical>
          <!-- 连接状态 -->
          <n-card title="连接状态" size="small">
            <n-space vertical>
              <div class="status-item">
                <span class="label">网络状态:</span>
                <n-tag :type="networkStatusType">{{ networkStatusText }}</n-tag>
              </div>
              <div class="status-item" v-if="p2pStore.nodeId">
                <span class="label">节点ID:</span>
                <n-text code>{{ p2pStore.nodeId.slice(0, 16) }}...</n-text>
              </div>
              <div class="status-item">
                <span class="label">已连接节点:</span>
                <n-text>{{ p2pStore.connectedPeers.length }}</n-text>
              </div>
              <div class="status-item">
                <span class="label">发现的节点:</span>
                <n-text>{{ p2pStore.discoveredNodes.length }}</n-text>
              </div>
            </n-space>
          </n-card>

          <!-- 数据统计 -->
          <n-card title="数据统计" size="small">
            <n-space vertical>
              <div class="status-item">
                <span class="label">联系人:</span>
                <n-text>{{ p2pStore.contacts.length }}</n-text>
              </div>
              <div class="status-item">
                <span class="label">群组:</span>
                <n-text>{{ p2pStore.groups.length }}</n-text>
              </div>
              <div class="status-item">
                <span class="label">未读消息:</span>
                <n-text>{{ p2pStore.totalUnreadMessages }}</n-text>
              </div>
              <div class="status-item">
                <span class="label">联系人请求:</span>
                <n-text>{{ p2pStore.contactRequests.length }}</n-text>
              </div>
            </n-space>
          </n-card>

          <!-- 操作按钮 -->
          <n-space>
            <n-button 
              type="primary" 
              @click="reconnect"
              :loading="reconnecting"
              v-if="!p2pStore.isConnected"
            >
              重新连接
            </n-button>
            <n-button 
              type="warning" 
              @click="restart"
              :loading="restarting"
            >
              重启服务
            </n-button>
            <n-button @click="refreshStatus">
              刷新状态
            </n-button>
          </n-space>
        </n-space>
      </div>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useP2PStore } from '@/store/modules/p2p'
import { p2pInitializer } from '@/utils/p2p-init'
import { useMessage } from 'naive-ui'
import {
  CheckOne,
  CloseOne,
  Refresh,
  Remind
} from "@icon-park/vue-next"

const p2pStore = useP2PStore()
const message = useMessage()

// 状态
const showDetails = ref(false)
const reconnecting = ref(false)
const restarting = ref(false)

// 计算属性
const isConnecting = computed(() => p2pStore.networkStatus === 'connecting')

const statusIcon = computed(() => {
  switch (p2pStore.networkStatus) {
    case 'connected':
      return CheckOne
    case 'connecting':
      return Refresh
    case 'error':
      return Remind
    default:
      return CloseOne
  }
})

const statusText = computed(() => {
  switch (p2pStore.networkStatus) {
    case 'connected':
      return 'P2P已连接'
    case 'connecting':
      return '连接中...'
    case 'error':
      return 'P2P错误'
    default:
      return 'P2P未连接'
  }
})

const buttonType = computed(() => {
  switch (p2pStore.networkStatus) {
    case 'connected':
      return 'success'
    case 'connecting':
      return 'info'
    case 'error':
      return 'error'
    default:
      return 'default'
  }
})

const badgeColor = computed(() => {
  switch (p2pStore.networkStatus) {
    case 'connected':
      return '#52c41a'
    case 'connecting':
      return '#1890ff'
    case 'error':
      return '#ff4d4f'
    default:
      return '#d9d9d9'
  }
})

const showBadge = computed(() => {
  return p2pStore.contactRequests.length > 0 || p2pStore.totalUnreadMessages > 0
})

const badgeValue = computed(() => {
  const total = p2pStore.contactRequests.length + p2pStore.totalUnreadMessages
  return total > 99 ? '99+' : total.toString()
})

const networkStatusType = computed(() => {
  switch (p2pStore.networkStatus) {
    case 'connected':
      return 'success'
    case 'connecting':
      return 'info'
    case 'error':
      return 'error'
    default:
      return 'default'
  }
})

const networkStatusText = computed(() => {
  switch (p2pStore.networkStatus) {
    case 'connected':
      return '已连接'
    case 'connecting':
      return '连接中'
    case 'error':
      return '连接错误'
    default:
      return '未连接'
  }
})

// 方法
const reconnect = async () => {
  try {
    reconnecting.value = true
    const success = await p2pInitializer.initialize()
    if (success) {
      message.success('P2P重新连接成功')
    } else {
      message.error('P2P重新连接失败')
    }
  } catch (error) {
    console.error('重新连接失败:', error)
    message.error('重新连接失败')
  } finally {
    reconnecting.value = false
  }
}

const restart = async () => {
  try {
    restarting.value = true
    const success = await p2pInitializer.restart()
    if (success) {
      message.success('P2P服务重启成功')
    } else {
      message.error('P2P服务重启失败')
    }
  } catch (error) {
    console.error('重启服务失败:', error)
    message.error('重启服务失败')
  } finally {
    restarting.value = false
  }
}

const refreshStatus = async () => {
  try {
    const status = await p2pInitializer.getStatus()
    if (status.success) {
      p2pStore.setConnectionStatus(status.isRunning || false)
      if (status.nodeId) {
        p2pStore.setNodeId(status.nodeId)
      }
      message.success('状态已刷新')
    }
  } catch (error) {
    console.error('刷新状态失败:', error)
    message.error('刷新状态失败')
  }
}
</script>

<style scoped>
.p2p-status-indicator {
  display: inline-block;
}

.p2p-status-details {
  max-height: 60vh;
  overflow-y: auto;
}

.status-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 0;
}

.label {
  font-weight: 500;
  color: var(--text-color-2);
  min-width: 80px;
}
</style>