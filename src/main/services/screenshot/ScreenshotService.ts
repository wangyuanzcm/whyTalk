import { BrowserWindow, screen, nativeImage, desktopCapturer, dialog } from 'electron'
import { writeFile, mkdir } from 'fs/promises'
import { join, dirname } from 'path'
import { existsSync } from 'fs'

/**
 * 截图选项接口
 */
export interface ScreenshotOptions {
  /** 截图类型：全屏或指定区域 */
  type: 'fullscreen' | 'region'
  /** 指定区域的坐标和尺寸 */
  region?: {
    x: number
    y: number
    width: number
    height: number
  }
  /** 保存路径 */
  savePath?: string
  /** 图片质量 (0-100) */
  quality?: number
  /** 图片格式 */
  format?: 'png' | 'jpeg'
  /** 是否显示光标 */
  showCursor?: boolean
}

/**
 * 截图结果接口
 */
export interface ScreenshotResult {
  /** 是否成功 */
  success: boolean
  /** 截图文件路径 */
  filePath?: string
  /** Base64编码的图片数据 */
  base64?: string
  /** 错误信息 */
  error?: string
  /** 截图元数据 */
  metadata?: {
    width: number
    height: number
    timestamp: number
    format: string
  }
}

/**
 * 截图服务类
 * 提供全屏和区域截图功能
 */
export class ScreenshotService {
  private static instance: ScreenshotService
  private isInitialized = false
  private screenshotCount = 0
  private defaultSavePath: string

  private constructor() {
    this.defaultSavePath = join(process.cwd(), 'screenshots')
  }

  /**
   * 获取截图服务单例实例
   */
  public static getInstance(): ScreenshotService {
    if (!ScreenshotService.instance) {
      ScreenshotService.instance = new ScreenshotService()
    }
    return ScreenshotService.instance
  }

  /**
   * 初始化截图服务
   */
  public async initialize(): Promise<void> {
    if (this.isInitialized) {
      return
    }

    try {
      // 确保截图目录存在
      await this.ensureScreenshotDirectory()
      
      this.isInitialized = true
      console.log('Screenshot service initialized successfully')
    } catch (error) {
      console.error('Failed to initialize screenshot service:', error)
      throw error
    }
  }

  /**
   * 清理截图服务
   */
  public async cleanup(): Promise<void> {
    this.isInitialized = false
    console.log('Screenshot service cleaned up')
  }

  /**
   * 确保截图目录存在
   */
  private async ensureScreenshotDirectory(): Promise<void> {
    if (!existsSync(this.defaultSavePath)) {
      await mkdir(this.defaultSavePath, { recursive: true })
    }
  }

  /**
   * 获取所有显示器信息
   */
  public getDisplays() {
    return screen.getAllDisplays()
  }

  /**
   * 获取主显示器信息
   */
  public getPrimaryDisplay() {
    return screen.getPrimaryDisplay()
  }

  /**
   * 执行全屏截图
   */
  public async captureFullscreen(options: Partial<ScreenshotOptions> = {}): Promise<ScreenshotResult> {
    try {
      const sources = await desktopCapturer.getSources({
        types: ['screen'],
        thumbnailSize: {
          width: 1920,
          height: 1080
        }
      })

      if (sources.length === 0) {
        return {
          success: false,
          error: 'No screen sources available'
        }
      }

      // 使用第一个屏幕源
      const source = sources[0]
      const image = source.thumbnail
      
      return await this.processScreenshot(image, {
        ...options,
        type: 'fullscreen'
      })
    } catch (error) {
      console.error('Failed to capture fullscreen:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }

  /**
   * 截图当前窗口内容
   * @param window - 要截图的BrowserWindow实例
   * @param options - 截图选项
   */
  public async captureWindow(window: BrowserWindow, options: Partial<ScreenshotOptions> = {}): Promise<ScreenshotResult> {
    try {
      // 获取窗口的原生图像
      const image = await window.capturePage()
      
      return await this.processScreenshot(image, {
        ...options,
        type: 'fullscreen' // 窗口截图视为全屏类型
      })
    } catch (error) {
      console.error('Failed to capture window:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }

  /**
   * 截图当前窗口的指定区域
   * @param window - 要截图的BrowserWindow实例
   * @param region - 截图区域
   * @param options - 截图选项
   */
  public async captureWindowRegion(window: BrowserWindow, region: ScreenshotOptions['region'], options: Partial<ScreenshotOptions> = {}): Promise<ScreenshotResult> {
    if (!region) {
      return {
        success: false,
        error: 'Region is required for window region capture'
      }
    }

    try {
      // 先获取整个窗口的截图
      const fullImage = await window.capturePage()
      
      // 裁剪指定区域
      const image = fullImage.crop({
        x: region.x,
        y: region.y,
        width: region.width,
        height: region.height
      })
      
      return await this.processScreenshot(image, {
        ...options,
        type: 'region',
        region
      })
    } catch (error) {
      console.error('Failed to capture window region:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }

  /**
   * 执行区域截图
   */
  public async captureRegion(region: ScreenshotOptions['region'], options: Partial<ScreenshotOptions> = {}): Promise<ScreenshotResult> {
    if (!region) {
      return {
        success: false,
        error: 'Region is required for region capture'
      }
    }

    try {
      const sources = await desktopCapturer.getSources({
        types: ['screen'],
        thumbnailSize: {
          width: 1920,
          height: 1080
        }
      })

      if (sources.length === 0) {
        return {
          success: false,
          error: 'No screen sources available'
        }
      }

      const source = sources[0]
      let image = source.thumbnail
      
      // 裁剪指定区域
      const size = image.getSize()
      const scaleX = size.width / screen.getPrimaryDisplay().bounds.width
      const scaleY = size.height / screen.getPrimaryDisplay().bounds.height
      
      const cropRegion = {
        x: Math.round(region.x * scaleX),
        y: Math.round(region.y * scaleY),
        width: Math.round(region.width * scaleX),
        height: Math.round(region.height * scaleY)
      }
      
      image = image.crop(cropRegion)
      
      return await this.processScreenshot(image, {
        ...options,
        type: 'region',
        region
      })
    } catch (error) {
      console.error('Failed to capture region:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }

  /**
   * 处理截图数据
   */
  private async processScreenshot(image: Electron.NativeImage, options: ScreenshotOptions): Promise<ScreenshotResult> {
    try {
      const format = options.format || 'png'
      const quality = options.quality || 90
      
      // 获取图片数据
      let buffer: Buffer
      if (format === 'jpeg') {
        buffer = image.toJPEG(quality)
      } else {
        buffer = image.toPNG()
      }
      
      const base64 = buffer.toString('base64')
      const size = image.getSize()
      
      const result: ScreenshotResult = {
        success: true,
        base64,
        metadata: {
          width: size.width,
          height: size.height,
          timestamp: Date.now(),
          format
        }
      }
      
      // 如果指定了保存路径，则保存文件
      if (options.savePath) {
        await this.saveScreenshot(buffer, options.savePath)
        result.filePath = options.savePath
      } else {
        // 使用默认路径保存
        const filename = this.generateFilename(format)
        const filePath = join(this.defaultSavePath, filename)
        await this.saveScreenshot(buffer, filePath)
        result.filePath = filePath
      }
      
      this.screenshotCount++
      console.log(`Screenshot saved: ${result.filePath}`)
      
      return result
    } catch (error) {
      console.error('Failed to process screenshot:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }

  /**
   * 保存截图到文件
   */
  private async saveScreenshot(buffer: Buffer, filePath: string): Promise<void> {
    // 确保目录存在
    const dir = dirname(filePath)
    if (!existsSync(dir)) {
      await mkdir(dir, { recursive: true })
    }
    
    await writeFile(filePath, buffer)
  }

  /**
   * 生成截图文件名
   */
  private generateFilename(format: string): string {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    return `screenshot-${timestamp}.${format}`
  }

  /**
   * 设置默认保存路径
   */
  public setDefaultSavePath(path: string): void {
    this.defaultSavePath = path
  }

  /**
   * 获取默认保存路径
   */
  public getDefaultSavePath(): string {
    return this.defaultSavePath
  }

  /**
   * 获取截图统计信息
   */
  public getStats() {
    return {
      totalScreenshots: this.screenshotCount,
      defaultSavePath: this.defaultSavePath,
      isInitialized: this.isInitialized
    }
  }

  /**
   * 打开截图保存目录
   */
  public async openScreenshotDirectory(): Promise<void> {
    const { shell } = require('electron')
    await shell.openPath(this.defaultSavePath)
  }

  /**
   * 选择保存目录
   */
  public async selectSaveDirectory(window?: BrowserWindow): Promise<string | null> {
    const result = await dialog.showOpenDialog(window || BrowserWindow.getFocusedWindow()!, {
      properties: ['openDirectory', 'createDirectory'],
      title: '选择截图保存目录'
    })
    
    if (!result.canceled && result.filePaths.length > 0) {
      const selectedPath = result.filePaths[0]
      this.setDefaultSavePath(selectedPath)
      return selectedPath
    }
    
    return null
  }
}

// 导出单例实例
export const screenshotService = ScreenshotService.getInstance()