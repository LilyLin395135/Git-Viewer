const URL = 'http://localhost:3000/api/commandHub';//'https://gitviewer.lilylinspace.com/api/commandHub';
// const userId = localStorage.getItem('userId'); // 從 localStorage 獲取用戶ID
const userId = 1;

// API 函數
async function fetchCommands(userId) {
    const response = await fetch(`${URL}/user/${userId}/commands`);
    if (!response.ok) {
        throw new Error('Failed to fetch commands');
    }
    return response.json();
}

async function createCommand(userId, command) {
    const response = await fetch(`${URL}/user/${userId}/commands`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(command)
    });
    if (!response.ok) {
        throw new Error('Failed to create command');
    }
    return response.json();
}

async function updateCommand(userId, commandId, updatedCommand) {
    const response = await fetch(`${URL}/user/${userId}/commands/${commandId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedCommand)
    });
    if (!response.ok) {
        throw new Error('Failed to update command');
    }
    return response.json();
}

async function deleteCommand(userId, commandId) {
    const response = await fetch(`${URL}/user/${userId}/commands/${commandId}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        throw new Error('Failed to delete command');
    }
    return response.json();
}

// 事件處理
document.getElementById('new-command').addEventListener('click', () => {
    document.getElementById('new-command-form').classList.remove('hidden');
    document.getElementById('command-list-container').style.display = 'none';
    document.getElementById('command-scenario').value = '';
    document.getElementById('command-commands').value = '';
    document.getElementById('submit-command-button').dataset.commandId = '';
});

// document.getElementById('back-to-list').addEventListener('click', () => {
//     document.getElementById('command-details-container').style.display = 'none';
//     document.getElementById('command-list-container').style.display = 'block';
// });

document.getElementById('submit-command-button').addEventListener('click', async (event) => {
    event.preventDefault();
    const scenario = document.getElementById('command-scenario').value.trim();
    const commands = document.getElementById('command-commands').value.trim().split('\n');
    const commandId = event.target.dataset.commandId;

    if (scenario && commands.length > 0) {
        const commandData = { scenario, commands };

        try {
            if (commandId) {
                await updateCommand(userId, commandId, commandData);
            } else {
                await createCommand(userId, commandData);
            }
            document.getElementById('new-command-form').classList.add('hidden');
            document.getElementById('command-list-container').style.display = 'block';
            await loadCommands(); // 重新加载指令列表
        } catch (error) {
            console.error('Failed to save command:', error);
        }
    } else {
        alert('Please provide a scenario and at least one command.');
    }
});

document.getElementById('close-command-button').addEventListener('click', () => {
    document.getElementById('new-command-form').classList.add('hidden');
    document.getElementById('command-list-container').style.display = 'block';
});

async function loadCommands() {
    try {
        const { commands } = await fetchCommands(userId);
        const commandList = document.getElementById('command-list');

        if (!Array.isArray(commands) || commands.length === 0) {
            commandList.innerHTML = '<li>No commands found</li>';
        } else {
            commandList.innerHTML = `
                <li class="table-header">
                    <div>ID</div>
                    <div>Scenario</div>
                    <div>Commands</div>
                    <div>Usage Count</div>
                    <div>Menu</div>
                </li>
                ${commands.map(command => `
                    <li data-command-id="${command.id}">
                        <div>${command.id}</div>
                        <div>${command.scenario}</div>
                        <div>
                            ${command.commands.map(cmd => `<button class="command-button">${cmd}</button>`).join('')}
                        </div>
                        <div>${command.usage_count}</div>
                        <div class="menu-buttons">
                            <button class="edit-button">Edit</button>
                            <button class="delete-button">Delete</button>
                            <button class="use-button">Use</button>
                        </div>
                    </li>
                `).join('')}
            `;
        }
    } catch (error) {
        console.error('Failed to load commands:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadCommands);

document.getElementById('command-list').addEventListener('click', async (event) => {
    const target = event.target;
    const listItem = target.closest('li');
    const commandId = listItem?.dataset.commandId;

    if (target.classList.contains('edit-button')) {
        // 處理編輯指令邏輯
        const scenario = listItem.querySelector('div:nth-child(2)').innerText;
        const commands = Array.from(listItem.querySelectorAll('div:nth-child(3) .command-button')).map(btn => btn.innerText);

        document.getElementById('command-scenario').value = scenario;
        document.getElementById('command-commands').value = commands.join('\n');
        document.getElementById('submit-command-button').dataset.commandId = commandId;

        document.getElementById('new-command-form').classList.remove('hidden');
        document.getElementById('command-list-container').style.display = 'none';
    } else if (target.classList.contains('delete-button')) {
        // 处理删除指令逻辑
        try {
            await deleteCommand(userId, commandId);
            await loadCommands(); // 重新加载指令列表
        } catch (error) {
            console.error('Failed to delete command:', error);
        }
    } else if (target.classList.contains('use-button')) {
        // 处理使用指令逻辑
        try {
            const { commands } = await fetchCommands(userId);
            const command = commands.find(cmd => cmd.id == commandId);
            if (command) {
                window.electron.useCommand(command.commands.join('\n'));
            }
        } catch (error) {
            console.error('Failed to use command:', error);
        }
    } else if (target.classList.contains('command-button')) {
        // 处理复制指令逻辑
        const command = target.innerText;
        navigator.clipboard.writeText(command).then(() => {
            alert('Command copied to clipboard');
        }).catch(err => {
            console.error('Failed to copy command:', err);
        });
    }
});
