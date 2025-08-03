-- WhyTalk 本地数据库架构
-- 使用 SQLite 替代 MySQL 和 Redis

-- 用户表
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    mobile VARCHAR(20) UNIQUE NOT NULL,
    nickname VARCHAR(50) NOT NULL,
    avatar TEXT DEFAULT '',
    motto TEXT DEFAULT '',
    email VARCHAR(100) DEFAULT '',
    gender INTEGER DEFAULT 0, -- 0: 未知, 1: 男, 2: 女
    birthday DATE,
    password_hash TEXT NOT NULL,
    salt TEXT NOT NULL,
    status INTEGER DEFAULT 1, -- 0: 禁用, 1: 正常
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 联系人表
CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    friend_id INTEGER NOT NULL,
    remark VARCHAR(50) DEFAULT '',
    group_id INTEGER DEFAULT 0,
    status INTEGER DEFAULT 1, -- 0: 已删除, 1: 正常
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (friend_id) REFERENCES users(id),
    UNIQUE(user_id, friend_id)
);

-- 联系人分组表
CREATE TABLE IF NOT EXISTS contact_groups (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    name VARCHAR(50) NOT NULL,
    sort INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 群组表
CREATE TABLE IF NOT EXISTS groups (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(100) NOT NULL,
    avatar TEXT DEFAULT '',
    description TEXT DEFAULT '',
    owner_id INTEGER NOT NULL,
    max_members INTEGER DEFAULT 500,
    is_public INTEGER DEFAULT 0, -- 0: 私有, 1: 公开
    is_mute INTEGER DEFAULT 0, -- 0: 正常, 1: 全员禁言
    status INTEGER DEFAULT 1, -- 0: 已解散, 1: 正常
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (owner_id) REFERENCES users(id)
);

-- 群组成员表
CREATE TABLE IF NOT EXISTS group_members (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    group_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    role INTEGER DEFAULT 0, -- 0: 普通成员, 1: 管理员, 2: 群主
    remark VARCHAR(50) DEFAULT '',
    is_mute INTEGER DEFAULT 0, -- 0: 正常, 1: 禁言
    joined_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (group_id) REFERENCES groups(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    UNIQUE(group_id, user_id)
);

-- 会话表
CREATE TABLE IF NOT EXISTS conversations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    talk_mode INTEGER NOT NULL, -- 1: 私聊, 2: 群聊
    to_from_id INTEGER NOT NULL, -- 对方用户ID或群组ID
    is_top INTEGER DEFAULT 0, -- 0: 不置顶, 1: 置顶
    is_disturb INTEGER DEFAULT 0, -- 0: 不免打扰, 1: 免打扰
    unread_count INTEGER DEFAULT 0,
    last_message_id INTEGER DEFAULT 0,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    UNIQUE(user_id, talk_mode, to_from_id)
);

-- 消息表
CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    msg_id VARCHAR(50) UNIQUE NOT NULL, -- 客户端生成的消息ID
    talk_mode INTEGER NOT NULL, -- 1: 私聊, 2: 群聊
    from_user_id INTEGER NOT NULL,
    to_from_id INTEGER NOT NULL, -- 接收方用户ID或群组ID
    message_type INTEGER NOT NULL, -- 1: 文本, 2: 图片, 3: 文件, 4: 语音, 5: 视频, 6: 代码, 7: 投票, 8: 转发
    content TEXT NOT NULL,
    quote_id VARCHAR(50) DEFAULT '', -- 引用消息ID
    is_revoke INTEGER DEFAULT 0, -- 0: 正常, 1: 已撤回
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (from_user_id) REFERENCES users(id)
);

-- 消息删除记录表（软删除）
CREATE TABLE IF NOT EXISTS message_deletions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    message_id INTEGER NOT NULL,
    deleted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (message_id) REFERENCES messages(id),
    UNIQUE(user_id, message_id)
);

-- 好友申请表
CREATE TABLE IF NOT EXISTS contact_applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    applicant_id INTEGER NOT NULL, -- 申请人
    user_id INTEGER NOT NULL, -- 被申请人
    message TEXT DEFAULT '',
    status VARCHAR(20) DEFAULT 'pending', -- pending: 待处理, accepted: 已同意, rejected: 已拒绝
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (applicant_id) REFERENCES users(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 群组申请表
CREATE TABLE IF NOT EXISTS group_applies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    group_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    remark TEXT DEFAULT '',
    status INTEGER DEFAULT 0, -- 0: 待处理, 1: 已同意, 2: 已拒绝
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (group_id) REFERENCES groups(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 群组公告表
CREATE TABLE IF NOT EXISTS group_notices (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    group_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL, -- 发布者
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    is_top INTEGER DEFAULT 0, -- 0: 不置顶, 1: 置顶
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (group_id) REFERENCES groups(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 用户设置表
CREATE TABLE IF NOT EXISTS user_settings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    setting_key VARCHAR(100) NOT NULL,
    setting_value TEXT DEFAULT '',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    UNIQUE(user_id, setting_key)
);

-- 用户会话状态表（替代 Redis）
CREATE TABLE IF NOT EXISTS user_sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    access_token TEXT NOT NULL,
    refresh_token TEXT DEFAULT '',
    expires_at DATETIME NOT NULL,
    platform VARCHAR(50) DEFAULT '',
    ip_address VARCHAR(45) DEFAULT '',
    user_agent TEXT DEFAULT '',
    is_active INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 在线状态表（替代 Redis）
CREATE TABLE IF NOT EXISTS user_online_status (
    user_id INTEGER PRIMARY KEY,
    status VARCHAR(20) DEFAULT 'offline', -- online, offline, away, busy
    last_seen DATETIME DEFAULT CURRENT_TIMESTAMP,
    platform VARCHAR(50) DEFAULT '',
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_contacts_user_id ON contacts(user_id);
CREATE INDEX IF NOT EXISTS idx_contacts_friend_id ON contacts(friend_id);
CREATE INDEX IF NOT EXISTS idx_group_members_group_id ON group_members(group_id);
CREATE INDEX IF NOT EXISTS idx_group_members_user_id ON group_members(user_id);
CREATE INDEX IF NOT EXISTS idx_conversations_user_id ON conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_messages_talk_mode_to_from_id ON messages(talk_mode, to_from_id);
CREATE INDEX IF NOT EXISTS idx_messages_from_user_id ON messages(from_user_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at);
CREATE INDEX IF NOT EXISTS idx_user_sessions_user_id ON user_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_access_token ON user_sessions(access_token);
CREATE INDEX IF NOT EXISTS idx_user_online_status_status ON user_online_status(status);

-- 插入默认数据（暂时注释掉，避免外键约束错误）
-- INSERT OR IGNORE INTO contact_groups (id, user_id, name, sort) VALUES 
-- (0, 0, '默认分组', 0);

-- 创建触发器，自动更新 updated_at 字段
CREATE TRIGGER IF NOT EXISTS update_users_updated_at 
    AFTER UPDATE ON users
    BEGIN
        UPDATE users SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END;

CREATE TRIGGER IF NOT EXISTS update_contacts_updated_at 
    AFTER UPDATE ON contacts
    BEGIN
        UPDATE contacts SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END;

CREATE TRIGGER IF NOT EXISTS update_groups_updated_at 
    AFTER UPDATE ON groups
    BEGIN
        UPDATE groups SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END;

CREATE TRIGGER IF NOT EXISTS update_conversations_updated_at 
    AFTER UPDATE ON conversations
    BEGIN
        UPDATE conversations SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END;

-- ========== P2P 相关表 ==========

-- P2P 消息表
CREATE TABLE IF NOT EXISTS p2p_messages (
    id TEXT PRIMARY KEY,
    from_peer TEXT NOT NULL,
    to_peer TEXT,
    group_id TEXT,
    type TEXT NOT NULL, -- text, image, file, audio, video
    content TEXT NOT NULL,
    timestamp INTEGER NOT NULL,
    signature TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- P2P 节点表
CREATE TABLE IF NOT EXISTS p2p_peers (
    peer_id TEXT PRIMARY KEY,
    nickname TEXT DEFAULT '',
    public_key TEXT,
    last_seen DATETIME DEFAULT CURRENT_TIMESTAMP,
    status TEXT DEFAULT 'offline', -- online, offline
    multiaddrs TEXT, -- JSON array of multiaddresses
    is_trusted INTEGER DEFAULT 0, -- 0: 未信任, 1: 已信任
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- P2P 群组表
CREATE TABLE IF NOT EXISTS p2p_groups (
    group_id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT DEFAULT '',
    creator_peer TEXT NOT NULL,
    is_public INTEGER DEFAULT 0, -- 0: 私有, 1: 公开
    max_members INTEGER DEFAULT 100,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- P2P 群组成员表
CREATE TABLE IF NOT EXISTS p2p_group_members (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    group_id TEXT NOT NULL,
    peer_id TEXT NOT NULL,
    role TEXT DEFAULT 'member', -- member, admin, owner
    joined_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (group_id) REFERENCES p2p_groups(group_id),
    FOREIGN KEY (peer_id) REFERENCES p2p_peers(peer_id),
    UNIQUE(group_id, peer_id)
);

-- P2P 联系人表
CREATE TABLE IF NOT EXISTS p2p_contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    peer_id TEXT NOT NULL,
    nickname TEXT DEFAULT '',
    remark TEXT DEFAULT '',
    is_blocked INTEGER DEFAULT 0, -- 0: 正常, 1: 已屏蔽
    added_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (peer_id) REFERENCES p2p_peers(peer_id),
    UNIQUE(peer_id)
);

-- P2P 身份存储表
CREATE TABLE IF NOT EXISTS p2p_identity (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    peer_id TEXT UNIQUE NOT NULL,
    private_key TEXT NOT NULL, -- 加密存储
    public_key TEXT NOT NULL,
    nickname TEXT DEFAULT '',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 创建 P2P 相关索引
CREATE INDEX IF NOT EXISTS idx_p2p_messages_from_peer ON p2p_messages(from_peer);
CREATE INDEX IF NOT EXISTS idx_p2p_messages_to_peer ON p2p_messages(to_peer);
CREATE INDEX IF NOT EXISTS idx_p2p_messages_group_id ON p2p_messages(group_id);
CREATE INDEX IF NOT EXISTS idx_p2p_messages_timestamp ON p2p_messages(timestamp);
CREATE INDEX IF NOT EXISTS idx_p2p_peers_status ON p2p_peers(status);
CREATE INDEX IF NOT EXISTS idx_p2p_peers_last_seen ON p2p_peers(last_seen);
CREATE INDEX IF NOT EXISTS idx_p2p_group_members_group_id ON p2p_group_members(group_id);
CREATE INDEX IF NOT EXISTS idx_p2p_group_members_peer_id ON p2p_group_members(peer_id);
CREATE INDEX IF NOT EXISTS idx_p2p_contacts_peer_id ON p2p_contacts(peer_id);

-- 创建 P2P 相关触发器
CREATE TRIGGER IF NOT EXISTS update_p2p_peers_updated_at 
    AFTER UPDATE ON p2p_peers
    BEGIN
        UPDATE p2p_peers SET updated_at = CURRENT_TIMESTAMP WHERE peer_id = NEW.peer_id;
    END;

CREATE TRIGGER IF NOT EXISTS update_p2p_groups_updated_at 
    AFTER UPDATE ON p2p_groups
    BEGIN
        UPDATE p2p_groups SET updated_at = CURRENT_TIMESTAMP WHERE group_id = NEW.group_id;
    END;

CREATE TRIGGER IF NOT EXISTS update_p2p_identity_updated_at 
    AFTER UPDATE ON p2p_identity
    BEGIN
        UPDATE p2p_identity SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END;

-- ========== 文章相关表 ==========

-- 文章分类表
CREATE TABLE IF NOT EXISTS article_classifies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    class_name VARCHAR(100) NOT NULL,
    sort INTEGER DEFAULT 0,
    is_default INTEGER DEFAULT 0, -- 0: 非默认, 1: 默认分类
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 文章标签表
CREATE TABLE IF NOT EXISTS article_tags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    tag_name VARCHAR(50) NOT NULL,
    color VARCHAR(20) DEFAULT '#409EFF',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    UNIQUE(user_id, tag_name)
);

-- 文章表
CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    class_id INTEGER DEFAULT 0,
    title VARCHAR(255) NOT NULL,
    abstract TEXT DEFAULT '',
    image TEXT DEFAULT '',
    content TEXT NOT NULL,
    md_content TEXT DEFAULT '',
    is_asterisk INTEGER DEFAULT 0, -- 0: 未收藏, 1: 已收藏
    status INTEGER DEFAULT 1, -- 0: 已删除, 1: 正常, 2: 回收站
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (class_id) REFERENCES article_classifies(id)
);

-- 文章标签关联表
CREATE TABLE IF NOT EXISTS article_tag_relations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    article_id INTEGER NOT NULL,
    tag_id INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES article_tags(id) ON DELETE CASCADE,
    UNIQUE(article_id, tag_id)
);

-- 创建文章相关索引
CREATE INDEX IF NOT EXISTS idx_articles_user_id ON articles(user_id);
CREATE INDEX IF NOT EXISTS idx_articles_class_id ON articles(class_id);
CREATE INDEX IF NOT EXISTS idx_articles_status ON articles(status);
CREATE INDEX IF NOT EXISTS idx_articles_is_asterisk ON articles(is_asterisk);
CREATE INDEX IF NOT EXISTS idx_articles_created_at ON articles(created_at);
CREATE INDEX IF NOT EXISTS idx_article_classifies_user_id ON article_classifies(user_id);
CREATE INDEX IF NOT EXISTS idx_article_tags_user_id ON article_tags(user_id);
CREATE INDEX IF NOT EXISTS idx_article_tag_relations_article_id ON article_tag_relations(article_id);
CREATE INDEX IF NOT EXISTS idx_article_tag_relations_tag_id ON article_tag_relations(tag_id);

-- 创建文章相关触发器
CREATE TRIGGER IF NOT EXISTS update_articles_updated_at 
    AFTER UPDATE ON articles
    BEGIN
        UPDATE articles SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END;

CREATE TRIGGER IF NOT EXISTS update_article_classifies_updated_at 
    AFTER UPDATE ON article_classifies
    BEGIN
        UPDATE article_classifies SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END;

CREATE TRIGGER IF NOT EXISTS update_article_tags_updated_at 
    AFTER UPDATE ON article_tags
    BEGIN
        UPDATE article_tags SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END;

-- 插入默认文章分类（暂时注释掉，避免外键约束错误）
-- INSERT OR IGNORE INTO article_classifies (id, user_id, class_name, sort, is_default) VALUES 
-- (0, 0, '默认分类', 0, 1);