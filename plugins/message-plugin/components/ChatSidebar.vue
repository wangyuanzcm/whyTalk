<template>
  <n-layout-sider 
    width="320" 
    bordered 
    style="background: #fafafa;"
  >
    <!-- 头部 -->
    <div class="sidebar-header">
      <div class="header-title">消息</div>
      <n-space>
        <n-tooltip trigger="hover" content="LocalSend状态">
          <n-button 
            circle 
            size="small" 
            @click="$emit('show-device-list')"
            :type="localSendStatus ? 'primary' : 'default'"
          >
            📡
          </n-button>
        </n-tooltip>
        <n-tooltip trigger="hover" content="添加朋友">
          <n-button circle size="small" @click="$emit('show-add-friend')">
            👤
          </n-button>
        </n-tooltip>
        <n-tooltip trigger="hover" content="创建群组">
          <n-button circle size="small" @click="$emit('show-create-group')">
            👥
          </n-button>
        </n-tooltip>
        <n-tooltip trigger="hover" content="截屏">
          <n-button circle size="small" @click="$emit('capture-screenshot')">
            📷
          </n-button>
        </n-tooltip>
      </n-space>
    </div>

    <!-- 搜索框 -->
    <div class="search-section">
      <n-input 
        v-model:value="searchKeyword"
        placeholder="搜索聊天记录..."
        round
        clearable
        @update:value="$emit('update:search-keyword', $event)"
      />
    </div>

    <!-- 过滤标签 -->
    <n-tabs 
      :value="currentFilter" 
      type="segment" 
      size="small"
      class="filter-tabs"
      @update:value="$emit('update:current-filter', $event)"
    >
      <n-tab-pane name="all" tab="全部" />
      <n-tab-pane name="friends" tab="好友" />
      <n-tab-pane name="groups" tab="群聊" />
      <n-tab-pane name="unread" tab="未读" />
    </n-tabs>

    <!-- 聊天列表 -->
    <div class="chat-list">
      <n-list>
        <n-list-item 
          v-for="chat in chatList" 
          :key="chat.id"
          class="chat-item"
          :class="{ 'active': currentChat?.id === chat.id }"
          @click="$emit('select-chat', chat)"
        >
          <div class="chat-item-content">
            <n-badge :value="chat.unreadCount" :show="chat.unreadCount > 0">
              <n-avatar 
                :style="{ background: '#2196f3' }"
                size="medium"
              >
                {{ chat.avatar }}
                <div 
                  v-if="chat.online"
                  class="online-indicator"
                ></div>
              </n-avatar>
            </n-badge>
            <div class="chat-info">
              <div class="chat-header">
                <div class="chat-name">
                  {{ chat.name }}
                  <span v-if="chat.pinned" class="pin-icon">📌</span>
                </div>
                <div class="chat-time">{{ chat.time }}</div>
              </div>
              <div class="chat-preview">
                {{ chat.lastMessage }}
              </div>
            </div>
          </div>
        </n-list-item>
      </n-list>
    </div>
  </n-layout-sider>
</template>

<script setup>
/**
 * 聊天侧边栏组件
 * 负责显示聊天列表、搜索和过滤功能
 */
defineProps({
  chatList: {
    type: Array,
    default: () => []
  },
  currentChat: {
    type: Object,
    default: null
  },
  searchKeyword: {
    type: String,
    default: ''
  },
  currentFilter: {
    type: String,
    default: 'all'
  },
  localSendStatus: {
    type: Boolean,
    default: false
  }
});

defineEmits([
  'select-chat',
  'show-create-group',
  'show-add-friend',
  'show-device-list',
  'capture-screenshot',
  'update:search-keyword',
  'update:current-filter'
]);
</script>

<style scoped>
.sidebar-header {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  border-bottom: 1px solid #e0e0e0;
  background: white;
}

.header-title {
  font-size: 18px;
  font-weight: 500;
  color: #333;
}

.search-section {
  padding: 12px 16px;
  background: white;
  border-bottom: 1px solid #e0e0e0;
}

.filter-tabs {
  padding: 0 16px;
  background: white;
  border-bottom: 1px solid #e0e0e0;
}

.chat-list {
  flex: 1;
  overflow-y: auto;
}

.chat-item {
  cursor: pointer;
  padding: 12px 16px;
  transition: background-color 0.2s;
  border-bottom: 1px solid #f0f0f0;
  background: white;
}

.chat-item:hover {
  background: #f8f8f8;
}

.chat-item.active {
  background: #e3f2fd;
}

.chat-item-content {
  display: flex;
  align-items: center;
  width: 100%;
}

.online-indicator {
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #4caf50;
  border: 2px solid white;
}

.chat-info {
  flex: 1;
  margin-left: 12px;
  min-width: 0;
}

.chat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4px;
}

.chat-name {
  font-weight: 500;
  font-size: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.pin-icon {
  margin-left: 4px;
  font-size: 12px;
}

.chat-time {
  font-size: 12px;
  color: #999;
}

.chat-preview {
  font-size: 13px;
  color: #666;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>