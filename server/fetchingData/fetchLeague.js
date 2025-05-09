const pool = require('../Database/models/user').pool

const fetchLeagues = async (req, res) => {
  try {
    const [leagues] = await pool.query(`
      SELECT 
        League_id,
        Most_goals,
        Most_assists,
        Most_Clean_Sheets,
        Most_saves,
        Most_red_cards,
        most_yellow_cards,
        name,
        most_goals_player_name,
        most_assister_name,
        most_clean_sheet_name,
        most_saves_name,
        most_red_cards_name,
        most_yellow_card_name
      FROM league
      ORDER BY League_id ASC;
    `)
    res.status(200).json(leagues)
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching league data', error: error.message })
  }
}

module.exports = fetchLeagues
