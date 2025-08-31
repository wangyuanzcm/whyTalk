<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ServUserUpdate, ServUserDetail } from '@/api/user.ts'
import AvatarCropper from '@/components/basic/AvatarCropper.vue'
import { hidePhone } from '@/utils/string'
import { useInject } from '@/hooks'
import { useUserStore } from '@/store'

const router = useRouter()
const userStore = useUserStore()
const { message } = useInject()
const cropper = ref(false)
const loading = ref(false)

const detail = reactive({
  avatar: '',
  nickname: '',
  mobile: '',
  email: '',
  gender: '0',
  motto: '0',
  birthday: undefined as string | undefined
})

const loadDetail = async () => {
  const { code, data } = await ServUserDetail()
  if (code != 200 || !data) return

  detail.nickname = data.nickname
  detail.mobile = data.mobile
  detail.email = data.email
  detail.gender = data.gender.toString()
  detail.motto = data.motto
  detail.avatar = data.avatar

  if (data.birthday) {
    detail.birthday = data.birthday
  }
}

// 修改用户信息
const onChangeDetail = async () => {
  if (!detail.nickname.trim()) {
    return message.warning('昵称不能为空')
  }

  if (detail.motto.length > 500) {
    return message.warning('个性签名文字长度不能超过500')
  }

  const { code } = await ServUserUpdate(
    {
      nickname: detail.nickname.trim(),
      avatar: detail.avatar,
      motto: detail.motto,
      gender: parseInt(detail.gender),
      birthday: detail.birthday
    },
    { loading, successText: '信息保存成功' }
  )

  if (code != 200) return

  userStore.avatar = detail.avatar
  userStore.motto = detail.motto
}

const onUploadAvatar = (avatar: string) => {
  cropper.value = false
  detail.avatar = avatar
  onChangeDetail()
}

loadDetail()
</script>

<template>
  <h3 class="title">个人信息</h3>

  <section class="el-container container">
    <aside class="el-aside el-aside-left">
      <n-avatar
        :size="150"
        :src="detail.avatar"
        class="avatar-box pointer"
        @click="cropper = true"
      />

      <n-button text @click="cropper = true"> 点击修改头像 </n-button>
    </aside>

    <main class="el-main" style="padding-right: 20px">
      <n-form
        ref="formRef"
        label-placement="left"
        label-width="auto"
        require-mark-placement="right-hanging"
        size="medium"
        style="max-width: 500px; margin-top: 25px"
      >
        <n-form-item label="登录账号：">
          {{ hidePhone(detail.mobile) }}
          <n-button class="mt-l15" type="primary" text @click="router.push('/settings/security')">
            修改
          </n-button>
        </n-form-item>
        <n-form-item label="电子邮箱：">
          {{ detail.email }}
          <n-button class="mt-l15" type="primary" text @click="router.push('/settings/security')">
            修改
          </n-button>
        </n-form-item>
        <n-form-item label="我的昵称：">
          <n-input
            v-model:value="detail.nickname"
            placeholder="我的昵称"
            maxlength="20"
            show-count
          />
        </n-form-item>
        <n-form-item label="我的性别：">
          <n-radio-group v-model:value="detail.gender" name="gender">
            <n-space>
              <n-radio key="1" value="1"> 男 </n-radio>
              <n-radio key="2" value="2"> 女 </n-radio>
              <n-radio key="0" value="0"> 保密 </n-radio>
            </n-space>
          </n-radio-group>
        </n-form-item>
        <n-form-item label="我的生日：">
          <n-date-picker
            v-model:formatted-value="detail.birthday"
            type="date"
            value-format="yyyy-MM-dd"
          />
        </n-form-item>
        <n-form-item label="个性签名：">
          <n-input
            v-model:value="detail.motto"
            placeholder="编辑个签，展示我的独特态度"
            type="textarea"
            maxlength="500"
            show-count
            :autosize="{
              minRows: 3,
              maxRows: 5
            }"
          />
        </n-form-item>

        <n-form-item>
          <n-button
            type="primary"
            :loading="loading"
            text-color="#ffffff"
            style="margin-left: 94px"
            @click="onChangeDetail"
          >
            保存修改
          </n-button>
        </n-form-item>
      </n-form>
    </main>
  </section>

  <!-- 头像裁剪组件 -->
  <AvatarCropper v-if="cropper" @close="cropper = false" @success="onUploadAvatar" />
</template>

<style lang="less" scoped>
@import '@/styles/theme/index.less';

.title {
  margin: 0 0 var(--spacing-xl) 0;
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  line-height: var(--line-height-tight);
}

.container {
  .flex-row();
  gap: var(--spacing-xl);
  background: var(--color-bg-content);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-xl);
  .card-shadow();
  border: 1px solid var(--color-border-light);
}

.el-aside-left {
  .flex-column();
  align-items: center;
  width: 200px;
  flex-shrink: 0;
  
  .avatar-box {
    background: var(--color-bg-secondary);
    border-radius: var(--border-radius-lg);
    margin-bottom: var(--spacing-lg);
    transition: all var(--transition-base);
    border: 2px solid var(--color-border-light);
    
    &:hover {
      border-color: var(--color-primary);
      transform: scale(1.02);
      .card-shadow-hover();
    }
  }
  
  :deep(.n-button) {
    color: var(--color-primary);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    
    &:hover {
      color: var(--color-primary-hover);
    }
  }
}

.el-main {
  flex: 1;
  padding: 0;
  
  :deep(.n-form) {
    max-width: 500px;
    
    .n-form-item {
      margin-bottom: var(--spacing-lg);
      
      .n-form-item-label {
        font-weight: var(--font-weight-medium);
        color: var(--color-text-primary);
        font-size: var(--font-size-sm);
      }
      
      .n-form-item-blank {
        .flex-center();
        justify-content: flex-start;
        gap: var(--spacing-md);
        
        .n-input {
          border-radius: var(--border-radius-md);
          border: 1px solid var(--color-border-light);
          transition: all var(--transition-base);
          
          &:hover {
            border-color: var(--color-primary-light);
          }
          
          &:focus-within {
            border-color: var(--color-primary);
            .card-shadow();
          }
        }
        
        .n-date-picker {
          border-radius: var(--border-radius-md);
          
          .n-input {
            border-radius: var(--border-radius-md);
          }
        }
        
        .n-radio-group {
          .n-radio {
            margin-right: var(--spacing-lg);
            
            .n-radio__label {
              font-size: var(--font-size-sm);
              color: var(--color-text-primary);
            }
          }
        }
        
        .n-button {
          &.n-button--text-type {
            color: var(--color-primary);
            font-size: var(--font-size-sm);
            padding: var(--spacing-xs) var(--spacing-sm);
            border-radius: var(--border-radius-sm);
            transition: all var(--transition-base);
            
            &:hover {
              background: var(--color-primary-light);
              color: var(--color-primary-hover);
            }
          }
          
          &.n-button--primary-type {
            background: var(--color-primary);
            border: none;
            border-radius: var(--border-radius-md);
            padding: var(--spacing-md) var(--spacing-xl);
            font-weight: var(--font-weight-medium);
            transition: all var(--transition-base);
            margin-left: 0;
            
            &:hover {
              background: var(--color-primary-hover);
              transform: translateY(-1px);
              .card-shadow();
            }
            
            &:active {
              transform: translateY(0);
            }
          }
        }
      }
    }
    
    // 账号和邮箱显示样式
    .n-form-item:nth-child(1),
    .n-form-item:nth-child(2) {
      .n-form-item-blank {
        font-size: var(--font-size-sm);
        color: var(--color-text-secondary);
        font-family: var(--font-family-mono);
        background: var(--color-bg-secondary);
        padding: var(--spacing-sm) var(--spacing-md);
        border-radius: var(--border-radius-md);
        border: 1px solid var(--color-border-light);
      }
    }
  }
}

// 响应式设计
.title {
  .font-responsive(var(--font-size-lg), var(--font-size-xl));
}

.container {
  .container();
  .spacing-responsive(var(--spacing-lg), var(--spacing-xl));
}

// 平板端优化
.tablet-only() {
  .container {
    .flex-column();
    gap: var(--spacing-lg);
    padding: var(--spacing-lg);
  }
  
  .el-aside-left {
    width: 100%;
    .flex-row();
    justify-content: center;
    gap: var(--spacing-lg);
    
    .avatar-box {
      margin-bottom: 0;
      :deep(.n-avatar) {
        width: 120px !important;
        height: 120px !important;
      }
    }
  }
  
  .el-main {
    :deep(.n-form) {
      max-width: 100%;
      
      .n-form-item {
        .n-form-item-label {
          min-width: 100px;
        }
      }
    }
  }
}

// 移动端优化
.mobile-only() {
  .title {
    font-size: var(--font-size-md);
    margin-bottom: var(--spacing-md);
    text-align: center;
  }
  
  .container {
    .flex-column();
    padding: var(--spacing-md);
    gap: var(--spacing-md);
  }
  
  .el-aside-left {
    width: 100%;
    .flex-column();
    align-items: center;
    
    .avatar-box {
      margin-bottom: var(--spacing-sm);
      
      :deep(.n-avatar) {
        width: 100px !important;
        height: 100px !important;
      }
    }
    
    :deep(.n-button) {
      font-size: var(--font-size-xs);
    }
  }
  
  .el-main {
    :deep(.n-form) {
      .n-form-item {
        margin-bottom: var(--spacing-md);
        
        .n-form-item-label {
          margin-bottom: var(--spacing-xs);
          font-size: var(--font-size-xs);
          min-width: auto;
        }
        
        .n-form-item-blank {
          .flex-column();
          align-items: stretch;
          gap: var(--spacing-xs);
          
          .n-input {
            width: 100%;
          }
          
          .n-date-picker {
            width: 100%;
          }
          
          .n-radio-group {
            .n-radio {
              margin-right: var(--spacing-md);
              margin-bottom: var(--spacing-xs);
            }
          }
          
          .n-button {
            &.n-button--text-type {
              align-self: flex-start;
              padding: var(--spacing-xs);
            }
          }
        }
      }
      
      // 账号和邮箱在移动端的特殊处理
      .n-form-item:nth-child(1),
      .n-form-item:nth-child(2) {
        .n-form-item-blank {
          .flex-row();
          align-items: center;
          justify-content: space-between;
          padding: var(--spacing-sm);
          font-size: var(--font-size-xs);
          
          .n-button {
            margin-left: var(--spacing-xs);
            flex-shrink: 0;
          }
        }
      }
      
      // 保存按钮在移动端的处理
      .n-form-item:last-child {
        .n-form-item-blank {
          justify-content: center;
          
          .n-button {
            &.n-button--primary-type {
              width: 100%;
              margin-left: 0;
              padding: var(--spacing-md);
            }
          }
        }
      }
    }
  }
}

// 超小屏幕优化
.desktop-down(@breakpoint-xs) {
  .title {
    font-size: var(--font-size-sm);
  }
  
  .container {
    padding: var(--spacing-sm);
  }
  
  .el-aside-left {
    .avatar-box {
      :deep(.n-avatar) {
        width: 80px !important;
        height: 80px !important;
      }
    }
  }
  
  .el-main {
    :deep(.n-form) {
      .n-form-item {
        margin-bottom: var(--spacing-sm);
        
        .n-form-item-label {
          font-size: var(--font-size-2xs);
        }
        
        .n-form-item-blank {
          .n-input {
            font-size: var(--font-size-xs);
          }
        }
      }
    }
  }
}

// 暗色主题适配
:global([data-theme='dark']) {
  .title {
    color: var(--color-text-primary-dark);
  }
  
  .container {
    background: var(--color-bg-content-dark);
    border-color: var(--color-border-dark);
  }
  
  .el-aside-left {
    .avatar-box {
      background: var(--color-bg-secondary-dark);
      border-color: var(--color-border-dark);
      
      &:hover {
        border-color: var(--color-primary-dark);
      }
    }
    
    :deep(.n-button) {
      color: var(--color-primary-dark);
      
      &:hover {
        color: var(--color-primary-dark-hover);
      }
    }
  }
  
  .el-main {
    :deep(.n-form) {
      .n-form-item {
        .n-form-item-label {
          color: var(--color-text-primary-dark);
        }
        
        .n-form-item-blank {
          .n-input {
            border-color: var(--color-border-dark);
            background: var(--color-bg-input-dark);
            
            &:hover {
              border-color: var(--color-primary-dark-light);
            }
            
            &:focus-within {
              border-color: var(--color-primary-dark);
            }
          }
          
          .n-radio {
            .n-radio__label {
              color: var(--color-text-primary-dark);
            }
          }
          
          .n-button {
            &.n-button--text-type {
              color: var(--color-primary-dark);
              
              &:hover {
                background: var(--color-primary-dark-light);
                color: var(--color-primary-dark-hover);
              }
            }
            
            &.n-button--primary-type {
              background: var(--color-primary-dark);
              
              &:hover {
                background: var(--color-primary-dark-hover);
              }
            }
          }
        }
      }
      
      // 账号和邮箱显示样式 - 暗色主题
      .n-form-item:nth-child(1),
      .n-form-item:nth-child(2) {
        .n-form-item-blank {
          color: var(--color-text-secondary-dark);
          background: var(--color-bg-secondary-dark);
          border-color: var(--color-border-dark);
        }
      }
    }
  }
}
</style>
