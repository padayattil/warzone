import $ from 'jquery';

import { getRandomIntInclusive } from './utils';
import { MAP_SIZE,OBSTACLE_PROBABILITY,MAX_WALK_DISTANCE,WEAPONS } from './utils/constants';

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
      const [rowIndex, colIndex] = $(e.target).data('key').split('_');
      this.moveArmy({rowIndex, colIndex});
    });
  }

  getInitialState() {
    const obstaclePositions = this.placeObstaclesOnMap();
    const weaponPositions = this.placeWeaponsOnMap({...obstaclePositions});
    const armyPositions = this.setArmyPositions({...obstaclePositions, ...weaponPositions});
    let yellowArmy, blueArmy, armyPosition;
    for(const position in armyPositions) {
      armyPosition = position.split('_')
      if (armyPositions.hasOwnProperty(position)) {
        if(armyPositions[position] === 'yellowArmy') {
          yellowArmy = {
            key: 'yellowArmy',
            name: 'Yellow Army',
            iconClass: 'army army-yellow',
            life: 100,
            weapon: 'knife',
            battleStrategy: null,
            rowIndex: parseInt(armyPosition[0]),
            colIndex: parseInt(armyPosition[1])
          }
        }
        if(armyPositions[position] === 'blueArmy') {
          blueArmy = {
            key: 'blueArmy',
            name: 'Blue Army',
            iconClass: 'army army-blue',
            life: 100,
            weapon: 'knife',
            battleStrategy: null,
            rowIndex: parseInt(armyPosition[0]),
            colIndex: parseInt(armyPosition[1])
          }
        }
      }
    }
    return ({
      mode: 'patrol',
      mapData: {...obstaclePositions, ...weaponPositions},
      turn: ['yellowArmy', 'blueArmy'][getRandomIntInclusive(0,1)],
      yellowArmy,
      blueArmy
    })
  }

  getEmptyMapPosition(mapData) {
    let rowIndex, colIndex;
    do {
      rowIndex = getRandomIntInclusive(0, MAP_SIZE-1)
      colIndex = getRandomIntInclusive(0, MAP_SIZE-1)
    } while(typeof mapData[`${rowIndex}_${colIndex}`] !== 'undefined');
    return {rowIndex, colIndex};
  }

  placeObstaclesOnMap() {
    const obstaclePositions = {};
    for (let i = 0; i < MAP_SIZE; i++) {
      for (let j = 0; j < MAP_SIZE; j++) {
        if(Math.random() < OBSTACLE_PROBABILITY)
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
      mapData[`${emptyPosition.rowIndex}_${emptyPosition.colIndex}`] = Object.keys(WEAPONS)[getRandomIntInclusive(0, 3)];
      remainingWeapons -= 1;
    } while(remainingWeapons !== 0);
    return mapData;
  }

  isAdjacentPositions(pos1, pos2) {
    return (Math.abs(pos1.rowIndex-pos2.rowIndex)+Math.abs(pos1.colIndex-pos2.colIndex)) < 2;
  }

  setArmyPositions(mapData) {
    let yellowArmyPosition = this.getEmptyMapPosition(mapData);
    let blueArmyPosition;
    do {
      blueArmyPosition = this.getEmptyMapPosition(mapData);
    } while(this.isAdjacentPositions(yellowArmyPosition, blueArmyPosition));
    mapData[`${yellowArmyPosition.rowIndex}_${yellowArmyPosition.colIndex}`] = 'yellowArmy';
    mapData[`${blueArmyPosition.rowIndex}_${blueArmyPosition.colIndex}`] = 'blueArmy';
    return mapData;
  }

  moveArmy({rowIndex, colIndex}) {
    console.log(rowIndex, colIndex);
    const currentArmy = this.state[this.state.turn];
    delete this.state.mapData[`${currentArmy.rowIndex}_${currentArmy.colIndex}`];
    this.state[this.state.turn].rowIndex = parseInt(rowIndex);
    this.state[this.state.turn].colIndex = parseInt(colIndex);
    this.state.mapData[`${rowIndex}_${colIndex}`] = currentArmy.key;
    this.state.turn = currentArmy.key === 'yellowArmy' ? 'blueArmy' : 'yellowArmy';
    if(this.isAdjacentPositions({rowIndex, colIndex}=this.state.yellowArmy, {rowIndex, colIndex}=this.state.blueArmy)) {
      this.state.mode = 'battle';
    }
    this.render();
  }

  html() {
    console.log(this.state);
    if(this.state.mapData !== null) {
      return (
        `${this.playerStats.html(this.state, this.state.yellowArmy)}
        ${this.gameMap.html(this.state)}
        ${(this.playerStats.html(this.state, this.state.blueArmy))}`
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
