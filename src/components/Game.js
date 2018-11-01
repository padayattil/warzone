import React, { Component } from 'react';

import PlayerStats from './PlayerStats';
import GameMap from './GameMap';
import { getRandomIntInclusive } from '../utils';

class Game extends Component {
  MAP_SIZE = 10;
  ROCKS_PROBABILITY = 0.2;

  constructor(props) {
    super(props);
    this.state = {
      mapData: this.generateMapData(),
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

  generateMapData() {
    const mapData = [];
    for (let i = 0; i < this.MAP_SIZE; i++) {
      var row = []
      for (let j = 0; j < this.MAP_SIZE; j++) {
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
      cellRow = getRandomIntInclusive(0, this.MAP_SIZE-1)
      cellColumn = getRandomIntInclusive(0, this.MAP_SIZE-1)
      if(mapData[cellRow][cellColumn].cellItemClass !== '') {
        mapData[cellRow][cellColumn]
          .cellItemClass = ['knife', 'gun', 'grenade', 'tank'][getRandomIntInclusive(0, 3)]
        remainingWeapons -= 1
      }
    }
    return mapData;
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
