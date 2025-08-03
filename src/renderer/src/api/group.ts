import { createIpcApi } from './ipc-request.ts'

export const ServGroupList = createIpcApi('/api/v1/group/list')

export const ServGroupOvertList = createIpcApi('/api/v1/group/overt-list')

export const ServGroupDetail = createIpcApi('/api/v1/group/detail')

export const ServGroupCreate = createIpcApi('/api/v1/group/create')

export const ServeGroupUpdate = createIpcApi('/api/v1/group/update')

export const ServGroupInvite = createIpcApi('/api/v1/group/invite')

export const ServGroupMemberRemove = createIpcApi('/api/v1/group/member/remove')

export const ServGroupDismiss = createIpcApi('/api/v1/group/dismiss')

export const ServGroupMute = createIpcApi('/api/v1/group/mute')

export const ServGroupOvert = createIpcApi('/api/v1/group/overt')

export const ServGroupSecede = createIpcApi('/api/v1/group/secede')

export const ServGroupMemberUpdateRemark = createIpcApi('/api/v1/group/member/update-remark')

export const ServGroupInviteList = createIpcApi('/api/v1/group/invite-list')

export const ServGroupMemberList = createIpcApi('/api/v1/group/member/list')

export const ServGroupNoticeList = createIpcApi('/api/v1/group/notice/list')

export const ServGroupNoticeUpdate = createIpcApi('/api/v1/group/notice/edit')

export const ServGroupApplyList = createIpcApi('/api/v1/group/apply/list')

export const ServGroupApplyAll = createIpcApi('/api/v1/group/apply/all')

export const ServGroupApplyDecline = createIpcApi('/api/v1/group/apply/decline')

export const ServGroupApplyAgree = createIpcApi('/api/v1/group/apply/agree')

export const ServGroupApplyCreate = createIpcApi('/api/v1/group/apply/create')

export const ServGroupApplyUnread = createIpcApi('/api/v1/group/apply/unread')

export const ServGroupTransfer = createIpcApi('/api/v1/group/transfer')

export const ServGroupAssignAdmin = createIpcApi('/api/v1/group/assign-admin')

export const ServGroupMemberMute = createIpcApi('/api/v1/group/member-mute')

export const ServGroupVoteCreate = createIpcApi('/api/v1/group/vote/create')

export const ServGroupVoteSubmit = createIpcApi('/api/v1/group/vote/submit')

export const ServGroupVoteDetail = createIpcApi('/api/v1/group/vote/detail')
