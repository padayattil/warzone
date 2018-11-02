import React, { Component } from 'react';

import PlayerStats from './PlayerStats';
import GameMap from './GameMap';
import { getRandomIntInclusive } from '../utils';

class Game extends Component {
  MAP_SIZE = 10;
  ROCKS_PROBABILITY = 0.2;
  MAX_WALK_DISTANCE = 3;

  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState() {
    const rockPositions = this.placeRocksOnMap();
    const weaponPositions = this.placeWeaponsOnMap({...rockPositions});
    const armyPositions = this.placeArmyOnMap({...rockPositions, ...weaponPositions});
    let yellowArmy, blueArmy, armyPosition;
    for(const position in armyPositions) {
      armyPosition = position.split('_')
      if (armyPositions.hasOwnProperty(position)) {
        if(armyPositions[position] === 'yellowArmy') {
          yellowArmy = {
            name: 'Yellow Army',
            iconClass: 'army army-yellow',
            life: 100,
            weapon: 'knife',
            rowIndex: parseInt(armyPosition[0]),
            colIndex: parseInt(armyPosition[1])
          }
        }
        if(armyPositions[position] === 'yellowArmy') {
          blueArmy = {
            name: 'Blue Army',
            iconClass: 'army army-blue',
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
      turn: ['yellowArmy', 'blueArmy'][getRandomIntInclusive(0,1)],
      yellowArmy,
      blueArmy
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
    let yellowArmyPosition = this.getEmptyMapPosition(mapData);
    let blueArmyPosition;
    do {
      blueArmyPosition = this.getEmptyMapPosition(mapData);
    } while(this.isAdjacentPositions(yellowArmyPosition, blueArmyPosition));
    mapData[`${yellowArmyPosition.cellRow}_${yellowArmyPosition.cellColumn}`] = 'yellowArmy';
    mapData[`${blueArmyPosition.cellRow}_${blueArmyPosition.cellColumn}`] = 'blueArmy';
    return mapData;
  }

  render() {
    if(this.state.mapData !== null) {
      return (
        <div id="Game" className="d-flex">
          <PlayerStats  army={{...this.state.blueArmy}} />
          <GameMap
            mapData={{...this.state.mapData}}
            mapSize={this.MAP_SIZE}
            maxWalkDistance={this.MAX_WALK_DISTANCE}
            currentArmy={this.state[this.state.turn]} />
          <PlayerStats  army={{...this.state.yellowArmy}} />
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
