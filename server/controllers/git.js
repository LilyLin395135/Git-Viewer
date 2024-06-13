import { exec } from 'child_process';

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
