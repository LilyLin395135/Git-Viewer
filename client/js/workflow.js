let userId = 0;
const URL = 'http://52.5.238.48';
let lastActiveProjectId = null;  // 記住上次展開的project folder
let lastActiveWorkflowName = null; // 記住上次選擇的workflow name

document.addEventListener('DOMContentLoaded', function () {
    //跳轉登入頁
    userId = localStorage.getItem('userId');
    if (!userId) {
        alert('You need to log in first.');
        const redirectUrl = encodeURIComponent(window.location.href);
        window.location.href = `login.html?redirect=${redirectUrl}`;
        return;
    }
    const urlParams = new URLSearchParams(window.location.search); // 若有workflowId就到log頁
    const workflowId = urlParams.get('workflowId');

    if (workflowId) {
        fetchWorkflowDetails(workflowId);  // Fetch details if workflowId is present
    } else {
        loadSideBar();
        loadWorkflowList(lastActiveWorkflowName || 'All Workflows', lastActiveProjectId);
    }
});

function fetchWorkflowDetails(workflowId) {
    showLog(workflowId);
}

async function loadSideBar() {
    const sidebar = document.querySelector('.sidebar');
    try {
        const response = await fetch(`${URL}/api/workflow/user/${userId}`);
        const workflows = await response.json();
        const projects = groupWorkflowsByProject(workflows);
        let listHtml = '<ul>';

        for (const [projectId, details] of Object.entries(projects)) {
            const isLastActive = lastActiveProjectId === projectId;
            listHtml += `
                <li class="project-folder" onclick="toggleWorkflows(this, '${projectId}')">
                    <span>${details.projectFolder}</span>
                </li>
                <div class="workflow-names" style="${isLastActive ? 'display: block;' : 'display: none;'}">`;
            listHtml += `<li data-name="All Workflows" data-project="${projectId}" class="${!lastActiveWorkflowName && isLastActive ? 'active' : ''}">All Workflows</li>`;
            details.uniqueWorkflowNames.forEach(name => {
                listHtml += `<li data-name="${name}" data-project="${projectId}" class="${name === lastActiveWorkflowName && isLastActive ? 'active' : ''}" style="margin-left: 20px;">${name}</li>`;
            });
            listHtml += `</div>`;
        }

        listHtml += '</ul>';
        sidebar.innerHTML = listHtml;

        sidebar.querySelectorAll('li[data-name]').forEach(item => {
            item.addEventListener('click', function () {
                document.querySelectorAll('.sidebar li').forEach(li => li.classList.remove('active'));
                this.classList.add('active');
                lastActiveWorkflowName = this.dataset.name;
                lastActiveProjectId = this.dataset.project;
                loadWorkflowList(this.dataset.name, this.dataset.project);
            });
        });
    } catch (error) {
        console.error('Failed to load workflow names:', error);
        sidebar.innerHTML = '<p>Error loading workflow names.</p>';
    }
}

function toggleWorkflows(element, projectId) {
    const workflowNames = element.nextElementSibling;
    workflowNames.style.display = workflowNames.style.display === 'none' ? 'block' : 'none';
    lastActiveProjectId = workflowNames.style.display === 'block' ? projectId : null;
}

function groupWorkflowsByProject(workflows) {
    const projects = {};
    workflows.forEach(workflow => {
        if (!projects[workflow.project_id]) {
            projects[workflow.project_id] = { projectFolder: workflow.project_folder, workflows: [], uniqueWorkflowNames: new Set() };
        }
        projects[workflow.project_id].workflows.push(workflow);
        projects[workflow.project_id].uniqueWorkflowNames.add(workflow.workflow_name);
    });
    return projects;
}

async function loadWorkflowList(workflowName = 'All Workflows', projectId = null) {
    const content = document.querySelector('.content');
    try {
        const response = await fetch(`${URL}/api/workflow/user/${userId}`);
        const data = await response.json();
        let filteredWorkflows = data;
        if (projectId) {
            filteredWorkflows = filteredWorkflows.filter(workflow => workflow.project_id.toString() === projectId);
        }
        if (workflowName !== 'All Workflows') {
            filteredWorkflows = filteredWorkflows.filter(workflow => workflow.workflow_name === workflowName);
        }
        displayWorkflows(filteredWorkflows, content);
    } catch (error) {
        console.error('Failed to fetch workflows:', error);
        content.innerHTML = '<p>Error loading workflows.</p>';
    }
}

function displayWorkflows(workflows, content) {
    let listHtml = '<div class="workflow-list">';
    workflows.forEach(workflow => {
        listHtml += `
            <div class="workflow-item" id="workflow-${workflow.id}">
                <span class="workflow-status">${getStatusIcon(workflow.status)}</span>
                <span class="workflow-commit" onclick="showLog(${workflow.id})">${workflow.commit_message}</span>
                <div>
                    <span>${workflow.workflow_name} (#${workflow.id})</span>
                    <span>${workflow.commit_hash}</span>
                </div>
                <div>
                    <span>Branch: ${workflow.branch || 'N/A'}</span>
                    <span>Started: ${formatDate(workflow.start_queue_time)}</span>
                    <span>Duration: ${calculateDuration(workflow.start_queue_time, workflow.finish_execute_time)}</span>
                </div>
            </div>`;
    });
    listHtml += '</div>';
    content.innerHTML = listHtml;
}

function getStatusIcon(status) {
    switch (status) {
        case 0: return 'Queued';
        case 1: return 'Processing';
        case 2: return 'Success';
        case 3: return 'Failure';
        case 4: return 'SuccessAndComplete';
        case 5: return 'CompleteButFail';
        default: return 'Unknown';
    }
}

function showLog(workflowId) {
    // 先取得當前的workflow狀態，以决定是否開始輪詢
    fetch(`${URL}/api/workflow/workflow/${workflowId}`)
        .then(response => response.json())
        .then(workflow => {
            if (workflow.status === 2) {  // 只有在狀態為2時才開始輪詢
                startPolling(workflowId);
            }
            updateLogContent(workflow); // 無論如何都更新一次log顯示
        })
        .catch(error => {
            console.error('Failed to fetch initial workflow details:', error);
        });
}

function startPolling(workflowId) {
    const intervalId = setInterval(() => {
        fetch(`${URL}/api/workflow/workflow/${workflowId}`)
            .then(response => response.json())
            .then(workflow => {
                updateLogContent(workflow);
                if (workflow.status === 4 || workflow.status === 5) {
                    clearInterval(intervalId);  // 如果狀態為4或5，停止輪詢
                }
            })
            .catch(error => {
                console.error('Error polling workflow details:', error);
                clearInterval(intervalId);  // 出錯也應停止輪詢
            });
    }, 1000); // 每秒輪詢一次
}

function updateLogContent(workflow) {
    const sidebar = document.querySelector('.sidebar');
    sidebar.innerHTML = `<ul><li onclick="goBackToWorkflow(${workflow.id})">Back to Workflows</li></ul>`;

    const content = document.querySelector('.content');
    content.innerHTML = `
        <div class="workflow-summary">
            <div>
                <span>${daysAgo(workflow.start_queue_time)} days ago</span>
                <span>Action: ${workflow.action}, Branch: ${workflow.branch}</span>
            </div>
            <div>
                <span>Status: ${getStatusIcon(workflow.status)}</span>
            </div>
            <div>
                <span>Duration: ${calculateDuration(workflow.start_queue_time, workflow.finish_execute_time)}</span>
            </div>
            <div>
                <span>Execution Time: ${calculateDuration(workflow.start_execute_time, workflow.finish_execute_time)}</span>
            </div>
        </div>
        <div class="workflow-log">
            <pre>${workflow.log}</pre>
        </div>
    `;
}

async function goBackToWorkflow(workflowId) {
    loadSideBar();  // Reload the sidebar
    await loadWorkflowList();  // Load the list and ensure it completes
    const element = document.querySelector(`#workflow-${workflowId}`);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else {
        console.error('Element not found:', `#workflow-${workflowId}`);
    }
}

function daysAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const difference = now.getTime() - date.getTime();
    return Math.floor(difference / (1000 * 3600 * 24));
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
}

function calculateDuration(startTime, endTime) {
    if (!endTime) return 'Running';
    const start = new Date(startTime);
    const end = new Date(endTime);
    const diff = end - start;
    return `${Math.floor(diff / 60000)} minutes`;
}
