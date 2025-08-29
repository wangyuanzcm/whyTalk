import { defineStore } from 'pinia'
import { ServeUserSetting } from '@/api/user'
import * as auth from '@/utils/auth.ts'
import { storage } from '@/utils'
import router from '@/router'

interface IUserStoreState {
  uid: number
  nickname: string
  mobile: string
  email: string
  gender: number
  motto: string
  avatar: string
  online: boolean
  isQiye: boolean
  isContactApply: boolean
  isGroupApply: boolean
}

export const useUserStore = defineStore('user', {
  persist: true,
  state: (): IUserStoreState => {
    return {
      uid: 0, // 用户ID
      mobile: '',
      email: '',
      nickname: '', // 用户昵称
      gender: 0, // 性别
      motto: '', // 个性签名
      avatar: '',
      online: false, // 在线状态
      isQiye: false,
      isContactApply: false,
      isGroupApply: false
    }
  },
  getters: {},
  actions: {
    // 设置用户登录状态
    updateSocketStatus(status: boolean) {
      this.online = status
    },

    /**
     * 处理用户退出登录
     */
    logoutLogin() {
      this.$reset()
      storage.remove('user_info')
      auth.deleteToken()
      // 跳转到登录页面而不是刷新页面
      router.push('/auth/login')
    },

    loadSetting() {
      this.loadUserSetting()
      this.loadFriendApplyNum()
      this.loadGroupApplyUnread()
    },
    async loadUserSetting() {
      const { code, data } = await ServeUserSetting()
      if (code != 200 || !data) return

      this.nickname = data.user_info?.nickname || ''
      this.uid = data.user_info?.uid || 0
      this.avatar = data.user_info?.avatar || ''
      this.gender = data.user_info?.gender || 0
      this.mobile = data.user_info?.mobile || ''
      this.email = data.user_info?.email || ''
      this.motto = data.user_info?.motto || ''
      this.isQiye = data.user_info?.is_qiye || false

      storage.set('user_info', data)
    },
    // 联系人申请和群组申请功能已迁移到插件中
    async loadFriendApplyNum() {
      // TODO: 通过插件间通信获取联系人申请数量
      this.isContactApply = false
    },
    async loadGroupApplyUnread() {
      // TODO: 通过插件间通信获取群组申请数量
      this.isGroupApply = false
    }
  }
})
