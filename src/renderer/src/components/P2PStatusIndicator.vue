<template>
  <div class="p2p-status-indicator">
    <!-- 简化的圆点状态指示器 -->
    <div class="status-dot" :class="statusClass" :title="statusText" @click="showDetails = true">
      <div class="dot-inner"></div>
    </div>

    <!-- 详情模态框 -->
    <n-modal v-model:show="showDetails" preset="card" title="网络状态" style="width: 500px">
      <div class="p2p-status-details">
        <n-space vertical>
          <!-- 连接状态 -->
          <n-card title="连接状态" size="small">
            <n-space vertical>
              <div class="status-item">
                <span class="label">网络状态:</span>
                <n-tag :type="networkStatusType">{{ networkStatusText }}</n-tag>
              </div>
              <div v-if="p2pStore.nodeId" class="status-item">
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
              v-if="!p2pStore.isConnected"
              type="primary"
              :loading="reconnecting"
              @click="reconnect"
            >
              重新连接
            </n-button>
            <n-button type="warning" :loading="restarting" @click="restart"> 重启服务 </n-button>
            <n-button @click="refreshStatus"> 刷新状态 </n-button>
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
// import {
//   Refresh
// } from "@icon-park/vue-next"

const p2pStore = useP2PStore()
const message = useMessage()

// 状态
const showDetails = ref(false)
const reconnecting = ref(false)
const restarting = ref(false)

// 计算属性
// const isConnecting = computed(() => p2pStore.networkStatus === 'connecting')

const statusText = computed(() => {
  switch (p2pStore.networkStatus) {
    case 'connected':
      return 'P2P已连接'
    case 'connecting':
      return '连接中...'
    case 'error':
      return 'P2P连接错误'
    default:
      return 'P2P未连接'
  }
})

// 圆点状态样式类
const statusClass = computed(() => {
  switch (p2pStore.networkStatus) {
    case 'connected':
      return 'status-connected'
    case 'connecting':
      return 'status-connecting'
    case 'error':
      return 'status-error'
    default:
      return 'status-disconnected'
  }
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

/* 圆点状态指示器样式 */
.status-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
  border: 2px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.status-dot:hover {
  transform: scale(1.1);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
}

.dot-inner {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  transition: all 0.3s ease;
}

/* 连接正常 - 绿色 */
.status-connected .dot-inner {
  background-color: #52c41a;
  box-shadow: 0 0 0 2px rgba(82, 196, 26, 0.2);
}

/* 连接中 - 橙色，带动画 */
.status-connecting .dot-inner {
  background-color: #fa8c16;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(250, 140, 22, 0.4);
  }
  70% {
    box-shadow: 0 0 0 6px rgba(250, 140, 22, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(250, 140, 22, 0);
  }
}

/* 连接错误 - 红色 */
.status-error .dot-inner {
  background-color: #ff4d4f;
  box-shadow: 0 0 0 2px rgba(255, 77, 79, 0.2);
}

/* 未连接 - 灰色 */
.status-disconnected .dot-inner {
  background-color: #d9d9d9;
  box-shadow: 0 0 0 2px rgba(217, 217, 217, 0.2);
}

/* 详情模态框样式 */
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
