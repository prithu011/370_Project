const express = require('express')
const router = express.Router()
const mysql = require('mysql2/promise')

// Get user preferences
router.get('/preferences/:userId', async (req, res) => {
  const pool = mysql.createPool(dbConfig)
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM user_preferences WHERE user_id = ?',
      [req.params.userId]
    )
    res.json(rows[0] || { balance: 1000000 })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Set user preferred club
router.post('/preferences', async (req, res) => {
  const pool = mysql.createPool(dbConfig)
  const { userId, clubId } = req.body
  try {
    await pool.execute(
      'INSERT INTO user_preferences (user_id, preferred_club_id) VALUES (?, ?) ON DUPLICATE KEY UPDATE preferred_club_id = ?',
      [userId, clubId, clubId]
    )
    res.json({ message: 'Preferences updated' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Buy item
router.post('/buy', async (req, res) => {
  const pool = mysql.createPool(dbConfig)
  const { userId, itemId, itemType, price } = req.body

  const conn = await pool.getConnection()
  try {
    await conn.beginTransaction()

    // Check user balance
    const [user] = await conn.execute(
      'SELECT balance FROM user_preferences WHERE user_id = ?',
      [userId]
    )

    if (!user[0] || user[0].balance < price) {
      throw new Error('Insufficient funds')
    }

    // Update balance
    await conn.execute(
      'UPDATE user_preferences SET balance = balance - ? WHERE user_id = ?',
      [price, userId]
    )

    // Record transaction
    await conn.execute(
      'INSERT INTO transfer_history (user_id, item_id, item_type, amount) VALUES (?, ?, ?, ?)',
      [userId, itemId, itemType, price]
    )

    // Add to user items
    await conn.execute(
      'INSERT INTO user_items (user_id, item_id, item_type) VALUES (?, ?, ?)',
      [userId, itemId, itemType]
    )

    await conn.commit()
    res.json({
      message: 'Purchase successful',
      newBalance: user[0].balance - price,
    })
  } catch (error) {
    await conn.rollback()
    res.status(400).json({ message: error.message })
  } finally {
    conn.release()
  }
})

module.exports = router
