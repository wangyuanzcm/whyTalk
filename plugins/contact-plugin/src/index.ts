/**
 * 通讯录插件主入口文件
 */

// 导出服务类
export { ContactService } from './services/ContactService'
export { GroupService } from './services/GroupService'

// 导出SDK
export { ContactSDK, createContactSDK } from './sdk/ContactSDK'

// 导出类型定义
export type { Contact, ContactGroup, FriendApply, Group, GroupMember } from './sdk/ContactSDK'

// 导出服务接口类型
export type {
  Contact as ContactInterface,
  ContactDetail,
  ContactGroup as ContactGroupInterface,
  FriendApply as FriendApplyInterface,
  Group as GroupInterface,
  GroupDetail,
  GroupMember as GroupMemberInterface,
  GroupNotice,
  GroupVote,
  CreateContactRequest,
  UpdateContactRequest,
  CreateContactGroupRequest,
  UpdateContactGroupRequest,
  CreateFriendApplyRequest,
  HandleFriendApplyRequest,
  CreateGroupRequest,
  UpdateGroupRequest,
  InviteGroupMemberRequest,
  RemoveGroupMemberRequest,
  UpdateGroupMemberRequest,
  CreateGroupNoticeRequest,
  CreateGroupVoteRequest,
  VoteGroupVoteRequest,
  SearchContactRequest,
  SearchGroupRequest,
  P2PContact,
  P2PGroup,
  P2PGroupMember
} from './services/ContactService'

export type {
  Group as GroupServiceInterface,
  GroupDetail as GroupDetailInterface,
  GroupMember as GroupServiceMemberInterface,
  GroupNotice as GroupNoticeInterface,
  GroupVote as GroupVoteInterface
} from './services/GroupService'

// 插件信息
export const PLUGIN_INFO = {
  id: 'contact-plugin',
  name: '通讯录插件',
  version: '1.0.0',
  description: '提供联系人和群组管理功能',
  author: 'Why Talk Team',
  permissions: ['contacts:read', 'contacts:write', 'groups:read', 'groups:write', 'users:read']
}

// 默认导出插件信息
export default PLUGIN_INFO
