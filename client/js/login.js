const showAlert = async (message) => {
  await window.electron.showAlert(message);
};

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const redirectUrl = params.get('redirect');
  const registerLink = document.getElementById('registerLink');

  // Set default values for the login form
  document.getElementById('email').value = 'user@gmail.com';
  document.getElementById('password').value = 'gitViewer';

  if (redirectUrl) {
    registerLink.href = `register.html?redirect=${encodeURIComponent(redirectUrl)}`;
  } else {
    registerLink.href = 'register.html';
  }

  document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const result = await window.electron.login(email, password);
    if (result.success) {
      localStorage.setItem('userId', result.userId);
      localStorage.setItem('token', result.token);
      showAlert('Login successful');
      window.location.href = redirectUrl || 'git-viewer.html';
    } else {
      showAlert('Login failed: ' + result.message);
    }
  });
});

