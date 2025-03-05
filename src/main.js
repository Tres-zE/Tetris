import './style.css';

//1.- Inicializar el canvas
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const BLOCK_SIZE = 20;
const BOARD_WIDTH = 14;
const BOARD_HEIGHT = 30;

//2.- Crear el tablero
canvas.width = BLOCK_SIZE * BOARD_WIDTH;
canvas.height = BLOCK_SIZE * BOARD_HEIGHT;

ctx.scale(BLOCK_SIZE, BLOCK_SIZE);

//4.- Dibujar el tablero
const board = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 0, 0, 1, 1],
];

//5.- Crear la pieza
const piece = {
  position: { x: 5, y: 5 },
  shape: [
    [1, 1],
    [1, 1],
  ],
};

//9.- random piece
const PIECES = [
  [
    //cuadrado
    [1, 1],
    [1, 1],
  ],
  [
    [1, 1, 0],
    [0, 1, 1],
  ],
  [
    [0, 1, 1],
    [1, 1, 0],
  ],
  [
    [1, 1, 1],
    [0, 1, 0],
  ],
  [
    [1, 1, 1],
    [1, 0, 0],
  ],
  [
    //palito
    [1, 1, 1, 1],
  ],
  [
    [1, 1, 1],
    [0, 0, 1],
  ],
];

/*3.- Game Loop
function update() {
  draw();
  window.requestAnimationFrame(update);
}*/

//8.- auto drop
let dropCounter = 0;
let lastTime = 0;

function update(time = 0) {
  const deltaTime = time - lastTime;
  lastTime = time;
  dropCounter += deltaTime;

  if (dropCounter > 1000) {
    piece.position.y++;
    dropCounter = 0;

    if (checkCollision()) {
      piece.position.y--;
      solidifyPiece();
      removeRows();
    }
  }

  draw();
  window.requestAnimationFrame(update);
}

function draw() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  board.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value === 1) {
        ctx.fillStyle = 'yellow';
        ctx.fillRect(x, y, 1, 1);
      }
    });
  });

  piece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value) {
        ctx.fillStyle = 'red';
        ctx.fillRect(piece.position.x + x, piece.position.y + y, 1, 1);
      }
    });
  });
}

//6.- Mover la pieza
document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowDown') {
    piece.position.y++;
    if (checkCollision()) {
      piece.position.y--;
      removeRows();
    }
  }

  if (event.key === 'ArrowRight') {
    piece.position.x++;
    if (checkCollision()) {
      piece.position.x--;
    }
  }

  if (event.key === 'ArrowLeft') {
    piece.position.x--;
    if (checkCollision()) {
      piece.position.x++;
    }
  }

  if (event.key === 'ArrowUp') {
    const rotated = [];

    for (let i = 0; i < piece.shape[0].length; i++) {
      const row = [];

      for (let j = piece.shape.length - 1; j >= 0; j--) {
        row.push(piece.shape[j][i]);
      }
      rotated.push(row);
    }
    const previousShape = piece.shape;
    piece.shape = rotated;
    if (checkCollision()) {
      piece.shape = previousShape;
    }
  }
});

//7.- Colisiones
function checkCollision() {
  return piece.shape.find((row, y) => {
    return row.find((value, x) => {
      return (
        value != 0 && board[y + piece.position.y]?.[x + piece.position.x] != 0
      );
    });
  });
}

function solidifyPiece() {
  piece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value === 1) {
        board[y + piece.position.y][x + piece.position.x] = 1;
      }
    });
  });

  // reset position
  piece.position.x = Math.floor(BOARD_WIDTH / 2 - 2);
  piece.position.y = 0;

  //10.- get random shape
  piece.shape = PIECES[Math.floor(Math.random() * PIECES.length)];

  //11.- game over
  if (checkCollision()) {
    board.forEach((row, y) => {
      row.fill(0);
    });
  }
}

function removeRows() {
  const rowsToRemove = [];

  board.forEach((row, y) => {
    if (row.every((value) => value === 1)) {
      rowsToRemove.push(y);
    }
  });

  rowsToRemove.forEach((y) => {
    board.splice(y, 1);
    const newRow = new Array(BOARD_WIDTH).fill(0);
    board.unshift(newRow);
  });
}

update();
