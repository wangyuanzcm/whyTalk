<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ServAuthLogin } from '@/api/auth'
import { setToken } from '@/utils/auth.ts'

import { playMusic } from '@/utils/talk'
import { useInject } from '@/hooks'
import ws from '@/connect'
import { useUserStore } from '@/store'

const { message } = useInject()
const userStore = useUserStore()
const route = useRoute()
const router = useRouter()
const formRef = ref()
const rules = {
  username: {
    required: true,
    trigger: ['blur', 'input'],
    message: '账号不能为空'
  },
  password: {
    required: true,
    trigger: ['blur', 'input'],
    message: '密码不能为空'
  }
}

const loading = ref(false)

const model = reactive({
  username: '',
  password: ''
})

const onLogin = async () => {
  const { code, data } = await ServAuthLogin(
    {
      mobile: model.username,
      password: model.password, // 暂时禁用 RSA 加密
      platform: 'web'
    },
    {
      loading
    }
  )

  if (code !== 200 || !data) return

  setToken(data.access_token, data.expires_in)
  ws.connect()
  message.success('登录成功，即将进入系统')
  userStore.loadSetting()

  const redirect: any = route.query?.redirect || '/workspace'
  router.push(redirect)
}

const onValidate = (e: Event) => {
  e.preventDefault()

  // 谷歌浏览器提示音需要用户主动交互才能播放，登录入口主动交互一次，后面消息提示音就能正常播放了
  playMusic(true)

  formRef.value.validate((errors: any) => {
    !errors && onLogin()
  })
}

const onClickAccount = (type: number) => {
  // 调试：检查 window.electron 是否可用
  console.log('onClickAccount called, type:', type)
  console.log('window.electron:', window.electron)
  console.log('window.electron?.ipcRenderer:', window.electron?.ipcRenderer)

  if (!window.electron || !window.electron.ipcRenderer) {
    message.error('IPC API 不可用，请检查 Electron 预加载脚本')
    return
  }

  switch (type) {
    case 0:
      // 实际存在的测试用户
      model.username = '13800138000'
      model.password = '123456'
      break
    case 1:
      model.username = '13800138001'
      model.password = '123456'
      break
    case 2:
      model.username = '13800138002'
      model.password = '123456'
      break
    case 3:
      model.username = '13800138003'
      model.password = '123456'
      break
    case 4:
      model.username = '13800138004'
      model.password = '123456'
      break
    default:
      model.username = '13800138000'
      model.password = '123456'
  }

  onLogin()
}
</script>

<template>
  <section class="el-container is-vertical login-box login">
    <header class="el-header box-header">快捷登录</header>

    <main class="el-main" style="padding: 3px">
      <n-form ref="formRef" size="large" :model="model" :rules="rules">
        <n-form-item path="username" :show-label="false">
          <n-input
            v-model:value="model.username"
            placeholder="请输入手机号"
            :maxlength="11"
            @keydown.enter="onValidate"
          />
        </n-form-item>

        <n-form-item path="password" :show-label="false">
          <n-input
            v-model:value="model.password"
            placeholder="请输入密码"
            type="password"
            show-password-on="click"
            @keydown.enter="onValidate"
          />
        </n-form-item>

        <n-button
          type="primary"
          size="large"
          block
          text-color="#ffffff"
          class="mt-t20"
          :loading="loading"
          @click="onValidate"
        >
          立即登录
        </n-button>
      </n-form>

      <div class="helper">
        <n-button text color="#409eff" @click="router.push('/auth/forget')"> 找回密码 </n-button>
        <n-button text color="#409eff" @click="router.push('/auth/register')">
          还没有账号？立即注册
        </n-button>
      </div>
    </main>

    <footer class="el-footer" style="height: 80px">
      <n-divider style="height: 30px; margin: 0">
        <span style="color: #ccc; font-weight: 300"> 测试账号</span>
      </n-divider>
      <div class="preview-account">
        <p style="color: #67c23a; font-weight: bold" @click="onClickAccount(0)">
          ✓ 测试用户: 138****8000 / 密码: 123456 (可用)
        </p>
        <p style="color: #67c23a; font-weight: bold" @click="onClickAccount(1)">
          ✓ Alice: 138****8001 / 密码: 123456 (可用)
        </p>
        <!-- <p style="color: #67c23a; font-weight: bold" @click="onClickAccount(2)">
          ✓ Bob: 138****8002 / 密码: 123456 (可用)
        </p>
        <p style="color: #67c23a; font-weight: bold" @click="onClickAccount(3)">
          ✓ Charlie: 138****8003 / 密码: 123456 (可用)
        </p>
        <p style="color: #67c23a; font-weight: bold" @click="onClickAccount(4)">
          ✓ Diana: 138****8004 / 密码: 123456 (可用)
        </p> -->
      </div>
    </footer>
  </section>
</template>

<style lang="less" scoped>
@import '@/assets/css/login.less';
</style>
