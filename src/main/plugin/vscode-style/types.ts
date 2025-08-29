/**
 * VSCode风格插件系统的类型定义
 */

/** 扩展清单接口 - 对应package.json */
export interface ExtensionManifest {
  /** 扩展名称 */
  name: string
  /** 显示名称 */
  displayName?: string
  /** 描述 */
  description?: string
  /** 版本 */
  version: string
  /** 发布者 */
  publisher?: string
  /** 作者 */
  author?: string | { name: string; email?: string; url?: string }
  /** 许可证 */
  license?: string
  /** 主页 */
  homepage?: string
  /** 仓库 */
  repository?: string | { type: string; url: string }
  /** 引擎版本要求 */
  engines?: {
    whytalk?: string
    node?: string
  }
  /** 分类 */
  categories?: string[]
  /** 关键词 */
  keywords?: string[]
  /** 激活事件 */
  activationEvents?: string[]
  /** 主入口文件 */
  main?: string
  /** 贡献点 */
  contributes?: ExtensionContributes
  /** 依赖 */
  dependencies?: Record<string, string>
  /** 开发依赖 */
  devDependencies?: Record<string, string>
  /** 脚本 */
  scripts?: Record<string, string>
  /** 图标 */
  icon?: string
  /** 预览标志 */
  preview?: boolean
  /** 扩展包 */
  extensionPack?: string[]
  /** 扩展依赖 */
  extensionDependencies?: string[]
}

/** 扩展贡献点 */
export interface ExtensionContributes {
  /** 命令贡献 */
  commands?: CommandContribution[]
  /** 视图贡献 */
  views?: ViewContainerContribution
  /** 配置贡献 */
  configuration?: ConfigurationContribution | ConfigurationContribution[]
  /** 菜单贡献 */
  menus?: MenuContribution
  /** 键绑定贡献 */
  keybindings?: KeybindingContribution[]
  /** 语言贡献 */
  languages?: LanguageContribution[]
  /** 主题贡献 */
  themes?: ThemeContribution[]
  /** 图标主题贡献 */
  iconThemes?: IconThemeContribution[]
  /** 代码片段贡献 */
  snippets?: SnippetContribution[]
  /** 调试器贡献 */
  debuggers?: DebuggerContribution[]
  /** 任务定义贡献 */
  taskDefinitions?: TaskDefinitionContribution[]
  /** 问题匹配器贡献 */
  problemMatchers?: ProblemMatcherContribution[]
  /** 颜色贡献 */
  colors?: ColorContribution[]
}

/** 命令贡献 */
export interface CommandContribution {
  /** 命令ID */
  command: string
  /** 标题 */
  title: string
  /** 分类 */
  category?: string
  /** 图标 */
  icon?: string | { light: string; dark: string }
  /** 启用条件 */
  enablement?: string
  /** 工具提示 */
  tooltip?: string
}

/** 视图容器贡献 */
export interface ViewContainerContribution {
  [location: string]: ViewContribution[]
}

/** 视图贡献 */
export interface ViewContribution {
  /** 视图ID */
  id: string
  /** 名称 */
  name: string
  /** 显示条件 */
  when?: string
  /** 图标 */
  icon?: string
  /** 上下文菜单 */
  contextualTitle?: string
  /** 初始大小 */
  initialSize?: number
  /** 类型 */
  type?: 'tree' | 'webview'
}

/** 配置贡献 */
export interface ConfigurationContribution {
  /** 标题 */
  title?: string
  /** 属性 */
  properties?: Record<string, ConfigurationProperty>
}

/** 配置属性 */
export interface ConfigurationProperty {
  /** 类型 */
  type?: 'string' | 'number' | 'boolean' | 'array' | 'object'
  /** 默认值 */
  default?: unknown
  /** 描述 */
  description?: string
  /** 枚举值 */
  enum?: unknown[]
  /** 枚举描述 */
  enumDescriptions?: string[]
  /** 最小值 */
  minimum?: number
  /** 最大值 */
  maximum?: number
  /** 模式 */
  pattern?: string
  /** 格式 */
  format?: string
  /** 项目类型 */
  items?: ConfigurationProperty
  /** 附加属性 */
  additionalProperties?: boolean | ConfigurationProperty
  /** 作用域 */
  scope?: 'application' | 'window' | 'resource' | 'language-overridable'
  /** 是否忽略同步 */
  ignoreSync?: boolean
  /** 标签 */
  tags?: string[]
  /** 弃用信息 */
  deprecationMessage?: string
  /** 标记为弃用 */
  markdownDeprecationMessage?: string
}

/** 菜单贡献 */
export interface MenuContribution {
  [menuId: string]: MenuItemContribution[]
}

/** 菜单项贡献 */
export interface MenuItemContribution {
  /** 命令 */
  command: string
  /** 显示条件 */
  when?: string
  /** 分组 */
  group?: string
  /** 替代命令 */
  alt?: string
}

/** 键绑定贡献 */
export interface KeybindingContribution {
  /** 命令 */
  command: string
  /** 键位 */
  key: string
  /** Mac键位 */
  mac?: string
  /** Linux键位 */
  linux?: string
  /** Windows键位 */
  win?: string
  /** 条件 */
  when?: string
  /** 参数 */
  args?: Record<string, unknown>
}

/** 语言贡献 */
export interface LanguageContribution {
  /** 语言ID */
  id: string
  /** 别名 */
  aliases?: string[]
  /** 扩展名 */
  extensions?: string[]
  /** 文件名 */
  filenames?: string[]
  /** 文件名模式 */
  filenamePatterns?: string[]
  /** MIME类型 */
  mimetypes?: string[]
  /** 第一行匹配 */
  firstLine?: string
  /** 配置文件 */
  configuration?: string
}

/** 主题贡献 */
export interface ThemeContribution {
  /** 标签 */
  label: string
  /** UI主题 */
  uiTheme: 'vs' | 'vs-dark' | 'hc-black' | 'hc-light'
  /** 路径 */
  path: string
}

/** 图标主题贡献 */
export interface IconThemeContribution {
  /** 标签 */
  label: string
  /** 路径 */
  path: string
}

/** 代码片段贡献 */
export interface SnippetContribution {
  /** 语言 */
  language: string
  /** 路径 */
  path: string
}

/** 调试器贡献 */
export interface DebuggerContribution {
  /** 类型 */
  type: string
  /** 标签 */
  label: string
  /** 程序 */
  program?: string
  /** 运行时 */
  runtime?: string
  /** 配置属性 */
  configurationAttributes?: Record<string, unknown>
  /** 初始配置 */
  initialConfigurations?: Record<string, unknown>[]
  /** 配置片段 */
  configurationSnippets?: Record<string, unknown>[]
  /** 变量 */
  variables?: Record<string, string>
  /** 语言 */
  languages?: string[]
}

/** 任务定义贡献 */
export interface TaskDefinitionContribution {
  /** 类型 */
  type: string
  /** 必需属性 */
  required?: string[]
  /** 属性 */
  properties?: Record<string, unknown>
}

/** 问题匹配器贡献 */
export interface ProblemMatcherContribution {
  /** 名称 */
  name: string
  /** 标签 */
  label?: string
  /** 所有者 */
  owner: string
  /** 文件位置 */
  fileLocation?: string | string[]
  /** 模式 */
  pattern: string | Record<string, unknown>
  /** 严重性 */
  severity?: string
  /** 监视配置 */
  watching?: Record<string, unknown>
}

/** 颜色贡献 */
export interface ColorContribution {
  /** ID */
  id: string
  /** 描述 */
  description: string
  /** 默认值 */
  defaults: {
    light?: string
    dark?: string
    highContrast?: string
    highContrastLight?: string
  }
}

/** 扩展实例 */
export interface ExtensionInstance {
  /** 扩展ID */
  id: string
  /** 清单 */
  manifest: ExtensionManifest
  /** 扩展路径 */
  extensionPath: string
  /** 主入口文件路径 */
  mainPath?: string
  /** 是否激活 */
  isActive: boolean
  /** 是否内置 */
  isBuiltin: boolean
  /** 扩展上下文 */
  context?: ExtensionContext
  /** 激活事件 */
  activationEvents: string[]
  /** 加载时间 */
  loadTime: number
  /** 激活时间 */
  activationTime?: number
  /** 错误信息 */
  error?: string
}

/** 扩展上下文接口 */
export interface ExtensionContext {
  /** 订阅列表 */
  subscriptions: Disposable[]
  /** 扩展路径 */
  extensionPath: string
  /** 扩展URI */
  extensionUri: Uri
  /** 全局状态 */
  globalState: Memento
  /** 工作区状态 */
  workspaceState: Memento
  /** 存储路径 */
  storagePath?: string
  /** 全局存储路径 */
  globalStoragePath: string
  /** 日志路径 */
  logPath: string
  /** 扩展模式 */
  extensionMode: ExtensionMode
  /** 环境变量 */
  environmentVariableCollection: EnvironmentVariableCollection
  /** 秘密存储 */
  secrets: SecretStorage
  /** 扩展类型 */
  extension: Extension
}

/** 可释放接口 */
export interface Disposable {
  dispose(): void
}

/** URI接口 */
export interface Uri {
  scheme: string
  authority: string
  path: string
  query: string
  fragment: string
  fsPath: string
  toString(): string
  toJSON(): Record<string, unknown>
}

/** 内存存储接口 */
export interface Memento {
  get<T>(key: string): T | undefined
  get<T>(key: string, defaultValue: T): T
  update(key: string, value: unknown): Thenable<void>
  keys(): readonly string[]
}

/** 扩展模式 */
export enum ExtensionMode {
  Production = 1,
  Development = 2,
  Test = 3
}

/** 环境变量集合 */
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
    ) => void,
    thisArg?: unknown
  ): void
  delete(variable: string): void
  clear(): void
}

/** 环境变量修改器 */
export interface EnvironmentVariableMutator {
  readonly type: EnvironmentVariableMutatorType
  readonly value: string
}

/** 环境变量修改类型 */
export enum EnvironmentVariableMutatorType {
  Replace = 1,
  Append = 2,
  Prepend = 3
}

/** 秘密存储 */
export interface SecretStorage {
  get(key: string): Thenable<string | undefined>
  store(key: string, value: string): Thenable<void>
  delete(key: string): Thenable<void>
  onDidChange: Event<SecretStorageChangeEvent>
}

/** 秘密存储变更事件 */
export interface SecretStorageChangeEvent {
  key: string
}

/** 扩展信息 */
export interface Extension {
  readonly id: string
  readonly extensionUri: Uri
  readonly extensionPath: string
  readonly isActive: boolean
  readonly packageJSON: Record<string, unknown>
  readonly extensionKind: ExtensionKind
  activate(): Thenable<unknown>
  exports: unknown
}

/** 扩展类型 */
export enum ExtensionKind {
  UI = 1,
  Workspace = 2
}

/** 事件接口 */
export interface Event<T> {
  (listener: (e: T) => void, thisArg?: unknown, disposables?: Disposable[]): Disposable
}

/** Promise类型 */
export interface Thenable<T> {
  then<TResult1 = T, TResult2 = never>(
    onfulfilled?: ((value: T) => TResult1 | Thenable<TResult1>) | undefined | null,
    onrejected?: ((reason: unknown) => TResult2 | Thenable<TResult2>) | undefined | null
  ): Thenable<TResult1 | TResult2>
}

/** 取消令牌 */
export interface CancellationToken {
  readonly isCancellationRequested: boolean
  readonly onCancellationRequested: Event<void>
}

/** 进度接口 */
export interface Progress<T> {
  report(value: T): void
}

/** 进度选项 */
export interface ProgressOptions {
  location: ProgressLocation | { viewId: string }
  title?: string
  cancellable?: boolean
}

/** 进度位置 */
export enum ProgressLocation {
  SourceControl = 1,
  Window = 10,
  Notification = 15
}

/** Webview接口 */
export interface Webview {
  readonly options: WebviewOptions
  readonly html: string
  readonly onDidReceiveMessage: Event<unknown>
  postMessage(message: unknown): Thenable<boolean>
  asWebviewUri(localResource: Uri): Uri
  readonly cspSource: string
}

/** Webview选项 */
export interface WebviewOptions {
  readonly enableScripts?: boolean
  readonly enableForms?: boolean
  readonly localResourceRoots?: readonly Uri[]
  readonly portMapping?: readonly WebviewPortMapping[]
}

/** Webview端口映射 */
export interface WebviewPortMapping {
  readonly webviewPort: number
  readonly extensionHostPort: number
}

/** Webview面板 */
export interface WebviewPanel {
  readonly viewType: string
  readonly title: string
  readonly iconPath?: Uri | { light: Uri; dark: Uri }
  readonly webview: Webview
  readonly options: WebviewPanelOptions
  readonly active: boolean
  readonly visible: boolean
  readonly viewColumn?: ViewColumn
  readonly onDidChangeViewState: Event<WebviewPanelOnDidChangeViewStateEvent>
  readonly onDidDispose: Event<void>
  reveal(viewColumn?: ViewColumn, preserveFocus?: boolean): void
  dispose(): void
}

/** Webview面板选项 */
export interface WebviewPanelOptions {
  readonly enableFindWidget?: boolean
  readonly retainContextWhenHidden?: boolean
}

/** Webview面板状态变更事件 */
export interface WebviewPanelOnDidChangeViewStateEvent {
  readonly webviewPanel: WebviewPanel
}

/** 视图列 */
export enum ViewColumn {
  Active = -1,
  Beside = -2,
  One = 1,
  Two = 2,
  Three = 3,
  Four = 4,
  Five = 5,
  Six = 6,
  Seven = 7,
  Eight = 8,
  Nine = 9
}

/** Webview视图 */
export interface WebviewView {
  readonly viewType: string
  readonly title?: string
  readonly description?: string
  readonly webview: Webview
  readonly onDidChangeVisibility: Event<void>
  readonly onDidDispose: Event<void>
  readonly visible: boolean
  show(preserveFocus?: boolean): void
}

/** Webview视图提供者 */
export interface WebviewViewProvider {
  resolveWebviewView(
    webviewView: WebviewView,
    context: WebviewViewResolveContext,
    token: CancellationToken
  ): Thenable<void> | void
}

/** Webview视图解析上下文 */
export interface WebviewViewResolveContext<T = unknown> {
  readonly state: T | undefined
}
