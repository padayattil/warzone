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
    if(this.props.mapData[`${rowIndex}_${colIndex}`] === 'redArmy')
      return 'army army-red';
    if(this.props.mapData[`${rowIndex}_${colIndex}`] === 'greenArmy')
      return 'army army-green';
  }

  getArmyAccessibility(rowIndex, colIndex) {
    let diff;
    if(this.props.currentArmy.rowIndex === rowIndex) {
      diff = Math.abs(this.props.currentArmy.colIndex - colIndex)
    } else if(this.props.currentArmy.colIndex === colIndex) {
      diff = Math.abs(this.props.currentArmy.rowIndex - rowIndex)
    } else {
      diff = 9999;
    }
    if(diff === 0)
      return '';
    if (typeof this.props.mapData[`${rowIndex}_${colIndex}`] !== 'undefined')
      return 'army-inaccessible';
    if(diff > 3)
      return 'army-inaccessible';
    return 'army-accessible';
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
