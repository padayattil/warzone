import React, { Component } from 'react';

class GameMap extends Component {

  getCellItemClasses(rowIndex, colIndex) {
    if(this.props.mapData[`${rowIndex}_${colIndex}`] === 'rocks')
      return 'rocks';
    if(this.props.mapData[`${rowIndex}_${colIndex}`] === 'knife')
      return 'knife';
    if(this.props.mapData[`${rowIndex}_${colIndex}`] === 'gun')
      return 'gun';
    if(this.props.mapData[`${rowIndex}_${colIndex}`] === 'grenade')
      return 'grenade';
    if(this.props.mapData[`${rowIndex}_${colIndex}`] === 'tank')
      return 'tank';
    if(this.props.mapData[`${rowIndex}_${colIndex}`] === 'yellowArmy')
      return 'army army-yellow';
    if(this.props.mapData[`${rowIndex}_${colIndex}`] === 'blueArmy')
      return 'army army-blue';
  }

  getArmyAccessibility(rowIndex, colIndex) {
    // compute distance
    let diff;
    if(this.props.currentArmy.rowIndex === rowIndex)
      diff = this.props.currentArmy.colIndex - colIndex
    else if(this.props.currentArmy.colIndex === colIndex)
      diff = this.props.currentArmy.rowIndex - rowIndex
    else
      diff = 9999;

    // check if within range. return 'inaccessible' if occupied
    if(Math.abs(diff) === 0)
      return 'current-army-cell';
    if (['rocks', 'yellowArmy', 'blueArmy'].includes(this.props.mapData[`${rowIndex}_${colIndex}`]))
      return 'army-inaccessible-cell';
    if(Math.abs(diff) > this.props.maxWalkDistance)
      return 'army-inaccessible-cell';

    // check line of sight within row
    let walk_step = diff === Math.abs(diff) ? -1 : 1;
    if(this.props.currentArmy.rowIndex === rowIndex) {
      for(let i=this.props.currentArmy.colIndex+walk_step; i !== colIndex; i += walk_step) {
        if(['rocks','yellowArmy','blueArmy'].includes(this.props.mapData[`${rowIndex}_${i}`])) {
          return 'army-inaccessible-cell';
        }
      }
    }
    // check line of sight within column
    if(this.props.currentArmy.colIndex === colIndex) {
      for(let i=this.props.currentArmy.rowIndex+walk_step; i !== rowIndex; i += walk_step) {
        if(['rocks','yellowArmy','blueArmy'].includes(this.props.mapData[`${i}_${colIndex}`])) {
          return 'army-inaccessible-cell';
        }
      }
    }
    return  'army-accessible-cell';
  }

  render() {
    return (
      <div id="GameMap" className="d-flex flex-column">
        {Array(this.props.mapSize).fill(Array(this.props.mapSize).fill()).map((row, rowIndex) => (
          <div key={rowIndex} className="map-row d-flex">
            {row.map((col, colIndex) => (
              <div key={colIndex} className={`map-cell ${this.getArmyAccessibility(rowIndex, colIndex)}`}>
                <div className={this.getCellItemClasses(rowIndex, colIndex)}></div>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
}

export default GameMap;
