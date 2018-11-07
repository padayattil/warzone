import { MAP_SIZE,MAX_WALK_DISTANCE,WEAPONS } from './utils/constants';

class GameMap {

  getCellItemClasses(state, rowIndex, colIndex) {
    const currentArmy = state[state.turn];
    if(state.yellowArmy.rowIndex === rowIndex && state.yellowArmy.colIndex === colIndex)
      return state.yellowArmy.iconClass;
    if(state.blueArmy.rowIndex === rowIndex && state.blueArmy.colIndex === colIndex)
      return state.blueArmy.iconClass;
    if(state.mapData[`${rowIndex}_${colIndex}`] === 'rocks')
      return 'rocks';
    if(state.mapData[`${rowIndex}_${colIndex}`] === 'trees')
      return 'trees';
    if(state.mapData[`${rowIndex}_${colIndex}`] === 'czech-hedgehog')
      return 'czech-hedgehog';
    if(state.mapData[`${rowIndex}_${colIndex}`] === 'knife')
      return 'knife';
    if(state.mapData[`${rowIndex}_${colIndex}`] === 'gun')
      return 'gun';
    if(state.mapData[`${rowIndex}_${colIndex}`] === 'grenade')
      return 'grenade';
    if(state.mapData[`${rowIndex}_${colIndex}`] === 'tank')
      return 'tank';
    return '';
  }

  getArmyAccessibility(mapData, currentArmy, otherArmy, rowIndex, colIndex) {
    if(otherArmy.rowIndex === rowIndex && otherArmy.colIndex === colIndex)
      return 'army-inaccessible-cell';

    // compute distance
    let diff;
    if(currentArmy.rowIndex === rowIndex)
      diff = currentArmy.colIndex - colIndex
    else if(currentArmy.colIndex === colIndex)
      diff = currentArmy.rowIndex - rowIndex
    else
      diff = 9999;

    // check if within range. return 'inaccessible' if occupied
    if(Math.abs(diff) === 0)
      return 'current-army-cell';
    if (['rocks', 'trees', 'czech-hedgehog'].includes(mapData[`${rowIndex}_${colIndex}`]))
      return 'army-inaccessible-cell';
    if(Math.abs(diff) > MAX_WALK_DISTANCE)
      return 'army-inaccessible-cell';

    // check line of sight within row
    let walk_step = diff === Math.abs(diff) ? -1 : 1;
    if(currentArmy.rowIndex === rowIndex) {
      for(let i=currentArmy.colIndex+walk_step; i !== colIndex; i += walk_step) {
        if(['rocks', 'trees', 'czech-hedgehog'].includes(mapData[`${rowIndex}_${i}`])) {
          return 'army-inaccessible-cell';
        }
        if (otherArmy.rowIndex === rowIndex && otherArmy.colIndex === i)
          return 'army-inaccessible-cell';
      }
    }
    // check line of sight within column
    if(currentArmy.colIndex === colIndex) {
      for(let i=currentArmy.rowIndex+walk_step; i !== rowIndex; i += walk_step) {
        if(['rocks', 'trees', 'czech-hedgehog'].includes(mapData[`${i}_${colIndex}`])) {
          return 'army-inaccessible-cell';
        }
        if (otherArmy.rowIndex === i && otherArmy.colIndex === colIndex)
          return 'army-inaccessible-cell';
      }
    }
    return  `army-accessible-cell army-accessible-cell-${currentArmy.key}`;
  }

  html(state) {
    const currentArmy = state[state.turn];
    const otherArmy = state[currentArmy.key === 'yellowArmy' ? 'blueArmy' : 'yellowArmy'];
    return (
      `<div id="GameMap" class="d-flex flex-column">
        ${Array(MAP_SIZE).fill(Array(MAP_SIZE).fill()).map((row, rowIndex) => (
          `<div data-key="${rowIndex}" class="map-row d-flex">
            ${row.map((col, colIndex) => (
              `<div class="map-cell ${this.getArmyAccessibility(state.mapData, currentArmy, otherArmy, rowIndex, colIndex)}">
                <div data-key="${rowIndex}_${colIndex}" class="map-cell-item ${this.getCellItemClasses(state, rowIndex, colIndex)}"></div>
              </div>`
            )).join('')}
          </div>`
        )).join('')}
      </div>`
    );
  }
}

export default GameMap;
