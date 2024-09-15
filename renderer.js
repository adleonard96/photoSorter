// const { ipcRenderer } = require("electron/renderer");
let result;

document.getElementById('open-file').addEventListener('click', async () => {
    result = await window.fileHandler.open();
    document.getElementById('folder').innerHTML = result;
    let firstPhoto = await window.fileHandler.getFirstPhoto(result);
    document.getElementById('imageDude').src = result+'\\' + firstPhoto;
})

document.getElementById('previous-photo').addEventListener('click', async () => {
    let photo = await window.fileHandler.getPreviousPhoto();
    document.getElementById('imageDude').src = result + '\\' + photo; 
})

document.getElementById('next-photo').addEventListener('click', async () => {
    let photo = await window.fileHandler.getNextPhoto();
    document.getElementById('imageDude').src = result + '\\' + photo; 
})

// ipcRenderer.on("get-folder-path", (_, folderPath) => {
//     document.getElementById("folder").innerText = folderPath;
// })