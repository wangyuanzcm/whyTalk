export interface IPCRequest {
  id: string
  method: string
  url: string
  data?: any
  headers?: { [key: string]: string }
}

export interface IPCResponse {
  id: string
  status: number
  code: number
  message: string
  data?: any
}
