import React, { Component } from 'react';

import PlayerStats from './PlayerStats';
import GameMap from './GameMap';
import { getRandomIntInclusive } from '../utils';

class Game extends Component {
  ROCKS_PROBABILITY = 0.2;

  constructor(props) {
    super(props);

    const [mapSize, mapData] = [10, []];
    for (let i = 0; i < mapSize; i++) {
      var row = []
      for (let j = 0; j < mapSize; j++) {
        row.push({
          position: `${i}_${j}`,
          cellItemClass: (Math.random() < this.ROCKS_PROBABILITY) ? 'rocks' : ''
        });
      }
      mapData.push(row);
    }
    let remainingWeapons = getRandomIntInclusive(2,4);
    let cellRow;
    let cellColumn;
    while(remainingWeapons !== 0) {
      cellRow = getRandomIntInclusive(0,mapSize-1)
      cellColumn = getRandomIntInclusive(0,mapSize-1)
      if(mapData[cellRow][cellColumn].cellItemClass !== '') {
        mapData[cellRow][cellColumn]
          .cellItemClass = ['knife', 'gun', 'grenade', 'tank'][getRandomIntInclusive(0,3)]
        remainingWeapons -= 1
      }
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
