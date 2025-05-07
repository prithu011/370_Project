const mysql = require('mysql2/promise')

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'brac1234@#',
  database: 'footballdb',
})

const addUser = async (email, role, name = '') => {
  try {
    const [rows] = await pool.query('SELECT * FROM user WHERE email = ?', [
      email,
    ])
    if (rows.length === 0) {
      await pool.query('INSERT INTO user (email, name) VALUES (?, ?)', [
        email,
        name,
      ])
      const [x] = await pool.query('SELECT * FROM user WHERE email = ?', [
        email,
      ])
      const userID = x[0].User_id

      await pool.query('INSERT INTO user_role (Urole, Rid) VALUES (?, ?)', [
        role,
        userID,
      ])
    }
    const userID = rows[0].User_id
    return { userID, email, role, name, sessionActive: true }
  } catch (error) {
    console.error('Error adding user:', error.message)
    throw error
  }
}

const updateUserSession = async (email) => {
  try {
    await pool.query('UPDATE users SET sessionActive = ? WHERE email = ?', [
      false,
      email,
    ])
    return { email, sessionActive: false }
  } catch (error) {
    console.error('Error updating user session:', error.message)
    throw error
  }
}
const fetchUsers = async () => {
  try {
    const [rows] = await pool.query('SELECT * FROM user') // Replace 'user' with your actual table name
    return rows
  } catch (error) {
    console.error('Error fetching users:', error.message)
    throw error
  }
}

module.exports = { addUser, updateUserSession, fetchUsers, pool }
