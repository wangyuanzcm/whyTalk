import { Requirement, TestScenario, TestStep } from './requirementManager'

/**
 * 测试场景生成器类
 * 根据需求自动生成测试场景和测试用例
 */
export class TestScenarioGenerator {
  constructor(private api: any) {}

  /**
   * 根据需求生成测试场景
   */
  async generateTestScenarios(requirement: Requirement): Promise<TestScenario[]> {
    const scenarios: TestScenario[] = []

    try {
      // 生成功能测试场景
      scenarios.push(...this.generateFunctionalScenarios(requirement))
      
      // 生成边界测试场景
      scenarios.push(...this.generateBoundaryScenarios(requirement))
      
      // 生成异常测试场景
      scenarios.push(...this.generateExceptionScenarios(requirement))
      
      // 生成集成测试场景
      scenarios.push(...this.generateIntegrationScenarios(requirement))
      
      // 生成性能测试场景
      scenarios.push(...this.generatePerformanceScenarios(requirement))
      
      // 生成安全测试场景
      scenarios.push(...this.generateSecurityScenarios(requirement))
      
      // 生成可用性测试场景
      scenarios.push(...this.generateUsabilityScenarios(requirement))

      console.log(`为需求 ${requirement.id} 生成了 ${scenarios.length} 个测试场景`)
      return scenarios
    } catch (error) {
      console.error('生成测试场景失败:', error)
      throw new Error('生成测试场景失败: ' + (error as Error).message)
    }
  }

  /**
   * 生成功能测试场景
   */
  private generateFunctionalScenarios(requirement: Requirement): TestScenario[] {
    const scenarios: TestScenario[] = []

    // 基于验收标准生成测试场景
    requirement.acceptanceCriteria.forEach((criteria, index) => {
      const scenario: TestScenario = {
        id: this.generateId(),
        title: `功能测试 - ${criteria.substring(0, 30)}...`,
        description: `验证需求的验收标准: ${criteria}`,
        steps: this.generateStepsFromCriteria(criteria),
        expectedResult: criteria,
        priority: requirement.priority,
        type: 'functional',
        automatable: this.isAutomatable(criteria)
      }
      scenarios.push(scenario)
    })

    // 如果没有验收标准，生成基础功能测试
    if (requirement.acceptanceCriteria.length === 0) {
      scenarios.push({
        id: this.generateId(),
        title: `基础功能测试 - ${requirement.title}`,
        description: `验证 ${requirement.title} 的基本功能`,
        steps: this.generateBasicFunctionalSteps(requirement),
        expectedResult: '功能按预期工作',
        priority: requirement.priority,
        type: 'functional',
        automatable: true
      })
    }

    return scenarios
  }

  /**
   * 生成边界测试场景
   */
  private generateBoundaryScenarios(requirement: Requirement): TestScenario[] {
    const scenarios: TestScenario[] = []

    // 检查描述中是否包含数值限制
    const numberPatterns = [
      /最大(\d+)/g,
      /最小(\d+)/g,
      /不超过(\d+)/g,
      /至少(\d+)/g,
      /(\d+)个字符/g,
      /(\d+)位数字/g
    ]

    const description = requirement.description + ' ' + requirement.acceptanceCriteria.join(' ')
    
    numberPatterns.forEach(pattern => {
      const matches = description.match(pattern)
      if (matches) {
        matches.forEach(match => {
          scenarios.push({
            id: this.generateId(),
            title: `边界测试 - ${match}`,
            description: `测试 ${match} 的边界值`,
            steps: this.generateBoundarySteps(match),
            expectedResult: '边界值处理正确',
            priority: 'high',
            type: 'functional',
            automatable: true
          })
        })
      }
    })

    // 如果没有找到数值限制，生成通用边界测试
    if (scenarios.length === 0) {
      scenarios.push({
        id: this.generateId(),
        title: `边界测试 - 输入验证`,
        description: '测试输入字段的边界值',
        steps: [
          {
            id: this.generateId(),
            stepNumber: 1,
            action: '输入空值',
            expectedResult: '显示相应的验证错误信息'
          },
          {
            id: this.generateId(),
            stepNumber: 2,
            action: '输入超长字符串',
            expectedResult: '限制输入长度或显示错误信息'
          },
          {
            id: this.generateId(),
            stepNumber: 3,
            action: '输入特殊字符',
            expectedResult: '正确处理特殊字符或显示错误信息'
          }
        ],
        expectedResult: '所有边界情况都得到正确处理',
        priority: 'medium',
        type: 'functional',
        automatable: true
      })
    }

    return scenarios
  }

  /**
   * 生成异常测试场景
   */
  private generateExceptionScenarios(requirement: Requirement): TestScenario[] {
    return [
      {
        id: this.generateId(),
        title: `异常测试 - 网络错误`,
        description: '测试网络连接异常时的处理',
        steps: [
          {
            id: this.generateId(),
            stepNumber: 1,
            action: '断开网络连接',
            expectedResult: '网络断开'
          },
          {
            id: this.generateId(),
            stepNumber: 2,
            action: '执行需要网络的操作',
            expectedResult: '显示网络错误提示'
          },
          {
            id: this.generateId(),
            stepNumber: 3,
            action: '恢复网络连接',
            expectedResult: '功能恢复正常'
          }
        ],
        expectedResult: '网络异常得到妥善处理',
        priority: 'medium',
        type: 'functional',
        automatable: false
      },
      {
        id: this.generateId(),
        title: `异常测试 - 服务器错误`,
        description: '测试服务器错误时的处理',
        steps: [
          {
            id: this.generateId(),
            stepNumber: 1,
            action: '模拟服务器返回500错误',
            expectedResult: '服务器返回错误状态'
          },
          {
            id: this.generateId(),
            stepNumber: 2,
            action: '观察应用响应',
            expectedResult: '显示友好的错误信息'
          },
          {
            id: this.generateId(),
            stepNumber: 3,
            action: '提供重试机制',
            expectedResult: '用户可以重试操作'
          }
        ],
        expectedResult: '服务器错误得到妥善处理',
        priority: 'medium',
        type: 'functional',
        automatable: true
      }
    ]
  }

  /**
   * 生成集成测试场景
   */
  private generateIntegrationScenarios(requirement: Requirement): TestScenario[] {
    const scenarios: TestScenario[] = []

    // 如果有依赖项，生成集成测试
    if (requirement.dependencies.length > 0) {
      requirement.dependencies.forEach(dependency => {
        scenarios.push({
          id: this.generateId(),
          title: `集成测试 - 与${dependency}的集成`,
          description: `测试当前需求与${dependency}的集成`,
          steps: [
            {
              id: this.generateId(),
              stepNumber: 1,
              action: `确保${dependency}正常运行`,
              expectedResult: `${dependency}功能正常`
            },
            {
              id: this.generateId(),
              stepNumber: 2,
              action: '执行当前需求功能',
              expectedResult: '功能正常执行'
            },
            {
              id: this.generateId(),
              stepNumber: 3,
              action: `验证与${dependency}的数据交互`,
              expectedResult: '数据交互正确'
            }
          ],
          expectedResult: `与${dependency}集成正常`,
          priority: 'high',
          type: 'integration',
          automatable: true
        })
      })
    }

    // 生成通用集成测试
    scenarios.push({
      id: this.generateId(),
      title: `集成测试 - 端到端流程`,
      description: '测试完整的用户流程',
      steps: [
        {
          id: this.generateId(),
          stepNumber: 1,
          action: '用户登录系统',
          expectedResult: '成功登录'
        },
        {
          id: this.generateId(),
          stepNumber: 2,
          action: '导航到相关功能',
          expectedResult: '成功访问功能页面'
        },
        {
          id: this.generateId(),
          stepNumber: 3,
          action: '执行完整的业务流程',
          expectedResult: '流程顺利完成'
        },
        {
          id: this.generateId(),
          stepNumber: 4,
          action: '验证结果数据',
          expectedResult: '数据正确保存和显示'
        }
      ],
      expectedResult: '端到端流程正常工作',
      priority: 'high',
      type: 'integration',
      automatable: true
    })

    return scenarios
  }

  /**
   * 生成性能测试场景
   */
  private generatePerformanceScenarios(requirement: Requirement): TestScenario[] {
    return [
      {
        id: this.generateId(),
        title: `性能测试 - 响应时间`,
        description: '测试功能的响应时间',
        steps: [
          {
            id: this.generateId(),
            stepNumber: 1,
            action: '记录开始时间',
            expectedResult: '时间记录开始'
          },
          {
            id: this.generateId(),
            stepNumber: 2,
            action: '执行功能操作',
            expectedResult: '功能正常执行'
          },
          {
            id: this.generateId(),
            stepNumber: 3,
            action: '记录结束时间并计算耗时',
            expectedResult: '响应时间在可接受范围内（< 3秒）'
          }
        ],
        expectedResult: '响应时间满足性能要求',
        priority: 'medium',
        type: 'performance',
        automatable: true
      },
      {
        id: this.generateId(),
        title: `性能测试 - 并发处理`,
        description: '测试并发用户访问时的性能',
        steps: [
          {
            id: this.generateId(),
            stepNumber: 1,
            action: '模拟多个用户同时访问',
            expectedResult: '系统接受并发请求'
          },
          {
            id: this.generateId(),
            stepNumber: 2,
            action: '监控系统资源使用',
            expectedResult: 'CPU和内存使用在正常范围'
          },
          {
            id: this.generateId(),
            stepNumber: 3,
            action: '验证所有请求都得到正确响应',
            expectedResult: '所有用户都能正常使用功能'
          }
        ],
        expectedResult: '系统能够处理预期的并发负载',
        priority: 'medium',
        type: 'performance',
        automatable: true
      }
    ]
  }

  /**
   * 生成安全测试场景
   */
  private generateSecurityScenarios(requirement: Requirement): TestScenario[] {
    return [
      {
        id: this.generateId(),
        title: `安全测试 - 权限验证`,
        description: '测试用户权限控制',
        steps: [
          {
            id: this.generateId(),
            stepNumber: 1,
            action: '使用无权限用户尝试访问',
            expectedResult: '访问被拒绝'
          },
          {
            id: this.generateId(),
            stepNumber: 2,
            action: '使用有权限用户访问',
            expectedResult: '访问成功'
          },
          {
            id: this.generateId(),
            stepNumber: 3,
            action: '验证操作权限控制',
            expectedResult: '只能执行授权的操作'
          }
        ],
        expectedResult: '权限控制正确实施',
        priority: 'high',
        type: 'security',
        automatable: true
      },
      {
        id: this.generateId(),
        title: `安全测试 - 输入验证`,
        description: '测试恶意输入的防护',
        steps: [
          {
            id: this.generateId(),
            stepNumber: 1,
            action: '输入SQL注入攻击代码',
            expectedResult: '输入被过滤或拒绝'
          },
          {
            id: this.generateId(),
            stepNumber: 2,
            action: '输入XSS攻击代码',
            expectedResult: '脚本被转义或过滤'
          },
          {
            id: this.generateId(),
            stepNumber: 3,
            action: '输入过长的数据',
            expectedResult: '输入被限制或截断'
          }
        ],
        expectedResult: '系统能够防护常见的安全攻击',
        priority: 'high',
        type: 'security',
        automatable: true
      }
    ]
  }

  /**
   * 生成可用性测试场景
   */
  private generateUsabilityScenarios(requirement: Requirement): TestScenario[] {
    return [
      {
        id: this.generateId(),
        title: `可用性测试 - 用户体验`,
        description: '测试功能的易用性',
        steps: [
          {
            id: this.generateId(),
            stepNumber: 1,
            action: '新用户首次使用功能',
            expectedResult: '界面直观易懂'
          },
          {
            id: this.generateId(),
            stepNumber: 2,
            action: '完成主要任务流程',
            expectedResult: '流程简单明了'
          },
          {
            id: this.generateId(),
            stepNumber: 3,
            action: '查找帮助信息',
            expectedResult: '帮助信息易于找到和理解'
          }
        ],
        expectedResult: '用户能够轻松使用功能',
        priority: 'medium',
        type: 'usability',
        automatable: false
      },
      {
        id: this.generateId(),
        title: `可用性测试 - 响应式设计`,
        description: '测试不同设备上的显示效果',
        steps: [
          {
            id: this.generateId(),
            stepNumber: 1,
            action: '在桌面浏览器中访问',
            expectedResult: '布局正常显示'
          },
          {
            id: this.generateId(),
            stepNumber: 2,
            action: '在平板设备中访问',
            expectedResult: '自适应平板屏幕'
          },
          {
            id: this.generateId(),
            stepNumber: 3,
            action: '在手机设备中访问',
            expectedResult: '自适应手机屏幕'
          }
        ],
        expectedResult: '在所有设备上都能正常使用',
        priority: 'medium',
        type: 'usability',
        automatable: true
      }
    ]
  }

  /**
   * 根据验收标准生成测试步骤
   */
  private generateStepsFromCriteria(criteria: string): TestStep[] {
    const steps: TestStep[] = []
    
    // 简单的步骤生成逻辑
    if (criteria.includes('用户') || criteria.includes('操作')) {
      steps.push({
        id: this.generateId(),
        stepNumber: 1,
        action: '用户执行相关操作',
        expectedResult: '操作成功执行'
      })
    }
    
    if (criteria.includes('显示') || criteria.includes('展示')) {
      steps.push({
        id: this.generateId(),
        stepNumber: steps.length + 1,
        action: '检查显示结果',
        expectedResult: '信息正确显示'
      })
    }
    
    if (criteria.includes('保存') || criteria.includes('存储')) {
      steps.push({
        id: this.generateId(),
        stepNumber: steps.length + 1,
        action: '验证数据保存',
        expectedResult: '数据正确保存'
      })
    }
    
    // 如果没有生成任何步骤，添加默认步骤
    if (steps.length === 0) {
      steps.push({
        id: this.generateId(),
        stepNumber: 1,
        action: '执行相关功能',
        expectedResult: criteria
      })
    }
    
    return steps
  }

  /**
   * 生成基础功能测试步骤
   */
  private generateBasicFunctionalSteps(requirement: Requirement): TestStep[] {
    return [
      {
        id: this.generateId(),
        stepNumber: 1,
        action: '访问功能页面',
        expectedResult: '页面正常加载'
      },
      {
        id: this.generateId(),
        stepNumber: 2,
        action: '执行主要功能操作',
        expectedResult: '功能按预期工作'
      },
      {
        id: this.generateId(),
        stepNumber: 3,
        action: '验证操作结果',
        expectedResult: '结果符合预期'
      }
    ]
  }

  /**
   * 生成边界测试步骤
   */
  private generateBoundarySteps(boundary: string): TestStep[] {
    return [
      {
        id: this.generateId(),
        stepNumber: 1,
        action: `测试${boundary}的最小值`,
        expectedResult: '最小值处理正确'
      },
      {
        id: this.generateId(),
        stepNumber: 2,
        action: `测试${boundary}的最大值`,
        expectedResult: '最大值处理正确'
      },
      {
        id: this.generateId(),
        stepNumber: 3,
        action: `测试超出${boundary}的值`,
        expectedResult: '超出范围的值被正确拒绝'
      }
    ]
  }

  /**
   * 判断测试场景是否可自动化
   */
  private isAutomatable(criteria: string): boolean {
    const nonAutomatableKeywords = [
      '用户体验', '界面美观', '易用性', '直观', '友好',
      '手动', '人工', '视觉', '感受', '印象'
    ]
    
    return !nonAutomatableKeywords.some(keyword => 
      criteria.toLowerCase().includes(keyword)
    )
  }

  /**
   * 生成唯一ID
   */
  private generateId(): string {
    return 'test_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 9)
  }

  /**
   * 根据需求优先级调整测试场景优先级
   */
  private adjustScenarioPriority(requirement: Requirement, baseScenarios: TestScenario[]): TestScenario[] {
    return baseScenarios.map(scenario => {
      // 如果需求是高优先级，提升功能测试和安全测试的优先级
      if (requirement.priority === 'high' && 
          (scenario.type === 'functional' || scenario.type === 'security')) {
        scenario.priority = 'high'
      }
      
      // 如果需求是低优先级，降低性能测试和可用性测试的优先级
      if (requirement.priority === 'low' && 
          (scenario.type === 'performance' || scenario.type === 'usability')) {
        scenario.priority = 'low'
      }
      
      return scenario
    })
  }
}