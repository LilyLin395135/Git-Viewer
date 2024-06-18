document.addEventListener('DOMContentLoaded', () => {
    const commandInput = document.getElementById('command-input');
    const commandList = document.getElementById('command-list');

    commandInput.addEventListener('keydown', async (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            const command = commandInput.value.trim();

            if(!folderSelected){
                alert('Please select a folder first.');
                //顯示 alert 後，輸入框會失去焦點。在顯示 alert 後重新將焦點設置到輸入框。
                commandInput.focus();
                return;
            }

            if (command.startsWith('git ')) {
                const listItem = document.createElement('li');
                listItem.textContent = command;
                commandList.appendChild(listItem);
                commandInput.value = '';

                try{
                    const gitInfo = await window.electron.executeGitCommand({ command, tempFolderPath });
                    console.log('Update git info',gitInfo);
                    drawGitGraph(gitInfo, 'preview-graph');
                } catch(error){
                    console.error('Error executing git command:', error);
                }
            } else {
                alert('Please Enter a valid git command.');
                commandInput.focus();
            }
        };
    })
});