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
      if (gitInfo.error) {
        updateButtonStatus(gitInitButton, currentFolderPath, result.gitExists);
        alert(gitInfo.error);
        return;
      }
      console.log(gitInfo);

      let gitInfoId = 0;
      await window.electron.deleteGitInfo();
      await window.electron.createGitInfo(gitInfo, (err, id) => {
        if (err) {
          console.error('Error creating git info', err);
        } else {
          console.log('Insert git info with ID:', id);
          gitInfoId = id;
        }
      });

      drawGitGraph(gitInfo, 'formal-graph');
      drawGitGraph(gitInfo, 'preview-graph');
      console.log('Selected folder:', currentFolderPath);
    }
  } catch (error) {
    console.error('Error opening folder:', error);
  }
});
