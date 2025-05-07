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
// Fetch data from the "Leagues" table
router.get('/fetchLeagues', isAdmin, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM league')
    res.status(200).json(rows)
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching data from Leagues table',
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

// Update data in the "Players" table
router.post('/updatePlayers', isAdmin, async (req, res) => {
  const updatedRow = req.body.data

  try {
    const keys = Object.keys(updatedRow).filter((key) => key !== 'player_id')
    const values = keys.map((key) => updatedRow[key])
    const setClause = keys.map((key) => `${key} = ?`).join(', ')

    const query = `UPDATE Players SET ${setClause} WHERE player_id = ?`
    await pool.query(query, [...values, updatedRow.player_id])

    res.status(200).json({ message: 'Player updated successfully' })
  } catch (error) {
    console.error('Error updating player:', error)
    res
      .status(500)
      .json({ message: 'Failed to update player', error: error.message })
  }
})

// Update data in the "Leagues" table
router.post('/updateLeagues', isAdmin, async (req, res) => {
  const updatedRow = req.body.data

  try {
    const keys = Object.keys(updatedRow).filter((key) => key !== 'League_id')
    const values = keys.map((key) => updatedRow[key])
    const setClause = keys.map((key) => `${key} = ?`).join(', ')

    const query = `UPDATE league SET ${setClause} WHERE League_id = ?`
    await pool.query(query, [...values, updatedRow.League_id])

    res.status(200).json({ message: 'League updated successfully' })
  } catch (error) {
    console.error('Error updating league:', error)
    res
      .status(500)
      .json({ message: 'Failed to update league', error: error.message })
  }
})

// Update data in the "Managers" table
router.post('/updateManagers', isAdmin, async (req, res) => {
  const updatedRow = req.body.data

  try {
    const keys = Object.keys(updatedRow).filter((key) => key !== 'manager_id')
    const values = keys.map((key) => updatedRow[key])
    const setClause = keys.map((key) => `${key} = ?`).join(', ')

    const query = `UPDATE Managers SET ${setClause} WHERE manager_id = ?`
    await pool.query(query, [...values, updatedRow.manager_id])

    res.status(200).json({ message: 'Manager updated successfully' })
  } catch (error) {
    console.error('Error updating manager:', error)
    res
      .status(500)
      .json({ message: 'Failed to update manager', error: error.message })
  }
})

// Update data in the "Clubs" table
router.post('/updateClubs', isAdmin, async (req, res) => {
  const updatedRow = req.body.data

  try {
    const keys = Object.keys(updatedRow).filter((key) => key !== 'club_id')
    const values = keys.map((key) => updatedRow[key])
    const setClause = keys.map((key) => `${key} = ?`).join(', ')

    const query = `UPDATE Clubs SET ${setClause} WHERE club_id = ?`
    await pool.query(query, [...values, updatedRow.club_id])

    res.status(200).json({ message: 'Club updated successfully' })
  } catch (error) {
    console.error('Error updating club:', error)
    res
      .status(500)
      .json({ message: 'Failed to update club', error: error.message })
  }
})

module.exports = router
