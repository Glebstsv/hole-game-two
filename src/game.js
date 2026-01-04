import GameEngine from './GameEngine.js';
import BoardManager from './BoardManager.js';

export function initGame(hostElement) {
  const uiContainer = document.createElement('div');
  uiContainer.className = 'game-ui';
  
  const title = document.createElement('h1');
  title.textContent = 'Ударь гоблина!';
  uiContainer.append(title);

  const statsContainer = document.createElement('div');
  statsContainer.className = 'stats';
  statsContainer.innerHTML = `
    <div id="score" class="stat">Счет: 0</div>
    <div id="missed" class="stat">Пропущено: 0/5</div>
  `;
  uiContainer.append(statsContainer);

  const startButton = document.createElement('button');
  startButton.textContent = 'Начать игру';
  startButton.className = 'start-button';
  uiContainer.append(startButton);

  const messageContainer = document.createElement('div');
  messageContainer.id = 'game-message';
  messageContainer.className = 'game-message hidden';
  uiContainer.appendChild(messageContainer);

  hostElement.appendChild(uiContainer);

  const gameEngine = new GameEngine();
  const boardManager = new BoardManager(hostElement, gameEngine);
  
  boardManager.init();

  const showMessage = (text, isError = false) => {
    messageContainer.textContent = text;
    messageContainer.className = `game-message ${isError ? 'error' : 'info'}`;
    messageContainer.classList.remove('hidden');
    
    setTimeout(() => {
      messageContainer.classList.add('hidden');
    }, 3000);
  };

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
    
    showMessage(`Игра окончена! Ваш счет: ${score}`);
  });

  startButton.addEventListener('click', () => {
    startButton.disabled = true;
    startButton.textContent = 'Игра идет...';
    
    messageContainer.classList.add('hidden');
    
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