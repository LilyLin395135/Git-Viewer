document.getElementById('open-folder').addEventListener('click', async () => {
  try {
    const result = await window.electron.openFolder();
    if (result) {
      console.log('Selected folder:', result.folderPath);
      console.log('Contains .git:', result.gitExists);
    }
  } catch (error) {
    console.error('Error opening folder:', error);
  }
});
