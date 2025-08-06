<script lang="ts" setup>
import { useUserStore, useMenuStore, useSettingsStore } from '@/store'
import AccountCard from './AccountCard.vue'
import P2PStatusIndicator from '@/components/P2PStatusIndicator.vue'

const userStore = useUserStore()
const router = useRouter()
const menuStore = useMenuStore()
const settingsStore = useSettingsStore()
// talkStore 已迁移到插件中

const color = computed(() => {
  return settingsStore.currentThemeMode == 'dark' ? '#ffffff' : '#333'
})

// 动态菜单项，从菜单store获取
const menus = computed(() => {
  // 为核心菜单项添加hotspot逻辑
  return menuStore.allMenuItems.map((item) => {
    const menuItem = { ...item }

    // 为特定菜单项添加hotspot逻辑
    if (item.id === 'message') {
      // TODO: 通过插件间通信获取未读消息数量
      menuItem.hotspot = computed(() => false)
    } else if (item.id === 'contact') {
      menuItem.hotspot = computed(() => userStore.isContactApply || userStore.isGroupApply)
    }

    return menuItem
  })
})

const onLogout = () => {
  userStore.logoutLogin()
}

const onClickMenu = (menu) => {
  if (menu.external) {
    window.open(menu.link)
  } else {
    router.push(menu.link)
  }
}

const isActive = (menu) => {
  return router.currentRoute.value.path.indexOf(menu.link) >= 0
}

// 初始化菜单配置
onMounted(() => {
  menuStore.loadMenuConfig()
})
</script>

<template>
  <section class="menu">
    <header class="menu-header" :url="router.currentRoute.value.path">
      <!-- 头像和P2P状态组合 -->
      <div class="avatar-container">
        <n-popover
          placement="right"
          trigger="click"
          :raw="true"
          style="border-radius: 8px; overflow: hidden"
        >
          <template #trigger>
            <im-avatar
              class="logo"
              :size="35"
              :src="userStore.avatar"
              :username="userStore.nickname"
            />
          </template>
          <AccountCard />
        </n-popover>

        <!-- P2P状态圆点 -->
        <div class="p2p-status-dot">
          <P2PStatusIndicator />
        </div>
      </div>

      <span class="online-status" :class="{ online: userStore.online }">
        {{ userStore.online ? '在线' : '连接中...' }}
      </span>
    </header>

    <main class="menu-main">
      <div
        v-for="nav in menus"
        :key="nav.link"
        :class="{
          'menu-items': true,
          active: isActive(nav)
        }"
        @click="onClickMenu(nav)"
      >
        <!-- 消息提示 -->
        <div v-if="nav.hotspot" class="hotspot" />

        <p>
          <component
            :is="nav.icon"
            :theme="isActive(nav) ? 'filled' : 'outline'"
            :fill="isActive(nav) ? '#1890ff' : color"
            :stroke-width="2"
            :size="22"
          />
        </p>

        <span>{{ nav.title }}</span>
      </div>
    </main>

    <footer class="menu-footer">
      <div class="pointer" @click="onLogout">退出</div>
    </footer>
  </section>
</template>

<style lang="less" scoped>
.menu {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  .menu-header {
    height: 120px;
    width: 100%;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding-top: 18px;
    box-sizing: border-box;
    cursor: pointer;

    .avatar-container {
      position: relative;
      margin-left: 16px;

      .logo {
        cursor: pointer;
      }

      .p2p-status-dot {
        position: absolute;
        top: 2px;
        right: 2px;
        z-index: 10;
      }
    }

    .online-status {
      margin-top: 5px;
      font-size: 13px;
      font-weight: 300;
      color: rgb(185, 181, 181);

      &.online {
        color: #65c468;
      }
    }
  }

  .menu-main {
    flex: auto;
    width: 100%;
    overflow: hidden;
  }

  .menu-footer {
    height: 90px;
    width: 100%;

    div {
      height: 38px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}

.menu-items {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  user-select: none;
  cursor: pointer;
  border-radius: 3px;
  font-size: 12px;
  width: 54px;
  height: 54px;
  margin: 8px auto;
  border-radius: 10px;

  .hotspot {
    width: 5px;
    height: 5px;
    --hotspot: #ff1e1e;
    background: var(--hotspot);
    display: inline-block;
    border-radius: 5px;
    position: absolute;
    right: 5px;
    top: 9px;
    animation: notifymove 3s infinite;
    animation-direction: alternate;
    -webkit-animation: notifymove 3s infinite;
  }
}

@keyframes notifymove {
  0% {
    background: var(--hotspot);
  }

  25% {
    background: transparent;
  }

  50% {
    background: var(--hotspot);
  }

  75% {
    background: transparent;
  }

  100% {
    background: var(--hotspot);
  }
}

@-webkit-keyframes notifymove {
  0% {
    background: #ff1e1e;
  }

  25% {
    background: transparent;
  }

  50% {
    background: #ff1e1e;
  }

  75% {
    background: transparent;
  }

  100% {
    background: #ff1e1e;
  }
}
</style>
