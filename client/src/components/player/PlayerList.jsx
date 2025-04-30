import React from 'react';
import PlayerCard from './PlayerCard';

const PlayerList = ({ players }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {players.map((player) => (
        <PlayerCard key={player.id} player={player} />
      ))}
    </div>
  );
};

export default PlayerList;
