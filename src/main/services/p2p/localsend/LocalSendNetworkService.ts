import { EventEmitter } from 'events'
import { LocalSendProtocol } from './LocalSendProtocol'
import { LocalSendPeer, LocalSendMessage, LocalSendDevice } from './LocalSendProtocol.d'
import { LocalSendHttpServer } from './LocalSendHttpServer'
import { LocalSendDiscovery } from './LocalSendDiscovery'
import { LocalSendHttpClient } from './LocalSendHttpClient'
import { databaseManager } from '../../database/Database'
import * as os from 'os'
import * as crypto from 'crypto'

/**
 * LocalSend网络服务
 * 管理LocalSend协议的生命周期，处理设备发现、消息传输等功能
 */
export class LocalSendNetworkService extends EventEmitter {
  private protocol: LocalSendProtocol | null = null
  private httpServer: LocalSendHttpServer | null = null
  private discovery: LocalSendDiscovery | null = null
  private httpClient: LocalSendHttpClient | null = null
  private isStarted = false
  private deviceAlias: string
  private messageHandlers: Map<string, (message: LocalSendMessage) => void> = new Map()
  private port = 53318
  private useHttps = false

  constructor(alias?: string) {
    super()
    this.deviceAlias = alias || `WhyTalk-${os.hostname()}`
  }

  /**
   * 启动LocalSend网络服务
   */
  public async start(port: number = 0): Promise<void> {
    if (this.isStarted) {
      console.log('LocalSend network service already started')
      return
    }

    try {
      // 创建HTTP服务器实例
      this.httpServer = new LocalSendHttpServer(port || this.port, this.useHttps)

      // 启动HTTP服务器
      await this.httpServer.start()
      console.log('LocalSend HTTP server started')

      // 创建设备发现服务（禁用广播功能）
      this.discovery = new LocalSendDiscovery(
        this.httpServer.getFingerprint(),
        this.httpServer.getDeviceInfo(),
        false // 禁用广播功能
      )

      // 启动设备发现服务
      await this.discovery.start()
      console.log('LocalSend discovery service started')

      // 创建HTTP客户端
      this.httpClient = new LocalSendHttpClient(
        this.httpServer.getFingerprint(),
        this.httpServer.getDeviceInfo()
      )

      // 创建LocalSend协议实例（禁用广播功能）
      this.protocol = new LocalSendProtocol(this.deviceAlias, port, false)

      // 注册事件监听器
      this.setupEventListeners()

      // 启动协议
      await this.protocol.start()

      // 初始化数据库表
      await this.initializeDatabase()

      this.isStarted = true
      this.emit('started')

      console.log('LocalSend network service started successfully')
    } catch (error) {
      console.error('Failed to start LocalSend network service:', error)
      throw error
    }
  }

  /**
   * 停止LocalSend网络服务
   */
  public async stop(): Promise<void> {
    if (!this.isStarted) {
      return
    }

    try {
      // 停止发现服务
      if (this.discovery) {
        await this.discovery.stop()
        this.discovery = null
        console.log('LocalSend discovery service stopped')
      }

      // 停止HTTP服务器
      if (this.httpServer) {
        await this.httpServer.stop()
        this.httpServer = null
        console.log('LocalSend HTTP server stopped')
      }

      // 停止协议处理器
      if (this.protocol) {
        await this.protocol.stop()
        this.protocol = null
      }

      this.httpClient = null
      this.messageHandlers.clear()
      this.isStarted = false
      this.emit('stopped')

      console.log('LocalSend network service stopped successfully')
    } catch (error) {
      console.error('Failed to stop LocalSend network service:', error)
      throw error
    }
  }

  /**
   * 发送文本消息
   */
  public async sendMessage(targetFingerprint: string, content: string): Promise<void> {
    if (!this.httpClient || !this.discovery) {
      throw new Error('LocalSend network service not started')
    }

    try {
      const peer = this.discovery.findPeer(targetFingerprint)
      if (!peer) {
        throw new Error(`Peer not found: ${targetFingerprint}`)
      }

      await this.httpClient.sendMessage(peer, content)

      // 保存发送的消息到数据库
      await this.saveMessage({
        id: this.generateMessageId(),
        from: this.getLocalFingerprint(),
        to: targetFingerprint,
        type: 'text',
        content,
        timestamp: Date.now()
      })
    } catch (error) {
      console.error('Failed to send message:', error)
      throw error
    }
  }

  /**
   * 发送文件
   */
  public async sendFile(targetFingerprint: string, filePath: string): Promise<void> {
    if (!this.httpClient || !this.discovery) {
      throw new Error('LocalSend network service not started')
    }

    try {
      const peer = this.discovery.findPeer(targetFingerprint)
      if (!peer) {
        throw new Error(`Peer not found: ${targetFingerprint}`)
      }

      await this.httpClient.sendFile(peer, filePath)

      // 保存文件发送记录到数据库
      await this.saveMessage({
        id: this.generateMessageId(),
        from: this.getLocalFingerprint(),
        to: targetFingerprint,
        type: 'file',
        content: `File: ${filePath}`,
        timestamp: Date.now()
      })
    } catch (error) {
      console.error('Failed to send file:', error)
      throw error
    }
  }

  /**
   * 获取已发现的设备列表
   */
  public getDiscoveredPeers(): LocalSendPeer[] {
    if (!this.discovery) {
      return []
    }
    return this.discovery.getDiscoveredPeers()
  }

  /**
   * 获取本地设备信息
   */
  public getDeviceInfo(): LocalSendDevice | null {
    if (!this.httpServer) {
      return null
    }
    return this.httpServer.getDeviceInfo()
  }

  /**
   * 获取本地设备指纹
   */
  public getLocalFingerprint(): string {
    if (this.httpServer) {
      return this.httpServer.getFingerprint()
    }

    // 使用与LocalSendHttpServer相同的指纹生成逻辑
    const hostname = os.hostname()
    const platform = os.platform()
    const arch = os.arch()
    const networkInterfaces = os.networkInterfaces()

    // 获取第一个非回环网络接口的MAC地址
    let macAddress = ''
    for (const interfaces of Object.values(networkInterfaces)) {
      if (interfaces) {
        for (const iface of interfaces) {
          if (!iface.internal && iface.mac && iface.mac !== '00:00:00:00:00:00') {
            macAddress = iface.mac
            break
          }
        }
      }
      if (macAddress) break
    }

    const data = `${hostname}-${platform}-${arch}-${macAddress}`
    return crypto.createHash('sha256').update(data).digest('hex').substring(0, 16)
  }

  /**
   * 添加联系人
   */
  public async addContact(peer: LocalSendPeer, nickname?: string): Promise<void> {
    try {
      const db = databaseManager.getDatabase()
      const stmt = db.prepare(`
        INSERT OR REPLACE INTO localsend_contacts 
        (fingerprint, alias, nickname, ip, port, device_type, device_model, protocol, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))
      `)

      stmt.run(
        peer.fingerprint,
        peer.alias,
        nickname || peer.alias,
        peer.ip,
        peer.port,
        peer.deviceType,
        peer.deviceModel,
        peer.protocol
      )

      this.emit('contact:added', { peer, nickname })
      console.log('Contact added:', nickname || peer.alias)
    } catch (error) {
      console.error('Failed to add contact:', error)
      throw error
    }
  }

  /**
   * 获取联系人列表
   */
  public async getContacts(): Promise<any[]> {
    try {
      const db = databaseManager.getDatabase()
      const stmt = db.prepare(`
        SELECT * FROM localsend_contacts 
        ORDER BY nickname ASC
      `)

      return stmt.all()
    } catch (error) {
      console.error('Failed to get contacts:', error)
      return []
    }
  }

  /**
   * 删除联系人
   */
  public async deleteContact(fingerprint: string): Promise<void> {
    try {
      const db = databaseManager.getDatabase()
      const stmt = db.prepare('DELETE FROM localsend_contacts WHERE fingerprint = ?')
      stmt.run(fingerprint)

      this.emit('contact:deleted', fingerprint)
      console.log('Contact deleted:', fingerprint)
    } catch (error) {
      console.error('Failed to delete contact:', error)
      throw error
    }
  }

  /**
   * 获取消息历史
   */
  public async getMessageHistory(fingerprint?: string, limit: number = 50): Promise<any[]> {
    try {
      const db = databaseManager.getDatabase()
      let query = `
        SELECT * FROM localsend_messages 
        WHERE 1=1
      `
      const params: any[] = []

      if (fingerprint) {
        query += ' AND (from_fingerprint = ? OR to_fingerprint = ?)'
        params.push(fingerprint, fingerprint)
      }

      query += ' ORDER BY timestamp DESC LIMIT ?'
      params.push(limit)

      const stmt = db.prepare(query)
      return stmt.all(...params)
    } catch (error) {
      console.error('Failed to get message history:', error)
      return []
    }
  }

  /**
   * 获取服务状态
   */
  public getStatus(): any {
    const device = this.getDeviceInfo()
    const peers = this.getDiscoveredPeers()
    const discoveryStatus = this.discovery?.getStatus()
    const serverStatus = this.httpServer?.getStatus()

    return {
      isStarted: this.isStarted,
      device,
      peersCount: peers.length,
      peers: peers.slice(0, 10), // 只返回前10个设备
      protocol: 'LocalSend v2.1',
      server: serverStatus,
      discovery: discoveryStatus
    }
  }

  /**
   * 注册消息处理器
   */
  public registerMessageHandler(type: string, handler: (message: LocalSendMessage) => void): void {
    this.messageHandlers.set(type, handler)
  }

  /**
   * 注销消息处理器
   */
  public unregisterMessageHandler(type: string): void {
    this.messageHandlers.delete(type)
  }

  /**
   * 设置事件监听器
   */
  private setupEventListeners(): void {
    // 发现服务事件
    if (this.discovery) {
      this.discovery.on('peer:discovered', (peer: LocalSendPeer) => {
        this.handlePeerDiscovered(peer)
      })

      this.discovery.on('peer:lost', (peer: LocalSendPeer) => {
        this.handlePeerLost(peer)
      })

      this.discovery.on('peer:updated', (peer: LocalSendPeer) => {
        this.emit('peer:updated', peer)
      })
    }

    // HTTP服务器事件
    if (this.httpServer) {
      this.httpServer.on('message:received', (message: LocalSendMessage) => {
        this.handleMessageReceived(message)
      })

      this.httpServer.on('file:received', (fileData: any) => {
        this.handleFileReceived(fileData)
      })

      this.httpServer.on('file:prepare', (uploadInfo: LocalSendMessage) => {
        this.handleFilePrepare(uploadInfo)
      })
    }

    // 协议事件
    if (this.protocol) {
      this.protocol.on('peer:discovered', (peer: LocalSendPeer) => {
        this.handlePeerDiscovered(peer)
      })

      this.protocol.on('peer:lost', (peer: LocalSendPeer) => {
        this.handlePeerLost(peer)
      })

      this.protocol.on('message:received', (message: LocalSendMessage) => {
        this.handleMessageReceived(message)
      })

      this.protocol.on('file:received', (fileData: any) => {
        this.handleFileReceived(fileData)
      })

      this.protocol.on('file:prepare', (uploadInfo: LocalSendMessage) => {
        this.handleFilePrepare(uploadInfo)
      })
    }
  }

  /**
   * 处理设备发现
   */
  private async handlePeerDiscovered(peer: LocalSendPeer): Promise<void> {
    try {
      // 更新设备信息到数据库
      await this.updatePeerInDatabase(peer)

      this.emit('peer:discovered', peer)
      console.log('Peer discovered:', peer.alias, peer.ip)
    } catch (error) {
      console.error('Failed to handle peer discovered:', error)
    }
  }

  /**
   * 处理设备丢失
   */
  private handlePeerLost(peer: LocalSendPeer): void {
    this.emit('peer:lost', peer)
    console.log('Peer lost:', peer.alias)
  }

  /**
   * 处理接收到的消息
   */
  private async handleMessageReceived(message: LocalSendMessage): Promise<void> {
    try {
      // 保存消息到数据库
      await this.saveMessage(message)

      // 调用注册的消息处理器
      const handler = this.messageHandlers.get(message.type)
      if (handler) {
        handler(message)
      }

      this.emit('message:received', message)
      console.log('Message received from:', message.from)
    } catch (error) {
      console.error('Failed to handle received message:', error)
    }
  }

  /**
   * 处理文件接收
   */
  private handleFileReceived(fileData: any): void {
    this.emit('file:received', fileData)
    console.log('File received, size:', fileData.size)
  }

  /**
   * 处理文件准备
   */
  private handleFilePrepare(uploadInfo: LocalSendMessage): void {
    this.emit('file:prepare', uploadInfo)
    console.log('File upload prepared from:', uploadInfo.from)
  }

  /**
   * 初始化数据库表
   */
  private async initializeDatabase(): Promise<void> {
    try {
      const db = databaseManager.getDatabase()

      // 创建LocalSend设备表
      db.exec(`
        CREATE TABLE IF NOT EXISTS localsend_peers (
          fingerprint TEXT PRIMARY KEY,
          alias TEXT NOT NULL,
          ip TEXT NOT NULL,
          port INTEGER NOT NULL,
          device_type TEXT NOT NULL,
          device_model TEXT NOT NULL,
          protocol TEXT NOT NULL DEFAULT 'http',
          version TEXT NOT NULL DEFAULT '2.1',
          download BOOLEAN DEFAULT 1,
          announce BOOLEAN DEFAULT 1,
          last_seen INTEGER NOT NULL,
          created_at TEXT DEFAULT (datetime('now')),
          updated_at TEXT DEFAULT (datetime('now'))
        )
      `)

      // 创建LocalSend联系人表
      db.exec(`
        CREATE TABLE IF NOT EXISTS localsend_contacts (
          fingerprint TEXT PRIMARY KEY,
          alias TEXT NOT NULL,
          nickname TEXT,
          ip TEXT NOT NULL,
          port INTEGER NOT NULL,
          device_type TEXT NOT NULL,
          device_model TEXT NOT NULL,
          protocol TEXT NOT NULL DEFAULT 'http',
          created_at TEXT DEFAULT (datetime('now')),
          updated_at TEXT DEFAULT (datetime('now'))
        )
      `)

      // 创建LocalSend消息表
      db.exec(`
        CREATE TABLE IF NOT EXISTS localsend_messages (
          id TEXT PRIMARY KEY,
          from_fingerprint TEXT NOT NULL,
          to_fingerprint TEXT,
          type TEXT NOT NULL,
          content TEXT NOT NULL,
          timestamp INTEGER NOT NULL,
          files TEXT, -- JSON格式存储文件信息
          created_at TEXT DEFAULT (datetime('now'))
        )
      `)

      // 创建索引
      db.exec(`
        CREATE INDEX IF NOT EXISTS idx_localsend_messages_timestamp 
        ON localsend_messages(timestamp)
      `)

      db.exec(`
        CREATE INDEX IF NOT EXISTS idx_localsend_messages_participants 
        ON localsend_messages(from_fingerprint, to_fingerprint)
      `)

      console.log('LocalSend database tables initialized')
    } catch (error) {
      console.error('Failed to initialize LocalSend database:', error)
      throw error
    }
  }

  /**
   * 更新设备信息到数据库
   */
  private async updatePeerInDatabase(peer: LocalSendPeer): Promise<void> {
    try {
      const db = databaseManager.getDatabase()
      const stmt = db.prepare(`
        INSERT OR REPLACE INTO localsend_peers 
        (fingerprint, alias, ip, port, device_type, device_model, protocol, version, download, announce, last_seen, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
      `)

      stmt.run(
        peer.fingerprint,
        peer.alias,
        peer.ip,
        peer.port,
        peer.deviceType,
        peer.deviceModel,
        peer.protocol,
        '2.1',
        peer.download ? 1 : 0,
        peer.announce ? 1 : 0,
        peer.lastSeen
      )
    } catch (error) {
      console.error('Failed to update peer in database:', error)
    }
  }

  /**
   * 保存消息到数据库
   */
  private async saveMessage(message: LocalSendMessage): Promise<void> {
    try {
      const db = databaseManager.getDatabase()
      const stmt = db.prepare(`
        INSERT OR REPLACE INTO localsend_messages 
        (id, from_fingerprint, to_fingerprint, type, content, timestamp, files)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `)

      stmt.run(
        message.id,
        message.from,
        message.to || null,
        message.type,
        message.content,
        message.timestamp,
        message.files ? JSON.stringify(message.files) : null
      )
    } catch (error) {
      console.error('Failed to save message to database:', error)
    }
  }

  /**
   * 生成消息ID
   */
  private generateMessageId(): string {
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }
}

// 导出单例实例
export const localSendNetworkService = new LocalSendNetworkService()
