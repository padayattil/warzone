import React from 'react';

function GameMap(props) {
  return (
    <div id="GameMap" className="d-flex flex-column">
      {props.mapData.map((row, rowIndex) => (
        <div key={rowIndex} className="map-row d-flex">
          {row.map((cell, cellIndex) => (
            <div key={cellIndex} className="map-cell"></div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default GameMap;
