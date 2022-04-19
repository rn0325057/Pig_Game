'use strict';

var dice, roundScore, activePlayer, score, gameState;

init();

document.querySelector('.btn--roll').addEventListener('click', function () {
  if (gameState) {
    //1) random number generate
    dice = Math.floor(Math.random() * 6) + 1;

    //2) Display Result
    document.querySelector('.dice').src = 'dice-' + dice + '.png';
    document.querySelector('.dice').style.display = 'block';

    //3) Update roundScore if not 1
    if (dice !== 1) {
      roundScore += dice;
      document.querySelector('#current--' + activePlayer).textContent =
        roundScore;
    } else {
      nextPlayer();
    }
  }
});

document.querySelector('.btn--hold').addEventListener('click', function () {
  if (gameState) {
    // 1) Add Global Score
    score[activePlayer] += roundScore;

    // 2) Update in UI
    document.querySelector('#score--' + activePlayer).textContent =
      score[activePlayer];

    //3) Weather check game is won or not
    if (score[activePlayer] >= 20) {
      gameState = false;
      document.querySelector('#name--' + activePlayer).textContent = '!WINNER';
      document
        .querySelector('.player--' + activePlayer)
        .classList.add('player--winner');

      document.querySelector('.dice').style.display = 'none';
    } else {
      nextPlayer();
    }
  }
});

document.querySelector('.btn--new').addEventListener('click', init);

function init() {
  gameState = true;
  activePlayer = 0;
  roundScore = 0;
  score = [0, 0];

  document.querySelector('.dice').style.display = 'none';

  document.querySelector('#score--0').textContent = '0';
  document.querySelector('#score--1').textContent = '0';
  document.querySelector('#current--0').textContent = '0';
  document.querySelector('#current--0').textContent = '0';

  document.querySelector('#name--0').textContent = 'Player 1';
  document.querySelector('#name--1').textContent = 'Player 2';
  document.querySelector('.player--0').classList.remove('player--winner');
  document.querySelector('.player--1').classList.remove('player--winner');

  document.querySelector('.player--0').classList.remove('player--active');
  document.querySelector('.player--1').classList.remove('player--active');
  document.querySelector('.player--0').classList.add('player--active');
}

function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;
  document.querySelector('#current--0').textContent = '0';
  document.querySelector('#current--1').textContent = '0';

  document.querySelector('.player--0').classList.toggle('player--active');
  document.querySelector('.player--1').classList.toggle('player--active');
}
