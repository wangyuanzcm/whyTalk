import * as auth from '@/utils/auth.ts'

export interface ApiResponse<T = any> {
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
  onSuccess?: Function
}

let once = false

/**
 * 通过IPC发送API请求
 */
export async function ipcApi<T = any>(
  uri: string,
  params?: any,
  options?: ApiOptions
): Response<T> {
  if (options?.loading) options.loading.value = true

  try {
    const token = auth.getToken()
    console.log('ipcApi: Making request to', uri, 'with token:', token ? 'present' : 'missing')

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
export const ipcGet = (url: string, data: any = {}) => {
  return ipcApi(url, data)
}

/**
 * POST请求（通过IPC）
 */
export const ipcPost = (url: string, data: any = {}) => {
  return ipcApi(url, data)
}

/**
 * 创建IPC API调用函数
 */
export const createIpcApi = <R = any, T = any>(url: string) => {
  return (data?: R, options?: ApiOptions): Response<T> => {
    return ipcApi(url, data, options)
  }
}

/**
 * 文件上传（通过IPC）
 */
export async function uploadFile(file: File, options?: ApiOptions): Promise<ApiResponse<any>> {
  if (options?.loading) options.loading.value = true

  try {
    const token = auth.getToken()

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
): Promise<ApiResponse<any>> {
  if (options?.loading) options.loading.value = true

  try {
    const token = auth.getToken()

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
): Promise<ApiResponse<any>> {
  if (options?.loading) options.loading.value = true

  try {
    const token = auth.getToken()

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
