import redisClient from './redisClient.js';

export const enqueueTask = async (task) => {
  try {
    const taskString = JSON.stringify(task);
    await redisClient.lPush('taskQueue', taskString);
    console.log('Task enqueued:', taskString);
  } catch (error) {
    console.error('Failed to enqueue task:', error);
  }
};

export const dequeueTask = async () => {
  try {
    const taskTuple = await redisClient.brPop('taskQueue', 0);
    if (!taskTuple) {
      console.log('No task in queue.');
      return null;
    }
    const taskString = taskTuple.element;
    if (!taskString) {
      console.error('No task string found in the tuple:', taskTuple);
      return null;
    }
    console.log('Task string dequeued:', taskString);

    const task = JSON.parse(taskString);
    console.log('Task dequeued successfully:', task);
    return task;
  } catch (error) {
    console.error('Failed to dequeue task:', error);
    throw error;
  }
};
