import bcrypt from 'bcrypt';
import { createUser } from '../models/user.js';

export async function signUp(req, res) {
  const { email, password } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);
  try {
    const userId = await createUser(email, hashPassword);
    res.status(201).json({ id: userId });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
}
