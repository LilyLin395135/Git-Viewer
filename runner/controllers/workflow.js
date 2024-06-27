import fs from 'fs';
import path from 'path';
import yaml from 'yaml';
import os from 'os';
import { exec } from 'child_process';
import { getAllSecretsWithUserId } from '../models/secret.js';

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
  const { userId, event, ymlContent, repoUrl } = req.body;

  try {
    // 確認 event 符合 yml 的觸發點
    const workflow = yaml.parse(ymlContent);

    if (workflow[0].on && workflow[0].on[event]) {
      // 取得用戶的 secrets
      const secrets = await getAllSecretsWithUserId(userId);

      // 獲取臨時目錄
      const tmpDir = os.tmpdir();

      // 保存 secrets 為檔案
      const secretsFilePath = path.join(tmpDir, `secrets-${userId}.json`);
      fs.writeFileSync(secretsFilePath, JSON.stringify(secrets));

      // 保存 ymlContent 為檔案
      const ymlFilePath = path.join(tmpDir, `workflow-${userId}.yml`);
      fs.writeFileSync(ymlFilePath, ymlContent);

      // run DockerFile ，並傳入 secretsFilePath 和 ymlFilePath
      const dockerCommand = `
      docker run --name temp_container -d \
      -v ${secretsFilePath}:/app/secret.json \
      -v ${ymlFilePath}:/app/workflow.yml \
      git-viewer-runner:latest
      `;

      // 執行 Docker 命令
      const stdout = await executeCommand(dockerCommand);
      console.log(`Docker command output: ${stdout}`);
      res.json({ status: 'success', output: stdout });
    } else {
      res.status(400).json({ error: `Event '${event}' not found in workflow` });
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ status: 'failure', error: error.message });
  }
};
