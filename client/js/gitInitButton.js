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

const updateButtonStatus = (button, folderPath, gitExists) => {
  if (!folderPath || gitExists) {
    button.setAttribute('disabled', true);
  } else {
    button.removeAttribute('disabled');
  }
};

const initButtonState = async () => {
  const gitInitButton = document.getElementById('git-init');
  const { folderPath, gitExists } = await getFolderStatus();

  updateButtonStatus(gitInitButton, folderPath, gitExists);
};

const clickInitButton=(button,folderPath)=>{
  button.onclick = async () => {
    try {
      const response = await window.electron.initGit(folderPath);
      if (response && response.status === 'cancelled') {
        console.log('Git init operation cancelled.');
        return;
      }
      console.log(response);
      button.setAttribute('disabled', true);
      clearGraph('formal-graph');
      clearGraph('preview-graph');
      alert('Git Init Successfully.');
    } catch (error) {
      console.error('Error Initializing git:', error);
    }
  };

};

document.addEventListener('DOMContentLoaded', initButtonState);
