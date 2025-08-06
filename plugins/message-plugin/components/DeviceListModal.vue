<template>
  <n-modal 
    v-model:show="visible" 
    preset="dialog" 
    title="LocalSend 设备列表"
    style="width: 500px;"
  >
    <div class="device-list-container">
      <!-- 服务状态 -->
      <div class="service-status">
        <n-alert 
          :type="localSendEnabled ? 'success' : 'warning'"
          :title="localSendEnabled ? 'LocalSend 服务已启动' : 'LocalSend 服务未启动'"
        >
          {{ localSendEnabled ? '可以发现和连接附近的设备' : '请先启动 LocalSend 服务' }}
        </n-alert>
      </div>
      
      <!-- 操作按钮 -->
      <div class="action-buttons">
        <n-space>
          <n-button 
            type="primary"
            :loading="refreshing"
            @click="handleRefresh"
          >
            刷新设备
          </n-button>
          <n-button 
            :type="localSendEnabled ? 'error' : 'success'"
            @click="toggleService"
          >
            {{ localSendEnabled ? '停止服务' : '启动服务' }}
          </n-button>
        </n-space>
      </div>
      
      <!-- 设备列表 -->
      <div class="device-list">
        <div v-if="devices.length === 0 && !refreshing" class="no-devices">
          <n-empty description="未发现设备">
            <template #extra>
              <n-button size="small" @click="handleRefresh">
                重新扫描
              </n-button>
            </template>
          </n-empty>
        </div>
        
        <div v-else>
          <div 
            v-for="device in devices" 
            :key="device.id"
            class="device-item"
            :class="{ 'connected': device.connected }"
          >
            <div class="device-icon">
              {{ getDeviceIcon(device.type) }}
            </div>
            
            <div class="device-info">
              <div class="device-name">{{ device.name }}</div>
              <div class="device-details">
                <span class="device-type">{{ getDeviceTypeName(device.type) }}</span>
                <span class="device-ip">{{ device.ip }}</span>
                <n-badge 
                  :type="device.connected ? 'success' : 'default'"
                  :value="device.connected ? '已连接' : '未连接'"
                  size="small"
                />
              </div>
            </div>
            
            <div class="device-actions">
              <n-dropdown 
                :options="getDeviceActions(device)"
                @select="(key) => handleDeviceAction(key, device)"
              >
                <n-button size="small" quaternary>
                  ⋮
                </n-button>
              </n-dropdown>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 本机信息 -->
      <div class="local-info">
        <n-divider>本机信息</n-divider>
        <div class="local-device">
          <div class="device-icon">💻</div>
          <div class="device-info">
            <div class="device-name">{{ localDevice.name }}</div>
            <div class="device-details">
              <span class="device-ip">{{ localDevice.ip }}</span>
              <span class="device-port">端口: {{ localDevice.port }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <template #action>
      <n-button @click="handleClose">关闭</n-button>
    </template>
  </n-modal>
</template>

<script setup>
import { ref, computed } from 'vue';

/**
 * 设备列表模态框组件
 * 显示 LocalSend 发现的设备列表
 */
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  devices: {
    type: Array,
    default: () => []
  },
  localSendEnabled: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:show', 'refresh', 'toggleService', 'sendFile', 'connectDevice']);

const visible = computed({
  get: () => props.show,
  set: (value) => emit('update:show', value)
});

const refreshing = ref(false);

// 本机设备信息
const localDevice = ref({
  name: 'My Computer',
  ip: '192.168.1.100',
  port: 53317
});

/**
 * 获取设备图标
 * @param {string} type - 设备类型
 * @returns {string} 图标
 */
const getDeviceIcon = (type) => {
  const icons = {
    desktop: '🖥️',
    laptop: '💻',
    mobile: '📱',
    tablet: '📱',
    unknown: '📟'
  };
  return icons[type] || icons.unknown;
};

/**
 * 获取设备类型名称
 * @param {string} type - 设备类型
 * @returns {string} 类型名称
 */
const getDeviceTypeName = (type) => {
  const names = {
    desktop: '台式机',
    laptop: '笔记本',
    mobile: '手机',
    tablet: '平板',
    unknown: '未知设备'
  };
  return names[type] || names.unknown;
};

/**
 * 获取设备操作选项
 * @param {Object} device - 设备信息
 * @returns {Array} 操作选项
 */
const getDeviceActions = (device) => {
  const actions = [
    {
      label: '发送文件',
      key: 'sendFile',
      icon: '📁'
    }
  ];
  
  if (!device.connected) {
    actions.push({
      label: '连接设备',
      key: 'connect',
      icon: '🔗'
    });
  }
  
  actions.push({
    label: '设备详情',
    key: 'details',
    icon: 'ℹ️'
  });
  
  return actions;
};

/**
 * 处理设备操作
 * @param {string} action - 操作类型
 * @param {Object} device - 设备信息
 */
const handleDeviceAction = (action, device) => {
  switch (action) {
    case 'sendFile':
      emit('sendFile', device);
      break;
    case 'connect':
      emit('connectDevice', device);
      break;
    case 'details':
      showDeviceDetails(device);
      break;
  }
};

/**
 * 显示设备详情
 * @param {Object} device - 设备信息
 */
const showDeviceDetails = (device) => {
  const details = `
设备名称: ${device.name}
设备类型: ${getDeviceTypeName(device.type)}
IP 地址: ${device.ip}
端口: ${device.port || '53317'}
连接状态: ${device.connected ? '已连接' : '未连接'}
发现时间: ${device.discoveredAt || '刚刚'}
  `.trim();
  
  window.$dialog?.info({
    title: '设备详情',
    content: details,
    positiveText: '确定'
  });
};

/**
 * 刷新设备列表
 */
const handleRefresh = async () => {
  refreshing.value = true;
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    emit('refresh');
  } finally {
    refreshing.value = false;
  }
};

/**
 * 切换服务状态
 */
const toggleService = () => {
  emit('toggleService');
};

/**
 * 关闭模态框
 */
const handleClose = () => {
  visible.value = false;
};
</script>

<style scoped>
.device-list-container {
  max-height: 500px;
  overflow-y: auto;
}

.service-status {
  margin-bottom: 16px;
}

.action-buttons {
  margin-bottom: 16px;
  text-align: center;
}

.device-list {
  margin-bottom: 16px;
}

.no-devices {
  text-align: center;
  padding: 20px;
}

.device-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-bottom: 8px;
  transition: all 0.2s;
}

.device-item:hover {
  background: #f5f5f5;
}

.device-item.connected {
  border-color: #4caf50;
  background: #f1f8e9;
}

.device-icon {
  font-size: 24px;
  width: 40px;
  text-align: center;
}

.device-info {
  flex: 1;
}

.device-name {
  font-weight: 500;
  margin-bottom: 4px;
}

.device-details {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #666;
}

.device-type {
  background: #f0f0f0;
  padding: 2px 6px;
  border-radius: 4px;
}

.device-ip {
  font-family: monospace;
}

.device-actions {
  display: flex;
  align-items: center;
}

.local-info {
  margin-top: 16px;
}

.local-device {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 8px;
}

.device-port {
  font-family: monospace;
  color: #666;
}
</style>