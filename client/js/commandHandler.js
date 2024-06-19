const commandInput = document.getElementById('command-input');
const commandList = document.getElementById('command-list');
const runAllButton = document.getElementById('run-all');

let commandExists = commandList.children.length > 0 ? true : false;
const updateRunAllButtonStatus = (folderPath, commandExists) => {
    if (!folderPath || !commandExists) {
        runAllButton.setAttribute('disabled', true);
    } else {
        runAllButton.removeAttribute('disabled');
    }
};
updateRunAllButtonStatus(currentFolderPath, commandExists);

document.addEventListener('DOMContentLoaded', () => {

    commandInput.addEventListener('keydown', async (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            const command = commandInput.value.trim();

            if (!folderSelected) {
                alert('Please select a folder first.');
                commandInput.focus();
                return;
            }

            if (command.startsWith('git ')) {
                const listItem = document.createElement('li');
                listItem.textContent = command;
                commandList.appendChild(listItem);
                commandInput.value = '';
                commandExists = true;
                updateRunAllButtonStatus(currentFolderPath, commandExists);

                try {
                    const gitInfo = await window.electron.executeGitCommand({ command, folderPath: tempFolderPath });
                    console.log('Update git info', gitInfo);
                    drawGitGraph(gitInfo, 'preview-graph');
                } catch (error) {
                    console.error('Error executing git command:', error);
                }
            } else {
                alert('Please Enter a valid git command.');
                commandInput.focus();
            }
        };
    })
    runAllButton.addEventListener('click', async () => {
        try {
            while (commandList.children.length > 0) {
                const commandElement=commandList.children[0];
                const command = commandElement.textContent;
                commandList.removeChild(commandElement);

                const gitInfo = await runAllCommand(command);

                drawGitGraph(gitInfo, 'formal-graph');
            }
            alert('All commands executed successfully!');
        } catch (error) {
            console.error('Error executing commands:', error);
            alert('Error executing commands: ' + error.message);
        }
    });
});

function clearCommandList() {
    while (commandList.firstChild) {
        commandList.removeChild(commandList.firstChild);
    };
};

async function runAllCommand(command) {
    try {
        const result = await window.electron.executeGitCommand({ command, folderPath: currentFolderPath });
        if (result.error) {
            throw new Error(result.error);
        }
        console.log(`Command executed: ${command}`);
        return result;
    } catch (error) {
        console.error('Error executing git command:', error);
        throw error;
    }
}