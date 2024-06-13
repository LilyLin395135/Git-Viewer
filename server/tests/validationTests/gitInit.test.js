import request from 'supertest';
import app from '../../server';

describe('Git Init Validator', () => {
  // Test case 1: folderPath not exist is invalid
  it('folderPath is required', async () => {
    const response = await request(app)
      .post('/api/init')
      .send({});
    expect(response.status).toBe(400);
    expect(response.body.errors[0].msg).toBe('folderPath is required');
  });
});
