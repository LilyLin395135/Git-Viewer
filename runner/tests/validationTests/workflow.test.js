import request from 'supertest';
import app from '../../server';

describe('Trigger workflow to CICD', () => {
  // Test case 1: event not exist is invalid
  it('event is required', async () => {
    const response = await request(app)
      .post('/api/workflow/trigger')
      .send({});
    expect(response.status).toBe(400);
    expect(response.body.errors[0].msg).toBe('event is required');
  });
  // Test case 2: ymlContent not exist is invalid
  it('ymlContent is required', async () => {
    const response = await request(app)
      .post('/api/workflow/trigger')
      .send({ event: 'push' });
    expect(response.status).toBe(400);
    expect(response.body.errors[0].msg).toBe('ymlContent is required');
  });
  // Test case 3: repoUrl not exist is invalid
  it('repoUrl is required', async () => {
    const response = await request(app)
      .post('/api/workflow/trigger')
      .send({ event: 'push', ymlContent: '- name: Deploy to EC2 on merge\n  on:\n    push:\n      branches:\n        - main\n  jobs:\n    build_and_deploy:\n' });
    expect(response.status).toBe(400);
    expect(response.body.errors[0].msg).toBe('repoUrl is required');
  });
});

describe('Get workflow docker logs', () => {
  // Test case 1: containerName not exist is invalid
  it('containerName is required', async () => {
    const response = await request(app)
      .get('/api/workflow/logs/temp_container_1')
      .send({});
    expect(response.status).toBe(400);
    expect(response.body.errors[0].msg).toBe('containerName is required');
  });
});
