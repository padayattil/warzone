import React, { Component } from 'react';

import PlayerStats from './PlayerStats'

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapSize: 10,
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

  render() {
    return (
      <div id="Game" className="d-flex">
        <PlayerStats  stats={this.state.redArmy} />
        <PlayerStats  stats={this.state.greenArmy} />
      </div>
    );
  }
}

export default Game;
