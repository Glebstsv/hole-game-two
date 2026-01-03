import characterSrc from "./assets/character.png";

export default class BoardManager {
  constructor(container, gameEngine) {
    this.container = container;
    this.gameEngine = gameEngine;
    this.cells = [];
    this.goblinElement = null;
    this.totalCells = 16;
    this.currentGoblinIndex = null;
    this.moveInterval = null;
  }

  init() {
    this.createGrid();
    this.createGoblin();
    this.setupEventListeners();
  }

  createGrid() {
    const grid = document.createElement('div');
    grid.className = 'grid';
    grid.setAttribute('role', 'grid');

    for (let i = 0; i < this.totalCells; i++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.cellIndex = i;
      cell.setAttribute('role', 'gridcell');
      grid.append(cell);
      this.cells.push(cell);
    }

    this.container.append(grid);
    return grid;
  }

  createGoblin() {
    const img = document.createElement('img');
    img.className = 'character goblin';
    img.src = characterSrc;
    img.alt = 'Гоблин';
    img.draggable = false;
    this.goblinElement = img;
  }

  setupEventListeners() {
    this.container.addEventListener('click', (event) => {
      const cell = event.target.closest('.cell');
      if (cell && cell === this.goblinElement.parentElement) {
        const hitSuccessful = this.gameEngine.hit();
        if (hitSuccessful) {
          this.goblinElement.style.transform = 'scale(0.7)';
          setTimeout(() => {
            this.goblinElement.style.transform = 'scale(1)';
          }, 150);
          
          if (this.moveInterval) {
            clearInterval(this.moveInterval);
          }
          
          setTimeout(() => {
            this.moveGoblin();
            
            this.moveInterval = setInterval(() => {
              if (this.gameEngine.isGameActive) {
                this.moveGoblin();
                this.gameEngine.miss();
              }
            }, 1000);
          }, 200);
        }
      }
    });
  }

  startGame() {
    if (this.moveInterval) {
      clearInterval(this.moveInterval);
    }

    this.clearGoblin();

    this.moveInterval = setInterval(() => {
      if (this.gameEngine.isGameActive) {
        this.moveGoblin();
        this.gameEngine.miss(); 
      }
    }, 1000);

    setTimeout(() => {
      this.moveGoblin();
    }, 100);
  }

  moveGoblin() {
    if (this.goblinElement.parentElement) {
      this.goblinElement.parentElement.classList.remove('active');
      this.goblinElement.remove();
    }

    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.totalCells);
    } while (newIndex === this.currentGoblinIndex);

    this.cells[newIndex].append(this.goblinElement);
    this.cells[newIndex].classList.add('active');
    this.currentGoblinIndex = newIndex;
  }

  clearGoblin() {
    if (this.goblinElement.parentElement) {
      this.goblinElement.parentElement.classList.remove('active');
      this.goblinElement.remove();
    }
    this.currentGoblinIndex = null;
  }

  stopGame() {
    if (this.moveInterval) {
      clearInterval(this.moveInterval);
      this.moveInterval = null;
    }
    this.clearGoblin();
  }
}