/**
 * 认证服务相关类型定义
 */

/** 用户信息接口 */
export interface User {
  id: number
  mobile: string
  nickname: string
  avatar: string
  motto: string
  email: string
  gender: number
  birthday: string
  status: number
  created_at: string
  updated_at: string
}

/** 登录请求接口 */
export interface LoginRequest {
  mobile: string
  password: string
  platform: string
}

/** 登录响应接口 */
export interface LoginResponse {
  access_token: string
  expires_in: number
  type: string
  user: User
}

/** 注册请求接口 */
export interface RegisterRequest {
  nickname: string
  mobile: string
  password: string
  platform: string
  sms_code: string
}
