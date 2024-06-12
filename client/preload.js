import { contextBridge, ipcRenderer } from 'electron';

// 使用 contextBridge 將將安全的 API 給 render process
contextBridge.exposeInMainWorld('electron', {
  // openFolder 方法，當被調用時會使用 ipcRenderer module 向主執行緒發送 'open-folder' 請求
  openFolder: () => ipcRenderer.invoke('open-folder')
});
