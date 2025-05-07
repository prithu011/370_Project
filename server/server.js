const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { addUser, updateUserSession, pool } = require('./Database/models/user');

const app = express();


app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(bodyParser.json());


app.get('/api', (req, res) => {
  res.json({ users: ['userOne', 'userTwo', 'userThree'] })
})

app.post('/api/login', async (req, res) => {
  try {
    const { email, role, name } = req.body;
    console.log(req.body);

    
    const user = await addUser(email, role, name || email); 
    res.status(200).json({ message: 'User logged in', user });
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
});


app.post('/api/google-login', async (req, res) => {
  const { email, name, role } = req.body
  try {
 
    const user = await addUser(email, role, name || email);
    res.status(200).json({ message: 'Google user logged in', user });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error logging in Google user', error: error.message })
  }
});


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

// app.get('/new-route', (req, res) => {
//   res.send('This is the new route!');
// });


// fetch players from database
app.get('/api/players', async (req, res) => {
  try {
    const [players] = await pool.query(`
      SELECT 
        player.player_id,
        player.Cclub_id,
        player.name,
        player.agent_id,
        player.assists,
        player.player_trans_id,
        player.user_id,
        player.player_nationality,
        player.player_jersey,
        player.player_trophies,
        club.Club_name AS club_name,
        player.matches,
        player.foot,
        player.yellow_card,
        player.red_card,
        player.pen_goal,
        player.goals,
        player.age,
        player.market_value,
        player.position,
        player.contract_period,
        player.is_free_agent,
        player.image_url
      FROM player
      LEFT JOIN club ON player.Cclub_id = club.Club_id
      LEFT JOIN agent ON player.agent_id = agent.Agent_id
      LEFT JOIN user ON player.user_id = user.User_id
      ORDER BY player.player_id ASC;
    `);
    console.log(players);
    res.status(200).json(players);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching player data', error: error.message });
  }
});


// fetch managers from database
app.get('/api/managers', async (req, res) => {
  try {
    const [managers] = await pool.query(`
        SELECT 
        Manager_id,
        Manager_pic_url,
        Name,
        Nationality,
        Age,
        contract_period,
        Previous_club,
        current_club,
        Is_free_agent,
        Market_value,
        is_approved_by_manager,
        manager_tran_id,
        manager_trophies
      FROM manager
      ORDER BY Manager_id ASC;
    `);
    res.status(200).json(managers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching manager data', error: error.message });
  }
});

// fetch clubs from database
app.get('/api/clubs', async (req, res) => {
  try {
    const [clubs] = await pool.query(`
      SELECT 
        Club.Club_id,
        Club.Country,
        Club.logo_url,
        Club.League_id,
        Club.Manager_id,
        Club.club_name,
        Club.Founded_year,
        Club.Stadium,
        Club.user_id,
        Club.ucl_num,
        Club.league_trophy_num,
        Manager.Name AS manager_name
      FROM Club
      LEFT JOIN Manager ON Club.Manager_id = Manager.Manager_id
      ORDER BY Club.club_name ASC;
    `);
    res.status(200).json(clubs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching club data', error: error.message });
  }
});



app.listen(5000, () => {
  console.log('Server started on port 5000')
})
