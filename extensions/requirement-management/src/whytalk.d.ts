/**
 * WhyTalk扩展API类型定义
 * 类似于VSCode的vscode.d.ts
 */
declare module 'whytalk' {
  /**
   * 扩展上下文
   */
  export interface ExtensionContext {
    /** 订阅列表，用于自动清理资源 */
    subscriptions: Disposable[]

    /** 扩展路径 */
    extensionPath: string

    /** 扩展URI */
    extensionUri: Uri

    /** 全局状态存储 */
    globalState: Memento

    /** 工作区状态存储 */
    workspaceState: Memento

    /** 全局存储路径 */
    globalStoragePath: string

    /** 日志路径 */
    logPath: string

    /** 扩展模式 */
    extensionMode: ExtensionMode

    /** 环境变量集合 */
    environmentVariableCollection: EnvironmentVariableCollection

    /** 秘密存储 */
    secrets: SecretStorage

    /** 扩展信息 */
    extension: Extension<any>
  }

  /**
   * 可释放资源接口
   */
  export interface Disposable {
    dispose(): any
  }

  /**
   * URI接口
   */
  export interface Uri {
    scheme: string
    authority?: string
    path: string
    query?: string
    fragment?: string
  }

  /**
   * 内存存储接口
   */
  export interface Memento {
    get<T>(key: string): T | undefined
    get<T>(key: string, defaultValue: T): T
    update(key: string, value: any): Thenable<void>
    keys(): readonly string[]
  }

  /**
   * 扩展模式枚举
   */
  export enum ExtensionMode {
    Production = 1,
    Development = 2,
    Test = 3
  }

  /**
   * 环境变量集合接口
   */
  export interface EnvironmentVariableCollection {
    persistent: boolean
    replace(variable: string, value: string): void
    append(variable: string, value: string): void
    prepend(variable: string, value: string): void
    get(variable: string): EnvironmentVariableMutator | undefined
    forEach(
      callback: (
        variable: string,
        mutator: EnvironmentVariableMutator,
        collection: EnvironmentVariableCollection
      ) => any,
      thisArg?: any
    ): void
    delete(variable: string): void
    clear(): void
  }

  /**
   * 环境变量修改器接口
   */
  export interface EnvironmentVariableMutator {
    readonly type: EnvironmentVariableMutatorType
    readonly value: string
  }

  /**
   * 环境变量修改器类型枚举
   */
  export enum EnvironmentVariableMutatorType {
    Replace = 1,
    Append = 2,
    Prepend = 3
  }

  /**
   * 秘密存储接口
   */
  export interface SecretStorage {
    get(key: string): Thenable<string | undefined>
    store(key: string, value: string): Thenable<void>
    delete(key: string): Thenable<void>
    onDidChange: Event<SecretStorageChangeEvent>
  }

  /**
   * 秘密存储变化事件
   */
  export interface SecretStorageChangeEvent {
    readonly key: string
  }

  /**
   * 扩展接口
   */
  export interface Extension<T> {
    readonly id: string
    readonly extensionUri: Uri
    readonly extensionPath: string
    readonly isActive: boolean
    readonly packageJSON: any
    readonly exports: T
    activate(): Thenable<T>
  }

  /**
   * 事件接口
   */
  export interface Event<T> {
    (listener: (e: T) => any, thisArg?: any, disposables?: Disposable[]): Disposable
  }

  /**
   * Thenable接口
   */
  export interface Thenable<T> {
    then<TResult>(
      onfulfilled?: (value: T) => TResult | Thenable<TResult>,
      onrejected?: (reason: any) => TResult | Thenable<TResult>
    ): Thenable<TResult>
    then<TResult>(
      onfulfilled?: (value: T) => TResult | Thenable<TResult>,
      onrejected?: (reason: any) => void
    ): Thenable<TResult>
  }

  /**
   * 取消令牌接口
   */
  export interface CancellationToken {
    readonly isCancellationRequested: boolean
    readonly onCancellationRequested: Event<any>
  }

  /**
   * 进度接口
   */
  export interface Progress<T> {
    report(value: T): void
  }

  /**
   * 状态栏对齐方式枚举
   */
  export enum StatusBarAlignment {
    Left = 1,
    Right = 2
  }

  /**
   * 状态栏项接口
   */
  export interface StatusBarItem {
    readonly alignment: StatusBarAlignment
    readonly priority?: number
    text: string
    tooltip?: string | undefined
    color?: string | undefined
    command?: string | undefined
    show(): void
    hide(): void
    dispose(): void
  }

  /**
   * 消息项接口
   */
  export interface MessageItem {
    title: string
    isCloseAffordance?: boolean
  }

  /**
   * 消息选项接口
   */
  export interface MessageOptions {
    modal?: boolean
  }

  /**
   * 快速选择项接口
   */
  export interface QuickPickItem {
    label: string
    description?: string
    detail?: string
    picked?: boolean
    alwaysShow?: boolean
  }

  /**
   * 快速选择选项接口
   */
  export interface QuickPickOptions {
    matchOnDescription?: boolean
    matchOnDetail?: boolean
    placeHolder?: string
    ignoreFocusOut?: boolean
    canPickMany?: boolean
  }

  /**
   * 输入框选项接口
   */
  export interface InputBoxOptions {
    value?: string
    valueSelection?: [number, number]
    prompt?: string
    placeHolder?: string
    password?: boolean
    ignoreFocusOut?: boolean
    validateInput?(value: string): string | undefined | null | Thenable<string | undefined | null>
  }

  /**
   * 配置变化事件接口
   */
  export interface ConfigurationChangeEvent {
    affectsConfiguration(section: string, resource?: Uri): boolean
  }

  /**
   * 工作区配置接口
   */
  export interface WorkspaceConfiguration {
    get<T>(section: string): T | undefined
    get<T>(section: string, defaultValue: T): T
    has(section: string): boolean
    inspect<T>(section: string):
      | {
          key: string
          defaultValue?: T
          globalValue?: T
          workspaceValue?: T
          workspaceFolderValue?: T
        }
      | undefined
    update(
      section: string,
      value: any,
      configurationTarget?: ConfigurationTarget | boolean
    ): Thenable<void>
  }

  /**
   * 配置目标枚举
   */
  export enum ConfigurationTarget {
    Global = 1,
    Workspace = 2,
    WorkspaceFolder = 3
  }

  /**
   * 命名空间：窗口
   */
  export namespace window {
    /**
     * 显示信息消息
     */
    export function showInformationMessage(
      message: string,
      ...items: string[]
    ): Thenable<string | undefined>
    export function showInformationMessage(
      message: string,
      options: MessageOptions,
      ...items: string[]
    ): Thenable<string | undefined>
    export function showInformationMessage<T extends MessageItem>(
      message: string,
      ...items: T[]
    ): Thenable<T | undefined>
    export function showInformationMessage<T extends MessageItem>(
      message: string,
      options: MessageOptions,
      ...items: T[]
    ): Thenable<T | undefined>

    /**
     * 显示警告消息
     */
    export function showWarningMessage(
      message: string,
      ...items: string[]
    ): Thenable<string | undefined>
    export function showWarningMessage(
      message: string,
      options: MessageOptions,
      ...items: string[]
    ): Thenable<string | undefined>
    export function showWarningMessage<T extends MessageItem>(
      message: string,
      ...items: T[]
    ): Thenable<T | undefined>
    export function showWarningMessage<T extends MessageItem>(
      message: string,
      options: MessageOptions,
      ...items: T[]
    ): Thenable<T | undefined>

    /**
     * 显示错误消息
     */
    export function showErrorMessage(
      message: string,
      ...items: string[]
    ): Thenable<string | undefined>
    export function showErrorMessage(
      message: string,
      options: MessageOptions,
      ...items: string[]
    ): Thenable<string | undefined>
    export function showErrorMessage<T extends MessageItem>(
      message: string,
      ...items: T[]
    ): Thenable<T | undefined>
    export function showErrorMessage<T extends MessageItem>(
      message: string,
      options: MessageOptions,
      ...items: T[]
    ): Thenable<T | undefined>

    /**
     * 显示快速选择
     */
    export function showQuickPick(
      items: string[] | Thenable<string[]>,
      options?: QuickPickOptions,
      token?: CancellationToken
    ): Thenable<string | undefined>
    export function showQuickPick<T extends QuickPickItem>(
      items: T[] | Thenable<T[]>,
      options?: QuickPickOptions,
      token?: CancellationToken
    ): Thenable<T | undefined>

    /**
     * 显示输入框
     */
    export function showInputBox(
      options?: InputBoxOptions,
      token?: CancellationToken
    ): Thenable<string | undefined>

    /**
     * 创建状态栏项
     */
    export function createStatusBarItem(
      alignment?: StatusBarAlignment,
      priority?: number
    ): StatusBarItem

    /**
     * 显示进度
     */
    export function withProgress<R>(
      options: ProgressOptions,
      task: (progress: Progress<ProgressMessage>, token: CancellationToken) => Thenable<R>
    ): Thenable<R>
  }

  /**
   * 进度选项接口
   */
  export interface ProgressOptions {
    location: ProgressLocation
    title?: string
    cancellable?: boolean
  }

  /**
   * 进度位置枚举
   */
  export enum ProgressLocation {
    SourceControl = 1,
    Window = 10,
    Notification = 15
  }

  /**
   * 进度消息接口
   */
  export interface ProgressMessage {
    message?: string
    increment?: number
  }

  /**
   * 命名空间：命令
   */
  export namespace commands {
    /**
     * 注册命令
     */
    export function registerCommand(
      command: string,
      callback: (...args: any[]) => any,
      thisArg?: any
    ): Disposable

    /**
     * 执行命令
     */
    export function executeCommand<T = unknown>(command: string, ...rest: any[]): Thenable<T>

    /**
     * 获取所有命令
     */
    export function getCommands(filterInternal?: boolean): Thenable<string[]>
  }

  /**
   * 命名空间：工作区
   */
  export namespace workspace {
    /**
     * 获取配置
     */
    export function getConfiguration(section?: string, resource?: Uri): WorkspaceConfiguration

    /**
     * 配置变化事件
     */
    export const onDidChangeConfiguration: Event<ConfigurationChangeEvent>
  }

  /**
   * 命名空间：扩展
   */
  export namespace extensions {
    /**
     * 获取扩展
     */
    export function getExtension<T = any>(extensionId: string): Extension<T> | undefined

    /**
     * 获取所有扩展
     */
    export const all: readonly Extension<any>[]

    /**
     * 扩展变化事件
     */
    export const onDidChange: Event<void>
  }
}