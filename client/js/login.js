document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const redirectUrl = params.get('redirect');
  const registerLink = document.getElementById('registerLink');

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
      alert('Login successful');
      window.location.href = redirectUrl || 'git-viewer.html';
    } else {
      alert('Login failed: ' + result.message);
    }
  });
});

