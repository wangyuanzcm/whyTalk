/**
 * 颜色工具函数
 * 基于 lx-music-desktop 的颜色处理算法
 */

/**
 * 线性混合两种颜色
 * @param p 混合百分比 范围 0.0 - 1.0
 * @param c0 rgb(a) color1
 * @param c1 rgb(a) color2
 * @returns 混合后的颜色
 */
export function rgbLinearBlend(p: number, c0: string, c1: string): string {
  const i = parseInt
  const r = Math.round
  const P = 1 - p
  const [a, b, c, d] = c0.split(',')
  const [e, f, g, h] = c1.split(',')
  const x = d || h
  const j = x ? ',' + (!d ? h : !h ? d : r((parseFloat(d) * P + parseFloat(h) * p) * 1000) / 1000 + ')') : ')'
  
  return 'rgb' + (x ? 'a(' : '(') + 
    r(i(a[3] === 'a' ? a.slice(5) : a.slice(4)) * P + i(e[3] === 'a' ? e.slice(5) : e.slice(4)) * p) + ',' +
    r(i(b) * P + i(f) * p) + ',' +
    r(i(c) * P + i(g) * p) + j
}

/**
 * 对数混合两种颜色
 * @param p 混合百分比 范围 0.0 - 1.0
 * @param c0 rgb(a) color1
 * @param c1 rgb(a) color2
 * @returns 混合后的颜色
 */
export function rgbLogBlend(p: number, c0: string, c1: string): string {
  const i = parseInt
  const r = Math.round
  const P = 1 - p
  const [a, b, c, d] = c0.split(',')
  const [e, f, g, h] = c1.split(',')
  const x = d || h
  const j = x ? ',' + (!d ? h : !h ? d : r((parseFloat(d) * P + parseFloat(h) * p) * 1000) / 1000 + ')') : ')'
  
  return 'rgb' + (x ? 'a(' : '(') +
    r((P * i(a[3] === 'a' ? a.slice(5) : a.slice(4)) ** 2 + p * i(e[3] === 'a' ? e.slice(5) : e.slice(4)) ** 2) ** 0.5) + ',' +
    r((P * i(b) ** 2 + p * i(f) ** 2) ** 0.5) + ',' +
    r((P * i(c) ** 2 + p * i(g) ** 2) ** 0.5) + j
}

/**
 * 线性调整颜色明暗度
 * @param p Shade 百分比范围为 -1.0 - 1.0 负为黑色，正为白色
 * @param c0 rgb(a) color
 * @returns 调整后的颜色
 */
export function rgbLinearShade(p: number, c0: string): string {
  const i = parseInt
  const r = Math.round
  const [a, b, c, d] = c0.split(',')
  const n = p < 0
  const t = n ? 0 : 255 * p
  const P = n ? 1 + p : 1 - p
  
  return 'rgb' + (d ? 'a(' : '(') +
    r(i(a[3] === 'a' ? a.slice(5) : a.slice(4)) * P + t) + ',' +
    r(i(b) * P + t) + ',' +
    r(i(c) * P + t) + (d ? ',' + d : ')')
}

/**
 * 对数调整颜色明暗度
 * @param p Shade 百分比范围为 -1.0 - 1.0 负为黑色，正为白色
 * @param c0 rgb(a) color
 * @returns 调整后的颜色
 */
export function rgbLogShade(p: number, c0: string): string {
  const i = parseInt
  const r = Math.round
  const [a, b, c, d] = c0.split(',')
  const n = p < 0
  const t = n ? 0 : p * 255 ** 2
  const P = n ? 1 + p : 1 - p
  
  return 'rgb' + (d ? 'a(' : '(') +
    r((P * i(a[3] === 'a' ? a.slice(5) : a.slice(4)) ** 2 + t) ** 0.5) + ',' +
    r((P * i(b) ** 2 + t) ** 0.5) + ',' +
    r((P * i(c) ** 2 + t) ** 0.5) + (d ? ',' + d : ')')
}

/**
 * 修改颜色透明度
 * @param p 透明度 0.0 - 1.0
 * @param color rgb(a) 颜色字符串
 * @returns 修改透明度后的颜色
 */
export function rgbAlphaShade(p: number, color: string): string {
  const i = parseInt
  const [r, g, b, a] = color.split(',')
  const red = r[3] === 'a' ? r.slice(5) : r.slice(4)
  
  let alpha: number
  if (a) {
    alpha = parseFloat(a)
    alpha = p
  } else {
    alpha = p
  }
  
  alpha = Math.min(1, Math.max(0, alpha))
  
  return `rgba(${i(red)}, ${i(g)}, ${i(b)}, ${alpha.toFixed(2)})`
}

/**
 * 解析 RGB 颜色字符串
 * @param color rgb(a) 颜色字符串
 * @returns 颜色分量对象
 */
export function parseRgbColor(color: string): { r: number; g: number; b: number; a?: number } {
  const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/)
  if (!match) {
    throw new Error(`Invalid color format: ${color}`)
  }
  
  const [, r, g, b, a] = match
  return {
    r: parseInt(r),
    g: parseInt(g),
    b: parseInt(b),
    ...(a !== undefined && { a: parseFloat(a) })
  }
}

/**
 * 将颜色分量转换为 RGB 字符串
 * @param r 红色分量 0-255
 * @param g 绿色分量 0-255
 * @param b 蓝色分量 0-255
 * @param a 透明度 0-1 (可选)
 * @returns rgb(a) 颜色字符串
 */
export function toRgbString(r: number, g: number, b: number, a?: number): string {
  if (a !== undefined) {
    return `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${a.toFixed(2)})`
  }
  return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`
}

/**
 * 验证颜色字符串格式
 * @param color 颜色字符串
 * @returns 是否为有效的 rgb(a) 格式
 */
export function isValidRgbColor(color: string): boolean {
  return /^rgba?\(\d+,\s*\d+,\s*\d+(?:,\s*[\d.]+)?\)$/.test(color)
}

/**
 * 计算颜色亮度
 * @param color rgb 颜色字符串
 * @returns 亮度值 0-255
 */
export function getColorLuminance(color: string): number {
  const { r, g, b } = parseRgbColor(color)
  // 使用 ITU-R BT.709 标准计算亮度
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

/**
 * 判断颜色是否为深色
 * @param color rgb 颜色字符串
 * @param threshold 阈值，默认 128
 * @returns 是否为深色
 */
export function isDarkColor(color: string, threshold: number = 128): boolean {
  return getColorLuminance(color) < threshold
}