const pool = require('../Database/models/user').pool

const fetchPlayers = async (req, res) => {
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
        player.Club_name AS club_name,
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
    `)
    res.status(200).json(players)
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching player data', error: error.message })
  }
}

module.exports = fetchPlayers
