import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { signUp, signIn } from '../../../controllers/user.js';
import { createUser, getUserById, getUserByEmail } from '../../../models/user.js';

jest.mock('../../../models/user.js');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('User Controller', () => {
  let req;
  let res;

  const setUpMocksForSignUp = () => {
    bcrypt.hash.mockResolvedValue('hashedPassword');
    createUser.mockResolvedValue(1);
    getUserById.mockResolvedValue({ id: 1, email: 'test@example.com' });
    jwt.sign.mockReturnValue('token');
  };

  const setUpMocksForSigIn = () => {
    getUserByEmail.mockResolvedValue({ id: 1, email: 'test@example.com', password_hash: 'hashedPassword' });
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue('token');
  };

  const setUpErrorMocks = (mockFunction, error) => {
    mockFunction.mockRejectedValue(error);
  };

  beforeEach(() => {
    req = {
      body: {
        email: 'test@example.com',
        password: 'password123'
      }
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      headersSent: false
    };

    jest.clearAllMocks();
  });

  describe('signUp', () => {
    it('should create a new user and return a token', async () => {
      // arrange
      setUpMocksForSignUp();

      // act
      await signUp(req, res);

      // assert
      expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
      expect(createUser).toHaveBeenCalledWith('test@example.com', 'hashedPassword');
      expect(getUserById).toHaveBeenCalledWith(1);
      expect(jwt.sign).toHaveBeenCalledWith({ id: 1, email: 'test@example.com' }, process.env.JWT_SECRET);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        data: {
          access_token: 'token',
          user: { id: 1, email: 'test@example.com' }
        }
      });
    });

    it('should handle errors correctly', async () => {
      // arrange
      const error = new Error('Test error');
      setUpErrorMocks(createUser, error);

      // act
      await signUp(req, res);

      // assert
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Test error' });
    });
  });

  describe('signIn', () => {
    it('should return a token if the user exists and password is correct', async () => {
      // arrange
      setUpMocksForSigIn();

      // act
      await signIn(req, res);

      // assert
      expect(getUserByEmail).toHaveBeenCalledWith('test@example.com');
      expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedPassword');
      expect(jwt.sign).toHaveBeenCalledWith({ id: 1, email: 'test@example.com' }, process.env.JWT_SECRET);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        data: {
          access_token: 'token',
          user: { id: 1, email: 'test@example.com' }
        }
      });
    });

    it('should return 403 if the user does not exist', async () => {
      // arrange
      getUserByEmail.mockResolvedValue(null);

      // act
      await signIn(req, res);

      // assert
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({ message: 'User not found.' });
    });

    it('should return 403 if the password is incorrect', async () => {
      // arrange
      getUserByEmail.mockResolvedValue({ id: 1, email: 'test@example.com', password_hash: 'hashedPassword' });
      bcrypt.compare.mockResolvedValue(false);

      // act
      await signIn(req, res);

      // assert
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({ message: 'Password is incorrect.' });
    });

    it('should handle errors correctly', async () => {
      // arrange
      const error = new Error('Test error');
      setUpErrorMocks(getUserByEmail, error);

      // act
      await signIn(req, res);

      // assert
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Test error' });
    });
  });
});
