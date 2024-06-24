import pool from './databasePool.js';

export async function createSecret(userSecretData) {
  const { userId, ec2SshKey, ec2Username, ec2HostDns } = userSecretData;

  const query = `
  INSERT INTO ec2_credentials ( user_id, ec2_ssh_key, ec2_username, ec2_host_dns) 
  VALUES (?, ?, ?, ?)
  `;

  const [result] = await pool.query(
    query,
    [userId, ec2SshKey, ec2Username, ec2HostDns]
  );
  return result.insertId;
}
