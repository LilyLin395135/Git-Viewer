import fs from 'fs';
import path from 'path';
import { createUserSecret, getAllSecretsByUserId, deleteSecretById, patchSecretById } from '../../../controllers/secret.js';
import { createSecret, getAllSecretsWithUserId, deleteSecret, patchSecret } from '../../../models/secret.js';

jest.mock('../../../models/secret.js');
jest.mock('fs');
jest.mock('path');

describe('Secret Controller', () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      body: {
        userId: 1,
        name: 'test-secret',
        value: 'test-value'
      },
      query: {
        userId: 1
      },
      params: {
        userId: 1,
        secretId: 1
      }
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      headerSent: false
    };
    jest.clearAllMocks();
  });

  const setupMocks = (mockFunction, mockResolvedValue) => {
    mockFunction.mockResolvedValue(mockResolvedValue);
  };

  const setupErrorMocks = (mockFunction, error) => {
    mockFunction.mockRejectedValue(error);
  };

  describe('createUserSecret', () => {
    it('should create a new secret and return its ID', async () => {
      // arrange
      setupMocks(createSecret, 1);
      // act
      await createUserSecret(req, res);
      // assert
      expect(createSecret).toHaveBeenCalledWith(1, 'test-secret', 'test-value', null);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ id: 1 });
    });
    it('should handle errors correctly', async () => {
      // arrange
      const error = new Error('Test error');
      setupErrorMocks(createSecret, error);
      // act
      await createUserSecret(req, res);
      // assert
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Test error' });
    });
  });
  describe('getAllSecretsByUserId', () => {
    it('should return all secrets for a user', async () => {
      // arrange
      const secrets = [{ id: 1, name: 'secret1', value: 'value1' }];
      setupMocks(getAllSecretsWithUserId, secrets);
      // act
      await getAllSecretsByUserId(req, res);
      // assert
      expect(getAllSecretsWithUserId).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ secrets });
    });
    it('should handle errors correctly', async () => {
      // arrange
      const error = new Error('Test error');
      setupErrorMocks(getAllSecretsWithUserId, error);

      // act
      await getAllSecretsByUserId(req, res);

      // assert
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Test error' });
    });
  });
  describe('deleteSecretById', () => {
    it('should delete a secret and return a success message', async () => {
      // arrange
      setupMocks(deleteSecret, 1);

      // act
      await deleteSecretById(req, res);

      // assert
      expect(deleteSecret).toHaveBeenCalledWith(1, 1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Secret deleted successfully' });
    });

    it('should handle errors correctly', async () => {
      // arrange
      const error = new Error('Test error');
      setupErrorMocks(deleteSecret, error);

      // act
      await deleteSecretById(req, res);

      // assert
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Test error' });
    });
  });

  describe('patchSecretById', () => {
    it('should update a secret and return a success message', async () => {
      // arrange
      setupMocks(patchSecret, 1);

      // act
      await patchSecretById(req, res);

      // assert
      expect(patchSecret).toHaveBeenCalledWith(1, 'test-secret', 'test-value');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Secret updated successfully' });
    });

    it('should handle errors correctly', async () => {
      // arrange
      const error = new Error('Test error');
      setupErrorMocks(patchSecret, error);

      // act
      await patchSecretById(req, res);

      // assert
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Test error' });
    });
  });
});
