import { app, BrowserWindow } from 'electron';
import path from 'path';

const appDirectory = process.cwd(); // 當前工作資料夾

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(appDirectory, 'client', 'preload.js'),
      contextIsolation: true, // 啟用上下文隔離，確保 preload 腳本中的變數不會污染全局命名空間。
      nodeIntegration: false // 禁用 Node.js API，防止不受信任的內容在渲染進程中執行任意 Node.js 代碼。
    }
  });
  mainWindow.loadFile(path.join(appDirectory, 'client', 'index.html'));
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('active', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
