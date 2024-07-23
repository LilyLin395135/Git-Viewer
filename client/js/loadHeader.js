document.addEventListener('DOMContentLoaded', () => {
  fetch('header.html')
    .then((response) => response.text())
    .then((data) => {
      document.getElementById('header').innerHTML = data;

      const currentPage = window.location.pathname.split('/').pop();
      const links = {
        'git-viewer.html': document.getElementById('link-git-viewer'),
        'workflow.html': document.getElementById('link-workflow'),
        'settings.html': document.getElementById('link-settings')
      };

      if (links[currentPage]) {
        links[currentPage].classList.add('active');
      }
      // 登出按鈕
      document.getElementById('logout-button').addEventListener('click', () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('token');
        window.location.href = 'login.html'; // 假設登出後跳轉到登錄頁面
      });
    });
});