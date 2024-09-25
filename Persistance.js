const fs = require('fs/promises')
const fileHandler = require('./fileHandler')

const FILE_NAME = "persistance.json";

module.exports = class Persistance {
    /**
     * Is used to save current position in directory to JSON file
     * 
     * @static
     * @async
     * @returns {Promise<void>}
     */
    static async savePosition(){
        let persitance = {
            currentDirectoryPosition: fileHandler.currentPhotoPosition
        }
        await fs.writeFile(fileHandler.currentDirectory + '\\' + FILE_NAME, JSON.stringify(persitance));
    }

    /**
     * Is used to get file position in the folder.  Doesn't account for changes in folder
     * @param {string} directory 
     * @returns {number}
     */
    static async checkPosition(directory){
        let files = (await fs.readdir(directory)).filter((file) => file === FILE_NAME);
        if(files.length === 0){
            return 0;
        }
        let history = (await fs.readFile(directory + '\\' + FILE_NAME, "utf-8"));
        return JSON.parse(history).currentDirectoryPosition;
    }
}