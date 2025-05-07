const express = require('express')
const pool = require('./Database/models/user').pool // Assuming you're using a MySQL connection pool
const router = express.Router()

const developerEmails = [
  'tanjum.ibnul.mahmud@g.bracu.ac.bd',
  'tohanahin121@gmail.com',
]

// Middleware to check if the user is an admin
const isAdmin = (req, res, next) => {
  const userEmail = req.body.email
  if (developerEmails.includes(userEmail)) {
    next()
  } else {
    res.status(403).json({ message: 'Access denied. You are not an admin.' })
  }
}

// Fetch data from the "Managers" table
router.get('/fetchManagers', isAdmin, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM managers')
    res.status(200).json(rows)
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching data from Managers table',
      error: error.message,
    })
  }
})

// Fetch data from the "Players" table
router.get('/fetchPlayers', isAdmin, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM players')
    res.status(200).json(rows)
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching data from Players table',
      error: error.message,
    })
  }
})

// Fetch data from the "Clubs" table
router.get('/fetchClubs', isAdmin, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM clubs')
    res.status(200).json(rows)
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching data from Clubs table',
      error: error.message,
    })
  }
})

// Update data in a specific table
router.post('/table/:tableName', isAdmin, async (req, res) => {
  const { tableName } = req.params
  const { data } = req.body

  try {
    const { id, ...updateData } = data
    await pool.query(`UPDATE ?? SET ? WHERE id = ?`, [
      tableName,
      updateData,
      id,
    ])
    res.status(200).json({ message: `Data updated in ${tableName}` })
  } catch (error) {
    res.status(500).json({
      message: `Error updating data in ${tableName}`,
      error: error.message,
    })
  }
})
// Update a row in the selected table
// router.post('/update:table', async (req, res) => {
//   const { table } = req.params
//   const { data } = req.body

//   try {
//     // Disable foreign key checks
//     await pool.query('SET FOREIGN_KEY_CHECKS = 0')

//     // Perform the update
//     const keys = Object.keys(data)
//     const values = Object.values(data)
//     const updateQuery = `UPDATE ${table} SET ${keys
//       .map((key) => `${key} = ?`)
//       .join(', ')} WHERE id = ?`
//     await pool.query(updateQuery, [...values, data.id])

//     // Re-enable foreign key checks
//     await pool.query('SET FOREIGN_KEY_CHECKS = 1')

//     res.status(200).json({ message: 'Row updated successfully!' })
//   } catch (error) {
//     console.error('Error updating row:', error)
//     res.status(500).json({ message: 'Failed to update row.', error })
//   }
// })

module.exports = router
