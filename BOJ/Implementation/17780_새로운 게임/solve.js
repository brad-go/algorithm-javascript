// prettier-ignore
const input = require('fs').readFileSync('./input6.txt').toString().trim().split('\n');
const [N, K] = input[0].split(" ").map(Number);
const color = input.slice(1, N + 1).map((line) => line.split(" ").map(Number)); // prettier-ignore
const piecesInfo = input.slice(N + 1).map((line) => line.split(' ').map(v => v - 1)); // prettier-ignore

const DX = [0, 0, -1, 1];
const DY = [1, -1, 0, 0];
const WHITE = 0;
const RED = 1;
const BLUE = 2;

class Piece {
  constructor(id, x, y, dir) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.dir = dir;
    this.isBottom = true;
  }
}

const pieces = piecesInfo.map((pieceInfo, idx) => {
  const [x, y, dir] = pieceInfo;
  return new Piece(idx + 1, x, y, dir);
});

function solution(N, K, color, pieces) {
  const board = Array.from(Array(N), () => Array(N).fill().map(() => [])); // prettier-ignore
  initBoard(board, pieces);

  let turn = 0;

  while (++turn < 1001) {
    for (let i = 0; i < K; i++) {
      const size = movePiece(board, color, pieces[i]);

      if (size && size >= 4) {
        return turn;
      }
    }
  }

  return -1;
}

const initBoard = (board, pieces) => {
  pieces.forEach((piece) => {
    const { x, y } = piece;
    board[x][y].push(piece);
  });
};

const movePiece = (board, color, piece) => {
  if (!piece.isBottom) return;

  const { x, y, dir } = piece;

  let nx = x + DX[dir];
  let ny = y + DY[dir];

  if (!isInRange(nx, ny) || color[nx][ny] === BLUE) {
    changeDirection(piece);

    nx = x + DX[piece.dir];
    ny = y + DY[piece.dir];

    if (!isInRange(nx, ny) || color[nx][ny] === BLUE) return;
  }

  if (color[nx][ny] === WHITE) {
    board[x][y].forEach((piece) => {
      piece.x = nx;
      piece.y = ny;
    });

    if (board[nx][ny].length === 0) {
      board[nx][ny].push(...board[x][y]);
    } else {
      board[x][y].forEach((piece) => (piece.isBottom = false));
      board[nx][ny] = board[nx][ny].concat(board[x][y]);
    }

    board[x][y].length = 0;
  }

  if (color[nx][ny] === RED) {
    board[x][y].forEach((piece) => {
      piece.x = nx;
      piece.y = ny;
    });

    if (board[x][y].length > 1) {
      board[x][y][0].isBottom = false;
      board[x][y][board[x][y].length - 1].isBottom = true;
      board[x][y].reverse();
    }

    if (board[nx][ny].length === 0) {
      board[nx][ny].push(...board[x][y]);
    } else {
      board[x][y].forEach((piece) => (piece.isBottom = false));
      board[nx][ny] = board[nx][ny].concat(board[x][y]);
    }

    board[x][y].length = 0;
  }

  return board[nx][ny].length;
};

const isInRange = (x, y) => {
  if (0 <= x && x < N && 0 <= y && y < N) return true;
  return false;
};

const changeDirection = (piece) => {
  if (piece.dir % 2 === 0) piece.dir += 1;
  else piece.dir -= 1;
};

console.log(solution(N, K, color, pieces));
