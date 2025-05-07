import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './clubList.css';

const ClubList = () => {
  const [clubs, setClubs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/clubs')
      .then((res) => setClubs(res.data))
      .catch((err) => console.error('Error fetching clubs:', err));
  }, []);

  const filteredClubs = clubs.filter(club =>
    (club.club_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (club.Country || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (club.Stadium || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (club.manager_name || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="club-list-container">
      <h2 className="club-list-title">Clubs</h2>

      <input
        type="text"
        placeholder="Search by name, country, stadium, or manager..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

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
          {filteredClubs.map(club => (
            <tr key={club.Club_id}>
              <td><img src={club.logo_url} alt={club.club_name} className="club-logo" /></td>
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
  );
};

export default ClubList;
