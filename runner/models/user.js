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

export async function getUserById(id) {
  const query = 'SELECT * FROM users WHERE id = ?';
  const [user] = await pool.query(query, [id]);
  if (user.length) {
    return user[0];
  }
  throw new Error(`User ID=${id} not found`);
}

export async function getUserByEmail(email) {
  const query = 'SELECT * FROM users WHERE email = ?';
  const [user] = await pool.query(query, [email]);
  if (user.length) {
    return user[0];
  }
  return null;
}
