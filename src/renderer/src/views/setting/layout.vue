<script lang="ts" setup>
import SubViewLayout from '@/layout/SubViewLayout.vue'
import { Tool, Protect, Remind, LinkThree, User, Plug, SettingTwo } from '@icon-park/vue-next'

const menus = [
  {
    name: '个人中心',
    path: '/settings/detail',
    icon: User
  },
  {
    name: '安全设置',
    path: '/settings/security',
    icon: Protect
  },
  {
    name: '个性设置',
    path: '/settings/personalize',
    icon: Tool
  },
  {
    name: '绑定设置',
    path: '/settings/binding',
    icon: LinkThree
  },
  {
    name: '通知设置',
    path: '/settings/notification',
    icon: Remind
  },
  {
    name: '插件管理',
    path: '/settings/plugin',
    icon: Plug
  },
  {
    name: '菜单配置',
    path: '/settings/menu',
    icon: SettingTwo
  }
]
</script>

<template>
  <SubViewLayout title="我的设置" :menus="menus" />
</template>
