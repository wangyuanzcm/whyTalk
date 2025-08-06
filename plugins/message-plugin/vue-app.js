const { createApp, ref, reactive, computed, onMounted, nextTick } = Vue;
const { 
  NLayout, NLayoutSider, NLayoutContent, NLayoutHeader,
  NButton, NInput, NCard, NList, NListItem, NAvatar, NBadge,
  NModal, NForm, NFormItem, NSelect, NCheckbox, NSpace,
  NIcon, NDropdown, NMessage, NUpload, NProgress,
  NTabs, NTabPane, NEmpty, NSpin, NPopover, NTooltip,
  NInputNumber, NRadioButton, NCheckboxGroup
} = naive;

// 主应用组件
const MessageApp = {
  setup() {
    // 响应式数据
    const state = reactive({
      // 聊天列表
      chatList: [
        {
          id: '1',
          name: '张三',
          avatar: '张',
          lastMessage: '你好，最近怎么样？',
          time: '10:30',
          unreadCount: 2,
          type: 'friend',
          online: true,
          pinned: false
        },
        {
          id: '2',
          name: '开发团队',
          avatar: '开',
          lastMessage: '今天的会议改到下午3点',
          time: '09:15',
          unreadCount: 0,
          type: 'group',
          online: true,
          pinned: true
        },
        {
          id: '3',
          name: '李四',
          avatar: '李',
          lastMessage: '文件已发送',
          time: '昨天',
          unreadCount: 1,
          type: 'friend',
          online: false,
          pinned: false
        }
      ],
      // 当前选中的聊天
      currentChat: null,
      // 消息列表
      messages: [],
      // 搜索关键词
      searchKeyword: '',
      // 当前过滤器
      currentFilter: 'all',
      // 消息输入内容
      messageInput: '',
      // 设备列表
      devices: [],
      // LocalSend服务状态
      localSendStatus: false,
      // 可用联系人列表
      contacts: [
        { id: '1', name: '张三', avatar: '张', online: true },
        { id: '2', name: '李四', avatar: '李', online: false },
        { id: '3', name: '王五', avatar: '王', online: true },
        { id: '4', name: '赵六', avatar: '赵', online: true }
      ]
    });

    // 模态框状态
    const modals = reactive({
      createGroup: false,
      addFriend: false,
      deviceList: false,
      fileUpload: false
    });

    // 表单数据
    const forms = reactive({
      groupName: '',
      selectedMembers: [],
      friendId: '',
      friendName: ''
    });

    // 计算属性
    const filteredChats = computed(() => {
      let chats = state.chatList;
      
      // 搜索过滤
      if (state.searchKeyword) {
        chats = chats.filter(chat => 
          chat.name.toLowerCase().includes(state.searchKeyword.toLowerCase()) ||
          chat.lastMessage.toLowerCase().includes(state.searchKeyword.toLowerCase())
        );
      }
      
      // 类型过滤
      if (state.currentFilter !== 'all') {
        switch (state.currentFilter) {
          case 'friends':
            chats = chats.filter(chat => chat.type === 'friend');
            break;
          case 'groups':
            chats = chats.filter(chat => chat.type === 'group');
            break;
          case 'unread':
            chats = chats.filter(chat => chat.unreadCount > 0);
            break;
        }
      }
      
      // 置顶排序
      return chats.sort((a, b) => {
        if (a.pinned && !b.pinned) return -1;
        if (!a.pinned && b.pinned) return 1;
        return 0;
      });
    });

    // 方法定义
    const methods = {
      /**
       * 选择聊天
       * @param {Object} chat - 聊天对象
       */
      selectChat(chat) {
        state.currentChat = chat;
        // 清除未读消息
        chat.unreadCount = 0;
        // 加载消息历史
        this.loadMessages(chat.id);
      },

      /**
       * 加载消息历史
       * @param {string} chatId - 聊天ID
       */
      loadMessages(chatId) {
        // 模拟消息数据
        const mockMessages = [
          {
            id: '1',
            content: '你好！',
            sender: 'other',
            time: '10:25',
            type: 'text'
          },
          {
            id: '2',
            content: '你好，最近怎么样？',
            sender: 'self',
            time: '10:30',
            type: 'text'
          }
        ];
        state.messages = mockMessages;
      },

      /**
       * 发送消息
       */
      sendMessage() {
        if (!state.messageInput.trim() || !state.currentChat) return;
        
        const message = {
          id: Date.now().toString(),
          content: state.messageInput,
          sender: 'self',
          time: new Date().toLocaleTimeString('zh-CN', { 
            hour: '2-digit', 
            minute: '2-digit' 
          }),
          type: 'text'
        };
        
        state.messages.push(message);
        
        // 更新聊天列表中的最后消息
        const chat = state.chatList.find(c => c.id === state.currentChat.id);
        if (chat) {
          chat.lastMessage = state.messageInput;
          chat.time = message.time;
        }
        
        state.messageInput = '';
        
        // 滚动到底部
        nextTick(() => {
          this.scrollToBottom();
        });
      },

      /**
       * 滚动消息到底部
       */
      scrollToBottom() {
        const container = document.querySelector('.messages-container');
        if (container) {
          container.scrollTop = container.scrollHeight;
        }
      },

      /**
       * 显示创建群组模态框
       */
      showCreateGroupModal() {
        forms.groupName = '';
        forms.selectedMembers = [];
        modals.createGroup = true;
      },

      /**
       * 创建群组
       */
      createGroup() {
        if (!forms.groupName.trim()) {
          NMessage.warning('请输入群组名称');
          return;
        }
        
        if (forms.selectedMembers.length === 0) {
          NMessage.warning('请选择至少一个成员');
          return;
        }
        
        const newGroup = {
          id: Date.now().toString(),
          name: forms.groupName,
          avatar: forms.groupName.charAt(0),
          lastMessage: '群组已创建',
          time: new Date().toLocaleTimeString('zh-CN', { 
            hour: '2-digit', 
            minute: '2-digit' 
          }),
          unreadCount: 0,
          type: 'group',
          online: true,
          pinned: false,
          members: forms.selectedMembers
        };
        
        state.chatList.unshift(newGroup);
        modals.createGroup = false;
        
        NMessage.success('群组创建成功');
      },

      /**
       * 显示添加朋友模态框
       */
      showAddFriendModal() {
        forms.friendId = '';
        forms.friendName = '';
        modals.addFriend = true;
      },

      /**
       * 添加朋友
       */
      addFriend() {
        if (!forms.friendId.trim()) {
          NMessage.warning('请输入朋友ID');
          return;
        }
        
        // 检查是否已经是朋友
        const existingFriend = state.chatList.find(chat => 
          chat.type === 'friend' && chat.name === forms.friendName
        );
        
        if (existingFriend) {
          NMessage.warning('该用户已经是您的朋友');
          return;
        }
        
        const newFriend = {
          id: Date.now().toString(),
          name: forms.friendName || forms.friendId,
          avatar: (forms.friendName || forms.friendId).charAt(0),
          lastMessage: '已添加为好友',
          time: new Date().toLocaleTimeString('zh-CN', { 
            hour: '2-digit', 
            minute: '2-digit' 
          }),
          unreadCount: 0,
          type: 'friend',
          online: false,
          pinned: false
        };
        
        state.chatList.unshift(newFriend);
        modals.addFriend = false;
        
        NMessage.success('朋友添加成功');
      },

      /**
       * 截图功能
       */
      async captureScreenshot() {
        try {
          // 检查是否支持屏幕捕获API
          if (!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) {
            NMessage.error('您的浏览器不支持屏幕捕获功能');
            return;
          }
          
          const stream = await navigator.mediaDevices.getDisplayMedia({
            video: { mediaSource: 'screen' }
          });
          
          const video = document.createElement('video');
          video.srcObject = stream;
          video.play();
          
          video.addEventListener('loadedmetadata', () => {
            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            
            const ctx = canvas.getContext('2d');
            ctx.drawImage(video, 0, 0);
            
            // 停止录制
            stream.getTracks().forEach(track => track.stop());
            
            // 转换为blob并发送
            canvas.toBlob(blob => {
              this.sendImageMessage(blob);
            }, 'image/png');
          });
          
        } catch (error) {
          console.error('截图失败:', error);
          NMessage.error('截图失败，请重试');
        }
      },

      /**
       * 发送图片消息
       * @param {Blob} imageBlob - 图片blob
       */
      sendImageMessage(imageBlob) {
        if (!state.currentChat) {
          NMessage.warning('请先选择一个聊天');
          return;
        }
        
        const imageUrl = URL.createObjectURL(imageBlob);
        
        const message = {
          id: Date.now().toString(),
          content: imageUrl,
          sender: 'self',
          time: new Date().toLocaleTimeString('zh-CN', { 
            hour: '2-digit', 
            minute: '2-digit' 
          }),
          type: 'image'
        };
        
        state.messages.push(message);
        
        // 更新聊天列表中的最后消息
        const chat = state.chatList.find(c => c.id === state.currentChat.id);
        if (chat) {
          chat.lastMessage = '[图片]';
          chat.time = message.time;
        }
        
        nextTick(() => {
          this.scrollToBottom();
        });
        
        NMessage.success('截图发送成功');
      },

      /**
       * 处理文件上传
       * @param {Object} options - 上传选项
       */
      handleFileUpload(options) {
        const { file } = options;
        
        if (!state.currentChat) {
          NMessage.warning('请先选择一个聊天');
          return;
        }
        
        // 检查文件大小（限制为10MB）
        if (file.file.size > 10 * 1024 * 1024) {
          NMessage.error('文件大小不能超过10MB');
          return;
        }
        
        const message = {
          id: Date.now().toString(),
          content: file.name,
          sender: 'self',
          time: new Date().toLocaleTimeString('zh-CN', { 
            hour: '2-digit', 
            minute: '2-digit' 
          }),
          type: 'file',
          fileSize: this.formatFileSize(file.file.size),
          fileType: file.file.type
        };
        
        state.messages.push(message);
        
        // 更新聊天列表中的最后消息
        const chat = state.chatList.find(c => c.id === state.currentChat.id);
        if (chat) {
          chat.lastMessage = `[文件] ${file.name}`;
          chat.time = message.time;
        }
        
        nextTick(() => {
          this.scrollToBottom();
        });
        
        NMessage.success('文件发送成功');
      },

      /**
       * 格式化文件大小
       * @param {number} bytes - 字节数
       * @returns {string} 格式化后的文件大小
       */
      formatFileSize(bytes) {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
      },

      /**
       * 切换过滤器
       * @param {string} filter - 过滤器类型
       */
      setFilter(filter) {
        state.currentFilter = filter;
      },

      /**
       * 切换LocalSend服务
       */
      toggleLocalSendService() {
        state.localSendStatus = !state.localSendStatus;
        if (state.localSendStatus) {
          this.startDeviceDiscovery();
          NMessage.success('LocalSend服务已启动');
        } else {
          state.devices = [];
          NMessage.info('LocalSend服务已停止');
        }
      },

      /**
       * 开始设备发现
       */
      startDeviceDiscovery() {
        // 模拟设备发现
        setTimeout(() => {
          state.devices = [
            {
              id: '1',
              name: '我的手机',
              ip: '192.168.1.100',
              port: 53317,
              type: 'mobile',
              online: true
            },
            {
              id: '2',
              name: '办公电脑',
              ip: '192.168.1.101',
              port: 53317,
              type: 'desktop',
              online: true
            }
          ];
        }, 1000);
      },

      /**
       * 显示设备列表
       */
      showDeviceList() {
        modals.deviceList = true;
        if (state.localSendStatus) {
          this.startDeviceDiscovery();
        }
      },

      /**
       * 处理键盘事件
       * @param {KeyboardEvent} event - 键盘事件
       */
      handleKeyPress(event) {
        if (event.key === 'Enter' && !event.shiftKey) {
          event.preventDefault();
          this.sendMessage();
        }
      }
    };

    // 生命周期
    onMounted(() => {
      // 初始化插件
      console.log('消息插件已加载');
      
      // 向主应用发送就绪消息
      if (window.parent !== window) {
        window.parent.postMessage({
          type: 'plugin-ready',
          plugin: 'message-plugin'
        }, '*');
      }
    });

    return {
      state,
      modals,
      forms,
      filteredChats,
      ...methods
    };
  },

  template: `
    <n-layout style="height: 100vh;">
      <!-- 左侧边栏组件 -->
      <chat-sidebar
        :chats="filteredChats"
        :current-chat="state.currentChat"
        :search-keyword="state.searchKeyword"
        :active-filter="state.currentFilter"
        :local-send-enabled="state.localSendStatus"
        @select-chat="selectChat"
        @update:search-keyword="state.searchKeyword = $event"
        @update:active-filter="state.currentFilter = $event"
        @show-add-friend="showAddFriendModal"
        @show-create-group="showCreateGroupModal"
        @capture-screenshot="captureScreenshot"
        @toggle-local-send="toggleLocalSendService"
      />

        <!-- 搜索框 -->
        <div style="padding: 12px 16px; background: white; border-bottom: 1px solid #e0e0e0;">
          <n-input 
            v-model:value="state.searchKeyword"
            placeholder="搜索聊天记录..."
            round
            clearable
          />
        </div>

        <!-- 过滤标签 -->
        <n-tabs 
          v-model:value="state.currentFilter" 
          type="segment" 
          size="small"
          style="padding: 0 16px; background: white; border-bottom: 1px solid #e0e0e0;"
          @update:value="setFilter"
        >
          <n-tab-pane name="all" tab="全部" />
          <n-tab-pane name="friends" tab="好友" />
          <n-tab-pane name="groups" tab="群聊" />
          <n-tab-pane name="unread" tab="未读" />
        </n-tabs>

        <!-- 聊天列表 -->
        <div style="flex: 1; overflow-y: auto;">
          <n-list>
            <n-list-item 
              v-for="chat in filteredChats" 
              :key="chat.id"
              style="cursor: pointer; padding: 12px 16px;"
              :class="{ 'active': state.currentChat?.id === chat.id }"
              @click="selectChat(chat)"
            >
              <div style="display: flex; align-items: center; width: 100%;">
                <n-badge :value="chat.unreadCount" :show="chat.unreadCount > 0">
                  <n-avatar 
                    :style="{ background: '#2196f3' }"
                    size="medium"
                  >
                    {{ chat.avatar }}
                    <div 
                      v-if="chat.online"
                      style="position: absolute; bottom: 2px; right: 2px; width: 12px; height: 12px; border-radius: 50%; background: #4caf50; border: 2px solid white;"
                    ></div>
                  </n-avatar>
                </n-badge>
                <div style="flex: 1; margin-left: 12px; min-width: 0;">
                  <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;">
                    <div style="font-weight: 500; font-size: 15px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                      {{ chat.name }}
                      <span v-if="chat.pinned" style="margin-left: 4px;">📌</span>
                    </div>
                    <div style="font-size: 12px; color: #999;">{{ chat.time }}</div>
                  </div>
                  <div style="font-size: 13px; color: #666; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                    {{ chat.lastMessage }}
                  </div>
                </div>
              </div>
            </n-list-item>
          </n-list>
        </div>
      </n-layout-sider>

      <!-- 主内容区域 -->
      <n-layout-content>
        <!-- 空状态 -->
        <div 
          v-if="!state.currentChat"
          style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; color: #999;"
        >
          <div style="font-size: 48px; margin-bottom: 16px;">💬</div>
          <h3 style="margin: 0 0 8px 0; font-size: 18px;">选择一个聊天</h3>
          <p style="margin: 0; font-size: 14px;">从左侧选择一个聊天开始对话</p>
        </div>

        <!-- 聊天内容 -->
        <div v-else style="display: flex; flex-direction: column; height: 100%;">
          <!-- 聊天头部 -->
          <div style="height: 60px; display: flex; align-items: center; justify-content: space-between; padding: 0 20px; border-bottom: 1px solid #e0e0e0; background: white;">
            <div style="display: flex; align-items: center; gap: 12px;">
              <n-avatar size="small" :style="{ background: '#2196f3' }">
                {{ state.currentChat.avatar }}
              </n-avatar>
              <div>
                <h3 style="font-size: 16px; margin: 0;">{{ state.currentChat.name }}</h3>
                <p style="font-size: 12px; color: #666; margin: 2px 0 0 0;">
                  {{ state.currentChat.online ? '在线' : '离线' }}
                </p>
              </div>
            </div>
            <n-space>
              <n-tooltip trigger="hover" content="语音通话">
                <n-button circle size="small">📞</n-button>
              </n-tooltip>
              <n-tooltip trigger="hover" content="视频通话">
                <n-button circle size="small">📹</n-button>
              </n-tooltip>
              <n-tooltip trigger="hover" content="聊天信息">
                <n-button circle size="small">ℹ️</n-button>
              </n-tooltip>
            </n-space>
          </div>

          <!-- 消息区域 -->
          <div 
            class="messages-container"
            style="flex: 1; overflow-y: auto; padding: 20px; background: #f8f9fa;"
          >
            <div 
              v-for="message in state.messages" 
              :key="message.id"
              style="margin-bottom: 16px; display: flex; align-items: flex-start;"
              :style="{ 'flex-direction': message.sender === 'self' ? 'row-reverse' : 'row' }"
            >
              <n-avatar 
                size="small" 
                :style="{ 
                  background: message.sender === 'self' ? '#2196f3' : '#666',
                  margin: message.sender === 'self' ? '0 0 0 12px' : '0 12px 0 0'
                }"
              >
                {{ message.sender === 'self' ? '我' : state.currentChat.avatar }}
              </n-avatar>
              <div style="max-width: 60%; display: flex; flex-direction: column;">
                <div 
                  style="padding: 12px 16px; border-radius: 18px; word-wrap: break-word;"
                  :style="{
                    background: message.sender === 'self' ? '#2196f3' : 'white',
                    color: message.sender === 'self' ? 'white' : 'black',
                    border: message.sender === 'self' ? 'none' : '1px solid #e0e0e0'
                  }"
                >
                  <!-- 文本消息 -->
                  <div v-if="message.type === 'text'">{{ message.content }}</div>
                  
                  <!-- 图片消息 -->
                  <img 
                    v-else-if="message.type === 'image'"
                    :src="message.content"
                    style="max-width: 200px; border-radius: 8px;"
                    alt="图片"
                  />
                  
                  <!-- 文件消息 -->
                  <div v-else-if="message.type === 'file'" style="display: flex; align-items: center; gap: 8px;">
                    <div style="font-size: 20px;">📎</div>
                    <div>
                      <div style="font-weight: bold;">{{ message.content }}</div>
                      <div style="font-size: 12px; opacity: 0.8;">{{ message.fileSize }}</div>
                    </div>
                  </div>
                </div>
                <div 
                  style="font-size: 11px; color: #999; margin-top: 4px; text-align: center;"
                >
                  {{ message.time }}
                </div>
              </div>
            </div>
          </div>

          <!-- 输入区域 -->
          <div style="border-top: 1px solid #e0e0e0; background: white;">
            <!-- 工具栏 -->
            <div style="display: flex; align-items: center; padding: 8px 16px; gap: 8px; border-bottom: 1px solid #f0f0f0;">
              <n-tooltip trigger="hover" content="表情">
                <n-button size="small" text>😊</n-button>
              </n-tooltip>
              <n-upload 
                :show-file-list="false"
                @change="handleFileUpload"
                accept="*"
              >
                <n-tooltip trigger="hover" content="发送文件">
                  <n-button size="small" text>📎</n-button>
                </n-tooltip>
              </n-upload>
              <n-upload 
                :show-file-list="false"
                @change="handleFileUpload"
                accept="image/*"
              >
                <n-tooltip trigger="hover" content="发送图片">
                  <n-button size="small" text>🖼️</n-button>
                </n-tooltip>
              </n-upload>
              <n-tooltip trigger="hover" content="截屏">
                <n-button size="small" text @click="captureScreenshot">📷</n-button>
              </n-tooltip>
              <n-tooltip trigger="hover" content="语音">
                <n-button size="small" text>🎤</n-button>
              </n-tooltip>
            </div>
            
            <!-- 消息输入 -->
            <div style="padding: 12px 16px; display: flex; gap: 12px; align-items: flex-end;">
              <n-input
                v-model:value="state.messageInput"
                type="textarea"
                placeholder="输入消息..."
                :autosize="{ minRows: 1, maxRows: 4 }"
                @keypress="handleKeyPress"
                style="flex: 1;"
              />
              <n-button 
                type="primary"
                circle
                size="large"
                :disabled="!state.messageInput.trim()"
                @click="sendMessage"
              >
                ➤
              </n-button>
            </div>
          </div>
        </div>
      </n-layout-content>
    </n-layout>

    <!-- 创建群组模态框 -->
    <n-modal v-model:show="modals.createGroup" preset="dialog" title="创建群组">
      <n-form>
        <n-form-item label="群组名称">
          <n-input v-model:value="forms.groupName" placeholder="输入群组名称" />
        </n-form-item>
        <n-form-item label="选择成员">
          <div style="max-height: 200px; overflow-y: auto; border: 1px solid #e0e0e0; border-radius: 4px; padding: 8px;">
            <div 
              v-for="contact in state.contacts" 
              :key="contact.id"
              style="display: flex; align-items: center; gap: 8px; padding: 8px; border-radius: 4px; transition: all 0.2s;"
              :style="{ background: forms.selectedMembers.includes(contact.id) ? '#f0f8ff' : 'transparent' }"
            >
              <n-checkbox 
                :checked="forms.selectedMembers.includes(contact.id)"
                @update:checked="(checked) => {
                  if (checked) {
                    forms.selectedMembers.push(contact.id);
                  } else {
                    const index = forms.selectedMembers.indexOf(contact.id);
                    if (index > -1) forms.selectedMembers.splice(index, 1);
                  }
                }"
              />
              <n-avatar size="small" :style="{ background: '#2196f3' }">
                {{ contact.avatar }}
              </n-avatar>
              <div style="flex: 1;">
                <div style="font-weight: bold;">{{ contact.name }}</div>
                <div style="font-size: 12px; color: #666;">
                  {{ contact.online ? '在线' : '离线' }}
                </div>
              </div>
            </div>
          </div>
        </n-form-item>
      </n-form>
      <template #action>
        <n-space>
          <n-button @click="modals.createGroup = false">取消</n-button>
          <n-button type="primary" @click="createGroup">创建群组</n-button>
        </n-space>
      </template>
    </n-modal>

    <!-- 添加朋友模态框 -->
    <n-modal v-model:show="modals.addFriend" preset="dialog" title="添加朋友">
      <n-form>
        <n-form-item label="朋友ID">
          <n-input v-model:value="forms.friendId" placeholder="输入朋友ID或用户名" />
        </n-form-item>
        <n-form-item label="备注名称">
          <n-input v-model:value="forms.friendName" placeholder="输入备注名称（可选）" />
        </n-form-item>
      </n-form>
      <template #action>
        <n-space>
          <n-button @click="modals.addFriend = false">取消</n-button>
          <n-button type="primary" @click="addFriend">添加朋友</n-button>
        </n-space>
      </template>
    </n-modal>

    <!-- 设备列表模态框 -->
    <n-modal v-model:show="modals.deviceList" preset="dialog" title="LocalSend设备">
      <div style="margin-bottom: 20px;">
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
          <span>服务状态:</span>
          <n-badge 
            :type="state.localSendStatus ? 'success' : 'error'"
            :value="state.localSendStatus ? '运行中' : '已停止'"
          />
          <n-button 
            size="small"
            :type="state.localSendStatus ? 'error' : 'primary'"
            @click="toggleLocalSendService"
          >
            {{ state.localSendStatus ? '停止服务' : '启动服务' }}
          </n-button>
        </div>
        <n-button size="small" @click="startDeviceDiscovery" :disabled="!state.localSendStatus">
          刷新设备
        </n-button>
      </div>
      
      <div v-if="state.devices.length === 0" style="text-align: center; color: #999; padding: 20px;">
        {{ state.localSendStatus ? '未发现设备' : '请先启动服务' }}
      </div>
      
      <div v-else>
        <div 
          v-for="device in state.devices" 
          :key="device.id"
          style="display: flex; align-items: center; justify-content: space-between; padding: 12px; border: 1px solid #e0e0e0; border-radius: 6px; margin-bottom: 8px;"
        >
          <div>
            <div style="font-weight: bold; margin-bottom: 4px;">{{ device.name }}</div>
            <div style="font-size: 12px; color: #666;">{{ device.ip }}:{{ device.port }}</div>
          </div>
          <n-space>
            <n-button size="small" type="primary">发送文件</n-button>
            <n-button size="small">聊天</n-button>
          </n-space>
        </div>
      </div>
    </n-modal>
  `
};

// 定义聊天侧边栏组件
        const ChatSidebar = {
            props: {
                chats: Array,
                currentChat: Object,
                searchKeyword: String,
                activeFilter: String,
                localSendEnabled: Boolean
            },
            emits: ['selectChat', 'update:searchKeyword', 'update:activeFilter', 'showAddFriend', 'showCreateGroup', 'captureScreenshot', 'toggleLocalSend'],
            setup(props, { emit }) {
                /**
                 * 获取头像颜色
                 */
                const getAvatarColor = (name) => {
                    const colors = ['#2196f3', '#4caf50', '#ff9800', '#f44336', '#9c27b0', '#607d8b'];
                    const index = name.charCodeAt(0) % colors.length;
                    return colors[index];
                };

                return {
                    getAvatarColor
                };
            },
            template: `
                <div class="chat-sidebar">
                    <div class="sidebar-header">
                        <div class="header-title">消息</div>
                        <div class="header-actions">
                            <n-button 
                                size="small" 
                                quaternary 
                                circle
                                :type="localSendEnabled ? 'success' : 'default'"
                                @click="$emit('toggleLocalSend')"
                            >
                                📡
                            </n-button>
                            <n-button size="small" quaternary circle @click="$emit('showAddFriend')">
                                👥
                            </n-button>
                            <n-button size="small" quaternary circle @click="$emit('showCreateGroup')">
                                ➕
                            </n-button>
                            <n-button size="small" quaternary circle @click="$emit('captureScreenshot')">
                                📷
                            </n-button>
                        </div>
                    </div>
                    
                    <div class="search-section">
                        <n-input 
                            :value="searchKeyword"
                            @update:value="$emit('update:searchKeyword', $event)"
                            placeholder="搜索聊天..." 
                            clearable
                        />
                    </div>
                    
                    <div class="filter-tabs">
                        <n-tabs 
                            :value="activeFilter" 
                            @update:value="$emit('update:activeFilter', $event)"
                            type="line" 
                            size="small"
                        >
                            <n-tab-pane name="all" tab="全部" />
                            <n-tab-pane name="unread" tab="未读" />
                            <n-tab-pane name="groups" tab="群组" />
                        </n-tabs>
                    </div>
                    
                    <div class="chat-list">
                        <div 
                            v-for="chat in chats" 
                            :key="chat.id"
                            class="chat-item"
                            :class="{ active: currentChat?.id === chat.id }"
                            @click="$emit('selectChat', chat)"
                        >
                            <n-avatar size="medium" :style="{ background: getAvatarColor(chat.name) }">
                                {{ chat.avatar }}
                            </n-avatar>
                            <div class="chat-info">
                                <div class="chat-name">{{ chat.name }}</div>
                                <div class="chat-preview">{{ chat.lastMessage }}</div>
                            </div>
                            <div class="chat-meta">
                                <div class="chat-time">{{ chat.time }}</div>
                                <n-badge 
                                    v-if="chat.unreadCount > 0" 
                                    :value="chat.unreadCount" 
                                    size="small"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            `
        };

        // 定义聊天面板组件
        const ChatPanel = {
            props: {
                currentChat: Object,
                messages: Array,
                messageInput: String
            },
            emits: ['update:messageInput', 'sendMessage', 'fileUpload', 'imageUpload', 'captureScreenshot', 'showDeviceList'],
            setup(props, { emit }) {
                const messageListRef = ref(null);

                /**
                 * 获取头像颜色
                 */
                const getAvatarColor = (name) => {
                    const colors = ['#2196f3', '#4caf50', '#ff9800', '#f44336', '#9c27b0', '#607d8b'];
                    const index = name.charCodeAt(0) % colors.length;
                    return colors[index];
                };

                /**
                 * 处理键盘事件
                 */
                const handleKeyDown = (e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        emit('sendMessage');
                    }
                };

                return {
                    messageListRef,
                    getAvatarColor,
                    handleKeyDown
                };
            },
            template: `
                <div class="chat-panel">
                    <div v-if="currentChat" class="chat-content">
                        <div class="chat-header">
                            <n-avatar :style="{ background: getAvatarColor(currentChat.name) }">
                                {{ currentChat.avatar }}
                            </n-avatar>
                            <div class="chat-title">
                                <div class="chat-name">{{ currentChat.name }}</div>
                                <div class="chat-status">{{ currentChat.online ? '在线' : '离线' }}</div>
                            </div>
                            <div class="chat-actions">
                                <n-button size="small" quaternary @click="$emit('showDeviceList')">
                                    📱 设备
                                </n-button>
                            </div>
                        </div>
                        
                        <div class="message-list" ref="messageListRef">
                            <div 
                                v-for="message in messages" 
                                :key="message.id"
                                class="message-item"
                                :class="{ 'own': message.sender === 'self' }"
                            >
                                <n-avatar 
                                    size="small" 
                                    :style="{ 
                                        background: message.sender === 'self' ? '#2196f3' : getAvatarColor(currentChat.name),
                                        margin: message.sender === 'self' ? '0 0 0 12px' : '0 12px 0 0'
                                    }"
                                >
                                    {{ message.sender === 'self' ? '我' : currentChat.avatar }}
                                </n-avatar>
                                <div class="message-content">
                                    <div 
                                        class="message-bubble"
                                        :class="{ 'own': message.sender === 'self' }"
                                    >
                                        <div v-if="message.type === 'text'">
                                            {{ message.content }}
                                        </div>
                                        <img 
                                            v-else-if="message.type === 'image'"
                                            :src="message.content"
                                            class="message-image"
                                            alt="图片"
                                        />
                                        <div v-else-if="message.type === 'file'" class="file-message">
                                            <div class="file-icon">📎</div>
                                            <div class="file-info">
                                                <div class="file-name">{{ message.content }}</div>
                                                <div class="file-size">{{ message.fileSize }}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="message-time">{{ message.time }}</div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="message-input">
                            <div class="input-toolbar">
                                <n-button size="small" quaternary>😊</n-button>
                                <n-upload 
                                    :show-file-list="false"
                                    @change="$emit('fileUpload', $event)"
                                    accept="*/*"
                                >
                                    <n-button size="small" quaternary>📎</n-button>
                                </n-upload>
                                <n-upload 
                                    :show-file-list="false"
                                    @change="$emit('imageUpload', $event)"
                                    accept="image/*"
                                >
                                    <n-button size="small" quaternary>🖼️</n-button>
                                </n-upload>
                                <n-button size="small" quaternary @click="$emit('captureScreenshot')">📷</n-button>
                                <n-button size="small" quaternary>🎤</n-button>
                            </div>
                            <div class="input-area">
                                <n-input 
                                    :value="messageInput"
                                    @update:value="$emit('update:messageInput', $event)"
                                    type="textarea"
                                    placeholder="输入消息..."
                                    :autosize="{ minRows: 1, maxRows: 4 }"
                                    @keydown="handleKeyDown"
                                />
                                <n-button 
                                    type="primary" 
                                    @click="$emit('sendMessage')"
                                    :disabled="!messageInput.trim()"
                                >
                                    发送
                                </n-button>
                            </div>
                        </div>
                    </div>
                    
                    <div v-else class="empty-chat">
                        <n-empty description="选择一个聊天开始对话" />
                    </div>
                </div>
            `
        };

        // 定义创建群组模态框组件
        const CreateGroupModal = {
            props: {
                show: Boolean,
                contacts: Array
            },
            emits: ['update:show', 'confirm'],
            setup(props, { emit }) {
                const formRef = ref(null);
                const loading = ref(false);
                const searchMember = ref('');
                
                const formData = ref({
                    groupName: '',
                    description: '',
                    selectedMembers: []
                });

                const visible = computed({
                    get: () => props.show,
                    set: (value) => emit('update:show', value)
                });

                const filteredContacts = computed(() => {
                    if (!searchMember.value) {
                        return props.contacts;
                    }
                    return props.contacts.filter(contact => 
                        contact.name.toLowerCase().includes(searchMember.value.toLowerCase())
                    );
                });

                const toggleMember = (memberId) => {
                    const index = formData.value.selectedMembers.indexOf(memberId);
                    if (index > -1) {
                        formData.value.selectedMembers.splice(index, 1);
                    } else {
                        formData.value.selectedMembers.push(memberId);
                    }
                };

                const handleConfirm = async () => {
                    if (!formData.value.groupName.trim() || formData.value.selectedMembers.length === 0) {
                        return;
                    }
                    
                    loading.value = true;
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    
                    emit('confirm', {
                        name: formData.value.groupName,
                        description: formData.value.description,
                        members: formData.value.selectedMembers
                    });
                    
                    // 重置表单
                    formData.value = {
                        groupName: '',
                        description: '',
                        selectedMembers: []
                    };
                    searchMember.value = '';
                    loading.value = false;
                    visible.value = false;
                };

                const handleCancel = () => {
                    formData.value = {
                        groupName: '',
                        description: '',
                        selectedMembers: []
                    };
                    searchMember.value = '';
                    visible.value = false;
                };

                return {
                    formRef,
                    loading,
                    searchMember,
                    formData,
                    visible,
                    filteredContacts,
                    toggleMember,
                    handleConfirm,
                    handleCancel
                };
            },
            template: `
                <n-modal 
                    v-model:show="visible" 
                    preset="dialog" 
                    title="创建群组"
                    style="width: 500px;"
                >
                    <n-form ref="formRef" :model="formData">
                        <n-form-item label="群组名称">
                            <n-input 
                                v-model:value="formData.groupName" 
                                placeholder="输入群组名称"
                                maxlength="20"
                                show-count
                            />
                        </n-form-item>
                        
                        <n-form-item label="群组描述">
                            <n-input 
                                v-model:value="formData.description" 
                                type="textarea"
                                placeholder="输入群组描述（可选）"
                                maxlength="100"
                                show-count
                                :autosize="{ minRows: 2, maxRows: 4 }"
                            />
                        </n-form-item>
                        
                        <n-form-item label="选择成员">
                            <div class="member-selection">
                                <n-input 
                                    v-model:value="searchMember"
                                    placeholder="搜索联系人..."
                                    clearable
                                    style="margin-bottom: 12px;"
                                />
                                
                                <div class="member-list" style="max-height: 200px; overflow-y: auto; border: 1px solid #e0e0e0; border-radius: 6px; padding: 8px;">
                                    <div 
                                        v-for="contact in filteredContacts" 
                                        :key="contact.id"
                                        class="member-item"
                                        style="display: flex; align-items: center; gap: 12px; padding: 8px; border-radius: 6px; cursor: pointer; transition: all 0.2s;"
                                        :style="{ background: formData.selectedMembers.includes(contact.id) ? '#e3f2fd' : 'transparent' }"
                                        @click="toggleMember(contact.id)"
                                    >
                                        <n-checkbox 
                                            :checked="formData.selectedMembers.includes(contact.id)"
                                            @update:checked="() => toggleMember(contact.id)"
                                        />
                                        <n-avatar size="small">
                                            {{ contact.avatar }}
                                        </n-avatar>
                                        <div style="flex: 1;">
                                            <div style="font-weight: 500; font-size: 14px;">{{ contact.name }}</div>
                                            <div style="font-size: 12px; color: #666;">
                                                {{ contact.online ? '在线' : '离线' }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div v-if="formData.selectedMembers.length > 0" style="margin-top: 8px; padding: 8px; background: #f0f8ff; border-radius: 4px; font-size: 12px; color: #2196f3; text-align: center;">
                                    已选择 {{ formData.selectedMembers.length }} 个成员
                                </div>
                            </div>
                        </n-form-item>
                    </n-form>
                    
                    <template #action>
                        <n-space>
                            <n-button @click="handleCancel">取消</n-button>
                            <n-button 
                                type="primary" 
                                @click="handleConfirm"
                                :loading="loading"
                                :disabled="!formData.groupName.trim() || formData.selectedMembers.length === 0"
                            >
                                创建群组
                            </n-button>
                        </n-space>
                    </template>
                </n-modal>
            `
        };

        // 定义添加朋友模态框组件
        const AddFriendModal = {
            props: {
                show: Boolean
            },
            emits: ['update:show', 'addFriend'],
            setup(props, { emit }) {
                const activeTab = ref('search');
                const searchForm = ref({ keyword: '' });
                const searchResults = ref([]);
                const searchLoading = ref(false);
                const hasSearched = ref(false);

                const visible = computed({
                    get: () => props.show,
                    set: (value) => emit('update:show', value)
                });

                const handleSearch = async () => {
                    if (!searchForm.value.keyword.trim()) return;
                    
                    searchLoading.value = true;
                    hasSearched.value = true;
                    
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    
                    searchResults.value = [
                        {
                            id: '1',
                            name: '张三',
                            avatar: '张',
                            email: 'zhangsan@example.com',
                            isFriend: false
                        }
                    ].filter(user => 
                        user.name.includes(searchForm.value.keyword)
                    );
                    
                    searchLoading.value = false;
                };

                const sendFriendRequest = async (user) => {
                    await new Promise(resolve => setTimeout(resolve, 500));
                    emit('addFriend', user);
                    user.isFriend = true;
                };

                const handleCancel = () => {
                    searchForm.value.keyword = '';
                    searchResults.value = [];
                    hasSearched.value = false;
                    activeTab.value = 'search';
                    visible.value = false;
                };

                return {
                    activeTab,
                    searchForm,
                    searchResults,
                    searchLoading,
                    hasSearched,
                    visible,
                    handleSearch,
                    sendFriendRequest,
                    handleCancel
                };
            },
            template: `
                <n-modal 
                    v-model:show="visible" 
                    preset="dialog" 
                    title="添加朋友"
                    style="width: 450px;"
                >
                    <n-tabs v-model:value="activeTab" type="line">
                        <n-tab-pane name="search" tab="搜索用户">
                            <n-form :model="searchForm">
                                <n-form-item label="用户信息">
                                    <n-input 
                                        v-model:value="searchForm.keyword" 
                                        placeholder="输入用户名、邮箱或手机号"
                                        clearable
                                        @keyup.enter="handleSearch"
                                    />
                                </n-form-item>
                                
                                <n-form-item>
                                    <n-button 
                                        type="primary" 
                                        @click="handleSearch"
                                        :loading="searchLoading"
                                        block
                                    >
                                        搜索
                                    </n-button>
                                </n-form-item>
                            </n-form>
                            
                            <div v-if="searchResults.length > 0" style="margin-top: 16px;">
                                <div style="font-weight: bold; margin-bottom: 12px;">搜索结果</div>
                                <div 
                                    v-for="user in searchResults" 
                                    :key="user.id"
                                    style="display: flex; align-items: center; gap: 12px; padding: 12px; border: 1px solid #e0e0e0; border-radius: 8px; margin-bottom: 8px;"
                                >
                                    <n-avatar>{{ user.avatar }}</n-avatar>
                                    <div style="flex: 1;">
                                        <div style="font-weight: 500; margin-bottom: 4px;">{{ user.name }}</div>
                                        <div style="font-size: 12px; color: #666;">{{ user.email }}</div>
                                    </div>
                                    <n-button 
                                        size="small"
                                        type="primary"
                                        :disabled="user.isFriend"
                                        @click="sendFriendRequest(user)"
                                    >
                                        {{ user.isFriend ? '已是好友' : '添加' }}
                                    </n-button>
                                </div>
                            </div>
                            
                            <div v-else-if="hasSearched && searchResults.length === 0" style="margin-top: 20px; text-align: center;">
                                <n-empty description="未找到相关用户" />
                            </div>
                        </n-tab-pane>
                        
                        <n-tab-pane name="qrcode" tab="扫码添加">
                            <div style="text-align: center; padding: 20px;">
                                <div style="margin-bottom: 16px;">扫描二维码添加朋友</div>
                                <n-button>开启摄像头</n-button>
                            </div>
                        </n-tab-pane>
                    </n-tabs>
                    
                    <template #action>
                        <n-button @click="handleCancel">关闭</n-button>
                    </template>
                </n-modal>
            `
        };

        // 定义设备列表模态框组件
        const DeviceListModal = {
            props: {
                show: Boolean,
                devices: Array,
                localSendEnabled: Boolean
            },
            emits: ['update:show', 'refresh', 'toggleService', 'sendFile', 'connectDevice'],
            setup(props, { emit }) {
                const refreshing = ref(false);

                const visible = computed({
                    get: () => props.show,
                    set: (value) => emit('update:show', value)
                });

                const handleRefresh = async () => {
                    refreshing.value = true;
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    emit('refresh');
                    refreshing.value = false;
                };

                return {
                    refreshing,
                    visible,
                    handleRefresh
                };
            },
            template: `
                <n-modal 
                    v-model:show="visible" 
                    preset="dialog" 
                    title="LocalSend 设备列表"
                    style="width: 500px;"
                >
                    <div>
                        <div style="margin-bottom: 16px;">
                            <n-alert 
                                :type="localSendEnabled ? 'success' : 'warning'"
                                :title="localSendEnabled ? 'LocalSend 服务已启动' : 'LocalSend 服务未启动'"
                            >
                                {{ localSendEnabled ? '可以发现和连接附近的设备' : '请先启动 LocalSend 服务' }}
                            </n-alert>
                        </div>
                        
                        <div style="margin-bottom: 16px; text-align: center;">
                            <n-space>
                                <n-button 
                                    type="primary"
                                    :loading="refreshing"
                                    @click="handleRefresh"
                                >
                                    刷新设备
                                </n-button>
                                <n-button 
                                    :type="localSendEnabled ? 'error' : 'success'"
                                    @click="$emit('toggleService')"
                                >
                                    {{ localSendEnabled ? '停止服务' : '启动服务' }}
                                </n-button>
                            </n-space>
                        </div>
                        
                        <div v-if="devices.length === 0 && !refreshing">
                            <n-empty description="未发现设备">
                                <template #extra>
                                    <n-button size="small" @click="handleRefresh">
                                        重新扫描
                                    </n-button>
                                </template>
                            </n-empty>
                        </div>
                        
                        <div v-else>
                            <div 
                                v-for="device in devices" 
                                :key="device.id"
                                style="display: flex; align-items: center; gap: 12px; padding: 12px; border: 1px solid #e0e0e0; border-radius: 8px; margin-bottom: 8px;"
                            >
                                <div style="font-size: 24px;">💻</div>
                                <div style="flex: 1;">
                                    <div style="font-weight: 500; margin-bottom: 4px;">{{ device.name }}</div>
                                    <div style="font-size: 12px; color: #666;">{{ device.ip }}</div>
                                </div>
                                <n-button size="small" @click="$emit('sendFile', device)">
                                    发送文件
                                </n-button>
                            </div>
                        </div>
                    </div>
                    
                    <template #action>
                        <n-button @click="visible = false">关闭</n-button>
                    </template>
                </n-modal>
            `
        };

// 创建并挂载应用
const app = createApp(MessageApp);

// 使用 Naive UI
app.use(naive);

// 挂载应用
app.mount('#app');

console.log('Vue 3 消息插件已加载');