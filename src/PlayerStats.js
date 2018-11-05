import { WEAPONS } from './utils/constants';

class PlayerStats {
  html(stats) {
    return (
      `<div class="PlayerStats p-3 d-flex flex-column align-items-center">
        <div class="text-center">
          <div class="d-inline-block ${stats.iconClass}"></div>
          <p class="text-center">${stats.name}</p>
        </div>
        <div class="life-gauge">
          <span class="material-icons align-middle life-icon">favorite</span>
          <span class="text-center align-middle">${stats.life}</span>
        </div>
        <div class="weapon-gauge">
          <div class="weapon-gauge-icon ${stats.weapon}"></div>
          <p class="px-2">${WEAPONS[stats.weapon].power}</p>
        </div>
        <div class="battle-action-container">
          <a href="#" class="my-1 menu-btn btn btn-warning px-5">Attack</a>
          <a href="#" class="my-1 menu-btn btn btn-warning px-5">Defend</a>
        </div>
      </div>`
    );
  }
}

export default PlayerStats;
