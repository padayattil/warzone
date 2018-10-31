import React from 'react';
import { Link } from 'react-router-dom';

import knife from '../images/knife.png';
import gun from '../images/gun.png';
import grenade from '../images/grenade.png';
import tank from '../images/tank.png';

function Tutorial(props) {
  return (
    <div id="Tutorial" className="p-3">
      <h3 className="text-center">Instructions</h3>
      <div className="d-flex flex-column">
        <ul>
          <li>
            <p>This is a two player turn based game.</p>
          </li>
          <li>
            <p>Each player can move from one to three boxes (horizontally or vertically) before ending their turn.
            They can not pass through obstacles directly.</p>
          </li>
          <li>
            <p>There are four weapons to chose from:</p>
            <div className="weapons-list bg-dark m-2">
              <div className="weapon-item">
                <img src={knife} alt="knife" />
                <p>Power: 10</p>
              </div>
              <div className="weapon-item">
                <img src={gun} alt="gun" />
                <p>Power: 20</p>
              </div>
              <div className="weapon-item">
                <img src={grenade} alt="grenade" />
                <p>Power: 30</p>
              </div>
              <div className="weapon-item">
                <img src={tank} alt="tank" />
                <p>Power: 50</p>
              </div>
            </div>
          </li>
          <li>
            <p>If a player passes over a box containing a weapon,
            they leave their current weapon on site and replace it with the new one.</p>
          </li>
          <li>
            <p>If players cross over adjacent squares (horizontally or vertically), a battle begins.</p>
          </li>
          <li>
            <p>During combat, the game works is as follows:</p>
            <ul>
              <li>Each player attacks in turn</li>
              <li>The damage depends on the player's weapon power</li>
              <li>The player can choose to attack or defend against the next shot</li>
              <li>If the player chooses to defend themselves, they sustain 50% less damage than normal</li>
              <li>As soon as the life points of a player falls to 0, they lose.</li>
            </ul>
          </li>
        </ul>
        <Link className="btn btn-warning align-self-center px-5" to="/game/play">Play Now</Link>
      </div>
    </div>
  );
}

export default Tutorial;
