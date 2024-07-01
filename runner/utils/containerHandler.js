import { exec } from 'child_process';

const checkContainer = (containerName) => new Promise((resolve, reject) => {
  exec(`docker inspect -f '{{.State.Running}}' ${containerName}`, (error, stdout, stderr) => {
    if (error) {
      reject(stderr);
    } else {
      resolve(stdout.trim() === 'false');// container 已停止運行
    }
  });
});

const waitForContainerToStop = async (containerName) => new Promise((resolve, reject) => {
  const interval = setInterval(async () => {
    try {
      const isStopped = await checkContainer(containerName);
      if (isStopped) {
        clearInterval(interval);
        resolve();
      }
    } catch (error) {
      clearInterval(interval);
      reject(error);
    }
  }, 5000); // 每5秒檢查一次
});

// 監控容器直到停止並處理日誌和容器清理
export const handleContainerCompletion = async (containerName) => {
  try {
    await waitForContainerToStop(containerName);
    const logs = await new Promise((resolve, reject) => {
      exec(`docker logs ${containerName}`, (error, stdout, stderr) => {
        if (error) reject(stderr);
        else resolve(stdout);
      });
    });
    console.log('Logs:', logs);
    exec(`docker rm ${containerName}`, (error, stdout, stderr) => {
      if (error) console.log('Error removing container:', stderr);
      else console.log('Container removed:', stdout);
    });
  } catch (error) {
    console.error('Error handling container:', error);
  }
};
