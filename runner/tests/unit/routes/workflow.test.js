import request from 'supertest';
import app from '../../../server.js';
import { triggerWorkflows, getWorkflowLogs, createWorkflowAndProject, getWorkflowsByUser, getWorkflowById } from '../../../controllers/workflow.js';

// Mock controllers
jest.mock('../../../controllers/workflow.js');

describe('Workflow Routes', () => {
  // Setup before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const sendPostRequest = async (url, data, mockFunction, mockImplementation) => {
    mockFunction.mockImplementation(mockImplementation);
    const response = await request(app).post(url).send(data);
    return response;
  };

  const sendGetRequest = async (url, mockFunction, mockImplementation) => {
    mockFunction.mockImplementation(mockImplementation);
    const response = await request(app).get(url);
    return response;
  };

  it('POST /api/workflow/trigger should call triggerWorkflows controller', async () => {
    // arrange
    const WorkflowData = {
      userId: 1,
      event: 'push',
      ymlContent: '- name: Deploy to EC2 on merge\n  on:\n    push:\n      branches:\n        - main\n  jobs:\n    build_and_deploy:\n',
      repoUrl: 'https://github.com/test/repo',
      projectFolder: 'test-project',
      workflowFileName: 'workflow.yml',
      commitHash: 'abc123',
      commitMessage: 'Test commit'
    };

    const mockImplementation = (req, res) => res.status(200).send({ message: 'Workflow enqueued successfully.' });

    // act
    const response = await sendPostRequest('/api/workflow/trigger', WorkflowData, triggerWorkflows, mockImplementation);

    // assert
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Workflow enqueued successfully.' });
    expect(triggerWorkflows).toHaveBeenCalled();
  });

  it('GET /api/workflow/logs/:containerName should call getWorkflowLogs controller', async () => {
    // arrange
    const mockImplementation = (req, res) => res.status(200).send({ logs: 'sample logs' });

    // act
    const response = await sendGetRequest('/api/workflow/logs/temp_container_1', getWorkflowLogs, mockImplementation);

    // assert
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ logs: 'sample logs' });
    expect(getWorkflowLogs).toHaveBeenCalled();
  });

  it('POST /api/workflow should call createWorkflowAndProject controller', async () => {
    // arrange
    const WorkflowData = {
      userId: 1,
      triggerEvent: 'push',
      ymlContent: '- name: Deploy to EC2 on merge\n  on:\n    push:\n      branches:\n        - main\n  jobs:\n    build_and_deploy:\n',
      repoUrl: 'https://github.com/test/repo',
      projectFolderName: 'test-project',
      workflowFileName: 'workflow.yml',
      commitHash: 'abc123',
      commitMessage: 'Test commit'
    };

    const mockImplementation = (req, res) => res.status(201).send({ workflowId: 1 });

    // act
    const response = await sendPostRequest('/api/workflow', WorkflowData, createWorkflowAndProject, mockImplementation);

    // assert
    expect(response.status).toBe(201);
    expect(response.body).toEqual({ workflowId: 1 });
    expect(createWorkflowAndProject).toHaveBeenCalled();
  });

  it('GET /api/workflow/user/:userId should call getWorkflowsByUser controller', async () => {
    // arrange
    const mockImplementation = (req, res) => res.status(200).send([{ id: 1, name: 'test workflow' }]);

    // act
    const response = await sendGetRequest('/api/workflow/user/1', getWorkflowsByUser, mockImplementation);

    // assert
    expect(response.status).toBe(200);
    expect(response.body).toEqual([{ id: 1, name: 'test workflow' }]);
    expect(getWorkflowsByUser).toHaveBeenCalled();
  });

  it('GET /api/workflow/workflow/:workflowId should call getWorkflowById controller', async () => {
    // arrange
    const mockImplementation = (req, res) => res.status(200).send({ id: 1, name: 'test workflow' });

    // act
    const response = await sendGetRequest('/api/workflow/workflow/1', getWorkflowById, mockImplementation);

    // assert
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: 1, name: 'test workflow' });
    expect(getWorkflowById).toHaveBeenCalled();
  });
});
