/**
 * 用户服务相关类型定义
 */

/** 用户更新请求接口 */
export interface UserUpdateRequest {
  nickname: string
  avatar: string
  motto: string
  gender: number
  birthday: string
}

/** 用户设置接口 */
export interface UserSetting {
  setting_key: string
  setting_value: string
}
