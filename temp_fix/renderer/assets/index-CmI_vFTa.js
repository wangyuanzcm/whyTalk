import {
  i as isBrowser,
  c as cloneArrayBuffer,
  S as Symbol$1,
  a as cloneTypedArray,
  b as isObjectLike,
  g as getTag,
  d as baseUnary,
  n as nodeUtil,
  e as isObject,
  f as isBuffer,
  h as cloneBuffer,
  j as initCloneObject,
  k as Stack,
  l as getAllKeys,
  m as isArray,
  o as assignValue,
  p as baseIsEqual,
  q as derived,
  r as c,
  s as cB,
  t as defineComponent,
  u as h,
  v as mergeProps,
  w as repeat,
  F as Fragment,
  x as useConfig,
  y as useTheme,
  z as computed,
  A as createKey,
  B as pxfy,
  C as createIpcApi,
  D as defineStore,
  E as ServTalkMessageSend,
  G as uploadMultipart,
  I as IconWrapper,
  H as createVNode,
  J as ServGroupSecede,
  K as ServGroupDismiss,
  L as createElementBlock,
  M as createBaseVNode,
  N as NIcon,
  O as unref,
  P as withDirectives,
  Q as vShow,
  R as toDisplayString,
  _ as __unplugin_components_3,
  T as withCtx,
  U as openBlock,
  V as createTextVNode,
  W as _export_sfc,
  X as commonjsGlobal,
  Y as getDefaultExportFromCjs,
  Z as merge,
  $ as mergeModels,
  a0 as useModel,
  a1 as ref,
  a2 as onMounted,
  a3 as onUnmounted,
  a4 as reactive,
  a5 as createBlock,
  a6 as __unplugin_components_3$1,
  a7 as __unplugin_components_1,
  a8 as createCommentVNode,
  a9 as renderList,
  aa as Button,
  ab as useEditorStore,
  ac as normalizeClass,
  ad as isRef,
  ae as uploadFile,
  af as useEditorDraftStore,
  ag as markRaw,
  ah as watch,
  ai as defaultAvatar,
  aj as useTemplateRef,
  ak as ChatMsgTypeImage,
  al as ChatMsgTypeAudio,
  am as ChatMsgTypeVideo,
  an as ChatMsgTypeFile,
  ao as ChatMsgTypeForward,
  ap as ChatMsgTypeCode,
  aq as ChatMsgTypeLocation,
  ar as ChatMsgTypeVote,
  as as ServTalkHistoryRecords,
  at as useTalkStore,
  au as useSettingsStore,
  av as useDialogueStore,
  aw as bus,
  ax as ServGroupVoteCreate,
  ay as p2pConnect,
  az as ServGroupNoticeUpdate,
  aA as ServGroupDetail,
  aB as ServTalkRecords,
  aC as resolveComponent,
  aD as resolveDirective,
  aE as ServContactList,
  aF as ServGroupList,
  aG as useUserStore,
  aH as TalkModeEnum,
  aI as useRouter,
  aJ as ServContactOnlineStatus,
  aK as beautifyTime,
  aL as withModifiers,
  aM as NTag,
  aN as ServTalkTopping,
  aO as Remind,
  aP as ServTalkDisturb,
  aQ as ServTalkDelete,
  aR as onBeforeRouteUpdate,
  aS as ServTalkClearUnread,
  aT as getCacheIndexName,
  aU as formatTalkItem,
  aV as resolveDynamicComponent
} from './index-CP-MMhae.js'
import { C as ChatPlus, f as formatChatMessage } from './render-C5dC9sUK.js'
import { P as PeoplePlusOne } from './PeoplePlusOne-BIXCI58o.js'
import { M as More } from './More-9eOq9UNW.js'
import {
  u as useEventBus,
  P as P2PMessageService,
  a as useContact,
  _ as _sfc_main$n
} from './P2PMessageService-Cygfscl3.js'
import {
  t as throttle,
  c as clipboard,
  h as htmlDecode,
  a as clipboardImage,
  r as renderIcon
} from './common-CbVb2jfY.js'
import {
  g as getImageInfo,
  a as getVideoImage,
  b as getFilenameFromUrl,
  d as downloadImage
} from './file-DJ5u2-kO.js'
import {
  _ as __unplugin_components_3$2,
  a as __unplugin_components_7
} from './FormItem-BYV9eAmm.js'
import {
  _ as __unplugin_components_2,
  a as __unplugin_components_0$1
} from './RadioGroup-SjOLBydD.js'
import { _ as __unplugin_components_1$1 } from './Input-9scKSWkl.js'
import { I as IconDelete } from './Delete-BuJN8hI8.js'
import { e as emojis } from './emojis-BkYjNAGY.js'
import { U as UploadOne } from './UploadOne-CHKc3agb.js'
import { _ as __unplugin_components_2$1 } from './Popselect-t8R6dlXg.js'
import { u as useInject, E as EditorConst, S as SessionConst } from './useInject-KwKquBHc.js'
import {
  F as FolderUpload,
  H as History$1,
  _ as __unplugin_components_4,
  S as Share,
  u as useCommonContextMenu
} from './useCommonContextMenu-wWltracD.js'
import {
  _ as __unplugin_components_0$2,
  a as __unplugin_components_3$3,
  G as GroupLaunch,
  b as GroupPanel
} from './GroupPanel-Cwl1dvT_.js'
import { M as MdPreview, E as Editor$3 } from './index-iKnyGKVZ.js'
import { N as NEmpty } from './Empty-DXO3k6Nm.js'
import { f as fileFormatSize } from './string-g9b8veVd.js'
import { _ as __unplugin_components_0$3 } from './Progress-CM-b0lRX.js'
import { S as Search } from './Search-ywW15yaZ.js'
import { _ as __unplugin_components_3$4, a as __unplugin_components_2$2 } from './Tabs-Bo9TWhMD.js'
import { _ as __unplugin_components_1$2 } from './VirtualList-5-2Ch8zp.js'
import { _ as __unplugin_components_1$3 } from './Checkbox-B683huVH.js'
import { C as Close } from './Close-BsKkRN62.js'
import { _ as __unplugin_components_2$3 } from './Dropdown-BaOl703U.js'
import { P as Plus } from './Plus-DQPyk9lQ.js'
import './Copy-PmY75sEQ.js'
import './Undo-DAYaSkZ9.js'
import './index-88uWzgFD.js'
import './use-locale-sP6dOhdq.js'
import './FocusDetector-ChBbaXut.js'
import './VirtualList-B9WzfpoZ.js'
import './SendOne-Ck-Fsq0E.js'
import './AvatarCropper-B00flI7D.js'
import './CheckSmall-D9Jdj4Aw.js'
import './Popconfirm-WQCbiWo_.js'
import './Switch-Bg2nTzU7.js'
let houdiniRegistered = false
function useHoudini() {
  if (!isBrowser) return
  if (!window.CSS) return
  if (!houdiniRegistered) {
    houdiniRegistered = true
    if ('registerProperty' in (window === null || window === void 0 ? void 0 : window.CSS)) {
      try {
        CSS.registerProperty({
          name: '--n-color-start',
          syntax: '<color>',
          inherits: false,
          initialValue: '#0000'
        })
        CSS.registerProperty({
          name: '--n-color-end',
          syntax: '<color>',
          inherits: false,
          initialValue: '#0000'
        })
      } catch (_a) {}
    }
  }
}
function arrayEach(array, iteratee) {
  var index2 = -1,
    length = array == null ? 0 : array.length
  while (++index2 < length) {
    if (iteratee(array[index2], index2, array) === false) {
      break
    }
  }
  return array
}
var objectProto = Object.prototype
var hasOwnProperty = objectProto.hasOwnProperty
function initCloneArray(array) {
  var length = array.length,
    result = new array.constructor(length)
  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
    result.index = array.index
    result.input = array.input
  }
  return result
}
function cloneDataView(dataView, isDeep) {
  var buffer = cloneArrayBuffer(dataView.buffer)
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength)
}
var reFlags = /\w*$/
function cloneRegExp(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp))
  result.lastIndex = regexp.lastIndex
  return result
}
var symbolProto = Symbol$1 ? Symbol$1.prototype : void 0,
  symbolValueOf = symbolProto ? symbolProto.valueOf : void 0
function cloneSymbol(symbol) {
  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {}
}
var boolTag$1 = '[object Boolean]',
  dateTag$1 = '[object Date]',
  mapTag$2 = '[object Map]',
  numberTag$1 = '[object Number]',
  regexpTag$1 = '[object RegExp]',
  setTag$2 = '[object Set]',
  stringTag$1 = '[object String]',
  symbolTag$1 = '[object Symbol]'
var arrayBufferTag$1 = '[object ArrayBuffer]',
  dataViewTag$1 = '[object DataView]',
  float32Tag$1 = '[object Float32Array]',
  float64Tag$1 = '[object Float64Array]',
  int8Tag$1 = '[object Int8Array]',
  int16Tag$1 = '[object Int16Array]',
  int32Tag$1 = '[object Int32Array]',
  uint8Tag$1 = '[object Uint8Array]',
  uint8ClampedTag$1 = '[object Uint8ClampedArray]',
  uint16Tag$1 = '[object Uint16Array]',
  uint32Tag$1 = '[object Uint32Array]'
function initCloneByTag(object, tag, isDeep) {
  var Ctor = object.constructor
  switch (tag) {
    case arrayBufferTag$1:
      return cloneArrayBuffer(object)
    case boolTag$1:
    case dateTag$1:
      return new Ctor(+object)
    case dataViewTag$1:
      return cloneDataView(object)
    case float32Tag$1:
    case float64Tag$1:
    case int8Tag$1:
    case int16Tag$1:
    case int32Tag$1:
    case uint8Tag$1:
    case uint8ClampedTag$1:
    case uint16Tag$1:
    case uint32Tag$1:
      return cloneTypedArray(object, isDeep)
    case mapTag$2:
      return new Ctor()
    case numberTag$1:
    case stringTag$1:
      return new Ctor(object)
    case regexpTag$1:
      return cloneRegExp(object)
    case setTag$2:
      return new Ctor()
    case symbolTag$1:
      return cloneSymbol(object)
  }
}
var mapTag$1 = '[object Map]'
function baseIsMap(value) {
  return isObjectLike(value) && getTag(value) == mapTag$1
}
var nodeIsMap = nodeUtil && nodeUtil.isMap
var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap
var setTag$1 = '[object Set]'
function baseIsSet(value) {
  return isObjectLike(value) && getTag(value) == setTag$1
}
var nodeIsSet = nodeUtil && nodeUtil.isSet
var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet
var CLONE_DEEP_FLAG$1 = 1
var argsTag = '[object Arguments]',
  arrayTag = '[object Array]',
  boolTag = '[object Boolean]',
  dateTag = '[object Date]',
  errorTag = '[object Error]',
  funcTag = '[object Function]',
  genTag = '[object GeneratorFunction]',
  mapTag = '[object Map]',
  numberTag = '[object Number]',
  objectTag = '[object Object]',
  regexpTag = '[object RegExp]',
  setTag = '[object Set]',
  stringTag = '[object String]',
  symbolTag = '[object Symbol]',
  weakMapTag = '[object WeakMap]'
var arrayBufferTag = '[object ArrayBuffer]',
  dataViewTag = '[object DataView]',
  float32Tag = '[object Float32Array]',
  float64Tag = '[object Float64Array]',
  int8Tag = '[object Int8Array]',
  int16Tag = '[object Int16Array]',
  int32Tag = '[object Int32Array]',
  uint8Tag = '[object Uint8Array]',
  uint8ClampedTag = '[object Uint8ClampedArray]',
  uint16Tag = '[object Uint16Array]',
  uint32Tag = '[object Uint32Array]'
var cloneableTags = {}
cloneableTags[argsTag] =
  cloneableTags[arrayTag] =
  cloneableTags[arrayBufferTag] =
  cloneableTags[dataViewTag] =
  cloneableTags[boolTag] =
  cloneableTags[dateTag] =
  cloneableTags[float32Tag] =
  cloneableTags[float64Tag] =
  cloneableTags[int8Tag] =
  cloneableTags[int16Tag] =
  cloneableTags[int32Tag] =
  cloneableTags[mapTag] =
  cloneableTags[numberTag] =
  cloneableTags[objectTag] =
  cloneableTags[regexpTag] =
  cloneableTags[setTag] =
  cloneableTags[stringTag] =
  cloneableTags[symbolTag] =
  cloneableTags[uint8Tag] =
  cloneableTags[uint8ClampedTag] =
  cloneableTags[uint16Tag] =
  cloneableTags[uint32Tag] =
    true
cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false
function baseClone(value, bitmask, customizer, key, object, stack) {
  var result,
    isDeep = bitmask & CLONE_DEEP_FLAG$1
  if (result !== void 0) {
    return result
  }
  if (!isObject(value)) {
    return value
  }
  var isArr = isArray(value)
  if (isArr) {
    result = initCloneArray(value)
  } else {
    var tag = getTag(value),
      isFunc = tag == funcTag || tag == genTag
    if (isBuffer(value)) {
      return cloneBuffer(value, isDeep)
    }
    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
      result = isFunc ? {} : initCloneObject(value)
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {}
      }
      result = initCloneByTag(value, tag, isDeep)
    }
  }
  stack || (stack = new Stack())
  var stacked = stack.get(value)
  if (stacked) {
    return stacked
  }
  stack.set(value, result)
  if (isSet(value)) {
    value.forEach(function (subValue) {
      result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack))
    })
  } else if (isMap(value)) {
    value.forEach(function (subValue, key2) {
      result.set(key2, baseClone(subValue, bitmask, customizer, key2, value, stack))
    })
  }
  var keysFunc = getAllKeys
  var props = isArr ? void 0 : keysFunc(value)
  arrayEach(props || value, function (subValue, key2) {
    if (props) {
      key2 = subValue
      subValue = value[key2]
    }
    assignValue(result, key2, baseClone(subValue, bitmask, customizer, key2, value, stack))
  })
  return result
}
var CLONE_DEEP_FLAG = 1,
  CLONE_SYMBOLS_FLAG = 4
function cloneDeep(value) {
  return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG)
}
function isEqual$1(value, other) {
  return baseIsEqual(value, other)
}
function self$1(vars) {
  const { heightSmall, heightMedium, heightLarge, borderRadius } = vars
  return {
    color: '#eee',
    colorEnd: '#ddd',
    borderRadius,
    heightSmall,
    heightMedium,
    heightLarge
  }
}
const skeletonLight = {
  common: derived,
  self: self$1
}
const style = c([
  cB(
    'skeleton',
    `
 height: 1em;
 width: 100%;
 transition:
 --n-color-start .3s var(--n-bezier),
 --n-color-end .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 animation: 2s skeleton-loading infinite cubic-bezier(0.36, 0, 0.64, 1);
 background-color: var(--n-color-start);
 `
  ),
  c(
    '@keyframes skeleton-loading',
    `
 0% {
 background: var(--n-color-start);
 }
 40% {
 background: var(--n-color-end);
 }
 80% {
 background: var(--n-color-start);
 }
 100% {
 background: var(--n-color-start);
 }
 `
  )
])
const skeletonProps = Object.assign(Object.assign({}, useTheme.props), {
  text: Boolean,
  round: Boolean,
  circle: Boolean,
  height: [String, Number],
  width: [String, Number],
  size: String,
  repeat: {
    type: Number,
    default: 1
  },
  animated: {
    type: Boolean,
    default: true
  },
  sharp: {
    type: Boolean,
    default: true
  }
})
const __unplugin_components_0 = defineComponent({
  name: 'Skeleton',
  inheritAttrs: false,
  props: skeletonProps,
  setup(props) {
    useHoudini()
    const { mergedClsPrefixRef } = useConfig(props)
    const themeRef = useTheme(
      'Skeleton',
      '-skeleton',
      style,
      skeletonLight,
      props,
      mergedClsPrefixRef
    )
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      style: computed(() => {
        var _a, _b
        const theme = themeRef.value
        const {
          common: { cubicBezierEaseInOut }
        } = theme
        const selfThemeVars = theme.self
        const { color, colorEnd, borderRadius } = selfThemeVars
        let sizeHeight
        const { circle, sharp, round, width, height, size, text, animated } = props
        if (size !== void 0) {
          sizeHeight = selfThemeVars[createKey('height', size)]
        }
        const mergedWidth = circle
          ? (_a = width !== null && width !== void 0 ? width : height) !== null && _a !== void 0
            ? _a
            : sizeHeight
          : width
        const mergedHeight =
          (_b = circle ? (width !== null && width !== void 0 ? width : height) : height) !== null &&
          _b !== void 0
            ? _b
            : sizeHeight
        return {
          display: text ? 'inline-block' : '',
          verticalAlign: text ? '-0.125em' : '',
          borderRadius: circle ? '50%' : round ? '4096px' : sharp ? '' : borderRadius,
          width: typeof mergedWidth === 'number' ? pxfy(mergedWidth) : mergedWidth,
          height: typeof mergedHeight === 'number' ? pxfy(mergedHeight) : mergedHeight,
          animation: !animated ? 'none' : '',
          '--n-bezier': cubicBezierEaseInOut,
          '--n-color-start': color,
          '--n-color-end': colorEnd
        }
      })
    }
  },
  render() {
    const { repeat: repeatProp, style: style2, mergedClsPrefix, $attrs } = this
    const child = h(
      'div',
      mergeProps(
        {
          class: `${mergedClsPrefix}-skeleton`,
          style: style2
        },
        $attrs
      )
    )
    if (repeatProp > 1) {
      return h(
        Fragment,
        null,
        repeat(repeatProp, null).map((_) => [child, '\n'])
      )
    }
    return child
  }
})
const ServUploadInitMultipart = createIpcApi('/api/v1/upload/init-multipart')
function fileSlice(file, uploadId, eachSize) {
  const splitNum = Math.ceil(file.size / eachSize)
  const items = []
  for (let i = 0; i < splitNum; i++) {
    const start = i * eachSize
    const end = Math.min(file.size, start + eachSize)
    items.push({
      blob: file.slice(start, end),
      uploadId,
      splitIndex: i + 1,
      splitNum
    })
  }
  return items
}
const useUploadsStore = defineStore('uploads', {
  state: () => {
    return {
      isShow: false,
      items: []
    }
  },
  getters: {
    successCount: (state) => {
      return state.items.filter((item) => {
        return item.status === 2
      }).length
    }
  },
  actions: {
    close() {
      this.isShow = false
    },
    // 初始化上传
    async initUploadFile(file, talkType, receiverId, username) {
      const { code, data } = await ServUploadInitMultipart({
        file_name: file.name,
        file_size: file.size
      })
      if (code !== 200) throw new Error('Failed to find file split info.')
      const { upload_id, shard_size } = data
      this.items.unshift({
        file,
        talk_type: talkType,
        receiver_id: receiverId,
        upload_id,
        uploadIndex: 0,
        percentage: 0,
        status: 0,
        // 文件上传状态 0:等待上传 1:上传中 2:上传完成 3:网络异常
        files: fileSlice(file, upload_id, shard_size),
        avatar: '',
        username
      })
      this.triggerUpload(upload_id)
      this.isShow = true
    },
    // 获取分片文件数组索引
    findItem(uploadId) {
      return this.items.find((item) => item.upload_id === uploadId)
    },
    // 触发上传
    async triggerUpload(uploadId) {
      const item = this.findItem(uploadId)
      if (!item) return
      item.status = 1
      const fileSlice2 = item.files[item.uploadIndex]
      const { code } = await uploadMultipart(
        fileSlice2.blob,
        fileSlice2.uploadId,
        fileSlice2.splitIndex,
        fileSlice2.splitNum
      )
      item.status = 3
      if (code !== 200) throw new Error('Failed to find file split info.')
      item.uploadIndex++
      if (item.uploadIndex === item.files.length) {
        item.status = 2
        item.percentage = 100
        this.sendUploadMessage(item)
      } else {
        item.percentage = (item.uploadIndex / item.files.length) * 100
        this.triggerUpload(uploadId)
      }
    },
    // 发送上传消息
    sendUploadMessage(item) {
      ServTalkMessageSend({
        type: 'file',
        talk_mode: item.talk_type,
        to_from_id: item.receiver_id,
        body: { upload_id: item.upload_id }
      })
    }
  }
})
const Announcement = IconWrapper('announcement', true, function (props) {
  return createVNode(
    'svg',
    {
      width: props.size,
      height: props.size,
      viewBox: '0 0 48 48',
      fill: 'none'
    },
    [
      createVNode(
        'rect',
        {
          x: '4',
          y: '15',
          width: '40',
          height: '26',
          rx: '2',
          fill: props.colors[1],
          stroke: props.colors[0],
          'stroke-width': props.strokeWidth,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      ),
      createVNode(
        'path',
        {
          d: 'M24 7L16 15H32L24 7Z',
          fill: props.colors[1],
          stroke: props.colors[0],
          'stroke-width': props.strokeWidth,
          'stroke-linecap': props.strokeLinecap,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      ),
      createVNode(
        'path',
        {
          d: 'M12 24H30',
          stroke: props.colors[2],
          'stroke-width': props.strokeWidth,
          'stroke-linecap': props.strokeLinecap,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      ),
      createVNode(
        'path',
        {
          d: 'M12 32H20',
          stroke: props.colors[2],
          'stroke-width': props.strokeWidth,
          'stroke-linecap': props.strokeLinecap,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      )
    ]
  )
})
const ArrowDown = IconWrapper('arrow-down', false, function (props) {
  return createVNode(
    'svg',
    {
      width: props.size,
      height: props.size,
      viewBox: '0 0 48 48',
      fill: 'none'
    },
    [
      createVNode(
        'path',
        {
          d: 'M24 42V6',
          stroke: props.colors[0],
          'stroke-width': props.strokeWidth,
          'stroke-linecap': props.strokeLinecap,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      ),
      createVNode(
        'path',
        {
          d: 'M36 30L24 42L12 30',
          stroke: props.colors[0],
          'stroke-width': props.strokeWidth,
          'stroke-linecap': props.strokeLinecap,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      )
    ]
  )
})
const ArrowUp = IconWrapper('arrow-up', false, function (props) {
  return createVNode(
    'svg',
    {
      width: props.size,
      height: props.size,
      viewBox: '0 0 48 48',
      fill: 'none'
    },
    [
      createVNode(
        'path',
        {
          d: 'M24 6V42',
          stroke: props.colors[0],
          'stroke-width': props.strokeWidth,
          'stroke-linecap': props.strokeLinecap,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      ),
      createVNode(
        'path',
        {
          d: 'M12 18L24 6L36 18',
          stroke: props.colors[0],
          'stroke-width': props.strokeWidth,
          'stroke-linecap': props.strokeLinecap,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      )
    ]
  )
})
const Calendar = IconWrapper('calendar', false, function (props) {
  return createVNode(
    'svg',
    {
      width: props.size,
      height: props.size,
      viewBox: '0 0 48 48',
      fill: 'none'
    },
    [
      createVNode(
        'path',
        {
          d: 'M5 19H43V40C43 41.1046 42.1046 42 41 42H7C5.89543 42 5 41.1046 5 40V19Z',
          fill: props.colors[1],
          stroke: props.colors[0],
          'stroke-width': props.strokeWidth,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      ),
      createVNode(
        'path',
        {
          d: 'M5 9C5 7.89543 5.89543 7 7 7H41C42.1046 7 43 7.89543 43 9V19H5V9Z',
          stroke: props.colors[0],
          'stroke-width': props.strokeWidth,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      ),
      createVNode(
        'path',
        {
          d: 'M16 4V12',
          stroke: props.colors[0],
          'stroke-width': props.strokeWidth,
          'stroke-linecap': props.strokeLinecap,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      ),
      createVNode(
        'path',
        {
          d: 'M32 4V12',
          stroke: props.colors[0],
          'stroke-width': props.strokeWidth,
          'stroke-linecap': props.strokeLinecap,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      ),
      createVNode(
        'path',
        {
          d: 'M28 34H34',
          stroke: props.colors[2],
          'stroke-width': props.strokeWidth,
          'stroke-linecap': props.strokeLinecap,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      ),
      createVNode(
        'path',
        {
          d: 'M14 34H20',
          stroke: props.colors[2],
          'stroke-width': props.strokeWidth,
          'stroke-linecap': props.strokeLinecap,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      ),
      createVNode(
        'path',
        {
          d: 'M28 26H34',
          stroke: props.colors[2],
          'stroke-width': props.strokeWidth,
          'stroke-linecap': props.strokeLinecap,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      ),
      createVNode(
        'path',
        {
          d: 'M14 26H20',
          stroke: props.colors[2],
          'stroke-width': props.strokeWidth,
          'stroke-linecap': props.strokeLinecap,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      )
    ]
  )
})
const CheckCorrect = IconWrapper('check-correct', true, function (props) {
  return createVNode(
    'svg',
    {
      width: props.size,
      height: props.size,
      viewBox: '0 0 48 48',
      fill: 'none'
    },
    [
      createVNode(
        'g',
        {
          'clip-path': 'url(#' + props.id + '3abbe328)'
        },
        [
          createVNode(
            'path',
            {
              d: 'M42 20V39C42 40.6569 40.6569 42 39 42H9C7.34315 42 6 40.6569 6 39V9C6 7.34315 7.34315 6 9 6H30',
              stroke: props.colors[0],
              'stroke-width': props.strokeWidth,
              'stroke-linecap': props.strokeLinecap,
              'stroke-linejoin': props.strokeLinejoin
            },
            null
          ),
          createVNode(
            'path',
            {
              d: 'M16 20L26 28L41 7',
              stroke: props.colors[0],
              'stroke-width': props.strokeWidth,
              'stroke-linecap': props.strokeLinecap,
              'stroke-linejoin': props.strokeLinejoin
            },
            null
          )
        ]
      ),
      createVNode('defs', null, [
        createVNode(
          'clipPath',
          {
            id: props.id + '3abbe328'
          },
          [
            createVNode(
              'rect',
              {
                width: '48',
                height: '48',
                fill: props.colors[2]
              },
              null
            )
          ]
        )
      ])
    ]
  )
})
const Clear = IconWrapper('clear', false, function (props) {
  return createVNode(
    'svg',
    {
      width: props.size,
      height: props.size,
      viewBox: '0 0 48 48',
      fill: 'none'
    },
    [
      createVNode(
        'path',
        {
          'fill-rule': 'evenodd',
          'clip-rule': 'evenodd',
          d: 'M20 5.91406H28V13.9141H43V21.9141H5V13.9141H20V5.91406Z',
          stroke: props.colors[0],
          'stroke-width': props.strokeWidth,
          'stroke-linecap': props.strokeLinecap,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      ),
      createVNode(
        'path',
        {
          d: 'M8 40H40V22H8V40Z',
          fill: props.colors[1],
          stroke: props.colors[0],
          'stroke-width': props.strokeWidth,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      ),
      createVNode(
        'path',
        {
          d: 'M16 39.8976V33.9141',
          stroke: props.colors[2],
          'stroke-width': props.strokeWidth,
          'stroke-linecap': props.strokeLinecap,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      ),
      createVNode(
        'path',
        {
          d: 'M24 39.8977V33.8977',
          stroke: props.colors[2],
          'stroke-width': props.strokeWidth,
          'stroke-linecap': props.strokeLinecap,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      ),
      createVNode(
        'path',
        {
          d: 'M32 39.8976V33.9141',
          stroke: props.colors[2],
          'stroke-width': props.strokeWidth,
          'stroke-linecap': props.strokeLinecap,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      ),
      createVNode(
        'path',
        {
          d: 'M12 40H36',
          stroke: props.colors[0],
          'stroke-width': props.strokeWidth,
          'stroke-linecap': props.strokeLinecap,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      )
    ]
  )
})
const CloseRemind = IconWrapper('close-remind', true, function (props) {
  return createVNode(
    'svg',
    {
      width: props.size,
      height: props.size,
      viewBox: '0 0 48 48',
      fill: 'none'
    },
    [
      createVNode(
        'path',
        {
          d: 'M42 38C42 38 36 33 36 19C36 12.3726 30.6274 7 24 7C21.46 7 19.1042 7.78918 17.1647 9.13571M30 38H6C6 38 11.5692 33.359 11.9765 20.5',
          stroke: props.colors[0],
          'stroke-width': props.strokeWidth,
          'stroke-linecap': props.strokeLinecap,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      ),
      createVNode(
        'path',
        {
          d: 'M18 38L30 38C30 41.3137 27.3137 44 24 44C20.6863 44 18 41.3137 18 38Z',
          stroke: props.colors[0],
          'stroke-width': props.strokeWidth
        },
        null
      ),
      createVNode(
        'path',
        {
          'fill-rule': 'evenodd',
          'clip-rule': 'evenodd',
          d: 'M24 2C21.7909 2 20 3.79086 20 6H28C28 3.79086 26.2091 2 24 2Z',
          fill: props.colors[0]
        },
        null
      ),
      createVNode(
        'path',
        {
          d: 'M7 6.5L41 44.5',
          stroke: props.colors[0],
          'stroke-width': props.strokeWidth,
          'stroke-linecap': props.strokeLinecap,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      )
    ]
  )
})
const EditTwo = IconWrapper('edit-two', true, function (props) {
  return createVNode(
    'svg',
    {
      width: props.size,
      height: props.size,
      viewBox: '0 0 48 48',
      fill: 'none'
    },
    [
      createVNode(
        'path',
        {
          d: 'M42 26V40C42 41.1046 41.1046 42 40 42H8C6.89543 42 6 41.1046 6 40V8C6 6.89543 6.89543 6 8 6L22 6',
          stroke: props.colors[0],
          'stroke-width': props.strokeWidth,
          'stroke-linecap': props.strokeLinecap,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      ),
      createVNode(
        'path',
        {
          d: 'M14 26.7199V34H21.3172L42 13.3081L34.6951 6L14 26.7199Z',
          fill: props.colors[1],
          stroke: props.colors[0],
          'stroke-width': props.strokeWidth,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      )
    ]
  )
})
const Editor$2 = IconWrapper('editor', true, function (props) {
  return createVNode(
    'svg',
    {
      width: props.size,
      height: props.size,
      viewBox: '0 0 48 48',
      fill: 'none'
    },
    [
      createVNode(
        'path',
        {
          d: 'M40 33V42C40 43.1046 39.1046 44 38 44H31.5',
          stroke: props.colors[0],
          'stroke-width': props.strokeWidth,
          'stroke-linecap': props.strokeLinecap,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      ),
      createVNode(
        'path',
        {
          d: 'M40 16V6C40 4.89543 39.1046 4 38 4H10C8.89543 4 8 4.89543 8 6V42C8 43.1046 8.89543 44 10 44H16',
          stroke: props.colors[0],
          'stroke-width': props.strokeWidth,
          'stroke-linecap': props.strokeLinecap,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      ),
      createVNode(
        'path',
        {
          d: 'M16 16H30',
          stroke: props.colors[0],
          'stroke-width': props.strokeWidth,
          'stroke-linecap': props.strokeLinecap
        },
        null
      ),
      createVNode(
        'path',
        {
          d: 'M23 44L40 23',
          stroke: props.colors[0],
          'stroke-width': props.strokeWidth,
          'stroke-linecap': props.strokeLinecap
        },
        null
      ),
      createVNode(
        'path',
        {
          d: 'M16 24H24',
          stroke: props.colors[0],
          'stroke-width': props.strokeWidth,
          'stroke-linecap': props.strokeLinecap
        },
        null
      )
    ]
  )
})
const IdCard = IconWrapper('id-card', true, function (props) {
  return createVNode(
    'svg',
    {
      width: props.size,
      height: props.size,
      viewBox: '0 0 48 48',
      fill: 'none'
    },
    [
      createVNode(
        'path',
        {
          d: 'M42 8H6C4.89543 8 4 8.89543 4 10V38C4 39.1046 4.89543 40 6 40H42C43.1046 40 44 39.1046 44 38V10C44 8.89543 43.1046 8 42 8Z',
          fill: props.colors[1],
          stroke: props.colors[0],
          'stroke-width': props.strokeWidth,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      ),
      createVNode(
        'path',
        {
          d: 'M36 16H28V24H36V16Z',
          fill: props.colors[3],
          stroke: props.colors[2],
          'stroke-width': props.strokeWidth,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      ),
      createVNode(
        'path',
        {
          d: 'M12 32H36',
          stroke: props.colors[2],
          'stroke-width': props.strokeWidth,
          'stroke-linecap': props.strokeLinecap,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      ),
      createVNode(
        'path',
        {
          d: 'M12 16H18',
          stroke: props.colors[2],
          'stroke-width': props.strokeWidth,
          'stroke-linecap': props.strokeLinecap,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      ),
      createVNode(
        'path',
        {
          d: 'M12 24H18',
          stroke: props.colors[2],
          'stroke-width': props.strokeWidth,
          'stroke-linecap': props.strokeLinecap,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      )
    ]
  )
})
const MenuFoldOne = IconWrapper('menu-fold-one', true, function (props) {
  return createVNode(
    'svg',
    {
      width: props.size,
      height: props.size,
      viewBox: '0 0 48 48',
      fill: 'none'
    },
    [
      createVNode(
        'path',
        {
          d: 'M8 10.5H40',
          stroke: props.colors[0],
          'stroke-width': props.strokeWidth,
          'stroke-linecap': props.strokeLinecap,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      ),
      createVNode(
        'path',
        {
          d: 'M24 19.5H40',
          stroke: props.colors[0],
          'stroke-width': props.strokeWidth,
          'stroke-linecap': props.strokeLinecap,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      ),
      createVNode(
        'path',
        {
          d: 'M24 28.5H40',
          stroke: props.colors[0],
          'stroke-width': props.strokeWidth,
          'stroke-linecap': props.strokeLinecap,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      ),
      createVNode(
        'path',
        {
          d: 'M8 37.5H40',
          stroke: props.colors[0],
          'stroke-width': props.strokeWidth,
          'stroke-linecap': props.strokeLinecap,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      ),
      createVNode(
        'path',
        {
          d: 'M8 19L16 24L8 29V19Z',
          fill: props.colors[1],
          stroke: props.colors[0],
          'stroke-width': props.strokeWidth,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      )
    ]
  )
})
const MenuUnfoldOne = IconWrapper('menu-unfold-one', true, function (props) {
  return createVNode(
    'svg',
    {
      width: props.size,
      height: props.size,
      viewBox: '0 0 48 48',
      fill: 'none'
    },
    [
      createVNode(
        'path',
        {
          d: 'M8 10.5H40',
          stroke: props.colors[0],
          'stroke-width': props.strokeWidth,
          'stroke-linecap': props.strokeLinecap,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      ),
      createVNode(
        'path',
        {
          d: 'M24 19.5H40',
          stroke: props.colors[0],
          'stroke-width': props.strokeWidth,
          'stroke-linecap': props.strokeLinecap,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      ),
      createVNode(
        'path',
        {
          d: 'M24 28.5H40',
          stroke: props.colors[0],
          'stroke-width': props.strokeWidth,
          'stroke-linecap': props.strokeLinecap,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      ),
      createVNode(
        'path',
        {
          d: 'M8 37.5H40',
          stroke: props.colors[0],
          'stroke-width': props.strokeWidth,
          'stroke-linecap': props.strokeLinecap,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      ),
      createVNode(
        'path',
        {
          d: 'M16 19L8 24L16 29V19Z',
          fill: props.colors[1],
          stroke: props.colors[0],
          'stroke-width': props.strokeWidth,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      )
    ]
  )
})
const Pic = IconWrapper('pic', true, function (props) {
  return createVNode(
    'svg',
    {
      width: props.size,
      height: props.size,
      viewBox: '0 0 48 48',
      fill: 'none'
    },
    [
      createVNode(
        'path',
        {
          'fill-rule': 'evenodd',
          'clip-rule': 'evenodd',
          d: 'M5 10C5 8.89543 5.89543 8 7 8L41 8C42.1046 8 43 8.89543 43 10V38C43 39.1046 42.1046 40 41 40H7C5.89543 40 5 39.1046 5 38V10Z',
          stroke: props.colors[0],
          'stroke-width': props.strokeWidth,
          'stroke-linecap': props.strokeLinecap,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      ),
      createVNode(
        'path',
        {
          'fill-rule': 'evenodd',
          'clip-rule': 'evenodd',
          d: 'M14.5 18C15.3284 18 16 17.3284 16 16.5C16 15.6716 15.3284 15 14.5 15C13.6716 15 13 15.6716 13 16.5C13 17.3284 13.6716 18 14.5 18Z',
          stroke: props.colors[0],
          'stroke-width': props.strokeWidth,
          'stroke-linecap': props.strokeLinecap,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      ),
      createVNode(
        'path',
        {
          d: 'M15 24L20 28L26 21L43 34V38C43 39.1046 42.1046 40 41 40H7C5.89543 40 5 39.1046 5 38V34L15 24Z',
          fill: props.colors[1],
          stroke: props.colors[0],
          'stroke-width': props.strokeWidth,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      )
    ]
  )
})
const Ranking = IconWrapper('ranking', true, function (props) {
  return createVNode(
    'svg',
    {
      width: props.size,
      height: props.size,
      viewBox: '0 0 48 48',
      fill: 'none'
    },
    [
      createVNode(
        'path',
        {
          d: 'M17 18H4V42H17V18Z',
          stroke: props.colors[0],
          'stroke-width': props.strokeWidth,
          'stroke-linecap': props.strokeLinecap,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      ),
      createVNode(
        'path',
        {
          d: 'M30 6H17V42H30V6Z',
          stroke: props.colors[0],
          'stroke-width': props.strokeWidth,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      ),
      createVNode(
        'path',
        {
          d: 'M43 26H30V42H43V26Z',
          stroke: props.colors[0],
          'stroke-width': props.strokeWidth,
          'stroke-linecap': props.strokeLinecap,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      )
    ]
  )
})
const ShareThree = IconWrapper('share-three', true, function (props) {
  return createVNode(
    'svg',
    {
      width: props.size,
      height: props.size,
      viewBox: '0 0 48 48',
      fill: 'none'
    },
    [
      createVNode(
        'path',
        {
          d: 'M42 38V42L6 42L6 38',
          stroke: props.colors[0],
          'stroke-width': props.strokeWidth,
          'stroke-linecap': props.strokeLinecap,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      ),
      createVNode(
        'path',
        {
          d: 'M30 6L40 16L30 26',
          stroke: props.colors[0],
          'stroke-width': props.strokeWidth,
          'stroke-linecap': props.strokeLinecap,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      ),
      createVNode(
        'path',
        {
          d: 'M40 16C20 16 6 19 6 32',
          stroke: props.colors[0],
          'stroke-width': props.strokeWidth,
          'stroke-linecap': props.strokeLinecap,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      )
    ]
  )
})
const SmilingFace = IconWrapper('smiling-face', false, function (props) {
  return createVNode(
    'svg',
    {
      width: props.size,
      height: props.size,
      viewBox: '0 0 48 48',
      fill: 'none'
    },
    [
      createVNode(
        'path',
        {
          d: 'M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z',
          fill: props.colors[1],
          stroke: props.colors[0],
          'stroke-width': props.strokeWidth,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      ),
      createVNode(
        'path',
        {
          d: 'M31 31C31 31 29 35 24 35C19 35 17 31 17 31',
          stroke: props.colors[2],
          'stroke-width': props.strokeWidth,
          'stroke-linecap': props.strokeLinecap,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      ),
      createVNode(
        'path',
        {
          d: 'M31 18V22',
          stroke: props.colors[2],
          'stroke-width': props.strokeWidth,
          'stroke-linecap': props.strokeLinecap,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      ),
      createVNode(
        'path',
        {
          d: 'M17 18V22',
          stroke: props.colors[2],
          'stroke-width': props.strokeWidth,
          'stroke-linecap': props.strokeLinecap,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      )
    ]
  )
})
const SourceCode = IconWrapper('source-code', true, function (props) {
  return createVNode(
    'svg',
    {
      width: props.size,
      height: props.size,
      viewBox: '0 0 48 48',
      fill: 'none'
    },
    [
      createVNode(
        'path',
        {
          d: 'M23 40H7C5.34315 40 4 38.6569 4 37V11C4 9.34315 5.34315 8 7 8H41C42.6569 8 44 9.34315 44 11V25.8824',
          stroke: props.colors[0],
          'stroke-width': props.strokeWidth,
          'stroke-linecap': props.strokeLinecap,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      ),
      createVNode(
        'path',
        {
          d: 'M4 11C4 9.34315 5.34315 8 7 8H41C42.6569 8 44 9.34315 44 11V20H4V11Z',
          fill: props.colors[1],
          stroke: props.colors[0],
          'stroke-width': props.strokeWidth
        },
        null
      ),
      createVNode(
        'path',
        {
          d: 'M34 33L30 37L34 41',
          stroke: props.colors[0],
          'stroke-width': props.strokeWidth,
          'stroke-linecap': props.strokeLinecap,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      ),
      createVNode(
        'path',
        {
          d: 'M40 33L44 37L40 41',
          stroke: props.colors[0],
          'stroke-width': props.strokeWidth,
          'stroke-linecap': props.strokeLinecap,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      ),
      createVNode(
        'circle',
        {
          r: '2',
          transform: 'matrix(-1.31134e-07 -1 -1 1.31134e-07 10 14)',
          fill: props.colors[2]
        },
        null
      ),
      createVNode(
        'circle',
        {
          r: '2',
          transform: 'matrix(-1.31134e-07 -1 -1 1.31134e-07 16 14)',
          fill: props.colors[2]
        },
        null
      )
    ]
  )
})
const IconVoice = IconWrapper('voice', false, function (props) {
  return createVNode(
    'svg',
    {
      width: props.size,
      height: props.size,
      viewBox: '0 0 48 48',
      fill: 'none'
    },
    [
      createVNode(
        'rect',
        {
          x: '17',
          y: '4',
          width: '14',
          height: '27',
          rx: '7',
          fill: props.colors[1],
          stroke: props.colors[0],
          'stroke-width': props.strokeWidth,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      ),
      createVNode(
        'path',
        {
          d: 'M9 23C9 31.2843 15.7157 38 24 38C32.2843 38 39 31.2843 39 23',
          stroke: props.colors[0],
          'stroke-width': props.strokeWidth,
          'stroke-linecap': props.strokeLinecap,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      ),
      createVNode(
        'path',
        {
          d: 'M24 38V44',
          stroke: props.colors[0],
          'stroke-width': props.strokeWidth,
          'stroke-linecap': props.strokeLinecap,
          'stroke-linejoin': props.strokeLinejoin
        },
        null
      )
    ]
  )
})
function useGroup() {
  const { dialog } = useInject()
  const onGroupDismiss = (params, fn) => {
    dialog.create({
      showIcon: false,
      title: `确定要解散[${params.name}] 群聊？ 此操作是不可逆的！`,
      content: '解散后不再接收此群的任何消息。',
      positiveText: '确定',
      negativeText: '取消',
      positiveButtonProps: {
        textColor: '#ffffff'
      },
      onPositiveClick: async () => {
        const { code } = await ServGroupDismiss({
          group_id: params.group_id
        })
        if (code == 200) {
          fn()
        }
        return code == 200
      }
    })
  }
  const onSignOutGroup = (params, fn) => {
    dialog.create({
      showIcon: true,
      title: `退出 [${params.name}] 群聊？`,
      content: '退出后不再接收此群的任何消息。',
      positiveText: '确定',
      negativeText: '取消',
      positiveButtonProps: {
        textColor: '#ffffff'
      },
      onPositiveClick: async () => {
        const { code } = await ServGroupSecede({
          group_id: params.group_id
        })
        if (code == 200) {
          fn()
        }
        return code == 200
      }
    })
  }
  return { onGroupDismiss, onSignOutGroup }
}
const _hoisted_1$l = { class: 'el-header panel-header' }
const _hoisted_2$g = { class: 'module left-module' }
const _hoisted_3$e = { class: 'tag' }
const _hoisted_4$b = { class: 'tag red' }
const _hoisted_5$8 = {
  class: 'tag',
  style: { 'background-color': 'rgb(65, 174, 60)' }
}
const _hoisted_6$7 = { class: 'nickname text-ellipsis' }
const _hoisted_7$6 = { class: 'keyboard' }
const _hoisted_8$4 = { class: 'module right-module' }
const _sfc_main$m = /* @__PURE__ */ defineComponent({
  __name: 'Header',
  props: {
    talkMode: {
      type: Number,
      default: 1
    },
    username: {
      type: String,
      default: ''
    },
    online: {
      type: Boolean,
      default: false
    },
    keyboard: {
      type: Boolean,
      default: false
    },
    num: {
      type: Number,
      default: 0
    },
    menu: {
      type: Boolean,
      default: false
    },
    description: {
      type: String,
      default: ''
    }
  },
  emits: ['evnet', 'changeSessionMenu'],
  setup(__props, { emit: __emit }) {
    const emit = __emit
    const props = __props
    const onSetMenu = () => {
      emit('changeSessionMenu', !props.menu)
    }
    return (_ctx, _cache) => {
      const _component_n_icon = NIcon
      const _component_n_popover = __unplugin_components_3
      return (
        openBlock(),
        createElementBlock('header', _hoisted_1$l, [
          createBaseVNode(
            'div',
            {
              class: 'menu border-right pointer',
              onClick: onSetMenu
            },
            [
              createVNode(
                _component_n_icon,
                {
                  component: __props.menu ? unref(MenuUnfoldOne) : unref(MenuFoldOne),
                  size: 22
                },
                null,
                8,
                ['component']
              )
            ]
          ),
          createBaseVNode('div', _hoisted_2$g, [
            withDirectives(createBaseVNode('span', _hoisted_3$e, ' 群聊 ', 512), [
              [vShow, __props.talkMode == 2]
            ]),
            withDirectives(createBaseVNode('span', _hoisted_4$b, ' 好友 ', 512), [
              [vShow, __props.talkMode == 1 && !__props.online]
            ]),
            withDirectives(createBaseVNode('span', _hoisted_5$8, ' 在线 ', 512), [
              [vShow, __props.talkMode == 1 && __props.online]
            ]),
            createBaseVNode('span', _hoisted_6$7, toDisplayString(__props.username), 1),
            withDirectives(createBaseVNode('span', _hoisted_7$6, '对方正在输入...', 512), [
              [vShow, __props.keyboard]
            ]),
            withDirectives(
              createBaseVNode(
                'span',
                { class: 'num' },
                '(' + toDisplayString(__props.num) + ')',
                513
              ),
              [[vShow, __props.talkMode == 2 && __props.num]]
            ),
            withDirectives(
              createBaseVNode(
                'p',
                { class: 'desc text-ellipsis' },
                toDisplayString(__props.description),
                513
              ),
              [[vShow, __props.description.length]]
            )
          ]),
          createBaseVNode('div', _hoisted_8$4, [
            createVNode(
              _component_n_popover,
              { trigger: 'hover' },
              {
                trigger: withCtx(() => [
                  withDirectives(
                    createVNode(
                      _component_n_icon,
                      {
                        class: 'icon',
                        component: unref(Announcement),
                        size: 18,
                        onClick:
                          _cache[0] || (_cache[0] = ($event) => emit('evnet', 'announcement'))
                      },
                      null,
                      8,
                      ['component']
                    ),
                    [[vShow, __props.talkMode == 2]]
                  )
                ]),
                default: withCtx(() => [
                  _cache[3] || (_cache[3] = createTextVNode(' 群公告 ', -1))
                ]),
                _: 1,
                __: [3]
              }
            ),
            createVNode(
              _component_n_popover,
              { trigger: 'hover' },
              {
                trigger: withCtx(() => [
                  createVNode(
                    _component_n_icon,
                    {
                      class: 'icon',
                      component: unref(PeoplePlusOne),
                      size: 18,
                      onClick: _cache[1] || (_cache[1] = ($event) => emit('evnet', 'addGroup'))
                    },
                    null,
                    8,
                    ['component']
                  )
                ]),
                default: withCtx(() => [
                  createTextVNode(
                    ' ' + toDisplayString(__props.talkMode === 1 ? '发起群聊' : '邀请好友'),
                    1
                  )
                ]),
                _: 1
              }
            ),
            createVNode(
              _component_n_popover,
              { trigger: 'hover' },
              {
                trigger: withCtx(() => [
                  withDirectives(
                    createVNode(
                      _component_n_icon,
                      {
                        class: 'icon',
                        component: unref(More),
                        size: 18,
                        onClick: _cache[2] || (_cache[2] = ($event) => emit('evnet', 'group'))
                      },
                      null,
                      8,
                      ['component']
                    ),
                    [[vShow, __props.talkMode == 2]]
                  )
                ]),
                default: withCtx(() => [
                  _cache[4] || (_cache[4] = createTextVNode(' 群详情 ', -1))
                ]),
                _: 1,
                __: [4]
              }
            )
          ])
        ])
      )
    }
  }
})
const PanelHeader = /* @__PURE__ */ _export_sfc(_sfc_main$m, [['__scopeId', 'data-v-9554ad60']])
var Scope = /* @__PURE__ */ ((Scope2) => (
  (Scope2[(Scope2.TYPE = 3)] = 'TYPE'),
  (Scope2[(Scope2.LEVEL = 12)] = 'LEVEL'),
  (Scope2[(Scope2.ATTRIBUTE = 13)] = 'ATTRIBUTE'),
  (Scope2[(Scope2.BLOT = 14)] = 'BLOT'),
  (Scope2[(Scope2.INLINE = 7)] = 'INLINE'),
  (Scope2[(Scope2.BLOCK = 11)] = 'BLOCK'),
  (Scope2[(Scope2.BLOCK_BLOT = 10)] = 'BLOCK_BLOT'),
  (Scope2[(Scope2.INLINE_BLOT = 6)] = 'INLINE_BLOT'),
  (Scope2[(Scope2.BLOCK_ATTRIBUTE = 9)] = 'BLOCK_ATTRIBUTE'),
  (Scope2[(Scope2.INLINE_ATTRIBUTE = 5)] = 'INLINE_ATTRIBUTE'),
  (Scope2[(Scope2.ANY = 15)] = 'ANY'),
  Scope2
))(Scope || {})
class Attributor {
  constructor(attrName, keyName, options2 = {}) {
    ;((this.attrName = attrName), (this.keyName = keyName))
    const attributeBit = Scope.TYPE & Scope.ATTRIBUTE
    ;((this.scope =
      options2.scope != null
        ? // Ignore type bits, force attribute bit
          (options2.scope & Scope.LEVEL) | attributeBit
        : Scope.ATTRIBUTE),
      options2.whitelist != null && (this.whitelist = options2.whitelist))
  }
  static keys(node) {
    return Array.from(node.attributes).map((item) => item.name)
  }
  add(node, value) {
    return this.canAdd(node, value) ? (node.setAttribute(this.keyName, value), true) : false
  }
  canAdd(_node, value) {
    return this.whitelist == null
      ? true
      : typeof value == 'string'
        ? this.whitelist.indexOf(value.replace(/["']/g, '')) > -1
        : this.whitelist.indexOf(value) > -1
  }
  remove(node) {
    node.removeAttribute(this.keyName)
  }
  value(node) {
    const value = node.getAttribute(this.keyName)
    return this.canAdd(node, value) && value ? value : ''
  }
}
class ParchmentError extends Error {
  constructor(message) {
    ;((message = '[Parchment] ' + message),
      super(message),
      (this.message = message),
      (this.name = this.constructor.name))
  }
}
const _Registry = class _Registry2 {
  constructor() {
    ;((this.attributes = {}), (this.classes = {}), (this.tags = {}), (this.types = {}))
  }
  static find(node, bubble = false) {
    if (node == null) return null
    if (this.blots.has(node)) return this.blots.get(node) || null
    if (bubble) {
      let parentNode = null
      try {
        parentNode = node.parentNode
      } catch {
        return null
      }
      return this.find(parentNode, bubble)
    }
    return null
  }
  create(scroll, input, value) {
    const match2 = this.query(input)
    if (match2 == null) throw new ParchmentError(`Unable to create ${input} blot`)
    const blotClass = match2,
      node =
        // @ts-expect-error Fix me later
        input instanceof Node || input.nodeType === Node.TEXT_NODE
          ? input
          : blotClass.create(value),
      blot = new blotClass(scroll, node, value)
    return (_Registry2.blots.set(blot.domNode, blot), blot)
  }
  find(node, bubble = false) {
    return _Registry2.find(node, bubble)
  }
  query(query, scope = Scope.ANY) {
    let match2
    return (
      typeof query == 'string'
        ? (match2 = this.types[query] || this.attributes[query])
        : query instanceof Text || query.nodeType === Node.TEXT_NODE
          ? (match2 = this.types.text)
          : typeof query == 'number'
            ? query & Scope.LEVEL & Scope.BLOCK
              ? (match2 = this.types.block)
              : query & Scope.LEVEL & Scope.INLINE && (match2 = this.types.inline)
            : query instanceof Element &&
              ((query.getAttribute('class') || '')
                .split(/\s+/)
                .some((name) => ((match2 = this.classes[name]), !!match2)),
              (match2 = match2 || this.tags[query.tagName])),
      match2 == null
        ? null
        : 'scope' in match2 &&
            scope & Scope.LEVEL & match2.scope &&
            scope & Scope.TYPE & match2.scope
          ? match2
          : null
    )
  }
  register(...definitions) {
    return definitions.map((definition) => {
      const isBlot = 'blotName' in definition,
        isAttr = 'attrName' in definition
      if (!isBlot && !isAttr) throw new ParchmentError('Invalid definition')
      if (isBlot && definition.blotName === 'abstract')
        throw new ParchmentError('Cannot register abstract class')
      const key = isBlot ? definition.blotName : isAttr ? definition.attrName : void 0
      return (
        (this.types[key] = definition),
        isAttr
          ? typeof definition.keyName == 'string' &&
            (this.attributes[definition.keyName] = definition)
          : isBlot &&
            (definition.className && (this.classes[definition.className] = definition),
            definition.tagName &&
              (Array.isArray(definition.tagName)
                ? (definition.tagName = definition.tagName.map((tagName) => tagName.toUpperCase()))
                : (definition.tagName = definition.tagName.toUpperCase()),
              (Array.isArray(definition.tagName)
                ? definition.tagName
                : [definition.tagName]
              ).forEach((tag) => {
                ;(this.tags[tag] == null || definition.className == null) &&
                  (this.tags[tag] = definition)
              }))),
        definition
      )
    })
  }
}
_Registry.blots = /* @__PURE__ */ new WeakMap()
let Registry = _Registry
function match(node, prefix) {
  return (node.getAttribute('class') || '')
    .split(/\s+/)
    .filter((name) => name.indexOf(`${prefix}-`) === 0)
}
class ClassAttributor extends Attributor {
  static keys(node) {
    return (node.getAttribute('class') || '')
      .split(/\s+/)
      .map((name) => name.split('-').slice(0, -1).join('-'))
  }
  add(node, value) {
    return this.canAdd(node, value)
      ? (this.remove(node), node.classList.add(`${this.keyName}-${value}`), true)
      : false
  }
  remove(node) {
    ;(match(node, this.keyName).forEach((name) => {
      node.classList.remove(name)
    }),
      node.classList.length === 0 && node.removeAttribute('class'))
  }
  value(node) {
    const value = (match(node, this.keyName)[0] || '').slice(this.keyName.length + 1)
    return this.canAdd(node, value) ? value : ''
  }
}
const ClassAttributor$1 = ClassAttributor
function camelize(name) {
  const parts = name.split('-'),
    rest = parts
      .slice(1)
      .map((part) => part[0].toUpperCase() + part.slice(1))
      .join('')
  return parts[0] + rest
}
class StyleAttributor extends Attributor {
  static keys(node) {
    return (node.getAttribute('style') || '').split(';').map((value) => value.split(':')[0].trim())
  }
  add(node, value) {
    return this.canAdd(node, value) ? ((node.style[camelize(this.keyName)] = value), true) : false
  }
  remove(node) {
    ;((node.style[camelize(this.keyName)] = ''),
      node.getAttribute('style') || node.removeAttribute('style'))
  }
  value(node) {
    const value = node.style[camelize(this.keyName)]
    return this.canAdd(node, value) ? value : ''
  }
}
const StyleAttributor$1 = StyleAttributor
class AttributorStore {
  constructor(domNode) {
    ;((this.attributes = {}), (this.domNode = domNode), this.build())
  }
  attribute(attribute, value) {
    value
      ? attribute.add(this.domNode, value) &&
        (attribute.value(this.domNode) != null
          ? (this.attributes[attribute.attrName] = attribute)
          : delete this.attributes[attribute.attrName])
      : (attribute.remove(this.domNode), delete this.attributes[attribute.attrName])
  }
  build() {
    this.attributes = {}
    const blot = Registry.find(this.domNode)
    if (blot == null) return
    const attributes = Attributor.keys(this.domNode),
      classes = ClassAttributor$1.keys(this.domNode),
      styles = StyleAttributor$1.keys(this.domNode)
    attributes
      .concat(classes)
      .concat(styles)
      .forEach((name) => {
        const attr = blot.scroll.query(name, Scope.ATTRIBUTE)
        attr instanceof Attributor && (this.attributes[attr.attrName] = attr)
      })
  }
  copy(target) {
    Object.keys(this.attributes).forEach((key) => {
      const value = this.attributes[key].value(this.domNode)
      target.format(key, value)
    })
  }
  move(target) {
    ;(this.copy(target),
      Object.keys(this.attributes).forEach((key) => {
        this.attributes[key].remove(this.domNode)
      }),
      (this.attributes = {}))
  }
  values() {
    return Object.keys(this.attributes).reduce(
      (attributes, name) => (
        (attributes[name] = this.attributes[name].value(this.domNode)),
        attributes
      ),
      {}
    )
  }
}
const AttributorStore$1 = AttributorStore,
  _ShadowBlot = class _ShadowBlot2 {
    constructor(scroll, domNode) {
      ;((this.scroll = scroll),
        (this.domNode = domNode),
        Registry.blots.set(domNode, this),
        (this.prev = null),
        (this.next = null))
    }
    static create(rawValue) {
      if (this.tagName == null) throw new ParchmentError('Blot definition missing tagName')
      let node, value
      return (
        Array.isArray(this.tagName)
          ? (typeof rawValue == 'string'
              ? ((value = rawValue.toUpperCase()),
                parseInt(value, 10).toString() === value && (value = parseInt(value, 10)))
              : typeof rawValue == 'number' && (value = rawValue),
            typeof value == 'number'
              ? (node = document.createElement(this.tagName[value - 1]))
              : value && this.tagName.indexOf(value) > -1
                ? (node = document.createElement(value))
                : (node = document.createElement(this.tagName[0])))
          : (node = document.createElement(this.tagName)),
        this.className && node.classList.add(this.className),
        node
      )
    }
    // Hack for accessing inherited static methods
    get statics() {
      return this.constructor
    }
    attach() {}
    clone() {
      const domNode = this.domNode.cloneNode(false)
      return this.scroll.create(domNode)
    }
    detach() {
      ;(this.parent != null && this.parent.removeChild(this), Registry.blots.delete(this.domNode))
    }
    deleteAt(index2, length) {
      this.isolate(index2, length).remove()
    }
    formatAt(index2, length, name, value) {
      const blot = this.isolate(index2, length)
      if (this.scroll.query(name, Scope.BLOT) != null && value) blot.wrap(name, value)
      else if (this.scroll.query(name, Scope.ATTRIBUTE) != null) {
        const parent = this.scroll.create(this.statics.scope)
        ;(blot.wrap(parent), parent.format(name, value))
      }
    }
    insertAt(index2, value, def) {
      const blot = def == null ? this.scroll.create('text', value) : this.scroll.create(value, def),
        ref2 = this.split(index2)
      this.parent.insertBefore(blot, ref2 || void 0)
    }
    isolate(index2, length) {
      const target = this.split(index2)
      if (target == null) throw new Error('Attempt to isolate at end')
      return (target.split(length), target)
    }
    length() {
      return 1
    }
    offset(root = this.parent) {
      return this.parent == null || this === root
        ? 0
        : this.parent.children.offset(this) + this.parent.offset(root)
    }
    optimize(_context) {
      this.statics.requiredContainer &&
        !(this.parent instanceof this.statics.requiredContainer) &&
        this.wrap(this.statics.requiredContainer.blotName)
    }
    remove() {
      ;(this.domNode.parentNode != null && this.domNode.parentNode.removeChild(this.domNode),
        this.detach())
    }
    replaceWith(name, value) {
      const replacement = typeof name == 'string' ? this.scroll.create(name, value) : name
      return (
        this.parent != null &&
          (this.parent.insertBefore(replacement, this.next || void 0), this.remove()),
        replacement
      )
    }
    split(index2, _force) {
      return index2 === 0 ? this : this.next
    }
    update(_mutations, _context) {}
    wrap(name, value) {
      const wrapper = typeof name == 'string' ? this.scroll.create(name, value) : name
      if (
        (this.parent != null && this.parent.insertBefore(wrapper, this.next || void 0),
        typeof wrapper.appendChild != 'function')
      )
        throw new ParchmentError(`Cannot wrap ${name}`)
      return (wrapper.appendChild(this), wrapper)
    }
  }
_ShadowBlot.blotName = 'abstract'
let ShadowBlot = _ShadowBlot
const _LeafBlot = class _LeafBlot2 extends ShadowBlot {
  /**
   * Returns the value represented by domNode if it is this Blot's type
   * No checking that domNode can represent this Blot type is required so
   * applications needing it should check externally before calling.
   */
  static value(_domNode) {
    return true
  }
  /**
   * Given location represented by node and offset from DOM Selection Range,
   * return index to that location.
   */
  index(node, offset) {
    return this.domNode === node ||
      this.domNode.compareDocumentPosition(node) & Node.DOCUMENT_POSITION_CONTAINED_BY
      ? Math.min(offset, 1)
      : -1
  }
  /**
   * Given index to location within blot, return node and offset representing
   * that location, consumable by DOM Selection Range
   */
  position(index2, _inclusive) {
    let offset = Array.from(this.parent.domNode.childNodes).indexOf(this.domNode)
    return (index2 > 0 && (offset += 1), [this.parent.domNode, offset])
  }
  /**
   * Return value represented by this blot
   * Should not change without interaction from API or
   * user change detectable by update()
   */
  value() {
    return {
      [this.statics.blotName]: this.statics.value(this.domNode) || true
    }
  }
}
_LeafBlot.scope = Scope.INLINE_BLOT
let LeafBlot = _LeafBlot
const LeafBlot$1 = LeafBlot
class LinkedList {
  constructor() {
    ;((this.head = null), (this.tail = null), (this.length = 0))
  }
  append(...nodes) {
    if ((this.insertBefore(nodes[0], null), nodes.length > 1)) {
      const rest = nodes.slice(1)
      this.append(...rest)
    }
  }
  at(index2) {
    const next = this.iterator()
    let cur = next()
    for (; cur && index2 > 0; ) ((index2 -= 1), (cur = next()))
    return cur
  }
  contains(node) {
    const next = this.iterator()
    let cur = next()
    for (; cur; ) {
      if (cur === node) return true
      cur = next()
    }
    return false
  }
  indexOf(node) {
    const next = this.iterator()
    let cur = next(),
      index2 = 0
    for (; cur; ) {
      if (cur === node) return index2
      ;((index2 += 1), (cur = next()))
    }
    return -1
  }
  insertBefore(node, refNode) {
    node != null &&
      (this.remove(node),
      (node.next = refNode),
      refNode != null
        ? ((node.prev = refNode.prev),
          refNode.prev != null && (refNode.prev.next = node),
          (refNode.prev = node),
          refNode === this.head && (this.head = node))
        : this.tail != null
          ? ((this.tail.next = node), (node.prev = this.tail), (this.tail = node))
          : ((node.prev = null), (this.head = this.tail = node)),
      (this.length += 1))
  }
  offset(target) {
    let index2 = 0,
      cur = this.head
    for (; cur != null; ) {
      if (cur === target) return index2
      ;((index2 += cur.length()), (cur = cur.next))
    }
    return -1
  }
  remove(node) {
    this.contains(node) &&
      (node.prev != null && (node.prev.next = node.next),
      node.next != null && (node.next.prev = node.prev),
      node === this.head && (this.head = node.next),
      node === this.tail && (this.tail = node.prev),
      (this.length -= 1))
  }
  iterator(curNode = this.head) {
    return () => {
      const ret = curNode
      return (curNode != null && (curNode = curNode.next), ret)
    }
  }
  find(index2, inclusive = false) {
    const next = this.iterator()
    let cur = next()
    for (; cur; ) {
      const length = cur.length()
      if (
        index2 < length ||
        (inclusive && index2 === length && (cur.next == null || cur.next.length() !== 0))
      )
        return [cur, index2]
      ;((index2 -= length), (cur = next()))
    }
    return [null, 0]
  }
  forEach(callback) {
    const next = this.iterator()
    let cur = next()
    for (; cur; ) (callback(cur), (cur = next()))
  }
  forEachAt(index2, length, callback) {
    if (length <= 0) return
    const [startNode, offset] = this.find(index2)
    let curIndex = index2 - offset
    const next = this.iterator(startNode)
    let cur = next()
    for (; cur && curIndex < index2 + length; ) {
      const curLength = cur.length()
      ;(index2 > curIndex
        ? callback(cur, index2 - curIndex, Math.min(length, curIndex + curLength - index2))
        : callback(cur, 0, Math.min(curLength, index2 + length - curIndex)),
        (curIndex += curLength),
        (cur = next()))
    }
  }
  map(callback) {
    return this.reduce((memo, cur) => (memo.push(callback(cur)), memo), [])
  }
  reduce(callback, memo) {
    const next = this.iterator()
    let cur = next()
    for (; cur; ) ((memo = callback(memo, cur)), (cur = next()))
    return memo
  }
}
function makeAttachedBlot(node, scroll) {
  const found = scroll.find(node)
  if (found) return found
  try {
    return scroll.create(node)
  } catch {
    const blot = scroll.create(Scope.INLINE)
    return (
      Array.from(node.childNodes).forEach((child) => {
        blot.domNode.appendChild(child)
      }),
      node.parentNode && node.parentNode.replaceChild(blot.domNode, node),
      blot.attach(),
      blot
    )
  }
}
const _ParentBlot = class _ParentBlot2 extends ShadowBlot {
  constructor(scroll, domNode) {
    ;(super(scroll, domNode), (this.uiNode = null), this.build())
  }
  appendChild(other) {
    this.insertBefore(other)
  }
  attach() {
    ;(super.attach(),
      this.children.forEach((child) => {
        child.attach()
      }))
  }
  attachUI(node) {
    ;(this.uiNode != null && this.uiNode.remove(),
      (this.uiNode = node),
      _ParentBlot2.uiClass && this.uiNode.classList.add(_ParentBlot2.uiClass),
      this.uiNode.setAttribute('contenteditable', 'false'),
      this.domNode.insertBefore(this.uiNode, this.domNode.firstChild))
  }
  /**
   * Called during construction, should fill its own children LinkedList.
   */
  build() {
    ;((this.children = new LinkedList()),
      Array.from(this.domNode.childNodes)
        .filter((node) => node !== this.uiNode)
        .reverse()
        .forEach((node) => {
          try {
            const child = makeAttachedBlot(node, this.scroll)
            this.insertBefore(child, this.children.head || void 0)
          } catch (err) {
            if (err instanceof ParchmentError) return
            throw err
          }
        }))
  }
  deleteAt(index2, length) {
    if (index2 === 0 && length === this.length()) return this.remove()
    this.children.forEachAt(index2, length, (child, offset, childLength) => {
      child.deleteAt(offset, childLength)
    })
  }
  descendant(criteria, index2 = 0) {
    const [child, offset] = this.children.find(index2)
    return (criteria.blotName == null && criteria(child)) ||
      (criteria.blotName != null && child instanceof criteria)
      ? [child, offset]
      : child instanceof _ParentBlot2
        ? child.descendant(criteria, offset)
        : [null, -1]
  }
  descendants(criteria, index2 = 0, length = Number.MAX_VALUE) {
    let descendants = [],
      lengthLeft = length
    return (
      this.children.forEachAt(index2, length, (child, childIndex, childLength) => {
        ;(((criteria.blotName == null && criteria(child)) ||
          (criteria.blotName != null && child instanceof criteria)) &&
          descendants.push(child),
          child instanceof _ParentBlot2 &&
            (descendants = descendants.concat(child.descendants(criteria, childIndex, lengthLeft))),
          (lengthLeft -= childLength))
      }),
      descendants
    )
  }
  detach() {
    ;(this.children.forEach((child) => {
      child.detach()
    }),
      super.detach())
  }
  enforceAllowedChildren() {
    let done = false
    this.children.forEach((child) => {
      done ||
        this.statics.allowedChildren.some((def) => child instanceof def) ||
        (child.statics.scope === Scope.BLOCK_BLOT
          ? (child.next != null && this.splitAfter(child),
            child.prev != null && this.splitAfter(child.prev),
            child.parent.unwrap(),
            (done = true))
          : child instanceof _ParentBlot2
            ? child.unwrap()
            : child.remove())
    })
  }
  formatAt(index2, length, name, value) {
    this.children.forEachAt(index2, length, (child, offset, childLength) => {
      child.formatAt(offset, childLength, name, value)
    })
  }
  insertAt(index2, value, def) {
    const [child, offset] = this.children.find(index2)
    if (child) child.insertAt(offset, value, def)
    else {
      const blot = def == null ? this.scroll.create('text', value) : this.scroll.create(value, def)
      this.appendChild(blot)
    }
  }
  insertBefore(childBlot, refBlot) {
    childBlot.parent != null && childBlot.parent.children.remove(childBlot)
    let refDomNode = null
    ;(this.children.insertBefore(childBlot, refBlot || null),
      (childBlot.parent = this),
      refBlot != null && (refDomNode = refBlot.domNode),
      (this.domNode.parentNode !== childBlot.domNode || this.domNode.nextSibling !== refDomNode) &&
        this.domNode.insertBefore(childBlot.domNode, refDomNode),
      childBlot.attach())
  }
  length() {
    return this.children.reduce((memo, child) => memo + child.length(), 0)
  }
  moveChildren(targetParent, refNode) {
    this.children.forEach((child) => {
      targetParent.insertBefore(child, refNode)
    })
  }
  optimize(context) {
    if (
      (super.optimize(context),
      this.enforceAllowedChildren(),
      this.uiNode != null &&
        this.uiNode !== this.domNode.firstChild &&
        this.domNode.insertBefore(this.uiNode, this.domNode.firstChild),
      this.children.length === 0)
    )
      if (this.statics.defaultChild != null) {
        const child = this.scroll.create(this.statics.defaultChild.blotName)
        this.appendChild(child)
      } else this.remove()
  }
  path(index2, inclusive = false) {
    const [child, offset] = this.children.find(index2, inclusive),
      position = [[this, index2]]
    return child instanceof _ParentBlot2
      ? position.concat(child.path(offset, inclusive))
      : (child != null && position.push([child, offset]), position)
  }
  removeChild(child) {
    this.children.remove(child)
  }
  replaceWith(name, value) {
    const replacement = typeof name == 'string' ? this.scroll.create(name, value) : name
    return (
      replacement instanceof _ParentBlot2 && this.moveChildren(replacement),
      super.replaceWith(replacement)
    )
  }
  split(index2, force = false) {
    if (!force) {
      if (index2 === 0) return this
      if (index2 === this.length()) return this.next
    }
    const after = this.clone()
    return (
      this.parent && this.parent.insertBefore(after, this.next || void 0),
      this.children.forEachAt(index2, this.length(), (child, offset, _length) => {
        const split = child.split(offset, force)
        split != null && after.appendChild(split)
      }),
      after
    )
  }
  splitAfter(child) {
    const after = this.clone()
    for (; child.next != null; ) after.appendChild(child.next)
    return (this.parent && this.parent.insertBefore(after, this.next || void 0), after)
  }
  unwrap() {
    ;(this.parent && this.moveChildren(this.parent, this.next || void 0), this.remove())
  }
  update(mutations, _context) {
    const addedNodes = [],
      removedNodes = []
    ;(mutations.forEach((mutation) => {
      mutation.target === this.domNode &&
        mutation.type === 'childList' &&
        (addedNodes.push(...mutation.addedNodes), removedNodes.push(...mutation.removedNodes))
    }),
      removedNodes.forEach((node) => {
        if (
          node.parentNode != null && // @ts-expect-error Fix me later
          node.tagName !== 'IFRAME' &&
          document.body.compareDocumentPosition(node) & Node.DOCUMENT_POSITION_CONTAINED_BY
        )
          return
        const blot = this.scroll.find(node)
        blot != null &&
          (blot.domNode.parentNode == null || blot.domNode.parentNode === this.domNode) &&
          blot.detach()
      }),
      addedNodes
        .filter((node) => node.parentNode === this.domNode && node !== this.uiNode)
        .sort((a, b) =>
          a === b ? 0 : a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? 1 : -1
        )
        .forEach((node) => {
          let refBlot = null
          node.nextSibling != null && (refBlot = this.scroll.find(node.nextSibling))
          const blot = makeAttachedBlot(node, this.scroll)
          ;(blot.next !== refBlot || blot.next == null) &&
            (blot.parent != null && blot.parent.removeChild(this),
            this.insertBefore(blot, refBlot || void 0))
        }),
      this.enforceAllowedChildren())
  }
}
_ParentBlot.uiClass = ''
let ParentBlot = _ParentBlot
const ParentBlot$1 = ParentBlot
function isEqual(obj1, obj2) {
  if (Object.keys(obj1).length !== Object.keys(obj2).length) return false
  for (const prop in obj1) if (obj1[prop] !== obj2[prop]) return false
  return true
}
const _InlineBlot = class _InlineBlot2 extends ParentBlot$1 {
  static create(value) {
    return super.create(value)
  }
  static formats(domNode, scroll) {
    const match2 = scroll.query(_InlineBlot2.blotName)
    if (!(match2 != null && domNode.tagName === match2.tagName)) {
      if (typeof this.tagName == 'string') return true
      if (Array.isArray(this.tagName)) return domNode.tagName.toLowerCase()
    }
  }
  constructor(scroll, domNode) {
    ;(super(scroll, domNode), (this.attributes = new AttributorStore$1(this.domNode)))
  }
  format(name, value) {
    if (name === this.statics.blotName && !value)
      (this.children.forEach((child) => {
        ;(child instanceof _InlineBlot2 || (child = child.wrap(_InlineBlot2.blotName, true)),
          this.attributes.copy(child))
      }),
        this.unwrap())
    else {
      const format = this.scroll.query(name, Scope.INLINE)
      if (format == null) return
      format instanceof Attributor
        ? this.attributes.attribute(format, value)
        : value &&
          (name !== this.statics.blotName || this.formats()[name] !== value) &&
          this.replaceWith(name, value)
    }
  }
  formats() {
    const formats = this.attributes.values(),
      format = this.statics.formats(this.domNode, this.scroll)
    return (format != null && (formats[this.statics.blotName] = format), formats)
  }
  formatAt(index2, length, name, value) {
    this.formats()[name] != null || this.scroll.query(name, Scope.ATTRIBUTE)
      ? this.isolate(index2, length).format(name, value)
      : super.formatAt(index2, length, name, value)
  }
  optimize(context) {
    super.optimize(context)
    const formats = this.formats()
    if (Object.keys(formats).length === 0) return this.unwrap()
    const next = this.next
    next instanceof _InlineBlot2 &&
      next.prev === this &&
      isEqual(formats, next.formats()) &&
      (next.moveChildren(this), next.remove())
  }
  replaceWith(name, value) {
    const replacement = super.replaceWith(name, value)
    return (this.attributes.copy(replacement), replacement)
  }
  update(mutations, context) {
    ;(super.update(mutations, context),
      mutations.some(
        (mutation) => mutation.target === this.domNode && mutation.type === 'attributes'
      ) && this.attributes.build())
  }
  wrap(name, value) {
    const wrapper = super.wrap(name, value)
    return (wrapper instanceof _InlineBlot2 && this.attributes.move(wrapper), wrapper)
  }
}
;((_InlineBlot.allowedChildren = [_InlineBlot, LeafBlot$1]),
  (_InlineBlot.blotName = 'inline'),
  (_InlineBlot.scope = Scope.INLINE_BLOT),
  (_InlineBlot.tagName = 'SPAN'))
let InlineBlot = _InlineBlot
const InlineBlot$1 = InlineBlot,
  _BlockBlot = class _BlockBlot2 extends ParentBlot$1 {
    static create(value) {
      return super.create(value)
    }
    static formats(domNode, scroll) {
      const match2 = scroll.query(_BlockBlot2.blotName)
      if (!(match2 != null && domNode.tagName === match2.tagName)) {
        if (typeof this.tagName == 'string') return true
        if (Array.isArray(this.tagName)) return domNode.tagName.toLowerCase()
      }
    }
    constructor(scroll, domNode) {
      ;(super(scroll, domNode), (this.attributes = new AttributorStore$1(this.domNode)))
    }
    format(name, value) {
      const format = this.scroll.query(name, Scope.BLOCK)
      format != null &&
        (format instanceof Attributor
          ? this.attributes.attribute(format, value)
          : name === this.statics.blotName && !value
            ? this.replaceWith(_BlockBlot2.blotName)
            : value &&
              (name !== this.statics.blotName || this.formats()[name] !== value) &&
              this.replaceWith(name, value))
    }
    formats() {
      const formats = this.attributes.values(),
        format = this.statics.formats(this.domNode, this.scroll)
      return (format != null && (formats[this.statics.blotName] = format), formats)
    }
    formatAt(index2, length, name, value) {
      this.scroll.query(name, Scope.BLOCK) != null
        ? this.format(name, value)
        : super.formatAt(index2, length, name, value)
    }
    insertAt(index2, value, def) {
      if (def == null || this.scroll.query(value, Scope.INLINE) != null)
        super.insertAt(index2, value, def)
      else {
        const after = this.split(index2)
        if (after != null) {
          const blot = this.scroll.create(value, def)
          after.parent.insertBefore(blot, after)
        } else throw new Error('Attempt to insertAt after block boundaries')
      }
    }
    replaceWith(name, value) {
      const replacement = super.replaceWith(name, value)
      return (this.attributes.copy(replacement), replacement)
    }
    update(mutations, context) {
      ;(super.update(mutations, context),
        mutations.some(
          (mutation) => mutation.target === this.domNode && mutation.type === 'attributes'
        ) && this.attributes.build())
    }
  }
;((_BlockBlot.blotName = 'block'),
  (_BlockBlot.scope = Scope.BLOCK_BLOT),
  (_BlockBlot.tagName = 'P'),
  (_BlockBlot.allowedChildren = [InlineBlot$1, _BlockBlot, LeafBlot$1]))
let BlockBlot = _BlockBlot
const BlockBlot$1 = BlockBlot,
  _ContainerBlot = class _ContainerBlot2 extends ParentBlot$1 {
    checkMerge() {
      return this.next !== null && this.next.statics.blotName === this.statics.blotName
    }
    deleteAt(index2, length) {
      ;(super.deleteAt(index2, length), this.enforceAllowedChildren())
    }
    formatAt(index2, length, name, value) {
      ;(super.formatAt(index2, length, name, value), this.enforceAllowedChildren())
    }
    insertAt(index2, value, def) {
      ;(super.insertAt(index2, value, def), this.enforceAllowedChildren())
    }
    optimize(context) {
      ;(super.optimize(context),
        this.children.length > 0 &&
          this.next != null &&
          this.checkMerge() &&
          (this.next.moveChildren(this), this.next.remove()))
    }
  }
;((_ContainerBlot.blotName = 'container'), (_ContainerBlot.scope = Scope.BLOCK_BLOT))
let ContainerBlot = _ContainerBlot
const ContainerBlot$1 = ContainerBlot
let EmbedBlot$1 = class EmbedBlot extends LeafBlot$1 {
  static formats(_domNode, _scroll) {}
  format(name, value) {
    super.formatAt(0, this.length(), name, value)
  }
  formatAt(index2, length, name, value) {
    index2 === 0 && length === this.length()
      ? this.format(name, value)
      : super.formatAt(index2, length, name, value)
  }
  formats() {
    return this.statics.formats(this.domNode, this.scroll)
  }
}
const EmbedBlot$1$1 = EmbedBlot$1,
  OBSERVER_CONFIG = {
    attributes: true,
    characterData: true,
    characterDataOldValue: true,
    childList: true,
    subtree: true
  },
  MAX_OPTIMIZE_ITERATIONS = 100,
  _ScrollBlot = class _ScrollBlot2 extends ParentBlot$1 {
    constructor(registry, node) {
      ;(super(null, node),
        (this.registry = registry),
        (this.scroll = this),
        this.build(),
        (this.observer = new MutationObserver((mutations) => {
          this.update(mutations)
        })),
        this.observer.observe(this.domNode, OBSERVER_CONFIG),
        this.attach())
    }
    create(input, value) {
      return this.registry.create(this, input, value)
    }
    find(node, bubble = false) {
      const blot = this.registry.find(node, bubble)
      return blot
        ? blot.scroll === this
          ? blot
          : bubble
            ? this.find(blot.scroll.domNode.parentNode, true)
            : null
        : null
    }
    query(query, scope = Scope.ANY) {
      return this.registry.query(query, scope)
    }
    register(...definitions) {
      return this.registry.register(...definitions)
    }
    build() {
      this.scroll != null && super.build()
    }
    detach() {
      ;(super.detach(), this.observer.disconnect())
    }
    deleteAt(index2, length) {
      ;(this.update(),
        index2 === 0 && length === this.length()
          ? this.children.forEach((child) => {
              child.remove()
            })
          : super.deleteAt(index2, length))
    }
    formatAt(index2, length, name, value) {
      ;(this.update(), super.formatAt(index2, length, name, value))
    }
    insertAt(index2, value, def) {
      ;(this.update(), super.insertAt(index2, value, def))
    }
    optimize(mutations = [], context = {}) {
      super.optimize(context)
      const mutationsMap = context.mutationsMap || /* @__PURE__ */ new WeakMap()
      let records = Array.from(this.observer.takeRecords())
      for (; records.length > 0; ) mutations.push(records.pop())
      const mark = (blot, markParent = true) => {
          blot == null ||
            blot === this ||
            (blot.domNode.parentNode != null &&
              (mutationsMap.has(blot.domNode) || mutationsMap.set(blot.domNode, []),
              markParent && mark(blot.parent)))
        },
        optimize = (blot) => {
          mutationsMap.has(blot.domNode) &&
            (blot instanceof ParentBlot$1 && blot.children.forEach(optimize),
            mutationsMap.delete(blot.domNode),
            blot.optimize(context))
        }
      let remaining = mutations
      for (let i = 0; remaining.length > 0; i += 1) {
        if (i >= MAX_OPTIMIZE_ITERATIONS)
          throw new Error('[Parchment] Maximum optimize iterations reached')
        for (
          remaining.forEach((mutation) => {
            const blot = this.find(mutation.target, true)
            blot != null &&
              (blot.domNode === mutation.target &&
                (mutation.type === 'childList'
                  ? (mark(this.find(mutation.previousSibling, false)),
                    Array.from(mutation.addedNodes).forEach((node) => {
                      const child = this.find(node, false)
                      ;(mark(child, false),
                        child instanceof ParentBlot$1 &&
                          child.children.forEach((grandChild) => {
                            mark(grandChild, false)
                          }))
                    }))
                  : mutation.type === 'attributes' && mark(blot.prev)),
              mark(blot))
          }),
            this.children.forEach(optimize),
            remaining = Array.from(this.observer.takeRecords()),
            records = remaining.slice();
          records.length > 0;

        )
          mutations.push(records.pop())
      }
    }
    update(mutations, context = {}) {
      mutations = mutations || this.observer.takeRecords()
      const mutationsMap = /* @__PURE__ */ new WeakMap()
      ;(mutations
        .map((mutation) => {
          const blot = this.find(mutation.target, true)
          return blot == null
            ? null
            : mutationsMap.has(blot.domNode)
              ? (mutationsMap.get(blot.domNode).push(mutation), null)
              : (mutationsMap.set(blot.domNode, [mutation]), blot)
        })
        .forEach((blot) => {
          blot != null &&
            blot !== this &&
            mutationsMap.has(blot.domNode) &&
            blot.update(mutationsMap.get(blot.domNode) || [], context)
        }),
        (context.mutationsMap = mutationsMap),
        mutationsMap.has(this.domNode) && super.update(mutationsMap.get(this.domNode), context),
        this.optimize(mutations, context))
    }
  }
;((_ScrollBlot.blotName = 'scroll'),
  (_ScrollBlot.defaultChild = BlockBlot$1),
  (_ScrollBlot.allowedChildren = [BlockBlot$1, ContainerBlot$1]),
  (_ScrollBlot.scope = Scope.BLOCK_BLOT),
  (_ScrollBlot.tagName = 'DIV'))
let ScrollBlot = _ScrollBlot
const ScrollBlot$1 = ScrollBlot,
  _TextBlot = class _TextBlot2 extends LeafBlot$1 {
    static create(value) {
      return document.createTextNode(value)
    }
    static value(domNode) {
      return domNode.data
    }
    constructor(scroll, node) {
      ;(super(scroll, node), (this.text = this.statics.value(this.domNode)))
    }
    deleteAt(index2, length) {
      this.domNode.data = this.text = this.text.slice(0, index2) + this.text.slice(index2 + length)
    }
    index(node, offset) {
      return this.domNode === node ? offset : -1
    }
    insertAt(index2, value, def) {
      def == null
        ? ((this.text = this.text.slice(0, index2) + value + this.text.slice(index2)),
          (this.domNode.data = this.text))
        : super.insertAt(index2, value, def)
    }
    length() {
      return this.text.length
    }
    optimize(context) {
      ;(super.optimize(context),
        (this.text = this.statics.value(this.domNode)),
        this.text.length === 0
          ? this.remove()
          : this.next instanceof _TextBlot2 &&
            this.next.prev === this &&
            (this.insertAt(this.length(), this.next.value()), this.next.remove()))
    }
    position(index2, _inclusive = false) {
      return [this.domNode, index2]
    }
    split(index2, force = false) {
      if (!force) {
        if (index2 === 0) return this
        if (index2 === this.length()) return this.next
      }
      const after = this.scroll.create(this.domNode.splitText(index2))
      return (
        this.parent.insertBefore(after, this.next || void 0),
        (this.text = this.statics.value(this.domNode)),
        after
      )
    }
    update(mutations, _context) {
      mutations.some(
        (mutation) => mutation.type === 'characterData' && mutation.target === this.domNode
      ) && (this.text = this.statics.value(this.domNode))
    }
    value() {
      return this.text
    }
  }
;((_TextBlot.blotName = 'text'), (_TextBlot.scope = Scope.INLINE_BLOT))
let TextBlot = _TextBlot
const TextBlot$1 = TextBlot
const Parchment = /* @__PURE__ */ Object.freeze(
  /* @__PURE__ */ Object.defineProperty(
    {
      __proto__: null,
      Attributor,
      AttributorStore: AttributorStore$1,
      BlockBlot: BlockBlot$1,
      ClassAttributor: ClassAttributor$1,
      ContainerBlot: ContainerBlot$1,
      EmbedBlot: EmbedBlot$1$1,
      InlineBlot: InlineBlot$1,
      LeafBlot: LeafBlot$1,
      ParentBlot: ParentBlot$1,
      Registry,
      Scope,
      ScrollBlot: ScrollBlot$1,
      StyleAttributor: StyleAttributor$1,
      TextBlot: TextBlot$1
    },
    Symbol.toStringTag,
    { value: 'Module' }
  )
)
var Delta$2 = { exports: {} }
var diff_1
var hasRequiredDiff
function requireDiff() {
  if (hasRequiredDiff) return diff_1
  hasRequiredDiff = 1
  var DIFF_DELETE = -1
  var DIFF_INSERT = 1
  var DIFF_EQUAL = 0
  function diff_main(text1, text2, cursor_pos, cleanup, _fix_unicode) {
    if (text1 === text2) {
      if (text1) {
        return [[DIFF_EQUAL, text1]]
      }
      return []
    }
    if (cursor_pos != null) {
      var editdiff = find_cursor_edit_diff(text1, text2, cursor_pos)
      if (editdiff) {
        return editdiff
      }
    }
    var commonlength = diff_commonPrefix(text1, text2)
    var commonprefix = text1.substring(0, commonlength)
    text1 = text1.substring(commonlength)
    text2 = text2.substring(commonlength)
    commonlength = diff_commonSuffix(text1, text2)
    var commonsuffix = text1.substring(text1.length - commonlength)
    text1 = text1.substring(0, text1.length - commonlength)
    text2 = text2.substring(0, text2.length - commonlength)
    var diffs = diff_compute_(text1, text2)
    if (commonprefix) {
      diffs.unshift([DIFF_EQUAL, commonprefix])
    }
    if (commonsuffix) {
      diffs.push([DIFF_EQUAL, commonsuffix])
    }
    diff_cleanupMerge(diffs, _fix_unicode)
    if (cleanup) {
      diff_cleanupSemantic(diffs)
    }
    return diffs
  }
  function diff_compute_(text1, text2) {
    var diffs
    if (!text1) {
      return [[DIFF_INSERT, text2]]
    }
    if (!text2) {
      return [[DIFF_DELETE, text1]]
    }
    var longtext = text1.length > text2.length ? text1 : text2
    var shorttext = text1.length > text2.length ? text2 : text1
    var i = longtext.indexOf(shorttext)
    if (i !== -1) {
      diffs = [
        [DIFF_INSERT, longtext.substring(0, i)],
        [DIFF_EQUAL, shorttext],
        [DIFF_INSERT, longtext.substring(i + shorttext.length)]
      ]
      if (text1.length > text2.length) {
        diffs[0][0] = diffs[2][0] = DIFF_DELETE
      }
      return diffs
    }
    if (shorttext.length === 1) {
      return [
        [DIFF_DELETE, text1],
        [DIFF_INSERT, text2]
      ]
    }
    var hm = diff_halfMatch_(text1, text2)
    if (hm) {
      var text1_a = hm[0]
      var text1_b = hm[1]
      var text2_a = hm[2]
      var text2_b = hm[3]
      var mid_common = hm[4]
      var diffs_a = diff_main(text1_a, text2_a)
      var diffs_b = diff_main(text1_b, text2_b)
      return diffs_a.concat([[DIFF_EQUAL, mid_common]], diffs_b)
    }
    return diff_bisect_(text1, text2)
  }
  function diff_bisect_(text1, text2) {
    var text1_length = text1.length
    var text2_length = text2.length
    var max_d = Math.ceil((text1_length + text2_length) / 2)
    var v_offset = max_d
    var v_length = 2 * max_d
    var v1 = new Array(v_length)
    var v2 = new Array(v_length)
    for (var x = 0; x < v_length; x++) {
      v1[x] = -1
      v2[x] = -1
    }
    v1[v_offset + 1] = 0
    v2[v_offset + 1] = 0
    var delta = text1_length - text2_length
    var front = delta % 2 !== 0
    var k1start = 0
    var k1end = 0
    var k2start = 0
    var k2end = 0
    for (var d = 0; d < max_d; d++) {
      for (var k1 = -d + k1start; k1 <= d - k1end; k1 += 2) {
        var k1_offset = v_offset + k1
        var x1
        if (k1 === -d || (k1 !== d && v1[k1_offset - 1] < v1[k1_offset + 1])) {
          x1 = v1[k1_offset + 1]
        } else {
          x1 = v1[k1_offset - 1] + 1
        }
        var y1 = x1 - k1
        while (x1 < text1_length && y1 < text2_length && text1.charAt(x1) === text2.charAt(y1)) {
          x1++
          y1++
        }
        v1[k1_offset] = x1
        if (x1 > text1_length) {
          k1end += 2
        } else if (y1 > text2_length) {
          k1start += 2
        } else if (front) {
          var k2_offset = v_offset + delta - k1
          if (k2_offset >= 0 && k2_offset < v_length && v2[k2_offset] !== -1) {
            var x2 = text1_length - v2[k2_offset]
            if (x1 >= x2) {
              return diff_bisectSplit_(text1, text2, x1, y1)
            }
          }
        }
      }
      for (var k2 = -d + k2start; k2 <= d - k2end; k2 += 2) {
        var k2_offset = v_offset + k2
        var x2
        if (k2 === -d || (k2 !== d && v2[k2_offset - 1] < v2[k2_offset + 1])) {
          x2 = v2[k2_offset + 1]
        } else {
          x2 = v2[k2_offset - 1] + 1
        }
        var y2 = x2 - k2
        while (
          x2 < text1_length &&
          y2 < text2_length &&
          text1.charAt(text1_length - x2 - 1) === text2.charAt(text2_length - y2 - 1)
        ) {
          x2++
          y2++
        }
        v2[k2_offset] = x2
        if (x2 > text1_length) {
          k2end += 2
        } else if (y2 > text2_length) {
          k2start += 2
        } else if (!front) {
          var k1_offset = v_offset + delta - k2
          if (k1_offset >= 0 && k1_offset < v_length && v1[k1_offset] !== -1) {
            var x1 = v1[k1_offset]
            var y1 = v_offset + x1 - k1_offset
            x2 = text1_length - x2
            if (x1 >= x2) {
              return diff_bisectSplit_(text1, text2, x1, y1)
            }
          }
        }
      }
    }
    return [
      [DIFF_DELETE, text1],
      [DIFF_INSERT, text2]
    ]
  }
  function diff_bisectSplit_(text1, text2, x, y) {
    var text1a = text1.substring(0, x)
    var text2a = text2.substring(0, y)
    var text1b = text1.substring(x)
    var text2b = text2.substring(y)
    var diffs = diff_main(text1a, text2a)
    var diffsb = diff_main(text1b, text2b)
    return diffs.concat(diffsb)
  }
  function diff_commonPrefix(text1, text2) {
    if (!text1 || !text2 || text1.charAt(0) !== text2.charAt(0)) {
      return 0
    }
    var pointermin = 0
    var pointermax = Math.min(text1.length, text2.length)
    var pointermid = pointermax
    var pointerstart = 0
    while (pointermin < pointermid) {
      if (text1.substring(pointerstart, pointermid) == text2.substring(pointerstart, pointermid)) {
        pointermin = pointermid
        pointerstart = pointermin
      } else {
        pointermax = pointermid
      }
      pointermid = Math.floor((pointermax - pointermin) / 2 + pointermin)
    }
    if (is_surrogate_pair_start(text1.charCodeAt(pointermid - 1))) {
      pointermid--
    }
    return pointermid
  }
  function diff_commonOverlap_(text1, text2) {
    var text1_length = text1.length
    var text2_length = text2.length
    if (text1_length == 0 || text2_length == 0) {
      return 0
    }
    if (text1_length > text2_length) {
      text1 = text1.substring(text1_length - text2_length)
    } else if (text1_length < text2_length) {
      text2 = text2.substring(0, text1_length)
    }
    var text_length = Math.min(text1_length, text2_length)
    if (text1 == text2) {
      return text_length
    }
    var best = 0
    var length = 1
    while (true) {
      var pattern = text1.substring(text_length - length)
      var found = text2.indexOf(pattern)
      if (found == -1) {
        return best
      }
      length += found
      if (found == 0 || text1.substring(text_length - length) == text2.substring(0, length)) {
        best = length
        length++
      }
    }
  }
  function diff_commonSuffix(text1, text2) {
    if (!text1 || !text2 || text1.slice(-1) !== text2.slice(-1)) {
      return 0
    }
    var pointermin = 0
    var pointermax = Math.min(text1.length, text2.length)
    var pointermid = pointermax
    var pointerend = 0
    while (pointermin < pointermid) {
      if (
        text1.substring(text1.length - pointermid, text1.length - pointerend) ==
        text2.substring(text2.length - pointermid, text2.length - pointerend)
      ) {
        pointermin = pointermid
        pointerend = pointermin
      } else {
        pointermax = pointermid
      }
      pointermid = Math.floor((pointermax - pointermin) / 2 + pointermin)
    }
    if (is_surrogate_pair_end(text1.charCodeAt(text1.length - pointermid))) {
      pointermid--
    }
    return pointermid
  }
  function diff_halfMatch_(text1, text2) {
    var longtext = text1.length > text2.length ? text1 : text2
    var shorttext = text1.length > text2.length ? text2 : text1
    if (longtext.length < 4 || shorttext.length * 2 < longtext.length) {
      return null
    }
    function diff_halfMatchI_(longtext2, shorttext2, i) {
      var seed = longtext2.substring(i, i + Math.floor(longtext2.length / 4))
      var j = -1
      var best_common = ''
      var best_longtext_a, best_longtext_b, best_shorttext_a, best_shorttext_b
      while ((j = shorttext2.indexOf(seed, j + 1)) !== -1) {
        var prefixLength = diff_commonPrefix(longtext2.substring(i), shorttext2.substring(j))
        var suffixLength = diff_commonSuffix(longtext2.substring(0, i), shorttext2.substring(0, j))
        if (best_common.length < suffixLength + prefixLength) {
          best_common =
            shorttext2.substring(j - suffixLength, j) + shorttext2.substring(j, j + prefixLength)
          best_longtext_a = longtext2.substring(0, i - suffixLength)
          best_longtext_b = longtext2.substring(i + prefixLength)
          best_shorttext_a = shorttext2.substring(0, j - suffixLength)
          best_shorttext_b = shorttext2.substring(j + prefixLength)
        }
      }
      if (best_common.length * 2 >= longtext2.length) {
        return [best_longtext_a, best_longtext_b, best_shorttext_a, best_shorttext_b, best_common]
      } else {
        return null
      }
    }
    var hm1 = diff_halfMatchI_(longtext, shorttext, Math.ceil(longtext.length / 4))
    var hm2 = diff_halfMatchI_(longtext, shorttext, Math.ceil(longtext.length / 2))
    var hm
    if (!hm1 && !hm2) {
      return null
    } else if (!hm2) {
      hm = hm1
    } else if (!hm1) {
      hm = hm2
    } else {
      hm = hm1[4].length > hm2[4].length ? hm1 : hm2
    }
    var text1_a, text1_b, text2_a, text2_b
    if (text1.length > text2.length) {
      text1_a = hm[0]
      text1_b = hm[1]
      text2_a = hm[2]
      text2_b = hm[3]
    } else {
      text2_a = hm[0]
      text2_b = hm[1]
      text1_a = hm[2]
      text1_b = hm[3]
    }
    var mid_common = hm[4]
    return [text1_a, text1_b, text2_a, text2_b, mid_common]
  }
  function diff_cleanupSemantic(diffs) {
    var changes = false
    var equalities = []
    var equalitiesLength = 0
    var lastequality = null
    var pointer = 0
    var length_insertions1 = 0
    var length_deletions1 = 0
    var length_insertions2 = 0
    var length_deletions2 = 0
    while (pointer < diffs.length) {
      if (diffs[pointer][0] == DIFF_EQUAL) {
        equalities[equalitiesLength++] = pointer
        length_insertions1 = length_insertions2
        length_deletions1 = length_deletions2
        length_insertions2 = 0
        length_deletions2 = 0
        lastequality = diffs[pointer][1]
      } else {
        if (diffs[pointer][0] == DIFF_INSERT) {
          length_insertions2 += diffs[pointer][1].length
        } else {
          length_deletions2 += diffs[pointer][1].length
        }
        if (
          lastequality &&
          lastequality.length <= Math.max(length_insertions1, length_deletions1) &&
          lastequality.length <= Math.max(length_insertions2, length_deletions2)
        ) {
          diffs.splice(equalities[equalitiesLength - 1], 0, [DIFF_DELETE, lastequality])
          diffs[equalities[equalitiesLength - 1] + 1][0] = DIFF_INSERT
          equalitiesLength--
          equalitiesLength--
          pointer = equalitiesLength > 0 ? equalities[equalitiesLength - 1] : -1
          length_insertions1 = 0
          length_deletions1 = 0
          length_insertions2 = 0
          length_deletions2 = 0
          lastequality = null
          changes = true
        }
      }
      pointer++
    }
    if (changes) {
      diff_cleanupMerge(diffs)
    }
    diff_cleanupSemanticLossless(diffs)
    pointer = 1
    while (pointer < diffs.length) {
      if (diffs[pointer - 1][0] == DIFF_DELETE && diffs[pointer][0] == DIFF_INSERT) {
        var deletion = diffs[pointer - 1][1]
        var insertion = diffs[pointer][1]
        var overlap_length1 = diff_commonOverlap_(deletion, insertion)
        var overlap_length2 = diff_commonOverlap_(insertion, deletion)
        if (overlap_length1 >= overlap_length2) {
          if (overlap_length1 >= deletion.length / 2 || overlap_length1 >= insertion.length / 2) {
            diffs.splice(pointer, 0, [DIFF_EQUAL, insertion.substring(0, overlap_length1)])
            diffs[pointer - 1][1] = deletion.substring(0, deletion.length - overlap_length1)
            diffs[pointer + 1][1] = insertion.substring(overlap_length1)
            pointer++
          }
        } else {
          if (overlap_length2 >= deletion.length / 2 || overlap_length2 >= insertion.length / 2) {
            diffs.splice(pointer, 0, [DIFF_EQUAL, deletion.substring(0, overlap_length2)])
            diffs[pointer - 1][0] = DIFF_INSERT
            diffs[pointer - 1][1] = insertion.substring(0, insertion.length - overlap_length2)
            diffs[pointer + 1][0] = DIFF_DELETE
            diffs[pointer + 1][1] = deletion.substring(overlap_length2)
            pointer++
          }
        }
        pointer++
      }
      pointer++
    }
  }
  var nonAlphaNumericRegex_ = /[^a-zA-Z0-9]/
  var whitespaceRegex_ = /\s/
  var linebreakRegex_ = /[\r\n]/
  var blanklineEndRegex_ = /\n\r?\n$/
  var blanklineStartRegex_ = /^\r?\n\r?\n/
  function diff_cleanupSemanticLossless(diffs) {
    function diff_cleanupSemanticScore_(one, two) {
      if (!one || !two) {
        return 6
      }
      var char1 = one.charAt(one.length - 1)
      var char2 = two.charAt(0)
      var nonAlphaNumeric1 = char1.match(nonAlphaNumericRegex_)
      var nonAlphaNumeric2 = char2.match(nonAlphaNumericRegex_)
      var whitespace1 = nonAlphaNumeric1 && char1.match(whitespaceRegex_)
      var whitespace2 = nonAlphaNumeric2 && char2.match(whitespaceRegex_)
      var lineBreak1 = whitespace1 && char1.match(linebreakRegex_)
      var lineBreak2 = whitespace2 && char2.match(linebreakRegex_)
      var blankLine1 = lineBreak1 && one.match(blanklineEndRegex_)
      var blankLine2 = lineBreak2 && two.match(blanklineStartRegex_)
      if (blankLine1 || blankLine2) {
        return 5
      } else if (lineBreak1 || lineBreak2) {
        return 4
      } else if (nonAlphaNumeric1 && !whitespace1 && whitespace2) {
        return 3
      } else if (whitespace1 || whitespace2) {
        return 2
      } else if (nonAlphaNumeric1 || nonAlphaNumeric2) {
        return 1
      }
      return 0
    }
    var pointer = 1
    while (pointer < diffs.length - 1) {
      if (diffs[pointer - 1][0] == DIFF_EQUAL && diffs[pointer + 1][0] == DIFF_EQUAL) {
        var equality1 = diffs[pointer - 1][1]
        var edit = diffs[pointer][1]
        var equality2 = diffs[pointer + 1][1]
        var commonOffset = diff_commonSuffix(equality1, edit)
        if (commonOffset) {
          var commonString = edit.substring(edit.length - commonOffset)
          equality1 = equality1.substring(0, equality1.length - commonOffset)
          edit = commonString + edit.substring(0, edit.length - commonOffset)
          equality2 = commonString + equality2
        }
        var bestEquality1 = equality1
        var bestEdit = edit
        var bestEquality2 = equality2
        var bestScore =
          diff_cleanupSemanticScore_(equality1, edit) + diff_cleanupSemanticScore_(edit, equality2)
        while (edit.charAt(0) === equality2.charAt(0)) {
          equality1 += edit.charAt(0)
          edit = edit.substring(1) + equality2.charAt(0)
          equality2 = equality2.substring(1)
          var score =
            diff_cleanupSemanticScore_(equality1, edit) +
            diff_cleanupSemanticScore_(edit, equality2)
          if (score >= bestScore) {
            bestScore = score
            bestEquality1 = equality1
            bestEdit = edit
            bestEquality2 = equality2
          }
        }
        if (diffs[pointer - 1][1] != bestEquality1) {
          if (bestEquality1) {
            diffs[pointer - 1][1] = bestEquality1
          } else {
            diffs.splice(pointer - 1, 1)
            pointer--
          }
          diffs[pointer][1] = bestEdit
          if (bestEquality2) {
            diffs[pointer + 1][1] = bestEquality2
          } else {
            diffs.splice(pointer + 1, 1)
            pointer--
          }
        }
      }
      pointer++
    }
  }
  function diff_cleanupMerge(diffs, fix_unicode) {
    diffs.push([DIFF_EQUAL, ''])
    var pointer = 0
    var count_delete = 0
    var count_insert = 0
    var text_delete = ''
    var text_insert = ''
    var commonlength
    while (pointer < diffs.length) {
      if (pointer < diffs.length - 1 && !diffs[pointer][1]) {
        diffs.splice(pointer, 1)
        continue
      }
      switch (diffs[pointer][0]) {
        case DIFF_INSERT:
          count_insert++
          text_insert += diffs[pointer][1]
          pointer++
          break
        case DIFF_DELETE:
          count_delete++
          text_delete += diffs[pointer][1]
          pointer++
          break
        case DIFF_EQUAL:
          var previous_equality = pointer - count_insert - count_delete - 1
          if (fix_unicode) {
            if (previous_equality >= 0 && ends_with_pair_start(diffs[previous_equality][1])) {
              var stray = diffs[previous_equality][1].slice(-1)
              diffs[previous_equality][1] = diffs[previous_equality][1].slice(0, -1)
              text_delete = stray + text_delete
              text_insert = stray + text_insert
              if (!diffs[previous_equality][1]) {
                diffs.splice(previous_equality, 1)
                pointer--
                var k = previous_equality - 1
                if (diffs[k] && diffs[k][0] === DIFF_INSERT) {
                  count_insert++
                  text_insert = diffs[k][1] + text_insert
                  k--
                }
                if (diffs[k] && diffs[k][0] === DIFF_DELETE) {
                  count_delete++
                  text_delete = diffs[k][1] + text_delete
                  k--
                }
                previous_equality = k
              }
            }
            if (starts_with_pair_end(diffs[pointer][1])) {
              var stray = diffs[pointer][1].charAt(0)
              diffs[pointer][1] = diffs[pointer][1].slice(1)
              text_delete += stray
              text_insert += stray
            }
          }
          if (pointer < diffs.length - 1 && !diffs[pointer][1]) {
            diffs.splice(pointer, 1)
            break
          }
          if (text_delete.length > 0 || text_insert.length > 0) {
            if (text_delete.length > 0 && text_insert.length > 0) {
              commonlength = diff_commonPrefix(text_insert, text_delete)
              if (commonlength !== 0) {
                if (previous_equality >= 0) {
                  diffs[previous_equality][1] += text_insert.substring(0, commonlength)
                } else {
                  diffs.splice(0, 0, [DIFF_EQUAL, text_insert.substring(0, commonlength)])
                  pointer++
                }
                text_insert = text_insert.substring(commonlength)
                text_delete = text_delete.substring(commonlength)
              }
              commonlength = diff_commonSuffix(text_insert, text_delete)
              if (commonlength !== 0) {
                diffs[pointer][1] =
                  text_insert.substring(text_insert.length - commonlength) + diffs[pointer][1]
                text_insert = text_insert.substring(0, text_insert.length - commonlength)
                text_delete = text_delete.substring(0, text_delete.length - commonlength)
              }
            }
            var n = count_insert + count_delete
            if (text_delete.length === 0 && text_insert.length === 0) {
              diffs.splice(pointer - n, n)
              pointer = pointer - n
            } else if (text_delete.length === 0) {
              diffs.splice(pointer - n, n, [DIFF_INSERT, text_insert])
              pointer = pointer - n + 1
            } else if (text_insert.length === 0) {
              diffs.splice(pointer - n, n, [DIFF_DELETE, text_delete])
              pointer = pointer - n + 1
            } else {
              diffs.splice(pointer - n, n, [DIFF_DELETE, text_delete], [DIFF_INSERT, text_insert])
              pointer = pointer - n + 2
            }
          }
          if (pointer !== 0 && diffs[pointer - 1][0] === DIFF_EQUAL) {
            diffs[pointer - 1][1] += diffs[pointer][1]
            diffs.splice(pointer, 1)
          } else {
            pointer++
          }
          count_insert = 0
          count_delete = 0
          text_delete = ''
          text_insert = ''
          break
      }
    }
    if (diffs[diffs.length - 1][1] === '') {
      diffs.pop()
    }
    var changes = false
    pointer = 1
    while (pointer < diffs.length - 1) {
      if (diffs[pointer - 1][0] === DIFF_EQUAL && diffs[pointer + 1][0] === DIFF_EQUAL) {
        if (
          diffs[pointer][1].substring(diffs[pointer][1].length - diffs[pointer - 1][1].length) ===
          diffs[pointer - 1][1]
        ) {
          diffs[pointer][1] =
            diffs[pointer - 1][1] +
            diffs[pointer][1].substring(0, diffs[pointer][1].length - diffs[pointer - 1][1].length)
          diffs[pointer + 1][1] = diffs[pointer - 1][1] + diffs[pointer + 1][1]
          diffs.splice(pointer - 1, 1)
          changes = true
        } else if (
          diffs[pointer][1].substring(0, diffs[pointer + 1][1].length) == diffs[pointer + 1][1]
        ) {
          diffs[pointer - 1][1] += diffs[pointer + 1][1]
          diffs[pointer][1] =
            diffs[pointer][1].substring(diffs[pointer + 1][1].length) + diffs[pointer + 1][1]
          diffs.splice(pointer + 1, 1)
          changes = true
        }
      }
      pointer++
    }
    if (changes) {
      diff_cleanupMerge(diffs, fix_unicode)
    }
  }
  function is_surrogate_pair_start(charCode) {
    return charCode >= 55296 && charCode <= 56319
  }
  function is_surrogate_pair_end(charCode) {
    return charCode >= 56320 && charCode <= 57343
  }
  function starts_with_pair_end(str) {
    return is_surrogate_pair_end(str.charCodeAt(0))
  }
  function ends_with_pair_start(str) {
    return is_surrogate_pair_start(str.charCodeAt(str.length - 1))
  }
  function remove_empty_tuples(tuples) {
    var ret = []
    for (var i = 0; i < tuples.length; i++) {
      if (tuples[i][1].length > 0) {
        ret.push(tuples[i])
      }
    }
    return ret
  }
  function make_edit_splice(before, oldMiddle, newMiddle, after) {
    if (ends_with_pair_start(before) || starts_with_pair_end(after)) {
      return null
    }
    return remove_empty_tuples([
      [DIFF_EQUAL, before],
      [DIFF_DELETE, oldMiddle],
      [DIFF_INSERT, newMiddle],
      [DIFF_EQUAL, after]
    ])
  }
  function find_cursor_edit_diff(oldText, newText, cursor_pos) {
    var oldRange =
      typeof cursor_pos === 'number' ? { index: cursor_pos, length: 0 } : cursor_pos.oldRange
    var newRange = typeof cursor_pos === 'number' ? null : cursor_pos.newRange
    var oldLength = oldText.length
    var newLength = newText.length
    if (oldRange.length === 0 && (newRange === null || newRange.length === 0)) {
      var oldCursor = oldRange.index
      var oldBefore = oldText.slice(0, oldCursor)
      var oldAfter = oldText.slice(oldCursor)
      var maybeNewCursor = newRange ? newRange.index : null
      editBefore: {
        var newCursor = oldCursor + newLength - oldLength
        if (maybeNewCursor !== null && maybeNewCursor !== newCursor) {
          break editBefore
        }
        if (newCursor < 0 || newCursor > newLength) {
          break editBefore
        }
        var newBefore = newText.slice(0, newCursor)
        var newAfter = newText.slice(newCursor)
        if (newAfter !== oldAfter) {
          break editBefore
        }
        var prefixLength = Math.min(oldCursor, newCursor)
        var oldPrefix = oldBefore.slice(0, prefixLength)
        var newPrefix = newBefore.slice(0, prefixLength)
        if (oldPrefix !== newPrefix) {
          break editBefore
        }
        var oldMiddle = oldBefore.slice(prefixLength)
        var newMiddle = newBefore.slice(prefixLength)
        return make_edit_splice(oldPrefix, oldMiddle, newMiddle, oldAfter)
      }
      editAfter: {
        if (maybeNewCursor !== null && maybeNewCursor !== oldCursor) {
          break editAfter
        }
        var cursor = oldCursor
        var newBefore = newText.slice(0, cursor)
        var newAfter = newText.slice(cursor)
        if (newBefore !== oldBefore) {
          break editAfter
        }
        var suffixLength = Math.min(oldLength - cursor, newLength - cursor)
        var oldSuffix = oldAfter.slice(oldAfter.length - suffixLength)
        var newSuffix = newAfter.slice(newAfter.length - suffixLength)
        if (oldSuffix !== newSuffix) {
          break editAfter
        }
        var oldMiddle = oldAfter.slice(0, oldAfter.length - suffixLength)
        var newMiddle = newAfter.slice(0, newAfter.length - suffixLength)
        return make_edit_splice(oldBefore, oldMiddle, newMiddle, oldSuffix)
      }
    }
    if (oldRange.length > 0 && newRange && newRange.length === 0) {
      replaceRange: {
        var oldPrefix = oldText.slice(0, oldRange.index)
        var oldSuffix = oldText.slice(oldRange.index + oldRange.length)
        var prefixLength = oldPrefix.length
        var suffixLength = oldSuffix.length
        if (newLength < prefixLength + suffixLength) {
          break replaceRange
        }
        var newPrefix = newText.slice(0, prefixLength)
        var newSuffix = newText.slice(newLength - suffixLength)
        if (oldPrefix !== newPrefix || oldSuffix !== newSuffix) {
          break replaceRange
        }
        var oldMiddle = oldText.slice(prefixLength, oldLength - suffixLength)
        var newMiddle = newText.slice(prefixLength, newLength - suffixLength)
        return make_edit_splice(oldPrefix, oldMiddle, newMiddle, oldSuffix)
      }
    }
    return null
  }
  function diff(text1, text2, cursor_pos, cleanup) {
    return diff_main(text1, text2, cursor_pos, cleanup, true)
  }
  diff.INSERT = DIFF_INSERT
  diff.DELETE = DIFF_DELETE
  diff.EQUAL = DIFF_EQUAL
  diff_1 = diff
  return diff_1
}
var lodash_clonedeep = { exports: {} }
lodash_clonedeep.exports
var hasRequiredLodash_clonedeep
function requireLodash_clonedeep() {
  if (hasRequiredLodash_clonedeep) return lodash_clonedeep.exports
  hasRequiredLodash_clonedeep = 1
  ;(function (module, exports) {
    var LARGE_ARRAY_SIZE = 200
    var HASH_UNDEFINED = '__lodash_hash_undefined__'
    var MAX_SAFE_INTEGER = 9007199254740991
    var argsTag2 = '[object Arguments]',
      arrayTag2 = '[object Array]',
      boolTag2 = '[object Boolean]',
      dateTag2 = '[object Date]',
      errorTag2 = '[object Error]',
      funcTag2 = '[object Function]',
      genTag2 = '[object GeneratorFunction]',
      mapTag2 = '[object Map]',
      numberTag2 = '[object Number]',
      objectTag2 = '[object Object]',
      promiseTag = '[object Promise]',
      regexpTag2 = '[object RegExp]',
      setTag2 = '[object Set]',
      stringTag2 = '[object String]',
      symbolTag2 = '[object Symbol]',
      weakMapTag2 = '[object WeakMap]'
    var arrayBufferTag2 = '[object ArrayBuffer]',
      dataViewTag2 = '[object DataView]',
      float32Tag2 = '[object Float32Array]',
      float64Tag2 = '[object Float64Array]',
      int8Tag2 = '[object Int8Array]',
      int16Tag2 = '[object Int16Array]',
      int32Tag2 = '[object Int32Array]',
      uint8Tag2 = '[object Uint8Array]',
      uint8ClampedTag2 = '[object Uint8ClampedArray]',
      uint16Tag2 = '[object Uint16Array]',
      uint32Tag2 = '[object Uint32Array]'
    var reRegExpChar = /[\\^$.*+?()[\]{}|]/g
    var reFlags2 = /\w*$/
    var reIsHostCtor = /^\[object .+?Constructor\]$/
    var reIsUint = /^(?:0|[1-9]\d*)$/
    var cloneableTags2 = {}
    cloneableTags2[argsTag2] =
      cloneableTags2[arrayTag2] =
      cloneableTags2[arrayBufferTag2] =
      cloneableTags2[dataViewTag2] =
      cloneableTags2[boolTag2] =
      cloneableTags2[dateTag2] =
      cloneableTags2[float32Tag2] =
      cloneableTags2[float64Tag2] =
      cloneableTags2[int8Tag2] =
      cloneableTags2[int16Tag2] =
      cloneableTags2[int32Tag2] =
      cloneableTags2[mapTag2] =
      cloneableTags2[numberTag2] =
      cloneableTags2[objectTag2] =
      cloneableTags2[regexpTag2] =
      cloneableTags2[setTag2] =
      cloneableTags2[stringTag2] =
      cloneableTags2[symbolTag2] =
      cloneableTags2[uint8Tag2] =
      cloneableTags2[uint8ClampedTag2] =
      cloneableTags2[uint16Tag2] =
      cloneableTags2[uint32Tag2] =
        true
    cloneableTags2[errorTag2] = cloneableTags2[funcTag2] = cloneableTags2[weakMapTag2] = false
    var freeGlobal =
      typeof commonjsGlobal == 'object' &&
      commonjsGlobal &&
      commonjsGlobal.Object === Object &&
      commonjsGlobal
    var freeSelf = typeof self == 'object' && self && self.Object === Object && self
    var root = freeGlobal || freeSelf || Function('return this')()
    var freeExports = exports && !exports.nodeType && exports
    var freeModule = freeExports && true && module && !module.nodeType && module
    var moduleExports = freeModule && freeModule.exports === freeExports
    function addMapEntry(map, pair) {
      map.set(pair[0], pair[1])
      return map
    }
    function addSetEntry(set, value) {
      set.add(value)
      return set
    }
    function arrayEach2(array, iteratee) {
      var index2 = -1,
        length = array ? array.length : 0
      while (++index2 < length) {
        if (iteratee(array[index2], index2, array) === false) {
          break
        }
      }
      return array
    }
    function arrayPush(array, values) {
      var index2 = -1,
        length = values.length,
        offset = array.length
      while (++index2 < length) {
        array[offset + index2] = values[index2]
      }
      return array
    }
    function arrayReduce(array, iteratee, accumulator, initAccum) {
      var index2 = -1,
        length = array ? array.length : 0
      while (++index2 < length) {
        accumulator = iteratee(accumulator, array[index2], index2, array)
      }
      return accumulator
    }
    function baseTimes(n, iteratee) {
      var index2 = -1,
        result = Array(n)
      while (++index2 < n) {
        result[index2] = iteratee(index2)
      }
      return result
    }
    function getValue(object, key) {
      return object == null ? void 0 : object[key]
    }
    function isHostObject(value) {
      var result = false
      if (value != null && typeof value.toString != 'function') {
        try {
          result = !!(value + '')
        } catch (e) {}
      }
      return result
    }
    function mapToArray(map) {
      var index2 = -1,
        result = Array(map.size)
      map.forEach(function (value, key) {
        result[++index2] = [key, value]
      })
      return result
    }
    function overArg(func, transform) {
      return function (arg) {
        return func(transform(arg))
      }
    }
    function setToArray(set) {
      var index2 = -1,
        result = Array(set.size)
      set.forEach(function (value) {
        result[++index2] = value
      })
      return result
    }
    var arrayProto = Array.prototype,
      funcProto = Function.prototype,
      objectProto2 = Object.prototype
    var coreJsData = root['__core-js_shared__']
    var maskSrcKey = (function () {
      var uid = /[^.]+$/.exec((coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO) || '')
      return uid ? 'Symbol(src)_1.' + uid : ''
    })()
    var funcToString = funcProto.toString
    var hasOwnProperty2 = objectProto2.hasOwnProperty
    var objectToString = objectProto2.toString
    var reIsNative = RegExp(
      '^' +
        funcToString
          .call(hasOwnProperty2)
          .replace(reRegExpChar, '\\$&')
          .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') +
        '$'
    )
    var Buffer = moduleExports ? root.Buffer : void 0,
      Symbol2 = root.Symbol,
      Uint8Array2 = root.Uint8Array,
      getPrototype = overArg(Object.getPrototypeOf, Object),
      objectCreate = Object.create,
      propertyIsEnumerable = objectProto2.propertyIsEnumerable,
      splice = arrayProto.splice
    var nativeGetSymbols = Object.getOwnPropertySymbols,
      nativeIsBuffer = Buffer ? Buffer.isBuffer : void 0,
      nativeKeys = overArg(Object.keys, Object)
    var DataView2 = getNative(root, 'DataView'),
      Map = getNative(root, 'Map'),
      Promise2 = getNative(root, 'Promise'),
      Set = getNative(root, 'Set'),
      WeakMap2 = getNative(root, 'WeakMap'),
      nativeCreate = getNative(Object, 'create')
    var dataViewCtorString = toSource(DataView2),
      mapCtorString = toSource(Map),
      promiseCtorString = toSource(Promise2),
      setCtorString = toSource(Set),
      weakMapCtorString = toSource(WeakMap2)
    var symbolProto2 = Symbol2 ? Symbol2.prototype : void 0,
      symbolValueOf2 = symbolProto2 ? symbolProto2.valueOf : void 0
    function Hash(entries) {
      var index2 = -1,
        length = entries ? entries.length : 0
      this.clear()
      while (++index2 < length) {
        var entry = entries[index2]
        this.set(entry[0], entry[1])
      }
    }
    function hashClear() {
      this.__data__ = nativeCreate ? nativeCreate(null) : {}
    }
    function hashDelete(key) {
      return this.has(key) && delete this.__data__[key]
    }
    function hashGet(key) {
      var data = this.__data__
      if (nativeCreate) {
        var result = data[key]
        return result === HASH_UNDEFINED ? void 0 : result
      }
      return hasOwnProperty2.call(data, key) ? data[key] : void 0
    }
    function hashHas(key) {
      var data = this.__data__
      return nativeCreate ? data[key] !== void 0 : hasOwnProperty2.call(data, key)
    }
    function hashSet(key, value) {
      var data = this.__data__
      data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value
      return this
    }
    Hash.prototype.clear = hashClear
    Hash.prototype['delete'] = hashDelete
    Hash.prototype.get = hashGet
    Hash.prototype.has = hashHas
    Hash.prototype.set = hashSet
    function ListCache(entries) {
      var index2 = -1,
        length = entries ? entries.length : 0
      this.clear()
      while (++index2 < length) {
        var entry = entries[index2]
        this.set(entry[0], entry[1])
      }
    }
    function listCacheClear() {
      this.__data__ = []
    }
    function listCacheDelete(key) {
      var data = this.__data__,
        index2 = assocIndexOf(data, key)
      if (index2 < 0) {
        return false
      }
      var lastIndex = data.length - 1
      if (index2 == lastIndex) {
        data.pop()
      } else {
        splice.call(data, index2, 1)
      }
      return true
    }
    function listCacheGet(key) {
      var data = this.__data__,
        index2 = assocIndexOf(data, key)
      return index2 < 0 ? void 0 : data[index2][1]
    }
    function listCacheHas(key) {
      return assocIndexOf(this.__data__, key) > -1
    }
    function listCacheSet(key, value) {
      var data = this.__data__,
        index2 = assocIndexOf(data, key)
      if (index2 < 0) {
        data.push([key, value])
      } else {
        data[index2][1] = value
      }
      return this
    }
    ListCache.prototype.clear = listCacheClear
    ListCache.prototype['delete'] = listCacheDelete
    ListCache.prototype.get = listCacheGet
    ListCache.prototype.has = listCacheHas
    ListCache.prototype.set = listCacheSet
    function MapCache(entries) {
      var index2 = -1,
        length = entries ? entries.length : 0
      this.clear()
      while (++index2 < length) {
        var entry = entries[index2]
        this.set(entry[0], entry[1])
      }
    }
    function mapCacheClear() {
      this.__data__ = {
        hash: new Hash(),
        map: new (Map || ListCache)(),
        string: new Hash()
      }
    }
    function mapCacheDelete(key) {
      return getMapData(this, key)['delete'](key)
    }
    function mapCacheGet(key) {
      return getMapData(this, key).get(key)
    }
    function mapCacheHas(key) {
      return getMapData(this, key).has(key)
    }
    function mapCacheSet(key, value) {
      getMapData(this, key).set(key, value)
      return this
    }
    MapCache.prototype.clear = mapCacheClear
    MapCache.prototype['delete'] = mapCacheDelete
    MapCache.prototype.get = mapCacheGet
    MapCache.prototype.has = mapCacheHas
    MapCache.prototype.set = mapCacheSet
    function Stack2(entries) {
      this.__data__ = new ListCache(entries)
    }
    function stackClear() {
      this.__data__ = new ListCache()
    }
    function stackDelete(key) {
      return this.__data__['delete'](key)
    }
    function stackGet(key) {
      return this.__data__.get(key)
    }
    function stackHas(key) {
      return this.__data__.has(key)
    }
    function stackSet(key, value) {
      var cache = this.__data__
      if (cache instanceof ListCache) {
        var pairs = cache.__data__
        if (!Map || pairs.length < LARGE_ARRAY_SIZE - 1) {
          pairs.push([key, value])
          return this
        }
        cache = this.__data__ = new MapCache(pairs)
      }
      cache.set(key, value)
      return this
    }
    Stack2.prototype.clear = stackClear
    Stack2.prototype['delete'] = stackDelete
    Stack2.prototype.get = stackGet
    Stack2.prototype.has = stackHas
    Stack2.prototype.set = stackSet
    function arrayLikeKeys(value, inherited) {
      var result = isArray2(value) || isArguments(value) ? baseTimes(value.length, String) : []
      var length = result.length,
        skipIndexes = !!length
      for (var key in value) {
        if (
          hasOwnProperty2.call(value, key) &&
          !(skipIndexes && (key == 'length' || isIndex(key, length)))
        ) {
          result.push(key)
        }
      }
      return result
    }
    function assignValue2(object, key, value) {
      var objValue = object[key]
      if (
        !(hasOwnProperty2.call(object, key) && eq(objValue, value)) ||
        (value === void 0 && !(key in object))
      ) {
        object[key] = value
      }
    }
    function assocIndexOf(array, key) {
      var length = array.length
      while (length--) {
        if (eq(array[length][0], key)) {
          return length
        }
      }
      return -1
    }
    function baseAssign(object, source) {
      return object && copyObject(source, keys(source), object)
    }
    function baseClone2(value, isDeep, isFull, customizer, key, object, stack) {
      var result
      if (customizer) {
        result = object ? customizer(value, key, object, stack) : customizer(value)
      }
      if (result !== void 0) {
        return result
      }
      if (!isObject2(value)) {
        return value
      }
      var isArr = isArray2(value)
      if (isArr) {
        result = initCloneArray2(value)
        if (!isDeep) {
          return copyArray(value, result)
        }
      } else {
        var tag = getTag2(value),
          isFunc = tag == funcTag2 || tag == genTag2
        if (isBuffer2(value)) {
          return cloneBuffer2(value, isDeep)
        }
        if (tag == objectTag2 || tag == argsTag2 || (isFunc && !object)) {
          if (isHostObject(value)) {
            return object ? value : {}
          }
          result = initCloneObject2(isFunc ? {} : value)
          if (!isDeep) {
            return copySymbols(value, baseAssign(result, value))
          }
        } else {
          if (!cloneableTags2[tag]) {
            return object ? value : {}
          }
          result = initCloneByTag2(value, tag, baseClone2, isDeep)
        }
      }
      stack || (stack = new Stack2())
      var stacked = stack.get(value)
      if (stacked) {
        return stacked
      }
      stack.set(value, result)
      if (!isArr) {
        var props = isFull ? getAllKeys2(value) : keys(value)
      }
      arrayEach2(props || value, function (subValue, key2) {
        if (props) {
          key2 = subValue
          subValue = value[key2]
        }
        assignValue2(
          result,
          key2,
          baseClone2(subValue, isDeep, isFull, customizer, key2, value, stack)
        )
      })
      return result
    }
    function baseCreate(proto) {
      return isObject2(proto) ? objectCreate(proto) : {}
    }
    function baseGetAllKeys(object, keysFunc, symbolsFunc) {
      var result = keysFunc(object)
      return isArray2(object) ? result : arrayPush(result, symbolsFunc(object))
    }
    function baseGetTag(value) {
      return objectToString.call(value)
    }
    function baseIsNative(value) {
      if (!isObject2(value) || isMasked(value)) {
        return false
      }
      var pattern = isFunction(value) || isHostObject(value) ? reIsNative : reIsHostCtor
      return pattern.test(toSource(value))
    }
    function baseKeys(object) {
      if (!isPrototype(object)) {
        return nativeKeys(object)
      }
      var result = []
      for (var key in Object(object)) {
        if (hasOwnProperty2.call(object, key) && key != 'constructor') {
          result.push(key)
        }
      }
      return result
    }
    function cloneBuffer2(buffer, isDeep) {
      if (isDeep) {
        return buffer.slice()
      }
      var result = new buffer.constructor(buffer.length)
      buffer.copy(result)
      return result
    }
    function cloneArrayBuffer2(arrayBuffer) {
      var result = new arrayBuffer.constructor(arrayBuffer.byteLength)
      new Uint8Array2(result).set(new Uint8Array2(arrayBuffer))
      return result
    }
    function cloneDataView2(dataView, isDeep) {
      var buffer = isDeep ? cloneArrayBuffer2(dataView.buffer) : dataView.buffer
      return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength)
    }
    function cloneMap(map, isDeep, cloneFunc) {
      var array = isDeep ? cloneFunc(mapToArray(map), true) : mapToArray(map)
      return arrayReduce(array, addMapEntry, new map.constructor())
    }
    function cloneRegExp2(regexp) {
      var result = new regexp.constructor(regexp.source, reFlags2.exec(regexp))
      result.lastIndex = regexp.lastIndex
      return result
    }
    function cloneSet(set, isDeep, cloneFunc) {
      var array = isDeep ? cloneFunc(setToArray(set), true) : setToArray(set)
      return arrayReduce(array, addSetEntry, new set.constructor())
    }
    function cloneSymbol2(symbol) {
      return symbolValueOf2 ? Object(symbolValueOf2.call(symbol)) : {}
    }
    function cloneTypedArray2(typedArray, isDeep) {
      var buffer = isDeep ? cloneArrayBuffer2(typedArray.buffer) : typedArray.buffer
      return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length)
    }
    function copyArray(source, array) {
      var index2 = -1,
        length = source.length
      array || (array = Array(length))
      while (++index2 < length) {
        array[index2] = source[index2]
      }
      return array
    }
    function copyObject(source, props, object, customizer) {
      object || (object = {})
      var index2 = -1,
        length = props.length
      while (++index2 < length) {
        var key = props[index2]
        var newValue = void 0
        assignValue2(object, key, newValue === void 0 ? source[key] : newValue)
      }
      return object
    }
    function copySymbols(source, object) {
      return copyObject(source, getSymbols(source), object)
    }
    function getAllKeys2(object) {
      return baseGetAllKeys(object, keys, getSymbols)
    }
    function getMapData(map, key) {
      var data = map.__data__
      return isKeyable(key) ? data[typeof key == 'string' ? 'string' : 'hash'] : data.map
    }
    function getNative(object, key) {
      var value = getValue(object, key)
      return baseIsNative(value) ? value : void 0
    }
    var getSymbols = nativeGetSymbols ? overArg(nativeGetSymbols, Object) : stubArray
    var getTag2 = baseGetTag
    if (
      (DataView2 && getTag2(new DataView2(new ArrayBuffer(1))) != dataViewTag2) ||
      (Map && getTag2(new Map()) != mapTag2) ||
      (Promise2 && getTag2(Promise2.resolve()) != promiseTag) ||
      (Set && getTag2(new Set()) != setTag2) ||
      (WeakMap2 && getTag2(new WeakMap2()) != weakMapTag2)
    ) {
      getTag2 = function (value) {
        var result = objectToString.call(value),
          Ctor = result == objectTag2 ? value.constructor : void 0,
          ctorString = Ctor ? toSource(Ctor) : void 0
        if (ctorString) {
          switch (ctorString) {
            case dataViewCtorString:
              return dataViewTag2
            case mapCtorString:
              return mapTag2
            case promiseCtorString:
              return promiseTag
            case setCtorString:
              return setTag2
            case weakMapCtorString:
              return weakMapTag2
          }
        }
        return result
      }
    }
    function initCloneArray2(array) {
      var length = array.length,
        result = array.constructor(length)
      if (length && typeof array[0] == 'string' && hasOwnProperty2.call(array, 'index')) {
        result.index = array.index
        result.input = array.input
      }
      return result
    }
    function initCloneObject2(object) {
      return typeof object.constructor == 'function' && !isPrototype(object)
        ? baseCreate(getPrototype(object))
        : {}
    }
    function initCloneByTag2(object, tag, cloneFunc, isDeep) {
      var Ctor = object.constructor
      switch (tag) {
        case arrayBufferTag2:
          return cloneArrayBuffer2(object)
        case boolTag2:
        case dateTag2:
          return new Ctor(+object)
        case dataViewTag2:
          return cloneDataView2(object, isDeep)
        case float32Tag2:
        case float64Tag2:
        case int8Tag2:
        case int16Tag2:
        case int32Tag2:
        case uint8Tag2:
        case uint8ClampedTag2:
        case uint16Tag2:
        case uint32Tag2:
          return cloneTypedArray2(object, isDeep)
        case mapTag2:
          return cloneMap(object, isDeep, cloneFunc)
        case numberTag2:
        case stringTag2:
          return new Ctor(object)
        case regexpTag2:
          return cloneRegExp2(object)
        case setTag2:
          return cloneSet(object, isDeep, cloneFunc)
        case symbolTag2:
          return cloneSymbol2(object)
      }
    }
    function isIndex(value, length) {
      length = length == null ? MAX_SAFE_INTEGER : length
      return (
        !!length &&
        (typeof value == 'number' || reIsUint.test(value)) &&
        value > -1 &&
        value % 1 == 0 &&
        value < length
      )
    }
    function isKeyable(value) {
      var type = typeof value
      return type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean'
        ? value !== '__proto__'
        : value === null
    }
    function isMasked(func) {
      return !!maskSrcKey && maskSrcKey in func
    }
    function isPrototype(value) {
      var Ctor = value && value.constructor,
        proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto2
      return value === proto
    }
    function toSource(func) {
      if (func != null) {
        try {
          return funcToString.call(func)
        } catch (e) {}
        try {
          return func + ''
        } catch (e) {}
      }
      return ''
    }
    function cloneDeep2(value) {
      return baseClone2(value, true, true)
    }
    function eq(value, other) {
      return value === other || (value !== value && other !== other)
    }
    function isArguments(value) {
      return (
        isArrayLikeObject(value) &&
        hasOwnProperty2.call(value, 'callee') &&
        (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag2)
      )
    }
    var isArray2 = Array.isArray
    function isArrayLike(value) {
      return value != null && isLength(value.length) && !isFunction(value)
    }
    function isArrayLikeObject(value) {
      return isObjectLike2(value) && isArrayLike(value)
    }
    var isBuffer2 = nativeIsBuffer || stubFalse
    function isFunction(value) {
      var tag = isObject2(value) ? objectToString.call(value) : ''
      return tag == funcTag2 || tag == genTag2
    }
    function isLength(value) {
      return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER
    }
    function isObject2(value) {
      var type = typeof value
      return !!value && (type == 'object' || type == 'function')
    }
    function isObjectLike2(value) {
      return !!value && typeof value == 'object'
    }
    function keys(object) {
      return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object)
    }
    function stubArray() {
      return []
    }
    function stubFalse() {
      return false
    }
    module.exports = cloneDeep2
  })(lodash_clonedeep, lodash_clonedeep.exports)
  return lodash_clonedeep.exports
}
var lodash_isequal = { exports: {} }
lodash_isequal.exports
var hasRequiredLodash_isequal
function requireLodash_isequal() {
  if (hasRequiredLodash_isequal) return lodash_isequal.exports
  hasRequiredLodash_isequal = 1
  ;(function (module, exports) {
    var LARGE_ARRAY_SIZE = 200
    var HASH_UNDEFINED = '__lodash_hash_undefined__'
    var COMPARE_PARTIAL_FLAG = 1,
      COMPARE_UNORDERED_FLAG = 2
    var MAX_SAFE_INTEGER = 9007199254740991
    var argsTag2 = '[object Arguments]',
      arrayTag2 = '[object Array]',
      asyncTag = '[object AsyncFunction]',
      boolTag2 = '[object Boolean]',
      dateTag2 = '[object Date]',
      errorTag2 = '[object Error]',
      funcTag2 = '[object Function]',
      genTag2 = '[object GeneratorFunction]',
      mapTag2 = '[object Map]',
      numberTag2 = '[object Number]',
      nullTag = '[object Null]',
      objectTag2 = '[object Object]',
      promiseTag = '[object Promise]',
      proxyTag = '[object Proxy]',
      regexpTag2 = '[object RegExp]',
      setTag2 = '[object Set]',
      stringTag2 = '[object String]',
      symbolTag2 = '[object Symbol]',
      undefinedTag = '[object Undefined]',
      weakMapTag2 = '[object WeakMap]'
    var arrayBufferTag2 = '[object ArrayBuffer]',
      dataViewTag2 = '[object DataView]',
      float32Tag2 = '[object Float32Array]',
      float64Tag2 = '[object Float64Array]',
      int8Tag2 = '[object Int8Array]',
      int16Tag2 = '[object Int16Array]',
      int32Tag2 = '[object Int32Array]',
      uint8Tag2 = '[object Uint8Array]',
      uint8ClampedTag2 = '[object Uint8ClampedArray]',
      uint16Tag2 = '[object Uint16Array]',
      uint32Tag2 = '[object Uint32Array]'
    var reRegExpChar = /[\\^$.*+?()[\]{}|]/g
    var reIsHostCtor = /^\[object .+?Constructor\]$/
    var reIsUint = /^(?:0|[1-9]\d*)$/
    var typedArrayTags = {}
    typedArrayTags[float32Tag2] =
      typedArrayTags[float64Tag2] =
      typedArrayTags[int8Tag2] =
      typedArrayTags[int16Tag2] =
      typedArrayTags[int32Tag2] =
      typedArrayTags[uint8Tag2] =
      typedArrayTags[uint8ClampedTag2] =
      typedArrayTags[uint16Tag2] =
      typedArrayTags[uint32Tag2] =
        true
    typedArrayTags[argsTag2] =
      typedArrayTags[arrayTag2] =
      typedArrayTags[arrayBufferTag2] =
      typedArrayTags[boolTag2] =
      typedArrayTags[dataViewTag2] =
      typedArrayTags[dateTag2] =
      typedArrayTags[errorTag2] =
      typedArrayTags[funcTag2] =
      typedArrayTags[mapTag2] =
      typedArrayTags[numberTag2] =
      typedArrayTags[objectTag2] =
      typedArrayTags[regexpTag2] =
      typedArrayTags[setTag2] =
      typedArrayTags[stringTag2] =
      typedArrayTags[weakMapTag2] =
        false
    var freeGlobal =
      typeof commonjsGlobal == 'object' &&
      commonjsGlobal &&
      commonjsGlobal.Object === Object &&
      commonjsGlobal
    var freeSelf = typeof self == 'object' && self && self.Object === Object && self
    var root = freeGlobal || freeSelf || Function('return this')()
    var freeExports = exports && !exports.nodeType && exports
    var freeModule = freeExports && true && module && !module.nodeType && module
    var moduleExports = freeModule && freeModule.exports === freeExports
    var freeProcess = moduleExports && freeGlobal.process
    var nodeUtil2 = (function () {
      try {
        return freeProcess && freeProcess.binding && freeProcess.binding('util')
      } catch (e) {}
    })()
    var nodeIsTypedArray = nodeUtil2 && nodeUtil2.isTypedArray
    function arrayFilter(array, predicate) {
      var index2 = -1,
        length = array == null ? 0 : array.length,
        resIndex = 0,
        result = []
      while (++index2 < length) {
        var value = array[index2]
        if (predicate(value, index2, array)) {
          result[resIndex++] = value
        }
      }
      return result
    }
    function arrayPush(array, values) {
      var index2 = -1,
        length = values.length,
        offset = array.length
      while (++index2 < length) {
        array[offset + index2] = values[index2]
      }
      return array
    }
    function arraySome(array, predicate) {
      var index2 = -1,
        length = array == null ? 0 : array.length
      while (++index2 < length) {
        if (predicate(array[index2], index2, array)) {
          return true
        }
      }
      return false
    }
    function baseTimes(n, iteratee) {
      var index2 = -1,
        result = Array(n)
      while (++index2 < n) {
        result[index2] = iteratee(index2)
      }
      return result
    }
    function baseUnary2(func) {
      return function (value) {
        return func(value)
      }
    }
    function cacheHas(cache, key) {
      return cache.has(key)
    }
    function getValue(object, key) {
      return object == null ? void 0 : object[key]
    }
    function mapToArray(map) {
      var index2 = -1,
        result = Array(map.size)
      map.forEach(function (value, key) {
        result[++index2] = [key, value]
      })
      return result
    }
    function overArg(func, transform) {
      return function (arg) {
        return func(transform(arg))
      }
    }
    function setToArray(set) {
      var index2 = -1,
        result = Array(set.size)
      set.forEach(function (value) {
        result[++index2] = value
      })
      return result
    }
    var arrayProto = Array.prototype,
      funcProto = Function.prototype,
      objectProto2 = Object.prototype
    var coreJsData = root['__core-js_shared__']
    var funcToString = funcProto.toString
    var hasOwnProperty2 = objectProto2.hasOwnProperty
    var maskSrcKey = (function () {
      var uid = /[^.]+$/.exec((coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO) || '')
      return uid ? 'Symbol(src)_1.' + uid : ''
    })()
    var nativeObjectToString = objectProto2.toString
    var reIsNative = RegExp(
      '^' +
        funcToString
          .call(hasOwnProperty2)
          .replace(reRegExpChar, '\\$&')
          .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') +
        '$'
    )
    var Buffer = moduleExports ? root.Buffer : void 0,
      Symbol2 = root.Symbol,
      Uint8Array2 = root.Uint8Array,
      propertyIsEnumerable = objectProto2.propertyIsEnumerable,
      splice = arrayProto.splice,
      symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0
    var nativeGetSymbols = Object.getOwnPropertySymbols,
      nativeIsBuffer = Buffer ? Buffer.isBuffer : void 0,
      nativeKeys = overArg(Object.keys, Object)
    var DataView2 = getNative(root, 'DataView'),
      Map = getNative(root, 'Map'),
      Promise2 = getNative(root, 'Promise'),
      Set = getNative(root, 'Set'),
      WeakMap2 = getNative(root, 'WeakMap'),
      nativeCreate = getNative(Object, 'create')
    var dataViewCtorString = toSource(DataView2),
      mapCtorString = toSource(Map),
      promiseCtorString = toSource(Promise2),
      setCtorString = toSource(Set),
      weakMapCtorString = toSource(WeakMap2)
    var symbolProto2 = Symbol2 ? Symbol2.prototype : void 0,
      symbolValueOf2 = symbolProto2 ? symbolProto2.valueOf : void 0
    function Hash(entries) {
      var index2 = -1,
        length = entries == null ? 0 : entries.length
      this.clear()
      while (++index2 < length) {
        var entry = entries[index2]
        this.set(entry[0], entry[1])
      }
    }
    function hashClear() {
      this.__data__ = nativeCreate ? nativeCreate(null) : {}
      this.size = 0
    }
    function hashDelete(key) {
      var result = this.has(key) && delete this.__data__[key]
      this.size -= result ? 1 : 0
      return result
    }
    function hashGet(key) {
      var data = this.__data__
      if (nativeCreate) {
        var result = data[key]
        return result === HASH_UNDEFINED ? void 0 : result
      }
      return hasOwnProperty2.call(data, key) ? data[key] : void 0
    }
    function hashHas(key) {
      var data = this.__data__
      return nativeCreate ? data[key] !== void 0 : hasOwnProperty2.call(data, key)
    }
    function hashSet(key, value) {
      var data = this.__data__
      this.size += this.has(key) ? 0 : 1
      data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value
      return this
    }
    Hash.prototype.clear = hashClear
    Hash.prototype['delete'] = hashDelete
    Hash.prototype.get = hashGet
    Hash.prototype.has = hashHas
    Hash.prototype.set = hashSet
    function ListCache(entries) {
      var index2 = -1,
        length = entries == null ? 0 : entries.length
      this.clear()
      while (++index2 < length) {
        var entry = entries[index2]
        this.set(entry[0], entry[1])
      }
    }
    function listCacheClear() {
      this.__data__ = []
      this.size = 0
    }
    function listCacheDelete(key) {
      var data = this.__data__,
        index2 = assocIndexOf(data, key)
      if (index2 < 0) {
        return false
      }
      var lastIndex = data.length - 1
      if (index2 == lastIndex) {
        data.pop()
      } else {
        splice.call(data, index2, 1)
      }
      --this.size
      return true
    }
    function listCacheGet(key) {
      var data = this.__data__,
        index2 = assocIndexOf(data, key)
      return index2 < 0 ? void 0 : data[index2][1]
    }
    function listCacheHas(key) {
      return assocIndexOf(this.__data__, key) > -1
    }
    function listCacheSet(key, value) {
      var data = this.__data__,
        index2 = assocIndexOf(data, key)
      if (index2 < 0) {
        ++this.size
        data.push([key, value])
      } else {
        data[index2][1] = value
      }
      return this
    }
    ListCache.prototype.clear = listCacheClear
    ListCache.prototype['delete'] = listCacheDelete
    ListCache.prototype.get = listCacheGet
    ListCache.prototype.has = listCacheHas
    ListCache.prototype.set = listCacheSet
    function MapCache(entries) {
      var index2 = -1,
        length = entries == null ? 0 : entries.length
      this.clear()
      while (++index2 < length) {
        var entry = entries[index2]
        this.set(entry[0], entry[1])
      }
    }
    function mapCacheClear() {
      this.size = 0
      this.__data__ = {
        hash: new Hash(),
        map: new (Map || ListCache)(),
        string: new Hash()
      }
    }
    function mapCacheDelete(key) {
      var result = getMapData(this, key)['delete'](key)
      this.size -= result ? 1 : 0
      return result
    }
    function mapCacheGet(key) {
      return getMapData(this, key).get(key)
    }
    function mapCacheHas(key) {
      return getMapData(this, key).has(key)
    }
    function mapCacheSet(key, value) {
      var data = getMapData(this, key),
        size = data.size
      data.set(key, value)
      this.size += data.size == size ? 0 : 1
      return this
    }
    MapCache.prototype.clear = mapCacheClear
    MapCache.prototype['delete'] = mapCacheDelete
    MapCache.prototype.get = mapCacheGet
    MapCache.prototype.has = mapCacheHas
    MapCache.prototype.set = mapCacheSet
    function SetCache(values) {
      var index2 = -1,
        length = values == null ? 0 : values.length
      this.__data__ = new MapCache()
      while (++index2 < length) {
        this.add(values[index2])
      }
    }
    function setCacheAdd(value) {
      this.__data__.set(value, HASH_UNDEFINED)
      return this
    }
    function setCacheHas(value) {
      return this.__data__.has(value)
    }
    SetCache.prototype.add = SetCache.prototype.push = setCacheAdd
    SetCache.prototype.has = setCacheHas
    function Stack2(entries) {
      var data = (this.__data__ = new ListCache(entries))
      this.size = data.size
    }
    function stackClear() {
      this.__data__ = new ListCache()
      this.size = 0
    }
    function stackDelete(key) {
      var data = this.__data__,
        result = data['delete'](key)
      this.size = data.size
      return result
    }
    function stackGet(key) {
      return this.__data__.get(key)
    }
    function stackHas(key) {
      return this.__data__.has(key)
    }
    function stackSet(key, value) {
      var data = this.__data__
      if (data instanceof ListCache) {
        var pairs = data.__data__
        if (!Map || pairs.length < LARGE_ARRAY_SIZE - 1) {
          pairs.push([key, value])
          this.size = ++data.size
          return this
        }
        data = this.__data__ = new MapCache(pairs)
      }
      data.set(key, value)
      this.size = data.size
      return this
    }
    Stack2.prototype.clear = stackClear
    Stack2.prototype['delete'] = stackDelete
    Stack2.prototype.get = stackGet
    Stack2.prototype.has = stackHas
    Stack2.prototype.set = stackSet
    function arrayLikeKeys(value, inherited) {
      var isArr = isArray2(value),
        isArg = !isArr && isArguments(value),
        isBuff = !isArr && !isArg && isBuffer2(value),
        isType = !isArr && !isArg && !isBuff && isTypedArray(value),
        skipIndexes = isArr || isArg || isBuff || isType,
        result = skipIndexes ? baseTimes(value.length, String) : [],
        length = result.length
      for (var key in value) {
        if (
          hasOwnProperty2.call(value, key) &&
          !(
            skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
            (key == 'length' || // Node.js 0.10 has enumerable non-index properties on buffers.
              (isBuff && (key == 'offset' || key == 'parent')) || // PhantomJS 2 has enumerable non-index properties on typed arrays.
              (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) || // Skip index properties.
              isIndex(key, length))
          )
        ) {
          result.push(key)
        }
      }
      return result
    }
    function assocIndexOf(array, key) {
      var length = array.length
      while (length--) {
        if (eq(array[length][0], key)) {
          return length
        }
      }
      return -1
    }
    function baseGetAllKeys(object, keysFunc, symbolsFunc) {
      var result = keysFunc(object)
      return isArray2(object) ? result : arrayPush(result, symbolsFunc(object))
    }
    function baseGetTag(value) {
      if (value == null) {
        return value === void 0 ? undefinedTag : nullTag
      }
      return symToStringTag && symToStringTag in Object(value)
        ? getRawTag(value)
        : objectToString(value)
    }
    function baseIsArguments(value) {
      return isObjectLike2(value) && baseGetTag(value) == argsTag2
    }
    function baseIsEqual2(value, other, bitmask, customizer, stack) {
      if (value === other) {
        return true
      }
      if (value == null || other == null || (!isObjectLike2(value) && !isObjectLike2(other))) {
        return value !== value && other !== other
      }
      return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual2, stack)
    }
    function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
      var objIsArr = isArray2(object),
        othIsArr = isArray2(other),
        objTag = objIsArr ? arrayTag2 : getTag2(object),
        othTag = othIsArr ? arrayTag2 : getTag2(other)
      objTag = objTag == argsTag2 ? objectTag2 : objTag
      othTag = othTag == argsTag2 ? objectTag2 : othTag
      var objIsObj = objTag == objectTag2,
        othIsObj = othTag == objectTag2,
        isSameTag = objTag == othTag
      if (isSameTag && isBuffer2(object)) {
        if (!isBuffer2(other)) {
          return false
        }
        objIsArr = true
        objIsObj = false
      }
      if (isSameTag && !objIsObj) {
        stack || (stack = new Stack2())
        return objIsArr || isTypedArray(object)
          ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
          : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack)
      }
      if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
        var objIsWrapped = objIsObj && hasOwnProperty2.call(object, '__wrapped__'),
          othIsWrapped = othIsObj && hasOwnProperty2.call(other, '__wrapped__')
        if (objIsWrapped || othIsWrapped) {
          var objUnwrapped = objIsWrapped ? object.value() : object,
            othUnwrapped = othIsWrapped ? other.value() : other
          stack || (stack = new Stack2())
          return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack)
        }
      }
      if (!isSameTag) {
        return false
      }
      stack || (stack = new Stack2())
      return equalObjects(object, other, bitmask, customizer, equalFunc, stack)
    }
    function baseIsNative(value) {
      if (!isObject2(value) || isMasked(value)) {
        return false
      }
      var pattern = isFunction(value) ? reIsNative : reIsHostCtor
      return pattern.test(toSource(value))
    }
    function baseIsTypedArray(value) {
      return isObjectLike2(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)]
    }
    function baseKeys(object) {
      if (!isPrototype(object)) {
        return nativeKeys(object)
      }
      var result = []
      for (var key in Object(object)) {
        if (hasOwnProperty2.call(object, key) && key != 'constructor') {
          result.push(key)
        }
      }
      return result
    }
    function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
        arrLength = array.length,
        othLength = other.length
      if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
        return false
      }
      var stacked = stack.get(array)
      if (stacked && stack.get(other)) {
        return stacked == other
      }
      var index2 = -1,
        result = true,
        seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache() : void 0
      stack.set(array, other)
      stack.set(other, array)
      while (++index2 < arrLength) {
        var arrValue = array[index2],
          othValue = other[index2]
        if (customizer) {
          var compared = isPartial
            ? customizer(othValue, arrValue, index2, other, array, stack)
            : customizer(arrValue, othValue, index2, array, other, stack)
        }
        if (compared !== void 0) {
          if (compared) {
            continue
          }
          result = false
          break
        }
        if (seen) {
          if (
            !arraySome(other, function (othValue2, othIndex) {
              if (
                !cacheHas(seen, othIndex) &&
                (arrValue === othValue2 ||
                  equalFunc(arrValue, othValue2, bitmask, customizer, stack))
              ) {
                return seen.push(othIndex)
              }
            })
          ) {
            result = false
            break
          }
        } else if (
          !(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))
        ) {
          result = false
          break
        }
      }
      stack['delete'](array)
      stack['delete'](other)
      return result
    }
    function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
      switch (tag) {
        case dataViewTag2:
          if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
            return false
          }
          object = object.buffer
          other = other.buffer
        case arrayBufferTag2:
          if (
            object.byteLength != other.byteLength ||
            !equalFunc(new Uint8Array2(object), new Uint8Array2(other))
          ) {
            return false
          }
          return true
        case boolTag2:
        case dateTag2:
        case numberTag2:
          return eq(+object, +other)
        case errorTag2:
          return object.name == other.name && object.message == other.message
        case regexpTag2:
        case stringTag2:
          return object == other + ''
        case mapTag2:
          var convert = mapToArray
        case setTag2:
          var isPartial = bitmask & COMPARE_PARTIAL_FLAG
          convert || (convert = setToArray)
          if (object.size != other.size && !isPartial) {
            return false
          }
          var stacked = stack.get(object)
          if (stacked) {
            return stacked == other
          }
          bitmask |= COMPARE_UNORDERED_FLAG
          stack.set(object, other)
          var result = equalArrays(
            convert(object),
            convert(other),
            bitmask,
            customizer,
            equalFunc,
            stack
          )
          stack['delete'](object)
          return result
        case symbolTag2:
          if (symbolValueOf2) {
            return symbolValueOf2.call(object) == symbolValueOf2.call(other)
          }
      }
      return false
    }
    function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
        objProps = getAllKeys2(object),
        objLength = objProps.length,
        othProps = getAllKeys2(other),
        othLength = othProps.length
      if (objLength != othLength && !isPartial) {
        return false
      }
      var index2 = objLength
      while (index2--) {
        var key = objProps[index2]
        if (!(isPartial ? key in other : hasOwnProperty2.call(other, key))) {
          return false
        }
      }
      var stacked = stack.get(object)
      if (stacked && stack.get(other)) {
        return stacked == other
      }
      var result = true
      stack.set(object, other)
      stack.set(other, object)
      var skipCtor = isPartial
      while (++index2 < objLength) {
        key = objProps[index2]
        var objValue = object[key],
          othValue = other[key]
        if (customizer) {
          var compared = isPartial
            ? customizer(othValue, objValue, key, other, object, stack)
            : customizer(objValue, othValue, key, object, other, stack)
        }
        if (
          !(compared === void 0
            ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack)
            : compared)
        ) {
          result = false
          break
        }
        skipCtor || (skipCtor = key == 'constructor')
      }
      if (result && !skipCtor) {
        var objCtor = object.constructor,
          othCtor = other.constructor
        if (
          objCtor != othCtor &&
          'constructor' in object &&
          'constructor' in other &&
          !(
            typeof objCtor == 'function' &&
            objCtor instanceof objCtor &&
            typeof othCtor == 'function' &&
            othCtor instanceof othCtor
          )
        ) {
          result = false
        }
      }
      stack['delete'](object)
      stack['delete'](other)
      return result
    }
    function getAllKeys2(object) {
      return baseGetAllKeys(object, keys, getSymbols)
    }
    function getMapData(map, key) {
      var data = map.__data__
      return isKeyable(key) ? data[typeof key == 'string' ? 'string' : 'hash'] : data.map
    }
    function getNative(object, key) {
      var value = getValue(object, key)
      return baseIsNative(value) ? value : void 0
    }
    function getRawTag(value) {
      var isOwn = hasOwnProperty2.call(value, symToStringTag),
        tag = value[symToStringTag]
      try {
        value[symToStringTag] = void 0
        var unmasked = true
      } catch (e) {}
      var result = nativeObjectToString.call(value)
      if (unmasked) {
        if (isOwn) {
          value[symToStringTag] = tag
        } else {
          delete value[symToStringTag]
        }
      }
      return result
    }
    var getSymbols = !nativeGetSymbols
      ? stubArray
      : function (object) {
          if (object == null) {
            return []
          }
          object = Object(object)
          return arrayFilter(nativeGetSymbols(object), function (symbol) {
            return propertyIsEnumerable.call(object, symbol)
          })
        }
    var getTag2 = baseGetTag
    if (
      (DataView2 && getTag2(new DataView2(new ArrayBuffer(1))) != dataViewTag2) ||
      (Map && getTag2(new Map()) != mapTag2) ||
      (Promise2 && getTag2(Promise2.resolve()) != promiseTag) ||
      (Set && getTag2(new Set()) != setTag2) ||
      (WeakMap2 && getTag2(new WeakMap2()) != weakMapTag2)
    ) {
      getTag2 = function (value) {
        var result = baseGetTag(value),
          Ctor = result == objectTag2 ? value.constructor : void 0,
          ctorString = Ctor ? toSource(Ctor) : ''
        if (ctorString) {
          switch (ctorString) {
            case dataViewCtorString:
              return dataViewTag2
            case mapCtorString:
              return mapTag2
            case promiseCtorString:
              return promiseTag
            case setCtorString:
              return setTag2
            case weakMapCtorString:
              return weakMapTag2
          }
        }
        return result
      }
    }
    function isIndex(value, length) {
      length = length == null ? MAX_SAFE_INTEGER : length
      return (
        !!length &&
        (typeof value == 'number' || reIsUint.test(value)) &&
        value > -1 &&
        value % 1 == 0 &&
        value < length
      )
    }
    function isKeyable(value) {
      var type = typeof value
      return type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean'
        ? value !== '__proto__'
        : value === null
    }
    function isMasked(func) {
      return !!maskSrcKey && maskSrcKey in func
    }
    function isPrototype(value) {
      var Ctor = value && value.constructor,
        proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto2
      return value === proto
    }
    function objectToString(value) {
      return nativeObjectToString.call(value)
    }
    function toSource(func) {
      if (func != null) {
        try {
          return funcToString.call(func)
        } catch (e) {}
        try {
          return func + ''
        } catch (e) {}
      }
      return ''
    }
    function eq(value, other) {
      return value === other || (value !== value && other !== other)
    }
    var isArguments = baseIsArguments(
      /* @__PURE__ */ (function () {
        return arguments
      })()
    )
      ? baseIsArguments
      : function (value) {
          return (
            isObjectLike2(value) &&
            hasOwnProperty2.call(value, 'callee') &&
            !propertyIsEnumerable.call(value, 'callee')
          )
        }
    var isArray2 = Array.isArray
    function isArrayLike(value) {
      return value != null && isLength(value.length) && !isFunction(value)
    }
    var isBuffer2 = nativeIsBuffer || stubFalse
    function isEqual2(value, other) {
      return baseIsEqual2(value, other)
    }
    function isFunction(value) {
      if (!isObject2(value)) {
        return false
      }
      var tag = baseGetTag(value)
      return tag == funcTag2 || tag == genTag2 || tag == asyncTag || tag == proxyTag
    }
    function isLength(value) {
      return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER
    }
    function isObject2(value) {
      var type = typeof value
      return value != null && (type == 'object' || type == 'function')
    }
    function isObjectLike2(value) {
      return value != null && typeof value == 'object'
    }
    var isTypedArray = nodeIsTypedArray ? baseUnary2(nodeIsTypedArray) : baseIsTypedArray
    function keys(object) {
      return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object)
    }
    function stubArray() {
      return []
    }
    function stubFalse() {
      return false
    }
    module.exports = isEqual2
  })(lodash_isequal, lodash_isequal.exports)
  return lodash_isequal.exports
}
var AttributeMap = {}
var hasRequiredAttributeMap
function requireAttributeMap() {
  if (hasRequiredAttributeMap) return AttributeMap
  hasRequiredAttributeMap = 1
  Object.defineProperty(AttributeMap, '__esModule', { value: true })
  const cloneDeep2 = requireLodash_clonedeep()
  const isEqual2 = requireLodash_isequal()
  var AttributeMap$1
  ;(function (AttributeMap2) {
    function compose(a = {}, b = {}, keepNull = false) {
      if (typeof a !== 'object') {
        a = {}
      }
      if (typeof b !== 'object') {
        b = {}
      }
      let attributes = cloneDeep2(b)
      if (!keepNull) {
        attributes = Object.keys(attributes).reduce((copy, key) => {
          if (attributes[key] != null) {
            copy[key] = attributes[key]
          }
          return copy
        }, {})
      }
      for (const key in a) {
        if (a[key] !== void 0 && b[key] === void 0) {
          attributes[key] = a[key]
        }
      }
      return Object.keys(attributes).length > 0 ? attributes : void 0
    }
    AttributeMap2.compose = compose
    function diff(a = {}, b = {}) {
      if (typeof a !== 'object') {
        a = {}
      }
      if (typeof b !== 'object') {
        b = {}
      }
      const attributes = Object.keys(a)
        .concat(Object.keys(b))
        .reduce((attrs, key) => {
          if (!isEqual2(a[key], b[key])) {
            attrs[key] = b[key] === void 0 ? null : b[key]
          }
          return attrs
        }, {})
      return Object.keys(attributes).length > 0 ? attributes : void 0
    }
    AttributeMap2.diff = diff
    function invert(attr = {}, base = {}) {
      attr = attr || {}
      const baseInverted = Object.keys(base).reduce((memo, key) => {
        if (base[key] !== attr[key] && attr[key] !== void 0) {
          memo[key] = base[key]
        }
        return memo
      }, {})
      return Object.keys(attr).reduce((memo, key) => {
        if (attr[key] !== base[key] && base[key] === void 0) {
          memo[key] = null
        }
        return memo
      }, baseInverted)
    }
    AttributeMap2.invert = invert
    function transform(a, b, priority = false) {
      if (typeof a !== 'object') {
        return b
      }
      if (typeof b !== 'object') {
        return void 0
      }
      if (!priority) {
        return b
      }
      const attributes = Object.keys(b).reduce((attrs, key) => {
        if (a[key] === void 0) {
          attrs[key] = b[key]
        }
        return attrs
      }, {})
      return Object.keys(attributes).length > 0 ? attributes : void 0
    }
    AttributeMap2.transform = transform
  })(AttributeMap$1 || (AttributeMap$1 = {}))
  AttributeMap.default = AttributeMap$1
  return AttributeMap
}
var Op = {}
var hasRequiredOp
function requireOp() {
  if (hasRequiredOp) return Op
  hasRequiredOp = 1
  Object.defineProperty(Op, '__esModule', { value: true })
  var Op$1
  ;(function (Op2) {
    function length(op) {
      if (typeof op.delete === 'number') {
        return op.delete
      } else if (typeof op.retain === 'number') {
        return op.retain
      } else if (typeof op.retain === 'object' && op.retain !== null) {
        return 1
      } else {
        return typeof op.insert === 'string' ? op.insert.length : 1
      }
    }
    Op2.length = length
  })(Op$1 || (Op$1 = {}))
  Op.default = Op$1
  return Op
}
var OpIterator = {}
var hasRequiredOpIterator
function requireOpIterator() {
  if (hasRequiredOpIterator) return OpIterator
  hasRequiredOpIterator = 1
  Object.defineProperty(OpIterator, '__esModule', { value: true })
  const Op_1 = requireOp()
  class Iterator {
    constructor(ops) {
      this.ops = ops
      this.index = 0
      this.offset = 0
    }
    hasNext() {
      return this.peekLength() < Infinity
    }
    next(length) {
      if (!length) {
        length = Infinity
      }
      const nextOp = this.ops[this.index]
      if (nextOp) {
        const offset = this.offset
        const opLength = Op_1.default.length(nextOp)
        if (length >= opLength - offset) {
          length = opLength - offset
          this.index += 1
          this.offset = 0
        } else {
          this.offset += length
        }
        if (typeof nextOp.delete === 'number') {
          return { delete: length }
        } else {
          const retOp = {}
          if (nextOp.attributes) {
            retOp.attributes = nextOp.attributes
          }
          if (typeof nextOp.retain === 'number') {
            retOp.retain = length
          } else if (typeof nextOp.retain === 'object' && nextOp.retain !== null) {
            retOp.retain = nextOp.retain
          } else if (typeof nextOp.insert === 'string') {
            retOp.insert = nextOp.insert.substr(offset, length)
          } else {
            retOp.insert = nextOp.insert
          }
          return retOp
        }
      } else {
        return { retain: Infinity }
      }
    }
    peek() {
      return this.ops[this.index]
    }
    peekLength() {
      if (this.ops[this.index]) {
        return Op_1.default.length(this.ops[this.index]) - this.offset
      } else {
        return Infinity
      }
    }
    peekType() {
      const op = this.ops[this.index]
      if (op) {
        if (typeof op.delete === 'number') {
          return 'delete'
        } else if (
          typeof op.retain === 'number' ||
          (typeof op.retain === 'object' && op.retain !== null)
        ) {
          return 'retain'
        } else {
          return 'insert'
        }
      }
      return 'retain'
    }
    rest() {
      if (!this.hasNext()) {
        return []
      } else if (this.offset === 0) {
        return this.ops.slice(this.index)
      } else {
        const offset = this.offset
        const index2 = this.index
        const next = this.next()
        const rest = this.ops.slice(this.index)
        this.offset = offset
        this.index = index2
        return [next].concat(rest)
      }
    }
  }
  OpIterator.default = Iterator
  return OpIterator
}
var hasRequiredDelta
function requireDelta() {
  if (hasRequiredDelta) return Delta$2.exports
  hasRequiredDelta = 1
  ;(function (module, exports) {
    Object.defineProperty(exports, '__esModule', { value: true })
    exports.AttributeMap = exports.OpIterator = exports.Op = void 0
    const diff = requireDiff()
    const cloneDeep2 = requireLodash_clonedeep()
    const isEqual2 = requireLodash_isequal()
    const AttributeMap_1 = requireAttributeMap()
    exports.AttributeMap = AttributeMap_1.default
    const Op_1 = requireOp()
    exports.Op = Op_1.default
    const OpIterator_1 = requireOpIterator()
    exports.OpIterator = OpIterator_1.default
    const NULL_CHARACTER = String.fromCharCode(0)
    const getEmbedTypeAndData = (a, b) => {
      if (typeof a !== 'object' || a === null) {
        throw new Error(`cannot retain a ${typeof a}`)
      }
      if (typeof b !== 'object' || b === null) {
        throw new Error(`cannot retain a ${typeof b}`)
      }
      const embedType = Object.keys(a)[0]
      if (!embedType || embedType !== Object.keys(b)[0]) {
        throw new Error(`embed types not matched: ${embedType} != ${Object.keys(b)[0]}`)
      }
      return [embedType, a[embedType], b[embedType]]
    }
    class Delta2 {
      constructor(ops) {
        if (Array.isArray(ops)) {
          this.ops = ops
        } else if (ops != null && Array.isArray(ops.ops)) {
          this.ops = ops.ops
        } else {
          this.ops = []
        }
      }
      static registerEmbed(embedType, handler) {
        this.handlers[embedType] = handler
      }
      static unregisterEmbed(embedType) {
        delete this.handlers[embedType]
      }
      static getHandler(embedType) {
        const handler = this.handlers[embedType]
        if (!handler) {
          throw new Error(`no handlers for embed type "${embedType}"`)
        }
        return handler
      }
      insert(arg, attributes) {
        const newOp = {}
        if (typeof arg === 'string' && arg.length === 0) {
          return this
        }
        newOp.insert = arg
        if (
          attributes != null &&
          typeof attributes === 'object' &&
          Object.keys(attributes).length > 0
        ) {
          newOp.attributes = attributes
        }
        return this.push(newOp)
      }
      delete(length) {
        if (length <= 0) {
          return this
        }
        return this.push({ delete: length })
      }
      retain(length, attributes) {
        if (typeof length === 'number' && length <= 0) {
          return this
        }
        const newOp = { retain: length }
        if (
          attributes != null &&
          typeof attributes === 'object' &&
          Object.keys(attributes).length > 0
        ) {
          newOp.attributes = attributes
        }
        return this.push(newOp)
      }
      push(newOp) {
        let index2 = this.ops.length
        let lastOp = this.ops[index2 - 1]
        newOp = cloneDeep2(newOp)
        if (typeof lastOp === 'object') {
          if (typeof newOp.delete === 'number' && typeof lastOp.delete === 'number') {
            this.ops[index2 - 1] = { delete: lastOp.delete + newOp.delete }
            return this
          }
          if (typeof lastOp.delete === 'number' && newOp.insert != null) {
            index2 -= 1
            lastOp = this.ops[index2 - 1]
            if (typeof lastOp !== 'object') {
              this.ops.unshift(newOp)
              return this
            }
          }
          if (isEqual2(newOp.attributes, lastOp.attributes)) {
            if (typeof newOp.insert === 'string' && typeof lastOp.insert === 'string') {
              this.ops[index2 - 1] = { insert: lastOp.insert + newOp.insert }
              if (typeof newOp.attributes === 'object') {
                this.ops[index2 - 1].attributes = newOp.attributes
              }
              return this
            } else if (typeof newOp.retain === 'number' && typeof lastOp.retain === 'number') {
              this.ops[index2 - 1] = { retain: lastOp.retain + newOp.retain }
              if (typeof newOp.attributes === 'object') {
                this.ops[index2 - 1].attributes = newOp.attributes
              }
              return this
            }
          }
        }
        if (index2 === this.ops.length) {
          this.ops.push(newOp)
        } else {
          this.ops.splice(index2, 0, newOp)
        }
        return this
      }
      chop() {
        const lastOp = this.ops[this.ops.length - 1]
        if (lastOp && typeof lastOp.retain === 'number' && !lastOp.attributes) {
          this.ops.pop()
        }
        return this
      }
      filter(predicate) {
        return this.ops.filter(predicate)
      }
      forEach(predicate) {
        this.ops.forEach(predicate)
      }
      map(predicate) {
        return this.ops.map(predicate)
      }
      partition(predicate) {
        const passed = []
        const failed = []
        this.forEach((op) => {
          const target = predicate(op) ? passed : failed
          target.push(op)
        })
        return [passed, failed]
      }
      reduce(predicate, initialValue) {
        return this.ops.reduce(predicate, initialValue)
      }
      changeLength() {
        return this.reduce((length, elem) => {
          if (elem.insert) {
            return length + Op_1.default.length(elem)
          } else if (elem.delete) {
            return length - elem.delete
          }
          return length
        }, 0)
      }
      length() {
        return this.reduce((length, elem) => {
          return length + Op_1.default.length(elem)
        }, 0)
      }
      slice(start = 0, end = Infinity) {
        const ops = []
        const iter = new OpIterator_1.default(this.ops)
        let index2 = 0
        while (index2 < end && iter.hasNext()) {
          let nextOp
          if (index2 < start) {
            nextOp = iter.next(start - index2)
          } else {
            nextOp = iter.next(end - index2)
            ops.push(nextOp)
          }
          index2 += Op_1.default.length(nextOp)
        }
        return new Delta2(ops)
      }
      compose(other) {
        const thisIter = new OpIterator_1.default(this.ops)
        const otherIter = new OpIterator_1.default(other.ops)
        const ops = []
        const firstOther = otherIter.peek()
        if (
          firstOther != null &&
          typeof firstOther.retain === 'number' &&
          firstOther.attributes == null
        ) {
          let firstLeft = firstOther.retain
          while (thisIter.peekType() === 'insert' && thisIter.peekLength() <= firstLeft) {
            firstLeft -= thisIter.peekLength()
            ops.push(thisIter.next())
          }
          if (firstOther.retain - firstLeft > 0) {
            otherIter.next(firstOther.retain - firstLeft)
          }
        }
        const delta = new Delta2(ops)
        while (thisIter.hasNext() || otherIter.hasNext()) {
          if (otherIter.peekType() === 'insert') {
            delta.push(otherIter.next())
          } else if (thisIter.peekType() === 'delete') {
            delta.push(thisIter.next())
          } else {
            const length = Math.min(thisIter.peekLength(), otherIter.peekLength())
            const thisOp = thisIter.next(length)
            const otherOp = otherIter.next(length)
            if (otherOp.retain) {
              const newOp = {}
              if (typeof thisOp.retain === 'number') {
                newOp.retain = typeof otherOp.retain === 'number' ? length : otherOp.retain
              } else {
                if (typeof otherOp.retain === 'number') {
                  if (thisOp.retain == null) {
                    newOp.insert = thisOp.insert
                  } else {
                    newOp.retain = thisOp.retain
                  }
                } else {
                  const action = thisOp.retain == null ? 'insert' : 'retain'
                  const [embedType, thisData, otherData] = getEmbedTypeAndData(
                    thisOp[action],
                    otherOp.retain
                  )
                  const handler = Delta2.getHandler(embedType)
                  newOp[action] = {
                    [embedType]: handler.compose(thisData, otherData, action === 'retain')
                  }
                }
              }
              const attributes = AttributeMap_1.default.compose(
                thisOp.attributes,
                otherOp.attributes,
                typeof thisOp.retain === 'number'
              )
              if (attributes) {
                newOp.attributes = attributes
              }
              delta.push(newOp)
              if (!otherIter.hasNext() && isEqual2(delta.ops[delta.ops.length - 1], newOp)) {
                const rest = new Delta2(thisIter.rest())
                return delta.concat(rest).chop()
              }
            } else if (
              typeof otherOp.delete === 'number' &&
              (typeof thisOp.retain === 'number' ||
                (typeof thisOp.retain === 'object' && thisOp.retain !== null))
            ) {
              delta.push(otherOp)
            }
          }
        }
        return delta.chop()
      }
      concat(other) {
        const delta = new Delta2(this.ops.slice())
        if (other.ops.length > 0) {
          delta.push(other.ops[0])
          delta.ops = delta.ops.concat(other.ops.slice(1))
        }
        return delta
      }
      diff(other, cursor) {
        if (this.ops === other.ops) {
          return new Delta2()
        }
        const strings = [this, other].map((delta) => {
          return delta
            .map((op) => {
              if (op.insert != null) {
                return typeof op.insert === 'string' ? op.insert : NULL_CHARACTER
              }
              const prep = delta === other ? 'on' : 'with'
              throw new Error('diff() called ' + prep + ' non-document')
            })
            .join('')
        })
        const retDelta = new Delta2()
        const diffResult = diff(strings[0], strings[1], cursor, true)
        const thisIter = new OpIterator_1.default(this.ops)
        const otherIter = new OpIterator_1.default(other.ops)
        diffResult.forEach((component) => {
          let length = component[1].length
          while (length > 0) {
            let opLength = 0
            switch (component[0]) {
              case diff.INSERT:
                opLength = Math.min(otherIter.peekLength(), length)
                retDelta.push(otherIter.next(opLength))
                break
              case diff.DELETE:
                opLength = Math.min(length, thisIter.peekLength())
                thisIter.next(opLength)
                retDelta.delete(opLength)
                break
              case diff.EQUAL:
                opLength = Math.min(thisIter.peekLength(), otherIter.peekLength(), length)
                const thisOp = thisIter.next(opLength)
                const otherOp = otherIter.next(opLength)
                if (isEqual2(thisOp.insert, otherOp.insert)) {
                  retDelta.retain(
                    opLength,
                    AttributeMap_1.default.diff(thisOp.attributes, otherOp.attributes)
                  )
                } else {
                  retDelta.push(otherOp).delete(opLength)
                }
                break
            }
            length -= opLength
          }
        })
        return retDelta.chop()
      }
      eachLine(predicate, newline = '\n') {
        const iter = new OpIterator_1.default(this.ops)
        let line = new Delta2()
        let i = 0
        while (iter.hasNext()) {
          if (iter.peekType() !== 'insert') {
            return
          }
          const thisOp = iter.peek()
          const start = Op_1.default.length(thisOp) - iter.peekLength()
          const index2 =
            typeof thisOp.insert === 'string' ? thisOp.insert.indexOf(newline, start) - start : -1
          if (index2 < 0) {
            line.push(iter.next())
          } else if (index2 > 0) {
            line.push(iter.next(index2))
          } else {
            if (predicate(line, iter.next(1).attributes || {}, i) === false) {
              return
            }
            i += 1
            line = new Delta2()
          }
        }
        if (line.length() > 0) {
          predicate(line, {}, i)
        }
      }
      invert(base) {
        const inverted = new Delta2()
        this.reduce((baseIndex, op) => {
          if (op.insert) {
            inverted.delete(Op_1.default.length(op))
          } else if (typeof op.retain === 'number' && op.attributes == null) {
            inverted.retain(op.retain)
            return baseIndex + op.retain
          } else if (op.delete || typeof op.retain === 'number') {
            const length = op.delete || op.retain
            const slice = base.slice(baseIndex, baseIndex + length)
            slice.forEach((baseOp) => {
              if (op.delete) {
                inverted.push(baseOp)
              } else if (op.retain && op.attributes) {
                inverted.retain(
                  Op_1.default.length(baseOp),
                  AttributeMap_1.default.invert(op.attributes, baseOp.attributes)
                )
              }
            })
            return baseIndex + length
          } else if (typeof op.retain === 'object' && op.retain !== null) {
            const slice = base.slice(baseIndex, baseIndex + 1)
            const baseOp = new OpIterator_1.default(slice.ops).next()
            const [embedType, opData, baseOpData] = getEmbedTypeAndData(op.retain, baseOp.insert)
            const handler = Delta2.getHandler(embedType)
            inverted.retain(
              { [embedType]: handler.invert(opData, baseOpData) },
              AttributeMap_1.default.invert(op.attributes, baseOp.attributes)
            )
            return baseIndex + 1
          }
          return baseIndex
        }, 0)
        return inverted.chop()
      }
      transform(arg, priority = false) {
        priority = !!priority
        if (typeof arg === 'number') {
          return this.transformPosition(arg, priority)
        }
        const other = arg
        const thisIter = new OpIterator_1.default(this.ops)
        const otherIter = new OpIterator_1.default(other.ops)
        const delta = new Delta2()
        while (thisIter.hasNext() || otherIter.hasNext()) {
          if (thisIter.peekType() === 'insert' && (priority || otherIter.peekType() !== 'insert')) {
            delta.retain(Op_1.default.length(thisIter.next()))
          } else if (otherIter.peekType() === 'insert') {
            delta.push(otherIter.next())
          } else {
            const length = Math.min(thisIter.peekLength(), otherIter.peekLength())
            const thisOp = thisIter.next(length)
            const otherOp = otherIter.next(length)
            if (thisOp.delete) {
              continue
            } else if (otherOp.delete) {
              delta.push(otherOp)
            } else {
              const thisData = thisOp.retain
              const otherData = otherOp.retain
              let transformedData =
                typeof otherData === 'object' && otherData !== null ? otherData : length
              if (
                typeof thisData === 'object' &&
                thisData !== null &&
                typeof otherData === 'object' &&
                otherData !== null
              ) {
                const embedType = Object.keys(thisData)[0]
                if (embedType === Object.keys(otherData)[0]) {
                  const handler = Delta2.getHandler(embedType)
                  if (handler) {
                    transformedData = {
                      [embedType]: handler.transform(
                        thisData[embedType],
                        otherData[embedType],
                        priority
                      )
                    }
                  }
                }
              }
              delta.retain(
                transformedData,
                AttributeMap_1.default.transform(thisOp.attributes, otherOp.attributes, priority)
              )
            }
          }
        }
        return delta.chop()
      }
      transformPosition(index2, priority = false) {
        priority = !!priority
        const thisIter = new OpIterator_1.default(this.ops)
        let offset = 0
        while (thisIter.hasNext() && offset <= index2) {
          const length = thisIter.peekLength()
          const nextType = thisIter.peekType()
          thisIter.next()
          if (nextType === 'delete') {
            index2 -= Math.min(length, index2 - offset)
            continue
          } else if (nextType === 'insert' && (offset < index2 || !priority)) {
            index2 += length
          }
          offset += length
        }
        return index2
      }
    }
    Delta2.Op = Op_1.default
    Delta2.OpIterator = OpIterator_1.default
    Delta2.AttributeMap = AttributeMap_1.default
    Delta2.handlers = {}
    exports.default = Delta2
    {
      module.exports = Delta2
      module.exports.default = Delta2
    }
  })(Delta$2, Delta$2.exports)
  return Delta$2.exports
}
var DeltaExports = requireDelta()
const Delta$1 = /* @__PURE__ */ getDefaultExportFromCjs(DeltaExports)
class Break extends EmbedBlot$1$1 {
  static value() {
    return void 0
  }
  optimize() {
    if (this.prev || this.next) {
      this.remove()
    }
  }
  length() {
    return 0
  }
  value() {
    return ''
  }
}
Break.blotName = 'break'
Break.tagName = 'BR'
let Text$1 = class Text2 extends TextBlot$1 {}
const entityMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
}
function escapeText(text) {
  return text.replace(/[&<>"']/g, (s) => entityMap[s])
}
class Inline extends InlineBlot$1 {
  static allowedChildren = [Inline, Break, EmbedBlot$1$1, Text$1]
  // Lower index means deeper in the DOM tree, since not found (-1) is for embeds
  static order = [
    'cursor',
    'inline',
    // Must be lower
    'link',
    // Chrome wants <a> to be lower
    'underline',
    'strike',
    'italic',
    'bold',
    'script',
    'code'
    // Must be higher
  ]
  static compare(self2, other) {
    const selfIndex = Inline.order.indexOf(self2)
    const otherIndex = Inline.order.indexOf(other)
    if (selfIndex >= 0 || otherIndex >= 0) {
      return selfIndex - otherIndex
    }
    if (self2 === other) {
      return 0
    }
    if (self2 < other) {
      return -1
    }
    return 1
  }
  formatAt(index2, length, name, value) {
    if (Inline.compare(this.statics.blotName, name) < 0 && this.scroll.query(name, Scope.BLOT)) {
      const blot = this.isolate(index2, length)
      if (value) {
        blot.wrap(name, value)
      }
    } else {
      super.formatAt(index2, length, name, value)
    }
  }
  optimize(context) {
    super.optimize(context)
    if (
      this.parent instanceof Inline &&
      Inline.compare(this.statics.blotName, this.parent.statics.blotName) > 0
    ) {
      const parent = this.parent.isolate(this.offset(), this.length())
      this.moveChildren(parent)
      parent.wrap(this)
    }
  }
}
const NEWLINE_LENGTH = 1
class Block extends BlockBlot$1 {
  cache = {}
  delta() {
    if (this.cache.delta == null) {
      this.cache.delta = blockDelta(this)
    }
    return this.cache.delta
  }
  deleteAt(index2, length) {
    super.deleteAt(index2, length)
    this.cache = {}
  }
  formatAt(index2, length, name, value) {
    if (length <= 0) return
    if (this.scroll.query(name, Scope.BLOCK)) {
      if (index2 + length === this.length()) {
        this.format(name, value)
      }
    } else {
      super.formatAt(index2, Math.min(length, this.length() - index2 - 1), name, value)
    }
    this.cache = {}
  }
  insertAt(index2, value, def) {
    if (def != null) {
      super.insertAt(index2, value, def)
      this.cache = {}
      return
    }
    if (value.length === 0) return
    const lines = value.split('\n')
    const text = lines.shift()
    if (text.length > 0) {
      if (index2 < this.length() - 1 || this.children.tail == null) {
        super.insertAt(Math.min(index2, this.length() - 1), text)
      } else {
        this.children.tail.insertAt(this.children.tail.length(), text)
      }
      this.cache = {}
    }
    let block = this
    lines.reduce((lineIndex, line) => {
      block = block.split(lineIndex, true)
      block.insertAt(0, line)
      return line.length
    }, index2 + text.length)
  }
  insertBefore(blot, ref2) {
    const { head } = this.children
    super.insertBefore(blot, ref2)
    if (head instanceof Break) {
      head.remove()
    }
    this.cache = {}
  }
  length() {
    if (this.cache.length == null) {
      this.cache.length = super.length() + NEWLINE_LENGTH
    }
    return this.cache.length
  }
  moveChildren(target, ref2) {
    super.moveChildren(target, ref2)
    this.cache = {}
  }
  optimize(context) {
    super.optimize(context)
    this.cache = {}
  }
  path(index2) {
    return super.path(index2, true)
  }
  removeChild(child) {
    super.removeChild(child)
    this.cache = {}
  }
  split(index2) {
    let force = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false
    if (force && (index2 === 0 || index2 >= this.length() - NEWLINE_LENGTH)) {
      const clone = this.clone()
      if (index2 === 0) {
        this.parent.insertBefore(clone, this)
        return this
      }
      this.parent.insertBefore(clone, this.next)
      return clone
    }
    const next = super.split(index2, force)
    this.cache = {}
    return next
  }
}
Block.blotName = 'block'
Block.tagName = 'P'
Block.defaultChild = Break
Block.allowedChildren = [Break, Inline, EmbedBlot$1$1, Text$1]
let BlockEmbed$1 = class BlockEmbed extends EmbedBlot$1$1 {
  attach() {
    super.attach()
    this.attributes = new AttributorStore$1(this.domNode)
  }
  delta() {
    return new Delta$1().insert(this.value(), {
      ...this.formats(),
      ...this.attributes.values()
    })
  }
  format(name, value) {
    const attribute = this.scroll.query(name, Scope.BLOCK_ATTRIBUTE)
    if (attribute != null) {
      this.attributes.attribute(attribute, value)
    }
  }
  formatAt(index2, length, name, value) {
    this.format(name, value)
  }
  insertAt(index2, value, def) {
    if (def != null) {
      super.insertAt(index2, value, def)
      return
    }
    const lines = value.split('\n')
    const text = lines.pop()
    const blocks = lines.map((line) => {
      const block = this.scroll.create(Block.blotName)
      block.insertAt(0, line)
      return block
    })
    const ref2 = this.split(index2)
    blocks.forEach((block) => {
      this.parent.insertBefore(block, ref2)
    })
    if (text) {
      this.parent.insertBefore(this.scroll.create('text', text), ref2)
    }
  }
}
BlockEmbed$1.scope = Scope.BLOCK_BLOT
function blockDelta(blot) {
  let filter = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true
  return blot
    .descendants(LeafBlot$1)
    .reduce((delta, leaf) => {
      if (leaf.length() === 0) {
        return delta
      }
      return delta.insert(leaf.value(), bubbleFormats(leaf, {}, filter))
    }, new Delta$1())
    .insert('\n', bubbleFormats(blot))
}
function bubbleFormats(blot) {
  let formats = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}
  let filter = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true
  if (blot == null) return formats
  if ('formats' in blot && typeof blot.formats === 'function') {
    formats = {
      ...formats,
      ...blot.formats()
    }
    if (filter) {
      delete formats['code-token']
    }
  }
  if (
    blot.parent == null ||
    blot.parent.statics.blotName === 'scroll' ||
    blot.parent.statics.scope !== blot.statics.scope
  ) {
    return formats
  }
  return bubbleFormats(blot.parent, formats, filter)
}
class Cursor extends EmbedBlot$1$1 {
  static blotName = 'cursor'
  static className = 'ql-cursor'
  static tagName = 'span'
  static CONTENTS = '\uFEFF'
  // Zero width no break space
  static value() {
    return void 0
  }
  constructor(scroll, domNode, selection) {
    super(scroll, domNode)
    this.selection = selection
    this.textNode = document.createTextNode(Cursor.CONTENTS)
    this.domNode.appendChild(this.textNode)
    this.savedLength = 0
  }
  detach() {
    if (this.parent != null) this.parent.removeChild(this)
  }
  format(name, value) {
    if (this.savedLength !== 0) {
      super.format(name, value)
      return
    }
    let target = this
    let index2 = 0
    while (target != null && target.statics.scope !== Scope.BLOCK_BLOT) {
      index2 += target.offset(target.parent)
      target = target.parent
    }
    if (target != null) {
      this.savedLength = Cursor.CONTENTS.length
      target.optimize()
      target.formatAt(index2, Cursor.CONTENTS.length, name, value)
      this.savedLength = 0
    }
  }
  index(node, offset) {
    if (node === this.textNode) return 0
    return super.index(node, offset)
  }
  length() {
    return this.savedLength
  }
  position() {
    return [this.textNode, this.textNode.data.length]
  }
  remove() {
    super.remove()
    this.parent = null
  }
  restore() {
    if (this.selection.composing || this.parent == null) return null
    const range = this.selection.getNativeRange()
    while (this.domNode.lastChild != null && this.domNode.lastChild !== this.textNode) {
      this.domNode.parentNode.insertBefore(this.domNode.lastChild, this.domNode)
    }
    const prevTextBlot = this.prev instanceof Text$1 ? this.prev : null
    const prevTextLength = prevTextBlot ? prevTextBlot.length() : 0
    const nextTextBlot = this.next instanceof Text$1 ? this.next : null
    const nextText = nextTextBlot ? nextTextBlot.text : ''
    const { textNode } = this
    const newText = textNode.data.split(Cursor.CONTENTS).join('')
    textNode.data = Cursor.CONTENTS
    let mergedTextBlot
    if (prevTextBlot) {
      mergedTextBlot = prevTextBlot
      if (newText || nextTextBlot) {
        prevTextBlot.insertAt(prevTextBlot.length(), newText + nextText)
        if (nextTextBlot) {
          nextTextBlot.remove()
        }
      }
    } else if (nextTextBlot) {
      mergedTextBlot = nextTextBlot
      nextTextBlot.insertAt(0, newText)
    } else {
      const newTextNode = document.createTextNode(newText)
      mergedTextBlot = this.scroll.create(newTextNode)
      this.parent.insertBefore(mergedTextBlot, this)
    }
    this.remove()
    if (range) {
      const remapOffset = (node, offset) => {
        if (prevTextBlot && node === prevTextBlot.domNode) {
          return offset
        }
        if (node === textNode) {
          return prevTextLength + offset - 1
        }
        if (nextTextBlot && node === nextTextBlot.domNode) {
          return prevTextLength + newText.length + offset
        }
        return null
      }
      const start = remapOffset(range.start.node, range.start.offset)
      const end = remapOffset(range.end.node, range.end.offset)
      if (start !== null && end !== null) {
        return {
          startNode: mergedTextBlot.domNode,
          startOffset: start,
          endNode: mergedTextBlot.domNode,
          endOffset: end
        }
      }
    }
    return null
  }
  update(mutations, context) {
    if (
      mutations.some((mutation) => {
        return mutation.type === 'characterData' && mutation.target === this.textNode
      })
    ) {
      const range = this.restore()
      if (range) context.range = range
    }
  }
  // Avoid .ql-cursor being a descendant of `<a/>`.
  // The reason is Safari pushes down `<a/>` on text insertion.
  // That will cause DOM nodes not sync with the model.
  //
  // For example ({I} is the caret), given the markup:
  //    <a><span class="ql-cursor">\uFEFF{I}</span></a>
  // When typing a char "x", `<a/>` will be pushed down inside the `<span>` first:
  //    <span class="ql-cursor"><a>\uFEFF{I}</a></span>
  // And then "x" will be inserted after `<a/>`:
  //    <span class="ql-cursor"><a>\uFEFF</a>d{I}</span>
  optimize(context) {
    super.optimize(context)
    let { parent } = this
    while (parent) {
      if (parent.domNode.tagName === 'A') {
        this.savedLength = Cursor.CONTENTS.length
        parent.isolate(this.offset(parent), this.length()).unwrap()
        this.savedLength = 0
        break
      }
      parent = parent.parent
    }
  }
  value() {
    return ''
  }
}
var eventemitter3 = { exports: {} }
var hasRequiredEventemitter3
function requireEventemitter3() {
  if (hasRequiredEventemitter3) return eventemitter3.exports
  hasRequiredEventemitter3 = 1
  ;(function (module) {
    var has = Object.prototype.hasOwnProperty,
      prefix = '~'
    function Events() {}
    if (Object.create) {
      Events.prototype = /* @__PURE__ */ Object.create(null)
      if (!new Events().__proto__) prefix = false
    }
    function EE(fn, context, once) {
      this.fn = fn
      this.context = context
      this.once = once || false
    }
    function addListener(emitter, event, fn, context, once) {
      if (typeof fn !== 'function') {
        throw new TypeError('The listener must be a function')
      }
      var listener = new EE(fn, context || emitter, once),
        evt = prefix ? prefix + event : event
      if (!emitter._events[evt]) ((emitter._events[evt] = listener), emitter._eventsCount++)
      else if (!emitter._events[evt].fn) emitter._events[evt].push(listener)
      else emitter._events[evt] = [emitter._events[evt], listener]
      return emitter
    }
    function clearEvent(emitter, evt) {
      if (--emitter._eventsCount === 0) emitter._events = new Events()
      else delete emitter._events[evt]
    }
    function EventEmitter2() {
      this._events = new Events()
      this._eventsCount = 0
    }
    EventEmitter2.prototype.eventNames = function eventNames() {
      var names = [],
        events,
        name
      if (this._eventsCount === 0) return names
      for (name in (events = this._events)) {
        if (has.call(events, name)) names.push(prefix ? name.slice(1) : name)
      }
      if (Object.getOwnPropertySymbols) {
        return names.concat(Object.getOwnPropertySymbols(events))
      }
      return names
    }
    EventEmitter2.prototype.listeners = function listeners(event) {
      var evt = prefix ? prefix + event : event,
        handlers = this._events[evt]
      if (!handlers) return []
      if (handlers.fn) return [handlers.fn]
      for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
        ee[i] = handlers[i].fn
      }
      return ee
    }
    EventEmitter2.prototype.listenerCount = function listenerCount(event) {
      var evt = prefix ? prefix + event : event,
        listeners = this._events[evt]
      if (!listeners) return 0
      if (listeners.fn) return 1
      return listeners.length
    }
    EventEmitter2.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
      var evt = prefix ? prefix + event : event
      if (!this._events[evt]) return false
      var listeners = this._events[evt],
        len = arguments.length,
        args,
        i
      if (listeners.fn) {
        if (listeners.once) this.removeListener(event, listeners.fn, void 0, true)
        switch (len) {
          case 1:
            return (listeners.fn.call(listeners.context), true)
          case 2:
            return (listeners.fn.call(listeners.context, a1), true)
          case 3:
            return (listeners.fn.call(listeners.context, a1, a2), true)
          case 4:
            return (listeners.fn.call(listeners.context, a1, a2, a3), true)
          case 5:
            return (listeners.fn.call(listeners.context, a1, a2, a3, a4), true)
          case 6:
            return (listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true)
        }
        for (i = 1, args = new Array(len - 1); i < len; i++) {
          args[i - 1] = arguments[i]
        }
        listeners.fn.apply(listeners.context, args)
      } else {
        var length = listeners.length,
          j
        for (i = 0; i < length; i++) {
          if (listeners[i].once) this.removeListener(event, listeners[i].fn, void 0, true)
          switch (len) {
            case 1:
              listeners[i].fn.call(listeners[i].context)
              break
            case 2:
              listeners[i].fn.call(listeners[i].context, a1)
              break
            case 3:
              listeners[i].fn.call(listeners[i].context, a1, a2)
              break
            case 4:
              listeners[i].fn.call(listeners[i].context, a1, a2, a3)
              break
            default:
              if (!args)
                for (j = 1, args = new Array(len - 1); j < len; j++) {
                  args[j - 1] = arguments[j]
                }
              listeners[i].fn.apply(listeners[i].context, args)
          }
        }
      }
      return true
    }
    EventEmitter2.prototype.on = function on(event, fn, context) {
      return addListener(this, event, fn, context, false)
    }
    EventEmitter2.prototype.once = function once(event, fn, context) {
      return addListener(this, event, fn, context, true)
    }
    EventEmitter2.prototype.removeListener = function removeListener(event, fn, context, once) {
      var evt = prefix ? prefix + event : event
      if (!this._events[evt]) return this
      if (!fn) {
        clearEvent(this, evt)
        return this
      }
      var listeners = this._events[evt]
      if (listeners.fn) {
        if (
          listeners.fn === fn &&
          (!once || listeners.once) &&
          (!context || listeners.context === context)
        ) {
          clearEvent(this, evt)
        }
      } else {
        for (var i = 0, events = [], length = listeners.length; i < length; i++) {
          if (
            listeners[i].fn !== fn ||
            (once && !listeners[i].once) ||
            (context && listeners[i].context !== context)
          ) {
            events.push(listeners[i])
          }
        }
        if (events.length) this._events[evt] = events.length === 1 ? events[0] : events
        else clearEvent(this, evt)
      }
      return this
    }
    EventEmitter2.prototype.removeAllListeners = function removeAllListeners(event) {
      var evt
      if (event) {
        evt = prefix ? prefix + event : event
        if (this._events[evt]) clearEvent(this, evt)
      } else {
        this._events = new Events()
        this._eventsCount = 0
      }
      return this
    }
    EventEmitter2.prototype.off = EventEmitter2.prototype.removeListener
    EventEmitter2.prototype.addListener = EventEmitter2.prototype.on
    EventEmitter2.prefixed = prefix
    EventEmitter2.EventEmitter = EventEmitter2
    {
      module.exports = EventEmitter2
    }
  })(eventemitter3)
  return eventemitter3.exports
}
var eventemitter3Exports = requireEventemitter3()
const EventEmitter = /* @__PURE__ */ getDefaultExportFromCjs(eventemitter3Exports)
const instances = /* @__PURE__ */ new WeakMap()
const levels = ['error', 'warn', 'log', 'info']
let level = 'warn'
function debug$6(method) {
  if (level) {
    if (levels.indexOf(method) <= levels.indexOf(level)) {
      for (
        var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1;
        _key < _len;
        _key++
      ) {
        args[_key - 1] = arguments[_key]
      }
      console[method](...args)
    }
  }
}
function namespace(ns) {
  return levels.reduce((logger, method) => {
    logger[method] = debug$6.bind(console, method, ns)
    return logger
  }, {})
}
namespace.level = (newLevel) => {
  level = newLevel
}
debug$6.level = namespace.level
const debug$5 = namespace('quill:events')
const EVENTS = ['selectionchange', 'mousedown', 'mouseup', 'click']
EVENTS.forEach((eventName) => {
  document.addEventListener(eventName, function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key]
    }
    Array.from(document.querySelectorAll('.ql-container')).forEach((node) => {
      const quill = instances.get(node)
      if (quill && quill.emitter) {
        quill.emitter.handleDOM(...args)
      }
    })
  })
})
class Emitter extends EventEmitter {
  static events = {
    EDITOR_CHANGE: 'editor-change',
    SCROLL_BEFORE_UPDATE: 'scroll-before-update',
    SCROLL_BLOT_MOUNT: 'scroll-blot-mount',
    SCROLL_BLOT_UNMOUNT: 'scroll-blot-unmount',
    SCROLL_OPTIMIZE: 'scroll-optimize',
    SCROLL_UPDATE: 'scroll-update',
    SCROLL_EMBED_UPDATE: 'scroll-embed-update',
    SELECTION_CHANGE: 'selection-change',
    TEXT_CHANGE: 'text-change',
    COMPOSITION_BEFORE_START: 'composition-before-start',
    COMPOSITION_START: 'composition-start',
    COMPOSITION_BEFORE_END: 'composition-before-end',
    COMPOSITION_END: 'composition-end'
  }
  static sources = {
    API: 'api',
    SILENT: 'silent',
    USER: 'user'
  }
  constructor() {
    super()
    this.domListeners = {}
    this.on('error', debug$5.error)
  }
  emit() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2]
    }
    debug$5.log.call(debug$5, ...args)
    return super.emit(...args)
  }
  handleDOM(event) {
    for (
      var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1;
      _key3 < _len3;
      _key3++
    ) {
      args[_key3 - 1] = arguments[_key3]
    }
    ;(this.domListeners[event.type] || []).forEach((_ref) => {
      let { node, handler } = _ref
      if (event.target === node || node.contains(event.target)) {
        handler(event, ...args)
      }
    })
  }
  listenDOM(eventName, node, handler) {
    if (!this.domListeners[eventName]) {
      this.domListeners[eventName] = []
    }
    this.domListeners[eventName].push({
      node,
      handler
    })
  }
}
const debug$4 = namespace('quill:selection')
class Range {
  constructor(index2) {
    let length = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0
    this.index = index2
    this.length = length
  }
}
class Selection {
  constructor(scroll, emitter) {
    this.emitter = emitter
    this.scroll = scroll
    this.composing = false
    this.mouseDown = false
    this.root = this.scroll.domNode
    this.cursor = this.scroll.create('cursor', this)
    this.savedRange = new Range(0, 0)
    this.lastRange = this.savedRange
    this.lastNative = null
    this.handleComposition()
    this.handleDragging()
    this.emitter.listenDOM('selectionchange', document, () => {
      if (!this.mouseDown && !this.composing) {
        setTimeout(this.update.bind(this, Emitter.sources.USER), 1)
      }
    })
    this.emitter.on(Emitter.events.SCROLL_BEFORE_UPDATE, () => {
      if (!this.hasFocus()) return
      const native = this.getNativeRange()
      if (native == null) return
      if (native.start.node === this.cursor.textNode) return
      this.emitter.once(Emitter.events.SCROLL_UPDATE, (source, mutations) => {
        try {
          if (this.root.contains(native.start.node) && this.root.contains(native.end.node)) {
            this.setNativeRange(
              native.start.node,
              native.start.offset,
              native.end.node,
              native.end.offset
            )
          }
          const triggeredByTyping = mutations.some(
            (mutation) =>
              mutation.type === 'characterData' ||
              mutation.type === 'childList' ||
              (mutation.type === 'attributes' && mutation.target === this.root)
          )
          this.update(triggeredByTyping ? Emitter.sources.SILENT : source)
        } catch (ignored) {}
      })
    })
    this.emitter.on(Emitter.events.SCROLL_OPTIMIZE, (mutations, context) => {
      if (context.range) {
        const { startNode, startOffset, endNode, endOffset } = context.range
        this.setNativeRange(startNode, startOffset, endNode, endOffset)
        this.update(Emitter.sources.SILENT)
      }
    })
    this.update(Emitter.sources.SILENT)
  }
  handleComposition() {
    this.emitter.on(Emitter.events.COMPOSITION_BEFORE_START, () => {
      this.composing = true
    })
    this.emitter.on(Emitter.events.COMPOSITION_END, () => {
      this.composing = false
      if (this.cursor.parent) {
        const range = this.cursor.restore()
        if (!range) return
        setTimeout(() => {
          this.setNativeRange(range.startNode, range.startOffset, range.endNode, range.endOffset)
        }, 1)
      }
    })
  }
  handleDragging() {
    this.emitter.listenDOM('mousedown', document.body, () => {
      this.mouseDown = true
    })
    this.emitter.listenDOM('mouseup', document.body, () => {
      this.mouseDown = false
      this.update(Emitter.sources.USER)
    })
  }
  focus() {
    if (this.hasFocus()) return
    this.root.focus({
      preventScroll: true
    })
    this.setRange(this.savedRange)
  }
  format(format, value) {
    this.scroll.update()
    const nativeRange = this.getNativeRange()
    if (
      nativeRange == null ||
      !nativeRange.native.collapsed ||
      this.scroll.query(format, Scope.BLOCK)
    )
      return
    if (nativeRange.start.node !== this.cursor.textNode) {
      const blot = this.scroll.find(nativeRange.start.node, false)
      if (blot == null) return
      if (blot instanceof LeafBlot$1) {
        const after = blot.split(nativeRange.start.offset)
        blot.parent.insertBefore(this.cursor, after)
      } else {
        blot.insertBefore(this.cursor, nativeRange.start.node)
      }
      this.cursor.attach()
    }
    this.cursor.format(format, value)
    this.scroll.optimize()
    this.setNativeRange(this.cursor.textNode, this.cursor.textNode.data.length)
    this.update()
  }
  getBounds(index2) {
    let length = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0
    const scrollLength = this.scroll.length()
    index2 = Math.min(index2, scrollLength - 1)
    length = Math.min(index2 + length, scrollLength - 1) - index2
    let node
    let [leaf, offset] = this.scroll.leaf(index2)
    if (leaf == null) return null
    if (length > 0 && offset === leaf.length()) {
      const [next] = this.scroll.leaf(index2 + 1)
      if (next) {
        const [line] = this.scroll.line(index2)
        const [nextLine] = this.scroll.line(index2 + 1)
        if (line === nextLine) {
          leaf = next
          offset = 0
        }
      }
    }
    ;[node, offset] = leaf.position(offset, true)
    const range = document.createRange()
    if (length > 0) {
      range.setStart(node, offset)
      ;[leaf, offset] = this.scroll.leaf(index2 + length)
      if (leaf == null) return null
      ;[node, offset] = leaf.position(offset, true)
      range.setEnd(node, offset)
      return range.getBoundingClientRect()
    }
    let side = 'left'
    let rect
    if (node instanceof Text) {
      if (!node.data.length) {
        return null
      }
      if (offset < node.data.length) {
        range.setStart(node, offset)
        range.setEnd(node, offset + 1)
      } else {
        range.setStart(node, offset - 1)
        range.setEnd(node, offset)
        side = 'right'
      }
      rect = range.getBoundingClientRect()
    } else {
      if (!(leaf.domNode instanceof Element)) return null
      rect = leaf.domNode.getBoundingClientRect()
      if (offset > 0) side = 'right'
    }
    return {
      bottom: rect.top + rect.height,
      height: rect.height,
      left: rect[side],
      right: rect[side],
      top: rect.top,
      width: 0
    }
  }
  getNativeRange() {
    const selection = document.getSelection()
    if (selection == null || selection.rangeCount <= 0) return null
    const nativeRange = selection.getRangeAt(0)
    if (nativeRange == null) return null
    const range = this.normalizeNative(nativeRange)
    debug$4.info('getNativeRange', range)
    return range
  }
  getRange() {
    const root = this.scroll.domNode
    if ('isConnected' in root && !root.isConnected) {
      return [null, null]
    }
    const normalized = this.getNativeRange()
    if (normalized == null) return [null, null]
    const range = this.normalizedToRange(normalized)
    return [range, normalized]
  }
  hasFocus() {
    return (
      document.activeElement === this.root ||
      (document.activeElement != null && contains(this.root, document.activeElement))
    )
  }
  normalizedToRange(range) {
    const positions = [[range.start.node, range.start.offset]]
    if (!range.native.collapsed) {
      positions.push([range.end.node, range.end.offset])
    }
    const indexes = positions.map((position) => {
      const [node, offset] = position
      const blot = this.scroll.find(node, true)
      const index2 = blot.offset(this.scroll)
      if (offset === 0) {
        return index2
      }
      if (blot instanceof LeafBlot$1) {
        return index2 + blot.index(node, offset)
      }
      return index2 + blot.length()
    })
    const end = Math.min(Math.max(...indexes), this.scroll.length() - 1)
    const start = Math.min(end, ...indexes)
    return new Range(start, end - start)
  }
  normalizeNative(nativeRange) {
    if (
      !contains(this.root, nativeRange.startContainer) ||
      (!nativeRange.collapsed && !contains(this.root, nativeRange.endContainer))
    ) {
      return null
    }
    const range = {
      start: {
        node: nativeRange.startContainer,
        offset: nativeRange.startOffset
      },
      end: {
        node: nativeRange.endContainer,
        offset: nativeRange.endOffset
      },
      native: nativeRange
    }
    ;[range.start, range.end].forEach((position) => {
      let { node, offset } = position
      while (!(node instanceof Text) && node.childNodes.length > 0) {
        if (node.childNodes.length > offset) {
          node = node.childNodes[offset]
          offset = 0
        } else if (node.childNodes.length === offset) {
          node = node.lastChild
          if (node instanceof Text) {
            offset = node.data.length
          } else if (node.childNodes.length > 0) {
            offset = node.childNodes.length
          } else {
            offset = node.childNodes.length + 1
          }
        } else {
          break
        }
      }
      position.node = node
      position.offset = offset
    })
    return range
  }
  rangeToNative(range) {
    const scrollLength = this.scroll.length()
    const getPosition = (index2, inclusive) => {
      index2 = Math.min(scrollLength - 1, index2)
      const [leaf, leafOffset] = this.scroll.leaf(index2)
      return leaf ? leaf.position(leafOffset, inclusive) : [null, -1]
    }
    return [...getPosition(range.index, false), ...getPosition(range.index + range.length, true)]
  }
  setNativeRange(startNode, startOffset) {
    let endNode = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : startNode
    let endOffset = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : startOffset
    let force = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : false
    debug$4.info('setNativeRange', startNode, startOffset, endNode, endOffset)
    if (
      startNode != null &&
      (this.root.parentNode == null ||
        startNode.parentNode == null || // @ts-expect-error Fix me later
        endNode.parentNode == null)
    ) {
      return
    }
    const selection = document.getSelection()
    if (selection == null) return
    if (startNode != null) {
      if (!this.hasFocus())
        this.root.focus({
          preventScroll: true
        })
      const { native } = this.getNativeRange() || {}
      if (
        native == null ||
        force ||
        startNode !== native.startContainer ||
        startOffset !== native.startOffset ||
        endNode !== native.endContainer ||
        endOffset !== native.endOffset
      ) {
        if (startNode instanceof Element && startNode.tagName === 'BR') {
          startOffset = Array.from(startNode.parentNode.childNodes).indexOf(startNode)
          startNode = startNode.parentNode
        }
        if (endNode instanceof Element && endNode.tagName === 'BR') {
          endOffset = Array.from(endNode.parentNode.childNodes).indexOf(endNode)
          endNode = endNode.parentNode
        }
        const range = document.createRange()
        range.setStart(startNode, startOffset)
        range.setEnd(endNode, endOffset)
        selection.removeAllRanges()
        selection.addRange(range)
      }
    } else {
      selection.removeAllRanges()
      this.root.blur()
    }
  }
  setRange(range) {
    let force = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false
    let source =
      arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : Emitter.sources.API
    if (typeof force === 'string') {
      source = force
      force = false
    }
    debug$4.info('setRange', range)
    if (range != null) {
      const args = this.rangeToNative(range)
      this.setNativeRange(...args, force)
    } else {
      this.setNativeRange(null)
    }
    this.update(source)
  }
  update() {
    let source =
      arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : Emitter.sources.USER
    const oldRange = this.lastRange
    const [lastRange, nativeRange] = this.getRange()
    this.lastRange = lastRange
    this.lastNative = nativeRange
    if (this.lastRange != null) {
      this.savedRange = this.lastRange
    }
    if (!isEqual$1(oldRange, this.lastRange)) {
      if (
        !this.composing &&
        nativeRange != null &&
        nativeRange.native.collapsed &&
        nativeRange.start.node !== this.cursor.textNode
      ) {
        const range = this.cursor.restore()
        if (range) {
          this.setNativeRange(range.startNode, range.startOffset, range.endNode, range.endOffset)
        }
      }
      const args = [
        Emitter.events.SELECTION_CHANGE,
        cloneDeep(this.lastRange),
        cloneDeep(oldRange),
        source
      ]
      this.emitter.emit(Emitter.events.EDITOR_CHANGE, ...args)
      if (source !== Emitter.sources.SILENT) {
        this.emitter.emit(...args)
      }
    }
  }
}
function contains(parent, descendant) {
  try {
    descendant.parentNode
  } catch (e) {
    return false
  }
  return parent.contains(descendant)
}
const ASCII = /^[ -~]*$/
let Editor$1 = class Editor {
  constructor(scroll) {
    this.scroll = scroll
    this.delta = this.getDelta()
  }
  applyDelta(delta) {
    this.scroll.update()
    let scrollLength = this.scroll.length()
    this.scroll.batchStart()
    const normalizedDelta = normalizeDelta(delta)
    const deleteDelta = new Delta$1()
    const normalizedOps = splitOpLines(normalizedDelta.ops.slice())
    normalizedOps.reduce((index2, op) => {
      const length = DeltaExports.Op.length(op)
      let attributes = op.attributes || {}
      let isImplicitNewlinePrepended = false
      let isImplicitNewlineAppended = false
      if (op.insert != null) {
        deleteDelta.retain(length)
        if (typeof op.insert === 'string') {
          const text = op.insert
          isImplicitNewlineAppended =
            !text.endsWith('\n') &&
            (scrollLength <= index2 || !!this.scroll.descendant(BlockEmbed$1, index2)[0])
          this.scroll.insertAt(index2, text)
          const [line, offset] = this.scroll.line(index2)
          let formats = merge({}, bubbleFormats(line))
          if (line instanceof Block) {
            const [leaf] = line.descendant(LeafBlot$1, offset)
            if (leaf) {
              formats = merge(formats, bubbleFormats(leaf))
            }
          }
          attributes = DeltaExports.AttributeMap.diff(formats, attributes) || {}
        } else if (typeof op.insert === 'object') {
          const key = Object.keys(op.insert)[0]
          if (key == null) return index2
          const isInlineEmbed = this.scroll.query(key, Scope.INLINE) != null
          if (isInlineEmbed) {
            if (scrollLength <= index2 || !!this.scroll.descendant(BlockEmbed$1, index2)[0]) {
              isImplicitNewlineAppended = true
            }
          } else if (index2 > 0) {
            const [leaf, offset] = this.scroll.descendant(LeafBlot$1, index2 - 1)
            if (leaf instanceof Text$1) {
              const text = leaf.value()
              if (text[offset] !== '\n') {
                isImplicitNewlinePrepended = true
              }
            } else if (leaf instanceof EmbedBlot$1$1 && leaf.statics.scope === Scope.INLINE_BLOT) {
              isImplicitNewlinePrepended = true
            }
          }
          this.scroll.insertAt(index2, key, op.insert[key])
          if (isInlineEmbed) {
            const [leaf] = this.scroll.descendant(LeafBlot$1, index2)
            if (leaf) {
              const formats = merge({}, bubbleFormats(leaf))
              attributes = DeltaExports.AttributeMap.diff(formats, attributes) || {}
            }
          }
        }
        scrollLength += length
      } else {
        deleteDelta.push(op)
        if (op.retain !== null && typeof op.retain === 'object') {
          const key = Object.keys(op.retain)[0]
          if (key == null) return index2
          this.scroll.updateEmbedAt(index2, key, op.retain[key])
        }
      }
      Object.keys(attributes).forEach((name) => {
        this.scroll.formatAt(index2, length, name, attributes[name])
      })
      const prependedLength = isImplicitNewlinePrepended ? 1 : 0
      const addedLength = isImplicitNewlineAppended ? 1 : 0
      scrollLength += prependedLength + addedLength
      deleteDelta.retain(prependedLength)
      deleteDelta.delete(addedLength)
      return index2 + length + prependedLength + addedLength
    }, 0)
    deleteDelta.reduce((index2, op) => {
      if (typeof op.delete === 'number') {
        this.scroll.deleteAt(index2, op.delete)
        return index2
      }
      return index2 + DeltaExports.Op.length(op)
    }, 0)
    this.scroll.batchEnd()
    this.scroll.optimize()
    return this.update(normalizedDelta)
  }
  deleteText(index2, length) {
    this.scroll.deleteAt(index2, length)
    return this.update(new Delta$1().retain(index2).delete(length))
  }
  formatLine(index2, length) {
    let formats = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}
    this.scroll.update()
    Object.keys(formats).forEach((format) => {
      this.scroll.lines(index2, Math.max(length, 1)).forEach((line) => {
        line.format(format, formats[format])
      })
    })
    this.scroll.optimize()
    const delta = new Delta$1().retain(index2).retain(length, cloneDeep(formats))
    return this.update(delta)
  }
  formatText(index2, length) {
    let formats = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}
    Object.keys(formats).forEach((format) => {
      this.scroll.formatAt(index2, length, format, formats[format])
    })
    const delta = new Delta$1().retain(index2).retain(length, cloneDeep(formats))
    return this.update(delta)
  }
  getContents(index2, length) {
    return this.delta.slice(index2, index2 + length)
  }
  getDelta() {
    return this.scroll.lines().reduce((delta, line) => {
      return delta.concat(line.delta())
    }, new Delta$1())
  }
  getFormat(index2) {
    let length = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0
    let lines = []
    let leaves = []
    if (length === 0) {
      this.scroll.path(index2).forEach((path) => {
        const [blot] = path
        if (blot instanceof Block) {
          lines.push(blot)
        } else if (blot instanceof LeafBlot$1) {
          leaves.push(blot)
        }
      })
    } else {
      lines = this.scroll.lines(index2, length)
      leaves = this.scroll.descendants(LeafBlot$1, index2, length)
    }
    const [lineFormats, leafFormats] = [lines, leaves].map((blots) => {
      const blot = blots.shift()
      if (blot == null) return {}
      let formats = bubbleFormats(blot)
      while (Object.keys(formats).length > 0) {
        const blot2 = blots.shift()
        if (blot2 == null) return formats
        formats = combineFormats(bubbleFormats(blot2), formats)
      }
      return formats
    })
    return {
      ...lineFormats,
      ...leafFormats
    }
  }
  getHTML(index2, length) {
    const [line, lineOffset] = this.scroll.line(index2)
    if (line) {
      const lineLength = line.length()
      const isWithinLine = line.length() >= lineOffset + length
      if (isWithinLine && !(lineOffset === 0 && length === lineLength)) {
        return convertHTML(line, lineOffset, length, true)
      }
      return convertHTML(this.scroll, index2, length, true)
    }
    return ''
  }
  getText(index2, length) {
    return this.getContents(index2, length)
      .filter((op) => typeof op.insert === 'string')
      .map((op) => op.insert)
      .join('')
  }
  insertContents(index2, contents) {
    const normalizedDelta = normalizeDelta(contents)
    const change = new Delta$1().retain(index2).concat(normalizedDelta)
    this.scroll.insertContents(index2, normalizedDelta)
    return this.update(change)
  }
  insertEmbed(index2, embed, value) {
    this.scroll.insertAt(index2, embed, value)
    return this.update(
      new Delta$1().retain(index2).insert({
        [embed]: value
      })
    )
  }
  insertText(index2, text) {
    let formats = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}
    text = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n')
    this.scroll.insertAt(index2, text)
    Object.keys(formats).forEach((format) => {
      this.scroll.formatAt(index2, text.length, format, formats[format])
    })
    return this.update(new Delta$1().retain(index2).insert(text, cloneDeep(formats)))
  }
  isBlank() {
    if (this.scroll.children.length === 0) return true
    if (this.scroll.children.length > 1) return false
    const blot = this.scroll.children.head
    if (blot?.statics.blotName !== Block.blotName) return false
    const block = blot
    if (block.children.length > 1) return false
    return block.children.head instanceof Break
  }
  removeFormat(index2, length) {
    const text = this.getText(index2, length)
    const [line, offset] = this.scroll.line(index2 + length)
    let suffixLength = 0
    let suffix = new Delta$1()
    if (line != null) {
      suffixLength = line.length() - offset
      suffix = line
        .delta()
        .slice(offset, offset + suffixLength - 1)
        .insert('\n')
    }
    const contents = this.getContents(index2, length + suffixLength)
    const diff = contents.diff(new Delta$1().insert(text).concat(suffix))
    const delta = new Delta$1().retain(index2).concat(diff)
    return this.applyDelta(delta)
  }
  update(change) {
    let mutations = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : []
    let selectionInfo = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : void 0
    const oldDelta = this.delta
    if (
      mutations.length === 1 &&
      mutations[0].type === 'characterData' && // @ts-expect-error Fix me later
      mutations[0].target.data.match(ASCII) &&
      this.scroll.find(mutations[0].target)
    ) {
      const textBlot = this.scroll.find(mutations[0].target)
      const formats = bubbleFormats(textBlot)
      const index2 = textBlot.offset(this.scroll)
      const oldValue = mutations[0].oldValue.replace(Cursor.CONTENTS, '')
      const oldText = new Delta$1().insert(oldValue)
      const newText = new Delta$1().insert(textBlot.value())
      const relativeSelectionInfo = selectionInfo && {
        oldRange: shiftRange$1(selectionInfo.oldRange, -index2),
        newRange: shiftRange$1(selectionInfo.newRange, -index2)
      }
      const diffDelta = new Delta$1()
        .retain(index2)
        .concat(oldText.diff(newText, relativeSelectionInfo))
      change = diffDelta.reduce((delta, op) => {
        if (op.insert) {
          return delta.insert(op.insert, formats)
        }
        return delta.push(op)
      }, new Delta$1())
      this.delta = oldDelta.compose(change)
    } else {
      this.delta = this.getDelta()
      if (!change || !isEqual$1(oldDelta.compose(change), this.delta)) {
        change = oldDelta.diff(this.delta, selectionInfo)
      }
    }
    return change
  }
}
function convertListHTML(items, lastIndent, types) {
  if (items.length === 0) {
    const [endTag2] = getListType(types.pop())
    if (lastIndent <= 0) {
      return `</li></${endTag2}>`
    }
    return `</li></${endTag2}>${convertListHTML([], lastIndent - 1, types)}`
  }
  const [{ child, offset, length, indent, type }, ...rest] = items
  const [tag, attribute] = getListType(type)
  if (indent > lastIndent) {
    types.push(type)
    if (indent === lastIndent + 1) {
      return `<${tag}><li${attribute}>${convertHTML(child, offset, length)}${convertListHTML(rest, indent, types)}`
    }
    return `<${tag}><li>${convertListHTML(items, lastIndent + 1, types)}`
  }
  const previousType = types[types.length - 1]
  if (indent === lastIndent && type === previousType) {
    return `</li><li${attribute}>${convertHTML(child, offset, length)}${convertListHTML(rest, indent, types)}`
  }
  const [endTag] = getListType(types.pop())
  return `</li></${endTag}>${convertListHTML(items, lastIndent - 1, types)}`
}
function convertHTML(blot, index2, length) {
  let isRoot = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false
  if ('html' in blot && typeof blot.html === 'function') {
    return blot.html(index2, length)
  }
  if (blot instanceof Text$1) {
    const escapedText = escapeText(blot.value().slice(index2, index2 + length))
    return escapedText.replaceAll(' ', '&nbsp;')
  }
  if (blot instanceof ParentBlot$1) {
    if (blot.statics.blotName === 'list-container') {
      const items = []
      blot.children.forEachAt(index2, length, (child, offset, childLength) => {
        const formats =
          'formats' in child && typeof child.formats === 'function' ? child.formats() : {}
        items.push({
          child,
          offset,
          length: childLength,
          indent: formats.indent || 0,
          type: formats.list
        })
      })
      return convertListHTML(items, -1, [])
    }
    const parts = []
    blot.children.forEachAt(index2, length, (child, offset, childLength) => {
      parts.push(convertHTML(child, offset, childLength))
    })
    if (isRoot || blot.statics.blotName === 'list') {
      return parts.join('')
    }
    const { outerHTML, innerHTML } = blot.domNode
    const [start, end] = outerHTML.split(`>${innerHTML}<`)
    if (start === '<table') {
      return `<table style="border: 1px solid #000;">${parts.join('')}<${end}`
    }
    return `${start}>${parts.join('')}<${end}`
  }
  return blot.domNode instanceof Element ? blot.domNode.outerHTML : ''
}
function combineFormats(formats, combined) {
  return Object.keys(combined).reduce((merged, name) => {
    if (formats[name] == null) return merged
    const combinedValue = combined[name]
    if (combinedValue === formats[name]) {
      merged[name] = combinedValue
    } else if (Array.isArray(combinedValue)) {
      if (combinedValue.indexOf(formats[name]) < 0) {
        merged[name] = combinedValue.concat([formats[name]])
      } else {
        merged[name] = combinedValue
      }
    } else {
      merged[name] = [combinedValue, formats[name]]
    }
    return merged
  }, {})
}
function getListType(type) {
  const tag = type === 'ordered' ? 'ol' : 'ul'
  switch (type) {
    case 'checked':
      return [tag, ' data-list="checked"']
    case 'unchecked':
      return [tag, ' data-list="unchecked"']
    default:
      return [tag, '']
  }
}
function normalizeDelta(delta) {
  return delta.reduce((normalizedDelta, op) => {
    if (typeof op.insert === 'string') {
      const text = op.insert.replace(/\r\n/g, '\n').replace(/\r/g, '\n')
      return normalizedDelta.insert(text, op.attributes)
    }
    return normalizedDelta.push(op)
  }, new Delta$1())
}
function shiftRange$1(_ref, amount) {
  let { index: index2, length } = _ref
  return new Range(index2 + amount, length)
}
function splitOpLines(ops) {
  const split = []
  ops.forEach((op) => {
    if (typeof op.insert === 'string') {
      const lines = op.insert.split('\n')
      lines.forEach((line, index2) => {
        if (index2)
          split.push({
            insert: '\n',
            attributes: op.attributes
          })
        if (line)
          split.push({
            insert: line,
            attributes: op.attributes
          })
      })
    } else {
      split.push(op)
    }
  })
  return split
}
let Module$1 = class Module {
  static DEFAULTS = {}
  constructor(quill) {
    let options2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}
    this.quill = quill
    this.options = options2
  }
}
const GUARD_TEXT = '\uFEFF'
let Embed$1 = class Embed extends EmbedBlot$1$1 {
  constructor(scroll, node) {
    super(scroll, node)
    this.contentNode = document.createElement('span')
    this.contentNode.setAttribute('contenteditable', 'false')
    Array.from(this.domNode.childNodes).forEach((childNode) => {
      this.contentNode.appendChild(childNode)
    })
    this.leftGuard = document.createTextNode(GUARD_TEXT)
    this.rightGuard = document.createTextNode(GUARD_TEXT)
    this.domNode.appendChild(this.leftGuard)
    this.domNode.appendChild(this.contentNode)
    this.domNode.appendChild(this.rightGuard)
  }
  index(node, offset) {
    if (node === this.leftGuard) return 0
    if (node === this.rightGuard) return 1
    return super.index(node, offset)
  }
  restore(node) {
    let range = null
    let textNode
    const text = node.data.split(GUARD_TEXT).join('')
    if (node === this.leftGuard) {
      if (this.prev instanceof Text$1) {
        const prevLength = this.prev.length()
        this.prev.insertAt(prevLength, text)
        range = {
          startNode: this.prev.domNode,
          startOffset: prevLength + text.length
        }
      } else {
        textNode = document.createTextNode(text)
        this.parent.insertBefore(this.scroll.create(textNode), this)
        range = {
          startNode: textNode,
          startOffset: text.length
        }
      }
    } else if (node === this.rightGuard) {
      if (this.next instanceof Text$1) {
        this.next.insertAt(0, text)
        range = {
          startNode: this.next.domNode,
          startOffset: text.length
        }
      } else {
        textNode = document.createTextNode(text)
        this.parent.insertBefore(this.scroll.create(textNode), this.next)
        range = {
          startNode: textNode,
          startOffset: text.length
        }
      }
    }
    node.data = GUARD_TEXT
    return range
  }
  update(mutations, context) {
    mutations.forEach((mutation) => {
      if (
        mutation.type === 'characterData' &&
        (mutation.target === this.leftGuard || mutation.target === this.rightGuard)
      ) {
        const range = this.restore(mutation.target)
        if (range) context.range = range
      }
    })
  }
}
class Composition {
  isComposing = false
  constructor(scroll, emitter) {
    this.scroll = scroll
    this.emitter = emitter
    this.setupListeners()
  }
  setupListeners() {
    this.scroll.domNode.addEventListener('compositionstart', (event) => {
      if (!this.isComposing) {
        this.handleCompositionStart(event)
      }
    })
    this.scroll.domNode.addEventListener('compositionend', (event) => {
      if (this.isComposing) {
        queueMicrotask(() => {
          this.handleCompositionEnd(event)
        })
      }
    })
  }
  handleCompositionStart(event) {
    const blot = event.target instanceof Node ? this.scroll.find(event.target, true) : null
    if (blot && !(blot instanceof Embed$1)) {
      this.emitter.emit(Emitter.events.COMPOSITION_BEFORE_START, event)
      this.scroll.batchStart()
      this.emitter.emit(Emitter.events.COMPOSITION_START, event)
      this.isComposing = true
    }
  }
  handleCompositionEnd(event) {
    this.emitter.emit(Emitter.events.COMPOSITION_BEFORE_END, event)
    this.scroll.batchEnd()
    this.emitter.emit(Emitter.events.COMPOSITION_END, event)
    this.isComposing = false
  }
}
class Theme {
  static DEFAULTS = {
    modules: {}
  }
  static themes = {
    default: Theme
  }
  modules = {}
  constructor(quill, options2) {
    this.quill = quill
    this.options = options2
  }
  init() {
    Object.keys(this.options.modules).forEach((name) => {
      if (this.modules[name] == null) {
        this.addModule(name)
      }
    })
  }
  addModule(name) {
    const ModuleClass = this.quill.constructor.import(`modules/${name}`)
    this.modules[name] = new ModuleClass(this.quill, this.options.modules[name] || {})
    return this.modules[name]
  }
}
const getParentElement = (element) => element.parentElement || element.getRootNode().host || null
const getElementRect = (element) => {
  const rect = element.getBoundingClientRect()
  const scaleX = ('offsetWidth' in element && Math.abs(rect.width) / element.offsetWidth) || 1
  const scaleY = ('offsetHeight' in element && Math.abs(rect.height) / element.offsetHeight) || 1
  return {
    top: rect.top,
    right: rect.left + element.clientWidth * scaleX,
    bottom: rect.top + element.clientHeight * scaleY,
    left: rect.left
  }
}
const paddingValueToInt = (value) => {
  const number = parseInt(value, 10)
  return Number.isNaN(number) ? 0 : number
}
const getScrollDistance = (
  targetStart,
  targetEnd,
  scrollStart,
  scrollEnd,
  scrollPaddingStart,
  scrollPaddingEnd
) => {
  if (targetStart < scrollStart && targetEnd > scrollEnd) {
    return 0
  }
  if (targetStart < scrollStart) {
    return -(scrollStart - targetStart + scrollPaddingStart)
  }
  if (targetEnd > scrollEnd) {
    return targetEnd - targetStart > scrollEnd - scrollStart
      ? targetStart + scrollPaddingStart - scrollStart
      : targetEnd - scrollEnd + scrollPaddingEnd
  }
  return 0
}
const scrollRectIntoView = (root, targetRect) => {
  const document2 = root.ownerDocument
  let rect = targetRect
  let current = root
  while (current) {
    const isDocumentBody = current === document2.body
    const bounding = isDocumentBody
      ? {
          top: 0,
          right: window.visualViewport?.width ?? document2.documentElement.clientWidth,
          bottom: window.visualViewport?.height ?? document2.documentElement.clientHeight,
          left: 0
        }
      : getElementRect(current)
    const style2 = getComputedStyle(current)
    const scrollDistanceX = getScrollDistance(
      rect.left,
      rect.right,
      bounding.left,
      bounding.right,
      paddingValueToInt(style2.scrollPaddingLeft),
      paddingValueToInt(style2.scrollPaddingRight)
    )
    const scrollDistanceY = getScrollDistance(
      rect.top,
      rect.bottom,
      bounding.top,
      bounding.bottom,
      paddingValueToInt(style2.scrollPaddingTop),
      paddingValueToInt(style2.scrollPaddingBottom)
    )
    if (scrollDistanceX || scrollDistanceY) {
      if (isDocumentBody) {
        document2.defaultView?.scrollBy(scrollDistanceX, scrollDistanceY)
      } else {
        const { scrollLeft, scrollTop } = current
        if (scrollDistanceY) {
          current.scrollTop += scrollDistanceY
        }
        if (scrollDistanceX) {
          current.scrollLeft += scrollDistanceX
        }
        const scrolledLeft = current.scrollLeft - scrollLeft
        const scrolledTop = current.scrollTop - scrollTop
        rect = {
          left: rect.left - scrolledLeft,
          top: rect.top - scrolledTop,
          right: rect.right - scrolledLeft,
          bottom: rect.bottom - scrolledTop
        }
      }
    }
    current = isDocumentBody || style2.position === 'fixed' ? null : getParentElement(current)
  }
}
const MAX_REGISTER_ITERATIONS = 100
const CORE_FORMATS = ['block', 'break', 'cursor', 'inline', 'scroll', 'text']
const createRegistryWithFormats = (formats, sourceRegistry, debug2) => {
  const registry = new Registry()
  CORE_FORMATS.forEach((name) => {
    const coreBlot = sourceRegistry.query(name)
    if (coreBlot) registry.register(coreBlot)
  })
  formats.forEach((name) => {
    let format = sourceRegistry.query(name)
    if (!format) {
      debug2.error(
        `Cannot register "${name}" specified in "formats" config. Are you sure it was registered?`
      )
    }
    let iterations = 0
    while (format) {
      registry.register(format)
      format = 'blotName' in format ? (format.requiredContainer ?? null) : null
      iterations += 1
      if (iterations > MAX_REGISTER_ITERATIONS) {
        debug2.error(`Cycle detected in registering blot requiredContainer: "${name}"`)
        break
      }
    }
  })
  return registry
}
const debug$3 = namespace('quill')
const globalRegistry = new Registry()
ParentBlot$1.uiClass = 'ql-ui'
class Quill {
  static DEFAULTS = {
    bounds: null,
    modules: {
      clipboard: true,
      keyboard: true,
      history: true,
      uploader: true
    },
    placeholder: '',
    readOnly: false,
    registry: globalRegistry,
    theme: 'default'
  }
  static events = Emitter.events
  static sources = Emitter.sources
  static version = '2.0.3'
  static imports = {
    delta: Delta$1,
    parchment: Parchment,
    'core/module': Module$1,
    'core/theme': Theme
  }
  static debug(limit) {
    if (limit === true) {
      limit = 'log'
    }
    namespace.level(limit)
  }
  static find(node) {
    let bubble = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false
    return instances.get(node) || globalRegistry.find(node, bubble)
  }
  static import(name) {
    if (this.imports[name] == null) {
      debug$3.error(`Cannot import ${name}. Are you sure it was registered?`)
    }
    return this.imports[name]
  }
  static register() {
    if (typeof (arguments.length <= 0 ? void 0 : arguments[0]) !== 'string') {
      const target = arguments.length <= 0 ? void 0 : arguments[0]
      const overwrite = !!(arguments.length <= 1 ? void 0 : arguments[1])
      const name = 'attrName' in target ? target.attrName : target.blotName
      if (typeof name === 'string') {
        this.register(`formats/${name}`, target, overwrite)
      } else {
        Object.keys(target).forEach((key) => {
          this.register(key, target[key], overwrite)
        })
      }
    } else {
      const path = arguments.length <= 0 ? void 0 : arguments[0]
      const target = arguments.length <= 1 ? void 0 : arguments[1]
      const overwrite = !!(arguments.length <= 2 ? void 0 : arguments[2])
      if (this.imports[path] != null && !overwrite) {
        debug$3.warn(`Overwriting ${path} with`, target)
      }
      this.imports[path] = target
      if (
        (path.startsWith('blots/') || path.startsWith('formats/')) &&
        target &&
        typeof target !== 'boolean' &&
        target.blotName !== 'abstract'
      ) {
        globalRegistry.register(target)
      }
      if (typeof target.register === 'function') {
        target.register(globalRegistry)
      }
    }
  }
  constructor(container) {
    let options2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}
    this.options = expandConfig(container, options2)
    this.container = this.options.container
    if (this.container == null) {
      debug$3.error('Invalid Quill container', container)
      return
    }
    if (this.options.debug) {
      Quill.debug(this.options.debug)
    }
    const html = this.container.innerHTML.trim()
    this.container.classList.add('ql-container')
    this.container.innerHTML = ''
    instances.set(this.container, this)
    this.root = this.addContainer('ql-editor')
    this.root.classList.add('ql-blank')
    this.emitter = new Emitter()
    const scrollBlotName = ScrollBlot$1.blotName
    const ScrollBlot2 = this.options.registry.query(scrollBlotName)
    if (!ScrollBlot2 || !('blotName' in ScrollBlot2)) {
      throw new Error(`Cannot initialize Quill without "${scrollBlotName}" blot`)
    }
    this.scroll = new ScrollBlot2(this.options.registry, this.root, {
      emitter: this.emitter
    })
    this.editor = new Editor$1(this.scroll)
    this.selection = new Selection(this.scroll, this.emitter)
    this.composition = new Composition(this.scroll, this.emitter)
    this.theme = new this.options.theme(this, this.options)
    this.keyboard = this.theme.addModule('keyboard')
    this.clipboard = this.theme.addModule('clipboard')
    this.history = this.theme.addModule('history')
    this.uploader = this.theme.addModule('uploader')
    this.theme.addModule('input')
    this.theme.addModule('uiNode')
    this.theme.init()
    this.emitter.on(Emitter.events.EDITOR_CHANGE, (type) => {
      if (type === Emitter.events.TEXT_CHANGE) {
        this.root.classList.toggle('ql-blank', this.editor.isBlank())
      }
    })
    this.emitter.on(Emitter.events.SCROLL_UPDATE, (source, mutations) => {
      const oldRange = this.selection.lastRange
      const [newRange] = this.selection.getRange()
      const selectionInfo =
        oldRange && newRange
          ? {
              oldRange,
              newRange
            }
          : void 0
      modify.call(this, () => this.editor.update(null, mutations, selectionInfo), source)
    })
    this.emitter.on(Emitter.events.SCROLL_EMBED_UPDATE, (blot, delta) => {
      const oldRange = this.selection.lastRange
      const [newRange] = this.selection.getRange()
      const selectionInfo =
        oldRange && newRange
          ? {
              oldRange,
              newRange
            }
          : void 0
      modify.call(
        this,
        () => {
          const change = new Delta$1().retain(blot.offset(this)).retain({
            [blot.statics.blotName]: delta
          })
          return this.editor.update(change, [], selectionInfo)
        },
        Quill.sources.USER
      )
    })
    if (html) {
      const contents = this.clipboard.convert({
        html: `${html}<p><br></p>`,
        text: '\n'
      })
      this.setContents(contents)
    }
    this.history.clear()
    if (this.options.placeholder) {
      this.root.setAttribute('data-placeholder', this.options.placeholder)
    }
    if (this.options.readOnly) {
      this.disable()
    }
    this.allowReadOnlyEdits = false
  }
  addContainer(container) {
    let refNode = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null
    if (typeof container === 'string') {
      const className = container
      container = document.createElement('div')
      container.classList.add(className)
    }
    this.container.insertBefore(container, refNode)
    return container
  }
  blur() {
    this.selection.setRange(null)
  }
  deleteText(index2, length, source) {
    ;[index2, length, , source] = overload(index2, length, source)
    return modify.call(
      this,
      () => {
        return this.editor.deleteText(index2, length)
      },
      source,
      index2,
      -1 * length
    )
  }
  disable() {
    this.enable(false)
  }
  editReadOnly(modifier) {
    this.allowReadOnlyEdits = true
    const value = modifier()
    this.allowReadOnlyEdits = false
    return value
  }
  enable() {
    let enabled = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : true
    this.scroll.enable(enabled)
    this.container.classList.toggle('ql-disabled', !enabled)
  }
  focus() {
    let options2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}
    this.selection.focus()
    if (!options2.preventScroll) {
      this.scrollSelectionIntoView()
    }
  }
  format(name, value) {
    let source =
      arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : Emitter.sources.API
    return modify.call(
      this,
      () => {
        const range = this.getSelection(true)
        let change = new Delta$1()
        if (range == null) return change
        if (this.scroll.query(name, Scope.BLOCK)) {
          change = this.editor.formatLine(range.index, range.length, {
            [name]: value
          })
        } else if (range.length === 0) {
          this.selection.format(name, value)
          return change
        } else {
          change = this.editor.formatText(range.index, range.length, {
            [name]: value
          })
        }
        this.setSelection(range, Emitter.sources.SILENT)
        return change
      },
      source
    )
  }
  formatLine(index2, length, name, value, source) {
    let formats
    ;[index2, length, formats, source] = overload(
      index2,
      length,
      // @ts-expect-error
      name,
      value,
      source
    )
    return modify.call(
      this,
      () => {
        return this.editor.formatLine(index2, length, formats)
      },
      source,
      index2,
      0
    )
  }
  formatText(index2, length, name, value, source) {
    let formats
    ;[index2, length, formats, source] = overload(
      // @ts-expect-error
      index2,
      length,
      name,
      value,
      source
    )
    return modify.call(
      this,
      () => {
        return this.editor.formatText(index2, length, formats)
      },
      source,
      index2,
      0
    )
  }
  getBounds(index2) {
    let length = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0
    let bounds = null
    if (typeof index2 === 'number') {
      bounds = this.selection.getBounds(index2, length)
    } else {
      bounds = this.selection.getBounds(index2.index, index2.length)
    }
    if (!bounds) return null
    const containerBounds = this.container.getBoundingClientRect()
    return {
      bottom: bounds.bottom - containerBounds.top,
      height: bounds.height,
      left: bounds.left - containerBounds.left,
      right: bounds.right - containerBounds.left,
      top: bounds.top - containerBounds.top,
      width: bounds.width
    }
  }
  getContents() {
    let index2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0
    let length =
      arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.getLength() - index2
    ;[index2, length] = overload(index2, length)
    return this.editor.getContents(index2, length)
  }
  getFormat() {
    let index2 =
      arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.getSelection(true)
    let length = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0
    if (typeof index2 === 'number') {
      return this.editor.getFormat(index2, length)
    }
    return this.editor.getFormat(index2.index, index2.length)
  }
  getIndex(blot) {
    return blot.offset(this.scroll)
  }
  getLength() {
    return this.scroll.length()
  }
  getLeaf(index2) {
    return this.scroll.leaf(index2)
  }
  getLine(index2) {
    return this.scroll.line(index2)
  }
  getLines() {
    let index2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0
    let length = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Number.MAX_VALUE
    if (typeof index2 !== 'number') {
      return this.scroll.lines(index2.index, index2.length)
    }
    return this.scroll.lines(index2, length)
  }
  getModule(name) {
    return this.theme.modules[name]
  }
  getSelection() {
    let focus = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false
    if (focus) this.focus()
    this.update()
    return this.selection.getRange()[0]
  }
  getSemanticHTML() {
    let index2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0
    let length = arguments.length > 1 ? arguments[1] : void 0
    if (typeof index2 === 'number') {
      length = length ?? this.getLength() - index2
    }
    ;[index2, length] = overload(index2, length)
    return this.editor.getHTML(index2, length)
  }
  getText() {
    let index2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0
    let length = arguments.length > 1 ? arguments[1] : void 0
    if (typeof index2 === 'number') {
      length = length ?? this.getLength() - index2
    }
    ;[index2, length] = overload(index2, length)
    return this.editor.getText(index2, length)
  }
  hasFocus() {
    return this.selection.hasFocus()
  }
  insertEmbed(index2, embed, value) {
    let source = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : Quill.sources.API
    return modify.call(
      this,
      () => {
        return this.editor.insertEmbed(index2, embed, value)
      },
      source,
      index2
    )
  }
  insertText(index2, text, name, value, source) {
    let formats
    ;[index2, , formats, source] = overload(index2, 0, name, value, source)
    return modify.call(
      this,
      () => {
        return this.editor.insertText(index2, text, formats)
      },
      source,
      index2,
      text.length
    )
  }
  isEnabled() {
    return this.scroll.isEnabled()
  }
  off() {
    return this.emitter.off(...arguments)
  }
  on() {
    return this.emitter.on(...arguments)
  }
  once() {
    return this.emitter.once(...arguments)
  }
  removeFormat(index2, length, source) {
    ;[index2, length, , source] = overload(index2, length, source)
    return modify.call(
      this,
      () => {
        return this.editor.removeFormat(index2, length)
      },
      source,
      index2
    )
  }
  scrollRectIntoView(rect) {
    scrollRectIntoView(this.root, rect)
  }
  /**
   * @deprecated Use Quill#scrollSelectionIntoView() instead.
   */
  scrollIntoView() {
    console.warn(
      'Quill#scrollIntoView() has been deprecated and will be removed in the near future. Please use Quill#scrollSelectionIntoView() instead.'
    )
    this.scrollSelectionIntoView()
  }
  /**
   * Scroll the current selection into the visible area.
   * If the selection is already visible, no scrolling will occur.
   */
  scrollSelectionIntoView() {
    const range = this.selection.lastRange
    const bounds = range && this.selection.getBounds(range.index, range.length)
    if (bounds) {
      this.scrollRectIntoView(bounds)
    }
  }
  setContents(delta) {
    let source =
      arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Emitter.sources.API
    return modify.call(
      this,
      () => {
        delta = new Delta$1(delta)
        const length = this.getLength()
        const delete1 = this.editor.deleteText(0, length)
        const applied = this.editor.insertContents(0, delta)
        const delete2 = this.editor.deleteText(this.getLength() - 1, 1)
        return delete1.compose(applied).compose(delete2)
      },
      source
    )
  }
  setSelection(index2, length, source) {
    if (index2 == null) {
      this.selection.setRange(null, length || Quill.sources.API)
    } else {
      ;[index2, length, , source] = overload(index2, length, source)
      this.selection.setRange(new Range(Math.max(0, index2), length), source)
      if (source !== Emitter.sources.SILENT) {
        this.scrollSelectionIntoView()
      }
    }
  }
  setText(text) {
    let source =
      arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Emitter.sources.API
    const delta = new Delta$1().insert(text)
    return this.setContents(delta, source)
  }
  update() {
    let source =
      arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : Emitter.sources.USER
    const change = this.scroll.update(source)
    this.selection.update(source)
    return change
  }
  updateContents(delta) {
    let source =
      arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Emitter.sources.API
    return modify.call(
      this,
      () => {
        delta = new Delta$1(delta)
        return this.editor.applyDelta(delta)
      },
      source,
      true
    )
  }
}
function resolveSelector(selector) {
  return typeof selector === 'string' ? document.querySelector(selector) : selector
}
function expandModuleConfig(config2) {
  return Object.entries(config2 ?? {}).reduce((expanded, _ref) => {
    let [key, value] = _ref
    return {
      ...expanded,
      [key]: value === true ? {} : value
    }
  }, {})
}
function omitUndefinedValuesFromOptions(obj) {
  return Object.fromEntries(Object.entries(obj).filter((entry) => entry[1] !== void 0))
}
function expandConfig(containerOrSelector, options2) {
  const container = resolveSelector(containerOrSelector)
  if (!container) {
    throw new Error('Invalid Quill container')
  }
  const shouldUseDefaultTheme = !options2.theme || options2.theme === Quill.DEFAULTS.theme
  const theme = shouldUseDefaultTheme ? Theme : Quill.import(`themes/${options2.theme}`)
  if (!theme) {
    throw new Error(`Invalid theme ${options2.theme}. Did you register it?`)
  }
  const { modules: quillModuleDefaults, ...quillDefaults } = Quill.DEFAULTS
  const { modules: themeModuleDefaults, ...themeDefaults } = theme.DEFAULTS
  let userModuleOptions = expandModuleConfig(options2.modules)
  if (
    userModuleOptions != null &&
    userModuleOptions.toolbar &&
    userModuleOptions.toolbar.constructor !== Object
  ) {
    userModuleOptions = {
      ...userModuleOptions,
      toolbar: {
        container: userModuleOptions.toolbar
      }
    }
  }
  const modules = merge(
    {},
    expandModuleConfig(quillModuleDefaults),
    expandModuleConfig(themeModuleDefaults),
    userModuleOptions
  )
  const config2 = {
    ...quillDefaults,
    ...omitUndefinedValuesFromOptions(themeDefaults),
    ...omitUndefinedValuesFromOptions(options2)
  }
  let registry = options2.registry
  if (registry) {
    if (options2.formats) {
      debug$3.warn('Ignoring "formats" option because "registry" is specified')
    }
  } else {
    registry = options2.formats
      ? createRegistryWithFormats(options2.formats, config2.registry, debug$3)
      : config2.registry
  }
  return {
    ...config2,
    registry,
    container,
    theme,
    modules: Object.entries(modules).reduce((modulesWithDefaults, _ref2) => {
      let [name, value] = _ref2
      if (!value) return modulesWithDefaults
      const moduleClass = Quill.import(`modules/${name}`)
      if (moduleClass == null) {
        debug$3.error(`Cannot load ${name} module. Are you sure you registered it?`)
        return modulesWithDefaults
      }
      return {
        ...modulesWithDefaults,
        // @ts-expect-error
        [name]: merge({}, moduleClass.DEFAULTS || {}, value)
      }
    }, {}),
    bounds: resolveSelector(config2.bounds)
  }
}
function modify(modifier, source, index2, shift) {
  if (!this.isEnabled() && source === Emitter.sources.USER && !this.allowReadOnlyEdits) {
    return new Delta$1()
  }
  let range = index2 == null ? null : this.getSelection()
  const oldDelta = this.editor.delta
  const change = modifier()
  if (range != null) {
    if (index2 === true) {
      index2 = range.index
    }
    if (shift == null) {
      range = shiftRange(range, change, source)
    } else if (shift !== 0) {
      range = shiftRange(range, index2, shift, source)
    }
    this.setSelection(range, Emitter.sources.SILENT)
  }
  if (change.length() > 0) {
    const args = [Emitter.events.TEXT_CHANGE, change, oldDelta, source]
    this.emitter.emit(Emitter.events.EDITOR_CHANGE, ...args)
    if (source !== Emitter.sources.SILENT) {
      this.emitter.emit(...args)
    }
  }
  return change
}
function overload(index2, length, name, value, source) {
  let formats = {}
  if (typeof index2.index === 'number' && typeof index2.length === 'number') {
    if (typeof length !== 'number') {
      source = value
      value = name
      name = length
      length = index2.length
      index2 = index2.index
    } else {
      length = index2.length
      index2 = index2.index
    }
  } else if (typeof length !== 'number') {
    source = value
    value = name
    name = length
    length = 0
  }
  if (typeof name === 'object') {
    formats = name
    source = value
  } else if (typeof name === 'string') {
    if (value != null) {
      formats[name] = value
    } else {
      source = name
    }
  }
  source = source || Emitter.sources.API
  return [index2, length, formats, source]
}
function shiftRange(range, index2, lengthOrSource, source) {
  const length = typeof lengthOrSource === 'number' ? lengthOrSource : 0
  if (range == null) return null
  let start
  let end
  if (index2 && typeof index2.transformPosition === 'function') {
    ;[start, end] = [range.index, range.index + range.length].map((pos) =>
      // @ts-expect-error -- TODO: add a better type guard around `index`
      index2.transformPosition(pos, source !== Emitter.sources.USER)
    )
  } else {
    ;[start, end] = [range.index, range.index + range.length].map((pos) => {
      if (pos < index2 || (pos === index2 && source === Emitter.sources.USER)) return pos
      if (length >= 0) {
        return pos + length
      }
      return Math.max(index2, pos + length)
    })
  }
  return new Range(start, end - start)
}
class Container extends ContainerBlot$1 {}
function isLine$1(blot) {
  return blot instanceof Block || blot instanceof BlockEmbed$1
}
function isUpdatable(blot) {
  return typeof blot.updateContent === 'function'
}
class Scroll extends ScrollBlot$1 {
  static blotName = 'scroll'
  static className = 'ql-editor'
  static tagName = 'DIV'
  static defaultChild = Block
  static allowedChildren = [Block, BlockEmbed$1, Container]
  constructor(registry, domNode, _ref) {
    let { emitter } = _ref
    super(registry, domNode)
    this.emitter = emitter
    this.batch = false
    this.optimize()
    this.enable()
    this.domNode.addEventListener('dragstart', (e) => this.handleDragStart(e))
  }
  batchStart() {
    if (!Array.isArray(this.batch)) {
      this.batch = []
    }
  }
  batchEnd() {
    if (!this.batch) return
    const mutations = this.batch
    this.batch = false
    this.update(mutations)
  }
  emitMount(blot) {
    this.emitter.emit(Emitter.events.SCROLL_BLOT_MOUNT, blot)
  }
  emitUnmount(blot) {
    this.emitter.emit(Emitter.events.SCROLL_BLOT_UNMOUNT, blot)
  }
  emitEmbedUpdate(blot, change) {
    this.emitter.emit(Emitter.events.SCROLL_EMBED_UPDATE, blot, change)
  }
  deleteAt(index2, length) {
    const [first, offset] = this.line(index2)
    const [last] = this.line(index2 + length)
    super.deleteAt(index2, length)
    if (last != null && first !== last && offset > 0) {
      if (first instanceof BlockEmbed$1 || last instanceof BlockEmbed$1) {
        this.optimize()
        return
      }
      const ref2 = last.children.head instanceof Break ? null : last.children.head
      first.moveChildren(last, ref2)
      first.remove()
    }
    this.optimize()
  }
  enable() {
    let enabled = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : true
    this.domNode.setAttribute('contenteditable', enabled ? 'true' : 'false')
  }
  formatAt(index2, length, format, value) {
    super.formatAt(index2, length, format, value)
    this.optimize()
  }
  insertAt(index2, value, def) {
    if (index2 >= this.length()) {
      if (def == null || this.scroll.query(value, Scope.BLOCK) == null) {
        const blot = this.scroll.create(this.statics.defaultChild.blotName)
        this.appendChild(blot)
        if (def == null && value.endsWith('\n')) {
          blot.insertAt(0, value.slice(0, -1), def)
        } else {
          blot.insertAt(0, value, def)
        }
      } else {
        const embed = this.scroll.create(value, def)
        this.appendChild(embed)
      }
    } else {
      super.insertAt(index2, value, def)
    }
    this.optimize()
  }
  insertBefore(blot, ref2) {
    if (blot.statics.scope === Scope.INLINE_BLOT) {
      const wrapper = this.scroll.create(this.statics.defaultChild.blotName)
      wrapper.appendChild(blot)
      super.insertBefore(wrapper, ref2)
    } else {
      super.insertBefore(blot, ref2)
    }
  }
  insertContents(index2, delta) {
    const renderBlocks = this.deltaToRenderBlocks(delta.concat(new Delta$1().insert('\n')))
    const last = renderBlocks.pop()
    if (last == null) return
    this.batchStart()
    const first = renderBlocks.shift()
    if (first) {
      const shouldInsertNewlineChar =
        first.type === 'block' &&
        (first.delta.length() === 0 ||
          (!this.descendant(BlockEmbed$1, index2)[0] && index2 < this.length()))
      const delta2 =
        first.type === 'block'
          ? first.delta
          : new Delta$1().insert({
              [first.key]: first.value
            })
      insertInlineContents(this, index2, delta2)
      const newlineCharLength = first.type === 'block' ? 1 : 0
      const lineEndIndex = index2 + delta2.length() + newlineCharLength
      if (shouldInsertNewlineChar) {
        this.insertAt(lineEndIndex - 1, '\n')
      }
      const formats = bubbleFormats(this.line(index2)[0])
      const attributes = DeltaExports.AttributeMap.diff(formats, first.attributes) || {}
      Object.keys(attributes).forEach((name) => {
        this.formatAt(lineEndIndex - 1, 1, name, attributes[name])
      })
      index2 = lineEndIndex
    }
    let [refBlot, refBlotOffset] = this.children.find(index2)
    if (renderBlocks.length) {
      if (refBlot) {
        refBlot = refBlot.split(refBlotOffset)
        refBlotOffset = 0
      }
      renderBlocks.forEach((renderBlock) => {
        if (renderBlock.type === 'block') {
          const block = this.createBlock(renderBlock.attributes, refBlot || void 0)
          insertInlineContents(block, 0, renderBlock.delta)
        } else {
          const blockEmbed = this.create(renderBlock.key, renderBlock.value)
          this.insertBefore(blockEmbed, refBlot || void 0)
          Object.keys(renderBlock.attributes).forEach((name) => {
            blockEmbed.format(name, renderBlock.attributes[name])
          })
        }
      })
    }
    if (last.type === 'block' && last.delta.length()) {
      const offset = refBlot ? refBlot.offset(refBlot.scroll) + refBlotOffset : this.length()
      insertInlineContents(this, offset, last.delta)
    }
    this.batchEnd()
    this.optimize()
  }
  isEnabled() {
    return this.domNode.getAttribute('contenteditable') === 'true'
  }
  leaf(index2) {
    const last = this.path(index2).pop()
    if (!last) {
      return [null, -1]
    }
    const [blot, offset] = last
    return blot instanceof LeafBlot$1 ? [blot, offset] : [null, -1]
  }
  line(index2) {
    if (index2 === this.length()) {
      return this.line(index2 - 1)
    }
    return this.descendant(isLine$1, index2)
  }
  lines() {
    let index2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0
    let length = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Number.MAX_VALUE
    const getLines = (blot, blotIndex, blotLength) => {
      let lines = []
      let lengthLeft = blotLength
      blot.children.forEachAt(blotIndex, blotLength, (child, childIndex, childLength) => {
        if (isLine$1(child)) {
          lines.push(child)
        } else if (child instanceof ContainerBlot$1) {
          lines = lines.concat(getLines(child, childIndex, lengthLeft))
        }
        lengthLeft -= childLength
      })
      return lines
    }
    return getLines(this, index2, length)
  }
  optimize() {
    let mutations = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : []
    let context = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}
    if (this.batch) return
    super.optimize(mutations, context)
    if (mutations.length > 0) {
      this.emitter.emit(Emitter.events.SCROLL_OPTIMIZE, mutations, context)
    }
  }
  path(index2) {
    return super.path(index2).slice(1)
  }
  remove() {}
  update(mutations) {
    if (this.batch) {
      if (Array.isArray(mutations)) {
        this.batch = this.batch.concat(mutations)
      }
      return
    }
    let source = Emitter.sources.USER
    if (typeof mutations === 'string') {
      source = mutations
    }
    if (!Array.isArray(mutations)) {
      mutations = this.observer.takeRecords()
    }
    mutations = mutations.filter((_ref2) => {
      let { target } = _ref2
      const blot = this.find(target, true)
      return blot && !isUpdatable(blot)
    })
    if (mutations.length > 0) {
      this.emitter.emit(Emitter.events.SCROLL_BEFORE_UPDATE, source, mutations)
    }
    super.update(mutations.concat([]))
    if (mutations.length > 0) {
      this.emitter.emit(Emitter.events.SCROLL_UPDATE, source, mutations)
    }
  }
  updateEmbedAt(index2, key, change) {
    const [blot] = this.descendant((b) => b instanceof BlockEmbed$1, index2)
    if (blot && blot.statics.blotName === key && isUpdatable(blot)) {
      blot.updateContent(change)
    }
  }
  handleDragStart(event) {
    event.preventDefault()
  }
  deltaToRenderBlocks(delta) {
    const renderBlocks = []
    let currentBlockDelta = new Delta$1()
    delta.forEach((op) => {
      const insert = op?.insert
      if (!insert) return
      if (typeof insert === 'string') {
        const splitted = insert.split('\n')
        splitted.slice(0, -1).forEach((text) => {
          currentBlockDelta.insert(text, op.attributes)
          renderBlocks.push({
            type: 'block',
            delta: currentBlockDelta,
            attributes: op.attributes ?? {}
          })
          currentBlockDelta = new Delta$1()
        })
        const last = splitted[splitted.length - 1]
        if (last) {
          currentBlockDelta.insert(last, op.attributes)
        }
      } else {
        const key = Object.keys(insert)[0]
        if (!key) return
        if (this.query(key, Scope.INLINE)) {
          currentBlockDelta.push(op)
        } else {
          if (currentBlockDelta.length()) {
            renderBlocks.push({
              type: 'block',
              delta: currentBlockDelta,
              attributes: {}
            })
          }
          currentBlockDelta = new Delta$1()
          renderBlocks.push({
            type: 'blockEmbed',
            key,
            value: insert[key],
            attributes: op.attributes ?? {}
          })
        }
      }
    })
    if (currentBlockDelta.length()) {
      renderBlocks.push({
        type: 'block',
        delta: currentBlockDelta,
        attributes: {}
      })
    }
    return renderBlocks
  }
  createBlock(attributes, refBlot) {
    let blotName
    const formats = {}
    Object.entries(attributes).forEach((_ref3) => {
      let [key, value] = _ref3
      const isBlockBlot = this.query(key, Scope.BLOCK & Scope.BLOT) != null
      if (isBlockBlot) {
        blotName = key
      } else {
        formats[key] = value
      }
    })
    const block = this.create(
      blotName || this.statics.defaultChild.blotName,
      blotName ? attributes[blotName] : void 0
    )
    this.insertBefore(block, refBlot || void 0)
    const length = block.length()
    Object.entries(formats).forEach((_ref4) => {
      let [key, value] = _ref4
      block.formatAt(0, length, key, value)
    })
    return block
  }
}
function insertInlineContents(parent, index2, inlineContents) {
  inlineContents.reduce((index3, op) => {
    const length = DeltaExports.Op.length(op)
    let attributes = op.attributes || {}
    if (op.insert != null) {
      if (typeof op.insert === 'string') {
        const text = op.insert
        parent.insertAt(index3, text)
        const [leaf] = parent.descendant(LeafBlot$1, index3)
        const formats = bubbleFormats(leaf)
        attributes = DeltaExports.AttributeMap.diff(formats, attributes) || {}
      } else if (typeof op.insert === 'object') {
        const key = Object.keys(op.insert)[0]
        if (key == null) return index3
        parent.insertAt(index3, key, op.insert[key])
        const isInlineEmbed = parent.scroll.query(key, Scope.INLINE) != null
        if (isInlineEmbed) {
          const [leaf] = parent.descendant(LeafBlot$1, index3)
          const formats = bubbleFormats(leaf)
          attributes = DeltaExports.AttributeMap.diff(formats, attributes) || {}
        }
      }
    }
    Object.keys(attributes).forEach((key) => {
      parent.formatAt(index3, length, key, attributes[key])
    })
    return index3 + length
  }, index2)
}
const config$2 = {
  scope: Scope.BLOCK,
  whitelist: ['right', 'center', 'justify']
}
const AlignAttribute = new Attributor('align', 'align', config$2)
const AlignClass = new ClassAttributor$1('align', 'ql-align', config$2)
const AlignStyle = new StyleAttributor$1('align', 'text-align', config$2)
class ColorAttributor extends StyleAttributor$1 {
  value(domNode) {
    let value = super.value(domNode)
    if (!value.startsWith('rgb(')) return value
    value = value.replace(/^[^\d]+/, '').replace(/[^\d]+$/, '')
    const hex = value
      .split(',')
      .map((component) => `00${parseInt(component, 10).toString(16)}`.slice(-2))
      .join('')
    return `#${hex}`
  }
}
const ColorClass = new ClassAttributor$1('color', 'ql-color', {
  scope: Scope.INLINE
})
const ColorStyle = new ColorAttributor('color', 'color', {
  scope: Scope.INLINE
})
const BackgroundClass = new ClassAttributor$1('background', 'ql-bg', {
  scope: Scope.INLINE
})
const BackgroundStyle = new ColorAttributor('background', 'background-color', {
  scope: Scope.INLINE
})
class CodeBlockContainer extends Container {
  static create(value) {
    const domNode = super.create(value)
    domNode.setAttribute('spellcheck', 'false')
    return domNode
  }
  code(index2, length) {
    return this.children
      .map((child) => (child.length() <= 1 ? '' : child.domNode.innerText))
      .join('\n')
      .slice(index2, index2 + length)
  }
  html(index2, length) {
    return `<pre>
${escapeText(this.code(index2, length))}
</pre>`
  }
}
class CodeBlock extends Block {
  static TAB = '  '
  static register() {
    Quill.register(CodeBlockContainer)
  }
}
class Code extends Inline {}
Code.blotName = 'code'
Code.tagName = 'CODE'
CodeBlock.blotName = 'code-block'
CodeBlock.className = 'ql-code-block'
CodeBlock.tagName = 'DIV'
CodeBlockContainer.blotName = 'code-block-container'
CodeBlockContainer.className = 'ql-code-block-container'
CodeBlockContainer.tagName = 'DIV'
CodeBlockContainer.allowedChildren = [CodeBlock]
CodeBlock.allowedChildren = [Text$1, Break, Cursor]
CodeBlock.requiredContainer = CodeBlockContainer
const config$1 = {
  scope: Scope.BLOCK,
  whitelist: ['rtl']
}
const DirectionAttribute = new Attributor('direction', 'dir', config$1)
const DirectionClass = new ClassAttributor$1('direction', 'ql-direction', config$1)
const DirectionStyle = new StyleAttributor$1('direction', 'direction', config$1)
const config = {
  scope: Scope.INLINE,
  whitelist: ['serif', 'monospace']
}
const FontClass = new ClassAttributor$1('font', 'ql-font', config)
class FontStyleAttributor extends StyleAttributor$1 {
  value(node) {
    return super.value(node).replace(/["']/g, '')
  }
}
const FontStyle = new FontStyleAttributor('font', 'font-family', config)
const SizeClass = new ClassAttributor$1('size', 'ql-size', {
  scope: Scope.INLINE,
  whitelist: ['small', 'large', 'huge']
})
const SizeStyle = new StyleAttributor$1('size', 'font-size', {
  scope: Scope.INLINE,
  whitelist: ['10px', '18px', '32px']
})
const debug$2 = namespace('quill:keyboard')
const SHORTKEY = /Mac/i.test(navigator.platform) ? 'metaKey' : 'ctrlKey'
class Keyboard extends Module$1 {
  static match(evt, binding) {
    if (
      ['altKey', 'ctrlKey', 'metaKey', 'shiftKey'].some((key) => {
        return !!binding[key] !== evt[key] && binding[key] !== null
      })
    ) {
      return false
    }
    return binding.key === evt.key || binding.key === evt.which
  }
  constructor(quill, options2) {
    super(quill, options2)
    this.bindings = {}
    Object.keys(this.options.bindings).forEach((name) => {
      if (this.options.bindings[name]) {
        this.addBinding(this.options.bindings[name])
      }
    })
    this.addBinding(
      {
        key: 'Enter',
        shiftKey: null
      },
      this.handleEnter
    )
    this.addBinding(
      {
        key: 'Enter',
        metaKey: null,
        ctrlKey: null,
        altKey: null
      },
      () => {}
    )
    if (/Firefox/i.test(navigator.userAgent)) {
      this.addBinding(
        {
          key: 'Backspace'
        },
        {
          collapsed: true
        },
        this.handleBackspace
      )
      this.addBinding(
        {
          key: 'Delete'
        },
        {
          collapsed: true
        },
        this.handleDelete
      )
    } else {
      this.addBinding(
        {
          key: 'Backspace'
        },
        {
          collapsed: true,
          prefix: /^.?$/
        },
        this.handleBackspace
      )
      this.addBinding(
        {
          key: 'Delete'
        },
        {
          collapsed: true,
          suffix: /^.?$/
        },
        this.handleDelete
      )
    }
    this.addBinding(
      {
        key: 'Backspace'
      },
      {
        collapsed: false
      },
      this.handleDeleteRange
    )
    this.addBinding(
      {
        key: 'Delete'
      },
      {
        collapsed: false
      },
      this.handleDeleteRange
    )
    this.addBinding(
      {
        key: 'Backspace',
        altKey: null,
        ctrlKey: null,
        metaKey: null,
        shiftKey: null
      },
      {
        collapsed: true,
        offset: 0
      },
      this.handleBackspace
    )
    this.listen()
  }
  addBinding(keyBinding) {
    let context = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}
    let handler = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}
    const binding = normalize$2(keyBinding)
    if (binding == null) {
      debug$2.warn('Attempted to add invalid keyboard binding', binding)
      return
    }
    if (typeof context === 'function') {
      context = {
        handler: context
      }
    }
    if (typeof handler === 'function') {
      handler = {
        handler
      }
    }
    const keys = Array.isArray(binding.key) ? binding.key : [binding.key]
    keys.forEach((key) => {
      const singleBinding = {
        ...binding,
        key,
        ...context,
        ...handler
      }
      this.bindings[singleBinding.key] = this.bindings[singleBinding.key] || []
      this.bindings[singleBinding.key].push(singleBinding)
    })
  }
  listen() {
    this.quill.root.addEventListener('keydown', (evt) => {
      if (evt.defaultPrevented || evt.isComposing) return
      const isComposing = evt.keyCode === 229 && (evt.key === 'Enter' || evt.key === 'Backspace')
      if (isComposing) return
      const bindings = (this.bindings[evt.key] || []).concat(this.bindings[evt.which] || [])
      const matches = bindings.filter((binding) => Keyboard.match(evt, binding))
      if (matches.length === 0) return
      const blot = Quill.find(evt.target, true)
      if (blot && blot.scroll !== this.quill.scroll) return
      const range = this.quill.getSelection()
      if (range == null || !this.quill.hasFocus()) return
      const [line, offset] = this.quill.getLine(range.index)
      const [leafStart, offsetStart] = this.quill.getLeaf(range.index)
      const [leafEnd, offsetEnd] =
        range.length === 0
          ? [leafStart, offsetStart]
          : this.quill.getLeaf(range.index + range.length)
      const prefixText =
        leafStart instanceof TextBlot$1 ? leafStart.value().slice(0, offsetStart) : ''
      const suffixText = leafEnd instanceof TextBlot$1 ? leafEnd.value().slice(offsetEnd) : ''
      const curContext = {
        collapsed: range.length === 0,
        // @ts-expect-error Fix me later
        empty: range.length === 0 && line.length() <= 1,
        format: this.quill.getFormat(range),
        line,
        offset,
        prefix: prefixText,
        suffix: suffixText,
        event: evt
      }
      const prevented = matches.some((binding) => {
        if (binding.collapsed != null && binding.collapsed !== curContext.collapsed) {
          return false
        }
        if (binding.empty != null && binding.empty !== curContext.empty) {
          return false
        }
        if (binding.offset != null && binding.offset !== curContext.offset) {
          return false
        }
        if (Array.isArray(binding.format)) {
          if (binding.format.every((name) => curContext.format[name] == null)) {
            return false
          }
        } else if (typeof binding.format === 'object') {
          if (
            !Object.keys(binding.format).every((name) => {
              if (binding.format[name] === true) return curContext.format[name] != null
              if (binding.format[name] === false) return curContext.format[name] == null
              return isEqual$1(binding.format[name], curContext.format[name])
            })
          ) {
            return false
          }
        }
        if (binding.prefix != null && !binding.prefix.test(curContext.prefix)) {
          return false
        }
        if (binding.suffix != null && !binding.suffix.test(curContext.suffix)) {
          return false
        }
        return binding.handler.call(this, range, curContext, binding) !== true
      })
      if (prevented) {
        evt.preventDefault()
      }
    })
  }
  handleBackspace(range, context) {
    const length = /[\uD800-\uDBFF][\uDC00-\uDFFF]$/.test(context.prefix) ? 2 : 1
    if (range.index === 0 || this.quill.getLength() <= 1) return
    let formats = {}
    const [line] = this.quill.getLine(range.index)
    let delta = new Delta$1().retain(range.index - length).delete(length)
    if (context.offset === 0) {
      const [prev] = this.quill.getLine(range.index - 1)
      if (prev) {
        const isPrevLineEmpty = prev.statics.blotName === 'block' && prev.length() <= 1
        if (!isPrevLineEmpty) {
          const curFormats = line.formats()
          const prevFormats = this.quill.getFormat(range.index - 1, 1)
          formats = DeltaExports.AttributeMap.diff(curFormats, prevFormats) || {}
          if (Object.keys(formats).length > 0) {
            const formatDelta = new Delta$1()
              .retain(range.index + line.length() - 2)
              .retain(1, formats)
            delta = delta.compose(formatDelta)
          }
        }
      }
    }
    this.quill.updateContents(delta, Quill.sources.USER)
    this.quill.focus()
  }
  handleDelete(range, context) {
    const length = /^[\uD800-\uDBFF][\uDC00-\uDFFF]/.test(context.suffix) ? 2 : 1
    if (range.index >= this.quill.getLength() - length) return
    let formats = {}
    const [line] = this.quill.getLine(range.index)
    let delta = new Delta$1().retain(range.index).delete(length)
    if (context.offset >= line.length() - 1) {
      const [next] = this.quill.getLine(range.index + 1)
      if (next) {
        const curFormats = line.formats()
        const nextFormats = this.quill.getFormat(range.index, 1)
        formats = DeltaExports.AttributeMap.diff(curFormats, nextFormats) || {}
        if (Object.keys(formats).length > 0) {
          delta = delta.retain(next.length() - 1).retain(1, formats)
        }
      }
    }
    this.quill.updateContents(delta, Quill.sources.USER)
    this.quill.focus()
  }
  handleDeleteRange(range) {
    deleteRange({
      range,
      quill: this.quill
    })
    this.quill.focus()
  }
  handleEnter(range, context) {
    const lineFormats = Object.keys(context.format).reduce((formats, format) => {
      if (this.quill.scroll.query(format, Scope.BLOCK) && !Array.isArray(context.format[format])) {
        formats[format] = context.format[format]
      }
      return formats
    }, {})
    const delta = new Delta$1().retain(range.index).delete(range.length).insert('\n', lineFormats)
    this.quill.updateContents(delta, Quill.sources.USER)
    this.quill.setSelection(range.index + 1, Quill.sources.SILENT)
    this.quill.focus()
  }
}
const defaultOptions$1 = {
  bindings: {
    bold: makeFormatHandler('bold'),
    italic: makeFormatHandler('italic'),
    underline: makeFormatHandler('underline'),
    indent: {
      // highlight tab or tab at beginning of list, indent or blockquote
      key: 'Tab',
      format: ['blockquote', 'indent', 'list'],
      handler(range, context) {
        if (context.collapsed && context.offset !== 0) return true
        this.quill.format('indent', '+1', Quill.sources.USER)
        return false
      }
    },
    outdent: {
      key: 'Tab',
      shiftKey: true,
      format: ['blockquote', 'indent', 'list'],
      // highlight tab or tab at beginning of list, indent or blockquote
      handler(range, context) {
        if (context.collapsed && context.offset !== 0) return true
        this.quill.format('indent', '-1', Quill.sources.USER)
        return false
      }
    },
    'outdent backspace': {
      key: 'Backspace',
      collapsed: true,
      shiftKey: null,
      metaKey: null,
      ctrlKey: null,
      altKey: null,
      format: ['indent', 'list'],
      offset: 0,
      handler(range, context) {
        if (context.format.indent != null) {
          this.quill.format('indent', '-1', Quill.sources.USER)
        } else if (context.format.list != null) {
          this.quill.format('list', false, Quill.sources.USER)
        }
      }
    },
    'indent code-block': makeCodeBlockHandler(true),
    'outdent code-block': makeCodeBlockHandler(false),
    'remove tab': {
      key: 'Tab',
      shiftKey: true,
      collapsed: true,
      prefix: /\t$/,
      handler(range) {
        this.quill.deleteText(range.index - 1, 1, Quill.sources.USER)
      }
    },
    tab: {
      key: 'Tab',
      handler(range, context) {
        if (context.format.table) return true
        this.quill.history.cutoff()
        const delta = new Delta$1().retain(range.index).delete(range.length).insert('	')
        this.quill.updateContents(delta, Quill.sources.USER)
        this.quill.history.cutoff()
        this.quill.setSelection(range.index + 1, Quill.sources.SILENT)
        return false
      }
    },
    'blockquote empty enter': {
      key: 'Enter',
      collapsed: true,
      format: ['blockquote'],
      empty: true,
      handler() {
        this.quill.format('blockquote', false, Quill.sources.USER)
      }
    },
    'list empty enter': {
      key: 'Enter',
      collapsed: true,
      format: ['list'],
      empty: true,
      handler(range, context) {
        const formats = {
          list: false
        }
        if (context.format.indent) {
          formats.indent = false
        }
        this.quill.formatLine(range.index, range.length, formats, Quill.sources.USER)
      }
    },
    'checklist enter': {
      key: 'Enter',
      collapsed: true,
      format: {
        list: 'checked'
      },
      handler(range) {
        const [line, offset] = this.quill.getLine(range.index)
        const formats = {
          // @ts-expect-error Fix me later
          ...line.formats(),
          list: 'checked'
        }
        const delta = new Delta$1()
          .retain(range.index)
          .insert('\n', formats)
          .retain(line.length() - offset - 1)
          .retain(1, {
            list: 'unchecked'
          })
        this.quill.updateContents(delta, Quill.sources.USER)
        this.quill.setSelection(range.index + 1, Quill.sources.SILENT)
        this.quill.scrollSelectionIntoView()
      }
    },
    'header enter': {
      key: 'Enter',
      collapsed: true,
      format: ['header'],
      suffix: /^$/,
      handler(range, context) {
        const [line, offset] = this.quill.getLine(range.index)
        const delta = new Delta$1()
          .retain(range.index)
          .insert('\n', context.format)
          .retain(line.length() - offset - 1)
          .retain(1, {
            header: null
          })
        this.quill.updateContents(delta, Quill.sources.USER)
        this.quill.setSelection(range.index + 1, Quill.sources.SILENT)
        this.quill.scrollSelectionIntoView()
      }
    },
    'table backspace': {
      key: 'Backspace',
      format: ['table'],
      collapsed: true,
      offset: 0,
      handler() {}
    },
    'table delete': {
      key: 'Delete',
      format: ['table'],
      collapsed: true,
      suffix: /^$/,
      handler() {}
    },
    'table enter': {
      key: 'Enter',
      shiftKey: null,
      format: ['table'],
      handler(range) {
        const module = this.quill.getModule('table')
        if (module) {
          const [table, row, cell, offset] = module.getTable(range)
          const shift = tableSide(table, row, cell, offset)
          if (shift == null) return
          let index2 = table.offset()
          if (shift < 0) {
            const delta = new Delta$1().retain(index2).insert('\n')
            this.quill.updateContents(delta, Quill.sources.USER)
            this.quill.setSelection(range.index + 1, range.length, Quill.sources.SILENT)
          } else if (shift > 0) {
            index2 += table.length()
            const delta = new Delta$1().retain(index2).insert('\n')
            this.quill.updateContents(delta, Quill.sources.USER)
            this.quill.setSelection(index2, Quill.sources.USER)
          }
        }
      }
    },
    'table tab': {
      key: 'Tab',
      shiftKey: null,
      format: ['table'],
      handler(range, context) {
        const { event, line: cell } = context
        const offset = cell.offset(this.quill.scroll)
        if (event.shiftKey) {
          this.quill.setSelection(offset - 1, Quill.sources.USER)
        } else {
          this.quill.setSelection(offset + cell.length(), Quill.sources.USER)
        }
      }
    },
    'list autofill': {
      key: ' ',
      shiftKey: null,
      collapsed: true,
      format: {
        'code-block': false,
        blockquote: false,
        table: false
      },
      prefix: /^\s*?(\d+\.|-|\*|\[ ?\]|\[x\])$/,
      handler(range, context) {
        if (this.quill.scroll.query('list') == null) return true
        const { length } = context.prefix
        const [line, offset] = this.quill.getLine(range.index)
        if (offset > length) return true
        let value
        switch (context.prefix.trim()) {
          case '[]':
          case '[ ]':
            value = 'unchecked'
            break
          case '[x]':
            value = 'checked'
            break
          case '-':
          case '*':
            value = 'bullet'
            break
          default:
            value = 'ordered'
        }
        this.quill.insertText(range.index, ' ', Quill.sources.USER)
        this.quill.history.cutoff()
        const delta = new Delta$1()
          .retain(range.index - offset)
          .delete(length + 1)
          .retain(line.length() - 2 - offset)
          .retain(1, {
            list: value
          })
        this.quill.updateContents(delta, Quill.sources.USER)
        this.quill.history.cutoff()
        this.quill.setSelection(range.index - length, Quill.sources.SILENT)
        return false
      }
    },
    'code exit': {
      key: 'Enter',
      collapsed: true,
      format: ['code-block'],
      prefix: /^$/,
      suffix: /^\s*$/,
      handler(range) {
        const [line, offset] = this.quill.getLine(range.index)
        let numLines = 2
        let cur = line
        while (cur != null && cur.length() <= 1 && cur.formats()['code-block']) {
          cur = cur.prev
          numLines -= 1
          if (numLines <= 0) {
            const delta = new Delta$1()
              .retain(range.index + line.length() - offset - 2)
              .retain(1, {
                'code-block': null
              })
              .delete(1)
            this.quill.updateContents(delta, Quill.sources.USER)
            this.quill.setSelection(range.index - 1, Quill.sources.SILENT)
            return false
          }
        }
        return true
      }
    },
    'embed left': makeEmbedArrowHandler('ArrowLeft', false),
    'embed left shift': makeEmbedArrowHandler('ArrowLeft', true),
    'embed right': makeEmbedArrowHandler('ArrowRight', false),
    'embed right shift': makeEmbedArrowHandler('ArrowRight', true),
    'table down': makeTableArrowHandler(false),
    'table up': makeTableArrowHandler(true)
  }
}
Keyboard.DEFAULTS = defaultOptions$1
function makeCodeBlockHandler(indent) {
  return {
    key: 'Tab',
    shiftKey: !indent,
    format: {
      'code-block': true
    },
    handler(range, _ref) {
      let { event } = _ref
      const CodeBlock2 = this.quill.scroll.query('code-block')
      const { TAB } = CodeBlock2
      if (range.length === 0 && !event.shiftKey) {
        this.quill.insertText(range.index, TAB, Quill.sources.USER)
        this.quill.setSelection(range.index + TAB.length, Quill.sources.SILENT)
        return
      }
      const lines =
        range.length === 0 ? this.quill.getLines(range.index, 1) : this.quill.getLines(range)
      let { index: index2, length } = range
      lines.forEach((line, i) => {
        if (indent) {
          line.insertAt(0, TAB)
          if (i === 0) {
            index2 += TAB.length
          } else {
            length += TAB.length
          }
        } else if (line.domNode.textContent.startsWith(TAB)) {
          line.deleteAt(0, TAB.length)
          if (i === 0) {
            index2 -= TAB.length
          } else {
            length -= TAB.length
          }
        }
      })
      this.quill.update(Quill.sources.USER)
      this.quill.setSelection(index2, length, Quill.sources.SILENT)
    }
  }
}
function makeEmbedArrowHandler(key, shiftKey) {
  const where = key === 'ArrowLeft' ? 'prefix' : 'suffix'
  return {
    key,
    shiftKey,
    altKey: null,
    [where]: /^$/,
    handler(range) {
      let { index: index2 } = range
      if (key === 'ArrowRight') {
        index2 += range.length + 1
      }
      const [leaf] = this.quill.getLeaf(index2)
      if (!(leaf instanceof EmbedBlot$1$1)) return true
      if (key === 'ArrowLeft') {
        if (shiftKey) {
          this.quill.setSelection(range.index - 1, range.length + 1, Quill.sources.USER)
        } else {
          this.quill.setSelection(range.index - 1, Quill.sources.USER)
        }
      } else if (shiftKey) {
        this.quill.setSelection(range.index, range.length + 1, Quill.sources.USER)
      } else {
        this.quill.setSelection(range.index + range.length + 1, Quill.sources.USER)
      }
      return false
    }
  }
}
function makeFormatHandler(format) {
  return {
    key: format[0],
    shortKey: true,
    handler(range, context) {
      this.quill.format(format, !context.format[format], Quill.sources.USER)
    }
  }
}
function makeTableArrowHandler(up) {
  return {
    key: up ? 'ArrowUp' : 'ArrowDown',
    collapsed: true,
    format: ['table'],
    handler(range, context) {
      const key = up ? 'prev' : 'next'
      const cell = context.line
      const targetRow = cell.parent[key]
      if (targetRow != null) {
        if (targetRow.statics.blotName === 'table-row') {
          let targetCell = targetRow.children.head
          let cur = cell
          while (cur.prev != null) {
            cur = cur.prev
            targetCell = targetCell.next
          }
          const index2 =
            targetCell.offset(this.quill.scroll) + Math.min(context.offset, targetCell.length() - 1)
          this.quill.setSelection(index2, 0, Quill.sources.USER)
        }
      } else {
        const targetLine = cell.table()[key]
        if (targetLine != null) {
          if (up) {
            this.quill.setSelection(
              targetLine.offset(this.quill.scroll) + targetLine.length() - 1,
              0,
              Quill.sources.USER
            )
          } else {
            this.quill.setSelection(targetLine.offset(this.quill.scroll), 0, Quill.sources.USER)
          }
        }
      }
      return false
    }
  }
}
function normalize$2(binding) {
  if (typeof binding === 'string' || typeof binding === 'number') {
    binding = {
      key: binding
    }
  } else if (typeof binding === 'object') {
    binding = cloneDeep(binding)
  } else {
    return null
  }
  if (binding.shortKey) {
    binding[SHORTKEY] = binding.shortKey
    delete binding.shortKey
  }
  return binding
}
function deleteRange(_ref2) {
  let { quill, range } = _ref2
  const lines = quill.getLines(range)
  let formats = {}
  if (lines.length > 1) {
    const firstFormats = lines[0].formats()
    const lastFormats = lines[lines.length - 1].formats()
    formats = DeltaExports.AttributeMap.diff(lastFormats, firstFormats) || {}
  }
  quill.deleteText(range, Quill.sources.USER)
  if (Object.keys(formats).length > 0) {
    quill.formatLine(range.index, 1, formats, Quill.sources.USER)
  }
  quill.setSelection(range.index, Quill.sources.SILENT)
}
function tableSide(_table, row, cell, offset) {
  if (row.prev == null && row.next == null) {
    if (cell.prev == null && cell.next == null) {
      return offset === 0 ? -1 : 1
    }
    return cell.prev == null ? -1 : 1
  }
  if (row.prev == null) {
    return -1
  }
  if (row.next == null) {
    return 1
  }
  return null
}
const normalWeightRegexp = /font-weight:\s*normal/
const blockTagNames = ['P', 'OL', 'UL']
const isBlockElement = (element) => {
  return element && blockTagNames.includes(element.tagName)
}
const normalizeEmptyLines = (doc) => {
  Array.from(doc.querySelectorAll('br'))
    .filter(
      (br) => isBlockElement(br.previousElementSibling) && isBlockElement(br.nextElementSibling)
    )
    .forEach((br) => {
      br.parentNode?.removeChild(br)
    })
}
const normalizeFontWeight = (doc) => {
  Array.from(doc.querySelectorAll('b[style*="font-weight"]'))
    .filter((node) => node.getAttribute('style')?.match(normalWeightRegexp))
    .forEach((node) => {
      const fragment = doc.createDocumentFragment()
      fragment.append(...node.childNodes)
      node.parentNode?.replaceChild(fragment, node)
    })
}
function normalize$1(doc) {
  if (doc.querySelector('[id^="docs-internal-guid-"]')) {
    normalizeFontWeight(doc)
    normalizeEmptyLines(doc)
  }
}
const ignoreRegexp = /\bmso-list:[^;]*ignore/i
const idRegexp = /\bmso-list:[^;]*\bl(\d+)/i
const indentRegexp = /\bmso-list:[^;]*\blevel(\d+)/i
const parseListItem = (element, html) => {
  const style2 = element.getAttribute('style')
  const idMatch = style2?.match(idRegexp)
  if (!idMatch) {
    return null
  }
  const id = Number(idMatch[1])
  const indentMatch = style2?.match(indentRegexp)
  const indent = indentMatch ? Number(indentMatch[1]) : 1
  const typeRegexp = new RegExp(
    `@list l${id}:level${indent}\\s*\\{[^\\}]*mso-level-number-format:\\s*([\\w-]+)`,
    'i'
  )
  const typeMatch = html.match(typeRegexp)
  const type = typeMatch && typeMatch[1] === 'bullet' ? 'bullet' : 'ordered'
  return {
    id,
    indent,
    type,
    element
  }
}
const normalizeListItem = (doc) => {
  const msoList = Array.from(doc.querySelectorAll('[style*=mso-list]'))
  const ignored = []
  const others = []
  msoList.forEach((node) => {
    const shouldIgnore = (node.getAttribute('style') || '').match(ignoreRegexp)
    if (shouldIgnore) {
      ignored.push(node)
    } else {
      others.push(node)
    }
  })
  ignored.forEach((node) => node.parentNode?.removeChild(node))
  const html = doc.documentElement.innerHTML
  const listItems = others.map((element) => parseListItem(element, html)).filter((parsed) => parsed)
  while (listItems.length) {
    const childListItems = []
    let current = listItems.shift()
    while (current) {
      childListItems.push(current)
      current =
        listItems.length &&
        listItems[0]?.element === current.element.nextElementSibling && // Different id means the next item doesn't belong to this group.
        listItems[0].id === current.id
          ? listItems.shift()
          : null
    }
    const ul = document.createElement('ul')
    childListItems.forEach((listItem) => {
      const li = document.createElement('li')
      li.setAttribute('data-list', listItem.type)
      if (listItem.indent > 1) {
        li.setAttribute('class', `ql-indent-${listItem.indent - 1}`)
      }
      li.innerHTML = listItem.element.innerHTML
      ul.appendChild(li)
    })
    const element = childListItems[0]?.element
    const { parentNode } = element ?? {}
    if (element) {
      parentNode?.replaceChild(ul, element)
    }
    childListItems.slice(1).forEach((_ref) => {
      let { element: e } = _ref
      parentNode?.removeChild(e)
    })
  }
}
function normalize(doc) {
  if (doc.documentElement.getAttribute('xmlns:w') === 'urn:schemas-microsoft-com:office:word') {
    normalizeListItem(doc)
  }
}
const NORMALIZERS = [normalize, normalize$1]
const normalizeExternalHTML = (doc) => {
  if (doc.documentElement) {
    NORMALIZERS.forEach((normalize2) => {
      normalize2(doc)
    })
  }
}
const debug$1 = namespace('quill:clipboard')
const CLIPBOARD_CONFIG = [
  [Node.TEXT_NODE, matchText],
  [Node.TEXT_NODE, matchNewline],
  ['br', matchBreak],
  [Node.ELEMENT_NODE, matchNewline],
  [Node.ELEMENT_NODE, matchBlot],
  [Node.ELEMENT_NODE, matchAttributor],
  [Node.ELEMENT_NODE, matchStyles],
  ['li', matchIndent],
  ['ol, ul', matchList],
  ['pre', matchCodeBlock],
  ['tr', matchTable],
  ['b', createMatchAlias('bold')],
  ['i', createMatchAlias('italic')],
  ['strike', createMatchAlias('strike')],
  ['style', matchIgnore]
]
const ATTRIBUTE_ATTRIBUTORS = [AlignAttribute, DirectionAttribute].reduce((memo, attr) => {
  memo[attr.keyName] = attr
  return memo
}, {})
const STYLE_ATTRIBUTORS = [
  AlignStyle,
  BackgroundStyle,
  ColorStyle,
  DirectionStyle,
  FontStyle,
  SizeStyle
].reduce((memo, attr) => {
  memo[attr.keyName] = attr
  return memo
}, {})
class Clipboard extends Module$1 {
  static DEFAULTS = {
    matchers: []
  }
  constructor(quill, options2) {
    super(quill, options2)
    this.quill.root.addEventListener('copy', (e) => this.onCaptureCopy(e, false))
    this.quill.root.addEventListener('cut', (e) => this.onCaptureCopy(e, true))
    this.quill.root.addEventListener('paste', this.onCapturePaste.bind(this))
    this.matchers = []
    CLIPBOARD_CONFIG.concat(this.options.matchers ?? []).forEach((_ref) => {
      let [selector, matcher] = _ref
      this.addMatcher(selector, matcher)
    })
  }
  addMatcher(selector, matcher) {
    this.matchers.push([selector, matcher])
  }
  convert(_ref2) {
    let { html, text } = _ref2
    let formats = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}
    if (formats[CodeBlock.blotName]) {
      return new Delta$1().insert(text || '', {
        [CodeBlock.blotName]: formats[CodeBlock.blotName]
      })
    }
    if (!html) {
      return new Delta$1().insert(text || '', formats)
    }
    const delta = this.convertHTML(html)
    if (
      deltaEndsWith(delta, '\n') &&
      (delta.ops[delta.ops.length - 1].attributes == null || formats.table)
    ) {
      return delta.compose(new Delta$1().retain(delta.length() - 1).delete(1))
    }
    return delta
  }
  normalizeHTML(doc) {
    normalizeExternalHTML(doc)
  }
  convertHTML(html) {
    const doc = new DOMParser().parseFromString(html, 'text/html')
    this.normalizeHTML(doc)
    const container = doc.body
    const nodeMatches = /* @__PURE__ */ new WeakMap()
    const [elementMatchers, textMatchers] = this.prepareMatching(container, nodeMatches)
    return traverse(this.quill.scroll, container, elementMatchers, textMatchers, nodeMatches)
  }
  dangerouslyPasteHTML(index2, html) {
    let source = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : Quill.sources.API
    if (typeof index2 === 'string') {
      const delta = this.convert({
        html: index2,
        text: ''
      })
      this.quill.setContents(delta, html)
      this.quill.setSelection(0, Quill.sources.SILENT)
    } else {
      const paste = this.convert({
        html,
        text: ''
      })
      this.quill.updateContents(new Delta$1().retain(index2).concat(paste), source)
      this.quill.setSelection(index2 + paste.length(), Quill.sources.SILENT)
    }
  }
  onCaptureCopy(e) {
    let isCut = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false
    if (e.defaultPrevented) return
    e.preventDefault()
    const [range] = this.quill.selection.getRange()
    if (range == null) return
    const { html, text } = this.onCopy(range, isCut)
    e.clipboardData?.setData('text/plain', text)
    e.clipboardData?.setData('text/html', html)
    if (isCut) {
      deleteRange({
        range,
        quill: this.quill
      })
    }
  }
  /*
   * https://www.iana.org/assignments/media-types/text/uri-list
   */
  normalizeURIList(urlList) {
    return urlList
      .split(/\r?\n/)
      .filter((url) => url[0] !== '#')
      .join('\n')
  }
  onCapturePaste(e) {
    if (e.defaultPrevented || !this.quill.isEnabled()) return
    e.preventDefault()
    const range = this.quill.getSelection(true)
    if (range == null) return
    const html = e.clipboardData?.getData('text/html')
    let text = e.clipboardData?.getData('text/plain')
    if (!html && !text) {
      const urlList = e.clipboardData?.getData('text/uri-list')
      if (urlList) {
        text = this.normalizeURIList(urlList)
      }
    }
    const files = Array.from(e.clipboardData?.files || [])
    if (!html && files.length > 0) {
      this.quill.uploader.upload(range, files)
      return
    }
    if (html && files.length > 0) {
      const doc = new DOMParser().parseFromString(html, 'text/html')
      if (doc.body.childElementCount === 1 && doc.body.firstElementChild?.tagName === 'IMG') {
        this.quill.uploader.upload(range, files)
        return
      }
    }
    this.onPaste(range, {
      html,
      text
    })
  }
  onCopy(range) {
    const text = this.quill.getText(range)
    const html = this.quill.getSemanticHTML(range)
    return {
      html,
      text
    }
  }
  onPaste(range, _ref3) {
    let { text, html } = _ref3
    const formats = this.quill.getFormat(range.index)
    const pastedDelta = this.convert(
      {
        text,
        html
      },
      formats
    )
    debug$1.log('onPaste', pastedDelta, {
      text,
      html
    })
    const delta = new Delta$1().retain(range.index).delete(range.length).concat(pastedDelta)
    this.quill.updateContents(delta, Quill.sources.USER)
    this.quill.setSelection(delta.length() - range.length, Quill.sources.SILENT)
    this.quill.scrollSelectionIntoView()
  }
  prepareMatching(container, nodeMatches) {
    const elementMatchers = []
    const textMatchers = []
    this.matchers.forEach((pair) => {
      const [selector, matcher] = pair
      switch (selector) {
        case Node.TEXT_NODE:
          textMatchers.push(matcher)
          break
        case Node.ELEMENT_NODE:
          elementMatchers.push(matcher)
          break
        default:
          Array.from(container.querySelectorAll(selector)).forEach((node) => {
            if (nodeMatches.has(node)) {
              const matches = nodeMatches.get(node)
              matches?.push(matcher)
            } else {
              nodeMatches.set(node, [matcher])
            }
          })
          break
      }
    })
    return [elementMatchers, textMatchers]
  }
}
function applyFormat(delta, format, value, scroll) {
  if (!scroll.query(format)) {
    return delta
  }
  return delta.reduce((newDelta, op) => {
    if (!op.insert) return newDelta
    if (op.attributes && op.attributes[format]) {
      return newDelta.push(op)
    }
    const formats = value
      ? {
          [format]: value
        }
      : {}
    return newDelta.insert(op.insert, {
      ...formats,
      ...op.attributes
    })
  }, new Delta$1())
}
function deltaEndsWith(delta, text) {
  let endText = ''
  for (let i = delta.ops.length - 1; i >= 0 && endText.length < text.length; --i) {
    const op = delta.ops[i]
    if (typeof op.insert !== 'string') break
    endText = op.insert + endText
  }
  return endText.slice(-1 * text.length) === text
}
function isLine(node, scroll) {
  if (!(node instanceof Element)) return false
  const match2 = scroll.query(node)
  if (match2 && match2.prototype instanceof EmbedBlot$1$1) return false
  return [
    'address',
    'article',
    'blockquote',
    'canvas',
    'dd',
    'div',
    'dl',
    'dt',
    'fieldset',
    'figcaption',
    'figure',
    'footer',
    'form',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'header',
    'iframe',
    'li',
    'main',
    'nav',
    'ol',
    'output',
    'p',
    'pre',
    'section',
    'table',
    'td',
    'tr',
    'ul',
    'video'
  ].includes(node.tagName.toLowerCase())
}
function isBetweenInlineElements(node, scroll) {
  return (
    node.previousElementSibling &&
    node.nextElementSibling &&
    !isLine(node.previousElementSibling, scroll) &&
    !isLine(node.nextElementSibling, scroll)
  )
}
const preNodes = /* @__PURE__ */ new WeakMap()
function isPre(node) {
  if (node == null) return false
  if (!preNodes.has(node)) {
    if (node.tagName === 'PRE') {
      preNodes.set(node, true)
    } else {
      preNodes.set(node, isPre(node.parentNode))
    }
  }
  return preNodes.get(node)
}
function traverse(scroll, node, elementMatchers, textMatchers, nodeMatches) {
  if (node.nodeType === node.TEXT_NODE) {
    return textMatchers.reduce((delta, matcher) => {
      return matcher(node, delta, scroll)
    }, new Delta$1())
  }
  if (node.nodeType === node.ELEMENT_NODE) {
    return Array.from(node.childNodes || []).reduce((delta, childNode) => {
      let childrenDelta = traverse(scroll, childNode, elementMatchers, textMatchers, nodeMatches)
      if (childNode.nodeType === node.ELEMENT_NODE) {
        childrenDelta = elementMatchers.reduce((reducedDelta, matcher) => {
          return matcher(childNode, reducedDelta, scroll)
        }, childrenDelta)
        childrenDelta = (nodeMatches.get(childNode) || []).reduce((reducedDelta, matcher) => {
          return matcher(childNode, reducedDelta, scroll)
        }, childrenDelta)
      }
      return delta.concat(childrenDelta)
    }, new Delta$1())
  }
  return new Delta$1()
}
function createMatchAlias(format) {
  return (_node, delta, scroll) => {
    return applyFormat(delta, format, true, scroll)
  }
}
function matchAttributor(node, delta, scroll) {
  const attributes = Attributor.keys(node)
  const classes = ClassAttributor$1.keys(node)
  const styles = StyleAttributor$1.keys(node)
  const formats = {}
  attributes
    .concat(classes)
    .concat(styles)
    .forEach((name) => {
      let attr = scroll.query(name, Scope.ATTRIBUTE)
      if (attr != null) {
        formats[attr.attrName] = attr.value(node)
        if (formats[attr.attrName]) return
      }
      attr = ATTRIBUTE_ATTRIBUTORS[name]
      if (attr != null && (attr.attrName === name || attr.keyName === name)) {
        formats[attr.attrName] = attr.value(node) || void 0
      }
      attr = STYLE_ATTRIBUTORS[name]
      if (attr != null && (attr.attrName === name || attr.keyName === name)) {
        attr = STYLE_ATTRIBUTORS[name]
        formats[attr.attrName] = attr.value(node) || void 0
      }
    })
  return Object.entries(formats).reduce((newDelta, _ref4) => {
    let [name, value] = _ref4
    return applyFormat(newDelta, name, value, scroll)
  }, delta)
}
function matchBlot(node, delta, scroll) {
  const match2 = scroll.query(node)
  if (match2 == null) return delta
  if (match2.prototype instanceof EmbedBlot$1$1) {
    const embed = {}
    const value = match2.value(node)
    if (value != null) {
      embed[match2.blotName] = value
      return new Delta$1().insert(embed, match2.formats(node, scroll))
    }
  } else {
    if (match2.prototype instanceof BlockBlot$1 && !deltaEndsWith(delta, '\n')) {
      delta.insert('\n')
    }
    if ('blotName' in match2 && 'formats' in match2 && typeof match2.formats === 'function') {
      return applyFormat(delta, match2.blotName, match2.formats(node, scroll), scroll)
    }
  }
  return delta
}
function matchBreak(node, delta) {
  if (!deltaEndsWith(delta, '\n')) {
    delta.insert('\n')
  }
  return delta
}
function matchCodeBlock(node, delta, scroll) {
  const match2 = scroll.query('code-block')
  const language =
    match2 && 'formats' in match2 && typeof match2.formats === 'function'
      ? match2.formats(node, scroll)
      : true
  return applyFormat(delta, 'code-block', language, scroll)
}
function matchIgnore() {
  return new Delta$1()
}
function matchIndent(node, delta, scroll) {
  const match2 = scroll.query(node)
  if (
    match2 == null || // @ts-expect-error
    match2.blotName !== 'list' ||
    !deltaEndsWith(delta, '\n')
  ) {
    return delta
  }
  let indent = -1
  let parent = node.parentNode
  while (parent != null) {
    if (['OL', 'UL'].includes(parent.tagName)) {
      indent += 1
    }
    parent = parent.parentNode
  }
  if (indent <= 0) return delta
  return delta.reduce((composed, op) => {
    if (!op.insert) return composed
    if (op.attributes && typeof op.attributes.indent === 'number') {
      return composed.push(op)
    }
    return composed.insert(op.insert, {
      indent,
      ...(op.attributes || {})
    })
  }, new Delta$1())
}
function matchList(node, delta, scroll) {
  const element = node
  let list = element.tagName === 'OL' ? 'ordered' : 'bullet'
  const checkedAttr = element.getAttribute('data-checked')
  if (checkedAttr) {
    list = checkedAttr === 'true' ? 'checked' : 'unchecked'
  }
  return applyFormat(delta, 'list', list, scroll)
}
function matchNewline(node, delta, scroll) {
  if (!deltaEndsWith(delta, '\n')) {
    if (
      isLine(node, scroll) &&
      (node.childNodes.length > 0 || node instanceof HTMLParagraphElement)
    ) {
      return delta.insert('\n')
    }
    if (delta.length() > 0 && node.nextSibling) {
      let nextSibling = node.nextSibling
      while (nextSibling != null) {
        if (isLine(nextSibling, scroll)) {
          return delta.insert('\n')
        }
        const match2 = scroll.query(nextSibling)
        if (match2 && match2.prototype instanceof BlockEmbed$1) {
          return delta.insert('\n')
        }
        nextSibling = nextSibling.firstChild
      }
    }
  }
  return delta
}
function matchStyles(node, delta, scroll) {
  const formats = {}
  const style2 = node.style || {}
  if (style2.fontStyle === 'italic') {
    formats.italic = true
  }
  if (style2.textDecoration === 'underline') {
    formats.underline = true
  }
  if (style2.textDecoration === 'line-through') {
    formats.strike = true
  }
  if (
    style2.fontWeight?.startsWith('bold') || // @ts-expect-error Fix me later
    parseInt(style2.fontWeight, 10) >= 700
  ) {
    formats.bold = true
  }
  delta = Object.entries(formats).reduce((newDelta, _ref5) => {
    let [name, value] = _ref5
    return applyFormat(newDelta, name, value, scroll)
  }, delta)
  if (parseFloat(style2.textIndent || 0) > 0) {
    return new Delta$1().insert('	').concat(delta)
  }
  return delta
}
function matchTable(node, delta, scroll) {
  const table =
    node.parentElement?.tagName === 'TABLE' ? node.parentElement : node.parentElement?.parentElement
  if (table != null) {
    const rows = Array.from(table.querySelectorAll('tr'))
    const row = rows.indexOf(node) + 1
    return applyFormat(delta, 'table', row, scroll)
  }
  return delta
}
function matchText(node, delta, scroll) {
  let text = node.data
  if (node.parentElement?.tagName === 'O:P') {
    return delta.insert(text.trim())
  }
  if (!isPre(node)) {
    if (text.trim().length === 0 && text.includes('\n') && !isBetweenInlineElements(node, scroll)) {
      return delta
    }
    text = text.replace(/[^\S\u00a0]/g, ' ')
    text = text.replace(/ {2,}/g, ' ')
    if (
      (node.previousSibling == null &&
        node.parentElement != null &&
        isLine(node.parentElement, scroll)) ||
      (node.previousSibling instanceof Element && isLine(node.previousSibling, scroll))
    ) {
      text = text.replace(/^ /, '')
    }
    if (
      (node.nextSibling == null &&
        node.parentElement != null &&
        isLine(node.parentElement, scroll)) ||
      (node.nextSibling instanceof Element && isLine(node.nextSibling, scroll))
    ) {
      text = text.replace(/ $/, '')
    }
    text = text.replaceAll(' ', ' ')
  }
  return delta.insert(text)
}
class History extends Module$1 {
  static DEFAULTS = {
    delay: 1e3,
    maxStack: 100,
    userOnly: false
  }
  lastRecorded = 0
  ignoreChange = false
  stack = {
    undo: [],
    redo: []
  }
  currentRange = null
  constructor(quill, options2) {
    super(quill, options2)
    this.quill.on(Quill.events.EDITOR_CHANGE, (eventName, value, oldValue, source) => {
      if (eventName === Quill.events.SELECTION_CHANGE) {
        if (value && source !== Quill.sources.SILENT) {
          this.currentRange = value
        }
      } else if (eventName === Quill.events.TEXT_CHANGE) {
        if (!this.ignoreChange) {
          if (!this.options.userOnly || source === Quill.sources.USER) {
            this.record(value, oldValue)
          } else {
            this.transform(value)
          }
        }
        this.currentRange = transformRange(this.currentRange, value)
      }
    })
    this.quill.keyboard.addBinding(
      {
        key: 'z',
        shortKey: true
      },
      this.undo.bind(this)
    )
    this.quill.keyboard.addBinding(
      {
        key: ['z', 'Z'],
        shortKey: true,
        shiftKey: true
      },
      this.redo.bind(this)
    )
    if (/Win/i.test(navigator.platform)) {
      this.quill.keyboard.addBinding(
        {
          key: 'y',
          shortKey: true
        },
        this.redo.bind(this)
      )
    }
    this.quill.root.addEventListener('beforeinput', (event) => {
      if (event.inputType === 'historyUndo') {
        this.undo()
        event.preventDefault()
      } else if (event.inputType === 'historyRedo') {
        this.redo()
        event.preventDefault()
      }
    })
  }
  change(source, dest) {
    if (this.stack[source].length === 0) return
    const item = this.stack[source].pop()
    if (!item) return
    const base = this.quill.getContents()
    const inverseDelta = item.delta.invert(base)
    this.stack[dest].push({
      delta: inverseDelta,
      range: transformRange(item.range, inverseDelta)
    })
    this.lastRecorded = 0
    this.ignoreChange = true
    this.quill.updateContents(item.delta, Quill.sources.USER)
    this.ignoreChange = false
    this.restoreSelection(item)
  }
  clear() {
    this.stack = {
      undo: [],
      redo: []
    }
  }
  cutoff() {
    this.lastRecorded = 0
  }
  record(changeDelta, oldDelta) {
    if (changeDelta.ops.length === 0) return
    this.stack.redo = []
    let undoDelta = changeDelta.invert(oldDelta)
    let undoRange = this.currentRange
    const timestamp = Date.now()
    if (
      // @ts-expect-error Fix me later
      this.lastRecorded + this.options.delay > timestamp &&
      this.stack.undo.length > 0
    ) {
      const item = this.stack.undo.pop()
      if (item) {
        undoDelta = undoDelta.compose(item.delta)
        undoRange = item.range
      }
    } else {
      this.lastRecorded = timestamp
    }
    if (undoDelta.length() === 0) return
    this.stack.undo.push({
      delta: undoDelta,
      range: undoRange
    })
    if (this.stack.undo.length > this.options.maxStack) {
      this.stack.undo.shift()
    }
  }
  redo() {
    this.change('redo', 'undo')
  }
  transform(delta) {
    transformStack(this.stack.undo, delta)
    transformStack(this.stack.redo, delta)
  }
  undo() {
    this.change('undo', 'redo')
  }
  restoreSelection(stackItem) {
    if (stackItem.range) {
      this.quill.setSelection(stackItem.range, Quill.sources.USER)
    } else {
      const index2 = getLastChangeIndex(this.quill.scroll, stackItem.delta)
      this.quill.setSelection(index2, Quill.sources.USER)
    }
  }
}
function transformStack(stack, delta) {
  let remoteDelta = delta
  for (let i = stack.length - 1; i >= 0; i -= 1) {
    const oldItem = stack[i]
    stack[i] = {
      delta: remoteDelta.transform(oldItem.delta, true),
      range: oldItem.range && transformRange(oldItem.range, remoteDelta)
    }
    remoteDelta = oldItem.delta.transform(remoteDelta)
    if (stack[i].delta.length() === 0) {
      stack.splice(i, 1)
    }
  }
}
function endsWithNewlineChange(scroll, delta) {
  const lastOp = delta.ops[delta.ops.length - 1]
  if (lastOp == null) return false
  if (lastOp.insert != null) {
    return typeof lastOp.insert === 'string' && lastOp.insert.endsWith('\n')
  }
  if (lastOp.attributes != null) {
    return Object.keys(lastOp.attributes).some((attr) => {
      return scroll.query(attr, Scope.BLOCK) != null
    })
  }
  return false
}
function getLastChangeIndex(scroll, delta) {
  const deleteLength = delta.reduce((length, op) => {
    return length + (op.delete || 0)
  }, 0)
  let changeIndex = delta.length() - deleteLength
  if (endsWithNewlineChange(scroll, delta)) {
    changeIndex -= 1
  }
  return changeIndex
}
function transformRange(range, delta) {
  if (!range) return range
  const start = delta.transformPosition(range.index)
  const end = delta.transformPosition(range.index + range.length)
  return {
    index: start,
    length: end - start
  }
}
class Uploader extends Module$1 {
  constructor(quill, options2) {
    super(quill, options2)
    quill.root.addEventListener('drop', (e) => {
      e.preventDefault()
      let native = null
      if (document.caretRangeFromPoint) {
        native = document.caretRangeFromPoint(e.clientX, e.clientY)
      } else if (document.caretPositionFromPoint) {
        const position = document.caretPositionFromPoint(e.clientX, e.clientY)
        native = document.createRange()
        native.setStart(position.offsetNode, position.offset)
        native.setEnd(position.offsetNode, position.offset)
      }
      const normalized = native && quill.selection.normalizeNative(native)
      if (normalized) {
        const range = quill.selection.normalizedToRange(normalized)
        if (e.dataTransfer?.files) {
          this.upload(range, e.dataTransfer.files)
        }
      }
    })
  }
  upload(range, files) {
    const uploads = []
    Array.from(files).forEach((file) => {
      if (file && this.options.mimetypes?.includes(file.type)) {
        uploads.push(file)
      }
    })
    if (uploads.length > 0) {
      this.options.handler.call(this, range, uploads)
    }
  }
}
Uploader.DEFAULTS = {
  mimetypes: ['image/png', 'image/jpeg'],
  handler(range, files) {
    if (!this.quill.scroll.query('image')) {
      return
    }
    const promises = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader()
        reader.onload = () => {
          resolve(reader.result)
        }
        reader.readAsDataURL(file)
      })
    })
    Promise.all(promises).then((images) => {
      const update = images.reduce((delta, image) => {
        return delta.insert({
          image
        })
      }, new Delta$1().retain(range.index).delete(range.length))
      this.quill.updateContents(update, Emitter.sources.USER)
      this.quill.setSelection(range.index + images.length, Emitter.sources.SILENT)
    })
  }
}
const INSERT_TYPES = ['insertText', 'insertReplacementText']
class Input extends Module$1 {
  constructor(quill, options2) {
    super(quill, options2)
    quill.root.addEventListener('beforeinput', (event) => {
      this.handleBeforeInput(event)
    })
    if (!/Android/i.test(navigator.userAgent)) {
      quill.on(Quill.events.COMPOSITION_BEFORE_START, () => {
        this.handleCompositionStart()
      })
    }
  }
  deleteRange(range) {
    deleteRange({
      range,
      quill: this.quill
    })
  }
  replaceText(range) {
    let text = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : ''
    if (range.length === 0) return false
    if (text) {
      const formats = this.quill.getFormat(range.index, 1)
      this.deleteRange(range)
      this.quill.updateContents(
        new Delta$1().retain(range.index).insert(text, formats),
        Quill.sources.USER
      )
    } else {
      this.deleteRange(range)
    }
    this.quill.setSelection(range.index + text.length, 0, Quill.sources.SILENT)
    return true
  }
  handleBeforeInput(event) {
    if (
      this.quill.composition.isComposing ||
      event.defaultPrevented ||
      !INSERT_TYPES.includes(event.inputType)
    ) {
      return
    }
    const staticRange = event.getTargetRanges ? event.getTargetRanges()[0] : null
    if (!staticRange || staticRange.collapsed === true) {
      return
    }
    const text = getPlainTextFromInputEvent(event)
    if (text == null) {
      return
    }
    const normalized = this.quill.selection.normalizeNative(staticRange)
    const range = normalized ? this.quill.selection.normalizedToRange(normalized) : null
    if (range && this.replaceText(range, text)) {
      event.preventDefault()
    }
  }
  handleCompositionStart() {
    const range = this.quill.getSelection()
    if (range) {
      this.replaceText(range)
    }
  }
}
function getPlainTextFromInputEvent(event) {
  if (typeof event.data === 'string') {
    return event.data
  }
  if (event.dataTransfer?.types.includes('text/plain')) {
    return event.dataTransfer.getData('text/plain')
  }
  return null
}
const isMac = /Mac/i.test(navigator.platform)
const TTL_FOR_VALID_SELECTION_CHANGE = 100
const canMoveCaretBeforeUINode = (event) => {
  if (
    event.key === 'ArrowLeft' ||
    event.key === 'ArrowRight' || // RTL scripts or moving from the end of the previous line
    event.key === 'ArrowUp' ||
    event.key === 'ArrowDown' ||
    event.key === 'Home'
  ) {
    return true
  }
  if (isMac && event.key === 'a' && event.ctrlKey === true) {
    return true
  }
  return false
}
class UINode extends Module$1 {
  isListening = false
  selectionChangeDeadline = 0
  constructor(quill, options2) {
    super(quill, options2)
    this.handleArrowKeys()
    this.handleNavigationShortcuts()
  }
  handleArrowKeys() {
    this.quill.keyboard.addBinding({
      key: ['ArrowLeft', 'ArrowRight'],
      offset: 0,
      shiftKey: null,
      handler(range, _ref) {
        let { line, event } = _ref
        if (!(line instanceof ParentBlot$1) || !line.uiNode) {
          return true
        }
        const isRTL = getComputedStyle(line.domNode)['direction'] === 'rtl'
        if ((isRTL && event.key !== 'ArrowRight') || (!isRTL && event.key !== 'ArrowLeft')) {
          return true
        }
        this.quill.setSelection(
          range.index - 1,
          range.length + (event.shiftKey ? 1 : 0),
          Quill.sources.USER
        )
        return false
      }
    })
  }
  handleNavigationShortcuts() {
    this.quill.root.addEventListener('keydown', (event) => {
      if (!event.defaultPrevented && canMoveCaretBeforeUINode(event)) {
        this.ensureListeningToSelectionChange()
      }
    })
  }
  /**
   * We only listen to the `selectionchange` event when
   * there is an intention of moving the caret to the beginning using shortcuts.
   * This is primarily implemented to prevent infinite loops, as we are changing
   * the selection within the handler of a `selectionchange` event.
   */
  ensureListeningToSelectionChange() {
    this.selectionChangeDeadline = Date.now() + TTL_FOR_VALID_SELECTION_CHANGE
    if (this.isListening) return
    this.isListening = true
    const listener = () => {
      this.isListening = false
      if (Date.now() <= this.selectionChangeDeadline) {
        this.handleSelectionChange()
      }
    }
    document.addEventListener('selectionchange', listener, {
      once: true
    })
  }
  handleSelectionChange() {
    const selection = document.getSelection()
    if (!selection) return
    const range = selection.getRangeAt(0)
    if (range.collapsed !== true || range.startOffset !== 0) return
    const line = this.quill.scroll.find(range.startContainer)
    if (!(line instanceof ParentBlot$1) || !line.uiNode) return
    const newRange = document.createRange()
    newRange.setStartAfter(line.uiNode)
    newRange.setEndAfter(line.uiNode)
    selection.removeAllRanges()
    selection.addRange(newRange)
  }
}
Quill.register({
  'blots/block': Block,
  'blots/block/embed': BlockEmbed$1,
  'blots/break': Break,
  'blots/container': Container,
  'blots/cursor': Cursor,
  'blots/embed': Embed$1,
  'blots/inline': Inline,
  'blots/scroll': Scroll,
  'blots/text': Text$1,
  'modules/clipboard': Clipboard,
  'modules/history': History,
  'modules/keyboard': Keyboard,
  'modules/uploader': Uploader,
  'modules/input': Input,
  'modules/uiNode': UINode
})
class IndentAttributor extends ClassAttributor$1 {
  add(node, value) {
    let normalizedValue = 0
    if (value === '+1' || value === '-1') {
      const indent = this.value(node) || 0
      normalizedValue = value === '+1' ? indent + 1 : indent - 1
    } else if (typeof value === 'number') {
      normalizedValue = value
    }
    if (normalizedValue === 0) {
      this.remove(node)
      return true
    }
    return super.add(node, normalizedValue.toString())
  }
  canAdd(node, value) {
    return super.canAdd(node, value) || super.canAdd(node, parseInt(value, 10))
  }
  value(node) {
    return parseInt(super.value(node), 10) || void 0
  }
}
const IndentClass = new IndentAttributor('indent', 'ql-indent', {
  scope: Scope.BLOCK,
  // @ts-expect-error
  whitelist: [1, 2, 3, 4, 5, 6, 7, 8]
})
class Blockquote extends Block {
  static blotName = 'blockquote'
  static tagName = 'blockquote'
}
class Header extends Block {
  static blotName = 'header'
  static tagName = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6']
  static formats(domNode) {
    return this.tagName.indexOf(domNode.tagName) + 1
  }
}
class ListContainer extends Container {}
ListContainer.blotName = 'list-container'
ListContainer.tagName = 'OL'
class ListItem extends Block {
  static create(value) {
    const node = super.create()
    node.setAttribute('data-list', value)
    return node
  }
  static formats(domNode) {
    return domNode.getAttribute('data-list') || void 0
  }
  static register() {
    Quill.register(ListContainer)
  }
  constructor(scroll, domNode) {
    super(scroll, domNode)
    const ui = domNode.ownerDocument.createElement('span')
    const listEventHandler = (e) => {
      if (!scroll.isEnabled()) return
      const format = this.statics.formats(domNode, scroll)
      if (format === 'checked') {
        this.format('list', 'unchecked')
        e.preventDefault()
      } else if (format === 'unchecked') {
        this.format('list', 'checked')
        e.preventDefault()
      }
    }
    ui.addEventListener('mousedown', listEventHandler)
    ui.addEventListener('touchstart', listEventHandler)
    this.attachUI(ui)
  }
  format(name, value) {
    if (name === this.statics.blotName && value) {
      this.domNode.setAttribute('data-list', value)
    } else {
      super.format(name, value)
    }
  }
}
ListItem.blotName = 'list'
ListItem.tagName = 'LI'
ListContainer.allowedChildren = [ListItem]
ListItem.requiredContainer = ListContainer
class Bold extends Inline {
  static blotName = 'bold'
  static tagName = ['STRONG', 'B']
  static create() {
    return super.create()
  }
  static formats() {
    return true
  }
  optimize(context) {
    super.optimize(context)
    if (this.domNode.tagName !== this.statics.tagName[0]) {
      this.replaceWith(this.statics.blotName)
    }
  }
}
class Italic extends Bold {
  static blotName = 'italic'
  static tagName = ['EM', 'I']
}
class Link extends Inline {
  static blotName = 'link'
  static tagName = 'A'
  static SANITIZED_URL = 'about:blank'
  static PROTOCOL_WHITELIST = ['http', 'https', 'mailto', 'tel', 'sms']
  static create(value) {
    const node = super.create(value)
    node.setAttribute('href', this.sanitize(value))
    node.setAttribute('rel', 'noopener noreferrer')
    node.setAttribute('target', '_blank')
    return node
  }
  static formats(domNode) {
    return domNode.getAttribute('href')
  }
  static sanitize(url) {
    return sanitize(url, this.PROTOCOL_WHITELIST) ? url : this.SANITIZED_URL
  }
  format(name, value) {
    if (name !== this.statics.blotName || !value) {
      super.format(name, value)
    } else {
      this.domNode.setAttribute('href', this.constructor.sanitize(value))
    }
  }
}
function sanitize(url, protocols) {
  const anchor = document.createElement('a')
  anchor.href = url
  const protocol = anchor.href.slice(0, anchor.href.indexOf(':'))
  return protocols.indexOf(protocol) > -1
}
class Script extends Inline {
  static blotName = 'script'
  static tagName = ['SUB', 'SUP']
  static create(value) {
    if (value === 'super') {
      return document.createElement('sup')
    }
    if (value === 'sub') {
      return document.createElement('sub')
    }
    return super.create(value)
  }
  static formats(domNode) {
    if (domNode.tagName === 'SUB') return 'sub'
    if (domNode.tagName === 'SUP') return 'super'
    return void 0
  }
}
class Strike extends Bold {
  static blotName = 'strike'
  static tagName = ['S', 'STRIKE']
}
class Underline extends Inline {
  static blotName = 'underline'
  static tagName = 'U'
}
class Formula extends Embed$1 {
  static blotName = 'formula'
  static className = 'ql-formula'
  static tagName = 'SPAN'
  static create(value) {
    if (window.katex == null) {
      throw new Error('Formula module requires KaTeX.')
    }
    const node = super.create(value)
    if (typeof value === 'string') {
      window.katex.render(value, node, {
        throwOnError: false,
        errorColor: '#f00'
      })
      node.setAttribute('data-value', value)
    }
    return node
  }
  static value(domNode) {
    return domNode.getAttribute('data-value')
  }
  html() {
    const { formula } = this.value()
    return `<span>${formula}</span>`
  }
}
const ATTRIBUTES$1 = ['alt', 'height', 'width']
let Image$1 = class Image2 extends EmbedBlot$1$1 {
  static blotName = 'image'
  static tagName = 'IMG'
  static create(value) {
    const node = super.create(value)
    if (typeof value === 'string') {
      node.setAttribute('src', this.sanitize(value))
    }
    return node
  }
  static formats(domNode) {
    return ATTRIBUTES$1.reduce((formats, attribute) => {
      if (domNode.hasAttribute(attribute)) {
        formats[attribute] = domNode.getAttribute(attribute)
      }
      return formats
    }, {})
  }
  static match(url) {
    return /\.(jpe?g|gif|png)$/.test(url) || /^data:image\/.+;base64/.test(url)
  }
  static sanitize(url) {
    return sanitize(url, ['http', 'https', 'data']) ? url : '//:0'
  }
  static value(domNode) {
    return domNode.getAttribute('src')
  }
  format(name, value) {
    if (ATTRIBUTES$1.indexOf(name) > -1) {
      if (value) {
        this.domNode.setAttribute(name, value)
      } else {
        this.domNode.removeAttribute(name)
      }
    } else {
      super.format(name, value)
    }
  }
}
const ATTRIBUTES = ['height', 'width']
class Video extends BlockEmbed$1 {
  static blotName = 'video'
  static className = 'ql-video'
  static tagName = 'IFRAME'
  static create(value) {
    const node = super.create(value)
    node.setAttribute('frameborder', '0')
    node.setAttribute('allowfullscreen', 'true')
    node.setAttribute('src', this.sanitize(value))
    return node
  }
  static formats(domNode) {
    return ATTRIBUTES.reduce((formats, attribute) => {
      if (domNode.hasAttribute(attribute)) {
        formats[attribute] = domNode.getAttribute(attribute)
      }
      return formats
    }, {})
  }
  static sanitize(url) {
    return Link.sanitize(url)
  }
  static value(domNode) {
    return domNode.getAttribute('src')
  }
  format(name, value) {
    if (ATTRIBUTES.indexOf(name) > -1) {
      if (value) {
        this.domNode.setAttribute(name, value)
      } else {
        this.domNode.removeAttribute(name)
      }
    } else {
      super.format(name, value)
    }
  }
  html() {
    const { video } = this.value()
    return `<a href="${video}">${video}</a>`
  }
}
const TokenAttributor = new ClassAttributor$1('code-token', 'hljs', {
  scope: Scope.INLINE
})
class CodeToken extends Inline {
  static formats(node, scroll) {
    while (node != null && node !== scroll.domNode) {
      if (node.classList && node.classList.contains(CodeBlock.className)) {
        return super.formats(node, scroll)
      }
      node = node.parentNode
    }
    return void 0
  }
  constructor(scroll, domNode, value) {
    super(scroll, domNode, value)
    TokenAttributor.add(this.domNode, value)
  }
  format(format, value) {
    if (format !== CodeToken.blotName) {
      super.format(format, value)
    } else if (value) {
      TokenAttributor.add(this.domNode, value)
    } else {
      TokenAttributor.remove(this.domNode)
      this.domNode.classList.remove(this.statics.className)
    }
  }
  optimize() {
    super.optimize(...arguments)
    if (!TokenAttributor.value(this.domNode)) {
      this.unwrap()
    }
  }
}
CodeToken.blotName = 'code-token'
CodeToken.className = 'ql-token'
class SyntaxCodeBlock extends CodeBlock {
  static create(value) {
    const domNode = super.create(value)
    if (typeof value === 'string') {
      domNode.setAttribute('data-language', value)
    }
    return domNode
  }
  static formats(domNode) {
    return domNode.getAttribute('data-language') || 'plain'
  }
  static register() {}
  // Syntax module will register
  format(name, value) {
    if (name === this.statics.blotName && value) {
      this.domNode.setAttribute('data-language', value)
    } else {
      super.format(name, value)
    }
  }
  replaceWith(name, value) {
    this.formatAt(0, this.length(), CodeToken.blotName, false)
    return super.replaceWith(name, value)
  }
}
class SyntaxCodeBlockContainer extends CodeBlockContainer {
  attach() {
    super.attach()
    this.forceNext = false
    this.scroll.emitMount(this)
  }
  format(name, value) {
    if (name === SyntaxCodeBlock.blotName) {
      this.forceNext = true
      this.children.forEach((child) => {
        child.format(name, value)
      })
    }
  }
  formatAt(index2, length, name, value) {
    if (name === SyntaxCodeBlock.blotName) {
      this.forceNext = true
    }
    super.formatAt(index2, length, name, value)
  }
  highlight(highlight2) {
    let forced = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false
    if (this.children.head == null) return
    const nodes = Array.from(this.domNode.childNodes).filter((node) => node !== this.uiNode)
    const text = `${nodes.map((node) => node.textContent).join('\n')}
`
    const language = SyntaxCodeBlock.formats(this.children.head.domNode)
    if (forced || this.forceNext || this.cachedText !== text) {
      if (text.trim().length > 0 || this.cachedText == null) {
        const oldDelta = this.children.reduce((delta2, child) => {
          return delta2.concat(blockDelta(child, false))
        }, new Delta$1())
        const delta = highlight2(text, language)
        oldDelta.diff(delta).reduce((index2, _ref) => {
          let { retain, attributes } = _ref
          if (!retain) return index2
          if (attributes) {
            Object.keys(attributes).forEach((format) => {
              if ([SyntaxCodeBlock.blotName, CodeToken.blotName].includes(format)) {
                this.formatAt(index2, retain, format, attributes[format])
              }
            })
          }
          return index2 + retain
        }, 0)
      }
      this.cachedText = text
      this.forceNext = false
    }
  }
  html(index2, length) {
    const [codeBlock] = this.children.find(index2)
    const language = codeBlock ? SyntaxCodeBlock.formats(codeBlock.domNode) : 'plain'
    return `<pre data-language="${language}">
${escapeText(this.code(index2, length))}
</pre>`
  }
  optimize(context) {
    super.optimize(context)
    if (this.parent != null && this.children.head != null && this.uiNode != null) {
      const language = SyntaxCodeBlock.formats(this.children.head.domNode)
      if (language !== this.uiNode.value) {
        this.uiNode.value = language
      }
    }
  }
}
SyntaxCodeBlockContainer.allowedChildren = [SyntaxCodeBlock]
SyntaxCodeBlock.requiredContainer = SyntaxCodeBlockContainer
SyntaxCodeBlock.allowedChildren = [CodeToken, Cursor, Text$1, Break]
const highlight = (lib, language, text) => {
  if (typeof lib.versionString === 'string') {
    const majorVersion = lib.versionString.split('.')[0]
    if (parseInt(majorVersion, 10) >= 11) {
      return lib.highlight(text, {
        language
      }).value
    }
  }
  return lib.highlight(language, text).value
}
class Syntax extends Module$1 {
  static register() {
    Quill.register(CodeToken, true)
    Quill.register(SyntaxCodeBlock, true)
    Quill.register(SyntaxCodeBlockContainer, true)
  }
  constructor(quill, options2) {
    super(quill, options2)
    if (this.options.hljs == null) {
      throw new Error(
        'Syntax module requires highlight.js. Please include the library on the page before Quill.'
      )
    }
    this.languages = this.options.languages.reduce((memo, _ref2) => {
      let { key } = _ref2
      memo[key] = true
      return memo
    }, {})
    this.highlightBlot = this.highlightBlot.bind(this)
    this.initListener()
    this.initTimer()
  }
  initListener() {
    this.quill.on(Quill.events.SCROLL_BLOT_MOUNT, (blot) => {
      if (!(blot instanceof SyntaxCodeBlockContainer)) return
      const select = this.quill.root.ownerDocument.createElement('select')
      this.options.languages.forEach((_ref3) => {
        let { key, label } = _ref3
        const option = select.ownerDocument.createElement('option')
        option.textContent = label
        option.setAttribute('value', key)
        select.appendChild(option)
      })
      select.addEventListener('change', () => {
        blot.format(SyntaxCodeBlock.blotName, select.value)
        this.quill.root.focus()
        this.highlight(blot, true)
      })
      if (blot.uiNode == null) {
        blot.attachUI(select)
        if (blot.children.head) {
          select.value = SyntaxCodeBlock.formats(blot.children.head.domNode)
        }
      }
    })
  }
  initTimer() {
    let timer = null
    this.quill.on(Quill.events.SCROLL_OPTIMIZE, () => {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        this.highlight()
        timer = null
      }, this.options.interval)
    })
  }
  highlight() {
    let blot = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null
    let force = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false
    if (this.quill.selection.composing) return
    this.quill.update(Quill.sources.USER)
    const range = this.quill.getSelection()
    const blots = blot == null ? this.quill.scroll.descendants(SyntaxCodeBlockContainer) : [blot]
    blots.forEach((container) => {
      container.highlight(this.highlightBlot, force)
    })
    this.quill.update(Quill.sources.SILENT)
    if (range != null) {
      this.quill.setSelection(range, Quill.sources.SILENT)
    }
  }
  highlightBlot(text) {
    let language = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 'plain'
    language = this.languages[language] ? language : 'plain'
    if (language === 'plain') {
      return escapeText(text)
        .split('\n')
        .reduce((delta, line, i) => {
          if (i !== 0) {
            delta.insert('\n', {
              [CodeBlock.blotName]: language
            })
          }
          return delta.insert(line)
        }, new Delta$1())
    }
    const container = this.quill.root.ownerDocument.createElement('div')
    container.classList.add(CodeBlock.className)
    container.innerHTML = highlight(this.options.hljs, language, text)
    return traverse(
      this.quill.scroll,
      container,
      [
        (node, delta) => {
          const value = TokenAttributor.value(node)
          if (value) {
            return delta.compose(
              new Delta$1().retain(delta.length(), {
                [CodeToken.blotName]: value
              })
            )
          }
          return delta
        }
      ],
      [
        (node, delta) => {
          return node.data.split('\n').reduce((memo, nodeText, i) => {
            if (i !== 0)
              memo.insert('\n', {
                [CodeBlock.blotName]: language
              })
            return memo.insert(nodeText)
          }, delta)
        }
      ],
      /* @__PURE__ */ new WeakMap()
    )
  }
}
Syntax.DEFAULTS = {
  hljs: (() => {
    return window.hljs
  })(),
  interval: 1e3,
  languages: [
    {
      key: 'plain',
      label: 'Plain'
    },
    {
      key: 'bash',
      label: 'Bash'
    },
    {
      key: 'cpp',
      label: 'C++'
    },
    {
      key: 'cs',
      label: 'C#'
    },
    {
      key: 'css',
      label: 'CSS'
    },
    {
      key: 'diff',
      label: 'Diff'
    },
    {
      key: 'xml',
      label: 'HTML/XML'
    },
    {
      key: 'java',
      label: 'Java'
    },
    {
      key: 'javascript',
      label: 'JavaScript'
    },
    {
      key: 'markdown',
      label: 'Markdown'
    },
    {
      key: 'php',
      label: 'PHP'
    },
    {
      key: 'python',
      label: 'Python'
    },
    {
      key: 'ruby',
      label: 'Ruby'
    },
    {
      key: 'sql',
      label: 'SQL'
    }
  ]
}
class TableCell extends Block {
  static blotName = 'table'
  static tagName = 'TD'
  static create(value) {
    const node = super.create()
    if (value) {
      node.setAttribute('data-row', value)
    } else {
      node.setAttribute('data-row', tableId())
    }
    return node
  }
  static formats(domNode) {
    if (domNode.hasAttribute('data-row')) {
      return domNode.getAttribute('data-row')
    }
    return void 0
  }
  cellOffset() {
    if (this.parent) {
      return this.parent.children.indexOf(this)
    }
    return -1
  }
  format(name, value) {
    if (name === TableCell.blotName && value) {
      this.domNode.setAttribute('data-row', value)
    } else {
      super.format(name, value)
    }
  }
  row() {
    return this.parent
  }
  rowOffset() {
    if (this.row()) {
      return this.row().rowOffset()
    }
    return -1
  }
  table() {
    return this.row() && this.row().table()
  }
}
class TableRow extends Container {
  static blotName = 'table-row'
  static tagName = 'TR'
  checkMerge() {
    if (super.checkMerge() && this.next.children.head != null) {
      const thisHead = this.children.head.formats()
      const thisTail = this.children.tail.formats()
      const nextHead = this.next.children.head.formats()
      const nextTail = this.next.children.tail.formats()
      return (
        thisHead.table === thisTail.table &&
        thisHead.table === nextHead.table &&
        thisHead.table === nextTail.table
      )
    }
    return false
  }
  optimize(context) {
    super.optimize(context)
    this.children.forEach((child) => {
      if (child.next == null) return
      const childFormats = child.formats()
      const nextFormats = child.next.formats()
      if (childFormats.table !== nextFormats.table) {
        const next = this.splitAfter(child)
        if (next) {
          next.optimize()
        }
        if (this.prev) {
          this.prev.optimize()
        }
      }
    })
  }
  rowOffset() {
    if (this.parent) {
      return this.parent.children.indexOf(this)
    }
    return -1
  }
  table() {
    return this.parent && this.parent.parent
  }
}
class TableBody extends Container {
  static blotName = 'table-body'
  static tagName = 'TBODY'
}
class TableContainer extends Container {
  static blotName = 'table-container'
  static tagName = 'TABLE'
  balanceCells() {
    const rows = this.descendants(TableRow)
    const maxColumns = rows.reduce((max, row) => {
      return Math.max(row.children.length, max)
    }, 0)
    rows.forEach((row) => {
      new Array(maxColumns - row.children.length).fill(0).forEach(() => {
        let value
        if (row.children.head != null) {
          value = TableCell.formats(row.children.head.domNode)
        }
        const blot = this.scroll.create(TableCell.blotName, value)
        row.appendChild(blot)
        blot.optimize()
      })
    })
  }
  cells(column) {
    return this.rows().map((row) => row.children.at(column))
  }
  deleteColumn(index2) {
    const [body] = this.descendant(TableBody)
    if (body == null || body.children.head == null) return
    body.children.forEach((row) => {
      const cell = row.children.at(index2)
      if (cell != null) {
        cell.remove()
      }
    })
  }
  insertColumn(index2) {
    const [body] = this.descendant(TableBody)
    if (body == null || body.children.head == null) return
    body.children.forEach((row) => {
      const ref2 = row.children.at(index2)
      const value = TableCell.formats(row.children.head.domNode)
      const cell = this.scroll.create(TableCell.blotName, value)
      row.insertBefore(cell, ref2)
    })
  }
  insertRow(index2) {
    const [body] = this.descendant(TableBody)
    if (body == null || body.children.head == null) return
    const id = tableId()
    const row = this.scroll.create(TableRow.blotName)
    body.children.head.children.forEach(() => {
      const cell = this.scroll.create(TableCell.blotName, id)
      row.appendChild(cell)
    })
    const ref2 = body.children.at(index2)
    body.insertBefore(row, ref2)
  }
  rows() {
    const body = this.children.head
    if (body == null) return []
    return body.children.map((row) => row)
  }
}
TableContainer.allowedChildren = [TableBody]
TableBody.requiredContainer = TableContainer
TableBody.allowedChildren = [TableRow]
TableRow.requiredContainer = TableBody
TableRow.allowedChildren = [TableCell]
TableCell.requiredContainer = TableRow
function tableId() {
  const id = Math.random().toString(36).slice(2, 6)
  return `row-${id}`
}
class Table extends Module$1 {
  static register() {
    Quill.register(TableCell)
    Quill.register(TableRow)
    Quill.register(TableBody)
    Quill.register(TableContainer)
  }
  constructor() {
    super(...arguments)
    this.listenBalanceCells()
  }
  balanceTables() {
    this.quill.scroll.descendants(TableContainer).forEach((table) => {
      table.balanceCells()
    })
  }
  deleteColumn() {
    const [table, , cell] = this.getTable()
    if (cell == null) return
    table.deleteColumn(cell.cellOffset())
    this.quill.update(Quill.sources.USER)
  }
  deleteRow() {
    const [, row] = this.getTable()
    if (row == null) return
    row.remove()
    this.quill.update(Quill.sources.USER)
  }
  deleteTable() {
    const [table] = this.getTable()
    if (table == null) return
    const offset = table.offset()
    table.remove()
    this.quill.update(Quill.sources.USER)
    this.quill.setSelection(offset, Quill.sources.SILENT)
  }
  getTable() {
    let range =
      arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.quill.getSelection()
    if (range == null) return [null, null, null, -1]
    const [cell, offset] = this.quill.getLine(range.index)
    if (cell == null || cell.statics.blotName !== TableCell.blotName) {
      return [null, null, null, -1]
    }
    const row = cell.parent
    const table = row.parent.parent
    return [table, row, cell, offset]
  }
  insertColumn(offset) {
    const range = this.quill.getSelection()
    if (!range) return
    const [table, row, cell] = this.getTable(range)
    if (cell == null) return
    const column = cell.cellOffset()
    table.insertColumn(column + offset)
    this.quill.update(Quill.sources.USER)
    let shift = row.rowOffset()
    if (offset === 0) {
      shift += 1
    }
    this.quill.setSelection(range.index + shift, range.length, Quill.sources.SILENT)
  }
  insertColumnLeft() {
    this.insertColumn(0)
  }
  insertColumnRight() {
    this.insertColumn(1)
  }
  insertRow(offset) {
    const range = this.quill.getSelection()
    if (!range) return
    const [table, row, cell] = this.getTable(range)
    if (cell == null) return
    const index2 = row.rowOffset()
    table.insertRow(index2 + offset)
    this.quill.update(Quill.sources.USER)
    if (offset > 0) {
      this.quill.setSelection(range, Quill.sources.SILENT)
    } else {
      this.quill.setSelection(range.index + row.children.length, range.length, Quill.sources.SILENT)
    }
  }
  insertRowAbove() {
    this.insertRow(0)
  }
  insertRowBelow() {
    this.insertRow(1)
  }
  insertTable(rows, columns) {
    const range = this.quill.getSelection()
    if (range == null) return
    const delta = new Array(rows).fill(0).reduce((memo) => {
      const text = new Array(columns).fill('\n').join('')
      return memo.insert(text, {
        table: tableId()
      })
    }, new Delta$1().retain(range.index))
    this.quill.updateContents(delta, Quill.sources.USER)
    this.quill.setSelection(range.index, Quill.sources.SILENT)
    this.balanceTables()
  }
  listenBalanceCells() {
    this.quill.on(Quill.events.SCROLL_OPTIMIZE, (mutations) => {
      mutations.some((mutation) => {
        if (['TD', 'TR', 'TBODY', 'TABLE'].includes(mutation.target.tagName)) {
          this.quill.once(Quill.events.TEXT_CHANGE, (delta, old, source) => {
            if (source !== Quill.sources.USER) return
            this.balanceTables()
          })
          return true
        }
        return false
      })
    })
  }
}
const debug = namespace('quill:toolbar')
class Toolbar extends Module$1 {
  constructor(quill, options2) {
    super(quill, options2)
    if (Array.isArray(this.options.container)) {
      const container = document.createElement('div')
      container.setAttribute('role', 'toolbar')
      addControls(container, this.options.container)
      quill.container?.parentNode?.insertBefore(container, quill.container)
      this.container = container
    } else if (typeof this.options.container === 'string') {
      this.container = document.querySelector(this.options.container)
    } else {
      this.container = this.options.container
    }
    if (!(this.container instanceof HTMLElement)) {
      debug.error('Container required for toolbar', this.options)
      return
    }
    this.container.classList.add('ql-toolbar')
    this.controls = []
    this.handlers = {}
    if (this.options.handlers) {
      Object.keys(this.options.handlers).forEach((format) => {
        const handler = this.options.handlers?.[format]
        if (handler) {
          this.addHandler(format, handler)
        }
      })
    }
    Array.from(this.container.querySelectorAll('button, select')).forEach((input) => {
      this.attach(input)
    })
    this.quill.on(Quill.events.EDITOR_CHANGE, () => {
      const [range] = this.quill.selection.getRange()
      this.update(range)
    })
  }
  addHandler(format, handler) {
    this.handlers[format] = handler
  }
  attach(input) {
    let format = Array.from(input.classList).find((className) => {
      return className.indexOf('ql-') === 0
    })
    if (!format) return
    format = format.slice('ql-'.length)
    if (input.tagName === 'BUTTON') {
      input.setAttribute('type', 'button')
    }
    if (this.handlers[format] == null && this.quill.scroll.query(format) == null) {
      debug.warn('ignoring attaching to nonexistent format', format, input)
      return
    }
    const eventName = input.tagName === 'SELECT' ? 'change' : 'click'
    input.addEventListener(eventName, (e) => {
      let value
      if (input.tagName === 'SELECT') {
        if (input.selectedIndex < 0) return
        const selected = input.options[input.selectedIndex]
        if (selected.hasAttribute('selected')) {
          value = false
        } else {
          value = selected.value || false
        }
      } else {
        if (input.classList.contains('ql-active')) {
          value = false
        } else {
          value = input.value || !input.hasAttribute('value')
        }
        e.preventDefault()
      }
      this.quill.focus()
      const [range] = this.quill.selection.getRange()
      if (this.handlers[format] != null) {
        this.handlers[format].call(this, value)
      } else if (
        // @ts-expect-error
        this.quill.scroll.query(format).prototype instanceof EmbedBlot$1$1
      ) {
        value = prompt(`Enter ${format}`)
        if (!value) return
        this.quill.updateContents(
          new Delta$1()
            .retain(range.index)
            .delete(range.length)
            .insert({
              [format]: value
            }),
          Quill.sources.USER
        )
      } else {
        this.quill.format(format, value, Quill.sources.USER)
      }
      this.update(range)
    })
    this.controls.push([format, input])
  }
  update(range) {
    const formats = range == null ? {} : this.quill.getFormat(range)
    this.controls.forEach((pair) => {
      const [format, input] = pair
      if (input.tagName === 'SELECT') {
        let option = null
        if (range == null) {
          option = null
        } else if (formats[format] == null) {
          option = input.querySelector('option[selected]')
        } else if (!Array.isArray(formats[format])) {
          let value = formats[format]
          if (typeof value === 'string') {
            value = value.replace(/"/g, '\\"')
          }
          option = input.querySelector(`option[value="${value}"]`)
        }
        if (option == null) {
          input.value = ''
          input.selectedIndex = -1
        } else {
          option.selected = true
        }
      } else if (range == null) {
        input.classList.remove('ql-active')
        input.setAttribute('aria-pressed', 'false')
      } else if (input.hasAttribute('value')) {
        const value = formats[format]
        const isActive =
          value === input.getAttribute('value') ||
          (value != null && value.toString() === input.getAttribute('value')) ||
          (value == null && !input.getAttribute('value'))
        input.classList.toggle('ql-active', isActive)
        input.setAttribute('aria-pressed', isActive.toString())
      } else {
        const isActive = formats[format] != null
        input.classList.toggle('ql-active', isActive)
        input.setAttribute('aria-pressed', isActive.toString())
      }
    })
  }
}
Toolbar.DEFAULTS = {}
function addButton(container, format, value) {
  const input = document.createElement('button')
  input.setAttribute('type', 'button')
  input.classList.add(`ql-${format}`)
  input.setAttribute('aria-pressed', 'false')
  if (value != null) {
    input.value = value
    input.setAttribute('aria-label', `${format}: ${value}`)
  } else {
    input.setAttribute('aria-label', format)
  }
  container.appendChild(input)
}
function addControls(container, groups) {
  if (!Array.isArray(groups[0])) {
    groups = [groups]
  }
  groups.forEach((controls) => {
    const group = document.createElement('span')
    group.classList.add('ql-formats')
    controls.forEach((control) => {
      if (typeof control === 'string') {
        addButton(group, control)
      } else {
        const format = Object.keys(control)[0]
        const value = control[format]
        if (Array.isArray(value)) {
          addSelect(group, format, value)
        } else {
          addButton(group, format, value)
        }
      }
    })
    container.appendChild(group)
  })
}
function addSelect(container, format, values) {
  const input = document.createElement('select')
  input.classList.add(`ql-${format}`)
  values.forEach((value) => {
    const option = document.createElement('option')
    if (value !== false) {
      option.setAttribute('value', String(value))
    } else {
      option.setAttribute('selected', 'selected')
    }
    input.appendChild(option)
  })
  container.appendChild(input)
}
Toolbar.DEFAULTS = {
  container: null,
  handlers: {
    clean() {
      const range = this.quill.getSelection()
      if (range == null) return
      if (range.length === 0) {
        const formats = this.quill.getFormat()
        Object.keys(formats).forEach((name) => {
          if (this.quill.scroll.query(name, Scope.INLINE) != null) {
            this.quill.format(name, false, Quill.sources.USER)
          }
        })
      } else {
        this.quill.removeFormat(range.index, range.length, Quill.sources.USER)
      }
    },
    direction(value) {
      const { align } = this.quill.getFormat()
      if (value === 'rtl' && align == null) {
        this.quill.format('align', 'right', Quill.sources.USER)
      } else if (!value && align === 'right') {
        this.quill.format('align', false, Quill.sources.USER)
      }
      this.quill.format('direction', value, Quill.sources.USER)
    },
    indent(value) {
      const range = this.quill.getSelection()
      const formats = this.quill.getFormat(range)
      const indent = parseInt(formats.indent || 0, 10)
      if (value === '+1' || value === '-1') {
        let modifier = value === '+1' ? 1 : -1
        if (formats.direction === 'rtl') modifier *= -1
        this.quill.format('indent', indent + modifier, Quill.sources.USER)
      }
    },
    link(value) {
      if (value === true) {
        value = prompt('Enter link URL:')
      }
      this.quill.format('link', value, Quill.sources.USER)
    },
    list(value) {
      const range = this.quill.getSelection()
      const formats = this.quill.getFormat(range)
      if (value === 'check') {
        if (formats.list === 'checked' || formats.list === 'unchecked') {
          this.quill.format('list', false, Quill.sources.USER)
        } else {
          this.quill.format('list', 'unchecked', Quill.sources.USER)
        }
      } else {
        this.quill.format('list', value, Quill.sources.USER)
      }
    }
  }
}
const alignLeftIcon =
  '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="3" x2="13" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="9" y1="4" y2="4"/></svg>'
const alignCenterIcon =
  '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="14" x2="4" y1="14" y2="14"/><line class="ql-stroke" x1="12" x2="6" y1="4" y2="4"/></svg>'
const alignRightIcon =
  '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="15" x2="5" y1="14" y2="14"/><line class="ql-stroke" x1="15" x2="9" y1="4" y2="4"/></svg>'
const alignJustifyIcon =
  '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="15" x2="3" y1="14" y2="14"/><line class="ql-stroke" x1="15" x2="3" y1="4" y2="4"/></svg>'
const backgroundIcon =
  '<svg viewbox="0 0 18 18"><g class="ql-fill ql-color-label"><polygon points="6 6.868 6 6 5 6 5 7 5.942 7 6 6.868"/><rect height="1" width="1" x="4" y="4"/><polygon points="6.817 5 6 5 6 6 6.38 6 6.817 5"/><rect height="1" width="1" x="2" y="6"/><rect height="1" width="1" x="3" y="5"/><rect height="1" width="1" x="4" y="7"/><polygon points="4 11.439 4 11 3 11 3 12 3.755 12 4 11.439"/><rect height="1" width="1" x="2" y="12"/><rect height="1" width="1" x="2" y="9"/><rect height="1" width="1" x="2" y="15"/><polygon points="4.63 10 4 10 4 11 4.192 11 4.63 10"/><rect height="1" width="1" x="3" y="8"/><path d="M10.832,4.2L11,4.582V4H10.708A1.948,1.948,0,0,1,10.832,4.2Z"/><path d="M7,4.582L7.168,4.2A1.929,1.929,0,0,1,7.292,4H7V4.582Z"/><path d="M8,13H7.683l-0.351.8a1.933,1.933,0,0,1-.124.2H8V13Z"/><rect height="1" width="1" x="12" y="2"/><rect height="1" width="1" x="11" y="3"/><path d="M9,3H8V3.282A1.985,1.985,0,0,1,9,3Z"/><rect height="1" width="1" x="2" y="3"/><rect height="1" width="1" x="6" y="2"/><rect height="1" width="1" x="3" y="2"/><rect height="1" width="1" x="5" y="3"/><rect height="1" width="1" x="9" y="2"/><rect height="1" width="1" x="15" y="14"/><polygon points="13.447 10.174 13.469 10.225 13.472 10.232 13.808 11 14 11 14 10 13.37 10 13.447 10.174"/><rect height="1" width="1" x="13" y="7"/><rect height="1" width="1" x="15" y="5"/><rect height="1" width="1" x="14" y="6"/><rect height="1" width="1" x="15" y="8"/><rect height="1" width="1" x="14" y="9"/><path d="M3.775,14H3v1H4V14.314A1.97,1.97,0,0,1,3.775,14Z"/><rect height="1" width="1" x="14" y="3"/><polygon points="12 6.868 12 6 11.62 6 12 6.868"/><rect height="1" width="1" x="15" y="2"/><rect height="1" width="1" x="12" y="5"/><rect height="1" width="1" x="13" y="4"/><polygon points="12.933 9 13 9 13 8 12.495 8 12.933 9"/><rect height="1" width="1" x="9" y="14"/><rect height="1" width="1" x="8" y="15"/><path d="M6,14.926V15H7V14.316A1.993,1.993,0,0,1,6,14.926Z"/><rect height="1" width="1" x="5" y="15"/><path d="M10.668,13.8L10.317,13H10v1h0.792A1.947,1.947,0,0,1,10.668,13.8Z"/><rect height="1" width="1" x="11" y="15"/><path d="M14.332,12.2a1.99,1.99,0,0,1,.166.8H15V12H14.245Z"/><rect height="1" width="1" x="14" y="15"/><rect height="1" width="1" x="15" y="11"/></g><polyline class="ql-stroke" points="5.5 13 9 5 12.5 13"/><line class="ql-stroke" x1="11.63" x2="6.38" y1="11" y2="11"/></svg>'
const blockquoteIcon =
  '<svg viewbox="0 0 18 18"><rect class="ql-fill ql-stroke" height="3" width="3" x="4" y="5"/><rect class="ql-fill ql-stroke" height="3" width="3" x="11" y="5"/><path class="ql-even ql-fill ql-stroke" d="M7,8c0,4.031-3,5-3,5"/><path class="ql-even ql-fill ql-stroke" d="M14,8c0,4.031-3,5-3,5"/></svg>'
const boldIcon =
  '<svg viewbox="0 0 18 18"><path class="ql-stroke" d="M5,4H9.5A2.5,2.5,0,0,1,12,6.5v0A2.5,2.5,0,0,1,9.5,9H5A0,0,0,0,1,5,9V4A0,0,0,0,1,5,4Z"/><path class="ql-stroke" d="M5,9h5.5A2.5,2.5,0,0,1,13,11.5v0A2.5,2.5,0,0,1,10.5,14H5a0,0,0,0,1,0,0V9A0,0,0,0,1,5,9Z"/></svg>'
const cleanIcon =
  '<svg class="" viewbox="0 0 18 18"><line class="ql-stroke" x1="5" x2="13" y1="3" y2="3"/><line class="ql-stroke" x1="6" x2="9.35" y1="12" y2="3"/><line class="ql-stroke" x1="11" x2="15" y1="11" y2="15"/><line class="ql-stroke" x1="15" x2="11" y1="11" y2="15"/><rect class="ql-fill" height="1" rx="0.5" ry="0.5" width="7" x="2" y="14"/></svg>'
const codeIcon =
  '<svg viewbox="0 0 18 18"><polyline class="ql-even ql-stroke" points="5 7 3 9 5 11"/><polyline class="ql-even ql-stroke" points="13 7 15 9 13 11"/><line class="ql-stroke" x1="10" x2="8" y1="5" y2="13"/></svg>'
const colorIcon =
  '<svg viewbox="0 0 18 18"><line class="ql-color-label ql-stroke ql-transparent" x1="3" x2="15" y1="15" y2="15"/><polyline class="ql-stroke" points="5.5 11 9 3 12.5 11"/><line class="ql-stroke" x1="11.63" x2="6.38" y1="9" y2="9"/></svg>'
const directionLeftToRightIcon =
  '<svg viewbox="0 0 18 18"><polygon class="ql-stroke ql-fill" points="3 11 5 9 3 7 3 11"/><line class="ql-stroke ql-fill" x1="15" x2="11" y1="4" y2="4"/><path class="ql-fill" d="M11,3a3,3,0,0,0,0,6h1V3H11Z"/><rect class="ql-fill" height="11" width="1" x="11" y="4"/><rect class="ql-fill" height="11" width="1" x="13" y="4"/></svg>'
const directionRightToLeftIcon =
  '<svg viewbox="0 0 18 18"><polygon class="ql-stroke ql-fill" points="15 12 13 10 15 8 15 12"/><line class="ql-stroke ql-fill" x1="9" x2="5" y1="4" y2="4"/><path class="ql-fill" d="M5,3A3,3,0,0,0,5,9H6V3H5Z"/><rect class="ql-fill" height="11" width="1" x="5" y="4"/><rect class="ql-fill" height="11" width="1" x="7" y="4"/></svg>'
const formulaIcon =
  '<svg viewbox="0 0 18 18"><path class="ql-fill" d="M11.759,2.482a2.561,2.561,0,0,0-3.53.607A7.656,7.656,0,0,0,6.8,6.2C6.109,9.188,5.275,14.677,4.15,14.927a1.545,1.545,0,0,0-1.3-.933A0.922,0.922,0,0,0,2,15.036S1.954,16,4.119,16s3.091-2.691,3.7-5.553c0.177-.826.36-1.726,0.554-2.6L8.775,6.2c0.381-1.421.807-2.521,1.306-2.676a1.014,1.014,0,0,0,1.02.56A0.966,0.966,0,0,0,11.759,2.482Z"/><rect class="ql-fill" height="1.6" rx="0.8" ry="0.8" width="5" x="5.15" y="6.2"/><path class="ql-fill" d="M13.663,12.027a1.662,1.662,0,0,1,.266-0.276q0.193,0.069.456,0.138a2.1,2.1,0,0,0,.535.069,1.075,1.075,0,0,0,.767-0.3,1.044,1.044,0,0,0,.314-0.8,0.84,0.84,0,0,0-.238-0.619,0.8,0.8,0,0,0-.594-0.239,1.154,1.154,0,0,0-.781.3,4.607,4.607,0,0,0-.781,1q-0.091.15-.218,0.346l-0.246.38c-0.068-.288-0.137-0.582-0.212-0.885-0.459-1.847-2.494-.984-2.941-0.8-0.482.2-.353,0.647-0.094,0.529a0.869,0.869,0,0,1,1.281.585c0.217,0.751.377,1.436,0.527,2.038a5.688,5.688,0,0,1-.362.467,2.69,2.69,0,0,1-.264.271q-0.221-.08-0.471-0.147a2.029,2.029,0,0,0-.522-0.066,1.079,1.079,0,0,0-.768.3A1.058,1.058,0,0,0,9,15.131a0.82,0.82,0,0,0,.832.852,1.134,1.134,0,0,0,.787-0.3,5.11,5.11,0,0,0,.776-0.993q0.141-.219.215-0.34c0.046-.076.122-0.194,0.223-0.346a2.786,2.786,0,0,0,.918,1.726,2.582,2.582,0,0,0,2.376-.185c0.317-.181.212-0.565,0-0.494A0.807,0.807,0,0,1,14.176,15a5.159,5.159,0,0,1-.913-2.446l0,0Q13.487,12.24,13.663,12.027Z"/></svg>'
const headerIcon =
  '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Zm6.06787,9.209H14.98975V7.59863a.54085.54085,0,0,0-.605-.60547h-.62744a1.01119,1.01119,0,0,0-.748.29688L11.645,8.56641a.5435.5435,0,0,0-.022.8584l.28613.30762a.53861.53861,0,0,0,.84717.0332l.09912-.08789a1.2137,1.2137,0,0,0,.2417-.35254h.02246s-.01123.30859-.01123.60547V13.209H12.041a.54085.54085,0,0,0-.605.60547v.43945a.54085.54085,0,0,0,.605.60547h4.02686a.54085.54085,0,0,0,.605-.60547v-.43945A.54085.54085,0,0,0,16.06787,13.209Z"/></svg>'
const header2Icon =
  '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.73975,13.81445v.43945a.54085.54085,0,0,1-.605.60547H11.855a.58392.58392,0,0,1-.64893-.60547V14.0127c0-2.90527,3.39941-3.42187,3.39941-4.55469a.77675.77675,0,0,0-.84717-.78125,1.17684,1.17684,0,0,0-.83594.38477c-.2749.26367-.561.374-.85791.13184l-.4292-.34082c-.30811-.24219-.38525-.51758-.1543-.81445a2.97155,2.97155,0,0,1,2.45361-1.17676,2.45393,2.45393,0,0,1,2.68408,2.40918c0,2.45312-3.1792,2.92676-3.27832,3.93848h2.79443A.54085.54085,0,0,1,16.73975,13.81445ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>'
const header3Icon =
  '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.65186,12.30664a2.6742,2.6742,0,0,1-2.915,2.68457,3.96592,3.96592,0,0,1-2.25537-.6709.56007.56007,0,0,1-.13232-.83594L11.64648,13c.209-.34082.48389-.36328.82471-.1543a2.32654,2.32654,0,0,0,1.12256.33008c.71484,0,1.12207-.35156,1.12207-.78125,0-.61523-.61621-.86816-1.46338-.86816H13.2085a.65159.65159,0,0,1-.68213-.41895l-.05518-.10937a.67114.67114,0,0,1,.14307-.78125l.71533-.86914a8.55289,8.55289,0,0,1,.68213-.7373V8.58887a3.93913,3.93913,0,0,1-.748.05469H11.9873a.54085.54085,0,0,1-.605-.60547V7.59863a.54085.54085,0,0,1,.605-.60547h3.75146a.53773.53773,0,0,1,.60547.59375v.17676a1.03723,1.03723,0,0,1-.27539.748L14.74854,10.0293A2.31132,2.31132,0,0,1,16.65186,12.30664ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>'
const header4Icon =
  '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Zm7.05371,7.96582v.38477c0,.39648-.165.60547-.46191.60547h-.47314v1.29785a.54085.54085,0,0,1-.605.60547h-.69336a.54085.54085,0,0,1-.605-.60547V12.95605H11.333a.5412.5412,0,0,1-.60547-.60547v-.15332a1.199,1.199,0,0,1,.22021-.748l2.56348-4.05957a.7819.7819,0,0,1,.72607-.39648h1.27637a.54085.54085,0,0,1,.605.60547v3.7627h.33008A.54055.54055,0,0,1,17.05371,11.96582ZM14.28125,8.7207h-.022a4.18969,4.18969,0,0,1-.38525.81348l-1.188,1.80469v.02246h1.5293V9.60059A7.04058,7.04058,0,0,1,14.28125,8.7207Z"/></svg>'
const header5Icon =
  '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.74023,12.18555a2.75131,2.75131,0,0,1-2.91553,2.80566,3.908,3.908,0,0,1-2.25537-.68164.54809.54809,0,0,1-.13184-.8252L11.73438,13c.209-.34082.48389-.36328.8252-.1543a2.23757,2.23757,0,0,0,1.1001.33008,1.01827,1.01827,0,0,0,1.1001-.96777c0-.61621-.53906-.97949-1.25439-.97949a2.15554,2.15554,0,0,0-.64893.09961,1.15209,1.15209,0,0,1-.814.01074l-.12109-.04395a.64116.64116,0,0,1-.45117-.71484l.231-3.00391a.56666.56666,0,0,1,.62744-.583H15.541a.54085.54085,0,0,1,.605.60547v.43945a.54085.54085,0,0,1-.605.60547H13.41748l-.04395.72559a1.29306,1.29306,0,0,1-.04395.30859h.022a2.39776,2.39776,0,0,1,.57227-.07715A2.53266,2.53266,0,0,1,16.74023,12.18555ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>'
const header6Icon =
  '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M14.51758,9.64453a1.85627,1.85627,0,0,0-1.24316.38477H13.252a1.73532,1.73532,0,0,1,1.72754-1.4082,2.66491,2.66491,0,0,1,.5498.06641c.35254.05469.57227.01074.70508-.40723l.16406-.5166a.53393.53393,0,0,0-.373-.75977,4.83723,4.83723,0,0,0-1.17773-.14258c-2.43164,0-3.7627,2.17773-3.7627,4.43359,0,2.47559,1.60645,3.69629,3.19043,3.69629A2.70585,2.70585,0,0,0,16.96,12.19727,2.43861,2.43861,0,0,0,14.51758,9.64453Zm-.23047,3.58691c-.67187,0-1.22168-.81445-1.22168-1.45215,0-.47363.30762-.583.72559-.583.96875,0,1.27734.59375,1.27734,1.12207A.82182.82182,0,0,1,14.28711,13.23145ZM10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Z"/></svg>'
const italicIcon =
  '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="13" y1="4" y2="4"/><line class="ql-stroke" x1="5" x2="11" y1="14" y2="14"/><line class="ql-stroke" x1="8" x2="10" y1="14" y2="4"/></svg>'
const imageIcon =
  '<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="10" width="12" x="3" y="4"/><circle class="ql-fill" cx="6" cy="7" r="1"/><polyline class="ql-even ql-fill" points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"/></svg>'
const indentIcon =
  '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-fill ql-stroke" points="3 7 3 11 5 9 3 7"/></svg>'
const outdentIcon =
  '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-stroke" points="5 7 5 11 3 9 5 7"/></svg>'
const linkIcon =
  '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="11" y1="7" y2="11"/><path class="ql-even ql-stroke" d="M8.9,4.577a3.476,3.476,0,0,1,.36,4.679A3.476,3.476,0,0,1,4.577,8.9C3.185,7.5,2.035,6.4,4.217,4.217S7.5,3.185,8.9,4.577Z"/><path class="ql-even ql-stroke" d="M13.423,9.1a3.476,3.476,0,0,0-4.679-.36,3.476,3.476,0,0,0,.36,4.679c1.392,1.392,2.5,2.542,4.679.36S14.815,10.5,13.423,9.1Z"/></svg>'
const listBulletIcon =
  '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="6" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="6" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="6" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="3" y1="4" y2="4"/><line class="ql-stroke" x1="3" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="3" x2="3" y1="14" y2="14"/></svg>'
const listCheckIcon =
  '<svg class="" viewbox="0 0 18 18"><line class="ql-stroke" x1="9" x2="15" y1="4" y2="4"/><polyline class="ql-stroke" points="3 4 4 5 6 3"/><line class="ql-stroke" x1="9" x2="15" y1="14" y2="14"/><polyline class="ql-stroke" points="3 14 4 15 6 13"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-stroke" points="3 9 4 10 6 8"/></svg>'
const listOrderedIcon =
  '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="7" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="7" x2="15" y1="14" y2="14"/><line class="ql-stroke ql-thin" x1="2.5" x2="4.5" y1="5.5" y2="5.5"/><path class="ql-fill" d="M3.5,6A0.5,0.5,0,0,1,3,5.5V3.085l-0.276.138A0.5,0.5,0,0,1,2.053,3c-0.124-.247-0.023-0.324.224-0.447l1-.5A0.5,0.5,0,0,1,4,2.5v3A0.5,0.5,0,0,1,3.5,6Z"/><path class="ql-stroke ql-thin" d="M4.5,10.5h-2c0-.234,1.85-1.076,1.85-2.234A0.959,0.959,0,0,0,2.5,8.156"/><path class="ql-stroke ql-thin" d="M2.5,14.846a0.959,0.959,0,0,0,1.85-.109A0.7,0.7,0,0,0,3.75,14a0.688,0.688,0,0,0,.6-0.736,0.959,0.959,0,0,0-1.85-.109"/></svg>'
const subscriptIcon =
  '<svg viewbox="0 0 18 18"><path class="ql-fill" d="M15.5,15H13.861a3.858,3.858,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.921,1.921,0,0,0,12.021,11.7a0.50013,0.50013,0,1,0,.957.291h0a0.914,0.914,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.076-1.16971,1.86982-1.93971,2.43082A1.45639,1.45639,0,0,0,12,15.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,15Z"/><path class="ql-fill" d="M9.65,5.241a1,1,0,0,0-1.409.108L6,7.964,3.759,5.349A1,1,0,0,0,2.192,6.59178Q2.21541,6.6213,2.241,6.649L4.684,9.5,2.241,12.35A1,1,0,0,0,3.71,13.70722q0.02557-.02768.049-0.05722L6,11.036,8.241,13.65a1,1,0,1,0,1.567-1.24277Q9.78459,12.3777,9.759,12.35L7.316,9.5,9.759,6.651A1,1,0,0,0,9.65,5.241Z"/></svg>'
const superscriptIcon =
  '<svg viewbox="0 0 18 18"><path class="ql-fill" d="M15.5,7H13.861a4.015,4.015,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.922,1.922,0,0,0,12.021,3.7a0.5,0.5,0,1,0,.957.291,0.917,0.917,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.077-1.164,1.925-1.934,2.486A1.423,1.423,0,0,0,12,7.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,7Z"/><path class="ql-fill" d="M9.651,5.241a1,1,0,0,0-1.41.108L6,7.964,3.759,5.349a1,1,0,1,0-1.519,1.3L4.683,9.5,2.241,12.35a1,1,0,1,0,1.519,1.3L6,11.036,8.241,13.65a1,1,0,0,0,1.519-1.3L7.317,9.5,9.759,6.651A1,1,0,0,0,9.651,5.241Z"/></svg>'
const strikeIcon =
  '<svg viewbox="0 0 18 18"><line class="ql-stroke ql-thin" x1="15.5" x2="2.5" y1="8.5" y2="9.5"/><path class="ql-fill" d="M9.007,8C6.542,7.791,6,7.519,6,6.5,6,5.792,7.283,5,9,5c1.571,0,2.765.679,2.969,1.309a1,1,0,0,0,1.9-.617C13.356,4.106,11.354,3,9,3,6.2,3,4,4.538,4,6.5a3.2,3.2,0,0,0,.5,1.843Z"/><path class="ql-fill" d="M8.984,10C11.457,10.208,12,10.479,12,11.5c0,0.708-1.283,1.5-3,1.5-1.571,0-2.765-.679-2.969-1.309a1,1,0,1,0-1.9.617C4.644,13.894,6.646,15,9,15c2.8,0,5-1.538,5-3.5a3.2,3.2,0,0,0-.5-1.843Z"/></svg>'
const tableIcon =
  '<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="12" width="12" x="3" y="3"/><rect class="ql-fill" height="2" width="3" x="5" y="5"/><rect class="ql-fill" height="2" width="4" x="9" y="5"/><g class="ql-fill ql-transparent"><rect height="2" width="3" x="5" y="8"/><rect height="2" width="4" x="9" y="8"/><rect height="2" width="3" x="5" y="11"/><rect height="2" width="4" x="9" y="11"/></g></svg>'
const underlineIcon =
  '<svg viewbox="0 0 18 18"><path class="ql-stroke" d="M5,3V9a4.012,4.012,0,0,0,4,4H9a4.012,4.012,0,0,0,4-4V3"/><rect class="ql-fill" height="1" rx="0.5" ry="0.5" width="12" x="3" y="15"/></svg>'
const videoIcon =
  '<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="12" width="12" x="3" y="3"/><rect class="ql-fill" height="12" width="1" x="5" y="3"/><rect class="ql-fill" height="12" width="1" x="12" y="3"/><rect class="ql-fill" height="2" width="8" x="5" y="8"/><rect class="ql-fill" height="1" width="3" x="3" y="5"/><rect class="ql-fill" height="1" width="3" x="3" y="7"/><rect class="ql-fill" height="1" width="3" x="3" y="10"/><rect class="ql-fill" height="1" width="3" x="3" y="12"/><rect class="ql-fill" height="1" width="3" x="12" y="5"/><rect class="ql-fill" height="1" width="3" x="12" y="7"/><rect class="ql-fill" height="1" width="3" x="12" y="10"/><rect class="ql-fill" height="1" width="3" x="12" y="12"/></svg>'
const Icons = {
  align: {
    '': alignLeftIcon,
    center: alignCenterIcon,
    right: alignRightIcon,
    justify: alignJustifyIcon
  },
  background: backgroundIcon,
  blockquote: blockquoteIcon,
  bold: boldIcon,
  clean: cleanIcon,
  code: codeIcon,
  'code-block': codeIcon,
  color: colorIcon,
  direction: {
    '': directionLeftToRightIcon,
    rtl: directionRightToLeftIcon
  },
  formula: formulaIcon,
  header: {
    1: headerIcon,
    2: header2Icon,
    3: header3Icon,
    4: header4Icon,
    5: header5Icon,
    6: header6Icon
  },
  italic: italicIcon,
  image: imageIcon,
  indent: {
    '+1': indentIcon,
    '-1': outdentIcon
  },
  link: linkIcon,
  list: {
    bullet: listBulletIcon,
    check: listCheckIcon,
    ordered: listOrderedIcon
  },
  script: {
    sub: subscriptIcon,
    super: superscriptIcon
  },
  strike: strikeIcon,
  table: tableIcon,
  underline: underlineIcon,
  video: videoIcon
}
const DropdownIcon =
  '<svg viewbox="0 0 18 18"><polygon class="ql-stroke" points="7 11 9 13 11 11 7 11"/><polygon class="ql-stroke" points="7 7 9 5 11 7 7 7"/></svg>'
let optionsCounter = 0
function toggleAriaAttribute(element, attribute) {
  element.setAttribute(attribute, `${!(element.getAttribute(attribute) === 'true')}`)
}
class Picker {
  constructor(select) {
    this.select = select
    this.container = document.createElement('span')
    this.buildPicker()
    this.select.style.display = 'none'
    this.select.parentNode.insertBefore(this.container, this.select)
    this.label.addEventListener('mousedown', () => {
      this.togglePicker()
    })
    this.label.addEventListener('keydown', (event) => {
      switch (event.key) {
        case 'Enter':
          this.togglePicker()
          break
        case 'Escape':
          this.escape()
          event.preventDefault()
          break
      }
    })
    this.select.addEventListener('change', this.update.bind(this))
  }
  togglePicker() {
    this.container.classList.toggle('ql-expanded')
    toggleAriaAttribute(this.label, 'aria-expanded')
    toggleAriaAttribute(this.options, 'aria-hidden')
  }
  buildItem(option) {
    const item = document.createElement('span')
    item.tabIndex = '0'
    item.setAttribute('role', 'button')
    item.classList.add('ql-picker-item')
    const value = option.getAttribute('value')
    if (value) {
      item.setAttribute('data-value', value)
    }
    if (option.textContent) {
      item.setAttribute('data-label', option.textContent)
    }
    item.addEventListener('click', () => {
      this.selectItem(item, true)
    })
    item.addEventListener('keydown', (event) => {
      switch (event.key) {
        case 'Enter':
          this.selectItem(item, true)
          event.preventDefault()
          break
        case 'Escape':
          this.escape()
          event.preventDefault()
          break
      }
    })
    return item
  }
  buildLabel() {
    const label = document.createElement('span')
    label.classList.add('ql-picker-label')
    label.innerHTML = DropdownIcon
    label.tabIndex = '0'
    label.setAttribute('role', 'button')
    label.setAttribute('aria-expanded', 'false')
    this.container.appendChild(label)
    return label
  }
  buildOptions() {
    const options2 = document.createElement('span')
    options2.classList.add('ql-picker-options')
    options2.setAttribute('aria-hidden', 'true')
    options2.tabIndex = '-1'
    options2.id = `ql-picker-options-${optionsCounter}`
    optionsCounter += 1
    this.label.setAttribute('aria-controls', options2.id)
    this.options = options2
    Array.from(this.select.options).forEach((option) => {
      const item = this.buildItem(option)
      options2.appendChild(item)
      if (option.selected === true) {
        this.selectItem(item)
      }
    })
    this.container.appendChild(options2)
  }
  buildPicker() {
    Array.from(this.select.attributes).forEach((item) => {
      this.container.setAttribute(item.name, item.value)
    })
    this.container.classList.add('ql-picker')
    this.label = this.buildLabel()
    this.buildOptions()
  }
  escape() {
    this.close()
    setTimeout(() => this.label.focus(), 1)
  }
  close() {
    this.container.classList.remove('ql-expanded')
    this.label.setAttribute('aria-expanded', 'false')
    this.options.setAttribute('aria-hidden', 'true')
  }
  selectItem(item) {
    let trigger = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false
    const selected = this.container.querySelector('.ql-selected')
    if (item === selected) return
    if (selected != null) {
      selected.classList.remove('ql-selected')
    }
    if (item == null) return
    item.classList.add('ql-selected')
    this.select.selectedIndex = Array.from(item.parentNode.children).indexOf(item)
    if (item.hasAttribute('data-value')) {
      this.label.setAttribute('data-value', item.getAttribute('data-value'))
    } else {
      this.label.removeAttribute('data-value')
    }
    if (item.hasAttribute('data-label')) {
      this.label.setAttribute('data-label', item.getAttribute('data-label'))
    } else {
      this.label.removeAttribute('data-label')
    }
    if (trigger) {
      this.select.dispatchEvent(new Event('change'))
      this.close()
    }
  }
  update() {
    let option
    if (this.select.selectedIndex > -1) {
      const item =
        // @ts-expect-error Fix me later
        this.container.querySelector('.ql-picker-options').children[this.select.selectedIndex]
      option = this.select.options[this.select.selectedIndex]
      this.selectItem(item)
    } else {
      this.selectItem(null)
    }
    const isActive = option != null && option !== this.select.querySelector('option[selected]')
    this.label.classList.toggle('ql-active', isActive)
  }
}
class ColorPicker extends Picker {
  constructor(select, label) {
    super(select)
    this.label.innerHTML = label
    this.container.classList.add('ql-color-picker')
    Array.from(this.container.querySelectorAll('.ql-picker-item'))
      .slice(0, 7)
      .forEach((item) => {
        item.classList.add('ql-primary')
      })
  }
  buildItem(option) {
    const item = super.buildItem(option)
    item.style.backgroundColor = option.getAttribute('value') || ''
    return item
  }
  selectItem(item, trigger) {
    super.selectItem(item, trigger)
    const colorLabel = this.label.querySelector('.ql-color-label')
    const value = item ? item.getAttribute('data-value') || '' : ''
    if (colorLabel) {
      if (colorLabel.tagName === 'line') {
        colorLabel.style.stroke = value
      } else {
        colorLabel.style.fill = value
      }
    }
  }
}
class IconPicker extends Picker {
  constructor(select, icons) {
    super(select)
    this.container.classList.add('ql-icon-picker')
    Array.from(this.container.querySelectorAll('.ql-picker-item')).forEach((item) => {
      item.innerHTML = icons[item.getAttribute('data-value') || '']
    })
    this.defaultItem = this.container.querySelector('.ql-selected')
    this.selectItem(this.defaultItem)
  }
  selectItem(target, trigger) {
    super.selectItem(target, trigger)
    const item = target || this.defaultItem
    if (item != null) {
      if (this.label.innerHTML === item.innerHTML) return
      this.label.innerHTML = item.innerHTML
    }
  }
}
const isScrollable = (el) => {
  const { overflowY } = getComputedStyle(el, null)
  return overflowY !== 'visible' && overflowY !== 'clip'
}
class Tooltip {
  constructor(quill, boundsContainer) {
    this.quill = quill
    this.boundsContainer = boundsContainer || document.body
    this.root = quill.addContainer('ql-tooltip')
    this.root.innerHTML = this.constructor.TEMPLATE
    if (isScrollable(this.quill.root)) {
      this.quill.root.addEventListener('scroll', () => {
        this.root.style.marginTop = `${-1 * this.quill.root.scrollTop}px`
      })
    }
    this.hide()
  }
  hide() {
    this.root.classList.add('ql-hidden')
  }
  position(reference) {
    const left = reference.left + reference.width / 2 - this.root.offsetWidth / 2
    const top = reference.bottom + this.quill.root.scrollTop
    this.root.style.left = `${left}px`
    this.root.style.top = `${top}px`
    this.root.classList.remove('ql-flip')
    const containerBounds = this.boundsContainer.getBoundingClientRect()
    const rootBounds = this.root.getBoundingClientRect()
    let shift = 0
    if (rootBounds.right > containerBounds.right) {
      shift = containerBounds.right - rootBounds.right
      this.root.style.left = `${left + shift}px`
    }
    if (rootBounds.left < containerBounds.left) {
      shift = containerBounds.left - rootBounds.left
      this.root.style.left = `${left + shift}px`
    }
    if (rootBounds.bottom > containerBounds.bottom) {
      const height = rootBounds.bottom - rootBounds.top
      const verticalShift = reference.bottom - reference.top + height
      this.root.style.top = `${top - verticalShift}px`
      this.root.classList.add('ql-flip')
    }
    return shift
  }
  show() {
    this.root.classList.remove('ql-editing')
    this.root.classList.remove('ql-hidden')
  }
}
const ALIGNS = [false, 'center', 'right', 'justify']
const COLORS = [
  '#000000',
  '#e60000',
  '#ff9900',
  '#ffff00',
  '#008a00',
  '#0066cc',
  '#9933ff',
  '#ffffff',
  '#facccc',
  '#ffebcc',
  '#ffffcc',
  '#cce8cc',
  '#cce0f5',
  '#ebd6ff',
  '#bbbbbb',
  '#f06666',
  '#ffc266',
  '#ffff66',
  '#66b966',
  '#66a3e0',
  '#c285ff',
  '#888888',
  '#a10000',
  '#b26b00',
  '#b2b200',
  '#006100',
  '#0047b2',
  '#6b24b2',
  '#444444',
  '#5c0000',
  '#663d00',
  '#666600',
  '#003700',
  '#002966',
  '#3d1466'
]
const FONTS = [false, 'serif', 'monospace']
const HEADERS = ['1', '2', '3', false]
const SIZES = ['small', false, 'large', 'huge']
class BaseTheme extends Theme {
  constructor(quill, options2) {
    super(quill, options2)
    const listener = (e) => {
      if (!document.body.contains(quill.root)) {
        document.body.removeEventListener('click', listener)
        return
      }
      if (
        this.tooltip != null && // @ts-expect-error
        !this.tooltip.root.contains(e.target) && // @ts-expect-error
        document.activeElement !== this.tooltip.textbox &&
        !this.quill.hasFocus()
      ) {
        this.tooltip.hide()
      }
      if (this.pickers != null) {
        this.pickers.forEach((picker) => {
          if (!picker.container.contains(e.target)) {
            picker.close()
          }
        })
      }
    }
    quill.emitter.listenDOM('click', document.body, listener)
  }
  addModule(name) {
    const module = super.addModule(name)
    if (name === 'toolbar') {
      this.extendToolbar(module)
    }
    return module
  }
  buildButtons(buttons, icons) {
    Array.from(buttons).forEach((button) => {
      const className = button.getAttribute('class') || ''
      className.split(/\s+/).forEach((name) => {
        if (!name.startsWith('ql-')) return
        name = name.slice('ql-'.length)
        if (icons[name] == null) return
        if (name === 'direction') {
          button.innerHTML = icons[name][''] + icons[name].rtl
        } else if (typeof icons[name] === 'string') {
          button.innerHTML = icons[name]
        } else {
          const value = button.value || ''
          if (value != null && icons[name][value]) {
            button.innerHTML = icons[name][value]
          }
        }
      })
    })
  }
  buildPickers(selects, icons) {
    this.pickers = Array.from(selects).map((select) => {
      if (select.classList.contains('ql-align')) {
        if (select.querySelector('option') == null) {
          fillSelect(select, ALIGNS)
        }
        if (typeof icons.align === 'object') {
          return new IconPicker(select, icons.align)
        }
      }
      if (select.classList.contains('ql-background') || select.classList.contains('ql-color')) {
        const format = select.classList.contains('ql-background') ? 'background' : 'color'
        if (select.querySelector('option') == null) {
          fillSelect(select, COLORS, format === 'background' ? '#ffffff' : '#000000')
        }
        return new ColorPicker(select, icons[format])
      }
      if (select.querySelector('option') == null) {
        if (select.classList.contains('ql-font')) {
          fillSelect(select, FONTS)
        } else if (select.classList.contains('ql-header')) {
          fillSelect(select, HEADERS)
        } else if (select.classList.contains('ql-size')) {
          fillSelect(select, SIZES)
        }
      }
      return new Picker(select)
    })
    const update = () => {
      this.pickers.forEach((picker) => {
        picker.update()
      })
    }
    this.quill.on(Emitter.events.EDITOR_CHANGE, update)
  }
}
BaseTheme.DEFAULTS = merge({}, Theme.DEFAULTS, {
  modules: {
    toolbar: {
      handlers: {
        formula() {
          this.quill.theme.tooltip.edit('formula')
        },
        image() {
          let fileInput = this.container.querySelector('input.ql-image[type=file]')
          if (fileInput == null) {
            fileInput = document.createElement('input')
            fileInput.setAttribute('type', 'file')
            fileInput.setAttribute('accept', this.quill.uploader.options.mimetypes.join(', '))
            fileInput.classList.add('ql-image')
            fileInput.addEventListener('change', () => {
              const range = this.quill.getSelection(true)
              this.quill.uploader.upload(range, fileInput.files)
              fileInput.value = ''
            })
            this.container.appendChild(fileInput)
          }
          fileInput.click()
        },
        video() {
          this.quill.theme.tooltip.edit('video')
        }
      }
    }
  }
})
class BaseTooltip extends Tooltip {
  constructor(quill, boundsContainer) {
    super(quill, boundsContainer)
    this.textbox = this.root.querySelector('input[type="text"]')
    this.listen()
  }
  listen() {
    this.textbox.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        this.save()
        event.preventDefault()
      } else if (event.key === 'Escape') {
        this.cancel()
        event.preventDefault()
      }
    })
  }
  cancel() {
    this.hide()
    this.restoreFocus()
  }
  edit() {
    let mode = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 'link'
    let preview = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null
    this.root.classList.remove('ql-hidden')
    this.root.classList.add('ql-editing')
    if (this.textbox == null) return
    if (preview != null) {
      this.textbox.value = preview
    } else if (mode !== this.root.getAttribute('data-mode')) {
      this.textbox.value = ''
    }
    const bounds = this.quill.getBounds(this.quill.selection.savedRange)
    if (bounds != null) {
      this.position(bounds)
    }
    this.textbox.select()
    this.textbox.setAttribute('placeholder', this.textbox.getAttribute(`data-${mode}`) || '')
    this.root.setAttribute('data-mode', mode)
  }
  restoreFocus() {
    this.quill.focus({
      preventScroll: true
    })
  }
  save() {
    let { value } = this.textbox
    switch (this.root.getAttribute('data-mode')) {
      case 'link': {
        const { scrollTop } = this.quill.root
        if (this.linkRange) {
          this.quill.formatText(this.linkRange, 'link', value, Emitter.sources.USER)
          delete this.linkRange
        } else {
          this.restoreFocus()
          this.quill.format('link', value, Emitter.sources.USER)
        }
        this.quill.root.scrollTop = scrollTop
        break
      }
      case 'video': {
        value = extractVideoUrl(value)
      }
      // eslint-disable-next-line no-fallthrough
      case 'formula': {
        if (!value) break
        const range = this.quill.getSelection(true)
        if (range != null) {
          const index2 = range.index + range.length
          this.quill.insertEmbed(
            index2,
            // @ts-expect-error Fix me later
            this.root.getAttribute('data-mode'),
            value,
            Emitter.sources.USER
          )
          if (this.root.getAttribute('data-mode') === 'formula') {
            this.quill.insertText(index2 + 1, ' ', Emitter.sources.USER)
          }
          this.quill.setSelection(index2 + 2, Emitter.sources.USER)
        }
        break
      }
    }
    this.textbox.value = ''
    this.hide()
  }
}
function extractVideoUrl(url) {
  let match2 =
    url.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtube\.com\/watch.*v=([a-zA-Z0-9_-]+)/) ||
    url.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtu\.be\/([a-zA-Z0-9_-]+)/)
  if (match2) {
    return `${match2[1] || 'https'}://www.youtube.com/embed/${match2[2]}?showinfo=0`
  }
  if ((match2 = url.match(/^(?:(https?):\/\/)?(?:www\.)?vimeo\.com\/(\d+)/))) {
    return `${match2[1] || 'https'}://player.vimeo.com/video/${match2[2]}/`
  }
  return url
}
function fillSelect(select, values) {
  let defaultValue = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false
  values.forEach((value) => {
    const option = document.createElement('option')
    if (value === defaultValue) {
      option.setAttribute('selected', 'selected')
    } else {
      option.setAttribute('value', String(value))
    }
    select.appendChild(option)
  })
}
const TOOLBAR_CONFIG$1 = [
  ['bold', 'italic', 'link'],
  [
    {
      header: 1
    },
    {
      header: 2
    },
    'blockquote'
  ]
]
class BubbleTooltip extends BaseTooltip {
  static TEMPLATE = [
    '<span class="ql-tooltip-arrow"></span>',
    '<div class="ql-tooltip-editor">',
    '<input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL">',
    '<a class="ql-close"></a>',
    '</div>'
  ].join('')
  constructor(quill, bounds) {
    super(quill, bounds)
    this.quill.on(Emitter.events.EDITOR_CHANGE, (type, range, oldRange, source) => {
      if (type !== Emitter.events.SELECTION_CHANGE) return
      if (range != null && range.length > 0 && source === Emitter.sources.USER) {
        this.show()
        this.root.style.left = '0px'
        this.root.style.width = ''
        this.root.style.width = `${this.root.offsetWidth}px`
        const lines = this.quill.getLines(range.index, range.length)
        if (lines.length === 1) {
          const bounds2 = this.quill.getBounds(range)
          if (bounds2 != null) {
            this.position(bounds2)
          }
        } else {
          const lastLine = lines[lines.length - 1]
          const index2 = this.quill.getIndex(lastLine)
          const length = Math.min(lastLine.length() - 1, range.index + range.length - index2)
          const indexBounds = this.quill.getBounds(new Range(index2, length))
          if (indexBounds != null) {
            this.position(indexBounds)
          }
        }
      } else if (document.activeElement !== this.textbox && this.quill.hasFocus()) {
        this.hide()
      }
    })
  }
  listen() {
    super.listen()
    this.root.querySelector('.ql-close').addEventListener('click', () => {
      this.root.classList.remove('ql-editing')
    })
    this.quill.on(Emitter.events.SCROLL_OPTIMIZE, () => {
      setTimeout(() => {
        if (this.root.classList.contains('ql-hidden')) return
        const range = this.quill.getSelection()
        if (range != null) {
          const bounds = this.quill.getBounds(range)
          if (bounds != null) {
            this.position(bounds)
          }
        }
      }, 1)
    })
  }
  cancel() {
    this.show()
  }
  position(reference) {
    const shift = super.position(reference)
    const arrow = this.root.querySelector('.ql-tooltip-arrow')
    arrow.style.marginLeft = ''
    if (shift !== 0) {
      arrow.style.marginLeft = `${-1 * shift - arrow.offsetWidth / 2}px`
    }
    return shift
  }
}
class BubbleTheme extends BaseTheme {
  constructor(quill, options2) {
    if (options2.modules.toolbar != null && options2.modules.toolbar.container == null) {
      options2.modules.toolbar.container = TOOLBAR_CONFIG$1
    }
    super(quill, options2)
    this.quill.container.classList.add('ql-bubble')
  }
  extendToolbar(toolbar) {
    this.tooltip = new BubbleTooltip(this.quill, this.options.bounds)
    if (toolbar.container != null) {
      this.tooltip.root.appendChild(toolbar.container)
      this.buildButtons(toolbar.container.querySelectorAll('button'), Icons)
      this.buildPickers(toolbar.container.querySelectorAll('select'), Icons)
    }
  }
}
BubbleTheme.DEFAULTS = merge({}, BaseTheme.DEFAULTS, {
  modules: {
    toolbar: {
      handlers: {
        link(value) {
          if (!value) {
            this.quill.format('link', false, Quill.sources.USER)
          } else {
            this.quill.theme.tooltip.edit()
          }
        }
      }
    }
  }
})
const TOOLBAR_CONFIG = [
  [
    {
      header: ['1', '2', '3', false]
    }
  ],
  ['bold', 'italic', 'underline', 'link'],
  [
    {
      list: 'ordered'
    },
    {
      list: 'bullet'
    }
  ],
  ['clean']
]
class SnowTooltip extends BaseTooltip {
  static TEMPLATE = [
    '<a class="ql-preview" rel="noopener noreferrer" target="_blank" href="about:blank"></a>',
    '<input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL">',
    '<a class="ql-action"></a>',
    '<a class="ql-remove"></a>'
  ].join('')
  preview = this.root.querySelector('a.ql-preview')
  listen() {
    super.listen()
    this.root.querySelector('a.ql-action').addEventListener('click', (event) => {
      if (this.root.classList.contains('ql-editing')) {
        this.save()
      } else {
        this.edit('link', this.preview.textContent)
      }
      event.preventDefault()
    })
    this.root.querySelector('a.ql-remove').addEventListener('click', (event) => {
      if (this.linkRange != null) {
        const range = this.linkRange
        this.restoreFocus()
        this.quill.formatText(range, 'link', false, Emitter.sources.USER)
        delete this.linkRange
      }
      event.preventDefault()
      this.hide()
    })
    this.quill.on(Emitter.events.SELECTION_CHANGE, (range, oldRange, source) => {
      if (range == null) return
      if (range.length === 0 && source === Emitter.sources.USER) {
        const [link, offset] = this.quill.scroll.descendant(Link, range.index)
        if (link != null) {
          this.linkRange = new Range(range.index - offset, link.length())
          const preview = Link.formats(link.domNode)
          this.preview.textContent = preview
          this.preview.setAttribute('href', preview)
          this.show()
          const bounds = this.quill.getBounds(this.linkRange)
          if (bounds != null) {
            this.position(bounds)
          }
          return
        }
      } else {
        delete this.linkRange
      }
      this.hide()
    })
  }
  show() {
    super.show()
    this.root.removeAttribute('data-mode')
  }
}
class SnowTheme extends BaseTheme {
  constructor(quill, options2) {
    if (options2.modules.toolbar != null && options2.modules.toolbar.container == null) {
      options2.modules.toolbar.container = TOOLBAR_CONFIG
    }
    super(quill, options2)
    this.quill.container.classList.add('ql-snow')
  }
  extendToolbar(toolbar) {
    if (toolbar.container != null) {
      toolbar.container.classList.add('ql-snow')
      this.buildButtons(toolbar.container.querySelectorAll('button'), Icons)
      this.buildPickers(toolbar.container.querySelectorAll('select'), Icons)
      this.tooltip = new SnowTooltip(this.quill, this.options.bounds)
      if (toolbar.container.querySelector('.ql-link')) {
        this.quill.keyboard.addBinding(
          {
            key: 'k',
            shortKey: true
          },
          (_range, context) => {
            toolbar.handlers.link.call(toolbar, !context.format.link)
          }
        )
      }
    }
  }
}
SnowTheme.DEFAULTS = merge({}, BaseTheme.DEFAULTS, {
  modules: {
    toolbar: {
      handlers: {
        link(value) {
          if (value) {
            const range = this.quill.getSelection()
            if (range == null || range.length === 0) return
            let preview = this.quill.getText(range)
            if (/^\S+@\S+\.\S+$/.test(preview) && preview.indexOf('mailto:') !== 0) {
              preview = `mailto:${preview}`
            }
            const { tooltip } = this.quill.theme
            tooltip.edit('link', preview)
          } else {
            this.quill.format('link', false, Quill.sources.USER)
          }
        }
      }
    }
  }
})
Quill.register(
  {
    'attributors/attribute/direction': DirectionAttribute,
    'attributors/class/align': AlignClass,
    'attributors/class/background': BackgroundClass,
    'attributors/class/color': ColorClass,
    'attributors/class/direction': DirectionClass,
    'attributors/class/font': FontClass,
    'attributors/class/size': SizeClass,
    'attributors/style/align': AlignStyle,
    'attributors/style/background': BackgroundStyle,
    'attributors/style/color': ColorStyle,
    'attributors/style/direction': DirectionStyle,
    'attributors/style/font': FontStyle,
    'attributors/style/size': SizeStyle
  },
  true
)
Quill.register(
  {
    'formats/align': AlignClass,
    'formats/direction': DirectionClass,
    'formats/indent': IndentClass,
    'formats/background': BackgroundStyle,
    'formats/color': ColorStyle,
    'formats/font': FontClass,
    'formats/size': SizeClass,
    'formats/blockquote': Blockquote,
    'formats/code-block': CodeBlock,
    'formats/header': Header,
    'formats/list': ListItem,
    'formats/bold': Bold,
    'formats/code': Code,
    'formats/italic': Italic,
    'formats/link': Link,
    'formats/script': Script,
    'formats/strike': Strike,
    'formats/underline': Underline,
    'formats/formula': Formula,
    'formats/image': Image$1,
    'formats/video': Video,
    'modules/syntax': Syntax,
    'modules/table': Table,
    'modules/toolbar': Toolbar,
    'themes/bubble': BubbleTheme,
    'themes/snow': SnowTheme,
    'ui/icons': Icons,
    'ui/picker': Picker,
    'ui/icon-picker': IconPicker,
    'ui/color-picker': ColorPicker,
    'ui/tooltip': Tooltip
  },
  true
)
const Embed2 = Quill.import('blots/embed')
class MentionEvent extends Event {
  constructor(name, options2) {
    super(name, options2)
    this.value = {}
    this.event = new Event(name)
  }
}
function isMentionBlotData(data) {
  return (
    typeof data === 'object' &&
    data !== null &&
    'value' in data &&
    typeof data.value === 'string' &&
    'denotationChar' in data &&
    typeof data.denotationChar === 'string'
  )
}
class MentionBlot extends Embed2 {
  constructor(scroll, node) {
    super(scroll, node)
    this.mounted = false
  }
  static create(data) {
    const node = super.create()
    if (!isMentionBlotData(data) || node instanceof HTMLElement === false) {
      return node
    }
    const denotationChar = document.createElement('span')
    denotationChar.className = 'ql-mention-denotation-char'
    denotationChar.innerText = data.denotationChar
    node.appendChild(denotationChar)
    if (typeof this.render === 'function') {
      node.appendChild(this.render(data))
    } else {
      const mentionValue = document.createElement('span')
      mentionValue.className = 'ql-mention-value'
      mentionValue.innerText = data.value
      node.appendChild(mentionValue)
    }
    return MentionBlot.setDataValues(node, data)
  }
  static setDataValues(element, data) {
    const domNode = element
    Object.keys(data).forEach((key) => {
      domNode.dataset[key] = data[key]
    })
    return domNode
  }
  static value(domNode) {
    return domNode.dataset
  }
  attach() {
    super.attach()
    if (!this.mounted) {
      this.mounted = true
      this.clickHandler = this.getClickHandler()
      this.hoverHandler = this.getHoverHandler()
      this.domNode.addEventListener('click', this.clickHandler, false)
      this.domNode.addEventListener('mouseenter', this.hoverHandler, false)
    }
  }
  detach() {
    super.detach()
    this.mounted = false
    if (this.clickHandler) {
      this.domNode.removeEventListener('click', this.clickHandler)
      this.clickHandler = void 0
    }
  }
  getClickHandler() {
    return (e) => {
      const event = this.buildEvent('mention-clicked', e)
      window.dispatchEvent(event)
      e.preventDefault()
    }
  }
  getHoverHandler() {
    return (e) => {
      const event = this.buildEvent('mention-hovered', e)
      window.dispatchEvent(event)
      e.preventDefault()
    }
  }
  buildEvent(name, e) {
    const event = new MentionEvent(name, {
      bubbles: true,
      cancelable: true
    })
    event.value = Object.assign({}, this.domNode.dataset)
    event.event = e
    return event
  }
}
MentionBlot.blotName = 'mention'
MentionBlot.tagName = 'span'
MentionBlot.className = 'mention'
const Keys = {
  TAB: 'Tab',
  ENTER: 'Enter',
  ESCAPE: 'Escape',
  UP: 'ArrowUp',
  DOWN: 'ArrowDown'
}
function attachDataValues(element, data, dataAttributes) {
  const mention = element
  Object.keys(data).forEach((key) => {
    if (dataAttributes.indexOf(key) > -1) {
      mention.dataset[key] = data[key]
    } else {
      delete mention.dataset[key]
    }
  })
  return mention
}
function setInnerContent(element, value) {
  if (value === null) return
  if (typeof value === 'object') element.appendChild(value)
  else element.innerText = value
}
function getMentionCharIndex(text, mentionDenotationChars, isolateChar, allowInlineMentionChar) {
  return mentionDenotationChars.reduce(
    (prev, mentionChar) => {
      let mentionCharIndex
      if (isolateChar && allowInlineMentionChar) {
        const regex = new RegExp(`^${mentionChar}|\\s${mentionChar}`, 'g')
        const lastMatch = (text.match(regex) || []).pop()
        if (!lastMatch) {
          return {
            mentionChar: prev.mentionChar,
            mentionCharIndex: prev.mentionCharIndex
          }
        }
        mentionCharIndex =
          lastMatch !== mentionChar
            ? text.lastIndexOf(lastMatch) + lastMatch.length - mentionChar.length
            : 0
      } else {
        mentionCharIndex = text.lastIndexOf(mentionChar)
      }
      if (mentionCharIndex > prev.mentionCharIndex) {
        return {
          mentionChar,
          mentionCharIndex
        }
      }
      return {
        mentionChar: prev.mentionChar,
        mentionCharIndex: prev.mentionCharIndex
      }
    },
    { mentionChar: null, mentionCharIndex: -1 }
  )
}
function hasValidChars(text, allowedChars) {
  return allowedChars.test(text)
}
function hasValidMentionCharIndex(mentionCharIndex, text, isolateChar, textPrefix) {
  if (mentionCharIndex === -1) {
    return false
  }
  if (!isolateChar) {
    return true
  }
  const mentionPrefix = mentionCharIndex ? text[mentionCharIndex - 1] : textPrefix
  return !mentionPrefix || !!mentionPrefix.match(/\s/)
}
const Module2 = Quill.import('core/module')
class Mention extends Module2 {
  constructor(quill, options2) {
    super(quill, options2)
    this.isOpen = false
    this.itemIndex = 0
    this.values = []
    this.suspendMouseEnter = false
    if (Array.isArray(options2?.dataAttributes)) {
      this.options.dataAttributes = this.options.dataAttributes
        ? this.options.dataAttributes.concat(options2.dataAttributes)
        : options2.dataAttributes
    }
    for (let o in this.options) {
      const key = o
      const value = this.options[key]
      if (typeof value === 'function') {
        this.options[key] = value.bind(this)
      }
    }
    this.mentionContainer = document.createElement('div')
    this.mentionContainer.className = this.options.mentionContainerClass
      ? this.options.mentionContainerClass
      : ''
    this.mentionContainer.style.cssText = 'display: none; position: absolute;'
    this.mentionContainer.onmousemove = this.onContainerMouseMove.bind(this)
    if (this.options.fixMentionsToQuill) {
      this.mentionContainer.style.width = 'auto'
    }
    this.mentionList = document.createElement('ul')
    this.mentionList.id = 'quill-mention-list'
    quill.root.setAttribute('aria-owns', 'quill-mention-list')
    this.mentionList.className = this.options.mentionListClass ? this.options.mentionListClass : ''
    this.mentionContainer.appendChild(this.mentionList)
    quill.on('text-change', this.onTextChange.bind(this))
    quill.on('selection-change', this.onSelectionChange.bind(this))
    quill.container.addEventListener('paste', () => {
      setTimeout(() => {
        const range = quill.getSelection()
        this.onSelectionChange(range)
      })
    })
    quill.keyboard.addBinding(
      {
        key: Keys.TAB
      },
      this.selectHandler.bind(this)
    )
    quill.keyboard.bindings[Keys.TAB].unshift(quill.keyboard.bindings[Keys.TAB].pop())
    for (let selectKey of this.options.selectKeys ?? []) {
      quill.keyboard.addBinding(
        {
          key: selectKey
        },
        this.selectHandler.bind(this)
      )
    }
    quill.keyboard.bindings[Keys.ENTER].unshift(quill.keyboard.bindings[Keys.ENTER].pop())
    quill.keyboard.addBinding(
      {
        key: Keys.ESCAPE
      },
      this.escapeHandler.bind(this)
    )
    quill.keyboard.addBinding(
      {
        key: Keys.UP
      },
      this.upHandler.bind(this)
    )
    quill.keyboard.addBinding(
      {
        key: Keys.DOWN
      },
      this.downHandler.bind(this)
    )
  }
  selectHandler() {
    if (this.isOpen && !this.existingSourceExecutionToken) {
      this.selectItem()
      return false
    }
    return true
  }
  escapeHandler() {
    if (this.isOpen) {
      if (this.existingSourceExecutionToken) {
        this.existingSourceExecutionToken.abandoned = true
      }
      this.hideMentionList()
      return false
    }
    return true
  }
  upHandler() {
    if (this.isOpen && !this.existingSourceExecutionToken) {
      this.prevItem()
      return false
    }
    return true
  }
  downHandler() {
    if (this.isOpen && !this.existingSourceExecutionToken) {
      this.nextItem()
      return false
    }
    return true
  }
  showMentionList() {
    if (this.options.positioningStrategy === 'fixed') {
      document.body.appendChild(this.mentionContainer)
    } else {
      this.quill.container.appendChild(this.mentionContainer)
    }
    this.mentionContainer.style.visibility = 'hidden'
    this.mentionContainer.style.display = ''
    this.mentionContainer.scrollTop = 0
    this.setMentionContainerPosition()
    this.setIsOpen(true)
  }
  hideMentionList() {
    if (this.options.onBeforeClose) {
      this.options.onBeforeClose()
    }
    this.mentionContainer.style.display = 'none'
    this.mentionContainer.remove()
    this.setIsOpen(false)
    this.quill.root.removeAttribute('aria-activedescendant')
  }
  highlightItem(scrollItemInView = true) {
    for (let i = 0; i < this.mentionList.childNodes.length; i += 1) {
      const element = this.mentionList.childNodes[i]
      if (element instanceof HTMLElement) {
        element.classList.remove('selected')
      }
    }
    const elementAtItemIndex = this.mentionList.childNodes[this.itemIndex]
    if (this.itemIndex === -1 || elementAtItemIndex.dataset.disabled === 'true') {
      return
    }
    elementAtItemIndex.classList.add('selected')
    this.quill.root.setAttribute('aria-activedescendant', elementAtItemIndex.id)
    if (scrollItemInView) {
      const itemHeight = elementAtItemIndex.offsetHeight
      const itemPos = elementAtItemIndex.offsetTop
      const containerTop = this.mentionContainer.scrollTop
      const containerBottom = containerTop + this.mentionContainer.offsetHeight
      if (itemPos < containerTop) {
        this.mentionContainer.scrollTop = itemPos
      } else if (itemPos > containerBottom - itemHeight) {
        this.mentionContainer.scrollTop += itemPos - containerBottom + itemHeight
      }
    }
  }
  onContainerMouseMove() {
    this.suspendMouseEnter = false
  }
  selectItem() {
    if (this.itemIndex === -1) {
      return
    }
    const elementAtItemIndex = this.mentionList.childNodes[this.itemIndex]
    const data = elementAtItemIndex.dataset
    if (data.disabled) {
      return
    }
    this.options.onSelect?.(
      data,
      (asyncData, programmaticInsert = false, overriddenOptions = {}) => {
        return this.insertItem(asyncData, programmaticInsert, overriddenOptions)
      }
    )
    this.hideMentionList()
  }
  insertItem(data, programmaticInsert, overriddenOptions = {}) {
    const render = data
    if (render === null || this.mentionCharPos === void 0 || this.cursorPos === void 0) {
      return
    }
    const options2 = { ...this.options, ...overriddenOptions }
    if (!options2.showDenotationChar) {
      render.denotationChar = ''
    }
    let insertAtPos
    if (!programmaticInsert) {
      insertAtPos = this.mentionCharPos
      this.quill.deleteText(
        this.mentionCharPos,
        this.cursorPos - this.mentionCharPos,
        Quill.sources.USER
      )
    } else {
      insertAtPos = this.cursorPos
    }
    const delta = this.quill.insertEmbed(
      insertAtPos,
      options2.blotName ?? Mention.DEFAULTS.blotName,
      render,
      Quill.sources.USER
    )
    if (options2.spaceAfterInsert) {
      this.quill.insertText(insertAtPos + 1, ' ', Quill.sources.USER)
      this.quill.setSelection(insertAtPos + 2, Quill.sources.USER)
    } else {
      this.quill.setSelection(insertAtPos + 1, Quill.sources.USER)
    }
    this.hideMentionList()
    return delta
  }
  onItemMouseEnter(e) {
    if (this.suspendMouseEnter || e.target instanceof HTMLElement === false) {
      return
    }
    const index2 = Number(e.target?.dataset.index)
    if (!Number.isNaN(index2) && index2 !== this.itemIndex) {
      this.itemIndex = index2
      this.highlightItem(false)
    }
  }
  onDisabledItemMouseEnter() {
    if (this.suspendMouseEnter) {
      return
    }
    this.itemIndex = -1
    this.highlightItem(false)
  }
  onItemClick(e) {
    e.preventDefault()
    e.stopImmediatePropagation()
    if (e.currentTarget instanceof HTMLElement === false) {
      return
    }
    this.itemIndex = e.currentTarget?.dataset.index
      ? Number.parseInt(e.currentTarget.dataset.index)
      : -1
    this.highlightItem()
    this.selectItem()
  }
  onItemMouseDown(e) {
    e.preventDefault()
    e.stopImmediatePropagation()
  }
  renderLoading() {
    const renderedLoading = this.options.renderLoading?.() ?? void 0
    if (renderedLoading === void 0) {
      return
    }
    if (this.mentionContainer.getElementsByClassName('ql-mention-loading').length > 0) {
      this.showMentionList()
      return
    }
    this.mentionList.innerHTML = ''
    const loadingDiv = document.createElement('div')
    loadingDiv.className = 'ql-mention-loading'
    setInnerContent(loadingDiv, renderedLoading)
    this.mentionContainer.append(loadingDiv)
    this.showMentionList()
  }
  removeLoading() {
    const loadingDiv = this.mentionContainer.getElementsByClassName('ql-mention-loading')
    if (loadingDiv.length > 0) {
      loadingDiv[0].remove()
    }
  }
  renderList(mentionChar, data, searchTerm) {
    if (data && data.length > 0) {
      this.removeLoading()
      this.values = data
      this.mentionList.innerText = ''
      let initialSelection = -1
      for (let i = 0; i < data.length; i += 1) {
        const li = document.createElement('li')
        li.id = 'quill-mention-item-' + i
        li.className = this.options.listItemClass ? this.options.listItemClass : ''
        if (data[i].disabled) {
          li.className += ' disabled'
          li.setAttribute('aria-hidden', 'true')
        } else if (initialSelection === -1) {
          initialSelection = i
        }
        li.dataset.index = i.toString()
        const renderedItem = this.options.renderItem(data[i], searchTerm)
        setInnerContent(li, renderedItem)
        if (!data[i].disabled) {
          li.onmouseenter = this.onItemMouseEnter.bind(this)
          li.onmouseup = this.onItemClick.bind(this)
          li.onmousedown = this.onItemMouseDown.bind(this)
        } else {
          li.onmouseenter = this.onDisabledItemMouseEnter.bind(this)
        }
        li.dataset.denotationChar = mentionChar
        this.mentionList.appendChild(attachDataValues(li, data[i], this.options.dataAttributes))
      }
      this.itemIndex = initialSelection
      this.highlightItem()
      this.showMentionList()
    } else {
      this.hideMentionList()
    }
  }
  nextItem() {
    let increment = 0
    let newIndex
    let disabled
    do {
      increment++
      newIndex = (this.itemIndex + increment) % this.values.length
      disabled = this.mentionList.childNodes[newIndex].dataset.disabled === 'true'
      if (increment === this.values.length + 1) {
        newIndex = -1
        break
      }
    } while (disabled)
    this.itemIndex = newIndex
    this.suspendMouseEnter = true
    this.highlightItem()
  }
  prevItem() {
    let decrement = 0
    let newIndex
    let disabled
    do {
      decrement++
      newIndex = (this.itemIndex + this.values.length - decrement) % this.values.length
      disabled = this.mentionList.childNodes[newIndex].dataset.disabled === 'true'
      if (decrement === this.values.length + 1) {
        newIndex = -1
        break
      }
    } while (disabled)
    this.itemIndex = newIndex
    this.suspendMouseEnter = true
    this.highlightItem()
  }
  containerBottomIsNotVisible(topPos, containerPos) {
    const mentionContainerBottom = topPos + this.mentionContainer.offsetHeight + containerPos.top
    return mentionContainerBottom > window.scrollY + window.innerHeight
  }
  containerRightIsNotVisible(leftPos, containerPos) {
    if (this.options.fixMentionsToQuill) {
      return false
    }
    const rightPos = leftPos + this.mentionContainer.offsetWidth + containerPos.left
    const browserWidth = window.scrollX + document.documentElement.clientWidth
    return rightPos > browserWidth
  }
  setIsOpen(isOpen) {
    if (this.isOpen !== isOpen) {
      if (isOpen) {
        this.options.onOpen?.()
      } else {
        this.options.onClose?.()
      }
      this.isOpen = isOpen
    }
  }
  setMentionContainerPosition() {
    if (this.options.positioningStrategy === 'fixed') {
      this.setMentionContainerPosition_Fixed()
    } else {
      this.setMentionContainerPosition_Normal()
    }
  }
  setMentionContainerPosition_Normal() {
    if (this.mentionCharPos === void 0) {
      return
    }
    const containerPos = this.quill.container.getBoundingClientRect()
    const mentionCharPos = this.quill.getBounds(this.mentionCharPos)
    if (mentionCharPos === null) {
      return
    }
    const containerHeight = this.mentionContainer.offsetHeight
    let topPos = this.options.offsetTop
    let leftPos = this.options.offsetLeft
    if (this.options.fixMentionsToQuill) {
      const rightPos = 0
      this.mentionContainer.style.right = `${rightPos}px`
    } else {
      leftPos += mentionCharPos.left
    }
    if (this.containerRightIsNotVisible(leftPos, containerPos)) {
      const containerWidth = this.mentionContainer.offsetWidth + this.options.offsetLeft
      const quillWidth = containerPos.width
      leftPos = quillWidth - containerWidth
    }
    if (this.options.defaultMenuOrientation === 'top') {
      if (this.options.fixMentionsToQuill) {
        topPos = -1 * (containerHeight + this.options.offsetTop)
      } else {
        topPos = mentionCharPos.top - (containerHeight + this.options.offsetTop)
      }
      if (topPos + containerPos.top <= 0) {
        let overMentionCharPos = this.options.offsetTop
        if (this.options.fixMentionsToQuill) {
          overMentionCharPos += containerPos.height
        } else {
          overMentionCharPos += mentionCharPos.bottom
        }
        topPos = overMentionCharPos
      }
    } else {
      if (this.options.fixMentionsToQuill) {
        topPos += containerPos.height
      } else {
        topPos += mentionCharPos.bottom
      }
      if (this.containerBottomIsNotVisible(topPos, containerPos)) {
        let overMentionCharPos = this.options.offsetTop * -1
        if (!this.options.fixMentionsToQuill) {
          overMentionCharPos += mentionCharPos.top
        }
        topPos = overMentionCharPos - containerHeight
      }
    }
    if (topPos >= 0) {
      this.options.mentionContainerClass?.split(' ').forEach((className) => {
        this.mentionContainer.classList.add(`${className}-bottom`)
        this.mentionContainer.classList.remove(`${className}-top`)
      })
    } else {
      this.options.mentionContainerClass?.split(' ').forEach((className) => {
        this.mentionContainer.classList.add(`${className}-top`)
        this.mentionContainer.classList.remove(`${className}-bottom`)
      })
    }
    this.mentionContainer.style.top = `${topPos}px`
    this.mentionContainer.style.left = `${leftPos}px`
    this.mentionContainer.style.visibility = 'visible'
  }
  setMentionContainerPosition_Fixed() {
    if (this.mentionCharPos === void 0) {
      return
    }
    this.mentionContainer.style.position = 'fixed'
    this.mentionContainer.style.height = ''
    const containerPos = this.quill.container.getBoundingClientRect()
    const mentionCharPos = this.quill.getBounds(this.mentionCharPos)
    if (mentionCharPos === null) {
      return
    }
    const mentionCharPosAbsolute = {
      right: containerPos.right - mentionCharPos.right,
      left: containerPos.left + mentionCharPos.left,
      top: containerPos.top + mentionCharPos.top,
      height: mentionCharPos.height
    }
    const relativeToPos = this.options.fixMentionsToQuill ? containerPos : mentionCharPosAbsolute
    let topPos = this.options.offsetTop
    let leftPos = this.options.offsetLeft
    if (this.options.fixMentionsToQuill) {
      const rightPos = relativeToPos.right
      this.mentionContainer.style.right = `${rightPos}px`
    } else {
      leftPos += relativeToPos.left
      if (leftPos + this.mentionContainer.offsetWidth > document.documentElement.clientWidth) {
        leftPos -=
          leftPos + this.mentionContainer.offsetWidth - document.documentElement.clientWidth
      }
    }
    const availableSpaceTop = relativeToPos.top
    const availableSpaceBottom =
      document.documentElement.clientHeight - (relativeToPos.top + relativeToPos.height)
    const fitsBottom = this.mentionContainer.offsetHeight <= availableSpaceBottom
    const fitsTop = this.mentionContainer.offsetHeight <= availableSpaceTop
    let placement
    if (this.options.defaultMenuOrientation === 'top' && fitsTop) {
      placement = 'top'
    } else if (this.options.defaultMenuOrientation === 'bottom' && fitsBottom) {
      placement = 'bottom'
    } else {
      placement = availableSpaceBottom > availableSpaceTop ? 'bottom' : 'top'
    }
    if (placement === 'bottom') {
      topPos = relativeToPos.top + relativeToPos.height
      if (!fitsBottom) {
        this.mentionContainer.style.height = availableSpaceBottom - 3 + 'px'
      }
      this.options.mentionContainerClass?.split(' ').forEach((className) => {
        this.mentionContainer.classList.add(`${className}-bottom`)
        this.mentionContainer.classList.remove(`${className}-top`)
      })
    } else {
      topPos = relativeToPos.top - this.mentionContainer.offsetHeight
      if (!fitsTop) {
        this.mentionContainer.style.height = availableSpaceTop - 3 + 'px'
        topPos = 3
      }
      this.options.mentionContainerClass?.split(' ').forEach((className) => {
        this.mentionContainer.classList.add(`${className}-top`)
        this.mentionContainer.classList.remove(`${className}-bottom`)
      })
    }
    this.mentionContainer.style.top = `${topPos}px`
    this.mentionContainer.style.left = `${leftPos}px`
    this.mentionContainer.style.visibility = 'visible'
  }
  getTextBeforeCursor() {
    const startPos = Math.max(0, (this.cursorPos ?? 0) - this.options.maxChars)
    const textBeforeCursorPos = this.quill.getText(startPos, (this.cursorPos ?? 0) - startPos)
    return textBeforeCursorPos
  }
  onSomethingChange() {
    const range = this.quill.getSelection()
    if (range == null) return
    this.cursorPos = range.index
    const textBeforeCursor = this.getTextBeforeCursor()
    const textOffset = Math.max(0, this.cursorPos - this.options.maxChars)
    const textPrefix = textOffset ? this.quill.getText(textOffset - 1, textOffset) : ''
    const { mentionChar, mentionCharIndex } = getMentionCharIndex(
      textBeforeCursor,
      this.options.mentionDenotationChars,
      this.options.isolateCharacter,
      this.options.allowInlineMentionChar
    )
    if (
      mentionChar !== null &&
      hasValidMentionCharIndex(
        mentionCharIndex,
        textBeforeCursor,
        this.options.isolateCharacter,
        textPrefix
      )
    ) {
      const mentionCharPos = this.cursorPos - (textBeforeCursor.length - mentionCharIndex)
      this.mentionCharPos = mentionCharPos
      const textAfter = textBeforeCursor.substring(mentionCharIndex + mentionChar.length)
      if (
        textAfter.length >= this.options.minChars &&
        hasValidChars(textAfter, this.getAllowedCharsRegex(mentionChar))
      ) {
        if (this.existingSourceExecutionToken) {
          this.existingSourceExecutionToken.abandoned = true
        }
        this.renderLoading()
        const sourceRequestToken = {
          abandoned: false
        }
        this.existingSourceExecutionToken = sourceRequestToken
        this.options.source?.(
          textAfter,
          (data, searchTerm) => {
            if (sourceRequestToken.abandoned) {
              return
            }
            this.existingSourceExecutionToken = void 0
            this.renderList(mentionChar, data, searchTerm)
          },
          mentionChar
        )
      } else {
        if (this.existingSourceExecutionToken) {
          this.existingSourceExecutionToken.abandoned = true
        }
        this.hideMentionList()
      }
    } else {
      if (this.existingSourceExecutionToken) {
        this.existingSourceExecutionToken.abandoned = true
      }
      this.hideMentionList()
    }
  }
  getAllowedCharsRegex(denotationChar) {
    if (this.options.allowedChars instanceof RegExp) {
      return this.options.allowedChars
    } else {
      return this.options.allowedChars?.(denotationChar) ?? /^[a-zA-Z0-9_]*$/
    }
  }
  onTextChange(delta, oldContent, source) {
    if (source === 'user') {
      setTimeout(this.onSomethingChange.bind(this), 50)
    }
  }
  onSelectionChange(range) {
    if (range !== null && range.length === 0) {
      this.onSomethingChange()
    } else {
      this.hideMentionList()
    }
  }
  openMenu(denotationChar) {
    const selection = this.quill.getSelection(true)
    this.quill.insertText(selection.index, denotationChar)
    this.quill.blur()
    this.quill.focus()
  }
}
Mention.DEFAULTS = {
  mentionDenotationChars: ['@'],
  showDenotationChar: true,
  allowedChars: /^[a-zA-Z0-9_]*$/,
  minChars: 0,
  maxChars: 31,
  offsetTop: 2,
  offsetLeft: 0,
  isolateCharacter: false,
  allowInlineMentionChar: false,
  fixMentionsToQuill: false,
  positioningStrategy: 'normal',
  defaultMenuOrientation: 'bottom',
  blotName: 'mention',
  dataAttributes: ['id', 'value', 'denotationChar', 'link', 'target', 'disabled'],
  linkTarget: '_blank',
  listItemClass: 'ql-mention-list-item',
  mentionContainerClass: 'ql-mention-list-container',
  mentionListClass: 'ql-mention-list',
  spaceAfterInsert: true,
  selectKeys: [Keys.ENTER],
  source: (searchTerm, renderList2, mentionChar) => {
    renderList2([], searchTerm)
  },
  renderItem: ({ value }) => `${value}`,
  onSelect: (item, insertItem) => insertItem(item),
  onOpen: () => true,
  onBeforeClose: () => true,
  onClose: () => true,
  renderLoading: () => null
}
const defaultOptions = {
  theme: 'snow',
  boundary: document.body,
  modules: {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ header: 1 }, { header: 2 }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ direction: 'rtl' }],
      [{ size: ['small', false, 'large', 'huge'] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
      ['clean'],
      ['link', 'image', 'video']
    ]
  },
  // placeholder: 'Insert content here ...',
  readOnly: false
}
const mergeOptions = (def, custom) => {
  for (const key in custom) {
    if (!def[key] || key !== 'modules') {
      def[key] = custom[key]
    } else {
      mergeOptions(def[key], custom[key])
    }
  }
  return def
}
const { EmbedBlot: EmbedBlot2 } = Quill.import('parchment')
class EmojiBlot extends EmbedBlot2 {
  static blotName = 'emoji'
  static tagName = 'img'
  static className = 'ed-emoji'
  static create(value) {
    const node = super.create()
    node.setAttribute('alt', value.alt)
    node.setAttribute('src', value.src)
    node.setAttribute('width', value.width.toString())
    node.setAttribute('height', value.height.toString())
    return node
  }
  static formats(node) {
    return {
      alt: node.getAttribute('alt'),
      src: node.getAttribute('src'),
      width: node.getAttribute('width'),
      height: node.getAttribute('height')
    }
  }
  static value(node) {
    return {
      alt: node.getAttribute('alt'),
      src: node.getAttribute('src'),
      width: node.getAttribute('width'),
      height: node.getAttribute('height')
    }
  }
}
const BlockEmbed2 = Quill.import('blots/block/embed')
class QuoteBlot extends BlockEmbed2 {
  static blotName = 'quote'
  static tagName = 'div'
  static className = 'quote-card'
  static create(value) {
    const node = super.create(value)
    const { id, title, describe, image } = value
    node.dataset.id = id
    node.dataset.title = title
    node.dataset.describe = describe
    node.dataset.image = image
    node.setAttribute('contenteditable', 'false')
    const quoteCardContent = document.createElement('span')
    quoteCardContent.classList.add('quote-card-content')
    const close = document.createElement('span')
    close.classList.add('quote-card-remove')
    close.textContent = '×'
    close.addEventListener('click', () => {
      node.remove()
    })
    const quoteCardTitle = document.createElement('span')
    quoteCardTitle.classList.add('quote-card-title')
    quoteCardTitle.textContent = title
    quoteCardTitle.appendChild(close)
    quoteCardContent.appendChild(quoteCardTitle)
    if (!image) {
      const quoteCardMeta = document.createElement('span')
      quoteCardMeta.classList.add('quote-card-meta')
      quoteCardMeta.textContent = describe
      quoteCardContent.appendChild(quoteCardMeta)
    } else {
      const iconImg = document.createElement('img')
      iconImg.setAttribute('src', image)
      iconImg.setAttribute('style', 'width:30px;height:30px;margin-right:10px;')
      quoteCardContent.appendChild(iconImg)
    }
    node.ondblclick = () => {
      console.log('quote card ondblclick')
    }
    node.appendChild(quoteCardContent)
    return node
  }
  static value(node) {
    return {
      id: node.dataset.id,
      title: node.dataset.title,
      describe: node.dataset.describe,
      image: node.dataset.image
    }
  }
}
const _hoisted_1$k = { class: 'quill-editor' }
const _sfc_main$l = /* @__PURE__ */ defineComponent({
  __name: 'QuillEditor',
  props: /* @__PURE__ */ mergeModels(
    {
      options: {
        type: Object,
        required: false,
        default: () => ({})
      }
    },
    {
      modelValue: {},
      modelModifiers: {}
    }
  ),
  emits: /* @__PURE__ */ mergeModels(['ready', 'change', 'blur', 'focus'], ['update:modelValue']),
  setup(__props, { expose: __expose, emit: __emit }) {
    Quill.register({ 'blots/mention': MentionBlot, 'modules/mention': Mention })
    Quill.register('formats/emoji', EmojiBlot)
    Quill.register('formats/quote', QuoteBlot)
    __expose({
      getQuill
    })
    const emit = __emit
    const model = useModel(__props, 'modelValue')
    const editor = ref(null)
    let quill = null
    function getQuill() {
      return quill
    }
    const initialize = () => {
      if (!editor.value) return
      quill = new Quill(editor.value, mergeOptions(defaultOptions, __props.options))
      quill.on('selection-change', (range) => {
        emit(!range ? 'blur' : 'focus', quill)
      })
      quill.on('text-change', () => {
        if (!editor.value) return
        let text = quill?.getText().replace(/\n+$/, '')
        let html = editor.value?.children[0].innerHTML
        if (html === '<p><br></p>') html = ''
        model.value = html
        emit('change', { html, text, quill })
      })
      emit('ready', quill)
    }
    onMounted(() => {
      initialize()
    })
    onUnmounted(() => {
      quill = null
    })
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock('section', _hoisted_1$k, [
          createBaseVNode(
            'section',
            {
              ref_key: 'editor',
              ref: editor
            },
            null,
            512
          )
        ])
      )
    }
  }
})
const Delta = Quill.import('delta')
Quill.debug('error')
const _hoisted_1$j = { class: 'options' }
const _hoisted_2$f = { style: { color: '#ccc' } }
const _hoisted_3$d = ['onClick']
const _hoisted_4$a = { style: { width: '100%', 'text-align': 'right' } }
const _sfc_main$k = /* @__PURE__ */ defineComponent({
  __name: 'MeEditorVote',
  emits: ['close', 'submit'],
  setup(__props, { emit: __emit }) {
    const emit = __emit
    const isShow = ref(true)
    const model = reactive({
      mode: 0,
      anonymous: 0,
      title: '',
      options: [{ value: '' }, { value: '' }, { value: '' }]
    })
    const onMaskClick = () => {
      emit('close')
    }
    const onSubmit = () => {
      let data = {
        title: model.title,
        mode: model.mode,
        is_anonymous: model.anonymous,
        options: model.options.map((item) => item.value)
      }
      emit('submit', data)
    }
    const addOption = () => {
      model.options.push({ value: '' })
    }
    const delOption = (index2) => {
      model.options.length > 2 && model.options.splice(index2, 1)
    }
    const isCanSubmit = computed(() => {
      return (
        model.title.trim().length == 0 ||
        model.options.some((item) => item.value.trim().length === 0)
      )
    })
    return (_ctx, _cache) => {
      const _component_n_radio = __unplugin_components_0$1
      const _component_n_space = __unplugin_components_1
      const _component_n_radio_group = __unplugin_components_2
      const _component_n_form_item = __unplugin_components_3$2
      const _component_n_input = __unplugin_components_1$1
      const _component_n_icon = NIcon
      const _component_n_button = Button
      const _component_n_form = __unplugin_components_7
      const _component_n_modal = __unplugin_components_3$1
      return (
        openBlock(),
        createBlock(
          _component_n_modal,
          {
            show: isShow.value,
            'onUpdate:show': _cache[4] || (_cache[4] = ($event) => (isShow.value = $event)),
            preset: 'card',
            title: '发起投票',
            class: 'modal-radius',
            style: { maxWidth: '450px' },
            'on-after-leave': onMaskClick
          },
          {
            footer: withCtx(() => [
              createBaseVNode('div', _hoisted_4$a, [
                createVNode(
                  _component_n_button,
                  {
                    type: 'tertiary',
                    onClick: _cache[3] || (_cache[3] = ($event) => (isShow.value = false))
                  },
                  {
                    default: withCtx(
                      () => _cache[10] || (_cache[10] = [createTextVNode(' 取消 ', -1)])
                    ),
                    _: 1,
                    __: [10]
                  }
                ),
                createVNode(
                  _component_n_button,
                  {
                    type: 'primary',
                    'text-color': '#ffffff',
                    onClick: onSubmit,
                    class: 'mt-l15',
                    disabled: isCanSubmit.value
                  },
                  {
                    default: withCtx(
                      () => _cache[11] || (_cache[11] = [createTextVNode(' 发起投票 ', -1)])
                    ),
                    _: 1,
                    __: [11]
                  },
                  8,
                  ['disabled']
                )
              ])
            ]),
            default: withCtx(() => [
              createVNode(_component_n_form, null, {
                default: withCtx(() => [
                  createVNode(
                    _component_n_form_item,
                    {
                      label: '投票方式',
                      required: true
                    },
                    {
                      default: withCtx(() => [
                        createVNode(
                          _component_n_radio_group,
                          {
                            value: model.anonymous,
                            'onUpdate:value':
                              _cache[0] || (_cache[0] = ($event) => (model.anonymous = $event))
                          },
                          {
                            default: withCtx(() => [
                              createVNode(_component_n_space, null, {
                                default: withCtx(() => [
                                  createVNode(
                                    _component_n_radio,
                                    { value: 1 },
                                    {
                                      default: withCtx(
                                        () =>
                                          _cache[5] ||
                                          (_cache[5] = [createTextVNode(' 公开投票 ', -1)])
                                      ),
                                      _: 1,
                                      __: [5]
                                    }
                                  ),
                                  createVNode(
                                    _component_n_radio,
                                    { value: 2 },
                                    {
                                      default: withCtx(
                                        () =>
                                          _cache[6] ||
                                          (_cache[6] = [createTextVNode(' 匿名投票 ', -1)])
                                      ),
                                      _: 1,
                                      __: [6]
                                    }
                                  )
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          },
                          8,
                          ['value']
                        )
                      ]),
                      _: 1
                    }
                  ),
                  createVNode(
                    _component_n_form_item,
                    {
                      label: '选择方式',
                      required: true
                    },
                    {
                      default: withCtx(() => [
                        createVNode(
                          _component_n_radio_group,
                          {
                            value: model.mode,
                            'onUpdate:value':
                              _cache[1] || (_cache[1] = ($event) => (model.mode = $event))
                          },
                          {
                            default: withCtx(() => [
                              createVNode(_component_n_space, null, {
                                default: withCtx(() => [
                                  createVNode(
                                    _component_n_radio,
                                    { value: 1 },
                                    {
                                      default: withCtx(
                                        () =>
                                          _cache[7] || (_cache[7] = [createTextVNode(' 单选 ', -1)])
                                      ),
                                      _: 1,
                                      __: [7]
                                    }
                                  ),
                                  createVNode(
                                    _component_n_radio,
                                    { value: 2 },
                                    {
                                      default: withCtx(
                                        () =>
                                          _cache[8] || (_cache[8] = [createTextVNode(' 多选 ', -1)])
                                      ),
                                      _: 1,
                                      __: [8]
                                    }
                                  )
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          },
                          8,
                          ['value']
                        )
                      ]),
                      _: 1
                    }
                  ),
                  createVNode(
                    _component_n_form_item,
                    {
                      label: '投票主题',
                      required: true
                    },
                    {
                      default: withCtx(() => [
                        createVNode(
                          _component_n_input,
                          {
                            placeholder: '请输入投票主题，最多50字',
                            value: model.title,
                            'onUpdate:value':
                              _cache[2] || (_cache[2] = ($event) => (model.title = $event))
                          },
                          null,
                          8,
                          ['value']
                        )
                      ]),
                      _: 1
                    }
                  ),
                  createVNode(
                    _component_n_form_item,
                    {
                      label: '投票选项',
                      required: true
                    },
                    {
                      default: withCtx(() => [
                        createBaseVNode('div', _hoisted_1$j, [
                          (openBlock(true),
                          createElementBlock(
                            Fragment,
                            null,
                            renderList(model.options, (option, i) => {
                              return (
                                openBlock(),
                                createElementBlock(
                                  'div',
                                  {
                                    key: i,
                                    class: 'option'
                                  },
                                  [
                                    createVNode(
                                      _component_n_input,
                                      {
                                        placeholder: ' 请输入选项内容',
                                        value: option.value,
                                        'onUpdate:value': ($event) => (option.value = $event)
                                      },
                                      {
                                        prefix: withCtx(() => [
                                          createBaseVNode(
                                            'span',
                                            _hoisted_2$f,
                                            toDisplayString(String.fromCharCode(65 + i)) + '. ',
                                            1
                                          )
                                        ]),
                                        _: 2
                                      },
                                      1032,
                                      ['value', 'onUpdate:value']
                                    ),
                                    createBaseVNode(
                                      'div',
                                      {
                                        class: 'btn flex-center pointer',
                                        onClick: ($event) => delOption(i)
                                      },
                                      [
                                        createVNode(
                                          _component_n_icon,
                                          {
                                            size: '16',
                                            component: unref(IconDelete)
                                          },
                                          null,
                                          8,
                                          ['component']
                                        )
                                      ],
                                      8,
                                      _hoisted_3$d
                                    )
                                  ]
                                )
                              )
                            }),
                            128
                          )),
                          model.options.length < 6
                            ? (openBlock(),
                              createBlock(
                                _component_n_button,
                                {
                                  key: 0,
                                  text: '',
                                  type: 'primary',
                                  onClick: addOption
                                },
                                {
                                  default: withCtx(
                                    () =>
                                      _cache[9] || (_cache[9] = [createTextVNode(' 添加选项 ', -1)])
                                  ),
                                  _: 1,
                                  __: [9]
                                }
                              ))
                            : createCommentVNode('', true)
                        ])
                      ]),
                      _: 1
                    }
                  )
                ]),
                _: 1
              })
            ]),
            _: 1
          },
          8,
          ['show']
        )
      )
    }
  }
})
const MeEditorVote = /* @__PURE__ */ _export_sfc(_sfc_main$k, [['__scopeId', 'data-v-30c44b58']])
const _hoisted_1$i = {
  enctype: 'multipart/form-data',
  style: { display: 'none' }
}
const _hoisted_2$e = { class: 'el-container is-vertical section height100' }
const _hoisted_3$c = { class: 'el-header em-header border-bottom' }
const _hoisted_4$9 = { class: 'el-main em-main me-scrollbar me-scrollbar-thumb' }
const _hoisted_5$7 = {
  key: 0,
  class: 'symbol-box'
}
const _hoisted_6$6 = { class: 'options' }
const _hoisted_7$5 = ['innerHTML', 'onClick']
const _hoisted_8$3 = {
  key: 1,
  class: 'collect-box'
}
const _hoisted_9$3 = ['src', 'onClick']
const _hoisted_10$2 = ['onClick']
const _hoisted_11$1 = { class: 'el-footer em-footer tabs' }
const _hoisted_12$1 = ['onClick']
const _hoisted_13$1 = { class: 'tip' }
const _hoisted_14$1 = ['src']
const _sfc_main$j = /* @__PURE__ */ defineComponent({
  __name: 'MeEditorEmoticon',
  emits: ['on-select'],
  setup(__props, { emit: __emit }) {
    const emit = __emit
    const editorStore = useEditorStore()
    const fileImageRef = ref()
    const tabIndex = ref(0)
    const items = computed(() => editorStore.emoticon.items)
    const onTriggerUpload = () => {
      fileImageRef.value.click()
    }
    const onUpload = (e) => {
      let file = e.target.files[0]
      editorStore.uploadUserEmoticon(file)
    }
    const onDelete = (index2, emoticon_id) => {
      editorStore.removeUserEmoticon({ index: index2, emoticon_id })
    }
    const onTabs = (index2) => {
      tabIndex.value = index2
    }
    const onSendEmoticon = (type, value, img = '') => {
      if (img) {
        const imgSrcReg = /<img.*?src='(.*?)'/g
        let match2 = imgSrcReg.exec(img)
        if (match2) {
          emit('on-select', { type, value, img: match2[1] })
        }
      } else {
        emit('on-select', { type, value, img })
      }
    }
    return (_ctx, _cache) => {
      const _component_n_icon = NIcon
      return (
        openBlock(),
        createElementBlock(
          Fragment,
          null,
          [
            createBaseVNode('form', _hoisted_1$i, [
              createBaseVNode(
                'input',
                {
                  type: 'file',
                  ref_key: 'fileImageRef',
                  ref: fileImageRef,
                  accept: 'image/*',
                  onChange: onUpload
                },
                null,
                544
              )
            ]),
            createBaseVNode('section', _hoisted_2$e, [
              createBaseVNode('header', _hoisted_3$c, [
                createBaseVNode('span', null, toDisplayString(items.value[tabIndex.value].name), 1)
              ]),
              createBaseVNode('main', _hoisted_4$9, [
                tabIndex.value == 0
                  ? (openBlock(),
                    createElementBlock('div', _hoisted_5$7, [
                      createBaseVNode('div', _hoisted_6$6, [
                        (openBlock(true),
                        createElementBlock(
                          Fragment,
                          null,
                          renderList(unref(emojis), (img, key) => {
                            return (
                              openBlock(),
                              createElementBlock(
                                'div',
                                {
                                  innerHTML: img,
                                  key,
                                  onClick: ($event) => onSendEmoticon(1, key, img),
                                  class: 'option pointer flex-center'
                                },
                                null,
                                8,
                                _hoisted_7$5
                              )
                            )
                          }),
                          128
                        ))
                      ])
                    ]))
                  : (openBlock(),
                    createElementBlock('div', _hoisted_8$3, [
                      tabIndex.value == 1
                        ? (openBlock(),
                          createElementBlock(
                            'div',
                            {
                              key: 0,
                              class: 'item pointer upload-btn',
                              onClick: onTriggerUpload
                            },
                            [
                              createVNode(
                                _component_n_icon,
                                {
                                  size: '28',
                                  class: 'icon',
                                  component: unref(UploadOne)
                                },
                                null,
                                8,
                                ['component']
                              ),
                              _cache[0] || (_cache[0] = createBaseVNode('span', null, '自定义', -1))
                            ]
                          ))
                        : createCommentVNode('', true),
                      (openBlock(true),
                      createElementBlock(
                        Fragment,
                        null,
                        renderList(items.value[tabIndex.value].children, (item, index2) => {
                          return (
                            openBlock(),
                            createElementBlock(
                              'div',
                              {
                                class: 'item pointer',
                                key: index2
                              },
                              [
                                createBaseVNode(
                                  'img',
                                  {
                                    src: item.url,
                                    onClick: ($event) => onSendEmoticon(2, item.emoticon_id)
                                  },
                                  null,
                                  8,
                                  _hoisted_9$3
                                ),
                                tabIndex.value == 1
                                  ? (openBlock(),
                                    createElementBlock(
                                      'div',
                                      {
                                        key: 0,
                                        class: 'mask',
                                        onClick: ($event) => onDelete(index2, item.emoticon_id)
                                      },
                                      [
                                        createVNode(
                                          _component_n_icon,
                                          {
                                            size: '18',
                                            color: '#ff5722',
                                            class: 'icon',
                                            component: unref(IconDelete)
                                          },
                                          null,
                                          8,
                                          ['component']
                                        )
                                      ],
                                      8,
                                      _hoisted_10$2
                                    ))
                                  : createCommentVNode('', true)
                              ]
                            )
                          )
                        }),
                        128
                      ))
                    ]))
              ]),
              createBaseVNode('footer', _hoisted_11$1, [
                (openBlock(true),
                createElementBlock(
                  Fragment,
                  null,
                  renderList(items.value, (item, index2) => {
                    return (
                      openBlock(),
                      createElementBlock(
                        'div',
                        {
                          class: normalizeClass([
                            'tab pointer',
                            { active: index2 == tabIndex.value }
                          ]),
                          key: index2,
                          onClick: ($event) => onTabs(index2)
                        },
                        [
                          createBaseVNode('p', _hoisted_13$1, toDisplayString(item.name), 1),
                          createBaseVNode(
                            'img',
                            {
                              width: '20',
                              height: '20',
                              src: item.icon
                            },
                            null,
                            8,
                            _hoisted_14$1
                          )
                        ],
                        10,
                        _hoisted_12$1
                      )
                    )
                  }),
                  128
                ))
              ])
            ])
          ],
          64
        )
      )
    }
  }
})
const MeEditorEmoticon = /* @__PURE__ */ _export_sfc(_sfc_main$j, [
  ['__scopeId', 'data-v-669859c3']
])
const options = [
  {
    label: 'PHP',
    value: 'php'
  },
  {
    label: 'Java',
    value: 'java'
  },
  {
    label: 'Python',
    value: 'python'
  },
  {
    label: 'Golang',
    value: 'go'
  },
  {
    label: 'JavaScript',
    value: 'javascript'
  },
  {
    label: 'TypeScript',
    value: 'typescript'
  },
  {
    label: 'Json',
    value: 'json'
  },
  {
    label: 'Sql',
    value: 'sql'
  },
  {
    label: 'Rust',
    value: 'rust'
  },
  {
    label: 'Markdown',
    value: 'markdown'
  },
  {
    label: 'Nginx',
    value: 'nginx'
  },
  {
    label: 'Yaml',
    value: 'yaml'
  },
  {
    label: 'Protobuf',
    value: 'protobuf'
  },
  {
    label: 'Shell',
    value: 'shell'
  },
  {
    label: 'Makefile',
    value: 'makefile'
  },
  {
    label: 'Ini',
    value: 'ini'
  }
]
const _hoisted_1$h = { class: 'popselect' }
const _hoisted_2$d = { class: 'footer' }
const _sfc_main$i = /* @__PURE__ */ defineComponent({
  __name: 'MeEditorCode',
  emits: ['close', 'on-submit'],
  setup(__props, { emit: __emit }) {
    const emit = __emit
    const isShowBox = ref(true)
    const model = reactive({
      lang: '',
      code: ''
    })
    const langText = computed(() => {
      let data = options.find((item) => {
        return item.value == model.lang
      })
      return data ? data.label : '请选择'
    })
    const isCanSubmit = computed(() => {
      return !(model.lang && model.code)
    })
    const onMaskClick = () => {
      emit('close')
    }
    const onSubmit = () => {
      let data = {
        lang: model.lang,
        code: model.code
      }
      if (model.lang == 'json') {
        try {
          data.code = JSON.stringify(JSON.parse(model.code), null, 2)
        } catch (error) {
          data.code = model.code
        }
      }
      emit('on-submit', data)
    }
    return (_ctx, _cache) => {
      const _component_n_button = Button
      const _component_n_popselect = __unplugin_components_2$1
      const _component_n_input = __unplugin_components_1$1
      const _component_n_modal = __unplugin_components_3$1
      return (
        openBlock(),
        createBlock(
          _component_n_modal,
          {
            show: isShowBox.value,
            'onUpdate:show': _cache[3] || (_cache[3] = ($event) => (isShowBox.value = $event)),
            preset: 'card',
            title: '代码消息',
            class: 'modal-radius',
            style: { 'max-width': '600px', height: '400px' },
            'on-after-leave': onMaskClick,
            'mask-closable': false
          },
          {
            footer: withCtx(() => [
              createBaseVNode('div', _hoisted_2$d, [
                createBaseVNode('div', null, [
                  createVNode(
                    _component_n_button,
                    {
                      type: 'tertiary',
                      onClick: _cache[2] || (_cache[2] = ($event) => (isShowBox.value = false))
                    },
                    {
                      default: withCtx(
                        () => _cache[5] || (_cache[5] = [createTextVNode(' 取消 ', -1)])
                      ),
                      _: 1,
                      __: [5]
                    }
                  ),
                  createVNode(
                    _component_n_button,
                    {
                      type: 'primary',
                      'text-color': '#ffffff',
                      class: 'mt-l15',
                      onClick: onSubmit,
                      disabled: isCanSubmit.value
                    },
                    {
                      default: withCtx(
                        () => _cache[6] || (_cache[6] = [createTextVNode(' 发送 ', -1)])
                      ),
                      _: 1,
                      __: [6]
                    },
                    8,
                    ['disabled']
                  )
                ])
              ])
            ]),
            default: withCtx(() => [
              createBaseVNode('div', null, [
                createBaseVNode('div', _hoisted_1$h, [
                  _cache[4] || (_cache[4] = createBaseVNode('span', null, '代码语言:', -1)),
                  createVNode(
                    _component_n_popselect,
                    {
                      value: model.lang,
                      'onUpdate:value':
                        _cache[0] || (_cache[0] = ($event) => (model.lang = $event)),
                      options: unref(options),
                      size: 'medium',
                      scrollable: ''
                    },
                    {
                      default: withCtx(() => [
                        createVNode(
                          _component_n_button,
                          {
                            text: '',
                            type: 'primary'
                          },
                          {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(langText.value), 1)
                            ]),
                            _: 1
                          }
                        )
                      ]),
                      _: 1
                    },
                    8,
                    ['value', 'options']
                  )
                ]),
                createVNode(
                  _component_n_input,
                  {
                    type: 'textarea',
                    maxlength: 65535,
                    'show-count': '',
                    autosize: {
                      minRows: 9,
                      maxRows: 9
                    },
                    value: model.code,
                    'onUpdate:value': _cache[1] || (_cache[1] = ($event) => (model.code = $event))
                  },
                  {
                    count: withCtx(({ value }) => [
                      createTextVNode(toDisplayString(value.length), 1)
                    ]),
                    _: 1
                  },
                  8,
                  ['value']
                )
              ])
            ]),
            _: 1
          },
          8,
          ['show']
        )
      )
    }
  }
})
const MeEditorCode = /* @__PURE__ */ _export_sfc(_sfc_main$i, [['__scopeId', 'data-v-73960ab3']])
var recorder$1 = { exports: {} }
/*!
 *
 * js-audio-recorder - js audio recorder plugin
 *
 * @version v1.0.7
 * @homepage https://github.com/2fps/recorder
 * @author 2fps <echoweb@126.com> (https://www.zhuyuntao.cn)
 * @license MIT
 *
 */
var recorder = recorder$1.exports
var hasRequiredRecorder
function requireRecorder() {
  if (hasRequiredRecorder) return recorder$1.exports
  hasRequiredRecorder = 1
  ;(function (module, exports) {
    !(function (t, e) {
      module.exports = e()
    })(recorder, function () {
      return (function (t) {
        var e = {}
        function n(i) {
          if (e[i]) return e[i].exports
          var o = (e[i] = { i, l: false, exports: {} })
          return (t[i].call(o.exports, o, o.exports, n), (o.l = true), o.exports)
        }
        return (
          (n.m = t),
          (n.c = e),
          (n.d = function (t2, e2, i) {
            n.o(t2, e2) || Object.defineProperty(t2, e2, { enumerable: true, get: i })
          }),
          (n.r = function (t2) {
            ;('undefined' != typeof Symbol &&
              Symbol.toStringTag &&
              Object.defineProperty(t2, Symbol.toStringTag, { value: 'Module' }),
              Object.defineProperty(t2, '__esModule', { value: true }))
          }),
          (n.t = function (t2, e2) {
            if ((1 & e2 && (t2 = n(t2)), 8 & e2)) return t2
            if (4 & e2 && 'object' == typeof t2 && t2 && t2.__esModule) return t2
            var i = /* @__PURE__ */ Object.create(null)
            if (
              (n.r(i),
              Object.defineProperty(i, 'default', { enumerable: true, value: t2 }),
              2 & e2 && 'string' != typeof t2)
            )
              for (var o in t2)
                n.d(
                  i,
                  o,
                  function (e3) {
                    return t2[e3]
                  }.bind(null, o)
                )
            return i
          }),
          (n.n = function (t2) {
            var e2 =
              t2 && t2.__esModule
                ? function () {
                    return t2.default
                  }
                : function () {
                    return t2
                  }
            return (n.d(e2, 'a', e2), e2)
          }),
          (n.o = function (t2, e2) {
            return Object.prototype.hasOwnProperty.call(t2, e2)
          }),
          (n.p = ''),
          n((n.s = 1))
        )
      })([
        function (t, e, n) {
          function i(t2, e2, n2) {
            for (var i2 = 0; i2 < n2.length; i2++) t2.setUint8(e2 + i2, n2.charCodeAt(i2))
          }
          ;(Object.defineProperty(e, '__esModule', { value: true }),
            (e.compress = function (t2, e2, n2) {
              for (
                var i2 = e2 / n2,
                  o = Math.max(i2, 1),
                  r = t2.left,
                  a = t2.right,
                  s = Math.floor((r.length + a.length) / i2),
                  u = new Float32Array(s),
                  c2 = 0,
                  l = 0;
                c2 < s;

              ) {
                var f = Math.floor(l)
                ;((u[c2] = r[f]), c2++, a.length && ((u[c2] = a[f]), c2++), (l += o))
              }
              return u
            }),
            (e.encodePCM = function (t2, e2, n2) {
              void 0 === n2 && (n2 = true)
              var i2 = 0,
                o = t2.length * (e2 / 8),
                r = new ArrayBuffer(o),
                a = new DataView(r)
              if (8 === e2)
                for (var s = 0; s < t2.length; s++, i2++) {
                  var u = (c2 = Math.max(-1, Math.min(1, t2[s]))) < 0 ? 128 * c2 : 127 * c2
                  ;((u = +u + 128), a.setInt8(i2, u))
                }
              else
                for (s = 0; s < t2.length; s++, i2 += 2) {
                  var c2 = Math.max(-1, Math.min(1, t2[s]))
                  a.setInt16(i2, c2 < 0 ? 32768 * c2 : 32767 * c2, n2)
                }
              return a
            }),
            (e.encodeWAV = function (t2, e2, n2, o, r, a) {
              void 0 === a && (a = true)
              var s = n2 > e2 ? e2 : n2,
                u = r,
                c2 = new ArrayBuffer(44 + t2.byteLength),
                l = new DataView(c2),
                f = o,
                p = 0
              ;(i(l, p, 'RIFF'),
                (p += 4),
                l.setUint32(p, 36 + t2.byteLength, a),
                i(l, (p += 4), 'WAVE'),
                i(l, (p += 4), 'fmt '),
                (p += 4),
                l.setUint32(p, 16, a),
                (p += 4),
                l.setUint16(p, 1, a),
                (p += 2),
                l.setUint16(p, f, a),
                (p += 2),
                l.setUint32(p, s, a),
                (p += 4),
                l.setUint32(p, f * s * (u / 8), a),
                (p += 4),
                l.setUint16(p, f * (u / 8), a),
                (p += 2),
                l.setUint16(p, u, a),
                i(l, (p += 2), 'data'),
                (p += 4),
                l.setUint32(p, t2.byteLength, a),
                (p += 4))
              for (var d = 0; d < t2.byteLength; ) (l.setUint8(p, t2.getUint8(d)), p++, d++)
              return l
            }))
        },
        function (t, e, n) {
          var i,
            o =
              (this && this.__extends) ||
              ((i = function (t2, e2) {
                return (i =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (t3, e3) {
                      t3.__proto__ = e3
                    }) ||
                  function (t3, e3) {
                    for (var n2 in e3) e3.hasOwnProperty(n2) && (t3[n2] = e3[n2])
                  })(t2, e2)
              }),
              function (t2, e2) {
                function n2() {
                  this.constructor = t2
                }
                ;(i(t2, e2),
                  (t2.prototype =
                    null === e2 ? Object.create(e2) : ((n2.prototype = e2.prototype), new n2())))
              })
          Object.defineProperty(e, '__esModule', { value: true })
          var r = n(2),
            a = n(0),
            s = n(3),
            u = (function (t2) {
              function e2(e3) {
                void 0 === e3 && (e3 = {})
                var n2 = t2.call(this, e3) || this
                return ((n2.isrecording = false), (n2.ispause = false), (n2.isplaying = false), n2)
              }
              return (
                o(e2, t2),
                (e2.prototype.setOption = function (t3) {
                  ;(void 0 === t3 && (t3 = {}), this.setNewOption(t3))
                }),
                (e2.prototype.start = function () {
                  return this.isrecording
                    ? Promise.reject()
                    : ((this.isrecording = true), this.startRecord())
                }),
                (e2.prototype.pause = function () {
                  this.isrecording && !this.ispause && ((this.ispause = true), this.pauseRecord())
                }),
                (e2.prototype.resume = function () {
                  this.isrecording && this.ispause && ((this.ispause = false), this.resumeRecord())
                }),
                (e2.prototype.stop = function () {
                  this.isrecording &&
                    ((this.isrecording = false), (this.ispause = false), this.stopRecord())
                }),
                (e2.prototype.play = function () {
                  ;(this.stop(),
                    (this.isplaying = true),
                    this.onplay && this.onplay(),
                    s.default.addPlayEnd(this.onplayend))
                  var t3 = this.getWAV()
                  t3.byteLength > 44 && s.default.play(t3.buffer)
                }),
                (e2.prototype.getPlayTime = function () {
                  return s.default.getPlayTime()
                }),
                (e2.prototype.pausePlay = function () {
                  !this.isrecording &&
                    this.isplaying &&
                    ((this.isplaying = false),
                    this.onpauseplay && this.onpauseplay(),
                    s.default.pausePlay())
                }),
                (e2.prototype.resumePlay = function () {
                  this.isrecording ||
                    this.isplaying ||
                    ((this.isplaying = true),
                    this.onresumeplay && this.onresumeplay(),
                    s.default.resumePlay())
                }),
                (e2.prototype.stopPlay = function () {
                  this.isrecording ||
                    ((this.isplaying = false),
                    this.onstopplay && this.onstopplay(),
                    s.default.stopPlay())
                }),
                (e2.prototype.destroy = function () {
                  return (s.default.destroyPlay(), this.destroyRecord())
                }),
                (e2.prototype.getRecordAnalyseData = function () {
                  return this.getAnalyseData()
                }),
                (e2.prototype.getPlayAnalyseData = function () {
                  return s.default.getAnalyseData()
                }),
                (e2.prototype.getPCM = function () {
                  this.stop()
                  var t3 = this.getData()
                  return (
                    (t3 = a.compress(t3, this.inputSampleRate, this.outputSampleRate)),
                    a.encodePCM(t3, this.oututSampleBits, this.littleEdian)
                  )
                }),
                (e2.prototype.getPCMBlob = function () {
                  return new Blob([this.getPCM()])
                }),
                (e2.prototype.downloadPCM = function (t3) {
                  void 0 === t3 && (t3 = 'recorder')
                  var e3 = this.getPCMBlob()
                  r.downloadPCM(e3, t3)
                }),
                (e2.prototype.getWAV = function () {
                  var t3 = this.getPCM()
                  return a.encodeWAV(
                    t3,
                    this.inputSampleRate,
                    this.outputSampleRate,
                    this.config.numChannels,
                    this.oututSampleBits,
                    this.littleEdian
                  )
                }),
                (e2.prototype.getWAVBlob = function () {
                  return new Blob([this.getWAV()], { type: 'audio/wav' })
                }),
                (e2.prototype.downloadWAV = function (t3) {
                  void 0 === t3 && (t3 = 'recorder')
                  var e3 = this.getWAVBlob()
                  r.downloadWAV(e3, t3)
                }),
                (e2.prototype.download = function (t3, e3, n2) {
                  r.download(t3, e3, n2)
                }),
                (e2.prototype.getChannelData = function () {
                  var t3 = this.getPCM(),
                    e3 = t3.byteLength,
                    n2 = this.littleEdian,
                    i2 = { left: null, right: null }
                  if (2 === this.config.numChannels) {
                    var o2 = new DataView(new ArrayBuffer(e3 / 2)),
                      r2 = new DataView(new ArrayBuffer(e3 / 2))
                    if (16 === this.config.sampleBits)
                      for (var a2 = 0; a2 < e3 / 2; a2 += 2)
                        (o2.setInt16(a2, t3.getInt16(2 * a2, n2), n2),
                          r2.setInt16(a2, t3.getInt16(2 * a2 + 2, n2), n2))
                    else
                      for (a2 = 0; a2 < e3 / 2; a2 += 2)
                        (o2.setInt8(a2, t3.getInt8(2 * a2)), r2.setInt8(a2, t3.getInt8(2 * a2 + 1)))
                    ;((i2.left = o2), (i2.right = r2))
                  } else i2.left = t3
                  return i2
                }),
                e2
              )
            })(n(5).default)
          e.default = u
        },
        function (t, e, n) {
          function i(t2, e2, n2) {
            var i2 = document.createElement('a')
            ;((i2.href = window.URL.createObjectURL(t2)), (i2.download = e2 + '.' + n2), i2.click())
          }
          ;(Object.defineProperty(e, '__esModule', { value: true }),
            (e.downloadWAV = function (t2, e2) {
              ;(void 0 === e2 && (e2 = 'recorder'), i(t2, e2, 'wav'))
            }),
            (e.downloadPCM = function (t2, e2) {
              ;(void 0 === e2 && (e2 = 'recorder'), i(t2, e2, 'pcm'))
            }),
            (e.download = function (t2, e2, n2) {
              return i(t2, e2, n2)
            }))
        },
        function (t, e, n) {
          Object.defineProperty(e, '__esModule', { value: true })
          var i = n(4),
            o = null,
            r = 0,
            a = 0,
            s = null,
            u = null,
            c2 = null,
            l = false,
            f = 0,
            p = function () {}
          function d() {
            return (
              (l = false),
              s.decodeAudioData(
                c2.slice(0),
                function (t2) {
                  ;(((o = s.createBufferSource()).onended = function () {
                    l || ((f = s.currentTime - a + r), p())
                  }),
                    (o.buffer = t2),
                    o.connect(u),
                    u.connect(s.destination),
                    o.start(0, r),
                    (a = s.currentTime))
                },
                function (t2) {
                  i.throwError(t2)
                }
              )
            )
          }
          function h2() {
            o && (o.stop(), (o = null))
          }
          var y = (function () {
            function t2() {}
            return (
              (t2.play = function (t3) {
                return (
                  s ||
                    ((s = new (window.AudioContext || window.webkitAudioContext)()),
                    ((u = s.createAnalyser()).fftSize = 2048)),
                  this.stopPlay(),
                  (c2 = t3),
                  (f = 0),
                  d()
                )
              }),
              (t2.pausePlay = function () {
                ;(h2(), (r += s.currentTime - a), (l = true))
              }),
              (t2.resumePlay = function () {
                return d()
              }),
              (t2.stopPlay = function () {
                ;((r = 0), (c2 = null), h2())
              }),
              (t2.destroyPlay = function () {
                this.stopPlay()
              }),
              (t2.getAnalyseData = function () {
                var t3 = new Uint8Array(u.frequencyBinCount)
                return (u.getByteTimeDomainData(t3), t3)
              }),
              (t2.addPlayEnd = function (t3) {
                ;(void 0 === t3 && (t3 = function () {}), (p = t3))
              }),
              (t2.getPlayTime = function () {
                var t3 = l ? r : s.currentTime - a + r
                return f || t3
              }),
              t2
            )
          })()
          e.default = y
        },
        function (t, e, n) {
          ;(Object.defineProperty(e, '__esModule', { value: true }),
            (e.throwError = function (t2) {
              throw new Error(t2)
            }))
        },
        function (t, e, n) {
          Object.defineProperty(e, '__esModule', { value: true })
          var i = n(0),
            o = (function () {
              function t2(e2) {
                ;(void 0 === e2 && (e2 = {}),
                  (this.size = 0),
                  (this.lBuffer = []),
                  (this.rBuffer = []),
                  (this.tempPCM = []),
                  (this.inputSampleBits = 16),
                  (this.fileSize = 0),
                  (this.duration = 0),
                  (this.needRecord = true))
                var n2,
                  i2 = new (window.AudioContext || window.webkitAudioContext)()
                ;((this.inputSampleRate = i2.sampleRate),
                  this.setNewOption(e2),
                  (this.littleEdian =
                    ((n2 = new ArrayBuffer(2)),
                    new DataView(n2).setInt16(0, 256, true),
                    256 === new Int16Array(n2)[0])),
                  t2.initUserMedia())
              }
              return (
                (t2.prototype.setNewOption = function (t3) {
                  ;(void 0 === t3 && (t3 = {}),
                    (this.config = {
                      sampleBits: ~[8, 16].indexOf(t3.sampleBits) ? t3.sampleBits : 16,
                      sampleRate: ~[8e3, 11025, 16e3, 22050, 24e3, 44100, 48e3].indexOf(
                        t3.sampleRate
                      )
                        ? t3.sampleRate
                        : this.inputSampleRate,
                      numChannels: ~[1, 2].indexOf(t3.numChannels) ? t3.numChannels : 1
                    }),
                    (this.outputSampleRate = this.config.sampleRate),
                    (this.oututSampleBits = this.config.sampleBits))
                }),
                (t2.prototype.startRecord = function () {
                  var t3 = this
                  return (
                    this.context && this.destroyRecord(),
                    this.initRecorder(),
                    navigator.mediaDevices
                      .getUserMedia({ audio: true })
                      .then(function (e2) {
                        ;((t3.audioInput = t3.context.createMediaStreamSource(e2)),
                          (t3.stream = e2))
                      })
                      .then(function () {
                        ;(t3.audioInput.connect(t3.analyser),
                          t3.analyser.connect(t3.recorder),
                          t3.recorder.connect(t3.context.destination))
                      })
                  )
                }),
                (t2.prototype.pauseRecord = function () {
                  this.needRecord = false
                }),
                (t2.prototype.resumeRecord = function () {
                  this.needRecord = true
                }),
                (t2.prototype.stopRecord = function () {
                  ;(this.audioInput && this.audioInput.disconnect(),
                    this.source && this.source.stop(),
                    this.recorder.disconnect(),
                    this.analyser.disconnect(),
                    (this.needRecord = true))
                }),
                (t2.prototype.destroyRecord = function () {
                  return (this.clearRecordStatus(), this.stopStream(), this.closeAudioContext())
                }),
                (t2.prototype.getAnalyseData = function () {
                  var t3 = new Uint8Array(this.analyser.frequencyBinCount)
                  return (this.analyser.getByteTimeDomainData(t3), t3)
                }),
                (t2.prototype.getData = function () {
                  return this.flat()
                }),
                (t2.prototype.clearRecordStatus = function () {
                  ;((this.lBuffer.length = 0),
                    (this.rBuffer.length = 0),
                    (this.size = 0),
                    (this.fileSize = 0),
                    (this.PCM = null),
                    (this.audioInput = null),
                    (this.duration = 0))
                }),
                (t2.prototype.flat = function () {
                  var t3 = null,
                    e2 = new Float32Array(0)
                  1 === this.config.numChannels
                    ? (t3 = new Float32Array(this.size))
                    : ((t3 = new Float32Array(this.size / 2)),
                      (e2 = new Float32Array(this.size / 2)))
                  for (var n2 = 0, i2 = 0; i2 < this.lBuffer.length; i2++)
                    (t3.set(this.lBuffer[i2], n2), (n2 += this.lBuffer[i2].length))
                  n2 = 0
                  for (i2 = 0; i2 < this.rBuffer.length; i2++)
                    (e2.set(this.rBuffer[i2], n2), (n2 += this.rBuffer[i2].length))
                  return { left: t3, right: e2 }
                }),
                (t2.prototype.initRecorder = function () {
                  var t3 = this
                  ;(this.clearRecordStatus(),
                    (this.context = new (window.AudioContext || window.webkitAudioContext)()),
                    (this.analyser = this.context.createAnalyser()),
                    (this.analyser.fftSize = 2048))
                  var e2 = this.context.createScriptProcessor || this.context.createJavaScriptNode
                  ;((this.recorder = e2.apply(this.context, [
                    4096,
                    this.config.numChannels,
                    this.config.numChannels
                  ])),
                    (this.recorder.onaudioprocess = function (e3) {
                      if (t3.needRecord) {
                        var n2,
                          i2 = e3.inputBuffer.getChannelData(0),
                          o2 = null
                        ;(t3.lBuffer.push(new Float32Array(i2)),
                          (t3.size += i2.length),
                          2 === t3.config.numChannels &&
                            ((o2 = e3.inputBuffer.getChannelData(1)),
                            t3.rBuffer.push(new Float32Array(o2)),
                            (t3.size += o2.length)),
                          (t3.fileSize =
                            Math.floor(
                              t3.size / Math.max(t3.inputSampleRate / t3.outputSampleRate, 1)
                            ) *
                            (t3.oututSampleBits / 8)),
                          (n2 = 100 * Math.max.apply(Math, i2)),
                          (t3.duration += 4096 / t3.inputSampleRate),
                          t3.onprocess && t3.onprocess(t3.duration),
                          t3.onprogress &&
                            t3.onprogress({
                              duration: t3.duration,
                              fileSize: t3.fileSize,
                              vol: n2
                            }))
                      }
                    }))
                }),
                (t2.prototype.stopStream = function () {
                  this.stream &&
                    this.stream.getTracks &&
                    (this.stream.getTracks().forEach(function (t3) {
                      return t3.stop()
                    }),
                    (this.stream = null))
                }),
                (t2.prototype.closeAudioContext = function () {
                  return this.context && this.context.close && 'closed' !== this.context.state
                    ? this.context.close()
                    : new Promise(function (t3) {
                        t3()
                      })
                }),
                (t2.initUserMedia = function () {
                  ;(void 0 === navigator.mediaDevices && (navigator.mediaDevices = {}),
                    void 0 === navigator.mediaDevices.getUserMedia &&
                      (navigator.mediaDevices.getUserMedia = function (t3) {
                        var e2 =
                          navigator.getUserMedia ||
                          navigator.webkitGetUserMedia ||
                          navigator.mozGetUserMedia
                        return e2
                          ? new Promise(function (n2, i2) {
                              e2.call(navigator, t3, n2, i2)
                            })
                          : Promise.reject(new Error('浏览器不支持 getUserMedia !'))
                      }))
                }),
                (t2.prototype.transformIntoPCM = function (t3, e2) {
                  var n2 = new Float32Array(t3),
                    o2 = new Float32Array(e2),
                    r = i.compress(
                      { left: n2, right: o2 },
                      this.inputSampleRate,
                      this.outputSampleRate
                    )
                  return i.encodePCM(r, this.oututSampleBits, this.littleEdian)
                }),
                (t2.getPermission = function () {
                  return (
                    this.initUserMedia(),
                    navigator.mediaDevices.getUserMedia({ audio: true }).then(function (t3) {
                      t3 &&
                        t3.getTracks().forEach(function (t4) {
                          return t4.stop()
                        })
                    })
                  )
                }),
                t2
              )
            })()
          e.default = o
        }
      ]).default
    })
  })(recorder$1)
  return recorder$1.exports
}
var jsAudioRecorder
var hasRequiredJsAudioRecorder
function requireJsAudioRecorder() {
  if (hasRequiredJsAudioRecorder) return jsAudioRecorder
  hasRequiredJsAudioRecorder = 1
  jsAudioRecorder = requireRecorder()
  return jsAudioRecorder
}
var jsAudioRecorderExports = requireJsAudioRecorder()
const Recorder = /* @__PURE__ */ getDefaultExportFromCjs(jsAudioRecorderExports)
const _hoisted_1$g = { class: 'main-box' }
const _hoisted_2$c = { class: 'music' }
const _hoisted_3$b = { class: 'tip' }
const _hoisted_4$8 = { class: 'footer' }
const _sfc_main$h = /* @__PURE__ */ defineComponent({
  __name: 'MeEditorRecorder',
  emits: ['close', 'on-submit'],
  setup(__props, { emit: __emit }) {
    const emit = __emit
    const isShow = ref(true)
    const status = ref(0)
    const animation = ref(false)
    const duration = ref(0)
    let recorder2 = null
    const onMaskClick = () => {
      onDestroy()
      emit('close')
    }
    const onDestroy = () => {
      if (recorder2) {
        recorder2.destroy()
      }
    }
    const onSubmit = () => {
      let blob = recorder2.getWAVBlob()
      let file = new File([blob], '在线录音.wav', {
        type: blob.type,
        lastModified: Date.now()
      })
      emit('on-submit', file)
      onDestroy()
    }
    const onStart = () => {
      recorder2 = new Recorder()
      recorder2.start().then(
        () => {
          animation.value = true
          status.value = 1
        },
        (error) => {
          console.log(`${error.name} : ${error.message}`)
        }
      )
      recorder2.onprocess = (value) => {
        duration.value = parseInt(value)
      }
    }
    const onStop = () => {
      recorder2.stop()
      animation.value = false
      status.value = 2
    }
    function countDownTime(second = 0) {
      function formate0to9(num) {
        return num < 10 ? `0${num}` : num
      }
      const hours = Math.floor((second / 60 / 60) % 24)
      const minutes = Math.floor((second / 60) % 60)
      const seconds = Math.floor(second % 60)
      return `${formate0to9(hours)}:${formate0to9(minutes)}:${formate0to9(seconds)}`
    }
    onUnmounted(() => {
      onDestroy()
    })
    return (_ctx, _cache) => {
      const _component_n_icon = NIcon
      const _component_n_button = Button
      const _component_n_modal = __unplugin_components_3$1
      return (
        openBlock(),
        createBlock(
          _component_n_modal,
          {
            show: unref(isShow),
            'onUpdate:show':
              _cache[0] ||
              (_cache[0] = ($event) => (isRef(isShow) ? (isShow.value = $event) : null)),
            preset: 'card',
            title: '语音录制',
            class: 'modal-radius',
            style: { 'max-width': '450px' },
            'on-after-leave': onMaskClick,
            'mask-closable': false
          },
          {
            footer: withCtx(() => [
              createBaseVNode('div', _hoisted_4$8, [
                withDirectives(
                  createVNode(
                    _component_n_button,
                    {
                      type: 'primary',
                      ghost: '',
                      round: '',
                      onClick: onStart
                    },
                    {
                      default: withCtx(() => [
                        createVNode(_component_n_icon, { component: unref(IconVoice) }, null, 8, [
                          'component'
                        ]),
                        _cache[1] || (_cache[1] = createTextVNode('  开始录音 ', -1))
                      ]),
                      _: 1,
                      __: [1]
                    },
                    512
                  ),
                  [[vShow, unref(status) == 0]]
                ),
                withDirectives(
                  createVNode(
                    _component_n_button,
                    {
                      type: 'primary',
                      'text-color': '#ffffff',
                      round: '',
                      onClick: onStop
                    },
                    {
                      default: withCtx(() => [
                        createVNode(_component_n_icon, { component: unref(IconVoice) }, null, 8, [
                          'component'
                        ]),
                        _cache[2] || (_cache[2] = createTextVNode('  结束录音 ', -1))
                      ]),
                      _: 1,
                      __: [2]
                    },
                    512
                  ),
                  [[vShow, unref(status) == 1]]
                ),
                withDirectives(
                  createVNode(
                    _component_n_button,
                    {
                      type: 'primary',
                      ghost: '',
                      round: '',
                      onClick: onStart
                    },
                    {
                      default: withCtx(
                        () => _cache[3] || (_cache[3] = [createTextVNode(' 重新录音 ', -1)])
                      ),
                      _: 1,
                      __: [3]
                    },
                    512
                  ),
                  [[vShow, unref(status) == 2]]
                ),
                withDirectives(
                  createVNode(
                    _component_n_button,
                    {
                      type: 'primary',
                      'text-color': '#ffffff',
                      round: '',
                      onClick: onSubmit
                    },
                    {
                      default: withCtx(
                        () => _cache[4] || (_cache[4] = [createTextVNode(' 发送录音 ', -1)])
                      ),
                      _: 1,
                      __: [4]
                    },
                    512
                  ),
                  [[vShow, unref(status) == 2]]
                )
              ])
            ]),
            default: withCtx(() => [
              createBaseVNode('main', _hoisted_1$g, [
                createBaseVNode('div', _hoisted_2$c, [
                  createBaseVNode(
                    'span',
                    {
                      class: normalizeClass(['line line1', { 'line-ani': unref(animation) }])
                    },
                    null,
                    2
                  ),
                  createBaseVNode(
                    'span',
                    {
                      class: normalizeClass(['line line2', { 'line-ani': unref(animation) }])
                    },
                    null,
                    2
                  ),
                  createBaseVNode(
                    'span',
                    {
                      class: normalizeClass(['line line3', { 'line-ani': unref(animation) }])
                    },
                    null,
                    2
                  ),
                  createBaseVNode(
                    'span',
                    {
                      class: normalizeClass(['line line4', { 'line-ani': unref(animation) }])
                    },
                    null,
                    2
                  ),
                  createBaseVNode(
                    'span',
                    {
                      class: normalizeClass(['line line5', { 'line-ani': unref(animation) }])
                    },
                    null,
                    2
                  )
                ]),
                createBaseVNode('div', _hoisted_3$b, [
                  createBaseVNode('p', null, [
                    withDirectives(
                      createBaseVNode(
                        'span',
                        null,
                        toDisplayString(unref(status) == 1 ? '正在录音' : '已暂停录音'),
                        513
                      ),
                      [[vShow, unref(status)]]
                    ),
                    createTextVNode(' ' + toDisplayString(countDownTime(unref(duration))), 1)
                  ])
                ])
              ])
            ]),
            _: 1
          },
          8,
          ['show']
        )
      )
    }
  }
})
const MeEditorRecorder = /* @__PURE__ */ _export_sfc(_sfc_main$h, [
  ['__scopeId', 'data-v-218044a2']
])
function removeLeadingNewlines(str) {
  return str.replace(/^[\n\s]+/, '')
}
function removeTrailingNewlines(str) {
  return str.replace(/[\n\s]+$/, '')
}
function deltaToMessage(delta) {
  const resp = {
    items: [],
    mentions: [],
    mentionUids: [],
    quoteId: '',
    msgType: 1
  }
  for (const iterator of delta.ops) {
    const insert = iterator.insert
    let node = null
    if (resp.items.length) {
      node = resp.items[resp.items.length - 1]
    }
    if (typeof insert === 'string') {
      if (!insert || insert == '\n') continue
      if (node && node.type == 1) {
        node.content = node.content + insert
        continue
      }
      resp.items.push({
        type: 1,
        content: insert
      })
      continue
    }
    if (insert && insert.mention) {
      const mention = insert.mention
      resp.mentions.push({
        name: `${mention.denotationChar}${mention.value}`,
        atid: parseInt(mention.id)
      })
      if (node && node.type == 1) {
        node.content = node.content + ` ${mention.denotationChar}${mention.value}`
        continue
      }
      resp.items.push({
        type: 1,
        content: `${mention.denotationChar}${mention.value}`
      })
      continue
    }
    if (insert && insert.image) {
      resp.items.push({
        type: 3,
        content: insert.image
      })
      continue
    }
    if (insert && insert.emoji) {
      const { emoji } = insert
      if (node && node.type == 1) {
        node.content = node.content + emoji.alt
        continue
      }
      resp.items.push({
        type: 1,
        content: emoji.alt
      })
      continue
    }
    if (insert && insert.quote) {
      resp.quoteId = insert.quote.id
      continue
    }
  }
  if (resp.items.length) {
    if (resp.items[0].type == 1) {
      resp.items[0].content = removeLeadingNewlines(resp.items[0].content)
    }
    if (resp.items[resp.items.length - 1].type == 1) {
      resp.items[resp.items.length - 1].content = removeTrailingNewlines(
        resp.items[resp.items.length - 1].content
      )
    }
  }
  if (resp.items.length > 1) {
    resp.msgType = 12
  }
  if (resp.items.length == 1) {
    resp.msgType = resp.items[0].type
  }
  resp.mentionUids = resp.mentions.map((item) => item.atid)
  return resp
}
function deltaToString(delta) {
  let content = ''
  for (const o of delta.ops) {
    const insert = o.insert
    if (typeof insert === 'string') {
      if (!insert || insert == '\n') continue
      content += insert
      continue
    }
    if (insert && insert.mention) {
      const { mention } = insert
      content += ` ${mention.denotationChar}${mention.value} `
      continue
    }
    if (insert && insert.image) {
      content += '[图片]'
      continue
    }
    if (insert && insert.emoji) {
      content += insert.emoji.alt
      continue
    }
  }
  return content
}
function isEmptyDelta(delta) {
  return delta.ops.length == 1 && delta.ops[0].insert == '\n'
}
function onUploadImage(file) {
  return new Promise((resolve) => {
    const image = new Image()
    image.src = URL.createObjectURL(file)
    image.onload = async () => {
      const { code, data } = await uploadFile(file)
      code == 200 && resolve(data.url)
      URL.revokeObjectURL(image.src)
    }
  })
}
const _hoisted_1$f = { class: 'el-container is-vertical editor' }
const _hoisted_2$b = { class: 'el-header toolbar border-top' }
const _hoisted_3$a = { class: 'toolbar-item' }
const _hoisted_4$7 = ['onClick']
const _hoisted_5$6 = { class: 'title' }
const _hoisted_6$5 = { class: 'el-main' }
const _hoisted_7$4 = {
  enctype: 'multipart/form-data',
  style: { display: 'none' }
}
const _sfc_main$g = /* @__PURE__ */ defineComponent({
  __name: 'Editor',
  props: {
    showVote: { type: Boolean, default: false },
    indexName: { default: '' },
    members: { default: () => [] },
    callback: { type: Function }
  },
  emits: ['editor-event'],
  setup(__props, { emit: __emit }) {
    const editorDraftStore = useEditorDraftStore()
    const editor = ref(null)
    const getQuill = () => {
      return editor?.value?.getQuill()
    }
    const getQuillSelectionIndex = () => {
      const quill = getQuill()
      if (!quill) return 0
      return (quill.getSelection() || {}).index || quill.getLength()
    }
    const isShowEditorVote = ref(false)
    const isShowEditorCode = ref(false)
    const isShowEditorRecorder = ref(false)
    const fileImageRef = ref()
    const uploadFileRef = ref()
    const emoticonRef = ref()
    const editorOption = {
      theme: 'snow',
      placeholder: '按Enter发送 / Shift+Enter 换行',
      formats: ['emoji', 'quote', 'mention', 'image'],
      modules: {
        toolbar: false,
        keyboard: {
          bindings: {
            enter: {
              key: 'Enter',
              // 回车发送消息
              handler: onSendMessage
            }
          }
        },
        mention: {
          allowedChars: /^[\u4e00-\u9fa5]*$/,
          mentionDenotationChars: ['@'],
          positioningStrategy: 'fixed',
          renderItem: (data) => {
            const el = document.createElement('div')
            el.className = 'ed-member-item'
            el.innerHTML = `<img src="${data.avatar}" class="avator"/>`
            el.innerHTML += `<span class="nickname">${data.nickname}</span>`
            return el
          },
          source: function (searchTerm, render) {
            if (!__props.members.length) return render([])
            const items = [
              { id: 0, nickname: '所有人', avatar: defaultAvatar, value: '所有人' },
              ...__props.members.map((item) => {
                return {
                  id: item.id,
                  nickname: item.nickname,
                  avatar: item.avatar,
                  value: item.nickname
                }
              })
            ]
            render(items.filter((item) => item.nickname.toLowerCase().indexOf(searchTerm) !== -1))
          },
          mentionContainerClass: 'ql-mention-list-container me-scrollbar me-scrollbar-thumb'
        },
        uploader: {
          mimetypes: ['image/webp', 'image/gif', 'image/png', 'image/jpg', 'image/jpeg'],
          handler(range, files) {
            const quill = this.quill
            if (!quill.scroll.query('image')) return
            const promises = files.map((file) => {
              return onUploadImage(file)
            })
            Promise.all(promises).then((images) => {
              const update = images.reduce((delta, image) => {
                return delta.insert({ image })
              }, new Delta().retain(range.index).delete(range.length))
              quill.updateContents(update, Emitter.sources.USER)
              quill.setSelection(range.index + images.length, Emitter.sources.SILENT)
            })
          }
        }
      }
    }
    const navs = reactive([
      {
        title: '图片',
        icon: markRaw(Pic),
        show: true,
        click: () => {
          fileImageRef.value.click()
        }
      },
      {
        title: '附件',
        icon: markRaw(FolderUpload),
        show: true,
        click: () => {
          uploadFileRef.value.click()
        }
      },
      {
        title: '代码',
        icon: markRaw(SourceCode),
        show: true,
        click: () => {
          isShowEditorCode.value = true
        }
      },
      {
        title: '语音消息',
        icon: markRaw(IconVoice),
        show: true,
        click: () => {
          isShowEditorRecorder.value = true
        }
      },
      {
        title: '群投票',
        icon: markRaw(Ranking),
        show: computed(() => __props.showVote),
        click: () => {
          isShowEditorVote.value = true
        }
      },
      {
        title: '历史记录',
        icon: markRaw(History$1),
        show: true,
        click: () => {
          __props.callback('history_event')
        }
      }
    ])
    async function onVoteEvent(data) {
      const ok = await __props.callback('vote_event', data)
      ok && (isShowEditorVote.value = false)
    }
    async function onEmoticonEvent(data) {
      emoticonRef.value.setShow(false)
      if (data.type == 1) {
        const quill = getQuill()
        let index2 = getQuillSelectionIndex()
        if (index2 == 1 && quill.getLength() == 1 && quill.getText(0, 1) == '\n') {
          quill.deleteText(0, 1)
          index2 = 0
        }
        if (data.img) {
          quill.insertEmbed(index2, 'emoji', {
            alt: data.value,
            src: data.img,
            width: '24px',
            height: '24px'
          })
        } else {
          quill.insertText(index2, data.value)
        }
        quill.setSelection(index2 + 1, 0, 'user')
      } else {
        await __props.callback('emoticon_event', data.value)
      }
    }
    async function onCodeEvent(data) {
      const ok = await __props.callback('code_event', data)
      ok && (isShowEditorCode.value = false)
    }
    async function onUploadFile(e) {
      if (!e.target.files) return
      const file = e.target.files[0]
      e.target.value = null
      if (file.type.indexOf('image/') === 0) {
        const quill = getQuill()
        let index2 = getQuillSelectionIndex()
        if (index2 == 1 && quill.getLength() == 1 && quill.getText(0, 1) == '\n') {
          quill.deleteText(0, 1)
          index2 = 0
        }
        let src = await onUploadImage(file)
        if (src) {
          quill.insertEmbed(index2, 'image', src)
          quill.setSelection(index2 + 1)
        }
        return
      }
      if (file.type.indexOf('video/') === 0) {
        await __props.callback('video_event', file)
      } else {
        await __props.callback('file_event', file)
      }
    }
    async function onRecorderEvent(file) {
      const ok = await __props.callback('file_event', file)
      ok && (isShowEditorRecorder.value = false)
    }
    async function onSendMessage() {
      let delta = getQuill().getContents()
      let data = deltaToMessage(delta)
      if (data.items.length === 0) return
      if (data.msgType == 1) {
        if (data.items[0].content.length > 1024) {
          return window['$message'].info('发送内容超长，请分条发送')
        }
        const ok = await __props.callback('text_event', data)
        ok && getQuill().setContents([], Quill.sources.USER)
        return
      }
      if (data.msgType == 3) {
        const ok = await __props.callback('image_event', {
          ...getImageInfo(data.items[0].content),
          url: data.items[0].content,
          size: 1e4
        })
        ok && getQuill().setContents([], Quill.sources.USER)
        return
      }
      if (data.msgType == 12) {
        const ok = await __props.callback('mixed_event', data)
        ok && getQuill().setContents([], Quill.sources.USER)
        return
      }
    }
    function onEditorChange() {
      const delta = getQuill().getContents()
      const text = deltaToString(delta)
      if (!isEmptyDelta(delta)) {
        editorDraftStore.items[__props.indexName || ''] = JSON.stringify({
          text,
          ops: delta.ops
        })
      } else {
        delete editorDraftStore.items[__props.indexName || '']
      }
      __props.callback('input_event', text)
    }
    function loadEditorDraftText() {
      setTimeout(() => {
        hideMentionDom()
        const quill = getQuill()
        if (!quill) return
        let draft = editorDraftStore.items[__props.indexName || '']
        if (draft) {
          quill.setContents(JSON.parse(draft)?.ops || [])
        } else {
          quill.setContents([])
        }
        quill.setSelection(getQuillSelectionIndex(), 0, 'user')
      }, 10)
    }
    function onSubscribeMention(data) {
      const quill = getQuill()
      const mention = quill.getModule('mention')
      mention.mentionCharPos = quill.getSelection()?.index ?? quill.getLength()
      mention.insertItem({ id: data?.id, denotationChar: '@', value: data.value }, false)
    }
    function onSubscribeQuote(data) {
      const delta = getQuill().getContents()
      if (delta.ops?.some((item) => item.insert.quote)) {
        return
      }
      const quill = getQuill()
      const index2 = getQuillSelectionIndex()
      quill.insertEmbed(0, 'quote', data)
      quill.setSelection(index2 + 1, 0, 'user')
    }
    function hideMentionDom() {
      let el = document.querySelector('.ql-mention-list-container')
      el && el.remove()
    }
    watch(() => __props.indexName, loadEditorDraftText, { immediate: true })
    onMounted(() => {
      loadEditorDraftText()
    })
    onUnmounted(() => {
      hideMentionDom()
    })
    useEventBus([
      { name: EditorConst.Mention, event: onSubscribeMention },
      { name: EditorConst.Quote, event: onSubscribeQuote }
    ])
    return (_ctx, _cache) => {
      const _component_n_icon = NIcon
      const _component_n_popover = __unplugin_components_3
      return (
        openBlock(),
        createElementBlock(
          Fragment,
          null,
          [
            createBaseVNode('section', _hoisted_1$f, [
              createBaseVNode('header', _hoisted_2$b, [
                createVNode(
                  _component_n_popover,
                  {
                    placement: 'top-start',
                    trigger: 'click',
                    raw: '',
                    width: 300,
                    ref_key: 'emoticonRef',
                    ref: emoticonRef,
                    style: {
                      width: '500px',
                      height: '250px',
                      'border-radius': '10px',
                      overflow: 'hidden',
                      'box-shadow': 'none',
                      border: '1px solid var(--border-color)'
                    }
                  },
                  {
                    trigger: withCtx(() => [
                      createBaseVNode('div', _hoisted_3$a, [
                        createVNode(
                          _component_n_icon,
                          {
                            size: '18',
                            class: 'icon',
                            component: unref(SmilingFace)
                          },
                          null,
                          8,
                          ['component']
                        ),
                        _cache[3] ||
                          (_cache[3] = createBaseVNode('p', { class: 'title' }, '表情符号', -1))
                      ])
                    ]),
                    default: withCtx(() => [
                      createVNode(MeEditorEmoticon, { onOnSelect: onEmoticonEvent })
                    ]),
                    _: 1
                  },
                  512
                ),
                (openBlock(true),
                createElementBlock(
                  Fragment,
                  null,
                  renderList(navs, (nav) => {
                    return withDirectives(
                      (openBlock(),
                      createElementBlock(
                        'div',
                        {
                          class: 'toolbar-item',
                          key: nav.title,
                          onClick: nav.click
                        },
                        [
                          createVNode(
                            _component_n_icon,
                            {
                              size: '18',
                              class: 'icon',
                              component: nav.icon
                            },
                            null,
                            8,
                            ['component']
                          ),
                          createBaseVNode('p', _hoisted_5$6, toDisplayString(nav.title), 1)
                        ],
                        8,
                        _hoisted_4$7
                      )),
                      [[vShow, nav.show]]
                    )
                  }),
                  128
                ))
              ]),
              createBaseVNode('main', _hoisted_6$5, [
                createBaseVNode('form', _hoisted_7$4, [
                  createBaseVNode(
                    'input',
                    {
                      type: 'file',
                      ref_key: 'fileImageRef',
                      ref: fileImageRef,
                      accept: 'image/*',
                      onChange: onUploadFile
                    },
                    null,
                    544
                  ),
                  createBaseVNode(
                    'input',
                    {
                      type: 'file',
                      ref_key: 'uploadFileRef',
                      ref: uploadFileRef,
                      onChange: onUploadFile
                    },
                    null,
                    544
                  )
                ]),
                createVNode(
                  unref(_sfc_main$l),
                  {
                    ref_key: 'editor',
                    ref: editor,
                    options: editorOption,
                    onChange: onEditorChange,
                    style: { height: '100%' }
                  },
                  null,
                  512
                )
              ])
            ]),
            isShowEditorVote.value
              ? (openBlock(),
                createBlock(MeEditorVote, {
                  key: 0,
                  onClose: _cache[0] || (_cache[0] = ($event) => (isShowEditorVote.value = false)),
                  onSubmit: onVoteEvent
                }))
              : createCommentVNode('', true),
            isShowEditorCode.value
              ? (openBlock(),
                createBlock(MeEditorCode, {
                  key: 1,
                  onOnSubmit: onCodeEvent,
                  onClose: _cache[1] || (_cache[1] = ($event) => (isShowEditorCode.value = false))
                }))
              : createCommentVNode('', true),
            isShowEditorRecorder.value
              ? (openBlock(),
                createBlock(MeEditorRecorder, {
                  key: 2,
                  onOnSubmit: onRecorderEvent,
                  onClose:
                    _cache[2] || (_cache[2] = ($event) => (isShowEditorRecorder.value = false))
                }))
              : createCommentVNode('', true)
          ],
          64
        )
      )
    }
  }
})
const Editor2 = /* @__PURE__ */ _export_sfc(_sfc_main$g, [['__scopeId', 'data-v-5ab7da39']])
const _hoisted_1$e = { class: 'main-box el-container is-vertical o-hidden' }
const _hoisted_2$a = {
  class: 'el-header border-bottom search',
  style: { height: '50px' }
}
const _hoisted_3$9 = { class: 'type-items' }
const _hoisted_4$6 = ['onClick']
const _hoisted_5$5 = { style: { display: 'flex', 'align-items': 'center' } }
const _hoisted_6$4 = {
  class: 'el-main',
  style: { padding: '5px', 'box-sizing': 'border-box', overflow: 'hidden' }
}
const _sfc_main$f = /* @__PURE__ */ defineComponent({
  __name: 'HistoryRecord',
  props: {
    talkMode: {
      type: Number,
      default: 0
    },
    toFromId: {
      type: Number,
      default: 0
    }
  },
  emits: ['close'],
  setup(__props, { emit: __emit }) {
    const emit = __emit
    const props = __props
    const chat = useTemplateRef('chat')
    const customMessageRender = (item) => formatChatMessage(2054, item)
    const model = reactive({
      cursor: 0,
      limit: 30,
      msgType: 0,
      loading: false
    })
    const isShow = ref(true)
    const items = ref([])
    const tabs = [
      { name: '全部', type: 0, show: true },
      { name: '图片', type: ChatMsgTypeImage, show: true },
      { name: '音频', type: ChatMsgTypeAudio, show: true },
      { name: '视频', type: ChatMsgTypeVideo, show: true },
      { name: '文件', type: ChatMsgTypeFile, show: true },
      { name: '会话', type: ChatMsgTypeForward, show: true },
      { name: '代码', type: ChatMsgTypeCode, show: true },
      { name: '位置', type: ChatMsgTypeLocation, show: true },
      { name: '群投票', type: ChatMsgTypeVote, show: props.talkMode == 2 }
    ]
    const onMaskClick = () => {
      emit('close')
    }
    const loadChatRecord = async () => {
      if (model.loading) return true
      const params = {
        talk_mode: props.talkMode,
        to_from_id: props.toFromId,
        msg_type: model.msgType,
        cursor: model.cursor,
        limit: model.limit
      }
      if (model.cursor === 0) {
        model.loading = true
      }
      const { code, data } = await ServTalkHistoryRecords(params)
      model.loading = false
      if (code != 200) return true
      if (params.cursor === 0) {
        items.value = []
      }
      let list = data.items || []
      list.map((item) => {
        item.extra = JSON.parse(item.extra)
        item.quote = JSON.parse(item.quote)
      })
      if (list.length) {
        model.cursor = data.cursor
      }
      items.value.push(...list)
      return list.length >= model.limit
    }
    const triggerType = (type) => {
      model.msgType = type
      model.cursor = 0
      chat.value?.reload()
    }
    return (_ctx, _cache) => {
      const _component_n_icon = NIcon
      const _component_n_modal = __unplugin_components_3$1
      return (
        openBlock(),
        createBlock(
          _component_n_modal,
          {
            show: isShow.value,
            'onUpdate:show': _cache[0] || (_cache[0] = ($event) => (isShow.value = $event)),
            preset: 'card',
            title: '消息管理',
            style: { 'max-width': '750px' },
            class: 'modal-radius o-hidden',
            'on-after-leave': onMaskClick,
            segmented: {
              content: true
            },
            'header-style': {
              padding: '20px 15px'
            },
            'content-style': {
              padding: 0
            }
          },
          {
            default: withCtx(() => [
              createBaseVNode('section', _hoisted_1$e, [
                createBaseVNode('header', _hoisted_2$a, [
                  createBaseVNode('div', _hoisted_3$9, [
                    (openBlock(),
                    createElementBlock(
                      Fragment,
                      null,
                      renderList(tabs, (tab) => {
                        return withDirectives(
                          createBaseVNode(
                            'span',
                            {
                              key: tab.name,
                              class: normalizeClass([
                                'pointer',
                                { active: model.msgType == tab.type }
                              ]),
                              onClick: ($event) => triggerType(tab.type)
                            },
                            toDisplayString(tab.name),
                            11,
                            _hoisted_4$6
                          ),
                          [[vShow, tab.show]]
                        )
                      }),
                      64
                    ))
                  ]),
                  createBaseVNode('div', _hoisted_5$5, [
                    createVNode(
                      _component_n_icon,
                      {
                        size: 20,
                        class: 'pointer',
                        component: unref(Calendar)
                      },
                      null,
                      8,
                      ['component']
                    )
                  ])
                ]),
                createBaseVNode('main', _hoisted_6$4, [
                  createVNode(
                    unref(ChatPlus),
                    {
                      ref_key: 'chat',
                      ref: chat,
                      'align-mode': 'left',
                      items: items.value,
                      'custom-render': customMessageRender,
                      'show-avatar': true,
                      'context-menu': false,
                      'multi-select-mode': false,
                      'data-source-mode': 'pullup',
                      onScrollLoadMore: loadChatRecord
                    },
                    null,
                    8,
                    ['items']
                  )
                ])
              ])
            ]),
            _: 1
          },
          8,
          ['show']
        )
      )
    }
  }
})
const HistoryRecord = /* @__PURE__ */ _export_sfc(_sfc_main$f, [['__scopeId', 'data-v-6f5f6e58']])
const _hoisted_1$d = { class: 'el-footer height100' }
const _sfc_main$e = /* @__PURE__ */ defineComponent({
  __name: 'Editor',
  props: {
    uid: {
      type: Number,
      default: 0
    },
    talkMode: {
      type: Number,
      default: 0
    },
    toFromId: {
      type: Number,
      default: 0
    },
    indexName: {
      type: String,
      default: ''
    },
    online: {
      type: Boolean,
      default: false
    },
    members: {
      default: () => []
    }
  },
  setup(__props) {
    const { message } = useInject()
    const talkStore = useTalkStore()
    const editorStore = useEditorStore()
    const settingsStore = useSettingsStore()
    const uploadsStore = useUploadsStore()
    const dialogueStore = useDialogueStore()
    const props = __props
    const isShowHistory = ref(false)
    const onSendMessage = async (data = {}) => {
      if (!p2pConnect.isConnect()) {
        message.error('P2P网络连接已中断，请稍后再试!')
        return Promise.resolve(false)
      }
      const params = {
        ...data,
        talk_mode: props.talkMode,
        to_from_id: props.toFromId
      }
      try {
        if (props.talkMode === 2) {
          const result = await P2PMessageService.sendGroupMessage(
            props.toFromId.toString(),
            params.body,
            params.type || 'text'
          )
          return result.success
        } else {
          const result = await P2PMessageService.sendTextMessage(
            props.toFromId.toString(),
            params.body
          )
          return result.success
        }
      } catch (error) {
        console.error('发送消息失败:', error)
        message.error('发送消息失败')
        return false
      }
    }
    const onSendTextEvent = (data) => {
      return onSendMessage({
        type: 'text',
        quote_id: data.quoteId,
        body: {
          content: data.items[0].content,
          text: data.items[0].content,
          mentions: data.mentionUids
        }
      })
    }
    const onSendImageEvent = (data) => {
      return onSendMessage({
        type: 'image',
        body: { ...data }
      })
    }
    const onSendVideoEvent = async (data) => {
      const resp = await getVideoImage(data)
      const cover = await uploadFile(resp.file)
      if (cover.code != 200) return false
      const video = await uploadFile(data)
      if (video.code != 200) return false
      return await onSendMessage({
        type: 'video',
        body: {
          url: video.data.src,
          cover: cover.data.src,
          duration: parseInt(`${resp.duration}`),
          size: data.size
        }
      })
    }
    const onSendCodeEvent = (data) => {
      return onSendMessage({
        type: 'code',
        body: {
          code: data.code,
          lang: data.lang
        }
      })
    }
    const onSendFileEvent = async (data) => {
      let maxsize = 500 * 1024 * 1024
      if (data.size > maxsize) {
        message.warning('上传文件不能超过500M!')
        return true
      }
      uploadsStore.initUploadFile(
        data,
        props.talkMode,
        props.toFromId,
        dialogueStore.target.username
      )
      return true
    }
    const onSendVoteEvent = async (data) => {
      const { code } = await ServGroupVoteCreate({
        group_id: props.toFromId,
        mode: data.mode,
        is_anonymous: data.is_anonymous,
        title: data.title,
        options: data.options
      })
      return code == 200
    }
    const onSendEmoticonEvent = (data) => {
      return onSendMessage({
        type: 'emoticon',
        body: {
          emoticon_id: data
        }
      })
    }
    const onSendMixedEvent = (data) => {
      return onSendMessage({
        type: 'mixed',
        quote_id: data.quoteId,
        body: {
          items: data.items
        }
      })
    }
    const onKeyboardPush = throttle(() => {
      p2pConnect.sendTypingStatus({
        to_from_id: props.toFromId,
        talk_mode: props.talkMode
      })
    }, 3e3)
    const onInputEvent = async (data) => {
      talkStore.updateItem({
        index_name: props.indexName,
        draft_text: data
      })
      if (settingsStore.isKeyboard && props.online) {
        onKeyboardPush()
      }
      return true
    }
    const evnets = {
      text_event: onSendTextEvent,
      image_event: onSendImageEvent,
      video_event: onSendVideoEvent,
      code_event: onSendCodeEvent,
      file_event: onSendFileEvent,
      input_event: onInputEvent,
      vote_event: onSendVoteEvent,
      emoticon_event: onSendEmoticonEvent,
      history_event: async () => {
        isShowHistory.value = true
        return false
      },
      mixed_event: onSendMixedEvent
    }
    onMounted(() => {
      editorStore.loadUserEmoticon()
    })
    const onEditorEvent = async (event, data) => {
      if (!evnets[event]) return false
      let ok = await evnets[event](data)
      if (ok && !['history_event', 'input_event'].includes(event)) {
        bus.emit('talk-session-scroll', { top: 0 })
      }
      return ok
    }
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          Fragment,
          null,
          [
            createBaseVNode('footer', _hoisted_1$d, [
              createVNode(
                Editor2,
                {
                  'index-name': __props.indexName,
                  'show-vote': __props.talkMode == 2,
                  members: __props.members,
                  callback: onEditorEvent
                },
                null,
                8,
                ['index-name', 'show-vote', 'members']
              )
            ]),
            isShowHistory.value
              ? (openBlock(),
                createBlock(
                  HistoryRecord,
                  {
                    key: 0,
                    'talk-mode': __props.talkMode,
                    'to-from-id': __props.toFromId,
                    onClose: _cache[0] || (_cache[0] = ($event) => (isShowHistory.value = false))
                  },
                  null,
                  8,
                  ['talk-mode', 'to-from-id']
                ))
              : createCommentVNode('', true)
          ],
          64
        )
      )
    }
  }
})
const _hoisted_1$c = {
  key: 1,
  style: { padding: '0px', height: '100%' }
}
const _sfc_main$d = /* @__PURE__ */ defineComponent({
  __name: 'GroupNoticeDrawer',
  props: /* @__PURE__ */ mergeModels(
    {
      groupId: {
        type: Number,
        default: 0
      }
    },
    {
      modelValue: { default: false },
      modelModifiers: {}
    }
  ),
  emits: ['update:modelValue'],
  setup(__props) {
    const isShow = useModel(__props, 'modelValue')
    const props = __props
    const settingsStore = useSettingsStore()
    const isEditorMode = ref(false)
    const editorContent = ref('')
    const themeMode = computed(() => settingsStore.currentThemeMode)
    const detail = ref({
      updated_at: '',
      content: '',
      modify_user_name: ''
    })
    async function loadDetail() {
      const { code, data } = await ServGroupDetail({ group_id: props.groupId })
      if (code != 200) return
      detail.value = {
        updated_at: data.notice?.updated_at || '',
        content: data.notice?.content || '',
        modify_user_name: data.notice?.modify_user_name || ''
      }
      editorContent.value = data.notice?.content || ''
    }
    watch(isShow, () => {
      isEditorMode.value = false
      if (isShow.value) loadDetail()
    })
    const onSave = async () => {
      if (!isEditorMode.value) {
        return (isEditorMode.value = true)
      }
      if (editorContent.value == detail.value.content) {
        return (isEditorMode.value = false)
      }
      const { code } = await ServGroupNoticeUpdate({
        group_id: props.groupId,
        content: editorContent.value
      })
      if (code != 200) return
      isEditorMode.value = false
      detail.value.content = editorContent.value
      loadDetail()
    }
    return (_ctx, _cache) => {
      const _component_n_empty = NEmpty
      const _component_n_icon = NIcon
      const _component_n_float_button = __unplugin_components_4
      const _component_n_drawer_content = __unplugin_components_3$3
      const _component_n_drawer = __unplugin_components_0$2
      return (
        openBlock(),
        createBlock(
          _component_n_drawer,
          {
            show: isShow.value,
            'onUpdate:show': _cache[2] || (_cache[2] = ($event) => (isShow.value = $event)),
            placement: 'right',
            'show-mask': 'transparent',
            width: 400,
            style: { padding: 0, borderRadius: 0 },
            to: '#drawer-container'
          },
          {
            default: withCtx(() => [
              createVNode(
                _component_n_drawer_content,
                {
                  'body-content-style': { padding: 0 },
                  'header-style': { height: '60px', padding: '0 15px' },
                  closable: ''
                },
                {
                  header: withCtx(
                    () => _cache[3] || (_cache[3] = [createTextVNode(' 群公告 ', -1)])
                  ),
                  default: withCtx(() => [
                    !unref(detail).content.length
                      ? (openBlock(),
                        createBlock(_component_n_empty, {
                          key: 0,
                          description: '暂无公告',
                          style: { 'margin-top': '100px' }
                        }))
                      : (openBlock(),
                        createElementBlock('div', _hoisted_1$c, [
                          !unref(isEditorMode)
                            ? (openBlock(),
                              createBlock(
                                unref(MdPreview),
                                {
                                  key: 0,
                                  'preview-theme': 'vuepress',
                                  'show-code-row-number': false,
                                  theme: unref(themeMode),
                                  style: { height: '100%', padding: '8px' },
                                  modelValue: unref(detail).content,
                                  'onUpdate:modelValue':
                                    _cache[0] ||
                                    (_cache[0] = ($event) => (unref(detail).content = $event))
                                },
                                null,
                                8,
                                ['theme', 'modelValue']
                              ))
                            : (openBlock(),
                              createBlock(
                                unref(Editor$3),
                                {
                                  key: 1,
                                  preview: false,
                                  modelValue: unref(editorContent),
                                  'onUpdate:modelValue':
                                    _cache[1] ||
                                    (_cache[1] = ($event) =>
                                      isRef(editorContent) ? (editorContent.value = $event) : null),
                                  footers: [],
                                  toolbars: [
                                    'revoke',
                                    'bold',
                                    'underline',
                                    'italic',
                                    'strikeThrough',
                                    'unorderedList',
                                    'orderedList',
                                    'link',
                                    'image'
                                  ],
                                  theme: unref(themeMode),
                                  style: { height: 'inherit', border: 'none' }
                                },
                                null,
                                8,
                                ['modelValue', 'theme']
                              )),
                          createVNode(
                            _component_n_float_button,
                            {
                              right: 15,
                              position: 'fixed',
                              bottom: 50,
                              shape: 'circle',
                              type: 'primary',
                              onClick: onSave
                            },
                            {
                              default: withCtx(() => [
                                createVNode(
                                  _component_n_icon,
                                  {
                                    size: '20',
                                    color: '#ffffff',
                                    component: unref(isEditorMode)
                                      ? unref(CheckCorrect)
                                      : unref(Editor$2)
                                  },
                                  null,
                                  8,
                                  ['component']
                                )
                              ]),
                              _: 1
                            }
                          )
                        ]))
                  ]),
                  _: 1
                }
              )
            ]),
            _: 1
          },
          8,
          ['show']
        )
      )
    }
  }
})
const _hoisted_1$b = { class: 'section me-scrollbar me-scrollbar-thumb' }
const _hoisted_2$9 = { class: 'title border-bottom' }
const _hoisted_3$8 = { class: 'file-header' }
const _hoisted_4$5 = { class: 'type-icon flex-center' }
const _hoisted_5$4 = { class: 'filename' }
const _hoisted_6$3 = { class: 'status' }
const _hoisted_7$3 = { class: 'file-mian' }
const _hoisted_8$2 = { class: 'progress flex-center' }
const _hoisted_9$2 = { class: 'detail' }
const _sfc_main$c = {
  __name: 'UploadsModal',
  setup(__props) {
    const uploadsStore = useUploadsStore()
    const statusItem = {
      0: '等待上传',
      1: '上传中',
      2: '上传完成',
      3: '网络异常'
    }
    return (_ctx, _cache) => {
      const _component_n_progress = __unplugin_components_0$3
      return (
        openBlock(),
        createElementBlock('div', _hoisted_1$b, [
          createBaseVNode('div', _hoisted_2$9, [
            createBaseVNode(
              'span',
              null,
              '上传管理 (' +
                toDisplayString(unref(uploadsStore).successCount) +
                '/' +
                toDisplayString(unref(uploadsStore).items.length) +
                ')',
              1
            ),
            createBaseVNode(
              'span',
              {
                class: 'pointer',
                onClick: _cache[0] || (_cache[0] = ($event) => unref(uploadsStore).close())
              },
              '关闭'
            )
          ]),
          (openBlock(true),
          createElementBlock(
            Fragment,
            null,
            renderList(unref(uploadsStore).items, (item) => {
              return (
                openBlock(),
                createElementBlock(
                  'div',
                  {
                    class: 'file-item',
                    key: item.upload_id
                  },
                  [
                    createBaseVNode('div', _hoisted_3$8, [
                      createBaseVNode(
                        'div',
                        _hoisted_4$5,
                        toDisplayString(item.username.substr(0, 1)),
                        1
                      ),
                      createBaseVNode('div', _hoisted_5$4, toDisplayString(item.username), 1),
                      createBaseVNode('div', _hoisted_6$3, [
                        createBaseVNode(
                          'span',
                          {
                            class: normalizeClass({ success: item.status == 2 })
                          },
                          toDisplayString(statusItem[item.status]),
                          3
                        )
                      ])
                    ]),
                    createBaseVNode('div', _hoisted_7$3, [
                      createBaseVNode('div', _hoisted_8$2, [
                        createVNode(
                          _component_n_progress,
                          {
                            style: { width: '60px', height: '60px' },
                            type: 'circle',
                            percentage: item.percentage
                          },
                          null,
                          8,
                          ['percentage']
                        )
                      ]),
                      createBaseVNode('div', _hoisted_9$2, [
                        createBaseVNode('p', null, [
                          _cache[1] || (_cache[1] = createTextVNode(' 名称：', -1)),
                          createBaseVNode('span', null, toDisplayString(item.file.name), 1)
                        ]),
                        createBaseVNode('p', null, [
                          _cache[2] || (_cache[2] = createTextVNode(' 类型：', -1)),
                          createBaseVNode(
                            'span',
                            null,
                            toDisplayString(item.file.type || 'text'),
                            1
                          )
                        ]),
                        createBaseVNode('p', null, [
                          _cache[3] || (_cache[3] = createTextVNode(' 大小：', -1)),
                          createBaseVNode(
                            'span',
                            null,
                            toDisplayString(unref(fileFormatSize)(item.file.size)),
                            1
                          )
                        ])
                      ])
                    ])
                  ]
                )
              )
            }),
            128
          ))
        ])
      )
    }
  }
}
const UploadsModal = /* @__PURE__ */ _export_sfc(_sfc_main$c, [['__scopeId', 'data-v-631f85db']])
function useTalkRecord() {
  const dialogueStore = useDialogueStore()
  const records = computed(() => dialogueStore.records)
  let cursor = 0
  const loadChatRecord = async () => {
    const { target: talk } = dialogueStore
    const request = {
      talk_mode: talk.talk_mode,
      to_from_id: talk.to_from_id,
      cursor,
      limit: 30
    }
    try {
      console.log('Loading talk records with request:', request)
      const { code, data, message } = await ServTalkRecords(request)
      if (request.talk_mode !== talk.talk_mode || request.to_from_id !== talk.to_from_id) {
        console.error('Talk mode or to_from_id changed')
        throw new Error('Talk mode or to_from_id changed')
      }
      if (code !== 200) {
        console.error('API error:', message)
        throw new Error(message)
      }
      if (request.cursor === 0) {
        dialogueStore.clearDialogueRecord()
      }
      data.items.map((item) => {
        item.extra = JSON.parse(item.extra || '{}')
        item.quote = JSON.parse(item.quote || '{}')
      })
      dialogueStore.unshiftDialogueRecord(data.items.reverse())
      cursor = data.cursor
      return data.items.length < request.limit ? false : true
    } catch (error) {
      console.error('Error loading talk records:', error)
      throw error
    }
  }
  const resetTalkRecord = () => {
    cursor = 0
    dialogueStore.clearDialogueRecord()
  }
  return { records, loadChatRecord, dialogueStore, resetTalkRecord }
}
const _hoisted_1$a = { class: 'el-container is-vertical launch-box' }
const _hoisted_2$8 = { class: 'el-header search' }
const _hoisted_3$7 = {
  class: 'el-header tabs',
  style: { padding: '3px 15px' }
}
const _hoisted_4$4 = {
  class: 'el-main main',
  'loading-text': '加载中...'
}
const _hoisted_5$3 = ['onClick']
const _hoisted_6$2 = { class: 'avatar' }
const _hoisted_7$2 = { class: 'content' }
const _hoisted_8$1 = { class: 'text-ellipsis' }
const _hoisted_9$1 = { class: 'checkbox' }
const _hoisted_10$1 = { class: 'footer' }
const _sfc_main$b = /* @__PURE__ */ defineComponent({
  __name: 'ContactModal',
  emits: ['close', 'on-submit'],
  setup(__props, { emit: __emit }) {
    const emit = __emit
    const tabsIndex = ref(1)
    const isShowBox = ref(true)
    const loading = ref(true)
    const items = ref([])
    const keywords = ref('')
    const loadGroupStatus = ref(false)
    const searchFilter = computed(() => {
      return items.value.filter((item) => {
        return tabsIndex.value == item.type && item.keyword.match(keywords.value) != null
      })
    })
    const checkedFilter = computed(() => {
      return items.value.filter((item) => item.checked)
    })
    const isCanSubmit = computed(() => {
      return !checkedFilter.value.length
    })
    const onLoad = () => {
      onLoadContact()
    }
    const onLoadContact = async () => {
      const { code, data } = await ServContactList({}, { loading })
      if (code != 200) return
      items.value = (data?.items || []).map((item) => {
        return {
          id: item.user_id,
          avatar: item.avatar,
          type: 1,
          name: item.nickname,
          keyword: item.remark + item.nickname,
          remark: item.remark,
          checked: false
        }
      })
    }
    const onLoadGroup = async () => {
      if (loadGroupStatus.value) return
      const { code, data } = await ServGroupList({}, { loading })
      if (code != 200) return
      const list = data.items.map((item) => {
        return {
          id: item.group_id,
          avatar: item.avatar,
          type: 2,
          name: item.group_name,
          keyword: item.group_name,
          remark: '',
          checked: false
        }
      })
      items.value.push(...list)
      loadGroupStatus.value = true
    }
    const onMaskClick = () => {
      emit('close')
    }
    const onTriggerContact = (item) => {
      let data = items.value.find((val) => val.id === item.id)
      if (data) {
        data.checked = !data.checked
      }
    }
    const onSubmit = () => {
      let data = checkedFilter.value.map((item) => {
        return {
          id: item.id,
          type: item.type
        }
      })
      emit('on-submit', data)
    }
    const onTabs = (value) => {
      tabsIndex.value = value
      if (value == 2) {
        onLoadGroup()
      }
    }
    onMounted(() => {
      onLoad()
    })
    return (_ctx, _cache) => {
      const _component_n_icon = NIcon
      const _component_n_input = __unplugin_components_1$1
      const _component_n_tab = __unplugin_components_2$2
      const _component_n_tabs = __unplugin_components_3$4
      const _component_im_avatar = resolveComponent('im-avatar')
      const _component_n_checkbox = __unplugin_components_1$3
      const _component_n_virtual_list = __unplugin_components_1$2
      const _component_n_button = Button
      const _component_n_modal = __unplugin_components_3$1
      const _directive_loading = resolveDirective('loading')
      return (
        openBlock(),
        createBlock(
          _component_n_modal,
          {
            show: unref(isShowBox),
            'onUpdate:show':
              _cache[2] ||
              (_cache[2] = ($event) => (isRef(isShowBox) ? (isShowBox.value = $event) : null)),
            preset: 'card',
            title: '选择目标',
            class: 'modal-radius',
            style: { 'max-width': '350px', height: '550px' },
            'on-after-leave': onMaskClick,
            segmented: {
              content: true,
              footer: true
            },
            'content-style': {
              padding: 0
            }
          },
          {
            footer: withCtx(() => [
              createBaseVNode('div', _hoisted_10$1, [
                createBaseVNode('div', null, [
                  createBaseVNode(
                    'span',
                    null,
                    '已选择(' + toDisplayString(unref(checkedFilter).length) + ')',
                    1
                  )
                ]),
                createBaseVNode('div', null, [
                  createVNode(
                    _component_n_button,
                    {
                      onClick: _cache[1] || (_cache[1] = ($event) => (isShowBox.value = false))
                    },
                    {
                      default: withCtx(
                        () => _cache[5] || (_cache[5] = [createTextVNode(' 取消 ', -1)])
                      ),
                      _: 1,
                      __: [5]
                    }
                  ),
                  createVNode(
                    _component_n_button,
                    {
                      type: 'primary',
                      'text-color': '#ffffff',
                      class: 'mt-l15',
                      onClick: onSubmit,
                      disabled: unref(isCanSubmit)
                    },
                    {
                      default: withCtx(
                        () => _cache[6] || (_cache[6] = [createTextVNode(' 确定 ', -1)])
                      ),
                      _: 1,
                      __: [6]
                    },
                    8,
                    ['disabled']
                  )
                ])
              ])
            ]),
            default: withCtx(() => [
              createBaseVNode('section', _hoisted_1$a, [
                createBaseVNode('header', _hoisted_2$8, [
                  createVNode(
                    _component_n_input,
                    {
                      placeholder: '搜索',
                      value: unref(keywords),
                      'onUpdate:value':
                        _cache[0] ||
                        (_cache[0] = ($event) =>
                          isRef(keywords) ? (keywords.value = $event) : null),
                      clearable: ''
                    },
                    {
                      prefix: withCtx(() => [
                        createVNode(_component_n_icon, { component: unref(Search) }, null, 8, [
                          'component'
                        ])
                      ]),
                      _: 1
                    },
                    8,
                    ['value']
                  )
                ]),
                createBaseVNode('header', _hoisted_3$7, [
                  createVNode(
                    _component_n_tabs,
                    {
                      type: 'segment',
                      size: 'small',
                      animated: '',
                      'justify-content': 'space-around',
                      'onUpdate:value': onTabs
                    },
                    {
                      default: withCtx(() => [
                        createVNode(
                          _component_n_tab,
                          { name: '1' },
                          {
                            default: withCtx(
                              () => _cache[3] || (_cache[3] = [createTextVNode(' 好友 ', -1)])
                            ),
                            _: 1,
                            __: [3]
                          }
                        ),
                        createVNode(
                          _component_n_tab,
                          { name: '2' },
                          {
                            default: withCtx(
                              () => _cache[4] || (_cache[4] = [createTextVNode(' 群聊 ', -1)])
                            ),
                            _: 1,
                            __: [4]
                          }
                        )
                      ]),
                      _: 1
                    }
                  )
                ]),
                withDirectives(
                  (openBlock(),
                  createElementBlock('main', _hoisted_4$4, [
                    createVNode(
                      _component_n_virtual_list,
                      {
                        style: { 'max-height': 'inherit' },
                        'item-size': 42,
                        items: unref(searchFilter)
                      },
                      {
                        default: withCtx(({ item }) => [
                          (openBlock(),
                          createElementBlock(
                            'div',
                            {
                              key: item.id,
                              class: 'item-box pointer',
                              style: { height: '42px' },
                              onClick: ($event) => onTriggerContact(item)
                            },
                            [
                              createBaseVNode('div', _hoisted_6$2, [
                                createVNode(
                                  _component_im_avatar,
                                  {
                                    src: item.avatar,
                                    size: 25,
                                    username: item.remark || item.name
                                  },
                                  null,
                                  8,
                                  ['src', 'username']
                                )
                              ]),
                              createBaseVNode('div', _hoisted_7$2, [
                                createBaseVNode(
                                  'span',
                                  _hoisted_8$1,
                                  toDisplayString(item.name) +
                                    ' ' +
                                    toDisplayString(item.remark ? ` (${item.remark})` : ''),
                                  1
                                )
                              ]),
                              createBaseVNode('div', _hoisted_9$1, [
                                createVNode(
                                  _component_n_checkbox,
                                  {
                                    size: 'small',
                                    checked: item.checked
                                  },
                                  null,
                                  8,
                                  ['checked']
                                )
                              ])
                            ],
                            8,
                            _hoisted_5$3
                          ))
                        ]),
                        _: 1
                      },
                      8,
                      ['items']
                    )
                  ])),
                  [[_directive_loading, unref(loading)]]
                )
              ])
            ]),
            _: 1
          },
          8,
          ['show']
        )
      )
    }
  }
})
const ContactModal = /* @__PURE__ */ _export_sfc(_sfc_main$b, [['__scopeId', 'data-v-2adb4045']])
const _hoisted_1$9 = { class: 'section border-top' }
const _hoisted_2$7 = { class: 'multi-title' }
const _hoisted_3$6 = { class: 'multi-group' }
const _hoisted_4$3 = { class: 'multi-group-item' }
const _hoisted_5$2 = { class: 'multi-group-item' }
const _hoisted_6$1 = { class: 'multi-group-item' }
const _hoisted_7$1 = { class: 'multi-group-item' }
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: 'MultiSelectFooter',
  props: {
    count: {}
  },
  emits: ['close', 'delete', 'forward'],
  setup(__props, { emit: __emit }) {
    const emit = __emit
    const isShowContactModal = ref(false)
    const forwardMode = ref(0)
    const onShowContactModal = (type) => {
      forwardMode.value = type
      isShowContactModal.value = true
    }
    const onClose = () => {
      emit('close')
    }
    const onMultiDelete = () => {
      emit('delete')
    }
    const onContactModal = (items) => {
      isShowContactModal.value = false
      emit('forward', forwardMode.value === 1 ? 'single' : 'merge', items)
    }
    return (_ctx, _cache) => {
      const _component_n_icon = NIcon
      return (
        openBlock(),
        createElementBlock(
          Fragment,
          null,
          [
            createBaseVNode('section', _hoisted_1$9, [
              createBaseVNode('div', _hoisted_2$7, [
                createBaseVNode(
                  'span',
                  null,
                  '已选中：' + toDisplayString(_ctx.count) + ' 条消息',
                  1
                )
              ]),
              createBaseVNode('div', _hoisted_3$6, [
                createBaseVNode('div', _hoisted_4$3, [
                  createBaseVNode(
                    'div',
                    {
                      class: 'multi-icon pointer flex-center',
                      onClick: _cache[0] || (_cache[0] = ($event) => onShowContactModal(2))
                    },
                    [
                      createVNode(
                        _component_n_icon,
                        {
                          size: 22,
                          component: unref(Share)
                        },
                        null,
                        8,
                        ['component']
                      )
                    ]
                  ),
                  _cache[3] || (_cache[3] = createBaseVNode('p', null, '合并转发', -1))
                ]),
                createBaseVNode('div', _hoisted_5$2, [
                  createBaseVNode(
                    'div',
                    {
                      class: 'multi-icon pointer flex-center',
                      onClick: _cache[1] || (_cache[1] = ($event) => onShowContactModal(1))
                    },
                    [
                      createVNode(
                        _component_n_icon,
                        {
                          size: 22,
                          component: unref(ShareThree)
                        },
                        null,
                        8,
                        ['component']
                      )
                    ]
                  ),
                  _cache[4] || (_cache[4] = createBaseVNode('p', null, '逐条转发', -1))
                ]),
                createBaseVNode('div', _hoisted_6$1, [
                  createBaseVNode(
                    'div',
                    {
                      class: 'multi-icon pointer flex-center',
                      onClick: onMultiDelete
                    },
                    [
                      createVNode(
                        _component_n_icon,
                        {
                          size: 22,
                          component: unref(IconDelete)
                        },
                        null,
                        8,
                        ['component']
                      )
                    ]
                  ),
                  _cache[5] || (_cache[5] = createBaseVNode('p', null, '批量删除', -1))
                ]),
                createBaseVNode('div', _hoisted_7$1, [
                  createBaseVNode(
                    'div',
                    {
                      class: 'multi-icon pointer flex-center',
                      onClick: onClose
                    },
                    [
                      createVNode(
                        _component_n_icon,
                        {
                          size: 22,
                          component: unref(Close)
                        },
                        null,
                        8,
                        ['component']
                      )
                    ]
                  ),
                  _cache[6] || (_cache[6] = createBaseVNode('p', null, '关闭', -1))
                ])
              ])
            ]),
            unref(isShowContactModal)
              ? (openBlock(),
                createBlock(ContactModal, {
                  key: 0,
                  onClose:
                    _cache[2] || (_cache[2] = ($event) => (isShowContactModal.value = false)),
                  onOnSubmit: onContactModal
                }))
              : createCommentVNode('', true)
          ],
          64
        )
      )
    }
  }
})
const MultiSelectFooter = /* @__PURE__ */ _export_sfc(_sfc_main$a, [
  ['__scopeId', 'data-v-a8c2b529']
])
function useContextMenu(chat) {
  const multiSelectCount = ref(0)
  const isShowMultiSelect = ref(false)
  const dialogueStore = useDialogueStore()
  const userStore = useUserStore()
  const { message } = useInject()
  const contextMenuOptions = (item) => {
    const options2 = []
    if ([1, 3].includes(item.msg_type)) {
      options2.push({ label: '复制', key: 'copy' })
    }
    if (
      Date.now() - new Date(item.send_time).getTime() < 2 * 60 * 1e3 &&
      item.from_id === userStore.uid
    ) {
      options2.push({ label: '撤回', key: 'revoke' })
    }
    options2.push({ label: '回复', key: 'quote' })
    options2.push({ label: '删除', key: 'delete' })
    options2.push({ label: '多选', key: 'multiSelect' })
    if ([3, 4, 5].includes(item.msg_type)) {
      options2.push({ label: '下载', key: 'download' })
    }
    if ([3].includes(item.msg_type)) {
      options2.push({ label: '收藏', key: 'collect' })
    }
    return options2
  }
  const onContextMenuEvent = (key, item) => {
    const evnets = {
      copy: onCopy,
      download: onDownload,
      quote: onQuote,
      revoke: onRevoke,
      multiSelect: onMultiSelect,
      delete: onDelete,
      collect: onCollectImage
    }
    evnets[key] && evnets[key](item)
  }
  const onCollectImage = (data) => {
    dialogueStore.collectImage({
      url: data.extra?.url
    })
  }
  const onQuote = (item) => {
    const data = {
      id: item.msg_id,
      title: `${item.nickname} ${item.send_time}`,
      describe: '',
      image: ''
    }
    switch (item.msg_type) {
      case 1:
        data.describe = item?.extra?.content
        break
      // 文本消息
      case 2:
        data.describe = '[代码消息]'
        break
      // 代码消息
      case 3:
        data.image = item.extra.url
        break
      // 图片文件
      case 4:
        data.describe = '[语音文件]'
        break
      // 语音文件
      case 5:
        data.describe = '[视频文件]'
        break
      // 视频文件
      case 6:
        data.describe = '[其它文件]'
        break
      // 其它文件
      case 7:
        data.describe = '[位置消息]'
        break
      // 位置消息
      case 8:
        data.describe = '[名片消息]'
        break
      // 名片消息
      case 9:
        data.describe = '[转发消息]'
        break
      // 转发消息
      case 10:
        data.describe = '[登录消息]'
        break
      // 登录消息
      case 11:
        data.describe = '[投票消息]'
        break
      // 投票消息
      case 12:
        data.describe = '[图文消息]'
        break
    }
    bus.emit('editor:quote', data)
  }
  const onCopy = (item) => {
    if (item.msg_type == 1) {
      if (item.extra.content && item.extra.content.length > 0) {
        return clipboard(htmlDecode(item.extra.content), () => message.success('复制成功'))
      }
    }
    if (item.extra?.url) {
      return clipboardImage(item.extra.url, () => {
        message.success('复制成功')
      })
    }
  }
  const onDownload = (item) => {
    if (item.msg_type == 3) {
      const filename = getFilenameFromUrl(item.extra?.url)
      return downloadImage(item.extra.url, filename || '文件')
    }
    if (item.msg_type == 4) {
      return message.info('音频暂不支持下载!')
    }
    if (item.msg_type == 5) {
      return message.info('视频暂不支持下载!')
    }
    return message.info('该类型文件暂不支持下载!')
  }
  const onRevoke = (item) => {
    dialogueStore.revokeRecord(item.msg_id)
    item.is_revoked = 1
  }
  const onDelete = (item) => {
    dialogueStore.deleteRecord([item.msg_id])
  }
  const onMultiSelect = (item) => {
    chat.value?.enableMultiSelect(true)
    chat.value?.setMultiSelect([item.msg_id])
  }
  const onCloseMultiSelect = () => {
    chat.value?.enableMultiSelect(false)
    isShowMultiSelect.value = false
  }
  const onMultiSelectDelete = () => {
    if (multiSelectCount.value == 0) {
      return message.info('请选择要删除的消息')
    }
    dialogueStore.deleteRecord(chat.value?.getMultiSelect())
    chat.value?.enableMultiSelect(false)
    isShowMultiSelect.value = false
  }
  const onChatElementSelect = (elements) => {
    isShowMultiSelect.value = true
    multiSelectCount.value = elements.length
  }
  const onMultiSelectForward = (mode, items) => {
    if (multiSelectCount.value == 0) {
      return message.info('请选择要转发的消息')
    }
    dialogueStore.forwardRecord({
      talk_mode: dialogueStore.target.talk_mode,
      to_from_id: dialogueStore.target.to_from_id,
      body: {
        action: mode == 'merge' ? 2 : 1,
        msg_ids: chat.value?.getMultiSelect(),
        user_ids: items.filter((item) => item.type == 1).map((item) => item.id),
        group_ids: items.filter((item) => item.type == 2).map((item) => item.id)
      }
    })
    chat.value?.enableMultiSelect(false)
    isShowMultiSelect.value = false
  }
  const MultiSelectComponent = defineComponent(() => {
    return () => {
      return h(MultiSelectFooter, {
        count: multiSelectCount.value,
        onClose: onCloseMultiSelect,
        onDelete: onMultiSelectDelete,
        onForward: onMultiSelectForward
      })
    }
  })
  return {
    multiSelectCount,
    isShowMultiSelect,
    contextMenuOptions,
    onContextMenuEvent,
    onChatElementSelect,
    MultiSelectComponent
  }
}
const _hoisted_1$8 = {
  class: 'el-container is-vertical',
  id: 'drawer-container'
}
const _hoisted_2$6 = { class: 'el-header border-bottom' }
const _hoisted_3$5 = { class: 'el-main' }
const _hoisted_4$2 = {
  class: 'el-footer',
  style: { height: '200px' }
}
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: 'Index',
  setup(__props) {
    const chat = useTemplateRef('chat')
    const userStore = useUserStore()
    const uploadsStore = useUploadsStore()
    const talkStore = useTalkStore()
    const router = useRouter()
    const { records, loadChatRecord, dialogueStore, resetTalkRecord } = useTalkRecord()
    const { toShowUserInfo } = useInject()
    const members = computed(() => dialogueStore.members)
    const isShowEditor = computed(() => dialogueStore.isShowEditor)
    const {
      isShowMultiSelect,
      contextMenuOptions,
      onContextMenuEvent,
      onChatElementSelect,
      MultiSelectComponent
    } = useContextMenu(chat)
    const talkParams = reactive({
      uid: computed(() => userStore.uid),
      indexName: computed(() => dialogueStore.index_name),
      talkMode: computed(() => dialogueStore.target.talk_mode),
      toFromId: computed(() => dialogueStore.target.to_from_id),
      username: computed(() => dialogueStore.target.username),
      description: computed(() => dialogueStore.target.description),
      keyboard: computed(() => dialogueStore.keyboard),
      num: computed(() => dialogueStore.members.length),
      online: false
    })
    const customMessageRender = (item) => formatChatMessage(talkParams.uid, item)
    function onElementClickUser(key, item) {
      if (key === 'nickname') {
        return (
          talkParams.talkMode == TalkModeEnum.Group &&
          bus.emit(EditorConst.Mention, {
            id: item.from_id,
            value: item.nickname
          })
        )
      } else {
        toShowUserInfo(item.from_id)
      }
    }
    const isShowGroupAside = ref(false)
    const isShowGroupNoticeAside = ref(false)
    const showGroupLaunch = ref({
      groupId: 0,
      isShowGroupLaunch: false
    })
    const events = {
      group: () => {
        isShowGroupAside.value = !isShowGroupAside.value
      },
      addGroup: () => {
        showGroupLaunch.value.groupId = 0
        if (talkParams.talkMode === TalkModeEnum.Group) {
          showGroupLaunch.value.groupId = talkParams.toFromId
        }
        showGroupLaunch.value.isShowGroupLaunch = true
      },
      announcement: () => {
        isShowGroupNoticeAside.value = !isShowGroupNoticeAside.value
      }
    }
    const onPanelHeaderEvent = (eventType) => {
      events[eventType]?.()
    }
    const onClearUnread = () => {
      dialogueStore.unreadBubble = 0
    }
    useEventBus([
      {
        name: SessionConst.Switch,
        event: () => {
          isShowGroupAside.value = false
        }
      }
    ])
    watch(
      () => talkParams.indexName,
      () => {
        resetTalkRecord()
        chat.value?.reload()
        loopGetOnlineStatus()
      },
      { immediate: true }
    )
    async function loopGetOnlineStatus() {
      if (talkParams.talkMode != TalkModeEnum.Single) {
        return
      }
      const { code, data } = await ServContactOnlineStatus({
        user_id: talkParams.toFromId
      })
      if (code === 200 && data) {
        talkParams.online = data.online_status == 'Y'
      }
    }
    let timer
    onMounted(() => {
      dialogueStore.container = chat.value?.getContainerId() || ''
      timer = setInterval(loopGetOnlineStatus, 2 * 60 * 1e3)
    })
    onUnmounted(() => {
      clearInterval(timer)
    })
    return (_ctx, _cache) => {
      const _component_n_drawer = __unplugin_components_0$2
      const _directive_dropsize = resolveDirective('dropsize')
      return (
        openBlock(),
        createElementBlock(
          Fragment,
          null,
          [
            createBaseVNode('section', _hoisted_1$8, [
              createBaseVNode('header', _hoisted_2$6, [
                createVNode(
                  PanelHeader,
                  {
                    'talk-mode': unref(talkParams).talkMode,
                    username: unref(talkParams).username,
                    online: unref(talkParams).online,
                    keyboard: unref(talkParams).keyboard,
                    num: unref(talkParams).num,
                    menu: unref(talkStore).isShowSessionMenu,
                    description: unref(talkParams).description,
                    onEvnet: onPanelHeaderEvent,
                    onChangeSessionMenu:
                      _cache[0] ||
                      (_cache[0] = (value) => {
                        unref(talkStore).isShowSessionMenu = value
                      })
                  },
                  null,
                  8,
                  ['talk-mode', 'username', 'online', 'keyboard', 'num', 'menu', 'description']
                )
              ]),
              createBaseVNode('main', _hoisted_3$5, [
                createVNode(
                  unref(ChatPlus),
                  {
                    ref_key: 'chat',
                    ref: chat,
                    items: unref(records),
                    'custom-render': customMessageRender,
                    'data-source-mode': 'pulldown',
                    onScrollLoadMore: unref(loadChatRecord),
                    unread: unref(dialogueStore).unreadBubble,
                    'multi-select-mode': true,
                    'context-menu': true,
                    'context-menu-option': unref(contextMenuOptions),
                    onContextMenuEvent: unref(onContextMenuEvent),
                    onElementSelect: unref(onChatElementSelect),
                    onElementEvent: unref(onContextMenuEvent),
                    onUserClickEvent: onElementClickUser,
                    onOnScrollToBottom: onClearUnread
                  },
                  null,
                  8,
                  [
                    'items',
                    'onScrollLoadMore',
                    'unread',
                    'context-menu-option',
                    'onContextMenuEvent',
                    'onElementSelect',
                    'onElementEvent'
                  ]
                )
              ]),
              withDirectives(
                (openBlock(),
                createElementBlock('footer', _hoisted_4$2, [
                  unref(isShowMultiSelect)
                    ? (openBlock(), createBlock(unref(MultiSelectComponent), { key: 0 }))
                    : (openBlock(),
                      createBlock(
                        _sfc_main$e,
                        {
                          key: 1,
                          uid: unref(talkParams).uid,
                          'index-name': unref(talkParams).indexName,
                          'talk-mode': unref(talkParams).talkMode,
                          'to-from-id': unref(talkParams).toFromId,
                          online: unref(talkParams).online,
                          members: unref(members)
                        },
                        null,
                        8,
                        ['uid', 'index-name', 'talk-mode', 'to-from-id', 'online', 'members']
                      ))
                ])),
                [
                  [vShow, unref(isShowEditor)],
                  [_directive_dropsize, { min: 100, max: 600, direction: 'top', key: 'editor' }]
                ]
              )
            ]),
            createVNode(
              _component_n_drawer,
              {
                show: unref(uploadsStore).isShow,
                'onUpdate:show':
                  _cache[1] || (_cache[1] = ($event) => (unref(uploadsStore).isShow = $event)),
                width: 400,
                placement: 'right',
                'trap-focus': false,
                'block-scroll': false,
                'show-mask': 'transparent',
                to: '#drawer-container'
              },
              {
                default: withCtx(() => [createVNode(UploadsModal)]),
                _: 1
              },
              8,
              ['show']
            ),
            createVNode(
              _sfc_main$d,
              {
                modelValue: unref(isShowGroupNoticeAside),
                'onUpdate:modelValue':
                  _cache[2] ||
                  (_cache[2] = ($event) =>
                    isRef(isShowGroupNoticeAside) ? (isShowGroupNoticeAside.value = $event) : null),
                'group-id': unref(talkParams).toFromId
              },
              null,
              8,
              ['modelValue', 'group-id']
            ),
            createVNode(
              _component_n_drawer,
              {
                show: unref(isShowGroupAside),
                'onUpdate:show':
                  _cache[4] ||
                  (_cache[4] = ($event) =>
                    isRef(isShowGroupAside) ? (isShowGroupAside.value = $event) : null),
                width: 400,
                placement: 'right',
                'show-mask': 'transparent',
                to: '#drawer-container'
              },
              {
                default: withCtx(() => [
                  createVNode(
                    GroupPanel,
                    {
                      'group-id': unref(talkParams).toFromId,
                      onClose:
                        _cache[3] || (_cache[3] = ($event) => (isShowGroupAside.value = false))
                    },
                    null,
                    8,
                    ['group-id']
                  )
                ]),
                _: 1
              },
              8,
              ['show']
            ),
            unref(showGroupLaunch).isShowGroupLaunch
              ? (openBlock(),
                createBlock(
                  GroupLaunch,
                  {
                    key: 0,
                    'group-id': unref(showGroupLaunch).groupId,
                    onClose:
                      _cache[5] ||
                      (_cache[5] = ($event) => (unref(showGroupLaunch).isShowGroupLaunch = false)),
                    onOnSubmit:
                      _cache[6] ||
                      (_cache[6] = (groupId) => {
                        unref(talkStore).toTalk(unref(TalkModeEnum).Group, groupId, unref(router))
                      })
                  },
                  null,
                  8,
                  ['group-id']
                ))
              : createCommentVNode('', true)
          ],
          64
        )
      )
    }
  }
})
const _sfc_main$8 = defineComponent({
  name: 'Xtime',
  props: {
    time: {
      type: String,
      default: '2022-03-06 21:20:00'
    }
  },
  setup(props) {
    let timeout = null
    const inTime = new Date(props.time.replace(/-/g, '/')).getTime()
    const text = ref('')
    const format = () => {
      clearTimeout(timeout)
      text.value = beautifyTime(props.time)
      if (/* @__PURE__ */ new Date().getTime() - inTime < 30 * 60 * 1e3) {
        timeout = setTimeout(format, 60 * 1e3)
      }
    }
    watch(props, format)
    onUnmounted(() => {
      clearTimeout(timeout)
    })
    format()
    return () => h('span', [text.value])
  }
})
const _hoisted_1$7 = { class: 'talk-item-avatar' }
const _hoisted_2$5 = { class: 'talk-item-content' }
const _hoisted_3$4 = { class: 'header' }
const _hoisted_4$1 = { class: 'title' }
const _hoisted_5$1 = { class: 'nickname' }
const _hoisted_6 = { class: 'badge top' }
const _hoisted_7 = { class: 'badge roboot' }
const _hoisted_8 = { class: 'badge group' }
const _hoisted_9 = { class: 'datetime' }
const _hoisted_10 = { class: 'content' }
const _hoisted_11 = { class: 'text' }
const _hoisted_12 = ['innerHTML']
const _hoisted_13 = ['innerHTML']
const _hoisted_14 = { class: 'tip' }
const _hoisted_15 = {
  key: 0,
  class: 'disturb'
}
const _hoisted_16 = {
  key: 1,
  class: 'unread'
}
const _hoisted_17 = { class: 'badge' }
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: 'TalkItem',
  props: {
    data: {},
    avatar: {},
    username: {},
    active: {}
  },
  emits: ['tab-talk', 'top-talk'],
  setup(__props, { emit: __emit }) {
    const emit = __emit
    return (_ctx, _cache) => {
      const _component_im_avatar = resolveComponent('im-avatar')
      const _component_n_icon = NIcon
      return (
        openBlock(),
        createElementBlock(
          'div',
          {
            class: normalizeClass(['talk-item pointer', { actived: _ctx.active }]),
            onClick: _cache[1] || (_cache[1] = ($event) => emit('tab-talk', _ctx.data))
          },
          [
            createBaseVNode('div', _hoisted_1$7, [
              createVNode(
                _component_im_avatar,
                {
                  src: _ctx.avatar,
                  size: 34,
                  username: _ctx.data.name
                },
                null,
                8,
                ['src', 'username']
              ),
              createBaseVNode(
                'div',
                {
                  class: 'top-mask',
                  onClick:
                    _cache[0] ||
                    (_cache[0] = withModifiers(($event) => emit('top-talk', _ctx.data), ['stop']))
                },
                [
                  createVNode(
                    _component_n_icon,
                    {
                      component: _ctx.data.is_top === 1 ? unref(ArrowDown) : unref(ArrowUp)
                    },
                    null,
                    8,
                    ['component']
                  )
                ]
              )
            ]),
            createBaseVNode('div', _hoisted_2$5, [
              createBaseVNode('div', _hoisted_3$4, [
                createBaseVNode('div', _hoisted_4$1, [
                  createBaseVNode('span', _hoisted_5$1, toDisplayString(_ctx.username), 1),
                  withDirectives(createBaseVNode('span', _hoisted_6, '顶', 512), [
                    [vShow, _ctx.data.is_top === 1]
                  ]),
                  withDirectives(createBaseVNode('span', _hoisted_7, '助', 512), [
                    [vShow, _ctx.data.is_robot === 1]
                  ]),
                  withDirectives(createBaseVNode('span', _hoisted_8, '群', 512), [
                    [vShow, _ctx.data.talk_mode === 2]
                  ])
                ]),
                createBaseVNode('div', _hoisted_9, [
                  createVNode(
                    _sfc_main$8,
                    {
                      time: _ctx.data.updated_at
                    },
                    null,
                    8,
                    ['time']
                  )
                ])
              ]),
              createBaseVNode('div', _hoisted_10, [
                createBaseVNode('div', _hoisted_11, [
                  !_ctx.active && _ctx.data.draft_text
                    ? (openBlock(),
                      createElementBlock(
                        Fragment,
                        { key: 0 },
                        [
                          _cache[2] ||
                            (_cache[2] = createBaseVNode('span', { class: 'draft' }, '[草稿]', -1)),
                          createBaseVNode(
                            'span',
                            {
                              class: 'detail',
                              innerHTML: _ctx.data.draft_text
                            },
                            null,
                            8,
                            _hoisted_12
                          )
                        ],
                        64
                      ))
                    : (openBlock(),
                      createElementBlock(
                        'span',
                        {
                          key: 1,
                          class: 'detail',
                          innerHTML: _ctx.data.msg_text
                        },
                        null,
                        8,
                        _hoisted_13
                      ))
                ]),
                createBaseVNode('div', _hoisted_14, [
                  _ctx.data.is_disturb === 1
                    ? (openBlock(),
                      createElementBlock('div', _hoisted_15, [
                        createVNode(_component_n_icon, { component: unref(CloseRemind) }, null, 8, [
                          'component'
                        ])
                      ]))
                    : withDirectives(
                        (openBlock(),
                        createElementBlock(
                          'div',
                          _hoisted_16,
                          [
                            createBaseVNode(
                              'span',
                              _hoisted_17,
                              toDisplayString(
                                _ctx.data.unread_num > 99 ? '99+' : _ctx.data.unread_num
                              ),
                              1
                            )
                          ],
                          512
                        )),
                        [[vShow, _ctx.data.unread_num]]
                      )
                ])
              ])
            ])
          ],
          2
        )
      )
    }
  }
})
const TalkItem = /* @__PURE__ */ _export_sfc(_sfc_main$7, [['__scopeId', 'data-v-2f469403']])
const _sfc_main$6 = {}
const _hoisted_1$6 = { class: 'avatar' }
const _hoisted_2$4 = { class: 'content' }
function _sfc_render(_ctx, _cache) {
  const _component_n_skeleton = __unplugin_components_0
  return (
    openBlock(),
    createElementBlock(
      Fragment,
      null,
      renderList(20, (i) => {
        return createBaseVNode(
          'div',
          {
            class: 'skeleton flex-center',
            key: i
          },
          [
            createBaseVNode('div', _hoisted_1$6, [
              createVNode(_component_n_skeleton, {
                circle: '',
                size: 'medium'
              })
            ]),
            createBaseVNode('div', _hoisted_2$4, [
              createVNode(_component_n_skeleton, {
                text: '',
                repeat: 1
              }),
              createVNode(_component_n_skeleton, {
                text: '',
                style: { width: '60%' }
              })
            ])
          ]
        )
      }),
      64
    )
  )
}
const Skeleton = /* @__PURE__ */ _export_sfc(_sfc_main$6, [
  ['render', _sfc_render],
  ['__scopeId', 'data-v-fdaae81c']
])
const _hoisted_1$5 = { class: 'el-header tabs-header' }
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: 'TabsHeader',
  props: {
    modelValue: {},
    modelModifiers: {}
  },
  emits: ['update:modelValue'],
  setup(__props) {
    const talkStore = useTalkStore()
    const tabIndex = useModel(__props, 'modelValue')
    const tabs = ref([
      {
        name: '全部',
        value: computed(() => {
          return talkStore.items.length
        })
      },
      {
        name: '好友',
        value: computed(() => {
          return talkStore.friendItems.length
        })
      },
      {
        name: '群聊',
        value: computed(() => {
          return talkStore.groupItems.length
        })
      },
      {
        name: '未读',
        value: computed(() => {
          return talkStore.unreadItems.length
        })
      }
    ])
    const onChange = (index2) => {
      tabIndex.value = index2
    }
    return (_ctx, _cache) => {
      const _component_n_tag = NTag
      const _component_n_space = __unplugin_components_1
      return (
        openBlock(),
        createElementBlock('header', _hoisted_1$5, [
          createVNode(
            _component_n_space,
            {
              class: 'tabs',
              style: { 'flex-flow': 'nowrap' }
            },
            {
              default: withCtx(() => [
                (openBlock(true),
                createElementBlock(
                  Fragment,
                  null,
                  renderList(unref(tabs), (tab, index2) => {
                    return (
                      openBlock(),
                      createBlock(
                        _component_n_tag,
                        {
                          bordered: false,
                          type: tabIndex.value == index2 ? 'primary' : 'default',
                          size: 'small',
                          class: 'pointer',
                          round: '',
                          key: tab.name,
                          onClick: ($event) => onChange(index2)
                        },
                        {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(tab.name), 1),
                            createBaseVNode('span', null, ' ' + toDisplayString(tab.value), 1)
                          ]),
                          _: 2
                        },
                        1032,
                        ['type', 'onClick']
                      )
                    )
                  }),
                  128
                ))
              ]),
              _: 1
            }
          )
        ])
      )
    }
  }
})
const TabsHeader = /* @__PURE__ */ _export_sfc(_sfc_main$5, [['__scopeId', 'data-v-0f86698c']])
const _hoisted_1$4 = { class: 'el-header top-header' }
const _hoisted_2$3 = ['onClick']
const _hoisted_3$3 = { class: 'icon-mark robot' }
const _hoisted_4 = { class: 'icon-mark group' }
const _hoisted_5 = { class: 'text' }
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: 'TopHeader',
  props: {
    indexName: {},
    items: {}
  },
  emits: ['tab-talk'],
  setup(__props, { emit: __emit }) {
    const emit = __emit
    return (_ctx, _cache) => {
      const _component_im_avatar = resolveComponent('im-avatar')
      const _component_n_popover = __unplugin_components_3
      return (
        openBlock(),
        createElementBlock('header', _hoisted_1$4, [
          (openBlock(true),
          createElementBlock(
            Fragment,
            null,
            renderList(_ctx.items, (item) => {
              return (
                openBlock(),
                createBlock(
                  _component_n_popover,
                  {
                    key: item.index_name,
                    placement: 'bottom',
                    trigger: 'hover'
                  },
                  {
                    trigger: withCtx(() => [
                      createBaseVNode(
                        'div',
                        {
                          class: normalizeClass([
                            'top-item pointer',
                            {
                              active: item.index_name == _ctx.indexName
                            }
                          ]),
                          onClick: ($event) => emit('tab-talk', item)
                        },
                        [
                          createVNode(
                            _component_im_avatar,
                            {
                              src: item.avatar,
                              size: 34,
                              username: item.name
                            },
                            null,
                            8,
                            ['src', 'username']
                          ),
                          withDirectives(createBaseVNode('span', _hoisted_3$3, ' 助 ', 512), [
                            [vShow, item.is_robot === 1]
                          ]),
                          withDirectives(createBaseVNode('span', _hoisted_4, ' 群 ', 512), [
                            [vShow, item.talk_mode == 2]
                          ]),
                          createBaseVNode(
                            'span',
                            _hoisted_5,
                            toDisplayString(item.remark || item.name),
                            1
                          )
                        ],
                        10,
                        _hoisted_2$3
                      )
                    ]),
                    default: withCtx(() => [
                      createBaseVNode('span', null, toDisplayString(item.remark || item.name), 1)
                    ]),
                    _: 2
                  },
                  1024
                )
              )
            }),
            128
          ))
        ])
      )
    }
  }
})
const TopHeader = /* @__PURE__ */ _export_sfc(_sfc_main$4, [['__scopeId', 'data-v-37433f2d']])
const _hoisted_1$3 = { class: 'el-header search-header' }
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: 'SearchHeader',
  props: /* @__PURE__ */ mergeModels(
    {
      options: {}
    },
    {
      modelValue: {},
      modelModifiers: {}
    }
  ),
  emits: /* @__PURE__ */ mergeModels(['on-select', 'on-keyword'], ['update:modelValue']),
  setup(__props, { emit: __emit }) {
    const modelValue = useModel(__props, 'modelValue')
    const emit = __emit
    const onKeywordChange = () => {
      emit('on-keyword', modelValue.value)
    }
    const onToolsMenu = (value) => {
      emit('on-select', value)
    }
    return (_ctx, _cache) => {
      const _component_n_icon = NIcon
      const _component_n_input = __unplugin_components_1$1
      const _component_n_button = Button
      const _component_n_dropdown = __unplugin_components_2$3
      return (
        openBlock(),
        createElementBlock('header', _hoisted_1$3, [
          createVNode(
            _component_n_input,
            {
              placeholder: '搜索好友 / 群聊',
              'on-input': onKeywordChange,
              value: modelValue.value,
              'onUpdate:value': _cache[0] || (_cache[0] = ($event) => (modelValue.value = $event)),
              valueModifiers: { trim: true },
              round: '',
              clearable: ''
            },
            {
              prefix: withCtx(() => [
                createVNode(_component_n_icon, { component: unref(Search) }, null, 8, ['component'])
              ]),
              _: 1
            },
            8,
            ['value']
          ),
          createVNode(
            _component_n_dropdown,
            {
              animated: true,
              trigger: 'hover',
              'show-arrow': true,
              onSelect: onToolsMenu,
              options: _ctx.options
            },
            {
              default: withCtx(() => [
                createVNode(
                  _component_n_button,
                  {
                    circle: '',
                    style: { 'margin-left': '10px' }
                  },
                  {
                    icon: withCtx(() => [
                      createVNode(_component_n_icon, { component: unref(Plus) }, null, 8, [
                        'component'
                      ])
                    ]),
                    _: 1
                  }
                )
              ]),
              _: 1
            },
            8,
            ['options']
          )
        ])
      )
    }
  }
})
const SearchHeader = /* @__PURE__ */ _export_sfc(_sfc_main$3, [['__scopeId', 'data-v-223aa4d4']])
function useSessionMenu() {
  const dialogueStore = useDialogueStore()
  const talkStore = useTalkStore()
  const { message, toShowUserInfo } = useInject()
  const { onDeleteContact: onDeleteContact2, onChangeContactRemark } = useContact()
  const { onSignOutGroup: onSignOutGroup2 } = useGroup()
  const { menu, ContextMenuElement } = useCommonContextMenu(onContextMenuTalkHandle)
  const indexName = computed(() => dialogueStore.index_name)
  const onContextMenu = (e, item) => {
    const options2 = []
    if (item.talk_mode === 1 && item.is_robot !== 1) {
      options2.push({
        icon: renderIcon(IdCard),
        label: '好友信息',
        key: 'info'
      })
      options2.push({
        icon: renderIcon(EditTwo),
        label: '修改备注',
        key: 'remark'
      })
    }
    options2.push({
      icon: renderIcon(item.is_top === 1 ? ArrowDown : ArrowUp),
      label: item.is_top === 1 ? '取消置顶' : '会话置顶',
      key: 'top'
    })
    options2.push({
      icon: renderIcon(item.is_disturb === 1 ? CloseRemind : Remind),
      label: item.is_disturb === 1 ? '关闭免打扰' : '开启免打扰',
      key: 'disturb'
    })
    options2.push({
      type: 'divider'
    })
    if (item.talk_mode == 1 && item.is_robot !== 1) {
      options2.push({
        icon: renderIcon(IconDelete),
        label: '删除好友',
        key: 'delete_contact'
      })
    }
    if (item.talk_mode === 2) {
      options2.push({
        icon: renderIcon(IconDelete),
        label: '退出群聊',
        key: 'signout_group'
      })
    }
    options2.push({
      icon: renderIcon(Clear),
      label: '移除会话',
      key: 'remove'
    })
    options2 && menu.show(e, options2, item)
  }
  const onDeleteTalk = (index_name = '') => {
    talkStore.delItem(index_name)
    index_name === indexName.value && dialogueStore.$reset()
  }
  const onUserInfo = (item) => {
    toShowUserInfo(item.to_from_id)
  }
  const onRemoveTalk = async (item) => {
    const { code } = await ServTalkDelete({
      talk_mode: item.talk_mode,
      to_from_id: item.to_from_id
    })
    if (code == 200) {
      onDeleteTalk(item.index_name)
    }
  }
  const onSetDisturb = async (item) => {
    const { code } = await ServTalkDisturb({
      talk_mode: item.talk_mode,
      to_from_id: item.to_from_id,
      action: item.is_disturb === 2 ? 1 : 2
    })
    if (code == 200) {
      talkStore.updateItem({
        index_name: item.index_name,
        is_disturb: item.is_disturb === 1 ? 2 : 1
      })
    }
  }
  const onToTopTalk = async (item) => {
    if (item.is_top === 2 && talkStore.topItems.length >= 18) {
      return message.warning('置顶最多不能超过18个会话')
    }
    const { code } = await ServTalkTopping({
      talk_mode: item.talk_mode,
      to_from_id: item.to_from_id,
      action: item.is_top === 2 ? 1 : 2
    })
    if (code == 200) {
      talkStore.updateItem({
        index_name: item.index_name,
        is_top: item.is_top === 1 ? 2 : 1
      })
    }
  }
  const onDeleteContact = (item) => {
    onDeleteContact2(
      {
        user_id: item.to_from_id,
        nickname: item.name,
        remark: item.remark
      },
      () => {
        onDeleteTalk(item.index_name)
      }
    )
  }
  const onSignOutGroup = (item) => {
    onSignOutGroup2(
      {
        group_id: item.to_from_id,
        name: item.name
      },
      () => {
        onDeleteTalk(item.index_name)
      }
    )
  }
  const onChangeRemark = (item) => {
    onChangeContactRemark(
      {
        user_id: item.to_from_id,
        remark: item.remark
      },
      ({ remark }) => {
        talkStore.updateItem({
          index_name: item.index_name,
          remark
        })
      }
    )
  }
  const evnets = {
    info: onUserInfo,
    top: onToTopTalk,
    remove: onRemoveTalk,
    disturb: onSetDisturb,
    signout_group: onSignOutGroup,
    delete_contact: onDeleteContact,
    remark: onChangeRemark
  }
  function onContextMenuTalkHandle(key, _) {
    const item = menu.getItem()
    evnets[key] && evnets[key](item)
  }
  return { onContextMenu, ContextMenuElement, onToTopTalk }
}
const _hoisted_1$2 = { class: 'el-container container is-vertical height100' }
const _hoisted_2$2 = { class: 'el-main' }
const _hoisted_3$2 = {
  key: 1,
  class: 'empty-box'
}
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: 'Index',
  setup(__props) {
    const { ContextMenuElement, onContextMenu, onToTopTalk } = useSessionMenu()
    const dialogueStore = useDialogueStore()
    const talkStore = useTalkStore()
    const selectIndex = ref(0)
    const isShowGroup = ref(false)
    const isShowUserSearch = ref(false)
    const searchKeyword = ref('')
    const virtualListInst = ref()
    const items = computed(() => {
      if (searchKeyword.value.length === 0) {
        switch (selectIndex.value) {
          case 1:
            return talkStore.friendItems
          case 2:
            return talkStore.groupItems
          case 3:
            return talkStore.unreadItems
          default:
            return talkStore.items
        }
      }
      return talkStore.items.filter((item) => {
        const keyword = item.remark || item.name
        return keyword.toLowerCase().includes(searchKeyword.value.toLowerCase())
      })
    })
    const loadStatus = computed(() => talkStore.loadStatus)
    const indexName = computed(() => dialogueStore.index_name)
    const onTabTalk = (item, follow = false) => {
      if (item.index_name === indexName.value) return
      const data = { talk_mode: item.talk_mode, to_from_id: item.to_from_id }
      bus.emit(SessionConst.Switch, data)
      searchKeyword.value = ''
      dialogueStore.setDialogue(item)
      if (item.unread_num > 0) {
        talkStore.clearUnreadNum(item.index_name)
        ServTalkClearUnread(data)
      }
      if (follow) scrollToItem(item)
    }
    const scrollToItem = (item) => {
      if (selectIndex.value != 0) return
      const index2 = items.value.findIndex((i) => i.index_name === item.index_name)
      if (index2 == -1) return
      virtualListInst.value?.scrollTo({
        top: index2 * 66,
        behavior: 'smooth'
      })
    }
    const onKeywordChange = () => {
      selectIndex.value = 0
    }
    const onGroupLaunchCreate = (groupId, groupName) => {
      const item = formatTalkItem({
        talk_mode: 2,
        to_from_id: groupId,
        name: groupName
      })
      talkStore.addItem(item)
    }
    const onInitialize = () => {
      const index_name = getCacheIndexName()
      if (index_name) {
        const item = talkStore.findItem(index_name)
        item && onTabTalk(item)
      }
    }
    onBeforeRouteUpdate(onInitialize)
    onMounted(() => {
      talkStore.loadTalkList()
      onInitialize()
    })
    useEventBus([
      {
        name: 'talk-session-scroll',
        event: (data) => {
          data && virtualListInst.value?.scrollTo(data)
        }
      }
    ])
    return (_ctx, _cache) => {
      const _component_n_empty = NEmpty
      const _component_n_virtual_list = __unplugin_components_1$2
      return (
        openBlock(),
        createElementBlock(
          Fragment,
          null,
          [
            createVNode(unref(ContextMenuElement)),
            createBaseVNode('section', _hoisted_1$2, [
              createVNode(
                SearchHeader,
                {
                  modelValue: unref(searchKeyword),
                  'onUpdate:modelValue':
                    _cache[0] ||
                    (_cache[0] = ($event) =>
                      isRef(searchKeyword) ? (searchKeyword.value = $event) : null),
                  onOnKeyword: onKeywordChange,
                  options: [
                    {
                      label: '添加好友',
                      key: 'friend'
                    },
                    {
                      label: '创建群聊',
                      key: 'create-group'
                    }
                  ],
                  onOnSelect:
                    _cache[1] ||
                    (_cache[1] = (value) => {
                      switch (value) {
                        case 'friend':
                          isShowUserSearch.value = true
                          break
                        case 'create-group':
                          isShowGroup.value = true
                          break
                      }
                    })
                },
                null,
                8,
                ['modelValue']
              ),
              withDirectives(
                createVNode(
                  TopHeader,
                  {
                    'index-name': unref(indexName),
                    items: unref(talkStore).topItems,
                    onTabTalk: _cache[2] || (_cache[2] = (value) => onTabTalk(value, true))
                  },
                  null,
                  8,
                  ['index-name', 'items']
                ),
                [[vShow, unref(loadStatus) === 3 && unref(talkStore).topItems.length > 0]]
              ),
              withDirectives(
                createVNode(
                  TabsHeader,
                  {
                    modelValue: unref(selectIndex),
                    'onUpdate:modelValue':
                      _cache[3] ||
                      (_cache[3] = ($event) =>
                        isRef(selectIndex) ? (selectIndex.value = $event) : null)
                  },
                  null,
                  8,
                  ['modelValue']
                ),
                [[vShow, unref(loadStatus) === 3]]
              ),
              createBaseVNode('main', _hoisted_2$2, [
                unref(loadStatus) === 2
                  ? (openBlock(), createBlock(Skeleton, { key: 0 }))
                  : !unref(items).length
                    ? (openBlock(),
                      createElementBlock('div', _hoisted_3$2, [
                        createVNode(_component_n_empty, { description: '暂无会话' })
                      ]))
                    : (openBlock(),
                      createBlock(
                        _component_n_virtual_list,
                        {
                          key: 2,
                          ref_key: 'virtualListInst',
                          ref: virtualListInst,
                          style: { 'max-height': 'inherit', cursor: 'pointer' },
                          'item-size': 66,
                          items: unref(items)
                        },
                        {
                          default: withCtx(({ item }) => [
                            (openBlock(),
                            createBlock(
                              TalkItem,
                              {
                                key: item.index_name,
                                data: item,
                                avatar: item.avatar,
                                username: item.remark || item.name,
                                active: item.index_name === unref(indexName),
                                onTabTalk,
                                onTopTalk: unref(onToTopTalk),
                                onContextmenu: withModifiers(
                                  ($event) => unref(onContextMenu)($event, item),
                                  ['prevent']
                                )
                              },
                              null,
                              8,
                              ['data', 'avatar', 'username', 'active', 'onTopTalk', 'onContextmenu']
                            ))
                          ]),
                          _: 1
                        },
                        8,
                        ['items']
                      ))
              ]),
              createVNode(
                _sfc_main$n,
                {
                  show: unref(isShowUserSearch),
                  'onUpdate:show':
                    _cache[4] ||
                    (_cache[4] = ($event) =>
                      isRef(isShowUserSearch) ? (isShowUserSearch.value = $event) : null)
                },
                null,
                8,
                ['show']
              ),
              unref(isShowGroup)
                ? (openBlock(),
                  createBlock(GroupLaunch, {
                    key: 0,
                    'group-id': 0,
                    onClose: _cache[5] || (_cache[5] = ($event) => (isShowGroup.value = false)),
                    onOnSubmit: onGroupLaunchCreate
                  }))
                : createCommentVNode('', true)
            ])
          ],
          64
        )
      )
    }
  }
})
const Sider = /* @__PURE__ */ _export_sfc(_sfc_main$2, [['__scopeId', 'data-v-f38c476d']])
const Welcome = '' + new URL('welcome-CcyznynA.svg', import.meta.url).href
const _hoisted_1$1 = { class: 'amicable flex-center' }
const _hoisted_2$1 = { class: 'content' }
const _hoisted_3$1 = ['src']
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: 'amicable',
  setup(__props) {
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock('div', _hoisted_1$1, [
          createBaseVNode('div', _hoisted_2$1, [
            createBaseVNode('img', { src: unref(Welcome) }, null, 8, _hoisted_3$1),
            _cache[0] || (_cache[0] = createBaseVNode('p', null, 'LumenIM 欢迎您(*^__^*)', -1))
          ])
        ])
      )
    }
  }
})
const Amicable = /* @__PURE__ */ _export_sfc(_sfc_main$1, [['__scopeId', 'data-v-24ab5c4c']])
const _hoisted_1 = { class: 'el-container' }
const _hoisted_2 = { class: 'el-aside aside-session border-right' }
const _hoisted_3 = { class: 'el-main' }
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'index',
  setup(__props) {
    const dialogueStore = useDialogueStore()
    const talkStore = useTalkStore()
    const indexName = computed(() => dialogueStore.index_name)
    onUnmounted(() => {
      dialogueStore.$reset()
      talkStore.isShowSessionMenu = true
    })
    return (_ctx, _cache) => {
      const _directive_dropsize = resolveDirective('dropsize')
      return (
        openBlock(),
        createElementBlock('section', _hoisted_1, [
          withDirectives(
            (openBlock(), createElementBlock('aside', _hoisted_2, [createVNode(Sider)])),
            [
              [vShow, unref(talkStore).isShowSessionMenu],
              [
                _directive_dropsize,
                {
                  min: 200,
                  max: 500,
                  direction: 'right',
                  key: 'aside-session'
                }
              ]
            ]
          ),
          createBaseVNode('main', _hoisted_3, [
            (openBlock(),
            createBlock(resolveDynamicComponent(unref(indexName) ? _sfc_main$9 : Amicable)))
          ])
        ])
      )
    }
  }
})
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [['__scopeId', 'data-v-3a195e9f']])
export { index as default }
