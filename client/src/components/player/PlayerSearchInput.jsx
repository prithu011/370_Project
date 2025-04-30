import React from 'react';

const PlayerSearchInput = ({ onSearch }) => {
  return (
    <input
      type="text"
      placeholder="Search by username or email"
      onChange={(e) => onSearch(e.target.value)}
      className="input"
    />
  );
};

export default PlayerSearchInput;
