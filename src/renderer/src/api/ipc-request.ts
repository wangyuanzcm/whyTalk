import * as auth from '@/utils/auth.ts'
import { isBrowserMode } from '@/utils/browser-mock.ts'

export interface ApiResponse<T = unknown> {
  status: number // http 状态码非200则处理失败
  code: number // 具体的业务错误码 200 表示成功
  message: string // 错误信息
  data?: T // 仅当 http status 为 200 时有效
}

export type Response<T> = Promise<ApiResponse<T>>

export interface ApiOptions {
  // 是否显示加载状态
  loading?: Ref<boolean>
  // 是否显示错误消息
  error?: boolean
  // 自定义错误信息
  failText?: string
  // 成功显示的文本信息
  successText?: string
  // 重试次数
  retry?: number
  onSuccess?: () => void
}

let once = false

/**
 * 获取模拟 API 响应（浏览器模式）
 */
async function getMockApiResponse(url: string, params?: unknown, token?: string) {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 100))
  
  console.log(`[Mock API] ${url}`, params)
  
  // 模拟认证相关接口
  if (url === '/api/v1/auth/login') {
    return {
      code: 200,
      message: '登录成功',
      data: {
        access_token: 'mock_access_token_123456',
        expires_in: 7200,
        user: {
          id: 1,
          mobile: '13800138000',
          nickname: '演示用户',
          avatar: '',
          status: 'online'
        }
      }
    }
  }
  
  if (url === '/api/v1/auth/register') {
    return {
      code: 200,
      message: '注册成功',
      data: null
    }
  }
  
  if (url === '/api/v1/auth/logout') {
    return {
      code: 200,
      message: '退出成功',
      data: null
    }
  }
  
  // 模拟用户相关接口
  if (url === '/api/v1/user/info') {
    return {
      code: 200,
      message: '获取用户信息成功',
      data: {
        id: 1,
        mobile: '13800138000',
        nickname: '演示用户',
        avatar: '',
        status: 'online'
      }
    }
  }
  
  if (url === '/api/v1/user/update') {
    return {
      code: 200,
      message: '更新用户信息成功',
      data: { id: 1, ...params }
    }
  }
  
  // 模拟消息相关接口
  if (url.startsWith('/api/v1/message')) {
    return {
      code: 200,
      message: '操作成功',
      data: {
        list: [],
        total: 0
      }
    }
  }
  
  // 模拟联系人相关接口
  if (url.startsWith('/api/v1/contact')) {
    return {
      code: 200,
      message: '操作成功',
      data: {
        list: [],
        total: 0
      }
    }
  }
  
  // 模拟笔记相关接口
  if (url.startsWith('/api/v1/note')) {
    return {
      code: 200,
      message: '操作成功',
      data: {
        list: [],
        total: 0
      }
    }
  }
  
  // 默认成功响应
  return {
    code: 200,
    message: '操作成功',
    data: null
  }
}

/**
 * 通过IPC发送API请求
 */
export async function ipcApi<T = unknown>(
  uri: string,
  params?: unknown,
  options?: ApiOptions
): Response<T> {
  if (options?.loading) options.loading.value = true

  try {
    const token = auth.getToken()
    console.log('ipcApi: Making request to', uri, 'with token:', token ? 'present' : 'missing')

    // 在浏览器模式下使用模拟响应
    if (isBrowserMode()) {
      console.log('[Browser Mode] Using mock API response for:', uri)
      const response = await getMockApiResponse(uri, params, token)
      
      const { code, message, data } = response
      
      // 处理认证失败
      if (code === 401) {
        console.warn('ipcApi: Authentication failed, clearing token')
        auth.deleteToken()
        return { status: 401, code, message }
      }
      
      // 处理成功响应
      if (code === 200) {
        if (options?.successText) {
          window['$message']?.success(options?.successText)
        }
        if (options?.onSuccess) options.onSuccess()
        return { status: 200, code, message, data: data as T }
      }
      
      // 处理业务错误
      console.error('ipcApi: Business error:', message)
      if (options?.error || options?.error == undefined) {
        error(options?.failText || message || '请求失败')
      }
      return { status: 200, code, message, data: data as T }
    }

    // 通过IPC发送请求
    const response = await window.electron.ipcRenderer.invoke('api-request', {
      url: uri,
      method: 'POST',
      data: params || {},
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    })

    console.log('ipcApi: Response received:', {
      status: response.status,
      code: response.code,
      url: uri
    })
    const { code, message, data } = response

    // 处理认证失败
    if (code === 401) {
      console.warn('ipcApi: Authentication failed, clearing token')
      auth.deleteToken()

      if (!once) {
        once = true
        window['$dialog']?.info({
          title: '友情提示',
          content: '当前登录已失效，请重新登录？',
          positiveText: '立即登录?',
          maskClosable: false,
          onPositiveClick: () => {
            location.reload()
          }
        })
      }

      return { status: 401, code, message }
    }

    // 处理成功响应
    if (code === 200) {
      if (options?.successText) {
        window['$message']?.success(options?.successText)
      }

      if (options?.onSuccess) options.onSuccess()

      return { status: 200, code, message, data: data as T }
    }

    // 处理业务错误
    console.error('ipcApi: Business error:', message)
    if (options?.error || options?.error == undefined) {
      error(options?.failText || message || '请求失败')
    }

    return { status: 200, code, message, data: data as T }
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : '网络请求失败'
    console.error('IPC API request failed:', err)

    if (options?.error || options?.error == undefined) {
      error(options?.failText || errorMessage)
    }

    return {
      status: -1,
      code: 500,
      message: errorMessage
    }
  } finally {
    if (options?.loading) options.loading.value = false
  }
}

/**
 * GET请求（通过IPC）
 */
export const ipcGet = (url: string, data: Record<string, unknown> = {}) => {
  return ipcApi(url, data)
}

/**
 * POST请求（通过IPC）
 */
export const ipcPost = (url: string, data: Record<string, unknown> = {}) => {
  return ipcApi(url, data)
}

/**
 * 创建IPC API调用函数
 */
export const createIpcApi = <R = unknown, T = unknown>(url: string) => {
  return (data?: R, options?: ApiOptions): Response<T> => {
    return ipcApi(url, data, options)
  }
}

/**
 * 文件上传（通过IPC）
 */
export async function uploadFile(file: File, options?: ApiOptions): Promise<ApiResponse<unknown>> {
  if (options?.loading) options.loading.value = true

  try {
    const token = auth.getToken()

    // 在浏览器模式下使用模拟响应
    if (isBrowserMode()) {
      console.log('[Browser Mode] Mock file upload:', file.name)
      // 模拟上传延迟
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const response = {
        code: 200,
        message: '文件上传成功',
        data: { url: `/mock/upload/${file.name}` }
      }
      
      const { code, message, data } = response
      
      if (code === 200) {
        if (options?.successText) {
          window['$message']?.success(options?.successText)
        }
        if (options?.onSuccess) options.onSuccess()
        return { status: 200, code, message, data }
      }
      
      if (options?.error || options?.error == undefined) {
        error(options?.failText || message || '文件上传失败')
      }
      return { status: 200, code, message, data }
    }

    // 将文件转换为ArrayBuffer
    const arrayBuffer = await file.arrayBuffer()

    // 通过IPC发送文件上传请求
    const response = await window.electron.ipcRenderer.invoke('upload-file', {
      filename: file.name,
      data: Array.from(new Uint8Array(arrayBuffer)),
      mimetype: file.type,
      size: file.size,
      token: token
    })

    const { code, message, data } = response

    if (code === 200) {
      if (options?.successText) {
        window['$message']?.success(options?.successText)
      }

      if (options?.onSuccess) options.onSuccess()

      return { status: 200, code, message, data }
    }

    if (options?.error || options?.error == undefined) {
      error(options?.failText || message || '文件上传失败')
    }

    return { status: 200, code, message, data }
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : '文件上传失败'

    if (options?.error || options?.error == undefined) {
      error(options?.failText || errorMessage)
    }

    return {
      status: -1,
      code: 500,
      message: errorMessage
    }
  } finally {
    if (options?.loading) options.loading.value = false
  }
}

/**
 * 附件上传（通过IPC）
 */
export async function uploadAnnex(
  file: File,
  articleId: number,
  options?: ApiOptions
): Promise<ApiResponse<unknown>> {
  if (options?.loading) options.loading.value = true

  try {
    const token = auth.getToken()

    // 在浏览器模式下使用模拟响应
    if (isBrowserMode()) {
      console.log('[Browser Mode] Mock annex upload:', file.name, 'for article:', articleId)
      // 模拟上传延迟
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const response = {
        code: 200,
        message: '附件上传成功',
        data: { id: Math.floor(Math.random() * 1000), url: `/mock/upload/annex/${file.name}` }
      }
      
      const { code, message, data } = response
      
      if (code === 200) {
        if (options?.successText) {
          window['$message']?.success(options?.successText)
        }
        if (options?.onSuccess) options.onSuccess()
        return { status: 200, code, message, data }
      }
      
      if (options?.error || options?.error == undefined) {
        error(options?.failText || message || '附件上传失败')
      }
      return { status: 200, code, message, data }
    }

    // 将文件转换为ArrayBuffer
    const arrayBuffer = await file.arrayBuffer()

    // 通过IPC发送附件上传请求
    const response = await window.electron.ipcRenderer.invoke('upload-annex', {
      filename: file.name,
      data: Array.from(new Uint8Array(arrayBuffer)),
      mimetype: file.type,
      size: file.size,
      articleId: articleId,
      token: token
    })

    const { code, message, data } = response

    if (code === 200) {
      if (options?.successText) {
        window['$message']?.success(options?.successText)
      }

      if (options?.onSuccess) options.onSuccess()

      return { status: 200, code, message, data }
    }

    if (options?.error || options?.error == undefined) {
      error(options?.failText || message || '附件上传失败')
    }

    return { status: 200, code, message, data }
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : '附件上传失败'

    if (options?.error || options?.error == undefined) {
      error(options?.failText || errorMessage)
    }

    return {
      status: -1,
      code: 500,
      message: errorMessage
    }
  } finally {
    if (options?.loading) options.loading.value = false
  }
}

/**
 * 分片上传（通过IPC）
 */
export async function uploadMultipart(
  fileSlice: Blob,
  uploadId: string,
  splitIndex: number,
  splitNum: number,
  options?: ApiOptions
): Promise<ApiResponse<unknown>> {
  if (options?.loading) options.loading.value = true

  try {
    const token = auth.getToken()

    // 在浏览器模式下使用模拟响应
    if (isBrowserMode()) {
      console.log('[Browser Mode] Mock multipart upload:', uploadId, `${splitIndex}/${splitNum}`)
      // 模拟上传延迟
      await new Promise(resolve => setTimeout(resolve, 200))
      
      const response = {
        code: 200,
        message: '分片上传成功',
        data: { uploaded: true, progress: Math.round((splitIndex / splitNum) * 100) }
      }
      
      const { code, message, data } = response
      
      if (code === 200) {
        if (options?.successText) {
          window['$message']?.success(options?.successText)
        }
        if (options?.onSuccess) options.onSuccess()
        return { status: 200, code, message, data }
      }
      
      if (options?.error || options?.error == undefined) {
        error(options?.failText || message || '分片上传失败')
      }
      return { status: 200, code, message, data }
    }

    // 将文件片段转换为ArrayBuffer
    const arrayBuffer = await fileSlice.arrayBuffer()

    // 通过IPC发送分片上传请求
    const response = await window.electron.ipcRenderer.invoke('upload-multipart', {
      data: Array.from(new Uint8Array(arrayBuffer)),
      uploadId: uploadId,
      splitIndex: splitIndex,
      splitNum: splitNum,
      token: token
    })

    const { code, message, data } = response

    if (code === 200) {
      if (options?.successText) {
        window['$message']?.success(options?.successText)
      }

      if (options?.onSuccess) options.onSuccess()

      return { status: 200, code, message, data }
    }

    if (options?.error || options?.error == undefined) {
      error(options?.failText || message || '分片上传失败')
    }

    return { status: 200, code, message, data }
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : '分片上传失败'

    if (options?.error || options?.error == undefined) {
      error(options?.failText || errorMessage)
    }

    return {
      status: -1,
      code: 500,
      message: errorMessage
    }
  } finally {
    if (options?.loading) options.loading.value = false
  }
}

function error(message: string) {
  if (window['$message']) {
    return window['$message'].error(message)
  }

  window.alert(message)
}

export interface EmptyRequest {}
