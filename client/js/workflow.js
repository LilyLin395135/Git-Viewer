let userId = 0;
const URL = 'https://gitviewer.lilylinspace.com';
let lastActiveProjectId = null;  // 記住上次展開的project folder
let lastActiveWorkflowName = null; // 記住上次選擇的workflow name

document.addEventListener('DOMContentLoaded', function () {
    //跳轉登入頁
    userId = localStorage.getItem('userId');
    // userId = 1;
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
    const sidebar = document.querySelector('.workflow-nav');
    try {
        const response = await fetch(`${URL}/api/workflow/user/${userId}`);
        const workflows = await response.json();
        const projects = groupWorkflowsByProject(workflows);
        let listHtml = '<ul class="action-list-wrap">';

        for (const [projectId, details] of Object.entries(projects)) {
            const isLastActive = lastActiveProjectId === projectId;
            listHtml += `
                <li class="project-folder" onclick="toggleWorkflows(this, '${projectId}')">
                    <span>${details.projectFolder}</span>
                </li>
                <div class="workflow-names" style="${isLastActive ? 'display: block;' : 'display: none;'}">`;
            listHtml += `<div data-name="All Workflows" data-project="${projectId}" class="action-list-item ${!lastActiveWorkflowName && isLastActive ? 'active' : ''}">All Workflows</div>`;
            details.uniqueWorkflowNames.forEach(name => {
                listHtml += `<div data-name="${name}" data-project="${projectId}" class="action-list-item ${name === lastActiveWorkflowName && isLastActive ? 'active' : ''}" style="margin-left: 20px;">${name}</div>`;
            });
            listHtml += `</div>`;
        }

        listHtml += '</ul>';
        sidebar.innerHTML = listHtml;

        sidebar.querySelectorAll('div[data-name]').forEach(item => {
            item.addEventListener('click', function () {
                document.querySelectorAll('.sidebar div').forEach(div => div.classList.remove('active'));
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
    let listHtml = `
        <div class="Box Box--responsive mt-3" data-issue-and-pr-hovercards-enabled data-hpc>
            <div class="Box-header d-flex flex-justify-between flex-items-center">
                <div class="flex-auto d-lg-block no-wrap">
                    <div class="table-list-header-toggle states flex-auto">
                        <strong>Workflows</strong>
                    </div>
                </div>
            </div>
            <div class="js-socket-channel js-updatable-content">`;

    workflows.forEach(workflow => {
        listHtml += `
            <div class="Box-row d-table col-12 workflow-row" id="workflow-${workflow.id}">
                <div class="d-table-cell v-align-top col-11 col-md-6 position-relative">
                    <a href="#" class="d-flex flex-items-center width-full mb-1" onclick="showLog(${workflow.id})">
                        ${getStatusIcon(workflow.status)}
                        <span class="workflow-commit text-bold">${workflow.commit_message.replace(/"/g, '')}</span>
                    </a>
                    <span class="d-block text-small color-fg-muted mb-1 mb-md-0">
                        <span class="text-bold">${workflow.workflow_name}</span> #${workflow.id}
                    </span>
                    <span class="color-fg-muted text-small"> Commit ${workflow.commit_hash.substring(0, 5)}</span>
                </div>
                <div class="d-table-cell v-align-middle col-4 pl-2 px-md-3 position-relative">
                    <div class="branch-name css-truncate css-truncate-target my-0 my-md-1 branch-badge" title="${workflow.branch || 'N/A'}">${workflow.branch || 'N/A'}</div>
                </div>
                <div class="d-table-cell v-align-middle col-1 col-md-3 text-small">
                    <div class="d-flex flex-justify-between flex-items-center">
                        <div class="d-md-block">
                            <div class="lh-condensed color-fg-muted my-1 pr-2 pr-md-0">
                                ${formatDate(workflow.start_queue_time)}
                            </div>
                            <div class="lh-condensed color-fg-muted my-1 pr-2 pr-md-0">
                                ${calculateDuration(workflow.start_queue_time, workflow.finish_execute_time)}
                            </div>
                        </div>
                        <div class="text-right">
                        </div>
                    </div>
                </div>
            </div>`;
    });

    listHtml += '</div></div>';
    content.innerHTML = listHtml;
}

function getStatusIcon(status) {
    switch (status) {
        case 0: return '<span class="workflow-status" title="Queued"><svg width="16" height="16" class="octicon queued-icon" viewBox="0 0 16 16" version="1.1" role="img"><circle cx="8" cy="8" r="7" class="queued-circle"/></svg></span>';
        case 1: return '<span class="workflow-status" title="Processing"><svg width="16" height="16" class="octicon processing-icon" viewBox="0 0 16 16" version="1.1" role="img"><circle cx="8" cy="8" r="7" fill="blue"/><circle cx="8" cy="8" r="4" fill="white" class="octicon-anim"/></svg></span>';
        case 2: return '<span class="workflow-status" title="Success"><svg width="16" height="16" class="octicon processing-icon" viewBox="0 0 16 16" version="1.1" role="img"><circle cx="8" cy="8" r="7" fill="blue"/><circle cx="8" cy="8" r="4" fill="white" class="octicon-anim"/></svg></span>';
        case 4: return '<span class="workflow-status" title="Success And Complete"><svg width="16" height="16" class="octicon" viewBox="0 0 16 16" version="1.1" role="img"><circle cx="8" cy="8" r="7" fill="green"/><path d="M6.5 10l-2-2 1.5-1.5L6.5 8l3.5-3.5 1.5 1.5-5 5z" fill="white"/></svg></span>';
        case 3: return '<span class="workflow-status" title="Failure"><svg width="16" height="16" class="octicon" viewBox="0 0 16 16" version="1.1" role="img"><circle cx="8" cy="8" r="7" fill="red"/><path d="M5 5l6 6M11 5l-6 6" stroke="white" stroke-width="1.5"/></svg></span>';
        case 5: return '<span class="workflow-status" title="Complete But Fail"><svg width="16" height="16" class="octicon" viewBox="0 0 16 16" version="1.1" role="img"><circle cx="8" cy="8" r="7" fill="red"/><path d="M5 5l6 6M11 5l-6 6" stroke="white" stroke-width="1.5"/></svg></span>';
        default: return '<span class="workflow-status" title="Unknown"><svg width="16" height="16" class="octicon" viewBox="0 0 16 16" version="1.1" role="img"><circle cx="8" cy="8" r="7" fill="grey"/><text x="8" y="12" text-anchor="middle" font-size="10" fill="white">?</text></svg></span>';
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
    const sidebar = document.querySelector('.workflow-nav');
    sidebar.innerHTML = `<ul><li onclick="goBackToWorkflow(${workflow.id})"> &larr; Back to Workflows</li></ul>`;

    const content = document.querySelector('.content');
    content.innerHTML = `
        <div role="region" aria-label="Workflow run summary" class="workflow-summary js-updatable-content js-socket-channel actions-workflow-stats actions-fullwidth-module color-bg-default Box color-shadow-small mb-3 pb-3 px-3 border border-top-0 border-md-top rounded">
            <div class="p-md-1 d-flex flex-wrap">
                <div class="col mt-md-3 mr-6">
                    <span class="mb-1 d-block text-small color-fg-muted">${daysAgo(workflow.start_queue_time)} days ago</span>
                    <div class="d-flex flex-wrap col-triggered-content flex-items-center color-fg-muted">
                        <a class="Link--primary text-semibold mr-1 no-underline" href="#">${workflow.action}</a>
                        <div class="d-flex flex-items-baseline color-fg-default mr-1">Branch:</div>
                        <a target="_parent" class="branch-name css-truncate css-truncate-target my-0 my-md-1" style="max-width: 200px;" title="${workflow.branch}" href="#">${workflow.branch}</a>
                    </div>
                </div>
                <div class="col-12 d-md-none mt-2 pt-2 border-bottom"></div>
                <div class="col mt-3 mr-3 mr-sm-6 ml-lg-3">
                    <span class="mb-1 d-block text-small color-fg-muted">Status</span>
                    <span class="h4 color-fg-default">${getStatusIcon(workflow.status)}</span>
                </div>
                <div class="col mt-3 mr-3 mr-sm-6 ml-lg-3">
                    <span class="mb-1 d-block text-small color-fg-muted">Total duration</span>
                    <span class="h4 no-underline Link--primary color-fg-default">${calculateDuration(workflow.start_queue_time, workflow.finish_execute_time)}</span>
                </div>
                <div class="col mt-3 mr-3 mr-sm-6 ml-lg-3">
                    <span class="mb-1 d-block text-small color-fg-muted">Execution Time</span>
                    <span class="h4 no-underline Link--primary color-fg-default">${calculateDuration(workflow.start_execute_time, workflow.finish_execute_time)}</span>
                </div>
            </div>
        </div>
        <div role="region" class="workflow-log Box-row terminal-log js-updatable-content js-socket-channel actions-workflow-stats actions-fullwidth-module color-bg-default Box color-shadow-small mb-3 pb-3 px-3 border border-top-0 border-md-top rounded">
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
    return `${Math.floor(diff / 1000)} seconds`;
}
