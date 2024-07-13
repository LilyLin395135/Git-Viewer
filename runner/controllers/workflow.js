import yaml from 'yaml';
import { exec } from 'child_process';
import { createWorkflow, getAllWorkflows, createProject, getWorkflow } from '../models/workflow.js';
import { STATUS } from '../constants/statusCode.js';
import { enqueueTask } from '../queue/queue.js';
import { getTaipeiTime } from '../utils/getTime.js';

export const executeCommand = async (command, containerName) =>
  new Promise((resolve, reject) => {
    exec(command, { shell: '/bin/bash' }, async (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing command: ${command}`, stderr);
        reject(new Error(stderr));
      } else {
        console.log(`Command executed successfully: ${stdout}`);
        resolve({ stdout, containerName });
      }
    });
  });

export const triggerWorkflows = async (req, res) => {
  const {
    userId,
    event,
    ymlContent,
    repoUrl,
    projectFolder,
    workflowFileName,
    commitHash,
    commitMessage
  } = req.body;

  try {
    // 確認 event 符合 yml 的觸發點
    const workflow = yaml.parse(ymlContent);

    if (workflow[0].on && workflow[0].on[event]) {
      // 檢查 ymlContent 是否需要 secrets
      const needsSecrets = /secrets\./.test(ymlContent); // .test()正規表達式物件，接受一個字串參數並返回bool

      const projectId = await createProject(projectFolder, repoUrl);
      const workflowData = {
        user_id: userId,
        workflow_name: workflow[0].name,
        workflow_file_name: workflowFileName,
        project_id: projectId,
        status: STATUS.QUEUE,
        start_queue_time: getTaipeiTime(),
        start_execute_time: null,
        finish_execute_time: null,
        commit_hash: commitHash,
        commit_message: commitMessage,
        branch: workflow[0].on.push.branches[0],
        action: event,
        log: '',
        yml_content: ymlContent
      };
      const workflowId = await createWorkflow(workflowData);

      await enqueueTask({
        userId,
        needsSecrets,
        containerName: `temp_container_user${userId}_${projectFolder}`,
        workflowData: { ...workflowData, id: workflowId }
      });

      res.status(200).json({ message: 'Workflow enqueued successfully.', workflowId });
    } else {
      res.status(400).json({ error: `Event '${event}' not found in workflow` });
    }
  } catch (error) {
    console.error(`Error triggering workflow: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

export const getWorkflowLogs = async (req, res) => {
  const { containerName } = req.params;

  exec(`docker logs ${containerName}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Failed to get Docker logs: ${stderr}`);
      res.status(500).json({ error: stderr });
    } else {
      res.json({ logs: stdout });
    }
  });
};

export const createWorkflowAndProject = async (req, res) => {
  try {
    const { userId, triggerEvent, ymlContent, workflowFileName,
      projectFolderName, commitHash, commitMessage, repoUrl } = req.body;
    const projectId = await createProject(projectFolderName, repoUrl);
    const workflow = yaml.parse(ymlContent);
    const workflowData = {
      user_id: userId,
      workflow_name: workflow[0].name,
      workflow_file_name: workflowFileName,
      project_id: projectId,
      status: 0,
      start_queue_time: getTaipeiTime(),
      start_execute_time: getTaipeiTimePlusOneMinute(),
      finish_execute_time: getTaipeiTimePlusTwoMinute(),
      commit_hash: commitHash,
      commit_message: commitMessage,
      branch: workflow[0].on.push.branches[0],
      action: triggerEvent,
      log: '',
      yml_content: ymlContent
    };

    const workflowId = await createWorkflow(workflowData);
    res.status(201).json({ workflowId });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const getWorkflowsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const workflows = await getAllWorkflows(userId);
    res.json(workflows);
  } catch (error) {
    console.error('Error getting all workflows:', error);
    res.status(500).json({ message: 'Failed to retrieve workflows', error: error.message });
  }
};

export const getWorkflowById = async (req, res) => {
  try {
    const { workflowId } = req.params;
    const workflow = await getWorkflow(workflowId);
    if (workflow) {
      res.json(workflow);
    } else {
      res.status(404).json({ message: 'Workflow not found' });
    }
  } catch (error) {
    console.error('Error getting workflow:', error);
    res.status(500).json({ message: 'Failed to retrieve workflow', error: error.message });
  }
};
