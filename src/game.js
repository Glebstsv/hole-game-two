import GameEngine from './GameEngine.js';
import BoardManager from './BoardManager.js';

export function initGame(hostElement) {
  const title = document.createElement('h1');
  title.textContent = 'Ударь гоблина!';
  hostElement.prepend(title);

  const statsContainer = document.createElement('div');
  statsContainer.className = 'stats';
  statsContainer.innerHTML = `
    <div id="score" class="stat">Счет: 0</div>
    <div id="missed" class="stat">Пропущено: 0/5</div>
  `;
  hostElement.insertBefore(statsContainer, hostElement.children[1]);

  const startButton = document.createElement('button');
  startButton.textContent = 'Начать игру';
  startButton.className = 'start-button';
  hostElement.insertBefore(startButton, hostElement.children[1]);

  const gameEngine = new GameEngine();
  const boardManager = new BoardManager(hostElement, gameEngine);
  
  boardManager.init();

  gameEngine.setOnScoreChange((score) => {
    const scoreElement = document.getElementById('score');
    if (scoreElement) {
      scoreElement.textContent = `Счет: ${score}`;
    }
  });

  gameEngine.setOnMissedChange((missed, maxMissed) => {
    const missedElement = document.getElementById('missed');
    if (missedElement) {
      missedElement.textContent = `Пропущено: ${missed}/${maxMissed}`;
    }
  });

  gameEngine.setOnGameOver((score) => {
    startButton.disabled = false;
    startButton.textContent = 'Играть снова';
    boardManager.stopGame();
    
    setTimeout(() => {
      alert(`Игра окончена! Ваш счет: ${score}`);
    }, 100);
  });

  startButton.addEventListener('click', () => {
    startButton.disabled = true;
    startButton.textContent = 'Игра идет...';
    
    gameEngine.start();
    boardManager.startGame();
  });

  return { gameEngine, boardManager };

  
}

export function chooseRandomDifferent(currentIndex, totalCells = 16) {
  let next;
  do {
    next = Math.floor(Math.random() * totalCells);
  } while (next === currentIndex);
  return next;
}