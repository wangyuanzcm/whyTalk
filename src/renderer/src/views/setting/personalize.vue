<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useSettingsStore } from '@/store'
import { useThemeStore } from '@/store/modules/theme'
import ThemeSelector from '@/components/theme/ThemeSelector.vue'
import { NButton, NRadioGroup, NRadio, NSpace, NSelect, NDivider } from 'naive-ui'

const settingsStore = useSettingsStore()
const themeStore = useThemeStore()

// 显示主题选择器的状态
const showThemeSelector = ref(false)

const themeMode = computed({
  get: () => settingsStore.themeMode,
  set: (value: string) => {
    settingsStore.setThemeMode(value)
  }
})

const defaultPage = computed({
  get: () => settingsStore.defaultPage,
  set: (value: string) => {
    settingsStore.setDefaultPage(value)
  }
})

const themes = [
  {
    label: '浅色',
    value: 'light'
  },
  {
    label: '深色',
    value: 'dark'
  },
  {
    label: '跟随系统',
    value: 'auto'
  }
]

const defaultPages = [
  {
    label: '工作台',
    value: '/workspace'
  }
  // 网络页面已被移除
]
</script>

<template>
  <section>
    <h3 class="title">个性设置</h3>

    <div class="view-box">
      <div class="view-list">
        <div class="content">
          <div class="name">主题颜色</div>
          <div class="desc">当前主题颜色 ：{{ themeMode }}</div>
        </div>
        <div class="tools">
          <n-radio-group v-model:value="themeMode" name="theme-group">
            <n-space>
              <n-radio v-for="item in themes" :key="item.value" :value="item.value">
                {{ item.label }}
              </n-radio>
            </n-space>
          </n-radio-group>
        </div>
      </div>

      <div class="view-list">
        <div class="content">
          <div class="name">自定义主题</div>
          <div class="desc">
            管理和自定义应用主题样式，当前主题：{{ themeStore.currentTheme?.name || '默认主题' }}
          </div>
        </div>
        <div class="tools">
          <n-button type="primary" text @click="showThemeSelector = true"> 主题管理 </n-button>
        </div>
      </div>

      <div class="view-list">
        <div class="content">
          <div class="name">我的名片</div>
          <div class="desc">当前未设置名片背景</div>
        </div>
        <div class="tools">
          <n-button type="primary" text> 修改 </n-button>
        </div>
      </div>

      <div class="view-list">
        <div class="content">
          <div class="name">聊天背景</div>
          <div class="desc">当前未设置聊天背景图</div>
        </div>
        <div class="tools">
          <n-button type="primary" text> 修改 </n-button>
        </div>
      </div>

      <div class="view-list">
        <div class="content">
          <div class="name">默认页面</div>
          <div class="desc">设置应用启动后默认进入的页面</div>
        </div>
        <div class="tools">
          <n-select v-model:value="defaultPage" :options="defaultPages" style="width: 120px" />
        </div>
      </div>
    </div>

    <!-- 主题选择器模态框 -->
    <ThemeSelector v-model:show="showThemeSelector" />
  </section>
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

.view-box {
  .flex-column();
  gap: var(--spacing-lg);
}

.view-list {
  // .flex-row();
  align-items: center;
  justify-content: space-between;
  background: var(--color-bg-content);
  border: 1px solid var(--color-border-light);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-xl);
  transition: all var(--transition-base);
  .card-shadow();

  &:hover {
    border-color: var(--color-primary-light);
    .card-shadow-hover();
    transform: translateY(-2px);
  }

  .content {
    flex: 1;

    .name {
      font-size: var(--font-size-md);
      font-weight: var(--font-weight-semibold);
      color: var(--color-text-primary);
      margin-bottom: var(--spacing-xs);
      line-height: var(--line-height-tight);
    }

    .desc {
      font-size: var(--font-size-sm);
      color: var(--color-text-secondary);
      line-height: var(--line-height-normal);
    }
  }

  .tools {
    flex-shrink: 0;
    margin-top: var(--spacing-sm);
    // margin-left: var(--spacing-lg);

    :deep(.n-radio-group) {
      .n-radio {
        margin-right: var(--spacing-sm);

        .n-radio__label {
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-medium);
          color: var(--color-text-primary);
        }

        .n-radio__dot {
          border-color: var(--color-border-medium);

          &::after {
            background: var(--color-primary);
          }
        }

        &.n-radio--checked {
          .n-radio__dot {
            border-color: var(--color-primary);
          }
        }

        &:hover {
          .n-radio__dot {
            border-color: var(--color-primary-light);
          }
        }
      }
    }

    :deep(.n-button) {
      &.n-button--text-type {
        color: var(--color-primary);
        font-size: var(--font-size-sm);
        font-weight: var(--font-weight-medium);
        padding: var(--spacing-sm) var(--spacing-md);
        border-radius: var(--border-radius-md);
        transition: all var(--transition-base);

        &:hover {
          background: var(--color-primary-light);
          color: var(--color-primary-hover);
          transform: translateY(-1px);
        }
      }
    }

    :deep(.n-select) {
      .n-base-selection {
        border-radius: var(--border-radius-md);
        border: 1px solid var(--color-border-light);
        transition: all var(--transition-base);

        &:hover {
          border-color: var(--color-primary-light);
        }

        &.n-base-selection--focus {
          border-color: var(--color-primary);
          .card-shadow();
        }

        .n-base-selection-label {
          font-size: var(--font-size-sm);
          color: var(--color-text-primary);
        }
      }
    }
  }
}

// 响应式设计
.title {
  .font-responsive(var(--font-size-lg), var(--font-size-xl));
}

.view-box {
  .spacing-responsive(var(--spacing-lg), var(--spacing-xl));
}

.view-list {
  .container();
  .spacing-responsive(var(--spacing-xl), var(--spacing-2xl));
}

// 平板端优化 (768px - 1023px)
.tablet-only() {
  .view-list {
    .flex-column();
    align-items: flex-start;
    gap: var(--spacing-lg);
    padding: var(--spacing-lg);

    .content {
      width: 100%;
      margin-bottom: var(--spacing-sm);

      .name {
        font-size: var(--font-size-sm);
        margin-bottom: var(--spacing-xs);
      }

      .desc {
        font-size: var(--font-size-xs);
      }
    }

    .tools {
      margin-left: 0;
      width: 100%;

      :deep(.n-radio-group) {
        .flex-row();
        flex-wrap: wrap;
        gap: var(--spacing-md);

        .n-radio {
          margin-right: 0;

          .n-radio__label {
            font-size: var(--font-size-xs);
          }
        }
      }

      :deep(.n-select) {
        width: 100% !important;
        max-width: 200px;
      }

      :deep(.n-button) {
        &.n-button--text-type {
          font-size: var(--font-size-xs);
          padding: var(--spacing-xs) var(--spacing-sm);
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

  .view-list {
    background: var(--color-bg-content-dark);
    border-color: var(--color-border-dark);

    &:hover {
      border-color: var(--color-primary-dark-light);
    }

    .content {
      .name {
        color: var(--color-text-primary-dark);
      }

      .desc {
        color: var(--color-text-secondary-dark);
      }
    }

    .tools {
      :deep(.n-radio-group) {
        .n-radio {
          .n-radio__label {
            color: var(--color-text-primary-dark);
          }

          .n-radio__dot {
            border-color: var(--color-border-medium-dark);

            &::after {
              background: var(--color-primary-dark);
            }
          }

          &.n-radio--checked {
            .n-radio__dot {
              border-color: var(--color-primary-dark);
            }
          }

          &:hover {
            .n-radio__dot {
              border-color: var(--color-primary-dark-light);
            }
          }
        }
      }

      :deep(.n-button) {
        &.n-button--text-type {
          color: var(--color-primary-dark);

          &:hover {
            background: var(--color-primary-dark-light);
            color: var(--color-primary-dark-hover);
          }
        }
      }

      :deep(.n-select) {
        .n-base-selection {
          border-color: var(--color-border-dark);
          background: var(--color-bg-input-dark);

          &:hover {
            border-color: var(--color-primary-dark-light);
          }

          &.n-base-selection--focus {
            border-color: var(--color-primary-dark);
          }

          .n-base-selection-label {
            color: var(--color-text-primary-dark);
          }
        }
      }
    }
  }
}
</style>
