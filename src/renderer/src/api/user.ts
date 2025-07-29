import { createApi, EmptyRequest } from './request.ts'

interface ServUserPasswordUpdateRequest {
  old_password: string
  new_password: string
}

// 修改密码服务接口
export const ServUserPasswordUpdate = createApi<ServUserPasswordUpdateRequest, null>(
  '/api/v1/user/password/update'
)

interface ServUserMobileUpdateRequest {
  mobile: string
  password: string
  sms_code: string
}

// 修改手机号服务接口
export const ServUserMobileUpdate = createApi<ServUserMobileUpdateRequest, null>(
  '/api/v1/user/mobile/update'
)

interface ServUserEmailUpdateRequest {
  email: string
  password: string
  code: string
}

// 修改手机号服务接口
export const ServUserEmailUpdate = createApi<ServUserEmailUpdateRequest, null>(
  '/api/v1/user/email/update'
)

interface ServUserUpdateRequest {
  nickname: string
  avatar: string
  motto: string
  gender: number
  birthday: string
}

// 修改个人信息服务接口
export const ServUserUpdate = createApi<ServUserUpdateRequest, null>('/api/v1/user/update')

interface ServUserDetailResponse {
  mobile: string
  nickname: string
  avatar: string
  motto: string
  email: string
  gender: number
  birthday: string
}

// 查询用户信息服务接口
export const ServUserDetail = createApi<EmptyRequest, ServUserDetailResponse>('/api/v1/user/detail')

// 获取用户相关设置信息
export const ServeUserSetting = createApi<EmptyRequest, any>('/api/v1/user/setting')
