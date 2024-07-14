const commandInput = document.getElementById('command-input');
const commandList = document.getElementById('command-list');
const runAllButton = document.getElementById('run-all');
const recordButton = document.getElementById('command-records');
const URL = 'https://gitviewer.lilylinspace.com';

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
        addCommandToList(cmd);
    });
    commandInput.value = localStorage.getItem('currentCommand') || '';
    updateRunAllButtonStatus();
};

const saveCommands = () => {
    const commands = Array.from(commandList.querySelectorAll('li')).map(li => {
        return li.childNodes[0].textContent.trim();
    });
    localStorage.setItem('commands', JSON.stringify(commands));
    localStorage.setItem('currentCommand', commandInput.value);
};

const addCommandToList = (command) => {
    const listItem = document.createElement('li');
    listItem.style.display = 'flex';  // 添加這行以支持彈性盒子
    listItem.style.justifyContent = 'space-between';  // 添加這行以支持內容分佈
    listItem.style.alignItems = 'center';  // 確保項目在垂直方向上居中對齊

    const textNode = document.createTextNode(command);
    listItem.appendChild(textNode);

    const deleteButton = document.createElement('span');
    deleteButton.textContent = ' x';
    deleteButton.className = 'delete-btn';
    deleteButton.onclick = () => {
        listItem.remove();
        saveCommands();
        updateRunAllButtonStatus();
    };

    listItem.appendChild(deleteButton);
    commandList.appendChild(listItem);
};

document.addEventListener('DOMContentLoaded', () => {
    loadCommands();

    commandInput.addEventListener('input', () => {
        localStorage.setItem('currentCommand', commandInput.value);
    });

    commandInput.addEventListener('keydown', async (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            const commands = commandInput.value.trim().split('\n').filter(cmd => cmd.startsWith('git '));

            if (commands.length === 0) {
                alert('Please enter a valid git command.');
                commandInput.focus();
                return;
            }

            if (!folderSelected) {
                alert('Please select a folder first.');
                commandInput.focus();
                return;
            }

            const command = commands[0]; // 取出第一個命令
            // if (command.startsWith('git ')) {

            if (command.startsWith('git push')) {
                const confirmPush = confirm('Git-Viewer will only check for potential conflicts. To actually push, use the [Run All] button on formal files.')
                if (!confirmPush) return;
            }

            addCommandToList(command);
            commandInput.value = commands.slice(1).join('\n'); // 移除已執行的命令

            saveCommands();
            commandExists = true;
            updateRunAllButtonStatus();

            try {
                const result = await window.electron.executeGitCommand({ command, folderPath: tempFolderPath, isPushCheckOnly: true });
                if (result.conflict) {
                    alert('Conflicts detected:\n' + result.conflicts);
                } else {
                    if (result.message) {
                        alert(result.message);
                    }
                    if (result.gitInfo) {
                        console.log('Update git info', result.gitInfo);
                        drawGitGraph(result.gitInfo, 'preview-graph', tempFolderPath);
                    }
                }
            } catch (error) {
                console.error('Error executing git command:', error);
                alert('Error executing git command: ' + error.message);
            }
        } else if (event.key === 'Enter' && event.shiftKey) {
            // 允許 Shift + Enter 插入新行
        }
    });
    // 接收来自 main.js 的 use-command 消息
    window.electron.on('use-command', (event, command) => {
        commandInput.value = command;
    });

    runAllButton.addEventListener('click', async () => {
        const executionResults = [];
        const startTime = new Date().toISOString().slice(0, 19).replace('T', ' ');

        try {
            updatesEnabled = false;
            const commands = Array.from(commandList.children).map(li => {
                return li.childNodes[0].textContent.trim();
            });

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
            }

            while (commandList.children.length > 0) {
                const commandElement = commandList.children[0];
                const command = commandElement.childNodes[0].textContent.trim();
                commandList.removeChild(commandElement);

                if (command.startsWith('git push')) {
                    isPushCheckOnly = false;
                }

                const result = await window.electron.executeGitCommand({ command, folderPath: currentFolderPath, isPushCheckOnly });
                if (result.message) {
                    alert(result.message);
                }
                if (result.gitInfo) {
                    console.log(`Command executed: ${command}`);
                    lastGitInfo = result.gitInfo;
                    localStorage.setItem('gitInfo', JSON.stringify(result.gitInfo));
                    localStorage.setItem('lastGitInfo', JSON.stringify(result.gitInfo));
                    drawGitGraph(result.gitInfo, 'formal-graph', currentFolderPath);
                }
                else if (result.conflict) {
                    alert('Conflicts detected:\n' + result.conflicts);
                }

                executionResults.push({
                    command,
                    result: result.message || result.conflicts || 'Success'
                });

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
            await createCommandRecord({
                userId,
                executedAt: startTime,
                commands,
                results: executionResults
            });
            
            alert('All commands executed successfully!');
        } catch (error) {
            console.error('Error executing commands:', error);
            alert('Error executing commands: ' + error.message);
        } finally {
            updatesEnabled = true;
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