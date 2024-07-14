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
          <h2>User Guide: How to Use Git Viewer's Service to Execute YAML Workflows</h2>
          <p>1. In the root folder of your project (where .git is located), create a .gitviewer folder.</p>
          <p>2. In the .gitviewer folder, create a .yml file.</p>
          <h3>Example 1: Running Tests on Merge or Pull Request</h3>
          <pre><code>
          name: Run tests on merge or PR to main
  
          on:
            push:
              branches:
                - develop
            pull_request:
              branches:
                - main
  
          jobs:
            run_tests:
              runs-on: ubuntu-latest
  
              steps:
                - name: Checkout code
                  run: |
                    git clone https://github.com/LilyLin395135/Simple-Server.git
                    cd Simple-Server
                    git checkout main
  
                - name: Set up Node.js
                  run: |
                    curl -fsSL https://deb.nodesource.com/setup_current.x | bash -
                    apt-get install -y nodejs
  
                - name: Change to server directory
                  run: cd Simple-Server/server
  
                - name: Install dependencies
                  run: npm install
                  working-directory: ./server
  
                - name: Run tests
                  run: npm test
                  working-directory: ./server
          </code></pre>
          <h3>Example 2: Automatically Deploy to EC2 on Merge to Main Branch</h3>
          <pre><code>
          name: Deploy to EC2 on merge
  
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
                    echo "SSH connection successful!" > \$HOME/deployment_test.txt
                    cd ec2-user/Developer/Simple-Server/server
                    git pull https://github.com/LilyLin395135/Simple-Server.git
                    npm install
                    pm2 restart all
          </code></pre>
          <p><strong>Notes:</strong></p>
          <p>- <strong>Secrets:</strong> The <code>deploy.yml</code> file uses <code>\${secrets.EC2_SSH_KEY}</code>, <code>\${secrets.EC2_USERNAME}</code>, and <code>\${secrets.HOST_DNS}</code>. You need to configure these secrets in the service for the workflow to run successfully.</p>
          <p>- <strong>Directory Structure:</strong> Ensure that your project structure matches the example so that the paths in the workflow can be resolved correctly.</p>
          <button id="close-modal">Close</button>
        </div>
        <div id="block-background"></div>
      `;
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';

        document.getElementById('close-modal').addEventListener('click', () => {
            document.body.removeChild(modal);
            document.body.style.overflow = 'auto';
        });
    }
});
