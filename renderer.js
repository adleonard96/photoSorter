document.getElementById('open-file').addEventListener('click', async () => {
    await window.fileHandler.open();
})