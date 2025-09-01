/**
 * 需求管理插件前端脚本
 * 负责界面交互、数据管理和与扩展后端的通信
 */

// 全局变量
let currentRequirements = [];
let selectedRequirement = null;
let isEditMode = false;
let vscode = null;

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeVSCodeAPI();
    initializeEventListeners();
    loadRequirements();
});

/**
 * 初始化VSCode API
 */
function initializeVSCodeAPI() {
    try {
        vscode = acquireVsCodeApi();
        console.log('VSCode API initialized');
    } catch (error) {
        console.error('Failed to initialize VSCode API:', error);
        // 开发模式下的模拟数据
        if (window.location.protocol === 'file:') {
            initializeMockData();
        }
    }
}

/**
 * 初始化模拟数据（用于开发测试）
 */
function initializeMockData() {
    currentRequirements = [
        {
            id: 'req_001',
            title: '用户登录功能',
            description: '实现用户登录功能，支持用户名密码登录和第三方登录',
            priority: 'high',
            status: 'development',
            estimatedHours: 16,
            actualHours: 12,
            targetVersion: 'v1.0.0',
            releaseDate: '2024-02-15',
            releaseNotes: '新增用户登录功能，支持多种登录方式',
            assignee: '张三',
            tags: ['前端', 'API', '认证'],
            createdAt: new Date('2024-01-15'),
            updatedAt: new Date('2024-01-20')
        },
        {
            id: 'req_002',
            title: '数据导出功能',
            description: '支持将数据导出为Excel和PDF格式',
            priority: 'medium',
            status: 'review',
            estimatedHours: 8,
            actualHours: 0,
            targetVersion: 'v1.1.0',
            releaseDate: '2024-03-01',
            releaseNotes: '新增数据导出功能',
            assignee: '李四',
            tags: ['导出', '文件处理'],
            createdAt: new Date('2024-01-18'),
            updatedAt: new Date('2024-01-18')
        }
    ];
    renderRequirementsList();
}

/**
 * 初始化事件监听器
 */
function initializeEventListeners() {
    // 头部按钮
    document.getElementById('newRequirementBtn').addEventListener('click', openNewRequirementModal);
    document.getElementById('importBtn').addEventListener('click', importData);
    document.getElementById('exportBtn').addEventListener('click', exportData);

    // 工具栏
    document.getElementById('searchBtn').addEventListener('click', searchRequirements);
    document.getElementById('searchInput').addEventListener('input', debounce(searchRequirements, 300));
    document.getElementById('statusFilter').addEventListener('change', filterRequirements);
    document.getElementById('priorityFilter').addEventListener('change', filterRequirements);
    document.getElementById('refreshBtn').addEventListener('click', loadRequirements);
    document.getElementById('generateTestsBtn').addEventListener('click', generateTestScenarios);
    document.getElementById('generateScriptsBtn').addEventListener('click', openAutomationScriptsModal);

    // 详情面板按钮
    document.getElementById('editBtn').addEventListener('click', enterEditMode);
    document.getElementById('saveBtn').addEventListener('click', saveRequirement);
    document.getElementById('cancelBtn').addEventListener('click', exitEditMode);
    document.getElementById('deleteBtn').addEventListener('click', deleteRequirement);

    // 需求表单模态框
    document.getElementById('modalClose').addEventListener('click', closeRequirementModal);
    document.getElementById('modalCancelBtn').addEventListener('click', closeRequirementModal);
    document.getElementById('requirementForm').addEventListener('submit', handleFormSubmit);

    // 测试场景模态框
    document.getElementById('testScenariosModalClose').addEventListener('click', closeTestScenariosModal);
    document.getElementById('testScenariosCloseBtn').addEventListener('click', closeTestScenariosModal);
    document.getElementById('exportTestScenariosBtn').addEventListener('click', exportTestScenarios);

    // 自动化脚本模态框
    document.getElementById('automationScriptsModalClose').addEventListener('click', closeAutomationScriptsModal);
    document.getElementById('automationScriptsCloseBtn').addEventListener('click', closeAutomationScriptsModal);
    document.getElementById('generateScriptsBtn').addEventListener('click', generateAutomationScripts);
    document.getElementById('exportScriptsBtn').addEventListener('click', exportAutomationScripts);

    // 通知关闭
    document.getElementById('notificationClose').addEventListener('click', hideNotification);

    // 模态框背景点击关闭
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('show');
            }
        });
    });

    // 键盘快捷键
    document.addEventListener('keydown', handleKeyboardShortcuts);
}

/**
 * 处理键盘快捷键
 */
function handleKeyboardShortcuts(e) {
    if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
            case 'n':
                e.preventDefault();
                openNewRequirementModal();
                break;
            case 's':
                e.preventDefault();
                if (isEditMode) {
                    saveRequirement();
                }
                break;
            case 'f':
                e.preventDefault();
                document.getElementById('searchInput').focus();
                break;
        }
    }
    
    if (e.key === 'Escape') {
        // 关闭所有模态框
        document.querySelectorAll('.modal.show').forEach(modal => {
            modal.classList.remove('show');
        });
        
        // 退出编辑模式
        if (isEditMode) {
            exitEditMode();
        }
    }
}

/**
 * 加载需求列表
 */
function loadRequirements() {
    showLoading();
    
    if (vscode) {
        vscode.postMessage({
            command: 'loadRequirements'
        });
    } else {
        // 模拟加载延迟
        setTimeout(() => {
            hideLoading();
            renderRequirementsList();
        }, 500);
    }
}

/**
 * 渲染需求列表
 */
function renderRequirementsList() {
    const container = document.getElementById('requirementsList');
    
    if (currentRequirements.length === 0) {
        container.innerHTML = `
            <div class="empty-requirements">
                <div class="icon">📋</div>
                <h3>暂无需求</h3>
                <p>点击"新建需求"按钮创建第一个需求</p>
                <button class="btn btn-primary" onclick="openNewRequirementModal()">新建需求</button>
            </div>
        `;
        return;
    }
    
    container.innerHTML = currentRequirements.map(req => `
        <div class="requirement-item ${selectedRequirement?.id === req.id ? 'selected' : ''}" 
             onclick="selectRequirement('${req.id}')">
            <div class="requirement-title">${escapeHtml(req.title)}</div>
            <div class="requirement-meta">
                <span class="status-badge status-${req.status}">${getStatusText(req.status)}</span>
                <span class="priority-badge priority-${req.priority}">${getPriorityText(req.priority)}</span>
            </div>
            <div class="requirement-description">${escapeHtml(req.description)}</div>
            ${req.tags && req.tags.length > 0 ? `
                <div class="tags">
                    ${req.tags.map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join('')}
                </div>
            ` : ''}
        </div>
    `).join('');
}

/**
 * 选择需求
 */
function selectRequirement(requirementId) {
    selectedRequirement = currentRequirements.find(req => req.id === requirementId);
    renderRequirementsList();
    renderRequirementDetails();
}

/**
 * 渲染需求详情
 */
function renderRequirementDetails() {
    const container = document.getElementById('detailsContent');
    
    if (!selectedRequirement) {
        container.innerHTML = `
            <div class="empty-state">
                <p>请选择一个需求查看详情</p>
            </div>
        `;
        return;
    }
    
    const req = selectedRequirement;
    
    container.innerHTML = `
        <div class="detail-section">
            <h3>基本信息</h3>
            <div class="detail-row">
                <div class="detail-field">
                    <div class="detail-label">标题</div>
                    <div class="detail-value">${escapeHtml(req.title)}</div>
                </div>
                <div class="detail-field">
                    <div class="detail-label">优先级</div>
                    <div class="detail-value">
                        <span class="priority-badge priority-${req.priority}">${getPriorityText(req.priority)}</span>
                    </div>
                </div>
            </div>
            <div class="detail-field">
                <div class="detail-label">描述</div>
                <div class="detail-value">${escapeHtml(req.description)}</div>
            </div>
            <div class="detail-row">
                <div class="detail-field">
                    <div class="detail-label">状态</div>
                    <div class="detail-value">
                        <span class="status-badge status-${req.status}">${getStatusText(req.status)}</span>
                    </div>
                </div>
                <div class="detail-field">
                    <div class="detail-label">负责人</div>
                    <div class="detail-value">${escapeHtml(req.assignee || '未分配')}</div>
                </div>
            </div>
        </div>
        
        <div class="detail-section">
            <h3>工时信息</h3>
            <div class="detail-row">
                <div class="detail-field">
                    <div class="detail-label">预估工时</div>
                    <div class="detail-value">${req.estimatedHours || 0} 小时</div>
                </div>
                <div class="detail-field">
                    <div class="detail-label">实际工时</div>
                    <div class="detail-value">${req.actualHours || 0} 小时</div>
                </div>
            </div>
            ${req.estimatedHours > 0 ? `
                <div class="detail-field">
                    <div class="detail-label">工时进度</div>
                    <div class="detail-value">
                        <div class="progress">
                            <div class="progress-bar" style="width: ${Math.min((req.actualHours || 0) / req.estimatedHours * 100, 100)}%"></div>
                        </div>
                        <small>${Math.round((req.actualHours || 0) / req.estimatedHours * 100)}% 完成</small>
                    </div>
                </div>
            ` : ''}
        </div>
        
        <div class="detail-section">
            <h3>发版信息</h3>
            <div class="detail-row">
                <div class="detail-field">
                    <div class="detail-label">目标版本</div>
                    <div class="detail-value">${escapeHtml(req.targetVersion || '未设置')}</div>
                </div>
                <div class="detail-field">
                    <div class="detail-label">计划发版日期</div>
                    <div class="detail-value">${req.releaseDate ? formatDate(req.releaseDate) : '未设置'}</div>
                </div>
            </div>
            ${req.releaseNotes ? `
                <div class="detail-field">
                    <div class="detail-label">发版说明</div>
                    <div class="detail-value">${escapeHtml(req.releaseNotes)}</div>
                </div>
            ` : ''}
        </div>
        
        ${req.tags && req.tags.length > 0 ? `
            <div class="detail-section">
                <h3>标签</h3>
                <div class="tags">
                    ${req.tags.map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join('')}
                </div>
            </div>
        ` : ''}
        
        <div class="detail-section">
            <h3>时间信息</h3>
            <div class="detail-row">
                <div class="detail-field">
                    <div class="detail-label">创建时间</div>
                    <div class="detail-value">${formatDateTime(req.createdAt)}</div>
                </div>
                <div class="detail-field">
                    <div class="detail-label">更新时间</div>
                    <div class="detail-value">${formatDateTime(req.updatedAt)}</div>
                </div>
            </div>
        </div>
    `;
}

/**
 * 打开新建需求模态框
 */
function openNewRequirementModal() {
    document.getElementById('modalTitle').textContent = '新建需求';
    document.getElementById('requirementForm').reset();
    document.getElementById('requirementModal').classList.add('show');
    document.getElementById('title').focus();
}

/**
 * 关闭需求模态框
 */
function closeRequirementModal() {
    document.getElementById('requirementModal').classList.remove('show');
}

/**
 * 处理表单提交
 */
function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const requirement = {
        id: selectedRequirement?.id || generateId(),
        title: formData.get('title'),
        description: formData.get('description'),
        priority: formData.get('priority'),
        status: formData.get('status'),
        estimatedHours: parseFloat(formData.get('estimatedHours')) || 0,
        actualHours: parseFloat(formData.get('actualHours')) || 0,
        targetVersion: formData.get('targetVersion'),
        releaseDate: formData.get('releaseDate'),
        releaseNotes: formData.get('releaseNotes'),
        assignee: formData.get('assignee'),
        tags: formData.get('tags') ? formData.get('tags').split(',').map(tag => tag.trim()).filter(tag => tag) : [],
        createdAt: selectedRequirement?.createdAt || new Date(),
        updatedAt: new Date()
    };
    
    saveRequirementData(requirement);
    closeRequirementModal();
}

/**
 * 保存需求数据
 */
function saveRequirementData(requirement) {
    showLoading();
    
    if (vscode) {
        vscode.postMessage({
            command: 'saveRequirement',
            data: requirement
        });
    } else {
        // 模拟保存
        setTimeout(() => {
            const existingIndex = currentRequirements.findIndex(req => req.id === requirement.id);
            if (existingIndex >= 0) {
                currentRequirements[existingIndex] = requirement;
            } else {
                currentRequirements.push(requirement);
            }
            
            selectedRequirement = requirement;
            hideLoading();
            renderRequirementsList();
            renderRequirementDetails();
            showNotification('需求保存成功', 'success');
        }, 500);
    }
}

/**
 * 进入编辑模式
 */
function enterEditMode() {
    if (!selectedRequirement) return;
    
    isEditMode = true;
    document.getElementById('editBtn').style.display = 'none';
    document.getElementById('saveBtn').style.display = 'inline-flex';
    document.getElementById('cancelBtn').style.display = 'inline-flex';
    
    // 填充表单数据
    const form = document.getElementById('requirementForm');
    const req = selectedRequirement;
    
    form.title.value = req.title;
    form.description.value = req.description;
    form.priority.value = req.priority;
    form.status.value = req.status;
    form.estimatedHours.value = req.estimatedHours || '';
    form.actualHours.value = req.actualHours || '';
    form.targetVersion.value = req.targetVersion || '';
    form.releaseDate.value = req.releaseDate || '';
    form.releaseNotes.value = req.releaseNotes || '';
    form.assignee.value = req.assignee || '';
    form.tags.value = req.tags ? req.tags.join(', ') : '';
    
    document.getElementById('modalTitle').textContent = '编辑需求';
    document.getElementById('requirementModal').classList.add('show');
}

/**
 * 退出编辑模式
 */
function exitEditMode() {
    isEditMode = false;
    document.getElementById('editBtn').style.display = 'inline-flex';
    document.getElementById('saveBtn').style.display = 'none';
    document.getElementById('cancelBtn').style.display = 'none';
    closeRequirementModal();
}

/**
 * 保存需求（编辑模式）
 */
function saveRequirement() {
    document.getElementById('requirementForm').dispatchEvent(new Event('submit'));
    exitEditMode();
}

/**
 * 删除需求
 */
function deleteRequirement() {
    if (!selectedRequirement) return;
    
    if (confirm(`确定要删除需求