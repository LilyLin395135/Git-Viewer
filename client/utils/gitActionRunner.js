import fs from 'fs';
import path from 'path';
import simpleGit from 'simple-git';
import yml from 'yaml';
import { exec } from 'child_process';

export const findGitRoot = (folderPath) => {
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

export const findYmlFiles = (dir) => {
  let yamlFiles = [];
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      // 排除 node_modules 目录
      if (file !== 'node_modules') {
        yamlFiles = yamlFiles.concat(findYmlFiles(fullPath));
      }
    } else if (file.endsWith('.yml') || file.endsWith('.yaml')) {
      yamlFiles.push(fullPath);
    }
  });
  return yamlFiles;
};

export const executeCommand = (command) => {
  return new Promise((resolve, reject) => {
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
};

export const checkWorkflows = (event,folderPath)=>{
  const git = simpleGit(folderPath);
  const rootDir = findGitRoot(folderPath);
  const yamlFiles = findYmlFiles(rootDir);

  const triggerEvents=[];
  
  yamlFiles.forEach(file=>{
    const workflow = yml.parse(fs.readFileSync(file, 'utf8'));
    if(workflow.on && workflow.on[event]){
      triggerEvents.push(event);
    }
  });
  return triggerEvents;
};

export const triggerWorkflows = async (event, folderPath) => {
  const git = simpleGit(folderPath);
  const currentBranch = (await (git.status())).current;
  const rootDir = findGitRoot(folderPath);
  const yamlFiles = findYmlFiles(rootDir);

  const results =[];

  await Promise.all(yamlFiles.map(async (file) => {
    const workflow = yml.parse(fs.readFileSync(file, 'utf8'));
    if (workflow.on && workflow.on[event] && workflow.on[event].branches.includes(currentBranch)) {
      console.log(`Triggering workflow from ${file}`);
      const jobs = Object.keys(workflow.jobs);
      
      await Promise.all(jobs.map(async (jobName) => {
        const steps = workflow.jobs[jobName].steps;
        
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

  if (results.some(result => result.status === 'failure')) {
    return results.filter(result => result.status === 'failure');
  } else {
    return results;
  }
};