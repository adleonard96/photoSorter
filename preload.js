const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('fileHandler', {
    open: () => ipcRenderer.invoke('file:open'),
    getFirstPhoto: (directory)=>  ipcRenderer.invoke('file:firstPhoto', directory),
    getPreviousPhoto: () => ipcRenderer.invoke('file:previousPhoto'),
    getNextPhoto: () => ipcRenderer.invoke('file:nextPhoto'),
    addSortOption: (option, folder) => ipcRenderer.invoke('file:AddSortOption', [option, folder]), 
})