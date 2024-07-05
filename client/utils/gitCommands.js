export function formatStatus(status) {
    const { current, tracking, created, modified, deleted, staged } = status;
    let output = `On branch ${current}\n`;
    if (tracking) {
        output += `Your branch is up to date with '${tracking}'.\n`;
    }

    if (staged.length > 0) {
        output += `\nChanges to be committed:\n  (use "git restore --staged <file>..." to unstage)\n`;
        staged.forEach(file => {
            output += `        new file:   ${file}\n`;
        });
    }

    if (created.length > 0 || modified.length > 0 || deleted.length > 0) {
        output += `\nChanges not staged for commit:\n  (use "git add <file>..." to update what will be committed)\n  (use "git restore <file>..." to discard changes in working directory)\n`;
        created.forEach(file => {
            output += `        new file:   ${file}\n`;
        });
        modified.forEach(file => {
            output += `        modified:   ${file}\n`;
        });
        deleted.forEach(file => {
            output += `        deleted:   ${file}\n`;
        });
    }

    return output;
}