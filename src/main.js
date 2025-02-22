import './style.css';

//1.- Inicializar el canvas
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const BLOCK_SIZE = 30;
const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;

//2.- Crear el tablero
canvas.width = BLOCK_SIZE * BOARD_WIDTH;
canvas.height = BLOCK_SIZE * BOARD_HEIGHT;

ctx.scale(BLOCK_SIZE, BLOCK_SIZE);

//3.- Game Loop
function update() {
  draw();
  requestAnimationFrame(update);
}

function draw() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawBoard();
}

update();
