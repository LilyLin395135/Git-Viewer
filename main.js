import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import path from 'path';
import fs from 'fs';

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

ipcMain.handle('open-folder', async () => { // 處理名為 open-folder 的 IPC （process 間通信）請求
  const options = { // 設置對話框的選項
    title: 'Open Folder', // 對話框標題
    properties: ['openDirectory'] // 對話框屬性：打開目錄
  };

  const result = await dialog.showOpenDialog(options);
  if (!result.canceled) { // 對話框沒有被取消操作
    const folderPath = result.filePaths[0]; // 選取的資料夾路徑
    const gitExists = fs.existsSync(path.join(folderPath, '.git')); // 檢查所選資料夾是否存在 .git
    return { folderPath, gitExists }; // 這將作為 IPC response 給 render process
  }
  return null;
});

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
