import { update as updateSnake, render as renderSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection } from './snake.js'
import { update as updateFood, render as renderFood } from './food.js'
import { outsideGrid } from './grid.js'
let lastRenderTime = 0;
let gameOver = false;
const gameBoard = document.getElementById('game-board');

function main(currentTime) {
  if (gameOver) {
    if (confirm('You lost. Press ok to restart')) {
      window.location = '/'
    }
    return
  }

  window.requestAnimationFrame(main);
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return // entenc el procés però no la sintaxis
  
  console.log('Render');
  lastRenderTime = currentTime;

  update();
  render();
}

window.requestAnimationFrame(main);

function update() {
  updateSnake();
  updateFood();
  checkDeath();
}

function render() {
  gameBoard.innerHTML = '';
  renderSnake(gameBoard);
  renderFood(gameBoard);
}

function checkDeath() {
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}