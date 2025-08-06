export interface IPCRequest {
  pluginId: string
  action: string
  data?: any
  options?: any
  permission?: string
}

export interface IPCResponse {
  success: boolean
  data?: any
  error?: string
  warnings?: string[]
}

export interface PluginDataIPCChannels {
  // 私有数据操作
  'plugin-data:set': (request: IPCRequest) => Promise<IPCResponse>
  'plugin-data:get': (request: IPCRequest) => Promise<IPCResponse>
  'plugin-data:delete': (request: IPCRequest) => Promise<IPCResponse>
  'plugin-data:list': (request: IPCRequest) => Promise<IPCResponse>

  // 共享数据操作
  'plugin-shared-data:set': (request: IPCRequest) => Promise<IPCResponse>
  'plugin-shared-data:get': (request: IPCRequest) => Promise<IPCResponse>
  'plugin-shared-data:delete': (request: IPCRequest) => Promise<IPCResponse>
  'plugin-shared-data:list': (request: IPCRequest) => Promise<IPCResponse>

  // 联系人操作
  'plugin-contacts:get': (request: IPCRequest) => Promise<IPCResponse>
  'plugin-contacts:list': (request: IPCRequest) => Promise<IPCResponse>
  'plugin-contacts:add': (request: IPCRequest) => Promise<IPCResponse>
  'plugin-contacts:update': (request: IPCRequest) => Promise<IPCResponse>
  'plugin-contacts:delete': (request: IPCRequest) => Promise<IPCResponse>
  'plugin-contacts:pin': (request: IPCRequest) => Promise<IPCResponse>

  // 消息操作
  'plugin-messages:get': (request: IPCRequest) => Promise<IPCResponse>
  'plugin-messages:list': (request: IPCRequest) => Promise<IPCResponse>
  'plugin-messages:send': (request: IPCRequest) => Promise<IPCResponse>
  'plugin-messages:mark-read': (request: IPCRequest) => Promise<IPCResponse>
  'plugin-messages:delete': (request: IPCRequest) => Promise<IPCResponse>

  // 会话操作
  'plugin-conversations:get': (request: IPCRequest) => Promise<IPCResponse>
  'plugin-conversations:list': (request: IPCRequest) => Promise<IPCResponse>
  'plugin-conversations:create': (request: IPCRequest) => Promise<IPCResponse>
  'plugin-conversations:update': (request: IPCRequest) => Promise<IPCResponse>
  'plugin-conversations:delete': (request: IPCRequest) => Promise<IPCResponse>

  // 权限操作
  'plugin-permissions:check': (request: IPCRequest) => Promise<IPCResponse>
  'plugin-permissions:request': (request: IPCRequest) => Promise<IPCResponse>
  'plugin-permissions:list': (request: IPCRequest) => Promise<IPCResponse>
}
