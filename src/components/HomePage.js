import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import logo from '../images/logo.png';

function HomePage(props) {
  return (
    <header id="HomePage">
      <img src={logo} className="App-logo" alt="logo" />
      <h3 className="m-4">
        <strong>
          Valor grows by daring, fear by holding back
        </strong>
      </h3>
      <Link className="btn btn-warning px-5" to="/game/tutorial">Play Game</Link>
    </header>
  );
}

export default HomePage;
