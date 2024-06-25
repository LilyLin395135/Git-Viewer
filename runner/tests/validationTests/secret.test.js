import request from 'supertest';
import app from '../../server';

describe('Create Secret', () => {
  // Test case 1: userId not exist is invalid
  it('userId is required', async () => {
    const response = await request(app)
      .post('/api/secret')
      .send({});
    expect(response.status).toBe(400);
    expect(response.body.errors[0].msg).toBe('userId is required');
  });
  // Test case 2: name not exist is invalid
  it('name is required', async () => {
    const response = await request(app)
      .post('/api/secret')
      .send({ userId: 1 });
    expect(response.status).toBe(400);
    expect(response.body.errors[0].msg).toBe('name is required');
  });
  // Test case 3: ec2Username not exist is invalid
  it('value is required', async () => {
    const response = await request(app)
      .post('/api/secret')
      .send({ userId: 1, name: '13wefdea54ewf4' });
    expect(response.status).toBe(400);
    expect(response.body.errors[0].msg).toBe('value is required');
  });
});

describe('Get All Secrets', () => {
  it('userId is required', async () => {
    const response = await request(app)
      .get('/api/secret')
      .query({});
    expect(response.status).toBe(400);
    expect(response.body.errors[0].msg).toBe('userId is required');
  });
});

describe('Delete Secret', () => {
  it('userId is required', async () => {
    const response = await request(app)
      .delete('/api/secret/1');
    expect(response.status).toBe(400);
    expect(response.body.errors[0].msg).toBe('userId is required');
  });
});
