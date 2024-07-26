const { _electron: electron } = require('playwright');
const path = require('path');
const { spawn } = require('child_process');

describe('Git Viewer End-to-End Tests', () => {
    let electronApp;
    let window;

    beforeAll(async () => {
        const npmPath = process.platform === 'win32' ? 'npm.cmd' : 'npm';
        const projectRoot = path.resolve(__dirname, '..');

        await new Promise((resolve, reject) => {
            const buildProcess = spawn(npmPath, ['run', 'build'], { cwd: projectRoot });

            buildProcess.stdout.on('data', (data) => {
                console.log(`build stdout: ${data}`);
            });

            buildProcess.stderr.on('data', (data) => {
                console.error(`build stderr: ${data}`);
            });

            buildProcess.on('close', (code) => {
                if (code !== 0) {
                    reject(new Error(`build process exited with code ${code}`));
                } else {
                    resolve();
                }
            });
        });

        // 啟動 Electron
        try {
            electronApp = await electron.launch({
                args: [path.join(projectRoot, 'dist-electron', 'main.js')],
            });
            window = await electronApp.firstWindow();
        } catch (error) {
            console.error('Error launching Electron app:', error);
            throw error;
        }
    }, 60000);

    afterAll(async () => {
        if (electronApp) {
            await electronApp.close();
        }
    });

    it('should show an error message for non-git commands', async () => {
        const commandInput = await window.$('#command-input');

        // 監聽 dialog 事件
        window.on('dialog', async dialog => {
            const errorMessage = dialog.message();
            console.log('Dialog message:', errorMessage); // 增加日誌記錄
            expect(errorMessage).toBe('Please enter a valid git command.');
            await dialog.dismiss(); // 關閉對話框
        });

        await commandInput.fill('non-git command');
        await commandInput.press('Enter');
    });
});
