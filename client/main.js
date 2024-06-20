import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import path, { resolve } from 'path';
import fs from 'fs';
import axios from 'axios';
import simpleGit from 'simple-git';
import fse from 'fs-extra';
import ignore from 'ignore';
import { checkIsGitManage } from './utils/checkIsGitManage.js';
import { db, createGitInfo, deleteGitInfo } from './database.js';

// chrome debug tool
if (process.env.NODE_ENV !== 'production') {
  import('electron-debug').then(electronDebug => {
    electronDebug.default({ showDevTools: true });
  });
}

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

<<<<<<< HEAD
ipcMain.handle('execute-git-command', async (event, { command, folderPath, isPushCheckOnly = true }) => {
=======
ipcMain.handle('execute-git-command', async (event, { command, folderPath, isPushCheckOnly = false }) => {
>>>>>>> fc5fba0a23b7ceb0abb84e776eabf21b6ff1ab5c
  try {
    const git = simpleGit(folderPath);
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

      case 'branch':
        await git.branch(args);
        break;

      case 'checkout':
        if (args.length === 1) {
          const branchName = args[0];
          const currentBranch = (await (git.status())).current;
          if (branchName === currentBranch) {
            return { message: `Already on '${branchName}` };
          }

          const worktreeList = await git.raw(['worktree', 'list']);
          const worktreeLines = worktreeList.split('\n');

          // 檢查是否有現有的工作樹並移除
          for (const line of worktreeLines) {
            if (line.includes(branchName) || line.includes('temp-worktree')) {
              const worktreePath = line.split(' ')[0];
              await git.raw(['worktree', 'remove', worktreePath]);
            }
          }

          await git.checkout(branchName);
        } else {
          await git.checkout(args);
        }
        break;

      case 'merge':
        await git.merge(args);
        break;

      case 'branch -d':
        await git.deleteLocalBranch(args[0]);
        break;

      case 'status':
        await git.status();
        break;

      case 'push':
        try {
          if (isPushCheckOnly) {
            // preview的部分不執行 git push，而是協助檢查是否有衝突用 git fetch、git merge-base 和 git diff
            await git.fetch();
            const localBranch = (await git.status()).current;
            const remoteBranch = `origin/${localBranch}`;

            const mergeBase = await git.raw(['merge-base', localBranch, remoteBranch]);
            const mergeBaseTrimmed = mergeBase.trim();

<<<<<<< HEAD
            // 使用 merge-tree 比较
            const mergeTreeOutput = await git.raw(['merge-tree', mergeBaseTrimmed, localBranch, remoteBranch]);

            if (mergeTreeOutput.includes('<<<<<<<') || mergeTreeOutput.includes('=======') || mergeTreeOutput.includes('>>>>>>>')) {
              // 如果有衝突，返回 merge-tree 的完整输出
              return { conflict: true, conflicts: mergeTreeOutput };
            } else {
              return { conflict: false, message: 'No direct conflicts found. Safe to push your formal files.' };
=======

            const diffOutput = await git.diff([`${mergeBaseTrimmed}..${localBranch}`]);
            const remoteDiffOutput = await git.diff([`${mergeBaseTrimmed}..${remoteBranch}`]);

            if (!diffOutput) {
              // 如果没有本地變化
              return { conflict: false, message: 'No local differences found. Safe to push your formal file.' };
            }

            if (!remoteDiffOutput) {
              // 如果没有遠端變化
              return { conflict: false, message: 'No remote differences found. Safe to push your formal file.' };
            }

            const diffLines = diffOutput.split('\n');
            const remoteDiffLines = remoteDiffOutput.split('\n');

            const conflicts = diffLines.filter(line => remoteDiffLines.includes(line)).map(line => ({ line }));


            if (conflicts.length > 0) {
              // 如果有差異，返回詳細的差異訊息
              return { conflict: true, conflicts };
            } else {
              return { conflict: false, message: 'No differences found. Safe to push your formal files.' };
>>>>>>> fc5fba0a23b7ceb0abb84e776eabf21b6ff1ab5c
            }
          } else {
            // 實際執行 git push
            await git.push(args);
            return { message: 'Pushed to remote repository successfully.' };
          }
        } catch (diffError) {
          if (diffError.message.includes(`Not a valid object name`)) {
            return { conflict: true, message: `The remote branch does not exist. You may need to use <git push origin {branchName} --force> on formal files.` };
<<<<<<< HEAD
          } else if (diffError.message.includes('non-fast-forward')) {
            return { conflict: true, message: 'Updates were rejected because the tip of your current branch is behind its remote counterpart. Use "git pull" to integrate the remote changes before pushing again.' };
=======
>>>>>>> fc5fba0a23b7ceb0abb84e776eabf21b6ff1ab5c
          } else {
            throw new Error(diffError.message);
          }
        }
        break;
<<<<<<< HEAD
=======

>>>>>>> fc5fba0a23b7ceb0abb84e776eabf21b6ff1ab5c
      // Add more cases as needed
      default:
        await git.raw([mainCommand, ...args]);
    }

    const gitInfo = await getGitInfo(folderPath);
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
    throw new Error(error.message || 'Unknown error');
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
