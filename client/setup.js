import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';

let server;
const appDirectory = process.cwd(); // 當前工作資料夾

export default async () => {
  const __filename = appDirectory;
  const __dirname = path.dirname(__filename);

  const npmPath = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  server = spawn(npmPath, ['start'], { cwd: path.resolve(__dirname, '..') });
  global.__SERVER__ = server;

  await new Promise(resolve => setTimeout(resolve, 5000)); // 等待應用啟動
};
