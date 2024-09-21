const { app, BrowserWindow, ipcMain, nativeTheme } = require('electron/main')
const path = require('node:path')
const fileHandler  = require('./fileHandler');
const Persistance = require('./Persistance');
const SortOption = require('./SortOption');

let win;
function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadFile('index.html')
}


ipcMain.handle('file:open', async () => {
    let handler = new fileHandler();
    return await handler.openDialog();
})

ipcMain.handle('file:firstPhoto', async (_, directory) => {
    let handler = new fileHandler();
    let lastPosition = await Persistance.checkPosition(directory[0]);
    let files = await handler.getDirectory(directory[0], lastPosition);
    return files[lastPosition];
})

ipcMain.handle('file:nextPhoto', async () => {
    let handler = new fileHandler();
    return handler.getNextPhoto();
})

ipcMain.handle('file:previousPhoto', async () => {
    let handler = new fileHandler();
    return handler.getPreviousPhoto();
})

ipcMain.handle('file:getCurrentFolders', () => {
    return fileHandler.getDirectoryFolders();
})

ipcMain.handle('element:sortOption', (_, inputVal) => {
    return SortOption.getSortOption(inputVal);
})

ipcMain.handle('file:AddSortOption', async (_, options) => {
    let [option, folder] = options;
    if(await fileHandler.checkForFolder(option, folder)){
        return;
    }  
    await fileHandler.createFolder(option, folder);
})

ipcMain.handle('file:copyPhoto', async (_, options) => {
    let [photoPath, rootPath, copyFolders] = options;
    for(let folder of copyFolders){
        await fileHandler.copyPhoto(rootPath+'\\'+photoPath, rootPath+'\\'+folder+'\\'+photoPath);
    }
})

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', async () => {
    if (process.platform !== 'darwin') {
        await Persistance.savePosition();
        app.quit()
    }
})