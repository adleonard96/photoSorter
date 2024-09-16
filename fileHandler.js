// @ts-check
const { dialog } = require('electron')
const fs = require('fs/promises');

module.exports = class fileHandler{
    constructor(){};

    /*dirstory: string[] */
    static #directory = [];
    static #currentPhotoPosition = 0;

    async openDialog() {
        let result = await dialog.showOpenDialog({ properties: ['openDirectory'] });
        return result.filePaths;
    }


    async getDirectory(folder) {
        fileHandler.#directory = (await fs.readdir(folder)).filter(this.#isPhotoFile);
        fileHandler.#currentPhotoPosition = 0;
        return fileHandler.#directory;
    }

    async getCurrentPhoto() {
        return fileHandler.#directory[fileHandler.#currentPhotoPosition];
    }

    getNextPhoto() {
        if(fileHandler.#currentPhotoPosition === (fileHandler.#directory.length - 1)){
            return;
        } 
        fileHandler.#currentPhotoPosition ++;
        return fileHandler.#directory[fileHandler.#currentPhotoPosition];
    }

    getPreviousPhoto() {
        if(fileHandler.#currentPhotoPosition === 0){
            return;
        }
        fileHandler.#currentPhotoPosition --;
        return fileHandler.#directory[fileHandler.#currentPhotoPosition];
    }

    /**
     * 
     * @param {string} filename
     * @returns {boolean} 
     */
    #isPhotoFile(filename){
        let isAPNG = filename.toUpperCase().includes('.APNG');
        let isAVIF = filename.toUpperCase().includes('.AVIF');
        let isGIF = filename.toUpperCase().includes('.GIF');
        let isJPEG = filename.toUpperCase().includes('.JPEG');
        let isJPG = filename.toUpperCase().includes('.JPG');
        let isPNG = filename.toUpperCase().includes('.PNG');
        let isSVG = filename.toUpperCase().includes('.SVG');
        return isAPNG || isAVIF || isGIF || isJPEG || isPNG || isSVG || isJPG;
    }
}
