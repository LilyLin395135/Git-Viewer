document.addEventListener('DOMContentLoaded', async () => {
    const recordList = document.getElementById('record-list');
    try {
        const { records } = await fetchCommandRecords(userId);

        if (records.length === 0) {
            recordList.innerHTML = `
            <tr><td colspan="5">
                <div class="no-commands">
                    <p class="Blankslate-Description">No records found</p>
                </div>
            </td></tr>`;
        } else {
            recordList.innerHTML = `
                <tr class="table-header">
                    <th>Executed Time</th>
                    <th>Commands</th>
                    <th>Results</th>
                    <th>My Commands</th>
                </tr>
                ${records.map((record, index) => `
                    <tr data-record-id="${record.id}">
                        <td>${new Date(record.executed_at).toLocaleString()}</td>
                        <td class="command-buttons">
                            ${record.commands.map((cmd, i) => `<div class="command" data-index="${index}-${i}">${cmd}</div>`).join('')}
                        </td>
                        <td>
                            ${record.results.map((res, i) => `<div class="result" data-index="${index}-${i}">${res.result}</div>`).join('')}
                        </td>
                        <td class="menu-buttons">
                            <button class="command-hub-button button" data-record='${JSON.stringify(record)}'>Add</button>
                        </td>
                    </tr>
                `).join('')}
            `;
        }

        document.querySelectorAll('.command-hub-button').forEach(button => {
            button.addEventListener('click', async (event) => {
                const record = JSON.parse(event.target.dataset.record);
                commandData = {
                    scenario: `run all on ${new Date(record.executedAt).toLocaleString()}`,
                    commands: record.commands
                };
                try {
                    await createCommand(userId, commandData);
                    showAlert('Add to my commands successfully!');
                } catch (error) {
                    console.error('Failed to add command:', error);
                    showAlert('Failed to add command');
                }
            });
        });
        // 添加 hover 效果
        document.querySelectorAll('.command, .result').forEach(element => {
            element.addEventListener('mouseover', () => {
                const [recordIndex, commandIndex] = element.dataset.index.split('-');
                document.querySelectorAll(`[data-index="${recordIndex}-${commandIndex}"]`).forEach(el => el.classList.add('hover'));
            });

            element.addEventListener('mouseout', () => {
                const [recordIndex, commandIndex] = element.dataset.index.split('-');
                document.querySelectorAll(`[data-index="${recordIndex}-${commandIndex}"]`).forEach(el => el.classList.remove('hover'));
            });
        });
    } catch (error) {
        console.error('Failed to load records:', error);
    }
});
