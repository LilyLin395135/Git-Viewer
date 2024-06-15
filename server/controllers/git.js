import { exec } from 'child_process';
import simpleGit from 'simple-git';
import { checkIsFolderGitRepo } from '../utils/gitFunctions.js';

export function initGit(req, res, next) {
  try {
    const { folderPath } = req.body;
    exec('git init', { cwd: folderPath }, (error, stdout, stderr) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      return res.status(200).json({ stdout, stderr });
    });
  } catch (error) {
    next(error);
  }
}

export async function getGitBranchesInfo(req, res, next) {
  const { folderPath } = req.query;
  const gitRepoPath = checkIsFolderGitRepo(folderPath);

  if (!gitRepoPath) {
    return res.status(400).json({ error: 'No git repository found in the given path or its parent directories.' });
  }

  const git = simpleGit(gitRepoPath);

  try {
    const branchesInfo = await git.branch();
    const allBranches = branchesInfo.all;

    const branches = {};
    await Promise.all(allBranches.map(async (branchName) => {
      const log = await git.log([branchName]);
      const status = await git.status();
      const commits = await Promise.all(log.all.map(async (commit) => {
        const commitDetails = await git.show(['-s', '--format=%P', commit.hash]);
        const parents = commitDetails.trim().split(' ');
        return {
          hash: commit.hash,
          date: commit.date,
          message: commit.message,
          author_email: commit.author_email,
          source: parents
        };
      }));
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
    const currentBranch = branchesInfo.current;
    const { detached } = branchesInfo;

    return res.json({
      all: allBranches,
      branches,
      current: currentBranch,
      detached
    });
  } catch (error) {
    next(error);
  }
}
