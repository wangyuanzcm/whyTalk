<template>
  <div class="p2p-manager">
    <!-- P2P 服务状态提示 -->
    <n-alert v-if="!status.isRunning" type="warning" class="mb-4">
      <template #header>P2P 服务未启用</template>
      P2P 功能当前处于开发阶段，服务暂时未启用。这是一个演示界面，展示了 P2P 功能的完整设计。
      <br>要启用 P2P 功能，需要解决 libp2p 依赖问题并重新启动服务。
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
          <n-button @click="refreshStatus" :loading="loading">
            刷新状态
          </n-button>
          <n-button @click="refreshPeers" :loading="peersLoading">
            刷新节点
          </n-button>
        </n-space>
      </n-space>
    </n-card>

    <n-tabs default-value="peers" type="line">
      <n-tab-pane name="peers" tab="发现的节点">
        <n-card>
          <template #header>
            <n-space justify="space-between">
              <span>已发现的节点 ({{ peers.length }})</span>
              <n-button size="small" @click="refreshPeers" :loading="peersLoading">
                刷新
              </n-button>
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

      <n-tab-pane name="contacts" tab="P2P联系人">
        <n-card>
          <template #header>
            <n-space justify="space-between">
              <span>P2P联系人 ({{ contacts.length }})</span>
              <n-space>
                <n-button size="small" @click="showAddContactModal = true">
                  添加联系人
                </n-button>
                <n-button size="small" @click="refreshContacts" :loading="contactsLoading">
                  刷新
                </n-button>
              </n-space>
            </n-space>
          </template>
          
          <n-data-table
            :columns="contactColumns"
            :data="contacts"
            :loading="contactsLoading"
            :pagination="false"
            size="small"
          />
        </n-card>
      </n-tab-pane>

      <n-tab-pane name="groups" tab="P2P群组">
        <n-card>
          <template #header>
            <n-space justify="space-between">
              <span>P2P群组</span>
              <n-button size="small" @click="showCreateGroupModal = true">
                创建群组
              </n-button>
            </n-space>
          </template>
          
          <n-empty description="暂无群组数据" />
        </n-card>
      </n-tab-pane>

      <n-tab-pane name="messages" tab="消息测试">
        <n-card>
          <n-space vertical>
            <n-form ref="messageFormRef" :model="messageForm" label-placement="left" label-width="80">
              <n-form-item label="接收方">
                <n-select
                  v-model:value="messageForm.targetPeerId"
                  :options="peerOptions"
                  placeholder="选择接收方节点"
                  clearable
                />
              </n-form-item>
              <n-form-item label="消息内容">
                <n-input
                  v-model:value="messageForm.content"
                  type="textarea"
                  placeholder="输入消息内容"
                  :rows="3"
                />
              </n-form-item>
              <n-form-item>
                <n-button @click="sendTestMessage" :loading="sendingMessage" type="primary">
                  发送消息
                </n-button>
              </n-form-item>
            </n-form>
          </n-space>
        </n-card>
      </n-tab-pane>
    </n-tabs>

    <!-- 添加联系人模态框 -->
    <n-modal v-model:show="showAddContactModal" preset="dialog" title="添加P2P联系人">
      <n-form ref="contactFormRef" :model="contactForm" label-placement="left" label-width="80">
        <n-form-item label="节点ID" required>
          <n-input v-model:value="contactForm.peerId" placeholder="输入节点ID" />
        </n-form-item>
        <n-form-item label="昵称">
          <n-input v-model:value="contactForm.nickname" placeholder="输入昵称" />
        </n-form-item>
        <n-form-item label="备注">
          <n-input v-model:value="contactForm.remark" placeholder="输入备注" />
        </n-form-item>
      </n-form>
      <template #action>
        <n-space>
          <n-button @click="showAddContactModal = false">取消</n-button>
          <n-button @click="addContact" :loading="addingContact" type="primary">添加</n-button>
        </n-space>
      </template>
    </n-modal>

    <!-- 创建群组模态框 -->
    <n-modal v-model:show="showCreateGroupModal" preset="dialog" title="创建P2P群组">
      <n-form ref="groupFormRef" :model="groupForm" label-placement="left" label-width="80">
        <n-form-item label="群组名称" required>
          <n-input v-model:value="groupForm.name" placeholder="输入群组名称" />
        </n-form-item>
        <n-form-item label="群组描述">
          <n-input v-model:value="groupForm.description" type="textarea" placeholder="输入群组描述" :rows="3" />
        </n-form-item>
      </n-form>
      <template #action>
        <n-space>
          <n-button @click="showCreateGroupModal = false">取消</n-button>
          <n-button @click="createGroup" :loading="creatingGroup" type="primary">创建</n-button>
        </n-space>
      </template>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, h } from 'vue'
import { 
  NCard, NTag, NSpace, NDescriptions, NDescriptionsItem, NText, NButton, 
  NTabs, NTabPane, NDataTable, NEmpty, NForm, NFormItem, NInput, NSelect,
  NModal, NAlert, useMessage
} from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import {
  getP2PContacts,
  connectToP2PPeer,
  sendP2PMessage,
  type P2PContact,
  type P2PPeer
} from '@/api/p2p'
import { useP2PStore } from '@/store/modules/p2p'

const message = useMessage()
const p2pStore = useP2PStore()

// 本地状态


// P2P状态对象
const status = computed(() => ({
  isRunning: p2pStore.isConnected,
  peerId: p2pStore.nodeId
}))

// 使用store中的状态

const contacts = computed(() => p2pStore.contacts)

// 节点数据
const peers = computed(() => p2pStore.discoveredNodes)

// 加载状态
const loading = ref(false)
const peersLoading = ref(false)
const contactsLoading = ref(false)
const sendingMessage = ref(false)

// 操作状态
const addingContact = ref(false)
const creatingGroup = ref(false)

// 模态框状态
const showAddContactModal = ref(false)
const showCreateGroupModal = ref(false)

// 表单数据
const messageForm = ref({
  targetPeerId: '',
  content: ''
})

const contactForm = ref({
  peerId: '',
  nickname: '',
  remark: ''
})

const groupForm = ref({
  name: '',
  description: ''
})

// 节点选项
const peerOptions = computed(() => {
  return peers.value.map(peer => ({
    label: `${peer.id} (${peer.status})`,
    value: peer.id
  }))
})

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
    render: (row) => h(NTag, { 
      type: row.status === 'online' ? 'success' : 'default' 
    }, () => row.status)
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
    render: (row) => h(NSpace, {}, () => [
      h(NButton, {
        size: 'small',
        onClick: () => connectToPeer(row.id)
      }, () => '连接'),
      h(NButton, {
        size: 'small',
        onClick: () => addContactFromPeer(row.id)
      }, () => '添加联系人')
    ])
  }
]

// 联系人表格列
const contactColumns: DataTableColumns<P2PContact> = [
  {
    title: '节点ID',
    key: 'peerId',
    render: (row) => h('span', { style: 'font-family: monospace; font-size: 12px;' }, row.peerId)
  },
  {
    title: '昵称',
    key: 'nickname'
  },
  {
    title: '备注',
    key: 'remark'
  },
  {
    title: '状态',
    key: 'status',
    render: (row) => h(NTag, { 
      type: row.status === 'online' ? 'success' : 'default' 
    }, () => row.status || 'unknown')
  },
  {
    title: '添加时间',
    key: 'addedAt',
    render: (row) => row.addedAt ? new Date(row.addedAt).toLocaleString() : '-'
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
    console.warn('P2P服务未启用，无法获取节点列表:', error instanceof Error ? error.message : String(error))
    p2pStore.setDiscoveredNodes([])
    // 不显示错误消息，因为这是预期的行为
  } finally {
    peersLoading.value = false
  }
}

// 刷新联系人
const refreshContacts = async () => {
  contactsLoading.value = true
  try {
    const contactsData = await getP2PContacts()
    p2pStore.setContacts(contactsData)
  } catch (error) {
    console.warn('P2P服务未启用，无法获取联系人列表:', error instanceof Error ? error.message : String(error))
    p2pStore.setContacts([])
    // 不显示错误消息，因为这是预期的行为
  } finally {
    contactsLoading.value = false
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

// 从节点添加联系人
const addContactFromPeer = (peerId: string) => {
  contactForm.value.peerId = peerId
  showAddContactModal.value = true
}

// 添加联系人
const addContact = async () => {
  if (!contactForm.value.peerId) {
    message.error('请输入节点ID')
    return
  }

  addingContact.value = true
  try {
    const result = await window.electron.p2p.addContact({
      peerId: contactForm.value.peerId,
      nickname: contactForm.value.nickname,
      remark: contactForm.value.remark
    })
    if (result.success) {
      message.success('联系人添加成功')
      showAddContactModal.value = false
      contactForm.value = { peerId: '', nickname: '', remark: '' }
      await refreshContacts()
    } else {
      message.error(result.message || '联系人添加失败')
    }
  } catch (error) {
    message.error('添加联系人失败: ' + (error instanceof Error ? error.message : String(error)))
  } finally {
    addingContact.value = false
  }
}

// 创建群组
const createGroup = async () => {
  if (!groupForm.value.name) {
    message.error('请输入群组名称')
    return
  }

  creatingGroup.value = true
  try {
    const result = await window.electron.p2p.createGroup({
      name: groupForm.value.name,
      description: groupForm.value.description
    })
    if (result.success) {
      message.success(`创建群组成功，群组ID: ${result.groupId}`)
      showCreateGroupModal.value = false
      groupForm.value = { name: '', description: '' }
    } else {
      message.error(result.message || '群组创建失败')
    }
  } catch (error) {
    message.error('创建群组失败: ' + (error instanceof Error ? error.message : String(error)))
  } finally {
    creatingGroup.value = false
  }
}

// 发送测试消息
const sendTestMessage = async () => {
  if (!messageForm.value.targetPeerId || !messageForm.value.content) {
    message.error('请选择接收方并输入消息内容')
    return
  }

  sendingMessage.value = true
  try {
    await sendP2PMessage({
      targetPeerId: messageForm.value.targetPeerId,
      type: 'text',
      content: messageForm.value.content
    })
    message.success('消息发送成功')
    messageForm.value.content = ''
  } catch (error) {
    message.error('消息发送失败: ' + (error instanceof Error ? error.message : String(error)))
  } finally {
    sendingMessage.value = false
  }
}

// 初始化
onMounted(async () => {
  await refreshStatus()
  await refreshPeers()
  await refreshContacts()
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