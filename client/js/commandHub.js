document.getElementById('my-commands').addEventListener('click', () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
        alert('You need to log in first.');
        const redirectUrl = encodeURIComponent(window.location.href);
        window.location.href = `login.html?redirect=${redirectUrl}`;
        return;
    }

    window.electron.openCommandsHub();
});