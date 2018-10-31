import React from 'react';

function PlayerStats(props) {
  const stats = props.stats;
  return (
    <div id="PlayerStats" className="p-3">
      <h3 className="text-center">{stats.name}</h3>
      <h3 className="text-center">{stats.life}</h3>
      <h3 className="text-center">{stats.weapon}</h3>
    </div>
  );
}

export default PlayerStats;
