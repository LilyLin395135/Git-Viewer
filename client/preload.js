const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  openFolder: () => ipcRenderer.invoke('open-folder'),
  initGit: (folderPath) => ipcRenderer.invoke('init-git', folderPath),
  getGitInfo: (folderPath) => ipcRenderer.invoke('get-git-info', folderPath),
  createGitInfo:(gitInfo)=> ipcRenderer.invoke('create-git-info', gitInfo),
  deleteGitInfo:()=> ipcRenderer.invoke('delete-git-info')
});
