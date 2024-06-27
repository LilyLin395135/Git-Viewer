import fs from 'fs';
import yaml from 'yaml';
import { exec } from 'child_process';

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
    const regex = new RegExp(placeholder, 'g'); // regex → regular expression 搜尋匹配和操作文本的工具，查找如 placeholder 一樣字串、需要替換的位置，g 是 global match
    updatedScript = updatedScript.replace(regex, secret.value);
  });
  return updatedScript;
};

// 立即執行的函數
(async () => {
  try {
    // 讀取 secrets 和 ymlContent 檔案
    const secrets = JSON.parse(fs.readFileSync('/app/secret.json', 'utf8'));
    const ymlContent = fs.readFileSync('/app/workflow.yml', 'utf8');

    let workflow = yaml.parse(ymlContent);
    if (Array.isArray(workflow)) {
      workflow = workflow[0];
    }

    secrets.forEach((secret) => {
      if (secret.value.includes('BEGIN RSA PRIVATE KEY')) {
        const pemFilePath = `/app/${secret.name}.pem`;
        fs.writeFileSync(pemFilePath, secret.value);
        fs.chmodSync(pemFilePath, 0o400);// 設置pem檔案只有本人能讀
        secret.value = pemFilePath;
      }
    });

    const jobs = Object.keys(workflow.jobs);
    let sshCommand = '';
    const otherCommands = [];

    jobs.forEach((jobName) => {
      const { steps } = workflow.jobs[jobName];
      steps.forEach((step, index) => {
        if (step.script) {
          // 替換 script 中的 secrets
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

    const command = sshCommand ? `${sshCommand} '${otherContent}'` : otherContent;

    console.log(`Executing command: ${command}`);
    const stdout = await executeCommand(command);
    console.log(`Command output: ${stdout}`);
    res.json({ status: 'success', output: stdout });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
})();
