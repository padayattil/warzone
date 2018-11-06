import { WEAPONS } from './utils/constants';

class PlayerStats {
  html(state, army) {
    return (
      `<div class="PlayerStats p-3 d-flex flex-column align-items-center ${state[state.turn].name === army.name ? 'aura-white' : ''}">
        <div class="text-center">
          <div class="d-inline-block ${army.iconClass}"></div>
          <p class="text-center">${army.name}</p>
        </div>
        <div class="life-gauge">
          <span class="material-icons align-middle life-icon">favorite</span>
          <span class="text-center align-middle">${army.life}</span>
        </div>
        <div class="weapon-gauge">
          <div class="weapon-gauge-icon ${army.weapon}"></div>
          <p class="px-2">${WEAPONS[army.weapon].power}</p>
        </div>
        ${state[state.turn].name === army.name && state.mode === 'battle' ?
          `<div class="battle-action-container">
            <button class="my-1 menu-btn btn btn-danger px-5">Attack</button>
            <button class="my-1 menu-btn btn btn-secondary px-5 ${army.battleStrategy === 'defend' ? 'aura-white' : ''}">Defend</button>
          </div>` : ''
        }
      </div>`
    );
  }
}

export default PlayerStats;
