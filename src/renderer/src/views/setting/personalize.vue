<script lang="ts" setup>
import { useSettingsStore } from '@/store'

const settingsStore = useSettingsStore()

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
  },
  {
    label: '消息',
    value: '/message'
  },
  {
    label: '通讯录',
    value: '/contact'
  },
  {
    label: '笔记',
    value: '/note'
  },
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
  </section>
</template>

<style lang="less" scoped>
@import '@/assets/css/settting.less';
</style>
