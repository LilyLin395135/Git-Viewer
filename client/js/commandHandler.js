const commandInput = document.getElementById('command-input');
const commandList = document.getElementById('command-list');

document.addEventListener('DOMContentLoaded', () => {

    commandInput.addEventListener('keydown', async (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            const command = commandInput.value.trim();

            if(!folderSelected){
                alert('Please select a folder first.');
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

function clearCommandList(){
    while(commandList.firstChild){
        commandList.removeChild(commandList.firstChild);
    };
};