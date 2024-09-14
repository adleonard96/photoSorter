const { dialog } = require('electron')
const fs = require('fs/promises');

module.exports = class fileHandler{
    constructor(){};

    async openDialog() {
        let result = await dialog.showOpenDialog({ properties: ['openDirectory'] });
        return result.filePaths;
    }

    async getDirectory(folder) {
        return fs.readdir(folder);
    }
}
