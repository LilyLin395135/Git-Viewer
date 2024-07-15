document.addEventListener('DOMContentLoaded', () => {
  const newWorkflowBtn = document.querySelector('.new-workflow-btn');
  newWorkflowBtn.addEventListener('click', (event) => {
    event.preventDefault();
    showModal();
  });

  function showModal() {
    const modal = document.createElement('div');
    modal.id = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
       <button id="close-modal-top" class="close-button">Close</button>
          <h1>User Guide: How to Use Git Viewer's Service to Execute YAML Workflows</h1>
          <h2>Step 1</h2>
          <p>In the root folder of your project (where .git is located), create a .gitviewer folder.</p>
          <img src="assets/Guide1-gitviewer-folder.jpg" alt="Guide1-gitviewer-folder" class="guide-image">
          <h2>Step 2</h2>
          <p>In the .gitviewer folder, create a .yml file.</p>
          <img src="assets/Guide1-yml-file.jpg" alt="Guide1-gitviewer-folder" class="guide-image">
          <h3>YML Example 1: Running Tests on Merge or Pull Request</h3>
          <pre class="code-block"><code>
name: Run tests on push to develop

on:
  push:
    branches:
      - develop

jobs:
  run_tests:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        run: |
          mkdir temp
          cd temp
          git clone https://github.com/LilyLin395135/Simple-Server.git
          cd Simple-Server
          git checkout develop

      - name: Install dependencies
        run: |
          cd /app/temp/Simple-Server/server
          npm install

      - name: Run tests
        run: |
          cd /app/temp/Simple-Server/server
          npm test
          
          </code></pre>
          <h4>Description</h4>
          <ul>
            <li><strong>name:</strong> Defines the name of the workflow.</li>
            <li><strong>on:</strong> Specifies the event that triggers the workflow. In this example, the workflow is triggered on pushes to the develop branch.</li>
            <li><strong>jobs:</strong> Defines a job named run_tests.</li>
            <li><strong>steps:</strong> Defines the steps within the job.</li>
            <li><strong>name:</strong> Defines the name of the step.</li>
            <li><strong>run:</strong> The commands to be executed.</li>
            <ul>
                <li><strong>Checkout code:</strong> Fetch the code from GitHub and switch to the develop branch.</li>
                <li><strong>Install dependencies:</strong> Switch to the Simple-Server/server directory and install the required npm dependencies.</li>
                <li><strong>Run tests:</strong> Switch to the Simple-Server/server directory and run the tests.</li>
            </ul>
          </ul>
          <h3>YML Example 2: Automatically Deploy to EC2 on Merge to Main Branch</h3>
          <pre class="code-block"><code>
name: Deploy to EC2 on push to main
on:
  push:
    branches:
      - main
jobs:
  build_and_deploy:
    runs-on: ubuntu-latest
    steps:
      - name: deploy to ec2
        run: |
          ssh -i \${secrets.EC2_SSH_KEY} \${secrets.EC2_USERNAME}@\${secrets.HOST_DNS}
          echo "SSH connection successful!" > $HOME/deployment_test.txt
          cd ec2-user/Developer/Simple-Server/server
          git pull https://github.com/LilyLin395135/Simple-Server.git
          npm install
          pm2 restart all

          </code></pre>
          <h4>Description</h4>
          <ul>
            <li><strong>name:</strong> Defines the name of the workflow.</li>
            <li><strong>on:</strong> Specifies the event that triggers the workflow. In this example, the workflow is triggered on pushes to the main branch.</li>
            <li><strong>jobs:</strong> Defines a job named build_and_deploy.</li>
            <li><strong>steps:</strong> Defines the steps within the job.</li>
            <li><strong>name:</strong> Defines the name of the step.</li>
            <li><strong>run:</strong> The commands to be executed.</li>
            <ul>
                <li><strong>deploy to ec2:</strong> Connect to the EC2 server via SSH, pull the latest code, install dependencies, and restart the service.</li>
            </ul>
          </ul>
          <h2>Step 3</h2>
          <p>Set up secrets on the settings page.</p>
          <img src="assets/Guide3-set-secrets.jpg" alt="Guide1-gitviewer-folder" class="guide-image">
          <p><strong>Notes:</strong></p>
          <p>- <strong>Secrets:</strong> The <span class="keyword">deploy.yml</span> file uses <span class="keyword">\${secrets.EC2_SSH_KEY}</span>, <span class="keyword">\${secrets.EC2_USERNAME}</span>, and <span class="keyword">\${secrets.HOST_DNS}</span>. You need to create these secrets on the Settings page. Git Viewer will populate the variables with the values you set, and you won't need to enter them each time. You only need to update the values when they change.</p>
          <h2>Step 4</h2>
          <p>On the Git Viewer homepage:</p>
          <ul>
            <li><strong>1</strong> Open the project folder (where .git and .gitviewer are located).</li>
            <li><strong>2</strong> In the "try command" section, enter git commands and press enter to simulate git command execution.</li>
            <li><strong>3</strong> Use the "Run All" button to execute commands on the main project git.</li>
            <li><strong>4</strong> When a command matches the yml content, it triggers the workflow execution.</li>
            <li><strong>5</strong> Go to the workflow page to check the execution status and view the workflow log.</li>
          </ul>
          <img src="assets/Guide4-workflow.jpg" alt="Guide1-gitviewer-folder" class="guide-image">
          <img src="assets/Guide5-workflow-log.jpg" alt="Guide1-gitviewer-folder" class="guide-image">
          <p><strong>Notes:</strong></p>
          <p>- <strong>Directory Structure:</strong> Ensure that your project structure matches the example so that the paths in the workflow can be resolved correctly.</p>
          <button id="close-modal-bottom" class="close-button">Close</button>
        </div>
        <div id="block-background"></div>
      `;
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    document.querySelectorAll('.close-button').forEach(button => {
      button.addEventListener('click', () => {
        document.body.removeChild(modal);
        document.body.style.overflow = 'auto';
      });
    });
  }
});
