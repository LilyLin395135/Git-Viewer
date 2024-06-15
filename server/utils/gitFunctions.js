import fs from 'fs';
import path from 'path';

export const checkIsFolderGitRepo = (folderPath) => {
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
