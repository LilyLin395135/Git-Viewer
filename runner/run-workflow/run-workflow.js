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
      const output = stdout + stderr;
      console.log(output);
      resolve(output);
    }
  });
});

const replaceSecrets = (script, secrets) => {
  let updatedScript = script;
  secrets.forEach((secret) => {
    const placeholder = `\\$\\{secrets\\.${secret.name}\\}`;
    const regex = new RegExp(placeholder, 'g'); // regex → regular expression 搜尋匹配 和操作文本的工具，查找如 placeholder 一樣字串、需要替換的位置，g 是 global match
    updatedScript = updatedScript.replace(regex, secret.value);
  });
  return updatedScript;
};

// 立即執行的函數
(async () => {
  try {
    // 檢查是否存在 secrets 檔案
    const secretsFilePath = '/app/secret.json';
    const hasSecrets = fs.existsSync(secretsFilePath);

    let secrets = [];
    if (hasSecrets) {
      secrets = JSON.parse(fs.readFileSync(secretsFilePath, 'utf8'));
    }
    // const secrets = testSecrets;

    const ymlContent = fs.readFileSync('/app/workflow.yml', 'utf8');
    // const ymlContent = testYmlContent;

    let workflow = yaml.parse(ymlContent);
    if (Array.isArray(workflow)) {
      workflow = workflow[0];
    }
    if (hasSecrets) {
      secrets.forEach((secret) => {
        if (secret.value.includes('BEGIN RSA PRIVATE KEY')) {
          const pemFilePath = `/app/${secret.name}.pem`;
          fs.writeFileSync(pemFilePath, secret.value);
          fs.chmodSync(pemFilePath, 0o400);// 設置pem檔案只有本人能讀
          secret.value = pemFilePath;
          console.log(`Created and set permissions for ${pemFilePath}`);
        }
      });
    }

    const jobs = Object.keys(workflow.jobs);
    const stepLogs = [];

    for (const jobName of jobs) {
      const { steps } = workflow.jobs[jobName];
      for (const step of steps) {
        let command = '';
        let sshCommand = '';
        let cwd = '/app'; // docker 中的資料夾，沒有指定 working-directory 就都是在/app中執行
        const stepName = step.name || 'Unnamed step';

        if (step.run) {
          const scriptWithSecrets = replaceSecrets(step.run, secrets);
          const commands = scriptWithSecrets.split('\n').map((cmd) => cmd.trim()).filter((cmd) => cmd);

          commands.forEach((cmd) => {
            if (cmd.startsWith('ssh')) {
              sshCommand = cmd.replace(/\\n/g, '\n');
              sshCommand = sshCommand.replace('ssh', 'ssh -o StrictHostKeyChecking=no');
            } else {
              const fullCommand = `${cmd.replace(/\\n/g, '\n')} && if [ $? -ne 0 ]; then exit 1; fi`;
              command += `${fullCommand} && `;
            }
          });

          // 移除最後的 ' && '
          if (command.endsWith(' && ')) {
            command = command.slice(0, -4);
          }
        }

        if (command || sshCommand) {
          console.log(`Executing step: ${stepName}`);
          stepLogs.push(`---\nExecuting step: ${stepName}\n---`);
          try {
            const finalCommand = sshCommand ? `${sshCommand} '${command}'` : command;
            const stdout = await executeCommand(finalCommand, cwd);
            console.log(`Step "${stepName}" output: ${stdout}`);
            stepLogs.push(`Step "${stepName}" output:\n${stdout}`);
          } catch (error) {
            const stderr = error.stderr || error.message;
            console.error(`Step "${stepName}" failed: ${stderr}`);
            stepLogs.push(`Step "${stepName}" failed at command: ${finalCommand}\nError: ${stderr}`);
            console.log(stepLogs.join('\n\n'));
            process.exit(1); // 停止執行後續指令
          }
        }
      }
    }

    console.log(stepLogs.join('\n\n'));
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
})();
