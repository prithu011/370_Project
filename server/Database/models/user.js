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

const buyItem = async (userId, itemId, itemType, price) => {
  console.log(userId, itemId, itemType, price)

  const connection = await pool.getConnection()
  try {
    await connection.beginTransaction()

    // Check user's balance
    // const [userBalance] = await connection.query(
    //   'SELECT balance FROM user WHERE User_id = ?',
    //   [userId]
    // )

    // if (!userBalance[0] || userBalance[0].balance < price) {
    //   throw new Error('Insufficient funds')
    // }

    // // Update user's balance
    // await connection.query(
    //   'UPDATE user SET balance = balance - ? WHERE User_id = ?',
    //   [price, userId]
    // )

    // Add to owner_user_info table
    await connection.query(
      'INSERT INTO owner_user_info (UUser_id,player_id, manager_id) VALUES (?, ?, ?)',
      [
        userId,
        itemType === 'player' ? itemId : null,
        itemType === 'manager' ? itemId : null,
      ]
    )

    await connection.commit()
    return { success: true }
  } catch (error) {
    await connection.rollback()
    throw error
  } finally {
    connection.release()
  }
}

module.exports = { addUser, updateUserSession, fetchUsers, pool, buyItem }
