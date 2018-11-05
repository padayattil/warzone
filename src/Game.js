import $ from 'jquery';

import { getRandomIntInclusive } from './utils';
import { MAP_SIZE,ROCKS_PROBABILITY,MAX_WALK_DISTANCE,WEAPONS } from './utils/constants';

import GameMap from './GameMap';
import PlayerStats from './PlayerStats';

class Game {
  constructor() {
    this.initTriggers();
    this.state = this.getInitialState();
    this.playerStats = new PlayerStats();
    this.gameMap = new GameMap();
  }

  initTriggers() {
    $(document).on('click', '.army-accessible-cell', (e) => {
      const mapCellKey = $(e.target).data('key');
    });
  }

  getInitialState() {
    const obstaclePositions = this.placeObstaclesOnMap();
    const weaponPositions = this.placeWeaponsOnMap({...obstaclePositions});
    const armyPositions = this.placeArmyOnMap({...obstaclePositions, ...weaponPositions});
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
      mode: 'patrol',
      mapData: {...obstaclePositions, ...weaponPositions, ...armyPositions},
      turn: ['yellowArmy', 'blueArmy'][getRandomIntInclusive(0,1)],
      yellowArmy,
      blueArmy
    })
  }

  getEmptyMapPosition(mapData) {
    let cellRow, cellColumn;
    do {
      cellRow = getRandomIntInclusive(0, MAP_SIZE-1)
      cellColumn = getRandomIntInclusive(0, MAP_SIZE-1)
    } while(typeof mapData[`${cellRow}_${cellColumn}`] !== 'undefined');
    return {cellRow, cellColumn};
  }

  placeObstaclesOnMap() {
    const obstaclePositions = {};
    for (let i = 0; i < MAP_SIZE; i++) {
      for (let j = 0; j < MAP_SIZE; j++) {
        if(Math.random() < ROCKS_PROBABILITY)
          obstaclePositions[`${i}_${j}`] =  ['rocks','trees', 'czech-hedgehog'][getRandomIntInclusive(0,2)];
      }
    }
    return obstaclePositions;
  }

  placeWeaponsOnMap(mapData) {
    let remainingWeapons = getRandomIntInclusive(2,4);
    let emptyPosition;
    do {
      emptyPosition = this.getEmptyMapPosition(mapData);
      mapData[`${emptyPosition.cellRow}_${emptyPosition.cellColumn}`] = Object.keys(WEAPONS)[getRandomIntInclusive(0, 3)];
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

  html() {
    if(this.state.mapData !== null) {
      return (
        `${this.playerStats.html(this.state.yellowArmy)}
        ${
          this.gameMap.html(
            this.state.mapData,
            this.state[this.state.turn])
        }
        ${(this.playerStats.html(this.state.blueArmy))}`
      );
    }
    return (
      `<div class="display-3">Loading game...</div>`
    );
  }

  render() {
    $("#Game").html(this.html());
  }
}

export default Game;
