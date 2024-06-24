import fs from 'fs';
import path from 'path';
import simpleGit from 'simple-git';
import yaml from 'yaml';
import { exec } from 'child_process';
import secrets from '../models/db.json' assert { type: 'json' }; // 假设 secrets 存储在 db.json 文件中

const findGitRoot = (folderPath) => {
  while (folderPath) {
    if (fs.existsSync(path.join(folderPath, '.git'))) {
      return folderPath;
    }
    const parentFolder = path.dirname(folderPath);
    if (parentFolder === folderPath) break;
    folderPath = parentFolder;
  }
  return null;
};

const findYmlFiles = (dir) => {
  const gitViewerDir = path.join(dir, '.gitviewer');
  const yamlFiles = [];

  if (fs.existsSync(gitViewerDir) && fs.statSync(gitViewerDir).isDirectory()) {
    fs.readdirSync(gitViewerDir).forEach((file) => {
      const fullPath = path.join(gitViewerDir, file);
      if (fs.statSync(fullPath).isFile() && (file.endsWith('.yml') || file.endsWith('.yaml'))) {
        yamlFiles.push(fullPath);
      }
    });
  }
  return yamlFiles;
};

const getRepositoryUrl = (gitRoot) => {
  const configFilePath = path.join(gitRoot, '.git', 'config');
  const configContent = fs.readFileSync(configFilePath, 'utf8');
  const repoUrlMatch = configContent.match(/url = (.+)/);
  return repoUrlMatch ? repoUrlMatch[1] : null;
};

export const checkWorkflows = async (req, res) => {
  const { commands, folderPath } = req.body;
  const git = simpleGit(folderPath);
  const currentBranch = (await git.status()).current;
  const rootDir = findGitRoot(folderPath);
  const yamlFiles = findYmlFiles(rootDir);

  const triggerEvents = new Set();
  const commandEvents = commands.map((command) => {
    const [_, mainCommand] = command.split(' ');
    return mainCommand.toLowerCase();
  });

  yamlFiles.forEach((file) => {
    const workflow = yaml.parse(fs.readFileSync(file, 'utf8'));
    commandEvents.forEach((event) => {
      if (
        workflow.on
        && workflow.on[event]
        && workflow.on[event].branches.includes(currentBranch)) {
        triggerEvents.add(event);
      }
    });
  });
  return res.json(Array.from(triggerEvents));
};

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
  const { event, folderPath } = req.body;
  const git = simpleGit(folderPath);
  const currentBranch = (await git.status()).current;
  const rootDir = findGitRoot(folderPath);
  const yamlFiles = findYmlFiles(rootDir);

  const repositoryUrl = getRepositoryUrl(rootDir);
  if (!repositoryUrl) {
    return res.status(400).json({ error: 'Repository URL not found.' });
  }

  const results = [];

  yamlFiles.forEach((file) => {
    const workflow = yaml.parse(fs.readFileSync(file, 'utf8'));
    if (workflow.on && workflow.on[event] && workflow.on[event].branches.includes(currentBranch)) {
      console.log(`Triggering workflow from ${file}`);
      results.push(workflow);
    }
  });

  const ymlContent = yaml.stringify(results);

  const command = `
        ssh -i ${secrets.EC2_SSH_KEY_PATH} ${secrets.EC2_USERNAME}@${secrets.HOST_DNS} '${fullScript}'
      `;

  console.log(`Executing command: ${command}`);

  try {
    const stdout = await executeCommand(command);
    console.log(`Command output: ${stdout}`);
    results.push({ status: 'success' });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    results.push({ status: 'failure', error: error.message });
  }

if (results.some(result => result.status === 'failure')) {
  return res.json(results.filter(result => result.status === 'failure'));
}
return res.json(results);
};