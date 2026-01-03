import './style.css';
import { initGame } from './game.js';

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  const gameArea = document.createElement('div');
  gameArea.className = 'game-area';
  
  app.appendChild(gameArea);
  initGame(gameArea);
});