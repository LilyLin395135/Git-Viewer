import path from 'path';
import fs from 'fs';
import simpleGit from 'simple-git';
import { exec } from 'child_process';
import { findGitRoot } from './gitActionRunner.js';

const checkIsFolderGitRepo = (folderPath) => {
  let beCheckedPath = folderPath;
  while (beCheckedPath) {
    const gitPath = path.join(beCheckedPath, '.git');
    if (fs.existsSync(gitPath)) {
      return beCheckedPath;
    }
    const parentFolder = path.dirname(beCheckedPath);
    if (parentFolder === beCheckedPath) break;
    beCheckedPath = parentFolder;
  }
  return null;
};

export async function initGit(event, folderPath) {
  const parentGitFolder = findGitRoot(path.dirname(folderPath));
  if (parentGitFolder) {
    const result = await dialog.showMessageBox({
      type: 'question',
      buttons: ['Yes', 'No'],
      defaultId: 1,
      title: 'Confirm',
      message: `The parent folder ${parentGitFolder} is already a git repository. Do you still want to run git init?`
    });

    if (result.response === 1) {
      return { status: 'cancelled' };
    }
  }

  return new Promise((resolve, reject) => {
    exec('git init', { cwd: folderPath }, (error, stdout, stderr) => {
      if (error) {
        const errorMessage = error.message || 'Unknown error';
        reject(new Error(errorMessage));
      } else {
        resolve({ stdout, stderr });
      }
    });
  });
}

export async function getGitInfo(folderPath) {
  try {
    const gitRepoPath = checkIsFolderGitRepo(folderPath);

    if (!gitRepoPath) {
      throw new Error('No git repository found in the given path or its parent directories.');
    }

    const git = simpleGit(gitRepoPath);

    const branchesInfo = await git.branchLocal();
    const allBranches = branchesInfo.all;
    if (allBranches.length === 0) {
      throw new Error('fatal: your current branch master does not have any commits yet.');
    }

    const branches = {};
    const currentBranch = branchesInfo.current;
    const { detached } = branchesInfo;

    await Promise.all(allBranches.map(async (branchName) => {
      const [log, status] = await Promise.all([git.log([branchName]), git.status()]);
      const commitPromises = log.all.map(async (commit) => {
        const commitDetails = await git.show(['-s', '--format=%P', commit.hash]);
        const parents = commitDetails.trim().split(' ');
        return {
          hash: commit.hash,
          date: commit.date,
          message: commit.message,
          author_email: commit.author_email,
          source: parents
        };
      });
      const commits = await Promise.all(commitPromises);

      const changesNotStaged = status.files
        .filter((file) => file.working_dir === 'M')
        .map((file) => file.path);

      branches[branchName] = {
        current: branchesInfo.current === branchName,
        linkedWorkTree: branchesInfo.branches[branchName].linkedWorkTree,
        name: branchName,
        latestCommit: log.latest.hash,
        commits,
        UntrackedFiles: status.not_added, // unadded
        ChangesNotStaged: changesNotStaged, // unadded
        ChangesToBeCommitted: status.staged // unCommitted
      };
    }));

    return {
      all: allBranches,
      branches,
      current: currentBranch,
      detached
    };
  } catch (error) {
    console.error('Error fetching git info:', error);
    throw error;
  }
}