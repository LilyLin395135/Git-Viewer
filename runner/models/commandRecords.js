import pool from './databasePool.js';

export async function createCommandRecord(userId, executedAt, commands, results) {
  const query = `
        INSERT INTO command_records (user_id, executed_at, commands, results) 
        VALUES (?, ?, ?, ?)
    `;
  const [result] = await pool.query(
    query,
    [userId, executedAt, JSON.stringify(commands), JSON.stringify(results)]
  );
  return result.insertId;
}

export async function getAllCommandRecordsByUserId(userId) {
  const query = `
        SELECT * FROM command_records WHERE user_id = ? ORDER BY executed_at DESC
    `;
  const [records] = await pool.query(query, [userId]);
  return records.map((record) => ({
    ...record,
    commands: record.commands,
    results: record.results
  }));
}
