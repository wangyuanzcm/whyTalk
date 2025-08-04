// 笔记插件脚本
class NotePlugin {
    constructor() {
        this.notes = []
        this.currentNoteId = null
        this.categories = ['默认', '工作', '学习', '生活']
        this.currentCategory = '默认'
        
        this.init()
    }

    async init() {
        // 监听来自主应用的消息
        window.addEventListener('message', this.handleMessage.bind(this))
        
        // 加载笔记数据
        await this.loadNotes()
        
        // 绑定事件
        this.bindEvents()
        
        // 渲染笔记列表
        this.renderNoteList()
        
        // 通知主应用插件已准备就绪
        this.sendMessage('PLUGIN_READY', {
            pluginId: 'note-plugin',
            version: '1.0.0'
        })
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
            // 从本地存储加载笔记
            const savedNotes = localStorage.getItem('note-plugin-notes')
            if (savedNotes) {
                this.notes = JSON.parse(savedNotes)
            } else {
                // 创建示例笔记
                this.notes = [
                    {
                        id: 1,
                        title: '欢迎使用笔记插件',
                        content: '这是一个示例笔记。你可以在这里记录你的想法、计划和重要信息。\n\n功能特点：\n- 创建和编辑笔记\n- 搜索笔记内容\n- 分类管理\n- 自动保存',
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
        } catch (error) {
            console.error('加载笔记失败:', error)
            this.notes = []
        }
    }

    async saveNotes() {
        try {
            localStorage.setItem('note-plugin-notes', JSON.stringify(this.notes))
        } catch (error) {
            console.error('保存笔记失败:', error)
        }
    }

    bindEvents() {
        // 搜索功能
        const searchInput = document.getElementById('searchInput')
        searchInput.addEventListener('input', (e) => {
            this.searchNotes(e.target.value)
        })

        // 笔记标题和内容自动保存
        const noteTitle = document.getElementById('noteTitle')
        const noteContent = document.getElementById('noteContent')
        
        noteTitle.addEventListener('input', () => {
            this.autoSave()
        })
        
        noteContent.addEventListener('input', () => {
            this.autoSave()
        })
    }

    renderNoteList(filteredNotes = null) {
        const noteList = document.getElementById('noteList')
        const notes = filteredNotes || this.notes
        
        if (notes.length === 0) {
            noteList.innerHTML = '<div style="padding: 20px; text-align: center; color: #999;">暂无笔记</div>'
            return
        }
        
        noteList.innerHTML = notes.map(note => {
            const preview = note.content.substring(0, 100).replace(/\n/g, ' ')
            const date = new Date(note.updatedAt).toLocaleDateString()
            
            return `
                <div class="note-item ${this.currentNoteId === note.id ? 'active' : ''}" 
                     onclick="notePlugin.selectNote(${note.id})">
                    <div class="note-item-title">${note.title || '无标题'}</div>
                    <div class="note-item-preview">${preview}${note.content.length > 100 ? '...' : ''}</div>
                    <div class="note-item-date">${date} · ${note.category}</div>
                </div>
            `
        }).join('')
    }

    selectNote(noteId) {
        const note = this.notes.find(n => n.id === noteId)
        if (!note) return
        
        this.currentNoteId = noteId
        
        // 显示编辑器
        document.getElementById('emptyState').style.display = 'none'
        document.getElementById('noteEditor').style.display = 'flex'
        
        // 填充内容
        document.getElementById('noteTitle').value = note.title
        document.getElementById('noteContent').value = note.content
        
        // 更新列表选中状态
        this.renderNoteList()
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

    autoSave() {
        if (!this.currentNoteId) return
        
        const note = this.notes.find(n => n.id === this.currentNoteId)
        if (!note) return
        
        const title = document.getElementById('noteTitle').value
        const content = document.getElementById('noteContent').value
        
        note.title = title
        note.content = content
        note.updatedAt = new Date().toISOString()
        
        this.saveNotes()
        this.renderNoteList()
    }

    searchNotes(keyword) {
        if (!keyword.trim()) {
            this.renderNoteList()
            return
        }
        
        const filteredNotes = this.notes.filter(note => 
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
            const filteredNotes = this.notes.filter(note => note.category === category)
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