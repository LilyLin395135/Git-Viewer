import fs from 'fs';
import path from 'path';
import simpleGit from 'simple-git';
import yaml from 'yaml';
import { exec } from 'child_process';
import secrets from '../models/db.json' assert { type: 'json' }; // 假设 secrets 存储在 db.json 文件中

const executeCommand = (command) => new Promise((resolve, reject) => {
  exec(command, { shell: '/bin/bash' }, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing command: ${command}`);
      console.error(stderr);
      reject(error);
    } else {
      console.log(stdout);
      resolve(stdout);
    }
  });
});

export const triggerWorkflows = async (req, res) => {
  const { event, ymlContent, repoUrl } = req.body;

  try {
    let workflow = yaml.parse(ymlContent);

    // 確認 workflow 結構是否正確
    if (Array.isArray(workflow)) {
      workflow = workflow[0];
    }

    if (workflow.on && workflow.on[event]) {
      const jobs = Object.keys(workflow.jobs);
      let fullScript = '';
      jobs.forEach(jobName => {
        const { steps } = workflow.jobs[jobName];
        steps.forEach((step, index) => {
          if (step.with && step.with.script) {
            const scriptLines = step.with.script.split('\n').map(cmd => {
              if (cmd.trim() === '') {
                return ''; // 忽略空行
              }
              return `
              ${cmd.trim()} &&
              if [ $? -ne 0 ]; then exit 1; fi
            `;
            }).filter(line => line.trim() !== '').join('\n');

            // 移除每個步驟之間多餘的空行
            fullScript += `${scriptLines.trim()}\n`;
          }
        });
      });

      const command = `ssh -i ${secrets.EC2_SSH_KEY_PATH} ${secrets.EC2_USERNAME}@${secrets.HOST_DNS} '${fullScript}'`;

      console.log(`Executing command: ${command}`);

      try {
        const stdout = await executeCommand(command);
        console.log(`Command output: ${stdout}`);
        res.json({ status: 'success', output: stdout });
      } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({ status: 'failure', error: error.message });
      }
    } else {
      res.status(400).json({ error: 'Event not found in workflow' });
    }
  } catch (error) {
    console.error(`Error parsing YAML: ${error.message}`);
    res.status(500).json({ status: 'failure', error: error.message });
  }
};