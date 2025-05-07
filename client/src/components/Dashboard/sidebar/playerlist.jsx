import React, { useEffect, useState, useCallback, memo } from 'react'
import axios from 'axios'
import './playerList.css'
import PlayerCard from '../../playercard/playercard'

// Memoized filter component
const PlayerFilters = memo(({ filters, onFilterChange }) => (
  <div className="filters-container">
    <div className="filter-group">
      <input
        type="text"
        placeholder="Search by name..."
        value={filters.name}
        onChange={(e) => onFilterChange('name', e.target.value)}
        className="filter-input"
      />
    </div>
    <div className="filter-group">
      <input
        type="text"
        placeholder="Search by position..."
        value={filters.position}
        onChange={(e) => onFilterChange('position', e.target.value)}
        className="filter-input"
      />
    </div>
    <div className="filter-group">
      <input
        type="text"
        placeholder="Search by nationality..."
        value={filters.nationality}
        onChange={(e) => onFilterChange('nationality', e.target.value)}
        className="filter-input"
      />
    </div>
    <div className="filter-group">
      <input
        type="text"
        placeholder="Search by foot..."
        value={filters.foot}
        onChange={(e) => onFilterChange('foot', e.target.value)}
        className="filter-input"
      />
    </div>
    <div className="filter-group">
      <input
        type="text"
        placeholder="Search by club..."
        value={filters.club}
        onChange={(e) => onFilterChange('club', e.target.value)}
        className="filter-input"
      />
    </div>
    <div className="filter-group age-range">
      <input
        type="number"
        placeholder="Min age"
        value={filters.ageMin}
        onChange={(e) => onFilterChange('ageMin', e.target.value)}
        className="filter-input age-input"
      />
      <span>-</span>
      <input
        type="number"
        placeholder="Max age"
        value={filters.ageMax}
        onChange={(e) => onFilterChange('ageMax', e.target.value)}
        className="filter-input age-input"
      />
    </div>
  </div>
))

const PlayerList = () => {
  const [players, setPlayers] = useState([])
  const [selectedPlayer, setSelectedPlayer] = useState(null)
  const [overallRating, setOverallRating] = useState(null)
  const [filters, setFilters] = useState({
    name: '',
    position: '',
    nationality: '',
    foot: '',
    club: '',
    ageMin: '',
    ageMax: '',
  })

  const fetchPlayers = useCallback(async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/players')
      setPlayers(res.data)
    } catch (err) {
      console.error('Error fetching players:', err)
    }
  }, [])

  useEffect(() => {
    fetchPlayers()
  }, [fetchPlayers])

  const handleFilterChange = useCallback((field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }))
  }, [])

  const handleViewPlayer = useCallback((player) => {
    setSelectedPlayer(player)
    setOverallRating(Math.floor(Math.random() * (90 - 85 + 1)) + 85)
  }, [])

  const filteredPlayers = React.useMemo(() => {
    return players.filter(
      (player) =>
        (!filters.name ||
          player.name?.toLowerCase().includes(filters.name.toLowerCase())) &&
        (!filters.position ||
          player.position
            ?.toLowerCase()
            .includes(filters.position.toLowerCase())) &&
        (!filters.nationality ||
          player.player_nationality
            ?.toLowerCase()
            .includes(filters.nationality.toLowerCase())) &&
        (!filters.foot ||
          player.foot?.toLowerCase().includes(filters.foot.toLowerCase())) &&
        (!filters.club ||
          player.club_name
            ?.toLowerCase()
            .includes(filters.club.toLowerCase())) &&
        (!filters.ageMin || player.age >= parseInt(filters.ageMin)) &&
        (!filters.ageMax || player.age <= parseInt(filters.ageMax))
    )
  }, [players, filters])

  return (
    <div className="player-list-container">
      <h1 className="player-list-title">All Players</h1>
      <PlayerFilters filters={filters} onFilterChange={handleFilterChange} />

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
              <th>Actions</th>
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
                <td>{player.name || 'N/A'}</td>
                <td>{player.position || 'N/A'}</td>
                <td>{player.player_nationality || 'N/A'}</td>
                <td>{player.player_jersey || 'N/A'}</td>
                <td>{player.age || 'N/A'}</td>
                <td>{player.foot || 'N/A'}</td>
                <td>{player.club_name || 'N/A'}</td>
                <td>{player.matches || 'N/A'}</td>
                <td>{player.goals || 'N/A'}</td>
                <td>{player.assists || 'N/A'}</td>
                <td>{player.pen_goal || '0'}</td>
                <td>{player.yellow_card || 'N/A'}</td>
                <td>{player.red_card || '0'}</td>
                <td>{player.player_trophies || 'N/A'}</td>
                <td>{player.market_value || 'N/A'}</td>
                <td>{player.contract_period || 'N/A'}</td>
                <td>{player.is_free_agent ? 'Yes' : 'No'}</td>
                <td className="action-buttons">
                  <button
                    className="view-button"
                    onClick={() => handleViewPlayer(player)}
                  >
                    View
                  </button>
                  <button
                    className="view-button"
                    onClick={() => handleViewPlayer(player)}
                  >
                    Update
                  </button>
                  <button
                    className="view-button"
                    onClick={() => handleViewPlayer(player)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedPlayer && (
        <div className="popup-overlay" onClick={() => setSelectedPlayer(null)}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <PlayerCard
              player={selectedPlayer}
              overallRating={overallRating}
              onClose={() => setSelectedPlayer(null)}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default memo(PlayerList)
