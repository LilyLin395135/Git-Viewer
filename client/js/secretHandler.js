document.addEventListener('DOMContentLoaded', function () {
    //跳轉登入頁
    const userId = localStorage.getItem('userId');
    if (!userId) {
        alert('You need to log in first.');
        const redirectUrl = encodeURIComponent(window.location.href);
        window.location.href = `login.html?redirect=${redirectUrl}`;
        return;
    }
    const newSecretButton = document.getElementById('new-secret');
    const secretModal = document.getElementById('secret-modal');
    const closeSecretModalButton = document.getElementById('close-secret-modal');
    const addSecretButton = document.getElementById('add-secret-button');
    const secretNameInput = document.getElementById('secret-name');
    const secretValueInput = document.getElementById('secret-value');
    const secretsList = document.getElementById('secrets-list');
    // const userId = 1;

    // 模擬的 secrets 資料，可以從 server 獲取
    const secrets = [
        { name: 'SSH_HOST_1', updatedAt: '2024-06-25T01:02:33.000Z' },
        { name: 'SSH_PATH_1', updatedAt: '2024-06-25T01:02:59.000Z' }
    ];

    async function showSecrets() {
        try {
            const response = await fetch(`http://52.5.238.48/api/secret?userId=${userId}`);
            const { secrets } = await response.json();

            secretsList.innerHTML = ''; // 清空列表
            secrets.forEach(secret => {
                const secretItem = document.createElement('div');
                secretItem.classList.add('secret-item');
                secretItem.innerHTML = `
                <div class="secret-name">${secret.name}</div>
                <div class="secret-actions">
                    <button class="button edit-secret" user-id="${userId} data-id="${secret.id}">Edit</button>
                    <button class="button delete-secret" data-id="${userId}">Delete</button>
                </div>
            `;
                secretsList.appendChild(secretItem);
            });

            document.querySelectorAll('.edit-secret').forEach(button => {
                button.addEventListener('click', function () {
                    const secretId = this.getAttribute('data-id');
                    openEditSecretModal(secretId);
                });
            });

            document.querySelectorAll('.delete-secret').forEach(button => {
                button.addEventListener('click', function () {
                    const secretId = this.getAttribute('data-id');
                    deleteSecret(secretId);
                });
            });

        } catch (error) {
            console.error('Error fetching secrets:', error);
        }
    }

    async function deleteSecret(secretId) {
        try {
            const response = await fetch(`http://52.5.238.48/api/secret/${userId}/${secretId}`, {
                method: 'DELETE'

            });
            if (response.status === 200) {
                showSecrets();
            } else {
                console.error('Error deleting secret:', await response.json());
            }
        } catch (error) {
            console.error('Error deleting secret:', error);
        }
    };

    function openSecretModal() {
        secretModal.classList.remove('hidden');
    }

    function closeSecretModal() {
        secretModal.classList.add('hidden');
    }

    async function addSecret() {
        const name = secretNameInput.value.trim();
        const value = secretValueInput.value.trim();
        if (name && value) {
            try {
                const response = await fetch('http://52.5.238.48/api/secret', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ userId: 1, name, value })
                });
                if (response.status === 201) {
                    showSecrets();
                    closeSecretModal();
                } else {
                    alert('Failed to add secret.');
                }
            } catch (error) {
                console.error('Error adding secret:', error);
                alert(`Error adding secret: ${error}`);
            }
        } else {
            alert('Please provide both name and value for the secret.');
        }
    }

    newSecretButton.addEventListener('click', openSecretModal);
    closeSecretModalButton.addEventListener('click', closeSecretModal);
    addSecretButton.addEventListener('click', addSecret);

    showSecrets();
});
