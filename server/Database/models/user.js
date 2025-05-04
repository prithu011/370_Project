const mysql = require('mysql2/promise');

// Create a connection pool to the MySQL database
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root', // Replace with your MySQL username
  password: '123456789', // Replace with your MySQL password
  database: 'footballdb',
});

// Update the addUser function to save to the MySQL database
const addUser = async (email, role, name = '') => {
  try {
    const [rows] = await pool.query('SELECT * FROM user WHERE email = ?', [email]);
    if (rows.length === 0) {
      await pool.query('INSERT INTO user (email, name) VALUES (?, ?)', [email, name]);
      const [x] = await pool.query('SELECT * FROM user WHERE email = ?', [email]);
      const userID = x[0].User_id

      await pool.query('INSERT INTO user_role (Urole, Rid) VALUES (?, ?)', [role, userID]);

    }
    const userID = rows[0].User_id
    return {userID, email, role, name, sessionActive: true };
  } catch (error) {
    console.error('Error adding user:', error.message);
    throw error;
  }
};

// Update the updateUserSession function to modify the MySQL database
const updateUserSession = async (email) => {
  try {
    await pool.query('UPDATE users SET sessionActive = ? WHERE email = ?', [false, email]);
    return { email, sessionActive: false };
  } catch (error) {
    console.error('Error updating user session:', error.message);
    throw error;
  }
};

module.exports = { addUser, updateUserSession };