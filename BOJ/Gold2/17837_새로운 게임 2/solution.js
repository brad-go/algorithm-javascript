const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const [N, K] = input[0].split(" ").map(Number);
const colors = input.slice(1, N + 1).map((str) => str.split(" ").map(Number));
const pieceInfos = input.slice(N + 1).map((str) => str.split(" ").map(Number));

const solution = (N, K, colors, pieceInfos) => {
  const { board, pieces } = init(N, pieceInfos);

  let turn = 1;

  while (turn <= 1000) {
    for (const piece of pieces) {
      const isOver = movePiece(board, colors, pieces, piece);

      if (isOver) return turn;
    }

    turn += 1;
  }

  return -1;
};

const init = (N, pieceInfos) => {
  const board = Array.from(Array(N), () => Array.from(Array(N), () => []));
  const pieces = pieceInfos.map((info, index) => {
    const [r, c, dir] = info.map((value) => value - 1);
    const piece = createPiece(index + 1, r, c, dir);

    board[r][c].push(piece);

    return piece;
  });

  return { board, pieces };
};

const createPiece = (id, r, c, dir) => ({ id, r, c, dir });

const movePiece = (board, colors, pieces, piece) => {
  const dr = [0, 0, -1, 1];
  const dc = [1, -1, 0, 0];
  const { r, c, dir } = piece;

  let nr = r + dr[dir];
  let nc = c + dc[dir];

  if (!isInBoard(board.length, nr, nc) || colors[nr][nc] === 2) {
    piece.dir = changeDirection(dir);

    nr = r + dr[piece.dir];
    nc = c + dc[piece.dir];

    if (!isInBoard(N, nr, nc) || colors[nr][nc] === 2) return;
  }

  const currentIndex = board[r][c].findIndex(({ id }) => id === piece.id);
  const movedPieces = board[r][c].slice(currentIndex);

  movedPieces.forEach((piece) => {
    piece.r = nr;
    piece.c = nc;
  });

  board[r][c] = board[r][c].slice(0, currentIndex);

  if (colors[nr][nc] === 1) movedPieces.reverse();

  board[nr][nc].push(...movedPieces);

  return board[nr][nc].length >= 4;
};

const isInBoard = (N, r, c) => {
  return 0 <= r && r < N && 0 <= c && c < N;
};

const changeDirection = (dir) => {
  return dir % 2 === 0 ? dir + 1 : dir - 1;
};

console.log(solution(N, K, colors, pieceInfos));
