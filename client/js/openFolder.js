const gitInitButton = document.getElementById('git-init');
let folderSelected = false; //在全域範圍內，才能在 openFolder.js 和 commandHandler.js 中都能被正確地存取和更新。
let currentFolderPath = localStorage.getItem('currentFolderPath') || '';
let tempFolderPath = localStorage.getItem('tempFolderPath') || '';
let gitInfo = localStorage.getItem('gitInfo') || '';
let gitInfoTemp = localStorage.getItem('gitInfoTemp') || '';
let lastGitInfo = JSON.parse(localStorage.getItem('lastGitInfo')) || null; // 儲存最後的 Git 資料

document.addEventListener('DOMContentLoaded', () => {
  if (currentFolderPath && tempFolderPath) {
    folderSelected = true;
    updateInitButtonStatus(currentFolderPath, true);
    loadGraphFromLocalStorage('formal-graph');
    loadGraphFromLocalStorage('preview-graph');
    checkForUpdates();
  }
});

document.getElementById('open-folder').addEventListener('click', async () => {
  await handleFolderSelection();
});

async function handleFolderSelection() {
  try {
    const result = await window.electron.openFolder();
    if (result) {
      await processFolderInfo(result.folderPath, result.gitExists);
    }
  } catch (error) {
    console.error('Error opening folder:', error);
    alert('Error opening folder: ' + error.message);
  }
}

async function processFolderInfo(folderPath, gitExists) {
  localStorage.removeItem('graphContent_formal-graph');
  localStorage.removeItem('graphContent_preview-graph');

  folderSelected = true;
  currentFolderPath = folderPath;
  tempFolderPath = await window.electron.prepareTempGitFolder(currentFolderPath);
  if (tempFolderPath.error) {
    alert(tempFolderPath.error);
    return;
  }

  localStorage.setItem('currentFolderPath', currentFolderPath);
  localStorage.setItem('tempFolderPath', tempFolderPath);

  clearCommandList();
  clearGraph('formal-graph');
  clearGraph('preview-graph');
  updateInitButtonStatus(currentFolderPath, gitExists);

  if (!gitExists) {
    return;
  }

  gitInfo = await window.electron.getGitInfo(currentFolderPath);
  if (gitInfo.error) {
    alert(gitInfo.error);
    return;
  }

  gitInfoTemp = await window.electron.getGitInfo(tempFolderPath);
  console.log(`gitInfo:${gitInfo}`);
  if (gitInfoTemp.error) {
    alert(gitInfoTemp.error);
    return;
  }

  localStorage.setItem('gitInfo', JSON.stringify(gitInfo));
  localStorage.setItem('gitInfoTemp', JSON.stringify(gitInfoTemp));
  localStorage.setItem('lastGitInfo', JSON.stringify(gitInfo)); // 保存初始化的 Git 資料到 localStorage

  lastGitInfo = gitInfo; // 保存初始化的 Git 資料

  drawGitGraph(gitInfo, 'formal-graph');
  drawGitGraph(gitInfoTemp, 'preview-graph');
  console.log('Selected folder:', currentFolderPath);
  console.log('Temp folder:', tempFolderPath);

  checkForUpdates(); // 開始檢查更新
}

async function checkForUpdates() {
  setInterval(async () => {
    if (!folderSelected || !currentFolderPath) return;

    try {
      const newGitInfo = await window.electron.getGitInfo(currentFolderPath);
      if (newGitInfo.error) {
        console.error('Error fetching new git info:', newGitInfo.error);
        return;
      }

      if (JSON.stringify(newGitInfo) !== JSON.stringify(lastGitInfo)) {
        const userConfirmed = confirm('Git data has been updated. Do you want to fetch the data again?');
        if (userConfirmed) {
          lastGitInfo = newGitInfo;
          localStorage.setItem('lastGitInfo', JSON.stringify(newGitInfo)); // 更新 localStorage 中的 lastGitInfo
          await processFolderInfo(currentFolderPath, true);
        }
        else {
          lastGitInfo = newGitInfo;
          localStorage.setItem('lastGitInfo', JSON.stringify(newGitInfo)); // 更新 localStorage 中的 lastGitInfo
        }
      }
    } catch (error) {
      console.error('Error fetching git info:', error);
    }
  }, 1000);//每1秒檢查一次
};