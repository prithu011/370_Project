import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './playerList.css'
import PlayerCard from '../../playercard/playercard'

const PlayerList = () => {
  const [players, setPlayers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPlayer, setSelectedPlayer] = useState(null)

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/players')
      .then((res) => setPlayers(res.data))
      .catch((err) => console.error('Error fetching players:', err))
  }, [])

  const filteredPlayers = players.filter((player) => {
    return (
      (player.name &&
        player.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (player.market_value &&
        player.market_value.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (player.foot &&
        player.foot.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (player.club_name &&
        player.club_name.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  })

  return (
    <div className="player-list-container">
      <h1 className="player-list-title">All Players</h1>

      <input
        type="text"
        placeholder="Search by name, market value, foot, or club..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <div className="table-container">
        <table className="table-auto">
          <thead className="table-header">
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Position</th>
              <th>Nationality</th>
              <th>Jersey</th>
              <th>Age</th>
              <th>Foot</th>
              <th>Club</th>
              <th>Matches</th>
              <th>Goals</th>
              <th>Assists</th>
              <th>Pen Goals</th>
              <th>Yellow</th>
              <th>Red</th>
              <th>Trophies</th>
              <th>Market Value</th>
              <th>Contract</th>
              <th>Free Agent?</th>
              <th>Player Card</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {filteredPlayers.map((player) => (
              <tr key={player.player_id}>
                <td>
                  <img
                    src={player.image_url}
                    alt={player.name}
                    className="table-image"
                  />
                </td>
                <td>{player.name}</td>
                <td>{player.position}</td>
                <td>{player.player_nationality}</td>
                <td>{player.player_jersey}</td>
                <td>{player.age}</td>
                <td>{player.foot}</td>
                <td>{player.club_name || 'N/A'}</td>
                <td>{player.matches}</td>
                <td>{player.goals}</td>
                <td>{player.assists}</td>
                <td>{player.pen_goal}</td>
                <td>{player.yellow_card}</td>
                <td>{player.red_card}</td>
                <td>{player.player_trophies}</td>
                <td>{player.market_value}</td>
                <td>{player.contract_period}</td>
                <td>{player.is_free_agent ? 'Yes' : 'No'}</td>
                <td>
                  <button
                    className="view-button"
                    onClick={() => setSelectedPlayer(player)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Player Card Modal */}
      {selectedPlayer && (
        <div className="popup-overlay" onClick={() => setSelectedPlayer(null)}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <PlayerCard
              player={selectedPlayer}
              onClose={() => setSelectedPlayer(null)}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default PlayerList
