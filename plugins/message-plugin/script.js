// 消息插件主逻辑
class MessagePlugin {
    constructor() {
        this.currentChatId = null;
        this.chats = [];
        this.messages = {};
        this.currentFilter = 'all';
        this.searchKeyword = '';
        this.loading = false;
        this.init();
    }

    async init() {
        this.updateLoadingState(true);
        await this.loadChatData();
        this.bindEvents();
        this.renderInterface();
        this.updateLoadingState(false);
    }

    // 加载聊天数据
    async loadChatData() {
        try {
            // 从主应用获取聊天数据
            if (window.electronAPI && window.electronAPI.invoke) {
                const result = await window.electronAPI.invoke('plugin:data', {
                    action: 'query',
                    table: 'chats',
                    conditions: {}
                });
                
                if (result.success) {
                    this.chats = result.data || [];
                } else {
                    console.error('获取聊天数据失败:', result.error);
                    this.chats = [];
                }
            } else {
                // 模拟数据用于开发测试
                this.chats = [
                    {
                        id: '1',
                        name: '张三',
                        avatar: 'Z',
                        type: 'friend',
                        lastMessage: '你好，最近怎么样？',
                        lastTime: '2024-01-15 10:30',
                        unread: 2,
                        pinned: true,
                        online: true,
                        lastUpdated: new Date('2024-01-15 10:30').getTime()
                    },
                    {
                        id: '2',
                        name: '李四',
                        avatar: 'L',
                        type: 'friend',
                        lastMessage: '明天的会议准备好了吗？',
                        lastTime: '2024-01-15 09:15',
                        unread: 0,
                        pinned: false,
                        online: false,
                        lastUpdated: new Date('2024-01-15 09:15').getTime()
                    },
                    {
                        id: '3',
                        name: '开发团队',
                        avatar: 'K',
                        type: 'group',
                        lastMessage: '文件已经发送给你了',
                        lastTime: '2024-01-14 18:20',
                        unread: 1,
                        pinned: false,
                        online: true,
                        lastUpdated: new Date('2024-01-14 18:20').getTime()
                    },
                    {
                        id: '4',
                        name: '王五',
                        avatar: 'W',
                        type: 'friend',
                        lastMessage: '好的，收到了',
                        lastTime: '2024-01-14 16:45',
                        unread: 0,
                        pinned: true,
                        online: true,
                        lastUpdated: new Date('2024-01-14 16:45').getTime()
                    }
                ];
            }
        } catch (error) {
            console.error('加载聊天数据失败:', error);
            this.chats = [];
        } finally {
            this.updateLoadingState(false);
        }
    }

    // 加载聊天消息
    async loadMessages(chatId) {
        try {
            if (window.electronAPI && window.electronAPI.invoke) {
                const result = await window.electronAPI.invoke('plugin:data', {
                    action: 'query',
                    table: 'messages',
                    conditions: { chatId: chatId },
                    orderBy: 'timestamp ASC'
                });
                
                if (result.success) {
                    this.messages[chatId] = result.data || [];
                } else {
                    console.error('获取消息数据失败:', result.error);
                    this.messages[chatId] = [];
                }
            } else {
                // 模拟消息数据
                this.messages[chatId] = [
                    {
                        id: '1',
                        content: '你好！',
                        type: 'received',
                        time: '2024-01-15 10:25',
                        timestamp: new Date('2024-01-15 10:25').getTime(),
                        sender: {
                            id: chatId,
                            name: '张三',
                            avatar: 'Z'
                        }
                    },
                    {
                        id: '2',
                        content: '你好，最近怎么样？',
                        type: 'sent',
                        time: '2024-01-15 10:30',
                        timestamp: new Date('2024-01-15 10:30').getTime(),
                        sender: {
                            id: 'me',
                            name: '我',
                            avatar: 'M'
                        }
                    },
                    {
                        id: '3',
                        content: '最近工作比较忙，你呢？',
                        type: 'received',
                        time: '2024-01-15 10:32',
                        timestamp: new Date('2024-01-15 10:32').getTime(),
                        sender: {
                            id: chatId,
                            name: '张三',
                            avatar: 'Z'
                        }
                    }
                ];
            }
        } catch (error) {
            console.error('加载消息失败:', error);
            this.messages[chatId] = [];
        }
    }

    // 绑定事件
    bindEvents() {
        // 搜索功能 - 防抖处理
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', this.debounceSearch.bind(this));
        }

        // 过滤标签
        const filterTabs = document.querySelectorAll('.filter-tab');
        filterTabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                // 更新活跃状态
                filterTabs.forEach(t => t.classList.remove('active'));
                e.target.classList.add('active');
                
                // 更新过滤器
                this.currentFilter = e.target.dataset.filter;
                this.renderChatList();
            });
        });

        // 新建聊天按钮
        const newChatBtn = document.getElementById('newChatBtn');
        if (newChatBtn) {
            newChatBtn.addEventListener('click', () => {
                this.showNewChatDialog();
            });
        }

        // 更多操作按钮
        const moreActionsBtn = document.getElementById('moreActionsBtn');
        if (moreActionsBtn) {
            moreActionsBtn.addEventListener('click', () => {
                this.showMoreActionsMenu();
            });
        }

        // 发送消息
        const sendBtn = document.getElementById('sendBtn');
        const messageInput = document.getElementById('messageInput');
        
        if (sendBtn) {
            sendBtn.addEventListener('click', () => {
                this.sendMessage();
            });
        }

        if (messageInput) {
            messageInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendMessage();
                }
            });

            // 自动调整输入框高度
            messageInput.addEventListener('input', (e) => {
                const target = e.target;
                target.style.height = 'auto';
                target.style.height = Math.min(target.scrollHeight, 120) + 'px';
                
                // 更新发送按钮状态
                const sendBtn = document.getElementById('sendBtn');
                if (sendBtn) {
                    sendBtn.disabled = !target.value.trim();
                }
            });
        }

        // 工具栏按钮
        const toolbarBtns = {
            emojiBtn: () => this.showEmojiPicker(),
            fileBtn: () => this.selectFile(),
            imageBtn: () => this.selectImage(),
            voiceBtn: () => this.startVoiceRecord()
        };

        Object.keys(toolbarBtns).forEach(btnId => {
            const btn = document.getElementById(btnId);
            if (btn) {
                btn.addEventListener('click', toolbarBtns[btnId]);
            }
        });

        // 聊天工具按钮
        const chatToolBtns = {
            voiceCallBtn: () => this.startVoiceCall(),
            videoCallBtn: () => this.startVideoCall(),
            chatInfoBtn: () => this.showChatInfo()
        };

        Object.keys(chatToolBtns).forEach(btnId => {
            const btn = document.getElementById(btnId);
            if (btn) {
                btn.addEventListener('click', chatToolBtns[btnId]);
            }
        });
    }

    // 防抖搜索
    debounceSearch(e) {
        clearTimeout(this.searchTimeout);
        this.searchTimeout = setTimeout(() => {
            this.searchKeyword = e.target.value.trim();
            this.renderChatList();
        }, 300);
    }

    // 更新加载状态
    updateLoadingState(loading) {
        this.loading = loading;
        const loadingState = document.getElementById('loadingState');
        const chatList = document.getElementById('chatList');
        
        if (loadingState && chatList) {
            if (loading) {
                loadingState.classList.remove('hidden');
                chatList.classList.add('hidden');
            } else {
                loadingState.classList.add('hidden');
                chatList.classList.remove('hidden');
            }
        }
    }

    // 渲染界面
    renderInterface() {
        this.renderChatList();
    }

    // 过滤和排序聊天列表
    getFilteredChats() {
        let filteredChats = [...this.chats];

        // 按类型过滤
        if (this.currentFilter !== 'all') {
            switch (this.currentFilter) {
                case 'friends':
                    filteredChats = filteredChats.filter(chat => chat.type === 'friend');
                    break;
                case 'groups':
                    filteredChats = filteredChats.filter(chat => chat.type === 'group');
                    break;
                case 'unread':
                    filteredChats = filteredChats.filter(chat => chat.unread > 0);
                    break;
            }
        }

        // 按搜索关键词过滤
        if (this.searchKeyword) {
            filteredChats = filteredChats.filter(chat => 
                chat.name.toLowerCase().includes(this.searchKeyword.toLowerCase()) ||
                chat.lastMessage.toLowerCase().includes(this.searchKeyword.toLowerCase())
            );
        }

        // 排序：置顶的在前，然后按最后更新时间排序
        filteredChats.sort((a, b) => {
            if (a.pinned && !b.pinned) return -1;
            if (!a.pinned && b.pinned) return 1;
            return (b.lastUpdated || 0) - (a.lastUpdated || 0);
        });

        return filteredChats;
    }

    // 格式化时间显示
    formatTime(timeStr) {
        const now = new Date();
        const time = new Date(timeStr);
        const diffMs = now - time;
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        
        if (diffDays === 0) {
            // 今天，显示时间
            return time.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
        } else if (diffDays === 1) {
            // 昨天
            return '昨天';
        } else if (diffDays < 7) {
            // 一周内，显示星期
            const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
            return weekdays[time.getDay()];
        } else {
            // 超过一周，显示日期
            return time.toLocaleDateString('zh-CN', { month: '2-digit', day: '2-digit' });
        }
    }

    // 渲染聊天列表
    renderChatList() {
        const chatList = document.getElementById('chatList');
        if (!chatList) return;
        
        const filteredChats = this.getFilteredChats();
        chatList.innerHTML = '';

        if (filteredChats.length === 0) {
            chatList.innerHTML = `
                <div class="empty-state">
                    <div class="icon">🔍</div>
                    <h3>没有找到聊天</h3>
                    <p>尝试调整搜索条件或创建新的聊天</p>
                </div>
            `;
            return;
        }

        filteredChats.forEach(chat => {
            const chatItem = document.createElement('div');
            chatItem.className = `chat-item ${chat.pinned ? 'pinned' : ''} ${this.currentChatId === chat.id ? 'active' : ''}`;
            chatItem.dataset.chatId = chat.id;
            
            chatItem.innerHTML = `
                <div class="chat-avatar">
                    ${chat.avatar}
                    ${chat.online ? '<div class="online-indicator"></div>' : ''}
                </div>
                <div class="chat-info">
                    <div class="chat-header">
                        <div class="chat-name">${chat.name}</div>
                        <div class="chat-time">${this.formatTime(chat.lastTime)}</div>
                    </div>
                    <div class="chat-preview">${chat.lastMessage}</div>
                </div>
                ${chat.unread > 0 ? `<div class="unread-badge">${chat.unread}</div>` : ''}
            `;

            chatItem.addEventListener('click', () => {
                this.selectChat(chat.id);
            });

            // 右键菜单
            chatItem.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                this.showChatContextMenu(e, chat);
            });

            chatList.appendChild(chatItem);
        });
    }

    // 切换过滤器
    switchFilter(filter) {
        this.currentFilter = filter;
        
        // 更新过滤器按钮状态
        const filterTabs = document.querySelectorAll('.filter-tab');
        filterTabs.forEach(tab => {
            tab.classList.toggle('active', tab.dataset.filter === filter);
        });
        
        this.renderChatList();
    }

    // 显示聊天右键菜单
    showChatContextMenu(e, chat) {
        // 创建右键菜单
        const menu = document.createElement('div');
        menu.className = 'context-menu';
        menu.style.position = 'fixed';
        menu.style.left = e.clientX + 'px';
        menu.style.top = e.clientY + 'px';
        menu.style.zIndex = '9999';
        
        menu.innerHTML = `
            <div class="menu-item" data-action="pin">
                ${chat.pinned ? '取消置顶' : '置顶聊天'}
            </div>
            <div class="menu-item" data-action="mute">
                ${chat.muted ? '取消免打扰' : '消息免打扰'}
            </div>
            <div class="menu-item" data-action="delete">删除聊天</div>
        `;
        
        // 添加菜单事件
        menu.addEventListener('click', (e) => {
            const action = e.target.dataset.action;
            if (action) {
                this.handleChatAction(chat.id, action);
                document.body.removeChild(menu);
            }
        });
        
        // 点击其他地方关闭菜单
        const closeMenu = (e) => {
            if (!menu.contains(e.target)) {
                document.body.removeChild(menu);
                document.removeEventListener('click', closeMenu);
            }
        };
        
        document.body.appendChild(menu);
        setTimeout(() => {
            document.addEventListener('click', closeMenu);
        }, 0);
    }

    // 处理聊天操作
    handleChatAction(chatId, action) {
        const chat = this.chats.find(c => c.id === chatId);
        if (!chat) return;
        
        switch (action) {
            case 'pin':
                chat.pinned = !chat.pinned;
                break;
            case 'mute':
                chat.muted = !chat.muted;
                break;
            case 'delete':
                if (confirm('确定要删除这个聊天吗？')) {
                    this.chats = this.chats.filter(c => c.id !== chatId);
                    if (this.currentChatId === chatId) {
                        this.currentChatId = null;
                        this.showEmptyChat();
                    }
                }
                break;
        }
        
        this.renderChatList();
    }

    // 选择聊天
    async selectChat(chatId) {
        // 更新当前聊天ID
        this.currentChatId = chatId;
        
        // 更新聊天列表中的选中状态
        const chatItems = document.querySelectorAll('.chat-item');
        chatItems.forEach(item => {
            item.classList.toggle('active', item.dataset.chatId === chatId);
        });
        
        // 清除未读消息
        const chat = this.chats.find(c => c.id === chatId);
        if (chat && chat.unread > 0) {
            chat.unread = 0;
            this.renderChatList();
        }
        
        // 显示聊天界面
        this.showActiveChat();
        
        // 加载并显示消息
        await this.loadMessages(chatId);
        this.renderMessages();
    }

    // 显示活跃聊天
    showActiveChat() {
        const emptyChat = document.getElementById('emptyChat');
        const activeChat = document.getElementById('activeChat');
        
        if (emptyChat && activeChat) {
            emptyChat.classList.add('hidden');
            activeChat.classList.remove('hidden');
        }
        
        // 更新聊天标题
        this.updateChatHeader();
    }

    // 显示空聊天状态
    showEmptyChat() {
        const emptyChat = document.getElementById('emptyChat');
        const activeChat = document.getElementById('activeChat');
        
        if (emptyChat && activeChat) {
            emptyChat.classList.remove('hidden');
            activeChat.classList.add('hidden');
        }
    }

    // 更新聊天头部信息
    updateChatHeader() {
        if (!this.currentChatId) return;
        
        const chat = this.chats.find(c => c.id === this.currentChatId);
        if (!chat) return;
        
        const chatAvatar = document.querySelector('.chat-title .chat-avatar');
        const chatName = document.querySelector('.chat-title .chat-name');
        const chatStatus = document.querySelector('.chat-title .chat-status');
        
        if (chatAvatar) chatAvatar.innerHTML = chat.avatar;
        if (chatName) chatName.textContent = chat.name;
        if (chatStatus) {
            if (chat.type === 'friend') {
                chatStatus.textContent = chat.online ? '在线' : '离线';
                chatStatus.className = `chat-status ${chat.online ? 'online' : 'offline'}`;
            } else {
                chatStatus.textContent = `${chat.memberCount || 0}人`;
                chatStatus.className = 'chat-status';
            }
        }
    }

    // 渲染消息
    renderMessages() {
        const chatMessages = document.getElementById('chatMessages');
        if (!chatMessages) return;
        
        chatMessages.innerHTML = '';
        
        const messages = this.messages[this.currentChatId] || [];
        
        if (messages.length === 0) {
            chatMessages.innerHTML = `
                <div class="empty-messages">
                    <div class="icon">💬</div>
                    <p>还没有消息，开始聊天吧！</p>
                </div>
            `;
            return;
        }

        messages.forEach((message, index) => {
            const messageDiv = document.createElement('div');
            const isOwn = message.type === 'sent';
            messageDiv.className = `message-item ${message.type}`;
            
            // 检查是否需要显示时间分隔符
            const showTimeSeparator = this.shouldShowTimeSeparator(messages, index);
            if (showTimeSeparator) {
                const timeSeparator = document.createElement('div');
                timeSeparator.className = 'time-separator';
                timeSeparator.textContent = this.formatMessageTime(message.timestamp);
                chatMessages.appendChild(timeSeparator);
            }
            
            messageDiv.innerHTML = `
                ${!isOwn && message.sender ? `<div class="message-avatar">${message.sender.avatar || '👤'}</div>` : ''}
                <div class="message-content">
                    <div class="message-bubble">
                        ${this.renderMessageContent(message)}
                    </div>
                    <div class="message-time">${message.time}</div>
                </div>
                ${isOwn ? `<div class="message-avatar">👤</div>` : ''}
            `;
            
            chatMessages.appendChild(messageDiv);
        });
        
        // 滚动到底部
        this.scrollToBottom();
    }

    // 判断是否显示时间分隔符
    shouldShowTimeSeparator(messages, index) {
        if (index === 0) return true;
        
        const currentMessage = messages[index];
        const previousMessage = messages[index - 1];
        
        const currentTime = new Date(currentMessage.timestamp || currentMessage.time);
        const previousTime = new Date(previousMessage.timestamp || previousMessage.time);
        
        // 如果时间间隔超过5分钟，显示时间分隔符
        return (currentTime - previousTime) > 5 * 60 * 1000;
    }

    // 格式化消息时间
    formatMessageTime(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        
        if (date.toDateString() === now.toDateString()) {
            return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
        } else {
            return date.toLocaleString('zh-CN', { 
                month: '2-digit', 
                day: '2-digit', 
                hour: '2-digit', 
                minute: '2-digit' 
            });
        }
    }

    // 渲染消息内容
    renderMessageContent(message) {
        switch (message.messageType || 'text') {
            case 'text':
                return this.escapeHtml(message.content);
            case 'image':
                return `<img src="${message.content}" alt="图片" class="message-image" onclick="this.showImagePreview('${message.content}')"/>`;
            case 'file':
                return `
                    <div class="message-file">
                        <div class="file-icon">📄</div>
                        <div class="file-info">
                            <div class="file-name">${message.fileName}</div>
                            <div class="file-size">${message.fileSize}</div>
                        </div>
                        <button class="file-download" onclick="this.downloadFile('${message.content}')">下载</button>
                    </div>
                `;
            case 'voice':
                return `
                    <div class="message-voice">
                        <button class="voice-play" onclick="this.playVoice('${message.content}')">
                            🎵 ${message.duration || '0:00'}
                        </button>
                    </div>
                `;
            default:
                return this.escapeHtml(message.content);
        }
    }

    // HTML转义
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // 滚动到底部
    scrollToBottom() {
        const chatMessages = document.getElementById('chatMessages');
        if (chatMessages) {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }

    // 发送消息
    async sendMessage(content = null, type = 'text') {
        const messageInput = document.getElementById('messageInput');
        const messageContent = content || messageInput?.value.trim();
        
        if (!messageContent || !this.currentChatId) return;
        
        const message = {
            id: Date.now().toString(),
            chatId: this.currentChatId,
            content: messageContent,
            messageType: type,
            type: 'sent',
            timestamp: new Date().toISOString(),
            time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
            sender: {
                id: 'me',
                name: '我',
                avatar: '👤'
            }
        };
        
        // 添加到本地消息列表
        if (!this.messages[this.currentChatId]) {
            this.messages[this.currentChatId] = [];
        }
        this.messages[this.currentChatId].push(message);
        
        // 清空输入框
        if (messageInput) {
            messageInput.value = '';
            this.autoResizeTextarea(messageInput);
        }
        
        // 重新渲染消息
        this.renderMessages();
        
        // 更新聊天列表中的最后消息
        const chat = this.chats.find(c => c.id === this.currentChatId);
        if (chat) {
            chat.lastMessage = type === 'text' ? messageContent : this.getMessagePreview(type);
            chat.lastTime = message.timestamp;
            chat.lastUpdated = Date.now();
            this.renderChatList();
            // 重新选中当前聊天
            document.querySelector(`[data-chat-id="${this.currentChatId}"]`)?.classList.add('active');
        }
        
        try {
            // 通过新的数据API保存消息
            if (window.electronAPI && window.electronAPI.invoke) {
                await window.electronAPI.invoke('plugin:data', {
                    action: 'insert',
                    table: 'messages',
                    data: message
                });
                
                // 更新聊天信息
                await window.electronAPI.invoke('plugin:data', {
                    action: 'update',
                    table: 'chats',
                    where: { id: this.currentChatId },
                    data: {
                        lastMessage: chat.lastMessage,
                        lastTime: chat.lastTime,
                        lastUpdated: chat.lastUpdated
                    }
                });
            }
        } catch (error) {
            console.error('发送消息失败:', error);
        }
    }

    // 获取消息预览文本
    getMessagePreview(type) {
        switch (type) {
            case 'image': return '[图片]';
            case 'file': return '[文件]';
            case 'voice': return '[语音]';
            case 'video': return '[视频]';
            default: return '[消息]';
        }
    }

    // 自动调整文本框高度
    autoResizeTextarea(textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
    }

    // 发送文件
    async sendFile(file) {
        if (!file || !this.currentChatId) return;
        
        // 这里应该上传文件并获取URL
        const fileUrl = URL.createObjectURL(file);
        const fileType = file.type.startsWith('image/') ? 'image' : 'file';
        
        const message = {
            content: fileUrl,
            messageType: fileType,
            fileName: file.name,
            fileSize: this.formatFileSize(file.size)
        };
        
        await this.sendMessage(fileUrl, fileType);
    }

    // 格式化文件大小
    formatFileSize(bytes) {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    // 插件API接口
    getPluginInfo() {
        return {
            name: 'message-plugin',
            version: '2.0.0',
            description: '消息聊天插件 - 支持多种消息类型和实时通信',
            author: 'Why-Talk Team'
        };
    }

    // 处理来自主应用的消息
    handleMessage(data) {
        switch (data.type) {
            case 'newMessage':
                this.handleNewMessage(data.payload);
                break;
            case 'chatUpdate':
                this.handleChatUpdate(data.payload);
                break;
            case 'userStatusUpdate':
                this.handleUserStatusUpdate(data.payload);
                break;
            case 'messageRead':
                this.handleMessageRead(data.payload);
                break;
            default:
                console.log('未知消息类型:', data.type);
        }
    }

    // 处理新消息
    handleNewMessage(payload) {
        const { chatId, message } = payload;
        
        if (!this.messages[chatId]) {
            this.messages[chatId] = [];
        }
        
        this.messages[chatId].push({
            ...message,
            type: 'received'
        });
        
        // 如果是当前聊天，更新消息显示
        if (this.currentChatId === chatId) {
            this.renderMessages();
        }
        
        // 更新聊天列表
        const chat = this.chats.find(c => c.id === chatId);
        if (chat) {
            chat.lastMessage = message.messageType === 'text' ? message.content : this.getMessagePreview(message.messageType);
            chat.lastTime = message.timestamp || message.time;
            chat.lastUpdated = Date.now();
            if (this.currentChatId !== chatId) {
                chat.unread = (chat.unread || 0) + 1;
            }
            this.renderChatList();
            if (this.currentChatId) {
                document.querySelector(`[data-chat-id="${this.currentChatId}"]`)?.classList.add('active');
            }
        }
        
        // 播放提示音（如果不是当前聊天）
        if (this.currentChatId !== chatId) {
            this.playNotificationSound();
        }
    }

    // 处理聊天更新
    handleChatUpdate(payload) {
        if (payload.chats) {
            this.chats = payload.chats;
        } else if (payload.chat) {
            const index = this.chats.findIndex(c => c.id === payload.chat.id);
            if (index !== -1) {
                this.chats[index] = { ...this.chats[index], ...payload.chat };
            }
        }
        this.renderChatList();
        
        // 如果是当前聊天，更新头部信息
        if (payload.chat && payload.chat.id === this.currentChatId) {
            this.updateChatHeader();
        }
    }

    // 处理用户状态更新
    handleUserStatusUpdate(payload) {
        const { userId, online } = payload;
        
        // 更新相关聊天的在线状态
        this.chats.forEach(chat => {
            if (chat.type === 'friend' && chat.userId === userId) {
                chat.online = online;
            }
        });
        
        this.renderChatList();
        
        // 如果是当前聊天，更新头部状态
        const currentChat = this.chats.find(c => c.id === this.currentChatId);
        if (currentChat && currentChat.userId === userId) {
            this.updateChatHeader();
        }
    }

    // 处理消息已读
    handleMessageRead(payload) {
        const { chatId, messageId } = payload;
        const chat = this.chats.find(c => c.id === chatId);
        if (chat) {
            chat.unread = 0;
            this.renderChatList();
        }
    }

    // 播放通知音
    playNotificationSound() {
        try {
            const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT');
            audio.volume = 0.3;
            audio.play().catch(() => {});
        } catch (error) {
            // 忽略音频播放错误
        }
    }

    // 显示表情选择器
    showEmojiPicker() {
        const emojis = ['😀', '😂', '😍', '🤔', '😢', '😡', '👍', '👎', '❤️', '🎉'];
        const emojiHtml = emojis.map(emoji => `<span class="emoji-item" onclick="messagePlugin.insertEmoji('${emoji}')">${emoji}</span>`).join('');
        
        const panel = document.createElement('div');
        panel.className = 'emoji-panel';
        panel.innerHTML = emojiHtml;
        panel.style.cssText = 'position:absolute;bottom:60px;right:10px;background:white;border:1px solid #ddd;border-radius:8px;padding:10px;box-shadow:0 2px 10px rgba(0,0,0,0.1);z-index:1000;';
        
        document.body.appendChild(panel);
        
        setTimeout(() => {
            const closePanel = (e) => {
                if (!panel.contains(e.target)) {
                    document.body.removeChild(panel);
                    document.removeEventListener('click', closePanel);
                }
            };
            document.addEventListener('click', closePanel);
        }, 0);
    }

    // 插入表情
    insertEmoji(emoji) {
        const messageInput = document.getElementById('messageInput');
        if (messageInput) {
            messageInput.value += emoji;
            messageInput.focus();
            this.autoResizeTextarea(messageInput);
        }
    }

    // 选择文件
    selectFile() {
        const input = document.createElement('input');
        input.type = 'file';
        input.multiple = true;
        input.onchange = (e) => {
            Array.from(e.target.files).forEach(file => {
                this.sendFile(file);
            });
        };
        input.click();
    }

    // 选择图片
    selectImage() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.multiple = true;
        input.onchange = (e) => {
            Array.from(e.target.files).forEach(file => {
                this.sendFile(file);
            });
        };
        input.click();
    }

    // 开始语音录制
    startVoiceRecord() {
        alert('语音录制功能开发中...');
    }

    // 开始语音通话
    startVoiceCall() {
        if (!this.currentChatId) return;
        alert('语音通话功能开发中...');
    }

    // 开始视频通话
    startVideoCall() {
        if (!this.currentChatId) return;
        alert('视频通话功能开发中...');
    }

    // 显示聊天信息
    showChatInfo() {
        if (!this.currentChatId) return;
        const chat = this.chats.find(c => c.id === this.currentChatId);
        if (chat) {
            alert(`聊天信息：\n名称：${chat.name}\n类型：${chat.type === 'friend' ? '好友' : '群组'}\n在线状态：${chat.online ? '在线' : '离线'}`);
        }
    }

    // 显示新建聊天对话框
    showNewChatDialog() {
        alert('新建聊天功能开发中...');
    }

    // 显示更多操作菜单
    showMoreActionsMenu() {
        alert('更多操作功能开发中...');
    }

    // 显示图片预览
    showImagePreview(src) {
        const overlay = document.createElement('div');
        overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);z-index:9999;display:flex;align-items:center;justify-content:center;';
        
        const img = document.createElement('img');
        img.src = src;
        img.style.cssText = 'max-width:90%;max-height:90%;object-fit:contain;';
        
        overlay.appendChild(img);
        overlay.onclick = () => document.body.removeChild(overlay);
        document.body.appendChild(overlay);
    }

    // 下载文件
    downloadFile(url) {
        const a = document.createElement('a');
        a.href = url;
        a.download = '';
        a.click();
    }

    // 播放语音
    playVoice(url) {
        const audio = new Audio(url);
        audio.play().catch(error => {
            console.error('播放语音失败:', error);
        });
    }
}

// 初始化插件
const messagePlugin = new MessagePlugin();

// 等待DOM加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        messagePlugin.init();
    });
} else {
    messagePlugin.init();
}

// 向父窗口发送插件就绪消息
window.parent.postMessage({
    type: 'plugin-ready',
    pluginName: 'message-plugin',
    api: {
        sendMessage: 'sendMessage',
        selectChat: 'selectChat',
        switchFilter: 'switchFilter',
        showNewChatDialog: 'showNewChatDialog'
    }
}, '*');

// 暴露插件API到全局
window.messagePlugin = messagePlugin;

// 监听来自主应用的消息
window.addEventListener('message', (event) => {
    if (event.data.type === 'plugin-message' && event.data.target === 'message-plugin') {
        messagePlugin.handleMessage(event.data);
    }
});

// 监听窗口大小变化
window.addEventListener('resize', () => {
    // 重新调整消息容器滚动位置
    if (messagePlugin.currentChatId) {
        setTimeout(() => messagePlugin.scrollToBottom(), 100);
    }
});

// 监听键盘快捷键
document.addEventListener('keydown', (e) => {
    // Ctrl+N 新建聊天
    if (e.ctrlKey && e.key === 'n') {
        e.preventDefault();
        messagePlugin.showNewChatDialog();
    }
    
    // Esc 关闭当前聊天
    if (e.key === 'Escape' && messagePlugin.currentChatId) {
        messagePlugin.currentChatId = null;
        messagePlugin.showEmptyChat();
        
        // 清除所有聊天项的选中状态
        document.querySelectorAll('.chat-item').forEach(item => {
            item.classList.remove('active');
        });
    }
});

// 全局错误处理
window.addEventListener('error', (event) => {
    console.error('MessagePlugin Error:', event.error);
});

// 页面卸载时清理
window.addEventListener('beforeunload', () => {
    // 清理定时器
    if (messagePlugin.searchTimeout) {
        clearTimeout(messagePlugin.searchTimeout);
    }
});

console.log('消息插件已加载');