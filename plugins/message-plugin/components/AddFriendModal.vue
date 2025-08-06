<template>
  <n-modal 
    v-model:show="visible" 
    preset="dialog" 
    title="添加朋友"
    style="width: 450px;"
  >
    <n-tabs v-model:value="activeTab" type="line">
      <!-- 搜索用户 -->
      <n-tab-pane name="search" tab="搜索用户">
        <n-form ref="searchFormRef" :model="searchForm" :rules="searchRules">
          <n-form-item label="用户信息" path="keyword">
            <n-input 
              v-model:value="searchForm.keyword" 
              placeholder="输入用户名、邮箱或手机号"
              clearable
              @keyup.enter="handleSearch"
            />
          </n-form-item>
          
          <n-form-item>
            <n-button 
              type="primary" 
              @click="handleSearch"
              :loading="searchLoading"
              block
            >
              搜索
            </n-button>
          </n-form-item>
        </n-form>
        
        <!-- 搜索结果 -->
        <div v-if="searchResults.length > 0" class="search-results">
          <div class="result-title">搜索结果</div>
          <div 
            v-for="user in searchResults" 
            :key="user.id"
            class="user-item"
          >
            <n-avatar :style="{ background: getAvatarColor(user.name) }">
              {{ user.avatar }}
            </n-avatar>
            <div class="user-info">
              <div class="user-name">{{ user.name }}</div>
              <div class="user-detail">{{ user.email || user.phone }}</div>
            </div>
            <n-button 
              size="small"
              type="primary"
              :disabled="user.isFriend"
              @click="sendFriendRequest(user)"
            >
              {{ user.isFriend ? '已是好友' : '添加' }}
            </n-button>
          </div>
        </div>
        
        <div v-else-if="hasSearched && searchResults.length === 0" class="no-results">
          <n-empty description="未找到相关用户" />
        </div>
      </n-tab-pane>
      
      <!-- 扫码添加 -->
      <n-tab-pane name="qrcode" tab="扫码添加">
        <div class="qr-section">
          <div class="qr-tabs">
            <n-radio-group v-model:value="qrMode" name="qrMode">
              <n-radio-button value="scan">扫描二维码</n-radio-button>
              <n-radio-button value="show">我的二维码</n-radio-button>
            </n-radio-group>
          </div>
          
          <!-- 扫描二维码 -->
          <div v-if="qrMode === 'scan'" class="scan-section">
            <div class="camera-container">
              <div class="camera-placeholder">
                📷
                <div>点击开启摄像头扫描</div>
              </div>
            </div>
            <n-button type="primary" @click="startCamera" block>
              开启摄像头
            </n-button>
          </div>
          
          <!-- 我的二维码 -->
          <div v-else class="my-qr-section">
            <div class="qr-code">
              <div class="qr-placeholder">
                <div class="qr-grid">
                  <div v-for="i in 25" :key="i" class="qr-dot"></div>
                </div>
              </div>
            </div>
            <div class="qr-info">
              <div>扫描上方二维码添加我为好友</div>
              <n-button size="small" @click="saveQRCode">保存二维码</n-button>
            </div>
          </div>
        </div>
      </n-tab-pane>
      
      <!-- 附近的人 -->
      <n-tab-pane name="nearby" tab="附近的人">
        <div class="nearby-section">
          <n-alert type="info" style="margin-bottom: 16px;">
            开启位置服务后可以发现附近的用户
          </n-alert>
          
          <n-button 
            type="primary" 
            @click="findNearbyUsers"
            :loading="nearbyLoading"
            block
          >
            发现附近的人
          </n-button>
          
          <div v-if="nearbyUsers.length > 0" class="nearby-results">
            <div class="result-title">附近的用户</div>
            <div 
              v-for="user in nearbyUsers" 
              :key="user.id"
              class="user-item"
            >
              <n-avatar :style="{ background: getAvatarColor(user.name) }">
                {{ user.avatar }}
              </n-avatar>
              <div class="user-info">
                <div class="user-name">{{ user.name }}</div>
                <div class="user-detail">距离 {{ user.distance }}</div>
              </div>
              <n-button 
                size="small"
                type="primary"
                @click="sendFriendRequest(user)"
              >
                添加
              </n-button>
            </div>
          </div>
        </div>
      </n-tab-pane>
    </n-tabs>
    
    <template #action>
      <n-button @click="handleCancel">关闭</n-button>
    </template>
  </n-modal>
</template>

<script setup>
import { ref, computed } from 'vue';

/**
 * 添加朋友模态框组件
 * 支持搜索用户、扫码添加、附近的人等功能
 */
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:show', 'addFriend']);

const visible = computed({
  get: () => props.show,
  set: (value) => emit('update:show', value)
});

const activeTab = ref('search');
const searchFormRef = ref(null);
const searchLoading = ref(false);
const nearbyLoading = ref(false);
const hasSearched = ref(false);
const qrMode = ref('scan');

// 搜索表单
const searchForm = ref({
  keyword: ''
});

// 搜索验证规则
const searchRules = {
  keyword: [
    { required: true, message: '请输入搜索关键词', trigger: 'blur' },
    { min: 2, message: '搜索关键词至少2个字符', trigger: 'blur' }
  ]
};

// 搜索结果
const searchResults = ref([]);

// 附近的用户
const nearbyUsers = ref([]);

/**
 * 获取头像颜色
 * @param {string} name - 姓名
 * @returns {string} 颜色值
 */
const getAvatarColor = (name) => {
  const colors = ['#2196f3', '#4caf50', '#ff9800', '#f44336', '#9c27b0', '#607d8b'];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
};

/**
 * 搜索用户
 */
const handleSearch = async () => {
  try {
    await searchFormRef.value?.validate();
    searchLoading.value = true;
    hasSearched.value = true;
    
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // 模拟搜索结果
    searchResults.value = [
      {
        id: '1',
        name: '张三',
        avatar: '张',
        email: 'zhangsan@example.com',
        isFriend: false
      },
      {
        id: '2',
        name: '李四',
        avatar: '李',
        phone: '138****5678',
        isFriend: true
      }
    ].filter(user => 
      user.name.includes(searchForm.value.keyword) ||
      (user.email && user.email.includes(searchForm.value.keyword)) ||
      (user.phone && user.phone.includes(searchForm.value.keyword))
    );
  } catch (error) {
    console.error('搜索失败:', error);
  } finally {
    searchLoading.value = false;
  }
};

/**
 * 发送好友请求
 * @param {Object} user - 用户信息
 */
const sendFriendRequest = async (user) => {
  try {
    // 模拟发送好友请求
    await new Promise(resolve => setTimeout(resolve, 500));
    
    emit('addFriend', user);
    
    // 更新用户状态
    user.isFriend = true;
    
    window.$message?.success(`已向 ${user.name} 发送好友请求`);
  } catch (error) {
    console.error('发送好友请求失败:', error);
    window.$message?.error('发送好友请求失败');
  }
};

/**
 * 开启摄像头
 */
const startCamera = () => {
  // 这里可以实现摄像头功能
  window.$message?.info('摄像头功能开发中...');
};

/**
 * 保存二维码
 */
const saveQRCode = () => {
  // 这里可以实现保存二维码功能
  window.$message?.success('二维码已保存到相册');
};

/**
 * 发现附近的用户
 */
const findNearbyUsers = async () => {
  try {
    nearbyLoading.value = true;
    
    // 模拟获取位置权限和搜索附近用户
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // 模拟附近用户数据
    nearbyUsers.value = [
      {
        id: '3',
        name: '王五',
        avatar: '王',
        distance: '50m'
      },
      {
        id: '4',
        name: '赵六',
        avatar: '赵',
        distance: '120m'
      }
    ];
  } catch (error) {
    console.error('搜索附近用户失败:', error);
    window.$message?.error('搜索附近用户失败');
  } finally {
    nearbyLoading.value = false;
  }
};

/**
 * 处理取消操作
 */
const handleCancel = () => {
  // 重置数据
  searchForm.value.keyword = '';
  searchResults.value = [];
  nearbyUsers.value = [];
  hasSearched.value = false;
  activeTab.value = 'search';
  
  visible.value = false;
};
</script>

<style scoped>
.search-results,
.nearby-results {
  margin-top: 16px;
}

.result-title {
  font-weight: bold;
  margin-bottom: 12px;
  color: #333;
}

.user-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-bottom: 8px;
  transition: all 0.2s;
}

.user-item:hover {
  background: #f5f5f5;
}

.user-info {
  flex: 1;
}

.user-name {
  font-weight: 500;
  margin-bottom: 4px;
}

.user-detail {
  font-size: 12px;
  color: #666;
}

.no-results {
  margin-top: 20px;
  text-align: center;
}

.qr-section {
  text-align: center;
}

.qr-tabs {
  margin-bottom: 20px;
}

.camera-container {
  margin: 20px 0;
}

.camera-placeholder {
  width: 200px;
  height: 200px;
  border: 2px dashed #ccc;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  font-size: 48px;
  color: #ccc;
}

.camera-placeholder div {
  font-size: 14px;
  margin-top: 8px;
}

.my-qr-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.qr-code {
  margin: 20px 0;
}

.qr-placeholder {
  width: 160px;
  height: 160px;
  border: 1px solid #ccc;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
}

.qr-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 2px;
  width: 120px;
  height: 120px;
}

.qr-dot {
  background: #333;
  border-radius: 1px;
}

.qr-info {
  text-align: center;
}

.qr-info div {
  margin-bottom: 12px;
  color: #666;
  font-size: 14px;
}

.nearby-section {
  text-align: center;
}
</style>