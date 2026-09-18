import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('desktop', {
  workspaceMeta: () => ipcRenderer.invoke('workspace:meta'),
})
