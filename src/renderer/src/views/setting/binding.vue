<script lang="ts" setup></script>

<template>
  <section>
    <h3 class="title">绑定设置</h3>

    <div class="view-box">
      <div class="view-list">
        <div class="image">
          <img src="~@/assets/image/github-avatar.jpg" width="50" height="50" />
        </div>
        <div class="content">
          <div class="name">绑定 github</div>
          <div class="desc">当前未绑定github账号</div>
        </div>
        <div class="tools">
          <n-button type="primary" text> 设置 </n-button>
        </div>
      </div>

      <div class="view-list">
        <div class="image">
          <img src="~@/assets/image/gitee-avatar.jpg" width="50" height="50" />
        </div>
        <div class="content">
          <div class="name">绑定 gitee</div>
          <div class="desc">当前未绑定gitee账号</div>
        </div>
        <div class="tools">
          <n-button type="primary" text> 设置 </n-button>
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
}

.view-box {
  .flex-column();
  gap: var(--spacing-lg);

  .view-list {
    .flex-row();
    align-items: center;
    padding: var(--spacing-lg);
    background: var(--color-bg-secondary);
    border-radius: var(--border-radius-lg);
    border: 1px solid var(--color-border-light);
    transition: all var(--transition-base);
    .card-shadow();

    &:hover {
      border-color: var(--color-primary-light);
      .card-shadow-hover();
      transform: translateY(-2px);
    }

    .image {
      .flex-center();
      width: 80px;
      margin-right: var(--spacing-lg);
      flex-shrink: 0;

      img {
        width: 60px;
        height: 60px;
        border-radius: var(--border-radius-full);
        overflow: hidden;
        border: 3px solid var(--color-border-light);
        transition: all var(--transition-base);
        .card-shadow();

        &:hover {
          border-color: var(--color-primary-light);
          .card-shadow-hover();
          transform: scale(1.05);
        }
      }
    }

    .content {
      flex: 1;
      margin-right: var(--spacing-lg);

      .name {
        font-size: var(--font-size-lg);
        font-weight: var(--font-weight-semibold);
        color: var(--color-text-primary);
        margin-bottom: var(--spacing-xs);
        line-height: var(--line-height-tight);
      }

      .desc {
        font-size: var(--font-size-sm);
        color: var(--color-text-secondary);
        line-height: var(--line-height-relaxed);
      }
    }

    .tools {
      flex-shrink: 0;

      :deep(.n-button) {
        border-radius: var(--border-radius-md);
        font-weight: var(--font-weight-medium);
        padding: var(--spacing-sm) var(--spacing-lg);
        transition: all var(--transition-base);

        &.n-button--primary-type {
          background: var(--color-primary);
          color: var(--color-white);

          &:hover {
            background: var(--color-primary-hover);
            transform: translateY(-1px);
            .card-shadow();
          }
        }

        &.n-button--text-type {
          color: var(--color-primary);

          &:hover {
            background: var(--color-primary-light);
            color: var(--color-primary-hover);
          }
        }
      }
    }
  }
}

// 响应式设计
section {
  .container();
  .spacing-responsive(var(--spacing-lg), var(--spacing-xl));
}

// 大屏幕优化
.desktop-up(@breakpoint-xl) {
  section {
    padding: var(--spacing-xl);
  }

  .title {
    font-size: var(--font-size-2xl);
    margin-bottom: var(--spacing-2xl);
  }

  .view-box {
    gap: var(--spacing-xl);

    .view-list {
      padding: var(--spacing-xl);

      .image {
        width: 100px;

        img {
          width: 80px;
          height: 80px;
        }
      }

      .content {
        .name {
          font-size: var(--font-size-xl);
        }

        .desc {
          font-size: var(--font-size-md);
        }
      }

      .tools {
        :deep(.n-button) {
          padding: var(--spacing-md) var(--spacing-xl);
          font-size: var(--font-size-md);
        }
      }
    }
  }
}

// 桌面端优化
.desktop-only() {
  section {
    padding: var(--spacing-lg);
  }

  .title {
    font-size: var(--font-size-xl);
  }

  .view-box {
    gap: var(--spacing-lg);

    .view-list {
      padding: var(--spacing-lg);
    }
  }
}

// 平板端优化
.tablet-only() {
  section {
    padding: var(--spacing-md);
  }

  .title {
    font-size: var(--font-size-lg);
  }

  .view-box {
    gap: var(--spacing-md);

    .view-list {
      .flex-column();
      align-items: stretch;
      text-align: center;
      gap: var(--spacing-md);
      padding: var(--spacing-lg);

      .image {
        width: 100%;
        margin-right: 0;
        justify-content: center;
      }

      .content {
        margin-right: 0;
        text-align: center;

        .name {
          font-size: var(--font-size-md);
        }
      }

      .tools {
        align-self: center;

        :deep(.n-button) {
          width: 120px;
        }
      }
    }
  }
}

// 移动端优化
.mobile-only() {
  section {
    padding: var(--spacing-sm);
  }

  .title {
    font-size: var(--font-size-md);
    margin-bottom: var(--spacing-lg);
    text-align: center;
  }

  .view-box {
    gap: var(--spacing-sm);

    .view-list {
      .flex-column();
      align-items: stretch;
      text-align: center;
      gap: var(--spacing-sm);
      padding: var(--spacing-md);

      .image {
        width: 100%;
        margin-right: 0;
        justify-content: center;

        img {
          width: 50px;
          height: 50px;
        }
      }

      .content {
        margin-right: 0;
        text-align: center;

        .name {
          font-size: var(--font-size-sm);
        }

        .desc {
          font-size: var(--font-size-xs);
        }
      }

      .tools {
        align-self: center;

        :deep(.n-button) {
          width: 100px;
          padding: var(--spacing-xs) var(--spacing-md);
          font-size: var(--font-size-xs);
        }
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
    margin-bottom: var(--spacing-md);
    text-align: center;
  }

  .view-box {
    gap: var(--spacing-xs);

    .view-list {
      padding: var(--spacing-sm);
      gap: var(--spacing-xs);

      .image {
        img {
          width: 40px;
          height: 40px;
        }
      }

      .content {
        .name {
          font-size: var(--font-size-xs);
        }

        .desc {
          font-size: var(--font-size-2xs);
        }
      }

      .tools {
        :deep(.n-button) {
          width: 80px;
          padding: var(--spacing-2xs) var(--spacing-sm);
          font-size: var(--font-size-2xs);
        }
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
  }

  .view-box {
    .view-list {
      background: var(--color-bg-secondary-dark);
      border-color: var(--color-border-dark);

      &:hover {
        border-color: var(--color-primary-dark-light);
      }

      .image {
        img {
          border-color: var(--color-border-dark);

          &:hover {
            border-color: var(--color-primary-dark-light);
          }
        }
      }

      .content {
        .name {
          color: var(--color-text-primary-dark);
        }

        .desc {
          color: var(--color-text-secondary-dark);
        }
      }
    }
  }
}
</style>
