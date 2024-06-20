const commandInput = document.getElementById('command-input');
const commandList = document.getElementById('command-list');
const runAllButton = document.getElementById('run-all');
let isPushCheckOnly = true;

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

                if (command.startsWith('git push')) {
                    const confirmPush = confirm('We will only check for potential conflicts. To actually push, use the [Run All] button on formal files.')
                    if (!confirmPush) return;
                }
                const listItem = document.createElement('li');
                listItem.textContent = command;
                commandList.appendChild(listItem);
                commandInput.value = '';
                commandExists = true;
                updateRunAllButtonStatus(currentFolderPath, commandExists);

                try {
                    const result = await window.electron.executeGitCommand({ command, folderPath: tempFolderPath, isPushCheckOnly: true });
                    if (result.message) {
                        alert(result.message);
                    } else if (result.conflict) {
                        const conflictLines = result.conflicts.map(conflict => conflict.line).filter(line => line.trim() !== '');
                        if (conflictLines.length > 0) {
                            alert('Conflicts detected:\n' + JSON.stringify(conflictLines, null, 2));
                        } else {
                            alert('No direct conflicts found, but there are differences. Please review.');
                        }
                    }
                    else {
                        console.log('Update git info', result);
                        drawGitGraph(result, 'preview-graph');
                    }

                } catch (error) {
                    console.error('Error executing git command:', error);
                    alert('Error executing git command: ' + error.message);
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
                const commandElement = commandList.children[0];
                const command = commandElement.textContent;
                commandList.removeChild(commandElement);

                if (command.startsWith('git push')) {
                    isPushCheckOnly = false;
                }

                // const isPushCheckOnly = !command.startsWith('git push');

                // const gitInfo = await runAllCommand(command);
                const result = await window.electron.executeGitCommand({ command, folderPath: currentFolderPath, isPushCheckOnly });
                if (result.message) {
                    alert(result.message);
                }
                else {
                    console.log(`Command executed: ${command}`);
                    drawGitGraph(result, 'formal-graph');
                }
            }
            alert('All commands executed successfully!');
        } catch (error) {
            console.error('Error executing commands:', error);
            alert('Error executing commands: ' + error.message);
        } finally {
            updateRunAllButtonStatus();
        }
    });
});

function clearCommandList() {
    while (commandList.firstChild) {
        commandList.removeChild(commandList.firstChild);
    };
};
