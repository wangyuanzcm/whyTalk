export interface PluginMessage {
  fromPluginId: string
  toPluginId: string
  action: string
  data?: any
  requestId?: string
}

export interface PluginResponse {
  success: boolean
  data?: any
  error?: string
  requestId?: string
}
