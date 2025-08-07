// Extism JavaScript PDK 插件接口定义
// 用于描述 WASM 插件的导出函数签名

declare module "main" {
    // 统一接口函数
    export function calculate(): I32;
    export function processText(): I32;
    
    // 数学计算函数
    export function add(): I32;
    export function subtract(): I32;
    export function multiply(): I32;
    export function divide(): I32;
    
    // 文本处理函数
    export function toUpperCase(): I32;
    export function toLowerCase(): I32;
    export function reverseText(): I32;
    export function textStats(): I32;
    
    // 插件信息函数
    export function getPluginInfo(): I32;
    export function healthCheck(): I32;
    export function getVersion(): I32;
    export function greet(): I32;
    
    // 高级数学函数
    export function factorial(): I32;
    export function fibonacci(): I32;
}

// Extism PDK 全局类型定义
declare global {
  interface Host {
    inputString(): string;
    outputString(data: string): void;
    inputBytes(): Uint8Array;
    outputBytes(data: Uint8Array): void;
  }
  
  const Host: Host;
}

// 基础类型定义
type I32 = number;