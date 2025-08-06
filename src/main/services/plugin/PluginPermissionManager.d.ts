export interface PluginPermission {
  id: number
  plugin_id: string
  permission: string
  granted: boolean
  granted_at: string
  granted_by: string
}
