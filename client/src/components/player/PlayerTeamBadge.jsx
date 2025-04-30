import React from 'react';

const PlayerTeamBadge = ({ teamId }) => {
  return <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded">Team ID: {teamId}</span>;
};

export default PlayerTeamBadge;
