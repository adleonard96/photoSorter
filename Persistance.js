const fs = require('fs/promises')
const fileHandler = require('./fileHandler')

module.exports = class Persistance {
    static async savePosition(){
        let persitance = {
            currentDirectoryPosition: fileHandler.currentPhotoPosition
        }
        await fs.writeFile(fileHandler.currentDirectory + '\\' + 'persistance.json', JSON.stringify(persitance));
    }
}