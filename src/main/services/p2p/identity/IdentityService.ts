import { app } from 'electron'
import * as fs from 'fs'
import * as path from 'path'

// 动态导入 libp2p 相关模块
async function loadPeerIdModules() {
  try {
    const [
      { peerIdFromString },
      { createEd25519PeerId }
    ] = await Promise.all([
      import('@libp2p/peer-id'),
      import('@libp2p/peer-id-factory')
    ])
    
    return { peerIdFromString, createEd25519PeerId }
  } catch (error) {
    console.error('Failed to load peer-id modules:', error)
    throw new Error('peer-id modules are not available. Please ensure all dependencies are installed.')
  }
}

export interface P2PIdentity {
  peerId: string
  publicKey: string
  privateKey: string
  nickname: string
  avatar?: string
  created_at: string
}

export class IdentityService {
  private identity: P2PIdentity | null = null
  private readonly identityPath: string

  constructor() {
    const userDataPath = app.isReady() ? app.getPath('userData') : path.join(process.cwd(), 'userData')
    this.identityPath = path.join(userDataPath, 'p2p-identity.json')
  }

  // 初始化身份（首次启动时生成，后续加载）
  public async initialize(): Promise<P2PIdentity> {
    if (await this.identityExists()) {
      this.identity = await this.loadIdentity()
    } else {
      this.identity = await this.generateNewIdentity()
      await this.saveIdentity(this.identity)
    }
    return this.identity
  }

  // 生成新身份
  private async generateNewIdentity(): Promise<P2PIdentity> {
    const { createEd25519PeerId } = await loadPeerIdModules()
    const peerId = await createEd25519PeerId()
    
    return {
      peerId: peerId.toString(),
      publicKey: peerId.publicKey ? Buffer.from(peerId.publicKey).toString('base64') : '',
      privateKey: peerId.privateKey ? Buffer.from(peerId.privateKey).toString('base64') : '',
      nickname: `用户_${peerId.toString().slice(-8)}`,
      created_at: new Date().toISOString()
    }
  }

  // 保存身份到本地
  private async saveIdentity(identity: P2PIdentity): Promise<void> {
    const encryptedData = this.encryptIdentity(identity)
    fs.writeFileSync(this.identityPath, JSON.stringify(encryptedData, null, 2))
  }

  // 从本地加载身份
  private async loadIdentity(): Promise<P2PIdentity> {
    const data = JSON.parse(fs.readFileSync(this.identityPath, 'utf8'))
    return this.decryptIdentity(data)
  }

  // 检查身份文件是否存在
  private async identityExists(): Promise<boolean> {
    return fs.existsSync(this.identityPath)
  }

  // 加密身份信息（简单实现，生产环境需要更强的加密）
  private encryptIdentity(identity: P2PIdentity): any {
    // TODO: 实现真正的加密
    return identity
  }

  // 解密身份信息
  private decryptIdentity(data: any): P2PIdentity {
    // TODO: 实现真正的解密
    return data
  }

  // 获取当前身份
  public getIdentity(): P2PIdentity | null {
    return this.identity
  }

  // 更新昵称
  public async updateNickname(nickname: string): Promise<void> {
    if (this.identity) {
      this.identity.nickname = nickname
      await this.saveIdentity(this.identity)
    }
  }

  // 获取PeerId对象（用于libp2p）
  public async getPeerId() {
    if (!this.identity) {
      throw new Error('Identity not initialized')
    }
    
    // 从保存的 peerId 字符串重新创建 PeerId 对象
    const { peerIdFromString } = await loadPeerIdModules()
    return peerIdFromString(this.identity.peerId)
  }
}