import { EventEmitter } from 'events'
import { Disposable } from './types'

/**
 * 激活事件类型
 */
export enum ActivationEventType {
  /** 启动时激活 */
  ON_START_UP = 'onStartupFinished',
  /** 命令激活 */
  ON_COMMAND = 'onCommand',
  /** 语言激活 */
  ON_LANGUAGE = 'onLanguage',
  /** 文件系统激活 */
  ON_FILE_SYSTEM = 'onFileSystem',
  /** 调试激活 */
  ON_DEBUG = 'onDebug',
  /** 任务激活 */
  ON_TASK_TYPE = 'onTaskType',
  /** 视图激活 */
  ON_VIEW = 'onView',
  /** URI激活 */
  ON_URI = 'onUri',
  /** Webview激活 */
  ON_WEBVIEW_PANEL = 'onWebviewPanel',
  /** 自定义编辑器激活 */
  ON_CUSTOM_EDITOR = 'onCustomEditor',
  /** 认证激活 */
  ON_AUTHENTICATION_REQUEST = 'onAuthenticationRequest',
  /** 终端配置文件激活 */
  ON_TERMINAL_PROFILE = 'onTerminalProfile',
  /** 笔记本激活 */
  ON_NOTEBOOK = 'onNotebook',
  /** 设置激活 */
  ON_SETTINGS_CHANGED = 'onSettingsChanged',
  /** 工作区激活 */
  ON_WORKSPACE_CONTAINS_FILE_PATTERN = 'workspaceContains',
  /** 总是激活 */
  STAR = '*'
}

/**
 * 激活事件监听器
 */
interface ActivationEventListener {
  extensionId: string
  eventPattern: string
  callback: () => Promise<void>
}

/**
 * 激活事件管理器
 * 负责管理扩展的激活事件，决定何时激活扩展
 */
export class ActivationEventManager extends EventEmitter {
  private static instance: ActivationEventManager

  /** 激活事件监听器映射 */
  private eventListeners = new Map<string, ActivationEventListener[]>()

  /** 已触发的事件 */
  private firedEvents = new Set<string>()

  /** 扩展激活事件映射 */
  private extensionEvents = new Map<string, string[]>()

  /** 是否已启动完成 */
  private isStartupFinished = false

  private constructor() {
    super()
  }

  /**
   * 获取单例实例
   */
  public static getInstance(): ActivationEventManager {
    if (!ActivationEventManager.instance) {
      ActivationEventManager.instance = new ActivationEventManager()
    }
    return ActivationEventManager.instance
  }

  /**
   * 注册扩展的激活事件
   * @param extensionId 扩展ID
   * @param activationEvents 激活事件列表
   * @param activationCallback 激活回调函数
   */
  public registerActivationEvents(
    extensionId: string,
    activationEvents: string[],
    activationCallback: () => Promise<void>
  ): Disposable {
    try {
      // 记录扩展的激活事件
      this.extensionEvents.set(extensionId, activationEvents)

      // 为每个激活事件注册监听器
      for (const eventPattern of activationEvents) {
        const eventType = this.parseEventType(eventPattern)

        if (!this.eventListeners.has(eventType)) {
          this.eventListeners.set(eventType, [])
        }

        const listener: ActivationEventListener = {
          extensionId,
          eventPattern,
          callback: activationCallback
        }

        this.eventListeners.get(eventType)!.push(listener)

        // 如果是启动事件且已经启动完成，立即激活
        if (
          eventType === ActivationEventType.STAR ||
          (eventType === ActivationEventType.ON_START_UP && this.isStartupFinished)
        ) {
          setImmediate(() => this.fireEvent(eventPattern))
        }

        // 如果事件已经触发过，立即激活
        if (this.firedEvents.has(eventPattern)) {
          setImmediate(() => activationCallback())
        }
      }

      console.log(
        `[ActivationEventManager] 已注册扩展 ${extensionId} 的 ${activationEvents.length} 个激活事件`
      )

      // 返回清理函数
      return {
        dispose: () => this.unregisterActivationEvents(extensionId)
      }
    } catch (error) {
      console.error(`[ActivationEventManager] 注册扩展 ${extensionId} 激活事件失败:`, error)
      throw error
    }
  }

  /**
   * 取消注册扩展的激活事件
   * @param extensionId 扩展ID
   */
  public unregisterActivationEvents(extensionId: string): void {
    // 清理事件监听器
    for (const [eventType, listeners] of this.eventListeners.entries()) {
      const filteredListeners = listeners.filter((l) => l.extensionId !== extensionId)
      if (filteredListeners.length === 0) {
        this.eventListeners.delete(eventType)
      } else {
        this.eventListeners.set(eventType, filteredListeners)
      }
    }

    // 清理扩展事件记录
    this.extensionEvents.delete(extensionId)

    console.log(`[ActivationEventManager] 已取消注册扩展 ${extensionId} 的激活事件`)
  }

  /**
   * 触发激活事件
   * @param eventPattern 事件模式
   * @param data 事件数据
   */
  public async fireEvent(eventPattern: string, data?: any): Promise<void> {
    try {
      // 记录已触发的事件
      this.firedEvents.add(eventPattern)

      const eventType = this.parseEventType(eventPattern)
      const listeners = this.eventListeners.get(eventType) || []

      // 过滤匹配的监听器
      const matchingListeners = listeners.filter((listener) =>
        this.matchesEventPattern(listener.eventPattern, eventPattern)
      )

      if (matchingListeners.length > 0) {
        console.log(
          `[ActivationEventManager] 触发事件 ${eventPattern}，激活 ${matchingListeners.length} 个扩展`
        )

        // 并行激活所有匹配的扩展
        const activationPromises = matchingListeners.map(async (listener) => {
          try {
            await listener.callback()
            this.emit('extensionActivated', listener.extensionId, eventPattern)
          } catch (error) {
            console.error(`[ActivationEventManager] 激活扩展 ${listener.extensionId} 失败:`, error)
            this.emit('extensionActivationFailed', listener.extensionId, eventPattern, error)
          }
        })

        await Promise.allSettled(activationPromises)
      }

      this.emit('eventFired', eventPattern, data)
    } catch (error) {
      console.error(`[ActivationEventManager] 触发事件 ${eventPattern} 失败:`, error)
      this.emit('eventFireFailed', eventPattern, error)
    }
  }

  /**
   * 触发命令激活事件
   * @param commandId 命令ID
   */
  public async fireCommandEvent(commandId: string): Promise<void> {
    await this.fireEvent(`onCommand:${commandId}`)
  }

  /**
   * 触发语言激活事件
   * @param languageId 语言ID
   */
  public async fireLanguageEvent(languageId: string): Promise<void> {
    await this.fireEvent(`onLanguage:${languageId}`)
  }

  /**
   * 触发文件系统激活事件
   * @param scheme 文件系统方案
   */
  public async fireFileSystemEvent(scheme: string): Promise<void> {
    await this.fireEvent(`onFileSystem:${scheme}`)
  }

  /**
   * 触发视图激活事件
   * @param viewId 视图ID
   */
  public async fireViewEvent(viewId: string): Promise<void> {
    await this.fireEvent(`onView:${viewId}`)
  }

  /**
   * 触发URI激活事件
   * @param scheme URI方案
   */
  public async fireUriEvent(scheme: string): Promise<void> {
    await this.fireEvent(`onUri:${scheme}`)
  }

  /**
   * 触发工作区包含文件模式事件
   * @param pattern 文件模式
   */
  public async fireWorkspaceContainsEvent(pattern: string): Promise<void> {
    await this.fireEvent(`workspaceContains:${pattern}`)
  }

  /**
   * 标记启动完成
   */
  public markStartupFinished(): void {
    this.isStartupFinished = true
    this.fireEvent(ActivationEventType.ON_START_UP)
  }

  /**
   * 解析事件类型
   * @param eventPattern 事件模式
   */
  private parseEventType(eventPattern: string): string {
    if (eventPattern === '*') {
      return ActivationEventType.STAR
    }

    const colonIndex = eventPattern.indexOf(':')
    if (colonIndex === -1) {
      return eventPattern
    }

    return eventPattern.substring(0, colonIndex)
  }

  /**
   * 检查事件模式是否匹配
   * @param listenerPattern 监听器模式
   * @param firedPattern 触发的模式
   */
  private matchesEventPattern(listenerPattern: string, firedPattern: string): boolean {
    // 通配符匹配
    if (listenerPattern === '*') {
      return true
    }

    // 精确匹配
    if (listenerPattern === firedPattern) {
      return true
    }

    // 前缀匹配（用于 workspaceContains 等）
    const listenerType = this.parseEventType(listenerPattern)
    const firedType = this.parseEventType(firedPattern)

    if (listenerType !== firedType) {
      return false
    }

    // 对于某些事件类型，支持模式匹配
    if (listenerType === 'workspaceContains') {
      const listenerGlob = listenerPattern.substring(listenerType.length + 1)
      const firedGlob = firedPattern.substring(firedType.length + 1)
      return this.matchesGlob(listenerGlob, firedGlob)
    }

    return false
  }

  /**
   * 简单的glob模式匹配
   * @param pattern 模式
   * @param text 文本
   */
  private matchesGlob(pattern: string, text: string): boolean {
    // 简化的glob匹配，支持 * 和 ?
    const regexPattern = pattern
      .replace(/[.+^${}()|[\]\\]/g, '\\$&') // 转义特殊字符
      .replace(/\*/g, '.*') // * 匹配任意字符
      .replace(/\?/g, '.') // ? 匹配单个字符

    const regex = new RegExp(`^${regexPattern}$`)
    return regex.test(text)
  }

  /**
   * 获取扩展的激活事件
   * @param extensionId 扩展ID
   */
  public getExtensionActivationEvents(extensionId: string): string[] {
    return this.extensionEvents.get(extensionId) || []
  }

  /**
   * 检查事件是否已触发
   * @param eventPattern 事件模式
   */
  public hasEventFired(eventPattern: string): boolean {
    return this.firedEvents.has(eventPattern)
  }

  /**
   * 获取所有已触发的事件
   */
  public getFiredEvents(): string[] {
    return Array.from(this.firedEvents)
  }

  /**
   * 清理所有激活事件
   */
  public clear(): void {
    this.eventListeners.clear()
    this.firedEvents.clear()
    this.extensionEvents.clear()
    this.isStartupFinished = false

    this.emit('cleared')
    console.log('[ActivationEventManager] 已清理所有激活事件')
  }

  /**
   * 获取统计信息
   */
  public getStats(): {
    eventTypes: number
    totalListeners: number
    firedEvents: number
    extensions: number
  } {
    let totalListeners = 0
    for (const listeners of this.eventListeners.values()) {
      totalListeners += listeners.length
    }

    return {
      eventTypes: this.eventListeners.size,
      totalListeners,
      firedEvents: this.firedEvents.size,
      extensions: this.extensionEvents.size
    }
  }
}
