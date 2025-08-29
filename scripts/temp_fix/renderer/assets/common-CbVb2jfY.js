import { u as useDebounceFn, c as useThrottleFn } from './index-88uWzgFD.js'
import { u as h, N as NIcon } from './index-CP-MMhae.js'
const debounce = useDebounceFn
const throttle = useThrottleFn
function clipboard(text, callback) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      callback && callback()
    })
    .catch(() => {
      alert('Oops, unable to copy')
    })
}
async function clipboardImage(src, callback) {
  try {
    const data = await fetch(src)
    const blob = await data.blob()
    if (blob.type == 'image/png') {
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob
        })
      ])
      return callback()
    }
    const objectURL = URL.createObjectURL(blob)
    const img = new Image()
    img.src = objectURL
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      canvas.width = img.width
      canvas.height = img.height
      ctx?.drawImage(img, 0, 0, canvas.width, canvas.height)
      canvas.toBlob(
        async (blob2) => {
          URL.revokeObjectURL(objectURL)
          if (!blob2) return
          await navigator.clipboard.write([
            new ClipboardItem({
              [blob2.type]: blob2
            })
          ])
          callback()
        },
        'image/png',
        1
      )
    }
  } catch (err) {
    console.error(err)
  }
}
function htmlDecode(input) {
  return input
    .replace(/&amp;/g, '&')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#34;/g, '"')
}
const renderIcon = (icon) => {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon)
    })
  }
}
function getExploreName(userAgent = '') {
  if (userAgent.indexOf('Opera') > -1 || userAgent.indexOf('OPR') > -1) {
    return 'Opera'
  } else if (userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1) {
    return 'IE'
  } else if (userAgent.indexOf('Edge') > -1) {
    return 'Edge'
  } else if (userAgent.indexOf('Firefox') > -1) {
    return 'Firefox'
  } else if (userAgent.indexOf('Safari') > -1 && userAgent.indexOf('Chrome') == -1) {
    return 'Safari'
  } else if (userAgent.indexOf('Chrome') > -1 && userAgent.indexOf('Safari') > -1) {
    return 'Chrome'
  } else {
    return 'Unkonwn'
  }
}
function getExploreOs(userAgent = '') {
  if (userAgent.indexOf('Mac OS') > -1) {
    return 'Mac OS'
  } else {
    return 'Windows'
  }
}
export {
  clipboardImage as a,
  getExploreOs as b,
  clipboard as c,
  debounce as d,
  getExploreName as g,
  htmlDecode as h,
  renderIcon as r,
  throttle as t
}
