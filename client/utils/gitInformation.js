import path from 'path';
import fs from 'fs';
import simpleGit from 'simple-git';
import { exec, execSync } from 'child_process';
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

export async function getCommitMessage(hash, folderPath) {
    return execSync(`git log -1 --pretty=format:%s ${hash}`, { cwd: folderPath }).toString().trim();
};

export async function getGitInfo(folderPath) {
    try {
        const gitRepoPath = checkIsFolderGitRepo(folderPath);

        if (!gitRepoPath) {
            throw new Error('No git repository found in the given path or its parent directories.');
        }

        const git = simpleGit(gitRepoPath);

        const branchesInfo = await git.branchLocal();
        const currentBranch = branchesInfo.current;

        // 使用 PowerShell 命令获取处理后的 git log 输出
        const logOutput = execSync(`git log --decorate=short --oneline --pretty=format:'%h %p%d' ${currentBranch} | ForEach-Object {
            $parts = $_ -split ' ', 3
            $hash1 = $parts[0]
            $hash2 = if ($parts[1].Length -ge 5) { $parts[1] } else { $parts[1] }
            $refs = if ($parts.Length -ge 3) { $parts[2] } else { "" }
            "$hash1 $hash2 $refs".Trim()
        }`, { shell: 'powershell.exe', cwd: folderPath }).toString().trim();

        // const commitMessages = logOutput.split('\n').map(line => {
        //     const [hash] = line.split(' ');
        //     const commitMessage = execSync(`git log -1 --pretty=format:%s ${hash}`, { cwd: folderPath }).toString().trim();
        //     return {
        //         hash,
        //         message: commitMessage
        //     };
        // });

        const status = await git.status();

        const changesNotStaged = status.files
            .filter((file) => file.working_dir === 'M')
            .map((file) => file.path);

        return {
            logOutput: logOutput.split('\n'),
            // commitMessages,
            UntrackedFiles: status.not_added,
            ChangesNotStaged: changesNotStaged,
            ChangesToBeCommitted: status.staged,
            currentCommit: branchesInfo.branches[currentBranch].commit,
            remoteCommit: branchesInfo.branches[`${currentBranch}/origin`]?.commit
        };
    } catch (error) {
        console.error('Error fetching git info:', error);
        throw error;
    }
}