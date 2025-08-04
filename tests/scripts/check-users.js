const Database = require('better-sqlite3');
const path = require('path');

// 数据库文件路径
const dbPath = path.join(__dirname, 'userData', 'whytalk.db');

console.log('数据库路径:', dbPath);

try {
  // 连接数据库
  const db = new Database(dbPath);
  
  // 查询所有用户
  const stmt = db.prepare('SELECT * FROM users');
  const users = stmt.all();
  
  console.log('数据库中的用户数量:', users.length);
  console.log('用户列表:');
  users.forEach(user => {
    console.log(`ID: ${user.id}, 手机号: ${user.mobile}, 昵称: ${user.nickname}, 状态: ${user.status}`);
  });
  
  // 特别查询测试用户
  const testUserStmt = db.prepare('SELECT * FROM users WHERE mobile = ?');
  const testUser = testUserStmt.get('13800138000');
  
  if (testUser) {
    console.log('\n测试用户信息:');
    console.log(testUser);
  } else {
    console.log('\n未找到测试用户 (13800138000)');
  }
  
  db.close();
} catch (error) {
  console.error('查询数据库时出错:', error);
}