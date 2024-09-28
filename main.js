const { app, BrowserWindow, ipcMain, nativeTheme } = require('electron/main')
const path = require('node:path')
const fileHandler  = require('./fileHandler');
const Persistance = require('./Persistance');
const SortOption = require('./SortOption');

let win;

/**
 * creates main window
 */
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


/**
 * open file select dialog
 */
ipcMain.handle('file:open', async () => {
    let handler = new fileHandler();
    return await handler.openDialog();
})

/**
 * retrieves first photo 
 */
ipcMain.handle('file:firstPhoto', async (_, directory) => {
    let handler = new fileHandler();
    let lastPosition = await Persistance.checkPosition(directory[0]);
    let files = await handler.getDirectory(directory[0], lastPosition);
    return files[lastPosition];
})

/**
 * gets next photo in the directory
 */
ipcMain.handle('file:nextPhoto', async () => {
    let handler = new fileHandler();
    return handler.getNextPhoto();
})

/**
 * gets previous photo in the directory
 */
ipcMain.handle('file:previousPhoto', async () => {
    let handler = new fileHandler();
    return handler.getPreviousPhoto();
})

/**
 * gets the folders in the currect directory
 */
ipcMain.handle('file:getCurrentFolders', () => {
    return fileHandler.getDirectoryFolders();
})

/**
 * creates folder for photos to be sorted in, if directory doesn't already exist
 */
ipcMain.handle('file:AddSortOption', async (_, options) => {
    let [option, folder] = options;
    if(await fileHandler.checkForFolder(option, folder)){
        return;
    }  
    await fileHandler.createFolder(option, folder);
})

/**
 * makes a copy of the photo over to the new directory
 */
ipcMain.handle('file:copyPhoto', async (_, options) => {
    let [photoPath, rootPath, copyFolders] = options;
    for(let folder of copyFolders){
        await fileHandler.copyPhoto(rootPath+'\\'+photoPath, rootPath+'\\'+folder+'\\'+photoPath);
    }
})

/**
 * creates a sort option
 */
ipcMain.handle('element:sortOption', (_, inputVal) => {
    return SortOption.getSortOption(inputVal);
})

/**
 * creates all sort options already in teh directory
 */
ipcMain.handle('element:existingSortOptions', () => {
    let options = fileHandler.getDirectoryFolders();
    return SortOption.getSortOptions(options);
})

/**
 * creates window on create
 */
app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

/** handels close and saves last position on shutdown */
app.on('window-all-closed', async () => {
    if (process.platform !== 'darwin') {
        await Persistance.savePosition();
        app.quit()
    }
})