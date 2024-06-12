document.getElementById('open-folder').addEventListener('click', async () => {
  const result = await window.electron.openFolder();
  if (result) {
    console.log('Selected folder:', result.folderPath);
    console.log('Contains .git:', result.gitExists);
  }
});
