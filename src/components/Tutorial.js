import React from 'react';
import { Link } from 'react-router-dom';

import knife from '../images/knife.png';
import gun from '../images/gun.png';
import grenade from '../images/grenade.png';
import tank from '../images/tank.png';
import rocks from '../images/rocks.png';
import trees from '../images/trees.png';
import czechHedgehog from '../images/czech-hedgehog.png';

function Tutorial(props) {
  return (
    <div id="Tutorial" className="p-3">
      <h3 className="text-center">Instructions</h3>
      <div className="d-flex flex-column">
        <ul>
          <li>
            <p>Warzone is a two player, turn based game.</p>
          </li>
          <li>
            <p>Each player can move from one to three boxes (horizontally or vertically) before ending their turn.
            They can not pass through obstacles directly.</p>
          </li>
          <li>
            <p>If a player passes over a box containing a weapon,
            they leave their current weapon on site and replace it with the new one.</p>
          </li>
          <li>
            <p>Weapons and their power:</p>
            <div className="instruction-gameitem-list bg-dark m-2 py-2">
              <div className="instruction-gameitem text-center">
                <img src={knife} alt="knife" />
                <p>Knife: 10</p>
              </div>
              <div className="instruction-gameitem text-center">
                <img src={gun} alt="gun" />
                <p>Pistol: 20</p>
              </div>
              <div className="instruction-gameitem text-center">
                <img src={grenade} alt="grenade" />
                <p>Grenade: 30</p>
              </div>
              <div className="instruction-gameitem text-center">
                <img src={tank} alt="tank" />
                <p>Tank: 50</p>
              </div>
            </div>
          </li>
          <li>
            <p>Obstacles:</p>
            <div className="instruction-gameitem-list bg-dark m-2 py-2">
              <div className="instruction-gameitem text-center">
                <img src={rocks} alt="rocks" />
                <p >Rocks</p>
              </div>
              <div className="instruction-gameitem text-center">
                <img src={trees} alt="trees" />
                <p>Trees</p>
              </div>
              <div className="instruction-gameitem text-center">
                <img src={czechHedgehog} alt="czech hedgehog" />
                <p>Czech Hedgehogs</p>
              </div>
            </div>
          </li>
          <li>
            <p>If players cross over adjacent squares (horizontally or vertically), a battle begins.</p>
          </li>
          <li>
            <p>During combat, the game works is as follows:</p>
            <ul>
              <li><p>Each player attacks in turn</p></li>
              <li><p>The damage depends on the player's weapon power</p></li>
              <li><p>The player can choose to attack or defend against the next shot</p></li>
              <li><p>If the player chooses to defend themselves, they sustain 50% less damage than normal</p></li>
              <li><p>As soon as the life points of a player falls to 0, they lose.</p></li>
            </ul>
          </li>
        </ul>
        <Link className="btn btn-warning align-self-center px-5" to="/game/play">Play Now</Link>
      </div>
    </div>
  );
}

export default Tutorial;
