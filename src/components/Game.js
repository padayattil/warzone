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
    const rockPositions = this.placeRocksOnMap();
    const weaponPositions = this.placeWeaponsOnMap({...rockPositions});
    const armyPositions = this.placeArmyOnMap({...rockPositions, ...weaponPositions});
    let redArmy, greenArmy, armyPosition;
    for(const position in armyPositions) {
      armyPosition = position.split('_')
      if (armyPositions.hasOwnProperty(position)) {
        if(armyPositions[position] === 'redArmy') {
          redArmy = {
            name: 'Red Army',
            life: 100,
            weapon: 'knife',
            rowIndex: parseInt(armyPosition[0]),
            colIndex: parseInt(armyPosition[1])
          }
        }
        if(armyPositions[position] === 'redArmy') {
          greenArmy = {
            name: 'Green Army',
            life: 100,
            weapon: 'knife',
            rowIndex: parseInt(armyPosition[0]),
            colIndex: parseInt(armyPosition[1])
          }
        }
      }
    }
    return ({
      mapData: {...rockPositions, ...weaponPositions, ...armyPositions},
      turn: ['redArmy', 'greenArmy'][getRandomIntInclusive(0,1)],
      redArmy,
      greenArmy
    })
  }

  getEmptyMapPosition(mapData) {
    let cellRow, cellColumn;
    do {
      cellRow = getRandomIntInclusive(0, this.MAP_SIZE-1)
      cellColumn = getRandomIntInclusive(0, this.MAP_SIZE-1)
    } while(typeof mapData[`${cellRow}_${cellColumn}`] !== 'undefined');
    return {cellRow, cellColumn};
  }

  placeRocksOnMap() {
    const rockPositions = {};
    for (let i = 0; i < this.MAP_SIZE; i++) {
      for (let j = 0; j < this.MAP_SIZE; j++) {
        if(Math.random() < this.ROCKS_PROBABILITY)
          rockPositions[`${i}_${j}`] =  'rocks';
      }
    }
    return rockPositions;
  }

  placeWeaponsOnMap(mapData) {
    let remainingWeapons = getRandomIntInclusive(2,4);
    let emptyPosition;
    do {
      emptyPosition = this.getEmptyMapPosition(mapData);
      mapData[`${emptyPosition.cellRow}_${emptyPosition.cellColumn}`] = ['knife', 'gun', 'grenade', 'tank'][getRandomIntInclusive(0, 3)];
      remainingWeapons -= 1;
    } while(remainingWeapons !== 0);
    return mapData;
  }

  isAdjacentPositions(pos1, pos2) {
    return (Math.abs(pos1.cellRow-pos2.cellRow)+Math.abs(pos1.cellColumn-pos2.cellColumn)) < 2;
  }

  placeArmyOnMap(mapData) {
    let redArmyPosition = this.getEmptyMapPosition(mapData);
    let greenArmyPosition;
    do {
      greenArmyPosition = this.getEmptyMapPosition(mapData);
    } while(this.isAdjacentPositions(redArmyPosition, greenArmyPosition));
    mapData[`${redArmyPosition.cellRow}_${redArmyPosition.cellColumn}`] = 'redArmy';
    mapData[`${greenArmyPosition.cellRow}_${greenArmyPosition.cellColumn}`] = 'greenArmy';
    return mapData;
  }

  render() {
    if(this.state.mapData !== null) {
      return (
        <div id="Game" className="d-flex">
          <PlayerStats  stats={this.state.redArmy} />
          <GameMap
            mapData={this.state.mapData}
            mapSize={this.MAP_SIZE}
            currentArmy={this.state[this.state.turn]} />
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
