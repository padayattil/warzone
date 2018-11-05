import { MAP_SIZE,MAX_WALK_DISTANCE,WEAPONS } from './utils/constants';

class GameMap {

  getCellItemClasses(mapData, rowIndex, colIndex) {
    if(mapData[`${rowIndex}_${colIndex}`] === 'rocks')
      return 'rocks';
    if(mapData[`${rowIndex}_${colIndex}`] === 'trees')
      return 'trees';
    if(mapData[`${rowIndex}_${colIndex}`] === 'czech-hedgehog')
      return 'czech-hedgehog';
    if(mapData[`${rowIndex}_${colIndex}`] === 'knife')
      return 'knife';
    if(mapData[`${rowIndex}_${colIndex}`] === 'gun')
      return 'gun';
    if(mapData[`${rowIndex}_${colIndex}`] === 'grenade')
      return 'grenade';
    if(mapData[`${rowIndex}_${colIndex}`] === 'tank')
      return 'tank';
    if(mapData[`${rowIndex}_${colIndex}`] === 'yellowArmy')
      return 'army-yellow';
    if(mapData[`${rowIndex}_${colIndex}`] === 'blueArmy')
      return 'army-blue';
    return '';
  }

  getArmyAccessibility(mapData, currentArmy, rowIndex, colIndex) {
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
    if (['rocks', 'trees', 'czech-hedgehog', 'yellowArmy', 'blueArmy'].includes(mapData[`${rowIndex}_${colIndex}`]))
      return 'army-inaccessible-cell';
    if(Math.abs(diff) > MAX_WALK_DISTANCE)
      return 'army-inaccessible-cell';

    // check line of sight within row
    let walk_step = diff === Math.abs(diff) ? -1 : 1;
    if(currentArmy.rowIndex === rowIndex) {
      for(let i=currentArmy.colIndex+walk_step; i !== colIndex; i += walk_step) {
        if(['rocks', 'trees', 'czech-hedgehog', 'yellowArmy', 'blueArmy'].includes(mapData[`${rowIndex}_${i}`])) {
          return 'army-inaccessible-cell';
        }
      }
    }
    // check line of sight within column
    if(currentArmy.colIndex === colIndex) {
      for(let i=currentArmy.rowIndex+walk_step; i !== rowIndex; i += walk_step) {
        if(['rocks', 'trees', 'czech-hedgehog', 'yellowArmy', 'blueArmy'].includes(mapData[`${i}_${colIndex}`])) {
          return 'army-inaccessible-cell';
        }
      }
    }
    return  'army-accessible-cell';
  }

  html(mapData, currentArmy) {
    return (
      `<div id="GameMap" class="d-flex flex-column">
        ${Array(MAP_SIZE).fill(Array(MAP_SIZE).fill()).map((row, rowIndex) => (
          `<div data-key="${rowIndex}" class="map-row d-flex">
            ${row.map((col, colIndex) => (
              `<div class="map-cell ${this.getArmyAccessibility(mapData, currentArmy, rowIndex, colIndex)}">
                <div data-key="${rowIndex}_${colIndex}" class="map-cell-item ${this.getCellItemClasses(mapData, rowIndex, colIndex)}"></div>
              </div>`
            )).join('')}
          </div>`
        )).join('')}
      </div>`
    );
  }
}

export default GameMap;
