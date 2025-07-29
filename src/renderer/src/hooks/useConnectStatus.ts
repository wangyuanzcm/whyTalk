import { watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { useSettingsStore } from '@/store'
import { isLogin } from '@/utils/auth.ts'
import ws from '@/connect'

export const useConnectStatus = () => {
  const settingsStore = useSettingsStore()
  const router = useRouter()

  watchEffect(() => {
    if (settingsStore.isLeaveWeb) {
      return
    }

    const pathname = router.currentRoute.value.path

    const paths = ['/auth/login', '/auth/register', '/auth/forget']

    if (!paths.includes(pathname) && isLogin()) {
      !ws.isConnect() && ws.connect()
    }
  })

  return {}
}
