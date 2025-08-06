<template>
  <div 
    class="message-item"
    :class="{ 'own': message.sender === 'self' }"
  >
    <n-avatar 
      size="small" 
      :style="{ 
        background: message.sender === 'self' ? '#2196f3' : '#666',
        margin: message.sender === 'self' ? '0 0 0 12px' : '0 12px 0 0'
      }"
    >
      {{ message.sender === 'self' ? '我' : currentChat.avatar }}
    </n-avatar>
    
    <div class="message-content">
      <div 
        class="message-bubble"
        :class="{ 'own': message.sender === 'self' }"
      >
        <!-- 文本消息 -->
        <div v-if="message.type === 'text'">
          {{ message.content }}
        </div>
        
        <!-- 图片消息 -->
        <img 
          v-else-if="message.type === 'image'"
          :src="message.content"
          class="message-image"
          alt="图片"
          @click="previewImage"
        />
        
        <!-- 文件消息 -->
        <div v-else-if="message.type === 'file'" class="file-message">
          <div class="file-icon">📎</div>
          <div class="file-info">
            <div class="file-name">{{ message.content }}</div>
            <div class="file-size">{{ message.fileSize }}</div>
          </div>
          <n-button size="small" type="primary" @click="downloadFile">
            下载
          </n-button>
        </div>
        
        <!-- 语音消息 -->
        <div v-else-if="message.type === 'voice'" class="voice-message">
          <n-button 
            circle 
            size="small" 
            :type="isPlaying ? 'error' : 'primary'"
            @click="toggleVoicePlay"
          >
            {{ isPlaying ? '⏸️' : '▶️' }}
          </n-button>
          <div class="voice-duration">{{ message.duration || '0:00' }}</div>
        </div>
      </div>
      
      <div class="message-time">
        {{ message.time }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

/**
 * 消息项组件
 * 负责显示单条消息的内容
 */
const props = defineProps({
  message: {
    type: Object,
    required: true
  },
  currentChat: {
    type: Object,
    required: true
  }
});

const isPlaying = ref(false);

/**
 * 预览图片
 */
const previewImage = () => {
  // 这里可以实现图片预览功能
  window.open(props.message.content, '_blank');
};

/**
 * 下载文件
 */
const downloadFile = () => {
  // 这里可以实现文件下载功能
  const link = document.createElement('a');
  link.href = props.message.content;
  link.download = props.message.content;
  link.click();
};

/**
 * 切换语音播放状态
 */
const toggleVoicePlay = () => {
  isPlaying.value = !isPlaying.value;
  // 这里可以实现语音播放功能
  if (isPlaying.value) {
    // 播放语音
    setTimeout(() => {
      isPlaying.value = false;
    }, 3000); // 模拟播放3秒
  }
};
</script>

<style scoped>
.message-item {
  margin-bottom: 16px;
  display: flex;
  align-items: flex-start;
}

.message-item.own {
  flex-direction: row-reverse;
}

.message-content {
  max-width: 60%;
  display: flex;
  flex-direction: column;
}

.message-bubble {
  padding: 12px 16px;
  border-radius: 18px;
  word-wrap: break-word;
  background: white;
  border: 1px solid #e0e0e0;
}

.message-bubble.own {
  background: #2196f3;
  color: white;
  border: none;
}

.message-time {
  font-size: 11px;
  color: #999;
  margin-top: 4px;
  text-align: center;
}

.message-image {
  max-width: 200px;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s;
}

.message-image:hover {
  transform: scale(1.02);
}

.file-message {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 200px;
}

.file-icon {
  font-size: 24px;
}

.file-info {
  flex: 1;
}

.file-name {
  font-weight: bold;
  margin-bottom: 4px;
}

.file-size {
  font-size: 12px;
  opacity: 0.8;
}

.voice-message {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 120px;
}

.voice-duration {
  font-size: 14px;
  font-weight: bold;
}
</style>