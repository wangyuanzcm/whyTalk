import { defineStore } from 'pinia'
import { storage } from '@/utils'
import { markRaw } from 'vue'
import {
  SettingTwo,
  Message,
  People,
  BookmarkOne,
  Application,
  FileText,
  CheckOne,
  TableFile
} from '@icon-park/vue-next'

// 菜单项接口
export interface MenuItem {
  id: string
  link: string
  icon: unknown
  title: string
  hotspot?: unknown
  external?: boolean
  core?: boolean // 是否为核心菜单项
  pluginId?: string // 关联的插件ID
}

// 菜单配置接口
export interface MenuConfig {
  enabledPlugins: string[] // 启用的插件ID列表
  pluginOrder: string[] // 插件在菜单中的顺序
  coreMenuOrder: string[] // 核心菜单项的顺序
}

export const useMenuStore = defineStore('menu', {
  state: () => {
    return {
      // 核心菜单项（不可移除）
      coreMenuItems: [
        {
          id: 'workspace',
          link: '/workspace',
          icon: markRaw(Application),
          title: '工作台',
          core: true
        },
        // P2P功能已被移除
        {
          id: 'settings',
          link: '/settings',
          icon: markRaw(SettingTwo),
          title: '设置',
          core: true
        }
      ] as MenuItem[],

      // 插件菜单项
      pluginMenuItems: [
        {
          id: 'message',
          link: '/plugin/frontend_message-plugin_1.0.0',
          icon: markRaw(Message),
          title: '消息',
          pluginId: 'frontend_message-plugin_1.0.0'
        },
        {
          id: 'contact',
          link: '/plugin/frontend_contact-plugin_1.0.0',
          icon: markRaw(People),
          title: '通讯录',
          pluginId: 'frontend_contact-plugin_1.0.0'
        },
        {
          id: 'note',
          link: '/plugin/frontend_note-plugin_1.0.0',
          icon: markRaw(BookmarkOne),
          title: '笔记',
          pluginId: 'frontend_note-plugin_1.0.0'
        }
      ] as MenuItem[],

      // 菜单配置
      menuConfig: {
        enabledPlugins: ['frontend_message-plugin_1.0.0', 'frontend_contact-plugin_1.0.0'], // 默认启用消息和联系人插件，笔记插件默认不启用
        pluginOrder: [
          'frontend_message-plugin_1.0.0',
          'frontend_contact-plugin_1.0.0',
          'frontend_note-plugin_1.0.0'
        ],
        coreMenuOrder: ['workspace', 'settings'] // 核心菜单项的默认顺序（P2P已移除）
      } as MenuConfig
    }
  },

  getters: {
    // 获取所有菜单项（核心 + 启用的插件）
    allMenuItems: (state) => {
      // 按配置的顺序排列核心菜单项
      const orderedCoreItems = state.menuConfig.coreMenuOrder
        .map((coreId) => state.coreMenuItems.find((item) => item.id === coreId))
        .filter(Boolean) as MenuItem[]

      // 获取所有启用的插件菜单项（包括动态添加的）
      const enabledPluginItems = state.pluginMenuItems.filter((item) =>
        state.menuConfig.enabledPlugins.includes(item.pluginId || '')
      )

      // 按配置的顺序排列插件菜单项
      const orderedPluginItems = state.menuConfig.pluginOrder
        .map((pluginId) => enabledPluginItems.find((item) => item.pluginId === pluginId))
        .filter(Boolean) as MenuItem[]

      return [...orderedCoreItems, ...orderedPluginItems]
    },

    // 获取启用的插件菜单项
    enabledPluginMenuItems: (state) => {
      return state.pluginMenuItems.filter((item) =>
        state.menuConfig.enabledPlugins.includes(item.pluginId || '')
      )
    }
  },

  actions: {
    // 加载菜单配置
    loadMenuConfig() {
      const defaultConfig = {
        enabledPlugins: ['frontend_message-plugin_1.0.0', 'frontend_contact-plugin_1.0.0'], // 笔记插件默认不启用
        pluginOrder: ['frontend_message-plugin_1.0.0', 'frontend_contact-plugin_1.0.0', 'frontend_note-plugin_1.0.0'],
        coreMenuOrder: ['workspace', 'settings'] // 核心菜单项的默认顺序（P2P已移除）
      }
      const savedConfig = storage.get('menuConfig', defaultConfig)
      this.menuConfig = savedConfig
    },

    // 保存菜单配置
    saveMenuConfig() {
      storage.set('menuConfig', this.menuConfig, null)
    },

    // 添加插件菜单项
    addPluginMenuItem(item: MenuItem) {
      const existingIndex = this.pluginMenuItems.findIndex((existing) => existing.id === item.id)
      if (existingIndex >= 0) {
        // 更新现有项
        this.pluginMenuItems[existingIndex] = item
      } else {
        // 添加新项
        this.pluginMenuItems.push(item)
      }
    },

    // 动态创建前端插件菜单项
    createPluginMenuItem(pluginId: string, pluginConfig: Record<string, unknown>): MenuItem {
      // 优先使用shortName，然后是menuTitle，最后是name
      const displayTitle = String(
        pluginConfig?.shortName || pluginConfig?.menuTitle || pluginConfig?.name || pluginId
      )

      // 根据插件ID或配置选择合适的图标
      let pluginIcon = Application // 默认图标
      
      // 如果插件配置中有图标信息，优先使用
      if (pluginConfig?.icon) {
        pluginIcon = pluginConfig.icon as any
      } else {
        // 根据插件ID设置特定图标
         switch (pluginId) {
           case 'requirement-management':
             pluginIcon = FileText
             break
           case 'task-manager':
             pluginIcon = CheckOne
             break
           case 'data-analysis':
             pluginIcon = TableFile
             break
           default:
             pluginIcon = Application
         }
      }

      return {
        id: pluginId,
        link: `/plugin/${pluginId}`,
        icon: markRaw(pluginIcon),
        title: displayTitle,
        pluginId: pluginId
      }
    },

    // 同步所有插件到菜单项（支持前端插件和系统插件）
    syncPluginsToMenuItems(plugins: Record<string, unknown>[]) {
      // 获取所有可以显示在菜单中的插件（前端插件和有UI配置的系统插件）
      const menuablePlugins = plugins.filter((plugin) => {
        if (plugin.type === 'frontend') {
          return true
        }
        // 系统插件需要有UI配置才能显示在菜单中
        if (plugin.type === 'system' && (plugin.config as Record<string, unknown>)?.ui) {
          return true
        }
        return false
      })

      // 为每个插件创建菜单项（如果不存在）
      menuablePlugins.forEach((plugin) => {
        const pluginId = String(plugin.id)
        const existingItem = this.pluginMenuItems.find((item) => item.pluginId === pluginId)
        if (!existingItem) {
          const menuItem = this.createPluginMenuItem(pluginId, plugin.config as Record<string, unknown>)
          this.addPluginMenuItem(menuItem)
        }
      })

      // 移除不存在的插件菜单项
      const existingPluginIds = menuablePlugins.map((p) => String(p.id))
      this.pluginMenuItems = this.pluginMenuItems.filter(
        (item) => !item.pluginId || existingPluginIds.includes(item.pluginId)
      )
    },

    // 移除插件菜单项
    removePluginMenuItem(itemId: string) {
      const index = this.pluginMenuItems.findIndex((item) => item.id === itemId)
      if (index >= 0) {
        this.pluginMenuItems.splice(index, 1)
      }

      // 同时从配置中移除
      const pluginId = this.pluginMenuItems.find((item) => item.id === itemId)?.pluginId
      if (pluginId) {
        this.disablePluginInMenu(pluginId)
      }
    },

    // 启用插件在菜单中显示
    enablePluginInMenu(pluginId: string) {
      if (!this.menuConfig.enabledPlugins.includes(pluginId)) {
        this.menuConfig.enabledPlugins.push(pluginId)
        this.menuConfig.pluginOrder.push(pluginId)
        this.saveMenuConfig()
      }
    },

    // 禁用插件在菜单中显示
    disablePluginInMenu(pluginId: string) {
      const enabledIndex = this.menuConfig.enabledPlugins.indexOf(pluginId)
      if (enabledIndex >= 0) {
        this.menuConfig.enabledPlugins.splice(enabledIndex, 1)
      }

      const orderIndex = this.menuConfig.pluginOrder.indexOf(pluginId)
      if (orderIndex >= 0) {
        this.menuConfig.pluginOrder.splice(orderIndex, 1)
      }

      this.saveMenuConfig()
    },

    // 更新插件顺序
    updatePluginOrder(newOrder: string[]) {
      this.menuConfig.pluginOrder = newOrder
      this.saveMenuConfig()
    },

    // 移动插件位置
    movePlugin(pluginId: string, direction: 'up' | 'down') {
      const currentIndex = this.menuConfig.pluginOrder.indexOf(pluginId)
      if (currentIndex === -1) return

      const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1
      if (newIndex < 0 || newIndex >= this.menuConfig.pluginOrder.length) return

      // 交换位置
      const temp = this.menuConfig.pluginOrder[currentIndex]
      this.menuConfig.pluginOrder[currentIndex] = this.menuConfig.pluginOrder[newIndex]
      this.menuConfig.pluginOrder[newIndex] = temp

      this.saveMenuConfig()
    },

    // 移动核心菜单项位置
    moveCoreMenu(menuId: string, direction: 'up' | 'down') {
      const currentIndex = this.menuConfig.coreMenuOrder.indexOf(menuId)
      if (currentIndex === -1) return

      const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1
      if (newIndex < 0 || newIndex >= this.menuConfig.coreMenuOrder.length) return

      // 交换位置
      const temp = this.menuConfig.coreMenuOrder[currentIndex]
      this.menuConfig.coreMenuOrder[currentIndex] = this.menuConfig.coreMenuOrder[newIndex]
      this.menuConfig.coreMenuOrder[newIndex] = temp

      this.saveMenuConfig()
    },

    // 重置菜单配置
    resetMenuConfig() {
      this.menuConfig = {
        enabledPlugins: ['message-plugin', 'contact-plugin'], // 重置为默认启用的插件
        pluginOrder: ['message-plugin', 'contact-plugin', 'note-plugin'],
        coreMenuOrder: ['workspace', 'settings'] // 重置为默认的核心菜单顺序（P2P已移除）
      }
      this.saveMenuConfig()
    },

    // 检查插件是否在菜单中启用
    isPluginEnabledInMenu(pluginId: string): boolean {
      return this.menuConfig.enabledPlugins.includes(pluginId)
    }
  }
})
