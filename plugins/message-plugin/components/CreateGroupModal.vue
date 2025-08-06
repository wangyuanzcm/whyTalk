<template>
  <n-modal 
    v-model:show="visible" 
    preset="dialog" 
    title="创建群组"
    style="width: 500px;"
  >
    <n-form ref="formRef" :model="formData" :rules="rules">
      <n-form-item label="群组名称" path="groupName">
        <n-input 
          v-model:value="formData.groupName" 
          placeholder="输入群组名称"
          maxlength="20"
          show-count
        />
      </n-form-item>
      
      <n-form-item label="群组描述" path="description">
        <n-input 
          v-model:value="formData.description" 
          type="textarea"
          placeholder="输入群组描述（可选）"
          maxlength="100"
          show-count
          :autosize="{ minRows: 2, maxRows: 4 }"
        />
      </n-form-item>
      
      <n-form-item label="选择成员" path="selectedMembers">
        <div class="member-selection">
          <n-input 
            v-model:value="searchMember"
            placeholder="搜索联系人..."
            clearable
            style="margin-bottom: 12px;"
          />
          
          <div class="member-list">
            <div 
              v-for="contact in filteredContacts" 
              :key="contact.id"
              class="member-item"
              :class="{ 'selected': formData.selectedMembers.includes(contact.id) }"
              @click="toggleMember(contact.id)"
            >
              <n-checkbox 
                :checked="formData.selectedMembers.includes(contact.id)"
                @update:checked="() => toggleMember(contact.id)"
              />
              <n-avatar size="small" :style="{ background: getAvatarColor(contact.name) }">
                {{ contact.avatar }}
              </n-avatar>
              <div class="member-info">
                <div class="member-name">{{ contact.name }}</div>
                <div class="member-status">
                  <n-badge 
                    :type="contact.online ? 'success' : 'default'"
                    :value="contact.online ? '在线' : '离线'"
                    size="small"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div v-if="formData.selectedMembers.length > 0" class="selected-count">
            已选择 {{ formData.selectedMembers.length }} 个成员
          </div>
        </div>
      </n-form-item>
    </n-form>
    
    <template #action>
      <n-space>
        <n-button @click="handleCancel">取消</n-button>
        <n-button 
          type="primary" 
          @click="handleConfirm"
          :loading="loading"
          :disabled="!formData.groupName.trim() || formData.selectedMembers.length === 0"
        >
          创建群组
        </n-button>
      </n-space>
    </template>
  </n-modal>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

/**
 * 创建群组模态框组件
 * 负责群组创建的表单处理
 */
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  contacts: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['update:show', 'confirm']);

const visible = computed({
  get: () => props.show,
  set: (value) => emit('update:show', value)
});

const formRef = ref(null);
const loading = ref(false);
const searchMember = ref('');

// 表单数据
const formData = ref({
  groupName: '',
  description: '',
  selectedMembers: []
});

// 表单验证规则
const rules = {
  groupName: [
    { required: true, message: '请输入群组名称', trigger: 'blur' },
    { min: 1, max: 20, message: '群组名称长度应在1-20个字符之间', trigger: 'blur' }
  ],
  selectedMembers: [
    { 
      type: 'array', 
      min: 1, 
      message: '请至少选择一个成员', 
      trigger: 'change' 
    }
  ]
};

// 过滤后的联系人列表
const filteredContacts = computed(() => {
  if (!searchMember.value) {
    return props.contacts;
  }
  return props.contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchMember.value.toLowerCase())
  );
});

/**
 * 切换成员选择状态
 * @param {string} memberId - 成员ID
 */
const toggleMember = (memberId) => {
  const index = formData.value.selectedMembers.indexOf(memberId);
  if (index > -1) {
    formData.value.selectedMembers.splice(index, 1);
  } else {
    formData.value.selectedMembers.push(memberId);
  }
};

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
 * 处理取消操作
 */
const handleCancel = () => {
  resetForm();
  visible.value = false;
};

/**
 * 处理确认操作
 */
const handleConfirm = async () => {
  try {
    await formRef.value?.validate();
    loading.value = true;
    
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const groupData = {
      name: formData.value.groupName,
      description: formData.value.description,
      members: formData.value.selectedMembers
    };
    
    emit('confirm', groupData);
    resetForm();
    visible.value = false;
  } catch (error) {
    console.error('表单验证失败:', error);
  } finally {
    loading.value = false;
  }
};

/**
 * 重置表单
 */
const resetForm = () => {
  formData.value = {
    groupName: '',
    description: '',
    selectedMembers: []
  };
  searchMember.value = '';
};

// 监听模态框显示状态，重置表单
watch(() => props.show, (newValue) => {
  if (newValue) {
    resetForm();
  }
});
</script>

<style scoped>
.member-selection {
  max-height: 300px;
}

.member-list {
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  padding: 8px;
}

.member-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.member-item:hover {
  background: #f5f5f5;
}

.member-item.selected {
  background: #e3f2fd;
}

.member-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.member-name {
  font-weight: 500;
  font-size: 14px;
}

.member-status {
  font-size: 12px;
}

.selected-count {
  margin-top: 8px;
  padding: 8px;
  background: #f0f8ff;
  border-radius: 4px;
  font-size: 12px;
  color: #2196f3;
  text-align: center;
}
</style>