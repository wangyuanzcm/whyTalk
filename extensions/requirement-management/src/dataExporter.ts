/**
 * 数据导出器
 * 负责将需求数据导出为不同格式
 */

import * as fs from 'fs';
import * as path from 'path';
import { Requirement, TestScenario, AutomationScript } from './requirementManager';

/**
 * 导出格式枚举
 */
export enum ExportFormat {
    JSON = 'json',
    CSV = 'csv',
    EXCEL = 'xlsx',
    MARKDOWN = 'md'
}

/**
 * 导出选项接口
 */
export interface ExportOptions {
    format: ExportFormat;
    filePath: string;
    includeTestScenarios?: boolean;
    includeAutomationScripts?: boolean;
    encoding?: string;
}

/**
 * 数据导出器类
 */
export class DataExporter {
    /**
     * 导入需求数据
     */
    public async importRequirements(filePath: string): Promise<Requirement[]> {
        try {
            const content = await this.readFile(filePath, 'utf8');
            const data = JSON.parse(content);
            return data.requirements || data || [];
        } catch (error) {
            throw new Error(`导入失败: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    /**
     * 导出需求数据
     */
    public async exportRequirements(
        requirements: Requirement[],
        options: ExportOptions
    ): Promise<void> {
        try {
            switch (options.format) {
                case ExportFormat.JSON:
                    await this.exportToJSON(requirements, options);
                    break;
                case ExportFormat.CSV:
                    await this.exportToCSV(requirements, options);
                    break;
                case ExportFormat.MARKDOWN:
                    await this.exportToMarkdown(requirements, options);
                    break;
                default:
                    throw new Error(`不支持的导出格式: ${options.format}`);
            }
        } catch (error) {
            throw new Error(`导出失败: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    /**
     * 导出为JSON格式
     */
    private async exportToJSON(
        requirements: Requirement[],
        options: ExportOptions
    ): Promise<void> {
        const data = {
            exportTime: new Date().toISOString(),
            requirements: requirements,
            metadata: {
                totalCount: requirements.length,
                exportFormat: options.format
            }
        };

        const jsonContent = JSON.stringify(data, null, 2);
        await this.writeFile(options.filePath, jsonContent, options.encoding || 'utf8');
    }

    /**
     * 导出为CSV格式
     */
    private async exportToCSV(
        requirements: Requirement[],
        options: ExportOptions
    ): Promise<void> {
        const headers = [
            'ID',
            '标题',
            '描述',
            '优先级',
            '状态',
            '预估工时',
            '实际工时',
            '目标版本',
            '发版日期',
            '发版说明',
            '负责人',
            '标签',
            '创建时间',
            '更新时间'
        ];

        const csvRows = [headers.join(',')];

        for (const req of requirements) {
            const row = [
                this.escapeCsvValue(req.id),
                this.escapeCsvValue(req.title),
                this.escapeCsvValue(req.description),
                this.escapeCsvValue(req.priority),
                this.escapeCsvValue(req.status),
                req.estimatedHours?.toString() || '',
                req.actualHours?.toString() || '',
                this.escapeCsvValue(req.targetVersion || ''),
                req.releaseDate || '',
                this.escapeCsvValue(req.releaseNotes || ''),
                this.escapeCsvValue(req.assignee || ''),
                this.escapeCsvValue(req.tags?.join('; ') || ''),
                req.createdAt.toISOString(),
                req.updatedAt.toISOString()
            ];
            csvRows.push(row.join(','));
        }

        const csvContent = csvRows.join('\n');
        await this.writeFile(options.filePath, csvContent, options.encoding || 'utf8');
    }

    /**
     * 导出为Markdown格式
     */
    private async exportToMarkdown(
        requirements: Requirement[],
        options: ExportOptions
    ): Promise<void> {
        const lines: string[] = [];

        // 标题
        lines.push('# 需求管理报告');
        lines.push('');
        lines.push(`**导出时间:** ${new Date().toLocaleString('zh-CN')}`);
        lines.push(`**需求总数:** ${requirements.length}`);
        lines.push('');

        // 统计信息
        const stats = this.generateStatistics(requirements);
        lines.push('## 统计信息');
        lines.push('');
        lines.push('### 按状态分布');
        for (const [status, count] of Object.entries(stats.byStatus)) {
            lines.push(`- ${this.getStatusText(status)}: ${count}`);
        }
        lines.push('');
        lines.push('### 按优先级分布');
        for (const [priority, count] of Object.entries(stats.byPriority)) {
            lines.push(`- ${this.getPriorityText(priority)}: ${count}`);
        }
        lines.push('');

        // 需求详情
        lines.push('## 需求详情');
        lines.push('');

        for (const req of requirements) {
            lines.push(`### ${req.title}`);
            lines.push('');
            lines.push(`**ID:** ${req.id}`);
            lines.push(`**描述:** ${req.description}`);
            lines.push(`**优先级:** ${this.getPriorityText(req.priority)}`);
            lines.push(`**状态:** ${this.getStatusText(req.status)}`);
            
            if (req.estimatedHours) {
                lines.push(`**预估工时:** ${req.estimatedHours} 小时`);
            }
            if (req.actualHours) {
                lines.push(`**实际工时:** ${req.actualHours} 小时`);
            }
            if (req.targetVersion) {
                lines.push(`**目标版本:** ${req.targetVersion}`);
            }
            if (req.releaseDate) {
                lines.push(`**发版日期:** ${req.releaseDate}`);
            }
            if (req.assignee) {
                lines.push(`**负责人:** ${req.assignee}`);
            }
            if (req.tags && req.tags.length > 0) {
                lines.push(`**标签:** ${req.tags.join(', ')}`);
            }
            
            lines.push(`**创建时间:** ${req.createdAt.toLocaleString('zh-CN')}`);
            lines.push(`**更新时间:** ${req.updatedAt.toLocaleString('zh-CN')}`);
            lines.push('');
            lines.push('---');
            lines.push('');
        }

        const markdownContent = lines.join('\n');
        await this.writeFile(options.filePath, markdownContent, options.encoding || 'utf8');
    }

    /**
     * 导出测试场景
     */
    public async exportTestScenarios(
        scenarios: TestScenario[],
        filePath: string
    ): Promise<void> {
        const data = {
            exportTime: new Date().toISOString(),
            testScenarios: scenarios,
            metadata: {
                totalCount: scenarios.length
            }
        };

        const jsonContent = JSON.stringify(data, null, 2);
        await this.writeFile(filePath, jsonContent, 'utf8');
    }

    /**
     * 导出自动化脚本
     */
    public async exportAutomationScripts(
        scripts: AutomationScript[],
        filePath: string
    ): Promise<void> {
        const data = {
            exportTime: new Date().toISOString(),
            automationScripts: scripts,
            metadata: {
                totalCount: scripts.length
            }
        };

        const jsonContent = JSON.stringify(data, null, 2);
        await this.writeFile(filePath, jsonContent, 'utf8');
    }

    /**
     * 生成统计信息
     */
    private generateStatistics(requirements: Requirement[]) {
        const stats = {
            byStatus: {} as Record<string, number>,
            byPriority: {} as Record<string, number>
        };

        for (const req of requirements) {
            // 按状态统计
            stats.byStatus[req.status] = (stats.byStatus[req.status] || 0) + 1;
            
            // 按优先级统计
            stats.byPriority[req.priority] = (stats.byPriority[req.priority] || 0) + 1;
        }

        return stats;
    }

    /**
     * 转义CSV值
     */
    private escapeCsvValue(value: string): string {
        if (!value) return '';
        
        // 如果包含逗号、引号或换行符，需要用引号包围并转义内部引号
        if (value.includes(',') || value.includes('"') || value.includes('\n')) {
            return `"${value.replace(/"/g, '""')}"`;
        }
        
        return value;
    }

    /**
     * 获取状态文本
     */
    private getStatusText(status: string): string {
        const statusMap: Record<string, string> = {
            draft: '草稿',
            review: '评审中',
            approved: '已批准',
            development: '开发中',
            testing: '测试中',
            completed: '已完成',
            cancelled: '已取消'
        };
        return statusMap[status] || status;
    }

    /**
     * 获取优先级文本
     */
    private getPriorityText(priority: string): string {
        const priorityMap: Record<string, string> = {
            high: '高',
            medium: '中',
            low: '低'
        };
        return priorityMap[priority] || priority;
    }

    /**
     * 读取文件
     */
    private async readFile(filePath: string, encoding: string): Promise<string> {
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, encoding as BufferEncoding, (error, data) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(data);
                }
            });
        });
    }

    /**
     * 写入文件
     */
    private async writeFile(filePath: string, content: string, encoding: string): Promise<void> {
        return new Promise((resolve, reject) => {
            // 确保目录存在
            const dir = path.dirname(filePath);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }

            fs.writeFile(filePath, content, encoding as BufferEncoding, (error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    }
}