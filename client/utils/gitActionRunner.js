import fs from 'fs';
import path from 'path';
import simpleGit from 'simple-git';
import yml from 'yaml';

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

const getRepositoryUrl = (dir) => {
  const gitConfigPath = path.join(dir, '.git/config');
  if (fs.existsSync(gitConfigPath)) {
    const gitConfig = fs.readFileSync(gitConfigPath, 'utf8');
    const match = gitConfig.match(/url = (.+)/);
    return match ? match[1] : null;
  }
  return null;
};

export const checkWorkflows = async ({commands, folderPath})=>{
  const git = simpleGit(folderPath);
  const isRepo = await git.checkIsRepo();

  if (!isRepo) {
    return null;
  }
  
  const currentBranch = (await git.status()).current;
  const rootDir = findGitRoot(folderPath);
  const yamlFiles = findYmlFiles(rootDir);

  const eventsTriggered=new Set();
  const commandEvents = commands.map((command) => {
    const [_, mainCommand] = command.split(' ');
    return mainCommand.toLowerCase();
  });
  
  yamlFiles.forEach(file=>{
    const workflow = yml.parse(fs.readFileSync(file, 'utf8'));
    commandEvents.forEach((event)=>{
      if(workflow.on &&
        workflow.on[event] &&
        workflow.on[event].branches.includes(currentBranch)){
        eventsTriggered.add(event);
      }
    });
  });
  return Array.from(eventsTriggered);
};

export const triggerWorkflows = async (eventTriggered, folderPath) => {
  const git = simpleGit(folderPath);
  const currentBranch = (await (git.status())).current;
  const rootDir = findGitRoot(folderPath);
  const yamlFiles = findYmlFiles(rootDir);

  const repositoryUrl = getRepositoryUrl(rootDir);
  if (!repositoryUrl) {
    throw new Error('Repository URL not found.');
  }

  const results =[];

  yamlFiles.forEach((file) => {
    const workflow = yml.parse(fs.readFileSync(file, 'utf8'));
    if (workflow.on && workflow.on[eventTriggered] && workflow.on[eventTriggered].branches.includes(currentBranch)) {
      console.log(`Triggering workflow from ${file}`);
      results.push(workflow);
    }
  });

  const ymlContent = yml.stringify(results);
  const workflowFileName = path.basename(yamlFiles[0]);
  const projectFolder = path.basename(rootDir);
  const commitHash = (await git.revparse(['HEAD'])).trim();
  const commitMessage = (await git.log(['-1'])).latest.message;

  return {
    ymlContent,
    repositoryUrl,
    workflowFileName,
    projectFolder,
    commitHash,
    commitMessage
  };
};