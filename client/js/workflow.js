document.addEventListener('DOMContentLoaded', function() {
    loadSideBar();
    loadWorkflowList();
});

function loadSideBar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.innerHTML = `
        <ul>
            <li class="active">All Workflows</li>
            <li>Deploy to EC2 on merge</li>
            <li>Trigger automation test on PR</li>
        </ul>
    `;
    sidebar.querySelectorAll('li').forEach(item => {
        item.addEventListener('click', function() {
            document.querySelectorAll('.sidebar li').forEach(li => li.classList.remove('active'));
            this.classList.add('active');
            loadWorkflowList(this.textContent);
        });
    });
}

function loadWorkflowList() {
    const content = document.querySelector('.content');
    content.innerHTML = `
        <div class="workflow-list">
            <!-- Example of list item, should be loaded based on actual data -->
            <div class="workflow-item">
                <span>Status</span>
                <span>Commit message (clickable)</span>
                <span>Workflow name</span>
            </div>
        </div>
    `;
}

// Implement functionality to fetch data from your backend and display it dynamically
