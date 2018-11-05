import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import logo from '../images/logo.png';

function HomePage(props) {
  return (
    <div id="HomePage">
      <img src={logo} className="App-logo" alt="logo" />
      <h3 className="m-4">
        <strong>
          Valor grows by daring, fear by holding back
        </strong>
      </h3>
      <div className="menu-container">
          <Link to="/game/play" className="my-2 menu-btn btn btn-warning px-5">Play Now</Link>
          <Link to="/game/tutorial" className="my-2 menu-btn btn btn-warning px-5">Instructions</Link>
      </div>
    </div>
  );
}

export default HomePage;
