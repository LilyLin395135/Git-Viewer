import mysql from 'mysql2';
import dotenv from 'dotenv';
import { dequeueTask } from './queue.js';
import { executeCommand } from '../controllers/workflow.js';
// import { updateWorkflow } from '../models/workflow.js';
import { STATUS } from '../constants/statusCode.js';
import { getTaipeiTime } from '../utils/getTime.js';
import { handleContainerCompletion } from '../utils/containerHandler.js';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
}).promise();

async function updateWorkflow(id, updateData) {
  // Prepare SQL statement parts
  const keys = Object.keys(updateData);
  const values = Object.values(updateData);

  // Construct SET part of the SQL query dynamically
  const setClause = keys.map((key) => `${key} = ?`).join(', ');

  const query = `UPDATE workflow SET ${setClause} WHERE id = ?`;

  try {
    // Spread the values and append `id` at the end
    const [result] = await pool.query(query, [...values, id]);
    return result.affectedRows; // Return the number of affected rows
  } catch (error) {
    console.error('Database error:', error);
    throw error; // Rethrow to handle it in the caller
  }
}

const processTasks = async () => {
  while (true) {
    const task = await dequeueTask();
    console.log('Processing task:', task);
    const { command, containerName, workflowData } = task;
    let startExecuteTime = null;
    let successExecuteTime = null;
    let failExecuteTime = null;

    try {
      startExecuteTime = getTaipeiTime();
      // dequeue workflow 開始被處理，更新 STATUS.PROCESSING
      await updateWorkflow(workflowData.id, {
        ...workflowData,
        status: STATUS.PROCESSING,
        start_execute_time: startExecuteTime
      });

      const result = await executeCommand(command, containerName);
      console.log('Task completed:', result);

      successExecuteTime = getTaipeiTime();

      // 執行成功，更新 STATUS.SUCCESS
      await updateWorkflow(workflowData.id, {
        ...workflowData,
        status: STATUS.SUCCESS,
        log: result.stdout,
        start_execute_time: startExecuteTime,
        finish_execute_time: successExecuteTime
      });
    } catch (error) {
      failExecuteTime = getTaipeiTime();
      console.error('Failed to process task:', error);
      await updateWorkflow(workflowData.id, {
        ...workflowData,
        status: STATUS.FAILURE,
        log: error.stderr || error.message,
        start_execute_time: startExecuteTime,
        finish_execute_time: failExecuteTime
      });
    }
    // 無論成功或失敗，處理容器完成的邏輯
    await handleContainerCompletion(containerName, workflowData.id);
  }
};

processTasks().catch((err) => console.error('Error in worker process:', err));
