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
 * 线性着色（变亮或变暗）
 * @param p 着色百分比 范围 0.0 - 1.0，正数变亮，负数变暗
 * @param c0 rgb(a) color
 * @returns 着色后的颜色
 */
export function rgbLinearShade(p: number, c0: string): string {
  const t = p < 0
  const P = t ? p * -1 : p
  const to = t ? 'rgb(0,0,0)' : 'rgb(255,255,255)'
  return rgbLinearBlend(P, c0, to)
}

/**
 * 对数着色（变亮或变暗）
 * @param p 着色百分比 范围 0.0 - 1.0，正数变亮，负数变暗
 * @param c0 rgb(a) color
 * @returns 着色后的颜色
 */
export function rgbLogShade(p: number, c0: string): string {
  const t = p < 0
  const P = t ? p * -1 : p
  const to = t ? 'rgb(0,0,0)' : 'rgb(255,255,255)'
  return rgbLogBlend(P, c0, to)
}

/**
 * 修改颜色的透明度
 * @param p 透明度值 范围 0.0 - 1.0
 * @param color rgb(a) color
 * @returns 修改透明度后的颜色
 */
export function rgbAlphaShade(p: number, color: string): string {
  const [r, g, b] = color.match(/\d+/g) || []
  if (!r || !g || !b) {
    throw new Error('Invalid color format')
  }
  
  // 确保透明度在有效范围内
  const alpha = Math.max(0, Math.min(1, p))
  
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

/**
 * 解析RGB颜色字符串
 * @param color rgb(a) color string
 * @returns 颜色对象 {r, g, b, a?}
 */
export function parseRgbColor(color: string): { r: number; g: number; b: number; a?: number } {
  const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/)
  if (!match) {
    throw new Error('Invalid RGB color format')
  }
  
  const [, r, g, b, a] = match
  return {
    r: parseInt(r, 10),
    g: parseInt(g, 10),
    b: parseInt(b, 10),
    ...(a !== undefined && { a: parseFloat(a) })
  }
}

/**
 * 将RGB值转换为颜色字符串
 * @param r 红色值 0-255
 * @param g 绿色值 0-255
 * @param b 蓝色值 0-255
 * @param a 透明度 0-1 (可选)
 * @returns rgb(a) color string
 */
export function toRgbString(r: number, g: number, b: number, a?: number): string {
  return a !== undefined ? `rgba(${r}, ${g}, ${b}, ${a})` : `rgb(${r}, ${g}, ${b})`
}

/**
 * 验证RGB颜色格式是否正确
 * @param color 颜色字符串
 * @returns 是否为有效的RGB颜色
 */
export function isValidRgbColor(color: string): boolean {
  return /^rgba?\(\d+,\s*\d+,\s*\d+(?:,\s*[\d.]+)?\)$/.test(color)
}

/**
 * 计算颜色的亮度
 * @param color rgb(a) color string
 * @returns 亮度值 0-255
 */
export function getColorLuminance(color: string): number {
  const { r, g, b } = parseRgbColor(color)
  return Math.round(0.299 * r + 0.587 * g + 0.114 * b)
}

/**
 * 判断颜色是否为深色
 * @param color rgb(a) color string
 * @param threshold 阈值 默认128
 * @returns 是否为深色
 */
export function isDarkColor(color: string, threshold: number = 128): boolean {
  return getColorLuminance(color) < threshold
}