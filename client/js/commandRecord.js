document.addEventListener('DOMContentLoaded', async () => {
    const recordList = document.getElementById('record-list');
    try {
        const { records } = await fetchCommandRecords(userId);

        if (records.length === 0) {
            recordList.innerHTML = '<li>No records found</li>';
        } else {
            recordList.innerHTML = records.map(record => `
                <li>
                    <div><strong>Executed At:</strong> ${new Date(record.executedAt).toLocaleString()}</div>
                    <div><strong>Commands:</strong> ${record.commands.join(', ')}</div>
                    <div><strong>Results:</strong> ${record.results.map(res => res.result).join(', ')}</div>
                    <button class="command-hub-button" data-record='${JSON.stringify(record)}'>Add to My commands</button>
                </li>
            `).join('');
        }

        document.querySelectorAll('.command-hub-button').forEach(button => {
            button.addEventListener('click', async (event) => {
                const record = JSON.parse(event.target.dataset.record);
                commandData = {
                    scenario: `run all on ${new Date(record.executedAt).toLocaleString()}`,
                    commands: record.commands
                };
                await createCommand(userId, commandData);
            });
        });
    } catch (error) {
        console.error('Failed to load records:', error);
    }
});
