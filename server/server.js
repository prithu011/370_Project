const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { addUser, updateUserSession } = require('./Database/models/user');

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(bodyParser.json());

// API routes
app.get('/api', (req, res) => {
  res.json({ users: ['userOne', 'userTwo', 'userThree'] });
});

app.post('/api/login', async (req, res) => {
  try {
    
    const { email, role } = req.body;
    console.log(req.body);
    
    const user = await addUser(email, role);
    
    // console.log(user)
    res.status(200).json({ message: 'User logged in', user });
    // res.status(500).json({ message: 'User logged in', user });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in user', error: error.message });
  }
});

app.post('/api/logout', async (req, res) => {
  const { email } = req.body;
  try {
    await updateUserSession(email);
    res.status(200).json({ message: 'User logged out' });
  } catch (error) {
    res.status(500).json({ message: 'Error logging out user', error: error.message });
  }
});

// Add a new API endpoint to handle Google login data
app.post('/api/google-login', async (req, res) => {
  const { email, name, role } = req.body;
  try {
    const user = await addUser(email, role, name); // Assuming addUser can handle name
    res.status(200).json({ message: 'Google user logged in', user });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in Google user', error: error.message });
  }
});

// Add a new API endpoint to handle user registration
app.post('/api/register', async (req, res) => {
  const { first, last, email, password } = req.body;
  try {
    const user = await addUser(email, 'user', `${first} ${last}`);
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
});

app.listen(5000, () => {
  console.log('Server started on port 5000');
});
