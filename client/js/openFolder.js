document.getElementById('open-folder').addEventListener('click', async () => {
  try {
    const result = await window.electron.openFolder();
    if (result) {
      const gitInfo = await window.electron.getGitInfo(result.folderPath);
      console.log(gitInfo);
      drawGitGraph(gitInfo,'formal-graph');
      drawGitGraph(gitInfo,'preview-graph');
      console.log('Selected folder:', result.folderPath);

      const gitInitButton = document.getElementById('git-init');
      updateButtonStatus(gitInitButton, result.folderPath, result.gitExists);

      if (!result.gitExists) {
        gitInitButton.onclick = async () => {
          try {
            const response = await window.electron.initGit(result.folderPath);
            if (response && response.status === 'cancelled') {
              console.log('Git init operation cancelled.');
              return;
            }
            console.log(response);
            gitInitButton.setAttribute('disabled', true);
          } catch (error) {
            console.error('Error Initializing git:', error);
          }
        };
      }
      //gitInfo存入DB
    }
  } catch (error) {
    console.error('Error opening folder:', error);
  }
});
