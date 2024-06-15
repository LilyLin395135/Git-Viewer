import { exec } from 'child_process';

export const getGitInfo = (repoPath) => {
  return new Promise((resolve, reject) => {
    const command = `git log --pretty=format:"%h %s" --graph --decorate=short || echo "No commits yet"`;
    exec(command, { cwd: repoPath }, (error, stdout, stderr) => {
      if (error) {
        return reject(error);
      }
      resolve(stdout);
    });
  });
};