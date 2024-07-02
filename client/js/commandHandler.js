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
            // const triggerEvents = new Set();

            //檢查每個命令是否符合觸發點
            const eventsTriggered = new Set(await window.electron.checkWorkflows(commands, currentFolderPath));
            // const checkWorkflowsResult = await window.electron.checkWorkflows(commands, currentFolderPath);
            // checkWorkflowsResult.forEach(event => triggerEvents.add(event));

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
                    drawGitGraph(result, 'formal-graph');
                }

                //如果命令符合觸發點，立即觸發工作流
                if (command.startsWith('git')) {
                    const [_, mainCommand] = command.split(' ');
                    const eventTriggered = mainCommand.toLowerCase();
                    if (eventsTriggered.has(eventTriggered)) {
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
        // localStorage.removeItem('currentCommand');
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
    // Electron的分頁跳轉，如果在web環境中，則使用location.href
    // 假設您有一個指向日誌頁面的路由設定
    window.location.href = `workflow.html?workflowId=${workflowId}`;
    // 如果在 Electron 中，您可能需要使用 Electron 的 shell 或 IPC 通信來處理路由跳轉
}