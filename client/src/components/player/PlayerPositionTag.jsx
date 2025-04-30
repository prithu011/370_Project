import React from 'react';

const PlayerPositionTag = ({ positionId }) => {
  return <span className="bg-green-200 text-green-800 px-2 py-1 rounded">Position: {positionId}</span>;
};

export default PlayerPositionTag;
