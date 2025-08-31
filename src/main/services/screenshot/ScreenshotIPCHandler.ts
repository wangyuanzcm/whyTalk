import { ipcMain, BrowserWindow } from 'electron'
import { screenshotService, ScreenshotOptions, ScreenshotResult } from './ScreenshotService'

/**
 * 截图IPC处理器
 * 处理来自渲染进程的截图相关请求
 */
export class ScreenshotIPCHandler {
  private static instance: ScreenshotIPCHandler
  private isInitialized = false

  private constructor() {}

  /**
   * 获取截图IPC处理器单例实例
   */
  public static getInstance(): ScreenshotIPCHandler {
    if (!ScreenshotIPCHandler.instance) {
      ScreenshotIPCHandler.instance = new ScreenshotIPCHandler()
    }
    return ScreenshotIPCHandler.instance
  }

  /**
   * 初始化IPC处理器
   */
  public initialize(): void {
    if (this.isInitialized) {
      return
    }

    this.registerHandlers()
    this.isInitialized = true
    console.log('Screenshot IPC handler initialized')
  }

  /**
   * 清理IPC处理器
   */
  public cleanup(): void {
    if (!this.isInitialized) {
      return
    }

    this.unregisterHandlers()
    this.isInitialized = false
    console.log('Screenshot IPC handler cleaned up')
  }

  /**
   * 注册IPC处理器
   */
  private registerHandlers(): void {
    // 全屏截图
    ipcMain.handle('screenshot:capture-fullscreen', async (event, options?: Partial<ScreenshotOptions>) => {
      try {
        return await screenshotService.captureFullscreen(options)
      } catch (error) {
        console.error('Failed to handle fullscreen capture:', error)
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        } as ScreenshotResult
      }
    })

    // 区域截图
    ipcMain.handle('screenshot:capture-region', async (event, region: ScreenshotOptions['region'], options?: Partial<ScreenshotOptions>) => {
      try {
        return await screenshotService.captureRegion(region, options)
      } catch (error) {
        console.error('Failed to handle region capture:', error)
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        } as ScreenshotResult
      }
    })

    // 窗口截图
    ipcMain.handle('screenshot:capture-window', async (event, options?: Partial<ScreenshotOptions>) => {
      try {
        const window = BrowserWindow.fromWebContents(event.sender)
        if (!window) {
          return {
            success: false,
            error: 'Window not found'
          } as ScreenshotResult
        }
        return await screenshotService.captureWindow(window, options)
      } catch (error) {
        console.error('Failed to handle window capture:', error)
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        } as ScreenshotResult
      }
    })

    // 窗口区域截图
    ipcMain.handle('screenshot:capture-window-region', async (event, region: ScreenshotOptions['region'], options?: Partial<ScreenshotOptions>) => {
      try {
        const window = BrowserWindow.fromWebContents(event.sender)
        if (!window) {
          return {
            success: false,
            error: 'Window not found'
          } as ScreenshotResult
        }
        return await screenshotService.captureWindowRegion(window, region, options)
      } catch (error) {
        console.error('Failed to handle window region capture:', error)
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        } as ScreenshotResult
      }
    })

    // 获取显示器信息
    ipcMain.handle('screenshot:get-displays', () => {
      try {
        return screenshotService.getDisplays()
      } catch (error) {
        console.error('Failed to get displays:', error)
        return []
      }
    })

    // 获取主显示器信息
    ipcMain.handle('screenshot:get-primary-display', () => {
      try {
        return screenshotService.getPrimaryDisplay()
      } catch (error) {
        console.error('Failed to get primary display:', error)
        return null
      }
    })

    // 设置默认保存路径
    ipcMain.handle('screenshot:set-save-path', (event, path: string) => {
      try {
        screenshotService.setDefaultSavePath(path)
        return { success: true }
      } catch (error) {
        console.error('Failed to set save path:', error)
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        }
      }
    })

    // 获取默认保存路径
    ipcMain.handle('screenshot:get-save-path', () => {
      try {
        return screenshotService.getDefaultSavePath()
      } catch (error) {
        console.error('Failed to get save path:', error)
        return ''
      }
    })

    // 选择保存目录
    ipcMain.handle('screenshot:select-save-directory', async (event) => {
      try {
        const window = BrowserWindow.fromWebContents(event.sender)
        return await screenshotService.selectSaveDirectory(window || undefined)
      } catch (error) {
        console.error('Failed to select save directory:', error)
        return null
      }
    })

    // 打开截图目录
    ipcMain.handle('screenshot:open-directory', async () => {
      try {
        await screenshotService.openScreenshotDirectory()
        return { success: true }
      } catch (error) {
        console.error('Failed to open screenshot directory:', error)
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        }
      }
    })

    // 获取截图统计信息
    ipcMain.handle('screenshot:get-stats', () => {
      try {
        return screenshotService.getStats()
      } catch (error) {
        console.error('Failed to get screenshot stats:', error)
        return {
          totalScreenshots: 0,
          defaultSavePath: '',
          isInitialized: false
        }
      }
    })

    // 最小化窗口（用于截图时隐藏应用窗口）
    ipcMain.handle('screenshot:minimize-window', (event) => {
      try {
        const window = BrowserWindow.fromWebContents(event.sender)
        if (window) {
          window.minimize()
          return { success: true }
        }
        return {
          success: false,
          error: 'Window not found'
        }
      } catch (error) {
        console.error('Failed to minimize window:', error)
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        }
      }
    })

    // 恢复窗口
    ipcMain.handle('screenshot:restore-window', (event) => {
      try {
        const window = BrowserWindow.fromWebContents(event.sender)
        if (window) {
          window.restore()
          window.focus()
          return { success: true }
        }
        return {
          success: false,
          error: 'Window not found'
        }
      } catch (error) {
        console.error('Failed to restore window:', error)
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        }
      }
    })

    // 隐藏窗口（用于截图）
    ipcMain.handle('screenshot:hide-window', (event) => {
      try {
        const window = BrowserWindow.fromWebContents(event.sender)
        if (window) {
          window.hide()
          return { success: true }
        }
        return {
          success: false,
          error: 'Window not found'
        }
      } catch (error) {
        console.error('Failed to hide window:', error)
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        }
      }
    })

    // 显示窗口
    ipcMain.handle('screenshot:show-window', (event) => {
      try {
        const window = BrowserWindow.fromWebContents(event.sender)
        if (window) {
          window.show()
          window.focus()
          return { success: true }
        }
        return {
          success: false,
          error: 'Window not found'
        }
      } catch (error) {
        console.error('Failed to show window:', error)
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        }
      }
    })
  }

  /**
   * 注销IPC处理器
   */
  private unregisterHandlers(): void {
    const handlers = [
      'screenshot:capture-fullscreen',
      'screenshot:capture-region',
      'screenshot:capture-window',
      'screenshot:capture-window-region',
      'screenshot:get-displays',
      'screenshot:get-primary-display',
      'screenshot:set-save-path',
      'screenshot:get-save-path',
      'screenshot:select-save-directory',
      'screenshot:open-directory',
      'screenshot:get-stats',
      'screenshot:minimize-window',
      'screenshot:restore-window',
      'screenshot:hide-window',
      'screenshot:show-window'
    ]

    handlers.forEach(handler => {
      ipcMain.removeAllListeners(handler)
    })
  }
}

// 导出单例实例
export const screenshotIPCHandler = ScreenshotIPCHandler.getInstance()