
// const { ipcRenderer } = require("electron/renderer");
let result;

document.getElementById('open-file').addEventListener('click', async () => {
    result = await window.fileHandler.open();
    document.getElementById('folder').innerHTML = result;
    let firstPhoto = await window.fileHandler.getFirstPhoto(result);
    document.getElementById('imageDude').src = result + '\\' + firstPhoto;
})

document.getElementById('previous-photo').addEventListener('click', async () => {
    let photo = await window.fileHandler.getPreviousPhoto();
    document.getElementById('imageDude').src = result + '\\' + photo;
})

document.getElementById('next-photo').addEventListener('click', async () => {
    let photo = await window.fileHandler.getNextPhoto();
    document.getElementById('imageDude').src = result + '\\' + photo;
    let checkedElements = [];
    document.querySelectorAll('input:checked').forEach((element) => {
        checkedElements.push(element.value);
    })
    for(let element of checkedElements){
        document.getElementById(element).checked = false;
    }
    
})

// const fileHandler = require("./fileHandler");
document.getElementById('photo-grouping-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    let inputVal = document.getElementById('photo-grouping-input').value;
    let currentFolder = document.getElementById('folder').textContent;
    await window.fileHandler.addSortOption(inputVal, currentFolder);
    document.getElementById('photo-grouping-input').value = '';
    document.getElementById('sort-options').innerHTML = document.getElementById('sort-options').innerHTML + `<label><input type="checkbox" id="${inputVal}" value="${inputVal}" name="sorting-values"/>${inputVal}</label>`
})
// ipcRenderer.on("get-folder-path", (_, folderPath) => {
//     document.getElementById("folder").innerText = folderPath;
// })