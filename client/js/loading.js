function showLoading() {
    const loadingDiv = document.createElement('div');
    loadingDiv.id = 'loading';
    loadingDiv.innerHTML = `
      <div align="center" class="cssload-fond">
        <div class="cssload-container-general">
          <div class="cssload-internal"><div class="cssload-ballcolor cssload-ball_1"></div></div>
          <div class="cssload-internal"><div class="cssload-ballcolor cssload-ball_2"></div></div>
          <div class="cssload-internal"><div class="cssload-ballcolor cssload-ball_3"></div></div>
          <div class="cssload-internal"><div class="cssload-ballcolor cssload-ball_4"></div></div>
        </div>
      </div>
    `;
    document.body.appendChild(loadingDiv);
}

function hideLoading() {
    const loadingDiv = document.getElementById('loading');
    if (loadingDiv) {
        document.body.removeChild(loadingDiv);
    }
}