import { createIpcApi, EmptyRequest } from './ipc-request.ts'

interface ServUserPasswordUpdateRequest {
  old_password: string
  new_password: string
}

// 修改密码服务接口
export const ServUserPasswordUpdate = createIpcApi<ServUserPasswordUpdateRequest, null>(
  '/api/v1/user/password'
)

interface ServUserMobileUpdateRequest {
  mobile: string
  sms_code: string
  password: string
}

// 修改手机号服务接口
export const ServUserMobileUpdate = createIpcApi<ServUserMobileUpdateRequest, null>(
  '/api/v1/user/mobile'
)

interface ServUserEmailUpdateRequest {
  email: string
  email_code: string
  password: string
}

// 修改邮箱服务接口
export const ServUserEmailUpdate = createIpcApi<ServUserEmailUpdateRequest, null>(
  '/api/v1/user/email'
)

interface ServUserUpdateRequest {
  nickname?: string
  avatar?: string
  motto?: string
  gender?: number
  birthday?: string
}

// 修改个人信息服务接口
export const ServUserUpdate = createIpcApi<ServUserUpdateRequest, null>('/api/v1/user/update')

interface ServUserDetailResponse {
  id: number
  mobile: string
  nickname: string
  avatar: string
  motto: string
  email: string
  gender: number
  birthday: string
  is_robot: number
  created_at: string
  updated_at: string
}

// 查询用户信息服务接口
export const ServUserDetail = createIpcApi<EmptyRequest, ServUserDetailResponse>(
  '/api/v1/user/detail'
)

interface UserInfo {
  uid: number
  nickname: string
  mobile: string
  email: string
  gender: number
  motto: string
  avatar: string
  is_qiye?: boolean
}

interface ServeUserSettingResponse {
  user_info: UserInfo
}

// 获取用户设置
export const ServeUserSetting = createIpcApi<EmptyRequest, ServeUserSettingResponse>(
  '/api/v1/user/setting'
)
