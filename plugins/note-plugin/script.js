// 笔记插件脚本
class NotePlugin {
  constructor() {
    this.notes = []
    this.currentNoteId = null
    this.categories = ['默认', '工作', '学习', '生活']
    this.currentCategory = '默认'
    this.autoSaveTimer = null
    this.isInitialized = false

    // 协作相关
    this.collaborators = new Map() // 当前协作者
    this.isCollaborationEnabled = false
    this.p2pStatus = { isRunning: false, peerId: null }
    this.sharedNotes = new Map() // 共享的笔记
    this.conflictResolver = new ConflictResolver()

    // 数据存储相关
    this.pluginId = 'note-plugin'
    this.dataNamespace = 'notes'

    // 实时编辑相关
    this.operationQueue = []
    this.lastSyncTime = Date.now()
    this.syncInterval = null

    this.init()
  }

  async init() {
    if (this.isInitialized) return

    try {
      // 监听来自主应用的消息
      window.addEventListener('message', this.handleMessage.bind(this))

      await this.initializeDataStorage()
      await this.initializeP2PCollaboration()
      await this.loadNotes()
      this.bindEvents()
      this.renderNoteList()
      this.startSyncService()
      this.isInitialized = true

      // 通知主应用插件已准备就绪
      this.sendMessage('PLUGIN_READY', {
        pluginId: 'note-plugin',
        version: '1.0.0'
      })

      console.log('笔记插件初始化完成')
    } catch (error) {
      console.error('笔记插件初始化失败:', error)
    }
  }

  handleMessage(event) {
    const { type, data } = event.data

    switch (type) {
      case 'PLUGIN_INIT':
        console.log('笔记插件初始化:', data)
        break
      case 'PLUGIN_ACTIVATE':
        this.onActivate()
        break
      case 'PLUGIN_DEACTIVATE':
        this.onDeactivate()
        break
    }
  }

  sendMessage(type, data) {
    if (window.parent) {
      window.parent.postMessage({ type, data }, '*')
    }
  }

  async loadNotes() {
    try {
      // 从插件数据服务加载笔记
      const response = await window.electronAPI.invoke('plugin-data-list', this.pluginId)
      if (response.success) {
        this.notes = response.data
          .filter((item) => item.key.startsWith('note_'))
          .map((item) => ({
            id: item.key.replace('note_', ''),
            ...JSON.parse(item.value)
          }))
      }

      // 如果没有笔记，创建示例笔记
      if (this.notes.length === 0) {
        this.notes = [
          {
            id: 1,
            title: '欢迎使用笔记插件',
            content:
              '这是一个示例笔记。你可以在这里记录你的想法、计划和重要信息。\n\n功能特点：\n- 创建和编辑笔记\n- 搜索笔记内容\n- 分类管理\n- 自动保存\n- P2P协作',
            category: '默认',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: 2,
            title: '待办事项',
            content: '今日待办：\n\n□ 完成项目文档\n□ 回复邮件\n□ 准备会议材料\n□ 学习新技术',
            category: '工作',
            createdAt: new Date(Date.now() - 86400000).toISOString(),
            updatedAt: new Date(Date.now() - 86400000).toISOString()
          }
        ]
        await this.saveNotes()
      }

      // 加载共享笔记
      await this.loadSharedNotes()
    } catch (error) {
      console.error('加载笔记失败:', error)
      this.notes = []
    }
  }

  async saveNotes() {
    try {
      // 保存到插件数据服务
      for (const note of this.notes) {
        const noteData = { ...note }
        delete noteData.id
        await window.electronAPI.invoke(
          'plugin-data-set',
          this.pluginId,
          `note_${note.id}`,
          JSON.stringify(noteData),
          'object'
        )
      }

      // 如果是共享笔记，同步到P2P网络
      await this.syncSharedNotes()
    } catch (error) {
      console.error('保存笔记失败:', error)
    }
  }

  bindEvents() {
    // 搜索功能
    const searchInput = document.getElementById('searchInput')
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value
        this.renderNoteList()
      })
    }

    // 分类筛选
    const categorySelect = document.getElementById('categorySelect')
    if (categorySelect) {
      categorySelect.addEventListener('change', (e) => {
        this.currentCategory = e.target.value
        this.renderNoteList()
      })
    }

    // 新建笔记按钮
    const newNoteBtn = document.getElementById('newNoteBtn')
    if (newNoteBtn) {
      newNoteBtn.addEventListener('click', () => {
        this.createNewNote()
      })
    }

    // 笔记编辑器自动保存和协作
    const noteEditor = document.getElementById('noteEditor')
    if (noteEditor) {
      noteEditor.addEventListener('input', (e) => {
        this.handleEditorChange(e)
        this.autoSave()
      })
    }

    // 笔记标题编辑
    const noteTitle = document.getElementById('noteTitle')
    if (noteTitle) {
      noteTitle.addEventListener('input', () => {
        this.autoSave()
      })
    }

    // 分类选择
    const noteCategorySelect = document.getElementById('noteCategorySelect')
    if (noteCategorySelect) {
      noteCategorySelect.addEventListener('change', () => {
        this.autoSave()
      })
    }

    // 协作相关按钮
    const shareBtn = document.getElementById('shareNoteBtn')
    if (shareBtn) {
      shareBtn.addEventListener('click', () => {
        this.shareCurrentNote()
      })
    }

    const collaborateBtn = document.getElementById('collaborateBtn')
    if (collaborateBtn) {
      collaborateBtn.addEventListener('click', () => {
        this.toggleCollaboration()
      })
    }
  }

  renderNoteList(filteredNotes = null) {
    const noteList = document.getElementById('noteList')
    const notes = filteredNotes || this.notes

    if (notes.length === 0) {
      noteList.innerHTML =
        '<div style="padding: 20px; text-align: center; color: #999;">暂无笔记</div>'
      return
    }

    noteList.innerHTML = notes
      .map((note) => {
        const preview = note.content.substring(0, 100).replace(/\n/g, ' ')
        const date = new Date(note.updatedAt).toLocaleDateString()

        // 添加共享笔记样式类
        let itemClasses = 'note-item'
        if (this.currentNoteId === note.id) {
          itemClasses += ' active'
        }
        if (note.isShared) {
          itemClasses += ' shared'
        }
        if (note.isRemote) {
          itemClasses += ' remote'
        }

        // 构建标识徽章
        let badges = ''
        if (note.isShared && !note.isRemote) {
          badges += '<span class="share-badge">已分享</span>'
        }
        if (note.isRemote) {
          badges += '<span class="remote-badge">远程</span>'
        }

        // 构建元信息
        let metaInfo = `${date} · ${note.category}`
        if (note.owner && note.isRemote) {
          metaInfo += ` · 来自: ${note.owner.substring(0, 8)}...`
        }
        if (note.sharedAt) {
          metaInfo += ` · 分享: ${new Date(note.sharedAt).toLocaleDateString()}`
        }

        return `
                <div class="${itemClasses}" 
                     onclick="notePlugin.selectNote(${note.id})">
                    <div class="note-item-title">${note.title || '无标题'}${badges}</div>
                    <div class="note-item-preview">${preview}${note.content.length > 100 ? '...' : ''}</div>
                    <div class="note-item-date">${metaInfo}</div>
                </div>
            `
      })
      .join('')
  }

  selectNote(noteId) {
    const note = this.notes.find((n) => n.id === noteId)
    if (!note) return

    this.currentNoteId = noteId

    // 显示编辑器
    this.showEditor(note)

    // 更新列表选中状态
    this.renderNoteList()
  }

  showEditor(note) {
    const noteEditor = document.getElementById('noteEditor')

    if (noteEditor) {
      noteEditor.innerHTML = `
                <div class="editor-header">
                    <input type="text" class="note-title-input" placeholder="输入笔记标题..." 
                           id="noteTitleInput" value="${note.title || ''}">
                </div>
                <div class="editor-container">
                    <textarea class="note-editor" placeholder="开始写下你的想法..." 
                              id="noteContentTextarea">${note.content || ''}</textarea>
                </div>
            `

      // 绑定事件
      const titleInput = document.getElementById('noteTitleInput')
      const contentTextarea = document.getElementById('noteContentTextarea')

      if (titleInput) {
        titleInput.addEventListener('input', () => {
          if (this.currentNote) {
            this.currentNote.title = titleInput.value
            this.autoSave()
          }
        })
      }

      if (contentTextarea) {
        contentTextarea.addEventListener('input', (e) => {
          if (this.currentNote) {
            this.currentNote.content = contentTextarea.value
            this.handleEditorChange(e)
            this.autoSave()
          }
        })
      }
    }

    this.currentNote = note
    this.currentNoteId = note.id
  }

  createNote() {
    const newNote = {
      id: Date.now(),
      title: '',
      content: '',
      category: this.currentCategory,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    this.notes.unshift(newNote)
    this.selectNote(newNote.id)
    this.renderNoteList()

    // 聚焦到标题输入框
    setTimeout(() => {
      document.getElementById('noteTitle').focus()
    }, 100)
  }

  createNewNote() {
    this.createNote()
  }

  autoSave() {
    if (this.autoSaveTimer) {
      clearTimeout(this.autoSaveTimer)
    }

    this.autoSaveTimer = setTimeout(() => {
      this.saveCurrentNote()
    }, 1000) // 1秒后自动保存
  }

  saveCurrentNote() {
    if (!this.currentNoteId) return

    const note = this.notes.find((n) => n.id === this.currentNoteId)
    if (!note) return

    const title = document.getElementById('noteTitle').value
    const content = document.getElementById('noteContent').value

    note.title = title
    note.content = content
    note.updatedAt = new Date().toISOString()

    this.saveNotes()
    this.renderNoteList()
  }

  // ==================== P2P协作功能 ====================

  async initializeP2PCollaboration() {
    try {
      // 检查P2P服务状态
      const status = await window.electronAPI.invoke('p2p-get-status')
      this.p2pStatus = status

      if (status.isRunning) {
        console.log('P2P服务已启动，PeerID:', status.peerId)
        this.isCollaborationEnabled = true

        // 监听P2P消息
        this.listenToP2PMessages()
      }
    } catch (error) {
      console.error('初始化P2P协作失败:', error)
    }
  }

  async initializeDataStorage() {
    try {
      // 初始化插件数据存储
      console.log('初始化插件数据存储')
    } catch (error) {
      console.error('初始化数据存储失败:', error)
    }
  }

  async loadSharedNotes() {
    try {
      // 从共享数据命名空间加载笔记
      const response = await window.electronAPI.invoke(
        'plugin-shared-data-list',
        this.dataNamespace,
        this.pluginId
      )
      if (response.success) {
        response.data.forEach((item) => {
          if (item.key.startsWith('shared_note_')) {
            const noteData = JSON.parse(item.value)
            this.sharedNotes.set(item.key, noteData)
          }
        })
      }
    } catch (error) {
      console.error('加载共享笔记失败:', error)
    }
  }

  async syncSharedNotes() {
    try {
      if (!this.isCollaborationEnabled) return

      // 同步共享笔记到P2P网络
      for (const [noteId, noteData] of this.sharedNotes) {
        await this.broadcastNoteUpdate(noteId, noteData)
      }
    } catch (error) {
      console.error('同步共享笔记失败:', error)
    }
  }

  startSyncService() {
    // 启动定期同步服务
    this.syncInterval = setInterval(() => {
      this.processPendingOperations()
    }, 2000) // 每2秒同步一次
  }

  handleEditorChange(event) {
    if (!this.currentNote || !this.isCollaborationEnabled) return

    // 记录编辑操作用于协作同步
    const operation = {
      type: 'text_change',
      noteId: this.currentNote.id,
      timestamp: Date.now(),
      change: {
        position: event.target.selectionStart,
        content: event.target.value,
        length: event.target.value.length
      }
    }

    this.operationQueue.push(operation)
  }

  async shareCurrentNote() {
    if (!this.currentNote) {
      alert('请先选择一个笔记')
      return
    }

    try {
      // 将笔记标记为共享
      this.currentNote.isShared = true
      this.currentNote.sharedAt = new Date().toISOString()
      this.currentNote.owner = this.p2pStatus.peerId

      // 保存到共享数据空间
      const sharedKey = `shared_note_${this.currentNote.id}`
      await window.electronAPI.invoke(
        'plugin-shared-data-set',
        this.dataNamespace,
        sharedKey,
        JSON.stringify(this.currentNote),
        this.pluginId,
        { read: true, write: true } // 权限设置
      )

      this.sharedNotes.set(sharedKey, this.currentNote)

      // 广播到P2P网络
      await this.broadcastNoteShare(this.currentNote)

      alert('笔记已成功分享到局域网')
      this.renderNoteList()
    } catch (error) {
      console.error('分享笔记失败:', error)
      alert('分享笔记失败')
    }
  }

  async toggleCollaboration() {
    try {
      if (!this.p2pStatus.isRunning) {
        // 启动P2P服务
        await window.electronAPI.invoke('p2p-start')
        this.p2pStatus = await window.electronAPI.invoke('p2p-get-status')
        this.isCollaborationEnabled = true
        this.listenToP2PMessages()
        alert('协作模式已启用')
      } else {
        this.isCollaborationEnabled = !this.isCollaborationEnabled
        alert(this.isCollaborationEnabled ? '协作模式已启用' : '协作模式已禁用')
      }

      this.updateCollaborationUI()
    } catch (error) {
      console.error('切换协作模式失败:', error)
      alert('切换协作模式失败')
    }
  }

  async broadcastNoteShare(note) {
    try {
      const message = {
        type: 'note_share',
        noteId: note.id,
        noteData: note,
        sender: this.p2pStatus.peerId,
        timestamp: Date.now()
      }

      // 广播到所有连接的节点
      await window.electronAPI.invoke('p2p-send-group-message', {
        groupId: 'note-collaboration',
        type: 'note_share',
        content: JSON.stringify(message)
      })
    } catch (error) {
      console.error('广播笔记分享失败:', error)
    }
  }

  async broadcastNoteUpdate(noteId, noteData) {
    try {
      const message = {
        type: 'note_update',
        noteId: noteId,
        noteData: noteData,
        sender: this.p2pStatus.peerId,
        timestamp: Date.now()
      }

      await window.electronAPI.invoke('p2p-send-group-message', {
        groupId: 'note-collaboration',
        type: 'note_update',
        content: JSON.stringify(message)
      })
    } catch (error) {
      console.error('广播笔记更新失败:', error)
    }
  }

  listenToP2PMessages() {
    // 监听P2P消息（通过主进程事件）
    window.electronAPI.on('p2p-message-received', (message) => {
      this.handleP2PMessage(message)
    })
  }

  handleP2PMessage(message) {
    try {
      const data = JSON.parse(message.content)

      switch (data.type) {
        case 'note_share':
          this.handleNoteShare(data)
          break
        case 'note_update':
          this.handleNoteUpdate(data)
          break
        case 'collaboration_request':
          this.handleCollaborationRequest(data)
          break
      }
    } catch (error) {
      console.error('处理P2P消息失败:', error)
    }
  }

  handleNoteShare(data) {
    // 处理接收到的共享笔记
    const sharedKey = `shared_note_${data.noteId}`
    this.sharedNotes.set(sharedKey, data.noteData)

    // 添加到笔记列表（标记为共享）
    const existingNote = this.notes.find((n) => n.id === data.noteId)
    if (!existingNote) {
      data.noteData.isShared = true
      data.noteData.isRemote = true
      data.noteData.owner = data.sender
      this.notes.push(data.noteData)
      this.renderNoteList()
    }

    this.showNotification(`收到来自 ${data.sender} 的共享笔记: ${data.noteData.title}`)
  }

  handleNoteUpdate(data) {
    // 处理笔记更新
    const noteIndex = this.notes.findIndex((n) => n.id === data.noteId)
    if (noteIndex !== -1) {
      // 合并更新（简单的最后写入获胜策略）
      if (data.timestamp > (this.notes[noteIndex].lastModified || 0)) {
        this.notes[noteIndex] = { ...this.notes[noteIndex], ...data.noteData }
        this.renderNoteList()

        // 如果当前正在编辑这个笔记，更新编辑器
        if (this.currentNoteId === data.noteId) {
          this.selectNote(data.noteId)
        }
      }
    }
  }

  processPendingOperations() {
    if (this.operationQueue.length === 0) return

    // 批量处理操作队列
    const operations = [...this.operationQueue]
    this.operationQueue = []

    // 发送操作到协作者
    operations.forEach((op) => {
      this.broadcastOperation(op)
    })
  }

  async broadcastOperation(operation) {
    try {
      const message = {
        type: 'operation',
        operation: operation,
        sender: this.p2pStatus.peerId,
        timestamp: Date.now()
      }

      await window.electronAPI.invoke('p2p-send-group-message', {
        groupId: 'note-collaboration',
        type: 'operation',
        content: JSON.stringify(message)
      })
    } catch (error) {
      console.error('广播操作失败:', error)
    }
  }

  updateCollaborationUI() {
    const collaborateBtn = document.getElementById('collaborateBtn')
    if (collaborateBtn) {
      collaborateBtn.textContent = this.isCollaborationEnabled ? '禁用协作' : '启用协作'
      collaborateBtn.className = this.isCollaborationEnabled ? 'btn-secondary' : 'btn-primary'
    }

    // 更新状态指示器
    const statusIndicator = document.getElementById('collaborationStatus')
    if (statusIndicator) {
      statusIndicator.textContent = this.isCollaborationEnabled ? '协作已启用' : '协作已禁用'
      statusIndicator.className = this.isCollaborationEnabled ? 'status-online' : 'status-offline'
    }
  }

  showNotification(message) {
    // 显示通知
    const notification = document.createElement('div')
    notification.className = 'notification'
    notification.textContent = message
    document.body.appendChild(notification)

    setTimeout(() => {
      notification.remove()
    }, 3000)
  }

  handleCollaborationRequest(data) {
    // 处理协作请求
    const accept = confirm(`${data.sender} 请求协作编辑笔记 "${data.noteTitle}"，是否接受？`)
    if (accept) {
      // 接受协作请求的逻辑
      this.acceptCollaborationRequest(data)
    }
  }

  async acceptCollaborationRequest(data) {
    try {
      // 发送接受协作的响应
      const response = {
        type: 'collaboration_accepted',
        requestId: data.requestId,
        sender: this.p2pStatus.peerId,
        timestamp: Date.now()
      }

      await window.electronAPI.invoke('p2p-send-message', {
        peerId: data.sender,
        type: 'collaboration_accepted',
        content: JSON.stringify(response)
      })
    } catch (error) {
      console.error('接受协作请求失败:', error)
    }
  }

  searchNotes(keyword) {
    if (!keyword.trim()) {
      this.renderNoteList()
      return
    }

    const filteredNotes = this.notes.filter(
      (note) =>
        note.title.toLowerCase().includes(keyword.toLowerCase()) ||
        note.content.toLowerCase().includes(keyword.toLowerCase())
    )

    this.renderNoteList(filteredNotes)
  }

  showCategories() {
    // 简单的分类选择
    const category = prompt('选择分类:', this.categories.join(', '))
    if (category && this.categories.includes(category)) {
      this.currentCategory = category
      const filteredNotes = this.notes.filter((note) => note.category === category)
      this.renderNoteList(filteredNotes)
    }
  }

  onActivate() {
    console.log('笔记插件激活')
  }

  onDeactivate() {
    console.log('笔记插件停用')
    // 保存当前编辑的笔记
    this.autoSave()
  }
}

// 全局函数供HTML调用
let notePlugin

function createNote() {
  notePlugin.createNote()
}

function createNewNote() {
  notePlugin.createNewNote()
}

function showCategories() {
  notePlugin.showCategories()
}

// 初始化插件
document.addEventListener('DOMContentLoaded', () => {
  notePlugin = new NotePlugin()
})

// 导出给主应用使用
if (typeof module !== 'undefined' && module.exports) {
  module.exports = NotePlugin
}
