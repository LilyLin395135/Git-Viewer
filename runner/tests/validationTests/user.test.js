import request from 'supertest';
import app from '../../server';

describe('User sign up', () => {
  it('email is required', async () => {
    const response = await request(app)
      .post('/api/user')
      .send({});
    expect(response.status).toBe(400);
    expect(response.body.errors[0].msg).toBe('email is required');
  });
  it('password is required', async () => {
    const response = await request(app)
      .post('/api/user')
      .send({ email: 'user@example.com' });
    expect(response.status).toBe(400);
    expect(response.body.errors[0].msg).toBe('password is required');
  });
});
