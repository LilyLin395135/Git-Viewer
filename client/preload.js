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
  // showAlert: (message) => ipcRenderer.invoke('show-alert', message),
  showAlert: (message) => ipcRenderer.invoke('show-custom-alert', message),
  executeGitCommand: (data) => ipcRenderer.invoke('execute-git-command', data),
  prepareTempGitFolder: (currentFolderPath) => ipcRenderer.invoke('prepare-temp-git-folder', currentFolderPath),
  checkWorkflows: (commands, folderPath) => ipcRenderer.invoke('check-workflows', { commands, folderPath }),
  triggerWorkflows: (userId, eventTriggered, folderPath) => ipcRenderer.invoke('trigger-workflows', { userId, eventTriggered, folderPath }),
  findGitRoot: (folderPath) => ipcRenderer.invoke('findGitRoot', folderPath),
  findYmlFiles: (rootDir) => ipcRenderer.invoke('findYmlFiles', rootDir),
  register: (email, password) => ipcRenderer.invoke('register', { email, password }),
  login: (email, password) => ipcRenderer.invoke('login', { email, password }),
  fetchCommitMessage: (hash, folderPath) => ipcRenderer.invoke('fetch-commit-message', { hash, folderPath }),
  openCommandHub: () => ipcRenderer.send('open-commands-hub'),
  openCommandRecord: () => ipcRenderer.send('open-command-record'),
  useCommand: (command) => ipcRenderer.send('use-command', command),
  on: (channel, func) => ipcRenderer.on(channel, func) // expose ipcRenderer 的 on 方法
});
