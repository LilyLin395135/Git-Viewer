import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createUser, getUserById, getUserByEmail } from '../models/user.js';

function createTokenData(user) {
  const userInformation = {
    id: user.id,
    email: user.email
  };
  const token = jwt.sign(userInformation, process.env.JWT_SECRET);
  return { token, userInformation };
}

function handleError(error, res) {
  if (res.headersSent) return;
  if (error.name === 'TokenExpiredError') {
    return res.status(401).json({ message: 'token expired' });
  }
  if (error.name === 'JsonWebTokenError') {
    return res.status(403).json({ message: 'wrong token' });
  }
  res.status(error.statusCode || 500).json({ message: error.message });
}

export async function signUp(req, res) {
  const { email, password } = req.body;
  try {
    const hashPassword = await bcrypt.hash(password, 10);
    const userId = await createUser(email, hashPassword);
    const user = await getUserById(userId);

    const { token, userInformation } = createTokenData(user);

    res.status(201).json({
      data: {
        access_token: token,
        user: userInformation
      }
    });
  } catch (error) {
    handleError(error, res);
  }
}

export async function signIn(req, res) {
  const { email, password } = req.body;
  try {
    const user = await getUserByEmail(email);
    if (!user) {
      res.status(403).json({ message: 'User not found.' });
    }

    const passwordIsValid = await bcrypt.compare(password, user.password_hash);
    if (!passwordIsValid) {
      res.status(403).json({ message: 'Password is incorrect.' });
    }

    const { token, userInformation } = createTokenData(user);

    res.status(200).json({
      data: {
        access_token: token,
        user: userInformation
      }
    });
  } catch (error) {
    handleError(error, res);
  }
}
