import { createIpcApi } from './ipc-request.ts'

export const ServOrganizeDepartmentList = createIpcApi<any, any>('/api/v1/organize/department/all')

export const ServOrganizePersonnelAll = createIpcApi<any, any>('/api/v1/organize/personnel/all')
