/**
 * Node.js DOM Events Polyfill
 * 为 Node.js 环境提供完整的 DOM 事件 API
 * 必须在任何使用 CustomEvent 的模块加载之前执行
 */

// EventTarget polyfill
if (typeof globalThis.EventTarget === 'undefined') {
  globalThis.EventTarget = class EventTarget {
    constructor() {
      this._listeners = new Map()
    }

    addEventListener(type, listener, options = {}) {
      if (!this._listeners.has(type)) {
        this._listeners.set(type, new Set())
      }
      this._listeners.get(type).add(listener)
    }

    removeEventListener(type, listener) {
      if (this._listeners.has(type)) {
        this._listeners.get(type).delete(listener)
      }
    }

    dispatchEvent(event) {
      event.target = this
      event.currentTarget = this

      if (this._listeners.has(event.type)) {
        for (const listener of this._listeners.get(event.type)) {
          try {
            if (typeof listener === 'function') {
              listener.call(this, event)
            } else if (listener && typeof listener.handleEvent === 'function') {
              listener.handleEvent(event)
            }
          } catch (error) {
            console.error('Error in event listener:', error)
          }
        }
      }
      return !event.defaultPrevented
    }
  }
}

// Event polyfill
if (typeof globalThis.Event === 'undefined') {
  globalThis.Event = class Event {
    constructor(type, options = {}) {
      this.type = type
      this.bubbles = Boolean(options.bubbles)
      this.cancelable = Boolean(options.cancelable)
      this.composed = Boolean(options.composed)
      this.defaultPrevented = false
      this.target = null
      this.currentTarget = null
      this.eventPhase = 0
      this.timeStamp = Date.now()
      this.isTrusted = false
    }

    preventDefault() {
      if (this.cancelable) {
        this.defaultPrevented = true
      }
    }

    stopPropagation() {
      // No-op in Node.js
    }

    stopImmediatePropagation() {
      // No-op in Node.js
    }
  }
}

// CustomEvent polyfill
if (typeof globalThis.CustomEvent === 'undefined') {
  globalThis.CustomEvent = class CustomEvent extends globalThis.Event {
    constructor(type, options = {}) {
      super(type, options)
      this.detail = options.detail !== undefined ? options.detail : null
    }
  }
}

// MessageEvent polyfill
if (typeof globalThis.MessageEvent === 'undefined') {
  globalThis.MessageEvent = class MessageEvent extends globalThis.Event {
    constructor(type, options = {}) {
      super(type, options)
      this.data = options.data !== undefined ? options.data : null
      this.origin = options.origin || ''
      this.lastEventId = options.lastEventId || ''
      this.source = options.source || null
      this.ports = options.ports || []
    }
  }
}

// ErrorEvent polyfill
if (typeof globalThis.ErrorEvent === 'undefined') {
  globalThis.ErrorEvent = class ErrorEvent extends globalThis.Event {
    constructor(type, options = {}) {
      super(type, options)
      this.message = options.message || ''
      this.filename = options.filename || ''
      this.lineno = options.lineno || 0
      this.colno = options.colno || 0
      this.error = options.error || null
    }
  }
}

// 确保在 global 对象上也有这些 polyfill
if (typeof global !== 'undefined') {
  global.EventTarget = globalThis.EventTarget
  global.Event = globalThis.Event
  global.CustomEvent = globalThis.CustomEvent
  global.MessageEvent = globalThis.MessageEvent
  global.ErrorEvent = globalThis.ErrorEvent
}

// 确保在 window 对象上也有这些 polyfill（如果存在）
if (typeof window !== 'undefined') {
  if (!window.EventTarget) window.EventTarget = globalThis.EventTarget
  if (!window.Event) window.Event = globalThis.Event
  if (!window.CustomEvent) window.CustomEvent = globalThis.CustomEvent
  if (!window.MessageEvent) window.MessageEvent = globalThis.MessageEvent
  if (!window.ErrorEvent) window.ErrorEvent = globalThis.ErrorEvent
}

console.log('DOM Events polyfills loaded successfully')
