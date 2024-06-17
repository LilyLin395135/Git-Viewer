// function createGitInfo(gitInfo) {
//     const stmt = db.prepare('INSERT INTO git_info (data) VALUES (?)');
//     stmt.run(JSON.stringify(gitInfo), (err) => {
//         if (err) {
//             console.error('Error inserting data', err);
//         } else {
//             console.log('Data inserted successfully');
//         }
//     });
//     stmt.finalize();
// };


// function deleteGitInfo() {
//     db.run('DELETE FROM git_info', (err) => {
//         if (err) {
//             console.error('Error deleting data', err);
//         } else {
//             console.log('Data deleted successfully');
//         }
//     })
// };

// function getGitInfo(callback) {
//     db.get('SELECT data FROM git_info', (err, row) => {
//         if (err) {
//             console.error('Error reading from database', err);
//         } else {
//             const gitInfo = JSON.parse(row.data);
//             callback(gitInfo);
//         }
//     });
// };

// function updateGitInfo(gitInfo) {
//     deleteGitInfo();
//     const stmt = db.prepare('INSERT INTO git_info (data) VALUES (?)');
//     stmt.run(JSON.stringify(gitInfo)); // 轉換為 JSON
//     stmt.finalize(); // 釋放資源
// };

