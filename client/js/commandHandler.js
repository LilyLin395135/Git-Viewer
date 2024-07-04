const commandInput = document.getElementById('command-input');
const commandList = document.getElementById('command-list');
const runAllButton = document.getElementById('run-all');
const URL = 'http://52.5.238.48';
const userId = 1;

let isPushCheckOnly = true;
let commandExists = commandList.children.length > 0;

const updateRunAllButtonStatus = () => {
    if (commandList.children.length > 0) {
        runAllButton.removeAttribute('disabled');
    } else {
        runAllButton.setAttribute('disabled', true);
    }
};

const loadCommands = () => {
    const commands = JSON.parse(localStorage.getItem('commands') || '[]');
    commands.forEach(cmd => {
        const listItem = document.createElement('li');
        listItem.textContent = cmd;
        commandList.appendChild(listItem);
    });
    commandInput.value = localStorage.getItem('currentCommand') || '';
    updateRunAllButtonStatus();
};

const saveCommands = () => {
    const commands = Array.from(commandList.querySelectorAll('li')).map(li => li.textContent);
    localStorage.setItem('commands', JSON.stringify(commands));
    localStorage.setItem('currentCommand', commandInput.value);
};

document.addEventListener('DOMContentLoaded', () => {
    loadCommands();

    commandInput.addEventListener('input', () => {
        localStorage.setItem('currentCommand', commandInput.value);
    });

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
                    const confirmPush = confirm('Git-Viewer will only check for potential conflicts. To actually push, use the [Run All] button on formal files.')
                    if (!confirmPush) return;
                }
                const listItem = document.createElement('li');
                listItem.textContent = command;
                commandList.appendChild(listItem);
                commandInput.value = '';
                saveCommands();
                commandExists = true;
                updateRunAllButtonStatus();

                try {
                    const result = await window.electron.executeGitCommand({ command, folderPath: tempFolderPath, isPushCheckOnly: true });
                    if (result.message) {
                        alert(result.message);
                    } else if (result.conflict) {
                        alert('Conflicts detected:\n' + result.conflicts);
                    } else {
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
            const commands = Array.from(commandList.children).map(li => li.textContent);

            //檢查每個命令是否符合觸發點
            const eventsTriggered = new Set(await window.electron.checkWorkflows(commands, currentFolderPath));

            const userId = localStorage.getItem('userId');
            const rootDir = await window.electron.findGitRoot(currentFolderPath);
            const yamlFiles = await window.electron.findYmlFiles(rootDir);

            if (yamlFiles.length > 0 && !userId) {
                const loginConfirmed = confirm('You need to log in to trigger yml files for automation. Do you want to log in now?');
                if (loginConfirmed) {
                    const redirectUrl = encodeURIComponent(window.location.href);
                    window.location.href = `login.html?redirect=${redirectUrl}`;
                    return;
                }
                // else {
                //     alert('You need to log in to execute the workflows.');
                //     return;
                // }
            }

            while (commandList.children.length > 0) {
                const commandElement = commandList.children[0];
                const command = commandElement.textContent;
                commandList.removeChild(commandElement);

                if (command.startsWith('git push')) {
                    isPushCheckOnly = false;
                }

                const result = await window.electron.executeGitCommand({ command, folderPath: currentFolderPath, isPushCheckOnly });
                if (result.message) {
                    alert(result.message);
                } else if (result.conflict) {
                    alert('Conflicts detected:\n' + result.conflicts);
                } else {
                    console.log(`Command executed: ${command}`);
                    lastGitInfo = result;
                    localStorage.setItem('gitInfo', JSON.stringify(result));
                    localStorage.setItem('lastGitInfo', JSON.stringify(result));// 更新 localStorage 中的 lastGitInfo
                    drawGitGraph(result, 'formal-graph');
                }

                if (command.startsWith('git')) {
                    const [_, mainCommand] = command.split(' ');
                    const eventTriggered = mainCommand.toLowerCase();
                    if (eventsTriggered.has(eventTriggered)) {
                        //未登入無法執行workflow
                        if (!userId) {
                            alert('You need to log in to execute the workflows.');
                            return;
                        }

                        const workflowResults = await window.electron.triggerWorkflows(userId, eventTriggered, currentFolderPath);

                        if (Array.isArray(workflowResults)) {
                            const failureSteps = workflowResults.filter(result => result.status === 'failure');
                            if (failureSteps.length > 0) {
                                alert(`Step "${failureSteps[0].step}" failed: ${failureSteps[0].error}`);
                                return;
                            }
                        } else if (workflowResults.message) {
                            alert(workflowResults.message);
                        }
                        if (workflowResults.workflowId) {
                            startPolling(workflowResults.workflowId);
                        }
                    }
                }
            }
            alert('All commands executed successfully!');
        } catch (error) {
            console.error('Error executing commands:', error);
            alert('Error executing commands: ' + error.message);
        } finally {
            updateRunAllButtonStatus();
        }
        localStorage.removeItem('commands');
        clearCommandList();
    });
});

function clearCommandList() {
    while (commandList.firstChild) {
        commandList.removeChild(commandList.firstChild);
    }
    updateRunAllButtonStatus();
}

// 開始輪詢工作流狀態
function startPolling(workflowId) {
    const intervalId = setInterval(async () => {
        const response = await fetch(`${URL}/api/workflow/workflow/${workflowId}`);
        const workflow = await response.json();

        if (workflow.status === 1) {
            console.log("Starting the workflow");
        } else if (workflow.status === 2 || workflow.status === 4) {
            clearInterval(intervalId);  // 停止輪詢
            const statusMessage = "Workflow executed successfully.";
            console.log(statusMessage);

            // 彈出提示並詢問用戶是否要導航到日誌頁面
            if (confirm(`${statusMessage} Would you like to view the log?`)) {
                goToLogPage(workflowId);
            }
        } else if (workflow.status === 3 || workflow.status === 5) {
            clearInterval(intervalId);  // 停止輪詢
            const statusMessage = "Workflow execution failed.";
            console.log(statusMessage);

            // 彈出提示並詢問用戶是否要導航到日誌頁面
            if (confirm(`${statusMessage} Would you like to view the log?`)) {
                goToLogPage(workflowId);
            }
        }
    }, 1000); // 每秒輪詢一次
}

// 導航到日誌頁面
function goToLogPage(workflowId) {
    window.location.href = `workflow.html?workflowId=${workflowId}`;
}