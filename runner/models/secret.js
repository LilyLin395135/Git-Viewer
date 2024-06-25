import pool from './databasePool.js';

export async function createSecret(userId, name, value, filePath) {
  const query = `
  INSERT INTO secrets ( user_id, name, value, path ) 
  VALUES (?, ?, ?, ?)
  `;

  const [result] = await pool.query(
    query,
    [userId, name, value, filePath]
  );
  return result.insertId;
}

export async function getAllSecretsWithUserId(userId) {
  const query = `
  SELECT * FROM secrets WHERE user_id = ? 
  `;

  const [secrets] = await pool.query(
    query,
    [userId]
  );
  return secrets;
}

export async function deleteSecret(userId, secretId) {
  const query = `
  DELETE FROM secrets WHERE user_id = ? AND id = ?
  `;

  const [result] = await pool.query(
    query,
    [userId, secretId]
  );
  return result;
}
