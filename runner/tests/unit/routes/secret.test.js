import request from 'supertest';
import app from '../../../server.js';
import { createUserSecret, getAllSecretsByUserId, deleteSecretById, patchSecretById } from '../../../controllers/secret.js';

jest.mock('../../../controllers/secret.js');

describe('Secret Routes', () => {
  // Setup before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('POST /api/secret should call createUserSecret controller', async () => {
    // arrange
    const data = {
      userId: 1,
      name: 'test-secret',
      value: 'test-value'
    };
    const secretId = 1;
    createUserSecret.mockImplementation((req, res) => res.status(201).send({ id: secretId }));
    // act
    const response = await request(app).post('/api/secret').send(data);
    // assert
    expect(response.status).toBe(201);
    expect(response.body).toEqual({ id: secretId });
    expect(createUserSecret).toHaveBeenCalled();
  });
  it('GET /api/secret should call createUserSecret controller', async () => {
    // arrange
    const secrets = [{ id: 1, name: 'secret1', value: 'value1' }];

    getAllSecretsByUserId.mockImplementation((req, res) => res.status(200).send({ secrets }));
    // act
    const response = await request(app).get('/api/secret?userId=1');
    // assert
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ secrets });
    expect(getAllSecretsByUserId).toHaveBeenCalled();
  });
  it('DELETE /api/secret should call createUserSecret controller', async () => {
    // arrange
    deleteSecretById.mockImplementation((req, res) => res.status(200).send({ message: 'Secret deleted successfully' }));
    // act
    const response = await request(app).delete('/api/secret/1/1');
    // assert
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Secret deleted successfully' });
    expect(deleteSecretById).toHaveBeenCalled();
  });
  it('PATCH /api/secret should call createUserSecret controller', async () => {
    // arrange
    const data = {
      name: 'test-secret',
      value: 'test-value'
    };
    patchSecretById.mockImplementation((req, res) => res.status(200).send({ message: 'Secret updated successfully' }));
    // act
    const response = await request(app).patch('/api/secret/1').send(data);
    // assert
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Secret updated successfully' });
    expect(patchSecretById).toHaveBeenCalled();
  });
});
