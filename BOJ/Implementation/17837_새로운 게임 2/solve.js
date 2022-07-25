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
    (this.id = id), (this.r = r);
    this.c = c;
    this.dir = dir;
  }
}

function solution(N, K, color, pieceInfo) {
  const { board, pieces } = initGame(N, pieceInfo);
  let turn = 0;

  while (turn++ < 1000) {
    for (let i = 0; i < K; i++) {
      const size = movePiece(board, color, pieces[i]); // prettier-ignore

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

const movePiece = (board, color, piece) => {
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
    const pieceIndex = board[r][c].indexOf(piece);
    const piecesToMove = board[r][c].splice(pieceIndex);

    if (color[nr][nc] === RED) piecesToMove.reverse();

    updatePiecesPosition(piecesToMove, nr, nc);
    board[nr][nc].push(...piecesToMove);
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

const updatePiecesPosition = (pieces, nr, nc) => {
  pieces.forEach((piece) => {
    piece.r = nr;
    piece.c = nc;
  });
};

console.log(solution(N, K, color, pieceInfo));
