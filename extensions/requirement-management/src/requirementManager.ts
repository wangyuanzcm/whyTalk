import * as vscode from 'whytalk'
import * as path from 'path'
import * as fs from 'fs'

/**
 * 需求数据接口
 */
export interface Requirement {
  id: string
  title: string
  description: string
  priority: 'high' | 'medium' | 'low'
  status: 'draft' | 'review' | 'approved' | 'development' | 'testing' | 'completed' | 'cancelled'
  estimatedHours: number
  actualHours?: number
  estimateUnit: '小时' | '天' | '周'
  assignee?: string
  reporter: string
  createdAt: Date
  updatedAt: Date
  dueDate?: Date
  tags: string[]
  targetVersion?: string
  releaseVersion?: string
  releaseDate?: string
  releaseNotes?: string
  acceptanceCriteria: string[]
  dependencies: string[]
  attachments: string[]
  comments: RequirementComment[]
  testScenarios?: TestScenario[]
  automationScripts?: AutomationScript[]
}

/**
 * 需求评论接口
 */
export interface RequirementComment {
  id: string
  author: string
  content: string
  createdAt: Date
  type: 'comment' | 'status_change' | 'assignment'
}

/**
 * 测试场景接口
 */
export interface TestScenario {
  id: string
  title: string
  description: string
  steps: TestStep[]
  expectedResult: string
  priority: 'high' | 'medium' | 'low'
  type: 'functional' | 'integration' | 'performance' | 'security' | 'usability'
  automatable: boolean
}

/**
 * 测试步骤接口
 */
export interface TestStep {
  id: string
  stepNumber: number
  action: string
  expectedResult: string
  data?: string
}

/**
 * 自动化脚本接口
 */
export interface AutomationScript {
  id: string
  scenarioId: string
  framework: 'Jest' | 'Cypress' | 'Selenium' | 'Playwright'
  language: 'JavaScript' | 'TypeScript' | 'Python' | 'Java'
  code: string
  dependencies: string[]
  setupInstructions: string
}

/**
 * 需求管理器类
 * 负责需求数据的存储、检索和管理
 */
export class RequirementManager {
  private dataFilePath: string
  private requirements: Map<string, Requirement> = new Map()

  constructor(
    private context: vscode.ExtensionContext,
    private api: any
  ) {
    this.dataFilePath = path.join(context.globalStoragePath, 'requirements.json')
    this.ensureDataDirectory()
    this.loadRequirements()
  }

  /**
   * 确保数据目录存在
   */
  private ensureDataDirectory() {
    const dir = path.dirname(this.dataFilePath)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
  }

  /**
   * 从文件加载需求数据
   */
  private loadRequirements() {
    try {
      if (fs.existsSync(this.dataFilePath)) {
        const data = fs.readFileSync(this.dataFilePath, 'utf8')
        const requirementsArray: Requirement[] = JSON.parse(data)
        
        this.requirements.clear()
        requirementsArray.forEach(req => {
          // 转换日期字符串为Date对象
          req.createdAt = new Date(req.createdAt)
          req.updatedAt = new Date(req.updatedAt)
          if (req.dueDate) {
            req.dueDate = new Date(req.dueDate)
          }
          
          // 转换评论中的日期
          req.comments.forEach(comment => {
            comment.createdAt = new Date(comment.createdAt)
          })
          
          this.requirements.set(req.id, req)
        })
        
        console.log(`已加载 ${this.requirements.size} 个需求`)
      }
    } catch (error) {
      console.error('加载需求数据失败:', error)
      this.api.window.showErrorMessage('加载需求数据失败: ' + (error as Error).message)
    }
  }

  /**
   * 保存需求数据到文件
   */
  private async saveRequirements() {
    try {
      const requirementsArray = Array.from(this.requirements.values())
      const data = JSON.stringify(requirementsArray, null, 2)
      fs.writeFileSync(this.dataFilePath, data, 'utf8')
      
      console.log(`已保存 ${requirementsArray.length} 个需求`)
    } catch (error) {
      console.error('保存需求数据失败:', error)
      this.api.window.showErrorMessage('保存需求数据失败: ' + (error as Error).message)
      throw error
    }
  }

  /**
   * 生成唯一ID
   */
  private generateId(): string {
    return 'req_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 9)
  }

  /**
   * 创建新需求
   */
  async createRequirement(data: Partial<Requirement>): Promise<Requirement> {
    const now = new Date()
    const requirement: Requirement = {
      id: this.generateId(),
      title: data.title || '新需求',
      description: data.description || '',
      priority: data.priority || 'medium',
      status: data.status || 'draft',
      estimatedHours: data.estimatedHours || 0,
      estimateUnit: data.estimateUnit || '小时',
      assignee: data.assignee,
      reporter: data.reporter || '当前用户',
      createdAt: now,
      updatedAt: now,
      dueDate: data.dueDate,
      tags: data.tags || [],
      releaseVersion: data.releaseVersion,
      releaseNotes: data.releaseNotes,
      acceptanceCriteria: data.acceptanceCriteria || [],
      dependencies: data.dependencies || [],
      attachments: data.attachments || [],
      comments: [],
      testScenarios: data.testScenarios || [],
      automationScripts: data.automationScripts || []
    }

    this.requirements.set(requirement.id, requirement)
    await this.saveRequirements()

    // 添加创建评论
    await this.addComment(requirement.id, {
      author: requirement.reporter,
      content: '需求已创建',
      type: 'comment'
    })

    console.log('已创建新需求:', requirement.id)
    return requirement
  }

  /**
   * 更新需求
   */
  async updateRequirement(id: string, data: Partial<Requirement>): Promise<Requirement> {
    const requirement = this.requirements.get(id)
    if (!requirement) {
      throw new Error(`需求不存在: ${id}`)
    }

    const oldStatus = requirement.status
    const updatedRequirement: Requirement = {
      ...requirement,
      ...data,
      id, // 确保ID不被修改
      updatedAt: new Date()
    }

    this.requirements.set(id, updatedRequirement)
    await this.saveRequirements()

    // 如果状态发生变化，添加状态变更评论
    if (data.status && data.status !== oldStatus) {
      await this.addComment(id, {
        author: '系统',
        content: `状态从 "${oldStatus}" 变更为 "${data.status}"`,
        type: 'status_change'
      })
    }

    console.log('已更新需求:', id)
    return updatedRequirement
  }

  /**
   * 删除需求
   */
  async deleteRequirement(id: string): Promise<void> {
    if (!this.requirements.has(id)) {
      throw new Error(`需求不存在: ${id}`)
    }

    this.requirements.delete(id)
    await this.saveRequirements()

    console.log('已删除需求:', id)
  }

  /**
   * 获取单个需求
   */
  getRequirement(id: string): Requirement | undefined {
    return this.requirements.get(id)
  }

  /**
   * 获取所有需求
   */
  async getAllRequirements(): Promise<Requirement[]> {
    return Array.from(this.requirements.values())
  }

  /**
   * 根据条件筛选需求
   */
  async filterRequirements(filter: {
    status?: string[]
    priority?: string[]
    assignee?: string
    tags?: string[]
    dateRange?: { start: Date; end: Date }
  }): Promise<Requirement[]> {
    let filtered = Array.from(this.requirements.values())

    if (filter.status && filter.status.length > 0) {
      filtered = filtered.filter(req => filter.status!.includes(req.status))
    }

    if (filter.priority && filter.priority.length > 0) {
      filtered = filtered.filter(req => filter.priority!.includes(req.priority))
    }

    if (filter.assignee) {
      filtered = filtered.filter(req => req.assignee === filter.assignee)
    }

    if (filter.tags && filter.tags.length > 0) {
      filtered = filtered.filter(req => 
        filter.tags!.some(tag => req.tags.includes(tag))
      )
    }

    if (filter.dateRange) {
      filtered = filtered.filter(req => 
        req.createdAt >= filter.dateRange!.start && 
        req.createdAt <= filter.dateRange!.end
      )
    }

    return filtered
  }

  /**
   * 搜索需求
   */
  async searchRequirements(query: string): Promise<Requirement[]> {
    const lowerQuery = query.toLowerCase()
    return Array.from(this.requirements.values()).filter(req => 
      req.title.toLowerCase().includes(lowerQuery) ||
      req.description.toLowerCase().includes(lowerQuery) ||
      req.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
      req.acceptanceCriteria.some(criteria => criteria.toLowerCase().includes(lowerQuery))
    )
  }

  /**
   * 添加评论
   */
  async addComment(requirementId: string, commentData: {
    author: string
    content: string
    type: 'comment' | 'status_change' | 'assignment'
  }): Promise<RequirementComment> {
    const requirement = this.requirements.get(requirementId)
    if (!requirement) {
      throw new Error(`需求不存在: ${requirementId}`)
    }

    const comment: RequirementComment = {
      id: 'comment_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 9),
      author: commentData.author,
      content: commentData.content,
      createdAt: new Date(),
      type: commentData.type
    }

    requirement.comments.push(comment)
    requirement.updatedAt = new Date()
    
    await this.saveRequirements()
    return comment
  }

  /**
   * 获取需求统计信息
   */
  getStatistics(): {
    total: number
    byStatus: Record<string, number>
    byPriority: Record<string, number>
    totalEstimatedHours: number
    averageEstimatedHours: number
  } {
    const requirements = Array.from(this.requirements.values())
    const total = requirements.length
    
    const byStatus: Record<string, number> = {}
    const byPriority: Record<string, number> = {}
    let totalEstimatedHours = 0

    requirements.forEach(req => {
      // 统计状态
      byStatus[req.status] = (byStatus[req.status] || 0) + 1
      
      // 统计优先级
      byPriority[req.priority] = (byPriority[req.priority] || 0) + 1
      
      // 累计工时
      totalEstimatedHours += req.estimatedHours
    })

    return {
      total,
      byStatus,
      byPriority,
      totalEstimatedHours,
      averageEstimatedHours: total > 0 ? totalEstimatedHours / total : 0
    }
  }

  /**
   * 导出需求数据
   */
  async exportRequirements(): Promise<Requirement[]> {
    return Array.from(this.requirements.values())
  }

  /**
   * 导入需求数据
   */
  async importRequirements(requirements: Requirement[]): Promise<void> {
    for (const req of requirements) {
      // 确保ID唯一
      if (this.requirements.has(req.id)) {
        req.id = this.generateId()
      }
      
      // 确保日期格式正确
      req.createdAt = new Date(req.createdAt)
      req.updatedAt = new Date(req.updatedAt)
      if (req.dueDate) {
        req.dueDate = new Date(req.dueDate)
      }
      
      this.requirements.set(req.id, req)
    }
    
    await this.saveRequirements()
    console.log(`已导入 ${requirements.length} 个需求`)
  }
}