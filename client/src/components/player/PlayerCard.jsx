import React from 'react';
import PlayerTeamBadge from './PlayerTeamBadge';
import PlayerRankBadge from './PlayerRankBadge';

const PlayerCard = ({ player }) => {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-md">
      <img src={player.avatar} alt="avatar" className="w-24 h-24 rounded-full mx-auto" />
      <h3 className="text-xl font-bold text-center mt-2">{player.USERNAME}</h3>
      <div className="text-center text-gray-600">{player.EMAIL}</div>
      <PlayerTeamBadge teamId={player.TEAM_id} />
      <PlayerRankBadge level={player.level} rank={player.rank} />
    </div>
  );
};

export default PlayerCard;
