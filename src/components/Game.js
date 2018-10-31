import React, { Component } from 'react';

import PlayerStats from './PlayerStats';
import GameMap from './GameMap';

class Game extends Component {
  constructor(props) {
    super(props);
    const [mapSize, mapData] = [10, []];
    for (let i = 0; i < mapSize; i++) {
      var row = []
      for (let j = 0; j < mapSize; j++) {
        row.push({position: `${i}_${j}`});
      }
      mapData.push(row);
    }
    this.state = {
      mapData: mapData,
      redArmy: {
        name: 'Red Army',
        life: 100,
        weapon: 'knife'
      },
      greenArmy: {
        name: 'Green Army',
        life: 100,
        weapon: 'knife'
      }
    }
  }

  render() {
    return (
      <div id="Game" className="d-flex">
        <PlayerStats  stats={this.state.redArmy} />
        <GameMap mapData={this.state.mapData} />
        <PlayerStats  stats={this.state.greenArmy} />
      </div>
    );
  }
}

export default Game;
