import React from 'react';

const PlayerRankBadge = ({ level, rank }) => {
  return (
    <div className="text-sm text-gray-700">
      Level: {level} | Rank: {rank}
    </div>
  );
};

export default PlayerRankBadge;
