document.addEventListener('DOMContentLoaded', () => {
  fetch('header.html')
    .then((response) => response.text())
    .then((data) => {
      document.getElementById('header').innerHTML = data;

      // 確保鏈接的類被添加在 header 內容加載後
      const currentPage = window.location.pathname.split('/').pop();
      const links = {
        'git-viewer.html': document.getElementById('link-git-viewer'),
        'workflow.html': document.getElementById('link-workflow'),
        'settings.html': document.getElementById('link-settings')
      };

      if (links[currentPage]) {
        links[currentPage].classList.add('active');
      }
    });
});