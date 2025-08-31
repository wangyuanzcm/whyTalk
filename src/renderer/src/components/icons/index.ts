// 本地图标组件库
// 替代 @icon-park/vue-next 避免图标导入错误

import { defineComponent, h } from 'vue'

/**
 * 创建SVG图标组件
 * @param name 图标名称
 * @param path SVG路径数据
 * @returns Vue组件
 */
function createIcon(name: string, path: string | string[]) {
  return defineComponent({
    name,
    props: {
      size: {
        type: [String, Number],
        default: '1em'
      },
      color: {
        type: String,
        default: 'currentColor'
      }
    },
    setup(props) {
      return () => h('svg', {
        width: props.size,
        height: props.size,
        viewBox: '0 0 48 48',
        fill: 'none',
        xmlns: 'http://www.w3.org/2000/svg'
      }, [
        Array.isArray(path) 
          ? path.map((p, index) => h('path', {
              key: index,
              d: p,
              fill: props.color,
              stroke: props.color,
              'stroke-width': '2',
              'stroke-linecap': 'round',
              'stroke-linejoin': 'round'
            }))
          : h('path', {
              d: path,
              fill: props.color,
              stroke: props.color,
              'stroke-width': '2',
              'stroke-linecap': 'round',
              'stroke-linejoin': 'round'
            })
      ])
    }
  })
}

// 图标路径数据（简化版本）
const iconPaths = {
  // 基础图标
  Close: 'M14 14l20 20m-20 0l20-20',
  Add: 'M24 12v24m-12-12h24',
  Delete: 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16',
  Edit: 'M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7m-1.5-9.5a2.121 2.121 0 113 3L12 20l-4 1 1-4 8.5-8.5z',
  Save: 'M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z',
  Download: 'M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4m11-4l-4 4m0 0l-4-4m4 4V3',
  Upload: 'M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4m11-4l-4-4m0 0l-4 4m4 0v12',
  Refresh: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
  Copy: 'M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3',
  
  // 设置相关
  Setting: 'M12 15a3 3 0 100-6 3 3 0 000 6z M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z',
  SettingTwo: 'M12 15a3 3 0 100-6 3 3 0 000 6z M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z',
  Tool: 'M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.77 3.77z',
  
  // 主题相关
  Theme: 'M12 3v1m0 16v1m9-9h-1M5 12H4m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z',
  Moon: 'M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z',
  Sun: 'M12 3v1m0 16v1m9-9h-1M5 12H4m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z',
  Monitor: 'M20 3H4a2 2 0 00-2 2v11a2 2 0 002 2h16a2 2 0 002-2V5a2 2 0 00-2-2zM8 21h8',
  
  // 应用相关
  Application: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z M3 7l9 6 9-6',
  Play: 'M8 5v14l11-7z',
  
  // 网络相关
  Network: 'M16 3C8.8 3 3 8.8 3 16s5.8 13 13 13 13-5.8 13-13S23.2 3 16 3zM2 16h6m8 0h6M6.8 6.8l4.2 4.2m4.2 4.2l4.2 4.2M6.8 25.2l4.2-4.2m4.2-4.2l4.2-4.2',
  
  // 文件相关
  FolderOpen: 'M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z',
  FolderDownload: 'M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z M12 15l3-3m-6 0l3 3m0 0v-6',
  
  // 用户相关
  User: 'M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M12 11a4 4 0 100-8 4 4 0 000 8z',
  Male: 'M10 14a4 4 0 100-8 4 4 0 000 8z M21 3l-6 6m0 0V4m0 5h5',
  Female: 'M12 16a4 4 0 100-8 4 4 0 000 8z M12 16v6m-3-2h6',
  
  // 状态相关
  CheckOne: 'M20 6L9 17l-5-5',
  CloseOne: 'M18 6L6 18M6 6l12 12',
  Warning: 'M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z M12 9v4m0 4h.01',
  Info: 'M12 16v-4m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  
  // 其他
  More: 'M12 13a1 1 0 100-2 1 1 0 000 2z M19 13a1 1 0 100-2 1 1 0 000 2z M5 13a1 1 0 100-2 1 1 0 000 2z',
  Drag: 'M9 9h6v6H9z M3 3h6v6H3z M15 15h6v6h-6z M3 15h6v6H3z M15 3h6v6h-6z',
  Link: 'M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71 M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71',
  LinkThree: 'M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71 M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71',
  
  // 数据库相关
  DatabaseSetting: 'M12 8c-4.97 0-9 1.79-9 4s4.03 4 9 4 9-1.79 9-4-4.03-4-9-4z M3 12v7c0 2.21 4.03 4 9 4s9-1.79 9-4v-7 M3 17c0 2.21 4.03 4 9 4s9-1.79 9-4',
  
  // 云相关
  CloudSync: 'M17 21v-2a1 1 0 00-1-1H5a2 2 0 01-2-2V8a2 2 0 012-2h2.93a2 2 0 001.66-.9l.82-1.2A2 2 0 0111.07 3H20a2 2 0 012 2v11a2 2 0 01-2 2h-1a1 1 0 00-1 1v2z M12 15l3-3m-6 0l3 3m0 0v-6',
  CloudDownload: 'M17 21v-2a1 1 0 00-1-1H5a2 2 0 01-2-2V8a2 2 0 012-2h2.93a2 2 0 001.66-.9l.82-1.2A2 2 0 0111.07 3H20a2 2 0 012 2v11a2 2 0 01-2 2h-1a1 1 0 00-1 1v2z M12 15l3-3m-6 0l3 3m0 0v-6',
  
  // 时间相关
  Time: 'M12 6v6l4 2 M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  History: 'M3 12a9 9 0 019-9 9.75 9.75 0 016.74 2.74L21 8M3 3v5h5 M12 7v5l4 2',
  
  // 更新相关
  Update: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15 M12 6v6l4 2',
  
  // 插件相关
  Plug: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
  
  // 其他
  TestTube: 'M7 2v11a5 5 0 005 5 5 5 0 005-5V2 M7 2h10 M14 16h.01 M13 13h.01 M10 10h.01',
  PreviewOpen: 'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 100 6 3 3 0 000-6z',
  NetworkDrive: 'M22 12h-4l-3 9L9 3l-3 9H2',
  Remind: 'M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 01-3.46 0',
  Team: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M23 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75 M13 7a4 4 0 11-8 0 4 4 0 018 0z',
  
  // 社交和外部链接
  Github: 'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22',
  Mail: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6',
  Globe: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9',
  
  // 社交相关
  Message: 'M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z',
  People: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M23 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75 M13 7a4 4 0 11-8 0 4 4 0 018 0z',
  
  // 书签相关
  BookmarkOne: 'M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z',
  
  // 移动相关
  ToTop: 'M17 11l-5-5-5 5 M12 18V6',
  DoubleDown: 'M7 13l5 5 5-5 M7 6l5 5 5-5',
  
  // 编辑相关
  Undo: 'M3 7v6h4m-4-6a9 9 0 1115.303 6.844L21 15',
  Redo: 'M21 7v6h-4m4-6a9 9 0 10-15.303 6.844L3 15',
  UploadOne: 'M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4 M17 8l-5-5-5 5 M12 3v12',
  RefreshOne: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
  
  // 加载相关
  LoadingTwo: 'M12 2v4 M12 18v4 M4.93 4.93l2.83 2.83 M16.24 16.24l2.83 2.83 M2 12h4 M18 12h4 M4.93 19.07l2.83-2.83 M16.24 7.76l2.83-2.83',
  
  // 其他
  Settings: 'M12 15a3 3 0 100-6 3 3 0 000 6z M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z',
  Heart: 'M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z',
  Star: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
  Code: 'M16 18l6-6-6-6 M8 6l-6 6 6 6',
  LicenseOne: 'M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8'
}

// 导出所有图标组件
export const Close = createIcon('Close', iconPaths.Close)
export const Add = createIcon('Add', iconPaths.Add)
export const Delete = createIcon('Delete', iconPaths.Delete)
export const Edit = createIcon('Edit', iconPaths.Edit)
export const Save = createIcon('Save', iconPaths.Save)
export const Download = createIcon('Download', iconPaths.Download)
export const Upload = createIcon('Upload', iconPaths.Upload)
export const Refresh = createIcon('Refresh', iconPaths.Refresh)
export const Copy = createIcon('Copy', iconPaths.Copy)
export const Setting = createIcon('Setting', iconPaths.Setting)
export const SettingTwo = createIcon('SettingTwo', iconPaths.SettingTwo)
export const Tool = createIcon('Tool', iconPaths.Tool)
export const Theme = createIcon('Theme', iconPaths.Theme)
export const Moon = createIcon('Moon', iconPaths.Moon)
export const Sun = createIcon('Sun', iconPaths.Sun)
export const Monitor = createIcon('Monitor', iconPaths.Monitor)
export const Application = createIcon('Application', iconPaths.Application)
export const Play = createIcon('Play', iconPaths.Play)
export const Network = createIcon('Network', iconPaths.Network)
export const FolderOpen = createIcon('FolderOpen', iconPaths.FolderOpen)
export const FolderDownload = createIcon('FolderDownload', iconPaths.FolderDownload)
export const User = createIcon('User', iconPaths.User)
export const Male = createIcon('Male', iconPaths.Male)
export const Female = createIcon('Female', iconPaths.Female)
export const CheckOne = createIcon('CheckOne', iconPaths.CheckOne)
export const CloseOne = createIcon('CloseOne', iconPaths.CloseOne)
export const Warning = createIcon('Warning', iconPaths.Warning)
export const Info = createIcon('Info', iconPaths.Info)
export const More = createIcon('More', iconPaths.More)
export const Drag = createIcon('Drag', iconPaths.Drag)
export const Link = createIcon('Link', iconPaths.Link)
export const LinkThree = createIcon('LinkThree', iconPaths.LinkThree)
export const DatabaseSetting = createIcon('DatabaseSetting', iconPaths.DatabaseSetting)
export const CloudSync = createIcon('CloudSync', iconPaths.CloudSync)
export const CloudDownload = createIcon('CloudDownload', iconPaths.CloudDownload)
export const Time = createIcon('Time', iconPaths.Time)
export const History = createIcon('History', iconPaths.History)
export const Update = createIcon('Update', iconPaths.Update)
export const Plug = createIcon('Plug', iconPaths.Plug)
export const TestTube = createIcon('TestTube', iconPaths.TestTube)
export const PreviewOpen = createIcon('PreviewOpen', iconPaths.PreviewOpen)
export const NetworkDrive = createIcon('NetworkDrive', iconPaths.NetworkDrive)
export const Remind = createIcon('Remind', iconPaths.Remind)
export const Team = createIcon('Team', iconPaths.Team)
export const Message = createIcon('Message', iconPaths.Message)
export const People = createIcon('People', iconPaths.People)
export const BookmarkOne = createIcon('BookmarkOne', iconPaths.BookmarkOne)
export const ToTop = createIcon('ToTop', iconPaths.ToTop)
export const DoubleDown = createIcon('DoubleDown', iconPaths.DoubleDown)
export const Undo = createIcon('Undo', iconPaths.Undo)
export const Redo = createIcon('Redo', iconPaths.Redo)
export const UploadOne = createIcon('UploadOne', iconPaths.UploadOne)
export const RefreshOne = createIcon('RefreshOne', iconPaths.RefreshOne)
export const LoadingTwo = createIcon('LoadingTwo', iconPaths.LoadingTwo)
export const Settings = createIcon('Settings', iconPaths.Settings)
export const Heart = createIcon('Heart', iconPaths.Heart)
export const Star = createIcon('Star', iconPaths.Star)
export const Code = createIcon('Code', iconPaths.Code)
export const LicenseOne = createIcon('LicenseOne', iconPaths.LicenseOne)
export const Github = createIcon('Github', iconPaths.Github)
export const Mail = createIcon('Mail', iconPaths.Mail)
export const Globe = createIcon('Globe', iconPaths.Globe)

// 默认导出所有图标
export default {
  Close,
  Add,
  Delete,
  Edit,
  Save,
  Download,
  Upload,
  Refresh,
  Copy,
  Setting,
  SettingTwo,
  Tool,
  Theme,
  Moon,
  Sun,
  Monitor,
  Application,
  Play,
  Network,
  FolderOpen,
  FolderDownload,
  User,
  Male,
  Female,
  CheckOne,
  CloseOne,
  Warning,
  Info,
  More,
  Drag,
  Link,
  LinkThree,
  DatabaseSetting,
  CloudSync,
  CloudDownload,
  Time,
  History,
  Update,
  Plug,
  TestTube,
  PreviewOpen,
  NetworkDrive,
  Remind,
  Team,
  Message,
  People,
  BookmarkOne,
  ToTop,
  DoubleDown,
  Undo,
  Redo,
  UploadOne,
  RefreshOne,
  LoadingTwo,
  Settings,
  Heart,
  Star,
  Code,
  LicenseOne,
  Github,
  Mail,
  Globe
}