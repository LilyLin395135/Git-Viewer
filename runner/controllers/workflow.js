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

  const workflow = yaml.parse(ymlContent);
  if (workflow.on && workflow.on[event]) {
    const jobs = Object.keys(workflow.jobs);
    let fullScript = '';
    jobs.forEach(jobName => {
      const { steps } = workflow.jobs[jobName];
      steps.forEach(step => {
        if (step.run) {
          fullScript += `${step.run.replace('<repository_url>', repoUrl)}; `;
        }
      });
    });

    const command = `
      ssh -i ${secrets.EC2_SSH_KEY_PATH} ${secrets.EC2_USERNAME}@${secrets.HOST_DNS} '${fullScript}'
    `;

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
};