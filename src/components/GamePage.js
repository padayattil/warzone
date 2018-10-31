import React, { Component } from 'react';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Tutorial from './Tutorial';
import Game from './Game';

class GamePage extends Component {
  render() {
    switch (this.props.match.params.screen) {
      case 'play':
      return (
        <div id="GamePage">
          <Game />
        </div>
      );
      default:
      return (
        <div id="GamePage">
          <Tutorial />
        </div>
      );
    }
  }
}

export default GamePage;
