import { EventEmitter } from 'events'
import {
  ExtensionContributes,
  CommandContribution,
  ViewContribution,
  ConfigurationContribution,
  MenuContribution,
  KeybindingContribution,
  LanguageContribution,
  ThemeContribution,
  Disposable
} from './types'

/**
 * 贡献点管理器
 * 负责管理所有扩展的贡献点，包括命令、视图、配置、菜单等
 */
export class ContributionPointManager extends EventEmitter {
  private static instance: ContributionPointManager

  /** 命令贡献点注册表 */
  private commands = new Map<string, CommandContribution & { extensionId: string }>()

  /** 视图贡献点注册表 */
  private views = new Map<string, ViewContribution & { extensionId: string }>()

  /** 配置贡献点注册表 */
  private configurations = new Map<string, ConfigurationContribution & { extensionId: string }>()

  /** 菜单贡献点注册表 */
  private menus = new Map<string, MenuContribution & { extensionId: string }>()

  /** 键绑定贡献点注册表 */
  private keybindings = new Map<string, KeybindingContribution & { extensionId: string }>()

  /** 语言贡献点注册表 */
  private languages = new Map<string, LanguageContribution & { extensionId: string }>()

  /** 主题贡献点注册表 */
  private themes = new Map<string, ThemeContribution & { extensionId: string }>()

  /** 扩展贡献点映射 */
  private extensionContributions = new Map<string, Set<string>>()

  private constructor() {
    super()
  }

  /**
   * 获取单例实例
   */
  public static getInstance(): ContributionPointManager {
    if (!ContributionPointManager.instance) {
      ContributionPointManager.instance = new ContributionPointManager()
    }
    return ContributionPointManager.instance
  }

  /**
   * 注册扩展的贡献点
   * @param extensionId 扩展ID
   * @param contributes 贡献点配置
   */
  public registerContributions(extensionId: string, contributes: ExtensionContributes): Disposable {
    const contributionIds = new Set<string>()

    try {
      // 注册命令贡献点
      if (contributes.commands) {
        for (const command of contributes.commands) {
          const id = `command:${command.command}`
          this.commands.set(command.command, { ...command, extensionId })
          contributionIds.add(id)
          this.emit('commandRegistered', command.command, command)
        }
      }

      // 注册视图贡献点
      if (contributes.views) {
        for (const [location, views] of Object.entries(contributes.views)) {
          for (const view of views) {
            const id = `view:${view.id}`
            this.views.set(view.id, { ...view, extensionId })
            contributionIds.add(id)
            this.emit('viewRegistered', view.id, view, location)
          }
        }
      }

      // 注册配置贡献点
      if (contributes.configuration) {
        const configs = Array.isArray(contributes.configuration)
          ? contributes.configuration
          : [contributes.configuration]

        for (const config of configs) {
          const id = `config:${extensionId}`
          this.configurations.set(id, { ...config, extensionId })
          contributionIds.add(id)
          this.emit('configurationRegistered', id, config)
        }
      }

      // 注册菜单贡献点
      if (contributes.menus) {
        const id = `menu:${extensionId}`
        const menuWithExtension = Object.assign({}, contributes.menus, { extensionId })
        this.menus.set(id, menuWithExtension)
        contributionIds.add(id)
        this.emit('menuRegistered', id, contributes.menus)
      }

      // 注册键绑定贡献点
      if (contributes.keybindings) {
        for (const keybinding of contributes.keybindings) {
          const id = `keybinding:${keybinding.command}:${keybinding.key}`
          this.keybindings.set(id, { ...keybinding, extensionId })
          contributionIds.add(id)
          this.emit('keybindingRegistered', id, keybinding)
        }
      }

      // 注册语言贡献点
      if (contributes.languages) {
        for (const language of contributes.languages) {
          const id = `language:${language.id}`
          this.languages.set(language.id, { ...language, extensionId })
          contributionIds.add(id)
          this.emit('languageRegistered', language.id, language)
        }
      }

      // 注册主题贡献点
      if (contributes.themes) {
        for (const theme of contributes.themes) {
          const id = `theme:${theme.label}`
          this.themes.set(id, { ...theme, extensionId })
          contributionIds.add(id)
          this.emit('themeRegistered', id, theme)
        }
      }

      // 记录扩展的贡献点
      this.extensionContributions.set(extensionId, contributionIds)

      console.log(
        `[ContributionPointManager] 已注册扩展 ${extensionId} 的 ${contributionIds.size} 个贡献点`
      )

      // 返回清理函数
      return {
        dispose: () => this.unregisterContributions(extensionId)
      }
    } catch (error) {
      console.error(`[ContributionPointManager] 注册扩展 ${extensionId} 贡献点失败:`, error)
      // 清理已注册的贡献点
      this.unregisterContributions(extensionId)
      throw error
    }
  }

  /**
   * 取消注册扩展的贡献点
   * @param extensionId 扩展ID
   */
  public unregisterContributions(extensionId: string): void {
    const contributionIds = this.extensionContributions.get(extensionId)
    if (!contributionIds) {
      return
    }

    // 清理命令贡献点
    for (const [commandId, command] of this.commands.entries()) {
      if (command.extensionId === extensionId) {
        this.commands.delete(commandId)
        this.emit('commandUnregistered', commandId)
      }
    }

    // 清理视图贡献点
    for (const [viewId, view] of this.views.entries()) {
      if (view.extensionId === extensionId) {
        this.views.delete(viewId)
        this.emit('viewUnregistered', viewId)
      }
    }

    // 清理配置贡献点
    for (const [configId, config] of this.configurations.entries()) {
      if (config.extensionId === extensionId) {
        this.configurations.delete(configId)
        this.emit('configurationUnregistered', configId)
      }
    }

    // 清理菜单贡献点
    for (const [menuId, menu] of this.menus.entries()) {
      if (menu.extensionId === extensionId) {
        this.menus.delete(menuId)
        this.emit('menuUnregistered', menuId)
      }
    }

    // 清理键绑定贡献点
    for (const [keybindingId, keybinding] of this.keybindings.entries()) {
      if (keybinding.extensionId === extensionId) {
        this.keybindings.delete(keybindingId)
        this.emit('keybindingUnregistered', keybindingId)
      }
    }

    // 清理语言贡献点
    for (const [languageId, language] of this.languages.entries()) {
      if (language.extensionId === extensionId) {
        this.languages.delete(languageId)
        this.emit('languageUnregistered', languageId)
      }
    }

    // 清理主题贡献点
    for (const [themeId, theme] of this.themes.entries()) {
      if (theme.extensionId === extensionId) {
        this.themes.delete(themeId)
        this.emit('themeUnregistered', themeId)
      }
    }

    // 清理扩展贡献点记录
    this.extensionContributions.delete(extensionId)

    console.log(`[ContributionPointManager] 已取消注册扩展 ${extensionId} 的贡献点`)
  }

  /**
   * 获取命令贡献点
   * @param commandId 命令ID
   */
  public getCommand(
    commandId: string
  ): (CommandContribution & { extensionId: string }) | undefined {
    return this.commands.get(commandId)
  }

  /**
   * 获取所有命令贡献点
   */
  public getAllCommands(): Map<string, CommandContribution & { extensionId: string }> {
    return new Map(this.commands)
  }

  /**
   * 获取视图贡献点
   * @param viewId 视图ID
   */
  public getView(viewId: string): (ViewContribution & { extensionId: string }) | undefined {
    return this.views.get(viewId)
  }

  /**
   * 获取所有视图贡献点
   */
  public getAllViews(): Map<string, ViewContribution & { extensionId: string }> {
    return new Map(this.views)
  }

  /**
   * 获取配置贡献点
   * @param configId 配置ID
   */
  public getConfiguration(
    configId: string
  ): (ConfigurationContribution & { extensionId: string }) | undefined {
    return this.configurations.get(configId)
  }

  /**
   * 获取所有配置贡献点
   */
  public getAllConfigurations(): Map<string, ConfigurationContribution & { extensionId: string }> {
    return new Map(this.configurations)
  }

  /**
   * 获取扩展的所有贡献点
   * @param extensionId 扩展ID
   */
  public getExtensionContributions(extensionId: string): {
    commands: CommandContribution[]
    views: ViewContribution[]
    configurations: ConfigurationContribution[]
    menus: MenuContribution[]
    keybindings: KeybindingContribution[]
    languages: LanguageContribution[]
    themes: ThemeContribution[]
  } {
    return {
      commands: Array.from(this.commands.values()).filter((c) => c.extensionId === extensionId),
      views: Array.from(this.views.values()).filter((v) => v.extensionId === extensionId),
      configurations: Array.from(this.configurations.values()).filter(
        (c) => c.extensionId === extensionId
      ),
      menus: Array.from(this.menus.values()).filter((m) => m.extensionId === extensionId),
      keybindings: Array.from(this.keybindings.values()).filter(
        (k) => k.extensionId === extensionId
      ),
      languages: Array.from(this.languages.values()).filter((l) => l.extensionId === extensionId),
      themes: Array.from(this.themes.values()).filter((t) => t.extensionId === extensionId)
    }
  }

  /**
   * 检查命令是否存在
   * @param commandId 命令ID
   */
  public hasCommand(commandId: string): boolean {
    return this.commands.has(commandId)
  }

  /**
   * 检查视图是否存在
   * @param viewId 视图ID
   */
  public hasView(viewId: string): boolean {
    return this.views.has(viewId)
  }

  /**
   * 获取扩展注册的贡献点数量
   * @param extensionId 扩展ID
   */
  public getContributionCount(extensionId: string): number {
    const contributionIds = this.extensionContributions.get(extensionId)
    return contributionIds ? contributionIds.size : 0
  }

  /**
   * 获取指定类型的所有贡献点
   * @param type 贡献点类型
   */
  public getContributions(type: string): any[] {
    switch (type) {
      case 'commands':
        return Array.from(this.commands.values())
      case 'views':
        return Array.from(this.views.values())
      case 'configurations':
        return Array.from(this.configurations.values())
      case 'menus':
        return Array.from(this.menus.values())
      case 'keybindings':
        return Array.from(this.keybindings.values())
      case 'languages':
        return Array.from(this.languages.values())
      case 'themes':
        return Array.from(this.themes.values())
      default:
        return []
    }
  }

  /**
   * 清理所有贡献点
   */
  public clear(): void {
    this.commands.clear()
    this.views.clear()
    this.configurations.clear()
    this.menus.clear()
    this.keybindings.clear()
    this.languages.clear()
    this.themes.clear()
    this.extensionContributions.clear()

    this.emit('cleared')
    console.log('[ContributionPointManager] 已清理所有贡献点')
  }

  /**
   * 获取统计信息
   */
  public getStats(): {
    commands: number
    views: number
    configurations: number
    menus: number
    keybindings: number
    languages: number
    themes: number
    extensions: number
  } {
    return {
      commands: this.commands.size,
      views: this.views.size,
      configurations: this.configurations.size,
      menus: this.menus.size,
      keybindings: this.keybindings.size,
      languages: this.languages.size,
      themes: this.themes.size,
      extensions: this.extensionContributions.size
    }
  }
}
