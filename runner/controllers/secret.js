import fs from 'fs';
import path from 'path';
import { createSecret, getAllSecretsWithUserId, deleteSecret, patchSecret } from '../models/secret.js';

const appDirectory = process.cwd(); // 當前工作資料夾

export async function createUserSecret(req, res) {
  try {
    const { userId, name, value } = req.body;
    let filePath = null;

    // Check if value contains BEGIN RSA PRIVATE KEY
    if (value.includes('BEGIN RSA PRIVATE KEY')) {
      // Create a directory if it doesn't exist
      const directoryPath = path.join(appDirectory, '..', 'secrets');
      if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath);
      }

      // Save the value to a file
      const fileName = `${userId}-${name}-${Date.now()}.pem`;
      filePath = path.join(directoryPath, fileName);
      fs.writeFileSync(filePath, value);

      // Update filePath to be relative for easier management
      filePath = `secrets/${fileName}`;
    }

    const secretId = await createSecret(userId, name, value, filePath);
    res.status(201).json({ id: secretId });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
}

export async function getAllSecretsByUserId(req, res) {
  try {
    const { userId } = req.query;
    const secrets = await getAllSecretsWithUserId(userId);
    res.status(200).json({ secrets });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
}

export async function deleteSecretById(req, res) {
  try {
    const { userId, secretId } = req.params;
    await deleteSecret(userId, secretId);
    res.status(200).json({ message: 'Secret deleted successfully' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
}

export async function patchSecretById(req, res) {
  try {
    const { name, value } = req.body;
    const { secretId } = req.params;
    await patchSecret(secretId, name, value);
    res.status(200).json({ message: 'Secret updated successfully' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
}
