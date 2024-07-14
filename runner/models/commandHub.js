import pool from './databasePool.js';

export async function createCommand(userId, scenario, commands) {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const [result] = await connection.query(
      'INSERT INTO commands (user_id, scenario, usage_count) VALUES (?, ?, 0)',
      [userId, scenario]
    );
    const commandId = result.insertId;

    const commandItems = commands.map((command) => [commandId, command]);
    await connection.query(
      'INSERT INTO command_items (command_id, command) VALUES ?',
      [commandItems]
    );

    await connection.commit();
    return commandId;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

export async function getAllCommandsWithUserId(userId) {
  const [commands] = await pool.query(
    'SELECT * FROM commands WHERE user_id = ?',
    [userId]
  );

  for (const command of commands) {
    const [commandItems] = await pool.query(
      'SELECT command FROM command_items WHERE command_id = ?',
      [command.id]
    );
    command.commands = commandItems.map((item) => item.command);
  }

  return commands;
}

export async function patchCommand(userId, commandId, scenario, commands) {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    await connection.query(
      'UPDATE commands SET scenario = ? WHERE user_id = ? AND id = ?',
      [scenario, userId, commandId]
    );

    await connection.query(
      'DELETE FROM command_items WHERE command_id = ?',
      [commandId]
    );

    const commandItems = commands.map((command) => [commandId, command]);
    await connection.query(
      'INSERT INTO command_items (command_id, command) VALUES ?',
      [commandItems]
    );

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

export async function deleteCommand(userId, commandId) {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    await connection.query(
      'DELETE FROM commands WHERE user_id = ? AND id = ?',
      [userId, commandId]
    );

    await connection.query(
      'DELETE FROM command_items WHERE command_id = ?',
      [commandId]
    );

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}
