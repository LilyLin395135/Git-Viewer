document.getElementById('open-folder').addEventListener('click', async () => {
  try {
    const result = await window.electron.openFolder();
    const gitInitButton = document.getElementById('git-init');

    if (result) {
      clearGraph('formal-graph');
      clearGraph('preview-graph');
      updateButtonStatus(gitInitButton, result.folderPath, result.gitExists);

      if (!result.gitExists) {
        clickInitButton(gitInitButton, result.folderPath);
        return;
      }

      const gitInfo = await window.electron.getGitInfo(result.folderPath);
      if (gitInfo.error) {
        updateButtonStatus(gitInitButton, result.folderPath, result.gitExists);
        alert(gitInfo.error); // 顯示alert訊息
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
      console.log('Selected folder:', result.folderPath);
    }
  } catch (error) {
    console.error('Error opening folder:', error);
  }
});
