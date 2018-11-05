import React, { Component } from 'react';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import logo from '../images/logo.png';
import Tutorial from './Tutorial';
import Game from './Game';

class GamePage extends Component {
  render() {
    return (
      <div id="GamePage"  className="d-flex flex-column v-100">
        <div className="header my-3">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <div className="game-screen flex-1">
          {this.props.match.params.screen === 'play' ? <Game /> : <Tutorial />}
        </div>
      </div>
    );
  }
}

export default GamePage;
