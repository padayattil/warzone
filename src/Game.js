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

    $(document).on('click', '.battle-action-defend', (e) => {
      this.battleActionDefend();
    });

    $(document).on('click', '.battle-action-attack', (e) => {
      this.battleActionAttack();
    });

    $(document).on('click', '.game-over-go-home', (e) => {
      window.location.href = '/';
    });

    $(document).on('click', '.game-over-play-again', (e) => {
      this.state = this.getInitialState();
      this.render();
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
            battleAction: null,
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
            battleAction: null,
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
    if(this.isAdjacentPositions({rowIndex, colIndex}=this.state.yellowArmy, {rowIndex, colIndex}=this.state.blueArmy)) {
      this.state.mode = 'battle';
    }

    this.state.turn = currentArmy.key === 'yellowArmy' ? 'blueArmy' : 'yellowArmy';
    this.render();
  }

  battleActionDefend() {
    console.log('defend');
    const currentArmy = this.state[this.state.turn];
    const otherArmy = this.state[currentArmy.key === 'yellowArmy' ? 'blueArmy' : 'yellowArmy'];

    this.state[currentArmy.key].battleAction = 'defend';
    this.state.turn = otherArmy.key;
    this.render();
  }

  battleActionAttack() {
    console.log('attack');
    const currentArmy = this.state[this.state.turn];
    const otherArmy = this.state[currentArmy.key === 'yellowArmy' ? 'blueArmy' : 'yellowArmy'];

    const currentArmyWeoponPower = WEAPONS[currentArmy.weapon].power;
    this.state[otherArmy.key].life -= (this.state[otherArmy.key].battleAction === 'defend' ? currentArmyWeoponPower/2 : currentArmyWeoponPower);
    if(this.state[otherArmy.key].life < 0)
      this.state[otherArmy.key].life = 0;

    this.state[currentArmy.key].battleAction = 'attack';
    this.state.turn = otherArmy.key;
    this.render();

    if(otherArmy.life === 0){
      $("#gameOverModalBody").html(`${currentArmy.name} won the battle.`);
      console.log('Game Over!');
      $('#gameOverModal').modal()
    }
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
