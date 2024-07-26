// const showAlert = async (message) => {
//     await window.electron.showAlert(message);
// };

document.getElementById('my-commands').addEventListener('click', () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
        showAlert('You need to log in first.');
        const redirectUrl = encodeURIComponent(window.location.href);
        window.location.href = `login.html?redirect=${redirectUrl}`;
        return;
    }

    window.electron.openCommandHub();
});

document.getElementById('command-record').addEventListener('click', () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
        showAlert('You need to log in first.');
        const redirectUrl = encodeURIComponent(window.location.href);
        window.location.href = `login.html?redirect=${redirectUrl}`;
        return;
    }

    window.electron.openCommandRecord();
});