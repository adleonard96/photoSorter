const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('fileHandler', {
    open: () => ipcRenderer.invoke('file:open'),
    getFirstPhoto: (directory)=>  ipcRenderer.invoke('file:firstPhoto', directory),
    getPreviousPhoto: () => ipcRenderer.invoke('file:previousPhoto'),
    getNextPhoto: () => ipcRenderer.invoke('file:nextPhoto'),
    addSortOption: (option, folder) => ipcRenderer.invoke('file:AddSortOption', [option, folder]), 
    copyPhoto: (photoPath, rootPath, copyFolders) => ipcRenderer.invoke('file:copyPhoto', [photoPath, rootPath, copyFolders]),
    getCurrentFolders: () => () => ipcRenderer.invoke('file:getCurrentFolders')
})

contextBridge.exposeInMainWorld('element', {
    getNewSortingOption: (option) => ipcRenderer.invoke('element:sortOption', option),
    getExistingSortingOptions: () => ipcRenderer.invoke('element:existingSortOptions')
})