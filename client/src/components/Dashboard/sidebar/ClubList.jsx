import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './clubList.css'

const ClubList = () => {
  const [clubs, setClubs] = useState([])
  const [filters, setFilters] = useState({
    club_name: '',
    manager_name: '',
    country: '',
  })

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/clubs')
      .then((res) => setClubs(res.data))
      .catch((err) => console.error('Error fetching clubs:', err))
  }, [])

  const filteredClubs = clubs.filter((club) => {
    return (
      (!filters.club_name ||
        club.club_name
          ?.toLowerCase()
          .includes(filters.club_name.toLowerCase())) &&
      (!filters.manager_name ||
        club.manager_name
          ?.toLowerCase()
          .includes(filters.manager_name.toLowerCase())) &&
      (!filters.country ||
        club.Country?.toLowerCase().includes(filters.country.toLowerCase()))
    )
  })

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <div className="club-list-container">
      <h2 className="club-list-title">Clubs</h2>

      <div className="filters-container">
        <div className="filter-group">
          <input
            type="text"
            placeholder="Search by club name..."
            value={filters.club_name}
            onChange={(e) => handleFilterChange('club_name', e.target.value)}
            className="filter-input"
          />
        </div>
        <div className="filter-group">
          <input
            type="text"
            placeholder="Search by manager name..."
            value={filters.manager_name}
            onChange={(e) => handleFilterChange('manager_name', e.target.value)}
            className="filter-input"
          />
        </div>
        <div className="filter-group">
          <input
            type="text"
            placeholder="Search by country..."
            value={filters.country}
            onChange={(e) => handleFilterChange('country', e.target.value)}
            className="filter-input"
          />
        </div>
      </div>

      <table className="club-table">
        <thead>
          <tr>
            <th>Logo</th>
            <th>Club Name</th>
            <th>Manager Name</th>
            <th>Country</th>
            <th>Stadium</th>
            <th>Founded</th>
            <th>UCL Titles</th>
            <th>League Trophies</th>
          </tr>
        </thead>
        <tbody>
          {filteredClubs.map((club) => (
            <tr key={club.Club_id}>
              <td>
                <img
                  src={club.logo_url}
                  alt={club.club_name}
                  className="club-logo"
                />
              </td>
              <td>{club.club_name}</td>
              <td>{club.manager_name || 'N/A'}</td>
              <td>{club.Country}</td>
              <td>{club.Stadium}</td>
              <td>{club.Founded_year}</td>
              <td>{club.ucl_num}</td>
              <td>{club.league_trophy_num}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ClubList
