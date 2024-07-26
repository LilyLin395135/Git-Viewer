const commandHubURL = 'https://gitviewer.lilylinspace.com/api/commandHub';//'http://localhost:3000/api/commandHub';
const commandRecordURL = 'https://gitviewer.lilylinspace.com/api/commandRecords';//'http://localhost:3000/api/commandRecords';
const userId = localStorage.getItem('userId'); // 從 localStorage 獲取用戶ID
// const userId = 1;

const showAlert = async (message) => {
    await window.electron.showAlert(message);
};

// 指令集 API
async function fetchCommands(userId) {
    const response = await fetch(`${commandHubURL}/user/${userId}/commands`);
    if (!response.ok) {
        throw new Error('Failed to fetch commands');
    }
    return response.json();
}

async function createCommand(userId, command) {
    const response = await fetch(`${commandHubURL}/user/${userId}/commands`, {
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
    const response = await fetch(`${commandHubURL}/user/${userId}/commands/${commandId}`, {
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
    const response = await fetch(`${commandHubURL}/user/${userId}/commands/${commandId}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        throw new Error('Failed to delete command');
    }
    return response.json();
}

// 執行指令記錄 API
async function fetchCommandRecords(userId) {
    const response = await fetch(`${commandRecordURL}/user/${userId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch command records');
    }
    return response.json();
}

async function createCommandRecord(record) {
    const response = await fetch(`${commandRecordURL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(record)
    });
    if (!response.ok) {
        throw new Error('Failed to create command record');
    }
    return response.json();
}