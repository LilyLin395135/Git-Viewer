import pool from './databasePool.js';

export async function createUser(email, hashPassword) {
  const query = `
  INSERT INTO users (email, password_hash) 
  VALUES (?, ?)
  `;

  const [result] = await pool.query(
    query,
    [email, hashPassword]
  );
  return result.insertId;
}
