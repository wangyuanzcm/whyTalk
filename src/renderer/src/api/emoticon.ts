import { createIpcApi } from './ipc-request.ts'

export const ServCustomizeEmoticonList = createIpcApi('/api/v1/emoticon/customize/list')

export const ServCustomizeEmoticonUpload = createIpcApi('/api/v1/emoticon/customize/upload')

export const ServCustomizeEmoticonDelete = createIpcApi('/api/v1/emoticon/customize/delete')

export const ServCustomizeEmoticonCreate = createIpcApi('/api/v1/emoticon/customize/create')
