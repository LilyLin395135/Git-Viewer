import { exec } from 'child_process';
import { updateLog } from '../models/workflow.js';

const checkContainer = (containerName) => new Promise((resolve, reject) => {
  exec(`docker inspect -f '{{.State.Running}}' ${containerName}`, (error, stdout, stderr) => {
    if (error) {
      reject(stderr);
    } else {
      resolve(stdout.trim() === 'false');// container 已停止運行
    }
  });
});

const getContainerLogs = async (containerName) => new Promise((resolve, reject) => {
  exec(`docker logs ${containerName}`, (error, stdout, stderr) => {
    if (error) reject(stderr);
    else resolve(stdout);
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
export const handleContainerCompletion = async (containerName, workflowId) => {
  let logs = '';
  const interval = setInterval(async () => {
    try {
      const newLogs = await getContainerLogs(containerName);
      console.log(newLogs);
      if (newLogs !== logs) { // 只有當日誌有更新時才執行更新
        logs = newLogs;
        await updateLog(workflowId, logs);
      }
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  }, 5000); // 每5秒檢查一次日誌

  try {
    await waitForContainerToStop(containerName);
    clearInterval(interval); // 停止定時器
    // 最後一次更新日誌
    const finalLogs = await getContainerLogs(containerName);
    await updateLog(workflowId, finalLogs);
    // 移除容器
    exec(`docker rm ${containerName}`, (error, stdout, stderr) => {
      if (error) console.log('Error removing container:', stderr);
      else console.log('Container removed:', stdout);
    });
  } catch (error) {
    console.error('Error handling container:', error);
  }
};
