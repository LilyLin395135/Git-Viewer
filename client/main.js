import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import path, { resolve } from 'path';
import fs from 'fs';
import axios from 'axios';
import simpleGit from 'simple-git';
import fse from 'fs-extra';
import ignore from 'ignore';
import { checkIsGitManage } from './utils/checkIsGitManage.js';
import { db, createGitInfo, deleteGitInfo } from './database.js';

// if (process.env.NODE_ENV !== 'production') {
//   import('electron-debug').then(electronDebug => {
//     electronDebug.default({ showDevTools: true });
//   });
// }

const appDirectory = process.cwd(); // 當前工作資料夾

let folderSelected = false; //在全域範圍內，才能在 openFolder.js 和 commandHandler.js 中都能被正確地存取和更新。

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
    folderSelected = true;
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

async function getGitInfo(folderPath) {
  try {
    const response = await axios.get(`http://localhost:3000/api/git/allBranchesInfo?folderPath=${folderPath}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching git info:', error);
    throw error;
  }
}

ipcMain.handle('get-git-info', async (event, repoPath) => {
  try {
    const gitInfo = await getGitInfo(repoPath);
    return gitInfo;
  } catch (error) {
    return { error: error.response?.data?.error || error.message };
  }
});

ipcMain.handle('prepare-temp-git-folder', async (event, sourceFolderPath) => {
  try {
    const tempFolderPath = path.join(app.getPath('userData'), 'temp-git-folder');

    if (fs.existsSync(tempFolderPath)) {
      fse.removeSync(tempFolderPath);
    }
    fse.mkdirSync(tempFolderPath, { recursive: true });

    // 初始化 ignore 实例
    const ig = ignore();

    // 遍历目录并递归读取 .gitignore 文件
    const addIgnoreFiles = (dir) => {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          addIgnoreFiles(fullPath);
        } else if (entry.isFile() && entry.name === '.gitignore') {
          const gitignoreContent = fs.readFileSync(fullPath).toString();
          ig.add(gitignoreContent);
        }
      }
    };

    addIgnoreFiles(sourceFolderPath);

    // 递归地复制文件和目录，同时排除 .gitignore 中的文件
    const copyFolderRecursive = async (source, target) => {
      const entries = fs.readdirSync(source, { withFileTypes: true });
      for (const entry of entries) {
        const sourcePath = path.join(source, entry.name);
        const targetPath = path.join(target, entry.name);
        const relativePath = path.relative(sourceFolderPath, sourcePath);
        if (ig.ignores(relativePath)) continue;

        if (entry.isDirectory()) {
          fse.mkdirSync(targetPath, { recursive: true });
          await copyFolderRecursive(sourcePath, targetPath);
        } else {
          fse.copyFileSync(sourcePath, targetPath);
        }
      }
    };

    await copyFolderRecursive(sourceFolderPath, tempFolderPath);

    return tempFolderPath;
  } catch (error) {
    console.error('Error preparing temp git folder:', error);
    throw error;
  }
});

ipcMain.handle('execute-git-command', async (event, { command, tempFolderPath }) => {
  try {
    const git = simpleGit(tempFolderPath);
    let [mainCommand, ...args] = command.split(' ');

    // Remove 'git' from the command if it's included
    if (mainCommand.toLowerCase() === 'git') {
      mainCommand = args.shift();
    }

    console.log(`mainCommand:${mainCommand}`);
    console.log(`args:${args}`);

    switch (mainCommand) {
      case 'add':
        await git.add(args);
        break;
      case 'commit':
        const messageIndex = args.indexOf('-m');
        if (messageIndex !== -1) {
          const message = args.slice(messageIndex + 1).join(' ');
          await git.commit(message, args.slice(0, messageIndex));
        } else {
          await git.commit(args.join(' '));
        }
        break;
      case 'status':
        await git.status();
        break;
      // Add more cases as needed
      default:
        await git.raw([mainCommand, ...args]);
    }

    const gitInfo = await getGitInfo(tempFolderPath);
    await new Promise((resolve, reject) => {
      createGitInfo(gitInfo, (err, id) => {
        if (err) {
          reject(err);
        } else {
          resolve(id);
        }
      });
    });
    return gitInfo;
  } catch (error) {
    console.error('Error executing git command:', error);
    throw error;
  }
});

ipcMain.handle('create-git-info', async (event, gitInfo) => {
  return new Promise((resolve, reject) => {
    createGitInfo(gitInfo, (err, id) => {
      if (err) {
        reject(err);
      } else {
        resolve(id);
      }
    });
  });
});

ipcMain.handle('delete-git-info', () => {
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
