import redisClient from './redisClient.js';

export const enqueueTask = async (task) => {
  try {
    // 將任務序列化為 JSON 字符串
    const taskString = JSON.stringify(task);
    // 將任務推送到 Redis 隊列
    await redisClient.lPush('taskQueue', taskString);
    console.log('Task enqueued:', taskString); // 日誌輸出任務內容
  } catch (error) {
    console.error('Failed to enqueue task:', error);
  }
};

// export const dequeueTask = async () => {
//   try {
//     // 從隊列末尾彈出任務
//     const taskString = await redisClient.rPop('taskQueue');
//     if (!taskString) {
//       console.log('No task in queue.');
//       return null;
//     }
//     // 日誌輸出反序列化前的原始字符串
//     console.log(`Raw task string dequeued: ${taskString}`);

//     // 反序列化 JSON 字符串
//     const task = JSON.parse(taskString);
//     console.log('Task dequeued successfully:', task);
//     return task;
//   } catch (error) {
//     console.error('Failed to dequeue task:', error);
//     throw error;
//   }
// };

export const dequeueTask = async () => {
  try {
    // 使用 BRPOP 从队列中弹出一个任务
    const taskTuple = await redisClient.brPop('taskQueue', 0);
    if (!taskTuple) {
      console.log('No task in queue.');
      return null;
    }
    // 正确地从对象中获取任务字符串
    const taskString = taskTuple.element;
    if (!taskString) {
      console.error('No task string found in the tuple:', taskTuple);
      return null;
    }
    console.log('Task string dequeued:', taskString);

    // 反序列化 JSON 字符串以获取任务对象
    const task = JSON.parse(taskString);
    console.log('Task dequeued successfully:', task);
    return task;
  } catch (error) {
    console.error('Failed to dequeue task:', error);
    throw error;
  }
};
