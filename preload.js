const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('fileHandler', {
    open: () => ipcRenderer.invoke('file:open')
})