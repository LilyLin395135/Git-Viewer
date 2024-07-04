document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const redirectUrl = params.get('redirect');
  const loginLink = document.getElementById('loginLink');
  
  if (redirectUrl) {
    loginLink.href = `login.html?redirect=${encodeURIComponent(redirectUrl)}`;
  } else {
    loginLink.href = 'login.html';
  }

  document.getElementById('registerForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const result = await window.electron.register(email, password);
    if (result.success) {
      localStorage.setItem('userId', result.userId);
      localStorage.setItem('token', result.token);
      alert('Registration successful. Login successfully.');
      window.location.href = redirectUrl || 'git-viewer.html';
    } else {
      alert('Registration failed: ' + result.message);
    }
  });
});
