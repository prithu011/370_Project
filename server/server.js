const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { addUser, updateUserSession } = require('./Database/models/user')
const fetchPlayers = require('./fetchingData/fetchPlayers')
const fetchClubs = require('./fetchingData/fetchClubs')
const fetchManagers = require('./fetchingData/fetchManagers')
// const fetchAgents = require('./fetchingData/fetchAgents')
const app = express()

const adminRoutes = require('./adminRoutes')
app.use('/api/admin', adminRoutes)
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
)
app.use(bodyParser.json())

// Test API route
app.get('/api', (req, res) => {
  res.json({ users: ['userOne', 'userTwo', 'userThree'] })
})

// User login
app.post('/api/login', async (req, res) => {
  try {
    const { email, role, name } = req.body
    console.log(req.body)

    const user = await addUser(email, role, name || email)
    res.status(200).json({ message: 'User logged in', user })
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error logging in user', error: error.message })
  }
})

// User logout
app.post('/api/logout', async (req, res) => {
  const { email } = req.body
  try {
    await updateUserSession(email)
    res.status(200).json({ message: 'User logged out' })
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error logging out user', error: error.message })
  }
})

// Google login
app.post('/api/google-login', async (req, res) => {
  const { email, name, role } = req.body
  try {
    const user = await addUser(email, role, name || email)
    res.status(200).json({ message: 'Google user logged in', user })
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error logging in Google user', error: error.message })
  }
})

// User registration
app.post('/api/register', async (req, res) => {
  const { first, last, email, password } = req.body
  try {
    const user = await addUser(email, 'user', `${first} ${last}`)
    res.status(201).json({ message: 'User registered successfully', user })
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error registering user', error: error.message })
  }
})

// Fetch players
app.get('/api/players', fetchPlayers)

// Fetch clubs
app.get('/api/clubs', fetchClubs)

// Fetch managers
app.get('/api/managers', fetchManagers)

// // Route for fetching agent data
// app.get('/api/agents', fetchAgents)

// Start the server
app.listen(5000, () => {
  console.log('Server started on port 5000')
})
