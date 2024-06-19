const checkIsGitManage = (folderPath) => {
  const fs = window.require('fs');
  const path = window.require('path');

  while (folderPath) {
    if (fs.existsSync(path.join(folderPath, '.git'))) {
      return folderPath;
    }
    const parentFolder = path.dirname(folderPath);
    if (parentFolder === folderPath) break;
    folderPath = parentFolder;
  }
  return null;
};

const getFolderStatus = async () => {
  const folderPath = '';
  const gitExists = folderPath ? checkIsGitManage(folderPath) : false;
  return { folderPath, gitExists };
};

const updateInitButtonStatus = (folderPath, gitExists) => {
  if (!folderPath || gitExists) {
    gitInitButton.setAttribute('disabled', true);
  } else {
    gitInitButton.removeAttribute('disabled');
  }
};

const initButtonState = async () => {
  const { folderPath, gitExists } = await getFolderStatus();

  updateInitButtonStatus(folderPath, gitExists);
};

gitInitButton.addEventListener('click', async () => {
  try {
    if (currentFolderPath) {
      const response = await window.electron.initGit(currentFolderPath);
      if (response && response.status === 'cancelled') {
        console.log('Git init operation cancelled.');
        return;
      }
      console.log(response);
      gitInitButton.setAttribute('disabled', true);
      clearGraph('formal-graph');
      clearGraph('preview-graph');
      alert('Git Init Successfully.');
    }
  } catch (error) {
    console.error('Error initializing git:', error);
    alert('Error Initializing git: ' + error.message);
  }
});

document.addEventListener('DOMContentLoaded', initButtonState);
