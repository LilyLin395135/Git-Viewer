import request from 'supertest';
import app from '../../server';

describe('User sign up', () => {
  it('email is required', async () => {
    const response = await request(app)
      .post('/api/user/signup')
      .send({});
    expect(response.status).toBe(400);
    const errors = response.body.errors.map(err => err.msg);
    expect(errors).toContain('email is required');
    expect(errors).toContain('password is required');
  });
  it('password is required', async () => {
    const response = await request(app)
      .post('/api/user/signup')
      .send({ email: 'user@example.com' });
    expect(response.status).toBe(400);
    expect(response.body.errors[0].msg).toBe('password is required');
  });
});
