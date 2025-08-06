<template>
  <n-layout-content>
    <!-- 空状态 -->
    <div 
      v-if="!currentChat"
      class="empty-state"
    >
      <div class="empty-icon">💬</div>
      <h3>选择一个聊天</h3>
      <p>从左侧选择一个聊天开始对话</p>
    </div>

    <!-- 聊天内容 -->
    <div v-else class="chat-content">
      <!-- 聊天头部 -->
      <div class="chat-header">
        <div class="chat-title">
          <n-avatar size="small" :style="{ background: '#2196f3' }">
            {{ currentChat.avatar }}
          </n-avatar>
          <div class="chat-title-info">
            <h3>{{ currentChat.name }}</h3>
            <p>{{ currentChat.online ? '在线' : '离线' }}</p>
          </div>
        </div>
        <n-space>
          <n-tooltip trigger="hover" content="语音通话">
            <n-button circle size="small">📞</n-button>
          </n-tooltip>
          <n-tooltip trigger="hover" content="视频通话">
            <n-button circle size="small">📹</n-button>
          </n-tooltip>
          <n-tooltip trigger="hover" content="聊天信息">
            <n-button circle size="small">ℹ️</n-button>
          </n-tooltip>
        </n-space>
      </div>

      <!-- 消息区域 -->
      <div 
        ref="messagesContainer"
        class="messages-container"
      >
        <MessageItem
          v-for="message in messages"
          :key="message.id"
          :message="message"
          :current-chat="currentChat"
        />
      </div>

      <!-- 输入区域 -->
      <div class="input-area">
        <!-- 工具栏 -->
        <div class="input-toolbar">
          <n-tooltip trigger="hover" content="表情">
            <n-button size="small" text>😊</n-button>
          </n-tooltip>
          <n-upload 
            :show-file-list="false"
            @change="handleFileUpload"
            accept="*"
          >
            <n-tooltip trigger="hover" content="发送文件">
              <n-button size="small" text>📎</n-button>
            </n-tooltip>
          </n-upload>
          <n-upload 
            :show-file-list="false"
            @change="handleFileUpload"
            accept="image/*"
          >
            <n-tooltip trigger="hover" content="发送图片">
              <n-button size="small" text>🖼️</n-button>
            </n-tooltip>
          </n-upload>
          <n-tooltip trigger="hover" content="截屏">
            <n-button size="small" text @click="$emit('capture-screenshot')">📷</n-button>
          </n-tooltip>
          <n-tooltip trigger="hover" content="语音">
            <n-button size="small" text>🎤</n-button>
          </n-tooltip>
        </div>
        
        <!-- 消息输入 -->
        <div class="message-input">
          <n-input
            v-model:value="messageInput"
            type="textarea"
            placeholder="输入消息..."
            :autosize="{ minRows: 1, maxRows: 4 }"
            @keypress="handleKeyPress"
            @update:value="$emit('update:message-input', $event)"
          />
          <n-button 
            type="primary"
            circle
            size="large"
            :disabled="!messageInput.trim()"
            @click="$emit('send-message')"
          >
            ➤
          </n-button>
        </div>
      </div>
    </div>
  </n-layout-content>
</template>

<script setup>
import { ref, nextTick, watch } from 'vue';
import MessageItem from './MessageItem.vue';

/**
 * 聊天面板组件
 * 负责显示聊天内容和消息输入
 */
const props = defineProps({
  currentChat: {
    type: Object,
    default: null
  },
  messages: {
    type: Array,
    default: () => []
  },
  messageInput: {
    type: String,
    default: ''
  }
});

const emit = defineEmits([
  'send-message',
  'capture-screenshot',
  'update:message-input',
  'file-upload'
]);

const messagesContainer = ref(null);

/**
 * 处理键盘事件
 * @param {KeyboardEvent} event - 键盘事件
 */
const handleKeyPress = (event) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    emit('send-message');
  }
};

/**
 * 处理文件上传
 * @param {Object} options - 上传选项
 */
const handleFileUpload = (options) => {
  emit('file-upload', options);
};

/**
 * 滚动到底部
 */
const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
};

// 监听消息变化，自动滚动到底部
watch(() => props.messages, () => {
  nextTick(() => {
    scrollToBottom();
  });
}, { deep: true });

// 监听当前聊天变化，滚动到底部
watch(() => props.currentChat, () => {
  nextTick(() => {
    scrollToBottom();
  });
});
</script>

<style scoped>
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #999;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.empty-state h3 {
  margin: 0 0 8px 0;
  font-size: 18px;
}

.empty-state p {
  margin: 0;
  font-size: 14px;
}

.chat-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.chat-header {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  border-bottom: 1px solid #e0e0e0;
  background: white;
}

.chat-title {
  display: flex;
  align-items: center;
  gap: 12px;
}

.chat-title-info h3 {
  font-size: 16px;
  margin: 0;
}

.chat-title-info p {
  font-size: 12px;
  color: #666;
  margin: 2px 0 0 0;
}

.messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  background: #f8f9fa;
}

.input-area {
  border-top: 1px solid #e0e0e0;
  background: white;
}

.input-toolbar {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  gap: 8px;
  border-bottom: 1px solid #f0f0f0;
}

.message-input {
  padding: 12px 16px;
  display: flex;
  gap: 12px;
  align-items: flex-end;
}
</style>