// const { ipcRenderer } = require("electron/renderer");


document.getElementById('open-file').addEventListener('click', async () => {
    let result = await window.fileHandler.open();
    document.getElementById('folder').innerHTML = result;
    let firstPhoto = await window.fileHandler.getFirstPhoto(result);
    document.getElementById('imageDude').src = result+'\\' + firstPhoto;
})

// ipcRenderer.on("get-folder-path", (_, folderPath) => {
//     document.getElementById("folder").innerText = folderPath;
// })