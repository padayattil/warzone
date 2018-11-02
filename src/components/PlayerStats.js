import React from 'react';

function PlayerStats(props) {
  const army = props.army;
  return (
    <div className="PlayerStats p-3 d-flex flex-column align-items-center">
      <div className={army.iconClass}></div>
      <h3 className="text-center">{army.name}</h3>
      <h3 className="text-center">{army.life}</h3>
      <h3 className="text-center">{army.weapon}</h3>
    </div>
  );
}

export default PlayerStats;
