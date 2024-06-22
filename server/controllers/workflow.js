import fs from 'fs';
import path from 'path';
import simpleGit from 'simple-git';
import yaml from 'yaml';
import { exec } from 'child_process';

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
  let yamlFiles = [];
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== 'node_modules') {
        yamlFiles = yamlFiles.concat(findYmlFiles(fullPath));
      }
    } else if (file.endsWith('.yml') || file.endsWith('.yaml')) {
      yamlFiles.push(fullPath);
    }
  });
  return yamlFiles;
};

const executeCommand = (command) => new Promise((resolve, reject) => {
  exec(command, (error, stdout, stderr) => {
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

export const checkWorkflows = (req, res) => {
  const { commands, folderPath } = req.body;
  const git = simpleGit(folderPath);
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
      if (workflow.on && workflow.on[event]) {
        triggerEvents.add(event);
      }
    });
  });

  return res.json(Array.from(triggerEvents));
};

export const triggerWorkflows = async (req, res) => {
  const { event, folderPath } = req.body;
  const git = simpleGit(folderPath);
  const currentBranch = (await git.status()).current;
  const rootDir = findGitRoot(folderPath);
  const yamlFiles = findYmlFiles(rootDir);

  const results = [];

  await Promise.all(yamlFiles.map(async (file) => {
    const workflow = yaml.parse(fs.readFileSync(file, 'utf8'));
    if (workflow.on && workflow.on[event] && workflow.on[event].branches.includes(currentBranch)) {
      console.log(`Triggering workflow from ${file}`);
      const jobs = Object.keys(workflow.jobs);

      await Promise.all(jobs.map(async (jobName) => {
        const { steps } = workflow.jobs[jobName];

        for (const step of steps) {
          if (step.run) {
            try {
              await executeCommand(step.run);
              results.push({ step: step.name, status: 'success' });
            } catch (error) {
              results.push({ step: step.name, status: 'failure', error: error.message });
              throw new Error(`Step "${step.name}" failed: ${error.message}`);
            }
          }
        }
      }));
    }
  }));

  if (results.some((result) => result.status === 'failure')) {
    return res.json(results.filter((result) => result.status === 'failure'));
  }
  return res.json(results);
};
