// 通讯录插件主逻辑
class ContactPlugin {
    constructor() {
        this.currentContactId = null;
        this.contacts = [];
        this.groups = [];
        this.categories = [];
        this.selectedGroupId = 0; // 当前选中的分组ID，0表示全部
        this.searchKeyword = '';
        this.loading = false;
        this.init();
    }

    async init() {
        await this.loadContactData();
        this.bindEvents();
        this.renderInterface();
    }

    // 加载联系人数据 - 使用新的数据存储API
    async loadContactData() {
        try {
            this.loading = true;
            this.updateLoadingState(true);
            
            // 使用新的插件数据API
            if (window.electronAPI && window.electronAPI.invoke) {
                // 获取联系人列表
                const contactsResult = await window.electronAPI.invoke('plugin:data:getContacts', {
                    groupId: this.selectedGroupId,
                    keyword: this.searchKeyword
                });
                
                if (contactsResult.success) {
                    this.contacts = contactsResult.data || [];
                } else {
                    console.error('获取联系人失败:', contactsResult.error);
                    this.contacts = [];
                }
                
                // 获取联系人分组
                const groupsResult = await window.electronAPI.invoke('plugin:data:getContactGroups');
                if (groupsResult.success) {
                    this.groups = groupsResult.data || [];
                } else {
                    console.error('获取联系人分组失败:', groupsResult.error);
                    this.groups = [];
                }
                
                // 获取联系人分类
                const categoriesResult = await window.electronAPI.invoke('plugin:data:getContactCategories');
                if (categoriesResult.success) {
                    this.categories = categoriesResult.data || [];
                } else {
                    console.error('获取联系人分类失败:', categoriesResult.error);
                    this.categories = [];
                }
            } else {
                // 模拟数据用于开发测试
                this.groups = [
                    { id: 0, name: '全部', count: 8 },
                    { id: 1, name: '我的好友', count: 3 },
                    { id: 2, name: '家人', count: 2 },
                    { id: 3, name: '同事', count: 3 }
                ];
                
                this.categories = [
                    { id: 1, name: '重要联系人', color: '#ff4757' },
                    { id: 2, name: '工作相关', color: '#3742fa' },
                    { id: 3, name: '朋友圈', color: '#2ed573' },
                    { id: 4, name: '客户', color: '#ffa502' }
                ];
                
                this.contacts = [
                    {
                        user_id: 1,
                        nickname: '张三',
                        remark: '小张',
                        avatar: '/avatars/zhangsan.jpg',
                        gender: 1,
                        motto: '生活就像海洋，只有意志坚强的人才能到达彼岸。',
                        group_id: 1,
                        category_id: 1,
                        is_pinned: false,
                        online_status: 'online',
                        phone: '13800138001',
                        email: 'zhangsan@example.com',
                        created_at: '2024-01-01 10:00:00',
                        updated_at: '2024-01-15 15:30:00'
                    },
                    {
                        user_id: 2,
                        nickname: '李四',
                        remark: '小李',
                        avatar: '/avatars/lisi.jpg',
                        gender: 2,
                        motto: '做最好的自己',
                        group_id: 1,
                        category_id: 3,
                        is_pinned: true,
                        online_status: 'online',
                        phone: '13800138002',
                        email: 'lisi@example.com',
                        created_at: '2024-01-02 11:00:00',
                        updated_at: '2024-01-15 16:00:00'
                    },
                    {
                        user_id: 3,
                        nickname: '王五',
                        remark: '老王',
                        avatar: '/avatars/wangwu.jpg',
                        gender: 1,
                        motto: '努力工作，快乐生活',
                        group_id: 3,
                        category_id: 2,
                        is_pinned: false,
                        online_status: 'offline',
                        phone: '13800138003',
                        email: 'wangwu@example.com',
                        created_at: '2024-01-03 09:00:00',
                        updated_at: '2024-01-14 14:20:00'
                    }
                ];
            }
        } catch (error) {
            console.error('加载联系人数据失败:', error);
            this.contacts = [];
            this.groups = [];
            this.categories = [];
        } finally {
            this.loading = false;
            this.updateLoadingState(false);
        }
    }
    
    // 更新加载状态
    updateLoadingState(loading) {
        const loadingElement = document.getElementById('loadingState');
        const contentElement = document.getElementById('contactContent');
        
        if (loadingElement && contentElement) {
            if (loading) {
                loadingElement.style.display = 'flex';
                contentElement.style.display = 'none';
            } else {
                loadingElement.style.display = 'none';
                contentElement.style.display = 'block';
            }
        }
    }
    
    // 渲染界面
    renderInterface() {
        this.renderGroupTabs();
        this.renderContactList();
        this.renderCategoryManagement();
    }
    
    // 渲染分组标签
    renderGroupTabs() {
        const groupTabs = document.getElementById('groupTabs');
        if (!groupTabs) return;
        
        groupTabs.innerHTML = '';
        
        this.groups.forEach(group => {
            const tab = document.createElement('div');
            tab.className = `group-tab ${group.id === this.selectedGroupId ? 'active' : ''}`;
            tab.dataset.groupId = group.id;
            tab.innerHTML = `
                <span class="group-name">${group.name}</span>
                <span class="group-count">(${group.count})</span>
            `;
            
            tab.addEventListener('click', () => {
                this.selectGroup(group.id);
            });
            
            groupTabs.appendChild(tab);
        });
    }
    
    // 选择分组
    async selectGroup(groupId) {
        if (this.selectedGroupId === groupId) return;
        
        this.selectedGroupId = groupId;
        await this.loadContactData();
        this.renderInterface();
    }

    // 绑定事件
    bindEvents() {
        // 搜索功能
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchKeyword = e.target.value.trim();
                this.debounceSearch();
            });
        }

        // 添加好友按钮
        const addContactBtn = document.getElementById('addContactBtn');
        if (addContactBtn) {
            addContactBtn.addEventListener('click', () => {
                this.showAddContactModal();
            });
        }

        // 分组管理按钮
        const groupManageBtn = document.getElementById('groupManageBtn');
        if (groupManageBtn) {
            groupManageBtn.addEventListener('click', () => {
                this.showGroupManageModal();
            });
        }
        
        // 联系人分类管理按钮
        const categoryManageBtn = document.getElementById('categoryManageBtn');
        if (categoryManageBtn) {
            categoryManageBtn.addEventListener('click', () => {
                this.showCategoryManageModal();
            });
        }

        // 模态框事件
        this.bindModalEvents();

        // 联系人详情操作
        this.bindDetailEvents();
    }
    
    // 防抖搜索
    debounceSearch() {
        clearTimeout(this.searchTimer);
        this.searchTimer = setTimeout(async () => {
            await this.loadContactData();
            this.renderContactList();
        }, 300);
    }

    // 绑定模态框事件
    bindModalEvents() {
        // 添加联系人模态框
        const addContactModal = document.getElementById('addContactModal');
        const cancelAddBtn = document.getElementById('cancelAddBtn');
        const confirmAddBtn = document.getElementById('confirmAddBtn');
        
        cancelAddBtn.addEventListener('click', () => {
            this.hideAddContactModal();
        });
        
        confirmAddBtn.addEventListener('click', () => {
            this.addContact();
        });
        
        // 点击模态框外部关闭
        addContactModal.addEventListener('click', (e) => {
            if (e.target === addContactModal) {
                this.hideAddContactModal();
            }
        });

        // 新建群组模态框
        const addGroupModal = document.getElementById('addGroupModal');
        const cancelGroupBtn = document.getElementById('cancelGroupBtn');
        const confirmGroupBtn = document.getElementById('confirmGroupBtn');
        
        cancelGroupBtn.addEventListener('click', () => {
            this.hideAddGroupModal();
        });
        
        confirmGroupBtn.addEventListener('click', () => {
            this.addGroup();
        });
        
        addGroupModal.addEventListener('click', (e) => {
            if (e.target === addGroupModal) {
                this.hideAddGroupModal();
            }
        });
    }

    // 渲染联系人列表
    renderContactList() {
        const contactList = document.getElementById('contactList');
        if (!contactList) return;
        
        contactList.innerHTML = '';
        
        if (this.contacts.length === 0) {
            contactList.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">👥</div>
                    <div class="empty-text">暂无联系人</div>
                </div>
            `;
            return;
        }
        
        // 按置顶状态和更新时间排序
        const sortedContacts = [...this.contacts].sort((a, b) => {
            if (a.is_pinned !== b.is_pinned) {
                return b.is_pinned - a.is_pinned; // 置顶的在前
            }
            return new Date(b.updated_at) - new Date(a.updated_at); // 最近更新的在前
        });
        
        sortedContacts.forEach(contact => {
            const contactItem = this.createContactItem(contact);
            contactList.appendChild(contactItem);
        });
    }
    
    // 创建联系人项目
    createContactItem(contact) {
        const item = document.createElement('div');
        item.className = 'contact-item';
        item.dataset.contactId = contact.user_id;
        
        const category = this.categories.find(c => c.id === contact.category_id);
        const displayName = contact.remark || contact.nickname;
        const genderIcon = contact.gender === 1 ? '♂' : contact.gender === 2 ? '♀' : '';
        const onlineStatus = contact.online_status === 'online' ? 'online' : 'offline';
        
        item.innerHTML = `
            <div class="contact-avatar">
                <img src="${contact.avatar}" alt="${displayName}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">
                <div class="avatar-fallback" style="display:none">${displayName.charAt(0).toUpperCase()}</div>
                <div class="online-indicator ${onlineStatus}"></div>
                ${contact.is_pinned ? '<div class="pin-indicator">📌</div>' : ''}
            </div>
            <div class="contact-info">
                <div class="contact-name">
                    <span class="name">${displayName}</span>
                    <span class="gender">${genderIcon}</span>
                    ${category ? `<span class="category-tag" style="background-color: ${category.color}">${category.name}</span>` : ''}
                </div>
                <div class="contact-motto">${contact.motto || '暂无个性签名'}</div>
            </div>
            <div class="contact-actions">
                <button class="action-btn chat-btn" title="发消息">💬</button>
                <button class="action-btn more-btn" title="更多操作">⋯</button>
            </div>
        `;
        
        // 绑定事件
        const chatBtn = item.querySelector('.chat-btn');
        const moreBtn = item.querySelector('.more-btn');
        const contactInfo = item.querySelector('.contact-info');
        
        chatBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.startChat(contact);
        });
        
        moreBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.showContactActions(contact, e.target);
        });
        
        contactInfo.addEventListener('click', () => {
            this.showContactDetail(contact.user_id);
        });
        
        return item;
    }
    
    // 渲染分类管理
    renderCategoryManagement() {
        const categoryList = document.getElementById('categoryList');
        if (!categoryList) return;
        
        categoryList.innerHTML = '';
        
        this.categories.forEach(category => {
            const categoryItem = document.createElement('div');
            categoryItem.className = 'category-item';
            categoryItem.innerHTML = `
                <div class="category-color" style="background-color: ${category.color}"></div>
                <div class="category-name">${category.name}</div>
                <div class="category-actions">
                    <button class="edit-category-btn" data-id="${category.id}">编辑</button>
                    <button class="delete-category-btn" data-id="${category.id}">删除</button>
                </div>
            `;
            
            categoryList.appendChild(categoryItem);
        });
    }
    
    // 绑定详情页事件
    bindDetailEvents() {
        const chatBtn = document.getElementById('chatBtn');
        const callBtn = document.getElementById('callBtn');
        const videoBtn = document.getElementById('videoBtn');
        
        chatBtn.addEventListener('click', () => {
            this.startChat();
        });
        
        callBtn.addEventListener('click', () => {
            this.startCall('audio');
        });
        
        videoBtn.addEventListener('click', () => {
            this.startCall('video');
        });
    }

    // 渲染联系人分组
    renderContactGroups() {
        const contactGroups = document.getElementById('contactGroups');
        contactGroups.innerHTML = '';

        this.groups.forEach(group => {
            const groupDiv = document.createElement('div');
            groupDiv.className = 'contact-group';
            
            const groupHeader = document.createElement('div');
            groupHeader.className = 'group-header';
            groupHeader.innerHTML = `
                <span>${group.name} (${group.contacts.length})</span>
                <span class="group-toggle">▼</span>
            `;
            
            groupHeader.addEventListener('click', () => {
                this.toggleGroup(groupHeader);
            });
            
            const groupContacts = document.createElement('div');
            groupContacts.className = 'group-contacts';
            
            group.contacts.forEach(contact => {
                const contactItem = document.createElement('div');
                contactItem.className = 'contact-item';
                contactItem.dataset.contactId = contact.id;
                
                contactItem.innerHTML = `
                    <div class="contact-avatar">${contact.avatar}</div>
                    <div class="contact-info">
                        <div class="contact-name">${contact.name}</div>
                        <div class="contact-status ${contact.status}">${contact.status === 'online' ? '在线' : '离线'}</div>
                    </div>
                `;
                
                contactItem.addEventListener('click', () => {
                    this.selectContact(contact.id);
                });
                
                groupContacts.appendChild(contactItem);
            });
            
            groupDiv.appendChild(groupHeader);
            groupDiv.appendChild(groupContacts);
            contactGroups.appendChild(groupDiv);
        });
    }

    // 切换分组展开/折叠
    toggleGroup(groupHeader) {
        groupHeader.classList.toggle('collapsed');
    }

    // 过滤联系人
    filterContacts(keyword) {
        if (!keyword.trim()) {
            this.renderContactGroups();
            return;
        }
        
        const filteredGroups = this.groups.map(group => ({
            ...group,
            contacts: group.contacts.filter(contact => 
                contact.name.toLowerCase().includes(keyword.toLowerCase()) ||
                contact.nickname.toLowerCase().includes(keyword.toLowerCase()) ||
                contact.account.toLowerCase().includes(keyword.toLowerCase())
            )
        })).filter(group => group.contacts.length > 0);
        
        const contactGroups = document.getElementById('contactGroups');
        contactGroups.innerHTML = '';
        
        filteredGroups.forEach(group => {
            const groupDiv = document.createElement('div');
            groupDiv.className = 'contact-group';
            
            const groupHeader = document.createElement('div');
            groupHeader.className = 'group-header';
            groupHeader.innerHTML = `
                <span>${group.name} (${group.contacts.length})</span>
                <span class="group-toggle">▼</span>
            `;
            
            groupHeader.addEventListener('click', () => {
                this.toggleGroup(groupHeader);
            });
            
            const groupContacts = document.createElement('div');
            groupContacts.className = 'group-contacts';
            
            group.contacts.forEach(contact => {
                const contactItem = document.createElement('div');
                contactItem.className = 'contact-item';
                contactItem.dataset.contactId = contact.id;
                
                contactItem.innerHTML = `
                    <div class="contact-avatar">${contact.avatar}</div>
                    <div class="contact-info">
                        <div class="contact-name">${contact.name}</div>
                        <div class="contact-status ${contact.status}">${contact.status === 'online' ? '在线' : '离线'}</div>
                    </div>
                `;
                
                contactItem.addEventListener('click', () => {
                    this.selectContact(contact.id);
                });
                
                groupContacts.appendChild(contactItem);
            });
            
            groupDiv.appendChild(groupHeader);
            groupDiv.appendChild(groupContacts);
            contactGroups.appendChild(groupDiv);
        });
    }

    // 选择联系人
    selectContact(contactId) {
        this.currentContactId = contactId;
        
        // 更新UI状态
        document.querySelectorAll('.contact-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`[data-contact-id="${contactId}"]`).classList.add('active');
        
        // 显示联系人详情
        this.showContactDetail(contactId);
    }

    // 显示联系人详情
    showContactDetail(contactId) {
        const contact = this.contacts.find(c => c.id === contactId);
        if (!contact) return;
        
        // 隐藏空状态，显示详情
        document.getElementById('emptyContactState').style.display = 'none';
        document.getElementById('activeContactDetail').style.display = 'block';
        
        // 更新详情信息
        document.getElementById('detailAvatar').textContent = contact.avatar;
        document.getElementById('detailName').textContent = contact.name;
        document.getElementById('detailStatus').textContent = contact.status === 'online' ? '在线' : '离线';
        document.getElementById('detailStatus').className = `detail-status ${contact.status}`;
        
        // 更新基本信息
        document.getElementById('infoNickname').textContent = contact.nickname || '-';
        document.getElementById('infoAccount').textContent = contact.account || '-';
        document.getElementById('infoEmail').textContent = contact.email || '-';
        document.getElementById('infoPhone').textContent = contact.phone || '-';
        
        // 更新个人资料
        document.getElementById('infoGender').textContent = contact.gender || '-';
        document.getElementById('infoBirthday').textContent = contact.birthday || '-';
        document.getElementById('infoLocation').textContent = contact.location || '-';
        document.getElementById('infoSignature').textContent = contact.signature || '-';
    }

    // 显示添加联系人模态框
    showAddContactModal() {
        document.getElementById('addContactModal').classList.add('show');
        document.getElementById('addContactInput').focus();
    }

    // 隐藏添加联系人模态框
    hideAddContactModal() {
        document.getElementById('addContactModal').classList.remove('show');
        document.getElementById('addContactInput').value = '';
        document.getElementById('addContactMessage').value = '我是你的朋友';
    }

    // 显示新建群组模态框
    showAddGroupModal() {
        document.getElementById('addGroupModal').classList.add('show');
        document.getElementById('groupNameInput').focus();
    }

    // 隐藏新建群组模态框
    hideAddGroupModal() {
        document.getElementById('addGroupModal').classList.remove('show');
        document.getElementById('groupNameInput').value = '';
        document.getElementById('groupDescInput').value = '';
    }

    // 添加联系人
    async addContact() {
        const input = document.getElementById('addContactInput').value.trim();
        const message = document.getElementById('addContactMessage').value.trim();
        
        if (!input) {
            alert('请输入要添加的好友信息');
            return;
        }
        
        try {
            if (window.electronAPI && window.electronAPI.invoke) {
                await window.electronAPI.invoke('plugin:contact:addContact', {
                    target: input,
                    message: message
                });
            }
            
            alert('好友申请已发送');
            this.hideAddContactModal();
        } catch (error) {
            console.error('添加联系人失败:', error);
            alert('添加联系人失败');
        }
    }

    // 新建群组
    async addGroup() {
        const name = document.getElementById('groupNameInput').value.trim();
        const desc = document.getElementById('groupDescInput').value.trim();
        
        if (!name) {
            alert('请输入群组名称');
            return;
        }
        
        try {
            if (window.electronAPI && window.electronAPI.invoke) {
                await window.electronAPI.invoke('plugin:contact:createGroup', {
                    name: name,
                    description: desc
                });
            }
            
            alert('群组创建成功');
            this.hideAddGroupModal();
            this.loadContacts(); // 重新加载联系人列表
        } catch (error) {
            console.error('创建群组失败:', error);
            alert('创建群组失败');
        }
    }

    // 开始聊天
    startChat() {
        if (!this.currentContactId) return;
        
        const contact = this.contacts.find(c => c.id === this.currentContactId);
        if (!contact) return;
        
        // 通知主应用打开聊天窗口
        if (window.parent && window.parent !== window) {
            window.parent.postMessage({
                type: 'openChat',
                contactId: this.currentContactId,
                contactName: contact.name
            }, '*');
        }
    }

    // 开始通话
    startCall(type) {
        if (!this.currentContactId) return;
        
        const contact = this.contacts.find(c => c.id === this.currentContactId);
        if (!contact) return;
        
        // 通知主应用开始通话
        if (window.parent && window.parent !== window) {
            window.parent.postMessage({
                type: 'startCall',
                callType: type,
                contactId: this.currentContactId,
                contactName: contact.name
            }, '*');
        }
    }

    // 插件API接口
    getPluginInfo() {
        return {
            name: 'contact-plugin',
            version: '1.0.0',
            description: '通讯录插件',
            author: 'Why-Talk Team'
        };
    }

    // 处理来自主应用的消息
    handleMessage(data) {
        switch (data.type) {
            case 'contactUpdate':
                this.handleContactUpdate(data.payload);
                break;
            case 'contactStatusChange':
                this.handleContactStatusChange(data.payload);
                break;
            default:
                console.log('未知消息类型:', data.type);
        }
    }

    // 处理联系人更新
    handleContactUpdate(payload) {
        this.contacts = payload.contacts || [];
        this.groups = payload.groups || [];
        this.renderContactGroups();
        
        // 如果当前选中的联系人被更新，刷新详情
        if (this.currentContactId) {
            this.showContactDetail(this.currentContactId);
        }
    }

    // 处理联系人状态变化
    handleContactStatusChange(payload) {
        const { contactId, status } = payload;
        const contact = this.contacts.find(c => c.id === contactId);
        
        if (contact) {
            contact.status = status;
            this.renderContactGroups();
            
            // 如果是当前选中的联系人，更新详情
            if (this.currentContactId === contactId) {
                this.showContactDetail(contactId);
            }
        }
    }
}

// 初始化插件
const contactPlugin = new ContactPlugin();

// 暴露给主应用的接口
if (window.parent && window.parent !== window) {
    window.parent.postMessage({
        type: 'pluginReady',
        plugin: 'contact-plugin',
        api: {
            getInfo: () => contactPlugin.getPluginInfo(),
            handleMessage: (data) => contactPlugin.handleMessage(data)
        }
    }, '*');
}

// 监听来自主应用的消息
window.addEventListener('message', (event) => {
    if (event.data.type === 'pluginMessage' && event.data.target === 'contact-plugin') {
        contactPlugin.handleMessage(event.data.payload);
    }
});

console.log('通讯录插件已加载');