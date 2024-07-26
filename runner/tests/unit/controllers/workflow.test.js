import request from 'supertest';
import app from '../../../server.js';
import { createWorkflow, createProject } from '../../../models/workflow.js';
import { enqueueTask } from '../../../queue/queue.js';

jest.mock('../../../models/workflow.js');
jest.mock('../../../queue/queue.js');
jest.mock('child_process');

// 通用的測試資料
const commonYmlContent = `
      - name: Test Workflow
        on:
          push:
            branches:
              - main
      `;

const commonRequestBody = {
  userId: 1,
  ymlContent: commonYmlContent,
  repoUrl: 'https://github.com/test/repo',
  projectFolder: 'test-project',
  workflowFileName: 'workflow.yml',
  commitHash: 'abc123',
  commitMessage: 'Test commit'
};

const setupMocks = () => {
  createProject.mockResolvedValue(1); // 模擬 createProject 函數並返回 1，表示成功建立並返回 ID。
  createWorkflow.mockResolvedValue(1); // 模擬 createWorkflow 函數並返回 1，表示成功建立並返回 ID。
  enqueueTask.mockResolvedValue(); // 模擬 enqueueTask 函數，表示成功建立（不返回任何值）。
};

const sendRequest = async (bodyOverrides) => {
  const requestBody = { ...commonRequestBody, ...bodyOverrides };
  return await request(app)
    .post('/api/workflow/trigger')
    .send(requestBody);
};

describe('Workflow Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // 清除所有 mock
    setupMocks();
  });

  afterEach(() => {
    jest.clearAllMocks(); // 清除所有 mock
  });

  describe('triggerWorkflows', () => {
    it('should enqueue the workflow if event is found in ymlContent', async () => {
      // arrange
      // act
      const response = await sendRequest({ event: 'push' });

      // assert
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'Workflow enqueued successfully.', workflowId: 1 });
      expect(createProject).toHaveBeenCalledWith('test-project', 'https://github.com/test/repo');
      expect(createWorkflow).toHaveBeenCalled();
      expect(enqueueTask).toHaveBeenCalled();
    });

    it('should return 400 if event is not found in ymlContent', async () => {
      // arrange
      // act
      const response = await sendRequest({ event: 'pull_request' });

      // assert
      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'Event \'pull_request\' not found in workflow' });
    });

    it('should return 500 if an error occurs', async () => {
      // arrange
      createProject.mockRejectedValue(new Error('Test error'));

      // act
      const response = await sendRequest({ event: 'push' });

      // assert
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Test error' });
    });
  });
});
