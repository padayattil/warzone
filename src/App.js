import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import HomePage from './components/HomePage';
import GamePage from './components/GamePage';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path='/' render={(props) => (
            <HomePage {...props} />
          )}
        />
        <Route exact path='/game/:screen' render={(props) => (
            <GamePage {...props} />
          )}
        />
      </div>
    );
  }
}

export default App;
