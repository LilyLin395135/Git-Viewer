import yaml from 'yaml';
import { exec } from 'child_process';
import { getAllSecretsWithUserId } from '../models/secret.js';
// import secrets from '../models/db.json' assert { type: 'json' }; // 假设 secrets 存储在 db.json 文件中

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

const replaceSecrets = (script, secrets) => {
  let updatedScript = script;
  secrets.forEach(secret => {
    const placeholder = `\\$\\{secrets\\.${secret.name}\\}`;
    const regex = new RegExp(placeholder, 'g');
    if (secret.path) {
      updatedScript = updatedScript.replace(regex, secret.path);
    } else {
      updatedScript = updatedScript.replace(regex, secret.value);
    }
  });
  return updatedScript;
};

export const triggerWorkflows = async (req, res) => {
  const { userId, event, ymlContent, repoUrl } = req.body;

  try {
    const secrets = await getAllSecretsWithUserId(userId);

    let workflow = yaml.parse(ymlContent);

    // 確認 workflow 結構是否正確
    if (Array.isArray(workflow)) {
      workflow = workflow[0];
    }

    if (workflow.on && workflow.on[event]) {
      const jobs = Object.keys(workflow.jobs);
      let fullScript = '';
      jobs.forEach((jobName) => {
        const { steps } = workflow.jobs[jobName];
        steps.forEach((step, index) => {
          if (step.script) {
            // 替换 script 中的 secrets
            const scriptWithSecrets = replaceSecrets(step.script, secrets);
            const scriptLines = scriptWithSecrets.split('\n').map((cmd) => {
              if (cmd.trim() === '') {
                return ''; // 忽略空行
              }
              return `
              ${cmd.trim().replace(/\\n/g, '\n')} &&
              if [ $? -ne 0 ]; then exit 1; fi
            `;
            }).filter((line) => line.trim() !== '').join('\n');

            // 移除每个步骤之间多余的空行
            fullScript += `${scriptLines.trim()}\n`;
          }
        });
      });

      const command = `${fullScript}`;

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
