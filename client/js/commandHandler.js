document.addEventListener('DOMContentLoaded', () => {
    const commandInput = document.getElementById('command-input');
    const commandList = document.getElementById('command-list');

    commandInput, addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            const command = commandInput.value.trim();

            if (command.startsWith('git ')) {
                const listItem = document.createElement('li');
                listItem.textContent = command;
                commandList.appendChild(listItem);
                commandInput.value = '';
            } else {
                alert('Please Enter a valid git command.');
            }
        };
    })
});