import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'material-icons/iconfont/material-icons.css';

import './index.css';
import './images/favicon.png';
import './images/cell-bg.png';
import './images/czech-hedgehog.png';
import './images/grenade.png';
import './images/gun.png';
import './images/knife.png';
import './images/logo.png';
import './images/rocks.png';
import './images/soldier-blue.png';
import './images/soldier-yellow.png';
import './images/tank.png';
import './images/trees.png';
import './images/world-map.jpg';
import Game from './Game.js';

$(document).ready(function () {
  const game = new Game();
  game.render();
});
