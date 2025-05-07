const pool = require('../Database/models/user').pool

const fetchClubs = async (req, res) => {
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
    `)
    res.status(200).json(clubs)
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching club data', error: error.message })
  }
}

module.exports = fetchClubs
