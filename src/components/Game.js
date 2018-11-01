import React, { Component } from 'react';

import PlayerStats from './PlayerStats';
import GameMap from './GameMap';
import { getRandomIntInclusive } from '../utils';

class Game extends Component {
  MAP_SIZE = 10;
  ROCKS_PROBABILITY = 0.2;

  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
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

  placeMapRocks(mapData) {
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
    return mapData;
  }

  getMapEmptyPosition(mapData) {
    let cellRow, cellColumn;
    while(true) {
      cellRow = getRandomIntInclusive(0, this.MAP_SIZE-1)
      cellColumn = getRandomIntInclusive(0, this.MAP_SIZE-1)
      if(mapData[cellRow][cellColumn].cellItemClass !== '')
        return {cellRow, cellColumn};
    }
  }

  isAdjacentPositions(pos1, pos2) {
    return (Math.abs(pos1.cellRow-pos2.cellRow)+Math.abs(pos1.cellColumn-pos2.cellColumn)) < 2;
  }

  placeMapWeapons(mapData) {
    let remainingWeapons = getRandomIntInclusive(2,4);
    let emptyPosition;
    do {
      emptyPosition = this.getMapEmptyPosition(mapData);
      mapData[emptyPosition.cellRow][emptyPosition.cellColumn]
        .cellItemClass = ['knife', 'gun', 'grenade', 'tank'][getRandomIntInclusive(0, 3)];
      remainingWeapons -= 1;
    } while(remainingWeapons !== 0);
  }

  placeMapArmy(mapData) {
    let redArmyPosition = this.getMapEmptyPosition(mapData);
    let greenArmyPosition;
    do {
      greenArmyPosition = this.getMapEmptyPosition(mapData);
    } while(this.isAdjacentPositions(redArmyPosition, greenArmyPosition));
    console.log(redArmyPosition, greenArmyPosition);
    mapData[redArmyPosition.cellRow][redArmyPosition.cellColumn].cellItemClass = 'army army-red';
    mapData[greenArmyPosition.cellRow][greenArmyPosition.cellColumn].cellItemClass = 'army army-green';
  }

  generateMapData() {
    const mapData = this.placeMapRocks([]);
    this.placeMapWeapons(mapData);
    this.placeMapArmy(mapData);
    return mapData;
  }

  render() {
    if(this.state.mapData !== null) {
      return (
        <div id="Game" className="d-flex">
          <PlayerStats  stats={this.state.redArmy} />
          <GameMap mapData={this.state.mapData} />
          <PlayerStats  stats={this.state.greenArmy} />
        </div>
      );
    }
    return (
      <div id="Game" className="d-flex">
        <div className="display-3">Loading game...</div>
      </div>
    );
  }
}

export default Game;
