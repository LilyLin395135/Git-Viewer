import request from 'supertest';
import app from '../../server';

describe('Create Secret of EC2', () => {
  // Test case 1: userId not exist is invalid
  it('userId is required', async () => {
    const response = await request(app)
      .post('/api/secret')
      .send({});
    expect(response.status).toBe(400);
    expect(response.body.errors[0].msg).toBe('userId is required');
  });
  // Test case 2: ec2SshKey not exist is invalid
  it('ec2SshKey is required', async () => {
    const response = await request(app)
      .post('/api/secret')
      .send({ userId: 1 });
    expect(response.status).toBe(400);
    expect(response.body.errors[0].msg).toBe('ec2SshKey is required');
  });
  // Test case 3: ec2Username not exist is invalid
  it('ec2Username is required', async () => {
    const response = await request(app)
      .post('/api/secret')
      .send({ userId: 1, ec2SshKey: '13wefdea54ewf4' });
    expect(response.status).toBe(400);
    expect(response.body.errors[0].msg).toBe('ec2Username is required');
  });
  // Test case 4: ec2HostDns not exist is invalid
  it('ec2HostDns is required', async () => {
    const response = await request(app)
      .post('/api/secret')
      .send({ userId: 1, ec2SshKey: '13wefdea54ewf4', ec2Username: 'ubuntu' });
    expect(response.status).toBe(400);
    expect(response.body.errors[0].msg).toBe('ec2HostDns is required');
  });
});
