/**
 * WASM 插件运行器
 * 提供不依赖 Extism 的 WebAssembly 插件执行能力
 */

import { readFileSync } from 'fs'
// import { join } from 'path' // 暂时未使用

export interface WasmPluginConfig {
  name: string
  version: string
  description?: string
  author?: string
  wasmFile: string // WASM 文件路径
  exports: string[] // 导出的函数列表
  permissions?: string[]
}

export interface WasmExecutionResult {
  success: boolean
  result?: any
  error?: string
  executionTime?: number
}

/**
 * 简化的 WASM 插件运行器
 * 直接使用 Node.js 的 WebAssembly API
 */
export class WasmPluginRunner {
  private loadedModules: Map<string, WebAssembly.Module> = new Map()
  private instances: Map<string, WebAssembly.Instance> = new Map()

  /**
   * 加载 WASM 模块
   */
  async loadModule(pluginId: string, wasmPath: string): Promise<boolean> {
    try {
      const wasmBytes = readFileSync(wasmPath)
      const module = await WebAssembly.compile(wasmBytes)
      
      // 创建导入对象
      const imports = this.createImports()
      const instance = await WebAssembly.instantiate(module, imports)
      
      this.loadedModules.set(pluginId, module)
      this.instances.set(pluginId, instance)
      
      console.log(`WASM module loaded successfully: ${pluginId}`)
      return true
    } catch (error) {
      console.error(`Failed to load WASM module ${pluginId}:`, error)
      return false
    }
  }

  /**
   * 执行 WASM 函数
   */
  async executeFunction(
    pluginId: string, 
    functionName: string, 
    ...args: any[]
  ): Promise<WasmExecutionResult> {
    const startTime = Date.now()
    
    try {
      const instance = this.instances.get(pluginId)
      if (!instance) {
        return {
          success: false,
          error: `Plugin ${pluginId} not loaded`
        }
      }

      const exports = instance.exports as any
      if (typeof exports[functionName] !== 'function') {
        return {
          success: false,
          error: `Function ${functionName} not found in plugin ${pluginId}`
        }
      }

      // 执行函数
      const result = exports[functionName](...args)
      const executionTime = Date.now() - startTime

      return {
        success: true,
        result,
        executionTime
      }
    } catch (error) {
      const executionTime = Date.now() - startTime
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
        executionTime
      }
    }
  }

  /**
   * 获取模块导出的函数列表
   */
  getExports(pluginId: string): string[] {
    const instance = this.instances.get(pluginId)
    if (!instance) {
      return []
    }

    const exports = instance.exports
    return Object.keys(exports).filter(key => 
      typeof exports[key] === 'function'
    )
  }

  /**
   * 卸载模块
   */
  unloadModule(pluginId: string): boolean {
    const hasModule = this.loadedModules.has(pluginId)
    const hasInstance = this.instances.has(pluginId)
    
    this.loadedModules.delete(pluginId)
    this.instances.delete(pluginId)
    
    return hasModule || hasInstance
  }

  /**
   * 获取已加载的模块列表
   */
  getLoadedModules(): string[] {
    return Array.from(this.loadedModules.keys())
  }

  /**
   * 创建 WASM 导入对象
   * 提供插件可以使用的宿主函数
   */
  private createImports(): WebAssembly.Imports {
    return {
      env: {
        // 内存管理
        memory: new WebAssembly.Memory({ initial: 1 }),
        
        // 日志函数
        log: (ptr: number, len: number) => {
          // 这里需要从内存中读取字符串
          console.log('WASM Plugin Log:', ptr, len)
        },
        
        // 错误处理
        abort: (msg: number, file: number, line: number, col: number) => {
          console.error('WASM Plugin Abort:', { msg, file, line, col })
        },
        
        // 数学函数
        Math_random: Math.random,
        Date_now: Date.now,
        
        // 字符串操作辅助函数
        strlen: (_ptr: number) => {
          // 计算字符串长度的辅助函数
          return 0
        }
      },
      
      // WASI 基础支持（简化版）
      wasi_snapshot_preview1: {
        proc_exit: (code: number) => {
          console.log('WASM process exit with code:', code)
        },
        
        fd_write: (_fd: number, _iovs: number, _iovs_len: number, _nwritten: number) => {
          // 简化的文件写入
          return 0
        },
        
        fd_read: (_fd: number, _iovs: number, _iovs_len: number, _nread: number) => {
          // 简化的文件读取
          return 0
        },
        
        environ_sizes_get: (_environ_count: number, _environ_buf_size: number) => {
          return 0
        },
        
        environ_get: (_environ: number, _environ_buf: number) => {
          return 0
        }
      }
    }
  }

  /**
   * 验证 WASM 文件
   */
  async validateWasmFile(wasmPath: string): Promise<boolean> {
    try {
      const wasmBytes = readFileSync(wasmPath)
      await WebAssembly.compile(wasmBytes)
      return true
    } catch (error) {
      console.error('Invalid WASM file:', error)
      return false
    }
  }

  /**
   * 获取 WASM 模块信息
   */
  async getModuleInfo(wasmPath: string): Promise<{
    imports: string[]
    exports: string[]
    valid: boolean
  }> {
    try {
      const wasmBytes = readFileSync(wasmPath)
      const module = await WebAssembly.compile(wasmBytes)
      
      const imports = WebAssembly.Module.imports(module).map(imp => 
        `${imp.module}.${imp.name}`
      )
      
      const exports = WebAssembly.Module.exports(module).map(exp => exp.name)
      
      return {
        imports,
        exports,
        valid: true
      }
    } catch (error) {
      return {
        imports: [],
        exports: [],
        valid: false
      }
    }
  }
}

// 单例实例
export const wasmPluginRunner = new WasmPluginRunner()