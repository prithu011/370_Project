import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './ManagerList.css' // Assuming you have a CSS file for styling

const ManagerList = () => {
  const [managers, setManagers] = useState([])
  const [filters, setFilters] = useState({
    name: '',
    nationality: '',
    age: '',
    market_value: '',
  })

  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/managers')
        setManagers(response.data) // Set the fetched managers data in state
      } catch (error) {
        console.error('Error fetching managers:', error)
      }
    }

    fetchManagers()
  }, []) // Run this effect once when the component mounts

  const filteredManagers = managers.filter((manager) => {
    return (
      (!filters.name ||
        manager.Name.toLowerCase().includes(filters.name.toLowerCase())) &&
      (!filters.nationality ||
        manager.Nationality.toLowerCase().includes(
          filters.nationality.toLowerCase()
        )) &&
      (!filters.age || manager.Age.toString().includes(filters.age)) &&
      (!filters.market_value ||
        manager.Market_value.toString()
          .toLowerCase()
          .includes(filters.market_value.toLowerCase()))
    )
  })
  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <div className="manager-container">
      <h2 className="manager-title">Manager List</h2>

      <div className="filters-container">
        <div className="filter-group">
          <input
            type="text"
            placeholder="Search by name..."
            value={filters.name}
            onChange={(e) => handleFilterChange('name', e.target.value)}
            className="filter-input"
          />
        </div>
        <div className="filter-group">
          <input
            type="text"
            placeholder="Search by nationality..."
            value={filters.nationality}
            onChange={(e) => handleFilterChange('nationality', e.target.value)}
            className="filter-input"
          />
        </div>
        <div className="filter-group">
          <input
            type="number"
            placeholder="Search by age..."
            value={filters.age}
            onChange={(e) => handleFilterChange('age', e.target.value)}
            className="filter-input"
          />
        </div>
        <div className="filter-group">
          <input
            type="text"
            placeholder="Search by market value..."
            value={filters.market_value}
            onChange={(e) => handleFilterChange('market_value', e.target.value)}
            className="filter-input"
          />
        </div>
      </div>

      {/* Manager Table */}
      <table className="manager-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>ID</th>
            <th>Name</th>
            <th>Nationality</th>
            <th>Age</th>
            <th>Contract Period</th>
            <th>Previous Club</th>
            <th>Current Club</th>
            <th>Free Agent</th>
            <th>Market Value</th>
            <th>Approved</th>
            <th>Transfer ID</th>
            <th>Trophies</th>
          </tr>
        </thead>
        <tbody>
          {filteredManagers.length > 0 ? (
            filteredManagers.map((manager) => (
              <tr key={manager.Manager_id}>
                <td>
                  <img src={manager.Manager_pic_url} alt={manager.Name} />
                </td>
                <td>{manager.Manager_id}</td>
                <td>{manager.Name}</td>
                <td>{manager.Nationality}</td>
                <td>{manager.Age}</td>
                <td>{manager.contract_period}</td>
                <td>{manager.Previous_club}</td>
                <td>{manager.current_club}</td>
                <td>{manager.Is_free_agent ? 'Yes' : 'No'}</td>
                <td>{manager.Market_value}</td>
                <td>{manager.is_approved_by_manager ? 'Yes' : 'No'}</td>
                <td>{manager.manager_tran_id}</td>
                <td>{manager.manager_trophies}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="13" style={{ textAlign: 'center' }}>
                No managers found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default ManagerList
