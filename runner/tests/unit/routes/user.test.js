import request from 'supertest';
import app from '../../../server.js';
import { signIn, signUp } from '../../../controllers/user.js';

jest.mock('../../../controllers/user.js');

describe('User Routes', () => {
  // Setup before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const signupData = {
    email: 'test@example.com',
    password: 'password123'
  };

  const token = 'sample_token';
  const userInformation = {
    id: 1,
    email: 'test@example.com'
  };

  const sendPostRequest = async (url, data, mockFunction, mockImplementation) => {
    mockFunction.mockImplementation(mockImplementation);
    const response = await request(app).post(url).send(data);
    return response;
  };

  it('POST /api/user/signup should call signUp controller', async () => {
    // arrange
    const mockImplementation = (req, res) => res.status(201).send({ data: {
      access_token: token,
      user: userInformation
    }
    });

    // act
    const response = await sendPostRequest('/api/user/signup', signupData, signUp, mockImplementation);

    // assert
    expect(response.status).toBe(201);
    expect(response.body).toEqual({ data: {
      access_token: token,
      user: userInformation
    } });
    expect(signUp).toHaveBeenCalled();
  });
  it('POST /api/user/signin should call signIn controller', async () => {
    // arrange
    const mockImplementation = (req, res) => res.status(200).send({ data: {
      access_token: token,
      user: userInformation
    }
    });

    // act
    const response = await sendPostRequest('/api/user/signin', signupData, signIn, mockImplementation);

    // assert
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ data: {
      access_token: token,
      user: userInformation
    } });
    expect(signIn).toHaveBeenCalled();
  });
});
