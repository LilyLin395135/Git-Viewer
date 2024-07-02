import pool from './databasePool.js';

export async function createWorkflow(workflowData) {
  const query = 'INSERT INTO workflow SET ?';
  try {
    const [result] = await pool.query(query, workflowData);
    return result.insertId;
  } catch (error) {
    console.error('Failed to save workflow data:', error);
    throw error;
  }
}

// update part or all data
export async function updateWorkflow(id, updateData) {
  // Prepare SQL statement parts
  const keys = Object.keys(updateData);
  const values = Object.values(updateData);

  // Construct SET part of the SQL query dynamically
  const setClause = keys.map((key) => `${key} = ?`).join(', ');

  const query = `UPDATE workflow SET ${setClause} WHERE id = ?`;

  try {
    // Spread the values and append `id` at the end
    const [result] = await pool.query(query, [...values, id]);
    return result.affectedRows; // Return the number of affected rows
  } catch (error) {
    console.error('Database error:', error);
    throw error; // Rethrow to handle it in the caller
  }
}

export async function updateLog(id, logs) {
  const query = 'UPDATE workflow SET log = ? WHERE id = ?';

  try {
    // Spread the values and append `id` at the end
    const [result] = await pool.query(query, [logs, id]);
    return result.affectedRows; // Return the number of affected rows
  } catch (error) {
    console.error('Database error:', error);
    throw error; // Rethrow to handle it in the caller
  }
}

export async function updateStatus(id, status) {
  const query = 'UPDATE workflow SET status = ? WHERE id = ?';

  try {
    // Spread the values and append `id` at the end
    const [result] = await pool.query(query, [status, id]);
    return result.affectedRows; // Return the number of affected rows
  } catch (error) {
    console.error('Database error:', error);
    throw error; // Rethrow to handle it in the caller
  }
}

export async function getProjectIdByRepoUrl(repoUrl) {
  const query = 'SELECT id, project_folder FROM project WHERE repo_url = ?';
  try {
    const [results] = await pool.query(query, [repoUrl]);
    return results.length > 0 ? { id: results[0].id, folder: results[0].project_folder } : null;
  } catch (error) {
    console.error('Failed to retrieve project ID:', error);
    throw error;
  }
}

export async function createProject(projectFolderName, repoUrl) {
  const existingProject = await getProjectIdByRepoUrl(repoUrl);
  if (existingProject) {
    if (existingProject.folder !== projectFolderName) {
      const updateQuery = 'UPDATE project SET project_folder = ? WHERE id = ?';
      try {
        await pool.query(updateQuery, [projectFolderName, existingProject.id]);
      } catch (error) {
        console.error('Failed to update project folder name:', error);
        throw error;
      }
    }
    return existingProject.id; // Return the existing project ID after update
  }

  const insertQuery = 'INSERT INTO project (project_folder, repo_url) VALUES (?, ?)';
  try {
    const [result] = await pool.query(insertQuery, [projectFolderName, repoUrl]);
    return result.insertId; // Return the newly created project ID
  } catch (error) {
    console.error('Failed to create new project:', error);
    throw error;
  }
}

export async function getAllWorkflows(userId) {
  const query = `
      SELECT w.*, p.repo_url, p.project_folder
      FROM workflow w
      INNER JOIN project p ON w.project_id = p.id
      WHERE w.user_id = ?
  `;
  try {
    const [results] = await pool.query(query, [userId]);
    return results;
  } catch (error) {
    console.error('Failed to fetch workflows:', error);
    throw error;
  }
}

export async function getWorkflow(workflowId) {
  const query = `
    SELECT w.*, p.repo_url, p.project_folder
    FROM workflow w
    INNER JOIN project p ON w.project_id = p.id
    WHERE w.id = ?
  `;
  try {
    const [results] = await pool.query(query, [workflowId]);
    return results[0]; // Assuming ID is unique and only one record should be returned
  } catch (error) {
    console.error('Failed to fetch workflow:', error);
    throw error;
  }
}
