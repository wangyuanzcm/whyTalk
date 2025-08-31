<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useSettingsStore } from '@/store'

const settingsStore = useSettingsStore()

const isPromptTone = computed({
  get: () => settingsStore.isPromptTone,
  set: (value) => {
    settingsStore.setPromptTone(value)
  }
})

const isKeyboard = computed({
  get: () => settingsStore.isKeyboard,
  set: (value) => {
    settingsStore.setKeyboard(value)
  }
})

const isNotify = computed({
  get: () => settingsStore.isNotify,
  set: (value) => {
    settingsStore.setNotify(value)
    value && toPermission()
  }
})

const hasPermission = ref(false)

hasPermission.value = Notification.permission === 'granted'

const toPermission = () => {
  Notification.requestPermission().then((permission) => {
    hasPermission.value = permission === 'granted'
  })
}
</script>

<template>
  <section>
    <h3 class="title">通知设置</h3>

    <div class="view-box">
      <div class="view-list">
        <div class="content">
          <div class="name">新消息提示音</div>
          <div class="desc">新消息提示音 ：{{ isPromptTone ? '已开启' : '已关闭' }}</div>
        </div>
        <div class="tools">
          <n-switch v-model:value="isPromptTone" size="medium" />
        </div>
      </div>

      <div class="view-list">
        <div class="content">
          <div class="name">推送键盘输入消息</div>
          <div class="desc">推送键盘输入消息：{{ isKeyboard ? '已开启' : '已关闭' }}</div>
        </div>
        <div class="tools">
          <n-switch v-model:value="isKeyboard" size="medium" />
        </div>
      </div>

      <div class="view-list">
        <div class="content">
          <div class="name">消息通知</div>
          <div class="desc">
            消息通知：{{ isNotify ? '已开启' : '已关闭' }}

            <span v-show="isNotify && !hasPermission">
              (当前未获得浏览器通知权限，
              <n-button type="primary" text @click="toPermission">点击获取权限</n-button>)
            </span>
          </div>
        </div>
        <div class="tools">
          <n-switch v-model:value="isNotify" size="medium" />
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="less" scoped>
@import '@/styles/theme/index.less';

section {
  padding: var(--spacing-lg);
  background: var(--color-bg-content);
  border-radius: var(--border-radius-lg);
  .card-shadow();
}

.title {
  margin: 0 0 var(--spacing-xl) 0;
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  line-height: var(--line-height-tight);
  padding-bottom: var(--spacing-md);
  border-bottom: 1px solid var(--color-border-light);
}

.view-box {
  .flex-column();
  gap: var(--spacing-lg);
}

.view-list {
  .flex-row();
  justify-content: space-between;
  align-items: flex-start;
  padding: var(--spacing-lg);
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border-light);
  border-radius: var(--border-radius-md);
  transition: all var(--transition-base);
  
  &:hover {
    border-color: var(--color-primary-light);
    background: var(--color-bg-hover);
    .card-shadow();
  }
}

.content {
  flex: 1;
  margin-right: var(--spacing-lg);
  
  .name {
    font-size: var(--font-size-md);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text-primary);
    margin-bottom: var(--spacing-sm);
    line-height: var(--line-height-tight);
  }
  
  .desc {
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
    line-height: var(--line-height-relaxed);
    
    span {
      color: var(--color-text-tertiary);
      font-size: var(--font-size-xs);
      
      :deep(.n-button) {
        color: var(--color-primary);
        font-size: var(--font-size-xs);
        padding: 0;
        margin: 0 var(--spacing-xs);
        text-decoration: underline;
        
        &:hover {
          color: var(--color-primary-hover);
          text-decoration: none;
        }
      }
    }
  }
}

.tools {
  .flex-center();
  flex-shrink: 0;
  
  :deep(.n-switch) {
    .n-switch__rail {
      transition: all var(--transition-base);
    }
    
    &.n-switch--active {
      .n-switch__rail {
        background: var(--color-primary);
      }
    }
    
    .n-switch__button {
      transition: all var(--transition-base);
      box-shadow: var(--shadow-sm);
    }
  }
}

// 响应式设计
section {
  .container();
  .spacing-responsive(var(--spacing-lg), var(--spacing-xl));
}

.title {
  .font-responsive(var(--font-size-lg), var(--font-size-xl));
}

.view-box {
  .spacing-responsive(var(--spacing-lg), var(--spacing-xl));
}

// 平板端优化
.tablet-only() {
  section {
    padding: var(--spacing-md);
  }
  
  .title {
    font-size: var(--font-size-lg);
    margin-bottom: var(--spacing-lg);
  }
  
  .view-box {
    gap: var(--spacing-md);
  }
  
  .view-list {
    .flex-column();
    align-items: stretch;
    gap: var(--spacing-md);
    padding: var(--spacing-md);
    
    .content {
      margin-right: 0;
      
      .name {
        font-size: var(--font-size-sm);
        margin-bottom: var(--spacing-xs);
      }
      
      .desc {
        font-size: var(--font-size-xs);
        
        span {
          display: block;
          margin-top: var(--spacing-xs);
        }
      }
    }
    
    .tools {
      justify-content: flex-end;
      
      :deep(.n-switch) {
        transform: scale(0.9);
      }
    }
  }
}

// 移动端优化
.mobile-only() {
  section {
    padding: var(--spacing-sm);
    border-radius: var(--border-radius-md);
    margin: var(--spacing-sm);
  }
  
  .title {
    font-size: var(--font-size-md);
    margin-bottom: var(--spacing-md);
    padding-bottom: var(--spacing-sm);
    text-align: center;
  }
  
  .view-box {
    gap: var(--spacing-sm);
  }
  
  .view-list {
    .flex-column();
    align-items: stretch;
    gap: var(--spacing-sm);
    padding: var(--spacing-sm);
    border-radius: var(--border-radius-sm);
    
    .content {
      margin-right: 0;
      text-align: left;
      
      .name {
        font-size: var(--font-size-xs);
        margin-bottom: var(--spacing-2xs);
        font-weight: var(--font-weight-medium);
      }
      
      .desc {
        font-size: var(--font-size-2xs);
        line-height: var(--line-height-normal);
        
        span {
          display: block;
          margin-top: var(--spacing-xs);
          font-size: var(--font-size-3xs);
          
          :deep(.n-button) {
            font-size: var(--font-size-3xs);
            margin: 0 var(--spacing-2xs);
          }
        }
      }
    }
    
    .tools {
      justify-content: center;
      padding-top: var(--spacing-xs);
      
      :deep(.n-switch) {
        transform: scale(0.8);
      }
    }
  }
}

// 超小屏幕优化
.desktop-down(@breakpoint-xs) {
  section {
    padding: var(--spacing-xs);
  }
  
  .title {
    font-size: var(--font-size-sm);
    margin-bottom: var(--spacing-sm);
  }
  
  .view-list {
    padding: var(--spacing-xs);
    
    .content {
      .name {
        font-size: var(--font-size-2xs);
      }
      
      .desc {
        font-size: var(--font-size-3xs);
      }
    }
    
    .tools {
      :deep(.n-switch) {
        transform: scale(0.7);
      }
    }
  }
}

// 暗色主题适配
:global([data-theme='dark']) {
  section {
    background: var(--color-bg-content-dark);
  }
  
  .title {
    color: var(--color-text-primary-dark);
    border-bottom-color: var(--color-border-dark);
  }
  
  .view-list {
    background: var(--color-bg-secondary-dark);
    border-color: var(--color-border-dark);
    
    &:hover {
      border-color: var(--color-primary-dark-light);
      background: var(--color-bg-hover-dark);
    }
  }
  
  .content {
    .name {
      color: var(--color-text-primary-dark);
    }
    
    .desc {
      color: var(--color-text-secondary-dark);
      
      span {
        color: var(--color-text-tertiary-dark);
        
        :deep(.n-button) {
          color: var(--color-primary-dark);
          
          &:hover {
            color: var(--color-primary-dark-hover);
          }
        }
      }
    }
  }
  
  .tools {
    :deep(.n-switch) {
      &.n-switch--active {
        .n-switch__rail {
          background: var(--color-primary-dark);
        }
      }
    }
  }
}
</style>
