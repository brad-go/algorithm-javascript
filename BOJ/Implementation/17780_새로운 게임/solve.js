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

      if (size >= 4) return turn;
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

  if (color[nx][ny] === WHITE || color[nx][ny] === RED) {
    updatePiecesPosition(board[x][y], nx, ny);
    if (color[nx][ny] === RED)
      board[x][y] = reversePiecesOnCurrentSpace(board[x][y]);
    board[nx][ny] = updateBoard(board[x][y], board[nx][ny]);
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

const updatePiecesPosition = (pieces, nx, ny) => {
  pieces.forEach((piece) => {
    piece.x = nx;
    piece.y = ny;
  });
};

const updateBoard = (piecesOnCurrentSpace, piecesOnNextSpace) => {
  if (piecesOnNextSpace.length === 0) {
    piecesOnNextSpace.push(...piecesOnCurrentSpace);
  } else {
    piecesOnCurrentSpace.forEach((piece) => (piece.isBottom = false));
    piecesOnNextSpace = piecesOnNextSpace.concat(piecesOnCurrentSpace);
  }

  return piecesOnNextSpace;
};

const reversePiecesOnCurrentSpace = (pieces) => {
  if (pieces.length > 1) {
    pieces[0].isBottom = false;
    pieces[pieces.length - 1].isBottom = true;
    pieces.reverse();
  }

  return pieces;
};

console.log(solution(N, K, color, pieces));
