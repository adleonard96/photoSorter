const { app, BrowserWindow, ipcMain, nativeTheme } = require('electron/main')
const path = require('node:path')
const fileHandler  = require('./fileHandler');
const { webContents } = require('electron');

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
    let files = await handler.getDirectory(directory[0]);
    return files[0];
})

ipcMain.handle('file:nextPhoto', async () => {
    let handler = new fileHandler();
    return handler.getNextPhoto();
})

ipcMain.handle('file:previousPhoto', async () => {
    let handler = new fileHandler();
    return handler.getPreviousPhoto();
})

ipcMain.handle('file:sortOption', async (_, options) => {
    fileHandler.sortOptions.push(options[0]);
    
})


app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})