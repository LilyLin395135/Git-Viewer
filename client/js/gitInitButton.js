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
  
  document.addEventListener('DOMContentLoaded', initButtonState);