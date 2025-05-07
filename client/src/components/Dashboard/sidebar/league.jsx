import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './league.css'

const LeagueList = () => {
  const [leagues, setLeagues] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/leagues')
      .then((res) => {
        setLeagues(res.data)
      })
      .catch((err) => console.error('Error fetching leagues:', err))
  }, [])

  const filteredLeagues = leagues.filter((league) =>
    league.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="league-list-container">
      <h1 className="league-list-title">League Statistics</h1>

      <div className="filters-container">
        <div className="filter-group">
          <input
            type="text"
            placeholder="Search by league name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="filter-input"
          />
        </div>
      </div>

      <div className="table-container">
        <table className="table-auto">
          <thead className="table-header">
            <tr>
              <th>League Name</th>
              <th>Most Goals</th>
              <th>Top Scorer</th>
              <th>Most Assists</th>
              <th>Top Assister</th>
              <th>Most Clean Sheets</th>
              <th>Clean Sheet Leader</th>
              <th>Most Saves</th>
              <th>Top Goalkeeper</th>
              <th>Most Red Cards</th>
              <th>Most Yellow Cards</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {filteredLeagues.map((league) => (
              <tr key={league.League_id}>
                <td>{league.name || 'N/A'}</td>
                <td>{league.Most_goals || 'N/A'}</td>
                <td>{league.most_goals_player_name || 'N/A'}</td>
                <td>{league.Most_assists || 'N/A'}</td>
                <td>{league.most_assister_name || 'N/A'}</td>
                <td>{league.Most_Clean_Sheets || 'N/A'}</td>
                <td>{league.most_clean_sheet_name || 'N/A'}</td>
                <td>{league.Most_saves || 'N/A'}</td>
                <td>{league.most_saves_name || 'N/A'}</td>
                <td>
                  {league.Most_red_cards || 'N/A'} -{' '}
                  {league.most_red_cards_name || 'N/A'}
                </td>
                <td>
                  {league.most_yellow_cards || 'N/A'} -{' '}
                  {league.most_yellow_card_name || 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default LeagueList
