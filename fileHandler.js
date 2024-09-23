// @ts-check
const { dialog } = require('electron')
const fs = require('fs/promises');

module.exports = class fileHandler {
    constructor() { };

    /**
     * @type {string[]} 
     */
    static #directory = [];

    /**
     * @type {string[]}
     */
    static #existingFolders = [];

    /**
     * @type {number}
     */
    static currentPhotoPosition = 0;
    
    /**
     * @type {string}
     */
    static currentDirectory;

    /**
     * @type {string[]}
     */
    static sortOptions = [];

    async openDialog() {
        let result = await dialog.showOpenDialog({ properties: ['openDirectory'] });
        return result.filePaths;
    }

    /**
     * Gets the files in the directory. Also sets existing folders.
     * @async
     * @param {string} folder 
     * @returns { Promise<string[]> }
     */
    async getDirectory(folder, lastPosition = 0) {
        fileHandler.currentDirectory = folder;
        let files = await fs.readdir(folder);
        fileHandler.#directory = (files).filter(this.#isPhotoFile);
        fileHandler.#existingFolders = (files).filter((file) => !file.includes("."));
        fileHandler.currentPhotoPosition = lastPosition;
        return fileHandler.#directory;
    }
    
    /**
     * Gets current photo name
     * @returns {Promise<string>}
     */
    async getCurrentPhoto() {
        return fileHandler.#directory[fileHandler.currentPhotoPosition];
    }

    /**
     * Gets next photo in directory if there is one.
     * @returns {string | void}
     */
    getNextPhoto() {
        if (fileHandler.currentPhotoPosition === (fileHandler.#directory.length - 1)) {
            return;
        }
        fileHandler.currentPhotoPosition ++;
        return fileHandler.#directory[fileHandler.currentPhotoPosition];
    }

    /**
     * Returns previous photo if there is one
     * @returns {string | void}
     */
    getPreviousPhoto() {
        if (fileHandler.currentPhotoPosition === 0) {
            return;
        }
        fileHandler.currentPhotoPosition --;
        return fileHandler.#directory[fileHandler.currentPhotoPosition];
    }

    /**
     * Checks to see if a file is a photo. 
     * @param {string} filename
     * @returns {boolean} 
     */
    #isPhotoFile(filename) {
        let isAPNG = filename.toUpperCase().includes('.APNG');
        let isAVIF = filename.toUpperCase().includes('.AVIF');
        let isGIF = filename.toUpperCase().includes('.GIF');
        let isJPEG = filename.toUpperCase().includes('.JPEG');
        let isJPG = filename.toUpperCase().includes('.JPG');
        let isPNG = filename.toUpperCase().includes('.PNG');
        let isSVG = filename.toUpperCase().includes('.SVG');
        return isAPNG || isAVIF || isGIF || isJPEG || isPNG || isSVG || isJPG;
    }

    /**
     * Checks to see if a folder exists
     * @param {string} name 
     * @param {string} folder
     * @returns {Promise<boolean>}
     */
    static async checkForFolder(name, folder){
        let folderFound = (await fs.readdir(folder)).filter((fileName) => name.toLocaleLowerCase() === fileName.toLocaleLowerCase());
        return folderFound.length > 0;
    }

    /**
     * Creates folder with the provided directory
     * 
     * @param {string} name 
     * @param {string} folder
     * @returns {Promise<void>}
     */
    static async createFolder(name, folder){
        await fs.mkdir(folder + '\\' + name);
    }

    /**
     * Makes a copy of a photo to a new path
     * 
     * @param {string} photoPath 
     * @param {string} newPath 
     */
    static async copyPhoto(photoPath, newPath){
        await fs.copyFile(photoPath, newPath);
    }

    /**
     * Returns folders in a directory
     * @returns {string[]}
     */
    static getDirectoryFolders(){
        return fileHandler.#existingFolders;
    }
}
