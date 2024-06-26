import yaml from 'yaml';
import { exec } from 'child_process';
import { getAllSecretsWithUserId } from '../models/secret.js';
// import secrets from '../models/db.json' assert { type: 'json' }; // 假设 secrets 存储在 db.json 文 件中

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
  secrets.forEach((secret) => {
    const placeholder = `\\$\\{secrets\\.${secret.name}\\}`;
    const regex = new RegExp(placeholder, 'g');
    if (secret.path) {
      updatedScript = updatedScript.replace(regex, `~/Git-Viewer/${secret.path}`);
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
      let sshCommand = '';
      let otherCommands = [];

      jobs.forEach((jobName) => {
        const { steps } = workflow.jobs[jobName];
        steps.forEach((step, index) => {
          if (step.script) {
            // 替换 script 中的 secrets
            const scriptWithSecrets = replaceSecrets(step.script, secrets);
            scriptWithSecrets.split('\n').forEach((cmd) => {
              if (cmd && cmd.trim()) {
                if (cmd.trim().startsWith('ssh')) {
                  sshCommand = cmd.trim().replace(/\\n/g, '\n');
                } else {
                  const fullCommand = `${cmd.trim().replace(/\\n/g, '\n')} && if [ $? -ne 0 ]; then exit 1; fi`;
                  otherCommands.push(fullCommand);
                }
              }
            });
          }
        });
      });

      const otherContent = otherCommands.join('\n');

      // 提取以 ssh 開頭的指令
      // const sshRegex = /^ssh\s.*?&&\n\s*if\s\[.*?\];\sthen\sexit\s1;\sfi/gms;
      // const sshMatch = fullScript.match(sshRegex);
      // let sshCommand = '';
      // if (sshMatch) {
      //   sshCommand = sshMatch[0].trim();
      //   fullScript = fullScript.replace(sshCommand, '').trim();
      // }

      // 移除多餘的空行
      // fullScript = fullScript.split('\n').filter(line => line.trim() !== '').join('\n');

      // 確保 sshCommand 只有一個空格和單引號
      // const sshCommandParts = sshCommand.split(' ');
      // if (sshCommandParts.length > 1) {
      //   const sshCommandFirstPart = sshCommandParts.slice(0, 2).join(' ');
      //   const sshCommandRest = sshCommandParts.slice(2).join(' ').replace(/\s\s+/g, ' ');
      //   sshCommand = `${sshCommandFirstPart} '${sshCommandRest}`;
      // }

      // 組合指令
      const command = sshCommand ? `${sshCommand} '${otherContent}'` : otherContent;

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
