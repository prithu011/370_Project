import React from 'react';

const PlayerFilterBar = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-wrap gap-2 p-4">
      <select name="TEAM_id" onChange={handleChange} className="select">
        <option value="">All Teams</option>
      </select>
      <select name="POSITION_id" onChange={handleChange} className="select">
        <option value="">All Positions</option>
      </select>
      <select name="NATIONALITY_id" onChange={handleChange} className="select">
        <option value="">All Nationalities</option>
      </select>
    </div>
  );
};

export default PlayerFilterBar;
