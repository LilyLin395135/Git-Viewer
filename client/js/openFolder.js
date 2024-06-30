const gitInitButton = document.getElementById('git-init');
let folderSelected = false; //在全域範圍內，才能在 openFolder.js 和 commandHandler.js 中都能被正確地存取和更新。
let currentFolderPath = localStorage.getItem('currentFolderPath') || '';
let tempFolderPath = localStorage.getItem('tempFolderPath') || '';

document.addEventListener('DOMContentLoaded', () => {
  if (currentFolderPath && tempFolderPath) {
    folderSelected = true;
    updateInitButtonStatus(gitInitButton, currentFolderPath, true);
    loadGraphFromLocalStorage('formal-graph');
    loadGraphFromLocalStorage('preview-graph');
  }
});

document.getElementById('open-folder').addEventListener('click', async () => {
  try {
    const result = await window.electron.openFolder();

    if (result) {
      localStorage.removeItem('graphContent_formal-graph');
      localStorage.removeItem('graphContent_preview-graph');

      folderSelected = true; // 設置 folderSelected 為 true
      currentFolderPath = result.folderPath;
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
      updateInitButtonStatus(gitInitButton, currentFolderPath, result.gitExists);

      if(!result.gitExists){
        return;
      }

      const gitInfo = await window.electron.getGitInfo(currentFolderPath);
      if (gitInfo.error) {
        alert(gitInfo.error);
        return;
      }

      const gitInfoTemp = await window.electron.getGitInfo(tempFolderPath);
      console.log(`gitInfo:${gitInfo}`);
      if (gitInfoTemp.error) {
        alert(gitInfoTemp.error);
        return;
      }

      console.log(`gitInfoTemp:${gitInfoTemp}`);

      drawGitGraph(gitInfo, 'formal-graph');
      drawGitGraph(gitInfoTemp, 'preview-graph');
      console.log('Selected folder:', currentFolderPath);
      console.log('Temp folder:', tempFolderPath);
    }
  } catch (error) {
    console.error('Error opening folder:', error);
    alert('Error opening folder: ' + error.message);
  }
});
