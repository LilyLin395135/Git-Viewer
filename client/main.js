import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import path from 'path';
import fs from 'fs';
import axios from 'axios';
import simpleGit from 'simple-git';
import fse from 'fs-extra';
import ignore from 'ignore';
import { checkWorkflows, triggerWorkflows } from './utils/gitActionRunner.js';
import { initGit, getGitInfo, getCommitMessage } from './utils/gitInformation.js'
import { formatStatus } from './utils/gitCommands.js';
// import { createGitInfo, deleteGitInfo } from './database.js';
import dotenv from 'dotenv';
import { findGitRoot, findYmlFiles } from './utils/gitActionRunner.js';
import pkg from 'electron-updater';
const { autoUpdater } = pkg;

dotenv.config();
const URL = 'https://gitviewer.lilylinspace.com';

// chrome debug tool
if (process.env.NODE_ENV !== 'production') {
  import('electron-debug').then(electronDebug => {
    electronDebug.default({ showDevTools: true });
  });
}

const appDirectory = process.cwd(); // 當前工作資料夾
let folderSelected = false; //在全域範圍內，才能在 openFolder.js 和 commandHandler.js 中都能被正確地存取和更新。

let commandsHubWindow = null;
let commandRecordWindow = null;

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(appDirectory, 'dist/preload.js'),
      contextIsolation: true,
      enableRemoteModule: false
    },
    icon: path.join(appDirectory, 'build', 'icon.png') //應用程式logo
  });
  mainWindow.loadFile(path.join(appDirectory, 'dist/git-viewer.html'));

  mainWindow.once('ready-to-show', () => {
    autoUpdater.checkForUpdatesAndNotify();
  });

  ipcMain.on('use-command', (event, command) => {
    mainWindow.webContents.send('use-command', command);
  });

  ipcMain.on('open-commands-hub', () => {
    if (commandsHubWindow) {
      commandsHubWindow.focus();
    } else {
      createCommandsHubWindow();
    }
  });

  ipcMain.on('open-command-record', () => {
    if (commandRecordWindow) {
      commandRecordWindow.focus();
    } else {
      createCommandRecordWindow();
    }
  });
}

function createCommandsHubWindow() {
  commandsHubWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(appDirectory, 'dist/preload.js'),
      contextIsolation: true,
      enableRemoteModule: false
    }
  });

  commandsHubWindow.loadFile(path.join(appDirectory, 'dist/commandHub.html'));

  commandsHubWindow.on('closed', () => {
    commandsHubWindow = null;
  });
}

function createCommandRecordWindow() {
  commandRecordWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(appDirectory, 'dist/preload.js'),
      contextIsolation: true,
      enableRemoteModule: false
    }
  });

  commandRecordWindow.loadFile(path.join(appDirectory, 'dist/commandRecord.html'));

  commandRecordWindow.on('closed', () => {
    commandRecordWindow = null;
  });
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

ipcMain.handle('register', async (event, { email, password }) => {
  try {
    const response = await fetch(`${URL}/api/user/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      const message = await response.text();
      return { success: false, message };
    }

    const data = await response.json();
    return { success: true, userId: data.data.user.id, token: data.data.access_token };
  } catch (error) {
    console.error('Error in register:', error);
    return { success: false, message: error.message };
  }
});

ipcMain.handle('login', async (event, { email, password }) => {
  try {
    const response = await fetch(`${URL}/api/user/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      const message = await response.text();
      return { success: false, message };
    }

    const data = await response.json();
    return { success: true, userId: data.data.user.id, token: data.data.access_token };
  } catch (error) {
    console.error('Error in login:', error);
    return { success: false, message: error.message };
  }
});

ipcMain.handle('findGitRoot', async (event, folderPath) => {
  return findGitRoot(folderPath);
});

ipcMain.handle('findYmlFiles', async (event, dir) => {
  return findYmlFiles(dir);
});

ipcMain.handle('init-git', initGit);

ipcMain.handle('get-git-info', async (event, folderPath) => {
  try {
    const gitInfo = await getGitInfo(folderPath);
    return gitInfo;
  } catch (error) {
    console.error('Error in get-git-info:', error);
    return { error: error.message || 'Unknown error' };
  }
});

ipcMain.handle('fetch-commit-message', async (event, { hash, folderPath }) => {
  try {
    const commitMessage = await getCommitMessage(hash, folderPath);
    return commitMessage;
  } catch (error) {
    console.error(`Error fetching commit message for hash ${hash}:`, error);
    return { error: error.message || 'Unknown error' };
  }
});

ipcMain.handle('prepare-temp-git-folder', async (event, sourceFolderPath) => {
  try {
    const tempFolderPath = path.join(app.getPath('userData'), 'temp-git-folder');

    if (fs.existsSync(tempFolderPath)) {
      fse.removeSync(tempFolderPath);
    }
    fse.mkdirSync(tempFolderPath, { recursive: true });

    // 初始化 ignore
    const ig = ignore();

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

    // 複製文件和目錄，同時排除 .gitignore 中的文件
    const copyFolderRecursive = async (source, target) => {
      try {
        const entries = fs.readdirSync(source, { withFileTypes: true });
        for (const entry of entries) {
          const sourcePath = path.join(source, entry.name);
          const targetPath = path.join(target, entry.name);
          const relativePath = path.relative(sourceFolderPath, sourcePath);

          // console.log(`Processing ${relativePath}`);

          if (ig.ignores(relativePath)) {
            // console.log(`Ignored ${relativePath}`);
            continue;
          }

          if (entry.isDirectory()) {
            fse.mkdirSync(targetPath, { recursive: true });
            await copyFolderRecursive(sourcePath, targetPath);
          } else {
            fse.copyFileSync(sourcePath, targetPath);
          }
        }
      } catch (err) {
        console.error(`Error copying ${source} to ${target}:`, err);
        throw err;
      }
    }

    await copyFolderRecursive(sourceFolderPath, tempFolderPath);

    return tempFolderPath;
  } catch (error) {
    console.error('Error preparing temp git folder:', error);
    throw error;
  }
});

ipcMain.handle('execute-git-command', async (event, { command, folderPath, isPushCheckOnly = true }) => {
  try {
    let [mainCommand, ...args] = command.split(' ');

    // Remove 'git' from the command if it's included
    if (mainCommand.toLowerCase() === 'git') {
      mainCommand = args.shift();
    }

    const git = simpleGit(folderPath);
    let resultMessage = '';

    console.log(`mainCommand:${mainCommand}`);
    console.log(`args:${args}`);


    switch (mainCommand) {
      case 'clone':
        const repoUrl = args[0];

        if (fs.existsSync(path.join(folderPath, '.git'))) {
          throw new Error('The folder is already a git repository. Please choose another folder.');
        }

        if (fs.existsSync(folderPath) && fs.readdirSync(folderPath).length > 0) {
          throw new Error('The folder is not empty. Please choose another folder.');
        }

        await git.clone(repoUrl, folderPath);
        resultMessage = `Repository successfully cloned from ${repoUrl} to ${folderPath}`;
        break;

      case 'pull':
        const remoteName = args[0] || 'origin';
        const branchName = args[1] || 'main';
        const pullResult = await git.pull(remoteName, branchName);

        if (pullResult.summary.changes === 0) {
          resultMessage = 'Already up to date.';
        } else {
          resultMessage = `
          Pulled from ${remoteName}/${branchName} successfully.
          summary:${pullResult.summary}
          `;
        }
        break;

      case 'fetch':
        const fetchRemoteName = args[0] || 'origin';
        const fetchBranchName = args[1];
        const fetchResult = await git.fetch(fetchRemoteName, fetchBranchName);

        if (fetchResult) {
          resultMessage = `
          Fetched from ${fetchRemoteName}/${fetchBranchName || ''} successfully.
          ${JSON.stringify(fetchResult, null, 2)}
          `;
        } else {
          resultMessage = 'Fetch completed with no changes.';
        }
        break;

      case 'rebase':
        const rebaseBranch = args[0];
        const rebaseResult = await git.rebase([rebaseBranch]);

        if (rebaseResult) {
          resultMessage = `
          Rebased onto ${rebaseBranch} successfully.
          rebaseResult
          `;
        } else {
          resultMessage = 'Rebase completed with no changes.';
        }
        break;

      case 'reset':
        const resetMode = args[0] || '--mixed';
        const resetCommit = args[1] || 'HEAD';
        await git.reset([resetMode, resetCommit]);
        const postResetStatus = await git.status();
        const unstagedChanges = postResetStatus.files
          .filter(file => file.working_dir !== ' ')
          .map(file => `${file.working_dir}       ${file.path}`)
          .join('\n');
        resultMessage = `Unstaged changes after reset:\n${unstagedChanges}`;
        break;

      case 'rm':
        await git.rm(args);
        resultMessage = `Removed ${args.join(', ')} successfully.`;
        break;

      case 'mv':
        const [source, destination] = args;
        await git.mv(source, destination);
        resultMessage = `Moved ${source} to ${destination} successfully.`;
        break;

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
        if (args.includes('-d')) {
          const branchToDelete = args[args.indexOf('-d') + 1];
          await git.deleteLocalBranch(branchToDelete);
          return { message: `Branch '${branchToDelete}' deleted successfully.` };
        } else if (args.length === 0) {
          const branchSummary = await git.branchLocal();
          const branches = branchSummary.all.map(branch => branch === branchSummary.current ? `* ${branch}` : `  ${branch}`).join('\n');
          resultMessage = `Branches:\n${branches}`;
        } else {
          const branchResult = await git.branch(args);
          resultMessage = `Branch '${args[0]}' created successfully.\n${JSON.stringify(branchResult, null, 2)}`;
        }
        break;

      case 'checkout':
        if (args.length === 1) {
          const branchName = args[0];
          const currentBranch = (await (git.status())).current;
          if (branchName === currentBranch) {
            resultMessage = `Already on ${branchName}`;
            break;
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
        const mergeResult = await git.merge(args);
        console.log('mergeResult:', mergeResult); // 打印 mergeResult 以查看其结构
        const summary = mergeResult.summary || {};
        const files = mergeResult.files || [];
        if (files.length > 0) {
          const formattedChanges = files.map(file => {
            const insertions = mergeResult.insertions[file] || 0;
            const deletions = mergeResult.deletions[file] || 0;
            return `${file} | ${insertions} insertion(s), ${deletions} deletion(s)`;
          }).join('\n');
          resultMessage = `Updating ${summary.our || ''}..${summary.theirs || ''}\nFast-forward\n${formattedChanges}`;
        } else {
          resultMessage = `Merged ${args.join(' ')} successfully.`;
        }
        break;

      case 'status':
        const statusResult = await git.status();
        const formattedStatus = formatStatus(statusResult);
        resultMessage = formattedStatus;
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

            // 使用 merge-tree 比较
            const mergeTreeOutput = await git.raw(['merge-tree', mergeBaseTrimmed, localBranch, remoteBranch]);

            if (mergeTreeOutput.includes('<<<<<<<') || mergeTreeOutput.includes('=======') || mergeTreeOutput.includes('>>>>>>>')) {
              // 如果有衝突，返回 merge-tree 的完整输出
              return { conflict: true, conflicts: mergeTreeOutput };
            } else {
              return { conflict: false, message: 'No direct conflicts found. Safe to push your formal files.' };
            }
          } else {
            // 實際執行 git push
            await git.push(args);
            resultMessage = 'Pushed to remote repository successfully.';
          }
        } catch (diffError) {
          if (diffError.message.includes(`Not a valid object name`)) {
            return { conflict: true, message: `The remote branch does not exist. You may need to use <git push origin {branchName} --force> on formal files.` };
          } else if (diffError.message.includes('non-fast-forward')) {
            return { conflict: true, message: 'Updates were rejected because the tip of your current branch is behind its remote counterpart. Use "git pull" to integrate the remote changes before pushing again.' };
          } else {
            throw new Error(diffError.message);
          }
        }
        break;

      case 'log':
        const logResult = await git.log(args);
        const formattedLog = logResult.all.map(commit => {
          return `commit ${commit.hash}\nAuthor: ${commit.author_name} <${commit.author_email}>\nDate: ${commit.date}\n\n    ${commit.message}\n`;
        }).join('\n');
        resultMessage = formattedLog;
        break;

      case 'diff':
        const diffResult = await git.diff(args);
        resultMessage = diffResult;
        break;

      // case 'reset':
      //   if (args[0] === '--soft' && args[1].startsWith('HEAD~')) {
      //     await git.raw(['reset', '--soft', args[1]]);
      //     resultMessage = 'Reset the last commit.';
      //   } else if (args[0] === 'origin' && args[1] === '+HEAD') {
      //     await git.raw(['push', 'origin', '+HEAD']);
      //     resultMessage = 'Forced pushed the HEAD.';
      //   } else {
      //     await git.reset(args);
      //     resultMessage = 'Reset the repository.';
      //   }
      //   break;

      default:
        const rawResult = await git.raw([mainCommand, ...args]);
        resultMessage = typeof rawResult === 'string' ? rawResult : JSON.stringify(rawResult, null, 2);
    }

    const isRepo = await git.checkIsRepo();
    if (!isRepo) {
      throw new Error('No git repository found in the given path or its parent directories.');
    }

    const gitInfo = await getGitInfo(folderPath);
    return { message: resultMessage, gitInfo };
  } catch (error) {
    console.error('Error executing git command:', error);
    throw new Error(error.message || 'Unknown error');
  }
});

ipcMain.handle('check-workflows', async (event, { commands, folderPath }) => {
  try {
    const eventsTriggered = await checkWorkflows({ commands, folderPath });
    return eventsTriggered;
  } catch (error) {
    console.error('Error checking workflows:', error);
    throw error;
  }
});

ipcMain.handle('trigger-workflows', async (event, { userId, eventTriggered, folderPath }) => {
  try {
    const {
      ymlContent,
      repositoryUrl,
      workflowFileName,
      projectFolder,
      commitHash,
      commitMessage
    } = await triggerWorkflows(eventTriggered, folderPath);

    const response = await axios.post(`${URL}/api/workflow/trigger`, {
      userId,
      event: eventTriggered,
      ymlContent,
      repoUrl: repositoryUrl,
      workflowFileName,
      projectFolder,
      commitHash,
      commitMessage
    });
    return response.data;
  } catch (error) {
    console.error('Error triggering workflows:', error);
    throw error;
  }
});

// ipcMain.handle('create-git-info', async (event, gitInfo) => {
//   return new Promise((resolve, reject) => {
//     createGitInfo(gitInfo, (err, id) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(id);
//       }
//     });
//   });
// });

// ipcMain.handle('delete-git-info', () => {
//   deleteGitInfo();
// });

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

// 自動更新事件
autoUpdater.on('update-available', () => {
  console.log('A new update is available');
});

autoUpdater.on('update-downloaded', () => {
  console.log('Update downloaded');
});

autoUpdater.on('error', (error) => {
  console.error('Error in auto-updater:', error);
});
