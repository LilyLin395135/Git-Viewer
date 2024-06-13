const { ipcRenderer } = require('electron');
const fs = require('fs');
const path = require('path');

const checkIsGitManage = (folderPath) => {
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

document.getElementById('open-folder').addEventListener('click', async () => {
  try {
    const result = await ipcRenderer.invoke('open-folder');
    if (result) {
      console.log('Selected folder:', result.folderPath);
      const gitInitButton = document.getElementById('git-init');
      updateButtonStatus(gitInitButton, result.folderPath, result.gitExists);

      if (!result.gitExists) {
        gitInitButton.onclick = async () => {
          try {
            const response = await ipcRenderer.invoke('init-git', result.folderPath);
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
    }
  } catch (error) {
    console.error('Error opening folder:', error);
  }
});
