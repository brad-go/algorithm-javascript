// prettier-ignore
const input = require('fs').readFileSync('./input5.txt').toString().trim().split('\n');
const [N, K] = input[0].split(" ").map(Number);
const color = input.slice(1, N + 1).map((line) => line.split(" ").map(Number)); // prettier-ignore
const pieceInfo = input.slice(N + 1).map((line) => line.split(" ").map(v => v - 1)); // prettier-ignore

const DR = [0, 0, -1, 1];
const DC = [1, -1, 0, 0];
const WHITE = 0;
const RED = 1;
const BLUE = 2;

class Piece {
  constructor(id, r, c, dir) {
    this.id = id;
    this.r = r;
    this.c = c;
    this.dir = dir;
  }
}

function solution(N, K, color, pieceInfo) {
  const { board, pieces } = initGame(N, pieceInfo);
  let turn = 0;

  while (turn++ < 1000) {
    for (let i = 0; i < K; i++) {
      const size = movePiece(board, pieces, pieces[i], color); // prettier-ignore

      if (size >= 4) return turn;
    }
  }

  return -1;
}

const initGame = (N, pieceInfo) => {
  const pieces = getPieces(pieceInfo);
  const board = getBoard(N, pieces);

  return { board, pieces };
};

const getPieces = (pieceInfo) => {
  return pieceInfo.map(([r, c, dir], id) => new Piece(id + 1, r, c, dir));
};

const getBoard = (N, pieces) => {
  const board = Array.from(Array(N), () => Array(N).fill().map(() => [])); // prettier-ignore
  pieces.forEach((piece) => board[piece.r][piece.c].push(piece));

  return board;
};

const movePiece = (board, pieces, piece, color) => {
  const { r, c, dir } = piece;
  let nr = r + DR[dir];
  let nc = c + DC[dir];

  if (!isInRange(N, nr, nc) || color[nr][nc] === BLUE) {
    piece.dir = changeDirection(dir);

    nr = r + DR[piece.dir];
    nc = c + DC[piece.dir];

    if (!isInRange(N, nr, nc) || color[nr][nc] === BLUE) return;
  }

  if (color[nr][nc] === WHITE || color[nr][nc] === RED) {
    const pieceIndex = board[r][c].findIndex((cur) => cur.id === piece.id);
    const piecesToStay = board[r][c].filter((_, idx) => idx < pieceIndex);
    const piecesToMove = board[r][c]
      .filter((_, idx) => idx >= pieceIndex)
      .map(({ id, dir }) => new Piece(id, nr, nc, dir));

    if (color[nr][nc] === RED) piecesToMove.reverse();

    board[nr][nc].push(...piecesToMove);
    board[r][c] = piecesToStay;

    updatePieces(pieces, piecesToMove);
  }

  return board[nr][nc].length;
};

const isInRange = (N, r, c) => {
  if (0 <= r && r < N && 0 <= c && c < N) return true;
  return false;
};

const changeDirection = (direction) => {
  if (direction % 2 === 0) return direction + 1;
  return direction - 1;
};

const updatePieces = (pieces, piecesToMove) => {
  pieces.forEach((piece) => {
    const current = piecesToMove.find((p) => p.id === piece.id);
    if (!current) return;
    piece.r = current.r;
    piece.c = current.c;
  });
};

console.log(solution(N, K, color, pieceInfo));
