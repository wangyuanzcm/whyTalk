<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import {
  NButton,
  NSpace,
  NCard,
  NAlert,
  NList,
  NListItem,
  NThing,
  NIcon,
  NTag,
  NModal,
  NForm,
  NFormItem,
  NInput,
  NText,
  useMessage,
  NDescriptions,
  NDescriptionsItem,
  NImage,
  NAvatar,
  NDivider,
  NPopover
} from 'naive-ui'
import {
  Github,
  Mail,
  Globe,
  Heart,
  Star,
  Code,
  LicenseOne,
  Info,
  Copy,
  LinkThree,
  Team,
  Tool
} from '@/components/icons'
import { useSettingsStore } from '@/store'

const message = useMessage()
const settingsStore = useSettingsStore()

// 应用信息
const appInfo = ref({
  name: 'WhyTalk',
  version: '1.0.0',
  buildNumber: '20240115001',
  buildDate: '2024-01-15',
  description: '基于插件化架构的现代化即时通讯应用',
  author: 'WhyTalk Team',
  license: 'MIT License',
  homepage: 'https://github.com/user/why-talk',
  repository: 'https://github.com/user/why-talk',
  issuesUrl: 'https://github.com/user/why-talk/issues',
  releasesUrl: 'https://github.com/user/why-talk/releases',
  docsUrl: 'https://why-talk.github.io/docs',
  electronVersion: '28.0.0',
  nodeVersion: '18.17.0',
  chromeVersion: '120.0.6099.56'
})

// 开发团队信息
const teamMembers = ref([
  {
    id: '1',
    name: '张三',
    role: '项目负责人',
    avatar: '',
    github: 'https://github.com/zhangsan',
    email: 'zhangsan@example.com',
    description: '负责项目架构设计和核心功能开发'
  },
  {
    id: '2',
    name: '李四',
    role: '前端开发',
    avatar: '',
    github: 'https://github.com/lisi',
    email: 'lisi@example.com',
    description: '负责用户界面设计和前端功能实现'
  },
  {
    id: '3',
    name: '王五',
    role: '后端开发',
    avatar: '',
    github: 'https://github.com/wangwu',
    email: 'wangwu@example.com',
    description: '负责服务端开发和插件系统架构'
  }
])

// 技术栈信息
const techStack = ref([
  {
    category: '前端框架',
    items: [
      { name: 'Vue 3', version: '3.4.0', description: '渐进式JavaScript框架' },
      { name: 'Vite', version: '5.0.0', description: '下一代前端构建工具' },
      { name: 'TypeScript', version: '5.3.0', description: 'JavaScript的超集' },
      { name: 'Naive UI', version: '2.38.0', description: 'Vue 3组件库' }
    ]
  },
  {
    category: '桌面应用',
    items: [
      { name: 'Electron', version: '28.0.0', description: '跨平台桌面应用框架' },
      { name: 'Node.js', version: '18.17.0', description: 'JavaScript运行时' }
    ]
  },
  {
    category: '插件系统',
    items: [
      { name: 'Extism', version: '1.0.0', description: 'WebAssembly插件系统' },
      { name: 'WebAssembly', version: '1.0', description: '高性能的二进制指令格式' }
    ]
  },
  {
    category: '开发工具',
    items: [
      { name: 'ESLint', version: '8.56.0', description: 'JavaScript代码检查工具' },
      { name: 'Prettier', version: '3.1.0', description: '代码格式化工具' },
      { name: 'Husky', version: '8.0.0', description: 'Git钩子工具' }
    ]
  }
])

// 开源协议信息
const licenseInfo = ref({
  name: 'MIT License',
  url: 'https://opensource.org/licenses/MIT',
  description: 'MIT许可证是一个宽松的开源许可证，允许用户自由使用、修改和分发软件。',
  permissions: ['商业使用', '修改', '分发', '私人使用'],
  conditions: ['包含许可证和版权声明'],
  limitations: ['无责任', '无保证']
})

// 致谢信息
const acknowledgments = ref([
  {
    name: 'Vue.js',
    description: '感谢Vue.js团队提供的优秀前端框架',
    url: 'https://vuejs.org'
  },
  {
    name: 'Electron',
    description: '感谢Electron团队让我们能够构建跨平台桌面应用',
    url: 'https://electronjs.org'
  },
  {
    name: 'Naive UI',
    description: '感谢Naive UI提供的精美组件库',
    url: 'https://naiveui.com'
  },
  {
    name: 'Icon Park',
    description: '感谢字节跳动提供的丰富图标库',
    url: 'https://iconpark.oceanengine.com'
  },
  {
    name: 'LX Music',
    description: '感谢LX Music项目提供的设计灵感和参考',
    url: 'https://github.com/lyswhut/lx-music-desktop'
  }
])

// 模态框状态
const showLicenseModal = ref(false)
const showTeamModal = ref(false)
const showTechStackModal = ref(false)
const showAcknowledgmentsModal = ref(false)

// 系统信息
const systemInfo = ref({
  platform: '',
  arch: '',
  osVersion: '',
  totalMemory: '',
  freeMemory: '',
  cpuModel: '',
  cpuCores: 0
})

/**
 * 复制文本到剪贴板
 */
const copyToClipboard = async (text: string, label: string) => {
  try {
    await navigator.clipboard.writeText(text)
    message.success(`${label}已复制到剪贴板`)
  } catch (error) {
    message.error('复制失败')
  }
}

/**
 * 打开外部链接
 */
const openExternalLink = (url: string) => {
  // 这里应该调用主进程的打开URL API
  // window.electronAPI.openExternal(url)
  message.info(`正在打开：${url}`)
}

/**
 * 检查更新
 */
const checkForUpdates = () => {
  message.info('正在检查更新...')
  // 这里应该调用更新检查逻辑
}

/**
 * 打开开发者工具
 */
const openDevTools = () => {
  // 这里应该调用主进程的开发者工具API
  // window.electronAPI.openDevTools()
  message.info('正在打开开发者工具...')
}

/**
 * 重新加载应用
 */
const reloadApp = () => {
  window.location.reload()
}

/**
 * 获取系统信息
 */
const getSystemInfo = async () => {
  try {
    // 这里应该调用主进程的系统信息API
    // const info = await window.electronAPI.getSystemInfo()
    // systemInfo.value = info

    // 模拟系统信息
    systemInfo.value = {
      platform: 'Windows',
      arch: 'x64',
      osVersion: 'Windows 11 22H2',
      totalMemory: '16.0 GB',
      freeMemory: '8.5 GB',
      cpuModel: 'Intel Core i7-12700H',
      cpuCores: 12
    }
  } catch (error) {
    message.error('获取系统信息失败')
  }
}

/**
 * 生成诊断报告
 */
const generateDiagnosticReport = () => {
  const report = {
    timestamp: new Date().toISOString(),
    appInfo: appInfo.value,
    systemInfo: systemInfo.value,
    settings: settingsStore.$state,
    userAgent: navigator.userAgent,
    language: navigator.language,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
  }

  const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `whytalk-diagnostic-${Date.now()}.json`
  a.click()
  URL.revokeObjectURL(url)

  message.success('诊断报告已生成并下载')
}

// 计算属性
const buildInfo = computed(() => {
  return `${appInfo.value.version} (${appInfo.value.buildNumber})`
})

const runtimeInfo = computed(() => {
  return {
    electron: appInfo.value.electronVersion,
    node: appInfo.value.nodeVersion,
    chrome: appInfo.value.chromeVersion
  }
})

onMounted(() => {
  getSystemInfo()
})
</script>

<template>
  <section>
    <h3 class="title">关于 WhyTalk</h3>

    <!-- 应用信息 -->
    <NCard title="应用信息" class="section-card">
      <div class="app-info">
        <div class="app-header">
          <div class="app-icon">
            <NAvatar size="large" src="/icon.png" fallback-src="/icon.png">
              <NIcon size="32"><Info /></NIcon>
            </NAvatar>
          </div>
          <div class="app-details">
            <h2 class="app-name">{{ appInfo.name }}</h2>
            <p class="app-description">{{ appInfo.description }}</p>
            <div class="app-version">
              <NTag type="primary" size="medium">{{ buildInfo }}</NTag>
              <span class="build-date">构建于 {{ appInfo.buildDate }}</span>
            </div>
          </div>
        </div>

        <div class="app-actions">
          <NSpace>
            <NButton type="primary" @click="checkForUpdates">
              <template #icon>
                <NIcon><Star /></NIcon>
              </template>
              检查更新
            </NButton>
            <NButton @click="openExternalLink(appInfo.homepage)">
              <template #icon>
                <NIcon><Globe /></NIcon>
              </template>
              官方网站
            </NButton>
            <NButton @click="openExternalLink(appInfo.repository)">
              <template #icon>
                <NIcon><Github /></NIcon>
              </template>
              GitHub
            </NButton>
          </NSpace>
        </div>
      </div>

      <NDivider />

      <NDescriptions :column="2" label-placement="left">
        <NDescriptionsItem label="版本">
          <div class="info-item">
            <span>{{ appInfo.version }}</span>
            <NButton text @click="copyToClipboard(appInfo.version, '版本号')">
              <template #icon>
                <NIcon><Copy /></NIcon>
              </template>
            </NButton>
          </div>
        </NDescriptionsItem>
        <NDescriptionsItem label="构建号">
          <div class="info-item">
            <span>{{ appInfo.buildNumber }}</span>
            <NButton text @click="copyToClipboard(appInfo.buildNumber, '构建号')">
              <template #icon>
                <NIcon><Copy /></NIcon>
              </template>
            </NButton>
          </div>
        </NDescriptionsItem>
        <NDescriptionsItem label="作者">
          {{ appInfo.author }}
        </NDescriptionsItem>
        <NDescriptionsItem label="许可证">
          <NButton text type="primary" @click="showLicenseModal = true">
            {{ appInfo.license }}
          </NButton>
        </NDescriptionsItem>
        <NDescriptionsItem label="Electron">
          {{ runtimeInfo.electron }}
        </NDescriptionsItem>
        <NDescriptionsItem label="Node.js">
          {{ runtimeInfo.node }}
        </NDescriptionsItem>
        <NDescriptionsItem label="Chrome">
          {{ runtimeInfo.chrome }}
        </NDescriptionsItem>
        <NDescriptionsItem label="平台">
          {{ systemInfo.platform }} {{ systemInfo.arch }}
        </NDescriptionsItem>
      </NDescriptions>
    </NCard>

    <!-- 快速链接 -->
    <NCard title="快速链接" class="section-card">
      <div class="quick-links">
        <div class="link-group">
          <h4>项目相关</h4>
          <div class="links">
            <NButton text @click="openExternalLink(appInfo.repository)">
              <template #icon>
                <NIcon><Github /></NIcon>
              </template>
              源代码仓库
              <template #suffix>
                <NIcon><LinkThree /></NIcon>
              </template>
            </NButton>
            <NButton text @click="openExternalLink(appInfo.issuesUrl)">
              <template #icon>
                <NIcon><Info /></NIcon>
              </template>
              问题反馈
              <template #suffix>
                <NIcon><LinkThree /></NIcon>
              </template>
            </NButton>
            <NButton text @click="openExternalLink(appInfo.releasesUrl)">
              <template #icon>
                <NIcon><Star /></NIcon>
              </template>
              版本发布
              <template #suffix>
                <NIcon><LinkThree /></NIcon>
              </template>
            </NButton>
            <NButton text @click="openExternalLink(appInfo.docsUrl)">
              <template #icon>
                <NIcon><Code /></NIcon>
              </template>
              开发文档
              <template #suffix>
                <NIcon><LinkThree /></NIcon>
              </template>
            </NButton>
          </div>
        </div>

        <div class="link-group">
          <h4>团队信息</h4>
          <div class="links">
            <NButton text @click="showTeamModal = true">
              <template #icon>
                <NIcon><Team /></NIcon>
              </template>
              开发团队
            </NButton>
            <NButton text @click="showAcknowledgmentsModal = true">
              <template #icon>
                <NIcon><Heart /></NIcon>
              </template>
              致谢名单
            </NButton>
            <NButton text @click="showTechStackModal = true">
              <template #icon>
                <NIcon><Code /></NIcon>
              </template>
              技术栈
            </NButton>
          </div>
        </div>

        <div class="link-group">
          <h4>开发工具</h4>
          <div class="links">
            <NButton text @click="openDevTools">
              <template #icon>
                <NIcon><Code /></NIcon>
              </template>
              开发者工具
            </NButton>
            <NButton text @click="reloadApp">
              <template #icon>
                <NIcon><Star /></NIcon>
              </template>
              重新加载
            </NButton>
            <NButton text @click="generateDiagnosticReport">
              <template #icon>
                <NIcon><Info /></NIcon>
              </template>
              诊断报告
            </NButton>
          </div>
        </div>
      </div>
    </NCard>

    <!-- 免责声明 -->
    <NCard title="免责声明" class="section-card">
      <NAlert type="info">
        <div class="disclaimer">
          <p>
            <strong>{{ appInfo.name }}</strong> 是一个开源项目，完全免费使用。
          </p>
          <p>
            本软件按"现状"提供，不提供任何明示或暗示的保证，包括但不限于适销性、特定用途适用性和非侵权性的保证。
          </p>
          <p>
            在任何情况下，作者或版权持有人均不对任何索赔、损害或其他责任负责，无论是在合同诉讼、侵权行为还是其他方面。
          </p>
          <p>使用本软件即表示您同意承担所有风险，并免除开发者的任何责任。</p>
          <p>
            <strong>注意：</strong>本项目没有官方客服和官方QQ群，请通过GitHub Issues进行问题反馈。
          </p>
        </div>
      </NAlert>
    </NCard>

    <!-- 支持项目 -->
    <NCard title="支持项目" class="section-card">
      <div class="support-project">
        <div class="support-text">
          <h4>如果您觉得这个项目对您有帮助，请考虑支持我们：</h4>
          <ul>
            <li>在 GitHub 上给我们一个 ⭐ Star</li>
            <li>分享给您的朋友和同事</li>
            <li>提交 Bug 报告和功能建议</li>
            <li>贡献代码和文档</li>
            <li>请开发者喝杯咖啡 ☕</li>
          </ul>
        </div>

        <div class="support-actions">
          <NSpace>
            <NButton type="primary" @click="openExternalLink(appInfo.repository)">
              <template #icon>
                <NIcon><Star /></NIcon>
              </template>
              Star on GitHub
            </NButton>
            <NButton @click="openExternalLink(appInfo.issuesUrl)">
              <template #icon>
                <NIcon><Info /></NIcon>
              </template>
              反馈问题
            </NButton>
            <NButton>
              <template #icon>
                <NIcon><Tool /></NIcon>
              </template>
              请喝咖啡
            </NButton>
          </NSpace>
        </div>
      </div>
    </NCard>

    <!-- 开源协议模态框 -->
    <NModal v-model:show="showLicenseModal" preset="card" title="开源协议" style="width: 600px">
      <div class="license-content">
        <div class="license-header">
          <h4>{{ licenseInfo.name }}</h4>
          <p>{{ licenseInfo.description }}</p>
        </div>

        <div class="license-details">
          <div class="license-section">
            <h5>✅ 允许</h5>
            <ul>
              <li v-for="permission in licenseInfo.permissions" :key="permission">
                {{ permission }}
              </li>
            </ul>
          </div>

          <div class="license-section">
            <h5>📋 条件</h5>
            <ul>
              <li v-for="condition in licenseInfo.conditions" :key="condition">
                {{ condition }}
              </li>
            </ul>
          </div>

          <div class="license-section">
            <h5>❌ 限制</h5>
            <ul>
              <li v-for="limitation in licenseInfo.limitations" :key="limitation">
                {{ limitation }}
              </li>
            </ul>
          </div>
        </div>

        <div class="license-actions">
          <NSpace>
            <NButton type="primary" @click="openExternalLink(licenseInfo.url)">
              查看完整协议
            </NButton>
            <NButton @click="copyToClipboard(licenseInfo.url, '协议链接')"> 复制链接 </NButton>
          </NSpace>
        </div>
      </div>
    </NModal>

    <!-- 开发团队模态框 -->
    <NModal v-model:show="showTeamModal" preset="card" title="开发团队" style="width: 700px">
      <div class="team-content">
        <div class="team-intro">
          <p>
            WhyTalk 由一个充满激情的开发团队创建和维护，我们致力于打造最好的插件化即时通讯应用。
          </p>
        </div>

        <div class="team-members">
          <div v-for="member in teamMembers" :key="member.id" class="team-member">
            <div class="member-avatar">
              <NAvatar size="large" :src="member.avatar">
                {{ member.name.charAt(0) }}
              </NAvatar>
            </div>
            <div class="member-info">
              <h4>{{ member.name }}</h4>
              <p class="member-role">{{ member.role }}</p>
              <p class="member-description">{{ member.description }}</p>
              <div class="member-links">
                <NButton text size="small" @click="openExternalLink(member.github)">
                  <template #icon>
                    <NIcon><Github /></NIcon>
                  </template>
                  GitHub
                </NButton>
                <NButton text size="small" @click="openExternalLink(`mailto:${member.email}`)">
                  <template #icon>
                    <NIcon><Mail /></NIcon>
                  </template>
                  邮箱
                </NButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NModal>

    <!-- 技术栈模态框 -->
    <NModal v-model:show="showTechStackModal" preset="card" title="技术栈" style="width: 800px">
      <div class="tech-stack-content">
        <div class="tech-intro">
          <p>WhyTalk 使用现代化的技术栈构建，确保应用的性能、稳定性和可扩展性。</p>
        </div>

        <div class="tech-categories">
          <div v-for="category in techStack" :key="category.category" class="tech-category">
            <h4>{{ category.category }}</h4>
            <div class="tech-items">
              <div v-for="item in category.items" :key="item.name" class="tech-item">
                <div class="tech-header">
                  <span class="tech-name">{{ item.name }}</span>
                  <NTag size="small">{{ item.version }}</NTag>
                </div>
                <p class="tech-description">{{ item.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NModal>

    <!-- 致谢名单模态框 -->
    <NModal
      v-model:show="showAcknowledgmentsModal"
      preset="card"
      title="致谢名单"
      style="width: 600px"
    >
      <div class="acknowledgments-content">
        <div class="acknowledgments-intro">
          <p>感谢以下开源项目和社区，没有他们的贡献就没有 WhyTalk 的今天。</p>
        </div>

        <div class="acknowledgments-list">
          <div v-for="ack in acknowledgments" :key="ack.name" class="acknowledgment-item">
            <div class="ack-header">
              <h4>{{ ack.name }}</h4>
              <NButton text size="small" @click="openExternalLink(ack.url)">
                <template #icon>
                  <NIcon><LinkThree /></NIcon>
                </template>
                访问
              </NButton>
            </div>
            <p>{{ ack.description }}</p>
          </div>
        </div>
      </div>
    </NModal>
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

.section-card {
  margin-bottom: var(--spacing-xl);

  &:last-child {
    margin-bottom: 0;
  }
}

// 应用信息样式
.app-info {
  .app-header {
    .flex-row();
    gap: var(--spacing-lg);
    margin-bottom: var(--spacing-lg);

    .app-icon {
      flex-shrink: 0;
    }

    .app-details {
      flex: 1;

      .app-name {
        margin: 0 0 var(--spacing-xs) 0;
        font-size: var(--font-size-xxl);
        font-weight: var(--font-weight-bold);
        color: var(--color-text-primary);
      }

      .app-description {
        margin: 0 0 var(--spacing-sm) 0;
        color: var(--color-text-secondary);
        line-height: var(--line-height-relaxed);
      }

      .app-version {
        .flex-row();
        align-items: center;
        gap: var(--spacing-sm);

        .build-date {
          font-size: var(--font-size-sm);
          color: var(--color-text-secondary);
        }
      }
    }
  }

  .app-actions {
    .flex-row();
    justify-content: center;
  }
}

.info-item {
  .flex-row();
  align-items: center;
  gap: var(--spacing-xs);
}

// 快速链接样式
.quick-links {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-xl);

  .link-group {
    h4 {
      margin: 0 0 var(--spacing-md) 0;
      font-size: var(--font-size-md);
      font-weight: var(--font-weight-semibold);
      color: var(--color-text-primary);
    }

    .links {
      .flex-column();
      gap: var(--spacing-sm);

      .n-button {
        justify-content: flex-start;
        text-align: left;
      }
    }
  }
}

// 免责声明样式
.disclaimer {
  p {
    margin: 0 0 var(--spacing-sm) 0;
    line-height: var(--line-height-relaxed);

    &:last-child {
      margin-bottom: 0;
    }
  }
}

// 支持项目样式
.support-project {
  .flex-column();
  gap: var(--spacing-lg);

  .support-text {
    h4 {
      margin: 0 0 var(--spacing-md) 0;
      font-size: var(--font-size-md);
      color: var(--color-text-primary);
    }

    ul {
      margin: 0;
      padding-left: var(--spacing-lg);

      li {
        margin-bottom: var(--spacing-xs);
        color: var(--color-text-primary);
        line-height: var(--line-height-relaxed);
      }
    }
  }

  .support-actions {
    .flex-row();
    justify-content: center;
  }
}

// 开源协议模态框样式
.license-content {
  .license-header {
    margin-bottom: var(--spacing-lg);

    h4 {
      margin: 0 0 var(--spacing-sm) 0;
      font-size: var(--font-size-lg);
      color: var(--color-text-primary);
    }

    p {
      margin: 0;
      color: var(--color-text-secondary);
      line-height: var(--line-height-relaxed);
    }
  }

  .license-details {
    margin-bottom: var(--spacing-lg);

    .license-section {
      margin-bottom: var(--spacing-md);

      h5 {
        margin: 0 0 var(--spacing-sm) 0;
        font-size: var(--font-size-md);
        color: var(--color-text-primary);
      }

      ul {
        margin: 0;
        padding-left: var(--spacing-lg);

        li {
          margin-bottom: var(--spacing-xs);
          color: var(--color-text-primary);
        }
      }
    }
  }

  .license-actions {
    .flex-row();
    justify-content: center;
  }
}

// 开发团队模态框样式
.team-content {
  .team-intro {
    margin-bottom: var(--spacing-lg);

    p {
      margin: 0;
      color: var(--color-text-secondary);
      line-height: var(--line-height-relaxed);
    }
  }

  .team-members {
    .flex-column();
    gap: var(--spacing-lg);

    .team-member {
      .flex-row();
      gap: var(--spacing-md);
      padding: var(--spacing-md);
      border: 1px solid var(--color-border-light);
      border-radius: var(--border-radius-md);

      .member-avatar {
        flex-shrink: 0;
      }

      .member-info {
        flex: 1;

        h4 {
          margin: 0 0 var(--spacing-xs) 0;
          font-size: var(--font-size-md);
          color: var(--color-text-primary);
        }

        .member-role {
          margin: 0 0 var(--spacing-sm) 0;
          font-size: var(--font-size-sm);
          color: var(--color-primary);
          font-weight: var(--font-weight-medium);
        }

        .member-description {
          margin: 0 0 var(--spacing-sm) 0;
          font-size: var(--font-size-sm);
          color: var(--color-text-secondary);
          line-height: var(--line-height-relaxed);
        }

        .member-links {
          .flex-row();
          gap: var(--spacing-sm);
        }
      }
    }
  }
}

// 技术栈模态框样式
.tech-stack-content {
  .tech-intro {
    margin-bottom: var(--spacing-lg);

    p {
      margin: 0;
      color: var(--color-text-secondary);
      line-height: var(--line-height-relaxed);
    }
  }

  .tech-categories {
    .flex-column();
    gap: var(--spacing-lg);

    .tech-category {
      h4 {
        margin: 0 0 var(--spacing-md) 0;
        font-size: var(--font-size-md);
        color: var(--color-text-primary);
        padding-bottom: var(--spacing-xs);
        border-bottom: 1px solid var(--color-border-light);
      }

      .tech-items {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: var(--spacing-md);

        .tech-item {
          padding: var(--spacing-sm);
          border: 1px solid var(--color-border-light);
          border-radius: var(--border-radius-sm);

          .tech-header {
            .flex-row();
            justify-content: space-between;
            align-items: center;
            margin-bottom: var(--spacing-xs);

            .tech-name {
              font-weight: var(--font-weight-medium);
              color: var(--color-text-primary);
            }
          }

          .tech-description {
            margin: 0;
            font-size: var(--font-size-sm);
            color: var(--color-text-secondary);
            line-height: var(--line-height-relaxed);
          }
        }
      }
    }
  }
}

// 致谢名单模态框样式
.acknowledgments-content {
  .acknowledgments-intro {
    margin-bottom: var(--spacing-lg);

    p {
      margin: 0;
      color: var(--color-text-secondary);
      line-height: var(--line-height-relaxed);
    }
  }

  .acknowledgments-list {
    .flex-column();
    gap: var(--spacing-md);

    .acknowledgment-item {
      padding: var(--spacing-md);
      border: 1px solid var(--color-border-light);
      border-radius: var(--border-radius-md);

      .ack-header {
        .flex-row();
        justify-content: space-between;
        align-items: center;
        margin-bottom: var(--spacing-xs);

        h4 {
          margin: 0;
          font-size: var(--font-size-md);
          color: var(--color-text-primary);
        }
      }

      p {
        margin: 0;
        font-size: var(--font-size-sm);
        color: var(--color-text-secondary);
        line-height: var(--line-height-relaxed);
      }
    }
  }
}

// 响应式设计
.mobile-only() {
  .app-header {
    .flex-column();
    text-align: center;
  }

  .quick-links {
    grid-template-columns: 1fr;
  }

  .support-project {
    text-align: center;
  }

  .team-member {
    .flex-column();
    text-align: center;
  }

  .tech-items {
    grid-template-columns: 1fr !important;
  }
}

// 暗色主题适配
:global([data-theme='dark']) {
  section {
    background: var(--color-bg-content-dark);
  }

  .title {
    color: var(--color-text-primary-dark) !important;
  }

  .app-name {
    color: var(--color-text-primary-dark) !important;
  }

  .app-description {
    color: var(--color-text-secondary-dark) !important;
  }

  .build-date {
    color: var(--color-text-secondary-dark) !important;
  }

  .link-group h4 {
    color: var(--color-text-primary-dark) !important;
  }

  .support-text h4 {
    color: var(--color-text-primary-dark) !important;
  }

  .support-text li {
    color: var(--color-text-primary-dark) !important;
  }

  .license-header h4 {
    color: var(--color-text-primary-dark) !important;
  }

  .license-header p {
    color: var(--color-text-secondary-dark) !important;
  }

  .license-section h5 {
    color: var(--color-text-primary-dark) !important;
  }

  .license-section li {
    color: var(--color-text-primary-dark) !important;
  }

  .team-intro p {
    color: var(--color-text-secondary-dark) !important;
  }

  .team-member {
    border-color: var(--color-border-dark) !important;

    h4 {
      color: var(--color-text-primary-dark) !important;
    }

    .member-role {
      color: var(--color-primary-dark) !important;
    }

    .member-description {
      color: var(--color-text-secondary-dark) !important;
    }
  }

  .tech-intro p {
    color: var(--color-text-secondary-dark) !important;
  }

  .tech-category h4 {
    color: var(--color-text-primary-dark) !important;
    border-color: var(--color-border-dark) !important;
  }

  .tech-item {
    border-color: var(--color-border-dark) !important;

    .tech-name {
      color: var(--color-text-primary-dark) !important;
    }

    .tech-description {
      color: var(--color-text-secondary-dark) !important;
    }
  }

  .acknowledgments-intro p {
    color: var(--color-text-secondary-dark) !important;
  }

  .acknowledgment-item {
    border-color: var(--color-border-dark) !important;

    h4 {
      color: var(--color-text-primary-dark) !important;
    }

    p {
      color: var(--color-text-secondary-dark) !important;
    }
  }
}
</style>
