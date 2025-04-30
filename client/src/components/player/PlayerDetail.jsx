import React from 'react';
import PlayerStatsViewer from './PlayerStatsViewer';
import PlayerTeamBadge from './PlayerTeamBadge';
import PlayerNationalityFlag from './PlayerNationalityFlag';
// import PlayerConsoleIcon from './PlayerConsoleIcon';
import PlayerPositionTag from './PlayerPositionTag';

const PlayerDetail = ({ player }) => {
  return (
    <div className="p-6 bg-white rounded-2xl shadow-md space-y-4">
      <img src={player.avatar} alt="avatar" className="w-32 h-32 rounded-full" />
      <h2 className="text-2xl font-bold">{player.USERNAME}</h2>
      <div>Email: {player.EMAIL}</div>
      <div>Age: {player.AGE}</div>
      <PlayerTeamBadge teamId={player.TEAM_id} />
      <PlayerNationalityFlag nationalityId={player.NATIONALITY_id} />
      {/* <PlayerConsoleIcon consoleId={player.CONSOLE_id} /> */}
      <PlayerPositionTag positionId={player.POSITION_id} />
      <PlayerStatsViewer statsId={player.STATS_id} />
    </div>
  );
};

export default PlayerDetail;
