const URL = 'http://52.5.238.48'; // http://localhost:3000

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
    const newSecretButtonAlt = document.getElementById('new-secret-alt');
    const secretNameInput = document.getElementById('secret-name');
    const secretValueInput = document.getElementById('secret-value');
    const secretsList = document.getElementById('secrets-list');
    const noSecretsMessage = document.getElementById('no-secrets');
    const secretsBody = document.getElementById('secrets-body');
    const newSecretForm = document.getElementById('new-secret-form');
    const secretForm = document.getElementById('secret-form');
    const closeSecretButton = document.getElementById('close-secret-button');

    let isEditing = false;
    let editingSecretId = null;

    const savedFormState = JSON.parse(localStorage.getItem('newSecretFormState'));

    if (savedFormState) {
        openSecretForm();
        secretNameInput.value = savedFormState.name;
        secretValueInput.value = savedFormState.value;
        isEditing = savedFormState.isEditing;
        editingSecretId = savedFormState.editingSecretId;
    } else {
        showSecrets();
    }

    async function showSecrets() {
        try {
            const response = await fetch(`${URL}/api/secret?userId=${userId}`);
            const { secrets } = await response.json();

            // 先清空列表
            secretsBody.innerHTML = '';

            if (secrets.length === 0) {
                noSecretsMessage.style.display = 'block';
                secretsList.style.display = 'none';
            } else {
                noSecretsMessage.style.display = 'none';
                secretsList.style.display = 'block';
                secrets.forEach(secret => {
                    const secretRow = document.createElement('tr');
                    secretRow.classList.add('TableRow');
                    secretRow.innerHTML = `
                        <td class="TableCell">${secret.name}</td>
                        <td class="TableCell" data-cell-align="end">
                            <button class="button edit-secret" data-id="${secret.id}">Edit</button>
                            <button class="button delete-secret" data-id="${secret.id}">Delete</button>
                        </td>
                    `;
                    secretsBody.appendChild(secretRow);
                });

                setupEditAndDeleteButtons();
            }
        } catch (error) {
            console.error('Error fetching secrets:', error);
        }
    }

    function setupEditAndDeleteButtons() {
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
    }

    function saveFormState() {
        const formState = {
            name: secretNameInput.value.trim(),
            value: secretValueInput.value.trim(),
            isEditing: isEditing,
            editingSecretId: editingSecretId
        };
        localStorage.setItem('newSecretFormState', JSON.stringify(formState));
    }

    function deleteFormState() {
        localStorage.removeItem('newSecretFormState');
    }

    async function deleteSecret(secretId) {
        try {
            const response = await fetch(`${URL}/api/secret/${userId}/${secretId}`, {
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

    function openSecretForm() {
        isEditing = false;
        editingSecretId = null;
        newSecretForm.classList.remove('hidden');
        secretsList.style.display = 'none';
        noSecretsMessage.style.display = 'none';
        secretNameInput.value = '';  // 清除名稱輸入欄位的值
        secretValueInput.value = '';  // 清除值輸入欄位的值
    }

    function openEditSecretModal(secretId) {
        isEditing = true;
        editingSecretId = secretId;
        const secretRow = document.querySelector(`.edit-secret[data-id="${secretId}"]`).closest('tr');
        const secretName = secretRow.querySelector(`.TableCell`).innerText;

        secretNameInput.value = secretName;
        secretValueInput.value = ''; //不帶入資料

        newSecretForm.classList.remove('hidden');
        secretsList.style.display = 'none';
        noSecretsMessage.style.display = 'none';
    }

    function closeSecretForm() {
        newSecretForm.classList.add('hidden');
        secretsList.style.display = 'block';
        deleteFormState();
        showSecrets()
    }

    async function addSecret(event) {
        event.preventDefault();
        const name = secretNameInput.value.trim();
        const value = secretValueInput.value.trim();
        if (name && value) {
            try {
                const response = await fetch(`${URL}/api/secret`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ userId, name, value })
                });
                if (response.status === 201) {
                    showSecrets();
                    closeSecretForm();
                    deleteFormState();
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

    async function updateSecret(event) {
        event.preventDefault();
        const name = secretNameInput.value.trim();
        const value = secretValueInput.value.trim();
        if (name && value) {
            try {
                const response = await fetch(`${URL}/api/secret/${editingSecretId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name, value })
                });
                if (response.status === 200) {
                    showSecrets();
                    closeSecretForm();
                    deleteFormState();
                } else {
                    alert('Failed to update secret.');
                }
            } catch (error) {
                console.error('Error updating secret:', error);
                alert(`Error updating secret: ${error}`);
            }
        } else {
            alert('Please provide both name and value for the secret.');
        }
    }

    newSecretButton.addEventListener('click', openSecretForm);
    newSecretButtonAlt.addEventListener('click', openSecretForm);
    closeSecretButton.addEventListener('click', closeSecretForm);
    secretForm.addEventListener('submit', function (event) {
        if (isEditing) {
            updateSecret(event);
        } else {
            addSecret(event);
        }
    });
    // 保存表單狀態
    secretNameInput.addEventListener('input', saveFormState);
    secretValueInput.addEventListener('input', saveFormState);
});
