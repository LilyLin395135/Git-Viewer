let folderSelected = false; //在全域範圍內，才能在 openFolder.js 和 commandHandler.js 中都能被正確地存取和更新。
let currentFolderPath = '';
let tempFolderPath = '';

document.getElementById('open-folder').addEventListener('click', async () => {
  try {
    const result = await window.electron.openFolder();
    const gitInitButton = document.getElementById('git-init');

    if (result) {
      folderSelected = true; // 設置 folderSelected 為 true
      currentFolderPath = result.folderPath;
      tempFolderPath = await window.electron.prepareTempGitFolder(currentFolderPath);
      clearGraph('formal-graph');
      clearGraph('preview-graph');
      updateButtonStatus(gitInitButton, currentFolderPath, result.gitExists);

      if (!result.gitExists) {
        clickInitButton(gitInitButton, currentFolderPath);
        return;
      }

      const gitInfo = await window.electron.getGitInfo(currentFolderPath);
      const gitInfoTemp = await window.electron.getGitInfo(tempFolderPath);

      if (gitInfo.error) {
        // updateButtonStatus(gitInitButton, currentFolderPath, result.gitExists);
        alert(gitInfo.error);
        return;
      }
      console.log(`gitInfo:${gitInfo}`);
      if (gitInfoTemp.error) {
        // updateButtonStatus(gitInitButton, currentFolderPath, result.gitExists);
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
  }
});
