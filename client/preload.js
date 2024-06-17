const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  openFolder: () => ipcRenderer.invoke('open-folder'),
  initGit: (folderPath) => ipcRenderer.invoke('init-git', folderPath),
  getGitInfo: (folderPath) => ipcRenderer.invoke('get-git-info', folderPath),
  createGitInfo:(gitInfo,callback)=>{
    ipcRenderer.invoke('create-git-info', gitInfo)
    .then((id)=>callback(null,id))
    .catch((err)=>callback(err))
  },
  deleteGitInfo:()=> ipcRenderer.invoke('delete-git-info')
});
