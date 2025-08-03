import { EventEmitter } from 'events'
import { databaseManager } from '../database/Database'

export interface Article {
  id: number
  article_id: number
  user_id: number
  classify_id: number
  title: string
  content: string
  md_content: string
  is_asterisk: number
  status: number
  created_at: string
  updated_at: string
}

export interface ArticleClassify {
  id: number
  user_id: number
  class_name: string
  sort: number
  is_default: number
  created_at: string
  updated_at: string
  count?: number
}

export interface ArticleTag {
  id: number
  user_id: number
  tag_name: string
  sort: number
  created_at: string
  updated_at: string
}

export interface ArticleListParams {
  classify_id?: number
  keyword?: string
  page?: number
  limit?: number
}

export class ArticleService extends EventEmitter {
  constructor() {
    super()
  }

  private get db() {
    return databaseManager.getDatabase()
  }

  /**
   * 获取文章列表
   */
  async getArticleList(userId: number, params: ArticleListParams = {}) {
    const { classify_id, keyword, page = 1, limit = 20 } = params
    const offset = (page - 1) * limit

    let sql = `
      SELECT a.*, ac.class_name 
      FROM articles a 
      LEFT JOIN article_classifies ac ON a.classify_id = ac.id 
      WHERE a.user_id = ? AND a.status = 1
    `
    const sqlParams: any[] = [userId]

    if (classify_id) {
      sql += ' AND a.classify_id = ?'
      sqlParams.push(classify_id)
    }

    if (keyword) {
      sql += ' AND (a.title LIKE ? OR a.content LIKE ?)'
      sqlParams.push(`%${keyword}%`, `%${keyword}%`)
    }

    sql += ' ORDER BY a.updated_at DESC LIMIT ? OFFSET ?'
    sqlParams.push(limit, offset)

    const articles = this.db.prepare(sql).all(...sqlParams)
    
    return {
      items: articles,
      total: this.getArticleCount(userId, params)
    }
  }

  /**
   * 获取文章数量
   */
  private getArticleCount(userId: number, params: ArticleListParams = {}) {
    const { classify_id, keyword } = params
    
    let sql = 'SELECT COUNT(*) as count FROM articles WHERE user_id = ? AND status = 1'
    const sqlParams: any[] = [userId]

    if (classify_id) {
      sql += ' AND classify_id = ?'
      sqlParams.push(classify_id)
    }

    if (keyword) {
      sql += ' AND (title LIKE ? OR content LIKE ?)'
      sqlParams.push(`%${keyword}%`, `%${keyword}%`)
    }

    const result = this.db.prepare(sql).get(...sqlParams) as { count: number }
    return result.count
  }

  /**
   * 获取文章详情
   */
  async getArticleDetail(userId: number, articleId: number) {
    const sql = `
      SELECT a.*, ac.class_name 
      FROM articles a 
      LEFT JOIN article_classifies ac ON a.classify_id = ac.id 
      WHERE a.user_id = ? AND a.article_id = ? AND a.status = 1
    `
    
    const article = this.db.prepare(sql).get(userId, articleId)
    if (!article) {
      throw new Error('文章不存在')
    }
    
    return article
  }

  /**
   * 创建或编辑文章
   */
  async saveArticle(userId: number, data: {
    article_id?: number
    classify_id: number
    title: string
    content: string
    md_content: string
    is_asterisk?: number
  }) {
    const now = new Date().toISOString()
    
    if (data.article_id) {
      // 更新文章
      const sql = `
        UPDATE articles 
        SET classify_id = ?, title = ?, content = ?, md_content = ?, 
            is_asterisk = ?, updated_at = ?
        WHERE user_id = ? AND article_id = ?
      `
      
      this.db.prepare(sql).run(
        data.classify_id,
        data.title,
        data.content,
        data.md_content,
        data.is_asterisk || 0,
        now,
        userId,
        data.article_id
      )
      
      return { article_id: data.article_id }
    } else {
      // 创建新文章
      const articleId = Date.now() // 简单的ID生成策略
      
      const sql = `
        INSERT INTO articles (article_id, user_id, classify_id, title, content, md_content, is_asterisk, status, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, 1, ?, ?)
      `
      
      this.db.prepare(sql).run(
        articleId,
        userId,
        data.classify_id,
        data.title,
        data.content,
        data.md_content,
        data.is_asterisk || 0,
        now,
        now
      )
      
      return { article_id: articleId }
    }
  }

  /**
   * 删除文章（软删除）
   */
  async deleteArticle(userId: number, articleId: number) {
    const sql = 'UPDATE articles SET status = 0, updated_at = ? WHERE user_id = ? AND article_id = ?'
    const now = new Date().toISOString()
    
    this.db.prepare(sql).run(now, userId, articleId)
  }

  /**
   * 永久删除文章
   */
  async foreverDeleteArticle(userId: number, articleId: number) {
    const sql = 'DELETE FROM articles WHERE user_id = ? AND article_id = ?'
    this.db.prepare(sql).run(userId, articleId)
  }

  /**
   * 获取回收站文章列表
   */
  async getRecycleList(userId: number) {
    const sql = `
      SELECT a.*, ac.class_name 
      FROM articles a 
      LEFT JOIN article_classifies ac ON a.classify_id = ac.id 
      WHERE a.user_id = ? AND a.status = 0
      ORDER BY a.updated_at DESC
    `
    
    const articles = this.db.prepare(sql).all(userId)
    return { items: articles }
  }

  /**
   * 恢复文章
   */
  async recoverArticle(userId: number, articleId: number) {
    const sql = 'UPDATE articles SET status = 1, updated_at = ? WHERE user_id = ? AND article_id = ?'
    const now = new Date().toISOString()
    
    this.db.prepare(sql).run(now, userId, articleId)
  }

  /**
   * 收藏/取消收藏文章
   */
  async toggleCollect(userId: number, articleId: number) {
    const article = this.db.prepare('SELECT is_asterisk FROM articles WHERE user_id = ? AND article_id = ?').get(userId, articleId) as { is_asterisk: number }
    
    if (!article) {
      throw new Error('文章不存在')
    }
    
    const newStatus = article.is_asterisk ? 0 : 1
    const sql = 'UPDATE articles SET is_asterisk = ?, updated_at = ? WHERE user_id = ? AND article_id = ?'
    const now = new Date().toISOString()
    
    this.db.prepare(sql).run(newStatus, now, userId, articleId)
    
    return { is_asterisk: newStatus }
  }

  /**
   * 移动文章到分类
   */
  async moveToClassify(userId: number, articleId: number, classifyId: number) {
    const sql = 'UPDATE articles SET classify_id = ?, updated_at = ? WHERE user_id = ? AND article_id = ?'
    const now = new Date().toISOString()
    
    this.db.prepare(sql).run(classifyId, now, userId, articleId)
  }

  /**
   * 获取文章分类列表
   */
  async getClassifyList(userId: number) {
    const sql = `
      SELECT ac.*, 
             COALESCE(COUNT(a.id), 0) as count
      FROM article_classifies ac
      LEFT JOIN articles a ON ac.id = a.classify_id AND a.status = 1
      WHERE ac.user_id = ?
      GROUP BY ac.id
      ORDER BY ac.sort ASC, ac.created_at ASC
    `
    
    const classifies = this.db.prepare(sql).all(userId)
    return { items: classifies }
  }

  /**
   * 创建文章分类
   */
  async createClassify(userId: number, data: { name: string; sort?: number }) {
    const now = new Date().toISOString()
    const sort = data.sort || 0
    
    const sql = `
      INSERT INTO article_classifies (user_id, class_name, sort, is_default, created_at, updated_at)
      VALUES (?, ?, ?, 0, ?, ?)
    `
    
    const result = this.db.prepare(sql).run(userId, data.name, sort, now, now)
    return { classify_id: result.lastInsertRowid }
  }

  /**
   * 更新文章分类
   */
  async updateClassify(userId: number, classifyId: number, data: { name?: string; sort?: number }) {
    const updates: string[] = []
    const params: any[] = []
    
    if (data.name !== undefined) {
      updates.push('class_name = ?')
      params.push(data.name)
    }
    
    if (data.sort !== undefined) {
      updates.push('sort = ?')
      params.push(data.sort)
    }
    
    if (updates.length === 0) {
      return
    }
    
    updates.push('updated_at = ?')
    params.push(new Date().toISOString())
    params.push(userId, classifyId)
    
    const sql = `UPDATE article_classifies SET ${updates.join(', ')} WHERE user_id = ? AND id = ?`
    this.db.prepare(sql).run(...params)
  }

  /**
   * 删除文章分类
   */
  async deleteClassify(userId: number, classifyId: number) {
    // 检查是否为默认分类
    const classify = this.db.prepare('SELECT is_default FROM article_classifies WHERE user_id = ? AND id = ?').get(userId, classifyId) as { is_default: number }
    
    if (!classify) {
      throw new Error('分类不存在')
    }
    
    if (classify.is_default) {
      throw new Error('默认分类不能删除')
    }
    
    // 将该分类下的文章移动到默认分类
    const defaultClassify = this.db.prepare('SELECT id FROM article_classifies WHERE user_id = ? AND is_default = 1').get(userId) as { id: number }
    
    if (defaultClassify) {
      this.db.prepare('UPDATE articles SET classify_id = ? WHERE user_id = ? AND classify_id = ?').run(defaultClassify.id, userId, classifyId)
    }
    
    // 删除分类
    this.db.prepare('DELETE FROM article_classifies WHERE user_id = ? AND id = ?').run(userId, classifyId)
  }

  /**
   * 获取标签列表
   */
  async getTagList(userId: number) {
    const sql = 'SELECT * FROM article_tags WHERE user_id = ? ORDER BY sort ASC, created_at ASC'
    const tags = this.db.prepare(sql).all(userId)
    return { items: tags }
  }

  /**
   * 创建标签
   */
  async createTag(userId: number, data: { tag_name: string; sort?: number }) {
    const now = new Date().toISOString()
    const sort = data.sort || 0
    
    const sql = `
      INSERT INTO article_tags (user_id, tag_name, sort, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?)
    `
    
    const result = this.db.prepare(sql).run(userId, data.tag_name, sort, now, now)
    return { tag_id: result.lastInsertRowid }
  }

  /**
   * 更新标签
   */
  async updateTag(userId: number, tagId: number, data: { tag_name?: string; sort?: number }) {
    const updates: string[] = []
    const params: any[] = []
    
    if (data.tag_name !== undefined) {
      updates.push('tag_name = ?')
      params.push(data.tag_name)
    }
    
    if (data.sort !== undefined) {
      updates.push('sort = ?')
      params.push(data.sort)
    }
    
    if (updates.length === 0) {
      return
    }
    
    updates.push('updated_at = ?')
    params.push(new Date().toISOString())
    params.push(userId, tagId)
    
    const sql = `UPDATE article_tags SET ${updates.join(', ')} WHERE user_id = ? AND id = ?`
    this.db.prepare(sql).run(...params)
  }

  /**
   * 删除标签
   */
  async deleteTag(userId: number, tagId: number) {
    this.db.prepare('DELETE FROM article_tags WHERE user_id = ? AND id = ?').run(userId, tagId)
  }
}

export const articleService = new ArticleService()