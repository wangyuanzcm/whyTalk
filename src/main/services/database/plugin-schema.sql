-- Why-Talk 插件数据存储扩展Schema
-- 用于支持插件系统的数据存储和共享

-- 插件数据存储表
CREATE TABLE IF NOT EXISTS plugin_data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    plugin_id VARCHAR(100) NOT NULL,
    data_key VARCHAR(200) NOT NULL,
    data_value TEXT,
    data_type VARCHAR(50) DEFAULT 'string', -- string, json, number, boolean
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(plugin_id, data_key)
);

-- 插件共享数据表（用于插件间数据共享）
CREATE TABLE IF NOT EXISTS plugin_shared_data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    namespace VARCHAR(100) NOT NULL, -- 数据命名空间，如 'contacts', 'messages'
    data_key VARCHAR(200) NOT NULL,
    data_value TEXT,
    data_type VARCHAR(50) DEFAULT 'string',
    owner_plugin VARCHAR(100), -- 数据所有者插件
    permissions TEXT, -- JSON格式的权限配置
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(namespace, data_key)
);

-- 联系人扩展数据表（插件特定的联系人数据）
CREATE TABLE IF NOT EXISTS contact_plugin_data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    contact_id INTEGER NOT NULL, -- 关联contacts表的id
    plugin_id VARCHAR(100) NOT NULL,
    data_key VARCHAR(200) NOT NULL,
    data_value TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (contact_id) REFERENCES contacts(id) ON DELETE CASCADE,
    UNIQUE(contact_id, plugin_id, data_key)
);

-- 消息扩展数据表（插件特定的消息数据）
CREATE TABLE IF NOT EXISTS message_plugin_data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    message_id INTEGER NOT NULL, -- 关联messages表的id
    plugin_id VARCHAR(100) NOT NULL,
    data_key VARCHAR(200) NOT NULL,
    data_value TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (message_id) REFERENCES messages(id) ON DELETE CASCADE,
    UNIQUE(message_id, plugin_id, data_key)
);

-- 插件权限表
CREATE TABLE IF NOT EXISTS plugin_permissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    plugin_id VARCHAR(100) NOT NULL,
    permission VARCHAR(200) NOT NULL,
    granted BOOLEAN DEFAULT TRUE,
    granted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    granted_by VARCHAR(100), -- 授权者
    UNIQUE(plugin_id, permission)
);

-- 插件配置表
CREATE TABLE IF NOT EXISTS plugin_configs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    plugin_id VARCHAR(100) NOT NULL,
    config_key VARCHAR(200) NOT NULL,
    config_value TEXT,
    config_type VARCHAR(50) DEFAULT 'string',
    is_encrypted BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(plugin_id, config_key)
);

-- 创建索引优化查询性能
CREATE INDEX IF NOT EXISTS idx_plugin_data_plugin_id ON plugin_data(plugin_id);
CREATE INDEX IF NOT EXISTS idx_plugin_data_key ON plugin_data(plugin_id, data_key);
CREATE INDEX IF NOT EXISTS idx_plugin_shared_data_namespace ON plugin_shared_data(namespace);
CREATE INDEX IF NOT EXISTS idx_plugin_shared_data_key ON plugin_shared_data(namespace, data_key);
CREATE INDEX IF NOT EXISTS idx_contact_plugin_data_contact_id ON contact_plugin_data(contact_id);
CREATE INDEX IF NOT EXISTS idx_contact_plugin_data_plugin ON contact_plugin_data(plugin_id);
CREATE INDEX IF NOT EXISTS idx_message_plugin_data_message_id ON message_plugin_data(message_id);
CREATE INDEX IF NOT EXISTS idx_message_plugin_data_plugin ON message_plugin_data(plugin_id);
CREATE INDEX IF NOT EXISTS idx_plugin_permissions_plugin ON plugin_permissions(plugin_id);
CREATE INDEX IF NOT EXISTS idx_plugin_configs_plugin ON plugin_configs(plugin_id);

-- 为现有表添加插件相关字段
-- 注意：这些ALTER语句在实际执行时需要检查字段是否已存在

-- 为contacts表添加插件相关字段
-- ALTER TABLE contacts ADD COLUMN is_pinned INTEGER DEFAULT 0; -- 联系人置顶
-- ALTER TABLE contacts ADD COLUMN plugin_source VARCHAR(100) DEFAULT ''; -- 插件来源
-- ALTER TABLE contacts ADD COLUMN last_interaction DATETIME; -- 最后交互时间
-- ALTER TABLE contacts ADD COLUMN custom_data TEXT; -- 自定义数据（JSON格式）

-- 为conversations表添加插件相关字段
-- ALTER TABLE conversations ADD COLUMN is_pinned INTEGER DEFAULT 0; -- 会话置顶
-- ALTER TABLE conversations ADD COLUMN plugin_data TEXT; -- JSON格式的插件数据
-- ALTER TABLE conversations ADD COLUMN custom_settings TEXT; -- 自定义设置

-- 为messages表添加插件相关字段
-- ALTER TABLE messages ADD COLUMN plugin_source VARCHAR(100) DEFAULT ''; -- 消息来源插件
-- ALTER TABLE messages ADD COLUMN attachment_data TEXT; -- 附件数据（JSON格式）
-- ALTER TABLE messages ADD COLUMN read_status INTEGER DEFAULT 0; -- 阅读状态
-- ALTER TABLE messages ADD COLUMN custom_data TEXT; -- 自定义数据（JSON格式）

-- 创建触发器自动更新时间戳
CREATE TRIGGER IF NOT EXISTS update_plugin_data_timestamp 
    AFTER UPDATE ON plugin_data
    FOR EACH ROW
    BEGIN
        UPDATE plugin_data SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END;

CREATE TRIGGER IF NOT EXISTS update_plugin_shared_data_timestamp 
    AFTER UPDATE ON plugin_shared_data
    FOR EACH ROW
    BEGIN
        UPDATE plugin_shared_data SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END;

CREATE TRIGGER IF NOT EXISTS update_contact_plugin_data_timestamp 
    AFTER UPDATE ON contact_plugin_data
    FOR EACH ROW
    BEGIN
        UPDATE contact_plugin_data SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END;

CREATE TRIGGER IF NOT EXISTS update_message_plugin_data_timestamp 
    AFTER UPDATE ON message_plugin_data
    FOR EACH ROW
    BEGIN
        UPDATE message_plugin_data SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END;

CREATE TRIGGER IF NOT EXISTS update_plugin_configs_timestamp 
    AFTER UPDATE ON plugin_configs
    FOR EACH ROW
    BEGIN
        UPDATE plugin_configs SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END;

-- 创建视图简化查询
CREATE VIEW IF NOT EXISTS v_plugin_contact_summary AS
SELECT 
    c.id,
    c.user_id,
    c.friend_id,
    c.remark,
    c.group_id,
    c.is_pinned,
    c.plugin_source,
    c.last_interaction,
    c.created_at,
    c.updated_at,
    GROUP_CONCAT(cpd.data_key || ':' || cpd.data_value, '|') as plugin_data
FROM contacts c
LEFT JOIN contact_plugin_data cpd ON c.id = cpd.contact_id
GROUP BY c.id;

CREATE VIEW IF NOT EXISTS v_plugin_message_summary AS
SELECT 
    m.id,
    m.user_id,
    m.talk_mode,
    m.to_from_id,
    m.message_type,
    m.content,
    m.plugin_source,
    m.read_status,
    m.created_at,
    m.updated_at,
    GROUP_CONCAT(mpd.data_key || ':' || mpd.data_value, '|') as plugin_data
FROM messages m
LEFT JOIN message_plugin_data mpd ON m.id = mpd.message_id
GROUP BY m.id;

-- 插入默认的共享数据命名空间
INSERT OR IGNORE INTO plugin_shared_data (namespace, data_key, data_value, data_type, owner_plugin) VALUES
('contacts', 'last_update', '0', 'number', 'system'),
('messages', 'last_update', '0', 'number', 'system'),
('conversations', 'last_update', '0', 'number', 'system'),
('files', 'last_update', '0', 'number', 'system');

-- 插入默认权限配置
INSERT OR IGNORE INTO plugin_permissions (plugin_id, permission, granted, granted_by) VALUES
('contact-plugin', 'read:contacts', TRUE, 'system'),
('contact-plugin', 'write:contacts', TRUE, 'system'),
('contact-plugin', 'read:contact_groups', TRUE, 'system'),
('contact-plugin', 'write:contact_groups', TRUE, 'system'),
('message-plugin', 'read:messages', TRUE, 'system'),
('message-plugin', 'write:messages', TRUE, 'system'),
('message-plugin', 'read:conversations', TRUE, 'system'),
('message-plugin', 'write:conversations', TRUE, 'system'),
('message-plugin', 'read:contacts', TRUE, 'system'),
('message-plugin', 'read:files', TRUE, 'system'),
('message-plugin', 'write:files', TRUE, 'system');