import { createSecret } from '../models/secret.js';

export async function createUserSecret(req, res) {
  try {
    const secretId = await createSecret(req.body);
    res.status(201).json({ id: secretId });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
}
