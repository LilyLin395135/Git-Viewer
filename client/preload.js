const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  openFolder: () => ipcRenderer.invoke('open-folder'),
  initGit: (folderPath) => ipcRenderer.invoke('init-git', folderPath),
  getGitInfo: (folderPath) => ipcRenderer.invoke('get-git-info', folderPath),
  createGitInfo: (gitInfo, callback) => {
    ipcRenderer.invoke('create-git-info', gitInfo)
      .then((id) => callback(null, id))
      .catch((err) => callback(err))
  },
  deleteGitInfo: () => ipcRenderer.invoke('delete-git-info'),
  showAlert: (message) => ipcRenderer.invoke('show-alert', message),
  executeGitCommand: (data) => ipcRenderer.invoke('execute-git-command', data),
  prepareTempGitFolder: (currentFolderPath) => ipcRenderer.invoke('prepare-temp-git-folder', currentFolderPath),
  checkWorkflows: (commands, folderPath) => ipcRenderer.invoke('check-workflows', { commands, folderPath }),
  triggerWorkflows: (userId, eventTriggered, folderPath) => ipcRenderer.invoke('trigger-workflows', { userId, eventTriggered, folderPath })
});
