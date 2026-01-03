export default class GameEngine {
  constructor() {
    this.score = 0;
    this.missed = 0;
    this.maxMissed = 5;
    this.isGameActive = false;
    this.gameInterval = null;
    this.onScoreChange = null;
    this.onMissedChange = null;
    this.onGameOver = null;
  }

  start() {
    this.score = 0;
    this.missed = 0;
    this.isGameActive = true;
    
    if (this.onScoreChange) this.onScoreChange(this.score);
    if (this.onMissedChange) this.onMissedChange(this.missed, this.maxMissed);
  }

  hit() {
    if (!this.isGameActive) return false;
    
    this.score++;
    this.missed = Math.max(0, this.missed - 1);
    
    if (this.onScoreChange) this.onScoreChange(this.score);
    if (this.onMissedChange) this.onMissedChange(this.missed, this.maxMissed);
    
    return true;
  }

  miss() {
    if (!this.isGameActive) return;
    
    this.missed++;
    
    if (this.onMissedChange) this.onMissedChange(this.missed, this.maxMissed);
    
    if (this.missed >= this.maxMissed) {
      this.gameOver();
    }
  }

  gameOver() {
    this.isGameActive = false;
    clearInterval(this.gameInterval);
    
    if (this.onGameOver) {
      this.onGameOver(this.score);
    }
  }

  stop() {
    this.isGameActive = false;
    clearInterval(this.gameInterval);
  }

  setOnScoreChange(callback) {
    this.onScoreChange = callback;
  }

  setOnMissedChange(callback) {
    this.onMissedChange = callback;
  }

  setOnGameOver(callback) {
    this.onGameOver = callback;
  }
}