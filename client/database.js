import { app } from 'electron';
import path from 'path';
import sqlite3 from 'sqlite3';

const sqlite = sqlite3.verbose(); // 更詳細的錯誤報告
const userDataPath = app.getPath('userData'); // 獲取應用程式資料夾路徑
const dbPath = path.join(userDataPath, 'gitviewer.db'); //設定資料庫檔案路徑
console.log('Database path:', dbPath); // 添加此行打印数据库路径
const db = new sqlite.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database', err);
  } else {
    console.log('Database opened successfully');
    db.serialize(() => {
      createTable();
    });
  }
});

function createTable() {
  db.run(`
      CREATE TABLE IF NOT EXISTS git_info(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      data TEXT NOT NULL
      )
    `, (err) => {
    if (err) {
      console.error('Error creating table', err);
    } else {
      console.log('Table created successfully');
    }
  });
};

function createGitInfo(gitInfo, callback) {
  const stmt = db.prepare('INSERT INTO git_info (data) VALUES (?)', (err) => {
    if (err) {
      console.error('Error preparing statement', err);
      callback(err, null);
      return;
    };
  });

  stmt.run(JSON.stringify(gitInfo), function(err) {
    if (err) {
      console.error('Error inserting data', err);
      callback(err, null);
    } else {
      console.log('Data inserted successfully');
      callback(null, this.lastID);
    }
  });

  stmt.finalize();
};


function deleteGitInfo() {
  db.run('DELETE FROM git_info', (err) => {
    if (err) {
      console.error('Error deleting data', err);
    } else {
      console.log('Data deleted successfully');
    }
  })
};

function getGitInfo(callback) {
  db.get('SELECT data FROM git_info', (err, row) => {
    if (err) {
      console.error('Error reading from database', err);
    } else {
      const gitInfo = JSON.parse(row.data);
      callback(gitInfo);
    }
  });
};

function updateGitInfo(gitInfo) {
  deleteGitInfo();
  const stmt = db.prepare('INSERT INTO git_info (data) VALUES (?)');
  stmt.run(JSON.stringify(gitInfo)); // 轉換為 JSON
  stmt.finalize(); // 釋放資源
};



export { db, createTable, createGitInfo, deleteGitInfo, getGitInfo, updateGitInfo };