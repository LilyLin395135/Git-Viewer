import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import path from 'path';
import fs from 'fs';
import axios from 'axios';
import { checkIsGitManage } from './utils/checkIsGitManage.js';
import { db, createGitInfo, deleteGitInfo } from './database.js';

const appDirectory = process.cwd(); // 當前工作資料夾

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(appDirectory, 'dist/preload.js'),
      contextIsolation: true,
      enableRemoteModule: false
    }
  });
  mainWindow.loadFile(path.join(appDirectory, 'dist/index.html'));
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

ipcMain.handle('init-git', async (event, folderPath) => {
  const parentGitFolder = checkIsGitManage(path.dirname(folderPath));
  if (parentGitFolder) {
    const result = await dialog.showMessageBox({
      type: 'question',
      buttons: ['Yes', 'No'],
      defaultId: 1,
      title: 'Confirm',
      message: `The parent folder ${parentGitFolder} is already a git repository. Do you still want to run git init?`
    });

    if (result.response === 1) {
      return { status: 'cancelled' };
    }
  }

  try {
    const response = await axios.post('http://localhost:3000/api/git/init', { folderPath });
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.error || error.message || 'Unknown error';
    throw new Error(errorMessage);
  }
});

ipcMain.handle('get-git-info', async (event, repoPath) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/git/allBranchesInfo?folderPath=${repoPath}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

ipcMain.handle('create-git-info',(event,gitInfo)=>{
  deleteGitInfo();
  createGitInfo(gitInfo);
});

ipcMain.handle('delete-git-info',()=>{
  deleteGitInfo();
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
