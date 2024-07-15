document.getElementById('new-command').addEventListener('click', () => {
    document.getElementById('new-command-form').classList.remove('hidden');
    document.getElementById('command-list-container').style.display = 'none';
    document.getElementById('command-scenario').value = '';
    document.getElementById('command-commands').value = '';
    document.getElementById('submit-command-button').dataset.commandId = '';
});

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
            commandList.innerHTML = `
            <tr><td colspan="5">
                <div class="no-commands">
                    <p class="Blankslate-Description">No commands created yet</p>
                    <button id="new-command-no-commands" class="button">New Command</button>
                </div>
            </td></tr>`;
            document.querySelector('.command-actions').style.display = 'none';
            // Add event listener for the placeholder button
            document.getElementById('new-command-no-commands').addEventListener('click', () => {
                document.getElementById('new-command-form').classList.remove('hidden');
                document.getElementById('command-list-container').style.display = 'none';
                document.getElementById('command-scenario').value = '';
                document.getElementById('command-commands').value = '';
                document.getElementById('submit-command-button').dataset.commandId = '';
            });
        } else {
            document.querySelector('.command-actions').style.display = 'flex';
            commandList.innerHTML = `
                <tr class="table-header">
                    <th>ID</th>
                    <th>Scenario</th>
                    <th>Commands</th>
                    <th>Usage Count</th>
                    <th>Menu</th>
                </tr>
                ${commands.map(command => `
                    <tr data-command-id="${command.id}">
                        <td>${command.id}</td>
                        <td>${command.scenario}</td>
                        <td class="command-buttons">
                            ${command.commands.map(cmd => `<button class="command-button">${cmd}</button>`).join('')}
                        </td>
                        <td class="center-text">${command.usage_count}</td>
                        <td class="menu-buttons">
                            <button class="use-button">Use</button>
                            <button class="edit-button">Edit</button>
                            <button class="delete-button">Delete</button>
                        </td>
                    </tr>
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
    const listItem = target.closest('tr');
    const commandId = listItem?.dataset.commandId;

    if (target.classList.contains('edit-button')) {
        // 處理編輯指令邏輯
        const scenario = listItem.querySelector('td:nth-child(2)').innerText;
        const commands = Array.from(listItem.querySelectorAll('td:nth-child(3) .command-button')).map(btn => btn.innerText);

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
