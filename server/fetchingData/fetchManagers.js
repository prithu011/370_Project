const pool = require('../Database/models/user').pool

const fetchManagers = async (req, res) => {
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
    `)
    res.status(200).json(managers)
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching manager data', error: error.message })
  }
}

module.exports = fetchManagers
