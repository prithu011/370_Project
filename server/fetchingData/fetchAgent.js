// const pool = require('../Database/models/user').pool

// const fetchAgents = async (req, res) => {
//   try {
//     const [agents] = await pool.query(`
//       SELECT
//         Agent_id,
//         Name,
//         Contact_info
//       FROM agent
//       ORDER BY Agent_id ASC;
//     `)
//     res.status(200).json(agents)
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: 'Error fetching agent data', error: error.message })
//   }
// }

// module.exports = fetchAgents
